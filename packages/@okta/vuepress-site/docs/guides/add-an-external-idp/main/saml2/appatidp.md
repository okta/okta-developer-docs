Access the external <StackSelector snippet="idp" noSelector inline /> Identity Provider that you want to integrate with and gather the following information for use in configuring the SAML Identity Provider in Okta in the next step. Make sure that the <StackSelector snippet="idp" noSelector inline /> Identity Provider supports Service Provider-initiated <StackSelector snippet="idp" noSelector inline />.

> **Note:** If you need a quick and easy <StackSelector snippet="idp" noSelector inline /> Identity Provider to use for testing purposes, you can try using this [<StackSelector snippet="idp" noSelector inline /> Identity Provider on GitHub](https://github.com/mcguinness/saml-idp).

Sometimes the Issuer, Single Sign-On URL, and Certificate aren't available from the external IdP until the metadata (the Assertion Consumer Service URL (ACS URL) and Audience URI) is uploaded to the external IdP. And, the ACS URL and Audience URI values aren't available until the IdP in Okta is configured. If that is the case with your external IdP, continue to the <GuideLink link="../configure-idp-in-okta">next step</GuideLink>.

* **IdP Issuer URI** &mdash; the issuer URI of the Identity Provider. This value is usually the <StackSelector snippet="idp" noSelector inline /> Metadata `entityID` of the Identity Provider `EntityDescriptor`.
* **IdP Single Sign-On URL** &mdash; the binding specific Identity Provider Authentication Request Protocol endpoint that receives <StackSelector snippet="idp" noSelector inline /> AuthN Request messages from Okta.
* **IdP Signature Certificate** &mdash; the PEM or DER encoded public key certificate of the Identity Provider used to verify <StackSelector snippet="idp" noSelector inline /> message and assertion signatures.
