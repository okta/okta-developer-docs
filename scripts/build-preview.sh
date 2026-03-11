#!/bin/bash
set -e

echo "Checking required secrets..."

get_terminus_secret "/" NETLIFY_AUTH_TOKEN NETLIFY_AUTH_TOKEN
get_terminus_secret "/" NETLIFY_SITE_ID NETLIFY_SITE_ID

if [ -z "$NETLIFY_AUTH_TOKEN" ] || [ -z "$NETLIFY_SITE_ID" ]; then
  echo "Missing required secrets."
  exit 1
fi

Xvfb :99 -screen 0 1366x768x16 &
yum update -y
yum -y install gtk2-2.24* xorg-x11-server-Xvfb libXtst* libXScrnSaver* GConf2* alsa-lib* gtk3

setup_service node v16.14.0
setup_service yarn 1.22.22

echo "Installing dependencies..."
yarn install --frozen-lockfile --ignore-platform

echo "Building preview..."
yarn build

echo "Deploying preview to Netlify..."

if [ -n "$BRANCH" ]; then
  npx netlify-cli@17.23.5 deploy --alias="preview-${BRANCH}" --filter @okta/vuepress-site --dir ../packages/@okta/vuepress-site/dist

  echo "Preview link:"
  echo "https://preview-${BRANCH}--dev-docs-preview.netlify.app"

else
  echo "No pull request detected. Not deploying to Netlify."
fi