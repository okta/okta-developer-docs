## Refresh using the Javascript SDK

The Javascript SDK has built-in support for auto renewing of access and
id tokens. This behavior is enabled by default, but can be disabled by
setting the `tokenManager's` `autoRenew` property to `false`.

```javascript
const authClient = new OktaAuth({
    tokenManager: {
      autoRenew: false
    }
  });
```

With this property set to `false`, you can still manually refresh tokens by
subscribing to the `tokenManager's` `expired` event and calling it's
`renew` method.

```javascript
authClient.tokenManager.on('expired', function (key, expiredToken) {
  //do something
});
```

For more information about these methods and events, see the links below that
refer to SDK's repository [readme](https://github.com/okta/okta-auth-js#readme).

* [`tokenManager's` `autoRenew` property](https://github.com//okta/okta-auth-js#autorenew)
* [`tokenManager's` `expired` event](https://github.com/okta/okta-auth-js#tokenmanageronevent-callback-context)
* [`tokenManager's` `renew` method](https://github.com/okta/okta-auth-js#tokenmanagerrenewkey)

> **Note:** The direct approach using the
[OAuth token endpoint](#refresh-using-the-oauth-token-endpoint) is also supported to
refresh tokens. However, this approach is discouraged because it requires
you to implement token storage, rotation, and other token refresh functionality.
