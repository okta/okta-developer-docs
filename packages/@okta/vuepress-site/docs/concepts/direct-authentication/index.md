---
title: Direct authentication
meta:
  - name: description
    content: An overview of what direct authentication is and how you can use it.
---

# Direct authentication

<!-- Direct authentication simplifies the authentication flow, enhances user experience by minimizing redirects, and provides developers with greater control over security measures. -->
## What is Direct authentication

[Direct authentication](/docs/guides/configure-direct-auth-grants/aotp/main/) provides a set of authentication APIs. These APIs allow a client to directly verify authentication factors for a user in exchange for OAuth 2.0 tokens. The client does this without needing to interact with the Sign-In Widget in a browser.

This is useful for apps that need more control over the authentication flow than can be provided through the Sign-In Widget and non-browser apps. Non-browser apps like native apps can't always pop up a browser for authentication or if they can, it creates a negative user experience.

### Provides more control

Direct authentication gives you more control over the authentication process. This is achieved by letting the client dictate which factor verifications it obtains from the user. The client then sends those factor verifications to the direct authentication APIs.

The app's sign-on policy must still be satisfied before tokens are returned. But, the client can decide which factors it wants to authenticate with and in what order. Keep in mind that this also places a greater responsibility on the client to know how to satisfy the app's assurance requirements.

## Key characteristics

Direct authentication stands apart from traditional methods in the following ways:

* **Client-initiated credential exchange**: The client app directly sends user credentials (for example, username/password, OTPs, and Okta Verify prompts) to the authorization server's `/token` endpoint.
* **API-centric**: Authentication is performed using RESTful APIs, not through a browser form like the Sign-In Widget.
* **Browserless**: There's no need to authenticate through a front-channel browser flow. This keeps the user within the app's context.

## How it Works

At a high level, the direct auth flow has the following steps:

1. Your client app prompts the user for a username and any factor verifications of its choosing.
2. The user enters their credentials in the app (for example, mobile app, web form).
3. Your app builds the API request that contains these credentials and sends it directly to the Okta  `/token` endpoint.

    **Note**: This is a high-level example. There are other requests and responses that can occur between your app, the user, and Okta. This depends on the types of authenticators that you configure. See [Configure Direct Authentication](/docs/guides/configure-direct-auth-grants/aotp/main/) for example authenticator flows that Okta supports.

4. Okta receives the request and validates the credentials. If validation is successful and the app's assurance requirements are met, Okta generates and returns an access token to your app. Otherwise, Okta responds stating that more assurance is required.
5. Your app securely stores the token and uses it for subsequent authenticated API requests to Okta.

## Disadvantages and considerations

* **Increased security responsibility**: The client app and backend service bear more direct responsibility for secure credential handling (storage and transmission).
* **Complexity**: The extra control given to the client comes at the cost of more complexity for the client. With other authentication flows, Okta drives the flow based on policy requirements until the user is authenticated. With direct authentication, the client decides how to authenticate the user. But, the client must know how to authenticate the user in a way that satisfies the app's requirements.
* **Unsupported factors**: Not all authenticator types supported by Okta are currently supported for direct authentication. See [Configure Direct Authentication](/docs/guides/configure-direct-auth-grants/aotp/main/) for the authenticators that Okta supports. Select the dropdown list on the right side of the page to select the different authenticators supported.
* **Compliance**: Direct authentication may require careful consideration of compliance with various security and privacy regulations (for example, GDPR, HIPAA) regarding direct credential handling.

## Security best practices

Implementing direct authentication requires strict adherence to security best practices to mitigate inherent risks:

* **Secure credential storage**: Never store raw passwords on the client-side. Use secure methods for storing tokens (for example, platform-specific secure storage).
* **Rate limiting and account lockout**: Implement mechanisms to prevent brute-force attacks and credential stuffing.
* **Token security**: Use short-lived access tokens, implement refresh tokens, and ensure secure token invalidation.
* **Token validation**: Strictly validate all input received from the client to prevent injection attacks.
* **Auditing and logging**: Maintain comprehensive audit logs of all authentication attempts.

## Conclusion

Direct authentication offers a powerful approach to optimizing the user sign-in experience for specific application contexts that prioritizes client control and minimizing browser interactions. While it provides significant advantages in terms of control, it also places a greater responsibility on developers to implement robust security measures.
