### Clear the Okta session

With the callback in place, clear the Okta session in the browser by calling:

```swift
oktaOidc.signOutOfOkta(authStateManager, from: self) { error in
    if let error = error {
        // Error
        return
    }
}
```