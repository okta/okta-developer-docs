---
title: RiskProviders
category: management
---

# Risk Providers API

This API providers operations to manage the risk providers within Okta.

## Risk Provider object

| Field Name     | Description                                                         	| Data Type                                     | Required      | Max Length    |
| :------------- | :------------------------------------------------------------------	| :-------------------------------------------- | :------------ | :------------ |
| id             | Id of the risk provider | String                                        | Yes		| Assigned           |
| name           | Name of the risk provider. This should be unique. | String                                        | Yes		| 50           |
| action         | Specifies how Okta responds to authentication requests from end users that are associated with the signals sent by the provider. Values are none, log, or enfoce_and_log. A value of none indicates that no action is taken. A value of log indicates that Okta logs the risk signal information in the System Log. A value of enfoce_and_log indicates that Okta logs the risk signal information and also uses that to determine the overall risk of the login attempt . | String                                        | Yes		| N/A           |
| clientId       | The id of the [OAuth service app](https://developer.okta.com/docs/guides/implement-oauth-for-okta-serviceapp/create-serviceapp-grantscopes/) that would be used to send risk signals to Okta    | String	                                        | Yes		| N/A           |


## Risk Providers API operations

### Create a Risk Provider

<ApiOperation method="post" url="/api/v1/risk/providers" />

Create a new Risk Provider.

`Note: A maximum of 3 providers can be created.`

#### Request example

```bash
curl -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "name": "Risk-Partner-X"
    "action": "log",
    "clientId": "00ckjsfgjkdkjdkkljjsd"
}' "https://${yourOktaDomain}/api/v1/risk/providers"
```

#### Response example

```json
{
    "id": "00rp12r4skkjkjgsn",
    "action": "log",
    "name": "Risk-Partner-X",
    "clientId": "00ckjsfgjkdkjdkkljjsd",
    "created": "2021-01-05 22:18:30",
    "lastUpdated": "2021-01-05 21:23:10",
    "_links": {
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/risk/providers/00rp12r4skkjkjgsn",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        }
    }
}
```

### Update a Risk Provider

<ApiOperation method="put" url="/api/v1/risk/providers/${providerId}" />

Update a Risk Provider associated with the `providerId`

#### Request example

```bash
curl -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "name": "Risk-Partner-Y"
    "action": "enforce_and_log",
    "clientId": "00ckjsfgjkdkjdkkljjsd"
}' "https://${yourOktaDomain}/api/v1/risk/providers/00rp12r4skkjkjgsn"
```

#### Response example

```json
{
    "id": "00rp12r4skkjkjgsn",
    "action": "enforce_and_log",
    "name": "Risk-Partner-Y",
    "clientId": "00ckjsfgjkdkjdkkljjsd",
    "created": "2021-01-05 22:18:30",
    "lastUpdated": "2021-01-05 23:18:30",
    "_links": {
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/risk/providers/00rp12r4skkjkjgsn",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        }
    }
}
```

### List all Risk Providers

<ApiOperation method="get" url="/api/v1/risk/providers" />

List all the risk providers

#### Request example

```bash
curl -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/risk/providers"
```

#### Response example
```json
[
  {
      "id": "00rp12r4skkjkjgsn",
      "action": "enforce_and_log",
      "name": "Risk-Partner-Y",
      "clientId": "00ckjsfgjkdkjdkkljjsd",
      "created": "2021-01-05 22:18:30",
      "lastUpdated": "2021-01-05 23:18:30",
      "_links": {
          "self": {
              "href": "https://{yourOktaDomain}/api/v1/risk/providers/00rp12r4skkjkjgsn",
              "hints": {
                  "allow": [
                      "GET",
                      "PUT"
                  ]
              }
          }
      }
  },
  {
      "id": "00rp23r4skkjkjgsn",
      "action": "log",
      "name": "Risk-Partner-X",
      "clientId": "00cjkjjkkgjkdkjdkkljjsd",
      "created": "2021-01-04 22:18:30",
      "lastUpdated": "2021-01-04 23:18:30",
      "_links": {
          "self": {
              "href": "https://{yourOktaDomain}/api/v1/risk/providers/00rp23r4skkjkjgsn",
              "hints": {
                  "allow": [
                      "GET",
                      "PUT"
                  ]
              }
          }
      }
  }
]
```

### Get a Risk Provider

<ApiOperation method="get" url="/api/v1/risk/providers/${providerId}" />

Get a risk provider associated with the `providerId`

#### Request example

```bash
curl -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/risk/providers/00rp23r4skkjkjgsn"
```

#### Response example
```json
{
      "id": "00rp23r4skkjkjgsn",
      "action": "log",
      "name": "Risk-Partner-X",
      "clientId": "00cjkjjkkgjkdkjdkkljjsd",
      "created": "2021-01-04 22:18:30",
      "lastUpdated": "2021-01-04 23:18:30",
      "_links": {
          "self": {
              "href": "https://{yourOktaDomain}/api/v1/risk/providers/00rp23r4skkjkjgsn",
              "hints": {
                  "allow": [
                      "GET",
                      "PUT"
                  ]
              }
          }
      }
}
```
