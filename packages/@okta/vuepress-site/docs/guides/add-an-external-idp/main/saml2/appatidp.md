Access the external SAML Identity Provider (IdP) you want to integrate with and gather the following information. You use this information to configure the SAML Identity Provider in Okta in the next step. Make sure the SAML IdP supports Service Provider-initiated SAML.

> **Note:** If you need a quick and easy SAML IdP to use for testing purposes, you can try using this [SAML Identity Provider on GitHub](https://github.com/mcguinness/saml-idp).

Sometimes the Issuer, Single Sign-On URL, and Certificate aren't available from the external IdP until the metadata (the Assertion Consumer Service URL (ACS URL) and Audience URI) is uploaded to the external IdP. And, the ACS URL and Audience URI values aren't available until the IdP in Okta is configured. If that is the case with your external IdP, continue to the next step.

* **IdP Issuer URI**: The issuer URI of the IdP. This value is usually the SAML Metadata `entityID` of the IdP `EntityDescriptor`.
* **IdP Single Sign-On URL**: The binding specific IdP authentication request protocol endpoint that receives SAML AuthN Request messages from Okta.
* **IdP Signature Certificate**: The PEM or DER encoded public key certificate of the Identity Provider used to verify SAML message and assertion signatures.
