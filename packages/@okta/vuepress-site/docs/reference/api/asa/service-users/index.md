---
title: ASA Service Users
category: asa
---

# ASA Service Users API

## Get started

The [Advanced Server Access (ASA) API](/docs/reference/api/asa/introduction/) is logically separate from the rest of the Okta APIs and uses a different API namespace:

`https://app.scaleft.com/v1/`

Advanced Server Access (ASA) Service Users are used to access the ASA API. ASA Service Users are provided tokens for authentication and authorization against the service.

Explore the Service Users API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/run-collection/fba803e43a4ae53667d4).


## Service Users API operations


The Service Users API has the following operations:
* [Issue a Service User token](#issue-a-service-user-token)
* [Lists the Service Users for a Team](#lists-the-service-users-for-a-team)
* [Create a Service User](#create-a-service-user)
* [Fetch a Service User](#fetch-a-service-user)
* [Update the status of a Service User](#update-the-status-of-a-service-user)
* [List the API keys for a Service User](#list-the-api-keys-for-a-service-user)
* [Rotate API keys for a Service User](#rotate-api-keys-for-a-service-user)
* [Delete an API key for a Service User](#delete-an-api-key-for-a-service-user)


### Issue a Service User token

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/service_token" />
Most calls to the Okta Advanced Server Access API require an HTTP Authorization header with a value of `Bearer ${AUTH_TOKEN}`.
To retrieve an auth token, you need to [create a Service User and API key](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_asa_service_users), then pass the API key information to this endpoint.
Auth tokens may expire at any time, so code that uses them should be prepared to handle a 401 response code by creating a new auth token.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `key_id`   | string | The ID of the API key |
| `key_secret`   | string | The secret associated with the API key |

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `bearer_token`   | string | The JSON Web Token used to authenticate against the ASA API |
| `expires_at`   | string | The time at which the token expires, formatted in accordance with [RFC 3339](https://tools.ietf.org/html/rfc3339) |
| `team_name`   | string | The name of the Team this token is for |

#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
--data '{
	"key_id": "6052868b-1b04-4a14-8288-e6496d7f2f4b",
	"key_secret": "uF0SoVBVQP/hJmQSLUZdM2a7ArYzjD8ykzvG7n4tKaOEfSErcwMUUDWpEf4Q42/HaVKPZUfILkzy/bsQFv7WRg=="
}' \
https://app.scaleft.com/v1/teams/${team_name}/service_token
```

##### Response

```json
{
	"bearer_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImI4YTAzODA0MTM0NjctNGU5OC04ZDU2LTAxNDRlNGNkMGViMCIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NzY4MTE1OTAsImlzcyI6InNjYWxlZnQuYXV0aC50b2tlbiIsImp0aSI6IjA0YjRhNTE4LWU5YzYtNDc1My05YWY4LThlOTAwNjVjNjX5YSIsInJvbGVzIjp7IjE0NzY4MTE1OTAiOm51bGx9LCJ0ZWFtIjoic2NhbGVmdCIsInVzZXIiOiJyb2JvdF9ydXNzZWxsIn0.pHuv06Q1-sKjHrGXUzQi-uM7AAG3K1Q6rpuxycR2Py6QHwLrto1uZmZt4wrBo6tQRCl3RjHBKGcDmEfBZ6_gFnckpFMkIXUT3sIDmOvSACthgprcXjfYh0KarEDmDnIMsEPl7FVhl4N_I0yLK9O5XSS07AvAc-7RRD8udpo7inIDTRCCEvoJ16osgL1IzoDvc7ZPDj8-xhJ_kAsKc-vJ5WYKLAlCFx_fixayM43Apg2TySNE5nSeJFCa02F4ViZleY7K2l4h_p143DzVZjWEBeKmyQVRXhbZzL6HwONQckhgp_LHuSrP_sOtVc7BrFwmZq2NZtXEOWyQWfJ4Yp0qg8NzV2LhKLc4LncpQuagf8OA8jyEeQwbu3Rq9zp0y-FodMg64qfWcPSu53HiwYC9dvgw5zhXa8zuZRcPMO_orCPVYnmO761xAfsp-P8aJJZDqpxlzKA0s-ClRsgunC5C9Xq5snIq-f4hT45u8ldBfAr6dLkDO8BdPMTzufH52bTWX3iJ1ipW1YqMefJhPMzBHLwnJ3SYWN7WTEuRyoC6ndQ60PcEzsPJYAO5MxdY4WsnYOqv3aIryuTlwW3K0dNqcvBSirgxv5X7AvidO-JQLSXXrY134BxgyLBze7FwVYwH7ZhzBdX-DwsUwQsJ7R0mRWxpNnhGu7NjkbB0-QJs",
	"expires_at": "2016-10-18T17:26:30Z",
	"team_name": "scaleft"
}
```
### Lists the Service Users for a Team

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/service_users" />
Lists all the Service Users for a Team

This endpoint requires the `access_admin` role.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team |


#### Request query parameters

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `contains`   |  string | (Optional) Includes ASA Users with name that contains the value |
| `count`   |  number | (Optional) The number of objects per page |
| `descending`   |  boolean | (Optional) The object order |
| `include_service_users`   |  string | (Optional) Include Service Users in the results |
| `offset`   |  string | (Optional) The UUID of the object used as an offset for pagination |
| `prev`   |  boolean | (Optional) The direction of paging |
| `starts_with`   |  string | (Optional) Includes ASA Users with name that begins with the value |
| `status`   |  string | (Optional) Includes ASA Users with specified statuses. Valid statuses: `ACTIVE`, `DISABLED`, and `DELETED`. |


#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `deleted_at`   | string | The time at which the ASA User was deleted |
| `details`   | object | An object with the following keys, the values of which are all strings: `first_name`, `last_name`, `full_name`, `email`. |
| `id`   | string | The UUID of the ASA User |
| `name`   | string | The username of the ASA User |
| `oauth_client_application_id`   | string | The ID of the ASA User provided by OAuth, if it exists |
| `role_grants`   | array | The permission roles available to the ASA User |
| `status`   | string | Status of the ASA User: `ACTIVE`, `DISABLED`, or `DELETED`. ASA Users can't disable or delete their own ASA User. |
| `user_type`   | string | The type of ASA User: `service` or `human` |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/service_users
```

##### Response

```json
{
	"list": [
		{
			"deleted_at": null,
			"details": null,
			"id": "aa225c16-af6e-4ab4-9150-456fd472e2d7",
			"name": "shreve",
			"oauth_client_application_id": null,
			"role_grants": null,
			"status": "ACTIVE",
			"user_type": "service"
		},
		{
			"deleted_at": null,
			"details": null,
			"id": "6b69de4e-90be-4016-9085-d54bf5815da1",
			"name": "dilsey.gibson",
			"oauth_client_application_id": null,
			"role_grants": null,
			"status": "DISABLED",
			"user_type": "service"
		}
	]
}
```
### Create a Service User

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/service_users" />
Creates a Service User that can be used to automate interaction with the Advanced Server Access API

This endpoint requires the `access_admin` role.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `name`   | string | The name of the Service User |

#### Response body
This endpoint returns an object with the following fields and a `201` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `deleted_at`   | string | The time at which the ASA User was deleted |
| `details`   | object | An object with the following keys, the values of which are all strings: `first_name`, `last_name`, `full_name`, `email`. |
| `id`   | string | The UUID of the ASA User |
| `name`   | string | The username of the ASA User |
| `oauth_client_application_id`   | string | The ID of the ASA User provided by OAuth, if it exists |
| `role_grants`   | array | The permission roles available to the ASA User |
| `status`   | string | Status of the ASA User: `ACTIVE`, `DISABLED`, or `DELETED`. ASA Users can't disable or delete their own ASA User. |
| `user_type`   | string | The type of ASA User: `service` or `human` |

#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
--data '{
	"name": "shreve"
}' \
https://app.scaleft.com/v1/teams/${team_name}/service_users
```

##### Response

```json
{
	"deleted_at": null,
	"details": null,
	"id": "aa225c16-af6e-4ab4-9150-456fd472e2d7",
	"name": "shreve",
	"oauth_client_application_id": null,
	"role_grants": null,
	"status": "ACTIVE",
	"user_type": "service"
}
```
### Fetch a Service User

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}" />
Fetches information regarding a specific Service User

This endpoint requires the `access_admin` role.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team |
| `user_name`   | string | The relevant username |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `deleted_at`   | string | The time at which the ASA User was deleted |
| `details`   | object | An object with the following keys, the values of which are all strings: `first_name`, `last_name`, `full_name`, `email`. |
| `id`   | string | The UUID of the ASA User |
| `name`   | string | The username of the ASA User |
| `oauth_client_application_id`   | string | The ID of the ASA User provided by OAuth, if it exists |
| `role_grants`   | array | The permission roles available to the ASA User |
| `status`   | string | Status of the ASA User: `ACTIVE`, `DISABLED`, or `DELETED`. ASA Users can't disable or delete their own ASA User. |
| `user_type`   | string | The type of ASA User: `service` or `human` |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}
```

##### Response

```json
{
	"deleted_at": null,
	"details": null,
	"id": "6b69de4e-90be-4016-9085-d54bf5815da1",
	"name": "dilsey.gibson",
	"oauth_client_application_id": null,
	"role_grants": null,
	"status": "ACTIVE",
	"user_type": "service"
}
```
### Update the status of a Service User

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}" />
Updates information about a specific Service User

This endpoint requires the `access_admin` role.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team |
| `user_name`   | string | The relevant username |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `deleted_at`   | string | The time at which the ASA User was deleted |
| `details`   | object | An object with the following keys, the values of which are all strings: `first_name`, `last_name`, `full_name`, `email`. |
| `id`   | string | The UUID of the ASA User |
| `name`   | string | The username of the ASA User |
| `oauth_client_application_id`   | string | The ID of the ASA User provided by OAuth, if it exists |
| `role_grants`   | array | The permission roles available to the ASA User |
| `status`   | string | Status of the ASA User: `ACTIVE`, `DISABLED`, or `DELETED`. ASA Users can't disable or delete their own ASA User. |
| `user_type`   | string | The type of ASA User: `service` or `human` |

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `deleted_at`   | string | The time at which the ASA User was deleted |
| `details`   | object | An object with the following keys, the values of which are all strings: `first_name`, `last_name`, `full_name`, `email`. |
| `id`   | string | The UUID of the ASA User |
| `name`   | string | The username of the ASA User |
| `oauth_client_application_id`   | string | The ID of the ASA User provided by OAuth, if it exists |
| `role_grants`   | array | The permission roles available to the ASA User |
| `status`   | string | Status of the ASA User: `ACTIVE`, `DISABLED`, or `DELETED`. ASA Users can't disable or delete their own ASA User. |
| `user_type`   | string | The type of ASA User: `service` or `human` |

#### Usage example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
--data '{
	"deleted_at": null,
	"details": null,
	"id": "6b69de4e-90be-4016-9085-d54bf5815da1",
	"name": "dilsey.gibson",
	"oauth_client_application_id": null,
	"role_grants": null,
	"status": "DISABLED",
	"user_type": "service"
}' \
https://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}
```

##### Response

```json
{
	"deleted_at": null,
	"details": null,
	"id": "6b69de4e-90be-4016-9085-d54bf5815da1",
	"name": "dilsey.gibson",
	"oauth_client_application_id": null,
	"role_grants": null,
	"status": "DISABLED",
	"user_type": "service"
}
```
### List the API keys for a Service User

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}/keys" />
Lists the API keys that belong to a specific Service User. The corresponding secret for each key isn't provided.

This endpoint requires the `access_admin` role.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team |
| `user_name`   | string | The relevant username |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `expires_at`   | string | The expiration time of the key |
| `id`   | string | The UUID of the API key |
| `issued_at`   | string | The time at which the key was issued |
| `last_used`   | string | The last time the key was used against Advanced Server Access |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}/keys
```

##### Response

```json
{
	"list": [
		{
			"expires_at": "0001-01-01T00:00:00Z",
			"id": "c6de9d40-1e6c-4033-88cb-992367d162eb",
			"issued_at": "2020-04-07T02:00:00Z",
			"last_used": null
		},
		{
			"expires_at": "2020-04-09T00:00:00Z",
			"id": "f37fadfc-fa03-4f46-a390-ce202772cff4",
			"issued_at": "2020-04-07T00:00:00Z",
			"last_used": null
		}
	]
}
```
### Rotate API keys for a Service User

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}/keys" />
Rotates API keys for a Service User. Rotating an API key automatically sets an expiration date for the rest of the API keys that a Service User has.

This endpoint requires the `access_admin` role.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team |
| `user_name`   | string | The relevant username |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `expires_at`   | string | The expiration time of the key |
| `id`   | string | The UUID of the API key |
| `issued_at`   | string | The time at which the key was issued |
| `last_used`   | string | The last time the key was used against Advanced Server Access |
| `secret`   | string | The secret of the API key. This is used to authenticate the Service User. Don't share. |

#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}/keys
```

##### Response

```json
{
	"expires_at": "0001-01-01T00:00:00Z",
	"id": "ba7ffbe9-c8e4-45c9-bc07-45729711c952",
	"issued_at": "2020-04-07T00:00:00Z",
	"last_used": null,
	"secret": "NOvsvBg0g9mFXdHbLxEJcEFpu+LZjQSKsYezqMALq5WbGZTpUsxoS4vBqqHOO9O3xrhOq03B+oLf7bSTShbudw=="
}
```
### Delete an API key for a Service User

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}/keys/${key_id}" />
Deletes an API key and prevents its future use

This endpoint requires the `access_admin` role.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `key_id`   | string | The UUID of the Service User key |
| `team_name`   | string | The name of your Team |
| `user_name`   | string | The relevant username |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a `204 No Content` response on a successful call.


#### Usage example

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}/keys/${key_id}
```

##### Response

```json
HTTP 204 No Content
```


