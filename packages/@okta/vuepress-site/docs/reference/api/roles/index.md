---
title: Administrator Roles
category: management
meta:
- name: description
  content: The Okta Administrator Roles API provides operations to manage administrative Role assignments for a User. Read this page to get started with Admin Roles.
---

# Administrator Roles API

The Okta Administrator Roles API provides operations to manage both standard and custom administrative Role assignments for a User.

This document includes the operations of the standard Roles API and the Custom Roles API, and where they intersect.

## Get started

Explore the Administrator Roles API:  [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/63c73546214177bae3bf)

## Custom Role operations

These operations allow the creation and manipulation of Custom Roles as custom collections of [permissions](#permission-types).

### Create Role

<ApiOperation method="post" url="/api/v1/iam/roles" />

Creates a Role with a custom collection of permissions

#### Request parameters

| Parameter   | Description                                 | Param Type   | DataType                    | Required |
| :---------- | :------------------------------------------ | :----------- | :----------------------------------------------- | :------- |
| `label`       | The name given to the new Role            | Body         | String                                           | TRUE     |
| `description` | A description of the new Role             | Body         | String                                           | TRUE     |
| `permissions` | The permissions that the new Role grants  | Body         | Array of [Permission](#permission-types) names   | TRUE     |

#### Response parameters

A created [Custom Role](#custom-role-object)

#### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
      "label": "UserCreator",
      "description": "Create users",
      "permissions": [
        "okta.users.create",
        "okta.users.read",
        "okta.groups.read",
        "okta.users.userprofile.manage"
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
      "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions"
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
    }
  }
}
```

### Get Role

<ApiOperation method="get" url="/api/v1/iam/roles/${roleIdOrLabel}" />

Retrieves a Custom Role by its ID or label

#### Request parameters

| Parameter     | Description                          | Param Type   | DataType                    | Required |
| :------------ | :----------------------------------- | :----------- | :----------------------------------------------- | :------- |
| `roleIdOrLabel` | `id` or `label` of the Role        | URL          | String                                           | TRUE     |

#### Response parameters

The requested [Custom Role](#custom-role-object)

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
      "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions"
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
    }
  }
}
```

### Update Role

<ApiOperation method="put" url="/api/v1/iam/roles/${roleIdOrLabel}" />

Updates a Custom Role's label or description by its ID or label

#### Request parameters

| Parameter     | Description                          | Param Type   | DataType                    | Required |
| :------------ | :----------------------------------- | :----------- | :----------------------------------------------- | :------- |
| `roleIdOrLabel` | `id` or `label` of the Role          | URL          | String                                           | TRUE     |
| `label` | The updated label to apply to the Role          | Body          | String                                           | TRUE     |
| `description` | The updated description to apply to the Role          | Body          | String                                           | TRUE     |

#### Response parameters

The updated [Custom Role](#custom-role-object)

#### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
      "label": "UserCreator-Updated",
      "description": "Create users"
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
      "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions"
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
    }
  }
}
```

### List roles

<ApiOperation method="get" url="/api/v1/iam/roles" />

Lists all Custom Roles

#### Response parameters

A paginated list of [Custom Roles](#custom-role-object)

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
      "description": "Create users",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "permissions": {
          "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions"
        },
        "self": {
          "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
        }
      }
    },
    {
      "id": "cr0Fw7HKcWIroo88m3r1",
      "label": "GroupMembershipManager",
      "description": "Manage group membership",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "permissions": {
          "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Fw7HKcWIroo88m3r1/permissions"
        },
        "self": {
          "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Fw7HKcWIroo88m3r1"
        }
      }
    }
  ],
  "_links": {
    "next": {
      "href": "https://{yourOktaDomain}/api/v1/iam/roles?after=cr0Fw7HKcWIroo88m3r1"
    }
  }
}
```

### List permissions

<ApiOperation method="get" url="/api/v1/iam/roles/${roleIdOrLabel}/permissions" />

Lists all permissions included in a Custom Role identified by its `id` or `label`

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
          "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
        },
        "self": {
          "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions/okta.users.create"
        }
      }
    },
    {
      "label" : "okta.users.read",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "role": {
          "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
        },
        "self": {
          "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions/okta.users.read"
        }
      }
    },
    {
      "label" : "okta.groups.read",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "role": {
          "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
        },
        "self": {
          "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions/okta.groups.read"
        }
      }
    },
    {
      "label" : "okta.users.userprofile.manage",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "role": {
          "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
        },
        "self": {
          "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions/okta.users.userprofile.manage"
        }
      }
    }
  ]
}
```

### Create a Permission

<ApiOperation method="post" url="/api/v1/iam/roles/${roleIdOrLabel}/permissions/${permissionType}" />

Creates a Permission on an existing Role

#### Request parameters

| Parameter        | Description                          | Param Type   | DataType                             | Required |
| :----------------| :------------------------------------| :----------- | :------------------------------------| :------- |
| `roleIdOrLabel`  | `id` or `label` of the Role          | URL          | String                               | TRUE     |
| `permissionType` | Permission to add to the Role        | URL          | [Permission](#permission-types) name | TRUE     |
| `conditions` <ApiLifecycle access="ea" />      | Conditions for further restricting a permission     | Body         | [Condition](#condition-object) object | FALSE    |

#### Response parameters

```http
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

```http
HTTP/1.1 204 No Content
```

<ApiLifecycle access="ea" />
Returns an error if the permission exists

```http
HTTP/1.1 400 Bad Request
```

### Update permission
<ApiLifecycle access="ea" />

<ApiOperation method="put" url="/api/v1/iam/roles/${roleIdOrLabel}/permissions/${permissionType}" />

Updates an existing permission in a Role

#### Request parameters

| Parameter        | Description                                         | Param Type   | DataType                              | Required |
| :----------------| :-------------------------------------------------- | :----------- | :------------------------------------ | :------- |
| `roleIdOrLabel`  | `id` or `label` of the Role                         | URL          | String                                | TRUE     |
| `permissionType` | Permission to update in the Role                    | URL          | [Permission](#permission-types) name  | TRUE     |
| `conditions`     | Conditions for further restricting a permission     | Body         | [Condition](#condition-object) object | FALSE    |

> **NOTE:** Conditions are only available for `okta.users.read` and `okta.users.userprofile.manage`

#### Response parameters

The updated Permission object

#### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions/okta.users.read"
-d '{
    "conditions": {
      "include": {
        "okta:ResourceAttribute/User/Profile": [
          "city",
          "state",
          "zipCode"
        ]
      }
    }
  }'
```

#### Response example

```json
{
  "label" : "okta.users.read",
  "conditions": {
    "include": {
      "okta:ResourceAttribute/User/Profile": [
        "city",
        "state",
        "zipCode"
      ]
    }
  },
  "created": "2021-02-06T16:20:57.000Z",
  "lastUpdated": "2021-02-06T16:20:57.000Z",
  "_links": {
    "role": {
      "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions/okta.users.read"
    }
  }
}
```

### Retrieve a permission

<ApiOperation method="get" url="/api/v1/iam/roles/${roleIdOrLabel}/permissions/${permissionType}" />

Retrieves a permission from an existing Role

#### Request parameters

| Parameter      | Description                            | Param Type   | DataType                              | Required |
| :------------- | :------------------------------------- | :----------- | :------------------------------------ | :------- |
| `roleIdOrLabel`  | `id` or `label` of the Role          | URL          | String                                | TRUE     |
| `permissionType` | Permission to retrieve from the Role | URL          | [Permission](#permission-types) name  | TRUE     |

#### Response parameters

The requested Permission<br>
<ApiLifecycle access="ea" />Includes the conditions on the permission (if applicable)

#### Request example

```bash
curl -v -X GET \
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
      "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions/okta.users.manage"
    }
  }
}
```

#### Response example with Conditions
<ApiLifecycle access="ea" /> 

```json
{
  "label" : "okta.users.read",
  "conditions": {
    "include": {
      "okta:ResourceAttribute/User/Profile": [
        "city",
        "state",
        "zipCode"
      ]
    }
  },
  "created": "2021-02-06T16:20:57.000Z",
  "lastUpdated": "2021-02-06T16:20:57.000Z",
  "_links": {
    "role": {
      "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions/okta.users.read"
    }
  }
}
```


### Delete permission

<ApiOperation method="delete" url="/api/v1/iam/roles/${roleIdOrLabel}/permissions/${permissionType}" />

Deletes a permission from an existing Role

#### Request parameters

| Parameter      | Description                          | Param Type   | DataType                              | Required |
| :------------- | :----------------------------------- | :----------- | :------------------------------------ | :------- |
| `roleIdOrLabel`  | `id` or `label` of the Role          | URL          | String                                | TRUE     |
| `permissionType` | Permission to remove from the Role   | URL          | [Permission](#permission-types) name | TRUE     |

#### Response parameters

```http
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

```http
HTTP/1.1 204 No Content
```

### Delete Role

<ApiOperation method="delete" url="/api/v1/iam/roles/${roleIdOrLabel}" />

Deletes a Custom Role

#### Request parameters

| Parameter       | Description                          | Param Type   | DataType                              | Required |
| :-------------- | :----------------------------------- | :----------- | :------------------------------------ | :------- |
| `roleIdOrLabel` | `id` or `label` of the Role          | URL          | String                                | TRUE     |

