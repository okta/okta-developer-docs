---
title: Create the Authorization URL
---

In this step, create the authorization URL using the two elements you copied during configuration:

* The Okta SAML IdP `id` from your ACS URL
* The OpenID Connect client application's client ID (`client_Id`)

Add these two values to an authorization URL to start the authentication flow.

For example:

`https://{yourOktaDomain}/oauth2/v1/authorize?idp=0oab8rlwfoo5Atqv60h7&client_id=0oab8om4bars6Y80Z0h7&response_type=id_token&response_mode=fragment&scope=openid&redirect_uri=http%3A%2F%2Flocalhost%3A8080&state=WM6D&nonce=YsG76j`

In this URL, replace `{yourOktaDomain}` with your org's base URL, and replace the following values:

* `idp`: the value of your SAML IdP's `id` from Step 1.
* `client_id`: the OpenID Connect client App's client ID (`client_id`) from Step 2.
* `redirect_uri`: the URL encoded redirect URI that you configured in your OpenID Connect application.
* `state` and `nonce`:  any value.

## Test the Authorization URL

To test your authorization URL, enter the complete authorization URL in a browser.
Do this in your browser's privacy or incognito mode to avoid false positive or negative results.

If everything has been configured properly:

1. The user is redirected to the IdP's sign-in page.
2. After successful authentication, the user is redirected to the redirect URI that you specified, along with an `#id_token=` fragment in the URL. The value of this parameter is your Okta OpenID Connect ID token.

If something is configured incorrectly, the authorization response contains error information to help you resolve the issue.

## For More Information

* [Understanding SP-initiated Login Flow](https://www.okta.com/integrate/documentation/saml/#understanding-sp-initiated-login-flow) explains the basics of SP-initiated login flows in Okta.
* [OAuth 2.0 Request parameters](/docs/reference/api/oidc/#request-parameters) describes the parameters specified in Step 3.
