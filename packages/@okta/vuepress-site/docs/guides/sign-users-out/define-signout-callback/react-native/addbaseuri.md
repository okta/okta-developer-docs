For browser sign-out flow define a callback route.

Make sure that the `endSessionRedirectUri` configured at `createConfig` is the same as the one defined in the **Logout redirect URI** section of the okta admin dashboard. For example if you are initializing your client via a config file:

```javascript
{
  export default {
    oidc: {
      clientId: '{clientId}',
      redirectUri: 'com.okta.example:/login',
      endSessionRedirectUri: 'com.okta.example:/logout',
      discoveryUri: 'https://com.okta.example',
      scopes: ["openid", "profile", "offline_access"],
    }
  };
}
```

For custom sign-out refer to <GuideLink link="../sign-out-of-okta">Sign users out of Okta</GuideLink>.