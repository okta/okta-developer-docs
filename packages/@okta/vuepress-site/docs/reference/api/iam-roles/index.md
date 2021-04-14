---
title: Administrator Roles
category: management
meta:
  - name: description
    content: The Okta Administrator Roles API provides operations to manage administrative Role assignments for a User. Read this page to get started with Admin Roles.
---

# Administrator Roles API

The Okta Administrator Roles API provides operations to manage administrative Role assignments for a User.

This document contains the operations supported for [managing administrators using the existing generally available Role assignment APIs](#/docs/reference/api/roles) as well as the Beta Custom Role assignment APIs.

Role listing APIs provide a union of both standard and custom Roles assigned to a User or Group. We are, therefore, providing both groups of APIs and their intersections in this single doc, which will eventually replace the contents of the existing docs.

The following sections are added or updated:

* [Custom Role operations](#custom-role-operations)
* [Resource Set operations](#resource-set-operations)
* [Custom Role assignment operations](#custom-role-assignment-operations)
* [List Roles](#list-roles)
* [Assign a Custom Role to a User or Group](#assign-a-custom-role-to-a-user-or-group)
* [Unassign a Custom Role from a User or Group](#unassign-a-custom-role-from-a-user-or-group)
* [Role target operations](#role-target-operations)
* [Role properties](#role-properties)
* [Role links](#role-links)
* [Role types](#role-types)
* [Custom Role object](#custom-role-object)
* [Permission types](#permission-types)
* [Resource Set object](#resource-set-object)

## Get started

Explore the Administrator Roles API:  [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/4f1233beeef282acbcfb)

## Custom Role operations

<ApiLifecycle access="beta" />

These operations allow the creation and manipulation of custom Roles as custom collections of [permissions](#permission-types).

### Create Role

<ApiLifecycle access="beta" />

<ApiOperation method="post" url="/api/v1/iam/roles" />

Creates a new Role with a custom set of permissions

#### Request parameters

| Parameter   | Description                               | Param Type   | DataType                    | Required |
| :---------- | :---------------------------------------- | :----------- | :----------------------------------------------- | :------- |
| `label`       | The name given to the new Role                | Body         | String                                           | TRUE     |
| `description` | A description of the new Role             | Body         | String                                           | TRUE     |
| `permissions` | The permissions that the new Role grants  | Body         | Array of [Permission types](#permission-types)   | TRUE     |

#### Response parameters

A created Custom [Role](#custom-role-object)

#### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
      "label": "UserCreator",
      "description": "...",
      "permissions" [
        "okta.users.create",
        "okta.users.read",
        "okta.groups.read",
        "okta.users.profile.manage"
      ]
    }' "https://${yourOktaDomain}/api/v1/iam/roles"
```

#### Response example

```json
{
  "id": "cr0Yq6IJxGIr0ouum0g3",
  "label": "UserCreator",
  "description": "Create users",
  "created": "2021-02-06T16:20:57.000Z",
  "lastUpdated": "2021-02-06T16:20:57.000Z",
  "_links": {
    "permissions": {
      "href": "http://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions"
    },
    "self": {
      "href": "http://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
    }
  }
}
```

### Get Role

<ApiLifecycle access="beta" />

<ApiOperation method="get" url="/api/v1/iam/roles/${roleIdOrLabel}" />

Gets a Custom Role by its ID or label

#### Request parameters

| Parameter     | Description                          | Param Type   | DataType                    | Required |
| :------------ | :----------------------------------- | :----------- | :----------------------------------------------- | :------- |
| `roleIdOrLabel` | `id` or `label` of the Role          | URL          | String                                           | TRUE     |

#### Response parameters

The requested custom [Role](#custom-role-object)

#### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/iam/roles/UserCreator"
```

#### Response example

```json
{
  "id": "cr0Yq6IJxGIr0ouum0g3",
  "label": "UserCreator",
  "description": "Create users",
  "created": "2021-02-06T16:20:57.000Z",
  "lastUpdated": "2021-02-06T16:20:57.000Z",
  "_links": {
    "permissions": {
      "href": "http://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions"
    },
    "self": {
      "href": "http://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
    }
  }
}
```

### Update Role

<ApiLifecycle access="beta" />

<ApiOperation method="put" url="/api/v1/iam/roles/${roleIdOrLabel}" />

Updates a custom Role's label or description by its ID or label

#### Request parameters

| Parameter     | Description                          | Param Type   | DataType                    | Required |
| :------------ | :----------------------------------- | :----------- | :----------------------------------------------- | :------- |
| `roleIdOrLabel` | `id` or `label` of the Role          | URL          | String                                           | TRUE     |
| `label` | The updated label to apply to the Role          | URL          | String                                           | TRUE     |
| `description` | The updated description to apply to the Role          | URL          | String                                           | TRUE     |

#### Response parameters

The updated custom [Role](#custom-role-object)

#### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
      "label": "UserCreator-Updated",
      "description": "Create users",      
    }' \
"https://${yourOktaDomain}/api/v1/iam/roles/UserCreator"
```

#### Response example

```json
{
  "id": "cr0Yq6IJxGIr0ouum0g3",
  "label": "UserCreator-Updated",
  "description": "Create users",
  "created": "2021-02-06T16:20:57.000Z",
  "lastUpdated": "2021-02-08T16:20:57.000Z",
  "_links": {
    "permissions": {
      "href": "http://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions"
    },
    "self": {
      "href": "http://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
    }
  }
}
```

### List roles

<ApiLifecycle access="beta" />

<ApiOperation method="get" url="/api/v1/iam/roles" />

Gets a paginated list of Custom Roles

#### Response parameters

A paginated list of [custom Roles](#custom-role-object)

#### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/iam/roles"
```

#### Response example

```json
{
  "roles": [
    {
      "id": "cr0Yq6IJxGIr0ouum0g3",
      "label": "UserCreator",
      "description": "...",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "permissions": {
          "href": "http://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions"
        },
        "self": {
          "href": "http://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
        }
      }
    },
    {
      "id": "cr0Fw7HKcWIroo88m3r1",
      "label": "GroupMembershipManager",
      "description": "...",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "permissions": {
          "href": "http://${yourOktaDomain}/api/v1/iam/roles/cr0Fw7HKcWIroo88m3r1/permissions"
        },
        "self": {
          "href": "http://${yourOktaDomain}/api/v1/iam/roles/cr0Fw7HKcWIroo88m3r1"
        }
      }
    }
  ],
  "_links": {
    "next": {
      "href": "http://${yourOktaDomain}/api/v1/iam/roles?after=cr0Fw7HKcWIroo88m3r1"
    }
  }
}
```

### List permissions

<ApiLifecycle access="beta" />

<ApiOperation method="get" url="/api/v1/iam/roles/${roleIdOrLabel}/permissions" />

Gets the list of permissions included in a custom Role identified by its `id` or `label`

#### Request parameters

| Parameter     | Description                          | Param Type   | DataType                                         | Required |
| :------------ | :----------------------------------- | :----------- | :----------------------------------------------- | :------- |
| `roleIdOrLabel` | `id` or `label` of the Role          | URL          | String                                           | TRUE     |

#### Response parameters

An array of [Permission types](#permission-types) that identifies the Role by `${roleIdOrLabel}` and provides a link to that Role

#### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions"
```

#### Response example

```json
{
  "permissions": [
    { 
      "label" : "okta.users.create",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "role": {
          "href": "https://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
        },
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions/okta.users.create"
        }
      }
    },
    { 
      "label" : "okta.users.read",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "role": {
          "href": "https://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
        },
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions/okta.users.read"
        }
      }
    },    
    { 
      "label" : "okta.groups.read",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "role": {
          "href": "https://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
        },
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions/okta.groups.read"
        }
      }
    },
    { 
      "label" : "okta.users.profile.manage",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "role": {
          "href": "https://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
        },
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions/okta.users.profile.manage"
        }
      }
    }    
  ],  
}
```

### Add permission

<ApiLifecycle access="beta" />

<ApiOperation method="post" url="/api/v1/iam/roles/${roleIdOrLabel}/permissions/${permissionType}" />

Adds a new permission to an existing Role

#### Request parameters

| Parameter      | Description                          | Param Type   | DataType                              | Required |
| :------------- | :----------------------------------- | :----------- | :------------------------------------ | :------- |
| `roleIdOrLabel`  | `id` or `label` of the Role          | URL          | String                                | TRUE     |
| `permissionType` | Permission to add to the Role        | URL          | [Permission type](#permission-types) | TRUE     |

#### Response parameters

``` http
HTTP/1.1 204 No Content
```

#### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions/okta.users.manage"
```

#### Response example

``` http
HTTP/1.1 204 No Content
```

### Get permission
Gets an existing permission from an existing Role

<ApiLifecycle access="beta" />

<ApiOperation method="get" url="/api/v1/iam/roles/${roleIdOrLabel}/permissions/${permissionType}" />

Gets a permission from an existing Role

#### Request parameters

| Parameter      | Description                          | Param Type   | DataType                              | Required |
| :------------- | :----------------------------------- | :----------- | :------------------------------------ | :------- |
| `roleIdOrLabel`  | `id` or `label` of the Role          | URL          | String                                | TRUE     |
| `permissionType` | Permission to retrieve from the Role        | URL          | [Permission type](#permission-types) | TRUE     |

#### Response parameters

The requested permission object

#### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions/okta.users.manage"
```

#### Response example

```json
{ 
  "label" : "okta.users.manage",
  "created": "2021-02-06T16:20:57.000Z",
  "lastUpdated": "2021-02-06T16:20:57.000Z",
  "_links": {
    "role": {
      "href": "https://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions/users.manage"
    }
  }
}
```


### Delete permission

<ApiLifecycle access="beta" />

<ApiOperation method="delete" url="/api/v1/iam/roles/${roleIdOrLabel}/permissions/${permissionType}" />

Deletes a permission from an existing Role

#### Request parameters

| Parameter      | Description                          | Param Type   | DataType                              | Required |
| :------------- | :----------------------------------- | :----------- | :------------------------------------ | :------- |
| `roleIdOrLabel`  | `id` or `label` of the Role          | URL          | String                                | TRUE     |
| `permissionType` | Permission to remove from the Role   | URL          | [Permission type](#permission-types)) | TRUE     |

#### Response parameters

``` http
HTTP/1.1 204 No Content
```

#### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions/okta.users.manage"
```

#### Response example

``` http
HTTP/1.1 204 No Content
```

### Delete Role

<ApiLifecycle access="beta" />

<ApiOperation method="delete" url="/api/v1/iam/roles/${roleIdOrLabel}" />

Deletes a custom Role

#### Request parameters

| Parameter       | Description                          | Param Type   | DataType                              | Required |
| :-------------- | :----------------------------------- | :----------- | :------------------------------------ | :------- |
| `roleIdOrLabel`   | `id` or `label` of the Role          | URL          | String                                | TRUE     |

#### Response parameters

``` http
HTTP/1.1 204 No Content
```

#### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/iam/roles/UserCreator"
```

#### Response example

``` http
HTTP/1.1 204 No Content
```

## Resource set operations

<ApiLifecycle access="beta" />

These operations allow the creation and manipulation of Resource Sets as custom collections of resources. You can use Resource Sets to assign [Custom Roles](#custom-role-operations) to administrators who are scoped to the designated resources.

### Create Resource Set

<ApiLifecycle access="beta" />

<ApiOperation method="post" url="/api/v1/iam/resource-sets" />

Creates a new Resource Set with a custom set of resources

#### Request parameters

| Parameter   | Description                                                                    | Param Type   | DataType     | Required |
| :---------- | :----------------------------------------------------------------------------- | :----------- | :----------- | :------- |
| `label`       | Unique name given to the new Resource Set                                      | Body         | String       | TRUE     |
| `description` | A description of the new Resource Set                                          | Body         | String       | TRUE     |
| `resources`   | The endpoints that reference the resources to be included in the new Resource Set | Body         | Array of URL | FALSE    |

#### Response parameters

The created [Resource Set](#resource-set-object)

#### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
      "label": "SF-IT-People",
      "description": "People in the IT department of San Francisco",
      "resources": [
        "https://${yourOktaDomain}/api/v1/groups/00guaxWZ0AOa5NFAj0g3",
        "https://${yourOktaDomain}/api/v1/groups/00gu67DU2qNCjNZYO0g3/users",
        "https://${yourOktaDomain}/api/v1/users"        
      ]
    }' "https://${yourOktaDomain}/api/v1/iam/resource-sets"
```

#### Response example

```json
{
  "id": "iamoJDFKaJxGIr0oamd9g",
  "label": "SF-IT-People",
  "description": "People in the IT department of San Francisco",
  "created": "2021-02-06T16:20:57.000Z",
  "lastUpdated": "2021-02-06T16:20:57.000Z",
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
    },
    "resources": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/resources"
    },
    "bindings": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings"
    }
  }
}
```

### Get Resource Set

<ApiLifecycle access="beta" />

<ApiOperation method="get" url="/api/v1/iam/resource-sets/${resourceSetId}" />

Gets a Resource Set by its ID

#### Request parameters

| Parameter     | Description                          | Param Type   | DataType                    | Required |
| :------------ | :----------------------------------- | :----------- | :----------------------------------------------- | :------- |
| `resourceSetId` | Unique ID of the Resource Set        | URL          | String                                           | TRUE     |

#### Response parameters

The requested [Resource Set](#resource-set-object)

#### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
```

#### Response example

```json
{
  "id": "iamoJDFKaJxGIr0oamd9g",
  "label": "SF-IT-People",
  "description": "People in the IT department of San Francisco",
  "created": "2021-02-06T16:20:57.000Z",
  "lastUpdated": "2021-02-06T16:20:57.000Z",
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
    },
    "resources": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/resources"
    },
    "bindings": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings"
    }
  }
}
```

### List resource sets

<ApiLifecycle access="beta" />

<ApiOperation method="get" url="/api/v1/iam/resource-sets}" />

Gets a paginated list of Resource Sets

#### Response parameters

A paginated list of [Resource Sets](#resource-set-object)

#### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/iam/resource-sets"
```

#### Response example

```json
{
  "resource-sets": [
    {
      "id": "iamoJDFKaJxGIr0oamd9g",
      "label": "SF-IT-1",
      "description": "...",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
        },
        "resources": {
          "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/resources"
        },
        "bindings": {
          "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings"
        }
      }
    },
    {
      "id": "iamoJDFKaJxGIr0oamd0q",
      "label": "SF-IT-2",
      "description": "...",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd0q"
        },
        "resources": {
          "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd0q/resources"
        },
        "bindings": {
          "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd0q/bindings"
        }
      }
    }
  ],
  "_links": {
    "next": {
      "href": "http://${yourOktaDomain}/api/v1/iam/resource-sets?after=iamoJDFKaJxGIr0oamd0q"
    }
  }
}
```

### Update resource set

<ApiLifecycle access="beta" />

<ApiOperation method="put" url="/api/v1/iam/resource-sets/${resourceSetId}" />

Updates the label and description of a Resource Set

#### Request parameters

| Parameter     | Description                               | Param Type   | DataType     | Required |
| :------------ | :---------------------------------------- | :----------- | :----------- | :------- |
| `resourceSetId` | Unique ID of the Resource Set             | URL          | String       | TRUE     |
| `label`         | New unique name given to the Resource Set | Body         | String       | TRUE     |
| `description`   | New description of the the Resource Set   | Body         | String       | TRUE     |

#### Response parameters

An updated [Resource Set](#resource-set-object)

#### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
      "label": "SF-IT-Staff",
      "description": "Staff in the IT department of San Francisco"
    }' "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
```

#### Response example

```json
{
  "id": "iamoJDFKaJxGIr0oamd9g",
  "label": "SF-IT-Staff",
  "description": "Staff in the IT department of San Francisco",
  "created": "2021-02-06T16:20:57.000Z",
  "lastUpdated": "2021-02-07T16:20:57.000Z",
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
    },
    "resources": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/resources"
    },
    "bindings": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings"
    }
  }
}
```

### Delete resource set

<ApiLifecycle access="beta" />

<ApiOperation method="delete" url="/api/v1/iam/resource-sets/${resourceSetId}" />

Deletes a Resource Set and all its associated Bindings

#### Request parameters

| Parameter      | Description                          | Param Type   | DataType                              | Required |
| :------------- | :----------------------------------- | :----------- | :------------------------------------ | :------- |
| `resourceSetId`  | ID of the Resource Set             | URL          | String                                | TRUE     |

#### Response parameters

``` http
HTTP/1.1 204 No Content
```

#### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
```

#### Response example

``` http
HTTP/1.1 204 No Content
```

### Resource operations

These operations add, remove, and list the resources within a Resource Set.

#### Add more resources

<ApiLifecycle access="beta" />

<ApiOperation method="patch" url="/api/v1/iam/resource-sets/${resourceSetId}/resources" />

Adds more resources to a Resource Set

##### Request parameters

| Parameter      | Description                                                                       | Param Type   | DataType     | Required |
| :------------- | :----------------------------------------------------------------------------- | :----------- | :----------- | :------- |
| `resourceSetId`  | ID of the Resource Set                                                       | URL          | String       | TRUE     |
| `additions`      | The endpoints that reference the resources to be included in the new Resource Set | Body         | Array of URL | TRUE     |

##### Response parameters

The following `_links` are returned:

* `resources` gets a paginable list of resources included in the set
* `resource-set` gets the updated Resource Set

##### Request example

```bash
curl -v -X PATCH \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
      "additions": [
        "https://${yourOktaDomain}/api/v1/groups/00guaxWZ0AOa5NFAj0g3",
        "https://${yourOktaDomain}/api/v1/groups/00gu67DU2qNCjNZYO0g3/users",
      ]
    }' "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/resources"
```

##### Response example

```json
{
  "_links": {
    "resources": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/resources"
    },
    "resource-set": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
    }
  }
}
```

#### List resources

<ApiLifecycle access="beta" />

<ApiOperation method="get" url="/api/v1/iam/resource-sets/${resourceSetId}/resources" />

Lists the resources that make up a Resource Set

##### Request parameters

| Parameter   | Description                                                                       | Param Type   | DataType     | Required |
| :------------- | :------------------------ | :----------- | :----------- | :------- |
| `resourceSetId`  | ID of the Resource Set  | URL          | String       | TRUE     |

##### Response parameters

A paginated array of [resources](#resource-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/resources"
```

##### Response example

```json
{
  "resources": [
    {
      "id": "ire106sQKoHoXXsAe0g4",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/groups/00guaxWZ0AOa5NFAj0g3"
        }
      }
    },
    {
      "id": "ire106riDrTYl4qA70g4",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/groups/00gu67DU2qNCjNZYO0g3/users"
        }
      }
    },
    {
      "id": "irezvo4AwE2ngpMw40g3",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "users": {
          "href": "https://${yourOktaDomain}/api/v1/users"
        },
        "groups": {
          "href": "https://${yourOktaDomain}/api/v1/groups"
        }
      }
    }
  ],
  "_links": {
    "next": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/resources?after=irezvn1ZZxLSIBM2J0g3"
    },
    "resource-set": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
    }
  }
}
```

#### Delete a resource

<ApiLifecycle access="beta" />

<ApiOperation method="delete" url="/api/v1/iam/resource-sets/${resourceSetId}/resources/${resourceId}" />

Removes a resource from a Resource Set

##### Request parameters

| Parameter      | Description                             | Param Type   | DataType     | Required |
| :------------- | :-------------------------------------- | :----------- | :----------- | :------- |
| `resourceSetId`  | ID of the Resource Set                  | URL          | String       | TRUE     |
| `resourceId`     | ID of the resource within the Resource Set  | URL          | String       | TRUE     |

`resourceId` is the ID obtained when [resources are listed within the Resource Set](#list-resources). For example, if the resource object is:

```json
    {
      "id": "ire106sQKoHoXXsAe0g4",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/groups/00guaxWZ0AOa5NFAj0g3"
        }
      }
    }
