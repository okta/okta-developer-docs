The first steps are to set up the configuration file.

### Modify the configuration file

Make the following modifications in your sample app. Open the existing `config.json` located under `res/raw` and add the following values for these parameters:

* `client_Id`: Enter the Client ID that you copied during the [previous step](#configure-two-openid-connect-native-apps).
* `redirect_uri`: Enter `com.first.sample:/callback` as the value, which is what you defined as the Sign-in redirect URI in the Native app that you created in the [previous step](#configure-two-openid-connect-native-apps).
* `end_session_redirect_uri`: Enter `com.first.sample:/logout` as the value, which is what you defined as the Sign-out redirect URI in the Native app that you created in the [previous step](#configure-two-openid-connect-native-apps).
* `discovery_uri`: Enter your Okta domain that appears in the upper-right corner of your Okta org dashboard.

Example

```json
{
  "client_id": "clientId",
  "redirect_uri": "com.first.sample:/callback",
  "end_session_redirect_uri": "com.first.sample:/logout",
  "scopes": [
    "openid",
    "profile",
    "offline_access"
  ],
  "discovery_uri": "https://{yourOktaDomain}"
}
```