#### Response parameters

```http
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

```http
HTTP/1.1 204 No Content
```

## Resource Set operations

These operations allow the creation and manipulation of Resource Sets as custom collections of resources. You can use Resource Sets to assign [Custom Roles](#custom-role-operations) to administrators who are scoped to the designated resources.

### Create Resource Set

<ApiOperation method="post" url="/api/v1/iam/resource-sets" />

Creates a Resource Set with a custom collection of resources

#### Request parameters

| Parameter   | Description                                                                    | Param Type   | DataType     | Required |
| :---------- | :----------------------------------------------------------------------------- | :----------- | :----------- | :------- |
| `label`       | Unique name given to the new Resource Set                                      | Body         | String       | TRUE     |
| `description` | A description of the new Resource Set                                          | Body         | String       | TRUE     |
| `resources`   | The endpoints that reference the resources to be included in the new Resource Set | Body         | Array of URL | TRUE    |

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
        "https://${yourOktaDomain}/api/v1/users",
        "orn:${partition}:directory:${yourOrgId}:groups:00g4bjtkrsFSFhzB00g7"
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
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
    },
    "resources": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/resources"
    },
    "bindings": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings"
    }
  }
}
```

### Get Resource Set

<ApiOperation method="get" url="/api/v1/iam/resource-sets/${resourceSetIdOrLabel}" />

Retrieves a Resource Set by its ID or Label

#### Request parameters

| Parameter              | Description                            | Param Type   | DataType                    | Required |
|:-----------------------|:---------------------------------------| :----------- | :----------------------------------------------- | :------- |
| `resourceSetIdOrLabel` | Unique ID or label of the Resource Set | URL          | String                                           | TRUE     |

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
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
    },
    "resources": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/resources"
    },
    "bindings": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings"
    }
  }
}
```

### List all Resource Sets

<ApiOperation method="get" url="/api/v1/iam/resource-sets" />

Lists all Resource Sets

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
      "description": "First San Francisco IT Resource Set",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "self": {
          "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
        },
        "resources": {
          "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/resources"
        },
        "bindings": {
          "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings"
        }
      }
    },
    {
      "id": "iamoJDFKaJxGIr0oamd0q",
      "label": "SF-IT-2",
      "description": "Second San Francisco IT Resource Set",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "self": {
          "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd0q"
        },
        "resources": {
          "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd0q/resources"
        },
        "bindings": {
          "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd0q/bindings"
        }
      }
    }
  ],
  "_links": {
    "next": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets?after=iamoJDFKaJxGIr0oamd0q"
    }
  }
}
```

### Update Resource Set

<ApiOperation method="put" url="/api/v1/iam/resource-sets/${resourceSetIdOrLabel}" />

Updates the label and description of a Resource Set

#### Request parameters

| Parameter     | Description                               | Param Type   | DataType     | Required |
| :------------ |:------------------------------------------| :----------- | :----------- | :------- |
| `resourceSetIdOrLabel` | Unique ID or label of the Resource Set    | URL          | String       | TRUE     |
| `label`         | New unique name given to the Resource Set | Body         | String       | TRUE     |
| `description`   | New description of the Resource Set       | Body         | String       | TRUE     |

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
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
    },
    "resources": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/resources"
    },
    "bindings": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings"
    }
  }
}
```

### Delete Resource Set

<ApiOperation method="delete" url="/api/v1/iam/resource-sets/${resourceSetIdOrLabel}" />

Deletes a Resource Set and all its associated Bindings

#### Request parameters

| Parameter      | Description                          | Param Type   | DataType                              | Required |
| :------------- | :----------------------------------- | :----------- | :------------------------------------ | :------- |
| `resourceSetIdOrLabel`  | ID or label of the Resource Set             | URL          | String                                | TRUE     |

#### Response parameters

```http
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

```http
HTTP/1.1 204 No Content
```

### Resource operations

These operations add, remove, and list the resources within a Resource Set.

#### Update resources

<ApiOperation method="patch" url="/api/v1/iam/resource-sets/${resourceSetIdOrLabel}/resources" />

Updates resources to a Resource Set

##### Request parameters

| Parameter      | Description                                                                       | Param Type   | DataType     | Required |
| :------------- | :----------------------------------------------------------------------------- | :----------- | :----------- | :------- |
| `resourceSetIdOrLabel`  | ID or label of the Resource Set                                                       | URL          | String       | TRUE     |
| `additions`      | The endpoints that reference the resources to be included in the new Resource Set | Body         | Array of URL | TRUE     |

##### Response parameters

An updated [Resource Set](#resource-set-object)

To view the list of resources, use the [List resources](#list-resources) operation.

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
        "orn:${partition}:directory:${yourOrgId}:groups:00g4bjtkrsFSFhzB00g7"
      ]
    }' "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/resources"
```

##### Response example

```json
{
  "id": "iamoJDFKaJxGIr0oamd9g",
  "label": "SF-IT-Staff",
  "description": "Staff in the IT department of San Francisco",
  "created": "2021-02-06T16:20:57.000Z",
  "lastUpdated": "2021-02-07T16:20:57.000Z",
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
    },
    "resources": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/resources"
    },
    "bindings": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings"
    }
  }
}
```

#### List resources

<ApiOperation method="get" url="/api/v1/iam/resource-sets/${resourceSetIdOrLabel}/resources" />

Lists the Resources that make up a Resource Set

##### Request parameters

| Parameter      | Description               | Param Type   | DataType     | Required |
| :------------- | :------------------------ | :----------- | :----------- | :------- |
| `resourceSetIdOrLabel`  | ID or label of the Resource Set  | URL          | String       | TRUE     |

##### Response parameters

A paginated array of [Resources](#resource-object)

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
      "orn": "orn:{partition}:directory:{yourOrgId}:groups:00guaxWZ0AOa5NFAj0g3",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "self": {
          "href": "https://{yourOktaDomain}/api/v1/groups/00guaxWZ0AOa5NFAj0g3"
        }
      }
    },
    {
      "id": "ire106riDrTYl4qA70g4",
      "orn": "orn:{partition}:directory:{yourOrgId}:groups:00gu67DU2qNCjNZYO0g3:contained_resources",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "self": {
          "href": "https://{yourOktaDomain}/api/v1/groups/00gu67DU2qNCjNZYO0g3/users"
        }
      }
    },
    {
      "id": "irezvo4AwE2ngpMw40g3",
      "orn": "orn:{partition}:directory:{yourOrgId}:users",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "self": {
          "href": "https://{yourOktaDomain}/api/v1/users"
        },
        "users": {
          "href": "https://{yourOktaDomain}/api/v1/users"
        }
      }
    },
    {
      "id": "ire2j4iDnxHhUFaZN0g4",
      "orn": "orn:{partition}:directory:{yourOrgId}:groups",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "self": {
          "href": "https://{yourOktaDomain}/api/v1/groups"
        },
        "groups": {
          "href": "https://{yourOktaDomain}/api/v1/groups"
        }
      }
    }
  ],
  "_links": {
    "next": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/resources?after=irezvn1ZZxLSIBM2J0g3"
    },
    "resource-set": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
    }
  }
}
```

#### Delete a resource

<ApiOperation method="delete" url="/api/v1/iam/resource-sets/${resourceSetIdOrLabel}/resources/${resourceId}" />

Removes a resource from a Resource Set

##### Request parameters

| Parameter      | Description                                      | Param Type   | DataType     | Required |
| :------------- |:-------------------------------------------------| :----------- | :----------- | :------- |
| `resourceSetIdOrLabel`  | ID or label of the Resource Set                  | URL          | String       | TRUE     |
| `resourceId`     | ID of the resource within the Resource Set       | URL          | String       | TRUE     |

