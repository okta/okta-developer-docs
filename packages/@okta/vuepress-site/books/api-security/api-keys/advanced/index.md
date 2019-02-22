---
title: Advanced API Token Considerations - Managing API Credentials
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/api-keys/">&larr; Managing API Credentials</a></div>

## Advanced API Token Considerations {#api-keys-advanced}
Using OAuth 2.0 with OIDC, or just a JWT as a Bearer token is a significant milestone in the ongoing task of keeping your API secure. Depending on use case, type of data, and type of operations your API provides, you may need to consider additional steps to secure your API. Keep in mind that these extra considerations might not be appropriate for every kind of API. If your API is a fan-made API that gives programmatic access to Star Wars data (like swapi.co), simple API keys are probably sufficient. However, if your API deals with things in the real world or any form of sensitive data, you should consider the options below and choose the combination appropriate for your API and fits your compliance requirements.

### Implement API Token Rotation
A great next step to take in securing an API is to rotate the API token automatically. Like passwords, regularly changing an API token will limit the damage a leaked or misplaced API token can cause. More importantly, by considering and implementing this from the beginning, if a token is leaked or when an employee leaves the team, you have a process for quickly responding and protecting your systems.

Additionally, one of the great side-effects of frequent API token rotation is that it forces best security practices. Sometimes, when a team is in a rush to deliver a critical feature, corners get cut and hard coding an API token instead of storing it properly may save a few minutes in the short term. If you rotate tokens on a regular basis, developers have to follow the rules, otherwise their code will stop working on the next rotation.

If you are using OAuth 2.0 to secure your API, token rotation is built-in to the OAuth 2.0 standard: An "access_token" always has a limited lifespan and must be rotated periodically using the "refresh_token". As an additional benefit, if you're using an OAuth server such as Okta, when you exchange the refresh_token for a new access_token, your authorization policies are re-evaluated. If a user's API access has been limited, increased, or even revoked, your application will know.

Outside of OAuth 2.0, there isn't an accepted best practice for implementing token rotation. Therefore your best and easiest option is to implement OAuth 2.0. Once you have a system in place to manage your API tokens, it makes sense to start rotating API tokens on a regular basis. Your specific rotation schedule will depend on the use case. For read/write operations in banking or healthcare, rotating every 5 or 10 minutes might be necessary. For read only access to a public Twitter feed, annually is probably sufficient.  Regardless, you should always rotate keys after an employee leaves the team to protect against accidental or intentional misuse of API tokens by former employees.

Ideally, key rotation should also be paired with configuring your API to log events into a "Security and Information and Event Management" (SIEM) system that you can use to monitor your API for suspicious events.

### Monitor for Token Leaks
In addition to the use of SIEM systems as suggested above, an advanced technique is to scan sites like GitHub and S3 for leaked API keys. No best practices have emerged in this area yet, but a good technique should include automatically disabling and notifying end users when a token has been discovered in public as part of a scan.

Quite a few open source projects can be found that will scan for leaked tokens, a good way to find these services is to search for "github credential scan"

### Bind Tokens to TLS Sessions
Finally, an interesting emerging technique that I'm keeping my eye on is the binding of tokens to TLS sessions. This technique is described in [RFC 5056](https://tools.ietf.org/html/rfc5056) and [RFC 5929](https://tools.ietf.org/html/rfc5929).

The basic idea with "channel binding" is to tie an API token to a specific TLS session. In practice this would mean writing your API to issue tokens that can only be used in the same TLS session. This way, if an API token is compromised from a client, an attacker can't move that token to another client or machine because they would have a different TLS session for the initial issuer. This still isn't foolproof but the work and effort for the attacker just multiplied.

<div class="break-before"></div>
