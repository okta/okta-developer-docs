Add the token to your header in your `URLRequest` object. The following function uses `setValue(_:forHTTPHeaderField:)` to set the authorization header:

```swift
func setAuthorization(_ urlRequest: URLRequest) {
  guard let authStateManager = authStateManager,
  let tokenString = authStateManager.accessToken else {
    showError(title: "Unable to Set Token",
              message: "Could not communincate with the Okta server.")
    return
  }

  authHeaderValue = "Bearer \(tokenString)"

  urlRequest.setValue(authHeaderValue, forHTTPHeaderField: "Authorization")
}
```