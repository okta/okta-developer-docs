---
title: Administrator Roles
category: management
meta:
  - name: description
    content: The Okta Administrator Roles API provides operations to manage administrative role assignments for a user. Read this page to get started with Admin Roles.
---

# Administrator Roles API

The Okta Administrator Roles API provides operations to manage administrative role assignments for a User.

## Get started

Explore the Administrator Roles API:  [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/4f1233beeef282acbcfb)

## Role assignment operations

#### Grant third-party admin status to a User

<ApiOperation method="post" url="/api/v1/users/${userId}/roles?disableNotifications=true" />

#### Grant third-party admin status to a Group

<ApiOperation method="post" url="/api/v1/groups/${groupId}/roles?disableNotifications=true" />

You can grant third-party admin status by using an optional query parameter on the Administrator Roles API called `disableNotifications`.

You're able to grant third-party admin status when you assign a new role, or you can update an existing role assignment status by passing just the query parameter.

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

## Role target operations

Role targets are a way of defining permissions for admin roles into a smaller subset of Groups or Apps within your org. Targets limit an admin's permissions to a targeted area of the org. You can define admin roles to target Groups, Applications, and Application Instances.

* **Group targets:** Grant an admin permission to manage only a specified Group. For example, an admin role may be assigned to manage only the IT Group.
* **App targets:** Grant an admin permission to manage all instances of specified Apps. Target Apps are Okta catalog Apps. For example, there can be multiple configurations of an Okta catalog App, such as Salesforce or Facebook. When you add a Salesforce or Facebook App as a target, that grants the admin permission to manage all instances of those Apps and create new instances of them.
* **App Instance targets:** Grant an admin permission to manage an instance of one App or instances of multiple Apps. App Instances are specific Apps that admins have created in their org. For example, there may be a Salesforce App configured differently for each sales region of a company. When you create an App Instance target, an admin may be assigned to manage only two instances of the configured Salesforce Apps and perhaps assigned to manage an instance of another configured App, such as Workday.

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

#### Role types

Some Roles support optional targets that constrain the Role to a specific set of Groups or Apps. If an optional target isn't specified, then the role assignment is unbounded (for example, applies to all Groups or Apps).

Refer to the [product documentation](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Security_Administrators) for a complete definition of permissions granted to each Role.

| Role type                     | Label                               | Optional targets                      |
| :---------------------------- | :---------------------------------- | :------------------------------------ |
| `API_ACCESS_MANAGEMENT_ADMIN` | API Access Management Administrator |                                       |
| `APP_ADMIN`                   | Application Administrator           | Apps                                  |
| `GROUP_MEMBERSHIP_ADMIN`      | Group Membership Administrator      | [Groups](/docs/reference/api/groups/)|
| `HELP_DESK_ADMIN`             | Help Desk Administrator             | [Groups](/docs/reference/api/groups/) |
| `MOBILE_ADMIN`                | Mobile Administrator                |                                       |
| `ORG_ADMIN`                   | Organizational Administrator        |                                       |
| `READ_ONLY_ADMIN`             | Read-Only Administrator             |                                       |
| `REPORT_ADMIN`                | Report Administrator                |                                       |
| `SUPER_ADMIN`                 | Super Administrator                 |                                       |
| `USER_ADMIN`                  | Group Administrator                 | [Groups](/docs/reference/api/groups/) |

`API_ACCESS MANAGEMENT_ADMIN` is available if the API Access Management feature is enabled. For a description of what the Role can do, see [API Access Management Best Practices](/docs/concepts/api-access-management/#recommended-practices-for-api-access-management).

#### Assignment types

A Role could either be assigned to the User directly or be assigned to a Group of which the user is a member. The `assignee` in `_links` provides more details about the User or the Group to which the assignment was made.

| Assignment type     | Description                                                        |
| :------------------ | :----------------------------------------------------------------- |
| `GROUP`             | Role was assigned to an admin Group of which the User is a member |
| `USER`              | Role was assigned to the User directly                             |
