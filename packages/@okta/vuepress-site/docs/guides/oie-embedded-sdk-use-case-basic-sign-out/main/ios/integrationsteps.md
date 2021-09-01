The following code examples show you how to implement the user sign-out flow.

### Example 1

Sign out the user by calling the `revoke` method on the `token` object.
Once the revoke is complete, remove the token from local storage.

```swift
let token = ..

token.revoke { (success, error) in
    guard success else {
        // Handle error
        return
    }
    //Remove token from local storage
}
```

### Example 2

If you don't store the `IDXClient.Token` object, but instead store the string
representations of the access and refresh tokens, revoke them using
the following code:

```swift
IDXClient.Token.revoke(token: "access_token",
                       type: .accessAndRefreshToken,
                       configuration: configuration) { success, error in
    guard success else {
        // Handle error
    }
}
```
