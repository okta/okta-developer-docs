---
title: Log Streaming
category: management
---

# Log Streaming API

<ApiLifecycle access="ea" />

The Okta Log Streaming API provides operations to manage Log Stream configurations for an org.
You can configure up to two Log Stream integrations per org.

> **Note:** The **Log Streaming** Early Access feature must be enabled. See [Feature Lifecycle Management](https://developer.okta.com/docs/concepts/feature-lifecycle-management/) and [Manage Early Access and Beta features](https://help.okta.com/okta_help.htm?id=ext_Manage_Early_Access_features) for more information on Feature Manager.

## Get started

Explore the Log Streaming API:[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/cbb00ae768a0c02ea433)

## Log Streaming operations
The Log Streaming API has the following CRUD operations:

* [Add a Log Stream](#add-a-log-stream)
* [Get a Log Stream](#get-a-log-stream)
* [List Log Streams](#list-log-streams)
* [Update a Log Stream](#update-a-log-stream)
* [Delete a Log Stream](#delete-a-log-stream)
### Add a Log Stream

<ApiLifecycle access="ea" />

<ApiOperation method="post" url="/api/v1/logStreams" />

Adds a new Log Stream to your org

##### Request parameters

| Parameter | Description       | Param Type | DataType                                      | Required |
| --------- | ----------------- | ---------- | --------------------------------------------- | -------- |
| logStream       | Log Stream configuration      | Body       | [Log Stream](#log-stream-object) | TRUE     |

##### Response parameters

The created [Log Stream object](#log-stream-object)

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
    "accountId": "123456789012",
    "region": "us-east-2"
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
      "href": "http://${yourOktaDomain}/api/v1/logStreams/0oa1orqUGCIoCGNxf0g4",
      "method": "GET"
    },
    "deactivate": {
      "href": "http://${yourOktaDomain}/api/v1/logStreams/0oa1orqUGCIoCGNxf0g4/lifecycle/deactivate",
      "method": "POST"
    }
  }
}
```

### Get a Log Stream

<ApiLifecycle access="ea" />

<ApiOperation method="get" url="/api/v1/logStreams/${logStreamId}" />

Fetches a Log Stream by `id`

##### Request parameters


Parameter | Description     | Param Type | DataType | Required |
--------- | --------------- | ---------- | -------- | -------- |
logStreamId       | The Log Stream unique `id` provided by Okta   | URL        | String   | TRUE     |

##### Response parameters

The requested [Log Stream object](#log-stream-object)

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

<ApiLifecycle access="ea" />

<ApiOperation method="get" url="/api/v1/logStreams" />

List Log Streams in your org. You can request a paginated list or a subset of Log Streams that match a supported filter expression.

- [List Log Streams with defaults](#list-log-streams-with-defaults)
- [List Log Streams by status](#find-log-streams-by-status)
- [List Log Streams by type](#find-log-streams-by-type)

##### Request parameters

| Parameter | Description                                                                                                      | Param Type | DataType | Required | Default |
| --------- | ---------------------------------------------------------------------------------------------------------------- | ---------- | -------- | -------- | ------- |
| after     | Specifies the pagination cursor for the next page of Log Streams                                                        | Query      | String   | FALSE    |         |
| filter    | [Filters](#filters) Log Streams by `status` or `type`                                                                                 | Query      | String   | FALSE    |         |
| limit     | Specifies the number of Log Streams to return per page (maximum 200)                                                           | Query      | Number   | FALSE    | 20      |

The results are [paginated](/docs/reference/core-okta-api/#pagination) according to the `limit` parameter.
If there are multiple pages of results, the Link header contains a `next` link that should be treated as an opaque value (follow it, don't parse it).

###### Filters

The following filters are supported with the `filter` query parameter:

| Filter                              | Description                                                                       |
| ----------------------              | ------------------------------------------------------                            |
| `type eq "${typeId}"`        | Filter Log Streams of type [`${typeId}`](#log-stream-type), such as `aws_eventbridge` |
| `status eq "ACTIVE"`                | Filter Log Streams with an `ACTIVE` status                                             |
| `status eq "INACTIVE"`              | Filter Log Streams with an `INACTIVE` status                                           |

> **Note:** The Log Stream list filter only support the `eq` operator and allows one filter expression per request. Use URL encoding for special characters, such as replacing a space with a plus (+) sign. See [Filter](/docs/reference/core-okta-api/#filter) design principles for details.


##### Response parameters

Array of [Log Stream](#log-stream-object) objects

#### List Log Streams with defaults

Returns a list of all Log Streams added to your org without filter or pagination options

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

Finds all Log Streams with a [specific type](#log-stream-type)

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


#### Find Log Streams by status

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

### Update a Log Stream

<ApiLifecycle access="ea" />

<ApiOperation method="put" url="/api/v1/logStreams/${logStreamId}" />

Updates the configuration for a Log Stream

##### Request parameters

| Parameter | Description                       | Param Type | DataType                                      | Required |
| --------- | --------------------------------- | ---------- | --------------------------------------------- | -------- |
| logStreamId     | `id` of the Log Stream to update           | URL        | String                                        | TRUE     |
| logStream       | Updated configuration for the Log Stream | Body       | [Log Stream](#log-stream-object) | TRUE     |

Depending on the type of Log Stream, certain properties can't be updated once the Log Stream is created.
Use the [Log Stream Schema API](/docs/reference/api/schemas/#log-stream-schema-operations) to determine which
Log Stream type can't be updated. Log Stream types with the `"writeOnce" : true` property can't be updated after
creation.

##### Response parameters

Updated [Log Stream](#log-stream-object)

##### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "id": "0oa1orzg0CHSgPcjZ0g4",
    "type": "aws_eventbridge",
    "name": "Updated example AWS EventBridge"
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
### Delete a Log Stream

<ApiLifecycle access="ea" />

<ApiOperation method="delete" url="/api/v1/logStreams/${logStreamId}" />

Removes a Log Stream from your org

##### Request parameters

| Parameter | Description                 | Param Type | Data Type | Required |
| --------- | --------------------------- | ---------- | --------- | -------- |
| logStreamId     | `id` of the Log Stream to delete   | URL        | String    | TRUE     |

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

## Log Streaming lifecycle operations
The Log Streaming API has the following lifecycle operations:

* [Activate a Log Stream](#activate-a-log-stream)
* [Deactivate a Log Stream](#deactivate-a-log-stream)

### Activate a Log Stream

<ApiLifecycle access="ea" />

<ApiOperation method="post" url="/api/v1/logStreams/${logStreamId}/lifecycle/activate" />

Reactivates an inactive Log Stream

##### Request parameters

| Parameter | Description             | Param Type | DataType | Required |
| --------- | ----------------------- | ---------- | -------- | -------- |
| logStreamId     | `id` of the Log Stream to activate | URL        | String   | TRUE     |

##### Response parameters

Activated [Log Stream](#log-stream-object)

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

### Deactivate a Log Stream

<ApiLifecycle access="ea" />

<ApiOperation method="post" url="/api/v1/logStreams/${logStreamId}/lifecycle/deactivate" />

Deactivates an active Log Stream

##### Request parameters

| Parameter | Description               | Param Type | DataType | Required |
| --------- | ------------------------- | ---------- | -------- | -------- |
| logStreamId     | `id` of the Log Stream to deactivate | URL        | String   | TRUE     |

##### Response parameters

Deactivated [Log Stream](#log-stream-object)

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

### Log Stream object example

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

### Log Stream properties

All Log Streams have the following properties:

| Property      | Description                                                  | DataType                                                       | Nullable | Unique | Readonly | MinLength | MaxLength |
| ------------- | ------------------------------------------------------------ | -------------------------------------------------------------- | -------- | ------ | -------- | --------- | --------- |
| id            | Unique key for the Log Stream                                       | String                                                         | FALSE    | TRUE   | TRUE     |           |           |
| created       | Timestamp when the Log Stream was created                             | Date                                                           | FALSE | FALSE | TRUE  |   |     |
| lastUpdated   | Timestamp when the Log Stream was last updated                        | Date                                                           | FALSE | FALSE | TRUE  |   |     |
| _links        | Log Stream [relational and lifecycle operation links](#log-stream-links-object) | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) for [Log Stream Links](#log-stream-links-object)| TRUE  | FALSE | TRUE  |   |     |
| name          | Unique name for the Log Stream                                  | String                                                         | FALSE | TRUE  | FALSE | 1 | 100 |
| status        | Status of the Log Stream                                          | `ACTIVE` or `INACTIVE`                                         | FALSE | FALSE | TRUE  |   |     |
| type          | Type of Log Stream                                                  | [Log Stream type](#log-stream-type)            | FALSE    | FALSE  | FALSE    |           |           |
| settings      | Log Stream type settings                                                  | [AWS EventBridge Settings](#aws-eventbridge-settings-object) or [Splunk Cloud Settings](#splunk-cloud-settings-object) (<ApiLifecycle access="beta" /> )           | FALSE    | FALSE  | TRUE    |           |           |

#### Property details

* The `id`, `status`, `created`,  `lastUpdated`, and `_links` properties are available after a Log Stream is created.

#### Log Stream Links object

This object provides read-only link relationships to the Log Stream. The relational links include lifecycle operations. See [Web Linking](http://tools.ietf.org/html/rfc8288) using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification.

| Link Relation Type       | Description                                                                                                                                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------                                                          |
| self                     | The primary URL for the Log Stream                                                                                                       |
| activate                 | A URL to [activate](#activate-a-log-stream) an inactive Log Stream      |
| deactivate               | A URL to [deactivate](#deactivate-a-log-stream) an active Log Stream        |

#### Log Stream type

The Log Stream type specifies the streaming provider used. Okta supports the following providers:

| Type         | Description                                                                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aws_eventbridge`      | [AWS EventBridge](https://aws.amazon.com/eventbridge/) Log Stream type                                                                      |
| `splunk_cloud_logstreaming`      | [Splunk Cloud](https://aws.amazon.com/eventbridge/) Log Stream type                                                                      |


### AWS EventBridge Settings object

The AWS EventBridge Settings object specifies the configuration for the `aws_eventbridge` Log Stream type. You can't modify the AWS EventBridge Settings properties after the object is created.

#### AWS EventBridge Settings example

```json
{
    "accountId": "123456789012",
    "eventSourceName": "your-event-source-name",
    "region": "us-east-2"
}
```

#### AWS EventBridge Settings properties

| Property      | Description                                                  | DataType                                                       | Nullable | Unique | Readonly | MinLength | MaxLength |
| ------------- | ------------------------------------------------------------ | -------------------------------------------------------------- | -------- | ------ | -------- | --------- | --------- |
| accountId            | Your AWS account ID                                       | String                                                         | FALSE    | FALSE   | FALSE     |      12     |     12      |
| eventSourceName     | An alphanumeric name (no spaces) to identify this event source in AWS EventBridge                             | String (permitted characters: letters, digits, `.`, `-`,  `_` )  | FALSE | TRUE | FALSE  |  1 |  75   |
| region | The destination AWS region where your event source is going to be located            | String                                                           | FALSE | FALSE | FALSE  |   |     |

#### Property details

*  The `accountId`, `eventSourceName`,  and `region` properties are assigned during creation and can't be modified afterwards.
* The `region` property can be set to one of the following supported AWS region codes. The `region` list can also be retrieved with the [Log Stream Schema](/docs/reference/api/schemas/#log-stream-schema-operations) endpoint.

| Region      | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| us-east-2 | US East (Ohio) |
| us-east-1 | US East (N. Virginia) |
| us-west-1 | US West (N. California) |
| us-west-2 | US West (Oregon) |
| ca-central-1 | Canada (Central) |
| eu-central-1 | Europe (Frankfurt) |
| eu-west-1 | Europe (Ireland) |
| eu-west-2 | Europe (London) |
| eu-west-3 | Europe (Paris) |
| eu-south-1 | Europe (Milan) |
| eu-north-1 | Europe (Stockholm) |


### Splunk Cloud Settings object

<ApiLifecycle access="beta" />

The Splunk Cloud Settings object specifies the configuration for the `splunk_cloud_logstreaming` Log Stream type.

#### Splunk Cloud Settings example

```json
{
  "host": "acme.splunkcloud.com"
  "token": "1e652bb8-3ef8-427b-9f00-222e1bbe3832"
}
```

#### Splunk Cloud Settings properties

| Property      | Description                                                  | DataType                                                       | Nullable | Unique | Readonly | MinLength | MaxLength |
| ------------- | ------------------------------------------------------------ | -------------------------------------------------------------- | -------- | ------ | -------- | --------- | --------- |
| host            | The domain for your Splunk Cloud instance without http or https. For example: `acme.splunkcloud.com`                                       | String                                                         | FALSE    | FALSE   | FALSE     |      17     |     116      |
| token     | The HEC token for your Splunk Cloud HTTP Event Collector.              | String (GUID format)  | FALSE | FALSE | FALSE  |  36 |  36   |


