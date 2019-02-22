---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2016.34
---

## 2016.35

### Feature Enhancements
 
#### Improvements to Endpoint sessions/me
<!-- OKTA-95047 -->
* The parameter `createdAt` is returned in results.
* If authentication is done using a social IdP or SAML, `lastPasswordVerification` isn't updated.
* The parameter `lastPasswordVerification` is only updated when the password is verified.

#### New Version of Okta Sign-In Widget 

The new version of Okta Sign-In Widget, 1.6.0, is available:

* Okta Sign-In Widget supports two new factors: Windows Hello and U2F.
* The Widget is localized for Czech.
* Translations are shipped with the `npm` module.

Learn about these and other improvements at [the Git site](https://github.com/okta/okta-signin-widget/releases/tag/okta-signin-widget-1.6.0).
