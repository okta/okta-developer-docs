#!/bin/bash
set -e

if [[ $TRAVIS_EVENT_TYPE == 'push' ]] && [[ ! $SKIP_SAUCELABS == true ]]
then
  tar -xvzf sc-4.5.3-linux.tar.gz &&
  ./sc-4.5.3-linux/bin/sc -i $TRAVIS_JOB_NUMBER -l ~/sc.log &
fi
