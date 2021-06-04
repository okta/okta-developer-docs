#!/bin/bash

source ${OKTA_HOME}/${REPO}/scripts/setup.sh
cd ${OKTA_HOME}/${REPO}/packages/@okta/vuepress-site
DEPLOY_ENVIRONMENT=""
export REGISTRY_REPO="npm-topic"
export REGISTRY="${ARTIFACTORY_URL}/api/npm/${REGISTRY_REPO}"
export PROD_ENV=""

declare -A branch_environment_map
branch_environment_map[master]=vuepress-site-prod
branch_environment_map[staging]=vuepress-site-preprod

if [[ $BRANCH == "master" ]]; then
    PROD_ENV = "true"
fi

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

if [[ $BRANCH == "master" ]]; then
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
if [[ $BRANCH == "master" ]]; then
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

if [[ $BRANCH == "master" ]]; then
  # Get the Runscope trigger ID
  get_secret prod/tokens/vuepress_runscope_trigger_id RUNSCOPE_TRIGGER_ID

  # Trigger the runscope tests
  curl -I -X GET "https://api.runscope.com/radar/bucket/${RUNSCOPE_TRIGGER_ID}/trigger?base_url=https://developer.okta.com"
fi;

exit ${SUCCESS}
