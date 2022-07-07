1. Create a new file called `okta.properties` in the root directory of your project:

1. Add the following content to it, replacing the placeholders with the Okta app integration values that you got earlier.

    ```properties
    discoveryUrl=${CLI_OKTA_ORG_URL}oauth2/default/.well-known/openid-configuration
    clientId=${CLI_OKTA_CLIENT_ID}
    signInRedirectUri=${CLI_OKTA_REVERSE_DOMAIN}:/callback
    signOutRedirectUri=${CLI_OKTA_REVERSE_DOMAIN}:/logout
    ```

1. Add the following content to the `app/build.gradle`

    ```groovy
    def oktaProperties = new Properties()
    rootProject.file("okta.properties").withInputStream { oktaProperties.load(it) }
    android.defaultConfig {
        buildConfigField "String", 'DISCOVERY_URL', "\"${oktaProperties.getProperty('discoveryUrl')}\""
        buildConfigField "String", 'CLIENT_ID', "\"${oktaProperties.getProperty('clientId')}\""
        buildConfigField "String", 'SIGN_IN_REDIRECT_URI', "\"${oktaProperties.getProperty('signInRedirectUri')}\""
        buildConfigField "String", 'SIGN_OUT_REDIRECT_URI', "\"${oktaProperties.getProperty('signOutRedirectUri')}\""
    }
    ```

1. You will need to perform a gradle sync for the build changes to be reflected in Android Studio, see the [Android Studio Documentation](https://developer.android.com/studio/build#sync-files) for instructions on how to perform a gradle sync.

1. Create a class called `BrowserSignInApplication.kt` (we created ours in `app/src/main/java/com/okta/android/samples/browser_sign_in/BrowserSignInApplication.kt`).

1. Replace the contents with the following to initialize the SDK:

    ```kotlin
    class BrowserSignInApplication : Application() {
        override fun onCreate() {
            super.onCreate()
            // Initializes Auth Foundation and Credential Bootstrap classes for use in the Activity.
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
    }
    ```
