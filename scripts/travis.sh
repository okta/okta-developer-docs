#!/bin/bash
set -e

# source "${0%/*}/helpers.sh"

# export CHROME_HEADLESS=true

# # Run the yarn install to pull in test dependencies
# fold yarn_install yarn install

# # Lint the markdown
# #fold yarn_markdown_check yarn markdown-lint

# # Check the links
# fold yarn_check_links yarn check-links

# # Build site and Run tests
# fold yarn_test yarn test


echo "=======NETLIFY_SITE_ID"
echo "$NETLIFY_SITE_ID"
echo "=======TRAVIS_COMMIT_MESSAGE"
echo "$TRAVIS_COMMIT_MESSAGE"
echo "=======TRAVIS_COMMIT"
echo "$TRAVIS_COMMIT"
echo "=======TRAVIS_PULL_REQUEST_SHA"
echo "$TRAVIS_PULL_REQUEST_SHA"
echo "=======TRAVIS_PULL_REQUEST_BRANCH"
echo "$TRAVIS_PULL_REQUEST_BRANCH"
echo "======="
git log -n1 --pretty=format:"%B" $TRAVIS_PULL_REQUEST_BRANCH
echo "======="

if [ -n $NETLIFY_SITE_ID ] && git log $TRAVIS_COMMIT | grep -q NFDEPLOY; then
    echo "WILL DEPLOY"
    # fold netlify_setup npm install -g netlify-cli
    # fold netlify netlify deploy
else
    echo "Will not use Netlify deploy"
fi	
