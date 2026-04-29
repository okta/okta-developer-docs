---
title: Okta Classic Engine API release notes 2026
---

# Okta Classic Engine API release notes (2026)

<a href="/rss/classic.xml">
  <img src="/img/icons/Feed-icon.svg" alt="RSS" width="20" height="20" />
  Subscribe to RSS
</a>

## April

### Weekly release 2026.04.3
<!-- Published on: 2026-04-29T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bug fixed in 2026.04.3](#bug-fixed-in-2026-04-3)| April 29, 2026 |

#### Bug fixed in 2026.04.3

If you included `strict=true` as a query parameter in the Update a user [endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/user/other/updateuser) to update a user’s Active Directory (AD) password, an HTTP 200 OK response was returned even if the update failed in AD. (OKTA-1145080)

### Weekly release 2026.04.1
<!-- Published on: 2026-04-08T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bug fixed in 2026.04.1](#bug-fixed-in-2026-04-1)| April 8, 2026 |

#### Bug fixed in 2026.04.1

The `AuthnRequestId` field in the System Log wasn't included for authorization code flow and device code flow token request events. (OKTA-1082636)

### Monthly release 2026.04.0
<!-- Published on: 2026-04-02T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Slack integration for Identity Governance](#slack-integration-for-identity-governance) | February 18, 2026 |
| [Custom admin permissions for inline and event hooks is GA in Production](#custom-admin-permissions-for-inline-and-event-hooks-is-ga-in-production) | December 10, 2025 |
| [Increase to the maximum access duration limit ](#increase-to-the-maximum-access-duration-limit) | April 1, 2026 |
| [Developer documentation update in 2026.04.0](#developer-documentation-update-in-2026-04-0) | April 1, 2026 |
| [Bug fixed in 2026.04.0](#bug-fixed-in-2026-04-0)| April 1, 2026 |

#### Slack integration for Identity Governance

Okta for Government Moderate and Government High customers who use commercial Slack instances can now integrate Slack with their org to streamline access management in Access Requests and Access Certifications. Users can now submit and approve requests in Slack, as well as receive Slack notifications for access requests and certification campaigns. Feature availability varies depending on whether the Unified requester experience feature is enabled. See [Okta Identity Governance Limitations for Public Sector Service](https://support.okta.com/help/s/article/okta-identity-governance-compatibility-limitations-for-public-sector-service?language=en_US ) and [Integrate Slack](https://help.okta.com/okta_help.htm?type=oie&id=csh-ar-integrate-slack).

The following APIs support governance Slack integration settings and are available as Beta:

* Org Slack integration setting: **Org Governance Settings** > [Create an org integration](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/org-governance-settings/createorgintegration)
* Access Certification Slack integration setting: **Org Governance Settings** > [Update the org certification settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/org-governance-settings/updateorgcertificationsettings)
* Access Request Slack integration setting: **Access Request - V2** > **Request Settings** > [Update the org request settings](https://developer.okta.com/docs/api/iga/openapi/governance-production-requests-admin-v2-reference/request-settings/updateorgrequestsettingsv2) <!-- OKTA-1138055 preview date: February 18, 2026 -->

#### Custom admin permissions for inline and event hooks is GA in Production

The inline hook and event hook framework now supports read and write permissions for custom admin roles. This enhancement gives fine-grained access to manage inline and event hooks that previously required the super admin role. See [Hooks admin roles](https://developer.okta.com/docs/guides/hooks-best-practices/#hook-admin-roles). <!-- OKTA-1133787 HOOKS_PUBLIC_PERMISSIONS preview date: December 10, 2025 -->

#### Increase to the maximum access duration limit

When you create or edit access request conditions, you can now set `accessDurationSettings.duration` or `accessDurationSettings.maximumDuration` to a maximum of 365 days or 52 weeks. <!-- OKTA-1081978 preview date: April 1, 2026-->

#### Developer documentation update in 2026.04.0

The contents of the SCIM FAQ doc have been added to the new [SCIM integration concepts and requirements](/docs/concepts/scim/faqs/) doc.

#### Bug fixed in 2026.04.0

When an admin added users to read-only groups using the Groups API (`PUT /api/v1/groups/{groupId}/users/{userId}`), the endpoint incorrectly returned HTTP 501 (Not Implemented) instead of HTTP 403 (Forbidden). (OKTA-1139611)

## March

### Weekly release 2026.03.3
<!-- Published on: 2026-03-25T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2026.03.3](#bugs-fixed-in-2026-03-3) | March 25, 2026 |

* For realm resources, the List all resource set resources API (`api/v1/iam/resource-sets/{resourceSetIdOrLabel}/resources`) returned a `null` value for the `_links.self` parameter. (OKTA-1135761)

#### Bugs fixed in 2026.03.3

### Weekly release 2026.03.2
<!-- Published on: 2026-03-18T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2026.03.2](#bugs-fixed-in-2026-03-2) | March 18, 2026 |

#### Bugs fixed in 2026.03.2

* The Agent Pools API returned a generic illegal argument exception when invalid parameters were provided. (OKTA-1112681)

* Agent Pool update requests didn't verify that the provided pool ID was a valid app instance ID. (OKTA-890681)

* An [update a user schema](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/schema/other/updateuserprofile) request failed with a timeout error when it included a large number of identity providers. (OKTA-1010509)

### Weekly release 2026.03.1
<!-- Published on: 2026-03-11T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2026.03.1](#bug-fixed-in-2026-03-1)| March 11, 2026 |

#### Bug fixed in 2026.03.1

Some of the custom advanced sign-on settings for integrations created using the [Application API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/application/other/createapplication) weren't correctly reflected on the app instance page. (OKTA-1109692)

### Monthly release 2026.03.0
<!-- Published on: 2026-03-04T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Self-Service for Enhanced Disaster Recovery is self-service EA in Preview](#self-service-for-enhanced-disaster-recovery-is-self-service-ea-in-preview) | March 4, 2026 |
| [Submit API service integrations](#submit-api-service-integrations) | March 4, 2026 |
| [Admin Console Home page](#admin-console-home-page) | March 4, 2026 |
| [New Directories Integration endpoints to view extended Active Directory group attributes is GA in Preview](#new-directories-integration-endpoints-to-view-extended-active-directory-group-attributes-is-ga-in-preview) | March 4, 2026 |
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

#### Enable custom admin permissions for inline and event hooks is GA in preview

The inline hook and event hook framework now supports read and write permissions for custom admin roles. This enhancement gives fine-grained access to manage inline and event hooks that previously required the super admin role. See [Hooks admin roles](/docs/guides/hooks-best-practices/).
<!-- OKTA-1113869 preview date: December 10, 2025  -->

#### Developer documentation updates in 2026.03.0

* Okta's [API reference pages](https://developer.okta.com/docs/api/) are undergoing a migration, which started on February 24. While the look and feel may vary across pages during this time, all technical documentation remains accurate and up to date.
* You can no longer submit API service integrations through the OIN Manager, so the instructions have been removed from the [OIN Manager](/docs/guides/submit-app/wfconnector/main/) guide. To submit an API service integration, use the [OIN Wizard](/docs/guides/submit-oin-app/uapiservice/main/).
* A new guide is available for Okta Enhanced Disaster Recovery, a feature that gives admins direct control over business continuity. Learn how to:
  * Initiate failover and restoration (failback) using the self-service portal or APIs.
  * Validate system resilience by safely testing recovery capabilities.
  * Automate failover processes to minimize downtime during an outage.

  See [Manage org recovery with Okta Enhanced Disaster Recovery](/docs/guides/manage-orgs-okta-edr/).

#### Bug fixed in 2026.03.0

In some orgs, password reset emails didn't allow users to reset their password. (OKTA-1120290)

## February

### Weekly release 2026.02.2
<!-- Published on: 2026-02-20T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2026.02.2](#bug-fixed-in-2026-02-2)| February 19, 2026 |

#### Bug fixed in 2026.02.2

Invalid device enrollments sometimes caused the Firebase Cloud Messaging (FCM) push notification service to stop for all users. (OKTA-1013806)

### Monthly release 2026.02.0
<!-- Published on: 2026-02-05T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Lightweight Directory Access Protocol Bidirectional Group Management is GA in Production](#lightweight-directory-access-protocol-bidirectional-group-management) | December 5, 2025 |
| [Developer documentation updates in 2026.02.0](#developer-documentation-updates-in-2026-02-0) | February 4, 2026 |
| [Bugs fixed in 2026.02.0](#bugs-fixed-in-2026-02-0)| |

#### Lightweight Directory Access Protocol Bidirectional Group Management

The [Bidirectional Group Management API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DirectoriesIntegration) has been expanded to allow you to manage Lightweight Directory Access Protocol (LDAP) groups from within Okta. You can add or remove users from groups based on their identity and access requirements. This ensures that changes made to user access in Okta are reflected in LDAP.

Okta can only manage group memberships for users and groups imported into Okta using the LDAP or Active Directory (AD) integration. It isn't possible to manage users and groups that weren't imported through LDAP or AD integration or are outside the organizational unit's scope for the integration using this feature.

#### Developer documentation updates in 2026.02.0

* All references to deprecated API Postman collections are now removed from [Home | Okta Developer](https://developer.okta.com/) and replaced with references to the [Okta Public API Collections](https://www.postman.com/okta-eng/okta-public-api-collections/overview) workspace.
* The new [Universal Directory](/docs/concepts/universal-directory/) concept provides a comprehensive overview of Okta's Universal Directory (UD). UD is the centralized data layer that serves as the foundation for the entire Okta platform. This new doc replaces the previous User Profiles concept and goes into more depth on its components and advantages.
* The Okta developer portal search results now include the API references.

#### Bugs fixed in 2026.02.0

* When users requested metadata for a non-existent identity provider, the system attempted to trigger an undefined error code. This caused a secondary exception in the Splunk logs. (OKTA-504955)
* When no-cache, no-store headers from `/oauth2/<authorizationServerId>/v1/keys` were returned, it caused an unnecessarily high number of requests to `/oauth2/<authorizationServerId>/v1/keys`. (OKTA-1099636)
* Scopes that were skipped during granular consent were still included in the access token after grants were created. (OKTA-1045702)

## January

### Weekly release 2026.01.2
<!-- Published on: 2026-01-29T12:00:00Z -->
| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2026.01.2](#bug-fixed-in-2026-01-2)| January 28, 2026 |

#### Bug fixed in 2026.01.2

When you call the List all Groups API ([`/api/v1/groups`](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/#tag/Group/operation/listGroups)) with the `expand=stats` query parameter, the response returned inaccurate data for the `_embedded.stats.hasAdminPrivileges` field for groups with assigned custom roles. (OKTA-1094903)

### Weekly release 2026.01.1
<!-- Published on: 2026-01-14T12:00:00Z -->
| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2026.01.1](#bugs-fixed-in-2026-01-1)| January 14, 2026 |

#### Bugs fixed in 2026.01.1

* The `agentType` parameter wasn't required in the `POST /api/v1/agentPools` endpoint and an exception didn't occur if that parameter was missing. (OKTA-1071106)

* After provisioning a group from Active Directory or reactivating a user in an Okta group ([Reactivate a user API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserLifecycle/#tag/UserLifecycle/operation/reactivateUser)), Okta assigned an admin role to the user through group rules but didn't create a System Log event for the assignment. (OKTA-1071233)

### Monthly release 2026.01.0
<!-- Published on: 2026-01-08T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Encryption of ID tokens and access tokens is GA in Production](#encryption-of-id-tokens-and-access-tokens-is-ga-in-production) | August 7, 2025 |
| [Unified claims generation for custom apps is GA in Production](#unified-claims-generation-for-custom-apps-is-ga-in-production) | July 30, 2025 |
| [Additional Anything-as-a-Source API endpoints is GA in Production](#additional-anything-as-a-source-api-endpoints-is-ga-in-production) | December 10, 2025 |
| [Anything-as-a-Source for groups and group memberships API is GA in Production](#anything-as-a-source-for-groups-and-group-memberships-api-is-ga-in-production) | December 10, 2025 |
| [Developer documentation updates in 2026.01.0](#developer-documentation-updates-in-2026-01-0) | January 7, 2026 |
| [Bugs fixed in 2026.01.0](#bugs-fixed-in-2026-01-0)| January 8, 2025 |

#### Encryption of ID tokens and access tokens is GA in Production

You can now encrypt OIDC ID tokens for Okta-protected custom app integrations using JSON Web Encryption. You can also now encrypt access tokens minted by a custom authorization server. See [Key management](/docs/guides/key-management/main/). <!-- OIDC_TOKEN_ENCRYPTION OKTA-978457 -->

#### Unified claims generation for custom apps is GA in Production

Unified claims generation is a new streamlined interface for managing claims (OIDC) and attribute statements (SAML) for Okta-protected custom app integrations. In addition to group and user profile claims, the following new claim types are available: `entitlements` (required OIG), `device.profile`, `session.id`, and `session.amr`. See [Okta Expression Language in Identity Engine](/docs/reference/okta-expression-language-in-identity-engine/). <!-- GENERIC_FEDERATED_CLAIM_LAYER OKTA-971830 -->

#### Additional Anything-as-a-Source API endpoints is GA in Production

Anything-as-a-Source (XaaS) capabilities allow customers to use a custom identity source with Okta. With XaaS, customers can source entities such as users into Okta Universal Directory by connecting a custom HR app or a custom database. This release offers Anything-as-a-Source APIs for both individual operations and bulk operations on groups, group memberships, and users. Okta now enables creating and updating users, creating and updating groups, and managing group memberships into Okta Universal Directory from any identity source using the Identity Source APIs. See [Identity Sources](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/).

<!-- OKTA-1063549 IDENTITY_SOURCE_MANAGE_INDIVIDUAL_ENTITIES Preview date: December 10, 2025-->

#### Anything-as-a-Source for groups and group memberships API is GA in Production

Anything-as-a-Source (XaaS) capabilities allow customers to use a custom identity source with Okta. With XaaS, customers can source entities such as users into Okta Universal Directory by connecting a custom HR app or a custom database. This release offers XaaS capabilities with groups and group memberships, allowing customers to start sourcing groups with XaaS. Okta now enables creating and updating users, creating and updating groups, and managing group memberships into Okta Universal Directory from any identity source using the Identity Source APIs. See [Identity Sources](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/).

<!-- IDENTITY_SOURCE_APPS_GROUPS OKTA-1009858 Preview date: December 10, 2025-->

#### Developer documentation updates in 2026.01.0

* The rate limits documentation has been revised and updated on the References tab. New updates include detailed explanations on rate limit buckets, as well as more information on how to increase your rate limits. See the [Rate Limits overview](/docs/reference/rate-limits/).
* The Okta API release notes now provide an RSS feed for each API release note category: [Classic Engine](/docs/release-notes/2026/), [Identity Engine](/docs/release-notes/2026-okta-identity-engine/), [Identity Governance](/docs/release-notes/2026-okta-identity-governance/), [Privileged Access](/docs/release-notes/2026-okta-privileged-access/), [Access Gateway](/docs/release-notes/2026-okta-access-gateway/), and [Aerial](/docs/release-notes/2026-okta-aerial/). Click the RSS icon to subscribe.

#### Bugs fixed in 2026.01.0

* The following attributes weren't properly being gated as reserved attributes: `orgid`, `activationstatus`, `apistatus`, `logintype`, `initialreconcilecomplete`, `activationdate`, `statuschangeddate`, `apilastupdate`, `passwordexpirationguess`, `passwordexpirationcursor`, `numunlocks`, `changedstatus`. See [Review reserved attributes](https://help.okta.com/okta_help.htm?type=oie&id=reserved-attributes). (OKTA-1049339)

* An error sometimes occurred when an admin attempted to update the username for an app user. (OKTA-1047716)
