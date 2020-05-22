These steps assume that you already have an Apple developer account. Go to the [Apple Developer Portal](https://developer.apple.com/) and register for a developer account if you haven't already done so.

1. Access your [Apple Developer Dashboard](https://developer.apple.com/).

2. From the left navigation, click **Certificates, Identifiers & Profiles**. 

3. From the left, select **Identifiers** and then click the blue plus icon to add an identity provider.

4. Select **App IDs** and **Continue**. An App ID enables your app to access available services and identify your app in a provisioning profile.

5. Enter a description and a Bundle ID for the App ID. Apple recommends using a reverse-domain name style string for the Bundle ID (for example, if the domain the app runs on is `example.com`, then you would enter `com.example` as the Bundle ID.) What is a Bundle ID used for?

6. Scroll down and select **Sign In with Apple**.

7. Create another Identifier, this time selecting **Services ID**. The Services ID identifies the particular instance of your app and is used as the OAuth `client_id`.

8. After clicking Continue, in the **Description** box enter a name for the app. This is what the user sees during the sign-in flow.

9. In the **Identifier** box, enter the identifier in a reverse-domain name style string. This identifier becomes the OAuth `client_id`.

10. Scroll down and select **Sign In with Apple** and then click **Configure** to define the domain your app is running on and the redirect URLs used during OAuth flow.

11. Select your associated App ID from the **Primary App ID** drop-down list and enter the domain name where your app runs. Be sure to enter a real domain, domains such as localhost or IP addresses such as 127.0.0.1 won't work.

12. Enter the redirect URL to redirect users after successfully signing in to your website.





> **Note:** There may be additional settings on the [Facebook App Dashboard](https://developers.facebook.com/apps) that you can configure for the app. The steps in this guide address the quickest route to setting up Facebook as an Identity Provider with Okta. See the Facebook documentation for more information on additional configuration settings.