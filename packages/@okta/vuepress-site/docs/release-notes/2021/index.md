---
title: Okta API Products Release Notes 2021
---
## August

### Monthly Release 2021.08.0

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| **Okta Classic Only**                                                    |                          |
| [Support for Push Status using the Apps API is GA in Preview](#support-for-push-status-using-the-apps-api-is-ga-in-preview) | August 2, 2021 |
| **Okta Identity Engine Only**                                            |                          |
| [Provisioning for Org2Org app integrations is GA in Production](#provisioning-for-org2org-app-integrations-is-ga-in-production) | August 2, 2021 |
| **Okta Classic/Okta Identity Engine (applies to both)**                    |                          |
| [New Domains API response properties available](#new-domains-api-response-properties-available) | August 2, 2021 |
| [Bugs fixed in 2021.08.0](#bugs-fixed-in-2021-08-0) | August 2, 2021 |

### Okta Classic Only

#### Support for Push Status using the Apps API is GA in Preview

Developers can use the `pushStatus` parameter to handle a username update to an app integration. Previously, this option wasn't available through the [Apps API](/docs/reference/api/apps), which caused inconsistent behavior between app integrations configured using the Okta Admin Console and those configured through the API.
<!--OKTA-405533-->

### Okta Identity Engine Only

#### Provisioning for Org2Org app integrations is GA in Production

Previously, Okta admins could only configure provisioning for the Org2Org app integration using the Admin Console. With the introduction of Multi-Org functions within the [Apps API](/docs/reference/api/apps), you can write code scripts or use SDKs to automate Okta hub and spoke scenarios.

Additionally, you can set or update the Logo or Notes fields for any of your Okta app integrations using the API. <!--OKTA-405943-->

### Okta Classic/Okta Identity Engine (applies to both)

#### New Domains API response properties available

The [Domains API](/docs/reference/api/domains) includes the new response object properties of `certificateSourceType` and `expiration`. The `certificateSourceType` is a required property that indicates whether the Certificate is provided by the user. The accepted value is `Manual`. The `expiration` property on the DNSRecord object is an optional property that defines the TXT record expiration. <!--OKTA-403600-->

### Bugs fixed in 2021.08.0

#### Okta Classic Only

- The IdP claim wasn't available in the `id_token` or included with the Token Inline Hook request. (OKTA-407459)

#### Okta Identity Engine Only

- When the Users lifecycle API `users/{{userId}}/lifecycle/reset_factors` was called to reset user factors, a status 403 error was received, even with a valid bearer token and scope (`okta.users.manage`). (OKTA-404613)

#### Okta Classic/Okta Identity Engine (Applies to both)

- When the Users lifecycle API `users/{{userId}}/lifecycle/reset_factors` was called to reset user factors, a status 403 error was received, even with a valid bearer token and scope (`okta.users.manage`). (OKTA-404613)