The `resourceId` parameter is the ID that is obtained when [resources are listed within the Resource Set](#list-resources). For example, if the resource object is:

```json
    {
      "id": "ire106sQKoHoXXsAe0g4",
      "orn": "orn:{partition}:directory:{yourOrgId}:groups:00guaxWZ0AOa5NFAj0g3",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "self": {
          "href": "https://{yourOktaDomain}/api/v1/groups/00guaxWZ0AOa5NFAj0g3"
        }
      }
    }
```

You can use `ire106sQKoHoXXsAe0g4` as the `resourceId` to remove the Groups from the list of resources in the set.

##### Response parameters

```http
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

```http
HTTP/1.1 204 No Content
```

## Custom Role assignment operations

These operations allow the assignment and unassignment of Custom Roles. This is done by creating a Binding.
A Binding represents an association where the `bindingId` identifies the Principal, Role, and Resource Set.

### Create a new Binding

<ApiOperation method="post" url="/api/v1/iam/resource-sets/${resourceSetIdOrLabel}/bindings" />

Assigns a Custom Role by creating a Binding between the Role and the admin that targets an existing Resource Set

#### Request parameters

| Parameter      | Description                                                           | Param Type    | DataType       | Required |
| :------------- |:----------------------------------------------------------------------| :------------ | :------------- | :------- |
| `resourceSetIdOrLabel`| ID or label of the Resource Set                                       | URL           | String         | TRUE     |
| `role`           | ID of the Role                                                        | Body          | String         | TRUE     |
| `members`        | The `hrefs` that point to Users and/or Groups that receive the Role | Body          | Array of `hrefs` | TRUE     |

#### Response parameters

The following `_links` are returned:

- `self`: Retrieves this Role's Binding within the Resource Set
- `bindings`: Lists all Role Bindings in the Resource Set
- `resource-set`: Retrieves the Resource Set

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
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0Yq6IJxGIr0ouum0g3"
    },
    "bindings": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings"
    },
    "resource-set": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
    }
  }
}
```

#### Request example with client application <ApiLifecycle access="beta" />

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
      "role": "cr0Yq6IJxGIr0ouum0g3",
      "members": [
        "https://${yourOktaDomain}/oauth2/v1/clients/0oa5vymVNCe2cPEeZ0g4"
      ]
}' "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings"
```

#### Response example

```json
{
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0Yq6IJxGIr0ouum0g3"
    },
    "bindings": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings"
    },
    "resource-set": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
    }
  }
}
```

### Add more Members to a Binding

<ApiOperation method="patch" url="/api/v1/iam/resource-sets/${resourceSetIdOrLabel}/bindings/${roleIdOrLabel}/members" />

Updates a Role Binding that is already created in a Resource Set with more Members

#### Request parameters

| Parameter      | Description                                                                    | Param Type   | DataType       | Required |
| :------------- |:-------------------------------------------------------------------------------| :----------- | :------------- | :------- |
| `resourceSetIdOrLabel`  | ID or label of the target Resource Set                                  | URL          | String         | TRUE     |
| `roleIdOrLabel`         | ID or label of the Role to grant                                               | URL          | String         | TRUE     |
| `additions`      | Array of hrefs that point to one or more Users and/or Groups that receive the Role | Body         | Array of hrefs | TRUE     |

#### Response parameters

The following `_links` are returned:

* `self`: Retrieves this Role's Binding within the Resource Set
* `bindings`: Lists all Role Bindings in the Resource Set
* `resource-set`: Retrieves the Resource Set

#### Request example

```bash
curl -v -X PATCH \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
      "additions": [
        "https://${yourOktaDomain}/api/v1/groups/00guaxWZ0AOa5NFAj0g3",
        "https://${yourOktaDomain}/api/v1/users/00u67DU2qNCjNZYO0g3"
      ]
    }' "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0WxyzJxGIr0ouum0g4/members"
```

#### Response example

```json
{
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0Yq6IJxGIr0ouum0g3"
    },
    "bindings": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings"
    },
    "resource-set": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
    }
  }
}
```

#### Request example with client application <ApiLifecycle access="beta" />

```bash
curl -v -X PATCH \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
      "additions": [
        "https://${yourOktaDomain}/oauth2/v1/clients/0oa5vymVNCe2cPEeZ0g4"
      ]
    }' "https://${yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0WxyzJxGIr0ouum0g4/members"
```

#### Response example

```json
{
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0Yq6IJxGIr0ouum0g3"
    },
    "bindings": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings"
    },
    "resource-set": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
    }
  }
}
```

### List Members in a Binding

<ApiOperation method="get" url="/api/v1/iam/resource-sets/${resourceSetIdOrLabel}/bindings/${roleIdOrLabel}/members" />

Lists all Members that are assigned to a Role in a Resource Set

#### Request parameters

| Parameter      | Description                                     | Param Type   | DataType       | Required |
| :------------- |:------------------------------------------------| :----------- | :------------- | :------- |
| `resourceSetIdOrLabel`  | ID or label of the target Resource Set   | URL          | String         | TRUE     |
| `roleIdOrLabel`         | ID or label of the Role to identify the Binding | URL          | String         | TRUE     |

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
          "href": "https://{yourOktaDomain}/api/v1/users/00uuk41Hjga5qGfQ30g3"
        }
      }
    }, {
      "id": "irb1q92TFAHzySt3x0g4",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "self": {
          "href": "https://{yourOktaDomain}/api/v1/groups/00guaxWZ0AOa5NFAj0g3"
        }
      }
    }
  ],
  "_links": {
    "binding": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/${resource-set-id}/bindings/${role-id-or-name}"
    },
    "next": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/${resource-set-id}/bindings/${role-id-or-name}/members?after=${last-member-id}"
    }
  }
}
```
#### Response example with client application <ApiLifecycle access="beta" />

```json
{
  "members": [
    {
      "id": "irb5vzkeQKc56r5G10g4",
      "created": "2022-12-14T00:00:00.000Z",
      "lastUpdated": "2022-12-14T00:00:00.000Z",
      "_links": {
        "self": {
          "href": "https://{yourOktaDomain}/oauth2/v1/clients/0oa5vymVNCe2cPEeZ0g4"
        }
      }
    }
  ],
  "_links": {
    "binding": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/${resource-set-id}/bindings/${role-id-or-name}"
    },
    "next": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/${resource-set-id}/bindings/${role-id-or-name}/members?after=${last-member-id}"
    }
  }
}
```

### Get a Member from a Binding

<ApiOperation method="get" url="/api/v1/iam/resource-sets/${resourceSetIdOrLabel}/bindings/${roleIdOrLabel}/members/${memberId}" />

Retrieves a Member of a Role in a Resource Set

#### Request parameters

| Parameter      | Description                                     | Param Type   | DataType       | Required |
| :------------- |:------------------------------------------------| :----------- | :------------- | :------- |
| `resourceSetIdOrLabel`  | ID or label of the target Resource Set	  | URL          | String         | TRUE     |
| `roleIdOrLabel`         | ID or label of the Role to identify the Binding | URL          | String         | TRUE     |
| `memberId`       | ID of the Member within the Binding             | URL          | String         | TRUE     |


The `memberId` parameter is the ID that is obtained when [Members are listed in a Binding](#list-members-in-a-binding). For example, if the Member object was:

```json
{
  "id": "irb1qe6PGuMc7Oh8N0g4",
  "created": "2021-02-06T16:20:57.000Z",
  "lastUpdated": "2021-02-06T16:20:57.000Z",
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/users/00uuk41Hjga5qGfQ30g3"
    }
  }
}
```

Then `irb1qe6PGuMc7Oh8N0g4` could be used as `memberId` to remove the User from the list of Members in the Binding.

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
      "href": "https://{yourOktaDomain}/api/v1/users/00uuk41Hjga5qGfQ30g3"
    }
  }
}
```

### Delete a Member from a Binding

<ApiOperation method="delete" url="/api/v1/iam/resource-sets/${resourceSetIdOrLabel}/bindings/${roleIdOrLabel}/members/${memberId}" />

Deletes a Member of a Role in a Resource Set

#### Request parameters

| Parameter      | Description                                     | Param Type   | DataType       | Required |
| :------------- |:------------------------------------------------| :----------- | :------------- | :------- |
| `resourceSetIdOrLabel`  | ID or label of the target Resource Set	  | URL          | String         | TRUE     |
| `roleIdOrLabel`         | ID or label of the Role to identify the Binding | URL          | String         | TRUE     |
| `memberId`       | ID of the Member in the Binding                 | URL          | String         | TRUE     |


The `memberId` parameter is the ID that is obtained when [Members are listed in a Binding](#list-members-in-a-binding). For example, if the Member object was:

```json
{
  "id": "irb1qe6PGuMc7Oh8N0g4",
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/users/00uuk41Hjga5qGfQ30g3"
    }
  }
}
```

Then `irb1qe6PGuMc7Oh8N0g4` could be used as `memberId` to remove the User from the list of Members in the Binding.

#### Response parameters

```http
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

```http
HTTP/1.1 204 No Content
```

### Retrieve Bindings

#### Get a Binding by Role ID or label

<ApiOperation method="get" url="/api/v1/iam/resource-sets/${resourceSetIdOrLabel}/bindings/${roleIdOrLabel}" />

Retrieves a Binding from a Resource Set by its Role ID

##### Request parameters

| Parameter      | Description              | Param Type   | DataType     | Required |
| :------------- | :----------------------- | :----------- | :----------- | :------- |
| `resourceSetIdOrLabel`  | ID or label of the Resource Set | URL          | String       | TRUE     |
| `roleIdOrLabel`         | ID or label of the Role         | URL          | String       | TRUE     |

##### Response parameters

The `id` of the Role and the following `_links`:

* `self`: Retrieves this Role's Binding within the Resource Set
* `bindings`: Lists all paginated Role Bindings in the Resource Set
* `resource-set`: Retrieves the Resource Set

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
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0WxyzJxGIr0ouum0g4"
    },
    "members": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0WxyzJxGIr0ouum0g4/members"
    },
    "resource-set": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
    }
  }
}
```

#### Get all Bindings in a Resource Set

<ApiOperation method="get" url="/api/v1/iam/resource-sets/${resourceSetIdOrLabel}/bindings" />

Lists all the Bindings in a Resource Set

##### Request parameters

| Parameter      | Description                             | Param Type   | DataType     | Required |
| :------------- |:----------------------------------------| :----------- | :----------- | :------- |
| `resourceSetIdOrLabel`  | ID or label of the Resource Set  | URL          | String       | TRUE     |

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
          "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0WxyzJxGIr0ouum0g4"
        },
        "members": {
          "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0WxyzJxGIr0ouum0g4/members"
        }
      }
    }
  ],
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings"
    },
    "resource-set": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
    },
    "next": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings?after=cr0WxyzJxGIr0ouum0g4"
    }
  }
}
```

