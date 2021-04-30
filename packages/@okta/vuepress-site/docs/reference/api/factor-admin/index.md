---
title: Factors Administration
beta: true
category: management
---

# Factors Administration API

The Okta Factors Administration API is a subset of the Factors API. It provides operations to activate or deactivate which factor types are available to use for multifactor authentication. Activating a factor type with this API doesn't enable multifactor authentication. It makes an activated factor available for multifactor authentication only.

After activating a factor with this API, you can't use it until you enable a policy that uses this factor. If there is only one factor enabled in the policy, this API can't disable that factor.

<ApiLifecycle access="beta" /> This API is a beta feature.

## Factor object

| Attribute     | Description                                                     | DataType                                                                       | MinLength | MaxLength | Nullable | Unique | Readonly |
| ------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------ | --------- | --------- | -------- | ------ | -------- |
| _links        | [discoverable resources](#links-object) related to the factor   | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                 |           |           | FALSE    | FALSE  | TRUE     |
| factorType    | type of factor                                                  | [Factor Type](#factor-type)                                                    |           |           | FALSE    | TRUE   | TRUE     |
| id            | the factor name                                                 | [Factor Name](#factor-name)                                                    |           |           | FALSE    | TRUE   | TRUE     |
| provider      | factor provider                                                 | [Provider Type](#provider-type)                                                |           |           | FALSE    | TRUE   | TRUE     |
| status        | status of factor                                                | `NOT_SETUP`, `PENDING_ACTIVATION`,  `ACTIVE`, `INACTIVE`                       |           |           | FALSE    | FALSE  | TRUE     |

### Factor name

The following factor names are available:

| Factor Name           | Description          |
| --------------------- | -----------          |
| `google_otp`          | Google Authenticator |
| `okta_otp`            | Okta Verify          |
| `okta_question`       | Security Question    |
| `okta_sms`            | SMS Authentication   |
| `rsa_token`           | RSA SecurID          |
| `symantec_vip`        | Symantec VIP         |

### Factor type

The following factor types are supported:

| Factor Type           | Description                                                                                                         |
| --------------------- | -----------                                                                                                         |
| `question`            | Additional security question                                                                                        |
| `sms`                 | SMS                                                                                                                 |
| `token:software:totp` | Software [Time-based One-time Password (TOTP)](http://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm) |
| `token`               | A software or hardware one-time password [OTP](http://en.wikipedia.org/wiki/One-time_password) device               |

### Provider type

The following providers are supported:

| Provider   | Description                   |
| ---------- | ----------------------------- |
| `GOOGLE`   | Google Integration            |
| `OKTA`     | Okta                          |
| `RSA`      | RSA SecurID Integration       |
| `SYMANTEC` | Symantec VIP Integration      |

### Links object

Specifies link relations (see [Web Linking](http://tools.ietf.org/html/rfc8288)) available for the current status of a factor using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification. This object is used for dynamic discovery of related resources and lifecycle operations.

| Link Relation Type | Description                        |
| ------------------ | -----------                        |
| activate           | Permits use of this factor for MFA |
| deactivate         | Denies use of this factor for MFA  |
| self               | The actual factor                  |


> **Note:** The Links Object is **read-only**.

## Factors Administration operations

### Get org factor

<ApiOperation method="get" url="/api/v1/org/factors" />

Lists factors in your organization

#### Request parameters

No required parameters

Optionally, you can add a filter based on the status. If desired, add the text `filter=status eq 'status_value'` where `status_value` is one of the following:  `NOT_SETUP`, `PENDING_ACTIVATION`,  `ACTIVE`,  or `INACTIVE`.

#### Response parameters

[Factor](#factor-object)

#### Request example


```bash
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X GET "https://${yourOktaDomain}/api/v1/org/factors"
```

#### Response example

```json
[
  {
    "id": "google_otp",
    "provider": "GOOGLE",
    "factorType": "token:software:totp",
    "status": "ACTIVE",
    "_links": {
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/org/factors/google_otp",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "deactivate": {
        "href": "https://${yourOktaDomain}/api/v1/org/factors/google_otp/lifecycle/deactivate",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },
  {
    "id": "okta_question",
    "provider": "OKTA",
    "factorType": "question",
    "status": "INACTIVE",
    "_links": {
      "activate": {
        "href": "https://${yourOktaDomain}/api/v1/org/factors/okta_question/lifecycle/activate",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/org/factors/okta_question",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      }
    }
  },
  {
    "id": "okta_otp",
    "provider": "OKTA",
    "factorType": "token:software:totp",
    "status": "ACTIVE",
    "_links": {
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/org/factors/okta_otp",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "deactivate": {
        "href": "http://ryour-domain.okta.com/api/v1/org/factors/okta_otp/lifecycle/deactivate",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },
  {
    "id": "okta_sms",
    "provider": "OKTA",
    "factorType": "sms",
    "status": "ACTIVE",
    "_links": {
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/org/factors/okta_sms",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "deactivate": {
        "href": "https://${yourOktaDomain}/api/v1/org/factors/okta_sms/lifecycle/deactivate",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },
  {
    "id": "symantec_vip",
    "provider": "SYMANTEC",
    "factorType": "token",
    "status": "NOT_SETUP",
    "_links": {
      "activate": {
        "href": "http://ryour-domain.okta.com/api/v1/org/factors/symantec_vip/lifecycle/activate",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/org/factors/symantec_vip",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      }
    }
  },
  {
    "id": "rsa_token",
    "provider": "RSA",
    "factorType": "token",
    "status": "NOT_SETUP",
    "_links": {
      "activate": {
        "href": "https://${yourOktaDomain}/api/v1/org/factors/rsa_token/lifecycle/activate",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/org/factors/rsa_token",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      }
    }
  }
]
```
### Activate SMS


<ApiOperation method="post" url="/api/v1/org/factors/okta_sms/lifecycle/activate" />

Allows multifactor authentication to use an SMS factor

#### Request parameters

None

#### Request example


```bash
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X POST "https://${yourOktaDomain}/api/v1/org/factors/okta_sms/lifecycle/activate"
```

#### Response example


```json
{
    "id": "okta_sms",
    "provider": "OKTA",
    "factorType": "sms",
    "status": "ACTIVE",
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/org/factors/okta_sms",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "deactivate": {
            "href": "https://${yourOktaDomain}/api/v1/org/factors/okta_sms/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Deactivate SMS


<ApiOperation method="post" url="/api/v1/org/factors/okta_sms/lifecycle/deactivate" />

Denies use of an SMS factor for multifactor authentication

#### Request parameters


None

#### Request example


```bash
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X POST "https://${yourOktaDomain}/api/v1/org/factors/okta_sms/lifecycle/deactivate"
```

#### Response example


```json
{
    "id": "okta_sms",
    "provider": "OKTA",
    "factorType": "sms",
    "status": "INACTIVE",
    "_links": {
        "activate": {
            "href": "https://${yourOktaDomain}/api/v1/org/factors/okta_sms/lifecycle/activate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/org/factors/okta_sms",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```

### Activate Okta Verify


<ApiOperation method="post" url="/api/v1/org/factors/okta_otp/lifecycle/activate" />

Allows multifactor authentication to use Okta Verify as a factor

#### Request parameters


None

#### Request example


```bash
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X POST "https://${yourOktaDomain}/api/v1/org/factors/okta_otp/lifecycle/activate"
```

#### Response example


```json
{
    "id": "okta_otp",
    "provider": "OKTA",
    "factorType": "token:software:totp",
    "status": "ACTIVE",
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/org/factors/okta_otp",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "deactivate": {
            "href": "https://${yourOktaDomain}/api/v1/org/factors/okta_otp/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Deactivate Okta Verify


<ApiOperation method="post" url="/api/v1/org/factors/okta_otp/lifecycle/deactivate" />

Denies use of Okta Verify for multifactor authentication

#### Request parameters


None

#### Request example


```bash
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X POST "https://${yourOktaDomain}/api/v1/org/factors/okta_otp/lifecycle/deactivate"
```

#### Response example


```json
{
    "id": "okta_otp",
    "provider": "OKTA",
    "factorType": "token:software:totp",
    "status": "INACTIVE",
    "_links": {
        "activate": {
            "href": "https://${yourOktaDomain}/api/v1/org/factors/okta_otp/lifecycle/activate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/org/factors/okta_otp",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```
