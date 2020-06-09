These steps assume that you already have a [standard Apple developer account](https://developer.apple.com/).

> **Note:** See [Sign in with Apple](https://help.apple.com/developer-account/#/devde676e696) for Apple's configuration information.

There are three steps necessary to configure the Identity Provider at Apple:

* **Create an App ID** &mdash; An App ID enables your app to access available services and identifies your app in a provisioning profile with Apple.
* **Create a Services ID** &mdash; The Services ID identifies the particular instance of your app. The Services ID is used as the OAuth `client_id`.
* **Create a private key for client authentication** &mdash; Apple uses a public/private key pair as the client secret. You must register a new private key with Apple and download the key file for use with Okta.

## Create an App ID

1. From the [Apple Developer Dashboard](https://developer.apple.com/) left navigation, click **Certificates, IDs, & Profiles**.

2. Select **Identifiers** from the left and then click the blue plus icon.

3. Select **App IDs** if it isn't already selected, and then click **Continue**.

4. Enter a description and a Bundle ID for the App ID. Apple recommends using a reverse-domain name style string for the Bundle ID (for example, if the domain your app runs on is `example.com`, then enter `com.example` as the Bundle ID.)

    > **Note:** You can't edit this identifier after you create it, you can only remove it and create a new one.

5. Scroll down and select the **Sign In with Apple** check box, click **Continue**, and then **Register**.

## Create a Services ID

1. On the **Identifiers** page, click the blue plus icon, and select **Services IDs**.

2. After you click **Continue**, enter a name for the identifier in the **Description** box. This is what the user sees when they sign in.

3. In the **Identifier** box, enter the identifier in a reverse-domain name style string (for example, if the domain your app runs on is `example.com`, then enter `com.example.client` as the identifier.). This identifier becomes the OAuth `client_id`.

    > **Note:** The **Services ID** identifier can't be the same as the **App ID** identifier.

4. Click **Continue** and then **Register**. The **Identifiers** page appears.

5. Select the identifier that you just created.

6. Select the **Sign In with Apple** check box, and then click **Configure** to define the domain your app is running on and the redirect URLs used during the OAuth flow.

7. If it isn't already selected, select the App ID that you just created from the **Primary App ID** drop-down box.

8. Enter the domain name where your app runs in the **Domains and Subdomains** box. Be sure to enter a real domain. Domains such as `localhost` or IP addresses such as `127.0.0.1` won't work.

9. In the **Return URLs** box, paste the Okta redirect URI into the **Return URLs** box. The redirect URI sent in the authorize request from the client needs to match the redirect URI in the Identity Provider (IdP). This is the URL where the IdP returns the authentication response (the access token and the ID token). It needs to be a secure domain that you own. This URL has the same structure for most Identity Providers in Okta and is constructed using your Okta subdomain and then the callback endpoint.

    For example, if your Okta subdomain is called `company`, then the URL would be: `https://company.okta.com/oauth2/v1/authorize/callback`. If you have configured a custom domain in your Okta Org, use that value to construct your redirect URI, such as `login.company.com/oauth2/v1/authorize/callback`.

10. Click **Next**, **Done**, **Continue**, and then **Save**.

## Create a private key for client authentication

 Register a new private key for sign in with Apple.

1. On the **Certificates, Identifiers, & Profiles** page, select **Keys** and then **Create a key**.

2. Give your key a name, select the **Sign In with Apple** check box, and click **Configure**.

3. Select your App ID from the **Primary App ID** drop-down box and click **Save**. Apple generates a new private key.

4. Click **Continue**, **Register**, and then **Download**.

    > **Important:** Make sure that you save the downloaded key file because you can't get it back later. Apple removes the server copy, so you can only download the key file once.

5. Click **Done**, and then on the **Keys** page, click the key that you just created and make note of the Key ID. You need it in the <GuideLink link="../configure-idp-in-okta">next section</GuideLink>.

6. Make note of the Team ID, which is a 10 character (alphanumeric) ID in your Apple developer account. You can find this ID in the upper-right corner of your Apple developer dashboard just below your account name.
