---
title: Features
category: management
---

# Features API

The Okta Features API provides operations to manage self-service Early Access (EA) and Beta features in your org.

> **Note:** Important background information for this API is available on the [Feature Lifecycle Management](/docs/concepts/feature-lifecycle-management/) page.

## Get started

Explore the Features API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/e5d2bf83976120cb4546)

## Feature operations

The Features API has the following operations:

* [Get a Feature](#get-a-feature)
* [List Features](#list-features)
* [Update Feature](#update-a-feature)
* [Get Dependencies](#get-dependencies)
* [Get Dependents](#get-dependents)

### Get a Feature

<ApiOperation method="get" url="/api/v1/features/${featureId}" /> <SupportsCors />

Fetches a Feature by its `id`. If you don't know the Feature `id`, you can [list Features](#list-features).

#### Request path parameters

| Parameter   | Type   | Description                      |
| ----------- | ------ | -------------------------------- |
| `featureId` | String | The Feature's unique identifier |


#### Request query parameters

None

#### Response body

The requested [Feature](#feature-object)

#### Usage example

This request fetches a Feature object with an `id` value `ftrYooGoH8b41iCZiPk7`:

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/features/ftrZooGoT8b41iWRiQs7"
```

##### Response

```json
{
  "id": "ftrZooGoT8b41iWRiQs7",
  "type": "self-service",
  "status": "DISABLED",
  "name": "Example feature name",
  "description": "Example feature description",
  "stage": {
    "value": "EA"
  },
  "_links": {
    "enable": {
      "href": "https://${yourOktaDomain}/api/v1/features/ftrZooGoT8b41iWRiQs7/enable",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/features/ftrZooGoT8b41iWRiQs7"
    },
    "dependents": {
      "href": "https://${yourOktaDomain}/api/v1/features/ftrZooGoT8b41iWRiQs7/dependents"
    },
    "dependencies": {
      "href": "https://${yourOktaDomain}/api/v1/features/ftrZooGoT8b41iWRiQs7/dependencies"
    }
  }
}
```

##### Error response

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

Fetches a list of all available self-service Features for your org

#### Request parameters

None

#### Response body

Array of [Feature](#feature-object) objects

#### Usage example

The following request returns a list of all available self-service Features.

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/features"
```

##### Response

```json
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": "ftrZooGoT8b41iWRiQs7",
    "type": "self-service",
    "status": "DISABLED",
    "name": "Example feature name",
    "description": "Example feature description",
    "stage": {
      "value": "EA"
    },
    "_links": {
      "enable": {
        "href": "https://${yourOktaDomain}/api/v1/features/ftrZooGoT8b41iWRiQs7/enable",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/features/ftrZooGoT8b41iWRiQs7"
      },
      "dependents": {
        "href": "https://${yourOktaDomain}/api/v1/features/ftrZooGoT8b41iWRiQs7/dependents"
      },
      "dependencies": {
        "href": "https://${yourOktaDomain}/api/v1/features/ftrZooGoT8b41iWRiQs7/dependencies"
      }
    }
  },
  {
     "id":"ftrcUG2WEt1sjXVSIok3",
     "type":"self-service",
     "status":"ENABLED",
     "name":"Example feature name",
     "description":"Example feature description",
     "stage":{
        "value":"BETA",
        "state":"OPEN"
     },
     "_links":{
        "helpDoc":{
           "href":"https://https://help.okta.com/en/prod/Content/index.htm"
        },
        "self":{
           "href":"https://${yourOktaDomain}/api/v1/features/ftrcUG2WEt1sjXVSIok3"
        },
        "survey":{
           "href":"https://goo.gl/forms/aRelevantSurvey"
        },
        "dependents":{
           "href":"https://${yourOktaDomain}/api/v1/features/ftrcUG2WEt1sjXVSIok3/dependents"
        },
        "dependencies":{
           "href":"https://${yourOktaDomain}/api/v1/features/ftrcUG2WEt1sjXVSIok3/dependencies"
        }
     }
  }
]
```

### Update a Feature

<ApiOperation method="post" url="/api/v1/features/${featureId}/${lifecycle}" />

Updates a Feature's status. Use this endpoint to enable or disable a Feature for your org.

The following chart shows the different state transitions for a Feature:

[![Update Feature Flowchart](/img/update-ssfeat-flowchart.png "Update Feature Flowchart")](/img/update-ssfeat-flowchart.png)

#### Request path parameters

| Parameter   | Type   | Description                                                           |
| ----------- | ------ | --------------------------------------------------------------------- |
| `featureId` | String | Unique identifier of the Feature to update                            |
| `lifecycle` | String | Enables or disables the Feature. Possible values: `enable`, `disable` |


#### Request query parameters

| Parameter | Type   | Description                                                                      |
| --------- | ------ | -------------------------------------------------------------------------------- |
| `mode`    | String | Indicates if you want to force enable/disable a feature. Possible value: `force` |

Force mode is used to override dependency restrictions for a particular Feature. Normally, you can't enable a Feature if it has one or more dependencies that aren't enabled.

If you use the `mode=force` parameter while enabling a Feature, then Okta first tries enabling any disabled Features that this Feature may have as dependencies. If you don't pass the `mode=force` parameter and the Feature has dependencies that need to be enabled before the Feature is enabled, a `400` error is returned.

If you use the `mode=force` parameter while disabling a Feature, then Okta first tries disabling any enabled Features that this Feature may have as dependents. If you don't pass the `mode=force` parameter and the Feature has dependencies that need to be disabled before the Feature is disabled, a `400` error is returned.

#### Request body

None

#### Response body

Updated [Feature](#feature-object)

#### Example usage

The following request enables the Feature with an `id` value `ftrZooGoT8b41iWRiQs7`.

##### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/features/ftrZooGoT8b41iWRiQs7/enable"
```

##### Response

```json
{
  "id": "ftrZooGoT8b41iWRiQs7",
  "type": "self-service",
  "status": "ENABLED",
  "name": "Example feature name",
  "description": "Example feature description",
  "stage": {
    "value": "EA"
  },
  "_links": {
    "disable": {
      "href": "https://${yourOktaDomain}/api/v1/features/ftrZooGoT8b41iWRiQs7/disable",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/features/ftrZooGoT8b41iWRiQs7"
    },
    "dependents": {
      "href": "https://${yourOktaDomain}/api/v1/features/ftrZooGoT8b41iWRiQs7/dependents"
    },
    "dependencies": {
      "href": "https://${yourOktaDomain}/api/v1/features/ftrZooGoT8b41iWRiQs7/dependencies"
    }
  }
}
```

##### Error response (invalid featureId)

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

##### Error response (method not allowed)

The following returns a `405 Method Not Allowed` status code:

* An invalid `lifecycle` value
* Update request for a `BETA` Feature in a non-preview cell
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

##### Error response (Feature in closed Beta)

Sending an enable request for a Feature with a `stage` value of `BETA CLOSED` in a Preview cell returns a `405 Method Not Allowed` status code:

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

##### Error response (dependency/dependents conflict)

If the `mode` isn't `force` and the disable/enable requires other self-service features to be enabled/disabled, a `400 Bad Request` is returned.

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
      "errorSummary": "Self-Service feature example is not enabled",
      "reason": "DEPENDENCY_NOT_ENABLED",
      "location": "https://${yourOktaDomain}/api/v1/features/ftrZooGoT8b41iWRiQs7",
      "locationType": "url"
    }
  ]
}
```

### Get dependencies

<ApiOperation method="get" url="/api/v1/features/${featureId}/dependencies" />

Fetches the list of Feature dependencies for a specified Feature. A Feature's dependencies are the Features that it requires to be enabled in order for itself to be enabled.

#### Request path parameters

| Parameter   | Type   | Description                                                           |
| ----------- | ------ | --------------------------------------------------------------------- |
| `featureId` | String | Unique identifier of the Feature to update                            |

#### Request query parameters

None

#### Response body

Array of [Feature](#feature-object) objects

#### Example usage

The following request returns the Feature dependencies for a Feature with an `id` value of `ftrlBPVcRtYP2epHSMHn`.

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/features/ftrlBPVcRtYP2epHSMHn/dependencies"
```

##### Response

```json
[
  {
    "id": "ftrlBPVcRtYP2epHSMHn",
    "type": "self-service",
    "status": "ENABLED",
    "name": "Example feature name",
    "description": "Example feature description.",
    "stage": {
      "value": "EA"
    },
    "_links": {
      "helpDoc": {
        "href": "https://developer.okta.com/docs/concepts/event-hooks/"
      },
      "disable": {
        "href": "https://${yourOktaDomain}/api/v1/features/ftrlBPVcRtYP2epHSMHn/disable",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/features/ftrlBPVcRtYP2epHSMHn"
      },
      "dependents": {
        "href": "https://${yourOktaDomain}/api/v1/features/ftrlBPVcRtYP2epHSMHn/dependents"
      },
      "dependencies": {
        "href": "https://${yourOktaDomain}/api/v1/features/ftrlBPVcRtYP2epHSMHn/dependencies"
      }
    }
  }
]
```

##### Error response (invalid featureId)

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

### Get dependents

<ApiOperation method="get" url="/api/v1/features/${featureId}/dependents" />

Fetches the list of Feature dependents for a specified Feature. A Feature's dependents are the Features that need to be disabled in order for the Feature itself to be disabled.

#### Request Path Parameters

| Parameter   | Type   | Description                                                           |
| ----------- | ------ | --------------------------------------------------------------------- |
| `featureId` | String | Unique identifier of the Feature to update                            |

#### Request query parameters

None

##### Response parameters

Array of [Feature](#feature-object) objects

#### Usage example

The following request would retrieve the dependent Features for a Feature with an `id` value of `ftrcDO2RUt1sjQsSIok3`.

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/features/ftrcDO2RUt1sjQsSIok3/dependents"
```

##### Response

```json
[
  {
    "id": "ftrcDO2RUt1sjQsSIok3",
    "type": "self-service",
    "status": "ENABLED",
    "name": "Example feature name",
    "description": "Example feature description.",
    "stage": {
      "value": "BETA",
      "state": "OPEN"
    },
    "_links": {
      "helpDoc": {
        "href": "https://https://help.okta.com/en/prod/Content/index.htm"
      },
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/features/ftrcDO2RUt1sjQsSIok3"
      },
      "survey": {
        "href": "https://goo.gl/forms/aRelevantSurvey"
      },
      "dependents": {
        "href": "https://${yourOktaDomain}/api/v1/features/ftrcDO2RUt1sjQsSIok3/dependents"
      },
      "dependencies": {
        "href": "https://${yourOktaDomain}/api/v1/features/ftrcDO2RUt1sjQsSIok3/dependencies"
      }
    }
  }
]
```

##### Error response

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

## Features API objects

This API has the following objects:

* [Feature](#feature-object)
* [Links](#links-object)
* [Stage](#stage-object)

### Feature object

#### Feature properties

The Feature object defines several properties:

| Property      | Type                                                           | Description                                                           |
| ------------- | -------------------------------------------------------------- | --------------------------------------------------------------------- |
| `_links`      | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | [Link relations](#links-object) for the Feature's current `status`    |
| `description` | String                                                         | Brief description of the Feature and what it provides                 |
| `id`          | String                                                         | Unique identifier for this Feature (Read-only)                       |
| `name`        | String                                                         | Name of the Feature                                                   |
| `stage`       | [Stage object](#stage-object)                                  | Current [Stage](#stage-object) for this Feature                       |
| `status`      | String (Enum)                                                  | Current status of the Feature. Possible values: `ENABLED`, `DISABLED` |
| `type`        | String (Enum)                                                  | Current type of Feature. Possible value: `self-service`               |

### Feature example

```json
{
  "id": "ftrlBDFcGwYP2epXCGYn",
  "type": "self-service",
  "status": "ENABLED",
  "name": "Example feature name",
  "description": "Example feature description.",
  "stage": {
    "value": "EA"
  },
  "_links": {
    "helpDoc": {
      "href": "https://developer.okta.com/docs/concepts/feature-name/"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/features/ftrlBDFcGwYP2epXCGYn"
    },
    "dependents": {
      "href": "https://${yourOktaDomain}/api/v1/features/ftrlBDFcGwYP2epXCGYn/dependents"
    },
    "dependencies": {
      "href": "https://${yourOktaDomain}/api/v1/features/ftrlBDFcGwYP2epXCGYn/dependencies"
    },
    "disable": {
      "href": "https://${yourOktaDomain}/api/v1/features/ftrlBDFcGwYP2epXCGYn/disable",
        "hints": {
          "allow": [
            "POST"
          ]
        }
    }
  }
}
```

### Stage object

Specifies the [release cycle stage](/docs/reference/releases-at-okta/) of a Feature

#### Stage properties

The Stage object has following properties:

| Property | Type   | Description      |
| -------- | ------ | ---------------- |
| `state`   | String | `OPEN`, `CLOSED` |
| `value`    | String | `EA`, `BETA`     |

If a Feature's stage `value` is `EA`, the `state` is `null` and not returned. If the value is `BETA` the state is `OPEN` or `CLOSED` depending on whether the `BETA` feature is manageable.

> **Note:** If a Feature's stage is Open Beta, you can update it only in Preview cells. If a Feature's stage is Closed Beta, you can disable it only in Preview cells.

#### Stage example

```json
{
  "stage": {
    "value": "BETA",
    "state": "OPEN"
  }
}
```

### Links object

Specifies link relations (see [Web Linking](http://tools.ietf.org/html/rfc8288)) available for the current status of a Feature. The Links object is used for dynamic discovery of related resources and lifecycle operations. The Links object is read-only and returned within a Feature object.

#### Link properties

Here are some links that may be available on a Feature, as determined by your policies:

| Link Relation Type | Description                                                                  |
| ------------------ | ---------------------------------------------------------------------------- |
| `dependencies`       | A link to this Feature's [dependencies](#get-dependencies)                  |
| `dependents`         | A link to this Feature's [dependents](#get-dependents)                      |
| `devDoc`             | A link to this Feature's developer documentation                            |
| `disable`            | Lifecycle action to [disable the Feature](#update-feature)                  |
| `enable`             | Lifecycle action to [enable the Feature](#update-feature)                   |
| `helpDoc`            | A link to this Feature's help documentation                                 |
| `self`               | A self-referential link to this Feature                                     |
| `survey`             | A link to this Feature's survey. Only available for enabled Beta Features.   |


#### Link example

```json
{
  "_links": {
    "helpDoc": {
      "href": "https://developer.okta.com/docs/concepts/feature-name/"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/features/ftrlBDFcGwYP2epXCGYn"
    },
    "dependents": {
      "href": "https://${yourOktaDomain}/api/v1/features/ftrlBDFcGwYP2epXCGYn/dependents"
    },
    "dependencies": {
      "href": "https://${yourOktaDomain}/api/v1/features/ftrlBDFcGwYP2epXCGYn/dependencies"
    },
    "disable": {
      "href": "https://${yourOktaDomain}/api/v1/features/ftrlBDFcGwYP2epXCGYn/disable",
        "hints": {
          "allow": [
            "POST"
          ]
        }
    }
  }
}
```
