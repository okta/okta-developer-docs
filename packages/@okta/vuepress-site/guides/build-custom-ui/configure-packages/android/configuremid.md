Create a new `okta_oidc_config.json` file in your application's `res/raw` with the following contents:

```json
{
  "client_id": "{clientId}",
  "redirect_uri": "{redirectUri}",
  "end_session_redirect_uri": "{endSessionUri}",
  "scopes": [
    "openid",
    "profile",
    "offline_access"
  ],
  "discovery_uri": "https://{yourOktaDomain}"
}
```

> Note: `https://okta.okta.com` is different from your admin URL. Don't include `-admin` in the value.

Use this JSON file to create a `account`:

```java
account = new OIDCAccount.Builder()
    .withResId(this, R.id.okta_oidc_config)
    .create();
```

> Note: To receive a `refresh_token`, you must include the `offline_access` scope.

You can also configure the `account` by code:

```java
account = new OIDCAccount.Builder()
    .clientId("{clientId}")
    .redirectUri("{redirectUri}")
    .endSessionRedirectUri("{endSessionUri}")
    .scopes("openid", "profile", "offline_access")
    .discoveryUri("https://{yourOktaDomain}")
    .create();
```