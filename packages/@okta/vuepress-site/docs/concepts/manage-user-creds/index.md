---
title: Manage user credentials for your apps
meta:
  - name: description
    content: Learn about user credentials and securely managing them
---

# Manage user credentials for your apps

User credentials are what the user provides to prove their identity. This information falls into three categories:

* Something the user knows (like a password)
* Something the user has (like a one-time passcode from an authenticator app)
* Something the user is (like a fingerprint)

Securely managing these credentials is a critical part of your app's security. It's also essential to mitigate risks that directly threaten user data, such as token theft and account takeover. This document explains how to manage user credentials effectively to protect your users and their data.

## Why secure token management is critical

Tokens are the digital credentials that grant users access to protected resources. However, tokens also represent a primary target for attackers. Failing to manage them securely exposes your app and its users to significant threats. These risks range from web-based attacks like Cross-Site Scripting (XSS) designed to steal tokens to overly permissive scopes that can lead to a data breach.

This section outlines the risk areas in token management and explains why a security strategy is essential to prevent unauthorized access and protect user data.

### Risk areas

* **Compromised user identity and data**: If unauthorized parties access tokens, a user's identity could be compromised. Without proper management, token leaks can pose a significant risk to user data. However, OAuth 2.0 tokens that are used for authorizing API requests are short-lived. You can configure them to expire after a specific duration, which reduces the window of opportunity for attackers to misuse them. In contrast, using passwords directly can remain valid indefinitely unless explicitly changed.
* **Vulnerabilities in web environments**: Web browsers introduce unique security challenges, particularly from Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) vulnerabilities.
  * XSS attacks involve malicious scripts running inside your app. These scripts can execute any potential actions that your app can perform. Frequently, attackers use XSS to steal authentication tokens that are stored in the browser.
  * CSRF allows attackers to trick an authenticated browser into making unintended requests.
