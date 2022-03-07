---
title: MyAccount
category: management
---

# MyAccount API

<ApiLifecycle access="ea" />

The Okta MyAccount API allows end users (with or without administrator access) to fetch and update their own Okta user profiles.  It implements a subset of the existing [Users API](/docs/reference/api/users/) but with significant differences.  This API does not expose information an end user should not have access to, and it does not support lifecycle operations.

All operations in this API implicitly refer to the user making the API call.  No user ID is needed (or even accepted).

<!--
## Get started

Explore the MyAccount API:

-->

## MyAccount Operations

The MyAccount API has the following operations:

* [Get data about Me](#get-me)
* [Get my User Profile Schema](#get-my-user-profile-schema)
* [Get my User Profile](#get-my-user-profile)
* [Update my User Profile](#update-my-user-profile)
* [Add My Email](#add-my-email)
* [Get My Email](#get-my-email)
* [Get My Emails](#get-my-emails)
* [Delete My Email](#delete-my-email)


### Add My Email

<ApiOperation method="post" url="/idp/myaccount/emails" />

Create an UNVERIFIED status, PRIMARY or SECONDARY email to user's MyAccount setting.

#### Required scope and role

An Okta scope of `okta.myAccount.email.manage` is required to use this endpoint.

> **Note:** Admin users are not allowed to call the `/idp/myaccount/emails` POST endpoint.

#### API Versioning
An valid API version in the `Accept` header is required to access the API. Current version V1.0.0

```json
Accept: application/json; okta-version=1.0.0
```

#### Request path parameters
N/A

#### Request query parameters

N/A

#### Request body
This API requires a [My Email Request object](#my-email-request-object) as its request body.

#### Response body

The requested [My Email object](#my-email-object)

#### Usage example

Any user with a valid bearer token can issue this request to create their email.

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${token}" \
"https://${yourOktaDomain}/idp/myaccount/emails"
```

##### Response

```json
{
    "id": "5a8de6071e1b94e0f4ec664b9e4869e8",
    "status": "UNVERIFIED",
    "profile": {
        "email": "primary.email@okta.com"
    },
    "roles": [
        "PRIMARY"
    ],
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/idp/myaccount/emails/5a8de6071e1b94e0f4ec664b9e4869e8",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "challenge": {
            "href": "https://${yourOktaDomain}/idp/myaccount/emails/5a8de6071e1b94e0f4ec664b9e4869e8/challenge",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Get My Email

<ApiOperation method="get" url="/idp/myaccount/emails/{id}" />

Fetches the current user's email information by id, a collection of links describing the operations can be performed to the email.

#### Required scope and role

An Okta scope of `okta.myAccount.email.read` or `okta.myAccount.email.manage` is required to use this endpoint.

#### API Versioning
An valid API version in the `Accept` header is required to access the API. Current version V1.0.0

```json
Accept: application/json; okta-version=1.0.0
```

#### Request path parameters
| Parameter  | Type   | Description                                       |
| ---------- | ------ | ------------------------------------------------- |
| `id` | String | ID of the email. the ID of the email can be obtained through `GET /idp/myaccount/emails` or `POST /idp/myaccount/emails` when adding a new email address. |

#### Request query parameters

N/A

#### Response body

The requested [My Email object](#my-email-object)

#### Usage example

Any user with a valid bearer token can issue this request to get their email.

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${token}" \
"https://${yourOktaDomain}/idp/myaccount/emails/{id}"
```

##### Response

```json
{
    "id": "5a8de6071e1b94e0f4ec664b9e4869e8",
    "status": "VERIFIED",
    "profile": {
        "email": "primary.email@okta.com"
    },
    "roles": [
        "PRIMARY"
    ],
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/idp/myaccount/emails/5a8de6071e1b94e0f4ec664b9e4869e8",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "challenge": {
            "href": "https://${yourOktaDomain}/idp/myaccount/emails/5a8de6071e1b94e0f4ec664b9e4869e8/challenge",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Get My Emails

<ApiOperation method="get" url="/idp/myaccount/emails" />

Fetches the current user's all email information, a collection of links for each email describing the operations can be performed.

#### Required scope and role

An Okta scope of `okta.myAccount.email.read` or `okta.myAccount.email.manage` is required to use this endpoint.

#### API Versioning
An valid API version in the `Accept` header is required to access the API. Current version V1.0.0

```json
Accept: application/json; okta-version=1.0.0
```

#### Request path parameters
N/A

#### Request query parameters

N/A

#### Response body

A list of the requested [My Email object](#my-email-object)

#### Usage example

Any user with a valid bearer token can issue this request to get their email addresses.

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${token}" \
"https://${yourOktaDomain}/idp/myaccount/emails"
```

##### Response

```json
[
    {
        "id": "0dd9a31e3aacb7181de720d15d1ef247",
        "status": "VERIFIED",
        "profile": {
            "email": "some.primary.email1@okta.com"
        },
        "roles": [
            "PRIMARY"
        ],
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/idp/myaccount/emails/0dd9a31e3aacb7181de720d15d1ef247",
                "hints": {
                    "allow": [
                        "GET"
                    ]
                }
            },
            "challenge": {
                "href": "https://${yourOktaDomain}/idp/myaccount/emails/0dd9a31e3aacb7181de720d15d1ef247/challenge",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            }
        }
    },
    {
        "id": "edf645ca14c3ebaf5aa69346de6afbf5",
        "status": "VERIFIED",
        "profile": {
            "email": "add.test.email@okta.com"
        },
        "roles": [
            "SECONDARY"
        ],
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/idp/myaccount/emails/edf645ca14c3ebaf5aa69346de6afbf5",
                "hints": {
                    "allow": [
                        "GET"
                    ]
                }
            },
            "challenge": {
                "href": "https://${yourOktaDomain}/idp/myaccount/emails/edf645ca14c3ebaf5aa69346de6afbf5/challenge",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            }
        }
    }
]
```

### Delete My Email

<ApiOperation method="delete" url="/idp/myaccount/emails/{id}" />

Delete the current user's email information by id, only UNVERIFIED primary and secondary emails can be deleted.

#### Required scope and role

An Okta scope of `okta.myAccount.email.manage` is required to use this endpoint.

> **Note:** Admin users are not allowed to call the `/idp/myaccount/emails/{id}/` DELETE endpoint.

#### API Versioning
An valid API version in the `Accept` header is required to access the API. Current version V1.0.0

```json
Accept: application/json; okta-version=1.0.0
```

#### Request path parameters
| Parameter  | Type   | Description                                       |
| ---------- | ------ | ------------------------------------------------- |
| `id` | String | ID of the email. the ID of the email can be obtained through `GET /idp/myaccount/emails` or `POST /idp/myaccount/emails` when adding a new email address. |

#### Request query parameters

N/A

#### Response body

N/A

#### Usage example

Any non-admin user with a valid bearer token can issue this request to delete their UNVERIFIED emails.

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: Bearer ${token}" \
"https://${yourOktaDomain}/idp/myaccount/emails/{id}"
```

##### Response
Returns an empty HTTP 204 status code response.

### Get Me

<ApiOperation method="get" url="/api/v1/myaccount" />

Fetches the current user's Me object, a collection of links to information describing the user.

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Response body

The requested [Me object](#me-object)

#### Usage example

Any user with a valid session can issue this request to get basic information about their account.

##### Request

```bash
curl -v -X GET \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/myaccount"
```

##### Response

```json
{
    "_links": {
        "directoryProfile": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount/directoryProfile"
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount"
        }
    },
    "createdAt": "2020-01-14T20:05:32.000Z",
    "id": "00u21l3rOYRXX1tnI0g4",
    "modifiedAt": "2020-10-13T03:17:09.000Z"
}
```


### Get My User Profile Schema

<ApiOperation method="get" url="/api/v1/myaccount/profile/schema" />

Fetches the appropriate User Profile Schema for the caller's [User Type](/docs/reference/api/user-types/).

> **Note:** If a property's value is not visible to an end user (because it is hidden or [sensitive](https://help.okta.com/okta_help.htm?id=ext-hide-sensitive-attributes) then the property's definition will also be hidden in the output of this API.

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Response body

The [User Profile Schema](#user-profile-schema-object) for the caller.

#### Usage example

Any user with a valid session can issue this request to get the Schema for their User Profile.

##### Request

```bash
curl -v -X GET \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/myaccount/profile/schema"
```

##### Response

```json
{
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount/profile/schema"
        },
        "user": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount"
        }
    },
    "properties": {
        "customBoolean": {
            "permissions": {
                "SELF": "READ_WRITE"
            },
            "title": "customBoolean",
            "type": "boolean"
        },
        "foo": {
            "permissions": {
                "SELF": "READ_ONLY"
            },
            "title": "foo",
            "type": "string"
        },
        "login": {
            "maxLength": 100,
            "minLength": 5,
            "permissions": {
                "SELF": "READ_ONLY"
            },
            "required": true,
            "title": "Username",
            "type": "string"
        },
        "mobilePhone": {
            "maxLength": 100,
            "permissions": {
                "SELF": "READ_WRITE"
            },
            "title": "Mobile phone",
            "type": "string"
        },
        "customInteger": {
            "permissions": {
                "SELF": "READ_WRITE"
            },
            "title": "customInteger",
            "type": "integer"
        }
    }
}
```

### Get My User Profile

<ApiOperation method="get" url="/api/v1/myaccount/directoryProfile" />

Fetches the caller's Okta User Profile, excluding any attribute also excluded by [Get My User Profile Schema](#get-my-user-profile-schema)


#### Request query parameters

| Parameter | Type        | Description                                                                                            |
| --------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| `expand`  | String      | (Optional) If specified as `schema`, the User Profile Schema is included in the `embedded` attribute. |


#### Response body

Returns a [User Profile](#user-profile-object).

#### Usage example

Any user with a valid session can issue this request to get their User Profile.

##### Request

This request would retriever the requesting User's Profile.

```bash
curl -v -X GET \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/myaccount/directoryProfile"
```

##### Response

```json
{
    "_links": {
        "describedBy": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount/profile/schema"
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount/directoryProfile"
        },
        "user": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount"
        }
    },
    "createdAt": "2020-01-14T20:05:32.000Z",
    "modifiedAt": "2020-10-13T03:17:09.000Z",
    "profile": {
        "customBoolean": null,
        "foo": "bar",
        "login": "example@ex.ample.com",
        "mobilePhone": null,
        "customInteger": null
    }
}
```


### Update My User Profile

<ApiOperation method="put" url="/api/v1/myaccount/directoryProfile" />

Updates the caller's User Profile.

> **Note:** This API differs from the the existing [Users API](/docs/reference/api/users/) in that only PUT is supported.  This API also does not support partial update.  All values returned from fetching User Profile must be passed to this API, or the update will not pass validation.  This applies even if the omitted schema property is optional. To unset an optional property, explicitly pass the property with a value of `null`.

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Request body

This API requires the `profile` property of a [User Profile](#user-profile-object) as its request body.

| Property | Type                     | Description                          |
| -------- | -------------------------|--------------------------------------|
| `profile`  | Object | The properties defined in the schema |

#### Response body

Returns the result of applying the update, as if the caller had invoked the GET User Profile operation.

#### Usage example

##### Request

This request would update the user profile of the caller to have exactly the values specified.

```bash
curl -XPUT 'https://${yourOktaDomain}/api/v1/myaccount/directoryProfile' -H 'Authorization: SSWS {token}' -H 'Content-Type: application/json' --data '{
     "profile": {
         "customBoolean": false,
         "foo": "bar",
         "login": "dayton.williams@okta.com",
         "notFive": 5,
         "customInteger": null
     }
 }'
```

##### Response

```json
{
    "_links": {
        "describedBy": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount/profile/schema"
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount/directoryProfile"
        },
        "user": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount"
        }
    },
    "createdAt": "2020-01-14T20:05:32.000Z",
    "modifiedAt": "2020-11-03T06:01:13.000Z",
    "profile": {
        "customBoolean": false,
        "foo": "bar",
        "login": "example@ex.ample.com",
        "mobilePhone": null,
        "customInteger": 5
    }
}
```




## MyAccount API objects

### My Email object

#### My Email properties

| Property           | Type                                                            | Description                                                                                                       |
| ------------------ | --------------------------------------------------------------- | ------------------------------------------------------ |
| `id`               | String                                                            | The caller's email ID|
| `status`           | String                                                            | The caller's email status, VERIFIED, OR UNVERIFIED|
| `roles`            | Object                                                            | The roles object defines the role of the email, PRIMARY or SECONDARY|
| `profile`          | Object                                                            | The profile object defines the email address on the profile.|
| `_links`           | Object ([JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06))  | Discoverable resources related to the caller's email |

#### My Email example

```json
{
    "id": "5a8de6071e1b94e0f4ec664b9e4869e8",
    "status": "VERIFIED",
    "profile": {
        "email": "some.primary.email@okta.com"
    },
    "roles": [
        "PRIMARY"
    ],
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/idp/myaccount/emails/5a8de6071e1b94e0f4ec664b9e4869e8",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "challenge": {
            "href": "https://${yourOktaDomain}/idp/myaccount/emails/5a8de6071e1b94e0f4ec664b9e4869e8/challenge",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### My Email Request object

#### My Email Request properties

| Property           | Type                                                            | Description                                                                                                       |
| ------------------ | --------------------------------------------------------------- | ------------------------------------------------------ |
| `profile`          | Object                                                            | The profile object defines the email address on the profile.|
| `roles`            | Object                                                            | The roles object defines the role of the email, PRIMARY or SECONDARY|
| `sendEmail`        | Boolean                                                           | send challenge to the newly added email, the default is true | `state` | String | (Optional) The state parameter, the state of the client |

#### My Email Request example

```json
{
  "profile": {
      "email" : "some.primary.email@okta.com"
  },
   "role": "PRIMARY",
   "sendEmail": true
}
```

### Me object

#### Me properties

The Me object has several properties:

| Property           | Type                                                            | Description                                                                                                       |
| ------------------ | --------------------------------------------------------------- | ------------------------------------------------------ |
| `_links`             | Object ([JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06))  | Discoverable resources related to the caller's account |
| `createdAt`          | String (ISO-8601)                                                         | The timestamp the caller's account was created         |
| `id`                 | String                                                            | The caller's user ID                                   |
| `modifiedAt`         | String (ISO-8601)                                                         | The timestamp the caller's account was last updated    |


#### Me example

```json
{
    "_links": {
        "directoryProfile": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount/directoryProfile"
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount"
        }
    },
    "createdAt": "2020-01-14T20:05:32.000Z",
    "id": "00u21l3rOYRXX1tnI0g4",
    "modifiedAt": "2020-10-13T03:17:09.000Z"
}
```

### User Profile Schema object

#### User Profile Schema properties

The User Profile Schema object has several properties:

| Property           | Type                                                                                                              | Description                                                        |
| ------------------ | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `_links`             | Object ([JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06))                                                    | Discoverable resources related to the caller's User Profile Schema |
| `properties`         | Object | The properties defined in the [User Profile Schema](/docs/reference/api/schemas/#user-profile-schema-property-object)                               |

#### User Profile Schema example

```json
{
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount/profile/schema"
        },
        "user": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount"
        }
    },
    "properties": {
        "customBoolean": {
            "permissions": {
                "SELF": "READ_WRITE"
            },
            "title": "customBoolean",
            "type": "boolean"
        },
        "foo": {
            "permissions": {
                "SELF": "READ_ONLY"
            },
            "title": "foo",
            "type": "string"
        },
        "login": {
            "maxLength": 100,
            "minLength": 5,
            "permissions": {
                "SELF": "READ_ONLY"
            },
            "required": true,
            "title": "Username",
            "type": "string"
        },
        "mobilePhone": {
            "maxLength": 100,
            "permissions": {
                "SELF": "READ_WRITE"
            },
            "title": "Mobile phone",
            "type": "string"
        },
        "customInteger": {
            "permissions": {
                "SELF": "READ_WRITE"
            },
            "title": "customInteger",
            "type": "integer"
        }
    }
}
```



### User Profile object

#### User Profile properties

The User Profile object has several properties:

| Property   | Type                                                           | Description                                                                                                |
| ---------- | ---------------------------------------------------------------|----------------------------------------------------------------------------------------------------------- |
| `_embedded`  | Object                                   | If `expand`=`schema` is included in the request, the [User Profile Schema](#user-profile-schema-object) will be included in the response. |
| `_links`     | Object ([JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)) | Discoverable resources related to the caller's user profile schema                                         |
| `createdAt`  | String (ISO-8601)                                                        | The timestamp the caller's account was created                                                             |
| `modifiedAt` | String (ISO-8601)                                                        | The timestamp the caller's account was last updated                                                        |
| `profile`    | Object                                       | The properties defined in the [User Profile Schema](#user-profile-schema-object)                                                                       |


#### User Profile example

```json
{
    "_links": {
        "describedBy": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount/profile/schema"
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount/directoryProfile"
        },
        "user": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount"
        }
    },
    "createdAt": "2020-01-14T20:05:32.000Z",
    "modifiedAt": "2020-10-13T03:17:09.000Z",
    "profile": {
        "customBoolean": null,
        "foo": "bar",
        "login": "example@ex.ample.com",
        "mobilePhone": null,
        "customInteger": null
    }
}
```
