---
title: Key Rotation
---
# Key rotation

Key rotation is when a signing key is retired and replaced by generating a new cryptographic key. Rotating keys regularly is an industry standard. It follows cryptographic best practices.

> **Note:** The current Okta key rotation schedule is four times a year, but can change without notice. New keys are normally generated a few weeks before the rotation occurs to ensure that downstream customer caching mechanisms are updated before the rotation occurs.

If you're using a custom authorization server, configure and perform key rollover/rotation at the [Authorization Server level](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AuthorizationServerKeys/#tag/AuthorizationServerKeys/operation/rotateAuthorizationServerKeys).

If you're using the org authorization server, configure and perform key rollover/rotation at the [client level](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationSSOCredentialKey/).

## Key rotation for custom authorization servers

* For security purposes, Okta automatically rotates the keys used to sign tokens.

* In an emergency, Okta can rotate the keys as needed.

* Okta always publishes keys to the `jwks_uri`.

* To save the network round trip, cache the `jwks_uri` response locally following the directives in the [standard HTTP Cache-Control headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control). The cache-control directives are relative to the time of the request. If you make a request as the safe cache period ends, Okta returns the `no-cache` directive to ensure that you don't cache keys that are soon to expire.

* Switch the key rotation mode for the authorization server by updating the authorization server's `rotationMode` property. For more information, see the API Reference: [Authorization Server Credentials Signing Object](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AuthorizationServerKeys/#tag/AuthorizationServerKeys/operation/rotateAuthorizationServerKeys).

> **Caution:** Keys used to sign tokens automatically rotate and should always be resolved dynamically against the published JWKS. Your app might fail if you hardcode public keys in your apps. Be sure to include key rollover in your implementation.

> **Note:** When using a custom authorization server, you may work with a client that can't call the `/keys` endpoint to dynamically fetch the JWKS. You can pin that specific client to a specific key by [generating a key credential](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationSSOCredentialKey/#tag/ApplicationSSOCredentialKey/operation/generateApplicationKey) and [updating the app](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/#tag/Application/operation/replaceApplication) to use it for signing. This overrides the custom authorization server rollover/pinning behavior for that client. To turn off automatic key rotation for the entire custom authorization server, switch the **Signing Key Rotation** value to **Manual** in the Admin Console.

## Key rotation for the org authorization server

* For security purposes, Okta automatically rotates the keys used to sign the ID token.

* Okta doesn't expose the public keys used to sign the access token minted by the org authorization server. To validate the access token, you can use the org authorization server [introspection endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/introspect).

* You can't manually rotate the org authorization server's signing keys.

> **Note:** If your app can't retrieve keys dynamically, you can pin that specific client to a specific key by [generating a key credential](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationSSOCredentialKey/#tag/ApplicationSSOCredentialKey/operation/generateApplicationKey) and [updating the app](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/#tag/Application/operation/replaceApplication) to use it for signing.
