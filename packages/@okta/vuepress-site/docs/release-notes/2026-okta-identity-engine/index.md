---
title: Okta Identity Engine API release notes 2026
---

<ApiLifecycle access="ie" />

# Okta Identity Engine API release notes (2026)

<a href="/rss/identity-engine.xml">
  <img src="/img/icons/Feed-icon.svg" alt="RSS" width="20" height="20" />
  Subscribe to RSS
</a>

## February

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

Occasionally, users’ devices might fall out of compliance with security policies due to temporary conditions such as missed software updates or unapproved network connections. Without a grace period, they would be immediately blocked from accessing critical resources, which disrupts productivity and causes frustration. The grace period for device assurance feature allows you to define a temporary window during which non-compliant devices can still access resources. This gives users time to remediate issues without being locked out, balancing productivity with security standards.

See [Device Assurance Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/createDeviceAssurancePolicy!path=0/gracePeriod&t=request) and the [Add a device assurance policy guide](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-assurance-add). <!-- DEVICE_ASSURANCE_GRACE_PERIOD OKTA-803140 Preview date: October 9, 2024 -->

#### Lightweight directory access protocol bidirectional group management is GA in Production

The [Bidirectional Group Management API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DirectoriesIntegration) has been expanded to allow you to manage Lightweight Directory Access Protocol (LDAP) groups from within Okta. You can add or remove users from groups based on their identity and access requirements. This ensures that changes made to user access in Okta are reflected in LDAP.

Okta can only manage group memberships for users and groups imported into Okta using the LDAP or Active Directory (AD) integration. It isn't possible to manage users and groups that weren't imported through LDAP or AD integration or are outside the organizational unit's scope for the integration using this feature.

#### Detection settings in session protection is GA in Preview

Tailor ITP to your org’s security priorities to gain control and balance security with a seamless user experience. With new detection settings, you can define which session context changes trigger policy re-evaluations, helping you focus only on what truly matters. See [Session protection](https://help.okta.com/okta_help.htm?type=oie&id=csh-continuous-access-evaluation).

#### Passkeys rebrand is self-service EA in Preview

The FIDO2 (WebAuthn) authenticator is being rebranded to Passkeys (FIDO2 WebAuthn). The FIDO2 (WebAuthn) authenticator is being rebranded to Passkeys (FIDO2 WebAuthn) and Okta is introducing enhanced administrative controls and a streamlined user experience. This update centralizes passkey management through a consolidated settings page, allows for customized authenticator naming, and introduces a dedicated **Sign in with a passkey** button within the Sign-In Widget. These enhancements simplify the authentication journey and provide users with a more intuitive sign-in process with the **Sign in with a passkey** button.

For more information about the new settings and updates, see [Configure the FIDO2 (WebAuthn) authenticator](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-webauthn) and [`settings`](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/replaceAuthenticatorMethod!path=8/settings&t=request).

<!-- OKTA-1012303 FF: PASSKEYS_REBRAND preview date: Feb 4, 2026 -->

#### Custom FIDO2 AAGUID is GA in Production

You can now use the [Authenticators API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/) to create, view, and update custom Authenticator Attestation Global Unique Identifiers (AAGUIDs).

Admins can add non-FIDO Metadata Service (MDS) security keys and other authenticators and have more granular control over them. This extends FIDO2 (WebAuthn) authenticator support to a wider range of security keys and other authenticators, which gives admins greater flexibility and control over the security in their environment.

<!-- OKTA-971037 WEBAUTHN_CUSTOM_AAGUID preview date: July 16, 2025 -->

#### OAuth 2.0 support for custom email providers is self-service EA in Preview

You can now configure custom email providers with OAuth 2.0 authentication. You can choose between two OAuth 2.0 client configurations to fetch access tokens and use those access tokens to authenticate with your email provider’s SMTP server. See [Custom email providers with OAuth 2.0](/docs/guides/custom-smtp/main/) to understand the new OAuth 2.0 methods.

* See [Use your own email provider](https://help.okta.com/okta_help.htm?type=oie&id=csh-email-provider-main) to configure them in the Admin Console.
* See the [Email Providers API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/EmailServer/) to configure them with APIs.

<!-- OKTA-1100448 FF: OAUTH_FOR_CUSTOM_SMTP_SERVER, preview date: Feb 4, 2026 -->

#### Okta as a fallback IdP is self-service EA in Preview

This feature redirects users to Okta to authenticate if the primary identity provider can't establish their identity. This can happen because of explicit rejections, like invalid credentials and MFA failures, or if an existing user session can't be silently verified, such as during a `prompt=none` OIDC request or `IsPassive=true` SAML request. See the [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/listPolicyRules!c=200&path=4/actions&t=response). <!-- OKTA-1091224 ALLOW_IDENTITY_PROVIDER_CHAINING Preview org date: January 28, 2026 -->

#### Developer documentation updates in 2026.02.0

* All references to deprecated API Postman collections are now removed from [Home | Okta Developer](https://developer.okta.com/) and replaced with references to the [Okta Public API Collections](https://www.postman.com/okta-eng/okta-public-api-collections/overview) workspace.
* The new [Add a sign-in form to your mobile app](https://developer.okta.com/docs/journeys/OCI-mobile/main/) journey helps you build a secure and complete sign-in experience for your mobile app, giving your users seamless access while protecting their data.
* The new [Universal Directory](/docs/concepts/universal-directory/) concept provides a comprehensive overview of Okta’s Universal Directory (UD). UD is the centralized data layer that serves as the foundation for the entire Okta platform. This new doc replaces the previous User Profiles concept and goes into more depth on its components and advantages.
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

You can now connect your own telephony provider using a new simplified setup that doesn’t require you to use a telephony inline hook. You can handle usage billing directly with your provider. Okta currently supports Twilio and Telesign.

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

You can now use the [`metadata`](/docs/reference/okta-expression-language-in-identity-engine/#okta-account-management) component in an Expression Language condition for an Okta account management policy. You can only use `metadata` in an expression that’s related to password expiry. See [Enable password expiry](https://help.okta.com/okta_help.htm?type=oie&id=oamp-enable-password-expiry)

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
