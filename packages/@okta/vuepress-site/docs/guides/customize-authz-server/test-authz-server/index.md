---
title: Test the authorization server
---

Once you have followed the instructions to set up and customize your authorization server, you can test it by sending any one of the API calls that returns OAuth 2.0 and/or OpenID Connect tokens.

> **Note:** The `{authServerId}` for the default server is `default`.

You can find a full description of Okta's relevant APIs on the [OpenID Connect & OAuth 2.0 API](/docs/reference/api/oidc/) page.

The following are a few things that you can try to ensure that your authorization server is functioning as expected.

> **Note:** This isn't meant to be an exhaustive testing reference, but only to show some examples.

### OpenID Connect configuration

To verify that your server was created and has the expected configuration values, you can send an API request to the server's OpenID Connect Metadata URI: `https://${yourOktaDomain}/oauth2/${authServerId}/.well-known/openid-configuration` using an HTTP client or by typing the URI inside of a browser. This returns information about the OpenID configuration of your authorization server.

For more information on this endpoint, see how to [retrieve authorization server OpenID Connect metadata](/docs/reference/api/oidc/#well-known-openid-configuration).

### Custom scopes and claims

You can retrieve a list of all scopes for your authorization server, including custom ones, using this endpoint:

`/api/v1/authorizationServers/${authServerId}/scopes`

For more information on this endpoint, see [Get all scopes](/docs/reference/api/authorization-servers/#get-all-scopes).

If you created any custom claims, the easiest way to confirm that they have been successfully added is to use this endpoint:

`/api/v1/authorizationServers/${authServerId}/claims`

For more information on this endpoint, see [Get all claims](/docs/reference/api/authorization-servers/#get-all-claims).

### Testing an OpenID Connect flow

To test your authorization server more thoroughly, you can try a full authentication flow that returns an ID Token. To do this, you need a client application in Okta with at least one user assigned to it.

For more information you can read about:
- [The OpenID Connect Application Wizard](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard-oidc)
- [How to assign a user to an application](https://help.okta.com/en/prod/okta_help_CSH.htm#ext-assign-apps)

You need the following values from your Okta OpenID Connect application, both of which can be found on your application's **General** tab:

- Client ID
- A valid Redirect URI

Once you have an OpenID Connect application set up, and a user assigned to it, you can try the authentication flow.

First, you need the authorization server's authorization endpoint, which you can retrieve using the server's Metadata URI: `https://${yourOktaDomain}/oauth2/${authServerId}/.well-known/openid-configuration`.

It looks like this:
`https://${yourOktaDomain}/oauth2/${authServerId}/v1/authorize`

Add the following URL query parameters to the URL:

- Your OpenID Connect application's `client_id` and `redirect_uri`
- A `scope`, which for the purposes of this test are `openid` and `profile`
- A `response_mode`, which you can set to `fragment`
- The `state` and `nonce` values

All of the values are fully documented here: [Obtain an Authorization Grant from a user](/docs/reference/api/oidc/#authorize).

The resulting URL looks like this:

`https://${yourOktaDomain}/oauth2/${authServerId}/v1/authorize?client_id=examplefa39J4jXdcCwWA&response_type=id_token&response_mode=fragment&scope=openid%20profile&redirect_uri=https%3A%2F%2FyourRedirectUriHere.com&state=WM6D&nonce=YsG76jo`

If you paste this into your browser, you are redirected to the sign-in page for your Okta org with a URL that looks like this:

`https://${yourOktaDomain}/login/login.htm?fromURI=%2Foauth2%2Fv1%2Fauthorize%2Fredirect%3Fokta_key%aKeyValueWillBeHere`

Enter the credentials for a user who is mapped to your Open ID Connect application, and you are directed to the `redirect_uri` that you specified. An ID Token and any state that you defined are also included:

`https://yourRedirectUriHere.com/#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImluZUdjZVQ4SzB1SnZyWGVUX082WnZLQlB2RFowO[...]z7UvPoMEIjuBTH-zNkTS5T8mGbY8y7532VeWKA&state=WM6D`

To check the returned ID Token, you can copy the value and paste it into any JWT decoder (for example: <https://jsonwebtoken.io>). Using a JWT decoder you can check the payload to confirm that it contains all of the claims that you are expecting, including custom ones. The `nonce`is also included:

```json
{
 "sub": "00uawpa4r4Zybz9On0h7",
 "name": "John Smith",
 "locale": "en-US",
 "ver": 1,
 "iss": "https://${yourOktaDomain}/oauth2/${authServerId}",
 "aud": "fa39J40exampleXdcCwWA",
 "iat": 1498328175,
 "exp": 1498331912,
 "jti": "ID.fL39TTtvfBQoyHVkrbaqy9hWooqGOOgWau1W_y-KNyY",
 "amr": [
  "pwd"
 ],
 "idp": "examplefz3q4Yd3Zk70h7",
 "nonce": "YsG76jo",
 "preferred_username": "john@example.com",
 "given_name": "John",
 "family_name": "Smith",
 "zoneinfo": "America/Los_Angeles",
 "updated_at": 1498155598,
 "auth_time": 1498328174,
 "preferred_honorific": "Commodore"
}
```

In this example, we see the `nonce` with value `YsG76jo` and the custom claim `preferred_honorific` with value `Commodore`.

At this point you have set up your authorization server and confirmed that it is working.
