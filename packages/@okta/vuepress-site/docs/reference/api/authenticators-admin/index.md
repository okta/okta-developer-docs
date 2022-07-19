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
* Custom App

## Get started

Explore the Authenticators Administration API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/836eb57018cba45da121)

## Authenticators Administration operations

The Authenticators Administration API has the following CRUD operations:

* [Create Authenticator](#create-authenticator)
* [List Authenticators](#list-authenticators)
* [Get an Authenticator by ID](#get-an-authenticator-by-id)
* [Update Authenticator settings](#update-authenticator-settings)
* [Activate an Authenticator](#activate-an-authenticator)
* [Deactivate an Authenticator](#deactivate-an-authenticator)

### Create Authenticator

<ApiOperation method="post" url="/api/v1/authenticators" />

Create an Authenticator

#### Request path parameters

N/A

#### Request query parameters

| Parameter | Description                                                                                           | Param Type | DataType      | Required | Default |
| --------- | ----------------------------------------------------------------------------------------------------- | ---------- | ------------- | -------- | ------- |
| activate  | Executes [activation lifecycle](#activate-an-authenticator) operation when creating the authenticator | Query      | Boolean       | FALSE    | TRUE    |

#### Request body

An [Authenticator Object](#authenticator-object) that needs to be created

#### Response body

The created [Authenticator](#authenticator-object)

#### Use example

Returns the created Authenticator with an `id` value of `aut9gnvcjUHIWb37J0g4`:

#### Request

```json
{
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
            "host": "{Duo Org Hostname}"
        }
    }
}
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
            "host": "{Duo Org Hostname}",
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

### List Authenticators

<ApiOperation method="get" url="/api/v1/authenticators" />

Lists all available Authenticators

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

An Array of [Authenticator Objects](#authenticator-object)

#### Use example

This request returns all available Authenticators:

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
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

#### Request query parameters

N/A

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

#### Request body

N/A

#### Response body

Returns an [Authenticator](#authenticator-object)

#### Use example

Sets the `status` of the specified Authenticator to `ACTIVE`

##### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
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

## Authenticators Administration API object

The Authenticators Administration API only involves one object: the Authenticator

### Authenticator object

#### Authenticator properties

The Authenticator object defines the following properties:

| Property      | Type                                                            | Description                                                                     | Applies to Authenticator Key |
| ------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------- |------------------------------|
| `_links`      | [JSON HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06) | Link relations for this object                             | All Authenticators |
| `created`     | String (ISO-8601)                                               | Timestamp when the Authenticator was created               | All Authenticators |
| `id`          | String                                                          | A unique identifier for the Authenticator                  | All Authenticators |
| `key`         | String                                                          | A human-readable string that identifies the Authenticator  | All Authenticators |
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
| `settings.appInstanceId` | String | The application instance ID. For `custom_app`, an OIDC native app would need to be created using the [Apps API](/docs/reference/api/apps/) with `Authoriation Code`, and `Refresh Token` grant types. `Sign-in redirect URIs` and `Sign-out redirect URIs` can be left as the default values. | `okta_verify`, `custom_app` |
| `provider.type` | String | Provider type. For Duo: `DUO`. For Custom App: `PUSH` | `duo` and other authenticators making use of the provider object |
| `provider.configuration.host` | String | The Duo Security org hostname | `duo` |
| `provider.configuration.integrationKey` | String | The Duo Security integration key | `duo` |
| `provider.configuration.secretKey` | String | The Duo Security secret key | `duo` |
| `provider.configuration.userNameTemplate.template` | String | The Duo Security user template name | `duo` |
| `provider.configuration.apns.id`| String | Id of the APNs (Apple Push Notification Service) configuration | `custom_app` |
| `provider.configuration.apns.id`| String | AppBundleId for the APNs (Apple Push Notification Service) configuration | `custom_app` |
| `provider.configuration.apns.id`| String | DebugAppBundleId for the APNs (Apple Push Notification Service) configuration | `custom_app` |
| `provider.configuration.fcm.id` | String  | Id of the FCM (Firebase Cloud Messaging Service) configuration | `custom_app` |
| `methods.type` | String  | Method type. For `custom_app`, it is `push`. For `okta_verify`, allowed values: `push`, `otp`, `signed_nonce`| `custom_app`, `okta_verify` |
| `methods.status` | `ACTIVE`,`INACTIVE` | Status of the authenticator method | `custom_app`, `okta_verify`|
| `methods.settings.algorithms` | String (Enum) | Algorithms supported. Allowed values: `RS256`, `ES256` | `custom_app`, `okta_verify` |
| `methods.settings.keyProtection` | String (Enum) | Key Protection. Allowed values: `ANY`, `HARDWARE` | `custom_app`, `okta_verify` |
| `agreeToTerms` | Boolean | A value of `true` indicates that the administrator accepts the [terms](https://www.okta.com/privacy-policy/) for creating a new authenticator. It is required for the terms to be accepted when creating a new `custom_app` authenticator. Other authenticators do not require this field. | `custom_app`|


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

```
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
            "host": "{Duo Org Hostname}",
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

#### Example Custom App Authenticator

```
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