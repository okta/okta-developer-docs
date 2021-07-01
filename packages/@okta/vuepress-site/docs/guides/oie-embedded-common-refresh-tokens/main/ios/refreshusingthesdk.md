## Refresh using the Swift SDK

The Swift SDK has built-in support for refreshing tokens through
use of the `Token` object's `refresh` method.

```javascript
token.refresh { (newToken, error) in
    ...
}
```

The
[EmbeddedAuth sample app](https://github.com/okta/okta-idx-swift/tree/master/Samples/EmbeddedAuthWithSDKs/EmbeddedAuth)
provides a refresh button on the
user profile page that calls this `refresh` method. See sample
app [repo](https://github.com/okta/okta-idx-swift) for more details about how
this button calls the `refresh` method.

For more information regarding token management including accessing and
revoking tokens, refer to the sample app and
[readme](https://github.com/okta/okta-idx-swift#readme).

The direct approach using the
[OAuth token endpoint](#refresh-using-the-oauth-token-endpoint) is also supported to
refresh tokens and it's up to the developer whether they want to use this endpoint or
the SDK's convenience method.
