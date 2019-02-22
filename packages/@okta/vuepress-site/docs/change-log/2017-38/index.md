---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta API since Release 2017.35
---

## 2017.38

The following API feature enhancements and bug fixes are available in the 2017.38 release.
Dates for preview and production release are the earliest possible release date. Always check your org to verify the release version.

### API Feature Enhancements

| Feature Enhancement                                                           | Expected in Preview Orgs            | Expected in Production Orgs |
|:------------------------------------------------------------------------------|:------------------------------------|:----------------------------|
|         Key Rotation for OpenID and OAuth Apps | September 20, 2017                     | September 25, 2017           |
|         Policy API | September 7, 2017                     | October 9, 2017           |
|         Password Policy API | September 7, 2017                     | October 9, 2017           |

#### Policy API

The Policy API enables an Administrator to perform policy and policy rule operations. The policy framework is used by Okta to control rules and settings that govern, among other things, user session lifetime, whether multi-factor authentication is required when logging in, what MFA factors may be employed, password complexity requirements, and what types of self-service operations are permitted under various circumstances. For more information, see Okta's [API Reference](/docs/api/resources/policy).

#### Password Policy API

The Password Policy type controls settings that determine a user's password length and complexity, as well as the frequency with which a password can be changed. This policy also governs the recovery operations that may be performed by the user, including change password, reset (forgot) password and self-service password unlock. For more information, see Okta's [API Reference](/docs/api/resources/policy#GroupPasswordPolicy),

#### Key Rotation for OpenID Connect and OAuth Apps

You can now specify the key rotation mode for OpenID Connect and OAuth apps in the Apps API with `autoKeyRollover`. More information can be found in the [API Reference](/docs/api/resources/apps#oauth-credential-object).

### API Bug Fixes

Bug fixes are expected on preview orgs starting September 20, 2017, and on production orgs starting September 25, 2017.

* Using a refresh token for a client application with a client ID longer than 20 characters caused an error. (OKTA-139722)
