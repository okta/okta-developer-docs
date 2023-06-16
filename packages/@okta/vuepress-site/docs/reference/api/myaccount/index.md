---
title: MyAccount
category: management
---

# MyAccount API

<ApiLifecycle access="ie" />

> **Note:** This document provides reference material for an enhanced MyAccount API, accessible at `/idp/myaccount`. The `/api/v1/myaccount` endpoint is deprecated. See [MyAccount API (deprecated)](/docs/reference/api/archive-myaccount/) for the docs for the older version of the API.

The Okta MyAccount API allows end users to fetch and update their own Okta user profiles. It implements a subset of the existing [Users API](/docs/reference/api/users/) but with significant differences:

* The API doesn't expose information an end user shouldn't have access to.
* The API doesn't support lifecycle operations.
* All operations in this API implicitly refer to the user making the API call. No user ID is needed or even accepted.

> Note: The MyAccount API doesn't support [delegated authentication](https://help.okta.com/okta_help.htm?id=ext_Security_Authentication).

## Get started

* This API is only for Okta Identity Engine. If you’re using Okta Classic Engine, see [MyAccount API (deprecated)](/docs/reference/api/archive-myaccount/). See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.
* Explore the MyAccount API:
   > **Note:** To run the Postman collection, you need an end-user access token. Use an [SDK](/docs/guides/auth-js/main/#handle-responses) to get the token.

   [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/9cb68745dbf85ae3a871)

#### API versioning

A valid API version in the `Accept` header is required to access the API. Current version: V1.0.0

```bash
Accept: application/json; okta-version=1.0.0
```

#### Access Token assurance

MyAccount operations that create, update, or delete resources require Access Tokens up to 15 minutes old. API calls with Access Tokens older than 15 minutes require re-authentication. If you don't re-authenticate the token, the API returns a 403 error with the following content in the header:

```bash
www-authenticate: Bearer realm="IdpMyAccountAPI", error="insufficient_authentication_context", error_description="The access token requires additional assurance to access the resource", max_age=900
```

## MyAccount Operations

The MyAccount API has the following operations:

* [Get My Emails](#get-my-emails)
* [Get My Email](#get-my-email)
* [Add My Email](#add-my-email)
* [Challenge My Email](#challenge-my-email)
* [Verify My Email](#verify-my-email)
* [Poll My Email Challenge](#poll-my-email-challenge)
* [Delete My Email](#delete-my-email)
* [Get My Phones](#get-my-phones)
* [Get My Phone](#get-my-phone)
* [Add My Phone](#add-my-phone)
* [Challenge My Phone](#challenge-my-phone)
* [Verify My Phone](#verify-my-phone)
* [Delete My Phone](#delete-my-phone)
* [Get My User Profile Schema](#get-my-user-profile-schema)
* [Get My User Profile](#get-my-user-profile)
* [Update My User Profile](#update-my-user-profile)
* [Get My password](#get-my-password)
* [Add My password](#add-my-password)
* [Update My password](#update-my-password)
* [Delete My password](#delete-my-password)

### Get My Emails

<ApiOperation method="get" url="/idp/myaccount/emails" />

Fetches all of the current user's email information: a collection of links for each email describing the operations that can be performed

#### Required scope and role

An Okta scope of `okta.myAccount.email.read` or `okta.myAccount.email.manage` is required to use this endpoint.

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Response body

A list of the requested [My Email object](#my-email-object)

#### Usage example

Any user with a valid bearer token can issue this request to get their email addresses.

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${token}" \
-H "Accept: application/json; okta-version=1.0.0" \
"https://${yourOktaDomain}/idp/myaccount/emails"
```

##### Response

```json
[
    {
        "id": "0dd9a31e3aacb7181de720d15d1ef247",
        "status": "VERIFIED",
        "profile": {
            "email": "some.primary.email1@okta.com"
        },
        "roles": [
            "PRIMARY"
        ],
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/idp/myaccount/emails/0dd9a31e3aacb7181de720d15d1ef247",
                "hints": {
                    "allow": [
                        "GET"
                    ]
                }
            },
            "challenge": {
                "href": "https://${yourOktaDomain}/idp/myaccount/emails/0dd9a31e3aacb7181de720d15d1ef247/challenge",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            }
        }
    },
    {
        "id": "edf645ca14c3ebaf5aa69346de6afbf5",
        "status": "VERIFIED",
        "profile": {
            "email": "add.test.email@okta.com"
        },
        "roles": [
            "SECONDARY"
        ],
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/idp/myaccount/emails/edf645ca14c3ebaf5aa69346de6afbf5",
                "hints": {
                    "allow": [
                        "GET"
                    ]
                }
            },
            "challenge": {
                "href": "https://${yourOktaDomain}/idp/myaccount/emails/edf645ca14c3ebaf5aa69346de6afbf5/challenge",
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

### Get My Email

<ApiOperation method="get" url="/idp/myaccount/emails/{id}" />

Fetches the current user's email information by ID: a collection of links describing the operations that can be performed on the email

#### Required scope and role

An Okta scope of `okta.myAccount.email.read` or `okta.myAccount.email.manage` is required to use this endpoint.

#### Request path parameters

| Parameter  | Type   | Description                                       |
| ---------- | ------ | ------------------------------------------------- |
| `id` | String | ID of the email. Obtain the ID of the email through `GET /idp/myaccount/emails` or `POST /idp/myaccount/emails` when adding a new email address. |

#### Request query parameters

N/A

#### Response body

The requested [My Email object](#my-email-object)

#### Usage example

Any user with a valid bearer token can issue this request to get their email.

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${token}" \
-H "Accept: application/json; okta-version=1.0.0" \
"https://${yourOktaDomain}/idp/myaccount/emails/{id}"
```

##### Response

```json
{
    "id": "5a8de6071e1b94e0f4ec664b9e4869e8",
    "status": "VERIFIED",
    "profile": {
        "email": "primary.email@okta.com"
    },
    "roles": [
        "PRIMARY"
    ],
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/idp/myaccount/emails/5a8de6071e1b94e0f4ec664b9e4869e8",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "challenge": {
            "href": "https://${yourOktaDomain}/idp/myaccount/emails/5a8de6071e1b94e0f4ec664b9e4869e8/challenge",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Add My Email

<ApiOperation method="post" url="/idp/myaccount/emails" />

Add a `PRIMARY` or `SECONDARY` email address to the user's account. The new email address is in UNVERIFIED status.

#### Required scope and role

An Okta scope of `okta.myAccount.email.manage` is required to use this endpoint.

> **Note:** Admin users aren't allowed to make a POST request to the `/idp/myaccount/emails` endpoint.

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Request body

This API requires a [My Email Request object](#my-email-request-object) as its request body.

#### Response body

The requested [My Email object](#my-email-object)

#### Error Responses

If an invalid email is passed to `profile` in the request body, the response returns a 400 BAD REQUEST with error code E0000001.

If the email operation isn't enabled for the request `role` on the org, the response returns a 403 FORBIDDEN with error code E0000038.

If the email already exists for the current user, the response returns a 409 CONFLICT with error code E0000157.

#### Usage example

Any user with a valid bearer token can issue this request to create their email.

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${token}" \
-H "Accept: application/json; okta-version=1.0.0" \
"https://${yourOktaDomain}/idp/myaccount/emails"
```

##### Response

```json
{
    "id": "5a8de6071e1b94e0f4ec664b9e4869e8",
    "status": "UNVERIFIED",
    "profile": {
        "email": "primary.email@okta.com"
    },
    "roles": [
        "PRIMARY"
    ],
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/idp/myaccount/emails/5a8de6071e1b94e0f4ec664b9e4869e8",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "challenge": {
            "href": "https://${yourOktaDomain}/idp/myaccount/emails/5a8de6071e1b94e0f4ec664b9e4869e8/challenge",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Challenge My Email

<ApiOperation method="post" url="/idp/myaccount/emails/{id}/challenge" />

Sends a challenge to the email and the user receives a "Confirm email address change" email with a one-time passcode to verify the email.
In addition, the user also receives a "Notice of pending email address change" email. After the challenge is verified, the email becomes active.

#### Required scope and role

An Okta scope of `okta.myAccount.email.manage` is required to use this endpoint.

> **Note:** Admin users aren't allowed to make a POST request to the `/idp/myaccount/emails` endpoint.

#### Request path parameters

| Parameter  | Type   | Description                                       |
| ---------- | ------ | ------------------------------------------------- |
| `id` | String | ID of the email. Obtain the ID of the email through `GET /idp/myaccount/emails` or `POST /idp/myaccount/emails` when adding a new email address. |

#### Request query parameters

N/A

#### Request body

| Property | Type                     | Description                          |
| -------- | -------------------------|--------------------------------------|
| `state` | String | (Optional) The state parameter, the state of the client |

#### Response body

The requested [My Email Challenge Response object](#my-email-challenge-response-object)

#### Error Responses

If the email operation isn't enabled in the org, the response returns a 403 FORBIDDEN with error code E0000038.

If an invalid `emailId` is requested for challenge, the response returns a 404 NOT FOUND with error code E0000007.

#### Usage example

Any non-admin user with a valid bearer token can issue this request to challenge their emails.

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${token}" \
-H "Accept: application/json; okta-version=1.0.0" \
"https://${yourOktaDomain}/idp/myaccount/emails/{id}/challenge"
```

##### Response

Returns an HTTP 201 status code response.

```json
{
    "id": "myaccount.0Up-umuhQ1adW2EGRAAK1g",
    "status": "UNVERIFIED",
    "expiresAt": "2022-03-04T21:19:43.315Z",
    "profile": {
        "email": "some.primary.email@okta.com"
    },
    "_links": {
        "verify": {
            "href": "https://jay-oie-org1.okta1.com/idp/myaccount/emails/92fc7f9445e413e94e544cc3b30483ce/challenge/myaccount.0Up-umuhQ1adW2EGRAAK1g/verify",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "poll": {
            "href": "https://jay-oie-org1.okta1.com/idp/myaccount/emails/92fc7f9445e413e94e544cc3b30483ce/challenge/myaccount.0Up-umuhQ1adW2EGRAAK1g",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```

### Verify My Email

<ApiOperation method="post" url="/idp/myaccount/emails/{id}/challenge/{challengeId}/verify" />

Verify the email challenge with the verification code that the user receives from the "Confirm email address change" email. The email is active upon a successful verification.

#### Required scope and role

An Okta scope of `okta.myAccount.email.manage` is required to use this endpoint.

> **Note:** Admin users aren't allowed to make a POST request to the `/idp/myaccount/emails/{id}/challenge/{challengeId}/verify` endpoint.

#### Request path parameters

| Parameter  | Type   | Description                                       |
| ---------- | ------ | ------------------------------------------------- |
| `id` | String | ID of the email. Obtain the ID of the email through `GET /idp/myaccount/emails` or `POST /idp/myaccount/emails` when adding a new email address. |
| `challengeId` | String | The `challengeId` of the email. Obtain the `challengeId` through `POST /idp/myaccount/emails/{id}/challenge/` when creating a new challenge. |

#### Request query parameters

N/A

#### Request body

This request requires the `verificationCode` property as its request body.

| Property | Type                     | Description                          |
| -------- | -------------------------|--------------------------------------|
| `verificationCode`  | String | A 6-digit verification code that the user receives from the "Confirm email address change" email |

#### Response body

N/A

#### Error Responses

If the requested `verificationCode` is invalid, the response returns a 401 UNAUTHORIZED with error code E0000004.

If the email operation isn't enabled in the org, the response returns a 403 FORBIDDEN with error code E0000038.

If an invalid `challengeId` is requested for verification, the response returns a 404 NOT FOUND with error code E0000007.

#### Usage example

Any non-admin user with a valid bearer token can issue this request to verify their emails.

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${token}" \
-H "Accept: application/json; okta-version=1.0.0" \
"https://${yourOktaDomain}/idp/myaccount/emails/{id}/challenge/{challengeId}/verify"
```

##### Response

Returns an empty HTTP 204 status code response.

### Poll My Email Challenge

<ApiOperation method="get" url="/idp/myaccount/emails/{id}/challenge/{challengeId}" />

Fetches the email challenge's status

#### Required scope and role

An Okta scope of `okta.myAccount.email.read` is required to use this endpoint.

#### Request path parameters
| Parameter  | Type   | Description                                       |
| ---------- | ------ | ------------------------------------------------- |
| `id` | String | ID of the email. Obtain the ID of the email through `GET /idp/myaccount/emails` or `POST /idp/myaccount/emails` when adding a new email address. |
| `challengeId` | String | The `challengeId` of the email. Obtain the `challengeId` through `POST /idp/myaccount/emails/{id}/challenge/` when creating a new challenge. |

#### Request query parameters

N/A

#### Response body

The requested [My Email Challenge object](#my-email-challenge-object)

#### Usage example

Any non-admin user with a valid bearer token can issue this request to get their email challenge status.

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${token}" \
-H "Accept: application/json; okta-version=1.0.0" \
"https://${yourOktaDomain}/idp/myaccount/emails/{id}/challenge/{challengeId}"
```

##### Response

```json
{
    "id": "myaccount.y-YPC4HiTbGEAeEwmHI2MA",
    "status": "UNVERIFIED",
    "expiresAt": "2022-03-04T17:29:57.067Z",
    "profile": {
        "email": "some.primary.email@okta.com"
    }
}
```

### Delete My Email

<ApiOperation method="delete" url="/idp/myaccount/emails/{id}" />

Deletes the current user's email information by ID. You can only delete UNVERIFIED primary and secondary emails.

#### Required scope and role

An Okta scope of `okta.myAccount.email.manage` is required to use this endpoint.

> **Note:** Admin users aren't allowed to make a DELETE request to the `/idp/myaccount/emails/{id}/` endpoint.

#### Request path parameters

| Parameter  | Type   | Description                                       |
| ---------- | ------ | ------------------------------------------------- |
| `id` | String | ID of the email. Obtain the ID of the email through `GET /idp/myaccount/emails` or `POST /idp/myaccount/emails` when adding a new email address. |

#### Request query parameters

N/A

#### Response body

N/A

#### Error Responses

If an invalid `emailId` is requested for deletion, the response returns a 404 NOT FOUND with error code E0000007.

If the email for deletion is an already verified email, the response returns a 400 BAD REQUEST with error code E0000001.

#### Usage example

Any non-admin user with a valid bearer token can issue this request to delete their UNVERIFIED emails.

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: Bearer ${token}" \
-H "Accept: application/json; okta-version=1.0.0" \
"https://${yourOktaDomain}/idp/myaccount/emails/{id}"
```

##### Response

Returns an empty HTTP 204 status code response

#### Error Responses

If an invalid email ID is passed to the request, the response returns a 404 NOT FOUND with error code E0000007.

### Get My Phones

<ApiOperation method="get" url="/idp/myaccount/phones" />

Fetches the current user's phone information for all phones, along with a collection of links for each phone describing the operations that can be performed.

#### Required scope and role

An Okta scope of `okta.myAccount.phone.read` or `okta.myAccount.phone.manage` is required to use this endpoint.

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Response body

A list of the requested [My Phone object](#my-phone-object)

#### Usage example

Any user with a valid bearer token can issue this request to get their phones.

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${token}" \
-H "Accept: application/json; okta-version=1.0.0" \
"https://${yourOktaDomain}/idp/myaccount/phones"
```

##### Response

```json
[
    {
        "id": "sms1bueyI0w0HHwro0g4",
        "status": "UNVERIFIED",
        "profile": {
            "phoneNumber": "+15555555555"
        },
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/idp/myaccount/phones/sms1bueyI0w0HHwro0g4",
                "hints": {
                    "allow": [
                        "GET",
                        "DELETE",
                    ]
                }
            },
            "challenge": {
                "href": "https://${yourOktaDomain}/idp/myaccount/phones/sms1bueyI0w0HHwro0g4/challenge",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            }
        }
    },
    {
        "id": "clf1639iP89ovYrhQ0g4",
        "status": "VERIFIED",
        "profile": {
            "phoneNumber": "+15555555556"
        },
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/idp/myaccount/phones/clf1639iP89ovYrhQ0g4",
                "hints": {
                    "allow": [
                        "GET",
                        "DELETE"
                    ]
                }
            },
            "challenge": {
                "href": "https://${yourOktaDomain}/idp/myaccount/phones/clf1639iP89ovYrhQ0g4/challenge",
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

### Get My Phone

<ApiOperation method="get" url="/idp/myaccount/phones/{id}" />

Fetches the current user's phone information by ID, along with a collection of links describing the operations that can be performed to the phone.

#### Required scope and role

An Okta scope of `okta.myAccount.phone.read` or `okta.myAccount.phone.manage` is required to use this endpoint.

#### Request path parameters

| Parameter  | Type   | Description                                       |
| ---------- | ------ | ------------------------------------------------- |
| `id` | String | ID of the phone. Obtain the ID of the phone through `GET /idp/myaccount/phones` or `POST /idp/myaccount/phones` when adding a new phone. |

#### Request query parameters

N/A

#### Response body

The requested [My Phone object](#my-phone-object)

#### Usage example

Any user with a valid bearer token can issue this request to get their phone.

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${token}" \
-H "Accept: application/json; okta-version=1.0.0" \
"https://${yourOktaDomain}/idp/myaccount/phones/{id}"
```

##### Response

```json
{
    "id": "sms1bueyI0w0HHwro0g4",
    "status": "UNVERIFIED",
    "profile": {
        "phoneNumber": "+15555555555"
    },
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/idp/myaccount/phones/sms1bueyI0w0HHwro0g4",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE"
                ]
            }
        },
        "challenge": {
            "href": "https://${yourOktaDomain}/idp/myaccount/phones/sms1bueyI0w0HHwro0g4/challenge",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Add My Phone

<ApiOperation method="post" url="/idp/myaccount/phones" />

Creates an UNVERIFIED status phone for either the `SMS` or `CALL` method to the user's MyAccount setting

#### Required scope and role

An Okta scope of `okta.myAccount.phone.manage` is required to use this endpoint.

> **Note:**  Admin users aren't allowed to make a POST request to the`/idp/myaccount/phones` endpoint.

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Request body

This API requires a [My Phone Request object](#my-phone-request-object) as its request body.

#### Response body

The requested [My Phone object](#my-phone-object)

#### Error Responses

If an invalid phone number is passed to `profile` in the request body, the response returns a 400 BAD REQUEST with error code E0000001.

If an invalid `method` is passed in the request body, the response returns a 400 BAD REQUEST with error code E0000001.

If the phone authenticator isn't enabled for `method` on the org, the response returns a 403 FORBIDDEN with error code E0000038.

Disabling the `idp` version of the MyAccount API in the org returns a 401 UNAUTHORIZED with error code E0000015.

If the number of phone factors for the current user already reaches the maximum allowed per user or the phone factor is failed to create, the response returns a 400 BAD REQUEST ERROR with error code E0000001.

If the phone number already exists for the current user, the response returns a 409 CONFLICT with error code E0000157.

If the call providers fail to send the challenge when `sendCode` is true,  the response returns 500 with error code E0000138.

#### Usage example

Any user with a valid bearer token can issue this request to create their phone.

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${token}" \
-H "Accept: application/json; okta-version=1.0.0" \
"https://${yourOktaDomain}/idp/myaccount/phones"
```

##### Response

Returns an HTTP 201 status code response with a location URL that refers to the newly created phone in the response header.

```json
{
    "id": "sms1bueyI0w0HHwro0g4",
    "status": "UNVERIFIED",
    "profile": {
        "phoneNumber": "+15555555555"
    },
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/idp/myaccount/phones/sms1bueyI0w0HHwro0g4",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE"
                ]
            }
        },
        "challenge": {
            "href": "https://${yourOktaDomain}/idp/myaccount/phones/sms1bueyI0w0HHwro0g4/challenge",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "verify": {
            "href": "https://${yourOktaDomain}/idp/myaccount/phones/sms1bueyI0w0HHwro0g4/challenge",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Challenge My Phone

<ApiOperation method="post" url="/idp/myaccount/phones/{id}/challenge"/>

Sends a phone challenge using one of two methods: `SMS` or `CALL`. This request can also handle a resend challenge (retry).

Upon a successful challenge, the user receives a verification code by `SMS` or `CALL`. Send a `POST` request to the `/idp/myaccount/phones/{id}/verify` endpoint to use the verification code to verify the phone number. The verification code expires in five minutes.

> **Note:** Sending requests to the `/idp/myaccount/phones/{id}/challenge` endpoint more often than once every 30 seconds, or at a rate that exceeds the rate limit rule configured by the admin, returns a 429 (Too Many Requests) error.

#### Required scope and role

An Okta scope of `okta.myAccount.phone.manage` is required to use this endpoint.

> **Note:** Admin users aren't allowed to make requests to the `/idp/myaccount/phones/{id}/challenge` endpoint.

#### Request path parameters

| Parameter  | Type   | Description                                       |
| ---------- | ------ | ------------------------------------------------- |
| `id` | String | The ID of the phone factor. Found in the response when a new phone number is created successfully (`POST /idp/myaccount/phones`) or phone(s) is retrieved (`GET /idp/myaccount/phones`)  |

#### Request query parameters

N/A

#### Request body

This request requires the `method` property as its request body. You can use an optional boolean `retry` property to indicate a resend challenge when its value is set to `true`.

| Property | Type                     | Description                          |
| -------- | -------------------------|--------------------------------------|
| `method`  | String | The method with which the challenge should be sent. Valid values: `SMS` and `CALL` |
| `retry`  | Boolean | An optional property that indicates whether this is a normal challenge or retry |

#### Response body

Returns a JSON object that contains a link to verify the challenged phone with an HTTP 200 status code.

| Property | Type                     | Description                          |
| -------- | -------------------------|--------------------------------------|
| `_links` | Object ([JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06))  | Discoverable resources related to the caller's email |

Passing an invalid `method` returns a 400 BAD REQUEST with error code E0000001.

Disabling the factor type of the corresponding method on the org returns a 403 FORBIDDEN with error code E0000038.

Disabling the `idp` version of the MyAccount API in the org returns a 401 UNAUTHORIZED with error code E0000015.

Passing an invalid `id` returns a 404 NOT FOUND with error code E0000008.

Call providers failing to send the out of band OTP challenge returns 500 with error code E0000138.

#### Usage example

##### Request

This request sends a verification code by SMS to the phone number represented by `id`. The request is a normal phone challenge, not a retry.

```bash
curl -XPOST 'https://${yourOktaDomain}/myaccount/phones/{id}/challenge' -H 'Authorization: bearer {token}' -H 'Content-Type: application/json' -H 'Accept: application/json; okta-version=1.0.0' --data '{
     "method": "SMS",
     "retry": false
 }'
```

##### Response

Returns an HTTP 200 status code response.

```bash
{
    "_links": {
        "verify": {
            "href": 'http://${yourOktaDomain}/idp/myaccount/phones/smsa7gpDMs5V6C0LT0g4/verify',
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Verify My Phone

<ApiOperation method="post" url="/idp/myaccount/phones/{id}/verify"/>

Verify the phone number with the verification code that the user receives through `SMS` or `CALL`. The phone number is active upon a successful verification.

> **Note:** Sending requests to the `/idp/myaccount/phones/{id}/verify` endpoint at a rate that exceeds the rate limit rule configured by the admin returns a 429 (Too Many Requests) error.

#### Required scope and role

An Okta scope of `okta.myAccount.phone.manage` is required to use this endpoint.

> **Note:** Admin users aren't allowed to make requests to the `/idp/myaccount/phones/{id}/verify` endpoint.

#### Request path parameters

| Parameter  | Type   | Description                                       |
| ---------- | ------ | ------------------------------------------------- |
| `id` | String | The ID of the phone factor. Found in the response when a new phone number is created successfully (`POST /idp/myaccount/phones`) or phone(s) is retrieved (`GET /idp/myaccount/phones`).  |

#### Request query parameters

N/A

#### Request body

This request requires the `verificationCode` property as its request body.

| Property | Type                     | Description                          |
| -------- | -------------------------|--------------------------------------|
| `verificationCode`  | String | A 6-digit verification code that the user receives through `SMS` or `CALL` |

#### Response body

Returns an empty response with an HTTP 204 status code.

Disabling the factor type of the corresponding method in the org returns a 403 FORBIDDEN with error code E0000038.

Disabling the `IDP_MY_ACCOUNT_API` feature flag in the org returns a 401 UNAUTHORIZED with error code E0000015.

Passing an invalid `id` returns a 404 NOT FOUND with error code E0000008.

Passing an invalid `verificationCode` returns a 400 BAD REQUEST with error code E0000001.

Passing a valid `verificationCode` again (verifying a phone number that has been verified) results in a no-op.

In an extremely rare case, verifying a phone number when the challenge is about to expire returns a 409 CONFLICT with error code E0000157.

Failing to answer the challenge (possibly due to invalid `verificationCode`) returns a 401 UNAUTHORIZED with error code E0000004.

#### Usage example

##### Request

The following request verifies the phone number represented by `id` with a `verificationCode` of 796672.

```bash
curl -XPOST 'https://${yourOktaDomain}/myaccount/phones/{id}/verify' -H 'Authorization: bearer {token}' -H 'Content-Type: application/json' -H 'Accept: application/json; okta-version=1.0.0' --data '{
     "verificationCode": "796672"
 }'
```

### Delete My Phone

<ApiOperation method="delete" url="/idp/myaccount/phones/{id}" />

Delete the current user's phone information by ID.

#### Required scope and role

An Okta scope of `okta.myAccount.phone.manage` is required to use this endpoint.

> **Note:** Admin users aren't allowed to make a DELETE request to the `/idp/myaccount/phones/{id}/` endpoint.

#### Request path parameters

| Parameter  | Type   | Description                                       |
| ---------- | ------ | ------------------------------------------------- |
| `id` | String | ID of the phone. Obtain the ID of the phone through `GET /idp/myaccount/phones` or `POST /idp/myaccount/phones` when adding a new phone. |

#### Request query parameters

N/A

#### Response body

N/A

#### Usage example

Any non-admin user with a valid bearer token can issue this request to delete their phone.

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: Bearer ${token}" \
-H "Accept: application/json; okta-version=1.0.0" \
"https://${yourOktaDomain}/idp/myaccount/phones/{id}"
```

##### Response

Returns an empty HTTP 204 status code response.

#### Error Responses

If the phone authenticator isn't enabled for `method` in the org, the response returns a 403 FORBIDDEN with error code E0000038.

If an invalid phone ID is passed to the request, the response returns a 404 NOT FOUND with error code E0000008.

### Get My User Profile Schema

| Endpoint | Lifecycle Status |
|---|---|
| <ApiOperation method="get" url="/idp/myaccount/profile/schema" /> | GA  |
| <ApiOperation method="get" url="/api/v1/myaccount/profile/schema" /> | <ApiLifecycle access="deprecated" /> |

Fetches the appropriate User Profile Schema for the caller's [User Type](/docs/reference/api/user-types/)

> **Note:** If a property's value isn't visible to an end user (because it's hidden or [sensitive](https://help.okta.com/okta_help.htm?id=ext-hide-sensitive-attributes)), then the property's definition is also hidden in the output of this API.

#### Required scope and role

An Okta scope of `okta.myAccount.profile.read` or `okta.myAccount.profile.manage` is required to use the new `/idp/myaccount` endpoint.

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Response body

The [User Profile Schema](#user-profile-schema-object) for the caller.

#### Usage example

Any user with a valid bearer token can issue this request to get the Schema for their User Profile.

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${api_token}" \
-H "Accept: application/json; okta-version=1.0.0" \
"https://${yourOktaDomain}/idp/myaccount/profile/schema"
```

##### Response

```json
{
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/idp/myaccount/profile/schema"
        }
    },
    "properties": {
        "customBoolean": {
            "permissions": {
                "SELF": "READ_WRITE"
            },
            "title": "customBoolean",
            "type": "boolean"
        },
        "foo": {
            "permissions": {
                "SELF": "READ_ONLY"
            },
            "title": "foo",
            "type": "string"
        },
        "login": {
            "maxLength": 100,
            "minLength": 5,
            "permissions": {
                "SELF": "READ_ONLY"
            },
            "required": true,
            "title": "Username",
            "type": "string"
        },
        "mobilePhone": {
            "maxLength": 100,
            "permissions": {
                "SELF": "READ_WRITE"
            },
            "title": "Mobile phone",
            "type": "string"
        },
        "customInteger": {
            "permissions": {
                "SELF": "READ_WRITE"
            },
            "title": "customInteger",
            "type": "integer"
        }
    }
}
```

### Get My User Profile

| Endpoint | Lifecycle Status |
|---|---|
| <ApiOperation method="get" url="/idp/myaccount/profile" /> | GA  |
| <ApiOperation method="get" url="/api/v1/myaccount/directoryProfile" /> | <ApiLifecycle access="deprecated" /> |

Fetches the caller's Okta User Profile, excluding any attribute also excluded by [Get My User Profile Schema](#get-my-user-profile-schema)

#### Required scope and role

An Okta scope of `okta.myAccount.profile.read` or `okta.myAccount.profile.manage` is required to use the new `/idp/myaccount` endpoint.

#### Request query parameters

| Parameter | Type        | Description                                                                                            |
| --------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| `expand`  | String      | (Optional) If specified as `schema`, the User Profile Schema is included in the `embedded` attribute. |


#### Response body

Returns a [User Profile](#user-profile-object).

#### Usage example

Any user with a valid bearer token can issue this request to get their User Profile.

##### Request

This request would retriever the requesting User's Profile.

```bash
curl -v -X GET \
-H "Authorization: Bearer ${api_token}" \
-H "Accept: application/json; okta-version=1.0.0" \
"https://${yourOktaDomain}/idp/myaccount/profile"
```

##### Response

```json
{
    "_links": {
        "describedBy": {
            "href": "https://${yourOktaDomain}/idp/myaccount/profile"
        },
        "self": {
            "href": "https://${yourOktaDomain}/idp/myaccount/profile/schema"
        }
      }
    },
    "createdAt": "2020-01-14T20:05:32.000Z",
    "modifiedAt": "2020-10-13T03:17:09.000Z",
    "profile": {
        "customBoolean": null,
        "foo": "bar",
        "login": "example@ex.ample.com",
        "mobilePhone": null,
        "customInteger": null
    }
}
```

### Update My User Profile

| Endpoint | Lifecycle Status |
|---|---|
| <ApiOperation method="put" url="/idp/myaccount/profile" /> | GA  |
| <ApiOperation method="put" url="/api/v1/myaccount/directoryProfile" /> | <ApiLifecycle access="deprecated" /> |

Updates the caller's User Profile.

> **Note:** This API differs from the the existing [Users API](/docs/reference/api/users/) in that only PUT is supported.  This API also doesn't support partial update (PATCH request). All values returned from fetching User Profile must be passed to this API, or the update doesn't pass validation. This applies even if the omitted schema property is optional. To unset an optional property, explicitly pass the property with a value of `null`.

#### Required scope and role

An Okta scope of `okta.myAccount.profile.manage` is required to use the new `/idp/myaccount` endpoint.

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Request body

This API requires the `profile` property of a [User Profile](#user-profile-object) as its request body.

| Property | Type                     | Description                          |
| -------- | -------------------------|--------------------------------------|
| `profile`  | Object | The properties defined in the schema |

#### Response body

Returns the result of applying the update, as if the caller had invoked the GET User Profile operation.

#### Error Responses

If provided profile attributes for update are invalid, the response returns a 400 BAD REQUEST with error code E0000001.

#### Usage example

##### Request

This request would update the user profile of the caller to have exactly the values specified.

```bash
curl -XPUT 'https://${yourOktaDomain}/idp/myaccount/profile' -H 'Authorization: Bearer {token}' -H 'Content-Type: application/json' -H 'Accept: application/json; okta-version=1.0.0' --data '{
     "profile": {
         "customBoolean": false,
         "foo": "bar",
         "login": "dayton.williams@okta.com",
         "notFive": 5,
         "customInteger": null
     }
 }'
```

##### Response

```json
{
    "_links": {
        "describedBy": {
            "href": "https://${yourOktaDomain}/idp/myaccount/profile"
        },
        "self": {
            "href": "https://${yourOktaDomain}/idp/myaccount/profile/schema"
        }
      }
    },
    "createdAt": "2020-01-14T20:05:32.000Z",
    "modifiedAt": "2020-11-03T06:01:13.000Z",
    "profile": {
        "customBoolean": false,
        "foo": "bar",
        "login": "example@ex.ample.com",
        "mobilePhone": null,
        "customInteger": 5
    }
}
```

### Get My Password

<ApiOperation method="get" url="/idp/myaccount/password" />

Retrieves the current user's password status

> **Note:**  This operation only returns information about the password, not the password itself.

#### Required scope and role

An Okta scope of `okta.myAccount.password.read` or `okta.myAccount.password.manage` is required to use this endpoint.

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Response body

The requested [My Password object](#my-password-object)

#### Usage example

##### Request

```bash
curl -v -X GET \
-H "Authorization: Bearer ${token}" \
-H "Accept: application/json; okta-version=1.0.0" \
"https://${yourOktaDomain}/idp/myaccount/password"
```

##### Response

```json
{
    "id": "00T196qTp3LIMZQ0L0g3",
    "status": "ACTIVE",
    "created": "2020-01-14T20:05:32.000Z",
    "lastUpdated": "2020-01-14T20:05:32.000Z"
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/idp/myaccount/password",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE",
                    "PUT"
                ]
            }
        }
    }
}
```

### Add My Password

<ApiOperation method="post" url="/idp/myaccount/password" />

Creates and enrolls a password for the current user

#### Required scope and role

An Okta scope of `okta.myAccount.password.manage` is required to use this endpoint.

> **Note:** Admin users can't make POST requests to the `/idp/myaccount/password` endpoint.

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Request body

This API requires a [My Password Request object](#my-password-request-object) as its request body.

#### Response body

The requested [My Password object](#my-password-object)

#### Error Responses

If the password supplied is invalid, the response returns a 400 BAD REQUEST with error code E0000001.

If the password operation isn't enabled in the org, the response returns a 403 FORBIDDEN with error code E0000038.

#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${token}" \
-H "Accept: application/json; okta-version=1.0.0" \
"https://${yourOktaDomain}/idp/myaccount/password"
```

##### Response

```json
{
    "id": "00T196qTp3LIMZQ0L0g3",
    "status": "ACTIVE",
    "created": "2020-01-14T20:05:32.000Z",
    "lastUpdated": "2020-01-14T20:05:32.000Z",
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/idp/myaccount/password/00T196qTp3LIMZQ0L0g3",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE",
                    "PUT"
                ]
            }
        }
    }
}
```

### Update My Password

<ApiOperation method="put" url="/idp/myaccount/password" />

Replaces the password for the current user.

#### Required scope and role

An Okta scope of `okta.myAccount.password.manage` is required to use this endpoint.

> **Note:** Admin users can't make PUT requests to the `/idp/myaccount/password` endpoint."

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Request body

This API requires a [My Password Request object](#my-password-request-object) as its request body.

#### Response body

The requested [My Password object](#my-password-object)

#### Error Responses

If the password supplied is invalid, the response returns a 400 BAD REQUEST with error code E0000001.

If the password operation isn't enabled in the org, the response returns a 403 FORBIDDEN with error code E0000038.

#### Usage example

##### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${token}" \
-H "Accept: application/json; okta-version=1.0.0" \
"https://${yourOktaDomain}/idp/myaccount/password"
```

##### Response

```json
{
    "id": "00T196qTp3LIMZQ0L0g3",
    "status": "ACTIVE",
    "created": "2020-01-14T20:05:32.000Z",
    "lastUpdated": "2020-01-14T20:05:32.000Z",
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/idp/myaccount/password/00T196qTp3LIMZQ0L0g3",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE",
                    "PUT"
                ]
            }
        }
    }
}
```

### Delete My Password

Deletes the current user's enrolled password

<ApiOperation method="delete" url="/idp/myaccount/password" />

#### Required scope and role

An Okta scope of `okta.myAccount.password.manage` is required to use this endpoint.

> **Note:** Admin users can't make PUT requests to the `/idp/myaccount/password` endpoint."

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Usage example

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: Bearer ${token}" \
-H "Accept: application/json; okta-version=1.0.0" \
"https://${yourOktaDomain}/idp/myaccount/password"
```

##### Response

Returns an empty HTTP 204 status code response

#### Error Responses

If the password operation isn't enabled in the org, the response returns a 403 FORBIDDEN with error code E0000038.

If the user doesn't currently have a password, the response returns a 404 NOT FOUND with error code E0000007.

## MyAccount API objects

### My Email object

#### My Email properties

| Property           | Type                                                            | Description                                                                                                       |
| ------------------ | --------------------------------------------------------------- | ------------------------------------------------------ |
| `id`               | String                                                            | The caller's email ID|
| `status`           | String                                                            | The caller's email status, VERIFIED, OR UNVERIFIED|
| `roles`            | Object                                                            | The Roles object defines the role of the email, PRIMARY or SECONDARY |
| `profile`          | Object                                                            | The Profile object defines the email address on the profile.|
| `_links`           | Object ([JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06))  | Discoverable resources related to the caller's email |

#### My Email example

```json
{
    "id": "5a8de6071e1b94e0f4ec664b9e4869e8",
    "status": "VERIFIED",
    "profile": {
        "email": "some.primary.email@okta.com"
    },
    "roles": [
        "PRIMARY"
    ],
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/idp/myaccount/emails/5a8de6071e1b94e0f4ec664b9e4869e8",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "challenge": {
            "href": "https://${yourOktaDomain}/idp/myaccount/emails/5a8de6071e1b94e0f4ec664b9e4869e8/challenge",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### My Email Request object

#### My Email Request properties

| Property           | Type                                                            | Description                                                                                                       |
| ------------------ | --------------------------------------------------------------- | ------------------------------------------------------ |
| `profile`          | Object                                                            | The Profile object defines the email address on the profile.|
| `role`            | Object                                                            | The Roles object defines the role of the email, PRIMARY or SECONDARY|
| `sendEmail`        | Boolean                                                           | Send challenge to the newly added email. The default is `true` | `state` | String | (Optional) The state parameter, the state of the client |

#### My Email Request example

```json
{
  "profile": {
      "email" : "some.primary.email@okta.com"
  },
   "role": "PRIMARY",
   "sendEmail": true
}
```

### My Email Challenge object

#### My Email Challenge properties

| Property           | Type                                                            | Description                                                                                                       |
| ------------------ | --------------------------------------------------------------- | ------------------------------------------------------ |
| `id`               | String                                                            | The caller's email ID|
| `status`           | Object                                                            | The caller's email challenge status, VERIFIED, OR UNVERIFIED|
| `expiresAt`        | String (ISO-8601)                                                 | The time this challenge expires. The lifetime of a challenge is five minutes. |
| `profile`          | Object                                                            | The Profile object defines the email address on the profile.|

#### My Email Challenge example

```json
{
    "id": "myaccount.6FLx1qb0Q8KNZSsgS150fA",
    "status": "UNVERIFIED",
    "expiresAt": "2022-03-04T17:19:03.451Z",
    "profile": {
        "email": "some.primary.email@okta.com"
    }
}
```

### My Email Challenge Response object

#### My Email Challenge Response properties

| Property           | Type                                                            | Description                                                                                                       |
| ------------------ | --------------------------------------------------------------- | ------------------------------------------------------ |
| `id`               | String                                                            | The caller's email ID|
| `status`           | Object                                                            | The caller's email challenge status, VERIFIED, OR UNVERIFIED|
| `expiresAt`        | String (ISO-8601)                                                 | The time this challenge expires. The lifetime of a challenge is five minutes.|
| `profile`          | Object                                                            | The Profile object defines the email address on the profile.|
| `_links`           | Object ([JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06))  | Discoverable resources related to the caller's email challenge|

#### My Email Challenge Response example

```json
{
    "id": "myaccount.0Up-umuhQ1adW2EGRAAK1g",
    "status": "UNVERIFIED",
    "expiresAt": "2022-03-04T21:19:43.315Z",
    "profile": {
        "email": "some.primary.email@okta.com"
    },
    "_links": {
        "verify": {
            "href": "https://jay-oie-org1.okta1.com/idp/myaccount/emails/92fc7f9445e413e94e544cc3b30483ce/challenge/myaccount.0Up-umuhQ1adW2EGRAAK1g/verify",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "poll": {
            "href": "https://jay-oie-org1.okta1.com/idp/myaccount/emails/92fc7f9445e413e94e544cc3b30483ce/challenge/myaccount.0Up-umuhQ1adW2EGRAAK1g",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```

### My Phone object

#### My Phone properties

| Property           | Type                                                            | Description                                                                                                       |
| ------------------ | --------------------------------------------------------------- | ------------------------------------------------------ |
| `id`               | String                                                          | The caller's phone ID|
| `status`           | String                                                          | The caller's phone status, VERIFIED, OR UNVERIFIED|
| `profile`          | Object                                                          | The Profile object defines the phone number on the profile.|
| `_links`           | Object                                                          | Discoverable resources related to the caller's phone |

#### My Phone example

```json
{
    "id": "sms1bueyI0w0HHwro0g4",
    "status": "UNVERIFIED",
    "profile": {
        "phoneNumber": "+15555555555"
    },
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/idp/myaccount/phones/sms1bueyI0w0HHwro0g4",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE"
                ]
            }
        },
        "challenge": {
            "href": "https://${yourOktaDomain}/idp/myaccount/phones/sms1bueyI0w0HHwro0g4/challenge",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "verify": {
            "href": "https://${yourOktaDomain}/idp/myaccount/phones/sms1bueyI0w0HHwro0g4/challenge",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### My Phone Request object

#### My Phone Request properties

| Property           | Type                                                            | Description                                                                                                       |
| ------------------ | --------------------------------------------------------------- | ------------------------------------------------------ |
| `profile`          | Object                                                            | The Profile object defines the phone number on the profile.|
| `sendCode`         | Boolean                                                           | Whether to send a challenge to the newly added phone. The default is `true`.|
| `method`           | String                                                            | The method of the challenge sent to the newly added phone, either "SMS" or "CALL". Applicable when `sendCode` is `true`.|
|

#### My Phone Request example

```json
{
  "profile": {
      "phoneNumber" : "+15555555555"
  },
   "sendCode": true,
   "method": "SMS"
}
```

### User Profile Schema object

#### User Profile Schema properties

The User Profile Schema object has several properties:

| Property           | Type                                                                                                              | Description                                                        |
| ------------------ | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `_links`             | Object ([JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06))                                                    | Discoverable resources related to the caller's User Profile Schema |
| `properties`         | Object | The properties defined in the [User Profile Schema](/docs/reference/api/schemas/#user-profile-schema-property-object)                               |

#### User Profile Schema example

```json
{
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/idp/myaccount/profile/schema"
        }
      }
    },
    "properties": {
        "customBoolean": {
            "permissions": {
                "SELF": "READ_WRITE"
            },
            "title": "customBoolean",
            "type": "boolean"
        },
        "foo": {
            "permissions": {
                "SELF": "READ_ONLY"
            },
            "title": "foo",
            "type": "string"
        },
        "login": {
            "maxLength": 100,
            "minLength": 5,
            "permissions": {
                "SELF": "READ_ONLY"
            },
            "required": true,
            "title": "Username",
            "type": "string"
        },
        "mobilePhone": {
            "maxLength": 100,
            "permissions": {
                "SELF": "READ_WRITE"
            },
            "title": "Mobile phone",
            "type": "string"
        },
        "customInteger": {
            "permissions": {
                "SELF": "READ_WRITE"
            },
            "title": "customInteger",
            "type": "integer"
        }
    }
}
```

### User Profile object

#### User Profile properties

The User Profile object has several properties:

| Property   | Type                                                           | Description                                                                                                |
| ---------- | ---------------------------------------------------------------|----------------------------------------------------------------------------------------------------------- |
| `_embedded`  | Object                                   | If `expand`=`schema` is included in the request, the [User Profile Schema](#user-profile-schema-object) is included in the response. |
| `_links`     | Object ([JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)) | Discoverable resources related to the caller's user profile schema                                         |
| `createdAt`  | String (ISO-8601)                                                        | The timestamp the caller's account was created                                                             |
| `modifiedAt` | String (ISO-8601)                                                        | The timestamp the caller's account was last updated                                                        |
| `profile`    | Object                                       | The properties defined in the [User Profile Schema](#user-profile-schema-object)                                                                       |

#### User Profile example

```json
{
    "_links": {
        "describedBy": {
            "href": "https://${yourOktaDomain}/idp/myaccount/profile/schema"
        },
        "self": {
            "href": "https://${yourOktaDomain}/idp/myaccount/profile"
        }
    },
    "createdAt": "2020-01-14T20:05:32.000Z",
    "modifiedAt": "2020-10-13T03:17:09.000Z",
    "profile": {
        "customBoolean": null,
        "foo": "bar",
        "login": "example@ex.ample.com",
        "mobilePhone": null,
        "customInteger": null
    }
}
```

### My Password Object

#### My Password

The My Password object has several properties:

| Property   | Type                                                           | Description                                                                                                |
| ---------- | ---------------------------------------------------------------|----------------------------------------------------------------------------------------------------------- |
| `_links`     | Object ([JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)) | Discoverable resources related to the caller's user's password                                         |
| `createdAt`  | String (ISO-8601)                                                        | The timestamp the caller's password was created                                                             |
| `modifiedAt` | String (ISO-8601)                                                        | The timestamp the caller's password was last updated                                                        |
| `status`    | String                                       | The caller's password status, ACTIVE, EXPIRED, NOT_ENROLLED, OR SUSPENDED                                                                       |

#### My Password example

```json
{
    "id": "00T196qTp3LIMZQ0L0g3",
    "status": "ACTIVE",
    "created": "2020-01-14T20:05:32.000Z"
    "lastUpdated": "2020-01-14T20:05:32.000Z"
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/idp/myaccount/password",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE",
                    "PUT"
                ]
            }
        }
    }
}
```

### My Password Request object

#### My Password Request properties

| Property           | Type                                                            | Description                                                                                                       |
| ------------------ | --------------------------------------------------------------- | ------------------------------------------------------ |
| `profile`          | Object                                                            | The Profile object defines the password on the profile.|

#### My Phone Request example

```json
{
  "profile": {
      "phoneNumber" : "+15555555555"
  }
}
```