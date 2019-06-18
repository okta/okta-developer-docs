Define a placeholder in your app's `build.gradle`:

```gradle
android.defaultConfig.manifestPlaceholders = [
    "appAuthRedirectScheme": "com.okta.example"
]
```


