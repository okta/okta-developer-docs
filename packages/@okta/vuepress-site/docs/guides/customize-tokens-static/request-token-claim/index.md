---
title: Request a token that contains a custom claim
---

There are sections in this guide that include information on building a URL to request a claim. These sections refer you to this page for the specific steps to build the URL to request a claim and decode the JWT to verify that the claim was included in the token. Specific request and payload examples remain in the appropriate sections. Move on to the next section if you don't currently need these steps.

To test the full authentication flow that returns an ID token or an access token, build your request URL:

1. Obtain the following values from your OpenID Connect application, both of which can be found on the application's **General** tab:

    * Client ID
    * Redirect URI

2. Use the authorization server's authorization endpoint:

    > **Note:** See [Authorization Servers](/docs/guides/customize-authz-server/overview/) for more information on the types of authorization servers available to you and what you can use them for.

    * An Okta Org Authorization Server authorization endpoint looks like this:

        `https://${yourOktaDomain}/oauth2/v1/authorize`

    * A Custom Authorization Server authorization endpoint looks like this:

        `https://${yourOktaDomain}/oauth2/${authServerId}/v1/authorize`

    > **Note:** If you add the claim to the default Custom Authorization Server, the `${authServerId}` is `default`.

    You can retrieve a Custom Authorization Server's authorization endpoint using the server's metadata URI:

    **ID token**
    `https://${yourOktaDomain}/oauth2/${authServerId}/.well-known/openid-configuration`

    **Access token**
    `https://${yourOktaDomain}/oauth2/${authServerId}/.well-known/oauth-authorization-server`

3. Add the following query parameters to the URL:

    * Your OpenID Connect application's `client_id`.
    * The response type, which for an ID token is `id_token` and an access token is `token`
    > **Note:** The examples in this guide use the [Implicit flow](/docs/concepts/oauth-openid/#implicit-flow). For the [Authorization Code flow](/docs/concepts/oauth-openid/#authorization-code-flow), the response type is `code`. You can exchange an authorization code for an ID token and/or an access token using the `/token` endpoint.
    * A scope, which for the purposes of the examples is `openid`. When you are adding a Groups claims, both the `openid` and the `groups` scopes are included.
    * Your OpenID Connect application's `redirect_uri`.
    * Values for `state` and `nonce`, which can be anything

    > **Note:** All of the values are fully documented on the [Obtain an Authorization Grant from a user](/docs/reference/api/oidc/#authorize) page.

    The resulting URL looks something like this:

    ```bash
    curl -X GET
    "https://${yourOktaDomain}/oauth2/${authServerId}/v1/authorize?client_id=examplefa39J4jXdcCwWA
    &response_type=id_token
    &scope=openid
    &redirect_uri=https%3A%2F%2FyourRedirectUriHere.com
    &state=myState
    &nonce=myNonceValue"
    ```

    > **Note:** The `response_type` for an access token looks like this: `&response_type=token`

4. After you paste the request into your browser, the browser is redirected to the sign-in page for your Okta org. Enter the credentials for a User who is mapped to your OpenID Connect application, and then the browser is directed to the `redirect_uri` that you specified in the URL and in the OpenID Connect app. The response contains an ID token or an access token, as well as any state that you defined are included in the response. The following are response examples:

    **ID token**

    ```bash
    https://yourRedirectUriHere.com#id_token=eyJraWQiOiIxLVN5[...]C18aAqT0ixLKnJUR6EfJI-IAjtJDYpsHqML7mppBNhG1W55Qo3IRPAg&state=myState
    ```

    **Access token**

    ```bash
    https://yourRedirectUriHere.com#access_token=eyJraWQiOiIxLVN5M2w2dFl2VTR4MXBSLXR5cVZQWERX[...]YNXrsr1gTzD6C60h0UfLiLUhA&token_type=Bearer&expires_in=3600&scope=openid&state=myState
    ```

5. To check the returned ID token or access token payload, you can copy the value and paste it into any JWT decoder (for example: <https://jsonwebtoken.io>). Using a JWT decoder, confirm that the token contains all of the claims that you are expecting, including the custom one. If you specified a nonce, that is also included.

<NextSectionLink/>
