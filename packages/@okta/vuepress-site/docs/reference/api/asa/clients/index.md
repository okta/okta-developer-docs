---
title: Introduction to Client Endpoints
category: asa
---

# Clients API

## Getting Started

This article provides an overview of the clients API

Explore the Clients API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://example.com).


## Clients Operations

The Clients API has the following operations:
* [List clients](#list-clients)
* [Fetch a client](#fetch-a-client)
* [Revoke a client](#revoke-a-client)
* [Approve or assign a client](#approve-or-assign-a-client)


### List clients

<ApiOperation method="GET" url="/v1/teams/{team_name}/clients" />
By default returns the clients for the requesting user. Query options can be provided to filter by user or state.

#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |


#### Request Query Parameters

%List any query parameters here in alpha order%

| Parameter | Description   | Required |
| --------- | ------------- | -------- |
| offset   |   | false | 
| count   |   | false | 
| descending   |   | false | 
| prev   |   | false | 
| all   |  True returns all clients for the team | false | 
| state   |  One of ACTIVE, PENDING, DELETED | false | 
| username   |  List clients of a single user. An empty string returns unassigned clients. | false | 


#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 200: List of clients

Returns a list of [Client](/docs/asa/models.html#client) objects.

#### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/clients
```

##### Response
```json
{"list":[{"deleted_at":null,"description":"Work laptop","encrypted":true,"hostname":"LightInAugust","id":"5ef813ef-8f5b-40c9-aca5-251410e5f239","os":"macOS 10.14.6","state":"PENDING","user_name":"Jason.Compson.IV"},{"deleted_at":null,"description":"Personal laptop","encrypted":true,"hostname":"Absalom","id":"fcac5df2-d74a-4e53-a1c3-ae1f561aef88","os":"macOS 10.14.6","state":"ACTIVE","user_name":"Jason.Compson.IV"}]}
```
### Fetch a client

<ApiOperation method="GET" url="/v1/teams/{team_name}/clients/{id}" />


#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| id   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 200: The client that was requested

Returns a [Client](/docs/asa/models.html#client) object.

#### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/clients/{id}
```

##### Response
```json
{"deleted_at":null,"description":"Work laptop","encrypted":true,"hostname":"LightInAugust","id":"5ef813ef-8f5b-40c9-aca5-251410e5f239","os":"macOS 10.14.6","state":"PENDING","user_name":"Jason.Compson.IV"}
```
### Revoke a client

<ApiOperation method="DELETE" url="/v1/teams/{team_name}/clients/{id}" />
Revoke a client's access to this team.

#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| id   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 204: The client was revoked successfully.



#### Usage Example

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/clients/{id}
```

##### Response
```json

```
### Approve or assign a client

<ApiOperation method="PUT" url="/v1/teams/{team_name}/clients/{id}" />
Used for clients enrolled using a token policy or a policy that requires approval.

#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |
| id   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

*Required:* A user to which to assign the client or a state to which to update the client.
Uses a [ClientUpdateRequest](/docs/asa/models.html#clientupdaterequest) object.

#### Response Body

On returning a 204: The client was updated successfully.



#### Usage Example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/clients/{id}
```

##### Response
```json

```


