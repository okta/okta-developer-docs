#!/bin/sh
echo "[build.sh] NODE_OPTIONS inherited from environment: '${NODE_OPTIONS}'"
# Preserve inherited options (such as --use-openssl-ca), adding a heap limit
# only when one has not been explicitly configured.
case " ${NODE_OPTIONS:-} " in
  *" --max-old-space-size="*|*" --max_old_space_size="*) ;;
  *) export NODE_OPTIONS="${NODE_OPTIONS:+${NODE_OPTIONS} }--max-old-space-size=8192" ;;
esac
echo "[build.sh] NODE_OPTIONS in effect: '${NODE_OPTIONS}'"
node -e "console.log('[build.sh] effective V8 heap limit (MB):', Math.round(require('v8').getHeapStatistics().heap_size_limit/1024/1024))"
# Render worker count. When unset, updateBuildScript.js uses (CPU count - 1), capped at 6.
echo "[build.sh] BUILD_WORKER_THREADS: '${BUILD_WORKER_THREADS:-auto}'"
cp .vuepress/scripts/updateBuildScript.js ../../../node_modules/@vuepress/core/lib/node/build/index.js
cp .vuepress/scripts/addWorkerScript.js ../../../node_modules/@vuepress/core/lib/node/build/worker.js
vuepress build . && cp conductor.yml dist/conductor.yml && node .vuepress/scripts/fix-robots.js