* **Concurrency issues**: Managing tokens involves storage, retrieval, and refresh operations. In complex apps, especially during initialization or with concurrent operations, multiple calls to token storage can lead to shared resource contention.
* **Lack of granular control and scope restrictions**: If tokens aren't scoped appropriately, any security compromise can lead to broader unauthorized access to resources, increasing the potential damage. Defining granular and specific scopes within [authorization servers](/docs/concepts/auth-servers/) is a best practice.
* **Insecure token transmission**: All interactions and redirects involving users, apps, and Okta must be secured through HTTPS (SSL/TLS) connections to protect credentials and tokens from interception. Pass [access tokens](/docs/concepts/token-lifecycles/#access-tokens) exclusively through an HTTP Authorization header. Also, never encode tokens into a payload or URL, as these can be logged or cached.
<!-- [For later: The Okta Client SDK's token management system is designed to mitigate these issues and ensure app stability.] -->

### Use the token lifecycle to mitigate risk

Understanding and managing the token lifecycle is a primary defense against the risks previously outlined. Each stage, from creation to revocation, provides a set of controls to protect your app and its users.

#### Control token lifetime and renewal

A key strategy to limit the damage of a compromised token is to control its lifetime. Short-lived tokens reduce the window of opportunity for an attacker to misuse them:

* Okta [org authorization servers](/docs/concepts/auth-servers/#org-authorization-server) generate tokens with fixed lifetimes (for example, 60 minutes for access tokens).

* [Custom authorization servers](/docs/concepts/auth-servers/#custom-authorization-server) offer more control, allowing you to configure access token lifetimes from five minutes to 24 hours.

While shorter lifetimes enhance security, they require more frequent renewal. Use refresh tokens so your app can obtain new access tokens without re-prompting the user, balancing security with a seamless user experience.

#### Revoke tokens to prevent misuse

When a token is no longer needed, such as during a sign-out flow, revoke the token so it can't be used again. Revoking the token on the server using the `/revoke` endpoint is a critical security step, in addition to clearing it from the client. A token can also be implicitly revoked due to events like user deactivation or configuration changes on the authorization server.

#### Validate tokens to ensure integrity

Before your app accepts a token, you must validate it to ensure that it's authentic and hasn't been tampered with. You can validate access tokens either locally by verifying the JWT signature against the public keys (JWKS) or remotely through the `/introspect` endpoint. For performance, Okta recommends dynamically retrieving and caching the JWKS. Also, check for updates periodically to ensure that your app can handle rapid key regeneration.

## Manage the user credential lifecycle

For apps, the choice of token storage strategy and sign-in model significantly impacts security and user experience.

### Token storage

There are several models that you can use to manage tokens in your app:

* Front channel OAuth model
* Backend For Frontend (BFF)
* Demonstrating Proof of Possession (DPoP)

The optimal choice depends on the required levels of access control and the desired scalability of your app.

#### Front channel OAuth model

In a front-channel OAuth model, the app handles all authentication directly, and tokens are stored in cookies, browser storage, or computer memory.

In this model, the token lifecycle is as follows:

1. **Authenticate**: The user enters their credentials (such as a username and password) or uses a social identity provider to sign in. The app uses a client-side library to interact with an identity provider (IdP) to get a security token.
1. **Store tokens after sign-in**: After the user authenticates, the app receives an access token. You can store the token in browser storage (local storage or session storage) or in-memory (as a JavaScript variable).
1. **Retrieve tokens for API requests**: The client retrieves the token from memory and attaches it as a bearer token in the Authorization header for API requests.
1. **Handle token expiration and renewal**: When an access token expires, the client uses the refresh token to request a new access token from the authorization server. This happens transparently to the user, allowing for a continuous session.
1. **Secure sign-out**: Clear both the client-side tokens and the server-side refresh token. The app must also call the `/revoke` endpoint to invalidate the refresh token on the server.

Storing tokens using in-memory storage or a secure data vault offers a higher degree of security against XSS attacks. However, this model is vulnerable to client-side attacks like XSS and token theft. This is why developers now replace it with more secure token storage strategies.

#### Backend for frontend model

The [Backend for Frontend (BFF)](https://auth0.com/blog/the-backend-for-frontend-pattern-bff/#The-Backend-For-Frontend-Pattern) model is another approach to handle token storage and security, as it fundamentally changes where sensitive tokens are managed. Instead of storing tokens directly in the browser, the BFF pattern shifts responsibility to a dedicated server layer. This greatly simplifies the client's role.

In the front-channel model, the client can talk directly to multiple client services. However, with BFF, the front-end client only talks to the BFF, a single, purpose-built backend service. The BFF then handles all communication with the other backend services, including the IdP. This model centralizes all token management on a single, trusted server, which reduces the attack surface and makes the system more resilient to client-side attacks.

Here's how this changes the flow for token storage:

1. **Authentication**: The user authenticates with the BFF.
1. **Server-side token management**: The BFF handles the entire token exchange.

   * It receives the user's refresh token and access token from the IdP.
   * It stores the sensitive refresh token securely on the server, for example, in a database or a secure cache. It’s never sent to the client.
   * The BFF handles all token expiration and renewal logic. When a token expires, the BFF silently uses the refresh token to get a new one. The client is unaware of this process.

1. **Client-side session**: Instead of giving the client a token, the BFF provides it with a secure session cookie. This cookie is used by the front end to authenticate with the BFF for subsequent requests.
1. **API requests**: When the client makes an API call to the BFF, the BFF validates the session cookie.

   * If the session is valid, the BFF retrieves the refresh token from its secure storage. If necessary, the BFF uses it to get a new access token from the IdP.
   * The BFF then uses this fresh access token to call the downstream service on behalf of the client.

1. **Token expiration and renewal**: If the access token has expired, the BFF automatically uses the stored refresh token to get a new access token from the IdP. The BFF then uses this new access token for the downstream API call. The client app is unaware of the token expiration and renewal flow.
1. **Secure sign-out**: The client's sign-out request triggers the BFF to destroy the session and call the Okta `/revoke` endpoint to invalidate the refresh token.

##### Benefits

* The client no longer needs to store any sensitive access or refresh tokens. The only thing that it needs to manage is a session cookie, which is secure by nature (with HttpOnly and secure flags). This eliminates the primary vulnerability of client-side token storage.
* The backend service handles the token storage. Store the refresh token in a highly secure, encrypted database or vault, with access to this storage strictly controlled. The access token is typically held in in-memory storage on the BFF server during a request. This is because it's only needed to call the downstream services.

##### Considerations

* Introducing a new server layer for each front end adds to overall infrastructure and maintenance overhead. This also impacts scalability, as this model requires all service requests to go to the backend first.
* Each request from the client now goes through an extra step (the BFF), which can introduce latency and reduce overall performance.

#### Demonstrating Proof of Possession model

[Demonstrating Proof of Possession](/docs/guides/dpop/oktaresourceserver/main/#overview) (DPoP) is an OAuth 2.0 security model that ties an access token to a specific client. This prevents a stolen token from being used by a different party. It's an enhancement to standard OAuth 2.0 and replaces Bearer tokens with a more secure, "proof-of-possession" model.

DPoP addresses the fundamental weakness of bearer tokens, which is that anyone who possesses the token can use it. With DPoP, only the legitimate client that originally requested the token can use it. This is achieved by creating a cryptographic link between the client and the token.

Here’s a simplified step-by-step breakdown of the process:

1. **Client-generated key pair**: The client (for example, a web app) generates a unique public/private key pair. It keeps the private key secret and sends the public key to the authorization server during the token request.
1. **Token issuance**: The authorization server receives the public key and issues a DPoP-bound access token and a refresh token. The access token's payload includes the public key's unique thumbprint, creating a direct link between the token and that specific key.
1. **Proof of possession**: When the client wants to use the access token to access a resource server, it performs two actions:

   * It sends the DPoP-bound access token.
   [[style="list-style-type:lower-alpha"]]
   * It bundles the HTTP request (including the request's URL and method) using its private key. This signature is sent in a DPoP header.
1. **Verification**: When the resource server receives a request, it first verifies the access token's validity. Then it uses the public key thumbprint from the token's payload to verify the signature in the DPoP header. If the signature is valid, it proves that the client is the legitimate possessor of the private key and, therefore, the token.
1. **Token expiration and renewal**: When the DPoP-bound access token expires, the client can use the refresh token to get a new access token using the DPoP header value from the initial token request.
1. **Secure sign-out flow**: The client should clear the private key and the access token from memory, and clear the refresh token. It also calls the `/revoke` endpoint to revoke the tokens and mark them as invalid in the server database.

##### Benefits

* Even if an attacker steals a DPoP-bound access token, they can't use it without the corresponding private key. They can't generate the required proof-of-possession signature, so the resource server rejects the request.
* DPoP provides an additional layer of cryptographic security that effectively neutralizes token theft attacks. If an attacker steals a token but doesn't have the private key, the stolen token is useless.
* DPoP is a client-level protocol. This means that its security benefits apply regardless of your backend architecture, so there’s no centralized point of failure.

##### Considerations

* Implementing DPoP requires the client (the web app) to manage a public/private key pair and perform cryptographic signing. This adds complexity to the client's code. However, Okta SDKs simplify the implementation of this model and provide an improved developer experience.
* The client needs a secure way to generate, store, and manage the private key. If the private key is compromised, the security of DPoP is defeated. The Okta [SDKs](/code/#sign-a-user-in-from-a-web-app) can handle this complexity.

The use of in-memory storage for access tokens and cookies for refresh tokens is a standard practice for apps. However, the BFF and DPoP models offer more protection against common threats like token theft and XSS. These models centralize security logic on a server or cryptographically bind tokens to a specific client.

### Sign-in models

There are different architectural approaches for user authentication. You can choose between hosted Okta solutions for simplicity and security (the redirect model) or building highly customized experiences with direct API integration (embedded model). This enables you to align your authentication flow with specific app requirements and branding needs.

#### Redirect sign-in model

Okta recommends using a federation-based model like OIDC, where the browser is [redirected](/docs/concepts/redirect-vs-embedded/#redirect-authentication) to an Okta-hosted sign-in page for apps.

##### Benefits

* This model supports the most common federated sign-in flows for OAuth 2.0 and OIDC and stays up to date with Okta features. It handles authentication policies (including MFA and IdP routing) and supports all Okta [authenticators](/docs/guides/authenticators-overview/main/). It simplifies initial integration and provides built-in self-service registration and account recovery flows. This model also allows for the easy introduction of passwordless methods through Okta policy changes without requiring you to modify your app code.
* Registering a custom domain URL for use with your Okta org is highly recommended. This unlocks full branding capabilities for the Okta-hosted sign-in page and simplifies integration for recreating tokens without prompting. It also facilitates the transition to using Okta sessions for consistent sign-in flows across multiple apps.
* Since this model is standards-based, it supports both web and native apps.

#### Embedded sign-in model

If you need a customized sign-in experience and don't want to use an Okta-hosted sign-in page, [direct authentication](/docs/guides/configure-direct-auth-grants/aotp/main/) is an option. This option, based on standards extended by Okta, directly validates the user without going through an intermediary app. Your app controls the look and feel of the sign-in experience, and you can specify which authentication factors your users can sign in with.

##### Benefits

* Allows the app to completely control the look and feel of the sign-in form and user experience, rather than relying on an Okta-hosted page.
* Use a direct authentication API to validate user credentials directly without an intermediary app. You can specify exactly which authentication factors (such as password, email, or phone) your users can employ for sign-in actions.

> **Note**: When you use a self-hosted sign-in form, ensure that your app stays synchronized with updates made to Okta authentication policies, factors, or account recovery settings.

For a detailed matrix of these options, see [Choose your auth](/docs/guides/sign-in-overview/main/#choose-your-auth).

### Related topics

* [Secure your first web app](/docs/journeys/OCI-secure-your-first-web-app/main/)
* [Understand the token lifecycle (exchange, refresh, revoke)](/docs/concepts/token-lifecycles/)
* [Sign users in overview](/docs/guides/sign-in-overview/main/)
* [Understand OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid/)
* [Understand Okta deployment models - redirect vs. embedded](/docs/concepts/redirect-vs-embedded/)
