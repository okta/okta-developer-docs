```swift
oktaOidc.signInWithBrowser(from: self, callback: { stateManager, error in

    if let error = error {
        // handle error
        return
    }

    let authStateData = try? NSKeyedArchiver.archivedData(withRootObject: stateManager, requiringSecureCoding: false)
    guard let authStateData = authStateData else {
        // handle error
        return
    }
    
    do {
        try secureStorage.set(data: authStateData,
                              forKey: "okta_user",
                              behindBiometrics: secureStorage.isTouchIDSupported() ||
                                                secureStorage.isFaceIDSupported())
        } catch let error as NSError {
            // handle error
        }
})
```
