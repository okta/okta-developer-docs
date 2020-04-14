---
title: Introduction to Teams
category: asa
---

# Teams API

## Getting Started

This article covers API endpoints related to the team resource

Explore the Teams API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://example.com).


## Teams Operations

The Teams API has the following operations:
* [Fetch settings for a team](#fetch-settings-for-a-team)
* [Update team settings](#update-team-settings)


### Fetch settings for a team

<ApiOperation method="GET" url="/v1/teams/{team_name}/settings" />
Each team has settings created by default.

#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 200: The team settings requested

Returns a [TeamSettings](/docs/asa/models.html#teamsettings) object.

#### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/settings
```

##### Response
```json

```
### Update team settings

<ApiOperation method="PUT" url="/v1/teams/{team_name}/settings" />
Partial updates are permitted. URL parameters are optional and default to unset. To unset a previously-set URL, PUT with the value set to `null`.

#### Request Path Parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| team_name   | string |  |


#### Request Query Parameters

This endpoint has no query parameters.

#### Request Body

*Required:* 
Uses a [TeamSettings](/docs/asa/models.html#teamsettings) object.

#### Response Body

On returning a 204: The team settings was successfully updated.



#### Usage Example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/settings
```

##### Response
```json

```


