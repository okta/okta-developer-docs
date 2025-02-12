---
title: Okta Identity Governance API release notes 2025
---

# Okta Identity Governance API release notes (2025)

Okta Identity Governance is available for both Okta Classic and Identity Engine.

For changes prior to 2025, see [Archived Okta Identity Governance API Changelog (2023-2024)](/docs/release-notes/oig-changelog/).

## February

### Weekly release 2025.02.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [List all entitlements API response update](#list-all-entitlements-api-response-update) | February 13, 2025 |

#### List all entitlements API response update

<ApiLifecycle access="beta" />

Breaking change: The [List all entitlement](/iga/openapi/governance.api/tag/Entitlements/#tag/Entitlements/operation/listEntitlements) response no longer returns a `values` object. Previously, this response returned an empty array for this property after the following update in `2024.04.0`: [List all entitlements will no longer return values](/docs/release-notes/oig-changelog/#deprecate-list-all-entitlements-will-no-longer-return-values). To fetch values for a given entitlement, use [List all values for an entitlement](/iga/openapi/governance.api/tag/Entitlements/#tag/Entitlements/operation/listEntitlementValues) or [List all entitlement values](/iga/openapi/governance.api/tag/Entitlements/#tag/Entitlements/operation/listAllEntitlementValues). <!-- OKTA-828247 -->

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
