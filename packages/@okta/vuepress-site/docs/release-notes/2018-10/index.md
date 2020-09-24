---
title: Okta API Products Release Notes
---

## 2018.10

| Change | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| :---------- | :--------------------------------- | :----------------------------------------------------------- |
| [API Access Management is Generally Available (GA) in Production](#api-access-management-is-generally-available-ga-in-production) | Available now   | March 12, 2018  |
| [System Log API Is in Early Access (EA)](#system-log-api-is-in-early-access-ea) | March 7, 2018 | March 12, 2018 |
| [Password Imports with Salted SHA-256 Algorithm is in Early Access (EA)](#password-imports-with-salted-sha-256-algorithm-is-in-early-access-ea) | March 7, 2018 | March 12, 2018 |
| [New Parameter for Authentication with Okta Verify with Auto-Push](#new-parameter-for-authentication-with-okta-verify-with-auto-push)   | March 7, 2018 | March 12, 2018 |
| [System Log Changes for 2018.10](#system-log-changes-for-2018-10) | March 7, 2018 | March 12, 2018 |
| [Bugs Fixed for 2018.10](#bugs-fixed-for-2018-10) | March 7, 2018 | March 12, 2018 |

### API Access Management is Generally Available (GA) in Production

Secure your APIs with API Access Management, Okta's implementation of the OAuth 2.0 authorization framework. API Access Management uses the Okta Identity platform to enable powerful control over access to your APIs. API Access Management can be controlled through the administrator UI as well as a rich set of APIs for client, user, and policy management.

Generally Available (GA) in preview orgs since February 7, 2018, API Access Management is scheduled to be GA in production orgs starting March 12, 2018.

For more information, see [OAuth 2.0 and Okta](/docs/reference/api/oidc/). <!--OKTA-153127-->

### System Log API is in Early Access (EA)

The Okta System Log records system events related to your organization in order to provide an audit trail that can be used to understand platform activity and to diagnose problems.

The Okta System Log API provides near real-time read-only access to your organization's system log and is the programmatic counterpart of the [System Log UI](https://help.okta.com/en/prod/okta_help_CSH.htm#Reports_System_Log).

Often the terms "event" and "log event" are used interchangeably. In the context of this API, an "event" is an occurrence of interest within the system and "log" or "log event" is the recorded fact.

Notes:

* The System Log API contains much more [structured data](/docs/reference/api/system-log/#logevent-object) than [the Events API](/docs/reference/api/events/#event-model).
* The System Log API supports [additional SCIM filters](/docs/reference/api/system-log/#request-parameters) and the `q` query parameter, because of the presence of more structured data than [the Events API](/docs/reference/api/events/#event-model). <!-- OKTA-160902 OKTA-160880 -->

### Password Imports with Salted SHA-256 Algorithm is in Early Access (EA)

You can use the salted SHA-256 hash type when [importing passwords](/docs/reference/api/users/#create-user-with-imported-hashed-password). <!-- OKTA-160288 -->

### New Parameter for Authentication with Okta Verify with Auto-Push

We have added [an optional URL parameter, `autoPush` ](/docs/reference/api/authn/#request-parameters-for-verify-push-factor) that allows Okta to store the user's Auto-Push preference when verifying Okta Verify with Auto-Push. This parameter is only necessary when implementing custom login flows that do not use the Okta Sign-In Widget. <!-- OKTA-155563 -->

### System Log Changes for 2018.10

* If a query to `/logs` timed out, an HTTP 504 error was returned. Now an HTTP 500 error will be returned. This aligns `/logs` error responses with other Okta APIs, and ensures implementation details are not leaked to API consumers. (OKTA-159642)
* The following changes to error codes related to the system log were made to make them consistent with [Okta error codes](/docs/reference/error-codes/):
    * `MEDIA_TYPE_NOT_ACCEPTED_EXCEPTION` replaced by `UNSUPPORTED_MEDIA_TYPE`
    * `OPP_INVALID_PAGINATION_PROPERTIES` replaced by `INVALID_PAGING_EXCEPTION`
    * `OPP_INVALID_SCIM_FILTER` replaced by `INVALID_SEARCH_CRITERIA_EXCEPTION` <!-- OKTA-149847 -->

### Bugs Fixed for 2018.10

* GET requests to list 200 or more apps were taking a long time to complete. (OKTA-158391)
* Invalid IP addresses in the `X-Forwarded-For` header caused a null pointer exception (HTTP 500 `NullPointerException`) during primary authentication. (OKTA-159414)
* [List User with Search requests](/docs/reference/api/users/#list-users-with-search) in preview orgs failed to return pagination links. (OKTA-160424)
