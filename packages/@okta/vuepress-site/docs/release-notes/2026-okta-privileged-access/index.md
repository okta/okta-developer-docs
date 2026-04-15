---
title: Okta Privileged Access API release notes 2026
---

# Okta Privileged Access API release notes (2026)

<a href="/rss/privileged-access.xml">
  <img src="/img/icons/Feed-icon.svg" alt="RSS" width="20" height="20" />
  Subscribe to RSS
</a><br><br>

Okta Privileged Access (OPA) is available for both Okta Classic Engine and Okta Identity Engine.

## April

### Weekly release 2026.04.2
<!-- Published on: 2026-04-15T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bug fixed in 2026.04.2](#bug-fixed-in-2026-04-2)| April 15, 2026 |

#### Bugs fixed in 2026.04.2

The Rotate Password endpoint (`POST v1/teams/{team_name}/active_directory/{ad_connection_id}/accounts/{ad_account_id}/rotate_password`) for Okta user account credentials returned a success status even when the password rotation failed at the Active Directory level. (OKTA-1140010)


### Monthly release 2026.04.0
<!-- Published on: 2026-04-02T12:00:00Z -->
| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Workload identity for automation is now available in Okta Privileged Access](#workload-identity-for-automation-is-now-available-in-okta-privileged-access)  | March 30, 2026 |

#### Workload identity for automation is now available in Okta Privileged Access

Workload identity for automation eliminates the need for hardcoded API keys or service account secrets. It does this by using a workload's native platform identity and a runtime OIDC token to securely authenticate automated workloads. This works with platforms like GitHub Actions, GitLab CI, Google Cloud Platform, and Azure Managed Identity. See [Workload Connections](https://developer.okta.com/docs/api/openapi/opa/opa/workload-connections) and [Workload Roles](https://developer.okta.com/docs/api/openapi/opa/opa/workload-roles).<!-- OKTA-1067447, FF: NHI, Preview release: March 30, 2026 -->

## March

### Weekly release 2026.03.3
<!-- Published on: 2026-03-26T12:00:00Z -->

| Change | Expected in Preview Orgs | Expected in Production |
|--------|--------------------------|-----------------------|
| [Enhancements for SSH connectivity for Active Directory domains](#enhancements-for-ssh-connectivity-for-active-directory-domains) | March 26, 2026 | April 8, 2026 |

#### Enhancements for SSH connectivity for Active Directory domains

Security policies now support SSH session connectivity for Linux servers joined to an Active Directory domain. This feature allows you to enable server authentication using Active Directory accounts. See [Security Policy API](https://developer.okta.com/docs/api/openapi/opa/opa/security-policy).
<!--OKTA-1003207, FF: pam_active_directory_server_ssh., GA Preview date: 26 March -->

### Weekly release 2026.03.2
<!-- Published on: 2026-03-18T12:00:00Z -->

| Change | Expected in Preview Orgs | Expected in Production |
|--------|--------------------------| -----------------------|
| [New password management options for on-premises SaaS app accounts is GA](#new-password-management-options-for-on-premises-saas-app-accounts-is-ga) | February 25, 2026 | March 18, 2026 |

#### New password management options for on-premises SaaS app accounts is GA

You can now configure password rotation for managed on-premises app accounts that require a current password to rotate. This enhancement also allows authorized users to manually override stored passwords in Okta Privileged Access to resolve out-of-sync credentials. New API endpoints allow you to list, retrieve, and update these strategies:

* `GET /v1/teams/{team_name}/connections/saas_apps`
* `GET /v1/teams/{team_name}/connections/saas_apps/{saas_app_instance_id}`
* `PATCH /v1/teams/{team_name}/connections/saas_apps/{saas_app_instance_id}`

See the [SaaS Application Accounts](https://preview.redoc.ly/oktadev/jg-OKTA-1095144-rotate_saas_pwd_with_last_pwd/openapi/opa/opa/tag/saas-app-accounts/#tag/saas-app-accounts).
<!-- OKTA-1010336, FF: rotate_saas_pwd_with_last_pwd , Prod date: March 18 -->

### Weekly release 2026.03.1
<!-- Published on: 2026-03-11T12:00:00Z -->

| Change | Expected in Preview Orgs | Expected in Production |
|--------|--------------------------| -----------------------|
| [Enhanced filtering for end-user resource APIs](#enhanced-filtering-for-end-user-resource-apis) | March 4, 2026 | March 9, 2026 |

#### Enhanced filtering for end-user resource APIs

You can now use the contains query parameter to filter results by name when listing Universal Directory service accounts, SaaS app instances, and SaaS app service accounts. See [List all accessible Universal Directory service accounts](https://developer.okta.com/docs/api/openapi/opa/opa/okta-universal-directory-accounts/listoktaudserviceaccountsenduser), [List the end user SaaS app instances](https://developer.okta.com/docs/api/openapi/opa/opa/saas-app-accounts/listsaasapplicationsaccessiblebyuser), and [List all end user SaaS app service accounts](https://developer.okta.com/docs/api/openapi/opa/opa/saas-app-accounts/listsaasapplicationserviceaccountsenduser).
<!-- OKTA-953339, FF: pam_saas_app_enduser_contains_filter -->

### Monthly release 2026.03.0
<!-- Published on: 2026-03-04T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Developer documentation update in 2026.03.0](#developer-documentation-update-in-2026-03-0) | March 4, 2026 |

#### Developer documentation update in 2026.03.0

Okta's [API reference pages](https://developer.okta.com/docs/api/) are undergoing a migration, which started on February 24. While the look and feel may vary across pages during this time, all technical documentation remains accurate and up to date.

## February

### Weekly release 2026.02.3
<!-- Published on: 2026-02-25T12:00:00Z -->

| Change | Expected in Preview Orgs | Expected in Production |
|--------|--------------------------| -----------------------|
|[New System Log event for password rotation changes](#new-system-log-event-for-password-rotation-changes)| February 25, 2026| |
|[New password management options for on-premises SaaS app accounts is EA](#new-password-management-options-for-on-premises-saas-app-accounts-is-ea)|February 25, 2026| |

#### New System Log event for password rotation changes

A new System Log event (`pam.app.update`) has been added to track changes to the password rotation strategy for apps connected to Okta Privileged Access. You can use this event to track configuration changes that impact the management of credentials for connected app accounts. See [Event Types](/docs/reference/api/event-types/).

#### New password management options for on-premises SaaS app accounts is EA

You can now configure password rotation for managed on-premises app accounts that require a current password to rotate. This enhancement also allows authorized users to manually override stored passwords in Okta Privileged Access to resolve out-of-sync credentials.
New API endpoints allow you to list, retrieve, and update these strategies:

 - `GET /v1/teams/{team_name}/connections/saas_apps`

 - `GET /v1/teams/{team_name}/connections/saas_apps/{saas_app_instance_id}`

 - `PATCH /v1/teams/{team_name}/connections/saas_apps/{saas_app_instance_id}`

See [SaaS Application Accounts](https://developer.okta.com/docs/api/openapi/opa/opa/tag/saas-app-accounts/#tag/saas-app-accounts).

### Weekly release 2026.02.2
<!-- Published on: 2026-02-20T12:00:00Z -->

| Change | Expected in Preview Orgs | Expected in Production |
|--------|--------------------------| -----------------------|
| [Enhanced filtering for Sudo Commands API](#enhanced-filtering-for-the-sudo-commands-api) | February 12, 2026 | February 17, 2026 |
| [New List Secret Templates endpoint is GA](#new-list-secret-templates-endpoint-is-ga)| February 11, 2026 | February 18, 2026 |
| [Server Account reveal password configuration is GA](#server-account-reveal-password-configuration-is-ga) | February 19, 2026 | February 25, 2026  |

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