#!/bin/bash
set -e

echo "Checking required secrets..."

get_terminus_secret "/" NETLIFY_AUTH_TOKEN NETLIFY_AUTH_TOKEN
get_terminus_secret "/" NETLIFY_SITE_ID NETLIFY_SITE_ID

if [ -z "$NETLIFY_AUTH_TOKEN" ] || [ -z "$NETLIFY_SITE_ID" ]; then
  echo "Missing required Netlify secrets."
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
  NETLIFY_SITE_NAME="dev-docs-preview"
  NETLIFY_SUBDOMAIN_MAX_LENGTH=63
  NETLIFY_ALIAS_MAX_LENGTH=$((NETLIFY_SUBDOMAIN_MAX_LENGTH - ${#NETLIFY_SITE_NAME} - 2))
  NETLIFY_ALIAS="${BRANCH//./-}"
  VERCEL_DEPLOY_DIR="../packages/@okta/vuepress-site/dist"

  if [ ${#NETLIFY_ALIAS} -gt "$NETLIFY_ALIAS_MAX_LENGTH" ]; then
    NETLIFY_ALIAS="${NETLIFY_ALIAS:0:$NETLIFY_ALIAS_MAX_LENGTH}"
    echo "Branch name exceeds Netlify subdomain length limit. Using trimmed alias: ${NETLIFY_ALIAS}"
  fi

  echo "Deploying preview to Netlify..."
  npx netlify-cli@17.23.5 deploy --alias="${NETLIFY_ALIAS}" --filter @okta/vuepress-site --dir ../packages/@okta/vuepress-site/dist

  export NETLIFY_PREVIEW_URL="https://${NETLIFY_ALIAS}--${NETLIFY_SITE_NAME}.netlify.app"

  echo "Netlify preview link:"
  echo "${NETLIFY_PREVIEW_URL}"

  echo "Deploying preview to Vercel..."
  export VERCEL_PREVIEW_URL="$(bash ./deploy-vercel-preview.sh "${VERCEL_DEPLOY_DIR}" "${NETLIFY_ALIAS}" "${BRANCH}" "${SHA}")"

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
      "Preview: ${NETLIFY_PREVIEW_URL} \n Bacon: <${BACON_LINK}|${SHA}>"\
      "good"

else
  echo "No pull request detected. Not deploying previews."
fi
