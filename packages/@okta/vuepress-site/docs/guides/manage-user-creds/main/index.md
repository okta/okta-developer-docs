---
title: Credential management using the Okta Client SDK
meta:
  - name: description
    content: Learn about how to securely manage user credentials using the Okta Client SDK.
---

Securely manage your tokens using the Okta Client SDK, which provides a robust token management system designed to handle complex scenarios.

---

#### Learning outcomes

* Store credentials.
* Retrieve and work with credentials, including the default credential.
* Refresh user tokens.
* Remove credentials.

#### What you need

[The Okta Client SDK configured for your app](link to SDK)

---

## Overview

The primary goal of using authentication APIs is to receive credentials that allow your users to interact with your app. If you don’t have some way to save and retrieve those credentials for later use, your users need to sign in to your app every time.

After the user (or other identity) is authenticated within an app, you must manage the token's lifecycle:

* Store it in a secure manner.
* Use it to perform requests on behalf of the user.
* Ensure that it's correctly refreshed as required.
* Remove it after reaching expiration or a direct deletion request.

The Okta Client SDK provides a robust token management system designed to handle complex scenarios, such as multi-threaded access and data race conditions. This allows you to focus on your app's features rather than building a complex token management system from scratch.

### Okta Client SDK design principles

The Okta Client SDKs are designed as a modular library ecosystem to ensure architectural, naming, and feature parity across multiple languages, for example, Swift, Kotlin/Java, TypeScript/JavaScript, and .NET. It covers environments such as mobile, CLI, web, or backend.

* Abstraction: The SDK abstracts the complexities of OAuth 2.0 authentication flows, allowing you to focus on your UI rather than intricate business logic.
* Consistent interfaces: Authentication flows conform to common interfaces, for example, `start()` and `resume()` to simplify use, even for complex multi-step authentication.
* Token management system: The SDK provides a central token management system to simplify the secure storage, retrieval, validation, and lifecycle management of user credentials, handling multi-threaded access and biometrics requirements. This system aims to prevent issues like data race conditions during asynchronous operations.
* Extensibility: The SDK allows for customization of parameters, for example, `additionalParameters` as `[String: String]` dictionaries at various points in the authentication workflow, ensuring compatibility across different request body types.

## Core components of the token management system

The SDK's token management system is built on several key components that work together to provide a seamless and secure developer experience.

* `Credential`: This is the main convenience class for interacting with tokens. It acts as a runtime wrapper for a `Token` object, exposing simplified methods for the entire token lifecycle. Each `Credential` instance is uniquely tied to a corresponding `Token`.
* `Token`: An immutable data object representing the full set of OAuth 2.0 tokens (access token, refresh token, ID token) received from the authorization server. This object persists across app launches to keep your user signed in.
* `TokenStorage`: An interface responsible for the secure Create, Read, Update, and Delete (CRUD) operations of `Token` objects.
* `CredentialDataSource`: A factory that creates and caches `Credential` instances, ensuring that only one unique instance exists at runtime for any given `Token`.
* `CredentialCoordinator`: The central orchestrator that manages interactions between all of the above components to ensure data consistency.

## Store credentials

After a user successfully signs in, you receive a `Token` object. The first step is to securely store it:

* How it works: Use the static `Credential.store()` function. This saves the token using the configured TokenStorage mechanism and returns a `Credential` object for you to work with.
* Developer-assigned tags: You can add optional tags (metadata) during storage. These tags are useful for querying and managing multiple credentials later. For example, you could tag tokens based on user roles or the service they are for.

### JavaScript example: Store a token

```javascript
    // Assume 'newToken' is a Token object received after a successful user sign in
    try {
    // Store the token with an optional tag
      const credential = await Credential.store(newToken, ['service:purchase']);
    // The 'credential' object now represents the user's stored session.
      console.log('Credential stored successfully with ID:', credential.id);
    } catch (error) {
    // Handle storage error
      console.error('Failed to store credential:', error);
    }
```

## Retrieve and work with credentials

After storing the token, you need to retrieve credentials to maintain user sessions and authorize API requests. The SDK offers several convenient methods for this.

### Work with the default credential

For most single-user apps, you simplify the development process significantly by working with a "default" credential:

* The default can either be explicitly set or implicitly assigned when the first token is stored.
* Use the `Credential.getDefault()` static method to easily access the default credential, for example, to check if a user is already signed in when the app starts.
* The `Credential` class sends an event (for example, `default_changed`) whenever the default credential is set or removed. You can listen for this event to dynamically update your UI, such as transitioning from a sign-in page to a signed-in view.

#### JavaScript example: Check for a default user on app load

