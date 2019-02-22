---
title: Authentication
---
# Authentication {#authn}

<div class="chapter-author">By Matt Raible</div>

Authentication is the process of proving who you are. In the real world, you authenticate every day. You show your driver's license when you use your credit card, you show your passport when you embark on an international flight, and you show your driver's license when you get pulled over by a police officer. In the real world, the driver's license and passport serve as proof of your identity.

On the internet, you're accustomed to proving who you are by typing in a username and password. In this way, your credentials are like your driver's license. They verify you.

APIs are different from web applications in that they rarely have a *face*. They're often just buckets of data that get their information exposed via API calls, also known as HTTP requests. APIs are for programmers and applications; they're rarely exposed to end users. As a result, programmers have more but options for authentication but they all have tradeoffs.

HTTP-based APIs are the most common, so let's begin by talking about some options built into the protocol.

**Note:** All authentication options described in this chapter **must** all happen over an HTTPS (TLS) connection to be secure.




<section class="chapter-subsection-list"><ul><li><a href="/books/api-security/authn/api-authentication-options">API Authentication Options</a></li><li><a href="/books/api-security/authn/federated">Federated Identity</a></li><li><a href="/books/api-security/authn/best-practices">Recommended Best Practices for Authentication</a></li></ul></section>
