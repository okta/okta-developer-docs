---
title: Devices
category: management
---

# Devices API

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

> **Note:** This feature is only available as a part of Okta Identity Engine. Please [contact support](mailto:dev-inquiries@okta.com) for further information.

The Okta Devices API provides a centralized integration platform to fetch and manage device information. Okta administrators can use these APIs to manage workforce identity Device object information.

The Devices API supports the following **Device Operations**:
* Get, Delete Device objects.
* Perform lifecycle transitions on the Device objects.

The Devices API supports the following **Authorization Schemes**:
* SSWS - [API tokens](/docs/reference/core-okta-api/#authentication)
* Bearer - [OAuth2.0 and OpenID Connect](/docs/concepts/oauth-openid/)

## Get started

Explore the Devices API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/872527-66eb3f8a-53db-4a7f-bb9b-dbaeed6a9b9e)

## Device operations

The Devices API has the following Device Identity operations:

* [Get Device](#get-device-by-id)
* [List Devices](#list-devices)
* [Delete Device](#delete-device)

The following Device lifecycle operations:

* [Activate Device](#activate-device)
* [Deactivate Device](#deactivate-device)
* [Suspend Device](#suspend-device)
* [Unsuspend Device](#unsuspend-device)

> **Note:** Device creation occurs during the Okta Verify enrolment flow. The flow creates a Device in the Okta Device Inventory. See [Device Registration](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/devices/device-registration.htm).

### Get Device by ID

<ApiOperation method="get" url="/api/v1/devices/${deviceId}" />

Fetches a Device by its `id`. If you don't know the `id`, you can [List Devices](#list-devices).

#### Permitted OAuth 2.0 scopes 
`okta.devices.read`

#### Request path parameters

| Parameter  | Type   | Description                                       |
| ---------- | ------ | ------------------------------------------------- |
| `deviceId` | String | The `id` of [Device](#device-object) object  |

#### Request query parameters

None

#### Request body

None

#### Response body

The requested [Device](#device-object).

#### Usage example

This request fetches a Device object with an `id` value `guo4a5u7JHHhjXrMK0g4`:

##### API token request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/devices/${deviceId}"
```

##### Bearer token Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${oauth_token}" \
"https://${yourOktaDomain}/api/v1/devices/${deviceId}"
```

##### Bearer token Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${oauth_token}" \
"https://${yourOktaDomain}/api/v1/devices/guo4a5u7JHHhjXrMK0g4"
```

##### Response

```json
{
    "id": "guo4a5u7JHHhjXrMK0g4",
    "status": "CREATED",
    "created": "2019-10-02T18:03:07.000Z",
    "lastUpdated": "2019-10-02T18:03:07.000Z",
    "profile": {
        "displayName": "Example Device name",
        "platform": "WINDOWS",
        "manufacturer": null,
        "model": null,
        "osVersion": null,
        "serialNumber": "Example",
        "imei": null,
        "meid": null,
        "udid": null,
        "sid": "S-1-11-111",
        "tpmPublicKeyHash":null,
        "registered":true,
        "managed":false,
        "secureHardwarePresent":false
    },
    "_links": {
        "activate": {
            "href": "https://${yourOktaDomain}/api/v1/devices/guo4a5u7JHHhjXrMK0g4/lifecycle/activate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/devices/guo4a5u7JHHhjXrMK0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PATCH",
                    "PUT"
                ]
            }
        },
        "devices": {
            "href": "https://${yourOktaDomain}/api/v1/devices/guo4a5u7JHHhjXrMK0g4/devices",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```
##### Error response

An invalid `id` returns a `404 Not Found` status code.

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
    "errorCode": "E0000007",
    "errorSummary": "Not found: Resource not found: 123456 (GenericUDObject)",
    "errorLink": "E0000007",
    "errorId": "oaeksGoibBmS9OGYo4vXT7llA",
    "errorCauses": []
}
```

### List Devices

<ApiOperation method="get" url="/api/v1/devices" />

Fetches a list of all Devices that are not `DELETED` for your org. Responses are paginated with maximum size of 200.

A subset of Devices can be returned that match a supported search criteria using the `search` query parameter.

Searches for devices based on the properties specified in the `search` parameter conforming SCIM filter specifications (case-insensitive). This data is eventually consistent. The API returns different results depending on specified queries in the request. Empty list is returned if no objects match `search` request.

> **Note:** Listing devices with `search` should not be used as a part of any critical flows—such as authentication or updates—to prevent potential data loss. `search` results may not reflect the latest information, as this endpoint uses a search index which may not be up-to-date with recent updates to the object. <br> Don't use search results directly for record updates, as the data might be stale and therefore overwrite newer data, resulting in data loss. <br> Use an `id` lookup for records that you update to ensure your results contain the latest data.

This operation:

* Supports pagination (to a maximum of 200 results).
* Requires [URL encoding](http://en.wikipedia.org/wiki/Percent-encoding). For example, `search=profile.displayName eq "Bob"` is encoded as `search=profile.displayName%20eq%20%22Bob%22`. Examples use cURL-style escaping instead of URL encoding to make them easier to read.

Searches include all Device profile properties, as well as the Device `id`, `status` and `lastUpdated` properties.

| Search term example                             | Description                                      |
| :---------------------------------------------- | :----------------------------------------------- |
| `status eq "ACTIVE"`                            | Devices that have a `status` of `ACTIVE`         |
| `lastUpdated gt "yyyy-MM-dd'T'HH:mm:ss.SSSZ"`   | Devices last updated after a specific timestamp  |
| `id eq "guo4a5u7JHHhjXrMK0g4"`                  | Devices with a specified `id`                    |
| `profile.displayName eq "Bob"`                  | Devices that have a `displayName` of `Bob`       |
| `profile.platform eq "WINDOWS"`                 | Devices that have an `platform` of `WINDOWS`     |
| `profile.sid sw "S-1" `                         | Devices whose `sid` starts with `S-1`            |

#### Permitted OAuth 2.0 scopes 
`okta.devices.read`

#### Request path parameters

None

#### Request query parameters

| Parameter      | Type   | Description                                                                                                               |
| -------------- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| `search`       | String | Searches for devices with a supported [filtering](/docs/reference/core-okta-api/#filter) expression for most properties |
| `limit`        | Number | Specifies the number of results returned (maximum `200`)                                                                    |
| `after`        | String | Specifies the pagination cursor for the next page of devices                                                              |
| `expand=user`  | String | Lists associated users for the device in `_embedded` element                                                              |

* If you don't specify a value for `limit`, the maximum (200) is used as a default.
* Treat the `after` cursor as an opaque value and obtain it through the next link relation. See [Pagination](/docs/reference/core-okta-api/#pagination).

#### Request body

None

#### Response body

Array of [Device](#device-object) objects.

#### Usage example (list all Devices)

The following request returns a list of all available devices, without any query parameters.

##### API token request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/devices"
```
##### Bearer token Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${oauth_token}" \
"https://${yourOktaDomain}/api/v1/devices"
```

##### Response

```json
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://${yourOktaDomain}/api/v1/devices?limit=200>; rel="self"
Link: <https://${yourOktaDomain}/api/v1/devices?after=guo4a5u7YAHhjXrMN0g4&limit=200>; rel="next"

[
 {
    "id": "guo4a5u7YAHhjXrMK0g4",
    "status": "CREATED",
    "created": "2019-10-02T18:03:07.000Z",
    "lastUpdated": "2019-10-02T18:03:07.000Z",
    "profile": {
        "displayName": "Example Device name 1",
        "platform": "WINDOWS",
        "manufacturer": null,
        "model": null,
        "osVersion": null,
        "serialNumber": "Example 1",
        "imei": null,
        "meid": null,
        "udid": null,
        "sid": "S-1-11-111",
        "tpmPublicKeyHash":null,
        "registered":true,
        "managed":false,
        "secureHardwarePresent":false
    },
    "_links": {
        "activate": {
            "href": "https://${yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4/lifecycle/activate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PATCH",
                    "PUT"
                ]
            }
        },
        "users": {
            "href": "https://${yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4/users",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
 },
 {
    "id": "guo4a5u7YAHhjXrMN0g4",
    "status": "ACTIVE",
    "created": "2019-10-02T20:03:07.000Z",
    "lastUpdated": "2019-10-02T20:03:07.000Z",
    "profile": {
        "displayName": "Example Device name 2",
        "platform": "WINDOWS",
        "manufacturer": null,
        "model": null,
        "osVersion": null,
        "serialNumber": "Example 2",
        "imei": null,
        "meid": null,
        "udid": null,
        "sid": "S-1-22-2222",
        "tpmPublicKeyHash":null,
        "registered":true,
        "managed":false,
        "secureHardwarePresent":false
    },
    "_links": {
        "activate": {
            "href": "https://${yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMN0g4/lifecycle/activate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMN0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PATCH",
                    "PUT"
                ]
            }
        },
        "users": {
            "href": "https://${yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMN0g4/users",
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

#### Usage example (search)

The following request returns a list of all available devices, with search parameters: Devices whose Profile `displayName` starts with `Eng-dev` and a `status` value of `ACTIVE`.

##### API token request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/devices?search=profile.displayName+sw+\"Eng-dev\"+and+status+eq+\"ACTIVE\""
```

##### Bearer token Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${oauth_token}" \
"https://${yourOktaDomain}/api/v1/devices?search=profile.displayName+sw+\"Eng-dev\"+and+status+eq+\"ACTIVE\""
```

##### Response

```json
[
  {
      "id": "guo4a5u7JHHhjXrMK0g4",
      "status": "ACTIVE",
      "created": "2019-10-02T18:03:07.000Z",
      "lastUpdated": "2019-10-02T18:03:07.000Z",
      "profile": {
          "displayName": "Eng-dev-macbookpro15",
          "platform": "MACOS",
          "manufacturer": null,
          "model": null,
          "osVersion": null,
          "serialNumber": "",
          "imei": null,
          "meid": null,
          "udid": "36A56558-1793-5B3A-8362-ECBAA14EDD2D",
          "sid": "",
          "tpmPublicKeyHash":null,
          "registered":true,
          "managed":false,
          "secureHardwarePresent":false
      },
      "_links": {
          "activate": {
              "href": "https://${yourOktaDomain}/api/v1/devices/guo4a5u7JHHhjXrMK0g4/lifecycle/activate",
              "hints": {
                  "allow": [
                      "POST"
                  ]
              }
          },
          "self": {
              "href": "https://${yourOktaDomain}/api/v1/devices/guo4a5u7JHHhjXrMK0g4",
              "hints": {
                  "allow": [
                      "GET",
                      "PATCH",
                      "PUT"
                  ]
              }
          },
          "users": {
              "href": "https://${yourOktaDomain}/api/v1/devices/guo4a5u7JHHhjXrMK0g4/users",
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

#### Usage example (expand=user)

The following request returns a list of all available devices and associated users.

##### API token request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/devices?expand=user"
```

##### Bearer token Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${oauth_token}" \
"https://${yourOktaDomain}/api/v1/devices?expand=user"
```

##### Response

```json
[
   {
      "id":"guo4a5u7JHHhjXrMK0g4",
      "status":"ACTIVE",
      "created":"2019-10-02T18:03:07.000Z",
      "lastUpdated":"2019-10-02T18:03:07.000Z",
      "profile":{
         "displayName":"Eng-dev-macbookpro15",
         "platform":"MACOS",
         "manufacturer":null,
         "model":null,
         "osVersion":null,
         "serialNumber":"",
         "imei":null,
         "meid":null,
         "udid":"36A56558-1793-5B3A-8362-ECBAA14EDD2D",
         "sid":"",
         "tpmPublicKeyHash":null,
         "registered":true,
         "managed":false,
         "secureHardwarePresent":false
      },
      "_links":{
         "activate":{
            "href":"https://${yourOktaDomain}/api/v1/devices/guo4a5u7JHHhjXrMK0g4/lifecycle/activate",
            "hints":{
               "allow":[
                  "POST"
               ]
            }
         },
         "self":{
            "href":"https://${yourOktaDomain}/api/v1/devices/guo4a5u7JHHhjXrMK0g4",
            "hints":{
               "allow":[
                  "GET",
                  "PATCH",
                  "PUT"
               ]
            }
         },
         "users":{
            "href":"https://${yourOktaDomain}/api/v1/devices/guo4a5u7JHHhjXrMK0g4/users",
            "hints":{
               "allow":[
                  "GET"
               ]
            }
         }
      },
      "_embedded":{
         "users":[
            {
               "created":"2021-10-01T16:52:41.000Z",
               "user":{
                  "id":"${userId}",
                  "status":"ACTIVE",
                  "created":"2020-08-12T06:46:50.000Z",
                  "activated":"2020-08-12T06:46:50.000Z",
                  "statusChanged":"2021-01-27T21:05:32.000Z",
                  "lastLogin":"2021-10-14T09:04:48.000Z",
                  "lastUpdated":"2021-01-27T21:05:32.000Z",
                  "passwordChanged":"2020-08-12T06:46:50.000Z",
                  "type":{
                     "id":"oty7ut9Uu76oHVUZc0w4"
                  },
                  "profile":{
                     "firstName":"fname",
                     "lastName":"lname",
                     "mobilePhone":null,
                     "secondEmail":null,
                     "login":"email@email.com",
                     "email":"email@email.com"
                  },
                  "credentials":{
                     "password":{
                        
                     },
                     "recovery_question":{
                        "question":"What is the food you least liked as a child?"
                     },
                     "provider":{
                        "type":"OKTA",
                        "name":"OKTA"
                     }
                  },
                  "_links":{
                     "suspend":{
                        "href":"https://${yourOktaDomain}/api/v1/users/${userId}/lifecycle/suspend",
                        "method":"POST"
                     },
                     "schema":{
                        "href":"https://${yourOktaDomain}/api/v1/meta/schemas/user/osc7ut9Uu76oHVUZc0w4"
                     },
                     "resetPassword":{
                        "href":"https://${yourOktaDomain}/api/v1/users/${userId}/lifecycle/reset_password",
                        "method":"POST"
                     },
                     "forgotPassword":{
                        "href":"https://${yourOktaDomain}/api/v1/users/${userId}/credentials/forgot_password",
                        "method":"POST"
                     },
                     "expirePassword":{
                        "href":"https://${yourOktaDomain}/api/v1/users/${userId}/lifecycle/expire_password",
                        "method":"POST"
                     },
                     "changeRecoveryQuestion":{
                        "href":"https://${yourOktaDomain}/api/v1/users/${userId}/credentials/change_recovery_question",
                        "method":"POST"
                     },
                     "self":{
                        "href":"https://${yourOktaDomain}/api/v1/users/${userId}"
                     },
                     "type":{
                        "href":"https://${yourOktaDomain}/api/v1/meta/types/user/oty7ut9Uu76oHVUZc0w4"
                     },
                     "changePassword":{
                        "href":"https://${yourOktaDomain}/api/v1/users/${userId}/credentials/change_password",
                        "method":"POST"
                     },
                     "deactivate":{
                        "href":"https://${yourOktaDomain}/api/v1/users/${userId}/lifecycle/deactivate",
                        "method":"POST"
                     }
                  }
               }
            }
         ]
      }
   }
]
```

### Delete Device

<ApiOperation method="delete" url="/api/v1/devices/${deviceId}" />

Permanently deletes a Device that is in `DEACTIVATED` status. The Device can be transitioned to `DEACTIVATED` status using [deactivate](#deactivate-device) API.

This deletion is destructive and deletes all the profile data related to the device. Once deleted, device data can't be recovered. A Device that is not in a `DEACTIVATED` state raises an error if Delete operation is attempted.

#### Permitted OAuth 2.0 scopes 
`okta.devices.manage`

#### Request path parameters

| Parameter   | Type   | Description                                                             |
| ----------- | ------ | ----------------------------------------------------------------------- |
| `deviceId`  | String | The `id` of [Device](#device-object) object                              |

#### Request query parameters

None

#### Request body

None

#### Response body

```http
HTTP/1.1 204 No Content
```

#### Usage example

##### API token request

```bash
curl -v -X DELETE \
-H "Authorization: SSWS ${api_token}" "https://${yourOktaDomain}/api/v1/devices/${deviceId}"
```

##### Bearer token Request
```bash
curl -v -X DELETE \
-H "Authorization: Bearer ${oauth_token}" "https://${yourOktaDomain}/api/v1/devices/${deviceId}"
```

##### Response

```http
HTTP/1.1 204 No Content
Content-Type: application/json
```

##### Error response

Passing an invalid `id` returns a `404 Not Found` status code with error code `E0000007`.

## Lifecycle operations

Device lifecycle is defined as transitions of the [Device Status](#device-status) by the associated operations. The Device object follows a predefined lifecycle transition flow. Device Lifecycle operations are idempotent. These are synchronous calls.

* [Activate Device](#activate-device)       
* [Deactivate Device](#deactivate-device)  
* [Suspend Device](#suspend-device)       
* [Unsuspend Device](#unsuspend-device)   

### Activate Device

<ApiOperation method="post" url="/api/v1/devices/${deviceId}/lifecycle/activate" />

Sets a Device's `status` to `ACTIVE`.

Activated devices can be used to create and delete Device User links.

#### Permitted OAuth 2.0 scopes 
`okta.devices.manage`

#### Request path parameters

| Parameter   | Type   | Description                                                             |
| ----------- | ------ | ----------------------------------------------------------------------- |
| `deviceId`  | String | The `id` of [Device](#device-object) object                              |

#### Request query parameters

None

#### Request body

None

#### Response body

None

#### Usage example

##### API token request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/devices/${deviceId}/lifecycle/activate"
```
##### Bearer token Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${oauth_token}" \
"https://${yourOktaDomain}/api/v1/devices/${deviceId}/lifecycle/activate"
```

##### Response

```http
HTTP/1.1 204 No Content
Content-Type: application/json
```

#### Error responses

* Passing an invalid `id` returns a `404 Not Found` status code with error code `E0000007`.
* Passing an `id` that is not in the `CREATED` or `DEACTIVATED` status returns a `400 Bad Request` status code with error code `E0000001`.

### Deactivate Device

<ApiOperation method="post" url="/api/v1/devices/${deviceId}/lifecycle/deactivate" />

Sets a Device's `status` to `DEACTIVATED`. Deactivation causes a Device to lose all Device User links. A Device should be in `DEACTIVATED` status before it can be [deleted](#delete-device).

> **Important**: 
> 1. Deactivating a Device is a **destructive** operation for device factors and client certificates.
> 2. Device deactivation renders associated assets&mdash;such as device factors and management certificates&mdash;unusable. Device re-enrollment via Okta Verify allows end users to setup new
factors on the device.
> 3. Deletion of the device after deactivation also deletes the device record from Okta. Re-enrollment of Okta Verify creates a new device record.


#### Permitted OAuth 2.0 scopes 
`okta.devices.manage`

#### Request path parameters

| Parameter   | Type   | Description                                                             |
| ----------- | ------ | ----------------------------------------------------------------------- |
| `deviceId`  | String | The unique identifier for the [Device](#device-object) object                              |

#### Request query parameters

None

#### Request body

None

#### Response body

None

#### Usage example

##### API token request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/devices/${deviceId}/lifecycle/deactivate"
```
##### Bearer token Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${oauth_token}" \
"https://${yourOktaDomain}/api/v1/devices/${deviceId}/lifecycle/deactivate"
```

##### Response

```http
HTTP/1.1 204 No Content
Content-Type: application/json
```

#### Error responses

* Passing an invalid `id` returns a `404 Not Found` status code with error code `E0000007`.
* Passing an `id` that is not in the `ACTIVE` or `SUSPENEDED` status returns a `400 Bad Request` status code with error code `E0000001`.

### Suspend Device

<ApiOperation method="post" url="/api/v1/devices/${deviceId}/lifecycle/suspend" />

Sets a Device's `status` to `SUSPENDED`.

A device in `ACTIVE` status can transition to `SUSPENDED`. This status is meant to be temporary and hence not destructive in nature.

Suspended devices:

* Can be used to create and delete device user links.
* Can only be [unsuspended](#unsuspend-device) or [deactivated](#deactivate-device).


#### Permitted OAuth 2.0 scopes 
`okta.devices.manage`

#### Request path parameters

| Parameter   | Type   | Description                                                             |
| ----------- | ------ | ----------------------------------------------------------------------- |
| `deviceId`  | String | The unique identifier for the [Device](#device-object) object                              |

#### Request query parameters

None

#### Request body

None

#### Response body

None

#### Usage example

##### API token request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/devices/${deviceId}/lifecycle/suspend"
```

##### Bearer token Request
```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${oauth_token}" \
"https://${yourOktaDomain}/api/v1/devices/${deviceId}/lifecycle/suspend"
```


##### Response

```http
HTTP/1.1 204 No Content
Content-Type: application/json
```

###### Error response

* Passing an invalid `id` returns a `404 Not Found` status code with error code `E0000007`.
* Passing an `id` that is not in the `ACTIVE` status returns a `400 Bad Request` status code with error code `E0000001`.

### Unsuspend Device

<ApiOperation method="post" url="/api/v1/devices/${deviceId}/lifecycle/unsuspend" />

Unsuspends a Device and by returning its `status` value to `ACTIVE`.

This operation can only be performed on a Device that is in `SUSPENDED` status.

#### Permitted OAuth 2.0 scopes 
`okta.devices.manage`

#### Request path parameters

| Parameter   | Type   | Description                                                             |
| ----------- | ------ | ----------------------------------------------------------------------- |
| `deviceId`  | String | The unique identifier for the [Device](#device-object) object                              |

#### Request query parameters

None

#### Request body

None

#### Response body

None

#### Usage example

##### API token Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/devices/${deviceId}/lifecycle/unsuspend"
```

##### Bearer token Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${oauth_token}" \
"https://${yourOktaDomain}/api/v1/devices/${deviceId}/lifecycle/unsuspend"
```

##### Response

```http
HTTP/1.1 204 No Content
Content-Type: application/json
```

###### Error response

* Passing an invalid `id` returns a `404 Not Found` status code with error code `E0000007`.
* Passing an `id` that is not in the `SUSPENDED` status returns a `400 Bad Request` status code with error code `E0000001`.

## Devices API objects

### Device object

#### Device properties

The device model defines several read-only properties:

| Property                | Type                                      | Description                                                                                          |
| :---------------------- | :---------------------------------------- | :----------------------------------------------------------------------------------------------------|
| `_links`                | [Link](#devices-object-link-attributes)   | Allowed operations for the device                                                                    |
| `created`               | String                                    | Timestamp when device was created                                                                    |
| `id`                    | String                                    | Unique key for device                                                                                |
| `lastUpdated`           | String                                    | Timestamp when device was last updated                                                               |
| `profile`               | [Profile Object](#device-profile-object)  | Device profile properties                                                                            |
| `status`                | String                                    | Current [status](#device-status) of device. One of `CREATED`, `ACTIVE`, `SUSPENDED` or `DEACTIVATED` |

#### Device example

```json
{
   "id":"guo8jx5vVoxfvJeLb0w4",
   "status":"ACTIVE",
   "created":"2020-11-03T21:47:01.000Z",
   "lastUpdated":"2020-11-03T23:46:27.000Z",
   "profile":{
      "displayName":"DESKTOP-EHAD3IE",
      "platform":"WINDOWS",
      "manufacturer":"International Corp",
      "model":"VMware7,1",
      "osVersion":"10.0.18362",
      "serialNumber":"56 4d 4f 95 74 c5 d3 e7-fc 3a 57 9c c2 f8 5d ce",
      "imei":null,
      "meid":null,
      "udid":"954F4D56-C574-E7D3-FC3A-579CC2F85DCE",
      "sid":"S-1-5-21-3992267483-1860856704-2413701314-500",
      "tpmPublicKeyHash":null,
      "registered":true,
      "managed":false,
      "secureHardwarePresent":false
   },
   "resourceId":"guo8jx5vVoxfvJeLb0w4",
   "resourceDisplayName":{
      "value":"DESKTOP-EHAD3IE",
      "sensitive":false
   },
   "resourceType":"UDDevice",
   "resourceAlternateId":null,
   "_links":{
      "suspend":{
         "href":"https://${yourOktaDomain}/api/v1/devices/guo8jx5vVoxfvJeLb0w4/lifecycle/suspend",
         "hints":{
            "allow":[
               "POST"
            ]
         }
      },
      "self":{
         "href":"https://${yourOktaDomain}/api/v1/devices/guo8jx5vVoxfvJeLb0w4",
         "hints":{
            "allow":[
               "GET",
               "PATCH",
               "PUT"
            ]
         }
      },
      "users":{
         "href":"https://${yourOktaDomain}/api/v1/devices/guo8jx5vVoxfvJeLb0w4/users",
         "hints":{
            "allow":[
               "GET"
            ]
         }
      },
      "deactivate":{
         "href":"https://${yourOktaDomain}/api/v1/devices/guo8jx5vVoxfvJeLb0w4/lifecycle/deactivate",
         "hints":{
            "allow":[
               "POST"
            ]
         }
      }
   }
}
```
### Device Status

> More details on [Device Lifecycle](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/devices/manage-device-lifecycle.htm)

The following diagram shows the state object for a Device:
![Device lifecycle flow](/img/okta-device-status.png "Device lifecycle flow")

> **Note:**
> 1. Okta Verify enrollment results in a device being created in device inventory. The newly-created device has an `ACTIVE` status. 
> 2. Device deactivation renders associated assets&mdash;such as device factors and management certificates&mdash;unusable. The Device re-enrollment/add account flow via Okta Verify allows end users to setup new factors (sign-in methods) on the device.
> 3. Deletion of the device after deactivation also deletes the device record from Okta. Re-enrollment of Okta Verify creates a new device record.


### Device profile object

#### Device profile properties

| Property           | Type       | Description                                                                                   |
| :----------------- | :--------- | :---------------------------------------------------------------------------------------------|
| `displayName`      | String     | Display name of the device. (1-255 characters)                                                |
| `platform`         | String     | OS platform of the device. Possible values: `MACOS`, `WINDOWS`, `ANDROID`, `IOS`              |
| `registered`       | Boolean    | Indicates if the device is registered at Okta.                                                 |
| `managed`          | Boolean    | Indicates if the device is managed by MDM providers.                                           |
| `imei`             | String     | (Optional) International Mobile Equipment Identity of the device. (15-17 numeric characters)  |
| `manufacturer`     | String     | (Optional) Name of the manufacturer of the device. (0-127 characters)                         |
| `meid`             | String     | (Optional) Mobile equipment identifier of the device. (14 characters)                         |
| `model`            | String     | (Optional) Model of the device. (127 characters)                                              |
| `osVersion`        | String     | (Optional) Version of the device OS. (127 characters)                                         |
| `serialNumber`     | String     | (Optional) Serial number of the device. (127 characters)                                      |
| `sid`              | String     | (Optional) Windows Security identifier of the device. (256 characters)                        |
| `udid`             | String     | (Optional) macOS Unique Device identifier of the device. (47 characters)                      |
| `tpmPublicKeyHash` | String     | (Optional) Windows Trsted Platform Module hash value.                                         |
| `secureHardwarePresent` | Boolean    | (Optional) Indicates if the device constains a secure hardware functionality.            |

#### Device profile example

```json
{
    "profile": {
        "displayName": "Bob - New Device",
        "platform": "MACOS",
        "manufacturer": "Apple Inc.",
        "model": "Macbook Pro 15",
        "osVersion": "10.14.6",
        "serialNumber": "C02VW333HTDF",
        "imei": null,
        "meid": null,
        "udid": "36A56558-1793-5B3A-8362-ECBAA14EDD2D",
        "sid": null
    }
}
```

#### Device object link attributes

For a Device result, the `_links` contains a full set of operations available for that device. `hints` provides information on allowed HTTP verbs for the `href`.

Here are some links that may be available on a Device, as determined by its status:

| Link relation type       | Description                                                                                                           |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| `self`                   | A self-referential link to this device                                                                                |
| `activate`               | Lifecycle action to [activate the device](#activate-device)                                                           |
| `deactivate`             | Lifecycle action to [deactivate the device](#deactivate-device)                                                       |
| `suspend`                | Lifecycle action to [suspend the device](#suspend-device)                                                             |
| `unsuspend`              | Lifecycle action to [unsuspend the device](#unsuspend-device)                                                         |

For example, a device with a `CREATED` status has the following `_links`:

```json
"_links": {
        "activate": {
            "href": "https://${yourOktaDomain}/api/v1/devices/guo4a5u7JHHhjXrMK0g4/lifecycle/activate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/devices/guo4a5u7JHHhjXrMK0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PATCH",
                    "PUT"
                ]
            }
        },
        "users": {
            "href": "https://${yourOktaDomain}/api/v1/devices/guo4a5u7JHHhjXrMK0g4/users",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
```
