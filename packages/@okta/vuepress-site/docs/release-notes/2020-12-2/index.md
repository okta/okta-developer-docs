---
title: Okta API Products Release Notes
---

## 2020.12.2

| Change                                            | Expected in Preview Orgs |
| ------------------------------------------------- | ------------------------ |
| [Manage email subscription settings using the Subscriptions API](#manage-email-subscription-settings-using-the-subscriptions-api) | December 22, 2020        |
| [Bugs Fixed in 2020.12.2](#bugs-fixed-in-2020-12-2) | December 22, 2020         |

### Manage email subscription settings using the Subscriptions API

The `/subscriptions` API is now available in Self-Service EA. The [Subscriptions API](/docs/reference/api/admin-notifications/) provides operations to manage email subscription settings for Okta administrator notifications. <!--OKTA-325794-->

### Bugs fixed in 2020.12.2

* Clients making GET requests to `/api/v1/users/{usernameprefix}` received an error if the user's [short name](/docs/reference/api/users/#get-user-with-login-shortname) (`usernameprefix`) ended with `.jpg`, `.png`, `.js`, `.css`, or a similar file extension, even when a user matching that short name existed. (OKTA-322140)
* When an [MFA policy](/docs/reference/api/policy/#multifactor-mfa-enrollment-policy) was created without specifying the `consent` format, subsequent GET and UPDATE requests resulted in an error. (OKTA-339250)
