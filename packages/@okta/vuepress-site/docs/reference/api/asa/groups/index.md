---
title: ASA Groups
category: asa
---

# ASA Groups API

## Get Started


| Product  | API Basics  | API Namespace        |
|----------|-------------|----------------------|
| [Advanced Server Access](https://www.okta.com/products/advanced-server-access/) | [How the ASA API works](../intro/) | `https://app.scaleft.com/v1/`

An ASA Group is a collection of ASA Users that share permissions and access.


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


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `contains`   |  string | (Optional) Includes ASA Groups with names that contain value. |
| `count`   |  integer | (Optional) The number of objects per page. |
| `descending`   |  boolean | (Optional) The object order. |
| `offset`   |  string | (Optional) The page offset. |
| `prev`   |  boolean | (Optional) The direction of paging. |


#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `federated_from_team`   | string | (Optional) The name of the Team from which to federate the ASA Group. |
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
			"id": "34e3b6ac-8e6a-4445-bf71-551d7591ac6b",
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
			"id": "5e7b3589-b6c2-406a-8238-2ba2290887f6",
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
| `federated_from_team`   | string | (Optional) The name of the Team from which to federate the ASA Group. |
| `name`   | string | The name of the ASA Group. |
| `roles`   | array | A list of roles for the ASA Group. Options are `access_user`, `access_admin` and `reporting_user`. |

#### Response body
This endpoint returns an object with the following fields and a `201` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `federated_from_team`   | string | (Optional) The name of the Team from which to federate the ASA Group. |
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
	"id": "5e7b3589-b6c2-406a-8238-2ba2290887f6",
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
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `federated_from_team`   | string | (Optional) The name of the Team from which to federate the ASA Group. |
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
	"id": "5e7b3589-b6c2-406a-8238-2ba2290887f6",
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


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string | The ASA Group name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Parameter | Type        | Description          |
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


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string | The ASA Group name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `contains`   |  string | (Optional) Includes ASA Users with name that contains the value. |
| `count`   |  integer | (Optional) The number of objects per page. |
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
			"id": "097575a5-d527-46c9-a96a-c3d8bc0e7f23",
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


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string | The ASA Group name. |
| `team_name`   | string | The name of your Team. |


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
	"id": "3ee57523-fa67-4b31-b11e-aaca8bfa946f",
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


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string | The ASA Group name. |
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
			"id": "3ee57523-fa67-4b31-b11e-aaca8bfa946f",
			"name": "Jason.Compson.IV",
			"oauth_client_application_id": null,
			"role_grants": null,
			"status": "ACTIVE",
			"user_type": "human"
		}
	]
}
```


