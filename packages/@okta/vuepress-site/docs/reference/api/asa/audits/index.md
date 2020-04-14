---
title: Introduction to Audit Events
category: asa
---

# Audit Events API

## Getting Started

This article provides an overview of the audit events API

Explore the Audit Events API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://example.com).


## Audit Events Operations

The Audit Events API has the following operations:
* [Lists the audits for a team.](#lists-the-audits-for-a-team.)


### Lists the audits for a team.

<ApiOperation method="GET" url="/v1/teams/{team_name}/auditsV2" />


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


#### Request Body

This endpoint has no request body.

#### Response Body

On returning a 200: List of audits

Returns a list of [AuditEventV2Schema](/docs/asa/models.html#auditeventv2schema) objects.

#### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/{team_name}/auditsV2
```

##### Response
```json
{"list":[{"details":{"actor":"FWUysQmguH4ns9NT1Uszl5j2a1t9SK2lYNACeu03uBs=","client":"WvajuG7IeAjPYPdzN0zJTSmujqXLpYd90s4haNXLzRA=","session_type":"authenticated_client","target_server":"","team_id":"","team_name":"william-faulkner","trace_id":"YqabgEzI","type":"auth_token.issue","via":null},"id":"UD5pqjIhjKVQPmmqMiGMpQ==","timestamp":"2020-04-13T19:07:55.514293808Z"}],"related_objects":{"FWUysQmguH4ns9NT1Uszl5j2a1t9SK2lYNACeu03uBs=":{"object":{"deleted_at":null,"details":{"email":"jason.compson@example.com","first_name":"Jason","full_name":"Jason Compson IV","last_name":"Compson"},"id":"e4c22cba-f8ec-4beb-98f4-b1a03725b204","name":"Jason.Compson.IV","oauth_client_application_id":null,"role_grants":null,"status":"ACTIVE","user_type":"human"},"type":"user"},"WvajuG7IeAjPYPdzN0zJTSmujqXLpYd90s4haNXLzRA=":{"object":{"deleted_at":null,"description":"Personal laptop","encrypted":true,"hostname":"Absalom","id":"65d9e9d0-b0e5-48d9-aea6-420b9da6d1a3","os":"macOS 10.14.6","state":"ACTIVE","user_name":"Jason.Compson.IV"},"type":"client"}}}
```


