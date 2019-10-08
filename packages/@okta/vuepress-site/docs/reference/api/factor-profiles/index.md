---
title: Factor Profiles
category: management
---

# Factor Profiles (Authenticator) API

The Okta Factor Profiles API enables an Administrator configure which factor profiles (authenticators) are available to use for multi-factor authentication.

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
[Factor Profile Object](#factor-profile-object)

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

HTTP 204:
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
[Factor Profile Feature Object](#factor-profile-feature-object)

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
  }
}' "https://{yourOktaDomain}/api/v1/org/factors/{factorName}/profiles/{profileId}/features/{featureId}"
```

#### Response Types

HTTP 200:
[Factor Profile Feature Object](#factor-profile-feature-object)

## Factor Profiles

### Factor Profile Object

The Factor Profile model defines several attributes:

| Parameter   | Description                                                                                                              | Data Type                                          | Required | Default  |
| ----------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- | -------- | -------- |
| `id`          | Identifier of the factor profile.                                                                                        | String                                             | No       | Assigned |
| `name`        | Name of the factor profile.                                                                                              | String                                             | Yes      |          |
| `default`     | This is set to `true` on the profile to be used for a factor enrollment that does not have a profile associated with it. | Boolean                                            | Yes      |          |
| `settings`    | Settings for factor profile.                                                                                             | [Settings Object](#factor-profile-settings-object) | Yes      |          |
| `created`     | Timestamp when the factor profile was created.                                                                           | Date                                               | No       | Assigned |
| `lastUpdated` | Timestamp when the factor profile was last modified.                                                                     | Date                                               | No       | Assigned |
| `_links`      | Hyperlinks.                                                                                                              | [Links Object](#factor-profile-links-object)       | No       | Assigned |

### Factor Profile Settings Object

The factor profile settings object contains the settings for the particular factor type. Currently factor profiles can be created for the following factor types:

| Factor Name   | Description   |
| ------------- | ------------- |
| `okta_email`    | Okta Email    |
| `okta_password` | Okta Password |

#### Password Factor Profile Settings Object

TODO

#### Email Factor Profile Settings Object

TODO

### Factor Profile Links Object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the current factor profile. The Links Object is used for dynamic discovery of related resources.  The Links Object is **read-only**.

| Parameter | Description                                                  |
| --------- | ------------------------------------------------------------ |
| `self`      | The factor profile.                                          |
| `features`  | Action to retrieve the features of the given factor profile. |

## Factor Profile Features

Each factor profile contains one or more features of various types. Currently the `adoption`, `enrollment_source`, `string_validation`, `reuse`, `token_security` and `recovery` feature types are supported.  Some features are common to all profiles, and some are specific to a particular profile.

### Factor Profile Feature Object

The Factor Profile Feature model defines several common attributes:

| Parameter     | Description                                                  | Data Type                                            | Required | Default  |
| ------------- | ------------------------------------------------------------ | ---------------------------------------------------- | -------- | -------- |
| `id`            | Identifier of the factor profile feature.                    | String                                               | No       | Assigned |
| `type`          | Feature type.                                                | String (Enum)                                        | Yes      |          |
| `created`       | Timestamp when the factor profile feature was created.       | Date                                                 | No       | Assigned |
| `lastUpdated`   | Timestamp when the factor profile feature was last modified. | Date                                                 | No       | Assigned |
| `_links`        | Hyperlinks.                                                  | [Links Object](#factor-profile-feature-links-object) | No       | Assigned |

#### Adoption Factor Profile Feature Object

The adoption feature is available for all factor profiles and adds the following attributes:

| Parameter   | Description           | Data Type                                                                 | Required | Default  |
| ----------- | --------------------- | ------------------------------------------------------------------------- | -------- | -------- |
| `cardinality` | Cardinality settings. | [Cardinality Object](#adoption-cardinality-factor-profile-feature-object) | Yes      |          |

##### Adoption Cardinality Factor Profile Feature Object

| Parameter | Description                                                          | Data Type | Required | Default |
| --------- | -------------------------------------------------------------------- | --------- | -------- | ------- |
| `min`       | The minimum number of factor instances user must enroll in.          | Integer   | Yes      |         |
| `max`       | The maximum number of factor instances user is allowed to enroll in. | Integer   | Yes      |         |

 
 #### Enrollment Source Factor Profile Feature Object
 
 The enrollment source feature is available for the Email factor profile.  It controls the settings used when enrolling an email factor and adds the following attributes:
 
 
| Parameter   | Description           | Data Type                                                                 | Required | Default  |
| ----------- | --------------------- | ------------------------------------------------------------------------- | -------- | -------- |
| `source` | Specifies where the email address to be used with the factor is located| [Source Object](#enrollment-source-factor-profile-feature-source-object) | Yes      |         
|`verification`| Controls how the email factor is verified following enrollment. |[Verification Object](#enrollment-source-factor-profile-feature-verification-object)|Yes

 ##### Enrollment Source Factor Profile Feature Source Object

| Parameter   | Description           | Data Type                                                                 | Required | Default  |
| ----------- | --------------------- | ------------------------------------------------------------------------- | -------- | -------- |
| `simpleUserAttribute` | Specifies that a user profile attribute contains the email address. | [Simple User Attribute Object](#enrollment-source-factor-profile-feature-simple-user-attribute-object) | Yes      |         

###### Enrollment Source Factor Profile Feature Simple User Attribute Object

| Parameter   | Description           | Data Type                                                                 | Required | Default  |
| ----------- | --------------------- | ------------------------------------------------------------------------- | -------- | -------- |
| `name` | The name of the user profile attribute. | String | Yes      |         

 ##### Enrollment Source Factor Profile Feature Verification Object

| Parameter   | Description           | Data Type                                                                 | Required | Default  |
| ----------- | --------------------- | ------------------------------------------------------------------------- | -------- | -------- |
| `automatic` | Specifies that factor may be automatically verified following enrollment. | [Automatic Object](#enrollment-source-factor-profile-feature-automatic-object) | Yes      |         

###### Enrollment Source Factor Profile Feature Automatic Object

| Parameter   | Description           | Data Type                                                                 | Required | Default  |
| ----------- | --------------------- | ------------------------------------------------------------------------- | -------- | -------- |
| `enabled` | Indicates if automatic verification is enabled.  If `false` the user will be prompted to verifiy their email address followng enrollment| boolean | Yes      |         

Example:
 
```aidl
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
                "href": "https://domain.okta.com/api/v1/org/factors/profiles/fpruib7klOvW4pAuK0g3/features/fpfuieOAhoe6a5ISj0g3",
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

