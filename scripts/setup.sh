#!/bin/bash
export NODE_OPTIONS=--max_old_space_size=8192

cd ${OKTA_HOME}/${REPO}
export GENERATED_SITE_LOCATION=dist

# Use latest version of Node
setup_service node v12.13.0

if [[ -z "${BUILD_FAILURE}" ]]; then
    export BUILD_FAILURE=1
fi

if [[ -z "${SUCCESS}" ]]; then
    export SUCCESS=0
fi

# fix for bacon to be able to function.
YARN_REGISTRY=https://registry.yarnpkg.com
OKTA_REGISTRY=${ARTIFACTORY_URL}/api/npm/npm-okta-master

# Replace yarn artifactory with Okta's
sed -i "s#${YARN_REGISTRY}#${OKTA_REGISTRY}#" yarn.lock

export PATH="${PATH}:$(yarn global bin)"

# Install required dependencies
yarn global add @okta/ci-append-sha
yarn global add @okta/ci-pkginfo

if ! yarn install ; then
  echo "yarn install failed! Exiting..."
  exit ${FAILED_SETUP}
fi

# Revert the original change
sed -i "s#${OKTA_REGISTRY}#${YARN_REGISTRY}#" yarn.lock

function interject() {
    echo "===== ${1} ====="
}

function send_promotion_message() {
    curl -H "Authorization: Bearer ${TESTSERVICE_SLAVE_JWT}" \
      -H "Content-Type: application/json" \
      -X POST -d "[{\"artifactId\":\"$1\",\"repository\":\"npm-topic\",\"artifact\":\"$2\",\"version\":\"$3\",\"promotionType\":\"ARTIFACT\"}]" \
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
