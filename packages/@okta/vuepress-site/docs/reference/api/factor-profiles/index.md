---
title: Factor Profiles
category: management
---

# Factor Profiles API

The Okta Factor Profiles API enables an Administrator to configure which Factor Profiles are available to use for multi-factor authentication.

> **Note:** In the Admin Dashboard a "Factor Profile" is referred to as an "Authenticator".

The Factor Profiles API supports the following operations:

* Create a Factor Profile
* Update a Factor Profile
* Get a Factor Profile
* Get all Factor Profiles by Factor Name
* Delete a Factor Profile
* Get a Feature for a Factor Profile
* Update a Feature for a Factor Profile

## Factor Profile Operations

### Create a Factor Profile

<ApiOperation method="post" url="/api/v1/org/factors/${factorName}/profiles" />

#### Request Path Parameters

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

### Get a Factor Profile

<ApiOperation method="get" url="/api/v1/org/factors/${factorName}/profiles/${profileId}" />

#### Request Path Parameters

| Parameter    | Type   | Description                                     |
| ------------ | ------ | ----------------------------------------------- |
| `factorName` | String | The name of the factor type the profile is for. |
| `profileId`  | String | The Factor Profile's unique identifier.         |

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

### Get All Factor Profiles by Factor Name

<ApiOperation method="get" url="/api/v1/org/factors/${factorName}/profiles" />

#### Request Path Parameters

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

### Update a Factor Profile

<ApiOperation method="put" url="/api/v1/org/factors/${factorName}/profiles/${profileId}" />

#### Request Path Parameters

| Parameter    | Type   | Description                                     |
| ------------ | ------ | ----------------------------------------------- |
| `factorName` | String | The name of the factor type the profile is for. |
| `profileId`  | String | The Factor Profile's unique identifier.         |

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

### Delete a Factor Profile

<ApiOperation method="delete" url="/api/v1/org/factors/${factorName}/profiles/${profileId}" />

#### Request Path Parameters

| Parameter    | Type   | Description                                     |
| ------------ | ------ | ----------------------------------------------- |
| `factorName` | String | The name of the factor type the profile is for. |
| `profileId`  | String | The Factor Profile's unique identifier.         |

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



### Get Factor Profile Features

<ApiOperation method="get" url="/api/v1/org/factors/${factorName}/profiles/${profileId}/features" />

#### Request Path Parameters

| Parameter    | Type   | Description                                     |
| ------------ | ------ | ----------------------------------------------- |
| `factorName` | String | The name of the factor type the profile is for. |
| `profileId`  | String | The Factor Profile's unique identifier.         |

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
| `featureId`  | String | The Factor Profile feature's unique identifier. |
| `profileId`  | String | The Factor Profile's unique identifier.         |

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
| `featureId`  | String | The Factor Profile feature's unique identifier. |
| `profileId`  | String | The Factor Profile's unique identifier.         |

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

## Factor Profile API Objects

This API has one main object:

* Factor Profile Object

As well as number of Factor Profile Feature objects:

* Adoption
* Enrollment Source
* String Validation
* Reuse
* Token Security
* Recovery

### Factor Profile Object

#### Factor Profile Properties

The Factor Profile model defines several attributes:

