---
title: Event Hooks Management
category: management
excerpt:
  The Event Hooks Management API provides a CRUD interface for registering
  event hook endpoints.
---

# Event Hooks Management API

For general information on event hooks and how to create and use them, see [Event Hooks](/docs/concepts/event-hooks/). The following documentation is only for the management API, which provides a CRUD interface for registering Event Hooks.

For a step-by-step guide on implementing an example Event Hook, see the [Event Hook](/docs/guides/event-hook-implementation/) guide.

## Get started

Explore the Event Hooks API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/2fdf75c2fb3319ef5e73)

## Event Hook operations

### Create Event Hook

<ApiOperation method="post" url="/api/v1/eventHooks" />

Registers a new event hook to your organization in `ACTIVE` status. You need to pass an [Event Hook object](#event-hook-object) in the JSON payload of your request. That object represents the set of required information about the event hook you are registering, including:

 - The URI of your external service endpoint.
 - The [events](#supported-events-for-subscription) in Okta you want to subscribe to.

Additionally, the object lets you specify a secret API key that you want Okta to pass to your external service endpoint (so that your external service can check for its presence as a security measure).

Note that the API key you set here is unrelated to the Okta API token you must supply when making calls to Okta APIs.

Optionally, you can specify extra headers that you wish Okta to pass to your external service with each call.

Your external service's endpoint needs to be a valid HTTPS endpoint, where the URI you specify should always begin with `https://`.

##### Request parameters

| Parameter   | Description                                                                                | Param Type | DataType                                  | Required |
|-------------|--------------------------------------------------------------------------------------------|------------|-------------------------------------------|----------|
| Event Hook | A valid Event Hook object that specifies the details of the event hook that you are registering | Body       | [Event Hook object](#event-hook-object) | TRUE     |

##### Response parameters

The response is an [Event Hook object](#event-hook-object) that represents the event hook that was registered. The `id` property returned in the response serves as the unique ID for the registered event hook, which you can specify when invoking other CRUD operations.

##### Request example

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
}' "https://${yourOktaDomain}/api/v1/eventHooks"
```

> **Note:** `X-Other-Header` is an example of an additional optional header, with its value specified as `some-other-value`. For each optional header, you choose the name and value you wish Okta to pass to your external service.

##### Response example

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

> **Note:** The `channel.authScheme.value` property is not returned in the response. You set it in your request, but it is not exposed in any responses.

### Get Event Hook

<ApiOperation method="get" url="/api/v1/eventHooks/${id}" />

##### Request parameters

| Parameter | Description             | Param Type | DataType | Required |
|-----------|-------------------------|------------|----------|----------|
| `id`      | A valid Event Hook ID | Path       | String   | TRUE     |

##### Response parameters

The response is an [Event Hook object](#event-hook-object) that represents the registered event hook that matches the `id` you specified.

##### Request example

```bash
curl -v -X GET \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/eventHooks/${id}"
```

##### Response example

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

### List Event Hooks

<ApiOperation method="get" url="/api/v1/eventHooks" />

Returns a list of registered event hooks

##### Request example

```bash
curl -v -X GET \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/eventHooks"
```

##### Response example

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
                "key" : "Authorization"
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

##### Request parameters

| Parameter  | Description                                                                   | Param Type | DataType                                  | Required |
|------------|-------------------------------------------------------------------------------|------------|-------------------------------------------|----------|
| eventHook | An `eventHook` object that represents the updated properties that you want to apply | Body       | [Event Hook Object](#event-hook-object) | TRUE     |
| id         | The ID of the event hook that you want to update                                 | Path       | String                                    | TRUE     |

The submitted event hook properties replace the existing properties after passing validation. Note that some properties are immutable and cannot be updated. Refer to the description of each property in the [Event Hook object](#event-hook-object) table for information.

##### Response parameters

The response is an [Event Hook object](#event-hook-object) that represents the updated event hook.

##### Request example

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
}' "https://${yourOktaDomain}/api/v1/eventHooks/${id}"
```

##### Response example

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
                "key" : "Authorization"
            }
        }
    },
    "created": "2018-05-15T01:23:08.000Z",
    "lastUpdated": "2018-05-15T01:23:08.000Z"
}
```
> **Note:** Updating the `channel` property requires you to verify an event hook again.

### Verify Event Hook

<ApiOperation method="post" url="/api/v1/eventHooks/${id}/lifecycle/verify" />

| Parameter                       | Description                                            | Param Type | DataType | Required |
|---------------------------------|--------------------------------------------------------|------------|----------|----------|
| id                                   | ID of the event hook to verify                                                | Path       | String   | TRUE     |

Verifies that the Event Hook matches the provided `eventHookId`. Your endpoint needs to be able to correctly send back information to Okta in JSON format, so that endpoint ownership can be verified. See [Event Hooks](/docs/concepts/event-hooks/) documentation for details.

Only `ACTIVE` and `VERIFIED` event hooks can receive events from Okta.

A timeout of three seconds is enforced on all outbound requests, with one retry in the event of a timeout or an error response from the remote system. If a successful response has not been received after that, a 400 error is returned with more information about what failed.


##### Request example

```bash
curl -v -X POST \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/eventHooks/${id}/lifecycle/verify"
```

##### Response example

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
                "key" : "Authorization"
            }
        }
    },
    "created": "2018-05-15T01:23:08.000Z",
    "lastUpdated": "2018-05-15T01:23:08.000Z"
}

```

