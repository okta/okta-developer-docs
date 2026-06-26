#!/bin/bash
set -e

echo Installing dependencies

ARTIFACTORY_URL=$(ocm config get artifactory.base_url 2>/dev/null) || ARTIFACTORY_URL="artifacts.aue1e.internal"
echo Artifactory url: $ARTIFACTORY_URL

OKTA_REGISTRY="https://${ARTIFACTORY_URL}/artifactory/api/npm/npm-okta-master/"
PUBLIC_REGISTRY="https://registry.yarnpkg.com/"
OKTA_ODYSSEY="/odyssey/-/@okta/odyssey"
PUBLIC_OKTA_ODYSSEY="/odyssey/-/odyssey"

YARN_LOCK="yarn.lock"

if [ -f "$YARN_LOCK" ]; then
  sed -i '' "s|$PUBLIC_REGISTRY|$OKTA_REGISTRY|g; s|$PUBLIC_OKTA_ODYSSEY|$OKTA_ODYSSEY|g" "$YARN_LOCK"
fi
yarn install
sed -i '' "s|$OKTA_REGISTRY|$PUBLIC_REGISTRY|g; s|$OKTA_ODYSSEY|$PUBLIC_OKTA_ODYSSEY|g" "$YARN_LOCK"

echo Done!
