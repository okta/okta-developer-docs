## Sample code

Sign out the user by calling the `IDXClient.Token` `revoke` method.

Example

```swift
userManager.current?.token.revoke { (success, error) in
    guard success else {
        DispatchQueue.main.async {
            let alert = UIAlertController(title: "Sign out failed", message: error?.localizedDescription, preferredStyle: .alert)
            alert.addAction(.init(title: "OK", style: .default))
            self.present(alert, animated: true)
        }
        return
    }
    userManager.current = nil
}
```
