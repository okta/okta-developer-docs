If you'd like to use a custom sign-out flow, skip to [sign users out of Okta](#sign-users-out-of-okta).

If you'd like to use the browser sign-out flow, you need to define a callback route.

Ensure that the `endSessionRedirectUri` configured at `createConfig` is the same as one of those defined in the **Sign-out redirect URIs** section of the Admin Console. For example, if you’re initializing your client with a config file:

```javascript
{
  export default {
    oidc: {
      clientId: '${clientId}',
      redirectUri: 'com.okta.example:/login',
      endSessionRedirectUri: 'com.okta.example:/logout',
      discoveryUri: 'https://com.okta.example',
      scopes: ["openid", "profile", "offline_access"],
    }
  };
}
```
