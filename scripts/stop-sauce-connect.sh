#!/bin/bash
set -e

if [[ $TRAVIS_EVENT_TYPE == 'push' ]] && [[ ! $SKIP_SAUCELABS == true ]]
then
  sudo pkill -SIGINT -f 'sc'
fi
