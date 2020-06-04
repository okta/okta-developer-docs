Using Apple as an external Identity Provider involves multiple steps at the Apple Developer Portal. These steps assume that you already have a [standard Apple developer account](https://developer.apple.com/).

> **Note:** See [Sign in with Apple](https://help.apple.com/developer-account/#/devde676e696) for Apple's content on setting this up.

There are three steps to complete to configure the Identity Provider at Apple:

* **Create an App ID** &mdash; An App ID enables your app to access available services and identifies your app in a provisioning profile with Apple.
* **Create a Services ID** &mdash; The Services ID identifies the particular instance of your app and its identifier is used as the OAuth `client_id`.
* **Create a private key for client authentication** &mdash; Apple uses a public/private key pair as the client secret. You must register a new private key with Apple and download the key file for use with Okta.

## Create an App ID

1. From the [Apple Developer Dashboard](https://developer.apple.com/) left navigation, click **Certificates, IDs, & Profiles**.

2. Select **Identifiers** from the left and then click the blue plus icon.

3. Select **App IDs** if it isn't already selected, and then click **Continue**.

4. Enter a description and a Bundle ID for the App ID. Apple recommends using a reverse-domain name style string for the Bundle ID (for example, if the domain the app runs on is `example.com`, then enter `com.example` as the Bundle ID.)

    > **Note:** You can't edit this identifier after you create it, you can only remove it and create a new one.

5. Scroll down and select the **Sign In with Apple** check box, click **Continue**, and then **Register**.

## Create a Services ID

1. Create another identifier, this time selecting **Services IDs** from the drop-down box on the right.

2. After you click **Continue**, enter a name for the identifier in the **Description** box. This is what the user sees when they sign in.

3. In the **Identifier** box, enter the identifier in a reverse-domain name style string (for example, if the domain the app runs on is `example.com`, then enter `com.example.client` as the Bundle ID. ). This identifier becomes the OAuth `client_id`.

    > **Note:** The **Services ID** identifier can't be the same as the **App ID** identifier.

4. Click **Continue** and then **Register**. The **Identifiers** page appears. 

5. Select the identifier that you just created.

6. Scroll down and select the **Sign In with Apple** check box, and then click **Configure** to define the domain your app is running on and the redirect URLs used during the OAuth flow.

7. If it isn't already selected, select the App ID that you just created from the **Primary App ID** drop-down box.

8. Enter the domain name where your app runs in the **Domains and Subdomains** box. Be sure to enter a real domain. Domains such as `localhost` or IP addresses such as `127.0.0.1` won't work.

6. In the **Return URLs** box, enter a placeholder redirect URL such as `https://example-app.com/redirect`. We come back and add the correct redirect URL later. The redirect URL is where you want to redirect users after successfully signing in to your website.

7. Click **Next**, **Done**, **Continue**, and then **Save**.

## Create a Private Key for Client Authentication

Apple uses a public/private key pair as the client secret. Register a new private key with Apple. 

1. On the **Certificates, Identifiers, & Profiles** page, select **Keys** and then **Create a key**.

2. Give your key a name, select the **Sign In with Apple** check box, and click **Configure**.

3. Select your App ID from the **Primary App ID** drop-down box and click **Save**. Apple generates a new private key.

4. Click **Continue**, **Register**, and then **Download**. The file that you download has a `.p8` extension.

    > **Important:** Make sure that you save the downloaded key file because you can't get it back later. Apple removes the server copy, so you can only download the key file once.

5. Click **Done**, and then on the **Keys** page, click the key that you just created to make note of the Key ID that you need in the <GuideLink link="../configure-idp-in-okta">next section</GuideLink>.

6. Make note of the Team ID, which is a 10 character (alphanumeric) ID in your Apple developer account. You can find this ID in the upper-right corner of your Apple developer dashboard just below your account name.
