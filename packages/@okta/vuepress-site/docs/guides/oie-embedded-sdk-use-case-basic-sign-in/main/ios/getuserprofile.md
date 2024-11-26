## Get the user profile information

You can obtain basic user information by making a request to the authorization server after a user successfully signs in. 

The following code shows a call to the [`/userinfo`](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/userinfoCustomAS) endpoint where the access token is passed into the authorization header. Basic JSON parsing is executed during the response.

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
