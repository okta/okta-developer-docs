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
* [List the Groups for a Team](#list-the-groups-for-a-team)
* [Create a Group](#create-a-group)
* [Fetch a single Group](#fetch-a-single-group)
* [Remove a Group from Team](#remove-a-group-from-team)
* [Update a Group](#update-a-group)
* [List Users of a Group](#list-users-of-a-group)
* [Add a User to a Group](#add-a-user-to-a-group)
* [Remove a User from a Group](#remove-a-user-from-a-group)
* [List Users of a Team not assigned to a Group](#list-users-of-a-team-not-assigned-to-a-group)


### List the Groups for a Team

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
| `federated_from_team`   | string | (Optional) The name of the Team from which to federate the Group. |
| `name`   | string | The name of the Group. |
| `roles`   | array | A list of roles for the Group. Options are `access_user`, `access_admin` and `reporting_user`. |

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
			"id": "02ccfce8-b7f9-4707-823c-b518cf460bdb",
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
			"id": "22b107e6-cf5d-4a90-8013-3c744352de82",
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
### Create a Group

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
| `federated_from_team`   | string | (Optional) The name of the Team from which to federate the Group. |
| `name`   | string | The name of the Group. |
| `roles`   | array | A list of roles for the Group. Options are `access_user`, `access_admin` and `reporting_user`. |

#### Response body
This endpoint returns an object with the following fields and a `201` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `federated_from_team`   | string | (Optional) The name of the Team from which to federate the Group. |
| `name`   | string | The name of the Group. |
| `roles`   | array | A list of roles for the Group. Options are `access_user`, `access_admin` and `reporting_user`. |

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
	"id": "22b107e6-cf5d-4a90-8013-3c744352de82",
	"name": "compsons",
	"roles": [
		"access_user",
		"reporting_user",
		"access_admin"
	]
}
```
### Fetch a single Group

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
| `federated_from_team`   | string | (Optional) The name of the Team from which to federate the Group. |
| `name`   | string | The name of the Group. |
| `roles`   | array | A list of roles for the Group. Options are `access_user`, `access_admin` and `reporting_user`. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \

https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}
```

##### Response
```json
HTTP 204 No Content
```
### Remove a Group from Team

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
### Update a Group

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
| `roles`   | array | A list of Roles for the Group. Options are `access_user`, `access_admin` and `reporting_user`. |

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
### List Users of a Group

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/users" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string | The ASA Group name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `contains`   |  string | (Optional) Includes users with name that contains the value. |
| `count`   |  integer | (Optional) The number of objects per page. |
| `descending`   |  boolean | (Optional) The object order. |
| `offset`   |  string | (Optional) The page offset. |
| `prev`   |  boolean | (Optional) The direction of paging. |
| `starts_with`   |  string | (Optional) Includes users with name that begins with the value. |
| `status`   |  string | (Optional) Includes users with specified statuses. Valid statuses are ACTIVE, DISABLED, and DELETED. |
| `user_type`   |  string | (Optional) Includes users of the specified type. Valid types are human and service. |


#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `details`   | object | An object with the following keys, the values of which are all strings: `first_name`, `last_name`, `full_name`, `email`. |
| `name`   | string | The name of the User. |
| `status`   | integer | One of `ACTIVE`, `DISABLED`, or `DELETED`. Users cannot disable or delete their own User. |

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
			"id": "51c7f515-d97a-4d7d-9918-895d0e704147",
			"name": "Benjy.Compson",
			"oauth_client_application_id": null,
			"role_grants": null,
			"status": "DISABLED",
			"user_type": "human"
		}
	]
}
```
### Add a User to a Group

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
| `roles`   | array | A list of Roles for the Group. Options are `access_user`, `access_admin` and `reporting_user`. |

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
	"id": "a18fe558-be47-4ae5-a2a8-ad622c3df259",
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
### Remove a User from a Group

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
### List Users of a Team not assigned to a Group

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/users_not_in_group" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string | The ASA Group name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

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
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `details`   | object | An object with the following keys, the values of which are all strings: `first_name`, `last_name`, `full_name`, `email`. |
| `name`   | string | The name of the User. |
| `status`   | integer | One of `ACTIVE`, `DISABLED`, or `DELETED`. Users cannot disable or delete their own User. |

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
			"id": "a18fe558-be47-4ae5-a2a8-ad622c3df259",
			"name": "Jason.Compson.IV",
			"oauth_client_application_id": null,
			"role_grants": null,
			"status": "ACTIVE",
			"user_type": "human"
		}
	]
}
```


