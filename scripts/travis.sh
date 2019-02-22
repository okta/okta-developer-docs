#!/bin/bash
set -e

source "${0%/*}/helpers.sh"


export CHROME_HEADLESS=true

# Run the npm install to pull in test dependencies
fold yarn_install yarn install

# Build site and Run tests
fold yarn_test yarn test
