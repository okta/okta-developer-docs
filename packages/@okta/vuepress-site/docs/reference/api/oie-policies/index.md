---
title: Okta Identity Engine Policy API
---

# Okta Identity Engine Policy API

<ApiLifecycle access="ea" />

Okta Identity Engine adds new Policy objects to the Okta `/policies` API, to control and configure the behavior of the steps of the Okta Identity Engine Pipeline.

During the Limited EA phase, Okta Identity Engine is enabled or disabled for an org as a whole. If Okta Identity Engine is enabled for an org, these new Policies control the pipeline that end users progress through when accessing OpenID Connect apps. You cannot mix old Policy and Rule objects with new Okta Identity Engine objects; old Policy and Rule objects do not affect the new pipeline.

API endpoints for creating, getting, and updating Policy and Rule objects function the same way in Okta Identity Engine as they do in the existing Okta `/policies` API; only the objects used are different, with Okta Identity Engine introducing a set of new Policy and Rule objects. See the [Okta Identity Engine Policy Objects](#okta-identity-enging-policy-objects) section of this document for descriptions of the objects.

Each Policy object, as well as a Rule for it, needs to exist, in order for Okta Identity Engine to function. One of each is created by default when Okta Identity Engine is enabled for an org.

A `/mappings` endpoint is used to set which Policies apply to which Apps. See the [Mappings Between Apps and Policies](#mappings-between-apps-and-policies) section of this document for a description of how to set mappings.

## Policies API Operations

API endpoints for creating, getting, and updating Policy and Rule objects function the same way in Okta Identity Engine as they do in the existing Okta `/policies` API. The API endpoints support the following operations:

 * Get Policy
 * List Policies
 * Get Rule
 * List Rules
 * Create Policy
 * Create Rule
 * Update Policy
 * Update Rule
 * Delete Policy
 * Delete Rule
 
### Sample Operation: Get Policy

<ApiOperation method="get" url="/policies/${PolicyID}" />

Given a `PolicyID` identifier, returns a [Policy Object](#okta-identity-engine-policy-objects).

#### Request Body

| Property | Type   | Description                          |
|----------|--------|--------------------------------------|
| PolicyID | String | The unique identifier of the Policy. |

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

### Syntax for All Other Operations

See <https://developer.okta.com/docs/reference/api/policy/#policy-api-operations> for request syntax for all operations.

## Okta Identity Engine Policy Objects

Okta Identity Engine introducing a set of new Policy and Rule objects that are different from the existing Policy and API objects. These are the objects:

* [IdP Routing Policy Object](#idp-routing-policy-object)
* [IdP Routing Rule Object](#idp-routing-rule-object)
* [Identifier Match Policy Object](#identifier-match-policy-object)
* [Identifier Match Rule Object](#identifier-match-rule-object)
* [Unknown User Policy Object](#uknown-user-policy-object)
* [Unknown User Rule Object](#unknown-user-rule-object)
* [Sign On Policy Object](#sign-on-policy-object)
* [Sign On Rule Object](#sign-on-rule-object)
* [User Profile Policy Object](#user-profile-policy-object)
* [User Profile Rule Object](#user-profile-rule-object)

Default instances of each Policy type are created automatically when Okta Identity Engine is enabled for your org. Each of the default Policy objects also has a default rule that is created automatically.

### IdP Routing Policy Object

This object determines which IdP end users are routed to. One IdP Routing Policy object is created by default. Additional IdP Routing Policy objects cannot be created. Currently, only the only IdP you can configure for use with the Okta Identity Engine Pipeline is the Okta IdP, so that, although this object needs to exist, it cannot change the behavior of the pipeline.

| Property | Type    | Description                                                                             |
|----------|---------|-----------------------------------------------------------------------------------------|
| id       | String  | Unique identifier for this Policy (read-only).                                          |
| name     | String  | Human-readable name for the Policy, configurable during creation or updating.           |
| type     | String  | Type of the policy. For IdP Routing Policy objects, this needs to be `Okta:IdpRouting`. |
| status   | String  | `ACTIVE`  or  `INACTIVE`.                                                               |
| default  | Boolean | `true` for the first instance of this policy, which gets created by default.            |

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

Currently, the Okta Identity Provider is the only supported IdP.

| Property    | Type                                                                        | Description                                                                             |
|-------------|-----------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| name        | String                                                                      | Human-readable name for the Policy, configurable during creation or updating.           |
| id          | String                                                                      | Unique identifier for this Policy (read-only)                                           |
| type        | String                                                                      | Type of the policy. For IdP Routing Policy objects, this needs to be `Okta:IdpRouting`. |
| priority    | Integer                                                                     | Used to determine which rules take precedence.                                          |
| conditions  | Array                                                                       | No conditions are supported for this rule type, so this must be an empty array.         |
| action      | String                                                                      | Either `ALLOW` or `DENY`. Controls whether the user is allowed to proceed.              |
| requirement | [IdP Routing Rule Requirement Object](#idp-routing-rule-requirement-object) | Specifies the IdP to use.                                                               |
| status      | String                                                                      | `ACTIVE`  or  `INACTIVE`.                                                                            |
| default     | Boolean                                                                     | `true` for the first instance of this rule, which gets created by default.              |

#### IdP Routing Rule Requirement Object

| Property | Type   | Description                    |
|----------|--------|--------------------------------|
| idpId    | String | Currently, must be 'OKTA'.     |
| type     | String | Currently, must be `okta_idp`. |
 
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

This object determines which user profile attributes are used to check for matches between the incoming user and existing user profiles. One Identifier Match Policy object is created by default. You cannot create additional Identifier Match Policy objects.

| Property | Type    | Description                                                                                  |
|----------|---------|----------------------------------------------------------------------------------------------|
| id       | String  | Unique identifier for this Policy (read-only).                                               |
| name     | String  | Human-readable name for the Policy, configurable during creation or updating.                |
| type     | String  | Type of the policy. For IdP Routing Policy objects, this needs to be `Okta:IdentifierMatch`. |
| status   | String  | `ACTIVE`  or  `INACTIVE`.                                                                    |
| default  | Boolean | `true` for the first instance of this policy, which gets created by default.                 |

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

| Property    | Type                                                                                  | Description                                                                                                                                |
|-------------|---------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| name        | String                                                                                | Human-readable name for the Policy, configurable during creation or updating.                                                              |
| id          | String                                                                                | Unique identifier for this Policy (read-only)                                                                                              |
| type        | String                                                                                | Type of the policy. For Identifier Match Rule Objects, this needs to be `Okta:IdentifierMatch`.                                            |
| priority    | Integer                                                                               | Used to determine which rules take precedence.                                                                                             |
| conditions  | Array                                                                                 | No conditions are supported for this rule type, so this must be an empty array.                                                            |
| action      | String                                                                                | Either `ALLOW` or `DENY`. Controls whether the user is allowed to proceed.                                                                 |
| requirement | [Identifier Match Rule Requirement Object](#identifier-match-rule-requirement-object) | Specifies the user profile attributes to match against and the action to take in case of conflict between multiple possible user profiles. |
| status      | String                                                                                | `ACTIVE`  or  `INACTIVE`.                                                                                                                  |
| default     | Boolean                                                                               | `true` for the first instance of this rule, which gets created by default.                                                                 |

#### Identifier Match Rule Requirement Object

| Property              | Type   | Description                                                                                                                                                                                                  |
|-----------------------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| identifyingAttributes | Array  | User profile attributes to match. For each, you need to specify the valid ID of a `userType` that the attribute is a part of, as well as the name of an `attribute` in the Profile schema of that User Type. |
| onConflictingUser     | String | Whether to proceed if more than one match is found. Can be `ALLOW` or `DENY`.|                                                                                                                               |                                                                        |
 
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

the Unknown User Policy is evaluated if a match was not found with an existing User Profile and determines whether the user is allowed to register and, if so, what User Type they should be assigned.

| Property | Type    | Description                                                                              |
|----------|---------|------------------------------------------------------------------------------------------|
| id       | String  | Unique identifier for this Policy (read-only).                                           |
| name     | String  | Human-readable name for the Policy, configurable during creation or updating.            |
| type     | String  | Type of the policy. For IdP Routing Policy objects, this needs to be `Okta:UnknownUser`. |
| status   | String  | `ACTIVE`  or  `INACTIVE`.                                                                |
| default  | Boolean | `true` for the first instance of this policy, which gets created by default.             |

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

| Property    | Type                                                                         | Description                                                                                        |
|-------------|------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| name        | String                                                                       | Human-readable name for the Policy, configurable during creation or updating.                      |
| id          | String                                                                       | Unique identifier for this Policy (read-only)                                                      |
| type        | String                                                                       | Type of the policy. For Identifier Match Rule Objects, this needs to be `Okta:UnknownUser`.        |
| priority    | Integer                                                                      | Used to determine which rules take precedence.                                                     |
| conditions  | Array                                                                        | No conditions are supported for this rule type, so this must be an empty array.                    |
| action      | String                                                                       | Either `ALLOW` or `DENY`. Controls whether the user is allowed to proceed.                         |
| requirement | [Unknown User Rule Requirement Object](#unknow-user-rule-requirement-object) | Specifies whether to allow an unknown user to register and, if so, what User Type to use for them. |
| status      | String                                                                       | `ACTIVE`  or  `INACTIVE`.                                                                          |
| default     | Boolean                                                                      | `true` for the first instance of this rule, which gets created by default.                         |

#### Unknown User Rule Requirement Object

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

## Sign On Policy Object

This object determines which credentials to prompt users for. One Sign On Policy Object is created by default.

| Property | Type    | Description                                                                         |
|----------|---------|-------------------------------------------------------------------------------------|
| id       | String  | Unique identifier for this Policy (read-only).                                      |
| name     | String  | Human-readable name for the Policy, configurable during creation or updating.       |
| type     | String  | Type of the policy. For IdP Routing Policy objects, this needs to be `Okta:SignOn`. |
| status   | String  | `ACTIVE`  or  `INACTIVE`.                                                           |
| default  | Boolean | `true` for the first instance of this policy, which gets created by default.        |

### Sign-On Policy Object Example

```json
{
    "id": "rst6v8jmmTIJdv6ms0g4",
    "name": "Sign On Policy",
    "type": "Okta:SignOn",
    "status": "ACTIVE",
    "default": false,
    "_links": {
        "mappings": {
            "href": "https://idx.okta1.com/api/v1/policies/rst6v8jmmTIJdv6ms0g4/mappings",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "self": {
            "href": "https://idx.okta1.com/api/v1/policies/rst6v8jmmTIJdv6ms0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT",
                    "DELETE"
                ]
            }
        },
        "rules": {
            "href": "https://idx.okta1.com/api/v1/policies/rst6v8jmmTIJdv6ms0g4/rules",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "deactivate": {
            "href": "https://idx.okta1.com/api/v1/policies/rst6v8jmmTIJdv6ms0g4/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "applications": {
            "href": "https://idx.okta1.com/api/v1/policies/rst6v8jmmTIJdv6ms0g4/app",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```

## Sign On Rule Object

| Property    | Type                                                                | Description                                                                            |
|-------------|---------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| name        | String                                                              | Human-readable name for the Policy, configurable during creation or updating.          |
| id          | String                                                              | Unique identifier for this Policy (read-only)                                          |
| type        | String                                                              | Type of the policy. For Identifier Match Rule Objects, this needs to be `Okta:SignOn`. |
| priority    | Integer                                                             | Used to determine which rules take precedence.                                         |
| conditions  | Array                                                               | No conditions are supported for this rule type, so this must be an empty array.        |
| action      | String                                                              | Either `ALLOW` or `DENY`. Controls whether the user is allowed to proceed.             |
| requirement | [Sign On Rule Requirement Object](#sign-on-rule-requirement-object) | Specifies credentials to prompt user for.                                              |
| status      | String                                                              | `ACTIVE`  or  `INACTIVE`.                                                              |
| default     | Boolean                                                             | `true` for the first instance of this rule, which gets created by default.             |

#### Sign On Rule Requirement Object

| Property                  | Type   | Description                                                                                                                                         |
|---------------------------|--------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `verificationMethod.type` | String | `CHAIN` or `ANY_FACTOR` to determine whether users should be prompted for a sequence of credentials or allowed to choose one credential from a set. |
| chains                    | Array  | Array specifying the chain of factor types to require. Not required if `verificationMethod.type` is `ANY_FACTOR`.|                                  |      

### Sign On Rule Object Example

```json
{
	"name": "Password THEN Email",
    "type": "Okta:SignOn",
    "priority": 0,
    "conditions": [],
    "action": "ALLOW",
    "requirement": {
        "verificationMethod": {
            "type": "CHAIN",
            "chains": [
                {
                    "criteria": [
                        {
                            "factorType": "password"
                        }
                    ],
                    "next": [
                        {
                            "criteria": [
                                {
                                    "factorType": "email"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}
```

## User Profile Policy Object

This object determines which profile attributes to require users to supply prompt users for. One User Profile Policy Object is created by default.

| Property | Type    | Description                                                                               |
|----------|---------|-------------------------------------------------------------------------------------------|
| id       | String  | Unique identifier for this Policy (read-only).                                            |
| name     | String  | Human-readable name for the Policy, configurable during creation or updating.             |
| type     | String  | Type of the policy. For User Profile Policy objects, this needs to be `Okta:UserProfile`. |
| status   | String  | `ACTIVE`  or  `INACTIVE`.                                                                 |
| default  | Boolean | `true` for the first instance of this policy, which gets created by default.              |

### User Profile Policy Object Example

```json
{
    "id": "rst10y7ftlPBUWJzu0g4",
    "name": "Default Policy",
    "type": "Okta:UserProfile",
    "status": "ACTIVE",
    "default": true,
    "_links": {
        "self": {
            "href": "https://idx.okta1.com/api/v1/policies/rst10y7ftlPBUWJzu0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        },
        "rules": {
            "href": "https://idx.okta1.com/api/v1/policies/rst10y7ftlPBUWJzu0g4/rules",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}

```

## User Profile Rule Object

| Property    | Type                                                                | Description                                                                            |
|-------------|---------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| name        | String                                                              | Human-readable name for the Policy, configurable during creation or updating.          |
| id          | String                                                              | Unique identifier for this Policy (read-only)                                          |
| type        | String                                                              | Type of the policy. For Identifier Match Rule Objects, this needs to be `Okta:SignOn`. |
| priority    | Integer                                                             | Used to determine which rules take precedence.                                         |
| conditions  | Array                                                               | No conditions are supported for this rule type, so this must be an empty array.        |
| action      | String                                                              | Either `ALLOW` or `DENY`. Controls whether the user is allowed to proceed.             |
| requirement | [Sign On Rule Requirement Object](#sign-on-rule-requirement-object) | Specifies credentials to prompt user for.                                              |
| status      | String                                                              | `ACTIVE`  or  `INACTIVE`.                                                              |
| default     | Boolean                                                             | `true` for the first instance of this rule, which gets created by default.             |

#### User Profile Rule Requirement Object

| Property                   | Type   | Description                                                                                                                                                                                                                                    |
|----------------------------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| preRegistrationInlineHooks | String | Optional. The valid ID of an Inline Hook. Sets a Registration Inline Hook to invoke.                                                                                                                                                           |
| profileAttributes          | Array  | Array specifying the `label` and `name` of each User Profile Attribute that should be collected from the user. `label` is human-readable text that can be displayed to the user in a web form. `name` is the name of a User Profile Attribute. |

### User Profile Rule Object Example

```json
{
	"name": "New Rule",
    "type": "Okta:UserProfile",
    "priority": 1,
    "action": "ALLOW",
    "conditions": [],
    "requirement": {
        "preRegistrationInlineHooks": [
            {
                "inlineHookId": "{{inlineHookId}}"
            }
        ],
        "profileAttributes": [
            {
                "label": "First Name",
                "name": "firstName",
                "required": true
            },
            {
                "label": "Last Name",
                "name": "lastName",
                "required": true
            },
            {
                "label": "Email",
                "name": "email",
                "required": true
            }
        ]
    }
}
```
## Mappings Between Apps and Policies

Mappings specify which Policies apply to which Apps. You call the `/policies/${policyId}/mappings` endpoint to set a mapping. You cannot update mappings once you have created them.

Mappings can be used with the following Policy types:

* Sign On
* User Profile

Mappings cannot be used with the following Policy types, which apply universally:

* IdP Routing
* Identifier Match
* Unknown User

#### Mappings Request Body

| Property     | Type   | Description              |
|--------------|--------|--------------------------|
| resourceType | String | Must be `APP`.           |
| resourceID   | String | A valid App Instance ID. |

#### Mappings Path Parameter

| Property | Type   | Description                                           |
|----------|--------|-------------------------------------------------------|
| policyId | String | The ID of the Policy object to apply this mapping to. |

#### Mappings Usage Example

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
	"resourceType": "APP",
	"resourceId": "{{appInstanceId}}"
}' \
"https://${yourOktaDomain}/api/v1/policies/${policyId}/mappings"
```

##### Response

```json
{
    "id": "rsm6v8k4qjUvQgPsa0g4",
    "_links": {
        "application": {
            "href": "https://idx.okta1.com/api/v1/apps/0oat3dEB15WDr5SW30g3",
            "hints": {
                "allow": [
                    "GET",
                    "PUT",
                    "DELETE"
                ]
            }
        },
        "self": {
            "href": "https://idx.okta1.com/api/v1/policies/rst6v8abMiZPFyVfY0g4/mappings/rsm6v8k4qjUvQgPsa0g4",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE"
                ]
            }
        },
        "policy": {
            "href": "https://idx.okta1.com/api/v1/policies/rst6v8abMiZPFyVfY0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT",
                    "DELETE"
                ]
            }
        }
    }
}
```
