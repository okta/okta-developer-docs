---
title: OIDC and the OIN - Protocol-level requirements
excerpt: The protocol requirements for OIDC-based OIN applications
layout: Guides
---

This guide provides background information on the protocol requirements for OIDC-based OIN applications.

## Authorization Code flow

For OIDC applications destined for the OIN, Okta recommends building a web application with a dedicated server-side back end that is capable of securely storing a client secret and exchanging information with an authorization server through trusted back-channel connections.

If you're planning to build a single page application (SPA), see the [Authorization Code flow with PKCE](#authorization-code-flow-with-pkce) section.

The exchange of the short-lived authorization code for a token requires a client secret. This secret is a value that only your client application and the authorization server know, and you must protect it from malicious parties.

The server-side app also requires an end user because it relies on interaction with the end user's web browser to redirect the user and then receive the authorization code. The end user and the user agent do not see the access token issued by Okta or any part of the authentication response.

The Authorization Code flow is the recommended flow for controlling access to an OIDC application in the OIN context.

For an OIN app, the Authorization Code flow looks like the following:

* Your end user (also known as the Resource Owner) opens their web browser (the User Agent) to access and work with your application (the Client). The Client requires information from various back-end infrastructure elements (the Resource Server), usually an API or service. By clicking a sign-in link or an icon on their Okta dashboard, the end user grants authorization to your application and initiates the Authorization Code flow.
* Your Client prepares an authentication request to authenticate the end user (or determine if the end user is authenticated already). This request is composed of specific required parameters and is sent to the Okta `/authorize` endpoint:
  * `client_id`: The Okta client ID that is created for you when you made your Okta app integration and is available in your Okta app integration settings
  * `nonce`: A value returned in the ID token to mitigate against replay attacks
  * `redirect_uri`: The location where the response is sent. This value, which must start with `https://`, is set in your Okta app integrations settings.
  * `response_type=code`: A value that informs Okta (as the authorization server) that you want to get back an access token and an ID token in exchange for the authorization code
  * `scope`: A parameter that must contain `openid` to indicate that this is an OIDC request and that you want to get back an ID token. You can add optional scopes to your request to limit the user information returned.
  * `state`: A value that is returned in the token. The client application can use it to remember the state of its interaction with the end user at the time of the authentication call.
* Your application sends a redirect response to the browser that contains the composed authentication request. The browser interprets the redirect and sends the authentication request to the `/authorize` endpoint on the Okta Authorization Server over secure HTTPS.
* Okta then sends the browser to a sign-in page that either asks the end user to provide authentication and consent to the requested scopes or confirms that Okta has authenticated the user.
* The end user provides proof of identity (using any of the supported authentication methods) and gives consent for any requested claims defined in your `scopes` parameter. These claims are specific pieces of information that are included in the token provided by Okta.
* The browser receives an authorization code response from the Okta Authorization Server. If there is an error or the authentication fails for any reason, the browser returns the error to the end user. If the authentication is successful, the Okta Authorization Server issues an authorization code value and includes it in a redirect that sends the browser over to the Client at one of the **Sign-in redirect URIs** callback locations.
* The Client (your application) then submits a request to the Okta `/token` endpoint by using the authorization code value and the client secret. If both are valid, then Okta returns:
  * `access_token`: Restricted to give access only to what the end user authorized for your application
  * `token_type=Bearer`: The authentication method that is used
  * `expires_in`: The expiration time for the access token (in seconds)
  * `scope`: The scopes that are contained in the access token
  * `id_token`: Contains specific info (in JWT format) about the authentication and the end user that is needed by the application
  > **Note**: The `refresh_token` option isn't supported for apps published in OIN.

* The access token is then used by your application to retrieve the protected resources and information requested at the Resource Server for the end user.

The Authorization Code flow depends on Okta and your SaaS back-end systems being able to securely communicate the client secret.

> **Note:** Your application needs to verify user identity through a user store. Otherwise, your app could be spoofed by fake applications in the Android or Apple app stores, or an end user could view and possibly modify your code. For this reason, native and mobile app integrations aren't acceptable for OIDC app integrations in the OIN. You must set up your application to use an authentication flow so that your client application talks to your SaaS back end, which then communicates with Okta.

