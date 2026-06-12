---
title: Configure advanced posture checks and custom remediation
excerpt: How to use the Device Posture Checks API to enforce custom osquery checks and show custom remediation instructions
layout: Guides
---

<ApiLifecycle access="ie" /></br><ApiLifecycle access="ea" />

This guide describes how to use the [Device Posture Checks API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DevicePostureCheck/) to enforce custom device checks. It also shows how to add custom remediation instructions, and then enforce the checks with the [Device Assurance Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/).

> **Note:** This document is only for Okta Identity Engine. See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

---

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* The **Advanced Posture Checks** feature enabled
* The **Custom remediation for Device Assurance** feature enabled
* An [API token](/docs/guides/create-an-api-token/) for your org
* A mobile device management (MDM) solution to configure Okta Verify
* A test macOS device that meets the following requirements:
  * macOS version 14.4 or later
  * [Okta Verify](https://help.okta.com/okta_help.htm?type=oie&id=ext-ov-overview) version 9.39.0 or later
  * Enrolled in Okta Verify on your org

> **Note:** Advanced posture checks support macOS devices. Support for other platforms is planned for future releases.

---

## About advanced posture checks

A standard device assurance policy checks a fixed set of device attributes, such as OS version, disk encryption, or screen lock. See [Configure a device assurance policy](/docs/guides/device-assurance-policies/).

Advanced posture checks extend this model with *custom* checks. You define a check as an [osquery](https://www.osquery.io/) SQL statement that reads a device attribute. Okta Verify runs the query on the device and returns the result to Okta. Device assurance then compares the result against the value that you require.

Use advanced posture checks to enforce security requirements that the built-in attributes don't cover. For example, you can check whether the firewall is on, whether a required agent is running, or whether a specific app is installed.

## About custom remediation

When a device fails a check, the Okta Sign-In Widget can show remediation instructions. These instructions tell users how to fix the problem and regain access without contacting IT.

You configure remediation per posture check. Each check has two remediation settings:

* **Message** (`remediationSettings.message`): The text that users see.
  * **Default**: Okta shows a built-in message. Set `defaultI18nKey` and leave `customText` empty.
  * **Custom**: Okta shows your own message. Set `customText` and leave `defaultI18nKey` empty.
  * **None**: Users receive no instructions. Leave both properties empty.
* **Link** (`remediationSettings.link`): An optional help link.
  * **Okta documentation**: Set `defaultUrl` and leave `customUrl` empty.
  * **Custom page**: Set `customUrl` to your own help page and leave `defaultUrl` empty.

You can also configure these settings in the Admin Console. See [Configure custom remediation instructions for device assurance](https://help.okta.com/oie/en-us/content/topics/identity-engine/devices/device-assurance-posture-check.htm).

## How posture checks and remediation work together

A custom check and its remediation instructions form a single unit. You create the check, attach remediation settings, and then enforce the check through a device assurance policy.

<!-- TODO(OKTA-896213): Re-enable the sequence diagram after Design approves the updated artifact.
![Sequence diagram that shows a user signing in, Okta evaluating a device assurance policy, Okta Verify running a custom osquery check on the device, and the Sign-In Widget showing custom remediation instructions when the device fails the check.](/img/guides/device-assurance-posture-checks-and-remediation/posture-check-remediation-flow.svg)
-->

The remediation instructions appear only when the policy is set to show them. To display remediation, set `displayRemediationMode` to `SHOW` on the device assurance policy. Remediation works best with a grace period, which gives users time to fix the device. See [About grace period and remediation](/docs/guides/device-assurance-policies/main/#about-grace-period-and-remediation).

## Enable custom posture checks on macOS devices

Okta Verify can only run custom checks after you enable them on the device. Enable them by deploying these Okta Verify configuration keys through your MDM solution:

* `OktaVerify.EnableOSQueryCustomChecks`: Set to `true` to allow custom osquery checks on the device. The default is `false`.
* `OktaVerify.OSQueryAllowedDomains`: A semicolon-separated list of the org sign-in URLs that can run custom checks on the device.

See [Enable custom device checks on user devices](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-assurance-adv-posture-check) for more details.

The following example property list (`.plist`) enables custom checks for two orgs:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
"http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>OktaVerify.EnableOSQueryCustomChecks</key>
  <true/>
  <key>OktaVerify.OSQueryAllowedDomains</key>
  <string>your-subdomain.okta.com;your-other-subdomain.okta.com</string>
</dict>
</plist>
```

For help with pushing configuration changes to Okta Verify, see [Okta Verify configurations for macOS devices](https://help.okta.com/oie/en-us/content/topics/identity-engine/devices/managed-app-configs-macos.htm).

## Create a custom posture check

Use the Device Posture Checks API to create a custom check. Send a POST request to the `/api/v1/device-posture-checks` endpoint. Consider the following:

* Set `platform` to `MACOS` and `type` to `CUSTOM`.
* Set `variableName` to a unique key. A device assurance policy uses this key to reference the check.
* Set `query` to the osquery statement that reads the device attribute. See [Write osquery queries](#write-osquery-queries).
* In `remediationSettings`, add the custom message and link that users see if the check fails. See [About custom remediation](#about-custom-remediation).

This example creates a check that confirms the macOS firewall is enabled. The query returns `1` when the firewall is on and `0` when it's off.

```bash
curl -i -X POST \
  https://${yourOktaDomain}/api/v1/device-posture-checks \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: SSWS ${api_token}' \
  -d '{
    "name": "macOS - Firewall enabled",
    "description": "Checks whether the macOS firewall is enabled",
    "variableName": "macOSFirewall",
    "platform": "MACOS",
    "type": "CUSTOM",
    "query": "SELECT CASE WHEN global_state = 0 THEN 0 ELSE 1 END AS firewall_enabled FROM alf;",
    "remediationSettings": {
      "message": {
        "defaultI18nKey": null,
        "customText": "Your firewall is turned off. Turn on the macOS firewall in System Settings, then sign in again."
      },
      "link": {
        "defaultUrl": null,
        "customUrl": "https://help.example.com/enable-macos-firewall"
      }
    }
  }'
```

The response includes the `id` of the new posture check. Note the `variableName` value. You use it in the next step.

## Add the custom posture check to a device assurance policy

A custom check isn't enforced until it's part of a device assurance policy. Send a POST request to the `/api/v1/device-assurances` endpoint. See [Create a device assurance policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/createDeviceAssurancePolicy). Consider the following:

* Set `platform` to `MACOS`.
* Add at least one standard condition. This example requires disk encryption and a screen lock.
* In the `devicePostureChecks.include` array, add an object for each custom check:
  * `variableName`: The `variableName` of the posture check. This example uses `macOSFirewall`.
  * `value`: The query result that the device must return to pass. This example uses `1`.
* Set `displayRemediationMode` to `SHOW` so that users see remediation instructions.

```bash
curl -i -X POST \
  https://${yourOktaDomain}/api/v1/device-assurances \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: SSWS ${api_token}' \
  -d '{
    "name": "Device assurance macOS",
    "platform": "MACOS",
    "osVersion": {
      "minimum": "14.4"
    },
    "diskEncryptionType": {
      "include": [
        "ALL_INTERNAL_VOLUMES"
      ]
    },
    "screenLockType": {
      "include": [
        "BIOMETRIC",
        "PASSCODE"
      ]
    },
    "secureHardwarePresent": true,
    "devicePostureChecks": {
      "include": [
        {
          "variableName": "macOSFirewall",
          "value": "1"
        }
      ]
    },
    "displayRemediationMode": "SHOW"
  }'
```

## Add the device assurance policy to an app sign-in policy rule

A device assurance policy is evaluated only after you add it to an app sign-in policy rule. The steps are the same as for a standard device assurance policy. See [Add device assurance to an app sign-in policy](/docs/guides/device-assurance-policies/main/#add-device-assurance-to-an-app-sign-in-policy).

## Verify the posture check

Sign in to an app that's protected by the app sign-in policy rule. Use a macOS device that has Okta Verify installed and the MDM configuration applied.

To confirm that Okta collected the custom check, review the device context in the System Log:

1. In the Admin Console, go to **Reports** > **System Log**.
2. Find the authentication event for your sign-in.
3. Confirm that the custom check appears in the device context for the event.

You can also query the System Log with the API. See [Check the System Log for device assurance events](/docs/guides/device-assurance-policies/main/#check-the-system-log-for-device-assurance-events).

## Write osquery queries

With osquery, you query the operating system as a set of SQL tables. You write checks as standard SQL `SELECT` statements, so basic SQL knowledge is enough to start.

When you write a query for a custom check, return a single value that device assurance can compare against the `value` in the policy. The firewall example returns `1` or `0`.

The following resources help you write and test queries:

* [osquery schema version 5.18.1](https://www.osquery.io/schema/5.18.1/)
* [osquery schema](https://www.osquery.io/schema/) for the list of available tables
* [osquery documentation](https://osquery.readthedocs.io/) for query syntax and examples
