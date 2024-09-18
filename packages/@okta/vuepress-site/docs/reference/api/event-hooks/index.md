---
title: Event Hooks Management
category: management
excerpt:
  The Event Hooks Management API provides a CRUD interface for registering
  event hook endpoints.
---

# Event Hooks Management API

The Event Hooks Management API reference is now available at the new [Okta API reference portal](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/EventHook/#tag/EventHook).

Explore the [Okta Public API Collections](https://www.postman.com/okta-eng/workspace/okta-public-api-collections/overview) workspace to get started with the Event Hooks Management API Postman collection.

<!--

For general information on event hooks and how to create and use them, see [Event hooks](/docs/concepts/event-hooks/). The following documentation is only for the management API, which provides a CRUD interface for registering event hooks.

For a step-by-step guide on implementing an example event hook, see the [Event hook](/docs/guides/event-hook-implementation/) guide.

## Get started

Explore the event hooks API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/2fdf75c2fb3319ef5e73)

## Event hook operations

### Create event hook

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
        ],
        "filter" : null
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
        ],
        "filter": null
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

### Get event hook

<ApiOperation method="get" url="/api/v1/eventHooks/${id}" />

##### Request parameters

| Parameter | Description             | Param Type | DataType | Required |
|-----------|-------------------------|------------|----------|----------|
| `id`      | A valid event hook ID | Path       | String   | TRUE     |

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
        ],
        "filter" : null
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

### List event hooks

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
        ],
        "filter" : null
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

### Update event hook

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
        ],
        "filter" : null
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
        ],
        "filter" : null
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

### Verify event hook

<ApiOperation method="post" url="/api/v1/eventHooks/${id}/lifecycle/verify" />

| Parameter                       | Description                                            | Param Type | DataType | Required |
|---------------------------------|--------------------------------------------------------|------------|----------|----------|
| id                                   | ID of the event hook to verify                                                | Path       | String   | TRUE     |

Verifies that the event hook matches the provided `eventHookId`. Your endpoint needs to be able to correctly send back information to Okta in JSON format, so that endpoint ownership can be verified. See [Event hooks](/docs/concepts/event-hooks/).

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
        ],
        "filter" : null
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

### Activate event hook

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
        ],
        "filter" : null
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

### Deactivate event hook

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
        ],
        "filter" : null
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

### Delete event hook

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
| created        | Date of event hook creation                                                                   | String (Date)                     | TRUE     | FALSE  | TRUE     | System assigned                                          |
| events           | Events subscribed by this hook                                                                 | [Events object](#events-object)                            | FALSE    | TRUE   | FALSE    | Validation is determined by the specific event object type.   |
| id             | Unique key for the event hook                                                                  | String                            | FALSE    | TRUE   | TRUE     | System assigned                                          |
| lastUpdated    | Date of event hook update                                                                      | String (Date)                     | TRUE     | FALSE  | TRUE     | System assigned                                          |
| name           | Display name for the event hook                                                                 | String                            | FALSE    | TRUE   | FALSE    | Must be between one and 255 characters in length   |
| status         | Status of the event hook. `INACTIVE` doesn't receive any events.                                       | String                            | FALSE    | FALSE  | FALSE    | System assigned. Will be either `ACTIVE` or `INACTIVE`.            |
| verificationStatus         | Verification status of the event hook. `UNVERIFIED` will not receive any events.                                       | String                            | FALSE    | FALSE  | FALSE    | System assigned. Will be either `VERIFIED` or `UNVERIFIED`.            |

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
        ],
        "filter" : null
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
| filter    | The filter defined on a specific event type    | [filter object](#filter-object)  | FALSE     | FALSE    |

##### Example of events object

```json

"events": {
            "type": "EVENT_TYPE",
            "items": [
                "user.session.end",
                "user.session.start"
            ],
            "filter": {
                "type": "EXPRESSION_LANGUAGE",
                "eventFilterMap": [
                    {
                        "event": "user.session.end",
                        "condition": {
                            "version": null,
                            "expression": "event.eventType eq 'Admin' && event.eventType ne 'Bob'"
                        }
                    }
                ]
            }
        }
```

#### Filter object

| Property | Description                                                                  | DataType | Required | ReadOnly |
|----------|------------------------------------------------------------------------------|----------|----------|----------|
| type     | The type of filter. Okta only supports `EXPRESSION_LANGUAGE`   | String   | TRUE     | TRUE   |
| eventFilterMap    | The object that maps the filter to the event type      | Array of [eventFilterMap objects](#event-filter-map-object)  | FALSE    | FALSE    |

#### Event filter map object

<ApiLifecycle access="ea" />

<EventHookEANote/>

Explore the event hooks API with filters: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/15901964-61517094-f0ed-45e9-982a-f7a6a2db1bab?action=collection%2Ffork&collection-url=entityId%3D15901964-61517094-f0ed-45e9-982a-f7a6a2db1bab%26entityType%3Dcollection%26workspaceId%3D9f1d6c8f-d027-4107-a5c5-20d963c2c9d8)

| Property | Description                                                                  | DataType | Required | ReadOnly |
|----------|------------------------------------------------------------------------------|----------|----------|----------|
| event    | The filtered event type   | String   | TRUE     | FALSE   |
| condition    | The object that defines the filter       | [condition object](#condition-object)  | TRUE    | FALSE    |

#### Condition object

| Property | Description                                                                  | DataType | Required | ReadOnly |
|----------|------------------------------------------------------------------------------|----------|----------|----------|
| version    | Internal field   | String   | TRUE     | TRUE   |
| expression   | The Okta Expression language statement that filters the event type    | String  | TRUE    | FALSE    |

## Supported events for subscription

When you register an event hook, you need to specify what events you want to subscribe to. To see the list of event types currently eligible for use in event hooks, use the [Event Types catalog](/docs/reference/api/event-types/#catalog) and search with the parameter `event-hook-eligible`. -->
