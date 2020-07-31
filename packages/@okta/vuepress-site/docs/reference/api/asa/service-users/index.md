---
title: ASA Service Users
category: asa
---

# ASA Service Users API

## Get Started


| Product  | API Basics  | API Namespace        |
|----------|-------------|----------------------|
| [Advanced Server
Access](https://www.okta.com/products/advanced-server-access/) | [How the ASA API works](../introduction/) | `https://app.scaleft.com/v1/`

ASA Service Users are used to access to the ASA API. ASA Service Users are provided tokens for authentication and authorization against the service.


## Service Users API Operations


The Service Users API has the following operations:
* [Issue a Service User token](#issue-a-service-user-token)
* [List the Service Users for a Team](#list-the-service-users-for-a-team)
* [Create a Service User](#create-a-service-user)
* [Fetch a Service User](#fetch-a-service-user)
* [Update the status of a Service User](#update-the-status-of-a-service-user)
* [List the API keys for a Service User](#list-the-api-keys-for-a-service-user)
* [Rotate API keys for a Service Users](#rotate-api-keys-for-a-service-users)
* [Delete an API key for a Service User](#delete-an-api-key-for-a-service-user)


### Issue a Service User token

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/service_token" />
Most calls to the Okta Advanced Server Access API require an HTTP Authorization header with a value of the form `Bearer ${AUTH_TOKEN}`.
To retrieve an auth token, you'll need to [create a service user and API key](https://help.okta.com/en/prod/Content/Topics/Adv_Server_Access/docs/service-users.htm), then pass the API key information to this endpoint.
Auth tokens may expire at any time, so code using them should be prepared to handle a 401 response code by creating a new one.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `key_id`   | string | The ID of the API key. |
| `key_secret`   | string | The secret associated with the API key. |

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `bearer_token`   | string | The JSON Web Token used to authenticate against the ASA API. |
| `expires_at`   | string | The time at which the token expires, formatted in accordance with RFC 3339. |
| `team_name`   | string | The name of the Team this token is for. |

#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
--data '{
	"key_id": "0c62dba6-bf82-4e7f-aec3-e466d2e1fef9",
	"key_secret": "uF0SoVBVQP/hJmQSLUZdM2a7ArYzjD8ykzvG7n4tKaOEfSErcwMUUDWpEf4Q42/HaVKPZUfILkzy/bsQFv7WRg==",
	"roles": null
}' \
https://app.scaleft.com/v1/teams/${team_name}/service_token```

##### Response
```json
{
	"bearer_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImI4YTAzODA0MTM0NjctNGU5OC04ZDU2LTAxNDRlNGNkMGViMCIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NzY4MTE1OTAsImlzcyI6InNjYWxlZnQuYXV0aC50b2tlbiIsImp0aSI6IjA0YjRhNTE4LWU5YzYtNDc1My05YWY4LThlOTAwNjVjNjX5YSIsInJvbGVzIjp7IjE0NzY4MTE1OTAiOm51bGx9LCJ0ZWFtIjoic2NhbGVmdCIsInVzZXIiOiJyb2JvdF9ydXNzZWxsIn0.pHuv06Q1-sKjHrGXUzQi-uM7AAG3K1Q6rpuxycR2Py6QHwLrto1uZmZt4wrBo6tQRCl3RjHBKGcDmEfBZ6_gFnckpFMkIXUT3sIDmOvSACthgprcXjfYh0KarEDmDnIMsEPl7FVhl4N_I0yLK9O5XSS07AvAc-7RRD8udpo7inIDTRCCEvoJ16osgL1IzoDvc7ZPDj8-xhJ_kAsKc-vJ5WYKLAlCFx_fixayM43Apg2TySNE5nSeJFCa02F4ViZleY7K2l4h_p143DzVZjWEBeKmyQVRXhbZzL6HwONQckhgp_LHuSrP_sOtVc7BrFwmZq2NZtXEOWyQWfJ4Yp0qg8NzV2LhKLc4LncpQuagf8OA8jyEeQwbu3Rq9zp0y-FodMg64qfWcPSu53HiwYC9dvgw5zhXa8zuZRcPMO_orCPVYnmO761xAfsp-P8aJJZDqpxlzKA0s-ClRsgunC5C9Xq5snIq-f4hT45u8ldBfAr6dLkDO8BdPMTzufH52bTWX3iJ1ipW1YqMefJhPMzBHLwnJ3SYWN7WTEuRyoC6ndQ60PcEzsPJYAO5MxdY4WsnYOqv3aIryuTlwW3K0dNqcvBSirgxv5X7AvidO-JQLSXXrY134BxgyLBze7FwVYwH7ZhzBdX-DwsUwQsJ7R0mRWxpNnhGu7NjkbB0-QJs",
	"expires_at": "2016-10-18T17:26:30Z",
	"team_name": "scaleft"
}
```
### List the Service Users for a Team

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/service_users" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `contains`   |  string | (Optional) Includes ASA Users with name that contains the value. |
| `count`   |  integer | (Optional) The number of objects per page. |
| `descending`   |  boolean | (Optional) The object order. |
| `include_service_users`   |  string | (Optional) Include Service Users in result. |
| `offset`   |  string | (Optional) The page offset. |
| `prev`   |  boolean | (Optional) The direction of paging. |
| `starts_with`   |  string | (Optional) Includes ASA Users with name that begins with the value. |
| `status`   |  string | (Optional) Includes ASA Users with specified statuses. Valid statuses are `ACTIVE`, `DISABLED`, and `DELETED`. |


#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `details`   | object | An object with the following keys, the values of which are all strings: `first_name`, `last_name`, `full_name`, `email`. |
| `name`   | string | The username of the ASA User. |
| `status`   | integer | One of `ACTIVE`, `DISABLED`, or `DELETED`. ASA Users cannot disable or delete their own ASA User. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/service_users```

##### Response
```json
{
	"list": [
		{
			"deleted_at": null,
			"details": null,
			"id": "f2773ee5-eb2d-4ae6-9c7a-f7cae95558c1",
			"name": "shreve",
			"oauth_client_application_id": null,
			"role_grants": null,
			"status": "ACTIVE",
			"user_type": "service"
		},
		{
			"deleted_at": null,
			"details": null,
			"id": "c112ad73-432f-4179-9682-e2459104427d",
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


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `name`   | string | The name of the Service User. |

#### Response body
This endpoint returns an object with the following fields and a `201` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `details`   | object | An object with the following keys, the values of which are all strings: `first_name`, `last_name`, `full_name`, `email`. |
| `name`   | string | The username of the ASA User. |
| `status`   | integer | One of `ACTIVE`, `DISABLED`, or `DELETED`. ASA Users cannot disable or delete their own ASA User. |

#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
--data '{
	"name": "shreve"
}' \
https://app.scaleft.com/v1/teams/${team_name}/service_users```

##### Response
```json
{
	"deleted_at": null,
	"details": null,
	"id": "f2773ee5-eb2d-4ae6-9c7a-f7cae95558c1",
	"name": "shreve",
	"oauth_client_application_id": null,
	"role_grants": null,
	"status": "ACTIVE",
	"user_type": "service"
}
```
### Fetch a Service User

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team. |
| `user_name`   | string | The relevant username. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `details`   | object | An object with the following keys, the values of which are all strings: `first_name`, `last_name`, `full_name`, `email`. |
| `name`   | string | The username of the ASA User. |
| `status`   | integer | One of `ACTIVE`, `DISABLED`, or `DELETED`. ASA Users cannot disable or delete their own ASA User. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}```

##### Response
```json
{
	"deleted_at": null,
	"details": null,
	"id": "8782ed3f-4b23-4b4b-92ea-4add93ec6465",
	"name": "dilsey.gibson",
	"oauth_client_application_id": null,
	"role_grants": null,
	"status": "ACTIVE",
	"user_type": "service"
}
```
### Update the status of a Service User

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team. |
| `user_name`   | string | The relevant username. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `details`   | object | An object with the following keys, the values of which are all strings: `first_name`, `last_name`, `full_name`, `email`. |
| `name`   | string | The username of the ASA User. |
| `status`   | integer | One of `ACTIVE`, `DISABLED`, or `DELETED`. ASA Users cannot disable or delete their own ASA User. |

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `details`   | object | An object with the following keys, the values of which are all strings: `first_name`, `last_name`, `full_name`, `email`. |
| `name`   | string | The username of the ASA User. |
| `status`   | integer | One of `ACTIVE`, `DISABLED`, or `DELETED`. ASA Users cannot disable or delete their own ASA User. |

#### Usage example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
--data '{
	"deleted_at": null,
	"details": null,
	"id": "c112ad73-432f-4179-9682-e2459104427d",
	"name": "dilsey.gibson",
	"oauth_client_application_id": null,
	"role_grants": null,
	"status": "DISABLED",
	"user_type": "service"
}' \
https://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}```

##### Response
```json
{
	"deleted_at": null,
	"details": null,
	"id": "c112ad73-432f-4179-9682-e2459104427d",
	"name": "dilsey.gibson",
	"oauth_client_application_id": null,
	"role_grants": null,
	"status": "DISABLED",
	"user_type": "service"
}
```
### List the API keys for a Service User

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}/keys" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team. |
| `user_name`   | string | The relevant username. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `expires_at`   | string | The expiration time of the key. |
| `id`   | string | The UUID of the API key |
| `issued_at`   | string | The time at which the key was issued. |
| `last_used`   | string | The last time the key was used against Advanced Server Access. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}/keys```

##### Response
```json
{
	"list": [
		{
			"expires_at": "0001-01-01T00:00:00Z",
			"id": "c3762f1b-78a3-46f9-801b-f29352d17911",
			"issued_at": "2020-04-07T02:00:00Z",
			"last_used": null
		},
		{
			"expires_at": "2020-04-09T00:00:00Z",
			"id": "8cb8cb26-3235-4499-8ad3-80080ea79d47",
			"issued_at": "2020-04-07T00:00:00Z",
			"last_used": null
		}
	]
}
```
### Rotate API keys for a Service Users

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}/keys" />
Rotating an API key will automatically set an expiration date on the rest of the API keys a Service User has.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team. |
| `user_name`   | string | The relevant username. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `expires_at`   | string | The expiration time of the key. |
| `id`   | string | The UUID of the API key |
| `issued_at`   | string | The time at which the key was issued. |
| `last_used`   | string | The last time the key was used against Advanced Server Access. |
| `secret`   | string | The secret of the API key. This is used to authenticate the Service User. Do not share. |

#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}/keys```

##### Response
```json
{
	"expires_at": "0001-01-01T00:00:00Z",
	"id": "3f8429d1-52a5-4c68-a892-e2583c8fde66",
	"issued_at": "2020-04-07T00:00:00Z",
	"last_used": null,
	"secret": "NOvsvBg0g9mFXdHbLxEJcEFpu+LZjQSKsYezqMALq5WbGZTpUsxoS4vBqqHOO9O3xrhOq03B+oLf7bSTShbudw=="
}
```
### Delete an API key for a Service User

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}/keys/${key_id}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `key_id`   | string | The UUID of the Service User key. |
| `team_name`   | string | The name of your Team. |
| `user_name`   | string | The relevant username. |


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
https://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}/keys/${key_id}```

##### Response
```json
HTTP 204 No Content
```


