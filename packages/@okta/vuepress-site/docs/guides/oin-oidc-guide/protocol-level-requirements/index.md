---
title: Protocol-level requirements
---

### Code flow

For OIDC applications destined for the OIN, you are building a "web" application with a dedicated server-side back end that is capable of securely storing a Client Secret and exchanging information with an authorization server through trusted back-channel connections.

The exchange of the short-lived authorization code for a token requires a Client Secret. This is a value that only your client application and the authorization server know, and it must be protected from malicious parties.

The server-side app also requires an end user because it relies on interaction with the end user's web browser to redirect the user and then receive the authorization code. The end user and the user agent do not see the access token issued by Okta or any part of the authentication response.

The authorization code flow is the recommended flow for controlling access to an OIDC application in the OIN context.

The authorization code flow looks like this for an OIN app:

* Your end user (also known as the Resource Owner) opens their web browser (the User Agent) in order to access and work with your application (the Client), which in turn needs information held by various pieces of backend infrastructure (the Resource Server), usually an API or service. By clicking on a sign-in link or an icon on their Okta dashboard, the end user grants authorization to your application and initiates the authorization code flow
* Your Client prepares an authentication request to authenticate the end user (or determine if the end user is already authenticated). This request is composed of specific required parameters and is sent to the Okta `/authorize` endpoint:
  * `client_id` &mdash; this value is the Okta client ID created for you when you made your Okta app integration and is available in your Okta app integration settings
  * `nonce` &mdash; A value that is returned in the ID token to mitigate against replay attacks
  * `redirect_uri` &mdash; this is the location where the response will be sent. This value, which must start with `https://`, is set in your Okta app integrations settings
  * `response_type=code` &mdash; this informs Okta (as the authorization server) that you want to get back an access token and an ID token in exchange for the authorization code
  * `scope` &mdash; must contain `openid` to indicate that this is an OIDC request and you want to get back an ID token. Optional scopes can be added to the request to limit the user information returned
  * `state` &mdash; value to be returned in the token. The client application can use it to remember the state of its interaction with the end user at the time of the authentication call
* Your application sends a redirect response to the browser containing the composed authentication request. The browser interprets the redirect, and sends the authentication request to the `/authorize` endpoint on the Okta authorization server over secure HTTPS
* Okta then either sends the browser to an Okta sign-in page which asks the end user to provide authentication and consent to the requested scopes, or confirms that the user is already authenticated
* The end user provides proof of identity (using any of the supported authentication methods) and gives consent for any requested claims defined in your `scopes` parameter. The claims are specific pieces of information to be included in the token provided from Okta
* The browser receives an authorization code response from the Okta authorization server. If there is an error or the authentication fails for any reason, the browser returns the error to the end user. If the authentication is successful, the Okta authorization server issues an authorization code value and includes it in a redirect that sends the browser over to the Client at the Login Redirect URI callback location
* The Client (your application) then submits a request to the Okta `/token` endpoint using the authorization code value and the Client Secret. If both are valid, then Okta returns:
  * `access_token` &mdash; this token is restricted to give access only to what the end user authorized for your application
  * `token_type=Bearer` &mdash; this identifies the authentication method used
  * `expires_in` &mdash; the expiration time for the access token (in seconds)
  * `scope` &mdash; the scopes that are contained in the access token
  * `id_token` &mdash; the ID token contains the specific info (in JWT format) about the authentication and the end user that is needed by the application
  * Optional. `refresh_token` &mdash; this token is returned if the `offline_access` scope is granted. This token can be exchanged for a new access token if the previous access token has expired
* The access token is then used by your application to retrieve the protected resources and information requested at the Resource Server for the end user

The authorization code flow depends on Okta and your SaaS back-end systems being able to securely communicate the Client Secret.

Note that your application needs to verify user identity through a user store, otherwise your app could be spoofed by fake applications in the Android or Apple app stores, or an end user could view and possibly modify your code. For this reason, native, mobile, and single page application (SPA) integrations are not acceptable for OIDC app integrations in the OIN. Your application code must be set up in a flow so that your client application talks to your SaaS back-end which then communicates with Okta.

