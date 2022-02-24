Define a placeholder in your app's `build.gradle`:

```gradle
android.defaultConfig.manifestPlaceholders = [
  "appAuthRedirectScheme": "com.okta.example"
]
```

This defines your redirect scheme.

You can add `:/callback` to the scheme to get the full redirect URI (like `com.okta.example:/callback`), which you need in the following steps.

> **Note**: `com.okta.example` is just an example scheme. You can replace it with any string that follows the pattern of `domain.company.appname`.
