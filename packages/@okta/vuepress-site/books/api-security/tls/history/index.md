---
title: A Brief History of Secure Data Transport - Transport Layer Security
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/tls/">&larr; Transport Layer Security</a></div>

## A Brief History of Secure Data Transport {#tls-history}

Today we take for granted our ability to send data over the internet securely. When we purchase an item from Amazon or complete our taxes online, we place our trust in the infrastructure of the internet to securely share our data with only the systems and parties we intend.

<figure id="fig_tls_siggaba">
  <img /assets/img/books/SIGABA-labelled-2.jpg" alt=""/>
  <figcaption style="font-size: 0.8em;">The SIGABA, a cipher machine used by the US during World War II</figcaption>
</figure>

Historically, secure information exchange wasn't simple. Ciphers and cryptography were used in ancient times to encode sensitive messages. These schemes generally had to two main weaknesses: they relied on a shared code book or cipher to encode/decode the messages, and third parties could decode them through pattern analysis.

The problem of a shared code book or cipher persisted for millennia. To ensure that each party would be able to encode/decode the message successfully, a secret "key" needs to be exchanged, for example by courier or diplomatic bag. By working off the same key, the parties to the message exchange would then be able to encode/decode their data. However, if a nefarious actor were able to gain access to the secret key (for example, by bribing the courier) then all past and future communication could be compromised.
