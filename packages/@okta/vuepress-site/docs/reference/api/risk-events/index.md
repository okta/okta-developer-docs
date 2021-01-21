---
title: RiskEvents
category: management
---

# Risk Events API

This API providers operations to send risk events to Okta.

## Risk Event object

This object contains a list of risk signals that are produced at a particular timestamp.

| Field Name     | Description                                                         	| Data Type                                     | Required      | Max Length    |
| :------------- | :------------------------------------------------------------------	| :-------------------------------------------- | :------------ | :------------ |
| timestamp             | Timestamp at which the the signal is produced (Should be in ISO 8601 format)  | String                                        | Yes		| N/A           |
| expiresAt             | Timestamp at which the signal expires (Should be in ISO 8601 format). If this optional field is not included, Okta automatically expires 24 hours after the timestamp. | String                                        | No		| N/A           |
| subjects         | List of [Risk Subjects](#risk-subject) | List                                        | Yes		| 50           |

### Risk Subject

This object contains the ip, risk level and the message associated with a single risk signal.

 Field Name     | Description                                                         	| Data Type                                     | Required      | Max Length    |
| :------------- | :------------------------------------------------------------------	| :-------------------------------------------- | :------------ | :------------ |
| ip             | The IP address  | String                                        | Yes		| N/A           |
| riskLevel             | The risk level associated with the IP. Possible values are `LOW`, `MEDIUM`, `HIGH` | String                                        | Yes		| N/A           |
| message         | Any additional message that the provider can send specifying the reason for the risk level of the IP.  | List                                        | No		| 512           |


## Risk Events API operations

### Send Risk Events

<ApiOperation method="post" url="/api/v1/risk/evnets/ip" />

This API provides the operation to send multiple risk events to Okta.

`Note: A maximum of 20 events can be sent in the API call. In each event, a maximum of 50 IPs can be sent.`


#### Request example

```bash
curl -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${access_token}" \
-d '{
    [
      {
       "timestamp": "2021-01-20T00:00:00.001Z",
       "subjects": [
          {
            "ip": "6.7.6.7",
            "riskLevel": "MEDIUM",
            "message": "none"
          },
          {
            "ip": "1.1.1.1",
            "riskLevel": "HIGH" ,
            "message": "Detected Attack tooling and suspicious activity"
          }
        ]
      },
      {
       "timestamp": "2021-01-20T01:00:00.001Z",
       "subjects": [
          {
            "ip": "6.7.6.7",
            "riskLevel": "LOW",
            "message": "none"
          },
          {
            "ip": "2.2.2.2",
            "riskLevel": "HIGH"
          }
        ]
      }
    ]
}' "https://${yourOktaDomain}/api/v1/risk/events/ip"
```

#### Response
The response for this API would be Http 202 if it is successful. If there are validation errors, the API would return a Http 400.
