---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta API since Release 2017.49
---

## 2017.50

### Enhanced Feature

#### Strict Policy Enforcement for Password Changes

Added `strict` optional parameter to the following operations:

* [Update User](https://developer.okta.com/docs/api/resources/users#update-user)
* [Change Password](https://developer.okta.com/docs/api/resources/users#change-password)

This parameter allows you to force the validation of the password policy's `minAge` and `passwordHistory` requirements when an updated password is sent. This will be Generally Available in preview orgs starting on Dec 13, 2017 and in production orgs starting on Dec 19, 2017.
<!-- OKTA-148151 -->

### API Bug Fix

The following bug fixes will be available on preview orgs starting Dec 13, 2017, and will be available on production orgs starting December 19, 2017:

* When using the [Zones API](https://developer.okta.com/docs/api/resources/zones#update-an-ip-zone), erasing all IP addresses in the Default IP Blacklist zone caused an error. (OKTA-145602)
