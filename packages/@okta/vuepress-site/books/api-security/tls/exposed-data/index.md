---
title: Exposed Data over SSL/TLS - Transport Layer Security
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/tls/">&larr; Transport Layer Security</a></div>

## Exposed Data over SSL/TLS {#tls-exposed-data}

TLS aims to provide data integrity and privacy between two trusted parties. Information exchanged over the latest version of TLS should be secure from being exposed to third parties in unencrypted form. Additionally, third parties should be unable to modify that information: this is the concept of data integrity, and is the reason an integrity check is performed on each message.

However, even though application data transmitted over a properly-established TLS connection is secure, some metadata and connection information is necessarily exposed to third parties. Without additional obfuscation outside of the scope of SSL/TLS, an observer will be able to discover:

* **The IP addresses of the client and server.** Since the client and server are communicating over TCP/IP, which operates at a lower level than the TLS protocol, these IP addresses are public and are used for routing the encrypted packets.
* **The server certificate**, including the server name. Since the server sends the certificate to the client as a part of the handshake process before encrypted messages are sent, an observer of the handshake will see the certificate in plain text.
* **The approximate length of the URL and payload.** Although the application data is encrypted, an astute observer of an HTTPS connection will be able to deduce the length of the URL requested and the approximate size of any non-cached assets. Cached assets, since they reside on the client already, are not vulnerable to this introspection until the cache expires and they are re-fetched.

In addition to the data listed above, additional information may be inferred based on the timing of network requests. Outdated SSL/TLS versions have additional identified vulnerabilities, and in the future one must anticipate the TLS spec will be versioned to ameliorate any vulnerabilities identified in the future.
