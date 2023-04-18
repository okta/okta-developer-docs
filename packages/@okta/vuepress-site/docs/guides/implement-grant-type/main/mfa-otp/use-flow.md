The following sections outline the requests required to implement the MFA OTP flow using direct calls to the Okta OIDC & OAuth 2.0 API.

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

### Request for tokens

Your app prompts the user for an OTP in the app UI. The user obtains the OTP and enters it into the app UI. Your app then makes a `/token` request the Okta authorization server and includes the `otp`, `mfa_token`, and the MFA OTP `grant_type` in the request.

```bash
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/token \
  --header 'accept: application/json' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id=${client_id}&scope=openid profile&grant_type=http://auth0.com/oauth/grant-type/mfa-otp&otp=${123456}&mfa_token=${F5snZpk1UBRKHYR6N7Mh}'
```

Note the parameters that are passed:

- `client_id` matches the client ID of the native application that you created in the [Set up your app](#set-up-your-app) section. You can find it at the top of your app's **General** tab.
- `scope` must be at least `openid`. See the **Create Scopes** section of the [Create an authorization server guide](/docs/guides/customize-authz-server/main/#create-scopes).
- `grant_type` is `http://auth0.com/oauth/grant-type/mfa-otp`, indicating that you are using the direct authentication MFA OTP grant type. Use this grant type for OTP factors (such as Google Authenticator) that you want to use as a secondary factor.
- `mfa_token` is a unique token used for identifying multi-step authentication flows, linking the request to the original authentication flow.

**Response**

Okta responds with the request tokens.

```json
  {
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQiOiJEaW5ORllJVDRle[.....]WzUu9KNQ",
    "scope": "openid profile",
    "id_token": "eyJraWQiOiJFVkRZM0JsS[.....]lSXMvLzbcgumA"
}
```

### Validate access token

When your application passes a request with an access token, the resource server needs to validate it. See [Validate access tokens](/docs/guides/validate-access-tokens/).