To support the potentially large numbers of Okta orgs accessing it through the OIN, an OIDC integration can't use a custom authorization server, including the `default` server. You can only use the [Org Authorization Server](https://developer.okta.com/docs/concepts/auth-servers/#available-authorization-server-types).

Another general outline of the Authorization Code flow is in our Okta developer guide: [Implement the Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/)

Also, if you have used SAML for SSO in the past, it's important to realize that the OIDC flow is different. The OIDC protocol doesn't just provide an assertion to exchange between Okta and your SaaS back end, but uses a long-term token that you can use for callback into Okta at any point as long as the token is valid.

## Authorization Code flow with PKCE

If you are building a Single Page Application (SPA) for the OIN, then Okta recommends using the Authorization Code flow with a Proof Key for Code Exchange (PKCE) to control the access between your application and a resource server. See our [OAuth 2.0 overview](/docs/concepts/oauth-openid/#authorization-code-with-pkce) for more information on the Authorization Code flow with PKCE, including why to use it.

Just like with the regular Authorization Code flow, your app starts by redirecting the end user's browser to your [Authorization Server's](/docs/concepts/auth-servers/) `/authorize` endpoint. However, in this instance, you also have to pass along a code challenge.

Your first step is to generate a code verifier and challenge:

* Code verifier: Random URL-safe string with a minimum length of 43 characters
* Code challenge: Base64 URL-encoded SHA-256 hash of the code verifier

You need to add code in your SPA app to create the code verifier and code challenge.

The Authorization Code flow with PKCE looks like this for an OIN app:

* Your end user (also known as the Resource Owner) opens the SPA app in their browser to access and work with your application (the Client). The Client requires information from various back-end infrastructure elements (the Resource Server), usually an API or service. By clicking a sign-in link, the end user grants authorization to your application and initiates the Authorization Code flow with PKCE.
* Your client application prepares an authentication request to authenticate the end user. This request is composed of specific required parameters and is sent to the Okta `/authorize` endpoint with a code challenge:
  * `client_id`: The Okta client ID that is created for you when you made your Okta app integration and is available in your Okta app integration settings
  * `redirect_uri`: The location where the response is sent. This value, which must start with `https://`, is set in your Okta app integrations settings.
  * `response_type=code`: Informs Okta (as the authorization server) that you want to get back an access token and an ID token in exchange for the authorization code
  * `state`: An arbitrary value returned in the token. The client application can use it to remember the state of its interaction with the end user at the time of the authentication call
  * `scope`: Must contain `openid` to indicate that you want to get back an ID token from the `/token` endpoint
  * `code_challenge`: The PKCE code challenge that you previously generated
  * `code_challenge_method`: The hash method that is used to generate the challenge value. This value is always `S256`.
* Your application sends a redirect response to the browser that contains the composed authentication request. The browser interprets the redirect and sends the authentication request to the `/authorize` endpoint on the Okta Authorization Server over secure HTTPS.
* Okta then sends the browser to a sign-in page that either asks the end user to provide authentication and consent to the requested scopes or confirms that Okta has authenticated the user.
* The end user provides proof of identity (using any of the supported authentication methods) and gives consent for any requested claims defined in your `scopes` parameter. These claims are specific pieces of information that are included in the token provided by Okta.
* The browser receives an authorization code response from the Okta Authorization Server. If there is an error or the authentication fails for any reason, the browser returns the error to the end user. If the authentication is successful, the Okta Authorization Server issues an authorization code value and includes it in a redirect that sends the browser over to the Client at one of the **Sign-in redirect URIs** callback location.
* The Client (your application) then submits a request to the Okta `/token` endpoint using:
  * The authorization `code` value
  * The `code_verifier` value
  * A `grant_type` of `authorization_code`
  * The `client_id` and the `redirect_uri` for your app
* If both the code and the verifier are valid, then Okta returns:
  * `access_token`: Restricted to give access only to what the end user authorized for your application
  * `token_type=Bearer`: Identifies the authentication method that is used
  * `expires_in`: The expiration time for the access token (in seconds)
  * `scope`: The scopes that are contained in the access token
  * `id_token`: Contains specific info (in JWT format) about the authentication and the end user that is needed by the application
  > **Note**: The `refresh_token` option isn't supported for apps published in OIN.

