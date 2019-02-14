---
title: Key Takeaways for Managing API Credentials - Managing API Credentials
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/api-keys/">&larr; Managing API Credentials</a></div>

## Key Takeaways for Managing API Credentials {#api-keys-takeaways}

In closing, here is my best advice for managing API credentials:

* Never paste a secret into your code. Never ever!
* Secure your API using OAuth 2.0 by writing your API to act as an OAuth 2.0 "Resource Server"
* Use JSON Web Tokens (JWT) as your tokens to embed additional context
* Use the token as a Bearer token with the Authorization header to prevent leaking your token in logs and caches
* Implement regular token rotation to reduce the damage from leaked keys, poor practices, honest mistakes, and disgruntled employees.
* Monitor your source code for token leaks
* Implement "channel binding" to tie your API tokens to the TLS session they are requested over
