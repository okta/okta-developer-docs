### The Classic Engine Authentication SDK multifactor authentication flow

The Classic Engine Authentication SDK methods that support the sign-out flow are as follows:

* `OktaAuthStatus.cancel`

Sign the user out by calling `OktaAuthStatus.cancel`.

```swift
if status.canCancel() {
   status.cancel(onSuccess: {
       self.activityIndicator.stopAnimating()
       self.loginButton.isEnabled = true
       self.currentStatus = nil
       self.updateStatus(status: nil)
   }, onError: { error in
       self.handleError(error)
   })
}
```

### The Identity Engine SDK sign-out flow

Sign the user out by calling `token.revoke`. Either call this method on a stored token object or through the `Token` object under `IDXClient`.

* `token.revoke`

#### Revoke using stored token

Call the `revoke` method on the stored `token` object. After the revoke is complete, remove the token from local storage.

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

#### Revoke using token under IDXClient

If you store the string representations of the access and refresh tokens, `revoke` them by calling the revoke method on `IDXClient.Token`.

```swift
IDXClient.Token.revoke(token: "access_token",
                      type: .accessAndRefreshToken,
                      configuration: configuration) { success, error in
   guard success else {
       // Handle error
   }
}
```
