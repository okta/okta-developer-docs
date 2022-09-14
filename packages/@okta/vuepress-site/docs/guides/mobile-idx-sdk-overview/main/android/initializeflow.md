
Initialize AuthFoundationBootstrap in your `Application` sublcass. This code shows loading the values from a property file in your project.

First, create a property file, for example, `okta.properties` in the project root. Add the values for your Okta Application Integration to the file.

```
discoveryUrl=https://{yourIssuerUrl}/oauth2/default/.well-known/openid-configuration
clientId={yourClientId}
redirectUri=com.okta.sample.android:/login
```

Add this configuration to your `app/build.gradle` to make the properties available in the build configuration:

```gradle
def oktaProperties = new Properties()
rootProject.file("okta.properties").withInputStream { oktaProperties.load(it) }

defaultConfig {
    ...

    buildConfigField "String", 'DISCOVERY_URL', "\"${oktaProperties.getProperty('discoveryUrl')}\""
    buildConfigField "String", 'CLIENT_ID', "\"${oktaProperties.getProperty('clientId')}\""
    buildConfigField "String", 'REDIRECT_URI', "\"${oktaProperties.getProperty('redirectUri')}\""

    ...
}
```

In your `Applicaiton` subclass, initialize `AuthFoundationBootstrap` from the `BuildConfig` by calling `initializeAuthFoundation` from `onCreate`.

```kotlin
import com.okta.android.samples.authenticator.BuildConfig
import com.okta.authfoundation.AuthFoundationDefaults
import com.okta.authfoundation.client.OidcClient
import com.okta.authfoundation.client.OidcConfiguration
import com.okta.authfoundation.client.SharedPreferencesCache
import com.okta.authfoundation.credential.CredentialDataSource.Companion.createCredentialDataSource
import com.okta.authfoundationbootstrap.CredentialBootstrap
import okhttp3.HttpUrl.Companion.toHttpUrl

fun initializeAuthFoundation() {
    // Initializes Auth Foundation and Credential Bootstrap classes.
    AuthFoundationDefaults.cache = SharedPreferencesCache.create(this)
    val oidcConfiguration = OidcConfiguration(
        clientId = BuildConfig.CLIENT_ID,
        defaultScope = "openid email profile offline_access",
    )
    val client = OidcClient.createFromDiscoveryUrl(
        oidcConfiguration,
        BuildConfig.DISCOVERY_URL.toHttpUrl(),
    )
    CredentialBootstrap.initialize(client.createCredentialDataSource(this))
}
```
