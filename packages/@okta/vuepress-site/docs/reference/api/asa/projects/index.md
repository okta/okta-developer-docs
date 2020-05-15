---
title: Projects
category: asa
---

# Projects API

## Get started

This article provides an overview of the Projects API

Explore the Projects API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://example.com).


## Projects Operations


The Projects API has the following operations:
* [Lists the projects for a team](#lists-the-projects-for-a-team)
* [Create a project](#create-a-project)
* [Fetches a single project](#fetches-a-single-project)
* [Deleting a project by ID](#deleting-a-project-by-id)
* [Updating a single project by ID](#updating-a-single-project-by-id)


### Lists the projects for a team

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string |  |


#### Request query parameters

%List any query parameters here in alpha order%

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `count`   |  integer | (Optional) The number of objects per page. |
| `descending`   |  boolean | (Optional) The object order. |
| `offset`   |  string | (Optional) The page offset. |
| `prev`   |  boolean | (Optional) The direction of paging. |
| `self`   |  boolean | (Optional)  |


#### Request body

This endpoint has no request body.

#### Response body

On returning a 200: List of projects.

Returns a list of [Project](/docs/asa/objects.html#project) objects.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/projects

```

##### Response
```json
{
	"list": [
		{
			"create_server_users": true,
			"deleted_at": "0001-01-01T00:00:00Z",
			"force_shared_ssh_users": false,
			"id": "36f775cc-e34f-47d3-945d-7b9980520d27",
			"name": "the-sound-and-the-fury",
			"next_unix_gid": 63001,
			"next_unix_uid": 60001,
			"require_preauth_for_creds": true,
			"shared_admin_user_name": null,
			"shared_standard_user_name": null,
			"team": "william-faulkner",
			"user_on_demand_period": null
		},
		{
			"create_server_users": true,
			"deleted_at": "0001-01-01T00:00:00Z",
			"force_shared_ssh_users": false,
			"id": "36f775cc-e34f-47d3-945d-7b9980520d27",
			"name": "the-sound-and-the-fury",
			"next_unix_gid": 63001,
			"next_unix_uid": 60001,
			"require_preauth_for_creds": true,
			"shared_admin_user_name": null,
			"shared_standard_user_name": null,
			"team": "william-faulkner",
			"user_on_demand_period": null
		}
	]
}
```
### Create a project

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/projects" />
Creates a project for a team

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

*Required:* Project to create
Uses a [Project](/docs/asa/objects.html#project) object.

#### Response body

On returning a 201: The project that was created.

Returns a [Project](/docs/asa/objects.html#project) object.

#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/projects
{
	"create_server_users": true,
	"deleted_at": null,
	"force_shared_ssh_users": false,
	"id": "",
	"name": "the-sound-and-the-fury",
	"next_unix_gid": null,
	"next_unix_uid": 0,
	"require_preauth_for_creds": true,
	"shared_admin_user_name": null,
	"shared_standard_user_name": null,
	"team": "william-faulkner",
	"user_on_demand_period": null
}
```

##### Response
```json
{
	"create_server_users": true,
	"deleted_at": "0001-01-01T00:00:00Z",
	"force_shared_ssh_users": false,
	"id": "36f775cc-e34f-47d3-945d-7b9980520d27",
	"name": "the-sound-and-the-fury",
	"next_unix_gid": 63001,
	"next_unix_uid": 60001,
	"require_preauth_for_creds": true,
	"shared_admin_user_name": null,
	"shared_standard_user_name": null,
	"team": "william-faulkner",
	"user_on_demand_period": null
}
```
### Fetches a single project

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body

On returning a 200: The project that was requested.

Returns a [Project](/docs/asa/objects.html#project) object.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}

```

##### Response
```json

```
### Deleting a project by ID

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body

On returning a 204: The project was deleted successfully.



#### Usage example

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}

```

##### Response
```json

```
### Updating a single project by ID

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

*Required:* 
Uses a [ProjectUpdate](/docs/asa/objects.html#projectupdate) object.

#### Response body

On returning a 204: The project was updated successfully.



#### Usage example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}
{
	"create_server_users": true,
	"next_unix_gid": 63011,
	"next_unix_uid": 60011,
	"require_preauth_for_creds": false,
	"user_on_demand_period": null
}
```

##### Response
```json

```


