---
title: User Types
category: management
---

# User Types API

The User Types API provides operations to manage User Types. See the [User Schema API reference](/docs/reference/api/schemas/#user-schema-operations) for information on managing the schemas associated with the User Types.

## Get started

Explore the User Types API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/519c04869c17079762f9)

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
    "id": "otyfnly5cQjJT9PnR0g4",
    "displayName": "Nootype",
    "name": "newtype",
    "description": "Custom user type",
    "createdBy": "00ufnlhzppWItClAI0g4",
    "lastUpdatedBy": "00ufnlhzppWItClAI0g4",
    "created": "2019-04-10T02:00:01.000Z",
    "lastUpdated": "2019-04-10T02:00:01.000Z",
    "default": false,
    "_links": {
      "schema": {
        "rel": "schema",
        "href": "https://{yourOktaDomain}/api/v1/meta/schemas/user/oscfnly5cQjJT9PnR0g4",
        "method": "GET"
      },
      "self": {
        "rel": "self",
        "href": "https://{yourOktaDomain}/api/v1/meta/types/user/otyfnly5cQjJT9PnR0g4",
        "method": "GET"
      }
    }
  },
  {
    "id": "otyfnjfba4ye7pgjB0g4",
    "displayName": "User",
    "name": "user",
    "description": "Okta user profile template with default permission settings",
    "createdBy": "00ufnlhzppWItClAI0g4",
    "lastUpdatedBy": "00ufnlhzppWItClAI0g4",
    "created": "2019-04-10T01:48:27.000Z",
    "lastUpdated": "2019-04-10T01:48:27.000Z",
    "default": true,
    "_links": {
      "schema": {
        "rel": "schema",
        "href": "https://{yourOktaDomain}/api/v1/meta/schemas/user/oscfnjfba4ye7pgjB0g4",
        "method": "GET"
      },
      "self": {
        "rel": "self",
        "href": "https://{yourOktaDomain}/api/v1/meta/types/user/otyfnjfba4ye7pgjB0g4",
        "method": "GET"
      }
    }
  }
]
```

### Get User Type (by ID or default)

<ApiOperation method="get" url="/api/v1/meta/types/user/${typeId}" />

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
  "id": "otyfnly5cQjJT9PnR0g4",
  "displayName": "Nootype",
  "name": "newtype",
  "description": "Custom user type",
  "createdBy": "00ufnlhzppWItClAI0g4",
  "lastUpdatedBy": "00ufnlhzppWItClAI0g4",
  "created": "2019-04-10T02:00:01.000Z",
  "lastUpdated": "2019-04-10T02:00:01.000Z",
  "default": false,
  "_links": {
    "schema": {
      "rel": "schema",
      "href": "https://{yourOktaDomain}/api/v1/meta/schemas/user/oscfnly5cQjJT9PnR0g4",
      "method": "GET"
    },
    "self": {
      "rel": "self",
      "href": "https://{yourOktaDomain}/api/v1/meta/types/user/otyfnly5cQjJT9PnR0g4",
      "method": "GET"
    }
  }
}
```

### Create User Type

<ApiOperation method="POST" url="/api/v1/meta/types/user/" />

Creates a new User Type. A `default` User Type is automatically created with your org, and you can add another nine User Types for a maximum of 10.

Okta periodically updates the default schema template used for new orgs. New User Types are based on the most up-to-date template. This means the properties that a new User Type is initialized with aren't necessarily the same properties that your default type received.

>**Note:** If you modified your default schema, those changes won't propagate into this new User Type.

##### Request parameters

