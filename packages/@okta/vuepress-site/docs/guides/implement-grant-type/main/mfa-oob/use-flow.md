The following sections outline the requests required to implement the MFA OOB flow using direct calls to the Okta OIDC & OAuth 2.0 API.

### Initial request for tokens

Before you can begin this flow, collect the username and password from the user in a manner of your choosing. Then, make an API call to the [authorization server's](/docs/concepts/auth-servers/) `/token` endpoint using the Resource Owner Password grant type. If you're using the [default custom authorization server](/docs/concepts/auth-servers/#default-custom-authorization-server), then your request would look something like this:

```bash
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/token \
  --header 'accept: application/json' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id=${client_id}&scope=openid profile&grant_type=password&username=${testuser%40example.com}&password={$userpassword}'
```

Note the parameters that are passed:

- `client_id` matches the client ID of the native application that you created in the [Set up your app](#set-up-your-app) section. You can find it at the top of your app's **General** tab.
- `scope` must be at least `openid`. See the **Create Scopes** section of the [Create an authorization server guide](/docs/guides/customize-authz-server/main/#create-scopes).
- `grant_type` is `password`, indicating that you are using the Resource Owner Password grant type.
- `username` is the identifier for the user (email).
- `password` is the password of the matching user.

For more information on these parameters, see [Custom Authorization Servers](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/challengeCustomAS).

**Response**

Since this is a two factor flow, Okta sends an HTTP 403 error and includes the `mfa_token` in the response. The `mfa_token` is a unique token used for identifying multi-step authentication flows, linking the request to the original authentication flow.

```json
    {
        "error": "mfa_required",
        "error_description": "Verify with an additional authenticator to complete the sign-in process.",
        "mfa_token": "F5snZpk1UBRKHYR6N7Mh"
    }
```

### Challenge request

Your app sends a request to the Okta authorization server `/challenge` endpoint. Use this endpoint to step up authentication in an already partially authenticated flow. Always call this endpoint after the authorization server returns `mfa_required` in response to the `/token` request. Don't use this endpoint for primary factors, only to prompt for secondary factors when the authorization server has already created an `mfa_token` in response to the `/token` request.

Use of this endpoint is optional and the client can directly call `/token` if it has another means of knowing which factor to authenticate with and can challenge the user for that factor.

> **Note:** Okta also sends a push notification to the user.

In the request, your app includes the `mfa_token` and the OOB `grant_type` in the request.

```bash
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/token \
  --header 'accept: application/json' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id=${client_id}&scope=openid profile&grant_type=urn:okta:params:oauth:grant-type:oob&oob_code=&{oob code}'
```

Note the parameters that are passed:

- `client_id` matches the client ID of the native application that you created in the [Set up your app](#set-up-your-app) section. You can find it at the top of your app's **General** tab.
- `scope` must be at least `openid`. See the **Create Scopes** section of the [Create an authorization server guide](/docs/guides/customize-authz-server/main/#create-scopes).
- `grant_type` is `urn:okta:params:oauth:grant-type:oob`, indicating that you are using the direct authentication OOB grant type. Use this grant type for OOB factors that you want to use as a primary factor.
- `oob_code` is an identifier of a single out-of-band factor transaction. To respond to or check on the status of an out-of-band factor, this code is used to identify the factor transaction.

**Response**

Okta responds to the poll request with an HTTP 400 `authorization_pending` error.

```json
  {
    "error": "authorization_pending",
    "error_description": "No user response received on the out-of-band authenticator yet. Continue polling to wait for a response."
  }
```

### Second request for tokens

After the user responds to the push notification, the app polls the `/token` endpoint again. See the response in [First request for tokens](#first-request-for-tokens) for a response example. Okta returns the request tokens.

**Response**

```json
{
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQiO[.....]Zpx4fch2n-cdQ",
    "scope": "openid profile",
    "id_token": "eyJraWQiOiJFVkRZ[.....]GKwhgZa3TdIfCXA"
}
```

### Validate access token

When your application passes a request with an access token, the resource server needs to validate it. See [Validate access tokens](/docs/guides/validate-access-tokens/).
