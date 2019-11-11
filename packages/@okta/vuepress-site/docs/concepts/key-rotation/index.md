---
title: Key Rotation
layout: Landing
---
## Key Rotation

- For security purposes, Okta automatically rotates keys used to sign the token.
- The current key rotation schedule is four times a year. This schedule can change without notice.
- In case of an emergency, Okta can rotate keys as needed.
- Okta always publishes keys to the `jwks_uri`.
- To save the network round trip, your app should cache the `jwks_uri` response locally. The [standard HTTP caching headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) are used and should be respected.
- The administrator can switch the Authorization Server key rotation mode by updating the Authorization Server's `rotationMode` property. For more information see the API Reference: [Authorization Server Credentials Signing Object](/docs/reference/api/authorization-servers/#credentials-object).

> **Caution:** Keys used to sign tokens automatically rotate and should always be resolved dynamically against the published JWKS. Your app might fail if you hardcode public keys in your applications. Be sure to include key rollover in your implementation.

> **Tip:** If your application can't retrieve keys dynamically, the administrator can disable the automatic key rotation in the administrator UI, [generate a key credential](/docs/reference/api/apps/#generate-new-application-key-credential), and [update the application](/docs/reference/api/apps/#update-key-credential-for-application) to use it for signing.
