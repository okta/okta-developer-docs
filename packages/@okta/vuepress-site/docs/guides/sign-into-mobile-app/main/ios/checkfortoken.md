After you create the OktaOidcStateManager instance, make sure that the user is signed in:

```swift
if let accessToken = authStateManager?.accessToken {
    // use accessToken
}
```

The `accessToken` property returns `nil` if the token is expired. See <GuideLink link="../stay-signed-in">Keep the User Signed In</GuideLink> to understand how to get a fresh access token.
