---
title: Schemas
category: management
excerpt: The Schemas API defines custom user profiles for Okta users, applications, and groups.
---

# Schemas API

The Okta Schemas API provides operations to manage custom User profiles as well as endpoints to discover the structure of the Log Stream configuration.

Okta's [Universal Directory](https://help.okta.com/okta_help.htm?id=ext_About_Universal_Directory) allows administrators to define custom User profiles for Okta Users and Applications.
Okta adopts a subset of [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04) as the schema language to describe and validate extensible User profiles.
For Log Stream Schemas, Okta uses [JSON Schema Draft 2020-12](https://json-schema.org/specification.html).
[JSON Schema](http://json-schema.org/) is a lightweight declarative format for describing the structure, constraints, and validation of JSON documents.

> **Note:** Okta implements only a subset of [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04) and [JSON Schema Draft 2020-12](https://json-schema.org/specification.html). This document describes which parts apply to Okta, and any extensions Okta has made to [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04) and [JSON Schema Draft 2020-12](https://json-schema.org/specification.html).

## Getting started

Explore the Schemas API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/c85985861f9b277913ae)

## User Schema operations

Each of the operations described here affects the Schema associated with a single [User Type](/docs/reference/api/user-types). The `${typeId}` element in the URL specifies which type. It can be the literal `default` to operate on the Schema of the default User Type, which is created when the org is initialized, or it can be a schema ID.

Each User Type has an associated Schema. In the future, the link between Schema and User Type may be extended (for example, to allow multiple Types to share a Schema) but for now this is a 1:1 relationship. You can obtain the schema ID for the Schema associated with a [User Type](/docs/reference/api/user-types/#user-type-object) object from its `schema` link. The `schema` link is also included in individual [User](/docs/reference/api/users/#user-object) objects.

The request examples below all use the `default` form, as all orgs include a default User Type.

### Get User Schema

<ApiOperation method="get" url="/api/v1/meta/schemas/user/${typeId}" />

Fetches the schema for a User Type

##### Request parameters

N/A

##### Response parameters

[User Schema](#user-schema-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/meta/schemas/user/default"
```

##### Response example

The following response is only a subset of properties for brevity.

```json
{
    "id": "https://{yourOktaDomain}/meta/schemas/user/default",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "name": "user",
    "title": "Default Okta User",
    "lastUpdated": "2015-09-05T10:40:45.000Z",
    "created": "2015-02-02T10:27:36.000Z",
    "definitions": {
        "base": {
            "id": "#base",
            "type": "object",
            "properties": {
                "login": {
                    "title": "Username",
                    "type": "string",
                    "required": true,
                    "minLength": 5,
                    "maxLength": 100,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                },
                "firstName": {
                    "title": "First name",
                    "type": "string",
                    "required": true,
                    "minLength": 1,
                    "maxLength": 50,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                },
                "lastName": {
                    "title": "Last name",
                    "type": "string",
                    "required": true,
                    "minLength": 1,
                    "maxLength": 50,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                },
                "email": {
                    "title": "Primary email",
                    "type": "string",
                    "required": true,
                    "format": "email",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                }
            },
            "required": [
                "login",
                "firstName",
                "lastName",
                "email"
            ]
        },
        "custom": {
            "id": "#custom",
            "type": "object",
            "properties": {
            },
            "required": []
        }
    },
    "type": "object",
    "properties": {
        "profile": {
            "allOf": [
                {
                    "$ref": "#/definitions/base"
                },
                {
                    "$ref": "#/definitions/custom"
                }
            ]
        }
    }
}
```

### Add property to User Profile Schema

<ApiOperation method="post" url="/api/v1/meta/schemas/user/${typeId}" />

Adds one or more [custom User Profile properties](#user-profile-schema-property-object) to the user schema

##### Request parameters


| Parameter   | Description                                          | Param Type | DataType                                                         | Required |
|:------------|:-----------------------------------------------------|:-----------|:-----------------------------------------------------------------|:---------|
| definitions | Subschema with one or more custom Profile properties | Body       | [User Profile custom subschema](#user-profile-custom-subschema) | TRUE     |

##### Response parameters


[User Schema](#user-schema-object)

##### Request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "definitions": {
    "custom": {
      "id": "#custom",
      "type": "object",
      "properties": {
        "twitterUserName": {
          "title": "Twitter username",
          "description": "Twitter Username",
          "type": "string",
          "required": false,
          "minLength": 1,
          "maxLength": 20,
          "permissions": [
            {
              "principal": "SELF",
              "action": "READ_WRITE"
            }
          ]
        }
      },
      "required": []
    }
  }
}' "https://${yourOktaDomain}/api/v1/meta/schemas/user/default"
```

##### Response example

The following response is only a subset of properties for brevity.

```json
{
    "id": "https://{yourOktaDomain}/meta/schemas/user/default",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "name": "user",
    "title": "Default Okta User",
    "lastUpdated": "2015-09-05T10:40:45.000Z",
    "created": "2015-02-02T10:27:36.000Z",
    "definitions": {
        "base": {
            "id": "#base",
            "type": "object",
            "properties": {
                "login": {
                    "title": "Username",
                    "type": "string",
                    "required": true,
                    "minLength": 5,
                    "maxLength": 100,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                },
                "firstName": {
                    "title": "First name",
                    "type": "string",
                    "required": true,
                    "minLength": 1,
                    "maxLength": 50,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                },
                "lastName": {
                    "title": "Last name",
                    "type": "string",
                    "required": true,
                    "minLength": 1,
                    "maxLength": 50,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                },
                "email": {
                    "title": "Primary email",
                    "type": "string",
                    "required": true,
                    "format": "email",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                }
            },
            "required": [
                "login",
                "firstName",
                "lastName",
                "email"
            ]
        },
        "custom": {
            "id": "#custom",
            "type": "object",
            "properties": {
              "twitterUserName": {
                  "title": "Twitter username",
                  "description": "User's username for twitter.com",
                  "type": "string",
                  "required": false,
                  "minLength": 1,
                  "maxLength": 20,
                  "permissions": [
                      {
                          "principal": "SELF",
                          "action": "READ_WRITE"
                      }
                  ]
              }
            },
            "required": []
        }
    },
    "type": "object",
    "properties": {
        "profile": {
            "allOf": [
                {
                    "$ref": "#/definitions/base"
                },
                {
                    "$ref": "#/definitions/custom"
                }
            ]
        }
    }
}
```

### Update User Profile Schema property


<ApiOperation method="post" url="/api/v1/meta/schemas/user/${typeId}" />

Updates one or more [custom User Profile properties](#user-profile-schema-property-object) in the schema, and/or makes limited changes to [base User Profile properties](#user-profile-base-subschema) ([permissions](#schema-property-permission-object), nullability of the `firstName` and `lastName` properties, or [pattern](#login-pattern-validation) for `login`).

##### Request parameters

| Parameter   | Description                                          | Param Type | DataType                                                         | Required |
|:------------|:-----------------------------------------------------|:-----------|:-----------------------------------------------------------------|:---------|
| definitions | Subschema with one or more custom Profile properties | Body       | [User Profile custom subschema](#user-profile-custom-subschema) | TRUE     |

##### Response parameters

[User Schema](#user-schema-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "definitions": {
    "base": {
      "id": "#base",
      "type": "object",
      "properties": {
        "firstName": {
        "title": "First name",
        "type": "string",
        "required": false,
        "mutability": "READ_WRITE",
        "scope": "NONE",
        "permissions": [
          {
            "principal": "SELF",
            "action": "READ_ONLY"
          }
        ]
      }
    },
    "required": []
  },
    "custom": {
      "id": "#custom",
      "type": "object",
      "properties": {
        "twitterUserName": {
          "title": "Twitter username",
          "description": "User'\''s username for twitter.com",
          "type": "string",
          "required": false,
          "minLength": 1,
          "maxLength": 10,
          "permissions": [
            {
              "principal": "SELF",
              "action": "READ_ONLY"
            }
          ]
        }
      },
      "required": []
    }
  }
}' "https://${yourOktaDomain}/api/v1/meta/schemas/user/default"
```

##### Response example

The following response is only a subset of properties for brevity.

```json
{
    "id": "https://{yourOktaDomain}/meta/schemas/user/default",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "name": "user",
    "title": "Default Okta User",
    "lastUpdated": "2015-09-05T10:40:45.000Z",
    "created": "2015-02-02T10:27:36.000Z",
    "definitions": {
        "base": {
            "id": "#base",
            "type": "object",
            "properties": {
                "login": {
                    "title": "Username",
                    "type": "string",
                    "required": true,
                    "minLength": 5,
                    "maxLength": 100,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                },
                "firstName": {
                    "title": "First name",
                    "type": "string",
                    "required": true,
                    "minLength": 1,
                    "maxLength": 50,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                },
                "lastName": {
                    "title": "Last name",
                    "type": "string",
                    "required": true,
                    "minLength": 1,
                    "maxLength": 50,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                },
                "email": {
                    "title": "Primary email",
                    "type": "string",
                    "required": true,
                    "format": "email",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                }
            },
            "required": [
                "login",
                "firstName",
                "lastName",
                "email"
            ]
        },
        "custom": {
            "id": "#custom",
            "type": "object",
            "properties": {
              "twitterUserName": {
                  "title": "Twitter username",
                  "description": "User's username for twitter.com",
                  "type": "string",
                  "required": false,
                  "minLength": 1,
                  "maxLength": 10,
                  "permissions": [
                      {
                          "principal": "SELF",
                          "action": "READ_ONLY"
                      }
                  ]
              }
            },
            "required": []
        }
    },
    "type": "object",
    "properties": {
        "profile": {
            "allOf": [
                {
                    "$ref": "#/definitions/base"
                },
                {
                    "$ref": "#/definitions/custom"
                }
            ]
        }
    }
}
```

### Remove property from User Profile Schema

<ApiOperation method="post" url="/api/v1/meta/schemas/user/${typeId}" />

Removes one or more [custom User Profile properties](#user-profile-schema-property-object) from the user schema. You can't remove a property from the default Schema if it is being referenced as a [matchAttribute](/docs/reference/api/idps/#subject-policy-object) in SAML2 IdPs. Currently, all validation of SAML assertions is only performed against the default user type.

##### Request parameters

| Parameter   | Description                                                    | Param Type | DataType                                                         | Required |
|:------------|:---------------------------------------------------------------|:-----------|:-----------------------------------------------------------------|:---------|
| definitions | Subschema with one or more custom Profile properties to remove | Body       | [User Profile custom subschema](#user-profile-custom-subschema) | TRUE     |

> **Note:** You must set properties explicitly to `null` to remove them from the Schema, otherwise `POST` is interpreted as a partial update.

##### Response parameters

[User Schema](#user-schema-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "definitions": {
    "custom": {
      "id": "#custom",
      "type": "object",
      "properties": {
        "twitterUserName": null
      },
      "required": []
    }
  }
}' "https://${yourOktaDomain}/api/v1/meta/schemas/user/default"
```

##### Response example

The following response is only a subset of properties for brevity.

```json
{
    "id": "https://{yourOktaDomain}/meta/schemas/user/default",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "name": "user",
    "title": "Default Okta User",
    "lastUpdated": "2015-09-05T10:40:45.000Z",
    "created": "2015-02-02T10:27:36.000Z",
    "definitions": {
        "base": {
            "id": "#base",
            "type": "object",
            "properties": {
                "login": {
                    "title": "Username",
                    "type": "string",
                    "required": true,
                    "minLength": 5,
                    "maxLength": 100,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                },
                "firstName": {
                    "title": "First name",
                    "type": "string",
                    "required": true,
                    "minLength": 1,
                    "maxLength": 50,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                },
                "lastName": {
                    "title": "Last name",
                    "type": "string",
                    "required": true,
                    "minLength": 1,
                    "maxLength": 50,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                },
                "email": {
                    "title": "Primary email",
                    "type": "string",
                    "required": true,
                    "format": "email",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                }
            },
            "required": [
                "login",
                "firstName",
                "lastName",
                "email"
            ]
        },
        "custom": {
            "id": "#custom",
            "type": "object",
            "properties": {
            },
            "required": []
        }
    },
    "type": "object",
    "properties": {
        "profile": {
            "allOf": [
                {
                    "$ref": "#/definitions/base"
                },
                {
                    "$ref": "#/definitions/custom"
                }
            ]
        }
    }
}
```

## App User Schema operations

The [User Types](/docs/reference/api/user-types) feature doesn't extend to applications. All users assigned to a given application use the same [App User Schema](#app-user-schema-object). Thus, unlike the User Schema operations, the App User Schema operations all specify `default` and don't accept a Schema ID.

### Get App User Schema

<ApiOperation method="get" url="/api/v1/meta/schemas/apps/${instanceId}/default" />

Fetches the Schema for an App User

##### Request parameters

| Parameter  | Description                       | Param Type | DataType | Required |
|:-----------|:----------------------------------|:-----------|:---------|:---------|
| instanceId | The `id` of the target app instance | Path       | String   | TRUE     |


##### Response parameters

[App User Schema](#app-user-schema-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/meta/schemas/apps/${instanceId}/default"
```

##### Response example

```json
{
  "id": "https://{yourOktaDomain}/meta/schemas/apps/0oa25gejWwdXNnFH90g4/default",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "name": "Example App",
  "title": "Example App User",
  "lastUpdated": "2017-07-18T23:18:43.000Z",
  "created": "2017-07-18T22:35:30.000Z",
  "definitions": {
    "base": {
      "id": "#base",
      "type": "object",
      "properties": {
        "userName": {
          "title": "Username",
          "type": "string",
          "required": true,
          "scope": "NONE",
          "maxLength": 100
        }
      },
      "required": [
        "userName"
      ]
    },
    "custom": {
      "id": "#custom",
      "type": "object",
      "properties": {
      },
      "required": []
    }
  },
  "type": "object",
  "properties": {
    "profile": {
      "allOf": [
        {
          "$ref": "#/definitions/base"
        },
        {
          "$ref": "#/definitions/custom"
        }
      ]
    }
  }
}
```

### Add property to App User Profile Schema

<ApiOperation method="post" url="/api/v1/meta/schemas/apps/${instanceId}/default" />

Adds one or more [custom App User Profile properties](#app-user-profile-schema-property-object) to the App User schema

##### Request parameters

| Parameter   | Description                                          | Param Type | DataType                                                       | Required | Default |
| :----------- | :---------------------------------------------------- | :---------- | :-------------------------------------------------------------- | :-------- | :------- |
| instanceId  | The `id` of the target App Instance                    | Path       | String                                                         | TRUE     |        |
| definitions | Subschema with one or more custom Profile properties | Body       | [App User Profile Custom Subschema](#app-user-profile-custom-subschema) | TRUE     |

##### Response parameters

[App User Schema](#app-user-schema-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "definitions": {
    "custom": {
      "id": "#custom",
      "type": "object",
      "properties": {
        "twitterUserName": {
          "title": "Twitter username",
          "description": "User'\''s username for twitter.com",
          "type": "string",
          "required": false,
          "minLength": 1,
          "maxLength": 20
        }
      },
      "required": []
    }
  }
}' "https://${yourOktaDomain}/api/v1/meta/schemas/apps/${instanceId}/default"
```

##### Response example

```json
{
  "id": "https://{yourOktaDomain}/meta/schemas/apps/0oa25gejWwdXNnFH90g4/default",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "name": "Example App",
  "title": "Example App User",
  "lastUpdated": "2017-07-18T23:18:43.000Z",
  "created": "2017-07-18T22:35:30.000Z",
  "definitions": {
    "base": {
      "id": "#base",
      "type": "object",
      "properties": {
        "userName": {
          "title": "Username",
          "type": "string",
          "required": true,
          "scope": "NONE",
          "maxLength": 100
        }
      },
      "required": [
        "userName"
      ]
    },
    "custom": {
      "id": "#custom",
      "type": "object",
      "properties": {
        "twitterUserName": {
          "title": "Twitter username",
          "description": "User's username for twitter.com",
          "type": "string",
          "scope": "NONE",
          "minLength": 1,
          "maxLength": 20
        }
      },
      "required": []
    }
  },
  "type": "object",
  "properties": {
    "profile": {
      "allOf": [
        {
          "$ref": "#/definitions/base"
        },
        {
          "$ref": "#/definitions/custom"
        }
      ]
    }
  }
}
```

### Update App User Profile Schema property

<ApiOperation method="post" url="/api/v1/meta/schemas/apps/${instanceId}/default" />

Updates one or more [custom App User Profile properties](#app-user-profile-schema-property-object) in the schema, or the nullability of a base property. Changing a base property's nullability (for example, the value of its `required` field) is allowed only if it is nullable in the default predefined Schema for the App.

##### Request parameters

| Parameter   | Description                                          | Param Type | DataType                                                       | Required | Default |
| :----------- | :---------------------------------------------------- | :---------- | :-------------------------------------------------------------- | :-------- | :------- |
| instanceId  | The `id` of the target App Instance                    | Path       | String                                                         | TRUE     |        |
| definitions | Subschema with one or more custom Profile properties | Body       | [App User Profile Custom Subschema](#app-user-profile-custom-subschema) | TRUE     |

##### Response parameters

[App User Schema](#app-user-schema-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "definitions": {
    "custom": {
      "id": "#custom",
      "type": "object",
      "properties": {
        "twitterUserName": {
          "title": "Twitter username",
          "description": "User'\''s username for twitter.com",
          "type": "string",
          "required": false,
          "minLength": 1,
          "maxLength": 10
        }
      },
      "required": []
    }
  }
}' "https://${yourOktaDomain}/api/v1/meta/schemas/apps/${instanceId}/default"
```

##### Response example

```json
{
  "id": "https://{yourOktaDomain}/meta/schemas/apps/0oa25gejWwdXNnFH90g4/default",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "name": "Example App",
  "title": "Example App User",
  "lastUpdated": "2017-07-19T17:01:05.000Z",
  "created": "2017-07-18T22:35:30.000Z",
  "definitions": {
    "base": {
      "id": "#base",
      "type": "object",
      "properties": {
        "userName": {
          "title": "Username",
          "type": "string",
          "required": true,
          "scope": "NONE",
          "maxLength": 100
        }
      },
      "required": [
        "userName"
      ]
    },
    "custom": {
      "id": "#custom",
      "type": "object",
      "properties": {
        "twitterUserName": {
          "title": "Twitter username",
          "description": "User's username for twitter.com",
          "type": "string",
          "scope": "NONE",
          "minLength": 1,
          "maxLength": 10
        }
      },
      "required": []
    }
  },
  "type": "object",
  "properties": {
    "profile": {
      "allOf": [
        {
          "$ref": "#/definitions/base"
        },
        {
          "$ref": "#/definitions/custom"
        }
      ]
    }
  }
}
```

### Remove property from App User Profile Schema

<ApiOperation method="post" url="/api/v1/meta/schemas/apps/${instanceId}/default" />

Removes one or more [custom App User Profile properties](#app-user-profile-schema-property-object) from the App User Schema

##### Request parameters

| Parameter   | Description                                                    | Param Type | DataType                                                       | Required | Default |
| :----------- | :-------------------------------------------------------------- | :---------- | :-------------------------------------------------------------- | :-------- | :------- |
| instanceId  | The `id` of the target App Instance                              | Path       | String                                                         | TRUE     |        |
| definitions | Subschema with one or more custom Profile properties to remove | Body       | [App User Profile custom subschema](#app-user-profile-custom-subschema) | TRUE     |

> **Note:** You must explicitly set properties to `null` to remove them from the Schema, otherwise `POST` is interpreted as a partial update.

##### Response parameters

[App User Schema](#app-user-schema-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "definitions": {
    "custom": {
      "id": "#custom",
      "type": "object",
      "properties": {
        "twitterUserName": null
      },
      "required": []
    }
  }
}' "https://${yourOktaDomain}/api/v1/meta/schemas/apps/${instanceId}/default"
```

##### Response example

```json
{
  "id": "https://{yourOktaDomain}/meta/schemas/apps/0oa25gejWwdXNnFH90g4/default",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "name": "Example App",
  "title": "Example App User",
  "lastUpdated": "2017-07-19T17:11:22.000Z",
  "created": "2017-07-18T22:35:30.000Z",
  "definitions": {
    "base": {
      "id": "#base",
      "type": "object",
      "properties": {
        "userName": {
          "title": "Username",
          "type": "string",
          "required": true,
          "scope": "NONE",
          "maxLength": 100
        }
      },
      "required": [
        "userName"
      ]
    },
    "custom": {
      "id": "#custom",
      "type": "object",
      "properties": {}
    }
  },
  "type": "object",
  "properties": {
    "profile": {
      "allOf": [
        {
          "$ref": "#/definitions/base"
        },
        {
          "$ref": "#/definitions/custom"
        }
      ]
    }
  }
}
```

## Group Schema operations

The [User Types](/docs/reference/api/user-types) feature doesn't extend to groups. All groups use the same [Group Schema](#group-schema-object). Unlike User Schema operations, Group Schema operations all specify `default` and don't accept a Schema ID.

### Get Group Schema

<ApiOperation method="get" url="/api/v1/meta/schemas/group/default" />

Fetches the group schema.

##### Request parameters

N/A

##### Response parameters

[Group Schema](#group-schema-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/meta/schemas/group/default"
```

##### Response example

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/meta/schemas/group/default",
      "method": "GET",
      "rel": "self"
    }
  },
  "created": "2021-01-30T00:18:24.000Z",
  "definitions": {
    "base": {
      "id": "#base",
      "properties": {
        "description": {
          "description": "Description",
          "master": {
            "type": "PROFILE_MASTER"
          },
          "maxLength": 1024,
          "mutability": "READ_WRITE",
          "permissions": [
            {
              "action": "READ_WRITE",
              "principal": "SELF"
            }
          ],
          "scope": "NONE",
          "title": "Description",
          "type": "string"
        },
        "name": {
          "description": "Name",
          "master": {
            "type": "PROFILE_MASTER"
          },
          "maxLength": 255,
          "mutability": "READ_WRITE",
          "permissions": [
            {
              "action": "READ_WRITE",
              "principal": "SELF"
            }
          ],
          "required": true,
          "scope": "NONE",
          "title": "Name",
          "type": "string"
        }
      },
      "required": [
        "name"
      ],
      "type": "object"
    },
    "custom": {
      "id": "#custom",
      "properties": {
        "exampleCustomProperty": {
          "description": "exampleCustomProperty",
          "master": {
            "type": "PROFILE_MASTER"
          },
          "maxLength": 20,
          "minLength": 1,
          "mutability": "READ_WRITE",
          "permissions": [
            {
              "action": "READ_WRITE",
              "principal": "SELF"
            }
          ],
          "required": true,
          "scope": "NONE",
          "title": "exampleCustomProperty",
          "type": "string",
          "unique": "UNIQUE_VALIDATED"
        }
      },
      "required": [
        "exampleCustomProperty"
      ],
      "type": "object"
    }
  },
  "description": "Okta group profile template",
  "id": "https://{yourOktaDomain}/meta/schemas/group/default",
  "lastUpdated": "2021-02-19T08:51:57.000Z",
  "name": "group",
  "properties": {
    "profile": {
      "allOf": [
        {
          "$ref": "#/definitions/custom"
        },
        {
          "$ref": "#/definitions/base"
        }
      ]
    }
  },
  "title": "Okta group",
  "type": "object"
}
```

### Add property to Group Profile Schema

<ApiOperation method="post" url="/api/v1/meta/schemas/group/default" />

Adds one or more [custom Group Profile Schema properties](#group-profile-schema-property-object) to the group schema.

##### Request parameters

| Parameter   | Description                                          | Param Type | DataType                                                          | Required |
|:------------|:-----------------------------------------------------|:-----------|:------------------------------------------------------------------|:---------|
| definitions | Subschema with one or more custom Profile properties | Body       | [Group Profile custom subschema](#group-profile-custom-subschema) | TRUE     |

##### Response parameters

[Group Schema](#group-schema-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "definitions": {
    "custom": {
      "id": "#custom",
      "type": "object",
      "properties": {
        "groupContact": {
          "title": "Group administrative contact",
          "description": "Group administrative contact",
          "type": "string",
          "required": false,
          "minLength": 1,
          "maxLength": 20,
          "permissions": [
            {
              "principal": "SELF",
              "action": "READ_WRITE"
            }
          ]
        }
      },
      "required": []
    }
  }
}' "https://${yourOktaDomain}/api/v1/meta/schemas/group/default"
```

##### Response example

The following response is only a subset of properties for brevity.

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/meta/schemas/group/default",
      "method": "GET",
      "rel": "self"
    }
  },
  "created": "2021-01-30T00:18:24.000Z",
  "definitions": {
    "base": {
      "id": "#base",
      "properties": {},
      "required": [
        "name"
      ],
      "type": "object"
    },
    "custom": {
      "id": "#custom",
      "properties": {
        "groupContact": {
          "description": "Group administrative contact",
          "master": {
            "type": "PROFILE_MASTER"
          },
          "mutability": "READ_WRITE",
          "permissions": [
            {
              "action": "READ_WRITE",
              "principal": "SELF"
            }
          ],
          "scope": "NONE",
          "title": "Group administrative contact",
          "type": "string"
        }
      },
      "required": [],
      "type": "object"
    }
  },
  "description": "Okta group profile template",
  "id": "https://{yourOktaDomain}/meta/schemas/group/default",
  "lastUpdated": "2021-02-25T23:05:31.000Z",
  "name": "group",
  "properties": {
    "profile": {
      "allOf": [
        {
          "$ref": "#/definitions/custom"
        },
        {
          "$ref": "#/definitions/base"
        }
      ]
    }
  },
  "title": "Okta group",
  "type": "object"
}
```

### Update Group Profile Schema property

<ApiOperation method="post" url="/api/v1/meta/schemas/group/default" />

Updates one or more [custom Group Profile properties](#group-profile-schema-property-object) in the schema.  Currently Okta does not support changing [base Group Profile properties](#group-profile-base-subschema).

##### Request parameters

| Parameter   | Description                                          | Param Type | DataType                                                          | Required |
|:------------|:-----------------------------------------------------|:-----------|:------------------------------------------------------------------|:---------|
| definitions | Subschema with one or more custom Profile properties | Body       | [Group Profile custom subschema](#group-profile-custom-subschema) | TRUE     |

##### Response parameters

[Group Schema](#Group-schema-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "definitions": {
    "custom": {
      "id": "#custom",
      "type": "object",
      "properties": {
        "groupContact": {
          "title": "Group administrative contact",
          "description": "Group administrative contact",
          "type": "string",
          "required": false,
          "minLength": 1,
          "maxLength": 20,
          "permissions": [
            {
              "principal": "SELF",
              "action": "READ_WRITE"
            }
          ]
        }
      },
      "required": []
    }
  }
}' "https://${yourOktaDomain}/api/v1/meta/schemas/group/default"
```

##### Response example

The following response is only a subset of properties for brevity.

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/meta/schemas/group/default",
      "method": "GET",
      "rel": "self"
    }
  },
  "created": "2021-01-30T00:18:24.000Z",
  "definitions": {
    "base": {
      "id": "#base",
      "properties": {},
      "required": [
        "name"
      ],
      "type": "object"
    },
    "custom": {
      "id": "#custom",
      "properties": {
        "groupContact": {
          "description": "Group administrative contact",
          "master": {
            "type": "PROFILE_MASTER"
          },
          "mutability": "READ_WRITE",
          "permissions": [
            {
              "action": "READ_WRITE",
              "principal": "SELF"
            }
          ],
          "scope": "NONE",
          "title": "Group administrative contact",
          "type": "string"
        }
      },
      "required": [],
      "type": "object"
    }
  },
  "description": "Okta group profile template",
  "id": "https://{yourOktaDomain}/meta/schemas/group/default",
  "lastUpdated": "2021-02-25T23:05:31.000Z",
  "name": "group",
  "properties": {
    "profile": {
      "allOf": [
        {
          "$ref": "#/definitions/custom"
        },
        {
          "$ref": "#/definitions/base"
        }
      ]
    }
  },
  "title": "Okta group",
  "type": "object"
}
```

### Remove property from Group Profile Schema

<ApiOperation method="post" url="/api/v1/meta/schemas/group/default" />

Removes one or more [custom Group Profile Schema properties](#group-profile-schema-property-object) from the group schema. Currently, Okta doesn't support removing [base Group Profile properties](#group-profile-base-subschema).

##### Request parameters

| Parameter   | Description                                                    | Param Type | DataType                                                          | Required |
|:------------|:---------------------------------------------------------------|:-----------|:------------------------------------------------------------------|:---------|
| definitions | Subschema with one or more custom Profile properties to remove | Body       | [Group Profile custom subschema](#group-profile-custom-subschema) | TRUE     |

> **Note:** Since `POST` is interpreted as a partial update, you must set properties explicitly to `null` to remove them from the Schema.

##### Response parameters

[Group Schema](#group-schema-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "definitions": {
    "custom": {
      "id": "#custom",
      "type": "object",
      "properties": {
        "groupContact": null
      },
      "required": []
    }
  }
}' "https://${yourOktaDomain}/api/v1/meta/schemas/group/default"
```

##### Response example

The following response is only a subset of properties for brevity.

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/meta/schemas/group/default",
      "method": "GET",
      "rel": "self"
    }
  },
  "created": "2021-01-30T00:18:24.000Z",
  "definitions": {
    "base": {
      "id": "#base",
      "properties": {},
      "required": [
        "name"
      ],
      "type": "object"
    },
    "custom": {
      "id": "#custom",
      "properties": {
        "remainingOtherCustomProperty": {
          "description": "A property that was not deleted",
          "master": {
            "type": "PROFILE_MASTER"
          },
          "mutability": "READ_WRITE",
          "permissions": [
            {
              "action": "READ_WRITE",
              "principal": "SELF"
            }
          ],
          "scope": "NONE",
          "title": "Lorem ipsum",
          "type": "string"
        }
      },
      "required": [],
      "type": "object"
    }
  },
  "description": "Okta group profile template",
  "id": "https://{yourOktaDomain}/meta/schemas/group/default",
  "lastUpdated": "2021-02-25T23:05:31.000Z",
  "name": "group",
  "properties": {
    "profile": {
      "allOf": [
        {
          "$ref": "#/definitions/custom"
        },
        {
          "$ref": "#/definitions/base"
        }
      ]
    }
  },
  "title": "Okta group",
  "type": "object"
}
```

## Log Stream Schema operations

### Get Log Stream Schema

<ApiOperation method="get" url="/api/v1/meta/schemas/logStream/${typeId}" />

Fetches the schema for a Log Stream type. The `${typeId}` element in the URL specifies the Log Stream type, which is either `aws_eventbridge` or `splunk_cloud_logstreaming`. Use the `aws_eventbridge` literal to retrieve the AWS EventBridge type schema, and use the `splunk_cloud_logstreaming` literal retrieve the Splunk Cloud type schema.

See [Log Streaming API](/docs/reference/api/log-streaming) for examples of Log Stream objects.

##### Request parameters

N/A

##### Response parameters

[Log Stream Schema](#log-stream-schema-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/meta/schemas/logStream/aws_eventbridge"
```

##### Response example

For brevity, the following response doesn't include all available properties.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "http://{yourOktaDomain}/api/v1/meta/schemas/logStream/aws_eventbridge",
  "title": "AWS EventBridge",
  "type": "object",
  "properties": {
    "settings": {
      "description": "Configuration properties specific to AWS EventBridge",
      "type": "object",
      "properties": {
        "accountId": {
          "title": "AWS Account ID",
          "description": "Your Amazon AWS Account ID.",
          "type": "string",
          "writeOnce": true,
          "writeOnly": false,
          "pattern": "^\\d{12}$"
        },
        "eventSourceName": {
          "title": "AWS Event Source Name",
          "description": "An alphanumeric name (no spaces) to identify this event source in AWS EventBridge.",
          "type": "string",
          "writeOnce": true,
          "writeOnly": false,
          "pattern": "^[\\.\\-_A-Za-z0-9]{1,75}$"
        },
        "region": {
          "title": "AWS Region",
          "description": "The destination AWS region for your system log events.",
          "type": "string",
          "writeOnce": true,
          "writeOnly": false,
          "oneOf": [
            { "title": "US East (Ohio)", "const": "us-east-2" },
            { "title": "US East (N. Virginia)", "const": "us-east-1" },
            { "title": "US West (N. California)", "const": "us-west-1" },
            { "title": "US West (Oregon)", "const": "us-west-2" },
            { "title": "Asia Pacific (Mumbai)", "const": "ap-south-1" },
            { "title": "Asia Pacific (Osaka)", "const": "ap-northeast-3" },
            { "title": "Asia Pacific (Seoul)", "const": "ap-northeast-2" },
            { "title": "Asia Pacific (Singapore)", "const": "ap-southeast-1" },
            { "title": "Asia Pacific (Sydney)", "const": "ap-southeast-2" },
            { "title": "Asia Pacific (Tokyo)", "const": "ap-northeast-1" },
            { "title": "Canada (Central)", "const": "ca-central-1" },
            { "title": "Europe (Frankfurt)", "const": "eu-central-1" },
            { "title": "Europe (Ireland)", "const": "eu-west-1" },
            { "title": "Europe (London)", "const": "eu-west-2" },
            { "title": "Europe (Paris)", "const": "eu-west-3" },
            { "title": "Europe (Stockholm)", "const": "eu-north-1" },
            { "title": "South America (São Paulo)", "const": "sa-east-1" }
          ]
        }
      },
      "required": [
        "eventSourceName",
        "accountId",
        "region"
      ],
      "errorMessage": {
        "properties": {
          "accountId": "Account number must be 12 digits.",
          "eventSourceName": "Event source name can use numbers, letters, the symbols \".\", \"-\" or \"_\". It must use fewer than 76 characters."
        }
      }
    },
    "name": {
      "title": "Name",
      "description": "A name for this log stream in Okta",
      "type": "string",
      "writeOnce": false,
      "pattern": "^.{1,100}$"
    }
  },
  "required": [
    "name",
    "settings"
  ],
  "errorMessage": {
    "properties": {
      "name": "Name can't exceed 100 characters."
    }
  }
}
```

### List Log Stream Schemas

<ApiOperation method="get" url="/api/v1/meta/schemas/logStream" />

Lists schemas for all Log Stream types visible for this org.

See [Log Streaming API](/docs/reference/api/log-streaming) for examples of Log Stream objects.

##### Request parameters

N/A

##### Response parameters

Array of [Log Stream Schema](#log-stream-schema-object) objects

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/meta/schemas/logStream"
```

##### Response example

For brevity, the following response doesn't include all available properties.

```json
[
  {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "http://{yourOktaDomain}/api/v1/meta/schemas/logStream/aws_eventbridge",
    "title": "AWS EventBridge",
    "type": "object",
    "properties": {
      "settings": {
        "description": "Configuration properties specific to AWS EventBridge",
        "type": "object",
        "properties": {
          "accountId": {
            "title": "AWS Account ID",
            "description": "Your Amazon AWS Account ID.",
            "type": "string",
            "writeOnce": true,
            "writeOnly": false,
            "pattern": "^\\d{12}$"
          },
          "eventSourceName": {
            "title": "AWS Event Source Name",
            "description": "An alphanumeric name (no spaces) to identify this event source in AWS EventBridge.",
            "type": "string",
            "writeOnce": true,
            "writeOnly": false,
            "pattern": "^[\\.\\-_A-Za-z0-9]{1,75}$"
          },
          "region": {
            "title": "AWS Region",
            "description": "The destination AWS region for your system log events.",
            "type": "string",
            "writeOnce": true,
            "writeOnly": false,
            "oneOf": [
              { "title": "US East (Ohio)", "const": "us-east-2" },
              { "title": "US East (N. Virginia)", "const": "us-east-1" },
              { "title": "US West (N. California)", "const": "us-west-1" },
              { "title": "US West (Oregon)", "const": "us-west-2" },
              { "title": "Asia Pacific (Mumbai)", "const": "ap-south-1" },
              { "title": "Asia Pacific (Osaka)", "const": "ap-northeast-3" },
              { "title": "Asia Pacific (Seoul)", "const": "ap-northeast-2" },
              { "title": "Asia Pacific (Singapore)", "const": "ap-southeast-1" },
              { "title": "Asia Pacific (Sydney)", "const": "ap-southeast-2" },
              { "title": "Asia Pacific (Tokyo)", "const": "ap-northeast-1" },
              { "title": "Canada (Central)", "const": "ca-central-1" },
              { "title": "Europe (Frankfurt)", "const": "eu-central-1" },
              { "title": "Europe (Ireland)", "const": "eu-west-1" },
              { "title": "Europe (London)", "const": "eu-west-2" },
              { "title": "Europe (Paris)", "const": "eu-west-3" },
              { "title": "Europe (Stockholm)", "const": "eu-north-1" },
              { "title": "South America (São Paulo)", "const": "sa-east-1" }
            ]
          }
        },
        "required": [
          "eventSourceName",
          "accountId",
          "region"
        ],
        "errorMessage": {
          "properties": {
            "accountId": "Account number must be 12 digits.",
            "eventSourceName": "Event source name can use numbers, letters, the symbols \".\", \"-\" or \"_\". It must use fewer than 76 characters."
          }
        }
      },
      "name": {
        "title": "Name",
        "description": "A name for this log stream in Okta",
        "type": "string",
        "writeOnce": false,
        "pattern": "^.{1,100}$"
      }
    },
    "required": [
      "name",
      "settings"
    ],
    "errorMessage": {
      "properties": {
        "name": "Name can't exceed 100 characters."
      }
    }
  },
  {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "http://{yourOktaDomain}/api/v1/meta/schemas/logStream/splunk_cloud_logstreaming",
    "title": "Splunk Cloud",
    "type": "object",
    "properties": {
      "settings": {
        "description": "Configuration properties specific to Splunk Cloud",
        "type": "object",
        "properties": {
          "edition": {
            "title": "Splunk Edition",
            "description": "Select a Splunk Edition.",
            "type": "string",
            "writeOnce": false,
            "oneOf": [
              {
                "title": "AWS",
                "const": "aws"
              },
              {
                "title": "GCP",
                "const": "gcp"
              },
              {
                "title": "AWS GovCloud",
                "const": "aws_govcloud"
              }
            ]
          },
          "host": {
            "title": "Host",
            "description": "The domain for your Splunk Cloud instance without http or https. For example: acme.splunkcloud.com",
            "type": "string",
            "writeOnce": false,
            "writeOnly": false,
            "pattern": "^([a-z0-9]+(-[a-z0-9]+)*){1,100}\\.splunkcloud(gc|fed)?\\.com$"
          },
          "token": {
            "title": "HEC Token",
            "description": "The token from your Splunk Cloud HTTP Event Collector (HEC).",
            "type": "string",
            "writeOnce": true,
            "writeOnly": true,
            "pattern": "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}"
          }
        },
        "required": [
          "edition",
          "host",
          "token"
        ],
        "errorMessage": {
          "properties": {
            "host": "Host should be a domain without http or https. For example: acme.splunkcloud.com"
          }
        }
      },
      "name": {
        "title": "Name",
        "description": "A name for this log stream in Okta",
        "type": "string",
        "writeOnce": false,
        "pattern": "^.{1,100}$"
      }
    },
    "required": [
      "name",
      "settings"
    ],
    "errorMessage": {
      "properties": {
        "name": "Name can't exceed 100 characters."
      }
    }
  }
]
```

## User Schema object

The [User object](/docs/reference/api/users/#user-object) schema is defined using [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04).

> **Note:** The Schema currently only defines the [Profile object](/docs/reference/api/users/#profile-object).

### Example User Schema

```json
{
    "id": "https://{yourOktaDomain}/meta/schemas/user/default",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "name": "user",
    "title": "Default Okta User",
    "lastUpdated": "2015-09-05T10:40:45.000Z",
    "created": "2015-02-02T10:27:36.000Z",
    "definitions": {
        "base": {
            "id": "#base",
            "type": "object",
            "properties": {
                "login": {
                    "title": "Username",
                    "type": "string",
                    "required": true,
                    "minLength": 5,
                    "maxLength": 100,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                },
                "firstName": {
                    "title": "First name",
                    "type": "string",
                    "required": true,
                    "minLength": 1,
                    "maxLength": 50,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                },
                "lastName": {
                    "title": "Last name",
                    "type": "string",
                    "required": true,
                    "minLength": 1,
                    "maxLength": 50,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                },
                "email": {
                    "title": "Primary email",
                    "type": "string",
                    "required": true,
                    "format": "email",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                }
            },
            "required": [
                "login",
                "firstName",
                "lastName",
                "email"
            ]
        },
        "custom": {
            "id": "#custom",
            "type": "object",
            "properties": {
              "twitterUserName": {
                  "title": "Twitter username",
                  "description": "User's username for twitter.com",
                  "type": "string",
                  "required": false,
                  "minLength": 1,
                  "maxLength": 20,
                  "permissions": [
                      {
                          "principal": "SELF",
                          "action": "READ_WRITE"
                      }
                  ]
              }
            },
            "required": []
        }
    },
    "type": "object",
    "properties": {
        "profile": {
            "allOf": [
                {
                    "$ref": "#/definitions/base"
                },
                {
                    "$ref": "#/definitions/custom"
                }
            ]
        }
    }
}
```

### Schema properties

The User Schema is a valid [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04) document with the following properties:

| Property    | Description                                                                              | DataType                                                | Nullable | Unique | Readonly | Validation  |
|:------------|:-----------------------------------------------------------------------------------------|:--------------------------------------------------------|:---------|:-------|:---------|:------------|
| id          | URI of User Schema                                                                       | String                                                  | FALSE    | TRUE   | TRUE     |             |
| $schema     | JSON Schema version identifier                                                           | String                                                  | FALSE    | FALSE  | TRUE     |             |
| name        | Name for the Schema                                                                      | String                                                  | FALSE    | TRUE   | TRUE     |             |
| title       | User-defined display name for the Schema                                                 | String                                                  | FALSE    | FALSE  | FALSE    |             |
| created     | Timestamp when Schema was created                                                        | [ISO 8601 String](https://tools.ietf.org/html/rfc3339) | FALSE    | FALSE  | TRUE     |             |
| lastUpdated | Timestamp when Schema was last updated                                                   | [ISO 8601 String](https://tools.ietf.org/html/rfc3339) | FALSE    | FALSE  | TRUE     |             |
| definitions | User Profile subschemas                                                                  | [User Profile Subschemas](#user-profile-subschemas)    | FALSE    | FALSE  | FALSE    | JSON Schema |
| type        | Type of [root Schema](https://tools.ietf.org/html/draft-zyp-json-schema-04#section-3.4) | String                                                  | FALSE    | FALSE  | TRUE     |             |
| properties  | User object properties                                                                    | [User object](/docs/reference/api/users/#user-object) property set     | FALSE    | FALSE  | TRUE     |             |

### User Profile subschemas

The [Profile object](/docs/reference/api/users/#profile-object) for a User is defined by a composite Schema of base and custom properties using a JSON path to reference subschemas. The `#base` properties are defined and versioned by Okta, while `#custom` properties are extensible.

- [User Profile base subschema](#user-profile-base-subschema)
- [User Profile custom subschema](#user-profile-custom-subschema)

Custom property names for the [Profile object](/docs/reference/api/users/#profile-object) must be unique and can't conflict with a property name defined in the `#base` subschema.

```json
{
  "definitions": {
    "base": {
      "id": "#base",
      "type": "object",
      "properties": {},
      "required": []
    },
    "custom": {
      "id": "#custom",
      "type": "object",
      "properties": {},
      "required": []
    }
  },
  "type": "object",
  "properties": {
    "profile": {
      "allOf": [
        {
          "$ref": "#/definitions/base"
        },
        {
          "$ref": "#/definitions/custom"
        }
      ]
    }
  }
}
```

#### User Profile base subschema

All Okta-defined Profile properties are defined in a Profile subschema with the resolution scope `#base`. You can't modify these properties, except to update permissions, to change the nullability of `firstName` and `lastName`, or to specify a [pattern](#login-pattern-validation) for `login`.  They can't be removed.

The base User Profile is based on the [System for Cross-Domain Identity Management: Core Schema](https://tools.ietf.org/html/draft-ietf-scim-core-schema-22#section-4.1.1) and has the following standard properties:

| Property          | Description                                                                                                                        | DataType | Nullable | Unique | Readonly | MinLength | MaxLength | Validation                                                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | ------ | -------- | --------- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| login             | Unique identifier for the User (`username`)                                                                                        | String   | FALSE    | TRUE   | FALSE    | 5         | 100       | [pattern](#login-pattern-validation)                                            |
| email             | Primary email address of the User                                                                                                      | String   | FALSE    | TRUE   | FALSE    | 5         | 100       | [RFC 5322 Section 3.2.3](https://datatracker.ietf.org/doc/html/rfc5322#section-3.2.3)                                        |
| secondEmail       | Secondary email address of the User typically used for account recovery                                                                | String   | TRUE     | TRUE   | FALSE    | 5         | 100       | [RFC 5322 Section 3.2.3](https://datatracker.ietf.org/doc/html/rfc5322#section-3.2.3)                                        |
| firstName         | Given name of the User (`givenName`)                                                                                               | String   | FALSE (default)    | FALSE  | FALSE    | 1         | 50        |                                                                                                                   |
| lastName          | Family name of the User (`familyName`)                                                                                             | String   | FALSE (default)    | FALSE  | FALSE    | 1         | 50        |                                                                                                                   |
| middleName        | Middle name(s) of the User                                                                                                         | String   | FALSE    | FALSE  | FALSE    |           |           |                                                                                                                   |
| honorificPrefix   | Honorific prefix(es) of the User or title in most Western languages                                                               | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| honorificSuffix   | Honorific suffix(es) of the User                                                                                                   | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| title             | User's title, such as "Vice President"                                                                                       | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| displayName       | Name of the User, suitable for display to end Users                                                                                | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| nickName          | Casual way to address the User in real life                                                                                        | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| profileUrl        | URL of the User's online Profile (for example: a web page)                                                                               | String   | TRUE     | FALSE  | FALSE    |           |           | [Relative Uniform Resource Locators specification](https://tools.ietf.org/html/rfc1808)                                                                        |
| primaryPhone      | Primary phone number of the User, such as home number                                                                                   | String   | TRUE     | FALSE  | FALSE    | 0         | 100       |                                                                                                                   |
| mobilePhone       | Mobile phone number of the User                                                                                                        | String   | TRUE     | FALSE  | FALSE    | 0         | 100       |                                                                                                                   |
| streetAddress     | Full street address component of the User's address                                                                              | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| city              | City or locality component of the User's address (`locality`)                                                                    | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| state             | State or region component of the User's address (`region`)                                                                       | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| zipCode           | ZIP code or postal code component of the User's address (`postalCode`)                                                            | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| countryCode       | Country name component of the User's address (`country`)                                                                         | String   | TRUE     | FALSE  | FALSE    |           |           | [ISO 3166-1 alpha 2 "short" code format](https://tools.ietf.org/html/draft-ietf-scim-core-schema-22#ref-ISO3166)  |
| postalAddress     | Mailing address component of the User's address                                                                                  | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| preferredLanguage | User's preferred written or spoken languages                                                                                 | String   | TRUE     | FALSE  | FALSE    |           |           | [RFC 7231 Section 5.3.5](https://tools.ietf.org/html/rfc7231#section-5.3.5)                                       |
| locale            | User's default location for purposes of localizing items such as currency, date time format, numerical representations, and so on. | String   | FALSE (default)    | FALSE  | FALSE    |           |           | See [Locale format](#locale-format) details.                                                                                        |
| timezone          | User's time zone                                                                                                             | String   | TRUE     | FALSE  | FALSE    |           |           | [IANA Time Zone database format](https://tools.ietf.org/html/rfc6557)                                             |
| userType          | Used to describe the organization to the User relationship such as "Employee" or "Contractor"                                          | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| employeeNumber    | Organization or company assigned unique identifier for the User                                                                    | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| costCenter        | Name of a cost center assigned to the User                                                                                             | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| organization      | Name of the User's organization                                                                                                  | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| division          | Name of the User's division                                                                                                      | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| department        | Name of the User's department                                                                                                    | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| managerId         | `id` of the User's manager                                                                                                     | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| manager           | `displayName` of the User's manager                                                                                            | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |

> **Note:** The `userType` field is an arbitrary string value and isn't related to the newer [User Types](/docs/reference/api/user-types) feature.

##### Locale format

A locale value is a concatenation of the ISO 639-1 two-letter language code, an underscore, and the ISO 3166-1 two-letter country code. For example: `en_US` specifies the language English and country US. This value is `en_US` by default.

##### Login pattern validation

The `login` property is validated according to its `pattern` attribute, which is a string. By default, the attribute is null. When the attribute is null, the username is required to be formatted as an email address as defined by [RFC 6531 Section 3.3](http://tools.ietf.org/html/rfc6531#section-3.3). The pattern can be set through the API to one of the following forms. (The Admin Console provides access to the same forms.)

- A login pattern of `".+"` indicates that there is no restriction on usernames. Any non-empty, unique value is permitted, and the minimum length of five isn't enforced. In this case, usernames don't need to include the `@` character. If a name does include `@`, the portion ahead of the `@` can be used for logging in, provided it identifies a unique User within the org.

- A login pattern of the form `"[...]+"` indicates that usernames must only contain characters from the set given between the brackets. The enclosing brackets and final `+` are required for this form. Character ranges can be indicated using hyphens. To include the hyphen itself in the allowed set, the hyphen must appear first. Any characters in the set except the hyphen, a-z, A-Z, and 0-9 must be preceded by a backslash (`\`). For example, `"[a-z13579\.]+"` would restrict usernames to lowercase letters, odd digits, and periods, while `"[-a-zA-Z0-9]+"` would allow basic alphanumeric characters and hyphens.

#### User Profile custom subschema

All custom Profile properties are defined in a Profile subschema with the resolution scope `#custom`.

```json
{
  "definitions": {
    "custom": {
        "id": "#custom",
        "type": "object",
        "properties": {
            "customPropertyName": {
                "title": "Title of custom property",
                "description": "Description of custom property",
                "type": "string",
                "permissions": [
                    {
                        "principal": "SELF",
                        "action": "READ_ONLY"
                    }
                ]
            }
        },
        "required": []
    }
  }
}
```

#### User Profile Schema property object

User Profile Schema properties have the following standard [JSON Schema Draft 6](https://tools.ietf.org/html/draft-wright-json-schema-validation-01) properties:

| Property                       | Description                                | DataType                                          | Nullable | Unique | Readonly |
|:-------------------------------|:-------------------------------------------|:--------------------------------------------------|:---------|:-------|:---------|
| title                          | User-defined display name for the property | String                                            | FALSE    | FALSE  | FALSE    |
| description                    | Description of the property                | String                                            | TRUE     | FALSE  | FALSE    |
| type                           | Type of property                           | `string`, `boolean`, `number`, `integer`, `array` | FALSE    | TRUE   | TRUE     |
| enum                           | Enumerated value of the property           | array                                             | TRUE     | TRUE   | FALSE    |
| oneOf                          | Non-empty array of valid JSON schemas      | array                                             | TRUE     | TRUE   | FALSE    |
| format                         | Identifies the type of data represented by the string | string                                            | TRUE     | TRUE   | FALSE    |

##### Description details

- `enum`: The value of the property is limited to one of the values specified in the `enum` definition. The list of values for the `enum` must be made up of unique elements.

- `oneOf`: Okta only supports `oneOf` for specifying display names for an `enum`. Each schema has the following format:

  ```json
  {
    "const": "enumValue",
    "title": "display name"
  }
  ```

  When `enum` is used in conjunction with `oneOf`, you must keep the set of enumerated values and their order.

  ```json
  {"enum": ["S","M","L","XL"],
    "oneOf": [
      {"const": "S", "title": "Small"},
      {"const": "M", "title": "Medium"},
      {"const": "L", "title": "Large"},
      {"const": "XL", "title": "Extra Large"}
    ]
  }
  ```

  `oneOf` is only supported in conjunction with `enum`, providing a mechanism to return a display name for the `enum` value.

- `format`: Okta uses this keyword to identify the type of data represented by the string. The following attribute formats are supported: `uri`, `date-time`, `email`, `ref-id`, `encrypted`, `hashed`, `country-code`, `language-code`, `locale`, and `timezone`. See the following request that uses the format property:

  ```bash
  curl --location --request POST "https://${yourOktaDomain}/api/v1/meta/schemas/user/${typeId}" \
  --header "Accept: application/json" \
  --header "Content-Type: application/json" \
  --header "Authorization: SSWS ${api_token}" \
  --data-raw '{
      "definitions": {
          "custom": {
              "id": "#custom",
              "type": "object",
              "properties": {
                  "CustomCountryCode": {
                      "title": "Custom Country Code",
                      "description": "Custom Country Code",
                      "type": "string",
                      "required": false,
                      "format": "country-code"
                  }
              },
              "required": []
          }
      }
  }'
  ```

Okta has also extended [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04) with the following keywords:

| Property                            | Description                                                       | DataType                                                                  | Nullable | Unique | Readonly |
| :---------------------------------- | :---------------------------------------------------------------- | :------------------------------------------------------------------------ | :------- | :----- | :------- |
| required                            | Determines whether the property is required                       | Boolean                                                                   | FALSE    | FALSE  | FALSE    |
| [unique](#unique-attributes)         | Determines whether property values must be unique                 | Boolean                                                                   | FALSE    | FALSE  | FALSE    |
| permissions                         | Access control permissions for the property                       | Array of [Schema property permission](#schema-property-permission-object) | FALSE    | FALSE  | FALSE    |

> **Note:** A read-only [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04) compliant `required` property is also available on the [User Profile Subschemas](#user-profile-subschemas).

```json
{
  "definitions": {
    "custom": {
      "id": "#custom",
      "type": "object",
      "properties": {
        "twitterUserName": {
          "title": "Twitter username",
          "description": "User's username for twitter.com",
          "type": "string",
          "required": false,
          "minLength": 1,
          "maxLength": 20,
          "permissions": [
            {
              "principal": "SELF",
              "action": "READ_WRITE"
            }
          ]
        }
      },
      "required": []
    }
  }
}
```

##### User Schema property types and validation

Specific property types support a subset of [JSON Schema validations](https://tools.ietf.org/html/draft-fge-json-schema-validation-00).

| Property Type | Description                                                                                                                         | Validation Keywords         |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------------- | :--------------------------- |
| `string`      | [JSON String](https://tools.ietf.org/html/rfc7159#section-7)                                                                        | `minLength` and `maxLength` |
| `boolean`     | `false`, `true`, or `null`                                                                                                          |                             |
| `number`      | [JSON Number](https://tools.ietf.org/html/rfc7159#section-6) with double-precision 64-bit IEEE 754 floating point number constraint | `minimum` and `maximum`     |
| `integer`     | [JSON Number](https://tools.ietf.org/html/rfc7159#section-6) with 32-bit signed two's complement integer constraint           | `minimum` and `maximum`     |
| `array`       | [JSON Array](https://tools.ietf.org/html/rfc7159#section-5)                                                                         |                             |

#### Schema property permission object

A given Schema property can be assigned a permission for a principal that restricts access to the property.

| Property  | Description                                                      | DataType                                                           | Nullable | Unique | Readonly |
| :----------| :---------------------------------------------------------------- | :------------------------------------------------------------------ |:--------- | :------ | :-------- |
| principal | Security principal                                               | `SELF` (end user)                                                  | FALSE    | TRUE   | FALSE    |
| action    | Determines whether the principal can view or modify the property | `HIDE`, `READ_ONLY`, `READ_WRITE`                                  | FALSE    | FALSE  | FALSE    |

## App User Schema object

The [App User object](/docs/reference/api/apps/#application-user-object) Schema is defined using [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04).

> **Note:** The schema currently only defines the [Profile object](/docs/reference/api/apps/#application-user-profile-object).

### Example App User Schema

```json
{
  "id": "https://{yourOktaDomain}/meta/schemas/apps/0oa25gejWwdXNnFH90g4/default",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "name": "Example App",
  "title": "Example App User",
  "lastUpdated": "2017-07-18T22:37:55.000Z",
  "created": "2017-07-18T22:35:30.000Z",
  "definitions": {
    "base": {
      "id": "#base",
      "type": "object",
      "properties": {
        "userName": {
          "title": "Username",
          "type": "string",
          "required": true,
          "scope": "NONE",
          "maxLength": 100
        }
      },
      "required": [
        "userName"
      ]
    },
    "custom": {
      "id": "#custom",
      "type": "object",
      "properties": {
        "twitterUserName": {
          "title": "Twitter username",
          "description": "User's username for twitter.com",
          "type": "string",
          "scope": "NONE",
          "minLength": 1,
          "maxLength": 20
        }
      },
      "required": []
    }
  },
  "type": "object",
  "properties": {
    "profile": {
      "allOf": [
        {
          "$ref": "#/definitions/base"
        },
        {
          "$ref": "#/definitions/custom"
        }
      ]
    }
  }
}
```

### Schema properties

The App User Schema is a valid [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04) document with the following properties:

| Property    | Description                                                                              | DataType                                                           | Nullable | Unique | Readonly | Validation  |
|:------------|:-----------------------------------------------------------------------------------------|:-------------------------------------------------------------------|:---------|:-------|:---------|:------------|
| id          | URI of App User Schema                                                                   | String                                                             | FALSE    | TRUE   | TRUE     |             |
| $schema     | JSON Schema version identifier                                                           | String                                                             | FALSE    | FALSE  | TRUE     |             |
| name        | Name for the Schema                                                                      | String                                                             | FALSE    | TRUE   | TRUE     |             |
| title       | User-defined display name for the Schema                                                 | String                                                             | FALSE    | FALSE  | FALSE    |             |
| created     | Timestamp when the Schema was created                                                        | [ISO 8601 String](https://tools.ietf.org/html/rfc3339)            | FALSE    | FALSE  | TRUE     |             |
| lastUpdated | Timestamp when the Schema was last updated                                                   | [ISO 8601 String](https://tools.ietf.org/html/rfc3339)            | FALSE    | FALSE  | TRUE     |             |
| definitions | App User Profile subschemas                                                              | [App User Profile Subschemas](#app-user-profile-subschemas)       | FALSE    | FALSE  | FALSE    | JSON Schema |
| type        | Type of [root Schema](https://tools.ietf.org/html/draft-zyp-json-schema-04#section-3.4) | String                                                             | FALSE    | FALSE  | TRUE     |             |
| properties  | App User object properties                                                                | [App User object](/docs/reference/api/apps/#application-user-object) property set | FALSE    | FALSE  | TRUE     |             |

### App User Profile subschemas

The [Profile object](/docs/reference/api/apps/#application-user-profile-object) for a User is defined by a composite schema of base and custom properties using a JSON path to reference subschemas. The `#base` properties are defined and versioned by Okta while `#custom` properties are extensible.

- [App User Profile base subschema](#app-user-profile-base-subschema)
- [App User Profile custom subschema](#app-user-profile-custom-subschema)

Custom property names for the [Profile object](/docs/reference/api/apps/#application-user-profile-object) must be unique and can't conflict with a property name defined in the `#base` subschema.

```json
{
  "definitions": {
    "base": {
      "id": "#base",
      "type": "object",
      "properties": {},
      "required": []
    },
    "custom": {
      "id": "#custom",
      "type": "object",
      "properties": {},
      "required": []
    }
  },
  "type": "object",
  "properties": {
    "profile": {
      "allOf": [
        {
          "$ref": "#/definitions/base"
        },
        {
          "$ref": "#/definitions/custom"
        }
      ]
    }
  }
}
```

#### App User Profile base subschema

All Okta-defined Profile properties are defined in a Profile subschema with the resolution scope `#base`. These properties can't be removed or edited, except for nullability in some cases.  Changing a base property's nullability, for example, the value of its `required` field, is allowed only if it is nullable in the default predefined Schema for the App.

The base App User Profile varies substantially depending on the application. The following properties are required for all App User Profiles:

| Property          | Description                                                                                                                  | DataType | Nullable | Unique | Readonly | MinLength | MaxLength |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | ------ | -------- | --------- | --------- |
| userName          | Unique identifier for the User                                                                                               | String   | FALSE    | TRUE   | FALSE    |           | 100       |

#### App User Profile custom subschema

All custom Profile properties are defined in a Profile subschema with the resolution scope `#custom`.

```json
{
  "definitions": {
    "custom": {
        "id": "#custom",
        "type": "object",
        "properties": {
            "customPropertyName": {
                "title": "Title of custom property",
                "description": "Description of custom property",
                "type": "string"
            }
        },
        "required": []
    }
  }
}
```

#### App User Profile Schema Property object

App User Profile schema properties have the following standard [JSON Schema Draft 6](https://tools.ietf.org/html/draft-wright-json-schema-validation-01) properties:

| Property                       | Description                                | DataType                                          | Nullable | Unique | Readonly |
|:-------------------------------|:-------------------------------------------|:--------------------------------------------------|:---------|:-------|:---------|
| title                          | User-defined display name for the property | String                                            | FALSE    | FALSE  | FALSE    |
| description                    | Description of the property                | String                                            | TRUE     | FALSE  | FALSE    |
| type                           | Type of property                           | `string`, `boolean`, `number`, `integer`, `array` | FALSE    | FALSE  | FALSE    |
| enum                           | Enumerated value of the property           | array                                             | TRUE     | TRUE   | FALSE    |
| oneOf                          | Non-empty array of valid JSON schemas      | array                                             | TRUE     | TRUE   | FALSE    |
| format                         | Identifies the type of data represented by the string | string                                            | TRUE     | TRUE   | FALSE    |

##### Description details

- `enum`: The value of the property is limited to one of the values specified in the `enum` definition. The list of values for the `enum` must be made up of unique elements.

- `oneOf`: Okta only supports `oneOf` for specifying display names for an `enum`. Each schema has the following format:

  ```json
  {
    "const": "enumValue",
    "title": "display name"
  }
  ```

  When `enum` is used in conjunction with `oneOf`, you must keep the set of enumerated values and their order.

  ```json
  {"enum": ["S","M","L","XL"],
    "oneOf": [
      {"const": "S", "title": "Small"},
      {"const": "M", "title": "Medium"},
      {"const": "L", "title": "Large"},
      {"const": "XL", "title": "Extra Large"}
    ]
  }
  ```

  `oneOf` is only supported in conjunction with `enum`, providing a mechanism to return a display name for the `enum` value.

- `format`: Okta uses this keyword to identify the type of data represented by the string. The following attribute formats are supported: `uri`, `date-time`, `email`, `ref-id`, `encrypted`, `hashed`, `country-code`, `language-code`, `locale`, and `timezone`. See the following request that uses the format property:

  ```bash
  curl --location --request POST "https://${yourOktaDomain}/api/v1/meta/schemas/apps/${appId}/default" \
  --header "Accept: application/json" \
  --header "Content-Type: application/json" \
  --header "Authorization: SSWS ${api_token}" \
  --data-raw '{
      "definitions": {
          "custom": {
              "id": "#custom",
              "type": "object",
              "properties": {
                  "CustomCountryCode": {
                      "title": "Custom Country Code",
                      "description": "Custom Country Code",
                      "type": "string",
                      "required": false,
                      "format": "country-code"
                  }
              },
              "required": []
          }
      }
  }'
  ```

Okta has also extended [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04) with the following keywords:

| Property      | Description                                     | DataType                                                                  | Nullable | Unique | Readonly |
| :------------- | :----------------------------------------------- | :------------------------------------------------------------------------- | :--------- | :------ | :-------- |
| required      | Determines whether the property is required     | Boolean                                                                   | FALSE    | FALSE  | FALSE    |
| scope         | Determines whether an appuser attribute can be set at the individual or group level | `SELF`, `NONE`                        | FALSE    | FALSE  | TRUE     |

> **Note:** A read-only [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04) compliant `required` property is also available on [App User Profile subschemas](#app-user-profile-subschemas).

```json
{
  "definitions": {
    "custom": {
      "id": "#custom",
      "type": "object",
      "properties": {
        "twitterUserName": {
          "title": "Twitter username",
          "description": "User's username for twitter.com",
          "type": "string",
          "required": false,
          "scope": "NONE",
          "minLength": 1,
          "maxLength": 20
        }
      },
      "required": []
    }
  }
}
```

##### App User Schema property types and validation

Specific property types support a subset of [JSON Schema validations](https://tools.ietf.org/html/draft-fge-json-schema-validation-00).

| Property Type | Description                                                                                                                         | Validation Keywords         |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------------- | :--------------------------- |
| `string`      | [JSON String](https://tools.ietf.org/html/rfc7159#section-7)                                                                        | `minLength` and `maxLength` |
| `boolean`     | `false`, `true`, or `null`                                                                                                          |                             |
| `number`      | [JSON Number](https://tools.ietf.org/html/rfc7159#section-6) with double-precision 64-bit IEEE 754 floating point number constraint | `minimum` and `maximum`     |
| `integer`     | [JSON Number](https://tools.ietf.org/html/rfc7159#section-6) with 32-bit signed two's complement integer constraint           | `minimum` and `maximum`     |
| `array`       | [JSON Array](https://tools.ietf.org/html/rfc7159#section-5)                                                                         |                             |

## Group Schema object

The [Group object](/docs/reference/api/groups/#group-object) schema is defined using [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04).

> **Note:** The schema currently only defines the [Profile object](/docs/reference/api/groups/#profile-object).

### Example Group Schema

```json
{
  "id": "https://{yourOktaDomain}/meta/schemas/group/default",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "name": "example group",
  "title": "Okta group example",
  "lastUpdated": "2017-07-18T22:37:55.000Z",
  "description": "Okta group profile template",
  "created": "2017-07-18T22:35:30.000Z",
  "definitions": {
    "base": {
      "id": "#base",
      "properties": {
        "description": {
          "description": "Description",
          "master": {
            "type": "PROFILE_MASTER"
          },
          "maxLength": 1024,
          "mutability": "READ_WRITE",
          "permissions": [
            {
              "action": "READ_WRITE",
              "principal": "SELF"
            }
          ],
          "scope": "NONE",
          "title": "Description",
          "type": "string"
        },
        "name": {
          "description": "Name",
          "master": {
            "type": "PROFILE_MASTER"
          },
          "maxLength": 255,
          "mutability": "READ_WRITE",
          "permissions": [
            {
              "action": "READ_WRITE",
              "principal": "SELF"
            }
          ],
          "required": true,
          "scope": "NONE",
          "title": "Name",
          "type": "string"
        }
      },
      "required": [
        "name"
      ],
      "type": "object"
    },
    "custom": {
      "id": "#custom",
      "properties": {
        "exampleCustomProperty": {
          "description": "exampleCustomProperty",
          "master": {
            "type": "PROFILE_MASTER"
          },
          "maxLength": 20,
          "minLength": 1,
          "mutability": "READ_WRITE",
          "permissions": [
            {
              "action": "READ_WRITE",
              "principal": "SELF"
            }
          ],
          "required": true,
          "scope": "NONE",
          "title": "exampleCustomProperty",
          "type": "string",
          "unique": "UNIQUE_VALIDATED"
        }
      },
      "required": [
        "exampleCustomProperty"
      ],
      "type": "object"
    }
  },
  "type": "object",
  "properties": {
    "profile": {
      "allOf": [
        {
          "$ref": "#/definitions/base"
        },
        {
          "$ref": "#/definitions/custom"
        }
      ]
    }
  },
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/meta/schemas/group/default",
      "method": "GET",
      "rel": "self"
    }
  }
}
```

### Schema properties

The Group Schema is a valid [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04) document with the following properties:

| Property    | Description                                                                              | DataType                                                           | Nullable | Unique | Readonly | Validation  |
|:------------|:-----------------------------------------------------------------------------------------|:-------------------------------------------------------------------|:---------|:-------|:---------|:------------|
| id          | URI of Group Schema                                                                      | String                                                             | FALSE    | TRUE   | TRUE     |             |
| $schema     | JSON Schema version identifier                                                           | String                                                             | FALSE    | FALSE  | TRUE     |             |
| name        | Name for the Schema                                                                      | String                                                             | FALSE    | TRUE   | TRUE     |             |
| description | Description for the Schema                                                               | String                                                             | FALSE    | FALSE  | TRUE     |             |
| title       | User-defined display name for the Schema                                                 | String                                                             | FALSE    | FALSE  | TRUE     |             |
| created     | Timestamp when the Schema was created                                                    | [ISO 8601 String](https://tools.ietf.org/html/rfc3339)             | FALSE    | FALSE  | TRUE     |             |
| lastUpdated | Timestamp when the Schema was last updated                                               | [ISO 8601 String](https://tools.ietf.org/html/rfc3339)             | FALSE    | FALSE  | TRUE     |             |
| definitions | Group Profile subschemas                                                                 | [Group Profile Subschemas](#group-profile-subschemas)           | FALSE    | FALSE  | FALSE    | JSON Schema |
| type        | Type of [root Schema](https://tools.ietf.org/html/draft-zyp-json-schema-04#section-3.4)  | String                                                             | FALSE    | FALSE  | TRUE     |             |
| properties  | Group object properties                                                                  | [Group object](/docs/reference/api/groups/#group-object) property set | FALSE    | FALSE  | TRUE     |             |

### Group Profile subschemas

The [Profile object](/docs/reference/api/groups/#profile-object) for a Group is defined by a composite schema of base and custom properties using a JSON path to reference subschemas. The `#base` properties are defined and versioned by Okta while `#custom` properties are extensible.

- [Group Profile base subschema](#group-profile-base-subschema)
- [Group Profile custom subschema](#group-profile-custom-subschema)

Custom property names for the [Profile object](/docs/reference/api/groups/#profile-object) must be unique and can't conflict with a property name defined in the `#base` subschema.

```json
{
  "definitions": {
    "base": {
      "id": "#base",
      "properties": {
        "description": {
          "description": "Description",
          "master": {
            "type": "PROFILE_MASTER"
          },
          "maxLength": 1024,
          "mutability": "READ_WRITE",
          "permissions": [
            {
              "action": "READ_WRITE",
              "principal": "SELF"
            }
          ],
          "scope": "NONE",
          "title": "Description",
          "type": "string"
        },
        "name": {
          "description": "Name",
          "master": {
            "type": "PROFILE_MASTER"
          },
          "maxLength": 255,
          "mutability": "READ_WRITE",
          "permissions": [
            {
              "action": "READ_WRITE",
              "principal": "SELF"
            }
          ],
          "required": true,
          "scope": "NONE",
          "title": "Name",
          "type": "string"
        }
      },
      "required": [
        "name"
      ],
      "type": "object"
    },
    "custom": {
      "id": "#custom",
      "properties": {
        "exampleCustomProperty": {
          "description": "exampleCustomProperty",
          "master": {
            "type": "PROFILE_MASTER"
          },
          "maxLength": 20,
          "minLength": 1,
          "mutability": "READ_WRITE",
          "permissions": [
            {
              "action": "READ_WRITE",
              "principal": "SELF"
            }
          ],
          "required": true,
          "scope": "NONE",
          "title": "exampleCustomProperty",
          "type": "string",
          "unique": "UNIQUE_VALIDATED"
        }
      },
      "required": [
        "exampleCustomProperty"
      ],
      "type": "object"
    }
  }
}
```

#### Group Profile base subschema

All Okta-defined Profile properties are defined in a Profile subschema with the resolution scope `#base`. These properties can't be removed or edited, regardless of any attempt to do so.

The base Group Profile properties are as follows:

| Property          | Description                                                                                                                  | DataType | Nullable | Unique | Readonly | MinLength | MaxLength |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | ------ | -------- | --------- | --------- |
| name              | Unique identifier for the Group                                                                                              | String   | FALSE    | TRUE   | FALSE    |           | 1024      |
| description       | Human readable description of the Group                                                                                      | String   | TRUE     | FALSE  | FALSE    |           | 1024      |

#### Group Profile custom subschema

All custom Profile properties are defined in a Profile subschema with the resolution scope `#custom`.

```json
{
  "definitions": {
    "custom": {
        "id": "#custom",
        "type": "object",
        "properties": {
            "customPropertyName": {
                "title": "Title of custom property",
                "description": "Description of custom property",
                "type": "string"
            }
        },
        "required": []
    }
  }
}
```

#### Group Profile Schema Property object

Group Profile schema properties have the following standard [JSON Schema Draft 6](https://tools.ietf.org/html/draft-wright-json-schema-validation-01) properties:

| Property                       | Description                                | DataType                                          | Nullable | Unique | Readonly |
|:-------------------------------|:-------------------------------------------|:--------------------------------------------------|:---------|:-------|:---------|
| title                          | User-defined display name for the property | String                                            | FALSE    | FALSE  | FALSE    |
| description                    | Description of the property                | String                                            | TRUE     | FALSE  | FALSE    |
| type                           | Type of property                           | `string`, `boolean`, `number`, `integer`, `array` | FALSE    | FALSE  | FALSE    |
| enum                           | Enumerated value of the property           | Array                                             | TRUE     | TRUE   | FALSE    |
| oneOf                          | Non-empty array of valid JSON schemas      | Array                                             | TRUE     | TRUE   | FALSE    |

##### Description Details

- `enum`: The value of the property is limited to one of the values specified in the `enum` definition. The list of values for `enum` must contain unique elements.

- `oneOf`: Okta only supports `oneOf` for specifying display names for an `enum`. Each schema has the following format:

 ```json
{
  "const": "enumValue",
  "title": "display name"
}
 ```

In case `enum` is used in conjunction with `oneOf`, the set of enumerated values and their order must be kept.

```json
{"enum": ["S","M","L","XL"],
  "oneOf": [
    {"const": "S", "title": "Small"},
    {"const": "M", "title": "Medium"},
    {"const": "L", "title": "Large"},
    {"const": "XL", "title": "Extra Large"}
  ]
}
 ```

`oneOf` is only supported in conjunction with `enum`, providing a mechanism to return a display name for the `enum` value.

Okta has also extended [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04) with the following keywords:

| Property                       | Description                                                                      | DataType                    | Nullable | Unique | Readonly |
| :----------------------------- | :------------------------------------------------------------------------------- | :-------------------------- | :------- | :----- | :------- |
| required                       | Determines whether the property is required                                      | Boolean                     | FALSE    | FALSE  | FALSE    |
| [unique](#unique-attributes)    | Determines whether property values must be unique                                | Boolean                     | FALSE    | FALSE  | FALSE    |
| scope                          | Determines whether a group attribute can be set at the individual or group level | `SELF`, `NONE`              | FALSE    | FALSE  | TRUE     |

> **Note:** A read-only [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04) compliant `required` property is also available on [Group Profile subschemas](#group-profile-subschemas).

```json
{
  "twitterUserName": {
    "title": "Twitter username",
    "description": "User's username for twitter.com",
    "type": "string",
    "required": false,
    "scope": "NONE",
    "minLength": 1,
    "maxLength": 20
  }
}
```

##### Group Schema property types and validation

Specific property types support a subset of [JSON Schema validations](https://tools.ietf.org/html/draft-fge-json-schema-validation-00).

| Property Type | Description                                                                                                                         | Validation Keywords         |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------------- | :--------------------------- |
| `string`      | [JSON String](https://tools.ietf.org/html/rfc7159#section-7)                                                                        | `minLength` and `maxLength` |
| `boolean`     | `false`, `true`, or `null`                                                                                                          |                             |
| `number`      | [JSON Number](https://tools.ietf.org/html/rfc7159#section-6) with double-precision 64-bit IEEE 754 floating point number constraint | `minimum` and `maximum`     |
| `integer`     | [JSON Number](https://tools.ietf.org/html/rfc7159#section-6) with 32-bit signed two's complement integer constraint           | `minimum` and `maximum`     |
| `array`       | [JSON Array](https://tools.ietf.org/html/rfc7159#section-5)                                                                         |                             |

## Unique attributes

You can enforce uniqueness for custom properties in Okta user profiles or the Okta group profile, such as an employee identification number. You can declare a maximum of five unique properties for each user type and five unique properties in the Okta group profile. Different user types can have the same or different unique properties (up to the limit of five per type).

Unique properties in Okta user profiles share a single namespace across all [user types](/docs/reference/api/user-types) in an org. If user types A and B both contain the property `ice cream` and you identify it as unique in both profiles, then if a user of type A has the value `chocolate`, no other users of type A or B (or any other user type that declares `ice cream` as unique) can have that value.

Properties that aren't unique also aren't tracked for uniqueness. Suppose the property `candy` is unique in type E and not unique in type F. If a user of type E has the value `caramel` for the `candy` property, no other users of type E can also have the value `caramel`, but any number of users of type F can already have or later be assigned the value `caramel`. Furthermore, because `candy` is not unique in type F, any values users of type F may have are not considered when enforcing uniqueness for users of type E. No matter how many users of type F already have the value `cotton`, it may be assigned to a user of type E as long as no other such user already has that value.

If you attempt to create or update a user with a duplicate value for a custom user property with a uniqueness restriction, the user creation or update operation fails. The user isn't created or updated until you enter a unique value. Similarly, creating or updating a group fails when the request contains a value for a unique custom group property that is duplicated by another group.

`null` values don't enter into the uniqueness calculation. If the unique property isn't also specified as being required, you can also omit the value entirely. Multiple users or groups can omit the property and not violate uniqueness.

To enforce uniqueness for custom properties, you can either add new unique custom properties or update existing custom properties to be unique.

### Add new unique custom property

You can use the [add property to user profile schema](#add-property-to-user-profile-schema) request or the [add property to group profile schema](#add-property-to-group-profile-schema) request to add one or more unique custom user or group properties. Specify `"unique": true` on the properties to be marked as unique. The response shows the properties with `"unique": "UNIQUE_VALIDATED"` and uniqueness is then enforced on those properties.

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "definitions": {
    "custom": {
      "id": "#custom",
      "type": "object",
      "properties": {
        "twitterUserName": {
          "title": "Twitter username",
          "description": "Twitter Username",
          "type": "string",
          "required": false,
          "unique": true,
          "minLength": 1,
          "maxLength": 20,
          "permissions": [
            {
              "principal": "SELF",
              "action": "READ_WRITE"
            }
          ]
        }
      },
      "required": []
    }
  }
}' "https://${yourOktaDomain}/api/v1/meta/schemas/user/default"
```

##### Response example

The following response is only a subset of properties for brevity.

```json
{
    "id": "https://{yourOktaDomain}/meta/schemas/user/default",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "name": "user",
    "title": "Default Okta User",
    "lastUpdated": "2015-09-05T10:40:45.000Z",
    "created": "2015-02-02T10:27:36.000Z",
    "definitions": {
        "base": {
            "id": "#base",
            "type": "object",
            "properties": {
                "login": {
                    "title": "Username",
                    "type": "string",
                    "required": true,
                    "minLength": 5,
                    "maxLength": 100,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                },
                "firstName": {
                    "title": "First name",
                    "type": "string",
                    "required": true,
                    "minLength": 1,
                    "maxLength": 50,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                },
                "lastName": {
                    "title": "Last name",
                    "type": "string",
                    "required": true,
                    "minLength": 1,
                    "maxLength": 50,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                },
                "email": {
                    "title": "Primary email",
                    "type": "string",
                    "required": true,
                    "format": "email",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                }
            },
            "required": [
                "login",
                "firstName",
                "lastName",
                "email"
            ]
        },
        "custom": {
            "id": "#custom",
            "type": "object",
            "properties": {
              "twitterUserName": {
                  "title": "Twitter username",
                  "description": "User's username for twitter.com",
                  "type": "string",
                  "required": false,
                  "unique": "UNIQUE_VALIDATED",
                  "minLength": 1,
                  "maxLength": 20,
                  "permissions": [
                      {
                          "principal": "SELF",
                          "action": "READ_WRITE"
                      }
                  ]
              }
            },
            "required": []
        }
    },
    "type": "object",
    "properties": {
        "profile": {
            "allOf": [
                {
                    "$ref": "#/definitions/base"
                },
                {
                    "$ref": "#/definitions/custom"
                }
            ]
        }
    }
}
```

### Update existing custom property to be unique

You can use the [update user profile schema property](#update-user-profile-schema-property) request or the [update group profile schema property](#update-group-profile-schema-property) request to mark existing custom user or group properties as unique by specifying `"unique": true` on the properties to be marked as unique.

After the request to mark existing custom properties as unique is submitted, an asynchronous validation check is performed to make sure that there are no existing duplicate entries. If you have a significant number of users or groups, the validation can take some time.

A uniqueness status of `"unique": "PENDING_UNIQUENESS"` indicates that the validation check is still in progress. Use the Universal Directory page in the Admin Console (**Directory** > **Directory Integrations**) to track the status of the validation check. After the validation completes, if you submit a [get user schema](#get-user-schema) request or a [get group schema](#get-group-schema) request, the property's uniqueness status changes to `UNIQUE_VALIDATED` if no duplicate records are found, and uniqueness is then enforced on that property. Otherwise, if duplicate records are found, the `unique` attribute of the schema property isn't shown in the get schema request and uniqueness isn't enforced on the schema property.

##### Request example

For the following request example, assume that the default user profile schema contains the custom property `twitterUserName` that isn't unique.

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "definitions": {
    "base": {
      "id": "#base",
      "type": "object",
      "properties": {
        "firstName": {
        "title": "First name",
        "type": "string",
        "required": false,
        "mutability": "READ_WRITE",
        "scope": "NONE",
        "permissions": [
          {
            "principal": "SELF",
            "action": "READ_ONLY"
          }
        ]
      }
    },
    "required": []
  },
    "custom": {
      "id": "#custom",
      "type": "object",
      "properties": {
        "twitterUserName": {
          "title": "Twitter username",
          "description": "User'\''s username for twitter.com",
          "type": "string",
          "required": false,
          "unique": true,
          "minLength": 1,
          "maxLength": 10,
          "permissions": [
            {
              "principal": "SELF",
              "action": "READ_ONLY"
            }
          ]
        }
      },
      "required": []
    }
  }
}' "https://${yourOktaDomain}/api/v1/meta/schemas/user/default"
```

##### Response example

The following response is only a subset of properties for brevity.

```json
{
    "id": "https://{yourOktaDomain}/meta/schemas/user/default",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "name": "user",
    "title": "Default Okta User",
    "lastUpdated": "2015-09-05T10:40:45.000Z",
    "created": "2015-02-02T10:27:36.000Z",
    "definitions": {
        "base": {
            "id": "#base",
            "type": "object",
            "properties": {
                "login": {
                    "title": "Username",
                    "type": "string",
                    "required": true,
                    "minLength": 5,
                    "maxLength": 100,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                },
                "firstName": {
                    "title": "First name",
                    "type": "string",
                    "required": true,
                    "minLength": 1,
                    "maxLength": 50,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                },
                "lastName": {
                    "title": "Last name",
                    "type": "string",
                    "required": true,
                    "minLength": 1,
                    "maxLength": 50,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                },
                "email": {
                    "title": "Primary email",
                    "type": "string",
                    "required": true,
                    "format": "email",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                }
            },
            "required": [
                "login",
                "firstName",
                "lastName",
                "email"
            ]
        },
        "custom": {
            "id": "#custom",
            "type": "object",
            "properties": {
              "twitterUserName": {
                  "title": "Twitter username",
                  "description": "User's username for twitter.com",
                  "type": "string",
                  "required": false,
                  "unique": "PENDING_UNIQUENESS",
                  "minLength": 1,
                  "maxLength": 10,
                  "permissions": [
                      {
                          "principal": "SELF",
                          "action": "READ_ONLY"
                      }
                  ]
              }
            },
            "required": []
        }
    },
    "type": "object",
    "properties": {
        "profile": {
            "allOf": [
                {
                    "$ref": "#/definitions/base"
                },
                {
                    "$ref": "#/definitions/custom"
                }
            ]
        }
    }
}
```

### Update existing unique custom property to be non-unique

You can use the [update user profile schema property](#update-user-profile-schema-property) request or the [update group profile schema property](#update-group-profile-schema-property) request to change existing unique custom user or group properties to be non-unique by specifying `"unique": false` on the properties to be changed to non-unique. The response shows the properties without the `unique` attribute and the uniqueness constraint is then removed on those properties.

Note that if multiple user types declare a property as unique and you remove the uniqueness constraint on one type, there may be a delay before users of other types that declare the property as unique can be assigned values formerly held by users of the first type.

##### Request example

For the following request example, assume that the default user profile schema contains the custom property `twitterUserName` that is unique.

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "definitions": {
    "base": {
      "id": "#base",
      "type": "object",
      "properties": {
        "firstName": {
        "title": "First name",
        "type": "string",
        "required": false,
        "mutability": "READ_WRITE",
        "scope": "NONE",
        "permissions": [
          {
            "principal": "SELF",
            "action": "READ_ONLY"
          }
        ]
      }
    },
    "required": []
  },
    "custom": {
      "id": "#custom",
      "type": "object",
      "properties": {
        "twitterUserName": {
          "title": "Twitter username",
          "description": "User'\''s username for twitter.com",
          "type": "string",
          "required": false,
          "unique": false,
          "minLength": 1,
          "maxLength": 10,
          "permissions": [
            {
              "principal": "SELF",
              "action": "READ_ONLY"
            }
          ]
        }
      },
      "required": []
    }
  }
}' "https://${yourOktaDomain}/api/v1/meta/schemas/user/default"
```

##### Response example

The following response is only a subset of properties for brevity.

```json
{
    "id": "https://{yourOktaDomain}/meta/schemas/user/default",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "name": "user",
    "title": "Default Okta User",
    "lastUpdated": "2015-09-05T10:40:45.000Z",
    "created": "2015-02-02T10:27:36.000Z",
    "definitions": {
        "base": {
            "id": "#base",
            "type": "object",
            "properties": {
                "login": {
                    "title": "Username",
                    "type": "string",
                    "required": true,
                    "minLength": 5,
                    "maxLength": 100,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                },
                "firstName": {
                    "title": "First name",
                    "type": "string",
                    "required": true,
                    "minLength": 1,
                    "maxLength": 50,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                },
                "lastName": {
                    "title": "Last name",
                    "type": "string",
                    "required": true,
                    "minLength": 1,
                    "maxLength": 50,
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                },
                "email": {
                    "title": "Primary email",
                    "type": "string",
                    "required": true,
                    "format": "email",
                    "permissions": [
                        {
                            "principal": "SELF",
                            "action": "READ_WRITE"
                        }
                    ]
                }
            },
            "required": [
                "login",
                "firstName",
                "lastName",
                "email"
            ]
        },
        "custom": {
            "id": "#custom",
            "type": "object",
            "properties": {
              "twitterUserName": {
                  "title": "Twitter username",
                  "description": "User's username for twitter.com",
                  "type": "string",
                  "required": false,
                  "minLength": 1,
                  "maxLength": 10,
                  "permissions": [
                      {
                          "principal": "SELF",
                          "action": "READ_ONLY"
                      }
                  ]
              }
            },
            "required": []
        }
    },
    "type": "object",
    "properties": {
        "profile": {
            "allOf": [
                {
                    "$ref": "#/definitions/base"
                },
                {
                    "$ref": "#/definitions/custom"
                }
            ]
        }
    }
}
```

## Log Stream Schema object

The Log Stream Schema is defined using [JSON Schema Draft 2020-12](https://json-schema.org/specification.html) with the following properties:

| Property                       | Description                                | DataType                                          | Nullable | Unique | Readonly |
|:-------------------------------|:-------------------------------------------|:--------------------------------------------------|:---------|:-------|:---------|
| $id | URI of Log Stream Schema |String |FALSE| TRUE| TRUE|
|$schema| JSON Schema version identifier| String| FALSE| FALSE| TRUE|
|title| Name of the Log Streaming integration| String|FALSE| TRUE| TRUE|
|type| Type of Log Stream Schema property|String containing `string`, `boolean`, `number`, `integer` or `object` |FALSE|FALSE|TRUE|
|properties|Log Stream Schema properties object (see [`properties` description](#log-stream-schema-object-description-details))| Object |FALSE|TRUE|TRUE|
|required| Required properties for this Log Stream Schema object|Array of String|FALSE|TRUE|TRUE|
|oneOf|A non-empty array of valid JSON schemas (see [oneOf description](#log-stream-schema-object-description-details)) |Array|TRUE|FALSE|TRUE|
|pattern|For `string` Log Stream Schema property type, specify the regular expression used to validate the property (see [Log Stream Schema Property Types and validation](#log-stream-schema-property-types-and-validation)). |String|TRUE|FALSE|TRUE|

In addition to those, Okta extends [JSON Schema Draft 2020-12](https://json-schema.org/specification.html)
with the following keywords:

| Property                            | Description                                                       | DataType                                                                  | Nullable | Unique | Readonly |
| :---------------------------------- | :---------------------------------------------------------------- | :------------------------------------------------------------------------ | :------- | :----- | :------- |
| writeOnce|Determines whether the property can be updated once it has been created|Boolean|FALSE|FALSE|TRUE|
| writeOnly|Determines whether the property is returned by Okta to protect sensitive data|Boolean|FALSE|FALSE|TRUE|
| errorMessage|Error messages for properties of this Log Stream object|[Error Message object](#error-message-object)|FALSE|TRUE|TRUE|

#### Log Stream Schema object description details

- All Log Stream Schema root object `properties` contain `name` and `settings`:
  - `name` &mdash; specifies the Log Stream name within Okta
  - `settings` &mdash; lists properties required to configure Log Stream
- `properties` object within the `settings` defines configuration properties for the particular Log Stream type
- `oneOf`: Okta only supports `oneOf` for specifying display names for an `enum`. Each schema has the following format:

 ```json
{
  "const": "enumValue",
  "title": "display name"
}
 ```

- `errorMessage`: Okta implements a subset of [ajv-errors](https://github.com/ajv-validator/ajv-errors), and the error object has the following property:

##### Error Message object

| Property                            | Description                                                       | DataType                                                                  | Nullable | Unique | Readonly |
| :---------------------------------- | :--------------------------------------- | :------------------------------------------------------------------------ | :------- | :----- | :------- |
| properties| Error messages for individual properties in the schema | Map of <String, String> | TRUE | FALSE | TRUE |

Within the properties map, the keys are the property names, while the values are the error messages if validation fails on these properties.

##### Log Stream Schema Property Types and validation

Specific property types support a subset of [JSON Schema validations](https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-00).

| Property Type| Description | Validation Keywords |
| :------------------------- | :------------- | :-------------------------- |
| string | JSON String | pattern|