* The access token is then used by your application to retrieve the protected resources and information requested at the Resource Server for the end user.

Another general outline of the Authorization Code flow with PKCE can be found in our Okta developer guide: [Implement the Authorization Code flow with PKCE](/docs/guides/implement-grant-type/authcodepkce/main/).

## Scopes

Your OIDC client needs to use scope values to define the access privileges being requested with individual access tokens. The scopes associated with access tokens determine what resources are available when the tokens are used to access the protected endpoints. Scopes can be used to request that specific sets of values be available as claim information about the end user.

The only scope that must be declared is `openid`. When the authentication request is sent to Okta, the `openid` scope identifies the request as being an OIDC request.

Other optional scopes available (these are returned from the `/userinfo` endpoint):

* `profile`: The end user's default profile claims: `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `preferred_username`, `profile`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`, `locale`, and `updated_at`
* `email`: Requests access to the `email` and `email_verified` claims

    >**Note:** ISVs shouldn't rely on the `email_verified` scope-dependent claim returned by an OIDC integration to evaluate whether a user has verified ownership of the email address associated with their profile.

* `address`: Requests access to the `address` claim
* `phone`: Requests access to the `phone_number` and `phone_number_verified` claims

> **Note**: The following scopes aren't supported for integrations published in the OIN:
> * `offline_access` scope (since refresh tokens aren't supported)
> * Custom scopes (such as the `groups` scope)

You can only request the [OIDC scopes](/docs/reference/api/oidc/#scopes). However, custom scopes can't be configured.

Okta utilizes access policies to decide whether the scopes can be granted. If any of the requested scopes are rejected by the access policies, the request is rejected.

## Uniform Resource Identifier (URI)

There are three URIs that you need to consider when creating an OIDC app for the OIN:

1. **Sign-in redirect URIs**: After the user is successfully authorized by Okta, this is the callback location is where the user is directed to along with the authorization code. This URI must exactly match at least one of the redirect URI values that are pre-registered in the Okta app integration settings.
2. Optional. **Initiate login URI**: This URI is used if the application is launched from the Okta dashboard (known as an IdP-initiated flow) and you want your Okta integration to handle redirecting your users to your application to start the sign-in request. When end users click your app in their Okta dashboard, they are redirected to the `initiate_login_uri` of the client application, which constructs the authentication request and redirects the end user back to the authorization server. This URI must exactly match the Initiate URI value that is pre-registered in the Okta app integration settings.
3. Optional. **Sign-out redirect URIs**: A location to send the user after a sign-off operation is performed and their session is terminated. Otherwise, the user is redirected back to the sign-in page.

## Token validation

For checking access tokens, the `/introspect` [endpoint](/docs/reference/api/oidc/#introspect) takes your token as a URL query parameter and then returns a simple JSON response with the boolean `active` property.

As OIN app integrations can't use custom auth servers, you must use remote token validation (through the Introspection API endpoint) for access tokens and local validation for ID tokens.

This remote validation incurs a network cost, but you can use it when you want to guarantee that the access token hasn't been revoked.

## Key rotation

The standard behavior in identity and access management is to rotate the keys used to sign tokens. Okta changes these keys typically four times a year (every 90 days), but that rotation schedule can change without notice. Okta automatically rotates the keys for your authorization server on a regular basis.

Your OIDC client should periodically query the `/keys` endpoint and retrieve the JSON Web Key Set. This key set contains the public keys used to verify the signatures of the tokens received from Okta. You can cache the keys to improve performance, but be aware that verification fails when Okta automatically rotates the keys.

For more information, see [key rotation](/docs/concepts/key-rotation/) or the `/keys` [API endpoint](/docs/reference/api/oidc/#keys) for specific details on handling queries and responses.

## Next steps

Now that you understand the protocol-level requirements of OIN integrations, the next stage is to read up on [Multi-tenancy](/docs/guides/oin-oidc-multi-tenancy/) as it relates to OIDC and the OIN.
