---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta API since Release 2017.41
---

##  2017.42

### API Feature Enhancements

#### Group Rule Evaluations Included in System Log

Group Rule evaluation failures are now exposed via the System Log API.<!-- OKTA-140086 -->

### API Bug Fixes

These bug fixes are expected on preview orgs starting October 18, 2017, and on production orgs starting October 24, 2017.

* ID tokens requested alongside access tokens or authorization codes from custom authorization servers did not include OpenID Connect claims. This caused client applications, including the Okta Sign-In Widget, to not pre-populate the username. (OKTA-143857, 2017.40 Preview Fix)
