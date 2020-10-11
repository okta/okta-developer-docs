#!/bin/bash
set -e

source "${0%/*}/helpers.sh"

export CHROME_HEADLESS=true

# Run the yarn install to pull in test dependencies
fold yarn_install yarn install

# Lint the markdown
#fold yarn_markdown_check yarn markdown-lint

# Check the links
fold yarn_check_links yarn check-links

# Build site and Run tests
fold yarn_test yarn test

# Will run the netlify deploy if:
# - The site ID is present (will not be true on forks)
# - The latest commit message on the PR includes the text NFDEPLOY
#
# Note: netflicy-cli expects that NETLIFY_AUTH_TOKEN is present
if [ -n $NETLIFY_SITE_ID ] && git log -n1 --pretty=format:"%B" $TRAVIS_PULL_REQUEST_SHA | grep -q NFDEPLOY; then
    fold netlify_setup npm install -g netlify-cli
    fold netlify netlify deploy
else
    echo "Will not use Netlify deploy"
fi	
