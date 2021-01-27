---
title: User Types
category: management
---

# User Types API

The User Types API provides operations to manage User Types. See [User Schema API reference](/docs/reference/api/schemas/#user-schema-operations) for information on managing the schemas associated with the User Types.

## Get started

Explore the User Types API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/7f16d9b7259fdf0f91f6)

## User Types operations

### Get all User Types

<ApiOperation method="GET" url="/api/v1/meta/types/user" />

Fetches all the User Types in your org

##### Request parameters

None

##### Response parameters

An array of fetched [User Types](#user-type-object)

##### Request example

```bash
curl -s -H "Authorization: SSWS ${api_token}" https://${yourOktaDomain}/api/v1/meta/types/user
```

##### Response example

```json
[
  {
    "_links": {
      "schema": {
        "href": "https://${yourOktaDomain}/api/v1/meta/schemas/user/oscfnly5cQjJT9PnR0g4",
        "method": "GET",
        "rel": "schema"
      },
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/meta/types/user/otyfnly5cQjJT9PnR0g4",
        "method": "GET",
        "rel": "self"
      }
    },
    "created": "2019-04-10T02:00:01.000Z",
    "createdBy": "00ufnlhzppWItClAI0g4",
    "default": false,
    "description": "Custom user type",
    "displayName": "Nootype",
    "id": "otyfnly5cQjJT9PnR0g4",
    "lastUpdated": "2019-04-10T02:00:01.000Z",
    "lastUpdatedBy": "00ufnlhzppWItClAI0g4",
    "name": "newtype",
    "ref": {
      "id": "otyfnly5cQjJT9PnR0g4",
      "refClass": "com.saasure.db.dto.platform.entity.cvd.CVDType"
    }
  },
  {
    "_links": {
      "schema": {
        "href": "https://${yourOktaDomain}/api/v1/meta/schemas/user/oscfnjfba4ye7pgjB0g4",
        "method": "GET",
        "rel": "schema"
      },
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/meta/types/user/otyfnjfba4ye7pgjB0g4",
        "method": "GET",
        "rel": "self"
      }
    },
    "created": "2019-04-10T01:48:27.000Z",
    "createdBy": "sprfniwUE2qTcNGP10g4",
    "default": true,
    "description": "Okta user profile template with default permission settings",
    "displayName": "User",
    "id": "otyfnjfba4ye7pgjB0g4",
    "lastUpdated": "2019-04-10T01:48:27.000Z",
    "lastUpdatedBy": "sprfniwUE2qTcNGP10g4",
    "name": "user",
    "ref": {
      "id": "otyfnjfba4ye7pgjB0g4",
      "refClass": "com.saasure.db.dto.platform.entity.cvd.CVDType"
    }
  }
]
```

### Get User Type (by ID or default)

<ApiOperation method="get" url="/api/v1/meta/types/user/{typeId}" />

Fetches a User Type by ID. Use the special identifier `default` to fetch the default User Type.

##### Request Parameters

None

##### Response parameters

The fetched [User Type](#user-type-object)

##### Request Example

```bash
curl -s -H "Authorization: SSWS ${api_token}" https://${yourOktaDomain}/api/v1/meta/types/user/${typeId}
```

##### Response Example

```json
{
  "_links": {
    "schema": {
      "href": "https://${yourOktaDomain}/api/v1/meta/schemas/user/oscfnly5cQjJT9PnR0g4",
      "method": "GET",
      "rel": "schema"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/meta/types/user/otyfnly5cQjJT9PnR0g4",
      "method": "GET",
      "rel": "self"
    }
  },
  "created": "2019-04-10T02:00:01.000Z",
  "createdBy": "00ufnlhzppWItClAI0g4",
  "default": false,
  "description": "Custom user type",
  "displayName": "Nootype",
  "id": "otyfnly5cQjJT9PnR0g4",
  "lastUpdated": "2019-04-10T02:00:01.000Z",
  "lastUpdatedBy": "00ufnlhzppWItClAI0g4",
  "name": "newtype",
  "ref": {
    "id": "otyfnly5cQjJT9PnR0g4",
    "refClass": "com.saasure.db.dto.platform.entity.cvd.CVDType"
  }
}
```

### Create User Type

<ApiOperation method="POST" url="/api/v1/meta/types/user/" />

Creates a new User Type. A `default` User Type is automatically created with your org, and you can add another nine User Types for a maximum of 10.

Okta periodically updates the default schema template used for new orgs. New User Types are based on the most up-to-date template. This means the properties that a new User Type is initialized with are not necessarily the same properties that your default type have received.

>**Note:** If you have modified your default schema, those changes are not going to propagate into this new User Type.

##### Request Parameters

The [User Type](#user-type-object) you want to create

##### Response parameters

The created [User Type](#user-type-object)

##### Request example

```bash
curl -s -XPOST -H "Content-Type: application/json" -H "Authorization: SSWS ${api_token}" https://${yourOktaDomain}/api/v1/meta/types/user -d '{
"description": "Any description that means something useful to you",
"displayName": "Display Name for UI",
"name": "aNewType"
}'
```

##### Response example

```json
{
  "_links": {
    "schema": {
      "href": "https://${yourOktaDomain}/api/v1/meta/schemas/user/oscfnly5cQjJT9PnR0g4",
      "method": "GET",
      "rel": "schema"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/meta/types/user/otyfnly5cQjJT9PnR0g4",
      "method": "GET",
      "rel": "self"
    }
  },
  "created": "2019-04-10T02:00:01.000Z",
  "createdBy": "00ufnlhzppWItClAI0g4",
  "default": false,
  "description": "Any description that means something useful to you",
  "displayName": "Display Name for UI",
  "id": "otyfnly5cQjJT9PnR0g4",
  "lastUpdated": "2019-04-10T02:00:01.000Z",
  "lastUpdatedBy": "00ufnlhzppWItClAI0g4",
  "name": "aNewType",
  "ref": {
    "id": "otyfnly5cQjJT9PnR0g4",
    "refClass": "com.saasure.db.dto.platform.entity.cvd.CVDType"
  }
}
```

### Update User Type

<ApiOperation method="PUT" url="/api/v1/meta/types/user/{typeId}" />

<ApiOperation method="POST" url="/api/v1/meta/types/user/{typeId}" />

Updates an existing User Type. A PUT is a full replace operation; a POST is a partial update. Only the `displayName` and `description` elements can be changed; the `name` of an existing User Type can't be changed.

The schema associated with this type isn't editable with this API. If you want to edit the schema, use the [schema update API](/docs/reference/api/schemas/#add-property-to-user-profile-schema).

##### Request parameters

The [User Type](#user-type-object) you want to update

##### Response parameters

The updated [User Type](#user-type-object)

##### Request example

```bash
curl -s -XPUT -H "Content-Type: application/json" -H "Authorization: SSWS ${api_token}" https://${yourOktaDomain}/api/v1/meta/types/user/otyfnly5cQjJT9PnR0g4 -d '{
"description": "Updated description",
"displayName": "Updated Name for UI",
"name": "updatedTypeName"
}'
```

##### Response example

```json
{
  "_links": {
    "schema": {
      "href": "https://${yourOktaDomain}/api/v1/meta/schemas/user/oscfnly5cQjJT9PnR0g4",
      "method": "GET",
      "rel": "schema"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/meta/types/user/otyfnly5cQjJT9PnR0g4",
      "method": "GET",
      "rel": "self"
    }
  },
  "created": "2019-04-10T02:00:01.000Z",
  "createdBy": "00ufnlhzppWItClAI0g4",
  "default": false,
  "description": "Any description that means something useful to you",
  "displayName": "TheDisplayName",
  "id": "otyfnly5cQjJT9PnR0g4",
  "lastUpdated": "2019-04-10T02:00:01.000Z",
  "lastUpdatedBy": "00ufnlhzppWItClAI0g4",
  "name": "aNewType",
  "ref": {
    "id": "otyfnly5cQjJT9PnR0g4",
    "refClass": "com.saasure.db.dto.platform.entity.cvd.CVDType"
  }
}
```

### Delete User Type

<ApiOperation method="delete" url="/api/v1/meta/types/user/${typeId}" />

Deletes a User Type permanently. This operation isn't permitted for the default type or for any User Type that has existing users. After a User Type has been deleted, it can't be used as the type for new users, and it no longer counts against the limit of 10 User Types.

##### Request parameters

| Parameter | Description                                                                           | Param Type | DataType | Required | Default |
| --------- | ------------------------------------------------------------------------------------- | ---------- | -------- | -------- | ------- |
| typeId    | `id` of the User Type                                                                     | URL        | String   | TRUE     |         |

##### Response parameters

None.

Passing an invalid `typeId` returns a `404 Not Found` status code with error code `E0000007`.

Passing the ID of the default type returns a `403 Forbidden` status code with error code `E0000142` and a `reason` of `PROHIBITED`.

Passing the ID of a type for which non-deleted users exist returns a `403 Forbidden` status code with error code `E0000142` and a `reason` of `UNMET_REQUIREMENTS`.

##### Request example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/meta/types/user/otyfnly5cQjJT9PnR0g4"
```

##### Response example


```http
HTTP/1.1 204 No Content
```

## Specify the User Type of a new user

The [Create User](/docs/reference/api/users/#create-user-with-non-default-user-type) operation accepts a type specification as part of the request body. The specification is a map, but currently, the only key permitted is `id`. The type specification is also added to the [User object](/docs/reference/api/users/#user-object), but after user creation, the type can only be updated by an administrator on a [full replace of an existing user](/docs/reference/api/users/#update-user), not a partial update.

##### Example

```json
  "type": {
    "id": "otyfnjfba4ye7pgjB0g4"
  }
```

## User Type object

### Example User Type

```json
{
  "id": "otyfnly5cQjJT9PnR0g4",
  "displayName": "Freelancer",
  "name": "Freelance Contractors",
  "description": "The road goes ever on and on",
  "createdBy": "00ubade0d00f1f73b234",
  "lastUpdatedBy": "00ubade0d00f1f73b234",
  "default": false,
  "created": "2013-07-02T21:36:25.344Z",
  "lastUpdated": "2013-07-02T21:36:25.344Z",
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/meta/types/user/otyfnly5cQjJT9PnR0g4"
    },
    "schema": {
      "href": "https://${yourOktaDomain}/api/v1/meta/schemas/user/oscfnly5cQjJT9PnR0g4"
    }
  }
}
```

### User Type Properties

The User Type object defines several properties:

| Property      | Description                                       | DataType                                                       | Nullable | Unique | Readonly |
| ------------- | ------------------------------------------------- | -------------------------------------------------------------- | -------- | ------ | -------- |
| id            | Unique key for the User Type                      | String                                                         | FALSE    | TRUE   | TRUE     |
| displayName   | The display name for the type                     | String                                                         | FALSE    | FALSE  | FALSE    |
| name          | The name for the type                             | String                                                         | FALSE    | TRUE   | TRUE     |
| description   | A human-readable description of the type          | String                                                         | FALSE    | FALSE  | FALSE    |
| createdBy     | The user ID of the creator of this type           | String                                                         | FALSE    | FALSE  | TRUE     |
| lastUpdatedBy | The user ID of the last user to edit this type    | String                                                         | FALSE    | FALSE  | TRUE     |
| default       | Boolean to indicate if this type is the default    | Boolean                                                        | FALSE    | FALSE  | TRUE     |
| created       | Timestamp that the User Type was created               | String (ISO-8601)                                              | FALSE    | FALSE  | TRUE     |
| lastUpdated   | Timestamp that the User Type was last updated          | String (ISO-8601)                                              | FALSE    | FALSE  | TRUE     |
| _links        | [Link relations](#links-object) for the User Type | [JSON HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |
