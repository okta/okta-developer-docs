---
title: 'Acronym Party: HTTPS/SSL/TLS - Transport Layer Security'
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/tls/">&larr; Transport Layer Security</a></div>

## Acronym Party: HTTPS/SSL/TLS {#tls-acronyms}

Now that we're up to speed on the basics of key exchange, let's discuss some of the acronyms you'll see throughout this discussion:

* **HTTPS**, also called HTTP over SSL/TLS, is an extension of HTTP which encrypts communication. HTTPS URLs begin with "https://" and use port 443 by default. This is an improvement over HTTP, which is vulnerable to eavesdropping and man-in-the-middle attacks.
* **SSL** or Secure Sockets Layer was released by Netscape in 1995. SSL adoption increased after the redesigned SSL 3.0 was released in 1996. The IETF prohibited SSL 2.0 in 2011. SSL 3.0 was prohibited in 2015 after the IETF identified various security vulnerabilities which affected all SSL 3.0 ciphers.
* **TLS** or Transport Layer Security is the successor to SSL. In fact, the documentation for TLS 1.0 describes it as an "upgrade" of SSL 3.0. The current TLS version is 1.3. Although virtually all HTTPS-secured traffic uses TLS due to problems with SSL, the SSL nomenclature persists in internet culture. These days, when somebody says SSL, it is likely they mean TLS.

In this article, I use "SSL/TLS" to avoid ambiguity that the term SSL causes. However, your implementations should always use TLS.
