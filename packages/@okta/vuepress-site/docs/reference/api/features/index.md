---
title: Features
category: management
---

# Features API
The Okta Featyre API provides operations to manage features in your organization

## Feature Operations

### Get Feature

<ApiOperation method="get" url="/api/v1/features/${featureId}" /> <SupportsCors />

Fetches a feature from your Okta organization

- [Get Feature with ID](#get-feature-with-id)

##### Request Parameters

Fetch a feature by `id`.

| Parameter | Description   | Param Type | DataType | Required |
| --------- | ------------- | ---------- | -------- | -------- |
| id        | `id`          | URL        | String   | TRUE     |

##### Response Parameters

Fetched [Feature](#feature-model)

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

#### Get Feature with ID


Fetches a specific feature with feature's `id`

> Hint: If you don't know the feature `id`, [list the features](#list-features) to find the correct ID.

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/features/ftrYooGoH8b41iCZiPk7"
```

##### Response Example

```json
{
  "id": "ftrYooGoH8b41iCZiPk7",
  "type": "self-service",
  "lifeCycle": "DISABLED",
  "name": "Collect product feedback from end users",
  "description": "We will ask your users for their Net Promoter Score using Okta via an in-app prompt when they visit their Dashboard. Any information collected will not constitute customer data.",
  "stage": {
    "value": "EA"
  },
  "_links": {
    "enable": {
      "href": "http://rain.okta1.com:1802/api/v1/features/ftrYooGoH8b41iCZiPk7/enable",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "http://rain.okta1.com:1802/api/v1/features/ftrYooGoH8b41iCZiPk7"
    },
    "dependents": {
      "href": "http://rain.okta1.com:1802/api/v1/features/ftrYooGoH8b41iCZiPk7/dependents"
    },
    "dependencies": {
      "href": "http://rain.okta1.com:1802/api/v1/features/ftrYooGoH8b41iCZiPk7/dependencies"
    }
  }
}
```

### List Features

<ApiOperation method="get" url="/api/v1/features" />

Lists features that are available in your organization

- [List All Features](#list-all-features) (no parameters)


##### Response Parameters


Array of [Feature](#feature-model)


#### List All Features


Returns a list of all features that are available to be self-serviced for an organization. 

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/features"
```

##### Response Example


```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {  
     "id":"ftrYooGoH8b41iCZiPk7",
     "type":"self-service",
     "lifeCycle":"DISABLED",
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
     "lifeCycle":"ENABLED",
     "name":"Event Hooks user interface in the Admin console",
     "description":"Allows an admin to configure and manage Event Hooks using the Admin console in addition to the existing Event Hooks API",
     "stage":{  
        "value":"BETA",
        "state":"OPEN"
     },
     "_links":{  
        "helpDoc":{  
           "href":"https://bit.ly/2Wk8fIr"
        },
        "self":{  
           "href":"https://{yourOktaDomain}/api/v1/features/ftrcDO2RUt1sjZWSIok3"
        },
        "survey":{  
           "href":"https://goo.gl/forms/ZS6m5flCpPDjZBZz1"
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

Updates a feature's lifecycle. Use this endpoint to enable or disable a feature for your organization.

> Note: A feature with a [stage](#stage-object) value `BETA` can be only updated in `PREVIEW` cell. A feature
 with a [stage](#stage-object) value `BETA` and status `CLOSED` can be only disabled.
 
##### Request Parameters


| Parameter     | Description                                                       | Param Type   | DataType | Required |
| :------------ | :---------------------------------------------------------------- | :----------- | :--------| :------- |
| featureId     | ID of feature to update                                           | URL          | String   | TRUE     |
| lifecycle     | `enable`or `disable` to enable or disable feature for your org    | URL          | String   | TRUE     |
| mode          | `force` if you want to force enable/disable a feature             | Query        | String   | FALSE    |

>Note: If `mode=force` in the request, then the feature will be enabled/disabled along with all it's self-service dependencies/dependents.
Otherwise, if the feature has dependencies that need to be enabled before the feature is enabled (or dependents that need to be disabled
before the feature is disabled), and error is returned.

##### Response Parameters

Updated [Feature](#feature-model)

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

* An invalid `lifecycle` returns a `405 Method Not Allowed` status code.
* Update request of a `BETA` feature in non-preview cells returns a `405 Method Not Allowed` status code.
* If the feature requires support to be updated, `405 Method Not Allowed` status code is returned.
```http
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

#### Enable Feature

Enable a feature for your Okta organization. 

* Enable request of an already enabled feature returns a `405 Method Not Allowed` status code.
* Enable request of a feature with stage `BETA CLOSED` in preview cells returns a `405 Method Not Allowed` status code.
```http
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

If the `mode` is not `forced` and the enable requires other self-service features to be enabled/disabled. `400 Bad Request` is returned.
```http
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

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
}' "https://{yourOktaDomain}/api/v1/features/ftrYooGoH8b41iCZiPk7/enable"
```

##### Response Example

```json
{
  "id": "ftrYooGoH8b41iCZiPk7",
  "type": "self-service",
  "lifeCycle": "ENABLED",
  "name": "Collect product feedback from end users",
  "description": "We will ask your users for their Net Promoter Score using Okta via an in-app prompt when they visit their Dashboard. Any information collected will not constitute customer data.",
  "stage": {
    "value": "EA"
  },
  "_links": {
    "disable": {
      "href": "http://rain.okta1.com:1802/api/v1/features/ftrYooGoH8b41iCZiPk7/disable",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "http://rain.okta1.com:1802/api/v1/features/ftrYooGoH8b41iCZiPk7"
    },
    "dependents": {
      "href": "http://rain.okta1.com:1802/api/v1/features/ftrYooGoH8b41iCZiPk7/dependents"
    },
    "dependencies": {
      "href": "http://rain.okta1.com:1802/api/v1/features/ftrYooGoH8b41iCZiPk7/dependencies"
    }
  }
}
```

#### Disable Feature

Disable a feature for your Okta organization. 

Disable request of an already disabled feature returns a `405 Method Not Allowed` status code.
```http
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

If the `mode` is not `forced` and the disabling requires other self-service features to be disabled. `400 Bad Request` is returned.
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "errorCode": "E0000141",
  "errorSummary": "Feature cannot be enabled or disabled due to dependencies/dependents conflicts.",
  "errorLink": "E0000141",
  "errorId": "oaeVqM9_L88QR23ksB9MdldXQ",
  "errorCauses": [
    {
      "errorSummary": "Self-Service feature Event Hooks is not disabled",
      "reason": "DEPENDENT_NOT_DISABLED",
      "location": "https://{yourOktaDomain}/api/v1/features/ftrlBPVcGwYP2epHSMYn",
      "locationType": "url"
    }
  ]
}
```

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
}' "https://{yourOktaDomain}/api/v1/features/ftrYooGoH8b41iCZiPk7/disable"
```

