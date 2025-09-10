---
title: Okta Classic Engine API release notes 2025
---

# Okta Classic Engine API release notes (2025)

## September

### Monthly release 2025.09.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [User API Projections](#user-api-projections) | September 10, 2025 |
| [Org2Org OIDC Sign-on mode is GA in Preview ](#org2org-oidc-sign-on-mode-is-ga-in-preview) | June 17, 2025 |
| [Anything-as-a-Source for groups and group memberships API is EA in Preview ](#anything-as-a-source-for-groups-and-group-memberships-api-is-ea-in-preview) | September 10, 2025 |
| [New System Log events for bulk groups and bulk group memberships changes](#new-system-log-events-for-bulk-groups-and-bulk-group-memberships-changes) | September 10, 2025 |
| [Breached Credentials Protection is GA in Production](#breached-credentials-protection-is-ga-in-production) | May 15, 2025 |
| [Group Push Mappings is GA in Production](#group-push-mappings-is-ga-in-production) | August 7, 2025 |
| [New validation rule for integration variables in the OIN Wizard](#new-validation-rule-for-integration-variables-in-the-oin-wizard) | September 10, 2025 |
| [Clear user factors for all devices is GA in Production](#clear-user-factors-for-all-devices-is-ga-in-production) | August 7, 2025 |
| [Secure Identity Integrations filters in the OIN catalog](#secure-identity-integrations-filters-in-the-oin-catalog) | September 10, 2025 |
| [Okta Integration IdP type is GA in Preview](#okta-integration-idp-type-is-ga-in-preview) | June 25, 2025 |
| [User status in Okta Expression Language is GA in Preview](#user-status-in-okta-expression-language-is-ga-in-preview) | September 10, 2025 |
| [Developer documentation update in 2025.09.0](#developer-documentation-update-in-2025-09-0) | September 4, 2025 |

#### User API Projections

You can now use the `fields` query parameter with the list users endpoint (`GET /api/v1/users/`). This parameter lets you specify properties to return for users meeting the search criteria. <!-- OKTA-1011930 -->

#### Org2Org OIDC Sign-on mode is GA in Preview

The Org2Org app now includes an OIDC Sign-on mode using the Okta Integration IdP. This sign-on mode reduces the complexity of configuration between the Org2Org app and the target org, and takes advantage of modern security features of OIDC. See [Secure API connections between orgs with OAuth 2.0](/docs/guides/secure-oauth-between-orgs/main/). <!-- OKTA-1010570 -->

#### Anything-as-a-Source for groups and group memberships API is EA in Preview

Anything-as-a-Source (XaaS) capabilities allow customers to use a custom identity source with Okta. With XaaS, customers can connect a custom HR app or a custom database to source entities such as users into Okta’s Universal Directory. This release offers XaaS capabilities with groups and group memberships, allowing customers to start sourcing groups with XaaS. Okta now enables creating and updating users, creating and updating groups, and managing group memberships into Okta’s Universal Directory from any identity source using the Identity Source APIs. See [Identity Sources](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/). <!-- IDENTITY_SOURCE_APPS_GROUPS OKTA-1009858: Parent Jira for IDENTITY_SOURCE_APPS_GROUPS EA -->

#### New System Log events for bulk groups and bulk group memberships changes

The following new System Log events indicate when bulk group and bulk group memberships [Identity Sources API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/) are called:

* `system.identity_sources.bulk_group_upsert`
* `system.identity_sources.bulk_group_delete`
* `system.identity_sources.bulk_group_membership_upsert`
* `system.identity_sources.bulk_group_membership_delete` <!-- OKTA-1007703 -->

#### Breached Credentials Protection is GA in Production

Protect your org from the impact of credentials that have been compromised. If Okta determines that a username and password combination has been compromised after being compared to a third-party curated dataset, the protection response is customizable through password policies, including resetting the user's password, forcing a logout, or calling a delegated Workflow. See the [Okta Policies API]([https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/|https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/]).

This feature is following a slow rollout process. <!-- OKTA-997983 -->

#### Group Push Mappings is GA in Production

With the API for Group Push, admins can now programmatically create, link, or manage group push configuration in Okta. This allows admins to configure Okta groups to be pushed to connected apps at scale and reduces overhead for large deployments. See [Group Push Mappings API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/GroupPushMapping/).
<!-- OKTA-962537 GROUP_PUSH_MAPPINGS_PUBLIC_API-->

#### New validation rule for integration variables in the OIN Wizard

The OIN Wizard now validates each integration variable name and displays an error if a reserved name is used. <!-- OKTA-980811 -->

#### Clear user factors for all devices is GA in Production

When you make a Revoke all user sessions (`/api/v1/users/{userId}/sessions`) request, include the new [`forgetDevices` parameter](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserSessions/#tag/UserSessions/operation/revokeUserSessions!in=query&path=forgetDevices&t=request) (with a value of `true`) to clear a user's remembered factors on all devices. The user is prompted for full authentication on their next sign-in attempt from any device. The `forgetDevices` parameter is set to `false` by default. <!-- ENG_ENABLE_FORGET_DEVICES_INTENT_FOR_DELETE_USER_SESSIONS_API OKTA-979587 -->

#### Secure Identity Integrations filters in the OIN catalog

The Browse App Integration Catalog page now provides three new Secure Identity Integrations checkboxes: **Secure Identity Integrations - Fundamental**, **Secure Identity Integrations - Advanced**, and **Secure Identity Integrations - Strategic**. When you select one, the OIN catalog displays only the apps with that specific functionality. <!-- OKTA-954222 -->

#### Okta Integration IdP type is GA in Preview

The new Okta Integration IdP type allows you to configure Org2Org OIDC IdPs with secure defaults. See [Identity Providers](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentityProvider/#tag/IdentityProvider/operation/listIdentityProviders!c=200&path=type&t=response).<!-- OKTA_INTEGRATION_IDP_TYPE (OKTA-949786) -->

#### User status in Okta Expression Language is GA in Preview

You can now reference User Status in the Okta expression language. Group Rules can leverage user statuses to drive group membership. Use the `user.getInternalProperty('status')` function to get the status of a user. See [Okta user ID and status](/docs/reference/okta-expression-language/#okta-user-id-and-status). <!--GROUP_RULES_CRITERIA_USER_STATUS OKTA-969724 -->

#### Developer documentation update in 2025.09.0

* [Journeys](/docs/journeys/) is an evolving section that includes content to help guide you through your development project. Journeys break down your development project into consumable steps:

  * Key concepts to absorb

  * Information on planning for tasks that you need to complete

  * Links to individual guides to help you build your project

  * Additional content to help you enhance your project.

  The next journey available is [Sign users in through your web app](/docs/journeys/OCI-web-sign-in/). This journey helps you connect your web app to Okta and sign your users in and out.

* The new [Multifactor authentication](/docs/concepts/mfa/) concept page explains how MFA works and helps you understand some key terminology when you implement MFA using Okta APIs.

* The new [OAuth 2.0 and OIDC claims](/docs/concepts/oauth-claims/) concept page provides a high-level overview of what claims are, including their types and how they're used in Okta.

* The `revocation` and `revocationCacheLifetime` properties that are used with the Mutual TLS protocol in the [Identity Providers API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentityProvider/#tag/IdentityProvider/operation/createIdentityProvider!path=protocol/3/credentials/trust&t=request) are now deprecated. Okta now handles CRL caching automatically.

    As of October 8, 2025, in Preview orgs, and October 13, 2025, in Production orgs, these properties are ignored if they’re specified in any API requests. Specifying the properties in your API requests doesn't cause any errors since they have no effect.

    See [Deprecation Notice - Smart Card IdP Legacy CRL Cache Setting](https://support.okta.com/help/s/article/deprecation-notice-smart-card-idp-legacy-crl-cache-setting?language=en_US).

* The new [Single Sign-on](/docs/concepts/sso-overview/) concept is an overview of SSO, explaining what it is, how it differs from a basic sign-in flow, and how Okta supports it.

* Authentication policies have been renamed and are now known as "app sign-in policies." The term "authentication policies" now refers to a group of policies: app sign-in policies, the Okta account management policy, and the session protection policy.

    In the [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/), the policy type for app sign-in policies is still `ACCESS_POLICY`. There are no changes to the API. All previous anchors and links to the API remain the same.

* Best practice implementations of API use cases are now available for Identity Governance. See **Identity Governance** in the [Guides](/docs/guides/) sidebar.

<!-- #### Bugs fixed in 2025.09.0 -->

## August

### Weekly release 2025.08.4

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2025.08.4](#bugs-fixed-in-2025-08-4)| September 4, 2025 |

#### Bugs fixed in 2025.08.4

* Admins were sometimes unable to enroll custom TOTP factors (`POST /users/{userId}/factors`). (OKTA-1007379)

* Sometimes the `/userinfo` endpoint returned an error if the EA federated claims feature was enabled. (OKTA-1007745)

### Weekly release 2025.08.2

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2025.08.2](#bugs-fixed-in-2025-08-2)| August 20, 2025 |

#### Bugs fixed in 2025.08.2

* Some app groups that were deleted were still visible in searches. This fix will be slowly made available to all orgs. (OKTA-972614)

* When an app was deleted, group push rules weren't deleted and would sometimes trigger erroneous System Log entries. This fix will be slowly made available to all orgs. (OKTA-881642)

### Monthly release 2025.08.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Breached Credentials Protection is GA in Preview](#breached-credentials-protection-is-ga-in-preview) | May 15, 2025 |
| [Clear user factors for all devices is GA in Preview](#clear-user-factors-for-all-devices-is-ga-in-preview) | August 7, 2025 |
| [Encryption of ID tokens and access tokens is EA](#encryption-of-id-tokens-and-access-tokens-is-ea) | August 7, 2025 |
| [Expanded use of user.getGroups() function in Okta Expression Language is GA in Production](#expanded-use-of-user-getgroups-function-in-okta-expression-language-is-ga-in-production) |June 4, 2025 |
| [Group Push Mappings is GA in Preview](#group-push-mappings-is-ga-in-preview) | August 7, 2025 |
| [Multiple active IdP signing certificates is EA](#multiple-active-idp-signing-certificates-is-ea) | August 7, 2025 |
| [New user profile permission](#new-user-profile-permission) | August 7, 2025 |
| [OAuth 2.0 provisioning for Org2Org with Autorotation is GA in Production](#oauth-2-0-provisioning-for-org2org-with-autorotation-is-ga-in-production) | April 2, 2025 |
| [Service Accounts API is EA](#service-accounts-api-is-ea) | August 7, 2025 |
| [Unified claims generation for custom apps is self-service EA in Preview](#unified-claims-generation-for-custom-apps-is-self-service-ea-in-preview) | July 30, 2025 |
| [Web app integrations now mandate the use of the Authorization Code flow](#web-app-integrations-now-mandate-the-use-of-the-authorization-code-flow) | August 7, 2025 |
| [Developer documentation updates in 2025.08.0](#developer-documentation-updates-in-2025-08-0) | August 7, 2025 |

#### Breached Credentials Protection is GA in Preview

Protect your org from the impact of credentials that have been compromised. If Okta determines that a username and password combination has been compromised after being compared to a third-party curated dataset, the protection response is customizable through password policies, including resetting the user's password, forcing a logout, or calling a delegated Workflow. See the [Okta Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/). <!-- BREACHED_CREDENTIALS_ADMIN_UX OKTA-822284 -->

#### Clear user factors for all devices is GA in Preview

When you make a Revoke all user sessions `(/api/v1/users/{userId}/sessions)` request, include the new [`forgetDevices` parameter](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserSessions/#tag/UserSessions/operation/revokeUserSessions!in=query&path=forgetDevices&t=request) (with a value of `true`) to clear a user's remembered factors on all devices. The user is prompted for full authentication on their next sign-in attempt from any device. The `forgetDevices` parameter is set to `false` by default. <!-- ENG_ENABLE_FORGET_DEVICES_INTENT_FOR_DELETE_USER_SESSIONS_API OKTA-979587 -->

#### Encryption of ID tokens and access tokens is EA

You can now encrypt OIDC ID tokens for Okta-protected custom app integrations using JSON Web Encryption. You can also now encrypt access tokens minted by a custom authorization server. See [Key management](/docs/guides/key-management/main/). <!-- OIDC_TOKEN_ENCRYPTION OKTA-978457 -->

#### Expanded use of user.getGroups() function in Okta Expression Language is GA in Production

You can now use the `user.getGroups()` function across all features that support Expression Language. See [Group functions](/docs/reference/okta-expression-language/#group-functions). <!-- ENABLE_GET_GROUPS_FUNCTION_ELV2 OKTA-945229-->

#### Group Push Mappings is GA in Preview

With the API for Group Push, admins can now programmatically create, link, or manage group push configuration in Okta. This allows admins to configure Okta groups to be pushed to connected apps at scale and reduces overhead for large deployments. See [Group Push Mappings API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/GroupPushMapping/). <!-- OKTA-962537 GROUP_PUSH_MAPPINGS_PUBLIC_API-->

#### Multiple active IdP signing certificates is EA

Okta now supports multiple active signing certificates for a single SAML identity provider (IdP), enabling seamless certificate rotation with zero downtime. Use the new [`additionalKids` parameter](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentityProvider/#tag/IdentityProvider/operation/createIdentityProvider!path=protocol/0/credentials/trust/additionalKids&t=request) to add another signing certificate for the IdP. You can upload up to two certificates per IdP connection. This improvement eliminates the need for tightly coordinated swaps with IdP partners and reduces the risk of authentication failures due to expired certificates. <!-- IDP_ENABLE_MULTIPLE_SIGNING_CERTS OKTA-986239 -->

#### New user profile permission

A new user profile permission (`okta.users.userprofile.read`) is now available that allows granular read-only access to the user profile. See [Permissions](https://developer.okta.com/docs/api/openapi/okta-management/guides/permissions/#oktausersuserprofileread). <!--OKTA-984996-->

#### OAuth 2.0 provisioning for Org2Org with Autorotation is GA in Production

Admins deploying multi-org architectures (for example Okta hub-and-spoke orgs) need to secure user and group provisioning. Provisioning using OAuth2.0 scoped tokens has several advantages over API tokens, including more access granularity, shorter token lifespans, and automatic key rotation. You can now enable OAuth 2.0 Auto-Rotation for Org2Org app provisioning directly from the Admin Console, in addition to the API.

To support these updates, the Application Connections API includes a new endpoint, [Retrieve a JSON Web Key Set (JWKS) for the default provisioning connection](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationConnections/#tag/ApplicationConnections/operation/getUserProvisioningConnectionJWKS), and schema updates to support token autorotation, `rotationMode=AUTO`. See [Update the default provisioning connection](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationConnections/#tag/ApplicationConnections/operation/updateDefaultProvisioningConnectionForApplication!path=1/profile&t=request) and [Integrate Okta Org2Org with Okta](https://help.okta.com/okta_help.htm?type=oie&id=ext-org2org-intg#Use2). <!-- [OKTA-903533] FF ORG2ORG_ENABLE_PROVISION_JWK -->

#### Service Accounts API is EA

The new [Service Accounts API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ServiceAccount/) is now available for Okta Privileged Access-enabled orgs. This API allows you to manage SaaS or On-Prem Provisioning (OPP) app accounts. App accounts that you create through the Service Accounts API are visible to resource admins in the Okta Privileged Access dashboard. See [Manage service accounts](https://help.okta.com/okta_help.htm?type=oie&id=saas-manage-service-accounts) in the Okta Privileged Access product documentation.

This feature is available only if you're subscribed to Okta Privileged Access. Ensure that you've set up the Okta Privileged Access app before creating app accounts through the API.
<!-- OKTA-926544 OKTA-982940 SERVICE_ACCOUNTS_AD -->

#### Unified claims generation for custom apps is self-service EA in preview

Unified claims generation is a new streamlined interface for managing claims (OIDC) and attribute statements (SAML) for Okta-protected custom app integrations. In addition to group and user profile claims, the following new claim types are available: `entitlements` (required OIG), `device.profile`, `session.id`, and `session.amr`. Collection projections in Expression Language can also be used to get claims information. See [Okta Expression Language in Identity Engine](/docs/reference/okta-expression-language-in-identity-engine/). <!-- GENERIC_FEDERATED_CLAIM_LAYER OKTA-971830 -->

#### Web app integrations now mandate the use of the Authorization Code flow

To enhance security, web app integrations now mandate the use of the Authorization Code flow, as the Implicit flow is no longer recommended. See [Build a Single Sign-On (SSO) integration](https://developer.okta.com/docs/guides/build-sso-integration/openidconnect/main/#determine-the-oauth-2-0-flow-to-use).
<!-- OKTA-703909 -->

#### Developer documentation updates in 2025.08.0

The **Archived Okta Identity Governance API changelog (2023-2024)** has been removed. For updates on these APIs, see the [Okta Identity Governance API release notes](/docs/release-notes/2025-okta-identity-governance/).

## July

### Weekly release 2025.07.3

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2025.07.3](#bugs-fixed-in-2025-07-3) | July 30, 2025 |

#### Bugs fixed in 2025.07.3

* Okta displayed different error messages for valid and invalid usernames after failed sign-in attempts (failed `POST /authn/factors/{factorIdOrFactorType}/verify` requests). (OKTA-958229)
* The List all user grants operation (`/api/v1/users/me/grants`) didn't include pagination links in the header of the response. (OKTA-918661)
* The Attack Protection API endpoints returned HTTP 404 Not Found errors unless `-admin` was appended to your org subdomain in the URL path. You can now use your standard org subdomain in the URL path when using the Attack Protection API. (OKTA-925650)

### Weekly release 2025.07.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2025.07.1](#bugs-fixed-in-2025-07-1) | July 9, 2025 |

#### Bugs fixed in 2025.07.1

- The multiple identifiers feature didn't process case sensitivity correctly when evaluating identifier attributes. (OKTA-899235)
- When GET `/api/v1/apps/{appId}` is called, admins with the `okta.groups.appAssignment.manage` permission or `okta.users.appAssignment.manage` permission could view app details without having the required `okta.apps.manage` or `okta.apps.read` permissions. (OKTA-801567)

### Monthly release 2025.07.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [OAuth 2.0 provisioning for Org2Org with key auto-rotation is GA in Preview](#oauth-2-0-provisioning-for-org2org-with-key-auto-rotation-is-ga-in-preview) | July 2, 2025|
| [System Log event for monitoring LDAP Agent config file changes is EA](#system-log-event-for-monitoring-ldap-agent-config-file-changes-is-ea) | July 2, 2025 |
| [New validation rule for user profile attributes in OIN Wizard](#new-validation-rule-for-user-profile-attributes-in-oin-wizard) | July 2, 2025 |
| [Conditions for create user permission is GA in Production](#conditions-for-create-user-permission-is-ga-in-production) | June 9, 2025 |
| [Changes to Okta app API responses](#changes-to-okta-app-api-responses) | July 7, 2025 |
| [Restrict access to the Admin Console is GA in Production](#restrict-access-to-the-admin-console-is-ga-in-production) | December 11, 2024 |
| [Developer documentation updates in 2025.07.0 ](#developer-documentation-updates-in-2025-07-0) | July 2, 2025 |
| [Bug fixed in 2025.07.0 ](#bug-fixed-in-2025-07-0) | July 2, 2025 |

#### OAuth 2.0 provisioning for Org2Org with key auto-rotation is GA in Preview

Admins deploying multi-org architectures (for example, Okta hub-and-spoke orgs) need to secure user and group provisioning. Provisioning using OAuth2.0 scoped tokens has several advantages over API tokens, including more access granularity, shorter token lifespans, and automatic key rotation. You can now enable OAuth 2.0 Auto-Rotation for Org2Org app provisioning directly from the Admin Console, in addition to the API.

To support these updates, the Application Connections API includes a new endpoint, [Retrieve a JSON Web Key Set (JWKS) for the default provisioning connection](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationConnections/#tag/ApplicationConnections/operation/getUserProvisioningConnectionJWKS), and schema updates to support key auto-rotation, `rotationMode=AUTO`. See [Update the default provisioning connection](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationConnections/#tag/ApplicationConnections/operation/updateDefaultProvisioningConnectionForApplication!path=1/profile&t=request) and [Integrate Okta Org2Org with Okta](https://help.okta.com/okta_help.htm?type=oie&id=ext-org2org-intg#Use2). <!-- [OKTA-903533] FF ORG2ORG_ENABLE_PROVISION_JWK -->

#### System Log event for monitoring LDAP Agent config file changes is EA

A `system.agent.ldap.config_change_detected` event is generated when an LDAP agent detects changes to its configuration file. <!--OKTA-912260-->

#### New validation rule for user profile attributes in OIN Wizard

The OIN Wizard now requires the use of valid user profile properties when referencing attribute values in EL expressions. The system rejects any invalid user EL expressions and attributes that aren't included in the allowlist. See [SAML properties](https://developer.okta.com/docs/guides/submit-oin-app/saml2/main/#properties). <!--OKTA-820691-->

#### Conditions for create user permission is GA in Production

You can now add conditions to the `okta.user.create` permission for custom admin roles. This enables you to granularly control which user attributes admins can set values for during user creation. See [Permissions conditions](https://developer.okta.com/docs/api/openapi/okta-management/guides/permissions/#permissions-conditions). <!--OKTA-907853-->

#### Changes to Okta app API responses

The following Okta apps won't be returned in the API response for endpoints that list apps (such as the [List all applications](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/#tag/Application/operation/listApplications) `GET /api/vi/apps` endpoint):

* Okta Access Certifications (key name: `okta_iga`)
* Okta Access Requests Admin (key name: `okta_access_requests_admin`)
* Okta Entitlement Management (key name: `okta_entitlement_management`)

In addition, a single app retrieval endpoint won't return these apps either. For example: `GET /api/v1/apps/{appId}` won't return the app object if `{appId}` is the ID for the `okta_iga`, `okta_access_requests_admin`, or `okta_entitlement_management` apps in your org.
<!-- OKTA-871526 ENG_ENABLE_UI_ADMIN_OIDC_APP -->

#### Restrict access to the Admin Console is GA in Production

By default, users and groups with assigned admin roles have access to the Admin Console app. With this feature, super admins can choose to manually assign the app to delegated admins instead. This is recommended for orgs with admins who don't need access, like business partners, third-party admins, or admins who only use the Okta API. See [Configure administrator settings](https://help.okta.com/okta_help.htm?type=oie&id=administrator-settings) and the corresponding APIs: [Retrieve the Okta Admin Console Assignment Setting](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgSettingAdmin/#tag/OrgSettingAdmin/operation/getAutoAssignAdminAppSetting) and [Update the Okta Admin Console Assignment Setting](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgSettingAdmin/#tag/OrgSettingAdmin/operation/updateAutoAssignAdminAppSetting). <!-- OKTA-717742 ADMIN_APP_AND_ROLE_DECOUPLING -->

#### Developer documentation updates in 2025.07.0

* The [Okta Admin Management](https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/ ) APIs have been reorganized into functional service groups for improved navigation and user experience. All previous anchors and links to the APIs remain the same. <!--OKTA-918957-->

* The **Agent Pools** API has been renamed  [**Directory Agent Pools**](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AgentPools/) API and is now grouped under **External Identity Sources**. There are no other changes to the API. All previous anchors and links to the API remain the same. <!--OKTA-955807-->

* The [Password import inline hook](/docs/guides/password-import-inline-hook/nodejs/main/) guide was revised to demonstrate the hook call using the [ngrok utility](https://ngrok.com/), rather than the sample code hosted on [Glitch.com](https://glitch.com/). The hosted sample app on Glitch is scheduled for deprecation on July 8th, 2025. <!--OKTA-949440-->

#### Bug fixed in 2025.07.0

Admins couldn't modify the `classicFooterHelpTitle` object on their sign-in page when sending PUT requests to these endpoints.
* `/api/v1/brands/{brandId}/pages/sign-in/customized`
* `/api/v1/brands/{brandId}/pages/sign-in/preview`
* `/api/v1/brands/{brandId}/pages/sign-in/default`

GET requests didn't return the object either. (OKTA-917840)

## June

### Weekly release 2025.06.2

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Network zone restrictions for clients is self-service EA in Preview](#network-zone-restrictions-for-clients-is-self-service-ea-in-preview) | Jun 25, 2025 |
| [Org2Org OIDC Sign-on mode is self-service EA in Preview](#org2org-oidc-sign-on-mode-is-self-service-ea-in-preview) | Jun 17, 2025 |
| [Okta Integration IdP type is self-service EA in Preview](#okta-integration-idp-type-is-self-service-ea-in-preview) | Jun 25, 2025 |
| [Bugs fixed in 2025.06.2](#bugs-fixed-in-2025-06-2)| Jun 25, 2025 |

#### Network zone restrictions for clients is self-service EA in Preview

You can now specify an allowlist or denylist network zone for each client to enhance token endpoint security. <!-- OIDC_TOKEN_NETWORK_RESTRICTIONS (OKTA-958762) -->

#### Org2Org OIDC Sign-on mode is self-service EA in Preview

The Org2Org app now includes an OIDC Sign-on mode using the Okta Integration IdP. This sign-on mode reduces the complexity of configuration between the Org2Org app and the target org, and takes advantage of modern security features of OIDC. You also need to enable the Okta Integration IdP feature to use the OIDC Sign-on mode. See [Secure API connections between orgs with OAuth 2.0](/docs/guides/secure-oauth-between-orgs/main/). <!-- OKTA-714847 FF ORG2ORG_ENABLE_OIDC_SOM Publishing delayed until 6.2 OKTA-950222 -->

#### Okta Integration IdP type is self-service EA in Preview

The new Okta Integration IdP type allows you to configure Org2Org OIDC IdPs with secure defaults. See [Identity Providers](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentityProvider/#tag/IdentityProvider/operation/listIdentityProviders!c=200&path=type&t=response) and [Add an Okta Identity Provider](https://help.okta.com/okta_help.htm?type=oie&id=idp-add-okta).<!-- OKTA_INTEGRATION_IDP_TYPE (OKTA-949786) -->

#### Bugs fixed in 2025.06.2

* When an app with imported app groups was deactivated, and users were subsequently removed from these groups, the event wasn't recorded in the System Log. (OKTA-934264)

* The delete operation for the Roles API (`/iam/roles/{roleIdOrLabel}`) and the Resource Sets API (`/iam/resource-sets/{iamPolicyIdOrLabel}`) allowed users to delete IAM-based standard roles and resource sets, respectively. (OKTA-926830)

* The expiry time of one-time verification code emails didn't appear in the message. (OKTA-911703)

* Using a private/public key for client authentication with an empty `kid` in the assertion threw a null pointer exception if there was an invalid `use` parameter in the key. (OKTA-963932)

### Weekly release 2025.06.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Frame-ancestors rollout for Content Security Policy](#frame-ancestors-rollout-for-content-security-policy) | Jun 17, 2025 |
| [Bugs fixed in 2025.06.1](#bugs-fixed-in-2025-06-1)| Jun 17, 2025 |

#### Frame-ancestors rollout for Content Security Policy

Okta is rolling out the frame-ancestors directive of the Content Security Policy (CSP) for the `/auth/services/devicefingerprint` and `/api/v1/internal/device/nonce` endpoints. To prevent blocking access to these endpoints from embedded frames, add any embedder origin as a trusted origin. See the [Trusted Origins API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/TrustedOrigin/).

In addition, Okta is rolling out the use of `nonce` with the script-src directive of the CSP for the `/auth/services/devicefingerprint`. To prevent blocking inline scripts that you may have injected on the page returned by this endpoint, allowlist your inline script to account for the `nonce` addition to script-src.
 <!-- OKTA-955073 -->

#### Bugs fixed in 2025.06.1

* When calling the Replace the resource set resource conditions endpoint, `/api/v1/iam/resource-sets/{resourceSetIdOrLabel}/resources/{resourceId}`, including an empty body didn't remove conditions. (OKTA-947764)

* The Directories Integration API for AD Bidirectional Group Management returned a 500 error because of a null pointer exception. (OKTA-948743)

* User grants weren't returned from the Users API (`/users/<userId>clients/<clientId>/grants`) after revoking user sessions and OAuth 2.0 tokens. (OKTA-944549)

* Users could sometimes receive too many password reset emails. (OKTA-916357)

* App logos could be added or updated using any SVG format. See [Application Logos](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationLogos/#tag/ApplicationLogos/operation/uploadApplicationLogo!path=file&t=request). (OKTA-876028)

### Monthly release 2025.06.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Admins prevented from deleting published app instances](#admins-prevented-from-deleting-published-app-instances) | June 4, 2025 |
| [Authentication claims sharing between Okta orgs is GA in Production](#authentication-claims-sharing-between-okta-orgs-is-ga-in-production) | May 7, 2025 |
| [Claims sharing between third-party IdPs and Okta is GA in Production](#claims-sharing-between-third-party-idps-and-okta-is-ga-in-production) | April 9, 2025 |
| [Conditions for create user permission](#conditions-for-create-user-permission) | June 9, 2025 |
| [Define default values for custom user attributes is GA in Production](#define-default-values-for-custom-user-attributes-is-ga-in-production) |  May 7, 2025 |
| [Domain restrictions on Realms is GA in Production](#domain-restrictions-on-realms-is-ga-in-production) | April 23, 2025 |
| [Number matching challenge with the Factors API is GA in Production](#number-matching-challenge-with-the-factors-api-is-ga-in-production) | April 9, 2025 |
| [Restrict access to the Admin Console is GA in Preview](#restrict-access-to-the-admin-console-is-ga-in-preview) | December 11, 2024 |
| [Expanded use of user.getGroups() function in Okta Expression Language is GA in Preview](#expanded-use-of-user-getgroups-function-in-okta-expression-language-is-ga-in-preview)| June 4, 2025 |
| [Developer documentation updates in 2025.06.0](#developer-documentation-updates-in-2025-06-0) | June 4, 2025 |
| [Bug fixed in 2025.06.0](#bug-fixed-in-2025-06-0)| June 4, 2025 |

#### Admins prevented from deleting published app instances

When an app instance has the **Published** version status in OIN Wizard, admins can no longer delete it from the Integrator Free Plan org. <!-- OKTA-689770 -->

#### Authentication claims sharing between Okta orgs is GA in Production

Authentication claims sharing allows an admin to configure their Okta org to trust claims from IdPs during SSO. Sharing claims also allows Okta to interpret the authentication context from an IdP. This helps eliminate duplicate factor challenges during user authentication and helps improve security posture. See [Configure claims sharing](/docs/guides/configure-claims-sharing/oktasaml/main/).  <!-- OKTA-802451 ORG2ORG_CLAIMS_SHARING -->

#### Claims sharing between third-party IdPs and Okta is GA in Production

Authentication claims sharing allows an admin to configure their Okta org to trust claims from third-party IdPs during SSO. Sharing claims also allows Okta to interpret the authentication context from a third-party IdP. This helps eliminate duplicate factor challenges during user authentication and helps improve security posture. See [Configure claims sharing](/docs/guides/configure-claims-sharing/oktasaml/main/). <!-- OKTA-901817 THIRD_PARTY_IDP_CLAIMS_SHARING -->

#### Conditions for create user permission

You can now add conditions to the `okta.user.create` permission for custom admin roles. This enables you to granularly control which user attributes admins can set values for during user creation. See [Permissions conditions](https://developer.okta.com/docs/api/openapi/okta-management/guides/roles/#permissions-conditions).

#### Define default values for custom user attributes is GA in Production

You can now define default values for custom attributes in a user profile. See the [Update User Profile](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Schema/#tag/Schema/operation/updateUserProfile) endpoint in the Schemas API. <!-- OKTA-907852 ENG_ENABLE_ATTRIBUTE_DEFAULTS -->

#### Domain restrictions on Realms is GA in Production

You can now limit users to a specific domain in Realms, which adds an extra layer of oversight for realm and partner admins and enforces boundaries between user populations. See the [Realms](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Realm/) and [Realm Assignments](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/RealmAssignment/) APIs. <!-- OKTA-907851 UD_REALMS_PROFILE_WITH_DOMAIN -->

#### Number matching challenge with the Factors API is GA in Production

You can now send number matching challenges for Okta Verify `push` factor enrollments when you send POST requests to the `/users/{userId}/factors/{factorId}/verify` endpoint. For orgs that can't adopt Okta FastPass, this feature improves their overall security.  See the [Factors API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserFactor/#tag/UserFactor/operation/verifyFactor). <!-- OKTA-903176 ENABLE_FACTORS_API_NUMBER_MATCHING_CHALLENGE -->

#### Restrict access to the Admin Console is GA in Preview

By default, users and groups with assigned admin roles have access to the Admin Console app. With this feature, super admins can choose to manually assign the app to delegated admins instead. This is recommended for orgs with admins who don't need access, like business partners, third-party admins, or admins who only use the Okta API. See [Configure administrator settings](https://help.okta.com/okta_help.htm?type=oie&id=administrator-settings) and the corresponding APIs: [Retrieve the Okta Admin Console Assignment Setting](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgSettingAdmin/#tag/OrgSettingAdmin/operation/getAutoAssignAdminAppSetting) and [Update the Okta Admin Console Assignment Setting](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgSettingAdmin/#tag/OrgSettingAdmin/operation/updateAutoAssignAdminAppSetting). <!-- OKTA-717742 ADMIN_APP_AND_ROLE_DECOUPLING -->

#### Expanded use of user.getGroups() function in Okta Expression Language is GA in Preview

You can now use the `user.getGroups()` function across all features that support Expression Language. See [Group functions](/docs/reference/okta-expression-language/#group-functions). <!-- ENABLE_GET_GROUPS_FUNCTION_ELV2 OKTA-945229-->

#### Developer documentation updates in 2025.06.0

* The **Email Customization** API has been relabelled as the [**Org Email Settings** API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/EmailCustomization/). There are no other changes to the API. All previous anchors and links to the API remain the same.

* New [release notes for Okta Privileged Access APIs](/docs/release-notes/2025-okta-privileged-access/) are now available.

#### Bug fixed in 2025.06.0

An HTTP 500 error occurred when API requests were sent to `api/v1/policies/{policyId}` and `api/v1/policies/{policyId}/rules/{ruleID}` with certain values in the Accept header. (OKTA-892315)

## May

### Weekly release 2025.05.3

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Integrator Free Plan org now available](#integrator-free-plan-org-now-available) | May 22, 2025 |
| [Bugs fixed in 2025.05.3](#bugs-fixed-in-2025-05-3)| May 29, 2025 |

#### Integrator Free Plan org now available

The Integrator Free Plan org is now available on the [Sign up](/signup) page of the developer documentation site. These orgs replace the previous Developer Editions Service orgs, which will start being deactivated on July 18th. See [Changes Are Coming to the Okta Developer Edition Organizations](https://developer.okta.com/blog/2025/05/13/okta-developer-edition-changes). For information on the configurations for the Integrator Free Plan orgs, see [Okta Integrator Free Plan org configurations](/docs/reference/org-defaults/). <!-- OKTA-892454 -->

#### Bugs fixed in 2025.05.3

* When enrolling an `sms` factor (`POST /users/{userId}/factors`), an Invalid Phone Number error was sometimes incorrectly returned. (OKTA-923373)

### Weekly release 2025.05.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2025.05.1](#bugs-fixed-in-2025-05-1)| May 14, 2025 |

#### Bugs fixed in 2025.05.1

* When Okta-to-Okta claims sharing was enabled for a Classic Engine org to an Identity Engine org flow, and the State Token for All Flows feature flag was enabled in the Classic Engine org, users were prompted for MFA on the Identity Engine org when MFA had already been completed on the Classic Engine org. (OKTA-932454)

* An error appeared for some Org2Org users after they completed multifactor authentication when Claims Sharing was enabled. (OKTA-932402)

* In some situations, the `/api/v1/agentPools` API failed to return agents that were stuck in an error state. (OKTA-910056)

### Monthly release 2025.05.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Breached Credentials Protection is EA in Preview](#breached-credentials-protection-is-ea-in-preview) | May 15, 2025 |
| [New User Role Targets API endpoint](#new-user-role-targets-api-endpoint) | May 7, 2025 |
| [Define default values for custom user attributes](#define-default-values-for-custom-user-attributes) | May 7, 2025 |
| [Directories integration API is GA in Preview and Production](#directories-integration-api-is-ga-in-preview-and-production) | May 7, 2025 |
| [Number matching challenge with the Factors API is GA in Preview](#number-matching-challenge-with-the-factors-api-is-ga-in-preview) | May 7, 2025 |
| [Claims sharing between third-party IdPs and Okta is GA in Preview](#claims-sharing-between-third-party-idps-and-okta-is-ga-in-preview) | May 7, 2025 |
| [Entitlement claims is GA in Production](#entitlement-claims-is-ga-in-production) | January 2, 2025 |
| [POST requests to authorize endpoint is GA in Production](#post-requests-to-authorize-endpoint-is-ga-in-production) | January 8, 2025 |
| [Authentication claims sharing between Okta orgs is GA in Preview](#authentication-claims-sharing-between-okta-orgs-is-ga-in-preview) | May 7, 2025 |
| [Bugs fixed in 2025.05.0](#bugs-fixed-in-2025-05-0)| May 7, 2025 |

#### Breached Credentials Protection is EA in Preview

Protect your org from the impact of credentials that have been compromised. If Okta determines that a username and password combination has been compromised after being compared to a third-party curated dataset, the protection response is customizable through password policies, including resetting the user's password, forcing a logout, or calling a delegated Workflow. See the [Okta Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/).

This feature is following a slow rollout process beginning on May 15. <!-- OKTA-925699 -->

#### New User Role Targets API endpoint

The User Role Targets API now includes a new endpoint, [Retrieve a role target by assignment type](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/RoleBTargetAdmin/#tag/RoleBTargetAdmin/operation/getRoleTargetsByUserIdAndRoleId), that retrieves role targets by user or group assignment type. <!--OKTA-909953 -->

#### Define default values for custom user attributes

You can now define default values for custom attributes in a user profile. See the [Update User Profile](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Schema/#tag/Schema/operation/updateUserProfile) endpoint in the Schemas API. <!-- OKTA-907852 -->

#### Directories integration API is GA in Preview and Production

The Directories Integration API provides operations to manage Active Directory (AD) group memberships using Okta. This API enables you to define adding or removing users for AD groups. This is now generally available. Previously, this was only available to subscribers of Okta Identity Governance. See [Directories Integration](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DirectoriesIntegration/). <!--AD_BIDIRECTIONAL_GROUP_MANAGEMENT OKTA-734564 OKTA-906684-->

#### Number matching challenge with the Factors API is GA in Preview

You can now send number matching challenges for Okta Verify `push` factor enrollments when you send POST requests to the `/users/{userId}/factors/{factorId}/verify` endpoint. For orgs that can't adopt Okta FastPass, this feature improves their overall security.  See the [Factors API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserFactor/#tag/UserFactor/operation/verifyFactor). <!-- OKTA-903176 -->

#### Claims sharing between third-party IdPs and Okta is GA in Preview

Authentication claims sharing allows an admin to configure their Okta org to trust claims from third-party IdPs during SSO. Sharing claims also allows Okta to interpret the authentication context from a third-party IdP. This helps eliminate duplicate factor challenges during user authentication and helps improve security posture. See [Configure claims sharing](/docs/guides/configure-claims-sharing/oktasaml/main/). <!-- ORG2ORG_CLAIMS_SHARING  OKTA-901817 -->

#### Entitlement claims is GA in Production

You can now enrich tokens with app entitlements that produce deeper integrations. After you configure this feature for your app integration, use the [Okta Expression Language in Identity Engine](/docs/reference/okta-expression-language-in-identity-engine/#reference-attributes) to add entitlements at runtime as OpenID Connect claims and SAML assertions. See [Federated claims with entitlements](/docs/guides/federated-claims/main/). <!-- FEDERATED_CLAIM_GENERATION_LAYER https://oktainc.atlassian.net/browse/OKTA-847041 OKTA-834142 -->

#### POST requests to authorize endpoint is GA in Production

You can now send user data securely in a POST request body to the /authorize endpoint. <!-- OKTA-827104 OAUTH2_AUTHORIZE_WITH_POST -->

#### Authentication claims sharing between Okta orgs is GA in Preview

Authentication claims sharing allows an admin to configure their Okta org to trust claims from IdPs during SSO. Sharing claims also allows Okta to interpret the authentication context from an IdP. This helps eliminate duplicate factor challenges during user authentication and helps improve security posture. See [Configure claims sharing](/docs/guides/configure-claims-sharing/oktasaml/main/). <!-- ORG2ORG_CLAIMS_SHARING OKTA-856733 OKTA-802451 -->

#### Bugs fixed in 2025.05.0

* If a third-party SAML IdP sent the `session.amr` SAML attribute without the attribute schema type, Okta rejected the response when the third-party claims sharing feature was enabled. (OKTA-925864)

* When third-party IdP claims sharing was enabled, the redirect to the IdP happened during reauthentication even if the IdP didn't provide any AMR claims. (OKTA-922086)

## April

### Weekly release 2025.04.3

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2025.04.3](#bugs-fixed-in-2025-04-3)| April 30, 2025 |

#### Bugs fixed in 2025.04.3

* Some versions of the Sign-In Widget v3 returned an error when trying to display the consent screen. (OKTA-755616)

* Requests made using the `sortBy` parameter with custom attributes to the List all users or List all groups endpoints threw an HTTP 400 Bad Request error. (OKTA-886166)

* Some admins with a custom role (`okta.apps.read`, `okta.apps.clientCredentials.read` permissions) couldn’t view client secrets for apps that they had permission to view. (OKTA-893511)

* The number of groups that could be returned in tokens for a groups claim was still restricted in the authorization code sign-in flow when an inline hook was used. (OKTA-907362)

* When a resource set contained a `devices` resource, the Retrieve a resource endpoint returned a `null` response for the devices `self` object. (OKTA-914364)

* When the List all Subscriptions API with a Workflows Administrator role (`WORKFLOWS_ADMIN`) was called, an HTTP 400 Bad Request error was returned. (OKTA-918276)

* Users received an HTTP 400 Bad Request error during self-service registration in preview orgs with a Registration Inline hook. (OKTA-918774)

* When an Okta Classic Engine org was involved in a multi-org Okta-to-Okta authentication flow, and Okta-to-Okta claims sharing was enabled, the `OktaAuth` (SAML) and `okta_auth` (OIDC) claims weren't processed correctly. (OKTA-918969)

### Weekly release 2025.04.2

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Subscriptions API no longer supports OKTA_ISSUE](#subscriptions-api-no-longer-supports-okta-issue)| April 9, 2025 |
| [Bugs fixed in 2025.04.2](#bugs-fixed-in-2025-04-2)| April 16, 2025 |

#### Subscriptions API no longer supports OKTA_ISSUE

The Subscriptions API no longer supports the `notificationType` value `OKTA_ISSUE`. <!-- OKTA-OKTA-896136 and OKTA-917819 -->

#### Bugs fixed in 2025.04.2

* Email notifications weren’t sent to end users when security methods were enrolled using POST requests to the `/users/{userId}/factors` endpoint and the `activate` parameter was set to `true`. (OKTA-891169)

* Updates made to ACS URIs for an app using the Applications API (PUT `/apps/{appId}`) didn't take effect if the app was created without those URLs. (OKTA-909218)

### Weekly release 2025.04.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Claims sharing between third-party IdPs and Okta is self-service EA in Preview](#claims-sharing-between-third-party-idps-and-okta-is-self-service-ea-in-preview) | April 9, 2025 |
| [Number matching challenge with the Factors API is self-service EA in Preview](#number-matching-challenge-with-the-factors-api-is-self-service-ea-in-preview) | April 9, 2025 |
| [OAuth 2.0 provisioning for Org2Org with Auto-Rotation is self-service EA in Preview](#oauth-2-0-provisioning-for-org2org-with-auto-rotation-is-self-service-ea-in-preview) | April 2, 2025 |
| [Bugs fixed in 2025.04.1](#bugs-fixed-in-2025-04-1)| April 9, 2025 |

#### Advanced device posture checks

Advanced posture checks provide extended device assurance to users. It empowers admins to enforce compliance based on customized device attributes that extend beyond Okta’s standard checks. Using osquery, this feature facilitates real-time security assessments across macOS devices. As a result, orgs gain enhanced visibility and control over their device fleet and ensure that only trusted devices can access sensitive resources. See [Configure advanced posture checks for device assurance](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-assurance-adv-posture-check) and the [Device Posture Checks API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DevicePostureCheck/). <!--OKTA-854221 OSQUERY_CUSTOM_DEVICE_POSTURE_CHECKS -->

#### Claims sharing between third-party IdPs and Okta is self-service EA in Preview

Authentication claims sharing allows an admin to configure their Okta org to trust claims from third-party IdPs during SSO. Sharing claims also allows Okta to interpret the authentication context from a third-party IdP. This helps eliminate duplicate factor challenges during user authentication and helps improve security posture. See [Configure claims sharing](/docs/guides/configure-claims-sharing/oktasaml/main/).<!--OKTA-901817 ORG2ORG_CLAIMS_SHARING -->

#### Number matching challenge with the Factors API is self-service EA in Preview

You can now send number matching challenges for Okta Verify `push` factor enrollments when you send POST requests to the `/users/{userId}/factors/{factorId}/verify` endpoint. For orgs that can't adopt Okta FastPass, this feature improves their overall security. See the [Factors API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserFactor/#tag/UserFactor/operation/verifyFactor).<!--OKTA-903176 OKTA ENABLE_FACTORS_API_NUMBER_MATCHING_CHALLENGE-->

#### OAuth 2.0 provisioning for Org2Org with Auto-Rotation is self-service EA in Preview

Admins deploying multi-org architectures (for example, Okta hub-and-spoke orgs) need to secure user and group provisioning. Provisioning using OAuth 2.0 scoped tokens has several advantages over API tokens, including more access granularity, shorter token lifespans, and automatic key rotation. You can now enable OAuth 2.0 Auto-Rotation for Org2Org app provisioning directly from the Admin Console, in addition to the API.

To support these updates, the Application Connections API includes a new endpoint, [Retrieve a JSON Web Key Set (JWKS) for the default provisioning connection](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationConnections/#tag/ApplicationConnections/operation/getUserProvisioningConnectionJWKS), and schema updates to support token autorotation, `rotationMode=AUTO`. See [Update the default provisioning connection](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationConnections/#tag/ApplicationConnections/operation/updateDefaultProvisioningConnectionForApplication!path=1/profile&t=request) and [Integrate Okta Org2Org with Okta](https://help.okta.com/okta_help.htm?type=oie&id=ext-org2org-intg#Use2). <!-- OKTA-903533 FF ORG2ORG_ENABLE_PROVISION_JWK -->

#### Bugs fixed in 2025.04.1

* In Preview orgs, org admins couldn't edit IdP group assignments when a super admin group was included in the group list. (OKTA-880124)

* The `id_token_hint` parameter was exposed in the System Log. (OKTA-890738)

* POST requests to the `/authorize` endpoint that contained query parameters received an error. (OKTA-905143)

### Monthly release 2025.04.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Domain restrictions on Realms](#domain-restrictions-on-realms) | April 2, 2025 |
| [OAuth 2.0 provisioning for Org2Org with Auto-Rotation is EA in Preview](#oauth-2-0-provisioning-for-org2org-with-auto-rotation-is-ea-in-preview) | April 2, 2025 |
| [OIN test account information deleted after 30 days](#oin-test-account-information-deleted-after-30-days) | April 2, 2025 |
| [POST requests to authorize endpoint is GA Preview](#post-requests-to-authorize-endpoint-is-ga-preview) | January 8, 2025 |
| [Integration variable limit increase in OIN Submission](#integration-variable-limit-increase-in-oin-submission) | April 2, 2025 |
| [Conditional requests and entity tags are GA in Production](#conditional-requests-and-entity-tags-are-ga-in-production) | January 16, 2025 |
| [New rate limit event type](#new-rate-limit-event-type) | April 2, 2025 |
| [Create dynamic resource sets with conditions is GA in Preview](#create-dynamic-resource-sets-with-conditions-is-ga-in-preview) | November 7, 2024 |
| [Developer documentation update in 2025.04.0](#developer-documentation-update-in-2025-04-0) | April 2, 2025 |
| [Bugs fixed in 2025.04.0](#bugs-fixed-in-2025-04-0)| April 2, 2025 |

#### Domain restrictions on Realms

You can now limit users to a specific domain in Realms, which adds an extra layer of oversight for realm and partner admins and enforces boundaries between user populations. See the [Realms](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Realm/) and [Realm Assignments](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/RealmAssignment/) APIs. <!-- OKTA-907851 UD_REALMS_PROFILE_WITH_DOMAIN -->

#### OAuth 2.0 provisioning for Org2Org with Auto-Rotation is EA in Preview

Admins deploying multi-org architectures (for example, Okta hub-and-spoke orgs) need to secure user and group provisioning. Provisioning using OAuth 2.0 scoped tokens has several advantages over API tokens, including more access granularity, shorter token lifespans, and automatic key rotation. You can now enable OAuth 2.0 Auto-Rotation for Org2Org app provisioning directly from the Admin Console, in addition to the API.

To support these updates, the Application Connections API includes a new endpoint, [Retrieve a JSON Web Key Set (JWKS) for the default provisioning connection](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationConnections/#tag/ApplicationConnections/operation/getUserProvisioningConnectionJWKS), and schema updates to support token auto-rotation, `rotationMode=AUTO`. See [Update the default provisioning connection](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationConnections/#tag/ApplicationConnections/operation/updateDefaultProvisioningConnectionForApplication!path=1/profile&t=request) and [Integrate Okta Org2Org with Okta](https://help.okta.com/okta_help.htm?type=oie&id=ext-org2org-intg#Use2). <!-- OKTA-903533 FF ORG2ORG_ENABLE_PROVISION_JWK -->

#### OIN test account information deleted after 30 days

Okta deletes your test account credentials 30 days after you publish your app in **OIN Wizard**. You must create a new test account and re-enter the required information before submitting the app.

#### POST requests to authorize endpoint is GA Preview

You can now send user data securely in a POST request body to the `/authorize` endpoint. <!-- OKTA-827104 OAUTH2_AUTHORIZE_WITH_POST -->

#### Integration variable limit increase in OIN Submission

The maximum number of integration variables allowed in OIN submission has increased from three to eight. The apps migrated from OIN Manager with more than eight variables can retain all existing variables but can't add new variables.

#### Conditional requests and entity tags are GA in Production

You can now use conditional requests and entity tags to tag and check for specific versions of resources. Currently this is only available to use with user profiles. See [Conditional Requests and Entity Tags](https://developer.okta.com/docs/api/#conditional-requests-and-entity-tags). <!-- ETAG_FOR_USERS_API OKTA-822688 -->

#### New rate limit event type

This rate limit event type now appears in the System Log: `system.rate_limit.configuration.update`. It logs the following:

* Changes to client-based rate limit settings
* Changes in the rate limit warning notification threshold
* If the rate limit notification is enabled or disabled
* Updates to the rate-limit percentage of an API token

<!-- OKTA-797466  -->

#### Create dynamic resource sets with conditions is GA in Preview

Resource set conditions help you limit the scope of a role by excluding an admin's access to certain apps. This gives you more granular control over your custom admin roles and helps meet your org's unique security needs. See [Resource set conditions](https://help.okta.com/okta_help.htm?type=oie&id=resource-set-conditions) and the corresponding [Resource Set Resources](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/RoleCResourceSetResource/) API.
<!-- OKTA-746719 DYNAMIC_RESOURCE_SETS -->

#### Developer documentation update in 2025.04.0

The [Update a published integration with the OIN Wizard](/docs/guides/update-oin-app/openidconnect/main/) is a newly restructured guide which consists of our existing publish integration content and a brand new [updating the attribute mapping flow](/docs/guides/update-oin-app/scim/main/#configure-attribute-mappingshttps://developer.okta.com/docs/guides/update-oin-app/scim/main/#configure-attribute-mappings) section for SCIM integrations.

#### Bugs fixed in 2025.04.0

* The result of System Log events triggered by the `use_dpop_nonce` OAuth 2.0 error was FAILURE instead of CHALLENGE. (OKTA-902314)

* Admins couldn't disable the **Trust claims from this identity provider** setting. (OKTA-899883)

* Admins using multiple user types sometimes encountered an internal error when attempting to update an app instance. (OKTA-880825)

* A Policies API GET request (`/api/v1/policies`) returned a `rel="next"` link when there were no more results. (OKTA-858605)

* The OIN Submission Tester didn't support custom domains in the IdP flow. (OKTA-835402)

* When `/api/v1/apps` was called, it returned all applications assigned, even though the user wasn't part of the assigned resource set. (OKTA-826548)

## March

### Weekly release 2025.03.3

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Advanced search using conditioned profile attributes](#advanced-search-using-conditioned-profile-attributes) | March 26, 2025 |
| [Bugs fixed in 2025.03.3](#bugs-fixed-in-2025-03-3)| March 26, 2025 |

#### Advanced search using conditioned profile attributes

If you have an admin role with permission conditions to access certain user profile attributes, you can now search for those users with those attributes. Note that this search enhancement doesn't support the `OR` operator. <!-- OKTA-856262 -->

#### Bugs fixed in 2025.03.3

* Custom role admins with permission conditions couldn't search for users by `firstName` or `lastName`. (OKTA-894392)

* GET requests to the `/api/v1/users/me/appLinks` endpoint sometimes returned an HTTP 500 Internal Server error. (OKTA-873694)

### Weekly release 2025.03.2

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2025.03.2](#bug-fixed-in-2025-03-2)| March 19, 2025 |

#### Bug fixed in 2025.03.2

* Step-up authentication using the ACR value `urn:okta:loa:2fa:any` didn't always challenge the user for an additional authentication factor with each `/authorize` request, even when the user didn't have an upgraded Okta session from initial authentication. (OKTA-754476)

### Weekly release 2025.03.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2025.03.1](#bugs-fixed-in-2025-03-1)| March 12, 2025 |

#### Bugs fixed in 2025.03.1

* `createdBy` and `lastUpdatedBy` custom attributes couldn't be used in group rules. (OKTA-566492)

* Custom admins who were limited to viewing only application group members received incomplete results when using the `List All Users API` without a `search` or `filter` parameter. (OKTA-801592)

* The JSON Web Token that Okta generates and sends to the OpenID Connect identity provider contained a string `exp` instead of a number 'exp'. (OKTA-852446)

* When making POST requests to `users/{userId}/factors/{factorId}/verify` or `authn/factors/{factorId}/verify` endpoints with `factorType` instead of `factorId` in the URL path, multiple failed verification attempts didn't lock users out and the failed attempts weren't logged in the System Log. (OKTA-871469)

### Monthly release 2025.03.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [OIDC IdPs now support group sync is GA in Production](#oidc-idps-now-support-group-sync-is-ga-in-production) | October 23, 2024 |
| [Granular account linking for certain Identity Providers is GA in Production](#granular-account-linking-for-certain-identity-providers-is-ga-in-production) | December 11, 2024 |
| [Improved group search functionality is GA in Production](#improved-group-search-functionality-is-ga-in-production) | February 12, 2025 |
| [Improved user search functionality is GA in Production](#improved-user-search-functionality-is-ga-in-production) | February 12, 2025 |
| [Improved realms and device search functionality is GA in Production](#improved-realms-and-device-search-functionality-is-ga-in-production) | February 12, 2025 |
| [Realms for Workforce is GA in Production](#realms-for-workforce-is-ga-in-production) | February 13, 2025 |
| [Identity Security Posture Management functionality in the OIN catalog](#identity-security-posture-management-functionality-in-the-oin-catalog) | March 5, 2025 |
| [Default global session policy rule update](#default-global-session-policy-rule-update) | March 5, 2025 |
| [Developer documentation update in 2025.03.0](#developer-documentation-update-in-2025-03-0) | March 5, 2025 |
| [Bug fixed in 2025.03.0](#bug-fixed-in-2025-03-0) | March 5, 2025 |

#### OIDC IdPs now support group sync is GA in Production

OpenID Connect identity providers (IdPs) now support full group sync and adding a user to a group that they don't already belong to. A user who authenticates with an external IdP is added to all available groups when **Full sync of groups** is enabled. The user is added to any groups that they don't already belong to when **Add user to missing groups** is enabled. This allows you to specify certain groups that users should be added to. <!-- GROUP_SYNC_FEATURE_OIDC_IDP_ENABLED (https://oktainc.atlassian.net/browse/OKTA-817450#icft=OKTA-817450) -->

#### Granular account linking for certain Identity Providers is GA in Production

When admins link users from SAML and OIDC identity providers, they can now exclude specific users and admins. This improves security by allowing admins to configure granular access control scenarios. See **Add an external Identity Provider** for [OpenId Connect](/docs/guides/add-an-external-idp/openidconnect/main/#create-an-identity-provider-in-okta) and [SAML 2.0](/docs/guides/add-an-external-idp/saml2/main/#create-an-identity-provider-in-okta). <!-- EXTENDED_ACCOUNT_LINKING_FILTERS OKTA-831244-->

#### Improved group search functionality is GA in Production

You can now search for groups whose names or descriptions contain specified text. This makes it easier to find a group when you don't recall its exact name. Use the `co` operator within the `search` parameter of the Groups API. See [Operators](https://developer.okta.com/docs/api/#operators) and [`search` within the Groups API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/#tag/Group/operation/listGroups!in=query&path=search&t=request).<!--OKTA-862579 DIRECTORY_SERVICE_GROUP_CONTAINS_SEARCH-->

#### Improved user search functionality is GA in Production

You can now search for users whose names, email addresses, or usernames contain specified text. This makes it easier to do user lookups and add users to groups. Use the `co` operator within the `search` parameter of the Users API. See [Operators](https://developer.okta.com/docs/api/#operators) and [`search` within the Users API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#tag/User/operation/listUsers!in=query&path=search&t=request). <!--OKTA-862577 DIRECTORY_SERVICE_USER_CONTAINS_SEARCH-->

#### Improved realms and device search functionality is GA in Production

We've extended the contains (`co`) operator to realms and devices. You can now search for realms and devices whose profile attributes contain specified text through API. This makes lookups easier without needing to recall the exact names of various profile attributes. Use the `co` operator within the `search` parameter. See [Contains operator](https://developer.okta.com/docs/api/#contains-operator) and the `search` parameter in the [Realms](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Realm/#tag/Realm/operation/listRealms!in=query&path=search&t=request) and [Devices](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Device/#tag/Device/operation/listDevices!in=query&path=search&t=request) APIs.  
<!-- OKTA-865940 -->

#### Realms for Workforce is GA in Production

The Realms and Realms Management APIs allow you to unlock greater flexibility in managing and delegating the management of your distinct user populations within a single Okta org. See [Realms](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Realm/) and [Realm Assignments](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/RealmAssignment/).   <!--- https://oktainc.atlassian.net/browse/OKTA-853176#icft=OKTA-853176 UD_REALMS_FOUNDATIONS and UD_REALMS -->

#### Identity Security Posture Management functionality in the OIN catalog

The **Okta Integration Network** page now provides **Identity Security Posture Management** functionality. When you select it, the OIN catalog displays only the apps with Identity Security Posture Management functionality.

#### Default global session policy rule update

The default value for the `maxSessionLifetimeMinutes` property of the default global session policy rule is now `1440` (24 hours) and can be changed. Previously the `maxSessionLifetimeMinutes` property of the default global session policy rule was read-only.
See [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule!path=3/actions/signon/session/maxSessionLifetimeMinutes&t=request).

#### Developer documentation update in 2025.03.0

The list of public permissions has moved from the [Roles in Okta](https://developer.okta.com/docs/api/openapi/okta-management/guides/roles/#permissions) topic to the [Permissions in Okta](https://developer.okta.com/docs/api/openapi/okta-management/guides/permissions) topic. The new topic contains more permission details for you to define your custom admin roles. <!--OKTA-857969-->

#### Bug fixed in 2025.03.0

Some certificates with trailing characters were uploaded successfully to the `/domains/{domainId}/certificate` endpoint, despite their invalid format. (OKTA-486406)

## February

### Weekly release 2025.02.2

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2025.02.2](#bugs-fixed-in-2025-02-2)| February 20, 2025 |

#### Bugs fixed in 2025.02.2

* An API request to create a resource set with a duplicate name sometimes returned a 5xx error instead of a 4xx error response. (OKTA-867792)

* Admins couldn't retrieve more than five entitlement SAML assertions and OIDC claims when configuring apps. (OKTA-865900)

* The contains (`co`) operator sometimes gave unclear error messages when using less than three characters or with other operators. (OKTA-846206)

* When an admin attempted to revoke an API token (`DELETE /api/v1/api-tokens/{apiTokenId}`), and the credential used to authenticate the request was an `access_token` for a Service client, an HTTP 403 error was returned. (OKTA-844384)

### Weekly release 2025.02.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2025.02.1](#bugs-fixed-in-2025-02-1)| February 13, 2025 |

#### Bugs fixed in 2025.02.1

* When a GET request was made using the User Grants API (`/api/v1/users/{userId}/grants`), the response didn't include pagination links in the response header. (OKTA-826775)

* The Users API returned inconsistent responses in Classic Engine orgs that allowed self-service registration and in Identity Engine orgs that were migrated from these orgs. (OKTA-833094)

* In the Admin Console, updates in the code editor that Okta couldn't parse returned a 500 Internal Server Error. (OKTA-837068)

* The On-Behalf of Token Exchange flow was returning the wrong error message when an invalid `subject_token_type` was requested. (OKTA-841223)

* When a POST request was made (`/api/v1/authorizationServers/{authServerId}/policies`) to create an authorization policy, the `created` and `lastUpdated` properties had a null value. (OKTA-848623)

* Some identity provider API POST (`/api/v1/idps`) and PUT (`/api/v1/idps/{idpId}`) requests returned an HTTP 500 error code if the request didn't have the `policy.accountLink` object in the request body. (OKTA-865143)

### Monthly release 2025.02.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [IP Exempt Zone is GA in Preview](#ip-exempt-zone-is-ga-in-preview) | October 23, 2024 |
| [OIDC IdPs now support group sync is GA in Preview](#oidc-idps-now-support-group-sync-is-ga-in-preview) |  October 23, 2024                |
| [Granular account linking for certain identity providers is GA](#granular-account-linking-for-certain-identity-providers-is-ga) |  December 11, 2024               |
| [Realms for Workforce is GA in Preview](#realms-for-workforce-is-ga-in-preview)|   February 13, 2025              |
| [Improved group search functionality is GA in Preview](#improved-group-search-functionality-is-ga-in-preview) |    February 12, 2025             |
| [Improved user search functionality is GA in Preview](#improved-user-search-functionality-is-ga-in-preview) |    February 12, 2025             |
| [Support for importing Active Directory group descriptions is GA in Production](#support-for-importing-active-directory-group-descriptions-is-ga-in-production) |    February 6, 2025             |
| [Developer documentation updates in 2025.02.0](#developer-documentation-updates-in-2025-02-0) |    February 6, 2025             |
| [Bugs fixed in 2025.02.0](#bugs-fixed-in-2025-02-0) |    February 6, 2025             |

#### IP Exempt Zone is GA in Preview

This feature introduces `useAsExemptList` as a read-only Boolean property that distinguishes the new default IP exempt zones from other zones. When you enable this feature and you make a GET `api/v1/zones` request, Okta returns `useAsExemptList` in the response. The value `true` indicates that the zone is an exempt zone. Only system generated exempt zones are available. <!-- DEFAULT_NETWORK_ZONE_IP_EXEMPT_LIST (OKTA-795812: Parent Jira for DEFAULT_NETWORK_ZONE_IP_EXEMPT_LIST GA Preview) -->

#### OIDC IdPs now support group sync is GA in Preview

OpenID Connect (OIDC) identity providers (IdPs) now support full group sync and adding a user to a group that they don't already belong to. A user who authenticates with an external IdP is added to all available groups when **Full sync of groups** is enabled. The user is added to any groups that they don't already belong to when **Add user to missing groups** is enabled. This allows you to specify certain groups that users should be added to. <!-- GROUP_SYNC_FEATURE_OIDC_IDP_ENABLED (OKTA-817450: FVM for EA Self-Service GROUP_SYNC_FEATURE_OIDC_IDP_ENABLED for Weekly Release 2024.10.1 Resolved) -->

#### Granular account linking for certain identity providers is GA

When admins link users from SAML and OIDC identity providers, they can now exclude specific users and admins. This improves security by allowing admins to configure granular access control scenarios. See **Add an external Identity Provider** for [OpenID Connect](/docs/guides/add-an-external-idp/openidconnect/main/#create-an-identity-provider-in-okta) and [SAML 2.0](/docs/guides/add-an-external-idp/saml2/main/#create-an-identity-provider-in-okta). <!-- EXTENDED_ACCOUNT_LINKING_FILTERS OKTA-831244-->

#### Realms for Workforce is GA in Preview

The Realms and Realms Management APIs allow you to unlock greater flexibility in managing and delegating the management of your distinct user populations within a single Okta org. See [Realms](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Realm/) and [Realm Assignments](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/RealmAssignment/). <!--- OKTA-853176: Parent Jira for UD_REALMS_FOUNDATIONS and UD_REALMS Open UD_REALMS_FOUNDATIONS and UD_REALMS -->

#### Improved group search functionality is GA in Preview

You can now search for groups whose names or descriptions contain specified text. This makes it easier to find a group when you don't recall its exact name. Use the `co` operator within the `search` parameter of the Groups API. See [Operators](https://developer.okta.com/docs/api/#operators) and `search` within the [Groups API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/#tag/Group/operation/listGroups!in=query&path=search&t=request). <!--OKTA-862579 DIRECTORY_SERVICE_GROUP_CONTAINS_SEARCH-->

#### Improved user search functionality is GA in Preview

You can now search for users whose names, email addresses, or usernames contain specified text. This makes it easier to add users to groups or apps. Use the `co` operator within the `search` parameter of the Users API. See [Operators](https://developer.okta.com/docs/api/#operators) and `search` within the [Users API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#tag/User/operation/listUsers!in=query&path=search&t=request).<!--OKTA-862577 DIRECTORY_SERVICE_USER_CONTAINS_SEARCH-->

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
