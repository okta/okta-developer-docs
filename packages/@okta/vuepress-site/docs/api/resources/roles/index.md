---
title: Administrator Roles
category: management
---

# Administrator Roles API

The Okta Administrator Roles API provides operations to manage administrative role assignments for a user.

## Getting Started with Administrator Roles

Explore the Administrator Roles API:  [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/04f5ec85685ac6f2827e)

## Role Assignment Operations

### List Roles Assigned to User


<ApiOperation method="get" url="/api/v1/users/${userId}/roles" />

Lists all roles assigned to a user.

#### Request Parameters


| Parameter    | Description                                         | Param Type | DataType | Required |
|:------------ |:--------------------------------------------------- |:---------- |:-------- |:-------- |
| userId          | `id` of a user                                        | URL        | String   | TRUE     |

#### Response Parameters


Array of [Role](#role-model)

#### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles"
```

##### Response Example


```json
[
  {
    "id": "ra1b8aahBZuGJRRa30g4",
    "label": "Organization Administrator",
    "type": "ORG_ADMIN",
    "status": "ACTIVE",
    "created": "2015-09-06T14:55:11.000Z",
    "lastUpdated": "2015-09-06T14:55:11.000Z"
  },
  {
    "id": "IFIFAX2BIRGUSTQ",
    "label": "Application Administrator",
    "type": "APP_ADMIN",
    "status": "ACTIVE",
    "created": "2015-09-06T14:55:11.000Z",
    "lastUpdated": "2015-09-06T14:55:11.000Z"
  }
]
```

### Assign Role to User


<ApiOperation method="post" url="/api/v1/users/${userId}/roles" />

Assigns a role to a user.

#### Request Parameters


| Parameter | Description            | Param Type | DataType                  | Required |
|:----------|:-----------------------|:-----------|:--------------------------|:---------|
| userId       | `id` of a user           | URL        | String                    | TRUE     |
| type      | type of role to assign | Body       | [Role Type](#role-types)  | TRUE     |

#### Response Parameters


Assigned [Role](#role-model)

#### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
      "type": "SUPER_ADMIN"
}' "https://{yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles"
```

##### Response Example


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

### Unassign Role from User


<ApiOperation method="delete" url="/api/v1/users/${userId}/roles/${roleId}" />

Unassigns a role from a user.

#### Request Parameters


| Parameter | Description  | Param Type | DataType | Required |
|:----------|:-------------|:-----------|:---------|:---------|
| userId       | `id` of a user | URL        | String   | TRUE     |
| roleId       | `id` of a role | URL        | String   | TRUE     |

#### Response Parameters


``` http
HTTP/1.1 204 No Content
```

#### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/ra1b8anIk7rx7em7L0g4"
```

##### Response Example


``` http
HTTP/1.1 204 No Content
```

## Role Target Operations

### Group Administrator Role Group Targets

#### List Group Targets for Group Administrator Role


<ApiOperation method="get" url="/api/v1/users/${userId}/roles/${roleId}/targets/groups" />

Lists all group targets for a `USER_ADMIN` role assignment.

##### Request Parameters


| Parameter | Description                                                  | Param Type | DataType | Required |
|:----------|:-------------------------------------------------------------|:-----------|:---------|:---------|
| userId       | `id` of a user                                                 | URL        | String   | TRUE     |
| roleId       | `id` of a role                                                 | URL        | String   | TRUE     |
| limit     | Specifies the number of results for a page (default is 20)   | Query      | Number   | FALSE    |
| after     | Specifies the pagination cursor for the next page of targets | Query      | String   | FALSE    |

Treat the page cursor as an opaque value: obtain it through the next link relation. See [Pagination](/docs/api/getting_started/design_principles#pagination).

##### Response Parameters


Array of [Groups](groups)

If the role isn't scoped to specific group targets, an empty array `[]` is returned.

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/groups"
```

##### Response Example


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

#### Add Group Target to Group Administrator Role


<ApiOperation method="put" url="/api/v1/users/${userId}/roles/${roleId}/targets/groups/${groupId}" />

Adds a group target for a `USER_ADMIN` role assignment.

Adding the first group target changes the scope of the role assignment from applying to all targets to only applying to the specified target.

##### Request Parameters


| Parameter | Description                                   | Param Type | DataType | Required |
|:----------|:----------------------------------------------|:-----------|:---------|:---------|
| userId       | `id` of a user                                  | URL        | String   | TRUE     |
| roleId       | `id` of a role                                  | URL        | String   | TRUE     |
| groupId      | `id` of group target to scope role assignment | URL        | String   | TRUE     |

##### Response Parameters


``` http
HTTP/1.1 204 No Content
```

##### Request Example


```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/groups/00garkxjAHDYPFcsP0g4"
```

##### Response Example


``` http
HTTP/1.1 204 No Content
```

#### Remove Group Target from Group Administrator Role


<ApiOperation method="delete" url="/api/v1/users/${userId}/roles/${roleId}/targets/groups/${groupId}" />

Removes a group target from a `USER_ADMIN` role assignment.

Don't remove the last group target from a role assignment, as this causes an exception.  If you need a role assignment that applies to all groups, the API consumer should delete the `USER_ADMIN` role assignment and recreate it.

##### Request Parameters


| Parameter | Description                              | Param Type | DataType | Required |
|:----------|:-----------------------------------------|:-----------|:---------|:---------|
| userId       | `id` of a user                             | URL        | String   | TRUE     |
| roleId       | `id` of a role                             | URL        | String   | TRUE     |
| groupId      | `id` of group target for role assignment | URL        | String   | TRUE     |

##### Response Parameters


``` http
HTTP/1.1 204 No Content
```

##### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/groups/00garkxjAHDYPFcsP0g4"
```

##### Response Example


``` http
HTTP/1.1 204 No Content
```

### App Administrator Role App Targets

#### List App Targets for App Administrator Role


<ApiOperation method="get" url="/api/v1/users/${userId}/roles/${roleId}/targets/catalog/apps" />

Lists all app targets for an `APP_ADMIN` role assignment.

##### Request Parameters


| Parameter | Description                                                  | Param Type | DataType | Required |
|:----------|:-------------------------------------------------------------|:-----------|:---------|:---------|
| userId       | `id` of a user                                                 | URL        | String   | TRUE     |
| roleId       | `id` of a role                                                 | URL        | String   | TRUE     |
| limit     | Specifies the number of results for a page (default is 20)   | Query      | Number   | FALSE    |
| after     | Specifies the pagination cursor for the next page of targets | Query      | String   | FALSE    |

Treat the page cursor as an opaque value: obtain it through the next link relation. See [Pagination](/docs/api/getting_started/design_principles#pagination)

##### Response Parameters


Array of Catalog Apps

If the role is not scoped to specific apps in the catalog, an empty array `[]` is returned.

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/catalog/apps"
```

##### Response Example


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
      "PROFILE_MASTERING",
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

#### Add App Target to App Administrator Role


<ApiOperation method="put" url="/api/v1/users/${userId}/roles/${roleId}/targets/catalog/apps/${appName}" />

Adds an app target for an `APP_ADMIN` role assignment.

Adding the first app target changes the scope of the role assignment from applying to all app targets to applying to the specified target.

Adding an app target will override any existing instance targets of the app. For example, if someone was assigned to administer a specific Facebook instance, calling this endpoint with `facebook` for `appName`, would make them administrator for all Facebook instances.

##### Request Parameters


| Parameter | Description                                                | Param Type | DataType | Required |
|:----------|:-----------------------------------------------------------|:-----------|:---------|:---------|
| userId       | `id` of a user                                               | URL        | String   | TRUE     |
| roleId       | `id` of a role                                               | URL        | String   | TRUE     |
| appName   | `name` of app target from catalog to scope role assignment | URL        | String   | TRUE     |

##### Response Parameters


``` http
HTTP/1.1 204 No Content
```

##### Request Example


```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/catalog/apps/amazon_aws"
```

##### Response Example


``` http
HTTP/1.1 204 No Content
```


#### Add App Instance Target to App Administrator Role


<ApiOperation method="put" url="/api/v1/users/${userId}/roles/${roleId}/targets/catalog/apps/${appName}/${appInstanceId}" />

Adds an app instance target for an `APP_ADMIN` role assignment

Adding the first app or (app instance) target changes the scope of the role assignment from applying to all app targets to applying to the specified target.

App Targets and App Instance Targets cannot be mixed for the same app name. For example, you cannot specify that an administrator has access to mange Salesforce (the entire app type) and specific instances of the Salesforce app; it must be one or the other.

##### Request Parameters


| Parameter | Description                                                | Param Type | DataType | Required |
|:----------|:-----------------------------------------------------------|:-----------|:---------|:---------|
| userId       | `id` of a user                                               | URL        | String   | TRUE     |
| roleId       | `id` of a role                                               | URL        | String   | TRUE     |
| appName   | `name` of app target from catalog to scope role assignment | URL        | String   | TRUE     |
| appInstanceId   | `id` of the app instance target to scope role assignment | URL        | String   | TRUE     |

##### Response Parameters


``` http
HTTP/1.1 204 No Content
```

##### Request Example


```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/catalog/apps/amazon_aws"
```

##### Response Example


``` http
HTTP/1.1 204 No Content
```

#### Remove App Target from App Administrator Role


<ApiOperation method="delete" url="/api/v1/users/${userId}/roles/${roleId}/targets/catalog/apps/${appName}" />

Removes an app target from an `APP_ADMIN` role assignment

> Note: Don't remove the last app target from a role assignment, as this causes an exception.  If you need a role assignment that applies to all apps, the API consumer should delete the `APP_ADMIN` role assignment and recreate it.

##### Request Parameters


| Parameter | Description                              | Param Type | DataType | Required |
|:----------|:-----------------------------------------|:-----------|:---------|:---------|
| userId       | `id` of a user                             | URL        | String   | TRUE     |
| roleId       | `id` of a role                             | URL        | String   | TRUE     |
| appName   | `name` of app target for role assignment | URL        | String   | TRUE     |

##### Response Parameters


``` http
HTTP/1.1 204 No Content
```

##### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/catalog/apps/amazon_aws"
```

##### Response Example


``` http
HTTP/1.1 204 No Content
```

#### Remove App Instance Target from App Administrator Role


<ApiOperation method="delete" url="/api/v1/users/${userId}/roles/${roleId}/targets/catalog/apps/${appName}/${appInstanceId}" />

Removes an app instance target from an `APP_ADMIN` role assignment.

> Note: Don't remove the last app target from a role assignment, as this causes an exception.  If you need a role assignment that applies to all apps, the API consumer should delete the `APP_ADMIN` role assignment and recreate it.

##### Request Parameters


| Parameter | Description                              | Param Type | DataType | Required |
|:----------|:-----------------------------------------|:-----------|:---------|:---------|
| userId       | `id` of a user                             | URL        | String   | TRUE     |
| roleId       | `id` of a role                             | URL        | String   | TRUE     |
| appName   | `name` of app target for role assignment | URL        | String   | TRUE     |
| appInstanceId   | `id` of the app instance target for role assignment | URL        | String   | TRUE     |

##### Response Parameters


``` http
HTTP/1.1 204 No Content
```

##### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/catalog/apps/amazon_aws"
```

##### Response Example


``` http
HTTP/1.1 204 No Content
```

## Role Model

### Example

```json
{
  "id": "ra1b7aguRQ7e5iKYb0g4",
  "label": "Read-only Administrator",
  "type": "READ_ONLY_ADMIN",
  "status": "ACTIVE",
  "created": "2015-09-04T03:27:16.000Z",
  "lastUpdated": "2015-09-04T03:27:16.000Z"
}
```

### Role Properties

The role model defines several **read-only** properties:

| Property    | Description                                           | DataType                                                                                                    | Nullable | Unique | Read Only |
|:------------|:------------------------------------------------------|:------------------------------------------------------------------------------------------------------------|:---------|:-------|:----------|
| id          | Unique key for the role assignment                    | String                                                                                                      | FALSE    | TRUE   | TRUE      |
| label       | Display name of role                                  | String                                                                                                      | FALSE    | FALSE  | TRUE      |
| type        | Type of role                                          | `SUPER_ADMIN`, `ORG_ADMIN`, `API_ACCESS_MANAGEMENT_ADMIN`, `APP_ADMIN`, `USER_ADMIN`, `MOBILE_ADMIN`, `READ_ONLY_ADMIN`, `HELP_DESK_ADMIN` | FALSE    | FALSE  | TRUE      |
| status      | Status of role assignment                             | `ACTIVE`                                                                                                    | FALSE    | FALSE  | TRUE      |
| created     | Timestamp when app user was created                   | Date                                                                                                        | FALSE    | FALSE  | TRUE      |
| lastUpdated | Timestamp when app user was last updated              | Date                                                                                                        | FALSE    | FALSE  | TRUE      |
| _embedded   | Embedded resources related to the role assignment     | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                                              | TRUE     | FALSE  | TRUE      |
| _links      | Discoverable resources related to the role assignment | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                                              | TRUE     | FALSE  | TRUE      |

#### Role Types

Some roles support optional targets that constrain the role to a specific set of groups or apps.  If an optional target is not specified, then the role assignment is unbounded (e.g applies to all groups or apps).

Refer to the [product documentation](https://help.okta.com/en/prod/Content/Topics/Security/Administrators.htm?cshid=Security_Administrators#Security_Administrators) for a complete definition of permissions granted to each role.

| Role Type         | Label                        | Optional Targets        |
|:----------------- |:---------------------------- |:----------------------- |
| `SUPER_ADMIN`     | Super Administrator          |                         |
| `ORG_ADMIN`       | Organizational Administrator |                         |
| `API_ACCESS_MANAGEMENT_ADMIN` | API Access Management Administrator |
| `APP_ADMIN`       | Application Administrator    | Apps                    |
| `USER_ADMIN`      | Group Administrator          | [Groups](groups) |
| `MOBILE_ADMIN`    | Mobile Administrator         |                         |
| `READ_ONLY_ADMIN` | Read-only Administrator      |                         |

`API_ACCESS MANAGEMENT_ADMIN` is available if the API Access Management feature be enabled. For a description of what the role can do, see [API Access Management Best Practices](/use_cases/api_access_management/#recommended-practices-for-api-access-management).
