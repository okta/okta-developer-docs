---
title: Project Server Users
category: asa
---

# Project Server Users API

## Get started

This article covers how to manage Server Users in Projects.

Explore the Project Server Users API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://example.com).


## Project Server Users Operation


The Project Server Users API has the following operation:
* [List Server Users in a Project](#list-server-users-in-a-project)


### List Server Users in a Project

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_users" />


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

On returning a 200: List of Server Users

Returns a list of [APIServerUser](/docs/asa/objects.html#apiserveruser) objects.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_users

```

##### Response
```json
{
	"list": [
		{
			"admin": true,
			"id": "82feeef4-b09d-4fc5-b55b-5fc2a8d15af6",
			"server_user_name": "benjy",
			"status": "ACTIVE",
			"type": "human",
			"unix_gid": 63001,
			"unix_uid": 60001,
			"user_name": "benjycompson",
			"windows_server_user_name": "benjy"
		},
		{
			"admin": false,
			"id": "d2d470b3-38ed-45d7-902d-bd838c1e02fb",
			"server_user_name": "quentin",
			"status": "DELETED",
			"type": "human",
			"unix_gid": 63002,
			"unix_uid": 60002,
			"user_name": "quentincompson",
			"windows_server_user_name": "quentin"
		}
	]
}
```


