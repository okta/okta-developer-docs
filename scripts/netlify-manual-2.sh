#!/bin/bash
set -e

echo "Checking required secrets..."

get_terminus_secret "/" NETLIFY_AUTH_TOKEN NETLIFY_AUTH_TOKEN
get_terminus_secret "/" NETLIFY_SITE_ID NETLIFY_SITE_ID

if [ -z "$NETLIFY_AUTH_TOKEN" ] || [ -z "$NETLIFY_SITE_ID" ]; then
  echo "Missing required secrets."
  exit 1
fi

echo "Installing dependencies..."
curl -o- -L https://yarnpkg.com/install.sh | bash
yarn -v
yarn install --frozen-lockfile --ignore-platform

echo "Building preview..."
yarn build

echo "Deploying preview to Netlify..."

if [ -n "$CIRCLE_PULL_REQUEST" ]; then
  PR_NUMBER="${CIRCLE_PULL_REQUEST##*/}"

  npx netlify-cli@17.23.5 deploy \
    --alias="preview-${PR_NUMBER}" \
    --filter @okta/vuepress-site

  echo "Preview link:"
  echo "https://preview-${PR_NUMBER}--reverent-murdock-829d24.netlify.app"

else
  echo "No pull request detected. Deploying without PR alias."

  npx netlify-cli@17.23.5 deploy --alias="preview-test-bacon" --filter @okta/vuepress-site
fi