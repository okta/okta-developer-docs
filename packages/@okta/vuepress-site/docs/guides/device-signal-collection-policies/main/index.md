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
* Dynamic OS version compliance enabled
* A test user and test group

---

## About device signal collection policies

Use device signal collection policies to collect contextual information about your user's [registered devices](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-registration) and control how those registered devices are used during authentication. The device signal collection policies can collect [information](https://help.okta.com/okta_help.htm?type=oie&id=ext-ov-datatypes) about registered devices and the platforms that devices use. Device signal collection policies are part of your [authentication policies](/docs/concepts/policies/#authentication-policies) and they're closely related to your [device assurance policies](/docs/guides/device-assurance-policies).

You can use a device signal collection policy in the following use case, as an example. One of your users has a registered device with Okta Verify and another authenticator. And you have an authentication policy that requires users to have registered devices when they sign in. You can use the device signal collection policy to check for devices that are registered with Okta Verify when users sign in. And you can configure the device signal collection policy to let users sign in with their other authenticator instead of automatically using Okta Verify.

### About platforms

You can use any of the following platforms as policy settings in your device signal colleciton policies:

* `ANDROID`
* `CHROMEOS`
* `IOS`
* `MACOS`
* `WINDOWS`

See [Platform](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/createDeviceAssurancePolicy!path=1/platform&t=request).

### About registered devices

You can use any of the following types of registered devices in your device signal colleciton policies:

* [Okta Verify](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-ov)
* [Chrome Device Trust connector](https://help.okta.com/okta_help.htm?type=oie&id=ext-devices-enable-chrome)
* [Device posture IdP]()

### How to configure device signal collection policies

To configure a device signal collection policy in your org, follow these steps:

1. Create an authentication policy that checks for registered devices
1. Create a disabled device signal collection policy
1. Map the device signal collection policy to the authentication policy
1. Create a rule for the device signal collection policy
1. Review and then activate the device signal collection policy.

## Configure an authentication policy for registered devices

Use the Create a policy endpoint to create an authentication policy.

Create your own POST request body or copy the example request and input your values. Copy and paste the `id` of the response into a text editor.

### Example POST rule request

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

Use the Create a policy rule endpoint to create a rule for the authentication policy that requires devices to be registered.

Create your own POST request body or copy the example request and input your values.

### Example POST rule request

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

## Create a device signal collection policy

Use the Create a policy endpoint to create a device signal collection policy.

Create your own POST request body or copy the example request and input your values.

1. Set the following request body parameters:
   1. Enter a value for `name`.
   2. Set the type as `DEVICE_SIGNAL_COLLECTION`.
   3. Set the status of the policy as `ACTIVE`.
2. Send the `POST /api/v1/policies` request.  
3. Copy and paste the `id` of the response into a text editor. Use it in the next section.

### Create device signal collection policy request example

```json
{
    "name": "Device signal collection policy",
    "type": "DEVICE_SIGNAL_COLLECTION",
    "status": "ACTIVE"
}
```

#### Create device signal collection policy response example

{  
    "id": "rst8jpde42q54pj090g7",  
    "status": "ACTIVE",  
    "name": "Device signal collection policy",  
    "priority": 1,  
    "system": false,  
    "conditions": null,  
    "created": "2025-06-05T18:52:21.000Z",  
    "lastUpdated": "2025-06-05T18:52:21.000Z",  
    "\_links": {  
        "mappings": {  
            "href": "https://thomascavanagh-oie.trexcloud.com/api/v1/policies/rst8jpde42q54pj090g7/mappings",  
            "hints": {  
                "allow": \[  
                    "GET",  
                    "POST"  
                \]  
            }  
        },  
        "self": {  
            "href": "https://thomascavanagh-oie.trexcloud.com/api/v1/policies/rst8jpde42q54pj090g7",  
            "hints": {  
                "allow": \[  
                    "GET",  
                    "PUT",  
                    "DELETE"  
                \]  
            }  
        },  
        "rules": {  
            "href": "https://thomascavanagh-oie.trexcloud.com/api/v1/policies/rst8jpde42q54pj090g7/rules",  
            "hints": {  
                "allow": \[  
                    "GET",  
                    "POST"  
                \]  
            }  
        },  
        "deactivate": {  
            "href": "https://thomascavanagh-oie.trexcloud.com/api/v1/policies/rst8jpde42q54pj090g7/lifecycle/deactivate",  
            "hints": {  
                "allow": \[  
                    "POST"  
                \]  
            }  
        }  
    },  
    "type": "DEVICE\_SIGNAL\_COLLECTION"  
}

### Create a device signal collection policy rule

Use the Create a policy rule endpoint to create a device signal collection policy rule.

Create your own POST request body or copy the example request and input your values.

1. Set the following request body parameters:  
   1. Enter a value for name.  
   2. Set the type as DEVICE\_SIGNAL\_COLLECTION.  
   3. Set the deviceContextProviders.key as OKTA\_VERIFY  
      1. This means that the rule applies to devices with Okta Verify.  
2. Send the POST /api/v1/policies request.  
3. Copy and paste the id of the response into a text editor. Use it in the next section.  

{  
name: Device signal collection rule  
        actions:  
          deviceSignalCollection:  
            deviceContextProviders: \[  
              {  
                key: OKTA\_VERIFY,  
                allowUserIdentification: ALLOW  
              },  
              {  
                key: DEVICE\_POSTURE\_IDP,  
                id: 0oa159mE9aOSpCwmr0g4  
              }  
            \]  
        type: DEVICE\_SIGNAL\_COLLECTION  
}

