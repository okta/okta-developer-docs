---
title: Okta Developer Tools API release notes 2026
---

# Developer Tools release notes (2026)

<a href="/rss/dev-tools.xml">
  <img src="/img/icons/Feed-icon.svg" alt="RSS" width="20" height="20" />
  Subscribe to RSS
</a><br><br>

These release notes list customer-visible changes to the Developer Tools. The Okta's developer tooling ecosystem includes Terraform, SDKs, and CLI.

## August

### Monthly release 2026.08.0
<!-- Published on: 2026-08-05T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Okta Client SDK for Swift 2.2.0 adds Pushed Authorization Request support](#okta-client-sdk-for-swift-220-adds-pushed-authorization-request-support) | August 5, 2026 |
| [Okta Client SDK for Kotlin 3.0.0 adds Kotlin Multiplatform support](#okta-client-sdk-for-kotlin-300-adds-kotlin-multiplatform-support) | August 5, 2026 |
| [Bugs fixed in Okta Client SDK for Swift 2.2.0](#bugs-fixed-in-okta-client-sdk-for-swift-220) | August 5, 2026|
| [Bugs fixed in Okta Client SDK for Kotlin 3.0.0](#bugs-fixed-in-okta-client-sdk-for-kotlin-300) | August 5, 2026 |

#### Okta Client SDK for Swift 2.2.0 adds Pushed Authorization Request support

Version 2.2.0 of the [Okta Client SDK for Swift](https://github.com/okta/okta-mobile-swift) adds support for Pushed Authorization Requests (PAR). This lets your app pre-register authorization request parameters with Okta before redirecting users to sign in. The SDK also expands `AuthenticationContext` with `resource`, `audience`, `nonce`, and `maxAge` parameters for finer-grained OAuth requests. See [Release 2.2.0](https://github.com/okta/okta-mobile-swift/releases/tag/2.2.0). <!-- OKTA-1240617 -->

#### Okta Client SDK for Kotlin 3.0.0 adds Kotlin Multiplatform support

Version 3.0.0 of the [Okta Client SDK for Kotlin](https://github.com/okta/okta-mobile-kotlin) converts the `auth-foundation`, `oauth2`, and `web-authentication-ui` modules from Android-only libraries to Kotlin Multiplatform (Android and JVM). This adds a new cross-platform `OAuth2Client`, a credential management API, and typed rate-limit retry configuration. Version 1.0.0 of `okta-direct-auth` graduates it from beta to its first stable release, adding WebAuthn and passkey authentication support and a full Java-compatible `CompletableFuture` API. See the [CHANGELOG](https://github.com/okta/okta-mobile-kotlin/blob/master/CHANGELOG.md) for details. <!-- OKTA-1244067 -->

#### Bugs fixed in Okta Client SDK for Swift 2.2.0

* The SDK didn't send the `User-Agent` header in Release builds. (OKTA-1198552)

* WebAuthn and Duo credentials could merge incorrectly during authentication. (OKTA-1209004)

* The SDK rejected the `aud` claim when it was an array, which RFC 7519 §4.1.3 allows.

#### Bugs fixed in Okta Client SDK for Kotlin 3.0.0

* ID token validation rejected the `aud` claim when it was a JSON array, which RFC 7519 §4.1.3 allows. (OKTA-1239195)

* `TokenEncryptionHandler` could throw a null pointer exception when a device's keystore certificate no longer existed. (OKTA-1209101)

* `AndroidKeystoreUtil.getOrCreateAesKey()` could throw an uncaught `ProviderException` on some OEM devices. (OKTA-1209102)

* A race condition in `DefaultRedirectCoordinator` could silently cancel a step-up authentication redirect. (OKTA-1209107)

## July

### Monthly release 2026.07.0
<!-- Published on: 2026-07-01T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Manage resource owners](#manage-resource-owners) | July 1, 2026 |
| [Manage labels](#manage-labels) | July 1, 2026 |

#### Manage resource owners

You can now manage resource owners for Okta Identity Governance (OIG) using the Okta Terraform provider. This lets you dynamically assign, modify, revoke, or query ownership for resources such as apps, entitlements, and bundles. This helps you automate accountability and scale your governance delegation using Terraform. See [Manage resource owners](/docs/guides/terraform-oig-resources/main/#manage-resource-owners). <!-- OKTA-1158148 -->

#### Manage labels

You can now manage labels for Okta Identity Governance (OIG) resources using the Okta Terraform provider. This lets you define, modify, and delete custom labels to categorize apps, groups, and entitlements. This helps you automate resource organization and maintain a structured governance environment using Terraform. See [Manage labels](/docs/guides/terraform-oig-resources/main/#manage-labels). <!-- OKTA-1158146 -->

## June

### Monthly release 2026.06.0
<!-- Published on: 2026-06-04T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Manage identity sources with the Okta Terraform provider](#manage-identity-sources-with-the-okta-terraform-provider) | June 3, 2026 |

#### Manage identity sources with the Okta Terraform provider

You can now manage users, groups, and memberships within an Okta identity source using the Okta Terraform provider. This allows you to perform individual updates or large-scale bulk imports using an Infrastructure-as-Code (IaC) approach. This helps you automate and scale your identity data management efficiently. See [Manage identity source](/docs/guides/terraform-manage-id-source/main/).
<!-- OKTA-1163284 preview date: June 3, 2026 -->

## April

### Weekly release 2026.04.3
<!-- Published on: 2026-04-29T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Identity Threat Protection managed with Terraform](#identity-threat-protection-managed-with-terraform) | April 29, 2026 |

#### Identity Threat Protection managed with Terraform

You can now manage Okta Identity Threat Protection (ITP) using the Okta Terraform Provider. This allows admins to manage their entire threat protection surface using an Infrastructure-as-Code (IaC) approach, ensuring consistent, repeatable, and scalable security configurations. See [Manage Identity Threat Protection resources using Terraform](/docs/guides/terraform-manage-itp/main/). <!-- OKTA-1122778 -->