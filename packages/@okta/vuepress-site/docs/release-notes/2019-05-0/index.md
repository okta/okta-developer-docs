---
title: Okta API Products Change Log
---

## 2019.05.0

| Change                                                                                                       | Expected in Preview Orgs |
|--------------------------------------------------------------------------------------------------------------|--------------------------|
| [The Registration Inline Hook is in Early Access (EA)](#the-registration-inline-hook-is-in-early-access-ea) | May 8, 2019              |
| [Bugs Fixed in 2019.05.0](#bugs-fixed-in-2019-05-0)                                                          | May 8, 2019              |

### The Registration Inline Hook is in Early Access (EA)

The [Registration Inline Hook](/use_cases/inline_hooks/registration_hook/registration_hook) allows you to integrate your own custom logic into Okta's Self-Service Registration flow. <!-- (OKTA-215773) -->

### Bugs Fixed in 2019.05.0

* Assigning an admin role directly to a user failed if that user was part of a group with the same admin role assignment. (OKTA-223035)
* The [List Users with Search](/docs/api/resources/users/#list-users-with-search) API returned outdated user data. (OKTA-215187)

