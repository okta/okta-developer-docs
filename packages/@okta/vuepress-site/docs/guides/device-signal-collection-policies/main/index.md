---
title: Configure a device signal collection policy
excerpt: How to use the Policies API to manage device signal collection policies
layout: Guides
---

<ApiLifecycle access="ie" /></br>

This guide describes how to use the [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/) to manage device signal collection policies in your org.

> **Note:** This document is only for Okta Identity Engine. See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

---

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* A test [user account](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-add-users)
* A test [group](https://help.okta.com/okta_help.htm?type=oie&id=usgp-groups-create) in your org that the test user is added to

---

## About device signal collection policies

Use device signal collection policies to collect contextual information about your user's [registered devices](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-registration) and control how those registered devices are used during authentication. The device signal collection policies can collect [information](https://help.okta.com/okta_help.htm?type=oie&id=ext-ov-datatypes) about registered devices and the platforms that devices use. Device signal collection policies are part of your [authentication policies](/docs/concepts/policies/#authentication-policies) and they're closely related to your [device assurance policies](/docs/guides/device-assurance-policies).

You can use a device signal collection policy in the following use case, as an example. One of your users has a registered device with Okta Verify and another authenticator. And you have an authentication policy that requires users to have registered devices when they sign in. You can use the device signal collection policy to check for devices that are registered with Okta Verify when users sign in. And you can configure the device signal collection policy to let users sign in with their other authenticator instead of automatically using Okta Verify.

### About platforms

You can use any of the following platforms as policy settings in your device signal collection policies:

* `ANDROID`
* `CHROMEOS`
* `IOS`
* `MACOS`
* `WINDOWS`

See [Platform](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule!path=1/conditions/platform&t=request).

### About registered devices

You can use any of the following types of registered devices in your device signal colleciton policies:

* [Okta Verify](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-ov)
* [Chrome Device Trust connector](https://help.okta.com/okta_help.htm?type=oie&id=ext-devices-enable-chrome)
* [Device posture IdP]()

### How to configure device signal collection policies

To configure a device signal collection policy in your org, follow these steps:

1. [Create an authentication policy that checks for registered devices](#configure-an-authentication-policy-for-registered-devices)
1. [Create a disabled device signal collection policy](#create-a-disabled-device-signal-collection-policy)
1. [Map the device signal collection policy to the authentication policy](#map-the-device-signal-collection-policy-to-the-authentication-policy)
1. [Create a rule for the device signal collection policy](#create-a-device-signal-collection-policy-rule)
1. [Review and then activate the device signal collection policy](#activate-the-device-signal-collection-policy)

## Configure an authentication policy for registered devices

If you already have an authentication policy that requires users to have registered devices, go to the [next section](#create-a-disabled-device-signal-collection-policy).

Use the [Create a policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy) endpoint to create an authentication policy.

Create your own POST request body or copy the [example request](#create-authentication-policy-request-example) and input your values.

1. Ensure that the following request body parameters are set correctly:
   * Enter a value for `name`.
   * Set the type as `ACCESS_POLICY`.
   * Set the status of the policy as `ACTIVE`.
1. Send the `POST /api/v1/policies` request.
1. In the response, copy and paste the `id` of the policy into a text editor.

### Create authentication policy request example

```json
{
    "name": "Device signal collection policy",
    "priority": "1",
    "status": "ACTIVE",
    "system": false,
    "type": "ACCESS_POLICY",
    "conditions": null,
    "_embedded": {
        "resourceType": "string",
        "property1": {},
        "property2": {}
    }
}
```

### Create a rule for registered devices

Use the [Create a policy rule](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule) endpoint to create a rule for the authentication policy that requires devices to be registered.

Create your own POST request body or copy the [example request](#authentication-policy-rule-for-registered-devices-request-example) and input your values.

1. Ensure that the following request body parameters are set correctly:
   * Enter a value for `name`.
   * Set the type as `ACCESS_POLICY`.
   * Set `device.registered` as `true`.
   * Include the `device.managed` property, and set it as `false`. In this example, the authentication policy rule doesn't apply to managed devices.
   * Set the status of the policy as `ACTIVE`.
1. Send the `POST /api/v1/policies/{policyId}/rules` request.

#### Authentication policy rule for registered devices request example

```json
{
    "name": "Registered devices rule",
    "type": "ACCESS_POLICY",
    "conditions": {
        "people": {
            "groups": {
                "include": [
                    "{groupId}"
                ]
            }
        },
        "device": {
            "registered": "true",
            "managed": "false"
        }
    },
    "actions": {
        "appSignOn": {
            "access": "ALLOW",
            "verificationMethod": {
                "factorMode": "2FA",
                "type": "ASSURANCE",
                "reauthenticateIn": "PT0S",
                "constraints": [
                    {
                        "possession": {
                            "required": true,
                            "userPresence": "OPTIONAL"
                        }
                    }
                ]
            }
        }
    }
}
```

## Create a disabled device signal collection policy

After you've created the authentication policy for registered devices, use the [Create a policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy) endpoint to create a disabled device signal collection policy. By setting the policy as disabled, you can review its rules and ensure that the policy is configured correctly before activating it.

Create your own POST request body or copy the [example request](#create-device-signal-collection-policy-request-example) and input your values.

1. Set the following request body parameters:
   * Enter a value for `name`.
   * Set the `type` as `DEVICE_SIGNAL_COLLECTION`.
   * Set the `status` of the policy as `ACTIVE`.
1. Send the `POST /api/v1/policies` request.
1. In the response, copy and paste the `id` of the policy into a text editor.

### Create device signal collection policy request example

```json
{
    "name": "Device signal collection policy",
    "type": "DEVICE_SIGNAL_COLLECTION",
    "status": "INACTIVE"
}
```

### Create device signal collection policy response example

```json
{
    "id": "rst8jpde42q54pj090g7",
    "status": "INIACTIVE",
    "name": "Device signal collection policy",
    "priority": 1,
    "system": false,
    "conditions": null,
    "created": "2025-06-05T18:52:21.000Z",
    "lastUpdated": "2025-06-05T18:52:21.000Z",
    "_links": {
        "mappings": {
            "href": "https://{yourOktaDomain}m/api/v1/policies/rst8jpde42q54pj090g7/mappings",
            "hints": {
                "allow": [
                    "GET",
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/policies/rst8jpde42q54pj090g7",
            "hints": {
                "allow": [
                    "GET",
                    "PUT",
                    "DELETE"
                ]
            }
        },
        "rules": {
            "href": "https://{yourOktaDomain}/api/v1/policies/rst8jpde42q54pj090g7/rules",
            "hints": {
                "allow": [
                    "GET",
                    "POST"
                ]
            }
        },
        "deactivate": {
            "href": "https://{yourOktaDomain}/api/v1/policies/rst8jpde42q54pj090g7/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    },
    "type": "DEVICE_SIGNAL_COLLECTION"
}
```

## Map the device signal collection policy to the authentication policy

Device signal collection policies must be associated with authentication policies. You can do this by mapping the device signal collection policy `id` to the authentication policy `id`.

Use the [Map a resource to a policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/mapResourceToPolicy) endpoint to map your device signal collection policy to the your authentication policy.

Create your own POST request body or copy the [example request](#map-the-devie-signal-collection-policy-request-example) and input your values.

1. In the path parameters, use the device signal collection policy `id` as the `policyId`.
1. In the request body, set the following parameters:
   * Use the `id` of the authentication policy as the `resoureceId`.
   * Set the `resourceType` as `APP`.
1. Send the `POST /api/v1/policies/{policyId}/mappings` request.

### Map the devie signal collection policy request example

```json
{
  "resourceId": "{AuthenticationPolicyId}",
  "resourceType": "APP"
}
```

## Create a device signal collection policy rule

In this example, create a rule that checks for Okta Verify registered devices when those devices are on `IOS` and `ANDROID` platforms. And allow users to choose which authenticator they want to use to sign in.

Use the [Create a policy rule](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule) endpoint to create a device signal collection policy rule.

Create your own POST request body or copy the [example request](#create-device-signal-collection-policy-rule-request-example) and input your values.

1. In the path parameters set the device signal collection policy `id` as the `policyId`.
1. Set the following request body parameters:
   * Enter a value for `name`.
   * Set the type as `DEVICE_SIGNAL_COLLECTION`.
   * Set the `deviceContextProviders.key` as `OKTA_VERIFY`.
   * Set the `deviceContextProviders.key` as `IGNORE` so that users can choose which authenticator to use when they sign in.
   * Include `IOS` and `ANDROID` as platform conditions.
1. Send the `POST /api/v1/policies/{policyId}/rules` request.

### Create device signal collection policy rule request example

```json
{
    "name": "Device signal collection rule",
    "actions": {
        "deviceSignalCollection": {
            "deviceContextProviders": [
                {
                    "key": "OKTA_VERIFY",
                    "userIdentification": "IGNORE"
                }
            ]
        }
    },
    "conditions": {
        "platform": {
            "include": [
                {
                    "type": "MOBILE",
                    "os": {
                        "type": "IOS"
                    }
                },
                {
                    "type": "MOBILE",
                    "os": {
                        "type": "ANDROID"
                    }
                }
            ]
        }
    },
    "type": "DEVICE_SIGNAL_COLLECTION"
}
```

## Activate the device signal collection policy

Review the device signal collection policy and the rule that you created. Ensure that it's configured with the correct settings.

After you've reviewed the policy and rule, use the [Activate a policy endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/activatePolicy) to activate the policy.
