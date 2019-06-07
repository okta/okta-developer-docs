After you create the OktaOidcStateManager instance, make sure that the user is signed in:

```swift
if let accessToken = authStateManager?.accessToken {
    // use accessToken
}
```

Note that the computed property accessToken validates the token's expiration date. The accessToken property returns nil if the token is expired:

```swift
@objc open var accessToken: String? {
    // Return the known accessToken if it hasn't expired
    get {
        guard let tokenResponse = self.authState.lastTokenResponse,
              let token = tokenResponse.accessToken,
              let tokenExp = tokenResponse.accessTokenExpirationDate,
              tokenExp.timeIntervalSince1970 > Date().timeIntervalSince1970 else {
                return nil
        }
        return token
    }
}
```

You can use the [introspect](https://developer.okta.com/docs/reference/api/oidc/#introspect) endpoint to check the validity of the `accessToken`. This gives you more information about the token in the [response properties](https://developer.okta.com/docs/reference/api/oidc/#response-properties-3):

```swift
guard let accessToken = authStateManager?.accessToken else { return }

authStateManager?.introspect(token: accessToken, callback: { payload, error in
    guard let isValid = payload?["active"] as? Bool else {
        // handle token non-valid case
        return
    }

    // handle token valid case
})
```

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