```

then `ire106sQKoHoXXsAe0g4` could be used as `resourceId` to remove the Groups from the list of resources in the set.

##### Response parameters

``` http
HTTP/1.1 204 No Content
```

##### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/resources/ire106sQKoHoXXsAe0g4"
```

##### Response example

``` http
HTTP/1.1 204 No Content
```

## Custom Role assignment operations

<ApiLifecycle access="beta" />

These operations allow the assignment and unassignment of Custom Roles. This is done by creating a Binding.
A Binding represents an association of a principal, Role, and Resource Set that is uniquely identified by the `bindingId`.

### Create a new Binding

<ApiLifecycle access="beta" />

<ApiOperation method="post" url="/api/v1/iam/resource-sets/${resourceSetId}/bindings" />

Assigns a Custom Role by creating a Binding between the Role and the admin that targets an existing Resource Set

#### Request parameters

| Parameter      | Description                                                   | Param Type    | DataType       | Required |
| :------------- | :------------------------------------------------------------ | :------------ | :------------- | :------- |
| `role`           | ID of the Role                                              | Body          | String         | TRUE     |
| `members`        | The hrefs that point to User(s) and/or Group(s) that receive the Role  | Body          | Array of hrefs | TRUE     |

#### Response parameters

The following `_links` are returned:

* `self` gets this Role's Binding within the Resource Set
* `bindings` get a paginable list of Role Bindings in the Resource Set
* `resource-set` gets the Resource Set

#### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
      "role": "cr0Yq6IJxGIr0ouum0g3",
      "members": [
        "https://${yourOktaDomain}/api/v1/groups/00guaxWZ0AOa5NFAj0g3"
      ]
}' "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings"
```

#### Response example

```json
{
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0Yq6IJxGIr0ouum0g3"
    },
    "bindings": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings"
    },
    "resource-set": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
    }
  }
}
```

### Add more Members to a Binding

<ApiLifecycle access="beta" />

<ApiOperation method="patch" url="/api/v1/iam/resource-sets/${resourceSetId}/bindings/${roleId}/members" />

Adds more Members to a Role Binding already created in a Resource Set

#### Request parameters

| Parameter      | Description                                                           | Param Type   | DataType       | Required |
| :------------- | :-------------------------------------------------------------------- | :----------- | :------------- | :------- |
| `resourceSetId`  | ID of the target Resource Set                                       | URL          | String         | TRUE     |
| `roleId`         | ID of the Role to grant                                         | URL          | String         | TRUE     |
| `additions`      | Array of hrefs that point to the User(s) and/or Group(s) that receive the Role | Body         | Array of hrefs | TRUE     |

#### Response parameters

The following `_links` are returned:

* `self` gets this Role's Binding within the Resource Set
* `bindings` get a paginable list of Role Bindings in the Resource Set
* `resource-set` gets the Resource Set

#### Request example

```bash
curl -v -X PATCH \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
      "additions": [
        "https://${yourOktaDomain}/api/v1/groups/00guaxWZ0AOa5NFAj0g3",
        "https://${yourOktaDomain}/api/v1/users/00u67DU2qNCjNZYO0g3",
      ]
    }' "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0WxyzJxGIr0ouum0g4/members"
