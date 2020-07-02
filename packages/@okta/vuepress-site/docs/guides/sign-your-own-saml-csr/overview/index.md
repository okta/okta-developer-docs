---
title: Overview
---

Okta Admins can upload their own SAML certificates to sign the assertion for Outbound SAML apps and to sign the AuthN request and decrypt the assertion for Inbound SAML.

> **Note:** Okta as a SAML Service Provider is referred to as Inbound SAML. Okta as a SAML Identity Provider (IdP) is referred to as Outbound SAML.

## Prerequisite

To use your own SAML certificate, update the key credential for the affected apps or IdPs.

### Outbound and Inbound SAML Applications

The general procedure is the same for both the Outbound and Inbound SAML applications. However, some of the API calls are different as described in the steps below. The general procedure contains the following steps:

* [List your apps](/docs/guides/sign-your-own-saml-csr/list-your-apps/)
* [Generate a certificate signing request (CSR)](/docs/guides/sign-your-own-saml-csr/generate-a-csr/)
* [Sign the CSR](/docs/guides/sign-your-own-saml-csr/sign-the-csr/)
* [Publish the CSR](/docs/guides/sign-your-own-saml-csr/publish-the-csr/)
* [Update the key credential for the app to specify the new certificate](/docs/guides/sign-your-own-saml-csr/update-the-key-credential/)
* [Clone the certificate (optional)](/docs/guides/sign-your-own-saml-csr/clone-the-certificate/)
* [Upload the new certificate to the ISV](/docs/guides/sign-your-own-saml-csr/upload-the-certificate/)

> **Note:** After you update the key credential, your users can't access the SAML app until you upload the new certificate to the ISV.

For information on using the Postman REST API test client for these steps, see [Get Started with the Okta REST APIs](/code/rest/).

<NextSectionLink/>
