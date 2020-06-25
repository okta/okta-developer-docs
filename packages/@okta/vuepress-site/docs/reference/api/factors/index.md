---
title: Factors
category: management
---

# Factors API

The Okta Factors API provides operations to enroll, manage, and verify factors for multifactor authentication (MFA). Manage both administration and end-user accounts, or verify an individual factor at any time.

## Get started with the Factors API

Explore the Factors API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/2e52a7def4973635840e)

## Factor operations

- **[List operations](#factor-operations)** &mdash; List factors and security questions.
- **[Lifecycle operations](#factor-lifecycle-operations)** &mdash; Enroll, activate, and reset factors.
- **[Challenge and verify operations](#factors-that-require-a-challenge-and-verify-operation)** &mdash; Challenge and Verify a factor
- **[Verification only operations](#factors-that-require-only-a-verification-operation)** &mdash; Verify a factor

### Get Factor

<ApiOperation method="get" url="/api/v1/users/${userId}/factors/${factorId}" />

Fetches a Factor for the specified User

##### Request parameters

| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| factorId     | `id` of a Factor                                    | URL        | String   | TRUE     |
| userId       | `id` of a User                                      | URL        | String   | TRUE     |

#### Response parameters

[Factor](#factor-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ufs2bysphxKODSZKWVCT"
```

##### Response example

```json
{
  "id": "sms2gt8gzgEBPUWBIFHN",
  "factorType": "sms",
  "provider": "OKTA",
  "vendorName": "OKTA",
  "status": "ACTIVE",
  "created": "2014-06-27T20:27:26.000Z",
  "lastUpdated": "2014-06-27T20:27:26.000Z",
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  },
  "_links": {
    "verify": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/sms2gt8gzgEBPUWBIFHN/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/sms2gt8gzgEBPUWBIFHN",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
```

### List enrolled Factors

<ApiOperation method="get" url="/api/v1/users/${userId}/factors" />

Enumerates all of the enrolled Factors for the specified User

##### Request parameters

| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| userId       | `id` of a User                                      | URL        | String   | TRUE     |

##### Response parameters

Array of [Factors](#factor-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors"
```

##### Response example

```json
[
  {
    "id": "ufs2bysphxKODSZKWVCT",
    "factorType": "question",
    "provider": "OKTA",
    "vendorName": "OKTA",
    "status": "ACTIVE",
    "created": "2014-04-15T18:10:06.000Z",
    "lastUpdated": "2014-04-15T18:10:06.000Z",
    "profile": {
      "question": "favorite_art_piece",
      "questionText": "What is your favorite piece of art?"
    },
    "_links": {
      "questions": {
        "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/questions",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ufs2bysphxKODSZKWVCT",
        "hints": {
          "allow": [
            "GET",
            "DELETE"
          ]
        }
      },
      "user": {
        "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      }
    }
  },
  {
    "id": "ostf2gsyictRQDSGTDZE",
    "factorType": "token:software:totp",
    "provider": "OKTA",
    "status": "PENDING_ACTIVATION",
    "created": "2014-06-27T20:27:33.000Z",
    "lastUpdated": "2014-06-27T20:27:33.000Z",
    "profile": {
      "credentialId": "dade.murphy@example.com"
    },
    "_links": {
      "next": {
        "name": "activate",
        "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf2gsyictRQDSGTDZE/lifecycle/activate",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf2gsyictRQDSGTDZE",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "user": {
        "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      }
    },
    "_embedded": {
      "activation": {
        "timeStep": 30,
        "sharedSecret": "HE64TMLL2IUZW2ZLB",
        "encoding": "base32",
        "keyLength": 16
      }
    }
  },
  {
    "id": "sms2gt8gzgEBPUWBIFHN",
    "factorType": "sms",
    "provider": "OKTA",
    "status": "ACTIVE",
    "created": "2014-06-27T20:27:26.000Z",
    "lastUpdated": "2014-06-27T20:27:26.000Z",
    "profile": {
      "phoneNumber": "+1-555-415-1337"
    },
    "_links": {
      "verify": {
        "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/sms2gt8gzgEBPUWBIFHN/verify",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/sms2gt8gzgEBPUWBIFHN",
        "hints": {
          "allow": [
            "GET",
            "DELETE"
          ]
        }
      },
      "user": {
        "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL",
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

### List Factors to enroll

<ApiOperation method="get" url="/api/v1/users/${userId}/factors/catalog" />

Enumerates all of the [supported Factors](#supported-factors-for-providers) that can be enrolled for the specified User

##### Request parameters

| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| userId       | `id` of a User                                      | URL        | String   | TRUE     |

##### Response parameters

Array of [Factors](#factor-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/catalog"
```

##### Response example

```json
[
  {
    "factorType": "question",
    "provider": "OKTA",
    "vendorName": "OKTA",
    "_links": {
      "questions": {
        "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/questions",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "enroll": {
        "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },
  {
    "factorType": "token:software:totp",
    "provider": "OKTA",
    "_links": {
      "enroll": {
        "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },
  {
    "factorType": "token:software:totp",
    "provider": "GOOGLE",
    "_links": {
      "enroll": {
        "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },
  {
    "factorType": "sms",
    "provider": "OKTA",
    "_links": {
      "enroll": {
        "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    },
    "_embedded": {
      "phones": [
        {
          "id": "mblldntFJevYKbyQQ0g3",
          "profile": {
            "phoneNumber": "+14081234567"
          },
          "status": "ACTIVE"
        }
      ]
    }
  },
  {
      "factorType": "call",
      "provider": "OKTA",
      "_links": {
        "enroll": {
          "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors",
          "hints": {
            "allow": [
              "POST"
            ]
          }
        }
      }
  },
  {
    "factorType": "token",
    "provider": "RSA",
    "_links": {
      "enroll": {
        "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },
  {
    "factorType": "token",
    "provider": "SYMANTEC",
    "_links": {
      "enroll": {
        "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors",
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

> **Note:** Notice that the `sms` Factor type includes an existing phone number in `_embedded`. You can either use the existing phone number or update it with a new number. See [Enroll Okta SMS Factor](#enroll-okta-sms-factor).

### List security questions

<ApiOperation method="get" url="/api/v1/users/${userId}/factors/questions" />

Enumerates all available security questions for a User's `question` Factor

##### Request parameters

| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| userId       | `id` of a User                                      | URL        | String   | TRUE     |

##### Response parameters

Array of questions

| Property      | Description               | DataType  | Nullable | Unique  | Readonly |
| ------------- | ------------------------- | --------- | -------- | ------- | -------- |
| question      | Unique key for question   | String    | FALSE    | TRUE    | TRUE     |
| questionText  | Display text for question | String    | FALSE    | FALSE   | TRUE     |

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/questions"
```

##### Response example

```json
[
  {
    "question": "disliked_food",
    "questionText": "What is the food you least liked as a child?"
  },
  {
    "question": "name_of_first_plush_toy",
    "questionText": "What is the name of your first stuffed animal?"
  },
  {
    "question": "first_award",
    "questionText": "What did you earn your first medal or award for?"
  }
]
```

### List YubiKey OTP Tokens

<ApiOperation method="get" url="/api/v1/org/factors/yubikey_token/tokens" />

Enumerates all YubiKey OTP Tokens

##### Request parameters

| Parameter | Description                                                                                                      | Param Type | DataType | Required | Default |
| --------- | ---------------------------------------------------------------------------------------------------------------- | ---------- | -------- | -------- | ------- |
| after     | Specifies the pagination cursor for the next page of tokens                                                      | Query      | String   | FALSE    |         |
| expand    | Embeds the [User](/docs/reference/api/users/#user-object) resource if the YubiKey Token is assigned to a user and expand is set to `user` | Query      | String   | FALSE    |         |
| filter    | Filters tokens by `profile.email`, `profile.serial`, `activated`, `user.id`, `created`, `status`, or `lastVerified` expression | Query      | String   | FALSE    |         |
| forDownload | Returns tokens in a CSV for download instead of in the response.  Defaults `limit` to 1000.                    | Query      | Boolean  | FALSE    | false   |
| limit     | Specifies the number of results per page (maximum 200)                                                           | Query      | Number   | FALSE    | 20      |
| sortBy    | Sorts the tokens by `profile.email`, `profile.serial`, `activated`, `user.id`, `created`, `status`, or `lastVerified` | Query      | String   | FALSE    |        |
| sortOrder | Specifies the sort order, either `ASC` or `DESC`                                                                 | Query      | String   | FALSE    |         |

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/factors/yubikey_token/tokens"
```

##### Response example

```json
[
    {
        "id": "ykkwcx13nrDq8g4oy0g3",
        "created": "2020-01-14T21:53:09.000Z",
        "lastVerified": "2020-01-14T21:53:06.000Z",
        "lastUpdated": "2020-01-14T21:53:09.000Z",
        "status": "UNASSIGNED",
        "profile": {
            "serial": "000003632071"
        },
        "_links": {
            "self": {
                "href": "http://${yourOktaDomain}/api/v1/org/factors/yubikey_token/tokens/ykkwcx13nrDq8g4oy0g3",
                "hints": {
                    "allow": [
                        "GET",
                        "DELETE"
                    ]
                }
            }
        }
    },
    {
        "id": "ykkxdtCA1fKVxyu6R0g3",
        "created": "2020-06-09T23:42:05.000Z",
        "activated": "2020-06-09T23:47:29.000Z",
        "lastVerified": "2020-06-09T23:47:29.000Z",
        "lastUpdated": "2020-06-09T23:47:29.000Z",
        "status": "ACTIVE",
        "profile": {
            "serial": "000009508427"
        },
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/org/factors/yubikey_token/tokens/ykkxdtCA1fKVxyu6R0g3",
                "hints": {
                    "allow": [
                        "GET"
                    ]
                }
            },
            "user": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uu0x8sxTr9HcHOo0g3",
                "hints": {
                    "allow": [
                        "GET"
                    ]
                }
            },
            "deactivate": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uu0x8sxTr9HcHOo0g3/factors/ykfxduQAhl89YyPrV0g3",
                "hints": {
                    "allow": [
                        "DELETE"
                    ]
                }
            }
        }
    }
]
```

### Get a Single YubiKey OTP Token

<ApiOperation method="get" url="/api/v1/org/factors/yubikey_token/tokens/${tokenId}" />

Gets the specified YubiKey OTP Token

##### Request parameters

| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| tokenId       | `id` of a YubiKey Token                            | URL        | String   | TRUE     |

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/factors/yubikey_token/tokens/ykkxdtCA1fKVxyu6R0g3"
```

##### Response example

```json
{
    "id": "ykkxdtCA1fKVxyu6R0g3",
    "created": "2020-06-09T23:42:05.000Z",
    "activated": "2020-06-09T23:47:29.000Z",
    "lastVerified": "2020-06-09T23:47:29.000Z",
    "lastUpdated": "2020-06-09T23:47:29.000Z",
    "status": "ACTIVE",
    "profile": {
        "serial": "000009508427"
    },
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/org/factors/yubikey_token/tokens/ykkxdtCA1fKVxyu6R0g3",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "user": {
            "href": "https://${yourOktaDomain}/api/v1/users/00uu0x8sxTr9HcHOo0g3",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "deactivate": {
            "href": "https://${yourOktaDomain}/api/v1/users/00uu0x8sxTr9HcHOo0g3/factors/ykfxduQAhl89YyPrV0g3",
            "hints": {
                "allow": [
                    "DELETE"
                ]
            }
        }
    }
}
```

## Factor lifecycle operations

### Enroll Factor

<ApiOperation method="post" url="/api/v1/users/${userId}/factors" />

Enrolls a User with a supported [Factor](#list-factors-to-enroll)

- [Enroll Okta Security Question Factor](#enroll-okta-security-question-factor)
- [Enroll Okta SMS Factor](#enroll-okta-sms-factor)
- [Enroll Okta Call Factor](#enroll-okta-call-factor)
- [Enroll Okta Verify TOTP Factor](#enroll-okta-verify-totp-factor)
- [Enroll Okta Verify Push Factor](#enroll-okta-verify-push-factor)
- [Enroll Google Authenticator Factor](#enroll-google-authenticator-factor)
- [Enroll RSA SecurID Factor](#enroll-rsa-securid-factor)
- [Enroll Symantec VIP Factor](#enroll-symantec-vip-factor)
- [Upload YubiKey Seed](#upload-yubikey-seed)
- [Enroll YubiKey Factor](#enroll-yubikey-factor)
- [Enroll Okta Email Factor](#enroll-okta-email-factor)
- [Enroll U2F Factor](#enroll-u2f-factor)
- [Enroll WebAuthn Factor](#enroll-webauthn-factor)
- [Enroll Custom HOTP Factor](#enroll-custom-hotp-factor)

##### Request parameters

| Parameter            | Description                                                                                            | Param Type | DataType                | Required |
| -------------------- | ------------------------------------------------------------------------------------------------------ | ---------- | ----------------------- | -------- |
| activate             | If set to `true`, an attempt is automatically made to activate a Factor after enrolling it             | Query      | Boolean                 | FALSE    |
| factor               | Factor                                                                                                 | Body       | [Factor](#factor-object) | TRUE     |
| id                   | `id` of the User                                                                                           | URL        | String                  | TRUE     |
| templateId           | `id` of an SMS template (only for SMS Factors)                                                         | Query      | String                  | FALSE    |
| tokenLifetimeSeconds | The lifetime of the Email Factors OTP, with a value between `1` and `86400` (Default is `300`)         | Query      | Number                  | FALSE    |
| updatePhone          | Indicates if you'd like to update the `phoneNumber` (only for SMS Factors that are pending activation) | Query      | Boolean                 | FALSE    |

##### Response Parameters

All responses return the enrolled [Factor](#factor-object) with a status of either `PENDING_ACTIVATION` or `ACTIVE`.

> **Note:** Some [Factor types](#factor-type) require [activation](#activate-factor) to complete the enrollment process.

#### Enroll Okta Security Question Factor

Enrolls a User with the `question` factor and [Question Profile](#question-profile).

> **Note:** The Security Question Factor doesn't require activation and is `ACTIVE` after enrollment.

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "question",
  "provider": "OKTA",
  "profile": {
    "question": "disliked_food",
    "answer": "mayonnaise"
  }
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors"
```

##### Response example

```json
{
  "id": "ufs1o01OTMGHLAJPVHDZ",
  "factorType": "question",
  "provider": "OKTA",
  "vendorName": "OKTA",
  "status": "ACTIVE",
  "created": "2014-08-05T22:58:49.000Z",
  "lastUpdated": "2014-08-05T22:58:49.000Z",
  "profile": {
    "question": "disliked_food",
    "questionText": "What is the food you least liked as a child?"
  },
  "_links": {
    "questions": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/questions",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ufs1o01OTMGHLAJPVHDZ",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
```

#### Enroll Okta SMS Factor

Enrolls a User with the Okta `sms` Factor and an [SMS profile](#sms-profile). A text message with a One-Time Passcode (OTP) is sent to the device during enrollment and must be [activated](#activate-sms-factor) by following the `activate` link relation to complete the enrollment process.

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "sms",
  "provider": "OKTA",
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  }
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors"
```

##### Response example

```json
{
  "id": "mbl1nz9JHJGHWRKMTLHP",
  "factorType": "sms",
  "provider": "OKTA",
  "vendorName": "OKTA",
  "status": "PENDING_ACTIVATION",
  "created": "2014-08-05T20:59:49.000Z",
  "lastUpdated": "2014-08-06T03:59:49.000Z",
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  },
  "_links": {
    "activate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/mbl1nz9JHJGHWRKMTLHP/lifecycle/activate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "resend": [
      {
        "name": "sms",
        "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/mbl1nz9JHJGHWRKMTLHP/resend",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    ],
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/mbl1nz9JHJGHWRKMTLHP",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
```

###### Rate Limit

A `429 Too Many Requests` status code may be returned if you attempt to resend an SMS challenge (OTP) within the same time window.

> **Notes:** The current rate limit is one SMS challenge per device every 30 seconds.<br><br> Okta round-robins between SMS providers with every resend request to help ensure delivery of SMS OTP across different carriers.

```json
{
    "errorCode": "E0000109",
    "errorSummary": "An SMS message was recently sent. Please wait 30 seconds before trying again.",
    "errorLink": "E0000109",
    "errorId": "oaeneEaQF8qQrepOWHSkdoejw",
    "errorCauses": []
}
```

###### Existing phone

A `400 Bad Request` status code may be returned if the user attempts to enroll with a different phone number when there is an existing mobile phone for the user.

> **Note:** Currently, a user can enroll only one mobile phone.

```json
{
    "errorCode": "E0000001",
    "errorSummary": "Api validation failed: factorEnrollRequest",
    "errorLink": "E0000001",
    "errorId": "oaeneEaQF8qQrepOWHSkdoejw",
    "errorCauses": [
       {
          "errorSummary": "There is an existing verified phone number."
       }
    ]
}
```

##### Enroll Okta SMS Factor by updating phone number

If the user wants to use a different phone number (instead of the existing phone number), then the enroll API call needs to supply the `updatePhone` query parameter set to `true`.

The phone number can't be updated for an SMS Factor that is already activated. If you'd like to update the phone number, you need to reset the factor and re-enroll it:

1. [List enrolled Factors](#list-enrolled-factors) and extract the relevant `factorId`.
2. [Reset the Factor](#reset-factor)
3. Then [enroll the Factor](#enroll-okta-sms-factor) again. You are able to pass the `updatePhone` parameter set to `true`, along with an updated `phoneNumber` value for as long as the Factor has a `status` value of `PENDING_ACTIVATION`.

###### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "sms",
  "provider": "OKTA",
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  }
}' "https://${yourOktaDomain}/api/v1/users/${userId}/factors?updatePhone=true"
```

##### Enroll Okta SMS Factor by using existing phone number

If the user wants to use the existing phone number then the enroll API doesn't need to pass the phone number.
Or, you can pass the existing phone number in a Profile object.

###### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "sms",
  "provider": "OKTA"
}' "https://${yourOktaDomain}/api/v1/users/${userId}/factors"
```

##### Enroll Okta SMS Factor using custom template

Customize (and optionally localize) the SMS message sent to the user on enrollment.

* If the request has an `Accept-Language` header and the template contains a translation for that language, the SMS message is sent using the translated template.
* If the language provided in the `Accept-Language` header doesn't exist, the SMS message is sent using the template text.
* If the provided `templateId` doesn't match the existing template, the SMS message is sent using the default template.

> **Note:** For instructions about how to create custom templates, see [SMS template](/docs/reference/api/templates/#add-sms-template).

###### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "sms",
  "provider": "OKTA",
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  }
}' "https://${yourOktaDomain}/api/v1/users/${userId}/factors?templateId=${templateId}"
```

##### Resend SMS as part of enrollment

Use the `resend` link to send another OTP if the user doesn't receive the original activation SMS OTP.

###### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "sms",
  "provider": "OKTA",
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  }
}' "https://${yourOktaDomain}/api/v1/users/${userId}/factors/${factorId}/resend"
```

##### Resend SMS as part of enrollment using a custom template

Customize (and optionally localize) the SMS message sent to the user in case Okta needs to resend the message as part of enrollment.

> **Note:** For instructions about how to create custom templates, see [SMS template](/docs/reference/api/templates/#add-sms-template).

###### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Accept-Language: fr" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "sms",
  "provider": "OKTA",
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  }
}' "https://${yourOktaDomain}/api/v1/users/${userId}/factors/${factorId}/resend?templateId=${templateId}"
```

##### Enroll and auto-activate Okta SMS Factor

To enroll and immediately activate the Okta `sms` factor, add the `activate` option to the enroll API and set it to `true`. An activation text message isn't sent to the device.

###### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "sms",
  "provider": "OKTA",
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  }
}' "https://${yourOktaDomain}/api/v1/users/${userId}/factors?activate=true"
```

#### Enroll Okta Call Factor

Enrolls a user with the Okta `call` Factor and a [Call profile](#call-profile). A voice call with an OTP is made to the device during enrollment and must be [activated](#activate-call-factor).

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "call",
  "provider": "OKTA",
  "profile": {
    "phoneNumber": "+1-555-415-1337",
    "phoneExtension": "1234"
  }
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors"
```

##### Response example

```json
{
  "id": "clf1nz9JHJGHWRKMTLHP",
  "factorType": "call",
  "provider": "OKTA",
  "vendorName": "OKTA",
  "status": "PENDING_ACTIVATION",
  "created": "2014-08-05T20:59:49.000Z",
  "lastUpdated": "2014-08-06T03:59:49.000Z",
  "profile": {
    "phoneNumber": "+1-555-415-1337",
    "phoneExtension": "1234"
  },
  "_links": {
    "activate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/clf1nz9JHJGHWRKMTLHP/lifecycle/activate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "resend": [
      {
        "name": "call",
        "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/clf1nz9JHJGHWRKMTLHP/resend",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    ],
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/clf1nz9JHJGHWRKMTLHP",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
```

###### Rate limit

A `429 Too Many Requests` status code may be returned if you attempt to resend a voice call challenge (OTP) within the same time window.

> **Note:** The current rate limit is one voice call challenge per device every 30 seconds.

```json
{
    "errorCode": "E0000047",
    "errorSummary": "API call exceeded rate limit due to too many requests",
    "errorLink": "E0000047",
    "errorId": "oaexL5rislQROquLn3Jec7oGw",
    "errorCauses": []
}
```

###### Existing phone

A `400 Bad Request` status code may be returned if a user attempts to enroll with a different phone number when there is an existing phone with voice call capability for the user.

> **Note:** Currently, a user can enroll only one voice call capable phone.

```json
{
    "errorCode": "E0000001",
    "errorSummary": "Api validation failed: factorEnrollRequest",
    "errorLink": "E0000001",
    "errorId": "oaeneEaQF8qQrepOWHSkdoejw",
    "errorCauses": [
       {
          "errorSummary": "A factor of this type is already set up."
       }
    ]
}
```

##### Resend voice call as part of enrollment

Use the `resend` link to send another OTP if the user doesn't receive the original activation voice call OTP.

###### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "call",
  "provider": "OKTA",
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  }
}' "https://${yourOktaDomain}/api/v1/users/${userId}/factors/${factorId}/resend"
```

##### Enroll and auto-activate Okta Call Factor

To enroll and immediately activate the Okta `call` factor, add the `activate` option to the enroll API and set it to `true`. An activation call isn't made to the device.

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "call",
  "provider": "OKTA",
  "profile": {
    "phoneNumber": "+1-555-415-1337",
    "phoneExtension": "1234"
  }
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors?activate=true"
```

#### Enroll Okta Verify TOTP Factor

Enrolls a user with an Okta `token:software:totp` factor. The factor must be [activated](#activate-totp-factor) after enrollment by following the `activate` link relation to complete the enrollment process.

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "token:software:totp",
  "provider": "OKTA"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors"
```

##### Response example

```json
{
  "id": "ostf1fmaMGJLMNGNLIVG",
  "factorType": "token:software:totp",
  "provider": "OKTA",
  "vendorName": "OKTA",
  "status": "PENDING_ACTIVATION",
  "created": "2014-07-16T16:13:56.000Z",
  "lastUpdated": "2014-07-16T16:13:56.000Z",
  "profile": {
    "credentialId": "dade.murphy@example.com"
  },
  "_links": {
    "activate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf1fmaMGJLMNGNLIVG/lifecycle/activate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf1fmaMGJLMNGNLIVG",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  },
  "_embedded": {
    "activation": {
      "timeStep": 30,
      "sharedSecret": "JBTWGV22G4ZGKV3N",
      "encoding": "base32",
      "keyLength": 6
    },
    "_links": {
      "qrcode": {
        "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf1fmaMGJLMNGNLIVG/qr/00fukNElRS_Tz6k-CFhg3pH4KO2dj2guhmaapXWbc4",
        "type": "image/png"
      }
    }
  }
}
```

#### Enroll Okta Verify Push Factor

Enrolls a user with the Okta Verify `push` Factor. The Factor must be [activated on the device](#activate-push-factor) by scanning the QR code or visiting the activation link sent through email or SMS.

> **Note:** Use the published activation links to embed the QR code or distribute an activation `email` or `sms`.

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "push",
  "provider": "OKTA"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors"
```

##### Response example

```json
{
  "id": "opfbtzzrjgwauUsxO0g4",
  "factorType": "push",
  "provider": "OKTA",
  "vendorName": "OKTA",
  "status": "PENDING_ACTIVATION",
  "created": "2015-11-13T07:34:22.000Z",
  "lastUpdated": "2015-11-13T07:34:22.000Z",
  "_links": {
    "poll": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfbtzzrjgwauUsxO0g4/lifecycle/activate/poll",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfbtzzrjgwauUsxO0g4",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  },
  "_embedded": {
    "activation": {
      "expiresAt": "2015-11-13T07:44:22.000Z",
      "factorResult": "WAITING",
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
}
```

#### Enroll Google Authenticator Factor

Enrolls a user with the Google `token:software:totp` Factor. The Factor must be [activated](#activate-totp-factor) after enrollment by following the `activate` link relation to complete the enrollment process.

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "token:software:totp",
  "provider": "GOOGLE"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors"
```

##### Response example

```json
{
  "id": "ostf1fmaMGJLMNGNLIVG",
  "factorType": "token:software:totp",
  "provider": "GOOGLE",
  "vendorName": "GOOGLE",
  "status": "PENDING_ACTIVATION",
  "created": "2014-07-16T16:13:56.000Z",
  "lastUpdated": "2014-07-16T16:13:56.000Z",
  "profile": {
    "credentialId": "dade.murphy@example.com"
  },
  "_links": {
    "activate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf1fmaMGJLMNGNLIVG/lifecycle/activate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf1fmaMGJLMNGNLIVG",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  },
  "_embedded": {
    "activation": {
      "timeStep": 30,
      "sharedSecret": "JBTWGV22G4ZGKV3N",
      "encoding": "base32",
      "keyLength": 16,
      "_links": {
        "qrcode": {
          "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf1fmaMGJLMNGNLIVG/qr/00fukNElRS_Tz6k-CFhg3pH4KO2dj2guhmaapXWbc4",
          "type": "image/png"
        }
      }
    }
  }
}
```

#### Enroll RSA SecurID Factor

Enrolls a user with a RSA SecurID Factor and a [token profile](#token-profile). RSA tokens must be verified with the [current pin+passcode](#factor-verification-object) as part of the enrollment request.

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "token",
  "provider": "RSA",
  "profile": {
    "credentialId": "dade.murphy@example.com"
  },
  "verify": {
    "passCode": "5275875498"
  }
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors"
```

##### Response example

```json
{
  "id": "rsabtznMn6cp94ez20g4",
  "factorType": "token",
  "provider": "RSA",
  "vendorName": "RSA",
  "status": "ACTIVE",
  "created": "2015-11-13T07:05:53.000Z",
  "lastUpdated": "2015-11-13T07:05:53.000Z",
  "profile": {
    "credentialId": "dade.murphy@example.com"
  },
  "_links": {
    "verify": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/rsabtznMn6cp94ez20g4/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/rsabtznMn6cp94ez20g4",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
```

#### Enroll Symantec VIP Factor

Enrolls a user with a Symantec VIP Factor and a [token profile](#token-profile). Symantec tokens must be verified with the [current and next passcodes](#factor-verification-object) as part of the enrollment request.

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "token",
  "provider": "SYMANTEC",
  "profile": {
    "credentialId": "VSMT14393584"
  },
  "verify": {
    "passCode": "875498",
    "nextPassCode": "678195"
  }
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors"
```

##### Response example

```json
{
  "id": "ufvbtzgkYaA7zTKdQ0g4",
  "factorType": "token",
  "provider": "SYMANTEC",
  "vendorName": "SYMANTEC",
  "status": "ACTIVE",
  "created": "2015-11-13T06:52:08.000Z",
  "lastUpdated": "2015-11-13T06:52:08.000Z",
  "profile": {
    "credentialId": "VSMT14393584"
  },
  "_links": {
    "verify": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ufvbtzgkYaA7zTKdQ0g4/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ufvbtzgkYaA7zTKdQ0g4",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
```

#### Upload YubiKey OTP Seed

<ApiOperation method="post" url="/api/v1/org/factors/yubikey_token/tokens" />

Uploads a seed for a YubiKey OTP to be enrolled by a user

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "serialNumber": "7886622",
    "publicId": "ccccccijgibu",
    "privateId": "b74be6169486",
    "aesKey": "1fcc6d8ce39bf1604e0b17f3e0a11067"
}' "https://${yourOktaDomain}/api/v1/org/factors/yubikey_token/tokens"
```

##### Response example

```json
{
    "id": "ykkut4G6ti62DD8Dy0g3",
    "created": "2020-01-10T23:04:10.000Z",
    "lastVerified": "2020-01-10T23:04:10.000Z",
    "lastUpdated": "2020-01-10T23:04:10.000Z",
    "status": "UNASSIGNED",
    "profile": {
        "serial": "000007886622"
    },
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/org/factors/yubikey_token/tokens/ykkut4G6ti62DD8Dy0g3",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE"
                ]
            }
        }
    }
}
```

#### Enroll YubiKey Factor

Enrolls a user with a YubiCo Factor (YubiKey). YubiKeys must be verified with the [current passcode](#factor-verification-object) as part of the enrollment request.

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "token:hardware",
  "provider": "YUBICO",
  "verify": {
    "passCode": "cccccceukngdfgkukfctkcvfidnetljjiknckkcjulji"
  }
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors"
```

##### Response example

```json
{
  "id": "ykfbty3BJeBgUi3750g4",
  "factorType": "token:hardware",
  "provider": "YUBICO",
  "vendorName": "YUBICO",
  "status": "ACTIVE",
  "created": "2015-11-13T05:27:49.000Z",
  "lastUpdated": "2015-11-13T05:27:49.000Z",
  "profile": {
    "credentialId": "000004102994"
  },
  "_links": {
    "verify": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ykfbty3BJeBgUi3750g4/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "hhttps://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ykfbty3BJeBgUi3750g4",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
```

#### Enroll Okta Email Factor

Enrolls a user with an Email Factor. An email with an OTP is sent to the primary or secondary (depending on which one is enrolled) email address of the user during enrollment. The Factor must be [activated](#activate-email-factor) by following the `activate` link relation to complete the enrollment process. An optional `tokenLifetimeSeconds` can be specified as a query parameter to indicate the lifetime of the OTP. The default lifetime is 300 seconds. `tokenLifetimeSeconds` should be in the range of 1 to 86400 inclusive.

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "email",
  "provider": "OKTA",
  "profile": {
      "email": "test@gmail.com"
  }
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors?tokenLifetimeSeconds=600"
```

##### Response example

```json
{
    "id": "emfnf3gSScB8xXoXK0g3",
    "factorType": "email",
    "provider": "OKTA",
    "vendorName": "OKTA",
    "status": "PENDING_ACTIVATION",
    "_links": {
        "activate": {
            "href": "https://${yourOktaDomain}/api/v1/users/00umvfJKwXOQ1mEL50g3/factors/emfnf3gSScB8xXoXK0g3/lifecycle/activate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "resend": [
            {
                "name": "email",
                "href": "https://${yourOktaDomain}/api/v1/users/00umvfJKwXOQ1mEL50g3/factors/emfnf3gSScB8xXoXK0g3/resend",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            }
        ],
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/users/00umvfJKwXOQ1mEL50g3/factors/emfnf3gSScB8xXoXK0g3",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "user": {
            "href": "https://${yourOktaDomain}/api/v1/users/00umvfJKwXOQ1mEL50g3",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```

###### Invalid email address response

```json
{
    "errorCode": "E0000001",
    "errorSummary": "Api validation failed: Only verified primary or secondary email can be enrolled.",
    "errorLink": "E0000001",
    "errorId": "oaeeJunJcxXQlCsrYEwGzN2LQ",
    "errorCauses": []
}
```

##### Enroll and auto-activate Okta Email Factor

To enroll and immediately activate the Okta `email` Factor, add the `activate` option to the enroll API and set it to `true`. An activation email isn't sent to the user.

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "email",
  "provider": "OKTA",
  "profile": {
      "email": "test@gmail.com"
  }
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors?activate=true"
```

#### Enroll U2F Factor

Enrolls a user with a U2F Factor. The enrollment process starts with getting a `nonce` from Okta and using that to get registration information from the U2F key using the U2F Javascript API.

##### Enroll U2F request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "u2f",
  "provider": "FIDO"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors"
```

##### Enroll U2F response example

```json
{
  "id":"fuf2rovRxogXJ0nDy0g4",
  "factorType":"u2f",
  "provider":"FIDO",
  "vendorName":"FIDO",
  "status":"PENDING_ACTIVATION",
  "created":"2018-05-24T20:43:19.000Z",
  "lastUpdated":"2018-05-24T20:43:19.000Z",
  "_links":{
    "activate":{
      "href":"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/fuf2rovRxogXJ0nDy0g4/lifecycle/activate",
      "hints":{
        "allow":[
          "POST"
        ]
      }
    },
    "self":{
      "href":"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/fuf2rovRxogXJ0nDy0g4",
      "hints":{
        "allow":[
          "GET"
        ]
      }
    },
    "user":{
      "href":"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints":{
        "allow":[
          "GET"
        ]
      }
    }
  },
  "_embedded":{
    "activation":{
      "version":"U2F_V2",
      "nonce":"9DmGJDLvaU6KWxJbfrZ0",
      "timeoutSeconds":20
    }
  }
}
```

#### Enroll WebAuthn Factor

Enrolls a user with a WebAuthn Factor. The enrollment process starts with getting the WebAuthn credential creation options that are used to help select an appropriate authenticator using the WebAuthn API. This authenticator then generates an enrollment attestation, which may be used to register the authenticator for the user.

##### Enroll WebAuthn response parameters

In the [Embedded Resources](#embedded-resources) object, the `response._embedded.activation` object contains properties used to guide the client in creating a new WebAuthn credential for use with Okta.

For more information about these credential creation options, see the [WebAuthn spec for PublicKeyCredentialCreationOptions](https://www.w3.org/TR/webauthn/#dictionary-makecredentialoptions).

##### Enroll WebAuthn request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "webauthn",
  "provider": "FIDO"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors"
```

##### Enroll WebAuthn response example

```json
{
  "id":"fwf2rovRxogXJ0nDy0g4",
  "factorType":"webauthn",
  "provider":"FIDO",
  "vendorName":"FIDO",
  "status":"PENDING_ACTIVATION",
  "created":"2018-05-24T20:43:19.000Z",
  "lastUpdated":"2018-05-24T20:43:19.000Z",
  "_links":{
    "activate":{
      "href":"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/fwf2rovRxogXJ0nDy0g4/lifecycle/activate",
      "hints":{
        "allow":[
          "POST"
        ]
      }
    },
    "self":{
      "href":"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/fwf2rovRxogXJ0nDy0g4",
      "hints":{
        "allow":[
          "GET"
        ]
      }
    },
    "user":{
      "href":"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints":{
        "allow":[
          "GET"
        ]
      }
    }
  },
  "_embedded":{
    "activation": {
      "attestation": "direct",
      "authenticatorSelection": {
        "userVerification": "preferred",
        "requireResidentKey": false
      },
      "challenge": "cdsZ1V10E0BGE4GcG3IK",
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
      "user": {
        "displayName": "First Last",
        "name": "first.last@gmail.com",
        "id": "00u15s1KDETTQMQYABRL"
      }
    }
  }
}
```

#### Enroll Custom HOTP Factor

Enrolls a user with a Custom HMAC-based One-Time Password (HOTP) Factor. The enrollment process involves passing a Factor profile ID and shared secret for a particular token.

> **Note:** Currently only auto-activation is supported for Custom HOTP Factor.

##### Enroll and auto-activate Custom HOTP Factor

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "token:hotp",
  "provider": "CUSTOM",
  "factorProfileId": "fpr20l2mDyaUGWGCa0g4",
  "profile": {
      "sharedSecret": "484f97be3213b117e3a20438e291540a"
  }
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors?activate=true"
```

##### Enroll Custom HOTP Factor response example

```json
{
    "id": "chf20l33Ks8U2Zjba0g4",
    "factorType": "token:hotp",
    "provider": "CUSTOM",
    "vendorName": "Entrust Datacard",
    "status": "ACTIVE",
    "created": "2019-07-22T23:22:36.000Z",
    "lastUpdated": "2019-07-22T23:22:36.000Z",
    "_links": {
        "self": {
            "href": "http://${yourOktaDomain}/api/v1/users/00utf43LCCmTJVcsK0g3/factors/chf20l33Ks8U2Zjba0g4",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE"
                ]
            }
        },
        "verify": {
            "href": "http://${yourOktaDomain}/api/v1/users/00utf43LCCmTJVcsK0g3/factors/chf20l33Ks8U2Zjba0g4/verify",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "user": {
            "href": "http://${yourOktaDomain}/api/v1/users/00utf43LCCmTJVcsK0g3",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```

### Activate Factor

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/lifecycle/activate" />

The `sms` and `token:software:totp` [Factor types](#factor-type) require activation to complete the enrollment process.

- [Activate TOTP Factor](#activate-totp-factor)
- [Activate SMS Factor](#activate-sms-factor)
- [Activate Call Factor](#activate-call-factor)
- [Activate Push Factor](#activate-push-factor)
- [Activate Email Factor](#activate-email-factor)
- [Activate U2F Factor](#activate-u2f-factor)
- [Activate WebAuthn Factor](#activate-webauthn-factor)

#### Activate TOTP Factor

Activates a `token:software:totp` Factor by verifying the OTP

##### Request Parameters

| Parameter    | Description                                         | Param Type | DataType | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- | ------- |
| factorId     | `id` of a Factor returned from enrollment           | URL        | String   | TRUE     |         |
| passCode     | OTP generated by device                             | Body       | String   | TRUE     |         |
| userId       | `id` of a User                                      | URL        | String   | TRUE     |         |

##### Response parameters

If the passcode is correct the response contains the [Factor](#factor-object) with an `ACTIVE` status.

If the passcode is invalid the response is a `403 Forbidden` status code with the following error:

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

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf1fmaMGJLMNGNLIVG/lifecycle/activate"
```

##### Response example

```json
{
  "id": "ostf1fmaMGJLMNGNLIVG",
  "factorType": "token:software:totp",
  "provider": "OKTA",
  "vendorName": "OKTA",
  "status": "ACTIVE",
  "created": "2014-07-16T16:13:56.000Z",
  "lastUpdated": "2014-08-06T00:31:07.000Z",
  "profile": {
    "credentialId": "dade.murphy@example.com"
  },
  "_links": {
    "verify": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf1fmaMGJLMNGNLIVG/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf1fmaMGJLMNGNLIVG",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
```

#### Activate SMS Factor

Activates an `sms` factor by verifying the OTP. The request/response is identical to [activating a TOTP Factor](#activate-totp-factor).

##### Request parameters

| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| factorId     | `id` of a Factor returned from enrollment           | URL        | String   | TRUE     |
| passCode     | OTP sent to mobile device                           | Body       | String   | TRUE     |
| userId       | `id` of a User                                      | URL        | String   | TRUE     |

##### Response parameters

If the passcode is correct, the response contains the [Factor](#factor-object) with an `ACTIVE` status.

If the passcode is invalid, the response is a `403 Forbidden` status code with the following error:

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

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/sms1o51EADOTFXHHBXBP/lifecycle/activate"
```

##### Response example

```json
{
  "id": "sms1o51EADOTFXHHBXBP",
  "factorType": "sms",
  "provider": "OKTA",
  "vendorName": "OKTA",
  "status": "ACTIVE",
  "created": "2014-08-06T16:56:31.000Z",
  "lastUpdated": "2014-08-06T16:56:31.000Z",
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  },
  "_links": {
    "verify": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/sms1o51EADOTFXHHBXBP/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/sms1o51EADOTFXHHBXBP",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
```

#### Activate Call Factor

Activates a `call` Factor by verifying the OTP. The request/response is identical to [activating a TOTP Factor](#activate-totp-factor).

##### Request parameters

| Parameter    | Description                                         | Param Type | DataType | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- | ------- |
| factorId     | `id` of a Factor returned from enrollment           | URL        | String   | TRUE     |         |
| passCode     | OTP sent to mobile device                           | Body       | String   | TRUE     |         |
| userId       | `id` of a User                                      | URL        | String   | TRUE     |         |

##### Response parameters

If the passcode is correct, the response contains the [Factor](#factor-object) with an `ACTIVE` status.

If the passcode is invalid, the response is a `403 Forbidden` status code with the following error:

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

##### Request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "12345"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/clf1o51EADOTFXHHBXBP/lifecycle/activate"
```

##### Response example

```json
{
  "id": "clf1o51EADOTFXHHBXBP",
  "factorType": "call",
  "provider": "OKTA",
  "vendorName": "OKTA",
  "status": "ACTIVE",
  "created": "2014-08-06T16:56:31.000Z",
  "lastUpdated": "2014-08-06T16:56:31.000Z",
  "profile": {
    "phoneNumber": "+1-555-415-1337",
    "phoneExtension": "1234"
  },
  "_links": {
    "verify": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/clf1o51EADOTFXHHBXBP/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/clf1o51EADOTFXHHBXBP",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
```

#### Activate Push Factor

Activation of `push` Factors are asynchronous and must be polled for completion when the `factorResult` returns a `WAITING` status.

Activations have a short lifetime (minutes) and `TIMEOUT` if they aren't completed before the `expireAt` timestamp. Use the published `activate` link to restart the activation process if the activation is expired.

##### Request parameters

| Parameter | Description      | Param Type | DataType | Required | Default |
| --------- | --------------   | ---------- | -------- | -------- | ------- |
| factorId  | `id` of a Factor | URL        | String   | TRUE     |         |
| userId    | `id` of a User   | URL        | String   | TRUE     |         |

##### Response parameters

| Parameter        | Description                    | Param Type | DataType                                                        | Required | Default |
| ---------------- | ------------------------------ | ---------- | --------------------------------------------------------------- | -------- | ------- |
| activationResult | Asynchronous activation result | Body       | [Push Factor Activation object](#push-factor-activation-object) | TRUE     |         |

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/opf3hkfocI4JTLAju0g4/lifecycle/activate"
```

##### Response example (waiting)

```json
{
  "expiresAt": "2015-04-01T15:57:32.000Z",
  "factorResult": "WAITING",
  "_links": {
    "poll": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/opf3hkfocI4JTLAju0g4/lifecycle/activate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "qrcode": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/opf3hkfocI4JTLAju0g4/qr/00fukNElRS_Tz6k-CFhg3pH4KO2dj2guhmaapXWbc4",
      "type": "image/png"
    },
    "send": [
      {
        "name": "email",
        "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/opf3hkfocI4JTLAju0g4/lifecycle/activate/email",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      {
        "name": "sms",
        "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/opf3hkfocI4JTLAju0g4/lifecycle/activate/sms",
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
    "factorResult": "TIMEOUT",
    "_links": {
        "activate": {
            "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/opf3hkfocI4JTLAju0g4/lifecycle/activate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

##### Response example (activated)

```json
{
    "id": "opf3hkfocI4JTLAju0g4",
    "factorType": "push",
    "provider": "OKTA",
    "vendorName": "OKTA",
    "status": "ACTIVE",
    "created": "2015-03-16T18:01:28.000Z",
    "lastUpdated": "2015-08-27T14:25:17.000Z",
    "profile": {
      "credentialId": "dade.murphy@example.com",
      "deviceType": "SmartPhone_IPhone",
      "name": "Gibson",
      "platform": "IOS",
      "version": "9.0"
    },
    "_links": {
        "verify": {
            "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/opf3hkfocI4JTLAju0g4/verify",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/opf3hkfocI4JTLAju0g4",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE"
                ]
            }
        },
        "user": {
            "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```

#### Activate Email Factor

Activates an `email` Factor by verifying the OTP

##### Request parameters

| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| factorId     | `id` of a Factor returned from enrollment           | URL        | String   | TRUE     |
| passCode     | OTP sent to email                                   | Body       | String   | TRUE     |
| userId       | `id` of a User                                      | URL        | String   | TRUE     |

##### Response parameters

If the passcode is correct, the response contains the [Factor](#factor-object) with an `ACTIVE` status.

If the passcode is invalid, the response is `403 Forbidden` with the following error:

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

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/emfnf3gSScB8xXoXK0g3/lifecycle/activate"
```

##### Response example (activated)

```json
{
    "id": "emfnf3gSScB8xXoXK0g3",
    "factorType": "email",
    "provider": "OKTA",
    "vendorName": "OKTA",
    "status": "ACTIVE",
    "profile": {
        "email": "changed@clouditude.net"
    },
    "_links": {
        "verify": {
            "href": "https://${yourOktaDomain}/api/v1/users/00umvfJKwXOQ1mEL50g3/factors/emfnf3gSScB8xXoXK0g3/verify",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/users/00umvfJKwXOQ1mEL50g3/factors/emfnf3gSScB8xXoXK0g3",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE"
                ]
            }
        },
        "user": {
            "href": "https://${yourOktaDomain}/api/v1/users/00umvfJKwXOQ1mEL50g3",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```

#### Activate U2F Factor

Activation gets the registration information from the U2F token using the API and passes it to Okta.

##### Get registration information from U2F token by calling the U2F Javascript API

```html
<!-- Get the u2f-api.js from https://github.com/google/u2f-ref-code/tree/master/u2f-gae-demo/war/js -->
<script src="/u2f-api.js"></script>
<script>
  // Use the origin of your app that is calling the factors API
  var appId = "https://foo.example.com";

  // Use the version and nonce from the activation object
  var registerRequests = [
    {
      version: response._embedded.activation.version,
      challenge: response._embedded.activation.nonce
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

Activate a U2F Factor by verifying the registration data and client data.

##### Activate U2F request parameters

| Parameter         | Description                                                | Param Type | DataType | Required |
| ----------------- | ---------------------------------------------------------- | ---------- | -------- | -------- |
| clientData        | Base64-encoded client data from the U2F JavaScript call        | Body       | String   | TRUE     |
| factorId          | `id` of the Factor returned from enrollment                    | URL        | String   | TRUE     |
| registrationData  | Base64-encoded registration data from the U2F JavaScript call  | Body       | String   | TRUE     |

##### Activate U2F response parameters

[Authentication Transaction object](#authentication-transaction-object) with the current [state](#transaction-state) for the authentication transaction

If the registration `nonce` is invalid or if registration data is invalid, the response is a `403 Forbidden` status code with the following error:

```JSON
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
-H "Authorization: SSWS ${api_token}" \
-d '{
  "registrationData":"BQTEMUyOM8h1TiZG4DL-RdMr-tYgTYSf62Y52AmwEFTiSYWIRVO5L-MwWdRJOthmV3J3JrqpmGfmFb820-awx1YIQFlTvkMhxItHlpkzahEqicpw7SIH9yMfTn2kaDcC6JaLKPfV5ds0vzuxF1JJj3gCM01bRC-HWI4nCVgc-zaaoRgwggEcMIHDoAMCAQICCwD52fCSMoNczORdMAoGCCqGSM49BAMCMBUxEzARBgNVBAMTClUyRiBJc3N1ZXIwGhcLMDAwMTAxMDAwMFoXCzAwMDEwMTAwMDBaMBUxEzARBgNVBAMTClUyRiBEZXZpY2UwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQFKJupuUgPQcRHUphaW5JPfLvkkwlEwlHKk_ntSp7MS4aTHJyGnpziqncrjiTC_oUVtb-wN-y_t_IMIjueGkhxMAoGCCqGSM49BAMCA0gAMEUCIQDBo6aOLxanIUYnBX9iu3KMngPnobpi0EZSTkVtLC8_cwIgC1945RGqGBKfbyNtkhMifZK05n7fU-gW37Bdnci5D94wRQIhAJv3VvclbRkHAQhaUR8rr8qFTg9iF-GtHoXU95vWaQdyAiAbEr-440U4dQAZF-Sj8G2fxgh5DkgkkWpyUHZhz7N9ew",
  "clientData":"eyJ0eXAiOiJuYXZpZ2F0b3IuaWQuZmluaXNoRW5yb2xsbWVudCIsImNoYWxsZW5nZSI6IlhxR0h0RTBoUkxuVEoxYUF5U1oyIiwib3JpZ2luIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6MzAwMCIsImNpZF9wdWJrZXkiOiJ1bnVzZWQifQ"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/fuf2rovRxogXJ0nDy0g4/lifecycle/activate"
```

##### Activate U2F response example

```json
{
  "id":"fuf2rovRxogXJ0nDy0g4",
  "factorType":"u2f",
  "provider":"FIDO",
  "vendorName":"FIDO",
  "status":"ACTIVE",
  "created":"2018-05-24T20:43:19.000Z",
  "lastUpdated":"2018-05-24T21:43:32.000Z",
  "profile":{
    "credentialId":"WVO-QyHEi0eWmTNqESqJynDtIgf3Ix9OfaRoNwLoloso99Xl2zS_O7EXUkmPeAIzTVtEL4dYjicJWBz7NpqhGA",
    "version":"U2F_V2"
  },
  "_links":{
    "self":{
      "href":"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/fuf2rovRxogXJ0nDy0g4",
      "hints":{
        "allow":[
          "GET",
          "DELETE"
        ]
      }
    },
    "verify":{
      "href":"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/fuf2rovRxogXJ0nDy0g4/verify",
      "hints":{
        "allow":[
          "POST"
        ]
      }
    },
    "user":{
      "href":"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints":{
        "allow":[
          "GET"
        ]
      }
    }
  }
}
```

#### Activate WebAuthn Factor

Activation gets the registration information from the WebAuthn authenticator using the API and passes it to Okta.

##### Get registration information from WebAuthn authenticator by calling the WebAuthn Javascript API

```html
<!-- Using CryptoUtil.js from https://github.com/okta/okta-signin-widget/blob/master/src/util/CryptoUtil.js -->
<script>
// Convert activation object's challenge and user id from string to binary
response._embedded.activation.challenge = CryptoUtil.strToBin(response._embedded.activation.challenge);
response._embedded.activation.user.id = CryptoUtil.strToBin(response._embedded.activation.user.id);

// navigator.credentials is a global object on WebAuthn-supported clients, used to access WebAuthn API
navigator.credentials.create({
  publicKey: response._embedded.activation
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

Activate a WebAuthn Factor by verifying the attestation and client data.

##### Activate WebAuthn request parameters


| Parameter         | Description                                                     | Param Type | DataType | Required |
| ----------------- | --------------------------------------------------------------- | ---------- | -------- | -------- |
| attestation       | Base64-encoded attestation from the WebAuthn JavaScript call        | Body       | String   | TRUE     |
| clientData        | Base64-encoded client data from the WebAuthn JavaScript call        | Body       | String   | TRUE     |
| factorId          | `id` of the Factor returned from enrollment                         | URL        | String   | TRUE     |
| stateToken        | [State token](#state-token) for the current transaction             | Body       | String   | TRUE     |


[Authentication Transaction object](#authentication-transaction-object) with the current [state](#transaction-state) for the authentication transaction

If the attestation `nonce` is invalid, or if the attestation or client data are invalid, the response is a `403 Forbidden` status code with the following error:

```JSON
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
-H "Authorization: SSWS ${api_token}" \
-d '{
  "attestation: "o2NmbXRmcGFja2VkZ2F0dFN0bXSiY2FsZyZjc2lnWEgwRgIhAMvf2+dzXlHZN1um38Y8aFzrKvX0k5dt/hnDu9lahbR4AiEAuwtMg3IoaElWMp00QrP/+3Po/6LwXfmYQVfsnsQ+da1oYXV0aERhdGFYxkgb9OHGifjS2dG03qLRqvXrDIRyfGAuc+GzF1z20/eVRV2wvl6tzgACNbzGCmSLCyXx8FUDAEIBvWNHOcE3QDUkDP/HB1kRbrIOoZ1dR874ZaGbMuvaSVHVWN2kfNiO4D+HlAzUEFaqlNi5FPqKw+mF8f0XwdpEBlClAQIDJiABIVgg0a6oo3W0JdYPu6+eBrbr0WyB3uJLI3ODVgDfQnpgafgiWCB4fFo/5iiVrFhB8pNH2tbBtKewyAHuDkRolcCnVaCcmQ==",
  "clientData": "eyJjaGFsbGVuZ2UiOiJVSk5wYW9sVWt0dF9vcEZPNXJMYyIsIm9yaWdpbiI6Imh0dHBzOi8vcmFpbi5va3RhMS5jb20iLCJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIn0=",
  "stateToken": "00eacMXqkf2pG8K3sBbWqTJNStZpEi9-1Bfwl_mfQT"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/fwf2rovRxogXJ0nDy0g4/lifecycle/activate"
```

##### Activate WebAuthn response example

```json
{
  "id":"fwf2rovRxogXJ0nDy0g4",
  "factorType":"webauthn",
  "provider":"FIDO",
  "vendorName":"FIDO",
  "status":"ACTIVE",
  "created":"2018-05-24T20:43:19.000Z",
  "lastUpdated":"2018-05-24T21:43:32.000Z",
  "profile":{
    "credentialId":"l3Br0n-7H3g047NqESqJynFtIgf3Ix9OfaRoNwLoloso99Xl2zS_O7EXUkmPeAIzTVtEL4dYjicJWBz7NpqhGA",
    "authenticatorName": "MacBook Touch ID"
  },
  "_links":{
    "self":{
      "href":"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/fwf2rovRxogXJ0nDy0g4",
      "hints":{
        "allow":[
          "GET",
          "DELETE"
        ]
      }
    },
    "verify":{
      "href":"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/fwf2rovRxogXJ0nDy0g4/verify",
      "hints":{
        "allow":[
          "POST"
        ]
      }
    },
    "user":{
      "href":"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints":{
        "allow":[
          "GET"
        ]
      }
    }
  }
}
```

### Reset Factor

<ApiOperation method="delete" url="/api/v1/users/${userId}/factors/${factorId}" />

Unenrolls an existing Factor for the specified user, allowing the user to enroll a new Factor

##### Request parameters

| Parameter    | Description                                         | Param Type | DataType | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- | ------- |
| factorId     | `id` of the Factor to reset                         | URL        | String   | TRUE     |         |
| userId       | `id` of a User                                      | URL        | String   | TRUE     |         |

##### Response parameters

`204 No Content`

##### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ufs1o01OTMGHLAJPVHDZ"
```

##### Response example

`204 No Content`

## Factors that require a challenge and verify operation

Some Factors require a challenge to be issued by Okta to initiate the transaction.

### Issue an SMS Factor challenge

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Sends an OTP for an `sms` Factor to the specified user's phone.

##### Request parameters

| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| factorId     | `id` of a Factor                                    | URL        | String   | TRUE     |
| templateId   | `id` of an SMS template                             | Query      | String   | FALSE    |
| userId       | `id` of a User                                      | URL        | String   | TRUE     |

##### Response parameters

| Parameter    | Description                                         | Param Type | DataType                                             | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | ---------------------------------------------------  | -------- | ------- |
| factorResult | Verification result                                 | Body       | [Factor Verify Result](#factor-verify-result-object) | TRUE     |         |
| profile      | SMS profile                                         | Body       | [SMS profile](#sms-profile)                          | TRUE     |         |


A `429 Too Many Requests` status code may be returned if you attempt to resend an SMS challenge (OTP) within the same time window.

> **Notes:** The current rate limit is one SMS challenge per device every 30 seconds.<br><br> Okta round-robins between SMS providers with every resend request to help ensure delivery of an SMS OTP across different carriers.

```json
{
    "errorCode": "E0000109",
    "errorSummary": "An SMS message was recently sent. Please wait 30 seconds before trying again.",
    "errorLink": "E0000109",
    "errorId": "oaeneEaQF8qQrepOWHSkdoejw",
    "errorCauses": []
}
```

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/smsszf1YNUtGWTx4j0g3/verify"
```

##### Response example

```json
{
    "factorResult": "CHALLENGE",
    "profile": {
        "phoneNumber": "+12532236986"
    },
    "_links": {
        "verify": {
            "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/smsszf1YNUtGWTx4j0g3/verify",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "factor": {
            "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/smsszf1YNUtGWTx4j0g3",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE"
                ]
            }
        }
    }
}
```

#### Issuing an SMS Factor challenge using a custom template

Customize (and optionally localize) the SMS message sent to the user on verification.

* If the request has an `Accept-Language` header and the template contains translation for that language, the SMS message is sent in that language.
* If the language provided in the `Accept-Language` header doesn't exist in the template definition, the SMS message is sent using the template text.
* If the provided `templateId` doesn't match an existing template, the SMS message is sent using the default template.

To create custom templates, see [Templates](/docs/reference/api/templates/#add-sms-template).

###### Request example

Sends the verification message in German, assuming that the SMS template is configured with a German translation

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Accept-Language: de" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://${yourOktaDomain}/api/v1/users/${userId}/factors/${factorId}/verify?templateId=${templateId}"
```

### Verify an SMS Factor challenge

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Verifies an OTP sent by an `sms` Factor challenge

##### Request Parameters

| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| factorId     | `id` of a Factor                                    | URL        | String   | TRUE     |
| passCode     | OTP sent to device                                  | Body       | String   | FALSE    |
| userId       | `id` of a User                                      | URL        | String   | TRUE     |

> **Note:** If you omit `passCode` in the request a new challenge is initiated and a new OTP sent to the device.

##### Response parameters

| Parameter    | Description                                         | Param Type | DataType                                             | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | ---------------------------------------------------  | -------- | ------- |
| factorResult | Verification result                                 | Body       | [Factor verify result](#factor-verify-result-object) | TRUE     |         |


If the passcode is invalid the response is a `403 Forbidden` status code with the following error:

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

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/smsszf1YNUtGWTx4j0g3/verify"
```

##### Response example

```json
{
  "factorResult": "SUCCESS"
}
```

### Issue a Call Factor challenge

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Sends an OTP for a `call` Factor to the user's phone

##### Request parameters

| Parameter    | Description                                         | Param Type | DataType | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- | ------- |
| factorId     | `id` of a Factor                                    | URL        | String   | TRUE     |         |
| userId       | `id` of a User                                      | URL        | String   | TRUE     |         |

##### Response parameters

| Parameter    | Description                                         | Param Type | DataType                                             | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | ---------------------------------------------------  | -------- | ------- |
| factorResult | Verification result                                 | Body       | [Factor verify result](#factor-verify-result-object) | TRUE     |         |
| profile      | Call profile                                        | Body       | [Call profile](#call-profile)                        | TRUE     |         |


A `429 Too Many Requests` status code may be returned if you attempt to resend a voice call challenge (OTP) within the same time window.

> **Note:** The current rate limit is one voice call challenge per device every 30 seconds.

```json
{
    "errorCode": "E0000047",
    "errorSummary": "API call exceeded rate limit due to too many requests.",
    "errorLink": "E0000047",
    "errorId": "oaeneEaQF8qQrepOWHSkdoejw",
    "errorCauses": []
}
```

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/clff17zuKEUMYQAQGCOV/verify"
```

##### Response example

```json
{
    "factorResult": "CHALLENGE",
    "profile": {
        "phoneNumber": "+12532236986",
        "phoneExtension": "1234"
    },
    "_links": {
        "verify": {
            "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/clff17zuKEUMYQAQGCOV/verify",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "factor": {
            "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/clff17zuKEUMYQAQGCOV",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE"
                ]
            }
        }
    }
}
```

### Verify a Call Factor challenge

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Verifies an OTP sent by a `call` Factor challenge

##### Request parameters

| Parameter    | Description                                         | Param Type | DataType | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- | ------- |
| factorId     | `id` of a Factor                                    | URL        | String   | TRUE     |         |
| passCode     | OTP sent to device                                  | Body       | String   | FALSE    |         |
| userId       | `id` of a User                                      | URL        | String   | TRUE     |         |

> **Note:** If you omit `passCode` in the request, a new challenge is initiated and a new OTP is sent to the phone.

##### Response parameters

| Parameter    | Description                                         | Param Type | DataType                                             | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | ---------------------------------------------------  | -------- | ------- |
| factorResult | Verification result                                 | Body       | [Factor Verify Result](#factor-verify-result-object) | TRUE     |         |

If the passcode is invalid, the response is a `403 Forbidden` status code with the following error:

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

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/clff17zuKEUMYQAQGCOV/verify"
```

##### Response example

```json
{
  "factorResult": "SUCCESS"
}
```

### Issue a Push Factor challenge

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Creates a new transaction and sends an asynchronous push notification to the device for the user to approve or reject. You must [poll the transaction](#poll-for-verify-transaction-completion) to determine when it completes or expires.

##### Start new transaction

##### Request parameters

| Parameter    | Description                                         | Param Type | DataType | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- | ------- |
| factorId     | `id` of a Factor                                    | URL        | String   | TRUE     |         |
| userId       | `id` of a User                                      | URL        | String   | TRUE     |         |

> **Notes:** The client `IP Address` and `User Agent` of the HTTP request is automatically captured and sent in the push notification as additional context.<br><br>You should [always send a valid User-Agent HTTP header](/docs/reference/api-overview/#user-agent) when verifying a push Factor.<br><br> The **public IP address** of your application must be [whitelisted as a gateway IP address](/docs/reference/api-overview/#ip-address) to forward the user agent's original IP address with the `X-Forwarded-For` HTTP header.

##### Response parameters

| Parameter    | Description                                                          | Param Type | DataType                                             | Required |
| ------------ | -------------------------------------------------------------------- | ---------- | ---------------------------------------------------- | -------- |
| factorResult | Verification result (`WAITING`, `SUCCESS`, `REJECTED`, or `TIMEOUT`) | Body       | [Factor verify result](#factor-verify-result-object) | TRUE     |

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36" \
-H "X-Forwarded-For: 23.235.46.133" \
"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/opf3hkfocI4JTLAju0g4/verify"
```

##### Response example

```json
{
  "expiresAt": "2015-04-01T15:57:32.000Z",
  "factorResult": "WAITING",
  "_links": {
    "poll": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfh52xcuft3J4uZc0g3/transactions/mst1eiHghhPxf0yhp0g",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfh52xcuft3J4uZc0g3/transactions/mst1eiHghhPxf0yhp0g",
      "hints": {
        "allow": [
          "DELETE"
        ]
      }
    }
  }
}
```

### Verify a Push Factor challenge

#### Poll for verify transaction completion

<ApiOperation method="get" url="/api/v1/users/${userId}/factors/${factorId}/transactions/${transactionId}" />

Polls a push verification transaction for completion. The transaction result is `WAITING`, `SUCCESS`, `REJECTED`, or `TIMEOUT`.

> **Note:** You should always use the `poll` link relation and never manually construct your own URL.

##### Request parameters

| Parameter     | Description           | Param Type | DataType | Required |
| ------------  | -------------------   | ---------- | -------- | -------- |
| factorId      | `id` of a Factor      | URL        | String   | TRUE     |
| transactionId | `id` of a transaction | URL        | String   | TRUE     |
| userId        | `id` of a User        | URL        | String   | TRUE     |

##### Response parameters

| Parameter    | Description         | Param Type | DataType                                             | Required |
| ------------ | ------------------- | ---------- | ---------------------------------------------------- | -------- |
| factorResult | Verification result | Body       | [Factor Verify Result](#factor-verify-result-object) | TRUE     |

##### Response example (waiting)

```json
{
  "expiresAt": "2015-04-01T15:57:32.000Z",
  "factorResult": "WAITING",
  "_links": {
    "poll": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfh52xcuft3J4uZc0g3/transactions/mst1eiHghhPxf0yhp0g",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfh52xcuft3J4uZc0g3/transactions/mst1eiHghhPxf0yhp0g",
      "hints": {
        "allow": [
          "DELETE"
        ]
      }
    }
  }
}
```

##### Response example (approved)

```json
{
  "factorResult": "SUCCESS"
}
```

##### Response example (rejected)

```json
{
  "factorResult": "REJECTED",
  "_links": {
    "verify": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfh52xcuft3J4uZc0g3/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "factor": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfh52xcuft3J4uZc0g3",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    }
  }
}
```

##### Response example (timeout)

```json
{
  "factorResult": "TIMEOUT",
  "_links": {
    "verify": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfh52xcuft3J4uZc0g3/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "factor": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfh52xcuft3J4uZc0g3",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    }
  }
}
```

### Issue an Email Factor challenge

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Sends an OTP for an `email` Factor to the user's email address

##### Request parameters

| Parameter    | Description                                         | Param Type | DataType | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- | ------- |
| factorId     | `id` of a Factor                                    | URL        | String   | TRUE     |         |
| tokenLifetimeSeconds | Lifetime of the OTP                         | QueryString | Int | FALSE        | 300
| userId       | `id` of a User                                      | URL        | String   | TRUE     |         |

#### Response parameters

| Parameter    | Description                                         | Param Type | DataType                                             | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | ---------------------------------------------------  | -------- | ------- |
| factorResult | Verification result                                 | Body       | [Factor verify result](#factor-verify-result-object) | TRUE     |         |


A `429 Too Many Requests` status code may be returned if you attempt to resend an email challenge (OTP) within the same time window.

> **Note:** The current rate limit is one per email address every five seconds.

```json
{
    "errorCode": "E0000118",
    "errorSummary": "An email was recently sent. Please wait 5 seconds before trying again.",
    "errorLink": "E0000118",
    "errorId": "oae0qf10rGJQQeWFX1OSuStdQ",
    "errorCauses": []
}
```

#### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/emfnf3gSScB8xXoXK0g3/verify?tokenLifetimeSeconds=600"
```

#### Response example

```json
{
    "factorResult": "CHALLENGE",
    "_links": {
        "verify": {
            "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/emfnf3gSScB8xXoXK0g3/verify",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "factor": {
            "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/emfnf3gSScB8xXoXK0g3",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE"
                ]
            }
        }
    }
}
```

### Verify an Email Factor challenge

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Verifies an OTP for an `email` Factor

#### Request parameters

| Parameter    | Description                                         | Param Type | DataType | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- | ------- |
| factorId     | `id` of a Factor                                    | URL        | String   | TRUE     |         |
| passCode     | OTP sent to the email address                           | Body       | String   | FALSE    | ""      |
| userId       | `id` of a User                                      | URL        | String   | TRUE     |         |

> **Note:** If you omit `passCode` in the request, a new challenge is initiated and a new OTP is sent to the email address.

##### Response parameters

| Parameter    | Description                                         | Param Type | DataType                                             | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | ---------------------------------------------------  | -------- | ------- |
| factorResult | Verification result                                 | Body       | [Factor verify result](#factor-verify-result-object) | TRUE     |         |

If the passcode is invalid, the response is `403 Forbidden` with the following error:

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

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/emfnf3gSScB8xXoXK0g3/verify?tokenLifetimeSeconds=600"
```

##### Response example

```json
{
  "factorResult": "SUCCESS"
}
```

### Issue a U2F Factor challenge

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Initiates verification for a `u2f` Factor by getting a challenge `nonce` string

> **Note:** According to the [FIDO spec](https://fidoalliance.org/specs/fido-u2f-v1.2-ps-20170411/fido-appid-and-facets-v1.2-ps-20170411.html#h2_the-appid-and-facetid-assertions), activating and verifying a U2F device with appIds in different DNS zones isn't allowed. For example, if a user activated a U2F device using the Factors API from a server hosted at `https://foo.example.com`, the user can verify the U2F Factor from `https://foo.example.com`, but won't be able to verify it from the Okta portal `https://company.okta.com`. In this instance, the U2F device returns error code 4 - `DEVICE_INELIGIBLE`.

#### Start verification to get challenge nonce

Verification of the U2F Factor starts with getting the challenge `nonce` and U2F token details and then using the client-side
JavaScript API to get the signed assertion from the U2F token.

#### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/fuf2rovRxogXJ0nDy0g4/verify"
```

#### Response example

```json
{
  "factorResult":"CHALLENGE",
  "profile":{
    "credentialId":"GAiiLsVab2m3-zL1Fi3bVtNrM9G6_MntUITHKjxkV24ktGKjLSCRnz72wCEdHCe18IvC69Aia0sE4UpsO0HpFQ",
    "version":"U2F_V2"
  },
  "_links":{
    "verify":{
      "href":"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/fuf2rovRxogXJ0nDy0g4/verify",
      "hints":{
        "allow":[
          "POST"
        ]
      }
    },
    "factor":{
      "href":"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/fuf2rovRxogXJ0nDy0g4",
      "hints":{
        "allow":[
          "GET",
          "DELETE"
        ]
      }
    }
  },
  "_embedded":{
    "challenge":{
      "nonce":"vQFwTt6zKzMV7HFPzjS2",
      "timeoutSeconds":20
    }
  }
}
```

#### Get the signed assertion from the U2F token by calling the U2F Javascript API

```html
<!-- Get the u2f-api.js from https://github.com/google/u2f-ref-code/tree/master/u2f-gae-demo/war/js -->
<script src="/u2f-api.js"></script>
<script>
  // Use the nonce from the challenge object
  var challengeNonce = response._embedded.challenge.nonce;

  // Use the origin of your app that is calling the factors API
  var appId = "https://foo.example.com";

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

#### Post the signed assertion to Okta to complete verification


### Verify a U2F Factor challenge

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Verifies a challenge for a `u2f` Factor by posting a signed assertion using the challenge `nonce`

#### Request example for signed assertion

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "clientData":"eyJ0eXAiOiJuYXZpZ2F0b3IuaWQuZ2V0QXNzZXJ0aW9uIiwiY2hhbGxlbmdlIjoiS2NCLXRqUFU0NDY0ZThuVFBudXIiLCJvcmlnaW4iOiJodHRwczovL2xvY2FsaG9zdDozMDAwIiwiY2lkX3B1YmtleSI6InVudXNlZCJ9",
  "signatureData":"AQAAACYwRgIhAKPktdpH0T5mlPSm_9uGW5w-VaUy-LhI9tIacexpgItkAiEAncRVZURVPOq7zDwIw-OM5LtSkdAxOkfv0ZDVUx3UFHc"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/fuf2rovRxogXJ0nDy0g4/verify"
```

#### Response of U2F verification example

```json
{
  "factorResult":"SUCCESS",
  "profile":{
    "credentialId":"h1bFwJFU9wnelYkexJuQfoUHZ5lX3CgQMTZk4H3I8kM9Nn6XALiQ-BIab4P5EE0GQrA7VD-kAwgnG950aXkhBw",
    "version":"U2F_V2"
  }
}
```

### Issue a WebAuthn Factor challenge

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Initiates verification for a `webauthn` Factor by getting a challenge `nonce` string, as well as WebAuthn credential request options that are used to help select an appropriate authenticator using the WebAuthn API. This authenticator then generates an assertion, which may be used to verify the user.

#### Start verification to get challenge nonce

Verification of the WebAuthn Factor starts with getting the WebAuthn credential request details (including the challenge `nonce`), then using the client-side JavaScript API to get the signed assertion from the WebAuthn authenticator.

For more information about these credential request options, see the [WebAuthn spec for PublicKeyCredentialRequestOptions](https://www.w3.org/TR/webauthn/#dictionary-makecredentialoptions).

#### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/fwf2rovRxogXJ0nDy0g4/verify"
```

#### Response example

```json
{
  "factorResult":"CHALLENGE",
  "profile":{
    "credentialId":"l3Br0n-7H3g047NqESqJynFtIgf3Ix9OfaRoNwLoloso99Xl2zS_O7EXUkmPeAIzTVtEL4dYjicJWBz7NpqhGA",
    "authenticatorName":"MacBook Touch ID"
  },
  "_links":{
    "verify":{
      "href":"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/fwf2rovRxogXJ0nDy0g4/verify",
      "hints":{
        "allow":[
          "POST"
        ]
      }
    },
    "factor":{
      "href":"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/fwf2rovRxogXJ0nDy0g4",
      "hints":{
        "allow":[
          "GET",
          "DELETE"
        ]
      }
    }
  },
  "_embedded":{
    "challenge":{
      "challenge":"vQFwTt6zKzMV7HFPzjS2",
       "extensions":{
       }
    }
  }
}
```

#### Get the signed assertion from the WebAuthn authenticator by calling the WebAuthn Javascript API

```html
<!-- Using CryptoUtil.js from https://github.com/okta/okta-signin-widget/blob/master/src/util/CryptoUtil.js -->
<script>
  // Convert activation object's challenge nonce from string to binary
  response._embedded.challenge.challenge = CryptoUtil.strToBin(response._embedded.challenge.challenge);

  // Call the WebAuthn javascript API to get signed assertion from the WebAuthn authenticator
  navigator.credentials.get({
    publicKey: response._embedded.challenge
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

#### Post the signed assertion to Okta to complete verification

### Verify a WebAuthn Factor challenge

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Verifies a challenge for a `webauthn` Factor by posting a signed assertion using the challenge `nonce`

#### Request parameters

| Parameter      | Description                                         | Param Type | DataType | Required |
| -------------- | --------------------------------------------------- | ---------- | -------- | -------- |
| authenticatorData | Base64-encoded authenticator data from the WebAuthn authenticator    | Body       | String   | TRUE     |
| clientData     | Base64-encoded client data from the WebAuthn authenticator       | Body       | String   | TRUE     |
| factorId       | `id` of the Factor returned from enrollment             | URL        | String   | TRUE     |
| signatureData  | Base64-encoded signature data from the WebAuthn authenticator    | Body       | String   | TRUE     |
| userId         | `id` of a User                                      | URL        | String   | TRUE     |

#### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "clientData":"eyJ0eXAiOiJuYXZpZ2F0b3IuaWQuZ2V0QXNzZXJ0aW9uIiwiY2hhbGxlbmdlIjoiS2NCLXRqUFU0NDY0ZThuVFBudXIiLCJvcmlnaW4iOiJodHRwczovL2xvY2FsaG9zdDozMDAwIiwiY2lkX3B1YmtleSI6InVudXNlZCJ9",
  "authenticatorData": "SBv04caJ+NLZ0bTeotGq9esMhHJ8YC5z4bMXXPbT95UFXbDsOg==",
  "signatureData":"AQAAACYwRgIhAKPktdpH0T5mlPSm_9uGW5w-VaUy-LhI9tIacexpgItkAiEAncRVZURVPOq7zDwIw-OM5LtSkdAxOkfv0ZDVUx3UFHc"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/fwf2rovRxogXJ0nDy0g4/verify"
```

#### Response example

```json
{
  "factorResult":"SUCCESS",
  "profile":{
    "credentialId":"l3Br0n-7H3g047NqESqJynFtIgf3Ix9OfaRoNwLoloso99Xl2zS_O7EXUkmPeAIzTVtEL4dYjicJWBz7NpqhGA",
    "authenticatorName":"MacBook Touch ID"
  }
}
```

## Factors that require only a verification operation

Some factors don't require an explicit challenge to be issued by Okta.

### Verify Security Question Factor

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Verifies an answer to a `question` Factor

##### Request parameters

| Parameter    | Description                                         | Param Type | DataType | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- | ------- |
| answer       | Answer to Security Question                         | Body       | String   | TRUE     |         |
| factorId     | `id` of a Factor                                    | URL        | String   | TRUE     |         |
| userId       | `id` of a User                                      | URL        | String   | TRUE     |         |

##### Response parameters

| Parameter    | Description                                         | Param Type | DataType                  | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | ------------------------  | -------- | ------- |
| factorResult | Verification result                                 | Body       | [Factor Verify Result](#factor-verify-result-object) | TRUE     |         |

If the `answer` is invalid, the response is a `403 Forbidden` status code with the following error:

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

#### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "answer": "mayonnaise"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ufs1pe3ISGKGPYKXRBKK/verify"
```

#### Response example

```json
{
  "factorResult": "SUCCESS"
}
```

### Verify TOTP Factor

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Verifies an OTP for a `token:software:totp` or `token:hotp` Factor

#### Request parameters

| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| factorId     | `id` of a Factor                                    | URL        | String   | TRUE     |
| passCode     | OTP generated by device                             | Body       | String   | TRUE     |
| userId       | `id` of a User                                      | URL        | String   | TRUE     |

#### Response parameters

| Parameter    | Description                                         | Param Type | DataType                           | Required |
| ------------ | --------------------------------------------------- | ---------- | ---------------------------------  | -------- |
| factorResult | Verification result                                 | Body       | [Factor Verify Result](#factor-verify-result-object) | TRUE     |

If the passcode is invalid, the response is a `403 Forbidden` status code with the following error:

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

#### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf17zuKEUMYQAQGCOV/verify"
```

#### Response example

```json
{
  "factorResult": "SUCCESS"
}
```

### Verify Token Factor

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Verifies an OTP for a `token` or `token:hardware` Factor

#### Request parameters

| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| factorId     | `id` of a Factor                                    | URL        | String   | TRUE     |
| passCode     | OTP generated by device                             | Body       | String   | TRUE     |
| userId       | `id` of a User                                      | URL        | String   | TRUE     |

#### Response parameters

| Parameter    | Description                                         | Param Type | DataType                              | Required |
| ------------ | --------------------------------------------------- | ---------- | ------------------------------------- | -------- |
| factorResult | Verification result                                 | Body       | [Factor verify result](#factor-verify-result-object) | TRUE     |

If the passcode is invalid, the response is a `403 Forbidden` status code with the following error:

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

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf17zuKEUMYQAQGCOV/verify"
```

##### Response example

```json
{
  "factorResult": "SUCCESS"
}
```

### Verify YubiKey Factor

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Verifies a user with a [Yubico OTP](https://developers.yubico.com/OTP/OTPs_Explained.html) for a YubiKey `token:hardware` Factor.

#### Request example for verify YubiKey Factor

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf17zuKEUMYQAQGCOV/verify"
```

#### Response example for verify YubiKey Factor

```json
{
  "factorResult": "SUCCESS"
}
```

## Factor object

### Example

```json
{
  "id": "smsk33ujQ59REImFX0g3",
  "factorType": "sms",
  "provider": "OKTA",
  "status": "ACTIVE",
  "created": "2015-02-04T07:07:25.000Z",
  "lastUpdated": "2015-02-04T07:07:25.000Z",
  "profile": {
    "phoneNumber": "+1415551337"
  },
  "_links": {
    "verify": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/smsk33ujQ59REImFX0g3/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/smsk33ujQ59REImFX0g3",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
```

### Factor properties

Factors have the following properties:

| Property       | Description                                                       | DataType                                                                       | Nullable | Unique | Readonly |
| -------------- | ----------------------------------------------------------------  | ------------------------------------------------------------------------------ | -------- | ------ | -------- |
| _embedded      | [Embedded resources](#embedded-resources) related to the Factor   | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                 | TRUE     | FALSE  | TRUE     |
| _links         | [Discoverable resources](#links-object) related to the Factor     | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                 | TRUE     | FALSE  | TRUE     |
| created        | Timestamp when the Factor is created                                 | Date                                                                           | FALSE    | FALSE  | TRUE     |
| factorType     | Type of a Factor                                                  | [Factor type](#factor-type)                                                    | FALSE    | TRUE   | TRUE     |
| id             | Unique key for the Factor, a 20 character long system-generated ID    | String                                                                         | FALSE    | TRUE   | TRUE     |
| lastUpdated    | Timestamp when the Factor was last updated                            | Date                                                                           | FALSE    | FALSE  | TRUE     |
| profile        | Profile of a [supported Factor](#supported-factors-for-providers) | [Factor Profile object](#factor-profile-object)                                | TRUE     | FALSE  | FALSE    |
| provider       | Factor provider                                                   | [Provider type](#provider-type)                                                | FALSE    | TRUE   | TRUE     |
| status         | Status of a Factor                                                | `NOT_SETUP`, `PENDING_ACTIVATION`, `ENROLLED`, `ACTIVE`, `INACTIVE`, `EXPIRED` | FALSE    | FALSE  | TRUE     |
| verify         | Optional verification for Factor enrollment                      | [Factor Verification object](#factor-verification-object)                      | TRUE     | FALSE  | FALSE    |

> **Note:** The `id`, `created`, `lastUpdated`, `status`, `_links`, and `_embedded` properties are only available after a Factor is enrolled.

#### Factor type

The following Factor types are supported:

| Factor Type           | Description                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `call`                | Software [OTP](http://en.wikipedia.org/wiki/One-time_password) sent using voice call to a registered phone number     |
| `email`               | Software [OTP](http://en.wikipedia.org/wiki/One-time_password) sent using email                                       |
| `push`                | Out-of-band verification using push notification to a device and transaction verification with digital signature      |
| `question`            | Additional knowledge-based security question                                                                        |
| `sms`                 | Software [OTP](http://en.wikipedia.org/wiki/One-time_password) sent using SMS to a registered phone number            |
| `token:hardware`      | Hardware One-Time Password [OTP](http://en.wikipedia.org/wiki/One-time_password) device                             |
| `token:hotp`          | A custom [HOTP](https://en.wikipedia.org/wiki/HMAC-based_One-time_Password_algorithm) Factor                        |
| `token:software:totp` | Software [Time-based One-Time Password (TOTP)](http://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm) |
| `token`               | Software or hardware [One-Time Password (OTP)](http://en.wikipedia.org/wiki/One-time_password) device               |
| `u2f`                 | Hardware [U2F](https://en.wikipedia.org/wiki/Universal_2nd_Factor) device                                           |
| `web`                 | HTML inline frame (iframe) for embedding verification from a 3rd party                                              |
| `webauthn`            | Hardware [WebAuthn](https://en.wikipedia.org/wiki/WebAuthn) device                                                  |

#### Provider type

The following providers are supported:

| Provider   | Description                   |
| ---------- | ----------------------------- |
| `DUO`      | Duo Security                  |
| `GOOGLE`   | Google                        |
| `OKTA`     | Okta                          |
| `RSA`      | RSA SecurID                   |
| `SYMANTEC` | Symantec VIP                  |
| `YUBICO`   | Yubico                        |

#### Supported Factors for providers

Each provider supports a subset of a factor types. The following table lists the Factor types supported for each provider:

| Provider   | Factor Type           |
| ---------- | --------------------- |
| `DUO`      | `web`                 |
| `GOOGLE`   | `token:software:totp` |
| `OKTA`     | `call`                |
| `OKTA`     | `email`               |
| `OKTA`     | `push`                |
| `OKTA`     | `question`            |
| `OKTA`     | `sms`                 |
| `OKTA`     | `token:software:totp` |
| `RSA`      | `token`               |
| `SYMANTEC` | `token`               |
| `YUBICO`   | `token:hardware`      |

### Factor Profile object

Profiles are specific to the [Factor type](#factor-type).

#### Question Profile

Specifies the Profile for a `question` Factor

| Property      | Description                         | DataType  | Nullable | Unique  | Readonly |
| ------------- | -------------------------           | --------- | -------- | ------- | -------- |
| answer        | Answer to question, minimum four characters | String    | TRUE     | FALSE   | FALSE    |
| question      | Unique key for question             | String    | FALSE    | TRUE    | TRUE     |
| questionText  | Display text for question           | String    | FALSE    | FALSE   | TRUE     |

```json
{
  "profile": {
    "question": "favorite_art_piece",
    "questionText": "What is your favorite piece of art?"
  }
}
```

#### Built-in question keys

The following are keys for the built-in security questions.

| Question unique key                   |
| ------------------------------------- |
| disliked_food                         |
| name_of_first_plush_toy               |
| first_award                           |
| favorite_security_question            |
| favorite_toy                          |
| first_computer_game                   |
| favorite_movie_quote                  |
| first_sports_team_mascot              |
| first_music_purchase                  |
| favorite_art_piece                    |
| grandmother_favorite_desert           |
| first_thing_cooked                    |
| childhood_dream_job                   |
| first_kiss_location                   |
| place_where_significant_other_was_met |
| favorite_vacation_location            |
| new_years_two_thousand                |
| favorite_speaker_actor                |
| favorite_book_movie_character         |
| favorite_sports_player                |

#### SMS Profile

Specifies the Profile for a `sms` Factor

| Property      | Description                                     | DataType                                                        | Nullable | Unique  | Readonly |
| ------------- | -----------------------------                   | --------------------------------------------------------------- | -------- | ------- | -------- |
| phoneNumber   | Phone number of the mobile device, maximum 15 characters | String [E.164 formatted](http://en.wikipedia.org/wiki/E.164)    | FALSE    | TRUE    | FALSE    |

```json
{
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  }
}
```

E.164 numbers can have a maximum of fifteen digits and are usually written as follows: [+][country code][subscriber number including area code]. Phone numbers that aren't formatted in E.164 may work, but it depends on the phone or handset that is being used as well as the carrier from which the call or SMS originates.

For example, to convert a US phone number (415 599 2671) to E.164 format, you need to add the `+` prefix and the country code (which is 1) in front of the number (+1 415 599 2671). In the UK and many other countries internationally, local dialing requires the addition of a 0 in front of the subscriber number. However, to use E.164 formatting, you must remove the 0. A number such as 020 7183 8750 in the UK would be formatted as +44 20 7183 8750.

#### Call Profile

Specifies the Profile for a `call` Factor

| Property       | Description                                  | DataType                                                        | Nullable | Unique  | Readonly |
| -------------  | -----------------------------                | --------------------------------------------------------------- | -------- | ------- | -------- |
| phoneNumber    | Phone number of the device, maximum 15 characters | String [E.164 formatted](http://en.wikipedia.org/wiki/E.164)    | FALSE    | TRUE    | FALSE    |
| phoneExtension | Extension of the device, maximum 15 characters    | String                                                          | TRUE     | FALSE   | FALSE    |

```json
{
  "profile": {
    "phoneNumber": "+1-555-415-1337",
    "phoneExtension": "1234"
  }
}
```

E.164 numbers can have a maximum of fifteen digits and are usually written as follows: [+][country code][subscriber number including area code]. Phone numbers that aren't formatted in E.164 may work, but it depends on the phone or handset that is being used as well as the carrier from which the call or SMS originates.

For example, to convert a US phone number (415 599 2671) to E.164 format, you need to add the `+` prefix and the country code (which is 1) in front of the number (+1 415 599 2671). In the UK and many other countries internationally, local dialing requires the addition of a 0 in front of the subscriber number. However, to use E.164 formatting, you must remove the 0. A number such as 020 7183 8750 in the UK would be formatted as +44 20 7183 8750.

`PhoneExtension` is optional.

#### Token Profile

Specifies the Profile for a `token`, `token:hardware`, `token:software`, or `token:software:totp` Factor

| Property      | Description        | DataType  | Nullable | Unique  | Readonly |
| ------------- | ------------------ | --------- | -------- | ------- | -------- |
| credentialId  | ID for the credential  | String    | FALSE    | FALSE   | TRUE     |

```json
{
  "profile": {
    "credentialId": "dade.murphy@example.com"
  }
}
```

#### Web Profile

Specifies the Profile for a `web` Factor

| Property      | Description        | DataType  | Nullable | Unique  | Readonly |
| ------------- | ------------------ | --------- | -------- | ------- | -------- |
| credentialId  | ID for the credential  | String    | FALSE    | FALSE   | TRUE     |

```json
{
  "profile": {
    "credentialId": "dade.murphy@example.com"
  }
}
```

#### Email Profile

Specifies the Profile for an `email` Factor

| Property      | Description                                  | DataType                                                        | Nullable | Unique  | Readonly |
| ------------- | -----------------------------                | --------------------------------------------------------------- | -------- | ------- | -------- |
| email         | Email address of the user, maximum 100 characters | String                                                          | FALSE    | TRUE    | FALSE    |

```json
{
  "profile": {
    "email": "alice@okta.com"
  }
}
```

> **Note:** The Email factor can be used:<br><br>- As an out-of-band transactional Factor to send an email challenge to a user. This can be injected into any custom step-up flow and isn't part of Okta Sign-In (it doesn't count as MFA for signing in to Okta). This is currently EA.<br><br>- As a proper Okta 2nd Factor (just like Okta Verify, SMS, and son). This can be configured using the Multifactor page in the Admin Console. The Email Factor is then eligible to be used during Okta sign in as a valid 2nd Factor just like any of other the Factors. This is currently BETA.

### Factor Verification object

Specifies additional verification data for `token` or `token:hardware` Factors

| Property      | Description                 | DataType  | Nullable | Unique  | Readonly |
| ------------- | --------------------------  | --------- | -------- | ------- | -------- |
| nextPassCode  | OTP for next time window    | String    | TRUE     | FALSE   | FALSE    |
| passCode      | OTP for current time window | String    | FALSE    | FALSE   | FALSE    |

```json
{
  "verify": {
    "passCode": "875498",
    "nextPassCode": "678195"
  }
}
```

### Links object

Specifies link relations (See [Web linking](http://tools.ietf.org/html/rfc5988)) available for the current status of a Factor using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification. This object is used for dynamic discovery of related resources and lifecycle operations.

| Link Relation Type | Description                                                                      |
| ------------------ | -------------------------------------------------------------------------------- |
| activate           | [Lifecycle action](#activate-factor) to transition the Factor to `ACTIVE` status     |
| poll               | Polls Factor for completion of the activation of verification                        |
| questions          | List of questions for the `question` Factor type                                 |
| resend             | List of delivery options to resend activation or Factor challenge                |
| self               | The actual Factor                                                                |
| send               | List of delivery options to send an activation or Factor challenge               |
| verify             | [Verify the Factor](#factor-verification-operations)                             |

> **Note:** The Links object is **read-only**.

## Embedded resources

### TOTP Factor Activation object

TOTP Factors when activated have an embedded Activation object that describes the [TOTP](http://tools.ietf.org/html/rfc6238) algorithm parameters.

| Property       | Description                                       | DataType                                                       | Nullable | Unique | Readonly |
| -------------- | ------------------------------------------------- | -------------------------------------------------------------- | -------- | ------ | -------- |
| _links         | Discoverable resources related to the activation  | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |
| encoding       | Encoding of `sharedSecret`                        | `base32` or `base64`                                           | FALSE    | FALSE  | TRUE     |
| keyLength      | Number of digits in an HOTP value                 | Number                                                         | FALSE    | FALSE  | TRUE     |
| sharedSecret   | Unique secret key for prover                      | String                                                         | FALSE    | FALSE  | TRUE     |
| timeStep       | Time-step size for TOTP                           | String                                                         | FALSE    | FALSE  | TRUE     |

```json
{
  "activation": {
    "timeStep": 30,
    "sharedSecret": "HE64TMLL2IUZW2ZLB",
    "encoding": "base32",
    "keyLength": 6
  }
}
```

### Push Factor Activation object

Push Factors must complete activation on the device by scanning the QR code or visiting the activation link sent through email or SMS.

| Property       | Description                                       | DataType                                                       | Nullable | Unique | Readonly |
| -------------- | ------------------------------------------------- | -------------------------------------------------------------- | -------- | ------ | -------- |
| _links         | Discoverable resources related to the activation  | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | FALSE    | FALSE  | TRUE     |
| expiresAt      | Lifetime of activation                            | Date                                                           | FALSE    | FALSE  | TRUE     |
| factorResult   | Result of a Factor activation                     | `WAITING`, `CANCELLED`, `TIMEOUT`, or `ERROR`                  | FALSE    | FALSE  | TRUE     |

```json
{
  "activation": {
    "expiresAt": "2015-11-13T07:44:22.000Z",
    "factorResult": "WAITING",
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

#### Push Factor Activation Links object

Specifies link relations (See [Web linking](http://tools.ietf.org/html/rfc5988)) available for the Push Factor Activation object using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification. This object is used for dynamic discovery of related resources and operations.

| Link Relation Type | Description                                                                        |
| ------------------ | ---------------------------------------------------------------------------------- |
| qrcode             | QR code that encodes the push activation code needed for enrollment on the device  |
| send               | Sends an activation link through `email` or `sms` for users who can't scan the QR code |


### Factor Verify Result object

Describes the outcome of a Factor verification request

| Property      | Description                                       | DataType                        | Nullable | Unique | Readonly |
| ------------- | ------------------------------------------------- | ------------------------------- | -------- | ------ | -------- |
| factorMessage | Optional display message for Factor verification  | String                          | TRUE     | FALSE  | TRUE     |
| factorResult  | Result of a Factor verification                   | [Factor Result](#factor-result) | FALSE    | FALSE  | TRUE     |

#### Factor result

Specifies the status of a Factor verification attempt

| Result                 | Description                                                                                                                                |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------         |
| `CANCELLED`            | The Factor verification was cancelled by the user.                                                                                         |
| `CHALLENGE`            | Another verification is required.                                                                                                          |
| `ERROR`                | An unexpected server error occurred while verifying the Factor.                                                                            |
| `FAILED`               | The Factor verification failed.                                                                                                            |
| `PASSCODE_REPLAYED`    | The Factor was previously verified within the same time window. The user must wait another time window and retry with a new verification. |
| `REJECTED`             | The Factor verification was denied by the user.                                                                                            |
| `SUCCESS`              | The Factor was successfully verified.                                                                                                      |
| `TIMEOUT`              | Okta was unable to verify the Factor within the allowed time window.                                                                       |
| `TIME_WINDOW_EXCEEDED` | The Factor was successfully verified, but outside of the computed time window. Another verification is required in the current time window.|
| `WAITING`              | The Factor verification has started, but not yet completed (for example: The user hasn't answered the phone call yet).                     |
