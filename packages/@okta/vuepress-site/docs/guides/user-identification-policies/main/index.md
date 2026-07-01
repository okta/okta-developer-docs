---
title: Configure a user identification policy
excerpt: How to use the Policies API to manage user identification policies
layout: Guides
---

<ApiLifecycle access="ie" /></br><ApiLifecycle access="ea" />

This guide describes how to use the [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/) to manage user identification policies in your org. Use [System Log query](/docs/reference/system-log-query/) to monitor policy evaluation events.

> **Note:** This document is only for Okta Identity Engine. See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

---

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* The user identification policy feature enabled for your org
* [Okta Verify configured](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-ov) as an authenticator, with Okta FastPass enabled
* An existing [app sign-in policy](/docs/concepts/policies/#app-sign-in-policies) for the app that you want to configure
* A test [user account](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-add-users)
* A test [group](https://help.okta.com/okta_help.htm?type=oie&id=usgp-groups-create) in your org that the test user is added to

---

## About user identification policies

A user identification policy controls the pre-identification experience on the [Sign-In Widget](/docs/guides/custom-widget/) for an app. It applies before a user enters their username. Currently, the policy controls whether the **Sign in with Okta FastPass** button appears on the Sign-In Widget.

Previously, the **Sign in with Okta FastPass** button was an org-wide authenticator setting. The user identification policy moves this control to a per-app policy, so that you can show or hide the button for each app.

### Relationship to app sign-in policies

Each user identification policy maps one-to-one to an [app sign-in policy](/docs/concepts/policies/#app-sign-in-policies). Okta creates, maps, clones, and removes the user identification policy automatically with its app sign-in policy. You can't create, activate, update, deactivate, remove, map, or clone a user identification policy directly.

If you call one of those operations directly, Okta returns the following error:

`This operation isn't supported in the user identification policy.`

You manage only the **rules** on the policy. You can create, update, and delete rules, but you can't deactivate or remove the default rule.

To apply different button settings to different apps, create separate sign-in policies and assign apps to each one. Each sign-in policy automatically gets its own user identification policy with its own default rule. See [Configure app sign-in policies](/docs/guides/configure-signon-policy/main/).

> **Note:** The user identification policy is closely related to the [device signal collection policy](/docs/guides/device-signal-collection-policies/), which also works as part of your app sign-in policies.

### Rule conditions and settings

User identification policy rules support [platform](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule!path=1/conditions/platform&t=request) and [network](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule!path=1/conditions/network&t=request) conditions only.

Each rule sets `actions.userIdentification.settings.showSignInWithOV` to one of the following values:

* `ALWAYS`: Show the **Sign in with Okta FastPass** button on the Sign-In Widget.
* `NEVER`: Hide the **Sign in with Okta FastPass** button on the Sign-In Widget.

> **Notes:**
>
> * The `showSignInWithOV` field name is intentional. It matches the existing naming convention in the [Authenticators API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/authenticator/other/listauthenticatormethods#other/listauthenticatormethods/t=response&c=200&path=&d=4/settings/showsigninwithov), where `OV` refers to Okta Verify. The name didn't change when this passwordless sign-in method was rebranded as Okta FastPass.
> * You can only set `showSignInWithOV` to `ALWAYS` when Okta Verify is configured and Okta FastPass is enabled. Otherwise, Okta returns the following error: `This rule can't be saved. Okta FastPass isn't enabled for this org. To save this rule, enable Okta FastPass in the Okta Verify authenticator.`

### How user identification works at sign-in

The following diagram shows how Okta evaluates the user identification policy to decide whether to show the **Sign in with Okta FastPass** button.

![Sequence diagram showing Okta resolve the app sign-in policy, find the linked user identification policy, evaluate its rules against platform and network conditions, check the global gate against the Okta Verify authenticator, and return the Sign in with Okta FastPass button decision to the Sign-In Widget.](/img/user-identification-policies/uip-evaluation-sequence.svg)

### How to configure a user identification policy

To configure a user identification policy in your org, follow these steps:

1. [Find the user identification policy](#find-the-user-identification-policy) for your app sign-in policy.
1. [Create a user identification policy rule](#create-a-user-identification-policy-rule) to show or hide the button.
1. [Update a user identification policy rule](#update-a-user-identification-policy-rule) when you need to change the setting.
1. [Review the System Log](#review-the-system-log) to confirm that the policy is evaluated.

## Find the user identification policy

Use the [List all policies](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/listPolicies) endpoint to find the user identification policy for your app.

1. Set the `type` query parameter to `USER_IDENTIFICATION`.
1. Send the `GET /api/v1/policies?type=USER_IDENTIFICATION` request.
1. In the response, find the policy for your app and copy its `id` into a text editor.

### List user identification policies response example

```json
[
    {
        "type": "USER_IDENTIFICATION",
        "id": "policyId",
        "status": "ACTIVE",
        "name": "Policy name",
        "description": "Policy description",
        "priority": 1,
        "system": false,
        "conditions": null,
        "created": "2025-04-25T17:35:02.000Z",
        "lastUpdated": "2025-04-25T17:35:02.000Z",
        "_links": {
            "self": {
                "href": "https://{yourOktaDomain}/api/v1/policies/{policyId}",
                "hints": {
                    "allow": [
                        "GET"
                    ]
                }
            },
            "rules": {
                "href": "https://{yourOktaDomain}/api/v1/policies/{policyId}/rules",
                "hints": {
                    "allow": [
                        "GET",
                        "POST"
                    ]
                }
            },
            "mappings": {
                "href": "https://{yourOktaDomain}/api/v1/policies/{policyId}/mappings",
                "hints": {
                    "allow": [
                        "GET"
                    ]
                }
            }
        }
    }
]
```

### Find the policy from its app sign-in policy

You can also find a user identification policy from its mapped app sign-in policy. Each app sign-in policy (`ACCESS_POLICY`) includes a `userIdentificationPolicy` link to its linked user identification policy.

1. Set the `type` query parameter to `ACCESS_POLICY`.
1. Send the `GET /api/v1/policies?type=ACCESS_POLICY` request.
1. In the response, find the app sign-in policy for your app.
1. Follow the `_links.userIdentificationPolicy.href` to the linked user identification policy.

### List app sign-in policies response example

```json
[
    {
        "type": "ACCESS_POLICY",
        "id": "appSignOnPolicyId",
        "status": "ACTIVE",
        "name": "App sign-in policy",
        "description": "App sign-in policy description",
        "priority": 1,
        "system": false,
        "conditions": null,
        "created": "2025-04-25T17:35:02.000Z",
        "lastUpdated": "2025-04-25T17:35:02.000Z",
        "_links": {
            "self": {
                "href": "https://{yourOktaDomain}/api/v1/policies/{appSignOnPolicyId}",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT",
                        "DELETE"
                    ]
                }
            },
            "rules": {
                "href": "https://{yourOktaDomain}/api/v1/policies/{appSignOnPolicyId}/rules",
                "hints": {
                    "allow": [
                        "GET",
                        "POST"
                    ]
                }
            },
            "mappings": {
                "href": "https://{yourOktaDomain}/api/v1/policies/{appSignOnPolicyId}/mappings",
                "hints": {
                    "allow": [
                        "GET",
                        "POST"
                    ]
                }
            },
            "userIdentificationPolicy": {
                "href": "https://{yourOktaDomain}/api/v1/policies/{policyId}",
                "hints": {
                    "allow": [
                        "GET"
                    ]
                }
            },
            "deactivate": {
                "href": "https://{yourOktaDomain}/api/v1/policies/{appSignOnPolicyId}/lifecycle/deactivate",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            }
        },
        "_embedded": {
            "resourceType": "APP"
        }
    }
]
```

### Review the default rule

Each user identification policy includes a default rule. Use the [List all policy rules](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/listPolicyRules) endpoint to review it.

1. In the path parameters, set the user identification policy `id` as the `policyId`.
1. Send the `GET /api/v1/policies/{policyId}/rules` request.

### List user identification policy rules response example

```json
[
    {
        "id": "ruleId",
        "status": "ACTIVE",
        "name": "Default Rule",
        "priority": 0,
        "created": "2025-04-25T17:35:02.000Z",
        "lastUpdated": "2025-04-25T17:35:02.000Z",
        "system": false,
        "conditions": {
            "network": {
                "connection": "ANYWHERE"
            },
            "platform": {
                "include": [
                    {
                        "type": "DESKTOP",
                        "os": {
                            "type": "WINDOWS"
                        }
                    }
                ]
            }
        },
        "actions": {
            "userIdentification": {
                "settings": {
                    "showSignInWithOV": "ALWAYS"
                }
            }
        },
        "type": "USER_IDENTIFICATION"
    }
]
```

## Create a user identification policy rule

In this example, create a rule that shows the **Sign in with Okta FastPass** button for users on the `WINDOWS` desktop platform from any network.

Use the [Create a policy rule](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule) endpoint to create a user identification policy rule.

Create your own POST request body or copy the [example request](#create-a-user-identification-policy-rule-request-example) and input your values.

1. In the path parameters, set the user identification policy `id` as the `policyId`.
1. Set the following request body parameters:
   * Enter a value for `name`.
   * Set the `type` as `USER_IDENTIFICATION`.
   * Set `conditions.network.connection` as `ANYWHERE`.
   * Include `WINDOWS` as a `DESKTOP` platform condition.
   * Set `actions.userIdentification.settings.showSignInWithOV` as `ALWAYS`.
1. Send the `POST /api/v1/policies/{policyId}/rules` request.

### Create a user identification policy rule request example

```json
{
    "name": "User Identification Rule",
    "conditions": {
        "network": {
            "connection": "ANYWHERE"
        },
        "platform": {
            "include": [
                {
                    "type": "DESKTOP",
                    "os": {
                        "type": "WINDOWS"
                    }
                }
            ]
        }
    },
    "actions": {
        "userIdentification": {
            "settings": {
                "showSignInWithOV": "ALWAYS"
            }
        }
    },
    "type": "USER_IDENTIFICATION"
}
```

### Create a user identification policy rule response example

```json
{
    "id": "ruleId",
    "status": "ACTIVE",
    "name": "User Identification Rule",
    "priority": 0,
    "created": "2025-04-25T17:35:02.000Z",
    "lastUpdated": "2025-04-25T17:35:02.000Z",
    "system": false,
    "conditions": {
        "network": {
            "connection": "ANYWHERE"
        },
        "platform": {
            "include": [
                {
                    "type": "DESKTOP",
                    "os": {
                        "type": "WINDOWS"
                    }
                }
            ]
        }
    },
    "actions": {
        "userIdentification": {
            "settings": {
                "showSignInWithOV": "ALWAYS"
            }
        }
    },
    "type": "USER_IDENTIFICATION",
    "_links": {
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/policies/{policyId}/rules/{ruleId}",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        }
    }
}
```

## Update a user identification policy rule

To change a rule, update it with the [Replace a policy rule](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/replacePolicyRule) endpoint. In this example, update the rule to hide the **Sign in with Okta FastPass** button.

Create your own PUT request body or copy the [example request](#update-a-user-identification-policy-rule-request-example) and input your values.

1. In the path parameters, set the user identification policy `id` as the `policyId` and the rule `id` as the `ruleId`.
1. Set `actions.userIdentification.settings.showSignInWithOV` as `NEVER`.
1. Send the `PUT /api/v1/policies/{policyId}/rules/{ruleId}` request.

### Update a user identification policy rule request example

```json
{
    "name": "User Identification Rule",
    "conditions": {
        "network": {
            "connection": "ANYWHERE"
        },
        "platform": {
            "include": [
                {
                    "type": "DESKTOP",
                    "os": {
                        "type": "WINDOWS"
                    }
                }
            ]
        }
    },
    "actions": {
        "userIdentification": {
            "settings": {
                "showSignInWithOV": "NEVER"
            }
        }
    },
    "type": "USER_IDENTIFICATION"
}
```

### Update a user identification policy rule response example

```json
{
    "id": "ruleId",
    "status": "ACTIVE",
    "name": "User Identification Rule",
    "priority": 0,
    "created": "2025-04-25T17:35:02.000Z",
    "lastUpdated": "2025-04-25T17:35:02.000Z",
    "system": false,
    "conditions": {
        "network": {
            "connection": "ANYWHERE"
        },
        "platform": {
            "include": [
                {
                    "type": "DESKTOP",
                    "os": {
                        "type": "WINDOWS"
                    }
                }
            ]
        }
    },
    "actions": {
        "userIdentification": {
            "settings": {
                "showSignInWithOV": "NEVER"
            }
        }
    },
    "type": "USER_IDENTIFICATION",
    "_links": {
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/policies/{policyId}/rules/{ruleId}",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        }
    }
}
```

## Review the System Log

Review your System Log events to confirm that your user identification policy is evaluated correctly. The user identification policy rule is included as a target of the `policy.evaluate_sign_on` event type. See [System Log query](/docs/reference/system-log-query/) and [Event Types](/docs/reference/api/event-types/).

## Test your policy with policy simulation

You can use the [policy simulation](/docs/guides/policy-simulation/main/) endpoint to test how your user identification policy rules evaluate for a given user and device context before you go live. Policy simulation returns the matched rule and the resulting `showSignInWithOV` value. See [Test your policies with access simulations](/docs/guides/policy-simulation/main/).

## Next steps

* **[Configure app sign-in policies](/docs/guides/configure-signon-policy/main/)** — Create additional sign-in policies and assign apps to each one. Each sign-in policy automatically gets its own user identification policy, so you can control the **Sign in with Okta FastPass** button independently per app or group of apps.
* **[Multibrand architecture](/docs/concepts/multibrand-architecture/)** — If you're building a multibrand experience, assign each app to its own sign-in policy to control the FastPass button per brand independently.
* **[Device signal collection policies](/docs/guides/device-signal-collection-policies/)** — A closely related policy that also works with app sign-in policies to control the pre-identification experience on the Sign-In Widget.
* **[Customize the Sign-In Widget](/docs/guides/custom-widget/main/)** — Further customize the sign-in experience for your app.
* **[System Log query](/docs/reference/system-log-query/)** — Query System Log events to monitor user identification policy evaluation in production.
