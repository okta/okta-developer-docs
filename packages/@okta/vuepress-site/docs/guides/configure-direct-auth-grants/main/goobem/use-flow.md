The following sections outline the requests required to implement the out-of-band (OOB) flow (with Email) using direct calls to the Okta OpenID Connect & OAuth 2.0 API.

### Request for out-of-band authentication

Before you can begin this flow, collect the username from the user in a manner of your choosing. Then, make an API call to the Okta [authorization server](/docs/concepts/auth-servers/) `/primary-authenticate` endpoint. Use this endpoint to initiate an authentication flow with an out-of-band factor (Email) as the primary factor.

> **Note:** The `/primary-authenticate` endpoint doesn't support multifactor authentication, and doesn't accept a `scope` parameter.

Your request should look something like this:

```bash
curl --request POST \
  --url https://{yourOktaDomain}/oauth2/v1/primary-authenticate \
  --header 'accept: application/json' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id={client_id}&login_hint={testuser%40example.com}&channel_hint=email&challenge_hint=urn:okta:params:oauth:grant-type:oob'
```

Note the parameters that are passed:

- `client_id`: Matches the client ID of the app that you created in the [Set up your app](#set-up-your-app) section. You can find it at the top of your app's **General** tab.
- `login_hint`: The email address of a registered Okta user
- `channel_hint`: The out-of-band channel that the client wants to use. Use `email` for the Email authenticator.
- `challenge_hint`: Specifies that an out-of-band factor is being used as the primary authentication method

For more information on these parameters, see the `/primary-authenticate` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/primary-authenticate).

### OOB response example

In an HTTP 200 response, Okta returns the following parameters:

```json
{
    "oob_code": "ftOpMH6ohWMGWoH1vgrX-lNX6tnXE6JNd9",
    "expires_in": 300,
    "channel": "email",
    "binding_method": "prompt"
}
```

Parameters included:

- `oob_code`: An identifier of a single out-of-band factor transaction. This code is valid for 5 minutes (`expires_in`) and can be used only once.
- `expires_in`: The time, in seconds, until the `oob_code` expires. Some orgs configure a different expiry; treat this value as authoritative rather than assuming 300 seconds.
- `channel`: The type of out-of-band channel used. Returns `email` for this flow.
- `binding_method`: The method used to bind the out-of-band channel with the primary channel. Email uses `prompt` — there's no polling option for Email OTP in this release.

### Request for tokens

After the user reads the verification code from the email and enters it in your app, make a request to the `/token` endpoint.

```bash
curl --request POST \
  --url https://{yourOktaDomain}/oauth2/v1/token \
  --header 'accept: application/json' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id={client_id}&scope=openid%20profile&grant_type=urn:okta:params:oauth:grant-type:oob&oob_code={oob_code}&binding_code={binding_code}'
```

Note the parameters that are passed:

- `client_id`: Matches the client ID of the app that you created in the [Set up your app](#set-up-your-app) section. You can find it at the top of your app's **General** tab.
- `scope`: Must be at least `openid`. See the **Create Scopes** section of the [Create an authorization server guide](/docs/guides/customize-authz-server/main/#create-scopes).
- `grant_type`: `urn:okta:params:oauth:grant-type:oob`, which indicates that you're using the direct authentication OOB grant type.
- `oob_code`: The transaction identifier returned by `/primary-authenticate`.
- `binding_code`: The verification code that the user reads from the email and enters in your app. Send the code exactly as entered — don't trim whitespace, retype, or reformat it.

### Okta token response

Okta responds with the requested tokens.

```json
{
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQiO[.....]Zpx4fch2n-cdQ",
    "scope": "openid profile",
    "id_token": "eyJraWQiOiJFVkRZ[.....]GKwhgZa3TdIfCXA"
}
```

### Handle errors

An incorrect verification code returns:

```json
HTTP/1.1 400 Bad Request
{
    "error": "invalid_grant",
    "error_description": "The 'otp' provided is either empty or incorrect. Use the correct OTP and try again."
}
```

An expired or already-used `oob_code` returns:

```json
HTTP/1.1 403 Forbidden
{
    "error": "access_denied",
    "error_description": "'{oob_code}' has expired. Use a new 'oob_code' and try again."
}
```

> **Note:** To protect user privacy, Okta doesn't distinguish between an unknown email address and a known one — the initiation and token responses have the same shape either way. Don't build app logic around a "user not found" error for this flow; it doesn't exist by design.

This flow is also subject to rate limiting. If a client sends too many requests, Okta returns an HTTP 429 response:

```json
HTTP/1.1 429 Too Many Requests
{
    "error": "invalid_grant",
    "error_description": "API call exceeded rate limit due to too many requests."
}
```

See [Rate limits at Okta](/docs/reference/rate-limits/) for more information.
