#!/bin/bash

source ${OKTA_HOME}/${REPO}/scripts/setup.sh
cd ${OKTA_HOME}/${REPO}/packages/@okta/vuepress-site
DEPLOY_ENVIRONMENT=""
REGISTRY="${ARTIFACTORY_URL}/api/npm/npm-okta"

declare -A branch_environment_map
branch_environment_map[master]=vuepress-site-prod
branch_environment_map[staging]=vuepress-site-preprod

if ! yarn build; then
    echo "Error building site"
    exit ${BUILD_FAILURE}
fi

# Check if we are in one of our publish branches
if [[ -z "${branch_environment_map[$BRANCH]+unset}" ]]; then
    echo "Current branch is not a publish branch"
    exit ${SUCCESS}
else
    DEPLOY_ENVIRONMENT=${branch_environment_map[$BRANCH]}
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

if ! send_promotion_message "${DEPLOY_ENVIRONMENT}" "${ARTIFACT}" "${DEPLOY_VERSION}"; then
  echo "Error sending promotion event to aperture"
  exit ${BUILD_FAILURE}
fi

# Get the Runscope trigger ID
get_secret prod/tokens/vuepress_runscope_trigger_id RUNSCOPE_TRIGGER_ID

# Trigger the runscope tests
curl -I -X GET "https://api.runscope.com/radar/bucket/${RUNSCOPE_TRIGGER_ID}/trigger?base_url=https://developer.okta.com"

exit ${SUCCESS}
