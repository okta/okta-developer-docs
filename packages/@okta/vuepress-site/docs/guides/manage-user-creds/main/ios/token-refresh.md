Access tokens are short-lived for security reasons. The Swift Client SDK simplifies the process of using long-lived refresh tokens to get new access tokens without requiring the user to sign in again. See [Refreshing and Revoking Tokens](https://okta.github.io/okta-mobile-swift/development/documentation/authfoundation/credential#Refreshing-and-Revoking-Tokens).

* `refresh()`: Immediately refreshes the token.
* `refreshIfNeeded()`: A smarter function that only refreshes the token if it's expired or is about to expire within a defined grace interval.
* `authorize(request:)`: Authorizes an outgoing network request, refreshing the token if needed. Automatically attaches the appropriate HTTP Authorization headers to the outgoing request. This is the recommended approach to manage token expiration before making an API call.

### Swift example: Refreshing a token

```swift
func makeAuthenticatedApiRequest(credential: Credential, url: URL, data: [String: Any]) async -> Any {
    do {
        // Create a URLRequest representing the HTTP request
        var request = URLRequest(url: url)
        request.httpBody = try? JSONSerialization.data(withJSONObject: data, options: [])

        // Authorize the request with the tokens from the given credential
        await credential.authorize(&request)

        // Perform the request and return the data from it
        let (data, _) = try await URLSession.shared.data(for: request)
        return try JSONSerialization.jsonObject(with: data)
    } catch {
        print("API request failed. User may need to re-authenticate. \(error)")

        showLoginScreen();
    }
}
```
