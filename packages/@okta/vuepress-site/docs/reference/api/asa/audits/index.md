---
title: ASA Audit Events
category: asa
---

# ASA Audit Events API

## Get Started


| Product  | API Basics  | API Namespace        |
|----------|-------------|----------------------|
| [Advanced Server Access](https://www.okta.com/products/advanced-server-access/) | [How the ASA API works](../introduction/) | `https://app.scaleft.com/v1/`

ASA Audit Events provide log data of ASA User actions such as accessing ASA Servers, enrolling ASA Clients, and creating resources.


## Audit Events API Operation


The Audit Events API has the following operation:
* [List the Audits for a Team](#list-the-audits-for-a-team)


### List the Audits for a Team

<ApiOperation method="GET" url="https://app.scaleft.com/v1/teams/${team_name}/auditsV2" />
This endpoint requires one of the following roles: `access_user`, `access_admin`, `reporting_user`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `team_name`   | string | The name of your Team. |


#### Request query parameters

| Parameter | Type   | Description |
| --------- | ------------- | -------- |
| `count`   |  integer | (Optional) The number of objects per page. |
| `descending`   |  boolean | (Optional) The object order. |
| `offset`   |  string | (Optional) The page offset. |
| `prev`   |  boolean | (Optional) The direction of paging. |


#### Request body

This endpoint has no request body.

#### Response body
This endpoint returns a list of objects with the following fields and a `200` code on a successful call.
| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `list`   | array | The list of Audit events. |
| `related_objects`   | object | All objects related to the Audit events. |

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${jwt}" \
https://app.scaleft.com/v1/teams/${team_name}/auditsV2```

##### Response
```json
{
	"list": [
		{
			"details": {
				"actor": "FWUysQmguH4ns9NT1Uszl5j2a1t9SK2lYNACeu03uBs=",
				"client": "WvajuG7IeAjPYPdzN0zJTSmujqXLpYd90s4haNXLzRA=",
				"session_type": "authenticated_client",
				"target_server": "",
				"team_id": "",
				"team_name": "william-faulkner",
				"trace_id": "YqabgEzI",
				"type": "auth_token.issue",
				"via": null
			},
			"id": "UD5pqjIhjKVQPmmqMiGMpQ==",
			"timestamp": "2020-07-31T22:52:15.239331336Z"
		}
	],
	"related_objects": {
		"FWUysQmguH4ns9NT1Uszl5j2a1t9SK2lYNACeu03uBs=": {
			"object": {
				"deleted_at": null,
				"details": {
					"email": "jason.compson@example.com",
					"first_name": "Jason",
					"full_name": "Jason Compson IV",
					"last_name": "Compson"
				},
				"id": "e4c22cba-f8ec-4beb-98f4-b1a03725b204",
				"name": "Jason.Compson.IV",
				"oauth_client_application_id": null,
				"role_grants": null,
				"status": "ACTIVE",
				"user_type": "human"
			},
			"type": "user"
		},
		"WvajuG7IeAjPYPdzN0zJTSmujqXLpYd90s4haNXLzRA=": {
			"object": {
				"deleted_at": null,
				"description": "Personal laptop",
				"encrypted": true,
				"hostname": "Absalom",
				"id": "65d9e9d0-b0e5-48d9-aea6-420b9da6d1a3",
				"os": "macOS 10.14.6",
				"state": "ACTIVE",
				"user_name": "Jason.Compson.IV"
			},
			"type": "client"
		}
	}
}
```


