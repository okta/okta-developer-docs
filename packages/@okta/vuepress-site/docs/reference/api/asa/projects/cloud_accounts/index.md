---
title: Projects and Cloud Accounts
category: asa
---

# Project Cloud Accounts API

## Getting Started

This article covers the management of cloud accounts within a single project.

Explore the Project Cloud Accounts API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://example.com).


## Project Cloud Accounts Operations

The Project Cloud Accounts API has the following operations:
* [Add a cloud account to a project](#add-a-cloud-account-to-a-project)
* [List cloud accounts in a project](#list-cloud-accounts-in-a-project)
* [Remove a cloud account in a project](#remove-a-cloud-account-in-a-project)


### Add a cloud account to a project

<ApiOperation method="POST" url="/v1/teams/{team_name}/projects/{project_name}/cloud_accounts" />
Adding a Cloud Account to a project allows servers created on that account to register with ScaleFT without using a Server Enrollment Token. This is only possible on Cloud Providers that expose cryptographically signed instance metadata so is currently restricted to AWS.

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

On returning a 200: Cloud account that was added to the project

Returns a [ProjectCloudAccount](/docs/asa/models.html#projectcloudaccount) object.

#### Usage Example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/projects/{project_name}/cloud_accounts
```

##### Response
```json

```
### List cloud accounts in a project

<ApiOperation method="GET" url="/v1/teams/{team_name}/projects/{project_name}/cloud_accounts" />


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

On returning a 200: List of cloud accounts in a project

Returns a list of [ProjectCloudAccount](/docs/asa/models.html#projectcloudaccount) objects.

#### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/projects/{project_name}/cloud_accounts
```

##### Response
```json

```
### Remove a cloud account in a project

<ApiOperation method="DELETE" url="/v1/teams/{team_name}/projects/{project_name}/cloud_accounts/{cloud_account_id}" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| project_name   | string |  |
| cloud_account_id   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 204: The cloud account was removed successfully.



#### Usage Example

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/projects/{project_name}/cloud_accounts/{cloud_account_id}
```

##### Response
```json

```


