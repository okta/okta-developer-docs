---
title: ASA Groups
category: asa
---

# ASA Groups API

## Get Started


| Product  | API Basics  | API Namespace        |
|----------|-------------|----------------------|
| [Advanced Server Access](https://www.okta.com/products/advanced-server-access/) | [How the ASA API works](../introduction/) | `https://app.scaleft.com/v1/`

An Advanced Server Access (ASA) Group is a collection of ASA Users that share permissions and access.

Explore the Groups API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/run-collection/fba803e43a4ae53667d4).


## Groups API Operations


The Groups API has the following operations:
* [List the ASA Groups for a Team](#list-the-asa-groups-for-a-team)
* [Create an ASA Group](#create-an-asa-group)
* [Fetch a single ASA Group](#fetch-a-single-asa-group)
* [Remove an ASA Group from Team](#remove-an-asa-group-from-team)
* [Update an ASA Group](#update-an-asa-group)
* [List ASA Users of an ASA Group](#list-asa-users-of-an-asa-group)
* [Add an ASA User to an ASA Group](#add-an-asa-user-to-an-asa-group)
* [Remove an ASA User from an ASA Group](#remove-an-asa-user-from-an-asa-group)
* [List ASA Users of a Team not assigned to a ASA Group](#list-asa-users-of-a-team-not-assigned-to-a-asa-group)


### List the ASA Groups for a Team

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/groups" />
This endpoint lists the ASA Groups for a Team.

This endpoint requires one of the following roles: `access_admin`, `access_user`, `reporting_user`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team. |


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
https://app.scaleft.com/v1/teams/${team_name}/groups
```

##### Response

```json
{
	"list": [
		{
			"deleted_at": "0001-01-01T00:00:00Z",
			"federated_from_team": "william-faulkner",
			"federation_approved_at": "2018-04-07T00:00:00Z",
			"id": "2ad2145a-ecad-4865-9ad8-6ce2c0e140e9",
			"name": "compsons",
			"roles": [
				"access_user",
				"reporting_user",
				"access_admin"
			]
		},
		{
			"deleted_at": "0001-01-01T00:00:00Z",
			"federated_from_team": null,
			"federation_approved_at": null,
			"id": "05e752ae-8524-4423-aef5-6f0a1fb253e4",
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
### Create an ASA Group

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/groups" />
This endpoint creates an ASA Group. The ASA Group have users added to it and also be assigned to Projects in order to manage access.

This endpoint requires one of the following roles: `access_admin`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `deleted_at`   | string | The time at which the ASA Group was deleted. |
| `federated_from_team`   | string | (Optional) The name of the Team from which to federate the ASA Group. |
| `federation_approved_at`   | string | (Optional) The time when the ASA Group had its federation approved. |
| `id`   | string | The UUID of the ASA Group. |
| `name`   | string | The name of the ASA Group. |
| `roles`   | array | A list of roles for the ASA Group. Options are `access_user`, `access_admin` and `reporting_user`. |

#### Response body
This endpoint returns an object with the following fields and a `201` code on a successful call.
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
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
--data '{
	"deleted_at": null,
	"federated_from_team": null,
	"federation_approved_at": null,
	"id": "",
	"name": "compsons",
	"roles": [
		"access_user",
		"reporting_user",
		"access_admin"
	]
}' \
https://app.scaleft.com/v1/teams/${team_name}/groups
```

##### Response

```json
{
	"deleted_at": "0001-01-01T00:00:00Z",
	"federated_from_team": null,
	"federation_approved_at": null,
	"id": "05e752ae-8524-4423-aef5-6f0a1fb253e4",
	"name": "compsons",
	"roles": [
		"access_user",
		"reporting_user",
		"access_admin"
	]
}
```
### Fetch a single ASA Group

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}" />
This endpoint fetches details regarding a single ASA Group.

This endpoint requires one of the following roles: `access_admin`, `access_user`, `reporting_user`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string | The ASA Group name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
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
https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}
```

##### Response

```json
{
	"deleted_at": "0001-01-01T00:00:00Z",
	"federated_from_team": null,
	"federation_approved_at": null,
	"id": "05e752ae-8524-4423-aef5-6f0a1fb253e4",
	"name": "compsons",
	"roles": [
		"access_user",
		"reporting_user",
		"access_admin"
	]
}
```
### Remove an ASA Group from Team

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}" />
This endpoint removes an ASA Group from the Team and also from any associated Projects.

This endpoint requires one of the following roles: `access_admin`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string | The ASA Group name. |
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
https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}
```

##### Response

```json
HTTP 204 No Content
```
### Update an ASA Group

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}" />
This endpoint updates the access privileges regarding a single ASA Group.

This endpoint requires one of the following roles: `access_admin`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string | The ASA Group name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `roles`   | array | A list of Roles for the ASA Group. Options are `access_user`, `access_admin` and `reporting_user`. |

#### Response body
This endpoint returns a `204 No Content` response on a successful call.


#### Usage example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
--data '{
	"roles": [
		"access_user",
		"reporting_user",
		"access_admin"
	]
}' \
https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}
```

##### Response

```json
HTTP 204 No Content
```
### List ASA Users of an ASA Group

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/users" />
This endpoint lists all ASA Users in an ASA Group.

This endpoint requires one of the following roles: `access_user`, `access_admin`, `reporting_user`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string | The ASA Group name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `contains`   |  string | (Optional) Includes ASA Users with name that contains the value. |
| `count`   |  number | (Optional) The number of objects per page. |
| `descending`   |  boolean | (Optional) The object order. |
| `offset`   |  string | (Optional) The page offset. |
| `prev`   |  boolean | (Optional) The direction of paging. |
| `starts_with`   |  string | (Optional) Includes ASA Users with name that begins with the value. |
| `status`   |  string | (Optional) Includes ASA Users with specified statuses. Valid statuses are `ACTIVE`, `DISABLED`, and `DELETED`. |
| `user_type`   |  string | (Optional) Includes ASA Users of the specified type. Valid types are `human` and `service`. |


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
https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/users
```

##### Response

```json
{
	"list": [
		{
			"deleted_at": null,
			"details": {
				"email": "benjy.compson@example.com",
				"first_name": "Benjy",
				"full_name": "Benjy Compson",
				"last_name": "Compson"
			},
			"id": "742433f1-b0a2-4952-bf43-b77198744de3",
			"name": "Benjy.Compson",
			"oauth_client_application_id": null,
			"role_grants": null,
			"status": "DISABLED",
			"user_type": "human"
		}
	]
}
```
### Add an ASA User to an ASA Group

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/users" />
This endpoint adds an ASA User to an ASA Group.

This endpoint requires one of the following roles: `access_admin`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string | The ASA Group name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
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

#### Response body
This endpoint returns a `204 No Content` response on a successful call.


#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
--data '{
	"deleted_at": null,
	"details": {
		"email": "jason.compson@example.com",
		"first_name": "Jason",
		"full_name": "Jason Compson IV",
		"last_name": "Compson"
	},
	"id": "9a9da2f0-55de-44b0-9086-cdbd86cc033d",
	"name": "Jason.Compson.IV",
	"oauth_client_application_id": null,
	"role_grants": null,
	"status": "ACTIVE",
	"user_type": "human"
}' \
https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/users
```

##### Response

```json
HTTP 204 No Content
```
### Remove an ASA User from an ASA Group

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/users/${user_name}" />
This endpoint removes an ASA User from an ASA Group.

This endpoint requires one of the following roles: `access_admin`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string | The ASA Group name. |
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
https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/users/${user_name}
```

##### Response

```json
HTTP 204 No Content
```
### List ASA Users of a Team not assigned to a ASA Group

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/users_not_in_group" />
This endpoint lists all ASA Users not in any ASA Group.

This endpoint requires one of the following roles: `access_user`, `access_admin`, `reporting_user`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string | The ASA Group name. |
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
https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/users_not_in_group
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
			"id": "9a9da2f0-55de-44b0-9086-cdbd86cc033d",
			"name": "Jason.Compson.IV",
			"oauth_client_application_id": null,
			"role_grants": null,
			"status": "ACTIVE",
			"user_type": "human"
		}
	]
}
```


