---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta API since Release 2017.41
---

## 2017.41

### API Feature Enhancements

#### API Access Management Logs in Events API

<!-- OKTA-129243 -->

API Access Management now generates System Log events available via the Events API. This will be Generally Available in preview orgs starting on October 11, 2017 and in production orgs starting on October 17, 2017.

#### New Version of Sign-In Widget 

<!-- OKTA-144563-->

Version 2.3 of the [Okta Sign-In Widget](https://github.com/okta/okta-signin-widget/releases/tag/okta-signin-widget-2.3.0) is available. Check out the new features and bug fixes!

### API Bug Fixes

These bug fixes are expected on preview orgs starting October 11, 2017, and on production orgs starting October 17, 2017.

* Active Directory Password Policies now always return a `maxAgeDays` value of `0`, since this setting is unsupported by Active Directory. (OKTA-142874)
* Deleting a user failed if the user's primary and secondary emails were the same. (OKTA-142765)
* Deleting a user failed if the domain portion of the username string was too long. (OKTA-141876)
* Radius authentication flows would erroneously trigger `user.session.end` events in the log. (OKTA-138775)
* When a user signed in to Okta via IWA and without an MFA prompt, there was no sign on policy evaluation entry present in the system log. (OKTA-136545)
* User authentication attempts blocked by geographic restrictions in Adaptive MFA were logged as a successful login followed by a `Login Denied` event in the system log. (OKTA-112077)
