```swfit
oktaOidc.signInWithBrowser(from: self, callback: { stateManager, error in

    if let error = error {
        // handle error
        return
    }

    guard let authStateData = try? NSKeyedArchiver.archivedData(withRootObject: stateManager, requiringSecureCoding: false) else {
        return
    }
    
    do {
        try secureStorage.set(data: authStateData,
                              forKey: "okta_user",
                              behindBiometrics: secureStorage.isTouchIDSupported() || secureStorage.isFaceIDSupported())
        } catch let error as NSError {
            // handle error
        }
})
```
