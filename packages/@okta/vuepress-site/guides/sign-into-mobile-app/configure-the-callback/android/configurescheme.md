To do this, you must define a gradle manifest placeholder in your app's `build.gradle`:

```gradle
android.defaultConfig.manifestPlaceholders = [
    "appAuthRedirectScheme": "com.okta.oidc.example"
]
```

Make sure this is consistent with the redirect URI used in `okta_oidc_config.json`. For example, if your **Login Redirect URI** is `com.okta.oidc.example:/callback`, the **AppAuth Redirect Scheme** is `ccom.okta.oidc.example`.