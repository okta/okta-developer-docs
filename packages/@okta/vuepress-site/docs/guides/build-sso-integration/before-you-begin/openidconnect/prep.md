### Prepare an OIDC integration

Okta uses a multi-tenant local credential system for OIDC. Each instance of your app integration inside a customer org has a separate set of OIDC client credentials that are used to access your application.

For example, consider a scenario where your app integration is added to 10 separate customer orgs. Seven of those customers create a single instance of your app integration. However, the other three customers each create two separate instances of your app integration so they can use different configuration options. This creates a total of 13 (7 + (3*2)) sets of client credentials for your application that you need to track.

This multi-tenant approach is different from other IdPs that use a global credential system, where a given application has the same customer credentials across all orgs.

Before you create a new OIDC integration in Okta:

<!-- [ian 2020.02.25] this step doesn't matter unless the user can choose something besides the web as a platform
1. Decide which platform you'll be using for the integration:
   * A web application is accessed through the browser and can remain running on a server that can store a secret safely.
   * A native application resides on the end user's device.
   * A single-page app (SPA) is a web application that is contained on a single web page. All code is retrieved when the page is loaded initially - the page doesn't reload or refresh. A SPA application cannot keep running on a server.
-->

1. Have your application developed and tested, with a front-end (for example, JavaScript and HTML) and back-end (for example, middleware and database software) stack, along with services available through APIs, and accepting HTTP connections.
1. Based on the [type of application that you have built](/docs/concepts/auth-overview/#what-kind-of-client-are-you-building), determine the correct [OAuth 2.0 flow](/docs/concepts/auth-overview/#recommended-flow-by-application-type) that is required below the OIDC identity layer. For OIN app integrations, the OAuth 2.0 flow must be either Web (server side) or a Single-Page Application (SPA).
1. Determine the login redirect URIs on your system. A redirect URI is where Okta sends the authentication response and ID token during the sign-in flow. You can specify more than one URI if required.
1. Your application must support automatic credential rotation. For more information, see the `/keys` section in the [OpenID Connect & OAuth 2.0 API reference](/docs/reference/api/oidc/#key-rotation).

<!-- [ian 2020.02.25] the following steps are unnecessary if we only support web applications in the OIN
1. If your integration is a web or native application, decide whether or not to use refresh tokens.
1. If your application is a SPA, decide what kind of visibility and login flow you want. You can configure your integration in two ways:
   1. The sign-in request is initiated only in the background, and doesn't use an Okta tile.
   1. The sign-in request can be initiated either by the application or by Okta. In this case, there are two flow options:
      * Redirecting to the application to start the sign-in request. This flow conforms to [Section 4](http://openid.net/specs/openid-connect-core-1_0.html#ThirdPartyInitiatedLogin) of the OpenID Connect specification. When the end users click an Okta tile, they are redirected to the `initiate_login_uri` of the client application, which constructs an authorization request and redirects the end user back to Okta.
      * Sending an ID token directly to the application. This is a simpler flow. Okta creates an ID token and posts it directly to the first redirect URI registered for the client application. This flow is the same as with sign-in requests for SAML applications. You can configure which OpenID Connect scopes are granted. The `form_post` response mode is used for this flow. There is no state parameter included in the request, since it is a one-way request and not round-trip.
-->
