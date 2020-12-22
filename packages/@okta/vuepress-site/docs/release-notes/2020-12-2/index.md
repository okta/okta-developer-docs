---
title: Okta API Products Release Notes
---

## 2020.12.2

| Change                                            | Expected in Preview Orgs |
| ------------------------------------------------- | ------------------------ |
| [The Subscription API is now available in Self-Service EA](#the-subscription-api-is-now-available-in-self-service-ea) | December 22, 2020        |
| [Bugs Fixed in 2020.12.2](#bugs-fixed-in-2020-12-2) | December 22, 2020         |

### The Subscription API is now available in Self-Service EA

The `/subscription` API is now available in Self-Service EA. The [Subscriptions API](/docs/reference/api/admin-notifications/) provides operations to manage email subscription settings for Okta administrator notifications. <!--OKTA-325794-->

### Bugs fixed in 2020.12.2

* Clients making GET requests to `/api/v1/users/{usernameprefix}` received a "The requested path was not found" error if the user's [short name](/docs/reference/api/users/#get-user-with-login-shortname) (usernameprefix) ended with .jpg, .png, .js, .css, or a similar file extension even if a user matching that short name existed. (OKTA-322140)
* When an [MFA policy](/docs/reference/api/policy/#multifactor-mfa-enrollment-policy) was created without specifying the `consent` format, subsequent GET and UPDATE requests resulted in an error. (OKTA-339250)
* When a GET request was made to '/api/v1/users/${userId}/groups' (to obtain a list of a user's groups), an internal server error was returned when the user making the API call didn't have access to any of the [groups](/docs/reference/api/users/#get-user-s-groups) returned in the current page of results. (OKTA-351477)