---
title: >-
  Other Options for Authentication to Your API Service - Managing API
  Credentials
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/api-keys/">&larr; Managing API Credentials</a></div>

## Other Options for Authentication to Your API Service {#api-keys-other-options}
Now, while I suggest that you have your clients authenticate to your API using JWTs as Bearer tokens, there are other patterns you will encounter. Below is a short list of other approaches to API authentication. Keep in mind that this is by no means an exhaustive list, just a list of the most common approaches and their tradeoffs:

### Basic Authentication
This is the good 'ole "username and password" form of authentication method. Some APIs will use other words for "username" and "password" for example, Twilio calls the "username" the "Account SID" and the "password" the "Auth Token" but it works exactly the same.

If you decide to use Basic Auth to secure your API, keep in mind that your "username" and "password" should be random strings and not the same as the account username and password. You can generate these values by using an entropy source from your operating system (`/dev/random` on Unix-like systems or CryptGenRandom on Windows systems)

### Opaque Tokens
These were the most common type of API token for APIs designed before OAuth 2.0 was standardized. Companies that use these types of token to secure their APIs include Stripe (with tokens that look like this: `sk_test_ABcdefGHiJkL0MnOpQ1rstU2`), and Okta (with tokens that look like this `00aBCdE0FGHijklmNO1pQ2RStuvWx34Y5z67ABCDEf`). These tokens have no relationship with the account information and mean absolutely nothing outside those systems.

As with basic auth strings, we suggest that you generate opaque tokens using an entropy source from your operating system.

Another best practice for opaque tokens is to allow multiple tokens to be issued and used at the same time, as this will allow for key rotation.

### Signed or Hashed Tokens
These tokens are cryptographically signed or hashed and can either be opaque tokens or contain carry information about themselves. One reason to use a signed or hashed token is to allow your API to validate tokens without the need for a database lookup. The best supported token type in this category is the JWT used for OpenID Connect. Other examples of tokens in this category include PASETO and Hawk. In general, we suggest using JWTs as described above.

