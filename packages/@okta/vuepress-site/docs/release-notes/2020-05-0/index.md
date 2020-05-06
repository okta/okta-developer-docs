---
title: Okta API Products Release Notes
---

## 2020.05.0

| Change                                                                                                                                                              | Expected in Preview Orgs |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| [Logging of successful password import](#logging-of-successful-password-import)                                                                                     | May 6, 2020              |
| [Rate limit headers no longer returned on cached static endpoints](#rate-limit-headers-no-longer-returned-on-cached-static-endpoints)                               | May 6, 2020              |
| [OAuth for Okta enabled for Trusted Origins, Sessions, and Custom Templates APIs](#oauth-for-okta-enabled-for-trusted-origins-sessions-and-custom-templates-apis)   | May 6, 2020              |
| [Updated behavior for logging of invalid use by OAuth 2.0 Client](#updated-behavior-for-logging-of-invalid-use-by-oauth-2-0-client)                                 | May 6, 2020              |
| [Bugs fixed in 2020.05.0](#bugs-fixed-in-2020-05-0)                                                                                                                 | May 6, 2020              |

### Logging of successful password import

A System Log Event is now generated with details about the success or failure of the password import attempt when a user with an imported password has successfully signed in to Okta. <!-- OKTA-283126 -->

### Rate limit headers no longer returned on cached static endpoints

Rate limits do not apply to these OAuth public metadata endpoints, so rate limit headers will no longer be returned:

* `/oauth2/v1/keys`
* `/.well-known/openid-configuration`
* `/.well-known/oauth-authorization-server`
* `/oauth2/{authorizationServerId}/v1/keys`
* `/oauth2/{authorizationServerId}/.well-known/openid-configuration`
* `/oauth2/{authorizationServerId}/.well-known/oauth-authorization-server`
<!-- OKTA-289849 -->

### OAuth for Okta enabled for Trusted Origins, Sessions, and Custom Templates APIs

OAuth for Okta is now enabled for the Trusted Origins API, the Sessions API, and the Custom Templates API. See [Scopes & supported endpoints](/docs/guides/implement-oauth-for-okta/scopes/). <!-- OKTA-286819 -->

### Updated behavior for logging of invalid use by OAuth 2.0 Client

The [previously announced logging behavior](/docs/release-notes/2017-23/#additional-logging-for-invalid-use-by-oauth-2-0-client) has been updated. Invalid `client_secret` warnings are now triggered by 5 invalid attempts (consecutive or not) within a 24 hour period. <!-- OKTA-288030 -->

### Bugs fixed in 2020.05.0

* When logging in a federated user using the `/oauth/v1/authorize` endpoint with consent enabled and the prompt parameter set to login, the widget failed with an error. (OKTA-290760)