#### String Validation Factor Profile Feature Object

TODO

#### Reuse Factor Profile Feature Object

TODO

#### Token Security Factor Profile Feature Object

The token security  feature is available for the Email factor profile.  It controls the settings that govern the tokens issued by the email factor and adds the following attributes:

| Parameter   | Description           | Data Type                                                                 | Required | Default  |
| ----------- | --------------------- | ------------------------------------------------------------------------- | -------- | -------- |
| `lifespan` | Contains properties that control the token lifespan | [Source Object](#token-security-factor-profile-feature-lifespan-object) | Yes      |         


##### Token Security Factor Profile Feature Lifespan Object

| Parameter   | Description           | Data Type                                                                 | Required | Default  |
| ----------- | --------------------- | ------------------------------------------------------------------------- | -------- | -------- |
| `ttl` | Allows the token lifespan to be specified as a TTL (time to live) duration | [TTL Object](#token-security-factor-profile-feature-ttl-object) | Yes      |         


###### Token Security Factor Profile Feature TTL Object

| Parameter   | Description           | Data Type                                                                 | Required | Default  |
| ----------- | --------------------- | ------------------------------------------------------------------------- | -------- | -------- |
| `period` | The lifespan of the token specified as an ISO 8601 duration  | String | Yes      |         


Example:
```aidl
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
                "href": "http://domain.okta.com/api/v1/org/factors//profiles/fpruib7klOvW4pAuK0g3/features/fpfuifa1aEuPznkem0g3",
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


#### Recovery Factor Profile Feature Object

TODO

### Factor Profile Feature Links Object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the current factor profile feature. The Links Object is used for dynamic discovery of related resources.  The Links Object is **read-only**.

| Parameter | Description                 |
| --------- | --------------------------- |
| `self`      | The factor profile feature. |
