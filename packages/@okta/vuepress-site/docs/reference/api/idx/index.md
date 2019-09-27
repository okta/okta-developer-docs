---
title: IdX
---

# IdX API

<ApiLifecycle access="ea" />

The Okta IdX API provides performs end user enrollment and authentication using the pipeline implemented by the Identity Engine.

Background information on using this API is available on this page: [Identity Engine](/docs/concepts/identity-engine/) <!--Page doesn't exist yet; will be conceptual overview and describe state token, remediation, use of policies -->

## Getting Started

Explore the IdX API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/x) <!--Put in real link to Postman collection when available-->

## IdX API Operations

The IdX API provides the following operations:

 * [Identify User](#identify-a-user)
 * [Enroll User](#enroll-a-user)
 * [Authenticate User](#authenticate-a-user)
 * [Introspect State Token](#introspect-a-state-token)
 * [Cancel State Token](#cancel-a-state-token)
 * [Get Context](#get-context)

### Identify User

<ApiOperation method="post" url="/idp/idx/identify" />

Given a username, checks if the user already exists, and, if so, returns their User ID.

#### Request Path Parameters

| Parameter     | Type   | Description                                                                |
|---------------|--------|----------------------------------------------------------------------------|
| `stateHandle` | String | The state token.                                                           |
| `identifier`  | String | The username. If user is unknown, this can be an empty string, i.e., `""`. |

#### Request Query Parameters

None

#### Response Body

A [User object](#user-object), if the user exists.

A [Remediation object](#remediation-object).

#### Usage Example

This request checks if the user "joe.smith@example.com" already exists:

##### Request

```bash
curl -X POST \
  https://{yourOktaDomain}/idp/idx/identify \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
	"stateHandle" : "${stateHandle}",
	"identifier" : "joe.smith@example.com"
}'
```
##### Response

In this response, the user has been identified as an existing user, so their User ID is returned. The Remediation object provides information on the next step to take, which is to have the user select a factor to use to authenticate themselves.

```json
{
    "stateHandle": "02YPzYGCoh2jl3JscO3oEaWfcZShVYL7NkOnMbFRXS",
    "version": "1.0.0",
    "expiresAt": "2019-09-25T17:22:28.000Z",
    "step": "AUTHENTICATE",
    "intent": "LOGIN",
    "remediation": {
        "type": "array",
        "value": [
            {
                "rel": [
                    "create-form"
                ],
                "name": "select-factor",
                "href": "https://{yourOktaDomain}/idp/idx/challenge",
                "method": "POST",
                "accepts": "application/vnd.okta.v1+json",
                "value": [
                    {
                        "name": "factorId",
                        "type": "set",
                        "options": [
                            {
                                "label": "default",
                                "value": "00u1cb85NSRYsqo470g4"
                            }
                        ]
                    },
                    {
                        "name": "stateHandle",
                        "required": true,
                        "value": "02YPzYGCoh2jl3JscO3oEaWfcZShVYL7NkOnMbFRXS",
                        "visible": false,
                        "mutable": false
                    }
                ]
            }
        ]
    },
    "user": {
        "type": "object",
        "value": {
            "id": "00u1cb85NSRYsqo470g4"
        }
    },
    "cancel": {
        "rel": [
            "create-form"
        ],
        "name": "cancel",
        "href": "https://{yourOktaDomain}/idp/idx/cancel",
        "method": "POST",
        "accepts": "application/vnd.okta.v1+json",
        "value": [
            {
                "name": "stateHandle",
                "required": true,
                "value": "02YPzYGCoh2jl3JscO3oEaWfcZShVYL7NkOnMbFRXS",
                "visible": false,
                "mutable": false
            }
        ]
    },
    "context": {
        "rel": [
            "create-form"
        ],
        "name": "context",
        "href": "https://{yourOktaDomain}/idp/idx/context",
        "method": "POST",
        "accepts": "application/vnd.okta.v1+json",
        "value": [
            {
                "name": "stateHandle",
                "required": true,
                "value": "02YPzYGCoh2jl3JscO3oEaWfcZShVYL7NkOnMbFRXS",
                "visible": false,
                "mutable": false
            }
        ]
    }
}
```

### Enroll User

<ApiOperation method="post" url="/idp/idx/enroll" />

Begins the enrollment process for a new user.

### Request Path Parameters

| Parameter     | Type   | Description                                                                |
|---------------|--------|----------------------------------------------------------------------------|
| `stateHandle` | String | The state token.                                                           |

#### Usage Example

##### Request

```bash
curl -X POST \
  https://{yourOktaDomain}/idp/idx/enroll \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
	"stateHandle" : "${stateHandle}}"
}'
```

##### Response

In this response, the Remediation object provides information on the User Profile attributes that the end user needs to be prompted to supply, so that enrollment can proceed. It also specifies that the next step is to make a request to this same endpoint again, which is how you pass to Okta the values supplied by the end user.

```json
{
    "stateHandle": "026NzuG-g2p_oyDCJqhfmk_0r2f7PMCVcva-geDZ_R",
    "version": "1.0.0",
    "expiresAt": "2019-09-26T18:24:59.000Z",
    "step": "ENROLL",
    "intent": "LOGIN",
    "remediation": {
        "type": "array",
        "value": [
            {
                "rel": [
                    "create-form"
                ],
                "name": "enroll-profile",
                "href": "https://{yourOktaDomain}/idp/idx/enroll",
                "method": "POST",
                "accepts": "application/vnd.okta.v1+json",
                "value": [
                    {
                        "name": "userProfile",
                        "form": {
                            "value": [
                                {
                                    "name": "lastName",
                                    "label": "Last name",
                                    "required": true
                                },
                                {
                                    "name": "firstName",
                                    "label": "First name",
                                    "required": true
                                },
                                {
                                    "name": "email",
                                    "label": "Email",
                                    "required": true,
                                    "value": "user6@idx.com"
                                }
                            ]
                        }
                    },
                    {
                        "name": "stateHandle",
                        "required": true,
                        "value": "026NzuG-g2p_oyDCJqhfmk_0r2f7PMCVcva-geDZ_R",
                        "visible": false,
                        "mutable": false
                    }
                ]
            },
            {
                "rel": [
                    "create-form"
                ],
                "name": "select-identify",
                "href": "https://{yourOktaDomain}/idp/idx/identify",
                "method": "POST",
                "accepts": "application/vnd.okta.v1+json",
                "value": [
                    {
                        "name": "stateHandle",
                        "required": true,
                        "value": "026NzuG-g2p_oyDCJqhfmk_0r2f7PMCVcva-geDZ_R",
                        "visible": false,
                        "mutable": false
                    }
                ]
            }
        ]
    },
    "user": {
        "type": "object",
        "value": {}
    },
    "cancel": {
        "rel": [
            "create-form"
        ],
        "name": "cancel",
        "href": "https://{yourOktaDomain}/idp/idx/cancel",
        "method": "POST",
        "accepts": "application/vnd.okta.v1+json",
        "value": [
            {
                "name": "stateHandle",
                "required": true,
                "value": "026NzuG-g2p_oyDCJqhfmk_0r2f7PMCVcva-geDZ_R",
                "visible": false,
                "mutable": false
            }
        ]
    },
    "context": {
        "rel": [
            "create-form"
        ],
        "name": "context",
        "href": "https://{yourOktaDomain}/idp/idx/context",
        "method": "POST",
        "accepts": "application/vnd.okta.v1+json",
        "value": [
            {
                "name": "stateHandle",
                "required": true,
                "value": "026NzuG-g2p_oyDCJqhfmk_0r2f7PMCVcva-geDZ_R",
                "visible": false,
                "mutable": false
            }
        ]
    }
}
```

### Enroll User

<ApiOperation method="post" url="/idp/idx/enroll" />

Begins the enrollment process for a new user.

## IdX API Objects

This API uses the following objects:

* [stateHandle](#state-handle-object)
* [step](#step-object)
* [intent](#intent-object)
* [remediation](#remediation-object)
* [context](#context-object)
* [cancel](#cancel-object)

### State Handle Object

The state handle is unique ID that serves as a state token during the end user's progress through the pipeline.

| Property      | Type   | Description                    |
|---------------|--------|--------------------------------|
| `stateHandle` | String | Unique identifier. (Read-only) |

### State Handle Example

```json
{
    "stateHandle": "02YPzYGCoh2jl3JscO3oEaWfcZShVYL7NkOnMbFRXS"
}
```

