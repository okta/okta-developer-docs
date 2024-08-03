---
title: Identity Sources API
category: management
---

# Identity Sources API

The Identity Sources API reference is now available at the new [Okta API reference portal](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/).

<!--
<ApiLifecycle access="ea" /><!--LEA for both Classic and Identity Engine. Okta needs to turn on IDENTITY_SOURCE_APPS feature flag (not Self-Service)-/->

The Okta Identity Sources API provides a mechanism to synchronize an HR source (the custom identity source) with Okta user profiles in an org. This API supports the Anything-as-a-Source (XaaS) feature. See [Build an Anything-as-a-Source custom client integration](/docs/guides/anything-as-a-source/).

<ApiAuthMethodWarning />

## Get started

Explore the Identity Sources API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/cc287b89079ff245ee4a)

## Identity Sources API operations

The Identity Sources API has the following CRUD operations:

* [Create an Identity Source Session](#create-an-identity-source-session)
* [Upload bulk upsert data](#upload-bulk-upsert-data)
* [Upload bulk delete data](#upload-bulk-delete-data)
* [List active Identity Source Sessions](#list-active-identity-source-sessions)
* [Retrieve an Identity Source Session](#retrieve-an-identity-source-session)
* [Trigger an Identity Source Session](#trigger-an-identity-source-session)
* [Cancel an Identity Source Session](#cancel-an-identity-source-session)

### Create an Identity Source Session

<ApiOperation method="post" url="/api/v1/identity-sources/${identitySourceId}/sessions" />

Creates an Identity Source Session object for an identity source

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `identitySourceId`  | String | The identity source identifier. This value is obtained from creating a Custom Identity Source integration in Okta. |

#### Response body

Returns an [Identity Source Session](#identity-source-session-object) object

##### Possible errors

See [Possible common errors](#possible-common-errors) for all Identity Sources API endpoints. The following are possible errors specific to this endpoint:

| Error code  | HTTP code    | Description    |
| ----------- | -----------  | -------------- |
| `E0000001` | 400 Bad Request | There is an existing Identity Source Session with a `CREATED` or `TRIGGERED` status for the same identity source. |

#### Use example

This request creates an Identity Source Session object:

##### Request

```bash
curl -L -X POST 'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions' \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' \
-H 'Authorization: SSWS ${apiToken}'
```

##### Response

```json
{
  "id": "{sessionId}",
  "identitySourceId": "{identitySourceId}",
  "status": "CREATED",
  "importType": "INCREMENTAL"
}
```

### Upload bulk upsert data

<ApiOperation method="post" url="/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}/bulk-upsert" />

Loads bulk data into an Identity Source Session for inserting or updating user profiles in Okta for an identity source

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `identitySourceId`  | String | The identity source ID obtained from creating a Custom Identity Source integration in Okta |
| `sessionId`  | String | The ID for the Identity Source Session to load user data |

#### Request body

| Property    | Type           | Description   |
| ----------- | -------------- | ------------- |
| `entityType` | String (enum: `USERS`) | The type of data to upsert into the session. Currently, only `USERS` is supported.  |
| `profiles` | Array | An array of [Identity Source User Profile For Upsert object](#identity-source-user-profile-for-upsert-object) |

#### Response body

None

##### Possible errors

See [Possible common errors](#possible-common-errors) for all Identity Sources API endpoints. The following are possible errors specific to this endpoint:

| Error code  | HTTP code    | Description    |
| ----------- | -----------  | -------------- |
| `E0000003` | 400 Bad Request | There is no payload in the bulk-upsert request. |
| `E0000001` | 400 Bad Request | The `profiles` array is missing or empty in the bulk-upsert request. |
| `E0000003` | 400 Bad Request | The `entityType` property value is invalid. |

#### Use example

This request upserts a set of external user profiles to the Identity Source Session with an `id` value of `${sessionId}`:

##### Request

```bash
curl -i -X POST \
   'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}/bulk-upsert' \
-H 'accept: application/json' \
-H 'authorization: SSWS ${apiToken}' \
-H 'cache-control: no-cache' \
-H 'content-type: application/json' \
-d '{
  "entityType": "USERS",
  "profiles": [
    {
      "externalId": "${extUserId1}",
      "profile": {
        "userName": "isaac.i.brock@example.com",
        "firstName": "Isaac",
        "lastName": "Brock",
        "email": "isaac.i.brock@example.com",
        "secondEmail": "ibrock.test@example.com",
        "mobilePhone": "555-123-4567",
        "homeAddress": "Kirkland, WA"
      }
    }
  ]
}'
```

##### Response

```http
HTTP/1.1 202 Accepted
Content-Type: application/json
```

### Upload bulk delete data

<ApiOperation method="post" url="/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}/bulk-delete" />

Loads bulk data into an Identity Source Session for deactivation in Okta for an identity source

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `identitySourceId`  | String | The identity source ID obtained from creating a Custom Identity Source integration in Okta |
| `sessionId`  | String | The ID for the Identity Source Session to load deactivation user data |

#### Request body

| Property    | Type           | Description   |
| ----------- | -------------- | ------------- |
| `entityType` | String (enum: `USERS`) | The type of data to bulk-delete in a session. Currently, only `USERS` is supported.  |
| `profiles` | Array | An array of [Identity Source User Profile For Delete object](#identity-source-user-profile-for-delete-object) |

#### Response body

None

##### Possible errors

See [Possible common errors](#possible-common-errors) for all Identity Sources API endpoints. The following are possible errors specific to this endpoint:

| Error code  | HTTP code    | Description    |
| ----------- | -----------  | -------------- |
| `E0000003` | 400 Bad Request | There is no payload in the bulk-delete request. |
| `E0000001` | 400 Bad Request | The `profiles` array is missing or empty in the bulk-delete request. |
| `E0000003` | 400 Bad Request | The `entityType` property value is invalid. |

#### Use example

This request loads a set of external IDs for user deactivation in an Identity Source Session with an `id` value of `${sessionId}`:

##### Request

```bash
curl -i -X POST \
   'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}/bulk-delete' \
-H 'accept: application/json' \
-H 'authorization: SSWS ${apiToken}' \
-H 'cache-control: no-cache' \
-H 'content-type: application/json' \
-d '{
    "entityType": "USERS",
    "profiles": [
      {
        "externalId": "${extUserId1}"
      },
      {
        "externalId": "${extUserId2}"
      },
      {
        "externalId": "${extUserId3}"
      }
    ]
  }'
```

##### Response

```http
HTTP/1.1 202 Accepted
Content-Type: application/json
```

### List active Identity Source Sessions

<ApiOperation method="get" url="/api/v1/identity-sources/${identitySourceId}/sessions" />

Lists all active Identity Source Sessions for an identity source. An Identity Source Session with a `CREATED` or `TRIGGERED` status is considered active.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `identitySourceId`  | String | The identity source ID obtained from creating a Custom Identity Source integration in Okta |

#### Response body

List of active [Identity Source Session](#identity-source-session-object) objects

##### Possible errors

See [Possible common errors](#possible-common-errors) for all Identity Sources API endpoints.

#### Use example

This request returns a list of active Identity Source Sessions for the identity source with an `id` value of `${identitySourceId}`:

##### Request

```bash
curl -L -X GET 'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions' \
-H 'Authorization: SSWS ${apiToken}' \
-H 'Accept: application/json' \
-H 'Content-Type: application/json'
```

##### Response

```json
[
  {
    "id": "{sessionId1}",
    "identitySourceId": "{identitySourceId}",
    "status": "CREATED",
    "importType": "INCREMENTAL"
  },
  {
    "id": "{sessionId2}",
    "identitySourceId": "{identitySourceId}",
    "status": "TRIGGERED",
    "importType": "INCREMENTAL"
  },
  {
    "id": "{sessionId3}",
    "identitySourceId": "{identitySourceId}",
    "status": "TRIGGERED",
    "importType": "INCREMENTAL"
  }
]
```
### Retrieve an Identity Source Session

<ApiOperation method="get" url="/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}" />

Retrieves an Identity Source Session by its ID

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `identitySourceId`  | String | The identity source ID obtained from creating a Custom Identity Source integration in Okta |
| `sessionId`  | String | The ID for the Identity Source Session to retrieve |

#### Response body

The requested [Identity Source Session object](#identity-source-session-object)

##### Possible errors

See [Possible common errors](#possible-common-errors) for all Identity Sources API endpoints.

#### Use example

This request retrieves an Identity Source Session with an `id` value of `${sessionId}`:

##### Request

```bash
curl -X GET 'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}' \
-H 'accept: application/json' \
-H 'authorization: SSWS ${apiToken}' \
-H 'cache-control: no-cache' \
-H 'content-type: application/json'
```

##### Response

```json
{
  "id": "{sessionId}",
  "identitySourceId": "{identitySourceId}",
  "status": "CREATED",
  "importType": "INCREMENTAL"
}
```

### Trigger an Identity Source Session

<ApiOperation method="post" url="/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}/start-import" />

Triggers the import process of loaded data in an Identity Source Session into Okta

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `identitySourceId`  | String | The identity source ID obtained from creating a Custom Identity Source integration in Okta |
| `sessionId`  | String | The ID for the Identity Source Session to process |

#### Response body

Returns the triggered [Identity Source Session](#identity-source-session-object) object

##### Possible errors

See [Possible common errors](#possible-common-errors) for all Identity Sources API endpoints. The following are possible errors specific to this endpoint:

| Error code  | HTTP code    | Description    |
| ----------- | -----------  | -------------- |
| `E0000001` | 400 Bad Request | The Identity Source Session was already triggered and doesn't have the `CREATED` status. |

#### Use example

This request triggers the data import process for an Identity Source Session with an `id` value of `${sessionId}`:

##### Request

```bash
curl -X POST 'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}/start-import' \
-H 'accept: application/json' \
-H 'authorization: SSWS ${apiToken}' \
-H 'cache-control: no-cache' \
-H 'content-type: application/json'
```

##### Response

```json
{
  "id": "{sessionId}",
  "identitySourceId": "{identitySourceId}",
  "status": "TRIGGERED",
  "importType": "INCREMENTAL"
}
```

### Cancel an Identity Source Session

<ApiOperation method="delete" url="/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}" />

Deletes all the loaded bulk data in an Identity Source Session and cancels the session for further activity. You can only cancel Identity Source Sessions with the `CREATED` status.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `identitySourceId`  | String | The identity source ID obtained from creating a Custom Identity Source integration in Okta |
| `sessionId`  | String | The ID for the Identity Source Session to cancel |

#### Response body

None

##### Possible errors

See [Possible common errors](#possible-common-errors) for all Identity Sources API endpoints. The following are possible errors specific to this endpoint:

| Error code  | HTTP code    | Description    |
| ----------- | -----------  | -------------- |
| `E0000001` | 400 Bad Request | The Identity Source Session to cancel doesn't have the `CREATED` status. Only sessions with the `CREATED` status can be canceled. |

#### Use example

The following request cancels an Identity Source Session with an `id` value of `${sessionId}`:

##### Request

```bash
curl -X DELETE 'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}' \
-H 'accept: application/json' \
-H 'authorization: SSWS ${apiToken}' \
-H 'cache-control: no-cache' \
-H 'content-type: application/json'
```

##### Response

```http
HTTP/1.1 204 No Content
Content-Type: application/json
```

## Identity Sources API objects

### Identity Source Session object

#### Identity Source Session properties

| Property    | Type           | Description   |
| ----------- | -------------- | ------------- |
| `id` | String | Unique identifier for the Identity Source Session |
| `identitySourceId` | String | Unique identifier obtained from creating a Custom Identity Source integration in Okta |
| `status` | String (enum: `CREATED`, `TRIGGERED`, `COMPLETED`, `CLOSED`, `EXPIRED`) | The current status of the Identity Source Session:<br><ul><li>`CREATED`: This is a new Identity Source Session that hasn't been processed. You can upload bulk data in this stage.</li><li>`TRIGGERED`: Okta is processing the import data in this session. You can't load bulk data in this stage.</li><li>`COMPLETED`: The bulk data was processed and imported into Okta.</li><li>`CLOSED`: The Identity Source Session was canceled and isn't available for further activity.<li>`EXPIRED`: This Identity Source Session had the `CREATED` status and timed-out after 24 hours of inactivity.</li></ul>|
| `importType` | String (enum: `INCREMENTAL`) | The import type for the Identity Source Session. Currently, only `INCREMENTAL` is supported. |

#### Identity Source Session example

```json
{
  "id": "{sessionId}",
  "identitySourceId": "{identitySourceId}",
  "status": "CREATED",
  "importType": "INCREMENTAL"
}
```

### Identity Source User Profile For Upsert object

#### Identity Source User Profile For Upsert properties

| Property           | Type                           | Description               |
| ------------------ | ------------------------------ | ------------------------------ |
| `externalId`        | String                 | Unique identifier for the user in the external HR source |
| `profile`          | [Profile object](/docs/reference/api/users/#profile-object) | Contains a set of external user attributes and their values that are mapped to Okta standard and custom profile properties. See [Profile object](/docs/reference/api/users/#profile-object) and Declaration of a Custom Identity Source Schema in [Using anything as a source](https://help.okta.com/okta_help.htm?type=oie&id=ext-anything-as-a-source).  |

#### Identity Source User Profile For Upsert object example

```json
{
  "externalId": "{extUserId}",
  "profile": {
    "userName": "isaac.i.brock@example.com",
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.i.brock@example.com",
    "secondEmail": "ibrock.test@example.com",
    "mobilePhone": "555-123-4567",
    "homeAddress": "Kirkland, WA"
  }
}
```

### Identity Source User Profile For Delete object

#### Identity Source User Profile For Delete properties

| Property           | Type                           | Description               |
| ------------------ | ------------------------------ | ------------------------------ |
| `externalId`        | String                 | Unique identifier for the user in the external HR source |

#### Identity Source User Profile For Delete object example

```json
{
  "externalId": "${extUserId}"
}
```

### Possible common errors

The following are common errors for the Identity Sources API:

| Error code  | HTTP code    | Description    |
| ----------- | -----------  | -------------- |
| `E0000011` | 401 Unauthorized | The API token is invalid. |
| `E0000007` | 404 Not Found  | The Custom Identity Source integration ID is invalid. |
| `E0000001` | 400 Bad Request  | The Identity Source Session ID is invalid. |
-->