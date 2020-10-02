---
title: ASA Attributes
category: asa
---

# ASA Attributes API

## Get Started


| Product  | API Basics  | API Namespace        |
|----------|-------------|----------------------|
| [Advanced Server Access](https://www.okta.com/products/advanced-server-access/) | [How the ASA API works](../introduction/) | `https://app.scaleft.com/v1/`

Advanced Server Access (ASA) Attributes are key-value mappings that hold metadata of ASA Users and ASA Groups.

Explore the Attributes API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/run-collection/fba803e43a4ae53667d4).


## Attributes API Operations


The Attributes API has the following operations:
* [List Group Attributes](#list-group-attributes)
* [Fetch a Group Attribute](#fetch-a-group-attribute)
* [Update a Group Attribute](#update-a-group-attribute)
* [List the Attributes for an ASA User](#list-the-attributes-for-an-asa-user)
* [Fetch a User Attribute](#fetch-a-user-attribute)
* [Update a single Attribute for a User](#update-a-single-attribute-for-a-user)


### List Group Attributes

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/attributes" />
This endpoint lists the Attributes for an ASA Group.

This endpoint requires one of the following roles: `reporting_user`, `access_admin`, `access_user`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string | The ASA Group name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `conflicting`   |  boolean | (Optional) When true, returns only attributes that conflict with other ASA Group attributes on this Team. |
| `count`   |  number | (Optional) The number of objects per page. |
| `descending`   |  boolean | (Optional) The object order. |
| `offset`   |  string | (Optional) The page offset. |
| `prev`   |  boolean | (Optional) The direction of paging. |


#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `attribute_name`   | string | One of: `unix_group_name`, `unix_gid`, `windows_group_name`. |
| `attribute_value`   | object | The value of the attribute. Must be a number for gid, a string for any other attribute type. |
| `id`   | string | The unique identifier for the attribute. |
| `managed`   | boolean | Whether or not this attribute is being managed through SCIM or SAML. |

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
This endpoint fetches the details of an Attribute for an ASA Group.

This endpoint requires one of the following roles: `access_user`, `reporting_user`, `access_admin`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `attribute_id`   | string | The UUID of the Attribute. |
| `group_name`   | string | The ASA Group name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `attribute_name`   | string | One of: `unix_group_name`, `unix_gid`, `windows_group_name`. |
| `attribute_value`   | object | The value of the attribute. Must be a number for gid, a string for any other attribute type. |
| `id`   | string | The unique identifier for the attribute. |
| `managed`   | boolean | Whether or not this attribute is being managed through SCIM or SAML. |

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
This endpoint updates an Attribute for an ASA Group.

This endpoint requires one of the following roles: `access_admin`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `attribute_id`   | string | The UUID of the Attribute. |
| `group_name`   | string | The ASA Group name. |
| `team_name`   | string | The name of your Team. |


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
	"attribute_value": 100
}' \
https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/attributes/${attribute_id}
```

##### Response

```json
HTTP 204 No Content
```
### List the Attributes for an ASA User

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}/attributes" />
This endpoint lists the Attributes for an ASA User.

This endpoint requires one of the following roles: `access_admin`, `access_user`, `reporting_user`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team. |
| `user_name`   | string | The relevant username. |


#### Request query parameters

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `conflicting`   |  boolean | (Optional) When true, returns only attributes that conflict with other ASA User attributes on this Team. |
| `count`   |  number | (Optional) The number of objects per page. |
| `descending`   |  boolean | (Optional) The object order. |
| `offset`   |  string | (Optional) The page offset. |
| `prev`   |  boolean | (Optional) The direction of paging. |


#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `attribute_name`   | string | One of: `unix_user_name`, `unix_uid`, `unix_gid`, `windows_user_name`. |
| `attribute_value`   | object | The value of the attribute. Must be a number for uid/gid, a string for any other attribute type. |
| `id`   | string | The unique identifier for the attribute. |
| `managed`   | boolean | Whether or not this attribute is being managed through SCIM or SAML. |

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
			"id": "3a95c65d-d1dc-4642-b25b-5b74d5bd8da5",
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
This endpoint fetches the details of an Attribute for an ASA User.

This endpoint requires one of the following roles: `access_admin`, `access_user`, `reporting_user`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `attribute_id`   | string | The UUID of the Attribute. |
| `team_name`   | string | The name of your Team. |
| `user_name`   | string | The relevant username. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `attribute_name`   | string | One of: `unix_user_name`, `unix_uid`, `unix_gid`, `windows_user_name`. |
| `attribute_value`   | object | The value of the attribute. Must be a number for uid/gid, a string for any other attribute type. |
| `id`   | string | The unique identifier for the attribute. |
| `managed`   | boolean | Whether or not this attribute is being managed through SCIM or SAML. |

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
This endpoint updates an Attribute for an ASA User.

This endpoint requires one of the following roles: `access_admin`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `attribute_id`   | string | The UUID of the Attribute. |
| `team_name`   | string | The name of your Team. |
| `user_name`   | string | The relevant username. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `attribute_name`   | string | One of: `unix_group_name`, `unix_gid`, `windows_group_name`. |
| `attribute_value`   | object | The value of the attribute. Must be a number for gid, a string for any other attribute type. |

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


