---
title: Okta Classic Engine API release notes 2025
---

# Okta Classic Engine API release notes (2025)

## January

### Weekly release 2025.01.2

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2025.01.2](#bug-fixed-in-2025-01-2)| January 29, 2025 |

#### Bugs fixed in 2025.01.2

* When the Default Network Zone IP Exempt List feature was enabled for an org, an admin was able to delete the default example IP zone using the Zones API (/api/v1/zones/<DefaultExemptIpZone ID>). (OKTA-817263)
* The [List all principal rate limits](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/PrincipalRateLimit/#tag/PrincipalRateLimit/operation/listPrincipalRateLimitEntities) returned an empty response when querying with a custom `client_id` and using OAuth 2.0 for authentication.  (OKTA-832687)
* When a super admin updated a deactivated user to a different realm, admins received a `Resource not found` error. (OKTA-699778)
* Events for tokens revoked in bulk for a resource didn't appear in the System Log. (OKTA-834025)

### Weekly release 2025.01.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2025.01.1](#bug-fixed-in-2025-01-1)| January 15, 2025 |

#### Bug fixed in 2025.01.1

When an admin attempted to delete an IdP using the SDK, the operation failed with an HTTP 500 response code. (OKTA-846005)

### Monthly release 2025.01.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Additional use case selection in the OIN Wizard](#additional-use-case-selection-in-the-oin-wizard) | January 8, 2025 |
| [Deprecated API endpoints: Extend, Grant, and Revoke Okta Support access](#deprecated-api-endpoints-extend-grant-and-revoke-okta-support-access) | January 8, 2025 |
| [Granular configuration for Keep Me Signed In is EA in Preview](#granular-configuration-for-keep-me-signed-in-is-ea-in-preview) | January 8, 2025 |
| [POST requests to the authorize endpoint is self-service EA](#post-requests-to-the-authorize-endpoint-is-self-service-ea) | January 8, 2025 |
| [Selected Okta Identity Governance APIs are now GA](#selected-okta-identity-governance-apis-are-now-ga) | January 8, 2025 |

#### Additional use case selection in the OIN Wizard

Independent software vendors (ISVs) can select the following additional use case categories when they submit their integration to the OIN:

* Automation
* Centralized Logging
* Directory and HR Sync
* Multifactor Authentication (MFA)

See [OIN Wizard use case selection](/docs/guides/submit-app-prereq/main/#oin-wizard-use-case-selection). <!-- OKTA-843778 -->

#### Deprecated API endpoints: Extend, Grant, and Revoke Okta Support access

The following API endpoints have been deprecated:

* [Extend Okta Support access](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgSettingSupport/#tag/OrgSettingSupport/operation/extendOktaSupport) (`POST /api/v1/org/privacy/oktaSupport/extend`)
* [Grant Okta Support access](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgSettingSupport/#tag/OrgSettingSupport/operation/grantOktaSupport) (`POST /api/v1/org/privacy/oktaSupport/grant`)
* [Revoke Okta Support access](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgSettingSupport/#tag/OrgSettingSupport/operation/revokeOktaSupport) (`POST /api/v1/org/privacy/oktaSupport/revoke`)

Use the [Update an Okta Support case](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgSettingSupport/#tag/OrgSettingSupport/operation/updateOktaSupportCase) endpoint to extend, grant, or revoke Okta Support access for a specific support case. For the corresponding Okta Admin Console feature, see [Give access to Okta Support](https://help.okta.com/okta_help.htm?type=oie&id=settings-support-access). <!-- OKTA-823338 -->

#### Granular configuration for Keep Me Signed In is EA in Preview

Admins can now configure the post-authentication prompt for Keep Me Signed In (KMSI) at a granular level in authentication policies. This allows admins to selectively enable post-authentication KMSI on a per-user, per-group, or per-app basis. When enabled, this feature exposes a frequency setting that lets admins control how often the post-authentication prompt is presented to users. See [Configure Keep me signed in (KMSI)](/docs/guides/keep-me-signed-in/main/).

The post-authentication prompt text (title, subtitle, accept button, and reject button) is now customizable through the Brands API. See [Customize post-authentication sign-in prompts](/docs/guides/keep-me-signed-in/main/#customize-post-authentication-sign-in-prompts). <!-- POST_AUTH_KMSI_IN_AUTH_POLICY OKTA-791596 -->

#### POST requests to the authorize endpoint is Self-Service EA

You can now send user data securely in a POST request body to the /authorize endpoint. <!-- https://oktainc.atlassian.net/browse/OKTA-827104#icft=OKTA-827104 FF: OAUTH2_AUTHORIZE_WITH_POST -->

#### Selected Okta Identity Governance APIs are now GA

The following Okta Identity Governance APIs are GA:

* [Campaigns](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/)
* [Reviews](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Reviews/)
* [Access Requests - V2](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Request-Conditions/)
* [My Catalogs](https://developer.okta.com/docs/api/iga/openapi/governance.requests.enduser.v2/tag/My-Catalogs/)
* [My Requests](https://developer.okta.com/docs/api/iga/openapi/governance.requests.enduser.v2/tag/My-Requests/)

The following Access Requests - V2 administrative APIs are now EA:

* [List all entries for the default access request catalog](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Catalogs/#tag/Catalogs/operation/listAllDefaultEntriesV2)
* [Retrieve a catalog entry by an ID](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Catalogs/#tag/Catalogs/operation/getCatalogEntryV2)

For further information, see [Identity Governance](https://help.okta.com/okta_help.htm?type=oie&id=ext-iga) and [Okta Identity Governance API](https://developer.okta.com/docs/api/iga/).<!--OKTA-848466-->
