## Get the user profile information (optional)

After the user signs in successfully, you can choose to obtain basic user information by making a request to the authorization server.

The following code shows a call to the [`/userinfo`](/docs/reference/api/oidc/#userinfo) endpoint where the access token is passed in to the authorization header. Basic JSON parsing is executed during the response.

```swift
guard let url = URL(string: "https://${yourOktaDomain}/oauth2/default/v1/userinfo") else { return }
var request = URLRequest(url: url)
request.addValue("Bearer \(token.accessToken)", forHTTPHeaderField: "Authorization")
URLSession.shared.dataTask(with: request) { (data, response, error) in
    guard let data = data else {
        // Handle error
        return
    }
    if let json = try? JSONSerialization.jsonObject(with: data, options: []) {
        // Use the User info JSON
    }
}
```
