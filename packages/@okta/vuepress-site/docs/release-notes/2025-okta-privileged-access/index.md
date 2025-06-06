---
title: Okta Privileged Access API release notes 2025
---

# Okta Privileged Access API release notes (2025)

Okta Privileged Access (OPA) is available for both Okta Classic and Identity Engine.

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