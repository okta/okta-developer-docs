---
title: Protocol-level requirements
---

### Code flow

For OIDC applications destined for the OIN, you are building a "web" application with a dedicated server-side back end that is capable of securely storing a Client Secret and sharing it through trusted back-channel connections. The Authorization Code Flow is the recommended flow for controlling access to an OIDC application in the OIN context.

The app should be server-side because the request that exchanges the authorization code for a token requires a Client Secret, which has to be stored in your client. The server-side app also requires an End User because it relies on interaction with the End User's web browser to redirect the user and then receive the authorization code. The End User and the user agent do not see the access token or any part of the authentication response.

The OAuth 2.0/OIDC Authorization Code Flow looks like this for an OIN app:

* Your End User (also known as the Resource Owner) opens their web browser (the User Agent) in order to get access to and work with your application (the Client), which in turn needs information held by various pieces of backend infrastructure (the Resource Server). By clicking on a login link, or an icon on their Okta dashboard, the End User initiates the Authorization Code Flow
* Your Client prepares an Authentication Request to authenticate the End User (or determine if the End User is already authenticated). This request is composed of specific required parameters and is sent to the Okta `/authorize` endpoint:
  * `client_id` &mdash; this value is the Okta client ID created for you when you made your Okta app integration and is available in the app integration settings
  * `nonce` &mdash; A value that is returned in the ID token to mitigate against replay attacks
  * `redirect_uri` &mdash; this is the location where the response will be sent. This value, which must use `https://` is set in your Okta app integrations settings
  * `response_type=code` &mdash; this informs the authorization server that you want to get back and access token and an ID token in exchange for the authorization code
  * `scope` &mdash; must contain `openid` to indicate that this is an OIDC request. Optional scopes can be added to the request to limit the user information returned
  * `state` &mdash; value to be returned in the token. The client application can use it to remember the state of its interaction with the end user at the time of the authentication call.
* Your application sends a redirect response to the browser containing the composed Authentication Request. The browser interprets the redirect, and sends the Authentication Request to the `/authorize` endpoint on the Okta Authorization Server over secure HTTPs.
* Okta then either sends the browser to an Okta sign-in page which asks the End User to provide authentication and consent to the requested scopes, or confirms that the user is already authenticated
* The End User provides proof of identity (using any of the supported authentication methods) and gives consent for any requested claims defined in your `scopes` parameter
* The browser receives an authorization code response from the Okta Authorization Server. If there is an error or the authentication fails for any reason, the error returned to the End User through the browser. If the authentication is successful, the Authorization Server issues an authorization `code` value and includes it in a redirect that sends the browser over to the Client at the Login Redirect URI callback location.
* The Client (your application) then submits a request to the Okta /token endpoint using the authorization code and the Client Secret. If the code and secret are both valid, then Okta returns:
  * `access_token` &mdash; this token is restricted to give access only to what the End User authorized for your application
  * `token_type=Bearer` &mdash; this identifies the authentication method used
  * `expires_in` &mdash; the expiration time for the access token (in seconds)
  * `scope` &mdash; the scopes that are contained in the access token
  * `id_token` &mdash; the ID token contains the specific info (in a JWT format) about your user that is needed by the application
  * Optional. `refresh_token` &mdash; this token is returned if the `offline_access` scope is granted
* The access token is then used by your application to retrieve the protected resources and information requested at the Resource Server for the End User.

The Authorization code process flow depends on Okta and your SaaS back-end systems being able to securely communicate the Client Secret.

Note that your application needs to verify user identity through a user store, otherwise your app could be spoofed by fake applications in the Android or Apple app stores or an End User could view and possibly modify your code. For this reason, OIDC native, mobile, and single page application (SPA) app integrations are not acceptable for OIDC app integrations in the OIN. Your application code must be set up in a flow so that your client application talks to your SaaS back-end which then communicates with Okta.

To support the potentially large numbers of Okta orgs accessing it through the OIN, an OIDC integration can't use a custom authorization server, including the `default` server.

