---
title: Introduction to Group Endpoints
category: asa
---

# Groups API

## Getting Started

This article provides an overview of the group API

Explore the Groups API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://example.com).


## Groups Operations

The Groups API has the following operations:
* [Lists the groups for a team](#lists-the-groups-for-a-team)
* [Create a group](#create-a-group)
* [Fetches a single group](#fetches-a-single-group)
* [Remove group from team](#remove-group-from-team)
* [Update a group](#update-a-group)
* [List users of group](#list-users-of-group)
* [Add user to group](#add-user-to-group)
* [Remove user from group](#remove-user-from-group)
* [List users of a team not assigned to a group](#list-users-of-a-team-not-assigned-to-a-group)


### Lists the groups for a team

<ApiOperation method="GET" url="/v1/teams/{team_name}/groups" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |


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
https://app.scaleft.com/v1/teams/{team_name}/groups
```

##### Response
```json
{"list":[{"deleted_at":"0001-01-01T00:00:00Z","federated_from_team":"william-faulkner","federation_approved_at":"2018-04-07T00:00:00Z","id":"4e88ade1-cfe8-4f84-bcd0-b7295d73f15d","name":"compsons","roles":["access_user","reporting_user","access_admin"]},{"deleted_at":"0001-01-01T00:00:00Z","federated_from_team":null,"federation_approved_at":null,"id":"5e41a7d8-4b81-49db-b552-3cb1f3ec936c","name":"compsons","roles":["access_user","reporting_user","access_admin"]}]}
```
### Create a group

<ApiOperation method="POST" url="/v1/teams/{team_name}/groups" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

*Required:* Group to create
Uses a [Group](/docs/asa/models.html#group) object.

#### Response Body

On returning a 201: The group that was created

Returns a [Group](/docs/asa/models.html#group) object.

#### Usage Example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/groups
```

##### Response
```json
{"deleted_at":"0001-01-01T00:00:00Z","federated_from_team":null,"federation_approved_at":null,"id":"5e41a7d8-4b81-49db-b552-3cb1f3ec936c","name":"compsons","roles":["access_user","reporting_user","access_admin"]}
```
### Fetches a single group

<ApiOperation method="GET" url="/v1/teams/{team_name}/groups/{group_name}" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| group_name   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 200: The group that was requested

Returns a [Group](/docs/asa/models.html#group) object.

#### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/groups/{group_name}
```

##### Response
```json

```
### Remove group from team

<ApiOperation method="DELETE" url="/v1/teams/{team_name}/groups/{group_name}" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| group_name   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 204: The group was removed successfully.



#### Usage Example

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/groups/{group_name}
```

##### Response
```json

```
### Update a group

<ApiOperation method="PUT" url="/v1/teams/{team_name}/groups/{group_name}" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| group_name   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

*Required:* Roles to update
Uses a [GroupUpdate](/docs/asa/models.html#groupupdate) object.

#### Response Body

On returning a 204: The group was updated successfully.



#### Usage Example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/groups/{group_name}
```

##### Response
```json

```
### List users of group

<ApiOperation method="GET" url="/v1/teams/{team_name}/groups/{group_name}/users" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| group_name   | string |  |


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
https://app.scaleft.com/v1/teams/{team_name}/groups/{group_name}/users
```

##### Response
```json
{"list":[{"deleted_at":null,"details":{"email":"benjy.compson@example.com","first_name":"Benjy","full_name":"Benjy Compson","last_name":"Compson"},"id":"0f679637-83f4-4c23-8bb1-088d04587986","name":"Benjy.Compson","oauth_client_application_id":null,"role_grants":null,"status":"DISABLED","user_type":"human"}]}
```
### Add user to group

<ApiOperation method="POST" url="/v1/teams/{team_name}/groups/{group_name}/users" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| group_name   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

*Required:* Roles to update
Uses a [GroupUpdate](/docs/asa/models.html#groupupdate) object.

#### Response Body

On returning a 204: The user was added to the group successfully.



#### Usage Example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/groups/{group_name}/users
```

##### Response
```json

```
### Remove user from group

<ApiOperation method="DELETE" url="/v1/teams/{team_name}/groups/{group_name}/users/{user_name}" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| group_name   | string |  |
| user_name   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 204: The user was removed from the group successfully.



#### Usage Example

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/groups/{group_name}/users/{user_name}
```

##### Response
```json

```
### List users of a team not assigned to a group

<ApiOperation method="GET" url="/v1/teams/{team_name}/groups/{group_name}/users_not_in_group" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| group_name   | string |  |


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
https://app.scaleft.com/v1/teams/{team_name}/groups/{group_name}/users_not_in_group
```

##### Response
```json
{"list":[{"deleted_at":null,"details":{"email":"jason.compson@example.com","first_name":"Jason","full_name":"Jason Compson IV","last_name":"Compson"},"id":"8b19c6cb-7b48-48d1-bc2e-6c31bfe4d300","name":"Jason.Compson.IV","oauth_client_application_id":null,"role_grants":null,"status":"ACTIVE","user_type":"human"}]}
```


