Note that `accessToken` is calculated property. `OktaOidcStateManager` returns `nil` for `accessToken` property when detects that the access token has been expired. Use the `renew` method to get a new access token:

```swift
if let accessToken = stateManager.accessToken {
    // use access token
    print(accessToken)
    
} else {
    stateManager.renew { updatedStateManager, error in
        if let error = error else {
            // Error
            return
        }

        // use renewed access token
        print(updatedStateManager.accessToken)
    }
}
```
