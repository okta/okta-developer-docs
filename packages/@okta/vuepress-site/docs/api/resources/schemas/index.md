---
title: Schemas
category: management
excerpt: The Schemas API defines custom user profiles for Okta users and applications.
---

# Schemas API

Okta's [Universal Directory](https://help.okta.com/en/prod/Content/Topics/Directory/About_Universal_Directory.htm) allows administrators to define custom user profiles for Okta users and applications.  Okta has adopted a subset [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04) as the schema language to describe and validate extensible user profiles. [JSON Schema](http://json-schema.org/) is a lightweight declarative format for describing the structure, constraints, and validation of JSON documents.

> Okta has only implemented a subset of [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04).  This document should describe which parts are applicable to Okta and any extensions Okta has made to [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04)

## Getting Started

Explore the Schemas API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/443242e60287fb4b8d6d)

## User Schema Operations

### Get User Schema


<ApiOperation method="get" url="/api/v1/meta/schemas/user/default" />

Fetches the default schema for a User

##### Request Parameters


N/A

##### Response Parameters


[User Schema](#user-schema-model)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/meta/schemas/user/default"
```

##### Response Example


*The following response is only a subset of properties for brevity*

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

### Add Property to User Profile Schema


<ApiOperation method="post" url="/api/v1/meta/schemas/user/default" />

Adds one or more [custom user profile properties](#user-profile-schema-property-object) to the user schema

##### Request Parameters


| Parameter   | Description                                          | Param Type | DataType                                                         | Required |
|:------------|:-----------------------------------------------------|:-----------|:-----------------------------------------------------------------|:---------|
| definitions | Subschema with one or more custom profile properties | Body       | [User Profile Custom Subschema](#user-profile-custom-subschema) | TRUE     |

##### Response Parameters


[User Schema](#user-schema-model)

##### Request Example


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
}' "https://{yourOktaDomain}/api/v1/meta/schemas/user/default"
```

##### Response Example


*The following response is only a subset of properties for brevity*

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

### Update User Profile Schema Property


<ApiOperation method="post" url="/api/v1/meta/schemas/user/default" />

Updates one or more [custom user profile properties](#user-profile-schema-property-object) in the schema, a [permission](#schema-property-permission-object) for a [user profile base property](#user-profile-base-subschema), or the nullability of the `firstName` and `lastName` properties in the [user profile base schema](#user-profile-base-subschema).

##### Request Parameters


| Parameter   | Description                                          | Param Type | DataType                                                         | Required |
|:------------|:-----------------------------------------------------|:-----------|:-----------------------------------------------------------------|:---------|
| definitions | Subschema with one or more custom profile properties | Body       | [User Profile Custom Subschema](#user-profile-custom-subschema) | TRUE     |

##### Response Parameters


[User Schema](#user-schema-model)

##### Request Example


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
}' "https://{yourOktaDomain}/api/v1/meta/schemas/user/default"
```

##### Response Example


*The following response is only a subset of properties for brevity*

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

### Remove Property from User Profile Schema


<ApiOperation method="post" url="/api/v1/meta/schemas/user/default" />

Removes one or more [custom user profile properties](#user-profile-schema-property-object) from the user schema.
A property cannot be removed if it is being referenced as a [matchAttribute](/docs/api/resources/idps/#subject-policy-object) in SAML2 IdPs.

##### Request Parameters


| Parameter   | Description                                                    | Param Type | DataType                                                         | Required |
|:------------|:---------------------------------------------------------------|:-----------|:-----------------------------------------------------------------|:---------|
| definitions | Subschema with one or more custom profile properties to remove | Body       | [User Profile Custom Subschema](#user-profile-custom-subschema) | TRUE     |

> Properties must be explicitly set to `null` to be removed from schema, otherwise the `POST` will be interpreted as a partial update.

##### Response Parameters


[User Schema](#user-schema-model)

##### Request Example


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
}' "https://{yourOktaDomain}/api/v1/meta/schemas/user/default"
```

##### Response Example


*The following response is only a subset of properties for brevity*

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

## App User Schema Operations

### Get App User Schema


<ApiOperation method="get" url="/api/v1/meta/schemas/apps/${instanceId}/default" />

Fetches the default schema for an App User

##### Request Parameters


| Parameter  | Description                       | Param Type | DataType | Required |
|:-----------|:----------------------------------|:-----------|:---------|:---------|
| instanceId | The id of the target app instance | Path       | String   | TRUE     |


##### Response Parameters


[App User Schema](#app-user-schema-model)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/meta/schemas/apps/{instanceId}/default"
```

##### Response Example


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

### Add Property to App User Profile Schema


<ApiOperation method="post" url="/api/v1/meta/schemas/apps/${instanceId}/default" />

Adds one or more [custom app user profile properties](#app-user-profile-schema-property-object) to the app user schema

##### Request Parameters


| Parameter   | Description                                          | Param Type | DataType                                                       | Required | Default |
| :----------- | :---------------------------------------------------- | :---------- | :-------------------------------------------------------------- | :-------- | :------- |
| instanceId  | The id of the target App Instance                    | Path       | String                                                         | TRUE     |        |
| definitions | Subschema with one or more custom profile properties | Body       | [App User Profile Custom Subschema](#app-user-profile-custom-subschema) | TRUE     |

##### Response Parameters


[App User Schema](#app-user-schema-model)

##### Request Example


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
}' "https://{yourOktaDomain}/api/v1/meta/schemas/apps/{instanceId}/default"
```

##### Response Example


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

### Update App User Profile Schema Property


<ApiOperation method="post" url="/api/v1/meta/schemas/apps/${instanceId}/default" />

Updates one or more [custom app user profile properties](#app-user-profile-schema-property-object) in the schema, or the nullability of a base property. Changing a base property's nullability (i.e., the value of its `required` field) is allowed only if it is nullable in the default predefined schema for the app.

##### Request Parameters


| Parameter   | Description                                          | Param Type | DataType                                                       | Required | Default |
| :----------- | :---------------------------------------------------- | :---------- | :-------------------------------------------------------------- | :-------- | :------- |
| instanceId  | The id of the target App Instance                    | Path       | String                                                         | TRUE     |        |
| definitions | Subschema with one or more custom profile properties | Body       | [App User Profile Custom Subschema](#app-user-profile-custom-subschema) | TRUE     |

##### Response Parameters


[App User Schema](#app-user-schema-model)

##### Request Example


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
}' "https://{yourOktaDomain}/api/v1/meta/schemas/apps/{instanceId}/default"
```

##### Response Example


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

### Remove Property from App User Profile Schema


<ApiOperation method="post" url="/api/v1/meta/schemas/apps/${instanceId}/default" />

Removes one or more [custom app user profile properties](#app-user-profile-schema-property-object) from the user schema.

##### Request Parameters


| Parameter   | Description                                                    | Param Type | DataType                                                       | Required | Default |
| :----------- | :-------------------------------------------------------------- | :---------- | :-------------------------------------------------------------- | :-------- | :------- |
| instanceId  | The id of the target App Instance                              | Path       | String                                                         | TRUE     |        |
| definitions | Subschema with one or more custom profile properties to remove | Body       | [App User Profile Custom Subschema](#app-user-profile-custom-subschema) | TRUE     |

> Properties must be explicitly set to `null` to be removed from schema, otherwise the `POST` will be interpreted as a partial update.

##### Response Parameters


[App User Schema](#app-user-schema-model)

##### Request Example


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
}' "https://{yourOktaDomain}/api/v1/meta/schemas/apps/{instanceId}/default"
```

##### Response Example


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

## User Schema Model

The [User Model](/docs/api/resources/users/#user-model) schema is defined using [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04).

> The schema currently only defines the [profile object](/docs/api/resources/users/#profile-object).

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

### Schema Properties

The user schema is a valid [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04) document with the following properties :

| Property    | Description                                                                              | DataType                                                | Nullable | Unique | Readonly | Validation  |
|:------------|:-----------------------------------------------------------------------------------------|:--------------------------------------------------------|:---------|:-------|:---------|:------------|
| id          | URI of user schema                                                                       | String                                                  | FALSE    | TRUE   | TRUE     |             |
| $schema     | JSON Schema version identifier                                                           | String                                                  | FALSE    | FALSE  | TRUE     |             |
| name        | name for the schema                                                                      | String                                                  | FALSE    | TRUE   | TRUE     |             |
| title       | user-defined display name for the schema                                                 | String                                                  | FALSE    | FALSE  | FALSE    |             |
| created     | timestamp when schema was created                                                        | [ISO 8601 String](https://tools.ietf.org/html/rfc3339) | FALSE    | FALSE  | TRUE     |             |
| lastUpdated | timestamp when schema was last updated                                                   | [ISO 8601 String](https://tools.ietf.org/html/rfc3339) | FALSE    | FALSE  | TRUE     |             |
| definitions | user profile subschemas                                                                  | [User Profile Subschemas](#user-profile-subschemas)    | FALSE    | FALSE  | FALSE    | JSON Schema |
| type        | type of [root schema](https://tools.ietf.org/html/draft-zyp-json-schema-04#section-3.4) | String                                                  | FALSE    | FALSE  | TRUE     |             |
| properties  | user model properties                                                                    | [User Model](/docs/api/resources/users/#user-model) property set     | FALSE    | FALSE  | TRUE     |             |

### User Profile Subschemas

The [profile object](/docs/api/resources/users/#profile-object) for a user is defined by a composite schema of base and custom properties using JSON Path to reference subschemas.  The `#base` properties are defined and versioned by Okta while `#custom` properties are extensible.

- [User Profile Base Subschema](#user-profile-base-subschema)
- [User Profile Custom Subschema](#user-profile-custom-subschema)

Custom property names for the [profile object](/docs/api/resources/users/#profile-object) must be unique and cannot conflict with a property name defined in the `#base` subschema.

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

#### User Profile Base Subschema

All Okta defined profile properties are defined in a profile sub-schema with the resolution scope `#base`.  These properties cannot be modified, except to update permissions, to change the nullability of `firstName` and `lastName`, or to specify a [pattern](#login-pattern-validation) for `login`.  They cannot be removed.

The base user profile is based on the [System for Cross-Domain Identity Management: Core Schema](https://tools.ietf.org/html/draft-ietf-scim-core-schema-22#section-4.1.1) and has following standard properties:

| Property          | Description                                                                                                                        | DataType | Nullable | Unique | Readonly | MinLength | MaxLength | Validation                                                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | ------ | -------- | --------- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| login             | unique identifier for the user (`username`)                                                                                        | String   | FALSE    | TRUE   | FALSE    | 5         | 100       | [pattern](#login-pattern-validation)                                            |
| email             | primary email address of user                                                                                                      | String   | FALSE    | TRUE   | FALSE    | 5         | 100       | [RFC 5322 Section 3.2.3](http://tools.ietf.org/html/rfc5322#section-3.2.3)                                        |
| secondEmail       | secondary email address of user typically used for account recovery                                                                | String   | TRUE     | TRUE   | FALSE    | 5         | 100       | [RFC 5322 Section 3.2.3](http://tools.ietf.org/html/rfc5322#section-3.2.3)                                        |
| firstName         | given name of the user (`givenName`)                                                                                               | String   | FALSE (default)    | FALSE  | FALSE    | 1         | 50        |                                                                                                                   |
| lastName          | family name of the user (`familyName`)                                                                                             | String   | FALSE (default)    | FALSE  | FALSE    | 1         | 50        |                                                                                                                   |
| middleName        | middle name(s) of the user                                                                                                         | String   | FALSE    | FALSE  | FALSE    |           |           |                                                                                                                   |
| honorificPrefix   | honorific prefix(es) of the user, or title in most Western languages                                                               | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| honorificSuffix   | honorific suffix(es) of the user                                                                                                   | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| title             | user's title, such as "Vice President"                                                                                       | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| displayName       | name of the user, suitable for display to end users                                                                                | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| nickName          | casual way to address the user in real life                                                                                        | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| profileUrl        | url of user's online profile (e.g. a web page)                                                                               | String   | TRUE     | FALSE  | FALSE    |           |           | [URL](https://tools.ietf.org/html/rfc1808)                                                                        |
| primaryPhone      | primary phone number of user such as home number                                                                                   | String   | TRUE     | FALSE  | FALSE    | 0         | 100       |                                                                                                                   |
| mobilePhone       | mobile phone number of user                                                                                                        | String   | TRUE     | FALSE  | FALSE    | 0         | 100       |                                                                                                                   |
| streetAddress     | full street address component of user's address                                                                              | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| city              | city or locality component of user's address (`locality`)                                                                    | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| state             | state or region component of user's address (`region`)                                                                       | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| zipCode           | zipcode or postal code component of user's address (`postalCode`)                                                            | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| countryCode       | country name component of user's address (`country`)                                                                         | String   | TRUE     | FALSE  | FALSE    |           |           | [ISO 3166-1 alpha 2 "short" code format](https://tools.ietf.org/html/draft-ietf-scim-core-schema-22#ref-ISO3166)  |
| postalAddress     | mailing address component of user's address                                                                                  | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| preferredLanguage | user's preferred written or spoken languages                                                                                 | String   | TRUE     | FALSE  | FALSE    |           |           | [RFC 7231 Section 5.3.5](https://tools.ietf.org/html/rfc7231#section-5.3.5)                                       |
| locale            | user's default location for purposes of localizing items such as currency, date time format, numerical representations, etc. | String   | TRUE     | FALSE  | FALSE    |           |           | See Note for more details.                                                                                        |
| timezone          | user's time zone                                                                                                             | String   | TRUE     | FALSE  | FALSE    |           |           | [IANA Time Zone database format](https://tools.ietf.org/html/rfc6557)                                             |
| userType          | used to identify the organization to user relationship such as "Employee" or "Contractor"                                          | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| employeeNumber    | organization or company assigned unique identifier for the user                                                                    | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| costCenter        | name of a cost center assigned to user                                                                                             | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| organization      | name of user's organization                                                                                                  | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| division          | name of user's division                                                                                                      | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| department        | name of user's department                                                                                                    | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| managerId         | `id` of a user's manager                                                                                                     | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |
| manager           | displayName of the user's manager                                                                                            | String   | TRUE     | FALSE  | FALSE    |           |           |                                                                                                                   |

> Note: A locale value is a concatenation of the ISO 639-1 two letter language code, an underscore, and the ISO 3166-1 2 letter country code; e.g., 'en_US' specifies the language English and country US.

##### Login Pattern Validation

The `login` property is validated according to its `pattern` attribute, which is a String.  By default the attribute is null, in which case the username is required to be formatted as an email address as defined by [RFC 6531 Section 3.3](http://tools.ietf.org/html/rfc6531#section-3.3).  The pattern can be set via the API to one of the following forms.  (The administrator UI provides access to the same forms.)

A login pattern of `".+"` indicates there is no restriction on usernames; any non-empty, unique value is permitted.  (The minimum length of 5 is not enforced.)  In this case, usernames do not need to include the `@` character.  If a name does include `@`, the portion ahead of the `@` can be used for logging in, provided it identifies a unique user within the org.

A login pattern of the form `"[...]+"` indicates usernames must only contain characters from the set given between the brackets.  The enclosing brackets and final `+` are required for this form.  Character ranges can be indicated using hyphens; to include hyphen itself in the allowed set, the hyphen must appear first.  Any characters in the set except hyphen, a-z, A-Z, and 0-9 must be preceded by a backslash (`\`).  For example, `"[a-z13579\.]+"` would restrict usernames to lowercase letters, odd digits, and periods, while `"[-a-zA-Z0-9]+"` would allow basic alphanumeric characters and hyphens.

#### User Profile Custom Subschema

All custom profile properties are defined in a profile sub-schema with the resolution scope `#custom`.

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

#### User Profile Schema Property Object

User profile schema properties have the following standard [JSON Schema Draft 6](https://tools.ietf.org/html/draft-wright-json-schema-validation-01) properties:

| Property                       | Description                                | DataType                                          | Nullable | Unique | Readonly |
|:-------------------------------|:-------------------------------------------|:--------------------------------------------------|:---------|:-------|:---------|
| title                          | user-defined display name for the property | String                                            | FALSE    | FALSE  | FALSE    |
| description                    | description of the property                | String                                            | TRUE     | FALSE  | FALSE    |
| type                           | type of property                           | `string`, `boolean`, `number`, `integer`, `array` | FALSE    | TRUE   | TRUE     |
| enum                           | enumerated value of the property           | array                                             | TRUE     | TRUE   | FALSE    |
| oneOf                          | non-empty array of valid JSON schemas      | array                                             | TRUE     | TRUE   | FALSE    |


##### Description Details

 * `enum`: The value of the property is limited to one of the values specified in the enum definition.
 The list of values for the enum has to be made up of unique elements.

 * `oneOf`: Okta only supports `oneOf` for specifying display names for an `enum`, each schema has the following format.  
 ```json
{
  "const": "enumValue",
  "title": "display name"
}
 ```
In case enum is used in conjunction with `oneOf`, the set of enumerated values and their order must be kept.
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
`oneOf` is only supported in conjunction with the `enum` providing a mechanism to return a display name for the enum value.


Okta has also extended [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04) with the following keywords:

| Property      | Description                                     | DataType                                                                  | Nullable | Unique | Readonly |
| :------------- | :----------------------------------------------- | :------------------------------------------------------------------------- | :--------- | :------ | :-------- |
| required      | determines whether the property is required     | Boolean                                                                   | FALSE    | FALSE  | FALSE    |
| permissions   | access control permissions for the property     | Array of [Schema Property Permission](#schema-property-permission-object) | FALSE    | FALSE  | FALSE    |

> A read-only [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04) compliant `required` property is also available on the [User Profile Subschemas](#user-profile-subschemas)

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

##### User Schema Property Types and Validation

Specific property types support a **subset** of [JSON Schema validations](https://tools.ietf.org/html/draft-fge-json-schema-validation-00)

| Property Type | Description                                                                                                                         | Validation Keywords         |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------------- | :--------------------------- |
| `string`      | [JSON String](https://tools.ietf.org/html/rfc7159#section-7)                                                                        | `minLength` and `maxLength` |
| `boolean`     | `false`, `true`, or `null`                                                                                                          |                             |
| `number`      | [JSON Number](https://tools.ietf.org/html/rfc7159#section-6) with double-precision 64-bit IEEE 754 floating point number constraint | `minimum` and `maximum`     |
| `integer`     | [JSON Number](https://tools.ietf.org/html/rfc7159#section-6) with 32-bit signed two's complement integer constraint           | `minimum` and `maximum`     |
| `array`       | [JSON Array](https://tools.ietf.org/html/rfc7159#section-5)                                                                         |                             |


#### Schema Property Permission Object

A given schema property can be assigned a permission for a principal that restricts access to the property.

| Property  | Description                                                      | DataType                                                           | Nullable | Unique | Readonly |
| :----------| :---------------------------------------------------------------- | :------------------------------------------------------------------ |:--------- | :------ | :-------- |
| principal | security principal                                               | `SELF` (end user)                                                  | FALSE    | TRUE   | FALSE    |
| action    | determines whether the principal can view or modify the property | `HIDE`, `READ_ONLY`, `READ_WRITE`                                  | FALSE    | FALSE  | FALSE    |


## App User Schema Model

The [App User Model](/docs/api/resources/apps/#application-user-model) schema is defined using [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04).

> The schema currently only defines the [profile object](/docs/api/resources/apps/#application-user-profile-object).

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

### Schema Properties

The app user schema is a valid [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04) document with the following properties :

| Property    | Description                                                                              | DataType                                                           | Nullable | Unique | Readonly | Validation  |
|:------------|:-----------------------------------------------------------------------------------------|:-------------------------------------------------------------------|:---------|:-------|:---------|:------------|
| id          | URI of app user schema                                                                   | String                                                             | FALSE    | TRUE   | TRUE     |             |
| $schema     | JSON Schema version identifier                                                           | String                                                             | FALSE    | FALSE  | TRUE     |             |
| name        | name for the schema                                                                      | String                                                             | FALSE    | TRUE   | TRUE     |             |
| title       | user-defined display name for the schema                                                 | String                                                             | FALSE    | FALSE  | FALSE    |             |
| created     | timestamp when schema was created                                                        | [ISO 8601 String](https://tools.ietf.org/html/rfc3339)            | FALSE    | FALSE  | TRUE     |             |
| lastUpdated | timestamp when schema was last updated                                                   | [ISO 8601 String](https://tools.ietf.org/html/rfc3339)            | FALSE    | FALSE  | TRUE     |             |
| definitions | app user profile subschemas                                                              | [App User Profile Subschemas](#app-user-profile-subschemas)       | FALSE    | FALSE  | FALSE    | JSON Schema |
| type        | type of [root schema](https://tools.ietf.org/html/draft-zyp-json-schema-04#section-3.4) | String                                                             | FALSE    | FALSE  | TRUE     |             |
| properties  | user model properties                                                                    | [App User Model](/docs/api/resources/apps/#application-user-model) property set | FALSE    | FALSE  | TRUE     |             |

### App User Profile Subschemas

The [profile object](/docs/api/resources/apps/#application-user-profile-object) for a user is defined by a composite schema of base and custom properties using JSON Path to reference subschemas.  The `#base` properties are defined and versioned by Okta while `#custom` properties are extensible.

- [App User Profile Base Subschema](#app-user-profile-base-subschema)
- [App User Profile Custom Subschema](#app-user-profile-custom-subschema)

Custom property names for the [profile object](/docs/api/resources/apps/#application-user-profile-object) must be unique and cannot conflict with a property name defined in the `#base` subschema.

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

#### App User Profile Base Subschema

All Okta-defined profile properties are defined in a profile sub-schema with the resolution scope `#base`.  These properties cannot be removed or edited, except for nullability in some cases.  (Changing a base property's nullability (i.e., the value of its `required` field) is allowed only if it is nullable in the default predefined schema for the app.)

The base app user profile varies substantially depending on the application. The following properties are required for all app user profiles:

| Property          | Description                                                                                                                  | DataType | Nullable | Unique | Readonly | MinLength | MaxLength |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | ------ | -------- | --------- | --------- |
| userName          | unique identifier for the user                                                                                               | String   | FALSE    | TRUE   | FALSE    |           | 100       |

#### App User Profile Custom Subschema

All custom profile properties are defined in a profile sub-schema with the resolution scope `#custom`.

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

#### App User Profile Schema Property Object

App user profile schema properties have the following standard [JSON Schema Draft 6](https://tools.ietf.org/html/draft-wright-json-schema-validation-01) properties:

| Property                       | Description                                | DataType                                          | Nullable | Unique | Readonly |
|:-------------------------------|:-------------------------------------------|:--------------------------------------------------|:---------|:-------|:---------|
| title                          | user-defined display name for the property | String                                            | FALSE    | FALSE  | FALSE    |
| description                    | description of the property                | String                                            | TRUE     | FALSE  | FALSE    |
| type                           | type of property                           | `string`, `boolean`, `number`, `integer`, `array` | FALSE    | FALSE  | FALSE    |
| enum                           | enumerated value of the property           | array                                             | TRUE     | TRUE   | FALSE    |
| oneOf                          | non-empty array of valid JSON schemas      | array                                             | TRUE     | TRUE   | FALSE    |

##### Description Details

 * `enum`: The value of the property is limited to one of the values specified in the enum definition.
 The list of values for the enum has to be made up of unique elements.

 * `oneOf`: Okta only supports `oneOf` for specifying display names for an `enum`, each schema has the following format.
 ```json
{
  "const": "enumValue",
  "title": "display name"
}
 ```
In case enum is used in conjunction with `oneOf`, the set of enumerated values and their order must be kept.
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
`oneOf` is only supported in conjunction with the `enum` providing a mechanism to return a display name for the enum value.


Okta has also extended [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04) with the following keywords:

| Property      | Description                                     | DataType                                                                  | Nullable | Unique | Readonly |
| :------------- | :----------------------------------------------- | :------------------------------------------------------------------------- | :--------- | :------ | :-------- |
| required      | determines whether the property is required     | Boolean                                                                   | FALSE    | FALSE  | FALSE    |
| scope         | determines whether an appuser attribute can be set at the Individual or Group Level | `SELF`, `NONE`                        | FALSE    | FALSE  | TRUE     |

> A read-only [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04) compliant `required` property is also available on the [App User Profile Subschemas](#app-user-profile-subschemas).

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

##### App User Schema Property Types and Validation

Specific property types support a **subset** of [JSON Schema validations](https://tools.ietf.org/html/draft-fge-json-schema-validation-00).

| Property Type | Description                                                                                                                         | Validation Keywords         |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------------- | :--------------------------- |
| `string`      | [JSON String](https://tools.ietf.org/html/rfc7159#section-7)                                                                        | `minLength` and `maxLength` |
| `boolean`     | `false`, `true`, or `null`                                                                                                          |                             |
| `number`      | [JSON Number](https://tools.ietf.org/html/rfc7159#section-6) with double-precision 64-bit IEEE 754 floating point number constraint | `minimum` and `maximum`     |
| `integer`     | [JSON Number](https://tools.ietf.org/html/rfc7159#section-6) with 32-bit signed two's complement integer constraint           | `minimum` and `maximum`     |
| `array`       | [JSON Array](https://tools.ietf.org/html/rfc7159#section-5)                                                                         |                             |
