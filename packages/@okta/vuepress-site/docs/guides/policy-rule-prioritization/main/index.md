---
title: Policy and rule prioritization
excerpt: Learn how to reorder policies and rules
layout: Guides
---

Learn how to reorder your policies and rules sequentially from the top down to avoid an undesired priority state.

---

#### Learning outcomes

* Create a policy and rule.
* Delete a rule.
* Reorder policy rules correctly.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* Access to and familiarity with the [Okta Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy).

---

## Overview

In Okta, policies and their associated rules are evaluated based on an assigned priority. The rule with priority 1 is evaluated first. If its conditions aren't met, Okta moves to priority 2, and so on. When managing these priorities through the Okta Policies API, you need to perform any reordering in a sequential, top-down strategy (P1 -> PN).

### Key concepts

* **Automatic shifting**: When you create a policy or a rule and assign a priority that’s already in use by another, Okta automatically shifts the existing rule (and those below it) down by one increment.
* **The** deletion gap**: When you delete a rule or policy, Okta doesn’t automatically shift the list. This leaves a gap in the priority sequence (for example, priorities 2, 3, and 4 exist, but 1 is empty).
* **The Catch-all Rule**: Every policy includes a system-level Catch-all Rule (priority 99) that ensures a final outcome if no other rules match.

### Why top-down order matters

Performing reordering requests in a random or bottom-up sequence often leads to an undesired state. Because Okta shifts existing rules to accommodate new priority assignments, a middle-of-the-stack update can displace rules you haven't yet reordered, resulting in a fragmented and unpredictable security logic.

### Differences in policy priority shifts

The priority order of some policies and rules and how they are reordered are addressed differently by Okta. The following table explains how Okta addresses the priority for each policy and its rules.

> **Note**: How Okta handles the policies on the right side of the table is subject to change and may become more inlinewith the policies on the left (where priorities shift automatically) in the future.

| Policies v1                                | Policies v2                                       |
|--------------------------------------------|---------------------------------------------------|
| MFA_ENROLL<br>SIGN_ON<br>IDP_DISCOVERY<br>PASSWORD | ACCESS_POLICY<br>DEVICE_SIGNAL_COLLECTION<br>PROFILE_ENROLLMENT<br>POST_AUTH_SESSION<br>ENTITY_RISK  |
| Priorities start at 1. | Priorities start at 0. |
| Priorities are sequential. | Priorities are allowed to have gaps. |
| Delete requests result in automatic shifts of priority order. | Delete requests don’t result in automatic shifts of priority order. |
| Creates/Updates to priorities of existing values result in shifts of order between old and new. | Creates/Updates to priorities of existing vavlues result in shifts between old and new until a shift is no longer needed (since gaps are allowed).|

## Create the policy and rules

In this section, you learn to create an app sign-in policy and then create four rules to learn how to successfully reorder rule priority after deleting a rule.

> **Note**: All API request and response examples are truncated for brevity.

### Create a policy

Use the [Create a policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy) operation of the Policies API to create a generic app sign-in policy.

**Example request**

```shell
    curl --request POST \
        --url https://{yourOktaDomain}/api/v1/policies \
    --header 'accept: application/json' \
    --header 'content-type: application/json' \
    --header 'authorization: SSWS 00rtxyX...' \
    --data '{
        "type": "ACCESS_POLICY",
        "name": "New App Sign-In Policy",
        "description": "A new app sign-in policy for testing",
        "status": "ACTIVE",
        "conditions": null
    }'
```

**Example response**

```JSON
    {
        "id": "{policyId}",
        "status": "ACTIVE",
        "name": "New App Sign-In Policy",
        "description": "A new app sign-in policy for testing",
        "system": false,
        "conditions": null,
        ......
        "type": "ACCESS_POLICY"
    }
```

### Create the rules

In this example scenario, create four basic rules for the policy. You need the policy `id`. Use the [Create a policy rule](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule) operation of the Policies API.

After you create the first rule, use the same request and change the name to Rule Two and the `priority` parameter value to `2`. Then, repeat for rules three and four.

> **Note**: If you don’t include a priority value, Okta assumes that you want the rule at the bottom of the rule list (excluding the Catch-all Rule).

**Example request**

