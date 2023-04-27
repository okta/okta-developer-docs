---
title: OAuth 2.0 and OpenID Connect Overview
---

# OAuth 2.0 and OpenID Connect Overview

This article provides a high-level introduction to OAuth 2.0 and OpenID Connect (OIDC), which are the standard protocols that Okta's authentication and authorization solutions are based on. This article discusses how you can implement flows based on these standards using Okta, and what flows and grant types are commonly used by the different types of apps.

> **Note**: See [Okta deployment models &mdash; redirect vs. embedded](/docs/concepts/redirect-vs-embedded/) for more information on the specific types of authentication deployment models that Okta provides that are built on top of OAuth 2.0 and OIDC.

## OAuth 2.0 vs OpenID Connect

There are two main types of authentication that you can perform with Okta:

* The [OpenID Connect](/docs/reference/api/oidc/) (OIDC) protocol is built on the OAuth 2.0 protocol and helps authenticate users and convey information about them. It's also more opinionated than plain OAuth 2.0, for example in its scope definitions.

* The [OAuth 2.0](/docs/reference/api/oidc/) protocol controls authorization to access a protected resource, like your web app, native app, or API service.

The OAuth 2.0 protocol provides API security through scoped access tokens. OAuth 2.0 enables you to delegate authorization, while OIDC enables you to retrieve and store authentication information about your end users. OIDC extends OAuth 2.0 by providing user authentication and single sign-on (SSO) functionality.

For most of your app auth requirements, we recommend that you use the OAuth 2.0 and OIDC protocols through the different solutions Okta provides, as outlined in [Redirect authentication vs. embedded authentication](/docs/concepts/redirect-vs-embedded/). To get started with auth implementation and find sample apps, see [Sign users in](/docs/guides/sign-in-overview/).

> **Note**: If you require a completely custom app setup and workflow with direct access control to your Okta org and app integrations, then you can use the [Authentication API](/docs/reference/api/authn/). This API underpins both the Okta [Redirect](/docs/guides/sign-into-web-app-redirect/) and [Embedded](/docs/guides/embedded-siw/) Sign-In Widget, and [Auth JS](/docs/guides/auth-js/) SDKs.

### OAuth 2.0

OAuth 2.0 is a standard that apps use to provide client applications with access. If you would like to grant access to your application data in a secure way, then you want to use the OAuth 2.0 protocol.

The OAuth 2.0 spec has four important roles:

* **authorization server**: The server that issues the access token. In this case Okta is the authorization server.

* **resource owner**: Normally your application's end user that grants permission to access the resource server with an access token.

* **client**: The application that requests the access token from Okta and then passes it to the resource server.

* **resource server**: Accepts the access token and must verify that it's valid. In this case, this is your application.

Other important terms:

