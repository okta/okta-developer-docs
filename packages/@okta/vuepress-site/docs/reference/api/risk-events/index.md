---
title: Risk Events
category: management
---

# Risk Events API

The Okta RiskEvents API provides the ability for RiskProviders to send RiskEvents to Okta.

## Get Started
Explore the Risk Events API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1c449b51a4a0adf90198)

## Risk Events Operations
The Risk Events API has the following operations:

* [Send Risk Events](#send-riskevents)


### Send Risk Events

<ApiOperation method="post" url="/api/v1/risk/events/ip" />

A Risk Provider can send Risk Events to Okta using this API.

#### Request body

The request body should include an array of [Risk Events](#riskevent-object). A maximum of 20 events can be included in a request. Each Risk Event can include the following properties:

| Property    | Type           | Description   |
| ----------- | -------------- | ------------- |
| `timestamp` | String | Time stamp at which the the event is produced (Expressed as a UTC time zone using ISO 8601 format: yyyy-MM-dd'T'HH:mm:ss.SSS'Z'). This is a required field. |
| `expiresAt` | String | Time stamp at which the event expires (Expressed as a UTC time zone using ISO 8601 format: yyyy-MM-dd'T'HH:mm:ss.SSS'Z'). If this optional field is not included, Okta automatically expires the event 24 hours after the `timestamp`. |
| `subjects` | List | List of [Risk Subjects](#risksubject-object). A max of 50 subjects can be included in an event |

#### Response body

Http 202 (Accepted) is returned if the request is successful. If there are validation errors, the API returns a 400.

#### Request example

This request sends Risk Events to Okta

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
            "riskLevel": "MEDIUM"
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
            "riskLevel": "LOW"
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

#### Response example
```http
HTTP/1.1 202 Accepted
```

## Risk Events objects

### Risk Event object

The RiskEvent object has the following properties:


| Property    | Type           | Description   |
| ----------- | -------------- | ------------- |
| `timestamp` | String | Time stamp at which the event is produced (Expressed as a UTC time zone using ISO 8601 format: yyyy-MM-dd'T'HH:mm:ss.SSS'Z'). This is a required field. |
| `expiresAt` | String | Time stamp at which the event expires (Expressed as a UTC time zone using ISO 8601 format: yyyy-MM-dd'T'HH:mm:ss.SSS'Z'). If this optional field is not included, Okta automatically expires the event 24 hours after the `timestamp`. |
| `subjects` | List | List of [Risk Subjects](#risksubject-object) |

#### Risk Event example

```json
{
       "timestamp": "2021-01-20T00:00:00.001Z",
       "subjects": [
          {
            "ip": "6.7.6.7",
            "riskLevel": "MEDIUM"
          },
          {
            "ip": "1.1.1.1",
            "riskLevel": "HIGH" ,
            "message": "Detected Attack tooling and suspicious activity"
          }
        ]
}
```

### Risk Subject object

The Risk Subject object has the following properties:

| Property    | Type           | Description   |
| ----------- | -------------- | ------------- |
| `ip` | String | The IP address. This is a required field. |
| `riskLevel` | String | The risk level associated with the IP. The values can be `LOW`, `MEDIUM`, or `HIGH`. This is a required field. |
| `message` | String | Any additional message that the provider can send specifying the reason for the risk level of the IP. This is an optional field with a maximum of 512 characters. |


#### RiskEvent example

```json
{
    "ip": "6.7.6.7",
    "riskLevel": "MEDIUM",
    "message": "none"
}
```
