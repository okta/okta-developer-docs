---
title: Policy
category: management
---

# Policy API

The Okta Policy API enables an administrator to perform Policy and Policy Rule operations. The Policy framework is used by Okta to control Rules and settings that govern, among other things, user session lifetime, whether multi-factor authentication is required when logging in, what MFA factors may be employed, password complexity requirements, what types of self-service operations are permitted under various circumstances, and what identity provider to route users to.

Policy settings for a particular Policy type, such as Sign On Policy, consist of one or more Policy objects, each of which contains one or more Policy Rules. Policies and Rules contain conditions that determine whether they're applicable to a particular user at a particular time.

The Policy API supports the following **Policy operations**:

* Get all policies of a specific type
* Create, read, update, and delete a Policy
* Get all apps assigned to a specific policy
* Activate and deactivate a Policy

The Policy API supports the following **Rule operations**:

* Get all Rules for a Policy
* Create, read, update, and delete a Rule for a Policy
* Activate and deactivate a Rule

## Get started

Explore the Policy API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/f443644517abb15117af)

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
"https://${yourOktaDomain}/api/v1/policies/${policyId}"
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
"https://${yourOktaDomain}/api/v1/policies/${policyId}?expand=rules"
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
"https://${yourOktaDomain}/api/v1/policies/${policyId}"
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
}' "https://${yourOktaDomain}/api/v1/policies/${policyId}"
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

### Clone a Policy

<ApiLifecycle access="ie" />

> **Note:** This feature is only available as a part of the Identity Engine. Please [contact support](mailto:dev-inquiries@okta.com) for further information.

