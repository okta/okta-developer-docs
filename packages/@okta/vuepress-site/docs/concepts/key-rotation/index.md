---
title: Key Rotation
---
# Key rotation

Key rotation is when a signing key is retired and replaced by generating a new cryptographic key. Rotating keys on a regular basis is an industry standard and follows cryptographic best practices.

> **Note:** The current Okta key rotation schedule is four times a year, but can change without notice.

If you are using a Custom Authorization Server, configure and perform key rollover/rotation at the [Authorization Server level](/docs/reference/api/authorization-servers/#credentials-object).

If you are using the Org Authorization Server, configure and perform key rollover/rotation at the [client level](/docs/reference/api/apps/#generate-new-application-key-credential).

## Key rotation for Custom Authorization Servers

* For security purposes, Okta automatically rotates keys used to sign tokens.

* In case of an emergency, Okta can rotate keys as needed.

* Okta always publishes keys to the `jwks_uri`.

* To save the network round trip, your app should cache the `jwks_uri` response locally. The [standard HTTP caching headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) are used and should be respected.

* You can switch the Authorization Server key rotation mode by updating the Authorization Server's `rotationMode` property. For more information see the API Reference: [Authorization Server Credentials Signing Object](/docs/reference/api/authorization-servers/#credentials-object).

> **Caution:** Keys used to sign tokens automatically rotate and should always be resolved dynamically against the published JWKS. Your app might fail if you hardcode public keys in your applications. Be sure to include key rollover in your implementation.

## Key rotation for the Org Authorization Server

* For security purposes, Okta automatically rotates keys used to sign the ID token.

* Okta doesn't expose the public keys used to sign the access token minted by the Org Authorization Server. You can use the [`/introspect`](/docs/reference/api/oidc/#introspect) endpoint to validate the access token.

* You can't manually rotate the Org Authorization Server's signing keys.

> **Note:** If your application can't retrieve keys dynamically, you can disable the automatic key rotation in the Admin Console, [generate a key credential](/docs/reference/api/apps/#generate-new-application-key-credential), and [update the application](/docs/reference/api/apps/#update-key-credential-for-application) to use it for signing.
