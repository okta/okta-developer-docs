---
title: Okta API Products Release Notes
---

## 2021.01.0

| Change                                                                                              | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------|--------------------------|
| [Group object source property is now GA in Production](#group-object-source-property-is-now-ga-in-production) | January 7, 2021         |
| [New Apps API endpoints in Early Access (EA)](#new-apps-api-endpoints-in-early-access-ea) | January 7, 2021         |
| [Developers can now use SWA for testing SCIM app integrations](#developers-can-now-use-swa-for-testing-scim-app-integrations)      | January 7, 2021          |
| [The Subscriptions API is now available in Self-Service Early Access (EA)](#the-subscriptions-api-is-now-available-in-self-service-early-access-ea) | January 7, 2021          |
| [New phone rate limits](#new-phone-rate-limits) | January 7, 2021          |
| [WebAuthn feature validation updates with Trusted Origins API](#webauthn-feature-validation-updates-with-trusted-origins-api) | January 7, 2021         |
| [Bug fixed in 2021.01.0](#bug-fixed-in-2021-01-0) | January 7, 2021         |

### Group object source property is now GA in Production

For [Groups API](/docs/reference/api/groups/) requests that return a Group or a list of Groups, the Group object type APP_GROUP includes a `source` property that provides the ID of the source application for the returned Group. This property is now GA in Production. See [Group attributes](/docs/reference/api/groups/#group-attributes).<!--OKTA-326611-->

### New Apps API endpoints in Early Access (EA)

The [Apps API](/docs/reference/api/apps/) now includes additional Early Access endpoints and objects for provisioning connections and features:

- [Application Logo operations](/docs/reference/api/apps/#application-logo-operations) (`/apps/${applicationId}/logo`)
- [Application Provisioning Connection operations](/docs/reference/api/apps/#application-provisioning-connection-operations) (`/apps/${applicationId}/connections`)
- [Application Features operations](/docs/reference/api/apps/#application-feature-operations) (`/apps/${applicationId}/features`)
- [Provisioning Connection object](/docs/reference/api/apps/#provisioning-connection-object)
- [Provisioning Connection Profile object](/docs/reference/api/apps/#provisioning-connection-profile-object)
- [Application Feature object](/docs/reference/api/apps/#application-feature-object)

These updates improve the ability of administrators to configure application logos and provisioning details, previously available only through the Admin Console.

>**Note:** Currently, only the Okta Org2Org application supports Application Provisioning Connection and Application Features operations. <!--OKTA-335123-->

### Developers can now use SWA for testing SCIM app integrations

ISVs and developers who want to create and submit a SCIM-only app integration to the OIN can now use SWA as the sign-in method for SCIM app testing.<!--OKTA-352742-->

### The Subscriptions API is now available in Self-Service Early Access (EA)

The [Subscriptions API](/docs/reference/api/admin-notifications/) is now available in Self-Service EA. The Subscriptions API provides operations to manage email subscription settings for Okta administrator notifications.<!--OKTA-325794-->

### New phone rate limits

Users who attempt Voice and SMS enrollment can now be rate limited. Voice and SMS enrollment rate-limit events are now logged in the System Log.

See [System Log events for rate limits](/docs/reference/rl-system-log-events).<!--OKTA-355134-->

### WebAuthn feature validation updates with Trusted Origins API

The WebAuthn feature now supports trusted cross-origin and cross-Relying Party Identifier (RP ID) validation when using the [Trusted Origins API](/docs/reference/api/trusted-origins/). Trusted Origins are configured in the Okta Trusted Origins framework either through the Admin Console or using the API. These Trusted Origins, configured with the CORS scope, now support orgs using WebAuthn for sign-in pages hosted at Trusted Origins distinct from the org's Okta URL (that is, different from the org's Okta or custom domain URL).
<!--OKTA-352629-->

### Bug fixed in 2021.01.0

Non-CORS requests to the OAuth 2.0 `/introspect` and `/revoke` endpoints failed when the Okta session cookie was present. (OKTA-356288)
