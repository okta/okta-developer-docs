
Create a configuration by calling `IdxClientConfiguration`. This code shows loading the values from a property file in your project.

First, create a property file, for example, `okta.properties` in the project root. Add the values for your Okta Application Integration to the file.

```
issuer={yourIssuerUrl}
clientId={yourClientId}
scopes="openid","email","profile","offline_access"
redirectUri=com.okta.sample.android:/login
```

Add this configuration to the `defaultConfig` section of your `app/build.gradle` to make the properties available in the build configuration:

```gradle
defaultConfig {
    ...

    buildConfigField "String", 'ISSUER', "\"${oktaProperties.getProperty('issuer')}\""
    buildConfigField "String", 'CLIENT_ID', "\"${oktaProperties.getProperty('clientId')}\""
    buildConfigField "String[]", 'SCOPES', "{${oktaProperties.getProperty('scopes')}}"
    buildConfigField "String", 'REDIRECT_URI', "\"${oktaProperties.getProperty('redirectUri')}\""

    ...
}
```

Create an `OktaIdxClientConfigurationProvider` class that returns an `IdxClientConfiguration` from the `BuildConfig`.

```kotlin
import com.okta.android.samples.authenticator.BuildConfig
import com.okta.idx.kotlin.client.IdxClientConfiguration
import okhttp3.HttpUrl.Companion.toHttpUrl

/**
 * Return an Okta org configuration from the build configuration.
 */
internal object OktaIdxClientConfigurationProvider {
    fun get(): IdxClientConfiguration {
        return IdxClientConfiguration(
            issuer = BuildConfig.ISSUER.toHttpUrl(),
            clientId = BuildConfig.CLIENT_ID,
            scopes = BuildConfig.SCOPES.toSet(),
            redirectUri = BuildConfig.REDIRECT_URI,
        )
    }
}
```
