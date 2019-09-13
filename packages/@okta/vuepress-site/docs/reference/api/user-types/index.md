---
title: User Types
category: management
---

# User Types API
<ApiLifecycle access="ea" />

The User Types API provides operations to manage User Types. To manage the schemas associated with the User Types, refer to the [User Schema API reference](/docs/reference/api/schemas/#user-schema-operations) and see below for updates for this feature.

## User Types Operations

### Get all User Types

<ApiOperation method="GET" url="/api/v1/meta/types/user" />

Fetches all User Types in your org.

##### Request parameters

None

##### Response parameters

An array of fetched [User Types](#user-type-model)

##### Request example

```bash
curl -s -H "Authorization: SSWS ${api_token}" https://{yourOktaDomain}/api/v1/meta/types/user
```

##### Response example

```json
[
  {
    "_links": {
      "schema": {
        "href": "https://{yourOktaDomain}/api/v1/meta/schemas/user/oscfnly5cQjJT9PnR0g4",
        "method": "GET",
        "rel": "schema"
      },
      "self": {
        "href": "https://{yourOktaDomain}/api/v1/meta/types/user/otyfnly5cQjJT9PnR0g4",
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
        "href": "https://{yourOktaDomain}/api/v1/meta/schemas/user/oscfnjfba4ye7pgjB0g4",
        "method": "GET",
        "rel": "schema"
      },
      "self": {
        "href": "https://{yourOktaDomain}/api/v1/meta/types/user/otyfnjfba4ye7pgjB0g4",
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

This operation will fetch a User Type by ID. The special identifier `default` may be used to fetch the default User Type.

##### Request Parameters

None

##### Response parameters

The fetched [User Type](#user-type-model)

##### Request Example

```bash
curl -s -H "Authorization: SSWS ${api_token}" https://{yourOktaDomain}/api/v1/meta/types/user/${typeId}
```

##### Response Example

```json
{
  "_links": {
    "schema": {
      "href": "https://{yourOktaDomain}/api/v1/meta/schemas/user/oscfnly5cQjJT9PnR0g4",
      "method": "GET",
      "rel": "schema"
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/meta/types/user/otyfnly5cQjJT9PnR0g4",
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

Creates a new User Type. A `default` User Type is automatically created along with your org, and you may add another 9 User Types for a maximum of 10.

Okta periodically updates the default schemas for new orgs, and new User Types will be based on the most up to date schema. This means that the schema associated with a new User Type is initialized with the same set of properties as a newly-created default User Type. This is not necessarily the same as the properties your default type received (if it was created a long time ago).

Note: If you have modified your default schema, those changes will not propagate into this new User Type.

##### Request Parameters

The [User Type](#user-type-model) you wish to create

##### Response parameters

The created [User Type](#user-type-model)

##### Request Example

```bash
curl -s -XPOST -H "Content-Type: application/json" -H "Authorization: SSWS ${api_token}" https://{yourOktaDomain}/api/v1/meta/types/user -d '{
"description": "Any description that means something useful to you",
"displayName": "Display Name for UI",
"name": "aNewType"
}'
```

##### Response Example

```json
{
  "_links": {
    "schema": {
      "href": "https://{yourOktaDomain}/api/v1/meta/schemas/user/oscfnly5cQjJT9PnR0g4",
      "method": "GET",
      "rel": "schema"
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/meta/types/user/otyfnly5cQjJT9PnR0g4",
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

Updates an existing User Type. A PUT is a full replace operation; a POST is a partial update. The schema associated with this type is not editable with this API. If you want to edit the schema, use the [schema update API](/docs/reference/api/schemas/#add-property-to-user-profile-schema).

##### Request Parameters

The [User Type](#user-type-model) you wish to update

##### Response parameters

The updated [User types](#user-type-model)

##### Request Example

```bash
curl -s -XPUT -H "Content-Type: application/json" -H "Authorization: SSWS ${api_token}" https://{yourOktaDomain}/api/v1/meta/types/user/otyfnly5cQjJT9PnR0g4 -d '{
"description": "Updated description",
"displayName": "Updated Name for UI",
"name": "updatedTypeName"
}'
```

##### Response Example

```json
{
  "_links": {
    "schema": {
      "href": "https://{yourOktaDomain}/api/v1/meta/schemas/user/oscfnly5cQjJT9PnR0g4",
      "method": "GET",
      "rel": "schema"
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/meta/types/user/otyfnly5cQjJT9PnR0g4",
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

Deletes a User Type permanently. This operation is not permitted for the default type, nor if there are non-deleted users with the specified type. After a User Type has been deleted, it cannot be used as the type for new users, and it no longer counts against the limit of 10 User Types.

##### Request Parameters

| Parameter | Description                                                                           | Param Type | DataType | Required | Default |
| --------- | ------------------------------------------------------------------------------------- | ---------- | -------- | -------- | ------- |
| typeId    | `id` of user type                                                                     | URL        | String   | TRUE     |         |

##### Response Parameters

None.

Passing an invalid `typeId` returns a `404 Not Found` status code with error code `E0000007`.

Passing the id of the default type returns a `403 Forbidden` status code with error code `E0000142` and a `reason` of `PROHIBITED`.

Passing the id of a type for which non-deleted users exist returns a `403 Forbidden` status code with error code `E0000142` and a `reason` of `UNMET_REQUIREMENTS`.

##### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/meta/types/user/otyfnly5cQjJT9PnR0g4"
```

##### Response Example


```http
HTTP/1.1 204 No Content
```

## Specify the User Type of a New User

The [Create User](/docs/reference/api/users/#create-user-with-non-default-user-type) operation accepts a type specification as part of the request body. The specification is a map, but currently the only key permitted is "id". The type specification is also added to the [User Model](/docs/reference/api/users/#user-model) (see [User object updates](#user-object-updates)), but after user creation the type is read-only.

##### Example

```json
  "type": {
    "id": "otyfnjfba4ye7pgjB0g4"
  }
```

## User Schema Operation Extensions to Non-Default Types

All operations documented under [User Schema Operations](/docs/reference/api/schemas/#user-schema-operations) will continue to operate as before. All these APIs now have an alternate form - replace the trailing `/default` with a schema ID - which will perform the relevant operation on the schema associated with any type.

Just as a schema is currently associated with a User Type, the schema ID is related to the type ID: replace the leading `oty` with `osc`. For example, a User Type with ID `oty1234567890abcdefg` would have a Schema ID of `osc1234567890abcdefg`.

In the future the linkage between Schema and User Type may be extended (for example, to allow multiple Types to share a Schema) but for now this is a 1:1 relationship.

### Example

With the existing Schemas API without User Types, if you want to add a new property to the schema you would make a POST to `/api/v1/meta/schemas/user/default` (updating the default because that is the only type).

With the User Types API, if you created a new type `oty1234567890abcdefg` and later wish to add a property to its schema, send a POST to the same endpoint, replacing `default` with the appropriate Schema ID: `/api/v1/meta/schemas/user/osc1234567890abcdefg`.

Everything else - body of the payload, return values, etc. - is the same as the [Schemas API](/docs/reference/api/schemas/).

## Linked Object endpoint updates

Linked Objects now apply to every User Type. If an org has the default type and 2 custom types, a Linked Object will be capable of linking a User of any of those 3 types to any other User. Each type sees exactly the same Linked Object definitions.

As such, the reference to `/default` in the Linked Objects URL is now deprecated. All old URLs from the [Linked Objects API](/docs/reference/api/linked-objects/) will continue to work for backwards compatibility purposes. But the operations now reside at the new URLs (formed by removing `/default`).

Deprecated URL: `/api/v1/meta/schemas/user/default/linkedObjects`
New URL: `/api/v1/meta/schemas/user/linkedObjects`

### Example

To create a Linked Object Definition, you can continue to POST to `/api/v1/meta/schemas/user/default/linkedObjects`.

You should POST to the new URL `/api/v1/meta/schemas/user/linkedObjects` instead.

Everything else - body of the payload, return values, etc. - is unchanged. This is simply a change of the URL endpoint.

## User object updates

When a User object is returned, some additional fields will return information about the User's type. The type ID will be returned as a new top-level entry in the JSON. Currently, Okta does not support changing the User Type of an existing User, and attempting to do so will result in an error. To change a User's type, the User object must be deleted and recreated with the desired type.

Two additional `_links` will be returned, one for the schema and another for the User Type. See example below.

```json
{
  "_links": {
    "activate": {
      "href": "https://{yourOktaDomain}/api/v1/users/00u6d60iOU2PvPYya0g4/lifecycle/activate",
      "method": "POST"
    },
    "schema": {
      "href": "https://{yourOktaDomain}/api/v1/meta/schemas/user/oscolnyE70oiSYul90g3"
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/users/00u6d60iOU2PvPYya0g4"
    },
    "type": {
      "href": "https://{yourOktaDomain}/api/v1/meta/types/user/otyolnyE70oiSYul90g3"
    }
  },
  "activated": null,
  "created": "2018-06-11T18:56:20.000Z",
  "credentials": {
    "...": "..."
  },
  "id": "00u6d60iOU2PvPYya0g4",
  "lastLogin": null,
  "lastUpdated": "2018-08-20T23:42:06.000Z",
  "passwordChanged": null,
  "profile": {
    "...": "..."
  },
  "status": "STAGED",
  "statusChanged": null,
  "type": {
    "id": "otyolnyE70oiSYul90g3"
  }
}
```

## User Type Model

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
      "href": "https://{yourOktaDomain}/api/v1/meta/types/user/otyfnly5cQjJT9PnR0g4"
    },
    "schema": {
      "href": "https://{yourOktaDomain}/api/v1/meta/schemas/user/oscfnly5cQjJT9PnR0g4"
    }
  }
}
```

### User Type Properties

The User Type model defines several properties:

| Property      | Description                                       | DataType                                                       | Nullable | Unique | Readonly |
| ------------- | ------------------------------------------------- | -------------------------------------------------------------- | -------- | ------ | -------- |
| id            | Unique key for the User Type                      | String                                                         | FALSE    | TRUE   | TRUE     |
| displayName   | The display name for the type                     | String                                                         | FALSE    | FALSE  | FALSE    |
| name          | The name for the type                             | String                                                         | FALSE    | TRUE   | FALSE    |
| description   | A human-readable description of the type          | String                                                         | FALSE    | FALSE  | FALSE    |
| createdBy     | The user id of the creator of this type           | String                                                         | FALSE    | FALSE  | TRUE     |
| lastUpdatedBy | The user id of the last user to edit this type    | String                                                         | FALSE    | FALSE  | TRUE     |
| default       | Boolean indicating if this type is the default    | Boolean                                                        | FALSE    | FALSE  | TRUE     |
| created       | Timestamp the User Type was created               | String (ISO-8601)                                              | FALSE    | FALSE  | TRUE     |
| lastUpdated   | Timestamp the User Type was last updated          | String (ISO-8601)                                              | FALSE    | FALSE  | TRUE     |
| _links        | [Link relations](#links-object) for the User Type | [JSON HAL](https://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |
