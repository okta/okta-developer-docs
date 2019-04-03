The current value for the access token is returned by the `getAccessToken()` method on the `Auth` object.
Use this value to add an `Authorization` header to the XHR request.

```javascript

const accessToken = await auth.getAccessToken();
/* global fetch */
const response = await fetch(url, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

```