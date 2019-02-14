---
title: Best Practices - Transport Layer Security
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/tls/">&larr; Transport Layer Security</a></div>

## Best Practices {#tls-best-practices}

Hopefully this chapter has convinced you of the ease and importance of implementing SSL/TLS into your public internet application infrastructure. However, even when using SSL/TLS, organizations can be subject to compromise if best practices are not followed. Let's go over a few of the big ones:

### 1. Use TLS Everywhere
Having certain pages served over SSL/TLS and some served unencrypted can expose data, such as unencrypted session IDs, to attackers. Similarly, don't allow TLS content to be exposed via non-TLS pages and don't mix TLS and non-TLS content on the same page.

### 2. Keep Sensitive Data out of the URL and Cache
URLs can be cached in a client's browser history or application logs and sent to another HTTPS site if the user clicks on a link. Setting TLS pages to be uncacheable prevents information leakage from the client cache.

### 3. Prevent Exposed Data over SSL/TLS
Ensure browsers and applications only access your site via HTTPS by enacting HTTP Strict Transport Security (HSTS). Servers utilizing HSTS send an HTTPS header in their response specifying that requests to their domain should only use HTTPS. An HSTS-complaint client should then make all future requests to that domain over HTTPS, even if HTTP is specified. This helps protect clients from man-in-the-middle and eavesdropping attacks that could be initiated by the client sending sensitive information by making an unsecure HTTP request. For more information, see <a href="https://www.owasp.org/index.php/HTTP_Strict_Transport_Security_Cheat_Sheet" class="url">https://www.owasp.org/index.php/HTTP_Strict_Transport_Security_Cheat_Sheet</a>.

### 4. Use HTTP Public Key Pinning
While not common in browser-to-web-server communications, HTTP Public Key Pinning is quite useful in API communication. The server will respond with an HTTP header specifying a hash of a valid public key, which helps combat certificate authority compromises. When communicating between two server-side apps, if one server has been compromised and an untrusted certificate authority is trusted, TLS compromise can happen. By having the client download and store a known-valid certificate from the server, the client can "skip" the chain-of-trust verification and instead compare the server's certificate directly to their known-good version, thereby guaranteeing authenticity and preventing any opportunity for man-in-the-middle.

### 5. Only Support Strong Protocols and Ciphers
Ensure your infrastructure uses the most recent stable version of TLS and the latest recommended ciphers. Due to evolving vulnerabilities, preferred ciphers may change over time.

OWASP maintains a nearly definitive list of best practices for SSL/TLS online at <a href="https://www.owasp.org/index.php/Transport_Layer_Protection_Cheat_Sheet" class="url">https://www.owasp.org/index.php/Transport_Layer_Protection_Cheat_Sheet</a>.
