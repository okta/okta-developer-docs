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
* [Trigger an Import Session](#trigger-an-import-session)
* [Retrieve an Import Session](#retrieve-an-import-session)
* [Retrieve the active Import Session](#retrieve-the-active-import-session)
* [Close an Import Session](#close-an-import-session)

### Create an Import Session

<ApiOperation method="post" url="/api/v1/identity-sources/${identitySourceId}/sessions" />

Creates an Import Session object

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `identitySourceId`  | String | The ID obtained from creating a Customer Identity Source integration in Okta |

#### Response body

Returns an [Import Session object](#import-session-object)

#### Use example

This request creates an Import Session object:

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
| `entityType` | enum: USERS | The type of data to upsert into the session  |
| `profiles` | Array | An array of [Profile objects](#profile-object) |

#### Response body

None ???

#### Use example

This request upserts a set user profiles to the Import Session :

##### Request
```bash
curl -v -X POST \
```

##### Response

202 Accepted

### Bulk delete user data

<ApiOperation method="post" url="/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}/bulk-delete" />

Imports bulk user data for deletion in an Import Session for a specific identity source.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `identitySourceId`  | String | The ID obtained from creating a Customer Identity Source integration in Okta |
| `sessionId`  | String | The ID for the Import Session that user data is imported into |

#### Request body

| Property    | Type           | Description   |
| ----------- | -------------- | ------------- |
| `entityType` | enum: USERS | A description |
| `profiles` | Array | An array of [Profile](#profile-object) `externalId` properties |

#### Response body

Returns ???

#### Use example

This request creates a Profile object:

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

### Trigger an Import Session

<ApiOperation method="put" url="/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}/start-import" />

Triggers the import process of the user data in an Import Session into Okta.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `identitySourceId`  | String | The ID obtained from creating a Customer Identity Source integration in Okta |
| `sessionId`  | String | The ID for the Import Session to process |

#### Response body

Returns a ??? object

#### Use example

#### Possible errors

Here you can provide a list of error IDs and their descriptions that are specific to this API.
 
| Error ID    | Description    |
| ----------- | -------------- |
| `propertyA` | A description  |
| `propertyB` | A description  |

##### Request

This request would ...

```bash
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

N/A

#### Use example

The following request cancels an Import Session with an `id` value of `${sessionId}`.

#### Possible errors

Here you can provide a list of error IDs and their descriptions that are specific
to this API.

| Error ID    | Description    |
| ----------- | -------------- |
| `propertyA` | A description  |
| `propertyB` | A description  |

##### Request

```bash
Hello world
```

##### Response

```http
HTTP/1.1 204 No Content
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

The requested ??? object

#### Use example

This request...:

#### Possible errors

Here you can provide a list of error IDs and their descriptions that are specific
to this API.

| Error ID    | Description    |
| ----------- | -------------- |
| `propertyA` | A description  |
| `propertyB` | A description  |

##### Request

```bash
curl -v -X GET \
```

##### Response

```json
{
   "id": "uij4bjiw3eY00uuhR0g7",
   "identitySourceId": "0oa4bjizmkh7KAJau0g7",
   "status": "COMPLETED",
   "importType": "INCREMENTAL"
} 
```

##### Error response example

Here you can show any errors that are specific to this API. One error example per
section

```http
```

### Retrieve the active Import Session

<ApiOperation method="get" url="/api/v1/identity-sources/${identitySourceId}/sessions" />

Fetches the active Import Session for an identity source.

An Import Session with a `CREATED` or `TRIGGERED` status is considered active.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `identitySourceId`  | String | The ID obtained from creating a Customer Identity Source integration in Okta |

#### Response body

A list of requested [Import Session](#import-session-object)

#### Use example

This request...:

#### Possible errors

Here you can provide a list of error IDs and their descriptions that are specific to this API.

| Error ID    | Description    |
| ----------- | -------------- |
| `propertyA` | A description  |
| `propertyB` | A description  |

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

## Anything-as-a-Source API objects

### Import Session object

#### Import Session properties

| Property    | Type           | Description   |
| ----------- | -------------- | ------------- |
| `id` | JsonDataType | The unique identifier for the Import Session |
| `identitySourceId` | JsonDataType | The unique identifier obtained from creating a Customer Identity Source integration in Okta |
| `status` | Enum: CREATED, TRIGGERED, COMPLETED, CANCELLED, EXPIRED | The current state of the Import Session:<br><ul><li>CREATED: New Import Session that has not been processed. Bulk user data can be loaded in this state.</li><li>TRIGGERED: Okta is processing the import data in this session. No bulk user data can be loaded at this stage.</li><li>COMPLETED: The bulk user data has been processed and imported into Okta.</li><li>CANCELLED: The Import Session is cancelled and isn't available for further activity.<li>EXPIRED: The Import Session with the `CREATED` status has timed-out after 24 hours of inactivity</li></ul>|


#### Import Session example
 
```json
{
}
```

### Profile object

#### Profile properties

| Property           | Type                           | Description               
|
| ------------------ | ------------------------------ |
-----------------------------------------------------------------------------------
------------------------------ |
| `externalId`        | String                 | The unique identifier of the user in the external HR source             
|
| `profile`          | [Profile](#Profile-object) | A short description of this
object. If the object can be returned standalone, it should be documented
separately. |
| `object.PropertyA` | JsonDataType                | A description of a property
in a nested object |

#### Profile object example

```json
{
}
```
