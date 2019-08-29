Signing out of Okta requires the app to open a browser and navigate to the [end session endpoint](https://developer.okta.com/docs/reference/api/oidc/#logout). Okta destroys the user's session and immediately redirects back to your application. To do this, you must define a callback route for the sign-out process.

Make sure that the `endSessionRedirectUri` in `OIDCConfig` is the same as the one defined in the **Logout redirect URI** section. For example, if you are creating the `OIDCConfig` by builder:

```java
config = new OIDCConfig.Builder()
    .clientId("{clientId}")
    .redirectUri("com.okta.example:/login")
    .endSessionRedirectUri("com.okta.example:/logout")
    .scopes("openid", "profile", "offline_access")
    .discoveryUri("https://com.okta.example")
    .create();
```

Using a JSON file:

```json
{
  "client_id": "{clientId}",
  "redirect_uri": "com.okta.example:/login",
  "end_session_redirect_uri": "com.okta.example:/logout",
  "scopes": [
    "openid",
    "profile",
    "offline_access"
  ],
  "discovery_uri": "https://com.okta.example"
}
```