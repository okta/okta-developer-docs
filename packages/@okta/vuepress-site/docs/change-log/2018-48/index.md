---
title: Okta API Products Change Log
---

## 2018.48

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [System Log API Returns Threat Insight Attribute](#system-log-api-returns-threat-insight-attribute)                            | November 28, 2018       | December 3, 2018                             |
| [Bugs Fixed in 2018.48](#bugs-fixed-in-201848)                                                                       | November 28, 2018         | December 3, 2018                             |
| [Previously Released Early Access Features 2018.48 Update](#previously-released-early-access-features-201848-update) | Available Now            | Available Now                                |

### System Log API Returns Threat Insight Attribute

The `debugContext` object returned by the [System Log API](/docs/api/resources/system_log) can now include an `okta_threat_insight` attribute to indicate that an event has been identified as a security risk. <!--OKTA-198102-->

### Bugs Fixed in 2018.48

* Some customers could access log data outside of their allowed retention range through the [System Log API](/docs/api/resources/system_log). <!--OKTA-196313-->

* Responses from the `/oauth2/${authServerId}/.well-known/oauth-authorization-server` [endpoint](/docs/api/resources/oidc#well-knownoauth-authorization-server) did not include supported OpenID Connect response types in the content of the `response_types_supported` property. <!--OKTA-114737-->

### Previously Released Early Access Features 2018.48 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
