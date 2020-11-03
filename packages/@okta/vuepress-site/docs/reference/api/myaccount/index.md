---
title: MyAccount
category: management
---

# MyAccount API

<ApiLifecycle access="ea" />

The Okta MyAccount API is a non-admin group of endpoints that allows end users (with or without administrator access) to fetch and update their own Okta user profiles, using a non-administrator endpoint.  It implements a subset of the existing [Users API](/docs/reference/users/index.md) but with significant differences.  This API does not expose information an end-user should not have access to, and it does not support lifecycle operations.

All operations in this API implicitly refer to the user making the API call.  No user ID is needed (or even accepted).

<!--
## Get started

Explore the MyAccount API:

-->

## MyAccount Operations

The MyAccount API has the following operations:

* [Get data about Me](#get-me)
* [Get my MyUserSchema](#get-my-user-schema)
* [Get my UserProfile](#get-my-user-profile)
* [Update my UserProfile](#update-my-user-profile)

### Get Me

<ApiOperation method="get" url="/api/v1/myaccount" />

Fetches the curren user's Me object, a collection of links to information describing the user.

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Response body

The requested [Me object](#me)

> **Note:** Currently not all the `_links` returned are implemented.  See the [Me object](#me) description for details.

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
        "applicationProfile": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount/applicationProfile"
        },
        "credentials": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount/credentials"
        },
        "directoryProfile": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount/directoryProfile"
        },
        "logs": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount/logs"
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


### Get My User Schema

<ApiOperation method="get" url="/api/v1/myaccount/profile/schema" />

Fetches the appropriate MyUserSchema for the caller's [User Type](/docs/reference/user-types/).

> **Note:** If an property's value is not visible to an end user (because it is hidden or [sensitive](https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-hide-sensitive-attributes.htm)) then the property's definition will also be hidden in the output of this API.

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Response body

The [MyUserSchema](#user-schema) for the caller.

#### Usage example

Any user with a valid session can issue this request to get the MyUserSchema for their User Profile.

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

### Get MyUserProfile

<ApiOperation method="get" url="/api/v1/myaccount/directoryProfile" />

Fetches the caller's Okta user profile, excluding any attribute also excluded by [Get MyUserSchema](#get-MyUserSchema)


#### Request query parameters

| Parameter | Type        | Description                                                                                            |
| --------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| `expand`  | String      | (Optional) If specified as `schema`, the user profile schema is included in the `embedded` attribute. |


#### Response body

Returns a [MyUserProfile](#MyUserProfile-object).

#### Usage example

Any user with a valid session can issue this request to get their user profile.

##### Request

This request would retriever the request user's profile.

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

Updates the caller's MyUserProfile.

> **Note:** This API differs from the the existing [Users API](/docs/reference/users/) in that only PUT is supported.  This API also does not support partial update.  All values returned from fetching MyUserProfile must be passed to this API, or the update will not pass validation.  This applies even if the omitted schema property is optional. To unset an optional property, explicitly pass the property with a value of `null`.

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Request body

This API requires the `profile` property of a [MyUserProfile](#myuserprofile-object) as its request body.

| Property | Type                     | Description                          |
| -------- | -------------------------|--------------------------------------|
| profile  | A map of key-value pairs | The properties defined in the schema |

#### Response body

Returns the result of applying the update, as if the caller had invoked the GET MyUserProfile operation.

#### Usage example

##### Request

This request would update the user profile of the caller to have exactly the values specified.

```bash
curl -XPUT 'https://${yourOktaDomain}/api/v1/myaccount/directoryProfile' -H 'Authorization: SSWS {token}' -H 'Content-Type: application/json' --data '{
>     "profile": {
>         "customBoolean": false,
>         "foo": "bar",
>         "login": "dayton.williams@okta.com",
>         "notFive": 5,
>         "customInteger": null
>     }
> }'
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

### Me object

#### Me properties

The Me object has several properties:

Note: Some returned links point to operations planned but not yet implemented.  Currently supported links are to directoryProfile and self.

| Property           | Type                                                            | Description                                                                                                       |
| ------------------ | --------------------------------------------------------------- | ------------------------------------------------------ |
| _links             | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)  | Discoverable resources related to the caller's account |
| createdAt          | String                                                          | The timestamp the caller's account was created         |
| id                 | Date                                                            | The caller's user ID                                   |
| modifiedAt         | String                                                          | The timestamp the caller's account was last updated    |


#### Me example

```json
{
    "_links": {
        "applicationProfile": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount/applicationProfile"
        },
        "credentials": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount/credentials"
        },
        "directoryProfile": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount/directoryProfile"
        },
        "logs": {
            "href": "https://${yourOktaDomain}/api/v1/myaccount/logs"
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

### MyUserSchema object

#### MyUserSchema properties

The MyUserSchema object has several properties:

| Property           | Type                                                                                                              | Description                                                        |
| ------------------ | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| _links             | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                                                    | Discoverable resources related to the caller's user profile schema |
| properties         | A subobject of [User Schema Properties](docs/reference/api/schemas/index.md#user-profile-schema-property-object)s | The properties defined in the schema                               |

#### MyUserSchema example

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



### MyUserProfile object

#### MyUserProfile properties

The MyUserProfile object has several properties:

| Property   | Type                                                           | Description                                                                                                |
| ---------- | ---------------------------------------------------------------|----------------------------------------------------------------------------------------------------------- |
| _embedded  | [MyUserSchema](MyUserSchema)                                   | If `expand`=`schema` is included in the request, the user profile schema will be included in the response. |
| _links     | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | Discoverable resources related to the caller's user profile schema                                         |
| createdAt  | String                                                         | The timestamp the caller's account was created                                                             |
| profile    | A map of key-value pairs                                       | The properties defined in the schema                                                                       |
| modifiedAt | String                                                         | The timestamp the caller's account was last updated                                                        |


#### MyUserProfile example

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



