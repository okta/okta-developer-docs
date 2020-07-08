---
title: Okta API Products Release Notes
---

## 2020.07.0

| Change                                                                                                                                                              | Expected in Preview Orgs |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| [Apple as an Identity Provider is now GA in Preview](#ddddddd)                                                                                     | July 9, 2020             |
| [YubiKey OTP Token operations added](#ddddddd)                               | July 9, 2020             |
| [Support for creating OIN OIDC Apps via the Dynamic Client Registration API](#ddddddd)   | July 9, 2020             |
| [API support for multiple ACS URLs](#ddddddd)                                 | July 9, 2020             |
| [Bugs fixed in 2020.07.0](#ddddddd)                                                                                                                 | July 9, 2020             |

### Apple as an Identity Provider is now GA in Preview

Apple as an Identity Provider is now Generally Available in Preview. Apple as an IdP allows users to sign in to your app using their Apple ID. See [Apple as an Identity Provider](/docs/guides/add-an-external-idp/apple/before-you-begin/). <!-- OKTA-302300 -->

### YubiKey OTP Token operations added

Using the [Factors API](/docs/reference/api/factors/), requests for single YubiKey OTP Tokens, and uploading a seed for a YubiKey OTP are now supported. Other API operations for YubiKey OTP Tokens are now documented in the [Factors API](/docs/reference/api/factors/). <!-- OKTA-302434 -->

### Support for creating OIN OIDC Apps via the Dynamic Client Registration API

Creating OIN OIDC Apps via the [Dynamic Client Registration API](/docs/reference/api/oauth-clients/) is now supported. <!-- OKTA-289900 -->

### API support for multiple ACS URLs

When [creating a custom SAML app](/docs/reference/api/apps/#add-custom-saml-application) using the [Apps API](/docs/reference/api/apps/), you can now pass 2 optional parameters (`allowMultipleAcsEndpoints` and `acsEndpoints`) to configure up to 100 Assertion Consumer Service (ACS) URLs. <!-- OKTA-302291 -->

### Bugs fixed in 2020.07.0

* In certain situations, the [Identity Providers API](/docs/reference/api/idps/) returned the wrong X509 SSO endpoint. (OKTA-310023)
