---
title: Okta API Products Release Notes
---

## 2020.11.0

| Change                                                                                              | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------|--------------------------|
| [Inclusive language and terminology](#inclusive-language-and-terminology) | November 4, 2020         |
| [System Logs API adds additional filter expressions](#system-logs-api-adds-additional-filter-expressions) | November 4, 2020         |
| [Zones API includes `usage` property](#zones-api-includes-usage-property) | November 4, 2020         |
| [Client-based rate limiting is now GA in Production](#client-based-rate-limiting-is-now-ga-in-production) | (See entry)         |
| [User Consent for OAuth 2.0 and OpenID Connect Flows is rolling out to GA in Production](#user-consent-for-oauth-2-0-and-openid-connect-flows-is-rolling-out-to-ga-in-production) | (See entry) |
| [Account linking for SAML IdPs is now GA in Preview](#account-linking-for-saml-idps-is-now-ga-in-preview) | November 4, 2020         |
| [Group object `source` property is now GA in Preview](#group-object-source-property-is-now-ga-in-preview) | November 4, 2020         |
| [MyAccount API is now in Early Access (EA)](#myaccount-api-is-now-in-early-access-ea) | November 4, 2020         |
| [Bug Fixed in 2020.11.0](#bug-fixed-in-2020-11-0) | November 4, 2020        |

### Inclusive language and terminology

Okta is focused on the adoption of inclusive language and communication. Some long-standing industry terminology and expressions have been updated in this release. More updates will be made in future releases.

The descriptive information returned on both the invalid redirect URI and invalid logout URI error pages has been updated to remove the term "whitelisted". <!--OKTA-336922-->

### System Logs API adds additional filter expressions

The [System Log API](/docs/reference/api/system-log/) `/logs` endpoint can now use the SCIM filter expression operators: `ew` (ends with), `ne` (not equal), and `not` (not function). <!--OKTA-188737-->

### Zones API includes `usage` property

To help you manage zones in your organization, the Early Access [Zones API](/docs/reference/api/zones/) now includes the `usage` attribute. There are two types of zones: Policy Network Zones and Block List Network Zones. <!--OKTA-333653-->

### Client-based rate limiting is now GA in Production

[Client-based rate limiting](/docs/reference/rl-clientbased/) for the `/authorize` endpoint is now available in production orgs. It provides granular isolation between requests made to the `/authorize` endpoint by using a combination of the Client ID, user's IP address, and Okta device identifier. This isolates rogue OAuth clients and bad actors, ensuring valid users and applications don't run into rate limit violations.

This feature will be available to orgs in Okta Production cells on November 9, 2020. <!--OKTA-342520-->

### User Consent for OAuth 2.0 and OpenID Connect Flows is rolling out to GA in Production

A consent represents a user's explicit permission to allow an application to access resources protected by scopes. As part of an OAuth 2.0 or OpenID Connect authentication flow, you can prompt the user with a page to approve your app's access to specified resources. See the [consent property for scopes](/docs/reference/api/authorization-servers/#scope-properties).

This feature will be gradually made available to orgs in Okta Production cells beginning on November 11, 2020.

### Account linking for SAML IdPs is now GA in Preview

Admins can now enable or disable automatic account linking between SAML Identity Providers and Okta using the [Identity Provider API](/docs/reference/api/idps/). They can also restrict account linking based on whether the end user is a member of any specified groups. <!--OKTA-334818-->

### Group object `source` property is now GA in Preview

For API requests that return a Group or a list of Groups, the Group object includes a `source` property that provides the ID of the source application for the returned Group. This property is now GA in all Preview orgs. See [Group attributes](/docs/reference/api/groups/#group-attributes). <!--OKTA-326610-->

### MyAccount API is now in Early Access (EA)

The [MyAccount API](/docs/reference/api/myaccount/) enables non-administrator end users to fetch their Okta user profiles. To enable this EA feature, contact [Support](https://support.okta.com/help/open_case). <!--OKTA-342090-->

### Bug fixed in 2020.11.0

When the `expiresAt` property value of the [Authentication transaction object](/docs/reference/api/authn/#authentication-transaction-object) was returned with an `/authn` [response](/docs/reference/api/authn/) that also included the `sessionToken` [parameter](/docs/reference/api/authn/#session-token) (not `stateToken`), the value incorrectly indicated a 3-minute lifetime. (OKTA-319907)
