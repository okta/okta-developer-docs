---
title: Linked Objects
category: management
meta:
  - name: description
    content: Users have relationships to each other, such as managers and reporting employees. With the Linked Objects API, you can create up to 200 linked object definitions.
---

# Linked Objects API

Users have relationships to each other, like manager and subordinate or customer and sales representative. You can create users with relationships by using the Linked Objects API to represent the relationship.

1. Create a Linked Object definition such as Manager:Subordinate or Case Worker:Client. These pairs are represented by a `primary` attribute and an `associated` attribute.
2. Link users together to create the relationship between the two. You create a Linked Object value with a single request that links one `primary` and one `associated` user.

For each relationship:

* A user has at most one `primary` link (a user has a single manager), but can have many `associated` links (a user can have many subordinates).
* A user can be the `primary` in one relationship and the `associated` in another.
* A user can be both the `primary` and `associated` in the same relationship.

For details, see the [Linked Object object](#linked-object-object).

The Expression Language function for [Linked Objects](/docs/reference/okta-expression-language/#linked-object-function) provides access to the details about a linked user.

> **Note:** The Linked Objects feature isn't available for OpenID Connect claims.

## Example usage

Okta allows you to create up to 200 Linked Object definitions. These definitions are one-to-many, for example:

* A manager has many subordinates. Each subordinate has one manager.
* A sales representative has many customers. Each customer has one sales rep.
* A case worker has many clients. Each client has one case worker.

Most organizations have more than one manager or sales representative. You can create the Linked Object definition once, and then assign the `primary` relationship to as many users as you have people in that relationship.

You can assign the `associated` relationship for a single `primary` user to as many users as needed. The `associated` user can be related to only one `primary` per Linked Object definition. But a user can be assigned to more than one Linked Object definition.

For example, assume that you've created one Linked Object definition for manager (`primary`) and for subordinates (`associated`):

* Joe is Frank's manager.
* Bob is Joe's manager, but Jane's subordinate.
* Jane is the CEO, so she reports to herself.

Thus, you can create chains of relationships (Jane > Bob > Joe > Frank) or terminal relationships (Jane is both `primary` and `associated` user).

Then, if you create another Linked Object relationship for scrum team membership, you could assign relationships to the same four users:

* Bob is the scrum master for the Identity Scrum team.
* Joe and Frank are both contributors to the team.

Bob can be the `primary` for a Manager:Subordinate, an `associated` user for that same Linked Object definition, and also the `primary` for the Scrummaster:Contributor Linked Object definition.

To represent a relationship, create a Linked Object definition that specifies a `primary` (parent) relationship and an `associated` (child) relationship, and then add a link in which the appropriate user is assigned to each side of that link type.

## Links between User Types

If you created multiple User Types (see [User Types](/docs/reference/api/user-types)), they all share the same Linked Object definitions. For example, if you have separate User Types for employees and contractors, a link could designate an employee as the manager for a contractor, with the contractor being a subordinate of that employee.

## Getting started

Explore the Linked Objects API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/3ab2cf3f197337119d34)

## Link definition operations

Link definition operations allow you to manage the creation and removal of the link definitions. If you remove a link definition, links based on that definition are unavailable.

> **Note:** Links reappear if you recreate the definition. However, Okta is likely to change this behavior so that links don't reappear. Don't rely on this behavior in production environments.

Each org can create up to 200 definitions and assign them to an unlimited number of users.

### Add Linked Object definition to User Profile schema

<ApiOperation method="post" url="/api/v1/meta/schemas/user/linkedObjects" />

Adds a Linked Object definition to the User Profile schema. The `name` field found in both the `primary` and `associated` objects can't start with a number and can only contain the following characters: `a-z`, `A-Z`, `0-9`, and `_`.

##### Request parameters


| Parameter      | Description                                | Param Type        | DataType                              | Required      |
| :------------- | :--------------                            | :---------------- | :-----------                          | :------------ |
| linkedObject   | The Linked Object definition being created | Body              | [Linked Object](#linked-object-object) | TRUE          |

##### Response parameters


[Linked Object object](#linked-object-object)

##### Request example


```bash
curl -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "primary": {
    "name": "manager",
    "title": "Manager",
    "description": "Manager link property",
    "type": "USER"
  },
  "associated": {
    "name": "subordinate",
    "title": "Subordinate",
    "description": "Subordinate link property",
    "type": "USER"
  }
}' "https://${yourOktaDomain}/api/v1/meta/schemas/user/linkedObjects"
```

##### Response example


```bash
HTTP/1.1 201 Created
{
    "primary": {
        "name": "manager",
        "title": "Manager",
        "description": "Manager link property",
        "type": "USER"
    },
    "associated": {
        "name": "subordinate",
        "title": "Subordinate",
        "description": "Subordinate link property",
        "type": "USER"
    },
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/meta/schemas/user/linkedObjects/manager"
        }
    }
}
```

### Get a Linked Object definition by name

<ApiOperation method="get" url="/api/v1/meta/schemas/user/linkedObjects/${name}" />

Gets a single Linked Object definition

You can specify either the `primary` name or the `associated` name.

##### Request parameters


| Parameter      | Description                                                 | DataType          | Required       |
| :------------- | :----------------                                           | :---------------- | :------------- |
| name           | The case sensitive API name of the definition that you want returned | String            | TRUE           |

##### Response parameters


[Linked Object object](#linked-object-object)

##### Request example


```bash
curl -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/meta/schemas/user/linkedObjects/manager"
```

##### Response example


```json
HTTP/1.1 200 OK

{
    "primary": {
        "name": "manager",
        "title": "Manager",
        "description": "Manager link property",
        "type": "USER"
    },
    "associated": {
        "name": "subordinate",
        "title": "Subordinate",
        "description": "Subordinate link property",
        "type": "USER"
    },
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/meta/schemas/user/linkedObjects/manager"
        }
    }
}
```

> **Note:** Regardless of whether you specify the `primary` or `associated` name in the request, the resulting `self` link contains the `primary`.

### Get all Linked Object definitions


<ApiOperation method="get" url="/api/v1/meta/schemas/user/linkedObjects" />

Gets all of the Linked Object definitions for an org

##### Request parameters


None

##### Response parameters


Array of [Linked Object object](#linked-object-object)

##### Request example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/meta/schemas/user/linkedObjects"
```

##### Response example


```json
[
    {
        "primary": {
            "name": "manager",
            "title": "Manager",
            "description": "Manager link property",
            "type": "USER"
        },
        "associated": {
            "name": "subordinate",
            "title": "Subordinate",
            "description": "Subordinate link property",
            "type": "USER"
        },
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/meta/schemas/user/linkedObjects/manager"
            }
        }
    },
    {
        "primary": {
            "name": "mother",
            "title": "Mother",
            "description": "Mother",
            "type": "USER"
        },
        "associated": {
            "name": "child",
            "title": "Child",
            "description": "Child",
            "type": "USER"
        },
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/meta/schemas/user/linkedObjects/mother"
            }
        }
    }
]
```

### Remove Linked Object definition


<ApiOperation method="delete" url="/api/v1/meta/schemas/user/linkedObjects/${name}" />

Removes the Linked Object definition specified by either the `primary` or `associated` name. The entire definition is removed, regardless of which name that you specify.

##### Request parameters


| Parameter        | Description                | DataType       | Required      |
| :--------------- | :-----------------         | :------------- | :------------ |
| name             | Primary or associated name | String         | TRUE          |

##### Response parameters


None

##### Request example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/meta/schemas/user/linkedObjects/mother"
```

##### Response example


```http
HTTP/1.1 204 No Content
```

### Deprecated operations

An earlier version of this API included the element `/default/linkedObjects` rather than just `/linkedObjects` in all of the URLs for operations on Linked Object definitions. These earlier endpoints are still supported but are deprecated. As described under [Links between User Types](#links-between-user-types), all Linked Object definitions apply to all User Types, not just to the default type. That is true for the deprecated operations as well. They affect all User Types, just like the corresponding endpoints that omit `/default`.

## Link value operations

Use link value operations to assign users to a relationship (a pair of `primary` and `associated` links).

For the following operations, the examples use consistent IDs so that you can follow the operations more easily:

* `manager` is the `primary` relationship and is assigned to `00u5t60iloOHN9pBi0h7`
* `subordinate` is the `associated` relationship and is assigned to `00u5zex6ztMbOZhF50h7`

### Set Linked Object value for primary


<ApiOperation method="put" url="/api/v1/users/${associated.userId}/linkedObjects/${primary.name}/${primary.userId}" />

Sets the first user as the `associated` and the second user as the `primary` for the specified relationship. If the first user is already associated with a different `primary` for this relationship, the previous link is removed. A Linked Object relationship can specify only one primary user for an associated user.

##### Request parameters


| Parameter         | Description                                                                                  | DataType          | Required      |
| :---------------  | :-----------------                                                                           | :---------------- | :------------ |
| associated.userId | User ID or `login` value of the user to be assigned the `associated` relationship                | String            | TRUE          |
| primary.name      | Name of the `primary` relationship being assigned                                            | String            | TRUE          |
| primary.userId    | User ID to be assigned to `primary` for the `associated` user in the specified relationship | String            | TRUE          |

##### Response parameters


None

##### Request example


```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/${associated.userId}/linkedObjects/${primary.name}/${primary.userId}"
```

##### Response example


```http
HTTP/1.1 204 No Content
```

### Get primary Linked Object value


<ApiOperation method="get" url="/api/v1/users/${id}/linkedObjects/${primary.name}" />

For the user specified by ID, returns the `self` link for the `primary` user in the relationship specified by `primary.name`. If the user specified isn't the `associated` user in any relationship, an empty array is returned.

Use `me` instead of `id` to specify the current session user.

##### Request parameters


| Parameter        | Description                                                                                                       | DataType          | Required      |
| :--------------- | :-----------------                                                                                                | :---------------- | :------------ |
| id               | ID of the user for whom you want to get the `primary` user ID. Can be `me` to represent the current session user. | String            | TRUE          |
| primary.name     | Name of the `primary` relationship being queried                                                                  | String            | TRUE          |

##### Response parameters


Array that contains a link to the `primary` user or an empty array if the specified user isn't yet associated with a `primary` user.

##### Request example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u5zex6ztMbOZhF50h7/linkedObjects/manager"
```

##### Response example


```bash
[
    {
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/users/00u5t60iloOHN9pBi0h7"
            }
        }
    }
]
```

### Get associated Linked Object values


<ApiOperation method="get" url="/api/v1/users/${id}/linkedObjects/${associated.name}" />

For the specified user, gets an array of users who are `associated` for the specified relationship. If the specified user isn't assigned a `primary` relationship, an empty array is returned.

Use `me` instead of `id` to specify the current session user.

##### Request parameters


| Parameter        | Description                                                                                                           | DataType          | Required      |
| :--------------- | :-----------------                                                                                                    | :---------------- | :------------ |
| id               | ID of the user for whom you want to get the `associated` user IDs. Can be `me` to represent the current session user. | String            | TRUE          |

##### Response parameters


Links to all users that are associated with the specified `primary` user for the specified `associated` relationship

##### Request example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u5t60iloOHN9pBi0h7/linkedObjects/subordinate"
```

