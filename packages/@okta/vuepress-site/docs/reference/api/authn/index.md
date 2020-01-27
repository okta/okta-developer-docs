---
title: Authentication
category: authentication
excerpt: Control user access to Okta.
---

# Authentication API

The Okta Authentication API provides operations to authenticate users, perform multi-factor enrollment and verification, recover forgotten passwords, and unlock accounts. It can be used as a standalone API to provide the identity layer on top of your existing application, or it can be integrated with the Okta [Sessions API](/docs/reference/api/sessions/) to obtain an Okta [session cookie](/docs/guides/session-cookie/) and access apps within Okta.

The API is targeted for developers who want to build their own end-to-end login experience to replace the built-in Okta login experience and addresses the following key scenarios:

* **Primary authentication** allows you to verify username and password credentials for a user.
* **Multifactor authentication** (MFA) strengthens the security of password-based authentication by requiring additional verification of another factor such as a temporary one-time password or an SMS passcode. The Authentication API supports user enrollment with MFA factors enabled by the administrator, as well as MFA challenges based on your **Okta Sign-On Policy**.
* **Recovery** allows users to securely reset their password if they've forgotten it, or unlock their account if it has been locked out due to excessive failed login attempts. This functionality is subject to the security policy set by the administrator.

## Application Types

The behavior of the Okta Authentication API varies depending on the type of your application and your org's security policies such as the **Okta Sign-On Policy**, **MFA Enrollment Policy**, or **Password Policy**.

> Policy evaluation is conditional on the [client request context](/docs/reference/api-overview/#client-request-context) such as IP address.

### Public Application

A public application is an application that anonymously starts an authentication or recovery transaction without an API token, such as the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/).  Public applications are aggressively rate-limited to prevent abuse and require primary authentication to be successfully completed before releasing any metadata about a user.

### Trusted Application

Trusted applications are backend applications that act as authentication broker or login portal for your Okta organization and may start an authentication or recovery transaction with an administrator API token.  Trusted apps may implement their own recovery flows and primary authentication process and may receive additional metadata about the user before primary authentication has successfully completed.

> Trusted web applications may need to override the [client request context](/docs/reference/api-overview/#client-request-context) to forward the originating client context for the user.


## Getting Started with Authentication

1. Make sure you need the API. Check out the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) which is built on the Authentication API. The Sign-In Widget is easier to use and supports basic use cases.
2. For more advanced use cases, learn [the Okta API basics](/code/rest/).
3. Explore the Authentication API:

    [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/f9684487e584101f25a3)

## Authentication Operations

### Primary Authentication


<ApiOperation method="post" url="/api/v1/authn" />

