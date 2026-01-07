---
title: Okta Identity Engine API release notes 2026
---

<ApiLifecycle access="ie" />

# Okta Identity Engine API release notes (2026)

<a href="/rss/identity-engine.xml">
  <img src="/img/icons/Feed-icon.svg" alt="RSS" width="20" height="20" />
  Subscribe to RSS
</a>

## January

### Monthly release 2026.01.0
<!-- Published on: 2026-01-08T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Native to Web SSO is EA](#native-to-web-sso-is-ea) | January 7, 2026 |
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

#### Native to Web SSO is EA

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

The Policy API now correctly enforces MFA requirements for every sign-in when **New Device** is included as a behavior and MFA is required in a global session policy. See the [Policy API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule!path=3/actions/signon/factorPromptMode&t=request).

<!-- OKTA-1070041 DISALLOW_INVALID_BEHAVIOR_AND_FACTOR_MODE_COMBINATION_FOR_GSP, preview date: Dec 10, 2025 -->

#### Additional Anything-as-a-Source API endpoints is GA in Production

Anything-as-a-Source (XaaS) capabilities allow customers to use a custom identity source with Okta. With XaaS, customers can source entities such as users into Okta's Universal Directory by connecting a custom HR app or a custom database. This release offers Anything-as-a-Source APIs for both individual operations and bulk operations on groups, group memberships, and users. Okta now enables creating and updating users, creating and updating groups, and managing group memberships into Okta’s Universal Directory from any identity source using the Identity Source APIs. See [Identity Sources](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/).

<!-- OKTA-1063549 IDENTITY_SOURCE_MANAGE_INDIVIDUAL_ENTITIES -->

#### Anything-as-a-Source for groups and group memberships API is GA in Production

Anything-as-a-Source (XaaS) capabilities allow customers to use a custom identity source with Okta. With XaaS, customers can source entities such as users into Okta's Universal Directory by connecting a custom HR app or a custom database. This release offers XaaS capabilities with groups and group memberships, allowing customers to start sourcing groups with XaaS. Okta now enables creating and updating users, creating and updating groups, and managing group memberships into Okta’s Universal Directory from any identity source using the Identity Source APIs. See [Identity Sources](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/).

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
