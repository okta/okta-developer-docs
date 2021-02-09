Use the sample iOS app that you <GuideLink link="../overview">cloned from GitHub</GuideLink> to test how multiple apps can share a browser session with iOS.

### Install the dependencies
To install the Okta Browser Sign-in sample app dependencies into your project, this guide uses <GuideLink link="../overview">CocoaPods</GuideLink>. 

Enter the following at the command line inside the sample app:

`pod install`

> **Note:** Be sure to work within the Okta BrowserSignIn Workspace in Xcode after you do `pod install`.

### Modify the configuration file
Make the following modifications in the `OktaBrowserSignIn/Okta.plist` file of your sample app:

* `redirectUri`: Enter `com.first.sample:/callback` as the value, which is what you defined as the **Login Redirect URI** in the Native app that you created in the <GuideLink link="../configure-oidc-native-apps">last step</GuideLink>. 
* `clientId`: Enter the Client ID that you copied during the <GuideLink link="../configure-oidc-native-apps">last step</GuideLink>.
* `issuer`: This is the URL for the authorization server that performs authentication. It's a combination of your `Org URL` and `/oauth2/default`.

    For example: `https//{yourOrgURL}/oauth2/default`

> **Note:** The `Org URL` can found on the Admin Console's global header in the upper-right corner. Click the section which displays your email and company name.  A drop-down menu will appear and display general org information including the full `Org URL` (e.g. subdomain.okta.com).

* `logoutRedirectUri`: Enter `com.first.sample:/logout` as the value, which is what you defined as the **Logout Redirect URI** in the Native app that you created in the <GuideLink link="../configure-oidc-native-apps">last step</GuideLink>. 
