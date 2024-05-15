#!/bin/bash

netlify deploy --alias=preview-${CIRCLE_PULL_REQUEST##*/} --filter @okta/vuepress-site

TARGET_NAME="https://preview-${CIRCLE_PULL_REQUEST}--reverent-murdock-829d24.netlify.app"

echo ${CIRCLE_BRANCH}
echo ${TARGET_NAME}

export HTTP_FIND_PR=$(curl -s \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer ${OKTA_GH_TOKEN}" \
    https://api.github.com/repos/okta/okta-developer-docs/pulls?head="okta:${CIRCLE_BRANCH}")

echo ${HTTP_FIND_PR}

export URL=$(echo ${HTTP_FIND_PR} | jq -r '.[0].html_url')
export PR_NUMBER=$(echo ${HTTP_FIND_PR} | jq -r '.[0].number')

if [ "${URL}" != "null" ]; then
    echo Added preview link to PR
    curl -L -s \
        -X POST \
        -H "Accept: application/vnd.github+json" \
        -H "Authorization: Bearer ${OKTA_GH_TOKEN}" \
        -H "X-GitHub-Api-Version: 2022-11-28" \
        https://api.github.com/repos/okta/okta-developer-docs/issues/${PR_NUMBER}/comments \
        -d '{"body":"Preview URL: '"${TARGET_NAME}"'"}'
else
    echo There is no PR associated with ${CIRCLE_BRANCH}
fi

echo
echo PR: ${TARGET_NAME}
