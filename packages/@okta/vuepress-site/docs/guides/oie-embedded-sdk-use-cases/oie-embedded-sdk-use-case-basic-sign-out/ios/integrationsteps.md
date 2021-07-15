## Sample code

Sign out the user by calling the `IDXClient.Token` `revoke` method.

Example 1

The following code shows a call to the `revoke` method. Once the
revoke is completed, the token should be removed from local
storage.

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

Example 2

If you don't store the `IDXClient.Token` object, but instead store the string
representations of the access and refresh tokens, you can revoke them using
the following approach:

```swift
IDXClient.Token.revoke(token: "access_token",
                       type: .accessAndRefreshToken,
                       configuration: configuration) { success, error in
    guard success else {
        // Handle error
    }
}
```
