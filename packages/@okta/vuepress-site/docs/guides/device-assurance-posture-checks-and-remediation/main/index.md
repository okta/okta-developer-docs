---
title: Configure advanced posture checks and custom remediation
excerpt: How to use the Device Posture Checks API to enforce custom osquery checks and show custom remediation instructions
layout: Guides
---

<ApiLifecycle access="ie" />

This guide describes how to use the [Device Posture Checks API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DevicePostureCheck/) to enforce custom device checks. It also shows how to add custom remediation instructions, and then enforce the checks with the [Device Assurance Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/).

> **Notes:**
>
> * This document is only for Okta Identity Engine. See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.
> * Advanced posture checks require the Okta Device Access (ODA) SKU. Contact your Okta account team to add this SKU to your subscription.

---

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* A scoped OAuth 2.0 [access token](/docs/guides/implement-oauth-for-okta/) with the `okta.devicePostureChecks.manage` and `okta.deviceAssurance.manage` scopes
* The **Advanced Posture Checks** feature enabled
* The **Custom remediation for Device Assurance** feature enabled
* A mobile device management (MDM) solution to configure Okta Verify
* A test device that's managed by your MDM solution, enrolled in Okta Verify on your org, and meets the requirements for its platform:
  * **macOS**:
    * macOS version 14.4 or later
    * [Okta Verify](https://help.okta.com/okta_help.htm?type=oie&id=ext-ov-overview) version 9.39.0 or later, installed from the Admin Console (**Settings** > **Downloads**)
    * System Integrity Protection (SIP) enabled
  * **Windows**:
    * Windows 10 (22H2) or later, 64-bit
    * [Okta Verify](https://help.okta.com/okta_help.htm?type=oie&id=ext-ov-overview) for Windows version 6.7.0 or later

> **Note:** Advanced posture checks support macOS and Windows devices.

---

## About advanced posture checks

A standard device assurance policy checks a fixed set of device attributes, such as OS version, disk encryption, or screen lock. See [Configure a device assurance policy](/docs/guides/device-assurance-policies/).

Advanced posture checks extend this model with custom checks. You define a check as an [osquery](https://www.osquery.io/) SQL statement that reads a device attribute. Okta Verify runs the query on the device and returns the result to Okta. Device assurance then compares the result against the value that you require.

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

## Enable custom posture checks on user devices

Okta Verify can only run custom checks after you enable them on the device. Enable them through your MDM solution. The configuration differs by platform. See [Enable custom device checks on user devices](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-assurance-adv-posture-check).

### macOS

Deploy these Okta Verify configuration keys through your MDM solution:

* `OktaVerify.EnableOSQueryCustomChecks`: Set to `true` to allow custom osquery checks on the device. The default is `false`.
* `OktaVerify.OSQueryAllowedDomains`: A semicolon-separated list of the org sign-in URLs that can run custom checks on the device.
* `OktaVerify.OSQueryCustomChecksTimeout`: The maximum time, in seconds, that Okta Verify waits for a custom check to return a result. The default is `2`.

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
  <key>OktaVerify.OSQueryCustomChecksTimeout</key>
  <integer>2</integer>
</dict>
</plist>
```

After you deploy the configuration, install Okta Verify on the device. If Okta Verify is already installed, reinstall it.

For help with pushing configuration changes to Okta Verify, see [Okta Verify configurations for macOS devices](https://help.okta.com/oie/en-us/content/topics/identity-engine/devices/managed-app-configs-macos.htm).

### Windows

Deploy Okta Verify through your MDM solution with custom checks enabled:

* Set the `EnableOSQueryCustomChecks` configuration value to `True`.
* Generate and install the osquery integration plugin manifest file.
* (Optional) Adjust the `CollectionTimeout` registry value if your environment requires a longer timeout for signal collection. The default is `5000` milliseconds. The effective timeout is the greater of this value and the timeout in each plugin manifest file.

After you deploy the configuration, install Okta Verify on the device. If Okta Verify is already installed, reinstall it.

For the detailed MDM, plugin manifest, and registry steps, see [Enable custom device checks on user devices](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-assurance-adv-posture-check).

## Enable osquery in Okta

Before Okta can run custom checks, add osquery as an endpoint security integration in the Admin Console:

1. In the Admin Console, go to **Security** > **Device integrations**.
2. On the **Endpoint security** tab, click **Add endpoint integration**, and then select **osquery**.
3. Select the platform, and then click **Save**.

Configure this integration in the Admin Console. See [Enable custom device checks on user devices](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-assurance-adv-posture-check).

## Create a custom posture check

Use the Device Posture Checks API to create a custom check. Send a POST request to the `/api/v1/device-posture-checks` endpoint. Consider the following:

* Set `platform` to `MACOS` or `WINDOWS`, and set `type` to `CUSTOM`.
* Set `variableName` to a unique key. A device assurance policy uses this key to reference the check.
* Set `query` to the osquery statement that reads the device attribute. The query must return a single value of `1` (pass) or `0` (fail) and end with a semicolon. See [Write osquery queries](#write-osquery-queries).
* Set `mappingType` to control how the check appears when you add it to a device assurance policy: `CHECKBOX` for a pass or fail check, or `TEXTBOX` to match a specific value.
* In `remediationSettings`, add the custom message and link that users see if the check fails. See [About custom remediation](#about-custom-remediation).

This example creates a check that confirms the macOS firewall is enabled. The query returns `1` when the firewall is on and `0` when it's off.

```bash
curl -i -X POST \
  https://${yourOktaDomain}/api/v1/device-posture-checks \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer ${yourOktaAccessToken}' \
  -d '{
    "name": "macOS - Firewall enabled",
    "description": "Checks whether the macOS firewall is enabled",
    "variableName": "macOSFirewall",
    "platform": "MACOS",
    "type": "CUSTOM",
    "mappingType": "CHECKBOX",
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

To create the same check for Windows devices, set `platform` to `WINDOWS` and use a Windows osquery table. This example confirms that the Windows firewall is enabled.

```bash
curl -i -X POST \
  https://${yourOktaDomain}/api/v1/device-posture-checks \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer ${yourOktaAccessToken}' \
  -d '{
    "name": "Windows - Firewall enabled",
    "description": "Checks whether the Windows firewall is enabled",
    "variableName": "windowsFirewall",
    "platform": "WINDOWS",
    "type": "CUSTOM",
    "mappingType": "CHECKBOX",
    "query": "SELECT CASE WHEN enabled = 1 THEN 1 ELSE 0 END AS firewall_enabled FROM windows_firewall_profiles;",
    "remediationSettings": {
      "message": {
        "defaultI18nKey": null,
        "customText": "Your firewall is turned off. Turn on the Windows firewall, then sign in again."
      },
      "link": {
        "defaultUrl": null,
        "customUrl": "https://help.example.com/enable-windows-firewall"
      }
    }
  }'
```

## Add the custom posture check to a device assurance policy

A custom check isn't enforced until it's part of a device assurance policy. Send a POST request to the `/api/v1/device-assurances` endpoint. See [Create a device assurance policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/createDeviceAssurancePolicy). Consider the following:

* Set `platform` to match the posture check's platform, either `MACOS` or `WINDOWS`. This example uses `MACOS`.
* Add at least one standard condition. This example requires a minimum OS version, disk encryption, a screen lock, and secure hardware.
* In the `devicePostureChecks.include` array, add an object for each custom check:
  * `variableName`: The `variableName` of the posture check. This example uses `macOSFirewall`.
  * `value`: The query result that the device must return to pass. This example uses `1`.
* Set `displayRemediationMode` to `SHOW` so that users see remediation instructions.

```bash
curl -i -X POST \
  https://${yourOktaDomain}/api/v1/device-assurances \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer ${yourOktaAccessToken}' \
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

Sign in to an app that's protected by the app sign-in policy rule. Use a macOS or Windows device that has Okta Verify installed and the MDM configuration applied.

To confirm that Okta collected the custom check, review the device context in the System Log:

1. In the Admin Console, go to **Reports** > **System Log**.
2. Find the authentication event for your sign-in.
3. Confirm that the custom check appears in the device context for the event.

You can also query the System Log with the API. See [Check the System Log for device assurance events](/docs/guides/device-assurance-policies/main/#check-the-system-log-for-device-assurance-events).

## Known issues and limitations

Device assurance policies that use custom osquery checks don't work when the user authenticates with Safari and the SSO extension is deployed. As a workaround, use a different browser.

## Write osquery queries

With osquery, you query the operating system as a set of SQL tables. You write checks as standard SQL `SELECT` statements, so basic SQL knowledge is enough to start.

When you write a query for a custom check, return a single value that device assurance compares against the `value` in the policy. The query must return exactly one entry, end with a semicolon, and resolve to `1` (pass) or `0` (fail).

The following resources help you write and test queries:

* [osquery schema version 5.18.1](https://www.osquery.io/schema/5.18.1/)
* [osquery schema](https://www.osquery.io/schema/) for the list of available tables
* [osquery documentation](https://osquery.readthedocs.io/) for query syntax and examples

### Test a query on a device

Validate and test your queries in a preview org before you deploy them to production. To run a query directly on a device where custom checks are enabled, use the osquery binary that Okta Verify bundles.

On macOS:

```bash
sudo /Applications/Okta\ Verify.app/Contents/XPCServices/OktaAuthenticationService.xpc/Contents/Resources/osqueryd --S --json "YOUR QUERY"
```

> **Note:** Okta Verify for macOS 9.52.0 renamed this binary. If you're testing against Okta Verify 9.50 or earlier, change `OktaAuthenticationService.xpc` to `OSQueryService.xpc`.

On Windows, run this from an administrator command prompt:

```bash
"C:\Program Files\Okta\Services\Authenticator Service\osqueryi.exe" --S --json "YOUR QUERY"
```

The query must return exactly one entry in the JSON object. For example:

```json
[
    {"firewall_enabled": "1"}
]
```
