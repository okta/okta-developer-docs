---
title: ASA Attributes
category: asa
---

# ASA Attributes API

## Get Started


| Product  | API Basics  | API Namespace        |
|----------|-------------|----------------------|
| [Advanced Server Access](https://www.okta.com/products/advanced-server-access/) | [How the ASA API works](../intro/) | `https://app.scaleft.com/v1/`

ASA Attributes are key-value mappings that hold metadata of ASA Users and ASA Groups.


## Attributes API Operations


The Attributes API has the following operations:
* [List Group Attributes](#list-group-attributes)
* [Fetch a Group Attribute](#fetch-a-group-attribute)
* [Update a Group Attribute](#update-a-group-attribute)
* [List the Attributes for a User](#list-the-attributes-for-a-user)
* [Fetch a User Attribute](#fetch-a-user-attribute)
* [Update a single Attribute for a User](#update-a-single-attribute-for-a-user)


### List Group Attributes

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/attributes" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string | The ASA Group name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `conflicting`   |  boolean | (Optional) When true, returns attributes that conflict with other ASA Group attributes on this Team. |
| `count`   |  integer | (Optional) The number of objects per page. |
| `descending`   |  boolean | (Optional) The object order. |
| `offset`   |  string | (Optional) The page offset. |
| `prev`   |  boolean | (Optional) The direction of paging. |


#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `attribute_name`   | string | One of: `unix_group_name`, `unix_gid`, `windows_group_name`. |
| `attribute_value`   | object | The value of the attribute. Must be an integer for gid, a string for any other attribute type. |
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
			"id": "c8b53fbd-24c0-46c1-95ec-5ca001f62130",
			"managed": false
		},
		{
			"attribute_name": "windows_group_name",
			"attribute_value": "group_new",
			"id": "f7305522-b2a3-4660-a39e-684b55f1d28c",
			"managed": false
		}
	]
}
```
### Fetch a Group Attribute

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/attributes/${attribute_id}" />


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
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `attribute_name`   | string | One of: `unix_group_name`, `unix_gid`, `windows_group_name`. |
| `attribute_value`   | object | The value of the attribute. Must be an integer for gid, a string for any other attribute type. |
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
	"id": "c8b53fbd-24c0-46c1-95ec-5ca001f62130",
	"managed": false
}
```
### Update a Group Attribute

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/groups/${group_name}/attributes/${attribute_id}" />


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
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `attribute_name`   | string | Accepted names include unix_group_name, windows_group_name, and unix_gid. |
| `attribute_value`   | object | Accepted values are 0 to 255, 0 to 255, and 100 to 2147483647, respectively. |

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
### List the Attributes for a User

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}/attributes" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team. |
| `user_name`   | string | The relevant username. |


#### Request query parameters

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `conflicting`   |  boolean | (Optional) When true, returns attributes that conflict with other ASA User attributes on this Team. |
| `count`   |  integer | (Optional) The number of objects per page. |
| `descending`   |  boolean | (Optional) The object order. |
| `offset`   |  string | (Optional) The page offset. |
| `prev`   |  boolean | (Optional) The direction of paging. |


#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `attribute_name`   | string | One of: `unix_user_name`, `unix_uid`, `unix_gid`, `windows_user_name`. |
| `attribute_value`   | object | The value of the attribute. Must be an integer for uid/gid, a string for any other attribute type. |
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
			"id": "7efa7f94-7027-4c3e-909d-1a2b5348f41e",
			"managed": true
		},
		{
			"attribute_name": "unix_uid",
			"attribute_value": 1210,
			"id": "d71ffc05-34d0-40f9-9107-828675e8479a",
			"managed": true
		},
		{
			"attribute_name": "unix_gid",
			"attribute_value": 1210,
			"id": "6ce66020-a7c4-4313-a899-8546a532060c",
			"managed": true
		},
		{
			"attribute_name": "windows_user_name",
			"attribute_value": "augusta_ada_king",
			"id": "f80493a7-f521-4d81-852a-e651835c42f3",
			"managed": true
		}
	]
}
```
### Fetch a User Attribute

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}/attributes/${attribute_id}" />


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
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `attribute_name`   | string | One of: `unix_user_name`, `unix_uid`, `unix_gid`, `windows_user_name`. |
| `attribute_value`   | object | The value of the attribute. Must be an integer for uid/gid, a string for any other attribute type. |
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
HTTP 204 No Content
```
### Update a single Attribute for a User

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}/attributes/${attribute_id}" />


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
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `attribute_name`   | string | One of: `unix_group_name`, `unix_gid`, `windows_group_name`. |
| `attribute_value`   | object | The value of the attribute. Must be an integer for gid, a string for any other attribute type. |

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


