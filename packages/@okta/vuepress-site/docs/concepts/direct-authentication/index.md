---
title: Direct authentication
meta:
  - name: description
    content: An overview of what direct authentication is and how you can use it.
---

# Direct authentication

<!-- Direct authentication simplifies the authentication flow, enhances user experience by minimizing redirects, and provides developers with greater control over security measures. -->
## What is Direct authentication

[Direct authentication](/docs/guides/configure-direct-auth-grants/aotp/main/) is an authentication method that allows users to directly exchange their credentials (such as usernames and passwords) with an app or service without the need for intermediary identity providers or complex redirection flows.

In direct authentication, the client app communicates directly with the authentication service to validate user credentials. This method is useful in scenarios where usability constraints hinder the use of browser-based flows, such as with mobile apps. In addition, it's beneficial in situations where speed and simplicity are important, such as with single-page applications (SPAs). By eliminating the need for redirects to external identity providers, direct authentication reduces latency and enhances the overall user experience.

### Provides more control

Direct auth gives you more control over the authentication process by handling authentication internally in your app. You can tailor security measures to your needs without relying on third-party providers. Keep in mind that this also places a greater responsibility on you to ensure the secure handling of user credentials. Use direct authentication only in situations where there's a high degree of trust between the user and your app.

## Key Characteristics

Direct authentication stands apart from traditional methods due to several defining characteristics that streamline the user experience and simplify implementation in specific scenarios:

* **Client-initiated credential exchange**: The client app directly sends user credentials (for example, username/password, API key, token) to the service's authentication endpoint.
* **API-centric**: Authentication is typically performed using RESTful APIs.
* **Minimal redirection**: The need for browser redirects to IdPs is reduced or eliminated. This keeps the user within the app's context.
* **Direct response**: The authentication service directly responds to the client with an authentication token (for example, JWT or OAuth token) upon successful validation.
* **Enhanced user experience**: The sign-in experience is faster, more fluid, and less disruptive.

## How it Works

At a high level, the direct auth flow has the following steps:

1. Your client app prompts the user for their credentials (username and password) and then with an authenticator, if required.
2. The user enters their credentials in the app (for example, mobile app, web form), and then addresses an authenticator prompt in the app, if required.
3. Your app builds the API request that contains these credentials and sends it directly to the Okta  `/token` endpoint.

    **Note**: This is a high-level example. There are other requests and responses that can occur between your app, the user, and Okta. This depends on the types of authenticators that you configure. See [Configure Direct Authentication](/docs/guides/configure-direct-auth-grants/aotp/main/) for example authenticator flows that Okta supports.

4. Okta receives the request and validates the credentials. If validation is successful, Okta generates and returns an access token to your app.
5. Your app securely stores the token and uses it for subsequent authenticated API requests to Okta.

### Comparison with traditional authentication methods

Direct authentication differs from traditional authentication methods in ways:

**User experience**:

* **Direct authentication**: Provides a seamless experience by allowing users to enter their credentials directly within the app, minimizing redirection and interruptions
* **Traditional authentication**: Often involves multiple redirects to identity providers, which can disrupt the user experience and lead to longer sign-in times

**Complexity**:

* **Direct authentication**: Simplifies the authentication flow by eliminating the need for intermediary identity providers, making it easier to implement in certain contexts
* **Traditional authentication**: Typically requires more complex setups, including managing multiple identity providers and handling various protocols

**Control**:

* **Direct authentication**: Offers developers greater control over the authentication process, allowing for customization of security measures and user interfaces
* **Traditional Authentication**: Relies on third-party identity providers, which can limit control over the authentication experience and security practices

**Security responsibility**:

* **Direct authentication**: Places the responsibility of security on app developers, who must ensure secure handling of user credentials
* **Traditional authentication**: Distributes security responsibilities across multiple identity providers, potentially reducing the burden on individual apps

**Latency**:

* **Direct authentication**: Reduces latency by eliminating the need for network hops associated with redirects to identity providers
* **Traditional authentication**: Can introduce delays due to the multiple steps involved in redirecting to and from identity providers

**Use cases**:

* **Direct authentication**: Best suited for apps where speed and simplicity are critical, such as mobile apps and single-page apps
* **Traditional authentication**: More appropriate for scenarios that require federated identity management and Single Sign-On (SSO) capabilities across multiple apps

## Disadvantages and considerations

* **Increased security responsibility**: The client app and backend service bear more direct responsibility for secure credential handling (storage, transmission, validation).
* **Credential exposure risk**: If not implemented carefully, direct transmission of credentials can increase the risk of interception or compromise. Strong encryption (TLS/SSL) is mandatory.
* **Complexity for federation**: Less suitable for scenarios requiring complex federated identity management across multiple distinct services or organizations.
* **Lack of SSO (Out-of-the-Box**): Doesn't inherently provide SSO across disparate apps without more customization.
* **Compliance**: May require careful consideration of compliance with various security and privacy regulations (for example, GDPR, HIPAA) regarding direct credential handling.

## Security best practices

Implementing direct authentication requires strict adherence to security best practices to mitigate inherent risks:

* **Always use HTTPS/TLS**: Encrypt all communication between the client and Okta.
* **Secure credential storage**: Never store raw passwords on the client-side. Use secure methods for storing tokens (for example, platform-specific secure storage).
* **Hashing passwords**: Store user passwords on the server using strong, industry-standard hashing algorithms.
* **Rate limiting and account lockout**: Implement mechanisms to prevent brute-force attacks and credential stuffing.
* **Token security**: Use short-lived access tokens, implement refresh tokens, and ensure secure token invalidation.
* **Input validation**: Strictly validate all input received from the client to prevent injection attacks.
* **Auditing and logging**: Maintain comprehensive audit logs of all authentication attempts.

## Conclusion

Direct authentication offers a powerful approach to optimizing the user sign-in experience for specific application contexts that prioritizes speed and simplicity. While it provides significant advantages in terms of user experience and control, it also places a greater responsibility on developers to implement robust security measures. When carefully designed and implemented with a strong focus on security, direct authentication is a highly effective and preferred method for seamless user access.

See also
