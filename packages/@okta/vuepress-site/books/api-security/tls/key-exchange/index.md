---
title: How Key Exchange Works Today - Transport Layer Security
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/tls/">&larr; Transport Layer Security</a></div>

## How Key Exchange Works Today {#tls-key-exchange}

Current hybrid cryptosystems like SSL/TLS use symmetric key algorithms (they are generally faster than asymmetric algorithms.) Symmetric key algorithms require a shared secret, exchanged via key-exchange algorithm.

The most famous cryptographic protocol for key exchange is Diffie–Hellman, published in 1976 by Whitfield Diffie and Martin Hellman. Diffie–Hellman allows the creation of a shared secret between a sender and receiver. This shared secret is unable to be deduced by an eavesdropper who is observing the messages between the sender and receiver, except via a brute force attack. If the keyspace for the shared secret is large enough and the secret generated is sufficiently random, brute force attacks become nearly impossible.
