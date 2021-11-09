Get the access token using the [getAccessToken()](https://github.com/okta/okta-vue#authgetaccesstoken) method on the [auth](https://github.com/okta/okta-vue#auth) object. Then, use this value to add an `Authorization` header to outgoing requests:

```javascript
const accessToken = await this.$auth.getAccessToken();
/* global fetch */
const response = await fetch(url, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
```
