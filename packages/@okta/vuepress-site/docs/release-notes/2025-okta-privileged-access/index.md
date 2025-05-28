---
title: Okta Privileged Access API release notes 2025
---

# Okta Privileged Access API release notes (2025)

Okta Privileged Access (OPA) is available for both Okta Classic and Identity Engine.

## May

### Weekly release 2025.05.3

| Change |
|--------|
| [OPA Active Directory API resources are EA](#opa-active-directory-api-resources-are-ea) |
| [Cloud Infrastructure Entitlements API is deprecated](#cloud-infrastructure-entitlements-api-is-deprecated) |

#### OPA Active Directory API resources are EA

You can now manage Okta Privileged Access (OPA) Active Directory (AD) integrations through the API. To enable this Early Access feature, contact Okta Support. See the [Manage Active Directory accounts](https://help.okta.com/oie/en-us/content/topics/privileged-access/pam-ad-accounts.htm) product documentation. The following OPA AD API resources are available:

* [Active Directory Accounts API](https://developer.okta.com/docs/api/openapi/opa/opa/tag/active-directory-accounts/)
* [Active Directory Connections API](https://developer.okta.com/docs/api/openapi/opa/opa/tag/active-directory-connections/)
* [Active Directory resources through the Projects API](https://developer.okta.com/docs/api/openapi/opa/opa/tag/projects/#tag/projects/operation/ListResourceGroupProjectActiveDirectoryAccounts)
<!--OKTA-928117 PAMActiveDirectoryEnabled -->

#### Cloud Infrastructure Entitlements API is deprecated

The Cloud infrastructure entitlements feature is no longer supported in Okta Privileged Access. All resources in the Cloud Infrastructure Entitlements API are now deprecated.
<!-- OKTA-940900 -->