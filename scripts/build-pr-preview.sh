#!/bin/bash

# This is the travis.sh shell script without the conditional check for an empty NFDEPLOY commit
set -e

source "${0%/*}/helpers.sh"

export CHROME_HEADLESS=true

# Check the links
# Note: yarn build should already have been run in before_script travis step
# so we don't have to run it again here
fold yarn_check_links yarn broken-link-checker:internal

# Build site and Run tests
fold yarn_test yarn test

fold netlify_setup npm install -g netlify-cli
fold netlify netlify deploy
