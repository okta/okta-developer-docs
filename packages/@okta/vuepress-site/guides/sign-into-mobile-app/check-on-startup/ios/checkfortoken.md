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
