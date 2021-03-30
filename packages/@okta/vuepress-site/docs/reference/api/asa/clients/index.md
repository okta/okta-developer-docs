---
title: ASA Clients
category: asa
---

# ASA Clients API

## Get started

The [Advanced Server Access (ASA) API](/docs/reference/api/asa/introduction/) is logically separate from the rest of the Okta APIs and uses a different API namespace:

`https://app.scaleft.com/v1/`

An Advanced Server Access (ASA) Client corresponds to a user's device. Clients are the primary way users access servers managed by ASA.

Explore the Clients API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/acb5d434083d512bdbb3).


## Clients API operations


The Clients API has the following operations:
* [List ASA Clients](#list-asa-clients)
* [Fetch an ASA Client](#fetch-an-asa-client)
* [Revoke an ASA Client](#revoke-an-asa-client)
* [Approve or assign an ASA Client](#approve-or-assign-an-asa-client)


### List ASA Clients

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/clients" />
Returns a list of ASA Clients. By default, this API returns the ASA Clients for the requesting ASA User. You can provide query options to filter by ASA User or state.

This endpoint requires one of the following roles: `access_user`, `access_admin`, or `reporting_user`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team |


#### Request query parameters

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `all`   |  boolean | (Optional) When `true`, returns all Clients for the Team |
| `count`   |  number | (Optional) The number of objects per page |
| `descending`   |  boolean | (Optional) The object order |
| `offset`   |  string | (Optional) The page offset |
| `prev`   |  boolean | (Optional) The direction of paging |
| `state`   |  string | (Optional) The state of the ASA Client: `ACTIVE`, `PENDING`, or `DELETED` |
| `username`   |  string | (Optional) List Clients assigned to a single User. An empty string returns unassigned Clients. |


#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `deleted_at`   | string | The time the ASA Client was deleted |
| `description`   | string | A description of the ASA Client |
| `encrypted`   | boolean | A boolean that reflects whether `sft` was able to determine that the ASA Client was encrypted |
| `hostname`   | string | The hostname of the ASA Client |
| `id`   | string | The UUID of the ASA Client |
| `os`   | string | The operating system (OS) of the ASA Client device |
| `state`   | string | The state of the ASA Client: `ACTIVE`, `PENDING`, or `DELETED` |
| `user_name`   | string | The ASA User to whom this ASA Client belongs |

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
			"id": "9c199afe-0ca5-427a-baac-c4341707d82b",
			"os": "macOS 10.14.6",
			"state": "PENDING",
			"user_name": "Jason.Compson.IV"
		},
		{
			"deleted_at": null,
			"description": "Personal laptop",
			"encrypted": true,
			"hostname": "Absalom",
			"id": "5e9d8179-2fca-4905-8405-3cd3e0c5280e",
			"os": "macOS 10.14.6",
			"state": "ACTIVE",
			"user_name": "Jason.Compson.IV"
		}
	]
}
```
### Fetch an ASA Client

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/clients/${client_id}" />
Fetches a single ASA Client with the specified Client ID on the specified Team

This endpoint requires one of the following roles: `access_user`, `access_admin`, or `reporting_user`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `client_id`   | string | The UUID of the Client |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `deleted_at`   | string | The time the ASA Client was deleted |
| `description`   | string | A description of the ASA Client |
| `encrypted`   | boolean | A boolean that reflects whether `sft` was able to determine that the ASA Client was encrypted |
| `hostname`   | string | The hostname of the ASA Client |
| `id`   | string | The UUID of the ASA Client |
| `os`   | string | The operating system (OS) of the ASA Client device |
| `state`   | string | The state of the ASA Client: `ACTIVE`, `PENDING`, or `DELETED` |
| `user_name`   | string | The ASA User to whom this ASA Client belongs |

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
	"id": "9c199afe-0ca5-427a-baac-c4341707d82b",
	"os": "macOS 10.14.6",
	"state": "PENDING",
	"user_name": "Jason.Compson.IV"
}
```
### Revoke an ASA Client

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/clients/${client_id}" />
Revokes an ASA Client's access to this Team

This endpoint requires one of the following roles: `access_admin`, `authenticated_client`, or `access_user`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `client_id`   | string | The UUID of the Client |
| `team_name`   | string | The name of your Team |


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
### Approve or assign an ASA Client

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/clients/${client_id}" />
Approves or assigns an ASA Client to be used by an ASA User. Used for ASA Clients enrolled using a token policy or a policy that requires approval.

This endpoint requires the `access_admin` role.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `client_id`   | string | The UUID of the Client |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `state`   | string | The state of the ASA Client:`ACTIVE`, `PENDING`, or `DELETED` |
| `user_name`   | string | The ASA User to whom this ASA Client belongs |

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


