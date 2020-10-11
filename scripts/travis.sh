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


echo "======="
echo "$NETLIFY_SITE_ID"
echo "======="
echo "$TRAVIS_COMMIT_MESSAGE"
echo "======="
git log $TRAVIS_COMMIT
echo "======="

if [ -n $NETLIFY_SITE_ID ] && git log $TRAVIS_COMMIT | grep -q NFDEPLOY; then
    fold netlify_setup npm install -g netlify-cli
    fold netlify netlify deploy
else
    echo "Will not use Netlify deploy"
fi	
