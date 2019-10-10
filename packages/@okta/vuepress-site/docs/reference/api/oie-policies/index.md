---
title: Okta Identity Engine Policy API
---

# Okta Identity Engine Policy API

<ApiLifecycle access="ea" />

Okta Identity Engine adds new Policy objects to the Okta `/policies` API, to control and configure the behavior of the steps of the Okta Identity Engine Pipeline.

During the Limited EA phase, Okta Identity Engine is enabled or disabled for an org as a whole. If Okta Identity Engine is enabled for an org, these new Policies control the pipeline end users progress through when accessing OpenID Connect apps. You cannot mix old Policy and Rule objects with new Okta Identity Engine objects; old Policy and Rule objects do not affect the new pipeline.

API endpoints for creating, getting, and updating Policy and Rule objects function the same way in Okta Identity Engine as they do in the existing Okta `/policies` API; only the objects used are different, with Okta Identity Engine introducing a set of new Policy and Rule objects. See the [Okta Identity Engine Policy Objects](#okta-identity-enging-policy-objects) section of this document for descriptions of the objects.

To enable the Okta Identity Engine Pipeline, you need to create at least one of each of the defined Okta Identity Engine Policy objects, and at least one Rule object for each Policy.

## Policies API Operations

The API endpoints support the following operations:

 * [Get Policy](#get-policy)
 * [List Policies](#list-policies)
 * [Get Rule](#get-rule)
 * [List Rules](#list-rules)
 * [Create Policy](#create-policy)
 * [Create Rule](#create-rule)
 * [Update Policy](#update-policy)
 * [Update Rule](#update-rule)
 * [Delete Policy](#delete-policy)
 * [Delete Rule](#delete-rule)
 
### Get Policy

<ApiOperation method="get" url="/policies/${PolicyID}" />

Given a `PolicyID` identifier, returns a [Policy Object](#okta-identity-engine-policy-objects).

#### Request Body

| Property   | Type   | Description                          |
|------------|--------|--------------------------------------|
| `PolicyID` | String | The unique identifier of the Policy. |

#### Request Query Parameters

None

#### Response Body

A [Policy Object](#okta-identity-engine-policy-objects).

#### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/${policyId}"
}'
```
##### Response

```json
{
    "id": "rs10xzYOyK9ux6v70g4",
    "name": "Default Policy",
    "type": "Okta:IdpRouting",
    "status": "ACTIVE",
    "default": true,
    "_links": {
        "self": {
            "href": "https://idx.okta1.com/api/v1/policies/rst10xzYOyK9ux6v70g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        },
        "rules": {
            "href": "https://idx.okta1.com/api/v1/policies/rst10xzYOyK9ux6v70g4/rules",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```

<!-- Add remaining operations. I think it's best to omit the example responses for the remaining operations, would be too cluttered, and just repeats. Enough to just give the curl listing for the request, say that the required parameter is a Policy or Rule ID, and that the response is a Policy or Rule object -->

## Okta Identity Engine Policy Objects

This API uses the following objects:

* [IdP Routing Policy Object](#idp-routing-policy-object)
* [IdP Routing Rule Object](#idp-routing-rule-object)
* [Identifier Match Policy Object](#identifier-match-policy-object)
* [Identifier Match Rule Object](#identifier-match-rule-object)
* [Unknown User Policy Object](#uknown-user-policy-object)
* [Unknown User Rule Object](#unknown-user-rule-object)

<!-- Add one routing and one rule object for each of the OIE policy types-->

Default instances of each Policy type are created automatically when Okta Identity Engine is enabled for your org. Each of those default Policy objects also has a default rule that is created automatically.

### IdP Routing Policy Object

This object determines which IdP end users are routed to. One IdP Routing Policy object is created by default. Additional IdP Routing Policy objects cannot be created. Currently, only the only IdP you can configure for use with the Okta Identity Engine Pipeline is the Okta IdP, so that, although this object needs to exist, it cannot change the behavior of the pipeline.

| Property | Type    | Description                                                                             |
|----------|---------|-----------------------------------------------------------------------------------------|
| id       | String  | Unique identifier for this Policy (read-only).                                           |
| name     | String  | Human-readable name for the Policy, configurable during creation or updating.           |
| type     | String  | Type of the policy. For IdP Routing Policy objects, this needs to be `Okta:IdpRouting`. |
| status   | String  | 'ACTIVE' or                                                                             |
| default  | Boolean | `True` for the first instance of this policy, which gets created by default.            |

### IdP Routing Object Example

```json
{
    "id": "rs10xzYOyK9ux6v70g4",
    "name": "Default Policy",
    "type": "Okta:IdpRouting",
    "status": "ACTIVE",
    "default": true,
    "_links": {
        "self": {
            "href": "https://idx.okta1.com/api/v1/policies/rst10xzYOyK9ux6v70g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        },
        "rules": {
            "href": "https://idx.okta1.com/api/v1/policies/rst10xzYOyK9ux6v70g4/rules",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```

### IdP Routing Rule Object

One IdP Routing Rule Object is created by default. Currently, the Okta Identity Provider is the only supported IdP, and the only supported value for the `requirement.type` property of this rule is `okta_idp`.

| Property    | Type                                                                        | Description                                                                             |
|-------------|-----------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| name        | String                                                                      | Human-readable name for the Policy, configurable during creation or updating.           |
| id          | String                                                                      | Unique identifier for this Policy (read-only)                                           |
| type        | String                                                                      | Type of the policy. For IdP Routing Policy objects, this needs to be `Okta:IdpRouting`. |
| priority    | Integer                                                                     | Used to determine which rules take precedence.                                          |
| conditions  | Array                                                                       | No conditions are supported for this rule type, so this must be an empty array.         |
| action      | String                                                                      | Either `ALLOW` or `DENY`. Controls whether the user is allowed to proceed.              |
| requirement | [IdP Routing Rule Requirement Object](#idp-routing-rule-requirement-object) | Specifies the IdP to use.                                                               |
| status      | String                                                                      | 'ACTIVE' or                                                                             |
| default     | Boolean                                                                     | `True` for the first instance of this rule, which gets created by default.              |

#### IdP Routing Rule Requirement Object

| Property | Type   | Description         |
|----------|--------|---------------------|
| idpId    | String | Must be 'OKTA'.     |
| type     | String | Must be `okta_idp`. |
 
### IdP Routing Rule Object

```json
[
    {
        "name": "Catch-all Rule",
        "id": "rul10y0LatXn0HP2p0g4",
        "type": "Okta:IdpRouting",
        "priority": 2,
        "conditions": [],
        "action": "ALLOW",
        "requirement": {
            "idpId": "OKTA",
            "type": "okta_idp"
        },
        "status": "ACTIVE",
        "default": false,
        "_links": {
            "self": {
                "href": "https://idx.okta1.com/api/v1/policies/rst10xzYOyK9ux6v70g4/rules/rul10y0LatXn0HP2p0g4",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT",
                        "DELETE"
                    ]
                }
            },
            "deactivate": {
                "href": "https://idx.okta1.com/api/v1/policies/rst10xzYOyK9ux6v70g4/rules/rul10y0LatXn0HP2p0g4/lifecycle/deactivate",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            },
            "policy": {
                "href": "https://idx.okta1.com/api/v1/policies/rst10xzYOyK9ux6v70g4",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT"
                    ]
                }
            }
        }
    },
    {
        "name": "Default Rule",
        "id": "default-rule",
        "type": "Okta:IdpRouting",
        "priority": -1,
        "conditions": [],
        "action": "DENY",
        "requirement": {},
        "status": "ACTIVE",
        "default": true,
        "_links": {
            "self": {
                "href": "https://idx.okta1.com/api/v1/policies/rst10xzYOyK9ux6v70g4/rules/default-rule",
                "hints": {
                    "allow": [
                        "GET"
                    ]
                }
            },
            "policy": {
                "href": "https://idx.okta1.com/api/v1/policies/rst10xzYOyK9ux6v70g4",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT"
                    ]
                }
            }
        }
    }
]
```

## Identifier Match Policy Object

This object determines which user profile attributes are used to check for matches between the user and existing user profiles. One Identifier Match Policy object is created by default. You cannot create additional Identifier Match Policy objects.

| Property | Type    | Description                                                                             |
|----------|---------|-----------------------------------------------------------------------------------------|
| id       | String  | Unique identifier for this Policy (read-only).                                           |
| name     | String  | Human-readable name for the Policy, configurable during creation or updating.           |
| type     | String  | Type of the policy. For IdP Routing Policy objects, this needs to be `Okta:IdpRouting`. |
| status   | String  | 'ACTIVE' or                                                                             |
| default  | Boolean | `True` for the first instance of this policy, which gets created by default.            |

### Identifier Match Policy Object Example

```json
{
    "id": "rst10y1rmKOjickDM0g4",
    "name": "Default Policy",
    "type": "Okta:IdentifierMatch",
    "status": "ACTIVE",
    "default": true,
    "_links": {
        "self": {
            "href": "https://idx.okta1.com/api/v1/policies/rst10y1rmKOjickDM0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        },
        "rules": {
            "href": "https://idx.okta1.com/api/v1/policies/rst10y1rmKOjickDM0g4/rules",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```
## Identifier Match Rule Object

One Identifier Match Rule Object is created by default.

| Property    | Type                                                                                  | Description                                                                                                                                |
|-------------|---------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| name        | String                                                                                | Human-readable name for the Policy, configurable during creation or updating.                                                              |
| id          | String                                                                                | Unique identifier for this Policy (read-only)                                                                                              |
| type        | String                                                                                | Type of the policy. For Identifier Match Rule Objects, this needs to be `Okta:IdentifierMatch`.                                            |
| priority    | Integer                                                                               | Used to determine which rules take precedence.                                                                                             |
| conditions  | Array                                                                                 | No conditions are supported for this rule type, so this must be an empty array.                                                            |
| action      | String                                                                                | Either `ALLOW` or `DENY`. Controls whether the user is allowed to proceed.                                                                 |
| requirement | [Identifier Match Rule Requirement Object](#identifier-match-rule-requirement-object) | Specifies the user profile attributes to match against and the action to take in case of conflict between multiple possible user profiles. |
| status      | String                                                                                | 'ACTIVE' or                                                                                                                                |
| default     | Boolean                                                                               | `True` for the first instance of this rule, which gets created by default.                                                                 |

#### Identifier Match Rule Requirement Object

| Property              | Type   | Description                                                                                                                                                                                                                             |
|-----------------------|--------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| identifyingAttributes | Array  | User profile attributes to match. For each, you need to specify the valid ID of a `userType` that the attribute is a part of, as well as the name of the `attribute` that is included in the User Profile Attributes of that User Type. |
| onConflictingUser     | String | Whether to proceed if more than one match is found. Can be `ALLOW` or `DENY`.                                                                                                                                                           |                                                                            |
 
### Identifier Match Rule Object

```json
{
    "name": "Catch-all Rule",
    "id": "rul10y292nt87pGec0g4",
    "type": "Okta:IdentifierMatch",
    "priority": 1,
    "conditions": [],
    "action": "ALLOW",
    "requirement": {
        "identifyingAttributes": [
            {
                "userType": "otyt190o2hyJtSHVZ0g3",
                "attribute": "email"
            }
        ],
        "onConflictingUser": {
            "action": "DENY"
        }
    },
    "status": "ACTIVE",
    "default": false,
    "_links": {
        "self": {
            "href": "https://idx.okta1.com/api/v1/policies/rst10y1rmKOjickDM0g4/rules/rul10y292nt87pGec0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT",
                    "DELETE"
                ]
            }
        },
        "deactivate": {
            "href": "https://idx.okta1.com/api/v1/policies/rst10y1rmKOjickDM0g4/rules/rul10y292nt87pGec0g4/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "policy": {
            "href": "https://idx.okta1.com/api/v1/policies/rst10y1rmKOjickDM0g4",
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

## Unknown User Policy Object

Evaluated if a match was not found with an existing User Profile, the Unknown User Policy determines whether is allowed to register and, if so, what User Type should be used for them.

| Property | Type    | Description                                                                             |
|----------|---------|-----------------------------------------------------------------------------------------|
| id       | String  | Unique identifier for this Policy (read-only).                                           |
| name     | String  | Human-readable name for the Policy, configurable during creation or updating.           |
| type     | String  | Type of the policy. For IdP Routing Policy objects, this needs to be `Okta:UnknownUser`. |
| status   | String  | 'ACTIVE' or                                                                             |
| default  | Boolean | `True` for the first instance of this policy, which gets created by default.            |

### Unknown User Policy Object Example

```json
{
    "id": "rst10y3icArzJtWvf0g4",
    "name": "Default Policy",
    "type": "Okta:UnknownUser",
    "status": "ACTIVE",
    "default": true,
    "_links": {
        "self": {
            "href": "https://idx.okta1.com/api/v1/policies/rst10y3icArzJtWvf0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        },
        "rules": {
            "href": "https://idx.okta1.com/api/v1/policies/rst10y3icArzJtWvf0g4/rules",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```

## Unknown User Rule Object

One Unknown User Rule Object is created by default.

| Property    | Type                                                                                  | Description                                                                                                                                |
|-------------|---------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| name        | String                                                                                | Human-readable name for the Policy, configurable during creation or updating.                                                              |
| id          | String                                                                                | Unique identifier for this Policy (read-only)                                                                                              |
| type        | String                                                                                | Type of the policy. For Identifier Match Rule Objects, this needs to be `Okta:UnknownUser`.                                            |
| priority    | Integer                                                                               | Used to determine which rules take precedence.                                                                                             |
| conditions  | Array                                                                                 | No conditions are supported for this rule type, so this must be an empty array.                                                            |
| action      | String                                                                                | Either `ALLOW` or `DENY`. Controls whether the user is allowed to proceed.                                                                 |
| requirement | [Unknown User Rule Requirement Object](#unknow-user-rule-requirement-object) | Specifies whether to allow an unknown user to register and, if so, what User Type to use for them. |
| status      | String                                                                                | 'ACTIVE' or                                                                                                                                |
| default     | Boolean                                                                               | `True` for the first instance of this rule, which gets created by default.                                                                 |

#### Unkown User Rule Requirement Object

| Property                                   | Type   | Description                                                                                                                                                            |
|--------------------------------------------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `noUserMatch.action`                       | String | `REGISTER` or `DENY` to determine whether unknown users should be allowed to register.                                                                                 |
| `noUserMatch.registration.defaultUserType` | String | Valid ID of a User Type. Sets the User Type to enroll unknown users as, if you have allowed unknown users to register. Not required if `noUserMatch.action` is `DENY`. |      
### Unknown User Rule Object Example

```json
{
    "name": "New Rule",
    "type": "Okta:UnknownUser",
    "priority": 0,
    "action": "ALLOW",
    "conditions": [], 
    "requirement": {
        "noUserMatch": {
            "action": "REGISTER", 
            "registration": {
                "defaultUserType": "{{defaultUserTypeId}}" 
            }
        }
    }
}
```
