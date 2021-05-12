1. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-android.git`
2. Open the `browser-sign-in` directory and navigate to the `okta_oidc_config.json` file in the app's `res/raw/` directory.
3. Add the information that you copied in the previous steps:

    ```JSON
    {
    "client_id": "{clientId}",
    "redirect_uri": "{LoginredirectUri}",
    "end_session_redirect_uri": "{LogoutredirectUri}",
    "scopes": [
        "openid",
        "profile"
    ],
    "Discovery_uri": "https://{yourOktaDomain}/oauth2/default/.well-known/openid-configuration"
    }
    ```

    > **Note:** The `discovery_uri` is the issuer URL that you built earlier.

4. To redirect back to your application from a web browser, you must specify a unique URI to your app. To do this, define a gradle manifest placeholder in your app's `build.gradle` file:

    ```bash
    android.defaultConfig.manifestPlaceholders = [
        "appAuthRedirectScheme": "com.okta.example"]
    ```

    > **Note:** Make sure that this value is consistent with the redirect URI that you added to the `okta_oidc_config.json` file. For example, if your redirect URI is `com.okta.example:/callback`, then the `appAuthRedirectScheme` should be `com.okta.example`.

5. Verify that the correct Okta OIDC Library is defined: `implementation 'com.okta.android:oidc-androidx:1.0.18`

You have now created your App in Okta and installed the Okta <StackSelector snippet="applang" noSelector inline /> sample app.
