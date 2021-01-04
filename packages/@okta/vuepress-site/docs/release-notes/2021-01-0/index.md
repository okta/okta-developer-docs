---
title: Okta API Products Release Notes
---

## 2021.01.0

| Change                                                                                              | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------|--------------------------|
| [Group object source property is now GA in Production](#group-object-source-property-is-now-ga-in-production) | January 7, 2021         |
| [System Log Event Types for Rate Limiting](#system-log-event-types-for-rate-limiting) | January 7, 2021          |
| [New Apps API Endpoints in Early Access (EA)](#new-apps-api-endpoints-in-early-access-ea) | January 7, 2021         |
| [AuthType LDAP_INTERFACE for Policy API Now in Early Access (EA)](#authtype-ldap-interface-for-policy-api-now-in-early-access-ea) | January 7, 2021   |
| [Developers can now use SWA for testing SCIM app integrations](#developers-can-now-use-swa-for-testing-scim-app-integrations)      | January 7, 2021          |
| [The Subscription API is now available in Self-Service Early Access (EA)](/#the-subscription-api-is-now-available-in-self-service-early-access-ea) | January 7, 2021          |
| [New settings for phone hard rate limit](/#new-settings-for-phone-hard-rate-limit) | January 7, 2021          |
| [Trusted Origins API now supports RP ID for WebAuthn](#trusted-origins-api-now-supports-rp-id-for-webauthn) | January 7, 2021         |
| [Bug fixed in 2021.01.0](/#bug-fixed-in-2021-01-0) | January 7, 2021         |

### Group object source property is now GA in Production

For [Groups API](/docs/reference/api/groups/) requests that return a Group or a list of Groups, the Group object, of type APP_GROUP, includes a `source` property that provides the ID of the source application for the returned Group. This property is now GA in Production. See [Group attributes](/docs/reference/api/groups/#group-attributes).<!--OKTA-326611-->

### System Log Event Types for Rate Limiting

The System Log Event Types for rate limiting are now available for review at the following reference page: [System Log events for rate limits](/docs/reference/rl-system-log-events/). These event types assist administrators understand platform activity and to diagnose problems due to exceeded rate limits.<!--OKTA-352182-->

### New Apps API Endpoints in Early Access (EA)

The [Apps API](/docs/reference/api/apps/) now includes additional Early Access endpoints for provisioning connections and features:

- [Application logo operations](/docs/reference/api/apps/#application-logo-operations)
- [Application Provisioning Connection operations](/docs/reference/api/apps/#application-provisioning-connection-operations)
- [Application Features operations](/docs/reference/api/apps/#application-feature-operations)
- [Provisioning Connection object](/docs/reference/api/apps/#provisioning-connection-object)
- [Provisioning Connection Profile object](/docs/reference/api/apps/#provisioning-connection-profile-object)
- [Application Feature object](/docs/reference/api/apps/#application-feature-object)

These updates improve the ability of administrators to configure and provision multiple orgs, previously available only through the Admin Console.<!--OKTA-331852-->

### AuthType LDAP_INTERFACE for Policy API Now in Early Access (EA)

The [Policy API](/docs/reference/api/policy/) now includes the data type [LDAP_INTERFACE](/docs/reference/api/policy/#authcontext-condition-object) for use with the AuthContext Condition object, which provides another option for user authentication.<!--OKTA-343973-->

### Developers can now use SWA for testing SCIM app integrations

ISVs and developers who want to create and submit a SCIM-only app integration to the OIN can now use SWA as the sign-in method for SCIM app testing.<!--OKTA-352742-->

### The Subscription API is now available in Self-Service Early Access (EA)

The [Subscription API](/docs/reference/api/admin-notifications/) is now available in Self-Service EA. The subscriptions API provides operations to manage email subscription settings for Okta administrator notifications.<!--OKTA-325794-->

### New settings for phone hard rate limit

When users attempt to enroll SMS or Voice-Call factors for authorization, a new setting determines the hard rate limit on enrollment attempts. By default, the user has two attempts per minute.<!--OKTA-355134-->

### Trusted Origins API now supports RP ID for WebAuthn

The [Trusted Origins API](/docs/reference/api/trusted-origins/) now includes support for Relying Party Identifiers (RP ID) on the WebAuthn feature. Trusted Origins are configured in the Okta Trusted Origins framework either through the Admin UI or the API. These Trusted Origins, configured with the CORS scope, now support orgs using WebAuthn for sign-in pages hosted at Trusted Origins distinct from the org's Okta URL (that is, different from the org's Okta or custom domain URL).<!--OKTA-352629-->

### Bug fixed in 2021.01.0

When calling the API endpoint `/oauth2/v1/revoke`, the call continued checking for the 	`XSRFToken` even though the authorization does not require the cookie.
