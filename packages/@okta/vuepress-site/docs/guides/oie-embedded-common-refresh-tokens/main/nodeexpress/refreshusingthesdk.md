The JavaScript SDK has built-in support for the auto-renewing of access and ID tokens. This behavior is enabled by default, but you can disable it by setting the `tokenManager` `autoRenew` property to `false`.

```javascript
const authClient = new OktaAuth({
    tokenManager: {
      autoRenew: false
    }
  });
```

If the `autoRenew` property is set to `false`, you can still manually refresh tokens by subscribing to the `tokenManager` `expired` event and calling its `renew` method.

```javascript
authClient.tokenManager.on('expired', function (key, expiredToken) {
  //do something
});
```

See the following links to the SDK repository [readme](https://github.com/okta/okta-auth-js#readme) for more information on these methods and events:

* [`tokenManager` `autoRenew` property](https://github.com//okta/okta-auth-js#autorenew)
* [`tokenManager` `expired` event](https://github.com/okta/okta-auth-js#tokenmanageronevent-callback-context)
* [`tokenManager` `renew` method](https://github.com/okta/okta-auth-js#tokenmanagerrenewkey)

> **Note:** The direct API approach using the [OAuth token endpoint](#option-2-refresh-the-tokens-with-the-oauth-token-endpoint) is also supported for refresh tokens. However, this approach is discouraged because it requires you to implement token storage, rotation, and other token refresh functionality.
