#!/bin/bash

export AURM_BASE_URL="https://api.aurm.prod.aue1k.saasure.net"
export ES_APP_NAME="info-dev-bot-okta"
export AURM_TOKEN=$(generate_aurm_token "$ACCESS_KEY" "$SECRET_KEY")

export GH_TOKEN_RESPONSE=$(curl --ssl-no-revoke --location 'https://aurm-prod.aue1e.saasure.net/services/github/resources/'${ES_APP_NAME}'/credential-source/vend' \
    --header 'x-aurm-token: '${AURM_TOKEN}'' \
    --header 'Content-Type: application/json' \
    --data '{
        "input": {
            "org": "okta"
        }
    }')

export GITHUB_TOKEN=$(echo $GH_TOKEN_RESPONSE | jq -r '.result.token')

echo "Obtained GitHub token from AURM ${GITHUB_TOKEN}"

setup_github_token

# export OUTPUT_REPO=output_repo
# export GIT_REPO=https://oauth2:${GITHUB_TOKEN}@github.com/atko-eng/okta-help.git

# ocm config list
# which git

# git config --global credential.credentialStore dpapi

# git clone --depth 1 ${GIT_REPO} ${OUTPUT_REPO}