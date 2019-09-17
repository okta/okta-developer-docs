---
title: Okta API Products Release Notes
---

## 2019.02.0

> **Note:** Okta has changed our release model and version numbering. For more information, see here: <https://support.okta.com/help/s/article/New-Okta-Release-Model>

| Change                                                                                                                  | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Imported Hashed User Passwords Generally Available](#imported-hashed-user-passwords-generally-available)               | February 6, 2019         | March 11, 2019                               |
| [Inline Hooks](#inline-hooks)                                                                                           | February 6, 2019         | February 19, 2019                            |
| [Token Inline Hook](#token-inline-hook)                                                                                 | February 6, 2019         | February 19, 2019                            |
| [Signature and Digest Algorithms for Template WS-FED Apps](#signature-and-digest-algorithms-for-template-ws-fed-apps)   | February 6, 2019         | February 19, 2019                            |
| [Google Integration Updated](#google-integration-updated)                                                               | February 6, 2019         | February 19, 2019                            |
| [High Capacity Rate Limits](#high-capacity-rate-limits)                                                                 | February 6, 2019         | February 19, 2019                            |
| [Creation of LinkedIn IdPs Temporarily Disabled](#creation-of-linkedin-idps-temporarily-disabled)                       | February 14, 2019        | February 19, 2019                            |
| [Bug Fixed in 2019.02.0](#bug-fixed-in-2019-02-0)                                                                         | February 6, 2018         | February 19, 2019                            |
| [Previously Released Early Access Features 2019.02.0 Update](#previously-released-early-access-features-2019-02-0-update) | Available Now            | Available Now                                |

### Imported Hashed User Passwords Generally Available

Use of imported hashed passwords when creating or updating users in the [Users API](/docs/reference/api/users) is now Generally Available (GA). <!--OKTA-205592-->

### Inline Hooks

[Inline Hooks](/docs/concepts/inline-hooks/) enable you to integrate your own custom functionality into Okta process flows. The framework to support them is now in Early Access (EA/). <!--OKTA-205011-->

### Token Inline Hook

The [Token Inline Hook](/docs/reference/token-hook/) enables you to integrate your own custom functionality into the process of minting OAuth 2.0 and OpenID Connect tokens. <!--OKTA-206634-->

### Signature and Digest Algorithms for Template WS-Fed Apps

Template WS-Fed applications can now choose between SHA1 and SHA256 options for their Signature and Digest Algorithms. In addition, all Template WS-Fed applications will have X.509 certs signed with SHA256. <!--OKTA-202447-->

### Google Integration Updated

Okta's [Google social login integration](/docs/guides/add-an-external-idp/google/before-you-begin/) has been updated to account for the deprecation of the Google+ API. More information can be found in our [Knowledge Base](https://support.okta.com/help/Documentation/Knowledge_Article/Google-API-Deprecation-and-Okta/).

### High Capacity Rate Limits

A new High Capacity Rate Limit SKU is now available.  The impacted endpoints and their rate limits can be found on our [Rate Limits page](/docs/reference/rate-limits/). <!--OKTA-203819-->

### Creation of LinkedIn IdPs Temporarily Disabled

We have disabled the creation of new LinkedIn identity providers until further notice due to the upcoming LinkedIn API V1 deprecation.

### Bug Fixed in 2019.02.0

* There was a typo in the error text returned when a property was set to a 4-byte UTF-8 character (such as an emoji) in a field that does not allow such characters. <!--OKTA-145565-->

### Previously Released Early Access Features 2019.02.0 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
