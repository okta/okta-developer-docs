---
title: Attributes
category: asa
---

# Attributes API

## Get started

This article provides an overview of the Attributes API

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

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/attributes" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

%List any query parameters here in alpha order%

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `conflicting`   |  boolean | (Optional)  |
| `count`   |  integer | (Optional) The number of objects per page. |
| `descending`   |  boolean | (Optional) The object order. |
| `offset`   |  string | (Optional) The page offset. |
| `prev`   |  boolean | (Optional) The direction of paging. |


#### Request body

This endpoint has no request body.

#### Response body

On returning a 200: List of attributes.

Returns a list of [TeamGroupAttribute](/docs/asa/objects.html#teamgroupattribute) objects.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/attributes

```

##### Response
```json
{
	"list": [
		{
			"attribute_name": "unix_group_name",
			"attribute_value": "group_old",
			"id": "a888fedf-fb08-4877-97f4-ad2102ce7d1e",
			"managed": false
		},
		{
			"attribute_name": "windows_group_name",
			"attribute_value": "group_new",
			"id": "73fbe185-71e3-484a-a7dc-fa6189bb0066",
			"managed": false
		}
	]
}
```
### Fetch group attribute

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/attributes/${attribute_id}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `attribute_id`   | string |  |
| `group_name`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body

On returning a 200: The attribute that was requested.

Returns a [TeamGroupAttribute](/docs/asa/objects.html#teamgroupattribute) object.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/attributes/${attribute_id}

```

##### Response
```json
{
	"attribute_name": "unix_group_name",
	"attribute_value": "group_old",
	"id": "a888fedf-fb08-4877-97f4-ad2102ce7d1e",
	"managed": false
}
```
### Update group attribute

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/attributes/${attribute_id}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `attribute_id`   | string |  |
| `group_name`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

*Required:* Attribute to update
Uses a [UpdateGroupAttribute](/docs/asa/objects.html#updategroupattribute) object.

#### Response body

On returning a 204: The group attribute was updated successfully.



#### Usage example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/attributes/${attribute_id}
{
	"attribute_name": "unix_group_name",
	"attribute_value": 100
}
```

##### Response
```json

```
### Lists the attributes for a user

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}/attributes" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string |  |
| `user_name`   | string |  |


#### Request query parameters

%List any query parameters here in alpha order%

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `conflicting`   |  boolean | (Optional)  |
| `count`   |  integer | (Optional) The number of objects per page. |
| `descending`   |  boolean | (Optional) The object order. |
| `offset`   |  string | (Optional) The page offset. |
| `prev`   |  boolean | (Optional) The direction of paging. |


#### Request body

This endpoint has no request body.

#### Response body

On returning a 200: List of user attributes.

Returns a list of [TeamUserAttribute](/docs/asa/objects.html#teamuserattribute) objects.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/users/${user_name}/attributes

```

##### Response
```json
{
	"list": [
		{
			"attribute_name": "unix_user_name",
			"attribute_value": "augusta_ada_king",
			"id": "627ce600-bb71-48c9-b4c0-ac0a9bdce536",
			"managed": true
		},
		{
			"attribute_name": "unix_uid",
			"attribute_value": 1210,
			"id": "c208b887-43ef-4329-942c-90e6df6a2531",
			"managed": true
		},
		{
			"attribute_name": "unix_gid",
			"attribute_value": 1210,
			"id": "1e060322-eb37-4930-a10e-850640a65422",
			"managed": true
		},
		{
			"attribute_name": "windows_user_name",
			"attribute_value": "augusta_ada_king",
			"id": "f98c3e2e-96c8-40ed-8994-65814d43f9aa",
			"managed": true
		}
	]
}
```
### Fetch user attribute

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}/attributes/${attribute_id}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `attribute_id`   | string |  |
| `team_name`   | string |  |
| `user_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body

On returning a 200: The user attribute that was requested.

Returns a [TeamUserAttribute](/docs/asa/objects.html#teamuserattribute) object.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/users/${user_name}/attributes/${attribute_id}

```

##### Response
```json

```
### Update a single attribute for a user

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}/attributes/${attribute_id}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `attribute_id`   | string |  |
| `team_name`   | string |  |
| `user_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

*Required:* 
Uses a [UpdateAttribute](/docs/asa/objects.html#updateattribute) object.

#### Response body

On returning a 204: The attribute was updated successfully.



#### Usage example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/users/${user_name}/attributes/${attribute_id}
{
	"attribute_name": "unix_user_name",
	"attribute_value": "ada_lovelace"
}
```

##### Response
```json

```


