---
title: ASA Entitlements
category: asa
---

# ASA Entitlements API

## Get Started


| Product  | API Basics  | API Namespace        |
|----------|-------------|----------------------|
| [Advanced Server Access](https://www.okta.com/products/advanced-server-access/) | [How the ASA API works](../introduction/) | `https://app.scaleft.com/v1/`

Advanced Server Access (ASA) Entitlements offer ASA admins a system of layered permissions, which allow admins to specify the exact commands that their users can run on end servers.

Explore the Entitlements API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/run-collection/fba803e43a4ae53667d4).


## Entitlements API Operations


The Entitlements API has the following operations:
* [List the sudo Entitlements for a team](#list-the-sudo-entitlements-for-a-team)
* [Create a sudo Entitlement](#create-a-sudo-entitlement)
* [Fetch a single sudo Entitlement](#fetch-a-single-sudo-entitlement)
* [Delete a single sudo Entitlement](#delete-a-single-sudo-entitlement)
* [Update a single sudo Entitlement](#update-a-single-sudo-entitlement)


### List the sudo Entitlements for a team

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/entitlements/sudo" />
This endpoint lists the sudo Entitlements for a team.

This endpoint requires one of the following roles: `access_admin`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
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
| `add_env`   | array | A list of environment variables to include when running these commands. See [the sudo documentation](https://www.sudo.ws/man/1.8.13/sudoers.man.html#Command_environment) for more information. |
| `description`   | string | A description of the Entitlement. |
| `name`   | string | A name for the Entitlement. |
| `opt_no_exec`   | boolean | Whether to allow commands to execute child processes. |
| `opt_no_passwd`   | boolean | Whether or not to require a password when sudo is run (should generally not be used, as ASA accounts do not require a password). |
| `opt_run_as`   | string | A non-root User to run commands as. |
| `opt_set_env`   | boolean | Whether to allow overriding environment variables in commands. |
| `structured_commands`   | array | A list of commands to allow. |
| `sub_env`   | array | A list of environment variables to ignore when running these commands. See [the sudo documentation](https://www.sudo.ws/man/1.8.13/sudoers.man.html#Command_environment) for more information. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/entitlements/sudo
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
			"id": "226a1963-a1c8-4316-bb4d-da48f2e7652a",
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
### Create a sudo Entitlement

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/entitlements/sudo" />
This endpoint creates a sudo Entitlement, corresponding to a set of commands that can be run as sudo for a selected group.

This endpoint requires one of the following roles: `access_admin`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `add_env`   | array | A list of environment variables to include when running these commands. See [the sudo documentation](https://www.sudo.ws/man/1.8.13/sudoers.man.html#Command_environment) for more information. |
| `description`   | string | A description of the Entitlement. |
| `name`   | string | A name for the Entitlement. |
| `opt_no_exec`   | boolean | Whether to allow commands to execute child processes. |
| `opt_no_passwd`   | boolean | Whether or not to require a password when sudo is run (should generally not be used, as ASA accounts do not require a password). |
| `opt_run_as`   | string | A non-root User to run commands as. |
| `opt_set_env`   | boolean | Whether to allow overriding environment variables in commands. |
| `structured_commands`   | array | A list of commands to allow. |
| `sub_env`   | array | A list of environment variables to ignore when running these commands. See [the sudo documentation](https://www.sudo.ws/man/1.8.13/sudoers.man.html#Command_environment) for more information. |

#### Response body
This endpoint returns an object with the following fields and a `201` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `add_env`   | array | A list of environment variables to include when running these commands. See [the sudo documentation](https://www.sudo.ws/man/1.8.13/sudoers.man.html#Command_environment) for more information. |
| `description`   | string | A description of the Entitlement. |
| `name`   | string | A name for the Entitlement. |
| `opt_no_exec`   | boolean | Whether to allow commands to execute child processes. |
| `opt_no_passwd`   | boolean | Whether or not to require a password when sudo is run (should generally not be used, as ASA accounts do not require a password). |
| `opt_run_as`   | string | A non-root User to run commands as. |
| `opt_set_env`   | boolean | Whether to allow overriding environment variables in commands. |
| `structured_commands`   | array | A list of commands to allow. |
| `sub_env`   | array | A list of environment variables to ignore when running these commands. See [the sudo documentation](https://www.sudo.ws/man/1.8.13/sudoers.man.html#Command_environment) for more information. |

#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
--data '{
	"add_env": [],
	"commands": null,
	"created_at": "0001-01-01T00:00:00Z",
	"description": "desc",
	"id": "",
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
	"updated_at": "0001-01-01T00:00:00Z"
}' \
https://app.scaleft.com/v1/teams/${team_name}/entitlements/sudo
```

##### Response

```json
{
	"add_env": [],
	"commands": null,
	"created_at": "2018-04-07T00:00:00Z",
	"description": "desc",
	"id": "226a1963-a1c8-4316-bb4d-da48f2e7652a",
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
### Fetch a single sudo Entitlement

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/entitlements/sudo/${sudo_id}" />
This endpoint fetches the sudo Entitlement corresponding to the provided ID.

This endpoint requires one of the following roles: `access_admin`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `sudo_id`   | string | The UUID of the Sudo Entitlement. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `add_env`   | array | A list of environment variables to include when running these commands. See [the sudo documentation](https://www.sudo.ws/man/1.8.13/sudoers.man.html#Command_environment) for more information. |
| `description`   | string | A description of the Entitlement. |
| `name`   | string | A name for the Entitlement. |
| `opt_no_exec`   | boolean | Whether to allow commands to execute child processes. |
| `opt_no_passwd`   | boolean | Whether or not to require a password when sudo is run (should generally not be used, as ASA accounts do not require a password). |
| `opt_run_as`   | string | A non-root User to run commands as. |
| `opt_set_env`   | boolean | Whether to allow overriding environment variables in commands. |
| `structured_commands`   | array | A list of commands to allow. |
| `sub_env`   | array | A list of environment variables to ignore when running these commands. See [the sudo documentation](https://www.sudo.ws/man/1.8.13/sudoers.man.html#Command_environment) for more information. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/entitlements/sudo/${sudo_id}
```

##### Response

```json
{
	"add_env": [],
	"commands": null,
	"created_at": "2018-04-07T00:00:00Z",
	"description": "desc",
	"id": "226a1963-a1c8-4316-bb4d-da48f2e7652a",
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
### Delete a single sudo Entitlement

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/entitlements/sudo/${sudo_id}" />
This endpoint deletes the sudo Entitlement corresponding to the provided ID. The Entitlement must not be assigned to any Project in order to be deleted.

This endpoint requires one of the following roles: `access_admin`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `sudo_id`   | string | The UUID of the Sudo Entitlement. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a `204 No Content` response on a successful call.


#### Usage example

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/entitlements/sudo/${sudo_id}
```

##### Response

```json
HTTP 204 No Content
```
### Update a single sudo Entitlement

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/entitlements/sudo/${sudo_id}" />
This endpoint updates the sudo Entitlement corresponding to the provided ID.

This endpoint requires one of the following roles: `access_admin`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `sudo_id`   | string | The UUID of the Sudo Entitlement. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `add_env`   | array | A list of environment variables to include when running these commands. See [the sudo documentation](https://www.sudo.ws/man/1.8.13/sudoers.man.html#Command_environment) for more information. |
| `description`   | string | A description of the Entitlement. |
| `name`   | string | A name for the Entitlement. |
| `opt_no_exec`   | boolean | Whether to allow commands to execute child processes. |
| `opt_no_passwd`   | boolean | Whether or not to require a password when sudo is run (should generally not be used, as ASA accounts do not require a password). |
| `opt_run_as`   | string | A non-root User to run commands as. |
| `opt_set_env`   | boolean | Whether to allow overriding environment variables in commands. |
| `structured_commands`   | array | A list of commands to allow. |
| `sub_env`   | array | A list of environment variables to ignore when running these commands. See [the sudo documentation](https://www.sudo.ws/man/1.8.13/sudoers.man.html#Command_environment) for more information. |

#### Response body
This endpoint returns a `204 No Content` response on a successful call.


#### Usage example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
--data '{
	"add_env": [],
	"commands": null,
	"created_at": "2018-04-07T00:00:00Z",
	"description": "A new description",
	"id": "226a1963-a1c8-4316-bb4d-da48f2e7652a",
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
}' \
https://app.scaleft.com/v1/teams/${team_name}/entitlements/sudo/${sudo_id}
```

##### Response

```json
HTTP 204 No Content
```


