```swift
stateManager?.renew { updatedTokenManager, error in
    if let error = error else {
        // handle error
        return
    }

    // use updatedTokenManager
}
```
