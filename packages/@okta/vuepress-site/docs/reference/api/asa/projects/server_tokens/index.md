---
title: Projects and Server Enrollment Tokens
category: asa
---

# Server Enrollment Tokens API

## Getting Started

This article covers how to manage server enrollment in projects.

Explore the Server Enrollment Tokens API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://example.com).


## Server Enrollment Tokens Operations

The Server Enrollment Tokens API has the following operations:
* [List server enrollment token within a project](#list-server-enrollment-token-within-a-project)
* [Create a server enrollment token for a project](#create-a-server-enrollment-token-for-a-project)
* [Delete a server enrollment token for a project](#delete-a-server-enrollment-token-for-a-project)
* [Fetch a server enrollment token from a project](#fetch-a-server-enrollment-token-from-a-project)


### List server enrollment token within a project

<ApiOperation method="GET" url="/v1/teams/{team_name}/projects/{project_name}/server_enrollment_tokens" />


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

On returning a 200: List of enrollment tokens in the project

Returns a list of [ServerEnrollmentToken](/docs/asa/models.html#serverenrollmenttoken) objects.

#### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/projects/{project_name}/server_enrollment_tokens
```

##### Response
```json

```
### Create a server enrollment token for a project

<ApiOperation method="POST" url="/v1/teams/{team_name}/projects/{project_name}/server_enrollment_tokens" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| project_name   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

*Required:* Token to create
Uses a [ServerEnrollmentToken](/docs/asa/models.html#serverenrollmenttoken) object.

#### Response Body

On returning a 201: Token was succesfully created

Returns a [ServerEnrollmentToken](/docs/asa/models.html#serverenrollmenttoken) object.

#### Usage Example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/projects/{project_name}/server_enrollment_tokens
```

##### Response
```json

```
### Delete a server enrollment token for a project

<ApiOperation method="DELETE" url="/v1/teams/{team_name}/projects/{project_name}/server_enrollment_tokens/{id}" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| project_name   | string |  |
| id   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 204: Token was successfully deleted



#### Usage Example

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/projects/{project_name}/server_enrollment_tokens/{id}
```

##### Response
```json

```
### Fetch a server enrollment token from a project

<ApiOperation method="GET" url="/v1/teams/{team_name}/projects/{project_name}/server_enrollment_tokens/{id}" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| project_name   | string |  |
| id   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 200: Token that was requested

Returns a [ServerEnrollmentToken](/docs/asa/models.html#serverenrollmenttoken) object.

#### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/projects/{project_name}/server_enrollment_tokens/{id}
```

##### Response
```json

```


