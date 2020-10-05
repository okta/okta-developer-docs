---
title: Build the request
---
After you define the scopes that you want to require consent for, prepare an authentication or authorization request with the correct values for `prompt` and `consent_method`.

1. Obtain the following values from your OpenID Connect application, both of which can be found on the application's **General** tab:

    * Client ID
    * Redirect URI

2. Use the default Custom Authorization Server's authorization endpoint:

    > **Note:** See [Authorization Servers](/docs/guides/customize-authz-server/overview/) for more information on the types of authorization servers available to you and what you can use them for.

    A default Custom Authorization endpoint looks like this where the `${authServerId}` is `default`:

        `https://${yourOktaDomain}/oauth2/default/v1/authorize`

3. Add the following query parameters to the URL:

    * Your OpenID Connect application's `client_id` and `redirect_uri`
    * The `openid` and `phone` scopes
    * The response type, which for an ID token is `id_token` and an access token is `token`

    > **Note:** The examples in this guide use the [Implicit flow](/docs/concepts/oauth-openid/#implicit-flow). For the [Authorization Code flow](/docs/concepts/oauth-openid/#authorization-code-flow), the response type is `code`. You can exchange an authorization code for an ID token and/or an access token using the `/token` endpoint.

    * Values for `state` and `nonce`, which can be anything

    > **Note:** All of the values are fully documented on the [Obtain an Authorization Grant from a user](/docs/reference/api/oidc/#authorize) page.

    The resulting URL requesting an access token looks something like this:

    ```bash
    curl -X GET
    "https://${yourOktaDomain}/oauth2/${authServerId}/v1/authorize?client_id=examplefa39J4jXdcCwWA
    &response_type=token
    &scope=openid%20phone
    &redirect_uri=https%3A%2F%2FyourRedirectUriHere.com
    &state=myState
    &nonce=${myNonceValue}"
    ```

    > **Note:** The `response_type` for an ID token looks like this: `&response_type=id_token`.

4. Paste the request URL into a browser. The User Consent dialog box appears. Click **Allow** to create the grant.

    > **Note:** The user only has to grant consent once for an attribute per authorization server.

<NextSectionLink/>
