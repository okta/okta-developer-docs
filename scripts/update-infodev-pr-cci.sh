#!/bin/bash

export PR_DETAILS=$(curl -s \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer ${OKTA_GH_TOKEN}" \
    https://api.github.com/repos/okta/okta-developer-docs/pulls?head="okta:${CIRCLE_BRANCH}")

export PR_NUMBER=$(echo ${PR_DETAILS} | jq -r '.[0].number')

TARGET_NAME=""

if [ "${URL}" != "null" ]; then
    TARGET_NAME="https://preview-${PR_NUMBER}--reverent-murdock-829d24.netlify.app"
    echo Added preview link to PR
    ISSUE_COMMENTS_BY_BOT=$(curl -L \
        -H "Accept: application/vnd.github+json" \
        -H "Authorization: Bearer ${OKTA_GH_TOKEN}" \
        -H "X-GitHub-Api-Version: 2022-11-28" \
        https://api.github.com/repos/okta/okta-developer-docs/issues/${PR_NUMBER}/comments)
    
    echo ${ISSUE_COMMENTS_BY_BOT}
    filtered_comments=$(echo "$ISSUE_COMMENTS_BY_BOT" | jq '[.[] | select(.user.id == 134 and .body | contains("Preview URL for the changes:"))]')

    echo filtered_comments ${filtered_comments}

    count=$(echo "$filtered_comments" | jq 'length')

    echo count ${count}

    if [[ "$count" -eq 0 ]]; then
        curl -L -s \
            -X POST \
            -H "Accept: application/vnd.github+json" \
            -H "Authorization: Bearer ${OKTA_GH_TOKEN}" \
            -H "X-GitHub-Api-Version: 2022-11-28" \
            https://api.github.com/repos/okta/okta-developer-docs/issues/${PR_NUMBER}/comments \
            -d '{"body":"Preview URL for the changes: '"${TARGET_NAME}"'"}'
    fi
else
    echo There is no PR associated with ${CIRCLE_BRANCH}
fi

# echo Preview Link: ${TARGET_NAME}