### Delete a Binding

<ApiOperation method="delete" url="/api/v1/iam/resource-sets/${resourceSetIdOrLabel}/bindings/${roleIdOrLabel}" />

Deletes a Binding of a Role from a Resource Set

#### Request parameters

| Parameter      | Description               | Param Type   | DataType     | Required |
| :------------- | :------------------------ | :----------- | :----------- | :------- |
| `resourceSetIdOrLabel`  | ID or label of the Resource Set  | URL          | String       | TRUE     |
| `roleIdOrLabel`         | ID or label of the Role          | URL          | String       | TRUE     |

#### Response parameters

```http
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

```http
HTTP/1.1 204 No Content
```

## Role assignment operations

#### Grant third-party admin status to a User

<ApiOperation method="post" url="/api/v1/users/${userId}/roles?disableNotifications=true" />

#### Grant third-party admin status to a Group

<ApiOperation method="post" url="/api/v1/groups/${groupId}/roles?disableNotifications=true" />

You can grant third-party admin status by using an optional query parameter on the Administrator Roles API called `disableNotifications`.

You can grant third-party admin status when you assign a new role, or you can update an existing role assignment status by passing just the query parameter.

When this setting is enabled, the admins don't receive any of the default Okta administrator emails. These admins also don't have access to contact Okta Support and open support cases on behalf of your org.

### List Users with Role Assignments

<ApiOperation method="get" url="/api/v1/iam/assignees/users" />

Lists all the Users with Role Assignments

##### Request parameters


| Parameter     | Description                                          | Param Type  | DataType  | Required  |
| :------------ | :--------------------------------------------------- | :---------- | :-------- | :-------- |
| `after`       | Specifies the pagination cursor for the next page of targets   | Query        | String     | FALSE    |
| `limit`       | Specifies the number of results for a page (default is 100)     | Query        | Number     | FALSE    |

##### Response parameters

Array of RoleAssignedUser

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/iam/assignees/users"
```

##### Response example

```json
{
  "value": [
    {
      "id": "00u118oQYT4TBGuay0g4",
      "orn": "orn:okta:00o5rb5mt2H3d1TJd0h7:users:00u118oQYT4TBGuay0g4",
      "_links": {
        "self": {
          "href": "http://your-subdomain.okta.com/api/v1/users/00u118oQYT4TBGuay0g4"
        },
        "roles": {
          "href": "http://your-subdomain.okta.com/api/v1/users/00u118oQYT4TBGuay0g4/roles"
        }
      }
    }
  ],
  "_links": {
    "next": {
      "href": "http://your-subdomain.okta.com/api/v1/iam/assignees/users?after=00u118oQYT4TBGuay0g4&limit=1"
    }
  }
}
```

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
                "href": "https://{yourOktaDomain}/api/v1/users/00ur32Vg0fvpyHZeQ0g3"
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
                "href": "https://{yourOktaDomain}/api/v1/users/00ur32Vg0fvpyHZeQ0g3"
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
                "href": "https://{yourOktaDomain}/api/v1/users/00ur32Vg0fvpyHZeQ0g3"
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
                "href": "https://{yourOktaDomain}/api/v1/groups/00g1ousb3XCr9Dkr20g4"
            }
        }
    }
]
```

##### Response example with Custom Roles

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
                "href": "https://{yourOktaDomain}/api/v1/users/00ur32Vg0fvpyHZeQ0g3"
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
                "href": "https://{yourOktaDomain}/api/v1/users/00ur32Vg0fvpyHZeQ0g3"
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
                "href": "https://{yourOktaDomain}/api/v1/users/00ur32Vg0fvpyHZeQ0g3"
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
                "href": "https://{yourOktaDomain}/api/v1/groups/00g1ousb3XCr9Dkr20g4"
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
                "href": "https://{yourOktaDomain}/api/v1/users/00u1gytb3XCr9Dkr18r2"
            },
            "resource-set": {
                "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
            },
            "member": {
                "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0Yq6IJxGIr0ouum0g3/members/irb1qe6PGuMc7Oh8N0g4"
            },
            "role": {
              "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
            },
            "permissions": {
                "href": "https://{yourOktaDomain}/api/v1/iam/permission-sets/cr0Yq6IJxGIr0ouum0g3/permissions"
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
            "href": "https://{yourOktaDomain}/api/v1/groups/00g1ousb3XCr9Dkr20g4"
          },
          "resource-set": {
            "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoakjsdQaJxGIr03int1o"
          },
          "member": {
            "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0Yq6IJxGIr0ouum0g3/members/irb1qe6PGuMc7Oh8N0g4"
          },
          "role": {
            "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
          },
          "permissions": {
            "href": "https://{yourOktaDomain}/api/v1/iam/permission-sets/cr0Yq6IJxGIr0ouum0g3/permissions"
          }
        }
    }
]
```

##### Response example with IAM-based Standard Role


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
                "href": "https://{yourOktaDomain}/api/v1/users/00ur32Vg0fvpyHZeQ0g3"
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
        "href": "https://{yourOktaDomain}/api/v1/users/00u1gytb3XCr9Dkr18r2"
      },
      "resource-set": {
        "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
      },
      "member": {
        "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0Yq6IJxGIr0ouum0g3/members/irb1qe6PGuMc7Oh8N0g4"
      },
      "role": {
        "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
      },
      "permissions": {
        "href": "https://{yourOktaDomain}/api/v1/iam/permission-sets/cr0Yq6IJxGIr0ouum0g3/permissions"
      }
    }
  }, {
    "id": "irb5e92YgBazyyQ3x1q5",
    "role": "ACCESS_CERTIFICATIONS_ADMIN",
    "label": "Access Certifications Administrator",
    "type": "ACCESS_CERTIFICATIONS_ADMIN",
    "status": "ACTIVE",
    "created": "2019-02-06T16:20:57.000Z",
    "lastUpdated": "2019-02-06T16:20:57.000Z",
    "assignmentType": "USER",
    "resource-set": "ACCESS_CERTIFICATIONS_IAM_POLICY",
    "_links": {
      "assignee": {
        "href": "https://{yourOktaDomain}/api/v1/users/00u1gytb3XCr9Dkr18r2"
      },
      "resource-set": {
        "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/ACCESS_CERTIFICATIONS_IAM_POLICY"
      },
      "member": {
        "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/ACCESS_CERTIFICATIONS_IAM_POLICY/bindings/ACCESS_CERTIFICATIONS_ADMIN/members/irb1qe6PGuMc7Oh8N0g4"
      },
      "role": {
        "href": "https://{yourOktaDomain}/api/v1/iam/roles/ACCESS_CERTIFICATIONS_ADMIN"
      },
      "permissions": {
        "href": "https://{yourOktaDomain}/api/v1/iam/permission-sets/OKTA_IAM_TEST_DELIVERED_ROLE/permissions"
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
                "href": "https://{yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3"
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
            "href": "https://{yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3"
        }
    }
}
```

#### Assign a Custom Role to a User or Group

The recommended way to assign a Custom Role is by using one of the [Custom Role assignment operations](#custom-role-assignment-operations). However, you can also assign a Custom Role using the following method:

<ApiOperation method="post" url="/api/v1/users/${userId}/roles" />

Or to assign to a Group:

<ApiOperation method="post" url="/api/v1/groups/${groupId}/roles" />

as long as the request body contains a Custom `role` ID and a `resource-set` ID. Also, `type` must be `CUSTOM`.

##### Request parameters

| Parameter             | Description                 | Param Type   | DataType                    | Required |
| :-------------------- | :-------------------------- | :----------- | :-------------------------- | :------- |
| `userId` or `groupId` | User ID or Group ID         | URL          | String                      | TRUE     |
| `type`                | Type of Role to assign      | Body         | String literal: `CUSTOM`    | TRUE     |
| `role`                | ID of the Custom Role       | Body         | String                      | TRUE     |
| `resource-set`        | ID of the Resource Set      | Body         | String                      | TRUE     |

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
      "href": "https://{yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3"
    },
    "resource-set": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
    },
    "role": {
      "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
    },
    "permissions": {
      "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions"
    }
  }
}
```
#### Assign an IAM-based Standard Role to a User or Group

