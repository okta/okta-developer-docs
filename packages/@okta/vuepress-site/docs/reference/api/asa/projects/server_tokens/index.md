---
title: Server Enrollment Tokens
category: asa
---

# Server Enrollment Tokens API

## Get started

This article covers how to manage server enrollment in Projects.

Explore the Server Enrollment Tokens API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://example.com).


## Server Enrollment Tokens Operations


The Server Enrollment Tokens API has the following operations:
* [List Server Enrollment Tokens within a Project](#list-server-enrollment-tokens-within-a-project)
* [Create a Server Enrollment Token for a Project](#create-a-server-enrollment-token-for-a-project)
* [Fetch a Server Enrollment Token from a Project](#fetch-a-server-enrollment-token-from-a-project)
* [Delete a Server Enrollment Token from a Project](#delete-a-server-enrollment-token-from-a-project)


### List Server Enrollment Tokens within a Project

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_enrollment_tokens" />


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

On returning a 200: List of Server Enrollment Tokens in the Project

Returns a list of [ServerEnrollmentToken](/docs/asa/objects.html#serverenrollmenttoken) objects.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_enrollment_tokens

```

##### Response
```json

```
### Create a Server Enrollment Token for a Project

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_enrollment_tokens" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

*Required:* Token to create
Uses a [ServerEnrollmentToken](/docs/asa/objects.html#serverenrollmenttoken) object.

#### Response body

On returning a 201: Server Enrollment Token was successfully created

Returns a [ServerEnrollmentToken](/docs/asa/objects.html#serverenrollmenttoken) object.

#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_enrollment_tokens

```

##### Response
```json

```
### Fetch a Server Enrollment Token from a Project

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_enrollment_tokens/${id}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `id`   | string |  |
| `project_name`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body

On returning a 200: Server Enrollment Token that was requested

Returns a [ServerEnrollmentToken](/docs/asa/objects.html#serverenrollmenttoken) object.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_enrollment_tokens/${id}

```

##### Response
```json

```
### Delete a Server Enrollment Token from a Project

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_enrollment_tokens/${id}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `id`   | string |  |
| `project_name`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body

On returning a 204: Server Enrollment Token was successfully deleted



#### Usage example

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_enrollment_tokens/${id}

```

##### Response
```json

```


