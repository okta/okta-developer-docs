---
title: Define allowed scopes
---
When a request is sent to the Okta Org Authorization Server, it validates all of the requested scopes in the access token against the app's grants collection. The scope is granted if it exists in the app's grants collection.

## Add grants using the Developer Console
1. From the Developer Console, click **Applications**, and then select the OpenID Connect (OIDC) or OAuth 2.0 app that you want to add grants to.
2. Select the **Okta API Scopes** tab and then click **Grant** for each of the scopes that you want to add to the application's grant collection. 

Alternatively, you can add grants using the API:
The following is an example request to create a grant for the `okta.users.manage` scope.

```json
POST /api/v1/apps/{{clientID}}/grants

{
    "scopeId": "okta.users.manage", //one of the available scopes
    "issuer": "https://example.oktapreview.com"  //your Org URL
}
```
> **Note:** The list of available values for `scopeId` can be found in the <GuideLink link="../scopes">Scopes & Supported Endpoints</GuideLink> section.

<NextSectionLink/>
