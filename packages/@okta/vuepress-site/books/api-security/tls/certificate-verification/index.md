---
title: Certificate Verification - Transport Layer Security
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/tls/">&larr; Transport Layer Security</a></div>

## Certificate Verification {#tls-certificate-verification}

Now that we understand the importance of trusted certificates and why certificate authorities are necessary, let's walk through the missing middle step: how a client verifies a server's SSL/TLS certificate.

First, the client gets the server's certificate as part of the SSL/TLS handshake. (If you are writing an application that is hitting an HTTPS API endpoint, this step happens before any application data is exchanged.)

The client checks to ensure that the server's certificate is not expired and that the domain name or IP address on the certificate matches the server's information. Then, the client attempts to verify that the server's certificate has been properly signed by the certificate authority who authorized it. Due to the nature of asymmetric encryption, the client is able to do this using the information within the server's response -- without even contacting the certificate authority.

It's unlikely that the server's certificate is signed directly by a root certificate authority that is trusted by the client. However, the client can trust any number of intermediate certificate authorities, as long as the trust chain eventually leads back to one of the client's trusted root certificates, as illustrated in <a href="#fig_tls_certificate_chain" class="figref"></a>.

For each intermediate certificate, the client completes the same process: it verifies the issuer's name matches the certificate owner's name, and uses the signature and public key to verify that the certificate is properly signed.

![Illustrating the chain of trust from a root CA through an intermediate certificate](/img/books/api-security/tls/images/certificate-chain.png "Illustrating the chain of trust from a root CA through an intermediate certificate")

Eventually, in a successful transaction, the client will come to a self-signed root certificate that the client implicitly trusts. At this point, the client has built a cryptographic chain of trust to the server, and the SSL/TLS handshake can proceed.
