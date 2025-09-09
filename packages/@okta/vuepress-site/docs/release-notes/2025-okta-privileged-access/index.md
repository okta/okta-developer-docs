---
title: Okta Privileged Access API release notes 2025
---

# Okta Privileged Access API release notes (2025)

Okta Privileged Access (OPA) is available for both Okta Classic and Identity Engine.

## September

### Monthly release 2025.09.0

| Change | Expected in Preview | Expected in Production |
|--------|---------------------|------------------------|
| [Enable Okta-managed Active Directory accounts is EA](#enable-okta-managed-active-directory-accounts-is-ea)| September 8, 2025 | September 10, 2025 |

#### Enable Okta-managed Active Directory accounts is EA

You can now set up Active Directory (AD) account rules to import AD users that are managed by Okta. When you enable an AD account tha's managed by Okta, active users can sign in to Okta and access all their SSO apps through the Okta End-User Dashboard. Admins and users can still rotate passwords through Okta Privileged Access and have those passwords synchronized with the AD server and Okta. This provides a seamless experience for active AD users to sign in to Okta-integrated apps and benefit from Okta Privileged Access features, such as password rotation.

When you set up AD account rules, you can filter on account names or Okta group memberships in AD rules that have the Okta user management functionality enabled.

To enable Okta-managed users on import, set `enable_import_okta_users` and `enhanced_filters` in the [Create an Active Directory account rule](https://developer.okta.com/docs/api/openapi/opa/opa/tag/active-directory-accounts/#tag/active-directory-accounts/operation/createActiveDirectoryAccountRule).
<!-- OKTA-917820 OKTA-939621 FF: pam_active_directory_import_okta_users Preview date: Sept 8, 2025 Product date: Sept 10, 2025 -->

## August

### Weekly release 2025.08.4

| Change | Expected in Preview | Expected in Production |
|--------|---------------------|------------------------|
| [Role permission updates for attribute operations](#role-permission-updates-for-attribute-operations)| August 28, 2025 | September 2, 2025 |

#### Role permission updates for attribute operations

In addition to previous role permissions, users with `security_admin` permissions can now access the following operations:

* [List all attributes for a group](https://developer.okta.com/docs/api/openapi/opa/opa/tag/attributes/#tag/attributes/operation/ListGroupAttributes) (`GET /v1/teams/{team_name}/groups/{group_name}/attributes`)
* [Retrieve a group attribute](https://developer.okta.com/docs/api/openapi/opa/opa/tag/attributes/#tag/attributes/operation/FetchGroupAttribute) (`GET /v1/teams/{team_name}/groups/{group_name}/attributes/{attribute_id}`)
* [List all attributes for a user](https://developer.okta.com/docs/api/openapi/opa/opa/tag/attributes/#tag/attributes/operation/ListUserAttributes) (`GET/v1/teams/{team_name}/users/{user_name}/attributes`)
* [Retrieve a user attribute](https://developer.okta.com/docs/api/openapi/opa/opa/tag/attributes/#tag/attributes/operation/FetchUserAttribute) (`GET /v1/teams/{team_name}/users/{user_name}/attributes/{attribute_id}`)
* [List all attribute conflicts for a team](https://developer.okta.com/docs/api/openapi/opa/opa/tag/attributes/#tag/attributes/operation/ListTeamUserAttributeConflicts) (`GET /v1/teams/{team_name}/attributes/conflicts`)

Users need the `security_admin` permission instead of the `resource_admin` permission to access the following operations:

* [Update a group attribute](https://developer.okta.com/docs/api/openapi/opa/opa/tag/attributes/#tag/attributes/operation/UpdateGroupAttribute) (`PUT /v1/teams/{team_name}/groups/{group_name}/attributes/{attribute_id}`)
* [Update a user attribute](https://developer.okta.com/docs/api/openapi/opa/opa/tag/attributes/#tag/attributes/operation/UpdateUserAttribute) (`PUT /v1/teams/{team_name}/users/{user_name}/attributes/{attribute_id}`)

<!--OKTA-1000610 Preview date: August 28, 2025; Production date: Sept 2, 2025 -->

### Weekly release 2025.08.2

| Change | Expected in Preview |
|--------|---------------------|
| [Active Directory Remote Desktop Protocol (RDP) support is EA](#active-directory-remote-desktop-protocol-rdp-support-is-ea)| August 20, 2025 |

#### Active Directory Remote Desktop Protocol (RDP) support is EA

Security admins can grant users RDP access to Windows servers with Active Directory (AD) credentials. After RDP access is granted, end users can connect to Windows servers through RDP using the SFT client. Security admins can set requirements, such as multifactor authentication, approval requests, or resource checkout, in order for users to connect through RDP. Currently, gateways aren't supported for RDP connections with AD credentials.

You can grant RDP permission to AD users on Windows servers through the security policy. See [privileges](https://developer.okta.com/docs/api/openapi/opa/opa/tag/security-policy/#tag/security-policy/operation/CreateSecurityPolicy!path=rules/privileges&t=request) in the Security Policy API. See user access method details in the [List all user access methods for an Active Directory account](https://developer.okta.com/docs/api/openapi/opa/opa/tag/active-directory-accounts/#tag/active-directory-accounts/operation/ListUAMForActiveDirectoryAccount) method and in Server [Resolve resource names](https://developer.okta.com/docs/api/openapi/opa/opa/tag/servers/#tag/servers/operation/ResolveResource!c=200&path=results/user_access_methods&t=response). For product documentation, see [Add rules to a policy](https://help.okta.com/okta_help.htm?type=oie&id=pam-add-rules).
<!-- OKTA-943925 pam_active_directory_server_rdp Preview: Aug 20, 2025, Production: August 27, 2025 -->

### Monthly release 2025.08.0

#### Active Directory rotate password configuration is EA

Resource admins can now disable the initial password rotation for discovered Active Directory (AD) accounts. Previously, all new or updated AD accounts discovered were automatically initiated for password rotation. Security admins can now set up security policies with rotate-password privileges. End users under that security policy can rotate accessible AD accounts regardless of whether the password was initially rotated. This feature provides the flexibility for OPA admins and end users to manage password rotation.

* Resource admins can disable initial password rotation through an AD account rule (see `enable_initial_password_rotation` in [Create an Active Directory account rule](https://developer.okta.com/docs/api/openapi/opa/opa/tag/active-directory-accounts/#tag/active-directory-accounts/operation/createActiveDirectoryAccountRule)).
* Security admins can create security policies with AD rules that enable password rotation privileges for end users (see the `update_password` privilege in [`rules.privileges`](https://developer.okta.com/docs/api/openapi/opa/opa/tag/security-policy/#tag/security-policy/operation/CreateSecurityPolicy!path=rules/privileges&t=request) from [Create a security policy](https://developer.okta.com/docs/api/openapi/opa/opa/tag/security-policy/#tag/security-policy/operation/CreateSecurityPolicy)).
* End users with the rotate password privilege can rotate their account password (see [Rotate the password for Active Directory account](https://developer.okta.com/docs/api/openapi/opa/opa/tag/active-directory-accounts/#tag/active-directory-accounts/operation/rotateActiveDirectoryAccountPassword)).
<!-- OKTA-922640 and OKTA-911729 pam_active_directory_rotate_now FF -->

#### Service Accounts API is EA

The new [Service Accounts API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ServiceAccount/) is now available for Okta Privileged Access-enabled orgs. This API allows you to manage SaaS or On-Prem Provisioning (OPP) app accounts. App accounts that you create through the Service Accounts API are visible to resource admins in the Okta Privileged Access dashboard. See [Manage service accounts](https://help.okta.com/okta_help.htm?type=oie&id=saas-manage-service-accounts) in the Okta Privileged Access product documentation.

This feature is available only if you're subscribed to Okta Privileged Access. Ensure that you've set up the Okta Privileged Access app before creating app accounts through the API.
<!-- OKTA-926544 OKTA-982940 SERVICE_ACCOUNTS_AD -->

#### Search capability for Okta Privileged Access secrets

Okta Privileged Access users can now search secrets and their folders. A new `search` query parameter is available for the [List top-level secret folder for a user](https://developer.okta.com/docs/api/openapi/opa/opa/tag/secrets/#tag/secrets/operation/ListTopLevelSecretFoldersForUser) operation. End users can search for secrets or secret folders that they have access to by the secret name or description that contains a substring. <!-- OKTA-977918 OKTA-949368 OKTA-986952 secrets_search FF -->

## June

### Monthly release 2025.06.0

#### Updates to password rotation frequency

You can now schedule the password rotation frequency for all projects up to a maximum of 400 days. The `periodic_rotation_duration_in_seconds` parameter now has a maximum value of 34,560,000 seconds in the following operations:

* [Update project password policy for server accounts](https://developer.okta.com/docs/api/openapi/opa/opa/tag/projects/#tag/projects/operation/UpdatePasswordPolicyForProject)(`/v1/teams/{team_name}/resource_groups/{resource_group_id}/projects/{project_id}/server_password_settings`)
* [Update a project password policy for Active Directory resources](https://developer.okta.com/docs/api/openapi/opa/opa/tag/projects/#tag/projects/operation/UpdateProjectPasswordPolicyForActiveDirectoryResources) (`/v1/teams/{team_name}/resource_groups/{resource_group_id}/projects/{project_id}/active_directory_password_settings`) <!-- OKTA-933767 -->

## May

### Weekly release 2025.05.3

* [OPA Active Directory API resources are EA](#opa-active-directory-api-resources-are-ea)
* [Cloud Infrastructure Entitlements API is deprecated](#cloud-infrastructure-entitlements-api-is-deprecated)

#### OPA Active Directory API resources are EA

You can now manage Okta Privileged Access (OPA) Active Directory (AD) integrations through the API. To enable this Early Access feature, contact Okta Support. See the [Manage Active Directory accounts](https://help.okta.com/oie/en-us/content/topics/privileged-access/pam-ad-accounts.htm) product documentation. The following OPA AD API resources are available:

* [Active Directory Accounts API](https://developer.okta.com/docs/api/openapi/opa/opa/tag/active-directory-accounts/)
* [Active Directory Connections API](https://developer.okta.com/docs/api/openapi/opa/opa/tag/active-directory-connections/)
* [Active Directory resources through the Projects API](https://developer.okta.com/docs/api/openapi/opa/opa/tag/projects/#tag/projects/operation/ListResourceGroupProjectActiveDirectoryAccounts)
<!--OKTA-928117 PAMActiveDirectoryEnabled -->

#### Cloud Infrastructure Entitlements API is deprecated

The Cloud infrastructure entitlements feature is no longer supported in Okta Privileged Access. All resources in the Cloud Infrastructure Entitlements API are now deprecated.
<!-- OKTA-940900 -->