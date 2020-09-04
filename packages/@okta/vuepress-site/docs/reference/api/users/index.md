---
title: Users
category: management
---

# Users API

The Okta User API provides operations to manage users in your organization.

## Getting Started

Explore the Users API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/ff2ad5a39f77ba4cfabf)



## User Operations

### Create User


<ApiOperation method="post" url="/api/v1/users" />

Creates a new user in your Okta organization with or without credentials

- [Create User without Credentials](#create-user-without-credentials)
- [Create User with Recovery Question](#create-user-with-recovery-question)
- [Create User with Password](#create-user-with-password)
- [Create User with Imported Hashed Password](#create-user-with-imported-hashed-password)
- [Create User with Password Import Inline Hook](#create-user-with-password-import-inline-hook)
- [Create User with Password & Recovery Question](#create-user-with-password-recovery-question)
- [Create User with Authentication Provider](#create-user-with-authentication-provider)
- [Create User in Group](#create-user-in-group)
- [Create User with Non-Default User Type](#create-user-with-non-default-user-type)

##### Request Parameters


| Parameter     | Description                                                                                                                                                                | Param Type   | DataType                                     | Required   | Default |
| :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------      | :----------- | :------------------------------------------- | :--------- | :------ |
| activate      | Executes [activation lifecycle](#activate-user) operation when creating the user                                                                                           | Query        | Boolean                                      | FALSE      | TRUE    |
| provider      | Indicates whether to create a user with a specified authentication provider                                                                                                | Query        | Boolean                                      | FALSE      | FALSE   |
| profile       | Profile properties for user                                                                                                                                                | Body         | [Profile object](#profile-object)            | TRUE       |         |
| credentials   | Credentials for user                                                                                                                                                       | Body         | [Credentials object](#credentials-object)    | FALSE      |         |
| groupIds      | Ids of groups that user will be immediately added to at time of creation                                                                                                   | Body         | Array of Group Ids                           | FALSE      |         |
| nextLogin     | With `activate=true`, if `nextLogin=changePassword`, a user is created, activated, and the password is set to `EXPIRED`, so user must change it the next time they log in. | Query        | String                                       | FALSE      | FALSE   |

##### Response Parameters


All responses return the created [User](#user-object).  Activation of a user is an asynchronous operation.  The system performs group reconciliation during activation and assigns the user to all applications via direct or indirect relationships (group memberships).

* The user's `transitioningToStatus` property is `ACTIVE` during activation to indicate that the user hasn't completed the asynchronous operation.
* The user's `status` is `ACTIVE` when the activation process is complete.

The user is emailed a one-time activation token if activated without a password.

>**Note:** If the user is assigned to an application that is configured for provisioning, the activation process triggers downstream provisioning to the application.  It is possible for a user to login before these applications have been successfully provisioned for the user.

| Security Q & A   | Password   | Activate Query Parameter   | User Status     | Login Credential         | Welcome Screen   |
| :--------------: | :--------: | :------------------------: | :-------------: | :----------------------: | :--------------: |
|                  |            | FALSE                      | `STAGED`        |                          |                  |
|                  |            | TRUE                       | `PROVISIONED`   | One-Time Token (Email)   | X                |
| X                |            | FALSE                      | `STAGED`        |                          |                  |
| X                |            | TRUE                       | `PROVISIONED`   | One-Time Token (Email)   | X                |
|                  | X          | FALSE                      | `STAGED`        |                          |                  |
|                  | X          | TRUE                       | `ACTIVE`        | Password                 | X                |
| X                | X          | FALSE                      | `STAGED`        |                          |                  |
| X                | X          | TRUE                       | `ACTIVE`        | Password                 |                  |

Creating users with a `FEDERATION` or `SOCIAL` provider sets the user status to either `ACTIVE` or `STAGED` based on the `activate` query parameter since these two providers don't support a `password` or `recovery_question` credential.

#### Create User without Credentials


Creates a user without a [password](#password-object) or [recovery question & answer](#recovery-question-object)

When the user is activated, an email is sent to the user with an activation token that can be used to complete the activation process.
This is the default flow for new user registration using the administrator UI.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  }
}' "https://${yourOktaDomain}/api/v1/users?activate=false"
```

##### Response Example


```json
{
  "id": "00ub0oNGTSWTBKOLGLNR",
  "status": "STAGED",
  "created": "2013-07-02T21:36:25.344Z",
  "activated": null,
  "statusChanged": null,
  "lastLogin": null,
  "lastUpdated": "2013-07-02T21:36:25.344Z",
  "passwordChanged": null,
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "provider": {
      "type": "OKTA",
      "name": "OKTA"
    }
  },
  "_links": {
    "activate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/activate"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR"
    }
  }
}
```

#### Create User with Recovery Question


Creates a user without a [password](#password-object)

When the user is activated, an email is sent to the user with an activation token that can be used to complete the activation process.
This flow is useful if migrating users from an existing user store.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "recovery_question": {
      "question": "Who'\''s a major player in the cowboy scene?",
      "answer": "Annie Oakley"
    }
  }
}' "https://${yourOktaDomain}/api/v1/users?activate=false"
```

##### Response Example


```json
{
  "id": "00ub0oNGTSWTBKOLGLNR",
  "status": "STAGED",
  "created": "2013-07-02T21:36:25.344Z",
  "activated": null,
  "statusChanged": null,
  "lastLogin": null,
  "lastUpdated": "2013-07-02T21:36:25.344Z",
  "passwordChanged": null,
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "recovery_question": {
      "question": "Who's a major player in the cowboy scene?"
    },
    "provider": {
      "type": "OKTA",
      "name": "OKTA"
    }
  },
  "_links": {
    "activate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/activate"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR"
    }
  }
}
```

#### Create User with Password


Creates a user without a [recovery question & answer](#recovery-question-object)

The new user is able to sign in immediately after activation with the assigned password.
This flow is common when developing a custom user registration experience.

> Important: Do not generate or send a one-time activation token when activating users with an assigned password.  Users should sign in with their assigned password.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "password" : { "value": "tlpWENT2m" }
  }
}' "https://${yourOktaDomain}/api/v1/users?activate=true"
```

##### Response Example


```json
{
  "id": "00ub0oNGTSWTBKOLGLNR",
  "status": "STAGED",
  "created": "2013-07-02T21:36:25.344Z",
  "activated": null,
  "statusChanged": null,
  "lastLogin": null,
  "lastUpdated": "2013-07-02T21:36:25.344Z",
  "passwordChanged": "2013-07-02T21:36:25.344Z",
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "password": {},
    "provider": {
      "type": "OKTA",
      "name": "OKTA"
    }
  },
  "_links": {
    "activate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/activate"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR"
    }
  }
}
```

#### Create User with Imported Hashed Password


Creates a user with a specified [hashed password](#hashed-password-object).

The new user is able to sign in immediately after activation with the specified password.
This flow is common when migrating users from another data store in cases where we want to allow the users to retain their current passwords.

> Important: Do not generate or send a one-time activation token when activating users with an imported password.  Users should login with their imported password.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "password" : {
      "hash": {
        "algorithm": "BCRYPT",
        "workFactor": 10,
        "salt": "rwh3vH166HCH/NT9XV5FYu",
        "value": "qaMqvAPULkbiQzkTCWo5XDcvzpk8Tna"
      }
    }
  }
}' "https://${yourOktaDomain}/api/v1/users?activate=false"
```

##### Response Example


```json
{
  "id": "00ub0oNGTSWTBKOLGLNR",
  "status": "ACTIVE",
  "created": "2013-07-02T21:36:25.344Z",
  "activated": null,
  "statusChanged": null,
  "lastLogin": null,
  "lastUpdated": "2013-07-02T21:36:25.344Z",
  "passwordChanged": "2013-07-02T21:36:25.344Z",
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "password": {},
    "provider": {
      "type": "IMPORT",
      "name": "IMPORT"
    }
  },
  "_links": {
    "activate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/activate"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR"
    }
  }
}
```

#### Create User with Password Import Inline Hook


Creates a user with a [Password Hook](#password-hook-object) object specifying that a Password Inline Hook should be used to handle password verification.

The Password Inline Hook is triggered to handle verification of the end user's password the first time the user tries to sign in, with Okta calling the Password Inline Hook to check that the password the user supplied is valid. If the password is valid, Okta stores the hash of the password that was provided and can authenticate the user independently from then on. See [Password Import Inline Hook](/docs/reference/password-hook/) for more details.

The new user is able to sign in immediately after activation with the valid password. This flow supports migrating users from another data store in cases where we wish to allow the users to retain their current passwords.

> Important: Do not generate or send a one-time activation token when activating users with an Password Inline Hook.  Users should sign in with their existing password to be imported using the Password Import Inline Hook.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "password" : {
      "hook": {
        "type": "default"
      }
    }
  }
}' "https://${yourOktaDomain}/api/v1/users?activate=true"
```

##### Response Example


```json
{
  "id": "00ub0oNGTSWTBKOLGLNR",
  "status": "ACTIVE",
  "created": "2013-07-02T21:36:25.344Z",
  "activated": null,
  "statusChanged": null,
  "lastLogin": null,
  "lastUpdated": "2013-07-02T21:36:25.344Z",
  "passwordChanged": "2013-07-02T21:36:25.344Z",
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "password": {},
    "provider": {
      "type": "IMPORT",
      "name": "IMPORT"
    }
  },
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR"
    }
  }
}
```

#### Create User with Password & Recovery Question


Creates a new user with a [password](#password-object) and [recovery question & answer](#recovery-question-object)

The new user is able to log in with the assigned password immediately after activation.
This flow is common when developing a custom user-registration experience.

> Important: Don't generate or send a one-time activation token when activating users with an assigned password.  Users should login with their assigned password.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "password" : { "value": "tlpWENT2m" },
    "recovery_question": {
      "question": "Who'\''s a major player in the cowboy scene?",
      "answer": "Annie Oakley"
    }
  }
}' "https://${yourOktaDomain}/api/v1/users?activate=false"
```

##### Response Example


```json
{
  "id": "00ub0oNGTSWTBKOLGLNR",
  "status": "STAGED",
  "created": "2013-07-02T21:36:25.344Z",
  "activated": null,
  "statusChanged": null,
  "lastLogin": null,
  "lastUpdated": "2013-07-02T21:36:25.344Z",
  "passwordChanged": "2013-07-02T21:36:25.344Z",
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "password": {},
    "recovery_question": {
      "question": "Who's a major player in the cowboy scene?"
    },
    "provider": {
      "type": "OKTA",
      "name": "OKTA"
    }
  },
  "_links": {
    "activate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/activate"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR"
    }
  }
}
```

#### Create User with Authentication Provider


Creates a new passwordless user with a `SOCIAL` or `FEDERATION` [authentication provider](#provider-object) that must be authenticated via a trusted Identity Provider

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "provider": {
      "type": "FEDERATION",
      "name": "FEDERATION"
    }
  }
}' "https://${yourOktaDomain}/api/v1/users?provider=true"
```

##### Response Example


```json
{
  "id": "00uijntSwJjSHtDY70g3",
  "status": "ACTIVE",
  "created": "2016-01-19T22:02:08.000Z",
  "activated": "2016-01-19T22:02:08.000Z",
  "statusChanged": "2016-01-19T22:02:08.000Z",
  "lastLogin": null,
  "lastUpdated": "2016-01-19T22:02:08.000Z",
  "passwordChanged": null,
  "profile": {
    "login": "isaac.brock@example.com",
    "firstName": "Isaac",
    "lastName": "Brock",
    "mobilePhone": "555-415-1337",
    "email": "isaac.brock@example.com",
    "secondEmail": null
  },
  "credentials": {
    "provider": {
      "type": "FEDERATION",
      "name": "FEDERATION"
    }
  },
  "_links": {
    "resetPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00uijntSwJjSHtDY70g3/lifecycle/reset_password",
      "method": "POST"
    },
    "changeRecoveryQuestion": {
      "href": "https://${yourOktaDomain}/api/v1/users/00uijntSwJjSHtDY70g3/credentials/change_recovery_question",
      "method": "POST"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00uijntSwJjSHtDY70g3/lifecycle/deactivate",
      "method": "POST"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR"
    }
  }
}
```

#### Create User in Group


Creates a user that is immediately added to the specified groups upon creation

Use this in conjunction with other create operations for a Group Administrator that is scoped to create users only in specified groups.  The request may specify up to 20 group ids.  (This limit applies only when creating a user.  The user may later be added to more groups.)

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "groupIds": [
    "00g1emaKYZTWRYYRRTSK",
    "00garwpuyxHaWOkdV0g4"
  ]
}' "https://${yourOktaDomain}/api/v1/users?activate=false"
```

##### Response Example


```json
{
  "id": "00ub0oNGTSWTBKOLGLNR",
  "status": "STAGED",
  "created": "2013-07-02T21:36:25.344Z",
  "activated": null,
  "statusChanged": null,
  "lastLogin": null,
  "lastUpdated": "2013-07-02T21:36:25.344Z",
  "passwordChanged": null,
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "provider": {
      "type": "OKTA",
      "name": "OKTA"
    }
  },
  "_links": {
    "activate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/activate"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR"
    }
  }
}
```

#### Create User with Non-Default User Type

Creates a user with a specified User Type (see [User Types](/docs/reference/api/user-types)). The type specification may be included with any of the above Create User operations; this example demonstrates creating a user without credentials.

The User Type determines which [Schema](/docs/reference/api/schemas) applies to that user. After a user has been created, the user can be assigned a different User Type only by an administrator via a full replacement [PUT operation](/docs/reference/api/user-types/#update-user-type).

##### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "type": {
    "id": "otyfnjfba4ye7pgjB0g4"
  }
}' "https://${yourOktaDomain}/api/v1/users?activate=false"
```

##### Response Example

```json
{
  "id": "00ub0oNGTSWTBKOLGLNR",
  "status": "STAGED",
  "created": "2013-07-02T21:36:25.344Z",
  "activated": null,
  "statusChanged": null,
  "lastLogin": null,
  "lastUpdated": "2013-07-02T21:36:25.344Z",
  "passwordChanged": null,
  "type": {
    "id": "otyfnjfba4ye7pgjB0g4"
  },
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "provider": {
      "type": "OKTA",
      "name": "OKTA"
    }
  },
  "_links": {
    "schema": {
      "href": "https://${yourOktaDomain}/api/v1/meta/schemas/user/oscfnjfba4ye7pgjB0g4"
    },
    "activate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/activate"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR"
    },
    "type": {
      "href": "https://${yourOktaDomain}/api/v1/meta/types/user/otyfnjfba4ye7pgjB0g4"
    }
  }
}
```

### Get User


<ApiOperation method="get" url="/api/v1/users/${userId}" /> <SupportsCors />

Fetches a user from your Okta organization

- [Get Current User](#get-current-user)
- [Get User with ID](#get-user-with-id)
- [Get User with Login](#get-user-with-login)
- [Get User with Login Shortname](#get-user-with-login-shortname)

##### Request Parameters


Fetch a user by `id`, `login`, or `login shortname` if the short name is unambiguous.

| Parameter | Description                                                        | Param Type | DataType | Required |
| --------- | ------------------------------------------------------------------ | ---------- | -------- | -------- |
| id        | `id`, `login`, or *login shortname* (as long as it is unambiguous) | URL        | String   | TRUE     |

> When fetching a user by `login` or `login shortname`, you should [URL encode](http://en.wikipedia.org/wiki/Percent-encoding) the request parameter to ensure special characters are escaped properly.  Logins with a `/` or `?`  character can only be fetched by `id` due to URL issues with escaping the `/` and `?` characters.

>Hint: you can substitute `me` for the `id` to fetch the current user linked to an API token or session cookie.

>**Note:** Some browsers have begun blocking third-party cookies by default, disrupting Okta functionality in certain flows. For information see [FAQ: How Blocking Third Party Cookies Can Potentially Impact Your Okta Environment](https://support.okta.com/help/s/article/FAQ-How-Blocking-Third-Party-Cookies-Can-Potentially-Impact-Your-Okta-Environment).

##### Response Parameters


Fetched [User](#user-object)

An invalid `id` returns a `404 Not Found` status code.

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
    "errorCode": "E0000007",
    "errorSummary": "Not found: Resource not found: missing@example.com (User)",
    "errorLink": "E0000007",
    "errorId": "oaewgzWY_IaSs6G8Cf2TzzIsA",
    "errorCauses": []
}
```

