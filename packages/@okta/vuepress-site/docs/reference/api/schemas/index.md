---
title: Schemas
category: management
excerpt: The Schemas API defines custom user profiles for Okta users and applications.
---

# Schemas API

Okta's [Universal Directory](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_About_Universal_Directory) allows administrators to define custom User profiles for Okta Users and Applications. Okta has adopted a subset of [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04) as the schema language to describe and validate extensible User profiles. [JSON Schema](http://json-schema.org/) is a lightweight declarative format for describing the structure, constraints, and validation of JSON documents.

> **Note:** Okta has implemented only a subset of [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04). This document should describe which parts are applicable to Okta and any extensions Okta has made to [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04).

## Getting started

Explore the Schemas API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/443242e60287fb4b8d6d)

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
    "id": "https://${yourOktaDomain}/meta/schemas/user/default",
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
    "id": "https://${yourOktaDomain}/meta/schemas/user/default",
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
    "id": "https://${yourOktaDomain}/meta/schemas/user/default",
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
    "id": "https://${yourOktaDomain}/meta/schemas/user/default",
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
"https://${yourOktaDomain}/api/v1/meta/schemas/apps/{instanceId}/default"
```

##### Response example

```json
{
  "id": "https://${yourOktaDomain}/meta/schemas/apps/0oa25gejWwdXNnFH90g4/default",
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
}' "https://${yourOktaDomain}/api/v1/meta/schemas/apps/{instanceId}/default"
```

##### Response example


```json
{
  "id": "https://${yourOktaDomain}/meta/schemas/apps/0oa25gejWwdXNnFH90g4/default",
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
}' "https://${yourOktaDomain}/api/v1/meta/schemas/apps/{instanceId}/default"
```

##### Response example


```json
{
  "id": "https://${yourOktaDomain}/meta/schemas/apps/0oa25gejWwdXNnFH90g4/default",
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
}' "https://${yourOktaDomain}/api/v1/meta/schemas/apps/{instanceId}/default"
```

##### Response example


```json
{
  "id": "https://${yourOktaDomain}/meta/schemas/apps/0oa25gejWwdXNnFH90g4/default",
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

## User Schema object

The [User object](/docs/reference/api/users/#user-object) schema is defined using [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04).

> **Note:** The Schema currently only defines the [Profile object](/docs/reference/api/users/#profile-object).

### Example User Schema

```json
{
    "id": "https://${yourOktaDomain}/meta/schemas/user/default",
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
| name        | name for the Schema                                                                      | String                                                  | FALSE    | TRUE   | TRUE     |             |
| title       | User-defined display name for the Schema                                                 | String                                                  | FALSE    | FALSE  | FALSE    |             |
| created     | timestamp when Schema was created                                                        | [ISO 8601 String](https://tools.ietf.org/html/rfc3339) | FALSE    | FALSE  | TRUE     |             |
| lastUpdated | timestamp when Schema was last updated                                                   | [ISO 8601 String](https://tools.ietf.org/html/rfc3339) | FALSE    | FALSE  | TRUE     |             |
| definitions | User Profile subschemas                                                                  | [User Profile Subschemas](#user-profile-subschemas)    | FALSE    | FALSE  | FALSE    | JSON Schema |
| type        | type of [root Schema](https://tools.ietf.org/html/draft-zyp-json-schema-04#section-3.4) | String                                                  | FALSE    | FALSE  | TRUE     |             |
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
| login             | unique identifier for the User (`username`)                                                                                        | String   | FALSE    | TRUE   | FALSE    | 5         | 100       | [pattern](#login-pattern-validation)                                            |
| email             | primary email address of the User                                                                                                      | String   | FALSE    | TRUE   | FALSE    | 5         | 100       | [RFC 5322 Section 3.2.3](http://tools.ietf.org/html/rfc5322#section-3.2.3)                                        |
| secondEmail       | secondary email address of the User typically used for account recovery                                                                | String   | TRUE     | TRUE   | FALSE    | 5         | 100       | [RFC 5322 Section 3.2.3](http://tools.ietf.org/html/rfc5322#section-3.2.3)                                        |
| firstName         | given name of the User (`givenName`)                                                                                               | String   | FALSE (default)    | FALSE  | FALSE    | 1         | 50        |                                                                                                                   |
| lastName          | family name of the User (`familyName`)                                                                                             | String   | FALSE (default)    | FALSE  | FALSE    | 1         | 50        |                                                                                                                   |
| middleName        | middle name(s) of the User                                                                                                         | String   | FALSE    | FALSE  | FALSE    |           |           |                                                                                                                   |
| honorificPrefix   | honorific prefix(es) of the User or title in most Western languages                                                               | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| honorificSuffix   | honorific suffix(es) of the User                                                                                                   | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| title             | User's title, such as "Vice President"                                                                                       | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| displayName       | name of the User, suitable for display to end Users                                                                                | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| nickName          | casual way to address the User in real life                                                                                        | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| profileUrl        | URL of the User's online Profile (for example: a web page)                                                                               | String   | TRUE     | FALSE  | FALSE    |           |           | [Relative Uniform Resource Locators specification](https://tools.ietf.org/html/rfc1808)                                                                        |
| primaryPhone      | primary phone number of the User, such as home number                                                                                   | String   | TRUE     | FALSE  | FALSE    | 0         | 100       |                                                                                                                   |
| mobilePhone       | mobile phone number of the User                                                                                                        | String   | TRUE     | FALSE  | FALSE    | 0         | 100       |                                                                                                                   |
| streetAddress     | full street address component of the User's address                                                                              | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| city              | city or locality component of the User's address (`locality`)                                                                    | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| state             | state or region component of the User's address (`region`)                                                                       | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| zipCode           | zip code or postal code component of the User's address (`postalCode`)                                                            | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| countryCode       | country name component of the User's address (`country`)                                                                         | String   | TRUE     | FALSE  | FALSE    |           |           | [ISO 3166-1 alpha 2 "short" code format](https://tools.ietf.org/html/draft-ietf-scim-core-schema-22#ref-ISO3166)  |
| postalAddress     | mailing address component of the User's address                                                                                  | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| preferredLanguage | User's preferred written or spoken languages                                                                                 | String   | TRUE     | FALSE  | FALSE    |           |           | [RFC 7231 Section 5.3.5](https://tools.ietf.org/html/rfc7231#section-5.3.5)                                       |
| locale            | User's default location for purposes of localizing items such as currency, date time format, numerical representations, and so on. | String   | TRUE     | FALSE  | FALSE    |           |           | See the Note after the table for more details.                                                                                        |
| timezone          | User's time zone                                                                                                             | String   | TRUE     | FALSE  | FALSE    |           |           | [IANA Time Zone database format](https://tools.ietf.org/html/rfc6557)                                             |
| userType          | used to describe the organization to the User relationship such as "Employee" or "Contractor"                                          | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| employeeNumber    | organization or company assigned unique identifier for the User                                                                    | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| costCenter        | name of a cost center assigned to the User                                                                                             | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| organization      | name of the User's organization                                                                                                  | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| division          | name of the User's division                                                                                                      | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| department        | name of the User's department                                                                                                    | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| managerId         | `id` of the User's manager                                                                                                     | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| manager           | displayName of the User's manager                                                                                            | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |

> **Note:** A locale value is a concatenation of the ISO 639-1 two letter language code, an underscore, and the ISO 3166-1 two letter country code. For example: 'en_US' specifies the language English and country US.

> **Note:** The `userType` field is an arbitrary string value and isn't related to the newer [User Types](/docs/reference/api/user-types) feature.

##### Login pattern validation

The `login` property is validated according to its `pattern` attribute, which is a string. By default, the attribute is null. When the attribute is null, the username is required to be formatted as an email address as defined by [RFC 6531 Section 3.3](http://tools.ietf.org/html/rfc6531#section-3.3). The pattern can be set through the API to one of the following forms. (The Admin Console provides access to the same forms.)

* A login pattern of `".+"` indicates that there is no restriction on usernames. Any non-empty, unique value is permitted, and the minimum length of five isn't enforced. In this case, usernames don't need to include the `@` character. If a name does include `@`, the portion ahead of the `@` can be used for logging in, provided it identifies a unique User within the org.

* A login pattern of the form `"[...]+"` indicates that usernames must only contain characters from the set given between the brackets. The enclosing brackets and final `+` are required for this form. Character ranges can be indicated using hyphens. To include the hyphen itself in the allowed set, the hyphen must appear first. Any characters in the set except the hyphen, a-z, A-Z, and 0-9 must be preceded by a backslash (`\`). For example, `"[a-z13579\.]+"` would restrict usernames to lowercase letters, odd digits, and periods, while `"[-a-zA-Z0-9]+"` would allow basic alphanumeric characters and hyphens.

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
| description                    | description of the property                | String                                            | TRUE     | FALSE  | FALSE    |
| type                           | type of property                           | `string`, `boolean`, `number`, `integer`, `array` | FALSE    | TRUE   | TRUE     |
| enum                           | enumerated value of the property           | array                                             | TRUE     | TRUE   | FALSE    |
| oneOf                          | non-empty array of valid JSON schemas      | array                                             | TRUE     | TRUE   | FALSE    |


##### Description details

* `enum`: The value of the property is limited to one of the values specified in the `enum` definition. The list of values for the `enum` must be made up of unique elements.

* `oneOf`: Okta only supports `oneOf` for specifying display names for an `enum`. Each schema has the following format:

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

| Property      | Description                                     | DataType                                                                  | Nullable | Unique | Readonly |
| :------------- | :----------------------------------------------- | :------------------------------------------------------------------------- | :--------- | :------ | :-------- |
| required      | determines whether the property is required     | Boolean                                                                   | FALSE    | FALSE  | FALSE    |
| permissions   | access control permissions for the property     | Array of [Schema property permission](#schema-property-permission-object) | FALSE    | FALSE  | FALSE    |

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
| principal | security principal                                               | `SELF` (end user)                                                  | FALSE    | TRUE   | FALSE    |
| action    | determines whether the principal can view or modify the property | `HIDE`, `READ_ONLY`, `READ_WRITE`                                  | FALSE    | FALSE  | FALSE    |


## App User Schema object

The [App User object](/docs/reference/api/apps/#application-user-object) Schema is defined using [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04).

> **Note:** The schema currently only defines the [Profile object](/docs/reference/api/apps/#application-user-profile-object).

### Example App User Schema

```json
{
  "id": "https://${yourOktaDomain}/meta/schemas/apps/0oa25gejWwdXNnFH90g4/default",
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
| name        | name for the Schema                                                                      | String                                                             | FALSE    | TRUE   | TRUE     |             |
| title       | User-defined display name for the Schema                                                 | String                                                             | FALSE    | FALSE  | FALSE    |             |
| created     | timestamp when the Schema was created                                                        | [ISO 8601 String](https://tools.ietf.org/html/rfc3339)            | FALSE    | FALSE  | TRUE     |             |
| lastUpdated | timestamp when the Schema was last updated                                                   | [ISO 8601 String](https://tools.ietf.org/html/rfc3339)            | FALSE    | FALSE  | TRUE     |             |
| definitions | App User Profile subschemas                                                              | [App User Profile Subschemas](#app-user-profile-subschemas)       | FALSE    | FALSE  | FALSE    | JSON Schema |
| type        | type of [root Schema](https://tools.ietf.org/html/draft-zyp-json-schema-04#section-3.4) | String                                                             | FALSE    | FALSE  | TRUE     |             |
| properties  | User object properties                                                                    | [App User object](/docs/reference/api/apps/#application-user-object) property set | FALSE    | FALSE  | TRUE     |             |

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
| userName          | unique identifier for the User                                                                                               | String   | FALSE    | TRUE   | FALSE    |           | 100       |

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
| title                          | user-defined display name for the property | String                                            | FALSE    | FALSE  | FALSE    |
| description                    | description of the property                | String                                            | TRUE     | FALSE  | FALSE    |
| type                           | type of property                           | `string`, `boolean`, `number`, `integer`, `array` | FALSE    | FALSE  | FALSE    |
| enum                           | enumerated value of the property           | array                                             | TRUE     | TRUE   | FALSE    |
| oneOf                          | non-empty array of valid JSON schemas      | array                                             | TRUE     | TRUE   | FALSE    |

##### Description Details

* `enum`: The value of the property is limited to one of the values specified in the `enum` definition.  The list of values for `enum` has to be made up of unique elements.

* `oneOf`: Okta only supports `oneOf` for specifying display names for an `enum`. Each schema has the following format:

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

| Property      | Description                                     | DataType                                                                  | Nullable | Unique | Readonly |
| :------------- | :----------------------------------------------- | :------------------------------------------------------------------------- | :--------- | :------ | :-------- |
| required      | determines whether the property is required     | Boolean                                                                   | FALSE    | FALSE  | FALSE    |
| scope         | determines whether an appuser attribute can be set at the individual or group level | `SELF`, `NONE`                        | FALSE    | FALSE  | TRUE     |

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
