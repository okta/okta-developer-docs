Create a `src/config.js` file to define your configuration settings:

```js
export default {
  oidc: {
    clientId: '{yourClientID}',
    issuer: 'https://{yourOktaDomain}/oauth2/default',
    redirectUri: window.location.origin + '/login/callback',
    scopes: ['openid', 'profile', 'email']
  }
}
```