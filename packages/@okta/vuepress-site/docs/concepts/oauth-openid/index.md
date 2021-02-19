---
title: OAuth 2.0 and OpenID Connect Overview
---

# OAuth 2.0 and OpenID Connect Overview

To decide which authentication flow is best for you based on the type of application that you are building, you first need to understand OAuth 2.0 and OpenID Connect and how you can implement these two flows using Okta.

## Authentication API vs OAuth 2.0 vs OpenID Connect

There are three major kinds of authentication that you can perform with Okta:

* The [Authentication API](/docs/reference/api/authn/) controls access to your Okta org and applications. It provides operations to authenticate users, perform multifactor enrollment and verification, recover forgotten passwords, and unlock accounts. It is the underlying API that both the Okta Sign-In Widget and Auth JS use under the hood.

* The [OAuth 2.0](/docs/reference/api/oidc/) protocol controls authorization to access a protected resource, like your web app, native app, or API service.

* The [OpenID Connect](/docs/reference/api/oidc/) protocol is built on the OAuth 2.0 protocol and helps authenticate users and convey information about them. It is also more opinionated than plain OAuth 2.0, for example in its scope definitions.

If you would like to work with the Okta API and control user access to Okta, then you should use the [Authentication API](/docs/reference/api/authn/).

If you are interested in controlling access to your own application, then use the OAuth 2.0 and OpenID Connect protocols. The OAuth 2.0 protocol provides API security through scoped access tokens. OAuth 2.0 enables you to delegate authorization, while the OpenID Connect protocol enables you to retrieve and store authentication information about your end users. OpenID Connect extends OAuth 2.0 by providing user authentication and single sign-on (SSO) functionality.

### OAuth 2.0

OAuth 2.0 is a standard that apps use to provide client applications with access. If you would like to grant access to your application data in a secure way, then you want to use the OAuth 2.0 protocol.

The OAuth 2.0 spec has four important roles:

* The "authorization server" &mdash; The server that issues the access token. In this case Okta is the authorization server.

* The "resource owner" &mdash; Normally your application's end user that grants permission to access the resource server with an access token

* The "client" &mdash; The application that requests the access token from Okta and then passes it to the resource server

* The "resource server" &mdash; Accepts the access token and must verify that it's valid. In this case this is your application.

Other important terms:

* An OAuth 2.0 "grant" is the authorization given (or "granted") to the client by the user. Examples of grants are "authorization code" and "client credentials". Each OAuth grant has a corresponding flow, explained below.
* The "access token" is issued by the authorization server (Okta) in exchange for the grant.
* The "refresh token" is an optional token that is exchanged for a new access token if the access token has expired.

The usual OAuth 2.0 grant flow looks like this:

1. Client requests authorization from the resource owner (usually the user).
2. If the user gives authorization, the client passes the authorization grant to the authorization server (in this case Okta).
3. If the grant is valid, the authorization server returns an access token, possibly alongside a refresh and/or ID token.
4. The client now uses that access token to access the resource server.