### Activate Event Hook

<ApiOperation method="post" url="/api/v1/eventHooks/${id}/lifecycle/activate" />

##### Request parameters

| Parameter | Description                          | Param Type | DataType | Required |
|-----------|--------------------------------------|------------|----------|----------|
| `id`      | The ID of the event hook to activate| Path       | String   | TRUE     |

Activates the event hook that matches the provided `id`

##### Response parameters

The response is an [Event Hook object](#event-hook-object) that represents the activated event hook.

##### Request example

```bash
curl -v -X POST \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/eventHooks/${id}/lifecycle/activate"
```

##### Response example

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
                "key" : "Authorization"
            }
        }
    },
    "created": "2018-05-15T01:23:08.000Z",
    "lastUpdated": "2018-05-15T01:23:08.000Z"
}
```

### Deactivate Event Hook

<ApiOperation method="post" url="/api/v1/eventHooks/${id}/lifecycle/deactivate" />

##### Request parameters

| Parameter | Description                          | Param Type | DataType | Required |
|-----------|--------------------------------------|------------|----------|----------|
| `id`      | The ID of the event hook to deactivate| Path       | String   | TRUE     |

Deactivates the event hook that matches the provided `id`

##### Response parameters

The response is an [Event Hook object](#event-hook-object) that represents the deactivated event hook.

##### Request example

```bash
curl -v -X POST \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/eventHooks/${id}/lifecycle/deactivate"
```

##### Response example

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
                "key" : "Authorization"
            }
        }
    },
    "created": "2018-05-15T01:23:08.000Z",
    "lastUpdated": "2018-05-15T01:23:08.000Z"
}
```

### Delete Event Hook

<ApiOperation method="delete" url="/api/v1/eventHooks/${id}" />

##### Request parameters

| Parameter | Description                          | Param Type | DataType | Required |
|-----------|--------------------------------------|------------|----------|----------|
| `id`      | The ID of the event hook to delete | Path       | String   | TRUE     |

Deletes the event hook that matches the provided `id`. Once deleted, the event hook is unrecoverable. As a safety precaution, only event hooks with a status of `INACTIVE` are eligible for deletion.

##### Response parameters

All responses return a 204 status with no content.

##### Request example

```bash
curl -v -X DELETE \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/eventHooks/${id}"
```

##### Response example

204 with no content

## Event Hook object

