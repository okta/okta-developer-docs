Rather than hardcoding configuration values, keep them in a properties file:

1. Create a file named `okta.properties` in your project's root directory:

    ```properties
    issuer=https://{yourOktaDomain}
    clientId={yourClientID}
    authorizationServerId={yourCustomAuthServer}
    ```

    Replace `{yourOktaDomain}` and `{yourClientID}` with the values from the app that you create. Use the org base URL for `issuer` (such as `https://dev-123456.okta.com`). The default custom authorization server is selected in code.

1. Surface those values through `BuildConfig`. Add the following to the bottom of your `app/build.gradle.kts`:

    ```kotlin
    val oktaProperties = java.util.Properties()
    rootProject.file("okta.properties").inputStream().use { oktaProperties.load(it) }

    android.defaultConfig {
        buildConfigField("String", "ISSUER", "\"${oktaProperties.getProperty("issuer")}\"")
        buildConfigField("String", "CLIENT_ID", "\"${oktaProperties.getProperty("clientId")}\"")
        buildConfigField("String", "SCOPES", "\"${oktaProperties.getProperty("scopes")}\"")
    }
    ```

1. Initialize the SDK once at app startup. Create an `Application` subclass that initializes `AuthFoundation` and sets the default OIDC configuration used for token storage and the credential lifecycle:

    ```kotlin
    package com.okta.android.passwordauth

    import android.app.Application
    import com.okta.authfoundation.AuthFoundation
    import com.okta.authfoundation.client.OidcConfiguration

    class OktaPasswordAuthApplication : Application() {
        override fun onCreate() {
            super.onCreate()

            AuthFoundation.initializeAndroidContext(this)
            OidcConfiguration.default = OidcConfiguration(
                clientId = BuildConfig.CLIENT_ID,
                defaultScope = BuildConfig.SCOPES,
                // The default custom authorization server issues the tokens.
                issuer = "${BuildConfig.ISSUER}/oauth2/default"
            )
        }
    }
    ```

    This configures the AuthFoundation OIDC SDK, which backs token storage and the credential lifecycle (token refresh and user info). The direct authentication flow is configured separately in `AuthService`. Both target the default custom authorization server.

1. Register the `Application` class in your `AndroidManifest.xml` with the `android:name` attribute:

    ```xml
    <application
        android:name=".OktaPasswordAuthApplication"
        ... >
    ```
