Since access tokens are traditionally short-lived, you can renew expired access tokens by exchanging a refresh token for new one:

```swift
stateManager?.renew { newAccessToken, error in
    if let error = error else {
        // Error
        return
    }

  // renewed TokenManager
}
```
