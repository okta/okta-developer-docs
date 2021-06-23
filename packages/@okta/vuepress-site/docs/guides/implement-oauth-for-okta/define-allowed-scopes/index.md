---
title: Define allowed scopes
---

When a request is sent to the Okta Org Authorization Server's `/authorize` endpoint, it validates all of the requested scopes in the request against the app's grants collection. The scope is granted if it exists in the app's grants collection.

> **Note:** Only the Super Admin role has permissions to grant scopes to an app.

1. Sign in to your Okta organization with your administrator account.
1. In the Admin Console, go to **Applications** > **Applications**.
1. Select the OpenID Connect (OIDC) or OAuth 2.0 app that needs grants added.
1. Select the **Okta API Scopes** tab and then click **Grant** for each of the scopes that you want to add to the application's grant collection.

Alternatively, you can add grants using the `/grants` API. The following is an example request to create a grant for the `okta.users.read` scope.

```bash
curl --location --request POST 'https://${yourOktaDomain}/api/v1/apps/client_id/grants' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: SSWS ${api_token}' \
--data-raw '{
    "scopeId": "okta.users.read",
    "issuer": "https://${yourOktaDomain}"
}'
```

> **Note:** You can find a list of available values for `scopeId` in the <GuideLink link="../scopes">Scopes and supported endpoints</GuideLink> section.

<NextSectionLink/>
