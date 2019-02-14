---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2017.30
---

## 2017.31

### Platform Feature Enhancements

| Feature Enhancement                                                               | Expected in Preview Orgs        | Expected in Production Orgs             |
|:----------------------------------------------------------------------------------|:--------------------------------|:----------------------------------------|
| [OpenID Connect](#openid-connect)                                                 | Generally Available now         | Generally Available beginning 8/7/2017  |
| [Key Rollover](#key-rollover)                                                     | Generally Available now         | Generally Available beginning 8/7/2017  |
| [Email for Two-Factor Authentication](#email-for-two-factor-authentication)       | Early Access by 8/3/2017        | Early Access beginning 8/7/2017         |
| [SHA-256 Signed Certificates for New SAML 2.0 Apps](#sha-256-signed-certificates-for-new-saml-20-apps) | Generally Available by 8/3/2017 | Generally Available beginning 9/11/2017 |

To enable an Early Availability (EA) feature, contact [Support](https://support.okta.com/help/open_case). For more information, see [Okta Release Lifecycle](/docs/api/getting_started/releases-at-okta).

> A [new version of the Sign-In Widget](#new-version-of-the-sign-in-widget) is available now for all orgs.

#### OpenID Connect
<!-- OKTA-132049  -->

[OpenID Connect](/docs/api/resources/oidc) is a simple identity layer on top of the OAuth 2.0 protocol, which allows computing clients to verify the identity of an end user based on the authentication performed by an authorization server, as well as to obtain basic profile information about the end user in an interoperable and REST-like manner. In technical terms, OpenID Connect specifies a RESTful HTTP API, using JSON as a data format.

OpenID Connect allows a range of clients, including Web-based, mobile, and JavaScript clients, to request and receive information about authenticated sessions and end users. The specification suite is extensible, supporting optional features such as encryption of identity data, discovery of OpenID Providers, and session management.

Okta is [certified for OpenID Connect](http://openid.net/certification/). For more information, see [OpenID Connect and Okta](/docs/api/resources/oidc).

#### Key Rollover
<!-- OKTA-132045  -->

We provide the ability to generate a certificate with a specified validity period for the [Apps API](/docs/api/resources/apps) and [Identity Providers API](/docs/api/resources/idps).

#### SHA-256 Signed Certificates for New SAML 2.0 Apps

All new SAML 2.0 apps are bootstrapped with SHA-256 signed public certificates. Existing SAML 2.0 apps are unchanged.

#### Email for Two-Factor Authentication
<!-- OKTA-134593  -->

You can enroll a user with an email factor. See [Enroll Okta Email Factor](/docs/api/resources/factors#enroll-okta-email-factor) for details.

### New Version of the Sign-In Widget
<!-- (OKTA-132800) -->

Version 2.1.0 of the Okta Sign-In Widget is available on [GitHub](https://github.com/okta/okta-signin-widget/releases/tag/okta-signin-widget-2.1.0) or [NPM](https://www.npmjs.com/package/@okta/okta-signin-widget). Check out the new features and bug fixes!
