---
title: Okta Identity Engine API release notes 2025
---

<ApiLifecycle access="ie" />

# Okta Identity Engine API release notes (2025)

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
* Refresh tokens for OpenID Connect apps that have Single Logout enabled with user session details were getting invalidated before their max lifetime. (OKTA-730794)
* Account unlock didn't work for some orgs using the Okta account management policy. (OKTA-848066)
* The `okta.accessRequests.catalog.read` scope was missing from the Okta Identity Governance APIs. (OKTA-846162) <!-- To be moved to IGA RN -->

### Weekly release 2025.01.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2025.01.1](#bugs-fixed-in-2025-01-1)| January 15, 2025 |

#### Bugs fixed in 2025.01.1

* When an admin attempted to delete an IdP using the SDK, the operation failed with an HTTP 500 response code. (OKTA-846005)

* POST requests with an OAuth token to the `/devices/{deviceId}/lifecycle/deactivate` endpoint by an API service app using the Client Credentials flow returned 403 error responses. The deactivations succeeded in spite of the error response. (OKTA-838539)

### Monthly release 2025.01.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Additional use case selection in the OIN Wizard](#additional-use-case-selection-in-the-oin-wizard) | January 8, 2025 |
| [Configure Identity Verification with third-party Identity Verification providers is GA Production](#configure-identity-verification-with-third-party-identity-verification-providers-is-ga-production) | October 2, 2024|
| [Deprecated API endpoints: Extend, Grant, and Revoke Okta Support access](#deprecated-api-endpoints-extend-grant-and-revoke-okta-support-access) | January 8, 2025 |
| [Granular configuration for Keep Me Signed In is EA in Preview](#granular-configuration-for-keep-me-signed-in-is-ea-in-preview) | January 8, 2025 |
| [Multiple Identifiers is GA in Preview](#multiple-identifiers-is-ga-in-preview) | November 7, 2024 |
| [New group.source.id key for group functions in Expression Language](#new-group-source-id-key-for-group-functions-in-expression-language) | January 2, 2025 |
| [POST requests to the authorize endpoint is self-service EA](#post-requests-to-the-authorize-endpoint-is-self-service-ea) | January 8, 2025 |
| [Selected Okta Identity Governance APIs are now GA](#selected-okta-identity-governance-apis-are-now-ga) | January 8, 2025 |
| [Bug fixed in 2025.01.0](#bug-fixed-in-2025-01-0)| January 8, 2025 |

#### Additional use case selection in the OIN Wizard

Independent software vendors (ISVs) can select the following additional use case categories when they submit their integration to the OIN:

* Automation
* Centralized Logging
* Directory and HR Sync
* Multifactor Authentication (MFA)

See [OIN Wizard use case selection](/docs/guides/submit-app-prereq/main/#oin-wizard-use-case-selection). <!-- OKTA-843778 -->

#### Configure Identity Verification with third-party Identity Verification providers is GA Production

You can now configure third-party Identity Verification providers using the IdP API and [Okta account management policy rules](/docs/guides/okta-account-management-policy/main/). Okta supports Persona as a third-party Identity Verification provider.

Identity Verification enables you to use a third-party Identity Verification provider to verify the identity of your users. Verification requirements and the Identity Verification provider are based on your authentication policies and configurations within your Okta org. To configure an Identity Verification provider in the Admin Console, see [Add an Identity Verification vendor as Identity Provider](https://help.okta.com/okta_help.htm?type=oie&id=id-verification). <!-- OKTA-803683 -->

#### Deprecated API endpoints: Extend, Grant, and Revoke Okta Support access

The following API endpoints have been deprecated:

* [Extend Okta Support access](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgSettingSupport/#tag/OrgSettingSupport/operation/extendOktaSupport) (`POST /api/v1/org/privacy/oktaSupport/extend`)
* [Grant Okta Support access](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgSettingSupport/#tag/OrgSettingSupport/operation/grantOktaSupport) (`POST /api/v1/org/privacy/oktaSupport/grant`)
* [Revoke Okta Support access](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgSettingSupport/#tag/OrgSettingSupport/operation/revokeOktaSupport) (`POST /api/v1/org/privacy/oktaSupport/revoke`)

Use the [Update an Okta Support case](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgSettingSupport/#tag/OrgSettingSupport/operation/updateOktaSupportCase) endpoint to extend, grant, or revoke Okta Support access for a specific support case. For the corresponding Okta Admin Console feature, see [Give access to Okta Support](https://help.okta.com/okta_help.htm?type=oie&id=settings-support-access). <!-- OKTA-823338 -->

#### Granular configuration for Keep Me Signed In is EA in Preview

Admins can now configure the post-authentication prompt for Keep Me Signed In (KMSI) at a granular level in authentication policies. This allows admins to selectively enable post-authentication KMSI on a per-user, per-group, or per-app basis. When enabled, this feature exposes a frequency setting that lets admins control how often the post-authentication prompt is presented to users. See [Configure Keep me signed in (KMSI)](/docs/guides/keep-me-signed-in/main/).

The post-authentication prompt text (title, subtitle, accept button, and reject button) is now customizable through the Brands API. See [Customize post-authentication sign-in prompts](/docs/guides/keep-me-signed-in/main/#customize-post-authentication-sign-in-prompts). <!-- OKTA-791596 FF: POST_AUTH_KMSI_IN_AUTH_POLICY  -->

#### Multiple Identifiers is GA in Preview

Today, end users must sign in to Okta with a username or email address only. With the Multiple Identifiers feature, admins can configure identifiers, or user attributes from Universal Directory, that an end user can enter to authenticate. Multiplier identifiers work in sign-in, recovery, self-service registration, and unlock flows. Admins can configure up to three identifiers, including email (which is still a required identifier). See [Configure multiple identifiers](/docs/guides/multiple-identifiers/main/). <!-- OKTA-687191  FF: MULTIPLE_IDENTIFIERS -->

#### New group.source.id key for group functions in Expression Language

You can now use the `group.source.id` key in Expression Language group functions to filter between groups that have the same name. See [Group functions](/docs/reference/okta-expression-language-in-identity-engine/#group-functions). <!-- OKTA-832132 -->

#### POST requests to the authorize endpoint is Self-Service EA

You can now send user data securely in a POST request body to the /authorize endpoint. <!-- https://oktainc.atlassian.net/browse/OKTA-827104#icft=OKTA-827104 OAUTH2_AUTHORIZE_WITH_POST -->

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

#### Developer documentation updates in 2025.01.0

The Sign users in to your SPA using redirect guides for the [Angular](/docs/guides/sign-into-spa-redirect/angular/main/) and [React](/docs/guides/sign-into-spa-redirect/react/main/) platforms are now revised to use updated versions of Okta SDKs, framework dependencies, and coding patterns.

#### Bug fixed in 2025.01.0

Requests to the `/policies/{policyId}/rules` and `/policies/{policyId}/rules/{ruleId}` endpoints to create or update Okta account management policy rules included default Keep me signed in (KMSI) settings in the responses. (OKTA-848236)
