Add the following code to the `app/build.gradle` to parse the scheme defined in `okta.properties` created earlier in [Configure your app](#configure-your-app) and define the `manifestPlaceholders`:

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
