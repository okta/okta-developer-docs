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

### Send Phone Challenge

<ApiOperation method="post" url="/idp/myaccount/phones/{id}/challenge"/>

Send a phone challenge via one of the two methods: `SMS` or `CALL`. This API handles resend challenge (retry) as well.

Upon a successful challenge, the user will receive a verification code via either `SMS` or `CALL`. The verification code can be used to verify the phone number by calling `POST /idp/myaccount/phones/{id}/verify` endpoint. The verification code would expire in 5 minutes.

This endpoint is supposed to be called no more than once every 30 seconds.

#### Request path parameters

`id`: the id of the phone factor, which can be found in the response when a new phone is created successfully (`POST /idp/myaccount/phones`) or phone(s) is retrieved (`GET /idp/myaccount/phones`).

#### Request query parameters

N/A

#### Request body

This API requires the `method` property as its request body. An optional boolean `retry` property can be used to indicate resend challenge when its value is set to `true`.

| Property | Type                     | Description                          |
| -------- | -------------------------|--------------------------------------|
| `method`  | String | The method with which the challenge should be sent, valid values are `SMS` and `CALL` |
| `retry`  | Boolean | An optional property that indicates whether this is a normal challenge or retry |

#### Response body

Returns an empty response with http status code of 200.

#### Usage example

##### Request

This request would result in a verification code to be sent to the phone number represended by the `id` via SMS. This is a normal phone challenge, not a retry.

```bash
curl -XPOST 'https://${yourOktaDomain}/myaccount/phones/{id}/challenge' -H 'Authorization: SSWS {token}' -H 'Content-Type: application/json' --data '{
     "method": "SMS",
     "retry": false
 }'
```

### Verify Phone Challenge

<ApiOperation method="post" url="/idp/myaccount/phones/{id}/verify"/>

Verify the phone number with the verification code that the user received via `SMS` or `CALL`. The phone number would be active upon a successful verification.

#### Request path parameters

`id`: the id of the phone factor, which can be found in the response when a new phone number is added successfully (`POST /idp/myaccount/phones`) or phone(s) is retrieved (`GET /idp/myaccount/phones`).

#### Request query parameters

N/A

#### Request body

This API requires the `verificationCode` property as its request body.

| Property | Type                     | Description                          |
| -------- | -------------------------|--------------------------------------|
| `verificationCode`  | String | A 6-digit verification code that the user receives via `SMS` or `CALL` |

#### Response body

Returns an empty response with http status code of 204.

#### Usage example

##### Request

This request would verify the phone number represented by the `id` with the verification code of 796672.

```bash
curl -XPOST 'https://${yourOktaDomain}/myaccount/phones/{id}/verify' -H 'Authorization: SSWS {token}' -H 'Content-Type: application/json' --data '{
     "verificationCode": "796672"
 }'
```



## MyAccount API objects

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


