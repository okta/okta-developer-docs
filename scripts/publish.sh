#!/bin/bash

source ${OKTA_HOME}/${REPO}/scripts/setup.sh
cd ${OKTA_HOME}/${REPO}/packages/@okta/vuepress-site
REGISTRY="${ARTIFACTORY_URL}/api/npm/npm-okta"

if ! yarn build; then
    echo "Error building site"
    exit ${BUILD_FAILURE}
fi

interject "Generating conductor file in $(pwd)"
if ! generate_conductor_file; then
    echo "Error generating conductor file"
    exit ${BUILD_FAILURE}
fi

if [ -n "$action_branch" ];
then
  interject "Publishing from bacon task using branch $action_branch"
  TARGET_BRANCH=$action_branch
else
  interject "Publishing from bacon testSuite using branch $BRANCH"
  TARGET_BRANCH=$BRANCH
fi

if ! ci-update-package --branch ${TARGET_BRANCH}; then
  echo "ci-update-package failed! Exiting..."
  exit ${BUILD_FAILURE}
fi

if ! npm publish --registry ${REGISTRY}; then
  echo "npm publish failed! Exiting..."
  exit ${BUILD_FAILURE}
fi

DATALOAD=$(ci-pkginfo -t dataload)
if ! artifactory_curl -X PUT -u ${ARTIFACTORY_CREDS} ${DATALOAD} -v -f; then
  echo "artifactory_curl failed! Exiting..."
  exit $PUBLISH_ARTIFACTORY_FAILURE
fi

ARTIFACT_FILE="$([[ ${DATALOAD} =~ vuepress-site-(.*)\.tgz ]] && echo ${BASH_REMATCH})"
DEPLOY_VERSION="$([[ ${ARTIFACT_FILE} =~ vuepress-site-(.*)\.tgz ]] && echo ${BASH_REMATCH[1]})"
ARTIFACT="@okta/vuepress-site/-/@okta/${ARTIFACT_FILE}"

if ! send_promotion_message "vuepress-site-preprod" "${ARTIFACT}" "${DEPLOY_VERSION}"; then
  echo "Error sending promotion event to aperture"
  exit ${BUILD_FAILURE}
fi

# Get the Runscope trigger ID
get_secret prod/tokens/vuepress_runscope_trigger_id RUNSCOPE_TRIGGER_ID

# Get the staging url for vuepress site
get_secret prod/env/vuepress_staging_url STAGING_BASE_URL_RUNSCOPE

# Trigger the runscope tests
curl -I -X GET "https://api.runscope.com/radar/bucket/${RUNSCOPE_TRIGGER_ID}/trigger?base_url=${STAGING_BASE_URL_RUNSCOPE}"

exit ${SUCCESS}
