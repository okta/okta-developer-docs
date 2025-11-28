After a user successfully signs in, you receive a `Token` object. The first step is to securely store it.

* **How it works:** Use the static `Credential.store()` function. This saves the token to secure storage and returns a `Credential` object for you to work with.
* **Developer-assigned tags:** You can add optional tags (metadata) during storage. These tags are useful for querying and managing multiple credentials later. For example, you could tag tokens based on user roles or the service they are for.
* **Security access control settings:** You can also specify a custom list of security access control flags. Use the flags to configure how the token is stored in the keychain, whether or not biometrics are required. If omitted, the default options are used, which your app can override. See [store(_:tags:security:) - Discussion](https://okta.github.io/okta-mobile-swift/development/documentation/authfoundation/credential/store(_:tags:security:)/#discussion).

### Swift example: Storing a token

```swift
try Credential.store(token,
                     tags: ["displayName": "My User"],
                     security: [
                         .accessibility(.afterFirstUnlock),
                         .accessControl(.biometryAny),
                         .accessGroup("com.example.myApp.shared")
                     ])
```
