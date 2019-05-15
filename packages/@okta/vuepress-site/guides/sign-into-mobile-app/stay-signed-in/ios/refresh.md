Use the `renew` method to get a new access token:

```swift
stateManager?.renew { newAccessToken, error in
    if let error = error else {
        // Error
        return
    }

  // renewed TokenManager
}
```
