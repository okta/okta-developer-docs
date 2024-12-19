---
title: Configure a device assurance policy
excerpt: How to use the Device Assurance Policies API to manage device assurance policies
layout: Guides
---

<ApiLifecycle access="ie" /></br>

This guide describes how to use the [Device Assurance Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/) to manage device assurance policies in your org.

> **Note:** This document is only for Okta Identity Engine. See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

---

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* Grace period enabled

---

## About device assurance policies

Use device assurance policies to check sets of security-related device attributes as part of your [authentication policies](/docs/concepts/policies/#authentication-policies). For example, you can configure a device assurance policy to check whether a specific operating system version or security patch is installed on a device. Then you can permit that device to access Okta-protected resources.

By adding device checks to authentication policy rules, you can establish minimum requirements for the devices that have access to systems and apps in your org.

After you add at least one device assurance policy, you can include it in [authentication policy rules](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/listPolicyRules). You can't apply device assurance policies to users, groups, or devices until you make them part of an authentication policy rule.

## Create a device assurance policy

Use the [Device Assurance Policy API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/createDeviceAssurancePolicy) to create a device assurance policy. For this example, we only set the `platform` and `osVersion` parameters.

### About dynamic OS

<ApiLifecycle access="ea" />




### Example POST request


## Edit a device assurance policy

### About grace period and remediation


### Example PUT request


## Add device assurance to an authentication policy


### Example POST rule request



## Check the syslog for device assurance events

### Example GET request


