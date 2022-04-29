This singleton stores the token in user defaults. For more security, store the token in the Keychain.

```swift

import Foundation
import OktaIdx

enum TokenManagerError: Error {
    case unableToReadToken(String)
}

class TokenManager {
    static let shared = TokenManager()

    // Change com.example.okta-samplecode.Okta-Login to your bundle identifier.
    private struct UserDefaultsKeys {
        static let storedTokenKey = "com.example.okta-samplecode.Okta-Login.storedToken"
    }

    // Save the token to user defaults.
    func saveToken(_ token: Token) {
        let defaults = UserDefaults.standard

        // Convert the token to a format that you can save in user defaults.
        guard let tokenData = try? JSONEncoder().encode(token) else {
            // Handle the error.
            return
        }

        defaults.set(tokenData, forKey: UserDefaultsKeys.storedTokenKey)
        defaults.synchronize()
    }

    // Read the token from user defaults.
    func readToken() -> Token? {
        // Check for an existing token and convert from JSON to an SDK Token object.
        guard let tokenData = UserDefaults.standard.object(forKey: UserDefaultsKeys.storedTokenKey) as? Data,
              let token = try? JSONDecoder().decode(Token.self, from: tokenData) else {
            // Handle the error.
            return nil
        }

        return token
    }

    func revokeToken(completion: @escaping(_ successful: Bool, _ error: Error?) -> Void) {
        if let token = readToken() {
            token.revoke() { (success, error) in
               let defaults = UserDefaults.standard
               if success {
                    // Delete the token from user defaults.
                    defaults.removeObject(forKey: UserDefaultsKeys.storedTokenKey)
                    defaults.synchronize()

                    completion(true, nil)
                } else {
                    completion(false, error)
                }
            }
        } else {
            completion(false, TokenManagerError.unableToReadToken("Unable to read the Token."))
            return
        }
    }
}
```

This code shows the delegate function that handles receiving the access token:


```swift
public func idx(client: IDXClient, didReceive token: Token) {
    TokenManager.shared.save(token)
}

```

Revoke a token by calling `Token.revoke(type:completion:)` (`type` is optional):

```swift
if let token = TokenManager.shared.readToken() {
    token.revoke() { (success, error) in
        guard success else {
            // Handle the error.
            return
        }
        // The token is revoked.
        // In SwiftUI, update variables for presenting UI.
        // For ViewControllers perform the call on the main thread using `DispatchQueue.main.async`.
        return
    }
}
```

