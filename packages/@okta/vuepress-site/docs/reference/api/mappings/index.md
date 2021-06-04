---
title: Mappings
category: management
---

# Mappings API

The Okta Mappings API provides operations to manage the mapping of properties between an Okta User's and an App User's
[Profile properties](/docs/reference/api/users/#profile-object) using [Expression Language](/docs/reference/okta-expression-language).
More information on Okta User and App User Profiles can be found in
Okta's [Universal Directory](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_About_Universal_Directory).

## Get started

Explore the Mappings API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/42f528e8de2085ef2c97)

## Profile Mapping operations

### List Profile Mappings

<ApiOperation method="get" url="/api/v1/mappings" />

Enumerates [Profile Mappings](#profile-mapping-object) in your organization with [pagination](/docs/reference/api-overview/#pagination). You can return a subset of [Profile Mapping(s)](#profile-mapping-object) that match a supported `sourceId` and/or `targetId`.

##### Request parameters

| Parameter     | Description                                                                                                          | Param Type | DataType | Required | Default |
| ------------- | -------------------------------------------------------------------------------------------------------------------- | ---------- | -------- | -------- | ------- |
| after         | Mapping `id` that specifies the pagination cursor for the next page of mappings                                                                            | Query      | String   | FALSE    | N/A     |
| limit         | Specifies the number of results per page (maximum 200)                                                                                                     | Query      | Number   | FALSE    | 20      |
| sourceId      | UserType or App Instance `id` that acts as the source of expressions in a mapping. If included, all mappings returned have this as their `source:id`.    | Query      | String   | FALSE    | N/A     |
| targetId      | UserType or App Instance `id` that acts as the target of expressions in a mapping. If included, all mappings returned have this as their `target:id`.    | Query      | String   | FALSE    | N/A     |

The results are [paginated](/docs/reference/api-overview/#pagination) according to the `limit` parameter.
If there are multiple pages of results, the Link header contains a `next` link that should be treated as an opaque value (follow it, don't parse it).

##### Response parameters

Collection of [Profile Mapping(s)](#profile-mapping-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/mappings?sourceId=${sourceId}"
```

##### Response example

```json
[
    {
        "id": "prm1k47ghydIQOTBW0g4",
        "source": {
            "id": "${sourceId}",
            "name": "user",
            "type": "user",
            "_links": {
                "self": {
                    "href": "https://${yourOktaDomain}/api/v1/meta/types/user/otysbePhQ3yqt4cVv0g3"
                },
                "schema": {
                    "href": "https://${yourOktaDomain}/api/v1/meta/schemas/user/oscsbePhQ3yqt4cVv0g3"
                }
            }
        },
        "target": {
            "id": "0oa1xz9cb7yt5SsZV0g4",
            "name": "zendesk",
            "type": "appuser",
            "_links": {
                "self": {
                    "href": "https://${yourOktaDomain}/api/v1/apps/0oa1xz9cb7yt5SsZV0g4"
                },
                "schema": {
                    "href": "https://${yourOktaDomain}/api/v1/meta/schemas/apps/0oa1xz9cb7yt5SsZV0g4/default"
                }
            }
        },
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/mappings/prm1k47ghydIQOTBW0g4"
            }
        }
    },
    {
        "id": "prm1k48weFSOnEUnw0g4",
        "source": {
            "id": "${sourceId}",
            "name": "user",
            "type": "user",
            "_links": {
                "self": {
                    "href": "https://${yourOktaDomain}/api/v1/meta/types/user/otysbePhQ3yqt4cVv0g3"
                },
                "schema": {
                    "href": "https://${yourOktaDomain}/api/v1/meta/schemas/user/oscsbePhQ3yqt4cVv0g3"
                }
            }
        },
        "target": {
            "id": "0oa1ycesCAeQrbO3s0g4",
            "name": "sevenoffice",
            "type": "appuser",
            "_links": {
                "self": {
                    "href": "https://${yourOktaDomain}/api/v1/apps/0oa1ycesCAeQrbO3s0g4"
                },
                "schema": {
                    "href": "https://${yourOktaDomain}/api/v1/meta/schemas/apps/0oa1ycesCAeQrbO3s0g4/default"
                }
            }
        },
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/mappings/prm1k48weFSOnEUnw0g4"
            }
        }
    }
]
```

### Get Profile Mapping

<ApiOperation method="get" url="/api/v1/mappings/${mappingId}" />

Fetches a single [Profile Mapping](#profile-mapping-object) referenced by its ID

##### Request parameters

| Parameter     | Description                           | Param Type | DataType | Required | Default |
| ------------- | ------------------------------------- | ---------- | -------- | -------- | ------- |
| mappingId     | Unique identifier for Profile Mapping | URL        | String   | TRUE     | N/A     |

##### Response parameters

Fetched [Profile Mapping](#profile-mapping-object)

##### Request example

``` bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/mappings/${mappingId}"
```

##### Response example

```json
{
    "id": "${mappingId}",
    "source": {
        "id": "otysbePhQ3yqt4cVv0g3",
        "name": "user",
        "type": "user",
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/meta/types/user/otysbePhQ3yqt4cVv0g3"
            },
            "schema": {
                "href": "https://${yourOktaDomain}/api/v1/meta/schemas/user/oscsbePhQ3yqt4cVv0g3"
            }
        }
    },
    "target": {
        "id": "0oa1qmn4LZQQEH0wZ0g4",
        "name": "okta_org2org",
        "type": "appuser",
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/apps/0oa1qmn4LZQQEH0wZ0g4"
            },
            "schema": {
                "href": "https://${yourOktaDomain}/api/v1/meta/schemas/apps/0oa1qmn4LZQQEH0wZ0g4/default"
            }
        }
    },
    "properties": {
        "firstName": {
            "expression": "user.firstName",
            "pushStatus": "PUSH"
        },
        "lastName": {
            "expression": "user.lastName",
            "pushStatus": "PUSH"
        }
    },
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/mappings/${mappingId}"
        }
    }
}
```

### Update Profile Mapping

<ApiOperation method="post" url="/api/v1/mappings/${mappingId}" />

Updates an existing [Profile Mapping](#profile-mapping-object) by adding, updating, or removing one or many [Property Mappings](#property-mapping-object)

- [Add Property Mapping](#add-property-mapping)
- [Update Property Mapping](#update-property-mapping)
- [Remove Property Mapping](#remove-property-mapping)

##### Request parameters

| Parameter     | Description                           | Param Type | DataType | Required | Default |
| ------------- | ------------------------------------- | ---------- | -------- | -------- | ------- |
| mappingId     | Unique identifier for Profile Mapping | URL        | String   | TRUE     | N/A     |

##### Response parameters

All responses return the updated [Profile Mapping](#profile-mapping-object)

#### Add Property Mapping

Adds a [Property Mapping](#property-mapping-object) to an existing [Profile Mapping](#profile-mapping-object)

##### Request example

``` bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "properties": {
        "fullName": {
            "expression": "user.firstName + user.lastName",
            "pushStatus": "PUSH"
        },
        "nickName": {
            "expression": "user.nickName",
            "pushStatus": "PUSH"
        }
    }
}' "https://${yourOktaDomain}/api/v1/mappings/${mappingId}"
```

##### Response example

```json
{
    "id": "${mappingId}",
    "source": {
        "id": "otysbePhQ3yqt4cVv0g3",
        "name": "user",
        "type": "user",
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/meta/types/user/otysbePhQ3yqt4cVv0g3"
            },
            "schema": {
                "href": "https://${yourOktaDomain}/api/v1/meta/schemas/user/oscsbePhQ3yqt4cVv0g3"
            }
        }
    },
    "target": {
        "id": "0oa1qmn4LZQQEH0wZ0g4",
        "name": "okta_org2org",
        "type": "appuser",
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/apps/0oa1qmn4LZQQEH0wZ0g4"
            },
            "schema": {
                "href": "https://${yourOktaDomain}/api/v1/meta/schemas/apps/0oa1qmn4LZQQEH0wZ0g4/default"
            }
        }
    },
    "properties": {
        "fullName": {
            "expression": "user.firstName + user.lastName",
            "pushStatus": "PUSH"
        },
        "nickName": {
            "expression": "user.nickName",
            "pushStatus": "PUSH"
        }
    },
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/mappings/${mappingId}"
        }
    }
}
```

#### Update Property Mapping

Alters an existing [Property Mapping](#property-mapping-object) within a [Profile Mapping](#profile-mapping-object)

##### Request example

``` bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "properties": {
        "nickName": {
            "expression": "user.honorificPrefix + user.displayName",
            "pushStatus": "DONT_PUSH"
        }
    }
}' "https://${yourOktaDomain}/api/v1/mappings/${mappingId}"
```

##### Response example

```json
{
    "id": "${mappingId}",
    "source": {
        "id": "otysbePhQ3yqt4cVv0g3",
        "name": "user",
        "type": "user",
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/meta/types/user/otysbePhQ3yqt4cVv0g3"
            },
            "schema": {
                "href": "https://${yourOktaDomain}/api/v1/meta/schemas/user/oscsbePhQ3yqt4cVv0g3"
            }
        }
    },
    "target": {
        "id": "0oa1qmn4LZQQEH0wZ0g4",
        "name": "okta_org2org",
        "type": "appuser",
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/apps/0oa1qmn4LZQQEH0wZ0g4"
            },
            "schema": {
                "href": "https://${yourOktaDomain}/api/v1/meta/schemas/apps/0oa1qmn4LZQQEH0wZ0g4/default"
            }
        }
    },
    "properties": {
        "fullName": {
            "expression": "user.firstName + user.lastName",
            "pushStatus": "PUSH"
        },
        "nickName": {
            "expression": "user.honorificPrefix + user.displayName",
            "pushStatus": "DONT_PUSH"
        }
    },
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/mappings/${mappingId}"
        }
    }
}
```

#### Remove Property Mapping

Removes an existing [Property Mapping](#property-mapping-object) within a [Profile Mapping](#profile-mapping-object)

##### Request example

``` bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "properties": {
        "nickName": null
    }
}' "https://${yourOktaDomain}/api/v1/mappings/${mappingId}"
```

##### Response example

```json
{
    "id": "${mappingId}",
    "source": {
        "id": "otysbePhQ3yqt4cVv0g3",
        "name": "user",
        "type": "user",
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/meta/types/user/otysbePhQ3yqt4cVv0g3"
            },
            "schema": {
                "href": "https://${yourOktaDomain}/api/v1/meta/schemas/user/oscsbePhQ3yqt4cVv0g3"
            }
        }
    },
    "target": {
        "id": "0oa1qmn4LZQQEH0wZ0g4",
        "name": "okta_org2org",
        "type": "appuser",
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/apps/0oa1qmn4LZQQEH0wZ0g4"
            },
            "schema": {
                "href": "https://${yourOktaDomain}/api/v1/meta/schemas/apps/0oa1qmn4LZQQEH0wZ0g4/default"
            }
        }
    },
    "properties": {
        "fullName": {
            "expression": "user.firstName + user.lastName",
            "pushStatus": "PUSH"
        }
    },
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/mappings/${mappingId}"
        }
    }
}
```

## Profile Mapping object

The Profile Mapping object describes a mapping between an Okta User's and an App User's properties using [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04).

> **Note:** Same type source/target mappings aren't supported by this API. Profile Mappings must either be Okta->App or App->Okta.

### Example Profile Mapping

```json
{
    "id": "prm1xzjkHwo8uG77c0g4",
    "source": {
        "id": "0oa1qmn4LZQQEH0wZ0g4",
        "name": "okta_org2org",
        "type": "appuser",
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/apps/0oa1qmn4LZQQEH0wZ0g4"
            },
            "schema": {
                "href": "https://${yourOktaDomain}/api/v1/meta/schemas/apps/0oa1qmn4LZQQEH0wZ0g4/default"
            }
        }
    },
    "target": {
        "id": "otysbePhQ3yqt4cVv0g3",
        "name": "user",
        "type": "user",
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/meta/types/user/otysbePhQ3yqt4cVv0g3"
            },
            "schema": {
                "href": "https://${yourOktaDomain}/api/v1/meta/schemas/user/oscsbePhQ3yqt4cVv0g3"
            }
        }
    },
    "properties": {
        "fullName": {
            "expression": "appuser.firstName + appuser.lastName",
            "pushStatus": "PUSH"
        },
        "nickName": {
            "expression": "appuser.nickName",
            "pushStatus": "DONT_PUSH"
        }
    },
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/mappings/prm1xzjkHwo8uG77c0g4"
        }
    }
}
```

### Profile Mapping properties

The Profile Mapping is a valid [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04) document with the following properties:

| Property    | Description                                                                              | DataType   | Nullable | Unique | Readonly | Validation  |
|:------------|:-----------------------------------------------------------------------------------------|:-----------|:---------|:-------|:---------|:------------|
| _links      | Discoverable resources related to the Profile Mapping                                    | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-05)| FALSE    | FALSE  | TRUE     |             |
| id          | Unique identifier for Profile Mapping                                                    | String     | FALSE    | TRUE   | TRUE     |             |
| properties  | Profile Mapping properties                                                               | Collection of [Property Mappings](#property-mapping-object)| TRUE     | FALSE  | FALSE    |             |
| source      | Source of schema property expressions                                                    | [AppInstance object](#appinstance-attribute-object) or [Okta object](#okta-attribute-object)  | FALSE    | FALSE  | TRUE     |             |
| target      | Target of schema property expressions                                                    | [AppInstance object](#appinstance-attribute-object) or [Okta object](#okta-attribute-object)  | FALSE    | FALSE  | TRUE     |             |


### AppInstance Attribute object

Can be either the source or target of a Profile Mapping and is a valid [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04) document with the following properties:

| Property    | Description                                                | DataType                                       | Nullable | Unique | Read-Only | Validation  |
|:------------|:-----------------------------------------------------------|:-----------------------------------------------|:---------|:-------|:----------|:------------|
| _links      | Discoverable resources related to the application instance | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-05) | FALSE    | FALSE  | TRUE |             |
| id          | Unique identifier for application instance                 | String                                         | FALSE    | TRUE   | TRUE     |             |
| name        | Variable name of the application instance                  | String                                         | FALSE    | TRUE   | TRUE     |             |
| type        | Type of user referenced in mapping                         | String                                         | FALSE    | FALSE  | TRUE     |             |


### Okta Attribute object

Can be either the source or target of a Profile Mapping and is a valid [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04) document with the following properties:

| Property    | Description                                       | DataType                                              | Nullable | Unique | Readonly | Validation  |
|:------------|:--------------------------------------------------|:------------------------------------------------------|:---------|:-------|:---------|:------------|
| _links      | Discoverable resources related to the userType    | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-05)| FALSE    | FALSE  | TRUE     |             |
| id          | Unique identifier for userType                    | String                                                | FALSE    | TRUE   | TRUE     |             |
| name        | Name of the userType being referenced             | String                                                | FALSE    | TRUE   | TRUE     |             |
| type        | Type of user referenced in mapping                | String                                                | FALSE    | FALSE  | TRUE     |             |

> **Note:** If the source/target is Okta and the UserTypes feature isn't enabled, then the source/target `_links` only has a link to the schema.

### Property Mapping object

Consists of a target property, in String form, that maps to a valid [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04) document with the following properties:

| Property    | Description                                                                     | DataType                      | Nullable | Unique | Readonly | Validation  |
|:------------|:--------------------------------------------------------------------------------|:------------------------------|:---------|:-------|:---------|:------------|
| expression  | Combination or single source properties that are mapped to the target property  | [Expression Language object](/docs/reference/okta-expression-language/)| FALSE    | FALSE  | FALSE    |             |
| pushStatus  | Indicates whether to update target properties on user create and update or just on create | `DONT_PUSH` or `PUSH`         | FALSE    | FALSE  | FALSE    |           |

> **Note:** Having a pushStatus of `PUSH` causes properties in the target to be updated on create and update. Having a pushStatus of `DONT_PUSH` causes properties in the target to be updated only on create.