#### Get Current User


Fetches the current user linked to API token or session cookie

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/me"
```

##### Response Example


```json
{
  "id": "00ub0oNGTSWTBKOLGLNR",
  "status": "ACTIVE",
  "created": "2013-06-24T16:39:18.000Z",
  "activated": "2013-06-24T16:39:19.000Z",
  "statusChanged": "2013-06-24T16:39:19.000Z",
  "lastLogin": "2013-06-24T17:39:19.000Z",
  "lastUpdated": "2013-07-02T21:36:25.344Z",
  "passwordChanged": "2013-07-02T21:36:25.344Z",
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "password": {},
    "recovery_question": {
      "question": "Who's a major player in the cowboy scene?"
    },
    "provider": {
      "type": "OKTA",
      "name": "OKTA"
    }
  },
  "_links": {
    "resetPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_password"
    },
    "resetFactors": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_factors"
    },
    "expirePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/expire_password"
    },
    "forgotPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/forgot_password"
    },
    "changeRecoveryQuestion": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/change_recovery_question"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/deactivate"
    },
    "changePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/change_password"
    }
  }
}
```

#### Get User with ID


Fetches a specific user when you know the user's `id`

> Hint: If you don't know the user `id`, [list the users](#list-users) to find the correct ID.

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR"
```

##### Response Example


```json
{
  "id": "00ub0oNGTSWTBKOLGLNR",
  "status": "ACTIVE",
  "created": "2013-06-24T16:39:18.000Z",
  "activated": "2013-06-24T16:39:19.000Z",
  "statusChanged": "2013-06-24T16:39:19.000Z",
  "lastLogin": "2013-06-24T17:39:19.000Z",
  "lastUpdated": "2013-07-02T21:36:25.344Z",
  "passwordChanged": "2013-07-02T21:36:25.344Z",
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "password": {},
    "recovery_question": {
      "question": "Who's a major player in the cowboy scene?"
    },
    "provider": {
      "type": "OKTA",
      "name": "OKTA"
    }
  },
  "_links": {
    "resetPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_password"
    },
    "resetFactors": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_factors"
    },
    "expirePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/expire_password"
    },
    "forgotPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/forgot_password"
    },
    "changeRecoveryQuestion": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/change_recovery_question"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/deactivate"
    },
    "changePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/change_password"
    }
  }
}
```

#### Get User with Login


Fetches a specific user when you know the user's `login`

When fetching a user by `login`, [URL encode](http://en.wikipedia.org/wiki/Percent-encoding) the request parameter to ensure special characters are escaped properly.
Logins with a `/` character can only be fetched by `id` due to URL issues with escaping the `/` character.

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/isaac.brock@example.com"
```

##### Response Example


```json
{
  "id": "00ub0oNGTSWTBKOLGLNR",
  "status": "ACTIVE",
  "created": "2013-06-24T16:39:18.000Z",
  "activated": "2013-06-24T16:39:19.000Z",
  "statusChanged": "2013-06-24T16:39:19.000Z",
  "lastLogin": "2013-06-24T17:39:19.000Z",
  "lastUpdated": "2013-07-02T21:36:25.344Z",
  "passwordChanged": "2013-07-02T21:36:25.344Z",
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "password": {},
    "recovery_question": {
      "question": "Who's a major player in the cowboy scene?"
    },
    "provider": {
      "type": "OKTA",
      "name": "OKTA"
    }
  },
  "_links": {
    "resetPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_password"
    },
    "resetFactors": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_factors"
    },
    "expirePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/expire_password"
    },
    "forgotPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/forgot_password"
    },
    "changeRecoveryQuestion": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/change_recovery_question"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/deactivate"
    },
    "changePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/change_password"
    }
  }
}
```

#### Get User with Login Shortname


Fetches a specific user when you know the user's `login shortname` and the shortname is unique within the organization

When fetching a user by `login shortname`, [URL encode](http://en.wikipedia.org/wiki/Percent-encoding) the request parameter to ensure special characters are escaped properly.
Logins with a `/` character can only be fetched by `id` due to URL issues with escaping the `/` character.

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/isaac.brock"
```

##### Response Example


```json
{
  "id": "00ub0oNGTSWTBKOLGLNR",
  "status": "ACTIVE",
  "created": "2013-06-24T16:39:18.000Z",
  "activated": "2013-06-24T16:39:19.000Z",
  "statusChanged": "2013-06-24T16:39:19.000Z",
  "lastLogin": "2013-06-24T17:39:19.000Z",
  "lastUpdated": "2013-07-02T21:36:25.344Z",
  "passwordChanged": "2013-07-02T21:36:25.344Z",
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "password": {},
    "recovery_question": {
      "question": "Who's a major player in the cowboy scene?"
    },
    "provider": {
      "type": "OKTA",
      "name": "OKTA"
    }
  },
  "_links": {
    "resetPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_password"
    },
    "resetFactors": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_factors"
    },
    "expirePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/expire_password"
    },
    "forgotPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/forgot_password"
    },
    "changeRecoveryQuestion": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/change_recovery_question"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/deactivate"
    },
    "changePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/change_password"
    }
  }
}
```

### List Users


<ApiOperation method="get" url="/api/v1/users" />

Lists users in your organization with pagination in most cases

A subset of users can be returned that match a supported filter expression or search criteria.

##### Request Parameters


The first three parameters in the table below correspond to different types of lists:

