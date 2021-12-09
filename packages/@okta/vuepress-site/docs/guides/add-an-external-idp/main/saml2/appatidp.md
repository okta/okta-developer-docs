Access the external <StackSelector snippet="idp" noSelector inline /> Identity Provider that you want to integrate with and gather the following information for use in configuring the SAML Identity Provider in Okta in the next step. Make sure that the <StackSelector snippet="idp" noSelector inline /> Identity Provider supports Service Provider-initiated <StackSelector snippet="idp" noSelector inline />.

> **Note:** If you need a quick and easy <StackSelector snippet="idp" noSelector inline /> Identity Provider to use for testing purposes, you can try using this [<StackSelector snippet="idp" noSelector inline /> Identity Provider on GitHub](https://github.com/mcguinness/saml-idp).

Sometimes the Issuer, Single Sign-On URL, and Certificate aren't available from the external IdP until the metadata (the Assertion Consumer Service URL (ACS URL) and Audience URI) is uploaded to the external IdP. And, the ACS URL and Audience URI values aren't available until the IdP in Okta is configured. If that is the case with your external IdP, continue to the next step.

* **IdP Issuer URI**: The issuer URI of the Identity Provider. This value is usually the <StackSnippet snippet="idp" inline /> Metadata `entityID` of the Identity Provider `EntityDescriptor`.
* **IdP Single Sign-On URL**: The binding specific Identity Provider Authentication Request Protocol endpoint that receives <StackSnippet snippet="idp" inline /> AuthN Request messages from Okta.
* **IdP Signature Certificate**: The PEM or DER encoded public key certificate of the Identity Provider used to verify <StackSnippet snippet="idp" inline /> message and assertion signatures.
