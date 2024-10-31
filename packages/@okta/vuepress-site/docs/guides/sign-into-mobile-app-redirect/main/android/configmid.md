1. Create a file called `okta.properties` in the root directory of your project:

1. Add the configuration values that your app uses to interact with the Okta org. Replace the placeholders in the following code with the values from the Okta app that you created in [Create an Okta integration for your app](#create-an-okta-integration-for-your-app).

   Properties:
      `discoveryUrl`=<DISCOVERY_URL>
      `clientId`=<CLIENT_ID>
      `signInRedirectUri`=<SIGN_IN_URI>
      `signOutRedirectUri`=<SIGN_OUT_REDIRECT_URI>

   | Placeholder               | Value                                                                                                                                                        |
   |---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
   | `<DISCOVERY_URL>`         | The domain of your registered Okta org followed by `/oauth2/default/.well-known/openid-configuration`, such as `https://dev-1234567.okta.com/oauth2/default/.well-known/openid-configuration` |
   | `<CLIENT_ID>`             | The client ID from the app integration that you created, such as `0ux3rutxocxFX9xyz3t9`                                                                      |
   | `<SIGN_IN_URI>`           | The sign-in redirect URI from the app integration that you created, such as `com.okta.dev-1234567:/callback`                                                 |
   | `<SIGN_OUT_REDIRECT_URI>` | The sign-out redirect URI from the app integration that you created, such as `com.okta.dev-1234567:/logout`                                                        |
   [[.table-word-break]]

1. Add the following code to the bottom of the app's build file, `app/build.gradle`:

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

1. Add the following code to the dependencies block of the app's build file, `app/build.gradle`:

    ```groovy
    dependencies {
        // These packages are used in the Okta Mobile SDK code snippets.
        implementation('androidx.lifecycle:lifecycle-viewmodel-ktx:2.5.1')
        implementation('androidx.activity:activity-ktx:1.5.1')
    }
    ```

1. Update Android Studio with the changes by performing a gradle sync. For more information on performing a gradle sync, see the [Android Studio Documentation](https://developer.android.com/studio/build#sync-files).
