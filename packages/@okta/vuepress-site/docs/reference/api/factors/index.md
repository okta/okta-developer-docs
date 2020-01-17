---
title: Factors
category: management
---

# Factors API

The Okta Factors API provides operations to enroll, manage, and verify factors for multi-factor authentication (MFA).  Manage both administration and end-user accounts, or verify an individual factor at any time.

## Getting Started with the Factors API

Explore the Factors API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/9fdda657d134039fcaba)

## Factor Operations

 - **[List Operations](#factor-operations)** - List factors and security questions.
 - **[Lifecycle Operations](#factor-lifecycle-operations)** - Enroll, activate, and reset factors.
 - **[Challenge and Verify Operations](#factors-that-perform-challenge-and-verify-operations)** - Challenge and Verify a factor
 - **[Verification Only Operations](#factor-that-perform-only-verification-operations)** - Verify a factor

### Get Factor

<ApiOperation method="get" url="/api/v1/users/${userId}/factors/${factorId}" />

Fetches a factor for the specified user

##### Request Parameters

| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| userId       | `id` of a user                                      | URL        | String   | TRUE     |
| factorId     | `id` of a factor                                    | URL        | String   | TRUE     |

#### Response Parameters

[Factor](#factor-model)

##### Request Example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ufs2bysphxKODSZKWVCT"
```

##### Response Example

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

### List Enrolled Factors

<ApiOperation method="get" url="/api/v1/users/${userId}/factors" />

Enumerates all the enrolled factors for the specified user

##### Request Parameters

| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| userId       | `id` of a user                                      | URL        | String   | TRUE     |

##### Response Parameters

Array of [Factors](#factor-model)

##### Request Example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors"
```

##### Response Example

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

### List Factors to Enroll

<ApiOperation method="get" url="/api/v1/users/${userId}/factors/catalog" />

Enumerates all the [supported factors](#supported-factors-for-providers) that can be enrolled for the specified user

##### Request Parameters

| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| userId       | `id` of a user                                      | URL        | String   | TRUE     |

##### Response Parameters

Array of [Factors](#factor-model)

##### Request Example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/catalog"
```

##### Response Example

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

> Notice that the `sms` factor type includes an existing phone number in `_embedded`. You can either use the existing phone number or update it with a new number. See [Enroll Okta SMS factor](#enroll-okta-sms-factor) for more information.

### List Security Questions

<ApiOperation method="get" url="/api/v1/users/${userId}/factors/questions" />

Enumerates all available security questions for a user's `question` factor

##### Request Parameters

| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| userId       | `id` of a user                                      | URL        | String   | TRUE     |

##### Response Parameters

Array of Questions

| Property      | Description               | DataType  | Nullable | Unique  | Readonly |
| ------------- | ------------------------- | --------- | -------- | ------- | -------- |
| question      | unique key for question   | String    | FALSE    | TRUE    | TRUE     |
| questionText  | display text for question | String    | FALSE    | FALSE   | TRUE     |

##### Request Example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/questions"
```

##### Response Example

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

## Factor Lifecycle Operations

### Enroll Factor

<ApiOperation method="post" url="/api/v1/users/${userId}/factors" />

Enrolls a user with a supported [factor](#list-factors-to-enroll)

- [Enroll Okta Security Question Factor](#enroll-okta-security-question-factor)
- [Enroll Okta SMS Factor](#enroll-okta-sms-factor)
- [Enroll Okta Call Factor](#enroll-okta-call-factor)
- [Enroll Okta Verify TOTP Factor](#enroll-okta-verify-totp-factor)
- [Enroll Okta Verify Push Factor](#enroll-okta-verify-push-factor)
- [Enroll Google Authenticator Factor](#enroll-google-authenticator-factor)
- [Enroll RSA SecurID Factor](#enroll-rsa-securid-factor)
- [Enroll Symantec VIP Factor](#enroll-symantec-vip-factor)
- [Enroll YubiKey Factor](#enroll-yubikey-factor)
- [Enroll Okta Email Factor](#enroll-okta-email-factor)
- [Enroll U2F Factor](#enroll-u2f-factor)
- [Enroll WebAuthn Factor](#enroll-webauthn-factor)
- [Enroll Custom HOTP Factor](#enroll-custom-hotp-factor)

##### Request Parameters

| Parameter            | Description                                                                                            | Param Type | DataType                | Required |
| -------------------- | ------------------------------------------------------------------------------------------------------ | ---------- | ----------------------- | -------- |
| activate             | If set to `true` will automatically attempt to activate a Factor after enrolling it                    | Query      | Boolean                 | FALSE    |
| factor               | Factor                                                                                                 | Body       | [Factor](#factor-model) | TRUE     |
| id                   | `id` of user                                                                                           | URL        | String                  | TRUE     |
| templateId           | `id` of an SMS template (only for SMS Factors)                                                         | Query      | String                  | FALSE    |
| tokenLifetimeSeconds | The lifetime of the Email Factors OTP, with a value between `1` and `86400` (Default is `300`)         | Query      | Number                  | FALSE    |
| updatePhone          | Indicates if you'd like to update the `phoneNumber` (only for SMS Factors that are pending activation) | Query      | Boolean                 | FALSE    |

##### Response Parameters

All responses return the enrolled [Factor](#factor-model) with a status of either `PENDING_ACTIVATION` or `ACTIVE`.

> Some [factor types](#factor-type) require [activation](#activate-factor) to complete the enrollment process.

#### Enroll Okta Security Question Factor

Enrolls a user with the `question` factor and [question profile](#question-profile).

> The Security Question factor does not require activation and is `ACTIVE` after enrollment.

##### Request Example

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

##### Response Example

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

Enrolls a user with the Okta `sms` factor and an [SMS profile](#sms-profile).  A text message with a One Time Passcode (OTP) is sent to the device during enrollment and must be [activated](#activate-sms-factor) by following the `activate` link relation to complete the enrollment process.

##### Request Example

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

##### Response Example

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

`429 Too Many Requests` status code may be returned if you attempt to resend an SMS challenge (OTP) within the same time window.

*The current rate limit is one SMS challenge per device every 30 seconds.*

> Okta round-robins between SMS providers with every resend request to help ensure delivery of SMS OTP across different carriers.

```json
{
    "errorCode": "E0000109",
    "errorSummary": "An SMS message was recently sent. Please wait 30 seconds before trying again.",
    "errorLink": "E0000109",
    "errorId": "oaeneEaQF8qQrepOWHSkdoejw",
    "errorCauses": []
}
```

###### Existing Phone

A `400 Bad Request` status code may be returned if you attempt to enroll with a different phone number when there is an existing mobile phone for the user.

*Currently, a user can enroll only one mobile phone.*

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

##### Enroll Okta SMS Factor by Updating Phone Number

If the user wants to use a different phone number (instead of the existing phone number) then the enroll API call needs to supply the `updatePhone` query parameter set to `true`.

The phone number cannot be updated for an SMS factor that is already activated. If you'd like to update the phone number, you will need to reset the factor and re-enroll it:

1. [List Enrolled Factors](#list-enrolled-factors) and extract the relevant `factorId`.
2. [Reset the Factor](#reset-factor)
3. Then [enroll the Factor](#enroll-okta-sms-factor) again. You will be able to pass the `updatePhone` parameter set to `true`, along with an updated `phoneNumber` value for as long as the Factor has a `status` value of `PENDING_ACTIVATION`.

###### Request Example

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

##### Enroll Okta SMS Factor by Using Existing Phone Number

If the user wants to use the existing phone number then the enroll API doesn't need to pass the phone number.
Or, you can pass the existing phone number in a profile object.

###### Request Example

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

##### Enroll Okta SMS Factor Using Custom Template

Customize (and optionally localize) the SMS message sent to the user on enrollment.
* If the request has an `Accept-Language` header and the template contains a translation for that language, the SMS message is sent using the translated template.
* If the language provided in the `Accept-Language` header doesn't exist, the SMS message is sent using the template text.
* If the provided <em>templateId</em> doesn't match the existing template, the SMS message is sent using the default template.

> For instructions about how to create custom templates, see [SMS Template](/docs/reference/api/templates/#add-sms-template).

###### Request Example

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

##### Resend SMS as Part of Enrollment

Use the `resend` link to send another OTP if user doesn't receive the original activation SMS OTP.

###### Request Example

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

##### Resend SMS as Part of Enrollment Using a Custom Template

Customize (and optionally localize) the SMS message sent to the user in case Okta needs to resend the message as part of enrollment.

> For instructions about how to create custom templates, see [SMS Template](/docs/reference/api/templates/#add-sms-template).

###### Request Example

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

##### Enroll and Auto-Activate Okta SMS Factor

To enroll and immediately activate the Okta `sms` factor, add the `activate` option to the enroll API and set it `true`.  An activation text message will not be sent to the device.

###### Request Example

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

Enrolls a user with the Okta `call` factor and a [Call profile](#call-profile).  A voice call with an OTP is made to the device during enrollment and must be [activated](#activate-call-factor).

##### Request Example

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

##### Response Example

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

###### Rate Limit

`429 Too Many Requests` status code may be returned if you attempt to resend a Voice Call challenge (OTP) within the same time window.

*The current rate limit is one Voice Call challenge per device every 30 seconds.*

```json
{
    "errorCode": "E0000047",
    "errorSummary": "API call exceeded rate limit due to too many requests",
    "errorLink": "E0000047",
    "errorId": "oaexL5rislQROquLn3Jec7oGw",
    "errorCauses": []
}
```

###### Existing Phone

A `400 Bad Request` status code may be returned if you attempt to enroll with a different phone number when there is an existing phone with 'Voice Call' capability for the user.

*Currently, a user can enroll only one ''voice call' capable phone.*

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

##### Resend Voice Call as Part of Enrollment

Use the `resend` link to send another OTP if user doesn't receive the original activation Voice Call OTP.

###### Request Example

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

##### Enroll and Auto-Activate Okta Call Factor

To enroll and immediately activate the Okta `call` factor, add the `activate` option to the enroll API and set it `true`.  An activation call will not be made to the device.

##### Request Example

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

Enrolls a user with an Okta `token:software:totp` factor.  The factor must be [activated](#activate-totp-factor) after enrollment by following the `activate` link relation to complete the enrollment process.

##### Request Example

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

##### Response Example

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

Enrolls a user with the Okta verify `push` factor. The factor must be [activated on the device](#activate-push-factor) by scanning the QR code or visiting the activation link sent via email or sms.

> Use the published activation links to embed the QR code or distribute an activation `email` or `sms`.

##### Request Example

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

##### Response Example

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

Enrolls a user with the Google `token:software:totp` factor.  The factor must be [activated](#activate-totp-factor) after enrollment by following the `activate` link relation to complete the enrollment process.

##### Request Example

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

##### Response Example

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

Enrolls a user with a RSA SecurID factor and a [token profile](#token-profile).  RSA tokens must be verified with the [current pin+passcode](#factor-verification-object) as part of the enrollment request.

##### Request Example

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

##### Response Example

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

Enrolls a user with a Symantec VIP factor and a [token profile](#token-profile).  Symantec tokens must be verified with the [current and next passcodes](#factor-verification-object) as part of the enrollment request.

##### Request Example

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

##### Response Example

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

#### Enroll YubiKey Factor

Enrolls a user with a YubiCo factor (YubiKey).  YubiKeys must be verified with the [current passcode](#factor-verification-object) as part of the enrollment request.

##### Request Example

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

##### Response Example

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

Enrolls a user with an email factor. An email with an OTP is sent to the primary or secondary (depending on which one is enrolled) email address of the user during enrollment. The factor must be [activated](#activate-email-factor) by following the `activate` link relation to complete the enrollment process. An optional `tokenLifetimeSeconds` can be specified as a query parameter to indicate the lifetime of the OTP. The default lifetime is 300 seconds. `tokenLifetimeSeconds` should be in the range 1 to 86400 inclusive.

##### Request Example

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

##### Response Example

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

###### Invalid Email address response

```json
{
    "errorCode": "E0000001",
    "errorSummary": "Api validation failed: Only verified primary or secondary email can be enrolled.",
    "errorLink": "E0000001",
    "errorId": "oaeeJunJcxXQlCsrYEwGzN2LQ",
    "errorCauses": []
}
```

##### Enroll and Auto-Activate Okta Email Factor

To enroll and immediately activate the Okta `email` factor, add the `activate` option to the enroll API and set it `true`.  An activation email will not be sent to the user.

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

Enrolls a user with a U2F factor. The enrollment process starts with getting a nonce from Okta and using that to get registration information from the U2F key using the U2F Javascript API.


##### Enroll U2F Request Example

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

##### Enroll U2F Response Example

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

Enrolls a user with a WebAuthn factor. The enrollment process starts with getting the WebAuthn credential creation options that are used to help select an appropriate authenticator using the WebAuthn API.
This authenticator then generates an enrollment attestation, which may be used to register the authenticator for the user.

##### Enroll WebAuthn Response Parameters

In the [embedded resources](#embedded-resources) object, the `response._embedded.activation` object contains properties used to guide the client in creating a new WebAuthn credential for use with Okta.

For more information about these credential creation options, see the [WebAuthn spec for PublicKeyCredentialCreationOptions](https://www.w3.org/TR/webauthn/#dictionary-makecredentialoptions).

##### Enroll WebAuthn Request Example

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

##### Enroll WebAuthn Response Example

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

Enrolls a user for a Custom HMAC-based One-time Password (HOTP) factor. The enrollment process involves passing a factor profile Id and shared secret for a particular token.

> **Note:** Currently only auto-activation is supported for Custom HOTP Factor.

##### Enroll and Auto-Activate Custom HOTP Factor

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

##### Enroll Custom HOTP Factor Response Example

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

The `sms` and `token:software:totp` [factor types](#factor-type) require activation to complete the enrollment process.

- [Activate TOTP Factor](#activate-totp-factor)
- [Activate SMS Factor](#activate-sms-factor)
- [Activate Call Factor](#activate-call-factor)
- [Activate Push Factor](#activate-push-factor)
- [Activate Email Factor](#activate-email-factor)
- [Activate U2F Factor](#activate-u2f-factor)
- [Activate WebAuthn Factor](#activate-webauthn-factor)

#### Activate TOTP Factor

Activates a `token:software:totp` factor by verifying the OTP.

##### Request Parameters

| Parameter    | Description                                         | Param Type | DataType | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- | ------- |
| userId       | `id` of a user                                      | URL        | String   | TRUE     |         |
| factorId     | `id` of a factor returned from enrollment           | URL        | String   | TRUE     |         |
| passCode     | OTP generated by device                             | Body       | String   | TRUE     |         |

##### Response Parameters

If the passcode is correct you will receive the [Factor](#factor-model) with an `ACTIVE` status.

If the passcode is invalid you will receive a `403 Forbidden` status code with the following error:

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

##### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf1fmaMGJLMNGNLIVG/lifecycle/activate"
```

##### Response Example

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

Activates a `sms` factor by verifying the OTP.  The request/response is identical to [activating a TOTP factor](#activate-totp-factor).

##### Request Parameters

| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| userId       | `id` of a user                                      | URL        | String   | TRUE     |
| factorId     | `id` of a factor returned from enrollment           | URL        | String   | TRUE     |
| passCode     | OTP sent to mobile device                           | Body       | String   | TRUE     |

##### Response Parameters

If the passcode is correct you will receive the [Factor](#factor-model) with an `ACTIVE` status.

If the passcode is invalid you will receive a `403 Forbidden` status code with the following error:

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

##### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/sms1o51EADOTFXHHBXBP/lifecycle/activate"
```

##### Response Example

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

Activates a `call` factor by verifying the OTP.  The request/response is identical to [activating a TOTP factor](#activate-totp-factor).

##### Request Parameters

| Parameter    | Description                                         | Param Type | DataType | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- | ------- |
| userId       | `id` of a user                                      | URL        | String   | TRUE     |         |
| factorId     | `id` of a factor returned from enrollment           | URL        | String   | TRUE     |         |
| passCode     | OTP sent to mobile device                           | Body       | String   | TRUE     |         |

##### Response Parameters

If the passcode is correct you will receive the [Factor](#factor-model) with an `ACTIVE` status.

If the passcode is invalid you will receive a `403 Forbidden` status code with the following error:

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

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "12345"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/clf1o51EADOTFXHHBXBP/lifecycle/activate"
```

##### Response Example

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

Activation of `push` factors are asynchronous and must be polled for completion when the `factorResult` returns a `WAITING` status.

Activations have a short lifetime (minutes) and will `TIMEOUT` if they are not completed before the `expireAt` timestamp.  Use the published `activate` link to restart the activation process if the activation is expired.

##### Request Parameters

| Parameter | Description      | Param Type | DataType | Required | Default |
| --------- | --------------   | ---------- | -------- | -------- | ------- |
| userId    | `id` of a user   | URL        | String   | TRUE     |         |
| factorId  | `id` of a factor | URL        | String   | TRUE     |         |

##### Response Parameters

| Parameter        | Description                    | Param Type | DataType                                                        | Required | Default |
| ---------------- | ------------------------------ | ---------- | --------------------------------------------------------------- | -------- | ------- |
| activationResult | asynchronous activation result | Body       | [Push Factor Activation Object](#push-factor-activation-object) | TRUE     |         |

##### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/opf3hkfocI4JTLAju0g4/lifecycle/activate"
```

##### Response Example (Waiting)

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

##### Response Example (Timeout)

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

##### Response Example (Activated)

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

Activates an `email` factor by verifying the OTP.

##### Request Parameters

| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| userId       | `id` of a user                                      | URL        | String   | TRUE     |
| factorId     | `id` of a factor returned from enrollment           | URL        | String   | TRUE     |
| passCode     | OTP sent to email                                   | Body       | String   | TRUE     |

##### Response Parameters

If the passcode is correct the response contains [Factor](#factor-model) with an `ACTIVE` status.

If the passcode is invalid response will be `403 Forbidden` with the following error:

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

##### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/emfnf3gSScB8xXoXK0g3/lifecycle/activate"
```

##### Response Example (Activated)

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

Activate a U2F factor by verifying the registration data and client data.

##### Activate U2F Request Parameters

| Parameter         | Description                                                | Param Type | DataType | Required |
| ----------------- | ---------------------------------------------------------- | ---------- | -------- | -------- |
| factorId          | `id` of factor returned from enrollment                    | URL        | String   | TRUE     |
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
-H "Authorization: SSWS ${api_token}" \
-d '{
  "registrationData":"BQTEMUyOM8h1TiZG4DL-RdMr-tYgTYSf62Y52AmwEFTiSYWIRVO5L-MwWdRJOthmV3J3JrqpmGfmFb820-awx1YIQFlTvkMhxItHlpkzahEqicpw7SIH9yMfTn2kaDcC6JaLKPfV5ds0vzuxF1JJj3gCM01bRC-HWI4nCVgc-zaaoRgwggEcMIHDoAMCAQICCwD52fCSMoNczORdMAoGCCqGSM49BAMCMBUxEzARBgNVBAMTClUyRiBJc3N1ZXIwGhcLMDAwMTAxMDAwMFoXCzAwMDEwMTAwMDBaMBUxEzARBgNVBAMTClUyRiBEZXZpY2UwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQFKJupuUgPQcRHUphaW5JPfLvkkwlEwlHKk_ntSp7MS4aTHJyGnpziqncrjiTC_oUVtb-wN-y_t_IMIjueGkhxMAoGCCqGSM49BAMCA0gAMEUCIQDBo6aOLxanIUYnBX9iu3KMngPnobpi0EZSTkVtLC8_cwIgC1945RGqGBKfbyNtkhMifZK05n7fU-gW37Bdnci5D94wRQIhAJv3VvclbRkHAQhaUR8rr8qFTg9iF-GtHoXU95vWaQdyAiAbEr-440U4dQAZF-Sj8G2fxgh5DkgkkWpyUHZhz7N9ew",
  "clientData":"eyJ0eXAiOiJuYXZpZ2F0b3IuaWQuZmluaXNoRW5yb2xsbWVudCIsImNoYWxsZW5nZSI6IlhxR0h0RTBoUkxuVEoxYUF5U1oyIiwib3JpZ2luIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6MzAwMCIsImNpZF9wdWJrZXkiOiJ1bnVzZWQifQ"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/fuf2rovRxogXJ0nDy0g4/lifecycle/activate"
```

##### Activate U2F Response Example

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

Activate a WebAuthn factor by verifying the attestation and client data.

##### Activate WebAuthn Request Parameters


| Parameter         | Description                                                     | Param Type | DataType | Required |
| ----------------- | --------------------------------------------------------------- | ---------- | -------- | -------- |
| factorId          | `id` of factor returned from enrollment                         | URL        | String   | TRUE     |
| stateToken        | [state token](#state-token) for the current transaction             | Body       | String   | TRUE     |
| attestation       | base64-encoded attestation from WebAuthn javascript call        | Body       | String   | TRUE     |
| clientData        | base64-encoded client data from WebAuthn javascript call        | Body       | String   | TRUE     |


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
-H "Authorization: SSWS ${api_token}" \
-d '{
  "attestation: "o2NmbXRmcGFja2VkZ2F0dFN0bXSiY2FsZyZjc2lnWEgwRgIhAMvf2+dzXlHZN1um38Y8aFzrKvX0k5dt/hnDu9lahbR4AiEAuwtMg3IoaElWMp00QrP/+3Po/6LwXfmYQVfsnsQ+da1oYXV0aERhdGFYxkgb9OHGifjS2dG03qLRqvXrDIRyfGAuc+GzF1z20/eVRV2wvl6tzgACNbzGCmSLCyXx8FUDAEIBvWNHOcE3QDUkDP/HB1kRbrIOoZ1dR874ZaGbMuvaSVHVWN2kfNiO4D+HlAzUEFaqlNi5FPqKw+mF8f0XwdpEBlClAQIDJiABIVgg0a6oo3W0JdYPu6+eBrbr0WyB3uJLI3ODVgDfQnpgafgiWCB4fFo/5iiVrFhB8pNH2tbBtKewyAHuDkRolcCnVaCcmQ==",
  "clientData": "eyJjaGFsbGVuZ2UiOiJVSk5wYW9sVWt0dF9vcEZPNXJMYyIsIm9yaWdpbiI6Imh0dHBzOi8vcmFpbi5va3RhMS5jb20iLCJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIn0=",
  "stateToken": "00eacMXqkf2pG8K3sBbWqTJNStZpEi9-1Bfwl_mfQT"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/fwf2rovRxogXJ0nDy0g4/lifecycle/activate"
```

##### Activate WebAuthn Response Example

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

Unenrolls an existing factor for the specified user, allowing the user to enroll a new factor.

##### Request Parameters

| Parameter    | Description                                         | Param Type | DataType | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- | ------- |
| userId       | `id` of a user                                      | URL        | String   | TRUE     |         |
| factorId     | `id` of the factor to reset                         | URL        | String   | TRUE     |         |

##### Response Parameters

`204 No Content`

##### Request Example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ufs1o01OTMGHLAJPVHDZ"
```

##### Response Example

`204 No Content`

## Factors that require a Challenge and Verify Operation

Some factors require a challenge to be issued by Okta to initiate the transaction

### Issue an SMS Factor Challenge

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Sends an OTP for a `sms` factor to the specified user's phone.

##### Request Parameters

| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| userId       | `id` of a user                                      | URL        | String   | TRUE     |
| factorId     | `id` of a factor                                    | URL        | String   | TRUE     |
| templateId   | `id` of an SMS template                             | Query      | String   | FALSE    |

##### Response Parameters

| Parameter    | Description                                         | Param Type | DataType                                             | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | ---------------------------------------------------  | -------- | ------- |
| factorResult | verification result                                 | Body       | [Factor Verify Result](#factor-verify-result-object) | TRUE     |         |
| profile      | SMS profile                                         | Body       | [SMS profile](#sms-profile)                          | TRUE     |         |


`429 Too Many Requests` status code may be returned if you attempt to resend a SMS challenge (OTP) within the same time window.

*The current rate limit is one SMS challenge per device every 30 seconds.*

> Okta will round-robin between SMS providers with every resend request to help ensure delivery of SMS OTP across different carriers.

```json
{
    "errorCode": "E0000109",
    "errorSummary": "An SMS message was recently sent. Please wait 30 seconds before trying again.",
    "errorLink": "E0000109",
    "errorId": "oaeneEaQF8qQrepOWHSkdoejw",
    "errorCauses": []
}
```

##### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/smsszf1YNUtGWTx4j0g3/verify"
```

##### Response Example

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

#### Issuing an SMS Factor Challenge Using A Custom Template

Customize (and optionally localize) the SMS message sent to the user on verification.
* If the request has an `Accept-Language` header and the template contains translation for that language, the SMS message is sent in that language.
* If the language provided in the `Accept-Language` header doesn't exist in the template definition, the SMS message is sent using the template text.
* If the provided `templateId` doesn't match an existing template, the SMS message is sent using the default template.

To create custom templates, see [Templates](/docs/reference/api/templates/#add-sms-template).

###### Request Example

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

### Verify an SMS Factor Challenge

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Verifies an OTP sent by an `sms` factor challenge.

##### Request Parameters

| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| userId       | `id` of a user                                      | URL        | String   | TRUE     |
| factorId     | `id` of a factor                                    | URL        | String   | TRUE     |
| passCode     | OTP sent to device                                  | Body       | String   | FALSE    |

> If you omit `passCode` in the request a new challenge will be initiated and a new OTP sent to the device.

##### Response Parameters

| Parameter    | Description                                         | Param Type | DataType                                             | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | ---------------------------------------------------  | -------- | ------- |
| factorResult | verification result                                 | Body       | [Factor Verify Result](#factor-verify-result-object) | TRUE     |         |


If the passcode is invalid you will receive a `403 Forbidden` status code with the following error:

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

##### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/smsszf1YNUtGWTx4j0g3/verify"
```

##### Response Example

```json
{
  "factorResult": "SUCCESS"
}
```

### Issue a  Call Factor Challenge

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Sends an OTP for a `call` factor to the user's phone.

##### Request Parameters

| Parameter    | Description                                         | Param Type | DataType | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- | ------- |
| userId       | `id` of a user                                      | URL        | String   | TRUE     |         |
| factorId     | `id` of a factor                                    | URL        | String   | TRUE     |         |

##### Response Parameters

| Parameter    | Description                                         | Param Type | DataType                                             | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | ---------------------------------------------------  | -------- | ------- |
| factorResult | verification result                                 | Body       | [Factor Verify Result](#factor-verify-result-object) | TRUE     |         |
| profile      | Call profile                                        | Body       | [Call profile](#call-profile)                        | TRUE     |         |


`429 Too Many Requests` status code may be returned if you attempt to resend a Voice Call challenge (OTP) within the same time window.

*The current rate limit is one Voice Call challenge per device every 30 seconds.*

```json
{
    "errorCode": "E0000047",
    "errorSummary": "API call exceeded rate limit due to too many requests.",
    "errorLink": "E0000047",
    "errorId": "oaeneEaQF8qQrepOWHSkdoejw",
    "errorCauses": []
}
```

##### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/clff17zuKEUMYQAQGCOV/verify"
```

##### Response Example

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

### Verify a Call Factor Challenge

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Verifies an OTP sent by a `call` factor challenge.

##### Request Parameters

| Parameter    | Description                                         | Param Type | DataType | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- | ------- |
| userId       | `id` of a user                                      | URL        | String   | TRUE     |         |
| factorId     | `id` of a factor                                    | URL        | String   | TRUE     |         |
| passCode     | OTP sent to device                                  | Body       | String   | FALSE    |         |

> If you omit `passCode` in the request a new challenge is initiated and a new OTP is sent to the phone.

##### Response Parameters

| Parameter    | Description                                         | Param Type | DataType                                             | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | ---------------------------------------------------  | -------- | ------- |
| factorResult | verification result                                 | Body       | [Factor Verify Result](#factor-verify-result-object) | TRUE     |         |

If the passcode is invalid you will receive a `403 Forbidden` status code with the following error:

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

##### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/clff17zuKEUMYQAQGCOV/verify"
```

##### Response Example

```json
{
  "factorResult": "SUCCESS"
}
```

### Issue a Push Factor Challenge

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Creates a new transaction and sends an asynchronous push notification to the device for the user to approve or reject. You must [poll the transaction](#poll-for-verify-transaction-completion) to determine when it completes or expires.

##### Start new Transaction

##### Request Parameters

| Parameter    | Description                                         | Param Type | DataType | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- | ------- |
| userId       | `id` of a user                                      | URL        | String   | TRUE     |         |
| factorId     | `id` of a factor                                    | URL        | String   | TRUE     |         |

> The client `IP Address` & `User Agent` of the HTTP request is automatically captured and sent in the push notification as additional context.<br>You should [always send a valid User-Agent HTTP header](/docs/reference/api-overview/#user-agent) when verifying a push factor.

> The **public IP address** of your application must be [whitelisted as a gateway IP address](/docs/reference/api-overview/#ip-address) to forward the user agent's original IP address with the `X-Forwarded-For` HTTP header.

##### Response Parameters

| Parameter    | Description                                                          | Param Type | DataType                                             | Required |
| ------------ | -------------------------------------------------------------------- | ---------- | ---------------------------------------------------- | -------- |
| factorResult | verification result (`WAITING`, `SUCCESS`, `REJECTED`, or `TIMEOUT`) | Body       | [Factor Verify Result](#factor-verify-result-object) | TRUE     |

##### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36" \
-H "X-Forwarded-For: 23.235.46.133" \
"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/opf3hkfocI4JTLAju0g4/verify"
```

##### Response Example

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

### Verify a Push Factor Challenge

#### Poll for Verify Transaction Completion

<ApiOperation method="get" url="/api/v1/users/${userId}/factors/${factorId}/transactions/${transactionId}" />

Polls a push verification transaction for completion.  The transaction result is `WAITING`, `SUCCESS`, `REJECTED`, or `TIMEOUT`.

> You should always use the `poll` link relation and never manually construct your own URL.

##### Request Parameters

| Parameter     | Description           | Param Type | DataType | Required |
| ------------  | -------------------   | ---------- | -------- | -------- |
| userId        | `id` of a user        | URL        | String   | TRUE     |
| factorId      | `id` of a factor      | URL        | String   | TRUE     |
| transactionId | `id` of a transaction | URL        | String   | TRUE     |

##### Response Parameters

| Parameter    | Description         | Param Type | DataType                                             | Required |
| ------------ | ------------------- | ---------- | ---------------------------------------------------- | -------- |
| factorResult | verification result | Body       | [Factor Verify Result](#factor-verify-result-object) | TRUE     |

##### Response Example (Waiting)

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

##### Response Example (Approved)

```json
{
  "factorResult": "SUCCESS"
}
```

##### Response Example (Rejected)

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

##### Response Example (Timeout)

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

### Issue an Email Factor Challenge

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Sends an OTP for an `email` factor to the user's email address.

##### Request Parameters

| Parameter    | Description                                         | Param Type | DataType | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- | ------- |
| userId       | `id` of a user                                      | URL        | String   | TRUE     |         |
| factorId     | `id` of a factor                                    | URL        | String   | TRUE     |         |               |
| tokenLifetimeSeconds | Lifetime of the OTP                         | QueryString | Int | FALSE        | 300

#### Response Parameters

| Parameter    | Description                                         | Param Type | DataType                                             | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | ---------------------------------------------------  | -------- | ------- |
| factorResult | verification result                                 | Body       | [Factor Verify Result](#factor-verify-result-object) | TRUE     |         |


`429 Too Many Requests` status code may be returned if you attempt to resend an Email challenge (OTP) within the same time window.

*The current rate limit is one per email address every 5 seconds.*

```json
{
    "errorCode": "E0000118",
    "errorSummary": "An email was recently sent. Please wait 5 seconds before trying again.",
    "errorLink": "E0000118",
    "errorId": "oae0qf10rGJQQeWFX1OSuStdQ",
    "errorCauses": []
}
```

#### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/emfnf3gSScB8xXoXK0g3/verify?tokenLifetimeSeconds=600"
```

#### Response Example

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

### Verify an Email Factor Challenge

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Verifies an OTP for an `email` factor.

#### Request Parameters

| Parameter    | Description                                         | Param Type | DataType | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- | ------- |
| userId       | `id` of a user                                      | URL        | String   | TRUE     |         |
| factorId     | `id` of a factor                                    | URL        | String   | TRUE     |         |
| passCode     | OTP sent to email address                                  | Body       | String   | FALSE    | ""                              |

> If you omit `passCode` in the request a new challenge is initiated and a new OTP is sent to the email address,.

##### Response Parameters

| Parameter    | Description                                         | Param Type | DataType                                             | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | ---------------------------------------------------  | -------- | ------- |
| factorResult | verification result                                 | Body       | [Factor Verify Result](#factor-verify-result-object) | TRUE     |         |

If the passcode is invalid response will be `403 Forbidden` with the following error:

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

##### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/emfnf3gSScB8xXoXK0g3/verify?tokenLifetimeSeconds=600"
```

##### Response Example

```json
{
  "factorResult": "SUCCESS"
}
```

### Issue a U2F Factor Challenge

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Initiates verification for a `u2f` factor by getting a challenge nonce string.

Note:

According to
[FIDO
spec](https://fidoalliance.org/specs/fido-u2f-v1.2-ps-20170411/fido-appid-and-facets-v1.2-ps-20170411.html#h2_the-appid-and-facetid-assertions), activating and verifying a U2F device with appIds in different DNS zone is not allowed. For example, if a user activated a U2F device via the Factors API from a server hosted at `https://foo.example.com`, the user can verify the U2F factor from `https://foo.example.com`, but will not be able to verify it from Okta portal `https://company.okta.com`.  Here, the U2F device would return error code 4 - `DEVICE_INELIGIBLE`.

#### Start Verification to Get Challenge Nonce

Verification of the U2F factor starts with getting the challenge nonce and U2F token details and then using the client-side
JavaScript API to get the signed assertion from the U2F token.

#### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/fuf2rovRxogXJ0nDy0g4/verify"
```

#### Response Example

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

#### Get the Signed Assertion from the U2F Token by calling the U2F Javascript API

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


### Verify a U2F Factor Challenge

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Verifies a challenge for a `u2f` factor by posting a signed assertion using the challenge nonce.

#### Request Example for Signed Assertion

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

#### Response of U2F Verification Example

```json
{
  "factorResult":"SUCCESS",
  "profile":{
    "credentialId":"h1bFwJFU9wnelYkexJuQfoUHZ5lX3CgQMTZk4H3I8kM9Nn6XALiQ-BIab4P5EE0GQrA7VD-kAwgnG950aXkhBw",
    "version":"U2F_V2"
  }
}
```

### Verify YubiKey Factor

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />
Verifies a user with a [Yubico OTP](https://developers.yubico.com/OTP/OTPs_Explained.html) for a YubiKey `token:hardware` factor.

#### Request Example for Verify YubiKey Factor

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
"passCode": "123456"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf17zuKEUMYQAQGCOV/verify"
```

#### Response Example for Verify YubiKey Factor

```json
{
"factorResult": "SUCCESS"
}
```

### Issue a WebAuthn Factor Challenge

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Initiates verification for a `webauthn` factor by getting a challenge nonce string, as well as WebAuthn credential request options that are used to help select an appropriate authenticator using the WebAuthn API.
This authenticator then generates an assertion, which may be used to verify the user.

#### Start Verification to Get Challenge Nonce

Verification of the WebAuthn factor starts with getting the WebAuthn credential request details (including the challenge nonce) then using the client-side
JavaScript API to get the signed assertion from the WebAuthn authenticator.

For more information about these credential request options, see the [WebAuthn spec for PublicKeyCredentialRequestOptions](https://www.w3.org/TR/webauthn/#dictionary-makecredentialoptions).

#### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/fwf2rovRxogXJ0nDy0g4/verify"
```

#### Response Example

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

#### Get the Signed Assertion from the WebAuthn Authenticator by calling the WebAuthn Javascript API

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

### Verify a WebAuthn Factor Challenge

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Verifies a challenge for a `webauthn` factor by posting a signed assertion using the challenge nonce.

#### Request Parameters

| Parameter      | Description                                         | Param Type | DataType | Required |
| -------------- | --------------------------------------------------- | ---------- | -------- | -------- |
| userId         | `id` of a user                                      | URL        | String   | TRUE     |
| factorId       | `id` of factor returned from enrollment             | URL        | String   | TRUE     |
| clientData     | base64-encoded client data from the WebAuthn authenticator       | Body       | String   | TRUE     |
| authenticatorData | base64-encoded authenticator data from the WebAuthn authenticator    | Body       | String   | TRUE     |
| signatureData  | base64-encoded signature data from the WebAuthn authenticator    | Body       | String   | TRUE     |

#### Request Example

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

#### Response Example

```json
{
  "factorResult":"SUCCESS",
  "profile":{
    "credentialId":"l3Br0n-7H3g047NqESqJynFtIgf3Ix9OfaRoNwLoloso99Xl2zS_O7EXUkmPeAIzTVtEL4dYjicJWBz7NpqhGA",
    "authenticatorName":"MacBook Touch ID"
  }
}
```

## Factors that require only a Verification Operation

Some factors do not require an explicit challenge to be issued by Okta.

### Verify Security Question Factor

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Verifies an answer to a `question` factor.

##### Request Parameters

| Parameter    | Description                                         | Param Type | DataType | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- | ------- |
| userId       | `id` of a user                                      | URL        | String   | TRUE     |         |
| factorId     | `id` of a factor                                    | URL        | String   | TRUE     |         |
| answer       | answer to security question                         | Body       | String   | TRUE     |         |

##### Response Parameters

| Parameter    | Description                                         | Param Type | DataType                                             | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | ---------------------------------------------------  | -------- | ------- |
| factorResult | verification result                                 | Body       | [Factor Verify Result](#factor-verify-result-object) | TRUE     |         |

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

#### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "answer": "mayonnaise"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ufs1pe3ISGKGPYKXRBKK/verify"
```

#### Response Example

```json
{
  "factorResult": "SUCCESS"
}
```

### Verify TOTP Factor

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Verifies an OTP for a `token:software:totp` or `token:hotp` factor

#### Request Parameters

| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| userId       | `id` of a user                                      | URL        | String   | TRUE     |
| factorId     | `id` of a factor                                    | URL        | String   | TRUE     |
| passCode     | OTP generated by device                             | Body       | String   | TRUE     |

#### Response Parameters

| Parameter    | Description                                         | Param Type | DataType                                             | Required |
| ------------ | --------------------------------------------------- | ---------- | ---------------------------------------------------  | -------- |
| factorResult | verification result                                 | Body       | [Factor Verify Result](#factor-verify-result-object) | TRUE     |

If the passcode is invalid you will receive a `403 Forbidden` status code with the following error:

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

#### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf17zuKEUMYQAQGCOV/verify"
```

#### Response Example

```json
{
  "factorResult": "SUCCESS"
}
```

### Verify Token Factor

<ApiOperation method="post" url="/api/v1/users/${userId}/factors/${factorId}/verify" />

Verifies an OTP for a `token` or `token:hardware` factor

#### Request Parameters

| Parameter    | Description                                         | Param Type | DataType | Required |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- |
| userId       | `id` of a user                                      | URL        | String   | TRUE     |
| factorId     | `id` of a factor                                    | URL        | String   | TRUE     |
| passCode     | OTP generated by device                             | Body       | String   | TRUE     |

#### Response Parameters

| Parameter    | Description                                         | Param Type | DataType                                             | Required |
| ------------ | --------------------------------------------------- | ---------- | ---------------------------------------------------- | -------- |
| factorResult | verification result                                 | Body       | [Factor Verify Result](#factor-verify-result-object) | TRUE     |

If the passcode is invalid you will receive a `403 Forbidden` status code with the following error:

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

##### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf17zuKEUMYQAQGCOV/verify"
```

##### Response Example

```json
{
  "factorResult": "SUCCESS"
}
```

## Factor Model

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

### Factor Properties

Factors have the following properties:

| Property       | Description                                                       | DataType                                                                       | Nullable | Unique | Readonly |
| -------------- | ----------------------------------------------------------------  | ------------------------------------------------------------------------------ | -------- | ------ | -------- |
| id             | unique key for factor, a 20 character long system generated id    | String                                                                         | FALSE    | TRUE   | TRUE     |
| factorType     | type of a factor                                                  | [Factor Type](#factor-type)                                                    | FALSE    | TRUE   | TRUE     |
| provider       | factor provider                                                   | [Provider Type](#provider-type)                                                | FALSE    | TRUE   | TRUE     |
| status         | status of a factor                                                | `NOT_SETUP`, `PENDING_ACTIVATION`, `ENROLLED`, `ACTIVE`, `INACTIVE`, `EXPIRED` | FALSE    | FALSE  | TRUE     |
| created        | timestamp when factor was created                                 | Date                                                                           | FALSE    | FALSE  | TRUE     |
| lastUpdated    | timestamp when factor was last updated                            | Date                                                                           | FALSE    | FALSE  | TRUE     |
| profile        | profile of a [supported factor](#supported-factors-for-providers) | [Factor Profile Object](#factor-profile-object)                                | TRUE     | FALSE  | FALSE    |
| verify         | optional verification  for factor enrollment                      | [Factor Verification Object](#factor-verification-object)                      | TRUE     | FALSE  | FALSE    |
| _links         | [discoverable resources](#links-object) related to the factor     | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                 | TRUE     | FALSE  | TRUE     |
| _embedded      | [embedded resources](#embedded-resources) related to the factor   | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                 | TRUE     | FALSE  | TRUE     |

> `id`, `created`, `lastUpdated`, `status`, `_links`, and `_embedded` are only available after a factor is enrolled.

#### Factor Type

The following factor types are supported:

| Factor Type           | Description                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------  |
| `push`                | Out-of-band verification via push notification to a device and transaction verification with digital signature      |
| `sms`                 | Software [OTP](http://en.wikipedia.org/wiki/One-time_password) sent via SMS to a registered phone number            |
| `call`                | Software [OTP](http://en.wikipedia.org/wiki/One-time_password) sent via Voice Call to a registered phone number     |
| `token`               | Software or hardware [One-time Password (OTP)](http://en.wikipedia.org/wiki/One-time_password) device               |
| `token:software:totp` | Software [Time-based One-time Password (TOTP)](http://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm) |
| `token:hardware`      | Hardware one-time password [OTP](http://en.wikipedia.org/wiki/One-time_password) device                             |
| `question`            | Additional knowledge based security question                                                                        |
| `web`                 | HTML inline frame (iframe) for embedding verification from a 3rd party                                              |

#### Provider Type

The following providers are supported:

| Provider   | Description                   |
| ---------- | ----------------------------- |
| `OKTA`     | Okta                          |
| `RSA`      | RSA SecurID                   |
| `SYMANTEC` | Symantec VIP                  |
| `GOOGLE`   | Google                        |
| `DUO`      | Duo Security                  |
| `YUBICO`   | Yubico                        |

#### Supported Factors for Providers

Each provider supports a subset of a factor types.  The following table lists the factor types supported for each provider:

| Provider   | Factor Type           |
| ---------- | --------------------- |
| `OKTA`     | `push`                |
| `OKTA`     | `question`            |
| `OKTA`     | `sms`                 |
| `OKTA`     | `call`                |
| `OKTA`     | `token:software:totp` |
| `OKTA`     | `email`               |
| `GOOGLE`   | `token:software:totp` |
| `SYMANTEC` | `token`               |
| `RSA`      | `token`               |
| `DUO`      | `web`                 |
| `YUBICO`   | `token:hardware`      |

### Factor Profile Object

Profiles are specific to the [factor type](#factor-type).

#### Question Profile

Specifies the profile for a `question` factor

| Property      | Description                         | DataType  | Nullable | Unique  | Readonly |
| ------------- | -------------------------           | --------- | -------- | ------- | -------- |
| question      | unique key for question             | String    | FALSE    | TRUE    | TRUE     |
| questionText  | display text for question           | String    | FALSE    | FALSE   | TRUE     |
| answer        | answer to question, min 4 char long | String    | TRUE     | FALSE   | FALSE    |

```json
{
  "profile": {
    "question": "favorite_art_piece",
    "questionText": "What is your favorite piece of art?"
  }
}
```

#### Built-in Question Keys

The keys for the built-in security questions are listed below.

| Question Unique Key                   |
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

Specifies the profile for a `sms` factor

| Property      | Description                                     | DataType                                                        | Nullable | Unique  | Readonly |
| ------------- | -----------------------------                   | --------------------------------------------------------------- | -------- | ------- | -------- |
| phoneNumber   | phone number of mobile device, max 15 char long | String [E.164 formatted](http://en.wikipedia.org/wiki/E.164)    | FALSE    | TRUE    | FALSE    |

```json
{
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  }
}
```

E.164 numbers can have a maximum of fifteen digits and are usually written as follows: [+][country code][subscriber number including area code]. Phone numbers that are not formatted in E.164 may work, but it depends on the phone or handset that is being used as well as the carrier from which the call or SMS is being originated.

For example, to convert a US phone number (415 599 2671) to E.164 format, one would need to add the '+' prefix and the country code (which is 1) in front of the number (+1 415 599 2671). In the UK and many other countries internationally, local dialing requires the addition of a 0 in front of the subscriber number. However, to use E.164 formatting, this 0 must be removed. A number such as 020 7183 8750 in the UK would be formatted as +44 20 7183 8750.

#### Call Profile

Specifies the profile for a `call` factor

| Property       | Description                                  | DataType                                                        | Nullable | Unique  | Readonly |
| -------------  | -----------------------------                | --------------------------------------------------------------- | -------- | ------- | -------- |
| phoneNumber    | phone number of the device, max 15 char long | String [E.164 formatted](http://en.wikipedia.org/wiki/E.164)    | FALSE    | TRUE    | FALSE    |
| phoneExtension | extension of the device, max 15 char long    | String                                                          | TRUE     | FALSE   | FALSE    |

```json
{
  "profile": {
    "phoneNumber": "+1-555-415-1337",
    "phoneExtension": "1234"
  }
}
```

E.164 numbers can have a maximum of fifteen digits and are usually written as follows: [+][country code][subscriber number including area code]. Phone numbers that are not formatted in E.164 may work, but it depends on the phone or handset that is being used as well as the carrier from which the call or SMS is being originated.

For example, to convert a US phone number (415 599 2671) to E.164 format, one would need to add the '+' prefix and the country code (which is 1) in front of the number (+1 415 599 2671). In the UK and many other countries internationally, local dialing requires the addition of a 0 in front of the subscriber number. However, to use E.164 formatting, this 0 must be removed. A number such as 020 7183 8750 in the UK would be formatted as +44 20 7183 8750.

PhoneExtension is optional.

#### Token Profile

Specifies the profile for a `token`, `token:hardware`, `token:software`, or `token:software:totp` factor

| Property      | Description        | DataType  | Nullable | Unique  | Readonly |
| ------------- | ------------------ | --------- | -------- | ------- | -------- |
| credentialId  | id for credential  | String    | FALSE    | FALSE   | TRUE     |

```json
{
  "profile": {
    "credentialId": "dade.murphy@example.com"
  }
}
```

#### Web Profile

Specifies the profile for a `web` factor

| Property      | Description        | DataType  | Nullable | Unique  | Readonly |
| ------------- | ------------------ | --------- | -------- | ------- | -------- |
| credentialId  | id for credential  | String    | FALSE    | FALSE   | TRUE     |

```json
{
  "profile": {
    "credentialId": "dade.murphy@example.com"
  }
}
```

#### Email Profile

Specifies the profile for a `email` factor

| Property      | Description                                  | DataType                                                        | Nullable | Unique  | Readonly |
| ------------- | -----------------------------                | --------------------------------------------------------------- | -------- | ------- | -------- |
| email         | email address of the user, max 100 char long | String                                                          | FALSE    | TRUE    | FALSE    |

```json
{
  "profile": {
    "email": "alice@okta.com"
  }
}
```

##### Note

Email factor can be used

* As an out-of-band transactional factor to send an email challenge to a user. This can be injected into any custom step-up flow and is not part of Okta Sign-On (it does not count as MFA for logging onto Okta). This is currently EA.

* As a proper Okta 2nd factor (just like Okta Verify, SMS, etc). This can be configured via the standard MultiFactor UI in the Okta administrator UI. The email factor is then eligible to be used during Okta Sign-On as a valid 2nd factor just like any of other the factors. This is currently BETA.

### Factor Verification Object

Specifies additional verification data for `token` or `token:hardware` factors

| Property      | Description                 | DataType  | Nullable | Unique  | Readonly |
| ------------- | --------------------------  | --------- | -------- | ------- | -------- |
| passCode      | OTP for current time window | String    | FALSE    | FALSE   | FALSE    |
| nextPassCode  | OTP for next time window    | String    | TRUE     | FALSE   | FALSE    |

```json
{
  "verify": {
    "passCode": "875498",
    "nextPassCode": "678195"
  }
}
```

### Links Object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the current status of a factor using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification.  This object is used for dynamic discovery of related resources and lifecycle operations.

| Link Relation Type | Description                                                                      |
| ------------------ | -------------------------------------------------------------------------------- |
| self               | The actual factor                                                                |
| activate           | [Lifecycle action](#activate-factor) to transition factor to `ACTIVE` status     |
| questions          | List of questions for the `question` factor type                                 |
| verify             | [Verify the factor](#factor-verification-operations)                             |
| send               | List of delivery options to send an activation or factor challenge               |
| resend             | List of delivery options to resend activation or factor challenge                |
| poll               | Polls factor for completion of activation of verification                        |

> The Links Object is **read-only**.

## Embedded Resources

### TOTP Factor Activation Object

TOTP factors when activated have an embedded activation object which describes the [TOTP](http://tools.ietf.org/html/rfc6238) algorithm parameters.

| Property       | Description                                       | DataType                                                       | Nullable | Unique | Readonly |
| -------------- | ------------------------------------------------- | -------------------------------------------------------------- | -------- | ------ | -------- |
| timeStep       | time-step size for TOTP                           | String                                                         | FALSE    | FALSE  | TRUE     |
| sharedSecret   | unique secret key for prover                      | String                                                         | FALSE    | FALSE  | TRUE     |
| encoding       | encoding of `sharedSecret`                        | `base32` or `base64`                                           | FALSE    | FALSE  | TRUE     |
| keyLength      | number of digits in an HOTP value                 | Number                                                         | FALSE    | FALSE  | TRUE     |
| _links         | discoverable resources related to the activation  | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |

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

### Push Factor Activation Object

Push factors must complete activation on the device by scanning the QR code or visiting activation link sent via email or sms.

| Property       | Description                                       | DataType                                                       | Nullable | Unique | Readonly |
| -------------- | ------------------------------------------------- | -------------------------------------------------------------- | -------- | ------ | -------- |
| expiresAt      | lifetime of activation                            | Date                                                           | FALSE    | FALSE  | TRUE     |
| factorResult   | result of a factor activation                     | `WAITING`, `CANCELLED`, `TIMEOUT`, or `ERROR`                  | FALSE    | FALSE  | TRUE     |
| _links         | discoverable resources related to the activation  | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | FALSE    | FALSE  | TRUE     |

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

#### Push Factor Activation Links Object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the push factor activation object using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification.  This object is used for dynamic discovery of related resources and operations.

| Link Relation Type | Description                                                                        |
| ------------------ | ---------------------------------------------------------------------------------- |
| qrcode             | QR code that encodes the push activation code needed for enrollment on the device  |
| send               | Sends an activation link via `email` or `sms` for users who can't scan the QR code |


### Factor Verify Result Object

Describes the outcome of a factor verification request

| Property      | Description                                       | DataType                        | Nullable | Unique | Readonly |
| ------------- | ------------------------------------------------- | ------------------------------- | -------- | ------ | -------- |
| factorResult  | result of a factor verification                   | [Factor Result](#factor-result) | FALSE    | FALSE  | TRUE     |
| factorMessage | optional display message for factor verification  | String                          | TRUE     | FALSE  | TRUE     |

#### Factor Result

Specifies the status of a factor verification attempt

| Result                 | Description                                                                                                                                |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------         |
| `SUCCESS`              | The factor was successfully verified.                                                                                                      |
| `CHALLENGE`            | Another verification is required.                                                                                                          |
| `WAITING`              | The factor verification has started but not yet completed (e.g user hasn't answered phone call yet).                                       |
| `FAILED`               | The factor verification failed.                                                                                                            |
| `REJECTED`             | The factor verification was denied by user.                                                                                                |
| `CANCELLED`            | The factor verification was canceled by user.                                                                                              |
| `TIMEOUT`              | Okta was unable to verify the factor within the allowed time window.                                                                       |
| `TIME_WINDOW_EXCEEDED` | The factor was successfully verified but outside of the computed time window.  Another verification is required in current time window.    |
| `PASSCODE_REPLAYED`    | The factor was previously verified within the same time window.  The user must wait another time window and retry with a new verification. |
| `ERROR`                | An unexpected server error occurred verifying factor.                                                                                      |
