In the `SignInViewController.swift` file, add the following:

```swift
oktaOidc.signOutOfOkta(authStateManager, from: viewController) { error in
    if let error = error {
        // Handle error
        return
    }
}
```
