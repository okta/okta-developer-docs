Call the `isAuthenticated` function if you want to check whether the user is signed in:

```javascript
const result = await isAuthenticated();
if (result.authenticated !== this.state.authenticated) {
    this.setState({authenticated: result.authenticated});
}
```

Implementation in iOS and Android native modules checks if the client has an access or ID token. Then the user is considered authenticated and this call returns true. This does not check the validity of the access token which could be expired or revoked. See [Keep the user signed in](#keep-the-user-signed-in) to understand how to get a fresh access token.
