## Option 1: Refresh using the Javascript SDK

The Javascript SDK has built-in support for the auto-renewing of access and
ID tokens. This behavior is enabled by default, but you can disabled it by
setting the `tokenManager` `autoRenew` property to `false`.

```javascript
const authClient = new OktaAuth({
    tokenManager: {
      autoRenew: false
    }
  });
```

With this property set to `false`, you can still manually refresh tokens by
subscribing to the `tokenManager` `expired` event and calling its
`renew` method.

```javascript
authClient.tokenManager.on('expired', function (key, expiredToken) {
  //do something
});
```

See the following links to the SDK repository
[readme](https://github.com/okta/okta-auth-js#readme) for more
information about these methods and events.

* [`tokenManager` `autoRenew` property](https://github.com//okta/okta-auth-js#autorenew)
* [`tokenManager` `expired` event](https://github.com/okta/okta-auth-js#tokenmanageronevent-callback-context)
* [`tokenManager` `renew` method](https://github.com/okta/okta-auth-js#tokenmanagerrenewkey)

> **Note:** The direct approach using the
[OAuth token endpoint](#refresh-using-the-oauth-token-endpoint) is also supported for
refresh tokens. However, this approach is discouraged because it requires
you to implement token storage, rotation, and other token refresh functionality.
