---
title: Manage user credentials for your apps
meta:
  - name: description
    content: An overview of managing user credentials for your apps
---

# Manage user credentials for your apps

## Terminology

User credentials are the data or information that a user provides to verify their identity. Credentials can be broken down into three categories:

* Something the user knows: This is a memorized secret, such as a PIN, or a username and password.
* Something the user has: A physical or digital object in their possession. For example, a one-time passcode sent through SMS, or a code from an authenticator app, such as Okta Verify.
* Something the user is: A unique biometric identifier, such as a fingerprint or a facial scan.

An [authenticator](/docs/guides/authenticators-overview/main/) is the mechanism for the user to present their credentials to the identity provider (IdP) for verification. For example, a user might use a smart phone with an authenticator app or a biometric fingerprint reader.

Okta uses [OAuth 2.0](/docs/concepts/oauth-openid/#oauth-2-0) and [OpenID Connect](/docs/concepts/oauth-openid/#openid-connect) (OIDC) as the foundational standards for how it issues and manages user tokens. These protocols define how authentication and authorization are handled within your apps. For a detailed conceptual breakdown of OAuth 2.0 and OpenID Connect, see the [OAuth 2.0 and OpenID Connect overview](/docs/concepts/oauth-openid/).

Tokens are digital credentials issued by the IdP. They contain information about the user's identity and grant access to a resource or service without requiring the user to re-enter their credentials:

* The [ID token](/docs/concepts/token-lifecycles/#id-tokens) is a JSON Web Token (JWT) granted by the OIDC provider. It serves to prove a user's identity and contains claims about the authenticated user, such as their name, email, or a unique identifier. This token is primarily intended for the client app to identify the user.
* The [access token](/docs/concepts/token-lifecycles/#access-tokens) is used to interact with protected APIs and resources as a "Bearer token" when making API requests. [Authorization servers](/docs/concepts/auth-servers/) issue tokens.
* [Refresh tokens](/docs/guides/refresh-tokens/main/) are opaque tokens used to obtain new ID and access tokens without requiring the user to reauthenticate. These tokens are crucial for maintaining user sessions with minimal impact to the user experience.

For a detailed description of the different types of tokens, see [Understand the token lifecycle (exchange, refresh, revoke)](/docs/concepts/token-lifecycles/).

An [authorization server](/docs/concepts/auth-servers/) mints OpenID Connect (OIDC) or OAuth 2.0 tokens. It applies access policies that determine who can be issued a token and what scopes that token can have. Conversely, the resource server applies access policies to decide which tokens and scopes it accepts in exchange for access to specific resources.

Okta supports two types of authorization servers:

* The [org authorization server](/docs/concepts/auth-servers/#org-authorization-server) is built in and supports simple SSO for OIDC apps or for obtaining access tokens for Okta APIs. It doesn't support custom scopes, claims, or policies.
* A [custom authorization server](/docs/concepts/auth-servers/#custom-authorization-server) allows you to create and apply authorization policies to secure your own APIs. You can also define custom scopes and claims, and integrate with API gateways. It's recommended to assign one authorization server per API product to maintain separate policies and token expiration times, and to prevent scope name collisions.

## Why secure token management is critical

Securely managing your tokens is essential to mitigate risks that directly threaten the protection of user data, such as token theft and account takeover.

Risk areas include:

* Compromised user identity and data: If unauthorized parties access tokens, a user's identity could be compromised. Without proper management, token leakage can pose a significant risk to user data. However, OAuth 2.0 tokens used for authorizing API requests are short-lived. You can configure them to expire after a specific duration, which reduces the window of opportunity for attackers to misuse them. In contrast, using passwords directly can remain valid indefinitely unless explicitly changed.
* Vulnerabilities in web environments: Web browsers introduce unique security challenges, particularly from Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) vulnerabilities.
  * XSS attacks involve malicious scripts running inside your app. These scripts can execute any potential actions that your app can perform. Frequently, attackers use XSS to steal authentication tokens stored in the browser.
  * CSRF allows attackers to trick an authenticated browser into making unintended requests.
* Concurrency issues: Managing tokens involves storage, retrieval, and refresh operations. In complex apps, especially during initialization or with concurrent operations, multiple calls to token storage can lead to shared resource contention.
* Lack of granular control and scope restrictions: If tokens aren't scoped appropriately, any security compromise can lead to broader unauthorized access to resources, increasing the potential damage. Defining granular and specific scopes within authorization servers is a best practice.
* Insecure token transmission: All interactions and redirects involving users, apps, and Okta must be secured through HTTPS (SSL/TLS) connections to protect credentials and tokens from interception. Pass access tokens exclusively through an HTTP Authorization header. Also, never encode tokens into a payload or URL, as these could be logged or cached.
<!-- [For later: The Okta Client SDK's token management system is designed to mitigate these issues and ensure app stability.] -->

### Token lifecycle

* Lifetime: Tokens from the Okta org authorization server have fixed lifetimes:
  * ID token: 60 minutes
  * Access token: 60 minutes
  * Refresh token: 90 days
  A custom authorization server allows configurable lifetimes for access tokens (5 minutes to 24 hours). It also allows configurable lifetimes for refresh tokens (minimum 10 minutes idle up to a maximum of 5 years). However, ID tokens remain set at 60 minutes.
* Expiration and renewal: Refreshing expired access tokens is a balancing act between security and scalability. Shorter access token lifetimes are a strong security practice that limit the window of opportunity for attackers to use a compromised token. This increased security comes at the cost of requiring more frequent token refresh requests, which can create a scalability challenge for the identity provider (IdP). A refresh token is optional but recommended as they make it more functional to have access tokens with shorter lifetimes.
* Revocation: When a token is no longer needed (for example, during sign-out), it's crucial to revoke it on the server using the Okta revocation endpoint. This is in addition to clearing it from the client. Revocation of a token can also happen implicitly due to user deactivation, client app changes, or configuration changes of the authorization server.
* Validation: You can validate access tokens either locally (by verifying the JWT signature using JWKS public keys) or through introspection endpoints provided by your custom authorization server. Okta recommends using dynamic retrieval and caching of JWKS for performance, with periodic checks for updates and a failsafe for rapid key regeneration.

## Manage the user credential lifecycle

For apps, the choice of token storage strategy and sign-in model significantly impacts security and user experience.

### Token storage

There are several models that you can use to manage tokens in your app:

* Front channel OAuth model
* Backend For Frontend (BFF)
* Demonstrating Proof of Possession (DPoP)

The optimal choice depends on the required levels of access control and the desired scalability of your app.

#### Front channel OAuth model

In a front-channel OAuth model, the app handles all authentication directly, and security tokens are stored in cookies, browser storage, or computer memory.

In this model, the token lifecycle is as follows:

1. Authenticate: The user enters their credentials (such as a username and password) or uses social sign-in. The app uses a client-side library to interact with an identity provider (IdP) to get a security token.
1. Store tokens after sign-in: After a user successfully authenticates, the app receives a security token. The token can be stored in browser storage (local storage or session storage) or in-memory (as a JavaScript variable).
1. Retrieve tokens for API requests: The client retrieves the token from memory and attaches it as a Bearer token in the Authorization header for API requests.
1. Handle token expiration and renewal: When an access token expires, the client uses the refresh token to request a new access token from the authorization server. This happens transparently to the user, allowing for a continuous session.
1. Secure sign-out: You must clear both the client-side tokens and the server-side refresh token. The app must also call the revocation endpoint to invalidate the refresh token on the server.

Storing tokens using in-memory storage or a secure data vault offers a higher degree of security against XSS attacks. However, this model is vulnerable to client-side attacks like XSS and token theft. This is why developers now replace it with more secure token storage strategies.

#### Backend for frontend model

The [Backend for Frontend (BFF)](https://auth0.com/blog/the-backend-for-frontend-pattern-bff/#The-Backend-For-Frontend-Pattern) model is another approach to handle token storage and security, as it fundamentally changes where sensitive tokens are managed. Instead of storing tokens directly in the browser, the BFF pattern shifts responsibility to a dedicated server layer. This greatly simplifies the client's role.

In the front-channel model, the client can talk directly to multiple client services. However, with BFF, the front-end client only ever talks to the BFF, a single, purpose-built backend service. The BFF then handles all communication with the other backend services, including the identity provider. This model centralizes all token management on a single, trusted server, reducing the attack surface and making the entire system more resilient to client-side attacks.

Here's how this changes the flow for token storage:

1. Authentication: The user authenticates with the BFF.
1. Server-side token management: The BFF handles the entire token exchange.

   * It receives the user's refresh token and access token from the identity provider.
   * It stores the sensitive refresh token securely on the server, for example, in a database or a secure cache. It’s never sent to the client.
   * The BFF handles all token expiration and renewal logic. When a token expires, the BFF silently uses the refresh token to get a new one. The client is unaware of this process.

1. Client-side session: Instead of giving the client a token, the BFF provides it with a secure session cookie. This cookie is used by the front end to authenticate with the BFF for subsequent requests.
1. API requests: When the client makes an API call to the BFF, the BFF validates the session cookie.

   * If the session is valid, the BFF retrieves the refresh token from its secure storage. If necessary, the BFF uses it to get a new access token from the identity provider.
   * The BFF then uses this fresh access token to call the downstream service on behalf of the client.

1. Token expiration and renewal: If the access token has expired, the BFF automatically uses the stored refresh token to get a new access token from the IdP. The BFF then uses this new access token for the downstream API call. The client app is unaware of the token expiration and renewal flow.
1. Secure sign-out: The client's sign-out request triggers the BFF to destroy the session and call the Okta revocation endpoint to invalidate the refresh token.

##### Benefits

* The client no longer needs to store any sensitive access or refresh tokens. The only thing that it needs to manage is a session cookie, which is secure by nature (with HttpOnly and Secure flags). This eliminates the primary vulnerability of client-side token storage.
* The backend service handles the token storage. Store the refresh token in a highly secure, encrypted database or vault, with access to this storage strictly controlled. The access token is typically held in in-memory storage on the BFF server during a request, because it's only needed to call the downstream services.

##### Considerations

* Introducing a new server layer for each front end adds to overall infrastructure and maintenance overhead. This also impacts scalability, as this model requires all service requests to go to the backend first.
* Each request from the client now goes through an extra step (the BFF), which can introduce latency and reduce overall performance.

#### Demonstrating Proof of Possession model

[Demonstrating Proof of Possession](/docs/guides/dpop/oktaresourceserver/main/#overview) (DPoP) is an OAuth 2.0 security model that ties an access token to a specific client. This prevents a stolen token from being used by a different party. It's an enhancement to standard OAuth 2.0 and replaces Bearer tokens with a more secure, "proof-of-possession" model.

DPoP addresses the fundamental weakness of bearer tokens, which is that anyone who possesses the token can use it. With DPoP, only the legitimate client that originally requested the token can use it. This is achieved by creating a cryptographic link between the client and the token.

Here’s a simplified step-by-step breakdown of the process:

1. Client-generated key pair: The client (for example, a web app) generates a unique public/private key pair. It keeps the private key secret and sends the public key to the authorization server during the token request.
1. Token issuance: The authorization server receives the public key and issues a DPoP-bound access token and a refresh token. The access token's payload includes the public key's unique thumbprint, creating a direct link between the token and that specific key.
1. Proof of possession: When the client wants to use the access token to access a resource server, it performs two actions:

   * It sends the DPoP-bound access token.
   [[style="list-style-type:lower-alpha"]]
   * It bundles the HTTP request (including the request's URL and method) using its private key. This signature is sent in a DPoP header.
1. Verification: When the resource server receives a request, it first verifies the access token's validity. Then, it uses the public key thumbprint from the token's payload to verify the signature in the DPoP header. If the signature is valid, it proves that the client is the legitimate possessor of the private key and, therefore, the token.
1. Token expiration and renewal: When the DPoP-bound access token expires, the client can use the refresh token to get a new access token using the key pair from the initial token request.
1. Secure sign-out: The client should clear the private key and the access token from memory, and clear the refresh token. It also calls the revocation endpoint to revoke the tokens and mark them as invalid in the server database.

##### Benefits

* Even if an attacker steals a DPoP-bound access token, they can't use it without the corresponding private key. They can't generate the required proof-of-possession signature, so the resource server rejects the request.
* DPoP provides an additional layer of cryptographic security that effectively neutralizes token theft attacks. If an attacker steals a token but doesn't have the private key, the stolen token is useless.
* DPoP is a client-level protocol. This means its security benefits apply regardless of your backend architecture, so there’s no centralized point of failure.

##### Considerations

* Implementing DPoP requires the client (the web app) to manage a public/private key pair and perform cryptographic signing. This adds complexity to the client's code. However, Okta SDKs simplify the implementation of this model and provide an improved developer experience.
* The client needs a secure way to generate, store, and manage the private key. If the private key is compromised, the security of DPoP is defeated. Again, The Okta [SDKs](/code/#sign-a-user-in-from-a-web-app) can handle this complexity.

While using in-memory storage for access tokens and cookies for refresh tokens is a standard practice for apps, the BFF and DPoP models offer more robust protection against common threats like token theft and XSS. These models centralize security logic on a server or cryptographically bind tokens to a specific client.

### Sign-in models

There are different architectural approaches for user authentication. You can choose between hosted Okta solutions for simplicity and security (the redirect model) or building highly customized experiences with direct API integration (embedded model). This enables you to align your authentication flow with specific app requirements and branding needs.

#### Redirect sign-in model

Okta recommends using a federation-based model like [OIDC](https://developer.okta.com/docs/concepts/oauth-openid/), where the end-user's browser is [redirected](/docs/concepts/redirect-vs-embedded/#redirect-authentication) to an Okta-hosted sign-in page for apps.

##### Benefits

* This model supports the most common federated sign-in flows for OAuth 2.0 and OIDC and stays up to date with Okta features. It handles authentication policies (including MFA and identity provider routing) and supports all Okta authenticators. It simplifies initial integration and provides built-in self-service registration and account recovery flows. This model also allows for the easy introduction of passwordless methods through Okta policy changes without requiring you to modify your app code.
* Registering a custom domain URL for use with your Okta org is highly recommended. This unlocks full branding capabilities for the Okta-hosted sign-in page and simplifies integration for recreating tokens without prompting. IT also facilitates the transition to using Okta sessions for consistent sign-in flows across multiple apps.
* Since this model is standards-based, it supports both web and native apps.

#### Embedded sign-in model

If you need a customized sign-in experience and don't want to use an Okta-hosted sign-in page, a direct authentication API is an option. This API option, based on standards extended by Okta, directly validates the user without going through an intermediary app. Your app controls the look and feel of the sign-in experience, and you can specify which authentication factors your users can sign in with.

##### Benefits

* This model allows the app to completely control the look and feel of the sign-in form and user experience, rather than relying on an Okta-hosted page.
* Use a direct authentication API to validate user credentials directly without an intermediary app. You can specify exactly which authentication factors (such as password, email, or phone) your users can employ for sign-in actions.

Note that when using a self-hosted sign-in form, ensure that your app's implementation stays synchronized with any changes made to Okta authentication policies, factors, or account recovery settings.

For a detailed matrix of these options, see [Choose your auth](/docs/guides/sign-in-overview/main/#choose-your-auth).

### Related documentation

* [Secure your first web app](/docs/journeys/OCI-secure-your-first-web-app/main/)
* [Understand the token lifecycle (exchange, refresh, revoke)](/docs/concepts/token-lifecycles/)
* [Sign users in overview](/docs/guides/sign-in-overview/main/)
* [OAuth 2.0 and OpenID Connect overview](/docs/concepts/oauth-openid/)
* [Okta deployment models - redirect vs. embedded](/docs/concepts/redirect-vs-embedded/)
