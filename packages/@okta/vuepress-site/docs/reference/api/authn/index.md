---
title: Authentication
category: authentication
excerpt: Control user access to Okta.
---

# Authentication API

The Okta Authentication API provides operations to authenticate users, perform multifactor enrollment and verification, recover forgotten passwords, and unlock accounts. It can be used as a standalone API to provide the identity layer on top of your existing application, or it can be integrated with the Okta [Sessions API](/docs/reference/api/sessions/) to obtain an Okta [session cookie](/docs/guides/session-cookie/) and access apps within Okta.

The API is targeted for developers who want to build their own end-to-end login experience to replace the built-in Okta login experience and addresses the following key scenarios:

* **Primary authentication** allows you to verify username and password credentials for a user.
* **Multifactor authentication** (MFA) strengthens the security of password-based authentication by requiring additional verification of another Factor such as a temporary one-time password or an SMS passcode. The Authentication API supports user enrollment with MFA factors enabled by the administrator, as well as MFA challenges based on your **Okta Sign-On Policy**.
* **Recovery** allows users to securely reset their password if they've forgotten it, or unlock their account if it has been locked out due to excessive failed login attempts. This functionality is subject to the security policy set by the administrator.

## Application types

The behavior of the Okta Authentication API varies depending on the type of your application and your org's security policies such as the **Okta Sign-On Policy**, **MFA Enrollment Policy**, or **Password Policy**.

> **Note:** Policy evaluation is conditional on the [client request context](/docs/reference/api-overview/#client-request-context) such as IP address.

### Public application

A public application is an application that anonymously starts an authentication or recovery transaction without an API token, such as the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/).  Public applications are aggressively rate-limited to prevent abuse and require primary authentication to be successfully completed before releasing any metadata about a user.

### Trusted application

Trusted applications are backend applications that act as authentication broker or login portal for your Okta organization and may start an authentication or recovery transaction with an administrator API token.  Trusted apps may implement their own recovery flows and primary authentication process and may receive additional metadata about the user before primary authentication has successfully completed.

> **Note:** Trusted web applications may need to override the [client request context](/docs/reference/api-overview/#client-request-context) to forward the originating client context for the user.


## Get started with authentication

1. Make sure that you need the API. Check out the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) which is built on the Authentication API. The Sign-In Widget is easier to use and supports basic use cases.
2. For more advanced use cases, learn [the Okta API basics](/code/rest/).
3. Explore the Authentication API:

    [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/6f4f9ca4145db4d80270)

## Authentication operations

### Primary authentication


<ApiOperation method="post" url="/api/v1/authn" />

