Access the external SAML IdP you want to integrate with and gather the following information. Use this information to configure the SAML IdP in Okta in the next step. Ensure the SAML IdP supports Service Provider-initiated SAML.

> **Note:** If you need a quick and easy SAML IdP to use for testing purposes, you can use this [SAML Identity Provider on GitHub](https://github.com/mcguinness/saml-idp).

When you set up an external IdP, sometimes the **Issuer**, **Single Sign-On URL**, and **Certificate** values aren't available. This information may not be available until the metadata is uploaded to the IdP. Also, the ACS URL and Audience URI values aren't available until you configure the IdP in Okta. If that's the case with your external IdP, continue to the [next step](#create-an-idp-in-okta).

* **IdP Issuer URI**: The issuer URI of the IdP. This value is usually the SAML metadata `entityID` of the IdP `EntityDescriptor`.
* **IdP Single Sign-On URL**: The binding specific IdP authentication request endpoint that receives SAML AuthN request messages from Okta.
* **IdP Signature Certificate**: The PEM or DER encoded public key certificate of the Identity Provider used to verify SAML message and assertion signatures.
