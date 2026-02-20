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

### Weekly release 2026.02.2
<!-- Published on: 2026-02-20T12:00:00Z -->

| Change | Expected in Preview Orgs | Expected in Production |
|--------|--------------------------| -----------------------|
| [Enhanced filtering for Sudo Commands API](#enhanced-filtering-for-the-sudo-commands-api) | February 12, 2026 | February 17, 2026 |
| [New List Secret Templates endpoint is GA](#new-list-secret-templates-endpoint-is-ga)| February 11, 2026 | February 18, 2026 |
| [Server Account reveal password configuration is GA](#server-account-reveal-password-configuration-is-ga) | February 19, 2026 |  |

#### Enhanced filtering for the Sudo Commands API

You can now filter the [List all sudo command bundles](https://developer.okta.com/docs/api/openapi/opa/opa/tag/sudo-commands/#tag/sudo-commands/operation/ListSudoCommandBundles) operation using the new `contains` parameter. This parameter filters and limits the results to sudo command bundles where the name matches the provided search string. <!-- OKTA-953347, FF: table_migration_sudo_commands -->

#### New List Secret Templates endpoint is GA

Okta Privileged Access now provides a new [List Secret Templates](https://developer.okta.com/docs/api/openapi/opa/opa/tag/secrets/#tag/secrets/operation/ListSecretTemplates) endpoint in the [Secrets](https://developer.okta.com/docs/api/openapi/opa/opa/tag/secrets/) API. This endpoint allows teams to list and discover available secret templates. <!-- OKTA-971893, FF: pam_secret_templates -->

#### Server Account reveal password configuration is GA

Authorized end users can now retrieve managed server account passwords through the Server Accounts API. See the [Server Account API](https://developer.okta.com/docs/api/openapi/opa/opa/tag/server-accounts/#tag/server-accounts ). <!-- OKTA-963820 Server Accounts for Reveal preview date: Feb 19, 2025, FF: pam_server_account_reveal_password-->

### Monthly release 2026.02.0
<!-- Published on: 2026-02-11T12:00:00Z -->

| Change | Expected in Preview Orgs | Expected in Production |
| ------ | ------------------------ | ---------------------- |
| [Enhanced filtering for Active Directory domains API is EA](#enhanced-filtering-for-active-directory-domains-api-is-ea) | February 4, 2026 | February 11, 2026 |
| [Enhanced filtering for Active Directory accounts API is EA](#enhanced-filtering-for-active-directory-accounts-api-is-ea) | February 4, 2026 | February 10, 2026 |
| [New List Secret Templates endpoint is EA](#new-list-secret-templates-endpoint-is-ea) | February 5, 2026 |
| [Developer documentation updates in 2026.02.0](#developer-documentation-updates-in-2026-02-0) | February 4, 2026 |

#### Enhanced filtering for Active Directory domains API is EA

You can now filter the [List all Active Directory domains](https://developer.okta.com/docs/api/openapi/opa/opa/tag/active-directory-accounts/#tag/active-directory-accounts/operation/ListActiveDirectoryDomains) operation using the new parameter `contains`. This parameter filters and limits the results to domains where the name matches the provided search string. <!-- OKTA-953408, FF: pam_active_directory_enduser_domain_contains_filter -->

#### Enhanced filtering for Active Directory accounts API is EA

You can now filter the [List all discovered Active Directory accounts](https://developer.okta.com/docs/api/openapi/opa/opa/tag/active-directory-accounts/#tag/active-directory-accounts/operation/listActiveDirectoryAccounts) operation using the new `contains_account_name_or_assigned_opa_user` parameter. This parameter filters and limits the results to AD accounts where the User Principal Name (UPN), Security Account Manager (SAM) name, or assigned user name that matches the provided search string. <!-- OKTA-977735, FF: pam_active_directory_account_search-->

#### New List Secret Templates endpoint is EA

Okta Privileged Access now provides a new [List Secret Templates](https://developer.okta.com/docs/api/openapi/opa/opa/tag/secrets/#tag/secrets/operation/ListSecretTemplates) endpoint in the [Secrets](https://developer.okta.com/docs/api/openapi/opa/opa/tag/secrets/) API. This endpoint allows teams to list and discover available secret templates. <!-- OKTA-971893, FF: pam_secret_templates-->

#### Developer documentation updates in 2026.02.0

The Okta developer portal search results now include the API references.

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