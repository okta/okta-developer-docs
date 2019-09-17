---
title: Administrator Roles
category: management
meta:
  - name: description
    content: The Okta Administrator Roles API provides operations to manage administrative role assignments for a user. Read this page to get started with Admin Roles.
---

# Administrator Roles API

The Okta Administrator Roles API provides operations to manage administrative role assignments for a user.

## Getting Started with Administrator Roles

Explore the Administrator Roles API:  [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/04f5ec85685ac6f2827e)

## Role Assignment Operations

### List Roles

#### List Roles Assigned to User


<ApiOperation method="get" url="/api/v1/users/${userId}/roles" />

Lists all roles assigned to a user.

##### Request Parameters


| Parameter     | Description                                          | Param Type  | DataType  | Required  |
| :------------ | :--------------------------------------------------- | :---------- | :-------- | :-------- |
| userId        | `id` of a user                                       | URL         | String    | TRUE      |

##### Response Parameters


Array of [Role](#role-model)

##### Request Example


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
        "id": "IFIFAX2BIRGUSTQ",
        "label": "Application Administrator",
        "type": "APP_ADMIN",
        "status": "ACTIVE",
        "created": "2019-02-06T16:17:40.000Z",
        "lastUpdated": "2019-02-06T16:17:40.000Z",
        "assignmentType": "USER",
        "_links": {
            "assignee": {
                "href": "http://{yourOktaDomain}/api/v1/users/00ur32Vg0fvpyHZeQ0g3"
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
                "href": "http://{yourOktaDomain}/api/v1/users/00ur32Vg0fvpyHZeQ0g3"
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
                "href": "http://{yourOktaDomain}/api/v1/users/00ur32Vg0fvpyHZeQ0g3"
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
                "href": "http://{yourOktaDomain}/api/v1/groups/00g1ousb3XCr9Dkr20g4"
            }
        }
    }
]
```

#### List Roles Assigned to Group


<ApiOperation method="get" url="/api/v1/groups/${groupId}/roles" />

Lists all roles assigned to a group.

##### Request Parameters


| Parameter         | Description                                             | Param Type  | DataType  | Required  |
| :---------------- | :------------------------------------------------------ | :---------- | :-------- | :-------- |
| groupId           | `id` of a group                                         | URL         | String    | TRUE      |

##### Response Parameters


Array of [Role](#role-model)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3/roles"
```

###### Response Example


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
                "href": "http://{yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3"
            }
        }
    }
]
```

### Assign Role

#### Assign Role to User


<ApiOperation method="post" url="/api/v1/users/${userId}/roles" />

Assigns a role to a user.

##### Request Parameters


| Parameter   | Description              | Param Type   | DataType                    | Required |
| :---------- | :----------------------- | :----------- | :-------------------------- | :------- |
| userId      | `id` of a user           | URL          | String                      | TRUE     |
| type        | type of role to assign   | Body         | [Role Type](#role-types)    | TRUE     |

##### Response Parameters


Assigned [Role](#role-model)

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
      "type": "SUPER_ADMIN"
}' "https://{yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles"
```

###### Response Example


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

#### Assign Role to Group


<ApiOperation method="post" url="/api/v1/groups/${groupId}/roles" />

Assigns a role to a group.

##### Request Parameters