##### Response example


```bash
[
    {
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/users/00u5zex6ztMbOZhF50h7"
            }
        }
    }
]
```

### Delete Linked Object value


 <ApiOperation method="delete" url="/api/v1/users/${id}/linkedObjects/${primary.name}" />

For the `associated` user specified by ID and the relationship specified by `primary` name, deletes any existing relationship between the `associated` and `primary` user

##### Request parameters


| Parameter        | Description                                                                                                                                                                | DataType          | Required      |
| :--------------- | :-----------------                                                                                                                                                         | :---------------- | :------------ |
| id               | ID of the user in the `associated` relationship for the specified primary name. Can be `me` to represent the current session user.                                         | String            | TRUE          |
| primary.name     | The name of the `primary` relationship associated with the specified `associated` user. The relationship between these two users is the Linked Object value being deleted. | String            | TRUE          |

An HTTP 204 message is returned:

* If the relationship is deleted
* If the specified user isn't in the `associated` relationship for any instance of the specified `primary` and thus no relationship is found

An HTTP 404 is returned if no Linked Object definition exists with the specified `primary.name`.

##### Response parameters


None

##### Request example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00u5t60iloOHN9pBi0h7/linkedObjects/manager"
```

##### Response example


```http
HTTP/1.1 204 No Content
```

## Linked Object object

The following object contains example values for each attribute.

```bash
{
    "primary": {
        "name": "manager",
        "title": "Manager",
        "description": "Manager link property",
        "type": "USER"
    },
    "associated": {
        "name": "subordinate",
        "title": "Subordinate",
        "description": "Subordinate link property",
        "type": "USER"
    },
    "_links": {
          "self": {
               "href": "https://${yourOktaDomain}/api/v1/meta/schemas/user/linkedObjects/manager"
          }
    }
}
```

### Linked Object properties

| Parameter              | Description                                                             | DataType              | Required      |
| :---------------       | :-----------------                                                      | :-------------------- | :------------ |
| primary.name           | API name of the `primary` link                                          | String                | TRUE          |
| primary.title          | Display name of the `primary` link                                      | String                | TRUE          |
| primary.description    | Description of the `primary` relationship                               | String                | FALSE         |
| primary.type           | The object type for this `primary` link. Valid value: `USER`            | Enum                  | TRUE          |
| associated.name        | API name of the `associated` link                                       | String                | TRUE          |
| associated.title       | Display name of the `associated` link                                   | String                | TRUE          |
| associated.description | Description of the `associated` relationship                            | String                | FALSE         |
| associated.type        | The object type for this `associated` relationship. Valid value: `USER` | Enum                  | TRUE          |

> **Note:** The `primary.type` and `associated.type` are created as Enums to allow Okta to add more object types in the future. This isn't a guarantee that Okta will do so.
