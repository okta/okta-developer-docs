---
title: Okta Identity Engine API release notes 2026
---

<ApiLifecycle access="ie" />

# Okta Identity Engine API release notes (2026)

<a href="/rss/identity-engine.xml">
  <img src="/img/icons/Feed-icon.svg" alt="RSS" width="20" height="20" />
  Subscribe to RSS
</a>

## July

### Weekly release 2026.07.1
<!-- Published on: 2026-07-08T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bug fixed in 2026.07.1](#bug-fixed-in-2026-07-1) | July 8, 2026 |

#### Bug fixed in 2026.07.1

The GET `/apps/{appId}/tokens` endpoint sometimes returned fewer results than the requested `limit` and omitted the `next` link in the `Link` header, even when more tokens existed for the app. (OKTA-1155607)

### Monthly release 2026.07.0
<!-- Published on: 2026-07-01T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bot protection is GA in Production](#bot-protection-is-ga-in-production) | July 1, 2026 |
| [New fields query parameter for Groups, Realms, and Devices list endpoints is GA in Production](#new-fields-query-parameter-for-groups-realms-and-devices-list-endpoints-is-ga-in-production) | July 1, 2026 |
| [New IP Service available for enhanced dynamic network zones](#new-ip-service-available-for-enhanced-dynamic-network-zones) | July 1, 2026 |
| [Improved group member search functionality is GA in Production](#improved-group-member-search-functionality-is-ga-in-production) | July 1, 2026 |
| [Customizable emails for Passkey (FIDO2 WebAuthn) authenticator is GA in Preview](#customizable-emails-for-passkey-fido2-webauthn-authenticator-is-ga-in-preview) | May 20, 2026 |
| [Email authenticator auto-enrollment and recovery management is GA in Preview](#email-authenticator-auto-enrollment-and-recovery-management-is-ga-in-preview) | May 6, 2026 |
| [Advanced device posture checks is GA in Preview](#advanced-device-posture-checks-is-ga-in-preview) | April 9, 2025 |
| [Clear Managed Chrome Profile Browsing Data is GA in Production](#clear-managed-chrome-profile-browsing-data-is-ga-in-production) | June 3, 2026 |
| [Group push support in API Integration Actions apps](#group-push-support-in-api-integration-actions-apps) | July 1, 2026 |
| [Delete group push mappings in ERROR state](#delete-group-push-mappings-in-error-state) | July 1, 2026 |
| [Replace a Group Rule API can now update assigned groups](#replace-a-group-rule-api-can-now-update-assigned-groups) | July 1, 2026 |
| [Native to Web SSO is GA in Production](#native-to-web-sso-is-ga-in-production) | January 7, 2026 |
| [Removal of Cross App Access as a self-service feature](#removal-of-cross-app-access-as-a-self-service-feature) | July 1, 2026 |
| [Spec-compliant client ID claims for AI agent tokens](#spec-compliant-client-id-claims-for-ai-agent-tokens) | Jun 11, 2026 |
| [SCIM filter use added to endpoints](#scim-filter-use-added-to-endpoints) | Jun 11, 2026 |
| [Agent-to-agent connections is EA in Preview](#agent-to-agent-connections-is-ea-in-preview)| June 17, 2026 |
| [Register an AI agent API appId parameter deprecated](#register-an-ai-agent-api-appid-parameter-deprecated) | June 17, 2026 |
| [Improved validation for Create a client authentication settings endpoint](#improved-validation-for-create-a-client-authentication-settings-endpoint) | June 24, 2026 |
| [Developer documentation updates in 2026.07.0](#developer-documentation-updates-in-2026-07-0) | July 1, 2026 |
| [Bugs fixed in 2026.07.0](#bugs-fixed-in-2026-07-0)| July 1, 2026 |

#### Bot protection is GA in Production

The [Bot Protection API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/botprotection) enables orgs to automatically identify and mitigate bot traffic by configuring remediation actions within the Identity Threat Protection (ITP) landing page. See [Bot protection](https://help.okta.com/okta_help.htm?type=oie&id=about_bot_protection). <!-- OKTA-1209042 BOT_PROTECTION -->

#### New fields query parameter for Groups, Realms, and Devices list endpoints is GA in Preview

The `GET /api/v1/groups`, `GET /api/v1/realms`, and `GET /api/v1/devices` endpoints now support the fields query parameter that specifies which fields to include in the response. Use this parameter to reduce the response payload size when your integration only needs a subset of fields. See [Groups API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/group), [Realms API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/realm), and [Devices API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/device). <!--OKTA-1208394 -->

#### New IP Service available for enhanced dynamic network zones

The `ipServiceCategories` object of the [Enhanced Dynamic Network Zone API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/networkzone/other/getnetworkzone#other/getnetworkzone/t=response&c=200&path=&d=2/ipservicecategories) now supports the `VIGOR_SSL_VPN` service category. <!-- OKTA-1202013 -->

#### Improved group member search functionality is GA in Production

You can now search for group members using the new `search` parameter of the `GET /api/v1/groups/{groupId}/users` endpoint. This makes it easier to find members without knowing their exact profile details. See [List all member users](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/group/other/listgroupusers). <!-- OKTA-1197716 -->

#### Customizable emails for Passkey (FIDO2 WebAuthn) authenticator is GA in Preview

The [Custom Email Templates API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/customtemplates) now includes the `WebAuthnPreRegistrationPin` email template which is sent to users when an admin pre-registers a Passkey (FIDO2 WebAuthn) authenticator on their behalf. You can customize the template subject and body.

<!-- OKTA-1169564 WEBAUTHN_PRE_ENROLLMENT_CUSTOMIZABLE_PIN_EMAIL preview date: May 20, 2026 -->

#### Email authenticator auto-enrollment and recovery management is GA in Preview

Use the Policies API to control the automatic enrollment of email as an authenticator and configure email-based password recovery, unlock, and change where email isn't an authenticator. See [`autoEnroll`](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/policy/other/createpolicy#other/createpolicy/t=request&path=&d=1/settings/authenticators/enroll/autoenroll) and [`allowRecoveryEmailWithoutEnrollment`](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/policy/other/createpolicyrule#other/createpolicyrule/t=request&path=&d=1/actions/selfservicepasswordreset/settings/allowrecoveryemailwithoutenrollment).

<!-- OKTA-1169086 EMAIL_ENROLLMENT_AND_RECOVERY_CONTROL preview date: may 6, 2026 -->

#### Advanced device posture checks is GA in Preview

Advanced device posture checks let admins enforce compliance based on customized device attributes that extend beyond Okta's standard checks. Using osquery, the feature facilitates real-time security assessments across macOS and Windows devices, giving orgs enhanced visibility and control over their device fleet to ensure that only trusted devices can access sensitive resources. This feature is available only if you're subscribed to Okta Device Access (ODA). See [Configure advanced posture checks and custom remediation](/docs/guides/device-assurance-posture-checks-and-remediation/main/) and the [Device Posture Checks API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DevicePostureCheck/). <!-- OSQUERY_CUSTOM_DEVICE_POSTURE_CHECKS_RELEASE, DEVICE_UNMANAGED_CHECKS, DEVICE_AUTHENTICATOR_INTEGRATIONS OKTA-1162878 OKTA-1193941 Preview date: April 9, 2025 -->

#### Clear Managed Chrome Profile Browsing Data is GA in Production

Clear Managed Chrome Profile Browsing Data provides real-time remediation by instantly purging local session data (cookies and cache) within managed Chrome profiles upon ITP detection. By transforming the browser into a policy-enforced workspace, it ensures immediate, automated protection. See [Clear the managed Chrome profile browsing data API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/user/other/clearchromedata). <!-- OKTA-1115952 CLEAR_CHROME_DATA -->

#### Group push support in API Integration Actions apps

Apps that use API Integration Actions to perform provisioning can now use the [Group Push](https://help.okta.com/okta_help.htm?type=oie&id=ext_Directory_Using_Group_Push) feature. This enables the group import functionality for apps that use [group API contracts](/docs/guides/oin-api-actions-contracts/#provisioning-list-groups) in their provisioning actions.
<!-- OKTA-1094245, OKTA-1196942, ENG_DISABLE_GROUP_PUSH_ENHANCEMENTS_FOR_ACTIONS, Preview: July 1, 2026 -->

#### Delete group push mappings in ERROR state

The [Delete a group push mapping](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/grouppushmapping/other/deletegrouppushmapping) endpoint now supports deleting group push mappings in the `ERROR` state, alongside the `INACTIVE` state. <!-- OKTA-1210326 -->

#### Replace a Group Rule API can now update assigned groups

The [Replace a group rule](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/grouprule/other/replacegrouprule) endpoint now supports updating the `actions` object to modify the groups assigned to a group rule. <!-- OKTA-1128862 FF EDITABLE_GROUP_RULE_TARGETS to GA Preview July 1, 2026 -->

#### Native to Web SSO is GA in Production

Native to Web SSO creates a seamless, unified authentication experience when a user transitions from an OIDC app (like a native or web app) to a web app (either OIDC or SAML). This feature uses standard, web-based federation protocols like SAML and OpenID Connect that help bridge the gap between two different app environments, using a single-use, one-way interclient trust SSO token. This eliminates repeating already provided sign-on assurances, and simplifies development by reducing authentication complexity.

The list endpoints for the [Application Interclient Trust Mappings API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/applicationinterclienttrustmappings/other/listinterclientallowedapplications) now support pagination. Use the `after` and `limit` query parameters to page through results for those operations. The maximum number of allowed apps per target app has increased from 5 to 50.

<!-- NATIVE_TO_WEB_ONE_TIME_TOKEN_EXCHANGE OKTA-1065285 preview date: January 7, 2026 -->

#### Removal of Cross App Access as a self-service feature

You can no longer enable or disable the **Cross App Access** feature from the Early Access section of the **Settings** > **Features** page in the Admin Console. To change the availability of this feature for your org, contact [Okta Support](https://support.okta.com). If you have an Integrator Free Plan org, contact [Developer Support](mailto:developers@okta.com) to enable the feature. This change doesn't impact any existing configurations.
<!-- OKTA-1203672 ENABLE_CONNECT_WITH_OKTA -->

#### Spec-compliant client ID claims for AI agent tokens

Okta Expression Language profiles now include the `app.clientId` property during user claim evaluations for AI agent OAuth 2.0 clients. This allows developers to generate spec-compliant tokens during AI agent flows.

#### SCIM filter use added to endpoints

The [List all authorization servers for an API server](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-resource-servers/tags/apiserverregistration/other/listapiserverauthorizationservers) and [List all authorization servers for an MCP server](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-resource-servers/tags/mcpserverregistration/other/listmcpserverauthorizationservers) endpoints now use the SCIM filter.

#### Agent-to-agent connections is EA in Preview

Agent-to-agent server connections allow admins to connect AI agents to other AI agents through delegated links.
Admins can manage scopes to restrict access to the appropriate AI agent tasks, and allow service apps to call AI agents without user context. Using tokens and the System Log, admins can view all the users, AI agents, and apps that call an AI agent. See [Agent-to-agent token exchange](/docs/guides/ea-ai-agent-token-exchange/agent-to-agent/main/).

The Delegated Links API is BETA. Delegated links are explicit, configurable policy statements that declare which principals (OIDC apps or other agents) and token types each agent accepts as valid proof of identity. This replaces the implicit linked app policy. See the [Delegation Links API](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/delegationlinks). <!-- FF SECURE_AI_A2A_SERVERS preview release 2026.06.2 OKTA-1197640 -->

#### Register an AI agent API appId parameter deprecated

The `appId` parameter for the Register an AI agent API has been deprecated. Use the [Delegation Links API](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/delegationlinks) instead. <!-- FF SECURE_AI_A2A_SERVERS OKTA-1180123 in preview 2026.06.2 -->

#### Improved validation for Create a client authentication settings endpoint

Validation for the [Create a client authentication settings endpoint](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-resource-servers/tags/resourceserverclientauthsettings/other/createclientauthsettings) now restricts the `purpose` parameter to a single value. <!-- OKTA-120008 -->

#### Developer documentation updates in 2026.07.0

* The new [Prepare to upgrade to Okta Identity Engine](/docs/journeys/OCI-prepare-upgrade-oie/main/) journey helps you plan and execute a Classic Engine to Identity Engine migration. This journey covers policy and authenticator changes, integration inventory, Sign-In Widget updates, and custom code revisions to help you upgrade with minimal disruption. <!-- OKTA-1167295 -->

* The new [Upgrade registration inline hooks to Identity Engine](/docs/guides/oie-upgrade-registration-inline-hook/main/) guide explains how to upgrade your registration inline hook from Okta Classic Engine to Okta Identity Engine. It includes details on payload updates and introduces the new Identity Engine use case of progressive profile enrollment. <!-- OKTA-1182951 -->

* The new [Update your event hooks for Identity Engine](/docs/guides/oie-upgrade-event-hooks/main/) guide explains how to update your event hooks from Okta Classic Engine to Okta Identity Engine. It includes details on payload updates and highlights new Identity Engine only event types. <!-- OKTA-1182949 -->

* The new [API changes after the upgrade](/docs/guides/oie-upgrade-api-changes/main/) guide describes how specific Okta APIs behave differently or are unsupported after upgrading to Identity Engine. It covers breaking changes and migration guidance for the [Authentication API](/docs/reference/api/authn/), [Sessions API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Session/), and [Factors API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserFactor/). <!-- OKTA-1185560 -->

* The new [Test your widget's existing customizations](/docs/guides/oie-upgrade-test-widget-custom/main/) guide helps you validate Sign-In Widget customizations in a test environment before a production upgrade. It covers how to identify affected customization types, set up a test org, and resolve common upgrade issues. <!-- OKTA-1185573 -->

* The new [Identify your Okta authentication integrations and customizations](/docs/guides/oie-upgrade-identify-integrations/main/) guide helps you discover and record every Okta integration point before upgrading to Identity Engine. It covers redirect sign-in, embedded widgets, SDKs, API tokens, hooks, Workflows, and directory agents, and provides worksheets to assess upgrade impact and assign owners. <!-- OKTA-1177823 -->

* The Okta Developer landing page now features new sections for Journeys and release notes. A Journey is a curated, expert-driven, end-to-end guide built around a small-to-medium-sized development project. This update delivers streamlined access to both Journeys and the latest platform updates. See [Okta Developer landing page](https://developer.okta.com/). <!-- OKTA-1169801 -->

* The new [Plan your upgrade rollout](/docs/guides/oie-upgrade-rollout-plan/main/) guide explains how to plan and execute a staged upgrade from Classic Engine to Okta Identity Engine. The guide covers how to sequence the upgrade across orgs, gradually roll out Identity Engine flows, and replace unsupported features, such as Integrated Windows Authentication, Device Trust, and Okta Mobile. <!-- OKTA-1192952 -->

* The [OIN Wizard: Update an integration](/docs/guides/update-oin-app/openidconnect/main) guide has been updated to include API Integration Actions instructions. ISVs can edit and resubmit a published app that's built with API Integration Actions. This feature is only available on Okta Integrator Free Plan orgs. <!-- OKTA-1177141 -->

* The new [Configure a device posture IdP](/docs/guides/device-posture-idp/main/) guide describes how to integrate an external compliance service as a device posture identity provider. The guide shows how to use the [Device Integrations API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/deviceintegrations) to retrieve and activate the device posture provider integration. It also shows how to use the [Device Assurance Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/deviceassurance) to consume device posture signals in a device assurance policy. <!-- OKTA-953417 -->

* The new [Sign in mobile users with a self-hosted page](/docs/guides/sign-users-in-mobile-self-hosted/main/android/) guide helps developers build a native, password-based sign-in flow using the [Okta Client SDK for Kotlin](https://github.com/okta/okta-mobile-kotlin). This guide demonstrates how to use the Resource Owner Password grant type, track authentication states, store tokens securely, and manage sessions. <!-- OKTA-1200887 -->

* The new [Configure the Client SDK for Kotlin to use an Okta-hosted sign-in form](/docs/guides/sign-into-mobile-app-redirect/main/android/) helps developers integrate browser-based redirect authentication into mobile apps. This guide covers project setup, custom callback URI configuration, refresh tokens for session continuity, and secure token attachment to outgoing server calls with HTTP interceptors. <!-- OKTA-1089674 -->

* The new [Configure advanced posture checks and custom remediation guide](/docs/guides/device-assurance-posture-checks-and-remediation/main/) shows how to use the [Device Posture Checks API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/deviceposturecheck) to enforce custom osquery checks on macOS and Windows devices. It also covers configuring custom remediation instructions that help end users fix noncompliant devices before they regain access. <!-- OKTA-896213 -->

* The [Sign users in to your SPA](/docs/guides/sign-into-spa-redirect/main/angular/) using the redirect model guide for Angular has been updated for Angular CLI v21, `@okta/okta-angular` v8.0, and the Okta Auth JavaScript SDK v8.0.1. This enhancement simplifies the setup by using standalone provider APIs and functional route guard. <!-- OKTA-1192767 -->

#### Bugs fixed in 2026.07.0

* When a Native to Web SSO flow used an `interclient_token` to sign in to a target OpenID Connect (OIDC) app that had Single Logout (SLO) session data enabled, the authorization code exchange returned an unclear error message. (OKTA-1183163)

* Developers were able to delete a [custom authorization server](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/authorizationserver/other/deleteauthorizationserver) that was used in AI agent resource connections. (OKTA-1182513)

## June

### Weekly release 2026.06.3
<!-- Published on: 2026-06-24T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Improved validation for Create a client authentication settings endpoint](#improved-validation-for-create-a-client-authentication-settings-endpoint) | June 24, 2026 |

#### Improved validation for Create a client authentication settings endpoint

Validation for the [Create a client authentication settings endpoint](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-resource-servers/tags/resourceserverclientauthsettings/other/createclientauthsettings) now restricts the `purpose` parameter to a single value. <!-- OKTA-120008 -->

### Weekly release 2026.06.2
<!-- Published on: 2026-06-17T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Agent-to-agent connections is EA in Preview](#agent-to-agent-connections-is-ea-in-preview)| June 17, 2026 |
| [Register an AI agent API appId parameter deprecated](#register-an-ai-agent-api-appid-parameter-deprecated) | June 17, 2026 |
| [Bugs fixed in 2026.06.2](#bugs-fixed-in-2026-06-2) | June 17, 2026 |

#### Agent-to-agent connections is EA in Preview

Agent-to-agent server connections allow admins to connect AI agents to other AI agents through delegated links.
Admins can manage scopes to restrict access to the appropriate AI agent tasks, and allow service apps to call AI agents without user context. Using tokens and the System Log, admins can view all the users, AI agents, and apps that call an AI agent. See [Agent-to-agent token exchange](/docs/guides/ea-ai-agent-token-exchange/agent-to-agent/main/).

The Delegated Links API is BETA. Delegated links are explicit, configurable policy statements that declare which principals (OIDC apps or other agents) and token types each agent accepts as valid proof of identity. This replaces the implicit linked app policy. See the [Delegation Links API](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/delegationlinks). <!-- FF SECURE_AI_A2A_SERVERS preview release 2026.06.2 OKTA-1197640 -->

#### Register an AI agent API appId parameter deprecated

The `appId` parameter for the Register an AI agent API has been deprecated. Use the [Delegation Links API](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/delegationlinks) instead. <!-- FF SECURE_AI_A2A_SERVERS OKTA-1180123 in preview 2026.06.2 -->

#### Bugs fixed in 2026.06.2

* When an admin deleted an Okta managed user account (`DELETE /privileged-access/api/v1/okta-service-accounts/{id}`) from Okta Privileged Access, the linked Okta user was suspended. (OKTA-1199623)

* Read-only admins couldn't view submissions in the OIN Wizard and received a 403 (Access Forbidden) error. (OKTA-981845)

### Weekly release 2026.06.1
<!-- Published on: 2026-06-10T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Spec-compliant client ID claims for AI agent tokens](#spec-compliant-client-id-claims-for-ai-agent-tokens) | Jun 11, 2026 |
| [SCIM filter use added to endpoints](#scim-filter-use-added-to-endpoints) | Jun 11, 2026 |
| [Bug fixed in 2026.06.1](#bug-fixed-in-2026-06-1)|Jun 11, 2026 |

#### Spec-compliant client ID claims for AI agent tokens

Okta Expression Language profiles now include the `app.clientId` property during user claim evaluations for AI agent OAuth 2.0 clients. This allows developers to generate spec-compliant tokens during AI agent flows.

#### SCIM filter use added to endpoints

The [List all authorization servers for an API server](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-resource-servers/tags/apiserverregistration/other/listapiserverauthorizationservers) and [List all authorization servers for an MCP server](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-resource-servers/tags/mcpserverregistration/other/listmcpserverauthorizationservers) endpoints now use the SCIM filter.

#### Bug fixed in 2026.06.1

When a requesting client requested the `interclient_access` scope without a trust relationship configured, the error message was unclear. (OKTA-1119468)

### Monthly release 2026.06.0
<!-- Published on: 2026-06-03T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [New enhancements to the Groups API endpoints is GA in Production](#new-enhancements-to-the-groups-api-endpoints-is-ga-in-production) | June 3, 2026 |
| [Service accounts is GA in Production](#service-accounts-is-ga-in-production) | May 6, 2026 |
| [New Directories Integration endpoints to view extended Active Directory group attributes is GA in Preview](#new-directories-integration-endpoints-to-view-extended-active-directory-group-attributes-is-ga-in-preview) | June 3, 2026 |
| [Clear Managed Chrome Profile Browsing Data is GA in Preview](#clear-managed-chrome-profile-browsing-data-is-ga-in-preview) | June 3, 2026 |
| [Bring your own telephony credentials is GA in Production](#bring-your-own-telephony-credentials-is-ga-in-production) | January 7, 2026 |
| [SHA-256 digest algorithm support is GA in Production](#sha-256-digest-algorithm-support-is-ga-in-production) | December 10, 2025 |
| [Seamless ISV experience for SCIM is GA in Production](#seamless-isv-experience-for-scim-is-ga-in-production) | June 3, 2026 |
| [New System Log event for database privileged access management is EA](#new-system-log-event-for-database-privileged-access-management-is-ea) | June 3, 2026 |
| [Search, filtering, and configurable views for AI agents is GA in Production](#search-filtering-and-configurable-views-for-ai-agents-is-ga-in-production) | May 28, 2026 |
| [Bugs fixed in 2026.06.0](#bugs-fixed-in-2026-06-0)| June 3, 2026 |

#### New enhancements to the Groups API endpoints is GA in Production

The **List all member users** (`GET /api/v1/groups/{groupId}/users`) endpoint now supports an `expand` query parameter, which allows group membership data and group rules to be retrieved in a single API call. The new **List all group rules for a user** (`GET /api/v1/groups/{groupId}/users/{userId}/group-rules`) endpoint returns all group rules that manage a specific user's membership in a group. See [List all member users](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/group/other/listgroupusers#other/listgroupusers/t=request&in=query&path=expand) and [List all group rules for a user](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/group/other/listgrouprulesforuseringroup).

<!-- (OKTA-1153307) -->

#### Service accounts is GA in Production

The Okta Managed User Accounts API is now available for Okta Privileged Access-enabled orgs. Okta Privileged Access secures SaaS service accounts that allows customers to monitor, manage, and control access to service accounts in their SaaS apps. Okta users designated with privileged access are treated as service accounts that resource admins can assign to resource groups and projects, and security admins can create policies to configure which users can access them. The Okta Managed User Accounts API provides operations to manage these user accounts in Okta Universal Directory with OPA.
This feature is available only if you're subscribed to Okta Privileged Access. Ensure that you've set up the Okta Privileged Access app before creating app accounts through the API.

See [Okta Managed User Accounts](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/oktamanageduseraccount), [Service Accounts](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/serviceaccount), and [Manage service accounts](https://help.okta.com/okta_help.htm?type=oie&id=ud-privileged-acnt).

<!-- OKTA-1165876, OKTA-955102 FF: SERVICE_ACCOUNTS and CUSTOM_ADMIN_ROLE_SERVICE_ACCOUNTS preview date: May 6, 2026, -->

#### New Directories Integration endpoints to view extended Active Directory group attributes is GA in Preview

New API endpoints have been added to the Directories Integration (`POST /api/v1/directories/{appInstanceId}/group/{groupId}/query` and `GET /api/v1/directories/{appInstanceId}/group/{groupId}/query/{resultId}`), which allows for the real-time retrieval of any standard or custom attribute from Active Directory (AD) groups. You can now programmatically access attributes, like cost centers and department codes, without waiting for a full directory sync. This feature allows you to accelerate automation by using live AD group metadata, while simultaneously eliminating manual data management by creating a single, reliable bridge between your on-premises directory details and your cloud ecosystem. See [Directories Integrations API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/directoriesintegration).

#### Clear Managed Chrome Profile Browsing Data is GA in Preview

Clear Managed Chrome Profile Browsing Data provides real-time remediation by instantly purging local session data (cookies and cache) within managed Chrome profiles upon ITP detection. By transforming the browser into a policy-enforced workspace, it ensures immediate, automated protection. See [Clear the managed Chrome profile browsing data API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/user/other/clearchromedata).

#### Bring your own telephony credentials is GA in Production

You can now connect your own telephony provider using a new simplified setup that doesn’t require you to use a telephony inline hook. You can handle usage billing directly with your provider. Okta currently supports Twilio and Telesign.

To configure your own telephony credentials, you can use the [Custom Telephony Provider API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CustomTelephonyProvider/) or you can use the [Admin Console](https://help.okta.com/okta_help.htm?type=oie&id=configure-telephony-providers).

<!--  OKTA-1075267 CUSTOM_TELEPHONY_PROVIDERS preview date: Jan 7, 2026 -->

#### SHA-256 digest algorithm support is GA in Production

Okta now supports the SHA-256 digest algorithm when hashing SAML AuthnRequests that are sent to external IdPs. <!-- IDP_SHA256_DIGEST_ALGORITHM_SUPPORT OKTA-1061375 preview date: Dec 10, 2025 -->

#### Seamless ISV experience for SCIM is GA in Production

Okta now provides a seamless ISV experience to optimize the [Okta Integration Network (OIN)](https://www.okta.com/integrations/) submission experience for SCIM integrations. This new experience enables independent software vendors (ISVs) to build and manually test their SCIM integration metadata before submission to the OIN. This reduces the time needed for the OIN team to review and validate that the SCIM integration functions as intended, which shortens the time to publish in the OIN. This experience also incorporates communication processes in Salesforce, enabling improved collaboration internally within Okta teams and externally with ISVs. See [Publish an OIN integration overview](https://developer.okta.com/docs/guides/submit-app-overview/) and [Submit an integration with the OIN Wizard](https://developer.okta.com/docs/guides/submit-oin-app/scim/main/) guide.

#### New System Log event for database privileged access management is EA

New System Log events allow you to track when database integrations are created (`pam.integration.create`) or removed (`pam.integration.delete`) in Okta Privileged Access. See [Event Types](/docs/reference/api/event-types/).
<!--  OKTA-1166896 - Added in Release 2026.05.1 -->

#### Search, filtering, and configurable views for AI agents is GA in Production

Admins can now use enhanced filtering, search, and configuration capabilities on the **AI agents**, **AI agent providers**, and **Import Monitoring** > **AI agent import** pages.

<!-- OKTA-1184819 SECURE_AI_AGENTS_FILTERS_AND_SEARCH preview date: May 28, 2026 -->

#### Bugs fixed in 2026.06.0

* The `application.lifecycle.update` event in the System Log didn't populate the `changeDetails` field when Active Directory app settings were updated. (OKTA-1178325)

* In Identity Engine orgs where both a v1 (Classic Engine) session (`sid` cookie) and an Identity Engine session (`idx` cookie) were active, calls to the deprecated endpoint `DELETE /api/v1/sessions/me` returned HTTP 404 errors and left the v1 session active when the Identity Engine session had already been deleted. (OKTA-1163605)

* When `actor_token_type` wasn't included in an interclient token exchange request to a custom authorization server, Okta returned an invalid audience error instead of an error related to the missing parameter. (OKTA-1116317)

* The `/.well-known/oauth-authorization-server` metadata [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/customas/getwellknownoauthconfigurationcustomas) for custom authorization servers used a path (`/oauth2/{authorizationServerId}/.well-known/oauth-authorization-server`) that didn't comply with RFC 8414, which prevented RFC-compliant OAuth 2.0 clients from retrieving authorization server metadata. The RFC-compliant path (`/.well-known/oauth-authorization-server/oauth2/{authorizationServerId}`) is now supported alongside the existing path. (OKTA-998096)

* POST requests to the `/brands/{brandId}/themes/{themeId}/background-image` and `/brands/{brandId}/themes/{themeId}/background-image` endpoints with invalid filenames returned a 500 Internal Server Error message. (OKTA-1120411)

## May

### Weekly release 2026.05.3
<!-- Published on: 2026-05-28T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Search, filtering, and configurable views for AI agents is GA in Production](#search-filtering-and-configurable-views-for-ai-agents-is-ga-in-production) | May 28, 2026 |
| [Bugs fixed in 2026.05.3](#bugs-fixed-in-2026-05-3)| May 28, 2026 |

#### Search, filtering, and configurable views for AI agents is GA in Production

Admins can now use enhanced filtering, search, and configuration capabilities on the **AI agents**, **AI agent providers**, and **Import Monitoring** > **AI agent import** pages.

<!-- OKTA-1184819 SECURE_AI_AGENTS_FILTERS_AND_SEARCH preview date: May 28, 2026 -->

#### Bugs fixed in 2026.05.3

* The Potential Connections API for AI agents returned incorrect relative HREF links that were missing the org URL. (OKTA-1173194)

* A generic error message was returned when a token exchange request to `/oauth2/v1/token` omitted the `audience` parameter. (OKTA-1116286)

### Weekly release 2026.05.2
<!-- Published on: 2026-05-20T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Email claim included in ID-JAG tokens](#email-claim-included-in-id-jag-tokens) | May 20, 2026 |
| [Bugs fixed in 2026.05.2](#bugs-fixed-in-2026-05-2) | May 20, 2026 |

#### Email claim included in ID-JAG tokens

Identity Assertion Authorization Grant JWT (ID-JAG) tokens now include the `email` claim when the `email` scope is requested during SSO in cross-app access flows.

#### Bugs fixed in 2026.05.2

* When the **Map primary email to login setting** was enabled, a POST request to the `/idp/myaccount/emails` endpoint changed the username before the new email was verified, leaving the primary email attribute unchanged. (OKTA-1147280)
* Sometimes, the Just-in-Time (JIT) testing mechanism in the OIN Wizard failed to execute the test and immediately reported a failure, which prevented ISVs from resubmitting updated integrations. (OKTA-1019331)
* The OIN Wizard auto-tester failed during SSO because an HTTP 308 redirect dropped the required code and state parameters from the callback URL. (OKTA-1101077)

### Weekly release 2026.05.1
<!-- Published on: 2026-05-13T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bugs fixed in 2026.05.1](#bugs-fixed-in-2026-05-1)| May 13, 2026 |

#### Bugs fixed in 2026.05.1

* The `okta.eventhooks.manage` permission didn't allow an admin or service app to create an event hook. (OKTA-1162004)

* In the Admin Console, group searches and membership count API operations intermittently failed with 504 timeout errors for groups with very large memberships. (OKTA-1134762)

* POST requests to the `/api/v1/policies/{policyId}/rules` endpoint and PUT requests to the `/api/v1/policies/{policyId}/rules/{ruleId}` endpoint returned a successful response when the same app was specified in both the include and exclude lists of the app conditions. (OKTA-1115016)

* Custom attributes in Workday failed to sync during incremental imports unless a base attribute was simultaneously updated, even when a transaction log was generated for the custom attribute change. (OKTA-1089429)

### Monthly release 2026.05.0
<!-- Published on: 2026-05-06T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
  |[Automated syncing of attributes from SCIM server is GA in Production](#automated-syncing-of-attributes-from-scim-server-is-ga-in-production)| |
| [Identity claims sourcing policy is self-service EA in Preview](#identity-claims-sourcing-policy-is-self-service-ea-in-preview) | May 6, 2026 |
| [Email authenticator auto-enrollment and recovery management is self-service EA in Preview](#email-authenticator-auto-enrollment-and-recovery-management-is-self-service-ea-in-preview) | May 6, 2026 |
| [Managed connections renamed to resource connections is GA in Production](#managed-connections-renamed-to-resource-connections-is-ga-in-production) | May 6, 2026 |
| [Service accounts is GA in Preview](#service-accounts-is-ga-in-preview) | May 6, 2026 |
| [PIV Identity Provider JIT provisioning updates](#piv-identity-provider-jit-provisioning-updates) | May 6, 2026 |
| [PIV Identity Provider supports dynamic user matching](#piv-identity-provider-supports-dynamic-user-matching) | May 6, 2026 |
| [SHA-256 digest algorithm support is GA in Preview](#sha-256-digest-algorithm-support-is-ga-in-preview) | Dec 10, 2025 |
| [Skip counts for authenticator enrollment grace periods is GA in Production](#skip-counts-for-authenticator-enrollment-grace-periods-is-ga-in-production) | Feb 4, 2026 |
| [Client update policy is GA in Production](#client-update-policy-is-ga-in-production) | Jan 7, 2026 |
| [Passkeys rebrand is GA in Production](#passkeys-rebrand-is-ga-in-production) | Feb 4, 2026 |
| [OIN submissions for API Integration Actions](#oin-submissions-for-api-integration-actions) |  |
| [Developer documentation updates in 2026.05.0](#developer-documentation-updates-in-2026-05-0) | May 6, 2026 |
| [Bug fixed in 2026.05.0](#bug-fixed-in-2026-05-0)| May 6, 2026 |

#### Automated syncing of attributes from SCIM server is GA in Production

The new **Import User Schema** feature streamlines provisioning by automatically syncing attributes directly from your SCIM server instead of using a static template. By selecting the **Import user schema** checkbox, Okta fetches core attributes from the `urn:ietf:params:scim:schemas:core:2.0:User` schema and extension attributes from the /`Schemas` and `/ResourceTypes` endpoints. After these attributes are identified, you can add these specific fields through the **Add Attribute** picklist in the **Profile Editor**. This ensures that only supported attributes are populated, eliminating the need to manually remove unnecessary fields during setup. See [Automated configuration](/docs/guides/submit-oin-app/scim/main/#automated-configuration).

<!-- OKTA-1167768, Automated Service/Operations discovery for SCIM submissions, Production: May 12, 2026 -->

#### Identity claims sourcing policy is self-service EA in Preview

You can now configure the identity claims sourcing policy which enables federated users to re-authenticate with their most recent and active SSO IdP.

Reauthentication to an IdP helps Okta admins secure federated identities by redirecting federated users to their source SAML, OIDC, or Org2Org IdP when a policy requires them to reauthenticate. By forcing reauthentication at the source IdP, admins can close security gaps from long-lived sessions and remove the need to configure duplicate MFA enrollment in Okta.

See [Configure the identity claims sourcing policy](/docs/guides/configure-identity-claims-sourcing-policy/main/).

<!-- SUPPORT_FOR_REAUTH_WITH_EXTERNAL_IDP OKTA-1169603 preview date: May 6, 2026 -->

#### Email authenticator auto-enrollment and recovery management is self-service EA in Preview

Use the Policies API to control the automatic enrollment of email as an authenticator and configure email-based password recovery, unlock, and change where email isn't an authenticator. See [`autoEnroll`](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/policy/other/createpolicy#other/createpolicy/t=request&path=&d=1/settings/authenticators/enroll/autoenroll) and [`allowRecoveryEmailWithoutEnrollment`](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/policy/other/createpolicyrule#other/createpolicyrule/t=request&path=&d=1/actions/selfservicepasswordreset/settings/allowrecoveryemailwithoutenrollment).

<!-- OKTA-1169086 EMAIL_ENROLLMENT_AND_RECOVERY_CONTROL preview date: may 6, 2026 -->

#### Managed connections renamed to resource connections is GA in Production

The **Managed connections** tab has been renamed to **Resource connections** on the Okta for AI Agents pages. The associated System Logs' event types, debug data key, and details entries have been renamed accordingly.

#### Service accounts is GA in Preview

The Okta Managed User Accounts API is now available for Okta Privileged Access-enabled orgs. Okta Privileged Access secures SaaS service accounts that allows customers to monitor, manage, and control access to service accounts in their SaaS apps. Okta users designated with privileged access are treated as service accounts that resource admins can assign to resource groups and projects, and security admins can create policies to configure which users can access them. The Okta Managed User Accounts API provides operations to manage these user accounts in Okta Universal Directory with OPA.

This feature is available only if you're subscribed to Okta Privileged Access. Ensure that you've set up the Okta Privileged Access app before creating app accounts through the API.

<!-- See [Okta Managed User Accounts](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/oktamanageduseraccount), [Service Accounts](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/serviceaccount) and [Manage service accounts](https://help.okta.com/okta_help.htm?type=oie&id=ud-privileged-acnt).-->

<!-- OKTA-1165876, OKTA-955102 FF: SERVICE_ACCOUNTS and CUSTOM_ADMIN_ROLE_SERVICE_ACCOUNTS preview date: May 6, 2026 -->

#### PIV Identity Provider JIT provisioning updates

The `allowUserUpdates` attribute for PIV Identity Providers is now available. When enabled, Just-In-Time (JIT) provisioning updates existing user profiles with attributes from the PIV certificate during every authentication. See [Replace an IdP](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/identityprovider/other/replaceidentityprovider). <!-- OKTA-1158921 PIV_JIT_PROVISIONING 06 May 26 -->

#### PIV Identity Provider supports dynamic user matching

The PIV Identity Provider now includes the `allowDynamicUserMatching` parameter. This allows you to link PIV certificates to existing user profiles using custom matching logic, providing greater flexibility for resolving identities during authentication. See [Replace an IdP](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/identityprovider/other/replaceidentityprovider). <!-- OKTA-1116984 PIV_JIT_PROVISIONING 06 May 26 -->

#### SHA-256 digest algorithm support is GA in Preview

Okta now supports the SHA-256 digest algorithm when hashing SAML AuthnRequests that are sent to external IdPs. <!-- IDP_SHA256_DIGEST_ALGORITHM_SUPPORT OKTA-1061375 preview date: Dec 10, 2025 -->

#### Skip counts for authenticator enrollment grace periods is GA in Production

This feature allows admins to define a number of skips end users can defer enrollment into an authenticator, as well as customizations to the prompt when end users see the grace period. See [Grace periods](/docs/concepts/policies/#grace-periods) and [type](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/policy/other/createpolicy#other/createpolicy/t=response&c=200&path=&d=1/settings/authenticators/enroll/graceperiod).

<!-- OKTA-1044803 FF: ENROLLMENT_POLICY_GRACE_PERIOD_V2 preview date: Feb 4, 2026 -->

#### Client update policy is GA in Production

The Policies API now supports the `CLIENT_POLICY` type, enabling you to enforce or defer app updates across different device platforms. This lets you programmatically align app versions with internal change management processes. See the [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/listPolicies) and [Release controls policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-ov-release-controls). <!-- OKTA_VERIFY_RELEASE_CONTROL_POLICY OKTA-1036332 January 7, 2026 -->

#### Passkeys rebrand is GA in Production

The FIDO2 (WebAuthn) authenticator is being rebranded to Passkey (FIDO2 WebAuthn), and Okta is introducing enhanced administrative controls and a streamlined user experience. This update centralizes passkey management through a consolidated settings page, allows for customized authenticator naming, and introduces a dedicated **Sign in with a passkey** button within the Sign-In Widget. These enhancements simplify the authentication journey and provide users with a more intuitive sign-in process with the **Sign in with a passkey** button.

For more information about the new settings and updates, see [Passkeys and WebAuthn](/docs/guides/authenticators-web-authn/aspnet/main/#passkeys-and-webauthn) and [Configure the Passkey (FIDO2 WebAuthn) authenticator](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-webauthn).

<!-- OKTA-1012303 FF: PASSKEYS_REBRAND preview date: Feb 4, 2026 -->

#### OIN submissions for API Integration Actions

Independent Software Vendors (ISVs) can now use the low-code Okta Integration Builder to integrate their apps with API Integration Actions. This allows ISVs to integrate their existing APIs with Okta actions without adopting specific protocols, such as SCIM or GTR. ISVs can submit integrations that use API Integration Actions to the OIN catalog using the OIN Wizard.

See [API Integration Actions](/docs/guides/oin-api-actions/) and [Submit an integration with the OIN Wizard](/docs/guides/submit-oin-app/wfactions/main/). The OIN Wizard and Okta Integration Builder are only available on Integrator Free Plan orgs.
<!-- OKTA-1007250, OKTA-1145738, ACTIONS_3P_SUBMISSION, Production: May 12, 2026 -->

#### Developer documentation updates in 2026.05.0

* The new [Sign-up flows](/docs/concepts/sign-up-flows/ ) guide provides best practices for designing secure, high-conversion registration strategies. This resource helps developers balance user experience and security by covering topics such as progressive enrollment and automated group assignments.

* The new [Script your user migration with the Okta Users API](/docs/guides/migrate-to-okta-with-scripts/) guide demonstrates how to programmatically import users from an external system to Okta using the Okta Users API. This guide provides best practices and sample code to help you script three import scenarios.

* The new [Migrate users to Okta](/docs/journeys/OCI-migrate-users/main/) journey helps you move your existing user accounts into Okta's Universal Directory, centralizing identity management and improving security.

* The new [Plan your user migration to Okta](/docs/guides/migrate-to-okta-plan/main/) guide helps you create a more comprehensive and tailored migration plan. It provides a structured, question-based approach to planning.

* The new [Test your migration plan](/docs/guides/test-your-migration-plan/main/) guide helps you test your migration method before moving to production. It provides a systematic approach to create test scenarios, track defects, and establish a rollback plan.

* The [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/authserver/main/) guide has been updated to include configuration instructions for resource servers (such as MCP servers). The Token Exchange flow diagram has also been updated to be specific for each resource type.

#### Bug fixed in 2026.05.0

* Some API responses to unauthenticated passwordless flows included values for the `deviceName` property. (OKTA-828990)

* The **Support Contact (for Okta use only)** field was incorrectly located on the **Configure your integration** page instead of the **Integration details** page where other catalog properties are managed. (OKTA-1147858)

## April

### Weekly release 2026.04.3
<!-- Published on: 2026-04-29T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Identity Threat Protection managed with Terraform](#identity-threat-protection-managed-with-terraform) | April 29, 2026 |

#### Identity Threat Protection managed with Terraform

You can now manage Okta Identity Threat Protection (ITP) using the Okta Terraform Provider. This allows admins to manage their entire threat protection surface using an Infrastructure-as-Code (IaC) approach, ensuring consistent, repeatable, and scalable security configurations. See [Manage Identity Threat Protection resources using Terraform](/docs/guides/terraform-manage-itp/main/). <!-- OKTA-1122778 -->

### Weekly release 2026.04.2
<!-- Published on: 2026-04-15T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bugs fixed in 2026.04.2](#bugs-fixed-in-2026-04-2)| April 15, 2026 |

#### Bugs fixed in 2026.04.2

* When Entitlement Management was enabled in Integrator Free Plan orgs, SCIM apps experienced import failures if users had existing entitlements. (OKTA-1150897)
<!--  Okta Integrator Free Plan org bug -->

* When Entitlement Management was enabled in Integrator Free Plan orgs, group push for SCIM apps failed with an error and prevented groups from synchronizing.(OKTA-1149228)
<!-- Okta Integrator Free Plan org bug -->

* The request body parameter `riskLevel` of the [Upsert the user's risk API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/userrisk/other/upsertuserrisk#other/upsertuserrisk/t=request&path=risklevel) didn't support the `MEDIUM` risk level. (OKTA-1130873)

### Weekly release 2026.04.1
<!-- Published on: 2026-04-08T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bugs fixed in 2026.04.1](#bugs-fixed-in-2026-04-1)| April 8, 2026 |

#### Bugs fixed in 2026.04.1

* WebAuthn transport values, which specify the connection method that WebAuthn authenticators use to communicate with a user's device, weren't returned by the List all authenticator enrollments [endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/userauthenticatorenrollments/other/listauthenticatorenrollments). (OKTA-1118046)

* The `AuthnRequestId` field in the System Log wasn't included for authorization code flow and device code flow token request events. (OKTA-1082636)

### Monthly release 2026.04.0
<!-- Published on: 2026-04-02T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Entitlements Management and API service on the Admin Console Home page](#entitlements-management-and-api-service-on-the-admin-console-home-page) | |
|[Authentication requirement for OIN Manager migration](#authentication-requirement-for-oin-manager-migration)||
| [Submit entitlement management integrations is GA in Production](#submit-entitlement-management-integrations-is-ga-in-production) | Nov 5, 2025 |
| [Slack integration for Identity Governance](#slack-integration-for-identity-governance) | February 18, 2026 |
| [Custom admin permissions for inline and event hooks is GA in Production](#custom-admin-permissions-for-inline-and-event-hooks-is-ga-in-production) | December 10, 2025 |
| [Increase to the maximum access duration limit ](#increase-to-the-maximum-access-duration-limit) | April 1, 2026 |
| [Authentication requirement for OIN Manager migration is GA in Production](#authentication-requirement-for-oin-manager-migration-is-ga-in-production) | April 1, 2026 |
| [Skip counts for authenticator enrollment grace periods is GA in Preview](#skip-counts-for-authenticator-enrollment-grace-periods-is-ga-in-preview) | Feb 4, 2026 |
| [Client update policy is GA in Preview](#client-update-policy-is-ga-in-preview) | January 7, 2026 |
| [Support for custom risk reasons in User Risk API](#support-for-custom-risk-reasons-in-user-risk-api) | April 1, 2026 |
| [Detection settings in session protection is GA in Production](#detection-settings-in-session-protection-is-ga-in-production) | December 10, 2025 |
| [Passkeys rebrand is GA in Preview](#passkeys-rebrand-is-ga-in-preview) | Feb 4, 2026 |
| [Maximum consecutive characters setting for passwords is GA in Production](#maximum-consecutive-characters-setting-for-passwords-is-ga-in-production) | Dec 10, 2025 |
| [New password complexity property is GA in Production](#new-password-complexity-property-is-ga-in-production) | June 4, 2025 |
| [Express Submission in the OIN Wizard](#express-submission-in-the-oin-wizard) | |
| [Developer documentation updates in 2026.04.0](#developer-documentation-updates-in-2026-04-0) | April 1, 2026 |
| [Bugs fixed in 2026.04.0](#bugs-fixed-in-2026-04-0)| April 1, 2026 |

#### Entitlements Management and API service on the Admin Console Home page

The **Home** page in the Admin Console now includes **Entitlements Management** and **API service** integrations. ISVs can initiate the full entitlements and API service integration flows and track progress directly from the **Home** page. A new **Entitlements** toggle enables fine-grained access control and real-time validation to ensure integrations are built with all security requirements. <!-- OKTA-1134610 -->

#### Authentication requirement for OIN Manager migration

After migrating a SCIM integration from the OIN Manager to the OIN Wizard, the **Basic** option is visible in the **Authentication mode** dropdown list. However, you can't select this option for resubmission. Select a different authentication method to complete the submission.
<!-- OKTA-1114958 -->

#### Submit entitlement management integrations is GA in Production

Independent Software Vendors (ISVs) can now submit SCIM 2.0-based entitlement management integrations to the Okta Integration Network (OIN). This enhancement enables customers and IT admins to discover, manage, and assign fine-grained entitlements such as roles and permissions directly from Okta. By standardizing entitlement management, organizations can automate access assignments and streamline Identity Governance, ensuring that users receive the right access and roles without manual intervention. See [Submit an integration with the OIN Wizard](https://developer.okta.com/docs/guides/submit-oin-app/scim/main/). <!-- OKTA-1025782 ENTITLEMENTS_SUBMISSION Preview date: Nov 5, 2025 -->

#### Slack integration for Identity Governance

Okta for Government Moderate and Government High customers who use commercial Slack instances can now integrate Slack with their org to streamline access management in Access Requests and Access Certifications. Users can now submit and approve requests in Slack, as well as receive Slack notifications for access requests and certification campaigns. Feature availability varies depending on whether the Unified requester experience feature is enabled. See [Okta Identity Governance Limitations for Public Sector Service](https://support.okta.com/help/s/article/okta-identity-governance-compatibility-limitations-for-public-sector-service?language=en_US ) and [Integrate Slack](https://help.okta.com/okta_help.htm?type=oie&id=csh-ar-integrate-slack).

The following APIs support governance Slack integration settings and are available as Beta:

* Org Slack integration setting: **Org Governance Settings** > [Create an org integration](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/org-governance-settings/createorgintegration)
* Access Certification Slack integration setting: **Org Governance Settings** > [Update the org certification settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/org-governance-settings/updateorgcertificationsettings)
* Access Request Slack integration setting: **Access Request - V2** > **Request Settings** > [Update the org request settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/request-settings/updateorgrequestsettingsv2) <!-- OKTA-1138055 Preview date: February 18, 2026 -->

#### Custom admin permissions for inline and event hooks is GA in Production

The inline hook and event hook framework now supports read and write permissions for custom admin roles. This enhancement gives fine-grained access to manage inline and event hooks that previously required the super admin role. See [Hooks admin roles](https://developer.okta.com/docs/guides/hooks-best-practices/#hook-admin-roles). <!-- OKTA-1133787 HOOKS_PUBLIC_PERMISSIONS Preview: December 10, 2025-->

#### Increase to the maximum access duration limit

When you create or edit access request conditions, you can now set `accessDurationSettings.duration` or `accessDurationSettings.maximumDuration` to a maximum of 365 days or 52 weeks. <!-- OKTA-1081978 preview date: April 1, 2026-->

#### Authentication requirement for OIN Manager migration is GA in Production

After an admin migrates a SCIM integration from the OIN Manager to the OIN Wizard, the **Basic** option is visible in the **Authentication mode** dropdown list. However, you can't select this option for resubmission. Select a different authentication method to complete the submission.

#### Skip counts for authenticator enrollment grace periods is GA in Preview

This feature allows admins to define a number of skips end users can defer enrollment into an authenticator, as well as customizations to the prompt when end users see the grace period. See [Grace periods](/docs/concepts/policies/#grace-periods) and [type](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/policy/other/createpolicy#other/createpolicy/t=response&c=200&path=&d=1/settings/authenticators/enroll/graceperiod). <!-- OKTA-1044803 FF: ENROLLMENT_POLICY_GRACE_PERIOD_V2 preview date: Feb 4, 2026 -->

#### Client update policy is GA in Preview

The Policies API now supports the `CLIENT_POLICY` type, enabling you to enforce or defer app updates across different device platforms. This lets you programmatically align app versions with internal change management processes. See the [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/listPolicies) and [Release controls policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-ov-release-controls). <!-- OKTA_VERIFY_RELEASE_CONTROL_POLICY OKTA-1036332 January 7, 2026 -->

#### Support for custom risk reasons in User Risk API

The PUT `/api/v1/users/{userId}/risk` [endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/userrisk/other/upsertuserrisk) now accepts an optional `riskReason` field in the request body that provides a custom reason for the risk level change. If a value isn't provided, the parameter defaults to `override.by.admin`. <!--OKTA-1104360, OKTA-1141971 -->

#### Detection settings in session protection is GA in Production

Tailor ITP to your org's security priorities to gain control and balance security with a seamless user experience. With new detection settings, you can define which session context changes trigger policy reevaluations, helping you focus only on what truly matters. See [Session protection](https://help.okta.com/okta_help.htm?type=oie&id=csh-continuous-access-evaluation). <!-- OKTA-1016513 SESSION_VIOLATION_DETECTION_CONFIGURATION Preview date: December 10, 2025 -->

#### Passkeys rebrand is GA in Preview

The FIDO2 (WebAuthn) authenticator is being rebranded to Passkeys (FIDO2 WebAuthn) and Okta is introducing enhanced administrative controls and a streamlined user experience. This update centralizes passkey management through a consolidated settings page, allows for customized authenticator naming, and introduces a dedicated **Sign in with a passkey** button within the Sign-In Widget. These enhancements simplify the authentication journey and provide users with a more intuitive sign-in process with the **Sign in with a passkey** button.

For more information about the new settings and updates, see [Passkeys and WebAuthn](/docs/guides/authenticators-web-authn/aspnet/main/#passkeys-and-webauthn) and [Configure the Passkeys (FIDO2 WebAuthn) authenticator](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-webauthn). <!-- OKTA-1012303 FF: PASSKEYS_REBRAND preview date: Feb 4, 2026 -->

#### Maximum consecutive characters setting for passwords is GA in Production

You can now use the `maxConsecutiveCharacters` property to limit the number of consecutive repeating characters in passwords. This feature enhances security by allowing you to customize your password strength requirements. See the [Policy API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/policy/other/createpolicy#other/createpolicy/t=request&path=&d=3/settings/password/complexity/maxconsecutivecharacters). <!-- PASSWORD_POLICY_MAX_CONSECUTIVE_REPEATING_CHARACTERS OKTA-922058 preview org date: Dec 10, 2025 -->

#### New password complexity property is GA in Production

You can now use the `oelStatement` property to block words from being used in passwords. This feature enhances security by allowing you to customize your password strength requirements. See the [Policy API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/policy/other/createpolicy#other/createpolicy/t=request&path=&d=3/settings/password/complexity/oelstatement). <!-- OKTA-849300 PASSWORD_POLICY_OEL_STATEMENT preview date: June 4, 2025 -->

#### Express Submission in the OIN Wizard

Express Submission reduces the time-to-value for independent software vendors (ISVs) to submit Express Configuration functionality for Auth0-enabled SaaS apps to the OIN. With Express Submission, ISVs can input Auth0 metadata into Okta and generate the necessary public key on demand to complete their Express Configuration setup in the OIN Wizard. This eliminates intervention from the OIN operations team and enables quicker submission and publication of Express Configuration functionality apps in the OIN. See [Express Submission](/docs/guides/express-submission/main/).
<!-- OKTA-1140034 EXPRESS_SUBMISSION_LITE No Preview date, Production date: April 7 -->

#### Developer documentation updates in 2026.04.0

* The new [Manage delegates for governance](/docs/guides/iga-delegates/main/) guide describes how to manage governance delegate assignments and settings using the Okta Identity Governance (OIG) APIs.

* The contents of the SCIM FAQ doc have been added to the new [SCIM integration concepts and requirements](/docs/concepts/scim/faqs/) doc.

#### Bugs fixed in 2026.04.0

* When an admin added users to read-only groups using the Groups API (`PUT /api/v1/groups/{groupId}/users/{userId}`), the endpoint incorrectly returned HTTP 501 (Not Implemented) instead of HTTP 403 (Forbidden). (OKTA-1139611)

* The Factors API didn't return enrollment information about the Okta FastPass factor (`signed_nonce`) for some users who didn't have Okta Verify with push notifications enrolled or enabled. (OKTA-1052073)

* ISVs were unable to submit their integrations for review despite passing all validation tests. (OKTA-1134528)

* App instances incorrectly displayed the logo from the published version of a submission instead of the logo from the latest version. (OKTA-1136513)

* Integrator Free Tier (IFT) orgs incorrectly showed and enforced a 5-instance limit in the OIN Wizard. (Okta-1044631)

## March

### Weekly release 2026.03.3
<!-- Published on: 2026-03-25T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2026.03.3](#bugs-fixed-in-2026-03-3) | March 25, 2026 |

* The Sign-In Widget didn't load the bot protection enforcement challenge required on some endpoints, leading to an incorrect user redirect to a 403 page. (OKTA-1125106) (OKTA-1136962)

* For realm resources, the List all resource set resources API (`api/v1/iam/resource-sets/{resourceSetIdOrLabel}/resources`) returned a `null` value for the `_links.self` parameter. (OKTA-1135761)

* When users attempted to authenticate on Android devices, some password managers didn't allow them to register passkeys. (OKTA-1135513)

### Weekly release 2026.03.2
<!-- Published on: 2026-03-18T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2026.03.2](#bugs-fixed-in-2026-03-2) | March 18, 2026 |

#### Bugs fixed in 2026.03.2

* The Agent Pools API returned a generic illegal argument exception when invalid parameters were provided. (OKTA-1112681)

* Agent Pool update requests didn't verify that the provided pool ID was a valid app instance ID. (OKTA-890681)

* When you used the Create an org [endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/orgcreator/other/createchildorg) to create a child org and then enabled Identity Engine for the org, `POST_AUTH_SESSION` and `ENTITY_RISK` policies and policy rules were sometimes deleted. (OKTA-1111235)

* You sometimes weren't able to [deactivate an Okta Integration IdP](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/identityprovider/other/deactivateidentityprovider) that had `trustClaims: true`, even when all your authentication policies didn't require trusted claims. (OKTA-1088872)

* An [update a user schema](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/schema/other/updateuserprofile) request failed with a timeout error when it included a large number of identity providers. (OKTA-1010509)

### Weekly release 2026.03.1
<!-- Published on: 2026-03-11T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2026.03.1](#bugs-fixed-in-2026-03-1)| March 11, 2026 |

#### Bugs fixed in 2026.03.1

* The Sign-In Widget didn't load the bot protection enforcement challenge required on some endpoints, leading to an incorrect user redirect to a 403 page. (OKTA-1125106)

* The mandatory SSO configuration check for testing information was incorrectly bypassed for all SSO submissions. (OKTA-1119127)

* Some of the custom advanced sign-on settings for integrations created using the [Application API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/application/other/createapplication) weren't correctly reflected on the app instance page. (OKTA-1109692)

### Monthly release 2026.03.0
<!-- Published on: 2026-03-04T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Self-Service for Enhanced Disaster Recovery is self-service EA in Preview](#self-service-for-enhanced-disaster-recovery-is-self-service-ea-in-preview) | March 4, 2026 |
| [Submit API service integrations](#submit-api-service-integrations) | March 4, 2026 |
| [Admin Console Home page](#admin-console-home-page) | March 4, 2026 |
| [New Directories Integration endpoints to view extended Active Directory group attributes is GA in Preview](#new-directories-integration-endpoints-to-view-extended-active-directory-group-attributes-is-ga-in-preview) | March 4, 2026 |
| [Grace period for device assurance is GA in Production is GA in Production](#grace-period-for-device-assurance-is-ga-in-production) | October 9, 2024 |
| [Dynamic OS version compliance for device assurance is GA in Production](#dynamic-os-version-compliance-for-device-assurance-is-ga-in-production) | February 7, 2024 |
| [Enable custom admin permissions for inline and event hooks is GA in Preview](#enable-custom-admin-permissions-for-inline-and-event-hooks-is-ga-in-preview) | December 10, 2025 |
| [Developer documentation updates in 2026.03.0](#developer-documentation-updates-in-2026-03-0) | March 4, 2026 |
| [Bug fixed in 2026.03.0](#bug-fixed-in-2026-03-0)| March 4, 2026 |

#### Self-Service for Enhanced Disaster Recovery is self-service EA in Preview

When unexpected infrastructure-related outages occur, orgs need an immediate and reliable way to maintain business continuity. Okta's Standard Disaster Recovery, implemented by Okta's operations teams, provides failover and failback with a recovery time objective of one hour.

Okta's Enhanced Disaster Recovery (Enhanced DR) gives admins the option to manage their org's recovery. This feature empowers admins by providing direct, self-service tools and APIs to manage, test, and automate the failover and restoration processes for their impacted orgs.

With Enhanced DR, admins gain active control to initiate a failover and restore for impacted orgs directly from the Okta Disaster Recovery Admin portal or through APIs. Additionally, teams can validate their system's resilience by safely testing these failover and restoration capabilities at their convenience. Finally, Enhanced DR enables orgs to automate failover processes by using real-time monitoring to invoke failover APIs, significantly minimizing downtime during an actual event. See [Manage org recovery with Okta Enhanced Disaster Recovery](/docs/guides/manage-orgs-okta-edr/).
<!-- OKTA-663592 preview date: March 4, 2026  -->

#### Submit API service integrations

Independent Software Vendors (ISVs) can now use the OIN Wizard to submit API service integrations to the Okta Integration Network (OIN). Previously, ISVs provided metadata in the OIN Manager. With this update, ISVs can create and configure API service apps directly within the OIN Wizard
The OIN Wizard currently supports only client secret authentication for API service integrations. ISVs can also generate credentials and perform end-to-end testing independently. These improvements streamline the app submission process and ensure a faster, more secure review. See [Submit an integration with the OIN Wizard](/docs/guides/submit-oin-app/uapiservice/main/).
<!-- OKTA-1119846 API_SERVICE_SUBMISSION preview date: March 4, 2026  -->

#### Admin Console Home page

The new Admin Console **Home** page for IFT orgs provides a faster way to start and manage your app submissions. Instead of navigating through the previous **Applications** > **Your OIN Integrations** path, you can now initiate submissions directly from the **Home** page. This guided experience helps you select integration types, understand requirements through a new **Quick Start guide**, and track your submission in real time from build to publication. It also includes a **Coming Soon** section to preview and register for upcoming integrations, making the entire process more centralized and efficient.
<!-- OKTA-1117696 IFT_GETTING_STARTED_EXPERIENCE preview date: March 4, 2026  -->

#### New Directories Integration endpoints to view extended Active Directory group attributes is GA in Preview

New API endpoints have been added to the Directories Integration (`POST /api/v1/directories/{appInstanceId}/group/{groupId}/query` and `GET /api/v1/directories/{appInstanceId}/group/{groupId}/query/{resultId}`), which allows for the real-time retrieval of any standard or custom attribute from Active Directory (AD) groups. You can now programmatically access attributes, like cost centers and department codes, without waiting for a full directory sync. This feature allows you to accelerate automation by using live AD group metadata, while simultaneously eliminating manual data management by creating a single, reliable bridge between your on-premises directory details and your cloud ecosystem. See [Directories Integrations API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/directoriesintegration).
<!-- OKTA-1117092 AD_GROUP_READ_ATTRIBUTES preview date: March 4, 2026  -->

#### Grace period for device assurance is GA in Production

Occasionally, users' devices might fall out of compliance with security policies due to temporary conditions such as missed software updates or unapproved network connections. Without a grace period, they would be immediately blocked from accessing critical resources, which disrupts productivity and causes frustration. The grace period for device assurance feature allows you to define a temporary window during which non-compliant devices can still access resources. This gives users time to remediate issues without being locked out, balancing productivity with security standards.

See [Device Assurance Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/createDeviceAssurancePolicy!path=0/gracePeriod&t=request) and the [Add a device assurance policy guide](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-assurance-add). <!-- DEVICE_ASSURANCE_GRACE_PERIOD OKTA-803140 Preview date: October 9, 2024 -->

#### Dynamic OS version compliance for device assurance is GA in Production

You can configure OS version compliance by using device assurance. However, you have to manually update the policies every time a new OS version or patch is released. With **Dynamic OS version compliance**, Okta updates device assurance policies with the latest OS versions and patches, eliminating the need for manual updates. With this feature you can ensure OS version compliance in your org without tracking OS releases. See [Dynamic OS version compliance](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-assurance-add) and [Device Assurance Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/createDeviceAssurancePolicy!path=1/osVersion&t=request). <!-- DEVICE_ASSURANCE_DYNAMIC_OS_SUPPORT OKTA-651282 Preview date: February 7, 2024 -->

#### Enable custom admin permissions for inline and event hooks is GA in preview

The inline hook and event hook framework now supports read and write permissions for custom admin roles. This enhancement gives fine-grained access to manage inline and event hooks that previously required the super admin role. See [Hooks admin roles](/docs/guides/hooks-best-practices/).
<!-- OKTA-1113869 preview date: December 10, 2025  -->

#### Developer documentation updates in 2026.03.0

* Okta's [API reference pages](https://developer.okta.com/docs/api/) are undergoing a migration, which started on February 24. While the look and feel may vary across pages during this time, all technical documentation remains accurate and up to date.
* You can no longer submit API service integrations through the OIN Manager, so the instructions have been removed from the [OIN Manager](/docs/guides/submit-app/wfconnector/main/) guide. To submit an API service integration, use the [OIN Wizard](/docs/guides/submit-oin-app/uapiservice/main/).
* The new [Plan your self-service registration](/docs/concepts/self-service-registration/) doc explains the self-service registration (SSR) flow, how it works, its default state, and three different ways to customize and configure it.
* A new guide is available for Okta Enhanced Disaster Recovery, a feature that gives admins direct control over business continuity. Learn how to:
  * Initiate failover and restoration (failback) using the self-service portal or APIs.
  * Validate system resilience by safely testing recovery capabilities.
  * Automate failover processes to minimize downtime during an outage.

  See [Manage org recovery with Okta Enhanced Disaster Recovery](/docs/guides/manage-orgs-okta-edr/main).
* The new [Enable and configure a sign-up form](/docs/guides/enable-configure-signupform/main/) guide explains how to configure a Self-Service Registration flow to securely automate how you onboard new users. You learn how to build policies that go beyond a simple sign-up form by defining required user information, automating group assignments, and enforcing security measures like email verification and authenticator enrollment.
* The new [Add a sign-up form to your web app](/docs/journeys/OCI-web-sign-up/main/) journey helps you implement a sign-up form for your web app, reducing onboarding friction and accelerating user acquisition.
* The new [Sign users up with an Okta-hosted sign-up form](/docs/guides/signup-oktahosted/main/) guide illustrates how to implement a Self-Service Registration flow on page using the Okta-hosted Sign-In Widget. It also covers how to customize an out-of-the-box experience for your app using the Okta Auth JavaScript SDK.
* The new [Sign users up with a self-hosted sign-up form](/docs/guides/signup-selfhosted/main/) guide illustrates how to implement a self-hosted sign-up experience using the Okta Auth JavaScript SDK and the Okta embedded Sign-In Widget.

#### Bug fixed in 2026.03.0

Bot detection events were logged for standard Admin/Management API calls when the Sign-In Widget wasn't involved. (OKTA-1113990)

## February

### Weekly release 2026.02.3
<!-- Published on: 2026-02-25T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2026.02.3](#bug-fixed-in-2026-02-3)| February 25, 2026 |

#### Bug fixed in 2026.02.3

An incorrect error occurred when a user made a request to the `/primary-authenticate` endpoint with a `challenge_hint` value that was a valid OAuth 2.0 grant type, but not a valid value for the `/primary-authenticate` endpoint. (OKTA-1116277)

### Weekly release 2026.02.2
<!-- Published on: 2026-02-20T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2026.02.2](#bug-fixed-in-2026-02-2)| February 19, 2026 |

#### Bug fixed in 2026.02.2

In orgs with Device claims support for Okta-to-Okta Claims Sharing enabled, claims weren't sent in the SAML assertion if device signals weren't collected in the IdP org. (OKTA-1112627)

### Weekly release 2026.02.1
<!-- Published on: 2026-02-11T12:00:00Z -->
| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2026.02.1](#bugs-fixed-in-2026-02-1)| February 11, 2026 |

#### Bug fixed in 2026.02.1

SMS and Call factor rate limits were sometimes incorrectly reported by the direct authentication APIs. (OKTA-1107880)

### Monthly release 2026.02.0
<!-- Published on: 2026-02-05T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Linux as a platform condition is GA in Preview](#linux-as-a-platform-condition-is-ga-in-preview) | February 4, 2026 |
| [Skip counts for authenticator enrollment grace periods is self-service EA in Preview](#skip-counts-for-authenticator-enrollment-grace-periods-is-self-service-ea-in-preview) | February 4, 2026 |
| [Dynamic OS version compliance for device assurance is GA in Preview](#dynamic-os-version-compliance-for-device-assurance-is-ga-in-preview) | February 4, 2024 |
| [Grace period for device assurance is GA in Preview](#grace-period-for-device-assurance-is-ga-in-preview) | October 9, 2024 |
| [Lightweight Directory Access Protocol Bidirectional Group Management is GA in Production](#lightweight-directory-access-protocol-bidirectional-group-management-is-ga-in-production) | December 5, 2025 |
| [Detection settings in session protection is GA in Preview](#detection-settings-in-session-protection-is-ga-in-preview) | February 4, 2026 |
| [Passkeys Rebrand is self-service EA in Preview](#passkeys-rebrand-is-self-service-ea-in-preview) | February 4, 2026 |
| [Custom FIDO2 AAGUID is GA in Production](#custom-fido2-aaguid-is-ga-in-production) | July 16, 2025 |
| [OAuth 2.0 support for custom email providers is self-service EA in Preview](#oauth-2-0-support-for-custom-email-providers-is-self-service-ea-in-preview) | February 4, 2026 |
| [Okta as a fallback IdP is self-service EA in Preview](#okta-as-a-fallback-idp-is-self-service-ea-in-preview) | January 28, 2026 |
| [Developer documentation updates in 2026.02.0](#developer-documentation-updates-in-2026-02-0) | February 4, 2026 |
| [Bugs fixed in 2026.02.0](#bugs-fixed-in-2026-02-0)| |

#### Linux as a platform condition is GA in Preview

Okta now supports `LINUX` as a device platform condition in the following policy types and policy rules:

* App sign-in policies (`ACCESS_POLICY` rules)
* Okta account management policy rules (Rules for the Okta account management `ACCESS_POLICY`)
* Identity provider routing rules (`IDP_DISCOVERY` rules)

See the [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule!path=0/conditions/platform/exclude/os/type&t=request).
<!-- OKTA-1093354 LINUX_SUPPORT_FOR_POLICIES preview date: Feb 4, 2026 -->

#### Skip counts for authenticator enrollment grace periods is EA

This feature allows admins to define a number of skips that end users can defer enrollment into an authenticator, as well as customizations to the prompt when end users see the grace period. See [Grace periods](/docs/concepts/policies/#grace-periods) and [type](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=1/settings/authenticators/enroll/gracePeriod/0/type&t=request).

<!-- OKTA-1044803 FF: ENROLLMENT_POLICY_GRACE_PERIOD_V2 preview date: Feb 4, 2026 -->

#### Dynamic OS version compliance for device assurance is GA in Preview

You can configure OS version compliance by using device assurance. However, you have to manually update the policies every time a new OS version or patch is released. With **Dynamic OS version compliance**, Okta updates device assurance policies with the latest OS versions and patches, eliminating the need for manual updates. With this feature you can ensure OS version compliance in your org without tracking OS releases. See [Dynamic OS version compliance](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-assurance-add) and [Device Assurance Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/createDeviceAssurancePolicy!path=1/osVersion&t=request). <!-- DEVICE_ASSURANCE_DYNAMIC_OS_SUPPORT OKTA-651282 Preview date: February 6, 2024 -->

#### Grace period for device assurance is GA in Preview

Occasionally, users' devices might fall out of compliance with security policies due to temporary conditions such as missed software updates or unapproved network connections. Without a grace period, they would be immediately blocked from accessing critical resources, which disrupts productivity and causes frustration. The grace period for device assurance feature allows you to define a temporary window during which non-compliant devices can still access resources. This gives users time to remediate issues without being locked out, balancing productivity with security standards.

See [Device Assurance Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/createDeviceAssurancePolicy!path=0/gracePeriod&t=request) and the [Add a device assurance policy guide](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-assurance-add). <!-- DEVICE_ASSURANCE_GRACE_PERIOD OKTA-803140 Preview date: October 9, 2024 -->

#### Lightweight directory access protocol bidirectional group management is GA in Production

The [Bidirectional Group Management API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DirectoriesIntegration) has been expanded to allow you to manage Lightweight Directory Access Protocol (LDAP) groups from within Okta. You can add or remove users from groups based on their identity and access requirements. This ensures that changes made to user access in Okta are reflected in LDAP.

Okta can only manage group memberships for users and groups imported into Okta using the LDAP or Active Directory (AD) integration. It isn't possible to manage users and groups that weren't imported through LDAP or AD integration or are outside the organizational unit's scope for the integration using this feature.

#### Detection settings in session protection is GA in Preview

Tailor ITP to your org's security priorities to gain control and balance security with a seamless user experience. With new detection settings, you can define which session context changes trigger policy re-evaluations, helping you focus only on what truly matters. See [Session protection](https://help.okta.com/okta_help.htm?type=oie&id=csh-continuous-access-evaluation).

#### Passkeys rebrand is self-service EA in Preview

The FIDO2 (WebAuthn) authenticator is being rebranded to Passkeys (FIDO2 WebAuthn). The FIDO2 (WebAuthn) authenticator is being rebranded to Passkeys (FIDO2 WebAuthn) and Okta is introducing enhanced administrative controls and a streamlined user experience. This update centralizes passkey management through a consolidated settings page, allows for customized authenticator naming, and introduces a dedicated **Sign in with a passkey** button within the Sign-In Widget. These enhancements simplify the authentication journey and provide users with a more intuitive sign-in process with the **Sign in with a passkey** button.

For more information about the new settings and updates, see [Configure the FIDO2 (WebAuthn) authenticator](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-webauthn) and [`settings`](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/replaceAuthenticatorMethod!path=8/settings&t=request).

<!-- OKTA-1012303 FF: PASSKEYS_REBRAND preview date: Feb 4, 2026 -->

#### Custom FIDO2 AAGUID is GA in Production

You can now use the [Authenticators API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/) to create, view, and update custom Authenticator Attestation Global Unique Identifiers (AAGUIDs).

Admins can add non-FIDO Metadata Service (MDS) security keys and other authenticators and have more granular control over them. This extends FIDO2 (WebAuthn) authenticator support to a wider range of security keys and other authenticators, which gives admins greater flexibility and control over the security in their environment.

<!-- OKTA-971037 WEBAUTHN_CUSTOM_AAGUID preview date: July 16, 2025 -->

#### OAuth 2.0 support for custom email providers is self-service EA in Preview

You can now configure custom email providers with OAuth 2.0 authentication. You can choose between two OAuth 2.0 client configurations to fetch access tokens and use those access tokens to authenticate with your email provider's SMTP server. See [Custom email providers with OAuth 2.0](/docs/guides/custom-smtp/main/) to understand the new OAuth 2.0 methods.

* See [Use your own email provider](https://help.okta.com/okta_help.htm?type=oie&id=csh-email-provider-main) to configure them in the Admin Console.
* See the [Email Providers API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/EmailServer/) to configure them with APIs.

<!-- OKTA-1100448 FF: OAUTH_FOR_CUSTOM_SMTP_SERVER, preview date: Feb 4, 2026 -->

#### Okta as a fallback IdP is self-service EA in Preview

This feature redirects users to Okta to authenticate if the primary identity provider can't establish their identity. This can happen because of explicit rejections, like invalid credentials and MFA failures, or if an existing user session can't be silently verified, such as during a `prompt=none` OIDC request or `IsPassive=true` SAML request. See the [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/listPolicyRules!c=200&path=4/actions&t=response). <!-- OKTA-1091224 ALLOW_IDENTITY_PROVIDER_CHAINING Preview org date: January 28, 2026 -->

#### Developer documentation updates in 2026.02.0

* All references to deprecated API Postman collections are now removed from [Home | Okta Developer](https://developer.okta.com/) and replaced with references to the [Okta Public API Collections](https://www.postman.com/okta-eng/okta-public-api-collections/overview) workspace.
* The new [Add a sign-in form to your mobile app](https://developer.okta.com/docs/journeys/OCI-mobile/main/) journey helps you build a secure and complete sign-in experience for your mobile app, giving your users seamless access while protecting their data.
* The new [Universal Directory](/docs/concepts/universal-directory/) concept provides a comprehensive overview of Okta's Universal Directory (UD). UD is the centralized data layer that serves as the foundation for the entire Okta platform. This new doc replaces the previous User Profiles concept and goes into more depth on its components and advantages.
* The Okta developer portal search results now include the API references.
* The new [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/authserver/main/) guide explains how to configure token exchange for AI agents. This feature enables you to securely request and use credentials such as Identity Assertion JWTs (ID-JAGs), secrets, or service accounts to access resources on behalf of authenticated users.
* The [/token](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/token) endpoint now supports token exchange flows for AI agents through the standard OAuth 2.0 Token Exchange grant type.
* The Okta Model Context Protocol (MCP) server is a secure protocol abstraction layer that enables AI agents/Large Language Models (LLMs) to interact with an Okta org. MCP clients can now communicate with the Okta scoped management APIs in natural language. This simplifies building context-aware AI workflows while ensuring strict access control and least-privilege security. To learn more and start your implementation, see the [Okta MCP server concept](/docs/concepts/mcp-server/) and [guide](/docs/guides/mcp-server/main/). Also, MCP now has its own dedicated [Release Notes](/docs/release-notes/2026-okta-mcp-server) section. In the future, refer to this page for all MCP server announcements.

#### Bugs fixed in 2026.02.0

* When users requested metadata for a non-existent identity provider, the system attempted to trigger an undefined error code. This caused a secondary exception in the Splunk logs. (OKTA-504955)
* When no-cache, no-store headers from `/oauth2/<authorizationServerId>/v1/keys` were returned, it caused an unnecessarily high number of requests to `/oauth2/<authorizationServerId>/v1/keys`. (OKTA-1099636)

## January

### Weekly release 2026.01.2
<!-- Published on: 2026-01-29T12:00:00Z -->
| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2026.01.2](#bugs-fixed-in-2026-01-2)| January 28, 2026 |

#### Bugs fixed in 2026.01.2

* POST requests to the `/device-assurances` endpoint and PUT requests to the `/device-assurances/{deviceAssuranceId}` endpoint for `ANDROID` or `IOS` platforms permitted the inclusion of the Windows-specific `thirdPartySignalProviders.dtc` object. (OKTA-1045564)

* Upon activation (`POST /users/{id}/lifecycle/activate?sendEmail=true`), some users were enrolled in duplicate email authenticators for the same address. (OKTA-1046873)

* When you call the List all Groups API ([`/api/v1/groups`](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/#tag/Group/operation/listGroups)) with the `expand=stats` query parameter, the response returned inaccurate data for the `_embedded.stats.hasAdminPrivileges` field for groups with assigned custom roles. (OKTA-1094903)

* The link to the API reference for **Native to Web SSO** on the **Features** page was broken. (OKTA-1094965)

### Weekly release 2026.01.1
<!-- Published on: 2026-01-14T12:00:00Z -->
| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2026.01.1](#bug-fixed-in-2026-01-1)| January 14, 2026 |

#### Bug fixed in 2026.01.1

When an admin sent a GET request to the `/idp/myaccount/password/complexity-requirements` endpoint, the response body contained HTML-escaped characters. (OKTA-1080153)

### Monthly release 2026.01.0
<!-- Published on: 2026-01-08T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Native to Web SSO is self-service EA in Preview](#native-to-web-sso-is-self-service-ea-in-preview) | January 7, 2026 |
| [Bring your own telephony credentials is self-service EA in Preview](#bring-your-own-telephony-credentials-is-self-service-ea-in-preview) | January 7, 2026 |
| [Client update policy is EA in Preview](#client-update-policy-is-ea-in-preview) | January 7, 2026 |
| [Encryption of ID tokens and access tokens is GA in Production](#encryption-of-id-tokens-and-access-tokens-is-ga-in-production) | August 7, 2025 |
| [Unified claims generation for custom apps is GA in Production](#unified-claims-generation-for-custom-apps-is-ga-in-production) | July 30, 2025 |
| [Custom FIDO2 AAGUID is GA in Preview](#custom-fido2-aaguid-is-ga-in-preview) | July 16, 2025 |
| [Improvements to the global session policy MFA requirements is GA in Production](#improvements-to-the-global-session-policy-mfa-requirements-is-ga-in-production) | December 10, 2025 |
| [Additional Anything-as-a-Source API endpoints is GA in Production](#additional-anything-as-a-source-api-endpoints-is-ga-in-production) | December 10, 2025 |
| [Anything-as-a-Source for groups and group memberships API is GA in Production](#anything-as-a-source-for-groups-and-group-memberships-api-is-ga-in-production) | December 10, 2025 |
| [Okta account management policy protection for password expiry flows is GA in Production](#okta-account-management-policy-protection-for-password-expiry-flows-is-ga-in-production) | July 2, 2025 |
| [New password complexity property is GA in Preview](#new-password-complexity-property-is-ga-in-preview) | June 4, 2025 |
| [Developer documentation updates in 2026.01.0](#developer-documentation-updates-in-2026-01-0) | January 7, 2026 |
| [Bugs fixed in 2026.01.0](#bugs-fixed-in-2026-01-0)| January 7, 2026 |

#### Native to Web SSO is self-service EA in Preview

Native to Web SSO creates a seamless, unified authentication experience when a user transitions from an OIDC app (like a native or web app) to a web app (either OIDC or SAML). This feature uses standard, web-based federation protocols like SAML and OpenID Connect that help bridge the gap between two different application environments, using a single-use, one-way interclient trust SSO token. This eliminates repeating already provided sign-on assurances, and simplifies development by reducing authentication complexity. <!-- NATIVE_TO_WEB_ONE_TIME_TOKEN_EXCHANGE OKTA-1065285 -->

#### Bring your own telephony credentials is self-service EA in Preview

You can now connect your own telephony provider using a new simplified setup that doesn't require you to use a telephony inline hook. You can handle usage billing directly with your provider. Okta currently supports Twilio and Telesign.

To configure your own telephony credentials, you can use the [Custom Telephony Provider API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CustomTelephonyProvider/) or you can use the [Admin Console](https://help.okta.com/okta_help.htm?type=oie&id=configure-telephony-providers).
<!--  OKTA-1075267 CUSTOM_TELEPHONY_PROVIDERS-->

#### Client update policy is EA in Preview

The Policies API now supports the `CLIENT_POLICY` type, enabling you to enforce or defer app updates across different device platforms. This lets you programmatically align app versions with internal change management processes. See the [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/listPolicies) and [Release controls policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-ov-release-controls). <!-- OKTA_VERIFY_RELEASE_CONTROL_POLICY OKTA-1036332 January 7, 2026 -->

#### Encryption of ID tokens and access tokens is GA in Production

You can now encrypt OIDC ID tokens for Okta-protected custom app integrations using JSON Web Encryption. You can also now encrypt access tokens minted by a custom authorization server. See [Key management](/docs/guides/key-management/main/). <!-- OIDC_TOKEN_ENCRYPTION OKTA-978457 -->

#### Unified claims generation for custom apps is GA in Production

Unified claims generation is a new streamlined interface for managing claims (OIDC) and attribute statements (SAML) for Okta-protected custom app integrations. In addition to group and user profile claims, the following new claim types are available: `entitlements` (required OIG), `device.profile`, `session.id`, and `session.amr`. See [Okta Expression Language in Identity Engine](/docs/reference/okta-expression-language-in-identity-engine/).

<!-- GENERIC_FEDERATED_CLAIM_LAYER OKTA-971830 -->

#### Custom FIDO2 AAGUID is GA in Preview

You can now use the [Authenticators API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/) to create, view, and update custom Authenticator Attestation Global Unique Identifiers (AAGUIDs).

Admins can add non-FIDO Metadata Service (MDS) security keys and other authenticators and have more granular control over them. This extends FIDO2 (WebAuthn) authenticator support to a wider range of security keys and other authenticators, which gives admins greater flexibility and control over the security in their environment.

#### Improvements to the global session policy MFA requirements is GA in Production

The Policy API now correctly enforces MFA requirements for every sign-in attempt when **New Device** is included as a behavior and MFA is required in a global session policy. See the [Policy API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule!path=3/actions/signon/factorPromptMode&t=request).

<!-- OKTA-1070041 DISALLOW_INVALID_BEHAVIOR_AND_FACTOR_MODE_COMBINATION_FOR_GSP, preview date: Dec 10, 2025 -->

#### Additional Anything-as-a-Source API endpoints is GA in Production

Anything-as-a-Source (XaaS) capabilities allow customers to use a custom identity source with Okta. With XaaS, customers can source entities such as users into Okta Universal Directory by connecting a custom HR app or a custom database. This release offers Anything-as-a-Source APIs for both individual operations and bulk operations on groups, group memberships, and users. Okta now enables creating and updating users, creating and updating groups, and managing group memberships into Okta Universal Directory from any identity source using the Identity Source APIs. See [Identity Sources](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/).

<!-- OKTA-1063549 IDENTITY_SOURCE_MANAGE_INDIVIDUAL_ENTITIES -->

#### Anything-as-a-Source for groups and group memberships API is GA in Production

Anything-as-a-Source (XaaS) capabilities allow customers to use a custom identity source with Okta. With XaaS, customers can source entities such as users into Okta Universal Directory by connecting a custom HR app or a custom database. This release offers XaaS capabilities with groups and group memberships, allowing customers to start sourcing groups with XaaS. Okta now enables creating and updating users, creating and updating groups, and managing group memberships into Okta Universal Directory from any identity source using the Identity Source APIs. See [Identity Sources](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/).

<!-- IDENTITY_SOURCE_APPS_GROUPS OKTA-1009858 -->

#### Okta account management policy protection for password expiry flows is GA in Production

This feature improves the security posture of customer orgs by protecting the password expiry flow with the Okta account management policy. Password expiry flows now require the assurance defined in an org's Okta account management policy.

You can now use the [`metadata`](/docs/reference/okta-expression-language-in-identity-engine/#okta-account-management) component in an Expression Language condition for an Okta account management policy. You can only use `metadata` in an expression that's related to password expiry. See [Enable password expiry](https://help.okta.com/okta_help.htm?type=oie&id=oamp-enable-password-expiry)

<!-- OKTA-853468 AMP_FOR_PASSWORD_EXPIRY preview org: july 2, 2025 -->

#### New password complexity property is GA in Preview

You can now use the `oelStatement` property to block words from being used in passwords. This feature enhances security by allowing you to customize your password strength requirements. See the [Policy API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=3/settings/password/complexity/oelStatement&t=request).

<!-- OKTA-849300 PASSWORD_POLICY_OEL_STATEMENT Preview date: June 4, 2025-->

#### Developer documentation updates in 2026.01.0

* The new [Express Configuration customer configuration guide template](/docs/guides/express-config-guide-template/main/) is available to help Express Configuration partners create accurate configuration guides for their customers. This resource provides standardized instructions for setting up apps that use Express Configuration, covering functionalities such as SSO, Universal Logout, and SCIM provisioning.
* The rate limits documentation has been revised and updated on the References tab. New updates include detailed explanations on rate limit buckets, as well as more information on how to increase your rate limits. See the [Rate Limits overview](/docs/reference/rate-limits/).
* The Okta API release notes now provide an RSS feed for each API release note category: [Classic Engine](/docs/release-notes/2026/), [Identity Engine](/docs/release-notes/2026-okta-identity-engine/), [Identity Governance](/docs/release-notes/2026-okta-identity-governance/), [Privileged Access](/docs/release-notes/2026-okta-privileged-access/), [Access Gateway](/docs/release-notes/2026-okta-access-gateway/), and [Aerial](/docs/release-notes/2026-okta-aerial/). Click the RSS icon to subscribe.

#### Bugs fixed in 2026.01.0

* The following attributes weren't properly being gated as reserved attributes: `orgid`, `activationstatus`, `apistatus`, `logintype`, `initialreconcilecomplete`, `activationdate`, `statuschangeddate`, `apilastupdate`, `passwordexpirationguess`, `passwordexpirationcursor`, `numunlocks`, `changedstatus`. See [Review reserved attributes](https://help.okta.com/okta_help.htm?type=oie&id=reserved-attributes). (OKTA-1049339)

* An error sometimes occurred when an admin attempted to update the username for an app user. (OKTA-1047716)
