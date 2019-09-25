---
title: IdX
category: management
---

# IdX API


## Getting Started

Need to create postman collection, minus internal test environment provisioning library?


## IdX API Operations




### Introspect

#### Request Parameters


#### Response Parameters

#### Request Example

```bash
curl --X POST \
"https://{yourOktaDomain}/idp/idx/introspect" \
--H "Content-Type: application/json" \
--d "stateHandle : {stateHandle}"
```


#### Response Example

```json
{
    "stateHandle": "02YPzYGCoh2jl3JscO3oEaWfcZShVYL7NkOnMbFRXS",
    "version": "1.0.0",
    "expiresAt": "2019-09-25T17:18:52.000Z",
    "step": "IDENTIFY",
    "intent": "LOGIN",
    "remediation": {
        "type": "array",
        "value": [
            {
                "rel": [
                    "create-form"
                ],
                "name": "identify",
                "href": "http://idx.okta1.com:1802/idp/idx/identify",
                "method": "POST",
                "accepts": "application/vnd.okta.v1+json",
                "value": [
                    {
                        "name": "identifier",
                        "label": "Username"
                    },
                    {
                        "name": "stateHandle",
                        "required": true,
                        "value": "02YPzYGCoh2jl3JscO3oEaWfcZShVYL7NkOnMbFRXS",
                        "visible": false,
                        "mutable": false
                    }
                ]
            },
            {
                "rel": [
                    "create-form"
                ],
                "name": "select-enroll-profile",
                "href": "http://idx.okta1.com:1802/idp/idx/enroll",
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
        ]
    },
    "cancel": {
        "rel": [
            "create-form"
        ],
        "name": "cancel",
        "href": "http://idx.okta1.com:1802/idp/idx/cancel",
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
        "href": "http://idx.okta1.com:1802/idp/idx/context",
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

### Identify



## IdX API Objects

stateHandle

step
	IDENTIFY
	AUTHENTICATE
	ENROLL
	RECOVER
	GRANT

intent
	ENROLL_NEW_USER
	LOGIN
	SESSION_STEP_UP
	CREDENTIAL_ENROLLMENT
	CREDENTIAL_RECOVERY




### Remediation Object

### Remediation Object Example

```json
"remediation": {
        "type": "array",
        "value": [
            {
                "rel": [
                    "create-form"
                ],
                "name": "identify",
                "href": "http://idx.okta1.com:1802/idp/idx/identify",
                "method": "POST",
                "accepts": "application/vnd.okta.v1+json",
                "value": [
                    {
                        "name": "identifier",
                        "label": "Username"
                    },
                    {
                        "name": "stateHandle",
                        "required": true,
                        "value": "02YPzYGCoh2jl3JscO3oEaWfcZShVYL7NkOnMbFRXS",
                        "visible": false,
                        "mutable": false
                    }
                ]
            },
            {
                "rel": [
                    "create-form"
                ],
                "name": "select-enroll-profile",
                "href": "http://idx.okta1.com:1802/idp/idx/enroll",
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
        ]
    }
```


context

cancel



