---
title: Sign the CSR
---

Follow the third-party Certificate Authority (CA) process that your company uses to sign the CSR. You can't proceed to the next step until your certificate is signed using this process.

> **Note:** There is a cost associated with SSL certificates being signed by a third-party CA.

The CA that you choose provides instructions on how to upload the CSR that you generated in the previous steps.

The CSR is generated in Base64 DER format. If your process requires a different format, convert it using OpenSSL or a third-party decoder. Free, third-party decoders are readily available.

After you update the key credential, your users can't access the SAML app until you upload the new certificate to the Service Provider (SP).

<NextSectionLink/>
