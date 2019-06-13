The following is an example of getting user information from the `/userinfo` endpoint:

```swift
stateManager?.getUser { response, error in
    if let error = error {
        // Error
        return
    }

    // response is key/value Dictionary
}
```

The user info (of type 'Dictionary') is returned as a closure parameter. Possible properties are listed [here](/docs/reference/api/oidc/#response-example-success-5).
