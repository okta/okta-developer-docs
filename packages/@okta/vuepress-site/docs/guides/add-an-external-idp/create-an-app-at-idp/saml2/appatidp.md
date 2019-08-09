Access the external SAML Identity Provider that you want integrate with and gather the following information to configure the SAML Identity Provider in Okta in the next step. Make sure that the SAML Identity Provider supports Service Provider-initiated SAML.

> Note: If you need a quick an easy SAML Identity Provider to use for testing purposes, you can try using this [SAML Identity Provider on GitHub](https://github.com/mcguinness/saml-idp).

* **IdP Issuer URI** - The issuer URI of the Identity Provider. This value is usually the SAML Metadata `entityID` of the Identity Provider `EntityDescriptor`.
* **IdP Single Sign-On URL** - The binding specific Identity Provider Authentication Request Protocol endpoint that receives SAML AuthN Request messages from Okta.
* **IdP Signature Certificate** - The PEM or DER encoded public key certificate of the Identity Provider used to verify SAML message and assertion signatures.