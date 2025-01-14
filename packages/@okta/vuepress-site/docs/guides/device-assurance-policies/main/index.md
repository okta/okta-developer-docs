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
* Dynamic OS version compliance enabled

---

## About device assurance policies

Use device assurance policies to check sets of security-related device attributes as part of your [authentication policies](/docs/concepts/policies/#authentication-policies). For example, you can configure a device assurance policy to check whether a specific operating system version or security patch is installed on a device. Then you can permit that device to access Okta-protected resources.

By adding device checks to your authentication policy rules, you can establish minimum requirements for the devices that have access to your org.

After you add at least one device assurance policy, you can include it in your [authentication policy rules](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/listPolicyRules). You can't apply device assurance policies to users, groups, or devices until you make them part of an authentication policy rule.

### About platforms

The examples in this guide use iOS as the platform, but the following platforms are available:

* `ANDROID`
* `CHROMEOS`
* `IOS`
* `MACOS`
* `WINDOWS`

See [Platform](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/createDeviceAssurancePolicy!path=1/platform&t=request).

## Create a device assurance policy

Use the [Device Assurance Policy API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/createDeviceAssurancePolicy) to create a device assurance policy. For this example, you only set the `platform` parameter and the parameters you need for the Dynamic OS version compliance feature.

### About Dynamic OS version compliance

<ApiLifecycle access="ea" />

You can configure OS version compliance by using device assurance. However, you have to manually update the policies every time a new OS version or patch is released. With Dynamic OS version compliance, Okta updates device assurance policies with the latest OS versions and patches, eliminating the need for manual updates. With this feature you can ensure OS version compliance in your org without tracking OS releases.

To use Dynamic OS version compliance, you need to define the `dynamicVersionRequirement` object. See [Example POST request](#example-post-request).

### Example POST request

Send a POST request to the `api/v1/device-assurances` endpoint. Include the following:

* Provide a value for `name`.
* Set the `platform` parameter to `IOS`.
* In the `dynamicVersionRequirement` property of the `osVersion` object, set the following parameters:
    * `type`: `EXACT_ANY_SUPPORTED`
    * `latestSecurityPatch`: `true`

> **Note:** By choosing `EXACT_ANY_SUPPORTED` as the `type`, you can’t specify `distanceFromLatestMajor`.

```bash
curl -i -X POST \
  https://subdomain.okta.com/api/v1/device-assurances \
  -H 'Authorization: YOUR_API_KEY_HERE' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Device assurance iOS",
    "osVersion": {
      "dynamicVersionRequirement": {
        "type": "EXACT_ANY_SUPPORTED",
        "latestSecurityPatch": true
      }
    },
    "jailbreak": false,
    "platform": "IOS",
  }'
```

## Edit a device assurance policy

To update a device assurance policy, sent a PUT request to the `api/v1/device-assurances` endpoint. See [Replace a device assurance policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/replaceDeviceAssurancePolicy).

In this example, you update the policy to enable and configure the grace period feature.

### About grace period and remediation

Grace period for device assurance allows you to define a temporary window during which non-compliant devices can still access resources. This gives users time to remediate issues without being locked out, balancing productivity with security standards.

After you enable the **Grace period for device assurance** feature, you can hide or show remediation instructions in the Sign-In Widget:

* Hide remediation instructions: The Sign-In Widget doesn't display remediation instructions for users who don't pass device assurance compliance.
* Display remediation instructions: The Sign-In Widget displays remediation instructions for users who don't pass device assurance compliance.
You can grant users a period in which they can resolve the device noncompliance before they lose access to apps protected by the policy.

See [Add a device assurance policy](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-assurance-add) for more details.

Our example shows the remediation instructions and sets a grace period for a specific duration. See [Example PUT request](#example-put-request).

### Example PUT request

Send a PUT request to the `/api/v1/device-assurances/{deviceAssuranceId}` endpoint.

This example updates the policy to include a 30-day grace period request. Also, end users see remediation instructions if their device is non-compliant.

Consider the following:

* Set the value of `deviceAssuranceId` to the ID of your new device assurance policy. See [Create a device assurance policy](#create-a-device-assurance-policy).
* In the `gracePeriod` object, set the following:
  * `type` to `BY_DURATION` (the grace period expires after a specified duration)
  * `expiry` to `P30D` (30 days using the ISO-8601 date and time format)
* Set the `displayRemediationMode` to `SHOW`.

```bash
"gracePeriod": {
      "type": "BY_DURATION",
      "expiry": "P30D"
    },
    "displayRemediationMode": "SHOW"
```

## Add device assurance to an authentication policy

A device assurance policy doesn’t do anything until it’s added to an authentication policy rule. Once added to a rule, it’s evaluated for that authentication policy.

If you configure the policy rule to include multiple conditions, any condition triggers the rule.

### Example POST rule request

Send a POST request to the `/api/v1/policies/{policyId}/rules` endpoint. Consider the following:

* Select an authentication policy and use its `id` as the `policyId` in your request. See [List all policies](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/listPolicies). Use the `ACCESS_POLICY` type.
* Set the value of `priority` to `1`.
* Set `type` to `ACCESS_POLICY`.
* Set `device.registered` to ‘true’.
* Set the value of `device.assurance.include` to the name of your new device assurance policy. See [Create a device assurance policy](#create-a-device-assurance-policy).

```bash
curl -X POST "https://${yourOktaDomain}/api/v1/policies/{policyId}/rules" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "Device Assurance Rule",
  "priority": 1,
  “Status”: “ACTIVE”,
  "conditions": {
    "device": {
      "registered": “true”,
      "assurance": {
        "include": “Device assurance iOS”
      }
    }
  },
  }'
```

## Check the System Log for device assurance events

Send a GET request to the `/api/v1/logs/ endpoint using one of the following Event Types:

* `device.assurance.policy.add`: Use this event to monitor when a device assurance policy is created.
* `device.assurance.policy.delete`: Use this event to monitor when a device assurance policy is deleted.
* `device.assurance.policy.update`: Use this event to monitor when a device assurance policy is updated, and what changed.

See [Event Types](https://developer.okta.com/docs/reference/api/event-types/#:~:text=device.assurance.policy.add).

### Example GET request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/logs?filter=event_type+eq+%22device.assurance.policy.add%22"
```
