---
title: OAuth 2.0 Overview
meta:
  - name: description
    content: An overview of OAuth 2.0 and OpenID Connect and their Okta implementations. This guide helps you determine what flow is best for the app you are building.
---

# OAuth 2.0 Overview

This page provides an overview of OAuth 2.0 and OpenID Connect and how these different flows can be implemented using Okta. It will help you decide which flow is best for you based on the type of application that you are building. If you already know what kind of flow you want, you can jump directly to:

- [Implementing OAuth 2.0 Authentication](/docs/concepts/auth-overview/#recommended-flow-by-application-type)
- [Add an External Identity Provider](/docs/guides/add-an-external-idp/saml2/before-you-begin/)
- [Social Login](/docs/concepts/social-login/)
- [Validate access tokens](/docs/guides/validate-access-tokens)
- [Validate ID tokens](/docs/guides/validate-id-tokens)

## Authentication API vs OAuth 2.0 vs OpenID Connect

There are three major kinds of authentication that you can perform with Okta:

- The [Authentication API](/docs/reference/api/authn/) controls access to your Okta org and applications. It provides operations to authenticate users, perform multi-factor enrollment and verification, recover forgotten passwords, and unlock accounts. It is the underlying API that both the Okta Sign-In Widget and Auth JS use under the hood.
- The [OAuth 2.0](/docs/reference/api/oidc/) protocol controls authorization to access a protected resource, like your web app, native app, or API service.
- The [OpenID Connect](/docs/reference/api/oidc/) protocol is built on the OAuth 2.0 protocol and helps authenticate users and convey information about them. It is also more opinionated than plain OAuth 2.0, for example in its scope definitions.

If you would like to work with the Okta API and control user access to Okta, then you should use the [Authentication API](/docs/reference/api/authn/).

If you are interested in controlling access to your own application, then use the OAuth 2.0 and OpenID Connect (OIDC) protocols. The OAuth 2.0 protocol enables you to delegate authorization, while the OIDC protocol enables you to retrieve and store authentication information about your end users. The Okta Authentication Guide is intended to help you figure out how to implement and use OAuth 2.0 and OIDC with Okta.

### Authentication API

The Okta Authentication API controls access to your Okta org and applications by creating and controlling Okta session tokens. Okta session tokens are one-time tokens issued when the authentication transaction completes successfully. Session tokens may be redeemed for a session in Okta's Session API or converted to a session cookie.

Session tokens are for use within Okta, while ID tokens, access tokens, and refresh tokens are usually for accessing third party resources, such as your application.

The Authentication API is used by the Okta Sign-In Widget as well as the AuthJS library. Both AuthJS and the Authentication API are intended for advanced use cases.

You can find out more about the Authentication API in our [API Reference](/docs/reference/api/authn/).

### OAuth 2.0

OAuth 2.0 is a standard that apps use to provide client applications with access. If you would like to grant access to your application data in a secure way, then you want to use the OAuth 2.0 protocol.

The OAuth 2.0 spec has four important roles:

- The "authorization server", which is the server that issues the access token. In this case Okta is the authorization server.
- The "resource owner", normally your application's end user, that grants permission to access the resource server with an access token.
- The "client", which is the application that requests the access token from Okta and then passes it to the resource server.
- The "resource server", which accepts the access token and must verify that it is valid. In this case this is your application.

Other important terms:

- An OAuth 2.0 "grant" is the authorization given (or "granted") to the client by the user. Examples of grants are "authorization code" and "client credentials". Each OAuth grant has a corresponding flow, explained below.
- The "access token" is issued by the authorization server (Okta) in exchange for the grant.
- The "refresh token" is an optional token that is exchanged for a new access token if the access token has expired.

The usual OAuth 2.0 grant flow looks like this:

1. Client requests authorization from the resource owner (usually the user).
2. If the user gives authorization, the client passes the authorization grant to the authorization server (in this case Okta).
3. If the grant is valid, the authorization server returns an access token, possibly alongside a refresh and/or ID token.
4. The client now uses that access token to access the resource server.

> For a deeper dive into OAuth 2.0, see [What the Heck is OAuth?](/blog/2017/06/21/what-the-heck-is-oauth) over on the Okta Developer blog.
>
> If you'd like to see the OAuth 2.0 spec, you can find it here: <https://tools.ietf.org/html/rfc6749>

At the core of both OAuth 2.0 and its OpenID Connect extension is the authorization server. An authorization server is simply an OAuth 2.0 token minting engine. Each authorization server has a unique issuer URI and its own signing key for tokens in order to keep a proper boundary between security domains. In the context of this guide, Okta is your authorization server.

The authorization server also acts as an OpenID Connect Provider,
which means you can request [ID tokens](/docs/reference/api/oidc/#id-token)
in addition to [access tokens](/docs/reference/api/oidc/#access-token) from the authorization server endpoints.

### OpenID Connect

OpenID Connect is an authentication standard built on top of OAuth 2.0. It adds an additional token called an ID token. OpenID Connect also standardizes areas that OAuth 2.0 leaves up to choice, such as scopes, endpoint discovery, and dynamic registration of clients. Okta is [OpenID Certified](https://openid.net/certification/).

Although OpenID Connect (OIDC) is built on top of OAuth 2.0, the specification uses slightly different terms for the roles in the flows:

- The "OpenID provider", which is the authorization server that issues the ID token. In this case Okta is the OpenID provider.
- The "end user" whose information is contained in the ID token.
- The "relying party", which is the client application that requests the ID token from Okta.

- The "ID token" is issued by the OpenID Provider and contains information about the End User in the form of claims.
- A "claim" is a piece of information about the End User.

The high-level flow looks the same for both OIDC and regular OAuth 2.0 flows, the primary difference being simply that an OIDC flow results in an ID token, in addition to any access or refresh tokens.

> **Note:** If you would like to see the OpenID Connect specification, you can find it here: <https://openid.net/connect/>

## Choosing an OAuth 2.0 Flow

Depending on your use case, you will need to use a different OAuth flow. Below you will find a table that maps application types to our recommended OAuth 2.0 flows. If you'd like more information, keep reading for help choosing an OAuth flow based on (1) the type of token you need, and/or (2) the type of client application that you are building.

### Recommended Flow by Application Type

The table below shows you which OAuth 2.0 flow to use for the type of application that you are building. If you'd like more information on which flow to use, see [Choosing an OAuth 2.0 flow](/docs/concepts/auth-overview/#choosing-an-oauth-20-flow).

| Type of Application     | OAuth 2.0 Flow                                      |
| ----------------------- | --------------------------------------------------- |
| Server-side (AKA Web)   | [Authorization Code Flow](/docs/guides/implement-auth-code/)                |
| Single-Page Application | [Authorization Code Flow with PKCE](/docs/guides/implement-auth-code-pkce/) or [Implicit Flow](/docs/guides/implement-implicit/) when the SPA that you are building runs in older browsers that don't support Web Crypto for PKCE. |
| Native                  | [Authorization Code Flow with PKCE](/docs/guides/implement-auth-code-pkce/) |
| Trusted                 | [Resource Owner Password Flow](/docs/guides/implement-password/)            |
| Service                 | [Client Credentials](/docs/guides/implement-client-creds/)                  |

### Does your application need an ID token?

Any OAuth flow can give you an access token, but not all support ID tokens.

|                                  | Access Token     | ID Token     |
| -------------------------------- | :--------------: | :----------: |
| **Authorization Code**           | &#9989;          | &#9989;      |
| **Authorization Code with PKCE** | &#9989;          | &#9989;      |
| **Implicit**                     | &#9989;          | &#9989;      |
| **Resource Owner Password**      | &#9989;          | &#9989;      |
| **Client Credentials**           | &#9989;          | &#10060;     |

### What kind of client are you building?

The type of OAuth 2.0 flow depends on what kind of client that you are building. The flowchart below can quickly help you decide which flow to use. Further explanation about each is included below.

![OAuth Flow Diagram width:](/img/oauth_grant_flowchart.png "Flowchart/decision tree for choosing the correct OAuth 2.0 flow")

##### Is your client public?

A client application is considered "public" when an end user could possibly view and modify the code. This includes Single Page Apps (SPAs) or any mobile or native applications. In both cases, the application cannot keep secrets from malicious users.

###### Is your client a SPA or native?

If your client application is a Single-Page Application (SPA) running in a modern browser that supports Web Crypto for PKCE, you should use the [Authorization Code Flow with PKCE](#authorization-code-flow-with-pkce). If your client application is a SPA that runs in older browsers that don't support Web Crypto for PKCE, then you should use the [Implicit flow](#implicit-flow).

If your client application is a native application, you should use the [Authorization Code Flow with PKCE](#authorization-code-flow-with-pkce).

##### Does the client have an end user?

If your client application is running on a server with no direct end user, then it can be trusted to store credentials and use them responsibly. If your client application will only be doing machine-to-machine interaction, then you should use the [Client Credentials flow](#client-credentials-flow).

##### Does the resource owner own the client?

If you own both the client application and the resource that it is accessing, then your application can be trusted to store your end user's login and password. Because of the high degree of trust required here, you should only use this flow if other flows are not viable. In this case, you can use the [Resource Owner Password flow](#resource-owner-password-flow).

### Authorization Code Flow

The Authorization Code flow is best used by server-side apps where the source code is not publicly exposed. The apps should be server-side because the request that exchanges the authorization code for a token requires a client secret, which will have to be stored in your client. The server-side app requires an end user, however, because it relies on interaction with the end user's web browser which will redirect the user and then receive the authorization code.

![Auth Code Flow width:](/img/oauth_auth_code_flow.png "Flowchart that displays the back and forth between the resource owner, authorization server, and resource server for Auth Code Flow")

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

@startuml

skinparam monochrome true

actor "Resource Owner (User)" as user
participant "Client" as client
participant "Authorization Server (Okta)" as okta
participant "Resource Server (Your App)" as app

client -> okta: Authorization Code Request to /authorize
okta -> user: 302 redirect to authentication prompt
user -> okta: Authentication & consent
okta -> client: Authorization Code Response
client -> okta: Send authorization code + client secret to /token
okta -> client: Access token (and optionally Refresh Token)
client -> app: Request with access token
app -> client: Response

-->

For information on how to set up your application to use this flow, see [Implement the Authorization Code Flow](/docs/guides/implement-auth-code/).

### Authorization Code Flow with PKCE

For web/native/mobile applications, the client secret cannot be stored in the application because it could easily be exposed. Additionally, mobile redirects use `app://` protocols, which are prone to interception. Basically, a rogue application could intercept the authorization code as it is being passed through the mobile/native operating system. Therefore native apps should make use of Proof Key for Code Exchange (PKCE), which acts like a secret but isn't hard-coded, to keep the Authorization Code flow secure.

PKCE is an extension to the regular Authorization Code flow, so the flow is very similar, except that PKCE elements are included at various steps in the flow.

> **Note:** The Authorization Code Flow with PKCE doesn't support refresh tokens for SPAs and other browser-based apps.

The PKCE-enhanced Authorization Code flow requires your application to generate a cryptographically random key called a "code verifier". A "code challenge" is then created from the verifier, and this challenge is passed along with the request for the authorization code.

When the authorization code is sent in the access token request, the code verifier is sent as part of the request. The authorization server recomputes the challenge from the verifier using an agreed-upon hash algorithm and then compares that. If the two code challenges and verifier match, then it knows that both requests were sent by the same client.

A rogue app could only intercept the authorization code, but it would not have access to the code challenge or verifier, since they are both sent over HTTPS.

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

### Client Credentials Flow

The Client Credentials flow is intended for server-side (AKA "confidential") client applications with no end user, which normally describes machine-to-machine communication. The application must be server-side because it must be trusted with the client secret, and since the credentials are hard-coded, it cannot be used by an actual end user. It involves a single, authenticated request to the `/token` endpoint, which returns an access token.

> **Note:** The Client Credentials Flow does not support refresh tokens.

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

## Authorization Servers

For information on authorization servers, how they work, and how you can use them, see [Authorization Servers](/docs/concepts/auth-servers).

At its core, an authorization server is simply an engine for minting OpenID Connect or OAuth 2.0 tokens. You can't mix tokens between different authorization servers. By design, authorization servers don't have trust relationships with each other.

Okta provides two types of authorization servers:

### Okta Authorization Server

Use the Okta Authorization Server to perform Single Sign-On with Okta or get an access token for Okta. The Okta Authorization Server can't be customized. Access tokens issued by the Okta Authorization Server can only be consumed and validated by Okta. The token audience is Okta-specific, so the token can't be used or validated by your own applications.

### Custom Authorization Server

Use a Custom Authorization Server to secure your APIs. Custom Authorization Servers are hosted on Okta, and created and configured by an org administrator. An access token minted by a Custom Authorization Server is consumed by your APIs. Custom scopes can be configured to support authorization for your APIs.

Okta provides a pre-configured Custom Authorization with the name `default`. It includes a basic access policy and rule to get you started quickly. To use the `default` Custom Authorization Server, use `default` as the authorization server ID:

`https://${yourOktaDomain}/api/v1/authorizationServers/${authServerId}` becomes
`https://${yourOktaDomain}/api/v1/authorizationServers/default`

For Custom Authorization Servers that you create yourself, `${authServerId}` will be a random ID like `aus9o8wzkhckw9TLa0h7z`.
