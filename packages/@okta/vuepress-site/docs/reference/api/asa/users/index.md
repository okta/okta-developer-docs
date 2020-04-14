---
title: Introduction to User Endpoints
category: asa
---

# Users API

## Getting Started

This article provides an overview of the user API

Explore the Users API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://example.com).


## Users Operations

The Users API has the following operations:
* [Lists the users for a team](#lists-the-users-for-a-team)
* [Fetches single user](#fetches-single-user)
* [Updates a user](#updates-a-user)
* [Lists groups a user is a member of](#lists-groups-a-user-is-a-member-of)


### Lists the users for a team

<ApiOperation method="GET" url="/v1/teams/{team_name}/users" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 200: List of users

Returns a list of [User](/docs/asa/models.html#user) objects.

#### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/users
```

##### Response
```json
{"list":[{"deleted_at":null,"details":{"email":"jason.compson@example.com","first_name":"Jason","full_name":"Jason Compson IV","last_name":"Compson"},"id":"8b19c6cb-7b48-48d1-bc2e-6c31bfe4d300","name":"Jason.Compson.IV","oauth_client_application_id":null,"role_grants":null,"status":"ACTIVE","user_type":"human"},{"deleted_at":null,"details":{"email":"benjy.compson@example.com","first_name":"Benjy","full_name":"Benjy Compson","last_name":"Compson"},"id":"0f679637-83f4-4c23-8bb1-088d04587986","name":"Benjy.Compson","oauth_client_application_id":null,"role_grants":null,"status":"DISABLED","user_type":"human"},{"deleted_at":"1910-06-10T00:00:00Z","details":{"email":"quentin.compson@example.com","first_name":"Quentin","full_name":"Quentin Compson III","last_name":"Compson"},"id":"58ead550-ebcd-469b-8541-af64057b6a00","name":"Quentin.Compson.III","oauth_client_application_id":null,"role_grants":null,"status":"DELETED","user_type":"human"}]}
```
### Fetches single user

<ApiOperation method="GET" url="/v1/teams/{team_name}/users/{user_name}" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| user_name   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 200: The user that was requested

Returns a [User](/docs/asa/models.html#user) object.

#### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/users/{user_name}
```

##### Response
```json
{"deleted_at":null,"details":{"email":"jason.compson@example.com","first_name":"Jason","full_name":"Jason Compson IV","last_name":"Compson"},"id":"8b19c6cb-7b48-48d1-bc2e-6c31bfe4d300","name":"Jason.Compson.IV","oauth_client_application_id":null,"role_grants":null,"status":"ACTIVE","user_type":"human"}
```
### Updates a user

<ApiOperation method="PUT" url="/v1/teams/{team_name}/users/{user_name}" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| user_name   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 204: The user was updated successfully.



#### Usage Example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/users/{user_name}
```

##### Response
```json

```
### Lists groups a user is a member of

<ApiOperation method="GET" url="/v1/teams/{team_name}/users/{user_name}/groups" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| user_name   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 200: List of groups

Returns a list of [Group](/docs/asa/models.html#group) objects.

#### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/users/{user_name}/groups
```

##### Response
```json
{"list":[{"deleted_at":"0001-01-01T00:00:00Z","federated_from_team":null,"federation_approved_at":null,"id":"5e41a7d8-4b81-49db-b552-3cb1f3ec936c","name":"compsons","roles":["access_user","reporting_user","access_admin"]}]}
```