To support the potentially large numbers of Okta orgs accessing it through the OIN, an OIDC integration can't use a custom authorization server, including the `default` server. You can only use the [Org Authorization Server](https://developer.okta.com/docs/concepts/auth-servers/#available-authorization-server-types).

Another general outline of the authorization code flow can be found in our Okta developer guide: [Implement the Authorization Code Flow](/docs/guides/implement-auth-code/overview/)

Also, if you’ve used SAML for SSO in the past, it’s important to realize that the OIDC flow is different. The OIDC protocol doesn't just provide an assertion that is exchanged between Okta and your SaaS back-end, but uses a long-term token that can be used for callback into Okta at any point as long as the token is valid.

### Scopes

Your OIDC client needs to use scope values to define the access privileges that are being requested with access tokens. The scopes associated with access tokens determine what resources are available when the tokens are used to access the protected endpoints. Scopes can be used to request that specific sets of values be available as claim information about the end user.

The only scope that must be declared is `openid`. When the authentication request is sent to Okta, the `openid` scope identifies the request as being an OIDC request.

Other optional scopes available (these are returned from the `/userinfo` endpoint):

* `profile` &mdash; the end user's default profile claims: `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `preferred_username`, `profile`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`, `locale`, and `updated_at`
* `email` &mdash; requests access to the `email` and `email_verified` claims
* `address` &mdash; requests access to the `address` claim
* `phone` &mdash; requests access to the `phone_number` and `phone_number_verified` claims
* `groups` &mdash; requests access to the `groups` claim. This is a custom scope for Okta
* `offline_access` &mdash; requests generation of a refresh token that can be exchanged for an access token. That token can then be used to access the end user’s `/userinfo` endpoint even if the end user is not signed on

You can only request the [OIDC scopes](/docs/reference/api/oidc/#scopes). Custom scopes like the `groups` scope can't be configured.

Okta utilizes access policies to decide whether the scopes can be granted. If any of the requested scopes are rejected by the access policies, the request is rejected.

### Uniform Resource Identifier (URI)

There are three URIs that you need to consider when creating an OIDC app for the OIN:

1. **Login Redirect URI** &mdash; after being successfully authorized by Okta, this is the callback location where the user is directed to along with the authorization code. This URI must exactly match the Redirect URI value pre-registered in the Okta app integration settings
2. Optional. **Initiate Login URI** &mdash; this URI is used if the application is launched from the Okta dashboard (known as an IdP-initiated flow) and you want your Okta integration to handle redirecting your users to your application to start the sign-in request. When end users click your app in their Okta dashboard, they are redirected to the `initiate_login_uri` of the client application, which constructs the authentication request and redirects the end user back to the authorization server. This URI must exactly match the Initiate URI value pre-registered in the Okta app integration settings
3. Optional. **Post Logout Redirect URI** &mdash; this URI is a location to send the user after a sign off operation is performed and their session is terminated; otherwise the user is redirected back to the Okta sign-in page

### Token validation

For checking access tokens, the `/introspect` [endpoint](/docs/reference/api/oidc/#introspect) takes your token as a URL query parameter and returns a simple JSON response with the boolean `active` property.

As OIN app integrations can’t use custom auth servers, you must use remote token validation (through the Introspection API endpoint) for access tokens and local validation for ID tokens.

This remote validation incurs a network cost, but can be used when you want to guarantee that the access token hasn't been revoked.

### Key rotation

The standard behavior in identity and access management is to rotate the keys that are used to sign tokens. Okta changes these keys typically four times a year (every 90 days), but that rotation schedule can change without notice. Okta automatically rotates your authorization server's keys on a regular basis.

Your OIDC client should be coded to periodically query the `/keys` endpoint and retrieve the JSON Web Key Set. This key set contains the public keys used to verify the signatures of the tokens received from Okta. You can cache the keys to improve performance, but be aware that verification will fail when the keys are automatically rotated.

For more information, see [key rotation](/docs/concepts/key-rotation/) or the `/keys` [API endpoint](/docs/reference/api/oidc/#keys) for specific details on handling queries and responses.

<NextSectionLink/>
