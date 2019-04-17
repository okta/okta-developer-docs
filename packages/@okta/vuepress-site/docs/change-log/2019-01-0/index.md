---
title: Okta API Products Change Log
---

## 2019.01.0

> NOTE: Okta has changed our release model and version numbering. Under the old system, this would have been release `2019.1`. For more information, see here: <https://support.okta.com/help/s/article/New-Okta-Release-Model>

| Change                                                                                                                | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Social Authentication Generally Available](#social-authentication-generally-available)                               | January 9, 2019          | January 14, 2019                             |
| [IdP Discovery Generally Available](#idp-discovery-generally-available)                                               | January 9, 2019          | January 14, 2019                             |
| [Relay State Format Now Configurable for SAML IdPs](#relay-state-format-now-configurable-for-saml-idps)               | January 9, 2019          | January 14, 2019                             |
| [No Events API Access for New Orgs](#no-events-api-access-for-new-orgs)                                               | January 9, 2019          | January 14, 2019                             |
| [Updated Office 365 Legacy Rate Limit](#updated-office-365-legacy-rate-limit)                                         | January 9, 2019          | January 14, 2019                             |
| [Bug Fixed in 2019.01.0](#bug-fixed-in-2019-01-0)                                                                       | January 9, 2018         | January 14, 2019
| [Previously Released Early Access Features 2019.01.0 Update](#previously-released-early-access-features-2019-01-0-update) | Available Now            | Available Now                                |

### Social Authentication Generally Available

[Social Authentication](/authentication-guide/social-login/) is now Generally Available (GA). <!--OKTA-199632-->

### IdP Discovery Generally Available

[IdP Discovery](/docs/api/resources/policy/#IdPDiscoveryPolicy) is now Generally Available (GA) as part of the Policy API. <!--OKTA-202887-->

### Relay State Format Now Configurable for SAML IdPs

The Protocol Object now contains a [Relay State object](/docs/api/resources/idps/#saml-20-relay-state-object) that allows an admin to configure the Relay State format on the SAML IdP. <!--OKTA-188092-->

### No Events API Access for New Orgs

As part of the deprecation process, new orgs created from this release onwards will not have access to the Events API.  <!--OKTA-203283-->

### Updated Office 365 Legacy Rate Limit

The default [legacy rate limit](/docs/api/getting_started/rate-limits#home-page-endpoint-limits-legacy-orgs) for the `/app/office365/{key}/sso/wsfed/active` endpoint has been lowered from 2000 to 1000. <!--OKTA-201807-->

### Bug Fixed in 2019.01.0

* Some orgs were unable to create the number of users that they were entitled to. (OKTA-203819)

### Previously Released Early Access Features 2019.01.0 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
