---
title: RiskEvents
category: management
---

# RiskEvents API

The Okta RiskEvents API provides the ability for RiskProviders to send RiskEvents to Okta.

## Get Started
Explore the RiskEvents API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1c449b51a4a0adf90198)

## RiskEvents API Operations
The RiskEvents API has the following operations:

* [Send RiskEvents](#send-riskevents)


### Send RiskEvents

<ApiOperation method="post" url="/api/v1/risk/events/ip" />

A RiskProvider can send RiskEvents to Okta using this API.

#### Request body

The request body should include an array of [RiskEvent](#riskevent-object). A max of 20 events can be included in a request. Each RiskEvent can include these:

| Property    | Type           | Description   |
| ----------- | -------------- | ------------- |
| `timestamp` | String | Timestamp at which the the event is produced (Should be in ISO 8601 format). This is a required field. |
| `expiresAt` | String | Timestamp at which the event expires (Should be in ISO 8601 format). If this optional field is not included, Okta automatically expires the event 24 hours after the `timestamp`. |
| `subjects` | List | List of [Risk Subjects](#risksubject-object). A max of 50 subjects can be included in an event |

#### Response body

Http 202 (Accepted) is returned if the request is successful. If there are validation errors, the API would return a 400.

#### Usage example

This request sends RiskEvents to Okta

##### Request

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

##### Response
```http
HTTP/1.1 202 Accepted
```

## RiskEvents API objects

### RiskEvent object

#### RiskEvent properties

The RiskEvent object has several properties:


| Property    | Type           | Description   |
| ----------- | -------------- | ------------- |
| `timestamp` | String | Timestamp at which the the event is produced (Should be in ISO 8601 format). This is a required field. |
| `expiresAt` | String | Timestamp at which the event expires (Should be in ISO 8601 format). If this optional field is not included, Okta automatically expires the event 24 hours after the `timestamp`. |
| `subjects` | List | List of [Risk Subjects](#risksubject-object) |

#### RiskEvent example

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

### RiskSubject object

#### RiskSubject properties

The RiskSubject object has several properties:

| Property    | Type           | Description   |
| ----------- | -------------- | ------------- |
| `ip` | String | The IP address. This is a required field. |
| `riskLevel` | String | The risk level associated with the IP. Possible values are `LOW`, `MEDIUM`, `HIGH`. This is a required field. |
| `message` | String | Any additional message that the provider can send specifying the reason for the risk level of the IP. This is an optional field and can be of max 512 characters. |


#### RiskEvent example

```json
{
    "ip": "6.7.6.7",
    "riskLevel": "MEDIUM",
    "message": "none"
}
```
