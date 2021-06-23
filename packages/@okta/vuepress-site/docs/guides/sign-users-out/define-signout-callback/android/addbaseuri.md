Define a callback route for the sign-out process.

Ensure that the `endSessionRedirectUri` in `OIDCConfig` is the same as the one defined in the **Sign-out redirect URIs** section. For example, if you are creating the `OIDCConfig` by builder:

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