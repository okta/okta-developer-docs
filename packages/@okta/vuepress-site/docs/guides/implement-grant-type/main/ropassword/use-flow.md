If implementing the Resource Owner Password flow is your only option, you need to make direct calls to the [OIDC & OAuth 2.0 API](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/). See the following sections for requests required in the flow.

### Request for tokens

Before you can begin this flow, collect the user's password in a manner of your choosing. After you collect the credentials, all that's required is a single API call to the [authorization server's](/docs/concepts/auth-servers/) `/token` endpoint. If you're using the org authorization server, then your request would look something like this:

```bash
curl --request POST \
  --url https://{yourOktaDomain}/oauth2/v1/token \
  --header 'accept: application/json' \
  --header 'authorization: Basic MG9hYn...' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=password&username=testuser1%40example.com&password=%7CmCovrlnU9oZU4qWGrhQSM%3Dyd&scope=openid'
```

> **Important:** The call to your [authorization server's](/docs/concepts/auth-servers/) `/token` endpoint requires authentication. In this case, it's a Basic Authentication digest of the client ID and secret. You can find the client ID and secret on your application's **General** tab. See [Client Authentication Methods](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#client-authentication-methods).

Note the parameters that are being passed:

* `grant_type` is `password`, indicating that you're using the Resource Owner Password grant type.
* `username` is the username of a user registered with Okta.
* `password` is the password of a user registered with Okta.
* `scope` is at least `openid`. For custom scopes, see the **Create Scopes** section of the [Create an authorization server guide](/docs/guides/customize-authz-server/main/#create-scopes).

For more information on these parameters, see the [OAuth 2.0 API reference](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/tokenCustomAS).

If the credentials are valid, your application receives back access and ID tokens:

```json
{
    "access_token": "eyJhb[...]56Rg",
    "expires_in": 3600,
    "id_token": "eyJhb[...]yosFQ",
    "scope": "openid",
    "token_type": "Bearer"
}
```

### Validate access token

When your application passes a request with an access token, the resource server needs to validate it. See [Validate access tokens](/docs/guides/validate-access-tokens/).