| Parameter       | Description                 | Param Type   | DataType                    | Required |
| :-------------- | :-------------------------- | :----------- | :-------------------------- | :------- |
| groupId         | `id` of a group             | URL          | String                      | TRUE     |
| type            | type of role to assign      | Body         | [Role Type](#role-types)    | TRUE     |

##### Response Parameters


Assigned [Role](#role-model)

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
      "type": "ORG_ADMIN"
}' "https://{yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3/roles"
```

###### Response Example


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
            "href": "http://{yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3"
        }
    }
}
```

### Unassign Role

#### Unassign Role from User


<ApiOperation method="delete" url="/api/v1/users/${userId}/roles/${roleId}" />

Unassigns a role from a user.

##### Request Parameters


| Parameter   | Description    | Param Type   | DataType   | Required |
| :---------- | :------------- | :----------- | :--------- | :------- |
| userId      | `id` of a user | URL          | String     | TRUE     |
| roleId      | `id` of a role | URL          | String     | TRUE     |

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
"https://{yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/ra1b8anIk7rx7em7L0g4"
```

###### Response Example


``` http
HTTP/1.1 204 No Content
```

#### Unassign Role from Group


<ApiOperation method="delete" url="/api/v1/groups/${groupId}/roles/${roleId}" />

Unassigns a role from a group.

##### Request Parameters


| Parameter       | Description       | Param Type   | DataType   | Required |
| :-------------- | :---------------- | :----------- | :--------- | :------- |
| groupId         | `id` of a group   | URL          | String     | TRUE     |
| roleId          | `id` of a role    | URL          | String     | TRUE     |

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
"https://{yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3/roles/grasraHPx7i79ajaJ0g3"
```

###### Response Example


``` http
HTTP/1.1 204 No Content
```

## Role Target Operations

### Group Administrator Role Group Targets

#### List Group Targets for Group Administrator Role

##### List Group Targets for Group Administrator Role given to a User


<ApiOperation method="get" url="/api/v1/users/${userId}/roles/${roleId}/targets/groups" />

Lists all group targets for a `USER_ADMIN` or `HELP_DESK_ADMIN` role assigned to a user.

###### Request Parameters


| Parameter   | Description                                                    | Param Type   | DataType   | Required |
| :---------- | :------------------------------------------------------------- | :----------- | :--------- | :------- |
| userId      | `id` of a user                                                 | URL          | String     | TRUE     |
| roleId      | `id` of a role                                                 | URL          | String     | TRUE     |
| limit       | Specifies the number of results for a page (default is 20)     | Query        | Number     | FALSE    |
| after       | Specifies the pagination cursor for the next page of targets   | Query        | String     | FALSE    |

Treat the page cursor as an opaque value: obtain it through the next link relation. See [Pagination](/docs/reference/api-overview/#pagination).

###### Response Parameters


Array of [Groups](/docs/reference/api/groups/)

If the role isn't scoped to specific group targets, an empty array `[]` is returned.

###### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/groups"
```

###### Response Example


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

##### List Group Targets for Group Administrator Role given to a Group


<ApiOperation method="get" url="/api/v1/groups/${groupId}/roles/${roleId}/targets/groups" />

Lists all group targets for a `USER_ADMIN` or `HELP_DESK_ADMIN` role assigned to a group.

###### Request Parameters


| Parameter       | Description                                                    | Param Type   | DataType   | Required |
| :-------------- | :------------------------------------------------------------- | :----------- | :--------- | :------- |
| groupId         | `id` of a group                                                | URL          | String     | TRUE     |
| roleId          | `id` of a role                                                 | URL          | String     | TRUE     |
| limit           | Specifies the number of results for a page (default is 20)     | Query        | Number     | FALSE    |
| after           | Specifies the pagination cursor for the next page of targets   | Query        | String     | FALSE    |

Treat the page cursor as an opaque value: obtain it through the next link relation. See [Pagination](/docs/reference/api-overview/#pagination).

###### Response Parameters


Array of [Groups](/docs/reference/api/groups/)

If the role isn't scoped to specific group targets, an empty array `[]` is returned.

###### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3/roles/JBCUYUC7IRCVGS27IFCE2SKO/targets/groups"
```

###### Response Example


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
                    "href": "http://{yourOktaDomain}/assets/img/logos/groups/okta-medium.d7fb831bc4e7e1a5d8bd35dfaf405d9e.png",
                    "type": "image/png"
                },
                {
                    "name": "large",
                    "href": "http://{yourOktaDomain}/assets/img/logos/groups/okta-large.511fcb0de9da185b52589cb14d581c2c.png",
                    "type": "image/png"
                }
            ],
            "users": {
                "href": "http://{yourOktaDomain}/api/v1/groups/00gsrc96agspOaiP40g3/users"
            },
            "apps": {
                "href": "http://{yourOktaDomain}/api/v1/groups/00gsrc96agspOaiP40g3/apps"
            }
        }
    }
]
```

#### Add Group Target to Group Administrator Role

##### Add Group Target to Group Administrator Role given to a User


<ApiOperation method="put" url="/api/v1/users/${userId}/roles/${roleId}/targets/groups/${groupId}" />

Adds a group target for a `USER_ADMIN` or `HELP_DESK_ADMIN` role assigned to a user.

Adding the first group target changes the scope of the role assignment from applying to all targets to only applying to the specified target.

###### Request Parameters


| Parameter   | Description                                     | Param Type   | DataType   | Required |
| :---------- | :---------------------------------------------- | :----------- | :--------- | :------- |
| userId      | `id` of a user                                  | URL          | String     | TRUE     |
| roleId      | `id` of a role                                  | URL          | String     | TRUE     |
| groupId     | `id` of group target to scope role assignment   | URL          | String     | TRUE     |

###### Response Parameters


``` http
HTTP/1.1 204 No Content
```

###### Request Example


```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/groups/00garkxjAHDYPFcsP0g4"
```

###### Response Example


``` http
HTTP/1.1 204 No Content
```

##### Add Group Target to Group Administrator Role given to a Group


<ApiOperation method="put" url="/api/v1/groups/${groupId}/roles/${roleId}/targets/groups/${targetGroupId}" />

Adds a group target for a `USER_ADMIN` or `HELP_DESK_ADMIN` role assigned to a group.

Adding the first group target changes the scope of the role assignment from applying to all targets to only applying to the specified target.

###### Request Parameters


| Parameter            | Description                                     | Param Type   | DataType   | Required |
| :------------------- | :---------------------------------------------- | :----------- | :--------- | :------- |
| groupId              | `id` of an admin group                          | URL          | String     | TRUE     |
| roleId               | `id` of a role                                  | URL          | String     | TRUE     |
| targetGroupId        | `id` of group target to scope role assignment   | URL          | String     | TRUE     |

###### Response Parameters


``` http
HTTP/1.1 204 No Content
```

###### Request Example


```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3/roles/JBCUYUC7IRCVGS27IFCE2SKO/targets/groups/00gsrhsUaRoUib0XQ0g3"
```

###### Response Example


``` http
HTTP/1.1 204 No Content
```

#### Remove Group Target from Group Administrator Role

##### Remove Group Target from Group Administrator Role given to a User


<ApiOperation method="delete" url="/api/v1/users/${userId}/roles/${roleId}/targets/groups/${groupId}" />

Removes a group target from a `USER_ADMIN` or `HELP_DESK_ADMIN` role assigned to a user.

> **Note:** Don't remove the last group target from a role assignment, as this causes an exception.  If you need a role assignment that applies to all groups, the API consumer should delete the `USER_ADMIN` role assignment and recreate it.

###### Request Parameters


| Parameter   | Description                                | Param Type   | DataType   | Required |
| :---------- | :----------------------------------------- | :----------- | :--------- | :------- |
| userId      | `id` of a user                             | URL          | String     | TRUE     |
| roleId      | `id` of a role                             | URL          | String     | TRUE     |
| groupId     | `id` of group target for role assignment   | URL          | String     | TRUE     |

###### Response Parameters


``` http
HTTP/1.1 204 No Content
```

###### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/groups/00garkxjAHDYPFcsP0g4"
```

