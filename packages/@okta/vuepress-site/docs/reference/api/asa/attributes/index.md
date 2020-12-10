---
title: ASA Attributes
category: asa
---

# ASA Attributes API

## Get started

The [Advanced Server Access (ASA) API](/docs/reference/api/asa/introduction/) is logically separate from the rest of the Okta APIs and uses a different API namespace:

`https://app.scaleft.com/v1/`

Advanced Server Access (ASA) Attributes are key-value mappings that hold metadata of ASA Users and ASA Groups.

Explore the Attributes API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/run-collection/fba803e43a4ae53667d4).


## Attributes API operations


The Attributes API has the following operations:
* [List Group Attributes](#list-group-attributes)
* [Fetch a Group Attribute](#fetch-a-group-attribute)
* [Update a Group Attribute](#update-a-group-attribute)
* [List the Attributes for a User](#list-the-attributes-for-a-user)
* [Fetch a User Attribute](#fetch-a-user-attribute)
* [Update a single Attribute for a User](#update-a-single-attribute-for-a-user)


### List Group Attributes

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/attributes" />
Lists the Attributes for an ASA Group

This endpoint requires one of the following roles: `access_admin`, `access_user`, or `reporting_user`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string | The ASA Group name |
| `team_name`   | string | The name of your Team |


#### Request query parameters

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `conflicting`   |  boolean | (Optional) When true, returns only attributes that conflict with other ASA Group attributes on this Team |
| `count`   |  number | (Optional) The number of objects per page |
| `descending`   |  boolean | (Optional) The object order |
| `offset`   |  string | (Optional) The page offset |
| `prev`   |  boolean | (Optional) The direction of paging |


#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `attribute_name`   | string | Accepted values: `unix_group_name`, `unix_gid`, or `windows_group_name` |
| `attribute_value`   | object | Accepted values for `unix_group_name` and `windows_group_name` are strings with a character length between 0 and 255. Accepted value for `unix_gid` is a number between 100 and 2147483647. |
| `id`   | string | The unique identifier for the attribute |
| `managed`   | boolean | Whether this attribute is being managed through SCIM or SAML |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/attributes
```

##### Response

```json
{
	"list": [
		{
			"attribute_name": "unix_group_name",
			"attribute_value": "group_old",
			"id": "36844d7c-f311-4a42-866c-f32a5a41e213",
			"managed": false
		},
		{
			"attribute_name": "windows_group_name",
			"attribute_value": "group_new",
			"id": "8eb50e3f-ef90-4215-b358-9318b35867de",
			"managed": false
		}
	]
}
```
### Fetch a Group Attribute

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/attributes/${attribute_id}" />
Fetches the details of an Attribute for an ASA Group

This endpoint requires one of the following roles: `access_user`, `reporting_user`, or `access_admin`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `attribute_id`   | string | The UUID of the Attribute |
| `group_name`   | string | The ASA Group name |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `attribute_name`   | string | Accepted values: `unix_group_name`, `unix_gid`, or `windows_group_name` |
| `attribute_value`   | object | Accepted values for `unix_group_name` and `windows_group_name` are strings with a character length between 0 and 255. Accepted value for `unix_gid` is a number between 100 and 2147483647. |
| `id`   | string | The unique identifier for the attribute |
| `managed`   | boolean | Whether this attribute is being managed through SCIM or SAML |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/attributes/${attribute_id}
```

##### Response

```json
{
	"attribute_name": "unix_group_name",
	"attribute_value": "group_old",
	"id": "36844d7c-f311-4a42-866c-f32a5a41e213",
	"managed": false
}
```
### Update a Group Attribute

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/attributes/${attribute_id}" />
Updates an Attribute for an ASA Group

This endpoint requires the `access_admin` role.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `attribute_id`   | string | The UUID of the Attribute |
| `group_name`   | string | The ASA Group name |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `attribute_name`   | string | Accepted names include `unix_group_name`, `windows_group_name`, and `unix_gid`. |
| `attribute_value`   | object | Accepted values for `unix_group_name` and `windows_group_name` are strings of length 0 to 255 and for `unix_gid`, a number between 100 to 2147483647. |

#### Response body
This endpoint returns a `204 No Content` response on a successful call.


#### Usage example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
--data '{
	"attribute_name": "unix_group_name",
	"attribute_value": "new_name"
}' \
https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/attributes/${attribute_id}
```

##### Response

```json
HTTP 204 No Content
```
### List the Attributes for a User

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}/attributes" />
Lists the Attributes for an ASA User

This endpoint requires one of the following roles: `access_user`, `reporting_user`, or `access_admin`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team |
| `user_name`   | string | The relevant username |


#### Request query parameters

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `conflicting`   |  boolean | (Optional) When true, returns only attributes that conflict with other ASA User attributes on this Team |
| `count`   |  number | (Optional) The number of objects per page |
| `descending`   |  boolean | (Optional) The object order |
| `offset`   |  string | (Optional) The page offset |
| `prev`   |  boolean | (Optional) The direction of paging |


#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `attribute_name`   | string | Accepted values: `unix_user_name`, `unix_uid`, `unix_gid`, or `windows_user_name`. |
| `attribute_value`   | object | Accepted values for `unix_user_name` and `windows_user_name` are strings with a character length between 0 and 255. Accepted values for `unix_uid` and `unix_gid` are a number between 100 and 2147483647. |
| `id`   | string | The unique identifier for the attribute |
| `managed`   | boolean | Whether this attribute is being managed through SCIM or SAML |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}/attributes
```

##### Response

```json
{
	"list": [
		{
			"attribute_name": "unix_user_name",
			"attribute_value": "augusta_ada_king",
			"id": "11faefa1-6b59-4a52-9492-43195cd07385",
			"managed": true
		},
		{
			"attribute_name": "unix_uid",
			"attribute_value": 1210,
			"id": "11faefa1-6b59-4a52-9492-43195cd07385",
			"managed": true
		},
		{
			"attribute_name": "unix_gid",
			"attribute_value": 1210,
			"id": "b06dfc59-ae9c-4243-b583-96d09988fd84",
			"managed": true
		},
		{
			"attribute_name": "windows_user_name",
			"attribute_value": "augusta_ada_king",
			"id": "ff2c0f25-b73d-4720-8aeb-b6c39a68a204",
			"managed": true
		}
	]
}
```
### Fetch a User Attribute

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}/attributes/${attribute_id}" />
Fetches the details of an Attribute for an ASA User

This endpoint requires one of the following roles: `reporting_user`, `access_admin`, or `access_user`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `attribute_id`   | string | The UUID of the Attribute |
| `team_name`   | string | The name of your Team |
| `user_name`   | string | The relevant username |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `attribute_name`   | string | Accepted values: `unix_user_name`, `unix_uid`, `unix_gid`, or `windows_user_name`. |
| `attribute_value`   | object | Accepted values for `unix_user_name` and `windows_user_name` are strings with a character length between 0 and 255. Accepted values for `unix_uid` and `unix_gid` are a number between 100 and 2147483647. |
| `id`   | string | The unique identifier for the attribute |
| `managed`   | boolean | Whether this attribute is being managed through SCIM or SAML |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}/attributes/${attribute_id}
```

##### Response

```json
{
	"attribute_name": "unix_user_name",
	"attribute_value": "augusta_ada_king",
	"id": "11faefa1-6b59-4a52-9492-43195cd07385",
	"managed": true
}
```
### Update a single Attribute for a User

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}/attributes/${attribute_id}" />
Updates an Attribute for an ASA User

This endpoint requires the `access_admin` role.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `attribute_id`   | string | The UUID of the Attribute |
| `team_name`   | string | The name of your Team |
| `user_name`   | string | The relevant username |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `attribute_name`   | string | Accepted values: `unix_group_name`, `unix_gid`, or `windows_group_name` |
| `attribute_value`   | object | Accepted values for `unix_group_name` and `windows_group_name` are strings with a character length between 0 and 255. Accepted value for `unix_gid` is a number between 100 and 2147483647. |

#### Response body
This endpoint returns a `204 No Content` response on a successful call.


#### Usage example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
--data '{
	"attribute_name": "unix_user_name",
	"attribute_value": "ada_lovelace"
}' \
https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}/attributes/${attribute_id}
```

##### Response

```json
HTTP 204 No Content
```


