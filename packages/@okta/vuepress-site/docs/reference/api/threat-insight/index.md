---
title: ThreatInsight
category: management
---

# ThreatInsight configuration API

[Okta ThreatInsight](https://help.okta.com/okta_help.htm?id=ext_threatinsight) maintains a constantly evolving list of IP addresses that consistently exhibit malicious activity. Authentication requests that are associated with an IP in this list can be logged to the [System Log](https://help.okta.com/okta_help.htm?id=ext_Reports_SysLog) and blocked. ThreatInsight also covers non-authentication requests in limited capacity depending on the attack patterns of these malicious IPs.

The Okta ThreatInsight Configuration API provides operations to manage your ThreatInsight configuration.

> **Note:** To prevent abuse, Okta ThreatInsight works in a limited capacity for free trial edition orgs. Please contact Okta support if fully functional Okta ThreatInsight is required.

## ThreatInsight configuration object

| Field Name  | Description	| Data Type   | Required      |
| :---------- | :----------	| :---------- | :------------ |
| action         | Specifies how Okta responds to authentication requests from suspicious IPs. Supported values:<br><ul><li>`none`: Indicates that ThreatInsight is disabled</li><li>`audit`: Indicates that Okta logs suspicious requests to the System Log</li><li>`block`:  Indicates that Okta logs suspicious requests to the System Log and blocks the requests</li></ul> | String (enums: `none`, `audit`, or `block`) | Yes |
| excludeZones   | Accepts a list of [Network Zone](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/NetworkZone/) IDs. IPs in the excluded network zones aren't logged or blocked. This ensures that traffic from known, trusted IPs isn't accidentally logged or blocked. | List | No |

## ThreatInsight configuration API operations

### Update ThreatInsight configuration

<ApiOperation method="post" url="/api/v1/threats/configuration" />

Update ThreatInsight configuration

#### Request example

```bash
curl -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "action": "audit",
    "excludeZones": ["nzo1q7jEOsoCnoKcj0g4"],
}' "https://${yourOktaDomain}/api/v1/threats/configuration"
```

#### Response example

```json
{
    "action": "audit",
    "excludeZones": ["nzo1q7jEOsoCnoKcj0g4"],
    "created": "2020-08-05T22:18:30.629Z",
    "lastUpdated": "2020-10-13T21:23:10.178Z",
    "_links": {
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/threats/configuration",
            "hints": {
                "allow": [
                    "GET",
                    "POST"
                ]
            }
        }
    }
}
```

### Get current ThreatInsight configuration

<ApiOperation method="get" url="/api/v1/threats/configuration" />

Get current ThreatInsight configuration

#### Request example

```bash
curl -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/threats/configuration"
```

#### Response example

```json
{
    "action": "audit",
    "excludeZones": [],
    "created": "2020-08-05T22:18:30.629Z",
    "lastUpdated": "2020-09-08T20:53:20.882Z",
    "_links": {
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/threats/configuration",
            "hints": {
                "allow": [
                    "GET",
                    "POST"
                ]
            }
        }
    }
}
```