###### Response Example


``` http
HTTP/1.1 204 No Content
```

##### Remove Group Target from Group Administrator Role given to a Group


<ApiOperation method="delete" url="/api/v1/groups/${groupId}/roles/${roleId}/targets/groups/${targetGroupId}" />

Removes a group target from a `USER_ADMIN` or `HELP_DESK_ADMIN` role assigned to a group.

> **Note:** Don't remove the last group target from a role assignment, as this causes an exception.  If you need a role assignment that applies to all groups, the API consumer should delete the `USER_ADMIN` role assignment and recreate it.

###### Request Parameters


| Parameter       | Description                                | Param Type   | DataType   | Required |
| :-------------- | :----------------------------------------- | :----------- | :--------- | :------- |
| groupId         | `id` of an admin group                     | URL          | String     | TRUE     |
| roleId          | `id` of a role                             | URL          | String     | TRUE     |
| targetGroupId   | `id` of group target for role assignment   | URL          | String     | TRUE     |

###### Response Parameters


``` http
HTTP/1.1 204 No Content
```

###### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3/roles/JBCUYUC7IRCVGS27IFCE2SKO/targets/groups/00gsrhsUaRoUib0XQ0g3"
```

###### Response Example


``` http
HTTP/1.1 204 No Content
```

### App Administrator Role App Targets

#### List App Targets for App Administrator Role

##### List App Targets for App Administrator Role given to a User


<ApiOperation method="get" url="/api/v1/users/${userId}/roles/${roleId}/targets/catalog/apps" />

Lists all app targets for an `APP_ADMIN` role assigned to a user.

###### Request Parameters


| Parameter   | Description                                                    | Param Type   | DataType   | Required |
| :---------- | :------------------------------------------------------------- | :----------- | :--------- | :------- |
| userId      | `id` of a user                                                 | URL          | String     | TRUE     |
| roleId      | `id` of a role                                                 | URL          | String     | TRUE     |
| limit       | Specifies the number of results for a page (default is 20)     | Query        | Number     | FALSE    |
| after       | Specifies the pagination cursor for the next page of targets   | Query        | String     | FALSE    |

Treat the page cursor as an opaque value: obtain it through the next link relation. See [Pagination](/docs/reference/api-overview/#pagination)

###### Response Parameters


Array of Catalog Apps

If the role is not scoped to specific apps in the catalog, an empty array `[]` is returned.

###### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/catalog/apps"
```

