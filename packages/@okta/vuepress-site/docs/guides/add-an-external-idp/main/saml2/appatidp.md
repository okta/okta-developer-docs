Access the external SAML IdP you want to integrate with and gather the following information:

* **IdP Issuer URI**: The issuer URI of the IdP. This value is usually the SAML metadata `entityID` of the IdP `EntityDescriptor`.
* **IdP Single Sign-On URL**: The binding specific IdP authentication request endpoint that receives SAML AuthN request messages from Okta.
* **IdP Signature Certificate**: The PEM or DER encoded public key certificate of the IdP that's used to verify SAML message and assertion signatures.

Use this information to configure the SAML IdP in Okta in the next step. Ensure the SAML IdP supports Service Provider-initiated SAML.

If you don't have the issuer URI, SSO URL, and certificate values, continue to the [next step](#create-an-identity-provider-in-okta) to generate the SAML metadata. The external IdP requires the ACS URI and audience URI, which are included in the generated metadata. Upload the metadata to your external IdP to obtain the issuer, single sign-on URL, and certificate values.

> **Note:** If you need a quick and easy SAML IdP to use for testing purposes, you can use this [SAML Identity Provider on GitHub](https://github.com/mcguinness/saml-idp).