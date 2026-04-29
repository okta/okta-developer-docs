#!/bin/sh
export NODE_OPTIONS="--max-old-space-size=4096"
export BUILD_WORKER_THREADS="${BUILD_WORKER_THREADS:-2}"
cp .vuepress/scripts/updateBuildScript.js ../../../node_modules/@vuepress/core/lib/node/build/index.js
cp .vuepress/scripts/addWorkerScript.js ../../../node_modules/@vuepress/core/lib/node/build/worker.js
vuepress build . && cp conductor.yml dist/conductor.yml && node .vuepress/scripts/fix-robots.js
