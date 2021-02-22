---
title: Use the SAML 2.0 Assertion flow
---

Before you can begin this flow, you must collect the SAML assertion from the Identity Provider and make sure that it is [base64-encoded](https://www.base64decode.org/). You can then use the assertion in the API call to the [Authorization Server's](/docs/concepts/auth-servers/#custom-authorization-server) `/token` endpoint.

## Request example

If you are using the default Custom Authorization Server, then your request would look something like this:

```bash
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/token \
  --header 'accept: application/json' \
  --header 'authorization: Basic MG9hDc....' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=urn:ietf:params:oauth:grant-type:saml2-bearer' \
  --data 'assertion=<base64-encoded assertion>' \
  --data 'scope=openid offline_access' \
```

> **Note:** The call to your authorization server's `/token` endpoint requires authentication. In this case, it is a Basic Auth digest of the Client ID and secret. You made note of these during <GuideLink link="../setup-app">app setup</GuideLink>. See [Client Authentication Methods](/docs/reference/api/oidc/#client-authentication-methods).

Note the parameters that are being passed:

- `grant_type`: `urn:ietf:params:oauth:grant-type:saml2-bearer`
- `assertion`: A single SAML 2.0 assertion that is [base64-encoded](https://www.base64decode.org/)
- `scope`: `openid` and `offline_access`. The `openid` scope is required. Include `offline_access` if you want a refresh token included. You can request additional scopes. See the **Create Scopes** section of the [Create an Authorization Server guide](/docs/guides/customize-authz-server/create-scopes/).

## Response example

> **Note:** The tokens are truncated for brevity.

```JSON
{
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQiOiJ3UHdvd.....gkJktHWp4YeLBGRxInAP2n4OpK6g1LmtNsEZw",
    "scope": "offline_access openid",
    "refresh_token": "rHXv2mvdmkfp3MwqYjNzrhyuvlVGZF2WgKsYXfTq3Mk",
    "id_token": "eyJraWQ.....h7BYbgCzQ"
}
```

Your application must now extract the token(s) from the HTTP response body and use them to call the resource server on behalf of the user.

<NextSectionLink>Next Steps</NextSectionLink>
