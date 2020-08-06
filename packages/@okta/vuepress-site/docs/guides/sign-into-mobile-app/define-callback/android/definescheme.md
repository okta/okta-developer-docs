Define a placeholder in your app's `build.gradle`:

```groovy
android.defaultConfig.manifestPlaceholders = [
    "appAuthRedirectScheme": "com.okta.example"
]
```


