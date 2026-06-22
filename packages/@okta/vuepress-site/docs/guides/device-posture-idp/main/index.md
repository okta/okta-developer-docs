---
title: Configure a device posture IdP
excerpt: How to integrate an external device posture IdP and use its signals in device assurance and app sign-in policies
layout: Guides
---

<ApiLifecycle access="ie" /></br>

This guide describes how to integrate an external device posture identity provider (IdP) with Okta. It also shows how to use the [Device Integrations API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceIntegrations/) to manage that integration.

> **Note:** This document is only for Okta Identity Engine. See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

---

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* An external SAML 2.0 or OpenID Connect (OIDC) IdP that's configured as a compliance service. See [About the data contract](#about-the-data-contract).
* A scoped OAuth 2.0 [access token](/docs/guides/implement-oauth-for-okta/) with the `okta.deviceIntegrations.manage`, `okta.deviceAssurance.manage`, and `okta.policies.manage` scopes

---

## About device posture IdPs

A device posture IdP is an external service that provides device posture data to Okta. When you integrate this service, Okta can use its device signals to enforce device posture requirements in [device assurance](/docs/guides/device-assurance-policies/) and [app sign-in policies](/docs/concepts/policies/#app-sign-in-policies).

Okta uses SAML or OIDC to communicate with the device posture IdP. Okta sends a request to the IdP, and the IdP returns an assertion or token that contains device posture attributes. Okta then evaluates these attributes against your policies. Only devices that meet your security standards can access Okta-protected resources.

With this integration, you can build dynamic access controls that are based on the real-time security status of your end users' devices. You can use your existing Device Trust signals in Okta without extra agents or redundant tooling.

> **Note:** You can configure only one device posture IdP for each org.

### About platforms

You can configure a device posture IdP integration for any of the following platforms:

* `ANDROID`
* `CHROMEOS`
* `IOS`
* `MACOS`
* `WINDOWS`

## Configuration overview

To use a device posture IdP in your org, complete the following steps:

1. [Configure the device posture IdP in Okta](#configure-the-device-posture-idp-in-okta).
1. [Activate the device posture provider integration](#activate-the-device-posture-provider-integration).
1. [Use device posture IdP signals in a device assurance policy](#use-device-posture-idp-signals-in-a-device-assurance-policy).
1. [Add the device assurance policy to an app sign-in policy rule](#add-the-device-assurance-policy-to-an-app-sign-in-policy-rule).

## Configure the device posture IdP in Okta

Add the external compliance service as a SAML 2.0 or OIDC IdP, and set its usage to device posture. This step creates the device posture provider integration that you manage in the rest of this guide.

In the Admin Console, perform the following steps:

1. Go to **Security** > **Identity Providers**.
1. Click **Add identity provider**.
1. Select **SAML 2.0** or **OpenID Connect IdP**, and then click **Next**.
1. Configure the IdP. See [Create an Identity Provider in Okta](https://help.okta.com/okta_help.htm?type=oie&id=ext-id-provider) for SAML 2.0 or OpenID Connect.
1. For **IdP Usage**, select **Device posture provider**.

> **Note:** Your IdP must send device posture data in the format that Okta expects before you continue. See [About the data contract](#about-the-data-contract).

## Activate the device posture provider integration

After you add the device posture IdP, Okta creates a device integration record for it. The record has the name `com.okta.deviceidp` and the display name `Device Posture Provider`. Use the [Device Integrations API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceIntegrations/) to retrieve and activate this record.

> **Note:** The Device Integrations API supports read and lifecycle operations. To create or remove a device posture IdP, use the **Security** > **Identity Providers** configuration in the Admin Console.

### List all device integrations

Send a GET request to the `/api/v1/device-integrations` endpoint to find your device posture provider integration. See [List all device integrations](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceIntegrations/#tag/DeviceIntegrations/operation/listDeviceIntegrations).

Locate the integration with the `name` of `com.okta.deviceidp` and a `metadata.type` of `DEVICE_IDP`. Copy its `id` value.

```bash
curl -i -X GET \
  https://${yourOktaDomain}/api/v1/device-integrations \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer ${yourOktaAccessToken}'
```

The `metadata.idpId` property in the response is the ID of the IdP that you configured. The `status` property is either `ACTIVE` or `DEACTIVATED`.

```json
{
  "id": "dindyfzlaerjWVdqt0g4",
  "name": "com.okta.deviceidp",
  "displayName": "Device Posture Provider",
  "status": "DEACTIVATED",
  "platform": "WINDOWS",
  "metadata": {
    "type": "DEVICE_IDP",
    "idpId": "0oa2owlGX5l74kjr60g4"
  }
}
```

### Retrieve a device integration

To retrieve a single integration, send a GET request to the `/api/v1/device-integrations/{deviceIntegrationId}` endpoint. Use the `id` from the previous step as the `deviceIntegrationId`. See [Retrieve a device integration](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceIntegrations/#tag/DeviceIntegrations/operation/getDeviceIntegration).

```bash
curl -i -X GET \
  https://${yourOktaDomain}/api/v1/device-integrations/${deviceIntegrationId} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer ${yourOktaAccessToken}'
```

### Activate a device integration

To activate the device posture provider integration, send a POST request to the `/api/v1/device-integrations/{deviceIntegrationId}/lifecycle/activate` endpoint. See [Activate a device integration](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceIntegrations/#tag/DeviceIntegrations/operation/activateDeviceIntegration).

The response returns the integration with a `status` of `ACTIVE`.

```bash
curl -i -X POST \
  https://${yourOktaDomain}/api/v1/device-integrations/${deviceIntegrationId}/lifecycle/activate \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer ${yourOktaAccessToken}'
```

### Deactivate a device integration

To deactivate the integration, send a POST request to the `/api/v1/device-integrations/{deviceIntegrationId}/lifecycle/deactivate` endpoint. See [Deactivate a device integration](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceIntegrations/#tag/DeviceIntegrations/operation/deactivateDeviceIntegration).

```bash
curl -i -X POST \
  https://${yourOktaDomain}/api/v1/device-integrations/${deviceIntegrationId}/lifecycle/deactivate \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer ${yourOktaAccessToken}'
```

## Use device posture IdP signals in a device assurance policy

After you activate the integration, create or update a device assurance policy to consume the device posture IdP signals. Add the `thirdPartySignalProviders.devicePostureIdP` object to your device assurance policy request.

The `devicePostureIdP` object supports the following conditions:

* `managed`: The device is under your organization's control, as indicated by installed management agents or software.
* `compliant`: The device adheres to the security standards and rules that your external security system sets.

Send a POST request to the `/api/v1/device-assurances` endpoint. See [Create a device assurance policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/createDeviceAssurancePolicy).

The following example creates an iOS device assurance policy that requires a managed and compliant device, as reported by the device posture IdP.

```bash
curl -i -X POST \
  https://${yourOktaDomain}/api/v1/device-assurances \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer ${yourOktaAccessToken}' \
  -d '{
    "name": "Device assurance iOS",
    "osVersion": {
      "minimum": "12.4.5"
    },
    "jailbreak": false,
    "platform": "IOS",
    "screenLockType": {
      "include": ["BIOMETRIC"]
    },
    "thirdPartySignalProviders": {
      "devicePostureIdP": {
        "managed": true,
        "compliant": true
      }
    }
  }'
```

For more about creating and editing device assurance policies, see [Configure a device assurance policy](/docs/guides/device-assurance-policies/).

## Add the device assurance policy to an app sign-in policy rule

A device assurance policy isn't enforced until you add it to an app sign-in policy rule. To add your policy to a rule, see [Add device assurance to an app sign-in policy](/docs/guides/device-assurance-policies/#add-device-assurance-to-an-app-sign-in-policy).

Consider the following behavior when you use device posture IdP signals:

* Okta redirects an end user to the external compliance service only when the first matched app sign-in policy rule requires device posture claims. Give this rule the highest priority, and target specific users with conditions such as group, platform, or network zone.
* If your [global session policy](/docs/guides/configure-signon-policy/) requires a password, the Sign-In Widget prompts for a username and password before redirecting to the device posture IdP.

## About the data contract

Your device posture IdP must send device posture data to Okta in a specific format.

### SAML assertion data contract

See [SAML assertion data contract](https://help.okta.com/okta_help.htm?type=oie&id=device-assurance-dev-posture-idp#identity-engine-devices-device-assurance-device-posture-idp__SAML_assertion) in the Okta product documentation.

### OIDC data contract

For an OIDC IdP, Okta reads claims from the ID token and the UserInfo response. The IdP adds the following `device_context` claim to the ID token.

```json
device_context: {
    managed: true,
    compliant: true,
    externalId: "123"
  }
```

## Next steps

* [Configure a device assurance policy](/docs/guides/device-assurance-policies/)
* [Configure a device signal collection policy](/docs/guides/device-signal-collection-policies/)
* [Add an external identity provider](/docs/guides/identity-providers/)