##### Response Example

```json
{
  "id": "ftrYooGoH8b41iCZiPk7",
  "type": "self-service",
  "lifeCycle": "DISABLED",
  "name": "Collect product feedback from end users",
  "description": "We will ask your users for their Net Promoter Score using Okta via an in-app prompt when they visit their Dashboard. Any information collected will not constitute customer data.",
  "stage": {
    "value": "EA"
  },
  "_links": {
    "enable": {
      "href": "http://rain.okta1.com:1802/api/v1/features/ftrYooGoH8b41iCZiPk7/enable",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "http://rain.okta1.com:1802/api/v1/features/ftrYooGoH8b41iCZiPk7"
    },
    "dependents": {
      "href": "http://rain.okta1.com:1802/api/v1/features/ftrYooGoH8b41iCZiPk7/dependents"
    },
    "dependencies": {
      "href": "http://rain.okta1.com:1802/api/v1/features/ftrYooGoH8b41iCZiPk7/dependencies"
    }
  }
}
```

### Get Dependencies

Get the list of dependencies for a feature. i.e. features which need to be enabled in order to enable the feature.

<ApiOperation method="get" url="/api/v1/features/${featureId}/dependencies" />

##### Request Parameters


| Parameter | Description     | Param Type | DataType | Required |
| --------- | --------------- | ---------- | -------- | -------- |
| featureId | `id` of feature | URL        | String   | TRUE     |

##### Response Parameters


