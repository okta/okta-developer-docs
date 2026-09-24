The following sections outline the requests required to implement the MFA OOB flow (with Email) using direct calls to the Okta OpenID Connect & OAuth 2.0 API.

### Request for tokens

Before you can begin this flow, collect the username and password from the user in a manner of your choosing. Then, make an API call to the Okta [authorization server](/docs/concepts/auth-servers/) `/token` endpoint using the Resource Owner Password grant type. Your request should look something like this:

```bash
curl --request POST \
  --url https://{yourOktaDomain}/oauth2/v1/token \
  --header 'accept: application/json' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id={client_id}&scope=openid%20profile&grant_type=password&username={testuser%40example.com}&password={userpassword}&grant_types_supported=http://auth0.com/oauth/grant-type/mfa-oob'
```

Note the parameters that are passed:

- `client_id`: Matches the client ID of the application that you created in the [Set up your app](#set-up-your-app) section. You can find it at the top of your app's **General** tab.
- `scope`: Must be at least `openid`. If you're using a custom authorization server, see the **Create Scopes** section of the [Create an authorization server guide](/docs/guides/customize-authz-server/main/#create-scopes).
- `grant_type`: `password`, indicating that you're using the Resource Owner Password grant type
- `username`: The email username of a registered Okta user
- `password`: The password of the matching user
- `grant_types_supported`: (Optional) Lets Okta fail fast if the client's supported grant types can't satisfy the authentication policy.

For more information on these parameters, see the `/token` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/token).

### Okta token response

Since this is a two-factor flow, Okta sends an HTTP 403 error and includes the `mfa_token` in the response. The `mfa_token` value links this request to the original authentication flow.

```json
{
    "error": "mfa_required",
    "error_description": "Verify with an additional authenticator to complete the sign-in process.",
    "mfa_token": "0D644..."
}
```

### Challenge request

Next, your app sends a request to the authorization server `/challenge` endpoint to initiate the Email step-up challenge:

- Always call this endpoint after the authorization server returns `mfa_required` in response to the `/token` request.
- Don't use this endpoint with primary factor authentication flows.

```bash
curl --request POST \
  --url https://{yourOktaDomain}/oauth2/v1/challenge \
  --header 'accept: application/json' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id={client_id}&mfa_token={mfa_token}&challenge_types_supported=http://auth0.com/oauth/grant-type/mfa-oob&channel_hint=email'
```

Note the parameters that are passed:

- `client_id`: Matches the client ID of the application that you created in the [Set up your app](#set-up-your-app) section. You can find it at the top of your app's **General** tab.
- `mfa_token`: The unique token returned with `mfa_required`, linking this request to the original authentication flow.
- `channel_hint`: The out-of-band channel that the client wants to use. Use `email` for the Email authenticator.
- `challenge_types_supported`: `http://auth0.com/oauth/grant-type/mfa-oob`, which communicates to the authorization server the factors that the client app supports.

For more information on these parameters, see the `/challenge` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/challenge).

### Challenge response

In an HTTP 200 response, Okta returns the following parameters:

```json
{
    "challenge_type": "http://auth0.com/oauth/grant-type/mfa-oob",
    "oob_code": "ftOpMH6ohWMGWoH1vgrX-lNX6tnXE6JNd9",
    "expires_in": 300,
    "channel": "email",
    "binding_method": "prompt"
}
```

Note the parameters included:

- `challenge_type`: Echoes the MFA grant being challenged. Must be one of the `challenge_types_supported` values from the request.
- `oob_code`: An identifier of this out-of-band factor transaction. Valid for 5 minutes (`expires_in`) and single-use.
- `expires_in`: The time, in seconds, until the `oob_code` expires.
- `channel`: The type of out-of-band channel used. Returns `email` for this flow.
- `binding_method`: The method used to bind the out-of-band channel with the primary channel. Email uses `prompt` — there's no polling option in this release.

### Second request for tokens

After the user reads the verification code from the email and enters it in your app, make a `/token` request again.

```bash
curl --request POST \
  --url https://{yourOktaDomain}/oauth2/v1/token \
  --header 'accept: application/json' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id={client_id}&scope=openid%20profile&grant_type=http://auth0.com/oauth/grant-type/mfa-oob&mfa_token={mfa_token}&oob_code={oob_code}&binding_code={binding_code}'
```

Note the parameters that are passed:

- `client_id`: Matches the client ID of the application that you created in the [Set up your app](#set-up-your-app) section. You can find it at the top of your app's **General** tab.
- `scope`: Must be at least `openid`.
- `grant_type`: `http://auth0.com/oauth/grant-type/mfa-oob`, which indicates that you're using the MFA OOB grant type.
- `mfa_token`: The same token returned with `mfa_required` and used on the `/challenge` request.
- `oob_code`: The transaction identifier returned by `/challenge`.
- `binding_code`: The verification code that the user reads from the email and enters in your app. Send the code exactly as entered — don't trim whitespace, retype, or reformat it.

### Okta second token response

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

An expired or already-used `oob_code`, or an expired `mfa_token`, returns:

```json
HTTP/1.1 403 Forbidden
{
    "error": "access_denied",
    "error_description": "'{oob_code}' has expired. Use a new 'oob_code' and try again."
}
```

If the `oob_code` and `mfa_token` are from different flows, Okta returns:

```json
HTTP/1.1 400 Bad Request
{
    "error": "invalid_request",
    "error_description": "The 'oob_code' and the 'mfa_token' provided are not associated with each other. Review the values and try again."
}
```

This flow is also subject to rate limiting. If a client sends too many requests, Okta returns an HTTP 429 response:

```json
HTTP/1.1 429 Too Many Requests
{
    "error": "invalid_grant",
    "error_description": "API call exceeded rate limit due to too many requests."
}
```

See [Rate limits at Okta](/docs/reference/rate-limits/) for more information.