| Property      | Type                                               | Description                                                                                                              |
| ------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `_links`      |                                                    | Link relations for this object                                                                                           |
| `created`     | String (ISO-8601)                                  | Timestamp when the Factor Profile was created.                                                                           |
| `default`     | Boolean                                            | This is set to `true` on the profile to be used for a factor enrollment that does not have a profile associated with it. |
| `id`          | String                                             | Identifier of the Factor Profile.                                                                                        |
| `lastUpdated` | String (ISO-8601)                                  | Timestamp when the Factor Profile was last modified.                                                                     |
| `name`        | String                                             | Name of the Factor Profile. This has to be unique for a given `factorName`.                                                |
| `settings`    | [Settings Object](#factor-profile-settings-object) | Settings for Factor Profile.                                                                                             |

### Factor Profile Example

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
                "href": "https://{yourOktaDomain}/api/v1/org/factors/okta_email/profiles/fpruib7klOvW4pAuK0g3",
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

#### Adoption Factor Profile Feature Object

The Adoption Feature is available for all Factor Profiles. It controls the settings that determine when a Factor may be configured, or "adopted", for a user.

##### Adoption Factor Profile Feature Example

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
                "href": "https://{yourOktaDomain}/api/v1/org/factors/{factorType}/profiles/fpruib7klOvW4pAuK0g3/features/fpfuicb8700wW0Jq20g3",
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

##### Adoption Factor Profile Feature Properties

| Property                              | Type                                                           | Description                                                                                                 |
| ------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `_links`                              | [JSON HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06) | Link relations for this object                                                                              |
| `cardinality.max`                     | Number                                                         | The maximum number of factor instances user is allowed to enroll in.                                        |
| `cardinality.min`                     | Number                                                         | The minimum number of factor instances user must enroll in.                                                 |
| `created`                             | String (ISO-8601)                                              | Timestamp when the Factor Profile feature was created.                                                      |
| `id`                                  | String                                                         | Identifier of the Factor Profile feature.                                                                   |
| `lastUpdated`                         | String (ISO-8601)                                              | Timestamp when the Factor Profile feature was last modified.                                                |
| `selfService.eligiblity`              | String                                                         | Indicates if factor may be adopted. Possible values: `ALLOWED`, `NOT_ALLOWED`                               |
| `selfService.verificationMethod.type` | String                                                         | Indicates which factors may be used to verify an adoption operation. Possible values: `ANY_FACTOR`, `CHAIN` |
| `type`                                | String (Enum)                                                  | Feature type.                                                                                               |


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
                ]
            }
        },
        "_links": {
            "self": {
                "href": "https://{yourOktaDomain}/api/v1/org/factors/{factorType}/profiles/fpruib7klOvW4pAuK0g3/features/fpfuicb8700wW0Jq20g3",
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

| Property                                                         | Type   | Description                                                                              |
| ---------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------- |
| `selfService.verificationMethod.chains.criteria.factorProfileId` | String | Id of the Factor Profile that can be used to verify the adoption |

#### Enrollment Source Factor Profile Feature Object

The enrollment source feature is available for the Email Factor Profile.  It controls the settings used when enrolling an email factor.

##### Enrollment Source Factor Profile Feature Example:

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

##### Enrollment Source Factor Profile Feature Properties

| Property                          | Type                                                           | Description                                                                                                                                                                                     |
| --------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_links`                          | [JSON HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06) | Link relations for this object                                                                                                                                                                  |
| `created`                         | String (ISO-8601)                                              | Timestamp when the Factor Profile feature was created.                                                                                                                                          |
| `id`                              | String                                                         | Identifier of the Factor Profile feature.                                                                                                                                                       |
| `lastUpdated`                     | String (ISO-8601)                                              | Timestamp when the Factor Profile feature was last modified.                                                                                                                                    |
| `source.simpleUserAttribute.name` | String                                                         | The name of the user profile attribute which contains the email address to be used in the factor.                                                                                               |
| `type`                            | String (Enum)                                                  | Feature type.                                                                                                                                                                                   |
| `verification.automatic.enabled`  | Boolean                                                        | Indicates if automatic verification is enabled.  If `false` the user will be prompted to verify their email address following enrollment.  It `true` the factor will be automatically verified. |


#### String Validation Factor Profile Feature Object

The string validation feature is available for the password Factor Profile. It defines the validation contraints on new enrollments with the following attributes:

##### String Validation Factor Profile Feature Example

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

##### String Validation Factor Profile Feature Properties

| Property                     | Type                                                                                                               | Description                                                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `_links`                     | [JSON HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06)                                                     | Link relations for this object                               |
| `complexity.minLength`       | Integer                                                                                                            | Minimum length required.                                     |
| `complexity.minLowerCase`    | Integer                                                                                                            | Minimum number of lower case characters required.            |
| `complexity.minNumbers`      | Integer                                                                                                            | Minimum number of numerical characters required.             |
| `complexity.minSymbols`      | Integer                                                                                                            | Minimum number of symbols required.                          |
| `complexity.minUpperCase`    | Integer                                                                                                            | Minimum number of upper case characters required.            |
| `created`                    | String (ISO-8601)                                                                                                  | Timestamp when the Factor Profile feature was created.       |
| `exclude.attributeCriteria`  | Array ([Attribute Criterion Object](#string-validation-exclude-attribute-criterion-factor-profile-feature-object)) | Attribute criteria settings (Required but empty allowed).    |
| `exclude.common.source.type` | String (Enum)                                                                                                      | Source settings. Possible values: `okta`                     |
| `id`                         | String                                                                                                             | Identifier of the Factor Profile feature.                    |
| `lastUpdated`                | String (ISO-8601)                                                                                                  | Timestamp when the Factor Profile feature was last modified. |
| `type`                       | String (Enum)                                                                                                      | Feature type.                                                |


#### Reuse Factor Profile Feature Object

The reuse feature is available for the password Factor Profile. It defines the reuse contraints on new enrollments with the following attributes:

##### Reuse Factor Profile Feature Example:

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

##### Reuse Factor Profile Feature Properties

| Property                 | Type                                                 | Description                                                    |
| ------------------------ | ---------------------------------------------------- | -------------------------------------------------------------- |
| `_links`                 | [Links Object](#factor-profile-feature-links-object) | Link relations for this object                                 |
| `created`                | String (ISO-8601)                                    | Timestamp when the Factor Profile feature was created.         |
| `id`                     | String                                               | Identifier of the Factor Profile feature.                      |
| `lastUpdated`            | String (ISO-8601)                                    | Timestamp when the Factor Profile feature was last modified.   |
| `prevention.minimumAge`  | String (ISO-8601)                                    | Minimum age of enrollment before change is allowed (Optional). |
| `prevention.numPrevious` | Integer                                              | Number of previously used values to disallow.                  |
| `type`                   | String (Enum)                                        | Feature type.                                                  |


#### Token Security Factor Profile Feature Object

The token security feature is available for the Email Factor Profile.  It controls the settings that govern the tokens issued by the email factor.

##### Token Security Factor Profile Feature Example

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
                "href": "https://{yourOktaDomain}/api/v1/org/factors/okta_email/profiles/fpruib7klOvW4pAuK0g3/features/fpfuifa1aEuPznkem0g3",
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

##### Token Security Factor Profile Feature Properties

| Property              | Type                                                           | Description                                                  |
| --------------------- | -------------------------------------------------------------- | ------------------------------------------------------------ |
| `_links`              | [JSON HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06) | Link relations for this object                               |
| `created`             | String (ISO-8601)                                              | Timestamp when the Factor Profile feature was created.       |
| `id`                  | String                                                         | Identifier of the Factor Profile feature.                    |
| `lastUpdated`         | String (ISO-8601)                                              | Timestamp when the Factor Profile feature was last modified. |
| `lifespan.ttl.period` | String                                                         | Token lifespan specified as an ISO 8601 duration             |
| `type`                | String (Enum)                                                  | Feature type.                                                |

#### Recovery Factor Profile Feature Object

The recovery feature is available for all Factor Profiles.  It controls the settings that govern how a user can recover if they lose access to an authenticator (Factor Profile)

##### Recovery Factor Profile Feature Example

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
            "href": "https://{yourOktaDomain}/api/v1/org/factors/{factorType}/profiles/fpruib7klOvW4pAuK0g3/features/fpfuidgo5kiGGK3WU0g3",
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

##### Recovery Factor Profile Feature Properties

| Property                  | Type                                                           | Description                                                                                               |
| ------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `_links`                  | [JSON HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06) | Link relations for this object                                                                            |
| `created`                 | String (ISO-8601)                                              | Timestamp when the Factor Profile feature was created.                                                    |
| `eligiblity`              | String                                                         | Indicates if factor may be recovered. Possible values: `ALLOWED`, `NOT_ALLOWED`                           |
| `id`                      | String                                                         | Identifier of the Factor Profile feature.                                                                 |
| `lastUpdated`             | String (ISO-8601)                                              | Timestamp when the Factor Profile feature was last modified.                                              |
| `type`                    | String (Enum)                                                  | Feature type.                                                                                             |
| `verificationMethod.type` | String                                                         | Indicates which factors may be used to verify a recover operation. Possible values: `ANY_FACTOR`, `CHAIN` |

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
        ]
    },
    "_links": {
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/org/factors/{factorType}/profiles/fpruib7klOvW4pAuK0g3/features/fpfuidgo5kiGGK3WU0g3",
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

| Property                                             | Type                                                           | Description                                                                              |
| ---------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `_links`                                             | [JSON HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06) | Link relations for this object                                                           |
| `created`                                            | String (ISO-8601)                                              | Timestamp when the Factor Profile feature was created.                                   |
| `id`                                                 | String                                                         | Identifier of the Factor Profile feature.                                                |
| `lastUpdated`                                        | String (ISO-8601)                                              | Timestamp when the Factor Profile feature was last modified.                             |
| `type`                                               | String (Enum)                                                  | Feature type.                                                                            |
| `verificationMethod.chains.criteria.factorProfileId` | String                                                         | Profile Id of the authenticator (Factor Profile) that can be used to verify the recovery |


### Factor Profile Feature Links Object

Specifies link relations (See [Web Linking](https://tools.ietf.org/html/rfc5988)) available for the current Factor Profile feature. The Links Object is used for dynamic discovery of related resources.  The Links Object is **read-only**.

| Property | Type   | Description                 |
| -------- | ------ | --------------------------- |
| `self.href`   | String | Url that can be used to reference the Factor Profile feature |
| `hints.allow` | Array (Strings) | An array of operations that can be performed on the Factor Profile feature |
