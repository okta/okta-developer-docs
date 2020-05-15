---
title: ASA Groups
category: asa
---

# ASA Groups API

## Get started

This article provides an overview of the ASA Groups API

Explore the ASA Groups API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://example.com).


## ASA Groups Operations


The ASA Groups API has the following operations:
* [Lists the groups for a team](#lists-the-groups-for-a-team)
* [Create a group](#create-a-group)
* [Fetches a single group](#fetches-a-single-group)
* [Remove group from team](#remove-group-from-team)
* [Update a group](#update-a-group)
* [List users of group](#list-users-of-group)
* [Add user to group](#add-user-to-group)
* [Remove user from group](#remove-user-from-group)
* [List users of a team not assigned to a group](#list-users-of-a-team-not-assigned-to-a-group)


### Lists the groups for a team

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/groups" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string |  |


#### Request query parameters

%List any query parameters here in alpha order%

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `contains`   |  string | (Optional) Includes groups with name that contain value. |
| `count`   |  integer | (Optional) The number of objects per page. |
| `descending`   |  boolean | (Optional) The object order. |
| `offset`   |  string | (Optional) The page offset. |
| `prev`   |  boolean | (Optional) The direction of paging. |


#### Request body

This endpoint has no request body.

#### Response body

On returning a 200: List of groups.

Returns a list of [Group](/docs/asa/objects.html#group) objects.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/groups

```

##### Response
```json
{
	"list": [
		{
			"deleted_at": "0001-01-01T00:00:00Z",
			"federated_from_team": "william-faulkner",
			"federation_approved_at": "2018-04-07T00:00:00Z",
			"id": "96dfd7fb-cc9a-4cfd-ab56-d38fcf70964c",
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
			"id": "2ddc20e1-b939-4023-ae13-0ece0ad9482a",
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
### Create a group

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/groups" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

*Required:* Group to create.
Uses a [Group](/docs/asa/objects.html#group) object.

#### Response body

On returning a 201: The group that was created.

Returns a [Group](/docs/asa/objects.html#group) object.

#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/groups
{
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
}
```

##### Response
```json
{
	"deleted_at": "0001-01-01T00:00:00Z",
	"federated_from_team": null,
	"federation_approved_at": null,
	"id": "2ddc20e1-b939-4023-ae13-0ece0ad9482a",
	"name": "compsons",
	"roles": [
		"access_user",
		"reporting_user",
		"access_admin"
	]
}
```
### Fetches a single group

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body

On returning a 200: The group that was requested.

Returns a [Group](/docs/asa/objects.html#group) object.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}

```

##### Response
```json

```
### Remove group from team

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body

On returning a 204: The group was removed successfully.



#### Usage example

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}

```

##### Response
```json

```
### Update a group

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

*Required:* Roles to update.
Uses a [GroupUpdate](/docs/asa/objects.html#groupupdate) object.

#### Response body

On returning a 204: The group was updated successfully.



#### Usage example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}
{
	"roles": [
		"access_user",
		"reporting_user",
		"access_admin"
	]
}
```

##### Response
```json

```
### List users of group

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/users" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

%List any query parameters here in alpha order%

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

On returning a 200: List of users.

Returns a list of [User](/docs/asa/objects.html#user) objects.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/users

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
			"id": "e4de46a8-8fa9-4612-a220-ab85952394e5",
			"name": "Benjy.Compson",
			"oauth_client_application_id": null,
			"role_grants": null,
			"status": "DISABLED",
			"user_type": "human"
		}
	]
}
```
### Add user to group

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/users" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

*Required:* Roles to update.
Uses a [GroupUpdate](/docs/asa/objects.html#groupupdate) object.

#### Response body

On returning a 204: The user was added to the group successfully.



#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/users
{
	"deleted_at": null,
	"details": {
		"email": "jason.compson@example.com",
		"first_name": "Jason",
		"full_name": "Jason Compson IV",
		"last_name": "Compson"
	},
	"id": "4664ad72-f7a6-4f3f-a530-0be5ccc54275",
	"name": "Jason.Compson.IV",
	"oauth_client_application_id": null,
	"role_grants": null,
	"status": "ACTIVE",
	"user_type": "human"
}
```

##### Response
```json

```
### Remove user from group

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/users/${user_name}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string |  |
| `team_name`   | string |  |
| `user_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body

On returning a 204: The user was removed from the group successfully.



#### Usage example

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/users/${user_name}

```

##### Response
```json

```
### List users of a team not assigned to a group

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/users_not_in_group" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string |  |
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

On returning a 200: List of users.

Returns a list of [User](/docs/asa/objects.html#user) objects.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/users_not_in_group

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
			"id": "4664ad72-f7a6-4f3f-a530-0be5ccc54275",
			"name": "Jason.Compson.IV",
			"oauth_client_application_id": null,
			"role_grants": null,
			"status": "ACTIVE",
			"user_type": "human"
		}
	]
}
```