A full guide to setting up the application to use the Authorization Code Flow can be found in our Okta developer guide: Implement the Authorization Code Flow

Also, if you’ve used SAML for SSO in the past, it’s important to realize that the OAuth/OIDC flow is different, because OAuth/OIDC is not just an assertion that is exchanged between Okta and your SaaS back-end, but a long-term token that can be used for callback into Okta at any point as long as the token is valid.

### Scopes

Your OIDC client needs to use scope values to define the access privileges that are being requested for Access Tokens. The scopes associated with Access Tokens determine what resources are available when the tokens are used to access the protected endpoints. Scopes can be used to request that specific “sets” of values be available as claim information about the End User.

The only required scope that has to be declared is the `openid`. When the Authentication Request is sent to Okta, then the `openid` scope identifies the request as being an OIDC request.

Other optional scopes available (these are returned from the /userinfo endpoint):

* `profile` &mdash; the end user's default profile claims: `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `preferred_username`, `profile`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`, `locale`, and `updated_at`
* `email` &mdash; requests access to the email and email_verified claims
* `address` &mdash; requests access to the address claim
* `phone` &mdash; requests access to the phone_number and phone_number_verified claims
* `groups` &mdash; requests access to the groups claim. This is a custom scope for Okta (see below)
* `offline_access` &mdash; requests that a refresh token be generated that can be exchanged for an access token that can then be used to access the End User’s `/userinfo` endpoint even if the End User is not signed on

The details of each claim are available in the [OIDC API documentation](https://developer.okta.com/docs/reference/api/oidc/#scope-dependent-claims-not-always-returned).

As an OIDC app integration destined for the OIN can't use a custom authorization server, including the `default` server, the only customization to the default scopes you can make is to configure the custom `groups` claim.

Okta utilizes access policies to decide whether the scopes can be granted. If any of the requested scopes are rejected by the access policies, the request is rejected.

### Uniform Resource Identifier (URI)

There are three URIs that you need to consider when creating an OIDC app for the OIN:

1. The **Login Redirect URI** is the callback location where the user is directed to along with the authorization code after being successfully authorized by Okta.
  This URI MUST exactly match the Redirection URI value pre-registered in the Okta app integration settings
2. Optional &mdash; the **Initiate Login URI** &mdash; if the application is launched from the Okta dashboard (known as an IdP-initiated flow) and you want your Okta integration to handle redirecting your users to your application to start the sign-in request. Then when End Users click your tile in their Okta dashboard, they are redirected to the `initiate_login_uri` of the client application, which constructs the Authentication Request and redirects the End User back to the Authorization Server.
  This URI MUST exactly match the Initiate URI value pre-registered in the Okta app integration settings
3. Optional &mdash; the **Post Logout Redirect URI** is a location to send the user after a sign off operation is performed and their session is terminated; otherwise the user is redirected back to the Okta sign-in page

### Token Validation

For checking access tokens, the Token Introspection endpoint takes your token as a URL query parameter and returns back a simple JSON response with a boolean active property.

As OIN app integrations can’t use custom auth servers, you must use remote token validation (through the Introspection API endpoint) for access tokens and local validation for ID tokens.

This incurs a network request which is slower to do verification, but can be used when you want to guarantee that the access token hasn't been revoked.

### Key rotation

The standard behavior in identity and access management is to rotate the keys that are used to sign tokens. Okta changes these keys typically four times a year (every 90 days), but that rotation schedule can change without notice. Okta automatically rotates your Authorization Server's keys on a regular basis.

Your OIDC client should be coded to periodically query the `keys` API endpoint and retrieve the JSON Web Key Set. This key set contains the public keys used to verify the signatures of the tokens received from Okta. You can cache the keys to improve performance, but be aware that verification will fail when the keys are automatically rotated.

For more information on key rotation, see [key rotation](https://developer.okta.com/docs/concepts/key-rotation/) or the `keys` [API endpoint](https://developer.okta.com/docs/reference/api/oidc/#keys) for specific details on handling queries and responses.

<NextSectionLink/>
