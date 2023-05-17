Before you can begin this flow, you must collect the SAML assertion from the Identity Provider and make sure that it is Base64-encoded. You can then use the assertion in the API call to the [authorization server's](/docs/concepts/auth-servers/#custom-authorization-server) `/token` endpoint.

> **Note:** The example request in the next section shows you the direct [OIDC & OAuth 2.0 API](/docs/reference/api/oidc/) call. Typically, you don't need to make direct calls to the API if you're using one of Okta's Authentication SDKs that support SAML 2.0 Assertion.

### Request example

If you are using the default custom authorization server, then your request would look something like this:

```bash
curl --location --request POST 'https://${yourOktaDomain}/oauth2/default/v1/token' \
--header 'Accept: application/json' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Basic MG9hb....' \
--data-urlencode 'grant_type=urn:ietf:params:oauth:grant-type:saml2-bearer' \
--data-urlencode 'scope=openid offline_access' \
--data-urlencode 'assertion=<Base64-encoded assertion>'
```

> **Note:** The call to your authorization server's `/token` endpoint requires authentication. In this case, it is a Basic Auth digest of the Client ID and secret. You made note of these during [set up your app](#set-up-your-app). See [Client Authentication Methods](/docs/reference/api/oidc/#client-authentication-methods).

Note the parameters that are being passed:

- `grant_type`: `urn:ietf:params:oauth:grant-type:saml2-bearer`
- `assertion`: A single SAML 2.0 assertion that is Base64-encoded
- `scope`: `openid` and `offline_access`. The `openid` scope is required. Include `offline_access` if you want a refresh token included. You can also request additional scopes. See the **Create Scopes** section of the [Create an authorization server guide](/docs/guides/customize-authz-server/main/#create-scopes).

### Response example

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