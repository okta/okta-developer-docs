---
title: ASA Projects
category: asa
---

# ASA Projects API

## Get Started


| Product  | API Basics  | API Namespace        |
|----------|-------------|----------------------|
| [Advanced Server Access](https://www.okta.com/products/advanced-server-access/) | [How the ASA API works](../intro/) | `https://app.scaleft.com/v1/`

An ASA Project is a collection of ASA Servers and ASA Users that have access to those Servers through ASA Groups.


## Projects API Operations


The Projects API has the following operations:
* [List Projects for a Team](#list-projects-for-a-team)
* [Create a Project](#create-a-project)
* [Fetch a Project](#fetch-a-project)
* [Delete a Project](#delete-a-project)
* [Update a Project](#update-a-project)
* [List Client Configuration Options for a Project](#list-client-configuration-options-for-a-project)
* [Add Client Configuration Options for a Project](#add-client-configuration-options-for-a-project)
* [Remove a Client Configuration Option from a Project](#remove-a-client-configuration-option-from-a-project)
* [List Cloud Accounts in a Project](#list-cloud-accounts-in-a-project)
* [Add a Cloud Account to a Project](#add-a-cloud-account-to-a-project)
* [Remove a Cloud Account from a Project](#remove-a-cloud-account-from-a-project)
* [List all the Groups in a Project](#list-all-the-groups-in-a-project)
* [Add a Group to a Project](#add-a-group-to-a-project)
* [Retrieve Group details for a single Project](#retrieve-group-details-for-a-single-project)
* [Remove a Group from a Project](#remove-a-group-from-a-project)
* [Change the Project properties of a Group](#change-the-project-properties-of-a-group)
* [Fetch a Preauthorization](#fetch-a-preauthorization)
* [Create a Preauthorization](#create-a-preauthorization)
* [Lists the Preauthorizations for a Project](#lists-the-preauthorizations-for-a-project)
* [Update a Preauthorization](#update-a-preauthorization)
* [List Server Enrollment Tokens within a Project](#list-server-enrollment-tokens-within-a-project)
* [Create a Server Enrollment Token for a Project](#create-a-server-enrollment-token-for-a-project)
* [Fetch a Server Enrollment Token from a Project](#fetch-a-server-enrollment-token-from-a-project)
* [Delete a Server Enrollment Token from a Project](#delete-a-server-enrollment-token-from-a-project)
* [List Server Users in a Project](#list-server-users-in-a-project)
* [List Servers in a Project](#list-servers-in-a-project)
* [Add an Unmanaged Server to a Project](#add-an-unmanaged-server-to-a-project)
* [Get a Server object](#get-a-server-object)
* [Remove a Server from a Project](#remove-a-server-from-a-project)


### List Projects for a Team

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `count`   |  integer | (Optional) The number of objects per page. |
| `descending`   |  boolean | (Optional) The object order. |
| `offset`   |  string | (Optional) The page offset. |
| `prev`   |  boolean | (Optional) The direction of paging. |
| `self`   |  boolean | (Optional)  |


#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `create_server_users`   | boolean | (Optional) Whether or not to create Server Users for Users in this Project. Defaults to `False`. If left false, the User is responsible for ensuring that Users matching the Server User names in ASA exist on the server. |
| `force_shared_ssh_users`   | boolean | (Optional) If true, new Server users will not be created for each User in the Project. Instead they will share a single standard user and a single admin user. Defaults to `False`. |
| `forward_traffic`   | boolean | Whether or not to require all traffic in project to be forwarded through selected Gateways. Defaults to `False`. |
| `name`   | string | The name of the Project. |
| `rdp_session_recording`   | boolean | Whether or not to enable rdp recording on all servers in this project. Defaults to `False`. |
| `require_preauth_for_creds`   | boolean | (Optional) Whether or not to require preauthorization before a User can retrieve credentials to log in. Defaults to `False`. |
| `shared_admin_user_name`   | string | (Optional) The name for a shared admin user on servers in this project. If `force_shared_ssh_users` is `True`, this must be provided. |
| `shared_standard_user_name`   | string | (Optional) The name for a shared standard user on servers in this project. If `force_shared_ssh_users` is `True`, this must be provided. |
| `ssh_session_recording`   | boolean | Whether or not to enable ssh recording on all servers in this project. Defaults to `False`. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \

https://app.scaleft.com/v1/teams/${team_name}/projects
```

##### Response
```json
{
	"list": [
		{
			"create_server_users": true,
			"deleted_at": "0001-01-01T00:00:00Z",
			"force_shared_ssh_users": false,
			"id": "1b127da1-bde2-4b37-993f-499cf4e2aa58",
			"name": "the-sound-and-the-fury",
			"next_unix_gid": 63001,
			"next_unix_uid": 60001,
			"require_preauth_for_creds": true,
			"shared_admin_user_name": null,
			"shared_standard_user_name": null,
			"team": "william-faulkner",
			"user_on_demand_period": null
		},
		{
			"create_server_users": true,
			"deleted_at": "0001-01-01T00:00:00Z",
			"force_shared_ssh_users": false,
			"id": "1b127da1-bde2-4b37-993f-499cf4e2aa58",
			"name": "the-sound-and-the-fury",
			"next_unix_gid": 63001,
			"next_unix_uid": 60001,
			"require_preauth_for_creds": true,
			"shared_admin_user_name": null,
			"shared_standard_user_name": null,
			"team": "william-faulkner",
			"user_on_demand_period": null
		}
	]
}
```
### Create a Project

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/projects" />
Create a Project

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `create_server_users`   | boolean | (Optional) Whether or not to create Server Users for Users in this Project. Defaults to `False`. If left false, the User is responsible for ensuring that Users matching the Server User names in ASA exist on the server. |
| `force_shared_ssh_users`   | boolean | (Optional) If true, new Server users will not be created for each User in the Project. Instead they will share a single standard user and a single admin user. Defaults to `False`. |
| `forward_traffic`   | boolean | Whether or not to require all traffic in project to be forwarded through selected Gateways. Defaults to `False`. |
| `name`   | string | The name of the Project. |
| `rdp_session_recording`   | boolean | Whether or not to enable rdp recording on all servers in this project. Defaults to `False`. |
| `require_preauth_for_creds`   | boolean | (Optional) Whether or not to require preauthorization before a User can retrieve credentials to log in. Defaults to `False`. |
| `shared_admin_user_name`   | string | (Optional) The name for a shared admin user on servers in this project. If `force_shared_ssh_users` is `True`, this must be provided. |
| `shared_standard_user_name`   | string | (Optional) The name for a shared standard user on servers in this project. If `force_shared_ssh_users` is `True`, this must be provided. |
| `ssh_session_recording`   | boolean | Whether or not to enable ssh recording on all servers in this project. Defaults to `False`. |

#### Response body
This endpoint returns an object with the following fields and a `201` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `create_server_users`   | boolean | (Optional) Whether or not to create Server Users for Users in this Project. Defaults to `False`. If left false, the User is responsible for ensuring that Users matching the Server User names in ASA exist on the server. |
| `force_shared_ssh_users`   | boolean | (Optional) If true, new Server users will not be created for each User in the Project. Instead they will share a single standard user and a single admin user. Defaults to `False`. |
| `forward_traffic`   | boolean | Whether or not to require all traffic in project to be forwarded through selected Gateways. Defaults to `False`. |
| `name`   | string | The name of the Project. |
| `rdp_session_recording`   | boolean | Whether or not to enable rdp recording on all servers in this project. Defaults to `False`. |
| `require_preauth_for_creds`   | boolean | (Optional) Whether or not to require preauthorization before a User can retrieve credentials to log in. Defaults to `False`. |
| `shared_admin_user_name`   | string | (Optional) The name for a shared admin user on servers in this project. If `force_shared_ssh_users` is `True`, this must be provided. |
| `shared_standard_user_name`   | string | (Optional) The name for a shared standard user on servers in this project. If `force_shared_ssh_users` is `True`, this must be provided. |
| `ssh_session_recording`   | boolean | Whether or not to enable ssh recording on all servers in this project. Defaults to `False`. |

#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
--data '{
	"create_server_users": true,
	"deleted_at": null,
	"force_shared_ssh_users": false,
	"id": "",
	"name": "the-sound-and-the-fury",
	"next_unix_gid": null,
	"next_unix_uid": 0,
	"require_preauth_for_creds": true,
	"shared_admin_user_name": null,
	"shared_standard_user_name": null,
	"team": "william-faulkner",
	"user_on_demand_period": null
}' \
https://app.scaleft.com/v1/teams/${team_name}/projects
```

##### Response
```json
{
	"create_server_users": true,
	"deleted_at": "0001-01-01T00:00:00Z",
	"force_shared_ssh_users": false,
	"id": "1b127da1-bde2-4b37-993f-499cf4e2aa58",
	"name": "the-sound-and-the-fury",
	"next_unix_gid": 63001,
	"next_unix_uid": 60001,
	"require_preauth_for_creds": true,
	"shared_admin_user_name": null,
	"shared_standard_user_name": null,
	"team": "william-faulkner",
	"user_on_demand_period": null
}
```
### Fetch a Project

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `create_server_users`   | boolean | (Optional) Whether or not to create Server Users for Users in this Project. Defaults to `False`. If left false, the User is responsible for ensuring that Users matching the Server User names in ASA exist on the server. |
| `force_shared_ssh_users`   | boolean | (Optional) If true, new Server users will not be created for each User in the Project. Instead they will share a single standard user and a single admin user. Defaults to `False`. |
| `forward_traffic`   | boolean | Whether or not to require all traffic in project to be forwarded through selected Gateways. Defaults to `False`. |
| `name`   | string | The name of the Project. |
| `rdp_session_recording`   | boolean | Whether or not to enable rdp recording on all servers in this project. Defaults to `False`. |
| `require_preauth_for_creds`   | boolean | (Optional) Whether or not to require preauthorization before a User can retrieve credentials to log in. Defaults to `False`. |
| `shared_admin_user_name`   | string | (Optional) The name for a shared admin user on servers in this project. If `force_shared_ssh_users` is `True`, this must be provided. |
| `shared_standard_user_name`   | string | (Optional) The name for a shared standard user on servers in this project. If `force_shared_ssh_users` is `True`, this must be provided. |
| `ssh_session_recording`   | boolean | Whether or not to enable ssh recording on all servers in this project. Defaults to `False`. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \

https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}
```

##### Response
```json
HTTP 204 No Content
```
### Delete a Project

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name. |
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

https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}
```

##### Response
```json
HTTP 204 No Content
```
### Update a Project

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `create_server_users`   | boolean | (Optional) Whether or not to create Server Users for Users in this Project. Defaults to `False`. If left false, the User is responsible for ensuring that Users matching the Server User names in ASA exist on the server. |
| `forward_traffic`   | boolean | Whether or not to require all traffic in project to be forwarded through selected Gateways. Defaults to `False`. |
| `rdp_session_recording`   | boolean | Whether or not to enable rdp recording on all servers in this project. Defaults to `False`. |
| `require_preauth_for_creds`   | boolean | (Optional) Whether or not to require preauthorization before a User can retrieve credentials to log in. Defaults to `False`. |
| `ssh_session_recording`   | boolean | Whether or not to enable ssh recording on all servers in this project. Defaults to `False`. |

#### Response body
This endpoint returns a `204 No Content` response on a successful call.


#### Usage example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
--data '{
	"create_server_users": true,
	"next_unix_gid": 63011,
	"next_unix_uid": 60011,
	"require_preauth_for_creds": false,
	"user_on_demand_period": null
}' \
https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}
```

##### Response
```json
HTTP 204 No Content
```
### List Client Configuration Options for a Project

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/client_config_options" />
Use Client Configuration Options to automatically pass settings to any Client logging into a server in this Project.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `config_key`   | string | The Client Configuration Option to change. |
| `config_value`   | object | The value to be applied to Clients' configurations. |
| `id`   | string | The UUID of the Client Configuration Option. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \

https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/client_config_options
```

##### Response
```json
{
	"list": [
		{
			"config_key": "ssh.insecure_forward_agent",
			"config_value": "host",
			"id": "48b2a6c8-572d-438e-904c-6175c17c9c56"
		},
		{
			"config_key": "ssh.port_forward_method",
			"config_value": "netcat",
			"id": "893ed228-87b2-4afa-a4fb-9d701ab50926"
		}
	]
}
```
### Add Client Configuration Options for a Project

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/client_config_options" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `config_key`   | string | The Client Configuration Option to change. |
| `config_value`   | object | The value to be applied to Clients' configurations. |
| `id`   | string | The UUID of the Client Configuration Option. |

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `config_key`   | string | The Client Configuration Option to change. |
| `config_value`   | object | The value to be applied to Clients' configurations. |
| `id`   | string | The UUID of the Client Configuration Option. |

#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
--data '{
	"config_key": "ssh.insecure_forward_agent",
	"config_value": "host",
	"id": ""
}' \
https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/client_config_options
```

##### Response
```json
{
	"config_key": "ssh.insecure_forward_agent",
	"config_value": "host",
	"id": "48b2a6c8-572d-438e-904c-6175c17c9c56"
}
```
### Remove a Client Configuration Option from a Project

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/client_config_options/${client_config_options_id}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `client_config_options_id`   | string | The UUID of the Client Config Options. |
| `project_name`   | string | The Project name. |
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

https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/client_config_options/${client_config_options_id}
```

##### Response
```json
HTTP 204 No Content
```
### List Cloud Accounts in a Project

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/cloud_accounts" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `account_id`   | string | The provider-specific account ID. |
| `description`   | string | (optional) Human readable description of the account. |
| `id`   | string | UUID of the Cloud Account. |
| `provider`   | string | A provider. For now, only accepts `aws` or `gce`, case sensitive. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \

https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/cloud_accounts
```

##### Response
```json
{
	"list": [
		{
			"account_id": "123456789012",
			"description": "Dev AWS account",
			"id": "ba811e06-e1ad-438f-8296-32f2faf2509f",
			"provider": "aws"
		},
		{
			"account_id": "630225935076",
			"description": "Dev GCE account",
			"id": "752486bc-045a-4215-bd3a-7e9777f71c5e",
			"provider": "gce"
		}
	]
}
```
### Add a Cloud Account to a Project

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/cloud_accounts" />
Adding a Cloud Account to a Project allows servers created in that account to register with Okta Advanced Server Access without using a Server Enrollment Token. This is only possible on cloud providers that expose cryptographically signed instance metadata so is currently restricted to AWS and GCE.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `account_id`   | string | The provider-specific account ID. |
| `description`   | string | (optional) Human readable description of the account. |
| `id`   | string | UUID of the Cloud Account. |
| `provider`   | string | A provider. For now, only accepts `aws` or `gce`, case sensitive. |

#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \

https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/cloud_accounts
```

##### Response
```json
{
	"account_id": "123456789012",
	"description": "Dev AWS account",
	"id": "ba811e06-e1ad-438f-8296-32f2faf2509f",
	"provider": "aws"
}
```
### Remove a Cloud Account from a Project

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/cloud_accounts/${cloud_account_id}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `cloud_account_id`   | string | The UUID of the Cloud Account. |
| `project_name`   | string | The Project name. |
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

https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/cloud_accounts/${cloud_account_id}
```

##### Response
```json
HTTP 204 No Content
```
### List all the Groups in a Project

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/groups" />
Returns all the Groups in a Project.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `create_server_group`   | boolean | True if the Group is being created on the Project servers. |
| `deleted_at`   | string | Time of removal from the Project. Null if not removed. |
| `group_id`   | string | The UUID that corresponds to the Group. |
| `name`   | string | The name of the Group. |
| `server_access`   | boolean | True if the Group has access to the Project servers. |
| `server_admin`   | boolean | True if the Group has admin on the Project servers. |
| `server_group_name`   | string | If create_server_group is true, the name of the Group on the server. |
| `unix_gid`   | integer | If create_server_group is true, the GID of the Group created. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \

https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/groups
```

##### Response
```json
{
	"list": [
		{
			"create_server_group": true,
			"deleted_at": null,
			"group": "compsons",
			"group_id": "86f20e75-594e-4c37-8dd7-8d9cb383a5ee",
			"name": "compsons",
			"profile_attributes": {
				"unix_gid": 63000,
				"unix_group_name": "sft_compsons",
				"windows_group_name": "sft_compsons"
			},
			"removed_at": null,
			"server_access": false,
			"server_admin": true,
			"server_group_name": null,
			"unix_gid": null
		}
	]
}
```
### Add a Group to a Project

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/groups" />
Adds a pre-existing Group to the Project, enabling server access, with either user or admin permissions and the option to sync the Group to the servers in the Project.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `create_server_group`   | boolean | True if the Group is being created on the Project servers. |
| `deleted_at`   | string | Time of removal from the Project. Null if not removed. |
| `group_id`   | string | The UUID that corresponds to the Group. |
| `name`   | string | The name of the Group. |
| `server_access`   | boolean | True if the Group has access to the Project servers. |
| `server_admin`   | boolean | True if the Group has admin on the Project servers. |
| `server_group_name`   | string | If create_server_group is true, the name of the Group on the server. |
| `unix_gid`   | integer | If create_server_group is true, the GID of the Group created. |

#### Response body
This endpoint returns a `204 No Content` response on a successful call.


#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
--data '{
	"create_server_group": true,
	"deleted_at": null,
	"group": "compsons",
	"group_id": "",
	"name": "compsons",
	"removed_at": null,
	"server_access": true,
	"server_admin": false,
	"server_group_name": null,
	"unix_gid": null
}' \
https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/groups
```

##### Response
```json
HTTP 204 No Content
```
### Retrieve Group details for a single Project

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/groups/${group_name}" />
Returns details for a Group on a Project. Use `group_id` to access group-related details.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string | The ASA Group name. |
| `project_name`   | string | The Project name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `create_server_group`   | boolean | True if the Group is being created on the Project servers. |
| `deleted_at`   | string | Time of removal from the project. Null if not removed. |
| `group_id`   | string | The UUID that corresponds to the Group. |
| `name`   | string | The name of the Group. |
| `profile_attributes`   | string | If create_server_group is true, the Attributes that will be synced to the server. |
| `server_access`   | boolean | True if the Group has access to the Project servers. |
| `server_admin`   | boolean | True if the Group has admin on the Project servers. |
| `server_group_name`   | string | If create_server_group is true, the name of the Group on the server. |
| `unix_gid`   | integer | If create_server_group is true, the GID of the Group created. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \

https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/groups/${group_name}
```

##### Response
```json
{
	"create_server_group": true,
	"deleted_at": null,
	"group": "compsons",
	"group_id": "86f20e75-594e-4c37-8dd7-8d9cb383a5ee",
	"name": "compsons",
	"profile_attributes": {
		"unix_gid": 63000,
		"unix_group_name": "sft_compsons",
		"windows_group_name": "sft_compsons"
	},
	"removed_at": null,
	"server_access": false,
	"server_admin": true,
	"server_group_name": null,
	"unix_gid": null
}
```
### Remove a Group from a Project

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/groups/${group_name}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string | The ASA Group name. |
| `project_name`   | string | The Project name. |
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

https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/groups/${group_name}
```

##### Response
```json
HTTP 204 No Content
```
### Change the Project properties of a Group

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/groups/${group_name}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string | The ASA Group name. |
| `project_name`   | string | The Project name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `create_server_group`   | boolean | True if the Group is being created on the Project servers. |
| `deleted_at`   | string | Time of removal from the Project. Null if not removed. |
| `group_id`   | string | The UUID that corresponds to the Group. |
| `name`   | string | The name of the Group. |
| `server_access`   | boolean | True if the Group has access to the Project servers. |
| `server_admin`   | boolean | True if the Group has admin on the Project servers. |
| `server_group_name`   | string | If create_server_group is true, the name of the Group on the server. |
| `unix_gid`   | integer | If create_server_group is true, the GID of the Group created. |

#### Response body
This endpoint returns a `204 No Content` response on a successful call.


#### Usage example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
--data '{
	"create_server_group": true,
	"deleted_at": null,
	"group": "compsons",
	"group_id": "",
	"name": "compsons",
	"removed_at": null,
	"server_access": false,
	"server_admin": true,
	"server_group_name": null,
	"unix_gid": null
}' \
https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/groups/${group_name}
```

##### Response
```json
HTTP 204 No Content
```
### Fetch a Preauthorization

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/preauthorizations" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `disabled`   | boolean | `true` if the Preauthorization is disabled. |
| `expires_at`   | string | The Preauthorization will cease to work after the `expires_at` date. |
| `id`   | string | The UUID of the Preauthorization. |
| `projects`   | array | The Projects that the Preauthorization is valid for. |
| `servers`   | array | The Servers that the Preauthorization is valid for. |
| `user_name`   | string | The username that the Preauthorization is for. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \

https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/preauthorizations
```

##### Response
```json
HTTP 204 No Content
```
### Create a Preauthorization

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/preauthorizations" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `disabled`   | boolean | `true` if the Preauthorization is disabled. |
| `expires_at`   | string | The Preauthorization will cease to work after the `expires_at` date. |
| `id`   | string | The UUID of the Preauthorization. |
| `projects`   | array | The Projects that the Preauthorization is valid for. |
| `servers`   | array | The Servers that the Preauthorization is valid for. |
| `user_name`   | string | The username that the Preauthorization is for. |

#### Response body
This endpoint returns a `204 No Content` response on a successful call.


#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \

https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/preauthorizations
```

##### Response
```json
HTTP 204 No Content
```
### Lists the Preauthorizations for a Project

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/preauthorizations/${authorization_id}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `authorization_id`   | string | The UUID of the Authorization. |
| `project_name`   | string | The Project name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `count`   |  integer | (Optional) The number of objects per page. |
| `descending`   |  boolean | (Optional) The object order. |
| `include_expired`   |  boolean | (Optional)  |
| `offset`   |  string | (Optional) The page offset. |
| `prev`   |  boolean | (Optional) The direction of paging. |
| `project`   |  string | (Optional)  |


#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `add_env`   | array | A list of env vars to include when running these commands (see https://www.sudo.ws/man/1.8.13/sudoers.man.html#Command_environment for more info). |
| `description`   | string | A description of the Entitlement. |
| `name`   | string | A name for the Entitlement. |
| `opt_no_exec`   | boolean | Whether to allow commands to execute child processes. |
| `opt_no_passwd`   | boolean | Whether or not to require a password when sudo is run (should generally not be used, as ASA accounts do not require a password). |
| `opt_run_as`   | string | A non-root User to run commands as. |
| `opt_set_env`   | boolean | Whether to allow overriding environment variables to commands. |
| `structured_commands`   | array | A list of commands to allow. |
| `sub_env`   | array | A list of env vars to ignore when running these commands (see https://www.sudo.ws/man/1.8.13/sudoers.man.html#Command_environment for more info) |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \

https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/preauthorizations/${authorization_id}
```

##### Response
```json
HTTP 204 No Content
```
### Update a Preauthorization

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/preauthorizations/${authorization_id}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `authorization_id`   | string | The UUID of the Authorization. |
| `project_name`   | string | The Project name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `disabled`   | boolean | `true` if the Preauthorization is disabled. |
| `expires_at`   | string | The Preauthorization will cease to work after the `expires_at` date. |
| `id`   | string | The UUID of the Preauthorization. |
| `projects`   | array | The Projects that the Preauthorization is valid for. |
| `servers`   | array | The Servers that the Preauthorization is valid for. |
| `user_name`   | string | The username that the Preauthorization is for. |

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `disabled`   | boolean | `true` if the Preauthorization is disabled. |
| `expires_at`   | string | The Preauthorization will cease to work after the `expires_at` date. |
| `id`   | string | The UUID of the Preauthorization. |
| `projects`   | array | The Projects that the Preauthorization is valid for. |
| `servers`   | array | The Servers that the Preauthorization is valid for. |
| `user_name`   | string | The username that the Preauthorization is for. |

#### Usage example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \

https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/preauthorizations/${authorization_id}
```

##### Response
```json
HTTP 204 No Content
```
### List Server Enrollment Tokens within a Project

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_enrollment_tokens" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `created_by_user`   | string | The User that created the Server Enrollment Token. |
| `description`   | string | A description of why this Server Enrollment Token was created. |
| `id`   | string | The UUID that corresponds to the Server Enrollment Token. |
| `issued_at`   | string | Time of creation. |
| `token`   | object | A token used to enroll a server. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \

https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_enrollment_tokens
```

##### Response
```json
HTTP 204 No Content
```
### Create a Server Enrollment Token for a Project

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_enrollment_tokens" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `created_by_user`   | string | The User that created the Server Enrollment Token. |
| `description`   | string | A description of why this Server Enrollment Token was created. |
| `id`   | string | The UUID that corresponds to the Server Enrollment Token. |
| `issued_at`   | string | Time of creation. |
| `token`   | object | A token used to enroll a server. |

#### Response body
This endpoint returns an object with the following fields and a `201` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `created_by_user`   | string | The User that created the Server Enrollment Token. |
| `description`   | string | A description of why this Server Enrollment Token was created. |
| `id`   | string | The UUID that corresponds to the Server Enrollment Token. |
| `issued_at`   | string | Time of creation. |
| `token`   | object | A token used to enroll a server. |

#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \

https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_enrollment_tokens
```

##### Response
```json
HTTP 204 No Content
```
### Fetch a Server Enrollment Token from a Project

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_enrollment_tokens/${server_enrollment_token_id}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name. |
| `server_enrollment_token_id`   | string | The UUID of the Server Enrollment Token. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `created_by_user`   | string | The User that created the Server Enrollment Token. |
| `description`   | string | A description of why this Server Enrollment Token was created. |
| `id`   | string | The UUID that corresponds to the Server Enrollment Token. |
| `issued_at`   | string | Time of creation. |
| `token`   | object | A token used to enroll a server. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \

https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_enrollment_tokens/${server_enrollment_token_id}
```

##### Response
```json
HTTP 204 No Content
```
### Delete a Server Enrollment Token from a Project

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_enrollment_tokens/${server_enrollment_token_id}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name. |
| `server_enrollment_token_id`   | string | The UUID of the Server Enrollment Token. |
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

https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_enrollment_tokens/${server_enrollment_token_id}
```

##### Response
```json
HTTP 204 No Content
```
### List Server Users in a Project

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_users" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `admin`   | boolean | True if Server User has sudo. |
| `id`   | string | UUID of Server User API object. |
| `server_user_name`   | string | The username that will be realized on Unix servers. |
| `status`   | string | Status of the User. |
| `type`   | string | Whether this is a Service or Human User. |
| `unix_gid`   | integer | Unix GID of the Server User. |
| `unix_uid`   | integer | Unix UID of the Server User. |
| `user_name`   | string | The username. |
| `windows_server_user_name`   | string | The username that will be realized on Windows servers. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \

https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_users
```

##### Response
```json
{
	"list": [
		{
			"admin": true,
			"id": "7e7f15c9-81cc-4d2a-ba78-66796b9e1f28",
			"server_user_name": "benjy",
			"status": "ACTIVE",
			"type": "human",
			"unix_gid": 63001,
			"unix_uid": 60001,
			"user_name": "benjycompson",
			"windows_server_user_name": "benjy"
		},
		{
			"admin": false,
			"id": "b88cf6b7-696b-48e9-9f09-65fb7990edfb",
			"server_user_name": "quentin",
			"status": "DELETED",
			"type": "human",
			"unix_gid": 63002,
			"unix_uid": 60002,
			"user_name": "quentincompson",
			"windows_server_user_name": "quentin"
		}
	]
}
```
### List Servers in a Project

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/servers" />
The Servers enrolled in this Project

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `alt_names`   | array | Any alternative hostnames of the Server. |
| `bastion`   | string | Specifies the bastion-host Clients will automatically use when connecting to this host. |
| `canonical_name`   | string | Specifies the name Clients should use/see when connecting to this host. Overrides the name found with hostname. |
| `cloud_provider`   | string | The cloud provider of the Server, if one exists. |
| `deleted_at`   | string | The time the Server was deleted from the Project. |
| `hostname`   | string | The hostname of the Server. |
| `id`   | string | The UUID corresponding to the Server. |
| `instance_details`   | object | Information the cloud provider provides of the Server, if one exists. |
| `last_seen`   | string | The last time the Server made a request to the ASA platform. |
| `managed`   | boolean | True if the Server is managed by SFTD. Unmanaged Servers are used in configurations where users may have a bastion, for example, that they don't want/can't connect to through SFTD. With an Unmanaged Server record to represent this box, ASA will know it exists and to use it as a bastion hop. |
| `os`   | string | The particular OS of the Server. |
| `os_type`   | string | Can either be Linux or Windows. |
| `project_name`   | string | The Project that the Server belongs to. |
| `registered_at`   | string | The time the Server was registered to the Project. |
| `services`   | array | Can either be ssh or rdp. |
| `sftd_version`   | string | The version of SFTD the Server is running. |
| `ssh_host_keys`   | array | The host keys used to authenticate the Server. |
| `state`   | string | Can be either `ACTIVE` or `INACTIVE`. |
| `team_name`   | string | The name of the Team. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \

https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/servers
```

##### Response
```json
{
	"list": [
		{
			"access_address": null,
			"alt_names": null,
			"bastion": null,
			"broker_host_certs": null,
			"canonical_name": null,
			"cloud_provider": null,
			"deleted_at": "0001-01-01T00:00:00Z",
			"hostname": "harvard",
			"id": "a63dd1a8-00fc-4601-bd03-d04dde9ff0d6",
			"instance_details": null,
			"last_seen": "0001-01-01T00:00:00Z",
			"managed": true,
			"os": "Ubuntu 16.04",
			"os_type": "linux",
			"project_name": "the-sound-and-the-fury",
			"registered_at": "0001-01-01T00:00:00Z",
			"services": [
				"ssh"
			],
			"sftd_version": "1.44.4",
			"ssh_host_keys": null,
			"state": "INACTIVE",
			"team_name": "william-faulkner"
		},
		{
			"access_address": null,
			"alt_names": null,
			"bastion": null,
			"broker_host_certs": null,
			"canonical_name": null,
			"cloud_provider": null,
			"deleted_at": "0001-01-01T00:00:00Z",
			"hostname": "jefferson",
			"id": "09968d33-2484-48f9-89e0-deac28b276ea",
			"instance_details": null,
			"last_seen": "0001-01-01T00:00:00Z",
			"managed": true,
			"os": "Ubuntu 16.04",
			"os_type": "linux",
			"project_name": "the-sound-and-the-fury",
			"registered_at": "0001-01-01T00:00:00Z",
			"services": [
				"ssh"
			],
			"sftd_version": "1.44.4",
			"ssh_host_keys": null,
			"state": "INACTIVE",
			"team_name": "william-faulkner"
		}
	]
}
```
### Add an Unmanaged Server to a Project

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/servers" />
Unmanaged Servers don't use Advanced Server Access for authentication, but still receive Client Configuration Options. Create an Unmanaged Server in order to control the options your team members use to connect to appliances, especially bastions which can't fully utilize Advanced Server Access.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `access_address`   | string | The access address of the Server. |
| `alt_names`   | array | (Optional) Alternative names of the Server. |
| `hostname`   | string | The hostname of the Server. |

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `alt_names`   | array | Any alternative hostnames of the Server. |
| `bastion`   | string | Specifies the bastion-host Clients will automatically use when connecting to this host. |
| `canonical_name`   | string | Specifies the name Clients should use/see when connecting to this host. Overrides the name found with hostname. |
| `cloud_provider`   | string | The cloud provider of the Server, if one exists. |
| `deleted_at`   | string | The time the Server was deleted from the Project. |
| `hostname`   | string | The hostname of the Server. |
| `id`   | string | The UUID corresponding to the Server. |
| `instance_details`   | object | Information the cloud provider provides of the Server, if one exists. |
| `last_seen`   | string | The last time the Server made a request to the ASA platform. |
| `managed`   | boolean | True if the Server is managed by SFTD. Unmanaged Servers are used in configurations where users may have a bastion, for example, that they don't want/can't connect to through SFTD. With an Unmanaged Server record to represent this box, ASA will know it exists and to use it as a bastion hop. |
| `os`   | string | The particular OS of the Server. |
| `os_type`   | string | Can either be Linux or Windows. |
| `project_name`   | string | The Project that the Server belongs to. |
| `registered_at`   | string | The time the Server was registered to the Project. |
| `services`   | array | Can either be ssh or rdp. |
| `sftd_version`   | string | The version of SFTD the Server is running. |
| `ssh_host_keys`   | array | The host keys used to authenticate the Server. |
| `state`   | string | Can be either `ACTIVE` or `INACTIVE`. |
| `team_name`   | string | The name of the Team. |

#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
--data '{
	"access_address": "1.2.3.4",
	"alt_names": [
		"bastion"
	],
	"hostname": "bastion.dev.com"
}' \
https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/servers
```

##### Response
```json
{
	"access_address": null,
	"alt_names": null,
	"bastion": null,
	"broker_host_certs": null,
	"canonical_name": null,
	"cloud_provider": null,
	"deleted_at": "0001-01-01T00:00:00Z",
	"hostname": "bastion.dev.com",
	"id": "2bf66b20-1ef8-411b-a3b0-8d59c21dbe5e",
	"instance_details": null,
	"last_seen": "0001-01-01T00:00:00Z",
	"managed": false,
	"os": "",
	"os_type": null,
	"project_name": "the-sound-and-the-fury",
	"registered_at": "0001-01-01T00:00:00Z",
	"services": [],
	"sftd_version": null,
	"ssh_host_keys": null,
	"state": "ACTIVE",
	"team_name": "william-faulkner"
}
```
### Get a Server object

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/servers/${server_id}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name. |
| `server_id`   | string | The UUID of the Server. |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `alt_names`   | array | Any alternative hostnames of the Server. |
| `bastion`   | string | Specifies the bastion-host Clients will automatically use when connecting to this host. |
| `canonical_name`   | string | Specifies the name Clients should use/see when connecting to this host. Overrides the name found with hostname. |
| `cloud_provider`   | string | The cloud provider of the Server, if one exists. |
| `deleted_at`   | string | The time the Server was deleted from the Project. |
| `hostname`   | string | The hostname of the Server. |
| `id`   | string | The UUID corresponding to the Server. |
| `instance_details`   | object | Information the cloud provider provides of the Server, if one exists. |
| `last_seen`   | string | The last time the Server made a request to the ASA platform. |
| `managed`   | boolean | True if the Server is managed by SFTD. Unmanaged Servers are used in configurations where users may have a bastion, for example, that they don't want/can't connect to through SFTD. With an Unmanaged Server record to represent this box, ASA will know it exists and to use it as a bastion hop. |
| `os`   | string | The particular OS of the Server. |
| `os_type`   | string | Can either be Linux or Windows. |
| `project_name`   | string | The Project that the Server belongs to. |
| `registered_at`   | string | The time the Server was registered to the Project. |
| `services`   | array | Can either be ssh or rdp. |
| `sftd_version`   | string | The version of SFTD the Server is running. |
| `ssh_host_keys`   | array | The host keys used to authenticate the Server. |
| `state`   | string | Can be either `ACTIVE` or `INACTIVE`. |
| `team_name`   | string | The name of the Team. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \

https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/servers/${server_id}
```

##### Response
```json
{
	"access_address": null,
	"alt_names": null,
	"bastion": null,
	"broker_host_certs": null,
	"canonical_name": null,
	"cloud_provider": null,
	"deleted_at": "0001-01-01T00:00:00Z",
	"hostname": "harvard",
	"id": "a63dd1a8-00fc-4601-bd03-d04dde9ff0d6",
	"instance_details": null,
	"last_seen": "0001-01-01T00:00:00Z",
	"managed": true,
	"os": "Ubuntu 16.04",
	"os_type": "linux",
	"project_name": "the-sound-and-the-fury",
	"registered_at": "0001-01-01T00:00:00Z",
	"services": [
		"ssh"
	],
	"sftd_version": "1.44.4",
	"ssh_host_keys": null,
	"state": "INACTIVE",
	"team_name": "william-faulkner"
}
```
### Remove a Server from a Project

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/servers/${server_id}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name. |
| `server_id`   | string | The UUID of the Server. |
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

https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/servers/${server_id}
```

##### Response
```json
HTTP 204 No Content
```


