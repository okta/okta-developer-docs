---
title: Anything-as-a-Source (XaaS)
category: management
---
 
# Anything-as-a-Source (XaaS) API

<ApiLifecycle access="ea" />

The Okta Anything-as-a-Source (XaaS) API provides a mechanism to synchronize an HR source (the custom identity source) with Okta user profiles in an org. See [Build an XaaS custom client integration](https://6346d2bcc01af01731982563--reverent-murdock-829d24.netlify.app/docs/guides/anything-as-a-source/) for details.

## Get started

Explore the XaaS API: [![Run in Postman](https://run.pstmn.io/button.svg)](linkhere).

## Anything-as-a-Source API operations

The XaaS API has the following CRUD operations:

* [Create an Import Session](#create-an-import-session)
* [Bulk upsert user data](#bulk-upsert-user-data)
* [Bulk delete user data](#bulk-delete-user-data)
* [Retrieve an Import Session](#retrieve-an-import-session)
* [Retrieve the active Import Session](#retrieve-the-active-import-session)
* [Trigger an Import Session](#trigger-an-import-session)
* [Cancel an Import Session](#cancel-an-import-session)

### Create an Import Session

<ApiOperation method="post" url="/api/v1/identity-sources/${identitySourceId}/sessions" />

Creates an Import Session object

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `identitySourceId`  | String | The ID obtained from creating a Customer Identity Source integration in Okta |

#### Response body

Returns an [Import Session](#import-session-object) object

#### Possible errors

Here you can provide a list of error IDs and their descriptions that are specific to this API.

| Error ID    | Description    |
| ----------- | -------------- |
| `propertyA` | A description  |
| `propertyB` | A description  |

#### Use example

This request creates an Import Session object.

##### Request

```bash
curl -L -X POST 'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions' \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' \
-H 'Authorization: SSWS ${apiToken}' \
```

##### Response

```json
{
  "id": "${sessionId}",
  "identitySourceId": "${identitySourceId}",
  "status": "CREATED",
  "importType": "INCREMENTAL"
}
```

### Bulk upsert user data

<ApiOperation method="post" url="/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}/bulk-upsert" />

Loads bulk data into an Import Session for inserting or updating user profiles in Okta for a specific identity source

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `identitySourceId`  | String | The ID obtained from creating a Customer Identity Source integration in Okta |
| `sessionId`  | String | The ID for the Import Session to load user data |

#### Request body

| Property    | Type           | Description   |
| ----------- | -------------- | ------------- |
| `entityType` | enum: `USERS` | The type of data to upsert into the session. Currently, only `USERS` is supported.  |
| `profiles` | Array | An array of [External Profile objects](#external-profile-object) |

#### Response body

None

#### Use example

This request upserts a set of external user profiles to the Import Session:

##### Request

```bash
curl -X POST
https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions/{sessionId}/bulk-upsert
-H 'accept: application/json'
-H 'authorization: SSWS ${apiToken}'
-H 'cache-control: no-cache'
-H 'content-type: application/json'
-d '{
  "entityType": "USERS",
  "profiles": [
    {
      "externalId": "${extUserId111}}",
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

### Bulk delete user data

<ApiOperation method="post" url="/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}/bulk-delete" />

Loads bulk user data into an Import Session for deactivation

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `identitySourceId`  | String | The ID obtained from creating a Customer Identity Source integration in Okta |
| `sessionId`  | String | The ID for the Import Session to load deactivation user data |

#### Request body

| Property    | Type           | Description   |
| ----------- | -------------- | ------------- |
| `entityType` | enum: `USERS` | The type of data to bulk-delete in a session. Currently, only `USERS` is supported.  |
| `profiles` | Array | An array of external user IDs to deactivate (`externalId`) |

#### Response body

None

#### Use example

This request loads a set of external IDs for user deactivation

##### Request

```bash
curl -X POST
https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions/{sessionId}/bulk-delete
-H 'accept: application/json'
-H 'authorization: SSWS ${apiToken}'
-H 'cache-control: no-cache'
-H 'content-type: application/json'
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

### Retrieve an Import Session

<ApiOperation method="get" url="/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}" />

Retrieves an Import Session by its ID

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `identitySourceId`  | String | The ID obtained from creating a Customer Identity Source integration in Okta |
| `sessionId`  | String | The ID for the Import Session to retrieve |

#### Response body

The requested [Import Session](#import-session-object) object

#### Use example

This request retrieves an Import Session with ${sessionId} ID:

##### Request

```bash
curl -X GET
https://${yourOktaDomain}}/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}
-H 'accept: application/json'
-H 'authorization: SSWS ${apiToken}'
-H 'cache-control: no-cache'
-H 'content-type: application/json'
```

##### Response

```json
{
  "id": "${sessionId}",
  "identitySourceId": "${identitySourceId}",
  "status": "CREATED",
  "importType": "INCREMENTAL"
}
```

##### Error response example

Here you can show any errors that are specific to this API. One error example per
section

```http
???
```

### Retrieve the active Import Session

<ApiOperation method="get" url="/api/v1/identity-sources/${identitySourceId}/sessions" />

Fetches the active Import Session for an identity source. An Import Session with a `CREATED` or `TRIGGERED` status is considered active.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `identitySourceId`  | String | The ID obtained from creating a Customer Identity Source integration in Okta |

#### Response body

List of active [Import Session](#import-session-object) objects

#### Use example

This request returns a list of active Import Sessions for the identity source with ID `${identitySourceId}`.

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
       "id": "${sessionId}",
       "identitySourceId": "${identitySourceId}",
       "status": "CREATED",
       "importType": "INCREMENTAL"
   }
]
 
```

##### Error response example 

Here you can show any errors that are specific to this API. One error example per section

```http
Hello error
```

### Trigger an Import Session

<ApiOperation method="put" url="/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}/start-import" />

Triggers the import process of the user data in an Import Session into Okta.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `identitySourceId`  | String | The ID obtained from creating a Customer Identity Source integration in Okta |
| `sessionId`  | String | The ID for the Import Session to process |

#### Response body

Returns the triggered [Import Session](#import-session-object) object.

#### Possible errors

??? This section is optional

Here you can provide a list of error IDs and their descriptions that are specific to this API.

| Error ID    | Description    |
| ----------- | -------------- |
| `propertyA` | A description  |
| `propertyB` | A description  |

#### Use example

This request triggers the data import process for a session:

##### Request

```bash
curl -X PUT
https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}/start-import
-H 'accept: application/json'
-H 'authorization: SSWS ${apiToken}'
-H 'cache-control: no-cache'
-H 'content-type: application/json'
```

##### Response

```json
{
  "id": "${sessionId}",
  "identitySourceId": "${identitySourceId}",
  "status": "TRIGGERED",
  "importType": "INCREMENTAL"
}
```

### Cancel an Import Session

<ApiOperation method="delete" url="/api/v1//identity-sources/${identitySourceId}/sessions/${sessionId}" />

Deletes all the loaded bulk user data in an Import Session and cancels the session for further activity. Only Import Sessions with the `CREATED` status can be canceled.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `identitySourceId`  | String | The ID obtained from creating a Customer Identity Source integration in Okta |
| `sessionId`  | String | The ID for the Import Session to cancel |

#### Response body

None

#### Possible errors

Here you can provide a list of error IDs and their descriptions that are specific
to this API.

| Error ID    | Description    |
| ----------- | -------------- |
| `propertyA` | A description  |
| `propertyB` | A description  |

#### Use example

The following request cancels an Import Session with an `id` value of `${sessionId}`.

##### Request

```bash
curl -X DELETE
https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}
-H 'accept: application/json'
-H 'authorization: SSWS ${apiToken}'
-H 'cache-control: no-cache'
-H 'content-type: application/json'
```

##### Response

```http
HTTP/1.1 204 No Content
Content-Type: application/json
```

## Anything-as-a-Source API objects

### Import Session object

#### Import Session properties

| Property    | Type           | Description   |
| ----------- | -------------- | ------------- |
| `id` | String | The unique identifier for the Import Session |
| `identitySourceId` | String | The unique identifier obtained from creating a Customer Identity Source integration in Okta |
| `status` | Enum: `CREATED`, `TRIGGERED`, `COMPLETED`, `CLOSED`, `EXPIRED`, `ERROR` | The current status of the Import Session:<br><ul><li>CREATED: New Import Session that hasn't been processed. You can load bulk user data in this stage.</li><li>TRIGGERED: Okta is processing the import data in this session. You can't load bulk user data at this stage.</li><li>COMPLETED: The bulk user data was processed and imported into Okta.</li><li>CLOSED: The Import Session was cancelled and isn't available for further activity.<li>EXPIRED: This Import Session had the `CREATED` status and had timed-out after 24 hours of inactivity.</li><li>ERROR: The Import Session encountered an error during import data processing.</li></ul>|

#### Import Session example

```json
{
  "id": "${sessionId}",
  "identitySourceId": "${identitySourceId}",
  "status": "CREATED",
  "importType": "INCREMENTAL"
}
```

### External Profile object

#### External Profile properties

| Property           | Type                           | Description               |
| ------------------ | ------------------------------ | ------------------------------ |
| `externalId`        | String                 | The unique identifier for the user in the external HR source |
| `profile`          | [Profile object](/docs/reference/api/users/#profile-object) | Contains a set of standard and custom profile properties for a user.  |

#### External Profile object example

```json
{
  "externalId": "${extUserId}",
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