```shell
  curl --request POST \
  --url https://{yourOktaDomain}/api/v1/policies/{policyId}/rules \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header 'authorization: SSWS 00rtxyXw...' \
  --data '{
  "system": false,
  "type": "ACCESS_POLICY",
  "name": "Rule 6",
  "conditions": {
     "riskScore": {
      "level": "ANY"
    },
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
  "actions": {
    "appSignOn": {
      "access": "ALLOW",
      "verificationMethod": {
        "factorMode": "1FA",
        "reauthenticateIn": "PT2H",
        "type": "ASSURANCE",
        "constraints": [
          {
            "knowledge": {
              "types": [
                "password"
              ]
            }
          }
        ]
      }
    }
  }
}
```

**Example response**

```JSON
{
    "id": "{ruleId}",
    "status": "ACTIVE",
    "name": "Rule 1",
    "priority": 1,
    "created": "2026-01-08T19:47:02.000Z",
    "lastUpdated": "2026-01-08T19:47:02.000Z",
    "system": false,
    "conditions": {
        "people": {
            "users": {
                "exclude": []
            }
        },
        "network": {
            "connection": "ANYWHERE"
        },
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
            ],
            "exclude": []
        },
        "riskScore": {
            "level": "ANY"
        },
        "userType": {
            "include": [],
            "exclude": []
        }
    },
    "actions": {
        "appSignOn": {
            "access": "ALLOW",
            "verificationMethod": {
                "factorMode": "1FA",
                "type": "ASSURANCE",
                "reauthenticateIn": "PT2H",
                "constraints": [
                    {
                        "knowledge": {
                            "required": true,
                            "types": [
                                "password"
                            ]
                        }
                    }
                ]
            },
            "keepMeSignedIn": {
                "postAuth": "NOT_ALLOWED"
            }
        }
    },
   "type": "ACCESS_POLICY"
}
```

There are now four rules for your app sign-in policy. The following is the current state of the rules in your policy:

**Rule One**: Priority 1
**Rule Two**: Priority 2
**Rule Three**: Priority 3
**Rule Four**: Priority 4
Gaps
**Catch-all Rule** - Priority 99

## Reorder rules from the top down

In this example scenario, delete Rule One. You need the rule `id` to delete it. Use the [Delete a policy rule](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/deletePolicyRule) operation of the Policies API.

**Example request**

```shell
    curl --request DELETE
    --url https://{yourOktaDomain}/api/v1/policies/{policyId}/rules/{ruleId} \
    --header 'accept: application/json' \
    --header 'content-type: application/json' \
    --header 'authorization: SSWS 00rtxyX...' \
```

Now that Rule One is deleted, your expectation may be that the rule priorities automatically shift up with Rule Two as Priority 1, Rule Three as Priority 2, and Rule Four as Priority 3. However, application sign-in policy rules maintain their existing priority and leave a gap where Rule One was. The following is the current state of the rule priorites in your policy:

No Priority 1 (gap)
**Rule Two**: Priority 2
**Rule Three**: Priority 3
**Rule Four**: Priority 4
Gaps
**Catch-all Rule**: Priority 99

You can verify this by performing a [List all policy rules](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/listPolicyRules) operation to view the current priorities for the policy rules.

**Example request**

```SHELL
    curl --request GET
    --url https://{yourOktaDomain}/api/v1/policies/{policyId}/rules \
    --header 'accept: application/json' \
    --header 'content-type: application/json' \
    --header 'authorization: SSWS 00rtxyXw...' \
```

**Example response**

```JSON
{
    [
    {
        "id": "rul8yibgo3JTPvmLz0g7",
        "status": "ACTIVE",
        "name": "Rule 1",
        "priority": 1,
        "created": "2026-01-09T22:16:38.000Z",
        "lastUpdated": "2026-01-09T22:16:38.000Z",
        "system": false,
        ...
    },
    {
        "id": "rul8yias7nJ3Ik2PK0g7",
        "status": "ACTIVE",
        "name": "Rule 2",
        "priority": 2,
        "created": "2026-01-09T22:16:59.000Z",
        "lastUpdated": "2026-01-09T22:16:59.000Z",
        "system": false,
        ...
    },
    {
        "id": "rul8yibgoaOLrnVYb0g7",
        "status": "ACTIVE",
        "name": "Rule 3",
        "priority": 3,
        "created": "2026-01-09T22:17:17.000Z",
        "lastUpdated": "2026-01-09T22:17:17.000Z",
        "system": false,
       ...
    },
    {
        "id": "rul8yi9ctxGSJuKv10g7",
        "status": "ACTIVE",
        "name": "Rule 4",
        "priority": 4,
        "created": "2026-01-09T22:19:06.000Z",
        "lastUpdated": "2026-01-09T22:19:06.000Z",
        "system": false,
        ...
    },
   {
        "id": "rul8ydeltgh2cpnHt0g7",
        "status": "ACTIVE",
        "name": "Catch-all Rule",
        "priority": 99,
        "created": "2026-01-06T22:45:19.000Z",
        "lastUpdated": "2026-01-06T22:45:19.000Z",
        "system": true,
        "conditions": null,
        . . .
    }
    ]
}
```