You can assign an IAM-based Standard Role like any other Standard Role.

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
      "type": "ACCESS_REQUESTS_ADMIN"
}' "https://${yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3/roles"
```

###### Response example

```json
{
  "id": "irb1q92TFAHzySt3x0g4",
  "role": "ACCESS_REQUESTS_ADMIN",
  "label": "Access Requests Administrator",
  "type": "ACCESS_REQUESTS_ADMIN",
  "status": "ACTIVE",
  "created": "2019-02-06T16:20:57.000Z",
  "lastUpdated": "2019-02-06T16:20:57.000Z",
  "assignmentType": "GROUP",
  "resource-set": "ACCESS_CERTIFICATIONS_IAM_POLICY",
  "_links": {
    "assignee": {
      "href": "https://{yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3"
    },
    "resource-set": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/ACCESS_CERTIFICATIONS_IAM_POLICY"
    },
    "role": {
      "href": "https://{yourOktaDomain}/api/v1/iam/roles/ACCESS_REQUESTS_ADMIN"
    },
    "permissions": {
      "href": "https://{yourOktaDomain}/api/v1/iam/roles/ACCESS_REQUESTS_ADMIN/permissions"
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

```http
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

```http
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

```http
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

```http
HTTP/1.1 204 No Content
```

#### Unassign a Custom Role from a User or Group

The recommended way to unassign a Custom Role is by using one of the [Custom Role assignment operations](#custom-role-assignment-operations). However, you can also unassign a Custom Role by using the following method:

<ApiOperation method="delete" url="/api/v1/users/${userId}/roles/${bindingId}" />

Or to unassign from a Group:

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

```http
HTTP/1.1 204 No Content
```

## Role target operations

Role targets are a way of defining permissions for admin roles into a smaller subset of Groups or Apps within your org. Targets limit an admin's permissions to a targeted area of the org. You can define admin roles to target Groups, Applications, and Application Instances.

* **Group targets:** Grant an admin permission to manage only a specified Group. For example, an admin role may be assigned to manage only the IT Group.
* **App targets:** Grant an admin permission to manage all instances of the specified Apps. Target Apps are Okta catalog Apps. For example, you can have multiple configurations of an Okta catalog App, such as Salesforce or Facebook. When you add a Salesforce or Facebook App as a target, the admin receives permission to manage all the instances of those Apps and create instances of them.
* **App Instance targets:** Grant an admin permission to manage an instance of one App or instances of multiple Apps. App Instances are specific Apps that admins have created in their org. For example, there may be a Salesforce App configured differently for each sales region of a company. When you create an App Instance target, you can assign an admin to manage only two instances of the configured Salesforce Apps and then also to manage an instance of another configured App such as Workday.

> **Note:** Don't use these operations with a Custom Role ID. Custom Role assignments always require a target Resource Set. Use [Custom Role assignment operations](#custom-role-assignment-operations) or the backward-compatible [Role assignment](#assign-a-custom-role-to-a-user-or-group) or [unassignment](#unassign-a-custom-role-from-a-user-or-group) operations.

### Group administrator role group targets

Assigns a group admin role to a specific Group that grants the admin permission to manage only that Group. For example, you can assign an admin role to manage only the IT group. The permissions for specifically what an admin can do within that Group depends on the admin role that they’re assigned to. See [Administrators](https://help.okta.com/okta_help.htm?id=ext_Administrators).

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

Treat the page cursor as an opaque value. You can obtain it through the next link relation. See [Pagination](/docs/reference/core-okta-api/#pagination).

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
          "href": "https://{yourOktaDomain}/img/logos/groups/okta-medium.png",
          "name": "medium",
          "type": "image/png"
        },
        {
          "href": "https://{yourOktaDomain}/img/logos/groups/okta-large.png",
          "name": "large",
          "type": "image/png"
        }
      ],
      "users": {
        "href": "https://{yourOktaDomain}/api/v1/groups/00g1emaKYZTWRYYRRTSK/users"
      },
      "apps": {
        "href": "https://{yourOktaDomain}/api/v1/groups/00g1emaKYZTWRYYRRTSK/apps"
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

Treat the page cursor as an opaque value. You can obtain it through the next link relation. See [Pagination](/docs/reference/core-okta-api/#pagination).

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
                    "href": "https://{yourOktaDomain}/assets/img/logos/groups/okta-medium.d7fb831bc4e7e1a5d8bd35dfaf405d9e.png",
                    "type": "image/png"
                },
                {
                    "name": "large",
                    "href": "https://{yourOktaDomain}/assets/img/logos/groups/okta-large.511fcb0de9da185b52589cb14d581c2c.png",
                    "type": "image/png"
                }
            ],
            "users": {
                "href": "https://{yourOktaDomain}/api/v1/groups/00gsrc96agspOaiP40g3/users"
            },
            "apps": {
                "href": "https://{yourOktaDomain}/api/v1/groups/00gsrc96agspOaiP40g3/apps"
            }
        }
    }
]
```

#### Assign a Group target to a group administrator Role

##### Assign a Group target to a group administrator Role given to a User

<ApiOperation method="put" url="/api/v1/users/${userId}/roles/${roleId}/targets/groups/${groupId}" />

Assigns a Group target to a `USER_ADMIN` or `HELP_DESK_ADMIN` Role assigned to a User

When you assign the first Group target, you reduce the scope of the role assignment. The Role no longer applies to all targets but applies only to the specified target.

###### Request parameters


| Parameter   | Description                                     | Param Type   | DataType   | Required |
| :---------- | :---------------------------------------------- | :----------- | :--------- | :------- |
| `groupId`     | ID of the Group target to scope role assignment   | URL          | String     | TRUE     |
| `roleId`      | ID of a Role                                  | URL          | String     | TRUE     |
| `userId`      | ID of a User                                  | URL          | String     | TRUE     |

###### Response parameters


```http
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


```http
HTTP/1.1 204 No Content
```

##### Assign a Group target to a group administrator Role given to a Group

<ApiOperation method="put" url="/api/v1/groups/${groupId}/roles/${roleId}/targets/groups/${targetGroupId}" />

Assigns a Group target to a `USER_ADMIN` or `HELP_DESK_ADMIN` Role assigned to a Group

When you assign the first Group target, you reduce the scope of the role assignment. The Role no longer applies to all targets but applies only to the specified target.

###### Request parameters


| Parameter            | Description                                     | Param Type   | DataType   | Required |
| :------------------- | :---------------------------------------------- | :----------- | :--------- | :------- |
| `groupId`              | ID of an admin Group                          | URL          | String     | TRUE     |
| `roleId`               | ID of a Role                                  | URL          | String     | TRUE     |
| `targetGroupId`        | ID of the Group target to scope role assignment   | URL          | String     | TRUE     |

###### Response parameters

```http
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

```http
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


```http
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

```http
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

```http
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

```http
HTTP/1.1 204 No Content
```

### App administrator role for App targets

Assign an admin role to a subset of Apps to grant the admin permission to manage all the instances of those Apps. Targeted Apps are Okta catalog Apps, and you can assign App targets for these Apps to an admin role regardless of whether a specific instance of the App has been created. For example, there can be multiple configurations of one Okta catalog App, such as Salesforce or Facebook. When you add a Salesforce or Facebook App as a target, that grants the admin permission to manage all the instances of Salesforce or Facebook Apps and create instances of them.

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

Treat the page cursor as an opaque value. You can obtain it through the next link relation. See [Pagination](/docs/reference/core-okta-api/#pagination).

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

The example shows two applications and two instances. The response for instances has an `id` field.

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
          "href": "https://{yourOktaDomain}/img/logos/salesforce_logo.png",
          "type": "image/png"
        }
      ],
      "self": {
          "href": "https://{yourOktaDomain}/api/v1/catalog/apps/salesforce"
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
          "href": "https://{yourOktaDomain}/img/logos/box.png",
          "type": "image/png"
        }
      ],
      "self": {
          "href": "https://{yourOktaDomain}/api/v1/catalog/apps/boxnet"
      }
    }
  },
  {
    "name": "Facebook for Detroit Office",
    "status": "ACTIVE",
    "id": "0oapsqQ5dv19pqyEo0g3",
    "_links": {
      "self": {
          "href": "https://{yourOktaDomain}/api/v1/apps/0oapsqQ5dv19pqyEo0g3"
      }
    }
  },
  {
    "name": "Facebook (Toronto)",
    "status": "ACTIVE",
    "id": "0obdfgrQ5dv29pqyQo0f5",
    "_links": {
       "self": {
           "href": "https://{yourOktaDomain}/api/v1/apps/0obdfgrQ5dv29pqyQo0f5"
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

Treat the page cursor as an opaque value. You can obtain it through the next link relation. See [Pagination](/docs/reference/core-okta-api/#pagination).

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

The example shows one application and one instance. The response for instances has an `id` field.

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
                    "href": "https://{yourOktaDomain}/assets/img/logos/facebook.e8215796628b5eaf687ba414ae245659.png",
                    "type": "image/png"
                }
            ],
            "self": {
                "href": "https://{yourOktaDomain}/api/v1/catalog/apps/facebook"
            }
        }
    },
    {
        "name": "24 Seven Office 0",
        "status": "ACTIVE",
        "id": "0oasrudLtMlzAsTxk0g3",
        "_links": {
            "self": {
                "href": "https://{yourOktaDomain}/api/v1/apps/0oasrudLtMlzAsTxk0g3"
            }
        }
    }
]
```

#### Assign an App target to an App administrator Role

##### Assign an App target to an App administrator Role given to a User

<ApiOperation method="put" url="/api/v1/users/${userId}/roles/${roleId}/targets/catalog/apps/${appName}" />

Assigns an App target for an `APP_ADMIN` Role assigned to a User

When you assign the first App target, you reduce the scope of the Role assignment. The Role no longer applies to all App targets, but applies only to the specified target.

Assigning an App target overrides any existing App Instance targets of the App. For example, if someone was assigned to administer a specific Facebook instance, calling this endpoint with `facebook` for `appName`, would make them administrator for all Facebook instances.

###### Request parameters


| Parameter   | Description                                                      | Param Type   | DataType   | Required |
| :---------- | :--------------------------------------------------------------- | :----------- | :--------- | :------- |
| `appName`   | Name of the App target from the catalog to scope Role assignment | URL          | String     | TRUE     |
| `roleId`    | ID of a Role                                                     | URL          | String     | TRUE     |
| `userId`    | ID of a User                                                     | URL          | String     | TRUE     |

###### Response parameters

```http
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

