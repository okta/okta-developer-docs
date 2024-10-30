---
title: Configure multiple identifiers
excerpt: Learn how to configure multiple identifiers for user sign-in
layout: Guides
---

<ApiLifecycle access="ie" />

<ApiLifecycle access="ea" />


This guide explains how to configure the multiple identifiers feature using the Policy API.

> **Note:** This document is written for Okta Identity Engine. If you are using Okta Classic Engine, consider upgrading to Identity Engine. See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

---

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [Groups created](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/) in your org
* A configured [network zone](https://help.okta.com/okta_help.htm?id=ext_Security_Network)

---

## About multiple identifiers

Identifiers are attributes that a user can enter instead of their username when they sign in. They work in authentication, recovery, and unlock flows, and in self-service registration flows if you add them to the profile enrollment form. You can select two unique custom attributes in the Okta user profile to serve as identifiers, as long as they're read-write (or read only), non-sensitive, and have a string data type.

### Use cases

You can use identifiers in standard authentication flows, but they're especially useful in hub-and-spoke orgs and for orgs with federated authentication. Consider the following scenarios.

* Users are in directories for both your corporate org (hub) and a specialized business unit (spoke). They authenticate with a username in the business unit, but they use an employee number for the corporate org. Configure both of these methods as identifiers so that users can sign in to the hub and the spoke with either ID.
* Users attempt to access your org through an app and are then redirected to Okta for authentication. If the app sign-in page requires a different attribute than Okta, you can configure them both as identifiers.

### User experience

In a hub-and-spoke flow, users go to the hub org sign-in page. They're prompted to enter any of the identifiers that you configured. The spoke org serves as the identity provider in this flow, so its preferred identifier should be represented in the entry field. Okta evaluates their entry according to your priority setting, to ensure that users who may have the same attribute for different identifiers are correctly authenticated.

In a standard authentication flow, users go to an app's sign-in page and are prompted to authenticate with any of the identifiers that you configured. As in the hub-and-spoke flow, Okta evaluates their entry according to your priority setting.

Keep in mind that multiple identifiers don't change an app's MFA requirements or the sequence of the sign-in flow. The settings you configure in your global session and authentication policies determine whether users are prompted for the identifier or password first.

See [Sign-in flows](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-sign-in-flows).

### Configuration tasks

Identifiers are configured at the app level, in the user profile policy. This means that you can't set them for the entire org, but you can apply the same user profile policy to all or multiple apps in your org. Follow this workflow to set up identifiers and ensure that your users understand how they work.

1. Create a user profile policy
2. Add identifiers to a user profile policy
3. Create a custom profile enrollment form
4. Customize your sign-in page
5. Add apps to a user profile policy

## Create a user profile policy

GET /api/v1/policies?type=PROFILE_ENROLLMENT

https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy


{
        "id": "rstknzs7qffuAXElo5d7",
        "status": "ACTIVE",
        "name": "Documentation",
        "priority": 1,
        "system": false,
        "conditions": null,
        "created": "2024-10-26T09:18:12.000Z",
        "lastUpdated": "2024-10-26T09:18:12.000Z",
        "_links": {
            "mappings": {
                "href": "https://dev-71245668.okta.com/api/v1/policies/rstknzs7qffuAXElo5d7/mappings",
                "hints": {
                    "allow": [
                        "GET",
                        "POST"
                    ]
                }
            },
            "self": {
                "href": "https://dev-71245668.okta.com/api/v1/policies/rstknzs7qffuAXElo5d7",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT",
                        "DELETE"
                    ]
                }
            },
            "rules": {
                "href": "https://dev-71245668.okta.com/api/v1/policies/rstknzs7qffuAXElo5d7/rules",
                "hints": {
                    "allow": [
                        "GET",
                        "POST"
                    ]
                }
            },
            "deactivate": {
                "href": "https://dev-71245668.okta.com/api/v1/policies/rstknzs7qffuAXElo5d7/lifecycle/deactivate",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            }
        },
        "type": "PROFILE_ENROLLMENT"
    }


## Add identifiers to a user profile policy




## Create a custom profile enrollment form




## Customize your sign-in page




## Add apps to a user profile policy





## See also

