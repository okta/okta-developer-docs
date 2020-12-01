---
title: Create the Authorization URL
---
The Okta Identity Provider that you created in the <GuideLink link="../configure-idp-in-okta">second step</GuideLink> generated an authorize URL with a number of blank parameters that you can fill in to test the flow with the Identity Provider. The authorize URL initiates the authorization flow that authenticates the user with the Identity Provider.

> **Note:** Use this step to test your authorization URL as an HTML link. For information on using the Sign-in Widget, Okta Hosted Sign-in Page, or AuthJS, see the <GuideLink link="../use-idp-to-sign-in">next step</GuideLink>.

In the URL, replace {yourOktaDomain} with your org's base URL, and then replace the following values:

* `client_id` &mdash; Use the `client_id` value that you obtained from the OpenID Connect client application in the <GuideLink link="../register-app-in-okta">previous section</GuideLink>. This is not the `client_id` from the Identity Provider.

* `response_type` &mdash; Determines which flow is used. For the [Implicit](/docs/guides/implement-implicit/overview/) flow, this should be `id_token`. For the [Authorization Code](/docs/guides/implement-auth-code/overview/) flow, this should be `code`.

* `response_mode` &mdash; Determines how the authorization response should be returned. This should be `fragment`.

* `scope` &mdash; Determines the claims that are returned in the ID token. Include the scopes that you want to request authorization for and separate each by a space. You need to include at least the `openid` scope. You can request any of the standard OpenID Connect scopes about users, such as `profile` and `email` as well as any custom scopes specific to your Identity Provider.

* `redirect_uri` &mdash; The location where Okta returns a browser after the user finishes authenticating with their Identity Provider. This URL must start with HTTPS and must match one of the redirect URIs that you configured in the <GuideLink link="../register-app-in-okta">previous section</GuideLink>.

* `state` &mdash; Protects against cross-site request forgery (CSRF). Can be any value.

* `nonce` &mdash; A string included in the returned ID token. Use it to associate a client session with an ID token and to mitigate replay attacks. Can be any value.

For a full explanation of all of these parameters, see: [/authorize Request parameters](/docs/reference/api/oidc/#request-parameters).

An example of a complete URL looks like this:

```
https://${yourOktaDomain}/oauth2/v1/authorize?idp=0oaaq9pjc2ujmFZexample&client_id=GkGw4K49N4UEE1example&response_type=id_token&response_mode=fragment&scope=openid%20email&redirect_uri=https%3A%2F%2FyourAppUrlHere.com%2F&state=WM6D&nonce=YsG76jo
```

<NextSectionLink/>
