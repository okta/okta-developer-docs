---
title: IdX
---

# IdX API

<ApiLifecycle access="ea" />

The Okta IdX API provides performs end user enrollment and authentication using the pipeline implemented by the Identity Engine.

## Getting Started

Explore the IdX API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/x) <!--Put in real link to Postman collection when available-->

## IdX API Operations

The IdX API provides the following operations:

[Identify a User](#identify-a-user)
[Enroll a User](#)
[Authenticate a User](#)
[Introspect a state token](#)
[Cancel a state token](#)
[Get app context](#)

### Identify a User

<ApiOperation method="post" url="/api/v1//idp/idx/identify" />

Given a username, checks if the user exists already.

#### Request Path Parameters

| Parameter     | Type   | Description      |
|---------------|--------|------------------|
| `stateHandle` | String | The state token. |
| `identifier`  | String | The username.    |

#### Request Query Parameters

None

#### Response Body

A [User object](#user-object), if the user exists.

A [Remediation object](#remediation-object).

#### Usage Example

This request checks if the user "joe.smith@example.com" already exists:

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
	"stateHandle" : "${stateHandle}",
	"identifier" : "joe.smith@example.com"
"https://{yourOktaDomain}/idp/idx/identify"
```
##### Response

In this response, the user has been identifies as an existing user, and their User ID is returned. The remediation object provides information on the next step to take, which is to have the user select a factor to use to authenticate.

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
                "href": "{yourOktaDomain}/idp/idx/challenge",
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
        "href": "{yourOktaDomain}/idp/idx/cancel",
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
        "href": "{yourOktaDomain}/idp/idx/context",
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

