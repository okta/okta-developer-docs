---
title: Complete and Test Your Authorize URL
---

The IdP that you configured in the [Configure the IdP in Okta](#configure-the-IdP-in-Okta) section generated an authorize URL with a number of blank parameters that you need to fill in. The authorize URL initiates the authorization flow that authenticates the user with the IdP. Each IdP created in Okta has an authorize URL that can be obtained from the **Identity Providers** page. 
 
- `client_id`: Use the `client_id` value that you copied in the [Create an App in Okta](#create-an-app-in-okta) section. This is not the `client_id` from the IdP.
- `scope`: Determines the claims that are returned in the ID token. Include the scopes that you want to request authorization for and separate each by a space. You need to include at least the `openid` scope. You can request any of the standard OIDC scopes about users, such as `profile` and `email` as well as any custom scopes specific to your IdP.
> Note: In this example, the `email` and `profile` scopes are required to create and link the user to Okta's Universal Directory by default.
- `response_type`: Determines which flow is used. This should be `code`, because in this example Authorization Code is the flow that is defined. For more information, see [Authorization Code Flow](https://developer.okta.com/docs/concepts/auth-overview/#authorization-code-flow).
- `response_mode`: Determines how the authorization response should be returned. In this example, we are using `fragment`.
- `state`: Protects against cross-site request forgery (CSRF).
- `nonce`: A string included in the return ID Token. Use it to associate a client session with an ID Token and to mitigate replay attacks.
- `redirect_uri`: The location where Okta returns a browser after the user finishes authenticating against the IdP. This URL must start with `https` and must match a redirect URI configured in the app that consumes the response from the IdP after authentication and authorization. In this example, the app that you created in the [Create an App in Okta](#create-an-app-in-okta) section.

For a full explanation of all of these parameters, see: [`/authorize` Request Parameters Table](/docs/reference/api/oidc/#authorize).

The following is an example of a complete URL:
`https://yourOktaorg.com/oauth2/v1/authorize?idp=0oaj2wNe3khgDxMmE0h7&client_id=0oaj2x7yewUvMY1x73h0&response_type=code&response_mode=fragment&scope=openid+email+profile&redirect_uri=https://yourOktaorg.com&state=ADFTG3&nonce=158858`

To test your authorization, enter the complete authorization URL in a browser. Use the browser's privacy or incognito mode to avoid false positive or negative results.

If everything is configured properly:

1. The user is redirected to the Generic OIDC IdP's sign-in page.
2. After successful authentication, the user is redirected to the redirect URI that you specified, along with an `id_token` fragment in the URL. The value of this parameter is your Okta OIDC ID token.

If something is configured incorrectly, the authorization response contains error information to help you resolve the issue.

<NextSectionLink/>
