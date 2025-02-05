---
title: Okta Classic Engine API release notes 2025
---

# Okta Classic Engine API release notes (2025)

## February

### Monthly release 2025.02.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [IP Exempt Zone is GA in Preview](#ip-exempt-zone-is-ga-in-preview) | February 5, 2025 |
| [Risk Provider and Risk Events APIs have been deprecated](#risk-provider-and-risk-events-apis-have-been-deprecated)|  February 5, 2025               |
| [OIDC IdPs now support group sync is GA in Preview](#oidc-idps-now-support-group-sync-is-ga-in-preview) |  February 5, 2025               |
| [Granular account linking for certain Identity Providers is GA](#granular-account-linking-for-certain-identity-providers-is-ga) |  February 5, 2025               |
| [Realms for Workforce is GA in Preview](#realms-for-workforce-is-ga-in-preview)|   February 5, 2025              |
| [Improved group search functionality is GA in Preview](#improved-group-search-functionality-is-ga-in-preview) |    February 5, 2025             |
| [Improved user search functionality is GA in Preview](#improved-user-search-functionality-is-ga-in-preview) |    February 5, 2025             |
| [Support for importing Active Directory group descriptions](#support-for-importing-active-directory-group-descriptions) |    February 5, 2025             |
| [Developer documentation updates in 2025.02.0](#developer-documentation-updates-in-2025020) |    February 5, 2025             |
| [Bugs fixed in 2025.02.0](#bugs-fixed-in-2025-02-0) |    February 5, 2025             |

#### IP Exempt Zone is GA in Preview

This feature introduces `useAsExemptList` as a read-only Boolean property that distinguishes the new default IP exempt zones from other zones. When you enable this feature and you make a GET `api/v1/zones` request, Okta returns `useAsExemptList` in the response. The value `true` indicates that the zone is an exempt zone. Only system generated exempt zones are available. <!-- DEFAULT_NETWORK_ZONE_IP_EXEMPT_LIST (OKTA-795812: Parent Jira for DEFAULT_NETWORK_ZONE_IP_EXEMPT_LIST GA Preview) -->

#### Risk Provider and Risk Events APIs have been deprecated

These APIs have been deprecated. Use the [SSF Security Event Tokens API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFSecurityEventToken/) instead to receive security-related events and other data-subject signals. Use the [SSF Receiver API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFReceiver/) for third-party security event providers. <!-- (OKTA-813976: Deprecate Risk Events and Risk Providers Resolved) -->

#### OIDC IdPs now support group sync is GA in Preview

OpenID Connect (OIDC) identity providers (IdPs) now support full group sync and adding a user to a group that they don't already belong to. A user who authenticates with an external IdP is added to all available groups when *Full sync of groups* is enabled. The user is added to any groups that they don't already belong to when *Add user to missing groups* is enabled. This allows you to specify certain groups that users should be added to. <!-- GROUP_SYNC_FEATURE_OIDC_IDP_ENABLED (OKTA-817450: FVM for EA Self-Service GROUP_SYNC_FEATURE_OIDC_IDP_ENABLED for Weekly Release 2024.10.1 Resolved) -->

#### Granular account linking for certain Identity Providers is GA

When admins link users from SAML and OIDC Identity Providers, they can now exclude specific users and admins. This improves security by allowing admins to configure granular access control scenarios. See *Add an external Identity Provider* for [OpenId Connect](/docs/guides/add-an-external-idp/openidconnect/main/#create-an-identity-provider-in-okta) and [SAML 2.0](/docs/guides/add-an-external-idp/saml2/main/#create-an-identity-provider-in-okta). <!-- EXTENDED_ACCOUNT_LINKING_FILTERS OKTA-831244-->

#### Realms for Workforce is GA in Preview

The Realms and Realms Management APIs allow you to unlock greater flexibility in managing and delegating the management of your distinct user populations within a single Okta org. See [Realms](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Realm/) and [Realm Assignments](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/RealmAssignment/). <!--- OKTA-853176: Parent Jira for UD_REALMS_FOUNDATIONS and UD_REALMS Open UD_REALMS_FOUNDATIONS and UD_REALMS -->

#### Improved group search functionality  is GA in Preview

You can now search for groups whose names or descriptions contain specified text. This makes it easier to find a group when you don't recall its exact name. Use the `co` operator within the `search` parameter of the Groups API. See [Operators](https://developer.okta.com/docs/api/#operators) and [`search` within the Groups API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/#tag/Group/operation/listGroups!in=query&path=search&t=request). <!--OKTA-862579 DIRECTORY_SERVICE_GROUP_CONTAINS_SEARCH-->

#### Improved user search functionality is GA in Preview

You can now search for users whose names, email addresses, or usernames contain specified text. This makes it easier to add users to groups or apps. Use the `co` operator within the `search` parameter of the Users API. See [Operators](https://developer.okta.com/docs/api/#operators) and [`search` within the Users API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#tag/User/operation/listUsers!in=query&path=search&t=request). <!--OKTA-862577 DIRECTORY_SERVICE_USER_CONTAINS_SEARCH-->

#### Support for importing Active Directory group descriptions is GA in Production

The descriptions of groups sourced from Active Directory now use their description from AD. These replace any previous descriptions of AD-sourced groups in Okta, which used a pretty-printed version of the distinguished name (DN) instead.<!-- FF IMPORT_AD_GROUP_DESCRIPTION OKTA-863277 -->

#### Developer documentation updates in 2025.02.0

* The [OIN Manager: submit an integration](/docs/guides/submit-app/apiservice/main/) guide has been updated to include **API service** submission instructions. <!-- OKTA-809892 -->

#### Bugs fixed in 2025.02.0

* When calling deleted app users through the Apps API, the API returned a 500 internal server error instead of a 404 error. (OKTA-832609)
* PUT requests (`/api/v1/apps/appId`) to update an OpenID Connect app took 30 seconds to complete. (OKTA-852488)
* When the [List all devices API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Device/#tag/Device/operation/listDevices) was used with a `search` query parameter, it sometimes returned outdated records for `screenLockType` and `managementStatus`.  (OKTA-856387)

## January

### Weekly release 2025.01.2

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Authentication claims sharing between Okta orgs is EA in Preview](#authentication-claims-sharing-between-okta-orgs-is-ea-in-preview) | January 29, 2025 |
| [Bugs fixed in 2025.01.2](#bugs-fixed-in-2025-01-2) | January 29, 2025 |

#### Authentication claims sharing between Okta orgs is EA in Preview

Authentication claims sharing allows an admin to configure their Okta org to trust claims from IdPs during SSO. Sharing claims also allows Okta to interpret the authentication context from an IdP. This helps eliminate duplicate factor challenges during user authentication and helps improve security posture. See [Configure claims sharing](/docs/guides/configure-claims-sharing/oktasaml/main/).<!-- ORG2ORG_CLAIMS_SHARING OKTA-856733 -->

#### Bugs fixed in 2025.01.2

* When the Default Network Zone IP Exempt List feature was enabled for an org, an admin was able to delete the default example IP zone using the Zones API (`/api/v1/zones/{DefaultExemptIpZone ID}`). (OKTA-817263)
* The [List all principal rate limits](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/PrincipalRateLimit/#tag/PrincipalRateLimit/operation/listPrincipalRateLimitEntities) returned an empty response when querying with a custom `client_id` and using OAuth 2.0 for authentication.  (OKTA-832687)
* When a super admin updated a deactivated user to a different realm, admins received a `Resource not found` error. (OKTA-699778)
* Events for tokens revoked in bulk for a resource didn't appear in the System Log. (OKTA-834025)
* The `okta.accessRequests.catalog.read` scope was missing from the Okta Identity Governance APIs. (OKTA-846162) <!--To be moved to IGA RN-->

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
