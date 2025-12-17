If you have a single-user app, the use of "default" credentials simplifies the development process a lot:

* The default can either be explicitly set or implicitly assigned when the first token is stored.
* It's possible to retain the credential object and can pass it around throughout your app. However, it’s often convenient to have singleton access to this common object.
* Use the `default` type property to access the default credential, for example, to check if a user is already signed in when the app starts.
* The `Credential` class broadcasts a notification whenever the default credential is set or removed. You can listen for this event to dynamically update your UI, such as transitioning from a sign-in screen to a signed-in view.

### Swift example: Check for a default user on app load

```swift
// On app launch, check for a default credential
if let credential = Credential.default {
  // User is signed in. Proceed to the main app view.
  showUserProfile(credential);
} else {
  // No default user. Show the sign-in screen.
  showLoginScreen();
}

// Listen for changes to the default credential
NotificationCenter.default.addObserver(forName: .defaultCredentialChanged,
                                       object: nil,
                                       queue: nil) { notification in
    if let credential = notification.object as? Credential {
        print("Default credential has changed to: \(credential.id)")
        // Update UI with new user info
    } else {
        print("User signed out, default credential removed.")
        // Update UI to show signed-out state
    }
}
```
