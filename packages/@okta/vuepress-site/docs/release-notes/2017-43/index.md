---
title: Okta API Products Release Notes
excerpt: Changes to Admin Console and an improved error string
---

## 2017.43

### API Bug Fixes

These bug fixes are expected on preview orgs starting October 25, 2017, and on production orgs starting November 8, 2017.

* The default ports in the App Wizard in the Admin Console have been changed from `3000` to `8080`. (OKTA-144916)
* An error string was unclear. The string is returned when a session times out while waiting for a user to enter MFA credentials during an OpenID Connect `/authorize` call. (OKTA-143916)
