---
title: Okta Privileged Access API release notes 2025
---

# Okta Privileged Access API release notes (2025)

Okta Privileged Access (OPA) is available for both Okta Classic and Identity Engine.

## August

### Monthly release 2025.08.0

#### Active Directory rotate password configuration is EA in Production

Resource admins can now disable the initial password rotation for discovered Active Directory (AD) accounts. Previously, all new or updated AD accounts discovered were automatically initiated for password rotation. Security admins can now set up security policies with rotate-password privileges. End users under that security policy can rotate accessible AD accounts regardless of whether the password was initially rotated. This feature provides the flexibility for OPA admins and end users to manage password rotation.

* Resource admins can disable initial password rotation through an AD account rule (see `enable_initial_password_rotation` in [Create an Active Directory account rule](https://developer.okta.com/docs/api/openapi/opa/opa/tag/active-directory-accounts/#tag/active-directory-accounts/operation/createActiveDirectoryAccountRule)).
* Security admins can create security policies with AD rules that enable password rotation privileges for end users (see the `update_password` privilege in [`rules.privileges`](https://developer.okta.com/docs/api/openapi/opa/opa/tag/security-policy/#tag/security-policy/operation/CreateSecurityPolicy!path=rules/privileges&t=request) from [Create a security policy](https://developer.okta.com/docs/api/openapi/opa/opa/tag/security-policy/#tag/security-policy/operation/CreateSecurityPolicy)).
* End users with the rotate password privilege can rotate their account password (see [Rotate the password for Active Directory account](TBD)).
<!-- OKTA-922640 and OKTA-911729 pam_active_directory_rotate_now FF -->

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