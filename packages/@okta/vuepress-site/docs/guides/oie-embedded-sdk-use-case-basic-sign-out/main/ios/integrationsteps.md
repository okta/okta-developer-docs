The following code examples show you how to set up the user sign-out flow.

### Implement token cleanup

The new SDK provides several methods to sign a user out of your app, depending on your use case:

* `Credential.remove()`: Clears the in-memory reference to the token and removes it from storage. The credential can no longer be used.
  * Doesn’t revoke the token from the authorization server
* `Credential.revoke()`: Revokes all available tokens from the Authorization Server.
  * Doesn’t remove the token from memory or storage
* `Credential.revoke(type:)`: Revokes a specific token type (access token, refresh token, or device secret) from the Authorization Server.
  * Doesn’t remove the token from memory or storage
  * If you revoke an access token, the associated refresh token or device secret isn’t revoked.
  * If you revoke a refresh token, the associated access token is revoked.

When implementing your code, keep in mind the following:

* **Revoke before remove:** Always attempt `revoke()` before `remove()`. If the revoke fails, you should still remove the token to ensure that the sign out occurs.
* **Multiple accounts:** If your app supports multiple profiles/tenants, iterate over all credentials during sign-out.

#### Example token cleanup code

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

### End the Okta browser session (optional)

You don’t need to end the Okta browser session if either of the following are true:

* Your app uses [DirectAuth](https://okta.github.io/okta-mobile-swift/development/documentation/oktadirectauth/). That is, there isn’t a browser session.
* You signed in with `BrowserSignIn.shared?.ephemeralSession = true`. That is, there are no persistent cookies.

#### Example end browser session code

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


## See also

[Validate SSO federation](/docs/guides/validate-federation/main/).