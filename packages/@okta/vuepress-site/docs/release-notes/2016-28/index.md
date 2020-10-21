---
title: Okta API Products Release Notes
---

## 2016.28

### Feature Enhancement: Password Complexity Requirements

<!-- OKTA-88905 -->
To enable a platform client to display password
complexity requirements to the user, we've enhanced the PasswordComplexity object to include those requirements: `excludeUsername`, `age:minAgeMinutes`, and `age:historyCount`.

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

Also, the response to an answer recovery question (`/api/v1/authn/recovery/answer`) includes the PasswordPolicy object, which contains the PasswordComplexity object:

```json
{
  "stateToken": "00lMJySRYNz3u_rKQrsLvLrzxiARgivP8FB_1gpmVb",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "PASSWORD_RESET",
  "relayState": "/myapp/some/deep/link/i/want/to/return/to",
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
        "name": "resetPassword",
        "href": "https://{yourOktaDomain}/api/v1/authn/credentials/reset_password",
        "hints": {
          "allow": ["POST"]
        }
      },
      "cancel": {
        "href": "https://{yourOktaDomain}/api/v1/authn/cancel",
        "hints": {
          "allow": ["POST"]
        }
      }
  }
}
```

When performing a self-service password reset (forgot password), the request for an answer recovery question is made in response to the security question challenge.
For more information, see [Password Complexity Object](/docs/reference/api/authn/#password-complexity-object)
and [Answer Recovery Question](/docs/reference/api/authn/#answer-recovery-question).