```http
HTTP/1.1 204 No Content
```

##### Assign an App target to an App administrator Role given to a Group

<ApiOperation method="put" url="/api/v1/groups/${groupId}/roles/${roleId}/targets/catalog/apps/${appName}" />

Assigns an App target to an `APP_ADMIN` Role assigned to a Group

When you assign the first App target, you reduce the scope of the role assignment. The Role no longer applies to all App targets but applies only to the specified target.

An App target that is assigned overrides any existing instance targets of the app. For example, if someone is assigned to administer a specific Facebook instance, a call to this endpoint with `facebook` for `appName` would make that person the administrator for all Facebook instances.

###### Request parameters


| Parameter   | Description                                                  | Param Type   | DataType   | Required |
| :---------- | :----------------------------------------------------------- | :----------- | :--------- | :------- |
| `groupId`     | ID of a Group                                              | URL          | String     | TRUE     |
| `roleId`      | ID of a Role                                               | URL          | String     | TRUE     |
| `appName`     | Name of the App target from the catalog to scope role assignment   | URL          | String     | TRUE     |

###### Response parameters

```http
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

```http
HTTP/1.1 204 No Content
```

#### Assign an App Instance target to an App administrator Role

Assign an admin role to a specific App Instance to grant the admin permission to manage an instance of one App or instances of multiple Apps. App Instances are specific Apps that admins create in their org. For example, there may be a Salesforce App configured differently for each sales region of a company. When you create an App Instance target, you may assign an admin to manage only two instances of the configured Salesforce Apps and then also to manage an instance of another configured App such as Workday.

> **Note:** You can target a mixture of both App and App Instance targets, but can't assign permissions to manage all the instances of an App and then a subset of that same App. For example, you can't specify that an admin has access to manage all the instances of a Salesforce app and then also specific configurations of the Salesforce app.

##### Assign an App Instance target to an App administrator Role given to a User

<ApiOperation method="put" url="/api/v1/users/${userId}/roles/${roleId}/targets/catalog/apps/${appName}/${appInstanceId}" />

Assigns an App Instance target to an `APP_ADMIN` Role assigned to a User

When you assign the first App or App Instance target, you reduce the scope of the role assignment. The Role no longer applies to all App targets, but applies only to the specified target.

> **Note:** You can target a mixture of both App and App Instance targets, but can't assign permissions to manage all the instances of an App and then a subset of that same App. For example, you can't specify that an admin has access to manage all the instances of a Salesforce app and then also specific configurations of the Salesforce app.

###### Request parameters


| Parameter     | Description                                                  | Param Type   | DataType   | Required |
| :----------   | :----------------------------------------------------------- | :----------- | :--------- | :------- |
| `userId`        | ID of a User                                               | URL          | String     | TRUE     |
| `roleId`        | ID of a Role                                               | URL          | String     | TRUE     |
| `appName`       | Name of the App target from the catalog to scope role assignment   | URL          | String     | TRUE     |
| `appInstanceId` | ID of the App Instance target to scope role assignment     | URL          | String     | TRUE     |

###### Response parameters

```http
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

```http
HTTP/1.1 204 No Content
```

##### Assign an App Instance target to an App administrator Role given to a Group

<ApiOperation method="put" url="/api/v1/groups/${groupId}/roles/${roleId}/targets/catalog/apps/${appName}/${appInstanceId}" />

Assigns an App Instance target to an `APP_ADMIN` Role assigned to a Group

When you assign the first App or App Instance target, you reduce the scope of the role assignment. The Role no longer applies to all App targets, but applies only to the specified target.

> **Note:** You can target a mixture of both App and App Instance targets, but can't assign permissions to manage all the instances of an App and then a subset of that same App. For example, you can't specify that an admin has access to manage all the instances of a Salesforce app and then also specific configurations of the Salesforce app.

###### Request parameters


| Parameter         | Description                                                  | Param Type   | DataType   | Required |
| :---------------- | :----------------------------------------------------------- | :----------- | :--------- | :------- |
| `appInstanceId`     | ID of the App Instance target to scope role assignment     | URL          | String     | TRUE     |
| `appName`           | Name of the App target from the catalog to scope role assignment   | URL          | String     | TRUE     |
| `groupId`           | ID of a Group                                              | URL          | String     | TRUE     |
| `roleId`            | ID of a Role                                               | URL          | String     | TRUE     |

###### Response parameters

```http
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

```http
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

```http
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

```http
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

```http
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

```http
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

```http
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

```http
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

```http
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

```http
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
            "href": "https://{yourOktaDomain}/api/v1/users/00ur32Vg0fvpyHZeQ0g3"
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
            "href": "https://{yourOktaDomain}/api/v1/groups/00g1ousb3XCr9Dkr20g4"
        }
    }
}
```

#### Sample Custom Role assigned to the User directly

The following fields are different compared to those for [an individually assigned standard Role](#sample-role-assigned-to-the-user-directly):

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
                "href": "https://{yourOktaDomain}/api/v1/users/00u1gytb3XCr9Dkr18r2"
            },
            "resource-set": {
                "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g"
            },
            "member": {
                "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0Yq6IJxGIr0ouum0g3/members/irb1qe6PGuMc7Oh8N0g4"
            },
            "role": {
                "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
            },
            "permissions": {
                "href": "https://{yourOktaDomain}/api/v1/iam/permission-sets/cr0Yq6IJxGIr0ouum0g3/permissions"
            }
        }
    }
```

#### Sample Custom Role assigned to the User through a Group membership

