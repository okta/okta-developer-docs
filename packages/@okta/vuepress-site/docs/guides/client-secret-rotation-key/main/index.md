---
title: Client secret rotation and key management
meta:
  - name: description
    content: Okta client secret rotation helps you rotate and manage your client secrets without service or app downtime. Additionally, you can generate public/private key pairs and manage them using the Admin Console.
layout: Guides
sections:
- main
---

This guide shows you how to rotate and manage your client secrets without service or app downtime. Additionally, this guide shows you how to generate public/private key pairs and manage them using the Admin Console.

---

**Learning outcomes**

* Create additional client secrets for a client app and manage existing client secrets.
* Generate public/private key pairs for a client app using the Admin Console and manage additional key pairs.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* **OAuth secrets and key management** feature enabled in the Admin Console (**Settings** | **Features**)
* Access to the new APIs: Client Secret Management `/api/v1/apps/{appId}//credentials/secrets` and JWKS Management `/api/v1/apps/{appId}/credentials/jwks`
* An existing OpenID Connect client app in Okta for testing in Okta
[Postman client](https://www.getpostman.com/downloads/) to test requests. See [Get Started with the Okta APIs](https://developer.okta.com/docs/reference/rest/) for information on setting up Postman.
* The Client Secret Rotation and Key Management Postman collection that allows you to test the API calls that are described in this guide. Click **Run in Postman** to add the collection to Postman.

  [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/8e9d91cef0d5ab9e9fa7)

---

## About client secret rotation and public/private key pairs

Just like periodically changing passwords, regularly rotating the client secret that your app uses to authenticate is a security best practice. The challenge with rotating the client secret is to facilitate a seamless client secret rotation without service or app downtime. You need the ability to create overlapping client secrets.

Additionally, depending on what type of credentials that a [client uses to authenticate](/docs/reference/api/oidc/#client-authentication-methods), the use of a JSON Web Key (JWK) public/private key pair may be required. Apps that use private/public key pairs for client authentication have substantially higher security because the private key can only be accessed by the client. But, private/public key pair generation can be laborious and time-consuming, and using the API can lead to errors.

To make client secret rotation more seamless, you can generate an additional client secret for web apps, service apps, and native apps in the Admin Console. You can also generate a JWK public/private key pair (in JWK format) or define a JWKS URI for your app using the Admin Console.

> **Note:** Using client authentication with a client secret isn’t recommended for native apps because they are public clients. The default authorization type for native apps is **Authorization Code with PKCE**. See [Recommended flow by application type](/docs/concepts/oauth-openid/#recommended-flow-by-application-type) and [Implement authorization by grant type](https://developer.okta.com/docs/guides/implement-grant-type/authcodepkce/main/) for more information on the type of flow to use for your app and how to implement that flow.

### About the Postman collection

It is up to you how you make requests to the APIs to generate client secrets and manage JWKs. In this guide, we provide examples of the required API calls using a Postman collection to demonstrate them in a language/platform neutral way. The collection contains two sub-collections: Secret Management API for client secret generation and management tasks and JSON Web Key (JWK) Management API for key management tasks.

## Rotate a client secret

When you are ready to rotate a client secret for an app, follow these steps:

1. Sign in to your Okta organization with your administrator account and go to **Applications** > **Applications**.

2. Select the OpenID Connect app that you want to rotate the client secret for, and then click **Edit** in the **Client Credentials** section.

3. In the **CLIENT SECRETS** section, click **Generate new secret** to create a client secret as a backup to your existing one. A second secret appears with the creation date. The maximum number of secrets that you can generate is two for each app.

    > **Note:** You can try this in Postman using the **Add a client secret: auto-generated** request.

    When you generate a new secret, the original secret remains in **Active** status. Both secrets are stored in parallel, allowing clients to continue using the old secret during secret rotation. Any requests for a secret return the newly generated client secret, but any requests that are sent using the previous secret still work until the status of that client secret is set to **Inactive**.

4. [Update your web app](/docs/guides/sign-into-web-app-redirect/-/main/#configure-your-app) to start using the newly generated client secret.

5. Test your app and ensure that all functionality works with the newly generated client secret.

6. After you update the client secret, return to the **Client secrets** section for the app and change the old client secret status from **Active** to **Inactive**.

    > **Note:** You can try this in Postman using the **Deactivate a client secret** request.

7. Revalidate that your app works after changing the old client secret status to rule out any possibility that your app is using older credentials. Should there be any issues with your app, you can change the status of the old client secret back to **Active** and troubleshoot.

8. After revalidation is successful, you can then delete the old secret using the Admin Console by changing the status of the old secret from **Inactive** to **Delete**. This ensures that the older secret isn’t used by mistake.

    > **Note:** You can try this in Postman using the **Delete a client secret** request.

    > **Note:** If you turn off the **OAuth secrets and key management** feature in your org, and you have two secrets for an app, Okta retains the secret with the most recent **Creation date**.

## Generate JWK Key Pairs

To use the Admin Console to generate a JWK key pair for your app for testing, follow these steps:

> **Note:** Use the Admin Console to generate a JWK public/private key pair for testing purposes only. For a production use case, use your own internal instance of the key pair generator. See this [key pair generator](https://github.com/mitreid-connect/mkjwk.org) for an example.

1. Sign in to your Okta organization with your administrator account and go to **Applications** > **Applications**.

2. Select the OpenID Connect app that you want to generate a JWK for, and in the **Client Credentials** section of the **General** tab, click **Edit**.

3. Select **Public key/Private key** as the **Client authentication** method.

    > **Note:** When you switch the client authentication method to **Public key/Private key**, any existing client secrets are deleted.

    > **Note:** You can try this in Postman using the **Update client auth method** request.

4. Choose how you want to store the JWK and then use the next sections to complete the steps.
    * **Save keys in Okta**: Copy your public keys into Okta
    * **Use a URL to fetch keys dynamically**: Define the URI where you host your public keys

### Save keys in Okta

This option allows you to bring your own keys or use the Okta key generator. There is no limit to the number of JWKs that you can add for an app.

1. Leave the default of **Save keys in Okta**, and then click **Add key**.
2. Click **Add** and in the **Add a public key** dialog, either paste your own public key or click **Generate new key** to auto-generate a new 2048 bit RSA key:

    * Paste your own public key into the box. Be sure to include a `kid` as all keys in the JWKS must have a unique ID.<br><br>
    **OR**<br>
    * Click **Generate new key** and the public and private keys appear in JWK format.

        Some Okta SDKs require that keys be in Privacy Enhanced Mail (PEM) format. If you are working with an Okta SDK that requires this format, click **PEM**. The private key appears in PEM format.

        This is your only opportunity to save the private key. Click **Copy to clipboard** to copy the private key and store it somewhere safe.

3. Click **Done**. The new public key is now registered with the app and appears in a table in the **PUBLIC KEYS** section of the **General** tab.

4. Click **Save**. A message states that the client authentication method is changing to **Public key/Private key**. Any existing client secrets for the app are deleted. Click **Save** to continue.

### Use a URL to fetch keys dynamically

This option allows you to host your public key in a URI and paste the link to the public key in the Admin Console. This URL contains public keys that clients can use to verify the signature of client-based access tokens and OpenID Connect ID tokens. By hosting the keys in a URL, you can conveniently rotate the keys without having to update the app configuration every time. Okta dynamically fetches the latest public key for the app, which eliminates the need to manually update the public key in the Admin Console when you’re rotating the key pair.

> **Note:** If you switch from saving keys in Okta to using a URL to fetch keys dynamically, any saved public keys are deleted.

1. After you select **Use a URL to fetch keys dynamically**, enter the URL where you are hosting your public key in the **URL** box, for example: `https:/${yourOktaDomain}/oauth2/v1/keys`.

    > **Note:** You can try this in Postman using the **Add a JWK URI** request.

2. Click **Save**.

## JWK management

To add more keys, deactivate a key, or delete a key, follow these steps:

1. Sign in to your Okta organization with your administrator account and go to **Applications** > **Applications**.

2. Select the OpenID Connect app that you want to manage keys for, and then click **Add** in the **PUBLIC KEYS** section to add another public key.

3. Click **Add** and in the **Add a public key** dialog, either paste your own public key or click **Generate new key** to auto-generate a new 2048 bit RSA key:

    * Paste your own public key into the box. Be sure to include a `kid` as all keys in the JWKS must have a unique ID.<br><br>
    **OR**<br>
    * Click **Generate new key** and the public and private keys appear in JWK format.

        Some Okta SDKs require that keys be in Privacy Enhanced Mail (PEM) format. If you are working with an Okta SDK that requires this format, click **PEM**. The private key appears in PEM format.

        This is your only opportunity to save the private key. Click **Copy to clipboard** to copy the private key and store it somewhere safe.

4. Click **Save**. The new public key is now registered with the app and appears in the **Public keys** table.

5. When you are ready to retire a public key, change the old JWK status from **Active** to **Inactive**.

    > **Note:** You can try this in Postman using the **Deactivate a JWK** request.

6. You can then delete the old key using the Admin Console by changing the status of the old key from **Inactive** to **Delete**. This ensures that the older key isn’t used by mistake.

    > **Note:** You can try this in Postman using the **Delete a JWK** request.

## See also

* [Build a JWT for client authentication](/docs/guides/build-self-signed-jwt/java/main/)
* [OpenID Connect and OAuth 2.0 API /key endpoint](/docs/reference/api/oidc/#keys)
* [Implement OAuth for Okta with a service app](/docs/guides/implement-oauth-for-okta-serviceapp/main/)
