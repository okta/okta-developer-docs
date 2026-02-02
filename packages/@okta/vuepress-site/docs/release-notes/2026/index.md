---
title: Okta Classic Engine API release notes 2026
---

# Okta Classic Engine API release notes (2026)

<a href="/rss/classic.xml">
  <img src="/img/icons/Feed-icon.svg" alt="RSS" width="20" height="20" />
  Subscribe to RSS
</a>

## February

### Monthly release 2026.02.0
<!-- Published on: 2026-02-05T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Linux as a platform condition](#linux-as-a-platform-condition) | February 6, 2026 |
| [Skip counts for authenticator enrollment grace periods](#skip-counts-for-authenticator-enrollment-grace-periods) | February 6, 2026 |
| [Grace period for device assurance is GA in Preview](#grace-period-for-device-assurance-is-ga-in-preview) | Octorber 9, 2026 |
| [Dynamic OS version compliance for device assurance is GA in Preview](#dynamic-os-version-compliance-for-device-assurance-is-ga-in-preview) | February 7, 2026 |
| [Lightweight Directory Access Protocol Bidirectional Group Management](#lightweight-directory-access-protocol-bidirectional-group-management) | |
| [Okta MCP server](#okta-mcp-server) | February 6 2026 |
| [Bugs fixed in 2026.02.0](#bugs-fixed-in-2026020)| |

#### Linux as a platform condition

Okta now supports `LINUX` as a device platform condition in the following policy types and policy rules:

* App sign-in policies (`ACCESS_POLICY` rules)
* Okta account management policy rules (Rules for the Okta account management `ACCESS_POLICY`)
* Identity provider routing rules (`IDP_DISCOVERY` rules)
<!-- OKTA-1093354 LINUX_SUPPORT_FOR_POLICIES preview date: Feb 6, 2026 link: See the [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule!path=0/conditions/platform/exclude/os/type&t=request). -->

### Skip counts for authenticator enrollment grace periods

This feature allows admins to define a number of skips end users can defer enrollment into an authenticator, as well as customizations to the prompt when end users see the grace period. See [Grace periods](/docs/concepts/policies/#grace-periods).

<!-- OKTA-1044803 FF: ENROLLMENT_POLICY_GRACE_PERIOD_V2 preview date: Feb 6, 2026 -->

### Grace period for device assurance is GA in Preview

Occasionally, users’ devices might fall out of compliance with security policies due to temporary conditions such as missed software updates or unapproved network connections. Without a grace period, they would be immediately blocked from accessing critical resources, which disrupts productivity and causes frustration. The grace period for device assurance feature allows you to define a temporary window during which non-compliant devices can still access resources. This gives users time to remediate issues without being locked out, balancing productivity with security standards.

See [Device Assurance Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/createDeviceAssurancePolicy!path=0/gracePeriod&t=request) and the [Add a device assurance policy guide](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-assurance-add). <!-- DEVICE_ASSURANCE_GRACE_PERIOD OKTA-803140 Preview date: October 9, 2024 -- >

### Dynamic OS version compliance for device assurance is GA in Preview

You can configure OS version compliance by using device assurance. However, you have to manually update the policies every time a new OS version or patch is released. With **Dynamic OS version compliance**, Okta updates device assurance policies with the latest OS versions and patches, eliminating the need for manual updates. With this feature you can ensure OS version compliance in your org without tracking OS releases. See [Dynamic OS version compliance](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-assurance-add) and [Device Assurance Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/createDeviceAssurancePolicy!path=1/osVersion&t=request). <!-- DEVICE_ASSURANCE_DYNAMIC_OS_SUPPORT OKTA-651282 Preview date: February 7, 2024 -->

### Lightweight Directory Access Protocol Bidirectional Group Management

The [Bidirectional Group Management API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DirectoriesIntegration) has been expanded to allow you to manage Lightweight Directory Access Protocol (LDAP) groups from within Okta. You can add or remove users from groups based on their identity and access requirements. This ensures that changes made to user access in Okta are reflected in LDAP.

Okta can only manage group memberships for users and groups imported into Okta using the LDAP or Active Directory (AD) integration. It isn't possible to manage users and groups that weren't imported through LDAP or AD integration or are outside the organizational unit's scope for the integration using this feature.

### Okta MCP server

The Okta Model Context Protocol (MCP) server is a secure protocol abstraction layer that enables AI agents/Large Language Models (LLMs) to interact with Okta org. MCP clients can now communicate with Okta’s scoped management APIs in natural language. This simplifies building context-aware AI workflows while ensuring strict access control and least-privilege security.

### Bugs fixed in 2026.02.0

When users requested metadata for a non-existent identity provider, the system attempted to trigger an undefined error code. This caused a secondary exception in the Splunk logs. (OKTA-504955)

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
