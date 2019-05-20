Create a configuration object in code:

```java
config = new OIDCConfig.Builder()
    .clientId("{clientId}")
    .redirectUri("{redirectUri}")
    .scopes("openid", "profile", "offline_access")
    .discoveryUri("https://{yourOktaDomain}")
    .create();
```

Or, create a new `okta_oidc_config.json` file in your application's `res/raw` with the following contents:

```json
{
  "client_id": "{clientId}",
  "redirect_uri": "{redirectUri}",
  "scopes": [
    "openid",
    "profile",
    "offline_access"
  ],
  "discovery_uri": "https://{yourOktaDomain}"
}
```

Then create a configuration object by loading this file:

```java
config = new OIDCConfig.Builder()
    .withJsonFile(this, R.id.okta_oidc_config)
    .create();
```