###### Response Example


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

##### List App Targets for App Administrator Role given to a Group


<ApiOperation method="get" url="/api/v1/groups/${groupId}/roles/${roleId}/targets/catalog/apps" />

Lists all app targets for an `APP_ADMIN` role assigned to a group.

###### Request Parameters


| Parameter   | Description                                                    | Param Type   | DataType   | Required |
| :---------- | :------------------------------------------------------------- | :----------- | :--------- | :------- |
| groupId     | `id` of a group                                                | URL          | String     | TRUE     |
| roleId      | `id` of a role                                                 | URL          | String     | TRUE     |
| limit       | Specifies the number of results for a page (default is 20)     | Query        | Number     | FALSE    |
| after       | Specifies the pagination cursor for the next page of targets   | Query        | String     | FALSE    |

Treat the page cursor as an opaque value: obtain it through the next link relation. See [Pagination](/docs/reference/api-overview/#pagination)

###### Response Parameters


Array of Catalog Apps

If the role is not scoped to specific apps in the catalog, an empty array `[]` is returned.

###### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3/roles/IFIFAX2BIRGUSTQ/targets/catalog/apps"
```

###### Response Example


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
                    "href": "http://{yourOktaDomain}/assets/img/logos/facebook.e8215796628b5eaf687ba414ae245659.png",
                    "type": "image/png"
                }
            ],
            "self": {
                "href": "http://{yourOktaDomain}/api/v1/catalog/apps/facebook"
            }
        }
    },
    {
        "name": "24 Seven Office 0",
        "status": "ACTIVE",
        "id": "0oasrudLtMlzAsTxk0g3",
        "_links": {
            "self": {
                "href": "http://{yourOktaDomain}/api/v1/apps/0oasrudLtMlzAsTxk0g3"
            }
        }
    }
]
```

#### Add App Target to App Administrator Role

##### Add App Target to App Administrator Role given to a User


<ApiOperation method="put" url="/api/v1/users/${userId}/roles/${roleId}/targets/catalog/apps/${appName}" />

Adds an app target for an `APP_ADMIN` role assigned to a user.

Adding the first app target changes the scope of the role assignment from applying to all app targets to applying to the specified target.

Adding an app target will override any existing instance targets of the app. For example, if someone was assigned to administer a specific Facebook instance, calling this endpoint with `facebook` for `appName`, would make them administrator for all Facebook instances.

###### Request Parameters


| Parameter   | Description                                                  | Param Type   | DataType   | Required |
| :---------- | :----------------------------------------------------------- | :----------- | :--------- | :------- |
| userId      | `id` of a user                                               | URL          | String     | TRUE     |
| roleId      | `id` of a role                                               | URL          | String     | TRUE     |
| appName     | `name` of app target from catalog to scope role assignment   | URL          | String     | TRUE     |

###### Response Parameters


``` http
HTTP/1.1 204 No Content
```

###### Request Example


```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/catalog/apps/amazon_aws"
```

###### Response Example


``` http
HTTP/1.1 204 No Content
```

##### Add App Target to App Administrator Role given to a Group


<ApiOperation method="put" url="/api/v1/groups/${groupId}/roles/${roleId}/targets/catalog/apps/${appName}" />

Adds an app target for an `APP_ADMIN` role assigned to a group.

Adding the first app target changes the scope of the role assignment from applying to all app targets to applying to the specified target.

Adding an app target will override any existing instance targets of the app. For example, if someone was assigned to administer a specific Facebook instance, calling this endpoint with `facebook` for `appName`, would make them administrator for all Facebook instances.

###### Request Parameters


| Parameter   | Description                                                  | Param Type   | DataType   | Required |
| :---------- | :----------------------------------------------------------- | :----------- | :--------- | :------- |
| groupId     | `id` of a group                                              | URL          | String     | TRUE     |
| roleId      | `id` of a role                                               | URL          | String     | TRUE     |
| appName     | `name` of app target from catalog to scope role assignment   | URL          | String     | TRUE     |

###### Response Parameters


``` http
HTTP/1.1 204 No Content
```

###### Request Example


```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3/roles/IFIFAX2BIRGUSTQ/targets/catalog/apps/amazon_aws"
```

###### Response Example


``` http
HTTP/1.1 204 No Content
```

#### Add App Instance Target to App Administrator Role

##### Add App Instance Target to App Administrator Role given to a User


<ApiOperation method="put" url="/api/v1/users/${userId}/roles/${roleId}/targets/catalog/apps/${appName}/${appInstanceId}" />

Adds an app instance target for an `APP_ADMIN` role assigned to a user

Adding the first app or (app instance) target changes the scope of the role assignment from applying to all app targets to applying to the specified target.

App Targets and App Instance Targets cannot be mixed for the same app name. For example, you cannot specify that an administrator has access to manage Salesforce (the entire app type) and specific instances of the Salesforce app; it must be one or the other.

###### Request Parameters


| Parameter     | Description                                                  | Param Type   | DataType   | Required |
| :----------   | :----------------------------------------------------------- | :----------- | :--------- | :------- |
| userId        | `id` of a user                                               | URL          | String     | TRUE     |
| roleId        | `id` of a role                                               | URL          | String     | TRUE     |
| appName       | `name` of app target from catalog to scope role assignment   | URL          | String     | TRUE     |
| appInstanceId | `id` of the app instance target to scope role assignment     | URL          | String     | TRUE     |

###### Response Parameters


``` http
HTTP/1.1 204 No Content
```

###### Request Example


```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/catalog/apps/amazon_aws/0oasrudLtMlzAsTxk0g3"
```

###### Response Example


``` http
HTTP/1.1 204 No Content
```

##### Add App Instance Target to App Administrator Role given to a Group


<ApiOperation method="put" url="/api/v1/groups/${groupId}/roles/${roleId}/targets/catalog/apps/${appName}/${appInstanceId}" />

Adds an app instance target for an `APP_ADMIN` role assigned to a group

Adding the first app or (app instance) target changes the scope of the role assignment from applying to all app targets to applying to the specified target.

App Targets and App Instance Targets cannot be mixed for the same app name. For example, you cannot specify that an administrator has access to manage Salesforce (the entire app type) and specific instances of the Salesforce app; it must be one or the other.

###### Request Parameters


| Parameter         | Description                                                  | Param Type   | DataType   | Required |
| :---------------- | :----------------------------------------------------------- | :----------- | :--------- | :------- |
| groupId           | `id` of a group                                              | URL          | String     | TRUE     |
| roleId            | `id` of a role                                               | URL          | String     | TRUE     |
| appName           | `name` of app target from catalog to scope role assignment   | URL          | String     | TRUE     |
| appInstanceId     | `id` of the app instance target to scope role assignment     | URL          | String     | TRUE     |

###### Response Parameters


``` http
HTTP/1.1 204 No Content
```

###### Request Example


```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3/roles/IFIFAX2BIRGUSTQ/targets/catalog/apps/facebook/0oassqD8YkfwsJeV60g3"
```

###### Response Example


``` http
HTTP/1.1 204 No Content
```

#### Remove App Target from App Administrator Role

##### Remove App Target from App Administrator Role given to a User


<ApiOperation method="delete" url="/api/v1/users/${userId}/roles/${roleId}/targets/catalog/apps/${appName}" />

Removes an app target from an `APP_ADMIN` role assigned to a user

> **Note:** Don't remove the last app target from a role assignment, as this causes an exception.  If you need a role assignment that applies to all apps, the API consumer should delete the `APP_ADMIN` role assignment and recreate it.

###### Request Parameters


| Parameter   | Description                                | Param Type   | DataType   | Required |
| :---------- | :----------------------------------------- | :----------- | :--------- | :------- |
| userId      | `id` of a user                             | URL          | String     | TRUE     |
| roleId      | `id` of a role                             | URL          | String     | TRUE     |
| appName     | `name` of app target for role assignment   | URL          | String     | TRUE     |

###### Response Parameters


``` http
HTTP/1.1 204 No Content
```

###### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/catalog/apps/amazon_aws"
```

###### Response Example


``` http
HTTP/1.1 204 No Content
```

##### Remove App Target from App Administrator Role given to a Group


<ApiOperation method="delete" url="/api/v1/groups/${groupId}/roles/${roleId}/targets/catalog/apps/${appName}" />

Removes an app target from an `APP_ADMIN` role assigned to a group

> **Note:** Don't remove the last app target from a role assignment, as this causes an exception.  If you need a role assignment that applies to all apps, the API consumer should delete the `APP_ADMIN` role assignment and recreate it.

###### Request Parameters


| Parameter   | Description                                | Param Type   | DataType   | Required |
| :---------- | :----------------------------------------- | :----------- | :--------- | :------- |
| groupId     | `id` of a group                            | URL          | String     | TRUE     |
| roleId      | `id` of a role                             | URL          | String     | TRUE     |
| appName     | `name` of app target for role assignment   | URL          | String     | TRUE     |

###### Response Parameters


``` http
HTTP/1.1 204 No Content
```

###### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3/roles/IFIFAX2BIRGUSTQ/targets/catalog/apps/facebook"
```

###### Response Example


``` http
HTTP/1.1 204 No Content
```

#### Remove App Instance Target from App Administrator Role

##### Remove App Instance Target from App Administrator Role given to a User


<ApiOperation method="delete" url="/api/v1/users/${userId}/roles/${roleId}/targets/catalog/apps/${appName}/${appInstanceId}" />

Removes an app instance target from an `APP_ADMIN` role assigned to a user.

> **Note:** Don't remove the last app target from a role assignment, as this causes an exception.  If you need a role assignment that applies to all apps, the API consumer should delete the `APP_ADMIN` role assignment and recreate it.

###### Request Parameters


| Parameter     | Description                                         | Param Type   | DataType   | Required |
| :----------   | :-----------------------------------------          | :----------- | :--------- | :------- |
| userId        | `id` of a user                                      | URL          | String     | TRUE     |
| roleId        | `id` of a role                                      | URL          | String     | TRUE     |
| appName       | `name` of app target for role assignment            | URL          | String     | TRUE     |
| appInstanceId | `id` of the app instance target for role assignment | URL          | String     | TRUE     |

###### Response Parameters


``` http
HTTP/1.1 204 No Content
```

###### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/catalog/apps/amazon_aws"
```

###### Response Example


``` http
HTTP/1.1 204 No Content
```

##### Remove App Instance Target from App Administrator Role given to a Group


<ApiOperation method="delete" url="/api/v1/groups/${groupId}/roles/${roleId}/targets/catalog/apps/${appName}/${appInstanceId}" />

Removes an app instance target from an `APP_ADMIN` role assigned to a group.

> **Note:** Don't remove the last app target from a role assignment, as this causes an exception.  If you need a role assignment that applies to all apps, the API consumer should delete the `APP_ADMIN` role assignment and recreate it.

###### Request Parameters


| Parameter         | Description                                           | Param Type   | DataType   | Required |
| :---------------- | :---------------------------------------------------- | :----------- | :--------- | :------- |
| groupId           | `id` of a group                                       | URL          | String     | TRUE     |
| roleId            | `id` of a role                                        | URL          | String     | TRUE     |
| appName           | `name` of app target for role assignment              | URL          | String     | TRUE     |
| appInstanceId     | `id` of the app instance target for role assignment   | URL          | String     | TRUE     |

###### Response Parameters


``` http
HTTP/1.1 204 No Content
```

###### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups/00gsr2IepS8YhHRFf0g3/roles/IFIFAX2BIRGUSTQ/targets/catalog/apps/facebook/0oassqD8YkfwsJeV60g3"
```

###### Response Example


``` http
HTTP/1.1 204 No Content
```

## Role Model

### Examples

#### Sample Role Assigned to the User directly
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
            "href": "http://{yourOktaDomain}/api/v1/users/00ur32Vg0fvpyHZeQ0g3"
        }
    }
}
```

#### Sample Role Assigned to the User through a Group Membership
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
            "href": "http://{yourOktaDomain}/api/v1/groups/00g1ousb3XCr9Dkr20g4"
        }
    }
}
```

