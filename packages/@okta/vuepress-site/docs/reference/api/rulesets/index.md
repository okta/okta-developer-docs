---
title: Rule Sets
category: management
---

---
title: Rule Sets
category: management
---

# Rule Sets API

Rule Sets are ordered sets of Rules that support more granular targeting and unioning so that matched Rules can either contribute to the final result or possibly deny the action.

They allow you to define requirements for multiple entities in a more reusable fashion. For example, a particular App may have a certain set of factor enrollment requirements, while a UserType may have a different set. It should be easy to take the union of the Rules governing each.

Rule Sets are exposed under the familiar [Okta Policy API](/docs/reference/api/policy).

We distinguish between Policies and Rule Sets based on the `type` field in the Policy API. Rule Set types always begin with the prefix `Okta:` (such as `Okta:SignOn`).

Rule Sets also introduce the concept of "Mappings", which map a particular Rule Set to a particular App. Mappings represent the governance relationship of a policy over a given resource. Currently Okta allows a single Mapping for each Rule Set.

> **Note:** If you want to change the Rule Set governing a particular resource, you must delete the old Mapping and create a new one.

## Limitations

Okta limits the number of Rule Sets to 100 per [type](#rule-set-types).

## Rule Sets Operations

The Rule Set API supports the following Rule Set operations:

* [Create a Rule Set](#create-a-rule-set)
* [Get a Rule Set by id](#get-a-rule-set-by-id)
* [Get all Rule Sets of a specific type](#get-all-rule-sets-of-a-specific-type)
* [Update a Rule Set](#update-rule-set)
* [Delete a Rule Set](#delete-rule-set)
* [Activate a Rule Set](#activate-a-rule-set)
* [Deactivate a Rule Set](#deactivate-a-rule-set)

### Create a Rule Set

<ApiOperation method="post" url="/api/v1/policies" />

Creates a new Rule Set object.

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Request body

| Property  | Type    | Description                                            |
| --------- | ------- | ------------------------------------------------------ |
| `default` | Boolean | Indicates whether this Rule Set is default             |
| `name`    | String  | A name for this Rule Set                               |
| `status`  | String  | The status of this [Rule Set object](#rule-set-object) |
| `type`    | String  | A valid type of [Rule Set object](#rule-set-object)    |

#### Response body

Returns a [Rule Set](#rule-set-object).

#### Usage example

This request creates a new non-default Sign On Rule Set:

##### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "Okta:SignOn",
  "status": "ACTIVE",
  "name": "My App Assurance Rule Set",
  "default": false
  }
}' "https://${yourOktaDomain}/api/v1/policies"
```

##### Response

```json
{
  "id": "rst30qv3igD5OpiL50g7",
  "name": "My App Assurance Rule Set",
  "type": "Okta:SignOn",
  "status": "ACTIVE",
  "default": false,
  "_links": {
    "mappings": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/mappings",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7",
      "hints": {
        "allow": [
          "GET",
          "PUT",
          "DELETE"
        ]
      }
    },
    "rules": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/rules",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "applications": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/app",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
```

### Get a Rule Set by id

<ApiOperation method="get" url="/api/v1/policies/${ruleSetId}" />

#### Request path parameters

| Parameter   | Type   | Description                                      |
| ----------- | ------ | ------------------------------------------------ |
| `ruleSetId` | String | The `id` of the Rule Set you'd like to retrieve. |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Returns a [Rule Set](#rule-set-object).

#### Usage example

This request returns a Rule Set with an `id` value of `rst30qv3igD5OpiL50g7`.

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7"
```

##### Response

```json
{
  "id": "rst30qv3igD5OpiL50g7",
  "name": "My App Assurance Rule Set",
  "type": "Okta:SignOn",
  "status": "ACTIVE",
  "default": false,
  "_links": {
    "mappings": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/mappings",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7",
      "hints": {
        "allow": [
          "GET",
          "PUT",
          "DELETE"
        ]
      }
    },
    "rules": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/rules",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "applications": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/app",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
```

### Get all Rule Sets of a specific type

<ApiOperation method="get" url="/api/v1/policies?type=${type}" />

Retrieves all Rule Sets with a matching `type` value.

#### Request path parameters

N/A

#### Request query parameters

| Parameter | Type   | Description                                           |
| --------- | ------ | ----------------------------------------------------- |
| `type`    | String | A valid `type` of [Rule Set object](#rule-set-object) |

#### Request body

N/A

#### Response body

An array of [Rule Set](#rule-set-object) objects of the matching type.

#### Usage example

This request would return all Rule Sets with the type `Okta:SignOn`.

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies?type=Okta:SignOn"
```

##### Response

```json
{
  "id": "rst30qv3igD5OpiL50g7",
  "name": "My App Assurance Rule Set",
  "type": "Okta:SignOn",
  "status": "ACTIVE",
  "default": false,
  "_links": {
    "mappings": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/mappings",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7",
      "hints": {
        "allow": [
          "GET",
          "PUT",
          "DELETE"
        ]
      }
    },
    "rules": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/rules",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "applications": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/app",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
```

### Update Rule Set

<ApiOperation method="put" url="/api/v1/policies/${rulesetId}" />

Updates the specified Rule Set.

#### Request path parameters

| Parameter   | Type   | Description                                    |
| ----------- | ------ | ---------------------------------------------- |
| `ruleSetId` | String | The `id` of the Rule Set you'd like to update. |

#### Request query parameters

N/A

#### Request body

| Property | Type   | Description                                    |
| -------- | ------ | ---------------------------------------------- |
| `name`   | String | Name of the Rule Set                           |
| `status` | String | Status of the Rule Set: `ACTIVE` or `INACTIVE` |

> **Note:** The `status` property can only be updated if this is not a default Rule Set.

#### Response body

Returns a [Rule Set](#rule-set-object).

#### Usage example

##### Request

This request updates the `name` and `default` properties, which would set this Rule Set as default and also update its name.

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "Okta:SignOn",
  "id": "rst30qv3igD5OpiL50g7",
  "status": "ACTIVE",
  "name": "My Default App Assurance Rule Set",
  "default": true
  }
}' "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7"
```

##### Response

```json
{
  "id": "rst30qv3igD5OpiL50g7",
  "name": "My Default App Assurance Rule Set",
  "type": "Okta:SignOn",
  "status": "ACTIVE",
  "default": true,
  "_links": {
    "mappings": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/mappings",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7",
      "hints": {
        "allow": [
          "GET",
          "PUT",
          "DELETE"
        ]
      }
    },
    "rules": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/rules",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "applications": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/app",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
```



### Delete Rule Set

<ApiOperation method="delete" url="/api/v1/policies/${rulesetId}" />

Permanently deletes a Rule Set.

#### Request path parameters

| Parameter   | Type   | Description                                    |
| ----------- | ------ | ---------------------------------------------- |
| `ruleSetId` | String | The `id` of the Rule Set you'd like to delete. |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

N/A

#### Usage example

The following request would delete a Rule Set with an `id` value of `rst30qv3igD5OpiL50g7`.

##### Request

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7"
```

##### Response

```http
HTTP/1.1 204 No Content
Content-Type: application/json
```


### Activate a Rule Set

<ApiOperation method="post" url="/api/v1/policies/${rulesetId}/lifecycle/activate" />

Activates the specified Rule Set.

#### Request path parameters

| Parameter   | Type   | Description                                      |
| ----------- | ------ | ------------------------------------------------ |
| `ruleSetId` | String | The `id` of the Rule Set you'd like to activate. |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

No content is returned when the activation is successful.

#### Usage example

The following request would activate the specified Rule Set:

##### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/lifecycle/activate"
```

##### Response

```http
HTTP/1.1 204 No Content
Content-Type: application/json
```

### Deactivate a Rule Set

<ApiOperation method="post" url="/api/v1/policies/${rulesetId}/lifecycle/deactivate" />

Deactivates the specified Rule Set.

#### Request path parameters

| Parameter   | Type   | Description                                        |
| ----------- | ------ | -------------------------------------------------- |
| `ruleSetId` | String | The `id` of the Rule Set you'd like to deactivate. |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

No content is returned when the deactivation is successful.

#### Usage example

The following request would activate the specified Rule Set:

##### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/lifecycle/deactivate"
```

##### Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

## Rule Operations

The Rule Set API supports the following Rule operations:

* [Create a Rule](#create-a-rule)
* [Get a Rule](#get-a-rule)
* [Get all Rules in a Rule Set](#get-all-rules-in-a-rule-set)
* [Update a Rule](#update-a-rule)
* [Delete a Rule](#delete-a-rule)
* [Activate a Rule](#activate-a-rule)
* [Deactivate a Rule](#deactivate-a-rule)

### Create a Rule

<ApiOperation method="post" url="/api/v1/policies/${rulesetId}/rules" />

Creates a new Rule in the specified Rule Set.

#### Request path parameters

| Parameter   | Type   | Description                                              |
| ----------- | ------ | -------------------------------------------------------- |
| `rulesetId` | String | The `id` of the Rule Set that this Rule will be added to |

#### Request query parameters

N/A

#### Request body

| Property      | Type    | Description                                                            |
| ------------- | ------- | ---------------------------------------------------------------------- |
| `action`      | String  | Top-level action for this Rule: `ALLOW` or `DENY`                      |
| `conditions`  | Object  | [Conditions](#conditions-object) for this Rule                         |
| `default`     | Boolean | Indicates whether this is the default Rule (`FALSE` by default)        |
| `name`        | String  | Name of the Rule                                                       |
| `priority`    | Number  | Priority of this Rule                                                  |
| `requirement` | Object  | Specific remediation [Requirements](#requirement-object) for this Rule |
| `status`      | String  | Status of the Rule: `ACTIVE` (default) or `INACTIVE`                   |
| `type`        | String  | Rule type. Valid values: `Okta:SignOn` or `Okta:UserProfile`           |


#### Response body

An Array of [Rules](#rules-object) from the specified Rule Set.

#### Usage example

The following request would create a new Rule in the specified Rule Set.

##### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "Okta:SignOn",
  "name": "EExample App Assurance Rule",
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
}' "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/rules"
```

##### Response

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
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/rules/rul30qv3ijfXq1OPP0g7/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/rules/rul30qv3ijfXq1OPP0g7",
      "hints": {
        "allow": [
          "GET",
          "PUT",
          "DELETE"
        ]
      }
    },
    "policy": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7",
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

### Get a Rule

<ApiOperation method="get" url="/api/v1/policies/${rulesetId}/rules/${ruleId}" />

Retrieves the specified Rule from the specified Rule Set.

#### Request path parameters

| Parameter   | Type   | Description                                      |
| ----------- | ------ | ------------------------------------------------ |
| `ruleSetId` | String | The `id` of the Rule Set this Rule belongs to    |
| `ruleId`    | String | The `id` of the Rule that you'd like to retrieve |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

The specified [Rule](#rule-object)

#### Usage example

The following request would retrieve the specified Rule.

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/rules/rul30qv3ijfXq1OPP0g7
```

##### Response

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
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/rules/rul30qv3ijfXq1OPP0g7/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/rules/rul30qv3ijfXq1OPP0g7",
      "hints": {
        "allow": [
          "GET",
          "PUT",
          "DELETE"
        ]
      }
    },
    "policy": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7",
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

### Get all Rules in a Rule Set

<ApiOperation method="get" url="/api/v1/policies/${rulesetId}/rules" />

Retrieves all Rules in the specified Rule Set.

#### Request path parameters

| Parameter   | Type   | Description                                   |
| ----------- | ------ | --------------------------------------------- |
| `ruleSetId` | String | The `id` of the Rule Set this Rule belongs to |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

An Array of [Rule objects](#rule-object)

#### Usage example

The following request would return all Rules found within the specified Rule Set.

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/rules"
```

##### Response

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
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/rules/rul30qv3ijfXq1OPP0g7/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/rules/rul30qv3ijfXq1OPP0g7",
      "hints": {
        "allow": [
          "GET",
          "PUT",
          "DELETE"
        ]
      }
    },
    "policy": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7",
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

### Update a Rule

<ApiOperation method="put" url="/api/v1/policies/${rulesetId}/rules/${ruleId}" />

Updates the specified Rule found within the specified Rule Set.

#### Request path parameters

| Parameter   | Type   | Description                                      |
| ----------- | ------ | ------------------------------------------------ |
| `ruleSetId` | String | The `id` of the Rule Set this Rule belongs to    |
| `ruleId`    | String | The `id` of the Rule that you'd like to retrieve |

#### Request query parameters

N/A

#### Request body

The following properties can be updated as part of a PUT:

| Property      | Type   | Description                                      |
| ------------- | ------ | ------------------------------------------------ |
| `conditions`  | Object | [Conditions](#conditions-object) for this Rule   |
| `name`        | String | Name of the Rule                                 |
| `priority`    | Number | Priority of the Rule                             |
| `requirement` | Object | [Requirement](#requirement-object) for this Rule |
| `status`      | String | Status of the Rule: `ACTIVE` or `INACTIVE`       |

> **Note:** `status` and `conditions` can only be updated if this Rule is not a default Rule.

#### Response body

A [Rule object](#rule-object)

#### Usage example

The following request would update the `name` and `priority` of the specified Rule.

##### Request

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d `{
  "name": "Example Updated App Assurance Rule",
  "id": "rul30qv3ijfXq1OPP0g7",
  "type": "Okta:SignOn",
  "priority": 1,
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
}` "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/rules/rul30qv3ijfXq1OPP0g7"
```

##### Response

```json
{
  "name": "Example Updated App Assurance Rule",
  "id": "rul30qv3ijfXq1OPP0g7",
  "type": "Okta:SignOn",
  "priority": 1,
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
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/rules/rul30qv3ijfXq1OPP0g7/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/rules/rul30qv3ijfXq1OPP0g7",
      "hints": {
        "allow": [
          "GET",
          "PUT",
          "DELETE"
        ]
      }
    },
    "policy": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7",
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

### Delete a Rule

<ApiOperation method="delete" url="/api/v1/policies/${rulesetId}/rules/${ruleId}" />

Deletes the specified Rule permanently.

#### Request path parameters

| Parameter   | Type   | Description                                      |
| ----------- | ------ | ------------------------------------------------ |
| `ruleSetId` | String | The `id` of the Rule Set this Rule belongs to    |
| `ruleId`    | String | The `id` of the Rule that you'd like to retrieve |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

N/A

#### Usage example

The following request would delete the specified Rule from the specified Rule Set.

##### Request

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/rules/rul30qv3ijfXq1OPP0g7"
```

##### Response

```http
HTTP/1.1 204 No Content
Content-Type: application/json
```

### Activate a Rule

<ApiOperation method="post" url="/api/v1/policies/${rulesetId}/rules/${ruleId}/lifecycle/activate" />

Activates the specified Rule.

#### Request path parameters

| Parameter   | Type   | Description                                      |
| ----------- | ------ | ------------------------------------------------ |
| `ruleSetId` | String | The `id` of the Rule Set this Rule belongs to    |
| `ruleId`    | String | The `id` of the Rule that you'd like to retrieve |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

No content is returned when the activation is successful.

#### Usage example

The following request would activate the specified Rule.

##### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/rules/rul30qv3ijfXq1OPP0g7/lifecycle/activate"
```

##### Response

```http
HTTP/1.1 20 No Content
Content-Type: application/json
```

### Deactivate a Rule

<ApiOperation method="post" url="/api/v1/policies/${rulesetId}/rules/${ruleId}/lifecycle/deactivate" />

Deactivates the specified Rule.

#### Request path parameters

| Parameter   | Type   | Description                                      |
| ----------- | ------ | ------------------------------------------------ |
| `ruleSetId` | String | The `id` of the Rule Set this Rule belongs to    |
| `ruleId`    | String | The `id` of the Rule that you'd like to retrieve |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

No content is returned when the deactivation is successful.

#### Usage example

The following request would deactivate the specified Rule.

##### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/rules/rul30qv3ijfXq1OPP0g7/lifecycle/deactivate"
```

##### Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

## Mapping Operations

The Rule Set API supports the following Mapping operations:

* [Create a Mapping](#create-a-mapping)
* [Get a Mapping by id](#get-a-mapping-by-id)
* [Get all Mappings for a Rule Set](#get-all-mappings-for-a-rule-set)
* [Delete a Mapping](#delete-a-mapping)

### Create a Mapping

<ApiOperation method="post" url="/api/v1/policies/${rulesetId}/mappings" />

Creates a new Mapping for the specified Rule Set.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `ruleSetId`  | String | The `id` of the Rule Set you'd like to create a Mapping for. |

#### Request query parameters

N/A

#### Request body

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `resourceType` | String | The type of Okta object that this Rule Set should be mapped to. (Valid value: `APP`) |
| `resourceId` | String | The `id` of the object that you would like to map this Rule Set to.  |

#### Response body

N/A

#### Usage example

The following request would create a new Mapping between the Rule Set with id `rst30qv3igD5OpiL50g7` and an App with id `0oa10510BvfrKTfzD0g4`

##### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "resourceType": "APP",
  "resourceId": "0oa10510BvfrKTfzD0g4"
}' "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/mappings"
```

##### Response

```json
{
  "id": "rsm30qv3iirGzUyaM0g7",
  "_links": {
    "application": {
      "href": "https://{yourOktaDomain}/api/v1/apps/0oa10510BvfrKTfzD0g4",
      "hints": {
        "allow": [
          "GET",
          "PUT",
          "DELETE"
        ]
      }
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/mappings/rsm30qv3iirGzUyaM0g7",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "policy": {
      "href": "https://{yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7",
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

### Get a Mapping by id

<ApiOperation method="get" url="/api/v1/policies/${rulesetId}/mappings/${mappingId}" />

Retrieves the specified Mapping for the specified Rule Set.

#### Request path parameters

| Parameter   | Type   | Description                   |
| ----------- | ------ | ----------------------------- |
| `mappingId` | String | The identifier for a Mapping  |
| `ruleSetId` | String | The identifier for a Rule Set |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

A [Mapping object](#mapping-object)

#### Usage example

The following request would retrieve a Mapping for this Rule Set.

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/mappings/rsm30qv3iirGzUyaM0g7"
```

##### Response

```json
{
  "id": "rsm30qv3iirGzUyaM0g7",
  "_links": {
    "application": {
      "href": "https://{yourOktaDomain}/api/v1/apps/0oa1z79p3ozTgE5cw0g7",
      "hints": {
        "allow": [
          "GET",
          "PUT",
          "DELETE"
        ]
      }
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/mappings/rsm30qv3iirGzUyaM0g7",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "policy": {
      "href": "https://{yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7",
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

### Get all Mappings for a Rule Set

<ApiOperation method="get" url="/api/v1/policies/${rulesetId}/mappings" />

Retrieves all Mappings associated with the specified Rule Set.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `ruleSetId` | String | The identifier for a Rule Set |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

An Array of [Mapping objects](#mapping-object)

#### Usage example

The following request would retrieve all Mappings associated with a Rule Set.

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/mappings"
```

##### Response

```json
{
  "id": "rsm30qv3iirGzUyaM0g7",
  "_links": {
    "application": {
      "href": "https://your-org.okta.com/api/v1/apps/0oa1z79p3ozTgE5cw0g7",
      "hints": {
        "allow": [
          "GET",
          "PUT",
          "DELETE"
        ]
      }
    },
    "self": {
      "href": "https://your-org.okta.com/api/v1/policies/rst30qv3igD5OpiL50g7/mappings/rsm30qv3iirGzUyaM0g7",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "policy": {
      "href": "https://your-org.okta.com/api/v1/policies/rst30qv3igD5OpiL50g7",
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

### Delete a Mapping

<ApiOperation method="delete" url="/api/v1/policies/${rulesetId}/mappings/${mappingId}" />

Deletes the specified Mapping permanently.

#### Request path parameters

| Parameter   | Type   | Description                   |
| ----------- | ------ | ----------------------------- |
| `mappingId` | String | The identifier for a Mapping  |
| `ruleSetId` | String | The identifier for a Rule Set |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

N/A

#### Usage example

The following request would delete the specified Mapping.

##### Request

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/mappings/rsm30qv3iirGzUyaM0g7"
```

##### Response

```json
```

## Rule Sets API objects

The Rule Sets API involves the following objects:

* [Rule Set](#rule-set-object)
* [Rule](#rule-object)
  * [Conditions](#conditions-object)
  * [Requirement](#requirement-object)
    * [Verification Method](#verification-method-object)
* [Mapping](#mapping-object)

### Rule Set object

#### Rule Set properties

The Rule Set object has several properties:

| Property            | Type         | Description                                                                                                                                                 |
| ------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_links.activate`   | String (URL) | Link to activate a Rule Set or rule (present if the rule is currently inactive)                                                                             |
| `_links.deactivate` | String (URL) | Link to deactivate a Rule Set or rule (present if the rule is currently active)                                                                             |
| `_links.mappings`   | String (URL) | Link to retrieve the Mapping objects for the given Rule Set                                                                                                 |
| `_links.rules`      | String (URL) | Link to retrieve the Rules objects for the given Rule Set                                                                                                   |
| `_links.self`       | String (URL) | Link to the current Rule Set object                                                                                                                         |
| `_links`            | Object       | Specifies read-only [link relations](http://tools.ietf.org/html/rfc5988) available for the current policy. Used for dynamic discovery of related resources. |
| `default`           | Boolean      | Indicates whether this Rule Set is set as default                                                                                                           |
| `id`                | String       | Identifier of this Rule Set                                                                                                                                 |
| `name`              | String       | Name of the Rule Set                                                                                                                                        |
| `status`            | String       | Status of the Rule Set: `ACTIVE` (default) or `INACTIVE`                                                                                                    |
| `type`              | String       | Specifies the [type of Rule Set](#rule-set-types). Valid values: `Okta:SignOn` or `Okta:UserProfile`                                                        |

#### Rule Set JSON example

```json
{
  "id": "rst30qv3igD5OpiL50g7",
  "name": "My App Assurance Rule Set",
  "type": "Okta:SignOn",
  "status": "ACTIVE",
  "default": false,
  "_links": {
    "mappings": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/mappings",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7",
      "hints": {
        "allow": [
          "GET",
          "PUT",
          "DELETE"
        ]
      }
    },
    "rules": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/rules",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "applications": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/app",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
```

#### About Rule Sets

##### Rule Set Types

Different Rule Sets control the behavior for different steps in the Identity Engine pipeline. All Rule Set types share a common framework, message structure and API, but have different settings and Rule data.

* Sign On Rule Sets have the type `Okta:SignOn`, and are always associated with an application via a [Mapping](#resource-mappings). The Okta Identity Engine always evaluates both Okta Sign On Policy and the Sign On Rule Set for the application. The resulting user experience will be the union of both policies.
* User Profile Rule Sets User have the type `Okta:UserProfile`. These Rule Sets specify what profile attributes are required for creating new Users via self-service registration, and also can be used for progressive profiling.

##### Rule Set Priority and Defaults

There is always a default Rule Set created for each [type](#rule-set-types). The default applies to any resources for which other policies in the Okta org do not apply.

- A default Rule Set is required and cannot be deleted.
- The default Rule Set is always the last in the priority order. Any added Rule Sets of this type have higher priority than the default Rule Set.
- The default Rule Set always has one default rule that cannot be deleted. It is always the last rule in the priority order. If you add rules to the default Rule Set, they have a higher priority than the default rule.


### Rule Object

Each Rule Set may contain one or more rules. Rules contain conditions which must be satisfied in order for the rule to be applied.

#### Rule properties

| Property            | Type         | Description                                                                                                                                                 |
| ------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_links.activate`   | String (URL) | Link to activate a Rule Set or rule (present if the rule is currently inactive)                                                                             |
| `_links.deactivate` | String (URL) | Link to deactivate a Rule Set or rule (present if the rule is currently active)                                                                             |
| `_links.mappings`   | String (URL) | Link to retrieve the Mapping objects for the given Rule Set                                                                                                 |
| `_links.rules`      | String (URL) | Link to retrieve the Rules objects for the given Rule Set                                                                                                   |
| `_links.self`       | String (URL) | Link to the current Rule Set object                                                                                                                         |
| `_links`            | Object       | Specifies read-only [link relations](http://tools.ietf.org/html/rfc5988) available for the current Rule. Used for dynamic discovery of related resources. |
| `action`            | String       | Top-level action for Rule: `ALLOW` or `DENY`                                                                                                                |
| `conditions`        | Object       | The [Conditions object](#conditions-object) for this Rule                                                                                                                         |
| `default`           | Boolean      | Indicates whether this is a default Rule                                                                                                                    |
| `id`                | String       | Identifier for this Rule                                                                                                                                    |
| `name`              | String       | A name for this Rule                                                                                                                                        |
| `priority`          | Number       | Priority of this Rule                                                                                                                                       |
| `requirement`       | Object       | The [Requirement object](#requirement-object) for this Rule                                                                                                                        |
| `status`            | String       | Status of the Rule: `ACTIVE` (default) or `INACTIVE`                                                                                                        |
| `type`              | String       | Rule type. Valid values: `Okta:SignOn` or `Okta:UserProfile`                                                                                                |


#### Rule JSON example (Okta:SignOn)

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
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/rules/rul30qv3ijfXq1OPP0g7/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/rules/rul30qv3ijfXq1OPP0g7",
      "hints": {
        "allow": [
          "GET",
          "PUT",
          "DELETE"
        ]
      }
    },
    "policy": {
      "href": "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7",
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

#### Rule JSON example (Okta:ProfileEnrollment)

```json
[
  {
    "name": "Catch-all Rule",
    "id": "rulvhkxYpYuL23YbC0g3",
    "type": "Okta:ProfileEnrollment",
    "priority": 99,
    "conditions": [],
    "action": "ALLOW",
    "requirement": {
      "preRegistrationInlineHooks": [],
      "profileAttributes": [
        {
          "name": "email",
          "label": "Email",
          "required": true
        }
      ],
      "targetGroupIds": [],
      "unknownUserAction": "REGISTER",
      "activationRequirements": {
        "emailVerification": true
      }
    },
    "status": "ACTIVE",
    "default": true,
    "_links": {
      "self": {
        "href": "http://{yourOktaDomain}/api/v1/policies/rstvhjgdpgmkCYKYv0g3/rules/rulvhkxYpYuL23YbC0g3",
        "hints": {
          "allow": [
            "GET",
            "PUT"
          ]
        }
      },
      "policy": {
        "href": "http://{yourOktaDomain}/api/v1/policies/rstvhjgdpgmkCYKYv0g3",
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

### Conditions Object

The Conditions object specifies the conditions that must be met during Rule Set evaluation in order for that Rule to be applied. All conditions must be met in order to apply the requirements for a given rule. The conditions which can be used with a particular Rule depends on the Rule type.


#### Conditions properties

Conditions are represented by a `key`, `op`, and `value` that are used in conjunction with a context object to evaluate to a boolean result. Multiple conditions in a given rule are AND-ed together.

| Property | Type                             | Description                                                     |
| -------- | -------------------------------- | --------------------------------------------------------------- |
| `key`    | String                           | The [key](#key-values) indicates which part of the authentication context to match against                               |
| `op`     | String                           | The operation to perform on the value. See [op values](#op-values) for more |
| `value`  | String, Boolean, Number, or List | A static value to match the `key` against                         |

##### key values

Supported `key` values are limited to:

* `Okta:User`
* `Okta:Group`
* `Okta:Identifier`
* `Okta:UserType`
* `Okta:AppInstance`
* `Okta:NetworkZone`
* `Okta:IpAddress`

##### op values

**For All Data Types**

The `EQUALS` operator can be used regardless of the `value` data type,

**For String Data Types**

If the `value` data type is a String, then the following `op` types may be used:

* `STRING_MATCHES_REGEX`
* `STRING_STARTS_WITH`
* `STRING_ENDS_WITH`
* `STRING_CONTAINS`

**For List Data Types**

If the `value` data type is a list/array, then the following `op` type may be used:

* `IN_LIST`

If the `value` data type is a list/array and the `key` references an attribute in the context object which is also a list/array, then the following `op` type may be used:

* `INTERSECTS`

#### Conditions JSON example

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

### Requirement Object

The contents of the Requirement object are different for each type of Rule:

* For `Okta:SignOn` Rules, the Requirement object returns a [Verification Method object](#verification-method-object)
* For `Okta:ProfileEnrollment` Rules, the Requirement object returns with a [different set of properties](#requirement-properties)

#### Requirement properties

| Property                     | Type    | Description                                                                            |
| ---------------------------- | ------- | -------------------------------------------------------------------------------------- |
| `activationRequirements`     | Object  | Indicates whether `emailVerification` should occur (`true`) or not (`false`, default). |
| `preRegistrationInlineHooks` | Array   | (Optional) The `id` of most one pre-registration Inline Hook                           |
| `profileAttributes.label`    | String  | A display-friendly label for this property.                                            |
| `profileAttributes.name`     | String  | The name of a User Profile property. Can be an existing User Profile property.         |
| `profileAttributes.required` | Boolean | (Optional, default `false`) Indicates if this property is required for enrollment      |
| `profileAttributes`          | Array   | A list of User Profile properties                                                      |
| `targetGroupIds`             | Array   | (Optional, max 1 entry) The `id` of a Group that this user should be added to          |
| `unknownUserAction`          | String  | Which action should be taken if this User is new (Valid values: `DENY`, `REGISTER`)    |

#### Requirement JSON example (Okta:ProfileEnrollment)

```json
"requirement": {
  "preRegistrationInlineHooks": [],
  "profileAttributes": [
    {
      "name": "email",
      "label": "Email",
      "required": true
    }
  ],
  "targetGroupIds": [],
  "unknownUserAction": "REGISTER",
  "activationRequirements": {
    "emailVerification": true
  }
}
```

### Verification Method Object

A Verification Method describes the means by which the user must be verified. The only supported type is `ASSURANCE`.

Assurance is the degree of confidence that the end-user logging into an application or service is the same end-user who previously enrolled or logged in to the application or service.

Authenticators can be broadly classified into factors. A factor represents the mechanism by which a end-user owns or controls the authenticator. The three classifications are:

* Knowledge: something you know, such as a password
* Possession: something you have, such as a ID badge or security key
* Inherence: something you are, such as a fingerprint or other biometric scan

Multi-factor authentication (MFA) is the use of more than one factor. MFA is the most common way to increase assurance. Authenticators also have other characteristics that may raise or lower assurance. For example, possession factors may be implemented in software or hardware, with hardware being able to provide greater protection when storing shared secrets or private keys, and thus providing higher assurance.

| Parameter            | Type              | Description                                                                                                             | Supported Values                                                                                  |
| -------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `factorMode`         | String            | The number of factors required to satisfy this assurance level.                                                         | `1FA`, `2FA`                                                                                      |
| `constraints`        | Object            | A JSON array containing nested authenticator constraint objects which are organized by Authenticator Class.                                                                           | `POSSESSION`, `KNOWLEDGE`                                                                         |
| `types`              | Array             | The Authenticator Types which are allowable.                                                                            | `SECURITY_KEY`, `PHONE`, `EMAIL`, `PASSWORD`, `SECURITY_QUESTION`, `OTP`                          |
| `methods`            | Array             | The Authenticator Methods which are allowable.                                                                          | `PASSWORD`, `SECURITY_QUESTION`, `TOTP`, `SMS`, `VOICE`, `PUSH`, `EMAIL`, `FIDO2`, `SIGNED_NONCE` |
| `hardwareProtection` | String            | Indicates whether any secrets or private keys used during authentication must be hardware protected and not exportable. | `REQUIRED`, `OPTIONAL`                                                                            |
| `reauthenticateIn`   | String (ISO 8601) | The period after which the end-user should be reauthenticated, regardless of activity.                                  | N/A                                                                                               |
| `inactivityPeriod`   | String (ISO 8601) | The period of inactivity after which the user should be reauthenticated.                                                | N/A                                                                                               |

##### Constraints

Each nested constraint object is treated as a list, all of which must be satisfied. The top-level array is treated as a set, one of which must be satisfied.

This can be read logically as: `( (1A && 1B) || (2A && 2B) )`

The number of authenticator class constraints in each constraint object be less than or equal to the value of `factorMode`. If the value is less, there are no constraints on any additional factors.

#### Verification Method JSON Examples

##### Any single Factor
```json
{
  "type": "ASSURANCE",
  "factorMode": "1FA",
  "constraints": [],
  "reauthenticateIn": "PT4H"
}
```

##### Password + any Factor
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

##### Any hardware-protected key-based authenticator
```json
{
  "type": "ASSURANCE",
  "factorMode": "1FA",
  "constraints": [
    {
      "possession": {
        "methods": [
          "FIDO2",
          "SIGNED_NONCE",
          "PUSH"
        ],
        "hardwareProtection": "REQUIRED"
      }
    }
  ],
  "reauthenticateIn": "PT4H"
}
```

##### Any 2 Factors with 1 being a hardware-protected key-based authenticator
```json
{
  "type": "ASSURANCE",
  "factorMode": "2FA",
  "constraints": [
    {
      "possession": {
        "methods": [
          "FIDO2",
          "SIGNED_NONCE",
          "PUSH"
        ],
        "hardwareProtection": "REQUIRED"
      }
    }
  ],
  "reauthenticateIn": "PT4H"
}
```

### Mapping Object

A Mapping object links together an Application and a Rule Set.

#### Mapping properties

| Property             | Type         | Description                                                                                                                                                  |
| -------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `_links.application` | String (URL) | A link to the Application for this Mapping                                                                                                                   |
| `_links.policy`      | String (URL) | A link to the Rule Set for this Mapping                                                                                                                      |
| `_links.self`        | String (URL) | A link to this Mapping                                                                                                                                       |
| `_links`             | Object       | Specifies read-only [link relations](http://tools.ietf.org/html/rfc5988) available for the current Mapping. Used for dynamic discovery of related resources. |
| `id`                 | String       | The identifier for this Mapping                                                                                                                              |


#### Mapping JSON example

```json
{
  "id": "rsm30qv3iirGzUyaM0g7",
  "_links": {
    "application": {
      "href": "https://{yourOktaDomain}/api/v1/apps/0oa1z79p3ozTgE5cw0g7",
      "hints": {
        "allow": [
          "GET",
          "PUT",
          "DELETE"
        ]
      }
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/mappings/rsm30qv3iirGzUyaM0g7",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "policy": {
      "href": "https://{yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7",
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
