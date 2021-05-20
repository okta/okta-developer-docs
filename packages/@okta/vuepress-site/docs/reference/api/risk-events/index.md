---
title: Risk Events
category: beta
---

# Risk Events API

<ApiLifecycle access="beta" />

The Okta Risk Events API provides the ability for third-party Risk Providers to send Risk Events to Okta.

## Get Started
Explore the Risk Events API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1c449b51a4a0adf90198)

## Risk Events Operations
The Risk Events API has the following operations:

* [Send Risk Events](#send-risk-events)


### Send Risk Events

<ApiOperation method="post" url="/api/v1/risk/events/ip" />

A Risk Provider can send Risk Events to Okta using this API.
This API has a rate limit of 30 requests per minute. The caller should include multiple Risk Events in a single payload to reduce
the number of API calls. If a client has more risk signals to send than what the API supports, we recommend prioritizing posting high risk signals.

#### Request body

The request body should include an array of [Risk Events](#risk-event-object). A maximum of 20 events can be included in a request. Each Risk Event can include the following properties:

| Property    | Type           | Description   |
| ----------- | -------------- | ------------- |
| `timestamp` | String | Time stamp at which the the event is produced (Expressed as a UTC time zone using ISO 8601 format: yyyy-MM-dd'T'HH:mm:ss.SSS'Z'). This is an optional field. |
| `expiresAt` | String | Time stamp at which the event expires (Expressed as a UTC time zone using ISO 8601 format: yyyy-MM-dd'T'HH:mm:ss.SSS'Z'). If this optional field is not included, Okta automatically expires the event 24 hours after the event is consumed. |
| `subjects` | List | List of [Risk Subjects](#risk-subject-object). A max of 50 subjects can be included in an event |

#### Response body

Http 202 (Accepted) is returned if the request is successful. If there are validation errors, the API returns a 400.

#### Request example

This request sends Risk Events to Okta

```bash
curl -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${access_token}" \
-d '[
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
]' "https://${yourOktaDomain}/api/v1/risk/events/ip"
```

#### Response example
```http
HTTP/1.1 202 Accepted
```

## Risk Events objects

### Risk Event object

The Risk Event object has the following properties:


| Property    | Type           | Description   |
| ----------- | -------------- | ------------- |
| `timestamp` | String | Time stamp at which the event is produced (Expressed as a UTC time zone using ISO 8601 format: yyyy-MM-dd'T'HH:mm:ss.SSS'Z'). This is an optional field. |
| `expiresAt` | String | Time stamp at which the event expires (Expressed as a UTC time zone using ISO 8601 format: yyyy-MM-dd'T'HH:mm:ss.SSS'Z'). If this optional field is not included, Okta automatically expires the event 24 hours after the event is consumed. |
| `subjects` | List | List of [Risk Subjects](#risk-subject-object) |

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
| `ip` | String | The IP address. This is a required field and should either be an IpV6 or IpV4 address.|
| `riskLevel` | String | The risk level associated with the IP. The values can be `LOW`, `MEDIUM`, or `HIGH`. This is a required field. |
| `message` | String | Any additional message that the provider can send specifying the reason for the risk level of the IP. This is an optional field with a maximum of 512 characters. The allowed characters are alphabets, numbers, `.`, `_`, `-`|


#### Risk Event example

```json
{
    "ip": "6.7.6.7",
    "riskLevel": "MEDIUM",
    "message": "none"
}
```