### Role Properties

The role model defines several **read-only** properties:

| Property         | Description                                             | DataType                                                                                                                                   | Nullable   | Unique   | Read Only |
| :--------------- | :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------                              | :--------- | :------- | :-------- |
| id               | Unique key for the role assignment                      | String                                                                                                                                     | FALSE      | TRUE     | TRUE      |
| label            | Display name of role                                    | String                                                                                                                                     | FALSE      | FALSE    | TRUE      |
| type             | Type of role                                            | `SUPER_ADMIN`, `ORG_ADMIN`, `APP_ADMIN`, `USER_ADMIN`, `HELP_DESK_ADMIN`, `READ_ONLY_ADMIN`, `MOBILE_ADMIN`, `API_ACCESS_MANAGEMENT_ADMIN`, `REPORT_ADMIN` | FALSE      | FALSE    | TRUE      |
| status           | Status of role assignment                               | `ACTIVE`                                                                                                                                   | FALSE      | FALSE    | TRUE      |
| assignmentType   | The type of assignment                                  | `USER`, `GROUP`                                                                                                                            | FALSE      | FALSE    | TRUE      |
| created          | Timestamp when app user was created                     | Date                                                                                                                                       | FALSE      | FALSE    | TRUE      |
| lastUpdated      | Timestamp when app user was last updated                | Date                                                                                                                                       | FALSE      | FALSE    | TRUE      |
| _embedded        | Embedded resources related to the role assignment       | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                                                                             | TRUE       | FALSE    | TRUE      |
| _links           | Discoverable resources related to the role assignment   | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                                                                             | TRUE       | FALSE    | TRUE      |

