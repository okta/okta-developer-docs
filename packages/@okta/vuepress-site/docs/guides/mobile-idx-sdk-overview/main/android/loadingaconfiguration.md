
Create a configuration by calling `IdxClientConfiguration`. You can set the values
directly in your code or load them from a file. This code shows loading the values from a
property file in your project.

First, create a property file, for example, `okta.properties` in the project root. Add the values for your Okta Application Integration to the file.

```
issuer={yourIssuerUrl}
clientId={yourClientId}
scopes="openid","email","profile","offline_access"
redirectUri=com.okta.sample.android:/login
```

Add the below configuration in the `defaultConfig` section of your `app/build.gradle` so that the properties are available as build configuration:

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

Create an `OktaIdxClientConfigurationProvider` class that return an `IdxClientConfiguration` from the `BuildConfig`.

```kotlin
import com.okta.android.samples.authenticator.BuildConfig
import com.okta.idx.kotlin.client.IdxClientConfiguration
import okhttp3.HttpUrl.Companion.toHttpUrl

/**
 * Returns an Okta org configuration from the build configuraiton.
 */
internal object OktaIdxClientConfigurationProvider {
    fun get(): IdxClientConfiguration {
        return IdxClientConfiguration(
            issuer = BuildConfig.ISSUER.toHttpUrl(),
            clientId = BuildConfig.CLIENT_ID,
            scopes = BuildConfig.SCOPES.toSet(),,
            redirectUri = BuildConfig.REDIRECT_URI,
        )
    }
}
```
