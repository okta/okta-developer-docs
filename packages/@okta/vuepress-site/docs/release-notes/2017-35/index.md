---
title: Okta API Products Release Notes
excerpt: Summary of changes to the Okta API since Release 2017.34
---

## 2017.35

The following platform feature enhancements and bug fixes are available in the 2017.35 release.
Dates for preview and production release are the earliest possible release date. Always check your org to verify the release version.

### API Feature Enhancements

| Feature Enhancement                                                           | Expected in Preview Orgs            | Expected in Production Orgs |
|:------------------------------------------------------------------------------|:------------------------------------|:----------------------------|
| [Zones API is an Early Access Release](#zones-api-is-an-early-access-release) | August 22, 2017                     | September 5, 2017           |

#### Zones API is an Early Access Release
<!-- OKTA-129115 -->

Zones are used to group IP Address ranges so that policy decisions can be made based on the client's IP location.

[The Zones API](/docs/api/resources/zones) is an <ApiLifecycle access="ea" /> release. Contact [Support](https://support.okta.com/help/open_case) to enable it.
This API can be enabled beginning August 22, 2017 for preview orgs, and beginning September 5, 2017 for production orgs.

### API Bug Fix

This bug fix is expected on preview orgs starting August 31, 2017, and on production orgs starting Sept 5, 2017.

* Some requests to update a user via [`/api/v1/users/${userId}`](/docs/api/resources/users/#update-user) failed with a 500 Internal Server Error. (OKTA-138214)
