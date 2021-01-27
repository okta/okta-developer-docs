---
title: Gather information
---
Before you get started, make sure that you have the following information:

* A domain that you own, for example, `example.com`.
* A subdomain that you want to use, for example, `login.example.com`.
* A valid TLS certificate for your subdomain. If you don't have one, you can generate one with a service such as:
  * [ZeroSSL](https://zerossl.com/)
  
    If you want to use ZeroSSL follow [this guide](https://www.logic2020.com/insight/tactical/how-to-set-up-okta-custom-url-domain?utm_source=social&utm_medium=Twitter&utm_campaign=Insight_Okta_Custom_URL), since ZeroSSL through the web does not support 2048-bit private keys.
  
  * [Let's Encrypt](https://letsencrypt.org/)

    Make sure that you have the TLS certificate (PEM-encoded) for your subdomain and the 2048-bit private key (PEM-encoded) before beginning.

    Okta performs validation checks on the certificate that you upload. If your TLS certificate is a wildcard certificate, it must include the full URL in the Common Name (CN) or Subject Alternative Name (SAN) when it is generated. Otherwise, the following error occurs when you attempt to upload the certificate:

    `The specified certificate does not match your Custom URL Domain.`

    If you receive the above error, consult with the person in your organization responsible for generating certificates to determine whether your TLS certificate is a wildcard certificate.

<NextSectionLink/>
