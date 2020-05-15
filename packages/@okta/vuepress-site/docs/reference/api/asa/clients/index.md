---
title: Clients
category: asa
---

# Clients API

## Get started

This article provides an overview of the Clients API

Explore the Clients API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://example.com).


## Clients Operations


The Clients API has the following operations:
* [List clients](#list-clients)
* [Fetch a client](#fetch-a-client)
* [Revoke a client](#revoke-a-client)
* [Approve or assign a client](#approve-or-assign-a-client)


### List clients

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/clients" />
By default returns the clients for the requesting user. Query options can be provided to filter by user or state.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string |  |


#### Request query parameters

%List any query parameters here in alpha order%

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

On returning a 200: List of clients.

Returns a list of [Client](/docs/asa/objects.html#client) objects.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/clients

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
			"id": "1c8dd4d4-a9ab-499c-86b7-cac3fa6ac7a2",
			"os": "macOS 10.14.6",
			"state": "PENDING",
			"user_name": "Jason.Compson.IV"
		},
		{
			"deleted_at": null,
			"description": "Personal laptop",
			"encrypted": true,
			"hostname": "Absalom",
			"id": "185ed10c-9881-434d-ad0f-2f3fccb752f6",
			"os": "macOS 10.14.6",
			"state": "ACTIVE",
			"user_name": "Jason.Compson.IV"
		}
	]
}
```
### Fetch a client

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/clients/${id}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `id`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body

On returning a 200: The client that was requested.

Returns a [Client](/docs/asa/objects.html#client) object.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/clients/${id}

```

##### Response
```json
{
	"deleted_at": null,
	"description": "Work laptop",
	"encrypted": true,
	"hostname": "LightInAugust",
	"id": "1c8dd4d4-a9ab-499c-86b7-cac3fa6ac7a2",
	"os": "macOS 10.14.6",
	"state": "PENDING",
	"user_name": "Jason.Compson.IV"
}
```
### Revoke a client

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/clients/${id}" />
Revoke a client's access to this team

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `id`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body

On returning a 204: The client was revoked successfully.



#### Usage example

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/clients/${id}

```

##### Response
```json

```
### Approve or assign a client

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/clients/${id}" />
Used for clients enrolled using a token policy or a policy that requires approval

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `id`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

*Required:* A user to which to assign the client or a state to which to update the client.
Uses a [ClientUpdateRequest](/docs/asa/objects.html#clientupdaterequest) object.

#### Response body

On returning a 204: The client was updated successfully.



#### Usage example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/clients/${id}
{
	"state": "ACTIVE",
	"user_name": "Jason.Compson.IV"
}
```

##### Response
```json

```


