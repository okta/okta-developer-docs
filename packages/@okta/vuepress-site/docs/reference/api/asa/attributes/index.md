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
* [Lists the attributes for a user](#lists-the-attributes-for-a-user)
* [Fetch user attribute](#fetch-user-attribute)
* [Update a single attribute for a user](#update-a-single-attribute-for-a-user)
* [List group attributes](#list-group-attributes)
* [Fetch group attribute](#fetch-group-attribute)
* [Update group attribute](#update-group-attribute)


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
{"list":[{"attribute_name":"unix_user_name","attribute_value":"augusta_ada_king","id":"b9c682a8-8b9b-41c4-a391-e3783024453c","managed":true},{"attribute_name":"unix_uid","attribute_value":1210,"id":"795445dc-9e53-4a9f-90d0-54824f0342a3","managed":true},{"attribute_name":"unix_gid","attribute_value":1210,"id":"867fa971-1d68-489a-b081-afc4a372f12e","managed":true},{"attribute_name":"windows_user_name","attribute_value":"augusta_ada_king","id":"21ec4c06-6b7f-481d-bb87-16ad562e7b02","managed":true}]}
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
{"list":[{"attribute_name":"unix_group_name","attribute_value":"group_old","id":"9bf222ce-14c2-4e3f-bd34-ffe8c2218225","managed":false},{"attribute_name":"windows_group_name","attribute_value":"group_new","id":"254d66a1-c5a9-4f6c-a0b9-333a07b94c97","managed":false}]}
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
{"attribute_name":"unix_group_name","attribute_value":"group_old","id":"9bf222ce-14c2-4e3f-bd34-ffe8c2218225","managed":false}
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


