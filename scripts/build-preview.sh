#!/bin/bash
set -e

echo "Checking required secrets..."

get_terminus_secret "/" NETLIFY_AUTH_TOKEN NETLIFY_AUTH_TOKEN
get_terminus_secret "/" NETLIFY_SITE_ID NETLIFY_SITE_ID

if [ -z "$NETLIFY_AUTH_TOKEN" ] || [ -z "$NETLIFY_SITE_ID" ]; then
  echo "Missing required secrets."
  exit 1
fi

echo "Installing NVM..."

export NVM_DIR="$HOME/.nvm"

if [ ! -d "$NVM_DIR" ]; then
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
fi

[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

echo "Installing Node 16..."
nvm install 16
nvm use 16

echo "Node version:"
node -v
echo "NPM version:"
npm -v

echo "Installing Yarn..."
npm install -g yarn

echo "Installing dependencies..."
yarn install --frozen-lockfile --ignore-platform

echo "Building preview..."
yarn build

echo "Deploying preview to Netlify..."

if [ -n "$BRANCH" ]; then
  npx netlify-cli@17.23.5 deploy --alias="${BRANCH}" --filter @okta/vuepress-site --dir ../packages/@okta/vuepress-site/dist

  echo "Preview link:"
  echo "https://${BRANCH}--dev-docs-preview.netlify.app"

else
  echo "No pull request detected. Not deploying to Netlify."
fi