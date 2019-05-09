---
title: Inline Hooks
category: management
excerpt: >-
  The Inline Hooks Management API provides a CRUD interface for registering
  inline hook endpoints.
---

# Inline Hooks Management API

<ApiLifecycle access="ea" />

For general information on inline hooks and how to create and use them, see [Inline Hooks](/use_cases/inline_hooks/). The following documentation is only for the management API, which provides a CRUD interface for registering inline hooks.

## Getting Started

Explore the Inline Hooks Management API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/2ae80cd0a5869ca23523)

## Inline Hook Operations

### Create Inline Hook

<ApiOperation method="post" url="/api/v1/inlineHooks" />

Registers a new inline hook to your organization in `ACTIVE` status. You need to pass an [Inline Hook object](#inline-hook-object) in the JSON payload of your request. That object represents the set of required information about the inline hook you are registering, including:

 - The URI of your external service endpoint.
 - The type of inline hook you are registering.

In addition, the object lets you specify a secret API key that you want Okta to pass to your external service endpoint (so that your external service can check for its presence as a security measure).

Note that the API key you set here is unrelated to the Okta API token you must supply when making calls to Okta APIs.

You can also optionally specify extra headers that you wish Okta to pass to your external service with each call.

#### Request Parameters

| Parameter   | Description                                                                                  | Param Type   | DataType                                    | Required |
| ----------- | -------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------- | -------- |
| Inline Hook | A valid Inline Hook object, specifying the details of the inline hook you are registering.   | Body         | [Inline Hook object](#inline-hook-object)   | TRUE     |

#### Response Parameters

The response is an [Inline Hook object](#inline-hook-object) representing the inline hook that was registered. The `id` property returned in the response serves as the unique ID for the registered inline hook, which you can specify when invoking other CRUD operations.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "name" : "My Test Inline Hook",
    "type" : "com.okta.oauth2.tokens.transform",
    "version" : "1.0.0",
    "channel" : {
        "type" : "HTTP",
        "version" : "1.0.0",
        "config" : {
            "uri" : "https://www.example.com/inlineHook",
            "headers" : [
                {
                    "key" : "X-Other-Header",
                    "value" : "some-other-value"
                }
            ],
            "authScheme" : {
                "type" : "HEADER",
                "key" : "Authorization",
                "value" : "${api-key}"
            }
        }
    }
}' "https://{yourOktaDomain}/api/v1/inlineHooks"
```

> Note: `X-Other-Header` is an example of an additional optional header, with its value specified as `some-other-value`. For each optional header, you choose the name and value you wish Okta to pass to your external service.

##### Response Example


```json
{
    "id": "calr0dvWvbMQJHZCM0g3",
    "status": "ACTIVE",
    "name" : "My Test Inline Hook",
    "type" : "com.okta.oauth2.tokens.transform",
    "version" : "1.0.0",
    "channel" : {
        "type" : "HTTP",
        "version" : "1.0.0",
        "config" : {
            "uri" : "https://www.example.com/inlineHook",
            "method" : "POST",
            "headers" : [
                {
                    "key" : "X-Other-Header",
                    "value" : "some-other-value"
                }
            ],
            "authScheme" : {
                "type" : "HEADER",
                "key" : "Authorization",
            }
        }
    },
    "created": "2018-05-15T01:23:08.000Z",
    "lastUpdated": "2018-05-15T01:23:08.000Z"
}
```

> Note: The `channel.authScheme.value` property is not returned in the response. You set it in your request, but it is not exposed in any responses.

### Get Inline Hook

<ApiOperation method="get" url="/api/v1/inlineHooks/${id}" />

#### Request Parameters

| Parameter | Description               | Param Type   | DataType   | Required |
| --------- | ------------------------- | ------------ | ---------- | -------- |
| `id`      | A valid Inline Hook ID.   | Path         | String     | TRUE     |

#### Response Parameters

The response is an [Inline Hook object](#inline-hook-object) representing the registered inline hook that matches the `id` you specified.

##### Request Example


```json
curl -v -X GET \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/inlineHooks/${id}"
```

##### Response Example


```json
{
    "id": "cali2j192cIE9VpHn0h7",
    "status": "ACTIVE",
    "name": "Test Inline Hook",
    "type": "com.okta.oauth2.tokens.transform",
    "version": "1.0.0",
    "channel": {
        "type": "HTTP",
        "version": "1.0.0",
        "config": {
            "uri": "https://www.example.com/inlineHook",
            "headers": [
                {
                    "key": "X-Other-Header",
                    "value": "some-other-value"
                }
            ],
            "method": "POST",
            "authScheme": {
                "type": "HEADER",
                "key": "Authorization",
            }
        }
    },
    "created": "2018-12-05T00:35:20.000Z",
    "lastUpdated": "2018-12-05T00:35:20.000Z"
}
```

### List Inline Hooks

<ApiOperation method="get" url="/api/v1/inlineHooks?type=${type}" />

| Parameter | Description                                                               | Param Type   | DataType   | Required |
| --------- | ------------------------------------------------------------------------- | ------------ | ---------- | -------- |
| `type`    | One of the [supported inline hook types](#supported-inline-hook-types).   | Query        | String     | FALSE    |

Returns a list of registered inline hooks, optionally filtered by inline hook type if you supply a `type` query parameter.

##### Request Example


```json
curl -v -X GET \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/inlineHooks"
```

##### Response Example


```json
[
	{
	    "id": "cali2j192cIE9VpHn0h7",
	    "status": "ACTIVE",
	    "name": "Test Inline Hook",
	    "type": "com.okta.oauth2.tokens.transform",
	    "version": "1.0.0",
	    "channel": {
	        "type": "HTTP",
	        "version": "1.0.0",
	        "config": {
	            "uri": "https://www.example.com/inlineHook",
	            "headers": [
	                {
	                    "key": "X-Other-Header",
	                    "value": "some-other-value"
	                }
	            ],
	            "method": "POST",
	            "authScheme": {
	                "type": "HEADER",
	                "key": "Authorization",
	            }
	        }
	    },
	    "created": "2018-12-05T00:35:20.000Z",
	    "lastUpdated": "2018-12-05T00:35:20.000Z"
	}
]
```

### Update Inline Hook

<ApiOperation method="put" url="/api/v1/inlineHooks/${id}" />

#### Request Parameters

| Parameter  | Description                                                                     | Param Type   | DataType                                    | Required |
| ---------- | ------------------------------------------------------------------------------- | ------------ | ------------------------------------------- | -------- |
| id         | The ID of the inline hook you want to update.                                   | Path         | String                                      | TRUE     |
| inlineHook | An `inlineHook` object representing the updated properties you wish to apply.   | Body         | [Inline Hook Object](#inline-hook-object)   | TRUE     |

The submitted inline hook properties will replace the existing properties after passing validation. Note that some properties are immutable and cannot be updated. Refer to the description of each property in the [Inline Hook object](#inline-hook-object) table for information.

#### Response Parameters

The response is an [Inline Hook object](#inline-hook-object) representing the updated inline hook.

##### Request Example


```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "name" : "My Test Inline Hook",
    "type" : "com.okta.oauth2.tokens.transform",
    "version" : "1.0.0",
    "channel" : {
        "type" : "HTTP",
        "version" : "1.0.0",
        "config" : {
            "uri" : "https://www.example.com/inlineHook",
            "method" : "POST",
            "headers" : [
                {
                    "key" : "X-Other-Header",
                    "value" : "some-other-value"
                }
            ],
            "authScheme" : {
                "type" : "HEADER",
                "key" : "Authorization",
                "value" : "${api-key}"
            }
        }
    }
}' "https://{yourOktaDomain}/api/v1/inlineHooks/${id}"
```

##### Response Example


```json
{
    "id": "calr0dvWvbMQJHZCM0g3",
    "status": "ACTIVE",
    "name" : "My Test Inline Hook",
    "type" : "com.okta.oauth2.tokens.transform",
    "version" : "1.0.0",
    "channel" : {
        "type" : "HTTP",
        "version" : "1.0.0",
        "config" : {
            "uri" : "https://www.example.com/inlineHook",
            "method" : "POST",
            "headers" : [
                {
                    "key" : "X-Other-Header",
                    "value" : "some-other-value"
                }
            ],
            "authScheme" : {
                "type" : "HEADER",
                "key" : "Authorization",
            }
        }
    },
    "created": "2018-05-15T01:23:08.000Z",
    "lastUpdated": "2018-05-15T01:23:08.000Z"
}
```

### Activate Inline Hook

<ApiOperation method="post" url="/api/v1/inlineHooks/${id}/lifecycle/activate" />

#### Request Parameters

| Parameter  | Description                                                                     | Param Type   | DataType                                    | Required |
| ---------- | ------------------------------------------------------------------------------- | ------------ | ------------------------------------------- | -------- |
| id         | The ID of the inline hook you want to activate.                                   | Path         | String                                      | TRUE     |

Activates the inline hook matching the provided `id`.

#### Response Parameters

The response is an [Inline Hook object](#inline-hook-object) representing the activated inline hook.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/inlineHooks/${id}/lifecycle/activate"
```

##### Response Example


```json
{
    "id": "calr0dvWvbMQJHZCM0g3",
    "status": "ACTIVE",
    "name" : "My Test Inline Hook",
    "type" : "com.okta.oauth2.tokens.transform",
    "version" : "1.0.0",
    "channel" : {
        "type" : "HTTP",
        "version" : "1.0.0",
        "config" : {
            "uri" : "https://www.example.com/inlineHook",
            "method" : "POST",
            "headers" : [
                {
                    "key" : "X-Other-Header",
                    "value" : "some-other-value"
                }
            ],
            "authScheme" : {
                "type" : "HEADER",
                "key" : "Authorization",
            }
        }
    },
    "created": "2018-05-15T01:23:08.000Z",
    "lastUpdated": "2018-05-15T01:23:08.000Z"
}
```

### Deactivate Inline Hook

<ApiOperation method="post" url="/api/v1/inlineHooks/${id}/lifecycle/deactivate" />

#### Request Parameters

| Parameter  | Description                                                                     | Param Type   | DataType                                    | Required |
| ---------- | ------------------------------------------------------------------------------- | ------------ | ------------------------------------------- | -------- |
| id         | The ID of the inline hook you want to deactivate.                                   | Path         | String                                      | TRUE     |

Deactivates the inline hook matching the provided `id`.

#### Response Parameters

The response is an [Inline Hook object](#inline-hook-object) representing the deactivated inline hook.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/inlineHooks/${id}/lifecycle/deactivate"
```

##### Response Example


```json
{
    "id": "calr0dvWvbMQJHZCM0g3",
    "status": "INACTIVE",
    "name" : "My Test Inline Hook",
    "type" : "com.okta.oauth2.tokens.transform",
    "version" : "1.0.0",
    "channel" : {
        "type" : "HTTP",
        "version" : "1.0.0",
        "config" : {
            "uri" : "https://www.example.com/inlineHook",
            "method" : "POST",
            "headers" : [
                {
                    "key" : "X-Other-Header",
                    "value" : "some-other-value"
                }
            ],
            "authScheme" : {
                "type" : "HEADER",
                "key" : "Authorization",
            }
        }
    },
    "created": "2018-05-15T01:23:08.000Z",
    "lastUpdated": "2018-05-15T01:23:08.000Z"
}
```

### Delete Inline Hook

<ApiOperation method="delete" url="/api/v1/inlineHooks/${id}" />

#### Request Parameters

| Parameter | Description                            | Param Type   | DataType   | Required |
| --------- | -------------------------------------- | ------------ | ---------- | -------- |
| `id`      | The ID of the inline hook to delete.   | Path         | String     | TRUE     |

Deletes the inline hook matching the provided `id`. Once deleted, the inline hook is unrecoverable. As a safety precaution, only inline hooks with a status of `INACTIVE` are eligible for deletion.

#### Response Parameters

All responses will return a 204 status with no content.

##### Request Example


```json
curl -v -X DELETE \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/inlineHook/${id}"
```

##### Response Example


204 with no content.

### Execute Inline Hook

<ApiOperation method="post" url="/api/v1/inlineHooks/${id}/execute" />

| Parameter                            | Description                                                                         | Param Type   | DataType   | Required |
| ------------------------------------ | ----------------------------------------------------------------------------------- | ------------ | ---------- | -------- |
| id                                   | ID of the inline hook to execute.                                                   | Path         | String     | TRUE     |
| Payload to send to external service. | JSON that matches the data contract of the  `inlineHookType` of this inline hook.   | Body         | JSON       | TRUE     |

Executes the Inline Hook matching the provided `inlineHookId` using the request body as the input. This will send the provided data through the Channel and return a response if it matches the correct data contract. Otherwise it will throw an error. You therefore need to construct a JSON payload that matches the payloads that Okta would send to your external service for this inline hook type.

A timeout of 3 seconds is enforcd on all outbound requests, with one retry in the event of a timeout or an error response from the remote system. If a successful response has not been received after that, a 400 error is returned with more information about what failed.

Note that this execution endpoint is not tied to any other functionality in Okta and should only be used for testing purposes.

#### Response Parameters

Successful responses will return the full response returned by the external service, which should match the data contract for
the given `inlineHookType` and version.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '
{
  "source": "https://{yourOktaDomain}/oauth2/default/v1/authorize",
  "eventId": "3OWo4oo-QQ-rBWfRyTmQYw",
  "eventTime": "2019-01-15T23:20:47.000Z",
  "eventTypeVersion": "1.0",
  "cloudEventVersion": "0.1",
  "contentType": "application/json",
  "eventType": "com.okta.oauth2.tokens.transform",
  "data": {
    "context": {
      "request": {
        "id": "reqv66CbCaCStGEFc8AdfS0ng",
        "method": "GET",
        "url": {
          "value": "https://{yourOktaDomain}/oauth2/default/v1/authorize?scope=openid+profile+email&response_type=token+id_token&redirect_uri=https%3A%2F%2Fhttpbin.org%2Fget&state=foobareere&nonce=asf&client_id=customClientIdNative"
        },
        "ipAddress": "127.0.0.1"
      },
      "protocol": {
        "type": "OAUTH2.0",
        "request": {
          "scope": "openid profile email",
          "state": "foobareere",
          "redirect_uri": "https://httpbin.org/get",
          "response_mode": "fragment",
          "response_type": "token id_token",
          "client_id": "customClientIdNative"
        },
        "issuer": {
          "uri": "https://{yourOktaDomain}/oauth2/default"
        },
        "client": {
          "id": "customClientIdNative",
          "name": "Native client",
          "type": "PUBLIC"
        }
      },
      "session": {
        "id": "102Qoe7t5PcRnSxr8j3I8I6pA",
        "userId": "00uq8tMo3zV0OfJON0g3",
        "login": "administrator1@clouditude.net",
        "createdAt": "2019-01-15T23:17:09.000Z",
        "expiresAt": "2019-01-16T01:20:46.000Z",
        "status": "ACTIVE",
        "lastPasswordVerification": "2019-01-15T23:17:09.000Z",
        "amr": [
          "PASSWORD"
        ],
        "idp": {
          "id": "00oq6kcVwvrDY2YsS0g3",
          "type": "OKTA"
        },
        "mfaActive": false
      },
      "user": {
        "id": "00uq8tMo3zV0OfJON0g3",
        "passwordChanged": "2018-09-11T23:19:12.000Z",
        "profile": {
          "login": "administrator1@clouditude.net",
          "firstName": "Add-Min",
          "lastName": "OCloudy Tud",
          "locale": "en",
          "timeZone": "America/Los_Angeles"
        },
        "_links": {
          "groups": {
            "href": "https://{yourOktaDomain}/00uq8tMo3zV0OfJON0g3/groups"
          },
          "factors": {
            "href": "https://{yourOktaDomain}/api/v1/users/00uq8tMo3zV0OfJON0g3/factors"
          }
        }
      },
      "policy": {
        "id": "00pq8lGaLlI8APuqY0g3",
        "rule": {
          "id": "0prq8mLKuKAmavOvq0g3"
        }
      }
    },
    "identity": {
      "claims": {
        "sub": "00uq8tMo3zV0OfJON0g3",
        "name": "Add-Min OCloudy Tud",
        "email": "webmaster@clouditude.net",
        "ver": 1,
        "iss": "https://{yourOktaDomain}/oauth2/default",
        "aud": "customClientIdNative",
        "jti": "ID.YxF2whJfB3Eu4ktG_7aClqtCgjDq6ab_hgpiV7-ZZn0",
        "amr": [
          "pwd"
        ],
        "idp": "00oq6kcVwvrDY2YsS0g3",
        "nonce": "asf",
        "preferred_username": "administrator1@clouditude.net",
        "auth_time": 1547594229
      },
      "token": {
        "lifetime": {
          "expiration": 3600
        }
      }
    },
    "access": {
      "claims": {
        "ver": 1,
        "jti": "AT.W-rrB-z-kkZQmHW0e6VS3Or--QfEN_YvoWJa46A7HAA",
        "iss": "https://{yourOktaDomain}/oauth2/default",
        "aud": "api://default",
        "cid": "customClientIdNative",
        "uid": "00uq8tMo3zV0OfJON0g3",
        "sub": "administrator1@clouditude.net",
        "firstName": "Add-Min",
        "preferred_username": "administrator1@clouditude.net"
      },
      "token": {
        "lifetime": {
          "expiration": 3600
        }
      },
      "scopes": {
        "openid": {
          "id": "scpq7bW1cp6dcvrz80g3",
          "action": "GRANT"
        },
        "profile": {
          "id": "scpq7cWJ81CIP5Qkr0g3",
          "action": "GRANT"
        },
        "email": {
          "id": "scpq7dxsoz6LQlRj00g3",
          "action": "GRANT"
        }
      }
    }
  }
}
' "https://{yourOktaDomain}/api/v1/inlineHooks/${id}/execute"
```

##### Response Example


```json

{
  "commands": [
    {
      "type": "com.okta.identity.patch",
      "value": [
        {
          "op": "add",
          "path": "/claims/extPatientId",
          "value": "1234"
        }
      ]
    },
    {
      "type": "com.okta.access.patch",
      "value": [
        {
          "op": "add",
          "path": "/claims/external_guid",
          "value": "F0384685-F87D-474B-848D-2058AC5655A7"
        }
      ]
    }
  ]
}
```

### Inline Hook Object

| Property       | Description                                                                                         | DataType                            | Nullable   | Unique   | ReadOnly   | Validation                                        |
| -------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------- | -------- | ---------- | ------------------------------------------------- |
| id             | Unique key for the Inline Hook.                                                                     | String                              | FALSE      | TRUE     | TRUE       | System assigned                                          |
| status         | Status of the Inline Hook. `INACTIVE` will block execution.                                         | String                              | FALSE      | FALSE    | FALSE      | System assigned. Will be either `ACTIVE` or `INACTIVE`.            |
| name           | Display name for the Inline Hook.                                                                   | String                              | FALSE      | TRUE     | FALSE      | Must be between 1 and 255 characters in length.   |
| type           | Type of the Inline Hook. See list of [Supported Inline Hook Types](#supported-inline-hook-types).   | inlineHookType                      | FALSE      | FALSE    | TRUE       | Immutable after Inline Hook creation.             |
| version        | Version of the inline hook type. The currently-supported version is "1.0.0".                                 | String                              | FALSE      | FALSE    | TRUE       | Must match a valid version number.                |
| channel | Properties of the communications channel used to contact your external service.                     | [Channel object](#channel-object)   | FALSE      | FALSE    | FALSE      | Validation is determined by the specific channel. |
| created        | Date of Inline Hook creation.                                                                       | String (Date)                       | TRUE       | FALSE    | TRUE       | System assigned                                          |
| lastUpdated    | Date of Inline Hook update.                                                                         | String (Date)                       | TRUE       | FALSE    | TRUE       | System assigned                                          |


```json
{
    "id": "calr0dvWvbMQJHZCM0g3",
    "status": "ACTIVE",
    "name" : "My Test Inline Hook",
    "type" : "com.okta.oauth2.tokens.transform",
    "version" : "1.0.0",
    "channel" : {
        "type" : "HTTP",
        "version" : "1.0.0",
        "config" : {
            "uri" : "https://127.0.0.1:8080/inlineHook",
            "method" : "POST",
            "headers" : [
                {
                    "key" : "X-Other-Header",
                    "value" : "some-other-value"
                }
            ],
            "authScheme" : {
                "type" : "HEADER",
                "key" : "Authorization",
            }
        }
    },
    "created": "2018-05-15T01:23:08.000Z",
    "lastUpdated": "2018-05-15T01:23:08.000Z"
}
```

### channel Object

| Property       | Description                                                                                         | DataType                            | Nullable   | Unique   | ReadOnly   | Validation                                        |
| -------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------- | -------- | ---------- | ------------------------------------------------- |
| type           | The channel type. Currently the only supported type is `HTTP`.   | channelType                      | FALSE      | FALSE    | TRUE       | Must match a valid channel type.            |
| version        | Version of the channel. The currently-supported version is "1.0.0".                                 | String                              | FALSE      | FALSE    | TRUE       | Must match a valid version number.                |
| config | Properties of the communications channel used to contact your external service.                     | [Channel Config object](#config-object)   | FALSE      | FALSE    | FALSE      | Validation is determined by the specific channel. |


### config Object

| Property   | Description                                                                                                  | DataType                                  | Required   | Unique   | ReadOnly   | Validation                                               |
| ---------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------- | ---------- | -------- | ---------- | -------------------------------------------------------- |
| uri        | External service endpoint to call to execute the inline hook handler.                                        | String                                    | TRUE       | FALSE    | TRUE       | Maximum length 1024 characters. Must begin with https:// |
| headers    | Optional list of key/value pairs for headers that should be sent with the request to the external service.   | JSON Object                               | FALSE      | FALSE    | FALSE      | Some reserved headers, such as `Accept`, are disallowed. |
| authScheme | The authentication scheme to use for this request                                                            | [authScheme object](#authscheme-object)   | FALSE      | FALSE    | FALSE      | Valid `authscheme` object.                               |

### authScheme Object

| Property | Description                                                                    | DataType   | Required   | ReadOnly |
| -------- | ------------------------------------------------------------------------------ | ---------- | ---------- | -------- |
| type     | The authentication scheme type. Currently the only supported type is `HEADER`. | String     | TRUE       | FALSE    |
| key      | The header name for the authorization header.                                  | String     | TRUE       | FALSE    |
| value    | The header value.                                                              | String     | TRUE       | TRUE     |

To use Basic Auth, you would set `type` to `HEADER`, `key` to `Authorization`, and `value` to the Base64-encoded string of "username:password".

### Supported Inline Hook Types

When registering an inline hook, you need to specify what type it is. The following types are currently supported:

| Type Value                         | Name                                                                                    |
|------------------------------------|-----------------------------------------------------------------------------------------|
| `com.okta.oauth2.tokens.transform` | [Token Inline Hook](/use_cases/inline_hooks/token_hook/token_hook)                      |
| `com.okta.import.transform`        | [Import Inline Hook](/use_cases/inline_hooks/import_hook/import_hook)                   |
| `com.okta.saml.tokens.transform`   | [SAML Assertion Inline Hook](/use_cases/inline_hooks/saml_hook/saml_hook)               |
| `com.okta.user.pre-registration`   | [Registration Inline Hook](/use_cases/inline_hooks/registration_hook/registration_hook) |

