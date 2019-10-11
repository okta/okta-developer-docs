---
title: Factor Profiles
category: management
---

# Factor Profiles API

The Okta Factor Profiles API enables an Administrator to configure which factor profiles are available to use for multi-factor authentication.

> **Note:** In the Admin Dashboard

The factor profiles API supports the following **profile operations**:

* Get all profiles for a specific factor type
* Create, read, update, and delete a profile

The factor profiles API supports the following **profile feature operations**:

* Get all features for a profile
* Update a feature for a profile

## Factor Profile Operations

### Get a Factor Profile

<ApiOperation method="get" url="/api/v1/org/factors/${factorName}/profiles/${profileId}" />

#### Request Parameters

| Parameter    | Type   | Description                                     |
| ------------ | ------ | ----------------------------------------------- |
| `factorName` | String | The name of the factor type the profile is for. |
| `profileId`  | String | The factor profile's unique identifier.         |

##### Request Example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/org/factors/{factorName}/profiles/{profileId}"
```

##### Response Example

HTTP 200:
[Factor Profile Object](#factor-profile-object)

### Get All Factor Profiles by Factor Type

<ApiOperation method="get" url="/api/v1/org/factors/${factorName}/profiles" />

#### Request Parameters

| Parameter    | Type   | Description                                     |
| ------------ | ------ | ----------------------------------------------- |
| `factorName` | String | The name of the factor type the profile is for. |

#### Request Example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/org/factors/{factorName}/profiles"
```

#### Response Types

