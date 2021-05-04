---
title: Groups
category: management
---

# Groups API

The Okta Groups API provides operations to manage Okta Groups and their user members for your organization.

## Get started with the Groups API

Explore the Groups API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5dbb338ac908fb32035c)

## Group operations

### Add Group

<ApiOperation method="post" url="/api/v1/groups" />

Adds a new Group with `OKTA_GROUP` type to your organization

> **Note:** Application import operations are responsible for syncing Groups with `APP_GROUP` type such as Active Directory Groups. See [Importing Groups into Okta](https://help.okta.com/en/prod/okta_help_CSH.htm#Directory_Groups) for more information.

##### Request parameters


| Parameter | Description                               | ParamType | DataType                          | Required | Default |
| --------- | ----------------------------------------- | --------- | --------------------------------- | -------- | ---     |
| Profile   | `okta:user_group` Profile for a new Group | Body      | [Profile-object](#profile-object) | TRUE     |         |

##### Response parameters

The created [Group](#group-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "name": "West Coast Users",
    "description": "All Users West of The Rockies"
  }
}' "https://${yourOktaDomain}/api/v1/groups"
```

##### Response example

```json
{
  "id": "00g1emaKYZTWRYYRRTSK",
  "created": "2015-02-06T10:11:28.000Z",
  "lastUpdated": "2015-10-05T19:16:43.000Z",
  "lastMembershipUpdated": "2015-11-28T19:15:32.000Z",
  "objectClass": [
    "okta:user_group"
  ],
  "type": "OKTA_GROUP",
  "profile": {
    "name": "West Coast Users",
    "description": "All Users West of The Rockies"
  },
  "_links": {
    "logo": [
      {
        "name": "medium",
        "href": "https://${yourOktaDomain}/img/logos/groups/okta-medium.png",
        "type": "image/png"
      },
      {
        "name": "large",
        "href": "https://${yourOktaDomain}/img/logos/groups/okta-large.png",
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
```

### Get Group

<ApiOperation method="get" url="/api/v1/groups/${groupId}" />

Fetches a specific Group by `id` from your organization

##### Request parameters


| Parameter | Description     | ParamType | DataType | Required | Default |
| --------- | --------------- | --------- | -------- | -------- | ------- |
| id        | `id` of a Group | URL       | String   | TRUE     |         |

##### Response parameters


Fetched [Group](#group-object)

##### Request example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups/00g1emaKYZTWRYYRRTSK"
```

##### Response example


```json
{
  "id": "00g1emaKYZTWRYYRRTSK",
  "created": "2015-02-06T10:11:28.000Z",
  "lastUpdated": "2015-10-05T19:16:43.000Z",
  "lastMembershipUpdated": "2015-11-28T19:15:32.000Z",
  "objectClass": [
    "okta:user_group"
  ],
  "type": "OKTA_GROUP",
  "profile": {
    "name": "West Coast Users",
    "description": "All Users West of The Rockies"
  },
  "_links": {
    "logo": [
      {
        "name": "medium",
        "href": "https://${yourOktaDomain}/img/logos/groups/okta-medium.png",
        "type": "image/png"
      },
      {
        "name": "large",
        "href": "https://${yourOktaDomain}/img/logos/groups/okta-large.png",
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
```

### List Groups

<ApiOperation method="get" url="/api/v1/groups" />

Enumerates Groups in your organization with pagination. A subset of Groups can be returned that match a supported filter expression or query.

- [List Groups with defaults](#list-groups-with-defaults)
- [Find Groups](#find-groups)
- [List Groups with type](#list-groups-with-type)
- [List Groups with Profile updated after timestamp](#list-groups-with-profile-updated-after-timestamp)
- [List Groups with membership updated after timestamp](#list-groups-with-membership-updated-after-timestamp)
- [List Groups updated after timestamp](#list-groups-updated-after-timestamp)
- [List Groups with Search](#list-groups-with-search)

##### Request parameters


| Parameter | Description                                                                                | ParamType | DataType | Required | Default |
| --------- | ------------------------------------------------------------------------------------------ | --------- | -------- | -------- | ------- |
| after     | Specifies the pagination cursor for the next page of Groups                                | Query     | String   | FALSE    |         |
| filter    | [Filter expression](/docs/reference/api-overview/#filtering) for Groups      | Query     | String   | FALSE    |         |
| limit     | Specifies the number of Group results in a page                                            | Query     | Number   | FALSE    | 10000   |
| q         | Finds a group that matches the `name` property                                               | Query     | String   | FALSE    |         |
| expand        | If specified, it causes additional metadata to be included in the response. Possible values are `stats` and/or `app`.                                             | Query     | String   | FALSE    |         |
| search <ApiLifecycle access="ea" /> | Searches for groups with a supported [filtering](/docs/reference/api-overview/#filtering) expression for all [attributes](#group-attributes) except for `_embedded`, `_links`, and `objectClass`  | Query     | String   | FALSE    |         |

> **Notes:** The `after` cursor should be treated as an opaque value and obtained through the next link relation. See [Pagination](/docs/reference/api-overview/#pagination).<br><br>
Search currently performs a `startsWith` match but it should be considered an implementation detail and may change without notice in the future.

###### Filters

The following expressions are supported for Groups with the `filter` query parameter:

| Filter                                                  | Description                                                         |
| ----------------------------------------------          | ------------------------------------------------------------------- |
| `id eq "00g1emaKYZTWRYYRRTSK"`                          | Group with a specified `id`                                         |
| `lastMembershipUpdated eq "yyyy-MM-dd'T'HH:mm:ss.SSSZ"` | Groups with memberships last updated at a specific timestamp        |
| `lastMembershipUpdated gt "yyyy-MM-dd'T'HH:mm:ss.SSSZ"` | Groups with memberships last updated after a specific timestamp     |
| `lastMembershipUpdated lt "yyyy-MM-dd'T'HH:mm:ss.SSSZ"` | Groups with memberships last updated before a specific timestamp    |
| `lastUpdated eq "yyyy-MM-dd'T'HH:mm:ss.SSSZ"`           | Groups with Profile last updated at a specific timestamp            |
| `lastUpdated gt "yyyy-MM-dd'T'HH:mm:ss.SSSZ"`           | Groups with Profile last updated after a specific timestamp         |
| `lastUpdated lt "yyyy-MM-dd'T'HH:mm:ss.SSSZ"`           | Groups with Profile last updated before a specific timestamp        |
| `type eq "APP_GROUP"`                                   | Groups that have a `type` of `APP_GROUP`                            |
| `type eq "BUILT_IN"`                                    | Groups that have a `type` of `BUILT_IN`                             |
| `type eq "OKTA_GROUP"`                                  | Groups that have a `type` of `OKTA_GROUP`                           |

See [Filtering](/docs/reference/api-overview/#filtering) for more information on expressions.

> **Note:** All filters must be [URL encoded](http://en.wikipedia.org/wiki/Percent-encoding) where `filter=lastUpdated gt "2013-06-01T00:00:00.000Z"` is encoded as `filter=lastUpdated%20gt%20%222013-06-01T00:00:00.000Z%22`.

**Filter examples**

Groups with type of `OKTA_GROUP`

    filter=type eq "OKTA_GROUP"

Okta Groups with Profile updated after 11/11/2015

    filter=type eq "OKTA_GROUP" and lastUpdated gt "2016-11-11T00:00:00.000Z"

Okta Groups with memberships updated after 11/11/2015

    filter=type eq "OKTA_GROUP" and lastMembershipUpdated gt "2016-11-11T00:00:00.000Z"

Okta Groups with Profile or memberships updated after 11/11/2015

    filter=type eq "OKTA_GROUP" and (lastUpdated gt "2015-11-11T00:00:00.000Z" or lastMembershipUpdated gt "2015-11-11T00:00:00.000Z")


##### Response parameters


Array of [Groups](#group-object)

#### List Groups with defaults

Enumerates all Groups in your organization

Reminders about the `limit` query parameter and query timeouts:

* If you don't specify a value for `limit` and don't specify a query, only 200 results are returned for most orgs.
* If you don't specify any value for `limit` and do specify a query, a maximum of 10 results are returned.
* The maximum value for `limit` is 200 for most orgs.
* Don't write code that depends on the default or maximum value, as it may change.
* If you receive an HTTP 500 status code, you more than likely have exceeded the request timeout. Retry your request with a smaller `limit` and [page the results](/docs/reference/api-overview/#pagination).

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups?limit=200"
```

##### Response example

> **Note:** The `source` section and the `source` link in the response example below are only present in groups of type `APP_GROUP`. See [Group attributes](#group-attributes) and [Links object](#links-object).

```json
[
  {
    "id": "00g1emaKYZTWRYYRRTSK",
    "created": "2015-02-06T10:11:28.000Z",
    "lastUpdated": "2015-10-05T19:16:43.000Z",
    "lastMembershipUpdated": "2015-11-28T19:15:32.000Z",
    "objectClass": [
      "okta:user_group"
    ],
    "type": "OKTA_GROUP",
    "profile": {
      "name": "West Coast Users",
      "description": "All Users West of The Rockies"
    },
    "_links": {
      "logo": [
        {
          "name": "medium",
          "href": "https://${yourOktaDomain}/img/logos/groups/okta-medium.png",
          "type": "image/png"
        },
        {
          "name": "large",
          "href": "https://${yourOktaDomain}/img/logos/groups/okta-large.png",
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
  },
  {
    "id": "00garwpuyxHaWOkdV0g4",
    "created": "2015-08-15T19:15:17.000Z",
    "lastUpdated": "2015-11-18T04:02:19.000Z",
    "lastMembershipUpdated": "2015-08-15T19:15:17.000Z",
    "objectClass": [
      "okta:windows_security_principal"
    ],
    "type": "APP_GROUP",
    "profile": {
      "name": "Engineering Users",
      "description": "corp.example.com/Engineering/Engineering Users",
      "groupType": "Security",
      "samAccountName": "Engineering Users",
      "objectSid": "S-1-5-21-717838489-685202119-709183397-1177",
      "groupScope": "Global",
      "dn": "CN=Engineering Users,OU=Engineering,DC=corp,DC=example,DC=com",
      "windowsDomainQualifiedName": "CORP\\Engineering Users",
      "externalId": "OZJdWdONCU6h7WjQKp+LPA=="
    },
    "source": {
      "id": "0oa2v0el0gP90aqjJ0g7"
    },
    "_links": {
      "logo": [
        {
          "name": "medium",
          "href": "https://${yourOktaDomain}/img/logos/groups/active_directory-medium.png",
          "type": "image/png"
        },
        {
          "name": "large",
          "href": "https://${yourOktaDomain}/img/logos/groups/active_directory-large.png",
          "type": "image/png"
        }
      ],
      "source": {
        "href": "https://${yourOktaDomain}/api/v1/apps/0oa2v0el0gP90aqjJ0g7"
      },
      "users": {
        "href": "https://${yourOktaDomain}/api/v1/groups/00garwpuyxHaWOkdV0g4/users"
      },
      "apps": {
        "href": "https://${yourOktaDomain}/api/v1/groups/00garwpuyxHaWOkdV0g4/apps"
      }
    }
  }
]
```

#### Find Groups

Finds groups by `name` in your organization

> **Note:** Paging and searching are currently mutually exclusive. You can't page a query. The default limit for a query is `300` results. Query is intended for an auto-complete picker use case where users refine their search string to constrain the results. Search currently performs a `startsWith` match but it should be considered an implementation detail and may change without notice in the future. Exact matches are always returned before partial matches.

##### Request example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups?q=West&limit=10"
```

##### Response example


```json
[
  {
    "id": "00g1emaKYZTWRYYRRTSK",
    "created": "2015-02-06T10:11:28.000Z",
    "lastUpdated": "2015-10-05T19:16:43.000Z",
    "lastMembershipUpdated": "2015-11-28T19:15:32.000Z",
    "objectClass": [
      "okta:user_group"
    ],
    "type": "OKTA_GROUP",
    "profile": {
      "name": "West Coast Users",
      "description": "All Users West of The Rockies"
    },
    "_links": {
      "logo": [
        {
          "name": "medium",
          "href": "https://${yourOktaDomain}/img/logos/groups/okta-medium.png",
          "type": "image/png"
        },
        {
          "name": "large",
          "href": "https://${yourOktaDomain}/img/logos/groups/okta-large.png",
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

#### List Groups with type

Enumerates all Groups with a [specific type](#group-type)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups?filter=type+eq+\"OKTA_GROUP\"&limit=200"
```

##### Response example


```json
[
  {
    "id": "00g1emaKYZTWRYYRRTSK",
    "created": "2015-02-06T10:11:28.000Z",
    "lastUpdated": "2015-10-05T19:16:43.000Z",
    "lastMembershipUpdated": "2015-11-28T19:15:32.000Z",
    "objectClass": [
      "okta:user_group"
    ],
    "type": "OKTA_GROUP",
    "profile": {
      "name": "West Coast Users",
      "description": "All Users West of The Rockies"
    },
    "_links": {
      "logo": [
        {
          "name": "medium",
          "href": "https://${yourOktaDomain}/img/logos/groups/okta-medium.png",
          "type": "image/png"
        },
        {
          "name": "large",
          "href": "https://${yourOktaDomain}/img/logos/groups/okta-large.png",
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
  },
  {
    "id": "00gak46y5hydV6NdM0g4",
    "created": "2015-07-22T08:45:03.000Z",
    "lastUpdated": "2015-07-22T08:45:03.000Z",
    "lastMembershipUpdated": "2015-10-22T08:45:03.000Z",
    "objectClass": [
      "okta:user_group"
    ],
    "type": "OKTA_GROUP",
    "profile": {
      "name": "Squabble of Users",
      "description": "Keep Calm and Single Sign-On"
    },
    "_links": {
      "logo": [
        {
          "name": "medium",
          "href": "https://${yourOktaDomain}/img/logos/groups/okta-medium.png",
          "type": "image/png"
        },
        {
          "name": "large",
          "href": "https://${yourOktaDomain}/img/logos/groups/okta-large.png",
          "type": "image/png"
        }
      ],
      "users": {
        "href": "https://${yourOktaDomain}/api/v1/groups/00gak46y5hydV6NdM0g4/users"
      },
      "apps": {
        "href": "https://${yourOktaDomain}/api/v1/groups/00gak46y5hydV6NdM0g4/apps"
      }
    }
  }
]
```

#### List Groups with Profile updated after timestamp

Enumerates all Groups with a Profile updated after the specified timestamp

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups?filter=lastUpdated+gt+\"2015-10-01T00:00:00.000Z\"&limit=200"
```

##### Response example

```json
[
  {
    "id": "00g1emaKYZTWRYYRRTSK",
    "created": "2015-02-06T10:11:28.000Z",
    "lastUpdated": "2015-10-05T19:16:43.000Z",
    "lastMembershipUpdated": "2015-11-28T19:15:32.000Z",
    "objectClass": [
      "okta:user_group"
    ],
    "type": "OKTA_GROUP",
    "profile": {
      "name": "West Coast Users",
      "description": "All Users West of The Rockies"
    },
    "_links": {
      "logo": [
        {
          "name": "medium",
          "href": "https://${yourOktaDomain}/img/logos/groups/okta-medium.png",
          "type": "image/png"
        },
        {
          "name": "large",
          "href": "https://${yourOktaDomain}/img/logos/groups/okta-large.png",
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

#### List Groups with membership updated after timestamp

Enumerates all Groups with user memberships updated after the specified timestamp

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups?filter=lastMembershipUpdated+gt+\"2015-10-01T00:00:00.000Z\"&limit=200"
```

##### Response example

```json
[
  {
    "id": "00g1emaKYZTWRYYRRTSK",
    "created": "2015-02-06T10:11:28.000Z",
    "lastUpdated": "2015-10-05T19:16:43.000Z",
    "lastMembershipUpdated": "2015-11-28T19:15:32.000Z",
    "objectClass": [
      "okta:user_group"
    ],
    "type": "OKTA_GROUP",
    "profile": {
      "name": "West Coast Users",
      "description": "All Users West of The Rockies"
    },
    "_links": {
      "logo": [
        {
          "name": "medium",
          "href": "https://${yourOktaDomain}/img/logos/groups/okta-medium.png",
          "type": "image/png"
        },
        {
          "name": "large",
          "href": "https://${yourOktaDomain}/img/logos/groups/okta-large.png",
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
  },
  {
    "id": "00gak46y5hydV6NdM0g4",
    "created": "2015-07-22T08:45:03.000Z",
    "lastUpdated": "2015-07-22T08:45:03.000Z",
    "lastMembershipUpdated": "2015-10-22T08:45:03.000Z",
    "objectClass": [
      "okta:user_group"
    ],
    "type": "OKTA_GROUP",
    "profile": {
      "name": "Squabble of Users",
      "description": "Keep Calm and Single Sign-On"
    },
    "_links": {
      "logo": [
        {
          "name": "medium",
          "href": "https://${yourOktaDomain}/img/logos/groups/okta-medium.png",
          "type": "image/png"
        },
        {
          "name": "large",
          "href": "https://${yourOktaDomain}/img/logos/groups/okta-large.png",
          "type": "image/png"
        }
      ],
      "users": {
        "href": "https://${yourOktaDomain}/api/v1/groups/00gak46y5hydV6NdM0g4/users"
      },
      "apps": {
        "href": "https://${yourOktaDomain}/api/v1/groups/00gak46y5hydV6NdM0g4/apps"
      }
    }
  }
]
```

#### List Groups updated after timestamp

Enumerates all Groups with Profile or user memberships updated after the specified timestamp

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups?filter=lastUpdated+gt+\"2015-10-01T00:00:00.000Z\"+or+lastMembershipUpdated+gt+\"2015-10-01T00:00:00.000Z\"&limit=200"
```

##### Response example

```json
[
  {
    "id": "00g1emaKYZTWRYYRRTSK",
    "created": "2015-02-06T10:11:28.000Z",
    "lastUpdated": "2015-10-05T19:16:43.000Z",
    "lastMembershipUpdated": "2015-11-28T19:15:32.000Z",
    "objectClass": [
      "okta:user_group"
    ],
    "type": "OKTA_GROUP",
    "profile": {
      "name": "West Coast Users",
      "description": "All Users West of The Rockies"
    },
    "_links": {
      "logo": [
        {
          "name": "medium",
          "href": "https://${yourOktaDomain}/img/logos/groups/okta-medium.png",
          "type": "image/png"
        },
        {
          "name": "large",
          "href": "https://${yourOktaDomain}/img/logos/groups/okta-large.png",
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
  },
  {
    "id": "00gak46y5hydV6NdM0g4",
    "created": "2015-07-22T08:45:03.000Z",
    "lastUpdated": "2015-07-22T08:45:03.000Z",
    "lastMembershipUpdated": "2015-10-22T08:45:03.000Z",
    "objectClass": [
      "okta:user_group"
    ],
    "type": "OKTA_GROUP",
    "profile": {
      "name": "Squabble of Users",
      "description": "Keep Calm and Single Sign-On"
    },
    "_links": {
      "logo": [
        {
          "name": "medium",
          "href": "https://${yourOktaDomain}/img/logos/groups/okta-medium.png",
          "type": "image/png"
        },
        {
          "name": "large",
          "href": "https://${yourOktaDomain}/img/logos/groups/okta-large.png",
          "type": "image/png"
        }
      ],
      "users": {
        "href": "https://${yourOktaDomain}/api/v1/groups/00gak46y5hydV6NdM0g4/users"
      },
      "apps": {
        "href": "https://${yourOktaDomain}/api/v1/groups/00gak46y5hydV6NdM0g4/apps"
      }
    }
  }
]
```

#### List Groups with Search

<ApiLifecycle access="ea" />

Searches for groups based on the properties specified in the search parameter

Property names in the search parameter are case sensitive, whereas operators (`eq`, `sw`, etc.) and string values are case insensitive.

This operation:

* Supports [pagination](/docs/reference/api-overview/#pagination).
* Requires [URL encoding](http://en.wikipedia.org/wiki/Percent-encoding).
For example, `search=type eq "OKTA_GROUP"` is encoded as `search=type+eq+%22OKTA_GROUP%22`.
Examples use cURL-style escaping instead of URL encoding to make them easier to read.
Use an ID lookup for records that you update to ensure your results contain the latest data. Search results are eventually consistent.
* Searches many properties:
   - Any group profile property, including imported app group profile properties.
   - The top-level properties `id`, `created`, `lastMembershipUpdated`, `lastUpdated`, and `type`.
   - The [source](#group-attributes) of groups with type of `APP_GROUP`, accessed as `source.id`.

| Search Term Example                                       | Description                                                               |
| :-------------------------------------------------------- | :------------------------------------------------------------------------ |
| `type eq "APP_GROUP"`                                     | Groups that have a `type` of `APP_GROUP`                                  |
| `lastMembershipUpdated gt "yyyy-MM-dd'T'HH:mm:ss.SSSZ"`   | Groups whose memberships were last updated after a specific timestamp     |
| `id eq "00gak46y5hydV6NdM0g4"`                            | Groups with a specified `id`                                              |
| `profile.name eq "West Coast Users"`                      | Groups that have a `name` of `West Coast Users`                           |
| `profile.samAccountName sw "West Coast" `                 | Groups whose `samAccountName` starts with `West Coast`                    |
| `source.id` eq `0oa2v0el0gP90aqjJ0g7`                     | Groups that have the source application with a specified `source.id`      |

##### Search Examples

List groups of type `APP_GROUP` that were created before `01/01/2014` and whose source application has the ID `0oa2v0el0gP90aqjJ0g7`.

    search=type eq "APP_GROUP" and (created lt "2014-01-01T00:00:00.000Z" and source.id eq "0oa2v0el0gP90aqjJ0g7")

List groups that have a `name` that starts with `West Coast` or have a `samAccountName` of `West Coast Users` or whose source application has the ID `0oa2v0el0gP90aqjJ0g7`.

    search=profile.name sw "West Coast" or profile.samAccountName eq "West Coast Users" or source.id eq "0oa2v0el0gP90aqjJ0g7"

##### Request Example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups?search=lastUpdated+gt+\"2015-10-01T00:00:00.000Z\"+or+lastMembershipUpdated+gt+\"2015-10-01T00:00:00.000Z\""
```

##### Response example


```json
[
  {
    "id": "00g1emaKYZTWRYYRRTSK",
    "created": "2015-02-06T10:11:28.000Z",
    "lastUpdated": "2015-10-05T19:16:43.000Z",
    "lastMembershipUpdated": "2015-11-28T19:15:32.000Z",
    "objectClass": [
      "okta:user_group"
    ],
    "type": "OKTA_GROUP",
    "profile": {
      "name": "West Coast Users",
      "description": "All Users West of The Rockies"
    },
    "_links": {
      "logo": [
        {
          "name": "medium",
          "href": "https://${yourOktaDomain}/img/logos/groups/okta-medium.png",
          "type": "image/png"
        },
        {
          "name": "large",
          "href": "https://${yourOktaDomain}/img/logos/groups/okta-large.png",
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
  },
  {
    "id": "00gak46y5hydV6NdM0g4",
    "created": "2015-07-22T08:45:03.000Z",
    "lastUpdated": "2015-07-22T08:45:03.000Z",
    "lastMembershipUpdated": "2015-10-22T08:45:03.000Z",
    "objectClass": [
      "okta:user_group"
    ],
    "type": "OKTA_GROUP",
    "profile": {
      "name": "Squabble of Users",
      "description": "Keep Calm and Single Sign-On"
    },
    "_links": {
      "logo": [
        {
          "name": "medium",
          "href": "https://${yourOktaDomain}/img/logos/groups/okta-medium.png",
          "type": "image/png"
        },
        {
          "name": "large",
          "href": "https://${yourOktaDomain}/img/logos/groups/okta-large.png",
          "type": "image/png"
        }
      ],
      "users": {
        "href": "https://${yourOktaDomain}/api/v1/groups/00gak46y5hydV6NdM0g4/users"
      },
      "apps": {
        "href": "https://${yourOktaDomain}/api/v1/groups/00gak46y5hydV6NdM0g4/apps"
      }
    }
  }
]
```

### Update Group

<ApiOperation method="put" url="/api/v1/groups/${groupId}" />

Updates the profile for a group of `OKTA_GROUP` type from your organization

> **Notes:** You can modify only profiles for groups of `OKTA_GROUP` type.<br><br>
Application imports are responsible for updating profiles for groups of `APP_GROUP` type such as Active Directory groups.

##### Request parameters


| Parameter | Description                   | ParamType | DataType                          | Required | Default |
| --------- | ----------------------------- | --------- | --------------------------------- | -------- | ------- |
| id        | ID of the Group to update     | URL       | String                            | TRUE     |         |
| profile   | Updated Profile for the Group | Body      | [Profile object](#profile-object) | TRUE     |         |

> **Note:** All Profile properties must be specified when updating a groups's profile. Partial updates aren't supported.

##### Response parameters

Updated [Group](#group-object)

##### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "name": "Ameliorate Name",
    "description": "Amended description"
  }
}' "https://${yourOktaDomain}/api/v1/groups/00ub0oNGTSWTBKOLGLNR"
```

##### Response example

```json
{
  "id": "00ub0oNGTSWTBKOLGLNR",
  "created": "2015-02-06T10:11:28.000Z",
  "lastUpdated": "2015-11-28T19:15:32.000Z",
  "lastMembershipUpdated": "2015-10-18T12:25:48.000Z",
  "objectClass": [
    "okta:user_group"
  ],
  "type": "OKTA_GROUP",
  "profile": {
    "name": "Ameliorate Name",
    "description": "Amended description"
  },
  "_links": {
    "logo": [
      {
        "name": "medium",
        "href": "https://${yourOktaDomain}/img/logos/groups/okta-medium.png",
        "type": "image/png"
      },
      {
        "name": "large",
        "href": "https://${yourOktaDomain}/img/logos/groups/okta-large.png",
        "type": "image/png"
      }
    ],
    "users": {
      "href": "https://${yourOktaDomain}/api/v1/groups/00ub0oNGTSWTBKOLGLNR/users"
    },
    "apps": {
      "href": "https://${yourOktaDomain}/api/v1/groups/00ub0oNGTSWTBKOLGLNR/apps"
    }
  }
}
```

### Remove Group

<ApiOperation method="delete" url="/api/v1/groups/${groupId}" />

Removes a group of `OKTA_GROUP` or `APP_GROUP` type from your organization

> **Note:** You can't remove groups of type `APP_GROUP` if they are used in a group push mapping.

##### Request parameters


| Parameter | Description                 | ParamType | DataType | Required | Default |
| --------- | --------------------------- | --------- | -------- | -------- | ------- |
| id        | ID of the Group to delete | URL       | String   | TRUE     |         |

##### Response parameters

N/A

##### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups/00ub0oNGTSWTBKOLGLNR"
```

##### Response example

```http
HTTP/1.1 204 No Content
```

## Group member operations

### List Group members

<ApiOperation method="get" url="/api/v1/groups/${groupId}/users" />

Enumerates all [users](/docs/reference/api/users/#user-object) that are a member of a Group

##### Request parameters

| Parameter | Description                                                | ParamType | DataType | Required | Default |
| --------- | ---------------------------------------------------------- | --------- | -------- | -------- | ------- |
| after     | Specifies the pagination cursor for the next page of users | Query     | String   | FALSE    |         |
| id        | ID of the Group                                          | URL       | String   | TRUE     |         |
| limit     | Specifies the number of user results in a page             | Query     | Number   | FALSE    | 1000    |

> **Note:** Treat the `after` cursor as an opaque value and obtain it through the next link relation. See [Pagination](/docs/reference/api-overview/#pagination).

The default user limit is set to a very high number due to historical reasons that are no longer valid for most organizations. This will change in a future version of this API. The recommended page limit is now `limit=200`.

> **Note:** If you receive an HTTP 500 status code, you more than likely have exceeded the request timeout. Retry your request with a smaller `limit` and page the results. See [Pagination](/docs/reference/api-overview/#pagination).

##### Response parameters

Array of [Users](/docs/reference/api/users/#user-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups/00g1fanEFIQHMQQJMHZP/users?limit=200"
```

##### Response example

```json
[
  {
    "id": "00u1f96ECLNVOKVMUSEA",
    "status": "ACTIVE",
    "created": "2013-12-12T16:14:22.000Z",
    "activated": "2013-12-12T16:14:22.000Z",
    "statusChanged": "2013-12-12T22:14:22.000Z",
    "lastLogin": "2013-12-12T22:14:22.000Z",
    "lastUpdated": "2015-11-15T19:23:32.000Z",
    "passwordChanged": "2013-12-12T22:14:22.000Z",
    "profile": {
      "firstName": "Easy",
      "lastName": "E",
      "email": "easy-e@example.com",
      "login": "easy-e@example.com",
      "mobilePhone": null
    },
    "credentials": {
      "password": {},
      "provider": {
        "type": "OKTA",
        "name": "OKTA"
      }
    },
    "_links": {
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/users/00u1f96ECLNVOKVMUSEA"
      }
    }
  },
  {
    "id": "00u1f9cMYQZFMPVXIDIZ",
    "status": "ACTIVE",
    "created": "2013-12-12T16:14:42.000Z",
    "activated": "2013-12-12T16:14:42.000Z",
    "statusChanged": "2013-12-12T16:14:42.000Z",
    "lastLogin": "2013-12-12T18:14:42.000Z",
    "lastUpdated": "2013-12-12T16:14:42.000Z",
    "passwordChanged": "2013-12-12T16:14:42.000Z",
    "profile": {
      "firstName": "Dr.",
      "lastName": "Dre",
      "email": "dr.dre@example.com",
      "login": "dr.dre@example.com",
      "mobilePhone": null
    },
    "credentials": {
      "password": {},
      "provider": {
        "type": "OKTA",
        "name": "OKTA"
      }
    },
    "_links": {
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/users/00u1f9cMYQZFMPVXIDIZ"
      }
    }
  }
]
```

### Add User to Group

<ApiOperation method="put" url="/api/v1/groups/${groupId}/users/${userId}" />

Adds a [user](/docs/reference/api/users/#user-object) to a group of `OKTA_GROUP` type

> **Notes:** You can modify only memberships for groups of `OKTA_GROUP` type.<br><br>
Application imports are responsible for managing group memberships for groups of `APP_GROUP` type such as Active Directory groups.

##### Request parameters


| Parameter | Description     | ParamType | DataType | Required | Default |
| --------- | --------------- | --------- | -------- | -------- | ------- |
| groupId   | `id` of the Group | URL       | String   | TRUE     |         |
| userId    | `id` of a user  | URL       | String   | TRUE     |         |

##### Response parameters

N/A

##### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups/00g1fanEFIQHMQQJMHZP/users/00u1f96ECLNVOKVMUSEA"
```

##### Response example

```http
HTTP/1.1 204 No Content
```

### Remove User from Group

<ApiOperation method="delete" url="/api/v1/groups/${groupId}/users/${userId}" />

Removes a [user](/docs/reference/api/users/#user-object) from a group of `OKTA_GROUP` type

> **Notes:** You can modify only memberships for groups of `OKTA_GROUP` type.<br><br>
Application imports are responsible for managing group memberships for groups of `APP_GROUP` type such as Active Directory groups.

##### Request parameters

| Parameter | Description       | ParamType | DataType | Required | Default |
| --------- | ----------------- | --------- | -------- | -------- | ------- |
| groupId   | `id` of the Group | URL       | String   | TRUE     |         |
| userId    | `id` of a user    | URL       | String   | TRUE     |         |

##### Response parameters

N/A

##### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups/00g1fanEFIQHMQQJMHZP/users/00u1f96ECLNVOKVMUSEA"
```

##### Response example


```http
HTTP/1.1 204 No Content
```

## Group rule operations

### Create Group rule

<ApiOperation method="post" url="/api/v1/groups/rules" />

Creates a Group rule to dynamically add users to the specified Group if they match the condition

> **Note:** Group rules are created with status='INACTIVE'.

##### Request parameters


| Parameter                           | Description                                             | ParamType | DataType                          | Required | Default |
| ----------------------------------- | ------------------------------------------------------- | --------- | --------------------------------- | -------- | ------- |
| name                                | name of the Group                                       | Body      | String                            | TRUE     |         |
| type                                | `group_rule`                                            | Body      | String                            | TRUE     |         |
| conditions.expression.value         | Okta expression that would result in a boolean value    | Body      | String                            | TRUE     |         |
| conditions.expression.type          | `urn:okta:expression:1.0`                               | Body      | String                            | TRUE     |         |
| conditions.people.users.exclude     | userIds that would be excluded when rules are processed | Body      | String                            | FALSE    |         |
| conditions.people.groups.exclude    | currently not supported                                 | Body      | String                            | FALSE    |         |
| actions.assignUserToGroups.groupIds | Array of groupIds to which users would be added.        | Body      | String                            | TRUE     |         |

##### Response parameters

Created [Rule](#rule-object)

##### Request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "group_rule",
  "name": "Engineering group rule",
  "conditions": {
    "people": {
      "users": {
        "exclude": [
          "00u22w79JPMEeeuLr0g4"
        ]
      },
      "groups": {
        "exclude": []
      }
    },
    "expression": {
      "value": "user.role==\"Engineer\"",
      "type": "urn:okta:expression:1.0"
    }
  },
  "actions": {
    "assignUserToGroups": {
      "groupIds": [
        "00gjitX9HqABSoqTB0g3"
      ]
    }
  }
}' "https://${yourOktaDomain}/api/v1/groups/rules"
```

##### Response example

```json
{
  "type": "group_rule",
  "id": "0pr3f7zMZZHPgUoWO0g4",
  "status": "INACTIVE",
  "name": "Engineering group rule",
  "created": "2016-12-01T14:40:04.000Z",
  "lastUpdated": "2016-12-01T14:40:04.000Z",
  "conditions": {
      "people": {
        "users": {
          "exclude": [
            "00u22w79JPMEeeuLr0g4"
          ]
        },
        "groups": {
          "exclude": []
        }
      },
      "expression": {
        "value": "user.role==\"Engineer\"",
        "type": "urn:okta:expression:1.0"
      }
    },
  "actions": {
    "assignUserToGroups": {
      "groupIds": [
        "00gjitX9HqABSoqTB0g3"
      ]
    }
  }
}
```

### Update Group rule


<ApiOperation method="put" url="/api/v1/groups/rules/${ruleId}" />

Updates a Group rule

> **Notes:** You can update only rules with status='INACTIVE'.<br><br>
You can't currently update the action section.

##### Request parameters


| Parameter                           | Description                                    | ParamType | DataType                          | Required | Default |
| ----------------------------------- | ---------------------------------------------- | --------- | --------------------------------- | -------- | ------- |
| actions.assignUserToGroups.groupIds | Array of groupIds to which users would be added| Body      | String                            | TRUE     |         |
| conditions.expression.type           | `urn:okta:expression:1.0 `                     | Body      | String                            | TRUE     |         |
| conditions.expression.value          | okta expression that would result in a boolean value | Body      | String                     | TRUE     |         |
| conditions.people.groups.exclude     | currently not supported                        | Body      | String                            | FALSE    |         |
| conditions.people.users.exclude      | userIds that would be excluded when rules are processed | Body      | String                   | FALSE    |         |
| id                                  | ID of the rule to be updated                   | URL       | String                            | TRUE     |         |
| name                                | name of the Group                              | Body      | String                            | TRUE     |         |

##### Response parameters

Updated [Rule](#rule-object)

##### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "group_rule",
  "id": "0pr3f7zMZZHPgUoWO0g4",
  "status": "INACTIVE",
  "name": "Engineering group rule",
  "conditions": {
    "people": {
      "users": {
        "exclude": [
          "00u22w79JPMEeeuLr0g4"
        ]
      },
      "groups": {
        "exclude": []
      }
    },
    "expression": {
      "value": "user.role==\"Engineer\"",
      "type": "urn:okta:expression:1.0"
    }
  },
  "actions": {
    "assignUserToGroups": {
      "groupIds": [
        "00gjitX9HqABSoqTB0g3"
      ]
    }
  }
}' "https://${yourOktaDomain}/api/v1/groups/rules/0pr3f7zMZZHPgUoWO0g4"
```

##### Response example

```json
{
  "type": "group_rule",
  "id": "0pr3f7zMZZHPgUoWO0g4",
  "status": "INACTIVE",
  "name": "Engineering group rule",
  "created": "2016-12-01T14:40:04.000Z",
  "lastUpdated": "2016-12-01T14:40:04.000Z",
  "conditions": {
      "people": {
        "users": {
          "exclude": [
            "00u22w79JPMEeeuLr0g4"
          ]
        },
        "groups": {
          "exclude": []
        }
      },
      "expression": {
        "value": "user.role==\"Engineer\"",
        "type": "urn:okta:expression:1.0"
      }
    },
  "actions": {
    "assignUserToGroups": {
      "groupIds": [
        "00gjitX9HqABSoqTB0g3"
      ]
    }
  }
}
```

### List Group rules

<ApiOperation method="get" url="/api/v1/groups/rules" />

Lists all Group rules for your organization

> **Note:** If you don't specify any value for `limit`, a maximum of 50 results are returned. The maximum value for `limit` is 300.

##### Request parameters


| Parameter      | Description                                                    | ParamType  | DataType                          | Required | Default |
| -------------- | -------------------------------------------------------------- | ---------- | --------------------------------- | -------- | ------- |
| after          | Specifies the pagination cursor for the next page of rules     | Query      | String                            | FALSE    |         |
| expand         | If specified as `groupIdToGroupNameMap`, then show Group names | Query      | String                            | FALSE    |         |
| limit          | Specifies the number of rule results in a page                 | Query      | Number                            | FALSE    | 50      |
| search         | Specifies the keyword to search rules for                      | Query      | String                            | FALSE    |         |

##### Response parameters

Array of [Rules](#rule-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups/rules?limit=30"
```

##### Response example

```json
[
  {
    "type": "group_rule",
    "id": "0pr2kssg22YHgTkgW0g4",
    "status": "INACTIVE",
    "name": "Engineering group rule",
    "created": "2016-09-26T20:19:44.000Z",
    "lastUpdated": "2016-12-01T01:50:44.000Z",
    "conditions": {
      "expression": {
        "value": "isMemberOfAnyGroup(\"00g25dgglwXD93m300g4\",\"00gjitX9HqABSoqTB0g3\")",
        "type": "urn:okta:expression:1.0"
      }
    },
    "actions": {
      "assignUserToGroups": {
        "groupIds": [
          "00g25nqEUecj5LYAI0g4"
        ]
      }
    }
  },
  {
    "type": "group_rule",
    "id": "0pr3f7txB2OIOVLuQ0g4",
    "status": "ACTIVE",
    "name": "Sales group",
    "created": "2016-12-01T01:08:38.000Z",
    "lastUpdated": "2016-12-01T01:08:38.000Z",
    "conditions": {
      "people": {
        "users": {
          "exclude": [
            "00u22w79JPMEeeuLr0g4"
          ]
        },
        "groups": {
          "exclude": []
        }
      },
      "expression": {
        "value": "user.role==\"Sales Engineer\"",
        "type": "urn:okta:expression:1.0"
      }
    },
    "actions": {
      "assignUserToGroups": {
        "groupIds": [
          "00gjitX9HqABSoqTB0g3"
        ]
      }
    }
  },
  {
    "type": "group_rule",
    "id": "0pr3f7zMZZHPgUoWO0g4",
    "status": "ACTIVE",
    "name": "San Francisco group rule",
    "created": "2016-12-01T01:10:04.000Z",
    "lastUpdated": "2016-12-01T01:10:04.000Z",
    "conditions": {
      "expression": {
        "value": "user.location==\"san Francisco\"",
        "type": "urn:okta:expression:1.0"
      }
    },
    "actions": {
      "assignUserToGroups": {
        "groupIds": [
          "00gjitX9HqABSoqTB0g3"
        ]
      }
    }
  }
]
```

### Get Group rule

<ApiOperation method="get" url="/api/v1/groups/rules/${ruleId}" />

Fetches a specific Group rule by ID from your organization

##### Request parameters

| Parameter      | Description                                                    | ParamType  | DataType                          | Required | Default |
| -------------- | -------------------------------------------------------------- | ---------- | --------------------------------- | -------- | ------- |
| expand         | If specified as `groupIdToGroupNameMap`, then show Group names | Query      | String                            | FALSE    |         |
| id             | ID of a Group Rule                                             | URL        | String                            | TRUE     |         |

##### Response parameters

Specified [Rule](#rule-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups/rules/0pr3f7zMZZHPgUoWO0g4"
```

##### Response example


```json
{
  "type": "group_rule",
  "id": "0pr3f7zMZZHPgUoWO0g4",
  "status": "ACTIVE",
  "name": "Engineering Group",
  "created": "2016-12-01T14:40:04.000Z",
  "lastUpdated": "2016-12-01T14:40:04.000Z",
  "conditions": {
      "people": {
        "users": {
          "exclude": [
            "00u22w79JPMEeeuLr0g4"
          ]
        },
        "groups": {
          "exclude": []
        }
      },
      "expression": {
        "value": "user.role==\"Engineer\"",
        "type": "urn:okta:expression:1.0"
      }
    },
  "actions": {
    "assignUserToGroups": {
      "groupIds": [
        "00gjitX9HqABSoqTB0g3"
      ]
    }
  }
}
```

### Delete a Group rule

<ApiOperation method="delete" url="/api/v1/groups/rules/${ruleId}" />

Removes a specific Group rule by ID from your organization

##### Request parameters


| Parameter      | Description                                                  | ParamType  | DataType                          | Required | Default |
| -------------- | ------------------------------------------------------------ | ---------- | --------------------------------- | -------- | ------- |
| `id`             | ID of a Group Rule                                           | URL        | String                            | TRUE     |         |

##### Response parameters

N/A

##### Request example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups/rules/0pr3f7zMZZHPgUoWO0g4"
```

##### Response example


```http
HTTP/1.1 202 Accepted
```

### Activate a Group rule


<ApiOperation method="post" url="/api/v1/groups/rules/${ruleId}/lifecycle/activate" />

Activates a specific Group rule by ID from your organization

##### Request Parameters


| Parameter      | Description                                                  | ParamType  | DataType                          | Required | Default |
| -------------- | ------------------------------------------------------------ | ---------- | --------------------------------- | -------- | ------- |
| `id`             | ID of a Group Rule                                           | URL        | String                            | TRUE     |         |

##### Response parameters


N/A

##### Request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups/rules/0pr3f7zMZZHPgUoWO0g4/lifecycle/activate"
```

##### Response Example


```http
HTTP/1.1 204 No Content
```

### Deactivate a Group rule

<ApiOperation method="post" url="/api/v1/groups/rules/${ruleId}/lifecycle/deactivate" />

Deactivates a specific Group rule by ID from your organization

##### Request parameters


| Parameter      | Description                                                  | ParamType  | DataType                          | Required | Default |
| -------------- | ------------------------------------------------------------ | ---------- | --------------------------------- | -------- | ------- |
| `id `            | ID of a Group Rule                                           | URL        | String                            | TRUE     |         |

##### Response parameters


N/A

##### Request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups/rules/0pr3f7zMZZHPgUoWO0g4/lifecycle/deactivate"
```

##### Response example


```http
HTTP/1.1 204 No Content
```

## Related resources

### List assigned Applications

<ApiOperation method="get" url="/api/v1/groups/${groupId}/apps" />

Enumerates all [Applications](/docs/reference/api/apps/#application-object) that are assigned to a Group. See [Application Group Operations](/docs/reference/api/apps/#application-group-operations).

##### Request parameters


| Parameter | Description                                               | ParamType | DataType | Required | Default |
| --------- | --------------------------------------------------------- | --------- | -------- | -------- | ------- |
| after     | Specifies the pagination cursor for the next page of apps | Query     | String   | FALSE    |         |
| id        | ID of the Group                                           | URL       | String   | TRUE     |         |
| limit     | Specifies the number of app results for a page            | Query     | Number   | FALSE    | 20      |

> **Note:** Treat the page cursor as an opaque value and obtain it through the next link relation. See [Pagination](/docs/reference/api-overview/#pagination).

##### Response parameters

Array of [Applications](/docs/reference/api/apps/#application-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/groups/00g1fanEFIQHMQQJMHZP/apps"
```

##### Response example


```json
[
 {
        "id": "0oafwvZDWJKVLDCUWUAC",
        "name": "template_basic_auth",
        "label": "Sample Basic Auth App",
        "status": "ACTIVE",
        "lastUpdated": "2013-09-30T00:56:52.000Z",
        "created": "2013-09-30T00:56:52.000Z",
        "accessibility": {
            "selfService": false,
            "errorRedirectUrl": null
        },
        "visibility": {
            "autoSubmitToolbar": false,
            "hide": {
                "iOS": false,
                "web": false
            },
            "appLinks": {
                "login": true
            }
        },
        "features": [],
        "signOnMode": "BASIC_AUTH",
        "credentials": {
            "scheme": "EDIT_USERNAME_AND_PASSWORD",
            "userNameTemplate": {
                "template": "${source.login}",
                "type": "BUILT_IN"
            }
        },
        "settings": {
            "app": {
                "url": "https://example.com/login.html",
                "authURL": "https://example.com/auth.html"
            }
        },
        "_links": {
            "appLinks": [
                {
                    "href": "https://${yourOktaDomain}/home/template_basic_auth/0oafwvZDWJKVLDCUWUAC/1438",
                    "name": "login",
                    "type": "text/html"
                }
            ],
            "users": {
                "href": "https://${yourOktaDomain}/api/v1/apps/0oafwvZDWJKVLDCUWUAC/users"
            },
            "deactivate": {
                "href": "https://${yourOktaDomain}/api/v1/apps/0oafwvZDWJKVLDCUWUAC/lifecycle/deactivate"
            },
            "groups": {
                "href": "https://${yourOktaDomain}/api/v1/apps/0oafwvZDWJKVLDCUWUAC/groups"
            }
        }
    },
    {
        "id": "0oafxqCAJWWGELFTYASJ",
        "name": "bookmark",
        "label": "Sample Bookmark App",
        "status": "ACTIVE",
        "lastUpdated": "2013-10-02T22:06:24.000Z",
        "created": "2013-10-01T04:22:27.000Z",
        "accessibility": {
            "selfService": false,
            "errorRedirectUrl": null
        },
        "visibility": {
            "autoSubmitToolbar": false,
            "hide": {
                "iOS": false,
                "web": false
            },
            "appLinks": {
                "login": true
            }
        },
        "features": [],
        "signOnMode": "BOOKMARK",
        "credentials": {
            "userNameTemplate": {
                "template": "${user.firstName}",
                "type": "CUSTOM"
            }
        },
        "settings": {
            "app": {
                "requestIntegration": false,
                "url": "https://example.com/bookmark.htm"
            }
        },
        "_links": {
            "appLinks": [
                {
                    "href": "https://${yourOktaDomain}/home/bookmark/0oafxqCAJWWGELFTYASJ/1280",
                    "name": "login",
                    "type": "text/html"
                }
            ],
            "users": {
                "href": "https://${yourOktaDomain}/api/v1/apps/0oafxqCAJWWGELFTYASJ/users"
            },
            "deactivate": {
                "href": "https://${yourOktaDomain}/api/v1/apps/0oafxqCAJWWGELFTYASJ/lifecycle/deactivate"
            },
            "groups": {
                "href": "https://${yourOktaDomain}/api/v1/apps/0oafxqCAJWWGELFTYASJ/groups"
            }
        }
    }
]
```

## Group object

### Example

```json
{
  "id": "00g1emaKYZTWRYYRRTSK",
  "created": "2015-02-06T10:11:28.000Z",
  "lastUpdated": "2015-10-05T19:16:43.000Z",
  "lastMembershipUpdated": "2015-11-28T19:15:32.000Z",
  "objectClass": [
    "okta:user_group"
  ],
  "type": "OKTA_GROUP",
  "profile": {
    "name": "West Coast Users",
    "description": "All Users West of The Rockies"
  },
  "_links": {
    "logo": [
      {
        "name": "medium",
        "href": "https://${yourOktaDomain}/img/logos/groups/okta-medium.png",
        "type": "image/png"
      },
      {
        "name": "large",
        "href": "https://${yourOktaDomain}/img/logos/groups/okta-large.png",
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
```

### Group attributes

All groups have the following properties:

| Property              | Description                                                  | DataType                                                       | Nullable | Unique | Readonly | MinLength | MaxLength | Validation |
| --------------------- | ------------------------------------------------------------ | -------------------------------------------------------------- | -------- | ------ | -------- | --------- | --------- | ---------- |
| _embedded             | Embedded resources related to the Group                      | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |           |           |            |
| _links                | [Discoverable resources](#links-object) related to the Group | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |           |           |            |
| created               | Timestamp when Group was created                             | Date                                                           | FALSE    | FALSE  | TRUE     |           |           |            |
| id                    | Unique key for Group                                         | String                                                         | FALSE    | TRUE   | TRUE     |           |           |            |
| lastMembershipUpdated | Timestamp when Group's memberships were last updated         | Date                                                           | FALSE    | FALSE  | TRUE     |           |           |            |
| lastUpdated           | Timestamp when Group's `profile` was last updated            | Date                                                           | FALSE    | FALSE  | TRUE     |           |           |            |
| objectClass           | Determines the Group's `profile`                             | Array of String                                                | TRUE     | FALSE  | TRUE     | 1         |           |            |
| profile               | The Group's Profile properties                               | [Profile object](#profile-object)                              | FALSE    | FALSE  | FALSE    |           |           |            |
| type                  | Determines how a Group's Profile and memberships are managed | [Group Type](#group-type)                                      | FALSE    | FALSE  | TRUE     |           |           |            |

> **Note:** The `id`, `created`, `lastUpdated`, `lastMembershipUpdated`, `objectClass`, `type`, and `_links` properties are available only after you create a Group.

In addition, groups of type `APP_GROUP` also have the following properties:

| Property | Description                                                                                     | DataType                   | Nullable | Unique | Readonly | MinLength | MaxLength | Validation |
| -------- | ----------------------------------------------------------------------------------------------- | -------------------------- | -------- | ------ | -------- | --------- | --------- | ---------- |
| source   | The ID of the source [application](/docs/reference/api/apps/#application-object) of the group   | Array of String            | FALSE    | FALSE  | TRUE     |           |           |            |

### Group type

Okta supports several types of Groups that constrain how the Group's Profile and memberships are managed.

| Type         | Description                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------- |
| `OKTA_GROUP` | Group Profile and memberships are directly managed in Okta via static assignments or indirectly through Group rules |
| `APP_GROUP`  | Group Profile and memberships are imported and must be managed within the application that imported the Group   |
| `BUILT_IN`   | Group Profile and memberships are managed by Okta and can't be modified                                        |

> **Note:** Active Directory and LDAP Groups also have `APP_GROUP` type.

### Profile object

Specifies required and optional properties for a Group. The `objectClass` of a Group determines which additional properties are available.

#### ObjectClass: okta:user_group

Profile for any Group that is not imported from Active Directory.  Specifies [standard](#default-profile-properties) and [custom](#custom-profile-properties) profile properties for a group.

##### Default Profile Properties

| Property    | Description              | DataType | Nullable | Readonly | MinLength | MaxLength | Validation |
| ----------- | ------------------------ | -------- | -------- | -------- | --------- | --------- | ---------- |
| name        | Name of the Group        | String   | FALSE    | FALSE    | 1         | 255       |            |
| description | Description of the Group | String   | TRUE     | FALSE    | 0         | 1024      |            |

```json
{
  "name": "West Coast Users",
  "description": "All Users West of The Rockies"
}
```
##### Custom Profile Properties

<ApiLifecycle access="ea" />

Group profiles may be extended with custom properties but the property must first be added to the group profile schema before it can be referenced.  You can use the Profile Editor in the administrator UI or the [Schemas API](/docs/reference/api/schemas/) to manage schema extensions.

Custom attributes may contain HTML tags. It is the client's responsibility to escape or encode this data before displaying it. Use [best-practices](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) to prevent cross-site scripting.

## Rule object

### Example

```json
{
  "type": "group_rule",
  "id": "0pr3f7zMZZHPgUoWO0g4",
  "status": "INACTIVE",
  "name": "Engineers Group Rule",
  "created": "2016-12-01T14:40:04.000Z",
  "lastUpdated": "2016-12-01T14:40:04.000Z",
  "conditions": {
      "people": {
        "users": {
          "exclude": [
            "00u22w79JPMEeeuLr0g4"
          ]
        },
        "groups": {
          "exclude": []
        }
      },
      "expression": {
        "value": "user.role==\"Engineer\"",
        "type": "urn:okta:expression:1.0"
      }
    },
  "actions": {
    "assignUserToGroups": {
      "groupIds": [
        "00gjitX9HqABSoqTB0g3"
      ]
    }
  }
}
```

#### ObjectClass: okta:windows_security_principal

Profile for a Group that is imported from Active Directory

| Property                   | Description                                            | DataType | Nullable  | Readonly | MinLength | MaxLength | Validation |
| -------------------------- | ------------------------------------------------------ | -------- | --------- | -------- | --------- | --------- | ---------- |
| description                | Description of the Windows Group                       | String   | FALSE     | TRUE     |           |           |            |
| dn                         | The distinguished name of the Windows Group            | String   | FALSE     | TRUE     |           |           |            |
| externalId                 | Base-64 encoded GUID (objectGUID) of the Windows Group | String   | FALSE     | TRUE     |           |           |            |
| name                       | Name of the Windows Group                              | String   | FALSE     | TRUE     |           |           |            |
| samAccountName             | Pre-Windows 2000 name of the Windows Group             | String   | FALSE     | TRUE     |           |           |            |
| windowsDomainQualifiedName | Fully qualified name of the Windows Group              | String   | FALSE     | TRUE     |           |           |            |

```json
{
  "profile": {
    "name": "West Coast Users",
    "description": "example.com/West Coast/West Coast Users",
    "samAccountName": "West Coast Users",
    "dn": "CN=West Coast Users,OU=West Coast,DC=example,DC=com",
    "windowsDomainQualifiedName": "EXAMPLE\\West Coast Users",
    "externalId": "VKzYZ1C+IkSZxIWlrW5ITg=="
  }
}
```

### Links object

Specifies link relations. See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the Group using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification. This object is used for dynamic discovery of related resources and lifecycle operations.

| Link Relation Type | Description                                                                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| apps               | Lists all [applications](/docs/reference/api/apps/#application-object) that are assigned to the Group. See [Application Group Operations](/docs/reference/api/apps/#application-group-operations).          |
| logo               | Provides links to logo images for the Group if available                     |
| self               | The primary URL for the Group                                                                                             |
| source             | The URL for the source [application](/docs/reference/api/apps/#application-object) of the group. This link attribute is only present in groups of `APP_GROUP` type. |
| users              | Provides [Group member operations](#group-member-operations) for the Group                                                      |

> **Note:** The Links object is read-only.
