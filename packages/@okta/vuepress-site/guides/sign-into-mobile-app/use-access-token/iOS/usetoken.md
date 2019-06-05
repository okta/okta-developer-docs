Get the access token from the `OktaOidcStateManager` and set up a `URLSession`:

```swift
var sessionConfig = URLSessionConfiguration.default
var authValue: String = "Bearer \(oidcStateManager.accessToken)"
sessionConfig.httpAdditionalHeaders = ["Authorization": authValue]

var session = URLSession(configuration: sessionConfig,
                         delegate: self as? URLSessionDelegate,
                         delegateQueue: nil)
```

Then, make an authenticated request to your API endpoint or resource server and handle the response:

```swift
let request = NSMutableURLRequest(url: URL(string: "https://{yourApiEndpoint}")!)
request.httpMethod = "GET"
let task = session.dataTask(with: request as URLRequest) {
    (data, response, error) in
        // handle response
}

task.resume()
```
