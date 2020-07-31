---
title: ASA Clients
category: asa
---

# ASA Clients API

## Get Started


| Product  | API Basics  | API Namespace        |
|----------|-------------|----------------------|
| [Advanced Server Access](https://www.okta.com/products/advanced-server-access/) | [How the ASA API works](../introduction/) | `https://app.scaleft.com/v1/`

An ASA Client corresponds to a user's device.


## Clients API Operations


The Clients API has the following operations:
* [List ASA Clients](#list-asa-clients)
* [Fetch an ASA Client](#fetch-an-asa-client)
* [Revoke an ASA Client](#revoke-an-asa-client)
* [Approve or assign an ASA Client](#approve-or-assign-an-asa-client)


### List ASA Clients

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/clients" />
By default returns the ASA Clients for the requesting ASA User. Query options can be provided to filter by ASA User or state.
This endpoint requires one of the following roles: `access_user`, `access_admin`, `reporting_user`.

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
| `state`   |  string | (Optional) One of `ACTIVE`, `PENDING`, `DELETED`. |
| `username`   |  string | (Optional) List clients of a single user. An empty string returns unassigned clients. |


#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `description`   | string | A description of the ASA Client. |
| `encrypted`   | boolean | A boolean reflecting whether `sft` was able to determine that the ASA Client was encrypted. |
| `hostname`   | string | The hostname of the ASA Client. |
| `id`   | string | The UUID of the ASA Client. |
| `os`   | string | The OS of the ASA Client device. |
| `state`   | string | The state of the ASA Client. One of: `ACTIVE`, `PENDING`, or `DELETED`. |
| `user_name`   | string | The ASA User to whom this ASA Client belongs. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/clients```

##### Response
```json
{
	"list": [
		{
			"deleted_at": null,
			"description": "Work laptop",
			"encrypted": true,
			"hostname": "LightInAugust",
			"id": "20dd99e6-a94e-4ebf-afc5-e9fa05bdec38",
			"os": "macOS 10.14.6",
			"state": "PENDING",
			"user_name": "Jason.Compson.IV"
		},
		{
			"deleted_at": null,
			"description": "Personal laptop",
			"encrypted": true,
			"hostname": "Absalom",
			"id": "2d461787-0bf2-44c1-aa8e-54e49ed26b60",
			"os": "macOS 10.14.6",
			"state": "ACTIVE",
			"user_name": "Jason.Compson.IV"
		}
	]
}
```
### Fetch an ASA Client

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/clients/${client_id}" />
This endpoint requires one of the following roles: `access_user`, `access_admin`, `reporting_user`.

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
| `description`   | string | A description of the ASA Client. |
| `encrypted`   | boolean | A boolean reflecting whether `sft` was able to determine that the ASA Client was encrypted. |
| `hostname`   | string | The hostname of the ASA Client. |
| `id`   | string | The UUID of the ASA Client. |
| `os`   | string | The OS of the ASA Client device. |
| `state`   | string | The state of the ASA Client. One of: `ACTIVE`, `PENDING`, or `DELETED`. |
| `user_name`   | string | The ASA User to whom this ASA Client belongs. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/clients/${client_id}```

##### Response
```json
{
	"deleted_at": null,
	"description": "Work laptop",
	"encrypted": true,
	"hostname": "LightInAugust",
	"id": "20dd99e6-a94e-4ebf-afc5-e9fa05bdec38",
	"os": "macOS 10.14.6",
	"state": "PENDING",
	"user_name": "Jason.Compson.IV"
}
```
### Revoke an ASA Client

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/clients/${client_id}" />
Revoke an ASA Client's access to this Team
This endpoint requires one of the following roles: `access_user`, `access_admin`, `authenticated_client`.

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
https://app.scaleft.com/v1/teams/${team_name}/clients/${client_id}```

##### Response
```json
HTTP 204 No Content
```
### Approve or assign an ASA Client

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/clients/${client_id}" />
Used for ASA Clients enrolled using a token policy or a policy that requires approval
This endpoint requires one of the following roles: `access_admin`.

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
| `state`   | string | The state of the ASA Client. One of: `ACTIVE`, `PENDING`, or `DELETED`. |
| `user_name`   | string | The ASA User to whom this ASA Client belongs. |

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
https://app.scaleft.com/v1/teams/${team_name}/clients/${client_id}```

##### Response
```json
HTTP 204 No Content
```


