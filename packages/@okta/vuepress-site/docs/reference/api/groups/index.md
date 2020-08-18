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

> **Note:** Application import operations are responsible for syncing Groups with `APP_GROUP` type such as Active Directory Groups. See [Importing Groups into Okta](https://help.okta.com/en/prod/Content/Topics/Directory/Directory_Groups.htm) for more information.

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
- [Search Groups](#search-groups)
- [List Groups with type](#list-groups-with-type)
- [List Groups with Profile updated after timestamp](#list-groups-with-profile-updated-after-timestamp)
- [List Groups with membership updated after timestamp](#list-groups-with-membership-updated-after-timestamp)
- [List Groups updated after timestamp](#list-groups-updated-after-timestamp)

##### Request parameters


| Parameter | Description                                                                                | ParamType | DataType | Required | Default |
| --------- | ------------------------------------------------------------------------------------------ | --------- | -------- | -------- | ------- |
| after     | Specifies the pagination cursor for the next page of Groups                                | Query     | String   | FALSE    |         |
| filter    | [Filter expression](/docs/reference/api-overview/#filtering) for Groups      | Query     | String   | FALSE    |         |
| limit     | Specifies the number of Group results in a page                                            | Query     | Number   | FALSE    | 10000   |
| q         | Searches the `name` property of Groups for matching value                                  | Query     | String   | FALSE    |         |

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

```JSON
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://${yourOktaDomain}/api/v1/groups?limit=200>; rel="self"
Link: <https://${yourOktaDomain}/api/v1/groups?after=00garwpuyxHaWOkdV0g4&limit=200>; rel="next"
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
      "windowsDomainQualifiedName": "CORP\Engineering Users",
      "externalId": "OZJdWdONCU6h7WjQKp+LPA=="
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

#### Search Groups

Searches for groups by `name` in your organization

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


```JSON
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://${yourOktaDomain}/api/v1/groups?limit=2&filter=type+eq+%22OKTA_GROUP%22>; rel="self"
Link: <https://${yourOktaDomain}/api/v1/groups?after=00gak46y5hydV6NdM0g4&limit=2&filter=type+eq+%22OKTA_GROUP%22>; rel="next"
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

```JSON
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://${yourOktaDomain}/api/v1/groups?limit=200&filter=lastUpdated+gt+%222015-10-01T00%3A00%3A00.000Z%22>; rel="self"
Link: <https://${yourOktaDomain}/api/v1/groups?after=00g1emaKYZTWRYYRRTSK&limit=200&filter=lastUpdated+gt+%222015-10-01T00%3A00%3A00.000Z%22>; rel="next"
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

```JSON
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://${yourOktaDomain}/api/v1/groups?limit=200&filter=lastMembershipUpdated+gt+%222015-10-01T00%3A00%3A00.000Z%22>; rel="self"
Link: <https://${yourOktaDomain}/api/v1/groups?after=00g1emaKYZTWRYYRRTSK&limit=200&filter=lastMembershipUpdated+gt+%222015-10-01T00%3A00%3A00.000Z%22>; rel="next"
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

```JSON
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://${yourOktaDomain}/api/v1/groups?limit=200&filter=lastUpdated+gt+%222015-10-01T00%3A00%3A00.000Z%22+or+lastMembershipUpdated+gt+%222015-10-01T00%3A00%3A00.000Z%22>; rel="self"
Link: <https://${yourOktaDomain}/api/v1/groups?after=00g1emaKYZTWRYYRRTSK&limit=200&filter=lastUpdated+gt+%222015-10-01T00%3A00%3A00.000Z%22+or+lastMembershipUpdated+gt+%222015-10-01T00%3A00%3A00.000Z%22>; rel="next"
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

Updates the Profile for a Group with `OKTA_GROUP` type from your organization

> **Notes:** You can modify only Profiles for Groups with `OKTA_GROUP` type.<br><br>
Application imports are responsible for updating Group Profiles with `APP_GROUP` type such as Active Directory Groups.

##### Request parameters


| Parameter | Description                   | ParamType | DataType                          | Required | Default |
| --------- | ----------------------------- | --------- | --------------------------------- | -------- | ------- |
| id        | ID of the Group to update     | URL       | String                            | TRUE     |         |
| profile   | Updated Profile for the Group | Body      | [Profile object](#profile-object) | TRUE     |         |

> **Note:** All Profile properties must be specified when updating a Groups's Profile. Partial updates aren't supported.

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

Removes a Group with `OKTA_GROUP` or `APP_GROUP` type from your organization

> **Note:** You can't remove Groups with type `APP_GROUP` if they are used in a Group push mapping.

##### Request parameters


| Parameter | Description                 | ParamType | DataType | Required | Default |
| --------- | --------------------------- | --------- | -------- | -------- | ------- |
| id        | `id` of the Group to delete | URL       | String   | TRUE     |         |

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
| id        | `id` of the Group                                          | URL       | String   | TRUE     |         |
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

```JSON
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://${yourOktaDomain}/api/v1/groups/00g1fanEFIQHMQQJMHZP/users?limit=200>; rel="self"
Link: <https://${yourOktaDomain}/api/v1/groups/00g1fanEFIQHMQQJMHZP/users?after=00u1f9cMYQZFMPVXIDIZ&limit=200>; rel="next"
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

Adds a [user](/docs/reference/api/users/#user-object) to a Group with `OKTA_GROUP` type

> **Notes:** You can modify only memberships for Groups with `OKTA_GROUP` type.<br><br>
Application imports are responsible for managing Group memberships for Groups with `APP_GROUP` type such as Active Directory Groups.

##### Request parameters


| Parameter | Description     | ParamType | DataType | Required | Default |
| --------- | --------------- | --------- | -------- | -------- | ------- |
| groupId   | id of the Group | URL       | String   | TRUE     |         |
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

Removes a [user](/docs/reference/api/users/#user-object) from a Group with `OKTA_GROUP` type

> **Notes:** You can modify only memberships for Groups with `OKTA_GROUP` type.<br><br>
Application imports are responsible for managing Group memberships for Groups with `APP_GROUP` type such as Active Directory Groups.

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
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://${yourOktaDomain}/api/v1/groups/rules?limit=20>; rel="self"
Link: <https://${yourOktaDomain}/api/v1/groups/rules?after=0pr3f7zMZZHPgUoWO0g4&limit=20>; rel="next"
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
| id             | id of a Group rule                                             | URL        | String                            | TRUE     |         |

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
| `id`             | ID of a Group rule                                           | URL        | String                            | TRUE     |         |

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
| `id`             | ID of a Group rule                                           | URL        | String                            | TRUE     |         |

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
| `id `            | ID of a group rule                                           | URL        | String                            | TRUE     |         |

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
| id        | id of the Group                                           | URL       | String   | TRUE     |         |
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


```JSON
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://${yourOktaDomain}/api/v1/groups/00g1fanEFIQHMQQJMHZP/apps>; rel="self"
Link: <https://${yourOktaDomain}/api/v1/groups/00g1fanEFIQHMQQJMHZP/apps?after=0oafxqCAJWWGELFTYASJ>; rel="next"
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
| _embedded             | embedded resources related to the Group                      | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |           |           |            |
| _links                | [discoverable resources](#links-object) related to the Group | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |           |           |            |
| created               | timestamp when Group was created                             | Date                                                           | FALSE    | FALSE  | TRUE     |           |           |            |
| id                    | unique key for Group                                         | String                                                         | FALSE    | TRUE   | TRUE     |           |           |            |
| lastMembershipUpdated | timestamp when Group's memberships were last updated         | Date                                                           | FALSE    | FALSE  | TRUE     |           |           |            |
| lastUpdated           | timestamp when Group's `profile` was last updated            | Date                                                           | FALSE    | FALSE  | TRUE     |           |           |            |
| objectClass           | determines the Group's `profile`                             | Array of String                                                | TRUE     | FALSE  | TRUE     | 1         |           |            |
| profile               | the Group's Profile properties                               | [Profile object](#profile-object)                              | FALSE    | FALSE  | FALSE    |           |           |            |
| type                  | determines how a Group's Profile and memberships are managed | [Group Type](#group-type)                                      | FALSE    | FALSE  | TRUE     |           |           |            |

> **Note:** The `id`, `created`, `lastUpdated`, `lastMembershipUpdated`, `objectClass`, `type`, and `_links` properties are available only after you create a Group.

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

Profile for any Group that is not imported from Active Directory

| Property    | Description              | DataType | Nullable | Readonly | MinLength | MaxLength | Validation |
| ----------- | ------------------------ | -------- | -------- | -------- | --------- | --------- | ---------- |
| name        | name of the Group        | String   | FALSE    | FALSE    | 1         | 255       |            |
| description | description of the Group | String   | TRUE     | FALSE    | 0         | 1024      |            |

```json
{
  "name": "West Coast Users",
  "description": "All Users West of The Rockies"
}
```

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
| description                | description of the Windows Group                       | String   | FALSE     | TRUE     |           |           |            |
| dn                         | the distinguished name of the Windows Group            | String   | FALSE     | TRUE     |           |           |            |
| externalId                 | base-64 encoded GUID (objectGUID) of the Windows Group | String   | FALSE     | TRUE     |           |           |            |
| name                       | name of the Windows Group                              | String   | FALSE     | TRUE     |           |           |            |
| samAccountName             | pre-Windows 2000 name of the Windows Group             | String   | FALSE     | TRUE     |           |           |            |
| windowsDomainQualifiedName | fully qualified name of the Windows Group              | String   | FALSE     | TRUE     |           |           |            |

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
| users              | Provides [Group member operations](#group-member-operations) for the Group                                                      |

> **Note:** The Links object is read-only.
