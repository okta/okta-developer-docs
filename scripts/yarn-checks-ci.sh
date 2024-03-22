#!/bin/bash
set -e

source "${0%/*}/helpers.sh"

export CHROME_HEADLESS=true

# Check the links
# Note: yarn build should already have been run in previous github action step
# so we don't have to run it again here
group yarn_check_links yarn broken-link-checker:internal

# Build site and Run tests
group yarn_test yarn test:ci
