---
title: Features
category: management
---

# Features API

The Okta Features API provides operations to manage self-service Early Access (EA) and Beta Features in your org.

> Note: Important background information for this API is available on this page: [Feature Lifecycle Management](/docs/concepts/feature-lifecycle-management/).

## Getting Started

Explore the Features API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/ab22761da96ff7a7ab0c)

## Feature Operations

Feature objects have the following operations:

* [Get a Feature](#get-a-feature)
* [List Features](#list-features)
* [Update Feature](#update-feature)
* [Get Dependencies](#get-dependencies)
* [Get Dependents](#get-dependents)

### Get a Feature

<ApiOperation method="get" url="/api/v1/features/${featureId}" /> <SupportsCors />

Fetches a Feature by its `id`. If you don't know the Feature `id`, you can [list Features](#list-features).

#### Request Path Parameters

| Parameter   | Type   | Description                      |
| ----------- | ------ | -------------------------------- |
| `featureId` | String | The Feature's unique identifier. |


#### Request Query Parameters

None

#### Response Body

The requested [Feature](#feature-model).

#### Usage Example

This request fetchs a Feature object with an `id` value `ftrYooGoH8b41iCZiPk7`:

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/features/ftrYooGoH8b41iCZiPk7"
```

##### Response

```json
{
  "id": "ftrYooGoH8b41iCZiPk7",
  "type": "self-service",
  "status": "DISABLED",
  "name": "Collect product feedback from end users",
  "description": "We will ask your users for their Net Promoter Score using Okta via an in-app prompt when they visit their Dashboard. Any information collected will not constitute customer data.",
  "stage": {
    "value": "EA"
  },
  "_links": {
    "enable": {
      "href": "https://{yourOktaDomain}/api/v1/features/ftrYooGoH8b41iCZiPk7/enable",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/features/ftrYooGoH8b41iCZiPk7"
    },
    "dependents": {
      "href": "https://{yourOktaDomain}/api/v1/features/ftrYooGoH8b41iCZiPk7/dependents"
    },
    "dependencies": {
      "href": "https://{yourOktaDomain}/api/v1/features/ftrYooGoH8b41iCZiPk7/dependencies"
    }
  }
}
```
##### Error Response

An invalid `id` returns a `404 Not Found` status code.

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
    "errorCode": "E0000007",
    "errorSummary": "Not found: Resource not found: invalidFeatureId (Feature)",
    "errorLink": "E0000007",
    "errorId": "oaenAlD87mGTuWeGi7AjmhIBA",
    "errorCauses": []
}
```

### List Features

<ApiOperation method="get" url="/api/v1/features" />

Returns a list of all available self-service Features for your org.

#### Request Parameters

None

#### Response Body

Array of [Feature](#feature-model) objects.

#### Usage Example

The following request would return a list of all available self-service Features:

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/features"
```

##### Response

```json
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
     "id":"ftrYooGoH8b41iCZiPk7",
     "type":"self-service",
     "status":"DISABLED",
     "name":"Collect product feedback from end users",
     "description":"We will ask your users for their Net Promoter Score using Okta via an in-app prompt when they visit their Dashboard. Any information collected will not constitute customer data.",
     "stage":{
        "value":"EA"
     },
     "_links":{
        "enable":{
           "href":"https://{yourOktaDomain}/api/v1/features/ftrYooGoH8b41iCZiPk7/enable",
           "hints":{
              "allow":[
                 "POST"
              ]
           }
        },
        "self":{
           "href":"https://{yourOktaDomain}/api/v1/features/ftrYooGoH8b41iCZiPk7"
        },
        "dependents":{
           "href":"https://{yourOktaDomain}/api/v1/features/ftrYooGoH8b41iCZiPk7/dependents"
        },
        "dependencies":{
           "href":"https://{yourOktaDomain}/api/v1/features/ftrYooGoH8b41iCZiPk7/dependencies"
        }
     }
  },
  {
     "id":"ftrcDO2RUt1sjZWSIok3",
     "type":"self-service",
     "status":"ENABLED",
     "name":"Event Hooks user interface in the Admin Console",
     "description":"Allows an admin to configure and manage Event Hooks using the Admin Console in addition to the existing Event Hooks API",
     "stage":{
        "value":"BETA",
        "state":"OPEN"
     },
     "_links":{
        "helpDoc":{
           "href":"https://https://help.okta.com/en/prod/Content/index.htm"
        },
        "self":{
           "href":"https://{yourOktaDomain}/api/v1/features/ftrcDO2RUt1sjZWSIok3"
        },
        "survey":{
           "href":"https://goo.gl/forms/aRelevantSurvey"
        },
        "dependents":{
           "href":"https://{yourOktaDomain}/api/v1/features/ftrcDO2RUt1sjZWSIok3/dependents"
        },
        "dependencies":{
           "href":"https://{yourOktaDomain}/api/v1/features/ftrcDO2RUt1sjZWSIok3/dependencies"
        }
     }
  }
]
```

### Update Feature

<ApiOperation method="post" url="/api/v1/features/${featureId}/${lifecycle}" />

Updates a Feature's lifecycle. Use this endpoint to enable or disable a Feature for your org.



#### Request Path Parameters

| Parameter   | Type   | Description                                                           |
| ----------- | ------ | --------------------------------------------------------------------- |
| `featureId` | String | Unique identifier of the Feature to update.                           |
| `lifecycle` | String | Enables or disables the Feature. Possible values: `enable`, `disable` |


#### Request Query Parameters

| Parameter | Type   | Description                                                                      |
| --------- | ------ | -------------------------------------------------------------------------------- |
| `mode`    | String | Indicates if you want to force enable/disable a feature. Possible value: `force` |

Force mode is used to override dependency restrictions for a particular Feature. Normally, you cannot enable a Feature if it has one or more dependencies that are not enabled.

If you use the `mode=force` parameter while enabling a Feature, then Okta will first try enabling any disabled Features that this Feature may have as dependencies. If you do not pass the `mode=force` parameter and the Feature has dependencies that need to be enabled before the Feature is enabled, a `400` error is returned.

If you use the `mode=force` parameter while disabling a Feature, then Okta will first try disabling any enabled Features that this Feature may have as dependents. If you do not pass the `mode=force` parameter and the Feature has dependencies that need to be disabled before the Feature is disabled, a `400` error is returned.

#### Request Body

None

#### Response Body

Updated [Feature](#feature-model)

#### Example Usage

The following request would enable the Feature with an `id` value `ftrYooGoH8b41iCZiPk7`.

##### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
}' "https://{yourOktaDomain}/api/v1/features/ftrYooGoH8b41iCZiPk7/enable"
```

##### Response

```json
{
  "id": "ftrYooGoH8b41iCZiPk7",
  "type": "self-service",
  "status": "ENABLED",
  "name": "Collect product feedback from end users",
  "description": "We will ask your users for their Net Promoter Score using Okta via an in-app prompt when they visit their Dashboard. Any information collected will not constitute customer data.",
  "stage": {
    "value": "EA"
  },
  "_links": {
    "disable": {
      "href": "https://{yourOktaDomain}/api/v1/features/ftrYooGoH8b41iCZiPk7/disable",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/features/ftrYooGoH8b41iCZiPk7"
    },
    "dependents": {
      "href": "https://{yourOktaDomain}/api/v1/features/ftrYooGoH8b41iCZiPk7/dependents"
    },
    "dependencies": {
      "href": "https://{yourOktaDomain}/api/v1/features/ftrYooGoH8b41iCZiPk7/dependencies"
    }
  }
}
```

##### Error Response (Invalid featureId)

An invalid `featureId` returns a `404 Not Found` status code.

```json
HTTP/1.1 404 Not Found
Content-Type: application/json

{
    "errorCode": "E0000007",
    "errorSummary": "Not found: Resource not found: invalidFeatureId (Feature)",
    "errorLink": "E0000007",
    "errorId": "oaenAlD87mGTuWeGi7AjmhIBA",
    "errorCauses": []
}
```
##### Error Response (Method not allowed)

The following will return a `405 Method Not Allowed` status code:

* An invalid `lifecycle` value
* Update request of a `BETA` Feature in a non-preview cell
* If the Feature requires support to be updated

```json
HTTP/1.1 405 Method Not Allowed
Content-Type: application/json

{
    "errorCode": "E0000022",
    "errorSummary": "The endpoint does not support the provided HTTP method",
    "errorLink": "E0000022",
    "errorId": "oaerzuJCOHVQ8-E2XpkEKfeOQ",
    "errorCauses": []
 }
```

##### Error Response (Already disabled/enabled)

Sending a disable/enable request for a Feature that already has that status will return a `405 Method Not Allowed` status code:

```json
HTTP/1.1 405 Method Not Allowed
Content-Type: application/json

{
    "errorCode": "E0000022",
    "errorSummary": "The endpoint does not support the provided HTTP method",
    "errorLink": "E0000022",
    "errorId": "oaerzuJCOHVQ8-E2XpkEKfeOQ",
    "errorCauses": []
 }
```

##### Error Response (Feature in closed Beta)

Sending an enable request for a Feature with a `stage` value of `BETA CLOSED` in a Preview cell will return a `405 Method Not Allowed` status code:

```json
HTTP/1.1 405 Method Not Allowed
Content-Type: application/json

{
    "errorCode": "E0000022",
    "errorSummary": "The endpoint does not support the provided HTTP method",
    "errorLink": "E0000022",
    "errorId": "oaerzuJCOHVQ8-E2XpkEKfeOQ",
    "errorCauses": []
 }
```

##### Error Response (Dependency/Dependents Conflict)

If the `mode` is not `forced` and the disable/enable requires other self-service features to be enabled/disabled. `400 Bad Request` is returned.

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "errorCode": "E0000141",
  "errorSummary": "Feature cannot be enabled or disabled due to dependencies/dependents conflicts.",
  "errorLink": "E0000141",
  "errorId": "oaeVqM9_L88QR23ksB9MdldXQ",
  "errorCauses": [
    {
      "errorSummary": "Self-Service feature Event Hooks is not enabled",
      "reason": "DEPENDENCY_NOT_ENABLED",
      "location": "https://{yourOktaDomain}/api/v1/features/ftrlBPVcGwYP2epHSMYn",
      "locationType": "url"
    }
  ]
}
```

### Get Dependencies

<ApiOperation method="get" url="/api/v1/features/${featureId}/dependencies" />

Get the list of Feature dependencies for a specified Feature. A Feature's dependencies are the Features which it requires to be enabled in order to itself be enabled.

#### Request Path Parameters

| Parameter   | Type   | Description                                                           |
| ----------- | ------ | --------------------------------------------------------------------- |
| `featureId` | String | Unique identifier of the Feature to update.                           |

#### Request Query Parameters

None

#### Response Body

Array of [Feature](#feature-model) objects.

#### Example Usage

The following request would return the Feature dependencies for a Feature with an `id` value of `ftrcDO2RUt1sjZWSIok3`.

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
}' "https://{yourOktaDomain}/api/v1/features/ftrcDO2RUt1sjZWSIok3/dependencies"
```

##### Response

```json
[
  {
    "id": "ftrlBPVcGwYP2epHSMYn",
    "type": "self-service",
    "status": "ENABLED",
    "name": "Event Hooks",
    "description": "Event hooks are outbound HTTP REST calls from Okta, sent when specified events occur in your org. These calls from Okta are meant to be used as triggers for process flows within your own software systems.",
    "stage": {
      "value": "EA"
    },
    "_links": {
      "helpDoc": {
        "href": "https://developer.okta.com/docs/concepts/event-hooks/"
      },
      "disable": {
        "href": "https://{yourOktaDomain}/api/v1/features/ftrlBPVcGwYP2epHSMYn/disable",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "self": {
        "href": "https://{yourOktaDomain}/api/v1/features/ftrlBPVcGwYP2epHSMYn"
      },
      "dependents": {
        "href": "https://{yourOktaDomain}/api/v1/features/ftrlBPVcGwYP2epHSMYn/dependents"
      },
      "dependencies": {
        "href": "https://{yourOktaDomain}/api/v1/features/ftrlBPVcGwYP2epHSMYn/dependencies"
      }
    }
  }
]
```

##### Error Response (Invalid featureId)

An invalid `featureId` returns a `404 Not Found` status code.

```json
HTTP/1.1 404 Not Found
Content-Type: application/json

{
    "errorCode": "E0000007",
    "errorSummary": "Not found: Resource not found: invalidFeatureId (Feature)",
    "errorLink": "E0000007",
    "errorId": "oaenAlD87mGTuWeGi7AjmhIBA",
    "errorCauses": []
}
```

### Get Dependents

<ApiOperation method="get" url="/api/v1/features/${featureId}/dependents" />

Get the list of Feature dependents for a specified Feature. A Feature's dependents are the Features which need to be disabled in order for the Feature itself to be disabled.

#### Request Path Parameters

| Parameter   | Type   | Description                                                           |
| ----------- | ------ | --------------------------------------------------------------------- |
| `featureId` | String | Unique identifier of the Feature to update.                           |

#### Request Query Parameters

None

##### Response Parameters

Array of [Feature](#feature-model) objects.

#### Usage Example

The following request would retrieve the dependent Features for a Feature with an `id` value `ftrlBPVcGwYP2epHSMYn`.

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
}' "https://{yourOktaDomain}/api/v1/features/ftrlBPVcGwYP2epHSMYn/dependents"
```

##### Response

```json
[
  {
    "id": "ftrcDO2RUt1sjZWSIok3",
    "type": "self-service",
    "status": "ENABLED",
    "name": "Event Hooks user interface in the Admin Console",
    "description": "Allows an admin to configure and manage Event Hooks using the Admin Console in addition to the existing Event Hooks API",
    "stage": {
      "value": "BETA",
      "state": "OPEN"
    },
    "_links": {
      "helpDoc": {
        "href": "https://https://help.okta.com/en/prod/Content/index.htm"
      },
      "self": {
        "href": "https://{yourOktaDomain}/api/v1/features/ftrcDO2RUt1sjZWSIok3"
      },
      "survey": {
        "href": "https://goo.gl/forms/aRelevantSurvey"
      },
      "dependents": {
        "href": "https://{yourOktaDomain}/api/v1/features/ftrcDO2RUt1sjZWSIok3/dependents"
      },
      "dependencies": {
        "href": "https://{yourOktaDomain}/api/v1/features/ftrcDO2RUt1sjZWSIok3/dependencies"
      }
    }
  }
]
```

##### Error Response

An invalid `featureId` returns a `404 Not Found` status code.

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
    "errorCode": "E0000007",
    "errorSummary": "Not found: Resource not found: invalidFeatureId (Feature)",
    "errorLink": "E0000007",
    "errorId": "oaenAlD87mGTuWeGi7AjmhIBA",
    "errorCauses": []
}
```

## Features API Objects

This API has the following objects:

* [Feature](#feature-object)
  * [Links](#links-object)
* [Stage](#stage-object)

### Feature Object

#### Feature Properties

The Feature model defines several properties:

| Property      | Type                                                           | Description                                                           |
| ------------- | -------------------------------------------------------------- | --------------------------------------------------------------------- |
| `id`          | String                                                         | Unique identifier for this Feature. (Read-only)                       |
| `type`        | String (Enum)                                                  | Current type of feature. The only support type is `self-service`.     |
| `status`      | String (Enum)                                                  | Current status of the feature. Possible values: `ENABLED`, `DISABLED` |
| `name`        | String                                                         | Name of the feature                                                   |
| `description` | String                                                         | Brief description about the feature and what it provides              |
| `stage`       | [Stage Object](#stage-object)                                  | Current [Stage](#stage-object) for this Feature                       |
| `_links`      | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | [Link relations](#links-object) for the Feature's current `status`    |

### Feature Example

```json
{
  "id": "ftrlBPVcGwYP2epHSMYn",
  "type": "self-service",
  "status": "ENABLED",
  "name": "Event Hooks",
  "description": "Event hooks are outbound HTTP REST calls from Okta, sent when specified events occur in your org. These calls from Okta are meant to be used as triggers for process flows within your own software systems.",
  "stage": {
    "value": "EA"
  },
  "_links": {
    "helpDoc": {
      "href": "https://developer.okta.com/docs/concepts/event-hooks/"
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/features/ftrlBPVcGwYP2epHSMYn"
    },
    "dependents": {
      "href": "https://{yourOktaDomain}/api/v1/features/ftrlBPVcGwYP2epHSMYn/dependents"
    },
    "dependencies": {
      "href": "https://{yourOktaDomain}/api/v1/features/ftrlBPVcGwYP2epHSMYn/dependencies"
    },
    "disable": {
      "href": "https://{yourOktaDomain}/api/v1/features/ftrlBPVcGwYP2epHSMYn/disable",
        "hints": {
          "allow": [
            "POST"
          ]
        }
    }
  }
}
```

### Links Object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the current status of a Feature.  The Links object is used for dynamic discovery of related resources and lifecycle operations. The Links object is read-only.

Here are some links that may be available on a Feature, as determined by your policies:

| Link Relation Type | Description                                                                  |
| ------------------ | ---------------------------------------------------------------------------- |
| self               | A self-referential link to this Feature.                                     |
| enable             | Lifecycle action to [enable the Feature](#update-feature).                   |
| disable            | Lifecycle action to [disable the Feature](#update-feature).                  |
| dependencies       | A link to this Feature's [dependencies](#get-dependencies).                  |
| dependents         | A link to this Feature's [dependents](#get-dependents).                      |
| helpDoc            | A link to this Feature's help documentation.                                 |
| devDoc             | A link to this Feature's developer documentation.                            |
| survey             | A link to this Feature's survey. Only available for enabled Beta Features.   |


### Stage Object

Specifies the [release cycle stage](/docs/reference/releases-at-okta/) of a Feature.

```json
{
  "stage": {
    "value": "BETA",
    "status": "OPEN"
  }
}
```

#### Stage Properties

The Stage object has following properties:

| Property | Type   | Description      |
| -------- | ------ | ---------------- |
| value    | String | `EA`, `BETA`     |
| status   | String | `OPEN`, `CLOSED` |

If a Feature's stage `value` is `EA`, the `status` is `null` and not returned. If the value is `BETA` the status is `OPEN` or `CLOSED` depending on the `BETA` feature
being manageable or not.

> Note: If a Feature's stage is Open Beta, it can be updated in Preview cells only. If a Feature's stage is Closed Beta, it can only be disabled in Preview cells.
