---
title: Projects and Servers
category: asa
---

# Project Servers API

## Getting Started

This article covers how to manage servers in projects.

Explore the Project Servers API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://example.com).


## Project Servers Operations

The Project Servers API has the following operations:
* [List servers in a project](#list-servers-in-a-project)
* [Add an unamanged server to a project](#add-an-unamanged-server-to-a-project)
* [Get a server object](#get-a-server-object)
* [Remove a server from a project](#remove-a-server-from-a-project)
* [Reassign a server to a different project](#reassign-a-server-to-a-different-project)


### List servers in a project

<ApiOperation method="GET" url="/v1/teams/{team_name}/projects/{project_name}/servers" />


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



#### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/projects/{project_name}/servers
```

##### Response
```json

```
### Add an unamanged server to a project

<ApiOperation method="POST" url="/v1/teams/{team_name}/projects/{project_name}/servers" />
Unmanaged servers don't use Advanced Server Access for authentication, but still receive Client Configuration options. Create an unmanaged server in order to control the options your team members use to connect to appliances, especially bastions which can't fully utilize Advanced Server Access.

#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| project_name   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

*Required:* Server information
Uses a [CreateServerBody](/docs/asa/models.html#createserverbody) object.

#### Response Body



#### Usage Example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/projects/{project_name}/servers
```

##### Response
```json

```
### Get a server object

<ApiOperation method="GET" url="/v1/teams/{team_name}/projects/{project_name}/servers/{server_id}" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| project_name   | string |  |
| server_id   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

This endpoint has no request body.

#### Response Body



#### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/projects/{project_name}/servers/{server_id}
```

##### Response
```json

```
### Remove a server from a project

<ApiOperation method="DELETE" url="/v1/teams/{team_name}/projects/{project_name}/servers/{server_id}" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| project_name   | string |  |
| server_id   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 204: The server has been removed.



#### Usage Example

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/projects/{project_name}/servers/{server_id}
```

##### Response
```json

```
### Reassign a server to a different project

<ApiOperation method="PUT" url="/v1/teams/{team_name}/projects/{project_name}/servers/{server_id}/reassign" />
Moving a server between projects will cause the new project to take over user and group synchronization, which may result in changes to local user names, UIDs or other attributes on the server. This will not remove local users or groups which do not exist on the new project, but any orphaned users will no longer be accessible via Advanced Server Access.

#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| project_name   | string |  |
| server_id   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

*Required:* The new project to move to
Uses a [UpdateServerBody](/docs/asa/models.html#updateserverbody) object.

#### Response Body

On returning a 204: The server has been moved.



#### Usage Example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/projects/{project_name}/servers/{server_id}/reassign
```

##### Response
```json

```


