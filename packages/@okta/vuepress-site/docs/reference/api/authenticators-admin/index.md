---
title: Authenticators Administration
category: other
---

# Authenticators Administration API

<ApiLifecycle access="ie" />

The Authenticators Administration API enables an Org Administrator to configure which Authenticators are available to end users for use when signing in to applications.

End users are required to use one or more Authenticators depending on the security requirements of the [authentication policy](/docs/reference/api/policy/#authentication-policy).

Okta Identity Engine currently supports Authenticators for the following factors:

**Knowledge-based:**

* Password
* Security Question

**Possession-based:**

* Phone (SMS, Voice Call)
* Email
* WebAuthn
* Duo
* Custom App <ApiLifecycle access="ea" />

## Get started

Explore the Authenticators Administration API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/836eb57018cba45da121)

## Authenticators Administration operations

The Authenticators Administration API has the following CRUD operations:

<!-- * [Create Authenticator](#create-authenticator)-->
* [List Authenticators](#list-authenticators)
* [Get an Authenticator by ID](#get-an-authenticator-by-id)
* [Update Authenticator settings](#update-authenticator-settings)
* [Activate an Authenticator](#activate-an-authenticator)
* [Deactivate an Authenticator](#deactivate-an-authenticator)
* [List all Methods of an Authenticator](#list-all-methods-of-an-authenticator)
* [Retrieve an Authenticator Method](#retrieve-an-authenticator-method)
* [Replace an Authenticator Method](#replace-an-authenticator-method)
* [Activate an Authenticator Method](#activate-an-authenticator-method)
* [Deactivate an Authenticator Method](#deactivate-an-authenticator-method)

<!--
### Create Authenticator

<ApiOperation method="post" url="/api/v1/authenticators" />

 Create an Authenticator

> **Note:** You can use this operation as part of the "Create a custom authenticator" flow. See the [Custom authenticator integration guide](/docs/guides/authenticators-custom-authenticator/android/main/).

#### Request path parameters

N/A

#### Request query parameters

> **Note:** The `activate` parameter is optional. If you don't include the `activate` parameter with a value of `TRUE` when creating an authenticator, you need to activate the authenticator later in the Admin Console or by using the [Activate an Authenticator](#activate-an-authenticator) operation.

| Parameter | Description                                                                                           | Param Type | DataType      | Required | Default |
| --------- | ----------------------------------------------------------------------------------------------------- | ---------- | ------------- | -------- | ------- |
| activate  | Executes the [activation lifecycle](#activate-an-authenticator) operation when Okta creates the authenticator | Query      | Boolean       | FALSE    | TRUE    |

#### Request body

An [Authenticator Object](#authenticator-object) that you need created

#### Response body

The created [Authenticator](#authenticator-object)

#### Use example

Returns the created Authenticator with an `id` value of `aut9gnvcjUHIWb37J0g4`:

#### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "User-Agent: Mozilla/5.0 (${systemInformation}) ${platform} (${platformDetails}) ${extensions}" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "key": "duo",
    "name": "Duo Security",
    "provider": {
        "type": "DUO",
        "configuration": {
            "userNameTemplate": {
                "template": "oktaId"
            },
            "integrationKey": "testIntegrationKey",
            "secretKey": "testSecretKey",
            "host":"https://api-xxxxxxxx.duosecurity.com"
        }
    }
}
' "https://{yourOktaDomain}/api/v1/authenticators"
```

#### Response

```json
{
    "type": "app",
    "id": "aut9gnvcjUHIWb37J0g4",
    "key": "duo",
    "status": "ACTIVE",
    "name": "Duo Security",
    "created": "2022-07-15T21:14:02.000Z",
    "lastUpdated": "2022-07-15T21:14:02.000Z",
    "settings": {},
    "provider": {
        "type": "DUO",
        "configuration": {
            "host": "https://api-xxxxxxxx.duosecurity.com",
            "userNameTemplate": {
                "template": "oktaId"
            }
        }
    },
    "_links": {
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut5gnvcjUHIWb25J0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        },
        "deactivate": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut5gnvcjUHIWb25J0g4/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "methods": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut5gnvcjUHIWb25J0g4/methods",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```
-->

### List Authenticators

<ApiOperation method="get" url="/api/v1/authenticators" />

Lists all available Authenticators

#### Request query parameters

N/A

#### Response body

An array of [Authenticator Objects](#authenticator-object)

#### Use example

This request returns all available Authenticators:

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "User-Agent: Mozilla/5.0 (${systemInformation}) ${platform} (${platformDetails}) ${extensions}" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authenticators"
```

##### Response

```json
[
  {
    "type": "email",
    "id": "aut1nbsPHh7jNjjyP0g4",
    "key": "okta_email",
    "status": "ACTIVE",
    "name": "Email",
    "created": "2020-07-26T21:05:23.000Z",
    "lastUpdated": "2020-07-28T21:45:52.000Z",
    "settings": {
            "allowedFor": "any",
            "tokenLifetimeInMinutes": 5
     },
    "_links": {
      "self": {
        "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nbsPHh7jNjjyP0g4",
        "hints": {
          "allow": [
            "GET",
            "PUT"
          ]
        }
      },
      "methods": {
        "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nbsPHh7jNjjyP0g4/methods",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "deactivate": {
        "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nbsPHh7jNjjyP0g4/lifecycle/deactivate",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },
  {
    "type": "password",
    "id": "aut1nbtrJKKA9m45a0g4",
    "key": "okta_password",
    "status": "ACTIVE",
    "name": "Password",
    "created": "2020-07-26T21:05:23.000Z",
    "lastUpdated": "2020-07-26T21:05:23.000Z",
    "_links": {
      "self": {
        "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nbtrJKKA9m45a0g4",
        "hints": {
          "allow": [
            "GET",
            "PUT"
          ]
        }
      },
      "methods": {
        "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nbtrJKKA9m45a0g4/methods",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      }
    }
  },
  {
    "type": "phone",
    "id": "aut1nbuyD8m1ckAYc0g4",
    "key": "phone_number",
    "status": "INACTIVE",
    "name": "Phone",
    "created": "2020-07-26T21:05:23.000Z",
    "lastUpdated": "2020-07-29T00:21:29.000Z",
    "settings": {
            "allowedFor": "none"
     },
    "_links": {
      "self": {
        "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nbuyD8m1ckAYc0g4",
        "hints": {
          "allow": [
            "GET",
            "PUT"
          ]
        }
      },
      "methods": {
        "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nbuyD8m1ckAYc0g4/methods",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "activate": {
        "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nbuyD8m1ckAYc0g4/lifecycle/activate",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },
  {
    "type": "security_key",
    "id": "aut1nd8PQhGcQtSxB0g4",
    "key": "webauthn",
    "status": "ACTIVE",
    "name": "Security Key or Biometric",
    "created": "2020-07-26T21:16:37.000Z",
    "lastUpdated": "2020-07-27T18:59:30.000Z",
    "_links": {
      "self": {
        "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4",
        "hints": {
          "allow": [
            "GET",
            "PUT"
          ]
        }
      },
      "methods": {
        "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4/methods",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "deactivate": {
        "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4/lifecycle/deactivate",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },
  {
    "type": "security_question",
    "id": "aut1nbvIgEenhwE6c0g4",
    "key": "security_question",
    "status": "ACTIVE",
    "name": "Security Question",
    "created": "2020-07-26T21:05:23.000Z",
    "lastUpdated": "2020-07-26T21:05:23.000Z",
    "_links": {
      "self": {
        "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nbvIgEenhwE6c0g4",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "methods": {
        "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nbvIgEenhwE6c0g4/methods",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "deactivate": {
        "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nbvIgEenhwE6c0g4/lifecycle/deactivate",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  }
]
```

### Get an Authenticator by ID

<ApiOperation method="get" url="/api/v1/authenticators/${authenticatorId}" />

Fetches an Authenticator by its `id`

#### Request path parameters

| Parameter          | Type   | Description                                            |
| ------------------ | ------ | ------------------------------------------------------ |
| `authenticatorId`  | String | The Authenticator's unique identifier                |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

The requested [Authenticator](#authenticator-object)

#### Use example

Returns the Authenticator with an `id` value of `aut1nd8PQhGcQtSxB0g4`:

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "User-Agent: Mozilla/5.0 (${systemInformation}) ${platform} (${platformDetails}) ${extensions}" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4"
```

##### Response

```json
{
    "type": "security_key",
    "id": "aut1nd8PQhGcQtSxB0g4",
    "key": "webauthn",
    "status": "ACTIVE",
    "name": "Security Key or Biometric",
    "created": "2020-07-26T21:16:37.000Z",
    "lastUpdated": "2020-07-27T18:59:30.000Z",
    "_links": {
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        },
        "methods": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4/methods",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "deactivate": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Update Authenticator settings

<ApiOperation method="put" url="/api/v1/authenticators/${authenticatorId}" />

Updates settings on an Authenticator

#### Request path parameters

| Parameter          | Type   | Description                           |
| ------------------ | ------ | --------------------------------------|
| `authenticatorId`  | String | The Authenticator's unique identifier |

#### Request body

An [Authenticator Object](#authenticator-object)

The `name` attribute is required, `settings` object is optional and has values based on Authenticator key.

#### Response body

The updated [Authenticator](#authenticator-object)

#### Use example

Returns the updated Authenticator with an `id` value of `aut1eyvv8siH9G6qw1d7`:

##### Request

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "User-Agent: Mozilla/5.0 (${systemInformation}) ${platform} (${platformDetails}) ${extensions}" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "Phone",
  "settings": {
    "allowedFor": "recovery"
  }
}' "https://${yourOktaDomain}/api/v1/authenticators/aut1eyvv8siH9G6qw1d7"
```

##### Response

```json
{
    "type": "phone",
    "id": "aut1eyvv8siH9G6qw1d7",
    "key": "phone_number",
    "status": "ACTIVE",
    "name": "Phone",
    "created": "2021-09-23T21:11:22.000Z",
    "lastUpdated": "2021-10-19T20:57:27.000Z",
    "settings": {
        "allowedFor": "recovery"
    },
    "_links": {
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1eyvv8siH9G6qw1d7",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        },
        "deactivate": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1eyvv8siH9G6qw1d7/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "methods": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1eyvv8siH9G6qw1d7/methods",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```

### Activate an Authenticator

<ApiOperation method="post" url="/api/v1/authenticators/${authenticatorId}/lifecycle/activate" />

Activates an Authenticator

#### Request path parameters

| Parameter          | Type   | Description                                            |
| ------------------ | ------ | ------------------------------------------------------ |
| `authenticatorId`  | String | The Authenticator's unique identifier               |


#### Response body

Returns an [Authenticator](#authenticator-object)

#### Use example

Sets the `status` of the specified Authenticator to `ACTIVE`

##### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "User-Agent: Mozilla/5.0 (${systemInformation}) ${platform} (${platformDetails}) ${extensions}" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4/lifecycle/activate"
```

##### Response

```json
{
    "type": "security_key",
    "id": "aut1nd8PQhGcQtSxB0g4",
    "key": "webauthn",
    "status": "ACTIVE",
    "name": "Security Key or Biometric",
    "created": "2020-07-26T21:16:37.000Z",
    "lastUpdated": "2020-07-26T21:59:33.000Z",
    "_links": {
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        },
        "methods": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4/methods",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "deactivate": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Deactivate an Authenticator

<ApiOperation method="POST" url="/api/v1/authenticators/${authenticatorId}/lifecycle/deactivate" />

Deactivates an Authenticator

#### Request path parameters

| Parameter          | Type   | Description                                            |
| ------------------ | ------ | ------------------------------------------------------ |
| `authenticatorId`  | String | The Authenticator's unique identifier                 |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Returns an [Authenticator](#authenticator-object).

#### Use example

Sets the `status` of the specified Authenticator to `INACTIVE`

##### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "User-Agent: Mozilla/5.0 (${systemInformation}) ${platform} (${platformDetails}) ${extensions}" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4/lifecycle/deactivate"
```

##### Response

```json
{
    "type": "security_key",
    "id": "aut1nd8PQhGcQtSxB0g4",
    "key": "webauthn",
    "status": "INACTIVE",
    "name": "Security Key or Biometric",
    "created": "2020-07-26T21:16:37.000Z",
    "lastUpdated": "2020-07-26T22:01:46.000Z",
    "_links": {
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        },
        "methods": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4/methods",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "activate": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4/lifecycle/activate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

##### Error response example

If the Authenticator that you are trying to deactivate is currently in use as part of an active policy, you receive a 403 error:

```json
{
    "errorCode": "E0000148",
    "errorSummary": "Cannot disable this authenticator because it is enabled in one or more policies. To continue, disable the authenticator in these policies.",
    "errorLink": "E0000148",
    "errorId": "oae2VGZs7HVR6CuUdwmtkE-Ig",
    "errorCauses": [
        {
            "errorSummary": "Self-Service Password Management Policies: Legacy Policy, Default Policy"
        },
        {
            "errorSummary": "Authenticator Enrollment Policies: Default Policy"
        }
    ]
}
```

### List all Methods of an Authenticator

<ApiOperation method="get" url="/api/v1/authenticators/${authenticatorId}/methods" />

Lists all Methods of an Authenticator identified by `authenticatorId`

#### Request path parameters

| Parameter          | Type   | Description                           |
| ------------------ | ------ | --------------------------------------|
| `authenticatorId`  | String | The Authenticator's unique identifier |

#### Response body

An array of [Authenticator Method objects](#authenticator-method-object)

### Retrieve an Authenticator Method

<ApiOperation method="GET" url="/api/v1/authenticators/${authenticatorId}/methods/${methodType}" />

Retrieves an Authenticator Method identified by `authenticatorId` and `methodType`

#### Request path parameters

| Parameter          | Type   | Description                                            |
| ------------------ | ------ | ------------------------------------------------------ |
| `authenticatorId`  | String | The Authenticator's unique identifier                 |
| `methodType`  | String (Enum)| The type of authenticator method. Possible values: `cert`, `duo`, `email`, `idp`, `otp`, `password`, `push`, `security_question`, `signed_nonce`, `sms`, `totp`, `voice`, or `webauthn`            |

#### Response body

An [Authenticator Method object](#authenticator-method-object)

### Replace an Authenticator Method

<ApiOperation method="PUT" url="/api/v1/authenticators/${authenticatorId}/methods/${methodType}" />

Replaces the properties of an Authenticator Method identified by `authenticatorId` and `methodType`

#### Request path parameters

| Parameter          | Type   | Description                                            |
| ------------------ | ------ | ------------------------------------------------------ |
| `authenticatorId`  | String | The Authenticator's unique identifier                 |
| `methodType`  | String (Enum)| The type of authenticator method. Possible values: `cert`, `duo`, `email`, `idp`, `otp`, `password`, `push`, `security_question`, `signed_nonce`, `sms`, `totp`, `voice`, or `webauthn`            |

#### Request body

| Property    | Type           | Description   |
| ----------- | -------------- | ------------- |
| `status`  | String (Enum) | The status of the authenticator method. Possible values: `ACTIVE` or `INACTIVE`          |
| `type`  | String (Enum)| The type of authenticator method. Possible values: `cert`, `duo`, `email`, `idp`, `otp`, `password`, `push`, `security_question`, `signed_nonce`, `sms`, `totp`, `voice`, or `webauthn`            |

#### Response body

Returns an updated [Authenticator Method object](#authenticator-method-object)

### Activate an Authenticator Method

<ApiOperation method="POST" url="/api/v1/authenticators/${authenticatorId}/methods/${methodType}/lifecycle/activate" />

Activates an Authenticator Method identified by `authenticatorId` and `methodType`

#### Request path parameters

| Parameter          | Type   | Description                                            |
| ------------------ | ------ | ------------------------------------------------------ |
| `authenticatorId`  | String | The Authenticator's unique identifier                 |
| `methodType`  | String (Enum)| The type of authenticator method. Possible values: `cert`, `duo`, `email`, `idp`, `otp`, `password`, `push`, `security_question`, `signed_nonce`, `sms`, `totp`, `voice`, or `webauthn`            |

#### Response body

An [Authenticator Method object](#authenticator-method-object)

### Deactivate an Authenticator Method

<ApiOperation method="POST" url="/api/v1/authenticators/${authenticatorId}/methods/{methodType}/lifecycle/deactivate" />

Deactivates an Authenticator Method identified by `authenticatorId` and `methodType`

#### Request path parameters

| Parameter          | Type   | Description                                            |
| ------------------ | ------ | ------------------------------------------------------ |
| `authenticatorId`  | String | The Authenticator's unique identifier                 |
| `methodType`  | String (Enum)| The type of authenticator method. Possible values: `cert`, `duo`, `email`, `idp`, `otp`, `password`, `push`, `security_question`, `signed_nonce`, `sms`, `totp`, `voice`, or `webauthn`            |

#### Response body

An [Authenticator Method object](#authenticator-method-object)

## Authenticators Administration API objects

### Authenticator object

#### Authenticator properties

| Property      | Type                                                            | Description                                                                     | Applies to Authenticator Key |
| ------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------- |------------------------------|
| `_links`      | [JSON HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06) | Link relations for this object                             | All Authenticators |
| `created`     | String (ISO-8601)                                               | Timestamp when the Authenticator was created               | All Authenticators |
| `id`          | String                                                          | A unique identifier for the Authenticator                  | All Authenticators |
| `key`         | String                                                          | A human-readable string that identifies the Authenticator. Values include: `custom_app`, `duo`, `okta_email`, `google_otp`, `external_idp`, `okta_password`, `okta_verify`, `onprem_mfa`, `phone_number`, `security_key`, `security_question`, `symantec_vip`, `smart_card_idp`, `webauthn`, or `yubikey_token` | All Authenticators |
| `status`      | `ACTIVE`,`INACTIVE`                                             | Status of the Authenticator                                | All Authenticators |
| `lastUpdated` | String (ISO-8601)                                               | Timestamp when the Authenticator was last modified         | All Authenticators |
| `name`        | String                                                          | Display name of the Authenticator                         | All Authenticators |
| `type`        | String (Enum)                                                   | The type of Authenticator. Values include: `password`, `security_question`, `phone`, `email`, `app`, `federated`, and `security_key`. | All Authenticators |
| `settings.allowedFor`        | String (Enum)                                    | The allowed types of uses for the Authenticator. Values include: `recovery`, `sso`, `any`, and `none`. | `okta_email`, `phone_number`, `security_question` |
| `settings.tokenLifetimeInMinutes` | Number                                      | Specifies the lifetime of an `email` token and only applies to the `email` Authenticator type. Default value is `5` minutes. | `okta_email` |
| `settings.compliance.fips` | String (Enum) | `REQUIRED`, `OPTIONAL` | `okta_verify` |
| `settings.channelBinding.style` | String | `NUMBER_CHALLENGE` | `okta_verify` |
| `settings.channelBinding.required` | String (Enum) | `NEVER`, `ALWAYS`, `HIGH_RISK_ONLY` | `okta_verify` |
| `settings.userVerification` | String (Enum) | `REQUIRED`, `PREFERRED` | `okta_verify`, `custom_app` |
| `settings.appInstanceId` | String | The application instance ID. For `custom_app`, you need to create an OIDC native app using the [Apps API](/docs/reference/api/apps/) with `Authorization Code` and `Refresh Token` grant types. You can leave both `Sign-in redirect URIs` and `Sign-out redirect URIs` as the default values. | `okta_verify`, `custom_app` |
| `provider.type` | String | Provider type. Supported value for Duo: `DUO`. Supported value for Custom App: `PUSH` | `duo` and other authenticators making use of the provider object |
| `provider.configuration.host` | String | The Duo Security API hostname | `duo` |
| `provider.configuration.integrationKey` | String | The Duo Security integration key | `duo` |
| `provider.configuration.secretKey` | String | The Duo Security secret key | `duo` |
| `provider.configuration.userNameTemplate.template` | String | The Duo Security user template name | `duo` |
| `agreeToTerms` | Boolean | A value of `true` indicates that the administrator accepts the [terms](https://www.okta.com/privacy-policy/) for creating a new authenticator. Okta requires that you accept the terms when creating a new `custom_app` authenticator. Other authenticators don't require this field. | `custom_app`|
<!--
| `provider.configuration.apns.id`| String | ID of the APNs (Apple Push Notification Service) [configuration](/docs/reference/api/push-providers/) | `custom_app` |
| `provider.configuration.apns.id`| String | AppBundleId for the APNs (Apple Push Notification Service) [configuration](/docs/reference/api/push-providers/) | `custom_app` |
| `provider.configuration.apns.id`| String | DebugAppBundleId for the APNs (Apple Push Notification Service) [configuration](/docs/reference/api/push-providers/) | `custom_app` |
| `provider.configuration.fcm.id` | String  | ID of the FCM (Firebase Cloud Messaging Service) [configuration](/docs/reference/api/push-providers/) | `custom_app` |
-->


#### Example Email Authenticator

```json
{
  "type": "email",
  "id": "aut1nbsPHh7jNjjyP0g4",
  "key": "okta_email",
  "status": "ACTIVE",
  "name": "Email",
  "created": "2020-07-26T21:05:23.000Z",
  "lastUpdated": "2020-07-28T21:45:52.000Z",
  "settings": {
            "allowedFor": "recovery",
            "tokenLifetimeInMinutes": 5
   },
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nbsPHh7jNjjyP0g4",
      "hints": {
        "allow": [
          "GET",
          "PUT"
        ]
      }
    },
    "methods": {
      "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nbsPHh7jNjjyP0g4/methods",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "deactivate": {
      "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nbsPHh7jNjjyP0g4/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Example Password Authenticator

```json
{
  "type": "password",
  "id": "aut1nbtrJKKA9m45a0g4",
  "key": "okta_password",
  "status": "ACTIVE",
  "name": "Password",
  "created": "2020-07-26T21:05:23.000Z",
  "lastUpdated": "2020-07-26T21:05:23.000Z",
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nbtrJKKA9m45a0g4",
      "hints": {
        "allow": [
          "GET",
          "PUT"
        ]
      }
    },
    "methods": {
      "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nbtrJKKA9m45a0g4/methods",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
```

#### Example Phone Authenticator

```json
{
  "type": "phone",
  "id": "aut1nbuyD8m1ckAYc0g4",
  "key": "phone_number",
  "status": "ACTIVE",
  "name": "Phone",
  "created": "2020-07-26T21:05:23.000Z",
  "lastUpdated": "2020-07-29T00:21:29.000Z",
  "settings": {
            "allowedFor": "sso"
  },
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nbuyD8m1ckAYc0g4",
      "hints": {
        "allow": [
          "GET",
          "PUT"
        ]
      }
    },
    "methods": {
      "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nbuyD8m1ckAYc0g4/methods",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "activate": {
      "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nbuyD8m1ckAYc0g4/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Example Security Question Authenticator

```json
{
  "type": "security_question",
  "id": "aut1nbvIgEenhwE6c0g4",
  "key": "security_question",
  "status": "ACTIVE",
  "name": "Security Question",
  "created": "2020-07-26T21:05:23.000Z",
  "lastUpdated": "2020-07-26T21:05:23.000Z",
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nbvIgEenhwE6c0g4",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "methods": {
      "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nbvIgEenhwE6c0g4/methods",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "deactivate": {
      "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nbvIgEenhwE6c0g4/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Example WebAuthn Authenticator

```json
{
  "type": "security_key",
  "id": "aut1nd8PQhGcQtSxB0g4",
  "key": "webauthn",
  "status": "ACTIVE",
  "name": "Security Key or Biometric",
  "created": "2020-07-26T21:16:37.000Z",
  "lastUpdated": "2020-07-27T18:59:30.000Z",
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4",
      "hints": {
        "allow": [
          "GET",
          "PUT"
        ]
      }
    },
    "methods": {
      "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4/methods",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "deactivate": {
      "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Example Duo Authenticator

```json
{
    "type": "app",
    "id": "aut5gnvcjUHIWb25J0g4",
    "key": "duo",
    "status": "ACTIVE",
    "name": "Duo Security",
    "created": "2022-07-15T21:14:02.000Z",
    "lastUpdated": "2022-07-15T21:14:02.000Z",
    "settings": {},
    "provider": {
        "type": "DUO",
        "configuration": {
            "host": "https://api-xxxxxxxx.duosecurity.com",
            "userNameTemplate": {
                "template": "oktaId"
            }
        }
    },
    "_links": {
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut5gnvcjUHIWb25J0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        },
        "deactivate": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut5gnvcjUHIWb25J0g4/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "methods": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut5gnvcjUHIWb25J0g4/methods",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```

#### Example Custom App Authenticator <ApiLifecycle access="ea" />

```json
{
    "type": "app",
    "id": "aut67ryPSDvEpomfS0g5",
    "key": "custom_app",
    "status": "ACTIVE",
    "name": "Custom App Authenticator",
    "created": "2022-06-24T21:02:50.000Z",
    "lastUpdated": "2022-06-24T21:02:50.000Z",
    "settings": {
        "appInstanceId": "0oa33z6AFuYWYjdBf0g4",
        "userVerification": "PREFERRED",
        "oauthClientId": "myCustomAppClientId"
    },
    "provider": {
        "type": "PUSH",
        "configuration": {
            "apns": {
                "id": "ppc1buciB5V7ZdcB70g4",
                "appBundleId":"com.my.app.release",
                "debugAppBundleId":"com.my.app.debug"
            },
            "fcm": {
                "id": "ppc38rxEr5dEKqDD10g4"
            }
        }
    },
    "_links": {
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut36ryPSDvEpomfS0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        },
        "deactivate": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut36ryPSDvEpomfS0g4/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "methods": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut36ryPSDvEpomfS0g4/methods",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```

#### Example Smart Card Authenticator

```json
{
  "type": "federated",
  "id": "aut4dkon7d3YCnOMg0g7",
  "key": "smart_card_idp",
  "status": "ACTIVE",
  "name": "Smart Card IdP",
  "created": "2023-02-02T21:47:49.000Z",
  "lastUpdated": "2023-02-02T21:47:49.000Z",
  "provider": {
    "type": "SMART_CARD",
    "configuration": {
      "idpIds": [
        "0oa4ct36utYyaAK8k0g7"
      ]
    }
  },
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/authenticators/aut4dkon7d3YCnOMg0g7",
      "hints": {
        "allow": [
          "GET",
          "PUT"
        ]
      }
    },
    "deactivate": {
      "href": "https://{yourOktaDomain}/api/v1/authenticators/aut4dkon7d3YCnOMg0g7/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "methods": {
      "href": "https://{yourOktaDomain}/api/v1/authenticators/aut4dkon7d3YCnOMg0g7/methods",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
```

### Authenticator Method object

#### Authenticator Method properties

| Property | Type | Description  | Applies to Authenticator Method type |
| -------- | ---- | ------------ | ------------------------------------ |
| `_links` | [JSON HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06) | Link relations for this Authenticator Method object  |  All Authenticator Methods |
| `settings` | [Authenticator Method Settings object](#authenticator-method-settings-object) | Specific settings for the authenticator method  | `otp`, `push`, `signed_nonce`, `totp`, `webauthn` |
| `status` | String (Enum) | The status of the authenticator method. Possible values: `ACTIVE` or `INACTIVE` | All Authenticator Methods |
| `type` | String (Enum) | The type of authenticator method. Possible values: `cert`, `duo`, `email`, `idp`, `otp`, `password`, `push`, `security_question`, `signed_nonce`, `sms`, `totp`, `voice`, or `webauthn`  |  All Authenticator Methods |

### Authenticator Method Settings object

#### Authenticator Method Settings properties

> **Note:** The `aaguidGroups` property supports the [Early Access](/docs/reference/releases-at-okta/#early-access-ea) (Self-Service) Allow List for FIDO2 (WebAuthn) Authenticators feature. Enable the feature for your org from the **Settings** > **Features** page in the Admin Console.
>
> This feature has several limitations when enrolling a security key:
> * Enrollment is currently unsupported on Firefox.
> * Enrollment is currently unsupported on Chrome if User Verification is set to `DISCOURAGED` and a PIN is set on the security key.
> * If prompted during enrollment, users must allow Okta to see the make and model of the security key.

| Property | Type | Description  | Applies to Authenticator Method type |
| -------- | ---- | ------------ | ------------------------------------ |
| `aaguidGroups` <ApiLifecycle access="ea" /> | Array of [AAGUID Group](#aaguid-group-object) | The FIDO2 AAGUID groups available to the WebAuthn authenticator. | `webauthn` |
| `acceptableAdjacentIntervals` | Integer | The number of acceptable adjacent intervals, also known as the clock drift interval. This setting allows you to build in tolerance for any time difference between the token and the server. For example, with a `timeIntervalInSeconds` of 60 seconds and an `acceptableAdjacentIntervals` value of 5, Okta accepts passcodes within 300 seconds (60 * 5) before or after the end user enters their code. Possible values: 0&ndash;10 | `otp` |
| `algorithms` | String (Enum) | Algorithms supported. Possible values: `RS256`, `ES256`, `HMACSHA1`, `HMACSHA256`, or `HMACSHA512` | `otp`, `totp`, `push`, `signed_nonce` |
| `attachment` | String (Enum) | Method attachment. Possible values: `ANY`, `BUILT_IN`, or `ROAMING`  | `webauthn` |
| `encoding` | String (Enum) | The shared secret encoding. Possible values: `Base32`, `Base64`, or `Hexadecimal`  | `otp`, `totp` |
| `keyProtection` | String (Enum) | Indicates whether you must use a hardware key store for `push` and `signed_nonce` methods or if any type of key store is allowed. Supported values: `ANY` or `HARDWARE`  | `push`, `signed_nonce`|
| `passCodeLength` | Integer | Number of digits in an OTP value  | `otp`, `totp` |
| `protocol` | String (Enum) | The protocol used. Possible values: `SYMANTEC`,`TOTP`, or `YUBICO` | `otp` |
| `showSignInWithOV` | String (Enum) | Controls whether to show the **Sign in with Okta Verify** button on the Sign-In Widget for the `signed_nonce` method. Possible Values: `ALWAYS` or `NEVER`  | `signed_nonce` |
| `timeIntervalInSeconds` | Integer | Time interval for TOTP in seconds | `otp`, `totp` |
| `userVerification` | String (Enum) | User verification setting. See [User Verification](https://developers.yubico.com/WebAuthn/WebAuthn_Developer_Guide/User_Presence_vs_User_Verification.html). Possible values: `DISCOURAGED` (the authenticator isn't asked to perform user verification, but may do so at its discretion), `PREFERRED` (the client uses an authenticator capable of user verification if possible), or `REQUIRED`(the client uses only an authenticator capable of user verification) | `webauthn` |

### AAGUID Group object

<ApiLifecycle access="ea" />

> **Note:** The AAGUID Group object supports the [Early Access](/docs/reference/releases-at-okta/#early-access-ea) (Self-Service) Allow List for FIDO2 (WebAuthn) Authenticators feature. Enable the feature for your org from the **Settings** > **Features** page in the Admin Console.

#### AAGUID Group properties

| Property | Type | Description  |
| -------- | ---- | ------------ |
| `aaguids` | Array of string | A list of YubiKey hardware FIDO2 Authenticator Attestation Global Unique Identifiers (AAGUIDs). The available [AAGUIDs](https://support.yubico.com/hc/en-us/articles/360016648959-YubiKey-Hardware-FIDO2-AAGUIDs)&nbsp;are provided by the FIDO Alliance Metadata Service. |
| `name` | String | A name to identify the group of YubiKey hardware FIDO2 AAGUIDs |

#### Authenticator Method examples

##### okta_verify Authenticator Methods example

```json
[
  {
    "type": "totp",
    "status": "ACTIVE",
    "settings": {
      "timeIntervalInSeconds": 30,
      "encoding": "Base32",
      "algorithm": "HMACSHA1",
      "passCodeLength": 6
    },
    "_links": {
      "self": {
        "href": "https://{yourDomain}/api/v1/authenticators/{authenticatorId}/methods/totp",
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
    "type": "push",
    "status": "ACTIVE",
    "settings": {
      "algorithms": [
        "RS256",
        "ES256"
      ],
      "keyProtection": "ANY"
    },
    "_links": {
      "self": {
        "href": "https://{yourDomain}/api/v1/authenticators/{authenticatorId}/methods/push",
        "hints": {
          "allow": [
            "GET",
            "PUT"
          ]
        }
      },
      "deactivate": {
        "href": "https://{yourDomain}/api/v1/authenticators/{authenticatorId}/methods/push/lifecycle/deactivate",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },
  {
    "type": "signed_nonce",
    "status": "ACTIVE",
    "settings": {
      "algorithms": [
        "ES256",
        "RS256"
      ],
      "keyProtection": "ANY",
      "showSignInWithOV": "ALWAYS"
    },
    "_links": {
      "self": {
        "href": "https://{yourDomain}/api/v1/authenticators/{authenticatorId}/methods/signed_nonce",
        "hints": {
          "allow": [
            "GET",
            "PUT"
          ]
        }
      },
      "deactivate": {
        "href": "https://{yourDomain}/api/v1/authenticators/{authenticatorId}/methods/signed_nonce/lifecycle/deactivate",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  }
]
```

##### okta_email Authenticator Methods example

```json
[
  {
    "type": "email",
    "status": "ACTIVE",
    "_links": {
      "self": {
        "href": "https://{yourDomain}/api/v1/authenticators/{authenticatorId}/methods/email",
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
