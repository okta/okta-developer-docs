```swift
DispatchQueue.global().async {
    do {
        let authStateData = try secureStorage.getData(key: "okta_user")
        guard let stateManager = try? NSKeyedUnarchiver.unarchiveTopLevelObjectWithData(authStateData) as? OktaOidcStateManager else {
            return
        }
    } catch let error as NSError {
        // handle error
    }
}
```
