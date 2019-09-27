---
title: IdX
---

# IdX API

<ApiLifecycle access="ea" />

The Okta IdX API implements enrollment and authentication steps for end users, using the steps defined by the Identity Engine pipeline.

Background information on using this API is available on this page: [Identity Engine](/docs/concepts/identity-engine/) <!--Page doesn't exist yet; will be a conceptual overview, and talk about  state token, remediation, use of policies, and the steps in the pipeline -->

You are required to supply a `stateHandle` object in each request you make to this API. That object represents a state token. You receive it originally from the Okta Oauth 2.0 `/authorize` endpoint.

The JSON objects returned by this API follow the [Ion Hypermedia Type](https://ionspec.org/) specification.

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

Given a username, checks if the user already exists, and, if so, returns the User ID. The Remediation object returned specifies the next step to take to enroll or authenticate this user.

#### Request Body

| Property      | Type   | Description      |
|---------------|--------|------------------|
| `stateHandle` | String | The state token. |
| `identifier`  | String | The username.    |

#### Request Query Parameters

None

#### Response Body

A [User object](#user-object), if the user exists.

A [Remediation object](#remediation-object).

#### Usage Example

This request attempts to identify the user "joe.smith@example.com":

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

In this response, the user has been identified as existing, so their User ID is returned. The Remediation object provides information on the next step to take, which is to prompt the user to select an authentication factor.

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

Begins the enrollment process for a new user. You typically need to call this endpoint twice: first to get the list of user attributes you need to collect from the end user, and then again to pass the values collected.

### Request Body

| Property      | Type   | Description      |
|---------------|--------|------------------|
| `stateHandle` | String | The state token. |

#### Request Query Parameters

None

#### Usage Example

##### Request

```bash
curl -X POST \
  https://{yourOktaDomain}/idp/idx/enroll \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
	"stateHandle" : "${stateHandle}"
}'
```

##### Response

In this response, the Remediation object provides information on the User Profile attributes that you need to prompt the end user to supply. It also specifies that the next step is to make a request to this same endpoint again, to pass the values.

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
##### Second Request, Supplying User Attribute Values

In this example, user profile attributes are sent:

```bash
curl -X POST \
  https://{yourOktaDomain}/idp/idx/enroll \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
	"stateHandle" : "${stateHandle}",
	"userProfile" : {
		"firstName" : "Joe",
		"lastName" : "Smith",
		"email" : "joe.smith@example.com"
	}
}'
```

<!-- To Do, sections for each of the remaining endpoints:
Enroll, cont'd:
- /credential/enroll (explain that need to select factors, then enroll factors)
- /challenge/answer
Authenticate
- /challenge
- /challenge/answer
Other
- /introspect
- /cancel
- /context
-->

## IdX API Objects

This API uses the following objects:

* [State Handle](#state-handle-object)
* [Step](#step-object)
* [Intent](#intent-object)
* [Remediation](#remediation-object)
* [Context](#context-object)
* [Cancel](#cancel-object)

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

### Remediation Object

This object tells you what you need to do next, supplying the URL of the next endpoint to call, and specifying the objects you need to supply in your request.

| Property       | Type   | Description                                                 |
|----------------|--------|-------------------------------------------------------------|
| `value.href`   | String | The URL of the endpoint you need to use for the next step.  |
| `value.method` | String | The HTTP verb you need to use for the request.              |
| `value.value`  | Array  | An array of objects to supply when making the next request. |
 
### Remediation Object Example

```json
{  
   "type":"array",
   "value":[  
      {  
         "rel":[  
            "create-form"
         ],
         "name":"select-factor",
         "href":"https://{yourOktaDomain}/idp/idx/credential/enroll",
         "method":"POST",
         "accepts":"application/vnd.okta.v1+json",
         "value":[  
            {  
               "name":"factorProfileId",
               "type":"set",
               "options":[  
                  {  
                     "label":"Password",
                     "value":"fpr1lzruD60jsYVOX0g4"
                  }
               ]
            },
            {  
               "name":"stateHandle",
               "required":true,
               "value":"026NzuG-g2p_oyDCJqhfmk_0r2f7PMCVcva-geDZ_R",
               "visible":false,
               "mutable":false
            }
         ]
      }
   ]
}
```