```

#### Response example

```json
{
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0Yq6IJxGIr0ouum0g3"
    },
    "bindings": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings"
    },
    "resource-set": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
    }
  }
}
```

### List Members in a Binding

<ApiLifecycle access="beta" />

<ApiOperation method="get" url="/api/v1/iam/resource-sets/${resourceSetId}/bindings/${roleId}/members" />

Gets a paginated list of Members that are assigned to a Role in a Resource Set

#### Request parameters

| Parameter      | Description                                                           | Param Type   | DataType       | Required |
| :------------- | :-------------------------------------------------------------------- | :----------- | :------------- | :------- |
| `resourceSetId`  | ID of the target Resource Set                                       | URL          | String         | TRUE     |
| `roleId`         | ID of the Role to identify the Binding                          | URL          | String         | TRUE     |

#### Response parameters

A paginated list of [Members](#member-object)

#### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0WxyzJxGIr0ouum0g4/members"
```

#### Response example

```json
{
  "members": [
    {
      "id": "irb1qe6PGuMc7Oh8N0g4",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/users/00uuk41Hjga5qGfQ30g3"
        }
      }
    }, {
      "id": "irb1q92TFAHzySt3x0g4",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/groups/00guaxWZ0AOa5NFAj0g3"
        }
      }
    }
  ],
  "_links": {
    "binding": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/${resource-set-id}/bindings/${role-id-or-name}"
    },
    "next": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/${resource-set-id}/bindings/${role-id-or-name}/members?after=${last-member-id}"
    }
  }
}
```
### Get a Member from a Binding

<ApiLifecycle access="beta" />

<ApiOperation method="get" url="/api/v1/iam/resource-sets/${resourceSetId}/bindings/${roleId}/members/${memberId}" />

Gets a Member of a Role in a Resource Set

#### Request parameters

| Parameter      | Description                                                           | Param Type   | DataType       | Required |
| :------------- | :-------------------------------------------------------------------- | :----------- | :------------- | :------- |
| `resourceSetId`  | ID of the target Resource Set                                       | URL          | String         | TRUE     |
| `roleId`         | ID of the Role to identify the Binding                              | URL          | String         | TRUE     |
| `memberId`       | ID of the Member within the Binding                                 | URL          | String         | TRUE     |


`memberId` is the ID obtained when [Members are listed in a Binding](#list-members-in-a-binding). For example, if the Member object was:

```json
{
  "id": "irb1qe6PGuMc7Oh8N0g4",
  "created": "2021-02-06T16:20:57.000Z",
  "lastUpdated": "2021-02-06T16:20:57.000Z",
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00uuk41Hjga5qGfQ30g3"
    }
  }
}
```

then `irb1qe6PGuMc7Oh8N0g4` could be used as `memberId` to remove the User from the list of Members in the Binding.

#### Response parameters

The ID that represents the Binding and a link to the actual Member object, which could be a User or a Group

#### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0WxyzJxGIr0ouum0g4/members/irb1qe6PGuMc7Oh8N0g4"
```

#### Response example

```json
{
  "id": "irb1qe6PGuMc7Oh8N0g4",
  "created": "2021-02-06T16:20:57.000Z",
  "lastUpdated": "2021-02-06T16:20:57.000Z",
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00uuk41Hjga5qGfQ30g3"
    }
  }
}
```

### Delete a Member from a Binding

<ApiLifecycle access="beta" />

<ApiOperation method="delete" url="/api/v1/iam/resource-sets/${resourceSetId}/bindings/${roleId}/members/${memberId}" />

Deletes a Member of a Role in a Resource Set

#### Request parameters

| Parameter      | Description                                                           | Param Type   | DataType       | Required |
| :------------- | :-------------------------------------------------------------------- | :----------- | :------------- | :------- |
| `resourceSetId`  | ID of the target Resource Set                                       | URL          | String         | TRUE     |
| `roleId`         | ID of the Role to identify the Binding                              | URL          | String         | TRUE     |
| `memberId`       | ID of the Member in the Binding                                 | URL          | String         | TRUE     |


`memberId` is the ID obtained when [Members are listed in a Binding](#list-members-in-a-binding). For example, if the Member object was:

```json
{
  "id": "irb1qe6PGuMc7Oh8N0g4",
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00uuk41Hjga5qGfQ30g3"
    }
  }
}
```

then `irb1qe6PGuMc7Oh8N0g4` could be used as `memberId` to remove the User from the list of Members in the Binding.

#### Response parameters

``` http
HTTP/1.1 204 No Content
```

#### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0WxyzJxGIr0ouum0g4/members/irb1qe6PGuMc7Oh8N0g4"
```

#### Response example

``` http
HTTP/1.1 204 No Content
```

### Retrieve Bindings

<ApiLifecycle access="beta" />

#### Get a Binding by Role ID

<ApiLifecycle access="beta" />

<ApiOperation method="get" url="/api/v1/iam/resource-sets/${resourceSetId}/bindings/${roleId}" />

Gets a Binding from a Resource Set by its Role ID

##### Request parameters

| Parameter      | Description              | Param Type   | DataType     | Required |
| :------------- | :----------------------- | :----------- | :----------- | :------- |
| `resourceSetId`  | ID of the Resource Set | URL          | String       | TRUE     |
| `roleId`         | ID of the Role         | URL          | String       | TRUE     |

##### Response parameters

The `id` of the Role as well as the following `_links`:

* `self` gets this Role's Binding within the Resource Set
* `bindings` get a paginable list of Role Bindings in the Resource Set
* `resource-set` gets the Resource Set

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0WxyzJxGIr0ouum0g4"
```

##### Response example

```json
{
  "id": "cr0WxyzJxGIr0ouum0g4",
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0WxyzJxGIr0ouum0g4"
    },
    "members": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0WxyzJxGIr0ouum0g4/members"
    },
    "resource-set": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
    }
  }
}
```

#### Get all Bindings in a Resource Set

<ApiLifecycle access="beta" />

<ApiOperation method="get" url="/api/v1/iam/resource-sets/${resourceSetId}/bindings" />

Gets all the Bindings from a Resource Set

##### Request parameters

| Parameter      | Description               | Param Type   | DataType     | Required |
| :------------- | :------------------------ | :----------- | :----------- | :------- |
| `resourceSetId`  | ID of the Resource Set  | URL          | String       | TRUE     |

##### Response parameters

A paginated list of [Bindings](#binding-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings"
```

##### Response example

```json
{
  "roles": [
    {
      "id": "cr0WxyzJxGIr0ouum0g4",
      "_links": {
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/iam/roles/cr0WxyzJxGIr0ouum0g4"
        },
        "members": {
          "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0WxyzJxGIr0ouum0g4/members"
        }
      }
    }
  ],
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings"
    },
    "resource-set": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
    },
    "next": {
      "href": "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings?after=cr0WxyzJxGIr0ouum0g4"
    }
  }
}
```

### Delete a Binding

<ApiLifecycle access="beta" />

<ApiOperation method="delete" url="/api/v1/iam/resource-sets/${resourceSetId}/bindings/${roleId}" />

Deletes a Binding of a Role from a Resource Set

#### Request parameters

| Parameter      | Description               | Param Type   | DataType     | Required |
| :------------- | :------------------------ | :----------- | :----------- | :------- |
| `resourceSetId`  | ID of the Resource Set  | URL          | String       | TRUE     |
| `roleId`         | ID of the Role          | URL          | String       | TRUE     |

#### Response parameters

``` http
HTTP/1.1 204 No Content
```

#### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0WxyzJxGIr0ouum0g4"
```

##### Response example

``` http
HTTP/1.1 204 No Content
```

## Role assignment operations

### Grant third-party admin status

<ApiOperation method="post" url="/api/v1/users/${userId}/roles?disableNotifications=true" />

You can grant third-party admin status when you add a new admin using the API. You can do this by using an optional query parameter with the Administrator Roles API called `disableNotifications`.

When this setting is enabled, the admins won't receive any of the default Okta administrator emails. These admins also won't have access to contact Okta Support and open support cases on behalf of your org.

### List Roles

#### List Roles assigned to a User


<ApiOperation method="get" url="/api/v1/users/${userId}/roles" />

Lists all the Roles assigned to a User

##### Request parameters


| Parameter     | Description                                          | Param Type  | DataType  | Required  |
| :------------ | :--------------------------------------------------- | :---------- | :-------- | :-------- |
| `userId`        | ID of a User                                       | URL         | String    | TRUE      |

##### Response parameters


Array of [Roles](#role-object)

##### Request example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles"
```

##### Response example

```json
[
    {
        "id": "IFIFAX2BIRGUSTQ",
        "label": "Application Administrator",
        "type": "APP_ADMIN",
        "status": "ACTIVE",
        "created": "2019-02-06T16:17:40.000Z",
        "lastUpdated": "2019-02-06T16:17:40.000Z",
        "assignmentType": "USER",
        "_links": {
            "assignee": {
                "href": "http://${yourOktaDomain}/api/v1/users/00ur32Vg0fvpyHZeQ0g3"
            }
        }
    },
    {
        "id": "JBCUYUC7IRCVGS27IFCE2SKO",
        "label": "Help Desk Administrator",
        "type": "HELP_DESK_ADMIN",
        "status": "ACTIVE",
        "created": "2019-02-06T16:17:40.000Z",
        "lastUpdated": "2019-02-06T16:17:40.000Z",
        "assignmentType": "USER",
        "_links": {
            "assignee": {
                "href": "http://${yourOktaDomain}/api/v1/users/00ur32Vg0fvpyHZeQ0g3"
            }
        }
    },
    {
        "id": "ra125eqBFpETrMwu80g4",
        "label": "Organization Administrator",
        "type": "ORG_ADMIN",
        "status": "ACTIVE",
        "created": "2019-02-06T16:17:40.000Z",
        "lastUpdated": "2019-02-06T16:17:40.000Z",
        "assignmentType": "USER",
        "_links": {
            "assignee": {
                "href": "http://${yourOktaDomain}/api/v1/users/00ur32Vg0fvpyHZeQ0g3"
            }
        }
    },
    {
        "id": "gra25fapn1prGTBKV0g4",
        "label": "API Access Management Administrator",
        "type": "API_ACCESS_MANAGEMENT_ADMIN",
        "status": "ACTIVE",
        "created": "2019-02-06T16:20:57.000Z",
        "lastUpdated": "2019-02-06T16:20:57.000Z",
        "assignmentType": "GROUP",
        "_links": {
            "assignee": {
                "href": "http://${yourOktaDomain}/api/v1/groups/00g1ousb3XCr9Dkr20g4"
            }
        }
    }
]
```
##### Response example with Custom Roles

