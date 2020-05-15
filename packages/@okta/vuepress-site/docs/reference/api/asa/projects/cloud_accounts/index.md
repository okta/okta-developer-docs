---
title: Project Cloud Accounts
category: asa
---

# Project Cloud Accounts API

## Get started

This article covers the management of Cloud Accounts within a single Project.

Explore the Project Cloud Accounts API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://example.com).


## Project Cloud Accounts Operations


The Project Cloud Accounts API has the following operations:
* [List Cloud Accounts in a Project](#list-cloud-accounts-in-a-project)
* [Add a Cloud Account to a Project](#add-a-cloud-account-to-a-project)
* [Remove a Cloud Account from a Project](#remove-a-cloud-account-from-a-project)


### List Cloud Accounts in a Project

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/cloud_accounts" />


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

On returning a 200: List of Cloud Accounts in a Project

Returns a list of [ProjectCloudAccount](/docs/asa/objects.html#projectcloudaccount) objects.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/cloud_accounts

```

##### Response
```json
{
	"list": [
		{
			"account_id": "123456789012",
			"description": "Dev AWS account",
			"id": "6ccb5baf-70af-4d9c-92ae-9a9ef6a0f4a4",
			"provider": "aws"
		},
		{
			"account_id": "630225935076",
			"description": "Dev GCE account",
			"id": "7af8d60e-7baa-4cd2-a65a-4dadede8ec11",
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
| `project_name`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body

On returning a 200: Cloud Account that was added to the Project

Returns a [ProjectCloudAccount](/docs/asa/objects.html#projectcloudaccount) object.

#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/cloud_accounts

```

##### Response
```json
{
	"account_id": "123456789012",
	"description": "Dev AWS account",
	"id": "6ccb5baf-70af-4d9c-92ae-9a9ef6a0f4a4",
	"provider": "aws"
}
```
### Remove a Cloud Account from a Project

<ApiOperation method="DELETE" url="https://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/cloud_accounts/${cloud_account_id}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `cloud_account_id`   | string |  |
| `project_name`   | string |  |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body

On returning a 204: The Cloud Account was removed successfully.



#### Usage example

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/projects/${project_name}/cloud_accounts/${cloud_account_id}

```

##### Response
```json

```


