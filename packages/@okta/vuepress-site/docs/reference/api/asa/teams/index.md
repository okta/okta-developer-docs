---
title: Teams
category: asa
---

# Teams API

## Get started

This article covers API endpoints related to the Team resource

Explore the Teams API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://example.com).


## Teams Operations


The Teams API has the following operations:
* [Fetch settings for a team](#fetch-settings-for-a-team)
* [Update team settings](#update-team-settings)


### Fetch settings for a team

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/settings" />
Each team has settings created by default.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

This endpoint has no request body.

#### Response body

On returning a 200: The team settings requested

Returns a [TeamSettings](/docs/asa/objects.html#teamsettings) object.

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/settings

```

##### Response
```json

```
### Update team settings

<ApiOperation method="PUT" url="https://app.scaleft.com/v1/teams/${team_name}/settings" />
Partial updates are permitted. URL parameters are optional and default to unset. To unset a previously-set URL, PUT with the value set to `null`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string |  |


#### Request query parameters

This endpoint has no query parameters.

#### Request body

*Required:* 
Uses a [TeamSettings](/docs/asa/objects.html#teamsettings) object.

#### Response body

On returning a 204: The team settings was successfully updated.



#### Usage example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.comhttps://app.scaleft.com/v1/teams/${team_name}/settings

```

##### Response
```json

```


