To give the authenticated user access to the resource server API, include the access token in the http requests that you send to the server.

```swift
var sessionConfig = URLSessionConfiguration.default
var authValue: String = "Bearer \(oidcStateManager.accessToken)"
sessionConfig.httpAdditionalHeaders = ["Authorization": authValue]
var session = URLSession(configuration: sessionConfig, delegate: self as? URLSessionDelegate, delegateQueue: nil)
```

Send request and handle response

```swift
let request = NSMutableURLRequest(url: URL(string: "{yourResourceDomain}")!)
request.httpMethod = "GET"
let task = session.dataTask(with: request as URLRequest) {
    (data, response, error) in
        // handle response
}

task.resume()
```
