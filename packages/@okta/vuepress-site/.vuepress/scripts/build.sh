#!/bin/sh
#
# TODO: Replace this with a cross-environment script

echo "Generating list of guides"
.vuepress/scripts/build-guides-list.sh > .vuepress/guides-list.json
vuepress build . && cp conductor.yml dist/conductor.yml

