Define the following placeholder inside your app's `build.gradle`:

```gradle
android.defaultConfig.manifestPlaceholders = [
  "appAuthRedirectScheme": "com.okta.example"
]
```

This defines your redirect scheme.

You can add `:/callback` to the scheme to get the full redirect URI — `com.okta.example:/callback`. Keep this value somewhere safe as you need in the following steps.

> **Note**: `com.okta.example` is just an example scheme. You can replace it with any string that follows the pattern of `domain.company.appname`.