The following fields are different compared to those for [a Group assigned standard Role](#sample-role-assigned-to-the-user-through-a-group-membership):

* The `id` field has a different format, but it has the same application.
* The `type` field for Custom Roles always has the value `CUSTOM`.
* The new `resource-set` field gives the ID of the Resource Set to which this assignment applies.
* The `_links` field has three new fields:
  * `resource-set` is the `GET` link to the Resource Set to which this assignment is granted.
  * `role` is the `GET` link to the Role to which this assignment is granted.
  * `permissions` is the `GET` link to the Permissions to which this assignment is granted.

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
      "href": "https://{yourOktaDomain}/api/v1/groups/00g1ousb3XCr9Dkr20g4"
    },
    "resource-set": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoakjsdQaJxGIr03int1o"
    },
    "member": {
      "href": "https://{yourOktaDomain}/api/v1/iam/resource-sets/iamoJDFKaJxGIr0oamd9g/bindings/cr0Yq6IJxGIr0ouum0g3/members/irb1qe6PGuMc7Oh8N0g4"
    },
    "role": {
      "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
    },
    "permissions": {
      "href": "https://{yourOktaDomain}/api/v1/iam/permission-sets/cr0Yq6IJxGIr0ouum0g3/permissions"
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
| `resource-set`     | The Resource Set ID in which the Role is granted (only present for Custom Roles)        | String                                                                                                                                     | TRUE      | TRUE     | TRUE      |

#### Role links

The following `_links` are returned:

* `assignee`: Retrieves the User or Group to which this Role is assigned
* `resource-set`: (Only for Custom Roles) Retrieves the Resource Set that is targeted by this assignment
* `permissions`: (Only for Custom Roles) Lists all Permissions that are granted through this assignment
* `role`: (Only for Custom Roles) Retrieves the Role that is granted through this assignment
* `member`: (Only for Custom Roles) Retrieves the Member object from the Binding that grants this Role

#### Role types

Some Roles support optional targets that constrain the Role to a specific set of Groups or Apps. If an optional target isn't specified, then the Role assignment is unbounded (for example, applies to all Groups or Apps).

See the [product documentation](https://help.okta.com/okta_help.htm?id=ext_Security_Administrators) for a complete definition of permissions granted to each Role.

| Role type                               | Label                               | Optional targets                      |
| :-------------------------------------- | :---------------------------------- | :------------------------------------ |
| `API_ACCESS_MANAGEMENT_ADMIN`           | API Access Management Administrator |                                       |
| `APP_ADMIN`                             | Application Administrator           | Apps                                  |
| `GROUP_MEMBERSHIP_ADMIN`                | Group Membership Administrator      | [Groups](/docs/reference/api/groups/) |
| `HELP_DESK_ADMIN`                       | Help Desk Administrator             | [Groups](/docs/reference/api/groups/) |
| `MOBILE_ADMIN`                          | Mobile Administrator                |                                       |
| `ORG_ADMIN`                             | Organizational Administrator        |                                       |
| `READ_ONLY_ADMIN`                       | Read-only Administrator             |                                       |
| `REPORT_ADMIN`                          | Report Administrator                |                                       |
| `SUPER_ADMIN`                           | Super Administrator                 |                                       |
| `USER_ADMIN`                            | Group Administrator                 | [Groups](/docs/reference/api/groups/) |
| `CUSTOM`  | Custom Label specified by the client    | [Groups](/docs/reference/api/groups/) |

`API_ACCESS MANAGEMENT_ADMIN` is available if the API Access Management feature is enabled. See [API Access Management Best Practices](/docs/concepts/api-access-management/#recommended-practices-for-api-access-management) for a description of what the Role can do.

##### IAM-based Role types

Okta also supports the following IAM-based standard roles:
| Role type                                               | Label                            | Permissions                                   |
| :------------------------------------------------------ | :------------------------------- | :-------------------------------------------- |
| `ACCESS_CERTIFICATIONS_ADMIN`  | Access Certifications Administrator | `okta.governance.accessCertifications.manage` |
| `ACCESS_REQUESTS_ADMIN`        | Access Requests Administrator       | `okta.governance.accessRequests.manage`       |

#### Assignment types

A Role could either be assigned to the User directly or be assigned to a Group of which the User is a Member. The `assignee` in `_links` provides more details about the User or the Group to which the assignment was made.

| Assignment type     | Description                                                        |
| :------------------ | :----------------------------------------------------------------- |
| `GROUP`             | Role is assigned to an admin Group of which the User is a Member  |
| `USER`              | Role is assigned to the User directly                             |

## Custom Role object

A Custom Role is a custom set of [Permissions](#permission-types). A Custom Role is uniquely identified within your org by its ID or label.

### Custom Role Properties

| Property         | Description                         | DataType                                       | Nullable   | Unique   | Read Only |
| :--------------- | :---------------------------------- | :--------------------------------------------- | :--------- | :------- | :-------- |
| `id`               | Unique key for the Role             | String                                         | FALSE      | TRUE     | TRUE      |
| `label`            | Display name of the Role                | String                                         | FALSE      | TRUE     | FALSE     |
| `created`      | The date and time the Role was created | Timestamp | FALSE      | FALSE    | TRUE     |
| `lastUpdated`      | The date and time that the Role's label or description were last updated | Timestamp | FALSE      | FALSE    | TRUE     |
| `_links`           | Discoverable resources related to the Role      | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE       | FALSE    | TRUE     |


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
      "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions"
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
    }
  }
}
```

### Permission types

Permissions can be added to, or removed from, Custom Roles.  Permissions to manage a resource also grant the viewing privileges for the same resource so that you won't need to assign them separately.

User permissions are only effective regarding the Groups to which the admin is granted a Role through Resource Set assignments.

#### Permission properties

| Property         | Description                         | DataType                                       | Nullable   | Unique   | Read Only |
| :--------------- | :---------------------------------- | :--------------------------------------------- | :--------- | :------- | :-------- |
| `label`            | Type of permissions                | String                                         | FALSE      | FALSE     | TRUE     |
| `created`      | The date and time the Permission was added to the role | Timestamp | FALSE      | FALSE    | TRUE     |
| `lastUpdated`      | The date and time the Permission's association with the role was last updated | Timestamp | FALSE      | FALSE    | TRUE     |
| `_links`           | Discoverable resources related to the Permission      | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)  | TRUE       | FALSE    | TRUE     |


| Permission type                         | Description                                                                                                                                           | Applicable resource types                    |
| :-------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- |
| `okta.users.manage`                     | Allows the admin to create and manage Users and read all profile and credential information for Users                                                | All Users, all Users within a specific Group |
| `okta.users.create`                     | Allows the admin to create Users. If the admin is also scoped to manage a Group, that admin can add the User to the Group on creation and then manage.| All Groups, a specific Group                 |
| `okta.users.read`                       | Allows the admin to read any User's profile and credential information                                                                               | All Users, all Users within a specific Group |
| `okta.users.credentials.manage`         | Allows the admin to manage only credential lifecycle operations for a User                                                                           | All Users, all Users within a specific Group |
| `okta.users.credentials.resetFactors`   | Allows the admin to reset MFA authenticators for users                                                                                               | All Users, all Users within a specific Group |
| `okta.users.credentials.resetPassword`  | Allows the admin to reset passwords for users                                                                                                        | All Users, all Users within a specific Group |
| `okta.users.credentials.expirePassword` | Allows the admin to expire a user’s password and set a new temporary password                                                                        | All Users, all Users within a specific Group |
| `okta.users.userprofile.manage`         | Allows the admin to only do operations on the User object, including hidden and sensitive attributes                                                 | All Users, all Users within a specific Group |
| `okta.users.lifecycle.manage`           | Allows the admin to perform any User lifecycle operations                                                                                            | All Users, all Users within a specific Group |
| `okta.users.lifecycle.activate`         | Allows the admin to activate user accounts                                                                                                           | All Users, all Users within a specific Group |
| `okta.users.lifecycle.deactivate`       | Allows the admin to deactivate user accounts                                                                                                         | All Users, all Users within a specific Group |
| `okta.users.lifecycle.suspend`          | Allows the admin to suspend user access to Okta. When a user is suspended, their user sessions are also cleared.                                      | All Users, all Users within a specific Group |
| `okta.users.lifecycle.unsuspend`        | Allows the admin to restore user access to Okta                                                                                                      | All Users, all Users within a specific Group |
| `okta.users.lifecycle.delete`           | Allows the admin to permanently delete user accounts                                                                                                 | All Users, all Users within a specific Group |
| `okta.users.lifecycle.unlock`           |	Allows the admin to unlock users who have been locked out of Okta                                                                                    | All Users, all Users within a specific Group |
| `okta.users.lifecycle.clearSessions`    | Allows the admin to clear all active Okta sessions and OAuth tokens for a user                                                                       | All Users, all Users within a specific Group |
| `okta.users.groupMembership.manage`     | Allows the admin to manage a user's group membership (also need `okta.groups.members.manage` to assign to a specific Group)                          | All Users, all Users within a specific Group |
| `okta.users.appAssignment.manage`       | Allows the admin to manage a user's app assignment (also need `okta.apps.assignment.manage` to assign to a specific App)                             | All Users, all Users within a specific Group |
| `okta.groups.manage`                    | Allows the admin to fully manage Groups in your Okta organization                                                                                    | All Groups, a specific Group                 |
| `okta.groups.create`                    | Allows the admin to create Groups                                                                                                                    | All Groups                                   |
| `okta.groups.members.manage`            | Allows the admin to only manage member operations in a Group in your Okta org                                                                        | All Groups, a specific Group                 |
| `okta.groups.read`                      | Allows the admin to only read information about Groups and their members in your Okta organization                                                   | All Groups, a specific Group                 |
| `okta.groups.appAssignment.manage`      | Allows the admin to manage a Group's app assignment (also need `okta.apps.assignment.manage` to assign to a specific App)                            | All Groups, a specific Group                 |
| `okta.apps.read`                        | Allows the admin to only read information about Apps and their members in your Okta organization                                                     | All Apps, All apps of specific type, a specific App |
| `okta.apps.manage`                      | Allows the admin to fully manage Apps and their members in your Okta organization                                                                    | All Apps, All apps of specific type, a specific App |
| `okta.apps.assignment.manage`           | Allows the admin to only manage assignment operations of an App in your Okta org                                                                     | All Apps, All apps of specific type, a specific App |
| `okta.profilesources.import.run`         | Allows the admin to run imports for apps with a profile source, such as HRaaS and AD/LDAP apps. Admins with this permission can create users through the import. | All Apps, All apps of specific type, a specific App |
| `okta.authzServers.read`                | Allows the admin to read authorization servers                                                                                                      | All authorization servers, a specific authorization server |
| `okta.authzServers.manage`              | Allows the admin to manage authorization servers                                                                                                    | All authorization servers, a specific authorization server |
| `okta.customizations.read`              | Allows the admin to read customizations                                                                                                             | All customizations |
| `okta.customizations.manage`            | Allows the admin to manage customizations                                                                                                           | All customizations |
| `okta.workflows.invoke`                 | Allows the admin to view and run delegated flows                                                                                                    | All Delegated Flows, a specific Delegated Flow |
| `okta.governance.accessCertifications.manage`   | Allows the admin to view and manage access certification campaigns                                                                  | All Access Certifications |
| `okta.governance.accessRequests.manage`    | Allows the admin to view and manage Access Requests                                                                                       | All Access Requests |
| `okta.apps.manageFirstPartyApps`    | Allows the admin to manage first-party apps                                                                                       | All Access Requests |
> **Note:** Governance permissions are currently only supported as part of the [Standard IAM-based Roles](/docs/concepts/role-assignment/#iam-based-standard-role-types). You can't use these to create or update other roles.
> **Note:** `okta.apps.manageFirstPartyApps` permission is only supported as part of some [Standard IAM-based Roles](/docs/concepts/role-assignment/#iam-based-standard-role-types). You can't use it to create or update other roles.

#### Example

```json
{
  "label" : "okta.users.read",
  "created": "2021-02-06T16:20:57.000Z",
  "lastUpdated": "2021-02-06T16:20:57.000Z",
  "_links": {
    "role": {
      "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3"
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/iam/roles/cr0Yq6IJxGIr0ouum0g3/permissions/okta.users.read"
    }
  }
}
```

## Resource Set object

A Resource Set is a collection of resources. As there can be many resources in a set, the object itself doesn't list the resources but provides a paginated link to fetch resources.

| Property         | Description                                             | DataType                                                                                                      | Nullable   | Unique   | Read Only |
| :--------------- | :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------ | :--------- | :------- | :-------- |
| `id`               | Unique key for the Resource Set                         | String                                                                                                        | FALSE      | TRUE     | TRUE      |
| `label`            | Display name of the Resource Set                        | String                                                                                                        | FALSE      | TRUE     | FALSE     |
| `description`      | A description of the Resource Set                       | String                                                                                                        | FALSE      | FALSE    | FALSE     |
| `_links`           | Discoverable resources related to the Resource Set      | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                                                | TRUE       | FALSE    | FALSE     |

The following `_links` are returned:

* `self`: Retrieves the Resource Set
* `resources`: Lists all resources included in this set
* `bindings`: Lists all admin Role Bindings assigned to this set

### Resource object

A resource has an ID and a link that points to the resource. Supported resources are:

#### Supported resources

The following are the supported resources.

| Service                 | Resource                                                            |  ORN Identifier                                                               | REST URL                                                                                                                                                |
| :---------------------- | :------------------------------------------------------------------ | :---------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Directory               | All Users                                                           | `orn:${partition}:directory:${yourOrgId}:users`                                       | [`https://${yourOktaDomain}/api/v1/users`](/docs/reference/api/users/#list-users)                                                                       |
|                         | All Groups                                                          | `orn:${partition}:directory:${yourOrgId}:groups`                                      | [`https://${yourOktaDomain}/api/v1/groups`](/docs/reference/api/groups/#list-groups)                                                                    |
|                         | A specific Group                                                    | `orn:${partition}:directory:${yourOrgId}:groups:${groupId}`                           | [`https://${yourOktaDomain}/api/v1/groups/${groupId}`](/docs/reference/api/groups/#get-group)                                                           |
|                         | All Users within a specific Group                                   | `orn:${partition}:directory:${yourOrgId}:groups:${groupId}:contained_resources`       | [`https://${yourOktaDomain}/api/v1/groups/${groupId}/users`](/docs/reference/api/groups/#list-group-members)                                            |
| Identity Provider       | All Apps                                                            | `orn:${partition}:idp:${yourOrgId}:apps`                                              | [`https://${yourOktaDomain}/api/v1/apps`](/docs/reference/api/apps/#list-applications)                                                                  |
|                         | All Apps of a specific type                                         | `orn:${partition}:idp:${yourOrgId}:apps:${appType}`                                   | [`https://${yourOktaDomain}/api/v1/apps/?filter=name+eq+%22${targetAppType}%22`](/docs/reference/api/apps/#list-apps-by-name)                             |
|                         | A specific App                                                      | `orn:${partition}:idp:${yourOrgId}:apps:${appType}:${appId}`                          | [`https://${yourOktaDomain}/api/v1/apps/${appId}`](/docs/reference/api/apps/#get-application)                                                           |
|                         | All Authorization Servers                                           | `orn:${partition}:idp:${yourOrgId}:authorization_servers`                             | [`https://${yourOktaDomain}/api/v1/authorizationServers`](/docs/reference/api/authorization-servers/#list-authorization-servers)                        |
|                         | A specific Authorization Server                                     | `orn:${partition}:idp:${yourOrgId}:authorization_servers:${authorizationServerId}`    | [`https://${yourOktaDomain}/api/v1/authorizationServers/${authorizationServerId}`](/docs/reference/api/authorization-servers/#get-authorization-server) |
|                         | All customizations                                                  | `orn:${partition}:idp:${yourOrgId}:customizations`                                    |                                                                                                                                                         |
| Workflows               | All Delegated Flows                                                 | `orn:${partition}:workflow:${yourOrgId}:flows`                                       |                                                                                                                                                         |
|                         | A specific Delegated Flow                                           | `orn:${partition}:workflow:${yourOrgId}:flows:${flowId}`                             |                                                                                                                                                         |
| Governance              | All Access Certifications           | `orn:$partition$:governance:$orgId$:certifications`                                   |                                                                                                                                                         |
|                         | All Access Requests                | `orn:$partition$:governance:$orgId$:requests`                                         |                                                                                                                                                         |

The ID of a resource is unique to the Resource Set, whereas the link that points to the resource is unique for the org. A Group, if used in two Resource Sets, has distinct IDs in each Resource Set but has the same self link in both.

> **Note:** Governance resources are currently only supported as part of the [Standard Resource Sets](/docs/concepts/role-assignment/#standard-resource-sets). You can't use these to create or update other resource sets.
#### Resource examples

##### Group as resource

```json
    {
      "id": "ire106sQKoHoXXsAe0g4",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "self": {
          "href": "https://{yourOktaDomain}/api/v1/groups/00guaxWZ0AOa5NFAj0g3"
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
          "href": "https://{yourOktaDomain}/api/v1/groups/00guaxWZ0AOa5NFAj0g3/users"
        }
      }
    }
```

##### All Users as resource

```json
    {
      "id": "ire106sQKoHoXXsAe0g4",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "users": {
          "href": "https://{yourOktaDomain}/api/v1/users"
        }
      }
    }
```

##### All Groups as resource

```json
    {
      "id": "ire106sQKoHoXXsAe0g4",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "groups": {
          "href": "https://{yourOktaDomain}/api/v1/groups"
        }
      }
    }
```

##### All Apps as resource

```json
    {
      "id": "ire106sQKoHoXXsAe0g4",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "apps": {
          "href": "https://{yourOktaDomain}/api/v1/apps"
        }
      }
    }
```

##### All Apps of the same type as resource

```json
    {
      "id": "ire106sQKoHoXXsAe0g4",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "apps": {
          "href": "https://{yourOktaDomain}/api/v1/apps?filter=name+eq+%22workday%22"
        }
      }
    }
```

##### A specific app as resource

```json
    {
      "id": "ire106sQKoHoXXsAe0g4",
      "created": "2021-02-06T16:20:57.000Z",
      "lastUpdated": "2021-02-06T16:20:57.000Z",
      "_links": {
        "apps": {
          "href": "https://{yourOktaDomain}/api/v1/apps/0oa1gjh63g214q0Hq0g4"
        }
      }
    }
```

### Binding object

A Binding represents the assignment of a [Custom Role](#custom-role-object) to a list of admins. Bindings are specific to a [Resource Set](#resource-set-object). There’s a maximum of one Binding object per Role in a Resource Set.

The admin list assigned to a Role is made of [Resource objects](#resource-object) that represent either of the following types of admin assignments:

* Directly assigned to the User
* Assigned to a Group

| Property         | Description                                                     | DataType       | Nullable   | Unique   | Read Only |
| :--------------- | :-------------------------------------------------------------- | :------------- | :--------- | :------- | :-------- |
| `id`               | ID of the Role granted in this Binding                        | String         | FALSE      | FALSE    | FALSE     |
| `_links`           | Discoverable resources related to the Resource Set            | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)  | TRUE       | FALSE    | FALSE     |

The following `_links` are returned:

* `self`: Retrieves this Binding
* `members`: Lists all Members included in this Binding

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
          "href": "https://{yourOktaDomain}/api/v1/groups/00guaxWZ0AOa5NFAj0g3"
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
          "href": "https://{yourOktaDomain}/api/v1/users/00uuk41Hjga5qGfQ30g3"
        }
      }
    }
```

##### Client Application as member <ApiLifecycle access="beta" />

```json
    {
      "id": "irb5vzkeQKc56r5G10g4",
      "created": "2022-12-14T00:00:00.000Z",
      "lastUpdated": "2022-12-14T00:00:00.000Z",
      "_links": {
        "self": {
          "href": "https://{yourOktaDomain}/oauth2/v1/clients/0oa5vymVNCe2cPEeZ0g4"
        }
      }
    }
```

## Condition object
<ApiLifecycle access="ea" />

Use a Condition object to further restrict a permission in a Custom Admin Role. For example, you can restrict access to specific profile attributes.

> **NOTE:** Conditions are only available for `okta.users.read` and `okta.users.userprofile.manage`.

> **NOTE:** You can't restrict admins from viewing certain attributes:
> - first name
> - last name
> - username
> - primary email
> - mobile phone

### Condition object Properties

| Property         | Description                                           | DataType | Required  |
| :--------------- | :---------------------------------------------------- | :------- | :-------- |
| `include`        | Object with attributes to which access is allowed     | Object   | FALSE     |
| `exclude`        | Object with attributes to which access isn't allowed  | Object   | FALSE     |

> **NOTE:** Exactly one of `include` or `exclude` must be present in the conditions object.

#### Conditions example to include city, state, zipCode user attributes

```json
{
  "conditions": {
    "include": {
      "okta:ResourceAttribute/User/Profile": [
        "city",
        "state",
        "zipCode"
      ]
    }
  }
}
```

#### Conditions example to include all user attributes except for city, state, zipCode

```json
{
  "conditions": {
    "exclude": {
      "okta:ResourceAttribute/User/Profile": [
        "city",
        "state",
        "zipCode"
      ]
    }
  }
}
```
