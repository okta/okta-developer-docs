---
title: Overview
---

Okta Admins can upload their own SAML certificates to sign the assertion for Outbound SAML apps and to sign the AuthNRequest and decrypt the assertion for Inbound SAML.

**Note:** Okta as a SAML SP is referred to as Inbound SAML. Okta as a SAML IdP is referred to as Outbound SAML.

## Prerequisite

To use your own SAML certificate, update the key credential for the affected apps or IdPs.

### Outbound and Inbound SAML Applications

The general procedure is the same for Outbound and Inbound SAML application; however, some of the api calls are different, as described in the steps below. The general procedure contains the following seven steps:

  1. [List your apps](#step-1-list-your-apps)
  2. [Generate a certificate signing request (CSR)](#step-2-generate-a-csr)
  3. [Sign the CSR](#step-3-sign-the-csr)
  4. [Publish the CSR](#step-4-publish-the-csr)
  5. [Update the key credential for the app to specify the new certificate](#step-5-update-the-key-credential)
  6. [Clone the certificate (optional)](#step-6-clone-the-certificate-optional)
  7. [Upload the new certificate to the ISV](#step-7-upload-the-new-certificate-to-the-isv)

> **Important:** In the third step, use your own process to sign the CSR. You can't move to step four until the process is completed.

For information on using the Postman REST API test client for these steps, see [Get Started with the Okta REST APIs](/code/rest/).

<NextSectionLink/>
