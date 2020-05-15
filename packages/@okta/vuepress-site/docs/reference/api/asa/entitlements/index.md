---
title: Entitlements
category: asa
---

# Entitlements API

## Get started

This article provides an overview of the Entitlements API

Explore the Entitlements API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://example.com).


## Entitlements Operations


The Entitlements API has the following operations:
* [Lists the sudo entitlements for a team](#lists-the-sudo-entitlements-for-a-team)
* [Creates a sudo entitlement](#creates-a-sudo-entitlement)
* [Fetches a single sudo entitlement](#fetches-a-single-sudo-entitlement)
* [Deletes a single sudo entitlement](#deletes-a-single-sudo-entitlement)
* [Updates a sudo entitlement](#updates-a-sudo-entitlement)


### Lists the sudo entitlements for a team

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/entitlements/sudo" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string |  |


#### Request query parameters

%List any query parameters here in alpha order%

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `count`   |  integer | (Optional) The number of objects per page. |
| `descending`   |  boolean | (Optional) The object order. |
| `offset`   |  string | (Optional) The page offset. |
| `prev`   |  boolean | (Optional) The direction of paging. |


#### Request body

This endpoint has no request body.

#### Response body

On returning a 200: List of sudo entitlements.

Returns a list of [EntitlementSudo](/docs/asa/objects.html#entitlementsudo) objects.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/entitlements/sudo

```

##### Response
```json
{
	"list": [
		{
			"add_env": [],
			"commands": null,
			"created_at": "2018-04-07T00:00:00Z",
			"description": "desc",
			"id": "4713d5a6-f709-4b8a-b1fd-c37f905a4840",
			"name": "name",
			"opt_no_exec": false,
			"opt_no_passwd": true,
			"opt_run_as": "",
			"opt_set_env": false,
			"structured_commands": [
				{
					"args": null,
					"args_type": "none",
					"command": "/bin/ls",
					"command_type": "executable",
					"rendered_command": ""
				},
				{
					"args": null,
					"args_type": null,
					"command": "/bin/",
					"command_type": "directory",
					"rendered_command": ""
				}
			],
			"sub_env": [],
			"updated_at": "2018-04-07T00:00:00Z"
		}
	]
}
```
### Creates a sudo entitlement

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/entitlements/sudo" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

*Required:* Sudo entitlement to create
Uses a [EntitlementSudo](/docs/asa/objects.html#entitlementsudo) object.

#### Response body

On returning a 201: The sudo entitlement that was created.

Returns a [EntitlementSudo](/docs/asa/objects.html#entitlementsudo) object.

#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/entitlements/sudo
{
	"add_env": [],
	"commands": null,
	"created_at": "2018-04-07T00:00:00Z",
	"description": "desc",
	"id": "4713d5a6-f709-4b8a-b1fd-c37f905a4840",
	"name": "name",
	"opt_no_exec": false,
	"opt_no_passwd": true,
	"opt_run_as": "",
	"opt_set_env": false,
	"structured_commands": [
		{
			"args": null,
			"args_type": "none",
			"command": "/bin/ls",
			"command_type": "executable",
			"rendered_command": ""
		},
		{
			"args": null,
			"args_type": null,
			"command": "/bin/",
			"command_type": "directory",
			"rendered_command": ""
		}
	],
	"sub_env": [],
	"updated_at": "2018-04-07T00:00:00Z"
}
```

##### Response
```json

```
### Fetches a single sudo entitlement

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/entitlements/sudo/${sudo_id}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `sudo_id`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body

On returning a 200: The sudo entitlement that was requested.

Returns a [EntitlementSudo](/docs/asa/objects.html#entitlementsudo) object.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/entitlements/sudo/${sudo_id}

```

##### Response
```json
{
	"add_env": [],
	"commands": null,
	"created_at": "2018-04-07T00:00:00Z",
	"description": "desc",
	"id": "4713d5a6-f709-4b8a-b1fd-c37f905a4840",
	"name": "name",
	"opt_no_exec": false,
	"opt_no_passwd": true,
	"opt_run_as": "",
	"opt_set_env": false,
	"structured_commands": [
		{
			"args": null,
			"args_type": "none",
			"command": "/bin/ls",
			"command_type": "executable",
			"rendered_command": ""
		},
		{
			"args": null,
			"args_type": null,
			"command": "/bin/",
			"command_type": "directory",
			"rendered_command": ""
		}
	],
	"sub_env": [],
	"updated_at": "2018-04-07T00:00:00Z"
}
```
### Deletes a single sudo entitlement

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/entitlements/sudo/${sudo_id}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `sudo_id`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body

On returning a 204: The sudo entitlement was deleted successfully.



#### Usage example

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/entitlements/sudo/${sudo_id}

```

##### Response
```json

```
### Updates a sudo entitlement

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/entitlements/sudo/${sudo_id}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `sudo_id`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

*Required:* 
Uses a [EntitlementSudo](/docs/asa/objects.html#entitlementsudo) object.

#### Response body

On returning a 204: The sudo entitlement was updated successfully.



#### Usage example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/entitlements/sudo/${sudo_id}

```

##### Response
```json

```