| Property       | Description                                                                                       | DataType                          | Nullable | Unique | ReadOnly | Validation                                        |
|----------------|---------------------------------------------------------------------------------------------------|-----------------------------------|----------|--------|----------|---------------------------------------------------|
| channel object | Properties of the communications channel used to contact your external service                   | [Channel object](#channel-object) | FALSE    | FALSE  | FALSE    | Validation is determined by the specific channel. |
| created        | Date of Event Hook creation                                                                   | String (Date)                     | TRUE     | FALSE  | TRUE     | System assigned                                          |
| events           | Events subscribed by this hook                                                                 | [Events object](#events-object)                            | FALSE    | TRUE   | FALSE    | Validation is determined by the specific event object type.   |
| id             | Unique key for the Event Hook                                                                  | String                            | FALSE    | TRUE   | TRUE     | System assigned                                          |
| lastUpdated    | Date of Event Hook update                                                                      | String (Date)                     | TRUE     | FALSE  | TRUE     | System assigned                                          |
| name           | Display name for the Event Hook                                                                 | String                            | FALSE    | TRUE   | FALSE    | Must be between one and 255 characters in length   |
| status         | Status of the Event Hook. `INACTIVE` will not receive any events.                                       | String                            | FALSE    | FALSE  | FALSE    | System assigned. Will be either `ACTIVE` or `INACTIVE`.            |
| verificationStatus         | Verification status of the Event Hook. `UNVERIFIED` will not receive any events.                                       | String                            | FALSE    | FALSE  | FALSE    | System assigned. Will be either `VERIFIED` or `UNVERIFIED`.            |

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

### Channel object

| Property       | Description                                                                                         | DataType                            | Nullable   | Unique   | ReadOnly   | Validation                                        |
| -------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------- | -------- | ---------- | ------------------------------------------------- |
| config | Properties of the communications channel used to contact your external service                     | [Channel Config object](#config-object)   | FALSE      | FALSE    | FALSE      | Validation is determined by the specific channel. |
| type           | The channel type. Currently the only supported type is `HTTP`.   | string                      | FALSE      | FALSE    | TRUE       | Must match a valid channel type            |
| version        | Version of the channel. The currently-supported version is "1.0.0".                                 | String                              | FALSE      | FALSE    | TRUE       | Must match a valid version number                |


### Config object

| Property   | Description                                                                                                | DataType                                | Required | Unique | ReadOnly | Validation                                                                                                             |
|------------|------------------------------------------------------------------------------------------------------------|-----------------------------------------|----------|--------|----------|------------------------------------------------------------------------------------------------------------------------|
| authScheme | The authentication scheme to use for this request                                                          | [AuthScheme object](#authscheme-object) | FALSE    | FALSE  | FALSE    | Valid `authscheme` object                                                                                             |
| headers    | Optional list of key/value pairs for headers that should be sent with the request to the external service | JSON Object                             | FALSE    | FALSE  | FALSE    | Some reserved headers, such as `Accept`, are disallowed.                                                               |
| uri        | External service endpoint to call to execute the event hook handler                                       | String                                  | TRUE     | FALSE  | TRUE     | Must begin with `https://`. Maximum length 1024 characters. No white space allowed. The URI must be reachable by Okta. |

### AuthScheme object

| Property | Description                                                                                                                                                                                 | DataType | Required | ReadOnly |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|----------|----------|
| key      | The header name for the authorization header                                                                                                                                               | String   | TRUE     | FALSE    |
| type     | The authentication scheme type. Currently the only supported type is `HEADER`.                                                                                                              | String   | TRUE     | FALSE    |
| value    | The header value. This secret value is passed to your external service endpoint. Your external service can check for it as a security measure. | String   | TRUE     | TRUE     |

To use Basic Auth, set `type` to `HEADER`, `key` to `Authorization`, and `value` to the Base64-encoded string of "username:password". Ensure that you include the scheme (including the space) as part of the `value` parameter. For example, `Basic YWRtaW46c3VwZXJzZWNyZXQ=`. See [HTTP Basic Authentication](/books/api-security/authn/api-authentication-options/#http-basic-authentication).

### Events object

| Property | Description                                                                  | DataType | Required | ReadOnly |
|----------|------------------------------------------------------------------------------|----------|----------|----------|
| type     | The events object type. Currently the only supported type is `EVENT_TYPE`.   | String   | TRUE     | FALSE    |
| items    | The [event types](#supported-events-for-subscription) to subscribe to       | Array of String  | TRUE     | FALSE    |

## Supported events for subscription

When you register an event hook, you need to specify what events you want to subscribe to. To see the list of event types currently eligible for use in event hooks, query the Event Types catalog with the query parameter `event-hook-eligible`:

<https://developer.okta.com/docs/reference/api/event-types/?q=event-hook-eligible>
