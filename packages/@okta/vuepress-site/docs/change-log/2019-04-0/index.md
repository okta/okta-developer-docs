---
title: Okta API Products Change Log
---

## 2019.04.0

| Change                                      | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------------------------|--------------------------|
| [IdP Extensible Matching Rules are now GA in Preview](#idp-extensible-matching-rules-are-now-ga-in-preview)| April 10, 2019  |
| [The SAML Inline Hook is in EA](#the-saml-inline-hook-is-in-ea)           | April 10, 2019  |
| [Rate Limits Updated](#rate-limits-updated)                               | April 10, 2019  |
| [The Sign-In Widget Version for the Custom Login Page has been Updated](#the-sign-in-widget-version-for-the-custom-login-page-has-been-updated)    | April 10, 2019  |
| [Bug Fixed in 2019.04.0](#bug-fixed-in-2019-04-0)                         | April 10, 2019  |

### IdP Extensible Matching Rules are now GA in Preview

IdP extensible matching rules allow you to define a regular expression pattern to filter untrusted IdP usernames. For details, see our [IdPs](https://developer.okta.com/docs/api/resources/idps/#subject-policy-object) page. <!-- OKTA-177544 -->

### The SAML Inline Hook is in EA

The SAML Inline Hook enables you to customize SAML assertions returned by Okta. For details, see our [SAML Inline Hook](https://developer.okta.com/use_cases/inline_hooks/saml_hooks/saml_hook) page. <!-- OKTA-211665 and OKTA-2202004 -->

### Rate Limits Updated

Okta's API rate limits have been updated:

* OAuth 2 rate limits were updated and clarified for all orgs.
* The limit for the `api/v1/apps endpoint` was updated for Enterprise orgs. For details, see our [Rate Limits](https://developer.okta.com/docs/api/getting_started/rate-limits/#okta-api-endpoints-and-per-minute-limits) page. <!-- OKTA-217272 & OKTA-217213 -->

### The Sign-In Widget Version for the Custom Login Page has been Updated

Custom Sign-in Pages can now use Sign-In Widget version 2.18. When you select the "latest" option, you automatically use 2.18. For more information, see our [Sign-In Widget](https://developer.okta.com/code/javascript/okta_sign-in_widget/) page. <!-- OKTA-2206539 -->

### Bug Fixed in 2019.04.0

IdPs did not match the user with the `USERNAME_OR_EMAIL` property when `IDP_EXTENSIBLE_MATCHING_RULES` was enabled. For details, see our [IdPs](https://developer.okta.com/docs/api/resources/idps/#subject-policy-object) page. (OKTA-218007)