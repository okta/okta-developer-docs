---
title: Policy
category: management
---

# Policy API

The Okta Policy API enables an Administrator to perform Policy and Policy Rule operations. The Policy framework is used by Okta to control Rules and settings that govern, among other things, user session lifetime, whether multi-factor authentication is required when logging in, what MFA factors may be employed, password complexity requirements, what types of self-service operations are permitted under various circumstances, and what identity provider to route users to.

Policy settings for a particular Policy type, such as Sign On Policy, consist of one or more Policy objects, each of which contains one or more Policy Rules.  Policies and Rules contain conditions that determine whether they are applicable to a particular user at a particular time.

The Policy API supports the following **Policy operations**:

* Get all policies of a specific type
* Create, read, update, and delete a Policy
* Activate and deactivate a Policy

The Policy API supports the following **Rule operations**:

* Get all Rules for a Policy
* Create, read, update, and delete a Rule for a Policy
* Activate and deactivate a Rule

## Getting started

Explore the Policy API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/7c7660f56191450a27aa)

## Policy API operations

### Get a Policy

<ApiOperation method="get" url="/api/v1/policies/${policyId}" />

##### Request parameters

The Policy ID described in the [Policy object](#policy-object) is required.

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/{policyId}"
```

##### Response example

HTTP 200:
[Policy object](#policy-object)

### Get a Policy with Rules

<ApiOperation method="get" url="/api/v1/policies/${policyId}?expand=rules" />

##### Request parameters

* The Policy ID described in the [Policy object](#policy-object) is required.
* The `expand=rules` query parameter returns up to twenty Rules for the specified Policy. If the Policy has more than 20 Rules, this request returns an error.

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/{policyId}?expand=rules"
```

##### Response types

HTTP 200:
[Policy object](#policy-object)

Included as embedded objects, one or more [Policy Rules](#rules).

### Get all Policies by type

<ApiOperation method="get" url="/api/v1/policies?type=${type}" />

##### Request parameters

The Policy type described in the [Policy object](#policy-object) is required.

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies?type={type}"
```

##### Response types

HTTP 200:
[Policy object](#policy-object)
HTTP 204:
[Policy object](#policy-object)

### Delete Policy

<ApiOperation method="delete" url="/api/v1/policies/${policyId}" />

##### Request parameters

The policy ID described in the [Policy object](#policy-object) is required.

##### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/{policyId}"
```

##### Response types

HTTP 204:
*No Content*

### Update a Policy

<ApiOperation method="put" url="/api/v1/policies/${policyId}" />

##### Request parameters

The Policy ID described in the [Policy object](#Policy-object) is required.

##### Request example

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
}' "https://${yourOktaDomain}/api/v1/policies/{policyId}"
```

##### Response types

HTTP 200:
[Policy object](#policy-object)

### Create a Policy

<ApiOperation method="post" url="/api/v1/policies" />

##### Request example


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
}' "https://${yourOktaDomain}/api/v1/policies"
```

##### Response types

HTTP 204:
[Policy object](#policy-object)

### Activate a Policy

<ApiOperation method="post" url="/api/v1/policies/${policyId}/lifecycle/activate" />

##### Request parameters

The policy id described in the [Policy object](#policy-object) is required.

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/{policyId}/lifecycle/activate"
```

##### Response types

HTTP 204:
*No Content is returned when the activation is successful.*

### Deactivate a Policy

<ApiOperation method="post" url="/api/v1/policies/${policyId}/lifecycle/deactivate" />

##### Request parameters

The policy ID described in the [Policy object](#Policy-object) is required.

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/{policyId}/lifecycle/deactivate"
```

##### Response types

HTTP 204:
*No Content is returned when the deactivation is successful.*

## Rules operations

### Get Policy Rules

<ApiOperation method="get" url="/api/v1/policies/${policyId}/rules" />

##### Request parameters

The Policy ID described in the [Policy object](#policy-object) is required.

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/{policyId}/rules"
```

##### Response types

HTTP 200:
[Rules object](#rules-object)

### Create a Rule

<ApiOperation method="post" url="/api/v1/policies/${policyId}/rules" />

##### Request parameters

The Policy ID described in the [Policy object](#policy-object) is required.

##### Request example

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
}' "https://${yourOktaDomain}/api/v1/policies/{policyId}/rules"
```

##### Response types

HTTP 200:
[Rules object](#rules-object)

### Delete a Rule

<ApiOperation method="delete" url="/api/v1/policies/${policyId}/rules/${ruleId}" />

##### Request parameters

The Policy ID described in the [Policy object](#policy-object) is required.

##### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/{policyId}/rules/{ruleId}"
```

##### Response types

HTTP 204:
*No Content*

### Get a Rule

<ApiOperation method="get" url="/api/v1/policies/${policyId}/rules/${ruleId}" />

##### Request parameters

The policy ID described in the [Policy object](#Policy-object) is required.

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/{policyId}/rules/{ruleId}"
```

##### Response types

HTTP 200:
[Rules object](#rules-object)

### Update a Rule

<ApiOperation method="put" url="/api/v1/policies/${policyId}/rules/${ruleId}" />

##### Request parameters

The policy ID described in the [Policy object](#Policy-object) is required.

##### Request example

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
}' "https://${yourOktaDomain}/api/v1/policies/{policyId}/rules/{ruleId}"
```

##### Response types

HTTP 200:
[Rules object](#rules-object)

### Activate a Rule

<ApiOperation method="post" url="/api/v1/policies/${policyId}/rules/${ruleId}/lifecycle/activate" />

##### Request parameters

The Policy ID described in the [Policy object](#policy-object) is required.

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/{policyId}/rules/{ruleId}/lifecycle/activate"
```

##### Response types

HTTP 204:
*No content*

### Deactivate a Rule

<ApiOperation method="post" url="/api/v1/policies/${policyId}/rules/${ruleId}/lifecycle/deactivate" />

##### Request parameters

The Policy ID described in the [Policy object](#policy-object) is required.

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/{policyId}/rules/{ruleId}/lifecycle/deactivate"
```

##### Response types

HTTP 204:
*No content*

## Policies

### Policy evaluation

When a Policy needs to be retrieved for a particular user, for example when the user attempts to sign in to Okta, or when the user initiates a self-service operation, then a Policy evaluation takes place.
During Policy evaluation each Policy of the appropriate type is considered in turn, in the order indicated by the Policy priority. Each of the conditions associated with the Policy is evaluated. If one or more of the conditions can't be met, then the next Policy in the list is considered. If the conditions can be met, then each of the Rules associated with the Policy is considered in turn, in the order specified by the Rule priority. Each of the conditions associated with a given Rule is evaluated. If all of the conditions associated with a Rule are met, then the settings contained in the Rule, and in the associated Policy, are applied to the user. If none of the Policy Rules have conditions that can be met, then the next Policy in the list is considered.

Policies that have no Rules aren't considered during evaluation and are never applied.

### Policy types

Different Policy types control settings for different operations. All Policy types share a common framework, message structure, and API, but have different Policy settings and Rule data. The data structures specific to each Policy type are discussed in the various sections below.

[Okta Sign On Policy](#okta-sign-on-policy)

[Okta MFA Policy](#multifactor-mfa-enrollment-policy)

[Password Policy](#password-policy)

[IdP Discovery Policy](#idp-discovery-policy)

[OAuth Authorization Policy](/docs/reference/api/authorization-servers/#policy-object)

### Policy priority and defaults

### Default Policies

There is always a default Policy created for each type of Policy. The default Policy applies to any users for whom other Policies in the Okta org don't apply. This ensures that there is always a Policy to apply to a user in all situations.

 - A default Policy is required and can't be deleted.
 - The default Policy is always the last Policy in the priority order. Any added Policies of this type have higher priority than the default Policy.
 - The default Policy always has one default Rule that can't be deleted. It is always the last Rule in the priority order. If you add Rules to the default Policy, they have a higher priority than the default Rule. For information on default Rules, see [Rules object and defaults](#rules-object).
 - The `system` attribute determines whether a Policy is created by a system or by a user.

### Policy priorities

Policies are ordered numerically by priority. This priority determines the order in which they are evaluated for a context match. The highest priority Policy has a `priority` of 1.

For example, assume the following Policies exist.

- Policy A has priority 1 and applies to members of the "Administrators" group.
- Policy B has priority 2 and applies to members of the "Everyone" group.

When a Policy is evaluated for a user, Policy "A" is evaluated first. If the user is a member of the "Administrators" group, then the Rules associated with Policy "A" are evaluated. If a match is found, then the Policy settings are applied. If the user isn't a member of the "Administrators" group, then Policy B is evaluated.

### Policy JSON example (Okta Sign On Policy)

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

### Policy object

The Policy object defines several attributes:

| Parameter   | Description                                                                                                                                          | Data Type                                         | Required | Default                |
| ---------   | -----------                                                                                                                                          | ---------                                         | -------- | -------                |
| id          | Identifier of the Policy                                                                                                                             | String                                            | No       | Assigned               |
| type        | Specifies the [type of Policy](#policy-types). Valid values: `OKTA_SIGN_ON`, `PASSWORD`, `MFA_ENROLL`, `OAUTH_AUTHORIZATION_POLICY`, `IDP_DISCOVERY` | String                                            | Yes      |                        |
| name        | Name of the Policy                                                                                                                                   | String                                            | Yes      |                        |
| system      | This is set to `true` on system policies, which cannot be deleted.                                                                                   | Boolean                                           | No       | `false`                |
| description | Description of the Policy.                                                                                                                           | String                                            | No       | Null                   |
| priority    | Priority of the Policy                                                                                                                               | Int                                               | No       | Last / Lowest Priority |
| status      | Status of the Policy: ACTIVE or INACTIVE                                                                                                             | String                                            | No       | ACTIVE                 |
| conditions  | Conditions for Policy                                                                                                                                | [Conditions object](#conditions-object)           | No       |                        |
| settings    | Settings for Policy                                                                                                                                  | [Policy Settings object](#policy-settings-object) | No       |                        |
| created     | Timestamp when the Policy was created                                                                                                                | Date                                              | No       | Assigned               |
| lastUpdated | Timestamp when the Policy was last modified                                                                                                          | Date                                              | No       | Assigned               |
| _links      | Hyperlinks                                                                                                                                           | [Links object](#links-object)                     | No       |                        |


### Policy Settings object

The Policy Settings object contains the Policy level settings for the particular Policy type. Not all Policy types have Policy-level settings. For example, in a Password Policy the settings object contains, among other items, the password complexity settings. In a Sign On Policy, on the other hand, there are no Policy-level settings. All of the Policy data is contained in the Rules. Each Policy type section explains the settings objects specific to that type.

### Conditions object

The Conditions object specifies the conditions that must be met during Policy evaluation to apply the Policy in question. All Policy conditions, as well as conditions for at least one Rule must be met to apply the settings specified in the Policy and the associated Rule. Policies and Rules may contain different conditions depending on the Policy type. The conditions that can be used with a particular Policy depend on the Policy type. See [conditions](#conditions).

### Links object

Specifies Link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the current Policy. The Links object is used for dynamic discovery of related resources. The Links object is **read-only**.

| Parameter  | Description                                                                     | Data Type | Required |
| ---        | ---                                                                             | ---       | ---      |
| self       | The Policy or Rule                                                              | String    | Yes      |
| activate   | Action to activate a Policy or Rule (present if the Rule is currently inactive) | String    | Yes      |
| deactivate | Action to deactivate a Policy or Rule (present if the Rule is currently active) | String    | Yes      |
| rules      | Action to retrieve the Rules objects for the given Policy                       | String    | Yes      |

## Rules

Each Policy may contain one or more Rules. Rules, like Policies, contain conditions that must be satisfied for the Rule to be applied.

### Rule priority and defaults

### Default Rules

 - Only the default Policy contains a default Rule. You can edit or delete the default Rule.
 - The default Rule is required and always is the last Rule in the priority order. If you add Rules to the default Policy, they have a higher priority than the default Rule.
 - The `system` attribute determines whether a Rule is created by a system or by a user. The default Rule is the only Rule that has this attribute.

### Rule priority

Like Policies, Rules have a priority that govern the order that they are considered during evaluation. The highest priority Rule has a `priority` of 1. For example, if a particular Policy had two Rules:

- Rule A has priority 1 and applies to RADIUS VPN scenarios.
- Rule B has priority 2 and applies to ANYWHERE (network connection) scenarios.

If a request came in from the Radius endpoint, the action in Rule A is taken, and Rule B isn't evaluated. This occurs because even though requests coming from anywhere  match the ANYWHERE location condition of Rule B, Rule A has higher priority and is evaluated first.

### Rules message example (Password Policy)

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

### Rules object

The Rules object defines several attributes:

| Parameter     | Description                                                        | Data Type                                      | Required   | Default                |
| :------------ | :----------------------------------------------------------------- | :--------------------------------------------- | :--------- | :--------------------- |
| id            | Identifier of the Rule                                             | String                                         | No         | Assigned               |
| type          | Rule type. Valid values: `SIGN_ON` or `PASSWORD` or `MFA_ENROLL`   | String (Enum)                                  | Yes        |                        |
| name          | Name of the Rule                                                   | String                                         | Yes        |                        |
| status        | Status of the Rule: `ACTIVE` or `INACTIVE`                         | String (Enum)                                  | No         | ACTIVE                 |
| priority      | Priority of the Rule                                               | Integer                                        | No         | Last / Lowest Priority |
| system        | This is set to `true` on system Rules, which you can't delete.    | Boolean                                        | No         | false                  |
| created       | Timestamp when the Rule was created                                | Date                                           | No         | Assigned               |
| lastUpdated   | Timestamp when the Rule was last modified                          | Date                                           | No         | Assigned               |
| conditions    | Conditions for Rule                                                | [Conditions object](#conditions-object-2)      | No         |                        |
| actions       | Actions for Rule                                                   | [Rules Actions Objects](#actions-objects)      | No         |                        |
| _links        | Hyperlinks                                                         | [Links object](#links-object-2)                | No         |                        |

### Actions objects

Just as Policies contain settings, Rules contain "Actions" that typically specify actions to be taken, or operations that may be allowed, if the Rule conditions are satisfied. For example, in a Password Policy, Rule actions govern whether self-service operations such as reset password or unlock are permitted. Just as different Policy types have different settings, Rules have different actions depending on the type of Policy that they belong to.

### Conditions object

The Conditions object specifies the conditions that must be met during Policy evaluation to apply the Rule in question. All Policy conditions, as well as conditions for at least one Rule must be met to apply the settings specified in the Policy and the associated Rule. Policies and Rules may contain different conditions depending on the Policy type. The conditions that can be used with a particular Policy depend on the Policy type. See [conditions](#conditions).

### Links object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the current Rule. The Links object is used for dynamic discovery of related resources. The Links object is **read-only**.

| Parameter  | Description                                                              | Data Type | Required |
| ---        | ---                                                                      | ---       | ---      |
| self       | The Policy or Rule                                                       | String    | Yes      |
| activate   | Action to activate the Rule (present if the Rules is currently inactive) | String    | Yes      |
| deactivate | Action to deactivate the Rule (present if the Rule is currently active)  | String    | Yes      |

### Conditions

#### People Condition object

The People Condition identifies Users and Groups that are used together. For Policies, you can only include a Group.

| Parameter | Description          | Data Type                                         | Required |
| ---       | ---                  | ---                                               | ---      |
| groups    | The Groups condition | [User Condition object](#user-condition-object)   | Yes      |
| users     | The Users condition  | [Group Condition object](#group-condition-object) | Yes      |

##### User Condition object

Specifies a set of Users to be included or excluded

| Parameter | Description              | Data Type | Required |
| ---       | ---                      | ---       | ---      |
| include   | The Users to be included | Array     | Yes      |
| exclude   | The Users to be excluded | Array     | Yes      |

##### Group Condition object

Specifies a set of Groups whose Users are to be included or excluded

| Parameter | Description               | Data Type | Required |
| ---       | ---                       | ---       | ---      |
| include   | The Groups to be included | Array     | Yes      |
| exclude   | The Groups to be excluded | Array     | Yes      |

#### People Condition object example

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

#### AuthContext Condition object

Specifies an authentication entry point

| Parameter | Description                              | Data Type                             | Required | Default |
| --------- | ---------------------------------------- | ------------------------------------- | -------- | ------- |
| authType  | This tells how the user is authenticated | `ANY` or `RADIUS` or `LDAP_INTERFACE` | No       |  `ANY`  |

> **Note:** The `LDAP_INTERFACE` data type option is an <ApiLifecycle access="ea" /> feature.

#### Network Condition object

Specifies a network selection mode and a set of network zones to be included or excluded. If the connection parameter's data type is `ZONE`, one of the include or exclude arrays is required. Specific zone IDs to include or exclude are enumerated in the respective arrays. You can use the [Zones API](/docs/reference/api/zones/) to manage network zones.

| Parameter  | Description            | Data Type          | Required                               |
| ---------  | ---------------------- | ------------------ | -------------------------------------- |
| connection | Network selection mode | `ANYWHERE`, `ZONE` | No                                     |
| include    | The zones to include   | Array              | Only if connection data type is `ZONE` |
| exclude    | The zones to exclude   | Array              | Only if connection data type is `ZONE` |

> **Note:** You can set the connection parameter to the `ZONE` data type to select individual network zones.

#### Network Condition object example

```json
  "network": {
    "connection": "ZONE",
    "include": [
      "nzowdja2YRaQmOQYp0g3", "nzowe1mKv1D10YNda0g3", "nzowduJMXKsPkRqL40g3"
    ]
  }
```

If you want to include or exclude all zones, you should pass in `ALL_ZONES` as the only element in the include or exclude array.

#### Network Condition object example (exclude All Zones)

```json
  "network": {
    "connection": "ZONE",
    "exclude": [
      "ALL_ZONES"
    ]
  }
```

#### Authentication Provider Condition object

Specifies an authentication provider that masters some or all Users

| Parameter | Description                                    | Data Type                  | Required | Default                     |
| ---       | ---                                            | ---                        | ---      | ---                         |
| provider  | Specifies the required authentication provider | 'Okta', 'Active Directory' | Yes      | 'Okta'                      |
| include   | The AD integrations this Policy applies to     | Array                      | No       | Include all AD integrations |

#### Authentication Provider Condition object example

```json
  "authProvider": {
    "provider": "ACTIVE_DIRECTORY",
    "include": [
      "0oaoz0zUsohjfrWZ80g3"
    ]
  }
```

#### User Identifier Condition object

Specifies a User Identifier condition to match on

| Parameter | Description                                                                               | Data Type                                      | Required |
| ---       | ---                                                                                       | ---                                            | ---      |
| patterns  | The pattern(s) to match                                                                   | Array of [patterns](#patterns-object) objects. | Yes      |
| type      | What to match against, either user ID or an attribute in the User's Okta profile.         | `IDENTIFIER`, `ATTRIBUTE`                      | Yes      |
| attribute | The name of the profile attribute to match against. Only used when `type` is `ATTRIBUTE`. | String                                         | No       |

> **Note:** When using a regex expression, or when matching against Okta user profile attributes, the `patterns` array can have only one element.

#### Patterns object

Used in the User Identifier Condition object, specifies the details of the patterns to match against

| Parameter | Description                                                                                                                             | Data Type | Required |
| ---       | ---                                                                                                                                     | ---       | ---      |
| matchType | The kind of pattern. For regex, use `EXPRESSION`. For simple string matches, options are `EQUALS`, `CONTAINS`, `STARTS_WITH`, `SUFFIX`. | String    | Yes      |
| value     | The regex expression or simple match string                                                                                             | String    | Yes      |

#### User Identifier Condition object example: Regex on Login

> **Note:** The array can have only one element for regex matching.

```json
  "userIdentifier": {
    "patterns": [
      {
        "matchType": "EXPRESSION",
        "value": "^([a-zA-Z0-9_\\-\\.]+)\\.test@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$"
      }
    ],
    "type": "IDENTIFIER"
  }
```

#### User Identifier Condition object example: Domain List on Login

> **Notes:** The array can have multiple elements for non-regex matching.
>
> This example is abbreviated.

```json
  "userIdentifier": {
    "patterns": [
      {
        "matchType": "SUFFIX",
        "value": "gmail.com"
      },
      {
        "matchType": "SUFFIX",
        "value": "google.com"
      }
    ],
    "type": "IDENTIFIER"
  }
```

#### User Identifier Condition object example: User Attribute

> **Note:** The array can have only one value for profile attribute matching.

```json
  "userIdentifier": {
    "patterns": [
      {
        "matchType": "STARTS_WITH",
        "value": "demo"
      }
    ],
    "type": "ATTRIBUTE",
    "attribute": "customField"
  }
```

#### Application and App Instance Condition object

Specifies either a general application or specific App Instance to match on

| Parameter | Description                                           | Data Type | Required |
| ---       | ---                                                   | ---       | ---      |
| include   | The list of applications or App Instances to match on | Array     | Yes      |
| exclude   | The list of applications to exclude                   | Array     | Yes      |

> **NOTE:** If both `include` and `exclude` are empty, then the condition is met for all applications.

#### Application and App Instance Condition object example

> **Note:** This example is abbreviated.

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
      }
    ]
  }
```

#### Platform Condition object

Specifies a particular platform or device to match on

| Parameter | Description              | Data Type | Required |
| ---       | ---                      | ---       | ---      |
| include   | The platforms to include | Array     | Yes      |

#### Platform Condition object example

```json
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
    },
    {
      "type": "DESKTOP",
      "os": {
        "type": "WINDOWS"
      }
    },
    {
      "type": "DESKTOP",
      "os": {
        "type": "OSX"
      }
    }
  ]
}
```

## Type-Specific Policy data structures

## Okta Sign On Policy

Okta Sign On Policy controls the manner in which a user is allowed to sign on to Okta, including whether they are challenged for multifactor authentication (MFA) and how long they are allowed to remain signed in before re-authenticating.

> **Note:** Okta Sign On Policy is different from an application sign-on Policy, which determines the extra levels of authentication (if any) that must be performed before a specific Okta application can be invoked. An application sign-on Policy can't be configured through the API.

### Policy Settings data

The Okta Sign On Policy doesn't contain Policy Settings data. All of the data is contained in the Rules.

### Policy conditions

The following conditions may be applied to the Okta Sign On Policy.

[People Condition](#people-condition-object)

### Okta Sign On Rules action data

#### Signon Action example

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

#### Signon Action object

| Property                | Description                                                                                                                                                               | Data Type                                       | Required                      | Default |
| ---                     | ---                                                                                                                                                                       | ---                                             | ---                           | ---     |
| access                  | `ALLOW` or `DENY`                                                                                                                                                         | `ALLOW` or `DENY`                               | Yes                           | N/A     |
| requireFactor           | Indicates if multifactor authentication is required                                                                                                                      | Boolean                                         | No                            | false   |
| factorPromptMode        | Indicates if the User should be challenged for a second factor (MFA) based on the device being used, a Factor session lifetime, or on every sign-in attempt. | `DEVICE`, `SESSION` or `ALWAYS`                 | Yes, if `requireFactor` is set to `true` | N/A     |
| rememberDeviceByDefault | Indicates if Okta should automatically remember the device                                                                                                                | Boolean                                         | No                            | false   |
| factorLifetime          | Interval of time that must elapse before the User is challenged for MFA, if the Factor prompt mode is set to `SESSION`                                                    | Integer                                         | Yes, if `requireFactor` is `true` | N/A     |
| session                 | Properties governing the User's session lifetime                                                                                                                          | [Signon Session object](#signon-session-object) | No                            |         |


##### Signon Session object

| Property                  | Description                                                                                                                                                                                                                                                               | Data Type | Required | Default |
| ---                       | ---                                                                                                                                                                                                                                                                       | ---       | ---      | ---     |
| maxSessionIdleMinutes     | Maximum number of minutes that a User session can be idle before the session is ended.                                                                                                                                                                                    | Integer   | No       | 120     |
| maxSessionLifetimeMinutes | Maximum number of minutes from User sign in that a user's session is active. Set this to force Users to sign in again after the number of specified minutes. Disable by setting to `0`.                                                                                  | Integer   | No       | 0       |
| usePersistentCookie       | If set to `false`, User session cookies only last the length of a browser session. If set to `true`, User session cookies last across browser sessions. This setting doesn't impact Okta Administrator users who can *never* have persistant session cookies. | Boolean   | No       | false   |

### Rules conditions

The following conditions may be applied to the Rules associated with Okta Sign On Policy:

* [People Condition](#people-condition-object)

* [Network Condition](#network-condition-object)

* [AuthContext Condition](#authcontext-condition-object)

## Multifactor (MFA) Enrollment Policy

> **Note:** The MFA Policy API is a <ApiLifecycle access="beta" /> release.

The Multifactor (MFA) Enrollment Policy controls which MFA methods are available for a User, as well as when a User may enroll in a particular Factor.

#### Policy Settings example

> **Note:** Policy Settings are included only for those Factors that are enabled.

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

### Policy Settings data

#### Policy Factors Configuration object


| Parameter     | Description            | Data Type                                             | Required |
| ---           | ---                    | ---                                                   | ---      |
| duo           | Duo Security           | [Policy MFA Factor object](#policy-mfa-factor-object) | No       |
| fido_u2f      | FIDO U2F               | [Policy MFA Factor object](#policy-mfa-factor-object) | No       |
| fido_webauthn | Windows Hello          | [Policy MFA Factor object](#policy-mfa-factor-object) | No       |
| google_otp    | Google Authenticator   | [Policy MFA Factor object](#policy-mfa-factor-object) | No       |
| okta_call     | Okta Voice Call        | [Policy MFA Factor object](#policy-mfa-factor-object) | No       |
| okta_email    | Okta Email             | [Policy MFA Factor object](#policy-mfa-factor-object) | No       |
| okta_otp      | Okta Verify TOTP       | [Policy MFA Factor object](#policy-mfa-factor-object) | No       |
| okta_password | Okta Password          | [Policy MFA Factor object](#policy-mfa-factor-object) | No       |
| okta_push     | Okta Verify Push       | [Policy MFA Factor object](#policy-mfa-factor-object) | No       |
| okta_question | Okta Security Question | [Policy MFA Factor object](#policy-mfa-factor-object) | No       |
| okta_sms      | Okta SMS               | [Policy MFA Factor object](#policy-mfa-factor-object) | No       |
| rsa_token     | RSA Token              | [Policy MFA Factor object](#policy-mfa-factor-object) | No       |
| symantec_vip  | Symantec VIP           | [Policy MFA Factor object](#policy-mfa-factor-object) | No       |
| yubikey_token | Yubikey Token          | [Policy MFA Factor object](#policy-mfa-factor-object) | No       |

#### Policy MFA Factor object

| Parameter | Description                            | Data Type                                                     | Required |
| ---       | ---                                    | ---                                                           | ---      |
| consent   | Consent requirements for the Factor    | [Policy Factor Consent object](#policy-factor-consent-object) | No       |
| enroll    | Enrollment requirements for the Factor | [Policy Factor Enroll object](#policy-factor-enroll-object)   | No       |


#### Policy Factor Enroll object

| Parameter | Description                               | Data Type                               | Required | Default       |
| ---       | ---                                       | ---                                     | ---      | ---           |
| self      | Requirements for User-initiated enrollment | `NOT_ALLOWED`, `OPTIONAL` or `REQUIRED` | No       | `NOT_ALLOWED` |

#### Policy Factor Consent object

The Policy Factor Consent object is an extensibility point. In the future, Policy may be configurable to require User consent to specified terms when enrolling in a Factor. Currently, settings other than type = `NONE` are ignored.

| Parameter | Description                                                                              | Data Type                                                   | Required | Default |
| ---       | ---                                                                                      | ---                                                         | ---      | ---     |
| terms     | Specifies the consent terms to be offered to the User upon enrolling in the Factor.         | [Policy Factor Consent Terms](#policy-factor-consent-terms) | No       |         |
| type      | User consent type required before enrolling in the Factor: `NONE` or `TERMS_OF_SERVICE`. | String                                                      | No       | NONE    |

#### Policy Factor Consent terms

Currently, the Policy Factor Consent terms settings are ignored.

| Parameter | Description                                       | Data Type                          | Required | Default |
| ---       | ---                                               | ---                                | ---      | ---     |
| format    | The format of the Consent dialog box to be presented. | `TEXT`, `RTF`, `MARKDOWN` or `URL` | No       | N/A     |
| value     | The contents of the Consent dialog box.               | String                             | No       | N/A     |

### Policy conditions

The following conditions may be applied to Multifactor Policy:

* [People Condition](#people-condition-object)

* [Network Condition](#network-condition-object)

* [Application and App Instance Condition](#application-and-app-instance-condition-object)

### Multifactor Rules Action data

#### Multifactor Enrollment Rules Actions example

```json
  "actions": {
    "enroll": {
      "self": "CHALLENGE"
    }
  },
```

#### Rules Actions Enroll object

| Parameter | Description                                                                                               | Data Type                       | Required | Default |
| ---       | ---                                                                                                       | ---                             | ---      | ---     |
| self      | Should the User be enrolled the first time they `LOGIN`, the next time they are `CHALLENGE`d, or `NEVER`? | `CHALLENGE`, `LOGIN` or `NEVER` | Yes      | N/A     |

### Rules conditions

The following conditions may be applied to the Rules associated with MFA Enrollment Policy:

* [People Condition](#people-condition-object)

* [Network Condition](#network-condition-object)

## Password Policy

The Password Policy determines the requirements for a user's password length and complexity, as well as the frequency with which a password must be changed. This Policy also governs the recovery operations that may be performed by the User, including change password, reset (forgot) password, and self-service password unlock.

> **Note:** Password Policies are enforced only for Okta and AD-mastered users. For AD-mastered users, ensure that your Active Directory Policies don't conflict with the Okta Policies.

#### Policy Settings example

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

### Policy Settings data

| Property   | Description         | Data Type                                               | Required |
| ---        | ---                 | ---                                                     | ---      |
| password   | Password settings   | [Password Policy Password object](#password-object)     | No       |
| recovery   | Recovery settings   | [Password Policy Recovery object](#recovery-object)     | No       |
| delegation | Delegation settings | [Password Policy Delegation object](#delegation-object) | No       |

#### Password object

| Property   | Description         | Data Type                                               | Required |
| ---        | ---                 | ---                                                     | ---      |
| complexity | Complexity settings | [Password Complexity object](#complexity-object)        | No       |
| age        | Age settings        | [Password Age object](#age-object)                      | No       |
| lockout    | Lockout settings    | [Password Lockout object](#lockout-object)              | No       |

##### Complexity object

| Property                                  | Description                                                                                                                     | Data Type                                                           | Required | Default     |
| ---                                       | ---                                                                                                                             | ---                                                                 | ---      | ---         |
| minLength                                 | Minimum password length                                                                                                         | integer                                                             | No       | 8           |
| minLowerCase                              | Indicates if a password must contain at least one lower case letter: `0` indicates no, `1` indicates yes                            | integer                                                             | No       | 1           |
| minUpperCase                              | Indicates if a password must contain at least one upper case letter: `0` indicates no, `1` indicates yes                            | integer                                                             | No       | 1           |
| minNumber                                 | Indicates if a password must contain at least one number: `0` indicates no, `1` indicates yes                                       | integer                                                             | No       | 1           |
| minSymbol                                 | Indicates if a password must contain at least one symbol (For example: !@#$%^&*): `0` indicates no, `1` indicates yes                      | integer                                                             | No       | 1           |
| excludeUsername                           | Indicates if the Username must be excluded from the password                                                                   | boolean                                                             | No       | true        |
| excludeAttributes                         | The User profile attributes whose values must be excluded from the password: currently only supports `firstName` and `lastName` | Array                                                               | No       | Empty Array |
| dictionary <ApiLifecycle access="beta" /> | Weak password dictionary lookup settings                                                                                        | [Weak Password Dictionary object](#weak-password-dictionary-object) | No       | N/A         |

###### Weak Password Dictionary object

> **Note:** Weak password lookup is a <ApiLifecycle access="beta" /> feature.

Specifies how lookups for weak passwords are done. Designed to be extensible with multiple possible dictionary types against which to do lookups.

| Property | Description                                 | Data Type                                                       | Required |
| ---      | ---                                         | ---                                                             | ---      |
| common   | Lookup settings for commonly used passwords | [Common Password Lookup object](#common-password-lookup-object) | No       |

##### Common Password Lookup object

| Property | Description                                                             | Data Type | Required | Default |
| ---      | ---                                                                     | ---       | ---      | ---     |
| exclude  | Indicates whether to check passwords against common password dictionary | Boolean   | No       | false   |

##### Age object

| Property       | Description                                                                                                                          | Data Type | Required | Default |
| ---            | ---                                                                                                                                  | ---       | ---      | ---     |
| maxAgeDays     | Specifies how long (in days) a password remains valid before it expireds: `0` indicates no limit                                       | integer   | No       | 0       |
| expireWarnDays | Specifies the number of days prior to password expiration when a User is warned to reset their password: `0` indicates no warning | integer   | No       | 0       |
| minAgeMinutes  | Specifies the minimum time interval (in minutes) between password changes: `0` indicates no limit                                      | integer   | No       | 0       |
| historyCount   | Specifies the number of distinct passwords that a User must create before they can reuse a previous password: `0` indicates none       | integer   | No       | 0       |

##### Lockout object

| Property            | Description                                                                                                                                                 | Data Type | Required | Default |
| ---                 | ---                                                                                                                                                         | ---       | ---      | ---     |
| maxAttempts         | Specifies the number of times Users can attempt to sign in to their accounts with an invalid password before their accounts are locked: `0` indicates no limit | integer   | No       | 0       |
| autoUnlockMinutes   | Specifies the time interval (in minutes) a locked account remains locked before it is automatically unlocked: `0` indicates no limit                          | integer   | No       | 0       |
| showLockoutFailures | Indicates if the User should be informed when their account is locked                                                                                       | Boolean   | No       | false   |

#### Recovery object

| Property | Description                                            | Data Type                                           | Required |
| ---      | ---                                                    | ---                                                 | ---      |
| factors  | Settings for the Factors that may be used for recovery | [Recovery Factors object](#recovery-factors-object) | No       |

##### Recovery Factors object

| Property          | Description                           | Data Type                                                           | Required |
| ---               | ---                                   | ---                                                                 | ---      |
| recovery_question | Settings for Security Question Factor | [Recovery Question Factor object](#recovery-question-factor-object) | No       |
| okta_email        | Settings for Email Factor             | [Email Factor object](#email-factor-object)                         | No       |
| okta_sms          | Settings for SMS Factor               | [SMS Factor object](#sms-factor-object)                             | No       |

###### Recovery Question Factor object

| Property   | Description                                         | Data Type                                                                                 | Required |
| ---        | ---                                                 | ---                                                                                       | ---      |
| status     | Indicates if the Factor is enabled.                 | `ACTIVE`, `INACTIVE` <ApiLifecycle access="ea" />                                         | Yes      |
| properties | Configuration settings for Security Question Factor | [Recovery Question Factor Properties object](#recovery-question-factor-properties-object) | No       |

###### Recovery Question Factor Properties object

| Property   | Description                               | Data Type                                                                                                       | Required |
| ---        | ---                                       | ---                                                                                                             | ---      |
| complexity | Complexity settings for recovery question | [Recovery Question Factor Properties Complexity object](#recovery-question-factor-properties-complexity-object) | No       |

###### Recovery Question Factor Properties Complexity object

| Property  | Description                                             | Data Type | Required | Default |
| ---       | ---                                                     | ---       | ---      | ---     |
| minLength | Minimum length of the password recovery question answer | Integer   | No       | 4       |

###### Email Factor object

| Property   | Description                                                     | Data Type                                                         | Required |
| ---        | ---                                                             | ---                                                               | ---      |
| status     | Indicates if the Factor is enabled. This property is read-only | `ACTIVE`                                                          | Yes      |
| properties | Configuration settings for the Okta Email Factor                    | [Email Factor Properties object](#email-factor-properties-object) | No       |

###### Email Factor Properties object

| Property      | Description             | Data Type                                                                                       | Required |
| ---           | ---                     | ---                                                                                             | ---      |
| recoveryToken | Recovery token settings | [Email Factor Properties Recovery Token object](#email-factor-properties-recovery-token-object) | No       |

###### Email Factor Properties Recovery Token object

| Property             | Description                                 | Data Type | Required | Default |
| ---                  | ---                                         | ---       | ---      | ---     |
| tokenLifetimeMinutes | Lifetime (in minutes) of the recovery token | Integer   | No       | 10080   |

###### SMS Factor object

| Property | Description                         | Data Type            | Required | Default    |
| ---      | ---                                 | ---                  | ---      | ---        |
| status   | Indicates if the Factor is enabled. | `ACTIVE`, `INACTIVE` | No       | 'INACTIVE' |

#### Delegation object

| Property | Description        | Data Type                                    | Required |
| ---      | ---                | ---                                          | ---      |
| options  | Delegation options | [Delegation Options object](#options-object) | No       |

##### Options object

| Property   | Description                                                                                                                                                                            | Data Type | Required | Default |
| ---        | ---                                                                                                                                                                                    | ---       | ---      | ---     |
| skipUnlock | Indicates if, when performing an unlock operation on an Active Directory mastered User who is locked out of Okta, the system should also attempt to unlock the User's Windows account. | Boolean   | No       | false   |

### Policy conditions

The following conditions may be applied to Password Policy:

* [People Condition](#people-condition-object)

* [Authentication Provider Condition](#authentication-provider-condition-object)

### Password Rules Action data

#### Password Actions example

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

#### Password Action object

| Property                 | Description                                                                      | Data Type                                                                        | Required |
| ---                      | ---                                                                              | ---                                                                              | ---      |
| passwordChange           | Properties governing the change password operation                               | [Password Change object](#password-change-action-object)                         | No       |
| selfServicePasswordReset | Properties governing the self-service password reset (forgot password) operation | [Self Service Password Reset object](#self-service-password-reset-action-object) | No       |
| selfServiceUnlock        | Properties governing the self-service unlock operation                           | [Self Service Unlock object](#self-service-unlock-action-object)                 | No       |

##### Password Change Action object

| Property | Description                          | Data Type       | Required | Default |
| ---      | ---                                  | ---             | ---      | ---     |
| access   | Indicates if the action is permitted | `ALLOW`, `DENY` | No       | `DENY`  |

##### Self Service Password Reset Action object

| Property | Description                          | Data Type       | Required | Default |
| ---      | ---                                  | ---             | ---      | ---     |
| access   | Indicates if the action is permitted | `ALLOW`, `DENY` | No       | `DENY`  |

##### Self Service Unlock Action object

| Property | Description                          | Data Type       | Required | Default |
| ---      | ---                                  | ---             | ---      | ---     |
| access   | Indicates if the action is permitted | `ALLOW`, `DENY` | No       | `DENY`  |

### Rules conditions

The following conditions may be applied to the Rules associated with Password Policy:

* [People Condition](#people-condition-object)

* [Network Condition](#network-condition-object)

## IdP Discovery Policy

The IdP Discovery Policy determines where to route Users when they are attempting to sign in to your org. Users can be routed to a variety of identity providers (`SAML2`, `IWA`, `AgentlessDSSO`, `X509`, `FACEBOOK`, `GOOGLE`, `LINKEDIN`, `MICROSOFT`, `OIDC`) based on multiple conditions. For an introduction to the topic, see [IdP Discovery](/docs/concepts/identity-providers/#idp-discovery).

All Okta orgs contain one and only one IdP Discovery Policy, with an immutable default Rule routing to your org's sign-in page.

### Policy conditions

The following conditions may be applied to IdP Discovery Policy:

* [Network Condition](#network-condition-object)

* [Platform Condition](#platform-condition-object)

* [User Identifier Condition](#user-identifier-condition-object)

* [Application and App Instance Condition](#application-and-app-instance-condition-object)

### Policy Action data

#### Policy Action object

| Property  | Description                                                          | Data Type | Required |
| ---       | ---                                                                  | ---       | ---      |
| providers | List of configured identity providers that a given Rule can route to | array     | Yes      |

> **Note:** Currently, this `providers` list only supports one value. IdP types `OKTA`, `AgentlessDSSO`, and `IWA` don't require an `id`.

#### Policy Action Example

> **Note:** The `providers` parameter supports only one value.

```json
  "actions": {
    "idp": {
      "providers": [
        {
          "type": "SAML2",
          "id": "0oaoz0zUsohjfrWZ80g3"
        }
      ]
    }
  }
```
