---
title: Devices
category: management
---

# Device API

<ApiLifecycle access="ea" />

The Okta Device API provides centralized integration platform to store and manage device information. Okta administrators can use these APIs to manage workfoce identity device object information.

The Device API supports the following **Device Operations**:
* Get, Create, Update, Delete device objects.
* Perform lifecycle transitions on the device objects.
* Link devices to the users and manage these links.

> **Note** Important information on administrator operations is availale on this page: [Administer Devices Inventory](https://okta.com)

## Getting Started

Explore the Device API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/ab22761da96ff7a7ab0c)

## Device Operations

##### The Device API has the following operations:

* [Get a Device](#get-a-device-by-id)
* [List Devices](#list-devices)
* [Create Device](#create-device)
* [Update Device (Complete)](#update-device-complete)
* [Update Device (Partial)](#update-device-partial)
* [Delete Device](#delete-device)

##### Device lifecycle operation

* [Activate](#activate-device)
* [Deactivate](#deactivate-device)
* [Suspend](#suspend-device)
* [Unsuspend](#unsuspend-device)

##### Device User link operations

* [List Users Linked to a Device](#list-users-linked-to-a-device)
* [Get a User Linked to a Device](#get-a-user-linked-to-a-device)
* [Create a Device and User Link](#create-a-device-and-user-link)
* [Delete a Device and User Link](#delete-a-device-and-user-link)
* [Delete All User Links of a Device](#delete-all-user-links-of-a-device)

### Get a Device by ID

<ApiOperation method="get" url="/api/v1/devices/${deviceId}" />

Fetches a Device by its `id`. If you don't know the device `id`, you can [List Devices](#list-devices).

Populated links indicate allowed actions on the device in the current status.

##### Request Path Parameters

| Parameter   | Type   | Description                                                             |
| ----------- | ------ | ----------------------------------------------------------------------- |
| `deviceId`  | String | The `id` of [Device](#device-model) object                              |

##### Request Query Parameters

None

##### Request Body

None

##### Response Body

The requested [Device](#device-model).

##### Usage Example

This request fetches a Device object with an `id` value `ftrZooGoT8b41iWRiQs7`:

###### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/devices/guo4a5u7JHHhjXrMK0g4"
```

###### Response

```json
{
    "id": "ftrZooGoT8b41iWRiQs7",
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
        "sid": "S-1-11-111"
    },
    "_links": {
        "activate": {
            "href": "https://{yourOktaDomain}/api/v1/devices/guo4a5u7JHHhjXrMK0g4/lifecycle/activate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/devices/guo4a5u7JHHhjXrMK0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PATCH",
                    "PUT"
                ]
            }
        },
        "devices": {
            "href": "https://{yourOktaDomain}/api/v1/devices/guo4a5u7JHHhjXrMK0g4/devices",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```
##### Error Response

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

Fetches a list of all devices that are not `DELETED` for your org. Response will be paginated with maximum size of 200 devices.

A subset of devices can be returned that match a supported search criteria using `search` query parameter.

Searches for devices based on the properties specified in the `search` parameter conforming SCIM filter specifications (case insensitive). This data will be eventually consistent. Different results are returned depending on specified queries in the request. Empty list will be returned if no objects match `search` request.

> **Note:** Listing devices with `search` should not be used as a part of any critical flows, like authentication, updates etc. to prevent potential data loss. `search` results may not reflect latest information, as this endpoint uses a search index which may not be up to date with recent updates to the object.

Don't use search results directly for record updates, as the data might be stale and therefore overwrite newer data (data loss).
Use an ID lookup for records that you update to ensure your results contain the latest data.

This operation:

* Supports pagination (to a maximum of 200 results).
* Requires [URL encoding](http://en.wikipedia.org/wiki/Percent-encoding).
For example, `search=profile.displayName eq "Bob"` is encoded as `search=profile.displayName%20eq%20%22Bob%22`.
Examples use cURL-style escaping instead of URL encoding to make them easier to read.

* Searches many properties:
   - Any device profile property
   - The top-level properties `id`, `status` and `lastUpdated`

| Search Term Example                             | Description                                      |
| :---------------------------------------------- | :----------------------------------------------- |
| `status eq "ACTIVE"`                            | devices that have a `status` of `ACTIVE`         |
| `lastUpdated gt "yyyy-MM-dd'T'HH:mm:ss.SSSZ"`   | devices last updated after a specific timestamp  |
| `id eq "guo4a5u7JHHhjXrMK0g4"`                  | devices with a specified `id`                    |
| `profile.displayName eq "Bob"`                  | devices that have a `displayName` of `Bob`       |
| `profile.platform eq "WINDOWS"`                 | devices that have an `platform` of `WINDOWS`     |
| `profile.sid sw "S-1" `                         | devices whose `sid` starts with `S-1`            |

List devices with a platform of `MACOS`

```
search=profile.platform eq "MACOS"
```

List devices with displayName starting with of `Eng-dev` that were created before `01/01/2014` or have a status of `ACTIVE`.

```
search=profile.displayName sw "Eng-dev" and (created lt "2014-01-01T00:00:00.000Z" or status eq "ACTIVE")
```

##### Request Path Parameters

None

##### Request Query Parameters

| Parameter   | Type   | Description                                                                                                               |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| `search`    | String | Searches for devices with a supported [filtering](/docs/reference/api-overview/#filtering) expression for most properties |
| `limit`     | Number | Specifies the number of results returned (maximum 200)                                                                    |
| `after`     | String | Specifies the pagination cursor for the next page of devices                                                              |

  * If you don't specify a value for `limit`, the maximum (200) is used as a default.
  * Treat the `after` cursor as an opaque value and obtain it through the next link relation. See [Pagination](/docs/reference/api-overview/#pagination).

##### Request Body

None

##### Response Body

Array of [Device](#device-model) objects.

##### Usage Example

###### Request

The following request returns a list of all available devices, without any query parameters. Returns a list of all devices that are not `DELETED`, up to the maximum (200). This data is always consistent with the latest states of the devices.

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/devices"
```

###### Response

```json
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://{yourOktaDomain}/api/v1/devices?limit=200>; rel="self"
Link: <https://{yourOktaDomain}/api/v1/devices?after=guo4a5u7YAHhjXrMN0g4&limit=200>; rel="next"

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
        "sid": "S-1-11-111"
    },
    "_links": {
        "activate": {
            "href": "https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4/lifecycle/activate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PATCH",
                    "PUT"
                ]
            }
        },
        "users": {
            "href": "https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4/users",
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
        "sid": "S-1-22-2222"
    },
    "_links": {
        "activate": {
            "href": "https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMN0g4/lifecycle/activate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMN0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PATCH",
                    "PUT"
                ]
            }
        },
        "users": {
            "href": "https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMN0g4/users",
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

###### Request (`search`)

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/devices?search=profile.displayName+sw+\"Eng-dev\"+and+status+eq+\"ACTIVE\""
```

###### Response

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
          "sid": ""
      },
      "_links": {
          "activate": {
              "href": "https://{yourOktaDomain}/api/v1/devices/guo4a5u7JHHhjXrMK0g4/lifecycle/activate",
              "hints": {
                  "allow": [
                      "POST"
                  ]
              }
          },
          "self": {
              "href": "https://{yourOktaDomain}/api/v1/devices/guo4a5u7JHHhjXrMK0g4",
              "hints": {
                  "allow": [
                      "GET",
                      "PATCH",
                      "PUT"
                  ]
              }
          },
          "users": {
              "href": "https://{yourOktaDomain}/api/v1/devices/guo4a5u7JHHhjXrMK0g4/users",
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

### Create Device

<ApiOperation method="post" url="/api/v1/devices" />

Creates a Device object. Device will be in `CREATED` status as a result of a successful operation. Device profile values provided in this operation will be set on the device.

* Device profile attributes `displayName` and `platform` are mandatory for a Device and can't be set it to null/empty. 
* Device profile attibutes should follow formats specified in [device profile properties](#profile-object).

##### Request Path Parameters

None

##### Request Query Parameters

None

##### Request Body

[Device Profile Object](#profile-object)

##### Response Body

Returns a [Device](#device-model) containing device profile and all the relevant links populated. Populated links indicate allowed actions on the device in the current status.

##### Usage Example

###### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "profile": {
        "displayName": "Bob macbook",
        "serialNumber": "C02VW2LFHTCS",
        "platform": "MACOS",
        "udid" : "36A56856-17A3-5BCA-8F62-ECBZX14EEE2D"
    }
}' "https://{yourOktaDomain}/api/v1/devices"
```

###### Response

```json
{
    "id": "guo4agyzy9UVM6Vmr0g4",
    "status": "CREATED",
    "created": "2019-10-07T19:10:40.000Z",
    "lastUpdated": "2019-10-07T19:10:40.000Z",
    "profile": {
        "displayName": "Bob macbook",
        "platform": "MACOS",
        "manufacturer": null,
        "model": null,
        "osVersion": null,
        "serialNumber": "C02VW2LFHTCS",
        "imei": null,
        "meid": null,
        "udid": "36A56856-17A3-5BCA-8F62-ECBZX14EEE2D",
        "sid": null
    },
    "_links": {
        "activate": {
            "href": "https://{yourOktaDomain}/api/v1/devices/guo4agyzy9UVM6Vmr0g4/lifecycle/activate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/devices/guo4agyzy9UVM6Vmr0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PATCH",
                    "PUT"
                ]
            }
        },
        "users": {
            "href": "https://{yourOktaDomain}/api/v1/devices/guo4agyzy9UVM6Vmr0g4/users",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```

### Update Device (Complete)

<ApiOperation method="put" url="/api/v1/devices/${deviceId}" />

Updates a Device profile using strict-update semantics.

All profile properties must be specified when updating a Device's profile with a `PUT` method. Any `profile` property not specified
in the request is deleted. 

`PUT` operation also could be used to make `status` change on the device object. Such status change could be done using
same payload along with strict-update semantics of device profile. `status` is not affected if not part of the PUT request. All the device `status` changes are goverened, as per
[device lifecycle operations](#lifecycle-operations)

* Device profile attributes `displayName` and `platform` are mandatory for a Device and can't be set to null/empty.
* Device status attribute `status` can not be updated to empty.
* Device profile attibutes should follow formats specified in [device profile properties](#profile-object).

>**Note** `PUT` can't be used for partial updates. Unspecified attribute values will be deleted.

##### Request Path Parameters

| Parameter   | Type   | Description                                                             |
| ----------- | ------ | ----------------------------------------------------------------------- |
| `deviceId`  | String | The `id` of [Device](#device-model) object                              |

##### Request Query Parameters

None.

##### Request Body

Update [request](#update-request)

##### Response Body

Updated [Device](#device-model)

##### Usage Example

###### Request

>**Note** This request would update the `status` to `SUSPENDED`, along with changes in the device `profile` properties. If you wish to simply update device `profile`, do not include `status` in the request.

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "status": "SUSPENDED",
  "profile": {
      "displayName": "John Device",
      "platform": "MACOS",
      "manufacturer": "Apple Inc",
      "model": "Macbook Pro 15"
  }
}' "https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4"
```

###### Response

```json
{
    "id": "guo4a5u7YAHhjXrMK0g4",
    "status": "SUSPENDED",
    "created": "2019-10-02T18:03:07.000Z",
    "lastUpdated": "2019-10-07T17:20:37.000Z",
    "profile": {
        "displayName": "John Device",
        "platform": "MACOS",
        "manufacturer": "Apple Inc",
        "model": "Macbook Pro 15",
        "osVersion": null,
        "serialNumber": null,
        "imei": null,
        "meid": null,
        "udid": null,
        "sid": null
    },
    "_links": {
        "unsuspend": {
            "href": "https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4/lifecycle/unsuspend",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PATCH",
                    "PUT"
                ]
            }
        },
        "users": {
            "href": "https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4/users",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "deactivate": {
            "href": "https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Update Device (Partial)

<ApiOperation method="patch" url="/api/v1/devices/${deviceId}" />

Updates a Device's profile with partial update semantics. Device profile properties that are to be updated should be provided as an array of [JSON patch request](https://tools.ietf.org/html/rfc6902#section-3).
API supports `add`, `replace` and `remove` operations.

* Device profile attributes `displayName` and `platform` are mandatory for a Device and can't be set it to null/empty.
* Device profile attibutes should follow formats specified in [device profile properties](#profile-object).
* API does *not* allow updating `status`.
* API supports patch on a single object instance.

> **Note:** Use the `PATCH` method to make a partial device profile updates.

##### Request Path Parameters

| Parameter   | Type   | Description                                                             |
| ----------- | ------ | ----------------------------------------------------------------------- |
| `deviceId`  | String | The `id` of [Device](#device-model) object                              |

##### Request Query Parameters

None

##### Request Body

Array of [JSON patch request](https://tools.ietf.org/html/rfc6902#section-3)

##### Response Body

Updated [Device](#device-model)

##### Usage Example

###### Request

```bash
curl -v -X PATCH \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '[
    {
        "op": "replace",
        "path": "/profile/displayName",
        "value": "Bob - New Device"
    },{
        "op": "replace",
        "path": "/profile/osVersion",
        "value": "17134.707"
    }
]' "https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4"
```

###### Response

```json
{
    "id": "guo4a5u7YAHhjXrMK0g4",
    "status": "CREATED",
    "created": "2019-10-02T18:03:07.000Z",
    "lastUpdated": "2019-10-07T17:15:41.000Z",
    "profile": {
        "displayName": "Bob - New Device",
        "platform": "WINDOWS",
        "manufacturer": null,
        "model": null,
        "osVersion": "17134.707",
        "serialNumber": "Serial-Number-4",
        "imei": null,
        "meid": null,
        "udid": null,
        "sid": "S-1-14-2"
    },
    "_links": {
        "activate": {
            "href": "https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4/lifecycle/activate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PATCH",
                    "PUT"
                ]
            }
        },
        "users": {
            "href": "https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4/users",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```

### Delete Device

<ApiOperation method="delete" url="/api/v1/devices/${deviceId}" />

Permanantly deletes a Device that is in `DEACTIVATED` status. Device could be transitioned to `DEACTIVATED` status using [deactivate](#deactivate-device) API. 
This deletion is destructive and would delete all the profile data related to
the device. Once deleted, device data can't be recovered. Device that is not in `DEACTIVATED` status will raise an error if delete operation is attempted.

##### Request Path Parameters

| Parameter   | Type   | Description                                                             |
| ----------- | ------ | ----------------------------------------------------------------------- |
| `deviceId`  | String | The `id` of [Device](#device-model) object                              |

##### Request Query Parameters

None

##### Request Body

None

##### Response Body

None

* Passing an invalid `id` returns a `404 Not Found` status code with error code `E0000007`.

##### Usage Example

###### Request

```bash
curl -v -X DELETE \
-H "Authorization: SSWS ${api_token}" "https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4"

```

###### Response

```http
HTTP/1.1 204 OK
Content-Type: application/json
```

## Lifecycle Operations

Device Lifecycle operations are idempotent operations that make a Device lifecycle transition. These are synchronous calls.
Device object follows a predefinied [lifecycle transtion status diagram](#device-status). The device's current status limits which status it could transition to.
For example, device can be [Unsuspended](#unsuspend-device) only when it's in suspended status

### Activate Device

<ApiOperation method="post" url="/api/v1/devices/${deviceId}/lifecycle/activate" />

Activates a Device

This operation could be performed on the device with `CREATED`, `DEACTIVATED` status.
Device in `ACTIVE` status could be used to create or delete a link between device and user.

Activated devices:

* Can be used to create and delete device user links.
* Can only be [suspended](#suspend-device) or [deactivated](#deactivate-device).

This operation could also be accomplished using [update device with PUT](#update-device-with-put)

##### Request Path Parameters

| Parameter   | Type   | Description                                                             |
| ----------- | ------ | ----------------------------------------------------------------------- |
| `deviceId`  | String | The `id` of [Device](#device-model) object                              |

##### Request Query Parameters

None

##### Request Body

None

##### Response Body

None

##### Usage Example

###### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4/lifecycle/activate"
```

###### Response

```http
HTTP/1.1 204 OK
Content-Type: application/json
```
###### Error Response

* Passing an invalid `id` returns a `404 Not Found` status code with error code `E0000007`.
* Passing an `id` that is not in the `CREATED` or `DEACTIVATED` status returns a `400 Bad Request` status code with error code `E0000001`.

### Deactivate Device

<ApiOperation method="post" url="/api/v1/devices/${deviceId}/lifecycle/deactivate" />

Deactivates a Device

An `ACTIVE` or a `SUSPENDED` device could be `DEACTIVATED`. As a result of deactivation, device loses device user links. Device should be in `DEACTIVATED` status before it could be [deleted](#delete-device). 

Dectivated devices:

* Lose existing device user links.
* Can't be used to create device user links.
* Can be [activated](#activate-device).
* Can be [deleted](#delete-device).

> Important: Deactivating a Device is a **destructive** operation.  Device loses all the device user links.  **This action cannot be recovered.**

This operation could also be accomplished using [update device with PUT](#update-device-with-put)

##### Request Path Parameters

| Parameter   | Type   | Description                                                             |
| ----------- | ------ | ----------------------------------------------------------------------- |
| `deviceId`  | String | The `id` of [Device](#device-model) object                              |

##### Request Query Parameters

None

##### Request Body

None

##### Response Body

None

##### Usage Example

###### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4/lifecycle/deactivate"
```

###### Response

```http
HTTP/1.1 204 OK
Content-Type: application/json
```
###### Error Response

* Passing an invalid `id` returns a `404 Not Found` status code with error code `E0000007`.
* Passing an `id` that is not in the `ACTIVE` or `SUSPENEDED` status returns a `400 Bad Request` status code with error code `E0000001`.

### Suspend Device

<ApiOperation method="post" url="/api/v1/devices/${deviceId}/lifecycle/suspend" />

Suspends a Device

A device in `ACTIVE` status could be `SUSPENDED`. This status is meant to be temporary and hence not destructive in nature.

Suspended devices:

* Can be used to create and delete device user links.
* Can only be [unsuspended](#unsuspend-device) or [deactivated](#deactivate-device).

This operation could also be accomplished using [update device with PUT](#update-device-with-put)

##### Request Path Parameters

| Parameter   | Type   | Description                                                             |
| ----------- | ------ | ----------------------------------------------------------------------- |
| `deviceId`  | String | The `id` of [Device](#device-model) object                              |

##### Request Query Parameters

None

##### Request Body

None

##### Response Body

None

##### Usage Example

###### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4/lifecycle/suspend"
```

###### Response

```http
HTTP/1.1 204 OK
Content-Type: application/json
```
###### Error Response

* Passing an invalid `id` returns a `404 Not Found` status code with error code `E0000007`.
* Passing an `id` that is not in the `ACTIVE` status returns a `400 Bad Request` status code with error code `E0000001`.

### Unsuspend Device

<ApiOperation method="post" url="/api/v1/devices/${deviceId}/lifecycle/unsuspend" />

Unsuspends a Device and returns it to the `ACTIVE` status.

This operation can only be performed on a Device that is in `SUSPENDED` status.

##### Request Path Parameters

| Parameter   | Type   | Description                                                             |
| ----------- | ------ | ----------------------------------------------------------------------- |
| `deviceId`  | String | The `id` of [Device](#device-model) object                              |

##### Request Query Parameters

None

##### Request Body

None

##### Response Body

None

This operation could also be accomplished using [update device with PUT](#update-device-with-put)

##### Usage Example

###### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4/lifecycle/unsuspend"
```

###### Response

```http
HTTP/1.1 204 OK
Content-Type: application/json
```

###### Error Response

* Passing an invalid `id` returns a `404 Not Found` status code with error code `E0000007`.
* Passing an `id` that is not in the `SUSPENDED` status returns a `400 Bad Request` status code with error code `E0000001`.

## Related Resources

Learn more about Device and User link [here](#device-user-link).


### Device User Link operations for a User

Please refer [Device User operations](/docs/reference/api/users/#device-user-links) in Users API.


### List Users Linked to a Device

<ApiOperation method="get" url="/api/v1/devices/${deviceId}/users" />

Gets a list of users linked to a Device. 

##### Request Path Parameters

| Parameter   | Type   | Description                                                             |
| ----------- | ------ | ----------------------------------------------------------------------- |
| `deviceId`  | String | The `id` of [Device](#device-model) object                              |

##### Request Query Parameters

None

##### Request Body

None

##### Response Body

Array of [User](/docs/reference/api/users/#user-model)

##### Usage Example

###### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4/users"
```

###### Response

```json
[
  {
      "created": "2019-09-16T20:29:03.000Z",
      "user": {
          "id": "00u284bTkggwjV2Lv0w4",
          "status": "ACTIVE",
          "created": "2019-09-16T17:43:35.000Z",
          "activated": "2019-09-16T17:43:36.000Z",
          "statusChanged": "2019-09-16T17:43:36.000Z",
          "lastLogin": "2019-09-19T18:42:47.000Z",
          "lastUpdated": "2019-09-16T17:43:36.000Z",
          "passwordChanged": "2019-09-16T17:43:36.000Z",
          "profile": {
              "lastName": "Pierce",
              "zipCode": "94107",
              "manager": "robin_pierce491@okta.com",
              "city": "San Francisco",
              "secondEmail": "robin_pierce491@gmail.com",
              "login": "robin_pierce491@hacktest.com",
              "firstName": "DIP_Robin",
              "primaryPhone": "3938293386",
              "postalAddress": "301 Brannan Street, 3rd Floor, San Francisco, CA 94107, USA",
              "mobilePhone": "8845221614",
              "streetAddress": "303 Brannan Street, 3rd Floor",
              "countryCode": "US",
              "state": "CA",
              "email": "robin_pierce491@hacktest.com"
          },
          "credentials": {
              "password": {},
              "recovery_question": {
                  "question": "Who is your favorite sports player?"
              },
              "provider": {
                  "type": "OKTA",
                  "name": "OKTA"
              }
          },
          "_links": {
              "suspend": {
                  "href": "https://{yourOktaDomain}/api/v1/users/00u284bTkggwjV2Lv0w4/lifecycle/suspend",
                  "method": "POST"
              },
              "resetPassword": {
                  "href": "https://{yourOktaDomain}/api/v1/users/00u284bTkggwjV2Lv0w4/lifecycle/reset_password",
                  "method": "POST"
              },
              "forgotPassword": {
                  "href": "https://{yourOktaDomain}/api/v1/users/00u284bTkggwjV2Lv0w4/credentials/forgot_password",
                  "method": "POST"
              },
              "expirePassword": {
                  "href": "https://{yourOktaDomain}/api/v1/users/00u284bTkggwjV2Lv0w4/lifecycle/expire_password",
                  "method": "POST"
              },
              "changeRecoveryQuestion": {
                  "href": "https://{yourOktaDomain}/api/v1/users/00u284bTkggwjV2Lv0w4/credentials/change_recovery_question",
                  "method": "POST"
              },
              "self": {
                  "href": "https://{yourOktaDomain}/api/v1/users/00u284bTkggwjV2Lv0w4"
              },
              "changePassword": {
                  "href": "https://{yourOktaDomain}/api/v1/users/00u284bTkggwjV2Lv0w4/credentials/change_password",
                  "method": "POST"
              },
              "deactivate": {
                  "href": "https://{yourOktaDomain}/api/v1/users/00u284bTkggwjV2Lv0w4/lifecycle/deactivate",
                  "method": "POST"
              }
          }
      }
  },
  {
      "created": "2019-09-16T20:29:03.000Z",
      "user": {
          "id": "00u22su1vjcpCaKhV0w4",
          "status": "ACTIVE",
          "created": "2019-09-16T19:43:24.000Z",
          "activated": "2019-09-16T19:43:26.000Z",
          "statusChanged": "2019-09-16T19:43:26.000Z",
          "lastLogin": "2019-09-19T19:00:13.000Z",
          "lastUpdated": "2019-09-16T19:43:26.000Z",
          "passwordChanged": "2019-09-16T19:43:25.000Z",
          "profile": {
              "lastName": "Hardy",
              "zipCode": "94107",
              "manager": "bethany_hardy35@okta.com",
              "city": "San Francisco",
              "secondEmail": "bethany_hardy35@gmail.com",
              "login": "bethany_hardy35@hacktest.com",
              "firstName": "DIP_Bethany",
              "primaryPhone": "9763054402",
              "postalAddress": "301 Brannan Street, 3rd Floor, San Francisco, CA 94107, USA",
              "mobilePhone": "2252598080",
              "streetAddress": "303 Brannan Street, 3rd Floor",
              "countryCode": "US",
              "state": "CA",
              "email": "bethany_hardy35@hacktest.com"
          },
          "credentials": {
              "password": {},
              "recovery_question": {
                  "question": "Who is your favorite sports player?"
              },
              "provider": {
                  "type": "OKTA",
                  "name": "OKTA"
              }
          },
          "_links": {
              "suspend": {
                  "href": "https://{yourOktaDomain}/api/v1/users/00u22su1vjcpCaKhV0w4/lifecycle/suspend",
                  "method": "POST"
              },
              "resetPassword": {
                  "href": "https://{yourOktaDomain}/api/v1/users/00u22su1vjcpCaKhV0w4/lifecycle/reset_password",
                  "method": "POST"
              },
              "forgotPassword": {
                  "href": "https://{yourOktaDomain}/api/v1/users/00u22su1vjcpCaKhV0w4/credentials/forgot_password",
                  "method": "POST"
              },
              "expirePassword": {
                  "href": "https://{yourOktaDomain}/api/v1/users/00u22su1vjcpCaKhV0w4/lifecycle/expire_password",
                  "method": "POST"
              },
              "changeRecoveryQuestion": {
                  "href": "https://{yourOktaDomain}/api/v1/users/00u22su1vjcpCaKhV0w4/credentials/change_recovery_question",
                  "method": "POST"
              },
              "self": {
                  "href": "https://{yourOktaDomain}/api/v1/users/00u22su1vjcpCaKhV0w4"
              },
              "changePassword": {
                  "href": "https://{yourOktaDomain}/api/v1/users/00u22su1vjcpCaKhV0w4/credentials/change_password",
                  "method": "POST"
              },
              "deactivate": {
                  "href": "https://{yourOktaDomain}/api/v1/users/00u22su1vjcpCaKhV0w4/lifecycle/deactivate",
                  "method": "POST"
              }
          }
      }
  }
]
```
###### Error Response

* Passing an invalid Device `id` returns a `404 Not Found` status code with error code `E0000007`.

### Get a User Linked to a Device

<ApiOperation method="get" url="/api/v1/devices/${deviceId}/users/${userId}" />

Gets a user linked to a Device. 

##### Request Path Parameters

| Parameter   | Type   | Description                                                             |
| ----------- | ------ | ----------------------------------------------------------------------- |
| `deviceId`  | String | The `id` of [Device](#device-model) object                              |
| `userId`    | String | The `id` of [User](/docs/reference/api/users/#user-model) object        |

##### Request Query Parameters

None

##### Request Body

None

##### Response Body

The linked [User](/docs/reference/api/users/#user-model)

##### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4/users/00u284bTkggwjV2Lv0w4"
```

##### Response

```json
{
    "created": "2019-09-16T20:29:03.000Z",
    "user": {
        "id": "00u284bTkggwjV2Lv0w4",
        "status": "ACTIVE",
        "created": "2019-09-16T17:43:35.000Z",
        "activated": "2019-09-16T17:43:36.000Z",
        "statusChanged": "2019-09-16T17:43:36.000Z",
        "lastLogin": "2019-09-19T18:42:47.000Z",
        "lastUpdated": "2019-09-16T17:43:36.000Z",
        "passwordChanged": "2019-09-16T17:43:36.000Z",
        "profile": {
            "lastName": "Pierce",
            "zipCode": "94107",
            "manager": "robin_pierce491@okta.com",
            "city": "San Francisco",
            "secondEmail": "robin_pierce491@gmail.com",
            "login": "robin_pierce491@hacktest.com",
            "firstName": "DIP_Robin",
            "primaryPhone": "3938293386",
            "postalAddress": "301 Brannan Street, 3rd Floor, San Francisco, CA 94107, USA",
            "mobilePhone": "8845221614",
            "streetAddress": "303 Brannan Street, 3rd Floor",
            "countryCode": "US",
            "state": "CA",
            "email": "robin_pierce491@hacktest.com"
        },
        "credentials": {
            "password": {},
            "recovery_question": {
                "question": "Who is your favorite sports player?"
            },
            "provider": {
                "type": "OKTA",
                "name": "OKTA"
            }
        },
        "_links": {
            "suspend": {
                "href": "https://{yourOktaDomain}/api/v1/users/00u284bTkggwjV2Lv0w4/lifecycle/suspend",
                "method": "POST"
            },
            "resetPassword": {
                "href": "https://{yourOktaDomain}/api/v1/users/00u284bTkggwjV2Lv0w4/lifecycle/reset_password",
                "method": "POST"
            },
            "forgotPassword": {
                "href": "https://{yourOktaDomain}/api/v1/users/00u284bTkggwjV2Lv0w4/credentials/forgot_password",
                "method": "POST"
            },
            "expirePassword": {
                "href": "https://{yourOktaDomain}/api/v1/users/00u284bTkggwjV2Lv0w4/lifecycle/expire_password",
                "method": "POST"
            },
            "changeRecoveryQuestion": {
                "href": "https://{yourOktaDomain}/api/v1/users/00u284bTkggwjV2Lv0w4/credentials/change_recovery_question",
                "method": "POST"
            },
            "self": {
                "href": "https://{yourOktaDomain}/api/v1/users/00u284bTkggwjV2Lv0w4"
            },
            "changePassword": {
                "href": "https://{yourOktaDomain}/api/v1/users/00u284bTkggwjV2Lv0w4/credentials/change_password",
                "method": "POST"
            },
            "deactivate": {
                "href": "https://{yourOktaDomain}/api/v1/users/00u284bTkggwjV2Lv0w4/lifecycle/deactivate",
                "method": "POST"
            }
        }
    }
}
```
###### Error Response

* Passing an invalid User or Device `id` returns a `404 Not Found` status code with error code `E0000007`.

### Create a Device and User Link

<ApiOperation method="put" url="/api/v1/devices/${deviceId}/users/${userId}" />

Creates a Device and User link. Device and User link creation is permitted if Device is `ACTIVE` or `SUSPENDED` status and User is in `ACTIVE` status. If such a link already exists, then this API will do nothing.

##### Request Path Parameters

| Parameter   | Type   | Description                                                             |
| ----------- | ------ | ----------------------------------------------------------------------- |
| `deviceId`  | String | The `id` of [Device](#device-model) object                              |
| `userId`    | String | The `id` of [User](/docs/reference/api/users/#user-model) object        |

##### Request Query Parameters

None

##### Request Body

None

##### Response Body

The linked [User](/docs/reference/api/users/#user-model) to the Device.

##### Usage Example

###### Request

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4/users/00u22su1vjcpCaKhV0w4"
```

###### Response

```json
 {
      "created": "2019-09-16T20:29:03.000Z",
      "user": {
          "id": "00u22su1vjcpCaKhV0w4",
          "status": "ACTIVE",
          "created": "2019-09-16T19:43:24.000Z",
          "activated": "2019-09-16T19:43:26.000Z",
          "statusChanged": "2019-09-16T19:43:26.000Z",
          "lastLogin": "2019-09-19T19:00:13.000Z",
          "lastUpdated": "2019-09-16T19:43:26.000Z",
          "passwordChanged": "2019-09-16T19:43:25.000Z",
          "profile": {
              "lastName": "Hardy",
              "zipCode": "94107",
              "manager": "bethany_hardy35@okta.com",
              "city": "San Francisco",
              "secondEmail": "bethany_hardy35@gmail.com",
              "login": "bethany_hardy35@hacktest.com",
              "firstName": "DIP_Bethany",
              "primaryPhone": "9763054402",
              "postalAddress": "301 Brannan Street, 3rd Floor, San Francisco, CA 94107, USA",
              "mobilePhone": "2252598080",
              "streetAddress": "303 Brannan Street, 3rd Floor",
              "countryCode": "US",
              "state": "CA",
              "email": "bethany_hardy35@hacktest.com"
          },
          "credentials": {
              "password": {},
              "recovery_question": {
                  "question": "Who is your favorite sports player?"
              },
              "provider": {
                  "type": "OKTA",
                  "name": "OKTA"
              }
          },
          "_links": {
              "suspend": {
                  "href": "https://{yourOktaDomain}/api/v1/users/00u22su1vjcpCaKhV0w4/lifecycle/suspend",
                  "method": "POST"
              },
              "resetPassword": {
                  "href": "https://{yourOktaDomain}/api/v1/users/00u22su1vjcpCaKhV0w4/lifecycle/reset_password",
                  "method": "POST"
              },
              "forgotPassword": {
                  "href": "https://{yourOktaDomain}/api/v1/users/00u22su1vjcpCaKhV0w4/credentials/forgot_password",
                  "method": "POST"
              },
              "expirePassword": {
                  "href": "https://{yourOktaDomain}/api/v1/users/00u22su1vjcpCaKhV0w4/lifecycle/expire_password",
                  "method": "POST"
              },
              "changeRecoveryQuestion": {
                  "href": "https://{yourOktaDomain}/api/v1/users/00u22su1vjcpCaKhV0w4/credentials/change_recovery_question",
                  "method": "POST"
              },
              "self": {
                  "href": "https://{yourOktaDomain}/api/v1/users/00u22su1vjcpCaKhV0w4"
              },
              "changePassword": {
                  "href": "https://{yourOktaDomain}/api/v1/users/00u22su1vjcpCaKhV0w4/credentials/change_password",
                  "method": "POST"
              },
              "deactivate": {
                  "href": "https://{yourOktaDomain}/api/v1/users/00u22su1vjcpCaKhV0w4/lifecycle/deactivate",
                  "method": "POST"
              }
          }
      }
  }
```

###### Error Response

* Passing an invalid User or Device `id` returns a `404 Not Found` status code with error code `E0000007`.


### Delete a Device and User Link

<ApiOperation method="delete" url="/api/v1/devices/${deviceId}/users/${userId}" />

Deletes a Device and User link. Similar to [Delete a User and Device Link](/docs/reference/api/users/#delete-a-user-and-device-link)

##### Request Path Parameters

| Parameter   | Type   | Description                                                             |
| ----------- | ------ | ----------------------------------------------------------------------- |
| `deviceId`  | String | The `id` of [Device](#device-model) object                              |
| `userId`    | String | The `id` of [User](/docs/reference/api/users/#user-model) object        |

##### Request Query Parameters

None

##### Request Body

None

##### Response Body

None

##### Usage Example

###### Request

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4/users/00u22su1vjcpCaKhV0w4"
```

###### Response

```http
HTTP/1.1 204 OK
Content-Type: application/json
```

###### Error Response

* Passing an invalid User or Device `id` returns a `404 Not Found` status code with error code `E0000007`.
* If the Device User link does not exists, returns a `404 Not Found` status code with error code `E0000007`.

### Delete All User Links of a Device

<ApiOperation method="delete" url="/api/v1/devices/${deviceId}/users" />

Deletes all Device and User links for the given device. 

##### Request Path Parameters

| Parameter   | Type   | Description                                                             |
| ----------- | ------ | ----------------------------------------------------------------------- |
| `deviceId`  | String | The `id` of [Device](#device-model) object                              |

##### Request Query Parameters

None

##### Request Body

None

##### Response Body

None

##### Usage Example

###### Request

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/devices/guo4a5u7YAHhjXrMK0g4/users"
```

###### Response

```http
HTTP/1.1 204 OK
Content-Type: application/json
```
###### Error Response

* Passing an invalid Device `id` returns a `404 Not Found` status code with error code `E0000007`.


## Schema

### Device Schema

<ApiOperation method="get" url="/api/v1/meta/schemas/device/default" />

Fetches a Device schema from Okta service. API clients can use this schema to validate device object.

##### Request Path Parameters

None

##### Request Query Parameters

None

##### Usage Example

###### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/meta/schemas/device/default"
```

###### Response

```json
{
   "id":"https://{yourOktaDomain}/meta/schemas/device/default",
   "$schema":"http://json-schema.org/draft-04/schema#",
   "name":"okta_device_profile_v1",
   "title":"Okta Device Profile",
   "lastUpdated":"2019-09-16T20:22:55.000Z",
   "created":"2019-09-16T20:22:55.000Z",
   "definitions":{
      "custom":{
         "id":"#custom",
         "type":"object",
         "properties":{

         }
      },
      "base":{ 
         "id":"#base",
         "type":"object",
         "properties":{
            "displayName":{
               "title":"Display Name",
               "description":"Display name of the device",
               "type":"string",
               "mutability":"READ_WRITE",
               "scope":"NONE",
               "maxLength":255,
               "permissions":[
                  {
                     "principal":"SELF",
                     "action":"READ_WRITE"
                  }
               ],
               "master":{
                  "type":"PROFILE_MASTER"
               }
            },
            "platform":{
               "title":"Platform",
               "description":"Device platform",
               "type":"string",
               "mutability":"READ_WRITE",
               "scope":"NONE",
               "enum":[
                  "ANDROID",
                  "IOS",
                  "MACOS",
                  "WINDOWS"
               ],
               "oneOf":[
                  {
                     "const":"ANDROID",
                     "title":"Android device"
                  },
                  {
                     "const":"IOS",
                     "title":"iOS device"
                  },
                  {
                     "const":"MACOS",
                     "title":"macOS device"
                  },
                  {
                     "const":"WINDOWS",
                     "title":"Windows desktop device"
                  }
               ],
               "permissions":[
                  {
                     "principal":"SELF",
                     "action":"READ_WRITE"
                  }
               ],
               "master":{
                  "type":"PROFILE_MASTER"
               }
            },
            "manufacturer":{
               "title":"Manufacturer",
               "description":"Manufacturer of the device",
               "type":"string",
               "mutability":"READ_WRITE",
               "scope":"NONE",
               "maxLength":127,
               "permissions":[
                  {
                     "principal":"SELF",
                     "action":"READ_WRITE"
                  }
               ],
               "master":{
                  "type":"PROFILE_MASTER"
               }
            },
            "model":{
               "title":"Model",
               "description":"Model of the device",
               "type":"string",
               "mutability":"READ_WRITE",
               "scope":"NONE",
               "maxLength":127,
               "permissions":[
                  {
                     "principal":"SELF",
                     "action":"READ_WRITE"
                  }
               ],
               "master":{
                  "type":"PROFILE_MASTER"
               }
            },
            "osVersion":{
               "title":"OS Version",
               "description":"Version of device OS",
               "type":"string",
               "mutability":"READ_WRITE",
               "scope":"NONE",
               "maxLength":127,
               "permissions":[
                  {
                     "principal":"SELF",
                     "action":"READ_WRITE"
                  }
               ],
               "master":{
                  "type":"PROFILE_MASTER"
               }
            },
            "serialNumber":{
               "title":"Serial Number",
               "description":"Serial number of the device",
               "type":"string",
               "mutability":"READ_WRITE",
               "scope":"NONE",
               "maxLength":127,
               "permissions":[
                  {
                     "principal":"SELF",
                     "action":"READ_WRITE"
                  }
               ],
               "master":{
                  "type":"PROFILE_MASTER"
               }
            },
            "imei":{
               "title":"IMEI",
               "description":"International Mobile Equipment Identity of the device",
               "type":"string",
               "mutability":"READ_WRITE",
               "scope":"NONE",
               "minLength":15,
               "maxLength":17,
               "permissions":[
                  {
                     "principal":"SELF",
                     "action":"READ_WRITE"
                  }
               ],
               "master":{
                  "type":"PROFILE_MASTER"
               }
            },
            "meid":{
               "title":"MEID",
               "description":"Mobile Equipment Identity of the device",
               "type":"string",
               "mutability":"READ_WRITE",
               "scope":"NONE",
               "minLength":14,
               "maxLength":14,
               "permissions":[
                  {
                     "principal":"SELF",
                     "action":"READ_WRITE"
                  }
               ],
               "master":{
                  "type":"PROFILE_MASTER"
               }
            },
            "udid":{
               "title":"UDID",
               "description":"Universal device identifier for Mac and IOS",
               "type":"string",
               "mutability":"READ_WRITE",
               "scope":"NONE",
               "maxLength":47,
               "permissions":[
                  {
                     "principal":"SELF",
                     "action":"READ_WRITE"
                  }
               ],
               "master":{
                  "type":"PROFILE_MASTER"
               }
            },
            "sid":{
               "title":"Security Identifier",
               "description":"Active Directory Domain SID",
               "type":"string",
               "mutability":"READ_WRITE",
               "scope":"NONE",
               "maxLength":256,
               "permissions":[
                  {
                     "principal":"SELF",
                     "action":"READ_WRITE"
                  }
               ],
               "master":{
                  "type":"PROFILE_MASTER"
               }
            }
         },
         "required":[
            "displayName",
            "platform"
         ]
      }
   },
   "type":"object",
   "properties":{
      "profile":{
         "anyOf":[
            {
               "$ref":"#/definitions/custom"
            },
            {
               "$ref":"#/definitions/base"
            }
         ]
      }
   }
}
```
## Model

### Device Model

```json
{
    "id": "guo4a5u7JHHhjXrMK0g4",
    "status": "ACTIVE",
    "created": "2019-10-02T18:03:07.000Z",
    "lastUpdated": "2019-10-02T18:03:07.000Z",
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
    },
    "_links": {
        "activate": {
            "href": "https://{yourOktaDomain}/api/v1/devices/guo4a5u7JHHhjXrMK0g4/lifecycle/activate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/devices/guo4a5u7JHHhjXrMK0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PATCH",
                    "PUT"
                ]
            }
        },
        "users": {
            "href": "https://{yourOktaDomain}/api/v1/devices/guo4a5u7JHHhjXrMK0g4/users",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```

### Update request

Request to the [update Device (Complete)](#update-device-complete) consists of payload with (or without) `status` and [device profile](#profile-object) `profile`.
```json
{
  "status" : "SUSPENDED",
  "profile": {
      "displayName": "John Device",
      "platform" : "MACOS",
      "manufacturer": "Apple Inc",
      "model": "Macbook Pro 15"
  }
}
```

### Device Properties

The device model defines several read-only properties:

| Property                | Type                                      | Description                                                                                          |
| :---------------------- | :---------------------------------------- | :----------------------------------------------------------------------------------------------------|
| `id`                    | String                                    | Unique key for device                                                                                |
| `status`                | String                                    | Current [status](#device-status) of device. One of `CREATED`, `ACTIVE`, `SUSPENDED` or `DEACTIVATED` |
| `created`               | String                                    | Timestamp when device was created                                                                    |
| `lastUpdated`           | String                                    | Timestamp when device was last updated                                                               |
| `profile`               | [Profile Object](#profile-object)         | Device profile properties                                                                            |
| `_links`                | [Link](#devices-object-link-attributes)   | Allowed operations for the device                                                                    |

### Device Status

The following diagram shows the status model for a Device:

![CREATED, ACTIVE, SUSPENDED or DEACTIVATED](/img/okta-device-status.png "CREATED, ACTIVE, SUSPENDED or DEACTIVATED")

### Profile Object

Device profile properties.

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

#### Device Profile Properties

| Property           | Type       | Description                                                                                   |
| :----------------- | :--------- | :---------------------------------------------------------------------------------------------|
| `displayName`      | String     | Display name of the device. (1-255 characters)                                                |
| `platform`         | String     | OS platform of the device. One of the values from `MACOS`, `WINDOWS`, `ANDROID`, `IOS`        |
| `manufacturer`     | String     | (Optional) Name of the manufacturer of the device. (0-127 characters)                         |
| `model`            | String     | (Optional) Model of the device. (127 characters)                                              |
| `osVersion`        | String     | (Optional) Version of the device OS. (127 characters)                                         |
| `serialNumber`     | String     | (Optional) Serial number of the device. (127 characters)                                      |
| `imei`             | String     | (Optional) International Mobile Equipment Identity of the device. (15-17 numeric characters)  |
| `meid`             | String     | (Optional) Mobile equipment identifier of the device. (14 characters)                         |
| `udid`             | String     | (Optional) macOS Unique Device identifier of the device. (47 characters)                            |
| `sid`              | String     | (Optional) Windows Security identifier of the device. (256 characters)                        |

#### Device User Link

A device could be linked to one or more User objects or vice versa. With such a link you can fetch devices linked to a given user or users linked to a given device. This provides visibility to administrator to manage potential impact of user actions on linked device/(s) and vice versa. Device - User link is not represented by an API object of it's own, rather visibility of such a link is made available via various APIs listed [here](#device-user-link-operations).

#### Devices Object Link Attributes

For a Device result, the `_links` contains a full set of operations available for that device. `hints` provides information on `allow`ed HTTP verbs for the `href`.

For example: A device in `CREATED` status would have following `_links`.
```json
"_links": {
        "activate": {
            "href": "https://{yourOktaDomain}/api/v1/devices/{{deviceId}}/lifecycle/activate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/devices/{{deviceId}}",
            "hints": {
                "allow": [
                    "GET",
                    "PATCH",
                    "PUT"
                ]
            }
        },
        "users": {
            "href": "https://{yourOktaDomain}/api/v1/devices/{{deviceId}}/users",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
```

Here are some links that may be available on a Device, as determined by status of a Device:

| Link Relation Type       | Description                                                                                                           |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| `self`                   | A self-referential link to this device                                                                                |
| `activate`               | Lifecycle action to [activate the device](#activate-device)                                                           |
| `deactivate`             | Lifecycle action to [deactivate the device](#deactivate-device)                                                       |
| `suspend`                | Lifecycle action to [suspend the device](#suspend-device)                                                             |
| `unsuspend`              | Lifecycle action to [unsuspend the device](#unsuspend-device)                                                         |