---
title: Okta Privileged Access API release notes 2026
---

# Okta Privileged Access API release notes (2026)

<a href="/rss/privileged-access.xml">
  <img src="/img/icons/Feed-icon.svg" alt="RSS" width="20" height="20" />
  Subscribe to RSS
</a><br><br>

Okta Privileged Access (OPA) is available for both Okta Classic Engine and Okta Identity Engine.

## February

### Monthly release 2026.02.0
<!-- Published on: 2026-02-04T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Enhanced filtering for Active Directory domains API is EA](#enhanced-filtering-for-active-directory-domains-api-is-ea) | February 4, 2026 |
| [Enhanced filtering for Active Directory accounts API is EA](#enhanced-filtering-for-active-directory-accounts-api-is-ea) | February 4, 2026 |

#### Enhanced filtering for Active Directory domains API is EA

You can now filter the [List all Active Directory domains](https://developer.okta.com/docs/api/openapi/opa/opa/tag/active-directory-accounts/#tag/active-directory-accounts/operation/ListActiveDirectoryDomains) operation using the new parameter `contains`. This parameter filters and limits the results to domains where the name matches the provided search string. <!-- OKTA-953408, FF: pam_active_directory_enduser_domain_contains_filter -->

#### Enhanced filtering for Active Directory accounts API is EA

You can now filter the [List all discovered Active Directory accounts](https://developer.okta.com/docs/api/openapi/opa/opa/tag/active-directory-accounts/#tag/active-directory-accounts/operation/listActiveDirectoryAccounts) operation using the new `contains_account_name_or_assigned_opa_user` parameter. This parameter filters and limits the results to AD accounts where the User Principal Name (UPN), Security Account Manager (SAM) name, or assigned user name that matches the provided search string. <!-- OKTA-977735, FF: pam_active_directory_account_search-->

## January

### Weekly release 2026.01.2
<!-- Published on: 2026-01-29T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Service account password rotation](#service-account-password-rotation)| January 28, 2026 |

#### Service account password rotation

The [Okta Universal Directory Accounts](https://developer.okta.com/docs/api/openapi/opa/opa/tag/okta-universal-directory-accounts/#tag/okta-universal-directory-accounts/operation/oktaUDAccountRotatePassword) and [SaaS Application Accounts](https://developer.okta.com/docs/api/openapi/opa/opa/tag/saas-app-accounts/#tag/saas-app-accounts/operation/saasAppAccountRotatePassword) APIs now support password rotation for Service and SaaS accounts. Additionally, the new `skipRotation` parameter in the [Staged Service Accounts](https://developer.okta.com/docs/api/openapi/opa/opa/tag/staged-service-accounts/#tag/staged-service-accounts/operation/AssignStagedServiceAccount) API allows you to control whether a password rotates immediately upon assignment.

### Monthly release 2026.01.0
<!-- Published on: 2026-01-08T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Developer documentation update in 2026.01.0](#developer-documentation-update-in-2026-01-0) | January 7, 2026 |

#### Developer documentation update in 2026.01.0

The Okta API release notes now provide an RSS feed for each API release note category: [Classic Engine](/docs/release-notes/2026/), [Identity Engine](/docs/release-notes/2026-okta-identity-engine/), [Identity Governance](/docs/release-notes/2026-okta-identity-governance/), [Privileged Access](/docs/release-notes/2026-okta-privileged-access/), [Access Gateway](/docs/release-notes/2026-okta-access-gateway/), and [Aerial](/docs/release-notes/2026-okta-aerial/). Click the RSS icon to subscribe.