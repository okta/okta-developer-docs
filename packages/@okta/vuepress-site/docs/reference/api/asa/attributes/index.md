---
title: Introduction to Attribute Endpoints
category: asa
---

# Attributes API

## Getting Started

This article provides an overview of the attribute API

Explore the Attributes API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://example.com).


## Attributes Operations

The Attributes API has the following operations:
* [List group attributes](#list-group-attributes)
* [Fetch group attribute](#fetch-group-attribute)
* [Update group attribute](#update-group-attribute)
* [Lists the attributes for a user](#lists-the-attributes-for-a-user)
* [Fetch user attribute](#fetch-user-attribute)
* [Update a single attribute for a user](#update-a-single-attribute-for-a-user)


### List group attributes

<ApiOperation method="GET" url="/v1/teams/{team_name}/groups/{group_name}/attributes" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| group_name   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 200: List of attributes

Returns a list of [TeamGroupAttribute](/docs/asa/models.html#teamgroupattribute) objects.

#### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/groups/{group_name}/attributes
```

##### Response
```json
{"list":[{"attribute_name":"unix_group_name","attribute_value":"group_old","id":"dc80df68-ad9f-4294-9a32-9403bbd45a00","managed":false},{"attribute_name":"windows_group_name","attribute_value":"group_new","id":"431418f6-f001-47cd-825f-022e287e1167","managed":false}]}
```
### Fetch group attribute

<ApiOperation method="GET" url="/v1/teams/{team_name}/groups/{group_name}/attributes/{attribute_id}" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| group_name   | string |  |
| attribute_id   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 200: The attribute that was requested

Returns a [TeamGroupAttribute](/docs/asa/models.html#teamgroupattribute) object.

#### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/groups/{group_name}/attributes/{attribute_id}
```

##### Response
```json
{"attribute_name":"unix_group_name","attribute_value":"group_old","id":"dc80df68-ad9f-4294-9a32-9403bbd45a00","managed":false}
```
### Update group attribute

<ApiOperation method="PUT" url="/v1/teams/{team_name}/groups/{group_name}/attributes/{attribute_id}" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| group_name   | string |  |
| attribute_id   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

*Required:* Attribute to update
Uses a [UpdateGroupAttribute](/docs/asa/models.html#updategroupattribute) object.

#### Response Body

On returning a 204: The group attribute was updated successfully.



#### Usage Example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/groups/{group_name}/attributes/{attribute_id}
```

##### Response
```json

```
### Lists the attributes for a user

<ApiOperation method="GET" url="/v1/teams/{team_name}/users/{user_name}/attributes" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| user_name   | string |  |


#### Request Query Parameters

%List any query parameters here in alpha order%

| Parameter | Description   | Required |
| --------- | ------------- | -------- |
| offset   |   | false | 
| count   |   | false | 
| descending   |   | false | 
| prev   |   | false | 
| conflicting   |   | false | 


#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 200: List of User Attributes

Returns a list of [TeamUserAttribute](/docs/asa/models.html#teamuserattribute) objects.

#### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/users/{user_name}/attributes
```

##### Response
```json
{"list":[{"attribute_name":"unix_user_name","attribute_value":"augusta_ada_king","id":"b6c2ea20-337d-42c7-b0d3-78b777fc92f1","managed":true},{"attribute_name":"unix_uid","attribute_value":1210,"id":"a7fbbd26-0638-490d-8001-6782bb375830","managed":true},{"attribute_name":"unix_gid","attribute_value":1210,"id":"4eebed43-f82a-451f-a659-4437d2f8d1cc","managed":true},{"attribute_name":"windows_user_name","attribute_value":"augusta_ada_king","id":"41178a42-de93-45f1-9b6f-a1aa945330ea","managed":true}]}
```
### Fetch user attribute

<ApiOperation method="GET" url="/v1/teams/{team_name}/users/{user_name}/attributes/{attribute_id}" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| user_name   | string |  |
| attribute_id   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 200: The user attribute that was requested

Returns a [TeamUserAttribute](/docs/asa/models.html#teamuserattribute) object.

#### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/users/{user_name}/attributes/{attribute_id}
```

##### Response
```json

```
### Update a single attribute for a user

<ApiOperation method="PUT" url="/v1/teams/{team_name}/users/{user_name}/attributes/{attribute_id}" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| user_name   | string |  |
| attribute_id   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

*Required:* 
Uses a [UpdateAttribute](/docs/asa/models.html#updateattribute) object.

#### Response Body

On returning a 204: The attribute was updated successfully.



#### Usage Example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/users/{user_name}/attributes/{attribute_id}
```

##### Response
```json

```


