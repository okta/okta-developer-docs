---
title: Test the Authorization Server
---

Once you have followed the above instructions to set-up and/or customize your Authorization Server, you can test it by sending any one of the API calls that returns OAuth 2.0 and/or OpenID Connect tokens.

> NOTE: The `{authServerId}` for the default server is `default`.

A full description of Okta's relevant APIs can be found here: [OpenID Connect & OAuth 2.0 API](/docs/reference/api/oidc/).

We have included here a few things that you can try to ensure that your Authorization Server is functioning as expected.

> Note: This is not meant to be an exhaustive testing reference, but only to show some examples.

### OpenID Connect Configuration

To verify that your server was created and has the expected configuration values, you can send an API request to the Server's OpenID Connect Metadata URI: `https://{yourOktaDomain}/oauth2/${authServerId}/.well-known/openid-configuration` using an HTTP client or by typing the URI inside of a browser. This will return information about the OpenID configuration of your Authorization Server, though it does not currently return any custom scopes or claims that you might have created.

For more information on this endpoint, see here: [Retrieve Authorization Server OpenID Connect Metadata](/docs/reference/api/oidc/#well-known-openid-configuration).

### Custom Scopes and Claims

You can retrieve a list of all scopes for your Authorization Server, including custom ones, using this endpoint:

`/api/v1/authorizationServers/${authServerId}/scopes`

For more information on this endpoint, see here: [Get all scopes](/docs/reference/api/authorization-servers/#get-all-scopes).

If you created any custom claims, the easiest way to confirm that they have been successfully added is to use this endpoint:

`/api/v1/authorizationServers/${authServerId}/claims`

For more information on this endpoint, see here: [Get all claims](/docs/reference/api/authorization-servers/#get-all-claims).

### Testing an OpenID Connect Flow

To test your Authorization Server more thoroughly, you can try a full authentication flow which returns an ID Token. To do this, you will need a client Application in Okta with at least one User assigned to it.

For more information you can read about:
- [The OpenID Connect Application Wizard](https://help.okta.com/en/prev/Content/Topics/Apps/Apps_App_Integration_Wizard.htm)
- [How to assign a User to an Application](https://support.okta.com/help/Documentation/Knowledge_Article/27418177-Using-the-Okta-Applications-Page#Assigning)

You will need the following values from your Okta OpenID Connect application, both of which can be found on your Application's General tab:

- Client ID
- A valid Redirect URI

Once you have an OpenID Connect Application set-up, and a User assigned to it you can try the authentication flow.

First, you will need your Authorization Server's Authorization Endpoint, which you can retrieve using the Server's Metadata URI: `https://{yourOktaDomain}/oauth2/${authServerId}/.well-known/openid-configuration`. It will look like this:

`https://{yourOktaDomain}/oauth2/${authServerId}/v1/authorize`

To this you will need to add the following URL query parameters:

- Your OpenID Connect Application's `client_id` and `redirect_uri`
- A `scope`, which for the purposes of this test will be `openid` and `profile`
- A `response_mode` which you can set to `fragment`
- (Optionally) `state` and `nonce` values

All of the values are fully documented here: [Obtain an Authorization Grant from a User](/docs/reference/api/oidc/#authorize).

The resulting URL would look like this:

`https://{yourOktaDomain}/oauth2/${authServerId}/v1/authorize?client_id=examplefa39J4jXdcCwWA&response_type=id_token&response_mode=fragment&scope=openid%20profile&redirect_uri=https%3A%2F%2FyourRedirectUriHere.com&state=WM6D&nonce=YsG76jo`

If you paste this into your browser you are redirected to the sign-in page for your Okta org, with a URL that looks like this:

`https://{yourOktaDomain}/login/login.htm?fromURI=%2Foauth2%2Fv1%2Fauthorize%2Fredirect%3Fokta_key%aKeyValueWillBeHere`

Here you enter in the credentials for a user who is mapped to your Open ID Connect Application and you will be directed to the `redirect_uri` that you specified along with an ID Token, and any state that you included as well:

`https://yourRedirectUriHere.com/#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImluZUdjZVQ4SzB1SnZyWGVUX082WnZLQlB2RFowO[...]z7UvPoMEIjuBTH-zNkTS5T8mGbY8y7532VeWKA&state=WM6D`

To check the returned ID Token you can copy the value and paste it into your JWT decoder of choice (for example <https://jsonwebtoken.io>). There you can check the payload to confirm that it contains all of the claims that you are expecting, including custom ones. If you specified a `nonce` you will also find it there:

```json
{
 "sub": "00uawpa4r4Zybz9On0h7",
 "name": "John Smith",
 "locale": "en-US",
 "ver": 1,
 "iss": "https://{yourOktaDomain}/oauth2/${authServerId}",
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

In this example we see the `nonce` with value `YsG76jo` and the custom claim `preferred_honorific` with value `Commodore`.

At this point you have set-up your Authorization Server and confirmed that it is working!


<NextSectionLink/>
