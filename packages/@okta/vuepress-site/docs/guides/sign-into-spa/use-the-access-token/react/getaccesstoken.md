Get the access token using the `accessToken` property on the [AuthState](https://github.com/okta/okta-auth-js#authstatemanager) object. Then, use this value to add an `Authorization` header to outgoing requests:

```javascript
const accessToken = authState.accessToken;
/* global fetch */
const response = await fetch(url, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
```
