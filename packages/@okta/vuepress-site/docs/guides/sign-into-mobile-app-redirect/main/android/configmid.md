1. Create a file called `okta_oidc_config.json` in the `res/raw` folder of your app project and add the following content.

```json
{
  "client_id": "${clientId}",
  "redirect_uri": "${signinRedirectUri}",
  "end_session_redirect_uri": "${signoutRedirectUri}",
  "scopes": [
    "openid",
    "profile",
    "offline_access"
  ],
  "discovery_uri": "https://${yourOktaDomain}"
}
```

  Replace `clientId`, `signinRedirectUri`, `signingRedirectUri`, and `yourOktaDomain` with the values for the Okta application integration for your mobile app.

2. Create a singleton service class and load this file to create the configuration object that the Okta SDK uses to communicate with your Okta application integration. The following snippet shows using the configuration file in the `app/src/main/java/com/okta/android/samples/browser_sign_in/service/AuthClient.java` class:

```java
public class AuthClient {
  …

  private AuthClient(Context context) {
    var config = new OIDCConfig.Builder()
                     .withJsonFile(context, R.raw.okta_oidc_config)
                     .create();

      …
  }

  …
}
```

> **Note:** The sample uses only the main application activity to keep things simple. We recommend that production apps follow the latest [Android architecture guidelines](https://developer.android.com/topic/architecture).