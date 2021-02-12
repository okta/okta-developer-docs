---
title: OIE Policies Updates
category: other
---

# Okta Identity Engine New Types for Policy API

<!-- AS OF 2020-08-19 THIS SHOULD BE A PART OF THE POLICY API. THIS MAY CHANGE -->

<ApiLifecycle access="beta" />

The Identity Engine Early Adopter Program (EAP) contains many updates to Okta's existing Policy API. Specifically, it introduces two new Policy types: `Okta:SignOn` and `Okta:ProfileEnrollment` as well as new kinds of Rules and Conditions. This documentation will discuss only the differences between the [existing Policy API](/docs/reference/api/policy/) and the Identity Engine EAP additions.

## Limitations

Okta limits the number of Policies of the new types to 500 total. Each of those Policies can in turn have a maximum of 100 associated Rules.

## Policy Operations

The Policy API supports the following Policy operations:

* [Create a Policy](#create-a-policy)
* [Get a Policy by id](#get-a-policy-by-id)
* [Get all Policies of a specific type](#get-all-policies-of-a-specific-type)
* [Update a Policy](#update-a-policy)
* [Delete a Policy](#delete-a-policy)
* [Activate a Policy](#activate-a-policy)
* [Deactivate a Policy](#deactivate-a-policy)

### Create a Policy

<ApiOperation method="post" url="/api/v1/policies" />

Creates a new Policy object.

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Request body

| Property  | Type    | Description                                                                                 |
| --------- | ------- | ------------------------------------------------------------------------------------------- |
| `default` | Boolean | Indicates whether this Policy is default                                                  |
| `name`    | String  | A name for this Policy                                                                   |
| `status`  | String  | The status of this [Policy object](#policy-object): `ACTIVE`, `INACTIVE`                |
| `type`    | String  | A valid type of [Policy object](#policy-object): `Okta:SignOn`,`Okta:ProfileEnrollment` |

#### Response body

Returns a [Policy](#policy-object).

#### Usage example

This request creates a new non-default Sign On Policy:

##### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "Okta:SignOn",
  "status": "ACTIVE",
  "name": "My App Assurance Policy",
  "default": false
  }
}' "https://${yourOktaDomain}/api/v1/policies"
```

##### Response

```json
{
  "id": "rst30qv3igD5OpiL50g7",
  "name": "My App Assurance Policy",
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

### Get a Policy by id

<ApiOperation method="get" url="/api/v1/policies/${policyId}" />

Returns the specified [Policy](#policy-object).

#### Request path parameters

| Parameter   | Type   | Description                                      |
| ----------- | ------ | ------------------------------------------------ |
| `policyId` | String | The `id` of the Policy you'd like to retrieve. |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Returns a [Policy](#policy-object).

#### Usage example

This request returns a Policy with an `id` value of `rst30qv3igD5OpiL50g7`.

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
  "name": "My App Assurance Policy",
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

### Get all Policies of a specific type

<ApiOperation method="get" url="/api/v1/policies?type=${type}" />

Retrieves all Policies with a matching `type` value.

#### Request path parameters

N/A

#### Request query parameters

| Parameter | Type   | Description                                           |
| --------- | ------ | ----------------------------------------------------- |
| `type`    | String | A valid `type` of [Policy object](#policy-object) |

#### Request body

N/A

#### Response body

An Array of [Policy](#policy-object) objects of the matching type.

#### Usage example

This request would return all Policies with the type `Okta:SignOn`.

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
[
  {
    "id": "rst30qv3igD5OpiL50g7",
    "name": "My App Assurance Policy",
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
]
```

### Update a Policy

<ApiOperation method="put" url="/api/v1/policies/${policyId}" />

Updates the specified Policy.

#### Request path parameters

| Parameter   | Type   | Description                                    |
| ----------- | ------ | ---------------------------------------------- |
| `policyId` | String | The `id` of the Policy you'd like to update. |

#### Request query parameters

N/A

#### Request body

| Property | Type   | Description                                    |
| -------- | ------ | ---------------------------------------------- |
| `name`   | String | Name of the Policy                          |
| `status` | String | Status of the Policy: `ACTIVE` or `INACTIVE` |

> **Note:** The `status` property can only be updated if this is not a default Policy.

#### Response body

Returns a [Policy](#policy-object).

#### Usage example

##### Request

This request updates the `name` property:

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "Okta:SignOn",
  "id": "rst30qv3igD5OpiL50g7",
  "status": "ACTIVE",
  "name": "My Default App Assurance Policy",
  "default": true
  }
}' "https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7"
```

##### Response

```json
{
  "id": "rst30qv3igD5OpiL50g7",
  "name": "My Default App Assurance Policy",
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



### Delete a Policy

<ApiOperation method="delete" url="/api/v1/policies/${policyId}" />

Permanently deletes a non-default Policy along with any associated Rules and Mappings. Policies set as default cannot be deleted.

#### Request path parameters

| Parameter   | Type   | Description                                    |
| ----------- | ------ | ---------------------------------------------- |
| `policyId` | String | The `id` of the Policy you'd like to delete. |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

N/A

#### Usage example

The following request would delete a Policy with an `id` value of `rst30qv3igD5OpiL50g7`.

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


### Activate a Policy

<ApiOperation method="post" url="/api/v1/policies/${policyId}/lifecycle/activate" />

Activates the specified non-default Policy. Policies set as default will always be active.

#### Request path parameters

| Parameter   | Type   | Description                                      |
| ----------- | ------ | ------------------------------------------------ |
| `policyId` | String | The `id` of the Policy you'd like to activate. |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

N/A

#### Usage example

The following request would activate the specified Policy:

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

### Deactivate a Policy

<ApiOperation method="post" url="/api/v1/policies/${policyId}/lifecycle/deactivate" />

Deactivates the specified non-default Policy. Policies set as default cannot be deactivated.

#### Request path parameters

| Parameter   | Type   | Description                                        |
| ----------- | ------ | -------------------------------------------------- |
| `policyId` | String | The `id` of the Policy you'd like to deactivate. |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

N/A

#### Usage example

The following request would deactivate the specified Policy:

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

The Policy API supports the following Rule operations:

* [Create a Rule](#create-a-rule)
* [Get a Rule](#get-a-rule)
* [Get all Rules in a Policy](#get-all-rules-in-a-policy)
* [Update a Rule](#update-a-rule)
* [Delete a Rule](#delete-a-rule)
* [Activate a Rule](#activate-a-rule)
* [Deactivate a Rule](#deactivate-a-rule)

### Create a Rule

<ApiOperation method="post" url="/api/v1/policies/${policyId}/rules" />

Creates a new Rule in the specified Policy.

#### Request path parameters

| Parameter   | Type   | Description                                              |
| ----------- | ------ | -------------------------------------------------------- |
| `policyId` | String | The `id` of the Policy that this Rule will be added to |

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
| `requirement` | Object  | Specific action or remediation [Requirements](#requirement-object) for this Rule |
| `status`      | String  | Status of the Rule: `ACTIVE` (default) or `INACTIVE`                   |
| `type`        | String  | Rule type. Valid values: `Okta:SignOn` or `Okta:ProfileEnrollment`           |


#### Response body

The [Rule](#rule-object) that you just created.

#### Usage example

The following request would create a new Rule in the specified Policy:

##### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "Okta:SignOn",
  "name": "Example App Assurance Rule",
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
  }
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

<ApiOperation method="get" url="/api/v1/policies/${policyId}/rules/${ruleId}" />

Retrieves the specified Rule from the specified Policy.

#### Request path parameters

| Parameter   | Type   | Description                                      |
| ----------- | ------ | ------------------------------------------------ |
| `policyId` | String | The `id` of the Policy this Rule belongs to    |
| `ruleId`    | String | The `id` of the Rule that you'd like to retrieve |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

The specified [Rule](#rule-object)

#### Usage example

The following request would retrieve the specified Rule:

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

### Get all Rules in a Policy

<ApiOperation method="get" url="/api/v1/policies/${policyId}/rules" />

Retrieves all Rules in the specified Policy.

#### Request path parameters

| Parameter   | Type   | Description                                   |
| ----------- | ------ | --------------------------------------------- |
| `policyId` | String | The `id` of the Policy this Rule belongs to |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

An Array of [Rule objects](#rule-object)

#### Usage example

The following request would return all Rules found within the specified Policy.

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

<ApiOperation method="put" url="/api/v1/policies/${policyId}/rules/${ruleId}" />

Updates the specified Rule found within the specified Policy.

#### Request path parameters

| Parameter   | Type   | Description                                      |
| ----------- | ------ | ------------------------------------------------ |
| `policyId` | String | The `id` of the Policy this Rule belongs to    |
| `ruleId`    | String | The `id` of the Rule that you'd like to update |

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

The updated [Rule object](#rule-object)

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

<ApiOperation method="delete" url="/api/v1/policies/${policyId}/rules/${ruleId}" />

Deletes the specified Rule permanently.

#### Request path parameters

| Parameter   | Type   | Description                                      |
| ----------- | ------ | ------------------------------------------------ |
| `policyId` | String | The `id` of the Policy this Rule belongs to    |
| `ruleId`    | String | The `id` of the Rule that you'd like to delete |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

N/A

#### Usage example

The following request would delete the specified Rule from the specified Policy:

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

<ApiOperation method="post" url="/api/v1/policies/${policyId}/rules/${ruleId}/lifecycle/activate" />

Activates the specified Rule.

#### Request path parameters

| Parameter   | Type   | Description                                      |
| ----------- | ------ | ------------------------------------------------ |
| `policyId` | String | The `id` of the Policy this Rule belongs to    |
| `ruleId`    | String | The `id` of the Rule that you'd like to activate |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

N/A

#### Usage example

The following request would activate the specified Rule:

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

<ApiOperation method="post" url="/api/v1/policies/${policyId}/rules/${ruleId}/lifecycle/deactivate" />

Deactivates the specified Rule.

#### Request path parameters

| Parameter   | Type   | Description                                      |
| ----------- | ------ | ------------------------------------------------ |
| `policyId` | String | The `id` of the Policy this Rule belongs to    |
| `ruleId`    | String | The `id` of the Rule that you'd like to deactivate |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

N/A

#### Usage example

The following request would deactivate the specified Rule:

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

The Policy API supports the following Mapping operations:

* [Create a Mapping](#create-a-mapping)
* [Get a Mapping by id](#get-a-mapping-by-id)
* [Get all Mappings for a Policy](#get-all-mappings-for-a-policy)
* [Delete a Mapping](#delete-a-mapping)

### Create a Mapping

<ApiOperation method="post" url="/api/v1/policies/${policyId}/mappings" />

Creates a new Mapping for the specified Policy.

#### Request path parameters

| Parameter   | Type   | Description                                                  |
| ----------- | ------ | ------------------------------------------------------------ |
| `policyId` | String | The `id` of the Policy you'd like to create a Mapping for. |

#### Request query parameters

N/A

#### Request body

| Parameter      | Type   | Description                                                                          |
| -------------- | ------ | ------------------------------------------------------------------------------------ |
| `resourceType` | String | The type of Okta object that this Policy should be mapped to: `APP` |
| `resourceId`   | String | The `id` of the object that you would like to map this Policy to.                  |

#### Response body

N/A

#### Usage example

The following request would create a new Mapping between the Policy with id `rst30qv3igD5OpiL50g7` and an App with id `0oa10510BvfrKTfzD0g4`:

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

<ApiOperation method="get" url="/api/v1/policies/${policyId}/mappings/${mappingId}" />

Retrieves the specified Mapping for the specified Policy.

#### Request path parameters

| Parameter   | Type   | Description                   |
| ----------- | ------ | ----------------------------- |
| `mappingId` | String | The identifier for a Mapping  |
| `policyId` | String | The identifier for a Policy |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

A [Mapping object](#mapping-object)

#### Usage example

The following request would retrieve a Mapping for this Policy:

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

### Get all Mappings for a Policy

<ApiOperation method="get" url="/api/v1/policies/${policyId}/mappings" />

Retrieves all Mappings associated with the specified Policy.

#### Request path parameters

| Parameter   | Type   | Description                   |
| ----------- | ------ | ----------------------------- |
| `policyId` | String | The identifier for a Policy|

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

An Array of [Mapping objects](#mapping-object)

#### Usage example

The following request would retrieve all Mappings associated with specified Policy:

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

<ApiOperation method="delete" url="/api/v1/policies/${policyId}/mappings/${mappingId}" />

Deletes the specified Mapping permanently.

#### Request path parameters

| Parameter   | Type   | Description                   |
| ----------- | ------ | ----------------------------- |
| `mappingId` | String | The identifier for a Mapping  |
| `policyId` | String | The identifier for a Policy|

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

N/A

#### Usage example

The following request would delete the specified Mapping:

##### Request

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/rst30qv3igD5OpiL50g7/mappings/rsm30qv3iirGzUyaM0g7"
```

##### Response

```http
HTTP/1.1 204 No Content
Content-Type: application/json
```

## Policies API objects

The Policies API involves the following objects:

* [Policy](#policy-object)
* [Rule](#rule-object)
  * [Conditions](#conditions-object)
  * [Requirement](#requirement-object)
    * [Verification Method](#verification-method-object)
* [Mapping](#mapping-object)

### Policy object

#### Policy properties

The Policy object has several properties:

| Property            | Type         | Description                                                                                                                                                 |
| ------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_links.activate`   | String (URL) | Link to activate a Policy or Rule (present if the Rule is currently inactive)                                                                             |
| `_links.deactivate` | String (URL) | Link to deactivate a Policy or Rule (present if the Rule is currently active)                                                                             |
| `_links.mappings`   | String (URL) | Link to retrieve the Mapping objects for the given Policy                                                                                                |
| `_links.rules`      | String (URL) | Link to retrieve the Rules objects for the given Policy                                                                                                  |
| `_links.self`       | String (URL) | Link to the current Policy object                                                                                                                         |
| `_links`            | Object       | Specifies read-only [link relations](http://tools.ietf.org/html/rfc5988) available for the current Policy. Used for dynamic discovery of related resources. |
| `default`           | Boolean      | Indicates whether this Policy is set as default                                                                                                           |
| `id`                | String       | Identifier of this Policy                                                                                                                                |
| `name`              | String       | Name of the Policy                                                                                                                                       |
| `status`            | String       | Status of the Policy: `ACTIVE` (default) or `INACTIVE`                                                                                                    |
| `type`              | String       | Specifies the [type of Policy](#policy-types). Valid values: `Okta:SignOn` or `Okta:ProfileEnrollment`                                                        |

#### Policy JSON example

```json
{
  "id": "rst30qv3igD5OpiL50g7",
  "name": "My App Assurance Policy",
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

#### About Policies

##### Policy Types

Different Policies control the behavior for different steps in the Identity Engine pipeline. All Policy types share a common framework, message structure and API, but have different settings and Rule data.

* Sign On Policies have the type `Okta:SignOn`, and are always associated with an application via a [Mapping](#resource-mappings). The Okta Identity Engine always evaluates both Okta Sign On Policy and the Sign On Policy for the application. The resulting user experience will be the union of both policies.
* User Profile Policies User have the type `Okta:ProfileEnrollment`. These Policies specify what profile attributes are required for creating new Users via self-service registration, and also can be used for progressive profiling.

##### PolicyPriority and Defaults

There is always a default Policy created for each [type](#policy-types). The default applies to any resources for which other policies in the Okta org do not apply.

- A default Policy is required and cannot be deleted.
- The default Policy is always the last in the priority order. Any added Policies of this type have higher priority than the default Policy.
- The default Policy always has one default Rule that cannot be deleted. It is always the last Rule in the priority order. If you add Rules to the default Policy, they have a higher priority than the default Rule.

### Rule Object

Each Policy may contain one or more Rules. Rules contain conditions which must be satisfied in order for the Rule to be applied.

#### Rule properties

| Property            | Type         | Description                                                                                                                                                 |
| ------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_links.activate`   | String (URL) | Link to activate a Policy or Rule (present if the Rule is currently inactive)                                                                             |
| `_links.deactivate` | String (URL) | Link to deactivate a Policy or Rule (present if the Rule is currently active)                                                                             |
| `_links.mappings`   | String (URL) | Link to retrieve the Mapping objects for the given Policy                                                                                                |
| `_links.rules`      | String (URL) | Link to retrieve the Rule objects for the given Policy                                                                                                  |
| `_links.self`       | String (URL) | Link to the current Policy object                                                                                                                         |
| `_links`            | Object       | Specifies read-only [link relations](http://tools.ietf.org/html/rfc5988) available for the current Rule. Used for dynamic discovery of related resources. |
| `action`            | String       | Top-level action for Rule: `ALLOW` or `DENY`                                                                                                                |
| `conditions`        | Object       | The [Conditions object](#conditions-object) for this Rule                                                                                                                         |
| `default`           | Boolean      | Indicates whether this is a default Rule                                                                                                                    |
| `id`                | String       | Identifier for this Rule                                                                                                                                    |
| `name`              | String       | A name for this Rule                                                                                                                                        |
| `priority`          | Number       | Priority of this Rule                                                                                                                                       |
| `requirement`       | Object       | The [Requirement object](#requirement-object) for this Rule                                                                                                                        |
| `status`            | String       | Status of the Rule: `ACTIVE` (default) or `INACTIVE`                                                                                                        |
| `type`              | String       | Rule type: `Okta:SignOn` or `Okta:ProfileEnrollment`                                                                                                |


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

The Conditions object specifies the conditions that must be met during Policy evaluation in order for that Rule to be applied. All conditions must be met in order to apply the requirements for a given Rule. The conditions which can be used with a particular Rule depends on the Rule type.

#### Conditions properties

Conditions are represented by a `key`, `op`, and `value` that are used in conjunction with a context object to evaluate to a boolean result. Multiple conditions in a given Rule are AND-ed together.

| Property | Type                             | Description                                                                                |
| -------- | -------------------------------- | ------------------------------------------------------------------------------------------ |
| `key`    | String                           | The [key](#key-values) indicates which part of the authentication context to match against |
| `op`     | String                           | The operation to perform on the value. See [op values](#op-values) for more                |
| `value`  | String, Boolean, Number, or List | A static value to match the `key` against                                                  |

##### key values

The `Okta:SignOn` Rule type supports the following Condition `key` values:

* `Okta:User`
* `Okta:UserType`
* `Okta:Group`
* `Okta:NetworkZone`

Currently, the `Okta:ProfileEnrollment` Rule type does not support any Conditions.

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

| Property                     | Type    | Description                                                                                                                                                                                                                                                                                                                                               |
| ---------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `activationRequirements`     | Object  | Contains a single Boolean property that Indicates whether `emailVerification` should occur (`true`) or not (`false`, default).                                                                                                                                                                                                                            |
| `preRegistrationInlineHooks` | Array   | (Optional) The `id` of at most one Registration Inline Hook                                                                                                                                                                                                                                                                                              |
| `profileAttributes.label`    | String  | A display-friendly label for this property.                                                                                                                                                                                                                                                                                                               |
| `profileAttributes.name`     | String  | The name of a User Profile property. Can be an existing User Profile property.                                                                                                                                                                                                                                                                            |
| `profileAttributes.required` | Boolean | (Optional, default `FALSE`) Indicates if this property is required for enrollment                                                                                                                                                                                                                                                                         |
| `profileAttributes`          | Array   | A list of attributes for which to prompt the user during registration or progressive profiling. Where defined on the User schema, these attributes will be persisted in the user's profile. Non-schema attributes may also be added, which will not be persisted to the user's Profile, but will be included in requests to the Registration Inline Hook. |
| `targetGroupIds`             | Array   | (Optional, max 1 entry) The `id` of a Group that this user should be added to                                                                                                                                                                                                                                                                             |
| `unknownUserAction`          | String  | Which action should be taken if this User is new (Valid values: `DENY`, `REGISTER`)                                                                                                                                                                                                                                                                       |

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

Authenticators can be broadly classified into factors. A factor represents the mechanism by which an end-user owns or controls the authenticator. The three classifications are:

* Knowledge: something you know, such as a password
* Possession: something you have, such as a phone
* Inherence: something you are, such as a fingerprint or other biometric scan

Multi-factor authentication (MFA) is the use of more than one factor. MFA is the most common way to increase assurance. Authenticators also have other characteristics that may raise or lower assurance. For example, possession factors may be implemented in software or hardware, with hardware being able to provide greater protection when storing shared secrets or private keys, and thus providing higher assurance.

| Parameter            | Type              | Description                                                                                                             | Supported Values                                                                                  |
| -------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `factorMode`         | String            | The number of factors required to satisfy this assurance level.                                                         | `1FA`, `2FA`                                                                                      |
| `constraints`        | Object            | A JSON array containing nested authenticator constraint objects which are organized by Authenticator Class.                                                                           | `POSSESSION`, `KNOWLEDGE`                                                                         |
| `types`              | Array             | The Authenticator Types which are allowable.                                                                            | `SECURITY_KEY`, `PHONE`, `EMAIL`, `PASSWORD`, `SECURITY_QUESTION`                          |
| `methods`            | Array             | The Authenticator Methods which are allowable.                                                                          | `PASSWORD`, `SECURITY_QUESTION`, `SMS`, `VOICE`, `EMAIL`, `FIDO2` |
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
          "FIDO2"
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
          "FIDO2"
        ],
        "hardwareProtection": "REQUIRED"
      }
    }
  ],
  "reauthenticateIn": "PT4H"
}
```

### Mapping Object

A Mapping object links together an Application and a Policy.

#### Mapping properties

| Property             | Type         | Description                                                                                                                                                  |
| -------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `_links.application` | String (URL) | A link to the Application for this Mapping                                                                                                                   |
| `_links.policy`      | String (URL) | A link to the Policy for this Mapping                                                                                                                      |
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

## Updates to Password Policy

The Password Policy API went through a few changes as part of the Identity Engine. The section below shows only the delta from the [Password Policy API](/docs/reference/api/policy/#password-policy)

Earlier, we supported setting recovery factors on the policy. While we will still continue to support it for backwards compatibility of older clients, the new password policy model does not contain recovery factors. This is now moved to the password policy rule model.

### Password Policy Settings Example

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
     "delegation": {
       "options": {
         "skipUnlock": false
       }
     }
}
```

The recovery factors are now on the password policy rule configured inside the action `selfServicePasswordReset`. Below are 3 examples of how recovery factors are configured on the rule based on admin requirements.

### Password Policy Rule Action Data

Admin requires end users to verify with just 1 authenticator before they can recover password. Email, Sms, Voice and Okta Verify Push can be used by end users to initiate recovery. No step up authenticators are required.

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

Admin requires end users to verify 2 authenticators before they can recover password. Email and Okta Verify Push can be used by end users to initiate recovery. Security Question is required as step-up.

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

Admin requires end users to verify 2 authenticators before they can recover password. Okta Verify Push can be used by end users to initiate recovery. Any authenticator allowed for MFA/SSO is required as step-up.

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

### Self Service Password Reset Action object

| Property                      | Type    | Description                                                                                 | Supported Values
| ---                           | ---     | ---                                                                                         | ---
| `access`                      | String  | Indicates if the action is permitted                                                         | `ALLOW`, `DENY`
| `requirement`                 | Object  | JSON object containing authenticator methods required to be verified if `access` is `ALLOW` | N/A
| `requirement.primary.methods` | Array   | Authenticator methods that can be used by end user to initiate password recovery             | `EMAIL`, `SMS`, `VOICE`, `PUSH`
| `requirement.stepUp.required` | Boolean | If any stepUp verification is required to recover password following primary methods verification | `true`, `false`
| `requirement.stepUp.methods`  | Array   | If `requirement.stepUp.required` is true, JSON object containing authenticator methods required to be verified as a stepUp. If not specified, any MFA allowed authenticator methods can be used as stepUp. | `SECURITY_QUESTION`