> **Note:** For a deeper dive into OAuth 2.0, see [What the Heck is OAuth?](/blog/2017/06/21/what-the-heck-is-oauth) over on the Okta Developer blog or checkout the [OAuth 2.0 spec](https://tools.ietf.org/html/rfc6749).

At the core of both OAuth 2.0 and its OpenID Connect extension is the authorization server. An authorization server is simply an OAuth 2.0 token minting engine. Each authorization server has a unique issuer URI and its own signing key for tokens to keep a proper boundary between security domains. In the context of this guide, Okta is your authorization server.

The authorization server also acts as an OpenID Connect Provider, which means you can request [ID tokens](/docs/reference/api/oidc/#id-token) in addition to [access tokens](/docs/reference/api/oidc/#access-token) from the authorization server endpoints.

> **Note:** For information on authorization servers, how they work, and how you can use them, see [Authorization Servers](/docs/concepts/auth-servers).

### OpenID Connect

OpenID Connect is an authentication standard built on top of OAuth 2.0. It adds an additional token called an ID token. OpenID Connect also standardizes areas that OAuth 2.0 leaves up to choice, such as scopes, endpoint discovery, and dynamic registration of clients. Okta is [OpenID Certified](https://openid.net/certification/).

Although OpenID Connect is built on top of OAuth 2.0, the [OpenID Connect specification](https://openid.net/connect/) uses slightly different terms for the roles in the flows:

* The "OpenID provider" &mdash; The authorization server that issues the ID token. In this case Okta is the OpenID provider.
* The "end user" &mdash; Whose information is contained in the ID token
* The "relying party" &mdash; The client application that requests the ID token from Okta

* The "ID token" is issued by the OpenID Provider and contains information about the end user in the form of claims.
* A "claim" is a piece of information about the end user.

The high-level flow looks the same for both OpenID Connect and regular OAuth 2.0 flows. The primary difference is that an OpenID Connect flow results in an ID token, in addition to any access or refresh tokens.

## Choosing an OAuth 2.0 flow

Which OAuth flow that you use depends on your use case. The table below maps application types to our recommended OAuth 2.0 flows. If you'd like more information, keep reading for help with choosing an OAuth flow based on (1) the type of token that you need, and/or (2) the type of client application that you are building.

### Recommended flow by application type

The table shows you which OAuth 2.0 flow to use for the type of application that you are building.

| Type of Application     | OAuth 2.0 Flow                                      |
| ----------------------- | --------------------------------------------------- |
| Server-side (AKA Web)   | [Authorization Code Flow](/docs/guides/implement-auth-code/)                |
| Single-Page Application | [Authorization Code Flow with PKCE](/docs/guides/implement-auth-code-pkce/) or [Implicit Flow](/docs/guides/implement-implicit/) when the SPA that you are building runs in older browsers that don't support Web Crypto for PKCE |
| Native                  | [Authorization Code Flow with PKCE](/docs/guides/implement-auth-code-pkce/) |
| Trusted                 | [Resource Owner Password Flow](/docs/guides/implement-password/)            |
| Service                 | [Client Credentials](/docs/guides/implement-client-creds/)                  |

### Does your application need an ID token?

Any OAuth flow can give you an access token, but not all support ID tokens.

| Grant Type                       | Access Token     | ID Token     |
| -------------------------------- | :--------------: | :----------: |
| **Authorization Code**           | &#9989;          | &#9989;      |
| **Authorization Code with PKCE** | &#9989;          | &#9989;      |
| **Implicit**                     | &#9989;          | &#9989;      |
| **Resource Owner Password**      | &#9989;          | &#9989;      |
| **Client Credentials**           | &#9989;          | &#10060;     |
| **SAML 2.0 Assertion**           | &#9989;          | &#9989;      |

### What kind of client are you building?

The type of OAuth 2.0 flow depends on what kind of client that you are building. This flowchart can quickly help you decide which flow to use.

![OAuth Flow Diagram width:](/img/oauth_grant_flowchart.png "Flowchart/decision tree for choosing the correct OAuth 2.0 flow")

#### Is your client public?

A client application is considered public when an end user could possibly view and modify the code. This includes Single-Page Apps (SPAs) or any mobile or native applications. In both cases, the application can't keep secrets from malicious users.

#### Is your client a SPA or native?

If your client application is a SPA running in a modern browser that supports Web Crypto for PKCE, you should use the [Authorization Code Flow with PKCE](#authorization-code-flow-with-pkce). If your client application is a SPA that runs in older browsers that don't support Web Crypto for PKCE, then you should use the [Implicit flow](#implicit-flow). Because the Implicit flow is intended for applications where confidentiality of the client secret can't be guaranteed, you should only use this flow if other flows aren't viable.

If your client application is a native application, you should use the [Authorization Code Flow with PKCE](#authorization-code-flow-with-pkce).

#### Does the client have an end user?

If your client application is running on a server with no direct end user, then it can be trusted to store credentials and use them responsibly. If your client application is only doing machine-to-machine interaction, then you should use the [Client Credentials flow](#client-credentials-flow).

#### Does the resource owner own the client?

If you own both the client application and the resource that it is accessing, then your application can be trusted to store your end user's username and password. Because of the high degree of trust required here, you should only use the [Resource Owner Password flow](#resource-owner-password-flow) if other flows aren't viable.

### Authorization Code Flow

The Authorization Code flow is best used by server-side apps where the source code isn't publicly exposed. The apps should be server-side because the request that exchanges the authorization code for a token requires a client secret, which has to be stored in your client. The server-side app requires an end user, however, because it relies on interaction with the end user's web browser, which redirects the user and then receives the authorization code.

![Auth Code Flow width:](/img/oauth_auth_code_flow.png "Flowchart that displays the back and forth between the resource owner, authorization server, and resource server for Auth Code Flow")

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

@startuml
skinparam monochrome true

actor "Resource Owner (User)" as user
participant "Web App" as client
participant "Authorization Server (Okta) " as okta
participant "Resource Server (Your App) " as app

client -> okta: Authorization Code Request to /authorize
okta -> user: 302 redirect to authentication prompt
user -> okta: Authentication & consent
okta -> client: Authorization Code Response
client -> okta: Send authorization code + client secret to /token
okta -> client: Access token (and optionally Refresh Token)
client -> app: Request with access token
app -> client: Response
@enduml

-->

For information on how to set up your application to use this flow, see [Implement the Authorization Code Flow](/docs/guides/implement-auth-code/).

### Authorization Code Flow with PKCE

For web/native/mobile applications, the client secret can't be stored in the application because it could easily be exposed. Additionally, mobile redirects use `app://` protocols, which are prone to interception. Basically, a rogue application could intercept the authorization code as it is being passed through the mobile/native operating system. Therefore native apps should make use of Proof Key for Code Exchange (PKCE), which acts like a secret but isn't hard-coded, to keep the Authorization Code flow secure.

PKCE is an extension to the regular Authorization Code flow, so the flow is very similar, except that PKCE elements are included at various steps in the flow.

> **Note:** The Authorization Code Flow with PKCE doesn't support refresh tokens for SPAs and other browser-based apps.

The PKCE-enhanced Authorization Code flow requires your application to generate a cryptographically random key called a "code verifier". A "code challenge" is then created from the verifier, and this challenge is passed along with the request for the authorization code.

When the authorization code is sent in the access token request, the code verifier is sent as part of the request. The authorization server recomputes the challenge from the verifier using an agreed-upon hash algorithm and then compares that. If the two code challenges and verifier match, then it knows that both requests were sent by the same client.

A rogue app could only intercept the authorization code, but it wouldn't have access to the code challenge or verifier, since they are both sent over HTTPS.

![Auth Code Flow with PKCE width:](/img/oauth_auth_code_flow_pkce.png "Flowchart that displays the back and forth between the resource owner, authorization server, and resource server for Auth Code Flow with PKCE")

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

@startuml

skinparam monochrome true

actor "Resource Owner (User)" as user
participant "Client" as client
participant "Authorization Server (Okta)" as okta
participant "Resource Server (Your App)" as app

client -> client: Generate PKCE code verifier & challenge
client -> okta: Authorization Code Request + code_challenge to /authorize
okta -> user: 302 redirect to authentication prompt
user -> okta: Authentication & consent
okta -> client: Authorization Code Response
client -> okta: Send authorization code + code_verifier to /token
okta -> okta: Evaluates PKCE code
okta -> client: Access token (and optionally Refresh Token)
client -> app: Request with access token
app -> client: Response

-->

For information on how to set up your application to use this flow, see [Implement the Authorization Code Flow with PKCE](/docs/guides/implement-auth-code-pkce/).

### Implicit Flow

The Implicit flow is intended for applications where the confidentiality of the client secret can't be guaranteed. In this flow, the client doesn't make a request to the `/token` endpoint, but instead receives the access token directly from the `/authorize` endpoint. The client must be capable of interacting with the resource owner's user agent and also capable of receiving incoming requests (through redirection) from the authorization server.

> **Note:** Because it is intended for less-trusted clients, the Implicit flow doesn't support refresh tokens.

> **Important:** For Single-Page Applications (SPA) running in modern browsers that support Web Crypto for PKCE, we recommend using the [Authorization Code Flow with PKCE](#authorization-code-flow-with-pkce) instead of the Implicit flow for maximum security. If support for older browsers is required, the Implicit flow provides a working solution.

![Implicit Flow width:](/img/oauth_implicit_flow.png "Flowchart that displays the back and forth between the resource owner, authorization server, and resource server for Implicit Flow")

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

skinparam monochrome true

actor "Resource Owner (User)" as user
participant "Client" as client
participant "Authorization Server (Okta)" as okta
participant "Resource Server (Your App)" as app

client -> okta: Access token request to /authorize
okta -> user: 302 redirect to authentication prompt
user -> okta: Authentication & consent
okta -> client: Access token response
client -> app: Request with access token
app -> client: Response
-->

For information on how to set up your application to use this flow, see [Implement the Implicit Flow](/docs/guides/implement-implicit/).

### Resource Owner Password Flow

The Resource Owner Password Flow is intended for use cases where you control both the client application and the resource that it is interacting with. It requires that the client can store a client secret and can be trusted with the resource owner's credentials, and so is most commonly found in clients made for online services, like the Facebook client applications that interact with the Facebook service. It doesn't require redirects like the Authorization Code or Implicit flows, and involves a single authenticated call to the `/token` endpoint.

![Resource Owner Password Flow width:](/img/oauth_password_flow.png "Flowchart that displays the back and forth between the resource owner, authorization server, and resource server for Resource Owner Password Flow")

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

skinparam monochrome true

actor "Resource Owner (User)" as user
participant "Client" as client
participant "Authorization Server (Okta)" as okta
participant "Resource Server (Your App)" as app

user -> client: Authenticates
client -> okta: Access token request to /token
okta -> client: Access token (+optional Refresh Token) response
client -> app: Request with access token
app -> client: Response

-->

For information on how to set up your application to use this flow, see [Implement the Resource Owner Password Flow](/docs/guides/implement-password/).

### Client Credentials flow

The Client Credentials flow is intended for server-side (AKA "confidential") client applications with no end user, which normally describes machine-to-machine communication. The application must be server-side because it must be trusted with the client secret, and since the credentials are hard-coded, it can't be used by an actual end user. It involves a single, authenticated request to the `/token` endpoint, which returns an access token.

> **Note:** The Client Credentials Flow doesn't support refresh tokens.

![Client Credentials Flow width:](/img/oauth_client_creds_flow.png "Flowchart that displays the back and forth between the resource owner, authorization server, and resource server for Client Credentials Flow")

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

skinparam monochrome true

participant "Client + Resource Owner" as client
participant "Authorization Server (Okta)" as okta
participant "Resource Server (Your App)" as app

client -> okta: Access token request to /token
okta -> client: Access token response
client -> app: Request with access token
app -> client: Response

-->

For information on how to set up your application to use this flow, see [Implement the Client Credentials Flow](/docs/guides/implement-client-creds/).

### SAML 2.0 Assertion flow

The SAML 2.0 Assertion flow is intended for a client app that wants to use an existing trust relationship without a direct user approval step at the authorization server. It enables a client application to obtain an existing authorization in the form of a valid, signed SAML assertion from a SAML Identity Provider. The client app can then exchange it for an OAuth access token from the OAuth authorization server. For example, this flow is useful when you want to fetch data from APIs that only support delegated permissions without prompting the user for credentials.

To use a SAML 2.0 Assertion as an authorization grant, the client makes a request for an access token with the `urn:ietf:params:oauth:grant-type:saml2-bearer` grant type and includes the `assertion` parameter. The value of the `assertion` parameter is a single SAML 2.0 assertion that is base64url encoded.

![SAML 2.0 Assertion Flow width:](/img/saml_assert_flow.png "Flowchart that displays the back and forth between the resource owner, identity provider, authorization server, and resource server for the SAML 2.0 Assertion Flow")

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

skinparam monochrome true

participant "Service Provider (your app) " as sp
participant "SAML Identity Provider " as idp
participant "Authorization Server (Okta) " as okta
participant "Resource " as resource

sp -> resource: Attempts to access Resource
resource -> sp: Makes an authorize request to the Service Provider
sp -> idp: Passes authorize request to the Identity Provider
idp -> sp: Sends SAML 2.0 Assertion after authorization
sp -> okta: Sends Base64-encoded SAML 2.0 Assertion to /token
okta -> sp: Verifies assertion and sends access token (optionally ID token, refresh token)
sp -> resource: Sends request with access token

-->

For information on how to set up your application to use this flow, see [Implement the SAML 2.0 Assertion Flow](/docs/guides/implement-saml2/overview).
