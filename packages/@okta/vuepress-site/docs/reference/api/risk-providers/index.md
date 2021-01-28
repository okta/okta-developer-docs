---
title: Risk Providers
category: management
---

# Risk Providers API

<ApiLifecycle access="beta" />

The Okta Risk Providers API provides the ability to manage the Risk Providers within Okta.

## Get Started
Explore the Risk Providers API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/6831b9d37e12fe1f3401)

## Risk Providers Operations
The Risk Providers API has the following CRUD operations:

* [Create Risk Provider](#create-risk-provider)
* [Get a Risk Provider by ID](#get-a-risk-provider)
* [Update Risk Provider](#update-risk-provider)
* [Get all Risk Providers](#list-all-risk-providers)


### Create Risk Provider

<ApiOperation method="post" url="/api/v1/risk/providers" />

Creates a Risk Provider object.
A maximum of 3 providers can be created. By default, one risk provider is created by Okta.


#### Request body

| Property    | Type           | Description   |
| ----------- | -------------- | ------------- |
| `action` | String | Possible values: `none` (no action), `log_only` (include the risk event information in SystemLog only), `enforce_and_log` (include the risk event information in SystemLog and also use that information while evaluating risk during authentication attempts). The default action is `log_only`. |
| `name` | String | Name of the risk provider. Must be less than `50` characters and unique. This is a required field. |
| `clientId` | String | The ID of the [OAuth service app](https://developer.okta.com/docs/guides/implement-oauth-for-okta-serviceapp/create-serviceapp-grantscopes/) that is used to send risk events to Okta. This is a required field.  |

#### Response body

Returns the created [RiskProvider](#risk-provider-object).

#### Request example

This request creates a Risk Provider object:

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

#### Response example

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

### Update Risk Provider

<ApiOperation method="put" url="/api/v1/risk/providers/${providerId}" />

Updates a Risk Provider.


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `providerId`  | String | The ID of the provider to update|


#### Request body

| Property    | Type           | Description   |
| ----------- | -------------- | ------------- |
| `action` | String | Possible values: `none` (no action), `log_only` (include the risk event information in SystemLog only), `enforce_and_log` (include the risk event information in SystemLog and also use that information while evaluating risk during authentication attempts). The default action is `log_only`. |
| `name` | String | Name of the risk provider. Must be less than `50` characters and unique. This is a required field. |
| `clientId` | String | The ID of the [OAuth service app](https://developer.okta.com/docs/guides/implement-oauth-for-okta-serviceapp/create-serviceapp-grantscopes/) that is used to send risk events to Okta. This is a required field.  |


#### Response body

Returns the updated [Risk Provider](#risk-provider-object).

#### Request example

This request updates a risk provider

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

### Get a Risk Provider by ID

<ApiOperation method="get" url="/api/v1/risk/providers/${providerId}" />

Fetches a Risk Provider by its `id`.


#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `providerId`  | String | The ID of the provider to return |

#### Response body

Returns the requested [Risk Provider](#risk-provider-object).

#### Request example

This request fetches a risk provider object based on the id:

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


### List all Risk Providers

<ApiOperation method="get" url="/api/v1/risk/providers" />

Lists all the risk providers

#### Response body

Returns a list of [Risk Providers](#risk-provider-object).

#### Request example

This request fetches all risk providers.

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
              "href": "https://${yourOktaDomain}/api/v1/risk/providers/00rp12r4skkjkjgsn",
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
              "href": "https://${yourOktaDomain}/api/v1/risk/providers/00rp23r4skkjkjgsn",
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

## Risk Provider objects

### Risk Provider object

#### Risk Provider properties

The Risk Provider object has the following properties:


| Property    | Type           | Description   |
| ----------- | -------------- | ------------- |
| `id` | String | ID of the risk provider. This is an assigned field. |
| `action` | String | The action taken by Okta during authentication attempts based on the risk events sent by this provider. Possible values: `none` (no action), `log_only` (include the risk event information in SystemLog only), `enforce_and_log` (include the risk event information in SystemLog and also use that information while evaluating risk during authentication attempts). The default action is `log_only`. |
| `name` | String | Name of the risk provider. Must be less than `50` characters and unique. This is a required field. |
| `clientId` | String | The ID of the [OAuth service app](https://developer.okta.com/docs/guides/implement-oauth-for-okta-serviceapp/create-serviceapp-grantscopes/) that is used to send risk events to Okta. This is a required field. |


#### Risk Provider example
```
```json
{
    "id": "00rpdfgkljdlkklhktlrh",
    "name": "A-Provider-Name",
    "action": "log",
    "clientId": "A-Valid-Client-ID"
  }
```
