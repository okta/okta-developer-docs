---
title: Projects and Client Configuration Options
category: asa
---

# Client Configuration Options API

## Getting Started

This article covers the project-specific client configuration options.

Explore the Client Configuration Options API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://example.com).


## Client Configuration Options Operations

The Client Configuration Options API has the following operations:
* [List client configuration options for a project](#list-client-configuration-options-for-a-project)
* [Add client configuration options for a project](#add-client-configuration-options-for-a-project)
* [Remove a client configuration option from a Project](#remove-a-client-configuration-option-from-a-project)


### List client configuration options for a project

<ApiOperation method="GET" url="/v1/teams/{team_name}/projects/{project_name}/client_config_options" />
Use client configuration to automatically pass settings to any client logging into a server in this project.

#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| project_name   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 200: 200

Returns a list of [ClientConfigOption](/docs/asa/models.html#clientconfigoption) objects.

#### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/projects/{project_name}/client_config_options
```

##### Response
```json
{"list":[{"config_key":"ssh.insecure_forward_agent","config_value":"host","id":"b3f834ac-1b31-434d-bbc9-2aa91e5c90c4"},{"config_key":"ssh.port_forward_method","config_value":"netcat","id":"ef670856-0667-4ed3-b85a-c865dcd78558"}]}
```
### Add client configuration options for a project

<ApiOperation method="POST" url="/v1/teams/{team_name}/projects/{project_name}/client_config_options" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| project_name   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

*Required:* The client configuration option to create
Uses a [ClientConfigOption](/docs/asa/models.html#clientconfigoption) object.

#### Response Body

On returning a 200: The client configuration option created

Returns a [ClientConfigOption](/docs/asa/models.html#clientconfigoption) object.

#### Usage Example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/projects/{project_name}/client_config_options
```

##### Response
```json
{"config_key":"ssh.insecure_forward_agent","config_value":"host","id":"b3f834ac-1b31-434d-bbc9-2aa91e5c90c4"}
```
### Remove a client configuration option from a Project

<ApiOperation method="DELETE" url="/v1/teams/{team_name}/projects/{project_name}/client_config_options/{id}" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| project_name   | string |  |
| id   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 204: The configuration option was successfully deleted.



#### Usage Example

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/projects/{project_name}/client_config_options/{id}
```

##### Response
```json

```


