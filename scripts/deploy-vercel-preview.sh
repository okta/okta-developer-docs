#!/bin/bash
set -e

DEPLOY_DIR="$1"
VERCEL_ALIAS="$2"
BRANCH="$3"
SHA="$4"

setup_service node v22.22.2

if [ -z "$DEPLOY_DIR" ] || [ -z "$VERCEL_ALIAS" ] || [ -z "$BRANCH" ] || [ -z "$SHA" ]; then
  echo "Usage: $0 <deploy-dir> <vercel-alias> <branch> <sha>" >&2
  exit 1
fi

MISSING_VERCEL_ENV_VARS=()
[ -z "$VERCEL_TOKEN" ] && MISSING_VERCEL_ENV_VARS+=("VERCEL_TOKEN")
[ -z "$VERCEL_ORG_ID" ] && MISSING_VERCEL_ENV_VARS+=("VERCEL_ORG_ID")
[ -z "$VERCEL_PROJECT_ID" ] && MISSING_VERCEL_ENV_VARS+=("VERCEL_PROJECT_ID")

if [ ${#MISSING_VERCEL_ENV_VARS[@]} -ne 0 ]; then
  echo "Missing required Vercel env vars: ${MISSING_VERCEL_ENV_VARS[*]}" >&2
  exit 1
fi

VERCEL_PROJECT_DIR="${DEPLOY_DIR}/.vercel"
VERCEL_SITE_NAME="developer-docs"
VERCEL_PREVIEW_DOMAIN="${VERCEL_ALIAS}--${VERCEL_SITE_NAME}.vercel.app"
DEPLOY_MESSAGE="Bacon deployment ${BRANCH}:$(echo "${SHA}" | cut -c -7)"

mkdir -p "${VERCEL_PROJECT_DIR}"
printf '{"orgId":"%s","projectId":"%s"}\n' "${VERCEL_ORG_ID}" "${VERCEL_PROJECT_ID}" > "${VERCEL_PROJECT_DIR}/project.json"

echo "Deploying ${DEPLOY_DIR} to Vercel..." >&2
DEPLOY_URL="$(npx vercel@54.2.0 deploy --cwd "${DEPLOY_DIR}" --yes --token="${VERCEL_TOKEN}" --meta "message=${DEPLOY_MESSAGE}")"

echo "Assigning Vercel alias ${VERCEL_PREVIEW_DOMAIN}..." >&2
npx vercel@54.2.0 alias set "${DEPLOY_URL}" "${VERCEL_PREVIEW_DOMAIN}" --token="${VERCEL_TOKEN}" >&2

echo "https://${VERCEL_PREVIEW_DOMAIN}"
