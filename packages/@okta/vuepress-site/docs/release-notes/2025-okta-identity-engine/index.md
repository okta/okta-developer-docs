---
title: Okta Identity Engine API release notes 2025
---

<ApiLifecycle access="ie" />

# Okta Identity Engine API release notes (2025)

## February

### Weekly release 2025.02.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [New System Log event for third-party identity verification](#new-system-log-event-for-third-party-identity-verification) | February 13, 2025 |
| [Bugs fixed in 2025.02.1](#bugs-fixed-in-2025-02-1)| February 13, 2025 |

#### New System Log event for third-party identity verification

A new System Log event (`user.identity_verification`) is triggered when a request is sent to a third-party service for user identity verification, and an Okta Account Management Policy (OAMP) rule that uses `ID_PROOFING` as the [`verificationMethod`](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule!path=0/actions/appSignOn/verificationMethod&t=request) is evaluated. See [Event types](/docs/reference/api/event-types/).

#### Bugs fixed in 2025.02.1

* In the Admin Console, updates in the code editor that Okta couldn't parse returned a 500 Internal Server Error. (OKTA-837068)

* The Users API returned inconsistent responses in Classic Engine orgs that allowed self-service registration and in Identity Engine orgs that were migrated from these orgs.

* The `/user/verify_idx_credentials` endpoint didn't accept arbitrary `fromUri` values. (OKTA-853353)

* AMR values weren't forwarded to the app when a user signed in and Okta-to-Okta claims sharing was configured. (OKTA-860242)

* The On-Behalf of Token Exchange flow was returning the wrong error message when an invalid `subject_token_type` was requested. (OKTA-841223)

* When a POST request was made (`/api/v1/authorizationServers/{authServerId}/policies`) to create an authorization policy, the `created` and `lastUpdated` properties had a null value. (OKTA-848623)

* Some identity provider API POST (`/api/v1/idps`) and PUT (`/api/v1/idps/{idpId}`) requests returned an HTTP 500 error code if the request didn't have the `policy.accountLink` object in the request body. (OKTA-865143)

* When a GET request was made using the User Grants API (`/api/v1/users/{userId}/grants`), the response didn't include pagination links in the response header. (OKTA-826775)

### Monthly release 2025.02.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [IP Exempt Zone is GA in Preview](#ip-exempt-zone-is-ga-in-preview) | October 23, 2024 |
| [Global token revocation for wizard SAML and OIDC apps is GA in Preview](#global-token-revocation-for-wizard-saml-and-oidc-apps-is-ga-in-preview) |  September 11, 2024               |
| [OIDC IdPs now support group sync is GA in Preview](#oidc-idps-now-support-group-sync-is-ga-in-preview) |  October 23, 2024              |
| [Granular account linking for certain identity providers is GA](#granular-account-linking-for-certain-identity-providers-is-ga) |  December 11, 2024               |
| [Realms for Workforce is GA in Preview](#realms-for-workforce-is-ga-in-preview)|   February 13, 2025              |
| [Improved group search functionality is GA in Preview](#improved-group-search-functionality-is-ga-in-preview) |    February 12, 2025             |
| [Improved user search functionality is GA in Preview](#improved-user-search-functionality-is-ga-in-preview) |    February 12, 2025             |
| [Support for importing Active Directory group descriptions is GA in Production](#support-for-importing-active-directory-group-descriptions-is-ga-in-production) |    February 6, 2025             |
| [Developer documentation updates in 2025.02.0](#developer-documentation-updates-in-2025-02-0) |    February 6, 2025             |
| [Bugs fixed in 2025.02.0](#bugs-fixed-in-2025-02-0) |    February 6, 2025             |

#### IP Exempt Zone is GA in Preview

This feature introduces `useAsExemptList` as a read-only Boolean property that distinguishes the new default IP exempt zones from other zones. When you enable this feature and you make a GET `api/v1/zones` request, Okta returns `useAsExemptList` in the response. The value `true` indicates that the zone is an exempt zone. Only system generated exempt zones are available. <!-- DEFAULT_NETWORK_ZONE_IP_EXEMPT_LIST (OKTA-795812: Parent Jira for DEFAULT_NETWORK_ZONE_IP_EXEMPT_LIST GA Preview) -->

#### Global token revocation for wizard SAML and OIDC apps is GA in Preview

Universal Logout clears sessions and tokens for wizard SAML and OIDC apps. This enhancement extends Universal Logout functionality to more types of apps and provides greater flexibility to admins. <!-- FF GLOBAL_TOKEN_REVOCATION_SUPPORT (OKTA-797187)-->

#### OIDC IdPs now support group sync is GA in Preview

OpenID Connect (OIDC) identity providers (IdPs) now support full group sync and adding a user to a group that they don't already belong to. A user who authenticates with an external IdP is added to all available groups when **Full sync of groups** is enabled. The user is added to any groups that they don't already belong to when **Add user to missing groups** is enabled. This allows you to specify certain groups that users should be added to. <!-- GROUP_SYNC_FEATURE_OIDC_IDP_ENABLED (OKTA-817450: FVM for EA Self-Service GROUP_SYNC_FEATURE_OIDC_IDP_ENABLED for Weekly Release 2024.10.1 Resolved) -->

#### Granular account linking for certain identity providers is GA

When admins link users from SAML and OIDC identity providers, they can now exclude specific users and admins. This improves security by allowing admins to configure granular access control scenarios. See **Add an external Identity Provider** for [OpenID Connect](/docs/guides/add-an-external-idp/openidconnect/main/#create-an-identity-provider-in-okta) and [SAML 2.0](/docs/guides/add-an-external-idp/saml2/main/#create-an-identity-provider-in-okta). <!-- EXTENDED_ACCOUNT_LINKING_FILTERS OKTA-831244-->

#### Realms for Workforce is GA in Preview

The Realms and Realms Management APIs allow you to unlock greater flexibility in managing and delegating the management of your distinct user populations within a single Okta org. See [Realms](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Realm/) and [Realm Assignments](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/RealmAssignment/). <!--- OKTA-853176: Parent Jira for UD_REALMS_FOUNDATIONS and UD_REALMS Open UD_REALMS_FOUNDATIONS and UD_REALMS -->

#### Improved group search functionality is GA in Preview

You can now search for groups whose names or descriptions contain specified text. This makes it easier to find a group when you don't recall its exact name. Use the `co` operator within the `search` parameter of the Groups API. See [Operators](https://developer.okta.com/docs/api/#operators) and `search` within the [Groups API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/#tag/Group/operation/listGroups!in=query&path=search&t=request). <!--OKTA-862579 DIRECTORY_SERVICE_GROUP_CONTAINS_SEARCH-->

#### Improved user search functionality is GA in Preview

You can now search for users whose names, email addresses, or usernames contain specified text. This makes it easier to add users to groups or apps. Use the `co` operator within the `search` parameter of the Users API. See [Operators](https://developer.okta.com/docs/api/#operators) and `search` within the [Users API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#tag/User/operation/listUsers!in=query&path=search&t=request). <!--OKTA-862577 DIRECTORY_SERVICE_USER_CONTAINS_SEARCH-->

#### Support for importing Active Directory group descriptions is GA in Production

The descriptions of groups sourced from Active Directory now use their description from AD. These replace any previous descriptions of AD-sourced groups in Okta, which used a pretty-printed version of the distinguished name (DN) instead.<!-- FF IMPORT_AD_GROUP_DESCRIPTION OKTA-863277 -->

#### Developer documentation updates in 2025.02.0

* The [Style the Sign-In Widget (third generation)](/docs/guides/custom-widget-gen3/main/#use-the-aftertransform-function-recommended) guide, under **Brand and Customize**, now describes how to use the `afterTransform` function. The function allows you to apply DOM customizations to the third generation of the widget. For example, you can use `afterTransform` to change button text or to add an instructional paragraph. <!-- OKTA-756971-->
* The new [Configure a device assurance policy](/docs/guides/device-assurance-policies/main/) guide, under **Sign users in**, describes how to manage device assurance policies in your org. The guide uses the [Device Assurance Policies API](/docs/guides/device-assurance-policies/main/) to create and edit a policy, and add device assurance to an authentication policy. It also shows how to use the [System Log API](/docs/reference/system-log-query/) to check for device assurance events. <!-- OKTA-825476 -->
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
* Refresh tokens for OpenID Connect apps that have Single Logout enabled with user session details were getting invalidated before their max lifetime. (OKTA-730794)
* Account unlock didn't work for some orgs using the Okta account management policy. (OKTA-848066)

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

#### Developer documentation updates in 2025.01.0

The Sign users in to your SPA using redirect guides for the [Angular](/docs/guides/sign-into-spa-redirect/angular/main/) and [React](/docs/guides/sign-into-spa-redirect/react/main/) platforms are now revised to use updated versions of Okta SDKs, framework dependencies, and coding patterns.

#### Bug fixed in 2025.01.0

Requests to the `/policies/{policyId}/rules` and `/policies/{policyId}/rules/{ruleId}` endpoints to create or update Okta account management policy rules included default Keep me signed in (KMSI) settings in the responses. (OKTA-848236)
