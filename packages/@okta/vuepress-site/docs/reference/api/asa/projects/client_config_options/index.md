---
title: Client Configuration Options
category: asa
---

# Client Configuration Options API

## Get started

This article covers the Project-specific Client Configuration Options.

Explore the Client Configuration Options API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://example.com).


## Client Configuration Options Operations


The Client Configuration Options API has the following operations:
* [List Client Configuration Options for a Project](#list-client-configuration-options-for-a-project)
* [Add Client Configuration Options for a Project](#add-client-configuration-options-for-a-project)
* [Remove a Client Configuration Option from a Project](#remove-a-client-configuration-option-from-a-project)


### List Client Configuration Options for a Project

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/client_config_options" />
Use Client Configuration Options to automatically pass settings to any Client logging into a server in this Project.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body

On returning a 200: 200

Returns a list of [ClientConfigOption](/docs/asa/objects.html#clientconfigoption) objects.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/client_config_options

```

##### Response
```json
{
	"list": [
		{
			"config_key": "ssh.insecure_forward_agent",
			"config_value": "host",
			"id": "bb87a9e0-d7d5-4ee5-97ea-aab6ba70ae13"
		},
		{
			"config_key": "ssh.port_forward_method",
			"config_value": "netcat",
			"id": "2cb75bc4-cb5b-425e-842f-34d946ea2117"
		}
	]
}
```
### Add Client Configuration Options for a Project

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/client_config_options" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `project_name`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

*Required:* The Client Configuration Option to create
Uses a [ClientConfigOption](/docs/asa/objects.html#clientconfigoption) object.

#### Response body

On returning a 200: The Client Configuration Option was created

Returns a [ClientConfigOption](/docs/asa/objects.html#clientconfigoption) object.

#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/client_config_options
{
	"config_key": "ssh.insecure_forward_agent",
	"config_value": "host",
	"id": ""
}
```

##### Response
```json
{
	"config_key": "ssh.insecure_forward_agent",
	"config_value": "host",
	"id": "bb87a9e0-d7d5-4ee5-97ea-aab6ba70ae13"
}
```
### Remove a Client Configuration Option from a Project

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/client_config_options/${id}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `id`   | string |  |
| `project_name`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body

On returning a 204: The Client Configuration Option was successfully deleted



#### Usage example

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/client_config_options/${id}

```

##### Response
```json

```


