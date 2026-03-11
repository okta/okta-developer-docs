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

# Load nvm
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

########################################
# Install Node
########################################
echo "Installing Node 16..."
nvm install 16
nvm use 16

echo "Node version:"
node -v
echo "NPM version:"
npm -v

########################################
# Install Yarn
########################################
echo "Installing Yarn..."
npm install -g yarn

# echo "Installing dependencies..."
# curl -o- -L https://yarnpkg.com/install.sh | bash
# yarn -v
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

  npx netlify-cli@17.23.5 deploy --alias="preview-test-bacon" --filter @okta/vuepress-site --dir=packages/@okta/vuepress-site/dist
fi