Array of [Feature](#feature-model)

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


##### Request Example
```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
}' "https://{yourOktaDomain}/api/v1/features/ftrcDO2RUt1sjZWSIok3/dependencies"
```

##### Response Example

```json
[
  {
    "id": "ftrlBPVcGwYP2epHSMYn",
    "type": "self-service",
    "lifeCycle": "ENABLED",
    "name": "Event Hooks",
    "description": "Event hooks are outbound HTTP REST calls from Okta, sent when specified events occur in your org. These calls from Okta are meant to be used as triggers for process flows within your own software systems.",
    "stage": {
      "value": "EA"
    },
    "_links": {
      "helpDoc": {
        "href": "https://developer.okta.com/use_cases/event_hooks/"
      },
      "disable": {
        "href": "http://rain.okta1.com:1802/api/v1/features/ftrlBPVcGwYP2epHSMYn/disable",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "self": {
        "href": "http://rain.okta1.com:1802/api/v1/features/ftrlBPVcGwYP2epHSMYn"
      },
      "dependents": {
        "href": "http://rain.okta1.com:1802/api/v1/features/ftrlBPVcGwYP2epHSMYn/dependents"
      },
      "dependencies": {
        "href": "http://rain.okta1.com:1802/api/v1/features/ftrlBPVcGwYP2epHSMYn/dependencies"
      }
    }
  }
]
```

### Get Dependents

Get the list of dependents for a feature. i.e. features which need to be disabled in order to disable the feature.

<ApiOperation method="get" url="/api/v1/features/${featureId}/dependents" />

##### Request Parameters

| Parameter | Description     | Param Type | DataType | Required |
| --------- | --------------- | ---------- | -------- | -------- |
| featureId | `id` of feature | URL        | String   | TRUE     |

##### Response Parameters


Array of [Feature](#feature-model)

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

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
}' "https://{yourOktaDomain}/api/v1/features/ftrlBPVcGwYP2epHSMYn/dependents"
```

##### Response Example

```json
[
  {
    "id": "ftrcDO2RUt1sjZWSIok3",
    "type": "self-service",
    "lifeCycle": "ENABLED",
    "name": "Event Hooks user interface in the Admin console",
    "description": "Allows an admin to configure and manage Event Hooks using the Admin console in addition to the existing Event Hooks API",
    "stage": {
      "value": "BETA",
      "state": "OPEN"
    },
    "_links": {
      "helpDoc": {
        "href": "https://bit.ly/2Wk8fIr"
      },
      "self": {
        "href": "http://rain.okta1.com:1802/api/v1/features/ftrcDO2RUt1sjZWSIok3"
      },
      "survey": {
        "href": "https://goo.gl/forms/ZS6m5flCpPDjZBZz1"
      },
      "dependents": {
        "href": "http://rain.okta1.com:1802/api/v1/features/ftrcDO2RUt1sjZWSIok3/dependents"
      },
      "dependencies": {
        "href": "http://rain.okta1.com:1802/api/v1/features/ftrcDO2RUt1sjZWSIok3/dependencies"
      }
    }
  }
]
```

## Feature Model

### Example

```json
{
  "id": "ftrlBPVcGwYP2epHSMYn",
  "type": "self-service",
  "lifecycle": "ENABLED",
  "name": "Event Hooks",
  "description": "Event hooks are outbound HTTP REST calls from Okta, sent when specified events occur in your org. These calls from Okta are meant to be used as triggers for process flows within your own software systems.",
  "stage": {
    "value": "EA"
  },
  "_links": {
    "helpDoc": {
      "href": "https://developer.okta.com/use_cases/event_hooks/"
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

### Feature Properties

The User model defines several read-only properties:

| Property                | Description                                                                           | DataType                                                           | Nullable   | Unique   | Readonly |
| :---------------------- | :-------------------------------------------------------------------------------------| :----------------------------------------------------------------- | :--------- | :------- | :------- |
| id                      | unique key for feature                                                                | String                                                             | FALSE      | TRUE     | TRUE     |
| type                    | current [type](#feature-type) of feature                                              | `self-service`                                                     | FALSE      | FALSE    | TRUE     |
| lifecycle               | current lifecycle of the feature                                                      | `ENABLED`, `DISABLED`                                              | FALSE      | FALSE    | TRUE     |
| name                    | name of the feature                                                                   | String                                                             | FALSE      | TRUE     | TRUE     |
| description             | brief description about the feature and what it provides                              | String                                                             | FALSE      | TRUE     | TRUE     |
| stage                   | current [stage](#stage-object) of the feature                                        | [Stage Object](#stage-object)                                      | FALSE      | FALSE    | TRUE     |
| _links                  | [link relations](#links-object) for feature&#8217;s current `lifecyle`  and `stage`   | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)     | FALSE      | FALSE    | TRUE     |

### Feature Type

The type of the feature, the possible values are:

`self-service`

### Stage Object

Specifies the stage of a feature.

```json
{
  "stage": {
    "value": "BETA",
    "status": "OPEN"
  }
}
```

#### Stage Properties

The feature stage has following standard properties:

| Property            | Description                     | DataType   | Nullable        | Unique   | Readonly   |
| :------------------ | :-------------------------------| :----------| :---------------| :--------| :----------|
| value               | `EA`, `BETA`                    | String     | FALSE           | FALSE    | TRUE       |
| status              | `OPEN`, `CLOSED`                | String     | TRUE            | FALSE    | TRUE       |

If a feature's stage value is `EA`, the status is null. If the value is `BETA` the status is `OPEN` or `CLOSED` depending on the `BETA` feature
being manageable or not. 
