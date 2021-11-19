Clear the user's tokens by calling:

```swift
authStateManager.clear()
```

#### Revoke tokens (optional)

Calling `clear()` discards tokens from local device storage, but they are technically still active until they expire. An optional step is to revoke the tokens so they can't be used, even by accident. You can revoke tokens using the following request:

```swift
authStateManager.revoke(authStateManager.refreshToken) { response, error in
    if let error = error else {
        // An error occurred
        return
    }
    // Token was revoked
}
```

Access and refresh tokens need to be revoked in separate requests.