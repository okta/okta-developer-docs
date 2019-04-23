---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta API since Release 2017.33
---

## 2017.34

The following API feature enhancements and bug fixes are available in the 2017.34 release.
Dates for preview and production release are the earliest possible release date. Always check your org to verify the release version.

### API Feature Enhancements

| Feature Enhancement                                                           | Expected in Preview Orgs            | Expected in Production Orgs |
|:------------------------------------------------------------------------------|:------------------------------------|:----------------------------|
| [New Developer Dashboard](#new-developer-dashboard)                           | Available now in new developer orgs | N/A                         |
| [Zones API is an Early Access Release](#zones-api-is-an-early-access-release) | August 22, 2017                     | September 5, 2017           |

#### New Developer Dashboard

The new developer dashboard is available in all new developer orgs in preview:

![New Developer Dashboard](/img/release_notes/dev-dashboard.png "New Developer Dashboard")

Use the developer dashboard to access quick-start guides for your favorite language and view recent system log events.
You can also create an OpenID Connect app more easily with this simplified flow:

![New Developer Dashboard](/img/release_notes/new-oidc-app-dashboard.png "New Developer Dashboard")

#### Zones API is an Early Access Release
<!-- OKTA-129115 -->

Zones are used to group IP Address ranges so that policy decisions can be made based on the client's IP location.

[The Zones API](/docs/api/resources/zones) is an <ApiLifecycle access="ea" /> release. Contact [Support](https://support.okta.com/help/open_case) to enable it.
This API can be enabled beginning August 22, 2017 for preview orgs, and beginning September 5, 2017 for production orgs.

### API Bug Fixes

Bug fixes are expected on preview orgs starting August 22, 2017, and on production orgs starting Sept 5, 2017.

* OpenID Connect and OAuth 2.0 client apps with an `application_type` of `native` or `browser` incorrectly allowed the `client_credentials` grant type. This fix adheres to the [OAuth 2.0 spec](https://tools.ietf.org/html/rfc6749#section-1.3.4). (OKTA-135853)
* Requests to `GET /api/v1/apps/${applicationId}/groups?expand=group%2Cmetadata` caused an error in orgs with the Application Entitlements Policy enabled. (OKTA-135969)
* The `AssertionConsumerServiceURL` attribute in a SAML authentication requests matched one of the configured SSO URLs but an error was returned. (OKTA-137555)
