Your code can get the user's info with the `getUser` method:

```swift
stateManager?.getUser { response, error in
    if let error = error {
        // Error
        return
    }

    // response is key/value Dictionary
}
```

The user info (of type `Dictionary`) is returned as a closure parameter.
