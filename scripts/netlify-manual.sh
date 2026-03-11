#!/bin/bash
set -e

echo "Checking required secrets..."

get_terminus_secret "/" NETLIFY_AUTH_TOKEN NETLIFY_AUTH_TOKEN
get_terminus_secret "/" NETLIFY_SITE_ID NETLIFY_SITE_ID

if [ -z "$NETLIFY_AUTH_TOKEN" ] || [ -z "$NETLIFY_SITE_ID" ]; then
  echo "Missing required secrets."
  exit 1
fi

########################################
# Install NVM
########################################
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

########################################
# Install project dependencies
########################################
echo "Installing dependencies..."
yarn install --frozen-lockfile --ignore-platform

########################################
# Build site
########################################
echo "Building preview..."
# yarn build

nvm install 18
nvm use 18

########################################
# Install Netlify CLI
########################################
echo "Installing Netlify CLI..."
npm install -g netlify-cli@17.23.5 --unsafe-perm

########################################
# Deploy preview
########################################
echo "Deploying preview to Netlify..."

if [ -n "$CIRCLE_PULL_REQUEST" ]; then
  PR_NUMBER="${CIRCLE_PULL_REQUEST##*/}"
  netlify deploy --alias="preview-${PR_NUMBER}" --filter @okta/vuepress-site
else
  echo "No pull request detected. Deploying without PR alias."
  netlify deploy --alias="preview-test-bacon" --filter @okta/vuepress-site
fi

########################################
# Log preview link
########################################
if [ -n "$CIRCLE_PULL_REQUEST" ]; then
  PR_NUMBER="${CIRCLE_PULL_REQUEST##*/}"
  echo "Preview link:"
  echo "https://preview-${PR_NUMBER}--reverent-murdock-829d24.netlify.app"
else
  echo "No pull request detected. Preview link not available."
fi