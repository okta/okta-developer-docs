---
title: Inline Hooks Management
category: management
excerpt:
  The Inline Hooks Management API provides a CRUD interface for registering
  Inline Hook endpoints.
---

# Inline Hooks Management API

For general information on Inline Hooks and how to create and use them, see [Inline Hooks](/docs/concepts/inline-hooks/). The following documentation is only for the management API, which provides a CRUD interface for registering Inline Hooks.

## Get started

Explore the Inline Hooks Management API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/8be0f0b6e03d02c3bb45)

## Inline Hook operations

### Create Inline Hook

<ApiOperation method="post" url="/api/v1/inlineHooks" />

Registers a new Inline Hook to your organization in `ACTIVE` status. You need to pass an [Inline Hook object](#inline-hook-object) in the JSON payload of your request. That object represents the set of required information about the Inline Hook that you are registering, including:

 - The URI of your external service endpoint
 - The type of Inline Hook you are registering

In addition, the object lets you specify a secret API key that you want Okta to pass to your external service endpoint (so that your external service can check for its presence as a security measure).

> **Note:** The API key you set here is unrelated to the Okta API token you must supply when making calls to Okta APIs.

You can also optionally specify extra headers that you want Okta to pass to your external service with each call.

Your external service's endpoint needs to be a valid HTTPS endpoint, and therefore the URI you specify should always begin with `https://`.

The total number of Inline Hooks that you can create in an Okta org is limited to 50, which is a combined total for any combination of Inline Hook types.

##### Request parameters

| Parameter   | Description                                                                                  | Param Type   | DataType                                    | Required |
| ----------- | -------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------- | -------- |
| Inline Hook | A valid Inline Hook object that specifies the details of the Inline Hook that you are registering   | Body         | [Inline Hook object](#inline-hook-object)   | TRUE     |

##### Response parameters

The response is an [Inline Hook object](#inline-hook-object) that represents the Inline Hook that was registered. The `id` property returned in the response serves as the unique ID for the registered Inline Hook, which you can specify when invoking other CRUD operations.

##### Request example


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
}' "https://${yourOktaDomain}/api/v1/inlineHooks"
```

> **Note:** `X-Other-Header` is an example of an additional optional header, with its value specified as `some-other-value`. For each optional header, you choose the name and value that you want Okta to pass to your external service.

##### Response example


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
                "key" : "Authorization"
            }
        }
    },
    "created": "2018-05-15T01:23:08.000Z",
    "lastUpdated": "2018-05-15T01:23:08.000Z"
}
```

> **Note:** The `channel.authScheme.value` property isn't returned in the response. You set it in your request, but it isn't exposed in any responses.

### Get Inline Hook

<ApiOperation method="get" url="/api/v1/inlineHooks/${id}" />

##### Request parameters

| Parameter | Description               | Param Type   | DataType   | Required |
| --------- | ------------------------- | ------------ | ---------- | -------- |
| `id`      | A valid Inline Hook ID   | Path         | String     | TRUE     |

##### Response parameters

The response is an [Inline Hook object](#inline-hook-object) that represents the registered Inline Hook that matches the `id` you specify.

##### Request example


```bash
curl -v -X GET \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/inlineHooks/${id}"
```

##### Response example


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
                "key": "Authorization"
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
| `type`    | One of the [supported Inline Hook types](#supported-inline-hook-types)   | Query        | String     | FALSE    |

Returns a list of registered Inline Hooks that are optionally filtered by the Inline Hook type if you supply a `type` query parameter

##### Request examples


```bash
curl -v -X GET \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/inlineHooks"
```

```bash
curl -v -X GET \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/inlineHooks?type=com.okta.oauth2.tokens.transform"
```

##### Response example


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
	                "key": "Authorization"
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

##### Request parameters

| Parameter  | Description                                                                     | Param Type   | DataType                                    | Required |
| ---------- | ------------------------------------------------------------------------------- | ------------ | ------------------------------------------- | -------- |
| id         | The ID of the Inline Hook that you want to update                                   | Path         | String                                      | TRUE     |
| inlineHook | An `inlineHook` object that represents the updated properties that you want to apply   | Body         | [Inline Hook object](#inline-hook-object)   | TRUE     |

The submitted Inline Hook properties replace the existing properties after passing validation. 

> **Note:** Some properties are immutable and can't be updated. Refer to the description of each property in the [Inline Hook object](#inline-hook-object) table for information.

##### Response parameters

The response is an [Inline Hook object](#inline-hook-object) that represents the updated Inline Hook.

##### Request example


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
}' "https://${yourOktaDomain}/api/v1/inlineHooks/${id}"
```

##### Response example


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
                "key" : "Authorization"
            }
        }
    },
    "created": "2018-05-15T01:23:08.000Z",
    "lastUpdated": "2018-05-15T01:23:08.000Z"
}
```

### Activate Inline Hook

<ApiOperation method="post" url="/api/v1/inlineHooks/${id}/lifecycle/activate" />

##### Request parameters

| Parameter  | Description                                                                     | Param Type   | DataType                                    | Required |
| ---------- | ------------------------------------------------------------------------------- | ------------ | ------------------------------------------- | -------- |
| id         | The ID of the Inline Hook that you want to activate                                   | Path         | String                                      | TRUE     |

Activates the Inline Hook that match the provided `id`

##### Response parameters

The response is an [Inline Hook object](#inline-hook-object) that represents the activated Inline Hook.

##### Request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/inlineHooks/${id}/lifecycle/activate"
```

##### Response example


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
                "key" : "Authorization"
            }
        }
    },
    "created": "2018-05-15T01:23:08.000Z",
    "lastUpdated": "2018-05-15T01:23:08.000Z"
}
```

### Deactivate Inline Hook

<ApiOperation method="post" url="/api/v1/inlineHooks/${id}/lifecycle/deactivate" />

##### Request parameters

| Parameter  | Description                                                                     | Param Type   | DataType                                    | Required |
| ---------- | ------------------------------------------------------------------------------- | ------------ | ------------------------------------------- | -------- |
| id         | The ID of the Inline Hook that you want to deactivate                                   | Path         | String                                      | TRUE     |

Deactivates the Inline Hook that match the provided `id`

##### Response parameters

The response is an [Inline Hook object](#inline-hook-object) that represents the deactivated Inline Hook.

##### Request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/inlineHooks/${id}/lifecycle/deactivate"
```

##### Response example


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
                "key" : "Authorization"
            }
        }
    },
    "created": "2018-05-15T01:23:08.000Z",
    "lastUpdated": "2018-05-15T01:23:08.000Z"
}
```

### Delete Inline Hook

<ApiOperation method="delete" url="/api/v1/inlineHooks/${id}" />

##### Request parameters

| Parameter | Description                            | Param Type   | DataType   | Required |
| --------- | -------------------------------------- | ------------ | ---------- | -------- |
| `id`      | The ID of the Inline Hook to delete   | Path         | String     | TRUE     |

Deletes the Inline Hook that matches the provided `id`. After it is deleted, the Inline Hook is unrecoverable. As a safety precaution, only Inline Hooks with a status of `INACTIVE` are eligible for deletion.

##### Response parameters

All responses return a 204 status with no content.

##### Request example


```bash
curl -v -X DELETE \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/inlineHooks/${id}"
```

##### Response example


204 with no content

### Execute Inline Hook

<ApiOperation method="post" url="/api/v1/inlineHooks/${id}/execute" />

| Parameter                            | Description                                                                         | Param Type   | DataType   | Required |
| ------------------------------------ | ----------------------------------------------------------------------------------- | ------------ | ---------- | -------- |
| id                                   | ID of the Inline Hook to execute                                                   | Path         | String     | TRUE     |
| Payload to send to external service | JSON that matches the data contract of the `inlineHookType` of this Inline Hook   | Body         | JSON       | TRUE     |

Executes the Inline Hook that matches the provided `inlineHookId` by using the request body as the input. This Inline Hook sends the provided data through the Channel and returns a response if it matches the correct data contract. Otherwise it returns an error. Therefore, you need to construct a JSON payload that matches the payloads that Okta would send to your external service for this Inline Hook type.

A timeout of three seconds is enforced on all outbound requests, with one retry in the event of a timeout or an error response from the remote system. If a successful response isn't received after the request, a 400 error is returned with more information about what failed.

> **Note:** This execution endpoint isn't tied to any other functionality in Okta, and you should only use it for testing purposes.

##### Response parameters

Successful responses return the full response that is returned by the external service, which should match the data contract for the given `inlineHookType` and version.

##### Request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '
{
  "source": "https://${yourOktaDomain}/oauth2/default/v1/authorize",
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
          "value": "https://${yourOktaDomain}/oauth2/default/v1/authorize?scope=openid+profile+email&response_type=token+id_token&redirect_uri=https%3A%2F%2Fhttpbin.org%2Fget&state=foobareere&nonce=asf&client_id=customClientIdNative"
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
          "uri": "https://${yourOktaDomain}/oauth2/default"
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
            "href": "https://${yourOktaDomain}/00uq8tMo3zV0OfJON0g3/groups"
          },
          "factors": {
            "href": "https://${yourOktaDomain}/api/v1/users/00uq8tMo3zV0OfJON0g3/factors"
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
        "email": "administrator1@clouditude.net",
        "ver": 1,
        "iss": "https://${yourOktaDomain}/oauth2/default",
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
        "iss": "https://${yourOktaDomain}/oauth2/default",
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
' "https://${yourOktaDomain}/api/v1/inlineHooks/${id}/execute"
```

##### Response example


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

### Inline Hook object

| Property       | Description                                                                                         | DataType                            | Nullable   | Unique   | ReadOnly   | Validation                                        |
| -------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------- | -------- | ---------- | ------------------------------------------------- |
| id             | Unique key for the Inline Hook                                                                     | String                              | FALSE      | TRUE     | TRUE       | System assigned                                          |
| status         | Status of the Inline Hook. `INACTIVE` will block execution.                                         | String                              | FALSE      | FALSE    | FALSE      | System assigned. Will be either `ACTIVE` or `INACTIVE`.            |
| name           | Display name for the Inline Hook                                                                   | String                              | FALSE      | TRUE     | FALSE      | Must be between 1 and 255 characters in length   |
| type           | Type of the Inline Hook. See list of [Supported Inline Hook Types](#supported-inline-hook-types).   | inlineHookType                      | FALSE      | FALSE    | TRUE       | Immutable after Inline Hook creation             |
| version        | Version of the Inline Hook type. The currently supported version is "1.0.0".                                 | String                              | FALSE      | FALSE    | TRUE       | Must match a valid version number                |
| channel | Properties of the communications channel that are used to contact your external service                     | [Channel object](#channel-object)   | FALSE      | FALSE    | FALSE      | Validation is determined by the specific channel. |
| created        | Date of Inline Hook creation                                                                       | String (Date)                       | TRUE       | FALSE    | TRUE       | System assigned                                          |
| lastUpdated    | Date of Inline Hook update                                                                         | String (Date)                       | TRUE       | FALSE    | TRUE       | System assigned                                          |


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
                "key" : "Authorization"
            }
        }
    },
    "created": "2018-05-15T01:23:08.000Z",
    "lastUpdated": "2018-05-15T01:23:08.000Z"
}
```

### Channel object

| Property | Description                                                                     | DataType                                | Nullable | Unique | Validation                                        |
|----------|---------------------------------------------------------------------------------|-----------------------------------------|----------|--------|---------------------------------------------------|
| type     | The channel type. Currently the only supported type is `HTTP`.                  | channelType                             | FALSE    | FALSE  | TRUE|Must match a valid channel type.             |
| version  | Version of the channel. The currently supported version is "1.0.0".             | String                                  | FALSE    | FALSE  | Must match a valid version number                |
| config   | Properties of the communications channel that are used to contact your external service. | [Channel Config object](#config-object) | FALSE    | FALSE  | Validation is determined by the specific channel. |


### Config object

| Property   | Description                                                                                                | DataType                                | Required | Unique | ReadOnly | Validation                                                                                                             |
|------------|------------------------------------------------------------------------------------------------------------|-----------------------------------------|----------|--------|----------|------------------------------------------------------------------------------------------------------------------------|
| uri        | External service endpoint to call to execute the Inline Hook handler                                      | String                                  | TRUE     | FALSE  | TRUE     | Must begin with `https://`. Maximum length 1024 characters. No white space allowed. The URI must be reachable by Okta. |
| headers    | An optional list of key/value pairs for headers that you should send with the request to the external service | JSON object                             | FALSE    | FALSE  | FALSE    | Some reserved headers, such as `Accept`, are disallowed.                                                               |
| authScheme | The authentication scheme to use for this request                                                          | [AuthScheme object](#authscheme-object) | FALSE    | FALSE  | FALSE    | Valid `authscheme` object|                                                                                            |

### AuthScheme object

| Property | Description                                                                    | DataType   | Required   | ReadOnly |
| -------- | ------------------------------------------------------------------------------ | ---------- | ---------- | -------- |
| type     | The authentication scheme type. Currently the only supported type is `HEADER`. | String     | TRUE       | FALSE    |
| key      | The header name for the authorization header                                  | String     | TRUE       | FALSE    |
| value    | The header value. This secret value is passed to your external service endpoint. Your external service can check for it as a security measure.                                                               | String     | TRUE       | TRUE     |

To use Basic Auth, set `type` to `HEADER`, `key` to `Authorization`, and `value` to the Base64-encoded string of "username:password". Ensure that you include the scheme (including the space) as part of the `value` parameter. For example, `Basic YWRtaW46c3VwZXJzZWNyZXQ=`. See [HTTP Basic Authentication](/books/api-security/authn/api-authentication-options/#http-basic-authentication).

### Supported Inline Hook types

When registering an Inline Hook, you need to specify what type it is. The following types are currently supported:

| Type Value                         | Name                                                           |
|------------------------------------|----------------------------------------------------------------|
| `com.okta.oauth2.tokens.transform` | [Token Inline Hook](/docs/reference/token-hook/)               |
| `com.okta.import.transform`        | [User Import Inline Hook](/docs/reference/import-hook/)        |
| `com.okta.saml.tokens.transform`   | [SAML Assertion Inline Hook](/docs/reference/saml-hook/)       |
| `com.okta.user.pre-registration`   | [Registration Inline Hook](/docs/reference/registration-hook/) |
| `com.okta.user.credential.password.import` | [Password Import Inline Hook](/docs/reference/password-hook/)         |