<ApiLifecycle access="beta" />

```json
[
    {
        "id": "IFIFAX2BIRGUSTQ",
        "label": "Application Administrator",
        "type": "APP_ADMIN",
        "status": "ACTIVE",
        "created": "2019-02-06T16:17:40.000Z",
        "lastUpdated": "2019-02-06T16:17:40.000Z",
        "assignmentType": "USER",
        "_links": {
            "assignee": {
                "href": "http://${yourOktaDomain}/api/v1/users/00ur32Vg0fvpyHZeQ0g3"
            }
        }
    },
    {
        "id": "JBCUYUC7IRCVGS27IFCE2SKO",
        "label": "Help Desk Administrator",
        "type": "HELP_DESK_ADMIN",
        "status": "ACTIVE",
        "created": "2019-02-06T16:17:40.000Z",
        "lastUpdated": "2019-02-06T16:17:40.000Z",
        "assignmentType": "USER",
        "_links": {
            "assignee": {
                "href": "http://${yourOktaDomain}/api/v1/users/00ur32Vg0fvpyHZeQ0g3"
            }
        }
    },
    {
        "id": "ra125eqBFpETrMwu80g4",
        "label": "Organization Administrator",
        "type": "ORG_ADMIN",
        "status": "ACTIVE",
        "created": "2019-02-06T16:17:40.000Z",
        "lastUpdated": "2019-02-06T16:17:40.000Z",
        "assignmentType": "USER",
        "_links": {
            "assignee": {
                "href": "http://${yourOktaDomain}/api/v1/users/00ur32Vg0fvpyHZeQ0g3"
            }
        }
    },
    {
        "id": "gra25fapn1prGTBKV0g4",
        "label": "API Access Management Administrator",
        "type": "API_ACCESS_MANAGEMENT_ADMIN",
        "status": "ACTIVE",
        "created": "2019-02-06T16:20:57.000Z",
        "lastUpdated": "2019-02-06T16:20:57.000Z",
        "assignmentType": "GROUP",
        "_links": {
            "assignee": {
                "href": "http://${yourOktaDomain}/api/v1/groups/00g1ousb3XCr9Dkr20g4"
            }
        }
    },
    {
        "id": "irb1q92TFAHzySt3x0g4",
        "role": "cr0Yq6IJxGIr0ouum0g3",
        "label": "UserCreatorRole",
        "type": "CUSTOM",
        "status": "ACTIVE",
        "created": "2019-02-06T16:20:57.000Z",
        "lastUpdated": "2019-02-06T16:20:57.000Z",
        "assignmentType": "USER",
        "resource-set": "iamoJDFKaJxGIr0oamd9g",
        "_links": {
            "assignee": {
                "href": "http://${yourOktaDomain}/api/v1/users/00u1gytb3XCr9Dkr18r2"
            },
            "resource-set": {
                "href": "http://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
            },
            "member": {
                "href": "http://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0Yq6IJxGIr0ouum0g3/members/irb1qe6PGuMc7Oh8N0g4"
            },
            "role": {
              "href": "http://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
            },
            "permissions": {
                "href": "http://${yourOktaDomain}/api/v1/iam/permission-sets/cr0Yq6IJxGIr0ouum0g3/permissions"
            }
        }
    },
    {
        "id": "irb5e92YgBazyyQ3x1q5",
        "role": "cr0Yq6IJxGIr0ouum0g3",
        "label": "UserCreatorRole",
        "type": "CUSTOM",
        "status": "ACTIVE",
        "created": "2019-02-06T16:20:57.000Z",
        "lastUpdated": "2019-02-06T16:20:57.000Z",
        "assignmentType": "GROUP",
        "resource-set": "iamoakjsdQaJxGIr03int1o",
        "_links": {
          "assignee": {
            "href": "http://${yourOktaDomain}/api/v1/groups/00g1ousb3XCr9Dkr20g4"
          },
          "resource-set": {
            "href": "http://${yourOktaDomain}/api/v1/iam/resource-sets/iamoakjsdQaJxGIr03int1o"
          },
          "member": {
            "href": "http://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0Yq6IJxGIr0ouum0g3/members/irb1qe6PGuMc7Oh8N0g4"
          },
          "role": {
            "href": "http://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
          },
          "permissions": {
            "href": "http://${yourOktaDomain}/api/v1/iam/permission-sets/cr0Yq6IJxGIr0ouum0g3/permissions"
          }
        }
    }
]
```
#### List Roles assigned to a Group


<ApiOperation method="get" url="/api/v1/groups/${groupId}/roles" />

Lists all Roles assigned to a Group

##### Request parameters


| Parameter         | Description                                             | Param Type  | DataType  | Required  |
| :---------------- | :------------------------------------------------------ | :---------- | :-------- | :-------- |
| `groupId`           | ID of a Group                                         | URL         | String    | TRUE      |

##### Response parameters


