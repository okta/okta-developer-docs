To do this, define a placeholder in your app's `build.gradle`:

```gradle
android.defaultConfig.manifestPlaceholders = [
    "appAuthRedirectScheme": "com.okta.example"
]
```

This defines your **redirect scheme**. Add `:/callback` to the scheme to get the full redirect URI (like `com.okta.example:/callback`), which you'll need in the following steps.
