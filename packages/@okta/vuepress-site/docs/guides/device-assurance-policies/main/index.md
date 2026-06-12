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

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* A scoped OAuth 2.0 [access token](/docs/guides/implement-oauth-for-okta/) with the `okta.deviceAssurance.manage`, `okta.policies.manage`, and `okta.logs.read` scopes
* The **Dynamic OS version compliance** feature enabled, required for the `dynamicVersionRequirement` object in the [Create a device assurance policy](#create-a-device-assurance-policy) example
* The device assurance grace period feature enabled, required for the `gracePeriod` and `displayRemediationMode` properties in the [Edit a device assurance policy](#edit-a-device-assurance-policy) example

---

## About device assurance policies

Use device assurance policies to check sets of security-related device attributes as part of your [app sign-in policies](/docs/concepts/policies/#app-sign-in-policies). For example, you can configure a device assurance policy to check whether a specific operating system version or security patch is installed on a device. Then you can permit that device to access Okta-protected resources.

By adding device checks to your app sign-in policy rules, you can establish minimum requirements for the devices that have access to your org.

After you add at least one device assurance policy, you can include it in your [app sign-in policy rules](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/listPolicyRules). You can't apply device assurance policies to users, groups, or devices until you make them part of an app sign-in policy rule.

> **Note:** To enforce custom device attributes with osquery checks and show custom remediation instructions, see [Configure advanced posture checks and custom remediation](/docs/guides/device-assurance-posture-checks-and-remediation/).

### About platforms

The examples in this guide use iOS as the platform, but the following platforms are available:

* `ANDROID`
* `CHROMEOS`
* `IOS`
* `MACOS`
* `WINDOWS`

See [Platform](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/createDeviceAssurancePolicy!path=1/platform&t=request).

> **Note:** Each platform supports a different set of condition properties. For example, Windows OS version requirements use the `osVersionConstraints` array, with `WINDOWS_11` and `WINDOWS_10` major version constraints, instead of `osVersion.minimum`. See the platform-specific request examples in [Create a device assurance policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/createDeviceAssurancePolicy).

## Create a device assurance policy

Use the [Device Assurance Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/createDeviceAssurancePolicy) to create a device assurance policy. For this example, you only set the `platform` parameter and the parameters you need for the Dynamic OS version compliance feature.

### About Dynamic OS version compliance

You can configure OS version compliance by using device assurance. However, you have to manually update the policies every time a new OS version or patch is released. With Dynamic OS version compliance, Okta updates device assurance policies with the latest OS versions and patches, eliminating the need for manual updates. With this feature you can ensure OS version compliance in your org without tracking OS releases.

To use Dynamic OS version compliance, you need to define the `dynamicVersionRequirement` object. See [Example POST request](#example-post-request).

### Example POST request

Send a POST request to the `/api/v1/device-assurances` endpoint. Include the following:

* Provide a value for `name`.
* Set the `platform` parameter to `IOS`.
* In the `dynamicVersionRequirement` property of the `osVersion` object, set the following parameters:
    * `type`: `EXACT_ANY_SUPPORTED`
    * `latestSecurityPatch`: `true`

> **Note:** By choosing `EXACT_ANY_SUPPORTED` as the `type`, you can't specify `distanceFromLatestMajor`.

```bash
curl -i -X POST \
  https://${yourOktaDomain}/api/v1/device-assurances \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer ${yourOktaAccessToken}' \
  -d '{
    "name": "Device assurance iOS",
    "osVersion": {
      "dynamicVersionRequirement": {
        "type": "EXACT_ANY_SUPPORTED",
        "latestSecurityPatch": true
      }
    },
    "jailbreak": false,
    "platform": "IOS"
  }'
```

## Edit a device assurance policy

To update a device assurance policy, send a PUT request to the `/api/v1/device-assurances/{deviceAssuranceId}` endpoint. See [Replace a device assurance policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/replaceDeviceAssurancePolicy).

In this example, you update the policy to enable and configure a grace period.

### About grace period and remediation

[Grace period](/docs/concepts/policies/#grace-periods) for device assurance allows you to define a temporary window during which non-compliant devices can still access resources. This gives users time to remediate issues without being locked out, balancing productivity with security standards.

You can use grace periods to hide or show remediation instructions in the Sign-In Widget:

* Hide remediation instructions: The Sign-In Widget doesn't display remediation instructions for users who don't pass device assurance compliance.
* Display remediation instructions: The Sign-In Widget displays remediation instructions for users who don't pass device assurance compliance. You can grant users a period in which they can resolve the device noncompliance before they lose access to apps protected by the policy.

See [Add a device assurance policy](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-assurance-add) for more details.

Our example shows the remediation instructions and sets a grace period for a specific duration. See [Example PUT request](#example-put-request).

### Example PUT request

Send a PUT request to the `/api/v1/device-assurances/{deviceAssuranceId}` endpoint.

This example updates the policy to include a 30-day grace period. End users also see remediation instructions if their device is noncompliant.

Consider the following:

* Set the value of `deviceAssuranceId` to the ID of your device assurance policy. See [Create a device assurance policy](#create-a-device-assurance-policy).
* In the `gracePeriod` object, set the following:
  * `type` to `BY_DURATION` (the grace period expires after a specified duration)
  * `expiry` to `P30D` (30 days using the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) date and time format)
* Set `displayRemediationMode` to `SHOW`.

> **Note:** A PUT request replaces the entire policy. Include all the properties that you set when you created the policy, plus your updates.

```bash
curl -i -X PUT \
  https://${yourOktaDomain}/api/v1/device-assurances/${deviceAssuranceId} \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer ${yourOktaAccessToken}' \
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
    "gracePeriod": {
      "type": "BY_DURATION",
      "expiry": "P30D"
    },
    "displayRemediationMode": "SHOW"
  }'
```

## Add device assurance to an app sign-in policy

A device assurance policy doesn't do anything until it's added to an app sign-in policy rule. Once added to a rule, it's evaluated for that app sign-in policy.

### Example PUT rule request

Send a PUT request to the `/api/v1/policies/{policyId}/rules/{ruleId}` endpoint to replace an existing rule. Consider the following:

* Select an app sign-in policy and use its `id` as the `policyId`. See [List all policies](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/listPolicies). Use the `ACCESS_POLICY` type.
* Use the `id` of the rule that you want to update as the `ruleId`. See [List all policy rules](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/listPolicyRules).
* Set `type` to `ACCESS_POLICY`.
* Set `priority` to `1`.
* In the `conditions.device` object, set the following:
  * `assurance.include` to an array of device assurance policy IDs. See [Create a device assurance policy](#create-a-device-assurance-policy).
  * `managed` to `true`.
  * `registered` to `true`.
    > **Note:** When you pass the `managed` property, you must also include the `registered` property and set it to `true`.
* In the `actions.appSignOn` object, set `access` to `ALLOW` and define the `verificationMethod`. This example requires two factors (`factorMode`: `2FA`).

> **Note:** A PUT request replaces the entire rule. Include all the rule's properties, including its `actions`. See [Replace a policy rule](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/replacePolicyRule).

```bash
curl -i -X PUT \
  "https://${yourOktaDomain}/api/v1/policies/${policyId}/rules/${ruleId}" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${yourOktaAccessToken}" \
  -d '{
    "name": "Device Assurance Rule",
    "type": "ACCESS_POLICY",
    "priority": 1,
    "conditions": {
      "device": {
        "managed": true,
        "registered": true,
        "assurance": {
          "include": ["dae3m8o4rWhwReDeM1c5"]
        }
      }
    },
    "actions": {
      "appSignOn": {
        "access": "ALLOW",
        "verificationMethod": {
          "factorMode": "2FA",
          "type": "ASSURANCE",
          "reauthenticateIn": "PT2H",
          "constraints": [
            {
              "knowledge": {
                "types": ["password"]
              }
            }
          ]
        }
      }
    }
  }'
```

## Check the System Log for device assurance events

Send a GET request to the `/api/v1/logs/` endpoint using one of the following event types:

* `device.assurance.policy.add`: Use this event to monitor when a device assurance policy is created.
* `device.assurance.policy.delete`: Use this event to monitor when a device assurance policy is deleted.
* `device.assurance.policy.update`: Use this event to monitor when a device assurance policy is updated, and what changed.

See [Event Types](https://developer.okta.com/docs/reference/api/event-types/).

### Example GET request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${yourOktaAccessToken}" \
"https://${yourOktaDomain}/api/v1/logs?filter=event_type+eq+%22device.assurance.policy.add%22"
```

## Next steps

To enforce custom device attributes that the built-in checks don't cover, define your own osquery checks and show users custom remediation instructions when a device fails. See [Configure advanced posture checks and custom remediation](/docs/guides/device-assurance-posture-checks-and-remediation/).
