---
title: Factor Profiles
category: management
---

# Factor Profiles API

The Okta Factor Profiles API enables an Administrator to configure which Factor Profiles are available to use for multi-factor authentication.

A Factor Profile is a configuration of a Factor which can be used by a User, once enrolled in a profile, to perform actions such as authentication or credential recovery. A Factor may be used across multiple Factor Profiles with differing sets of configuration. For example, one may have two Password Factor based Factor Profiles such as "Recovery Password" and "Authentication Password" with differing security requirements, suited for their intended usage.

As part of the Limited Early Access release, Factor Profiles can be created for two Factors: `okta_email` and `okta_password`

> **Note:** In the Admin Dashboard a "Factor Profile" is referred to as an "Authenticator".

## Factor Profile Operations

The Factor Profiles API supports the following operations:

* Create a Factor Profile
* Update a Factor Profile
* Get a Factor Profile
* List Factor Profiles by Factor Name
* Delete a Factor Profile
* Get a Feature for a Factor Profile
* Update a Feature for a Factor Profile

### Create a Factor Profile

This creates a new Profile for the specified Factor.

<ApiOperation method="post" url="/api/v1/org/factors/${factorName}/profiles" />

#### Request Path Parameters

| Parameter    | Type   | Description                                            |
| ------------ | ------ | ------------------------------------------------------ |
| `factorName` | String | The identifier for the Factor this Profile belongs to. |

#### Request Body

| Parameter  | Type    | Description                                                                     |
| ---------- | ------- | ------------------------------------------------------------------------------- |
| `default`  | Boolean | If `true`, this Profile will be used for all Factors without their own Profile. |
| `name`     | String  | Name of this Factor Profile. This has to be unique for a given `factorName`.    |
| `settings` | Object  | The settings for this Factor Profile. This object is empty as of this release.  |

#### Response Body

