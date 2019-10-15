Get the access token using the `getAccessToken` method and prepare an HTTP header`:

```javascript
const accessToken = await getAccessToken();
let headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${accessToken.access_token}`
};
```

Then, make an authenticated request to your API endpoint or resource server and handle the response:

```javascript
const response = await fetch(`https://{yourApiEndpoint}`, {
  method: 'GET',
  headers: headers,
});
if (!response.ok) {
  throw Error(response.status);
}
```
