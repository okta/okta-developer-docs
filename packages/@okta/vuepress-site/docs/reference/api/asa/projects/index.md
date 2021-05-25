---
title: ASA Projects
category: asa
---

# ASA Projects API

## Get started

The [Advanced Server Access (ASA) API](/docs/reference/api/asa/introduction/) is logically separate from the rest of the Okta APIs and uses a different API namespace:

`https://app.scaleft.com/v1/`

An Advanced Server Access (ASA) Project is a collection of ASA Servers and ASA Users that have access to those Servers through ASA Groups.

Explore the Projects API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/acb5d434083d512bdbb3).


## Projects API operations


The Projects API has the following operations:
* [List Projects for a Team](#list-projects-for-a-team)
* [Create a Project](#create-a-project)
* [Fetch a Project](#fetch-a-project)
* [Delete a Project](#delete-a-project)
* [Updates details of a specific Project](#updates-details-of-a-specific-project)
* [List Client Configuration Options for a Project](#list-client-configuration-options-for-a-project)
* [Add Client Configuration Options to a Project](#add-client-configuration-options-to-a-project)
* [Delete a Client Configuration Option from a Project](#delete-a-client-configuration-option-from-a-project)
* [List Cloud Accounts in a Project](#list-cloud-accounts-in-a-project)
* [Add a Cloud Account to a Project](#add-a-cloud-account-to-a-project)
* [Remove a Cloud Account from a Project](#remove-a-cloud-account-from-a-project)
* [List all the ASA Groups in a Project](#list-all-the-asa-groups-in-a-project)
* [Add an ASA Group to a Project](#add-an-asa-group-to-a-project)
* [Retrieve ASA Group details for a single Project](#retrieve-asa-group-details-for-a-single-project)
* [Remove an ASA Group from a Project](#remove-an-asa-group-from-a-project)
* [Change the Project properties of an ASA Project Group](#change-the-project-properties-of-an-asa-project-group)
* [Fetch a Preauthorization](#fetch-a-preauthorization)
* [Create a Preauthorization](#create-a-preauthorization)
* [List the Preauthorizations for a Project](#list-the-preauthorizations-for-a-project)
* [Update a Preauthorization](#update-a-preauthorization)
* [List Server Enrollment Tokens within a Project](#list-server-enrollment-tokens-within-a-project)
* [Create a Server Enrollment Token for a Project](#create-a-server-enrollment-token-for-a-project)
* [Fetch a Server Enrollment Token from a Project](#fetch-a-server-enrollment-token-from-a-project)
* [Delete a Server Enrollment Token from a Project](#delete-a-server-enrollment-token-from-a-project)
* [List Server Users in a Project](#list-server-users-in-a-project)
* [Fetch Server User for a Project](#fetch-server-user-for-a-project)
* [List Servers in a Project](#list-servers-in-a-project)
* [Add an Unmanaged Server to a Project](#add-an-unmanaged-server-to-a-project)
* [Fetch the details of a Server in a Project](#fetch-the-details-of-a-server-in-a-project)
* [Remove a Server from a Project](#remove-a-server-from-a-project)
* [Update a Server on a Project](#update-a-server-on-a-project)


### List Projects for a Team

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects" />
Lists Projects for a Team

This endpoint requires one of the following roles: `access_user`, `access_admin`, `authenticated_client`, `client`, or `reporting_user`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team |


#### Request query parameters

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `count`   |  number | (Optional) The number of objects per page |
| `descending`   |  boolean | (Optional) The object order |
| `offset`   |  string | (Optional) The UUID of the object used as an offset for pagination |
| `prev`   |  boolean | (Optional) The direction of paging |
| `self`   |  boolean | (Optional) If `true`, only lists the Projects that the ASA User making this request has been assigned. |


#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `create_server_users`   | boolean | (Optional) Whether to create Server Users for ASA Users in this Project. Defaults to `false`. If left `false`, the ASA User is responsible for ensuring that users that match the names of the Server Users in ASA exist on the server. |
| `deleted_at`   | string | Time of deletion. `null` if not deleted. |
| `force_shared_ssh_users`   | boolean | (Optional) If `true`, new Server Users will not be created for each ASA User in the Project. Instead they share a single standard user and a single admin user. Default is `false`. |
| `forward_traffic`   | boolean | Whether to require that all traffic in the Project be forwarded through selected Gateways. Default is `false`. **Warning:** Requires a feature flag to be enabled. |
| `id`   | string | The UUID of the Project |
| `name`   | string | The name of the Project |
| `next_unix_gid`   | number | (Optional) The GID to use when creating a new server user. |
| `next_unix_uid`   | number | (Optional) The UID to use when creating a new server user. |
| `rdp_session_recording`   | boolean | (Optional) Whether to enable remote desktop protocol (rdp) recording on all Servers in this Project. Default is `false`. **Warning:** Requires a feature flag to be enabled. |
| `require_preauth_for_creds`   | boolean | (Optional) Whether to require preauthorization before an ASA User can retrieve credentials to sign in. Default is `false`. |
| `shared_admin_user_name`   | string | (Optional) The name for a shared admin user on Servers in this Project. If `force_shared_ssh_users` is `true`, this must be provided. |
| `shared_standard_user_name`   | string | (Optional) The name for a shared standard user on Servers in this Project. If `force_shared_ssh_users` is `true`, this must be provided. |
| `ssh_session_recording`   | boolean | (Optional) Whether to enable ssh recording on all Servers in this Project. Default is `false`. **Warning:** Requires a feature flag to be enabled. |
| `team`   | string | The ASA Team of the Project |

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
			"id": "47534a0d-ba28-4a8b-b427-3a9fb276c033",
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
			"id": "47534a0d-ba28-4a8b-b427-3a9fb276c033",
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
Creates a Project

This endpoint requires the `access_admin` role.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `create_server_users`   | boolean | (Optional) Whether to create Server Users for ASA Users in this Project. Defaults to `false`. If left `false`, the ASA User is responsible for ensuring that users that match the names of the Server Users in ASA exist on the server. |
| `deleted_at`   | string | Time of deletion. `null` if not deleted. |
| `force_shared_ssh_users`   | boolean | (Optional) If `true`, new Server Users will not be created for each ASA User in the Project. Instead they share a single standard user and a single admin user. Default is `false`. |
| `forward_traffic`   | boolean | Whether to require that all traffic in the Project be forwarded through selected Gateways. Default is `false`. **Warning:** Requires a feature flag to be enabled. |
| `id`   | string | The UUID of the Project |
| `name`   | string | The name of the Project |
| `next_unix_gid`   | number | (Optional) The GID to use when creating a new server user. |
| `next_unix_uid`   | number | (Optional) The UID to use when creating a new server user. |
| `rdp_session_recording`   | boolean | (Optional) Whether to enable remote desktop protocol (rdp) recording on all Servers in this Project. Default is `false`. **Warning:** Requires a feature flag to be enabled. |
| `require_preauth_for_creds`   | boolean | (Optional) Whether to require preauthorization before an ASA User can retrieve credentials to sign in. Default is `false`. |
| `shared_admin_user_name`   | string | (Optional) The name for a shared admin user on Servers in this Project. If `force_shared_ssh_users` is `true`, this must be provided. |
| `shared_standard_user_name`   | string | (Optional) The name for a shared standard user on Servers in this Project. If `force_shared_ssh_users` is `true`, this must be provided. |
| `ssh_session_recording`   | boolean | (Optional) Whether to enable ssh recording on all Servers in this Project. Default is `false`. **Warning:** Requires a feature flag to be enabled. |
| `team`   | string | The ASA Team of the Project |

#### Response body
This endpoint returns an object with the following fields and a `201` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `create_server_users`   | boolean | (Optional) Whether to create Server Users for ASA Users in this Project. Defaults to `false`. If left `false`, the ASA User is responsible for ensuring that users that match the names of the Server Users in ASA exist on the server. |
| `deleted_at`   | string | Time of deletion. `null` if not deleted. |
| `force_shared_ssh_users`   | boolean | (Optional) If `true`, new Server Users will not be created for each ASA User in the Project. Instead they share a single standard user and a single admin user. Default is `false`. |
| `forward_traffic`   | boolean | Whether to require that all traffic in the Project be forwarded through selected Gateways. Default is `false`. **Warning:** Requires a feature flag to be enabled. |
| `id`   | string | The UUID of the Project |
| `name`   | string | The name of the Project |
| `next_unix_gid`   | number | (Optional) The GID to use when creating a new server user. |
| `next_unix_uid`   | number | (Optional) The UID to use when creating a new server user. |
| `rdp_session_recording`   | boolean | (Optional) Whether to enable remote desktop protocol (rdp) recording on all Servers in this Project. Default is `false`. **Warning:** Requires a feature flag to be enabled. |
| `require_preauth_for_creds`   | boolean | (Optional) Whether to require preauthorization before an ASA User can retrieve credentials to sign in. Default is `false`. |
| `shared_admin_user_name`   | string | (Optional) The name for a shared admin user on Servers in this Project. If `force_shared_ssh_users` is `true`, this must be provided. |
| `shared_standard_user_name`   | string | (Optional) The name for a shared standard user on Servers in this Project. If `force_shared_ssh_users` is `true`, this must be provided. |
| `ssh_session_recording`   | boolean | (Optional) Whether to enable ssh recording on all Servers in this Project. Default is `false`. **Warning:** Requires a feature flag to be enabled. |
| `team`   | string | The ASA Team of the Project |

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
	"id": "47534a0d-ba28-4a8b-b427-3a9fb276c033",
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
Fetches details regarding a specific Project

This endpoint requires one of the following roles: `access_user`, `access_admin`, `authenticated_client`, `client`, or `reporting_user`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `create_server_users`   | boolean | (Optional) Whether to create Server Users for ASA Users in this Project. Defaults to `false`. If left `false`, the ASA User is responsible for ensuring that users that match the names of the Server Users in ASA exist on the server. |
| `force_shared_ssh_users`   | boolean | (Optional) If `true`, new Server Users will not be created for each ASA User in the Project. Instead they share a single standard user and a single admin user. Default is `false`. |
| `forward_traffic`   | boolean | Whether to require that all traffic in the Project be forwarded through selected Gateways. Default is `false`. **Warning:** Requires a feature flag to be enabled. |
| `id`   | string | The UUID of the Project |
| `name`   | string | The name of the Project |
| `next_unix_gid`   | number | (Optional) The GID to use when creating a new server user. |
| `next_unix_uid`   | number | (Optional) The UID to use when creating a new server user. |
| `rdp_session_recording`   | boolean | (Optional) Whether to enable remote desktop protocol (rdp) recording on all Servers in this Project. Default is `false`. **Warning:** Requires a feature flag to be enabled. |
| `require_preauth_for_creds`   | boolean | (Optional) Whether to require preauthorization before an ASA User can retrieve credentials to sign in. Default is `false`. |
| `shared_admin_user_name`   | string | (Optional) The name for a shared admin user on Servers in this Project. If `force_shared_ssh_users` is `true`, this must be provided. |
| `shared_standard_user_name`   | string | (Optional) The name for a shared standard user on Servers in this Project. If `force_shared_ssh_users` is `true`, this must be provided. |
| `ssh_session_recording`   | boolean | (Optional) Whether to enable ssh recording on all Servers in this Project. Default is `false`. **Warning:** Requires a feature flag to be enabled. |
| `team`   | string | The ASA Team of the Project |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}
```

##### Response

```json
{
	"create_server_users": true,
	"deleted_at": "0001-01-01T00:00:00Z",
	"force_shared_ssh_users": false,
	"id": "47534a0d-ba28-4a8b-b427-3a9fb276c033",
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
### Delete a Project

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}" />
Deletes a Project

This endpoint requires the `access_admin` role.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name |
| `team_name`   | string | The name of your Team |


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
### Updates details of a specific Project

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}" />
This endpoint requires the `access_admin` role.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `create_server_users`   | boolean | (Optional) Whether to create Server Users for ASA Users in this Project. Defaults to `false`. If left `false`, the ASA User is responsible for ensuring that Users that match the Server User names in ASA exist on the server. |
| `forward_traffic`   | boolean | Whether to require that all traffic in the Project be forwarded through selected Gateways. Default is `false`. **Warning:** Requires a feature flag to be enabled. |
| `next_unix_gid`   | number | (Optional) The GID to use when creating a new server user. |
| `next_unix_uid`   | number | (Optional) The UID to use when creating a new server user. |
| `rdp_session_recording`   | boolean | Whether to enable remote desktop protocol (rdp) recording on all Servers in this Project. Default is `false`. **Warning:** Requires a feature flag to be enabled. |
| `require_preauth_for_creds`   | boolean | (Optional) Whether to require preauthorization before an ASA User can retrieve credentials to sign in. Default is `false`. |
| `ssh_session_recording`   | boolean | Whether to enable ssh recording on all Servers in this Project. Default is `false`. **Warning:** Requires a feature flag to be enabled. |

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
Lists Client Configuration Options for a Project. Use Client Configuration Options to automatically pass settings to any Client sign in to a server in this Project.

This endpoint requires one of the following roles: `access_user`, or `access_admin`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `config_key`   | string | The Client Configuration Option to change |
| `config_value`   | object | The value to be applied to the Client configurations |
| `id`   | string | (Optional) The UUID of the Client Configuration Option |

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
			"id": "cdcc44bf-db85-4964-9517-91cc69e9086a"
		},
		{
			"config_key": "ssh.port_forward_method",
			"config_value": "netcat",
			"id": "9b72bfb7-3191-4098-8c1c-48513399cae9"
		}
	]
}
```
### Add Client Configuration Options to a Project

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/client_config_options" />
Adds Client Configuration Options to a Project

This endpoint requires the `access_admin` role.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `config_key`   | string | The Client Configuration Option to change |
| `config_value`   | object | The value to be applied to the Client configurations |
| `id`   | string | (Optional) The UUID of the Client Configuration Option |

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `config_key`   | string | The Client Configuration Option to change |
| `config_value`   | object | The value to be applied to the Client configurations |
| `id`   | string | (Optional) The UUID of the Client Configuration Option |

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
	"id": "cdcc44bf-db85-4964-9517-91cc69e9086a"
}
```
### Delete a Client Configuration Option from a Project

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/client_config_options/${client_config_options_id}" />
Deletes Client Configuration Option from a Project

This endpoint requires the `access_admin` role.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `client_config_options_id`   | string | The UUID of the Client Config Options |
| `project_name`   | string | The Project name |
| `team_name`   | string | The name of your Team |


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
Lists Cloud Accounts in a Project

This endpoint requires one of the following roles: `access_user`, or `reporting_user`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `account_id`   | string | The provider-specific account ID |
| `description`   | string | (optional) Human-readable description of the Cloud Account |
| `id`   | string | UUID of the Cloud Account |
| `provider`   | string | A Cloud provider: `aws` or `gce` |

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
			"id": "23a38ea4-fc9a-4805-8df7-59e63a7845fb",
			"provider": "aws"
		},
		{
			"account_id": "630225935076",
			"description": "Dev GCE account",
			"id": "1bb650df-6ac7-44aa-87db-c37fce8d5f43",
			"provider": "gce"
		}
	]
}
```
### Add a Cloud Account to a Project

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/cloud_accounts" />
Adds a Cloud Account to a Project, which allows servers created in that account to register with Okta Advanced Server Access without using a Server Enrollment Token. This is only possible on Cloud providers that expose cryptographically signed instance metadata, so currently only Amazon Web Services and Google Compute Engine are supported.

This endpoint requires the `access_admin` role.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `account_id`   | string | The provider-specific account ID |
| `description`   | string | (optional) Human-readable description of the Cloud Account |
| `id`   | string | UUID of the Cloud Account |
| `provider`   | string | A Cloud provider: `aws` or `gce` |

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
	"id": "23a38ea4-fc9a-4805-8df7-59e63a7845fb",
	"provider": "aws"
}
```
### Remove a Cloud Account from a Project

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/cloud_accounts/${cloud_account_id}" />
Removes a Cloud Account from a Project

This endpoint requires the `access_admin` role.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `cloud_account_id`   | string | The UUID of the Cloud Account |
| `project_name`   | string | The Project name |
| `team_name`   | string | The name of your Team |


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
### List all the ASA Groups in a Project

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/groups" />
Lists all the ASA Groups in a Project

This endpoint requires one of the following roles: `access_user`, `access_admin`, or `reporting_user`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `create_server_group`   | boolean | True if you want `sftd` to create a corresponding local (unix or windows) group on the end server. Server Users are still created as long as `create_server_users` is set to `true` for the Project. |
| `deleted_at`   | string | Time of deletion from the Project. `null` if not deleted. |
| `group`   | string | The name of the ASA Group |
| `group_id`   | string | The UUID that corresponds to the ASA Group |
| `id`   | string | The UUID that corresponds to the ASA Project Group |
| `name`   | string | The name of the ASA Group. A non-editable duplicate of `group`. |
| `removed_at`   | string | Time of removal from the Project. `null` if not removed. |
| `server_access`   | boolean | True if members of this ASA Group have access to the Project Servers |
| `server_admin`   | boolean | True if members of this ASA Group have sudo permissions on the Project Servers |
| `server_group_name`   | string | If `create_server_group` is `true`, the name of the server group |
| `servers_selector`   | string | (Optional) Kubernetes-style selector for servers in a Project |
| `unix_gid`   | number | If `create_server_group` is `true`, the GID of the server group created |

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
			"group_id": "3447e842-8755-4cd6-9da1-80fc929b3e04",
			"id": "",
			"name": "compsons",
			"profile_attributes": {
				"unix_gid": 63000,
				"unix_group_name": "sft_compsons",
				"windows_group_name": "sft_compsons"
			},
			"project": "the-sound-and-the-fury",
			"removed_at": null,
			"server_access": false,
			"server_admin": true,
			"server_group_name": null,
			"unix_gid": null
		}
	]
}
```
### Add an ASA Group to a Project

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/groups" />
Adds a pre-existing ASA Group to the Project, which enables server access with either User or admin permissions and the option to sync an ASA Group to the servers in the Project.

This endpoint requires the `access_admin` role.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `create_server_group`   | boolean | True if you want `sftd` to create a corresponding local (unix or windows) group on the end server. Server Users are still created as long as `create_server_users` is set to `true` for the Project. |
| `deleted_at`   | string | Time of deletion from the Project. `null` if not deleted. |
| `group`   | string | The name of the ASA Group |
| `group_id`   | string | The UUID that corresponds to the ASA Group |
| `id`   | string | The UUID that corresponds to the ASA Project Group |
| `name`   | string | The name of the ASA Group. A non-editable duplicate of `group`. |
| `removed_at`   | string | Time of removal from the Project. `null` if not removed. |
| `server_access`   | boolean | True if members of this ASA Group have access to the Project Servers |
| `server_admin`   | boolean | True if members of this ASA Group have sudo permissions on the Project Servers |
| `server_group_name`   | string | If `create_server_group` is `true`, the name of the server group |
| `servers_selector`   | string | (Optional) Kubernetes-style selector for servers in a Project |
| `unix_gid`   | number | If `create_server_group` is `true`, the GID of the server group created |

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
	"id": "",
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
### Retrieve ASA Group details for a single Project

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/groups/${group_name}" />
Returns details for an ASA Group on a Project.

This endpoint requires one of the following roles: `access_user`, `access_admin`, or `reporting_user`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string | The ASA Group name |
| `project_name`   | string | The Project name |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `create_server_group`   | boolean | True if you want `sftd` to create a corresponding local (unix or windows) group on the end server. Server Users are still created as long as `create_server_users` is set to `true` for the Project. |
| `deleted_at`   | string | Time of deletion from the Project. `null` if not deleted. |
| `group`   | string | The name of the ASA Group |
| `group_id`   | string | The UUID that corresponds to the ASA Group |
| `id`   | string | The UUID that corresponds to the ASA Project Group |
| `name`   | string | The name of the ASA Group. A non-editable duplicate of `group`. |
| `profile_attributes`   | string | If `create_server_group` is `true`, the Attributes that will be synced to the server |
| `project`   | string | The Project this Project Group belongs to. |
| `removed_at`   | string | Time of removal from the project. `null` if not removed. |
| `server_access`   | boolean | True if members of this ASA Group have access to the Project Servers |
| `server_admin`   | boolean | True if members of this ASA Group have sudo permissions on the Project Servers |
| `server_group_name`   | string | If `create_server_group` is `true`, the name of the server group |
| `servers_selector`   | string | (Optional) Kubernetes-style selector for servers in a Project |
| `unix_gid`   | number | If `create_server_group` is `true`, the GID of the server group created |

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
	"group_id": "3447e842-8755-4cd6-9da1-80fc929b3e04",
	"id": "",
	"name": "compsons",
	"profile_attributes": {
		"unix_gid": 63000,
		"unix_group_name": "sft_compsons",
		"windows_group_name": "sft_compsons"
	},
	"project": "the-sound-and-the-fury",
	"removed_at": null,
	"server_access": false,
	"server_admin": true,
	"server_group_name": null,
	"unix_gid": null
}
```
### Remove an ASA Group from a Project

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/groups/${group_name}" />
Removes an ASA Group from a Project. This doesn't delete the ASA Group.

This endpoint requires the `access_admin` role.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string | The ASA Group name |
| `project_name`   | string | The Project name |
| `team_name`   | string | The name of your Team |


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
### Change the Project properties of an ASA Project Group

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/groups/${group_name}" />
Updates the Project-level details for an ASA Project Group

This endpoint requires the `access_admin` role.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `group_name`   | string | The ASA Group name |
| `project_name`   | string | The Project name |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `create_server_group`   | boolean | True if you want `sftd` to create a corresponding local (unix or windows) group on the end server. Server Users are still created as long as `create_server_users` is set to `true` for the Project. |
| `deleted_at`   | string | Time of deletion from the Project. `null` if not deleted. |
| `group`   | string | The name of the ASA Group |
| `group_id`   | string | The UUID that corresponds to the ASA Group |
| `id`   | string | The UUID that corresponds to the ASA Project Group |
| `name`   | string | The name of the ASA Group. A non-editable duplicate of `group`. |
| `removed_at`   | string | Time of removal from the Project. `null` if not removed. |
| `server_access`   | boolean | True if members of this ASA Group have access to the Project Servers |
| `server_admin`   | boolean | True if members of this ASA Group have sudo permissions on the Project Servers |
| `server_group_name`   | string | If `create_server_group` is `true`, the name of the server group |
| `servers_selector`   | string | (Optional) Kubernetes-style selector for servers in a Project |
| `unix_gid`   | number | If `create_server_group` is `true`, the GID of the server group created |

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
	"id": "",
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
Fetches a Preauthorization. A Preauthorization is a time-limited grant for an ASA User to access resources in a specific Project.

This endpoint requires one of the following roles: `access_admin`, or `preauthorization`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `disabled`   | boolean | `true` if the Preauthorization is disabled |
| `expires_at`   | string | The Preauthorization ceases to work after the `expires_at` date |
| `id`   | string | The UUID of the Preauthorization |
| `projects`   | array | The Projects that the Preauthorization is valid for |
| `servers`   | array | The Servers that the Preauthorization is valid for |
| `user_name`   | string | The username of the ASA User that the Preauthorization is for |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/preauthorizations
```

##### Response

```json
{
	"disabled": false,
	"expires_at": "2020-07-28T18:30:00Z",
	"id": "566b0fa9-f3ef-4825-a390-16d1766764a0",
	"projects": [
		"the-sound-and-the-fury"
	],
	"servers": null,
	"user_name": "jason.compson"
}
```
### Create a Preauthorization

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/preauthorizations" />
Creates a Preauthorization.

This endpoint requires one of the following roles: `access_admin`, or `preauthorization`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `disabled`   | boolean | `true` if the Preauthorization is disabled |
| `expires_at`   | string | The Preauthorization ceases to work after the `expires_at` date |
| `id`   | string | The UUID of the Preauthorization |
| `projects`   | array | The Projects that the Preauthorization is valid for |
| `servers`   | array | The Servers that the Preauthorization is valid for |
| `user_name`   | string | The username of the ASA User that the Preauthorization is for |

#### Response body
This endpoint returns a `204 No Content` response on a successful call.


#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
--data '{
	"disabled": false,
	"expires_at": "2020-07-28T18:30:00Z",
	"id": "",
	"projects": [
		"the-sound-and-the-fury"
	],
	"servers": null,
	"user_name": "jason.compson"
}' \
https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/preauthorizations
```

##### Response

```json
HTTP 204 No Content
```
### List the Preauthorizations for a Project

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/preauthorizations/${authorization_id}" />
Lists the Preauthorizations for a Project

This endpoint requires one of the following roles: `access_admin`, or `preauthorization`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `authorization_id`   | string | The UUID of the Authorization |
| `project_name`   | string | The Project name |
| `team_name`   | string | The name of your Team |


#### Request query parameters

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `count`   |  number | (Optional) The number of objects per page |
| `descending`   |  boolean | (Optional) The object order |
| `include_expired`   |  boolean | (Optional) If `true`, includes expired preauthorizations |
| `offset`   |  string | (Optional) The UUID of the object used as an offset for pagination |
| `prev`   |  boolean | (Optional) The direction of paging |
| `project`   |  string | (Optional) If a value is provided, filters for the specified Project. This doesn`t apply if used against a Project-specific endpoint. |


#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `disabled`   | boolean | `true` if the Preauthorization is disabled |
| `expires_at`   | string | The Preauthorization ceases to work after the `expires_at` date |
| `id`   | string | The UUID of the Preauthorization |
| `projects`   | array | The Projects that the Preauthorization is valid for |
| `servers`   | array | The Servers that the Preauthorization is valid for |
| `user_name`   | string | The username of the ASA User that the Preauthorization is for |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/preauthorizations/${authorization_id}
```

##### Response

```json
{
	"list": [
		{
			"disabled": false,
			"expires_at": "2020-07-28T18:30:00Z",
			"id": "566b0fa9-f3ef-4825-a390-16d1766764a0",
			"projects": [
				"the-sound-and-the-fury"
			],
			"servers": null,
			"user_name": "jason.compson"
		}
	]
}
```
### Update a Preauthorization

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/preauthorizations/${authorization_id}" />
This endpoint requires one of the following roles: `access_admin`, or `preauthorization`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `authorization_id`   | string | The UUID of the Authorization |
| `project_name`   | string | The Project name |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `disabled`   | boolean | `true` if the Preauthorization is disabled |
| `expires_at`   | string | The Preauthorization ceases to work after the `expires_at` date |
| `id`   | string | The UUID of the Preauthorization |
| `projects`   | array | The Projects that the Preauthorization is valid for |
| `servers`   | array | The Servers that the Preauthorization is valid for |
| `user_name`   | string | The username of the ASA User that the Preauthorization is for |

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `disabled`   | boolean | `true` if the Preauthorization is disabled |
| `expires_at`   | string | The Preauthorization ceases to work after the `expires_at` date |
| `id`   | string | The UUID of the Preauthorization |
| `projects`   | array | The Projects that the Preauthorization is valid for |
| `servers`   | array | The Servers that the Preauthorization is valid for |
| `user_name`   | string | The username of the ASA User that the Preauthorization is for |

#### Usage example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
--data '{
	"disabled": true,
	"expires_at": "2020-07-28T18:30:00Z",
	"id": "",
	"projects": [
		"the-sound-and-the-fury"
	],
	"servers": null,
	"user_name": "jason.compson"
}' \
https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/preauthorizations/${authorization_id}
```

##### Response

```json
{
	"disabled": true,
	"expires_at": "2020-07-28T18:30:00Z",
	"id": "566b0fa9-f3ef-4825-a390-16d1766764a0",
	"projects": [
		"the-sound-and-the-fury"
	],
	"servers": null,
	"user_name": "jason.compson"
}
```
### List Server Enrollment Tokens within a Project

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_enrollment_tokens" />
Lists Server Enrollment Tokens within a Project

This endpoint requires one of the following roles: `access_user`, `access_admin`, or `server_enrollment_token_viewer`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `created_by_user`   | string | The ASA User that created this Server Enrollment Token |
| `description`   | string | A human-readable description of why this Server Enrollment Token was created |
| `id`   | string | The UUID that corresponds to the Server Enrollment Token |
| `issued_at`   | string | Time of creation |
| `token`   | object | A token used to enroll an ASA Server |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_enrollment_tokens
```

##### Response

```json
{
   "list": [
    {
        "id": "b6519474-6ca2-4fac-bc81-b334d9a103cd",
        "token": "eyJzIjoiYjY1MTk0NzQtNmNhMi00ZmFjLWJjODEtYjMzNGQ5YTEwM2NkIiwidSI6Imh0dHBzOi8vZGV2LnN1ZG8ud3RmOjg0NDMifQ==",
        "created_by_user": "william.faulkner",
        "issued_at": "2020-10-02T06:54:46.910552Z",
        "description": "Test Server Enrollment Token"
    },
    {
        "id": "99fd1170-0053-4865-b09b-0e704cfbb8cb",
        "token": "eyJzIjoiOTlmZDExNzAtMDA1My00ODY1LWIwOWItMGU3MDRjZmJiOGNiIiwidSI6Imh0dHBzOi8vZGV2LnN1ZG8ud3RmOjg0NDMifQ==",
        "created_by_user": "william.faulkner",
        "issued_at": "2020-10-02T06:57:02.829784708Z",
        "description": "Test Server Enrollment Token Two"
    }
   ]
}
```
### Create a Server Enrollment Token for a Project

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_enrollment_tokens" />
Creates a Server Enrollment Token to be used with a Project. These tokens are used to enroll a Server in a specific Project.

This endpoint requires one of the following roles: `access_user`, `access_admin`, or `server_enrollment_token_creator`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `created_by_user`   | string | The ASA User that created this Server Enrollment Token |
| `description`   | string | A human-readable description of why this Server Enrollment Token was created |
| `id`   | string | The UUID that corresponds to the Server Enrollment Token |
| `issued_at`   | string | Time of creation |
| `token`   | object | A token used to enroll an ASA Server |

#### Response body
This endpoint returns an object with the following fields and a `201` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `created_by_user`   | string | The ASA User that created this Server Enrollment Token |
| `description`   | string | A human-readable description of why this Server Enrollment Token was created |
| `id`   | string | The UUID that corresponds to the Server Enrollment Token |
| `issued_at`   | string | Time of creation |
| `token`   | object | A token used to enroll an ASA Server |

#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_enrollment_tokens
--data '{
    "id": null,
    "token": null,
    "created_by_user": null,
    "issued_at": null,
    "description": "Test Server Enrollment Token"
}'
```

##### Response

```json
{
    "id": "b6519474-6ca2-4fac-bc81-b334d9a103cd",
    "token": "eyJzIjoiYjY1MTk0NzQtNmNhMi00ZmFjLWJjODEtYjMzNGQ5YTEwM2NkIiwidSI6Imh0dHBzOi8vZGV2LnN1ZG8ud3RmOjg0NDMifQ==",
    "created_by_user": "william.faulkner",
    "issued_at": "2020-10-02T06:54:46.910552Z",
    "description": "Test Server Enrollment Token"
}
```
### Fetch a Server Enrollment Token from a Project

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_enrollment_tokens/${server_enrollment_token_id}" />
Fetches a Server Enrollment Token from a Project

This endpoint requires one of the following roles: `access_user`, `access_admin`, or `server_enrollment_token_viewer`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name |
| `server_enrollment_token_id`   | string | The UUID of the Server Enrollment Token |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `created_by_user`   | string | The ASA User that created this Server Enrollment Token |
| `description`   | string | A human-readable description of why this Server Enrollment Token was created |
| `id`   | string | The UUID that corresponds to the Server Enrollment Token |
| `issued_at`   | string | Time of creation |
| `token`   | object | A token used to enroll an ASA Server |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_enrollment_tokens/${server_enrollment_token_id}
```

##### Response

```json
{
    "id": "b6519474-6ca2-4fac-bc81-b334d9a103cd",
    "token": "eyJzIjoiYjY1MTk0NzQtNmNhMi00ZmFjLWJjODEtYjMzNGQ5YTEwM2NkIiwidSI6Imh0dHBzOi8vZGV2LnN1ZG8ud3RmOjg0NDMifQ==",
    "created_by_user": "william.faulkner",
    "issued_at": "2020-10-02T06:54:46.910552Z",
    "description": "Test Server Enrollment Token"
}
```
### Delete a Server Enrollment Token from a Project

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_enrollment_tokens/${server_enrollment_token_id}" />
Deletes a Server Enrollment Token from a Project

This endpoint requires the `access_admin` role.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name |
| `server_enrollment_token_id`   | string | The UUID of the Server Enrollment Token |
| `team_name`   | string | The name of your Team |


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
List all the Server Users in a Project. A Server User is a representation of a given ASA User that is created on an end server.

This endpoint requires one of the following roles: `reporting_user`, `access_user`, or `access_admin`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `admin`   | boolean | True if Server User has sudo permissions |
| `id`   | string | UUID of Server User API object |
| `server_user_name`   | string | The username that is used on Unix servers |
| `status`   | string | Status of the Server User |
| `type`   | string | Whether this is a Service or human user |
| `unix_gid`   | number | Unix GID of the Server User |
| `unix_uid`   | number | Unix UID of the Server User |
| `user_name`   | string | The username of the corresponding ASA User |
| `windows_server_user_name`   | string | The username that is used on Windows servers |

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
			"id": "2bbed0a1-7f9a-4627-addd-4a9cfa0e0469",
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
			"id": "b38e7db4-506f-4bc4-884a-57461c3fc0ae",
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
### Fetch Server User for a Project

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_users/${user_name}" />
Fetches a specific Server User for a Project

This endpoint requires one of the following roles: `access_user`, `access_admin`, or `reporting_user`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name |
| `team_name`   | string | The name of your Team |
| `user_name`   | string | The relevant username |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `admin`   | boolean | True if Server User has sudo permissions |
| `id`   | string | UUID of Server User API object |
| `server_user_name`   | string | The username that is used on Unix servers |
| `status`   | string | Status of the Server User |
| `type`   | string | Whether this is a Service or human user |
| `unix_gid`   | number | Unix GID of the Server User |
| `unix_uid`   | number | Unix UID of the Server User |
| `user_name`   | string | The username of the corresponding ASA User |
| `windows_server_user_name`   | string | The username that is used on Windows servers |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/server_users/${user_name}
```

##### Response

```json
{
	"list": {
		"admin": true,
		"id": "2bbed0a1-7f9a-4627-addd-4a9cfa0e0469",
		"server_user_name": "benjy",
		"status": "ACTIVE",
		"type": "human",
		"unix_gid": 63001,
		"unix_uid": 60001,
		"user_name": "benjycompson",
		"windows_server_user_name": "benjy"
	}
}
```
### List Servers in a Project

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/servers" />
Lists the Servers enrolled in this Project

This endpoint requires one of the following roles: `access_admin`, `server_admin`, or `access_user`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `access_address`   | string | The access address of the Server |
| `alt_names`   | array | (Optional) Alternative names for the Server |
| `bastion`   | string | Specifies the bastion host that Clients automatically use when connecting to this host |
| `canonical_name`   | string | Specifies the name that Clients should use/see when connecting to this host. Overrides the name found with hostname. |
| `cloud_provider`   | string | The cloud provider of the Server, if one exists |
| `deleted_at`   | string | The time the Server was deleted from the Project |
| `hostname`   | string | The hostname of the Server |
| `id`   | string | The UUID corresponding to the Server |
| `instance_details`   | object | Information that the cloud provider provides about the Server, if one exists |
| `labels`   | object | (Optional) The labels for this server. This parameter is only available with the PolicySync feature, which is currently in EA. |
| `last_seen`   | string | The last time that the Server made a request to the ASA platform |
| `managed`   | boolean | True if the Server is managed by 'sftd'. Unmanaged Servers are used in configurations where users may have a bastion, for example, that they don't want/can't connect to through 'sftd'. With an Unmanaged Server record to represent this box, ASA knows that it exists and to use it as a bastion hop. |
| `os`   | string | The particular OS of the Server, such as CentOS 6 or Debian 9.13 |
| `os_type`   | string | The OS family where the Server is running. Can be either Linux or Windows. |
| `project_name`   | string | The Project that the Server belongs to |
| `registered_at`   | string | The time that the Server was registered to the Project |
| `services`   | array | The service that Clients use to connect to the Server. Can either be `ssh` or `rdp`. |
| `sftd_version`   | string | The version of 'sftd' that the Server is running |
| `ssh_host_keys`   | array | The host keys used to authenticate the Server |
| `state`   | string | State of the Server: `ACTIVE` or `INACTIVE` |
| `team_name`   | string | The name of the Team |

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
			"canonical_name": null,
			"cloud_provider": null,
			"deleted_at": "0001-01-01T00:00:00Z",
			"hostname": "harvard",
			"id": "0a49a1cf-c747-47a0-bb14-94b1edb9f3ee",
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
			"canonical_name": null,
			"cloud_provider": null,
			"deleted_at": "0001-01-01T00:00:00Z",
			"hostname": "jefferson",
			"id": "ac68cb70-e3eb-4239-b6de-73d3878dd97b",
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
Adds an unmanaged Server to a Project. Unmanaged Servers don't use Advanced Server Access for authentication, but still receive Client Configuration Options. Create an Unmanaged Server to control connection options such port and agent forwarding for your users without requiring `sftd` to manage the Server..

This endpoint requires one of the following roles: `access_admin`, or `server_admin`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint requires an object with the following fields.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `access_address`   | string | The access address of the Server |
| `alt_names`   | array | (Optional) Alternative names for the Server |
| `hostname`   | string | The hostname of the Server |

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `access_address`   | string | The access address of the Server |
| `alt_names`   | array | (Optional) Alternative names for the Server |
| `bastion`   | string | Specifies the bastion host that Clients automatically use when connecting to this host |
| `canonical_name`   | string | Specifies the name that Clients should use/see when connecting to this host. Overrides the name found with hostname. |
| `cloud_provider`   | string | The cloud provider of the Server, if one exists |
| `deleted_at`   | string | The time the Server was deleted from the Project |
| `hostname`   | string | The hostname of the Server |
| `id`   | string | The UUID corresponding to the Server |
| `instance_details`   | object | Information that the cloud provider provides about the Server, if one exists |
| `labels`   | object | (Optional) The labels for this server. This parameter is only available with the PolicySync feature, which is currently in EA |
| `last_seen`   | string | The last time that the Server made a request to the ASA platform |
| `managed`   | boolean | True if the Server is managed by 'sftd'. Unmanaged Servers are used in configurations where users may have a bastion, for example, that they don't want/can't connect to through 'sftd'. With an Unmanaged Server record to represent this box, ASA knows that it exists and to use it as a bastion hop. |
| `os`   | string | The particular OS of the Server, such as CentOS 6 or Debian 9.13 |
| `os_type`   | string | The OS family where the Server is running. Can be either Linux or Windows. |
| `project_name`   | string | The Project that the Server belongs to |
| `registered_at`   | string | The time that the Server was registered to the Project |
| `services`   | array | The service that Clients use to connect to the Server. Can either be `ssh` or `rdp`. |
| `sftd_version`   | string | The version of 'sftd' that the Server is running |
| `ssh_host_keys`   | array | The host keys used to authenticate the Server |
| `state`   | string | State of the Server: `ACTIVE` or `INACTIVE` |
| `team_name`   | string | The name of the Team |

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
	"canonical_name": null,
	"cloud_provider": null,
	"deleted_at": "0001-01-01T00:00:00Z",
	"hostname": "bastion.dev.com",
	"id": "190cfa4d-9075-40b0-b50f-33fa7a940ac4",
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

### Fetch the details of a Server in a Project

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/servers/${server_id}" />
Fetches the details of a Server in a Project

This endpoint requires one of the following roles: `access_user`, `access_admin`, or `server_admin`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name |
| `server_id`   | string | The UUID of the Server |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns an object with the following fields and a `200` code on a successful call.
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `access_address`   | string | The access address of the Server |
| `alt_names`   | array | (Optional) Alternative names for the Server |
| `bastion`   | string | Specifies the bastion host that Clients automatically use when connecting to this host |
| `canonical_name`   | string | Specifies the name that Clients should use/see when connecting to this host. Overrides the name found with hostname. |
| `cloud_provider`   | string | The cloud provider of the Server, if one exists |
| `deleted_at`   | string | The time the Server was deleted from the Project |
| `hostname`   | string | The hostname of the Server |
| `id`   | string | The UUID corresponding to the Server |
| `instance_details`   | object | Information that the cloud provider provides about the Server, if one exists |
| `labels`   | object | (Optional) The labels for this server. Only available with the PolicySync feature, which is currently in EA |
| `last_seen`   | string | The last time that the Server made a request to the ASA platform |
| `managed`   | boolean | True if the Server is managed by 'sftd'. Unmanaged Servers are used in configurations where users may have a bastion, for example, that they don't want/can't connect to through 'sftd'. With an Unmanaged Server record to represent this box, ASA knows that it exists and to use it as a bastion hop. |
| `os`   | string | The particular OS of the Server, such as CentOS 6 or Debian 9.13 |
| `os_type`   | string | The OS family where the Server is running. Can be either Linux or Windows. |
| `project_name`   | string | The Project that the Server belongs to |
| `registered_at`   | string | The time that the Server was registered to the Project |
| `services`   | array | The service that Clients use to connect to the Server. Can either be `ssh` or `rdp`. |
| `sftd_version`   | string | The version of 'sftd' that the Server is running |
| `ssh_host_keys`   | array | The host keys used to authenticate the Server |
| `state`   | string | State of the Server: `ACTIVE` or `INACTIVE` |
| `team_name`   | string | The name of the Team |

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
	"canonical_name": null,
	"cloud_provider": null,
	"deleted_at": "0001-01-01T00:00:00Z",
	"hostname": "harvard",
	"id": "0a49a1cf-c747-47a0-bb14-94b1edb9f3ee",
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
Removes a Server from a Project

This endpoint requires one of the following roles: `access_admin`, or `server_admin`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name |
| `server_id`   | string | The UUID of the Server |
| `team_name`   | string | The name of your Team |


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
### Update a Server on a Project

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/servers/${server_id}" />
Updates a Server on a Project. This endpoint is only available with the PolicySync feature, which is currently in EA.

This endpoint requires one of the following roles: `access_admin`, or `server_admin`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string | The Project name |
| `server_id`   | string | The UUID of the Server |
| `team_name`   | string | The name of your Team |


#### Request query parameters

This endpoint has no query parameters.

#### Request body


This endpoint requires an object with the following fields:
| Properties | Type        | Description          |
|----------|-------------|----------------------|
| `labels`   | object | (Optional) A map of key value pairs. These labels will overwrite all labels previously supplied through the API for this server. You can only update labels from other sources using that source. If you don't supply the prefix 'api.' , it is automatically prepended. |

#### Response body
This endpoint returns a `204 No Content` response on a successful call.


#### Usage example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
--data '{
	"labels": {
		"foo": "bar"
	}
}' \
https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/servers/${server_id}
```

##### Response

```json
HTTP 204 No Content
```


