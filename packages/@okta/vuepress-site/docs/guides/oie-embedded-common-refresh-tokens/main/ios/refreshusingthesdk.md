The Swift SDK has built-in support for refreshing tokens by using the `Token` class's `refresh` method.

```javascript
token.refresh { (newToken, error) in
    ...
}
```

The Swift [EmbeddedAuth sample app](https://github.com/okta/okta-idx-swift/tree/master/Samples/EmbeddedAuthWithSDKs/EmbeddedAuth)
provides a refresh button on the user profile page that calls this `refresh` method. See the [Identity Engine Swift SDK](https://github.com/okta/okta-idx-swift) for details on how this button calls the `refresh` method.

The direct API approach that uses the [OAuth token endpoint](#option-2-refresh-the-tokens-with-the-oauth-token-endpoint) is also supported for refresh tokens. It's up to the developer whether to use this endpoint or the SDK's convenience method.
