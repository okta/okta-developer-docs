---
title: Overview
---

Okta Admins can upload their own SAML certificates to sign the assertion for Outbound SAML apps and to sign the AuthN request and decrypt the assertion for Inbound SAML.

> **Note:** Okta as a SAML Service Provider is referred to as Inbound SAML. Okta as a SAML Idenityt Provider (IdP) is referred to as Outbound SAML.

## Prerequisite

To use your own SAML certificate, update the key credential for the affected apps or IdPs.

### Outbound and Inbound SAML Applications

The general procedure is the same for both the Outbound and Inbound SAML applications. However, some of the API calls are different as described in the steps below. The general procedure contains the following seven steps:

  1. [List your apps](/docs/guides/sign-your-own-saml-csr/list-your-apps/)
  2. [Generate a certificate signing request (CSR)](/docs/guides/sign-your-own-saml-csr/generate-a-csr/)
  3. [Sign the CSR](/docs/guides/sign-your-own-saml-csr/sign-the-csr/)
  4. [Publish the CSR](/docs/guides/sign-your-own-saml-csr/publish-the-csr/)
  5. [Update the key credential for the app to specify the new certificate](/docs/guides/sign-your-own-saml-csr/update-the-key-credential/)
  6. [Clone the certificate (optional)](/docs/guides/sign-your-own-saml-csr/clone-the-certificate/)
  7. [Upload the new certificate to the ISV](/docs/guides/sign-your-own-saml-csr/upload-the-certificate/)

> **Important:** In the third step, use your own process to sign the CSR. You can't move to step four until the process is completed.

For information on using the Postman REST API test client for these steps, see [Get Started with the Okta REST APIs](/code/rest/).

<NextSectionLink/>
