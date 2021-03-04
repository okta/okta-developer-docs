---
title: Administrator Roles
category: management
meta:
  - name: description
    content: The Okta Administrator Roles API provides operations to manage administrative role assignments for a user. Read this page to get started with Admin Roles.
---

# Administrator Roles API

The Okta Administrator Roles API provides operations to manage administrative role assignments for a User.

This document contains the operations supported for [managing administrators using the existing generally available role assignment APIs](#/docs/reference/api/roles) as well as the BETA custom role assignment APIs.

Role listing APIs provide a union of both standard and custom roles assigned to a User or Group. We are, therefore, providing both groups of APIs and their intersections in this single doc, which will eventually replace the contents of the existing docs.

The following sections are added or update:
* [Custom role operations](#custom-role-operations)
* [Resource set operations](#resource-set-operations)
* [Custom role assignment operations](#custom-role-assignment-operations)
* [List Roles](#list-roles)
* [Assign a Custom Role to a User or Group](#assign-a-custom-role-to-a-user-or-group)
* [Unassign a Custom Role from a User or Group](#unassign-a-custom-role-from-a-user-or-group)
* [Role target operations](#role-target-operations)
* [Role properties](#role-properties)
* [Role links](#role-links)
* [Role types](#role-types)
* [Custom role object](#custom-role-object)
* [Permission types](#permission-types)
* [Resource set object](#resource-set-object)

## Get started

Explore the Administrator Roles API:  [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/4f1233beeef282acbcfb)

## Custom role operations
<ApiLifecycle access="beta" />
These operations allow the creation and manipulation of custom roles as custom collections of [permissions](#permission-types).

### Create role
<ApiOperation method="post" url="/api/v1/iam/roles" />

Creates a new role with a custom set of permissions

#### Request parameters

| Parameter   | Description                          | Param Type   | DataType                    | Required |
| :---------- | :----------------------------------- | :----------- | :----------------------------------------------- | :------- |
| label       | name given to new role               | Body         | String                                           | TRUE     |
| description | description of the new role          | Body         | String                                           | TRUE     |
| permissions | the permissions the new role grants  | Body         | Array of [Permission types](#permission-types)   | TRUE     |

#### Response parameters

Created custom [role](#custom-role-object)

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
  "permissions": [
    "okta.users.create",
    "okta.users.read",
    "okta.groups.read",
    "okta.users.profile.manage"
  ]
}
```

### Get role
<ApiOperation method="get" url="/api/v1/iam/roles/${roleIdOrLabel}" />

Get a custom role by its id or label

#### Request parameters

| Parameter     | Description                          | Param Type   | DataType                    | Required |
| :------------ | :----------------------------------- | :----------- | :----------------------------------------------- | :------- |
| roleIdOrLabel | id or label of the role              | URL          | String                                           | TRUE     |

#### Response parameters

Requested custom [Role](#custom-role-object)

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
  "permissions": [
    "okta.users.create",
    "okta.users.read",
    "okta.groups.read",
    "okta.users.profile.manage"
  ]
}
```

### List roles
<ApiOperation method="get" url="/api/v1/iam/roles" />

Get a paginated list of custom roles

#### Response parameters

A paginated list of [custom roles](#custom-role-object)

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
      "description": "..."
    },
    {
      "id": "cr0Fw7HKcWIroo88m3r1",
      "label": "GroupMembershipManager",
      "description": "..."
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
<ApiOperation method="get" url="/api/v1/iam/roles/${roleIdOrLabel}/permissions" />

Get the list of permissions included in a custom role identified by its id or label

#### Request parameters

| Parameter     | Description                          | Param Type   | DataType                    | Required |
| :------------ | :----------------------------------- | :----------- | :----------------------------------------------- | :------- |
| roleIdOrLabel | id or label of the role              | URL          | String                                           | TRUE     |

#### Response parameters

An array of [Permission types](#permission-types) which make the role identified by `${roleIdOrLabel}` and a link to that role

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
    "okta.users.create",
    "okta.users.read",
    "okta.groups.read",
    "okta.users.profile.manage"
  ],
  "_links": {
    "role": {
      "href": "https://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
    }
  }
}
```

### Add permission
<ApiOperation method="post" url="/api/v1/iam/roles/${roleIdOrLabel}/permissions/${permissionType}" />

Add a new permission to an existing role

#### Request parameters

| Parameter      | Description                          | Param Type   | DataType                              | Required |
| :------------- | :----------------------------------- | :----------- | :------------------------------------ | :------- |
| roleIdOrLabel  | id or label of the role              | URL          | String                                | TRUE     |
| permissionType | permission to add to the role        | URL          | [Permission type](#permission-types)) | TRUE     |

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

### Delete permission
<ApiOperation method="delete" url="/api/v1/iam/roles/${roleIdOrLabel}/permissions/${permissionType}" />

Deletes a permission from an existing role

#### Request parameters

| Parameter      | Description                          | Param Type   | DataType                              | Required |
| :------------- | :----------------------------------- | :----------- | :------------------------------------ | :------- |
| roleIdOrLabel  | id or label of the role              | URL          | String                                | TRUE     |
| permissionType | permission to remove from the role   | URL          | [Permission type](#permission-types)) | TRUE     |

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

### Delete role
<ApiOperation method="delete" url="/api/v1/iam/roles/${roleIdOrLabel}" />

Deletes a custom role

#### Request parameters

| Parameter       | Description                          | Param Type   | DataType                              | Required |
| :-------------- | :----------------------------------- | :----------- | :------------------------------------ | :------- |
| roleIdOrLabel   | id or label of the role              | URL          | String                                | TRUE     |

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

## Resource-set operations
<ApiLifecycle access="beta" />
These operations allow the creation and manipulation of resource sets as custom collections of resources. Resource-sets are used to assign [custom roles](#custom-role-operations) to administrators, scoped to the designated resources..

### Create resource set
<ApiOperation method="post" url="/api/v1/iam/resource-sets" />

Creates a new resource set with a custom set of resources

#### Request parameters

| Parameter   | Description                                                                    | Param Type   | DataType     | Required |
| :---------- | :----------------------------------------------------------------------------- | :----------- | :----------- | :------- |
| label       | Unique name given to new resource set                                          | Body         | String       | TRUE     |
| description | description of the new resource set                                            | Body         | String       | TRUE     |
| resources   | the endpoints referencing the resources to be included in the new resource set | Body         | Array of URL | FALSE    |

#### Response parameters

Created [resource set](#resource-set-object)

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
        "https://${yourOktaDomain}/api/v1/users",
        "https://${yourOktaDomain}/api/v1/groups",
      ]
    }' "https://${yourOktaDomain}/api/v1/iam/resource-sets"
```

#### Response example

```json
{
  "id": "iamoJDFKaJxGIr0oamd9g",
  "label": "SF-IT-People",
  "description": "People in the IT department of San Francisco",
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

### Get resource set
<ApiOperation method="get" url="/api/v1/iam/resource-sets/${resourceSetId}" />

Get a resource set by its id

#### Request parameters

| Parameter     | Description                          | Param Type   | DataType                    | Required |
| :------------ | :----------------------------------- | :----------- | :----------------------------------------------- | :------- |
| resourceSetId | Unique id of the resource set        | URL          | String                                           | TRUE     |

#### Response parameters

Requested [resource set](#resource-set-object)

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
<ApiOperation method="get" url="/api/v1/iam/resource-sets}" />

Get a paginated list of resource sets

#### Response parameters

Paginated list of [resource sets](#resource-set-object)

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
<ApiOperation method="put" url="/api/v1/iam/resource-sets/${resourceSetId}" />

Update label and description of a resource set

#### Request parameters

| Parameter     | Description                               | Param Type   | DataType     | Required |
| :------------ | :---------------------------------------- | :----------- | :----------- | :------- |
| resourceSetId | Unique id of the resource set             | URL          | String       | TRUE     |
| label         | New unique name given to the resource set | Body         | String       | TRUE     |
| description   | New description of the the resource set   | Body         | String       | TRUE     |

#### Response parameters

Updated [resource set](#resource-set-object)

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
<ApiOperation method="delete" url="/api/v1/iam/resource-sets/${resourceSetId}" />

Deletes a resource set and all its associated bindings.

#### Request parameters

| Parameter      | Description                          | Param Type   | DataType                              | Required |
| :------------- | :----------------------------------- | :----------- | :------------------------------------ | :------- |
| resourceSetId  | id of the resource set               | URL          | String                                | TRUE     |

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
These help adding, removing and listing of resources within a resource set

#### Add more resources
<ApiOperation method="patch" url="/api/v1/iam/resource-sets/${resourceSetId}/resources" />

Add more resources to a resource set

##### Request parameters

| Parameter      | Description                                                                       | Param Type   | DataType     | Required |
| :------------- | :----------------------------------------------------------------------------- | :----------- | :----------- | :------- |
| resourceSetId  | id of the resource set                                                         | URL          | String       | TRUE     |
| additions      | the endpoints referencing the resources to be included in the new resource set | Body         | Array of URL | TRUE     |

##### Response parameters

The following `_links` are returned:
* `resources` gets a paginable list of resources included in the set
* `resource-set` gets the updated resource set

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
<ApiOperation method="get" url="/api/v1/iam/resource-sets/${resourceSetId}/resources" />

List resources that make up a resource set

##### Request parameters

| Parameter   | Description                                                                       | Param Type   | DataType     | Required |
| :------------- | :---------------------- | :----------- | :----------- | :------- |
| resourceSetId  | id of the resource set  | URL          | String       | TRUE     |

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
      "_links": {
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/groups/00guaxWZ0AOa5NFAj0g3"
        }
      }
    },
    {
      "id": "ire106riDrTYl4qA70g4",
      "_links": {
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/groups/00gu67DU2qNCjNZYO0g3/users"
        }
      }
    },
    {
      "id": "irezvo4AwE2ngpMw40g3",
      "_links": {
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/users"
        }
      }
    },
    {
      "id": "irezvn1ZZxLSIBM2J0g3",
      "_links": {
        "self": {
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
<ApiOperation method="delete" url="/api/v1/iam/resource-sets/${resourceSetId}/resources/${resourceId}" />

Remove a resource from a resource set

##### Request parameters

| Parameter      | Description                             | Param Type   | DataType     | Required |
| :------------- | :-------------------------------------- | :----------- | :----------- | :------- |
| resourceSetId  | id of the resource set                  | URL          | String       | TRUE     |
| resourceId     | id of the resource within resource set  | URL          | String       | TRUE     |

`resourceId` is the id obtained when [listing resources within resource set](#list-resources). For example, if the resource object was:
```json
    {
      "id": "ire106sQKoHoXXsAe0g4",
      "_links": {
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/groups/00guaxWZ0AOa5NFAj0g3"
        }
      }
    }
```
`ire106sQKoHoXXsAe0g4` could be used as `resourceId` to remove the groups from list of resources in the set.

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

## Custom role assignment operations
<ApiLifecycle access="beta" />
These operations allow the assignment and unassignment of custom roles. This is done by creating a binding.
A binding is represents an association of a principal, role and resource set uniquely identified by the `bindingId`.

### Create a new binding
<ApiOperation method="post" url="/api/v1/iam/resource-sets/${resourceSetId}/bindings" />

Assign a custom role by creating a binding between the role and the admin targetting an existing resource set.

#### Request parameters

| Parameter      | Description                                                   | Param Type    | DataType       | Required |
| :------------- | :------------------------------------------------------------ | :------------ | :------------- | :------- |
| role           | id of the role                                                | Body          | String         | TRUE     |
| members        | hrefs pointing to user(s) and/or group(s) receiving the role  | Body          | Array of hrefs | TRUE     |

#### Response parameters

The following `_links` are returned:
* `self` gets this role's binding within the resource set
* `bindings` get a paginable list of role bindings in the resource set
* `resource-set` gets resource set

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

### Add more members to a binding
<ApiOperation method="patch" url="/api/v1/iam/resource-sets/${resourceSetId}/bindings/${roleId}/members" />

Add more members to a role binding already created in a resource set.

#### Request parameters

| Parameter      | Description                                                           | Param Type   | DataType       | Required |
| :------------- | :-------------------------------------------------------------------- | :----------- | :------------- | :------- |
| resourceSetId  | id of the target resource set                                         | URL          | String         | TRUE     |
| roleId         | the id of the role to grant                                           | URL          | String         | TRUE     |
| additions      | Array of hrefs pointing to user(s) and/or group(s) receiving the role | Body         | Array of hrefs | TRUE     |

#### Response parameters

The following `_links` are returned:
* `self` gets this role's binding within the resource set
* `bindings` get a paginable list of role bindings in the resource set
* `resource-set` gets resource set

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

### List members in a binding
<ApiOperation method="get" url="/api/v1/iam/resource-sets/${resourceSetId}/bindings/${roleId}/members" />

Get a paginated list of members assigned to a role in a resource set

#### Request parameters

| Parameter      | Description                                                           | Param Type   | DataType       | Required |
| :------------- | :-------------------------------------------------------------------- | :----------- | :------------- | :------- |
| resourceSetId  | id of the target resource set                                         | URL          | String         | TRUE     |
| roleId         | the id of the role to identify the binding                            | URL          | String         | TRUE     |

#### Response parameters

A paginated list of [members](#member-object).

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
      "_links": {
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/users/00uuk41Hjga5qGfQ30g3"
        }
      }
    }, {
      "id": "irb1q92TFAHzySt3x0g4",
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
### Get a member from a binding
<ApiOperation method="get" url="/api/v1/iam/resource-sets/${resourceSetId}/bindings/${roleId}/members/${memberId}" />

Get a member of a role in a resource set

#### Request parameters

| Parameter      | Description                                                           | Param Type   | DataType       | Required |
| :------------- | :-------------------------------------------------------------------- | :----------- | :------------- | :------- |
| resourceSetId  | id of the target resource set                                         | URL          | String         | TRUE     |
| roleId         | the id of the role to identify the binding                            | URL          | String         | TRUE     |
| memberId       | the id of the member within the binding                               | URL          | String         | TRUE     |


`memberId` is the id obtained when [listing members within binding](#list-members-in-a-binding). For example, if the member object was:
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
`irb1qe6PGuMc7Oh8N0g4` could be used as `memberId` to remove the user from list of members in the binding.

#### Response parameters

Response is the id representing the binding and a link to the actual member object which could be a User or a Group.

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
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/users/00uuk41Hjga5qGfQ30g3"
    }
  }
}
```

### Delete a member from a binding
<ApiOperation method="delete" url="/api/v1/iam/resource-sets/${resourceSetId}/bindings/${roleId}/members/${memberId}" />

Delete a member of a role in a resource set

#### Request parameters

| Parameter      | Description                                                           | Param Type   | DataType       | Required |
| :------------- | :-------------------------------------------------------------------- | :----------- | :------------- | :------- |
| resourceSetId  | id of the target resource set                                         | URL          | String         | TRUE     |
| roleId         | the id of the role to identify the binding                            | URL          | String         | TRUE     |
| memberId       | the id of the member within the binding                               | URL          | String         | TRUE     |


`memberId` is the id obtained when [listing members within binding](#list-members-in-a-binding). For example, if the member object was:
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
`irb1qe6PGuMc7Oh8N0g4` could be used as `memberId` to remove the user from list of members in the binding.

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

### Retrieve bindings

#### Get a binding by role id
<ApiOperation method="get" url="/api/v1/iam/resource-sets/${resourceSetId}/bindings/${roleId}" />

Get a binding from a resource set by its role id

##### Request parameters

| Parameter      | Description             | Param Type   | DataType     | Required |
| :------------- | :---------------------- | :----------- | :----------- | :------- |
| resourceSetId  | id of the resource set  | URL          | String       | TRUE     |
| roleId         | id of the role          | URL          | String       | TRUE     |

##### Response parameters

The `id` of the role as well as the following `_links`:
* `self` gets this role's binding within the resource set
* `bindings` get a paginable list of role bindings in the resource set
* `resource-set` gets resource set

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

#### Get all bindings in a resource set
<ApiOperation method="get" url="/api/v1/iam/resource-sets/${resourceSetId}/bindings" />

Get all binding from a resource set

##### Request parameters

| Parameter      | Description             | Param Type   | DataType     | Required |
| :------------- | :---------------------- | :----------- | :----------- | :------- |
| resourceSetId  | id of the resource set  | URL          | String       | TRUE     |

##### Response parameters

A paginated list of [bindings](#binding-object).

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

### Delete a binding
<ApiOperation method="delete" url="/api/v1/iam/resource-sets/${resourceSetId}/bindings/${roleId}" />

Delete a binding of a role from a resource set

#### Request parameters

| Parameter      | Description             | Param Type   | DataType     | Required |
| :------------- | :---------------------- | :----------- | :----------- | :------- |
| resourceSetId  | id of the resource set  | URL          | String       | TRUE     |
| roleId         | id of the role          | URL          | String       | TRUE     |

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

You can grant third-party admin status when you are adding a new admin using the API. You can do this by using an optional query parameter on the Administrator Roles API called `disableNotifications`.

When this setting is enabled, the admins will not receive any of the default Okta administrator emails. These admins will also not have access to contact Okta Support and open support cases on behalf of your org.

### List Roles

#### List Roles assigned to a User


<ApiOperation method="get" url="/api/v1/users/${userId}/roles" />

Lists all Roles assigned to a User

##### Request parameters


| Parameter     | Description                                          | Param Type  | DataType  | Required  |
| :------------ | :--------------------------------------------------- | :---------- | :-------- | :-------- |
| userId        | `id` of a User                                       | URL         | String    | TRUE      |

##### Response parameters


Array of [Role](#role-object)

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
##### Response example with custom roles
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
| groupId           | `id` of a Group                                         | URL         | String    | TRUE      |

##### Response parameters


Array of [Role](#role-object)

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
| type        | type of Role to assign   | Body         | [Role Type](#role-types)    | TRUE     |
| userId      | `id` of a User           | URL          | String                      | TRUE     |

##### Response parameters


Assigned [Role](#role-object)

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
| groupId         | `id` of a Group             | URL          | String                      | TRUE     |
| type            | type of Role to assign      | Body         | [Role Type](#role-types)    | TRUE     |

##### Response parameters


Assigned [Role](#role-object)

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

The recommended way to assign a custom role is by using one of the [custom role assignment operations](#custom-role-assignment-operations). However, it is also possible to use the following to assign them too:
<ApiOperation method="post" url="/api/v1/groups/${userId}/roles" />
or to assign to a group:
<ApiOperation method="post" url="/api/v1/groups/${groupId}/roles" />
as long as the request body contains a custom `role` id and a `resource-set` id. Also, `type` must be `CUSTOM`

##### Request parameters

| Parameter       | Description                 | Param Type   | DataType                    | Required |
| :-------------- | :-------------------------- | :----------- | :-------------------------- | :------- |
| type            | type of Role to assign      | Body         | String literal: `CUSTOM`    | TRUE     |
| role            | the id of the custom role   | Body         | String                      | TRUE     |
| resource-set    | the id of the resource set  | Body         | String                      | TRUE     |

##### Response parameters

Assigned [Role](#role-object)

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
| roleId      | `id` of a Role | URL          | String     | TRUE     |
| userId      | `id` of a User | URL          | String     | TRUE     |

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
| groupId         | `id` of a Group   | URL          | String     | TRUE     |
| roleId          | `id` of a Role    | URL          | String     | TRUE     |

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

The recommended way to assign a custom role is by using one of the [custom role assignment operations](#custom-role-assignment-operations). However, it is also possible to use the following to unassign them too:
<ApiOperation method="delete" url="/api/v1/groups/${groupId}/roles/${bindingId}" />
or to assign to a group:
<ApiOperation method="delete" url="/api/v1/groups/${groupId}/roles/${bindingId}" />
but note that instead of `${roleId}` a `${bindingId}` must be provided.

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
* **App targets:** Grant an admin permission to manage all instances of specified Apps. Target Apps are Okta catalog Apps. For example, there can be multiple configurations of an Okta catalog App, such as Salesforce or Facebook. When you add a Salesforce or Facebook App as a target, that grants the admin permission to manage all instances of those Apps and create new instances of them.
* **App Instance targets:** Grant an admin permission to manage an instance of one App or instances of multiple Apps. App Instances are specific Apps that admins have created in their org. For example, there may be a Salesforce App configured differently for each sales region of a company. When you create an App Instance target, an admin may be assigned to manage only two instances of the configured Salesforce Apps and perhaps assigned to manage an instance of another configured App, such as Workday.

> **Note:**<ApiLifecycle access="beta" /> Don't use these operations with a custom role id. Custom role assignments always require a target resource set. Use [custom role assignment operations](#custom-role-assignment-operations) or the backward-compatible [role assignment](#assign-a-custom-role-to-a-user-or-group) or [unassignment](#unassign-a-custom-role-from-a-user-or-group) operations.

### Group administrator role Group targets

Assigns a Group admin role to a specific Group that grants the admin permission to manage only that Group. For example, an admin role may be assigned to manage only the IT group. The permissions for specifically what an admin can do within that Group depends on the admin role that they are assigned to. See [Administrators](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Administrators).

#### List Group targets for the Group administrator role

##### List Group targets for the Group administrator role given to a User

<ApiOperation method="get" url="/api/v1/users/${userId}/roles/${roleId}/targets/groups" />

Lists all Group targets for a `USER_ADMIN` or `HELP_DESK_ADMIN` Role assigned to a User

###### Request parameters


| Parameter   | Description                                                    | Param Type   | DataType   | Required |
| :---------- | :------------------------------------------------------------- | :----------- | :--------- | :------- |
| after       | Specifies the pagination cursor for the next page of targets   | Query        | String     | FALSE    |
| limit       | Specifies the number of results for a page (default is 20)     | Query        | Number     | FALSE    |
| roleId      | `id` of a Role                                                 | URL          | String     | TRUE     |
| userId      | `id` of a User                                                 | URL          | String     | TRUE     |

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

##### List Group targets for a Group administrator role given to a Group

<ApiOperation method="get" url="/api/v1/groups/${groupId}/roles/${roleId}/targets/groups" />

Lists all Group targets for a `USER_ADMIN` or `HELP_DESK_ADMIN` Role assigned to a Group

###### Request parameters


| Parameter       | Description                                                    | Param Type   | DataType   | Required |
| :-------------- | :------------------------------------------------------------- | :----------- | :--------- | :------- |
| after           | Specifies the pagination cursor for the next page of targets   | Query        | String     | FALSE    |
| groupId         | `id` of a Group                                                | URL          | String     | TRUE     |
| limit           | Specifies the number of results for a page (default is 20)     | Query        | Number     | FALSE    |
| roleId          | `id` of a Role                                                 | URL          | String     | TRUE     |

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

#### Add a Group target to a Group administrator role

##### Add a Group target to a Group administrator role given to a User


<ApiOperation method="put" url="/api/v1/users/${userId}/roles/${roleId}/targets/groups/${groupId}" />

Adds a Group target for a `USER_ADMIN` or `HELP_DESK_ADMIN` Role assigned to a User

When you add the first Group target, you reduce the scope of the role assignment. The Role no longer applies to all targets, but applies only to the specified target.

###### Request parameters


| Parameter   | Description                                     | Param Type   | DataType   | Required |
| :---------- | :---------------------------------------------- | :----------- | :--------- | :------- |
| groupId     | `id` of Group target to scope role assignment   | URL          | String     | TRUE     |
| roleId      | `id` of a Role                                  | URL          | String     | TRUE     |
| userId      | `id` of a User                                  | URL          | String     | TRUE     |

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

##### Add Group target to Group administrator role given to a Group

<ApiOperation method="put" url="/api/v1/groups/${groupId}/roles/${roleId}/targets/groups/${targetGroupId}" />

Adds a Group target for a `USER_ADMIN` or `HELP_DESK_ADMIN` Role assigned to a Group

When you add the first Group target, you reduce the scope of the role assignment. The Role no longer applies to all targets, but applies only to the specified target.

###### Request parameters


| Parameter            | Description                                     | Param Type   | DataType   | Required |
| :------------------- | :---------------------------------------------- | :----------- | :--------- | :------- |
| groupId              | `id` of an admin Group                          | URL          | String     | TRUE     |
| roleId               | `id` of a Role                                  | URL          | String     | TRUE     |
| targetGroupId        | `id` of Group target to scope role assignment   | URL          | String     | TRUE     |

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

#### Remove a Group target from a Group administrator role

##### Remove a Group target from a Group administrator role given to a User


<ApiOperation method="delete" url="/api/v1/users/${userId}/roles/${roleId}/targets/groups/${groupId}" />

Removes a Group target from a `USER_ADMIN` or `HELP_DESK_ADMIN` Role assigned to a User

> **Note:** Don't remove the last Group target from a role assignment, as this causes an exception. If you need a role assignment that applies to all Groups, the API consumer should delete the `USER_ADMIN` role assignment and recreate it.

###### Request parameters


| Parameter   | Description                                | Param Type   | DataType   | Required |
| :---------- | :----------------------------------------- | :----------- | :--------- | :------- |
| groupId     | `id` of Group target for role assignment   | URL          | String     | TRUE     |
| roleId      | `id` of a Role                             | URL          | String     | TRUE     |
| userId      | `id` of a User                             | URL          | String     | TRUE     |

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

##### Remove a Group target from a Group administrator role given to a Group

<ApiOperation method="delete" url="/api/v1/groups/${groupId}/roles/${roleId}/targets/groups/${targetGroupId}" />

Removes a Group target from a `USER_ADMIN` or `HELP_DESK_ADMIN` Role assigned to a Group

> **Note:** Don't remove the last Group target from a role assignment, as this causes an exception. If you need a role assignment that applies to all Groups, the API consumer should delete the `USER_ADMIN` role assignment and recreate it.

###### Request parameters


| Parameter       | Description                                | Param Type   | DataType   | Required |
| :-------------- | :----------------------------------------- | :----------- | :--------- | :------- |
| groupId         | `id` of an admin Group                     | URL          | String     | TRUE     |
| roleId          | `id` of a Role                             | URL          | String     | TRUE     |
| targetGroupId   | `id` of Group target for role assignment   | URL          | String     | TRUE     |

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

### App administrator role App targets

Assign an admin role to a subset of Apps to grant the admin permission to manage all instances of those Apps. Targeted Apps are Okta catalog Apps, and you can assign App targets for these Apps to an admin role regardless of whether a specific instance of the App has been created. For example, there can be multiple configurations of one Okta catalog App, such as Salesforce or Facebook. When you add a Salesforce or Facebook App as a target, that grants the admin permission to manage all instances of Salesforce or Facebook Apps and create new instances of them.

#### List App targets for an App administrator role

##### List App targets for an App administrator role given to a User

<ApiOperation method="get" url="/api/v1/users/${userId}/roles/${roleId}/targets/catalog/apps" />

Lists all App targets for an `APP_ADMIN` Role assigned to a User

###### Request parameters


| Parameter   | Description                                                    | Param Type   | DataType   | Required |
| :---------- | :------------------------------------------------------------- | :----------- | :--------- | :------- |
| after       | Specifies the pagination cursor for the next page of targets   | Query        | String     | FALSE    |
| limit       | Specifies the number of results for a page (default is 20)     | Query        | Number     | FALSE    |
| roleId      | `id` of a Role                                                 | URL          | String     | TRUE     |
| userId      | `id` of a User                                                 | URL          | String     | TRUE     |

Treat the page cursor as an opaque value: obtain it through the next link relation. See [Pagination](/docs/reference/api-overview/#pagination).

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

The example shows two applications and two instances. Note the response for instances has an `id` field.

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

##### List App targets for App Administrator Role given to a Group


<ApiOperation method="get" url="/api/v1/groups/${groupId}/roles/${roleId}/targets/catalog/apps" />

Lists all App targets for an `APP_ADMIN` Role assigned to a Group

###### Request Parameters


| Parameter   | Description                                                    | Param Type   | DataType   | Required |
| :---------- | :------------------------------------------------------------- | :----------- | :--------- | :------- |
| after       | Specifies the pagination cursor for the next page of targets   | Query        | String     | FALSE    |
| groupId     | `id` of a Group                                                | URL          | String     | TRUE     |
| limit       | Specifies the number of results for a page (default is 20)     | Query        | Number     | FALSE    |
| roleId      | `id` of a Role                                                 | URL          | String     | TRUE     |

Treat the page cursor as an opaque value: obtain it through the next link relation. See [Pagination](/docs/reference/api-overview/#pagination).

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

The example shows one application and one instance. Note the response for instances has an `id` field.

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

When you add the first App target, you reduce the scope of the role assignment. The Role no longer applies to all App targets, but applies only to the specified target.

Adding an App target overrides any existing App Instance targets of the App. For example, if someone was assigned to administer a specific Facebook instance, calling this endpoint with `facebook` for `appName`, would make them administrator for all Facebook instances.

###### Request parameters


| Parameter   | Description                                                  | Param Type   | DataType   | Required |
| :---------- | :----------------------------------------------------------- | :----------- | :--------- | :------- |
| appName     | `name` of App target from catalog to scope role assignment   | URL          | String     | TRUE     |
| roleId      | `id` of a Role                                               | URL          | String     | TRUE     |
| userId      | `id` of a User                                               | URL          | String     | TRUE     |

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

Adds an App target for an `APP_ADMIN` role assigned to a group

When you add the first App target, you reduce the scope of the role assignment. The Role no longer applies to all App targets, but applies only to the specified target.

Adding an App target overrides any existing instance targets of the app. For example, if someone was assigned to administer a specific Facebook instance, calling this endpoint with `facebook` for `appName`, would make them administrator for all Facebook instances.

###### Request parameters


| Parameter   | Description                                                  | Param Type   | DataType   | Required |
| :---------- | :----------------------------------------------------------- | :----------- | :--------- | :------- |
| groupId     | `id` of a Group                                              | URL          | String     | TRUE     |
| roleId      | `id` of a Role                                               | URL          | String     | TRUE     |
| appName     | `name` of App target from catalog to scope role assignment   | URL          | String     | TRUE     |

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

Assign an admin role to a specific App Instance to grant the admin permission to manage an instance of one App or instances of multiple Apps. App Instances are specific Apps that admins have created in their org. For example, there may be a Salesforce App configured differently for each sales region of a company. When you create an App Instance target, an admin may be assigned to manage only two instances of the configured Salesforce Apps and perhaps assigned to manage an instance of another configured App, such as Workday.

> **Note:** You can target a mixture of both App and App Instance targets, but can't assign permissions to manage all instances of an App and then a subset of that same App. For example, you can't specify that an admin has access to manage all instances of a Salesforce app and then also specific configurations of the Salesforce app.

##### Add an App Instance target to an App administrator role given to a User

<ApiOperation method="put" url="/api/v1/users/${userId}/roles/${roleId}/targets/catalog/apps/${appName}/${appInstanceId}" />

Adds an App Instance target for an `APP_ADMIN` Role assigned to a User

When you add the first App or App Instance target, you reduce the scope of the role assignment. The Role no longer applies to all App targets, but applies only to the specified target.

> **Note:** You can target a mixture of both App and App Instance targets, but can't assign permissions to manage all instances of an App and then a subset of that same App. For example, you can't specify that an admin has access to manage all instances of a Salesforce app and then also specific configurations of the Salesforce app.

###### Request parameters


| Parameter     | Description                                                  | Param Type   | DataType   | Required |
| :----------   | :----------------------------------------------------------- | :----------- | :--------- | :------- |
| userId        | `id` of a User                                               | URL          | String     | TRUE     |
| roleId        | `id` of a Role                                               | URL          | String     | TRUE     |
| appName       | `name` of App target from catalog to scope role assignment   | URL          | String     | TRUE     |
| appInstanceId | `id` of the App Instance target to scope role assignment     | URL          | String     | TRUE     |

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

> **Note:** You can target a mixture of both App and App Instance targets, but can't assign permissions to manage all instances of an App and then a subset of that same App. For example, you can't specify that an admin has access to manage all instances of a Salesforce app and then also specific configurations of the Salesforce app.

###### Request parameters


| Parameter         | Description                                                  | Param Type   | DataType   | Required |
| :---------------- | :----------------------------------------------------------- | :----------- | :--------- | :------- |
| appInstanceId     | `id` of the App Instance target to scope role assignment     | URL          | String     | TRUE     |
| appName           | `name` of App target from catalog to scope role assignment   | URL          | String     | TRUE     |
| groupId           | `id` of a Group                                              | URL          | String     | TRUE     |
| roleId            | `id` of a Role                                               | URL          | String     | TRUE     |

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

> **Note:** Don't remove the last App target from a role assignment, as this causes an exception. If you need a role assignment that applies to all Apps, the API consumer should delete the `APP_ADMIN` role assignment and recreate it.

###### Request parameters


| Parameter   | Description                                | Param Type   | DataType   | Required |
| :---------- | :----------------------------------------- | :----------- | :--------- | :------- |
| appName     | `name` of App target for role assignment   | URL          | String     | TRUE     |
| roleId      | `id` of a Role                             | URL          | String     | TRUE     |
| userId      | `id` of a User                             | URL          | String     | TRUE     |

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

> **Note:** Don't remove the last App target from a role assignment, as this causes an exception.  If you need a role assignment that applies to all Apps, the API consumer should delete the `APP_ADMIN` role assignment and recreate it.

###### Request parameters


| Parameter   | Description                                | Param Type   | DataType   | Required |
| :---------- | :----------------------------------------- | :----------- | :--------- | :------- |
| appName     | `name` of App target for role assignment   | URL          | String     | TRUE     |
| groupId     | `id` of a Group                            | URL          | String     | TRUE     |
| roleId      | `id` of a Role                             | URL          | String     | TRUE     |

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

#### Remove an App Instance target from an App administrator role

##### Remove an App Instance target from an App administrator role given to a User


<ApiOperation method="delete" url="/api/v1/users/${userId}/roles/${roleId}/targets/catalog/apps/${appName}/${appInstanceId}" />

Removes an App instance target from an `APP_ADMIN` Role assigned to a User

> **Note:** Don't remove the last App target from a role assignment, as this causes an exception. If you need a role assignment that applies to all Apps, the API consumer should delete the `APP_ADMIN` role assignment and recreate it.

###### Request parameters


| Parameter     | Description                                         | Param Type   | DataType   | Required |
| :----------   | :-----------------------------------------          | :----------- | :--------- | :------- |
| appInstanceId | `id` of the App Instance target for role assignment | URL          | String     | TRUE     |
| appName       | `name` of App target for role assignment            | URL          | String     | TRUE     |
| roleId        | `id` of a Role                                      | URL          | String     | TRUE     |
| userId        | `id` of a User                                      | URL          | String     | TRUE     |

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

##### Remove an App Instance target from an App administrator role given to a Group

<ApiOperation method="delete" url="/api/v1/groups/${groupId}/roles/${roleId}/targets/catalog/apps/${appName}/${appInstanceId}" />

Removes an App Instance target from an `APP_ADMIN` Role assigned to a Group

> **Note:** Don't remove the last App target from a role assignment, as this causes an exception. If you need a role assignment that applies to all Apps, the API consumer should delete the `APP_ADMIN` role assignment and recreate it.

###### Request parameters


| Parameter         | Description                                           | Param Type   | DataType   | Required |
| :---------------- | :---------------------------------------------------- | :----------- | :--------- | :------- |
| appInstanceId     | `id` of the App Instance target for role assignment   | URL          | String     | TRUE     |
| appName           | `name` of App target for role assignment              | URL          | String     | TRUE     |
| groupId           | `id` of a Group                                       | URL          | String     | TRUE     |
| roleId            | `id` of a Role                                        | URL          | String     | TRUE     |

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
Note the following are different comparing to [an individually assigned standard role](#sample-role-assigned-to-the-user-directly)
* The `id` field is present similarly with a different format but it has the same application
* The `type` field for custom roles always has the value `CUSTOM`
* The new `resource-set` field gives the id of the resource-set to which this assignment applies
* The `_links` field has three new fields:
  * `resource-set` is the `GET` link to the resource set to which this assignment is granted
  * `role` is the `GET` link to the role this assignment grants
  * `permissions` is the `GET` link to the permissions this assignment grants
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
Note the following are different comparing to [a group assigned standard role](#sample-role-assigned-to-the-user-through-a-group-membership)
* The `id` field is present similarly with a different format but it has the same application
* The `type` field for custom roles always has the value `CUSTOM`
* The new `resource-set` field gives the id of the resource-set to which this assignment applies
* The `_links` field has three new fields:
  * `resource-set` is the `GET` link to the resource set to which this assignment is granted
  * `role` is the `GET` link to the role this assignment grants
  * `permissions` is the `GET` link to the permissions this assignment grants
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
| _embedded        | Embedded resources related to the role assignment       | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                                                                             | TRUE       | FALSE    | TRUE      |
| _links           | Discoverable resources related to the role assignment   | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                                                                             | TRUE       | FALSE    | TRUE      |
| assignmentType   | The type of assignment                                  | `USER`, `GROUP`                                                                                                                            | FALSE      | FALSE    | TRUE      |
| created          | Timestamp when app user was created                     | Date                                                                                                                                       | FALSE      | FALSE    | TRUE      |
| id               | Unique key for the role assignment                      | String                                                                                                                                     | FALSE      | TRUE     | TRUE      |
| label            | Display name of Role                                    | String                                                                                                                                     | FALSE      | FALSE    | TRUE      |
| lastUpdated      | Timestamp when app user was last updated                | Date                                                                                                                                       | FALSE      | FALSE    | TRUE      |
| status           | Status of role assignment                               | `ACTIVE`                                                                                                                                   | FALSE      | FALSE    | TRUE      |
| type             | Type of Role                                            | See the [Role types](#role-types) table for a complete list. | FALSE      | FALSE    | TRUE      |
| resource-set <ApiLifecycle access="beta" />    | The resource-set id in which the role is granted (only present for custom roles)        | String                                                                                                                                     | TRUE      | TRUE     | TRUE      |

#### Role links
<ApiLifecycle access="beta" />

The following `_links` are returned:
* `assignee`: gets the user or group through which this role is assigned
* `resource-set`: (only for custom roles) gets the resource-set targetted by this assignment
* `permissions`: (only for custom roles) gets a list of permissions granted through this assignment
* `role`: (only for custom roles) gets the role granted through this assignment
* `member`: (only for custom roles) gets the member object from the binding that grants this role

#### Role types

Some Roles support optional targets that constrain the Role to a specific set of Groups or Apps. If an optional target isn't specified, then the role assignment is unbounded (for example, applies to all Groups or Apps).

Refer to the [product documentation](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Security_Administrators) for a complete definition of permissions granted to each Role.

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
| `CUSTOM` <ApiLifecycle access="beta" /> | Custom Label specified by client    | [Groups](/docs/reference/api/groups/) |

`API_ACCESS MANAGEMENT_ADMIN` is available if the API Access Management feature is enabled. For a description of what the Role can do, see [API Access Management Best Practices](/docs/concepts/api-access-management/#recommended-practices-for-api-access-management).

#### Assignment types

A Role could either be assigned to the User directly or be assigned to a Group of which the user is a member. The `assignee` in `_links` provides more details about the User or the Group to which the assignment was made.

| Assignment type     | Description                                                        |
| :------------------ | :----------------------------------------------------------------- |
| `GROUP`             | Role was assigned to an admin Group of which the User is a member  |
| `USER`              | Role was assigned to the User directly                             |

## Custom role object
<ApiLifecycle access="beta" />
A custom role is a custom set of [permissions](#permission-types). A custom role is uniquely identified within your org by its id or label.

### Custom role properties
| Property         | Description                         | DataType                                       | Nullable   | Unique   | Read Only |
| :--------------- | :---------------------------------- | :--------------------------------------------- | :--------- | :------- | :-------- |
| id               | Unique key for the role             | String                                         | FALSE      | TRUE     | TRUE      |
| label            | Display name of Role                | String                                         | FALSE      | TRUE     | FALSE     |
| permissions      | the permissions the new role grants | Array of [Permission types](#permission-types) | FALSE      | FALSE    | FALSE     |

#### Example

```json
{
    "id": "cr0Yq6IJxGIr0ouum0g3",
    "label": "UserCreator",
    "description": "Create users",
    "permissions": [
      "okta.users.create",
      "okta.users.read",
      "okta.groups.read",
      "okta.users.profile.manage"
    ]
}
```
### Permission types
<ApiLifecycle access="beta" />

Permissions can be used to build custom roles. Permissions to manage a resource also grant the viewing privileges for the the same resource so you won't need to assign them separately.

User permissions are all only effective with respect to the group(s) to which the admin is granted role via the resource set assignments.

| Permission type                     | Description                                                                                                                         | Applicable resource types                    |
| :---------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- |
| `okta.users.manage`                 | Allows the admin to create and manage users and read all profile and credential information for users                               | All users, all users within a specific group |
| `okta.users.create`                 | Allows the admin to create users. If admin also scoped to manage a group, can add the user to the group on creation and then manage | All groups, a specific group                 |
| `okta.users.read`                   | Allows the admin to read any user's profile and credential information                                                              | All users, all users within a specific group |
| `okta.users.credentials.manage`     | Allows the admin to manage only credential lifecycle operations for a user                                                          | All users, all users within a specific group |
| `okta.users.userprofile.manage`     | Allows the admin to only do operations on the User Object, including hidden and sensitive attributes                                | All users, all users within a specific group |
| `okta.users.lifecycle.manage`       | Allows the admin to only take any user lifecycle operations                                                                         | All users, all users within a specific group |
| `okta.users.groupMembership.manage` | Allows the admin to manage a user's group membership (also need `okta.groups.members.manage` to assign to a specific group)         | All users, all users within a specific group |
| `okta.groups.manage`                | Allows the admin to fully manage groups in your Okta organization                                                                   | All groups, a specific group                 |
| `okta.groups.create`                | Allows the admin to create groups                                                                                                   | All groups                                   |
| `okta.groups.members.manage`        | Allows the admin to only take member operations in a group in your Okta org                                                         | All groups, a specific group                 |
| `okta.groups.read`                  | Allows the admin to only read information about groups and their members in your Okta organization                                  | All groups, a specific group                 |

## Resource set object
<ApiLifecycle access="beta" />

A resource set is a collection of resources. Because there could be too many resources in a set, the object itself doesn't list the resources but provides a paginable link to fetch resources.

| Property         | Description                                             | DataType                                                                                                      | Nullable   | Unique   | Read Only |
| :--------------- | :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------ | :--------- | :------- | :-------- |
| id               | Unique key for the resource set                         | String                                                                                                        | FALSE      | TRUE     | TRUE      |
| label            | Display name of the resource set                        | String                                                                                                        | FALSE      | TRUE     | FALSE     |
| description      | A description of the resource set                       | String                                                                                                        | FALSE      | FALSE    | FALSE     |
| _links           | Discoverable resources related to the resource set      | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                                                | TRUE       | FALSE    | FALSE     |

The following `_links` are returned:
* `self` gets this resource set
* `resources` gets a paginable list of resources included in this set
* `bindings` gets a paginable list of admin role bindings assigned to this set

### Resource object

A resource has an id a link to the resource. Supported resources are:
* Groups
* All users within a group
* All users within the org
* All groups with the org
The id of a resource is unique to the resource set whereas the link pointing to the resource is unique for the org. The same group if used in two resource sets will have distinct ids in each of resource sets but the same self link in both.

#### Resource examples

##### Group as resource
```json
    {
      "id": "ire106sQKoHoXXsAe0g4",
      "_links": {
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/groups/00guaxWZ0AOa5NFAj0g3"
        }
      }
    }
```

##### Users of a group as resource
```json
    {
      "id": "ire106sQKoHoXXsAe0g4",
      "_links": {
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/groups/00guaxWZ0AOa5NFAj0g3/users"
        }
      }
    }
```

##### All users as resource
```json
    {
      "id": "ire106sQKoHoXXsAe0g4",
      "_links": {
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/users"
        }
      }
    }
```

##### All groups as resource
```json
    {
      "id": "ire106sQKoHoXXsAe0g4",
      "_links": {
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/groups"
        }
      }
    }
```
### Binding object
A binding represents the assignment of a [custom role](#custom-role-object) to a list of admins. Bindings are specific to a [resource set](#resource-set-object). There will be at max one binding object per role in a resource set.

The admin list assigned to a role is made of [resource objects](#resource-object) representing either of the following types of admin assignments:
* Directly assigned to the user
* Assigned to a group

| Property         | Description                                                     | DataType       | Nullable   | Unique   | Read Only |
| :--------------- | :-------------------------------------------------------------- | :------------- | :--------- | :------- | :-------- |
| id               | Id of the role granted in this binding                          | String         | FALSE      | FALSE    | FALSE     |
| _links           | Discoverable resources related to the resource set              | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                                                | TRUE       | FALSE    | FALSE     |

The following `_links` are returned:
* `self` gets this binding
* `members` gets a paginable list of members included in this binding

#### Member object

A member has an id and a link to the resource representing the role grantee. Supported resources are:
* Groups
* Users

The id of a member is unique to the binding whereas the link pointing to the resource is unique for the org. The same group if used in two bindings will have distinct ids in each but the same self link in both.

##### Member examples

###### Group as member
```json
    {
      "id": "irb1q92TFAHzySt3x0g4",
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
      "_links": {
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/users/00uuk41Hjga5qGfQ30g3"
        }
      }
    }
```
