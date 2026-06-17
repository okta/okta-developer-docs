#!/bin/bash

source ${OKTA_HOME}/${REPO}/scripts/setup.sh
cd ${OKTA_HOME}/${REPO}/packages/@okta/vuepress-site
DEPLOY_ENVIRONMENT=""
export REGISTRY_REPO="npm-topic"
export REGISTRY="${ARTIFACTORY_URL}/api/npm/${REGISTRY_REPO}"
export DEPLOY_ENV=""
export MAIN_BRANCH="m""aster"

echo "Current branch is $BRANCH"

# if [[ "$BRANCH" != "master" ]]; then
#     echo "Current branch '$BRANCH' is not 'master'. Exiting with success."
#     exit ${SUCCESS}
# fi

export BACON_ARTIFACT="okta-developer-docs"
export BACON_LINK="https://bacon-go.aue1e.saasure.net/commits?artifact=${BACON_ARTIFACT}&sha=${SHA}"
export SLACK_CHANNEL='#tmp-test-slack-notif'

on_failure() {
  local exit_code=$?
  if [[ $exit_code -ne 0 ]]; then
    send_slack_message "${SLACK_CHANNEL}" \
      "Production deployment failed for developer docs " \
      "Please check bacon task (${BACON_LINK}) for more details. " \
      "danger"
  fi
}
trap on_failure EXIT

DEPLOY_ENVIRONMENT="vuepress-site-prod"

# test exit with error
exit ${BUILD_FAILURE}

# "${MAIN_BRANCH}" branch indecates that current deploy is for production.
# In such case, PROD will take 'prod' value.
# PROD ENV is used to distinguished the prod environment from the test environment (see config.js)
if [[ $BRANCH == "${MAIN_BRANCH}" ]]; then
    DEPLOY_ENV="prod"
else
    DEPLOY_ENV="test"
fi

if ! yarn build; then
    echo "Error building site"
    exit ${BUILD_FAILURE}
fi

if [[ $BRANCH == "${MAIN_BRANCH}" ]]; then
  if ! ci-append-sha --include-count; then
    echo "ci-append-sha failed! Exiting..."
    exit $FAILED_SETUP
  fi
else
  if ! ci-append-sha --include-count --tag ${BRANCH}; then
    echo "ci-append-sha failed! Exiting..."
    exit $FAILED_SETUP
  fi
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

npm config set @okta:registry ${REGISTRY}
if ! npm publish --registry ${REGISTRY}; then
  echo "npm publish failed! Exiting..."
  exit ${BUILD_FAILURE}
fi

ARTIFACT_FILE="$(ci-pkginfo -t pkgname)-$(ci-pkginfo -t pkgsemver).tgz"
DEPLOY_VERSION="$([[ ${ARTIFACT_FILE} =~ vuepress-site-(.*)\.tgz ]] && echo ${BASH_REMATCH[1]})"
ARTIFACT_PATH="@okta/vuepress-site/-/${ARTIFACT_FILE}"

# Only auto-promote to npm-release on main branch
if [[ $BRANCH == "${MAIN_BRANCH}" ]]; then
  if ! trigger_and_wait_release_promotion_task 60; then
    echo "Automatic promotion failed..."
    exit ${BUILD_FAILURE}
  fi
  # update target registry to release for production deploy
  REGISTRY_REPO="npm-release"
fi

# tell conductor to deploy
if ! send_promotion_message "${DEPLOY_ENVIRONMENT}" "${REGISTRY_REPO}" "${ARTIFACT_PATH}" "${DEPLOY_VERSION}"; then
  echo "Error sending promotion event to aperture"
  exit ${BUILD_FAILURE}
fi

if [[ $BRANCH == "${MAIN_BRANCH}" ]]; then
  # Get the Runscope trigger ID
  get_secret prod/tokens/vuepress_runscope_trigger_id RUNSCOPE_TRIGGER_ID

  # Trigger the runscope tests
  curl -I -X GET "https://api.runscope.com/radar/bucket/${RUNSCOPE_TRIGGER_ID}/trigger?base_url=https://developer.okta.com"
fi;

exit ${SUCCESS}