Every authentication transaction starts with primary authentication which validates a user's primary password credential. **Password Policy**, **MFA Policy**,  and **Sign-On Policy** are evaluated during primary authentication to determine if the user's password is expired, a Factor should be enrolled, or additional verification is required. The [transaction state](#transaction-state) of the response depends on the user's status, group memberships and assigned policies.

The requests and responses vary depending on the application type, and whether a password expiration warning is sent:

* [Primary Authentication with Public Application](#primary-authentication-with-public-application)&mdash;[Request Example](#request-example-for-primary-authentication-with-public-application)
* [Primary Authentication with Trusted Application](#primary-authentication-with-trusted-application)&mdash;[Request Example](#request-example-for-trusted-application)
* [Primary Authentication with Activation Token](#primary-authentication-with-activation-token)&mdash;[Request Example](#request-example-for-activation-token)
* [Primary Authentication with Device Fingerprinting](#primary-authentication-with-device-fingerprinting)&mdash;[Request Example](#request-example-for-device-fingerprinting)
* [Primary Authentication with Password Expiration Warning](#primary-authentication-with-password-expiration-warning)&mdash;[Request Example](#request-example-for-password-expiration-warning)

> **Note:** You must first enable MFA factors and assign a valid **Sign-On Policy** to a user to enroll and/or verify a MFA Factor during authentication.

#### Request parameters for primary authentication


As part of the authentication call either the username and password or the token parameter must be provided.

| Parameter  | Description                                                                                                      | Param Type | DataType                          | Required | MaxLength |
|------------|:-----------------------------------------------------------------------------------------------------------------|:-----------|:----------------------------------|:---------|:----------|
| audience   | App ID of the target app the user is signing into                                                                | Body       | String                            | FALSE    |           |
| context    | Provides additional context for the authentication transaction                                                   | Body       | [Context object](#context-object) | FALSE    |           |
| options    | Opt-in features for the authentication transaction                                                               | Body       | [Options object](#options-object) | FALSE    |           |
| password   | User's password credential                                                                                       | Body       | String                            | FALSE    |           |
| token      | Token received as part of activation user request                                                                | Body       | String                            | FALSE    |           |
| username   | User's non-qualified short-name (for example: dade.murphy) or unique fully-qualified sign in name (for example: dade.murphy@example.com) | Body       | String                            | FALSE    |           |

##### Options object

The authentication transaction [state machine](#transaction-state) can be modified via the following opt-in features:

| Property                   | Description                                                                                                                                                | DataType | Nullable | Unique | Readonly |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | ------ | -------- |
| multiOptionalFactorEnroll  | Transitions transaction back to `MFA_ENROLL` state after successful Factor enrollment when additional optional factors are available for enrollment        | Boolean  | TRUE     | FALSE  | FALSE    |
| warnBeforePasswordExpired  | Transitions transaction to `PASSWORD_WARN` state before `SUCCESS` if the user's password is about to expire and within their password policy warn period   | Boolean  | TRUE     | FALSE  | FALSE    |

##### Context object

The context object allows [trusted web applications](#trusted-application) such as an external portal to pass additional context for the authentication or recovery transaction.

> **Note:** Overriding context such as `deviceToken` is a highly privileged operation limited to trusted web applications and requires making authentication or recovery requests with a valid *administrator API token*. If an API token is not provided, the `deviceToken` will be ignored.

| Property    | Description                                                                   | DataType | Nullable | Unique | Readonly | MinLength | MaxLength |
| ----------- | ----------------------------------------------------------------------------- | -------- | -------- | ------ | -------- | --------- | --------- |
| deviceToken | A globally unique ID identifying the user's client device or user agent | String   | TRUE     | FALSE  | FALSE    |           | 32        |

> **Note:** You must always pass the same `deviceToken` for a user's device with every authentication request for per-device or per-session Sign-On Policy Factor challenges. If the `deviceToken` is absent or does not match the previous `deviceToken`, the user is challenged every-time instead of per-device or per-session.<br><br>Similarly, you must always pass the same `deviceToken` for a user's device with every authentication request for **new device security behavior detection**. If the `deviceToken` is absent or doesn't match a recent `deviceToken` for the user, the request is considered to be from a new device. See [New Device Behavior Detection](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_proc_security_behavior_detection).

##### Device Token Best Practices

Use the following recommendations as guidelines for generating and storing a `deviceToken` for both web and native applications.

**Web Apps**<br>
Okta recommends that you generate a UUID or GUID for each client and persist the `deviceToken` using a secure, HTTP-only cookie or HTML5 localStorage scoped to the customer's domain as the default implementation. See [Cookie flags that matter](https://odino.org/security-hardening-http-cookies/#cookie-flags-that-matter) for more best practices on hardening HTTP cookies.

**Native Apps**<br>
Ask the device operating system for a unique device ID. See [Apple's information on DeviceCheck](https://developer.apple.com/documentation/devicecheck) for an example.

#### Response parameters

[Authentication Transaction object](#authentication-transaction-object) with the current [state](#transaction-state) for the authentication transaction

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

#### Primary authentication with public application

Authenticates a user with username/password credentials via a [public application](#public-application)

##### Request example for primary authentication with public application


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

##### Response example for primary authentication with public application (success)


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

##### Response example for primary authentication with public application (invalid credentials)


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

##### Response example for primary authentication with public application (locked out)

Primary authentication requests for a user with `LOCKED_OUT` status is conditional on the user's password policy.  Password policies define whether to hide or show  lockout failures which disclose a valid user identifier to the caller.

##### Response example for primary authentication with public application and hide lockout failures (Default)

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

##### Response example for primary authentication with public application and show lockout failures

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

##### Response example for primary authentication with public application and expired password

User must [change their expired password](#change-password) to complete the authentication transaction.

> **Note:** Users are challenged for MFA (`MFA_REQUIRED`) before `PASSWORD_EXPIRED` if they have an active Factor enrollment.

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

##### Response example for primary authentication with public application (Factor challenge)


User is assigned to a **Sign-On Policy** that requires additional verification and must [select and verify](#verify-factor) a previously enrolled [Factor](#factor-object) by `id` to complete the authentication transaction.

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

##### Response example for primary authentication with public application (Factor enroll)


User is assigned to a **MFA Policy** that requires enrollment during sign-in and must [select a Factor to enroll](#enroll-factor) to complete the authentication transaction.

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

#### Primary authentication with trusted application

Authenticates a user via a [trusted application](#trusted-application) or proxy that overrides [client request context](/docs/reference/api-overview/#client-request-context)

**Notes:**

* Specifying your own `deviceToken` is a highly privileged operation limited to trusted web applications and requires making authentication requests with a valid *API token*. If an API token is not provided, the `deviceToken` will be ignored.
* The **public IP address** of your [trusted application](#trusted-application) must be [whitelisted as a gateway IP address](/docs/reference/api-overview/#ip-address) to forward the user agent's original IP address with the `X-Forwarded-For` HTTP header.

##### Request example for trusted application


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

##### Response example for trusted application


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

#### Primary authentication with activation token

Authenticates a user via a [trusted application](#trusted-application) or proxy that overrides the [client request context](/docs/reference/api-overview/#client-request-context)

**Notes:**

* Specifying your own `deviceToken` is a highly privileged operation limited to trusted web applications and requires making authentication requests with a valid *API token*. If an API token is not provided, the `deviceToken` is ignored.
* The **public IP address** of your [trusted application](#trusted-application) must be [whitelisted as a gateway IP address](/docs/reference/api-overview/#ip-address) to forward the user agent's original IP address with the `X-Forwarded-For` HTTP header.

##### Request example for activation token

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

##### Response example for activation token (success - user with password, no MFA)

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

##### Response example for activation token (success - user with password and configured MFA)


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

##### Response example for activation token (success - user without password)


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

##### Response example for activation token (failure - invalid or expired token)


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

#### Primary authentication with device fingerprinting

Include the `X-Device-Fingerprint` header to supply a device fingerprint. The `X-Device-Fingerprint` header is used in the following ways:

* If the new or unknown device email notification is enabled, an email is sent to the user if the device fingerprint sent in the `X-Device-Fingerprint` header isn't associated with a previously successful user sign in. For more information about this feature, see the [General Security documentation]https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Security_General.
* If you have the security behavior detection feature enabled and you have a new device behavior configured in a policy rule, a new device is detected if the device fingerprint sent in the `X-Device-Fingerprint` header isn't associated with a previously successful user sign in. See [New Device Behavior Detection](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_proc_security_behavior_detection).

Specifying your own device fingerprint in the `X-Device-Fingerprint` header is a highly privileged operation that is limited to trusted web applications and requires making authentication requests with a valid API token. You should send the device fingerprint only if the trusted app has a computed fingerprint for the end user's client.

> **Note:** The `X-Device-Fingerprint` header is different from the device token. Device-based MFA in the Okta Sign-On policy rules depends on the device token only and not on the `X-Device-Fingerprint` header. To read more about the device token, see [Context Object](#context-object). Device-based MFA would work only if you pass the device token in the [client request context](/docs/reference/api-overview/#client-request-context).

##### Device Fingerprint Best Practices

Use the following recommendations as guidelines for generating and storing a device fingerprint in the `X-Device-Fingerprint` header for both web and native applications.

**Web Apps**<br>
Okta recommends using a secure, HTTP-only cookie with a random/unique value on the customer's domain as the default implementation. See [Cookie flags that matter](https://odino.org/security-hardening-http-cookies/#cookie-flags-that-matter) for more best practices on hardening HTTP cookies.

**Native Apps**<br>
Ask the device operating system for a unique device ID. See [Apple's information on DeviceCheck](https://developer.apple.com/documentation/devicecheck) for an example.

##### Request example for device fingerprinting

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

##### Response example for device fingerprinting


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

#### Primary authentication with password expiration warning

Authenticates a user with a password that is about to expire.  The user should [change their password](#change-password) to complete the authentication transaction but can choose to skip it.

**Notes:**

* The `warnBeforePasswordExpired` option must be explicitly specified as `true` to allow the authentication transaction to transition to `PASSWORD_WARN` status.
* Non-expired passwords successfully complete the authentication transaction if this option is omitted or is specified as `false`.

##### Request example for password expiration warning


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

##### Response example for password expiration warning


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



### SP-initiated step-up authentication


<ApiLifecycle access="ea" />

**Notes:**

* This endpoint is currently supported only for SAML-based apps.
* You must first enable the custom sign-in page for the application before using this API.

Every step-up transaction starts with the user accessing an application. If step-up authentication is required, Okta redirects the user to the custom sign-in page with state token as a request parameter.

For example, if the custom sign-in page is set as **https://login.example.com**, then Okta will redirect to **https://login.example.com?stateToken=**00BClWr4T-mnIqPV8dHkOQlwEIXxB4LLSfBVt7BxsM. To determine the next step, check the [state of the transaction](#get-transaction-state).

* [Step-up authentication without Okta session](#step-up-authentication-without-okta-session)
* [Step-up authentication with Okta session](#step-up-authentication-with-okta-session)

#### Step-up authentication without Okta session

##### Request example for step-up suthentication without Okta session (get transaction state)


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
   "stateToken":"00BClWr4T-mnIqPV8dHkOQlwEIXxB4LLSfBVt7BxsM"
}' "https://${yourOktaDomain}/api/v1/authn"
```

##### Response example for step-up authentication without Okta session


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

##### Request example for step-up authentication without Okta session (perform primary authentication)

Primary authentication has to be completed by using the value of **stateToken** request parameter passed to custom sign-in page.

> **Note:** Okta Sign-On Policy and the related App Sign-On Policy are evaluated after successful primary authentication.

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

##### Response example for step-up authentication without Okta session when MFA isn't required

> **Note:** Sign in to the app by following the next link relation.

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

#### Step-up authentication with Okta session

##### Request example to get transaction state for step-up authentication with Okta session


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
   "stateToken":"00BClWr4T-mnIqPV8dHkOQlwEIXxB4LLSfBVt7BxsM"
}' "https://${yourOktaDomain}/api/v1/authn"
```

##### Response example for Factor enroll for step-up authentication with Okta session


The user is assigned to an MFA Policy that requires enrollment during the sign-in process and must [select a Factor to enroll](#enroll-factor) to complete the authentication transaction.

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


##### Response example for Factor challenge for step-up authentication with Okta session

User is assigned to a Sign-On Policy or App Sign-On Policy that requires additional verification and must [select and verify](#verify-Factor) a previously enrolled [Factor](#Factor-object) by `id` to complete the authentication transaction.

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

##### Response example after authentication and MFA are complete for step-up authentication with Okta session

> **Note:** Sign in to the app by following the next link relation.

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

### IDP-initiated step-up authentication


<ApiOperation method="post" url="/api/v1/authn" />

<ApiLifecycle access="ea" />

Authenticates a user for signing in to the specified application

**Notes:**

* Only WS-Federation, SAML based apps are supported.
* Pass the application instance ID of the app as ["audience"](#request-parameters-for-primary-authentication) along with the user credentials.

> **Note:** Okta Sign-on Policy and the related App Sign-on Policy are evaluated after successful primary authentication.

##### Request example for IDP-initiated step-up authentication


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

##### Response example when MFA isn't required


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

> **Note:** Sign in to the app by following the `next` link relation.

##### Response example for Factor enroll

The user is assigned to an MFA Policy that requires enrollment during the sign-in process and must [select a Factor to enroll](#enroll-factor) to complete the authentication transaction.

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

##### Response example for Factor challenge


User is assigned to a Sign-on Policy or App Sign-on Policy that requires additional verification and must [select and verify](#verify-factor) a previously enrolled [Factor](#factor-object) by `id` to complete the authentication transaction.

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


##### Response example for invalid or unknown application


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

##### Response example for unsupported application


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
            "errorSummary": "Sign in not allowed for app '0oapt2yIp38ySYiMP0g3'."
        }
    ]
}
```

### Change password


<ApiOperation method="post" url="/api/v1/authn/credentials/change_password" />

Changes a user's password by providing the existing password and the new password for authentication transactions with either the `PASSWORD_EXPIRED` or `PASSWORD_WARN` state

* A user *must* change their expired password for an authentication transaction with `PASSWORD_EXPIRED` status to successfully complete the transaction.
* A user *may* opt-out of changing their password (skip) when the transaction has a `PASSWORD_WARN` status.

#### Request parameters for change password


| Parameter   | Description                                                      | Param Type | DataType  | Required |
| ----------- | ---------------------------------------------------------------- | ---------- | --------- | -------- |
| newPassword | New password for user                                            | Body       | String    | TRUE     |
| oldPassword | User's current password that is expired or about to expire       | Body       | String    | TRUE     |
| stateToken  | [state token](#state-token) for the current transaction              | Body       | String    | TRUE     |

#### Response parameters for change password


[Authentication Transaction object](#authentication-transaction-object) with the current [state](#transaction-state) for the authentication transaction

If the `oldPassword` is invalid you receive a `403 Forbidden` status code with the following error:

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

If the `newPassword` does not meet password policy requirements, you receive a `403 Forbidden` status code with the following error:

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

##### Request example for change password


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

##### Response example for change password


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

## Multifactor Authentication operations

You can enroll, activate, manage, and verify factors inside the authentication context with `/api/v1/authn/factors`.

> **Note:** You can enroll, manage, and verify factors outside the authentication context with [`/api/v1/users/:uid/factors/`](/docs/reference/api/factors/#factor-verification-operations).

### Enroll Factor


<ApiOperation method="post" url="/api/v1/authn/factors" /> <SupportsCors />

Enrolls a user with a [Factor](/docs/reference/api/factors/#supported-factors-for-providers) assigned by their **MFA Policy**

* [Enroll Okta Security Question Factor](#enroll-okta-security-question-factor)
* [Enroll Okta SMS Factor](#enroll-okta-sms-factor)
* [Enroll Okta Call Factor](#enroll-okta-call-factor)
* [Enroll Okta Email Factor](#enroll-okta-email-factor)
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

> **Note:** This operation is only available for users that have not previously enrolled a Factor and have transitioned to the `MFA_ENROLL` [state](#transaction-state).

#### Request parameters for enroll Factor


| Parameter   | Description                                                                   | Param Type  | DataType                                                      | Required |
| ----------- | ----------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------- | -------- |
| factorType  | type of Factor                                                                | Body        | [Factor Type](/docs/reference/api/factors/#factor-type)                            | TRUE     |
| profile     | profile of a [supported Factor](/docs/reference/api/factors/#supported-factors-for-providers)      | Body        | [Factor Profile object](/docs/reference/api/factors/#factor-profile-object)        | TRUE     |
| provider    | Factor provider                                                               | Body        | [Provider Type](/docs/reference/api/factors/#provider-type)                        | TRUE     |
| stateToken  | [state token](#state-token) for the current transaction                           | Body        | String                                                        | TRUE     |

#### Response parameters for enroll Factor


[Authentication Transaction object](#authentication-transaction-object) with the current [state](#transaction-state) for the authentication transaction

> **Note:** Some [Factor types](/docs/reference/api/factors/#factor-type) require [activation](#activate-factor) to complete the enrollment process. The [authentication transaction](#transaction-state) transitions to `MFA_ENROLL_ACTIVATE` if a Factor requires activation.

#### Enroll Okta Security Question Factor

Enrolls a user with the Okta `question` Factor and [question profile](/docs/reference/api/factors/#question-profile)

> **Note:** The Security Question Factor doesn't require activation and is `ACTIVE` after enrollment.

##### Request example for enroll Okta Security Question Factor


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


##### Response example for enroll Okta Security Question Factor


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

Enrolls a user with the Okta `sms` Factor and an [SMS profile](/docs/reference/api/factors/#sms-profile). A text message with an OTP is sent to the device during enrollment and must be [activated](#activate-sms-factor) by following the `next` link relation to complete the enrollment process.

##### Request example for enroll Okta SMS Factor


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

##### Response example for enroll Okta SMS Factor


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

##### Resend SMS as part of enrollment

Use the `resend` link to send another OTP if the user doesn't receive the original activation SMS OTP.

> **Notes:** The current rate limit is one SMS challenge per device every 30 seconds.<br><br> Okta round-robins between SMS providers with every resend request to help ensure delivery of SMS OTP across different carriers.

###### Request example for resend SMS


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

Enrolls a user with the Okta `call` Factor and a [Call profile](/docs/reference/api/factors/#call-profile). A voice call with an OTP is sent to the device during enrollment and must be [activated](#activate-call-factor) by following the `next` link relation to complete the enrollment process.

##### Request example for enroll Okta Call Factor


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

##### Response example for enroll Okta Call Factor


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

##### Resend voice call as part of enrollment

Use the `resend` link to send another OTP if the user doesn't receive the original activation Voice Call OTP.

> **Notes:** The current rate limit is one voice call challenge per device every 30 seconds.<br><br> Okta round-robins between voice call providers with every resend request to help ensure delivery of voice call OTP across different carriers.

###### Request example for resend voice call


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

#### Enroll Okta Email Factor


Enrolls a user with the Okta `email` Factor using the user's primary email address.  An email message with an OTP is sent to the user during enrollment and must be [activated](#activate-call-factor) by following the `next` link relation to complete the enrollment process.

##### Request example for enroll Okta Email Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "factorType": "email",
  "provider": "OKTA",
}' "https://${yourOktaDomain}/api/v1/authn/factors"
```

##### Response example for enroll Okta Email Factor


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
      "id": "emfultss7bA0V6Z7C0g3",
      "factorType": "email",
      "provider": "OKTA",
      "vendorName": "OKTA",
      "profile": {
        "email": "d...y@example.com"
      }
    }
  },
  "_links": {
    "next": {
      "name": "activate",
      "href": "https://${yourOktaDomain}/api/v1/authn/factors/emfultss7bA0V6Z7C0g3/lifecycle/activate",
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
        "name": "email",
        "href": "https://${yourOktaDomain}/api/v1/authn/factors/emfultss7bA0V6Z7C0g3/lifecycle/resend",
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

##### Resend email as part of enrollment


Use the `resend` link to send another OTP if user doesn't receive the original activation email OTP.

###### Request example for resend email


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "factorType": "email",
  "provider": "OKTA",
}' "https://${yourOktaDomain}/api/v1/authn/factors/clf198rKSEWOSKRIVIFT/lifecycle/resend"
```

#### Enroll Okta Verify TOTP Factor

Enrolls a user with the Okta `token:software:totp` Factor.  The Factor must be [activated](#activate-totp-factor) after enrollment by following the `next` link relation to complete the enrollment process.

> **Note:** This API implements [the TOTP standard](https://tools.ietf.org/html/rfc6238), which is used by apps like Okta Verify and Google Authenticator.

##### Request example for enroll Okta Verify TOTP Factor


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

##### Response example for enroll Okta Verify TOTP Factor


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

Enrolls a user with the Okta verify `push` Factor. The Factor must be [activated on the device](#activate-push-factor) by scanning the QR code or visiting the activation link sent via email or sms.

Use the published activation links to embed the QR code or distribute an activation `email` or `sms`.

> **Note:** This API implements [the TOTP standard](https://tools.ietf.org/html/rfc6238), which is used by apps like Okta Verify and Google Authenticator.

##### Request example for enroll Okta Verify Push Factor


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

##### Response example for enroll Okta Verify Push Factor


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

Enrolls a user with the Google `token:software:totp` Factor. The Factor must be [activated](#activate-totp-factor) after enrollment by following the `next` link relation to complete the enrollment process.

##### Request example for enroll Google Authenticator factor


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

##### Response example for enroll Google Authenticator factor


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

#### Enroll RSA SecurID factor

Enrolls a user with an RSA SecurID factor and a [token profile](/docs/reference/api/factors/#token-profile). RSA tokens must be verified with the [current pin+passcode](/docs/reference/api/factors/#factor-verification-object) as part of the enrollment request.

##### Request example for enroll RSA SecurID Factor


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

##### Response example for enroll RSA SecurID Factor


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

Enrolls a user with a Symantec VIP Factor and a [token profile](/docs/reference/api/factors/#token-profile). Symantec tokens must be verified with the [current and next passcodes](/docs/reference/api/factors/#factor-verification-object) as part of the enrollment request.

##### Request example for enroll Symantec VIP Factor


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

##### Response example for enroll Symantec VIP Factor


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

Enrolls a user with a Yubico Factor (YubiKey). YubiKeys must be verified with the [current passcode](/docs/reference/api/factors/#factor-verification-object) as part of the enrollment request.

##### Request example for enroll YubiKey Factor


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

##### Response example for enroll YubiKey Factor


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

The enrollment process starts with an enrollment request to Okta, then continues with the Duo widget that is embedded in the page. The page needs to create an iframe with the name `duo_iframe` (described in the [Duo documentation](https://duo.com/docs/duoweb#3.-show-the-iframe)) to host the widget. The script address is received in the response object in \_embedded.factor.\_embedded.\_links.script object. The information to initialize the Duo object is taken from \_embedded.factor.\_embedded.activation object as it is shown in the [full example](#full-page-example-for-duo-enrollment). To maintain the link between Duo and Okta, the stateToken must be passed back when Duo calls the callback. This is done by populating the hidden element in the "duo_form" as it is described [here](https://duo.com/docs/duoweb/#passing-additional-post-arguments-with-the-signed-response). After Duo enrollment and verification is done, the Duo script makes a call back to Okta. To complete the authentication process, make a call using [the poll link](#activation-poll-request-example) to get session token and verify successful state.

##### Request example for enroll Duo Factor


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

##### Response example for enroll Duo Factor


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

#### Full page example for Duo enrollment

In this example we put all of the elements together in the html page.

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

##### Activation poll request example

Verifies successful authentication and obtains a session token

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "$(stateToken}"
}' "https://${yourOktaDomain}/api/v1/authn/factors/${factorId}/lifecycle/activate/poll"
```

##### Activation poll response example


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

Enrolls a user with a U2F Factor. The enrollment process starts with getting an `appId` and `nonce` from Okta and using those to get registration information from the U2F key using the U2F javascript API.

> **Note:** The `appId` property in Okta U2F enroll/verify API response is the [origin](https://www.ietf.org/rfc/rfc6454.txt) of the web page that triggers the API request (assuming that the origin has been configured to be trusted by Okta). According to the [FIDO spec](https://fidoalliance.org/specs/fido-u2f-v1.2-ps-20170411/fido-appid-and-facets-v1.2-ps-20170411.html#h2_the-appid-and-facetid-assertions), enrolling and verifying a U2F device with `appId`s in different DNS zones is not allowed. For example, if a user enrolled a U2F device via the Okta Sign-In Widget that is hosted at `https://login.company.com`, while the user can verify the U2F Factor from `https://login.company.com`, the user would not be able to verify it from Okta portal `https://company.okta.com`. The U2F device would return error code 4 - `DEVICE_INELIGIBLE`.

##### Enroll U2F request example


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

##### Enroll U2F response example


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

> **Note:** The WebAuthN Factor is available for those using the [Okta-hosted Custom Sign-In Page](/docs/guides/custom-hosted-signin/). If you are using a self-hosted, customized sign-in widget, you must first upgrade to widget version 3.4.0 and enable the [configuration option](https://github.com/okta/okta-signin-widget#configuration).

Enrolls a user with a WebAuthn Factor. The enrollment process starts with getting the WebAuthn credential creation options, which are used to help select an appropriate authenticator using the WebAuthn API.
This authenticator then generates an enrollment attestation that may be used to register the authenticator for the user.

##### Enroll WebAuthn request parameters

| Parameter    | Description                                                  | Param Type | DataType | Required |
| ------------ | ------------------------------------------------------------ | ---------- | -------- | -------- |
| stateToken   | [state token](#state-token) for the current transaction          | Body       | String   | TRUE     |


##### Enroll WebAuthn response parameters

In the [embedded resources](#embedded-resources) object, the `factor._embedded.activation` object contains properties used to guide the client in creating a new WebAuthn credential for use with Okta.

For more information about these credential creation options, see the [WebAuthn spec for PublicKeyCredentialCreationOptions](https://www.w3.org/TR/webauthn/#dictionary-makecredentialoptions).

> **Note:** Additionally, the activation object contains a `u2fParams` object with an `appid` property. This deprecated legacy property was used to support backwards compatibility with U2F and is no longer in use.

##### Enroll WebAuthn request example


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

###### Enroll WebAuthn response example


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

Enrollment via the Authentication API is currently not supported for Custom HOTP Factor. Please refer to the [Factors API documentation](/docs/reference/api/factors/#enroll-custom-hotp-factor) if you would like to enroll users for this type of Factor.

### Activate Factor

<ApiOperation method="post" url="/api/v1/authn/factors/${factorId}/lifecycle/activate" /> <SupportsCors />

The `sms`,`call`, and `token:software:totp` [Factor types](/docs/reference/api/factors/#factor-type) require activation to complete the enrollment process.

* [Activate TOTP Factor](#activate-totp-factor)
* [Activate SMS Factor](#activate-sms-factor)
* [Activate Call Factor](#activate-call-factor)
* [Activate Email Factor](#activate-email-factor)
* [Activate Push Factor](#activate-push-factor)
* [Activate U2F Factor](#activate-u2f-factor)
* [Activate WebAuthn Factor](#activate-webauthn-factor)

#### Activate TOTP Factor

Activates a `token:software:totp` Factor by verifying the OTP

> **Note:** This API implements [the TOTP standard](https://tools.ietf.org/html/rfc6238), which is used by apps like Okta Verify and Google Authenticator.

##### Request parameters for activate TOTP Factor


| Parameter    | Description                                          | Param Type | DataType | Required |
| ------------ | ---------------------------------------------------- | ---------- | -------- | -------- |
| factorId     | `id` of Factor returned from enrollment              | URL        | String   | TRUE     |
| passCode     | OTP generated by device                              | Body       | String   | TRUE     |
| stateToken   | [state token](#state-token)  for the current transaction | Body       | String   | TRUE     |

##### Response parameters for activate TOTP Factor

[Authentication Transaction object](#authentication-transaction-object) with the current [state](#transaction-state) for the authentication transaction

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

##### Activate TOTP request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "passCode": "123456"
}' "https://${yourOktaDomain}/api/v1/authn/factors/ostf1fmaMGJLMNGNLIVG/lifecycle/activate"
```

##### Activate TOTP response example


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

Activates an `sms` Factor by verifying the OTP. The request and response is identical to [activating a TOTP Factor](#activate-totp-factor)

##### Activate SMS Factor request parameters


| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| factorId     | `id` of Factor returned from enrollment             | URL        | String   | TRUE     |
| passCode     | OTP sent to mobile device                           | Body       | String   | TRUE     |
| stateToken   | [state token](#state-token) for the current transaction | Body       | String   | TRUE     |

##### Activate SMS Factor response parameters

[Authentication Transaction object](#authentication-transaction-object) with the current [state](#transaction-state) for the authentication transaction

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

##### Activate SMS Factor request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "passCode": "123456"
}' "https://${yourOktaDomain}/api/v1/authn/factors/sms1o51EADOTFXHHBXBP/lifecycle/activate"
```

##### Activate SMS Factor response example


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

Activates a `call` Factor by verifying the OTP. The request and response is identical to [activating a TOTP Factor](#activate-totp-factor)

##### Activate Call Factor request parameters


| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| factorId     | `id` of Factor returned from enrollment             | URL        | String   | TRUE     |
| passCode     | Passcode received via the voice call                | Body       | String   | TRUE     |
| stateToken   | [state token](#state-token) for the current transaction | Body       | String   | TRUE     |

##### Activate Call Factor response parameters

[Authentication Transaction object](#authentication-transaction-object) with the current [state](#transaction-state) for the authentication transaction

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

##### Activate Call Factor request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "passCode": "12345"
}' "https://${yourOktaDomain}/api/v1/authn/factors/clf1o51EADOTFXHHBXBP/lifecycle/activate"
```

##### Activate Call Factor response example


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

#### Activate Email Factor

Activates an `email` Factor by verifying the OTP.  The request and response are identical to [activating a TOTP Factor](#activate-totp-factor)

##### Activate Email Factor request parameters


| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| factorId     | `id` of factor returned from enrollment             | URL        | String   | TRUE     |
| passCode     | Passcode received via the email message              | Body       | String   | TRUE     |
| stateToken   | [state token](#state-token) for the current transaction | Body       | String   | TRUE     |


##### Activate Email Factor response parameters


[Authentication Transaction object](#authentication-transaction-object) with the current [state](#transaction-state) for the authentication transaction.

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

##### Activate Email Factor request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "passCode": "12345"
}' "https://${yourOktaDomain}/api/v1/authn/factors/emf1o51EADOTFXHHBXBP/lifecycle/activate"
```

##### Activate Email Factor response example


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

Activations have a short lifetime (minutes) and `TIMEOUT` if they are not completed before the `expireAt` timestamp. Use the published `activate` link to restart the activation process if the activation is expired.

##### Activate Push Factor request parameters


| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| factorId     | `id` of Factor returned from enrollment             | URL        | String   | TRUE     |
| stateToken   | [state token](#state-token) for the current transaction | Body       | String   | TRUE     |

##### Activate Push Factor response parameters

[Authentication Transaction object](#authentication-transaction-object) with the current [state](#transaction-state) for the authentication transaction

##### Activate Push Factor request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb"
}' "https://${yourOktaDomain}/api/v1/authn/factors/opfh52xcuft3J4uZc0g3/lifecycle/activate"
```

##### Activate Push Factor response example (waiting)


> **Note:** Follow the the published `next` link to keep polling for activation completion.

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

##### Activate Push Factor response example (success)


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

##### Activate Push Factor response example (timeout)

> **Note:** Follow the the published `activate` link to restart the activation process.

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

##### Poll for Push Factor activation

After the push notification is sent to the user's device, we need to know when the user completes the activation. This is done by polling the "poll" link.

###### Poll for Push request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb"
}' "https://${yourOktaDomain}/api/v1/authn/factors/opfh52xcuft3J4uZc0g3/lifecycle/activate/poll"
```

###### Poll for Push response example


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

##### Send activation links

Sends an activation email or SMS when the user is unable to scan the QR code provided as part of an Okta Verify transaction.
If for any reason the user can't scan the QR code, they can use the link provided in email or SMS to complete the transaction.

> **Note:** The user must click the link from the same device as the one where the Okta Verify app is installed.

###### Send activation links request example (email)


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb"
}' "https://${yourOktaDomain}/api/v1/authn/factors/opfh52xcuft3J4uZc0g3/lifecycle/activate/email"
```

###### Send activation links request example (SMS)


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

###### Send activation links response example


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

##### Get registration information from U2F token by calling the U2F JavaScript library method


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

Activate a `u2f` Factor by verifying the registration data and client data.

##### Activate U2F request parameters


| Parameter         | Description                                                | Param Type | DataType | Required |
| ----------------- | ---------------------------------------------------------- | ---------- | -------- | -------- |
| clientData        | base64-encoded client data from U2F javascript call        | Body       | String   | TRUE     |
| factorId          | `id` of Factor returned from enrollment                    | URL        | String   | TRUE     |
| registrationData  | base64-encoded registration data from U2F javascript call  | Body       | String   | TRUE     |
| stateToken        | [state token](#state-token) for the current transaction        | Body       | String   | TRUE     |

##### Activate U2F response parameters

[Authentication Transaction object](#authentication-transaction-object) with the current [state](#transaction-state) for the authentication transaction

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

##### Activate U2F request example


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

##### Activate U2F response example


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

##### Get registration information from WebAuthn assertion by calling the WebAuthn JavaScript library


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

Activate a `webauthn` Factor by verifying the attestation and client data.

##### Activate WebAuthn request parameters


| Parameter         | Description                                                     | Param Type | DataType | Required |
| ----------------- | --------------------------------------------------------------- | ---------- | -------- | -------- |
| attestation       | base64-encoded attestation from the WebAuthn javascript call        | Body       | String   | TRUE     |
| clientData        | base64-encoded client data from the WebAuthn javascript call        | Body       | String   | TRUE     |
| factorId          | `id` of Factor returned from enrollment                         | URL        | String   | TRUE     |
| stateToken        | [state token](#state-token) for the current transaction             | Body       | String   | TRUE     |

##### Activate WebAuthn response parameters

[Authentication Transaction object](#authentication-transaction-object) with the current [state](#transaction-state) for the authentication transaction

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

##### Activate WebAuthn request example


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

##### Activate WebAuthn response example


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

Verifies an enrolled Factor for an authentication transaction with the `MFA_REQUIRED` or `MFA_CHALLENGE` [state](#transaction-state)

* [Verify Security Question Factor](#verify-security-question-factor)
* [Verify SMS Factor](#verify-sms-factor)
* [Verify Call Factor](#verify-call-factor)
* [Verify TOTP Factor](#verify-totp-factor)
* [Verify Push Factor](#verify-push-factor)
* [Verify Duo Factor](#verify-duo-factor)
* [Verify U2F Factor](#verify-u2f-factor)
* [Verify WebAuthn Factor](#verify-webauthn-factor)

> **Note:** If the sign-on (or app sign-on) [policy](#remember-device-policy-object) allows remembering the device, then the end user should be prompted to choose whether the current device should be remembered. This helps reduce the number of times the user is prompted for MFA on the current device. The user's choice should be passed to Okta using the request parameter `rememberDevice` to the verify endpoint. The default value of `rememberDevice` parameter is `false`.

#### Verify Security Question Factor


<ApiOperation method="post" url="/api/v1/authn/factors/${factorId}/verify" /> <SupportsCors />

Verifies an answer to a `question` Factor

##### Request parameters for verify Security Question Factor

| Parameter      | Description                                         | Param Type | DataType | Required |
| -------------- | --------------------------------------------------- | ---------- | -------- | -------- |
| answer         | answer to security question                         | Body       | String   | TRUE     |
| factorId       | `id` of Factor                                      | URL        | String   | TRUE     |
| rememberDevice | user's decision to remember the device                  | URL        | Boolean  | FALSE    |
| stateToken     | [state token](#state-token) for the current transaction | Body       | String   | TRUE     |

##### Response parameters for verify Security Question Factor

[Authentication Transaction object](#authentication-transaction-object) with the current [state](#transaction-state) for the authentication transaction

If the `answer` is invalid you receive a `403 Forbidden` status code with the following error:

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

##### Request example for verify Security Question Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "answer": "mayonnaise"
}' "https://${yourOktaDomain}/api/v1/authn/factors/ufs1pe3ISGKGPYKXRBKK/verify"
```

##### Response example for verify Security Question Factor


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

##### Request parameters for verify SMS Factor


| Parameter      | Description                                         | Param Type | DataType | Required |
| -------------- | --------------------------------------------------- | ---------- | -------- | -------- |
| factorId       | `id` of Factor                                      | URL        | String   | TRUE     |
| passCode       | OTP sent to device                                  | Body       | String   | FALSE    |
| rememberDevice | user's decision to remember the device                  | URL        | Boolean  | FALSE    |
| stateToken     | [state token](#state-token) for the current transaction | Body       | String   | TRUE     |

> **Note:** If you omit `passCode` in the request, a new OTP is sent to the device, otherwise the request attempts to verify the `passCode`.

##### Response parameters for verify SMS Factor

[Authentication Transaction object](#authentication-transaction-object) with the current [state](#transaction-state) for the authentication transaction

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

##### Send SMS challenge (OTP)

Omit `passCode` in the request to send an OTP to the device.

###### Request example for send SMS challenge (OTP)


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb"
}' "https://${yourOktaDomain}/api/v1/authn/factors/sms193zUBEROPBNZKPPE/verify"
```

###### Response example for send SMS challenge (OTP)


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

##### Resend SMS challenge

Use the `resend` link to send another OTP if the user doesn't receive the original SMS OTP.

> **Notes:** The current rate limit is one SMS challenge per device every 30 seconds.<br><br> Okta round-robins between SMS providers with every resend request to help ensure delivery of SMS OTP across different carriers.

###### Request example for resend SMS


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb"
}' "https://${yourOktaDomain}/api/v1/authn/factors/sms193zUBEROPBNZKPPE/verify/resend"
```

##### Verify SMS challenge (OTP)

Specify `passCode` in the request to verify the Factor.

###### Request example for verify SMS challenge (OTP)


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "passCode": "657866"
}' "https://${yourOktaDomain}/api/v1/authn/factors/sms193zUBEROPBNZKPPE/verify"
```

###### Response example for verify SMS challenge (OTP)


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

##### Request parameters for verify Call Factor


| Parameter      | Description                                         | Param Type | DataType | Required |
| -------------- | --------------------------------------------------- | ---------- | -------- | -------- |
| factorId       | `id` of Factor                                      | URL        | String   | TRUE     |
| passCode       | OTP sent to device                                  | Body       | String   | FALSE    |
| rememberDevice | user's decision to remember the device                  | URL        | Boolean  | FALSE    |
| stateToken     | [state token](#state-token) for the current transaction | Body       | String   | TRUE     |

> **Note:** If you omit `passCode` in the request, a new OTP is sent to the device, otherwise the request attempts to verify the `passCode`.

##### Response parameters for verify Call Factor

[Authentication Transaction object](#authentication-transaction-object) with the current [state](#transaction-state) for the authentication transaction

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

##### Send Voice Call challenge (OTP)

Omit `passCode` in the request to send an OTP to the device.

###### Request example for send Voice Call challenge (OTP)


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb"
}' "https://${yourOktaDomain}/api/v1/authn/factors/clf193zUBEROPBNZKPPE/verify"
```

###### Response example for send Voice Call challenge (OTP)


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

##### Resend voice call challenge

Use the `resend` link to send another OTP if the user doesn't receive the original Voice Call OTP.

> **Notes:** The current rate limit is one voice call challenge per device every 30 seconds.<br><br> Okta round-robins between voice call providers with every resend request to help ensure delivery of voice call OTP across different carriers.

###### Request example for resend voice call


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb"
}' "https://${yourOktaDomain}/api/v1/authn/factors/clf193zUBEROPBNZKPPE/verify/resend"
```

##### Verify Call challenge (OTP)

Specify `passCode` in the request to verify the Factor.

###### Request example for verify Call challenge


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "passCode": "65786"
}' "https://${yourOktaDomain}/api/v1/authn/factors/clf193zUBEROPBNZKPPE/verify"
```

###### Response example for verify Call challenge


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

Verifies an OTP for a `token:software:totp` or `token:hotp` Factor

> **Note:** This API implements [the TOTP standard](https://tools.ietf.org/html/rfc6238), which is used by apps like Okta Verify and Google Authenticator.

##### Request parameters for verify TOTP Factor


| Parameter      | Description                                         | Param Type | DataType | Required |
| -------------- | --------------------------------------------------- | ---------- | -------- | -------- |
| factorId       | `id` of Factor                                      | URL        | String   | TRUE     |
| passCode       | OTP sent to device                                  | Body       | String   | FALSE    |
| rememberDevice | user's decision to remember the device                  | URL        | Boolean  | FALSE    |
| stateToken     | [state token](#state-token) for the current transaction | Body       | String   | TRUE     |

##### Response parameters for verify TOTP Factor

[Authentication Transaction object](#authentication-transaction-object) with the current [state](#transaction-state) for the authentication transaction

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

###### Request example for verify TOTP Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb",
  "passCode": "657866"
}' "https://${yourOktaDomain}/api/v1/authn/factors/ostfm3hPNYSOIOIVTQWY/verify"
```

###### Response example for verify TOTP Factor


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

Sends an asynchronous push notification (challenge) to the device for the user to approve or reject. The `factorResult` for the transaction has a result of `WAITING`, `SUCCESS`, `REJECTED`, or `TIMEOUT`.

##### Request parameters for verify Push Factor


| Parameter      | Description                                          | Param Type | DataType | Required |
| -------------- | ---------------------------------------------------  | ---------- | -------- | -------- |
| autoPush       | user's decision to send a push to the device automatically | URL        | Boolean  | FALSE    |
| factorId       | `id` of Factor                                       | URL        | String   | TRUE     |
| rememberDevice | user's decision to remember the device                   | URL        | Boolean  | FALSE    |
| stateToken     | [state token](#state-token) for the current transaction  | Body       | String   | TRUE     |

**Okta Verify Push details pertaining to auto-push**

* You don't need to pass the `autoPush` flag to Okta unless you have a custom sign-in flow that doesn't use the Okta Sign-In Widget, but want Okta to keep track of this preference.  The custom sign-in flow must still handle the logic to actually send the Auto-Push, since this param only deals with the Auto-Push setting.
* If you pass the `autoPush` query param when verifying an Okta Verify Push Factor, Okta saves this value as the user's preference to have the push notification sent automatically if the verification is successful (the user taps **Approve** on their phone).
* If there is already a saved Auto-Push preference, the successful verify call overrides the current preference if it is different from the value of `autoPush`.
* This saved Auto-Push preference is always returned in the `/api/v1/authn/` response's `autoPushEnabled` field if the user is enrolled for the Okta Verify Push Factor [example here](#response-example-for-factor-challenge-for-step-up-authentication-with-okta-session).  If the user's Auto-Push preference hasn't explicitly been set before, `autoPushEnabled` has a value of false.
* The Auto-Push preference is stored in a cookie value and users that clear their cookies remove that preference.
* Please note, the `autoPush` flag has no effect when trying to verify a Factor other than Okta Verify Push (factorId prefix = "opf").


##### Request example for verify Push Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb"
}' "https://${yourOktaDomain}/api/v1/authn/factors/ufs1pe3ISGKGPYKXRBKK/verify"
```

##### Response example (waiting)

> **Note:** Keep polling authentication transactions with `WAITING` result until the challenge completes or expires.

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

##### Response example (waiting for 3-number verification challenge response)

> **Note:** If Okta detects an unusual sign-in attempt, the end user will receive a 3-number verification challenge and the correct answer of the challenge will be provided in the polling response. This is similar to the standard `waiting` response but with the addition of a `correctAnswer` property in the `challenge` object. The `correctAnswer` property will only be included in the response if the end user is on the 3-number verification challenge view in the Okta Verify mobile app. Look at [Sign in to your org with Okta Verify](https://help.okta.com/en/prod/okta_help_CSH.htm#csh-ov-signin) for more details about this challenge flow.

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
      },
      "_embedded": {
        "challenge": {
          "correctAnswer": 92
        }
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

##### Response example (approved)


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

##### Response example (rejected)


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

##### Response example (timeout)


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

##### Resend push notification

Use the `resend` link to send another push notification if the user didn't receive the previous one due to timeout or error.

###### Request example for resend push notification


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "007ucIX7PATyn94hsHfOLVaXAmOBkKHWnOOLG43bsb"
}' "https://${yourOktaDomain}/api/v1/authn/factors/opfh52xcuft3J4uZc0g3/verify/resend"
```

#### Verify Duo Factor

Verification of the Duo Factor is implemented as an integration with Duo widget. The process is very similar to the [enrollment](#full-page-example-for-duo-enrollment) where the widget is embedded in an iframe - "duo_iframe". Verification starts with request to the Okta API, then continues with a Duo widget that handles the actual verification. We need to pass the state token as hidden object in "duo_form". The authentication completes with call to [poll link](#verification-poll-request-example) to verify the state and obtain session token.

##### Request example for verify Duo Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "${stateToken}"
}' "https://${yourOktaDomain}/api/v1/authn/factors/${factorId}/verify"
```

##### Response example for verify Duo Factor


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

##### Verification poll request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "${stateToken}"
}' "https://${yourOktaDomain}/api/v1/authn/factors/${factorId}/verify"
```

##### Verification poll response example


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

#### Verify U2F fFactor


<ApiOperation method="post" url="/api/v1/authn/factors/${factorId}/verify" /> <SupportsCors />

> **Note:** The `appId` property in Okta U2F enroll/verify API response is the [origin](https://www.ietf.org/rfc/rfc6454.txt) of
the web page that triggers the API request (assuming the origin has been configured to be trusted by Okta). According to
[FIDO spec](https://fidoalliance.org/specs/fido-u2f-v1.2-ps-20170411/fido-appid-and-facets-v1.2-ps-20170411.html#h2_the-appid-and-facetid-assertions), enroll and verify U2F device with `appId`s in different DNS zone is not allowed. For example, if a user enrolled a U2F device via Okta Sign-in widget that is hosted at `https://login.company.com`, while the user can verify the U2F Factor from `https://login.company.com`, the user would not be able to verify it from Okta portal `https://company.okta.com`, U2F device would return error code 4 - `DEVICE_INELIGIBLE`.

##### Start verification to get challenge nonce

Verification of the U2F Factor starts with getting the challenge nonce and U2F token details and then using the client-side
JavaScript API to get the signed assertion from the U2F token.

##### Request example for verify U2F Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "${stateToken}"
}' "https://${yourOktaDomain}/api/v1/authn/factors/${factorId}/verify"
```

##### Response example for verify U2F Factor


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

##### Get the signed assertion from the U2F token


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

##### Request parameters for verify U2F Factor


| Parameter      | Description                                         | Param Type | DataType | Required |
| -------------- | --------------------------------------------------- | ---------- | -------- | -------- |
| clientData     | base64-encoded client data from the U2F token       | Body       | String   | TRUE     |
| factorId       | `id` of Factor                                      | URL        | String   | TRUE     |
| rememberDevice | user's decision to remember the device              | URL        | Boolean  | FALSE    |
| signatureData  | base64-encoded signature data from the U2F token    | Body       | String   | TRUE     |
| stateToken     | [state token](#state-token) for the current transaction | Body       | String   | TRUE     |

##### Request example for signed assertion


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

##### Response of U2F verification example


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

Verifies a user with a WebAuthn Factor. The verification process starts with getting the WebAuthn credential request options, which are used to help select an appropriate authenticator using the WebAuthn API.
This authenticator then generates an assertion that may be used to verify the user.

> **Note:** a `factorId` or `factorType` may be specified for WebAuthn's verify endpoint, as the WebAuthn Factor type supports multiple Factor instances. When a `factorId` is used, the verification procedure is no different from any other factors, with verification for a specific Factor instance. When "webauthn" (the `factorType` name for WebAuthn) is used, verification would be acceptable with any WebAuthn Factor instance enrolled for the user.

##### Start verification to get challenge nonce

Verification of the WebAuthn Factor starts with getting the WebAuthn credential request details (including the challenge nonce) then using the client-side JavaScript API to get the signed assertion from the WebAuthn authenticator.

For more information about these credential request options, see the [WebAuthn spec for PublicKeyCredentialRequestOptions](https://www.w3.org/TR/webauthn/#dictionary-makecredentialoptions).

##### Request example for verify WebAuthn Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "${stateToken}"
}' "https://${yourOktaDomain}/api/v1/authn/factors/${factorIdOrFactorType}/verify"
```

##### Response example for verify WebAuthn Factor by `factorId`


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

##### Response example for verify WebAuthn Factor by `factorType`


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

##### Get the signed assertion from the WebAuthn authenticator


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

##### Request parameters for verify WebAuthn Factor


| Parameter      | Description                                         | Param Type | DataType | Required |
| -------------- | --------------------------------------------------- | ---------- | -------- | -------- |
| authenticatorData | base64-encoded authenticator data from the WebAuthn authenticator    | Body       | String   | TRUE     |
| clientData     | base64-encoded client data from the WebAuthn authenticator       | Body       | String   | TRUE     |
| factorId       | `id` of Factor                                      | URL        | String   | TRUE (`factorId` OR `factorType` required) |
| factorType     | `factorType` of Factor; for WebAuthn, it is `webauthn` | URL        | String   | TRUE (`factorId` OR `factorType` required) |
| rememberDevice | user's decision to remember the device                  | URL        | Boolean  | FALSE    |
| signatureData  | base64-encoded signature data from the WebAuthn authenticator    | Body       | String   | TRUE     |
| stateToken     | [state token](#state-token) for the current transaction | Body       | String   | TRUE     |

##### Request example for signed assertion


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

##### Response of WebAuthn verification example


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

## Recovery operations

### Forgot password


<ApiOperation method="post" url="/api/v1/authn/recovery/password" />

Starts a new password recovery transaction for a given user and issues a [recovery token](#recovery-token) that can be used to reset a user's password

* [Forgot Password with Email Factor](#forgot-password-with-email-factor)
* [Forgot Password with SMS Factor](#forgot-password-with-sms-factor)
* [Forgot Password with Call Factor](#forgot-password-with-call-factor)
* [Forgot Password with Trusted Application](#forgot-password-with-trusted-application)

> **Note:** Self-service password reset (forgot password) must be permitted via the user's assigned password policy to use this operation.

##### Request parameters for forgot password


| Parameter   | Description                                                                                                       | Param Type | DataType                          | Required | MaxLength |
| ----------- | ----------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------- | -------- | --------- |
| factorType  | Recovery Factor to use for primary authentication                                                                 | Body       | `EMAIL` or `SMS` or `CALL`        | FALSE    |           |
| username    | User's non-qualified short-name (for example: dade.murphy) or unique fully-qualified sign-in name (for example: dade.murphy@example.com)      | Body       | String  | TRUE     |           |

> **Note:** A valid `factorType` is required for requests without an API token with administrator privileges. For more information, see [Forgot Password with Trusted Application](#forgot-password-with-trusted-application).

The response is different, depending on whether the request is for a public application or a trusted application.

##### Response parameters for public application for forgot password

The [Recovery Transaction object](#recovery-transaction-object) with `RECOVERY_CHALLENGE` status for the new recovery transaction

You will always receive a [Recovery Transaction](#recovery-transaction-object) response even if the requested `username` is not a valid identifier to prevent information disclosure.

##### Response parameters for trusted application for forgot password

The [Recovery Transaction object](#recovery-transaction-object) with an issued `recoveryToken` that can be distributed to the end user

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

#### Forgot password with Email Factor

Starts a new password recovery transaction for the email Factor:

* You must specify a user identifier (`username`) but no password in the request.
* If the request is successful, Okta sends a recovery email asynchronously to the user's primary and secondary email address with a [recovery token](#recovery-token) so the user can complete the transaction.

Primary authentication of a user's recovery credential (for example: `EMAIL` or `SMS`) hasn't completed when this request is sent. The user is pending validation.

Okta provides security in the following ways:

* Since the recovery email is distributed out-of-band and may be viewed on a different user agent or device, this operation does not return a [state token](#state-token) and does not have a `next` link.
* Okta doesn't publish additional metadata about the user until primary authentication has successfully completed.
See the Response Example in this section for details.

##### Request example for forgot password with Email Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "username": "dade.murphy@example.com",
  "factorType": "EMAIL",
}' "https://${yourOktaDomain}/api/v1/authn/recovery/password"
```

##### Response example for forgot password with Email Factor


```json
{
  "status": "RECOVERY_CHALLENGE",
  "factorResult": "WAITING",
  "factorType": "EMAIL",
  "recoveryType": "PASSWORD"
}
```

#### Forgot password with SMS Factor

Starts a new password recovery transaction with a user identifier (`username`) and asynchronously sends a SMS OTP (challenge) to the user's mobile phone. This operation will transition the recovery transaction to the `RECOVERY_CHALLENGE` state and wait for the user to [verify the OTP](#verify-sms-recovery-factor).

> **Note:** Primary authentication of a user's recovery credential (for example: email or SMS) hasn't yet completed. Okta doesn't publish additional metadata about the user until primary authentication has successfully completed.

> **Note:** SMS recovery Factor must be enabled via the user's assigned password policy to use this operation.

##### Request example for forgot password with SMS Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "username": "dade.murphy@example.com",
  "factorType": "SMS",
}' "https://${yourOktaDomain}/api/v1/authn/recovery/password"
```

##### Response example for forgot password with SMS Factor


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

#### Forgot password with Call Factor

Starts a new password recovery transaction with a user identifier (`username`) and asynchronously sends a Voice Call with OTP (challenge) to the user's phone. This operation transitions the recovery transaction to the `RECOVERY_CHALLENGE` state and wait for user to [verify the OTP](#verify-call-recovery-factor).

**Notes:**

* Primary authentication of a user's recovery credential (for example: email or SMS or Voice Call) hasn't yet completed.
* Okta won't publish additional metadata about the user until primary authentication has successfully completed.
* Voice Call recovery Factor must be enabled via the user's assigned password policy to use this operation.

##### Request example for forgot password with Call Factor

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "username": "dade.murphy@example.com",
  "factorType": "call",
}' "https://${yourOktaDomain}/api/v1/authn/recovery/password"
```

##### Response example for forgot password with Call Factor


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

#### Forgot password with trusted application

Allows a [trusted application](#trusted-application) such as an external portal to implement its own primary authentication process and directly obtain a [recovery token](#recovery-token) for a user given just the user's identifier

> **Note:** Directly obtaining a `recoveryToken` is a highly privileged operation that requires an administrator API token and should be restricted to trusted web applications. Anyone that obtains a `recoveryToken` for a user and knows the answer to a user's recovery question can reset their password or unlock their account.

> **Note:** The **public IP address** of your [trusted application](#trusted-application) must be [whitelisted as a gateway IP address](/docs/reference/api-overview/#ip-address) to forward the user agent's original IP address with the `X-Forwarded-For` HTTP header.

##### Request example for forgot password with trusted application


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

##### Response example for forgot password with tusted application


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

### Unlock account


<ApiOperation method="post" url="/api/v1/authn/recovery/unlock" />

Starts a new unlock recovery transaction for a given user and issues a [recovery token](#recovery-token) that can be used to unlock a user's account

- [Unlock Account with Email Factor](#unlock-account-with-email-factor)
- [Unlock Account with SMS Factor](#unlock-account-with-sms-factor)
- [Unlock Account with Trusted Application](#unlock-account-with-trusted-application)

> **Note:** Self-service unlock must be permitted via the user's assigned password policy to use this operation.

##### Request parameters for unlock account


| Parameter   | Description                                                                                                      | Param Type | DataType                          | Required | Max Length |
| ----------- | ---------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------- | -------- | ---------- |
| factorType  | Recovery Factor to use for primary authentication                                                                | Body       | `EMAIL` or `SMS`                  | FALSE    |            |
| username    | User's non-qualified short-name (for example: dade.murphy) or unique fully-qualified sign-in name (for example: dade.murphy@example.com)          | Body       | String |TRUE     |            |

> **Note:** A valid `factorType` is required for requests without an API token with administrator privileges. (See [Unlock Account with Trusted Application](#unlock-account-with-trusted-application)).

##### Response parameter public application for unlock account

[Recovery Transaction object](#recovery-transaction-object) with `RECOVERY_CHALLENGE` status for the new recovery transaction

You always receive a [Recovery Transaction](#recovery-transaction-object) response, even if the requested `username` isn't a valid identifier to prevent information disclosure.

##### Response parameter trusted application for unlock account

[Recovery Transaction object](#recovery-transaction-object) with an issued `recoveryToken` that can be distributed to the end user

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

#### Unlock account with Email Factor

Starts a new unlock recovery transaction with a user identifier (`username`) and asynchronously sends a recovery email to the user's primary and secondary email address with a [recovery token](#recovery-token) that can be used to complete the transaction

Since the recovery email is distributed out-of-band and may be viewed on a different user agent or device, this operation does not return a [state token](#state-token) and does not have a `next` link.

**Notes:**

* Primary authentication of a user's recovery credential (e.g `EMAIL` or `SMS`) hasn't yet completed.
* Okta will not publish additional metadata about the user until primary authentication has successfully completed.

##### Request example for Email Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "username": "dade.murphy@example.com",
  "factorType": "EMAIL",
}' "https://${yourOktaDomain}/api/v1/authn/recovery/unlock"
```

##### Response example for Email Factor


```json
{
  "status": "RECOVERY_CHALLENGE",
  "factorResult": "WAITING",
  "factorType": "EMAIL",
  "recoveryType": "UNLOCK"
}
```


#### Unlock account with SMS Factor

Starts a new unlock recovery transaction with a user identifier (`username`) and asynchronously sends an SMS OTP (challenge) to the user's mobile phone. This operation transitions the recovery transaction to the `RECOVERY_CHALLENGE` state and waits for the user to [verify the OTP](#verify-sms-recovery-factor).

**Notes:**

* Primary authentication of a user's recovery credential (e.g email or SMS) hasn't yet completed.
* Okta won't publish additional metadata about the user until primary authentication has successfully completed.
* SMS recovery Factor must be enabled via the user's assigned password policy to use this operation.

##### Request example for unlock account with SMS Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "username": "dade.murphy@example.com",
  "factorType": "SMS",
}' "https://${yourOktaDomain}/api/v1/authn/recovery/unlock"
```

##### Response example for unlock account with SMS Factor


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

#### Unlock account with trusted application

Allows a [trusted application](#trusted-application) such as an external portal to implement its own primary authentication process and directly obtain a [recovery token](#recovery-token) for a user given just the user's identifier

**Notes:**

* Directly obtaining a `recoveryToken` is a highly privileged operation that requires an administrator API token and should be restricted to [trusted web applications](#trusted-application). Anyone that obtains a `recoveryToken` for a user and knows the answer to a user's recovery question can reset their password or unlock their account.

* The **public IP address** of your [trusted application](#trusted-application) must be [whitelisted as a gateway IP address](/docs/reference/api-overview/#ip-address) to forward the user agent's original IP address with the `X-Forwarded-For` HTTP header.

##### Request example for unlock account with SMS Factor (trusted application)


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

##### Response example for unlock account with SMS Factor (trusted application)


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

### Verify recovery Factor

#### Verify SMS recovery Factor


<ApiOperation method="post" url="/api/v1/authn/recovery/factors/sms/verify" />

Verifies a SMS OTP (`passCode`) sent to the user's mobile phone for primary authentication for a recovery transaction with `RECOVERY_CHALLENGE` status

##### Request parameters for verify SMS recovery Factor


| Parameter    | Description                                                  | Param Type | DataType | Required |
| ------------ | ------------------------------------------------------------ | ---------- | -------- | -------- |
| passCode     | OTP sent to device                                           | Body       | String   | TRUE     |
| stateToken   | [state token](#state-token) for the current recovery transaction | Body       | String   | TRUE     |

##### Response parameters for verify SMS recovery Factor

[Recovery Transaction object](#recovery-transaction-object) with the current [state](#transaction-state) for the recovery transaction

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

##### Request example for verify SMS recovery Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "00xdqXOE5qDXX8-PBR1bYv8AESqIEinDy3yul01tyh",
  "passCode": "657866"
}' "https://${yourOktaDomain}/api/v1/authn/factors/sms/verify"
```

##### Response example for verify SMS recovery Factor


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

###### Resend SMS recovery challenge


<ApiOperation method="post" url="/api/v1/authn/recovery/factors/sms/resend" />

Resends a SMS OTP (`passCode`) to the user's mobile phone

#### Request parameters for resend SMS recovery challenge


| Parameter    | Description                                                  | Param Type | DataType | Required |
| ------------ | ------------------------------------------------------------ | ---------- | -------- | -------- |
| stateToken   | [state token](#state-token) for the current recovery transaction | Body       | String   | TRUE     |

#### Response parameters for resend SMS recovery challenge

[Recovery Transaction object](#recovery-transaction-object) with the current [state](#transaction-state) for the recovery transaction

#### Request example for resend SMS recovery challenge


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "00xdqXOE5qDXX8-PBR1bYv8AESqIEinDy3yul01tyh"
}' "https://${yourOktaDomain}/api/v1/authn/recovery/factors/sms/resend"
```

#### Response example for resend SMS recovery challenge


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

> **Note:** The `factorType` and `recoveryType` properties vary depending on recovery transaction.

#### Verify Call recovery Factor

<ApiOperation method="post" url="/api/v1/authn/recovery/factors/call/verify" />

Verifies a Voice Call OTP (`passCode`) sent to the user's device for primary authentication for a recovery transaction with `RECOVERY_CHALLENGE` status

##### Request parameters for verify Call recovery Factor


| Parameter    | Description                                                  | Param Type | DataType | Required |
| ------------ | ------------------------------------------------------------ | ---------- | -------- | -------- |
| passCode     | Passcode received via the voice call                         | Body       | String   | TRUE     |
| stateToken   | [state token](#state-token) for the current recovery transaction | Body       | String   | TRUE     |

##### Response parameters for verify Call recovery Factor

[Recovery Transaction object](#recovery-transaction-object) with the current [state](#transaction-state) for the recovery transaction

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

##### Request example for verify Call recovery Factor


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "00xdqXOE5qDXX8-PBR1bYv8AESqIEinDy3yul01tyh",
  "passCode": "65786"
}' "https://${yourOktaDomain}/api/v1/authn/factors/CALL/verify"
```

##### Response example for verify Call recovery Factor


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

###### Resend Call recovery challenge


<ApiOperation method="post" url="/api/v1/authn/recovery/factors/call/resend" />

Resends a Voice Call with OTP (`passCode`) to the user's phone

#### Request parameters for resend Call recovery challenge


| Parameter    | Description                                                  | Param Type | DataType | Required |
| ------------ | ------------------------------------------------------------ | ---------- | -------- | -------- |
| stateToken   | [state token](#state-token) for the current recovery transaction | Body       | String   | TRUE     |

#### Response parameters for resend Call recovery challenge

[Recovery Transaction object](#recovery-transaction-object) with the current [state](#transaction-state) for the recovery transaction

#### Request example for resend Call recovery challenge


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "00xdqXOE5qDXX8-PBR1bYv8AESqIEinDy3yul01tyh"
}' "https://${yourOktaDomain}/api/v1/authn/recovery/factors/CALL/resend"
```

#### Response example for resend Call recovery challenge


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

### Verify recovery token

<ApiOperation method="post" url="/api/v1/authn/recovery/token" />

Validates a [recovery token](#recovery-token) that was distributed to the end user to continue the recovery transaction

##### Request parameters for verify recovery token


| Parameter     | Description                                                                                                    | Param Type | DataType | Required |
| ------------- | ----------------------------------------------------------------------------------------------------------     | ---------- | -------- | -------- |
| recoveryToken | [Recovery token](#recovery-token) that was distributed to the end user via out-of-band mechanism such as email | Body       | String   | TRUE     |

##### Response parameters for verify recovery token

[Recovery Transaction object](#recovery-transaction-object) with a `RECOVERY` status and an issued `stateToken` that must be used to complete the recovery transaction

You receive a `401 Unauthorized` status code if you attempt to use an expired or invalid [recovery token](#recovery-token).

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

##### Request example for verify recovery token


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "recoveryToken": "00xdqXOE5qDZX8-PBR1bYv8AESqIFinDy3yul01tyh"
}' "https://${yourOktaDomain}/api/v1/authn/recovery/token"
```

##### Response example for verify recovery token


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

### Answer recovery question


<ApiOperation method="post" url="/api/v1/authn/recovery/answer" />

Answers the user's recovery question to ensure only the end user redeemed the [recovery token](#recovery-token) for recovery transaction with a `RECOVERY` [status](#transaction-state)

##### Request parameters for answer recovery question


| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| answer       | answer to user's recovery question                  | Body       | String   | TRUE     |
| stateToken   | [state token](#state-token) for the current transaction | Body       | String   | TRUE     |

##### Response parameters for answer recovery question

[Recovery Transaction object](#recovery-transaction-object) with the current [state](#transaction-state) for the recovery transaction

You receive a `403 Forbidden` status code if the `answer` to the user's [recovery question](#recovery-question-object) is invalid.

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

##### Request example for answer recovery question


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

##### Response example for answer recovery question


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

### Reset password


<ApiOperation method="post" url="/api/v1/authn/credentials/reset_password" />

Resets a user's password to complete a recovery transaction with a `PASSWORD_RESET` [state](#transaction-state)

##### Request parameters for reset password


| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| newPassword  | User's new password                                 | Body       | String   | TRUE     |
| stateToken   | [state token](#state-token) for the current transaction | Body       | String   | TRUE     |

##### Response parameters for reset password

[Recovery Transaction object](#recovery-transaction-object) with the current [state](#transaction-state) for the recovery transaction

You receive a `403 Forbidden` status code if the `answer` to the user's [recovery question](#recovery-question-object) is invalid.

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

##### Request example for reset password


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

##### Response example for reset password


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

## State management operations

### Get transaction state

<ApiOperation method="post" url="/api/v1/authn" />

Retrieves the current [transaction state](#transaction-state) for a [state token](#state-token)

##### Request parameters for get transaction state


| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| stateToken   | [state token](#state-token) for a transaction       | Body       | String   | TRUE     |

##### Response parameters for get transaction state

[Transaction object](#transaction-object) with the current [state](#transaction-state) for the authentication or recovery transaction

##### Request example for get transaction state


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "00lMJySRYNz3u_rKQrsLvLrzxiARgivP8FB_1gpmVb"
}' "https://${yourOktaDomain}/api/v1/authn"
```

##### Response example for get transaction state


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

### Previous transaction state


<ApiOperation method="post" url="/api/v1/authn/previous" />

Moves the current [transaction state](#transaction-state) back to the previous state. For example, when changing state from the start of primary authentication to MFA_ENROLL > ENROLL_ACTIVATE > OTP, the user's phone might stop working. Since the user can't see the QR code, the transaction must return to MFA_ENROLL.

##### Request parameters for previous transaction state


| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| stateToken   | [state token](#state-token) for a transaction       | Body       | String   | TRUE     |

##### Response parameters for previous transaction state

[Transaction object](#transaction-object) with the current [state](#transaction-state) for the authentication or recovery transaction

##### Request example for previous transaction state


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "00lMJySRYNz3u_rKQrsLvLrzxiARgivP8FB_1gpmVb"
}' "https://${yourOktaDomain}/api/v1/authn/previous"
```

##### Response example for previous transaction state


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

### Skip transaction state


<ApiOperation method="post" url="/api/v1/authn/skip" />

Sends a skip link to skip the current [transaction state](#transaction-state) and advance to the next state

If the response returns a skip link, then you can advance to the next state without completing the current state (such as changing the password). For example, after being warned that a password will soon expire, the user can skip the change password prompt
by clicking a skip link.

Another example: a user has enrolled in multiple factors. After enrolling in one the user receives a skip link
to skip the other factors.

> **Note:** This operation is only available for `MFA_ENROLL` or `PASSWORD_WARN` states when published as a link.

##### Request parameters for skip transaction state


| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| stateToken   | [state token](#state-token) for a transaction       | Body       | String   | TRUE     |

##### Response parameters for skip transaction state

[Transaction object](#transaction-object) with the current [state](#transaction-state) for the authentication or recovery transaction

##### Request example for skip transaction state


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "00lMJySRYNz3u_rKQrsLvLrzxiARgivP8FB_1gpmVb"
}' "https://${yourOktaDomain}/api/v1/authn/skip"
```

##### Response example for skip transaction state


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

### Cancel transaction


<ApiOperation method="post" url="/api/v1/authn/cancel" />

Cancels the current transaction and revokes the [state token](#state-token)

##### Request parameters for cancel transaction


| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| stateToken   | [state token](#state-token) for a transaction       | Body       | String   | TRUE     |

##### Request example for cancel transaction


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "stateToken": "00lMJySRYNz3u_rKQrsLvLrzxiARgivP8FB_1gpmVb"
}' "https://${yourOktaDomain}/api/v1/authn/cancel"
```

## Transaction object

The Authentication API is a *stateful* API that implements a finite state machine with [defined states](#transaction-state) and transitions. Each initial authentication or recovery request is issued a unique [state token](#state-token) that must be passed with each subsequent request until the transaction is complete or canceled.

The Authentication API leverages the [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) format to publish `next` and `prev` links for the current transaction state which should be used to transition the state machine.

### Authentication transaction object

| Property                          | Description                                                                                     | DataType                                                       | Nullable | Readonly | MaxLength |
|-----------------------------------|-------------------------------------------------------------------------------------------------|----------------------------------------------------------------|----------|----------|-----------|
| _embedded                         | [embedded resources](#embedded-resources) for the current `status`                              | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | TRUE     |           |
| _links                            | [link relations](#links-object) for the current `status`                                        | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | TRUE     |           |
| expiresAt                         | lifetime of the `stateToken` or `sessionToken` (See [Tokens](#tokens))                          | Date                                                           | TRUE     | TRUE     |           |
| factorResult                      | optional status of last verification attempt for a given Factor                                 | [Factor Result](#factor-result)                                | TRUE     | TRUE     |           |
| sessionToken                      | ephemeral [one-time token](#session-token) used to bootstrap an Okta session                    | String                                                         | TRUE     | TRUE     |           |
| stateToken                        | ephemeral [token](#state-token) that encodes the current state of an authentication transaction | String                                                         | TRUE     | TRUE     |           |
| status                            | current [state](#transaction-state) of the authentication transaction                           | [Transaction State](#transaction-state)                        | FALSE    | TRUE     |           |
| type <ApiLifecycle access="ea" /> | type of authentication transaction. Currently available during step-up authentication           | [Authentication Type](#authentication-type)                    | TRUE     | TRUE     |           |

### Recovery transaction object

| Property      | Description                                                                                            | DataType                                                       | Nullable | Readonly | MaxLength |
| ------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- | -------- | -------- | --------- |
| _embedded     | [embedded resources](#embedded-resources) for the current `status`                                     | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | TRUE     |           |
| _links        | [link relations](#links-object) for the current `status`                                               | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | TRUE     |           |
| expiresAt     | lifetime of the `stateToken` or `recoveryToken` (See [Tokens](#tokens))                                | Date                                                           | TRUE     | TRUE     |           |
| factorResult  | optional status of last verification attempt for the `factorType`                                      | [Factor Result](#factor-result)                                | TRUE     | TRUE     |           |
| factorType    | type of selected Factor for the recovery transaction                                                   | `EMAIL` or `SMS`                                               | FALSE    | TRUE     |           |
| recoveryToken | ephemeral [one-time token](#recovery-token) for recovery transaction to be distributed to the end user | String                                                         | TRUE     | TRUE     |           |
| recoveryType  | type of recovery operation                                                                             | `PASSWORD` or `UNLOCK`                                         | FALSE    | TRUE     |           |
| stateToken    | ephemeral [token](#state-token) that encodes the current state of a recovery transaction               | String                                                         | TRUE     | TRUE     |           |
| status        | current [state](#transaction-state) of the recovery transaction                                        | [Transaction State](#transaction-state)                        | FALSE    | TRUE     |           |


### Transaction state

![Transaction State Diagram](/img/auth-state-model1.png "The diagram displays the authentication and recovery transaction states.")

An authentication or recovery transaction has one of the following states:

| Value                                          | Description                                                                                               | Next Action                                                                                                         |
| ---------------------                          | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `LOCKED_OUT`                                   | The user account is locked; self-service unlock or administrator unlock is required.                      | POST to the `unlock` link relation to perform a [self-service unlock](#unlock-account).                             |
| `MFA_CHALLENGE`                                | The user must verify the Factor-specific challenge.                                                       | POST to the `verify` link relation to [verify the Factor](#verify-factor).                                          |
| `MFA_ENROLL_ACTIVATE`                          | The user must activate the Factor to complete enrollment.                                                 | POST to the `next` link relation to [activate the Factor](#activate-factor).                                        |
| `MFA_ENROLL`                                   | The user must select and enroll an available Factor for additional verification.                          | POST to the `enroll` link relation for a specific Factor to [enroll the Factor](#enroll-factor).                    |
| `MFA_REQUIRED`                                 | The user must provide additional verification with a previously enrolled Factor.                          | POST to the `verify` link relation for a specific Factor to [provide additional verification](#verify-factor).      |
| `PASSWORD_EXPIRED`                             | The user's password was successfully validated but is expired.                                            | POST to the `next` link relation to [change the user's expired password](#change-password).                         |
| `PASSWORD_RESET`                               | The user successfully answered their recovery question and must to set a new password.                    | POST to the `next` link relation to [reset the user's password](#reset-password).                                   |
| `PASSWORD_WARN`                                | The user's password was successfully validated but is about to expire and should be changed.              | POST to the `next` link relation to [change the user's password](#change-password).                                 |
| `RECOVERY_CHALLENGE`                           | The user must verify the Factor-specific recovery challenge.                                              | POST to the `verify` link relation to [verify the recovery Factor](#verify-recovery-factor).                        |
| `RECOVERY`                                     | The user has requested a recovery token to reset their password or unlock their account.                  | POST to the `next` link relation to [answer the user's recovery question](#answer-recovery-question).               |
| `SUCCESS`                                      | The transaction completed successfully.   |                                                               |                            |
| `UNAUTHENTICATED` <ApiLifecycle access="ea" /> | User tried to access protected resource (for example: an app) but the user is not authenticated.          | POST to the `next` link relation to [authenticate user credentials](#step-up-authentication-without-okta-session).  |

You advance the authentication or recovery transaction to the next state by posting a request with a valid [state token](#state-token) to the the `next` link relation published in the [JSON HAL links object](#links-object) for the response.

[Enrolling a Factor](#enroll-factor) and [verifying a Factor](#verify-factor) do not have `next` link relationships as the end user must make a selection of which Factor to enroll or verify.

> **Note:** Never assume a specific state transition or URL when navigating the [state object](#transaction-state). Always inspect the response for `status` and dynamically follow the [published link relations](#links-object).

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

### Authentication type

<ApiLifecycle access="ea" />

Represents the type of authentication. Currently available only during [SP-initiated step-up authentication](#sp-initiated-step-up-authentication) and [IDP-initiated step-up authentication](#idp-initiated-step-up-authentication).

### Tokens

Authentication API operations return different token types depending on the [state](#transaction-state) of the authentication or recovery transaction.

#### State token

Ephemeral token that encodes the current state of an authentication or recovery transaction.

* The `stateToken` must be passed with every request except when verifying a `recoveryToken` that was distributed out-of-band
* The `stateToken` is only intended to be used between the web application performing end-user authentication and the Okta API. It should never be distributed to the end user via email or other out-of-band mechanisms.
* The lifetime of the `stateToken` uses a sliding scale expiration algorithm that extends with every request.  Always inspect the `expiresAt` property for the transaction when making decisions based on lifetime.

> **Note:** All Authentication API operations return `401 Unauthorized` status codes when you attempt to use an expired state token.

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

> **Note:** State transitions are strictly enforced for state tokens. You receive a `403 Forbidden` status code if you call an Authentication API operation with a `stateToken` with an invalid [state](#transaction-state).

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

#### Recovery token

One-time token issued as `recoveryToken` response parameter when a recovery transaction transitions to the `RECOVERY` status.

* The token can be exchanged for a `stateToken` to recover a user's password or unlock their account.
* Unlike the `statusToken` the `recoveryToken` should be distributed out-of-band to a user such as via email.
* The lifetime of the `recoveryToken` is managed by the organization's security policy.

The `recoveryToken` is sent via an out-of-band channel to the end user's verified email address or SMS phone number and acts as primary authentication for the recovery transaction.

> **Note:** Directly obtaining a `recoveryToken` is a highly privileged operation and should be restricted to trusted web applications.  Anyone that obtains a `recoveryToken` for a user and knows the answer to a user's recovery question can reset their password or unlock their account.

#### Session token

One-time token issued as `sessionToken` response parameter when an authentication transaction completes with the `SUCCESS` status.

* The token can be exchanged for a session with the [Session API](/docs/reference/api/sessions/#create-session-with-session-token) or converted to a [session cookie](/docs/guides/session-cookie/).
* The lifetime of the `sessionToken` is 5 minutes.

### Factor result

The `MFA_CHALLENGE` or `RECOVERY_CHALLENGE` state can return an additional property **factorResult** that provides additional context for the last Factor verification attempt.

The following table shows the possible values for this property:

| factorResult           | Description                                                                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------  |
| `CANCELLED`            | Factor verification was canceled by user                                                                                            |
| `ERROR`                | Unexpected server error occurred verifying Factor.                                                                                  |
| `PASSCODE_REPLAYED`    | Factor was previously verified within the same time window.  User must wait another time window and retry with a new verification.  |
| `TIMEOUT`              | Unable to verify Factor within the allowed time window                                                                              |
| `TIME_WINDOW_EXCEEDED` | Factor was successfully verified but outside of the computed time window.  Another verification is required in current time window. |
| `WAITING`              | Factor verification has started but not yet completed (e.g user hasn't answered phone call yet)                                     |

### Links object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the current [transaction state](#transaction-state) using the [JSON](https://tools.ietf.org/html/rfc7159) specification. These links are used to transition the [state machine](#transaction-state) of the authentication or recovery transaction.

The Links object is read-only.

| Link Relation Type | Description                                                                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| next               | Transitions the [state machine](#transaction-state) to the next state  **Note: The `name` of the link relationship provides a hint of the next operation required**    |
| prev               | Transitions the [state machine](#transaction-state) to the previous state                                                                                              |
| cancel             | Cancels the current transaction and revokes the [state token](#state-token)                                                                                           |
| skip               | Skips over the current transaction state to the next valid [state](#transaction-state)                                                                                  |
| resend             | Resends a challenge or OTP to a device                                                                                                                                   |

## Embedded resources

### User object

A subset of [user properties](/docs/reference/api/users/#user-object) published in an authentication or recovery transaction after the user successfully completes primary authentication.

| Property          | Description                                       | DataType                                              | Nullable | Unique | Readonly |
| ----------------- | ------------------------------------------------- | ----------------------------------------------------- | -------- | ------ | -------- |
| id                | Unique key for user                               | String                                                | FALSE    | TRUE   | TRUE     |
| passwordChanged   | Timestamp when user's password last changed       | Date                                                  | TRUE     | FALSE  | TRUE     |
| profile           | User's profile                                    | [User Profile object](#user-profile-object)           | FALSE    | FALSE  | TRUE     |
| recovery_question | User's recovery question                          | [Recovery Question object](#recovery-question-object) | TRUE     | FALSE  | TRUE     |

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

#### User profile object

Subset of [profile properties](/docs/reference/api/users/#profile-object) for a user

| Property  | Description                                                                                                                        | DataType  | Nullable | Unique | Readonly | Validation                                                            |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | ------ | -------- | --------------------------------------------------------------------- |
| firstName | First name of user                                                                                                                 | String    | FALSE    | FALSE  | TRUE     |                                                                       |
| lastName  | Last name of user                                                                                                                  | String    | FALSE    | FALSE  | TRUE     |                                                                       |
| locale    | User's default location for purposes of localizing items such as currency, date time format, numerical representations, etc.       | String    | TRUE     | FALSE  | TRUE     | [RFC 5646](https://tools.ietf.org/html/rfc5646)                       |
| login     | Unique login for user                                                                                                              | String    | FALSE    | TRUE   | TRUE     |                                                                       |
| timeZone  | User's time zone                                                                                                                   | String    | TRUE     | FALSE  | TRUE     | [IANA Time Zone database format](https://tools.ietf.org/html/rfc6557) |

#### Remember device policy object

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
* The value of `rememberDeviceLifetimeInMinutes` depends on the Factor lifetime value configured in the Sign-On Policy rule.

##### When policy is not based on time or device

```json
{
   "allowRememberDevice":false,
   "rememberDeviceByDefault":false,
   "rememberDeviceLifetimeInMinutes":0
}
```

#### Recovery question object

User's recovery question used for verification of a recovery transaction

| Property          | Description                    | DataType | Nullable | Unique | Readonly |
| ----------------- | ------------------------------ | -------- | -------- | ------ | -------- |
| question          | User's recovery question       | String   | FALSE    | TRUE   | TRUE     |

### Target object

<ApiLifecycle access="ea" />

Represents the target resource that the user tried accessing. Typically this is the app that the user is trying to sign in to. Currently this is available only during [SP-initiated step-up authentication](#sp-initiated-step-up-authentication) and [IDP-initiated step-up authentication](#idp-initiated-step-up-authentication).

| Property  | Description                                                                                                                  | DataType                                                       | Nullable | Unique | Readonly |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------                                                      | -------- | ------ | -------- |
| _links    | Discoverable resources for the target                                                                                        | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |
| label     | Label of the target resource                                                                                                 | String                                                         | FALSE    | FALSE  | TRUE     |
| name      | Name of the target resource                                                                                                  | String                                                         | FALSE    | FALSE  | TRUE     |
| type      | Type of the target resource. Currently only 'APP' is the supported type.                                                     | String                                                         | FALSE    | TRUE   | TRUE     |

### Authentication object

<ApiLifecycle access="ea" />

Represents the authentication details that the target resource is using. Currently this is available only during [SP-initiated step-up authentication](#sp-initiated-step-up-authentication) and [IDP-initiated step-up authentication](#idp-initiated-step-up-authentication).

| Property  | Description                                                                                                                  | DataType                         | Nullable | Unique | Readonly |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------                        | -------- | ------ | -------- |
| issuer    | The issuer of the assertion                                                                                                 | [Issuer object](#issuer-object)  | FALSE    | FALSE  | TRUE     |
| protocol  | The protocol of authentication                                                                                              | `SAML2.0`, `SAML1.1` or `WS-FED` | FALSE    | TRUE   | TRUE     |

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

#### Issuer object

The issuer that generates the assertion after the authentication finishes

| Property  | Description                                                                                                                  | DataType  | Nullable | Unique | Readonly |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | ------ | -------- |
| id        | Id of the issuer                                                                                                            | String    | TRUE     | TRUE   | TRUE     |
| name      | Name of the issuer                                                                                                          | String    | FALSE    | FALSE  | TRUE     |
| uri       | URI of the issuer                                                                                                           | String    | FALSE    | FALSE  | TRUE     |

### Password policy object

A subset of policy settings for the user's assigned password policy published during `PASSWORD_WARN`, `PASSWORD_EXPIRED`, or `PASSWORD_RESET` states

| Property   | Description                  | DataType                                                  | Nullable | Unique | Readonly |
| ---------- | ---------------------------- | --------------------------------------------------------- | -------- | ------ | -------- |
| complexity | Password complexity settings | [Password Complexity object](#password-complexity-object) | FALSE    | FALSE  | TRUE     |
| expiration | Password expiration settings | [Password Expiration object](#password-expiration-object) | TRUE     | FALSE  | TRUE     |

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

#### Password expiration object

Specifies the password age requirements of the assigned password policy

| Property           | Description                               | DataType | Nullable | Unique | Readonly |
| ------------------ | ----------------------------------------- | -------- | -------- | ------ | -------- |
| passwordExpireDays | number of days before the password is expired | Number   | FALSE    | FALSE  | TRUE     |

#### Password complexity object

Specifies the password complexity requirements of the assigned password policy

| Property        | Description                                                | DataType | Nullable | Unique | Readonly |
| ------------    | ----------------------------------------------------       | -------- | -------- | ------ | -------- |
| excludeUsername | Prevents username or domain from appearing in the password | Boolean  | FALSE    | FALSE  | TRUE     |
| minLength       | Minimum number of characters for the password                  | Number   | FALSE    | FALSE  | TRUE     |
| minLowerCase    | Minimum number of lowercase characters for the password       | Number   | FALSE    | FALSE  | TRUE     |
| minNumber       | Minimum number of numeric characters for the password          | Number   | FALSE    | FALSE  | TRUE     |
| minSymbol       | Minimum number of symbol characters for the password           | Number   | FALSE    | FALSE  | TRUE     |
| minUpperCase    | Minimum number of uppercase characters for the password       | Number   | FALSE    | FALSE  | TRUE     |
> **Note:** Duplicate the minimum Active Directory (AD) requirements in these settings for AD-mastered users. No enforcement is triggered by Okta settings for AD-mastered users.

#### Password age object

Specifies the password requirements related to password age and history

| Property         | Description                                                              | DataType | Nullable | Unique | Readonly |
| ---------------- | ------------------------------------------------------------------------ | -------- | -------- | ------ | -------- |
| historyCount     | Number of previous passwords that the current password can't match       | Number   | FALSE    | FALSE  | TRUE     |
| minAgeMinutes    | Minimum number of minutes required since the last password change        | Number   | FALSE    | FALSE  | TRUE     |

### Factor object

A subset of [Factor properties](/docs/reference/api/factors/#factor-object) published in an authentication transaction during `MFA_ENROLL`, `MFA_REQUIRED`, or `MFA_CHALLENGE` states

| Property       | Description                                                                                    | DataType                                                       | Nullable | Unique | Readonly |
| -------------- | ----------------------------------------------------------------------------------------       | -------------------------------------------------------------- | -------- | ------ | -------  |
| _embedded      | [embedded resources](#factor-embedded-resources) related to the Factor                         | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |
| _links         | [discoverable resources](#factor-links-object) for the Factor                                  | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |
| factorType     | type of Factor                                                                                 | [Factor Type](/docs/reference/api/factors/#factor-type)                             | FALSE    | TRUE   | TRUE     |
| id             | unique key for Factor                                                                          | String                                                         | TRUE     | TRUE   | TRUE     |
| profile        | profile of a [supported Factor](/docs/reference/api/factors/#supported-factors-for-providers)                       | [Factor Profile object](/docs/reference/api/factors/#factor-profile-object)         | TRUE     | FALSE  | TRUE     |
| provider       | Factor provider                                                                                | [Provider Type](/docs/reference/api/factors/#provider-type)                         | FALSE    | TRUE   | TRUE     |
| vendorName     | Factor Vendor Name (Same as provider but for On-Prem MFA it depends on Administrator Settings) | [Provider Type](/docs/reference/api/factors/#provider-type)                         | FALSE    | TRUE   | TRUE     |

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

#### Factor embedded resources

##### TOTP Factor activation object

TOTP factors, when activated, have an embedded verification object that describes the [TOTP](http://tools.ietf.org/html/rfc6238) algorithm parameters.

| Property       | Description                                       | DataType                                                       | Nullable | Unique | Readonly |
| -------------- | ------------------------------------------------- | -------------------------------------------------------------- | -------- | ------ | -------- |
| _links         | Discoverable resources related to the activation  | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |
| encoding       | Encoding of `sharedSecret`                        | `base32` or `base64`                                           | FALSE    | FALSE  | TRUE     |
| keyLength      | Number of digits in a TOTP value                 | Number                                                         | FALSE    | FALSE  | TRUE     |
| sharedSecret   | Unique secret key for prover                      | String                                                         | FALSE    | FALSE  | TRUE     |
| timeStep       | Time-step size for TOTP                           | String                                                         | FALSE    | FALSE  | TRUE     |

> **Note:** This object implements [the TOTP standard](https://tools.ietf.org/html/rfc6238), which is used by apps like Okta Verify and Google Authenticator.

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

###### TOTP activation links object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the TOTP activation object using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification. This object is used for dynamic discovery of related resources and operations.

| Link Relation Type | Description                                                              |
| ------------------ | ------------------------------------------------------------------------ |
| qrcode             | QR code that encodes the TOTP parameters that can be used for enrollment |

##### Phone object

Describes previously enrolled phone numbers for the `sms` Factor

| Property      | Description          | DataType                                      | Nullable | Unique | Readonly |
| ------------- | -------------------- | --------------------------------------------- | -------- | ------ | -------- |
| id            | Unique key for phone | String                                        | FALSE    | TRUE   | TRUE     |
| profile       | Profile of phone     | [Phone Profile object](#phone-profile-object) | FALSE    | FALSE  | TRUE     |
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

###### Phone profile object

| Property      | Description          | DataType  | Nullable | Unique | Readonly |
| ------------- | -------------------- | --------- | -------- | ------ | -------- |
| phoneNumber   | Masked phone number  | String    | FALSE    | FALSE  | TRUE     |

##### Push Factor activation object

Push factors must complete activation on the device by scanning the QR code or visiting the activation link sent via email or SMS.

| Property       | Description                                       | DataType                                                       | Nullable | Unique | Readonly |
| -------------- | ------------------------------------------------- | -------------------------------------------------------------- | -------- | ------ | -------- |
| _links         | Discoverable resources related to the activation  | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | FALSE    | FALSE  | TRUE     |
| expiresAt      | Lifetime of activation                            | Date                                                           | FALSE    | FALSE  | TRUE     |

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

###### Push Factor activation links object

Specifies link relations (see [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the push Factor activation object using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification. This object is used for dynamic discovery of related resources and operations.

| Link Relation Type | Description                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------- |
| qrcode             | QR code that encodes the push activation code needed for enrollment on the device        |
| send               | Sends an activation link via `email` or `sms` for users who can't scan the QR code       |

##### Factor links object

Specifies link relations (see [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the Factor using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification. This object is used for dynamic discovery of related resources and operations.

The Factor Links object is read-only.

| Link Relation Type | Description                                                 |
| ------------------ | ----------------------------------------------------------- |
| enroll             | [Enrolls a Factor](#enroll-factor)                          |
| questions          | Lists all possible questions for the `question` Factor type |
| resend             | Resends a challenge or OTP to a device                      |
| verify             | [Verifies a Factor](#verify-factor)                         |
