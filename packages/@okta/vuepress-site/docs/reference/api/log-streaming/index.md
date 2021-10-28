---
title: Log Streaming
category: management
---

# Log Streaming API <ApiLifecycle access="ea" />

The Okta Log Streaming API provides operations to manage Log Stream configurations for an org.
You can configure up to two Log Stream integrations per org.

> **Note:** To access the Log Streaming API, the `LOG_STREAMING` feature flag has to be enabled.

## Get started

Explore the Log Streaming API:[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/f7359f22c9d572f03757)

## Setup guides

Some Log Stream types require specific configuration elements.
See the [Log Stream setup guide](url). ... to be added

## Log Streaming operations

### Add Log Stream

<ApiOperation method="post" url="/api/v1/logStreams" />

Adds a new Log Stream to your org

##### Request parameters

| Parameter | Description       | Param Type | DataType                                      | Required |
| --------- | ----------------- | ---------- | --------------------------------------------- | -------- |
| logStream       | Log Stream configuration      | Body       | [Log Stream](/docs/reference/api/log-streaming/#log-stream-object) | TRUE     |

##### Response parameters

The created [Log Stream](/docs/reference/api/log-streaming/#log-stream-object)

#### Add AWS EventBridge log stream

Adds a new `AWS EventBridge` type log stream to your org

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "aws_eventbridge",
  "name": "Example AWS EventBridge",
  "settings": {
    "eventSourceName": "your-event-source-name",
    "accountId": "123456789012"
    "region": "us-east-2",
  }
}
' "https://${yourOktaDomain}/api/v1/logStreams"
```

##### Response example

```json
{
  "id": "0oa1orqUGCIoCGNxf0g4",
  "type": "aws_eventbridge",
  "name": "Example AWS EventBridge",
  "lastUpdated": "2021-10-21T16:55:30.000Z",
  "created": "2021-10-21T16:55:29.000Z",
  "status": "ACTIVE",
  "settings": {
    "accountId": "123456789012",
    "eventSourceName": "your-event-source-name",
    "region": "us-east-2"
  },
  "_links": {
    "self": {
      "href": "http://rain.okta1.com:1802/api/v1/logStreams/0oa1orqUGCIoCGNxf0g4",
      "method": "GET"
    },
    "deactivate": {
      "href": "http://rain.okta1.com:1802/api/v1/logStreams/0oa1orqUGCIoCGNxf0g4/lifecycle/deactivate",
      "method": "POST"
    }
  }
}
```

### Get Log Stream

<ApiOperation method="get" url="/api/v1/logStreams/${logStreamId}" />

Fetches a log stream by `id`

##### Request parameters


Parameter | Description     | Param Type | DataType | Required |
--------- | --------------- | ---------- | -------- | -------- |
logStreamId       | `id` of a log stream  | URL        | String   | TRUE     |

##### Response parameters

[Log Stream](/docs/reference/api/log-streaming/#log-stream-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/logStreams/0oa1orqUGCIoCGNxf0g4"
```

##### Response example

```json
{
  "id": "0oa1orzg0CHSgPcjZ0g4",
  "type": "aws_eventbridge",
  "name": "Example EventBridge",
  "lastUpdated": "2021-10-21T16:59:59.000Z",
  "created": "2021-10-21T16:59:59.000Z",
  "status": "ACTIVE",
  "settings": {
    "accountId": "123456789012",
    "eventSourceName": "your-event-source-name",
    "region": "us-east-2"
  },
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/logStreams/0oa1orzg0CHSgPcjZ0g4",
      "method": "GET"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/logStreams/0oa1orzg0CHSgPcjZ0g4/lifecycle/deactivate",
      "method": "POST"
    }
  }
}
```

### List Log Streams

<ApiOperation method="get" url="/api/v1/logStreams" />

Paginates Log Streams in your org. Can return a subset of Log Streams that match a supported filter expression.

- [List log streams with defaults](/docs/reference/api/log-streaming/#list-log-streams-with-defaults)
- [List log streams with status](/docs/reference/api/log-streaming/#find-log-streams-by-status)
- [List log streams with type](/docs/reference/api/log-streaming/#find-log-streams-by-type)

##### Request parameters

| Parameter | Description                                                                                                      | Param Type | DataType | Required | Default |
| --------- | ---------------------------------------------------------------------------------------------------------------- | ---------- | -------- | -------- | ------- |
| after     | Specifies the pagination cursor for the next page of apps                                                        | Query      | String   | FALSE    |         |
| filter    | Filters apps by `status`, `type`                                                                                 | Query      | String   | FALSE    |         |
| limit     | Specifies the number of results per page (maximum 200)                                                           | Query      | Number   | FALSE    | 20      |

The results are [paginated](/docs/reference/core-okta-api/#pagination) according to the `limit` parameter.
If there are multiple pages of results, the Link header contains a `next` link that should be treated as an opaque value (follow it, don't parse it).

###### Filters

The following filters are supported with the filter query parameter:

| Filter                              | Description                                                                       |
| ----------------------              | ------------------------------------------------------                            |
| `type eq ":type"`                   | Log streams of a particular [log stream type](/docs/reference/api/log-streaming/#log-stream-type) such as `aws_eventbridge` |
| `status eq "ACTIVE"`                | Log streams that have a `status` of `ACTIVE`                                             |
| `status eq "INACTIVE"`              | Log streams that have a `status` of `INACTIVE`                                           |

> **Note:** Only a single expression is supported as this time. The only supported filter type is `eq`.


##### Response parameters

Array of [Log Stream](/docs/reference/api/log-streaming/#log-stream-object)

#### List log streams with defaults

Enumerates all log streams added to your org

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/logStreams"
```


##### Response example

```json
[
  {
    "id": "0oa1orzg0CHSgPcjZ0g4",
    "type": "aws_eventbridge",
    "name": "Example AWS EventBridge",
    "lastUpdated": "2021-10-21T16:59:59.000Z",
    "created": "2021-10-21T16:59:59.000Z",
    "status": "ACTIVE",
    "settings": {
      "accountId": "123456789012",
      "eventSourceName": "your-event-source-name",
      "region": "us-east-2"
    },
    "_links": {
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/logStreams/0oa1orzg0CHSgPcjZ0g4",
        "method": "GET"
      },
      "deactivate": {
        "href": "https://${yourOktaDomain}/api/v1/logStreams/0oa1orzg0CHSgPcjZ0g4/lifecycle/deactivate",
        "method": "POST"
      }
    }
  }
]
```

#### Find Log Streams by type

Finds all Log Streams with a [specific type](/docs/reference/api/log-streaming/#log-stream-type)

##### Request example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/logStreams?filter=type+eq+\"aws_eventbridge\""
```

##### Response example

```json
[
  {
    "id": "0oa1orzg0CHSgPcjZ0g4",
    "type": "aws_eventbridge",
    "name": "Example AWS EventBridge",
    "lastUpdated": "2021-10-21T16:59:59.000Z",
    "created": "2021-10-21T16:59:59.000Z",
    "status": "ACTIVE",
    "settings": {
      "accountId": "123456789012",
      "eventSourceName": "your-event-source-name",
      "region": "us-east-2"
    },
    "_links": {
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/logStreams/0oa1orzg0CHSgPcjZ0g4",
        "method": "GET"
      },
      "deactivate": {
        "href": "https://${yourOktaDomain}/api/v1/logStreams/0oa1orzg0CHSgPcjZ0g4/lifecycle/deactivate",
        "method": "POST"
      }
    }
  }
]
```


#### Find Log Streams by type

Finds all Log Streams with a specified status

##### Request example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/logStreams?filter=status+eq+\"ACTIVE\""
```

##### Response example

```json
[
  {
    "id": "0oa1orzg0CHSgPcjZ0g4",
    "type": "aws_eventbridge",
    "name": "Example AWS EventBridge",
    "lastUpdated": "2021-10-21T16:59:59.000Z",
    "created": "2021-10-21T16:59:59.000Z",
    "status": "ACTIVE",
    "settings": {
      "accountId": "123456789012",
      "eventSourceName": "your-event-source-name",
      "region": "us-east-2"
    },
    "_links": {
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/logStreams/0oa1orzg0CHSgPcjZ0g4",
        "method": "GET"
      },
      "deactivate": {
        "href": "https://${yourOktaDomain}/api/v1/logStreams/0oa1orzg0CHSgPcjZ0g4/lifecycle/deactivate",
        "method": "POST"
      }
    }
  }
]
```

### Update Log Stream

<ApiOperation method="put" url="/api/v1/logStreams/${logStreamId}" />

Updates the configuration for a Log Stream

##### Request parameters

| Parameter | Description                       | Param Type | DataType                                      | Required |
| --------- | --------------------------------- | ---------- | --------------------------------------------- | -------- |
| logStreamId     | `id` of the log stream to update           | URL        | String                                        | TRUE     |
| logStream       | Updated configuration for the log stream | Body       | [Log Stream](/docs/reference/api/log-streaming/#log-stream-object) | TRUE     |

All properties must be specified when updating the log stream configuration. Partial updates aren't supported.

##### Response parameters

Updated [Log Stream](/docs/reference/api/log-streaming/#log-stream-object)

##### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "id": "0oa1orzg0CHSgPcjZ0g4",
    "type": "aws_eventbridge",
    "name": "Updated example AWS EventBridge",
}' "https://${yourOktaDomain}/api/v1/logStreams/0oa1orzg0CHSgPcjZ0g4"
```

##### Response example

```json
{
  "id": "0oa1orzg0CHSgPcjZ0g4",
  "type": "aws_eventbridge",
  "name": "Example AWS EventBridge",
  "lastUpdated": "2021-10-21T16:59:59.000Z",
  "created": "2021-10-21T16:59:59.000Z",
  "status": "ACTIVE",
  "settings": {
    "accountId": "123456789012",
    "eventSourceName": "your-event-source-name",
    "region": "us-east-2"
  },
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/logStreams/0oa1orzg0CHSgPcjZ0g4",
      "method": "GET"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/logStreams/0oa1orzg0CHSgPcjZ0g4/lifecycle/deactivate",
      "method": "POST"
    }
  }
}
```
### Delete Log Stream

<ApiOperation method="delete" url="/api/v1/logStreams/${logStreamId}" />

Removes a Log Stream from your org

##### Request parameters

| Parameter | Description                 | Param Type | Data Type | Required |
| --------- | --------------------------- | ---------- | --------- | -------- |
| logStreamId     | `id` of the log stream to delete   | URL        | String    | TRUE     |

##### Response parameters

There are no response parameters.

##### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://${yourOktaDomain}/api/v1/logStreams/0oa1orzg0CHSgPcjZ0g4"
```

##### Response example

```http
HTTP/1.1 204 No Content
```

## Log Streams lifecycle operations

### Activate Log Stream

<ApiOperation method="post" url="/api/v1/logStreams/${logStreamId}/lifecycle/activate" />

Reactivates an inactive log stream

##### Request parameters

| Parameter | Description             | Param Type | DataType | Required |
| --------- | ----------------------- | ---------- | -------- | -------- |
| logStreamId     | `id` of log stream to activate | URL        | String   | TRUE     |

##### Response parameters

Activated [Log Stream](/docs/reference/api/log-streaming/#log-stream-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://${yourOktaDomain}/api/v1/logStreams/0oa1orzg0CHSgPcjZ0g4/lifecycle/activate"
```

##### Response example

```json
{
  "id": "0oa1orzg0CHSgPcjZ0g4",
  "type": "aws_eventbridge",
  "name": "Example AWS EventBridge",
  "lastUpdated": "2021-10-21T16:59:59.000Z",
  "created": "2021-10-21T16:59:59.000Z",
  "status": "ACTIVE",
  "settings": {
    "accountId": "123456789012",
    "eventSourceName": "your-event-source-name",
    "region": "us-east-2"
  },
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/logStreams/0oa1orzg0CHSgPcjZ0g4",
      "method": "GET"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/logStreams/0oa1orzg0CHSgPcjZ0g4/lifecycle/deactivate",
      "method": "POST"
    }
  }
}
```

### Deactivate Log Stream

<ApiOperation method="post" url="/api/v1/logStreams/${logStreamId}/lifecycle/deactivate" />

Deactivates an active Log Stream

##### Request parameters

| Parameter | Description               | Param Type | DataType | Required |
| --------- | ------------------------- | ---------- | -------- | -------- |
| logStreamId     | `id` of log stream to deactivate | URL        | String   | TRUE     |

##### Response parameters

Deactivated [Log Stream](/docs/reference/api/log-streaming/#log-stream-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://${yourOktaDomain}/api/v1/logStreams/0oa1orzg0CHSgPcjZ0g4/lifecycle/deactivate"
```

##### Response example

```json
{
  "id": "0oa1orzg0CHSgPcjZ0g4",
  "type": "aws_eventbridge",
  "name": "Example AWS EventBridge",
  "lastUpdated": "2021-10-21T16:59:59.000Z",
  "created": "2021-10-21T16:59:59.000Z",
  "status": "INACTIVE",
  "settings": {
    "accountId": "123456789012",
    "eventSourceName": "your-event-source-name",
    "region": "us-east-2"
  },
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/logStreams/0oa1orzg0CHSgPcjZ0g4",
      "method": "GET"
    },
    "activate": {
      "href": "https://${yourOktaDomain}/api/v1/logStreams/0oa1orzg0CHSgPcjZ0g4/lifecycle/activate",
      "method": "POST"
    }
  }
}
```


## Log Stream object

### Example

```json
{
  "id": "0oa1orzg0CHSgPcjZ0g4",
  "type": "aws_eventbridge",
  "name": "Example AWS EventBridge",
  "lastUpdated": "2021-10-21T16:59:59.000Z",
  "created": "2021-10-21T16:59:59.000Z",
  "status": "ACTIVE",
  "settings": {
    "accountId": "123456789012",
    "eventSourceName": "your-event-source-name",
    "region": "us-east-2"
  },
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/logStreams/0oa1orzg0CHSgPcjZ0g4",
      "method": "GET"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/logStreams/0oa1orzg0CHSgPcjZ0g4/lifecycle/deactivate",
      "method": "POST"
    }
  }
}
```

### Log Stream attributes

All Log Streams have the following properties:

| Property      | Description                                                  | DataType                                                       | Nullable | Unique | Readonly | MinLength | MaxLength |
| ------------- | ------------------------------------------------------------ | -------------------------------------------------------------- | -------- | ------ | -------- | --------- | --------- |
| id            | Unique key for the log stream                                       | String                                                         | FALSE    | TRUE   | TRUE     |           |           |
| created       | Timestamp when the log stream was created                             | Date                                                           | FALSE | FALSE | TRUE  |   |     |
| lastUpdated   | Timestamp when the log stream was last updated                        | Date                                                           | FALSE | FALSE | TRUE  |   |     |
| _links        | [Discoverable resources](/docs/reference/api/log-streaming/#links-object) related to the log stream | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE  | FALSE | TRUE  |   |     |
| name          | Unique name for the log stream                                  | String                                                         | FALSE | TRUE  | FALSE | 1 | 100 |
| status        | Status of the log stream                                          | `ACTIVE` or `INACTIVE`                                         | FALSE | FALSE | TRUE  |   |     |
| type          | Type of log stream                                                  | [Log Stream type](/docs/reference/api/log-streaming/#log-stream-type)            | FALSE    | FALSE  | FALSE    |           |           |
| settings      | Log stream settings                                                  | [AWS EventBridge Settings](/docs/reference/api/log-streaming/#aws_eventbridge-settings-object)            | FALSE    | FALSE  | TRUE    |           |           |

#### Property details

* The `id`, `status`, `created`,  `lastUpdated`, and `_links` properties are available after a log stream is created.

### Links object

Specifies link relationships. See [Web Linking](http://tools.ietf.org/html/rfc8288) available for the IdP Transaction using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification. This object is used for dynamic discovery of related resources and lifecycle operations and is read-only.

| Link Relation Type       | Description                                                                                                                                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------                                                          |
| self                     | The primary URL for the log stream                                                                                                       |
| activate                 | A URL for [activating the log stream](/docs/reference/api/log-streaming/#activate-log-stream) if it's inactive       |
| deactivate               | A URL for [deactivating the log stream](/docs/reference/api/log-streaming/#deactivate-log-stream) if it's active        |

### Log Stream type

Okta supports the following enterprise and social providers:

| Type         | Description                                                                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aws_eventbridge`      | [AWS EventBridge](https://developer.apple.com/documentation/aws_eventbridge_log_stream)                                                                       |


## AWS EventBridge settings object

### Example

```json
{
    "accountId": "123456789012",
    "eventSourceName": "your-event-source-name",
    "region": "us-east-2"
}
```

### AWS EventBridge settings attributes

| Property      | Description                                                  | DataType                                                       | Nullable | Unique | Readonly | MinLength | MaxLength |
| ------------- | ------------------------------------------------------------ | -------------------------------------------------------------- | -------- | ------ | -------- | --------- | --------- |
| accountId            | Your Amazon AWS Account ID                                       | String                                                         | FALSE    | FALSE   | FALSE     |      12     |     12      |
| eventSourceName     | An alphanumeric name (no spaces) to identify this event source in AWS EventBridge                             | String                                                           | FALSE | FALSE | FALSE  |  1 |  75   |
| region | The destination AWS region for your system log events. See [Log Stream Schema](/docs/reference/api/schemas/#log-stream-schema-object) for the list of supported values.                      | String                                                           | FALSE | FALSE | FALSE  |   |     |

#### Property details

* Once assigned during creation of the log stream, `accountId`, `eventSourceName`, `region` properties are not editable
* `accountId` needs to be a 12 digit long valid AWS account ID
* `eventSourceName` can contain letters, digits and following characters `.`, `-`, `_`
