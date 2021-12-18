---
title: ThreatInsight
category: management
---

# ThreatInsight configuration API

[Okta ThreatInsight](https://help.okta.com/okta_help.htm?id=ext_threatinsight) maintains a constantly evolving list of IPs that exhibit suspicious behaviors suggestive of malicious activity. Authentication requests associated with an IP in this list can be logged in [System Log](https://help.okta.com/okta_help.htm?id=ext_Reports_SysLog) and blocked. The Okta ThreatInsight Configuration API provides operations to manage your ThreatInsight configuration.

In order to prevent abuse, Okta ThreatInsight works in a limited capacity for free trial editions. Please contact Okta support if fully functional Okta ThreatInsight is required.

## ThreatInsight configuration object

| Field Name     | Description                                                         	| Data Type                                     | Required      | Max Length    |
| :------------- | :------------------------------------------------------------------	| :-------------------------------------------- | :------------ | :------------ |
| action         | Specifies how Okta responds to authentication requests from suspicious IPs. Values are none, audit, or block. A value of none indicates that ThreatInsight is disabled. A value of audit indicates that Okta logs suspicious requests in the System Log. A value of block indicates that Okta logs suspicious requests in the System Log and blocks the requests. | String                                        | Yes		| N/A           |
| excludeZones   | Accepts a list of [Network Zone](/docs/reference/api/zones/) IDs. IPs in the excluded Network Zones aren't logged or blocked by Okta ThreatInsight and proceed to Sign On rules evaluation. This ensures that traffic from known, trusted IPs isn't accidentally logged or blocked. | List	                                        | No		| N/A           |


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
            "href": "https://${yourOktaDomain}/api/v1/threats/configuration",
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
            "href": "https://${yourOktaDomain}/api/v1/threats/configuration",
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
