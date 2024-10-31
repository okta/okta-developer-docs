#!/usr/bin/env bash
[ -n "${DEBUG}" ] && set -x
set -euo pipefail

curl -sSfL https://git.io/getwoke | \
  sudo bash -s -- -b /usr/local/bin v0.19.0

woke --disable-default-rules --exit-1-on-failure