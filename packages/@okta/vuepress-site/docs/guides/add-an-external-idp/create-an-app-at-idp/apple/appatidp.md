Using Apple as an external Identity Provider involves multiple steps at the Apple Developer Portal. These steps assume that you already have a standard Apple developer account.

> **Note:** See the [Apple Developer Portal](https://developer.apple.com/) for more information on registering for a developer account.

## Create an App ID

note here about in case Apple's UI or steps have changed, see Apple's documentation? (https://developer.apple.com/sign-in-with-apple/get-started/)

1. Access your account's [Apple Developer Dashboard](https://developer.apple.com/).

2. From the left navigation, click **Certificates, IDs, & Profiles**.

3. From the left, select **Identifiers** and then click the blue plus icon to add an Identity Provider.

4. Select **App IDs** if it isn't already selected and click **Continue**. An App ID enables your app to access available services and identifies your app in a provisioning profile with Apple.

5. Enter a description and a Bundle ID for the App ID. Apple recommends using a reverse-domain name style string for the Bundle ID (for example, if the domain the app runs on is `example.com`, then enter `com.example` as the Bundle ID.) ??What is a Bundle ID used for??

> **Note:** You can't edit this identifier after you create it, you can only remove it and create a new one.

6. Scroll down and select **Sign In with Apple**.

7. Click **Continue** and then **Register**.

## Create a Services ID

1. Create another Identifier, this time selecting **Services IDs**. The Services ID identifies the particular instance of your app and is used as the OAuth `client_id`.

2. After you click **Continue**, enter a name for the app in the **Description** box. This is what the user sees during the sign-in flow.

3. In the **Identifier** box, enter the identifier in a reverse-domain name style string. This identifier becomes the OAuth `client_id`.

4. Click **Continue** and then **Register**.

5. On the Identifiers page, select the identifier that you just created.

6. Select **Sign In with Apple** and then click **Configure** to define the domain your app is running on and the redirect URLs used during OAuth flow.

7. If it isn't already selected, select the App ID that you just created from the **Primary App ID** drop-down list.

8. Enter the domain name where your app runs in the **Domains and Subdomains** box. Be sure to enter a real domain. Domains such as `localhost` or IP addresses such as `127.0.0.1` won't work.

6. In the **Return URLs** box, enter the redirect URL where you want to redirect users after successfully signing in to your website.

7. Click **Next**, **Done**, **Continue**, and then **Save**.

## Create a Private Key for Client Authentication

Apple uses a public/private key pair as the client secret. Register a new private key with Apple.

1. On the **Certificates, Identifiers, & Profiles** page, select **Keys** and then **Create a key**.

2. Give your key a name, select the **Sign In with Apple** check box, and click **Configure**.

3. Select your App ID from the **Primary App ID** drop-down box and click **Save**. Apple generates a new private key.

4. Click **Continue** and then **Register**.

5. Click **Download**. The file that you download has a `.p8` extension. Since it's just text, rename it with a `.txt ` extension. ??Do they NEED to do this??

    > **Important:** Make sure that you save the downloaded key file because you can't get it back later. Apple removes the server copy, so you can only download the key file once.

6. Click **Done**.

7. On the **Keys** page, click the key that you just made to obtain the Key ID that you need in the next step.

## Generate the Client Secret

More information on generating the client secret at Apple (https://developer.apple.com/documentation/sign_in_with_apple/generate_and_validate_tokens)

Apple requires that you derive a client secret yourself from your private key using the ES256 JWT algorithm (an elliptic curve algorithm with a P-256 curve and SHA256 hash). You need the following information to create this JWT:

* `iss` &mdash; The issuer of the token. This value must be the 10 character (alphanumeric) Team ID from your Apple developer account. This can be found in the upper-right corner of your Apple developer dashboard just below your account name.
* `iat` &mdash; indicates the time at which you generated the client secret, in terms of number of seconds since Epoch, in UTC
exp - identifies the time on or after which the client secret expires. The value must not be greater than 15777000 (6 months in seconds) from the Current Unix Time on the server 
aud - identifies the recipient for which the client secret is intended. Since the client secret is sent to the validation server, use `https://appleid.apple.com`
sub - identifiees the principal that is the subject of the client secret. Since this client secretis meant for y our application, use the same value as the `client_id`. 

* Key file &mdash; The file that you downloaded from Apple
* client_id &mdash; The identifier that you create when you created the Services ID. (sub)
* key_id &mdash; The ID generated by Apple when you created the Key (kid)


Header

```JSON
{
    "alg": "ES256",
    "kid": "UJ66XZ6J6S",
}
```

Payload
```JSON
{
    "iss": "ESA",
    "d": "blah",
    "e": "AQAB",
    "use": "sig",
    "kid": "UJ66XZ6J6S",
    "alg": "ES256",
    "n": "blah",
}
```