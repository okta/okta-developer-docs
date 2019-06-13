---
title: Complete Your Authorize URL
---

The Okta Identity Provider that you created in section 2 above generated an Authorize URL with a number of blank parameters that you must now fill-in:

* **client_id:** use the client_id value you copied in step 4.8.
* **scope:** Determines the claims that are returned in the ID token. This should have at least `openid`.
* **response_type:** Determines which flow is used. This should be `code`.
* **response_mode:** Determines how the authorization response should be returned. This should be `fragment`.
* **state:** Protects against cross-site request forgery (CSRF).
* **nonce:** A string included in the returned ID Token. Use it to associate a client session with an ID Token, and to mitigate replay attacks.
* **redirect_uri:** The location where Okta returns a browser after the user has finished authenticating against their social login provider. This URL must start with "https" and must match one of the Redirect URIs that you configured previously in step 4.6.

For a full explanation of all these parameters, see: [/authorize Request parameters](/docs/reference/api/oidc/#request-parameters)

An example of a complete URL looks like this: `https://{yourOktaDomain}/oauth2/v1/authorize?idp=0oaaq9pjc2ujmFZexample&client_id=GkGw4K49N4UEE1example&response_type=id_token&response_mode=fragment&scope=openid&redirect_uri=https%3A%2F%2FyourAppUrlHere.com%2Fsocial_auth&state=WM6D&nonce=YsG76jo`

<NextSectionLink/>
