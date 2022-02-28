1. Create a new file called `okta_oidc_config.json` in the `app/src/main/res/raw` directory:

2. Add the following content to it, replacing the placeholders with the Okta app integration values that you got earlier.

```json
{
  "client_id": "${clientId}",
  "redirect_uri": "${redirectUri}",
  "end_session_redirect_uri": "${logoutRedirectUri}",
  "scopes": [
    "openid",
    "profile",
    "offline_access"
  ],
  "discovery_uri": "https://${yourOktaDomain}"
}
```

3. Create a singleton service class called `AuthClient.java` (we created ours in `app/src/main/java/com/okta/android/samples/browser_sign_in/service/AuthClient.java`).

4. Add the following inside the class to create the configuration object that the Okta SDK uses to communicate with your Okta application integration:

```java
private AuthClient(Context context) {
  var config = new OIDCConfig.Builder()
                    .withJsonFile(context, R.raw.okta_oidc_config)
                    .create();
}
```

> **Note:** The sample uses only the main application activity to keep things simple. We recommend that production apps follow the latest [Android architecture guidelines](https://developer.android.com/topic/architecture).
