#!/bin/bash
export NODE_OPTIONS=--max_old_space_size=8192

cd ${OKTA_HOME}/${REPO}
export GENERATED_SITE_LOCATION=dist

# Use latest version of Node
setup_service node v14.21.1

if [[ -z "${BUILD_FAILURE}" ]]; then
    export BUILD_FAILURE=1
fi

if [[ -z "${SUCCESS}" ]]; then
    export SUCCESS=0
fi

# fix for bacon to be able to function.
YARN_REGISTRY=https://registry.yarnpkg.com
BASE_URL=${ARTIFACTORY_URL}/api/npm/npm-okta
MAIN_BRANCH="-m""aster"
OKTA_REGISTRY="${BASE_URL}${MAIN_BRANCH}"

# Replace yarn artifactory with Okta's
sed -i "s#${YARN_REGISTRY}#${OKTA_REGISTRY}#" yarn.lock

export PATH="${PATH}:$(yarn global bin)"

# Install required dependencies
yarn global add @okta/ci-append-sha
yarn global add @okta/ci-pkginfo

if ! yarn install --ignore-platform ; then
  echo "yarn install failed! Exiting..."
  exit ${FAILED_SETUP}
fi

# Revert the original change
sed -i "s#${OKTA_REGISTRY}#${YARN_REGISTRY}#" yarn.lock

function interject() {
    echo "===== ${1} ====="
}

function send_promotion_message() {
    curl -H "x-aurm-token: ${AURM_TOKEN}" \
      -H "Content-Type: application/json" \
      -X POST -d "[{\"artifactId\":\"$1\",\"repository\":\"$2\",\"artifact\":\"$3\",\"version\":\"$4\",\"promotionType\":\"ARTIFACT\"}]" \
      -k "${APERTURE_BASE_URL}/v1/artifact-promotion/createPromotionEvent"
}

function generate_conductor_file() {
    pushd $GENERATED_SITE_LOCATION
    CONDUCTOR_FILE=conductor.yml
    find -type f -iname 'index.html' | xargs dirname | sed -s "s/^\.//" | while read -r line ; do
        if [ ! -z "${line}" ]; then
            echo "  - from: ${line}" >> ${CONDUCTOR_FILE}
            echo "    to: ${line}/" >> ${CONDUCTOR_FILE}
        fi
    done
    popd
}
