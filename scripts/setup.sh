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

function interject() {
    echo "===== ${1} ====="
}

function send_promotion_message() {
    curl -H "Authorization: Bearer ${TESTSERVICE_SLAVE_JWT}" \
      -H "Content-Type: application/json" \
      -X POST -d "[{\"artifactId\":\"$1\",\"repository\":\"npm-release\",\"artifact\":\"$2\",\"version\":\"$3\",\"promotionType\":\"ARTIFACT\"}]" \
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
