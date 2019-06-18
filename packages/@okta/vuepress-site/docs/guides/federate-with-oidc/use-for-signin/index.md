---
title: Use the Generic OIDC IdP for Sign-In
---

There are two primary ways to kick off the sign-in with the Generic OIDC IdP flow.

**HTML Link**

One option is to create a link that the user clicks to sign in. The HREF for that link is the authorize URL that you created in the last section:

`https://yourOktaorg.com/oauth2/v1/authorize?idp=0oaj2wNe3khgDxMmE0h7&client_id=0oaj2x7yewUvMY1x73h0&response_type=code&response_mode=fragment&scope=openid+email+profile&redirect_uri=https://yourOktaorg.com&state=ADFTG3&nonce=158858`

After the user clicks the link, they are prompted to sign in with the generic OIDC IdP. After authentication and authorization, they are returned to the specified `redirect_uri` along with an ID token in JWT format.

**AuthJS**

If you don't want pre-built views, or need deeper levels of customization, then you can use the same AuthJS SDK that the Sign-in Widget is built with. For more information, see the [the AuthJS GitHub repo](https://github.com/okta/okta-auth-js#install). Implementing sign-in with a generic OIDC IdP would use the SDK's [OpenID Connect authentication flow](https://github.com/okta/okta-auth-js#openid-connect-options). 

<NextSectionLink/>
