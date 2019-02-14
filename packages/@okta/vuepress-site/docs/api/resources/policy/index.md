---
title: Policy
category: management
redirect_from: /docs/getting_started/policy.html
---

# Policy API

The Okta Policy API enables an Administrator to perform policy and policy rule operations.  The policy framework is used by Okta to control rules and settings that govern, among other things, user session lifetime, whether multi-factor authentication is required when logging in, what MFA factors may be employed, password complexity requirements, what types of self-service operations are permitted under various circumstances, and what identity provider to route users to.

Policy settings for a particular policy type, such as Sign On Policy, consist of one or more Policy objects, each of which contains one or more Policy Rules.  Policies and rules contain conditions that determine whether they are applicable to a particular user at a particular time.

The policy API supports the following **policy operations**:

* Get all policies of a specific type
* Create, read, update, and delete a policy
* Activate and deactivate a policy

The policy API supports the following **rule operations**:

* Get all rules for a policy
* Create, read, update, and delete a rule for a policy
* Activate and deactivate a rule

## Getting Started

Explore the Policy API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/0dfd99e544a12ea3db5b)

## Policy API Operations

### Get a Policy


<ApiOperation method="get" url="/api/v1/policies/${policyId}" />

#### Request Parameters

The policy ID described in the [Policy Object](#PolicyObject) is required.

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/policies/{policyId}"
```

##### Response Example


HTTP 200:
<a href="#PolicyObject">Policy Object</a>

### Get a Policy with Rules


<ApiOperation method="get" url="/api/v1/policies/${policyId}?expand=rules" />

#### Request Parameters

* The policy ID described in the [Policy Object](#PolicyObject) is required.
* The `expand=rules` query parameter returns up to twenty rules for the specified policy. If the policy has more than 20 rules, this request returns an error.

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/policies/{policyId}?expand=rules"
```

##### Response Types


HTTP 200:
<a href="#PolicyObject">Policy Object</a>

Included as embedded objects, one or more <a href="#rules">Policy Rules</a>.

### Get All Policies by Type


<ApiOperation method="get" url="/api/v1/policies?type=${type}" />

#### Request Parameters

The policy type described in the [Policy Object](#PolicyObject) is required.

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/policies?type={type}"
```

##### Response Types


HTTP 200:
<a href="#PolicyObject">Policy Object</a>
HTTP 204:
<a href="#PolicyObject">Policy Object</a>

### Delete Policy


<ApiOperation method="delete" url="/api/v1/policies/${policyId}" />

#### Request Parameters

The policy ID described in the [Policy Object](#PolicyObject) is required.

##### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/policies/{policyId}"
```

##### Response Types


HTTP 204:
*No Content*

### Update a Policy


<ApiOperation method="put" url="/api/v1/policies/${policyId}" />

#### Request Parameters

The policy ID described in the [Policy Object](#PolicyObject) is required.

##### Request Example


```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "OKTA_SIGN_ON",
  "id": "00plrilJ7jZ66Gn0X0g3",
  "status": "ACTIVE",
  "name": "Default Policy",
  "description": "The default policy applies in all situations if no other policy applies.",
  "priority": 1,
  "conditions": {
    "people": {
      "groups": {
        "include": [
          "00glr9dY4kWK9k5ZM0g3"
        ]
      }
    }
  }
}' "https://{yourOktaDomain}/api/v1/policies/{policyId}"
```

##### Response Types


HTTP 200:
<a href="#PolicyObject">Policy Object</a>

### Create a Policy


<ApiOperation method="post" url="/api/v1/policies" />

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "OKTA_SIGN_ON",
  "status": "ACTIVE",
  "name": "Default Policy",
  "description": "The default policy applies in all situations if no other policy applies.",
  "conditions": {
    "people": {
      "groups": {
        "include": [
          "00glr9dY4kWK9k5ZM0g3"
        ]
      }
    }
  }
}' "https://{yourOktaDomain}/api/v1/policies"
```

##### Response Types


HTTP 204:
<a href="#PolicyObject">Policy Object</a>

### Activate a Policy


<ApiOperation method="post" url="/api/v1/policies/${policyId}/lifecycle/activate" />

#### Request Parameters

The policy id described in the [Policy Object](#PolicyObject) is required.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/policies/{policyId}/lifecycle/activate"
```

##### Response Types


HTTP 204:
*No Content is returned when the activation is successful.*

### Deactivate a Policy


<ApiOperation method="post" url="/api/v1/policies/${policyId}/lifecycle/deactivate" />

#### Request Parameters

The policy ID described in the [Policy Object](#PolicyObject) is required.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/policies/{policyId}/lifecycle/deactivate"
```

##### Response Types


HTTP 200:
*No Content is returned when the deactivation is successful.*

## Rules Operations

### Get Policy Rules


<ApiOperation method="get" url="/api/v1/policies/${policyId}/rules" />

#### Request Parameters

The policy ID described in the [Policy Object](#PolicyObject) is required.

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/policies/{policyId}/rules"
```

##### Response Types


HTTP 200:
<a href="#RulesObject">Rules Object</a>

### Create a rule


<ApiOperation method="post" url="/api/v1/policies/${policyId}/rules" />

#### Request Parameters

The policy ID described in the [Policy Object](#PolicyObject) is required.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "SIGN_ON",
  "name": "New Policy Rule",
  "conditions": {
    "people": {
      "users": {
        "exclude": []
      }
    },
    "network": {
      "connection": "ZONE",
      "include": [
        "nzowdja2YRaQmOQYp0g3"
      ]
    },
    "authContext": {
      "authType": "ANY"
    }
  },
  "actions": {
    "signon": {
      "access": "ALLOW"
    }
  }
}' "https://{yourOktaDomain}/api/v1/policies/{policyId}/rules"
```

##### Response Types


HTTP 200:
<a href="#RulesObject">Rules Object</a>

### Delete a rule


<ApiOperation method="delete" url="/api/v1/policies/${policyId}/rules/${ruleId}" />

#### Request Parameters

The policy ID described in the [Policy Object](#PolicyObject) is required.

##### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/policies/{policyId}/rules/{ruleId}"
```

##### Response Types


HTTP 204:
*No Content*

### Get a rule


<ApiOperation method="get" url="/api/v1/policies/${policyId}/rules/${ruleId}" />

#### Request Parameters

The policy ID described in the [Policy Object](#PolicyObject) is required.

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/policies/{policyId}/rules/{ruleId}"
```

##### Response Types


HTTP 200:
<a href="#RulesObject">Rules Object</a>

### Update a rule


<ApiOperation method="put" url="/api/v1/policies/${policyId}/rules/${ruleId}" />

#### Request Parameters

The policy ID described in the [Policy Object](#PolicyObject) is required.

##### Request Example


```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "PASSWORD",
  "name": "My Updated Policy Rule",
  "conditions": {
    "people": {
      "users": {
        "exclude": []
      }
    },
    "network": {
      "connection": "ZONE",
      "include": [
        "nzowdja2YRaQmOQYp0g3"
      ]
    },
    "authContext": {
      "authType": "ANY"
    }
  },
  "actions": {
    "signon": {
      "access": "DENY"
    }
  }
}' "https://{yourOktaDomain}/api/v1/policies/{policyId}/rules/{ruleId}"
```

##### Response Types


HTTP 200:
<a href="#RulesObject">Rules Object</a>

### Activate A Rule


<ApiOperation method="post" url="/api/v1/policies/${policyId}/rules/${ruleId}/lifecycle/activate" />

#### Request Parameters

The policy ID described in the [Policy Object](#PolicyObject) is required.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/policies/{policyId}/rules/{ruleId}/lifecycle/activate"
```

##### Response Types


HTTP 204:
*No content*

### Deactivate A Rule


<ApiOperation method="post" url="/api/v1/policies/${policyId}/rules/${ruleId}/lifecycle/deactivate" />

#### Request Parameters

The policy ID described in the [Policy Object](#PolicyObject) is required.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/policies/{policyId}/rules/{ruleId}/lifecycle/deactivate"
```

##### Response Types


HTTP 204:
*No content*

## Policies

### Policy Evaluation

When a policy needs to be retrieved for a particular user, for example when the user attempts to log in to Okta, or when the user initiates a self-service operation, then a policy evaluation takes place.
During policy evaluation each policy of the appropriate type is considered in turn, in the order indicated by the policy priority.   Each of the conditions associated with the policy is evaluated.  If one or more of the conditions cannot be met, then the next policy in the list is considered.  If the conditions can be met, then each of the rules associated with the policy is considered in turn, in the order specified by the rule priority.  Each of the conditions associated with a given rule is evaluated.  If all of the conditions associated with a rule are met, then the settings contained in the rule and in the associated policy are applied to the user.  If none of the policy rules have conditions that can be met, then the next policy in the list is considered.

Policies that have no rules are not considered during evaluation, and will never be applied.

### Policy Types
Different policy types control settings for different operations.  All policy types share a common framework, message structure and API, but have different policy settings and rule data. The data structures specific to each policy type are discussed in the various sections below.

<a href="#OktaSignOnPolicy">Okta Sign On Policy</a>

<a href="#OktaMFAPolicy">Okta MFA Policy</a>

<a href="#GroupPasswordPolicy">Password Policy</a>

<a href="#IdPDiscoveryPolicy">IdP Discovery Policy</a>

[OAuth Authorization Policy](/docs/api/resources/authorization-servers#policy-object)

### Policy Priority and Defaults

### Default Policies

There is always a default policy created for each type of policy. The default policy applies to any users for whom other policies in the Okta org do not apply. This ensures that there is always a policy to apply to a user in all situations.

 - A default policy is required and cannot be deleted.
 - The default policy is always the last policy in the priority order. Any added policies of this type have higher priority than the default policy.
 - The default policy always has one default rule that cannot be deleted. It is always the last rule in the priority order. If you add rules to the default policy, they have a higher priority than the default rule. For information on default rules, see [Rules Model and Defaults](#RulesObject).
 - The `system` attribute determines whether a policy is created by a system or by a user.

### Policy Priorities

Policies and are ordered numerically by priority. This priority determines the order in which they are evaluated for a context match. The highest priority policy has a `priority` of 1.

For example, assume the following policies exist.

- Policy A has priority 1 and applies to members of the "Administrators" group.
- Policy B has priority 2 and applies to members of the "Everyone" group.

When policy is evaluated for a user, policy "A" will be evaluated first.  If the user is a member of the "Administrators" group then the rules associated with policy "A" will be evaluated.   If a match is found then the policy settings will be applied.
If the user is not a member of the "Administrators" group, then policy B would be evaluated.

### Policy JSON Example (Okta Sign On Policy)

```json
  {
    "type": "OKTA_SIGN_ON",
    "id": "00pmez6igjv4TYOLl0g3",
    "status": "ACTIVE",
    "name": "Sales Policy",
    "description": "Policy for Sales Department",
    "priority": 1,
    "system": false,
    "conditions": {
      "people": {
        "groups": {
          "include": [
            "00gmexWGbl9VauvTP0g3"
          ]
        }
      }
    },
    "created": "2017-01-11T18:53:00.000Z",
    "lastUpdated": "2017-01-11T18:53:00.000Z",
    "_links": {
      "self": {
        "href": "http://ed.okta1.com:1802/api/v1/policies/00pmez6igjv4TYOLl0g3",
        "hints": {
          "allow": [
            "GET",
            "PUT",
            "DELETE"
          ]
        }
      },
      "deactivate": {
        "href": "http://ed.okta1.com:1802/api/v1/policies/00pmez6igjv4TYOLl0g3/lifecycle/deactivate",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "rules": {
        "href": "http://ed.okta1.com:1802/api/v1/policies/00pmez6igjv4TYOLl0g3/rules",
        "hints": {
          "allow": [
            "GET",
            "POST"
          ]
        }
      }
    }
  }
```

### Policy Object
{: #PolicyObject }

The Policy model defines several attributes:

Parameter | Description | Data Type | Required | Default
| --- | --- | --- | ---
id | Identifier of the policy | String | No | Assigned
type | Specifies the [type of policy](#policy-types). Valid values: `OKTA_SIGN_ON`, `PASSWORD`, `MFA_ENROLL`, `OAUTH_AUTHORIZATION_POLICY`, `IDP_DISCOVERY` | String | Yes |
name | Name of the policy | String | Yes |
system | This is set to `true` on system policies, which cannot be deleted. | Boolean | No | `false`
description | Description of the policy. | String | No | Null
priority | Priority of the policy | Int | No | Last / Lowest Priority
status | Status of the policy: ACTIVE or INACTIVE | String | No | "ACTIVE"
conditions | Conditions for policy | <a href="#PolicyConditionsObject">Conditions Object</a> | No |
settings | Settings for policy | <a href="#PolicySettingsObject">Policy Settings Object</a> | No |
created | Timestamp when the policy was created | Date | No | Assigned
lastUpdated | Timestamp when the policy was last modified | Date | No | Assigned
_links | Hyperlinks | <a href="#LinksObject">Links Object</a> | No |


### Policy Settings Object
{: #PolicySettingsObject }

The policy settings object contains the policy level settings for the particular policy type.  Not all policy types have policy level settings.  For example, in Password Policy the settings object contains, among other items, the password complexity settings.   In Sign On policy, on the other hand, there are no policy level settings; all of the policy data is contained in the rules.  Each policy type section explains the settings objects specific to that type.


### Conditions Object
{: #PolicyConditionsObject }

The Conditions Object(s) specify the conditions that must be met during policy evaluation in order to apply the policy in question.   All policy conditions, as well as conditions for at least one rule must be met in order to apply the settings specified in the policy and the associated rule.  Policies and rules may contain different conditions depending on the policy type.  The conditions which can be used with a particular policy depends on the policy type.
See <a href="#conditions">conditions</a>


### Links Object
{: #LinksObject }

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the current policy.  The Links Object is used for dynamic discovery of related resources.  The Links Object is **read-only**.

Parameter | Description | Data Type | Required |
| --- | --- | --- | ---
self | The policy or rule | String | Yes |
activate | Action to activate a policy or rule (present if the rule is currently inactive) | String | Yes |
deactivate | Action to deactivate a policy or rule (present if the rule is currently active) | String | Yes |
rules | Action to retrieve the rules objects for the given policy | String | Yes |

## Rules
Each policy may contain one or more rules.  Rules, like policies contain conditions, which must be satisfied in order for the rule to be applied.

### Rule Priority and Defaults

### Default Rules

 - Only the default policy contains a default rule. The default rule cannot be edited or deleted.
 - The default rule is required and always is the last rule in the priority order. If you add rules to the default policy, they have a higher priority than the default rule.
 - The `system` attribute determines whether a rule is created by a system or by a user. The default rule is the only rule that has this attribute.

### Rule Priority

Like policies, rules have a priority which governs the order in which they are considered during evaluation. The highest priority rule has a `priority` of 1.
For example if a particular policy had two rules, "A" and "B" as below.

- Rule A has priority 1 and applies to RADIUS VPN scenarios.
- Rule B has priority 2 and applies to ANYWHERE (network connection) scenarios.

If a request came in from the Radius endpoint, the action in Rule A would be taken, and Rule B would not be evaluated.
This occurs because, even though requests coming from anywhere would match the ANYWHERE location condition of Rule B, Rule A has higher priority and is evaluated first.

### Rules Message Example (Password Policy)

```json
  {
    "type": "PASSWORD",
    "id": "0prlmqTXCzP5SegYJ0g3",
    "status": "ACTIVE",
    "name": "Legacy Rule",
    "priority": 1,
    "created": "2017-01-10T21:42:22.000Z",
    "lastUpdated": "2017-01-10T21:42:22.000Z",
    "system": false,
    "conditions": {
      "people": {
        "users": {
          "exclude": []
        }
      },
      "network": {
        "connection": "ANYWHERE"
      }
    },
    "actions": {
      "passwordChange": {
        "access": "ALLOW"
      },
      "selfServicePasswordReset": {
        "access": "ALLOW"
      },
      "selfServiceUnlock": {
        "access": "DENY"
      }
    },
    "_links": {
      "self": {
        "href": "http://ed.okta1.com:1802/api/v1/policies/00plmpDXfWU34nb280g3/rules/0prlmqTXCzP5SegYJ0g3",
        "hints": {
          "allow": [
            "GET",
            "PUT",
            "DELETE"
          ]
        }
      },
      "deactivate": {
        "href": "http://ed.okta1.com:1802/api/v1/policies/00plmpDXfWU34nb280g3/rules/0prlmqTXCzP5SegYJ0g3/lifecycle/deactivate",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  }
```

### Rules Object
{: #RulesObject }

The Rules model defines several attributes:

| Parameter   | Description                                                      | Data Type                                               | Required | Default                |
|:------------|:-----------------------------------------------------------------|:--------------------------------------------------------|:---------|:-----------------------|
| id          | Identifier of the rule                                           | String                                                  | No       | Assigned               |
| type        | Rule type. Valid values: `SIGN_ON` or `PASSWORD` or `MFA_ENROLL` | String (Enum)                                           | Yes      |                        |
| name        | Name of the rule                                                 | String                                                  | Yes      |                        |
| status      | Status of the rule: `ACTIVE` or `INACTIVE`                       | String (Enum)                                           | No       | ACTIVE                 |
| priority    | Priority of the rule                                             | Integer                                                 | No       | Last / Lowest Priority |
| system      | This is set to 'true' on system rules, which cannot be deleted.  | Boolean                                                 | No       | false                  |
| created     | Timestamp when the rule was created                              | Date                                                    | No       | Assigned               |
| lastUpdated | Timestamp when the rule was last modified                        | Date                                                    | No       | Assigned               |
| conditions  | Conditions for rule                                              | <a href="#RuleConditionsObject">Conditions Object</a>   | No       |                        |
| actions     | Actions for rule                                                 | <a href="#RulesActionsObject">Rules Actions Objects</a> | No       |                        |
| _links      | Hyperlinks                                                       | <a href="#RulesLinksObject">Links Object</a>            | No       |                        |

### Actions Objects
{: #RulesActionsObject }

Just as policies contains settings, rules contain "Actions", which typically specify actions to be taken, or operations that may be allowed, if the rule conditions are satisfied.  For example, in Password Policy rule actions govern whether or not self-service operations such as reset password or unlock are permitted.   Just as different policy types have different settings, rules have different actions depending on the type of the policy they belong to.

### Conditions Object
{: #RuleConditionsObject }

The Conditions Object(s) specify the conditions that must be met during policy evaluation in order to apply the rule in question.   All policy conditions, as well as conditions for at least one rule must be met in order to apply the settings specified in the policy and the associated rule.  Policies and rules may contain different conditions depending on the policy type.  The conditions which can be used with a particular policy depends on the policy type.
See <a href="#Conditions">conditions</a>

### Links Object
{: #RulesLinksObject }

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the current rule.  The Links Object is used for dynamic discovery of related resources.  The Links Object is **read-only**.

Parameter | Description | Data Type | Required |
| --- | --- | --- | ---
self | The policy or rule | String | Yes |
activate | Action to activate the rule (present if the rules is currently inactive) | String | Yes |
deactivate | Action to deactivate the rule (present if the rule is currently active) | String | Yes |

### Conditions
{: #Conditions }

#### People Condition Object
{: #PeopleObject }

The people condition identifies users and groups that are used together. For policies, you can only include a group.

Parameter | Description | Data Type | Required |
| --- | --- | --- | ---
groups | The groups condition | <a href="#UserConditionObject">User Condition Object</a> | Yes |
users | The users condition | <a href="#GroupConditionObject">Group Condition Object</a> | Yes |

##### User Condition Object
{: #UserConditionObject }

Specifies a set of users to be included or excluded

Parameter | Description | Data Type | Required |
| --- | --- | --- | ---
include | The users to be included | Array | Yes |
exclude | The users to be excluded | Array | Yes |


##### Group Condition Object
{: #GroupConditionObject }

Specifies a set of groups whose users to be included or excluded

Parameter | Description | Data Type | Required |
| --- | --- | --- | ---
include | The groups to be included | Array | Yes |
exclude | The groups to be excluded | Array | Yes |

#### People Condition Object Example

```json
  "people": {
    "users": {
      "exclude": [
        "00uo7dIiN4jizvY6q0g3"
      ]
    },
    "groups": {
      "include": [
        "00go6lU1wxnmPisNp0g3"
      ]
    }
  }
```

#### AuthContext Condition Object
{: #AuthContextConditionObject }

Specifies an authentication entry point.

Parameter | Description | Data Type | Required | Default
| --- | --- | --- | ---
authType |  | `ANY` or `RADIUS` | No |

#### Network Condition Object
{: #NetworkConditionObject }

Specifies a network selection mode, and a set of network zones to be included or excluded. If the connection parameter's data type is `ZONE`, exactly one of the include or exclude arrays is required.
Specific zone ids to include or exclude are enumerated in the respective arrays. The [Zones API](zones) can be used to manage network zones.

Parameter | Description | Data Type | Required |
| --- | --- | --- | ---
connection | Network selection mode | `ANYWHERE`, `ZONE` | No |
include | The zones to include | Array | Only if connection data type is `ZONE` |
exclude | The zones to exclude | Array | Only if connection data type is `ZONE` |

> The connection parameter may be set to the `ZONE` data type to select individual network zones.

#### Network Condition Object Example
{: #NetworkConditionObjectExample }

```json
  "network": {
    "connection": "ZONE",
    "include": [
      "nzowdja2YRaQmOQYp0g3", "nzowe1mKv1D10YNda0g3", "nzowduJMXKsPkRqL40g3"
    ]
  }
```

If you want to include or exclude all zones, you should pass in "ALL_ZONES" as the only element in the include or exclude array

#### Network Condition Object Example (exclude all zones)
{: #NetworkConditionObjectExample }

```json
  "network": {
    "connection": "ZONE",
    "exclude": [
      "ALL_ZONES"
    ]
  }
```


#### Authentication Provider Condition Object
{: #AuthProviderConditionObject }

Specifies an authentication provider, which masters some or all users.

Parameter | Description | Data Type | Required | Default
| --- | --- | --- | ---
provider | Specifies the required authentication provider  | 'Okta', 'Active Directory' | Yes | 'Okta'
include | The AD integrations this policy applies to | Array | No | Include all AD integrations

#### Authentication Provider Condition Object Example

```json
  "authProvider": {
    "provider": "ACTIVE_DIRECTORY",
    "include": [
      "0oaoz0zUsohjfrWZ80g3"
    ]
  }
```

#### User Identifier Condition Object
{: #UserIdentifierConditionObject }

Specifies a user identifier condition to match on.

Parameter | Description | Data Type | Required |
| --- | --- | --- | --- |
patterns | The pattern(s) to match  | Array of [patterns](#patterns-object) objects.  | Yes |
type | What to match against, either user ID or an attribute in the user's Okta profile. | `IDENTIFIER`, `ATTRIBUTE` | Yes |
attribute | The name of the profile attribute to match against. Only used when `type` is `ATTRIBUTE`. | String | No |

> Note: When using a regex expression, or when matching against Okta user profile attributes, the `patterns` array can have only one element.

#### Patterns Object

Used in the User Identifier Condition object, specifies the details of the patterns to match against.

Parameter | Description | Data Type | Required |
| --- | --- | --- | ---
matchType | The kind of pattern. For regex, use `EXPRESSION`. For simple string matches, options are `EQUALS`, `CONTAINS`, `STARTS_WITH`, `SUFFIX`.  | String | Yes |
value | The regex expression or simple match string | String | Yes |

#### User Identifier Condition Object Example: Regex on Login

```json
  "userIdentifier": {
    "patterns": [ //the array can have only one element for regex matching
      {
        "matchType": "EXPRESSION",
        "value": "^([a-zA-Z0-9_\-\.]+)\.test@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
      }
    ],
    "type": "IDENTIFIER"
  }
```

#### User Identifier Condition Object Example: Domain List on Login

```json
  "userIdentifier": {
    "patterns": [ //the array can have multiple elements for non-regex matching
      {
        "matchType": "SUFFIX",
        "value": "gmail.com"
      },
      {
        "matchType": "SUFFIX",
        "value": "google.com"
      },
      //...
    ],
    "type": "IDENTIFIER"
  }
```

#### User Identifier Condition Object Example: User Attribute

```json
  "userIdentifier": {
    "patterns": [ //the array can have only one value for profile attribute matching
      {
        "matchType": "STARTS_WITH", //EQUALS, CONTAINS, REGEX
        "value": "demo"
      }
    ],
    "type": "ATTRIBUTE",
    "attribute": "customField"
  }
```

#### Application and App Instance Condition Object
{: #AppAndAppInstanceConditionObject }

Specifies either a general application or specific app instance to match on.

Parameter | Description | Data Type | Required
| --- | --- | --- | ---
include | The list of applications or app instances to match on  | Array | Yes

#### Application and App Instance Condition Object Example

```json
  "app": {
    "include":[
      {
        "type": "APP_TYPE",
        "name":"yahoo_mail"
      },
      {
        "type": "APP",
        "id":"0oai0y4zt7hd2PSAP0h7"
      },
      //...
    ],
  }
```

#### Platform Condition Object
{: #PlatformConditionObject }

Specifies a particular platform or device to match on.

Parameter | Description | Data Type | Required |
| --- | --- | --- | ---
include | The platforms to include | Array | Yes |

#### Platform Condition Object Example
{: #PlatformConditionObjectExample }

```json
  "platform": {
    "include": [
      {
        "type": "MOBILE",
        "os": {
          "type": "IOS"
        },
      },
      {
        "type": "MOBILE",
        "os": {
          "type": "ANDROID"
        },
      },
      {
        "type": "DESKTOP",
        "os": {
          "type": "WINDOWS"
        },
      },
      {
        "type": "DESKTOP",
        "os": {
          "type": "OSX"
        },
      }
    ]
  }
```

## Type-Specific Policy Data Structures

## Okta Sign On Policy
{: #OktaSignOnPolicy }

Okta Sign On Policy controls the manner in which a user is allowed to sign on to Okta, including whether they are challenged for multifactor authentication (MFA) and how long they are allowed to remain signed in before re-authenticating.

>Note: Okta Sign On Policy is different from application sign-on policy, which determines the extra levels of authentication (if any) which must be performed before a specific Okta application can be invoked.
Application sign-on policy can't be configured via the API.

### Policy Settings Data

Okta sign on policy does not contain policy settings data.  In the case of sign on policy all of the data is contained in the rules.

### Policy Conditions
The following conditions may be applied to Okta Sign On Policy

<a href="#PeopleObject">People Condition</a>

### Okta Sign On Rules Action Data

#### Signon Action Example

```json
  "actions": {
    "signon": {
      "access": "ALLOW",
      "requireFactor": true,
      "factorPromptMode": "SESSION",
      "rememberDeviceByDefault": false,
      "factorLifetime": 15,
      "session": {
        "usePersistentCookie": false,
        "maxSessionIdleMinutes": 120,
        "maxSessionLifetimeMinutes": 0
      }
    }
  }
```


#### Signon Action Object
{: #SignonObject }

Property | Description | Data Type | Required | Default
| --- | --- | --- | --- | ---
access | `ALLOW` or `DENY` | `ALLOW` or `DENY` | Yes | N/A
requireFactor | Indicates if multi-factor authentication is required | Boolean | No | false
factorPromptMode | Indicates if the user should be challenged for second factor authentication (MFA) based on the device being used, a factor session lifetime, or on every sign on attempt. | `DEVICE`, `SESSION` or `ALWAYS` | Yes, if requireFactor is true | N/A
rememberDeviceByDefault | Indicates if Okta should automatically remember the device  | Boolean | No | false
factorLifetime | Interval of time that must elapse before the user is challenged for MFA, if the factor prompt mode is set to 'SESSION' | Integer | Yes, if requireFactor is true | N/A
session | Properties governing the user's session lifetime | <a href="#SignonSessionObject">Signon Session Object</a> | No |


##### Signon Session Object
{: #SignonSessionObject }

Property | Description | Data Type | Required | Default
| --- | --- | --- | --- | ---
maxSessionIdleMinutes | Maximum number of minutes that a user session can be idle before the session is ended. | Integer | No | 120
maxSessionLifetimeMinutes | Maximum number of minutes from user login that a user session will be active. Set this to force users to sign-in again after the number of specified minutes. Disable by setting to `0`. | Integer | No | 0
usePersistentCookie | If set to `false`, user session cookies will only last the length of a browser session. If set to `true`, user session cookies will last across browser sessions. This setting does not impact Okta Administrator users, who can *never* have persistant session cookies. | Boolean | No | false

### Rules Conditions
The following conditions may be applied to the rules associated with Okta Sign On Policy

<a href="#PeopleObject">People Condition</a>

<a href="#NetworkConditionObject">Network Condition</a>

<a href="#AuthContextConditionObject">AuthContext Condition</a>


## Multifactor (MFA) Enrollment Policy
{: #OktaMFAPolicy }

> The MFA Policy API is a <ApiLifecycle access="beta" /> release.

Multifactor (MFA) Enrollment Policy controls which MFA methods are available for a user, as well as when a user may enroll in a particular factor.

#### Policy Settings Example
Note that policy settings are included only for those factors which have been enabled.

```json
   "settings": {
     "factors": {
       "okta_question": {
         "enroll": {
           "self": "OPTIONAL"
         },
         "consent": {
           "type": "NONE"
         }
       },
       "okta_sms": {
         "enroll": {
           "self": "REQUIRED"
         },
         "consent": {
           "type": "NONE"
         }
       }
     }
   }
```

### Policy Settings Data

#### Policy Factors Configuration Object
{: #PolicyFactorsConfigurationObject }

Parameter | Description | Data Type | Required
| --- | --- | --- | ---
duo | Duo Security | <a href="#PolicyFactorObject">Policy MFA Factor Object</a> | No
fido_u2f | FIDO U2F | <a href="#PolicyFactorObject">Policy MFA Factor Object</a> | No
fido_webauthn | Windows Hello | <a href="#PolicyFactorObject">Policy MFA Factor Object</a> | No
google_otp | Google Authenticator | <a href="#PolicyFactorObject">Policy MFA Factor Object</a> | No
okta_call | Okta Voice Call | <a href="#PolicyFactorObject">Policy MFA Factor Object</a> | No
okta_email | Okta Email | <a href="#PolicyFactorObject">Policy MFA Factor Object</a> | No
okta_otp | Okta Verify TOTP | <a href="#PolicyFactorObject">Policy MFA Factor Object</a> | No
okta_password | Okta Password | <a href="#PolicyFactorObject">Policy MFA Factor Object</a> | No
okta_push | Okta Verify Push | <a href="#PolicyFactorObject">Policy MFA Factor Object</a> | No
okta_question | Okta Security Question | <a href="#PolicyFactorObject">Policy MFA Factor Object</a> | No
okta_sms | Okta SMS | <a href="#PolicyFactorObject">Policy MFA Factor Object</a> | No
rsa_token | RSA Token | <a href="#PolicyFactorObject">Policy MFA Factor Object</a> | No
symantec_vip | Symantec VIP | <a href="#PolicyFactorObject">Policy MFA Factor Object</a> | No
yubikey_token | Yubikey Token | <a href="#PolicyFactorObject">Policy MFA Factor Object</a> | No

#### Policy MFA Factor Object
{: #PolicyFactorObject }

Parameter | Description | Data Type | Required
| --- | --- | --- | ---
consent | Consent requirements for the factor | <a href="#PolicyFactorConsentObject">Policy Factor Consent Object</a> | No
enroll | Enrollment requirements for the factor | <a href="#PolicyFactorEnrollObject">Policy Factor Enroll Object</a> | No


#### Policy Factor Enroll Object
{: #PolicyFactorEnrollObject }

Parameter | Description | Data Type | Required | Default
| --- | --- | --- | --- | ---
self | Requirements for use-initiated enrollment | `NOT_ALLOWED`, `OPTIONAL` or `REQUIRED` | No | `NOT_ALLOWED`

#### Policy Factor Consent Object
{: #PolicyFactorConsentObject }

The Policy Factor Consent Object is an extensibility point.  In the future, policy may be configurable to require user consent to specified terms when enrolling in a factor.   At present settings other than type = `NONE` are ignored.

Parameter | Description | Data Type | Required | Default
| --- | --- | --- | --- | ---
terms | Specifies the consent terms to be offered the user upon enrolling in the factor. | <a href="#PolicyFactorConsentTerms">Policy Factor Consent Terms</a> | No |
type | User consent type required before enrolling in the factor: `NONE` or `TERMS_OF_SERVICE`. | String | No | NONE

#### Policy Factor Consent Terms
{: #PolicyFactorConsentTerms }

At present the Policy Factor Consent Terms settings are ignored.

Parameter | Description | Data Type | Required | Default
| --- | --- | --- | --- | ---
format | The format of the consent dialog to be presented. | `TEXT`, `RTF`, `MARKDOWN` or `URL` | No | N/A
value | The contents of the consent dialog. | String | No | N/A

### Policy Conditions
The following conditions may be applied to Multifactor Policy

<a href="#PeopleObject">People Condition</a>

### Multifactor Rules Action Data

#### Multifactor Enrollment Rules Actions Example

```json
  "actions": {
    "enroll": {
      "self": "CHALLENGE"
    }
  },
```


#### Rules Actions Enroll Object
{: #RulesActionsEnrollObject }

Parameter | Description | Data Type | Required | Default
| --- | --- | --- | --- | ---
self | Should the user be enrolled the first time they `LOGIN`, the next time they are `CHALLENGE`d, or `NEVER`? | `CHALLENGE`, `LOGIN` or `NEVER` | Yes | N/A

### Rules Conditions
The following conditions may be applied to the rules associated with MFA Enrollment Policy

<a href="#PeopleObject">People Condition</a>

<a href="#NetworkConditionObject">Network Condition</a>

## Password Policy
{: #GroupPasswordPolicy }

The Password policy determines the requirements for a user's password length and complexity, as well as the frequency with which a password must be changed. This policy also governs the recovery operations that may be performed by the user, including change password, reset (forgot) password and self-service password unlock.

> **NOTE:** Password policies are enforced only for Okta and AD-mastered users. For AD-mastered users, ensure that your Active Directory policies don't conflict with the Okta policies.

#### Policy Settings Example

```json
   "settings": {
     "password": {
       "complexity": {
         "minLength": 8,
         "minLowerCase": 1,
         "minUpperCase": 1,
         "minNumber": 1,
         "minSymbol": 0,
         "excludeUsername": true
       },
       "age": {
         "maxAgeDays": 0,
         "expireWarnDays": 0,
         "minAgeMinutes": 0,
         "historyCount": 0
       },
       "lockout": {
         "maxAttempts": 10,
         "autoUnlockMinutes": 0,
         "showLockoutFailures": false
       }
     },
     "recovery": {
       "factors": {
         "recovery_question": {
           "status": "ACTIVE",
           "properties": {
             "complexity": {
               "minLength": 4
             }
           }
         },
         "okta_email": {
           "status": "ACTIVE",
           "properties": {
             "recoveryToken": {
               "tokenLifetimeMinutes": 60
             }
           }
         },
         "okta_sms": {
           "status": "INACTIVE"
         },
         "okta_call": {
           "status": "INACTIVE"
         }
       }
     },
     "delegation": {
       "options": {
         "skipUnlock": false
       }
     }
   }
```

### Policy Settings Data

Property | Description | Data Type | Required |
| --- | --- | --- | ---
password | Password settings | <a href="#PasswordObject">Password Policy Password Object</a> | No
recovery | Recovery settings | <a href="#RecoveryObject">Password Policy Recovery Object</a> | No
delegation | Delegation settings | <a href="#DelegationObject">Password Policy Delegation Object</a> | No

#### Password Object
{: #PasswordObject }

Property | Description | Data Type | Required |
| --- | --- | --- | ---
complexity | Complexity settings | <a href="#PasswordComplexityObject">Password Complexity Object</a> | No
age | Age settings | <a href="#PasswordAgeObject">Password Age Object</a> | No
lockout | Lockout settings | <a href="#PasswordLockoutObject">Password Lockout Object</a> | No

##### Complexity Object
{: #PasswordComplexityObject }

Property | Description | Data Type | Required | Default
| --- | --- | --- | --- | ---
minLength | Minimum password length | integer | No | 8
minLowerCase | Indicates if a password must contain at least one lower case letter: 0 indicates no, 1 indicates yes  | integer | No | 1
minUpperCase | Indicates if a password must contain at least one upper case letter: 0 indicates no, 1 indicates yes | integer | No | 1
minNumber | Indicates if a password must contain at least one number: 0 indicates no, 1 indicates yes | integer | No | 1
minSymbol | Indicates if a password must contain at least one symbol (e.g., !@#$%^&*): 0 indicates no, 1 indicates yes | integer | No | 1
excludeUsername | Indicates if the user name must be excluded from the password | boolean | No | true
excludeAttributes | The user profile attributes whose values must be excluded from the password: currently only supports `firstName` and `lastName` | Array | No | Empty Array
dictionary {%api_lifecycle beta %} | Weak password dictionary lookup settings | <a href="#WeakPasswordDictionaryObject">Weak Password Dictionary Object</a> | No | N/A

###### Weak Password Dictionary Object
{: #WeakPasswordDictionaryObject }

> Weak password lookup is a <ApiLifecycle access="beta" /> feature.

Specifies how lookups for weak passwords are done. Designed to be extensible with multiple possible dictionary types against which to do lookups.

Property | Description | Data Type | Required
| --- | --- | --- | ---
common | Lookup settings for commonly used passwords  | <a href="#CommonPasswordLookupObject">Common Password Lookup Object</a> | No

Common Password Lookup Object

{: #CommonPasswordLookupObject }

Property | Description | Data Type | Required | Default
| --- | --- | ---| --- | ---
exclude | Indicates whether to check passwords against common password dictionary | Boolean | No | false

##### Age Object
{: #PasswordAgeObject }

Property | Description | Data Type | Required | Default
| --- | --- | --- | ---
maxAgeDays | Specifies how long (in days) a password remains valid before it expireds: 0 indicates no limit | integer | No | 0
expireWarnDays | Specifies the number of days prior to password expiration when a user will be warned to reset their password: 0 indicates no warning  | integer | No | 0
minAgeMinutes | Specifies the minimum time interval (in minutes) between password changes: 0 indicates no limit | integer | No | 0
historyCount | Specifies the number of distinct passwords that a user must create before they can reuse a previous password: 0 indicates none  | integer | No | 0

##### Lockout Object
{: #PasswordLockoutObject }

Property | Description | Data Type | Required | Default
| --- | --- | --- | ---
maxAttempts | Specifies the number of times users can attempt to log in to their accounts with an invalid password before their accounts are locked: 0 indicates no limit | integer | No | 0
autoUnlockMinutes | Specifies the time interval (in minutes) a locked account remaind locked before it is automatically unlocked: 0 indicates no limit | integer | No | 0
showLockoutFailures | Inidcates if the user should be informed when their account is locked | Boolean | No | false

#### Recovery Object
{: #RecoveryObject }

Property | Description | Data Type | Required |
| --- | --- | --- | ---
factors | Settings for the factors that may be used for recovery | <a href="#RecoveryFactorsObject">Recovery Factors Object</a> | No

##### Recovery Factors Object
{: #RecoveryFactorsObject }

Property | Description | Data Type | Required |
| --- | --- | --- | ---
recovery_question | Settings for security question factor | <a href="#RecoveryQuestionFactorObject">Recovery Question Factor Object</a> | No
okta_email | Settings for email factor | <a href="#EmailFactorObject">Email Factor Object</a> | No
okta_sms | Settings for SMS factor | <a href="#SMSFactorObject">SMS Factor Object</a> | No

###### Recovery Question Factor Object
{: #RecoveryQuestionFactorObject }

Property | Description | Data Type | Required |
| --- | --- | --- | ---
status | Indicates if the factor is enabled. | `ACTIVE`, `INACTIVE` <ApiLifecycle access="ea" /> | Yes |
properties | Configuration settings for security question factor | <a href="#RecoveryQuestionFactorPropertiesObject">Recovery Question Factor Properties Object</a> | No

###### Recovery Question Factor Properties Object
{: #RecoveryQuestionFactorPropertiesObject }

Property | Description | Data Type | Required |
| --- | --- | --- | ---
complexity | Complexity settings for recovery question | <a href="#RecoveryQuestionFactorPropertiesComplexityObject">Recovery Question Factor Properties Complexity Object</a> | No

###### Recovery Question Factor Properties Complexity Object
{: #RecoveryQuestionFactorPropertiesComplexityObject }

Property | Description | Data Type | Required | Default
| --- | --- | --- | ---
minLength | Minimum length of the password recovery question answer | Integer | No | 4

###### Email Factor Object
{: #EmailFactorObject }

Property | Description | Data Type | Required |
| --- | --- | --- | ---
status | Indicates if the factor is enabled.  This property is read-only | `ACTIVE` | Yes |
properties | Configuration settings for okta email factor | <a href="#EmailFactorPropertiesObject">Email Factor Properties Object</a> | No

###### Email Factor Properties Object
{: #EmailFactorPropertiesObject }

Property | Description | Data Type | Required |
| --- | --- | --- | ---
recoveryToken | Recovery token settings | <a href="#EmailFactorPropertiesREcoveryTokenObject">Email Factor Properties Recovery Token Object</a> | No

###### Email Factor Properties Recovery Token Object
{: #EmailFactorPropertiesREcoveryTokenObject }

Property | Description | Data Type | Required | Default
| --- | --- | --- | --- | ---
tokenLifetimeMinutes | Lifetime (in minutes) of the recovery token | Integer | No | 10080

###### SMS Factor Object
{: #SMSFactorObject }

Property | Description | Data Type | Required | Default
| --- | --- | --- | --- | ---
status | Indicates if the factor is enabled. | `ACTIVE`, `INACTIVE` | No | 'INACTIVE'

#### Delegation Object
{: #DelegationObject }

Property | Description | Data Type | Required |
| --- | --- | --- | ---
options | Delegation options | <a href="#DelegationOptionsObject">Delegation Options Object</a> | No

##### Options Object
{: #DelegationOptionsObject }

Property | Description | Data Type | Required | Default
| --- | --- | --- | ---
skipUnlock | Indicates if, when performing an unlock operation on an Active Directory mastered user who is locked out of Okta, the system should also attempt to unlock the user's Windows account. | Boolean | No | false

### Policy Conditions
The following conditions may be applied to Password Policy

<a href="#PeopleObject">People Condition</a>

<a href="#AuthProviderConditionObject">Authentication Provider Condition</a>

### Password Rules Action Data

#### Password Actions Example

```json
  "actions": {
    "passwordChange": {
     "access": "ALLOW"
    },
    "selfServicePasswordReset": {
     "access": "ALLOW"
    },
    "selfServiceUnlock": {
     "access": "ALLOW"
    }
  },
```

#### Password Action Object
{: #PaswordActionObject }

Property | Description | Data Type | Required |
| --- | --- | --- | ---
passwordChange | Properties governing the change password operation | <a href="#PasswordChangeActionObject">Password Change Object</a> | No |
selfServicePasswordReset | Properties governing the self-service password reset (forgot password) operation | <a href="#PasswordResetActionObject">Self Service Password Reset Object</a> | No |
selfServiceUnlock | Properties governing the self-service unlock operation | <a href="#SelfServiceUnockActionObject">Self Service Unlock Object</a> | No |

##### Password Change Action Object
{: #PasswordChangeActionObject }

Property | Description | Data Type | Required | Default
| --- | --- | --- | --- | ---
access | Indicates if the action is permitted | `ALLOW`, `DENY` | No | `DENY`

##### Self Service Password Reset Action Object
{: #PasswordResetActionObject }

Property | Description | Data Type | Required | Default
| --- | --- | --- | --- | ---
access | Indicates if the action is permitted | `ALLOW`, `DENY` | No | `DENY`

##### Self Service Unlock Action Object
{: #SelfServiceUnockActionObject }

Property | Description | Data Type | Required | Default
| --- | --- | --- | --- | ---
access | Indicates if the action is permitted | `ALLOW`, `DENY` | No | `DENY`

### Rules Conditions
The following conditions may be applied to the rules associated with Password Policy

<a href="#PeopleObject">People Condition</a>

<a href="#NetworkConditionObject">Network Condition</a>

## IdP Discovery Policy
{: #IdPDiscoveryPolicy }

The IdP Discovery Policy determines where to route users when they are attempting to log in to your org. Users can be routed to a variety of identity providers (`SAML2`, `IWA`, `AgentlessDSSO`, `X509`, `FACEBOOK`, `GOOGLE`, `LINKEDIN`, `MICROSOFT`, `OIDC`) based on multiple conditions listed below.

> Note: All Okta orgs with `IDP_DISCOVERY` enabled contain one and only one IdP Discovery Policy with an immutable default rule routing to your org's login page.

### Policy Conditions
The following conditions may be applied to IdP Discovery Policy

<a href="#NetworkConditionObject">Network Condition</a>

<a href="#PlatformConditionObject">Platform Condition</a>

<a href="#UserIdentifierConditionObject">User Identifier Condition</a>

<a href="#AppAndAppInstanceConditionObject">Application and App Instance Condition</a>

### Policy Action Data
{: #IdPDiscoveryPolicyActionData }

#### Policy Action Object
{: #IdPDiscoveryPolicyActionObject }

Property | Description | Data Type | Required
| --- | --- | --- | --- | ---
providers | List of configured identity providers that a given rule can route to | array | Yes

> Note: Currently, this `providers` list only supports one value. IdP types `OKTA`, `AgentlessDSSO`, and `IWA` do not require an `id`.

#### Policy Action Example

```json
  "actions": {
    "idp": {
      "providers": [ //only supports one value
        {
          "type": "SAML2",
          "id": "0oaoz0zUsohjfrWZ80g3"
        }
      ]
    }
  }
```
