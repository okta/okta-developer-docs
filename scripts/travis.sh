#!/bin/bash
set -e

source "${0%/*}/helpers.sh"

export CHROME_HEADLESS=true

# Check the links
# Note: yarn build should already have been run in before_script travis step
# so we don't have to run it again here

# MDS INFO: this is NOT the bash fold command, it's a function in helpers.sh
fold yarn_check_links yarn broken-link-checker:internal

# Build site and Run tests
fold yarn_test yarn test

# Will run the netlify deploy if:
# - NETLIFY_SITE_ID and NETLIFY_AUTH_TOKEN is present (will not be true on forks)
# - The latest commit message on the PR includes the text NFDEPLOY

# MDS INFO: If the length of $NETLIFY_SITE_ID is greater than 0 and
#           the raw (%B) git log for the last commit (-n1) identified with the revision
#           number $TRAVIS_PULL_REQUEST_SHA contains the string "NFDEPLOY" (pip through grep)
#             then
if [ -n $NETLIFY_SITE_ID ] && git log -n1 --pretty=format:"%B" $TRAVIS_PULL_REQUEST_SHA | grep -q NFDEPLOY; then
    fold netlify_setup npm install -g netlify-cli
    fold netlify netlify deploy
else
    echo "Will not use Netlify deploy"
fi