#### Role Types

Some roles support optional targets that constrain the role to a specific set of groups or apps.  If an optional target is not specified, then the role assignment is unbounded (e.g applies to all groups or apps).

Refer to the [product documentation](https://help.okta.com/en/prod/Content/Topics/Security/Administrators.htm?cshid=Security_Administrators#Security_Administrators) for a complete definition of permissions granted to each role.

| Role Type                     | Label                               | Optional Targets                      |
| :---------------------------- | :---------------------------------- | :------------------------------------ |
| `SUPER_ADMIN`                 | Super Administrator                 |                                       |
| `ORG_ADMIN`                   | Organizational Administrator        |                                       |
| `APP_ADMIN`                   | Application Administrator           | Apps                                  |
| `USER_ADMIN`                  | Group Administrator                 | [Groups](/docs/reference/api/groups/) |
| `HELP_DESK_ADMIN`             | Help-Desk Administrator             | [Groups](/docs/reference/api/groups/) |
| `READ_ONLY_ADMIN`             | Read-only Administrator             |                                       |
| `MOBILE_ADMIN`                | Mobile Administrator                |                                       |
| `API_ACCESS_MANAGEMENT_ADMIN` | API Access Management Administrator |                                       |
| `REPORT_ADMIN`                | Report Administrator                |                                       |

`API_ACCESS MANAGEMENT_ADMIN` is available if the API Access Management feature be enabled. For a description of what the role can do, see [API Access Management Best Practices](/docs/concepts/api-access-management/#recommended-practices-for-api-access-management).

#### Assignment Types

A role could either be assigned to the user directly or be assigned to a group, of which the user is a member. The `assignee` in `_links` provides more details about the user or the group to which the assignment was made.

| Assignment Type     | Description                                                        |
| :------------------ | :----------------------------------------------------------------- |
| `USER`              | Role was assigned to the user directly                             |
| `GROUP`             | Role was assigned to an admin group, of which the user is a member |
