The following sections outline the requests required to implement the MFA OOB flow using direct calls to the Okta OIDC & OAuth 2.0 API.

### Initial request for tokens

Before you can begin this flow, collect the username and password from the user in a manner of your choosing. Then, make an API call to the Okta [authorization server](/docs/concepts/auth-servers/) `/token` endpoint using the Resource Owner Password grant type. If you're using the [default custom authorization server](/docs/concepts/auth-servers/#default-custom-authorization-server), then your request would look something like this:

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

Not used in this example:

`grant_types_supported` (Optional) is a list of grant types that the client supports. Some clients aren't able to support all grant types. Use this parameter to specify to Okta that the included grant types are all that the client supports so that Okta can return an error if the the provided grant types won't satisfy the access policy.

For more information on these parameters, see the `/token` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/tokenCustomAS).

**Response**

Since this is a two factor flow, Okta sends an HTTP 403 error and includes the `mfa_token` in the response. The `mfa_token` is a unique token used for identifying multifactor authentication flows to link the request to the original authentication flow.

```json
    {
        "error": "mfa_required",
        "error_description": "Verify with an additional authenticator to complete the sign-in process.",
        "mfa_token": "fCRU9lDO0rMHQ_FIADFL"
    }
```

### Challenge request

Next, your app sends a request to the authorization server `/challenge` endpoint. Use this endpoint to step up authentication in an already partially authenticated flow:

- Always call this endpoint after the authorization server returns `mfa_required` in response to the `/token` request.
- Don't use this endpoint with primary factor authentication flows.
- This endpoint is optional. The client can directly call the `/token` endpoint if it has another way of knowing which factor to authenticate with and can challenge the user for that factor.

```bash
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/challenge \
  --header 'accept: application/json' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id=${client_id}&mfa_token=fCRU9lDO0rMHQ_FIADFL&challenge_types_supported=http://auth0.com/oauth/grant-type/mfa-oob'
```

Note the parameters that are passed:

- `client_id` matches the client ID of the native application that you created in the [Set up your app](#set-up-your-app) section. You can find it at the top of your app's **General** tab.
- `mfa_token` is a unique token used for identifying multifactor authentication flows to link the request to the original authentication flow.
- `challenge_types_supported` is `http://auth0.com/oauth/grant-type/mfa-oob` which communicates to the authorization server which factors the client app supports. If the access policy requires factors not included, an error is returned. Supported values: `http://auth0.com/oauth/grant-type/mfa-otp` and `http://auth0.com/oauth/grant-type/mfa-oob`.

> **Note:** This field may seem redundant since the `/token` request should validate `grant_types_supported`. However, this field is included because some clients can't send  `grant_types_supported` in the request or the server can't validate `grant_types_supported` on the `/token` endpoint.

For more information on these parameters, see the `/challenge` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/challenge-cust-as).

**Response**

In an HTTP 200 response, Okta returns the following parameters:

> **Note:** Okta also sends a push notification to the user.

```json
  {
    "challenge_type": "http://auth0.com/oauth/grant-type/mfa-oob",
    "oob_code": "ftyP7pAi17dEc-zQFsBFjXVKw4HzH0yIMn",
    "expires_in": 300,
    "interval": 5,
    "channel": "push",
    "binding_method": "none"
  }
```

Note the parameters included:

- `challenge_type` is the challenge type used for authentication. This must be one of the `challenge_types_supported` from the request body and must be `http://auth0.com/oauth/grant-type/mfa-oob`.
- `oob_code` is an identifier of an out-of-band factor transaction. To respond to or check on the status of an out-of-band factor, this code is used to identify the factor transaction.
- `expires_in` is the time, in seconds, until the `oob_code` expires.
- `interval` is the frequency, in seconds, at which the client should poll to check if the out-of-band factor is complete. This is only relevant to polling factors such as Okta Verify Push.
- `channel` is the type of out-of-band channel used. Okta currently only supports Okta Verify Push.<!-- need to update this when phase 2 is complete -->
- `binding_method` is the method used to bind the out-of-band-channel with the primary channel. Since Okta Verify Push doesn't require any binding, the only supported value for EA is `none`.<!-- need to update this when phase 2 is complete -->

### Poll the Okta authorization server

Your app polls the authorization server `/token` endpoint at the set `interval`.

```bash
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/token \
  --header 'accept: application/json' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id=${client_id}&scope=openid profile&grant_type=http://auth0.com/oauth/grant-type/mfa-oob&oob_code=ftqmhFRXHxOVo-4t4JoQhtbsqww3XTMCp2&mfa_token=fCRU9lDO0rMHQ_FIADFL'
```

Note the parameters that are passed:

- `client_id` matches the client ID of the native application that you created in the [Set up your app](#set-up-your-app) section. You can find it at the top of your app's **General** tab.
- `scope` must be at least `openid`. See the **Create Scopes** section of the [Create an authorization server guide](/docs/guides/customize-authz-server/main/#create-scopes).
- `grant_type` is `http://auth0.com/oauth/grant-type/mfa-oob`, indicating that you are using the direct authentication MFA OOB grant type. Use this grant type for MFA OOB factors that you want to use as a secondary factor.
- `oob_code` is an identifier of an out-of-band factor transaction. To respond to or check on the status of an out-of-band factor, this code is used to identify the factor transaction.
- `mfa_token` is a unique token used for identifying multifactor authentication flows to link the request to the original authentication flow.

For more information on these parameters, see the `/token` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/tokenCustomAS).

**Response**

Okta responds to the poll request with an HTTP 400 `authorization_pending` error.

```json
  {
    "error": "authorization_pending",
    "error_description": "No user response received on the out-of-band authenticator yet. Continue polling to wait for a response."
  }
```

### Request for tokens

After the user responds to the push notification, the app polls the `/token` endpoint again. See the response in [Initial request for tokens](#initial-request-for-tokens) for a response example.

**Response**

Okta responds with the required tokens.

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
