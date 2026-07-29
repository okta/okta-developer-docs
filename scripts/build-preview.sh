#!/bin/bash
set -e

echo "Checking required secrets..."

get_terminus_secret "/" VERCEL_TOKEN VERCEL_TOKEN
get_terminus_secret "/" VERCEL_ORG_ID VERCEL_ORG_ID
get_terminus_secret "/" VERCEL_PROJECT_ID VERCEL_PROJECT_ID

if [ -z "$VERCEL_TOKEN" ] || [ -z "$VERCEL_ORG_ID" ] || [ -z "$VERCEL_PROJECT_ID" ]; then
  echo "Missing required Vercel secrets."
  exit 1
fi

echo "Installing Node 16..."

setup_service node v16.20.2

echo "Installing Yarn..."
npm install -g yarn

echo "Installing dependencies..."
yarn install --frozen-lockfile --ignore-platform

echo "Building preview..."
yarn build-with-redirect

if [ -n "$BRANCH" ]; then
  VERCEL_SITE_NAME="developer-docs"
  VERCEL_SUBDOMAIN_MAX_LENGTH=63
  VERCEL_ALIAS_MAX_LENGTH=$((VERCEL_SUBDOMAIN_MAX_LENGTH - ${#VERCEL_SITE_NAME} - 2))
  VERCEL_ALIAS="${BRANCH//./-}"
  VERCEL_DEPLOY_DIR="../packages/@okta/vuepress-site/dist"

  if [ ${#VERCEL_ALIAS} -gt "$VERCEL_ALIAS_MAX_LENGTH" ]; then
    VERCEL_ALIAS="${VERCEL_ALIAS:0:$VERCEL_ALIAS_MAX_LENGTH}"
    echo "Branch name exceeds Vercel subdomain length limit. Using trimmed alias: ${VERCEL_ALIAS}"
  fi

  # Ensure the alias does not end with a hyphen after trimming.
  VERCEL_ALIAS="${VERCEL_ALIAS%-}"

  echo "Deploying preview to Vercel..."
  VERCEL_PREVIEW_URL="$(bash ./deploy-vercel-preview.sh "${VERCEL_DEPLOY_DIR}" "${VERCEL_ALIAS}" "${BRANCH}" "${SHA}")"
  export VERCEL_PREVIEW_URL

  echo "Vercel preview link:"
  echo "${VERCEL_PREVIEW_URL}"

  export SHA_LINK="https://github.com/okta/okta-developer-docs/commit/${SHA}"
  export BACON_LINK="https://bacon-go.aue1e.saasure.net/commits?artifact=okta-developer-docs&sha=${SHA}"
  export BRANCH_LINK="https://github.com/okta/okta-developer-docs/compare/${BRANCH}"

  if [[ -n "$AUTHOR" ]]; then
    AUTHOR_USERNAME="${AUTHOR%@*}"
    export AUTHOR_SLACK_HANDLE="@${AUTHOR_USERNAME}"
  else
    echo "Error: AUTHOR environment variable is not set. Cannot determine Slack handle for notifications. Exiting..."
    exit 1
  fi

  send_slack_message "${AUTHOR_SLACK_HANDLE}" \
      "Preview for your topic branch <${BRANCH_LINK}|${BRANCH}> is ready :white_check_mark:" \
      "Preview: ${VERCEL_PREVIEW_URL} \n Bacon: <${BACON_LINK}|${SHA}>"\
      "good"

else
  echo "No pull request detected. Not deploying previews."
fi
