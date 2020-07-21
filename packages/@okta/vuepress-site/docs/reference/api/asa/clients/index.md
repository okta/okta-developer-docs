---
title: ASA Clients
category: asa
---

# ASA Clients API

## Get Started


| Product  | API Basics  | API Namespace        |
|----------|-------------|----------------------|
| [Advanced Server Access](https://www.okta.com/products/advanced-server-access/) | [How the ASA API works](../intro/) | `https://app.scaleft.com/v1/`

An ASA Client corresponds to a user's device.


## Clients API Operations


The Clients API has the following operations:
* [List Clients](#list-clients)
* [Fetch a Client](#fetch-a-client)
* [Revoke a Client](#revoke-a-client)
* [Approve or assign a Client](#approve-or-assign-a-client)


### List Clients

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/clients" />
By default returns the Clients for the requesting User. Query options can be provided to filter by User or state.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `all`   |  boolean | (Optional) True returns all clients for the team. |
| `count`   |  integer | (Optional) The number of objects per page. |
| `descending`   |  boolean | (Optional) The object order. |
| `offset`   |  string | (Optional) The page offset. |
| `prev`   |  boolean | (Optional) The direction of paging. |
| `state`   |  string | (Optional) One of ACTIVE, PENDING, DELETED. |
| `username`   |  string | (Optional) List clients of a single user. An empty string returns unassigned clients. |


#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `description`   | string | A description of the Client. |
| `encrypted`   | boolean | A boolean reflecting whether sft was able to determine that the Client was encrypted. |
| `hostname`   | string | The hostname of the Client. |
| `id`   | string | The UUID of the Client. |
| `os`   | string | The OS of the Client device. |
| `state`   | string | The state of the Client. One of: `ACTIVE`, `PENDING`, or `DELETED`. |
| `user_name`   | string | The User to whom this Client belongs. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \

https://app.scaleft.com/v1/teams/${team_name}/clients
```

##### Response
```json
{
	"list": [
		{
			"deleted_at": null,
			"description": "Work laptop",
			"encrypted": true,
			"hostname": "LightInAugust",
			"id": "ed742cb8-2305-41a7-9649-598ed4fba2da",
			"os": "macOS 10.14.6",
			"state": "PENDING",
			"user_name": "Jason.Compson.IV"
		},
		{
			"deleted_at": null,
			"description": "Personal laptop",
			"encrypted": true,
			"hostname": "Absalom",
			"id": "6e79f0db-6394-4129-a96a-79eb59f3a3b5",
			"os": "macOS 10.14.6",
			"state": "ACTIVE",
			"user_name": "Jason.Compson.IV"
		}
	]
}
```
### Fetch a Client

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/clients/${client_id}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `client_id`   | string | The UUID of the Client. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `description`   | string | A description of the Client. |
| `encrypted`   | boolean | A boolean reflecting whether sft was able to determine that the Client was encrypted. |
| `hostname`   | string | The hostname of the Client. |
| `id`   | string | The UUID of the Client. |
| `os`   | string | The OS of the Client device. |
| `state`   | string | The state of the Client. One of: `ACTIVE`, `PENDING`, or `DELETED`. |
| `user_name`   | string | The User to whom this Client belongs. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \

https://app.scaleft.com/v1/teams/${team_name}/clients/${client_id}
```

##### Response
```json
{
	"deleted_at": null,
	"description": "Work laptop",
	"encrypted": true,
	"hostname": "LightInAugust",
	"id": "ed742cb8-2305-41a7-9649-598ed4fba2da",
	"os": "macOS 10.14.6",
	"state": "PENDING",
	"user_name": "Jason.Compson.IV"
}
```
### Revoke a Client

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/clients/${client_id}" />
Revoke a Client's access to this team

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `client_id`   | string | The UUID of the Client. |
| `team_name`   | string | The name of your Team. |


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

https://app.scaleft.com/v1/teams/${team_name}/clients/${client_id}
```

##### Response
```json
HTTP 204 No Content
```
### Approve or assign a Client

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/clients/${client_id}" />
Used for Clients enrolled using a token policy or a policy that requires approval

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `client_id`   | string | The UUID of the Client. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `state`   | string | The state of the Client. One of: `ACTIVE`, `PENDING`, or `DELETED`. |
| `user_name`   | string | The User to whom this Client belongs. |

#### Response body
This endpoint returns a `204 No Content` response on a successful call.


#### Usage example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
--data '{
	"state": "ACTIVE",
	"user_name": "Jason.Compson.IV"
}' \
https://app.scaleft.com/v1/teams/${team_name}/clients/${client_id}
```

##### Response
```json
HTTP 204 No Content
```


