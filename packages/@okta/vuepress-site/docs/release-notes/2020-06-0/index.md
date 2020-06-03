---
title: Okta API Products Release Notes
---

## 2020.06.0

| Change                                                                                                                | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------------------------|--------------------------|
| [Password Import Event eligible for use in Event Hook](#password-import-event-eligible-for-use-in-event-hook)         | June 3, 2020             |
| [OAuth public metadata endpoint caching](#oauth-public-metadata-endpoint-caching)                                     | June 3, 2020             |
| [Issuer identifier in tokens when using Custom URL Domain](#issuer-identifier-in-tokens-when-using-custom-url-domain) | June 2, 2020             |
| [Improved new device behavior detection](#improved-new-device-behavior-detection)                                     | June 3, 2020             |
| [Dynamic authentication context for SAML apps](#dynamic-authentication-context-for-saml-apps)                         | June 2, 2020             |
| [New JWKS key length validation](#new-jwks-key-length-validation)                                                     | June 3, 2020             |

### Password Import Event eligible for use in Event Hook

The `user.import.password` event provides information on the outcome of the import of an individual user's password during the [Password Import flow](/docs/reference/api/users/#create-user-with-password-import-inline-hook). This event is eligible for use in an [Event Hook](/docs/concepts/event-hooks/), enabling you to trigger removal of a password from your existing user store when import to Okta is confirmed as successful. <!-- OKTA-298381 -->

### OAuth public metadata endpoint caching

HTTP `no-cache` headers are no longer sent in responses returned by the following OAuth public metadata endpoints:

 * `/.well-known/openid-configuration`
 * `/.well-known/oauth-authorization-server`
 * `/oauth2/{authorizationServerId}/.well-known/openid-configuration`
 * `/oauth2/{authorizationServerId}/.well-known/oauth-authorization-server`
 <!-- OKTA-277596 -->

### Issuer identifier in tokens when using Custom URL Domain

When the Custom URL Domain feature is enabled and apps are configured to use `CUSTOM_URL` as the `issuer_mode`, tokens minted during an SP-initiated flow now use the request hostname in the value of the issuer identifier (`iss`) claim, while those minted during an IdP-initiated flow use the custom URL. This change currently only applies to new Preview orgs.  <!-- OKTA-288405 -->

### Improved new device behavior detection

When this feature is enabled, stronger signals are used for the detection of new devices. Devices with web browsers that don't store cookies are treated as new, and trusted applications must send a unique identifier for each device as a device token.  <!-- OKTA-297331 -->

### Dynamic authentication context for SAML apps

You can configure a custom attribute statement for SAML assertions to send user authentication context to SAML apps during the app authentication process. Apps can use this information to limit access to certain app-specific behaviors and calculate the risk profile for the signed-in user. <!-- OKTA-297188 -->

### New JWKS key length validation

New client JSON Web Key Sets are now validated and rejected if the key length is less than 2048 bits. <!-- OKTA-283603 -->
