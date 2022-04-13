<!-- code from IdxClientConfigurationProvider.kt in dynamic-app sample -->

Create a properties file, for example, `okta.properties` in the project root. Add below values in the file:

```
issuer={yourIssuerUrl}
clientId={yourClientId}
redirectUri=com.okta.sample.android:/login
```

Add the below configuration in the `defaultConfig` section of your `app/build.gradle` so that the properties are available as build configuration:

```gradle
defaultConfig {
    ...

    buildConfigField "String", 'ISSUER', "\"${oktaProperties.getProperty('issuer')}\""
    buildConfigField "String", 'CLIENT_ID', "\"${oktaProperties.getProperty('clientId')}\""
    buildConfigField "String", 'REDIRECT_URI', "\"${oktaProperties.getProperty('redirectUri')}\""

    ...
}
```

Create an `OktaIdxClientConfigurationProvider` class that return an `IdxClientConfiguration` from the `BuildConfig`.

```kotlin
import com.okta.android.samples.authenticator.BuildConfig
import com.okta.idx.kotlin.client.IdxClientConfiguration
import okhttp3.HttpUrl.Companion.toHttpUrl

/**
 * Provides Okta org configurations for IDX client.
 */
internal object OktaIdxClientConfigurationProvider {
    fun get(): IdxClientConfiguration {
        return IdxClientConfiguration(
            issuer = BuildConfig.ISSUER.toHttpUrl(),
            clientId = BuildConfig.CLIENT_ID,
            scopes = setOf("openid", "email", "profile", "offline_access"),
            redirectUri = BuildConfig.REDIRECT_URI,
        )
    }
}
```
