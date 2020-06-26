---
title: Reverting to a Previous Certificate
---


You can revert the settings to use the previous certificate by rolling
over the app key to specify the certificate you previously associated with your integration. You need to know the previous value of `credential.signing.kid` you collected earlier for the app.

>**Note:** After you complete step 1, your users can't access the SAML app until you complete step 2.

#### Step 1: Update the key credential for the application with the SHA1 certificate.

Use the [Apps API](/docs/reference/api/apps/#update-key-credential-for-application)
to update the key credential for the application to specify the previous kid value.

#### Step 2: Upload the SHA1 certificate to the ISV.

1. In the administrator UI, select **Applications** and choose your app.
2. Select **Sign-On Options**.
3. Click **View Setup Instructions**, as shown below.<br/>![Accessing SAML Setup Instructions](/img/saml_setup_link.png)
4. Perform the setup for your app again, using the instructions provided. During this setup, you will upload the certificate in a specified format, the metadata, or the certificate fingerprint.

