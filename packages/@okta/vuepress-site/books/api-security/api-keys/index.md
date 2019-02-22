---
title: Managing API Credentials
---
# Managing API Credentials {#api-keys}

<div class="chapter-author">By Joël Franusic</div>

A critical part of designing an API is determining how to grant users access to sensitive or important parts of it. While many APIs have publicly accessible endpoints that don't require authentication, the vast majority of APIs require a user to authenticate before any request can be fulfilled.

You need to authenticate with Stripe to charge a credit card, you have to authenticate with Twilio to send an SMS, and you have to authenticate with SendGrid to send an email. There's really no way to avoid authentication.

This chapter will cover two main aspects of managing API tokens:

* Protecting tokens that you use to connect to other APIs
* Advice and suggestions for what sort of API token to use for an API that you are building






<section class="chapter-subsection-list"><ul><li><a href="/books/api-security/api-keys/keep-keys-private">Keep Your Credentials Private</a></li><li><a href="/books/api-security/api-keys/choosing-a-type">Choosing a Type of API Token</a></li><li><a href="/books/api-security/api-keys/other-options">Other Options for Authentication to Your API Service</a></li><li><a href="/books/api-security/api-keys/advanced">Advanced API Token Considerations</a></li><li><a href="/books/api-security/api-keys/takeaways">Key Takeaways for Managing API Credentials</a></li></ul></section>
