Create an external SAML Identity Provider that supports Service Provider-initiated SAML. If you need a quick an easy SAML Identity Provider to use for testing purposes, you can try using this [SAML Identity Provider on GitHub](https://github.com/mcguinness/saml-idp).

You need the following information from the SAML Identity Provider app to configure the SAML Identity Provider in Okta in the next step:

* **IdP Issuer URI** - The issuer URI of the Identity Provider. This value is usually the SAML Metadata `entityID` of the Identity Provider `EntityDescriptor`.
* **IdP Single Sign-On URL** - The binding specific Identity Provider Authentication Request Protocol endpoint that receives SAML AuthN Request messages from Okta.
* **IdP Signature Certificate** - The PEM or DER encoded public key certificate of the Identity Provider used to verify SAML message and assertion signatures.