* **OAuth 2.0 grant**: The authorization given (or granted) to the client by the user. Examples of grants are **authorization code** and **client credentials**. Each OAuth grant has a corresponding flow. See [Choosing an OAuth 2.0 flow](#choosing-an-oauth-2-0-flow).
* **access token**: The token issued by the authorization server (Okta) in exchange for the grant.
* **refresh token**: An optional token that is exchanged for a new access token if the access token has expired.

> **Note:** See [Token lifetime](/docs/reference/api/oidc/#token-lifetime) for more information on hard-coded and configurable token lifetimes.

The usual OAuth 2.0 grant flow looks like this:

1. Client requests authorization from the resource owner (usually the user).
2. If the user gives authorization, the client passes the authorization grant to the authorization server (in this case Okta).
3. If the grant is valid, the authorization server returns an access token, possibly alongside a refresh and/or ID token.
4. The client now uses that access token to access the resource server.

> **Note:** For a deeper dive into OAuth 2.0, see [What the Heck is OAuth?](/blog/2017/06/21/what-the-heck-is-oauth) over on the Okta Developer blog or checkout the [OAuth 2.0 spec](https://tools.ietf.org/html/rfc6749).

At the core of both OAuth 2.0 and its OpenID Connect extension is the authorization server. An authorization server is simply an OAuth 2.0 token minting engine. Each authorization server has a unique issuer URI and its own signing key for tokens to keep a proper boundary between security domains. In the context of this guide, Okta is your authorization server.

The authorization server also acts as an OpenID Connect Provider, which means you can request [ID tokens](/docs/reference/api/oidc/#id-token) in addition to [access tokens](/docs/reference/api/oidc/#access-token) from the authorization server endpoints.

> **Note:** For information on authorization servers, how they work, and how you can use them, see [Authorization servers](/docs/concepts/auth-servers).

### OpenID Connect

OpenID Connect is an authentication standard built on top of OAuth 2.0. It adds an additional token called an ID token. OpenID Connect also standardizes areas that OAuth 2.0 leaves up to choice, such as scopes, endpoint discovery, and dynamic registration of clients. Okta is [OpenID Certified](https://openid.net/certification/).

Although OpenID Connect is built on top of OAuth 2.0, the [OpenID Connect specification](https://openid.net/connect/) uses slightly different terms for the roles in the flows:

* **OpenID provider**: The authorization server that issues the ID token. In this case Okta is the OpenID provider.
* **end user**: The end user's information that is contained in the ID token.
* **relying party**: The client application that requests the ID token from Okta.
* **ID token**: The token issued by the OpenID Provider and contains information about the end user in the form of claims.
* **claim**: The claim is a piece of information about the end user.

The high-level flow looks the same for both OpenID Connect and regular OAuth 2.0 flows. The primary difference is that an OpenID Connect flow results in an ID token, in addition to any access or refresh tokens.

## Choosing an OAuth 2.0 flow

Which OAuth flow that you use depends on your use case. The table below maps application types to our recommended OAuth 2.0 flows. If you'd like more information, keep reading for help with choosing an OAuth flow based on (1) the type of token that you need, and/or (2) the type of client application that you are building.

### Recommended flow by application type

The table shows you which OAuth 2.0 flow to use for the type of application that you are building.

| Type of Application     | OAuth 2.0 flow / grant type                      | Access Token?    | ID Token?     |
| ----------------------- | ------------------------------------------------ | ---------------- | ------------- |
| Server-side (aka Web), <br><br> Single-Page Application, <br><br> or Native | [Authorization Code with PKCE](#authorization-code-flow-with-pkce) or [Interaction Code](#interaction-code-flow) (Identity Engine only).                | &#9989;          | &#9989;      |
| Trusted                 | [Resource Owner Password](#resource-owner-password-flow)            | &#9989;          | &#9989;      |
| Service                 | [Client Credentials](#client-credentials-flow)                  | &#9989;          | &#10060;     |

> **Note**: There is also an OAuth 2.0 [SAML 2.0 Assertion flow](#saml-2-0-assertion-flow), intended for a client app that wants to use an existing trust relationship without a direct user approval step at the authorization server. This supports access and ID tokens.

### What kind of client are you building?

The type of OAuth 2.0 flow depends on what kind of client that you are building. This flowchart can quickly help you decide which flow to use.

<div class="full">

![flowchart/decision tree for choosing the correct OAuth 2.0 flow](/img/authorization/oauth_grant_flowchart.png)

</div>

#### Is your client public?

A client application is considered public when an end user could possibly view and modify the code. This includes Single-Page Apps (SPAs) or any mobile or native applications. In both cases, the application can't keep secrets from malicious users. Your client is considered confidential or private for server-side (web applications), which means your client can use client authentication such as a client secret.

#### Is your client a SPA or native?

If your client application is a SPA or a native application, you should use an authorization flow with PKCE, such as either the [Interaction Code flow with PKCE](#interaction-code-flow) or the [Authorization Code flow with PKCE](#authorization-code-flow-with-pkce). If you are doing a redirect flow to an Okta-hosted sign-in page, the Authorization Code flow with PKCE is recommended. If you want to embed the sign-in experience, the Interaction Code flow is recommended.

#### Does the client have an end user?

If your client application is running on a server with no direct end user, then it can be trusted to handle credentials and use them responsibly. If your client application is only doing machine-to-machine interaction, then you should use the [Client Credentials flow](#client-credentials-flow).

#### Is your app high-trust?

If you own both the client application and the resource that it's accessing, then your application can be trusted to handle your end user's username and password. These types of apps are considered "high-trust". Because of the high degree of trust required, you should only use the [Resource Owner Password flow](#resource-owner-password-flow) if other flows aren't viable.

If your app is not high-trust, you should use the [Authorization Code](/docs/guides/implement-grant-type/authcode/main/) flow.

### Interaction Code flow

The Interaction Code flow is an extension to the OAuth 2 and OIDC standard, and is available when using Identity Engine orgs. It requires clients to pass a client ID, as well as a Proof Key for Code Exchange (PKCE), to keep the flow secure. The user can start the request with minimal information, relying on the client to facilitate the interactions with the Identity Engine component of the Okta authorization server to progressively authenticate the user. See [Interaction Code grant type](/docs/concepts/interaction-code/).

<!--
See http://www.plantuml.com/plantuml/uml/

@startuml
skinparam monochrome true
actor "Resource Owner (User)" as user
participant "Client" as client
participant "Authorization Server (Okta)" as okta
participant "Resource Server (Your App)" as app

user -> client: Start auth with user info
client -> client: Generate PKCE code verifier & challenge
client -> okta: Authorization request w/ code_challenge, client ID, scopes, and user info
okta -> okta: Remediation required
okta -> client: Send interaction_handle in response (for required interaction)
client <-> okta: Remediation steps w/ interaction_handle
user <-> client: Remediation
note right: Possible multiple remediation steps required
client -> okta: Complete remediation steps w/ interaction_handle
okta -> client: Send interaction_code in response
client -> okta: Send interaction_code, client ID, code_verifier to /token
okta -> okta: Evaluates PKCE code
okta -> client: Access token (and optionally refresh token)
client -> app: Request with access token
app -> client: Response
@enduml

 -->

<div class="full">

![Interaction Code flow sequence diagram](/img/authorization/interaction-code-grant-flow-guide.png)

</div>

### Authorization Code flow with PKCE

Authorization Code flow with Proof Key for Code Exchange (PKCE) is the recommended flow for most applications whether server-side (web), native, or mobile. PKCE was originally designed to protect the authorization code flow in mobile apps, but its ability to prevent authorization code injection makes it useful for every type of OAuth client, even web apps that use a client secret. PKCE acts like a secret but isn't hard-coded, and keeps the Authorization Code flow secure.

PKCE is an extension to the regular Authorization Code flow, so the flow is very similar, except that PKCE elements are included at various steps in the flow.

> **Note:** See [Refresh access tokens](/docs/guides/refresh-tokens/main/) for implementing refresh tokens with SPAs and other browser-based apps.

The PKCE-enhanced Authorization Code flow requires your application to generate a cryptographically random key called a "code verifier". A "code challenge" is then created from the verifier, and this challenge is passed along with the request for the authorization code.

When the authorization code is sent in the access token request, the code verifier is sent as part of the request. The authorization server recomputes the challenge from the verifier using an agreed-upon hash algorithm and then compares that. If the two code challenges and verifier match, then it knows that both requests were sent by the same client.

A rogue app could only intercept the authorization code, but it wouldn't have access to the code challenge or verifier, since they are both sent over HTTPS.

<div class="full">

![Flowchart that displays the back and forth between the resource owner, authorization server, and resource server for Authorization Code flow with PKCE](/img/authorization/oauth-auth-code-pkce-grant-flow.png)

</div>

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

For information on how to set up your application to use this flow, see [Implement the Authorization Code flow with PKCE](/docs/guides/implement-grant-type/authcodepkce/main/).

### Resource Owner Password flow

The Resource Owner Password flow is intended for use cases where you control both the client application and the resource that it is interacting with. It requires that the client can store a client secret and can be trusted with the resource owner's credentials, and so is most commonly found in clients made for online services, like the Facebook client applications that interact with the Facebook service. It doesn't require redirects like the Authorization Code or Implicit flows, and involves a single authenticated call to the `/token` endpoint.

<div class="full">

![Flowchart that displays the back and forth between the resource owner, authorization server, and resource server for Resource Owner Password flow](/img/authorization/oauth-password-grant-flow.png)

</div>

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

For information on how to set up your application to use this flow, see [Implement the Resource Owner Password flow](/docs/guides/implement-grant-type/ropassword/main/).

### Client Credentials flow

The Client Credentials flow is intended for server-side ("confidential") client applications with no end user, which normally describes machine-to-machine communication. The application must be server-side because it must be trusted with the client secret, and since the credentials are hard-coded, it can't be used by an actual end user. It involves a single, authenticated request to the `/token` endpoint, which returns an access token.

> **Note:** The Client Credentials flow doesn't support refresh tokens.

<div class="three-quarter">

![Flowchart that displays the back and forth between the resource owner, authorization server, and resource server for Client Credentials flow](/img/authorization/oauth-client-creds-grant-flow.png)

</div>

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

For information on how to set up your application to use this flow, see [Implement the Client Credentials flow](/docs/guides/implement-grant-type/clientcreds/main/).

### SAML 2.0 Assertion flow

The SAML 2.0 Assertion flow is intended for a client app that wants to use an existing trust relationship without a direct user approval step at the authorization server. It enables a client application to obtain an authorization from a valid, signed SAML assertion from the SAML Identity Provider. The client app can then exchange it for an OAuth access token from the OAuth authorization server. For example, this flow is useful when you want to fetch data from APIs that only support delegated permissions without prompting the user for credentials.

To use a SAML 2.0 Assertion as an authorization grant, the client makes a SAML request to the Identity Provider and the Identity Provider sends the SAML 2.0 Assertion back in the response. The client then makes a request for an access token with the `urn:ietf:params:oauth:grant-type:saml2-bearer` grant type and includes the `assertion` parameter. The value of the `assertion` parameter is the SAML 2.0 assertion that is Base64-encoded. You can send only one SAML assertion in that request.

<div class="full">

![Flowchart that displays the back and forth between the resource owner, identity provider, authorization server, and resource server for the SAML 2.0 Assertion flow](/img/authorization/oauth-saml2-grant-flow.png)

</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

skinparam monochrome true

participant "Client" as OClient
participant "Identity Provider " as idp
participant "Authorization Server (Okta)" as okta
participant "Resource Server" as rs

OClient -> idp: Makes SAML request to the IdP
idp -> OClient: Sends SAML 2.0 Assertion in response
OClient -> okta: Sends Base64-encoded SAML 2.0 Assertion to /token
okta -> OClient: Verifies assertion and sends access token (optionally ID token, refresh token)
OClient -> rs: Makes a resource request with the access token to the resource server

-->

For information on how to set up your application to use this flow, see [Implement the SAML 2.0 Assertion flow](/docs/guides/implement-grant-type/saml2assert/main/).

### Implicit flow

 > **Note:** The Implicit flow is a legacy flow used only for SPAs that can’t support PKCE.

 The Implicit flow is intended for applications where the confidentiality of the client secret can't be guaranteed. In this flow, the client doesn't make a request to the `/token` endpoint, but instead receives the access token directly from the `/authorize` endpoint. The client must be capable of interacting with the resource owner's user agent and also capable of receiving incoming requests (through redirection) from the authorization server.

> **Note:** Because it's intended for less-trusted clients, the Implicit flow doesn't support refresh tokens.

> **Important:** For Single-Page Applications (SPA) running in modern browsers that support Web Crypto for PKCE, we recommend using the [Authorization Code flow with PKCE](#authorization-code-flow-with-pkce) instead of the Implicit flow for maximum security. If support for older browsers is required, the Implicit flow provides a working solution.

<div class="full">

![Flowchart that displays the back and forth between the resource owner, authorization server, and resource server for Implicit flow](/img/authorization/oauth-implicit-grant-flow.png)

</div>

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

For information on how to set up your application to use this flow, see [Implement the Implicit flow](/docs/guides/implement-grant-type/implicit/main/).
