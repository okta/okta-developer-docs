The SDK is designed to support multi-user scenarios by allowing you to store and query multiple credentials simultaneously.

### Swift example: Find credentials by ID

All tokens are automatically assigned a unique ID it can be identified by. This can be seen in the [id](https://okta.github.io/okta-mobile-swift/development/documentation/authfoundation/token/id), as well as through the [id](https://okta.github.io/okta-mobile-swift/development/documentation/authfoundation/credential/id) property. This identifier may be used with the [with(id:prompt:authenticationContext:)](https://okta.github.io/okta-mobile-swift/development/documentation/authfoundation/credential/with(id:prompt:authenticationcontext:)) function.

The list of all stored IDs is available through the [allIDs](https://okta.github.io/okta-mobile-swift/development/documentation/authfoundation/credential/allids) static property.

```swift
if let credential = try Credential.with(id: serviceTokenId) {
    // Do something with the credential
}
```

### Swift example: Find credentials by developer-assigned tags

When storing tokens, the [store(_:tags:security:)](https://okta.github.io/okta-mobile-swift/development/documentation/authfoundation/credential/store(_:tags:security:)) function accepts an optional collection of tags you can use to identify the purpose of different tokens. The [find(where:prompt:authenticationContext:)](https://okta.github.io/okta-mobile-swift/development/documentation/authfoundation/credential/find(where:prompt:authenticationcontext:)) function allows you to query tokens based on those tags at a later date. Furthermore, those tags can later be updated by changing the credential’s [tags](https://okta.github.io/okta-mobile-swift/development/documentation/authfoundation/credential/tags) property.

```swift
try Credential.store(token: newToken, tags: ["service": "purchase"])

// Later ...

if let credential = try Credential.find(where: { $0.tags["service"] == "purchase" }).first {
    // Use the credential
}
```

### Swift example: Find credentials by ID Token claims

If a token contains a valid [idToken](https://okta.github.io/okta-mobile-swift/development/documentation/authfoundation/token/idtoken), the claims it represents are available within the [find(where:prompt:authenticationContext:)](https://okta.github.io/okta-mobile-swift/development/documentation/authfoundation/credential/find(where:prompt:authenticationcontext:)) expression. The object returned within that expression supports the [HasClaims](https://okta.github.io/okta-mobile-swift/development/documentation/authfoundation/hasclaims) protocol, meaning its values can be queried within that filter.

```swift
let userCredentials = try Credential.find { metadata in
    metadata.subject == "jane.doe@example.com"
}
```
