---
title: Authenticators Administration
category: other
---

# Authenticators Administration API

<ApiLifecycle access="ie" /><br>

> **Limited GA:** Okta Identity Engine is under Limited General Availability (LGA) and currently available only to a selected audience.

The Authenticators Administration API enables an Org Administrator to configure which Authenticators are available to end users to be used for signing into applications.

End users would be required to use one or more Authenticators depending on the security requirements of the application sign-on policy.

The Okta Identity Engine currently supports Authenticators for the following factors:

**Knowledge-based:**
* Password
* Security Question

**Possession-based:**
* Phone (SMS, Voice Call)
* Email
* WebAuthn

<!--
## Get started

Explore the Authenticators Administration API: [![Run in Postman](https://run.pstmn.io/button.svg)](%linkhere%). % How to generate this link: https://oktawiki.atlassian.net/wiki/spaces/DOC/pages/227648499/How+to+publish+Postman+collections %

-->

## Authenticators Administration Operations

The Authenticators Administration API has the following CRUD operations:

* [List Authenticators](#list-authenticators)
* [Get an Authenticator by id](#get-an-authenticator-by-id)
* [Activate an Authenticator](#activate-an-authenticator)
* [Deactivate an Authenticator](#deactivate-an-authenticator)

### List Authenticators

<ApiOperation method="get" url="/api/v1/authenticators" />

Lists all available Authenticators.

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

An Array of [Authenticator Objects](#authenticator-object)

#### Usage example

This request would return all available Authenticators:

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
        "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nbsPHh7jNjjyP0g4",
        "hints": {
          "allow": [
            "GET",
            "PUT"
          ]
        }
      },
      "methods": {
        "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nbsPHh7jNjjyP0g4/methods",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "deactivate": {
        "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nbsPHh7jNjjyP0g4/lifecycle/deactivate",
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
        "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nbtrJKKA9m45a0g4",
        "hints": {
          "allow": [
            "GET",
            "PUT"
          ]
        }
      },
      "methods": {
        "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nbtrJKKA9m45a0g4/methods",
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
        "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nbuyD8m1ckAYc0g4",
        "hints": {
          "allow": [
            "GET",
            "PUT"
          ]
        }
      },
      "methods": {
        "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nbuyD8m1ckAYc0g4/methods",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "activate": {
        "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nbuyD8m1ckAYc0g4/lifecycle/activate",
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
        "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4",
        "hints": {
          "allow": [
            "GET",
            "PUT"
          ]
        }
      },
      "methods": {
        "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4/methods",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "deactivate": {
        "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4/lifecycle/deactivate",
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
        "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nbvIgEenhwE6c0g4",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "methods": {
        "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nbvIgEenhwE6c0g4/methods",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "deactivate": {
        "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nbvIgEenhwE6c0g4/lifecycle/deactivate",
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

### Get an Authenticator by id

<ApiOperation method="get" url="/api/v1/authenticators/${authenticatorId}" />

Fetches an Authenticator by its `id`.

#### Request path parameters

| Parameter          | Type   | Description                                            |
| ------------------ | ------ | ------------------------------------------------------ |
| `authenticatorId`  | String | The Authenticator's unique identifier.                 |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

The requested [Authenticator](#Authenticator-object).

#### Usage example

This request returns the Authenticator with an `id` value of `aut1nd8PQhGcQtSxB0g4`:

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
            "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        },
        "methods": {
            "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4/methods",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "deactivate": {
            "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
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
| `authenticatorId`  | String | The Authenticator's unique identifier.                 |

#### Request body

N/A

#### Response body

Returns an [Authenticator](#authenticator-object).

#### Usage example

This request would set the `status` of the specified Authenticator to `ACTIVE`

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
            "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        },
        "methods": {
            "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4/methods",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "deactivate": {
            "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4/lifecycle/deactivate",
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

Deactivates an Authenticator.

#### Request path parameters

| Parameter          | Type   | Description                                            |
| ------------------ | ------ | ------------------------------------------------------ |
| `authenticatorId`  | String | The Authenticator's unique identifier.                 |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Returns an [Authenticator](#Authenticator-object).

#### Usage example

This request would set the `status` of the specified Authenticator to `INACTIVE`.

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
            "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        },
        "methods": {
            "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4/methods",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "activate": {
            "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4/lifecycle/activate",
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

If the Authenticator you are trying to deactivate is currently in-use as part of an active Policy, you will get a 403 error:

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

The Authenticators Administration API only involves one object: the Authenticator.

### Authenticator object

#### Authenticator Properties

The Authenticator object defines the following properties:

| Property      | Type                                                            | Description                                                                     |
| ------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `_links`      | [JSON HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06) | Link relations for this object                                                  |
| `created`     | String (ISO-8601)                                               | Timestamp when the Authenticator was created.                                   |
| `id`          | String                                                          | A unique identifier for the Authenticator.                                                |
| `key`         | String                                                          | A human-readable string that identifies the Authenticator.                                |
| `lastUpdated` | String (ISO-8601)                                               | Timestamp when the Authenticator was last modified.                             |
| `name`        | String                                                          | Display name of this Authenticator.                                             |
| `type`        | String (Enum)                                                   | The type of Authenticator. Values include `password`, `security_question`, `phone`, `email` and `security_key`                            |
| `settings.allowedFor`        | String (Enum)                                    | The allowed types of usages for the Authenticator. Values include `recovery`, `sso`, `any` and `none`                            |
| `settings.tokenLifetimeInMinutes` | Number                                      | Specify lifetime of an `email` token. Only apply to `email` authenticator type. Default value is `5` minutes.                            |


#### Example of Email Authenticator

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
      "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nbsPHh7jNjjyP0g4",
      "hints": {
        "allow": [
          "GET",
          "PUT"
        ]
      }
    },
    "methods": {
      "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nbsPHh7jNjjyP0g4/methods",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nbsPHh7jNjjyP0g4/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Example of Password Authenticator

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
      "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nbtrJKKA9m45a0g4",
      "hints": {
        "allow": [
          "GET",
          "PUT"
        ]
      }
    },
    "methods": {
      "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nbtrJKKA9m45a0g4/methods",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
```

#### Example of Phone Authenticator

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
      "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nbuyD8m1ckAYc0g4",
      "hints": {
        "allow": [
          "GET",
          "PUT"
        ]
      }
    },
    "methods": {
      "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nbuyD8m1ckAYc0g4/methods",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "activate": {
      "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nbuyD8m1ckAYc0g4/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Example of Security Question Authenticator

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
      "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nbvIgEenhwE6c0g4",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "methods": {
      "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nbvIgEenhwE6c0g4/methods",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nbvIgEenhwE6c0g4/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Example of WebAuthn Authenticator

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
      "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4",
      "hints": {
        "allow": [
          "GET",
          "PUT"
        ]
      }
    },
    "methods": {
      "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4/methods",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```
