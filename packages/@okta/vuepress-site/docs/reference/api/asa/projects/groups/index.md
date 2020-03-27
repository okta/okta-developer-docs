---
title: Projects and Groups
category: asa
---

# Project Groups API

## Getting Started

This article covers the management of groups within a single project.

Explore the Project Groups API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://example.com).


## Project Groups Operations

The Project Groups API has the following operations:
* [List all the server groups in a project](#list-all-the-server-groups-in-a-project)
* [List all the groups in a project](#list-all-the-groups-in-a-project)
* [Add a group to a project](#add-a-group-to-a-project)
* [Remove a group from a project](#remove-a-group-from-a-project)
* [Retrieve project details for a single project](#retrieve-project-details-for-a-single-project)
* [Change the project properties of a group](#change-the-project-properties-of-a-group)


### List all the server groups in a project

<ApiOperation method="GET" url="/v1/teams/{team_name}/projects/{project_name}/server_groups" />
This call returns all the server groups in a project.

#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| project_name   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 200: List of groups in the project

Returns a list of [ProjectServerGroup](/docs/asa/models.html#projectservergroup) objects.

#### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/projects/{project_name}/server_groups
```

##### Response
```json

```
### List all the groups in a project

<ApiOperation method="GET" url="/v1/teams/{team_name}/projects/{project_name}/groups" />
This call returns all the groups in a project.

#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| project_name   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 200: List of groups in the project

Returns a list of [ProjectGroup](/docs/asa/models.html#projectgroup) objects.

#### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/projects/{project_name}/groups
```

##### Response
```json

```
### Add a group to a project

<ApiOperation method="POST" url="/v1/teams/{team_name}/projects/{project_name}/groups" />
Adds a pre-existing group in the team to the project, enabling server access, with either user or admin permissions and the option to sync the group to the servers in the project.

#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| project_name   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

*Required:* The group with relevant project settings
Uses a [ProjectGroup](/docs/asa/models.html#projectgroup) object.

#### Response Body

On returning a 204: The group was succesfully added to the project.



#### Usage Example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/projects/{project_name}/groups
```

##### Response
```json

```
### Remove a group from a project

<ApiOperation method="DELETE" url="/v1/teams/{team_name}/projects/{project_name}/groups/{group_name}" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| project_name   | string |  |
| group_name   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 204: The group was succesfully removed from the project.



#### Usage Example

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/projects/{project_name}/groups/{group_name}
```

##### Response
```json

```
### Retrieve project details for a single project

<ApiOperation method="GET" url="/v1/teams/{team_name}/projects/{project_name}/groups/{group_name}" />
This call returns a project details for a group. Use `group_id` to access group-related details.

#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| project_name   | string |  |
| group_name   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 200: The project group object requested

Returns a [ProjectGroup](/docs/asa/models.html#projectgroup) object.

#### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/projects/{project_name}/groups/{group_name}
```

##### Response
```json

```
### Change the project properties of a group

<ApiOperation method="PUT" url="/v1/teams/{team_name}/projects/{project_name}/groups/{group_name}" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| project_name   | string |  |
| group_name   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

*Required:* The group and relevant project settings
Uses a [ProjectGroup](/docs/asa/models.html#projectgroup) object.

#### Response Body

On returning a 204: The group was succesfully added to the project.



#### Usage Example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/projects/{project_name}/groups/{group_name}
```

##### Response
```json

```


