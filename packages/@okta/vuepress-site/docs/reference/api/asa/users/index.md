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
* [Issue service user token](#issue-service-user-token)
* [Fetches single user](#fetches-single-user)
* [Updates a user](#updates-a-user)
* [Lists groups a user is a member of](#lists-groups-a-user-is-a-member-of)
* [Lists the users for a team](#lists-the-users-for-a-team)


### Issue service user token

<ApiOperation method="POST" url="/v1/teams/{team_name}/service_token" />
Most calls to the ScaleFT API require an HTTP Authorization header with a value of the form Bearer ${AUTH_TOKEN}.
To retrieve an auth token, you'll need to [create a service user and API key](https://www.scaleft.com/docs/service-users/), then pass the API key information to the "Get token for service user" endpoint.
Auth tokens may expire at any time, so code using them should be prepared to handle a 401 response code by creating a new one.

#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

*Required:* API key ID and secret
Uses a [IssueServiceTokenRequestBody](/docs/asa/models.html#issueservicetokenrequestbody) object.

#### Response Body

On returning a 200: On success, the call will return a JSON object with the bearer token and its expiration date

Returns a [AuthTokenResponse](/docs/asa/models.html#authtokenresponse) object.

#### Usage Example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/service_token
```

##### Response
```json
{"key_id":"9c4f4a13-6460-4310-9154-339aab21076a","key_secret":"uF0SoVBVQP/hJmQSLUZdM2a7ArYzjD8ykzvG7n4tKaOEfSErcwMUUDWpEf4Q42/HaVKPZUfILkzy/bsQFv7WRg==","roles":null}
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
{"deleted_at":null,"details":{"email":"jason.compson@example.com","first_name":"Jason","full_name":"Jason Compson IV","last_name":"Compson"},"id":"6da51721-1c8a-4d5c-955f-d27a0fe35bdf","name":"Jason.Compson.IV","oauth_client_application_id":null,"role_grants":null,"status":"ACTIVE","user_type":"human"}
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
{"list":[{"deleted_at":"0001-01-01T00:00:00Z","federated_from_team":null,"federation_approved_at":null,"id":"94733d19-9403-4e22-9fbd-2c499f5244ef","name":"compsons","roles":["access_user","reporting_user","access_admin"]}]}
```
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
{"list":[{"deleted_at":null,"details":{"email":"jason.compson@example.com","first_name":"Jason","full_name":"Jason Compson IV","last_name":"Compson"},"id":"6da51721-1c8a-4d5c-955f-d27a0fe35bdf","name":"Jason.Compson.IV","oauth_client_application_id":null,"role_grants":null,"status":"ACTIVE","user_type":"human"},{"deleted_at":null,"details":{"email":"benjy.compson@example.com","first_name":"Benjy","full_name":"Benjy Compson","last_name":"Compson"},"id":"12d7365d-377c-4194-a703-350e4b550b73","name":"Benjy.Compson","oauth_client_application_id":null,"role_grants":null,"status":"DISABLED","user_type":"human"},{"deleted_at":"1910-06-10T00:00:00Z","details":{"email":"quentin.compson@example.com","first_name":"Quentin","full_name":"Quentin Compson III","last_name":"Compson"},"id":"80a6e549-514f-4275-9afa-28f6f1951f4b","name":"Quentin.Compson.III","oauth_client_application_id":null,"role_grants":null,"status":"DELETED","user_type":"human"}]}
```


