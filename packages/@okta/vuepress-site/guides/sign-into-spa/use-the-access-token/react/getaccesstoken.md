Get the access token using the `getAccessToken()` method on the `Auth` object. Then, use this value to add an `Authorization` header to outgoing requests:

```javascript
const accessToken = await auth.getAccessToken();
/* global fetch */
const response = await fetch(url, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
```