```javascript
    // On app launch, check for a default credential
    const credential = await Credential.getDefault();

    if (credential) {
    // User is signed in. Proceed to the main app view.
        showUserProfile(credential);
    } else {
    // No default user. Show the sign-in page.
        showLoginScreen();
    }

    // Listen for changes to the default credential
    Credential.on('default_changed', async ({ id }) => {
        if (id === null) {
            console.log('User signed out, default credential removed.');
    // Update UI to show signed-out state
        } else {
            const newCredential = await Credential.with(id);
            console.log('Default credential has changed to:', newCredential?.id);
    // Update UI with new user info
        }
    });
```

## Manage multiple credentials

The SDK is designed to support multi-user scenarios by allowing you to store and query multiple credentials simultaneously.

You can retrieve specific credentials using one of the following examples:

* Unique ID: Every stored token is assigned a locally generated unique ID. Use `Credential.with(id)` to fetch a specific credential. You can get a list of all stored IDs through the `Credential.allIDs()` function.
* Developer tags: Use `Credential.find({ tags: '...' })` to find credentials that match the tags that you assigned during token storage.
* ID token claims: You can also query credentials based on the claims within the ID token, such as the user's email (`sub`).

### JavaScript example: Find credentials

```javascript
    // Find a credential using a tag
    const purchaseCredentials = await Credential.find({ tags: 'service:purchase' });

    if (purchaseCredentials.length > 0) {
        const purchaseCredential = purchaseCredentials[0];
        // Use the credential for a purchase API call
    }

    // Find all credentials for a specific user using an ID token claim
    const userCredentials = await Credential.find(
        metadata => metadata.claims?.sub === 'jane.doe@example.com'
    );
```

## Refresh user tokens

Access tokens are short-lived for security reasons. The SDK simplifies the process of using long-lived refresh tokens to get new access tokens without requiring the user to sign in again.

* `refresh()`: Immediately refreshes the token.
* `refreshIfNeeded()`: A smarter function that only refreshes the token if it has expired or is about to expire within a predefined grace interval. This is the recommended approach for proactively managing token expiration before making an API call.

### JavaScript example: Refresh a token before an API call

```javascript
    async function makeAuthenticatedApiRequest(credential, url, data) {
        try {
            // Proactively refresh the token if it's close to expiring
            await credential.refreshIfNeeded();

            // Now, use the access token to authorize the request
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${credential.token.accessToken}`
                },
                body: JSON.stringify(data),
                method: 'POST'
            });
            return response.json();

        } catch (error) {
            console.error('API request failed. User may need to re-authenticate.', error);
            // If refresh fails (for example, refresh token is invalid), redirect the user to sign in
            showLoginScreen();
        }
    }
```

## Remove credentials

When a user signs out or a session needs to be terminated, it's critical to properly remove the credentials from both the client and the server.

* `revoke()`: This function uses the Okta [revocation endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/revokeCustomAS) to invalidate the tokens on the authorization server. If successful, it automatically removes the credential from local storage. By default, this function revokes both the access and refresh tokens. This is the most secure way to sign a user out.
* `remove()`: This function only deletes the credential from the client-side `TokenStorage`. It doesn't invalidate the tokens on the server, and therefore poses a security risk if the tokens were compromised. Use this with caution.
* `SessionLogoutFlow()` or `signOut()`: For browser-based flows that create an Okta session cookie, you may need a specific sign-out function to clear the server-side session cookies in addition to revoking tokens.

### JavaScript example: Secure sign out

```javascript
    async function handleSignOut(credential) {
        try {
            // Revoke both access and refresh tokens on the server
            await credential.revoke();
            console.log('User signed out and tokens revoked.');

            // The credential is also automatically removed from local storage
            // Now, redirect to the sign-in page
            redirectTo('/signin');

        } catch (error) {
            console.error('Error during sign-out:', error);
            // Even if server revocation fails, ensure that local state is cleared and redirect
            await credential.remove(); // Failsafe local removal
            redirectTo('/signin');
        }
    }
```

## Best practices

Use the following key recommendations for secure token management:

* Always use the [Authorization Code Flow with PKCE](/docs/guides/implement-grant-type/authcodepkce/main/).
* Use [short-lived access tokens](/docs/guides/oie-embedded-common-refresh-tokens/-/main/).
* Use and rotate [refresh tokens](/docs/guides/refresh-tokens/main/#refresh-token-rotation).
* Implement robust XSS and CSRF protections.
* Always [revoke tokens](/docs/guides/revoke-tokens/main/) when a user signs out.
* Register a [custom domain URL for your Okta org](/docs/guides/custom-url-domain/main/) to unlock branding capabilities and simplify session management.
* To mitigate risk and ensure proper access token use:
  * Configure APIs with specific [authorization server](/docs/guides/customize-authz-server/main/) audiences, for example, `api.company.com/product1` instead of the base `api.company.com`.
  * Use [granular scopes](/docs/guides/customize-authz-server/main/#create-scopes), for example, `com.okta.product1.admin` instead of a generic administrator scope.
