---
title: ASA Users
category: asa
---

# ASA Users API

## Get started

This article provides an overview of the ASA Users API

Explore the ASA Users API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://example.com).


## ASA Users Operations


The ASA Users API has the following operations:
* [Issue a Service User token](#issue-a-service-user-token)
* [Lists the users for a team](#lists-the-users-for-a-team)
* [Fetches single user](#fetches-single-user)
* [Updates a user](#updates-a-user)
* [Lists groups a user is a member of](#lists-groups-a-user-is-a-member-of)


### Issue a Service User token

<ApiOperation method="POST" url="https://app.scaleft.com/v1/teams/${team_name}/service_token" />
Most calls to the Okta Advanced Server Access API require an HTTP Authorization header with a value of the form Bearer ${AUTH_TOKEN}.
To retrieve an auth token, you'll need to [create a service user and API key](https://help.okta.com/en/prod/Content/Topics/Adv_Server_Access/docs/service-users.htm), then pass the API key information to the "Get token for service user" endpoint.
Auth tokens may expire at any time, so code using them should be prepared to handle a 401 response code by creating a new one.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

*Required:* API key ID and secret
Uses a [IssueServiceTokenRequestBody](/docs/asa/objects.html#issueservicetokenrequestbody) object.

#### Response body

On returning a 200: On success, the call will return a JSON object with the bearer token and its expiration date.

Returns a [AuthTokenResponse](/docs/asa/objects.html#authtokenresponse) object.

#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/service_token
{
	"key_id": "18a1f790-2746-4f71-ba7e-2bf1b00b0019",
	"key_secret": "uF0SoVBVQP/hJmQSLUZdM2a7ArYzjD8ykzvG7n4tKaOEfSErcwMUUDWpEf4Q42/HaVKPZUfILkzy/bsQFv7WRg==",
	"roles": null
}
```

##### Response
```json
{
	"key_id": "18a1f790-2746-4f71-ba7e-2bf1b00b0019",
	"key_secret": "uF0SoVBVQP/hJmQSLUZdM2a7ArYzjD8ykzvG7n4tKaOEfSErcwMUUDWpEf4Q42/HaVKPZUfILkzy/bsQFv7WRg==",
	"roles": null
}
```
### Lists the users for a team

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/users" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string |  |


#### Request query parameters

%List any query parameters here in alpha order%

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `contains`   |  string | (Optional) Includes users with name that contains the value. |
| `count`   |  integer | (Optional) The number of objects per page. |
| `descending`   |  boolean | (Optional) The object order. |
| `include_service_users`   |  string | (Optional) Includes service users in result. |
| `offset`   |  string | (Optional) The page offset. |
| `prev`   |  boolean | (Optional) The direction of paging. |
| `starts_with`   |  string | (Optional) Includes users with name that begins with the value. |
| `status`   |  string | (Optional) Includes users with specified statuses. Valid statuses are ACTIVE, DISABLED, and DELETED. |


#### Request body

This endpoint has no request body.

#### Response body

On returning a 200: List of users.

Returns a list of [User](/docs/asa/objects.html#user) objects.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/users

```

##### Response
```json
{
	"list": [
		{
			"deleted_at": null,
			"details": {
				"email": "jason.compson@example.com",
				"first_name": "Jason",
				"full_name": "Jason Compson IV",
				"last_name": "Compson"
			},
			"id": "4664ad72-f7a6-4f3f-a530-0be5ccc54275",
			"name": "Jason.Compson.IV",
			"oauth_client_application_id": null,
			"role_grants": null,
			"status": "ACTIVE",
			"user_type": "human"
		},
		{
			"deleted_at": null,
			"details": {
				"email": "benjy.compson@example.com",
				"first_name": "Benjy",
				"full_name": "Benjy Compson",
				"last_name": "Compson"
			},
			"id": "e4de46a8-8fa9-4612-a220-ab85952394e5",
			"name": "Benjy.Compson",
			"oauth_client_application_id": null,
			"role_grants": null,
			"status": "DISABLED",
			"user_type": "human"
		},
		{
			"deleted_at": "1910-06-10T00:00:00Z",
			"details": {
				"email": "quentin.compson@example.com",
				"first_name": "Quentin",
				"full_name": "Quentin Compson III",
				"last_name": "Compson"
			},
			"id": "7eb30d83-387e-416d-9bc5-fee2162b85ae",
			"name": "Quentin.Compson.III",
			"oauth_client_application_id": null,
			"role_grants": null,
			"status": "DELETED",
			"user_type": "human"
		}
	]
}
```
### Fetches single user

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string |  |
| `user_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body

On returning a 200: The user that was requested.

Returns a [User](/docs/asa/objects.html#user) object.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/users/${user_name}

```

##### Response
```json
{
	"deleted_at": null,
	"details": {
		"email": "jason.compson@example.com",
		"first_name": "Jason",
		"full_name": "Jason Compson IV",
		"last_name": "Compson"
	},
	"id": "4664ad72-f7a6-4f3f-a530-0be5ccc54275",
	"name": "Jason.Compson.IV",
	"oauth_client_application_id": null,
	"role_grants": null,
	"status": "ACTIVE",
	"user_type": "human"
}
```
### Updates a user

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string |  |
| `user_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body

On returning a 204: The user was updated successfully.



#### Usage example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/users/${user_name}

```

##### Response
```json

```
### Lists groups a user is a member of

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/users/${user_name}/groups" />


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string |  |
| `user_name`   | string |  |


#### Request query parameters

%List any query parameters here in alpha order%

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `contains`   |  string | (Optional) Includes groups with name that contain value. |
| `count`   |  integer | (Optional) The number of objects per page. |
| `descending`   |  boolean | (Optional) The object order. |
| `offset`   |  string | (Optional) The page offset. |
| `prev`   |  boolean | (Optional) The direction of paging. |


#### Request body

This endpoint has no request body.

#### Response body

On returning a 200: List of groups.

Returns a list of [Group](/docs/asa/objects.html#group) objects.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/users/${user_name}/groups

```

##### Response
```json
{
	"list": [
		{
			"deleted_at": "0001-01-01T00:00:00Z",
			"federated_from_team": null,
			"federation_approved_at": null,
			"id": "2ddc20e1-b939-4023-ae13-0ece0ad9482a",
			"name": "compsons",
			"roles": [
				"access_user",
				"reporting_user",
				"access_admin"
			]
		}
	]
}
```


