---
title: Event Hooks
category: management
excerpt: >-
  The Event Hooks Management API provides a CRUD interface for registering 
  event hook endpoints.
---

# Event Hooks Management API 

<ApiLifecycle access="ea" />

For general information on event hooks and how to create and use them, see [Event Hooks](/use_cases/event_hooks/). The following documentation is only for the management API, which provides a CRUD interface for registering event hooks.

## Getting Started

Explore the Event Hooks API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/b02d234a2af183981254)

## Event Hook Operations

### Create Event Hook

<ApiOperation method="post" url="/api/v1/eventHooks" />

Registers a new event hook to your organization in `ACTIVE` status. You need to pass an [Event Hook object](#event-hook-object) in the JSON payload of your request. That object represents the set of required information about the event hook you are registering, including:

 - The URI of your external service endpoint.
 - The [events](#supported-events-for-subscription) in Okta you wish to subscribe to.
 
In addition, the object lets you specify a secret API key that you want Okta to pass to your external service endpoint (so that your external service can check for its presence as a security measure).

Note that the API key you set here is unrelated to the Okta API token you must supply when making calls to Okta APIs.

You can also optionally specify extra headers that you wish Okta to pass to your external service with each call.

#### Request Parameters

| Parameter   | Description                                                                                | Param Type | DataType                                  | Required |
|-------------|--------------------------------------------------------------------------------------------|------------|-------------------------------------------|----------|
| Event Hook | A valid Event Hook object, specifying the details of the event hook you are registering. | Body       | [Event Hook object](#event-hook-object) | TRUE     |

#### Response Parameters

The response is an [Event Hook object](#event-hook-object) representing the event hook that was registered. The `id` property returned in the response serves as the unique ID for the registered event hook, which you can specify when invoking other CRUD operations.

##### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "name" : "My Test Event Hook",
    "events" : {
        "type" : "EVENT_TYPE",
        "items" : [
            "user.lifecycle.create",
            "user.lifecycle.activate"
        ]
    },
    "channel" : {
        "type" : "HTTP",
        "version" : "1.0.0",
        "config" : {
            "uri" : "https://www.example.com/eventHooks",
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
}' "https://{yourOktaDomain}/api/v1/eventHooks"
```

> Note: `X-Other-Header` is an example of an additional optional header, with its value specified as `some-other-value`. For each optional header, you choose the name and value you wish Okta to pass to your external service.

##### Response Example

```json
{
    "id": "whor0dvWvbMQJHZCM0g3",
    "name" : "My Test Event Hook",
    "status": "ACTIVE",
    "verificationStatus": "UNVERIFIED",
    "events" : {
        "type" : "EVENT_TYPE",
        "items" : [
            "user.lifecycle.create",
            "user.lifecycle.activate"
        ]
    },
    "channel" : {
        "type" : "HTTP",
        "version" : "1.0.0",
        "config" : {
            "uri" : "https://www.example.com/eventHooks",
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

> Note: The `channel.authScheme.value` property is not returned in the response. You set it in your request, but it is not exposed in any responses. 

### Get Event Hook

<ApiOperation method="get" url="/api/v1/eventHooks/${id}" />

#### Request Parameters

| Parameter | Description             | Param Type | DataType | Required |
|-----------|-------------------------|------------|----------|----------|
| `id`      | A valid Event Hook ID. | Path       | String   | TRUE     |

#### Response Parameters

The response is an [Event Hook object](#event-hook-object) representing the registered event hook that matches the `id` you specified.

##### Request Example

```json
curl -v -X GET \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/eventHooks/${id}"
```

##### Response Example

```json
{
    "id": "whor0dvWvbMQJHZCM0g3",
    "name" : "My Test Event Hook",
    "status": "ACTIVE",
    "verificationStatus": "UNVERIFIED",
    "events" : {
        "type" : "EVENT_TYPE",
        "items" : [
            "user.lifecycle.create",
            "user.lifecycle.activate"
        ]
    },
    "channel" : {
        "type" : "HTTP",
        "version" : "1.0.0",
        "config" : {
            "uri" : "https://www.example.com/eventHooks",
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

### List Event Hooks

<ApiOperation method="get" url="/api/v1/eventHooks" />

Returns a list of registered event hooks.

##### Request Example

```json
curl -v -X GET \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/eventHooks"
```

##### Response Example

```json
[
  {
    "id": "whor0dvWvbMQJHZCM0g3",
    "name" : "My Test Event Hook",
    "status": "ACTIVE",
    "verificationStatus": "UNVERIFIED",
    "events" : {
        "type" : "EVENT_TYPE",
        "items" : [
            "user.lifecycle.create",
            "user.lifecycle.activate"
        ]
    },
    "channel" : {
        "type" : "HTTP",
        "version" : "1.0.0",
        "config" : {
            "uri" : "https://www.example.com/eventHooks",
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
]
```

### Update Event Hook

<ApiOperation method="put" url="/api/v1/eventHooks/${id}" />

#### Request Parameters

| Parameter  | Description                                                                   | Param Type | DataType                                  | Required |
|------------|-------------------------------------------------------------------------------|------------|-------------------------------------------|----------|
| id         | The ID of the event hook you want to update.                                 | Path       | String                                    | TRUE     |
| eventHook | An `eventHook` object representing the updated properties you wish to apply. | Body       | [Event Hook Object](#event-hook-object) | TRUE     |

The submitted event hook properties will replace the existing properties after passing validation. Note that some properties are immutable and cannot be updated. Refer to the description of each property in the [Event Hook object](#event-hook-object) table for information.

#### Response Parameters

The response is an [Event Hook object](#event-hook-object) representing the updated event hook.

##### Request Example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "name" : "My Test Event Hook Updated",
    "events" : {
        "type" : "EVENT_TYPE",
        "items" : [
            "user.lifecycle.create",
            "user.lifecycle.activate",
            "user.lifecycle.deactivate"
        ]
    },
    "channel" : {
        "type" : "HTTP",
        "version" : "1.0.0",
        "config" : {
            "uri" : "https://www.example.com/eventHooks",
            "headers" : [
                {
                    "key" : "X-Other-Header",
                    "value" : "some-other-value-updated"
                }
            ],
            "authScheme" : {
                "type" : "HEADER",
                "key" : "Authorization",
                "value" : "${api-key-updated}"
            }
        }
    }
}' "https://{yourOktaDomain}/api/v1/eventHooks/${id}"
```

##### Response Example

```json
{
    "id": "whor0dvWvbMQJHZCM0g3",
    "name" : "My Test Event Hook Updated",
    "status": "ACTIVE",
    "verificationStatus": "UNVERIFIED",
    "events" : {
        "type" : "EVENT_TYPE",
        "items" : [
            "user.lifecycle.create",
            "user.lifecycle.activate",
            "user.lifecycle.deactivate"
        ]
    },
    "channel" : {
        "type" : "HTTP",
        "version" : "1.0.0",
        "config" : {
            "uri" : "https://www.example.com/eventHooks",
            "method" : "POST",
            "headers" : [
                {
                    "key" : "X-Other-Header",
                    "value" : "some-other-value-updated"
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
> Note: Updating the `channel` property will require you to verify an event hook again. 

### Verify Event Hook

<ApiOperation method="post" url="/api/v1/eventHooks/${id}/lifecycle/verify" />

| Parameter                            | Description                                                                       | Param Type | DataType | Required |
|--------------------------------------|-----------------------------------------------------------------------------------|------------|----------|----------|
| id                                   | ID of the event hook to verify.                                                 | Path       | String   | TRUE     |

Verifies the Event Hook matching the provided `eventHookId`.
Your endpoint needs to be able to correctly send back information to Okta in JSON format, so that endpoint ownership can be verified. See [Event Hooks](/use_cases/event_hooks/) documentation for details.

Only `ACTIVE` and `VERIFIED` event hooks can receive events from Okta.

A timeout of 3 seconds is enforcd on all outbound requests, with one retry in the event of a timeout or an error response from the remote system. If a successful response has not been received after that, a 400 error is returned with more information about what failed.


##### Request Example

```bash
curl -v -X POST \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/eventHooks/${id}/lifecycle/verify"
```

##### Response Example

```json
{
    "id": "whor0dvWvbMQJHZCM0g3",
    "name" : "My Test Event Hook",
    "status": "ACTIVE",
    "verificationStatus": "VERIFIED",
    "events" : {
        "type" : "EVENT_TYPE",
        "items" : [
            "user.lifecycle.create",
            "user.lifecycle.activate"
        ]
    },
    "channel" : {
        "type" : "HTTP",
        "version" : "1.0.0",
        "config" : {
            "uri" : "https://www.example.com/eventHooks",
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

### Activate Event Hook

<ApiOperation method="post" url="/api/v1/eventHooks/${id}/lifecycle/activate" />

#### Request Parameters

| Parameter | Description                          | Param Type | DataType | Required |
|-----------|--------------------------------------|------------|----------|----------|
| `id`      | The ID of the event hook to activate.| Path       | String   | TRUE     |

Activates the event hook matching the provided `id`.

#### Response Parameters

The response is an [Event Hook object](#event-hook-object) representing the activated event hook.

##### Request Example

```json
curl -v -X POST \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/eventHook/${id}/lifecycle/activate"
```

##### Response Example

```json
{
    "id": "whor0dvWvbMQJHZCM0g3",
    "name" : "My Test Event Hook",
    "status": "ACTIVE",
    "verificationStatus": "VERIFIED",
    "events" : {
        "type" : "EVENT_TYPE",
        "items" : [
            "user.lifecycle.create",
            "user.lifecycle.activate"
        ]
    },
    "channel" : {
        "type" : "HTTP",
        "version" : "1.0.0",
        "config" : {
            "uri" : "https://www.example.com/eventHooks",
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

### Deactivate Event Hook

<ApiOperation method="post" url="/api/v1/eventHooks/${id}/lifecycle/deactivate" />

#### Request Parameters

| Parameter | Description                          | Param Type | DataType | Required |
|-----------|--------------------------------------|------------|----------|----------|
| `id`      | The ID of the event hook to deactivate.| Path       | String   | TRUE     |

Deactivates the event hook matching the provided `id`.

#### Response Parameters

The response is an [Event Hook object](#event-hook-object) representing the deactivated event hook.

##### Request Example

```json
curl -v -X POST \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/eventHook/${id}/lifecycle/deactivate"
```

##### Response Example

```json
{
    "id": "whor0dvWvbMQJHZCM0g3",
    "name" : "My Test Event Hook",
    "status": "INACTIVE",
    "verificationStatus": "VERIFIED",
    "events" : {
        "type" : "EVENT_TYPE",
        "items" : [
            "user.lifecycle.create",
            "user.lifecycle.activate"
        ]
    },
    "channel" : {
        "type" : "HTTP",
        "version" : "1.0.0",
        "config" : {
            "uri" : "https://www.example.com/eventHooks",
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

### Delete Event Hook

<ApiOperation method="delete" url="/api/v1/eventHooks/${id}" />

#### Request Parameters

| Parameter | Description                          | Param Type | DataType | Required |
|-----------|--------------------------------------|------------|----------|----------|
| `id`      | The ID of the event hook to delete. | Path       | String   | TRUE     |

Deletes the event hook matching the provided `id`. Once deleted, the event hook is unrecoverable. As a safety precaution, only event hooks with a status of `INACTIVE` are eligible for deletion.

#### Response Parameters

All responses will return a 204 status with no content.

##### Request Example

```json
curl -v -X DELETE \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/eventHook/${id}"
```

##### Response Example

204 with no content.

### Event Hook Object

| Property       | Description                                                                                       | DataType                          | Nullable | Unique | ReadOnly | Validation                                        |
|----------------|---------------------------------------------------------------------------------------------------|-----------------------------------|----------|--------|----------|---------------------------------------------------|
| id             | Unique key for the Event Hook.                                                                   | String                            | FALSE    | TRUE   | TRUE     | System assigned                                          |
| status         | Status of the Event Hook. `INACTIVE` will not receive any events.                                       | String                            | FALSE    | FALSE  | FALSE    | System assigned. Will be either `ACTIVE` or `INACTIVE`.            |
| verificationStatus         | Verification status of the Event Hook. `UNVERIFIED` will not receive any events.                                       | String                            | FALSE    | FALSE  | FALSE    | System assigned. Will be either `VERIFIED` or `UNVERIFIED`.            |
| name           | Display name for the Event Hook.                                                                 | String                            | FALSE    | TRUE   | FALSE    | Must be between 1 and 255 characters in length.   |
| events           | Events subscribed by this hook.                                                                 | [Events object](#events-object)                            | FALSE    | TRUE   | FALSE    | Validation is determined by the specific event object type.   |
| channel object | Properties of the communications channel used to contact your external service.                   | [Channel object](#channel-object) | FALSE    | FALSE  | FALSE    | Validation is determined by the specific channel. |
| created        | Date of Event Hook creation.                                                                     | String (Date)                     | TRUE     | FALSE  | TRUE     | System assigned                                          |
| lastUpdated    | Date of Event Hook update.                                                                       | String (Date)                     | TRUE     | FALSE  | TRUE     | System assigned                                          |

```json
{
    "name" : "My Test Event Hook",
    "status" : "ACTIVE",
    "verificationStatus" : "VERIFIED",
    "events" : {
        "type" : "EVENT_TYPE",
        "items" : [
            "user.lifecycle.create",
            "user.lifecycle.activate"
        ]
    },
    "channel" : {
        "type" : "HTTP",
        "version" : "1.0.0",
        "config" : {
            "uri" : "https://www.example.com/eventHooks",
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
| uri        | External service endpoint to call to execute the event hook handler.                                        | String                                    | TRUE       | FALSE    | TRUE       | Maximum length 1024 characters. Must begin with https:// |
| headers    | Optional list of key/value pairs for headers that should be sent with the request to the external service.   | JSON Object                               | FALSE      | FALSE    | FALSE      | Some reserved headers, such as `Accept`, are disallowed. |
| authScheme | The authentication scheme to use for this request                                                            | [authScheme object](#authscheme-object)   | FALSE      | FALSE    | FALSE      | Valid `authscheme` object.                               |

### authScheme Object

| Property | Description                                                                    | DataType   | Required   | ReadOnly |
| -------- | ------------------------------------------------------------------------------ | ---------- | ---------- | -------- |
| type     | The authentication scheme type. Currently the only supported type is `HEADER`. | String     | TRUE       | FALSE    |
| key      | The header name for the authorization header.                                  | String     | TRUE       | FALSE    |
| value    | The header value.                                                              | String     | TRUE       | TRUE     |

To use Basic Auth, you would set `type` to `HEADER`, `key` to `Authorization`, and `value` to the Base64-encoded string of "username:password".

### events Object

| Property | Description                                                                  | DataType | Required | ReadOnly |
|----------|------------------------------------------------------------------------------|----------|----------|----------|
| type     | The events object type. Currently the only supported type is `EVENT_TYPE`.   | String   | TRUE     | FALSE    |
| items    | The [event types](#supported-events-for-subscription) to subscribe to.       | Array of String  | TRUE     | FALSE    |

### Supported Events for Subscription

When registering an event hook, you need to specify what events you want to subscribe to. The supported event types can be found [here.](/docs/api/resources/event-types/?q=event-hook-eligible#catalog)