| Parameter    | Description                                                      | Param Type | DataType | Required |
| ------------ | -----------------------------------------------------------------| ---------- | -------- | -------- |
| displayName  | The display name for the type                                    | Body       | string   |  TRUE    |
| name         | The name for the type. The name must start with A-Z or a-z and contain only A-Z, a-z, 0-9, or underscore (_) characters. This value becomes read-only after creation and can't be updated.     | Body       | string   |  TRUE    |
| description  | A human-readable description of the type | Body       | string   |  FALSE    |

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
  "id": "otyfnly5cQjJT9PnR0g4",
  "displayName": "Display Name for UI",
  "name": "aNewType",
  "description": "Any description that means something useful to you",
  "createdBy": "00ufnlhzppWItClAI0g4",
  "lastUpdatedBy": "00ufnlhzppWItClAI0g4",
  "created": "2019-04-10T02:00:01.000Z",
  "lastUpdated": "2019-04-10T02:00:01.000Z",
  "default": false,
  "_links": {
    "schema": {
      "rel": "schema",
      "href": "https://{yourOktaDomain}/api/v1/meta/schemas/user/oscfnly5cQjJT9PnR0g4",
      "method": "GET"
    },
    "self": {
      "rel": "self",
      "href": "https://{yourOktaDomain}/api/v1/meta/types/user/otyfnly5cQjJT9PnR0g4",
      "method": "GET"
    }
  }
}
```

### Replace User Type

<ApiOperation method="PUT" url="/api/v1/meta/types/user/${typeId}" />

Replaces an existing User Type. A PUT is a full replace operation. Only the `displayName` and `description` elements can be changed. The `name` of an existing User Type can't be changed.

The schema associated with this type isn't editable with this API. If you want to edit the schema, use the [schema update API](/docs/reference/api/schemas/#add-property-to-user-profile-schema).

##### Request parameters

| Parameter    | Description                                                      | Param Type | DataType | Required |
| ------------ | -----------------------------------------------------------------| ---------- | -------- | -------- |
| typeId       | The ID of the user type you want to replace                      | Path       | string   |  TRUE    |
| displayName  | The new display name for the type                                | Body       | string   |  TRUE    |
| name         | The name of the existing type                                    | Body       | string   |  TRUE    |
| description  | The new human-readable description of the type                   | Body       | string   |  TRUE    |

##### Response parameters

The updated [User Types](#user-type-object)

##### Request example

```bash
curl -s -X PUT -H "Content-Type: application/json" -H "Authorization: SSWS ${api_token}" https://${yourOktaDomain}/api/v1/meta/types/user/otyfnly5cQjJT9PnR0g4 -d '{
"description": "Updated description",
"displayName": "Updated Name for UI",
"name": "existingTypeName"
}'
```

##### Response example

```json
{
  "id": "otyfnly5cQjJT9PnR0g4",
  "displayName": "Updated Name for UI",
  "name": "existingTypeName",
  "description": "Updated description",
  "createdBy": "00ufnlhzppWItClAI0g4",
  "lastUpdatedBy": "00ufnlhzppWItClAI0g4",
  "created": "2019-04-10T02:00:01.000Z",
  "lastUpdated": "2019-04-10T02:00:01.000Z",
  "default": false,
  "_links": {
    "schema": {
      "rel": "schema",
      "href": "https://{yourOktaDomain}/api/v1/meta/schemas/user/oscfnly5cQjJT9PnR0g4",
      "method": "GET"
    },
    "self": {
      "rel": "self",
      "href": "https://{yourOktaDomain}/api/v1/meta/types/user/otyfnly5cQjJT9PnR0g4",
      "method": "GET"
    }
  }
}
```

### Update User Type

<ApiOperation method="POST" url="/api/v1/meta/types/user/${typeId}" />

Updates an existing User Type. A POST is a partial update. Only the `displayName` and `description` elements can be changed. The `name` of an existing User Type can't be changed.

The schema associated with this type isn't editable with this API. If you want to edit the schema, use the [schema update API](/docs/reference/api/schemas/#add-property-to-user-profile-schema).

##### Request parameters

| Parameter    | Description                                                      | Param Type | DataType | Required |
| ------------ | -----------------------------------------------------------------| ---------- | -------- | -------- |
| typeId       | The ID of the user type you want to update                       | Path       | string   |  TRUE    |
| displayName  | The new display name for the type                                | Body       | string   |  FALSE   |
| description  | The new human-readable description of the type                   | Body       | string   |  FALSE   |

##### Response parameters

The updated [User Types](#user-type-object)

##### Request example

```bash
curl -s -X POST -H "Content-Type: application/json" -H "Authorization: SSWS ${api_token}" https://${yourOktaDomain}/api/v1/meta/types/user/otyfnly5cQjJT9PnR0g4 -d '{
"displayName": "Updated Name for UI"
}'
```

##### Response example

```json
{
  "id": "otyfnly5cQjJT9PnR0g4",
  "displayName": "Updated Name for UI",
  "name": "existingTypeName",
  "description": "Any description that means something useful to you",
  "createdBy": "00ufnlhzppWItClAI0g4",
  "lastUpdatedBy": "00ufnlhzppWItClAI0g4",
  "created": "2019-04-10T02:00:01.000Z",
  "lastUpdated": "2019-04-10T02:00:01.000Z",
  "default": false,
  "_links": {
    "schema": {
      "rel": "schema",
      "href": "https://{yourOktaDomain}/api/v1/meta/schemas/user/oscfnly5cQjJT9PnR0g4",
      "method": "GET"
    },
    "self": {
      "rel": "self",
      "href": "https://{yourOktaDomain}/api/v1/meta/types/user/otyfnly5cQjJT9PnR0g4",
      "method": "GET"
    }
  }
}
```

### Delete User Type

<ApiOperation method="delete" url="/api/v1/meta/types/user/${typeId}" />

Deletes a User Type permanently. This operation isn't permitted for the default type or for any User Type that has existing users. After you delete a User Type, it can't be used as the type for new users, and it no longer counts against the limit of 10 User Types.

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

The [Create User](/docs/reference/api/users/#create-user-with-non-default-user-type) operation accepts a type specification as part of the request body. The specification is a map, but currently the only key permitted is `id`. The type specification is also added to the [User object](/docs/reference/api/users/#user-object), but after user creation, only an administrator can update the type by doing a [full replace of an existing user](/docs/reference/api/users/#update-user), not a partial update.

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
    "schema": {
      "rel": "schema",
      "href": "https://{yourOktaDomain}/api/v1/meta/schemas/user/oscfnly5cQjJT9PnR0g4",
      "method": "GET"
    },
    "self": {
      "rel": "schema",
      "href": "https://{yourOktaDomain}/api/v1/meta/types/user/otyfnly5cQjJT9PnR0g4",
      "method": "GET"
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
| created       | Timestamp when the User Type was created               | String (ISO-8601)                                              | FALSE    | FALSE  | TRUE     |
| lastUpdated   | Timestamp when the User Type was last updated          | String (ISO-8601)                                              | FALSE    | FALSE  | TRUE     |
| _links        | [Link relations](#links-object) for the User Type | [JSON HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |
