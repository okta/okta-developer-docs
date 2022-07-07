Parse and define the following placeholder inside your app's `build.gradle`:

```gradle
static def parseScheme(String uri) {
    def index = uri.indexOf(':/')
    if (index == -1) {
        throw new IllegalStateException("Scheme is not in a valid format.")
    }
    return uri.substring(0, index)
}

android.defaultConfig.manifestPlaceholders = [
  "webAuthenticationRedirectScheme": parseScheme(oktaProperties.getProperty('signInRedirectUri'))
]
```