### Rule reorder

Begin at the top with Rule Two and perform a [Replace a policy rule](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/replacePolicyRule) operation, changing the `priority` parameter from `2` to `1`.

**Example request**

```JSON
curl --request PUT
--url https://{yourOktaDomain}/api/v1/policies/{policyId}/rules/{ruleId} \
--header 'accept: application/json' \
--header 'content-type: application/json' \
--header 'authorization: SSWS 00rtxyXw...' \
--data '{
    "id": "{ruleId}",
    "status": "ACTIVE",
    "name": "Rule 2",
    "priority": 1,
    "created": "2026-01-08T19:50:43.000Z",
    "lastUpdated": "2026-01-08T19:50:43.000Z",
    "system": false,
    "conditions": {
        "people": {
            "users": {
                "exclude": []
            }
        },
        "network": {
            "connection": "ANYWHERE"
        },
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
            ],
            "exclude": []
        },
        "riskScore": {
            "level": "ANY"
        },
        "userType": {
            "include": [],
            "exclude": []
        }
    },
    "actions": {
        "appSignOn": {
            "access": "ALLOW",
            "verificationMethod": {
                "factorMode": "1FA",
                "type": "ASSURANCE",
                "reauthenticateIn": "PT2H",
                "constraints": [
                    {
                        "knowledge": {
                            "required": true,
                            "types": [
                                "password"
                            ]
                        }
                    }
                ]
            },
            "keepMeSignedIn": {
                "postAuth": "NOT_ALLOWED"
            }
        }
    },
    "type": "ACCESS_POLICY"
}'
```

The priority of Rule Three remains the same at priority 3. There is now a gap between Rule Two at priority 1 and Rule Three at priority 3. The following is the current state of the rule priorites in your policy:

**Rule Two**: Priority 1
Gap
**Rule Three** Priority 3
**Rule Four** Priority 4
Gaps
**Catch-all Rule** Priority 99

You can verify this by performing a [List all policy rules](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/listPolicyRules) operation to view the current priorities for the policy rules.

Update the priority for rules three and four by repeating the previous steps. When you finish, the following should be the current state of the rule priorities in your policy:

**Rule Two**: Prority 1
**Rule Three**: Priority 2
**Rule Four**: Priority 3
Gaps
**Catch-all Rule**: Priority 99

You can verify this by performing a [List all policy rules](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/listPolicyRules) operation to view the current priorities for the policy rules.

## Non-sequential reordering and priority shifting

The following is an example of what happens when you don't reorder the rules from the top down. Reordering operations that are sent in a random order result in an undesired state due to priority shifts between requests.

There are five rules for your app sign-in policy. The following is the current state of the rule priorites in your policy:

**Rule One**: Priority 1
**Rule Two**: Priority 2
**Rule Three**: Priority 3
**Rule Four**: Priority 4
**Rule Five**: Priority 5
Gaps
**Catch all rule**: Priority 99

You want to reorder your rules to the following order:

**Rule One** - Priority 2
**Rule Two** - Priority 3
**Rule Three** - Priority 1
Rules Four and Five you want to remain where they are with priorities 4 and 5, and the Catch-all Rule at priority 99.

You update the priority of rule 3 to 1 and update the priority rule 2 to 3. Then, you update the priority of rule 1 to 2. You leave rules 4 and 5 alone so that they remain at their current priority state. The following is the current state of the rule priorites in your policy:

**Rule Three**: Priority 1
**Rule One**: Priority 2
Gap
**Rule Two**: Priority 4
**Rule Four**: Priority 5
**Rule Five**: Priority 6
Gaps
**Catch-all Rule**: Priority 99

To avoid this cascading shift, always treat priority reordering as a top-down synchronization. By updating rules in order from priority 1 to priority N, you ensure that each subsequent request accounts for the current state of the list, preventing the drift seen in the example above.

> **Note**: The Okta Admin Console always shows P1 to PN priority values and doesn’t reflect shifts or gaps.

## Conclusion

Mastering the differences in rule prioritization for the Okta policies is fundamental to maintaining a predictable and secure identity environment. By following a top-down synchronization strategy, you ensure that your security logic remains consistent and free from the cascading shifts that occur during non-sequential API updates.
