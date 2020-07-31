---
title: ASA Users
category: asa
---

# ASA Users API

## Get Started


| Product  | API Basics  | API Namespace        |
|----------|-------------|----------------------|
| [Advanced Server
Access](https://www.okta.com/products/advanced-server-access/) | [How the ASA API works](../introduction/) | `https://app.scaleft.com/v1/`

An ASA User corresponds to a human or service user in the ASA ecosystem.


## Users API Operations


The Users API has the following operations:
* [List the ASA Users for a team](#list-the-asa-users-for-a-team)
* [Fetch an ASA User](#fetch-an-asa-user)
* [Update an ASA User](#update-an-asa-user)
* [List Groups a specific ASA User is a member of](#list-groups-a-specific-asa-user-is-a-member-of)


### List the ASA Users for a team

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/users" />


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
https://app.scaleft.com/v1/teams/${team_name}/users```

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
			"id": "6918503b-3345-462c-abc2-e32f92231685",
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
			"id": "470117b4-9d2e-4282-80fd-bd7cfa6815b3",
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
			"id": "f757ea13-159c-4b4e-a14b-3267d726ffe4",
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
https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}```

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
	"id": "6918503b-3345-462c-abc2-e32f92231685",
	"name": "Jason.Compson.IV",
	"oauth_client_application_id": null,
	"role_grants": null,
	"status": "ACTIVE",
	"user_type": "human"
}
```
### Update an ASA User

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}" />


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
https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}```

##### Response
```json
HTTP 204 No Content
```
### List Groups a specific ASA User is a member of

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}/groups" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team. |
| `user_name`   | string | The relevant username. |


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
https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}/groups```

##### Response
```json
{
	"list": [
		{
			"deleted_at": "0001-01-01T00:00:00Z",
			"federated_from_team": null,
			"federation_approved_at": null,
			"id": "71d6c3ff-d930-4445-86a2-138386b535c5",
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


