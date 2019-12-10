---
title: Okta API Products Release Notes
---

## 2019.12.0

| Change                                                                                                            | Expected in Preview Orgs |
|-------------------------------------------------------------------------------------------------------------------|--------------------------|
| [Features API is Generally Available in Production](#features-api-is-generally-available-in-production)           | December 11, 2019        |
| [Token Inline Hook is Generally Available in Production](#token-inline-hook-is-generally-available-in-production) | December 11, 2019        |
| [SAML Inline Hook is Generally Available in Production](#saml-inline-hook-is-generally-available-in-production)   | December 11, 2019        |
| [Scope Object Properties Default Values](#scope-object-properties-default-values)                                 | December 11, 2019        |
| [Okta-Hosted User Consent Dialog Change](#okta-hosted-user-consent-dialog-change)                                 | December 11, 2019        |
| [Bug Fixed in 2019.12.0](#bug-fixed-in-2019-12-0)                                                                 | December 11, 2019        |

### Features API is Generally Available in Production

The [Features API](/docs/reference/api/features/) provides operations to manage self-service Early Access features in Production and Preview orgs, as well as managing self-service Beta features in Preview orgs and viewing Beta features in Production orgs. <!-- OKTA-259575 --> 

### Token Inline Hook is Generally Available in Production

The [Token Inline Hook](/docs/reference/token-hook/) enables you to integrate your own custom functionality into the process of minting OAuth 2.0 and OpenID Connect tokens. <!-- OKTA-244859 -->

### SAML Inline Hook is Generally Available in Production 

The [SAML Inline Hook](/docs/reference/saml-hook/) enables you to customize SAML assertions returned by Okta. You can add attributes or modify existing attributes in outbound SAML assertions. <!-- OKTA-244860 -->

### Scope Object Properties Default Values 

In Scope objects created using the [Authorization Server API](/docs/reference/api/authorization-servers/), the default values of the `displayName` and `description` properties have been updated to be more informative. <!-- OKTA-242646 -->

### Okta-Hosted User Consent Dialog Change

In OAuth 2.0 or OpenID Connect [authentication flows](/docs/guides/request-user-consent/overview/), Okta-hosted user consent dialogs have been changed, so that the *Allow Access* button is now gray. <!-- OKTA-262803 -->

### Bug Fixed in 2019.12.0

* In the [Authorization Server API](/docs/reference/api/authorization-servers/), supplying a `consent` property was previously required when creating a Scope object in orgs that had the EA feature enabled. It is now required only when updating existing Scope objects. (OKTA-250368)

