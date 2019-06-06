Get the access token using the [getAccessToken()](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-react#authgetaccesstoken) method on the [Auth](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-react#auth) object. Then, use this value to add an `Authorization` header to outgoing requests:

```javascript
const accessToken = await this.props.auth.getAccessToken();
/* global fetch */
const response = await fetch(url, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
```