HTTP 200:
[Factor Profile Object](#factor-profile-object)

#### Example Usage

##### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "PIN code",
  "default": false,
  "settings": {}
}' "https://{yourOktaDomain}/api/v1/org/factors/okta_password/profiles"
```

##### Response

```json
{
    "id": "fprujkAbFkkulo9gj0g3",
    "name": "PIN CODE",
    "created": "2019-10-16T17:10:13.000Z",
    "lastUpdated": "2019-10-16T17:10:13.000Z",
    "settings": {},
    "default": false,
    "_links": {
        "self": {
            "href": "http://{yourOktaDomain}/api/v1/org/factors/okta_password/profiles/fprujkAbFkkulo9gj0g3",
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

### Get a Factor Profile

<ApiOperation method="get" url="/api/v1/org/factors/${factorName}/profiles/${profileId}" />

#### Request Path Parameters

| Parameter    | Type   | Description                                            |
| ------------ | ------ | ------------------------------------------------------ |
| `factorName` | String | The identifier for the Factor this Profile belongs to. |
| `profileId`  | String | The Factor Profile's unique identifier.                |

#### Response Body

HTTP 200:
[Factor Profile Object](#factor-profile-object)

#### Example Usage

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/org/factors/okta_password/profiles/fprujkAbFkkulo9gj0g3"
```

##### Response

```json
{
    "id": "fprujkAbFkkulo9gj0g3",
    "name": "PIN CODE",
    "created": "2019-10-16T17:10:13.000Z",
    "lastUpdated": "2019-10-16T17:10:13.000Z",
    "settings": {},
    "default": false,
    "_links": {
        "self": {
            "href": "http://{yourOktaDomain}/api/v1/org/factors/okta_password/profiles/fprujkAbFkkulo9gj0g3",
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

### List Factor Profiles by Factor Name

<ApiOperation method="get" url="/api/v1/org/factors/${factorName}/profiles" />

#### Request Path Parameters

| Parameter    | Type   | Description                                     |
| ------------ | ------ | ----------------------------------------------- |
| `factorName` | String | The identifier for the Factor this Profile belongs to. |

#### Response Body

HTTP 200:
Array of [Factor Profile Object](#factor-profile-object)

#### Example Usage

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/org/factors/okta_email/profiles"
```
##### Response

```json
[
    {
        "id": "fpruib7klOvW4pAuK0g3",
        "name": "Email",
        "created": "2019-10-08T18:19:04.000Z",
        "lastUpdated": "2019-10-08T18:19:04.000Z",
        "settings": {},
        "default": true,
        "_links": {
            "self": {
                "href": "http://{yourOktaDomain}/api/v1/org/factors/okta_email/profiles/fpruib7klOvW4pAuK0g3",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT",
                        "DELETE"
                    ]
                }
            }
        }
    },
    {
        "id": "fprujptC366S5BAjQ0g3",
        "name": "Secondary Email",
        "created": "2019-10-16T17:20:05.000Z",
        "lastUpdated": "2019-10-16T17:20:05.000Z",
        "settings": {},
        "default": false,
        "_links": {
            "self": {
                "href": "http://{yourOktaDomain}/api/v1/org/factors/okta_email/profiles/fprujptC366S5BAjQ0g3",
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
]
```


### Update a Factor Profile

<ApiOperation method="put" url="/api/v1/org/factors/${factorName}/profiles/${profileId}" />

#### Request Path Parameters

| Parameter    | Type   | Description                                     |
| ------------ | ------ | ----------------------------------------------- |
| `factorName` | String | The identifier for the Factor this Profile belongs to. |
| `profileId`  | String | The Factor Profile's unique identifier.         |

#### Request Body

| Parameter    | Type   | Description                                            |
| ------------ | ------ | ------------------------------------------------------ |
| `default` | Boolean | If `true`, this Profile will be used for all Factors without their own Profile.  |
| `name` | String | The identifier for the Factor this Profile belongs to. |
| `settings` | Object | The settings for this Factor Profile. This object is empty as of this release.  |

#### Response Body

HTTP 200:
[Factor Profile Object](#factor-profile-object)

#### Example Usage

##### Request

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "PIN code",
  "default": false,
  "settings": {}
}' "https://{yourOktaDomain}/api/v1/org/factors/{factorName}/profiles/fprujkAbFkkulo9gj0g3"
```

##### Response

```json
{
    "id": "fprujkAbFkkulo9gj0g3",
    "name": "PIN code",
    "created": "2019-10-16T17:10:13.000Z",
    "lastUpdated": "2019-10-16T17:23:34.000Z",
    "settings": {},
    "default": false,
    "_links": {
        "self": {
            "href": "http://{yourOktaDomain}/api/v1/org/factors/okta_password/profiles/fprujkAbFkkulo9gj0g3",
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


### Delete a Factor Profile

<ApiOperation method="delete" url="/api/v1/org/factors/${factorName}/profiles/${profileId}" />

#### Request Path Parameters

| Parameter    | Type   | Description                                     |
| ------------ | ------ | ----------------------------------------------- |
| `factorName` | String | The identifier for the Factor this Profile belongs to. |
| `profileId`  | String | The Factor Profile's unique identifier.         |

#### Response Body

HTTP 200:
*No Content*

#### Example Usage

##### Request

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/org/factors/{factorName}/profiles/{profileId}"
```

##### Response

```bash
HTTP/1.1 200 OK
Content-Type: application/json
{}
```

### List Factor Profile Features

<ApiOperation method="get" url="/api/v1/org/factors/${factorName}/profiles/${profileId}/features" />

#### Request Path Parameters

| Parameter    | Type   | Description                                     |
| ------------ | ------ | ----------------------------------------------- |
| `factorName` | String | The identifier for the Factor this Profile belongs to. |
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
| `factorName` | String | The identifier for the Factor this Profile belongs to. |
| `featureId`  | String | The Factor Profile Feature's unique identifier. |
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

HTTP 200
Along with one of the [Factor Profile Feature Objects](#factor-profile-api-objects).


### Update a Factor Profile Feature

<ApiOperation method="put" url="/api/v1/org/factors/${factorName}/profiles/${profileId}/features/${featureId}" />

#### Request Path Parameters

| Parameter    | Type   | Description                                     |
| ------------ | ------ | ----------------------------------------------- |
| `factorName` | String | The identifier for the Factor this Profile belongs to. |
| `featureId`  | String | The Factor Profile Feature's unique identifier. |
| `profileId`  | String | The Factor Profile's unique identifier.         |

#### Request Body (Adoption)

| Property                              | Type   | Description                                                                                                 |
| ------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------- |
| `cardinality.max`                     | Number | The maximum number of factor instances user is allowed to enroll in.                                        |
| `cardinality.min`                     | Number | The minimum number of factor instances user must enroll in.                                                 |
| `selfService.eligibility`             | String | Indicates if factor may be enrolled. Possible values: `ALLOWED`, `NOT_ALLOWED`                               |
| `selfService.verificationMethod.type` | String | Indicates which factors may be used to verify an adoption operation. Possible values: `ANY_FACTOR`, `CHAIN` |

#### Request Body (Enrollment Source)

| Property                          | Type    | Description                                                                                                                                                                                     |
| --------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `source.simpleUserAttribute.name` | String  | The name of the user profile attribute which contains the email address to be used in the factor.                                                                                               |
| `verification.automatic.enabled`  | Boolean | Indicates if automatic verification is enabled.  If `false` the user will be prompted to verify their email address following enrollment.  It `true` the factor will be automatically verified. |

#### Request Body (Recovery)

| Property                  | Type   | Description                                                                                               |
| ------------------------- | ------ | --------------------------------------------------------------------------------------------------------- |
| `eligiblity`              | String | Indicates if factor may be recovered. Possible values: `ALLOWED`, `NOT_ALLOWED`                           |
| `verificationMethod.type` | String | Indicates which factors may be used to verify a recover operation. Possible values: `ANY_FACTOR`, `CHAIN` |

#### Request Body (Reuse)

| Property                 | Type              | Description                                                    |
| ------------------------ | ----------------- | -------------------------------------------------------------- |
| `prevention.minimumAge`  | String (ISO-8601) | Minimum age of enrollment before change is allowed (Optional). |
| `prevention.numPrevious` | Integer           | Number of previously used values to disallow.                  |


#### Request Body (String Validation)

| Property                     | Type                               | Description                                                                                                             |
| ---------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `complexity.minLength`       | Integer                            | Minimum length required.                                                                                                |
| `complexity.minLowerCase`    | Integer                            | Minimum number of lower case characters required.                                                                       |
| `complexity.minNumbers`      | Integer                            | Minimum number of numerical characters required.                                                                        |
| `complexity.minSymbols`      | Integer                            | Minimum number of symbols required.                                                                                     |
| `complexity.minUpperCase`    | Integer                            | Minimum number of upper case characters required.                                                                       |
| `exclude.attributeCriteria`  | Array (Attribute Criterion Object) | An object that contains a list of user profile properties that cannot be included in their password. See example below. |
| `exclude.common.source.type` | String (Enum)                      | Source settings. Possible values: `okta`                                                                                |


#### Request Body (Token Security)

| Property              | Type   | Description                                      |
| --------------------- | ------ | ------------------------------------------------ |
| `lifespan.ttl.period` | String | Token lifespan specified as an ISO 8601 duration |

#### Response Body

HTTP 200:
Along with one of the [Factor Profile Feature Objects](#factor-profile-api-objects).

#### Usage Example (String Validation)

##### Request

```bash
curl -X PUT \
  http://{yourOktaDomain}/api/v1/org/factors/okta_password/profiles/fprujkAbFkkulo9gj0g3/features/fpfujnTHiZ8x6dM5s0g3 \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
  -d '{
    "type": "string_validation",
    "id": "fpfujnTHiZ8x6dM5s0g3",
    "complexity": {
        "minLength": 12,
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
    }
}`
```

##### Response

```json
{
    "type": "string_validation",
    "id": "fpfujnTHiZ8x6dM5s0g3",
    "created": "2019-10-16T17:10:13.000Z",
    "lastUpdated": "2019-10-16T17:26:23.000Z",
    "complexity": {
        "minLength": 12,
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
            "href": "http://{yourOktaDomain}/api/v1/org/factors//profiles/fprujkAbFkkulo9gj0g3/features/fpfujnTHiZ8x6dM5s0g3",
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

#### Usage Example (Reuse)


##### Request

```bash
curl -X PUT \
  http://{yourOktaDomain}/api/v1/org/factors/okta_password/profiles/fprujkAbFkkulo9gj0g3/features/fpfujoVGkdWkDF8Qm0g3 \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
  -d '{
    "type": "reuse",
    "id": "fpfujoVGkdWkDF8Qm0g3",
    "prevention": {
        "numPrevious": 5,
        "minimumAge": "P1D"
    }
}'
```

##### Response

```json
{
    "type": "reuse",
    "id": "fpfujoVGkdWkDF8Qm0g3",
    "created": "2019-10-16T17:10:13.000Z",
    "lastUpdated": "2019-10-16T17:36:39.000Z",
    "prevention": {
        "numPrevious": 5,
        "minimumAge": "P1D"
    },
    "_links": {
        "self": {
            "href": "http://{yourOktaDomain}}/api/v1/org/factors//profiles/fprujkAbFkkulo9gj0g3/features/fpfujoVGkdWkDF8Qm0g3",
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

## Factor Profile API Objects

This API has one main object:

* Factor Profile Object

As well as a number of related Factor Profile Feature objects.

* Adoption
* Enrollment Source
* String Validation
* Reuse
* Token Security
* Recovery

### Factor Profile Object

#### Factor Profile Properties

The Factor Profile model defines several attributes:

| Property      | Type                                                            | Description                                                                     |
| ------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `_links`      | [JSON HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06) | Link relations for this object                                                  |
| `created`     | String (ISO-8601)                                               | Timestamp when the Factor Profile was created.                                  |
| `default`     | Boolean                                                         | If `true`, this Profile will be used for all Factors without their own Profile. |
| `id`          | String                                                          | Identifier of the Factor Profile.                                               |
| `lastUpdated` | String (ISO-8601)                                               | Timestamp when the Factor Profile was last modified.                            |
| `name`        | String                                                          | Name of this Factor Profile. This has to be unique for a given `factorName`.    |
| `settings`    | Object (Settings)                                                | The settings for this Factor Profile. This object is empty as of this release.  |

#### Factor Profile Example

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

### Adoption Factor Profile Feature Object

The Adoption Feature is available for all Factor Profiles. It controls the settings that determine when a Factor may be enrolled, or "adopted", for a user.

#### Adoption Factor Profile Feature Properties

| Property                                                         | Type                                                            | Description                                                                                                       |
| ---------------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `_links`                                                         | [JSON HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06) | Link relations for this object                                                                                    |
| `cardinality.max`                                                | Number                                                          | The maximum number of factor instances user is allowed to enroll in.                                              |
| `cardinality.min`                                                | Number                                                          | The minimum number of factor instances user must enroll in.                                                       |
| `created`                                                        | String (ISO-8601)                                               | Timestamp when the Factor Profile Feature was created.                                                            |
| `id`                                                             | String                                                          | Identifier of the Factor Profile Feature.                                                                         |
| `lastUpdated`                                                    | String (ISO-8601)                                               | Timestamp when the Factor Profile Feature was last modified.                                                      |
| `selfService.eligibility`                                        | String                                                          | Indicates if factor may be adopted. Possible values: `ALLOWED`, `NOT_ALLOWED`                                     |
| `selfService.verificationMethod.type`                            | String                                                          | Indicates which factors may be used to verify an adoption operation. Possible values: `ANY_FACTOR`, `CHAIN`       |
| `selfService.verificationMethod.chains.criteria.factorProfileId` | String                                                          | If the `verificationMethod` `type` is `chain`, this`id` of the Factor Profile will be used to verify the adoption |
| `type`                                                           | String (Enum)                                                   | Feature type, which for this feature is `adoption`                                                                                   |

#### Adoption Factor Profile Feature Example (without Chain)

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
                "href": "https://{yourOktaDomain}/api/v1/org/factors/{factorName}/profiles/fpruib7klOvW4pAuK0g3/features/fpfuicb8700wW0Jq20g3",
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

#### Adoption Factor Profile Feature Example (with Chain)

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
                "href": "https://{yourOktaDomain}/api/v1/org/factors/{factorName}/profiles/fpruib7klOvW4pAuK0g3/features/fpfuicb8700wW0Jq20g3",
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

### Enrollment Source Factor Profile Feature Object

The enrollment source feature is available for the Email Factor Profile. It controls the settings used when enrolling an email factor.

#### Enrollment Source Factor Profile Feature Properties

| Property                          | Type                                                           | Description                                                                                                                                                                                     |
| --------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_links`                          |  Object ([Feature Links](#factor-profile-feature-links-object))  | Link relations for this object                                                                                                                                                                  |
| `created`                         | String (ISO-8601)                                              | Timestamp when the Factor Profile Feature was created.                                                                                                                                          |
| `id`                              | String                                                         | Identifier of the Factor Profile Feature.                                                                                                                                                       |
| `lastUpdated`                     | String (ISO-8601)                                              | Timestamp when the Factor Profile Feature was last modified.                                                                                                                                    |
| `source.simpleUserAttribute.name` | String                                                         | The name of the user profile attribute which contains the email address to be used in the factor.                                                                                               |
| `type`                            | String (Enum)                                                  | Feature type, which for this Feature is `enrollment_source`                                                                                                                                                                                   |
| `verification.automatic.enabled`  | Boolean                                                        | Indicates if automatic verification is enabled.  If `false` the user will be prompted to verify their email address following enrollment.  It `true` the factor will be automatically verified. |

#### Enrollment Source Factor Profile Feature Example

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

### Recovery Factor Profile Feature Object

The recovery feature is available for all Factor Profiles. It controls the settings that govern how a user can recover their Factor if they lose access to it.

#### Recovery Factor Profile Feature Properties

| Property                                             | Type                                                           | Description                                                                                               |
| ---------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `_links`                                             | Object ([Feature Links](#factor-profile-feature-links-object)) | Link relations for this object                                                                            |
| `created`                                            | String (ISO-8601)                                              | Timestamp when the Factor Profile Feature was created.                                                    |
| `eligiblity`                                         | String                                                         | Indicates if factor may be recovered. Possible values: `ALLOWED`, `NOT_ALLOWED`                           |
| `id`                                                 | String                                                         | Identifier of the Factor Profile Feature.                                                                 |
| `lastUpdated`                                        | String (ISO-8601)                                              | Timestamp when the Factor Profile Feature was last modified.                                              |
| `type`                                               | String (Enum)                                                  | Feature type, which for this Feature is `recovery`                                                                                             |
| `verificationMethod.type`                            | String                                                         | Indicates which factors may be used to verify a recover operation. Possible values: `ANY_FACTOR`, `CHAIN` |
| `verificationMethod.chains.criteria.factorProfileId` | String                                                         | If the `verificationMethod` `type` is `CHAIN`, this Factor Profile will be used to verify the recovery.   |

#### Recovery Factor Profile Feature Example (Without Chain)

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
            "href": "https://{yourOktaDomain}/api/v1/org/factors/{factorName}/profiles/fpruib7klOvW4pAuK0g3/features/fpfuidgo5kiGGK3WU0g3",
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

#### Recovery Factor Profile Feature Example (with Chain)
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
            "href": "https://{yourOktaDomain}/api/v1/org/factors/{factorName}/profiles/fpruib7klOvW4pAuK0g3/features/fpfuidgo5kiGGK3WU0g3",
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
| `_links`                                             |  Object ([Feature Links](#factor-profile-feature-links-object))  | Link relations for this object                                                           |
| `created`                                            | String (ISO-8601)                                              | Timestamp when the Factor Profile Feature was created.                                   |
| `id`                                                 | String                                                         | Identifier of the Factor Profile Feature.                                                |
| `lastUpdated`                                        | String (ISO-8601)                                              | Timestamp when the Factor Profile Feature was last modified.                             |
| `type`                                               | String (Enum)                                                  | Feature type.                                                                            |


### Reuse Factor Profile Feature Object

The reuse feature is available for the password Factor Profile. It defines the reuse contraints on new enrollments with the following attributes:

#### Reuse Factor Profile Feature Properties

| Property                 | Type                                                            | Description                                                    |
| ------------------------ | --------------------------------------------------------------- | -------------------------------------------------------------- |
| `_links`                 |  Object ([Feature Links](#factor-profile-feature-links-object))  | Link relations for this object                                 |
| `created`                | String (ISO-8601)                                               | Timestamp when the Factor Profile Feature was created.         |
| `id`                     | String                                                          | Identifier of the Factor Profile Feature.                      |
| `lastUpdated`            | String (ISO-8601)                                               | Timestamp when the Factor Profile Feature was last modified.   |
| `prevention.minimumAge`  | String (ISO-8601)                                               | Minimum age of enrollment before change is allowed (Optional). |
| `prevention.numPrevious` | Integer                                                         | Number of previously used values to disallow.                  |
| `type`                   | String (Enum)                                                   | Feature type, which for this feature is `reuse`                                                  |

#### Reuse Factor Profile Feature Example

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

### String Validation Factor Profile Feature Object

The string validation feature is available for the password Factor Profile. It defines the validation constraints on new enrollments with the following attributes:

#### String Validation Factor Profile Feature Properties

| Property                     | Type                                                                                                               | Description                                                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `_links`                     | Object ([Feature Links](#factor-profile-feature-links-object))                                                      | Link relations for this object                               |
| `complexity.minLength`       | Integer                                                                                                            | Minimum length required.                                     |
| `complexity.minLowerCase`    | Integer                                                                                                            | Minimum number of lower case characters required.            |
| `complexity.minNumbers`      | Integer                                                                                                            | Minimum number of numerical characters required.             |
| `complexity.minSymbols`      | Integer                                                                                                            | Minimum number of symbols required.                          |
| `complexity.minUpperCase`    | Integer                                                                                                            | Minimum number of upper case characters required.            |
| `created`                    | String (ISO-8601)                                                                                                  | Timestamp when the Factor Profile Feature was created.       |
| `exclude.attributeCriteria`  | Array (Attribute Criterion Object) | Attribute criteria settings (Required but empty allowed).    |
| `exclude.common.source.type` | String (Enum)                                                                                                      | Source settings. Possible values: `okta`                     |
| `id`                         | String                                                                                                             | Identifier of the Factor Profile Feature.                    |
| `lastUpdated`                | String (ISO-8601)                                                                                                  | Timestamp when the Factor Profile Feature was last modified. |
| `type`                       | String (Enum)                                                                                                      | Feature type, which for this feature is `string_validation`                                               |

#### String Validation Factor Profile Feature Example

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

### Token Security Factor Profile Feature Object

The token security feature is available for the Email Factor Profile.  It controls the settings that govern the tokens issued by the email factor.

#### Token Security Factor Profile Feature Properties

| Property              | Type                                                           | Description                                                  |
| --------------------- | -------------------------------------------------------------- | ------------------------------------------------------------ |
| `_links`              | Object ([Feature Links](#factor-profile-feature-links-object)) | Link relations for this object                               |
| `created`             | String (ISO-8601)                                              | Timestamp when the Factor Profile Feature was created.       |
| `id`                  | String                                                         | Identifier of the Factor Profile Feature.                    |
| `lastUpdated`         | String (ISO-8601)                                              | Timestamp when the Factor Profile Feature was last modified. |
| `lifespan.ttl.period` | String                                                         | Token lifespan specified as an ISO 8601 duration             |
| `type`                | String (Enum)                                                  | Feature type, which for this feature is `token_security`.                                               |

#### Token Security Factor Profile Feature Example

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

### Factor Profile Feature Links Object

Specifies link relations (See [Web Linking](https://tools.ietf.org/html/rfc5988)) available for the current Factor Profile Feature. The Links Object is used for dynamic discovery of related resources.  The Links Object is **read-only**.

| Property | Type   | Description                 |
| -------- | ------ | --------------------------- |
| `self.href`   | String | Url that can be used to reference the Factor Profile Feature |
| `hints.allow` | Array (Strings) | An array of operations that can be performed on the Factor Profile Feature |

##### Factor Profile Feature Types

The types of Profile Features are:

* `adoption`
* `enrollment_source`
* `recovery`
* `reuse`
* `string_validation`
* `token_security`
