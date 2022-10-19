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

Returns an [Import Session object](#import-session-object)

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
-H 'Authorization: SSWS ${apiKey}' \
```

##### Response

```json
{
  "id": "uij4bjiw3eY00uuhR0g7",
  "identitySourceId": "0oa4bjizmkh7KAJau0g7",
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

None ???

#### Use example

This request upserts a set of external user profiles to the Import Session.

##### Request

```bash
curl -v -X POST \
???
```

##### Response

???

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

Returns ???

#### Use example

This request loads a set of external IDs for user deactivation

##### Request

```bash
curl -v -X POST \
???
```

##### Response

```json
{
???
}
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

The requested ??? object

#### Use example

This request...:

##### Request

```bash
curl -v -X GET \
???
```

##### Response

```json
{
  ???
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

A list of active [Import Session objects](#import-session-object)

#### Use example

This request...:

##### Request

```bash
curl -L -X GET 'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions' \
-H 'Authorization: SSWS ${apiKey}' \
-H 'Accept: application/json' \
-H 'Content-Type: application/json'  
```

##### Response

```json
[
   {
       "id": "uij4bjiw3eY00uuhR0g7",
       "identitySourceId": "0oa4bjizmkh7KAJau0g7",
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

Returns ???

#### Possible errors

??? This section is optional

Here you can provide a list of error IDs and their descriptions that are specific to this API.

| Error ID    | Description    |
| ----------- | -------------- |
| `propertyA` | A description  |
| `propertyB` | A description  |

#### Use example

##### Request

This request ???

```bash
???
```

##### Response

```json
{
 ???
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

N/A

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
???
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
| `status` | Enum: `CREATED`, `TRIGGERED`, `COMPLETED`, `CLOSED`, `EXPIRED` | The current status of the Import Session:<br><ul><li>CREATED: New Import Session that hasn't been processed. You can load bulk user data in this stage.</li><li>TRIGGERED: Okta is processing the import data in this session. You can't load bulk user data at this stage.</li><li>COMPLETED: The bulk user data was processed and imported into Okta.</li><li>CLOSED: The Import Session was cancelled and isn't available for further activity.<li>EXPIRED: This Import Session had the `CREATED` status and had timed-out after 24 hours of inactivity.</li></ul>|

#### Import Session example
 
```json
{
}
```

### External Profile object

#### External Profile properties

| Property           | Type                           | Description               |
| ------------------ | ------------------------------ | ------------------------------ |
| `externalId`        | String                 | The unique identifier for the user in the external HR source |
| `profile`          | [Profile object](#profile-object) | A short description ??? |

#### External Profile object example

```json
{
  ???
}
```

### Profile object

#### Profile properties

| Property           | Type                           | Description               |
| ------------------ | ------------------------------ | ------------------------------ |
| A list of attributes defined in ???       | ???                 | ??? |

#### Profile object example

```json
{
  ???
}
```