HTTP 200:
Array of [Factor Profile Object](#factor-profile-object)

### Delete a Factor Profile

<ApiOperation method="delete" url="/api/v1/org/factors/${factorName}/profiles/${profileId}" />

#### Request Parameters

| Parameter    | Type   | Description                                     |
| ------------ | ------ | ----------------------------------------------- |
| `factorName` | String | The name of the factor type the profile is for. |
| `profileId`  | String | The factor profile's unique identifier.         |

#### Request Example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/org/factors/{factorName}/profiles/{profileId}"
```

#### Response Types

HTTP 204:
*No Content*

### Update a Factor Profile

<ApiOperation method="put" url="/api/v1/org/factors/${factorName}/profiles/${profileId}" />

#### Request Parameters

| Parameter    | Type   | Description                                     |
| ------------ | ------ | ----------------------------------------------- |
| `factorName` | String | The name of the factor type the profile is for. |
| `profileId`  | String | The factor profile's unique identifier.         |

#### Request Example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "PIN code",
  "default": false,
  "settings": {}
}' "https://{yourOktaDomain}/api/v1/org/factors/{factorName}/profiles/{profileId}"
```

#### Response Types

HTTP 200:
[Factor Profile Object](#factor-profile-object)

### Create a Factor Profile

<ApiOperation method="post" url="/api/v1/org/factors/${factorName}/profiles" />

#### Request Parameters

| Parameter    | Type   | Description                                     |
| ------------ | ------ | ----------------------------------------------- |
| `factorName` | String | The name of the factor type the profile is for. |

#### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "PIN code",
  "default": false,
  "settings": {}
}' "https://{yourOktaDomain}/api/v1/org/factors/{factorName}/profiles"
```

#### Response Types

HTTP 200:
[Factor Profile Object](#factor-profile-object)

## Factor Profile Feature Operations

### Get Factor Profile Features

<ApiOperation method="get" url="/api/v1/org/factors/${factorName}/profiles/${profileId}/features" />

#### Request Parameters

| Parameter    | Type   | Description                                     |
| ------------ | ------ | ----------------------------------------------- |
| `factorName` | String | The name of the factor type the profile is for. |
| `profileId`  | String | The factor profile's unique identifier.         |

#### Request Example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/org/factors/{factorName}/profiles/{profileId}/features"
```

#### Response Types

HTTP 200:
Array of [Factor Profile Feature Object](#factor-profile-feature-object)

### Get a Factor Profile Feature

<ApiOperation method="get" url="/api/v1/org/factors/${factorName}/profiles/${profileId}/features/${featureId}" />

#### Request Parameters

| Parameter    | Type   | Description                                     |
| ------------ | ------ | ----------------------------------------------- |
| `factorName` | String | The name of the factor type the profile is for. |
| `profileId`  | String | The factor profile's unique identifier.         |
| `featureId`  | String | The factor profile feature's unique identifier. |

#### Request Example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/org/factors/{factorName}/profiles/{profileId}/features/{featureId}"
```

#### Response Types

HTTP 200:
[Factor Profile Feature Object](#factor-profile-feature-object)

### Update a Factor Profile Feature

<ApiOperation method="put" url="/api/v1/org/factors/${factorName}/profiles/${profileId}/features/${featureId}" />

#### Request Parameters

| Parameter    | Type   | Description                                     |
| ------------ | ------ | ----------------------------------------------- |
| `factorName` | String | The name of the factor type the profile is for. |
| `profileId`  | String | The factor profile's unique identifier.         |
| `featureId`  | String | The factor profile feature's unique identifier. |

#### Request Example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "adoption",
  "cardinality": {
    "min": 0,
    "max": 1
  },
  "selfService": {
    "eligibility": "ALLOWED",
    "verificationMethod": {
      "type": "ANY_FACTOR"
    }
  }
}' "https://{yourOktaDomain}/api/v1/org/factors/{factorName}/profiles/{profileId}/features/{featureId}"
```

#### Response Types

HTTP 200:
[Factor Profile Feature Object](#factor-profile-feature-object)

## Factor Profiles

### Example
```json
    {
        "id": "fpruib7klOvW4pAuK0g3",
        "name": "Email",
        "created": "2019-10-08T18:19:04.000Z",
        "lastUpdated": "2019-10-08T18:19:04.000Z",
        "settings": {},
        "default": true,
        "_links": {
            "self": {
                "href": "http://ed.okta1.com:1802/api/v1/org/factors/okta_email/profiles/fpruib7klOvW4pAuK0g3",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT",
                        "DELETE"
                    ]
                }
            }
        }
    }
```

### Properties

The Factor Profile model defines several attributes:

| Property      | Type                                               | Description                                                                                                              |
| ------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `id`          | String                                             | Identifier of the factor profile.                                                                                        |
| `name`        | String                                             | Name of the factor profile. This has to be unique for a given factorName.                                                |
| `default`     | Boolean                                            | This is set to `true` on the profile to be used for a factor enrollment that does not have a profile associated with it. |
| `settings`    | [Settings Object](#factor-profile-settings-object) | Settings for factor profile.                                                                                             |
| `created`     | String (ISO-8601)                                  | Timestamp when the factor profile was created.                                                                           |
| `lastUpdated` | String (ISO-8601)                                  | Timestamp when the factor profile was last modified.                                                                     |
| `_links`      |                                                    | Link relations for this object                                                                                           |

### Factor Profile Settings Object

The factor profile settings object contains the settings for the particular factor type. Currently factor profiles can be created for two factor types: `okta_email` and `okta_password`.
There could be multiple `okta_password` profiles created but currently, only the default one is consumed.

### Factor Profile Links Object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the current factor profile. The Links Object is used for dynamic discovery of related resources.  The Links Object is **read-only**.

| Property | Description                                                  |
| --------- | ------------------------------------------------------------ |
| `self`      | The factor profile.                                          |
| `features`  | Action to retrieve the features of the given factor profile. |

## Factor Profile Features

Each factor profile contains one or more features of various types. Currently the `adoption`, `enrollment_source`, `string_validation`, `reuse`, `token_security` and `recovery` feature types are supported.  Some features are common to all profiles, and some are specific to a particular profile.

### Factor Profile Feature Object

The Factor Profile Feature model defines several common attributes:

| Property      | Type                                                 | Description                                                  |
| ------------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| `id`          | String                                               | Identifier of the factor profile feature.                    |
| `type`        | String (Enum)                                        | Feature type.                                                |
| `created`     | String (ISO-8601)                                    | Timestamp when the factor profile feature was created.       |
| `lastUpdated` | String (ISO-8601)                                    | Timestamp when the factor profile feature was last modified. |
| `_links`      | [Links Object](#factor-profile-feature-links-object) | Link relations for this object                               |

#### Adoption Factor Profile Feature Object

The adoption feature is available for all factor profiles. It controls the settings that determine when a factor may be configured, or "adopted", for a user.

##### Example

```json
{
        "type": "adoption",
        "id": "fpfuicb8700wW0Jq20g3",
        "created": "2019-10-08T18:19:04.000Z",
        "lastUpdated": "2019-10-10T16:11:43.000Z",
        "cardinality": {
            "min": 0,
            "max": 1
        },
        "selfService": {
            "eligibility": "ALLOWED",
            "verificationMethod": {
                "type": "ANY_FACTOR"
            }
        },
        "_links": {
            "self": {
                "href": "http://{yourOktaDomain}/api/v1/org/factors/{factorType}/profiles/fpruib7klOvW4pAuK0g3/features/fpfuicb8700wW0Jq20g3",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT",
                        "DELETE"
                    ]
                }
            }
        }
    }
```

##### Properties

| Property | Type   | Description                                                          |
| -------- | ------ | -------------------------------------------------------------------- |
| `cardinality.min`    | Number | The minimum number of factor instances user must enroll in.          |
| `cardinality.max`    | Number | The maximum number of factor instances user is allowed to enroll in. |
| `selfService.eligiblity`      | String  | Indicates if factor may be adopted. Possible values: `ALLOWED`, `NOT_ALLOWED` |
| `selfService.verificationMethod.type`      | String | Indicates which factors may be used to verify an adoption operation. Possible values: `ANY_FACTOR`, `CHAIN` |


###### Chain verification
Chain verification may be used to specify which factor may be used to verify the recovery

###### Example
```json
{
        "type": "adoption",
        "id": "fpfuicb8700wW0Jq20g3",
        "created": "2019-10-08T18:19:04.000Z",
        "lastUpdated": "2019-10-10T16:11:43.000Z",
        "cardinality": {
            "min": 0,
            "max": 1
        },
        "selfService": {
            "eligibility": "ALLOWED",
            "verificationMethod": {
                "type": "CHAIN",
                "chains": [
                    {
                        "criteria": [
                            {
                                "factorProfileId": "fpruihGXyLzyGYCq30g3"
                            }
                        ]
                    }
                ],
                "noAuthNEmptyChain": false
            }
        },
        "_links": {
            "self": {
                "href": "http://{yourOktaDomain}/api/v1/org/factors/{factorType}/profiles/fpruib7klOvW4pAuK0g3/features/fpfuicb8700wW0Jq20g3",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT",
                        "DELETE"
                    ]
                }
            }
        }
    }
```
###### Properties

| Property | Type | Description |
| -------- | ---- | ----------- |
| `selfService.verificationMethod.chains.criteria.factorProfileId`      | String       | Profile Id of the authenticator (factor profile) that can be used to verify the adoption |





 #### Enrollment Source Factor Profile Feature Object

The enrollment source feature is available for the Email factor profile.  It controls the settings used when enrolling an email factor.

##### Example:

```json
    {
        "type": "enrollment_source",
        "id": "fpfuieOAhoe6a5ISj0g3",
        "created": "2019-10-08T18:19:04.000Z",
        "lastUpdated": "2019-10-08T18:19:04.000Z",
        "source": {
            "simpleUserAttribute": {
                "name": "email"
            }
        },
        "verification": {
            "automatic": {
                "enabled": true
            }
        },
        "_links": {
            "self": {
                "href": "https://{yourOktaDomain}/api/v1/org/factors/okta_email/profiles/fpruib7klOvW4pAuK0g3/features/fpfuieOAhoe6a5ISj0g3",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT",
                        "DELETE"
                    ]
                }
            }
        }
    }
```

##### Properties

| Property | Type   | Description                             |
| -------- | ------ | --------------------------------------- |
| `source.simpleUserAttribute.name`   | String | The name of the user profile attribute which contains the email address to be used in the factor. |
| `verification.automatic.enabled` | Boolean | Indicates if automatic verification is enabled.  If `false` the user will be prompted to verify their email address following enrollment.  It `true` the factor will be automatically verified. |


#### String Validation Factor Profile Feature Object

The string validation feature is available for the password factor profile. It defines the validation contraints on new enrollments with the following attributes:

##### Example
```json
    {
        "type": "string_validation",
        "id": "fpf3qbixISW8mRVb00g4",
        "created": "2019-10-09T19:38:18.000Z",
        "lastUpdated": "2019-10-09T19:38:18.000Z",
        "complexity": {
            "minLength": 8,
            "minLowerCase": 1,
            "minUpperCase": 1,
            "minNumbers": 1,
            "minSymbols": 0
        },
        "exclude": {
            "common": {
                "source": {
                    "type": "okta"
                }
            },
            "attributeCriteria": []
        },
        "_links": {
            "self": {
                "href": "https://{yourOktaDomain}/api/v1/org/factors/okta_password/profiles/fpr3qbfxjK6iECycn0g4/features/fpf3qbixISW8mRVb00g4",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT",
                        "DELETE"
                    ]
                }
            }
        }
    }
```

##### Properties

| Property   | Type                                                                 | Description           |
| ----------- | ------------------------------------------------------------------------- | --------------------- |
| `complexity.minLength` | Integer | Minimum length required. |
| `complexity.minLowerCase` | Integer | Minimum number of lower case characters required. |
| `complexity.minUpperCase` | Integer | Minimum number of upper case characters required. |
| `complexity.minNumbers` | Integer | Minimum number of numerical characters required. |
| `complexity.minSymbols` | Integer | Minimum number of symbols required. |
| `exclude.common.source.type` | String (Enum) | Source settings. Possible values: `okta` |
| `exclude.attributeCriteria` | Array ([Attribute Criterion Object](#string-validation-exclude-attribute-criterion-factor-profile-feature-object)) | Attribute criteria settings (Required but empty allowed). |


#### Reuse Factor Profile Feature Object

The reuse feature is available for the password factor profile. It defines the reuse contraints on new enrollments with the following attributes:

##### Example:

```json
    {
        "type": "reuse",
        "id": "fpf3qbjTT34TEZdIp0g4",
        "created": "2019-10-09T19:38:18.000Z",
        "lastUpdated": "2019-10-09T19:38:18.000Z",
        "prevention": {
            "numPrevious": 4,
            "minimumAge": null
        },
        "_links": {
            "self": {
                "href": "https://{yourOktaDomain}/api/v1/org/factors/okta_password/profiles/fpr3qbfxjK6iECycn0g4/features/fpf3qbjTT34TEZdIp0g4",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT",
                        "DELETE"
                    ]
                }
            }
        }
    }
```

##### Properties

| Property   | Type                                                                 | Description           |
| ----------- | ------------------------------------------------------------------------- | --------------------- |
| `prevention.numPrevious` | Integer | Number of previously used values to disallow. |
| `prevention.minimumAge` | String (ISO-8601)  | Minimum age of enrollment before change is allowed (Optional). |


#### Token Security Factor Profile Feature Object

The token security  feature is available for the Email factor profile.  It controls the settings that govern the tokens issued by the email factor.

##### Example
```json
    {
        "type": "token_security",
        "id": "fpfuifa1aEuPznkem0g3",
        "created": "2019-10-08T18:19:04.000Z",
        "lastUpdated": "2019-10-08T18:19:04.000Z",
        "lifespan": {
            "ttl": {
                "period": "PT15M"
            }
        },
        "_links": {
            "self": {
                "href": "http://{yourOktaDomain}/api/v1/org/factors/okta_email/profiles/fpruib7klOvW4pAuK0g3/features/fpfuifa1aEuPznkem0g3",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT",
                        "DELETE"
                    ]
                }
            }
        }
    }
```

##### Properties

| Property | Type   | Description                                                 |
| -------- | ------ | ----------------------------------------------------------- |
| `lifespan.ttl.period` | String | Token lifespan specified as an ISO 8601 duration |

#### Recovery Factor Profile Feature Object

The recovery feature is available for all factor profiles.  It controls the settings that govern how a user can recover if they lose access to an authenticator (factor profile)

##### Example
```json
{
    "type": "recovery",
    "id": "fpfuidgo5kiGGK3WU0g3",
    "created": "2019-10-08T18:19:04.000Z",
    "lastUpdated": "2019-10-09T22:15:50.000Z",
    "eligibility": "ALLOWED",
    "verificationMethod": {
        "type": "ANY_FACTOR"
    },
    "_links": {
        "self": {
            "href": "http://{yourOktaDomain}/api/v1/org/factors/{factorType}/profiles/fpruib7klOvW4pAuK0g3/features/fpfuidgo5kiGGK3WU0g3",
            "hints": {
                "allow": [
                    "GET",
                    "PUT",
                    "DELETE"
                ]
            }
        }
    }
}
```

##### Properties

| Property | Type | Description |
| -------- | ---- | ----------- |
| `eligiblity`      | String  | Indicates if factor may be recovered. Possible values: `ALLOWED`, `NOT_ALLOWED` |
| `verificationMethod.type`      | String | Indicates which factors may be used to verify a recover operation. Possible values: `ANY_FACTOR`, `CHAIN` |

###### Chain verification
Chain verification may be used to specify which factor may be used to verify the recovery

###### Example
```json
{
    "type": "recovery",
    "id": "fpfuidgo5kiGGK3WU0g3",
    "created": "2019-10-08T18:19:04.000Z",
    "lastUpdated": "2019-10-08T22:56:46.000Z",
    "eligibility": "ALLOWED",
    "verificationMethod": {
        "type": "CHAIN",
        "chains": [
            {
                "criteria": [
                    {
                        "factorProfileId": "fpruihGXyLzyGYCq30g3"
                    }
                ]
            }
        ],
        "noAuthNEmptyChain": false
    },
    "_links": {
        "self": {
            "href": "http://{yourOktaDomain}/api/v1/org/factors/{factorType}/profiles/fpruib7klOvW4pAuK0g3/features/fpfuidgo5kiGGK3WU0g3",
            "hints": {
                "allow": [
                    "GET",
                    "PUT",
                    "DELETE"
                ]
            }
        }
    }
}
```
###### Properties

| Property | Type | Description |
| -------- | ---- | ----------- |
| `verificationMethod.chains.criteria.factorProfileId`      | String       | Profile Id of the authenticator (factor profile) that can be used to verify the recovery |


### Factor Profile Feature Links Object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the current factor profile feature. The Links Object is used for dynamic discovery of related resources.  The Links Object is **read-only**.

| Property | Type   | Description                 |
| -------- | ------ | --------------------------- |
| `self.href`   | String | Url that can be used to reference the factor profile feature |
| `hints.allow` | Array (Strings) | An array of operations that can be performed on the factor profile feature |