Every authentication transaction starts with primary authentication which validates a user's primary password credential. **Password Policy**, **MFA Policy**,  and **Sign-On Policy** are evaluated during primary authentication to determine if the user's password is expired, a factor should be enrolled, or additional verification is required. The [transaction state](#transaction-state) of the response depends on the user's status, group memberships and assigned policies.

The requests and responses vary depending on the application type, and whether a password expiration warning is sent:

* [Primary Authentication with Public Application](#primary-authentication-with-public-application)&mdash;[Request Example](#request-example-for-primary-authentication-with-public-application)
* [Primary Authentication with Trusted Application](#primary-authentication-with-trusted-application)&mdash;[Request Example](#request-example-for-trusted-application)
* [Primary Authentication with Activation Token](#primary-authentication-with-activation-token)&mdash;[Request Example](#request-example-for-activation-token)
* [Primary Authentication with Device Fingerprinting](#primary-authentication-with-device-fingerprinting)&mdash;[Request Example](#request-example-for-device-fingerprinting)
* [Primary Authentication with Password Expiration Warning](#primary-authentication-with-password-expiration-warning)&mdash;[Request Example](#request-example-for-password-expiration-warning)

> You must first enable MFA factors and assign a valid **Sign-On Policy** to a user to enroll and/or verify a MFA factor during authentication.

#### Request Parameters for Primary Authentication


As part of the authentication call either the username and password or the token parameter must be provided.

| Parameter  | Description                                                                                                      | Param Type | DataType                          | Required | MaxLength |
|------------|:-----------------------------------------------------------------------------------------------------------------|:-----------|:----------------------------------|:---------|:----------|
| username   | User's non-qualified short-name (e.g. dade.murphy) or unique fully-qualified login (e.g dade.murphy@example.com) | Body       | String                            | FALSE    |           |
| password   | User's password credential                                                                                       | Body       | String                            | FALSE    |           |
| audience   | App ID of the target app the user is signing into                                                                | Body       | String                            | FALSE    |           |
| options    | Opt-in features for the authentication transaction                                                               | Body       | [Options Object](#options-object) | FALSE    |           |
| context    | Provides additional context for the authentication transaction                                                   | Body       | [Context Object](#context-object) | FALSE    |           |
| token      | Token received as part of activation user request                                                                | Body       | String                            | FALSE    |           |

##### Options Object

The authentication transaction [state machine](#transaction-state) can be modified via the following opt-in features:

| Property                   | Description                                                                                                                                                | DataType | Nullable | Unique | Readonly |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | ------ | -------- |
| multiOptionalFactorEnroll  | Transitions transaction back to `MFA_ENROLL` state after successful factor enrollment when additional optional factors are available for enrollment        | Boolean  | TRUE     | FALSE  | FALSE    |
| warnBeforePasswordExpired  | Transitions transaction to `PASSWORD_WARN` state before `SUCCESS` if the user's password is about to expire and within their password policy warn period   | Boolean  | TRUE     | FALSE  | FALSE    |

##### Context Object

The context object allows [trusted web applications](#trusted-application) such as an external portal to pass additional context for the authentication or recovery transaction.

> Overriding context such as `deviceToken` is a highly privileged operation limited to trusted web applications and requires making authentication or recovery requests with a valid *administrator API token*. If an API token is not provided, the `deviceToken` will be ignored.

| Property    | Description                                                                   | DataType | Nullable | Unique | Readonly | MinLength | MaxLength |
| ----------- | ----------------------------------------------------------------------------- | -------- | -------- | ------ | -------- | --------- | --------- |
| deviceToken | A globally unique ID identifying the user's client device or user agent | String   | TRUE     | FALSE  | FALSE    |           | 32        |

> You must always pass the same `deviceToken` for a user's device with every authentication request for **per-device** or **per-session** Sign-On Policy factor challenges.  If the `deviceToken` is absent or does not match the previous `deviceToken`, the user will be challenged every-time instead of **per-device** or **per-session**.

It is recommended that you generate a UUID or GUID for each client and persist the `deviceToken` as a persistent cookie or HTML5 localStorage item scoped to your web application's origin.

#### Response Parameters


[Authentication Transaction Object](#authentication-transaction-model) with the current [state](#transaction-state) for the authentication transaction.

`401 Unauthorized` status code is returned for requests with invalid credentials, locked out accounts or access denied by sign-on policy.

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "errorCode": "E0000004",
  "errorSummary": "Authentication failed",
  "errorLink": "E0000004",
  "errorId": "oaeuHRrvMnuRga5UzpKIOhKpQ",
  "errorCauses": []
}
```

`429 Too Many Requests` status code may be returned when the rate-limit is exceeded.

```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
X-Rate-Limit-Limit: 1
X-Rate-Limit-Remaining: 0
X-Rate-Limit-Reset: 1447534590

{
    "errorCode": "E0000047",
    "errorSummary": "API call exceeded rate limit due to too many requests.",
    "errorLink": "E0000047",
    "errorId": "oaeWaNHfOyQSES34-a2Dw6Phw",
    "errorCauses": []
}
```

#### Primary Authentication with Public Application

Authenticates a user with username/password credentials via a [public application](#public-application)

##### Request Example for Primary Authentication with Public Application


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "username": "dade.murphy@example.com",
  "password": "correcthorsebatterystaple",
  "options": {
    "multiOptionalFactorEnroll": false,
    "warnBeforePasswordExpired": false
  }
}' "https://${yourOktaDomain}/api/v1/authn"
```

##### Response Example for Primary Authentication with Public Application (Success)


Users with a valid password not assigned to a **Sign-On Policy** with additional verification requirements will successfully complete the authentication transaction.

```json
{
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "SUCCESS",
  "sessionToken": "00Fpzf4en68pCXTsMjcX8JPMctzN2Wiw4LDOBL_9pe",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    }
  }
}
```

##### Response Example for Primary Authentication with Public Application (Invalid Credentials)


`401 Unauthorized` status code is returned for requests with invalid credentials or when access is denied based on sign-on policy.

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "errorCode": "E0000004",
  "errorSummary": "Authentication failed",
  "errorLink": "E0000004",
  "errorId": "oaeuHRrvMnuRga5UzpKIOhKpQ",
  "errorCauses": []
}
```

##### Response Example for Primary Authentication with Public Application (Locked Out)


Primary authentication requests for a user with `LOCKED_OUT` status is conditional on the user's password policy.  Password policies define whether to hide or show  lockout failures which disclose a valid user identifier to the caller.

##### Response Example for Primary Authentication with Public Application and Hide Lockout Failures (Default)

If the user's password policy is configured to **hide lockout failures**, a `401 Unauthorized` error is returned preventing information disclosure of a valid user identifier.

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "errorCode": "E0000004",
  "errorSummary": "Authentication failed",
  "errorLink": "E0000004",
  "errorId": "oaeuHRrvMnuRga5UzpKIOhKpQ",
  "errorCauses": []
}
```

##### Response Example for Primary Authentication with Public Application and Show Lockout Failures

If the user's password policy is configure to **show lockout failures**, the authentication transaction completes with `LOCKED_OUT` status.

```json
{
  "status": "LOCKED_OUT",
  "_links": {
    "next": {
      "name": "unlock",
      "href": "https://${yourOktaDomain}/api/v1/authn/recovery/unlock",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

##### Response Example for Primary Authentication with Public Application and Expired Password


User must [change their expired password](#change-password) to complete the authentication transaction.

> Users will be challenged for MFA (`MFA_REQUIRED`) before `PASSWORD_EXPIRED` if they have an active factor enrollment

```json
{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "PASSWORD_EXPIRED",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    },
    "policy": {
      "complexity": {
        "minLength": 8,
        "minLowerCase": 1,
        "minUpperCase": 1,
        "minNumber": 1,
        "minSymbol": 0
      }
    }
  },
  "_links": {
    "next": {
      "name": "changePassword",
      "href": "https://${yourOktaDomain}/api/v1/authn/credentials/change_password",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

##### Response Example for Primary Authentication with Public Application (Factor Challenge)


User is assigned to a **Sign-On Policy** that requires additional verification and must [select and verify](#verify-factor) a previously enrolled [factor](#factor-object) by `id` to complete the authentication transaction.

```json
{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "MFA_REQUIRED",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    },
    "factors": [
      {
        "id": "rsalhpMQVYKHZKXZJQEW",
        "factorType": "token",
        "provider": "RSA",
        "profile": {
          "credentialId": "dade.murphy@example.com"
        },
        "_links": {
          "verify": {
            "href": "https://${yourOktaDomain}/api/v1/authn/factors/rsalhpMQVYKHZKXZJQEW/verify",
            "hints": {
              "allow": [
                "POST"
              ]
            }
          }
        }
      },
      {
        "id": "ostfm3hPNYSOIOIVTQWY",
        "factorType": "token:software:totp",
        "provider": "OKTA",
        "profile": {
          "credentialId": "dade.murphy@example.com"
        },
        "_links": {
          "verify": {
            "href": "https://${yourOktaDomain}/api/v1/authn/factors/ostfm3hPNYSOIOIVTQWY/verify",
            "hints": {
              "allow": [
                "POST"
              ]
            }
          }
        }
      },
      {
        "id": "sms193zUBEROPBNZKPPE",
        "factorType": "sms",
        "provider": "OKTA",
        "profile": {
          "phoneNumber": "+1 XXX-XXX-1337"
        },
        "_links": {
          "verify": {
            "href": "https://${yourOktaDomain}/api/v1/authn/factors/sms193zUBEROPBNZKPPE/verify",
            "hints": {
              "allow": [
                "POST"
              ]
            }
          }
        }
      },
      {
         "id": "clf193zUBEROPBNZKPPE",
         "factorType": "call",
         "provider": "OKTA",
         "profile": {
           "phoneNumber": "+1 XXX-XXX-1337"
         },
         "_links": {
           "verify": {
             "href": "https://${yourOktaDomain}/api/v1/authn/factors/clf193zUBEROPBNZKPPE/verify",
             "hints": {
               "allow": [
                 "POST"
                ]
              }
            }
         }
      },
      {
        "id": "opf3hkfocI4JTLAju0g4",
        "factorType": "push",
        "provider": "OKTA",
        "profile": {
          "credentialId": "dade.murphy@example.com",
          "deviceType": "SmartPhone_IPhone",
          "name": "Gibson",
          "platform": "IOS",
          "version": "9.0"
        },
        "_links": {
          "verify": {
            "href": "https://${yourOktaDomain}/api/v1/authn/factors/opf3hkfocI4JTLAju0g4/verify",
            "hints": {
              "allow": [
                "POST"
              ]
            }
          }
        }
      }
    ]
  },
  "_links": {
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

##### Response Example for Primary Authentication with Public Application (Factor Enroll)


User is assigned to a **MFA Policy** that requires enrollment during sign-on and must [select a factor to enroll](#enroll-factor) to complete the authentication transaction.

```json
{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "MFA_ENROLL",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    },
    "factors": [
      {
        "factorType": "token",
        "provider": "RSA",
        "vendorName": "RSA",
        "_links": {
          "enroll": {
            "href": "https://${yourOktaDomain}/api/v1/authn/factors",
            "hints": {
              "allow": [
                "POST"
              ]
            }
          }
        },
        "status": "NOT_SETUP",
        "enrollment": "OPTIONAL"
      },
      {
        "factorType": "token:software:totp",
        "provider": "OKTA",
        "_links": {
          "enroll": {
            "href": "https://${yourOktaDomain}/api/v1/authn/factors",
            "hints": {
              "allow": [
                "POST"
              ]
            }
          }
        },
        "status": "NOT_SETUP",
        "enrollment": "OPTIONAL"
      },
      {
        "factorType": "sms",
        "provider": "OKTA",
        "_links": {
          "enroll": {
            "href": "https://${yourOktaDomain}/api/v1/authn/factors",
            "hints": {
              "allow": [
                "POST"
              ]
            }
          }
        },
        "status": "NOT_SETUP",
        "enrollment": "OPTIONAL"
      },
      {
        "factorType": "call",
        "provider": "OKTA",
        "_links": {
          "enroll": {
            "href": "https://${yourOktaDomain}/api/v1/authn/factors",
            "hints": {
              "allow": [
                "POST"
               ]
            }
          }
         },
         "status": "NOT_SETUP",
         "enrollment": "OPTIONAL"
      },
      {
        "factorType": "push",
        "provider": "OKTA",
        "_links": {
          "enroll": {
            "href": "https://${yourOktaDomain}/api/v1/authn/factors",
            "hints": {
              "allow": [
                "POST"
              ]
            }
          }
        },
        "status": "NOT_SETUP",
        "enrollment": "OPTIONAL"
      }
    ]
  },
  "_links": {
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Primary Authentication with Trusted Application

Authenticates a user via a [trusted application](#trusted-application) or proxy that overrides [client request context](/docs/reference/api-overview/#client-request-context).

Note:

* Specifying your own `deviceToken` is a highly privileged operation limited to trusted web applications and requires making authentication requests with a valid *API token*. If an API token is not provided, the `deviceToken` will be ignored.
* The **public IP address** of your [trusted application](#trusted-application) must be [whitelisted as a gateway IP address](/docs/reference/api-overview/#ip-address) to forward the user agent's original IP address with the `X-Forwarded-For` HTTP header

##### Request Example for Trusted Application


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36" \
-H "X-Forwarded-For: 23.235.46.133" \
-d '{
  "username": "dade.murphy@example.com",
  "password": "correcthorsebatterystaple",
  "options": {
    "multiOptionalFactorEnroll": false,
    "warnBeforePasswordExpired": false
  },
  "context": {
    "deviceToken": "26q43Ak9Eh04p7H6Nnx0m69JqYOrfVBY"
  }
}' "https://${yourOktaDomain}/api/v1/authn"
```

##### Response Example for Trusted Application


```json
{
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "SUCCESS",
  "sessionToken": "00Fpzf4en68pCXTsMjcX8JPMctzN2Wiw4LDOBL_9pe",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    }
  }
}
```

#### Primary Authentication with Activation Token

Authenticates a user via a [trusted application](#trusted-application) or proxy that overrides the [client request context](/docs/reference/api-overview/#client-request-context).

Note:

* Specifying your own `deviceToken` is a highly privileged operation limited to trusted web applications and requires making authentication requests with a valid *API token*. If an API token is not provided, the `deviceToken` will be ignored.
* The **public IP address** of your [trusted application](#trusted-application) must be [whitelisted as a gateway IP address](/docs/reference/api-overview/#ip-address) to forward the user agent's original IP address with the `X-Forwarded-For` HTTP header

##### Request Example for Activation Token


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36" \
-H "X-Forwarded-For: 23.235.46.133" \
-d '{
  "token": "o7AFoTGE9xjQiHQK6dAa"
}' "https://${yourOktaDomain}/api/v1/authn"
```

##### Response Example for Activation Token (Success - User with Password, no MFA)


```json
{
  "expiresAt": "2017-03-29T21:42:30.000Z",
  "status": "SUCCESS",
  "sessionToken": "20111DuMTdPoBlMOqX5R_OAV3ku2bTWxP6wUIRT_jqkU6XTvOsJLmDq",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2017-03-29T21:37:25.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    }
  }
}
```

##### Response Example for Activation Token (Success - User with Password and Configured MFA)


```json
{
  "stateToken": "00bMktAiPaI0Jo97bpiKxEw7drTgtukJKs33abrSpb",
  "expiresAt": "2017-03-29T21:49:09.000Z",
  "status": "MFA_ENROLL",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2017-03-29T21:37:25.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    },
    "factors": [
      {
        "factorType": "question",
        "provider": "OKTA",
        "vendorName": "OKTA",
        "_links": {
          "questions": {
            "href": "https://${yourOktaDomain}/api/v1/users/00u1nehnZ6qp4Qy8G0g4/factors/questions",
            "hints": {
              "allow": [
                "GET"
              ]
            }
          },
          "enroll": {
            "href": "https://${yourOktaDomain}/api/v1/authn/factors",
            "hints": {
              "allow": [
                "POST"
              ]
            }
          }
        },
        "status": "NOT_SETUP",
        "enrollment": "OPTIONAL"
      },
      {
        "factorType": "token:software:totp",
        "provider": "OKTA",
        "vendorName": "OKTA",
        "_links": {
          "enroll": {
            "href": "https://${yourOktaDomain}/api/v1/authn/factors",
            "hints": {
              "allow": [
                "POST"
              ]
            }
          }
        },
        "status": "NOT_SETUP",
        "enrollment": "OPTIONAL"
      },
      {
        "factorType": "token:software:totp",
        "provider": "GOOGLE",
        "vendorName": "GOOGLE",
        "_links": {
          "enroll": {
            "href": "https://${yourOktaDomain}/api/v1/authn/factors",
            "hints": {
              "allow": [
                "POST"
              ]
            }
          }
        },
        "status": "NOT_SETUP",
        "enrollment": "OPTIONAL"
      },
      {
        "factorType": "sms",
        "provider": "OKTA",
        "vendorName": "OKTA",
        "_links": {
          "enroll": {
            "href": "https://${yourOktaDomain}/api/v1/authn/factors",
            "hints": {
              "allow": [
                "POST"
              ]
            }
          }
        },
        "status": "NOT_SETUP",
        "enrollment": "OPTIONAL"
      },
      {
        "factorType": "push",
        "provider": "OKTA",
        "vendorName": "OKTA",
        "_links": {
          "enroll": {
            "href": "https://${yourOktaDomain}/api/v1/authn/factors",
            "hints": {
              "allow": [
                "POST"
              ]
            }
          }
        },
        "status": "NOT_SETUP",
        "enrollment": "OPTIONAL"
      },
      {
        "factorType": "token:hardware",
        "provider": "YUBICO",
        "vendorName": "YUBICO",
        "_links": {
          "enroll": {
            "href": "https://${yourOktaDomain}/api/v1/authn/factors",
            "hints": {
              "allow": [
                "POST"
              ]
            }
          }
        },
        "status": "NOT_SETUP",
        "enrollment": "OPTIONAL"
      }
    ]
  },
  "_links": {
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

##### Response Example for Activation Token (Success - User Without Password)


In the case where the user was created without credentials the response will trigger the workflow to [set the user's password](#change-password). After the password is configured, depending on the MFA setting, the workflow continues with MFA enrollment or a successful authentication completes.

```json
{
  "stateToken": "005Oj4_rx1yAYP2MFNobMXlM2wJ3QEyzgifBd_T6Go",
  "expiresAt": "2017-03-29T21:35:47.000Z",
  "status": "PASSWORD_RESET",
  "recoveryType": "ACCOUNT_ACTIVATION",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    },
    "policy": {
      "expiration": {
        "passwordExpireDays": 5
      },
      "complexity": {
        "minLength": 8,
        "minLowerCase": 1,
        "minUpperCase": 1,
        "minNumber": 1,
        "minSymbol": 0
      }
    }
  },
  "_links": {
    "next": {
      "name": "resetPassword",
      "href": "https://${yourOktaDomain}/api/v1/authn/credentials/reset_password",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

##### Response Example for Activation Token (Failure - Invalid or Expired Token)


```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "errorCode": "E0000004",
  "errorSummary": "Authentication failed",
  "errorLink": "E0000004",
  "errorId": "oae2fYYJmkuTg-NyozqBkb3sw",
  "errorCauses": []
}
```

#### Primary Authentication with Device Fingerprinting

Include the `X-Device-Fingerprint` header to supply a device fingerprint. The device fingerprint is used in the following ways
* If the new or unknown-device email notification is enabled, an email is sent to the user if the device fingerprint sent in the header is not associated with previous successful logins. 
For more information about this feature, see the [General Security documentation](https://help.okta.com/en/prod/Content/Topics/Security/Security_General.htm?)
* If you have the security behavior detection feature enabled and you have a new device behavior configured in a policy rule, a new device is detected if the device fingerprint sent 
in the header is not associated with previous successful logins. For more information about this feature, see [EA documentation](https://help.okta.com/en/prod/Content/Topics/Security/proc-security-behavior-detection.htm?)

Specifying your own device fingerprint is a highly privileged operation limited to trusted web applications and requires making authentication requests with a valid API token.
You should send the device fingerprint only if the trusted app has a computed fingerprint for the end user's client.

Note:
* Device fingerprint is different from the device token. The time and device based MFA in Okta SignOn policy rules depends on the device token only and not on the device fingerprint. To read more about the device token, see [Context Object](#context-object). The time and device based MFA would work only if you send the device token passed in the [client request context](/docs/reference/api-overview/#client-request-context)
* To use device fingerprinting for the new or unknown-device email notification feature, include the `User-Agent` header in the request. For more information, see the [General Security documentation](https://help.okta.com/en/prod/Content/Topics/Security/Security_General.htm?)

##### Request Example for Device Fingerprinting


```bash
curl -v -X POST \
-H 'Accept: application/json' \
-H 'Authorization: SSWS ${api_token}' \
-H 'Cache-Control: no-cache' \
-H 'Content-Type: application/json' \
-H 'X-Fowarded-For: 23.235.46.133' \
-H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36" \
-H 'X-Device-Fingerprint: ${device_fingerprint}' \
-d '{
  "username": "${username}",
  "password" : "${password}",
}' "https://${yourOktaDomain}/api/v1/authn"
```

##### Response Example for Device Fingerprinting


```json
{
    "expiresAt": "2018-04-26T17:14:17.000Z",
    "status": "SUCCESS",
    "sessionToken": "20111Il76Eaub0eKNkLGwMUDg5D7dBSN9d_FO-0o7eHKQMyqV7VoqzZ",
    "_embedded": {
        "user": {
            "id": "00ue5f54sbR7dFr9i0h7",
            "passwordChanged": "2018-04-26T17:06:07.000Z",
            "profile": {
                "login": "saml.jackson@stark.com",
                "firstName": "Saml",
                "lastName": "Jackson",
                "locale": "en",
                "timeZone": "America/Los_Angeles"
            }
        }
    }
}
```

#### Primary Authentication with Password Expiration Warning

Authenticates a user with a password that is about to expire.  The user should [change their password](#change-password) to complete the authentication transaction but may skip.

Note:

* The `warnBeforePasswordExpired` option must be explicitly specified as `true` to allow the authentication transaction to transition to `PASSWORD_WARN` status.
* Non-expired passwords successfully complete the authentication transaction if this option is omitted or is specified as `false`.

##### Request Example for Password Expiration Warning


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "username": "dade.murphy@example.com",
  "password": "correcthorsebatterystaple",
  "options": {
    "multiOptionalFactorEnroll": false,
    "warnBeforePasswordExpired": true
  }
}' "https://${yourOktaDomain}/api/v1/authn"
```

##### Response Example for Password Expiration Warning


```json
{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "PASSWORD_WARN",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    },
    "policy": {
      "expiration": {
        "passwordExpireDays": 5
      },
      "complexity": {
        "minLength": 8,
        "minLowerCase": 1,
        "minUpperCase": 1,
        "minNumber": 1,
        "minSymbol": 0
      }
    }
  },
  "_links": {
    "next": {
      "name": "changePassword",
      "href": "https://${yourOktaDomain}/api/v1/authn/credentials/change_password",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "skip": {
      "name": "skip",
      "href": "https://${yourOktaDomain}/api/v1/authn/skip",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```



### SP-initiated Step-up Authentication


<ApiLifecycle access="ea" />

Note:

* This endpoint is currently supported only for SAML-based apps.
* You must first enable custom login page for the application before using this API.

Every step-up transaction starts with user accessing an application.
If step-up authentication is required, Okta redirects the user to the custom login page with state token as a request parameter.

For example, if the custom login page is set as **https://login.example.com**
then Okta will redirect to **https://login.example.com?stateToken=**00BClWr4T-mnIqPV8dHkOQlwEIXxB4LLSfBVt7BxsM.
To determine the next step, check the [state of the transaction](#get-transaction-state).

* [Step-up Authentication without Okta session](#step-up-authentication-without-okta-session)
* [Step-up Authentication with Okta session](#step-up-authentication-with-okta-session)

#### Step-up Authentication Without Okta Session

##### Request Example for Step-up Authentication Without Okta Session (Get Transaction State)


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
   "stateToken":"00BClWr4T-mnIqPV8dHkOQlwEIXxB4LLSfBVt7BxsM"
}' "https://${yourOktaDomain}/api/v1/authn"
```

##### Response Example for Step-up Authentication Without Okta Session


```json
{
   "stateToken":"00BClWr4T-mnIqPV8dHkOQlwEIXxB4LLSfBVt7BxsM",
   "type":"SESSION_STEP_UP",
   "expiresAt":"2017-05-30T22:51:37.000Z",
   "status":"UNAUTHENTICATED",
   "_embedded":{
      "target":{
         "type":"APP",
         "name":"salesforce",
         "label":"Corporate SFDC",
         "_links":{
            "logo":{
               "name":"medium",
               "href":"https://${yourOktaDomain}/assets/img/logos/salesforce_logo.dbd7e0b4de118a1dae1c39d60a3c30e5.png",
               "type":"image/png"
            }
         }
      },
      "authentication":{
         "protocol":"SAML2.0",
         "issuer":{
            "id":"0oa2x5jOopNCpswjo0g4",
            "name":"Corporate SFDC",
            "uri":"exk2x5ixHmk9MBnqz0g4"
         }
      }
   },
   "_links":{
      "next":{
         "name":"authenticate",
         "href":"https://${yourOktaDomain}/api/v1/authn",
         "hints":{
            "allow":[
               "POST"
            ]
         }
      }
   }
}
```

##### Request Example  for Step-up Authentication Without Okta Session (Perform Primary Authentication)


Primary authentication has to be completed by using the value of **stateToken** request parameter passed to custom login page.

> Okta Sign-On Policy and the related App Sign-On Policy will be evaluated after successful primary authentication.

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
   "stateToken":"00BClWr4T-mnIqPV8dHkOQlwEIXxB4LLSfBVt7BxsM",
   "username": "dade.murphy@example.com",
   "password": "correcthorsebatterystaple"
}' "https://${yourOktaDomain}/api/v1/authn"
```

##### Response Example for Step-up Authentication Without Okta Session When MFA Isn't Required


> Sign in to the app by following the next link relation.

```json
{
   "stateToken":"00quAZYqYjXg9DZhS5UzE1wrJuQ6KKb_kzOeH7OGB5",
   "type":"SESSION_STEP_UP",
   "expiresAt":"2017-05-30T23:19:40.000Z",
   "status":"SUCCESS",
   "_embedded":{
      "user":{
         "id":"00ub0oNGTSWTBKOLGLNR",
         "passwordChanged":"2017-03-29T21:37:25.000Z",
         "profile":{
            "login":"dade.murphy@example.com",
            "firstName":"Dade",
            "lastName":"Murphy",
            "locale":"en_US",
            "timeZone":"America/Los_Angeles"
         }
      },
      "target":{
         "type":"APP",
         "name":"salesforce",
         "label":"Corporate SFDC",
         "_links":{
            "logo":{
               "name":"medium",
               "href":"https://${yourOktaDomain}/assets/img/logos/salesforce_logo.dbd7e0b4de118a1dae1c39d60a3c30e5.png",
               "type":"image/png"
            }
         }
      },
      "authentication":{
         "protocol":"SAML2.0",
         "issuer":{
            "id":"0oa2x5jOopNCpswjo0g4",
            "name":"Corporate SFDC",
            "uri":"exk2x5ixHmk9MBnqz0g4"
         }
      }
   },
   "_links":{
      "next":{
         "name":"original",
         "href":"https://${yourOktaDomain}/login/step-up/redirect?stateToken=00quAZYqYjXg9DZhS5UzE1wrJuQ6KKb_kzOeH7OGB5",
         "hints":{
            "allow":[
               "GET"
            ]
         }
      }
   }
}
```

#### Step-up authentication with Okta Session

##### Request Example to Get Transaction State for Step-up authentication with Okta Session


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
   "stateToken":"00BClWr4T-mnIqPV8dHkOQlwEIXxB4LLSfBVt7BxsM"
}' "https://${yourOktaDomain}/api/v1/authn"
```

##### Response Example for Factor Enroll for Step-up authentication with Okta Session


User is assigned to an MFA Policy that requires enrollment during sign-on and must [select a factor to enroll](#enroll-factor) to complete the authentication transaction.

```json
{
   "stateToken":"00zEfSRIpELrl87ndYiHNkvOEbyEPrBmTYuf9dsGLl",
   "type":"SESSION_STEP_UP",
   "expiresAt":"2017-05-30T22:58:09.000Z",
   "status":"MFA_ENROLL",
   "_embedded":{
      "user":{
         "id":"00ub0oNGTSWTBKOLGLNR",
         "passwordChanged":"2017-03-29T21:37:25.000Z",
         "profile":{
            "login":"dade.murphy@example.com",
            "firstName":"Dade",
            "lastName":"Murphy",
            "locale":"en_US",
            "timeZone":"America/Los_Angeles"
         }
      },
      "factors":[
         {
            "factorType":"sms",
            "provider":"OKTA",
            "vendorName":"OKTA",
            "_links":{
               "enroll":{
                  "href":"https://${yourOktaDomain}/api/v1/authn/factors",
                  "hints":{
                     "allow":[
                        "POST"
                     ]
                  }
               }
            },
            "status":"NOT_SETUP",
            "enrollment": "OPTIONAL"
         }
      ],
      "target":{
         "type":"APP",
         "name":"salesforce",
         "label":"Corporate SFDC",
         "_links":{
            "logo":{
               "name":"medium",
               "href":"https://${yourOktaDomain}/assets/img/logos/salesforce_logo.dbd7e0b4de118a1dae1c39d60a3c30e5.png",
               "type":"image/png"
            }
         }
      },
      "authentication":{
         "protocol":"SAML2.0",
         "issuer":{
            "id":"0oa2x5jOopNCpswjo0g4",
            "name":"Corporate SFDC",
            "uri":"exk2x5ixHmk9MBnqz0g4"
         }
      }
   },
   "_links":{
      "cancel":{
         "href":"https://${yourOktaDomain}/api/v1/authn/cancel",
         "hints":{
            "allow":[
               "POST"
            ]
         }
      }
   }
}
```


##### Response Example for Factor Challenge for Step-up authentication with Okta Session


User is assigned to a Sign-On Policy or App Sign-On Policy that requires additional verification and must [select and verify](#verify-factor) a previously enrolled [factor](#factor-object) by `id` to complete the authentication transaction.

```json
{
   "stateToken":"00POAgFjELRueYUC1p7GFAmrm32EQa2HXw0_YssJ5J",
   "type":"SESSION_STEP_UP",
   "expiresAt":"2017-05-30T23:07:00.000Z",
   "status":"MFA_REQUIRED",
   "_embedded":{
      "user":{
         "id":"00ub0oNGTSWTBKOLGLNR",
         "passwordChanged":"2017-03-29T21:37:25.000Z",
         "profile":{
            "login":"dade.murphy@example.com",
            "firstName":"Dade",
            "lastName":"Murphy",
            "locale":"en_US",
            "timeZone":"America/Los_Angeles"
         }
      },
      "factors":[
         {
            "id":"opf1cla0gggOBWxuC1d8",
            "factorType":"push",
            "provider":"OKTA",
            "vendorName":"OKTA",
            "profile":{
               "credentialId":"abcd@okta.com",
               "deviceType":"SmartPhone_Android",
               "keys":[
                  {
                     "kty":"PKIX",
                     "use":"sig",
                     "kid":"default",
                     "x5c":[
                        "Mdkkdfjkdjf"
                     ]
                  }
               ],
               "name":"SM-N9005",
               "platform":"ANDROID",
               "version":"21"
            },
            "_links":{
               "verify":{
                  "href":"https://${yourOktaDomain}/api/v1/authn/factors/opf1cla0yyvOBWxuC1d8/verify",
                  "hints":{
                     "allow":[
                        "POST"
                     ]
                  }
               }
            }
         },
         {
            "id":"smsph8F1esz8LlSjo0g3",
            "factorType":"sms",
            "provider":"OKTA",
            "vendorName":"OKTA",
            "profile":{
               "phoneNumber":"+1 XXX-XXX-3161"
            },
            "_links":{
               "verify":{
                  "href":"https://${yourOktaDomain}/api/v1/authn/factors/smsph8F1esz8LlSjo0g3/verify",
                  "hints":{
                     "allow":[
                        "POST"
                     ]
                  }
               }
            }
         }
      ],
      "policy":{
         "allowRememberDevice":true,
         "rememberDeviceLifetimeInMinutes":1440,
         "rememberDeviceByDefault":false,
         "factorsPolicyInfo": {
             "opf1cla0gggOBWxuC1d8": {
                 "autoPushEnabled": true
             }
         }
      },
      "target":{
         "type":"APP",
         "name":"salesforce",
         "label":"Corporate SFDC",
         "_links":{
            "logo":{
               "name":"medium",
               "href":"https://${yourOktaDomain}/assets/img/logos/salesforce_logo.dbd7e0b4de118a1dae1c39d60a3c30e5.png",
               "type":"image/png"
            }
         }
      },
      "authentication":{
         "protocol":"SAML2.0",
         "issuer":{
            "id":"0oa2x5jOopNCpswjo0g4",
            "name":"Corporate SFDC",
            "uri":"exk2x5ixHmk9MBnqz0g4"
         }
      }
   },
   "_links":{
      "cancel":{
         "href":"https://${yourOktaDomain}/api/v1/authn/cancel",
         "hints":{
            "allow":[
               "POST"
            ]
         }
      }
   }
}
```

##### Response Example After Authentication and MFA are Complete for Step-up authentication with Okta Session


> Sign in to the app by following the next link relation.

```json
{
   "stateToken":"00quAZYqYjXg9DZhS5UzE1wrJuQ6KKb_kzOeH7OGB5",
   "type":"SESSION_STEP_UP",
   "expiresAt":"2017-05-30T23:19:40.000Z",
   "status":"SUCCESS",
   "_embedded":{
      "user":{
         "id":"00ub0oNGTSWTBKOLGLNR",
         "passwordChanged":"2017-03-29T21:37:25.000Z",
         "profile":{
            "login":"dade.murphy@example.com",
            "firstName":"Dade",
            "lastName":"Murphy",
            "locale":"en_US",
            "timeZone":"America/Los_Angeles"
         }
      },
      "target":{
         "type":"APP",
         "name":"salesforce",
         "label":"Corporate SFDC",
         "_links":{
            "logo":{
               "name":"medium",
               "href":"https://${yourOktaDomain}/assets/img/logos/salesforce_logo.dbd7e0b4de118a1dae1c39d60a3c30e5.png",
               "type":"image/png"
            }
         }
      },
      "authentication":{
         "protocol":"SAML2.0",
         "issuer":{
            "id":"0oa2x5jOopNCpswjo0g4",
            "name":"Corporate SFDC",
            "uri":"exk2x5ixHmk9MBnqz0g4"
         }
      }
   },
   "_links":{
      "next":{
         "name":"original",
         "href":"https://${yourOktaDomain}/login/step-up/redirect?stateToken=00quAZYqYjXg9DZhS5UzE1wrJuQ6KKb_kzOeH7OGB5",
         "hints":{
            "allow":[
               "GET"
            ]
         }
      }
   }
}
```

### IDP-initiated Step-up Authentication


<ApiOperation method="post" url="/api/v1/authn" />

<ApiLifecycle access="ea" />

Authenticates a user for signing into the specified application.

Note:
* Only WS-Federation, SAML based apps are supported.
* Pass the application instance ID of the app as ["audience"](#request-parameters-for-primary-authentication) along with the user credentials.

> Okta Sign-on Policy and the related App Sign-on Policy will be evaluated after successful primary authentication.

##### Request Example for IDP initiated Step-up Authentication


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "username": "dade.murphy@example.com",
  "password": "correcthorsebatterystaple",
  "audience": "0oa6gva7owNAhDam50h7",
  "options": {
    "multiOptionalFactorEnroll": false,
    "warnBeforePasswordExpired": true
  }
}' "https://${yourOktaDomain}/api/v1/authn"
```

##### Response Example When MFA Isn't Required


```json
{
   "stateToken":"00quAZYqYjXg9DZhS5UzE1wrJuQ6KKb_kzOeH7OGB5",
   "type":"SESSION_STEP_UP",
   "expiresAt":"2017-05-30T23:19:40.000Z",
   "status":"SUCCESS",
   "_embedded":{
      "user":{
         "id":"00ub0oNGTSWTBKOLGLNR",
         "passwordChanged":"2017-03-29T21:37:25.000Z",
         "profile":{
            "login":"dade.murphy@example.com",
            "firstName":"Dade",
            "lastName":"Murphy",
            "locale":"en_US",
            "timeZone":"America/Los_Angeles"
         }
      },
      "target":{
         "type":"APP",
         "name":"salesforce",
         "label":"Corporate SFDC",
         "_links":{
            "logo":{
               "name":"medium",
               "href":"https://${yourOktaDomain}/assets/img/logos/salesforce_logo.dbd7e0b4de118a1dae1c39d60a3c30e5.png",
               "type":"image/png"
            }
         }
      },
      "authentication":{
         "protocol":"SAML2.0",
         "issuer":{
            "id":"0oa2x5jOopNCpswjo0g4",
            "name":"Corporate SFDC",
            "uri":"exk2x5ixHmk9MBnqz0g4"
         }
      }
   },
   "_links":{
      "next":{
         "name":"original",
         "href":"https://${yourOktaDomain}/login/step-up/redirect?stateToken=00quAZYqYjXg9DZhS5UzE1wrJuQ6KKb_kzOeH7OGB5",
         "hints":{
            "allow":[
               "GET"
            ]
         }
      }
   }
}
```

> Sign in to the app by following the `next` link relation.

##### Response Example for Factor Enroll


User is assigned to an MFA Policy that requires enrollment during sign-on and must [select a factor to enroll](#enroll-factor) to complete the authentication transaction.

```json
{
   "stateToken":"00zEfSRIpELrl87ndYiHNkvOEbyEPrBmTYuf9dsGLl",
   "type":"SESSION_STEP_UP",
   "expiresAt":"2017-05-30T22:58:09.000Z",
   "status":"MFA_ENROLL",
   "_embedded":{
      "user":{
         "id":"00ub0oNGTSWTBKOLGLNR",
         "passwordChanged":"2017-03-29T21:37:25.000Z",
         "profile":{
            "login":"dade.murphy@example.com",
            "firstName":"Dade",
            "lastName":"Murphy",
            "locale":"en_US",
            "timeZone":"America/Los_Angeles"
         }
      },
      "factors":[
         {
            "factorType":"sms",
            "provider":"OKTA",
            "vendorName":"OKTA",
            "_links":{
               "enroll":{
                  "href":"https://${yourOktaDomain}/api/v1/authn/factors",
                  "hints":{
                     "allow":[
                        "POST"
                     ]
                  }
               }
            },
            "status":"NOT_SETUP",
            "enrollment": "OPTIONAL"
         }
      ],
      "target":{
         "type":"APP",
         "name":"salesforce",
         "label":"Corporate SFDC",
         "_links":{
            "logo":{
               "name":"medium",
               "href":"https://${yourOktaDomain}/assets/img/logos/salesforce_logo.dbd7e0b4de118a1dae1c39d60a3c30e5.png",
               "type":"image/png"
            }
         }
      },
      "authentication":{
         "protocol":"SAML2.0",
         "issuer":{
            "id":"0oa2x5jOopNCpswjo0g4",
            "name":"Corporate SFDC",
            "uri":"exk2x5ixHmk9MBnqz0g4"
         }
      }
   },
   "_links":{
      "cancel":{
         "href":"https://${yourOktaDomain}/api/v1/authn/cancel",
         "hints":{
            "allow":[
               "POST"
            ]
         }
      }
   }
}
```

##### Response Example for Factor Challenge


User is assigned to a Sign-on Policy or App Sign-on Policy that requires additional verification and must [select and verify](#verify-factor) a previously enrolled [factor](#factor-object) by `id` to complete the authentication transaction.

```json
{
   "stateToken":"00POAgFjELRueYUC1p7GFAmrm32EQa2HXw0_YssJ5J",
   "type":"SESSION_STEP_UP",
   "expiresAt":"2017-05-30T23:07:00.000Z",
   "status":"MFA_REQUIRED",
   "_embedded":{
      "user":{
         "id":"00ub0oNGTSWTBKOLGLNR",
         "passwordChanged":"2017-03-29T21:37:25.000Z",
         "profile":{
            "login":"dade.murphy@example.com",
            "firstName":"Dade",
            "lastName":"Murphy",
            "locale":"en_US",
            "timeZone":"America/Los_Angeles"
         }
      },
      "factors":[
         {
            "id":"opf1cla0gggOBWxuC1d8",
            "factorType":"push",
            "provider":"OKTA",
            "vendorName":"OKTA",
            "profile":{
               "credentialId":"abcd@okta.com",
               "deviceType":"SmartPhone_Android",
               "keys":[
                  {
                     "kty":"PKIX",
                     "use":"sig",
                     "kid":"default",
                     "x5c":[
                        "Mdkkdfjkdjf"
                     ]
                  }
               ],
               "name":"SM-N9005",
               "platform":"ANDROID",
               "version":"21"
            },
            "_links":{
               "verify":{
                  "href":"https://${yourOktaDomain}/api/v1/authn/factors/opf1cla0yyvOBWxuC1d8/verify",
                  "hints":{
                     "allow":[
                        "POST"
                     ]
                  }
               }
            }
         },
         {
            "id":"smsph8F1esz8LlSjo0g3",
            "factorType":"sms",
            "provider":"OKTA",
            "vendorName":"OKTA",
            "profile":{
               "phoneNumber":"+1 XXX-XXX-3161"
            },
            "_links":{
               "verify":{
                  "href":"https://${yourOktaDomain}/api/v1/authn/factors/smsph8F1esz8LlSjo0g3/verify",
                  "hints":{
                     "allow":[
                        "POST"
                     ]
                  }
               }
            }
         }
      ],
      "policy":{
         "allowRememberDevice":true,
         "rememberDeviceLifetimeInMinutes":1440,
         "rememberDeviceByDefault":false,
         "factorsPolicyInfo": {
             "opf1cla0gggOBWxuC1d8": {
                 "autoPushEnabled": true
             }
         }
      },
      "target":{
         "type":"APP",
         "name":"salesforce",
         "label":"Corporate SFDC",
         "_links":{
            "logo":{
               "name":"medium",
               "href":"https://${yourOktaDomain}/assets/img/logos/salesforce_logo.dbd7e0b4de118a1dae1c39d60a3c30e5.png",
               "type":"image/png"
            }
         }
      },
      "authentication":{
         "protocol":"SAML2.0",
         "issuer":{
            "id":"0oa2x5jOopNCpswjo0g4",
            "name":"Corporate SFDC",
            "uri":"exk2x5ixHmk9MBnqz0g4"
         }
      }
   },
   "_links":{
      "cancel":{
         "href":"https://${yourOktaDomain}/api/v1/authn/cancel",
         "hints":{
            "allow":[
               "POST"
            ]
         }
      }
   }
}
```


##### Response Example for Invalid or Unknown Application


```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
    "errorCode": "E0000001",
    "errorSummary": "Api validation failed: authRequest",
    "errorLink": "E0000001",
    "errorId": "oae-W6QeEcJQKarRZv8JcmtrA",
    "errorCauses": [
        {
            "errorSummary": "Invalid or unknown audience '0oa6gva7owNAhDam50h7'."
        }
    ]
}
```

##### Response Example for Unsupported Application


```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
    "errorCode": "E0000001",
    "errorSummary": "Api validation failed: authRequest",
    "errorLink": "E0000001",
    "errorId": "oaelApNWe8WR4uiK7EROTqp-Q",
    "errorCauses": [
        {
            "errorSummary": "Sign-in not allowed for app '0oapt2yIp38ySYiMP0g3'."
        }
    ]
}
```

### Change Password


<ApiOperation method="post" url="/api/v1/authn/credentials/change_password" />

This operation changes a user's password by providing the existing password and the new password for authentication transactions with either the `PASSWORD_EXPIRED` or `PASSWORD_WARN` state.

* A user *must* change their expired password for an authentication transaction with `PASSWORD_EXPIRED` status to successfully complete the transaction.
* A user *may* opt-out of changing their password (skip) when the transaction has a `PASSWORD_WARN` status.

#### Request Parameters for Change Password


| Parameter   | Description                                                      | Param Type | DataType  | Required |
| ----------- | ---------------------------------------------------------------- | ---------- | --------- | -------- |
| stateToken  | [state token](#state-token) for the current transaction              | Body       | String    | TRUE     |
| oldPassword | User's current password that is expired or about to expire       | Body       | String    | TRUE     |
| newPassword | New password for user                                            | Body       | String    | TRUE     |

#### Response Parameters for Change Password


[Authentication Transaction Object](#authentication-transaction-model) with the current [state](#transaction-state) for the authentication transaction.

If the `oldPassword` is invalid you will receive a `403 Forbidden` status code with the following error:

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "errorCode": "E0000014",
  "errorSummary": "Update of credentials failed",
  "errorLink": "E0000014",
  "errorId": "oaeYx8fd_-VQdONMI5OYcqoqw",
  "errorCauses": [
    {
      "errorSummary": "oldPassword: The credentials provided were incorrect."
    }
  ]
}
```

If the `newPassword` does not meet password policy requirements, you will receive a `403 Forbidden` status code with the following error:

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "errorCode": "E0000014",
  "errorSummary": "The password does meet the complexity requirements of the current password policy.",
  "errorLink": "E0000014",
  "errorId": "oaeuNNAquYEQkWFnUVG86Abbw",
  "errorCauses": [
    {
      "errorSummary": "Passwords must have at least 8 characters, a lowercase letter, an uppercase letter, a number, no parts of your username"
    }
  ]
}
```

##### Request Example for Change Password


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "oldPassword": "correcthorsebatterystaple",
  "newPassword": "Ch-ch-ch-ch-Changes!"
}' "https://${yourOktaDomain}/api/v1/authn/credentials/change_password"
```

##### Response Example for Change Password


```json
{
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "SUCCESS",
  "sessionToken": "00Fpzf4en68pCXTsMjcX8JPMctzN2Wiw4LDOBL_9pe",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    }
  }
}
```

## Multifactor Authentication Operations

You can enroll, activate, manage, and verify factors inside the authentication context with `/api/v1/authn/factors`.

> You can enroll, manage, and verify factors outside the authentication context with [`/api/v1/users/:uid/factors/`](/docs/reference/api/factors/#factor-verification-operations).

### Enroll Factor


<ApiOperation method="post" url="/api/v1/authn/factors" /> <SupportsCors />

Enrolls a user with a [factor](/docs/reference/api/factors/#supported-factors-for-providers) assigned by their **MFA Policy**.

* [Enroll Okta Security Question Factor](#enroll-okta-security-question-factor)
* [Enroll Okta SMS Factor](#enroll-okta-sms-factor)
* [Enroll Okta Call Factor](#enroll-okta-call-factor)
* [Enroll Okta Verify TOTP Factor](#enroll-okta-verify-totp-factor)
* [Enroll Okta Verify Push Factor](#enroll-okta-verify-push-factor)
* [Enroll Google Authenticator Factor](#enroll-google-authenticator-factor)
* [Enroll RSA SecurID Factor](#enroll-rsa-securid-factor)
* [Enroll Symantec VIP Factor](#enroll-symantec-vip-factor)
* [Enroll YubiKey Factor](#enroll-yubikey-factor)
* [Enroll Duo Factor](#enroll-duo-factor)
* [Enroll U2F Factor](#enroll-u2f-factor)
* [Enroll WebAuthn Factor](#enroll-webauthn-factor)
* [Enroll Custom HOTP Factor](#enroll-custom-hotp-factor)

> This operation is only available for users that have not previously enrolled a factor and have transitioned to the `MFA_ENROLL` [state](#transaction-state).

#### Request Parameters for Enroll Factor


| Parameter   | Description                                                                   | Param Type  | DataType                                                      | Required |
| ----------- | ----------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------- | -------- |
| stateToken  | [state token](#state-token) for the current transaction                           | Body        | String                                                        | TRUE     |
| factorType  | type of factor                                                                | Body        | [Factor Type](/docs/reference/api/factors/#factor-type)                            | TRUE     |
| provider    | factor provider                                                               | Body        | [Provider Type](/docs/reference/api/factors/#provider-type)                        | TRUE     |
| profile     | profile of a [supported factor](/docs/reference/api/factors/#supported-factors-for-providers)      | Body        | [Factor Profile Object](/docs/reference/api/factors/#factor-profile-object)        | TRUE     |

#### Response Parameters for Enroll Factor


[Authentication Transaction Object](#authentication-transaction-model) with the current [state](#transaction-state) for the authentication transaction.

> Some [factor types](/docs/reference/api/factors/#factor-type) require [activation](#activate-factor) to complete the enrollment process.  The [authentication transaction](#transaction-state) will transition to `MFA_ENROLL_ACTIVATE` if a factor requires activation.

#### Enroll Okta Security Question Factor


Enrolls a user with the Okta `question` factor and [question profile](/docs/reference/api/factors/#question-profile).

> Security Question factor does not require activation and is `ACTIVE` after enrollment

##### Request Example for Enroll Okta Security Question Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "factorType": "question",
  "provider": "OKTA",
  "profile": {
    "question": "disliked_food",
    "answer": "mayonnaise"
  }
}' "https://${yourOktaDomain}/api/v1/authn/factors"
```


##### Response Example for Enroll Okta Security Question Factor


```json
{
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "SUCCESS",
  "sessionToken": "00OhZsSfoCtbJTrU2XkwntfEl-jCj6ck6qcU_kA049",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    }
  }
}
```


#### Enroll Okta SMS Factor


Enrolls a user with the Okta `sms` factor and an [SMS profile](/docs/reference/api/factors/#sms-profile).  A text message with an OTP is sent to the device during enrollment and must be [activated](#activate-sms-factor) by following the `next` link relation to complete the enrollment process.

##### Request Example for Enroll Okta SMS Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "factorType": "sms",
  "provider": "OKTA",
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  }
}' "https://${yourOktaDomain}/api/v1/authn/factors"
```

##### Response Example for Enroll Okta SMS Factor


```json
{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "MFA_ENROLL_ACTIVATE",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    },
    "factor": {
      "id": "mbl198rKSEWOSKRIVIFT",
      "factorType": "sms",
      "provider": "OKTA",
      "profile": {
        "phoneNumber": "+1 XXX-XXX-1337"
      }
    }
  },
  "_links": {
    "next": {
      "name": "activate",
      "href": "https://${yourOktaDomain}/api/v1/authn/factors/mbl198rKSEWOSKRIVIFT/lifecycle/activate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "prev": {
      "href": "https://${yourOktaDomain}/api/v1/authn/previous",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "resend": [
      {
        "name": "sms",
        "href": "https://${yourOktaDomain}/api/v1/authn/factors/mbl198rKSEWOSKRIVIFT/lifecycle/resend",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    ]
  }
}
```

##### Resend SMS as Part of Enrollment


Use the `resend` link to send another OTP if user doesn't receive the original activation SMS OTP.

###### Request Example for Resend SMS


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "factorType": "sms",
  "provider": "OKTA",
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  }
}' "https://${yourOktaDomain}/api/v1/authn/factors/mbl198rKSEWOSKRIVIFT/lifecycle/resend"
```



#### Enroll Okta Call Factor


Enrolls a user with the Okta `call` factor and a [Call profile](/docs/reference/api/factors/#call-profile).  A voice call with an OTP is sent to the device during enrollment and must be [activated](#activate-call-factor) by following the `next` link relation to complete the enrollment process.

##### Request Example for Enroll Okta Call Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "factorType": "call",
  "provider": "OKTA",
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  }
}' "https://${yourOktaDomain}/api/v1/authn/factors"
```

##### Response Example for Enroll Okta Call Factor


```json
{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "MFA_ENROLL_ACTIVATE",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    },
    "factor": {
      "id": "clf198rKSEWOSKRIVIFT",
      "factorType": "call",
      "provider": "OKTA",
      "profile": {
        "phoneNumber": "+1 XXX-XXX-1337"
      }
    }
  },
  "_links": {
    "next": {
      "name": "activate",
      "href": "https://${yourOktaDomain}/api/v1/authn/factors/clf198rKSEWOSKRIVIFT/lifecycle/activate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "prev": {
      "href": "https://${yourOktaDomain}/api/v1/authn/previous",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "resend": [
      {
        "name": "call",
        "href": "https://${yourOktaDomain}/api/v1/authn/factors/clf198rKSEWOSKRIVIFT/lifecycle/resend",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    ]
  }
}
```

##### Resend Voice Call as Part of Enrollment


Use the `resend` link to send another OTP if user doesn't receive the original activation Voice Call OTP.

###### Request Example for Resend Voice Call


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "factorType": "call",
  "provider": "OKTA",
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  }
}' "https://${yourOktaDomain}/api/v1/authn/factors/clf198rKSEWOSKRIVIFT/lifecycle/resend"
```


#### Enroll Okta Verify TOTP Factor


Enrolls a user with the Okta `token:software:totp` factor.  The factor must be [activated](#activate-totp-factor) after enrollment by following the `next` link relation to complete the enrollment process.

> This API implements [the TOTP standard](https://tools.ietf.org/html/rfc6238), which is used by apps like Okta Verify and Google Authenticator.

##### Request Example for Enroll Okta Verify TOTP Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "factorType": "token:software:totp",
  "provider": "OKTA"
}' "https://${yourOktaDomain}/api/v1/authn/factors"
```

##### Response Example for Enroll Okta Verify TOTP Factor


```json
{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "MFA_ENROLL_ACTIVATE",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    },
    "factor": {
      "id": "ostf2xjtDKWFPZIKYDZV",
      "factorType": "token:software:totp",
      "provider": "OKTA",
      "profile": {
        "credentialId": "dade.murphy@example.com"
      },
      "_embedded": {
        "activation": {
          "timeStep": 30,
          "sharedSecret": "KBMTM32UJZSXQ2DW",
          "encoding": "base32",
          "keyLength": 6,
          "_links": {
            "qrcode": {
              "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/factors/ostf2xjtDKWFPZIKYDZV/qr/00Mb0zqhJQohwCDkB2wOifajAsAosEAXvDwuCmsAZs",
              "type": "image/png"
            }
          }
        }
      }
    }
  },
  "_links": {
    "next": {
      "name": "activate",
      "href": "https://${yourOktaDomain}/api/v1/authn/factors/ostf2xjtDKWFPZIKYDZV/lifecycle/activate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "prev": {
      "href": "https://${yourOktaDomain}/api/v1/authn/previous",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Enroll Okta Verify Push Factor


Enrolls a user with the Okta verify `push` factor. The factor must be [activated on the device](#activate-push-factor) by scanning the QR code or visiting the activation link sent via email or sms.

Use the published activation links to embed the QR code or distribute an activation `email` or `sms`.

> This API implements [the TOTP standard](https://tools.ietf.org/html/rfc6238), which is used by apps like Okta Verify and Google Authenticator.

##### Request Example for Enroll Okta Verify Push Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "factorType": "push",
  "provider": "OKTA"
}' "https://${yourOktaDomain}/api/v1/authn/factors"
```

##### Response Example for Enroll Okta Verify Push Factor


```json
{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "MFA_ENROLL_ACTIVATE",
  "factorResult": "WAITING",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    },
    "factor": {
      "id": "opfh52xcuft3J4uZc0g3",
      "factorType": "push",
      "provider": "OKTA",
      "_embedded": {
        "activation": {
          "expiresAt": "2015-11-03T10:15:57.000Z",
          "_links": {
            "qrcode": {
              "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/factors/opfh52xcuft3J4uZc0g3/qr/00fukNElRS_Tz6k-CFhg3pH4KO2dj2guhmaapXWbc4",
              "type": "image/png"
            },
            "send": [
              {
                "name": "email",
                "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/factors/opfh52xcuft3J4uZc0g3/lifecycle/activate/email",
                "hints": {
                  "allow": [
                    "POST"
                  ]
                }
              },
              {
                "name": "sms",
                "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/factors/opfh52xcuft3J4uZc0g3/lifecycle/activate/sms",
                "hints": {
                  "allow": [
                    "POST"
                  ]
                }
              }
            ]
          }
        }
      }
    }
  },
  "_links": {
    "next": {
      "name": "poll",
      "href": "https://${yourOktaDomain}/api/v1/authn/factors/opfh52xcuft3J4uZc0g3/lifecycle/activate/poll",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "prev": {
      "href": "https://${yourOktaDomain}/api/v1/authn/previous",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Enroll Google Authenticator Factor


Enrolls a user with the Google `token:software:totp` factor.  The factor must be [activated](#activate-totp-factor) after enrollment by following the `next` link relation to complete the enrollment process.

##### Request Example for Enroll Google Authenticator Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "factorType": "token:software:totp",
  "provider": "GOOGLE"
}' "https://${yourOktaDomain}/api/v1/authn/factors"
```

##### Response Example for Enroll Google Authenticator Factor


```json
{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "MFA_ENROLL_ACTIVATE",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    },
    "factor": {
      "id": "ostf2xjtDKWFPZIKYDZV",
      "factorType": "token:software:totp",
      "provider": "GOOGLE",
      "profile": {
        "credentialId": "dade.murphy@example.com"
      },
      "_embedded": {
        "activation": {
          "timeStep": 30,
          "sharedSecret": "KYCRM33UJZSXQ2DW",
          "encoding": "base32",
          "keyLength": 6,
          "_links": {
            "qrcode": {
              "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/factors/uftm3iHSGFQXHCUSDAND/qr/00Mb0zqhJQohwCDkB2wOifajAsAosEAXvDwuCmsAZs",
              "type": "image/png"
            }
          }
        }
      }
    }
  },
  "_links": {
    "next": {
      "name": "activate",
      "href": "https://${yourOktaDomain}/api/v1/authn/factors/uftm3iHSGFQXHCUSDAND/lifecycle/activate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "prev": {
      "href": "https://${yourOktaDomain}/api/v1/authn/previous",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Enroll RSA SecurID Factor


Enrolls a user with a RSA SecurID factor and a [token profile](/docs/reference/api/factors/#token-profile).  RSA tokens must be verified with the [current pin+passcode](/docs/reference/api/factors/#factor-verification-object) as part of the enrollment request.

##### Request Example for Enroll RSA SecurID Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "factorType": "token",
  "provider": "RSA",
  "profile": {
    "credentialId": "dade.murphy@example.com"
  },
  "passCode": "5275875498"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors"
```

##### Response Example for Enroll RSA SecurID Factor


```json
{
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "SUCCESS",
  "sessionToken": "00OhZsSfoCtbJTrU2XkwntfEl-jCj6ck6qcU_kA049",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    }
  }
}
```

#### Enroll Symantec VIP Factor


Enrolls a user with a Symantec VIP factor and a [token profile](/docs/reference/api/factors/#token-profile).  Symantec tokens must be verified with the [current and next passcodes](/docs/reference/api/factors/#factor-verification-object) as part of the enrollment request.

##### Request Example for Enroll Symantec VIP Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "factorType": "token",
  "provider": "SYMANTEC",
  "profile": {
    "credentialId": "VSMT14393584"
  },
  "passCode": "875498",
  "nextPassCode": "678195"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors"
```

##### Response Example for Enroll Symantec VIP Factor


```json
{
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "SUCCESS",
  "sessionToken": "00OhZsSfoCtbJTrU2XkwntfEl-jCj6ck6qcU_kA049",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    }
  }
}
```

#### Enroll YubiKey Factor


Enrolls a user with a Yubico factor (YubiKey).  YubiKeys must be verified with the [current passcode](/docs/reference/api/factors/#factor-verification-object) as part of the enrollment request.

##### Request Example for Enroll YubiKey Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "token:hardware",
  "provider": "YUBICO",
  "passCode": "cccccceukngdfgkukfctkcvfidnetljjiknckkcjulji"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors"
```

##### Response Example for Enroll YubiKey Factor


```json
{
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "SUCCESS",
  "sessionToken": "00OhZsSfoCtbJTrU2XkwntfEl-jCj6ck6qcU_kA049",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    }
  }
}
```


#### Enroll Duo Factor


 The enrollment process starts with an enrollment request to Okta, then continues with the Duo widget that is embedded in the page. The page needs to create an iframe with the name `duo_iframe` (described [in Duo documentation](https://duo.com/docs/duoweb#3.-show-the-iframe)) to host the widget. The script address is received in the response object in \_embedded.factor.\_embedded.\_links.script object. The information to initialize the Duo object is taken from \_embedded.factor.\_embedded.activation object as it is shown in the [full example](#full-page-example-for-duo-enrollment). In order to maintain the link between Duo and Okta the stateToken must be passed back when Duo calls the callback. This is done by populating the hidden element in the "duo_form" as it is described [here](https://duo.com/docs/duoweb/#passing-additional-post-arguments-with-the-signed-response). After Duo enrollment and verification is done, the Duo script makes a call back to Okta. To complete the authentication process, make a call using [the poll link](#activation-poll-request-example) to get session token and verify successful state.

##### Request Example for Enroll Duo Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "factorType": "web",
  "provider": "DUO",
  "stateToken": "$(stateToken}"
}' "https://${yourOktaDomain}/api/v1/authn/factors"
```

##### Response Example for Enroll Duo Factor


```json
{
  "stateToken":"00BlN4kOtm7wNxuM8nuXsOK1PFXBkvvTH-buJUrgWX",
  "expiresAt":"2016-07-13T13:14:52.000Z",
  "status":"MFA_ENROLL_ACTIVATE",
  "factorResult":"WAITING",
  "_embedded":{
      "user":{
          "id":"00uku2SnbUX49SAGb0g3",
          "passwordChanged":"2016-07-13T13:07:51.000Z",
          "profile":{
              "login":"first.last@gexample.com",
              "firstName":"First",
              "lastName":"Last",
              "locale":"en_US",
              "timeZone":"America/Los_Angeles"
          }
      },
      "factor":{
          "id":"dsflnpo99zpfMyaij0g3",
          "factorType":"web",
          "provider":"DUO",
          "vendorName":"DUO",
          "profile":{
              "credentialId":"first.last@gexample.com"
          },
          "_embedded":{
              "activation":{
                  "host":"api-your-host.duosecurity.com",
                  "signature":"TX|...your-signature",
                  "factorResult":"WAITING",
                  "_links":{
                      "complete":{
                          "href":"https://${yourOktaDomain}/api/v1/authn/factors/dsflnpo99zpfMyaij0g3/lifecycle/duoCallback",
                          "hints":{
                              "allow":[
                                  "POST"
                             ]
                          }
                      },
                      "script":{
                          "href":"https://${yourOktaDomain}/js/sections/duo/Duo-Web-v2.js",
                          "type":"text/javascript; charset=utf-8"
                      }
                  }
              }
          }
      }
  },
  "_links":{
      "next":{
          "name":"poll",
          "href":"https://${yourOktaDomain}/api/v1/authn/factors/dsflnpo99zpfMyaij0g3/lifecycle/activate/poll",
          "hints":{
              "allow":[
                   "POST"
              ]
          }
      },
      "cancel":{
          "href":"https://${yourOktaDomain}/api/v1/authn/cancel",
          "hints":{
              "allow":[
                  "POST"
              ]
          }
      },
      "prev":{
          "href":"https://${yourOktaDomain}/api/v1/authn/previous",
          "hints":{
              "allow":[
                  "POST"
              ]
          }
      }
  }
}
```

#### Full Page Example for Duo enrollment
In this example we will put all the elements together in html page.

```html
<html>
    <body>
        <!--
            The Duo SDK will automatically bind to this iFrame and populate it for us.
            See https://www.duosecurity.com/docs/duoweb for more info.
         -->
        <iframe id="duo_iframe" width="620" height="330" frameborder="0"></iframe>
        <!--
            The Duo SDK will automatically bind to this form and submit it for us.
            See https://www.duosecurity.com/docs/duoweb for more info.
         -->
        <form method="POST" id="duo_form">
            <!-- The state token is required here (in order to bind anonymous request back into Auth API) -->
            <input type="hidden" name="stateToken" value='00BlN4kOtm7wNxuM8nuXsOK1PFXBkvvTH-buJUrgWX' />
        </form>

        <script src="https://${yourOktaDomain}/js/sections/duo/Duo-Web-v2.js"></script>

        <!-- The host, sig_request, and post_action values will be given via the Auth API -->
        <script>
            Duo.init({
                'host': 'api-your-host.duosecurity.com',
                'sig_request': 'TX|...your-signature',
                'post_action': 'https://${yourOktaDomain}/api/v1/authn/factors/dsflnpo99zpfMyaij0g3/lifecycle/duoCallback'
            });
        </script>
    </body>
</html>
```

##### Activation Poll Request Example

The poll is to verify successful authentication and to obtain session token.

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "$(stateToken}"
}' "https://${yourOktaDomain}/api/v1/authn/factors/${factorId}/lifecycle/activate/poll"
```

##### Activation Poll Response Example


```json
{
  "expiresAt":"2016-07-13T13:37:42.000Z",
  "status":"SUCCESS",
  "sessionToken":"20111zMXPaEe_lEw7pg2Ub810HDkpBwzSVBEPBRpA87LH5sW3Jj35_x",
  "_embedded":{
    "user":{
        "id":"00ukv3jVTgRjDctlX0g3",
        "passwordChanged":"2016-07-13T13:29:58.000Z",
        "profile":{
            "login":"first.last@example.com",
            "firstName":"First",
            "lastName":"Last",
            "locale":"en_US",
            "timeZone":"America/Los_Angeles"
        }
    }
  }
}
```

#### Enroll U2F Factor


Enrolls a user with a U2F factor.  The enrollment process starts with getting an `appId` and `nonce` from Okta and using those to get registration information from the U2F key using the U2F javascript API.

Note:

The `appId` property in Okta U2F enroll/verify API response is the [origin](https://www.ietf.org/rfc/rfc6454.txt) of
the web page that triggers the API request (assuming the origin has been configured to be trusted by Okta). According to
[FIDO
spec](https://fidoalliance.org/specs/fido-u2f-v1.2-ps-20170411/fido-appid-and-facets-v1.2-ps-20170411.html#h2_the-appid-and-facetid-assertions),
enroll and verify U2F device with `appId`s in different DNS zone is not allowed. For
example, if a user enrolled a U2F device via Okta Sign-in widget that is hosted at `https://login.company.com`, while the user can verify the U2F factor from `https://login.company.com`, the user would not be able to verify it from Okta portal `https://company.okta.com`, U2F device would return error code 4 - `DEVICE_INELIGIBLE`.

##### Enroll U2F Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "factorType": "u2f",
  "provider": "FIDO",
  "stateToken": "$(stateToken}"
}' "https://${yourOktaDomain}/api/v1/authn/factors"
```

##### Enroll U2F Response Example


```json
{
  "stateToken": "00s7Yewe3Z4aujPLpR4qW4y1hMKzAbyXK5LSKJRW2G",
  "expiresAt": "2016-12-05T19:40:53.000Z",
  "status": "MFA_ENROLL_ACTIVATE",
  "_embedded": {
    "user": {
      "id": "00ukv3jVTgRjDctlX0g3",
      "passwordChanged": "2015-10-28T23:27:57.000Z",
      "profile": {
        "login": "first.last@gmail.com",
        "firstName": "First",
        "lastName": "Last",
        "locale": "en",
        "timeZone": "America/Los_Angeles"
      }
    },
    "factor": {
      "id": "fuf8y1y14jaygfX5K0h7",
      "factorType": "u2f",
      "provider": "FIDO",
      "vendorName": "FIDO",
      "_embedded": {
        "activation": {
          "version": "U2F_V2",
          "appId": "https://${yourOktaDomain}",
          "nonce": "s-NaltFnye-xNsJeAhnN",
          "timeoutSeconds": 20
        }
      }
    }
  },
  "_links": {
    "next": {
      "name": "activate",
      "href": "https://${yourOktaDomain}/api/v1/authn/factors/fuf8y1y14jaygfX5K0h7/lifecycle/activate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "prev": {
      "href": "https://${yourOktaDomain}/api/v1/authn/previous",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Enroll WebAuthn Factor

> **Note:** The WebAuthN factor is available for those using the [Okta-hosted custom sign-in page](/docs/guides/custom-hosted-signin/). If you are using a self-hosted, customized sign-in-widget, you must first upgrade to widget version 3.4.0 and enable the [configuration option](https://github.com/okta/okta-signin-widget#configuration).

Enrolls a user with a WebAuthn factor. The enrollment process starts with getting the WebAuthn credential creation options, which are used to help select an appropriate authenticator using the WebAuthn API.
This authenticator then generates an enrollment attestation that may be used to register the authenticator for the user.

##### Enroll WebAuthn Request Parameters

| Parameter    | Description                                                  | Param Type | DataType | Required |
| ------------ | ------------------------------------------------------------ | ---------- | -------- | -------- |
| stateToken   | [state token](#state-token) for the current transaction          | Body       | String   | TRUE     |


##### Enroll WebAuthn Response Parameters

In the [embedded resources](#embedded-resources) object, the `factor._embedded.activation` object contains properties used to guide the client in creating a new WebAuthn credential for use with Okta.

For more information about these credential creation options, see the [WebAuthn spec for PublicKeyCredentialCreationOptions](https://www.w3.org/TR/webauthn/#dictionary-makecredentialoptions).

> **Note:** Additionally, the activation object contains a `u2fParams` object with an `appid` property. This deprecated legacy property was used to support backwards compatibility with U2F and is no longer in use.

##### Enroll WebAuthn Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "factorType": "webauthn",
  "provider": "FIDO",
  "stateToken": "$(stateToken}"
}' "https://${yourOktaDomain}/api/v1/authn/factors"
```

###### Enroll WebAuthn Response Example


```json
{
  "stateToken": "00IzlXt68vyoh3r6rtv9JWXLwSuVkM6_AP65f-Actj",
  "expiresAt": "2016-12-05T19:40:53.000Z",
  "status": "MFA_ENROLL_ACTIVATE",
  "_embedded": {
    "user": {
      "id": "00ukv3jVTgRjDctlX0g3",
      "passwordChanged": "2015-10-28T23:27:57.000Z",
      "profile": {
        "login": "first.last@gmail.com",
        "firstName": "First",
        "lastName": "Last",
        "locale": "en",
        "timeZone": "America/Los_Angeles"
      }
    },
    "factor": {
      "id": "fwfbaopNw5CCGJTu20g4",
      "factorType": "webauthn",
      "provider": "FIDO",
      "vendorName": "FIDO",
      "_embedded": {
        "activation": {
          "attestation": "direct",
          "authenticatorSelection": {
            "userVerification": "preferred",
            "requireResidentKey": false
          },
          "challenge": "cdsZ1V10E0BGE9GcG3IK",
          "excludeCredentials": [],
          "pubKeyCredParams": [
            {
              "type": "public-key",
              "alg": -7
            },
            {
              "type": "public-key",
              "alg": -257
            }
          ],
          "rp": {
            "name":"Rain-Cloud59"
          },
          "u2fParams": {
            "appid": "https://${yourOktaDomain}.com"
          },
          "user": {
            "displayName": "First Last",
            "name": "first.last@gmail.com",
            "id": "00ukv3jVTgRjDctlX0g3"
          }
        }
      }
    }
  },
  "_links": {
    "next": {
      "name": "activate",
      "href": "https://${yourOktaDomain}/api/v1/authn/factors/fwfbaopNw5CCGJTu20g4/lifecycle/activate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "prev": {
      "href": "https://${yourOktaDomain}/api/v1/authn/previous",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Enroll Custom HOTP Factor
Enrollment via the Authentication API is currently not supported for Custom HOTP Factor.  Please refer to the Factors API documentation [here](/docs/reference/api/factors/#enroll-custom-hotp-factor) if you would like to enroll users for this type of factor.

### Activate Factor


<ApiOperation method="post" url="/api/v1/authn/factors/${factorId}/lifecycle/activate" /> <SupportsCors />

The `sms`,`call` and `token:software:totp` [factor types](/docs/reference/api/factors/#factor-type) require activation to complete the enrollment process.

* [Activate TOTP Factor](#activate-totp-factor)
* [Activate SMS Factor](#activate-sms-factor)
* [Activate Call Factor](#activate-call-factor)
* [Activate Push Factor](#activate-push-factor)
* [Activate U2F Factor](#activate-u2f-factor)
* [Activate WebAuthn Factor](#activate-webauthn-factor)

#### Activate TOTP Factor


Activates a `token:software:totp` factor by verifying the OTP.

> This API implements [the TOTP standard](https://tools.ietf.org/html/rfc6238), which is used by apps like Okta Verify and Google Authenticator.

##### Request Parameters for Activate TOTP Factor


| Parameter    | Description                                          | Param Type | DataType | Required |
| ------------ | ---------------------------------------------------- | ---------- | -------- | -------- |
| factorId     | `id` of factor returned from enrollment              | URL        | String   | TRUE     |
| stateToken   | [state token](#state-token)  for the current transaction | Body       | String   | TRUE     |
| passCode     | OTP generated by device                              | Body       | String   | TRUE     |

##### Response Parameters for Activate TOTP Factor


[Authentication Transaction Object](#authentication-transaction-model) with the current [state](#transaction-state) for the authentication transaction.

If the passcode is invalid, you receive a `403 Forbidden` status code with the following error:

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "errorCode": "E0000068",
  "errorSummary": "Invalid Passcode/Answer",
  "errorLink": "E0000068",
  "errorId": "oaei_IfXcpnTHit_YEKGInpFw",
  "errorCauses": [
    {
      "errorSummary": "Your passcode doesn't match our records. Please try again."
    }
  ]
}
```

##### Activate TOTP Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "passCode": "123456"
}' "https://${yourOktaDomain}/api/v1/authn/factors/ostf1fmaMGJLMNGNLIVG/lifecycle/activate"
```

##### Activate TOTP Response Example


```json
{
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "SUCCESS",
  "sessionToken": "00Fpzf4en68pCXTsMjcX8JPMctzN2Wiw4LDOBL_9pe",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    }
  }
}
```

#### Activate SMS Factor


Activates a `sms` factor by verifying the OTP.  The request and response is identical to [activating a TOTP factor](#activate-totp-factor)

##### Activate SMS Factor Request Parameters


| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| factorId     | `id` of factor returned from enrollment             | URL        | String   | TRUE     |
| stateToken   | [state token](#state-token) for the current transaction | Body       | String   | TRUE     |
| passCode     | OTP sent to mobile device                           | Body       | String   | TRUE     |

##### Activate SMS Factor Response Parameters


[Authentication Transaction Object](#authentication-transaction-model) with the current [state](#transaction-state) for the authentication transaction.

If the passcode is invalid, you receive a `403 Forbidden` status code with the following error:

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "errorCode": "E0000068",
  "errorSummary": "Invalid Passcode/Answer",
  "errorLink": "E0000068",
  "errorId": "oaei_IfXcpnTHit_YEKGInpFw",
  "errorCauses": [
    {
      "errorSummary": "Your passcode doesn't match our records. Please try again."
    }
  ]
}
```

##### Activate SMS Factor Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "passCode": "123456"
}' "https://${yourOktaDomain}/api/v1/authn/factors/sms1o51EADOTFXHHBXBP/lifecycle/activate"
```

##### Activate SMS Factor Response Example


```json
{
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "SUCCESS",
  "sessionToken": "00Fpzf4en68pCXTsMjcX8JPMctzN2Wiw4LDOBL_9pe",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    }
  }
}

```

#### Activate Call Factor


Activates a `call` factor by verifying the OTP.  The request and response is identical to [activating a TOTP factor](#activate-totp-factor)

##### Activate Call Factor Request Parameters


| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| factorId     | `id` of factor returned from enrollment             | URL        | String   | TRUE     |
| stateToken   | [state token](#state-token) for the current transaction | Body       | String   | TRUE     |
| passCode     | Passcode received via the voice call                | Body       | String   | TRUE     |

##### Activate Call Factor Response Parameters


[Authentication Transaction Object](#authentication-transaction-model) with the current [state](#transaction-state) for the authentication transaction.

If the passcode is invalid, you receive a `403 Forbidden` status code with the following error:

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "errorCode": "E0000068",
  "errorSummary": "Invalid Passcode/Answer",
  "errorLink": "E0000068",
  "errorId": "oaei_IfXcpnTHit_YEKGInpFw",
  "errorCauses": [
    {
      "errorSummary": "Your passcode doesn't match our records. Please try again."
    }
  ]
}
```

##### Activate Call Factor Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "passCode": "12345"
}' "https://${yourOktaDomain}/api/v1/authn/factors/clf1o51EADOTFXHHBXBP/lifecycle/activate"
```

##### Activate Call Factor Response Example


```json
{
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "SUCCESS",
  "sessionToken": "00Fpzf4en68pCXTsMjcX8JPMctzN2Wiw4LDOBL_9pe",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    }
  }
}

```

#### Activate Push Factor


Activation of `push` factors are asynchronous and must be polled for completion when the `factorResult` returns a `WAITING` status.

Activations have a short lifetime (minutes) and will `TIMEOUT` if they are not completed before the `expireAt` timestamp.  Use the published `activate` link to restart the activation process if the activation is expired.

##### Activate Push Factor Request Parameters


| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| factorId     | `id` of factor returned from enrollment             | URL        | String   | TRUE     |
| stateToken   | [state token](#state-token) for the current transaction | Body       | String   | TRUE     |

##### Activate Push Factor Response Parameters


[Authentication Transaction Object](#authentication-transaction-model) with the current [state](#transaction-state) for the authentication transaction.

##### Activate Push Factor Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb"
}' "https://${yourOktaDomain}/api/v1/authn/factors/opfh52xcuft3J4uZc0g3/lifecycle/activate"
```

##### Activate Push Factor Response Example (Waiting)


> Follow the the published `next` link to keep polling for activation completion

```json
{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "MFA_ENROLL_ACTIVATE",
  "factorResult": "WAITING",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    },
    "factor": {
      "id": "opfh52xcuft3J4uZc0g3",
      "factorType": "push",
      "provider": "OKTA",
      "_embedded": {
        "activation": {
          "expiresAt": "2015-11-03T10:15:57.000Z",
          "_links": {
            "qrcode": {
              "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/factors/opfh52xcuft3J4uZc0g3/qr/00fukNElRS_Tz6k-CFhg3pH4KO2dj2guhmaapXWbc4",
              "type": "image/png"
            },
            "send": [
              {
                "name": "email",
                "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/factors/opfh52xcuft3J4uZc0g3/lifecycle/activate/email",
                "hints": {
                  "allow": [
                    "POST"
                  ]
                }
              },
              {
                "name": "sms",
                "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/factors/opfh52xcuft3J4uZc0g3/lifecycle/activate/sms",
                "hints": {
                  "allow": [
                    "POST"
                  ]
                }
              }
            ]
          }
        }
      }
    }
  },
  "_links": {
    "next": {
      "name": "poll",
      "href": "https://${yourOktaDomain}/api/v1/authn/factors/opfh52xcuft3J4uZc0g3/lifecycle/activate/poll",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "prev": {
      "href": "https://${yourOktaDomain}/api/v1/authn/previous",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

##### Activate Push Factor Response Example (Success)


```json
{
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "SUCCESS",
  "sessionToken": "00Fpzf4en68pCXTsMjcX8JPMctzN2Wiw4LDOBL_9pe",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    }
  }
}
```

##### Activate Push Factor Response Example (Timeout)


> Follow the the published `activate` link to restart the activation process.

```json
{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "MFA_ENROLL_ACTIVATE",
  "factorResult": "TIMEOUT",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    },
    "factor": {
      "id": "opfh52xcuft3J4uZc0g3",
      "factorType": "push",
      "provider": "OKTA",
      "_embedded": {
        "activation": {
          "factorResult": "TIMEOUT",
          "_links": {
            "activate": {
              "href": "https://${yourOktaDomain}/api/v1/users/00u4vi0VX6U816Kl90g4/factors/opfh52xcuft3J4uZc0g3/lifecycle/activate",
              "hints": {
                "allow": [
                  "POST"
                ]
              }
            },
            "send": [
              {
                "name": "email",
                "href": "https://${yourOktaDomain}/api/v1/authn/factors/opfh52xcuft3J4uZc0g3/lifecycle/activate/email",
                "hints": {
                  "allow": [
                    "POST"
                  ]
                }
              },
              {
                "name": "sms",
                "href": "https://${yourOktaDomain}/api/v1/authn/factors/opfh52xcuft3J4uZc0g3/lifecycle/activate/sms",
                "hints": {
                  "allow": [
                    "POST"
                  ]
                }
              }
            ]
          }
        }
      }
    }
  },
  "_links": {
    "next": {
      "name": "activate",
      "href": "https://${yourOktaDomain}/api/v1/authn/factors/opfh52xcuft3J4uZc0g3/lifecycle/activate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "prev": {
      "href": "https://${yourOktaDomain}/api/v1/authn/previous",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

##### Poll for Push Factor Activation

After the push notification is sent to user's device we need to know when the user completes the activation. This is done by polling the "poll" link.

###### Poll for Push Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb"
}' "https://${yourOktaDomain}/api/v1/authn/factors/opfh52xcuft3J4uZc0g3/lifecycle/activate/poll"
```

###### Poll for Push Response Example


```json
{
  "stateToken":"007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "expiresAt":"2016-12-22T21:36:47.000Z",
  "status":"MFA_ENROLL_ACTIVATE",
  "factorResult":"WAITING",
  "_embedded":{
    "user":{
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2016-12-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    },
    "factor":{
      "id":"opfh52xcuft3J4uZc0g3",
      "factorType":"push",
      "provider":"OKTA",
      "vendorName":"OKTA",
      "_embedded":{
        "activation":{
          "expiresAt":"2016-12-22T21:41:47.000Z",
          "factorResult":"WAITING",
          "_links":{
            "send":[
              {
                "name":"email",
                "href":"https://${yourOktaDomain}/api/v1/authn/factors/opfh52xcuft3J4uZc0g3/lifecycle/activate/email",
                "hints":{
                  "allow":["POST"]
                }
              },
              {
                "name":"sms",
                "href":"https://${yourOktaDomain}/api/v1/authn/factors/opfh52xcuft3J4uZc0g3/lifecycle/activate/sms",
                "hints":{
                  "allow":["POST"]
                }
              }
            ],
            "qrcode":{
              "href":"https://${yourOktaDomain}/api/v1/users/opfh52xcuft3J4uZc0g3/factors/opfn169oIx3k63Klh0g3/qr/20111huUFWDFTAeq_lFQKfKFS_rLABkE_pKgGl5PBUeLvJVmaIrWq5u",
              "type":"image/png"
            }
          }
        }
      }
    }
  },
  "_links":{
    "next":{
      "name":"poll",
      "href":"https://${yourOktaDomain}/api/v1/authn/factors/opfh52xcuft3J4uZc0g3/lifecycle/activate/poll",
      "hints":{
        "allow":["POST"]
      }
    },
    "cancel":{
      "href":"https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints":{
        "allow":["POST"]
      }
    },
    "prev":{
      "href":"https://${yourOktaDomain}/api/v1/authn/previous",
      "hints":{
        "allow":["POST"]
      }
    }
  }
}
```

##### Send Activation Links

Sends an activation email or SMS when when the user is unable to scan the QR code provided as part of an Okta Verify transaction.
If for any reason the user can't scan the QR code, they can use the link provided in email or SMS to complete the transaction.

> The user must click the link from the same device as the one where the Okta Verify app is installed.

###### Send Activation Links Request Example (Email)


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb"
}' "https://${yourOktaDomain}/api/v1/authn/factors/opfh52xcuft3J4uZc0g3/lifecycle/activate/email"
```

###### Send Activation Links Request Example (SMS)


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  }
}' "https://${yourOktaDomain}/api/v1/authn/factors/opfh52xcuft3J4uZc0g3/lifecycle/activate/sms"
```

###### Send Activation Links Response Example


```json
{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "MFA_ENROLL_ACTIVATE",
  "factorResult": "WAITING",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    },
    "factor": {
      "id": "opfh52xcuft3J4uZc0g3",
      "factorType": "push",
      "provider": "OKTA",
      "_embedded": {
        "activation": {
          "expiresAt": "2015-11-03T10:15:57.000Z",
          "_links": {
            "qrcode": {
              "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/factors/opfh52xcuft3J4uZc0g3/qr/00fukNElRS_Tz6k-CFhg3pH4KO2dj2guhmaapXWbc4",
              "type": "image/png"
            },
            "send": [
              {
                "name": "email",
                "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/factors/opfh52xcuft3J4uZc0g3/lifecycle/activate/email",
                "hints": {
                  "allow": [
                    "POST"
                  ]
                }
              },
              {
                "name": "sms",
                "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/factors/opfh52xcuft3J4uZc0g3/lifecycle/activate/sms",
                "hints": {
                  "allow": [
                    "POST"
                  ]
                }
              }
            ]
          }
        }
      }
    }
  },
  "_links": {
    "next": {
      "name": "poll",
      "href": "https://${yourOktaDomain}/api/v1/authn/factors/opfh52xcuft3J4uZc0g3/lifecycle/activate/poll",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "prev": {
      "href": "https://${yourOktaDomain}/api/v1/authn/previous",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Activate U2F Factor


Activation gets the registration information from the U2F token using the API and passes it to Okta.

##### Get registration information from U2F token by calling the U2F Javascript library method


```html
<!-- Get the u2f-api.js from https://github.com/google/u2f-ref-code/tree/master/u2f-gae-demo/war/js -->
<script src="/u2f-api.js"></script>
<script>
  // Use the appId from the activation object
  var appId = activation.appId;

  // Use the version and nonce from the activation object
  var registerRequests = [
    {
      version: activation.version,
      challenge: activation.nonce
    }
  ];

  u2f.register(appId, registerRequests, [], function (data) {
    if (data.errorCode && data.errorCode !== 0) {
      // Error from U2F platform
    } else {
      // Get the registrationData from the callback result
      var registrationData = data.registrationData;

      // Get the clientData from the callback result
      var clientData = data.clientData;
    }
  });
</script>
```

Activate a `u2f` factor by verifying the registration data and client data.

##### Activate U2F Request Parameters


| Parameter         | Description                                                | Param Type | DataType | Required |
| ----------------- | ---------------------------------------------------------- | ---------- | -------- | -------- |
| factorId          | `id` of factor returned from enrollment                    | URL        | String   | TRUE     |
| stateToken        | [state token](#state-token) for the current transaction        | Body       | String   | TRUE     |
| registrationData  | base64-encoded registration data from U2F javascript call  | Body       | String   | TRUE     |
| clientData        | base64-encoded client data from U2F javascript call        | Body       | String   | TRUE     |

##### Activate U2F Response Parameters


[Authentication Transaction Object](#authentication-transaction-model) with the current [state](#transaction-state) for the authentication transaction.

If the registration nonce is invalid or if registration data is invalid, you receive a `403 Forbidden` status code with the following error:

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "errorCode": "E0000068",
  "errorSummary": "Invalid Passcode/Answer",
  "errorLink": "E0000068",
  "errorId": "oaei_IfXcpnTHit_YEKGInpFw",
  "errorCauses": [
    {
      "errorSummary": "Your passcode doesn't match our records. Please try again."
    }
  ]
}
```

##### Activate U2F Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "registrationData": "BQTl3Iu9V4caCvcI44pmYwIehICWyboL_J2Wl5FA6ZGNx9qT11Df-rHJIy9iP6MSJ_qAaKqdq8O0XVqBG46p6qbpQLIb471thYthrQiW9955tNdORCEhvZX9iYNI1peNlETOr7Qx_PgIZ6Ein6aB3wH9JCTGgsdd4JX3cYixbj1v9W8wggJEMIIBLqADAgECAgRVYr6gMAsGCSqGSIb3DQEBCzAuMSwwKgYDVQQDEyNZdWJpY28gVTJGIFJvb3QgQ0EgU2VyaWFsIDQ1NzIwMDYzMTAgFw0xNDA4MDEwMDAwMDBaGA8yMDUwMDkwNDAwMDAwMFowKjEoMCYGA1UEAwwfWXViaWNvIFUyRiBFRSBTZXJpYWwgMTQzMjUzNDY4ODBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABEszH3c9gUS5mVy-RYVRfhdYOqR2I2lcvoWsSCyAGfLJuUZ64EWw5m8TGy6jJDyR_aYC4xjz_F2NKnq65yvRQwmjOzA5MCIGCSsGAQQBgsQKAgQVMS4zLjYuMS40LjEuNDE0ODIuMS41MBMGCysGAQQBguUcAgEBBAQDAgUgMAsGCSqGSIb3DQEBCwOCAQEArBbZs262s6m3bXWUs09Z9Pc-28n96yk162tFHKv0HSXT5xYU10cmBMpypXjjI-23YARoXwXn0bm-BdtulED6xc_JMqbK-uhSmXcu2wJ4ICA81BQdPutvaizpnjlXgDJjq6uNbsSAp98IStLLp7fW13yUw-vAsWb5YFfK9f46Yx6iakM3YqNvvs9M9EUJYl_VrxBJqnyLx2iaZlnpr13o8NcsKIJRdMUOBqt_ageQg3ttsyq_3LyoNcu7CQ7x8NmeCGm_6eVnZMQjDmwFdymwEN4OxfnM5MkcKCYhjqgIGruWkVHsFnJa8qjZXneVvKoiepuUQyDEJ2GcqvhU2YKY1zBGAiEAxWDh5F7vr0AoEsi3N-uR6KR3ADXlZnQgzROUTVhff8ICIQCiUUG1FkQ9e8PW1dhRk6tjHjL22KZ9JqBrTfpytC5jaQ==",
  "clientData": "eyAiY2hhbGxlbmdlIjogImFYLS1wMTlibldWcUlnY25HU0hLIiwgIm9yaWdpbiI6ICJodHRwczpcL1wvc25hZ2FuZGxhLm9rdGFwcmV2aWV3LmNvbSIsICJ0eXAiOiAibmF2aWdhdG9yLmlkLmZpbmlzaEVucm9sbG1lbnQiIH0=",
  "stateToken": "00MBkDX0vBddsuU1VnDsa7-qqIOi7g51YLNQEen1hi"
}' "https://${yourOktaDomain}/api/v1/authn/factors/fuf1o51EADOTFXHHBXBP/lifecycle/activate"
```

##### Activate U2F Response Example


```json
{
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "SUCCESS",
  "sessionToken": "00Fpzf4en68pCXTsMjcX8JPMctzN2Wiw4LDOBL_9pe",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    }
  }
}
```

#### Activate WebAuthn Factor


Activation gets the registration information from the WebAuthn assertion using the API and passes it to Okta.

##### Get registration information from WebAuthn assertion by calling the WebAuthn Javascript library


```html
<!-- Using CryptoUtil.js from https://github.com/okta/okta-signin-widget/blob/master/src/util/CryptoUtil.js -->
<script>
// Convert activation object's challenge and user id from string to binary
activation.challenge = CryptoUtil.strToBin(activation.challenge);
activation.user.id = CryptoUtil.strToBin(activation.user.id);

// navigator.credentials is a global object on WebAuthn-supported clients, used to access WebAuthn API
navigator.credentials.create({
  publicKey: activation
})
  .then(function (newCredential) {
    // Get attestation and clientData from callback result, convert from binary to string
    var attestation = CryptoUtil.binToStr(newCredential.response.attestationObject);
    var clientData = CryptoUtil.binToStr(newCredential.response.clientDataJSON);
  })
  .fail(function (error) {
    // Error from WebAuthn platform
  });
</script>
```

Activate a `webauthn` factor by verifying the attestation and client data.

##### Activate WebAuthn Request Parameters


| Parameter         | Description                                                     | Param Type | DataType | Required |
| ----------------- | --------------------------------------------------------------- | ---------- | -------- | -------- |
| factorId          | `id` of factor returned from enrollment                         | URL        | String   | TRUE     |
| stateToken        | [state token](#state-token) for the current transaction             | Body       | String   | TRUE     |
| attestation       | base64-encoded attestation from the WebAuthn javascript call        | Body       | String   | TRUE     |
| clientData        | base64-encoded client data from the WebAuthn javascript call        | Body       | String   | TRUE     |

##### Activate WebAuthn Response Parameters


[Authentication Transaction Object](#authentication-transaction-model) with the current [state](#transaction-state) for the authentication transaction.

If the attestation nonce is invalid, or if the attestation or client data are invalid, you receive a `403 Forbidden` status code with the following error:

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "errorCode": "E0000068",
  "errorSummary": "Invalid Passcode/Answer",
  "errorLink": "E0000068",
  "errorId": "oaei_IfXcpnTHit_YDKGInpFw",
  "errorCauses": [
    {
      "errorSummary": "Your passcode doesn't match our records. Please try again."
    }
  ]
}
```

##### Activate WebAuthn Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "attestation: "o2NmbXRmcGFja2VkZ2F0dFN0bXSiY2FsZyZjc2lnWEgwRgIhAMvf2+dzXlHZN1um38Y8aFzrKvX0k5dt/hnDu9lahbR4AiEAuwtMg3IoaElWMp00QrP/+3Po/6LwXfmYQVfsnsQ+da1oYXV0aERhdGFYxkgb9OHGifjS2dG03qLRqvXrDIRyfGAuc+GzF1z20/eVRV2wvl6tzgACNbzGCmSLCyXx8FUDAEIBvWNHOcE3QDUkDP/HB1kRbrIOoZ1dR874ZaGbMuvaSVHVWN2kfNiO4D+HlAzUEFaqlNi5FPqKw+mF8f0XwdpEBlClAQIDJiABIVgg0a6oo3W0JdYPu6+eBrbr0WyB3uJLI3ODVgDfQnpgafgiWCB4fFo/5iiVrFhB8pNH2tbBtKewyAHuDkRolcCnVaCcmQ==",
  "clientData": "eyJjaGFsbGVuZ2UiOiJVSk5wYW9sVWt0dF9vcEZPNXJMYyIsIm9yaWdpbiI6Imh0dHBzOi8vcmFpbi5va3RhMS5jb20iLCJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIn0=",
  "stateToken": "00eacMXqkf2pG8K3sBbWqTJNStZpEi9-1Bfwl_mfQT"
}' "https://${yourOktaDomain}/api/v1/authn/factors/fwfbaopNw5CCGJTu20g4/lifecycle/activate"
```

##### Activate WebAuthn Response Example


```json
{
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "SUCCESS",
  "sessionToken": "00Fpzf4en68pCXTsMjcX8JPMctzN2Wiw4LDOBL_9pe",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    }
  }
}
```

### Verify Factor

Verifies an enrolled factor for an authentication transaction with the `MFA_REQUIRED` or `MFA_CHALLENGE` [state](#transaction-state)

* [Verify Security Question Factor](#verify-security-question-factor)
* [Verify SMS Factor](#verify-sms-factor)
* [Verify Call Factor](#verify-call-factor)
* [Verify TOTP Factor](#verify-totp-factor)
* [Verify Push Factor](#verify-push-factor)
* [Verify Duo Factor](#verify-duo-factor)
* [Verify U2F Factor](#verify-u2f-factor)
* [Verify WebAuthn Factor](#verify-webauthn-factor)

> If the sign-on (or app sign-on) [policy](#remember-device-policy-object) allows remembering the device, then the end user should be prompted to choose whether the current device should be remembered. This helps reduce the number of times the user is prompted for MFA on the current device. The user's choice should be passed to Okta using the request parameter `rememberDevice` to the verify endpoint. The default value of `rememberDevice` parameter is `false`.

#### Verify Security Question Factor


<ApiOperation method="post" url="/api/v1/authn/factors/${factorId}/verify" /> <SupportsCors />

Verifies an answer to a `question` factor.

##### Request Parameters for Verify Security Question Factor


| Parameter      | Description                                         | Param Type | DataType | Required |
| -------------- | --------------------------------------------------- | ---------- | -------- | -------- |
| factorId       | `id` of factor                                      | URL        | String   | TRUE     |
| stateToken     | [state token](#state-token) for the current transaction | Body       | String   | TRUE     |
| answer         | answer to security question                         | Body       | String   | TRUE     |
| rememberDevice | user's decision to remember the device                  | URL        | Boolean  | FALSE    |

##### Response Parameters for Verify Security Question Factor


[Authentication Transaction Object](#authentication-transaction-model) with the current [state](#transaction-state) for the authentication transaction.

If the `answer` is invalid you will receive a `403 Forbidden` status code with the following error:

```json
{
  "errorCode": "E0000068",
  "errorSummary": "Invalid Passcode/Answer",
  "errorLink": "E0000068",
  "errorId": "oaei_IfXcpnTHit_YEKGInpFw",
  "errorCauses": [
    {
      "errorSummary": "Your answer doesn't match our records. Please try again."
    }
  ]
}
```

##### Request Example for Verify Security Question Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "answer": "mayonnaise"
}' "https://${yourOktaDomain}/api/v1/authn/factors/ufs1pe3ISGKGPYKXRBKK/verify"
```

##### Response Example for Verify Security Question Factor


```json
{
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "SUCCESS",
  "sessionToken": "00ZD3Z7ixppspFljXV2t_Z6GfrYzqG7cDJ8reWo2hy",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    }
  }
}
```

#### Verify SMS Factor


<ApiOperation method="post" url="/api/v1/authn/factors/${factorId}/verify" /> <SupportsCors />

##### Request Parameters for Verify SMS Factor


| Parameter      | Description                                         | Param Type | DataType | Required |
| -------------- | --------------------------------------------------- | ---------- | -------- | -------- |
| factorId       | `id` of factor                                      | URL        | String   | TRUE     |
| stateToken     | [state token](#state-token) for the current transaction | Body       | String   | TRUE     |
| passCode       | OTP sent to device                                  | Body       | String   | FALSE    |
| rememberDevice | user's decision to remember the device                  | URL        | Boolean  | FALSE    |

> **Note:** If you omit `passCode` in the request, a new OTP is sent to the device, otherwise the request attempts to verify the `passCode`

##### Response Parameters for Verify SMS Factor


[Authentication Transaction Object](#authentication-transaction-model) with the current [state](#transaction-state) for the authentication transaction.

If the `passCode` is invalid, you receive a `403 Forbidden` status code with the following error:

```json
{
  "errorCode": "E0000068",
  "errorSummary": "Invalid Passcode/Answer",
  "errorLink": "E0000068",
  "errorId": "oaei_IfXcpnTHit_YEKGInpFw",
  "errorCauses": [
    {
      "errorSummary": "Your answer doesn't match our records. Please try again."
    }
  ]
}
```

##### Send SMS Challenge (OTP)

Omit `passCode` in the request to send an OTP to the device.

###### Request Example for Send SMS Challenge (OTP)


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb"
}' "https://${yourOktaDomain}/api/v1/authn/factors/sms193zUBEROPBNZKPPE/verify"
```

###### Response Example for Send SMS Challenge (OTP)


```json
{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "MFA_CHALLENGE",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    },
    "factor": {
      "id": "sms193zUBEROPBNZKPPE",
      "factorType": "sms",
      "provider": "OKTA",
      "profile": {
        "phoneNumber": "+1 XXX-XXX-1337"
      }
    }
  },
  "_links": {
    "next": {
      "name": "verify",
      "href": "https://${yourOktaDomain}/api/v1/authn/factors/sms193zUBEROPBNZKPPE/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "prev": {
      "href": "https://${yourOktaDomain}/api/v1/authn/previous",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "resend": [
      {
        "name": "sms",
        "href": "https://${yourOktaDomain}/api/v1/authn/factors/sms193zUBEROPBNZKPPE/verify/resend",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    ]
  }
}
```

##### Verify SMS Challenge (OTP)

Specify `passCode` in the request to verify the factor.

###### Request Example for Verify SMS Challenge (OTP)


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "passCode": "657866"
}' "https://${yourOktaDomain}/api/v1/authn/factors/sms193zUBEROPBNZKPPE/verify"
```

###### Response Example for Verify SMS Challenge (OTP)


```json
{
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "SUCCESS",
  "sessionToken": "00t6IUQiVbWpMLgtmwSjMFzqykb5QcaBNtveiWlGeM",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    }
  }
}
```

#### Verify Call Factor


<ApiOperation method="post" url="/api/v1/authn/factors/${factorId}/verify" /> <SupportsCors />

##### Request Parameters for Verify Call Factor


| Parameter      | Description                                         | Param Type | DataType | Required |
| -------------- | --------------------------------------------------- | ---------- | -------- | -------- |
| factorId       | `id` of factor                                      | URL        | String   | TRUE     |
| stateToken     | [state token](#state-token) for the current transaction | Body       | String   | TRUE     |
| passCode       | OTP sent to device                                  | Body       | String   | FALSE    |
| rememberDevice | user's decision to remember the device                  | URL        | Boolean  | FALSE    |

> **Note:** If you omit `passCode` in the request, a new OTP is sent to the device, otherwise the request attempts to verify the `passCode`

##### Response Parameters for Verify Call Factor


[Authentication Transaction Object](#authentication-transaction-model) with the current [state](#transaction-state) for the authentication transaction.

If the `passCode` is invalid, you receive a `403 Forbidden` status code with the following error:

```json
{
  "errorCode": "E0000068",
  "errorSummary": "Invalid Passcode/Answer",
  "errorLink": "E0000068",
  "errorId": "oaei_IfXcpnTHit_YEKGInpFw",
  "errorCauses": [
    {
      "errorSummary": "Your answer doesn't match our records. Please try again."
    }
  ]
}
```

##### Send Voice Call Challenge (OTP)

Omit `passCode` in the request to send an OTP to the device.

###### Request Example for Send Voice Call Challenge (OTP)


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb"
}' "https://${yourOktaDomain}/api/v1/authn/factors/clf193zUBEROPBNZKPPE/verify"
```

###### Response Example for Send Voice Call Challenge (OTP)


```json
{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "MFA_CHALLENGE",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    },
    "factor": {
      "id": "clf193zUBEROPBNZKPPE",
      "factorType": "call",
      "provider": "OKTA",
      "profile": {
        "phoneNumber": "+1 XXX-XXX-1337"
      }
    }
  },
  "_links": {
    "next": {
      "name": "verify",
      "href": "https://${yourOktaDomain}/api/v1/authn/factors/clf193zUBEROPBNZKPPE/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "prev": {
      "href": "https://${yourOktaDomain}/api/v1/authn/previous",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

##### Verify Call Challenge (OTP)

Specify `passCode` in the request to verify the factor.

###### Request Example for Verify Call Challenge


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "passCode": "65786"
}' "https://${yourOktaDomain}/api/v1/authn/factors/clf193zUBEROPBNZKPPE/verify"
```

###### Response Example for Verify Call Challenge


```json
{
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "SUCCESS",
  "sessionToken": "00t6IUQiVbWpMLgtmwSjMFzqykb5QcaBNtveiWlGeM",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    }
  }
}

```

#### Verify TOTP Factor


<ApiOperation method="post" url="/api/v1/authn/factors/${factorId}/verify" /> <SupportsCors />

Verifies an OTP for a `token:software:totp` or `token:hotp` factor.

> **Note:** This API implements [the TOTP standard](https://tools.ietf.org/html/rfc6238), which is used by apps like Okta Verify and Google Authenticator.

##### Request Parameters for Verify TOTP Factor


| Parameter      | Description                                         | Param Type | DataType | Required |
| -------------- | --------------------------------------------------- | ---------- | -------- | -------- |
| factorId       | `id` of factor                                      | URL        | String   | TRUE     |
| stateToken     | [state token](#state-token) for the current transaction | Body       | String   | TRUE     |
| passCode       | OTP sent to device                                  | Body       | String   | FALSE    |
| rememberDevice | user's decision to remember the device                  | URL        | Boolean  | FALSE    |

##### Response Parameters for Verify TOTP Factor


[Authentication Transaction Object](#authentication-transaction-model) with the current [state](#transaction-state) for the authentication transaction.

If the passcode is invalid, you receive a `403 Forbidden` status code with the following error:

```json
{
  "errorCode": "E0000068",
  "errorSummary": "Invalid Passcode/Answer",
  "errorLink": "E0000068",
  "errorId": "oaei_IfXcpnTHit_YEKGInpFw",
  "errorCauses": [
    {
      "errorSummary": "Your passcode doesn't match our records. Please try again."
    }
  ]
}
```

###### Request Example for Verify TOTP Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "passCode": "657866"
}' "https://${yourOktaDomain}/api/v1/authn/factors/ostfm3hPNYSOIOIVTQWY/verify"
```

###### Response Example for Verify TOTP Factor


```json
{
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "SUCCESS",
  "sessionToken": "00t6IUQiVbWpMLgtmwSjMFzqykb5QcaBNtveiWlGeM",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    }
  }
}
```

#### Verify Push Factor


<ApiOperation method="post" url="/api/v1/authn/factors/${factorId}/verify" /> <SupportsCors />

Sends an asynchronous push notification (challenge) to the device for the user to approve or reject.  The `factorResult` for the transaction has a result of `WAITING`, `SUCCESS`, `REJECTED`, or `TIMEOUT`.

##### Request Parameters for Verify Push Factor


| Parameter      | Description                                          | Param Type | DataType | Required |
| -------------- | ---------------------------------------------------  | ---------- | -------- | -------- |
| factorId       | `id` of factor                                       | URL        | String   | TRUE     |
| stateToken     | [state token](#state-token) for the current transaction  | Body       | String   | TRUE     |
| rememberDevice | user's decision to remember the device                   | URL        | Boolean  | FALSE    |
| autoPush       | user's decision to send a push to the device automatically | URL        | Boolean  | FALSE    |

**Okta Verify Push Details Pertaining to Auto-Push**

* You don't need to pass the `autoPush` flag to Okta unless you have a custom sign-in flow that doesn't use the Okta Sign-In Widget, but want Okta to keep track of this preference.  The custom sign-in flow must still handle the logic to actually send the Auto-Push, since this param only deals with the Auto-Push setting.
* If you pass the `autoPush` query param when verifying an Okta Verify Push factor, Okta saves this value as the user's preference to have the push notification sent automatically if the verification is successful (the user taps **Approve** on their phone).
* If there is already a saved Auto-Push preference, the successful verify call overrides the current preference if it is different from the value of `autoPush`.
* This saved Auto-Push preference is always returned in the `/api/v1/authn/` response's `autoPushEnabled` field if the user is enrolled for the Okta Verify Push factor [example here](#response-example-for-factor-challenge-for-step-up-authentication-with-okta-session).  If the user's Auto-Push preference hasn't explicitly been set before, `autoPushEnabled` has a value of false.
* The Auto-Push preference is stored in a cookie value and users that clear their cookies remove that preference.
* Please note, the `autoPush` flag has no effect when trying to verify a factor other than Okta Verify Push (factorId prefix = "opf").


##### Request Example for Verify Push Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb"
}' "https://${yourOktaDomain}/api/v1/authn/factors/ufs1pe3ISGKGPYKXRBKK/verify"
```

##### Response Example (Waiting)


> Keep polling authentication transactions with `WAITING` result until the challenge completes or expires.

```json
{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "MFA_CHALLENGE",
  "factorResult": "WAITING",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    },
    "factors": {
      "id": "opfh52xcuft3J4uZc0g3",
      "factorType": "push",
      "provider": "OKTA",
      "profile": {
        "deviceType": "SmartPhone_IPhone",
        "name": "Gibson",
        "platform": "IOS",
        "version": "9.0"
      }
    }
  },
  "_links": {
    "next": {
      "name": "poll",
      "href": "https://${yourOktaDomain}/api/v1/authn/factors/opfh52xcuft3J4uZc0g3/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "prev": {
      "href": "https://${yourOktaDomain}/api/v1/authn/previous",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "resend": [
      {
        "name": "push",
        "href": "https://${yourOktaDomain}/api/v1/authn/factors/opfh52xcuft3J4uZc0g3/verify/resend",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    ]
  }
}
```

##### Response Example (Approved)


```json
{
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "SUCCESS",
  "sessionToken": "00Fpzf4en68pCXTsMjcX8JPMctzN2Wiw4LDOBL_9xx",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    }
  }
}
```

##### Response Example (Rejected)


```json
{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "MFA_CHALLENGE",
  "factorResult": "REJECTED",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    },
    "factors": {
      "id": "opfh52xcuft3J4uZc0g3",
      "factorType": "push",
      "provider": "OKTA",
      "profile": {
        "deviceType": "SmartPhone_IPhone",
        "name": "Gibson",
        "platform": "IOS",
        "version": "9.0"
      }
    }
  },
  "_links": {
    "next": {
      "name": "verify",
      "href": "https://${yourOktaDomain}/api/v1/authn/factors/opfh52xcuft3J4uZc0g3/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "prev": {
      "href": "https://${yourOktaDomain}/api/v1/authn/previous",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "resend": [
      {
        "name": "push",
        "href": "https://${yourOktaDomain}/api/v1/authn/factors/opfh52xcuft3J4uZc0g3/verify/resend",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    ]
  }
}
```

##### Response Example (Timeout)


```json
{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "MFA_CHALLENGE",
  "factorResult": "TIMEOUT",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    },
    "factors": {
      "id": "opfh52xcuft3J4uZc0g3",
      "factorType": "push",
      "provider": "OKTA",
      "profile": {
        "deviceType": "SmartPhone_IPhone",
        "name": "Gibson",
        "platform": "IOS",
        "version": "9.0"
      }
    }
  },
  "_links": {
    "next": {
      "name": "verify",
      "href": "https://${yourOktaDomain}/api/v1/authn/factors/opfh52xcuft3J4uZc0g3/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "prev": {
      "href": "https://${yourOktaDomain}/api/v1/authn/previous",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "resend": [
      {
        "name": "push",
        "href": "https://${yourOktaDomain}/api/v1/authn/factors/opfh52xcuft3J4uZc0g3/verify/resend",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    ]
  }
}
```

##### Resend Push Notification

Use the `resend` link to send another push notification if the user didn't receive the previous one due to timeout or error.

###### Request Example for Resend Push Notification


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb"
}' "https://${yourOktaDomain}/api/v1/authn/factors/opfh52xcuft3J4uZc0g3/verify/resend"
```

#### Verify Duo Factor


Verification of the Duo factor is implemented as an integration with Duo widget. The process is very similar to the  [enrollment](#full-page-example-for-duo-enrollment) where the widget is embedded in an iframe - "duo_iframe". Verification starts with request to the Okta API, then continues with a Duo widget that handles the actual verification. We need to pass the state token as hidden object in "duo_form". The authentication completes with call to [poll link](#verification-poll-request-example) to verify the state and obtain session token.

##### Request Example for Verify Duo Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "${stateToken}"
}' "https://${yourOktaDomain}/api/v1/authn/factors/${factorId}/verify"
```

##### Response Example for Verify Duo Factor


```json
{
    "stateToken":"00CzoxFVe4R2nv0hTxm32r1kayfrrOkuxcE2rfINwZ",
    "expiresAt":"2016-07-13T14:13:58.000Z",
    "status":"MFA_CHALLENGE",
    "factorResult":"WAITING",
    "_embedded":{
        "user":{
            "id":"00ukv3jVTgRjDctlX0g3",
            "passwordChanged":"2016-07-13T13:29:58.000Z",
            "profile":{
                "login":"first.last@gexample.com",
                "firstName":"First",
                "lastName":"Last",
                "locale":"en_US",
                "timeZone":"America/Los_Angeles"
            }
        },
        "factor":{
            "id":"dsflnpo99zpfMyaij0g3",
            "factorType":"web",
            "provider":"DUO",
            "vendorName":"DUO",
            "profile":{
                "credentialId":"first.last@example.com"
            },
            "_embedded":{
                "verification":{
                    "host":"api-your-host.duosecurity.com",
                    "signature":"TX|...your-signature",
                    "factorResult":"WAITING",
                    "_links":{
                        "complete":{
                            "href":"https://${yourOktaDomain}/api/v1/authn/factors/dsflnpo99zpfMyaij0g3/lifecycle/duoCallback",
                            "hints":{
                                "allow":[
                                    "POST"
                                ]
                            }
                        },
                        "script":{
                            "href":"https://${yourOktaDomain}/js/sections/duo/Duo-Web-v2.js",
                            "type":"text/javascript; charset=utf-8"
                        }
                    }
                }
            }
        },
        "policy":{
            "allowRememberDevice":true,
            "rememberDeviceLifetimeInMinutes":15,
            "rememberDeviceByDefault":false
        }
    },
    "_links":{
        "next":{
            "name":"poll",
            "href":"https://${yourOktaDomain}/api/v1/authn/factors/dsflnpo99zpfMyaij0g3/verify",
            "hints":{
                "allow":[
                    "POST"
                ]
            }
        },
        "cancel":{
            "href":"https://${yourOktaDomain}/api/v1/authn/cancel",
            "hints":{
                "allow":[
                    "POST"
                ]
            }
        },
        "prev":{
            "href":"https://${yourOktaDomain}/api/v1/authn/previous",
            "hints":{
                "allow":[
                    "POST"
                ]
            }
        }
    }
}
```

##### Sample for Duo iFrame


```html
...
<!--
    The Duo SDK will automatically bind to this iFrame and populate it for us.
    See https://www.duosecurity.com/docs/duoweb for more info.
 -->
<iframe id="duo_iframe" width="620" height="330" frameborder="0"></iframe>
<!--
    The Duo SDK will automatically bind to this form and submit it for us.
    See https://www.duosecurity.com/docs/duoweb for more info.
 -->
<form method="POST" id="duo_form">
    <!-- The state token is required here (in order to bind anonymous request back into Auth API) -->
    <input type="hidden" name="stateToken" value='00CzoxFVe4R2nv0hTxm32r1kayfrrOkuxcE2rfINwZ' />
</form>

<script src="https://${yourOktaDomain}/js/sections/duo/Duo-Web-v2.js"></script>

<!-- The host, sig_request, and post_action values will be given via the Auth API -->
<script>
    Duo.init({
        'host': 'api-your-host.duosecurity.com',
        'sig_request': 'TX|...your-signature',
        'post_action': 'https://${yourOktaDomain}/api/v1/authn/factors/dsflnpo99zpfMyaij0g3/lifecycle/duoCallback'
    });
</script>
...

```

##### Verification Poll Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "${stateToken}"
}' "https://${yourOktaDomain}/api/v1/authn/factors/${factorId}/verify"
```

##### Verification Poll Response Example


```json
{
    "expiresAt":"2016-07-13T14:14:44.000Z",
    "status":"SUCCESS",
    "sessionToken":"201111XUk7La2gw5r5PV1IhU4WSd0fV6mvNYdlJoeqjuyej7S83x3Hr",
    "_embedded":{
        "user":{
            "id":"00ukv3jVTgRjDctlX0g3",
            "passwordChanged":"2016-07-13T13:29:58.000Z",
            "profile":{
                "login":"first.last@example.com",
                "firstName":"First",
                "lastName":"Last",
                "locale":"en_US",
                "timeZone":"America/Los_Angeles"
            }
        }
    }
}
```

#### Verify U2F Factor


<ApiOperation method="post" url="/api/v1/authn/factors/${factorId}/verify" /> <SupportsCors />

Note:

The `appId` property in Okta U2F enroll/verify API response is the [origin](https://www.ietf.org/rfc/rfc6454.txt) of
the web page that triggers the API request (assuming the origin has been configured to be trusted by Okta). According to
[FIDO
spec](https://fidoalliance.org/specs/fido-u2f-v1.2-ps-20170411/fido-appid-and-facets-v1.2-ps-20170411.html#h2_the-appid-and-facetid-assertions),
enroll and verify U2F device with `appId`s in different DNS zone is not allowed. For
example, if a user enrolled a U2F device via Okta Sign-in widget that is hosted at `https://login.company.com`, while the user can verify the U2F factor from `https://login.company.com`, the user would not be able to verify it from Okta portal `https://company.okta.com`, U2F device would return error code 4 - `DEVICE_INELIGIBLE`.

##### Start Verification to Get Challenge Nonce

Verification of the U2F factor starts with getting the challenge nonce and U2F token details and then using the client-side
JavaScript API to get the signed assertion from the U2F token.

##### Request Example for Verify U2F Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "${stateToken}"
}' "https://${yourOktaDomain}/api/v1/authn/factors/${factorId}/verify"
```

##### Response Example for Verify U2F Factor


```json
{
   "stateToken":"00wCfuPA3qX3azDawSdPGFIhHuzbZX72Gv4bu_ew9d",
   "expiresAt":"2016-12-06T01:32:39.000Z",
   "status":"MFA_CHALLENGE",
   "_embedded":{
      "user":{
         "id":"00u21eb3qyRDNNIKTGCW",
         "passwordChanged":"2015-10-28T23:27:57.000Z",
         "profile":{
            "login":"first.last@gmail.com",
            "firstName":"First",
            "lastName":"Last",
            "locale":"en",
            "timeZone":"America/Los_Angeles"
         }
      },
      "factor":{
         "id":"fuf8y2l4n5mfH0UWe0h7",
         "factorType":"u2f",
         "provider":"FIDO",
         "vendorName":"FIDO",
         "profile":{
            "credentialId":"shvjvW2Fi2GtCJb33nm0105EISG9lf2Jg0jWl42URM6vtDH8-AhnoSKfpoHfAf0kJMaCx13glfdxiLFuPW_1bw",
            "appId":"https://${yourOktaDomain}",
            "version":"U2F_V2"
         },
         "_embedded":{
            "challenge":{
               "nonce":"tT1MI7XGzMu48Ivnz3vB",
               "timeoutSeconds":20
            }
         }
      },
      "policy":{
         "allowRememberDevice":true,
         "rememberDeviceLifetimeInMinutes":0,
         "rememberDeviceByDefault":false
      }
   },
   "_links":{
      "next":{
         "name":"verify",
         "href":"https://${yourOktaDomain}/api/v1/authn/factors/fuf8y2l4n5mfH0UWe0h7/verify",
         "hints":{
            "allow":[
               "POST"
            ]
         }
      },
      "cancel":{
         "href":"https://${yourOktaDomain}/api/v1/authn/cancel",
         "hints":{
            "allow":[
               "POST"
            ]
         }
      },
      "prev":{
         "href":"https://${yourOktaDomain}/api/v1/authn/previous",
         "hints":{
            "allow":[
               "POST"
            ]
         }
      }
   }
}
```

##### Get the Signed Assertion from the U2F Token


```html
<!-- Get the u2f-api.js from https://github.com/google/u2f-ref-code/tree/master/u2f-gae-demo/war/js -->
<script src="/u2f-api.js"></script>
<script>
  // Use the nonce from the challenge object
  var challengeNonce = factor._embedded.challenge.nonce;

  // Use the appId from factor profile object
  var appId = factor.profile.appId;

  // Use the version and credentialId from factor profile object
  var registeredKeys = [
    {
      version: factor.profile.version,
      keyHandle: factor.profile.credentialId
    }
  ];

  // Call the U2F javascript API to get signed assertion from the U2F token
  u2f.sign(appId, factorData.challenge.nonce, registeredKeys, function (data) {
    if (data.errorCode && data.errorCode !== 0) {
      // Error from U2F platform
    } else {
      // Get the client data from callback result
      var clientData = data.clientData;

      // Get the signature data from callback result
      var signatureData = data.signatureData;
    }
  });
</script>
```

##### Post the signed assertion to Okta to complete verification

##### Request Parameters for Verify U2F Factor


| Parameter      | Description                                         | Param Type | DataType | Required |
| -------------- | --------------------------------------------------- | ---------- | -------- | -------- |
| factorId       | `id` of factor                                      | URL        | String   | TRUE     |
| stateToken     | [state token](#state-token) for the current transaction | Body       | String   | TRUE     |
| clientData     | base64-encoded client data from the U2F token       | Body       | String   | TRUE     |
| signatureData  | base64-encoded signature data from the U2F token    | Body       | String   | TRUE     |
| rememberDevice | user's decision to remember the device              | URL        | Boolean  | FALSE    |

##### Request Example for Signed Assertion


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "${stateToken}",
  "clientData":"eyAiY2hhbGxlbmdlIjogIlJ6ZDhQbEJEWUEyQ0VsbXVGcHlMIiwgIm9yaWdpbiI6ICJodHRwczpcL1wvc25hZ2FuZGxhLm9rdGFwcmV2aWV3LmNvbSIsICJ0eXAiOiAibmF2aWdhdG9yLmlkLmdldEFzc2VydGlvbiIgfQ==",
  "signatureData":"AQAAAAEwRQIgRDEdmXr_jh1bEHtoUs1l7mMd-eUDO0eKqXKkrK5hUi0CIQDaVX030GgxVPr4RX3c4XgugildmHwDLwKRL0aMS3Sbpw=="
}' "https://${yourOktaDomain}/api/v1/authn/factors/${factorId}/verify"
```

##### Response of U2F Verification Example


```json
{
    "expiresAt":"2016-07-13T14:14:44.000Z",
    "status":"SUCCESS",
    "sessionToken":"201111XUk7La2gw5r5PV1IhU4WSd0fV6mvNYdlJoeqjuyej7S83x3Hr",
    "_embedded":{
        "user":{
            "id":"00ukv3jVTgRjDctlX0g3",
            "passwordChanged":"2016-07-13T13:29:58.000Z",
            "profile":{
                "login":"first.last@example.com",
                "firstName":"First",
                "lastName":"Last",
                "locale":"en_US",
                "timeZone":"America/Los_Angeles"
            }
        }
    }
}
```

#### Verify WebAuthn Factor


<ApiOperation method="post" url="/api/v1/authn/factors/${factorIdOrFactorType}/verify" /> <SupportsCors />

Verifies a user with a WebAuthn factor. The verification process starts with getting the WebAuthn credential request options, which are used to help select an appropriate authenticator using the WebAuthn API.
This authenticator then generates an assertion that may be used to verify the user.

> **Note:** a `factorId` or `factorType` may be specified for WebAuthn's verify endpoint, as the WebAuthn factor type supports multiple factor instances.
  When a `factorId` is used, the verification procedure is no different from any other factors, with verification for a specific factor instance.
  When "webauthn" (the `factorType` name for WebAuthn) is used, verification would be acceptable with any WebAuthn factor instance enrolled for the user.

##### Start Verification to Get Challenge Nonce

Verification of the WebAuthn factor starts with getting the WebAuthn credential request details (including the challenge nonce) then using the client-side
JavaScript API to get the signed assertion from the WebAuthn authenticator.

For more information about these credential request options, see the [WebAuthn spec for PublicKeyCredentialRequestOptions](https://www.w3.org/TR/webauthn/#dictionary-makecredentialoptions).

##### Request Example for Verify WebAuthn Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "${stateToken}"
}' "https://${yourOktaDomain}/api/v1/authn/factors/${factorIdOrFactorType}/verify"
```

##### Response Example for Verify WebAuthn Factor by `factorId`


```json
{
   "stateToken":"00lbJNfhlFVRVAR37O3PRzNFkx-v5kgMYHJPTtMDS2",
   "expiresAt":"2019-10-24T00:21:05.000Z",
   "status":"MFA_CHALLENGE",
   "factorResult":"CHALLENGE",
   "challengeType":"FACTOR",
   "_embedded":{
      "user":{
         "id":"00u21eb3qyRDNNIKTGCW",
         "passwordChanged":"2015-10-28T23:27:57.000Z",
         "profile":{
            "login":"first.last@gmail.com",
            "firstName":"First",
            "lastName":"Last",
            "locale":"en",
            "timeZone":"America/Los_Angeles"
         }
      },
      "factor":{
         "id":"fwfbaopNw5CCGJTu20g4",
         "factorType":"webauthn",
         "provider":"FIDO",
         "vendorName":"FIDO",
         "profile":{
            "credentialId":"AZBXkiL5GrhfSvLeS4MHSvTVC_1ZLPcwI4SKKqKF1sd9TL_UFoQliUKu00to6slexSOZ9oh1h54BbTXPA343qHBF",
            "authenticatorName":"MacBook Touch ID"
         },
         "_embedded":{
            "challenge":{
               "challenge":"K0UNqWlz2TCCDd5qEkBf",
               "extensions":{
               }
            }
         }
      },
      "policy":{
         "allowRememberDevice":false,
         "rememberDeviceLifetimeInMinutes":0,
         "rememberDeviceByDefault":false,
         "factorsPolicyInfo":{

         }
      }
   },
   "_links":{
      "next":{
         "name":"verify",
         "href":"https://${yourOktaDomain}/api/v1/authn/factors/fwfbaopNw5CCGJTu20g4/verify",
         "hints":{
            "allow":[
               "POST"
            ]
         }
      },
      "prev":{
         "href":"https://${yourOktaDomain}/api/v1/authn/previous",
         "hints":{
            "allow":[
               "POST"
            ]
         }
      },
      "cancel":{
         "href":"https://${yourOktaDomain}/api/v1/authn/cancel",
         "hints":{
            "allow":[
               "POST"
            ]
         }
      }
   }
}
```

##### Response Example for Verify WebAuthn Factor by `factorType`


```json
{
  "stateToken":"00lbJNfhlFVRVAR37O3PRzNFkx-v5kgMYHJPTtMDS2",
  "expiresAt":"2019-10-24T00:21:05.000Z",
  "status":"MFA_CHALLENGE",
  "factorResult":"CHALLENGE",
  "challengeType":"FACTOR_TYPE",
  "factorType":"webauthn",
  "_embedded":{
    "user":{
      "id":"00u21eb3qyRDNNIKTGCW",
      "passwordChanged":"2015-10-28T23:27:57.000Z",
      "profile":{
        "login":"first.last@gmail.com",
        "firstName":"First",
        "lastName":"Last",
        "locale":"en",
        "timeZone":"America/Los_Angeles"
      }
    },
    "challenge":{
      "challenge":"K0UNqWlz2TCCDd5qEkBf",
      "extensions":{

      }
    },
    "factors":[
      {
        "id":"fwfbaopNw5CCGJTu20g4",
        "factorType":"webauthn",
        "provider":"FIDO",
        "vendorName":"FIDO",
        "profile":{
          "credentialId":"AZBXkiL5GrhfSvLeS4MHSvTVC_1ZLPcwI4SKKqKF1sd9TL_UFoQliUKu00to6slexSOZ9oh1h54BbTXPA343qHBF",
          "authenticatorName":"MacBook Touch ID"
        }
      },
      {
        "id":"fwfbadoFkIGXCH8ky0g4",
        "factorType":"webauthn",
        "provider":"FIDO",
        "vendorName":"FIDO",
        "profile":{
          "credentialId":"5V1tI15ifCWhZSLvv9szL4HjRk-vpBYYg86n4LZlVg5bAg2_UnP-vjc4ix60Uh9ehLluB7KsMzmEU7y_TuRaJA",
          "authenticatorName":"Yubikey 5"
        }
      }
    ],
    "policy":{
      "allowRememberDevice":false,
      "rememberDeviceLifetimeInMinutes":0,
      "rememberDeviceByDefault":false,
      "factorsPolicyInfo":{

      }
    }
  },
  "_links":{
    "next":{
      "name":"verify",
      "href":"https://${yourOktaDomain}/api/v1/authn/factors/webauthn/verify",
      "hints":{
        "allow":[
          "POST"
        ]
      }
    },
    "prev":{
      "href":"https://${yourOktaDomain}/api/v1/authn/previous",
      "hints":{
        "allow":[
          "POST"
        ]
      }
    },
    "cancel":{
      "href":"https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints":{
        "allow":[
          "POST"
        ]
      }
    }
  }
}
```

##### Get the Signed Assertion from the WebAuthn Authenticator


```html
<!-- Using CryptoUtil.js from https://github.com/okta/okta-signin-widget/blob/master/src/util/CryptoUtil.js -->
<script>
  // For factorId verification, convert activation object's challenge nonce from string to binary
  factor._embedded.challenge.challenge = CryptoUtil.strToBin(factor._embedded.challenge.challenge);

  // For factorType verification, the challenge nonce would be stored in challenge.challenge instead

  // Call the WebAuthn javascript API to get signed assertion from the WebAuthn authenticator
  navigator.credentials.get({
    publicKey: factor._embedded.challenge
  })
    .then(function (assertion) {
      // Get the client data, authenticator data, and signature data from callback result, convert from binary to string
      var clientData = CryptoUtil.binToStr(assertion.response.clientDataJSON);
      var authenticatorData = CryptoUtil.binToStr(assertion.response.authenticatorData);
      var signatureData = CryptoUtil.binToStr(assertion.response.signature);
    })
    .fail(function (error) {
      // Error from WebAuthn platform
    });
</script>
```

##### Post the signed assertion to Okta to complete verification

##### Request Parameters for Verify WebAuthn Factor


| Parameter      | Description                                         | Param Type | DataType | Required |
| -------------- | --------------------------------------------------- | ---------- | -------- | -------- |
| factorId       | `id` of factor                                      | URL        | String   | TRUE (`factorId` OR `factorType` required) |
| factorType     | `factorType` of factor; for WebAuthn, it is `webauthn` | URL        | String   | TRUE (`factorId` OR `factorType` required) |
| stateToken     | [state token](#state-token) for the current transaction | Body       | String   | TRUE     |
| clientData     | base64-encoded client data from the WebAuthn authenticator       | Body       | String   | TRUE     |
| authenticatorData | base64-encoded authenticator data from the WebAuthn authenticator    | Body       | String   | TRUE     |
| signatureData  | base64-encoded signature data from the WebAuthn authenticator    | Body       | String   | TRUE     |
| rememberDevice | user's decision to remember the device                  | URL        | Boolean  | FALSE    |

##### Request Example for Signed Assertion


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "clientData": "eyJjaGFsbGVuZ2UiOiJoOVhzT2JrWmRnNU9vTTdyUS0zMSIsIm9yaWdpbiI6Imh0dHBzOi8vcmFpbi5va3RhMS5jb20iLCJ0eXBlIjoid2ViYXV0aG4uZ2V0In0=",
  "authenticatorData": "SBv04caJ+NLZ0bTeotGq9esMhHJ8YC5z4bMXXPbT95UFXbDsOg==",
  "signatureData": "MEQCICeN9Y3Jw9y1vS1ADghTW5gUKy1JFZpESHXyTRbfjXXrAiAtQLyEjXtkZnZCgnmZA1EjPiHjhvXzkWn83zHtVgGkPQ==",
  "stateToken": "${stateToken}"
}' "https://${yourOktaDomain}/api/v1/authn/factors/${factorIdOrFactorType}/verify"
```

##### Response of WebAuthn Verification Example


```json
{
    "expiresAt":"2016-07-13T14:14:44.000Z",
    "status":"SUCCESS",
    "sessionToken":"201111XUk7La2gw5r5PV1IhU4WSd0fV6mvNYdlJoeqjuyej7S83x3Hr",
    "_embedded":{
        "user":{
            "id":"00ukv3jVTgRjDctlX0g3",
            "passwordChanged":"2016-07-13T13:29:58.000Z",
            "profile":{
                "login":"first.last@example.com",
                "firstName":"First",
                "lastName":"Last",
                "locale":"en_US",
                "timeZone":"America/Los_Angeles"
            }
        }
    }
}
```

## Recovery Operations

### Forgot Password


<ApiOperation method="post" url="/api/v1/authn/recovery/password" />

Starts a new password recovery transaction for a given user and issues a [recovery token](#recovery-token) that can be used to reset a user's password.

* [Forgot Password with Email Factor](#forgot-password-with-email-factor)
* [Forgot Password with SMS Factor](#forgot-password-with-sms-factor)
* [Forgot Password with Call Factor](#forgot-password-with-call-factor)
* [Forgot Password with Trusted Application](#forgot-password-with-trusted-application)

> Self-service password reset (forgot password) must be permitted via the user's assigned password policy to use this operation.

##### Request Parameters for Forgot Password


| Parameter   | Description                                                                                                       | Param Type | DataType                          | Required | MaxLength |
| ----------- | ----------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------- | -------- | --------- |
| username    | User's non-qualified short-name (e.g. dade.murphy) or unique fully-qualified login (dade.murphy@example.com)      | Body       | String                            | TRUE     |           |
| factorType  | Recovery factor to use for primary authentication                                                                 | Body       | `EMAIL` or `SMS` or `CALL`        | FALSE    |           |

> A valid `factorType` is required for requests without an API token with administrator privileges. For more information, see [Forgot Password with Trusted Application](#forgot-password-with-trusted-application).

The response is different, depending on whether the request is for a public application or a trusted application.

##### Response Parameters for Public Application for Forgot Password


The [Recovery Transaction Object](#recovery-transaction-model) with `RECOVERY_CHALLENGE` status for the new recovery transaction.

You will always receive a [Recovery Transaction](#recovery-transaction-model) response even if the requested `username` is not a valid identifier to prevent information disclosure.

##### Response Parameters for Trusted Application for Forgot Password

The [Recovery Transaction Object](#recovery-transaction-model) with an issued `recoveryToken` that can be distributed to the end user.

You will receive a `403 Forbidden` status code if the `username` requested is not valid.

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
    "errorCode": "E0000095",
    "errorSummary": "Recovery not allowed for unknown user.",
    "errorLink": "E0000095",
    "errorId": "oaetVarN2dKS6ap08dq0k4n7A",
    "errorCauses": []
}
```

#### Forgot Password with Email Factor

Starts a new password recovery transaction for the email factor:

* You must specify a user identifier (`username`) but no password in the request.
* If the request is successful, Okta sends a recovery email asynchronously to the user's primary and secondary email address with a [recovery token](#recovery-token) so the user can complete the transaction.

Primary authentication of a user's recovery credential (e.g `EMAIL` or `SMS`) hasn't completed when this request is sent; the user is pending validation.

Okta provides security in the following ways:

* Since the recovery email is distributed out-of-band and may be viewed on a different user agent or device, this operation does not return a [state token](#state-token) and does not have a `next` link.
* Okta doesn't publish additional metadata about the user until primary authentication has successfully completed.
See the Response Example in this section for details.

##### Request Example for Forgot Password with Email Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "username": "dade.murphy@example.com",
  "factorType": "EMAIL",
}' "https://${yourOktaDomain}/api/v1/authn/recovery/password"
```

##### Response Example for Forgot Password with Email Factor


```json
{
  "status": "RECOVERY_CHALLENGE",
  "factorResult": "WAITING",
  "factorType": "EMAIL",
  "recoveryType": "PASSWORD"
}
```

#### Forgot Password with SMS Factor

Starts a new password recovery transaction with a user identifier (`username`) and asynchronously sends a SMS OTP (challenge) to the user's mobile phone.  This operation will transition the recovery transaction to the `RECOVERY_CHALLENGE` state and wait for the user to [verify the OTP](#verify-sms-recovery-factor).

> Primary authentication of a user's recovery credential (e.g email or SMS) hasn't yet completed.
> Okta will not publish additional metadata about the user until primary authentication has successfully completed.

> SMS recovery factor must be enabled via the user's assigned password policy to use this operation.

##### Request Example for Forgot Password with SMS Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "username": "dade.murphy@example.com",
  "factorType": "SMS",
}' "https://${yourOktaDomain}/api/v1/authn/recovery/password"
```

##### Response Example for Forgot Password with SMS Factor


```json
{
  "stateToken": "00xdqXOE5qDXX8-PBR1bYv8AESqIEinDy3yul01tyh",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "RECOVERY_CHALLENGE",
  "factorType": "SMS",
  "recoveryType": "PASSWORD",
  "_links": {
    "next": {
      "name": "verify",
      "href": "https://${yourOktaDomain}/api/v1/authn/recovery/factors/SMS/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "resend": {
      "name": "sms",
      "href": "https://${yourOktaDomain}/api/v1/authn/recovery/factors/SMS/resend",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Forgot Password with Call Factor

Starts a new password recovery transaction with a user identifier (`username`) and asynchronously sends a Voice Call with OTP (challenge) to the user's phone.  This operation will transition the recovery transaction to the `RECOVERY_CHALLENGE` state and wait for user to [verify the OTP](#verify-call-recovery-factor).

Note:

* Primary authentication of a user's recovery credential (e.g email or SMS or Voice Call) hasn't yet completed.
* Okta won't publish additional metadata about the user until primary authentication has successfully completed.
* Voice Call recovery factor must be enabled via the user's assigned password policy to use this operation.

##### Request Example for Forgot Password with Call Factor

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "username": "dade.murphy@example.com",
  "factorType": "call",
}' "https://${yourOktaDomain}/api/v1/authn/recovery/password"
```

##### Response Example for Forgot Password with Call Factor


```json
{
  "stateToken": "00xdqXOE5qDXX8-PBR1bYv8AESqIEinDy3yul01tyh",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "RECOVERY_CHALLENGE",
  "factorType": "call",
  "recoveryType": "PASSWORD",
  "_links": {
    "next": {
      "name": "verify",
      "href": "https://${yourOktaDomain}/api/v1/authn/recovery/factors/CALL/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "resend": {
      "name": "call",
      "href": "https://${yourOktaDomain}/api/v1/authn/recovery/factors/CALL/resend",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Forgot Password with Trusted Application

Allows a [trusted application](#trusted-application) such as an external portal to implement its own primary authentication process and directly obtain a [recovery token](#recovery-token) for a user given just the user's identifier.

> Directly obtaining a `recoveryToken` is a highly privileged operation that requires an administrator API token and should be restricted to trusted web applications.  Anyone that obtains a `recoveryToken` for a user and knows the answer to a user's recovery question can reset their password or unlock their account.

> The **public IP address** of your [trusted application](#trusted-application) must be [whitelisted as a gateway IP address](/docs/reference/api-overview/#ip-address) to forward the user agent's original IP address with the `X-Forwarded-For` HTTP header

##### Request Example for Forgot Password with Trusted Application


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36" \
-H "X-Forwarded-For: 23.235.46.133" \
-d '{
  "username": "dade.murphy@example.com",
}' "https://${yourOktaDomain}/api/v1/authn/recovery/password"
```

##### Response Example for Forgot Password with Trusted Application


```json
{
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "RECOVERY",
  "recoveryToken": "VBQ0gwBp5LyJJFdbmWCM",
  "recoveryType": "PASSWORD",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    }
  },
  "_links": {
    "next": {
      "name": "recovery",
      "href": "https://${yourOktaDomain}/api/v1/authn/recovery/token",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

### Unlock Account


<ApiOperation method="post" url="/api/v1/authn/recovery/unlock" />

Starts a new unlock recovery transaction for a given user and issues a [recovery token](#recovery-token) that can be used to unlock a user's account.

- [Unlock Account with Email Factor](#unlock-account-with-email-factor)
- [Unlock Account with SMS Factor](#unlock-account-with-sms-factor)
- [Unlock Account with Trusted Application](#unlock-account-with-trusted-application)

> Self-service unlock must be permitted via the user's assigned password policy to use this operation.

##### Request Parameters for Unlock Account


| Parameter   | Description                                                                                                      | Param Type | DataType                          | Required | Max Length |
| ----------- | ---------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------- | -------- | ---------- |
| username    | User's non-qualified short-name (dade.murphy) or unique fully-qualified login (dade.murphy@example.com)          | Body       | String                            | TRUE     |            |
| factorType  | Recovery factor to use for primary authentication                                                                | Body       | `EMAIL` or `SMS`                  | FALSE    |            |

> A valid `factorType` is required for requests without an API token with administrator privileges. (See [Unlock Account with Trusted Application](#unlock-account-with-trusted-application))

##### Response Parameter Public Application for Unlock Account


[Recovery Transaction Object](#recovery-transaction-model) with `RECOVERY_CHALLENGE` status for the new recovery transaction.

You always receive a [Recovery Transaction](#recovery-transaction-model) response, even if the requested `username` isn't a valid identifier to prevent information disclosure.

##### Response Parameter Trusted Application for Unlock Account


[Recovery Transaction Object](#recovery-transaction-model) with an issued `recoveryToken` that can be distributed to the end user.

You receive a `403 Forbidden` status code if the `username` requested is not valid.

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
    "errorCode": "E0000095",
    "errorSummary": "Recovery not allowed for unknown user.",
    "errorLink": "E0000095",
    "errorId": "oaetVarN2dKS6ap08dq0k4n7A",
    "errorCauses": []
}
```

#### Unlock Account with Email Factor

Starts a new unlock recovery transaction with a user identifier (`username`) and asynchronously sends a recovery email to the user's primary and secondary email address with a [recovery token](#recovery-token) that can be used to complete the transaction.

Since the recovery email is distributed out-of-band and may be viewed on a different user agent or device, this operation does not return a [state token](#state-token) and does not have a `next` link.

Note:

* Primary authentication of a user's recovery credential (e.g `EMAIL` or `SMS`) hasn't yet completed.
* Okta will not publish additional metadata about the user until primary authentication has successfully completed.

##### Request Example for Email Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "username": "dade.murphy@example.com",
  "factorType": "EMAIL",
}' "https://${yourOktaDomain}/api/v1/authn/recovery/unlock"
```

##### Response Example for Email Factor


```json
{
  "status": "RECOVERY_CHALLENGE",
  "factorResult": "WAITING",
  "factorType": "EMAIL",
  "recoveryType": "UNLOCK"
}
```


#### Unlock Account with SMS Factor

Starts a new unlock recovery transaction with a user identifier (`username`) and asynchronously sends an SMS OTP (challenge) to the user's mobile phone.  This operation transitions the recovery transaction to the `RECOVERY_CHALLENGE` state and waits for the user to [verify the OTP](#verify-sms-recovery-factor).

Note:

* Primary authentication of a user's recovery credential (e.g email or SMS) hasn't yet completed.
* Okta won't publish additional metadata about the user until primary authentication has successfully completed.
* SMS recovery factor must be enabled via the user's assigned password policy to use this operation.

##### Request Example for Unlock Account with SMS Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "username": "dade.murphy@example.com",
  "factorType": "SMS",
}' "https://${yourOktaDomain}/api/v1/authn/recovery/unlock"
```

##### Response Example for Unlock Account with SMS Factor


```json
{
  "stateToken": "00xdqXOE5qDXX8-PBR1bYv8AESqIEinDy3yul01tyh",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "RECOVERY_CHALLENGE",
  "factorType": "SMS",
  "recoveryType": "UNLOCK",
  "_links": {
    "next": {
      "name": "verify",
      "href": "https://${yourOktaDomain}/api/v1/authn/recovery/factors/SMS/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "resend": {
      "name": "sms",
      "href": "https://${yourOktaDomain}/api/v1/authn/recovery/factors/SMS/resend",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Unlock Account with Trusted Application

Allows a [trusted application](#trusted-application) such as an external portal to implement its own primary authentication process and directly obtain a [recovery token](#recovery-token) for a user given just the user's identifier.

Note:

* Directly obtaining a `recoveryToken` is a highly privileged operation that requires an administrator API token and should be restricted to [trusted web applications](#trusted-application).  Anyone that obtains a `recoveryToken` for a user and knows the answer to a user's recovery question can reset their password or unlock their account.

* The **public IP address** of your [trusted application](#trusted-application) must be [whitelisted as a gateway IP address](/docs/reference/api-overview/#ip-address) to forward the user agent's original IP address with the `X-Forwarded-For` HTTP header

##### Request Example for Unlock Account with SMS Factor (Trusted Application)


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36" \
-H "X-Forwarded-For: 23.235.46.133" \
-d '{
  "username": "dade.murphy@example.com",
}' "https://${yourOktaDomain}/api/v1/authn/recovery/unlock"
```

##### Response Example for Unlock Account with SMS Factor (Trusted Application)


```json
{
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "RECOVERY",
  "recoveryToken": "VBQ0gwBp5LyJJFdbmWCM",
  "recoveryType": "UNLOCK",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    }
  },
  "_links": {
    "next": {
      "name": "recovery",
      "href": "https://${yourOktaDomain}/api/v1/authn/recovery/token",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

### Verify Recovery Factor

#### Verify SMS Recovery Factor


<ApiOperation method="post" url="/api/v1/authn/recovery/factors/sms/verify" />

Verifies a SMS OTP (`passCode`) sent to the user's mobile phone for primary authentication for a recovery transaction with `RECOVERY_CHALLENGE` status.

##### Request Parameters for Verify SMS Recovery Factor


| Parameter    | Description                                                  | Param Type | DataType | Required |
| ------------ | ------------------------------------------------------------ | ---------- | -------- | -------- |
| stateToken   | [state token](#state-token) for the current recovery transaction | Body       | String   | TRUE     |
| passCode     | OTP sent to device                                           | Body       | String   | TRUE     |

##### Response Parameters for Verify SMS Recovery Factor


[Recovery Transaction Object](#recovery-transaction-model) with the current [state](#transaction-state) for the recovery transaction.

If the `passCode` is invalid, you receive a `403 Forbidden` status code with the following error:

```json
{
  "errorCode": "E0000068",
  "errorSummary": "Invalid Passcode/Answer",
  "errorLink": "E0000068",
  "errorId": "oae2uOmZcuzToCPEV2Pc_f5zw",
  "errorCauses": [
    {
      "errorSummary": "Your token doesn't match our records. Please try again."
    }
  ]
}
```

##### Request Example for Verify SMS Recovery Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "00xdqXOE5qDXX8-PBR1bYv8AESqIEinDy3yul01tyh",
  "passCode": "657866"
}' "https://${yourOktaDomain}/api/v1/authn/factors/sms/verify"
```

##### Response Example for Verify SMS Recovery Factor


```json
{
  "stateToken": "00xdqXOE5qDXX8-PBR1bYv8AESqIEinDy3yul01tyh",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "RECOVERY",
  "recoveryType": "PASSWORD",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      },
      "recovery_question": {
        "question": "Who's a major player in the cowboy scene?"
      }
    }
  },
  "_links": {
    "next": {
      "name": "answer",
      "href": "https://${yourOktaDomain}/api/v1/authn/recovery/answer",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

###### Resend SMS Recovery Challenge


<ApiOperation method="post" url="/api/v1/authn/recovery/factors/sms/resend" />

Resends a SMS OTP (`passCode`) to the user's mobile phone

#### Request Parameters for Resend SMS Recovery Challenge


| Parameter    | Description                                                  | Param Type | DataType | Required |
| ------------ | ------------------------------------------------------------ | ---------- | -------- | -------- |
| stateToken   | [state token](#state-token) for the current recovery transaction | Body       | String   | TRUE     |

#### Response Parameters for Resend SMS Recovery Challenge


[Recovery Transaction Object](#recovery-transaction-model) with the current [state](#transaction-state) for the recovery transaction.

#### Request Example for Resend SMS Recovery Challenge


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "00xdqXOE5qDXX8-PBR1bYv8AESqIEinDy3yul01tyh"
}' "https://${yourOktaDomain}/api/v1/authn/recovery/factors/sms/resend"
```

#### Response Example for Resend SMS Recovery Challenge


```json
{
  "stateToken": "00xdqXOE5qDXX8-PBR1bYv8AESqIEinDy3yul01tyh",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "RECOVERY_CHALLENGE",
  "factorType": "SMS",
  "recoveryType": "PASSWORD",
  "_links": {
    "next": {
      "name": "verify",
      "href": "https://${yourOktaDomain}/api/v1/authn/recovery/factors/SMS/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "resend": {
      "name": "sms",
      "href": "https://${yourOktaDomain}/api/v1/authn/recovery/factors/SMS/resend",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

> The `factorType` and `recoveryType` properties vary depending on recovery transaction.

#### Verify Call Recovery Factor


<ApiOperation method="post" url="/api/v1/authn/recovery/factors/call/verify" />

Verifies a Voice Call OTP (`passCode`) sent to the user's device for primary authentication for a recovery transaction with `RECOVERY_CHALLENGE` status.

##### Request Parameters for Verify Call Recovery Factor


| Parameter    | Description                                                  | Param Type | DataType | Required |
| ------------ | ------------------------------------------------------------ | ---------- | -------- | -------- |
| stateToken   | [state token](#state-token) for the current recovery transaction | Body       | String   | TRUE     |
| passCode     | Passcode received via the voice call                         | Body       | String   | TRUE     |

##### Response Parameters for Verify Call Recovery Factor


[Recovery Transaction Object](#recovery-transaction-model) with the current [state](#transaction-state) for the recovery transaction.

If the `passCode` is invalid, you receive a `403 Forbidden` status code with the following error:

```json
{
  "errorCode": "E0000068",
  "errorSummary": "Invalid Passcode/Answer",
  "errorLink": "E0000068",
  "errorId": "oae2uOmZcuzToCPEV2Pc_f5zw",
  "errorCauses": [
    {
      "errorSummary": "Your token doesn't match our records. Please try again."
    }
  ]
}
```

##### Request Example for Verify Call Recovery Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "00xdqXOE5qDXX8-PBR1bYv8AESqIEinDy3yul01tyh",
  "passCode": "65786"
}' "https://${yourOktaDomain}/api/v1/authn/factors/CALL/verify"
```

##### Response Example for Verify Call Recovery Factor


```json
{
  "stateToken": "00xdqXOE5qDXX8-PBR1bYv8AESqIEinDy3yul01tyh",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "RECOVERY",
  "recoveryType": "PASSWORD",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      },
      "recovery_question": {
        "question": "Who's a major player in the cowboy scene?"
      }
    }
  },
  "_links": {
    "next": {
      "name": "answer",
      "href": "https://${yourOktaDomain}/api/v1/authn/recovery/answer",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
 }
```

###### Resend Call Recovery Challenge


<ApiOperation method="post" url="/api/v1/authn/recovery/factors/call/resend" />

Resends a Voice Call with OTP (`passCode`) to the user's phone

#### Request Parameters for Resend Call Recovery Challenge


| Parameter    | Description                                                  | Param Type | DataType | Required |
| ------------ | ------------------------------------------------------------ | ---------- | -------- | -------- |
| stateToken   | [state token](#state-token) for the current recovery transaction | Body       | String   | TRUE     |

#### Response Parameters for Resend Call Recovery Challenge


[Recovery Transaction Object](#recovery-transaction-model) with the current [state](#transaction-state) for the recovery transaction.

#### Request Example for Resend Call Recovery Challenge


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "00xdqXOE5qDXX8-PBR1bYv8AESqIEinDy3yul01tyh"
}' "https://${yourOktaDomain}/api/v1/authn/recovery/factors/CALL/resend"
```

#### Response Example for Resend Call Recovery Challenge


```json
{
  "stateToken": "00xdqXOE5qDXX8-PBR1bYv8AESqIEinDy3yul01tyh",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "RECOVERY_CHALLENGE",
  "factorType": "call",
  "recoveryType": "PASSWORD",
  "_links": {
    "next": {
      "name": "verify",
      "href": "https://${yourOktaDomain}/api/v1/authn/recovery/factors/CALL/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "resend": {
      "name": "call",
      "href": "https://${yourOktaDomain}/api/v1/authn/recovery/factors/CALL/resend",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

The `factorType` and `recoveryType` properties vary depending on the recovery transaction.

### Verify Recovery Token


<ApiOperation method="post" url="/api/v1/authn/recovery/token" />

Validates a [recovery token](#recovery-token) that was distributed to the end user to continue the recovery transaction.

##### Request Parameters for Verify Recovery Token


| Parameter     | Description                                                                                                    | Param Type | DataType | Required |
| ------------- | ----------------------------------------------------------------------------------------------------------     | ---------- | -------- | -------- |
| recoveryToken | [Recovery token](#recovery-token) that was distributed to the end user via out-of-band mechanism such as email | Body       | String   | TRUE     |

##### Response Parameters for Verify Recovery Token


[Recovery Transaction Object](#recovery-transaction-model) with a `RECOVERY` status and an issued `stateToken` that must be used to complete the recovery transaction.

You will receive a `401 Unauthorized` status code if you attempt to use an expired or invalid [recovery token](#recovery-token).

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
    "errorCode": "E0000011",
    "errorSummary": "Invalid token provided",
    "errorLink": "E0000011",
    "errorId": "oaeY-4G_TBUTBSZAn9n7oZCfw",
    "errorCauses": []
}
```

##### Request Example for Verify Recovery Token


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "recoveryToken": "00xdqXOE5qDZX8-PBR1bYv8AESqIFinDy3yul01tyh"
}' "https://${yourOktaDomain}/api/v1/authn/recovery/token"
```

##### Response Example for Verify Recovery Token


```json
{
  "stateToken": "00lMJySRYNz3u_rKQrsLvLrzxiARgivP8FB_1gpmVb",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "RECOVERY",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      },
      "recovery_question": {
        "question": "Who's a major player in the cowboy scene?"
      }
    }
  },
  "_links": {
    "next": {
      "name": "answer",
      "href": "https://${yourOktaDomain}/api/v1/authn/recovery/answer",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

### Answer Recovery Question


<ApiOperation method="post" url="/api/v1/authn/recovery/answer" />

Answers the user's recovery question to ensure only the end user redeemed the [recovery token](#recovery-token) for recovery transaction with a `RECOVERY` [status](#transaction-state).

##### Request Parameters for Answer Recovery Question


| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| stateToken   | [state token](#state-token) for the current transaction | Body       | String   | TRUE     |
| answer       | answer to user's recovery question                  | Body       | String   | TRUE     |

##### Response Parameters for Answer Recovery Question


[Recovery Transaction Object](#recovery-transaction-model) with the current [state](#transaction-state) for the recovery transaction.

You will receive a `403 Forbidden` status code if the `answer` to the user's [recovery question](#recovery-question-object) is invalid

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
    "errorCode": "E0000087",
    "errorSummary": "The recovery question answer did not match our records.",
    "errorLink": "E0000087",
    "errorId": "oaeGEiIPFfeR3a_XxpezUH9ug",
    "errorCauses": []
}
```

##### Request Example for Answer Recovery Question


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "stateToken": "00lMJySRYNz3u_rKQrsLvLrzxiARgivP8FB_1gpmVb",
  "answer": "Annie Oakley"
}' "https://${yourOktaDomain}/api/v1/authn/recovery/answer"
```

##### Response Example for Answer Recovery Question


```json
{
  "stateToken": "00lMJySRYNz3u_rKQrsLvLrzxiARgivP8FB_1gpmVb",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "PASSWORD_RESET",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
   },
   "policy": {
    "expiration":{
      "passwordExpireDays": 0
      },
      "complexity": {
        "minLength": 8,
        "minLowerCase": 1,
        "minUpperCase": 1,
        "minNumber": 1,
        "minSymbol": 0,
        "excludeUsername": "true"
       },
       "age":{
         "minAgeMinutes":0,
         "historyCount":0
      }
    }
  },
  "_links": {
    "next": {
      "name": "password",
      "href": "https://${yourOktaDomain}/api/v1/authn/credentials/reset_password",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

### Reset Password


<ApiOperation method="post" url="/api/v1/authn/credentials/reset_password" />

Resets a user's password to complete a recovery transaction with a `PASSWORD_RESET` [state](#transaction-state).

##### Request Parameters for Reset Password


| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| stateToken   | [state token](#state-token) for the current transaction | Body       | String   | TRUE     |
| newPassword  | User's new password                                 | Body       | String   | TRUE     |

##### Response Parameters for Reset Password


[Recovery Transaction Object](#recovery-transaction-model) with the current [state](#transaction-state) for the recovery transaction.

You will receive a `403 Forbidden` status code if the `answer` to the user's [recovery question](#recovery-question-object) is invalid.

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
    "errorCode": "E0000087",
    "errorSummary": "The recovery question answer did not match our records.",
    "errorLink": "E0000087",
    "errorId": "oaeGEiIPFfeR3a_XxpezUH9ug",
    "errorCauses": []
}
```

You will also receive a `403 Forbidden` status code if the `newPassword` does not meet password policy requirements for the user.

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
    "errorCode": "E0000014",
    "errorSummary": "The password does meet the complexity requirements of the current password policy.",
    "errorLink": "E0000014",
    "errorId": "oaeS4O7BUp5Roefkk_y4Z2u8Q",
    "errorCauses": [
        {
            "errorSummary": "Passwords must have at least 8 characters, a lowercase letter, an uppercase letter, a number, no parts of your username"
        }
    ]
}
```

##### Request Example for Reset Password


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "stateToken": "00lMJySRYNz3u_rKQrsLvLrzxiARgivP8FB_1gpmVb",
  "newPassword": "Ch-ch-ch-ch-Changes!"
}' "https://${yourOktaDomain}/api/v1/authn/credentials/reset_password"
```

##### Response Example for Reset Password


```json
{
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "SUCCESS",
  "sessionToken": "00t6IUQiVbWpMLgtmwSjMFzqykb5QcaBNtveiWlGeM",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-11-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    }
  }
}
```

## State Management Operations

### Get Transaction State


<ApiOperation method="post" url="/api/v1/authn" />

Retrieves the current [transaction state](#transaction-state) for a [state token](#state-token).

##### Request Parameters for Get Transaction State


| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| stateToken   | [state token](#state-token) for a transaction       | Body       | String   | TRUE     |

##### Response Parameters for Get Transaction State


[Transaction Object](#transaction-model) with the current [state](#transaction-state) for the authentication or recovery transaction.

##### Request Example for Get Transaction State


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "00lMJySRYNz3u_rKQrsLvLrzxiARgivP8FB_1gpmVb"
}' "https://${yourOktaDomain}/api/v1/authn"
```

##### Response Example for Get Transaction State


```json
{
  "stateToken": "00lMJySRYNz3u_rKQrsLvLrzxiARgivP8FB_1gpmVb",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "MFA_CHALLENGE",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    },
    "factor": {
      "id": "sms193zUBEROPBNZKPPE",
      "factorType": "sms",
      "provider": "OKTA",
      "profile": {
        "phoneNumber": "+1 XXX-XXX-1337"
      }
    }
  },
  "_links": {
    "next": {
      "name": "verify",
      "href": "https://${yourOktaDomain}/api/v1/authn/factors/sms193zUBEROPBNZKPPE/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "prev": {
      "href": "https://${yourOktaDomain}/api/v1/authn/previous",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

### Previous Transaction State


<ApiOperation method="post" url="/api/v1/authn/previous" />

Moves the current [transaction state](#transaction-state) back to the previous state.

For example, when changing state from the start of primary authentication to MFA_ENROLL > ENROLL_ACTIVATE > OTP,
the user's phone might stop working. Since the user can't see the QR code, the transaction must return to MFA_ENROLL.

##### Request Parameters for Previous Transaction State


| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| stateToken   | [state token](#state-token) for a transaction       | Body       | String   | TRUE     |

##### Response Parameters for Previous Transaction State


[Transaction Object](#transaction-model) with the current [state](#transaction-state) for the authentication or recovery transaction.

##### Request Example for Previous Transaction State


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "00lMJySRYNz3u_rKQrsLvLrzxiARgivP8FB_1gpmVb"
}' "https://${yourOktaDomain}/api/v1/authn/previous"
```

##### Response Example for Previous Transaction State


```json
{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "MFA_ENROLL",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    },
    "factors": [
      {
        "factorType": "token",
        "provider": "RSA",
        "vendorName": "RSA",
        "_links": {
          "enroll": {
            "href": "https://${yourOktaDomain}/api/v1/authn/factors",
            "hints": {
              "allow": [
                "POST"
              ]
            }
          }
        },
        "status": "NOT_SETUP",
        "enrollment": "OPTIONAL"
      },
      {
        "factorType": "token:software:totp",
        "provider": "OKTA",
        "vendorName": "OKTA",
        "_links": {
          "enroll": {
            "href": "https://${yourOktaDomain}/api/v1/authn/factors",
            "hints": {
              "allow": [
                "POST"
              ]
            }
          }
        },
        "status": "NOT_SETUP",
        "enrollment": "OPTIONAL"
      },
      {
        "factorType": "sms",
        "provider": "OKTA",
        "vendorName": "OKTA",
        "_links": {
          "enroll": {
            "href": "https://${yourOktaDomain}/api/v1/authn/factors",
            "hints": {
              "allow": [
                "POST"
              ]
            }
          }
        },
        "status": "NOT_SETUP",
        "enrollment": "OPTIONAL"
      },
      {
        "factorType": "push",
        "provider": "OKTA",
        "vendorName": "OKTA",
        "_links": {
          "enroll": {
            "href": "https://${yourOktaDomain}/api/v1/authn/factors",
            "hints": {
              "allow": [
                "POST"
              ]
            }
          }
        },
        "status": "NOT_SETUP",
        "enrollment": "OPTIONAL"
      }
    ]
  },
  "_links": {
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

### Skip Transaction State


<ApiOperation method="post" url="/api/v1/authn/skip" />

Send a skip link to skip the current [transaction state](#transaction-state) and advance to the next state.

If the response returns a skip link, then you can advance to the next state without completing the current state (such as changing the password).
For example, after being warned that a password will soon expire, the user can skip the change password prompt
by clicking a skip link.

Another example: a user has enrolled in multiple factors. After enrolling in one the user receives a skip link
to skip the other factors.

> This operation is only available for `MFA_ENROLL` or `PASSWORD_WARN` states when published as a link.

##### Request Parameters for Skip Transaction State


| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| stateToken   | [state token](#state-token) for a transaction       | Body       | String   | TRUE     |

##### Response Parameters for Skip Transaction State


[Transaction Object](#transaction-model) with the current [state](#transaction-state) for the authentication or recovery transaction.

##### Request Example for Skip Transaction State


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "00lMJySRYNz3u_rKQrsLvLrzxiARgivP8FB_1gpmVb"
}' "https://${yourOktaDomain}/api/v1/authn/skip"
```

##### Response Example for Skip Transaction State


```json
{
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "SUCCESS",
  "sessionToken": "00t6IUQiVbWpMLgtmwSjMFzqykb5QcaBNtveiWlGeM",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-11-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    }
  }
}
```

### Cancel Transaction


<ApiOperation method="post" url="/api/v1/authn/cancel" />

Cancels the current transaction and revokes the [state token](#state-token).

##### Request Parameters for Cancel Transaction


| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| stateToken   | [state token](#state-token) for a transaction       | Body       | String   | TRUE     |

##### Request Example for Cancel Transaction


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "00lMJySRYNz3u_rKQrsLvLrzxiARgivP8FB_1gpmVb"
}' "https://${yourOktaDomain}/api/v1/authn/cancel"
```

## Transaction Model

The Authentication API is a *stateful* API that implements a finite state machine with [defined states](#transaction-state) and transitions.  Each initial authentication or recovery request is issued a unique [state token](#state-token) that must be passed with each subsequent request until the transaction is complete or canceled.

The Authentication API leverages the [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) format to publish `next` and `prev` links for the current transaction state which should be used to transition the state machine.

### Authentication Transaction Model

| Property                          | Description                                                                                     | DataType                                                       | Nullable | Readonly | MaxLength |
|-----------------------------------|-------------------------------------------------------------------------------------------------|----------------------------------------------------------------|----------|----------|-----------|
| stateToken                        | ephemeral [token](#state-token) that encodes the current state of an authentication transaction | String                                                         | TRUE     | TRUE     |           |
| type <ApiLifecycle access="ea" /> | type of authentication transaction. Currently available during step-up authentication           | [Authentication Type](#authentication-type)                    | TRUE     | TRUE     |           |
| sessionToken                      | ephemeral [one-time token](#session-token) used to bootstrap an Okta session                    | String                                                         | TRUE     | TRUE     |           |
| expiresAt                         | lifetime of the `stateToken` or `sessionToken` (See [Tokens](#tokens))                          | Date                                                           | TRUE     | TRUE     |           |
| status                            | current [state](#transaction-state) of the authentication transaction                           | [Transaction State](#transaction-state)                        | FALSE    | TRUE     |           |
| factorResult                      | optional status of last verification attempt for a given factor                                 | [Factor Result](#factor-result)                                | TRUE     | TRUE     |           |
| _embedded                         | [embedded resources](#embedded-resources) for the current `status`                              | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | TRUE     |           |
| _links                            | [link relations](#links-object) for the current `status`                                        | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | TRUE     |           |

### Recovery Transaction Model

| Property      | Description                                                                                            | DataType                                                       | Nullable | Readonly | MaxLength |
| ------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- | -------- | -------- | --------- |
| stateToken    | ephemeral [token](#state-token) that encodes the current state of a recovery transaction               | String                                                         | TRUE     | TRUE     |           |
| recoveryToken | ephemeral [one-time token](#recovery-token) for recovery transaction to be distributed to the end user | String                                                         | TRUE     | TRUE     |           |
| expiresAt     | lifetime of the `stateToken` or `recoveryToken` (See [Tokens](#tokens))                                | Date                                                           | TRUE     | TRUE     |           |
| status        | current [state](#transaction-state) of the recovery transaction                                        | [Transaction State](#transaction-state)                        | FALSE    | TRUE     |           |
| factorType    | type of selected factor for the recovery transaction                                                   | `EMAIL` or `SMS`                                               | FALSE    | TRUE     |           |
| recoveryType  | type of recovery operation                                                                             | `PASSWORD` or `UNLOCK`                                         | FALSE    | TRUE     |           |
| factorResult  | optional status of last verification attempt for the `factorType`                                      | [Factor Result](#factor-result)                                | TRUE     | TRUE     |           |
| _embedded     | [embedded resources](#embedded-resources) for the current `status`                                     | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | TRUE     |           |
| _links        | [link relations](#links-object) for the current `status`                                               | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | TRUE     |           |


### Transaction State

![Transaction State Model Diagram](/img/auth-state-model1.png "The diagram displays the authentication and recovery transaction states.")

An authentication or recovery transaction has one of the following states:

| Value                                          | Description                                                                                               | Next Action                                                                                                         |
| ---------------------                          | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `UNAUTHENTICATED` <ApiLifecycle access="ea" /> | User tried to access protected resource (ex: an app) but user is not authenticated                        | POST to the `next` link relation to [authenticate user credentials](#step-up-authentication-without-okta-session).  |
| `PASSWORD_WARN`                                | The user's password was successfully validated but is about to expire and should be changed.              | POST to the `next` link relation to [change the user's password](#change-password).                                 |
| `PASSWORD_EXPIRED`                             | The user's password was successfully validated but is expired.                                            | POST to the `next` link relation to [change the user's expired password](#change-password).                         |
| `RECOVERY`                                     | The user has requested a recovery token to reset their password or unlock their account.                  | POST to the `next` link relation to [answer the user's recovery question](#answer-recovery-question).               |
| `RECOVERY_CHALLENGE`                           | The user must verify the factor-specific recovery challenge.                                              | POST to the `verify` link relation to [verify the recovery factor](#verify-recovery-factor).                        |
| `PASSWORD_RESET`                               | The user successfully answered their recovery question and must to set a new password.                    | POST to the `next` link relation to [reset the user's password](#reset-password).                                   |
| `LOCKED_OUT`                                   | The user account is locked; self-service unlock or administrator unlock is required.                      | POST to the `unlock` link relation to perform a [self-service unlock](#unlock-account).                             |
| `MFA_ENROLL`                                   | The user must select and enroll an available factor for additional verification.                          | POST to the `enroll` link relation for a specific factor to [enroll the factor](#enroll-factor).                    |
| `MFA_ENROLL_ACTIVATE`                          | The user must activate the factor to complete enrollment.                                                 | POST to the `next` link relation to [activate the factor](#activate-factor).                                        |
| `MFA_REQUIRED`                                 | The user must provide additional verification with a previously enrolled factor.                          | POST to the `verify` link relation for a specific factor to [provide additional verification](#verify-factor).      |
| `MFA_CHALLENGE`                                | The user must verify the factor-specific challenge.                                                       | POST to the `verify` link relation to [verify the factor](#verify-factor).                                          |
| `SUCCESS`                                      | The transaction has completed successfully                                                                |                                                                                                                     |

You advance the authentication or recovery transaction to the next state by posting a request with a valid [state token](#state-token) to the the `next` link relation published in the [JSON HAL links object](#links-object) for the response.

[Enrolling a factor](#enroll-factor) and [verifying a factor](#verify-factor) do not have `next` link relationships as the end user must make a selection of which factor to enroll or verify.

> Never assume a specific state transition or URL when navigating the [state model](#transaction-state).  Always inspect the response for `status` and dynamically follow the [published link relations](#links-object).

```json
{
  "_links": {
    "next": {
      "name": "activate",
      "href": "https://${yourOktaDomain}/api/v1/authn/factors/ostf2xjtDKWFPZIKYDZV/lifecycle/activate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "prev": {
      "href": "https://${yourOktaDomain}/api/v1/authn/previous",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "skip": {
      "href": "https://${yourOktaDomain}/api/v1/authn/skip",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/authn/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

### Authentication Type
<ApiLifecycle access="ea" />

Represents the type of authentication

Currently available only during [SP-initiated step-up authentication](#sp-initiated-step-up-authentication) and [IDP-initiated step-up authentication](#idp-initiated-step-up-authentication).

### Tokens

Authentication API operations return different token types depending on the [state](#transaction-state) of the authentication or recovery transaction.

#### State Token

Ephemeral token that encodes the current state of an authentication or recovery transaction.

* The `stateToken` must be passed with every request except when verifying a `recoveryToken` that was distributed out-of-band
* The `stateToken` is only intended to be used between the web application performing end-user authentication and the Okta API. It should never be distributed to the end user via email or other out-of-band mechanisms.
* The lifetime of the `stateToken` uses a sliding scale expiration algorithm that extends with every request.  Always inspect the `expiresAt` property for the transaction when making decisions based on lifetime.

> All Authentication API operations will return `401 Unauthorized` status code when you attempt to use an expired state token.

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "errorCode": "E0000011",
  "errorSummary": "Invalid token provided",
  "errorLink": "E0000011",
  "errorId": "oaeY-4G_TBUTBSZAn9n7oZCfw",
  "errorCauses": []
}
```

> State transitions are strictly enforced for state tokens.  You will receive a `403 Forbidden` status code if you call an Authentication API operation with a `stateToken` with an invalid [state](#transaction-state).

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "errorCode": "E0000079",
  "errorSummary": "This operation is not allowed in the current authentication state.",
  "errorLink": "E0000079",
  "errorId": "oaen9Ly_ivHQJ-STb8KiADh9w",
  "errorCauses": [
    {
      "errorSummary": "This operation is not allowed in the current authentication state."
    }
  ]
}
```

#### Recovery Token

One-time token issued as `recoveryToken` response parameter when a recovery transaction transitions to the `RECOVERY` status.

* The token can be exchanged for a `stateToken` to recover a user's password or unlock their account.
* Unlike the `statusToken` the `recoveryToken` should be distributed out-of-band to a user such as via email.
* The lifetime of the `recoveryToken` is managed by the organization's security policy.

The `recoveryToken` is sent via an out-of-band channel to the end user's verified email address or SMS phone number and acts as primary authentication for the recovery transaction.

> Directly obtaining a `recoveryToken` is a highly privileged operation and should be restricted to trusted web applications.  Anyone that obtains a `recoveryToken` for a user and knows the answer to a user's recovery question can reset their password or unlock their account.

#### Session Token

One-time token issued as `sessionToken` response parameter when an authentication transaction completes with the `SUCCESS` status.

* The token can be exchanged for a session with the [Session API](/docs/reference/api/sessions/#create-session-with-session-token) or converted to a [session cookie](/docs/guides/session-cookie/).
* The lifetime of the `sessionToken` is 5 minutes.

### Factor Result

The `MFA_CHALLENGE` or `RECOVERY_CHALLENGE` state can return an additional property **factorResult** that provides additional context for the last factor verification attempt.

The following table shows the possible values for this property:

| factorResult           | Description                                                                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------  |
| `WAITING`              | Factor verification has started but not yet completed (e.g user hasn't answered phone call yet)                                     |
| `CANCELLED`            | Factor verification was canceled by user                                                                                            |
| `TIMEOUT`              | Unable to verify factor within the allowed time window                                                                              |
| `TIME_WINDOW_EXCEEDED` | Factor was successfully verified but outside of the computed time window.  Another verification is required in current time window. |
| `PASSCODE_REPLAYED`    | Factor was previously verified within the same time window.  User must wait another time window and retry with a new verification.  |
| `ERROR`                | Unexpected server error occurred verifying factor.                                                                                  |

### Links Object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the current [transaction state](#transaction-state) using the [JSON](https://tools.ietf.org/html/rfc7159) specification.  These links are used to transition the [state machine](#transaction-state) of the authentication or recovery transaction.

The Links Object is read only.

| Link Relation Type | Description                                                                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| next               | Transitions the  [state machine](#transaction-state) to the next state.  **Note: The `name` of the link relationship provides a hint of the next operation required**    |
| prev               | Transitions the  [state machine](#transaction-state) to the previous state.                                                                                              |
| cancel             | Cancels the current  transaction and revokes the [state token](#state-token).                                                                                            |
| skip               | Skips over the current  transaction state to the next valid [state](#transaction-state)                                                                                  |
| resend             | Resends a challenge or OTP to a device                                                                                                                                   |

## Embedded Resources

### User Object

A subset of [user properties](/docs/reference/api/users/#user-model) published in an authentication or recovery transaction after the user successfully completes primary authentication.

| Property          | Description                                       | DataType                                              | Nullable | Unique | Readonly |
| ----------------- | ------------------------------------------------- | ----------------------------------------------------- | -------- | ------ | -------- |
| id                | Unique key for user                               | String                                                | FALSE    | TRUE   | TRUE     |
| passwordChanged   | Timestamp when user's password last changed       | Date                                                  | TRUE     | FALSE  | TRUE     |
| profile           | User's profile                                    | [User Profile Object](#user-profile-object)           | FALSE    | FALSE  | TRUE     |
| recovery_question | User's recovery question                          | [Recovery Question Object](#recovery-question-object) | TRUE     | FALSE  | TRUE     |

```json
{
 "id": "00udnlQDVLVRIVXESCMZ",
 "passwordChanged": "2015-09-08T20:14:45.000Z",
 "profile": {
    "login": "dade.murphy@example.com",
    "firstName":"Dade",
    "lastName": "Murphy",
    "locale": "en_US",
    "timeZone": "America/Los_Angeles"
 },
 "recovery_question": {
    "question": "Who's to a major player in the cowboy scene?"
  }
}
```

#### User Profile Object

Subset of [profile properties](/docs/reference/api/users/#profile-object) for a user

| Property  | Description                                                                                                                        | DataType  | Nullable | Unique | Readonly | Validation                                                            |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | ------ | -------- | --------------------------------------------------------------------- |
| login     | Unique login for user                                                                                                              | String    | FALSE    | TRUE   | TRUE     |                                                                       |
| firstName | First name of user                                                                                                                 | String    | FALSE    | FALSE  | TRUE     |                                                                       |
| lastName  | Last name of user                                                                                                                  | String    | FALSE    | FALSE  | TRUE     |                                                                       |
| locale    | User's default location for purposes of localizing items such as currency, date time format, numerical representations, etc.       | String    | TRUE     | FALSE  | TRUE     | [RFC 5646](https://tools.ietf.org/html/rfc5646)                       |
| timeZone  | User's time zone                                                                                                                   | String    | TRUE     | FALSE  | TRUE     | [IANA Time Zone database format](https://tools.ietf.org/html/rfc6557) |

#### Remember Device Policy Object

A subset of policy settings of the Sign-On Policy or App Sign-On Policy published during `MFA_REQUIRED`, `MFA_CHALLENGE` states

| Property                        | Description                                                                      | DataType  | Nullable | Unique | Readonly |
| ------------------------------- | -------------------------------------------------------------------------------- | --------- | -------- | ------ | -------- |
| allowRememberDevice             | Indicates whether remember device is allowed based on the policy                 | Boolean   | FALSE    | FALSE  | TRUE     |
| rememberDeviceByDefault         | Indicates whether user previously opted to remember the current device           | Boolean   | FALSE    | FALSE  | TRUE     |
| rememberDeviceLifetimeInMinutes | Indicates how long the current verification would be valid (based on the policy) | Number    | FALSE    | FALSE  | TRUE     |

##### When sign-on policy is device based

```json
{
  "allowRememberDevice": true,
  "rememberDeviceByDefault": false,
  "rememberDeviceLifetimeInMinutes": 0
}
```

##### When sign-on policy is time based

```json
{
  "allowRememberDevice": true,
  "rememberDeviceByDefault": false,
  "rememberDeviceLifetimeInMinutes": 5
}
```

* `rememberDeviceByDefault` is true if the user has chosen to remember the current device.
* The value of `rememberDeviceLifetimeInMinutes` depends on the factor lifetime value configured in the Sign-On Policy rule

##### When policy is not based on time or device
```json
{
   "allowRememberDevice":false,
   "rememberDeviceByDefault":false,
   "rememberDeviceLifetimeInMinutes":0
}
```

#### Recovery Question Object

User's recovery question used for verification of a recovery transaction

| Property          | Description                    | DataType | Nullable | Unique | Readonly |
| ----------------- | ------------------------------ | -------- | -------- | ------ | -------- |
| question          | User's recovery question       | String   | FALSE    | TRUE   | TRUE     |

### Target Object

<ApiLifecycle access="ea" />
Represents the target resource that user tried accessing. Typically this is the app that user is trying to sign-in.
Currently this is available only during [SP-initiated step-up authentication](#sp-initiated-step-up-authentication) and [IDP-initiated step-up authentication](#idp-initiated-step-up-authentication).

| Property  | Description                                                                                                                  | DataType                                                       | Nullable | Unique | Readonly |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------                                                      | -------- | ------ | -------- |
| type      | Type of the target resource. Currently only 'APP' is the supported type.                                                     | String                                                         | FALSE    | TRUE   | TRUE     |
| name      | Name of the target resource                                                                                                  | String                                                         | FALSE    | FALSE  | TRUE     |
| label     | Label of the target resource                                                                                                 | String                                                         | FALSE    | FALSE  | TRUE     |
| _links    | Discoverable resources for the target                                                                                        | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |

### Authentication Object

<ApiLifecycle access="ea" />
Represents the authentication details that the target resource is using.
Currently this is available only during [SP-initiated step-up authentication](#sp-initiated-step-up-authentication) and [IDP-initiated step-up authentication](#idp-initiated-step-up-authentication).

| Property  | Description                                                                                                                  | DataType                         | Nullable | Unique | Readonly |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------                        | -------- | ------ | -------- |
| protocol  | The protocol of authentication.                                                                                              | `SAML2.0`, `SAML1.1` or `WS-FED` | FALSE    | TRUE   | TRUE     |
| issuer    | The issuer of the assertion.                                                                                                 | [Issuer Object](#issuer-object)  | FALSE    | FALSE  | TRUE     |

```json
{
  "protocol": "SAML2.0",
  "issuer": {
    "id": "0oa1zypkDcts6Vliw0g4",
    "name": "Corporate SFDC",
    "uri": "exk2x5ixHmk9MBnqz0g4"
  }
}
```

#### Issuer Object
The issuer that generates the assertion after the authentication finishes.

| Property  | Description                                                                                                                  | DataType  | Nullable | Unique | Readonly |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | ------ | -------- |
| id        | Id of the issuer.                                                                                                            | String    | TRUE     | TRUE   | TRUE     |
| name      | Name of the issuer.                                                                                                          | String    | FALSE    | FALSE  | TRUE     |
| uri       | URI of the issuer.                                                                                                           | String    | FALSE    | FALSE  | TRUE     |

### Password Policy Object

A subset of policy settings for the user's assigned password policy published during `PASSWORD_WARN`, `PASSWORD_EXPIRED`, or `PASSWORD_RESET` states

| Property   | Description                  | DataType                                                  | Nullable | Unique | Readonly |
| ---------- | ---------------------------- | --------------------------------------------------------- | -------- | ------ | -------- |
| expiration | Password expiration settings | [Password Expiration Object](#password-expiration-object) | TRUE     | FALSE  | TRUE     |
| complexity | Password complexity settings | [Password Complexity Object](#password-complexity-object) | FALSE    | FALSE  | TRUE     |

```json
{
  "expiration":{
    "passwordExpireDays": 0
  },
  "complexity": {
    "minLength": 8,
    "minLowerCase": 1,
    "minUpperCase": 1,
    "minNumber": 1,
    "minSymbol": 0,
    "excludeUsername": "true"
    },
   "age":{
     "minAgeMinutes":0,
     "historyCount":0
    }
}
```

#### Password Expiration Object

Specifies the password age requirements of the assigned password policy

| Property           | Description                               | DataType | Nullable | Unique | Readonly |
| ------------------ | ----------------------------------------- | -------- | -------- | ------ | -------- |
| passwordExpireDays | number of days before password is expired | Number   | FALSE    | FALSE  | TRUE     |

#### Password Complexity Object

Specifies the password complexity requirements of the assigned password policy

| Property        | Description                                                | DataType | Nullable | Unique | Readonly |
| ------------    | ----------------------------------------------------       | -------- | -------- | ------ | -------- |
| minLength       | Minimum number of characters for password                  | Number   | FALSE    | FALSE  | TRUE     |
| minLowerCase    | Minimum number of lower case characters for password       | Number   | FALSE    | FALSE  | TRUE     |
| minUpperCase    | Minimum number of upper case characters for password       | Number   | FALSE    | FALSE  | TRUE     |
| minNumber       | Minimum number of numeric characters for password          | Number   | FALSE    | FALSE  | TRUE     |
| minSymbol       | Minimum number of symbol characters for password           | Number   | FALSE    | FALSE  | TRUE     |
| excludeUsername | Prevents username or domain from appearing in the password | Boolean  | FALSE    | FALSE  | TRUE     |

> Duplicate the minimum Active Directory requirements in these settings for AD-mastered users. No enforcement is triggered by Okta settings for AD-mastered users.

#### Password Age Object

Specifies the password requirements related to password age and history

| Property         | Description                                                              | DataType | Nullable | Unique | Readonly |
| ---------------- | ------------------------------------------------------------------------ | -------- | -------- | ------ | -------- |
| minAgeMinutes    | Minimum number of minutes required since the last password change        | Number   | FALSE    | FALSE  | TRUE     |
| historyCount     | Number of previous passwords that the current password can't match       | Number   | FALSE    | FALSE  | TRUE     |

### Factor Object

A subset of [factor properties](/docs/reference/api/factors/#factor-model) published in an authentication transaction during `MFA_ENROLL`, `MFA_REQUIRED`, or `MFA_CHALLENGE` states

| Property       | Description                                                                                    | DataType                                                       | Nullable | Unique | Readonly |
| -------------- | ----------------------------------------------------------------------------------------       | -------------------------------------------------------------- | -------- | ------ | -------  |
| id             | unique key for factor                                                                          | String                                                         | TRUE     | TRUE   | TRUE     |
| factorType     | type of factor                                                                                 | [Factor Type](/docs/reference/api/factors/#factor-type)                             | FALSE    | TRUE   | TRUE     |
| provider       | factor provider                                                                                | [Provider Type](/docs/reference/api/factors/#provider-type)                         | FALSE    | TRUE   | TRUE     |
| vendorName     | factor Vendor Name (Same as provider but for On Prem MFA it depends on Administrator Settings) | [Provider Type](/docs/reference/api/factors/#provider-type)                         | FALSE    | TRUE   | TRUE     |
| profile        | profile of a [supported factor](/docs/reference/api/factors/#supported-factors-for-providers)                       | [Factor Profile Object](/docs/reference/api/factors/#factor-profile-object)         | TRUE     | FALSE  | TRUE     |
| _embedded      | [embedded resources](#factor-embedded-resources) related to the factor                         | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |
| _links         | [discoverable resources](#factor-links-object) for the factor                                  | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |

```json
{
  "id": "ostfm3hPNYSOIOIVTQWY",
  "factorType": "token:software:totp",
  "provider": "OKTA",
  "profile": {
    "credentialId": "dade.murphy@example.com"
  },
  "_links": {
    "verify": {
      "href": "https://${yourOktaDomain}/api/v1/authn/factors/ostfm3hPNYSOIOIVTQWY/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Factor Embedded Resources

##### TOTP Factor Activation Object

TOTP factors, when activated, have an embedded verification object which describes the [TOTP](http://tools.ietf.org/html/rfc6238) algorithm parameters.

| Property       | Description                                       | DataType                                                       | Nullable | Unique | Readonly |
| -------------- | ------------------------------------------------- | -------------------------------------------------------------- | -------- | ------ | -------- |
| timeStep       | Time-step size for TOTP                           | String                                                         | FALSE    | FALSE  | TRUE     |
| sharedSecret   | Unique secret key for prover                      | String                                                         | FALSE    | FALSE  | TRUE     |
| encoding       | Encoding of `sharedSecret`                        | `base32` or `base64`                                           | FALSE    | FALSE  | TRUE     |
| keyLength      | Number of digits in an TOTP value                 | Number                                                         | FALSE    | FALSE  | TRUE     |
| _links         | Discoverable resources related to the activation  | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |

> This object implements [the TOTP standard](https://tools.ietf.org/html/rfc6238), which is used by apps like Okta Verify and Google Authenticator.

``` json
{
  "activation": {
    "timeStep": 30,
    "sharedSecret": "HE64TMLL2IUZW2ZLB",
    "encoding": "base32",
    "keyLength": 6
  }
}
```

###### TOTP Activation Links Object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the TOTP activation object using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification.  This object is used for dynamic discovery of related resources and operations.

| Link Relation Type | Description                                                              |
| ------------------ | ------------------------------------------------------------------------ |
| qrcode             | QR code that encodes the TOTP parameters that can be used for enrollment |

##### Phone Object

The phone object describes previously enrolled phone numbers for the `sms` factor.

| Property      | Description          | DataType                                      | Nullable | Unique | Readonly |
| ------------- | -------------------- | --------------------------------------------- | -------- | ------ | -------- |
| id            | Unique key for phone | String                                        | FALSE    | TRUE   | TRUE     |
| profile       | Profile of phone     | [Phone Profile Object](#phone-profile-object) | FALSE    | FALSE  | TRUE     |
| status        | Status of phone      | `ACTIVE` or `INACTIVE`                        | FALSE    | FALSE  | TRUE     |

```json
{
    "id": "mbl198rKSEWOSKRIVIFT",
    "profile": {
        "phoneNumber": "+1 XXX-XXX-1337"
    },
    "status": "ACTIVE"
}
```

###### Phone Profile Object

| Property      | Description          | DataType  | Nullable | Unique | Readonly |
| ------------- | -------------------- | --------- | -------- | ------ | -------- |
| phoneNumber   | Masked phone number  | String    | FALSE    | FALSE  | TRUE     |

##### Push Factor Activation Object

Push factors must complete activation on the device by scanning the QR code or visiting activation link sent via email or sms.

| Property       | Description                                       | DataType                                                       | Nullable | Unique | Readonly |
| -------------- | ------------------------------------------------- | -------------------------------------------------------------- | -------- | ------ | -------- |
| expiresAt      | Lifetime of activation                            | Date                                                           | FALSE    | FALSE  | TRUE     |
| _links         | Discoverable resources related to the activation  | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | FALSE    | FALSE  | TRUE     |

```json
{
  "activation": {
    "expiresAt": "2015-11-13T07:44:22.000Z",
    "_links": {
      "send": [
        {
          "name": "email",
          "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfbtzzrjgwauUsxO0g4/lifecycle/activate/email",
          "hints": {
            "allow": [
              "POST"
            ]
          }
        },
        {
          "name": "sms",
          "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfbtzzrjgwauUsxO0g4/lifecycle/activate/sms",
          "hints": {
            "allow": [
              "POST"
            ]
          }
        }
      ],
      "qrcode": {
        "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfbtzzrjgwauUsxO0g4/qr/00Ji8qVBNJD4LmjYy1WZO2VbNqvvPdaCVua-1qjypa",
        "type": "image/png"
      }
    }
  }
}
```

###### Push Factor Activation Links Object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the push factor activation object using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification.  This object is used for dynamic discovery of related resources and operations.

| Link Relation Type | Description                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------- |
| qrcode             | QR code that encodes the push activation code needed for enrollment on the device        |
| send               | Sends an activation link via `email` or `sms` for users who can't scan the QR code       |

##### Factor Links Object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the factor using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification.  This object is used for dynamic discovery of related resources and operations.

The Factor Links Object is read only.

| Link Relation Type | Description                                                 |
| ------------------ | ----------------------------------------------------------- |
| enroll             | [Enrolls a factor](#enroll-factor)                          |
| verify             | [Verifies a factor](#verify-factor)                         |
| questions          | Lists all possible questions for the `question` factor type |
| resend             | Resends a challenge or OTP to a device                      |