- [List All Users](#list-all-users) (no parameters)
- [Find Users](#find-users) (`q`)
- [List Users with a Filter](#list-users-with-a-filter) (`filter`)
- [List Users with Search](#list-users-with-search) (`search`)

| Parameter   | Description                                                                                                                                    | Param Type   | DataType   | Required |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------- | :----------- | :--------- | :------- |
| q           | Finds a user that matches `firstName`, `lastName`, and `email` properties                                                                      | Query        | String     | FALSE    |
| filter      | [Filters](/docs/reference/api-overview/#filtering) users with a supported expression for a subset of properties                  | Query        | String     | FALSE    |
| search      | Searches for users with a supported [filtering](/docs/reference/api-overview/#filtering) expression for most properties          | Query        | String     | FALSE    |
| limit       | Specifies the number of results returned (maximum 200)                                                                                         | Query        | Number     | FALSE    |
| after       | Specifies the pagination cursor for the next page of users                                                                                     | Query        | String     | FALSE    |
| sortBy      | Specifies field to sort by (for search queries only)                                                                                           | Search query | String     | FALSE    |
| sortOrder   | Specifies sort order asc or desc (for search queries only)                                                                                     | Search query | String     | FALSE    |

  * If you don't specify a value for `limit`, the maximum (200) is used as a default.  If you are using a `q` parameter, the default limit is 10.
  * An HTTP 500 status code usually indicates that you have exceeded the request timeout.  Retry your request with a smaller limit and paginate the results. For more information, see [Pagination](/docs/reference/api-overview/#pagination).
  * Treat the `after` cursor as an opaque value and obtain it through the next link relation. See [Pagination](/docs/reference/api-overview/#pagination).

##### Response Parameters


Array of [User](#user-object)

#### List All Users


Returns a list of all users that do not have a status of `DEPROVISIONED`, up to the maximum (200 for most orgs)

Different results are returned depending on specified queries in the request.


##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users?limit=200"
```

##### Response Example


```http
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://${yourOktaDomain}/api/v1/users?limit=200>; rel="self"
Link: <https://${yourOktaDomain}/api/v1/users?after=00ud4tVDDXYVKPXKVLCO&limit=200>; rel="next"

[
  {
    "id": "00ub0oNGTSWTBKOLGLNR",
    "status": "STAGED",
    "created": "2013-07-02T21:36:25.344Z",
    "activated": null,
    "statusChanged": null,
    "lastLogin": null,
    "lastUpdated": "2013-07-02T21:36:25.344Z",
    "passwordChanged": "2013-07-02T21:36:25.344Z",
    "profile": {
      "firstName": "Isaac",
      "lastName": "Brock",
      "email": "isaac.brock@example.com",
      "login": "isaac.brock@example.com",
      "mobilePhone": "555-415-1337"
    },
    "credentials": {
      "provider": {
        "type": "OKTA",
        "name": "OKTA"
      }
    },
    "_links": {
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR"
      }
    }
  },
  {
    "id": "00ub0oNGTSWTBKOLGLNR",
    "status": "ACTIVE",
    "created": "2013-06-24T16:39:18.000Z",
    "activated": "2013-06-24T16:39:19.000Z",
    "statusChanged": "2013-06-24T16:39:19.000Z",
    "lastLogin": "2013-06-24T17:39:19.000Z",
    "lastUpdated": "2013-07-02T21:36:25.344Z",
    "passwordChanged": "2013-07-02T21:36:25.344Z",
    "profile": {
      "firstName": "Eric",
      "lastName": "Judy",
      "email": "eric.judy@example.com",
      "secondEmail": "eric@example.org",
      "login": "eric.judy@example.com",
      "mobilePhone": "555-415-2011"
    },
    "credentials": {
      "password": {},
      "recovery_question": {
        "question": "The stars are projectors?"
      },
      "provider": {
        "type": "OKTA",
        "name": "OKTA"
      }
    },
    "_links": {
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR"
      }
    }
  }
]
```

#### Find Users


Finds users who match the specified query

Use the `q` parameter for a simple lookup of users by name, for example when creating a people picker.
The value of `q` is matched against `firstName`, `lastName`, or `email`.


This operation:

 * Doesn't support pagination.
 * Queries the most up-to-date data. For example, if you create a user or change an attribute and then issue a filter request, the change is reflected in the results.
 * Performs a startsWith match but this is an implementation detail and may change without notice. You don't need to specify `firstName`, `lastName`, or `email`.

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users?q=eric&limit=1"
```

##### Response Example


```json
[
  {
    "id": "00ub0oNGTSWTBKOLGLNR",
    "status": "ACTIVE",
    "created": "2013-06-24T16:39:18.000Z",
    "activated": "2013-06-24T16:39:19.000Z",
    "statusChanged": "2013-06-24T16:39:19.000Z",
    "lastLogin": "2013-06-24T17:39:19.000Z",
    "lastUpdated": "2013-07-02T21:36:25.344Z",
    "passwordChanged": "2013-07-02T21:36:25.344Z",
    "profile": {
      "firstName": "Eric",
      "lastName": "Judy",
      "email": "eric.judy@example.com",
      "secondEmail": "eric@example.org",
      "login": "eric.judy@example.com",
      "mobilePhone": "555-415-2011"
    },
    "credentials": {
      "password": {},
      "recovery_question": {
        "question": "The stars are projectors?"
      },
      "provider": {
        "type": "OKTA",
        "name": "OKTA"
      }
    },
    "_links": {
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR"
      }
    }
  }
]
```

> **Note:** This omits users that have a status of `DEPROVISIONED`. To return all users, use a [filter query](#list-users-with-a-filter) instead.

#### List Users with a Filter


Lists all users that match the filter criteria

This operation:

* Filters against the most up-to-date data. For example, if you create a user or change an attribute and then issue a filter request,
the changes are reflected in your results.
* Requires [URL encoding](http://en.wikipedia.org/wiki/Percent-encoding). For example, `filter=lastUpdated gt "2013-06-01T00:00:00.000Z"` is encoded as `filter=lastUpdated%20gt%20%222013-06-01T00:00:00.000Z%22`.
Examples use cURL-style escaping instead of URL encoding to make them easier to read.
* Supports only a limited number of properties: `status`, `lastUpdated`, `id`, `profile.login`, `profile.email`, `profile.firstName`, and `profile.lastName`.

| Filter                                          | Description                                      |
| :---------------------------------------------- | :----------------------------------------------- |
| `status eq "STAGED"`                            | Users that have a `status` of `STAGED`           |
| `status eq "PROVISIONED"`                       | Users that have a `status` of `PROVISIONED`      |
| `status eq "ACTIVE"`                            | Users that have a `status` of `ACTIVE`           |
| `status eq "RECOVERY"`                          | Users that have a `status` of `RECOVERY`         |
| `status eq "PASSWORD_EXPIRED"`                  | Users that have a `status` of `PASSWORD_EXPIRED` |
| `status eq "LOCKED_OUT"`                        | Users that have a `status` of `LOCKED_OUT`       |
| `status eq "DEPROVISIONED"`                     | Users that have a `status` of `DEPROVISIONED`    |
| `lastUpdated lt "yyyy-MM-dd'T'HH:mm:ss.SSSZ"`   | Users last updated before a specific timestamp   |
| `lastUpdated eq "yyyy-MM-dd'T'HH:mm:ss.SSSZ"`   | Users last updated at a specific timestamp       |
| `lastUpdated gt "yyyy-MM-dd'T'HH:mm:ss.SSSZ"`   | Users last updated after a specific timestamp    |
| `id eq "00u1ero7vZFVEIYLWPBN"`                  | Users with a specified `id`                      |
| `profile.login eq "login@example.com"`          | Users with a specified `login`                   |
| `profile.email eq "email@example.com"`          | Users with a specified `email`*                  |
| `profile.firstName eq "John"`                   | Users with a specified `firstName`*              |
| `profile.lastName eq "Smith" `                  | Users with a specified `lastName`*               |

> Hint: If filtering by `email`, `lastName`, or `firstName`, it may be easier to use `q` instead of `filter`.

See [Filtering](/docs/reference/api-overview/#filtering) for more information about the expressions used in filtering.

##### Filter Examples

List users with status of `LOCKED_OUT`

    filter=status eq "LOCKED_OUT"

List users updated after 06/01/2013 but before 01/01/2014

    filter=lastUpdated gt "2013-06-01T00:00:00.000Z" and lastUpdated lt "2014-01-01T00:00:00.000Z"

List users updated after 06/01/2013 but before 01/01/2014 with a status of `ACTIVE`

    filter=lastUpdated gt "2013-06-01T00:00:00.000Z" and lastUpdated lt "2014-01-01T00:00:00.000Z" and status eq "ACTIVE"

List users updated after 06/01/2013 but with a status of `LOCKED_OUT` or `RECOVERY`

    filter=lastUpdated gt "2013-06-01T00:00:00.000Z" and (status eq "LOCKED_OUT" or status eq "RECOVERY")


##### Request Example: Status


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users?filter=status+eq+\"ACTIVE\"+or+status+eq+\"RECOVERY\""
```


##### Response Example


```json
[
  {
    "id": "00ub0oNGTSWTBKOLGLNR",
    "status": "ACTIVE",
    "created": "2013-06-24T16:39:18.000Z",
    "activated": "2013-06-24T16:39:19.000Z",
    "statusChanged": "2013-06-24T16:39:19.000Z",
    "lastLogin": "2013-06-24T17:39:19.000Z",
    "lastUpdated": "2013-07-02T21:36:25.344Z",
    "passwordChanged": "2013-07-02T21:36:25.344Z",
    "profile": {
      "firstName": "Eric",
      "lastName": "Judy",
      "email": "eric.judy@example.com",
      "secondEmail": "eric@example.org",
      "login": "eric.judy@example.com",
      "mobilePhone": "555-415-2011"
    },
    "credentials": {
      "password": {},
      "recovery_question": {
        "question": "The stars are projectors?"
      },
      "provider": {
        "type": "OKTA",
        "name": "OKTA"
      }
    },
    "_links": {
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR"
      }
    }
  }
]
```

##### Request Example: Timestamp


Lists all users that have been updated since a specific timestamp

Use this operation when implementing a background synchronization job and you want to poll for changes.

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users?filter=lastUpdated+gt+\"2013-07-01T00:00:00.000Z\""
```

##### Response Example


```json
[
  {
    "id": "00ub0oNGTSWTBKOLGLNR",
    "status": "ACTIVE",
    "created": "2013-06-24T16:39:18.000Z",
    "activated": "2013-06-24T16:39:19.000Z",
    "statusChanged": "2013-06-24T16:39:19.000Z",
    "lastLogin": "2013-06-24T17:39:19.000Z",
    "lastUpdated": "2013-07-02T21:36:25.344Z",
    "passwordChanged": "2013-07-02T21:36:25.344Z",
    "profile": {
      "firstName": "Eric",
      "lastName": "Judy",
      "email": "eric.judy@example.com",
      "secondEmail": "eric@example.org",
      "login": "eric.judy@example.com",
      "mobilePhone": "555-415-2011"
    },
    "credentials": {
      "password": {},
      "recovery_question": {
        "question": "The stars are projectors?"
      },
      "provider": {
        "type": "OKTA",
        "name": "OKTA"
      }
    },
    "_links": {
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR"
      }
    }
  }
]
```

#### List Users with Search

Searches for users based on the properties specified in the search parameter

> **Note:** Listing users with search should not be used as a part of any critical flows, such as authentication, to prevent potential data loss. Search results may not reflect the latest information, as this endpoint uses a search index which may not be up-to-date with recent updates to the object.

Property names in the search parameter are case sensitive, whereas operators (`eq`, `sw`, etc.) and string values are case insensitive.  Unlike in [user logins](#okta-login), diacritical marks are significant in search string values: a search for `isaac.brock` will find `Isaac.Brock` but will not find a property whose value is `isáàc.bröck`. 

This operation:

* Supports [pagination](/docs/reference/api-overview/#pagination).
* Requires [URL encoding](http://en.wikipedia.org/wiki/Percent-encoding).
For example, `search=profile.department eq "Engineering"` is encoded as `search=profile.department%20eq%20%22Engineering%22`.
Examples use cURL-style escaping instead of URL encoding to make them easier to read.
Use an ID lookup for records that you update to ensure your results contain the latest data.
* Searches many properties:
   - Any user profile property, including custom-defined properties
   - The top-level properties `id`, `status`, `created`, `activated`, `statusChanged` and `lastUpdated`
   - The [User Type](/docs/reference/api/user-types), accessed as `type.id`
* Accepts `sortBy` and `sortOrder` parameters.
   - `sortBy` can be any single property, for example `sortBy=profile.lastName`
   - `sortOrder` is optional and defaults to ascending
   - `sortOrder` is ignored if `sortBy` is not present
   - Users with the same value for the `sortBy` property will be ordered by `id`

| Search Term Example                             | Description                                     |
| :---------------------------------------------- | :---------------------------------------------- |
| `status eq "STAGED"`                            | Users that have a `status` of `STAGED`          |
| `lastUpdated gt "yyyy-MM-dd'T'HH:mm:ss.SSSZ"`   | Users last updated after a specific timestamp   |
| `id eq "00u1ero7vZFVEIYLWPBN"`                  | Users with a specified `id`                     |
| `type.id eq "otyfnjfba4ye7pgjB0g4"`             | Users with a specified User Type ID             |
| `profile.department eq "Engineering"`           | Users that have a `department` of `Engineering` |
| `profile.occupation eq "Leader"`                | Users that have an `occupation` of `Leader`     |
| `profile.lastName sw "Sm" `                     | Users whose `lastName` starts with `Sm`         |

##### Search Examples

List users with an occupation of `Leader`

    search=profile.occupation eq "Leader"

List users in the department of `Engineering` who were created before `01/01/2014` or have a status of `ACTIVE`.

    search=profile.department eq "Engineering" and (created lt "2014-01-01T00:00:00.000Z" or status eq "ACTIVE")

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users?search=profile.mobilePhone+sw+\"555\"+and+status+eq+\"ACTIVE\""
```

##### Response Example


```json
[
  {
    "id": "00ub0oNGTSWTBKOLGLNR",
    "status": "ACTIVE",
    "created": "2013-06-24T16:39:18.000Z",
    "activated": "2013-06-24T16:39:19.000Z",
    "statusChanged": "2013-06-24T16:39:19.000Z",
    "lastLogin": "2013-06-24T17:39:19.000Z",
    "lastUpdated": "2013-07-02T21:36:25.344Z",
    "passwordChanged": "2013-07-02T21:36:25.344Z",
    "profile": {
      "firstName": "Isaac",
      "lastName": "Brock",
      "email": "isaac.brock@example.com",
      "login": "isaac.brock@example.com",
      "mobilePhone": "555-415-1337"
    },
    "credentials": {
      "password": {},
      "recovery_question": {
        "question": "Who's a major player in the cowboy scene?"
      },
      "provider": {
        "type": "OKTA",
        "name": "OKTA"
      }
    },
    "_links": {
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR"
      }
    }
  }
]
```

##### Searching Arrays

You can search properties that are arrays. If any element matches the search term, the entire array (object) is returned.
For examples, see [Request Example for Array](#request-example-for-array) and [Response Example for Array](#response-example-for-array).

* We follow the [SCIM Protocol Specification](https://tools.ietf.org/html/rfc7644#section-3.4.2.2) for searching arrays.
* Search for one value at a time when searching arrays. For example, you can't search for users where a string is equal to an attribute in two different arrays.

##### Request Example for Array


The following example is for a custom attribute on User, an array of strings named `arrayAttr` that contains values `["arrayAttrVal1", "arrayAttrVal2"...]`.

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users?search=profile.arrayAttr+eq+\"arrayAttrVal1\" "
```

##### Response Example for Array


```json
[
    {
        "id": "00u19uiKQa0xXkbdGLNR",
        "status": "PROVISIONED",
        "created": "2016-03-15T04:21:51.000Z",
        "activated": "2016-03-15T04:21:52.000Z",
        "statusChanged": "2016-03-15T04:21:52.000Z",
        "lastLogin": null,
        "lastUpdated": "2016-03-17T07:08:15.000Z",
        "passwordChanged": null,
        "profile": {
            "login": "u7@test.com",
            "mobilePhone": null,
            "email": "u7@test.com",
            "secondEmail": "",
            "firstName": "u7",
            "lastName": "u7",
            "boolAttr": true,
            "intAttr": 99,
            "strArray": [
                "strArrayVal1",
                "strArrayVal2"
            ],
            "intArray": [
                5,
                8
            ],
            "numAttr": 8.88,
            "attr1": "attr1ValUpdated3",
            "arrayAttr": [
                "arrayAttrVal1",
                "arrayAttrVal2Updated"
            ],
            "numArray": [
                1.23,
                4.56
            ]
        },
        "credentials": {
            "provider": {
                "type": "OKTA",
                "name": "OKTA"
            }
        },
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/users/00u19uiKQa0xXkbdGLNR"
            }
        }
    }
]
```

### Update User


> **Note:** Use the `POST` method to make a partial update and the `PUT` method to delete unspecified properties.

<ApiOperation method="put" url="/api/v1/users/${userId}" />

Updates a user's profile and/or credentials using strict-update semantics

All profile properties must be specified when updating a user's profile with a `PUT` method. Any property not specified
in the request is deleted.

>Important: Don't use `PUT` method for partial updates.

##### Request Parameters


| Parameter     | Description                                                          | Param Type   | DataType                                    | Required |
| :------------ | :------------------------------------------------------------------- | :----------- | :------------------------------------------ | :------- |
| userId        | ID of user to update                                                 | URL          | String                                      | TRUE     |
| strict        | If true, validates against minimum age and history password policy   | Query        | String                                      | FALSE    |
| profile       | Updated profile for user                                             | Body         | [Profile object](#profile-object)           | FALSE    |
| credentials   | Update credentials for user                                          | Body         | [Credentials object](#credentials-object)   | FALSE    |

`profile` and `credentials` can be updated independently or together with a single request.

>**Note:** Currently, the User Type of a user can only be changed via a full replacement [PUT operation](/docs/reference/api/user-types/#update-user-type). If the Request Parameters of a partial update include the `type` element from the [User object](#user-object), the value must match the existing type of the user. Only administrators are permitted to change the user type of a user; end users are not allowed to change their own user type. 

##### Response Parameters


Updated [User](#user-object)

#### Update Current User's Profile


<ApiOperation method="post" url="/api/v1/users/me" /> <SupportsCors />

Updates current user's profile with partial update semantics

##### Request Parameters


| Parameter     | Description                                                          | Param Type   | DataType                                    | Required |
| :------------ | :------------------------------------------------------------------- | :----------- | :------------------------------------------ | :------- |
| profile       | Updated profile for user                                             | Body         | [Profile object](#profile-object)           | FALSE    |

End user can only update `profile` with this request. To update credentials, use [Update Profile with ID](#update-profile-with-id).

>**Note:** An end user can only update profile properties for which the user has write access. To update user permissions for a schema property,
use [Update User Profile Schema Property](/docs/reference/api/schemas/#update-user-profile-schema-property)

##### Response Parameters


Updated [User](#user-object)

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "firstName": "Isaac",
    "email": "isaac.brock@update.example.com",
    "mobilePhone": "555-415-1337"
  }
}' "https://${yourOktaDomain}/api/v1/users/me"
```

##### Response Example


```json
{
  "id": "00ub0oNGTSWTBKOLGLNR",
  "status": "ACTIVE",
  "created": "2013-06-24T16:39:18.000Z",
  "activated": "2013-06-24T16:39:19.000Z",
  "statusChanged": "2013-06-24T16:39:19.000Z",
  "lastLogin": "2013-06-24T17:39:19.000Z",
  "lastUpdated": "2015-07-02T21:36:25.344Z",
  "passwordChanged": "2013-07-02T21:36:25.344Z",
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@update.example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "password": {},
    "recovery_question": {
      "question": "Who's a major player in the cowboy scene?"
    },
    "provider": {
      "type": "OKTA",
      "name": "OKTA"
    }
  },
  "_links": {
    "resetPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_password"
    },
    "resetFactors": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_factors"
    },
    "expirePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/expire_password"
    },
    "forgotPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/forgot_password"
    },
    "changeRecoveryQuestion": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/change_recovery_question"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/deactivate"
    },
    "changePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/change_password"
    }
  }
}
```

#### Update Profile with ID


<ApiOperation method="post" url="/api/v1/users/${userId}" />

Updates a user's profile or credentials with partial update semantics

> Important: Use the `POST` method for partial updates. Unspecified properties are set to null with `PUT`.

##### Request Parameters


| Parameter     | Description                                                          | Param Type   | DataType                                    | Required |
| :------------ | :------------------------------------------------------------------- | :----------- | :------------------------------------------ | :------- |
| userId        | ID of user to update                                                 | URL          | String                                      | TRUE     |
| strict        | If true, validates against minimum age and history password policy   | Query        | String                                      | FALSE    |
| profile       | Updated profile for user                                             | Body         | [Profile object](#profile-object)           | FALSE    |
| credentials   | Update credentials for user                                          | Body         | [Credentials object](#credentials-object)   | FALSE    |

`profile` and `credentials` can be updated independently or with a single request.

##### Response Parameters


Updated [User](#user-object)

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "firstName": "Isaac",
    "email": "isaac.brock@update.example.com",
    "mobilePhone": "555-415-1337"
  }
}' "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR"
```

##### Response Example


```json
{
  "id": "00ub0oNGTSWTBKOLGLNR",
  "status": "ACTIVE",
  "created": "2013-06-24T16:39:18.000Z",
  "activated": "2013-06-24T16:39:19.000Z",
  "statusChanged": "2013-06-24T16:39:19.000Z",
  "lastLogin": "2013-06-24T17:39:19.000Z",
  "lastUpdated": "2015-07-02T21:36:25.344Z",
  "passwordChanged": "2013-07-02T21:36:25.344Z",
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@update.example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "password": {},
    "recovery_question": {
      "question": "Who's a major player in the cowboy scene?"
    },
    "provider": {
      "type": "OKTA",
      "name": "OKTA"
    }
  },
  "_links": {
    "resetPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_password"
    },
    "resetFactors": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_factors"
    },
    "expirePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/expire_password"
    },
    "forgotPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/forgot_password"
    },
    "changeRecoveryQuestion": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/change_recovery_question"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/deactivate"
    },
    "changePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/change_password"
    }
  }
}
```

#### Set Password


Sets passwords without validating existing user credentials

This is an administrative operation.  For operations that validate credentials refer to [Reset Password](#reset-password), [Forgot Password](#forgot-password), and [Change Password](#change-password).

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "credentials": {
    "password" : { "value": "uTVM,TPw55" }
  }
}' "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR"
```

##### Response Example


```json
{
  "id": "00ub0oNGTSWTBKOLGLNR",
  "status": "ACTIVE",
  "created": "2013-06-24T16:39:18.000Z",
  "activated": "2013-06-24T16:39:19.000Z",
  "statusChanged": "2013-06-24T16:39:19.000Z",
  "lastLogin": "2013-06-24T17:39:19.000Z",
  "lastUpdated": "2013-07-02T21:36:25.344Z",
  "passwordChanged": "2013-07-02T21:36:25.344Z",
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "password": {},
    "recovery_question": {
      "question": "Who's a major player in the cowboy scene?"
    },
    "provider": {
      "type": "OKTA",
      "name": "OKTA"
    }
  },
  "_links": {
    "resetPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_password"
    },
    "resetFactors": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_factors"
    },
    "expirePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/expire_password"
    },
    "forgotPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/forgot_password"
    },
    "changeRecoveryQuestion": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/change_recovery_question"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/deactivate"
    },
    "changePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/change_password"
    }
  }
}
```

#### Set Recovery Question & Answer


Sets recovery question and answer without validating existing user credentials

This is an administrative operation. For an operation that requires validation, see [Change Recovery Question](#change-recovery-question).

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "credentials": {
    "recovery_question": {
      "question": "How many roads must a man walk down?",
      "answer": "forty two"
    }
  }
}' "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR"
```

##### Response Example


```json
{
  "id": "00ub0oNGTSWTBKOLGLNR",
  "status": "ACTIVE",
  "created": "2013-06-24T16:39:18.000Z",
  "activated": "2013-06-24T16:39:19.000Z",
  "statusChanged": "2013-06-24T16:39:19.000Z",
  "lastLogin": "2013-06-24T17:39:19.000Z",
  "lastUpdated": "2013-07-02T21:36:25.344Z",
  "passwordChanged": "2013-07-02T21:36:25.344Z",
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "password": {},
    "recovery_question": {
      "question": "I have a new recovery question?"
    },
    "provider": {
      "type": "OKTA",
      "name": "OKTA"
    }
  },
  "_links": {
    "resetPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_password"
    },
    "resetFactors": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_factors"
    },
    "expirePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/expire_password"
    },
    "forgotPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/forgot_password"
    },
    "changeRecoveryQuestion": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/change_recovery_question"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/deactivate"
    },
    "changePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/change_password"
    }
  }
}
```

## Related Resources

### Get Assigned App Links


<ApiOperation method="get" url="/api/v1/users/${userId}/appLinks" />

<SupportsCors />

Fetches appLinks for all direct or indirect (via group membership) assigned applications

##### Request Parameters


| Parameter | Description  | Param Type | DataType | Required |
| --------- | ------------ | ---------- | -------- | -------- |
| id        | `id` of user | URL        | String   | TRUE     |

##### Response Parameters


Array of App Links

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/appLinks"
```

##### Response Example


```json
[
  {
    "id": "00ub0oNGTSWTBKOLGLNR",
    "label": "Google Apps Mail",
    "linkUrl": "https://${yourOktaDomain}/home/google/0oa3omz2i9XRNSRIHBZO/50",
    "logoUrl": "https://${yourOktaDomain}/img/logos/google-mail.png",
    "appName": "google",
    "appInstanceId": "0oa3omz2i9XRNSRIHBZO",
    "appAssignmentId": "0ua3omz7weMMMQJERBKY",
    "credentialsSetup": false,
    "hidden": false,
    "sortOrder": 0
  },
  {
    "id": "00ub0oNGTSWTBKOLGLNR",
    "label": "Google Apps Calendar",
    "linkUrl": "https://${yourOktaDomain}/home/google/0oa3omz2i9XRNSRIHBZO/54",
    "logoUrl": "https://${yourOktaDomain}/img/logos/google-calendar.png",
    "appName": "google",
    "appInstanceId": "0oa3omz2i9XRNSRIHBZO",
    "appAssignmentId": "0ua3omz7weMMMQJERBKY",
    "credentialsSetup": false,
    "hidden": false,
    "sortOrder": 1
  },
  {
    "id": "00ub0oNGTSWTBKOLGLNR",
    "label": "Box",
    "linkUrl": "https://${yourOktaDomain}/home/boxnet/0oa3ompioiQCSTOYXVBK/72",
    "logoUrl": "https://${yourOktaDomain}/img/logos/box.png",
    "appName": "boxnet",
    "appInstanceId": "0oa3ompioiQCSTOYXVBK",
    "appAssignmentId": "0ua3omx46lYEZLPPRWBO",
    "credentialsSetup": false,
    "hidden": false,
    "sortOrder": 3
  },
  {
    "id": "00ub0oNGTSWTBKOLGLNR",
    "label": "Salesforce.com",
    "linkUrl": "https://${yourOktaDomain}/home/salesforce/0oa12ecnxtBQMKOXJSMF/46",
    "logoUrl": "https://${yourOktaDomain}/img/logos/salesforce_logo.png",
    "appName": "salesforce",
    "appInstanceId": "0oa12ecnxtBQMKOXJSMF",
    "appAssignmentId": "0ua173qgj5VAVOBQMCVB",
    "credentialsSetup": true,
    "hidden": false,
    "sortOrder": 2
  }
]
```

### Get User's Groups


<ApiOperation method="get" url="/api/v1/users/${userId}/groups" /> <SupportsCors />

Fetches the groups of which the user is a member

##### Request Parameters


| Parameter | Description  | Param Type | DataType | Required |
| --------- | ------------ | ---------- | -------- | -------- |
| id        | `id` of user | URL        | String   | TRUE     |

##### Response Parameters


Array of [Groups](/docs/reference/api/groups/)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/groups"
```

##### Response Example


```json
[
  {
    "id": "0gabcd1234",
    "profile": {
      "name": "Cloud App Users",
      "description": "Users can access cloud apps"
    }
  },
  {
    "id": "0gefgh5678",
    "profile": {
      "name": "Internal App Users",
      "description": "Users can access internal apps"
    }
  }
]
```

## Lifecycle Operations

Lifecycle operations are non-idempotent operations that initiate a state transition for a user's status.
Some operations are asynchronous while others are synchronous. The user's current status limits what operations are allowed.
For example, you can't unlock a user that is `ACTIVE`.

### Activate User


<ApiOperation method="post" url="/api/v1/users/${userId}/lifecycle/activate" />

Activates a user

This operation can only be performed on users with a `STAGED` status.  Activation of a user is an asynchronous operation.

* The user's `transitioningToStatus` property has a value of `ACTIVE` during activation to indicate that the user hasn't completed the asynchronous operation.
* The user's status is `ACTIVE` when the activation process is complete.

Users who don't have a password must complete the welcome flow by visiting the activation link to complete the transition to `ACTIVE` status.

##### Request Parameters


| Parameter | Description                                     | Param Type | DataType | Required | Default |
| --------- | ----------------------------------------------- | ---------- | -------- | -------- | ------- |
| id        | `id` of user                                    | URL        | String   | TRUE     |         |
| sendEmail | Sends an activation email to the user if `true` | Query      | Boolean  | FALSE    | TRUE    |

##### Response Parameters


* Returns empty object by default.
* If `sendEmail` is `false`, returns an activation link for the user to set up their account. The activation token can be used to create a custom activation link.

```json
{
  "activationUrl": "https://${yourOktaDomain}/welcome/XE6wE17zmphl3KqAPFxO",
  "activationToken": "XE6wE17zmphl3KqAPFxO"
}
```

If a password was set before the user was activated, then user must login with with their password or the `activationToken` and not the activation link.  More information about using the `activationToken` to login can be found in the [Authentication API](/docs/reference/api/authn/#primary-authentication-with-activation-token). 

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/activate?sendEmail=false"
```

##### Response Example


```json
{
  "activationUrl": "https://${yourOktaDomain}/welcome/XE6wE17zmphl3KqAPFxO",
  "activationToken": "XE6wE17zmphl3KqAPFxO"
}
```

### Reactivate User


<ApiOperation method="post" url="/api/v1/users/${userId}/lifecycle/reactivate" />

Reactivates a user

This operation can only be performed on users with a `PROVISIONED` status.  This operation restarts the activation workflow if for some reason the user activation was not completed when using the activationToken from [Activate User](#activate-user).

Users that don't have a password must complete the flow by completing [Reset Password](#reset-password) and MFA enrollment steps to transition the user to `ACTIVE` status.

##### Request Parameters


| Parameter | Description                                                                | Param Type | DataType | Required |
| --------- | -------------------------------------------------------------------------- | ---------- | -------- | -------- |
| id        | `id` of user                                                               | URL        | String   | TRUE     |
| sendEmail | Sends an activation email to the user if `true`. Default value is `false`. | Query      | Boolean  | FALSE    |

##### Response Parameters


* Returns empty object by default.
* If `sendEmail` is `false`, returns an activation link for the user to set up their account. The activation token can be used to create a custom activation link.

```json
{
  "activationUrl": "https://${yourOktaDomain}/welcome/XE6wE17zmphl3KqAPFxO",
  "activationToken": "XE6wE17zmphl3KqAPFxO"
}
```

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reactivate?sendEmail=false"
```

##### Response Example (Success)


```json
{
  "activationUrl": "https://${yourOktaDomain}/welcome/XE6wE17zmphl3KqAPFxO",
  "activationToken": "XE6wE17zmphl3KqAPFxO"
}
```

##### Response Example (Unexpected user status)


```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "errorCode": "E0000038",
  "errorSummary": "This operation is not allowed in the user's current status.",
  "errorLink": "E0000038",
  "errorId": "oaefEpMS5yqTMGYEfxp0S_knw",
  "errorCauses": []
}
```

### Deactivate User


<ApiOperation method="post" url="/api/v1/users/${userId}/lifecycle/deactivate" />

Deactivates a user

This operation can only be performed on users that do not have a `DEPROVISIONED` status.  Deactivation of a user is an asynchronous operation.

* The user's `transitioningToStatus` property is `DEPROVISIONED` during deactivation to indicate that the user hasn't completed the asynchronous operation.
* The user's status is `DEPROVISIONED` when the deactivation process is complete.

> Important: Deactivating a user is a **destructive** operation.  The user is deprovisioned from all assigned applications which may destroy their data such as email or files.  **This action cannot be recovered!**

##### Request Parameters


| Parameter | Description                                                                           | Param Type | DataType | Required |
| --------- | ------------------------------------------------------------------------------------- | ---------- | -------- | -------- |
| userId    | ID of user                                                                            | URL        | String   | TRUE     |
| sendEmail | Sends a deactivation email to the administrator if `true`.  Default value is `false`. | Query      | Boolean  | FALSE    |

##### Response Parameters


Returns an empty object.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/deactivate?sendEmail=true"
```

##### Response Example


```http
HTTP/1.1 200 OK
Content-Type: application/json
```

### Suspend User


<ApiOperation method="post" url="/api/v1/users/${userId}/lifecycle/suspend" />

Suspends a user

This operation can only be performed on users with an `ACTIVE` status.  The user has a status of `SUSPENDED` when the process is complete.

Suspended users:

* Can't log in to Okta. Their group and app assignments are retained.
* Can only be unsuspended or deactivated.

##### Request Parameters


| Parameter | Description  | Param Type | DataType | Required |
| --------- | ------------ | ---------- | -------- | -------- |
| id        | `id` of user | URL        | String   | TRUE     |

##### Response Parameters


Returns an empty object

* Passing an invalid `id` returns a `404 Not Found` status code with error code `E0000007`.
* Passing an `id` that is not in the `ACTIVE` state returns a `400 Bad Request` status code with error code `E0000001`.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/suspend"
```

##### Response Example


```http
HTTP/1.1 200 OK
Content-Type: application/json
```

### Unsuspend User


<ApiOperation method="post" url="/api/v1/users/${userId}/lifecycle/unsuspend" />

Unsuspends a user and returns them to the `ACTIVE` state

This operation can only be performed on users that have a `SUSPENDED` status.


##### Request Parameters


| Parameter | Description  | Param Type | DataType | Required |
| --------- | ------------ | ---------- | -------- | -------- |
| id        | `id` of user | URL        | String   | TRUE     |

##### Response Parameters


Returns an empty object.

Passing an invalid `id` returns a `404 Not Found` status code with error code `E0000007`.
Passing an `id` that is not in the `SUSPENDED` state returns a `400 Bad Request` status code with error code `E0000001`.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/unsuspend"
```

##### Response Example


```http
HTTP/1.1 200 OK
Content-Type: application/json
```

### Delete User


<ApiOperation method="delete" url="/api/v1/users/${userId}" />

Deletes a user permanently.  This operation can only be performed on users that have a `DEPROVISIONED` status.  **This action cannot be recovered!**

This operation on a user that hasn't been deactivated causes that user to be deactivated.  A second delete operation
is required to delete the user.

##### Request Parameters


| Parameter | Description                                                                           | Param Type | DataType | Required | Default |
| --------- | ------------------------------------------------------------------------------------- | ---------- | -------- | -------- | ------- |
| id        | `id` of user                                                                          | URL        | String   | TRUE     |         |
| sendEmail | Sends a deactivation email to the administrator if `true`.  Default value is `false`. | Query      | Boolean  | FALSE    | FALSE   |

##### Response Parameters


`204 No Content`

Passing an invalid `id` returns a `404 Not Found` status code with error code `E0000007`.

##### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR?sendEmail=true"
```

##### Response Example


```http
`204 No Content`
```

### Unlock User


<ApiOperation method="post" url="/api/v1/users/${userId}/lifecycle/unlock" />

Unlocks a user with a `LOCKED_OUT` status and returns them to `ACTIVE` status.  Users will be able to login with their current password.

> **Note:** This operation works with Okta-mastered users. It doesn't support directory-mastered accounts such as Active Directory.

##### Request Parameters


| Parameter | Description  | Param Type | DataType | Required | Default |
| --------- | ------------ | ---------- | -------- | -------- | ------- |
| id        | `id` of user | URL        | String   | TRUE     |         |

##### Response Parameters


Returns an empty object

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/unlock"
```

##### Response Example


```http
HTTP/1.1 200 OK
Content-Type: application/json
```

### Reset Password


<ApiOperation method="post" url="/api/v1/users/${userId}/lifecycle/reset_password" />

Generates a one-time token (OTT) that can be used to reset a user's password.  The OTT link can be automatically emailed to the user or returned to the API caller and distributed using a custom flow.

This operation will transition the user to the status of `RECOVERY` and the user will not be able to login or initiate a forgot password flow until they complete the reset flow.

>**Note:** You can also use this API to convert a user with the Okta Credential Provider to a use a Federated Provider. After this conversion, the user cannot directly sign in with password. The second example demonstrates this usage.

##### Request Parameters


| Parameter | Description                                      | Param Type | DataType | Required | Default |
| --------- | ------------------------------------------------ | ---------- | -------- | -------- | ------- |
| id        | `id` of user                                     | URL        | String   | TRUE     |         |
| sendEmail | Sends reset password email to the user if `true` | Query      | Boolean  | FALSE    | TRUE    |

To ensure a successful password recovery lookup if an email address is associated with multiple users:

* Okta no longer includes deactivated users in the lookup.
* The lookup searches login IDs first, then primary email addresses, and then secondary email addresses.

##### Response Parameters


* Returns an empty object by default.
* If`sendEmail` is `false`, returns a link for the user to reset their password.

```json
{
  "resetPasswordUrl": "https://${yourOktaDomain}/reset_password/XE6wE17zmphl3KqAPFxO"
}
```

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_password?sendEmail=false"
```

##### Response Example


```json
{
  "resetPasswordUrl": "https://${yourOktaDomain}/reset_password/XE6wE17zmphl3KqAPFxO"
}
```

##### Request Example (Convert a User to a Federated User)


To convert a user to a federated user, pass `FEDERATION` as the `provider` in the [Provider object](#provider-object). The `sendEmail`
parameter must be false or omitted for this type of conversion.

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_password?provider=FEDERATION&sendEmail=false"
```

##### Response Example


```json
{}
```

### Expire Password


<ApiOperation method="post" url="/api/v1/users/${userId}/lifecycle/expire_password" />

This operation transitions the user status to `PASSWORD_EXPIRED` so that the user is required to change their password at their next login.
If `tempPassword` is included in the request, the user's password is reset to a temporary password that is returned, and then the temporary password is expired.

If you have integrated Okta with your on-premise Active Directory (AD), then setting a user's password as expired in Okta also expires the password in Active Directory.
When the user tries to log in to Okta, delegated authentication finds the password-expired status in the Active Directory,
and the user is presented with the password-expired page where he or she can change the password.

##### Request Parameters


| Parameter    | Description                                                        | Param Type | DataType | Required | Default |
| ------------ | ------------------------------------------------------------------ | ---------- | -------- | -------- | ------- |
| id           | `id` of user                                                       | URL        | String   | TRUE     |         |
| tempPassword | Sets the user's password to a temporary password,  if `true`       | Query      | Boolean  | FALSE    | FALSE   |

##### Response Parameters


* Returns the complete user object by default
* If `tempPassword` is `true`, returns the temporary password

```json
{
    "tempPassword": "HR076gb6"
}
```

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/expire_password?tempPassword=false"
```

##### Response Example


```json
{
  "id": "00ub0oNGTSWTBKOLGLNR",
  "status": "ACTIVE",
  "created": "2013-06-24T16:39:18.000Z",
  "activated": "2013-06-24T16:39:19.000Z",
  "statusChanged": "2013-06-24T16:39:19.000Z",
  "lastLogin": "2013-06-24T17:39:19.000Z",
  "lastUpdated": "2013-06-27T16:35:28.000Z",
  "passwordChanged": "2013-06-24T16:39:19.000Z",
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "password": {},
    "recovery_question": {
      "question": "Who's a major player in the cowboy scene?"
    },
    "provider": {
      "type": "OKTA",
      "name": "OKTA"
    }
  },
  "_links": {
    "resetPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_password"
    },
    "resetFactors": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_factors"
    },
    "expirePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/expire_password"
    },
    "forgotPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/forgot_password"
    },
    "changeRecoveryQuestion": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/change_recovery_question"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/deactivate"
    },
    "changePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/change_password"
    }
  }
}
```

### Reset Factors


<ApiOperation method="post" url="/api/v1/users/${userId}/lifecycle/reset_factors" />

This operation resets all factors for the specified user. All MFA factor enrollments returned to the unenrolled state. The user's status remains ACTIVE. This link is present only if the user is currently enrolled in one or more MFA factors.

##### Request Parameters


| Parameter    | Description                                                  | Param Type | DataType | Required | Default |
| ------------ | ------------------------------------------------------------ | ---------- | -------- | -------- | ------- |
| id           | `id` of user                                                 | URL        | String   | TRUE     |         |

##### Response Parameters


Returns an empty object by default.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_factors"
```

##### Response Example


```http
HTTP/1.1 200 OK
Content-Type: application/json
```

### Clear Current User Sessions

Clears Okta sessions for the currently logged in user. By default, the current session remains active. Use this method in a browser-based application. 

> This operation requires a session cookie for the user. API token is not allowed for this operation.

<ApiOperation method="post" url="/api/v1/users/me/lifecycle/delete_sessions" /> <SupportsCors />


##### Request Parameters


| Parameter    | Description                                                  | Param Type | DataType | Required | Default |
| ------------ | ------------------------------------------------------------ | ---------- | -------- | -------- | ------- |
| keepCurrent  | Skip deleting user's current session when set to true	      | Body       | boolean  | FALSE    |  true   |


##### Response

Returns an empty object.


##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Cookie: ${okta_session_cookie}" \
-H "Origin: ${trusted_cors_origin}" \
-d '{
  "keepCurrent": true
}' "https://${yourOktaDomain}/api/v1/users/me/lifecycle/delete_sessions"
```

##### Response Example

If the sessions were successfully cleared, a `200 OK` response will be returned.

If the current session is invalid, a `403 Forbidden` response will be returned.

```http
HTTP/1.1 200 OK
Content-Type: application/json

{}
```


## User Sessions

### Clear User Sessions


<ApiOperation method="delete" url="/api/v1/users/${userId}/sessions" />

Removes all active identity provider sessions. This forces the user to authenticate on the next operation. Optionally revokes OpenID Connect and OAuth refresh and access tokens issued to the user.

>**Note:** This operation doesn't clear the sessions created for web sign in or native applications.

#### Request Parameters


| Parameter    | Description                                                      | Param Type | DataType | Required | Default |
| ------------ | ---------------------------------------------------------------- | ---------- | -------- | -------- | ------- |
| userId       | `id` of a user                                                   | URL        | String   | TRUE     |         |
| oauthTokens  | Revoke issued OpenID Connect and OAuth refresh and access tokens | Query      | Boolean  | FALSE    | FALSE   |

#### Response Parameters


`204 No Content`

#### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ucmukel4KHsPARU0h7/sessions"
```

#### Response Example


```http
`204 No Content`
```

## Credential Operations

### Forgot Password


<ApiOperation method="post" url="/api/v1/users/${userId}/credentials/forgot_password" />

Generates a one-time token (OTT) that can be used to reset a user's password

The user will be required to validate their security question's answer when visiting the reset link.  This operation can only be performed on users with an `ACTIVE` status and a valid [recovery question credential](#recovery-question-object).

##### Request Parameters


| Parameter    | Description                                         | Param Type | DataType | Required | Default |
| ------------ | --------------------------------------------------- | ---------- | -------- | -------- | ------- |
| id           | `id` of user                                        | URL        | String   | TRUE     |         |
| sendEmail    | Sends a forgot password email to the user if `true` | Query      | Boolean  | FALSE    | TRUE    |

To ensure a successful password recovery lookup if an email address is associated with multiple users:

* Okta no longer includes deactivated users in the lookup.
* The lookup searches login IDs first, then primary email addresses, and then secondary email addresses.

##### Response Parameters


* Returns an empty object by default
* If `sendEmail` is `false`, returns a link for the user to reset their password.

```json
{
  "resetPasswordUrl": "https://${yourOktaDomain}/signin/reset-password/XE6wE17zmphl3KqAPFxO"
}
```

This operation does not affect the status of the user.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/forgot_password?sendEmail=false"
```

##### Response Example


```json
{
  "resetPasswordUrl": "https://${yourOktaDomain}/signin/reset-password/XE6wE17zmphl3KqAPFxO"
}
```

<ApiOperation method="post" url="/api/v1/users/${userId}/credentials/forgot_password" />

Sets a new password for a user by validating the user's answer to their current recovery question

This operation can only be performed on users with an `ACTIVE` status and a valid [recovery question credential](#recovery-question-object).

> Important: This operation is intended for applications that need to implement their own forgot password flow.  You are responsible for mitigation of all security risks such as phishing and replay attacks.  The best practice is to generate a short-lived, one-time token (OTT) that is sent to a verified email account.

##### Request Parameters


| Parameter         | Description                                      | Param Type | DataType                                              | Required |
| ----------------- | ------------------------------------------------ | ---------- | ----------------------------------------------------- | -------- |
| id                | `id` of user                                     | URL        | String                                                | TRUE     |
| password          | New password for user                            | Body       | [Password object](#password-object)                   | TRUE     |
| recovery_question | Answer to user's current recovery question       | Body       | [Recovery Question object](#recovery-question-object) | TRUE     |

##### Response Parameters


[Credentials](#credentials-object) of the user

This operation does not affect the status of the user.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "password": { "value": "uTVM,TPw55" },
  "recovery_question": { "answer": "Annie Oakley" }
}' "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/forgot_password"
```

##### Response Example


```json
{
  "password": {},
  "recovery_question": {
    "question": "Who's a major player in the cowboy scene?"
  },
  "provider": {
    "type": "OKTA",
    "name": "OKTA"
  }
}
```

### Change Password


<ApiOperation method="post" url="/api/v1/users/${userId}/credentials/change_password" />

Changes a user's password by validating the user's current password

This operation can only be performed on users in `STAGED`, `ACTIVE`, `PASSWORD_EXPIRED`, or `RECOVERY` status that have a valid [password credential](#password-object)

##### Request Parameters


| Parameter    | Description                                             | Param Type | DataType                             | Required |
| ------------ | ------------------------------------------------------- | ---------- | ------------------------------------ | -------- |
| id           | `id` of user                                            | URL        | String                               | TRUE     |
| strict       | If true, validates against password minimum age policy  | Query      | String                               | FALSE    |
| oldPassword  | Current password for user                               | Body       | [Password object](#password-object)  | TRUE     |
| newPassword  | New password for user                                   | Body       | [Password object](#password-object)  | TRUE     |

##### Response Parameters


[Credentials](#credentials-object) of the user

The user transitions to `ACTIVE` status when successfully invoked in `RECOVERY` status.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "oldPassword": { "value": "tlpWENT2m" },
  "newPassword": { "value": "uTVM,TPw55" }
}' "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/change_password"
```

##### Response Example


```json
{
  "password": {},
  "recovery_question": {
    "question": "Who's a major player in the cowboy scene?"
  },
  "provider": {
    "type": "OKTA",
    "name": "OKTA"
  }
}
```

### Change Recovery Question


<ApiOperation method="post" url="/api/v1/users/${userId}/credentials/change_recovery_question" />

Changes a user's recovery question & answer credential by validating the user's current password

This operation can only be performed on users in **STAGED**, **ACTIVE** or **RECOVERY** `status` that have a valid [password credential](#password-object)

##### Request Parameters


| Parameter         | Description                             | Param Type | DataType                                              | Required |
| ----------------- | --------------------------------------- | ---------- | ----------------------------------------------------- | -------- |
| id                | `id` of user                            | URL        | String                                                | TRUE     |
| password          | Current password for user               | Body       | [Password object](#password-object)                   | TRUE     |
| recovery_question | New recovery question & answer for user | Body       | [Recovery Question object](#recovery-question-object) | TRUE     |

##### Response Parameters


[Credentials](#credentials-object) of the user

> This operation does not affect the status of the user.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "password": { "value": "tlpWENT2m" },
  "recovery_question": {
    "question": "How many roads must a man walk down?",
    "answer": "forty two"
  }
}' "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/change_recovery_question"
```

##### Response Example


```json
{
  "password": {},
  "recovery_question": {
    "question": "How many roads must a man walk down?"
  },
  "provider": {
    "type": "OKTA",
    "name": "OKTA"
  }
}
```

## User-Consent Grant Operations

<ApiLifecycle access="ea" />

A consent represents a user's explicit permission to allow an application to access resources protected by scopes. Consent grants are different from tokens because a consent can outlast a token, and there can be multiple tokens with varying sets of scopes derived from a single consent. When an application comes back and needs to get a new access token, it may not need to prompt the user for consent if they have already consented to the specified scopes.
Consent grants remain valid until the user manually revokes them, or until the user, application, authorization server or scope is deactivated or deleted.

> Hint: For all grant operations, you can use `me` instead of the `userId` in an endpoint that contains `/users`, in an active session with no SSWS token (API token). For example: `https://${yourOktaDomain}/api/v1/users/me/grants` returns all the grants for the active session user.

>**Note:** Some browsers have begun blocking third-party cookies by default, disrupting Okta functionality in certain flows. For information see [FAQ: How Blocking Third Party Cookies Can Potentially Impact Your Okta Environment](https://support.okta.com/help/s/article/FAQ-How-Blocking-Third-Party-Cookies-Can-Potentially-Impact-Your-Okta-Environment).

### List Grants


<ApiLifecycle access="ea" />

<ApiOperation method="get" url="/api/v1/users/${userId}/grants" />

Lists all grants for the specified user

#### Request Parameters


| Parameter   | Description                                                                                    | Param Type   | DataType   | Required   | Default |
| :---------- | :--------------------------------------------------------------------------------------------- | :----------- | :--------- | :--------- | :------ |
| userId      | ID of the user for whom you are fetching grants                                                | URL          | String     | TRUE       |         |
| expand      | Valid value: `scope`. If specified, scope details are included in the `_embedded` attribute.   | Query        | String     | FALSE      |         |
| scopeId     | The scope ID to filter on                                                                      | Query        | String     | FALSE      |         |
| limit       | The number of grants to return (maximum 200)                                                   | Query        | Number     | FALSE      | 20      |
| after       | Specifies the pagination cursor for the next page of grants                                    | Query        | String     | FALSE      |         |

> **Note:** `after` should be treated as a cursor (an opaque value) and obtained through [the next link relation](/docs/reference/api-overview/#pagination).


#### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u5t60iloOHN9pBi0h7/grants"
```

#### Response Example


```json
[
    {
        "id": "oag3ih1zrm1cBFOiq0h6",
        "status": "ACTIVE",
        "created": "2017-10-30T22:06:53.000Z",
        "lastUpdated": "2017-10-30T22:06:53.000Z",
        "issuer": "https://${yourOktaDomain}/oauth2/ausain6z9zIedDCxB0h7",
        "clientId": "0oabskvc6442nkvQO0h7",
        "userId": "00u5t60iloOHN9pBi0h7",
        "scopeId": "scpCmCCV1DpxVkCaye2X",
        "_links": {
            "app": {
                "href": "https://${yourOktaDomain}/api/v1/apps/0oabskvc6442nkvQO0h7",
                "title": "My App"
            },
            "scope": {
                "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/scopes/scpCmCCV1DpxVkCaye2X",
                "title": "My phone"
            },
            "client": {
                "href": "https://${yourOktaDomain}/oauth2/v1/clients/0oabskvc6442nkvQO0h7",
                "title": "My App"
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/users/00u5t60iloOHN9pBi0h7/grants/oag3ih1zrm1cBFOiq0h6",
                "hints": {
                    "allow": [
                        "GET",
                        "DELETE"
                    ]
                }
            },
            "user": {
                "href": "https://${yourOktaDomain}/api/v1/users/00u5t60iloOHN9pBi0h7",
                "title": "SAML Jackson"
            },
            "authorizationServer": {
                "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7",
                "title": "Example Authorization Server"
            }
        }
    }
]
```

### Get a Grant


<ApiLifecycle access="ea" />

<ApiOperation method="get" url="/api/v1/users/${userId}/grants/${grantId}" />

Gets a grant for the specified user

#### Request Parameters


| Parameter   | Description                                                                                    | Param Type   | DataType   | Required |
| :---------- | :--------------------------------------------------------------------------------------------- | :----------- | :--------- | :------- |
| userId      | ID of the user to whom the grant belongs                                                       | URL          | String     | TRUE     |
| grantId     | ID of the grant being fetched                                                                  | Query        | String     | TRUE     |
| expand      | Valid value: `scope`. If specified, scope details are included in the `_embedded` attribute.   | Query        | String     | FALSE    |

#### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u5t60iloOHN9pBi0h7/grants/oag3ih1zrm1cBFOiq0h6"
```

#### Response Example


```json
{
    "id": "oag3ih1zrm1cBFOiq0h6",
    "status": "ACTIVE",
    "created": "2017-10-30T22:06:53.000Z",
    "lastUpdated": "2017-10-30T22:06:53.000Z",
    "issuer": "https://${yourOktaDomain}/oauth2/ausain6z9zIedDCxB0h7",
    "clientId": "0oabskvc6442nkvQO0h7",
    "userId": "00u5t60iloOHN9pBi0h7",
    "scopeId": "scpCmCCV1DpxVkCaye2X",
    "_links": {
        "app": {
            "href": "https://${yourOktaDomain}/api/v1/apps/0oabskvc6442nkvQO0h7",
            "title": "My App"
        },
        "scope": {
            "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/scopes/scpCmCCV1DpxVkCaye2X",
            "title": "My phone"
        },
        "client": {
            "href": "https://${yourOktaDomain}/oauth2/v1/clients/0oabskvc6442nkvQO0h7",
            "title": "My App"
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/users/00u5t60iloOHN9pBi0h7/grants/oag3ih1zrm1cBFOiq0h6",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE"
                ]
            }
        },
        "user": {
            "href": "https://${yourOktaDomain}/api/v1/users/00u5t60iloOHN9pBi0h7",
            "title": "SAML Jackson"
        },
        "authorizationServer": {
            "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7",
            "title": "Example Authorization Server"
        }
    }
}
```

### List Grants for a User-Client Combination


<ApiLifecycle access="ea" />

<ApiOperation method="get" url="/api/v1/users/${userId}/clients/${clientId}/grants" />

Lists all grants for a specified user and client

#### Request Parameters


| Parameter   | Description                                                                                    | Parameter Type   | DataType   | Required   | Default |
| :---------- | :--------------------------------------------------------------------------------------------- | :--------------- | :--------- | :--------- | :------ |
| userId      | ID of the user whose grants you are listing for the specified `clientId`                       | URL              | String     | TRUE       |         |
| clientId    | ID of the client whose grants you are listing for the specified `userId`                       | URL              | String     | TRUE       |         |
| expand      | Valid value: `scope`. If specified, scope details are included in the `_embedded` attribute.   | Query            | String     | FALSE      |         |
| limit       | The number of tokens to return (maximum 200)                                                   | Query            | Number     | FALSE      | 20      |
| after       | Specifies the pagination cursor for the next page of tokens                                    | Query            | String     | FALSE      |         |

#### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ucmukel4KHsPARU0h7/clients/0oabskvc6442nkvQO0h7/grants"
```

#### Response Example


```json
[
    {
        "id": "oag3j3j33ILN7OFqP0h6",
        "status": "ACTIVE",
        "created": "2017-11-03T03:34:17.000Z",
        "lastUpdated": "2017-11-03T03:34:17.000Z",
        "issuer": "https://${yourOktaDomain}/oauth2/ausain6z9zIedDCxB0h7",
        "clientId": "0oabskvc6442nkvQO0h7",
        "userId": "00u5t60iloOHN9pBi0h7",
        "scopeId": "scpCmCCV1DpxVkCaye2X",
        "_links": {
            "app": {
                "href": "https://${yourOktaDomain}/api/v1/apps/0oabskvc6442nkvQO0h7",
                "title": "Test App for Groups Claim"
            },
            "scope": {
                "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/scopes/scpCmCCV1DpxVkCaye2X",
                "title": "Your phone"
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/users/00u5t60iloOHN9pBi0h7/grants/oag3j3j33ILN7OFqP0h6",
                "hints": {
                    "allow": [
                        "GET",
                        "DELETE"
                    ]
                }
            },
            "client": {
                "href": "https://${yourOktaDomain}/oauth2/v1/clients/0oabskvc6442nkvQO0h7",
                "title": "Test App for Groups Claim"
            },
            "user": {
                "href": "https://${yourOktaDomain}/api/v1/users/00u5t60iloOHN9pBi0h7",
                "title": "Saml Jackson"
            },
            "authorizationServer": {
                "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7",
                "title": "Example Authorization Server"
            }
        }
    }
]
```

### Revoke All Grants for a User


<ApiLifecycle access="ea" />

<ApiOperation method="delete" url="/api/v1/users/${userId}/grants" />

Revokes all grants for a specified user

#### Request Paramters


| Parameter   | Description                                   | Parameter Type   | DataType   | Required |
| :---------- | :-------------------------------------------- | :--------------- | :--------- | :------- |
| userId      | ID of the user whose grant is being revoked   | URL              | String     | TRUE     |

#### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ucmukel4KHsPARU0h7/grants"
```

#### Response Example


```bash
HTTP/1.1 204 No Content
```

### Revoke a Grant for a User


<ApiLifecycle access="ea" />

<ApiOperation method="delete" url="/api/v1/users/${userId}/grants/${grantId}" />

Revokes one grant for a specified user

#### Request Paramters


| Parameter   | Description                                   | Parameter Type   | DataType   | Required |
| :---------- | :-------------------------------------------- | :--------------- | :--------- | :------- |
| userId      | ID of the user whose grant is being revoked   | URL              | String     | TRUE     |
| grantId     | ID of the grant being revoked                 | URL              | String     | TRUE     |

#### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ucmukel4KHsPARU0h7/grants/oag3ih1zrm1cBFOiq0h6"
```

#### Response Example


```bash
HTTP/1.1 204 No Content
```

### Revoke Grants for User and Client


<ApiLifecycle access="ea" />

<ApiOperation method="delete" url="/api/v1/users/${userId}/clients/${clientId}/grants" />

Revokes all grants for the specified user and client

#### Request Parameters


| Parameter   | Description                                                              | Parameter Type   | DataType   | Required |
| :---------- | :----------------------------------------------------------------------- | :--------------- | :--------- | :------- |
| userId      | ID of the user whose grants are being revoked for the specified client   | URL              | String     | TRUE     |
| clientId    | ID of the client who was granted consent by the specified user           | URL              | String     | TRUE     |

#### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ucmukel4KHsPARU0h7/clients/0oabskvc6442nkvQO0h7/grants"
```

#### Response Example


```bash
HTTP/1.1 204 No Content
```

## User OAuth 2.0 Token Management Operations

* [List Refresh Tokens](#list-refresh-tokens)
* [Get Refresh Token](#get-refresh-token)
* [Revoke All Refresh Tokens](#revoke-all-refresh-tokens)
* [Revoke Refresh Token](#revoke-refresh-token)

These endpoints allow you to manage tokens issued by an Authorization Server for a particular User and Client. For example, you could revoke every active refresh token for a User in the context of a specific Client. You can also [revoke specific tokens](/docs/guides/revoke-tokens/) or [manage tokens at the Authorization Server level](/docs/reference/api/authorization-servers/#oauth-20-token-management-operations).

Read [Validate Access Tokens](/docs/guides/validate-access-tokens/) to understand more about how OAuth 2.0 tokens work.

<ApiLifecycle access="ea" />

### List Refresh Tokens


<ApiLifecycle access="ea" />

<ApiOperation method="get" url="/api/v1/users/${userId}/clients/${clientId}/tokens" />

Lists all refresh tokens issued for the specified User and Client.

#### Request Parameters


| Parameter   | Description                                                                                    | Param Type   | DataType   | Required   | Default |
| :---------- | :--------------------------------------------------------------------------------------------- | :----------- | :--------- | :--------- | :------ |
| userId      | ID of the user for whom you are fetching tokens                                                | URL          | String     | TRUE       |         |
| clientId    | ID of the client                                                                               | URL          | String     | TRUE       |         |
| expand      | Valid value: `scope`. If specified, scope details are included in the `_embedded` attribute.   | Query        | String     | FALSE      |         |
| limit       | The number of tokens to return (maximum 200)                                                   | Query        | Number     | FALSE      | 20      |
| after       | Specifies the pagination cursor for the next page of tokens                                    | Query        | String     | FALSE      |         |

> **Note:** `after` should be treated as a cursor (an opaque value) and obtained through [the next link relation](/docs/reference/api-overview/#pagination).


#### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u5t60iloOHN9pBi0h7/clients/0oabskvc6442nkvQO0h7/tokens"
```

#### Response Example


```json
[
  {
    "id": "oar579Mcp7OUsNTlo0g3",
    "status": "ACTIVE",
    "created": "2018-03-09T03:18:06.000Z",
    "lastUpdated": "2018-03-09T03:18:06.000Z",
    "expiresAt": "2018-03-16T03:18:06.000Z",
    "issuer": "https://${yourOktaDomain}/oauth2/ausain6z9zIedDCxB0h7",
    "clientId": "0oabskvc6442nkvQO0h7",
    "userId": "00u5t60iloOHN9pBi0h7",
    "scopes": [
      "offline_access",
      "car:drive"
    ],
    "_links": {
      "app": {
        "href": "https://${yourOktaDomain}/api/v1/apps/0oabskvc6442nkvQO0h7",
        "title": "Native"
      },
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/users/00u5t60iloOHN9pBi0h7/clients/0oabskvc6442nkvQO0h7/tokens/oar579Mcp7OUsNTlo0g3"
      },
      "revoke": {
        "href": "https://${yourOktaDomain}/api/v1/users/00u5t60iloOHN9pBi0h7/clients/0oabskvc6442nkvQO0h7/tokens/oar579Mcp7OUsNTlo0g3",
        "hints": {
          "allow": [
            "DELETE"
          ]
        }
      },
      "client": {
        "href": "https://${yourOktaDomain}/oauth2/v1/clients/0oabskvc6442nkvQO0h7",
        "title": "Example Client App"
      },
      "user": {
        "href": "https://${yourOktaDomain}/api/v1/users/00upcgi9dyWEOeCwM0g3",
        "title": "Saml Jackson"
      },
      "authorizationServer": {
        "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7",
        "title": "Example Authorization Server"
      }
    }
  }
]
```

### Get Refresh Token


<ApiLifecycle access="ea" />

<ApiOperation method="get" url="/api/v1/users/${userId}/clients/${clientId}/tokens/${tokenId}" />

Gets a refresh token issued for the specified User and Client.

#### Request Parameters


| Parameter   | Description                                                                                    | Param Type   | DataType   | Required   | Default |
| :---------- | :--------------------------------------------------------------------------------------------- | :----------- | :--------- | :--------- | :------ |
| userId      | ID of the user for whom you are fetching tokens                                                | URL          | String     | TRUE       |         |
| clientId    | ID of the client                                                                               | URL          | String     | TRUE       |         |
| tokenId     | ID of the token                                                                                | URL          | String     | TRUE       |         |
| expand      | Valid value: `scope`. If specified, scope details are included in the `_embedded` attribute.   | Query        | String     | FALSE      |         |
| limit       | The number of grants to return (maximum 200)                                                   | Query        | Number     | FALSE      | 20      |
| after       | Specifies the pagination cursor for the next page of grants                                    | Query        | String     | FALSE      |         |

> **Note:** `after` should be treated as a cursor (an opaque value) and obtained through [the next link relation](/docs/reference/api-overview/#pagination).


#### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u5t60iloOHN9pBi0h7/clients/0oabskvc6442nkvQO0h7/tokens/oar579Mcp7OUsNTlo0g3?expand=scope"
```

#### Response Example


```json
{
  "id": "oar579Mcp7OUsNTlo0g3",
  "status": "ACTIVE",
  "created": "2018-03-09T03:18:06.000Z",
  "lastUpdated": "2018-03-09T03:18:06.000Z",
  "expiresAt": "2018-03-16T03:18:06.000Z",
  "issuer": "https://${yourOktaDomain}/oauth2/ausain6z9zIedDCxB0h7",
  "clientId": "0oabskvc6442nkvQO0h7",
  "userId": "00u5t60iloOHN9pBi0h7",
  "scopes": [
    "offline_access",
    "car:drive"
  ],
  "_embedded": {
    "scopes": [
      {
        "id": "scppb56cIl4GvGxy70g3",
        "name": "offline_access",
        "description": "Requests a refresh token by default, used to obtain more access tokens without re-prompting the user for authentication.",
        "_links": {
          "scope": {
            "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/scopes/scppb56cIl4GvGxy70g3",
            "title": "offline_access"
          }
        }
      },
      {
        "id": "scp142iq2J8IGRUCS0g4",
        "name": "car:drive",
        "displayName": "Drive car",
        "description": "Allows the user to drive a car.",
        "_links": {
          "scope": {
            "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/scopes/scp142iq2J8IGRUCS0g4",
            "title": "Drive car"
          }
        }
      }
    ]
  },
  "_links": {
    "app": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabskvc6442nkvQO0h7",
      "title": "Native"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u5t60iloOHN9pBi0h7/clients/0oabskvc6442nkvQO0h7/tokens/oar579Mcp7OUsNTlo0g3"
    },
    "revoke": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u5t60iloOHN9pBi0h7/clients/0oabskvc6442nkvQO0h7/tokens/oar579Mcp7OUsNTlo0g3",
      "hints": {
        "allow": [
          "DELETE"
        ]
      }
    },
    "client": {
      "href": "https://${yourOktaDomain}/oauth2/v1/clients/0oabskvc6442nkvQO0h7",
      "title": "Example Client App"
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00upcgi9dyWEOeCwM0g3",
      "title": "Saml Jackson"
    },
    "authorizationServer": {
      "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7",
      "title": "Example Authorization Server"
    }
  }
}
```

### Revoke All Refresh Tokens


<ApiLifecycle access="ea" />

<ApiOperation method="delete" url="/api/v1/users/${userId}/clients/${clientId}/tokens" />

Revokes all refresh tokens issued for the specified User and Client. Any access tokens issued with these refresh tokens will also be revoked, but access tokens issued without a refresh token will not be affected.

#### Request Parameters


| Parameter   | Description                                                              | Parameter Type   | DataType   | Required |
| :---------- | :----------------------------------------------------------------------- | :--------------- | :--------- | :------- |
| userId      | ID of the user whose grants are being revoked for the specified client   | URL              | String     | TRUE     |
| clientId    | ID of the client who was granted consent by the specified user           | URL              | String     | TRUE     |

#### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ucmukel4KHsPARU0h7/clients/0oabskvc6442nkvQO0h7/tokens"
```

#### Response Example


```bash
HTTP/1.1 204 No Content
```

### Revoke Refresh Token


<ApiLifecycle access="ea" />

<ApiOperation method="delete" url="/api/v1/users/${userId}/clients/${clientId}/tokens/${tokenId}" />

Revokes the specified refresh token. If an access token was issued with this refresh token, it will also be revoked.

#### Request Parameters


| Parameter   | Description                                                              | Parameter Type   | DataType   | Required |
| :---------- | :----------------------------------------------------------------------- | :--------------- | :--------- | :------- |
| userId      | ID of the user whose grants are being revoked for the specified client   | URL              | String     | TRUE     |
| clientId    | ID of the client who was granted consent by the specified user           | URL              | String     | TRUE     |
| tokenId     | ID of the token                                                          | URL              | String     | TRUE     |

#### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ucmukel4KHsPARU0h7/clients/0oabskvc6442nkvQO0h7/tokens/oar579Mcp7OUsNTlo0g3"
```

#### Response Example


```bash
HTTP/1.1 204 No Content
```

## User Client Resource Operations

<ApiLifecycle access="ea" />

### List Client Resources for a User


<ApiLifecycle access="ea" />

<ApiOperation method="get" url="/api/v1/users/${userId}/clients" />

Lists all client resources for which the specified user has grants or tokens.

#### Request Parameters


| Parameter   | Description                                       | Parameter Type   | DataType   | Required |
| :---------- | :------------------------------------------------ | :--------------- | :--------- | :------- |
| userId      | ID of the user                                    | URL              | String     | TRUE     |

#### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ucmukel4KHsPARU0h7/clients"
```

#### Response Example


```json
[
    {
        "client_id": "0oabskvc6442nkvQO0h7",
        "client_name": "My App",
        "client_uri": null,
        "logo_uri": null,
        "_links": {
            "grants": {
                "href": "https://${yourOktaDomain}/api/v1/users/00u5t60iloOHN9pBi0h7/clients/0oabskvc6442nkvQO0h7/grants"
            },
            "tokens": {
                "href": "https://${yourOktaDomain}/api/v1/users/00u5t60iloOHN9pBi0h7/clients/0oabskvc6442nkvQO0h7/tokens"
            }
        }
    }
]
```


## User object

### Example

```json
{
  "id": "00ub0oNGTSWTBKOLGLNR",
  "status": "ACTIVE",
  "created": "2013-06-24T16:39:18.000Z",
  "activated": "2013-06-24T16:39:19.000Z",
  "statusChanged": "2013-06-24T16:39:19.000Z",
  "lastLogin": "2013-06-24T17:39:19.000Z",
  "lastUpdated": "2013-06-27T16:35:28.000Z",
  "passwordChanged": "2013-06-24T16:39:19.000Z",
  "type": {
    "id": "otyfnjfba4ye7pgjB0g4"
   },
  "profile": {
    "login": "isaac.brock@example.com",
    "firstName": "Isaac",
    "lastName": "Brock",
    "nickName": "issac",
    "displayName": "Isaac Brock",
    "email": "isaac.brock@example.com",
    "secondEmail": "isaac@example.org",
    "profileUrl": "http://www.example.com/profile",
    "preferredLanguage": "en-US",
    "userType": "Employee",
    "organization": "Okta",
    "title": "Director",
    "division": "R&D",
    "department": "Engineering",
    "costCenter": "10",
    "employeeNumber": "187",
    "mobilePhone": "+1-555-415-1337",
    "primaryPhone": "+1-555-514-1337",
    "streetAddress": "301 Brannan St.",
    "city": "San Francisco",
    "state": "CA",
    "zipCode": "94107",
    "countryCode": "US"
  },
  "credentials": {
    "password": {},
    "recovery_question": {
      "question": "Who's a major player in the cowboy scene?"
    },
    "provider": {
      "type": "OKTA",
      "name": "OKTA"
    }
  },
  "_links": {
    "resetPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_password"
    },
    "resetFactors": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/reset_factors"
    },
    "expirePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/expire_password"
    },
    "forgotPassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/forgot_password"
    },
    "changeRecoveryQuestion": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/change_recovery_question"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/deactivate"
    },
    "changePassword": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/credentials/change_password"
    },
    "schema": {
      "href": "https://${yourOktaDomain}/api/v1/meta/schemas/user/oscfnjfba4ye7pgjB0g4"
    },
    "type": {
      "href": "https://${yourOktaDomain}/api/v1/meta/types/user/otyfnjfba4ye7pgjB0g4"
    }
  }
}
```

### User Properties

The User object defines several read-only properties:

| Property                | Description                                                             | DataType                                                                                                           | Nullable   | Unique   | Readonly |
| :---------------------- | :---------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- | :--------- | :------- | :------- |
| id                      | unique key for user                                                     | String                                                                                                             | FALSE      | TRUE     | TRUE     |
| status                  | current [status](#user-status) of user                                  | `STAGED`, `PROVISIONED`, `ACTIVE`, `RECOVERY`, `LOCKED_OUT`, `PASSWORD_EXPIRED`, `SUSPENDED`, or `DEPROVISIONED`   | FALSE      | FALSE    | TRUE     |
| created                 | timestamp when user was created                                         | Date                                                                                                               | FALSE      | FALSE    | TRUE     |
| activated               | timestamp when transition to `ACTIVE` status completed                  | Date                                                                                                               | FALSE      | FALSE    | TRUE     |
| statusChanged           | timestamp when status last changed                                      | Date                                                                                                               | TRUE       | FALSE    | TRUE     |
| lastLogin               | timestamp of last login                                                 | Date                                                                                                               | TRUE       | FALSE    | TRUE     |
| lastUpdated             | timestamp when user was last updated                                    | Date                                                                                                               | FALSE      | FALSE    | TRUE     |
| passwordChanged         | timestamp when password last changed                                    | Date                                                                                                               | TRUE       | FALSE    | TRUE     |
| type                    | user type that determines the schema for the user's profile  | Map (see below)                                                                                                    | FALSE      | FALSE    | TRUE     |
| transitioningToStatus   | target status of an in-progress asynchronous status transition          | `PROVISIONED`, `ACTIVE`, or `DEPROVISIONED`                                                                        | TRUE       | FALSE    | TRUE     |
| profile                 | user profile properties                                                 | [Profile object](#profile-object)                                                                                  | FALSE      | FALSE    | FALSE    |
| credentials             | user's primary authentication and recovery credentials                  | [Credentials object](#credentials-object)                                                                          | FALSE      | FALSE    | FALSE    |
| _links                  | [link relations](#links-object) for the user's current `status`   | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                                                     | TRUE       | FALSE    | TRUE     |
| _embedded               | embedded resources related to the user                                  | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                                                     | TRUE       | FALSE    | TRUE     |

Metadata properties such as `id`, `status`, timestamps, `_links`, and `_embedded` are only available after a user is created.

* The `activated` timestamp will only be available for users activated after 06/30/2013.
* The`statusChanged` and `lastLogin` timestamps will be missing for users created before 06/30/2013 and updated on next status change or login.

The `type` property is a map that identifies the User Type of the user (see [User Types](/docs/reference/api/user-types)). Currently it contains a single element, `id`, as shown in the Example. It can be specified when creating a new User, and may be updated by an administrator on a [full replace of an existing user](/docs/reference/api/user-types/#update-user-type) (but not a partial update).

### User Status

The following diagram shows the state object for a user:

![STAGED, PROVISIONED, ACTIVE, RECOVERY, LOCKED_OUT, PASSWORD_EXPIRED, or DEPROVISIONED](/img/okta-user-status.png "STAGED, PROVISIONED, ACTIVE, RECOVERY, LOCKED_OUT, PASSWORD_EXPIRED, or DEPROVISIONED")

### Understanding User Status Values

The status of a user changes in response to explicit events, such as admin-driven lifecycle changes, user login, or self-service password recovery.
Okta doesn't asynchronously sweep through users and update their password expiry state, for example.
Instead, Okta evaluates password policy at login time, notices the password has expired, and moves the user to the expired state.
When running reports, remember that the data is valid as of the last login or lifecycle event for that user.

### Profile object

Specifies [standard](#default-profile-properties) and [custom](#custom-profile-properties) profile properties for a user.

```json
{
  "profile": {
    "login": "isaac.brock@example.com",
    "firstName": "Isaac",
    "lastName": "Brock",
    "nickName": "issac",
    "displayName": "Isaac Brock",
    "email": "isaac.brock@example.com",
    "secondEmail": "isaac@example.org",
    "profileUrl": "http://www.example.com/profile",
    "preferredLanguage": "en-US",
    "userType": "Employee",
    "organization": "Okta",
    "title": "Director",
    "division": "R&D",
    "department": "Engineering",
    "costCenter": "10",
    "employeeNumber": "187",
    "mobilePhone": "+1-555-415-1337",
    "primaryPhone": "+1-555-514-1337",
    "streetAddress": "301 Brannan St.",
    "city": "San Francisco",
    "state": "CA",
    "zipCode": "94107",
    "countryCode": "US"
  }
}
```

#### Default Profile Properties

The default user profile is based on the [System for Cross-Domain Identity Management: Core Schema](https://tools.ietf.org/html/draft-ietf-scim-core-schema-22#section-4.1.1) and has following standard properties:

| Property            | Description                                                                                                                          | DataType   | Nullable        | Unique   | Readonly   | MinLength   | MaxLength   | Validation                                                                                                       |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------- | :--------- | :---------      | :------- | :--------- | :---------- | :---------- | :--------------------------------------------------------------------------------------------------------------- |
| login               | unique identifier for the user (`username`)                                                                                          | String     | FALSE           | TRUE     | FALSE      | 5           | 100         | [pattern](/docs/reference/api/schemas/#login-pattern-validation)                                                  |
| email               | primary email address of user                                                                                                        | String     | FALSE           | TRUE     | FALSE      | 5           | 100         | [RFC 5322 Section 3.2.3](http://tools.ietf.org/html/rfc5322#section-3.2.3)                                       |
| secondEmail         | secondary email address of user typically used for account recovery                                                                  | String     | TRUE            | TRUE     | FALSE      | 5           | 100         | [RFC 5322 Section 3.2.3](http://tools.ietf.org/html/rfc5322#section-3.2.3)                                       |
| firstName           | given name of the user (`givenName`)                                                                                                 | String     | FALSE (default) | FALSE    | FALSE      | 1           | 50          |                                                                                                                  |
| lastName            | family name of the user (`familyName`)                                                                                               | String     | FALSE (default) | FALSE    | FALSE      | 1           | 50          |                                                                                                                  |
| middleName          | middle name(s) of the user                                                                                                           | String     | TRUE            | FALSE    | FALSE      |             |             |                                                                                                                  |
| honorificPrefix     | honorific prefix(es) of the user, or title in most Western languages                                                                 | String     | TRUE            | FALSE    | FALSE      |             |             |                                                                                                                  |
| honorificSuffix     | honorific suffix(es) of the user                                                                                                     | String     | TRUE            | FALSE    | FALSE      |             |             |                                                                                                                  |
| title               | user's title, such as "Vice President                                                                                                | String     | TRUE            | FALSE    | FALSE      |             |             |                                                                                                                  |
| displayName         | name of the user, suitable for display to end users                                                                                  | String     | TRUE            | FALSE    | FALSE      |             |             |                                                                                                                  |
| nickName            | casual way to address the user in real life                                                                                          | String     | TRUE            | FALSE    | FALSE      |             |             |                                                                                                                  |
| profileUrl          | url of user's online profile (e.g. a web page)                                                                                       | String     | TRUE            | FALSE    | FALSE      |             |             | [URL](https://tools.ietf.org/html/rfc1808)                                                                       |
| primaryPhone        | primary phone number of user such as home number                                                                                     | String     | TRUE            | FALSE    | FALSE      | 0           | 100         |                                                                                                                  |
| mobilePhone         | mobile phone number of user                                                                                                          | String     | TRUE            | FALSE    | FALSE      | 0           | 100         |                                                                                                                  |
| streetAddress       | full street address component of user's address                                                                                      | String     | TRUE            | FALSE    | FALSE      |             |             |                                                                                                                  |
| city                | city or locality component of user's address (`locality`)                                                                            | String     | TRUE            | FALSE    | FALSE      |             |             |                                                                                                                  |
| state               | state or region component of user's address (`region`)                                                                               | String     | TRUE            | FALSE    | FALSE      |             |             |                                                                                                                  |
| zipCode             | zipcode or postal code component of user's address (`postalCode`)                                                                    | String     | TRUE            | FALSE    | FALSE      |             |             |                                                                                                                  |
| countryCode         | country name component of user's address (`country`)                                                                                 | String     | TRUE            | FALSE    | FALSE      |             |             | [ISO 3166-1 alpha 2 "short" code format](https://tools.ietf.org/html/draft-ietf-scim-core-schema-22#ref-ISO3166) |
| postalAddress       | mailing address component of user's address                                                                                          | String     | TRUE            | FALSE    | FALSE      |             |             |                                                                                                                  |
| preferredLanguage   | user's preferred written or spoken languages                                                                                         | String     | TRUE            | FALSE    | FALSE      |             |             | [RFC 7231 Section 5.3.5](https://tools.ietf.org/html/rfc7231#section-5.3.5)                                      |
| locale              | user's default location for purposes of localizing items such as currency, date time format, numerical representations, etc.         | String     | TRUE            | FALSE    | FALSE      |             |             | See Note for more details.                                                                                       |
| timezone            | user's time zone                                                                                                                     | String     | TRUE            | FALSE    | FALSE      |             |             | [IANA Time Zone database format](https://tools.ietf.org/html/rfc6557)                                            |
| userType            | used to describe the organization to user relationship such as "Employee" or "Contractor"                                             | String     | TRUE            | FALSE    | FALSE      |             |             |                                                                                                                  |
| employeeNumber      | organization or company assigned unique identifier for the user                                                                      | String     | TRUE            | FALSE    | FALSE      |             |             |                                                                                                                  |
| costCenter          | name of a cost center assigned to user                                                                                               | String     | TRUE            | FALSE    | FALSE      |             |             |                                                                                                                  |
| organization        | name of user's organization                                                                                                          | String     | TRUE            | FALSE    | FALSE      |             |             |                                                                                                                  |
| division            | name of user's division                                                                                                              | String     | TRUE            | FALSE    | FALSE      |             |             |                                                                                                                  |
| department          | name of user's department                                                                                                            | String     | TRUE            | FALSE    | FALSE      |             |             |                                                                                                                  |
| managerId           | `id` of a user's manager                                                                                                             | String     | TRUE            | FALSE    | FALSE      |             |             |                                                                                                                  |
| manager             | displayName of the user's manager                                                                                                    | String     | TRUE            | FALSE    | FALSE      |             |             |                                                                                                                  |

> **Note:** A locale value is a concatenation of the ISO 639-1 two letter language code, an underscore, and the ISO 3166-1 2 letter country code. For example, `en_US` specifies the language English and country US.

##### Okta Login

Every user within your Okta organization must have a unique identifier for a login.  This constraint applies to all users you import from other systems or applications such as Active Directory.  Your organization is the top-level namespace to mix and match logins from all your connected applications or directories.  Careful consideration of naming conventions for your login identifier will make it easier to onboard new applications in the future.

Logins are not considered unique if they differ only in case and/or diacritical marks.  If one of your users has a login of `Isaac.Brock@example.com`, there cannot be another user whose login is `isaac.brock@example.com`, nor `isáàc.bröck@example.com`.

Okta has a default ambiguous name resolution policy for logins that include @-signs.  (By default, logins must be formatted as email addresses and thus always include @-signs.  That restriction can be removed using either the administrator UI or the [Schemas API](/docs/reference/api/schemas).)  Users can login with their non-qualified short name (e.g. `isaac.brock` with login `isaac.brock@example.com`) as long as the short name is still unique within the organization.

> Hint: Don't use a `login` with a `/` character.  Although `/` is a valid character according to [RFC 6531 section 3.3](http://tools.ietf.org/html/rfc6531#section-3.3), a user with this character in their `login` can't be fetched by `login` due to security risks with escaping this character in URI paths.
For more information about `login`, see [Get User by ID](#get-user-with-id).

##### Modifying Default Profile Properties
The only permitted customization of the default profile is to update permissions, to change whether the `firstName` and `lastName` properties are nullable, or to specify a [pattern](/docs/reference/api/schemas/#login-pattern-validation) for `login`.  You can use the Profile Editor in the administrator UI or the [Schemas API](/docs/reference/api/schemas/) to make schema modifications.

#### Custom Profile Properties

User profiles may be extended with custom properties but the property must first be added to the user profile schema before it can be referenced.  You can use the Profile Editor in the administrator UI or the [Schemas API](/docs/reference/api/schemas/) to manage schema extensions.

Custom attributes may contain HTML tags. It is the client's responsibility to escape or encode this data before displaying it. Use [best-practices](https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet) to prevent cross-site scripting.

### Credentials object

Specifies primary authentication and recovery credentials for a user.  Credential types and requirements vary depending on the provider and security policy of the organization.

| Property            | DataType                                                 | Nullable   | Unique   | Readonly |
| :------------------ | :------------------------------------------------------- | :--------- | :------- | :------- |
| password            | [Password object](#password-object)                      | TRUE       | FALSE    | FALSE    |
| recovery_question   | [Recovery Question object](#recovery-question-object)    | TRUE       | FALSE    | FALSE    |
| provider            | [Provider object](#provider-object)                      | FALSE      | FALSE    | TRUE     |

```json
{
  "password": {
    "value": "tlpWENT2m"
  },
  "recovery_question": {
    "question": "Who's a major player in the cowboy scene?",
    "answer": "Annie Oakley"
  },
  "provider": {
    "type": "OKTA",
    "name": "OKTA"
  }
}
```

#### Password object

Specifies a password for a user

| Property   | DataType                                          | Nullable   | Unique   | Readonly   | MinLength         | MaxLength   | Validation      |
| :--------- | :---------                                        | :--------- | :------- | :--------- | :---------------- | :---------- | :-------------- |
| value      | String                                            | TRUE       | FALSE    | FALSE      | Password Policy   | 72          | Password Policy |
| hash       | [Hashed Password object](#hashed-password-object) | TRUE       | FALSE    | FALSE      | N/A               | N/A         |                 |
| hook       | [Password Hook object](#password-hook-object)     | TRUE       | FALSE    | FALSE      | N/A               | N/A         |                 |

A password value is a **write-only** property.
A password hash is a **write-only** property.
A password hook is a **write-only** property.

When a user has a valid password, or imported hashed password, or password hook, and a response object contains a password credential, then the Password object is a bare object without the `value` property defined (for example, `password: {}`), to indicate that a password value exists.


##### Default Password Policy

The password specified in the value property must meet the default password policy requirements:

- Must be a minimum of 8 characters
- Must have a character from the following groups:
  - Upper case
  - Lower case
  - Digit
- Must not contain the user's login or parts of the the login when split on the following characters: `,` `.` `_` `#` `@`
  - *For example, a user with login `isaac.brock@example.com` will not be able set password brockR0cks! as the password contains the login part `brock`.*

> Password policy requirements can be modified in the administrator UI *(Security -> Policies)*

##### Hashed Password object

Specifies a hashed password to import into Okta. This allows an existing password to be imported into Okta directly from some other store. Okta supports the BCRYPT, SHA-512, SHA-256, SHA-1, and MD5 hashing functions for password import. A hashed password may be specified in a Password object when creating or updating a user, but not for other operations.  See [Create User with Imported Hashed Password](#create-user-with-imported-hashed-password) for information on using this object when creating a user. When updating a user with a hashed password the user must be in the `STAGED` status.

> **Note:** Because the plain text password isn't specified when a hashed password is provided, password policy isn't applied.

| Property | Type | Description |
| -------- | ----- | ---------- |
| algorithm  | String   | The algorithm used to generate the hash using the password (and salt, when applicable). Must be set to BCRYPT, SHA-512, SHA-256, SHA-1 or MD5. |
| value      | String   | For SHA-512, SHA-256, SHA-1, MD5, This is the actual base64-encoded hash of the password (and salt, if used). This is the Base64 encoded `value` of the SHA-512/SHA-256/SHA-1/MD5 digest that was computed by either pre-fixing or post-fixing the `salt` to the `password`, depending on the `saltOrder`. If a `salt` was not used in the `source` system, then this should just be the the Base64 encoded `value` of the password's SHA-512/SHA-256/SHA-1/MD5 digest. For BCRYPT, This is the actual radix64-encoded hashed password. |
| salt       | String   | Only required for salted hashes. For BCRYPT, this specifies the radix64-encoded salt used to generate the hash, which must be 22 characters long. For other salted hashes, this specifies the base64-encoded salt used to generate the hash. |
| workFactor | Number  | Governs the strength of the hash and the time required to compute it. Only required for BCRYPT algorithm. Minimum value is 1, and maximum is 20. |
| saltOrder  | String   | Specifies whether salt was pre- or postfixed to the password before hashing. Only required for salted algorithms. |

###### BCRYPT Hashed Password object example

```bash
"password" : {
  "hash": {
    "algorithm": "BCRYPT",
    "workFactor": 10,
    "salt": "rwh3vH166HCH/NT9XV5FYu",
    "value": "qaMqvAPULkbiQzkTCWo5XDcvzpk8Tna"
  }
}
```

###### SHA-512 Hashed Password object example

```bash
"password" : {
  "hash": {
    "algorithm": "SHA-512",
    "salt": "TXlTYWx0",
    "saltOrder": "PREFIX",
    "value": "QrozP8a+KfoHu6mPFysxLoO5LMQsd2Fw6IclZUf8xQjetJOCGS93vm68h+VaFX0LHSiF/GxQkykq1vofmx6NGA=="
  }
}
```

###### SHA-256 Hashed Password object example

```bash
"password" : {
  "hash": {
    "algorithm": "SHA-256",
    "salt": "MPu13OmY",
    "saltOrder": "PREFIX",
    "value": "Gjxo7mxvvzQWa83ovhYRUH2dWUhC1N77Ntc56UfI4sY"
  }
}
```

###### SHA-1 Hashed Password object example

```bash
"password" : {
  "hash": {
    "algorithm": "SHA-1",
    "salt": "UEO3wsAsgzQ=",
    "saltOrder": "POSTFIX",
    "value": "xjrauE6J6kbjcvMjWSSc+PsBBls="
  }
}
```

###### MD5 Hashed Password object example

```bash
"password" : {
  "hash": {
    "algorithm": "MD5",
    "salt": "TXlTYWx0",
    "saltOrder": "PREFIX",
    "value": "jqACjUUFXM1XE6NiLALAbA=="
  }
}
```

##### Password Hook object

Specifies that a [Password Import Inline Hook](/docs/reference/password-hook/) should be triggered to handle verification of the user's password the first time the user logs in. This allows an existing password to be imported into Okta directly from some other store. See [Create User with Password Hook](#create-user-with-password-hook) for information on using this object when creating a user.

When updating a user with a password hook the user must be in the `STAGED` status.

> **Note:** Because the plain text password isn't specified when a password hook is specified, password policy isn't applied.

| Property   | DataType | Description                                                                                                                                                                                | Required                                                                      | Min Value                      | Max Value                      |
|:-----------|:---------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------|:-------------------------------|:-------------------------------|
| type  | String   | The type of Password Inline Hook. Currently, must be set to default.                                                                                            | TRUE                                                                          | N/A                            | N/A                            |

###### Password Hook object example

```bash
"password" : {
  "hook": {
    "type": "default"
  }
}
```

#### Recovery Question object

Specifies a secret question and answer that is validated (case insensitive) when a user forgets their password or unlocks their account.  The answer property is **write-only**.

| Property  | DataType | Nullable | Unique | Readonly | MinLength | MaxLength |
| --------- | -------- | -------- | ------ | -------- | --------- | --------- |
| question  | String   | TRUE     | FALSE  | FALSE    | 1         | 100       |
| answer    | String   | TRUE     | FALSE  | FALSE    | 1         | 100       |

#### Provider object

Specifies the authentication provider that validates the user's password credential. The user's current provider is managed by the Delegated Authentication settings for your organization. The provider object is **read-only**.

| Property   | DataType                                                              | Nullable   | Unique   | Readonly |
| :--------- | :-------------------------------------------------------------        | :--------- | :------- | :------- |
| type       | `OKTA`, `ACTIVE_DIRECTORY`,`LDAP`, `FEDERATION`, `SOCIAL` or `IMPORT` | FALSE      | FALSE    | TRUE     |
| name       | String                                                                | TRUE       | FALSE    | TRUE     |

> `ACTIVE_DIRECTORY` or `LDAP` providers specify the directory instance name as the `name` property.

> Users with a `FEDERATION` or `SOCIAL` authentication provider do not support a `password` or `recovery_question` credential and must authenticate via a trusted Identity Provider.

>`IMPORT` specifies a hashed password that was imported from an external source.

### Links object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the current status of a user.  The Links object is used for dynamic discovery of related resources, lifecycle operations, and credential operations.  The Links object is read-only.

#### Individual Users vs. Collection of Users

For an individual User result, the Links object contains a full set of link relations available for that User as determined by your policies. For a collection of Users, the Links object contains only the `self` link. Operations that return a collection of Users include [List Users](#list-users) and [List Group Members](/docs/reference/api/groups/#list-group-members).

Here are some links that may be available on a User, as determined by your policies:

| Link Relation Type       | Description                                                                                                           |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| self                     | A self-referential link to this user                                                                                  |
| activate                 | Lifecycle action to [activate the user](#activate-user)                                                               |
| deactivate               | Lifecycle action to [deactivate the user](#deactivate-user)                                                           |
| suspend                  | Lifecycle action to [suspend the user](#suspend-user)                                                                 |
| unsuspend                | Lifecycle action to [unsuspend the user](#unsuspend-user)                                                             |
| resetPassword            | Lifecycle action to [trigger a password reset](#reset-password)                                                       |
| expirePassword           | Lifecycle action to [expire the user's password](#expire-password)                                                    |
| resetFactors             | Lifecycle action to [reset all MFA factors](#reset-factors)                                                           |
| unlock                   | Lifecycle action to [unlock a locked-out user](#unlock-user)                                                          |
| forgotPassword           | [Resets a user's password](#forgot-password) by validating the user's recovery credential.                            |
| changePassword           | [Changes a user's password](#change-password) validating the user's current password                                  |
| changeRecoveryQuestion   | [Changes a user's recovery credential](#change-recovery-question) by validating the user's current password           |

### User-Consent Grant object

<ApiLifecycle access="ea" />

```bash
{
    "id": "oag2n8HU1vTmvCdQ50g3",
    "status": "ACTIVE",
    "created": "2017-11-07T21:46:36.000Z",
    "lastUpdated": "2017-11-07T21:46:36.000Z",
    "issuer": "https://${yourOktaDomain}/oauth2/ausain6z9zIedDCxB0h7",
    "clientId": "customClientIdNative",
    "userId": "00uol9oQZaWN47WQZ0g3",
    "scopeId": "scpp4bmzfCV7dHf8y0g3",
    "_embedded": {
        "scope": {
            "name": "bus:drive",
            "displayName": "test",
            "description": "Drive bus"
        }
    },
    "_links": {
        "app": {
            "href": "https://${yourOktaDomain}:1802/api/v1/apps/0oaozwn7Qlfx0wl280g3",
            "title": "Native client"
        },
        "scope": {
            "href": "https://${yourOktaDomain}:1802/api/v1/authorizationServers/ausoxdmNlCV4Rw9Ec0g3/scopes/scpp4bmzfCV7dHf8y0g3",
            "title": "test"
        },
        "self": {
            "href": "https://${yourOktaDomain}:1802/api/v1/users/00uol9oQZaWN47WQZ0g3/grants/oag2n8HU1vTmvCdQ50g3",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE"
                ]
            }
        },
        "client": {
            "href": "https://${yourOktaDomain}:1802/oauth2/v1/clients/customClientIdNative",
            "title": "Native client"
        },
        "user": {
            "href": "https://${yourOktaDomain}:1802/api/v1/users/00uol9oQZaWN47WQZ0g3",
            "title": "Saml Jackson"
        },
        "authorizationServer": {
            "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7",
            "title": "Example Authorization Server"
        }
    }
}
```

#### User-Consent Grant Properties

<ApiLifecycle access="ea" />

| Property      | Description                                                                                                                      | Datatype                                                        |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| Id            | ID of this grant                                                                                                                 | String                                                          |
| status        | Status of the grant. Valid values: `ACTIVE`, `REVOKED` or `EXPIRED`                                                              | String                                                          |
| created       | Timestamp when the grant was created                                                                                             | Date                                                            |
| lastUpdated   | Timestamp when the grant was last updated                                                                                        | Date                                                            |
| issuer        | The complete URL of the authorization server for this grant                                                                      | String                                                          |
| clientId      | ID of the client for this grant                                                                                                  | String                                                          |
| userId        | ID of the user who consented to this grant                                                                                       | String                                                          |
| scopeId       | ID of the scope to which this grant applies                                                                                      | String                                                          |
| _links        | Discoverable resources related to the grant                                                                                      | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)  |
| _embedded     | If `expand`=`scope` is included in the request, information about the scope specified by `scopeId` is included in the response.  | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)  |

### Client Grant object

<ApiLifecycle access="ea" />

```bash
{
  "client_id": "0oab57tu2q6C0rYwM0h7",
  "client_name": "AWS Cognito",
  "client_uri": null,
  "logo_uri": "https://example.com/image/logo.jpg",
  "_links": {
     "grants": {
        "href": "https://${yourOktaDomain}/api/v1/users/00ucmukel4KHsPARU0h7/clients/0oab57tu2q6C0rYwM0h7/grants"
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

#### Client Grant Properties

| Property      | Description                                   | Datatype                                                          | Unique |
| :------------ | :-------------------------------------------- | :---------------------------------------------------------------- | :----- |
| client_id     | The client ID of the OAuth 2.0 client         | String                                                            | TRUE   |
| client_name   | The name of the OAuth 2.0 client              | String                                                            | TRUE   |
| client_uri    | The URI of the OAuth 2.0 client               | String                                                            | FALSE  |
| logo_uri      | The logo URI of the OAuth 2.0 client          | String                                                            | FALSE  |
| _links        | Discoverable resources related to the grant   | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)    | FALSE  |
