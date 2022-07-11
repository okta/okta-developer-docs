The `authorize(_:)` convenience function of `Credential` refreshes the token if required, and then adds it to the authorization header of your `URLRequest`:

```swift
var myURLRequest: URLRequest

// Initialize and configure the URL request.
...

// Add the authorization header to the configured URLRequest, refreshing the token if necessary.
let credential = Credential.default {
   await credential.authorize(&myURLRequest)
}

// Call the server API using the URL request.
```

If the token doesn't require refreshing or you're using another way to keep the token refreshed, you can use the synchronous call `authorize(request:)`:

```swift
credential.authorize(request: &myURLRequest)
```
