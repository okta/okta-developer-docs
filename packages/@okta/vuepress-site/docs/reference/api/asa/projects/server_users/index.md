---
title: Projects and Server Users
category: asa
---

# Project Server Users API

## Getting Started

This article covers how to manage server users in projects.

Explore the Project Server Users API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://example.com).


## Project Server Users Operations

The Project Server Users API has the following operations:
* [List server users in a project](#list-server-users-in-a-project)


### List server users in a project

<ApiOperation method="GET" url="/v1/teams/{team_name}/projects/{project_name}/server_users" />


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

On returning a 200: List of server users

Returns a list of [APIServerUser](/docs/asa/models.html#apiserveruser) objects.

#### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/projects/{project_name}/server_users
```

##### Response
```json
{"list":[{"admin":true,"id":"dd77fc43-9ac6-45ab-98f7-34621f710343","server_user_name":"benjy","status":"ACTIVE","type":"human","unix_gid":63001,"unix_uid":60001,"user_name":"benjycompson","windows_server_user_name":"benjy"},{"admin":false,"id":"5ff36d57-f877-4d52-986a-b0f83a3f8397","server_user_name":"quentin","status":"DELETED","type":"human","unix_gid":63002,"unix_uid":60002,"user_name":"quentincompson","windows_server_user_name":"quentin"}]}
```


