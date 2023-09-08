Use the sample iOS app that you cloned from GitHub to test how multiple apps can share a browser session with iOS. See the samples that are linked at the top of the guide.

### Install the dependencies

To install the Okta Browser Sign-in sample app dependencies into your project, this guide uses [CocoaPods](https://cocoapods.org/).

Enter the following at the command line inside the sample app:

`pod install`

> **Note:** Be sure to work within the Okta BrowserSignIn Workspace in Xcode after you do `pod install`.

### Modify the configuration file

Make the following modifications in the `OktaBrowserSignIn/Okta.plist` file of your sample app:

* `redirectUri`: Enter `com.first.sample:/callback` as the value, which is what you defined as one of the **Sign-in redirect URIs** in the Native app that you created in the [previous step](#configure-two-openid-connect-native-apps).
* `clientId`: Enter the Client ID that you copied during the [previous step](#configure-two-openid-connect-native-apps).
* `issuer`: This is the URL for the authorization server that performs authentication. It's a combination of your Okta domain and `/oauth2/default`.

    For example: `https//${yourOktaDomain}/oauth2/default`

> **Note:** Locate your Okta domain by clicking your username in the upper-right corner of the Admin Console. The domain appears in the dropdown menu (for example, subdomain.okta.com).

`logoutRedirectUri`: Enter `com.first.sample:/logout` as the value, which is what you defined as one of the **Sign-out redirect URIs** in the Native app that you created in the [previous step](#configure-two-openid-connect-native-apps).
