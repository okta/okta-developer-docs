---
title: Okta API Products Release Notes
---

## 2020.03.0

| Change                                              | Expected in Preview Orgs |
|-----------------------------------------------------|--------------------------|
| [Email as a factor and supported optional enrollment is Generally Available in Preview](#email-as-a-factor-and-supported-optional-enrollment-is-generally-available-in-preview)| March 4, 2020 |
| [The Third-Party admin role is Generally Available in Preview](#the-third-party-admin-role-is-generally-available-in-preview)| March 4, 2020 |
| [OAuth for Okta is Generally Available in Preview](#oauth-for-okta-is-generally-available-in-preview)| March 4, 2020 |
| [Pagination is available for the List Authorization Servers operation](#pagination-is-available-for-the-list-authorization-servers-operation)| March 4, 2020 |
| [Sign-in attempt behavior evaulation is now logged when there is no client information](#sign-in-attempt-behavior-evaluation-is-now-logged-when-there-is-no-client-information)| March 4, 2020 |
| [OAuth for Okta enabled for Schemas and Linked Objects APIs](#oauth-for-okta-enabled-for-schemas-and-linked-objects-apis)| March 4, 2020 |
| [Bugs fixed in 2020.03.0](#bugs-fixed-in-2020-03-0) | March 4, 2020        |

### Email as a factor and supported optional enrollment is Generally Available in Preview

The Okta [email factor](/docs/reference/api/authn/#enroll-okta-email-factor) for MFA is now Generally Available in Preview. When the email factor is enabled, end users receive a code in an email message to use when they sign in. <!-- OKTA-278974 -->

The email factor configuration also supports optional enrollment, which is now Generally Available for all orgs that already have the factor enabled as part of Early Access. <!-- OKTA-274318 -->

### The Third-Party admin role is Generally Available in Preview

The [Third-Party admin role](https://help.okta.com/en/prod/okta_help_CSH.htm#csh_admin-third) is now Generally Available in Preview. <!-- OKTA-280640 -->

### OAuth for Okta is Generally Available in Preview

[OAuth for Okta](/docs/guides/implement-oauth-for-okta/overview/) is now Generally Available in Preview. At this time, OAuth for Okta works only with the APIs listed in the [Scopes & supported endpoints](/docs/guides/implement-oauth-for-okta/scopes/) section. We are actively working towards supporting additional APIs. Our goal is to cover all Okta public API endpoints.<!-- OKTA-276783 -->

### Pagination is available for the List Authorization Servers operation

Pagination is now available for the [List Authorization Servers operation](/docs/reference/api/authorization-servers/#list-authorization-servers). <!-- OKTA-277098 -->

### Sign-in attempt behavior evaluation is now logged when there is no client information

Sign-in attempt behavior evaluation is logged in the `debugContext` object of the `user.session.start` and `policy.evaluate.sign_on` events, even when client information is missing for all behaviors. <!-- OKTA-280132 -->

### OAuth for Okta enabled for Schemas and Linked Objects APIs

The Schemas API and the Linked Objects API now have OAuth for Okta enabled. See [Scopes & supported endpoints](/docs/guides/implement-oauth-for-okta/scopes/). <!-- OKTA-278008 OKTA-277204-->

### Bugs fixed in 2020.03.0

* Users could acquire logs before the Logs retention period using specific `after` parameters. (OKTA-277912)
* App admins were able to modify all profiles in the Profile Editor even when the admin was limited to only administer certain apps. (OKTA-267829)