Array of [Roles](#role-object)

##### Request example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3/roles"
```

###### Response example


```json
[
    {
        "id": "IFIFAX2BIRGUSTQ",
        "label": "Application Administrator",
        "type": "APP_ADMIN",
        "status": "ACTIVE",
        "created": "2019-02-27T14:48:59.000Z",
        "lastUpdated": "2019-02-27T14:48:59.000Z",
        "assignmentType": "GROUP",
        "_links": {
            "assignee": {
                "href": "http://${yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3"
            }
        }
    }
]
```

### Assign a Role

#### Assign a Role to a User

<ApiOperation method="post" url="/api/v1/users/${userId}/roles" />

Assigns a Role to a User

##### Request parameters


| Parameter   | Description              | Param Type   | DataType                    | Required |
| :---------- | :----------------------- | :----------- | :-------------------------- | :------- |
| `type`        | Type of Role to assign   | Body         | [Role Type](#role-types)    | TRUE     |
| `userId`      | ID of a User           | URL          | String                      | TRUE     |

##### Response parameters

The assigned [Role](#role-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
      "type": "SUPER_ADMIN"
}' "https://${yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles"
```

###### Response example

```json
{
  "id": "ra1b8anIk7rx7em7L0g4",
  "label": "Super Organization Administrator",
  "type": "SUPER_ADMIN",
  "status": "ACTIVE",
  "created": "2015-09-06T15:28:47.000Z",
  "lastUpdated": "2015-09-06T15:28:47.000Z"
}
```

#### Assign a Role to a Group

<ApiOperation method="post" url="/api/v1/groups/${groupId}/roles" />

Assigns a Role to a Group

##### Request parameters


| Parameter       | Description                 | Param Type   | DataType                    | Required |
| :-------------- | :-------------------------- | :----------- | :-------------------------- | :------- |
| `groupId`         | ID of a Group             | URL          | String                      | TRUE     |
| `type`            | Type of Role to assign      | Body         | [Role Type](#role-types)    | TRUE     |

##### Response parameters

The assigned [Role](#role-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
      "type": "ORG_ADMIN"
}' "https://${yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3/roles"
```

###### Response example

```json
{
    "id": "grasraHPx7i79ajaJ0g3",
    "label": "Organization Administrator",
    "type": "ORG_ADMIN",
    "status": "ACTIVE",
    "created": "2019-02-27T14:56:55.000Z",
    "lastUpdated": "2019-02-27T14:56:55.000Z",
    "assignmentType": "GROUP",
    "_links": {
        "assignee": {
            "href": "http://${yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3"
        }
    }
}
```

#### Assign a Custom Role to a User or Group

<ApiLifecycle access="beta" />

The recommended way to assign a Custom Role is by using one of the [Custom Role assignment operations](#custom-role-assignment-operations). However, you can also assign a Custom Role using the following method:

<ApiOperation method="post" url="/api/v1/groups/${userId}/roles" />

or to assign to a Group:

<ApiOperation method="post" url="/api/v1/groups/${groupId}/roles" />

as long as the request body contains a Custom `role` ID and a `resource-set` ID. Also, `type` must be `CUSTOM`.

##### Request parameters

| Parameter       | Description                 | Param Type   | DataType                    | Required |
| :-------------- | :-------------------------- | :----------- | :-------------------------- | :------- |
| `type`            | Type of Role to assign      | Body         | String literal: `CUSTOM`    | TRUE     |
| `role`            | ID of the Custom Role     | Body         | String                      | TRUE     |
| `resource-set`    | ID of the Resource Set    | Body         | String                      | TRUE     |

##### Response parameters

The assigned [Role](#role-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
      "type": "CUSTOM",
      "role": "cr0Yq6IJxGIr0ouum0g3",
      "resource-set": "iamoJDFKaJxGIr0oamd9g"
}' "https://${yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3/roles"
```

###### Response example

```json
{
  "id": "irb1q92TFAHzySt3x0g4",
  "role": "cr0WxyzJxGIr0ouum0g4",
  "label": "UserCreatorRole",
  "type": "CUSTOM",
  "status": "ACTIVE",
  "created": "2019-02-06T16:20:57.000Z",
  "lastUpdated": "2019-02-06T16:20:57.000Z",
  "assignmentType": "GROUP",
  "resource-set": "iamoJDFKaJxGIr0oamd9g",
  "_links": {
    "assignee": {
      "href": "http://${yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3"
    },
    "resource-set": {
      "href": "http://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
    },
    "role": {
      "href": "http://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
    },
    "permissions": {
      "href": "http://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions"
    }
  }
}
```

### Unassign a Role

#### Unassign a Role from a User

<ApiOperation method="delete" url="/api/v1/users/${userId}/roles/${roleId}" />

Unassigns a Role from a User

##### Request parameters

| Parameter   | Description    | Param Type   | DataType   | Required |
| :---------- | :------------- | :----------- | :--------- | :------- |
| `roleId`      | ID of a Role | URL          | String     | TRUE     |
| `userId`      | ID of a User | URL          | String     | TRUE     |

##### Response parameters

``` http
HTTP/1.1 204 No Content
```

##### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/ra1b8anIk7rx7em7L0g4"
```

###### Response example

``` http
HTTP/1.1 204 No Content
```

#### Unassign a Role from a Group

<ApiOperation method="delete" url="/api/v1/groups/${groupId}/roles/${roleId}" />

Unassigns a Role from a Group

##### Request parameters

| Parameter       | Description       | Param Type   | DataType   | Required |
| :-------------- | :---------------- | :----------- | :--------- | :------- |
| `groupId`         | ID of a Group   | URL          | String     | TRUE     |
| `roleId`          | ID of a Role    | URL          | String     | TRUE     |

##### Response parameters

``` http
HTTP/1.1 204 No Content
```

##### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3/roles/grasraHPx7i79ajaJ0g3"
```

##### Response example

``` http
HTTP/1.1 204 No Content
```

#### Unassign a Custom Role from a User or Group

<ApiLifecycle access="beta" />

The recommended way to assign a Custom Role is by using one of the [Custom Role assignment operations](#custom-role-assignment-operations). However, you can also unassign a Custom Role by using the following method:

<ApiOperation method="delete" url="/api/v1/groups/${groupId}/roles/${bindingId}" />

or to assign to a Group:

<ApiOperation method="delete" url="/api/v1/groups/${groupId}/roles/${bindingId}" />

but note that instead of `${roleId}`, you must provide a `${bindingId}`.

##### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/irb1q92TFAHzySt3x0g4"
```

###### Response example

``` http
HTTP/1.1 204 No Content
```

## Role target operations

Role targets are a way of defining permissions for admin roles into a smaller subset of Groups or Apps within your org. Targets limit an admin's permissions to a targeted area of the org. You can define admin roles to target Groups, Applications, and Application Instances.

* **Group targets:** Grant an admin permission to manage only a specified Group. For example, an admin role may be assigned to manage only the IT Group.
* **App targets:** Grant an admin permission to manage all the instances of specified Apps. Target Apps are Okta catalog Apps. For example, you can have multiple configurations of an Okta catalog App, such as Salesforce or Facebook. When you add a Salesforce or Facebook App as a target, that grants the admin permission to manage all the instances of those Apps and create new instances of them.
* **App Instance targets:** Grant an admin permission to manage an instance of one App or instances of multiple Apps. App Instances are specific Apps that admins have created in their org. For example, there may be a Salesforce App configured differently for each sales region of a company. When you create an App Instance target, you can assign an admin to manage only two instances of the configured Salesforce Apps and then also to manage an instance of another configured App such as Workday.

> **Note:**<ApiLifecycle access="beta" /> Don't use these operations with a Custom Role ID. Custom Role assignments always require a target Resource Set. Use [Custom Role assignment operations](#custom-role-assignment-operations) or the backward-compatible [Role assignment](#assign-a-custom-role-to-a-user-or-group) or [unassignment](#unassign-a-custom-role-from-a-user-or-group) operations.

### Group administrator role group targets

Assigns a Group admin role to a specific Group that grants the admin permission to manage only that Group. For example, you can assign an admin role to manage only the IT group. The permissions for specifically what an admin can do within that Group depends on the admin role that they are assigned to. See [Administrators](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Administrators).

#### List Group targets for the group administrator role

##### List Group targets for the group administrator role given to a user

<ApiOperation method="get" url="/api/v1/users/${userId}/roles/${roleId}/targets/groups" />

Lists all Group targets for a `USER_ADMIN` or `HELP_DESK_ADMIN` Role assigned to a User

###### Request parameters


| Parameter   | Description                                                    | Param Type   | DataType   | Required |
| :---------- | :------------------------------------------------------------- | :----------- | :--------- | :------- |
| `after`       | Specifies the pagination cursor for the next page of targets   | Query        | String     | FALSE    |
| `limit`       | Specifies the number of results for a page (default is 20)     | Query        | Number     | FALSE    |
| `roleId`      | ID of a Role                                                 | URL          | String     | TRUE     |
| `userId`      | ID of a User                                                 | URL          | String     | TRUE     |

Treat the page cursor as an opaque value: obtain it through the next link relation. See [Pagination](/docs/reference/api-overview/#pagination).

###### Response parameters

Array of [Groups](/docs/reference/api/groups/)

If the Role isn't scoped to specific Group targets, an empty array `[]` is returned.

###### Request example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/groups"
```

###### Response example


```json
[
  {
    "id": "00g1emaKYZTWRYYRRTSK",
    "objectClass": [
      "okta:user_group"
    ],
    "profile": {
      "name": "West Coast Users",
      "description": "All Users West of The Rockies"
    },
    "_links": {
      "logo": [
        {
          "href": "https://${yourOktaDomain}/img/logos/groups/okta-medium.png",
          "name": "medium",
          "type": "image/png"
        },
        {
          "href": "https://${yourOktaDomain}/img/logos/groups/okta-large.png",
          "name": "large",
          "type": "image/png"
        }
      ],
      "users": {
        "href": "https://${yourOktaDomain}/api/v1/groups/00g1emaKYZTWRYYRRTSK/users"
      },
      "apps": {
        "href": "https://${yourOktaDomain}/api/v1/groups/00g1emaKYZTWRYYRRTSK/apps"
      }
    }
  }
]
```

##### List Group targets for a group administrator role given to a group

<ApiOperation method="get" url="/api/v1/groups/${groupId}/roles/${roleId}/targets/groups" />

Lists all Group targets for a `USER_ADMIN` or `HELP_DESK_ADMIN` Role assigned to a Group

###### Request parameters


| Parameter       | Description                                                    | Param Type   | DataType   | Required |
| :-------------- | :------------------------------------------------------------- | :----------- | :--------- | :------- |
| `after`           | Specifies the pagination cursor for the next page of targets   | Query        | String     | FALSE    |
| `groupId`         | ID of a Group                                                | URL          | String     | TRUE     |
| `limit`           | Specifies the number of results for a page (default is 20)     | Query        | Number     | FALSE    |
| `roleId`          | ID of a Role                                                 | URL          | String     | TRUE     |

Treat the page cursor as an opaque value. You can obtain it through the next link relation. See [Pagination](/docs/reference/api-overview/#pagination).

###### Response parameters

Array of [Groups](/docs/reference/api/groups/)

If the Role isn't scoped to specific Group targets, an empty array `[]` is returned.

###### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3/roles/JBCUYUC7IRCVGS27IFCE2SKO/targets/groups"
```

###### Response example


```json
[
    {
        "id": "00gsrc96agspOaiP40g3",
        "created": "2019-02-27T15:19:11.000Z",
        "lastUpdated": "2019-02-27T15:19:11.000Z",
        "lastMembershipUpdated": "2019-02-27T15:19:11.000Z",
        "objectClass": [
            "okta:user_group"
        ],
        "type": "OKTA_GROUP",
        "profile": {
            "name": "userGroup0",
            "description": null
        },
        "_links": {
            "logo": [
                {
                    "name": "medium",
                    "href": "http://${yourOktaDomain}/assets/img/logos/groups/okta-medium.d7fb831bc4e7e1a5d8bd35dfaf405d9e.png",
                    "type": "image/png"
                },
                {
                    "name": "large",
                    "href": "http://${yourOktaDomain}/assets/img/logos/groups/okta-large.511fcb0de9da185b52589cb14d581c2c.png",
                    "type": "image/png"
                }
            ],
            "users": {
                "href": "http://${yourOktaDomain}/api/v1/groups/00gsrc96agspOaiP40g3/users"
            },
            "apps": {
                "href": "http://${yourOktaDomain}/api/v1/groups/00gsrc96agspOaiP40g3/apps"
            }
        }
    }
]
```

#### Add a Group target to a group administrator role

##### Add a Group target to a group administrator role given to a user

<ApiOperation method="put" url="/api/v1/users/${userId}/roles/${roleId}/targets/groups/${groupId}" />

Adds a Group target for a `USER_ADMIN` or `HELP_DESK_ADMIN` Role assigned to a User

When you add the first Group target, you reduce the scope of the role assignment. The Role no longer applies to all targets but applies only to the specified target.

###### Request parameters


| Parameter   | Description                                     | Param Type   | DataType   | Required |
| :---------- | :---------------------------------------------- | :----------- | :--------- | :------- |
| `groupId`     | ID of the Group target to scope role assignment   | URL          | String     | TRUE     |
| `roleId`      | ID of a Role                                  | URL          | String     | TRUE     |
| `userId`      | ID of a User                                  | URL          | String     | TRUE     |

###### Response parameters


``` http
HTTP/1.1 204 No Content
```

###### Request example


```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/groups/00garkxjAHDYPFcsP0g4"
```

###### Response example


``` http
HTTP/1.1 204 No Content
```

##### Add Group target to group administrator role given to a group

<ApiOperation method="put" url="/api/v1/groups/${groupId}/roles/${roleId}/targets/groups/${targetGroupId}" />

Adds a Group target for a `USER_ADMIN` or `HELP_DESK_ADMIN` Role assigned to a Group

When you add the first Group target, you reduce the scope of the role assignment. The Role no longer applies to all targets but applies only to the specified target.

###### Request parameters


| Parameter            | Description                                     | Param Type   | DataType   | Required |
| :------------------- | :---------------------------------------------- | :----------- | :--------- | :------- |
| `groupId`              | ID of an admin Group                          | URL          | String     | TRUE     |
| `roleId`               | ID of a Role                                  | URL          | String     | TRUE     |
| `targetGroupId`        | ID of the Group target to scope role assignment   | URL          | String     | TRUE     |

###### Response parameters

``` http
HTTP/1.1 204 No Content
```

###### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3/roles/JBCUYUC7IRCVGS27IFCE2SKO/targets/groups/00gsrhsUaRoUib0XQ0g3"
```

###### Response example

``` http
HTTP/1.1 204 No Content
```

#### Remove a Group target from a group administrator role

##### Remove a Group target from a group administrator role given to a user

<ApiOperation method="delete" url="/api/v1/users/${userId}/roles/${roleId}/targets/groups/${groupId}" />

Removes a Group target from a `USER_ADMIN` or `HELP_DESK_ADMIN` Role assigned to a User

> **Note:** Don't remove the last Group target from a role assignment, as it causes an exception. If you need a role assignment that applies to all Groups, the API consumer should delete the `USER_ADMIN` role assignment and recreate it.

###### Request parameters


| Parameter   | Description                                | Param Type   | DataType   | Required |
| :---------- | :----------------------------------------- | :----------- | :--------- | :------- |
| `groupId`     | ID of the Group target for role assignment   | URL          | String     | TRUE     |
| `roleId`      | ID of a Role                             | URL          | String     | TRUE     |
| `userId`      | ID of a User                             | URL          | String     | TRUE     |

###### Response parameters


``` http
HTTP/1.1 204 No Content
```

###### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/groups/00garkxjAHDYPFcsP0g4"
```

###### Response example

``` http
HTTP/1.1 204 No Content
```

##### Remove a Group target from a group administrator role given to a group

<ApiOperation method="delete" url="/api/v1/groups/${groupId}/roles/${roleId}/targets/groups/${targetGroupId}" />

Removes a Group target from a `USER_ADMIN` or `HELP_DESK_ADMIN` Role assigned to a Group

> **Note:** Don't remove the last Group target from a role assignment, as it causes an exception. If you need a role assignment that applies to all Groups, the API consumer should delete the `USER_ADMIN` role assignment and recreate it.

###### Request parameters

| Parameter       | Description                                | Param Type   | DataType   | Required |
| :-------------- | :----------------------------------------- | :----------- | :--------- | :------- |
| `groupId`         | ID of an admin Group                     | URL          | String     | TRUE     |
| `roleId`          | ID of a Role                             | URL          | String     | TRUE     |
| `targetGroupId`   | ID of the Group target for role assignment   | URL          | String     | TRUE     |

###### Response parameters

``` http
HTTP/1.1 204 No Content
```

###### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3/roles/JBCUYUC7IRCVGS27IFCE2SKO/targets/groups/00gsrhsUaRoUib0XQ0g3"
```

###### Response example

``` http
HTTP/1.1 204 No Content
```

### App administrator role for App targets

Assign an admin role to a subset of Apps to grant the admin permission to manage all the instances of those Apps. Targeted Apps are Okta catalog Apps, and you can assign App targets for these Apps to an admin role regardless of whether a specific instance of the App has been created. For example, there can be multiple configurations of one Okta catalog App, such as Salesforce or Facebook. When you add a Salesforce or Facebook App as a target, that grants the admin permission to manage all the instances of Salesforce or Facebook Apps and create new instances of them.

#### List App targets for an App administrator role

##### List App targets for an App administrator role given to a User

<ApiOperation method="get" url="/api/v1/users/${userId}/roles/${roleId}/targets/catalog/apps" />

Lists all the App targets for an `APP_ADMIN` Role assigned to a User

###### Request parameters

| Parameter   | Description                                                    | Param Type   | DataType   | Required |
| :---------- | :------------------------------------------------------------- | :----------- | :--------- | :------- |
| `after`       | Specifies the pagination cursor for the next page of targets   | Query        | String     | FALSE    |
| `limit`       | Specifies the number of results for a page (default is 20)     | Query        | Number     | FALSE    |
| `roleId`      | ID of a Role                                                 | URL          | String     | TRUE     |
| `userId`      | ID of a User                                                 | URL          | String     | TRUE     |

Treat the page cursor as an opaque value. You can obtain it through the next link relation. See [Pagination](/docs/reference/api-overview/#pagination).

###### Response parameters

Array of catalog Apps

If the Role isn't scoped to specific Apps in the catalog, an empty array `[]` is returned.

###### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/catalog/apps"
```

###### Response example

The example shows two applications and two instances. Note that the response for instances has an `id` field.

```json
[
  {
    "name": "salesforce",
    "displayName": "Salesforce.com",
    "description": "Salesforce",
    "status": "ACTIVE",
    "lastUpdated": "2014-06-03T16:17:13.000Z",
    "category": "CRM",
    "verificationStatus": "OKTA_VERIFIED",
    "website": "http://www.salesforce.com",
    "signOnModes": [
      "SAML_2_0"
    ],
    "features": [
      "IMPORT_NEW_USERS",
      "IMPORT_PROFILE_UPDATES",
      "IMPORT_USER_SCHEMA",
      "PUSH_NEW_USERS",
      "PUSH_PASSWORD_UPDATES",
      "PUSH_PROFILE_UPDATES",
      "PUSH_USER_DEACTIVATION",
      "REACTIVATE_USERS"
    ],
    "_links": {
      "logo": [
        {
          "name": "medium",
          "href": "https://${yourOktaDomain}/img/logos/salesforce_logo.png",
          "type": "image/png"
        }
      ],
      "self": {
          "href": "https://${yourOktaDomain}/api/v1/catalog/apps/salesforce"
      }
    }
  },
  {
    "name": "boxnet",
    "displayName": "Box",
    "description": "Cloud storage.",
    "status": "ACTIVE",
    "lastUpdated": "2014-06-03T16:17:13.000Z",
    "category": "CM",
    "verificationStatus": "OKTA_VERIFIED",
    "website": "http://www.box.net",
    "signOnModes": [
      "SAML_2_0"
    ],
    "features": [
      "GROUP_PUSH",
      "IMPORT_NEW_USERS",
      "IMPORT_PROFILE_UPDATES",
      "PUSH_NEW_USERS",
      "PUSH_PROFILE_UPDATES",
      "PUSH_USER_DEACTIVATION",
      "REACTIVATE_USERS"
    ],
    "_links": {
      "logo": [
        {
          "name": "medium",
          "href": "https://${yourOktaDomain}/img/logos/box.png",
          "type": "image/png"
        }
      ],
      "self": {
          "href": "https://${yourOktaDomain}/api/v1/catalog/apps/boxnet"
      }
    }
  },
  {
    "name": "Facebook for Detroit Office",
    "status": "ACTIVE",
    "id": "0oapsqQ5dv19pqyEo0g3",
    "_links": {
      "self": {
          "href": "https://${yourOktaDomain}/api/v1/apps/0oapsqQ5dv19pqyEo0g3"
      }
    }
  },
  {
    "name": "Facebook (Toronto)",
    "status": "ACTIVE",
    "id": "0obdfgrQ5dv29pqyQo0f5",
    "_links": {
       "self": {
           "href": "https://${yourOktaDomain}/api/v1/apps/0obdfgrQ5dv29pqyQo0f5"
       }
    }
  }
]
```

##### List App targets for App administrator role given to a Group

<ApiOperation method="get" url="/api/v1/groups/${groupId}/roles/${roleId}/targets/catalog/apps" />

Lists all the App targets for an `APP_ADMIN` Role assigned to a Group

###### Request Parameters


| Parameter   | Description                                                    | Param Type   | DataType   | Required |
| :---------- | :------------------------------------------------------------- | :----------- | :--------- | :------- |
| `after`       | Specifies the pagination cursor for the next page of targets   | Query        | String     | FALSE    |
| `groupId`     | ID of a Group                                                | URL          | String     | TRUE     |
| `limit`       | Specifies the number of results for a page (default is 20)     | Query        | Number     | FALSE    |
| `roleId`      | ID of a Role                                                 | URL          | String     | TRUE     |

Treat the page cursor as an opaque value. You can obtain it through the next link relation. See [Pagination](/docs/reference/api-overview/#pagination).

###### Response parameters

Array of catalog Apps

If the Role isn't scoped to specific Apps in the catalog, an empty array `[]` is returned.

###### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3/roles/IFIFAX2BIRGUSTQ/targets/catalog/apps"
```

###### Response example

The example shows one application and one instance. Note that the response for instances has an `id` field.

```json
[
    {
        "name": "facebook",
        "displayName": "Facebook",
        "description": "Giving people the power to share and make the world more open and connected.",
        "status": "ACTIVE",
        "lastUpdated": "2017-07-19T23:37:37.000Z",
        "category": "SOCIAL",
        "verificationStatus": "OKTA_VERIFIED",
        "website": "http://www.facebook.com/",
        "signOnModes": [
            "BROWSER_PLUGIN"
        ],
        "_links": {
            "logo": [
                {
                    "name": "medium",
                    "href": "http://${yourOktaDomain}/assets/img/logos/facebook.e8215796628b5eaf687ba414ae245659.png",
                    "type": "image/png"
                }
            ],
            "self": {
                "href": "http://${yourOktaDomain}/api/v1/catalog/apps/facebook"
            }
        }
    },
    {
        "name": "24 Seven Office 0",
        "status": "ACTIVE",
        "id": "0oasrudLtMlzAsTxk0g3",
        "_links": {
            "self": {
                "href": "http://${yourOktaDomain}/api/v1/apps/0oasrudLtMlzAsTxk0g3"
            }
        }
    }
]
```

#### Add an App target to an App administrator role

##### Add an App target to an App administrator role given to a User

<ApiOperation method="put" url="/api/v1/users/${userId}/roles/${roleId}/targets/catalog/apps/${appName}" />

Adds an App target for an `APP_ADMIN` Role assigned to a User

When you add the first App target, you reduce the scope of the Role assignment. The Role no longer applies to all App targets, but applies only to the specified target.

Adding an App target overrides any existing App Instance targets of the App. For example, if someone was assigned to administer a specific Facebook instance, calling this endpoint with `facebook` for `appName`, would make them administrator for all Facebook instances.

###### Request parameters


| Parameter   | Description                                                  | Param Type   | DataType   | Required |
| :---------- | :----------------------------------------------------------- | :----------- | :--------- | :------- |
| `appName`     | Name of the App target from the catalog to scope Role assignment   | URL          | String     | TRUE     |
| `roleId`      | ID of a Role                                               | URL          | String     | TRUE     |
| `userId`      | ID of a User                                               | URL          | String     | TRUE     |

###### Response parameters

``` http
HTTP/1.1 204 No Content
```

###### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/catalog/apps/amazon_aws"
```

###### Response example

``` http
HTTP/1.1 204 No Content
```

##### Add an App target to an App administrator role given to a Group

<ApiOperation method="put" url="/api/v1/groups/${groupId}/roles/${roleId}/targets/catalog/apps/${appName}" />

Adds an App target for an `APP_ADMIN` Role assigned to a Group

When you add the first App target, you reduce the scope of the role assignment. The Role no longer applies to all App targets but applies only to the specified target.

An App target that is added overrides any existing instance targets of the app. For example, if someone is assigned to administer a specific Facebook instance, a call to this endpoint with `facebook` for `appName` would make that person the administrator for all Facebook instances.

###### Request parameters


| Parameter   | Description                                                  | Param Type   | DataType   | Required |
| :---------- | :----------------------------------------------------------- | :----------- | :--------- | :------- |
| `groupId`     | ID of a Group                                              | URL          | String     | TRUE     |
| `roleId`      | ID of a Role                                               | URL          | String     | TRUE     |
| `appName`     | Name of the App target from the catalog to scope role assignment   | URL          | String     | TRUE     |

###### Response parameters

``` http
HTTP/1.1 204 No Content
```

###### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3/roles/IFIFAX2BIRGUSTQ/targets/catalog/apps/amazon_aws"
```

###### Response example

``` http
HTTP/1.1 204 No Content
```

#### Add an App Instance target to an App administrator role

Assign an admin role to a specific App Instance to grant the admin permission to manage an instance of one App or instances of multiple Apps. App Instances are specific Apps that admins create in their org. For example, there may be a Salesforce App configured differently for each sales region of a company. When you create an App Instance target, you may assign an admin to manage only two instances of the configured Salesforce Apps and then also to manage an instance of another configured App such as Workday.

> **Note:** You can target a mixture of both App and App Instance targets, but can't assign permissions to manage all the instances of an App and then a subset of that same App. For example, you can't specify that an admin has access to manage all the instances of a Salesforce app and then also specific configurations of the Salesforce app.

##### Add an App Instance target to an App administrator role given to a User

<ApiOperation method="put" url="/api/v1/users/${userId}/roles/${roleId}/targets/catalog/apps/${appName}/${appInstanceId}" />

Adds an App Instance target for an `APP_ADMIN` Role assigned to a User

When you add the first App or App Instance target, you reduce the scope of the role assignment. The Role no longer applies to all App targets, but applies only to the specified target.

> **Note:** You can target a mixture of both App and App Instance targets, but can't assign permissions to manage all the instances of an App and then a subset of that same App. For example, you can't specify that an admin has access to manage all the instances of a Salesforce app and then also specific configurations of the Salesforce app.

###### Request parameters


| Parameter     | Description                                                  | Param Type   | DataType   | Required |
| :----------   | :----------------------------------------------------------- | :----------- | :--------- | :------- |
| `userId`        | ID of a User                                               | URL          | String     | TRUE     |
| `roleId`        | ID of a Role                                               | URL          | String     | TRUE     |
| `appName`       | Name of the App target from the catalog to scope role assignment   | URL          | String     | TRUE     |
| `appInstanceId` | ID of the App Instance target to scope role assignment     | URL          | String     | TRUE     |

###### Response parameters

``` http
HTTP/1.1 204 No Content
```

###### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/catalog/apps/amazon_aws/0oasrudLtMlzAsTxk0g3"
```

###### Response example

``` http
HTTP/1.1 204 No Content
```

##### Add an App Instance target to an App administrator role given to a Group

<ApiOperation method="put" url="/api/v1/groups/${groupId}/roles/${roleId}/targets/catalog/apps/${appName}/${appInstanceId}" />

Adds an App Instance target for an `APP_ADMIN` Role assigned to a Group

When you add the first App or App Instance target, you reduce the scope of the role assignment. The Role no longer applies to all App targets, but applies only to the specified target.

> **Note:** You can target a mixture of both App and App Instance targets, but can't assign permissions to manage all the instances of an App and then a subset of that same App. For example, you can't specify that an admin has access to manage all the instances of a Salesforce app and then also specific configurations of the Salesforce app.

###### Request parameters


| Parameter         | Description                                                  | Param Type   | DataType   | Required |
| :---------------- | :----------------------------------------------------------- | :----------- | :--------- | :------- |
| `appInstanceId`     | ID of the App Instance target to scope role assignment     | URL          | String     | TRUE     |
| `appName`           | Name of the App target from the catalog to scope role assignment   | URL          | String     | TRUE     |
| `groupId`           | ID of a Group                                              | URL          | String     | TRUE     |
| `roleId`            | ID of a Role                                               | URL          | String     | TRUE     |

###### Response parameters

``` http
HTTP/1.1 204 No Content
```

###### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3/roles/IFIFAX2BIRGUSTQ/targets/catalog/apps/facebook/0oassqD8YkfwsJeV60g3"
```

###### Response example

``` http
HTTP/1.1 204 No Content
```

#### Remove an App target from an App administrator role

##### Remove an App target from an App administrator role given to a User

<ApiOperation method="delete" url="/api/v1/users/${userId}/roles/${roleId}/targets/catalog/apps/${appName}" />

Removes an App target from an `APP_ADMIN` Role assigned to a User

> **Note:** Don't remove the last App target from a role assignment, as it causes an exception. If you need a role assignment that applies to all the Apps, the API consumer should delete the `APP_ADMIN` role assignment and recreate it.

###### Request parameters


| Parameter   | Description                                | Param Type   | DataType   | Required |
| :---------- | :----------------------------------------- | :----------- | :--------- | :------- |
| `appName`     | Name of the App target for role assignment   | URL          | String     | TRUE     |
| `roleId`      | ID of a Role                             | URL          | String     | TRUE     |
| `userId`      | ID of a User                             | URL          | String     | TRUE     |

###### Response parameters

``` http
HTTP/1.1 204 No Content
```

###### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/catalog/apps/amazon_aws"
```

###### Response example

``` http
HTTP/1.1 204 No Content
```

##### Remove an App target from an App administrator role given to a Group

<ApiOperation method="delete" url="/api/v1/groups/${groupId}/roles/${roleId}/targets/catalog/apps/${appName}" />

Removes an App target from an `APP_ADMIN` Role assigned to a Group

> **Note:** Don't remove the last App target from a role assignment, as it causes an exception. If you need a role assignment that applies to all the Apps, the API consumer should delete the `APP_ADMIN` role assignment and recreate it.

###### Request parameters

| Parameter   | Description                                | Param Type   | DataType   | Required |
| :---------- | :----------------------------------------- | :----------- | :--------- | :------- |
| `appName`     | Name of the App target for role assignment   | URL          | String     | TRUE     |
| `groupId`     | ID of a Group                            | URL          | String     | TRUE     |
| `roleId`      | ID of a Role                             | URL          | String     | TRUE     |

###### Response parameters

``` http
HTTP/1.1 204 No Content
```

###### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3/roles/IFIFAX2BIRGUSTQ/targets/catalog/apps/facebook"
```

###### Response example

``` http
HTTP/1.1 204 No Content
```

#### Remove an App instance target from an App administrator role

##### Remove an App instance target from an App administrator role given to a User

<ApiOperation method="delete" url="/api/v1/users/${userId}/roles/${roleId}/targets/catalog/apps/${appName}/${appInstanceId}" />

Removes an App instance target from an `APP_ADMIN` Role assigned to a User

> **Note:** Don't remove the last App target from a role assignment, as it causes an exception. If you need a role assignment that applies to all the Apps, the API consumer should delete the `APP_ADMIN` role assignment and recreate it.

###### Request parameters


| Parameter     | Description                                         | Param Type   | DataType   | Required |
| :----------   | :-----------------------------------------          | :----------- | :--------- | :------- |
| `appInstanceId` | ID of the App Instance target for role assignment | URL          | String     | TRUE     |
| `appName`       | Name of App target for role assignment            | URL          | String     | TRUE     |
| `roleId`        | ID of a Role                                      | URL          | String     | TRUE     |
| `userId`        | ID of a User                                      | URL          | String     | TRUE     |

###### Response parameters

``` http
HTTP/1.1 204 No Content
```

###### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/catalog/apps/amazon_aws"
```

###### Response example

``` http
HTTP/1.1 204 No Content
```

##### Remove an App instance target from an App administrator role given to a Group

<ApiOperation method="delete" url="/api/v1/groups/${groupId}/roles/${roleId}/targets/catalog/apps/${appName}/${appInstanceId}" />

Removes an App Instance target from an `APP_ADMIN` Role assigned to a Group

> **Note:** Don't remove the last App target from a role assignment, as it causes an exception. If you need a role assignment that applies to all the Apps, the API consumer should delete the `APP_ADMIN` role assignment and recreate it.

###### Request parameters


| Parameter         | Description                                           | Param Type   | DataType   | Required |
| :---------------- | :---------------------------------------------------- | :----------- | :--------- | :------- |
| `appInstanceId`     | ID of the App Instance target for role assignment   | URL          | String     | TRUE     |
| `appName`           | Name of the App target for role assignment              | URL          | String     | TRUE     |
| `groupId`           | ID of a Group                                       | URL          | String     | TRUE     |
| `roleId`            | ID of a Role                                        | URL          | String     | TRUE     |

###### Response parameters

``` http
HTTP/1.1 204 No Content
```

###### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3/roles/IFIFAX2BIRGUSTQ/targets/catalog/apps/facebook/0oassqD8YkfwsJeV60g3"
```

###### Response example

``` http
HTTP/1.1 204 No Content
```

## Role object

### Examples

#### Sample Role assigned to the User directly

```json
{
    "id": "ra125eqBFpETrMwu80g4",
    "label": "Organization Administrator",
    "type": "ORG_ADMIN",
    "status": "ACTIVE",
    "created": "2019-02-06T16:17:40.000Z",
    "lastUpdated": "2019-02-06T16:17:40.000Z",
    "assignmentType": "USER",
    "_links": {
        "assignee": {
            "href": "http://${yourOktaDomain}/api/v1/users/00ur32Vg0fvpyHZeQ0g3"
        }
    }
}
```

#### Sample Role assigned to the User through a Group membership

```json
{
    "id": "gra25fapn1prGTBKV0g4",
    "label": "API Access Management Administrator",
    "type": "API_ACCESS_MANAGEMENT_ADMIN",
    "status": "ACTIVE",
    "created": "2019-02-06T16:20:57.000Z",
    "lastUpdated": "2019-02-06T16:20:57.000Z",
    "assignmentType": "GROUP",
    "_links": {
        "assignee": {
            "href": "http://${yourOktaDomain}/api/v1/groups/00g1ousb3XCr9Dkr20g4"
        }
    }
}
```

#### Sample Custom Role assigned to the User directly

Note that the following fields are different compared to those for [an individually assigned standard Role](#sample-role-assigned-to-the-user-directly):

* The `id` field has a different format, but it has the same application.
* The `type` field for Custom Roles always has the value `CUSTOM`.
* The new `resource-set` field gives the ID of the Resource Set to which this assignment applies.
* The `_links` field has three new fields:
  * `resource-set` is the `GET` link to the Resource Set to which this assignment is granted.
  * `role` is the `GET` link to the Role to which this assignment is granted.
  * `permissions` is the `GET` link to the Permissions to which this assignment is granted.

```json
    {
        "id": "irb1q92TFAHzySt3x0g4",
        "role": "cr0Yq6IJxGIr0ouum0g3",
        "label": "UserCreatorRole",
        "type": "CUSTOM",
        "status": "ACTIVE",
        "created": "2019-02-06T16:20:57.000Z",
        "lastUpdated": "2019-02-06T16:20:57.000Z",
        "assignmentType": "USER",
        "resource-set": "iamoJDFKaJxGIr0oamd9g",
        "_links": {
            "assignee": {
                "href": "http://${yourOktaDomain}/api/v1/users/00u1gytb3XCr9Dkr18r2"
            },
            "resource-set": {
                "href": "http://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
            },
            "member": {
                "href": "http://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0Yq6IJxGIr0ouum0g3/members/irb1qe6PGuMc7Oh8N0g4"
            },
            "role": {
                "href": "http://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
            },
            "permissions": {
                "href": "http://${yourOktaDomain}/api/v1/iam/permission-sets/cr0Yq6IJxGIr0ouum0g3/permissions"
            }
        }
    }
```

#### Sample Custom Role assigned to the User through a Group membership

Note that the following fields are different compared to those for [a Group assigned standard Role](#sample-role-assigned-to-the-user-through-a-group-membership):

* The `id` field has a different format, but it has the same application.
* The `type` field for Custom Roles always has the value `CUSTOM`.
* The new `resource-set` field gives the ID of the Resource Set to which this assignment applies.
* The `_links` field has three new fields:
  * `resource-set` is the `GET` link to the Resource Set to which this assignment is granted.
  * `role` is the `GET` link to the Role to which this assignment is granted.
  * `permissions` is the `GET` link to the permissions to which this assignment is granted.

```json
{
  "id": "irb5e92YgBazyyQ3x1q5",
  "role": "cr0Yq6IJxGIr0ouum0g3",
  "label": "UserCreatorRole",
  "type": "CUSTOM",
  "status": "ACTIVE",
  "created": "2019-02-06T16:20:57.000Z",
  "lastUpdated": "2019-02-06T16:20:57.000Z",
  "assignmentType": "GROUP",
  "resource-set": "iamoakjsdQaJxGIr03int1o",
  "_links": {
    "assignee": {
      "href": "http://${yourOktaDomain}/api/v1/groups/00g1ousb3XCr9Dkr20g4"
    },
    "resource-set": {
      "href": "http://${yourOktaDomain}/api/v1/iam/resource-sets/iamoakjsdQaJxGIr03int1o"
    },
    "member": {
      "href": "http://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0Yq6IJxGIr0ouum0g3/members/irb1qe6PGuMc7Oh8N0g4"
    },
    "role": {
      "href": "http://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
    },
    "permissions": {
      "href": "http://${yourOktaDomain}/api/v1/iam/permission-sets/cr0Yq6IJxGIr0ouum0g3/permissions"
    }
  }
}
```

### Role properties

The Role object defines several **read-only** properties:

| Property         | Description                                             | DataType                                                                                                                                   | Nullable   | Unique   | Read Only |
| :--------------- | :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------                              | :--------- | :------- | :-------- |
| `_embedded`        | Embedded resources related to the Role assignment       | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                                                                             | TRUE       | FALSE    | TRUE      |
| `_links`           | Discoverable resources related to the Role assignment   | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                                                                             | TRUE       | FALSE    | TRUE      |
| `assignmentType`   | The type of assignment                                  | `USER`, `GROUP`                                                                                                                            | FALSE      | FALSE    | TRUE      |
| `created`          | Timestamp when the Role was assigned                        | Date                                                                                                                                       | FALSE      | FALSE    | TRUE      |
| `id`               | Unique key for the Role assignment                      | String                                                                                                                                     | FALSE      | TRUE     | TRUE      |
| `label`            | Display name of the Role                                    | String                                                                                                                                     | FALSE      | FALSE    | TRUE      |
| `lastUpdated`      | Timestamp when the Role was last updated                    | Date                                                                                                                                       | FALSE      | FALSE    | TRUE      |
| `status`           | Status of the Role assignment                               | `ACTIVE`                                                                                                                                   | FALSE      | FALSE    | TRUE      |
| `type`             | Type of Role                                            | See the [Role types](#role-types) table for a complete list. | FALSE      | FALSE    | TRUE      |
| `resource-set` <ApiLifecycle access="beta" />    | The Resource Set ID in which the Role is granted (only present for Custom Roles)        | String                                                                                                                                     | TRUE      | TRUE     | TRUE      |

#### Role links

<ApiLifecycle access="beta" />

The following `_links` are returned:

* `assignee`: Gets the User or Group through which this Role is assigned
* `resource-set`: (Only for Custom Roles) Gets the Resource Set that is targeted by this assignment
* `permissions`: (Only for Custom Roles) Gets a list of Permissions that is granted through this assignment
* `role`: (Only for Custom Roles) gets the Role that is granted through this assignment
* `member`: (Only for Custom Roles) gets the Member object from the Binding that grants this Role

#### Role types

Some Roles support optional targets that constrain the Role to a specific set of Groups or Apps. If an optional target isn't specified, then the Role assignment is unbounded (for example, applies to all Groups or Apps).

See the [product documentation](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Security_Administrators) for a complete definition of permissions granted to each Role.

| Role type                               | Label                               | Optional targets                      |
| :-------------------------------------- | :---------------------------------- | :------------------------------------ |
| `API_ACCESS_MANAGEMENT_ADMIN`           | API Access Management Administrator |                                       |
| `APP_ADMIN`                             | Application Administrator           | Apps                                  |
| `GROUP_MEMBERSHIP_ADMIN`                | Group Membership Administrator      | [Groups](/docs/reference/api/groups/) |
| `HELP_DESK_ADMIN`                       | Help Desk Administrator             | [Groups](/docs/reference/api/groups/) |
| `MOBILE_ADMIN`                          | Mobile Administrator                |                                       |
| `ORG_ADMIN`                             | Organizational Administrator        |                                       |
| `READ_ONLY_ADMIN`                       | Read-Only Administrator             |                                       |
| `REPORT_ADMIN`                          | Report Administrator                |                                       |
| `SUPER_ADMIN`                           | Super Administrator                 |                                       |
| `USER_ADMIN`                            | Group Administrator                 | [Groups](/docs/reference/api/groups/) |
| `CUSTOM` <ApiLifecycle access="beta" /> | Custom Label specified by the client    | [Groups](/docs/reference/api/groups/) |

`API_ACCESS MANAGEMENT_ADMIN` is available if the API Access Management feature is enabled. See [API Access Management Best Practices](/docs/concepts/api-access-management/#recommended-practices-for-api-access-management) for a description of what the Role can do.

#### Assignment types

A Role could either be assigned to the User directly or be assigned to a Group of which the User is a Member. The `assignee` in `_links` provides more details about the User or the Group to which the assignment was made.

| Assignment type     | Description                                                        |
| :------------------ | :----------------------------------------------------------------- |
| `GROUP`             | Role is assigned to an admin Group of which the User is a Member  |
| `USER`              | Role is assigned to the User directly                             |

## Custom Role object

<ApiLifecycle access="beta" />

A Custom Role is a custom set of [Permissions](#permission-types). A Custom Role is uniquely identified within your org by its ID or label.

### Custom role properties
| Property         | Description                         | DataType                                       | Nullable   | Unique   | Read Only |
| :--------------- | :---------------------------------- | :--------------------------------------------- | :--------- | :------- | :-------- |
| `id`               | Unique key for the Role             | String                                         | FALSE      | TRUE     | TRUE      |
| `label`            | Display name of Role                | String                                         | FALSE      | TRUE     | FALSE     |
| `created`      | The date and time the Role was created | Timestamp | FALSE      | FALSE    | TRUE     |
| `lastUpdated`      | The date and time the Role's label or description were last updated | Timestamp | FALSE      | FALSE    | TRUE     |
| `_links`           | Discoverable resources related to the Role      | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                                                | TRUE       | FALSE    | TRUE     |


#### Example

```json
{
    "id": "cr0Yq6IJxGIr0ouum0g3",
    "label": "UserCreator",
    "description": "Create users",
    "created": "2021-02-06T16:20:57.000Z",
    "lastUpdated": "2021-02-06T16:20:57.000Z",
    "_links": {
    "permissions": {
      "href": "http://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions"
    },
    "self": {
      "href": "http://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
    }
  }    
}
```
### Permission types

<ApiLifecycle access="beta" />

Permissions can be added to, or removed from, custom Roles.  Permissions to manage a resource also grant the viewing privileges for the same resource so that you won't need to assign them separately.

User permissions are only effective with respect to the Group(s) to which the admin is granted a Role through Resource Set assignments.

#### Permission properties
| Property         | Description                         | DataType                                       | Nullable   | Unique   | Read Only |
| :--------------- | :---------------------------------- | :--------------------------------------------- | :--------- | :------- | :-------- |
| `label`            | Type of permissions                | String                                         | FALSE      | FALSE     | TRUE     |
| `created`      | The date and time the Permission was added to the role | Timestamp | FALSE      | FALSE    | TRUE     |
| `lastUpdated`      | The date and time the permission's association with the role was last updated | Timestamp | FALSE      | FALSE    | TRUE     |
| `_links`           | Discoverable resources related to the Permission      | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                                                | TRUE       | FALSE    | TRUE     |


| Permission type                     | Description                                                                                                                         | Applicable resource types                    |
| :---------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- |
| `okta.users.manage`                 | Allows the admin to create and manage Users and read all profile and credential information for Users                               | All Users, all Users within a specific Group |
| `okta.users.create`                 | Allows the admin to create Users. If admin also scoped to manage a Group, can add the User to the group on creation and then manage | All Groups, a specific Group                 |
| `okta.users.read`                   | Allows the admin to read any User's profile and credential information                                                              | All Users, all Users within a specific Group |
| `okta.users.credentials.manage`     | Allows the admin to manage only credential lifecycle operations for a user                                                          | All Users, all Users within a specific Group |
| `okta.users.userprofile.manage`     | Allows the admin to only perform operations on the User Object, including hidden and sensitive attributes                                | All Users, all Users within a specific Group |
| `okta.users.lifecycle.manage`       | Allows the admin to only take any User lifecycle operations                                                                         | All Users, all Users within a specific Group |
| `okta.users.groupMembership.manage` | Allows the admin to manage a User's group membership (also need `okta.groups.members.manage` to assign to a specific Group)         | All Users, all Users within a specific Group |
| `okta.groups.manage`                | Allows the admin to fully manage Groups in your Okta organization                                                                   | All Groups, a specific Group                 |
| `okta.groups.create`                | Allows the admin to create Groups                                                                                                   | All Groups                                   |
| `okta.groups.members.manage`        | Allows the admin to only take member operations in a Group in your Okta org                                                         | All Groups, a specific Group                 |
| `okta.groups.read`                  | Allows the admin to only read information about Groups and their members in your Okta organization                                  | All Groups, a specific Group                 |

#### Example

```json
{ 
  "label" : "okta.users.read",
  "created": "2021-02-06T16:20:57.000Z",
  "lastUpdated": "2021-02-06T16:20:57.000Z",
  "_links": {
    "role": {
      "href": "https://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions/okta.users.read"
    }
  }
}
```

## Resource Set object

<ApiLifecycle access="beta" />

A Resource Set is a collection of resources. As there can be too many resources in a set, the object itself doesn't list the resources but provides a paginable link to fetch resources.

| Property         | Description                                             | DataType                                                                                                      | Nullable   | Unique   | Read Only |
| :--------------- | :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------ | :--------- | :------- | :-------- |
| `id`               | Unique key for the Resource Set                         | String                                                                                                        | FALSE      | TRUE     | TRUE      |
| `label`            | Display name of the Resource Set                        | String                                                                                                        | FALSE      | TRUE     | FALSE     |
| `description`      | A description of the Resource Set                       | String                                                                                                        | FALSE      | FALSE    | FALSE     |
| `_links`           | Discoverable resources related to the Resource Set      | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                                                | TRUE       | FALSE    | FALSE     |

The following `_links` are returned:

* `self` gets this Resource Set
* `resources` gets a paginable list of resources included in this set
* `bindings` gets a paginable list of admin Role Bindings assigned to this set

### Resource object

A resource has an ID and a link that points to the resource. Supported resources are:

* Groups
* All Users within a Group
* All Users and Groups within the org

The ID of a resource is unique to the Resource Set, whereas the link that points to the resource is unique for the org. A Group, if used in two Resource Sets, has distinct IDs in each Resource Set but has the same self link in both.

#### Resource examples

##### Group as resource

```json
    {
      "id": "ire106sQKoHoXXsAe0g4",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/groups/00guaxWZ0AOa5NFAj0g3"
        }
      }
    }
```

##### Users of a Group as resource

```json
    {
      "id": "ire106sQKoHoXXsAe0g4",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/groups/00guaxWZ0AOa5NFAj0g3/users"
        }
      }
    }
```

##### All Users and Groups as resource

```json
    {
      "id": "ire106sQKoHoXXsAe0g4",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "users": {
          "href": "https://${yourOktaDomain}/api/v1/users"
        },
        "groups": {
          "href": "https://${yourOktaDomain}/api/v1/groups"
        }
      }
    }
```

> **Note:** When you provide either [all Groups](#all-groups-as-resource) or [all Users](#all-users-as-resource) when adding a resource to a [Resource Set](#resource-set-object), a single resource that encompasses all Users and Groups is included.

### Binding object

A Binding represents the assignment of a [Custom Role](#custom-role-object) to a list of admins. Bindings are specific to a [Resource Set](#resource-set-object). There is a maximum of one Binding object per Role in a Resource Set.

The admin list assigned to a Role is made of [resource objects](#resource-object) that represent either of the following types of admin assignments:

* Directly assigned to the User
* Assigned to a Group

| Property         | Description                                                     | DataType       | Nullable   | Unique   | Read Only |
| :--------------- | :-------------------------------------------------------------- | :------------- | :--------- | :------- | :-------- |
| `id`               | ID of the Role granted in this Binding                        | String         | FALSE      | FALSE    | FALSE     |
| `_links`           | Discoverable resources related to the Resource Set              | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                                                | TRUE       | FALSE    | FALSE     |

The following `_links` are returned:

* `self` gets this Binding
* `members` gets a paginable list of Members included in this Binding

#### Member object

A Member has an ID and a link to the resource that represents the Role grantee. Supported resources are:

* Groups
* Users

The ID of a Member is unique to the Binding, whereas the link that points to the resource is unique for the org. The Group, if used in two Bindings, has distinct IDs in each but the same self link in both.

##### Member examples

###### Group as member

```json
    {
      "id": "irb1q92TFAHzySt3x0g4",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/groups/00guaxWZ0AOa5NFAj0g3"
        }
      }
    }
```

##### User as member

```json
    {
      "id": "irb1qe6PGuMc7Oh8N0g4",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/users/00uuk41Hjga5qGfQ30g3"
        }
      }
    }
```
