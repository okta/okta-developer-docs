Create a configuration object in code:

```java
account = new OIDCAccount.Builder()
    .clientId("{clientId}")
    .redirectUri("{callbackUri}")
    .scopes("openid", "profile", "offline_access")
    .discoveryUri("https://{yourOktaDomain}/oauth2/default")
    .create();
```

Or, create a new `okta_oidc_config.json` file in your application's `res/raw` with the following contents:

```json
{
  "client_id": "{clientId}",
  "redirect_uri": "{callbackUri}",
  "scopes": [
    "openid",
    "profile",
    "offline_access"
  ],
  "discovery_uri": "https://{yourOktaDomain}/oauth2/default"
}
```

Then create a configuration object by loading this file:

```java
account = new OIDCAccount.Builder()
    .withResId(this, R.id.okta_oidc_config)
    .create();
```
