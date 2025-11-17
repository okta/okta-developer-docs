
<ApiLifecycle access="ie" />

This guide describes how to sign a user out using the [Okta Mobile Swift SDK](https://github.com/okta/okta-mobile-swift).

> **Note:** If you are using the Okta IDX Swift SDK, it's deprecated. Migrate to the Okta Mobile Swift SDK, see [For existing users](https://github.com/okta/okta-idx-swift?tab=readme-ov-file#for-existing-users).

---

#### Learning outcomes

* Implement a reliable, user-initiated sign-out.
* End the Okta browser session (SSO cookies) if your app uses a browser-based sign-in.

#### What you need

* An app that uses the [Okta Mobile Swift SDK](https://github.com/okta/okta-mobile-swift)
* One of the following combinations:
  * Redirect sign-in: [AuthFoundation](https://okta.github.io/okta-mobile-swift/development/documentation/authfoundation/) and [BrowserSignin](https://okta.github.io/okta-mobile-swift/development/documentation/browsersignin/)
  * Direct password-in-app sign-in: [AuthFoundation](https://okta.github.io/okta-mobile-swift/development/documentation/authfoundation/) and [OktaDirectAuth](https://okta.github.io/okta-mobile-swift/development/documentation/oktadirectauth/)

---

## About user sign-out

You can sign a user out of your app by revoking their tokens or deleting their credentials. See [Implement token cleanup]().

Also, if you have an active Okta browser session, you need to end the session. See [End the Okta browser session]().

### Best practices and considerations

* **Do both when applicable:** Local token cleanup and browser end-session are separate concerns. Handle both for a complete sign-out.
* **Revoke before remove:** Always attempt `revoke()` before `remove()`. If the revoke fails, you should still still remove the token to ensure that sign out occurs.
* **Multiple accounts:** If your app supports multiple profiles/tenants, iterate over all credentials during sign-out.
* **Logout redirect URI:** If you call browser sign-out, ensure that `logout_redirect_uri` is configured in `Okta.plist` and your URL scheme handler is implemented.
* **Handle errors gracefully:** Network errors can occur when revoking tokens. Consider falling back to local deletion if revocation fails.
* **Clear app state:** After signing out, ensure you clear any cached user data and reset your app's UI state.
* **Background operations:** Token revocation is an async operation. Ensure that you handle it appropriately in your UI flow to avoid blocking the user experience.

## Implement token cleanup

The new SDK provides several methods to sign a user out of your app, depending on your use case:

* `Credential.remove()`: Clears the in-memory reference to the token and removes it from storage. The credential can no longer be used.
  > **Note:** Doesn’t revoke the token from the authorization server.
* `Credential.revoke()`: Revokes all available tokens from the Authorization Server.
  > **Note:** Doesn’t remove the token from memory or storage.
* `Credential.revoke(type:)`: Revokes a specific token type (access token, refresh token, or device secret) from the Authorization Server.
  > **Notes:**
  > * Doesn’t remove the token from memory or storage.
  > * If you revoke an access token, the associated refresh token or device secret isn’t revoked.
  > * If you revoke a refresh token, the associated access token is revoked.

When implementing your code, keep in mind the following:

* **Revoke before remove:** Always attempt `revoke()` before `remove()`. If the revoke fails, you should still still remove the token to ensure that sign out occurs.
* **Multiple accounts:** If your app supports multiple profiles/tenants, iterate over all credentials during sign-out.

### Example token cleanup code

The following code example shows you how to implement local token clean-up as part of the user sign-out flow:

```swift
import AuthFoundation

@MainActor
func signOutLocally() async {
    guard let credential = Credential.default else { return }

    do {
        // Revoke refresh/access tokens server-side (safer than only deleting)
        try await credential.revoke()
    } catch {
        // Log but continue; you should still clear local state
    }

    // Remove tokens and user state from local secure storage
    do {
        try await credential.remove()
        // Navigate to signed-out page
    } catch {
        // Handle/remove fallback if needed
    }
}
```

## End the Okta browser session (optional)

You don’t need to end the Okta browser session if either of the following are true:

* Your app uses [DirectAuth](https://okta.github.io/okta-mobile-swift/development/documentation/oktadirectauth/). That is, there isn’t a browser session.
* You signed in with `BrowserSignIn.shared?.ephemeralSession = true`. That is, there are no persistent cookies.

### Example end browser session code

```swift
import BrowserSignin
@MainActor
func signOutFromBrowser() async throws {
    guard let credential = Credential.default else {
        return
    }

    // Ends Okta browser session (opens auth session and returns to your logout_redirect_uri)
    do {
        // This revokes tokens AND removes the Okta browser session
        try await BrowserSignin.shared?.signOut(token: credential.token)
    } catch {
        // If there's no browser session or a callback mismatch, log and continue
    }

    // Note: This revokes the token but does not remove it from storage. You still need to delete the credential.
    try? credential.remove()
}
```
