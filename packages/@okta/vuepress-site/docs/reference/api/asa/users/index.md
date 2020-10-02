---
title: ASA Users
category: asa
---

# ASA Users API

## Get Started


| Product  | API Basics  | API Namespace        |
|----------|-------------|----------------------|
| [Advanced Server Access](https://www.okta.com/products/advanced-server-access/) | [How the ASA API works](../introduction/) | `https://app.scaleft.com/v1/`

An Advanced Server Access (ASA) User corresponds to a human or service user in the ASA ecosystem.

Explore the Users API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/run-collection/fba803e43a4ae53667d4).


## Users API Operations


The Users API has the following operations:
* [List the ASA Users for an ASA Team](#list-the-asa-users-for-an-asa-team)
* [Fetch an ASA User](#fetch-an-asa-user)
* [Update an ASA User](#update-an-asa-user)
* [List ASA Groups a specific ASA User is a member of](#list-asa-groups-a-specific-asa-user-is-a-member-of)


### List the ASA Users for an ASA Team

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/users" />
This endpoint list the ASA Users for an ASA Team.

This endpoint requires one of the following roles: `access_user`, `access_admin`, `reporting_user`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `contains`   |  string | (Optional) Includes ASA Users with name that contains the value. |
| `count`   |  number | (Optional) The number of objects per page. |
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
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `deleted_at`   | string | The time at which the ASA User was deleted. |
| `details`   | object | An object with the following keys, the values of which are all strings: `first_name`, `last_name`, `full_name`, `email`. |
| `id`   | string | The UUID of the ASA User. |
| `name`   | string | The username of the ASA User. |
| `oauth_client_application_id`   | string | The ID of the ASA User provided by OAuth, if it exists. |
| `role_grants`   | array | The permission roles available to the ASA User. |
| `status`   | string | One of `ACTIVE`, `DISABLED`, or `DELETED`. ASA Users cannot disable or delete their own ASA User. |
| `user_type`   | string | The type of ASA User, either `service` or `human`. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/users
```

##### Response

```json
{
	"list": [
		{
			"deleted_at": null,
			"details": {
				"email": "jason.compson@example.com",
				"first_name": "Jason",
				"full_name": "Jason Compson IV",
				"last_name": "Compson"
			},
			"id": "5b9d691f-7207-47a6-9395-a8bf1b923c5a",
			"name": "Jason.Compson.IV",
			"oauth_client_application_id": null,
			"role_grants": null,
			"status": "ACTIVE",
			"user_type": "human"
		},
		{
			"deleted_at": null,
			"details": {
				"email": "benjy.compson@example.com",
				"first_name": "Benjy",
				"full_name": "Benjy Compson",
				"last_name": "Compson"
			},
			"id": "394a16e4-8f50-4017-9e98-b6e61ad96ca0",
			"name": "Benjy.Compson",
			"oauth_client_application_id": null,
			"role_grants": null,
			"status": "DISABLED",
			"user_type": "human"
		},
		{
			"deleted_at": "1910-06-10T00:00:00Z",
			"details": {
				"email": "quentin.compson@example.com",
				"first_name": "Quentin",
				"full_name": "Quentin Compson III",
				"last_name": "Compson"
			},
			"id": "c700f6c5-3ed0-448a-908d-e9bc939ac818",
			"name": "Quentin.Compson.III",
			"oauth_client_application_id": null,
			"role_grants": null,
			"status": "DELETED",
			"user_type": "human"
		}
	]
}
```
### Fetch an ASA User

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}" />
This endpoint fetches information regarding a specific ASA User.

This endpoint requires one of the following roles: `reporting_user`, `access_user`, `access_admin`.

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
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `deleted_at`   | string | The time at which the ASA User was deleted. |
| `details`   | object | An object with the following keys, the values of which are all strings: `first_name`, `last_name`, `full_name`, `email`. |
| `id`   | string | The UUID of the ASA User. |
| `name`   | string | The username of the ASA User. |
| `oauth_client_application_id`   | string | The ID of the ASA User provided by OAuth, if it exists. |
| `role_grants`   | array | The permission roles available to the ASA User. |
| `status`   | string | One of `ACTIVE`, `DISABLED`, or `DELETED`. ASA Users cannot disable or delete their own ASA User. |
| `user_type`   | string | The type of ASA User, either `service` or `human`. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}
```

##### Response

```json
{
	"deleted_at": null,
	"details": {
		"email": "jason.compson@example.com",
		"first_name": "Jason",
		"full_name": "Jason Compson IV",
		"last_name": "Compson"
	},
	"id": "5b9d691f-7207-47a6-9395-a8bf1b923c5a",
	"name": "Jason.Compson.IV",
	"oauth_client_application_id": null,
	"role_grants": null,
	"status": "ACTIVE",
	"user_type": "human"
}
```
### Update an ASA User

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}" />
This endpoint updates a specific ASA User.

This endpoint requires one of the following roles: `access_admin`.

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
This endpoint returns a `204 No Content` response on a successful call.


#### Usage example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}
```

##### Response

```json
HTTP 204 No Content
```
### List ASA Groups a specific ASA User is a member of

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}/groups" />
This endpoint lists the ASA Groups a specific ASA User belongs to.

This endpoint requires one of the following roles: `access_admin`, `reporting_user`, `access_user`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team. |
| `user_name`   | string | The relevant username. |


#### Request query parameters

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `contains`   |  string | (Optional) If this value is not empty, the results will be filtered to only contain ASA Groups whose name contains the value provided. |
| `count`   |  number | (Optional) The number of objects per page. |
| `descending`   |  boolean | (Optional) The object order. |
| `offset`   |  string | (Optional) The page offset. |
| `prev`   |  boolean | (Optional) The direction of paging. |


#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `deleted_at`   | string | The time at which the ASA Group was deleted. |
| `federated_from_team`   | string | (Optional) The name of the Team from which to federate the ASA Group. |
| `federation_approved_at`   | string | (Optional) The time when the ASA Group had its federation approved. |
| `id`   | string | The UUID of the ASA Group. |
| `name`   | string | The name of the ASA Group. |
| `roles`   | array | A list of roles for the ASA Group. Options are `access_user`, `access_admin` and `reporting_user`. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}/groups
```

##### Response

```json
{
	"list": [
		{
			"deleted_at": "0001-01-01T00:00:00Z",
			"federated_from_team": null,
			"federation_approved_at": null,
			"id": "1d4ecb04-71ad-44d0-baff-438d3ea03bb3",
			"name": "compsons",
			"roles": [
				"access_user",
				"reporting_user",
				"access_admin"
			]
		}
	]
}
```


