### Prepare an OIDC integration

Before you create a new OIDC integration in Okta:

<!-- [ian 2020.02.25] this step doesn't matter unless the user can choose something besides the web app platform
1. Decide which platform you'll be using for the app:
   * A web app is accessed through the browser and can remain running on a server that can store a secret safely.
   * A native app resides on the end user's device.
   * A single page app (SPA) is a web app that is contained on a single web page. All code is retrieved when the page is loaded initially - the page does not reload or refresh. A SPA app cannot keep running on a server.
-->

1. Determine the login and (optional) logout redirect URIs on your system. A redirect URI is where Okta sends the authentication response and ID token. You can specify more than one URI if required.
1. Your app must support automatic credential rotation. For more information, see the `/keys` section in the [OpenID Connect & OAuth 2.0 API reference](/docs/reference/api/oidc/#key-rotation).
1. Your app must support refresh tokens.

<!-- [ian 2020.02.25] the following steps are unnecessary if we only support web apps
1. If your integration is a web or native app, decide whether or not to use refresh tokens.
1. If your app is a SPA app, decide what kind of app visibility and login flow you want. You can configure your app in two ways:
   1. The sign-in request is initiated only in the background, and doesn't use an Okta app button.
   1. The sign-in request can be initiated either by the app or by Okta. In this case, there are two flow options:
      * Redirecting to the app to start the sign-in request. This flow conforms to [Section 4](http://openid.net/specs/openid-connect-core-1_0.html#ThirdPartyInitiatedLogin) of the OpenID Connect specification. When the end users click an Okta app, they are redirected to the `initiate_login_uri` of the client application, which constructs an authorization request and redirects the end user back to Okta.
      * Sending an ID token directly to the app. This is a simpler flow. Okta creates an ID token and posts it directly to the first redirect URI registered for the client application. This flow is the same as with sign-in requests for SAML apps. You can configure which OpenID Connect scopes are granted. The `form_post` response mode is used for this flow. There is no state parameter included in the request, since it is a one-way request and not round-trip.
-->