> **Note:** Within the Identity Engine, this feature is only supported for [authentication policies](#authentication-policy).

<ApiOperation method="post" url="/api/v1/policies/${policyId}/clone" />

##### Request parameters

The policy ID described in the [Policy object](#policy-object) is required.

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/${policyId}/clone"
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
"https://${yourOktaDomain}/api/v1/policies/${policyId}/lifecycle/activate"
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
"https://${yourOktaDomain}/api/v1/policies/${policyId}/lifecycle/deactivate"
```

##### Response types

HTTP 204:
*No Content is returned when the deactivation is successful.*

## Policy mapping operations

### Get applications
<ApiOperation method="get" url="/api/v1/policies/${policyId}/app" />

Retrieves a list of applications mapped to a policy

> **Note:** To assign an application to a specific policy, use the [Update application policy](/docs/reference/api/apps/#update-application-policy) operation of the Apps API.

##### Request parameters

The Policy ID described in the [Policy object](#policy-object) is required.

##### Request example
```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/${policyId}/app"
```

##### Response types

HTTP 200:
Array of [Application objects](/docs/reference/api/apps/#application-object)

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
"https://${yourOktaDomain}/api/v1/policies/${policyId}/rules"
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
}' "https://${yourOktaDomain}/api/v1/policies/${policyId}/rules"
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
"https://${yourOktaDomain}/api/v1/policies/${policyId}/rules/${ruleId}"
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
}' "https://${yourOktaDomain}/api/v1/policies/${policyId}/rules/${ruleId}"
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
"https://${yourOktaDomain}/api/v1/policies/${policyId}/rules/${ruleId}/lifecycle/deactivate"
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

* [Global session policy](#global-session-policy)
* [Authenticator enrollment policy](#authenticator-enrollment-policy) <ApiLifecycle access="ie" />
* [Okta MFA Enrollment Policy](#multifactor-mfa-enrollment-policy)
* [Password Policy](#password-policy)
* [IdP Discovery Policy](#idp-discovery-policy)
* [OAuth Authorization Policy](/docs/reference/api/authorization-servers/#policy-object)
* [Authentication Policy](#authentication-policy) <ApiLifecycle access="ie" /><br>
* [Profile Enrollment Policy](#profile-enrollment-policy) <ApiLifecycle access="ie" /><br>

### Policy priority and defaults

### Default Policies

There is always a default Policy created for each type of Policy. The default Policy applies to new applications by default or any users for whom other Policies in the Okta org don't apply. This ensures that there is always a Policy to apply to a user in all situations.

 - A default Policy is required and can't be deleted.
 - New applications (other than Office365, Radius, and MFA) are assigned to the default Policy.
 - The default Policy is always the last Policy in the priority order. Any added Policies of this type have higher priority than the default Policy.
 - The default Policy always has one default Rule that can't be deleted. It is always the last Rule in the priority order. If you add Rules to the default Policy, they have a higher priority than the default Rule. For information on default Rules, see [Rules object and defaults](#rules-object).
 - The `system` attribute determines whether a Policy is created by a system or by a user.

### Policy priorities

Policies are ordered numerically by priority. This priority determines the order in which they are evaluated for a context match. The highest priority Policy has a `priority` of 1.

For example, assume the following Policies exist.

- Policy A has priority 1 and applies to members of the "Administrators" group.
- Policy B has priority 2 and applies to members of the "Everyone" group.

When a Policy is evaluated for a user, Policy "A" is evaluated first. If the user is a member of the "Administrators" group, then the Rules associated with Policy "A" are evaluated. If a match is found, then the Policy settings are applied. If the user isn't a member of the "Administrators" group, then Policy B is evaluated.

### Policy JSON example (global session policy)

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
| type        | Specifies the [type of Policy](#policy-types). Valid values: `OKTA_SIGN_ON`, `PASSWORD`, `MFA_ENROLL`, `OAUTH_AUTHORIZATION_POLICY`, or `IDP_DISCOVERY`.<br><br> <ApiLifecycle access="ie" /><br>**Note:** The following policy types are available only with the Identity Engine: `ACCESS_POLICY` or `PROFILE_ENROLLMENT`.<br> [Contact support](mailto:dev-inquiries@okta.com) for more information on the Identity Engine.  | String                                            | Yes      |                        |
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

Specifies Link relations (see [Web Linking](http://tools.ietf.org/html/rfc8288) available for the current Policy. The Links object is used for dynamic discovery of related resources. The Links object is **read-only**.

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

- Rule A has priority 1 and applies to LDAP API scenarios.
- Rule B has priority 2 and applies to ANYWHERE (network connection) scenarios.

If a request came in from the LDAP endpoint, the action in Rule A is taken, and Rule B isn't evaluated. This occurs because even though requests coming from anywhere  match the ANYWHERE location condition of Rule B, Rule A has higher priority and is evaluated first.

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
| type          | Rule type. Valid values: `SIGN_ON`, `PASSWORD`, `MFA_ENROLL`, `IDP_DISCOVERY`.<br><br> <ApiLifecycle access="ie" /><br>**Note:** The following policy types are available only with the Identity Engine: `ACCESS_POLICY` or `PROFILE_ENROLLMENT`. <br>[Contact support](mailto:dev-inquiries@okta.com) for more information on the Identity Engine.| String (Enum)                                  | Yes        |                        |
| name          | Name of the Rule                                                   | String                                         | Yes        |                        |
| status        | Status of the Rule: `ACTIVE` or `INACTIVE`                         | String (Enum)                                  | No         | ACTIVE                 |
| priority      | Priority of the Rule                                               | Integer                                        | No         | Last / Lowest Priority |
| system        | This is set to `true` on system Rules, which you can't delete.    | Boolean                                        | No         | false                  |
| created       | Timestamp when the Rule was created                                | Date                                           | No         | Assigned               |
| lastUpdated   | Timestamp when the Rule was last modified                          | Date                                           | No         | Assigned               |
| conditions    | Conditions for a Rule                                                | [Conditions object](#conditions-object-2)      | No         |                        |
| actions       | Actions for Rule                                                   | [Rules Actions Objects](#actions-objects)      | No         |                        |
| _links        | Hyperlinks                                                         | [Links object](#links-object-2)                | No         |                        |

### Actions objects

Just as Policies contain settings, Rules contain "Actions" that typically specify actions to be taken, or operations that may be allowed, if the Rule conditions are satisfied. For example, in a Password Policy, Rule actions govern whether self-service operations such as reset password or unlock are permitted. Just as different Policy types have different settings, Rules have different actions depending on the type of Policy that they belong to.

### Conditions object

The Conditions object specifies the conditions that must be met during Policy evaluation to apply the Rule in question. All Policy conditions, as well as conditions for at least one Rule must be met to apply the settings specified in the Policy and the associated Rule. Policies and Rules may contain different conditions depending on the Policy type. The conditions that can be used with a particular Policy depend on the Policy type. See [conditions](#conditions).

### Links object

Specifies link relations (see [Web Linking](http://tools.ietf.org/html/rfc8288)) available for the current Rule. The Links object is used for dynamic discovery of related resources. The Links object is **read-only**.

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
| groups    | The Groups condition | [Group Condition object](#group-condition-object) | Yes      |
| users     | The Users condition  | [User Condition object](#user-condition-object) | Yes      |

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
#### UserType Condition object

<ApiLifecycle access="ie" />

Specifies which [User Types](/docs/reference/api/user-types/#user-type-object) to include and/or exclude. You can use the [User Types API](/docs/reference/api/user-types/) to manage User Types.

| Parameter | Description                  | Data Type | Required |
| ---       | ---                          | ---       | ---      |
| include   | The User Types to be included | Array     | Yes      |
| exclude   | The User Types to be excluded | Array     | Yes      |

#### UserType Condition object example

```json
  "userType": {
    "include": [
      "oty1q0xE6xRC1rYS30g4"
    ],
    "exclude": [
      "oty1q0xE6xRC1rYS30g4"
    ]
  }
```

#### AuthContext Condition object

Specifies an authentication entry point

| Parameter | Description                              | Data Type                             | Required | Default |
| --------- | ---------------------------------------- | ------------------------------------- | -------- | ------- |
| `authType`  | Specifies how the user is authenticated | `ANY` or `LDAP_INTERFACE` | No       |  `ANY`  |

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

Specifies an authentication provider that is the source of some or all Users

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

#### Device Condition object

<ApiLifecycle access="ie" />

> **Note:** This feature is only available as a part of the Identity Engine. Please [contact support](mailto:dev-inquiries@okta.com) for further information.

Specifies the device condition to match on

| Parameter | Description              | Data Type | Required |
| ---       | ---                      | ---       | ---      |
| registered   | If the device is registered. A device is registered if the User enrolls with Okta Verify that is installed on the device. | Boolean     | No      |
| managed   | If the device is managed. A device is managed if it's managed by a device management system.| Boolean     | No      |

> **Note:** When `managed` is passed, `registered` must also be included and must be set to `true`.

For details on integration with a device management system, see
 - [Configure Device Trust on the Identity Engine for desktop devices](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-mgmt-desktop-mdm-setup)
 - [Configure Device Trust on the Identity Engine for mobile devices](https://help.okta.com/okta_help.htm?type=oie&id=ext-config-mobile)
#### Device Condition object example

```json
"device": {
  "registered": true,
  "managed": true
}
```

#### Risk Score Condition object

Specifies a particular level of risk to match on

| Parameter | Description              | Data Type | Required |
| ---       | ---                      | ---       | ---      |
| level     | The level to match       | `ANY`, `LOW`, `MEDIUM`, or `HIGH`     | Yes      |

#### Risk Score Condition object example

```json
"riskScore": {
  "level": "MEDIUM"
}
```

#### Okta Expression Language Condition object

Use Okta Expression Language as a condition.
See [Okta Expression Language in Identity Engine](/docs/reference/okta-expression-language-in-identity-engine/)


| Parameter | Description              | Data Type | Required |
| ---       | ---                      | ---       | ---      |
| condition     | expression to match       | String     | Yes      |

#### Okta Expression Language Condition object example

```json
"elCondition": {
    "condition":"security.risk.level == 'HIGH'"
}
```


## Type-Specific Policy data structures

## Global session policy

> **Note:** In Identity Engine, the Okta Sign On Policy name has changed to global session policy. The policy type of `OKTA_SIGN_ON` remains unchanged.

Global session policy controls the manner in which a user is allowed to sign in to Okta, including whether they are challenged for multifactor authentication (MFA) and how long they are allowed to remain signed in before re-authenticating.

> **Note:** Global session policy is different from an application-level authentication policy. An authentication policy determines the extra levels of authentication (if any) that must be performed before a specific Okta application can be invoked.

### Policy Settings data

The global session policy doesn't contain Policy Settings data. All of the data is contained in the Rules.

### Policy conditions

The following conditions may be applied to the global session policy.

[People Condition](#people-condition-object)

### Global session policy Rules action data

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
| primaryFactor <ApiLifecycle access="ie" /> | Indicates the primary factor used to establish a session for the org. Supported values: `PASSWORD_IDP_ANY_FACTOR` (users can use any factor required by the app authentication policy to establish a session), `PASSWORD_IDP` (users must always use a password to establish a session)  | String | Yes, if `access` is set to `ALLOW`                        | N/A   |
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

You can apply the following conditions to the Rules associated with a global session policy:

* [People condition](#people-condition-object)

* [Network condition](#network-condition-object)

* [AuthContext condition](#authcontext-condition-object)

* [Risk Score condition](#risk-score-condition-object)

## Authenticator enrollment policy

<ApiLifecycle access="ie" />

> **Note:** In Identity Engine, the Multifactor (MFA) Enrollment Policy name has changed to authenticator enrollment policy. The policy type of `MFA_ENROLL` remains unchanged, however, the `settings` data is updated for authenticators. For Classic Engine, see [Multifactor (MFA) Enrollment Policy](#multifactor-mfa-enrollment-policy).
> The authenticator enrollment policy is a <ApiLifecycle access="beta" /> release.

The authenticator enrollment policy controls which authenticators are available for a User, as well as when a User may enroll in a particular authenticator.

#### Authenticator enrollment policy settings example

<ApiLifecycle access="ie" />

> **Note:** Policy settings are included only for those authenticators that are enabled.

```json
   "settings": {
     "type": "AUTHENTICATORS",
     "authenticators": [
       {
         "key": "security_question",
         "enroll": {
           "self": "OPTIONAL"
         }
       },
       {
         "key": "okta_phone",
         "enroll": {
           "self": "OPTIONAL"
         }
       }
     ]
   }
```

### Policy Settings data

<ApiLifecycle access="ie" />

| Parameter                                                                        | Description                           | Data Type                                                                    | Required | Default   |
| ---                                                                              | ---                                   | ---                                                                          | ---      | ---       |
| authenticators | List of authenticator policy settings | Array of [Policy Authenticator object](#policy-authenticator-object) | No       |           |
| factors                                                                          | Factor policy settings. This parameter is for Classic Engine MFA Enrollment policies that have migrated to Identity Engine but haven't converted to using authenticators yet. Factors and authenticators are mutually exclusive in an authenticator enrollment policy. When a policy is updated to use authenticators, the factors are removed.               | [Policy Factors Configuration object](#policy-factors-configuration-object)  | No       |           |
| type            | Type of policy configuration object   | `FACTORS` or `AUTHENTICATORS`                                                | No       | `FACTORS` |

> **Note:** The `authenticators` parameter allows you to configure all available authenticators, including authentication and recovery. In contrast, the `factors` parameter only allows you to configure multifactor authentication.

> **Note:** For orgs with the Authenticator enrollment policy feature enabled, the new default authenticator enrollment policy created by Okta contains the `authenticators` property in the policy settings. Existing default authenticator enrollment policies from a migrated Classic Engine org remain unchanged and still use the `factors` property in their policy settings.

#### Policy Authenticator object

<ApiLifecycle access="ie" />

| Parameter | Description                                   | Data Type                                                                   | Required |
| ---       | ---                                           | ---                                                                         | ---      |
| key       | A label that identifies the authenticator     | String                                                                      | Yes      |
| enroll    | Enrollment requirements for the authenticator | [Policy Authenticator Enroll object](#policy-authenticator-enroll-object)   | Yes      |
| constraints  <ApiLifecycle access="ea" />  | Constraints for the authenticator | [Policy Authenticator Constraints object](#policy-authenticator-constraints-object)   | No      |

#### Policy Authenticator Enroll object

<ApiLifecycle access="ie" />

| Parameter | Description                                    | Data Type                                | Required | Default       |
| ---       | ---                                            | ---                                      | ---      | ---           |
| self      | Requirements for the user-initiated enrollment | `NOT_ALLOWED`, `OPTIONAL`, or `REQUIRED` | Yes      | `NOT_ALLOWED` |

#### Policy Authenticator Constraints object

<ApiLifecycle access="ie" />
<ApiLifecycle access="ea" />

> **Note:** Allow List for FIDO2 (WebAuthn) Authenticators is an [Early Access](/docs/reference/releases-at-okta/#early-access-ea) (Self-Service) feature. Enable the feature for your org from the **Settings** > **Features** page in the Admin Console.

Configure which FIDO2 WebAuthn authenticators are allowed in your org for new enrollments by defining WebAuthn authenticator groups, then specifying which groups are in the allow list for enrollments. The authenticators in the group are based on FIDO Alliance Metadata Service that is identified by name or the Authenticator Attestation Global Unique Identifier ([AAGUID](https://support.yubico.com/hc/en-us/articles/360016648959-YubiKey-Hardware-FIDO2-AAGUIDs)) number. These groups are defined in the [WebAuthn authenticator method settings](/docs/reference/api/authenticators-admin/#authenticator-method-settings-propeties).

| Parameter | Description                                    | Data Type                                | Required |
| ---       | ---                                            | ---                                      | ---      |
| aaguidGroups      | The list of FIDO2 WebAuthn authenticator groups allowed for enrollment | Array of strings | No      |

##### Authenticator enrollment policy WebAuthn constraints example

<ApiLifecycle access="ie" />
<ApiLifecycle access="ea" />

```json
{
  "key": "webauthn",
  "enroll": {
    "self": "OPTIONAL"
  },
  "constraints": {
    "aaguidGroups": [
      "mixedSecurityKey",
      "YubiKey5"
    ]
  }
}
```

### Policy conditions

The following conditions may be applied to authenticator enrollment policies:

* [People Condition](#people-condition-object)

* [Network Condition](#network-condition-object)

* [Application and App Instance Condition](#application-and-app-instance-condition-object)

### Authenticator Rules Action data

#### Authenticator enrollment rules actions example

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

You can apply the following conditions to the Rules associated with the authenticator enrollment policy:

* [People Condition](#people-condition-object)

* [Network Condition](#network-condition-object)

## Multifactor (MFA) Enrollment Policy

> **Note:** In Identity Engine, the Multifactor (MFA) Enrollment Policy name has changed to [authenticator enrollment policy](#authenticator-enrollment-policy). In Classic Engine, the Multifactor Enrollment Policy type remains unchanged and is a <ApiLifecycle access="beta" /> release.

The Multifactor (MFA) Enrollment Policy controls which MFA methods are available for a User, as well as when a User may enroll in a particular Factor.

#### Policy Factors Settings example

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


| Parameter                                                                        | Description                           | Data Type                                                                    | Required | Default   |
| ---                                                                              | ---                                   | ---                                                                          | ---      | ---       |
| factors                                                                          | Factor policy settings                | [Policy Factors Configuration object](#policy-factors-configuration-object)  | No       |           |

> **Note:** The `factors` parameter only allows you to configure multifactor authentication.

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

> **Note:** Password Policies are enforced only for Okta and AD-sourced users. For AD-sourced users, ensure that your Active Directory Policies don't conflict with the Okta Policies.

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
         "excludeUsername": true,
         "dictionary": {
                        "common": {
                            "exclude": false
                        }
                    },
         "excludeAttributes": []
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
| dictionary | Weak password dictionary lookup settings                                                                                        | [Weak Password Dictionary object](#weak-password-dictionary-object) | No       | N/A         |

###### Weak Password Dictionary object

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
| maxAgeDays     | Specifies how long (in days) a password remains valid before it expires: `0` indicates no limit                                       | integer   | No       | 0       |
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

The Password Policy object contains the factors used for password recovery and account unlock.
However, if you are using the Identity Engine, it is recommended to set recovery factors in the Password Policy Rule as shown in the examples under [Password Rules Action Data](#password-actions-example).

| Property | Description                                            | Data Type                                           | Required |
| ---      | ---                                                    | ---                                                 | ---      |
| factors  | Settings for the Factors that may be used for recovery | [Recovery Factors object](#recovery-factors-object) | No       |

##### Recovery Factors object

| Property          | Description                           | Data Type                                                           | Required |
| ---               | ---                                   | ---                                                                 | ---      |
| recovery_question | Settings for Security Question Factor | [Recovery Question Factor object](#recovery-question-factor-object) | No       |
| okta_email        | Settings for Email Factor             | [Email Factor object](#email-factor-object)                         | No       |
| okta_sms          | Settings for SMS Factor               | [SMS Factor object](#sms-factor-object)                             | No       |
| okta_call         | Settings for Call Factor              | [Call Factor object](#call-factor-object)                           | No       |

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
| properties | Configuration settings for the Okta Email Factor                   | [Email Factor Properties object](#email-factor-properties-object) | No       |

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

###### Call Factor object

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
| skipUnlock | Indicates if, when performing an unlock operation on an Active Directory sourced User who is locked out of Okta, the system should also attempt to unlock the User's Windows account. | Boolean   | No       | false   |

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

<ApiLifecycle access="ie" />

With the Identity Engine, Recovery Factors can be specified inside the Password Policy Rule object instead of in the Policy Settings object. Recovery Factors for the rule are defined inside the `selfServicePasswordReset` Action.

The following three examples demonstrate how Recovery Factors are configured in the Rule based on admin requirements.

In this example, the requirement is that end users verify with just one Authenticator before they can recover their password. Email, SMS, Voice, or Okta Verify Push can be used by end users to initiate recovery. We know that only one Authenticator is required because there are no step up Authenticators specified as can be seen by the `stepUp` object having the `required` attribute set as `false`.

```json
"actions": {
      "passwordChange": {
        "access": "ALLOW"
      },
      "selfServicePasswordReset": {
        "access": "ALLOW",
        "requirement": {
          "primary": {
            "methods": [
              "EMAIL",
              "SMS",
              "VOICE",
              "PUSH"
            ]
          },
          "stepUp": {
            "required": false
          }
        }
      },
      "selfServiceUnlock": {
        "access": "ALLOW"
      }
}
```

In this example, the requirement is that end users verify two Authenticators before they can recover their password. Only email or Okta Verify Push can be used by end users to initiate recovery. A security question is required as a step up.


```json
"actions": {
      "passwordChange": {
        "access": "ALLOW"
      },
      "selfServicePasswordReset": {
        "access": "ALLOW",
        "requirement": {
          "primary": {
            "methods": [
              "EMAIL",
              "PUSH"
            ]
          },
          "stepUp": {
            "required": true,
            "methods": [
              "SECURITY_QUESTION"
            ]
          }
        }
      },
      "selfServiceUnlock": {
        "access": "ALLOW"
      }
}
```

In the final example, end users are required to verify two Authenticators before they can recover their password. Only Okta Verify Push can be used by end users to initiate recovery. A step-up verification is required for which they can use any enrolled Authenticator that can be used for sign-on. This is indicated by the `stepUp` object that contains only the `required` attribute set as `true` but without the `methods` array attribute.


```json
"actions": {
      "passwordChange": {
        "access": "ALLOW"
      },
      "selfServicePasswordReset": {
        "access": "ALLOW",
        "requirement": {
          "primary": {
            "methods": [
              "PUSH"
            ]
          },
          "stepUp": {
            "required": true
          }
        }
      },
      "selfServiceUnlock": {
        "access": "ALLOW"
      }
}
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

> **Note:** The following indicated objects and properties are only available as a part of the Identity Engine. Please contact support for further information.

| Property                                                       | Data Type   | Description                                                                                 | Supported Values                | Required | Default
| ---                                                            | ---         | ---                                                                                         | ---                             | ---      | ---
| `access`                                                       | String      | Indicates if the action is permitted                                                        | `ALLOW`, `DENY`                 | No       | `DENY`
| `requirement` <ApiLifecycle access="ie" />                     | Object      | JSON object that contains Authenticator methods required to be verified if `access` is `ALLOW`. If access is `ALLOW` and `requirement` isn't specified, `recovery.factors` from the parent policy object is used to determine recovery factors.                             | No       |
| `requirement.primary.methods` <ApiLifecycle access="ie" />     | Array       | Authenticator methods that can be used by the End User to initiate a password recovery            | `EMAIL`, `SMS`, `VOICE`, `PUSH` | Yes |
| `requirement.stepUp.required` <ApiLifecycle access="ie" />     | Boolean     | Indicates if any step-up verification is required to recover a password that follows a primary methods verification | `true`, `false` | Yes |
| `requirement.stepUp.methods`  <ApiLifecycle access="ie" />     | Array       | If `requirement.stepUp.required` is `true`, a JSON object that contains Authenticator methods is required to be verified as a step up. If not specified, any enrolled Authenticator methods allowed for sign-on can be used as step up. | `null` or an array containing`SECURITY_QUESTION` | No


##### Self Service Unlock Action object

| Property | Description                          | Data Type       | Required | Default |
| ---      | ---                                  | ---             | ---      | ---     |
| access   | Indicates if the action is permitted | `ALLOW`, `DENY` | No       | `DENY`  |

### Rules conditions

The following conditions may be applied to the Rules associated with Password Policy:

* [People Condition](#people-condition-object)

* [Network Condition](#network-condition-object)

## IdP Discovery Policy

The IdP Discovery Policy determines where to route Users when they are attempting to sign in to your org. Users can be routed to a variety of Identity Providers (`SAML2`, `IWA`, `AgentlessDSSO`, `X509`, `FACEBOOK`, `GOOGLE`, `LINKEDIN`, `MICROSOFT`, `OIDC`) based on multiple conditions. For more information, see [IdP Discovery](/docs/concepts/identity-providers/#idp-discovery).

All Okta orgs contain only one IdP Discovery Policy with an immutable default Rule routing to your org's sign-in page.

### Policy conditions

You can apply the following conditions to the IdP Discovery Policy:

* [Network Condition](#network-condition-object)

* [Platform Condition](#platform-condition-object)

* [User Identifier Condition](#user-identifier-condition-object)

* [Application and App Instance Condition](#application-and-app-instance-condition-object)

### Policy Action data

#### Policy Action object

| Property  | Description                                                          | Data Type | Required |
| ---       | ---                                                                  | ---       | ---      |
| providers | List of configured Identity Providers that a given Rule can route to | array     | Yes      |

> **Note:** Ability to define multiple providers is a part of the Identity Engine.
> Please [contact support](mailto:dev-inquiries@okta.com) for further information.

> **Note:** IdP types of `OKTA`, `AgentlessDSSO`, and `IWA` don't require an `id`.

#### Policy Action example

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

#### Policy Action with multiple IdP instances

<ApiLifecycle access="ie" />

> **Note:** This feature is only available as a part of the Identity Engine. [Contact support](mailto:dev-inquiries@okta.com) for further information.

You can define multiple IdP instances in a single Policy Action. This allows users to choose a Provider when they sign in.

##### Provider object

> **Note:** IdP types `OKTA`, `AgentlessDSSO`, and `IWA` don't require an `id`.

| Property                           | Description             | Data Type | Required |
| ---                                | ---                     | ---       | ---      |
| id                                 | Provider `id` in Okta   | String    | Yes      |
| type                               | Provider type. Possible values: `OKTA`, `AgentlessDSSO`, `IWA`, `X509`, `SAML2`, `OIDC`, `APPLE`, `FACEBOOK`, `GOOGLE`, `LINKEDIN`, `MICROSOFT`           | String | Yes |
| name <ApiLifecycle access="ie" />  | Provider `name` in Okta | String    | No       |

#### Policy Action with Dynamic IdP routing
<ApiLifecycle access="ea"/>

> **Note:** Dynamic IdP Routing is an [Early Access](/docs/reference/releases-at-okta/#early-access-ea) (Self-Service) feature. You can enable the feature for your org from the **Settings** > **Features** page in the Admin Console.

You can choose to define an IdP instance in the Policy action or provide an [Okta Expression Language](/docs/reference/okta-expression-language-in-identity-engine/) with the [Login Context](/docs/reference/okta-expression-language-in-identity-engine/#login-context) that is evaluated with the IdP. For example, the value `login.identifier`
refers to the user's `username`. If the user is signing in with the username `john.doe@mycompany.com`, the expression, `login.identifier.substringAfter('@))` is evaluated to the domain name of the user, for example, `mycompany.com`. The IdP property that the evaluated string should match to is specified as the `propertyName`.

#### Dynamic IdP example

```json
  "idp": {
  "matchCriteria": [
      {
        "providerExpression": "login.identifier.substringAfter('@')",
        "propertyName": "name"
      }
    ],
  "providers": [],
  "idpSelectionType": "DYNAMIC"
}
```
##### IdP object

| Property                           | Description                              | Data Type | Required |
| ---                                | ---                                      | ---       | ---      |
| providerExpression                 | The expression that is evaluated          | Okta Expression Language    | Yes, if `idpSelectionType` is set to `DYNAMIC`      |
| propertyName                       | The property of the IdP that the evaluated `providerExpression` should match. The default value is `name`, which refers to the name of the IdP.| String | No |
| idpSelectionType | Determines whether the rule should use expression language or a specific IdP. Supported values: `SPECIFIC`,`DYNAMIC` | String    | Yes       |

##### Limitations

* You can add up to 10 providers to a single `idp` Policy Action.

* You can define only one `provider` for the following IdP types: `AgentlessDSSO`, `IWA`, `X509`.
* You can't define a provider if `idpSelectionType` is `DYNAMIC`.
* You can't define a `providerExpression` if `idpSelectionType` is `SPECIFIC`.
* If a [User Identifier Condition](#user-identifier-condition-object) is defined together with an `OKTA` provider, sign-in requests are handled by Okta exclusively.

##### Example

```json
  "actions": {
    "idp": {
      "providers": [
        {
          "type": "OKTA"
        },
        {
          "type": "SAML2",
          "id": "0oaoz0zUsohjfrWZ80g3",
          "name": "Other IdP"
        },
        {
          "type": "OIDC",
          "id": "0oaFz3WUgotjUKank5z8",
          "name": "External Identity Provider"
        }
      ]
    }
  }
```

## Authentication policy

<ApiLifecycle access="ie" />

> **Note:** This feature is only available as a part of the Identity Engine. [Contact support](mailto:dev-inquiries@okta.com) for further information.

> **Note:** The app sign-on policy name has changed to authentication policy. The policy type of `ACCESS_POLICY` remains unchanged.

An authentication policy determines the extra levels of authentication (if any) that must be performed before you can invoke a specific Okta application. This policy is always associated with an app through a mapping. Identity Engine always evaluates both the global session policy and the authentication policy for the app. The resulting user experience is the union of both policies. Authentication policies have a policy type of `ACCESS_POLICY`.

When you create a new application, the shared default authentication policy is associated with it. You can [create a different authentication policy for the app](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-auth-policy) or [add additional rules to the default authentication policy](/docs/guides/configure-signon-policy/#select-the-policy-and-add-a-rule) to meet your needs. Remember that any rules that you add to the shared authentication policy are automatically assigned to any new application that you create in your org. Additionally, you can [merge duplicate authentication policies with identical rules](https://help.okta.com/okta_help.htm?type=oie&id=ext-merge-auth-policies) to improve policy management.

> **Note:** You can have a maximum of 5000 authentication policies in an org.
> There is a max limit of 100 rules allowed per policy.
> When you create an authentication policy, you automatically also create a default policy rule with the lowest priority of `99`.
> The highest priority that an authentication policy rule can be set to is `0`.

> **Note:** When you [merge duplicate authentication policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-merge-auth-policies), policy and mapping CRUD operations may be unavailable during the consolidation. When the consolidation is complete, you receive an email.

#### Authentication policy example

```json
    {
        "type": "ACCESS_POLICY",
        "name": "Web Cart App Sign On Policy",
        "description": "Standard policy for Web Cart application"
    }
```

Additionally, there is no direct property to get the policy ID for an application. Instead, you need to retrieve the application object and use the reference to the policy ID that is a part of the application object.

#### Authentication policy reference in HAL link in Application API Object example

```json
    {
        "accessPolicy": {
          "href": "https://demo.okta.com/api/v1/policies/rstn2baH9AACavHBO0g4"
        }
    }
```

### Policy conditions

Policy conditions aren't supported. Conditions are applied at the rule level for these types of policies.

### Policy Rules conditions

You can apply the following conditions to the rules associated with an authentication policy:

* [People Condition](#people-condition-object)

* [Network Condition](#network-condition-object)

* [Device Condition](#device-condition-object)

* [Platform Condition](#platform-condition-object)

* [Okta Expression Language Condition](#okta-expression-language-condition-object)

* [Risk Score Condition](#risk-score-condition-object)

* [User Type Condition](#usertype-condition-object)

#### App Sign On Action default example

```json
  "actions": {
        "appSignOn": {
            "access": "DENY",
            "verificationMethod": {
                "factorMode": "1FA",
                "type": "ASSURANCE",
                "reauthenticateIn": "PT43800H"
            }
        }
    }
```

#### App Sign On Action object

| Property                | Description              | Data Type                                       | Required                      | Default |
| ---                     | ---------------          | ---                                             | ---                           | ---     |
| `access`                  | `ALLOW` or      | `ALLOW` or `DENY`                               | Yes                           | N/A     |
| `verificationMethod`      | Describes the method to verify the user. The only supported method type is `ASSURANCE`.    | [Verification Method Object](#verification-method-object)  | Yes  | [Default](#app-sign-on-action-default-example)        |

### Verification Method object

The Verification Method ensures that a user is verified. The only supported type is `ASSURANCE`.

Assurance is the degree of confidence that the end user signing in to an application or service is the same end user who previously enrolled or signed in to the application or service.

Authenticators can be broadly classified into three kinds of Factors. A Factor represents the mechanism by which an end user owns or controls the Authenticator. The three classifications are:

* Knowledge: something you know, such as a password
* Possession: something you have, such as a phone
* Inherence: something you are, such as a fingerprint or other biometric scan

Multifactor Authentication (MFA) is the use of more than one Factor. MFA is the most common way to increase assurance. Authenticators also have other characteristics that may raise or lower assurance. For example, possession Factors may be implemented in software or hardware, with hardware being able to provide greater protection when storing shared secrets or private keys, and thus providing higher assurance.

| Property            | Data Type              | Description                                                                                                             | Supported Values                                                                                  |
| -------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `factorMode`         | String            | The number of factors required to satisfy this assurance level                                                         | `1FA`, `2FA`                                                                                      |
| `type`         | String            | The Verification Method type                                                         | `ASSURANCE`     |
| `constraints`        | Array of [Constraint Object](#constraints)           | A JSON array that contains nested Authenticator Constraint objects that are organized by the Authenticator class        | [Constraint Object](#constraints) that consists of a `POSSESSION` constraint, a `KNOWLEDGE` constraint, or both. You can't configure an `INHERENCE` constraint, but an inherence factor can satisfy the second part of a 2FA assurance if no other constraints are specified. See [Verification Method JSON Examples](#verification-method-json-examples).  |
| `reauthenticateIn`   | String (ISO 8601) | The duration after which the user must re-authenticate, regardless of user activity. Keep in mind that the re-authentication intervals for `constraints` (see [Constraint object](#constraints)) take precedent over this value. | ISO 8601 period format for recurring time intervals (for example: `PT2H`, `PT0S`, `PT43800H`, and so on)  |
| `inactivityPeriod`   | String (ISO 8601) | The inactivity duration after which the user must re-authenticate  | ISO 8601 period format (for example: `PT2H`)  |

#### Constraints

The Constraints are logically evaluated such that only one Constraint object needs to be satisfied, but within a Constraint object, each Constraint property must be satisfied.

##### Constraints default example

```json
"constraints": [
  { // object 1
    "knowledge": {  // 1A
      "types": [
        "password"
      ],
      "reauthenticateIn": "PTOS"
    },
    "possession": { // 1B
      "userPresence": "OPTIONAL"
    }
  },
  { // object 2
    "knowledge": {  // 2A
      "types": [
        "password"
      ],
    },
    "possession": { // 2B
      "phishingResistant": "REQUIRED"
    }
  }
]
```

In the preceding example, the Assurance policy is satisfied if Constraint object 1 (password factor with re-authentication on every sign-in attempt and a possession factor) or Constraint object 2 (password factor and a possession factor that is a phishing-resistant, such as WebAuthn ) is satisfied.

This can be read logically as: `( (1A && 1B) || (2A && 2B) )`

The number of Authenticator class constraints in each Constraint object must be less than or equal to the value of `factorMode`. If the value of `factorMode` is less, there are no constraints on any additional Factors.

| Property            | Data Type              | Description                                                                                                             | Supported Values                                  | Default |
| -------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |-----------|
| `types`              | Array  of Authenticator types           | The Authenticator types that are permitted                                                                           | [ `SECURITY_KEY`, `PHONE`, `EMAIL`, `PASSWORD`, `SECURITY_QUESTION`, `APP`, `FEDERATED` ]                         |  N/A|
| `methods`            | Array of Authenticator methods           | The Authenticator methods that are permitted                                                                          | [ `PASSWORD`, `SECURITY_QUESTION`, `SMS`, `VOICE`, `EMAIL`, `PUSH`, `SIGNED_NONCE`, `OTP`, `TOTP`, `WEBAUTHN`, `DUO`, `IDP`, `CERT`] |  N/A|
| `hardwareProtection` | String            | Indicates if any secrets or private keys that are used during authentication must be hardware protected and not exportable. This property is only set for `POSSESSION` constraints.| `REQUIRED`, `OPTIONAL`     |   `OPTIONAL`|
| `deviceBound` | String            | Indicates if device-bound Factors are required. This property is only set for `POSSESSION` constraints. | `REQUIRED`, `OPTIONAL`                                                                            |`OPTIONAL`|
| `phishingResistant` | String            | Indicates if phishing-resistant Factors are required. This property is only set for `POSSESSION` constraints. | `REQUIRED`, `OPTIONAL`                                                                            |`OPTIONAL`|
| `userPresence` | String            | Indicates if the user needs to approve an Okta Verify prompt or provide biometrics (meets NIST AAL2 requirements). This property is only set for `POSSESSION` constraints.| `REQUIRED`, `OPTIONAL`                                                                            |`REQUIRED`|
| `reauthenticateIn`   | String (ISO 8601) | The duration after which the user must re-authenticate regardless of user activity. This re-authentication interval overrides the [Verification Method object](#verification-method-object)'s `reauthenticateIn` interval.     | ISO 8601 period format for recurring time intervals (for example: `PT1H`) | N/A|

#### Authenticator key, type, method, and characteristic relationships for constraints

The following table shows the possible relationships between all the authenticators, their methods, and method characteristics to construct constraints for a policy.

> **Note**:
> * Method characteristics with an asterisk (*) indicate that the condition is only satisfied with certain configurations, devices, or flows.
> * You can't configure an inherence (user-verifying characteristic) constraint. However, you can satisfy inherence as the second part of a 2FA assurance if the device or platform supports biometrics.
> * For `smart_card_idp` authenticators, a PIN acts as user verifying so it can satisfy the inherence constraint.

| Authenticator key | Authenticator type | Authenticator method | Constraints<br>(factor class) | Hardware<br>protection | Device<br>bound | Phishing<br>resistant | User<br>presence | User<br>verifying<br>(biometrics) |
| ----------------- | ------------------ | ---------- | ------ | -------- | -------| ---------- | ---------- | ---------- |
| `okta_password` | `PASSWORD` | `PASSWORD` | knowledge |  |  |  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |  |
| `security_question` | `SECURITY_QUESTION` | `SECURITY_QUESTION` | knowledge |  |  |  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |  |
| `okta_email` | `EMAIL` | `EMAIL` | possession |  |  |  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |  |
| `phone_number` | `PHONE` | `SMS` | possession |  |  |  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |  |
| `phone_number` | `PHONE` | `VOICE` | possession |  |  |  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |  |
| `duo` | `APP` | `DUO` | possession |  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> * |  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |  |
| `symantec_vip` | `APP` | `OTP` | possession |  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |  |
| `google_otp` | `APP` | `OTP` | possession |  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |  |
| `okta_verify` | `APP` | `TOTP` | possession |  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> * |  |
| `okta_verify` | `APP` | `PUSH` | possession, inherence | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span>  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> * | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |
| `okta_verify` | `APP` | `SIGNED_NONCE` | possession, inherence | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> * | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> * | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> * | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |
| `custom_app` | `APP` | `PUSH` | possession, inherence | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> * | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |
| `webauthn` | `SECURITY_KEY` | `WEBAUTHN` | possession, inherence |  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span>  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |
| `custom_otp` | `SECURITY_KEY` | `OTP` | possession |  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |  |
| `onprem_mfa` | `SECURITY_KEY` | `OTP` | possession |  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |  |
| `rsa_token` | `SECURITY_KEY` | `OTP` | possession |  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |  |
| `yubikey_token` | `SECURITY_KEY` | `OTP` | possession | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |  |
| `external_idp` | `FEDERATED` | `IDP` | possession |  |  |  | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> |  |
| `smart_card_idp` | `FEDERATED` | `CERT` | possession, knowledge, inherence | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> * | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> | <span style="width: 20px;display:inline-block">![x](/img/icons/icon--check.svg)</span> * |

#### Verification Method JSON examples

##### Any single factor

```json
{
  "type": "ASSURANCE",
  "factorMode": "1FA",
  "constraints": [],
  "reauthenticateIn": "PT4H"
}
```

##### Password + any factor

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
   "reauthenticateIn": "PT4H"
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
        "types": [
          "PASSWORD"
        ]
      },
      "possession": {
        "types": [
          "SMS"
        ]
      }
    }
  ],
  "reauthenticateIn": "PT4H"
}
```

##### Any hardware-protected Authenticator

```json
{
  "type": "ASSURANCE",
  "factorMode": "1FA",
  "constraints": [
    {
      "possession": {
        "hardwareProtection": "REQUIRED"
      }
    }
  ],
  "reauthenticateIn": "PT4H"
}
```

##### Any two factors with one being a hardware-protected Authenticator

```json
{
  "type": "ASSURANCE",
  "factorMode": "2FA",
  "constraints": [
    {
      "possession": {
        "hardwareProtection": "REQUIRED"
      }
    }
  ],
  "reauthenticateIn": "PT4H"
}
```

###### Single factor Duo only

```json
{
  "type": "ASSURANCE",
  "factorMode": "1FA",
  "constraints": [
    {
      "possession": {
        "types": [
          "app"
        ],
        "methods": [
          "duo"
        ]
      }
    }
  ]
}
```

###### Single factor WebAuthn

```json
{
  "type": "ASSURANCE",
  "factorMode": "1FA",
  "constraints": [
    {
      "possession": {
        "types": [
          "security_key"
        ],
        "methods": [
          "webauthn"
        ]
      }
    }
  ]
}
```

###### Okta Verify: OTP only

```json
{
  "type": "ASSURANCE",
  "factorMode": "1FA",
  "constraints": [
    {
      "possession": {
        "types": [
          "app"
        ],
        "methods": [
          "totp"
        ]
      }
    }
  ]
}
```

## Profile Enrollment policy

<ApiLifecycle access="ie" />

Profile Enrollment policies specify which profile attributes are required for creating new Users through self-service registration and also can be used for progressive profiling. The type is specified as `PROFILE_ENROLLMENT`.

When you create a new profile enrollment policy, a policy rule is created by default. This type of policy can only have one policy rule, so it's not possible to create other rules. Instead, consider editing the default one to meet your needs.

> **Note:** You can't update or delete the required base attributes in the default user profile: `email`, `firstName`, or `lastName`.

> **Note:** You can have a maximum of 500 profile enrollment policies in an org.
> A Profile Enrollment policy can only have one rule associated with it. Adding more rules isn't allowed.


#### Profile Enrollment Policy example

```json
    {
        "type": "PROFILE_ENROLLMENT",
        "name": "User Profile Policy",
        "description": "Standard policy for profile enrollment"
    }
```

### Policy conditions

Policy conditions aren't supported for this policy.

### Policy Rules conditions

Policy Rule conditions aren't supported for this policy.

#### Profile Enrollment Action default example

```json
        "actions": {
            "profileEnrollment": {
                "access": "ALLOW",
                "preRegistrationInlineHooks": null,
                "profileAttributes": [
                    {
                        "name": "email",
                        "label": "Email",
                        "required": true
                    },
                    {
                        "name": "fax",
                        "label": "Fax",
                        "required": true
                    }
                ],
                "targetGroupIds": null,
                "unknownUserAction": "DENY",
                "activationRequirements": {
                    "emailVerification": true
                },
                "uiSchemaId": "uis44fio9ifOCwJAO1d7",
                "enrollAuthenticators": null
            }
        }
```

#### Profile Enrollment Action object

| Property                | Description                                                                                                                                                               | Data Type                                       | Required                      | Default |
| ---                     | ---                                                                                                                                                                       | ---                                             | ---                           | ---     |
| `access`                  | `ALLOW` or `DENY`                                                                                                                                                         | `ALLOW` or `DENY`                               | Yes                           | N/A     |
| `activationRequirements`  | Contains a single Boolean property that indicates whether `emailVerification` should occur (`true`) or not (`false`, default)       | Object | Yes |        `false`                                                                                                                                                                                                              |
| `preRegistrationInlineHooks` | (Optional) The `id` of at most one registration inline  hook                                                                       | Array   | No | N/A                                                                                                                                                                                                                        |
| `profileAttributes.label`    | A display-friendly label for this property                                                                                       | String  |  Required | N/A                                                                                                                                                                                                                      |
| `profileAttributes.name`     | The name of a User Profile property. Can be an existing User Profile property.                                                   | String  |  Required | N/A                                                                                                                                                                                                                          |
| `profileAttributes.required` | (Optional, default `FALSE`) Indicates if this property is required for enrollment                                                 | Boolean | Required | `FALSE`                                                                                                                                                                                                                        |
| `profileAttributes` | A list of attributes to prompt the user during registration or progressive profiling. Where defined on the User schema, these attributes are persisted in the User profile. Non-schema attributes may also be added, which aren't persisted to the User's profile, but are included in requests to the registration inline hook. A maximum of 10 Profile properties is supported.                                                         | Array | Required | N/A                                                                                                                                                                                                                        |
| `targetGroupIds`             | (Optional, max 1 entry) The `id` of a Group that this User should be added to                                                     | Array   | No | N/A                                                                                                                                                                                                                         |
| `unknownUserAction`          | Which action should be taken if this User is new (Valid values: `DENY`, `REGISTER`)                                               | String  | YES | N/A                                                                                                                                                                                                                        |
| `uiSchemaId`                 | Value created by the backend. If present all policy updates must include this attribute/value.                                               | String  | Required if Present | N/A                                                                                                                                                                                                                        |
| `enrollAuthenticators` | Additional authenticator fields that can be used on the first page of user registration (Valid values: `password`) | Array | No | N/A |

> **Note:** The Profile Enrollment Action object can't be modified to set the `access` property to `DENY` after the policy is created.
