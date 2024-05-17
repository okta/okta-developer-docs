#!/bin/bash

export PR_DETAILS=$(curl -s \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer ${OKTA_GH_TOKEN}" \
    https://api.github.com/repos/okta/okta-developer-docs/pulls?head="okta:${CIRCLE_BRANCH}")

export PR_NUMBER=$(echo ${PR_DETAILS} | jq -r '.[0].number')

TARGET_NAME=""

if [ "${URL}" != "null" ]; then
    TARGET_NAME="https://preview-${PR_NUMBER}--reverent-murdock-829d24.netlify.app"
    ALL_COMMENTS=$(curl -L \
        -H "Accept: application/vnd.github+json" \
        -H "Authorization: Bearer ${OKTA_GH_TOKEN}" \
        -H "X-GitHub-Api-Version: 2022-11-28" \
        https://api.github.com/repos/okta/okta-developer-docs/issues/${PR_NUMBER}/comments)
    
    ALL_COMMENTS_JSON=$(cat <<EOF
${ALL_COMMENTS}
EOF
)
    # Filter comments by github okta bot on the PR.
    okta_gh_bot_comments=$(echo "$ALL_COMMENTS_JSON" | jq '[.[] | select(.user.id == 164419112)]')
    count_of_okta_gh_bot_comments=$(echo "$okta_gh_bot_comments" | jq 'length')
    echo count123 $count_of_okta_gh_bot_comments
    preview_urls_filtered_comments=$(echo "$okta_gh_bot_comments" | jq '.[] | select(.body | contains("Preview URL for the changes"))')
    echo $preview_urls_filtered_comments
    count_of_okta_gh_bot_comments_with_preview_urls=$(echo "$preview_urls_filtered_comments" | jq 'length')
    echo $count_of_okta_gh_bot_comments_with_preview_urls

    # Add the preview link only if there are no previous comments by the gh bot on the PR since the preview URL will remain the same everytime.
    if [[ "$count_of_okta_gh_bot_comments_with_preview_urls" -eq 0 ]]; then
        echo Added preview link to PR
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

echo Preview Link: ${TARGET_NAME}
