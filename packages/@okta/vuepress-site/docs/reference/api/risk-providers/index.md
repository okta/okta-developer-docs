---
title: RiskProviders
category: management
---

# RiskProviders API

The Okta RiskProviders API provides the ability to manage the risk providers within Okta.

## Get Started
Explore the RiskProviders API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/6831b9d37e12fe1f3401)

## Risk Providers API Operations
The RiskProviders API has the following CRUD operations:

* [Create RiskProvider](#create-riskprovider)
* [Get a RiskProvider by id](#get-a-riskprovider)
* [Update RiskProvider](#update-riskprovider)
* [Get all RiskProviders](#list-all-riskproviders)


### Create RiskProvider

<ApiOperation method="post" url="/api/v1/risk/providers" />

Creates a RiskProvider object.
`A maximum of 3 providers can be created.`
`By Default, one risk provider is created by Okta`.

#### Request body


| Property    | Type           | Description   |
| ----------- | -------------- | ------------- |
| `action` | String | The action taken by Okta during authentication attempts based on the risk events sent by this provider. Possible Values: `none` (No Action), `log_only` (Include the risk event information in SystemLog only), `enforce_and_log` (Include the risk event information in SystemLog and also use that information while evaluating risk during authentication attempts). The default action is `log_only`. |
| `name` | String | Name of the risk provider. Should be less than `50` characters and should be unique. This is a required field. |
| `clientId` | String | The id of the [OAuth service app](https://developer.okta.com/docs/guides/implement-oauth-for-okta-serviceapp/create-serviceapp-grantscopes/) that would be used to send risk events to Okta. This is a required field. |

#### Response body

Returns the created [RiskProvider](#riskprovider-object).

#### Usage example

This request creates a RiskProvider object:

##### Request

```bash
curl -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "name": "Risk-Partner-X"
    "action": "log_only",
    "clientId": "00ckjsfgjkdkjdkkljjsd"
}' "https://${yourOktaDomain}/api/v1/risk/providers"
```

##### Response

```json
{
    "id": "00rp12r4skkjkjgsn",
    "action": "log_only",
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

### Update RiskProvider

<ApiOperation method="put" url="/api/v1/risk/providers/{providerId}" />

Updates a RiskProvider.


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `providerId`  | String | The ID of the provider to update|


#### Request body

| Property    | Type           | Description   |
| ----------- | -------------- | ------------- |
| `action` | String | The action taken by Okta during authentication attempts based on the risk events sent by this provider. Possible Values: `none` (No Action), `log_only` (Include the risk event information in SystemLog only), `enforce_and_log` (Include the risk event information in SystemLog and also use that information while evaluating risk during authentication attempts). The default action is `log_only`. |
| `name` | String | Name of the risk provider. Should be less than `50` characters and should be unique. This is a required field. |
| `clientId` | String | The id of the [OAuth service app](https://developer.okta.com/docs/guides/implement-oauth-for-okta-serviceapp/create-serviceapp-grantscopes/) that would be used to send risk events to Okta. This is a required field. |


#### Response body

Returns the updated [RiskProvider](#riskprovider-object).

#### Usage example

##### Request

This request would update a risk provider

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

##### Response

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

### Get a RiskProvider by id

<ApiOperation method="get" url="/api/v1/risk/providers/{providerId}" />

Fetches a RiskProvider by its `id`.


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `providerId`  | String | The ID of the provider to update|

#### Response body

Returns the requested [RiskProvider](#riskprovider-object).

#### Usage example

This request fetches a risk provider object based on the id:

##### Request

```bash
curl -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/risk/providers/00rp23r4skkjkjgsn"
```

##### Response

```json
{
      "id": "00rp23r4skkjkjgsn",
      "action": "log_only",
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


### List all RiskProviders

<ApiOperation method="get" url="/api/v1/risk/providers" />

List all the risk providers

#### Response body

Returns a list of [RiskProvider](#riskprovider-object).

#### Usage example

This request fetches all risk providers.

##### Request

```bash
curl -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/risk/providers"
```

##### Response

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
      "action": "log_only",
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

## RiskProvider API objects

### RiskProvider object

#### RiskProvider properties

The RiskProvider object has several properties:


| Property    | Type           | Description   |
| ----------- | -------------- | ------------- |
| `id` | String | ID of the risk provider. This is an assigned field. |
| `action` | String | The action taken by Okta during authentication attempts based on the risk events sent by this provider. Possible Values: `none` (No Action), `log_only` (Include the risk event information in SystemLog only), `enforce_and_log` (Include the risk event information in SystemLog and also use that information while evaluating risk during authentication attempts). The default action is `log_only`. |
| `name` | String | Name of the risk provider. Should be less than `50` characters and should be unique. This is a required field. |
| `clientId` | String | The id of the [OAuth service app](https://developer.okta.com/docs/guides/implement-oauth-for-okta-serviceapp/create-serviceapp-grantscopes/) that would be used to send risk events to Okta. This is a required field. |


#### RiskProvider example
```
```json
{
    "id": "00rpdfgkljdlkklhktlrh",
    "name": "A-Provider-Name",
    "action": "log",
    "clientId": "A-Valid-Client-ID"
  }
```


