The `accessToken` property is a calculated property. It returns `nil` when the access token has expired. Use the `renew` method to get a new access token:

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
