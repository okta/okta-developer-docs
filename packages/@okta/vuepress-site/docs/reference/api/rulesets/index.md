---
title: RuleSets
category: management
---

# Rule Sets

<ApiLifecycle access="ea" />

Rule Sets are ordered sets of rules that support more granular targeting and unioning so that matched rules can either contribute to the final result or possibly deny the action.

They allow you to define requirements for multiple entities in a more reusable fashion. For example, a particular App may have a certain set of factor enrollment requirements, while a UserType may have a different set. It should be easy to take the union of the rules governing each.

Rule Sets are exposed under the familiar [Okta Policy API](/docs/reference/api/policy).

We distinguish between Policies and RuleSets based on the `type` field in the Policy API. Rule Set types always begin with the prefix `Okta:` (such as `Okta:SignOn`).

Rule Sets also introduce the concept of `Mappings`, which represent the governance relationship of a policy over a given resource.

Currently Okta allows a single Resource Mapping for each Rule Set, but the API will naturally support multiple mappings in the future.

> If you want to change the Rule Set governing a particular resource, you must delete the old mapping and create a new one.

## Limits

Okta limits the number of Rule Sets to 100 per [type](#rule-set-types).

## Getting Started

The Policy API supports the following **rule set operations**:

* Get all rule sets of a specific type
* Create, read, update, and delete a rule set
* Activate and deactivate a rule set

The Policy API supports the following **rule operations**:

* Get all rules for a rule set
* Create, read, update, and delete a rule for a rule set
* Activate and deactivate a rule

The Policy API supports the following **resource mapping operations**:

* Get all resource mappings for a rule set
* Create, read, update, and delete a resource mapping for a rule set

## Rule Set Operations

### Get a Rule Set

<ApiOperation method="get" url="/api/v1/policies/${ruleSetId}" />

##### Request Parameters

The rule set ID described in the [RuleSet object](#rule-set-object) is required.

##### Request Example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/{rulesetId}"
```

##### Response Example

HTTP 200:
[RuleSet object](#rule-set-object)

### Get All Rule Sets by Type

<ApiOperation method="get" url="/api/v1/policies?type=${type}" />

##### Request Parameters

The rule set type described in the [RuleSet object](#rule-set-object) is required.

##### Request Example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies?type={type}"
```

##### Response Types

HTTP 200:
[RuleSet object](#rule-set-object)

### Delete Rule Set

<ApiOperation method="delete" url="/api/v1/policies/${rulesetId}" />

##### Request Parameters

The rule set ID described in the [RuleSet object](#rule-set-object) is required.

##### Request Example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/{rulesetId}"
```

##### Response Types

HTTP 204:
*No Content*

### Update a Rule Set

<ApiOperation method="put" url="/api/v1/policies/${rulesetId}" />

##### Request Parameters

The rule set ID described in the [RuleSet object](#rule-set-object) is required.

##### Request Example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "Okta:SignOn",
  "id": "rst30qv3hcOFmC0GL0g7",
  "status": "ACTIVE",
  "name": "Default Policy",
  "default": true
  }
}' "https://${yourOktaDomain}/api/v1/policies/{rulesetId}"
```

##### Response Types

HTTP 200:
[RuleSet object](#rule-set-object)

### Create a Rule Set

<ApiOperation method="post" url="/api/v1/policies" />

##### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "Okta:SignOn",
  "status": "ACTIVE",
  "name": "My New Ruleset",
  "default": false
  }
}' "https://${yourOktaDomain}/api/v1/policies"
```

##### Response Types

HTTP 204:
[RuleSet object](#rule-set-object)

### Activate a Rule Set

<ApiOperation method="post" url="/api/v1/policies/${rulesetId}/lifecycle/activate" />

##### Request Parameters

The rule set id described in the [RuleSet object](#rule-set-object) is required.

##### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/{rulesetId}/lifecycle/activate"
```

##### Response Types

HTTP 204:
*No Content is returned when the activation is successful.*

### Deactivate a Rule Set

<ApiOperation method="post" url="/api/v1/policies/${rulesetId}/lifecycle/deactivate" />

##### Request Parameters

The rule set ID described in the [RuleSet object](#rule-set-object) is required.

##### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/{rulesetId}/lifecycle/deactivate"
```

##### Response Types

HTTP 200:
*No Content is returned when the deactivation is successful.*

## Rule Operations

### Get Rules in a Rule Set

<ApiOperation method="get" url="/api/v1/policies/${rulesetId}/rules" />

##### Request Parameters

The rule set ID described in the [RuleSet object](#rule-set-object) is required.

##### Request Example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/{rulesetId}/rules"
```

##### Response Types

HTTP 200:
[Rule object](#rule-object)

### Create a rule

<ApiOperation method="post" url="/api/v1/policies/${rulesetId}/rules" />

##### Request Parameters

The policy ID described in the [RuleSet object](#rule-set-object) is required.

##### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "Okta:SignOn",
  "name": "Example Rule",
  "status": "ACTIVE",
  "default": false,
  "priority": 0,
  "conditions": [
     {
        "key": "Okta:User",
        "op": "IN_LIST",
        "value": [
           "00u1pdsiceJZLRJMSEUA"
        ]
     }
  ],
  "action": "ALLOW",
  "requirement: [
     "verificationMethod": {
         "type": "ASSURANCE",
         "factorMode": "1FA",
         "constraints": [
            {
              "knowledge": {
                 "types": [
                   "password"
                 ]
              }
            }
         ],
         "reauthenticateIn": "PT1M"
     }
  ]
}' "https://${yourOktaDomain}/api/v1/policies/{rulesetId}/rules"
```

##### Response Types

HTTP 200:
[Rule object](#rule-object)

### Delete a rule

<ApiOperation method="delete" url="/api/v1/policies/${rulesetId}/rules/${ruleId}" />

##### Request Parameters

The rule set ID described in the [RuleSet object](#rule-set-object) is required.

The rule ID described in the [Rule object](#rule-object) is required.

##### Request Example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/{rulesetId}/rules/{ruleId}"
```

##### Response Types

HTTP 204:
*No Content*

### Get a rule

<ApiOperation method="get" url="/api/v1/policies/${rulesetId}/rules/${ruleId}" />

##### Request Parameters

The rule set ID described in the [RuleSet object](#rule-set-object) is required.

The rule ID described in the [Rule object](#rule-object) is required.

##### Request Example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/{rulesetId}/rules/{ruleId}"
```

##### Response Types

HTTP 200:
[Rules object](#rules-object)

### Update a rule

<ApiOperation method="put" url="/api/v1/policies/${rulesetId}/rules/${ruleId}" />

##### Request Parameters

The rule set ID described in the [RuleSet object](#rule-set-object) is required.

The rule ID described in the [Rule object](#rule-object) is required.

##### Request Example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "type": "Okta:SignOn",
    "name": "Example Updated Rule",
    "status": "ACTIVE",
    "default": false,
    "priority": 0,
    "conditions": [
       {
          "key": "Okta:User",
          "op": "IN_LIST",
          "value": [
             "00u1pdsiceJZLRJMSEUA"
          ]
       }
    ],
    "action": "ALLOW",
    "requirement: [
       "verificationMethod": {
           "type": "ASSURANCE",
           "factorMode": "2FA",
           "constraints": [
              {
                "knowledge": {
                   "types": [
                     "password"
                   ]
                },
                "possession": {
                   "methods": [ "PUSH" ]
                }
              }
           ],
           "reauthenticateIn": "PT1M"
       }
    ]
}' "https://${yourOktaDomain}/api/v1/policies/{rulesetId}/rules/{ruleId}"
```

##### Response Types

HTTP 200:
[Rule object](#rule-object)

### Activate A Rule

<ApiOperation method="post" url="/api/v1/policies/${rulesetId}/rules/${ruleId}/lifecycle/activate" />

##### Request Parameters

The rule set ID described in the [RuleSet object](#ruleset-object) is required.

The rule ID described in the [Rule object](#rule-object) is required.

##### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/{rulesetId}/rules/{ruleId}/lifecycle/activate"
```

##### Response Types

HTTP 204:
*No content*

### Deactivate A Rule

<ApiOperation method="post" url="/api/v1/policies/${rulesetId}/rules/${ruleId}/lifecycle/deactivate" />

##### Request Parameters

The rule set ID described in the [RuleSet object](#rule-set-object) is required.

The rule ID described in the [Rule object](#rule-object) is required.

##### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/{rulesetId}/rules/{ruleId}/lifecycle/deactivate"
```

##### Response Types

HTTP 204:
*No content*

## Resource Mappings

### Get Resource Mappings in a Rule Set

<ApiOperation method="get" url="/api/v1/policies/${rulesetId}/mappings" />

##### Request Parameters

The rule set ID described in the [RuleSet object](#rule-set-object) is required.

##### Request Example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/{rulesetId}/mappings"
```

##### Response Types

HTTP 200:
[Mapping object](#mappings-object)

### Create a Resource Mapping

<ApiOperation method="post" url="/api/v1/policies/${rulesetId}/mappings" />

##### Request Parameters

The rule set ID described in the [RuleSet object](#rule-set-object) is required.

##### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "resourceType": "APP",
  "resourceId": "0oa10510BvfrKTfzD0g4"
}' "https://${yourOktaDomain}/api/v1/policies/{rulesetId}/mappings"
```

##### Response Types

HTTP 200:
[Mapping object](#mapping-object)

### Delete a Resource Mapping

<ApiOperation method="delete" url="/api/v1/policies/${rulesetId}/mappings/${mappingId}" />

##### Request Parameters

The rule set ID described in the [RuleSet object](#rule-set-object) is required.

The mapping ID described in the [Mapping object](#mapping-object) is required.

##### Request Example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/{rulesetId}/mappings/{mappingId}"
```

##### Response Types

HTTP 204:
*No Content*

### Get a Resource Mapping

<ApiOperation method="get" url="/api/v1/policies/${rulesetId}/mappings/${mappingId}" />

##### Request Parameters

The rule set ID described in the [RuleSet object](#rule-set-object) is required.

The mapping ID described in the [Mapping object](#mapping-object) is required.

##### Request Example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/{rulesetId}/mappings/{mappingId}"
```

##### Response Types

HTTP 200:
[Mapping object](#mapping-object)

### Rule Set Types
Different rule sets control the behavior for different steps in the Identity Engine pipeline.

All rule set types share a common framework, message structure and API, but have different settings and rule data. The data structures specific to each policy type are discussed in the various sections below.

[Sign-On Rule Sets](#sign-on-rulesets)

[User Profile Rule Sets](#user-profile-rulesets)

### Rule Set Priority and Defaults

### Default Rule Sets

There is always a default rule set created for each [type](#rule-set-types). The default applies to any resources for which other policies in the Okta org do not apply.

 - A default rule set is required and cannot be deleted.
 - The default rule set is always the last in the priority order. Any added rule sets of this type have higher priority than the default rule set.
 - The default rule set always has one default rule that cannot be deleted. It is always the last rule in the priority order. If you add rules to the default rule set, they have a higher priority than the default rule.
 - The `system` attribute determines whether a policy is created by the system or by an administrator in your org.

### Rule Set JSON Example

```json
  {
          "id": "rst30qv3igD5OpiL50g7",
          "name": "My App Assurance Ruleset",
          "type": "Okta:SignOn",
          "status": "ACTIVE",
          "default": false,
          "_links": {
              "mappings": {
                  "href": "https://your-org.okta.com/api/v1/policies/rst30qv3igD5OpiL50g7/mappings",
                  "hints": {
                      "allow": [
                          "GET"
                      ]
                  }
              },
              "self": {
                  "href": "https://your-org.okta.com/api/v1/policies/rst30qv3igD5OpiL50g7",
                  "hints": {
                      "allow": [
                          "GET",
                          "PUT",
                          "DELETE"
                      ]
                  }
              },
              "rules": {
                  "href": "https://your-org.okta.com/api/v1/policies/rst30qv3igD5OpiL50g7/rules",
                  "hints": {
                      "allow": [
                          "GET"
                      ]
                  }
              },
              "deactivate": {
                  "href": "https://your-org.okta.com/api/v1/policies/rst30qv3igD5OpiL50g7/lifecycle/deactivate",
                  "hints": {
                      "allow": [
                          "POST"
                      ]
                  }
              },
              "applications": {
                  "href": "https://your-org.okta.com/api/v1/policies/rst30qv3igD5OpiL50g7/app",
                  "hints": {
                      "allow": [
                          "GET"
                      ]
                  }
              }
          }
      }
```

### Rule Set object

The Rule Set object defines several attributes:

| Parameter   | Description                                                                                          | Data Type                                         | Required | Default                |
| ---------   | -----------                                                                                          | ---------                                         | -------- | -------                |
| id          | Identifier of the rule set                                                                           | String                                            | No       | Assigned               |
| type        | Specifies the [type of rule set](#rule-set-types). Valid values: `Okta:SignOn` or `Okta:UserProfile` | String (Enum)                                     | Yes      |                        |
| name        | Name of the rule set                                                                                 | String                                            | Yes      |                        |
| system      | This is automatically set to `true` for system policies, which cannot be deleted.                    | Boolean                                           | No       | `false`                |
| status      | Status of the rule set: `ACTIVE` or `INACTIVE`                                                       | String (Enum)                                     | No       | `ACTIVE`               |
| _links      | Hyperlinks                                                                                           | [Links object](#links-object)                     | No       |                        |


### Links object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the current policy.  The Links object is used for dynamic discovery of related resources.  The Links object is **read-only**.

| Parameter  | Description                                                                       | Data Type |
| ---        | ---                                                                               | ---       |
| self       | Action to retrieve the current rule set object                                    | String    |
| activate   | Action to activate a rule set or rule (present if the rule is currently inactive) | String    |
| deactivate | Action to deactivate a rule set or rule (present if the rule is currently active) | String    |
| rules      | Action to retrieve the rules objects for the given rule set                       | String    |
| mappings   | Action to retrieve the mapping objects for the given rule set                     | String    |

### Sign On Rule Sets

Sign On Rule Sets have the type `Okta:SignOn`, and are always associated with an application via a [Mapping](#resource-mappings).

> Identity Engine always evaluates both Okta Sign On Policy AND the Sign On Ruleset for the application. The resulting user experience will be the union of both policies.

### User Profile Rule Sets

User Profile Rule Sets have the type `Okta:UserProfile`. These rules specify what profile attributes are required for creating new users via self-service registration, and also can be used for progressive profiling.

## Rules
Each ruleset may contain one or more rules. Rules contain conditions which must be satisfied in order for the rule to be applied.

### Rule Priority and Defaults

### Default Rules

 - Only the default rules set contains a default rule. The default rule cannot be edited or deleted.
 - The default rule is required and always is the last rule in the priority order. If you add rules to the default ruleset, they have a higher priority than the default rule.
 - The `system` attribute determines whether a rule is created by a system or by a user. The default rule is the only rule that has this attribute.

### Rule Priority

Rules are ordered numerically by priority. This priority determines the order in which they are evaluated. The highest priority rule has a `priority` of 0.

For example if a particular rule set had two rules, "A" and "B" as below.

- Rule A has priority 1 and applies to on-prem (for example: office network) scenarios.
- Rule B has priority 2 and applies to ANYWHERE (no specific network) scenarios.

If a request came in from the office network, the action in Rule A would be taken, and Rule B would not be evaluated.
This occurs because, even though requests coming from anywhere would match the ANYWHERE location condition of Rule B, Rule A has higher priority and is evaluated first.

### Rule JSON Example

```json
{
    "name": "Example App Assurance Rule",
    "id": "rul30qv3ijfXq1OPP0g7",
    "type": "Okta:SignOn",
    "priority": 0,
    "conditions": [
        {
            "key": "Okta:User",
            "op": "IN_LIST",
            "value": [
                "00u1pdsiceJZLRJMSEUA"
            ]
        }
    ],
    "action": "ALLOW",
    "requirement": {
        "verificationMethod": {
            "type": "ASSURANCE",
            "factorMode": "1FA",
            "constraints": [
                {
                    "knowledge": {
                        "types": [
                            "password"
                        ]
                    }
                }
            ],
            "reauthenticateIn": "PT1M"
        }
    },
    "status": "ACTIVE",
    "default": false,
    "_links": {
        "deactivate": {
            "href": "https://your-org.okta.com/api/v1/policies/rst30qv3igD5OpiL50g7/rules/rul30qv3ijfXq1OPP0g7/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://your-org.okta.com/api/v1/policies/rst30qv3igD5OpiL50g7/rules/rul30qv3ijfXq1OPP0g7",
            "hints": {
                "allow": [
                    "GET",
                    "PUT",
                    "DELETE"
                ]
            }
        },
        "policy": {
            "href": "https://your-org.okta.com/api/v1/policies/rst30qv3igD5OpiL50g7",
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

### Rule object

The Rule object defines several attributes:

| Parameter     | Description                                                        | Data Type                                      | Required   | Default                |
| :------------ | :----------------------------------------------------------------- | :--------------------------------------------- | :--------- | :--------------------- |
| id            | Identifier of the rule                                             | String                                         | No         | Assigned               |
| type          | Rule type. Valid values: `Okta:SignOn` or `Okta:UserProfile`       | String (Enum)                                  | Yes        |                        |
| name          | Name of the rule                                                   | String                                         | Yes        |                        |
| status        | Status of the rule: `ACTIVE` or `INACTIVE`                         | String (Enum)                                  | No         | ACTIVE                 |
| priority      | Priority of the rule                                               | Integer                                        | No         | Last / Lowest Priority |
| system        | This is set to 'true' on system rules, which cannot be deleted.    | Boolean                                        | No         | false                  |
| conditions    | Conditions for rule                                                | [Conditions object](#conditions-object)        | No         |                        |
| action        | Top-level action for rule: `ALLOW` or `DENY`                       | String (Enum)                                  | Yes        |                        |
| requirement   | Specific remediation requirements for this rule                    | [Requirement Objects](#requirement-object)     | Yes        |                        |
| _links        | Hyperlinks                                                         | [Links object](#links-object-2)                | No         |                        |

### Links object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the current rule.  The Links object is used for dynamic discovery of related resources.  The Links object is **read-only**.

| Parameter   | Description                                                               | Data Type  |
| :---        | :---                                                                      | :---       |
| self        | The rule itself                                                           | String     |
| policy      | The rule set which contains this rule                                     | String     |
| activate    | Action to activate the rule (present if the rules is currently inactive)  | String     |
| deactivate  | Action to deactivate the rule (present if the rule is currently active)   | String     |

### Conditions object

The Conditions object(s) specify the conditions that must be met during rule set evaluation in order to apply the rule in question. All conditions must be met in order to apply the requirements for a given rule. The conditions which can be used with a particular rule depends on the rule type.

### Conditions

Conditions are represented by a `key`, `op`, and `value` that are used in conjunction with a context databag to evaluate to a boolean result. Multiple conditions in a given rule are AND-ed together.

| Parameter  | Description                                                        | Data Type                         | Supported Values                                                                                                        |
| ---        | ---                                                                | ---                               |  ---                                                                                                                    |
| key        | The key to lookup in the context                                   | String                            | `Okta:User`, `Okta:Group`, `Okta:Identifier`, `Okta:UserType`, `Okta:AppInstance`, `Okta:NetworkZone`, `Okta:IpAddress` |
| op         | The operator to perform on the value, limited by the data types    | String                            | Depends on the `value` data type; see [Op Values](#op-values)                                                                                       |
| value      | Static value in the condition to assert                            | String, Boolean, Integer, or List |                                                                                                                         |

Boolean, Integer, String, List

#### Op Values

##### For All Data Types

The `EQUALS` operator can be used regardless of the `value` data type,

##### For String Data Types

If the `value` data type is a String, then the following `op` types may be used:

* `STRING_MATCHES_REGEX`
* `STRING_STARTS_WITH`
* `STRING_ENDS_WITH`
* `STRING_CONTAINS`

##### For List Data Types

If the `value` data type is a list/array, then the following `op` type may be used:

* `IN_LIST`

If the `value` data type is a list/array *and* the `key` references an attribute in the context databag which is also a list/array, then the following `op` type may be used:

* `INTERSECTS`


#### Condition object example

```json
[
  {
    "key": "Okta:Group",
    "op": "IN_LIST",
    "value": [
       "00g1emaKYZTWRYYRRTSK",
       "00garwpuyxHaWOkdV0g4"
    ]
  },
  {
      "key": "Okta:UserType",
      "op": "EQUALS",
      "value": "Partner"
  }
]
```

### Requirement object

In addition to the top-level `action` for a rule, it may also specify a `requirement` section (also known as obligations) that must be fulfilled. These are specific to the rule type.

For example, `Okta:SignOn` rules use the requirements to specify the detailed assurance requirements for signing on. Likewise, `Okta:UserProfile` rules use the requirements to specify which profile attributes are required.

This table describes which requirement objects are expected for which rule types:

| Rule Type         | Requirement Object                                                   |
| :------------     | :-----------------------------------------------------------------   |
| Okta:SignOn       | [Verification Method](#verificiation-method-object)                  |
| Okta:UserProfile  | <TODO>                                                               |

### Verification Method object

A Verification Method describes the means by which the user must be verified. The only supported type is `ASSURANCE`.

#### Assurance Definitions

Assurance is the degree of confidence that the end-user logging into an application or service is the same end-user who previously enrolled or logged in to the application or service.

Authenticators can be broadly classified into factors. A factor represents the mechanism by which a end-user owns or controls the authenticator. The three classifications are:

* Knowledge: something you know, such as a password
* Possession: something you have, such as a ID badge or security key
* Inherence: something you are, such as a fingerprint or other biometric scan

Multi-factor authentication (MFA) is the use more than one factor. Use of MFA is the most common way to increase the assurance. Authenticators also have other characteristics that may raise or lower the assurance. For example, possession factors may be implemented in software or hardware, with hardware being able to provide greater protection when storing shared secrets or private keys, and thus providing higher assurance.

| Parameter           | Supported Values                                                                                            |  Description                                                            |
| :------------       | :-----------------------------------------------------------------                                          | :------------------------------------------------------                 |
| factorMode          | `1FA`, `2FA`                                                                                                | The number of factors required to satisfy this assurance level.         |
| constraints         | `POSSSESSION`, `KNOWLEDGE`                                                                                  | See [Constraints Object][#constraints-object]                           |
| types               | `SECURITY_KEY` | `PHONE` | `EMAIL` | `PASSWORD` | `SECURITY_QUESTION` | `OTP`                               | A JSON array containing the Authenticator Types which are allowable.    |
| methods             | `PASSWORD` | `SECURITY_QUESTION` | `TOTP` | `SMS` | `VOICE` | `PUSH` | `EMAIL` | `FIDO2` | `SIGNED_NONCE`   | A JSON array containing the Authenticator Methods which are allowable.  |
| hardwareProtection  | `REQUIRED` | `OPTIONAL`                                                                                     | Whether any secrets or private keys used during authentication must be hardware protected and not exportable.                  |
| reauthenticateIn    | ISO8601 Duration                                                                                            | An ISO8601 duration string indicating the period after which the end-user should be reauthenticated, regardless of activity.   |
| inactivityPeriod    | ISO8601 Duration                                                                                            | An ISO8601 duration string indicating the period of inactivity after which the user should be reauthenticated.                 |

#### Constraints object

A JSON array containing nested authenticator constraint objects which are organized by Authenticator Class. Each nested constraint object is treated as a list, all of which must be satisfied. The top-level array is treated as a set, one of which must be satisfied.

This can be read logically as: `( (1A && 1B) || (2A && 2B) )`

The number of authenticator class constraints in each constraint object be less than or equal to the value of `factorMode`. If the value is less, there are no constraints on any additional factors.

#### Verification Method Examples

##### Any Single Factor
```json
{
    "type": "ASSURANCE",
    "factorMode": "1FA",
    "constraints": [],
    "reauthenticateIn": "PT4H"
}
```

##### Password + Any Factor
```json
{
    "type": "ASSURANCE",
    "factorMode": "2FA",
    "constraints": [
      {
         "knowledge": {
             "types": [ "PASSWORD" ]
          }
      }
   ],
   "reauthenticateIn": "PT4H",
}
```

##### Password + SMS
```json
{
    "type": "ASSURANCE",
    "factorMode": "2FA",
    "constraints": [
       {
          "knowledge": {
             "types": [ "PASSWORD" ]
          },
          "possession": {
             "types": [ "SMS" ]
          }
       }
   ],
   "reauthenticateIn": "PT4H"
}
```

##### Any Hardware-Protected Key-Based Authenticator
```json
{
    "type": "ASSURANCE",
    "factorMode": "1FA",
    "constraints": [
       {
          "possession": {
             "methods": [ "FIDO2", "SIGNED_NONCE", "PUSH" ],
             "hardwareProtection": "REQUIRED"
          }
       }
    ],
    "reauthenticateIn": "PT4H"
}
```

##### Any 2 Factors with 1 being a Hardware-Protected Key-based Authenticator
```json
{
    "type": "ASSURANCE",
    "factorMode": "2FA",
    "constraints": [
       {
          "possession": {
             "methods": [ "FIDO2", "SIGNED_NONCE", "PUSH" ],
             "hardwareProtection": "REQUIRED"
          }
       }
    ],
    "reauthenticateIn": "PT4H"
}
```
