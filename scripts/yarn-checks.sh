#!/bin/bash
set -e

source "${0%/*}/helpers.sh"

export CHROME_HEADLESS=true

# Check the links
# Note: yarn build should already have been run in previous github action step
# so we don't have to run it again here
group yarn_check_links yarn broken-link-checker:internal

# Build site and Run tests
group yarn_test yarn test

# Will run the netlify deploy if:
# - NETLIFY_SITE_ID and NETLIFY_AUTH_TOKEN is present (will not be true on forks)
# - The latest commit message on the PR includes the text NFDEPLOY
# if [ -n $NETLIFY_SITE_ID ] && git log -n1 --pretty=format:"%B" $TRAVIS_PULL_REQUEST_SHA | grep -q NFDEPLOY; then
#     group netlify_setup npm install -g netlify-cli@^12
#     group netlify netlify deploy
# else
#     echo "Will not use Netlify deploy"
# fi
