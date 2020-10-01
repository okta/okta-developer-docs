---
title: Okta API Products Release Notes
---

## 2016.30

### New Features

#### Create Custom Apps with the API

<!-- OKTA-83462 -->
You can now create SAML and SWA custom apps using the Apps API. Previously you had to create a custom app
using the [**App Integration Wizard**](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard-saml)
in the administrator UI.

For more information about creating custom apps with the API, see [Apps API: Add Custom SAML Application](/docs/reference/api/apps/#add-custom-saml-application).

### Feature Enhancements

#### User-Matching Improvement for SAML Identity Providers (IdPs)

<!-- OKTA-93061 -->
For SAML IdPs, you can now match transformed IdP usernames using more attributes.
To match on an attribute other than username, email, or either, specify the attribute name in the property `matchAttribute`,
and specify the value `CUSTOM_ATTRIBUTE` in `matchType`.

For more information, see [Identity Providers](/docs/reference/api/idps/#subject-policy-object).

> Contact [Support](https://support.okta.com/help/open_case) to enable this Early Access feature.

#### Okta Sign-In Widget Release 1.5.0

<!-- OKTA-96356 -->
The Okta Sign-In Widget release 1.5.0 contains the following enhancements:

* Passcodes for RSA and On-Prem MFA are masked.
* The dependencies `@okta/i18n` and `@okta/courage` are optional, to allow `npm install` to work properly.
* The **Show Answer** checkbox has been replaced with a simpler **Show/Hide** toggle button in the **Answer** field. The **Show Answer** checkbox displays when a security question is a factor.

### Bugs Fixed

* When configuring an app with OpenID Connect, some redirect URIs weren't saved correctly. (OKTA-90445)
* Problems occurred in some orgs when deleting a very large group using the API. (OKTA-91383)
