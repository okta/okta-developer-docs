The SDK for Swift provides several methods to sign a user out of your app, depending on your use case:

* `Credential.revoke()`: Revokes all available tokens from the Authorization Server. It works like the `revoke(type:)` method but with a default type of `.all`. As a result, it loops through all tokens calling `revoke()` on each of them in parallel.
  * **Note:** The SDK keeps the token in storage so that you can refresh it to get a new access token. However, if the token is no longer usable, the SDK removes the token from storage. For example, if you revoke a refresh token and the associated access token is revoked.
* `Credential.revoke(type:)`: Revokes a specific token type (access token, refresh token, or device secret) from the Authorization Server. See [Revoke tokens](https://developer.okta.com/docs/guides/revoke-tokens/main/).
  * **Notes:**
    * If you revoke an access token, the associated refresh token or device secret isn’t revoked.
    * If you revoke a refresh token, the associated access token is revoked.
    * Keeps the token in storage so that you can refresh it to get a new access token. However, if the token is no longer usable, the SDK removes the token from storage. For example, if you revoke a refresh token and the associated access token is revoked.
* `Credential.remove()`: Clears the in-memory reference to the token and removes it from storage.
  * **Note:** The SDK doesn’t revoke the token from the authorization server, so it can still be used.

When implementing your code, consider the following items:

* **Always revoke all tokens:** It’s always best to revoke all tokens. If the revoke fails, investigate the cause of the failure instead of removing the tokens from storage. For example, the failure could be due to a temporary network issue. In that case, it's better to try to revoke again to avoid a potential credential leak.
* **Multiple accounts:** If your app allows users to switch between multiple accounts or tenants, keep the following items in mind:
  * **Credential storage:** The SDK can store multiple user credentials securely. If the credential that the `default` property points to is removed, `default` is set to `nil`. As a result, assigning the `default` property, even to `nil`, doesn't remove a credential from storage.
  * **Default credentials:** The `Credential.default` property can be used to determine which account is active. Switch the active user by assigning a different stored credential to the `Credential.default` property.
  * **Sign-out scope:** When a user signs out, you typically only want to sign out the active user. If you want to remove all stored sessions, you need to iterate over all stored credentials and revoke or remove each one.

See [User sign-out flow (local app)](/docs/guides/oie-embedded-sdk-use-case-basic-sign-out/ios/main/).

### Swift example: Secure your sign-out flow

```swift
func signOutLocally() async {
    guard let credential = Credential.default else { return }

    do {
        // Revoke refresh/access tokens server-side (the safest approach).
        // The SDK's 'revoke' typically also removes the tokens from local storage upon success.
        try await credential.revoke()

        // If 'revoke()' succeeds, we're done. Navigate to the signed-out page.

    } catch {
        // If 'revoke()' fails (for example, due to a temporary network issue or invalid token).
        // Log the server-side revocation error but always continue to clear local state.
        // Log the error: print("Server-side revocation failed: \(error)")

        do {
            // Remove tokens and user state from local secure storage. This is essential for a proper sign-out, even if the server-side call failed.
            try await credential.remove()

            // Local removal succeeded. Navigate to signed-out page.

        } catch {
            // Handle/log if local storage removal also fails. This is rare but possible.
            // Handle/remove fallback, if needed.
            // Log the error: print("Local removal failed: \(error)")
        }
    }
}
```

### Swift example: Switch between user accounts

```swift
func switchDefaultAccount(to userEmail: String) throws {
    // Retrieve the credential object for the target account using its email address.

    guard let newCredential = try Credential.find(where: { meta in
        meta.preferredUsername == userEmail
    }) else {
        throw AccountError.credentialNotFound(account.username)
    }

    // Set the retrieved credential as the new default.
    // This immediately makes this account the active user (Credential.default).
    Credential.default = newCredential

    print("Switched active user to: \(newCredential.preferredUsername ?? "Unknown User")")

    // The app can now update to use the new default credential, or may be automatically updated in response to the Notification.Name.defaultCredentialChanged notification..
}
```
