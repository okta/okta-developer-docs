---
title: Service Users
category: asa
---

# Service Users API

## Get started

This article provides an overview of the service users API

Explore the Service Users API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://example.com).


## Service Users Operations


The Service Users API has the following operations:
* [List the Service Users for a Team](#list-the-service-users-for-a-team)
* [Create a Service User](#create-a-service-user)
* [Fetch a Service User](#fetch-a-service-user)
* [Update the status of a Service User](#update-the-status-of-a-service-user)
* [List the API keys for a Service User](#list-the-api-keys-for-a-service-user)
* [Rotate API keys for a Service Users](#rotate-api-keys-for-a-service-users)
* [Delete an API key for a Service User](#delete-an-api-key-for-a-service-user)


### List the Service Users for a Team

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/service_users" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string |  |


#### Request query parameters

%List any query parameters here in alpha order%

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `contains`   |  string | (Optional) Includes users with name that contains the value. |
| `count`   |  integer | (Optional) The number of objects per page. |
| `descending`   |  boolean | (Optional) The object order. |
| `include_service_users`   |  string | (Optional) Includes service users in result. |
| `offset`   |  string | (Optional) The page offset. |
| `prev`   |  boolean | (Optional) The direction of paging. |
| `starts_with`   |  string | (Optional) Includes users with name that begins with the value. |
| `status`   |  string | (Optional) Includes users with specified statuses. Valid statuses are ACTIVE, DISABLED, and DELETED. |


#### Request body

This endpoint has no request body.

#### Response body

On returning a 200: List of Service Users.

Returns a list of [User](/docs/asa/objects.html#user) objects.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/service_users

```

##### Response
```json
{
	"list": [
		{
			"deleted_at": null,
			"details": null,
			"id": "3a4e019f-fd6a-40c1-a1cb-ea8b9ff85d7a",
			"name": "shreve",
			"oauth_client_application_id": null,
			"role_grants": null,
			"status": "ACTIVE",
			"user_type": "service"
		},
		{
			"deleted_at": null,
			"details": null,
			"id": "b017ddbc-c3d2-46e1-91e7-1672eda367c5",
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
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

*Required:* Service User to create
Uses a [CreateServiceUserBody](/docs/asa/objects.html#createserviceuserbody) object.

#### Response body

On returning a 201: The Service User that was created.

Returns a [User](/docs/asa/objects.html#user) object.

#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/service_users
{
	"name": "shreve"
}
```

##### Response
```json
{
	"deleted_at": null,
	"details": null,
	"id": "3a4e019f-fd6a-40c1-a1cb-ea8b9ff85d7a",
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
| `team_name`   | string |  |
| `user_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body

On returning a 200: The Service User that was requested.

Returns a [User](/docs/asa/objects.html#user) object.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}

```

##### Response
```json
{
	"deleted_at": null,
	"details": null,
	"id": "e65a548f-5a70-4bd1-8e47-b08f9e11cda7",
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
| `team_name`   | string |  |
| `user_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

*Required:* Service User to update
Uses a [User](/docs/asa/objects.html#user) object.

#### Response body

On returning a 200: The Service User that was updated.

Returns a [User](/docs/asa/objects.html#user) object.

#### Usage example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}
{
	"deleted_at": null,
	"details": null,
	"id": "b017ddbc-c3d2-46e1-91e7-1672eda367c5",
	"name": "dilsey.gibson",
	"oauth_client_application_id": null,
	"role_grants": null,
	"status": "DISABLED",
	"user_type": "service"
}
```

##### Response
```json
{
	"deleted_at": null,
	"details": null,
	"id": "b017ddbc-c3d2-46e1-91e7-1672eda367c5",
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
| `team_name`   | string |  |
| `user_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body

On returning a 200: List of Service User keys.

Returns a list of [ServiceUserKey](/docs/asa/objects.html#serviceuserkey) objects.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}/keys

```

##### Response
```json
{
	"list": [
		{
			"expires_at": "0001-01-01T00:00:00Z",
			"id": "fc4b6ac4-bbdb-4eff-99af-a2cec5cec0d2",
			"issued_at": "2020-04-07T02:00:00Z",
			"last_used": null
		},
		{
			"expires_at": "2020-04-09T00:00:00Z",
			"id": "ee7b0dae-f3dd-41bc-b662-6ba97d0ef95e",
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
| `team_name`   | string |  |
| `user_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body

On returning a 200: The new API key and secret.

Returns a [ServiceUserKeyWithSecret](/docs/asa/objects.html#serviceuserkeywithsecret) object.

#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}/keys

```

##### Response
```json
{
	"expires_at": "0001-01-01T00:00:00Z",
	"id": "91999c2d-1ced-4ada-be0b-fcccba841a02",
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
| `key_id`   | string |  |
| `team_name`   | string |  |
| `user_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body

On returning a 204: API key has been successfully deleted.



#### Usage example

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/service_users/${user_name}/keys/${key_id}

```

##### Response
```json

```


