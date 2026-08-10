#!/bin/sh
echo "[build.sh] NODE_OPTIONS inherited from environment: '${NODE_OPTIONS}'"
export NODE_OPTIONS="${NODE_OPTIONS:-"--max-old-space-size=8192"}"
echo "[build.sh] NODE_OPTIONS in effect: '${NODE_OPTIONS}'"
node -e "console.log('[build.sh] effective V8 heap limit (MB):', Math.round(require('v8').getHeapStatistics().heap_size_limit/1024/1024))"
export BUILD_WORKER_THREADS="${BUILD_WORKER_THREADS:-2}"
cp .vuepress/scripts/updateBuildScript.js ../../../node_modules/@vuepress/core/lib/node/build/index.js
cp .vuepress/scripts/addWorkerScript.js ../../../node_modules/@vuepress/core/lib/node/build/worker.js
vuepress build . && cp conductor.yml dist/conductor.yml && node .vuepress/scripts/fix-robots.js
