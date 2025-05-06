---
title: Okta Identity Governance API release notes 2025
---

# Okta Identity Governance API release notes (2025)

Okta Identity Governance is available for both Okta Classic and Identity Engine.

For changes prior to 2025, see [Archived Okta Identity Governance API Changelog (2023-2024)](/docs/release-notes/oig-changelog/).

## May

### Monthly release 2025.05.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Changes to Okta app API responses](#changes-to-okta-app-api-responses) | May 7, 2025 |

#### Changes to Okta app API responses

The following Okta apps won’t be returned in the API response for endpoints that list apps (such as the [List all applications](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/#tag/Application/operation/listApplications)  `GET /api/vi/apps` endpoint):

* Okta Access Certifications (key name: `okta_iga`)
* Okta Access Requests Admin (key name: `okta_access_requests_admin`)
* Okta Entitlement Management (key name: `okta_entitlement_management`)
In addition, a single app retrieval endpoint won’t return these apps either. For example: `GET /api/v1/apps/{appId}` won’t return the app object if `{appId}` is the ID for the `okta_iga`, `okta_access_requests_admin`, or `okta_entitlement_management` apps in your org.

<!-- OKTA-871526 ENG_ENABLE_UI_ADMIN_OIDC_APP -->

## April

### Monthly release 2025.04.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Risk Rules API is Beta](#risk-rules-api-is-beta) | March 5, 2025 |

#### Risk Rules API is Beta

<ApiLifecycle access="beta" />

The [Risk Rules API](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Risk-Rules/) is now available in Beta and includes the following new scopes:

* `okta.governance.riskRule.manage`
* `okta.governance.riskRule.read`

Use this API to define risk rules to support separation of duties (SOD) in Access Certifications and Access Requests.

The following new properties were added to support the SOD feature in existing Identity Governance resources:

* Campaigns resource: [`principalScopeSettings.onlyIncludeUsersWithSODConflicts`](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/#tag/Campaigns/operation/getCampaign!c=200&path=principalScopeSettings/onlyIncludeUsersWithSODConflicts&t=response)

* Reviews resource: [`riskRuleConflicts`](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Reviews/#tag/Reviews/operation/getReview!c=200&path=riskRuleConflicts&t=response)

* Request Settings: [`validRiskSettings`](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Request-Settings/#tag/Request-Settings/operation/getRequestSettingsV2!c=200&path=validRiskSettings&t=response) and [`riskSettings`]( https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Request-Settings/#tag/Request-Settings/operation/getRequestSettingsV2!c=200&path=riskSettings&t=response)

See [Separation of duties](https://help.okta.com/okta_help.htm?type=oie&id=separation-of-duties) in the product documentation. <!-- IGA_SEPARATION_OF_DUTIES, OKTA-896397-->

## March

### Weekly release 2025.03.2

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Collections API is Beta](#collections-api-is-beta)| March 19, 2025 |

#### Collections API is Beta

<ApiLifecycle access="beta" />

The [Collections API](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Collections/) is available in Beta. This API allows you to manage sets of apps and entitlements. See [Resource collections](https://help.okta.com/okta_help.htm?type=oie&id=csh-rc). <!-- OKTA-856259 -->

### Weekly release 2025.03.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2025.03.1](#bug-fixed-in-2025-03-1)| March 12, 2025 |

#### Bug fixed in 2025.03.1

The `requestOnBehalfOfSettings` property wasn’t validated for `DIRECT_REPORT` when a user calls the [Retrieve an entry’s request fields](https://developer.okta.com/docs/api/iga/openapi/governance.requests.enduser.v2/tag/My-Catalogs/#tag/My-Catalogs/operation/getMyCatalogEntryRequestFieldsV2) (`GET /governance/api/v2/my/catalogs/default/entries/{entryId}/request-fields`). (OKTA-807528)

### Monthly release 2025.03.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Entitlements and Entitlement Bundles APIs are GA](#entitlements-and-entitlement-bundles-apis-are-ga) | March 5, 2025 |
| [New Access Certifications campaign](#new-access-certifications-campaign) | March 5, 2025 |
| [Bug fixed in 2025.03.0](#bug-fixed-in-2025-03-0) | March 5, 2025 |

#### Entitlements and Entitlement Bundles APIs are GA

The following APIs have transitioned from Beta to GA:

* [Entitlements](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Entitlements/)

* [Entitlement Bundles](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Entitlement-Bundles/#tag/Entitlement-Bundles)
<!-- OKTA-849932 -->

#### New Access Certifications campaign

A new property, `resourceSettings.includeAdminRoles`, has been added to the access certification campaign schema in the Campaigns API <!--(https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Campaigns/)-->. This property indicates that the user-centric access certification campaign includes users’ admin role assignments. <!-- OKTA-854037-->

#### Bug fixed in 2025.03.0

The `remediationSettings.autoRemediationSettings` and `principalScopeSettings.predefinedInactiveUsersScope` properties were missing from the Access Certification campaign schema in the Campaigns API reference. (OKTA-880900)

## February

### Weekly release 2025.02.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [List all entitlements API response update](#list-all-entitlements-api-response-update) | February 13, 2025 |

#### List all entitlements API response update

<ApiLifecycle access="beta" />

Breaking change: The [List all entitlement](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Entitlements/#tag/Entitlements/operation/listEntitlements) response no longer returns a `values` object. Previously, this response returned an empty array for this property after the following update in `2024.04.0`: [List all entitlements will no longer return values](/docs/release-notes/oig-changelog/#deprecate-list-all-entitlements-will-no-longer-return-values). To fetch values for a given entitlement, use [List all values for an entitlement](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Entitlements/#tag/Entitlements/operation/listEntitlementValues) or [List all entitlement values](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Entitlements/#tag/Entitlements/operation/listAllEntitlementValues). <!-- OKTA-828247 -->

### Monthly release 2025.02.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [New System Log event](#new-system-log-event) | February 6, 2025 |

#### New system log event

An `access.request.settings.update` System Log event now appears when a **Request of behalf of** setting is toggled on or off in the Admin Console, or when you set or change the `requestOnBehalfOfSettings` object for [Requests Settings](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Request-Settings/#tag/Request-Settings). The event's `debugData` property includes the app for which the setting was updated and the `changeDetails` property includes the previous and new state of the setting. <!--OKTA-857992-->

## January

### Weekly release 2025.01.2

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2025.01.2](#bug-fixed-in-2025-01-2) | January 29, 2025 |

#### Bug fixed in 2025.01.2

* The `okta.accessRequests.catalog.read` scope was missing from the Okta Identity Governance APIs. (OKTA-846162) <!-- To be moved to IGA RN -->

### Monthly release 2025.01.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Selected Okta Identity Governance APIs are now GA](#selected-okta-identity-governance-apis-are-now-ga) | January 8, 2025 |

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
