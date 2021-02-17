---
title: Okta API Products Release Notes
---

## 2018.11

| Change | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| :---------- | :--------------------------------- | :----------------------------------------------------------- |
| [API Support for IdP-initiated Authentication](#api-support-for-idp-initiated-authentication) | March 14 | March 19 |
| [New Powershell Module for TLS 1.2 Compatibility](#new-powershell-module-for-tls-12-compatibility) | Available Now | Available Now |
| [Rate Limit for System Log Increased](#rate-limit-for-system-log-increased) | Available Now | Available Now |
| [New Version of Okta Sign-in Widget](#new-version-of-okta-sign-in-widget) | Available Now | Available Now |
| [System Log API Is in Early Access (EA)](#system-log-api-is-in-early-access-ea) | Available Now | Available Now |
| [Password Imports with Salted SHA-256 Algorithm is in Early Access (EA)](#password-imports-with-salted-sha-256-algorithm-is-in-early-access-ea) | Available Now | Available Now |
| [Bugs Fixed for 2018.11](#bugs-fixed-for-2018-11) | March 14, 2018 | March 19, 2018 |

### API Support for IdP-initiated Authentication

Use this feature to allow a client to specify the application right away during an authentication request, instead of taking the user through "step-up" authentication in a separate request. [Documentation](/docs/reference/api/authn/#sp-initiated-step-up-authentication) <!-- OKTA-160275 -->

### New Powershell Module for TLS 1.2 Compatibility

The new version of Okta's Powershell module is compatible with TLS 1.2. [Documentation](https://www.powershellgallery.com/packages/Okta.Core.Automation/1.0.1)<!-- OKTA-161239 -->

### Rate Limit for System Log Increased

The rate limit for GET requests to `/api/v1/logs` has been increased from 60 per minute to 120. [Documentation](/docs/reference/rate-limits/#okta-api-endpoints-and-per-minute-limits)

### New Version of Okta Sign-in Widget

Version 2.7.0 of the Okta Sign-in Widget provides new features, notable changes, and bug fixes. For details, visit [the `okta-signin-widget` repository](https://github.com/okta/okta-signin-widget/releases).

### Bugs Fixed for 2018.11

* An incorrect error message was returned when a blank password was specified in a password reset request. (OKTA-144982)
* If administrators in an org with the Admin Console enabled used the Classic user interface instead, and had no apps assigned, they couldn't access their own user home page. (OKTA-152324)
* For [the System Log API](/docs/reference/api/system-log/), the `displayName` in the Target object was set to `Unknown` if the `eventType` was `user.authentication.sso` and if the value didn't exist in the profile editor.
This behavior matches the behavior in `/events`. (OKTA-156484)
