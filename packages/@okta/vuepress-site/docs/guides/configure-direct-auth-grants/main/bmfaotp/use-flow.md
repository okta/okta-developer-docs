The following sections outline the requests required to implement the MFA OTP flow using direct calls to the Okta OpenID Connect & OAuth 2.0 API.

### Request for tokens

Before you can begin this flow, collect the username and password from the user in a manner of your choosing. Then, make an API call to the Okta [authorization server](/docs/concepts/auth-servers/) `/token` endpoint using the Resource Owner Password grant type. Your request should look something like this:

```bash
curl --request POST \
  --url https://{yourOktaDomain}/oauth2/v1/token \
  --header 'accept: application/json' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id={client_id}&scope=openid%20profile&grant_type=password&username={testuser%40example.com}&password={userpassword}'
```

Note the parameters that are passed:

- `client_id`: Matches the client ID of the application that you created in the [Set up your app](#set-up-your-app) section. You can find it at the top of your app's **General** tab.
- `scope`: Must be at least `openid`. If you're using a custom authorization server, see the **Create Scopes** section of the [Create an authorization server guide](/docs/guides/customize-authz-server/main/#create-scopes).
- `grant_type`: `password`, which indicates that you're using the Resource Owner Password grant type.
- `username`: The email username of a registered Okta user.
- `password`: The password of the matching user.

Not used in this example:

`grant_types_supported`: (Optional) A list of grant types that the client supports. Some clients aren't able to support all grant types. Use this parameter to specify to Okta that the included grant types are all that the client supports. This allows Okta to return an error if the provided grant types don't satisfy the access policy.

For more information on these parameters, see the `/token` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/token).

**Response**

Since this is a two-factor flow, Okta sends an HTTP 403 error and includes the `mfa_token` in the response. The `mfa_token` is a unique token used for identifying multifactor authentication flows to link the request to the original authentication flow.

```json
    {
        "error": "mfa_required",
        "error_description": "Verify with an additional authenticator to complete the sign-in process.",
        "mfa_token": "F5snZpk1UBRKHYR6N7Mh"
    }
```

### Second token request

Your app prompts the user for an OTP in the app UI. The user obtains the OTP and enters it into the app interface. Your app then makes a `/token` request to the authorization server:

```bash
curl --request POST \
  --url https://{yourOktaDomain}/oauth2/v1/token \
  --header 'accept: application/json' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id={client_id}&scope=openid profile&grant_type=http://auth0.com/oauth/grant-type/mfa-otp&otp={otp_value}&mfa_token={mfa_token_value}'
```

Note the parameters that are passed:

- `client_id`: Matches the client ID of the application that you created in the [Set up your app](#set-up-your-app) section. You can find it at the top of your app's **General** tab.
- `scope`: Must be at least `openid`. See the **Create Scopes** section of the [Create an authorization server guide](/docs/guides/customize-authz-server/main/#create-scopes).
- `grant_type`: `http://auth0.com/oauth/grant-type/mfa-otp`, which indicates that you're using the direct authentication MFA OTP grant type. Use this grant type for OTP factors (such as Google Authenticator) that you want to use as a secondary factor.
- `otp`: The one-time passcode that your app obtained from the user.
- `mfa_token`: A unique token used to identify multifactor authentication flows that link the request to the original authentication flow.

For more information on these parameters, see the `/token` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/token).

**Response**

Okta responds with the requested tokens.

```json
  {
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQiOiJEaW5ORllJVDRle[.....]WzUu9KNQ",
    "scope": "openid profile",
    "id_token": "eyJraWQiOiJFVkRZM0JsS[.....]lSXMvLzbcgumA"
}
```
