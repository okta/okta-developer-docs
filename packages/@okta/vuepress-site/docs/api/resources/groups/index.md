---
title: Groups
category: management
redirect_from: /docs/api/rest/groups.html
---

# Groups API

The Okta Groups API provides operations to manage Okta groups and their user members for your organization.

## Getting Started with the Groups API

Explore the Groups API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/0bb414f9594ed93672a0)

## Group Operations

### Add Group


<ApiOperation method="post" url="/api/v1/groups" />

Adds a new group with `OKTA_GROUP` type to your organization.

> Application import operations are responsible for syncing groups with `APP_GROUP` type such as Active Directory groups.<br>
> See [Importing Groups into Okta](https://help.okta.com/en/prod/Content/Topics/Directory/Directory_Groups.htm) for more information.

##### Request Parameters


| Parameter | Description                               | ParamType | DataType                          | Required | Default |
| --------- | ----------------------------------------- | --------- | --------------------------------- | -------- | ---     |
| profile   | `okta:user_group` profile for a new group | Body      | [Profile-Object](#profile-object) | TRUE     |         |

##### Response Parameters


The created [Group](#group-model).

##### Request Example


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
}' "https://{yourOktaDomain}/api/v1/groups"
```

##### Response Example


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
        "href": "https://{yourOktaDomain}/img/logos/groups/okta-medium.png",
        "type": "image/png"
      },
      {
        "name": "large",
        "href": "https://{yourOktaDomain}/img/logos/groups/okta-large.png",
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
```

### Get Group


<ApiOperation method="get" url="/api/v1/groups/${groupId}" />

Fetches a specific group by `id` from your organization

##### Request Parameters


| Parameter | Description     | ParamType | DataType | Required | Default |
| --------- | --------------- | --------- | -------- | -------- | ------- |
| id        | `id` of a group | URL       | String   | TRUE     |         |

##### Response Parameters


Fetched [Group](#group-model)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups/00g1emaKYZTWRYYRRTSK"
```

##### Response Example


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
        "href": "https://{yourOktaDomain}/img/logos/groups/okta-medium.png",
        "type": "image/png"
      },
      {
        "name": "large",
        "href": "https://{yourOktaDomain}/img/logos/groups/okta-large.png",
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
```

### List Groups


<ApiOperation method="get" url="/api/v1/groups" />

Enumerates groups in your organization with pagination. A subset of groups can be returned that match a supported filter expression or query.

- [List Groups with Defaults](#list-groups-with-defaults)
- [Search Groups](#search-groups)
- [List Groups with Type](#list-groups-with-type)
- [List Groups with Profile Updated after Timestamp](#list-groups-with-profile-updated-after-timestamp)
- [List Groups with Membership Updated after Timestamp](#list-groups-with-membership-updated-after-timestamp)
- [List Groups Updated after Timestamp](#list-groups-updated-after-timestamp)

##### Request Parameters


| Parameter | Description                                                                                | ParamType | DataType | Required | Default |
| --------- | ------------------------------------------------------------------------------------------ | --------- | -------- | -------- | ------- |
| q         | Searches the `name` property of groups for matching value                                  | Query     | String   | FALSE    |         |
| filter    | [Filter expression](/docs/api/getting_started/design_principles#filtering) for groups      | Query     | String   | FALSE    |         |
| limit     | Specifies the number of group results in a page                                            | Query     | Number   | FALSE    | 10000   |
| after     | Specifies the pagination cursor for the next page of groups                                | Query     | String   | FALSE    |         |

> The `after` cursor should treated as an opaque value and obtained through the next link relation. See [Pagination](/docs/api/getting_started/design_principles#pagination)

> Search currently performs a startsWith match but it should be considered an implementation detail and may change without notice in the future

###### Filters

The following expressions are supported for groups with the `filter` query parameter:

| Filter                                                  | Description                                                         |
| ----------------------------------------------          | ------------------------------------------------------------------- |
| `type eq "OKTA_GROUP"`                                  | Groups that have a `type` of `OKTA_GROUP`                           |
| `type eq "APP_GROUP"`                                   | Groups that have a `type` of `APP_GROUP`                            |
| `type eq "BUILT_IN"`                                    | Groups that have a `type` of `BUILT_IN`                             |
| `lastUpdated lt "yyyy-MM-dd'T'HH:mm:ss.SSSZ"`           | Groups with profile last updated before a specific timestamp        |
| `lastUpdated eq "yyyy-MM-dd'T'HH:mm:ss.SSSZ"`           | Groups with profile last updated at a specific timestamp            |
| `lastUpdated gt "yyyy-MM-dd'T'HH:mm:ss.SSSZ"`           | Groups with profile last updated after a specific timestamp         |
| `lastMembershipUpdated lt "yyyy-MM-dd'T'HH:mm:ss.SSSZ"` | Groups with memberships last updated before a specific timestamp    |
| `lastMembershipUpdated eq "yyyy-MM-dd'T'HH:mm:ss.SSSZ"` | Groups with memberships last updated at a specific timestamp        |
| `lastMembershipUpdated gt "yyyy-MM-dd'T'HH:mm:ss.SSSZ"` | Groups with memberships last updated after a specific timestamp     |
| `id eq "00g1emaKYZTWRYYRRTSK"`                          | Group with a specified `id`                                         |

See [Filtering](/docs/api/getting_started/design_principles#filtering) for more information on expressions

> All filters must be [URL encoded](http://en.wikipedia.org/wiki/Percent-encoding) where `filter=lastUpdated gt "2013-06-01T00:00:00.000Z"` is encoded as `filter=lastUpdated%20gt%20%222013-06-01T00:00:00.000Z%22`

**Filter Examples**

Groups with type of `OKTA_GROUP`

    filter=type eq "OKTA_GROUP"

Okta groups with profile updated after 11/11/2015

    filter=type eq "OKTA_GROUP" and lastUpdated gt "2016-11-11T00:00:00.000Z"

Okta groups with memberships updated after 11/11/2015

    filter=type eq "OKTA_GROUP" and lastMembershipUpdated gt "2016-11-11T00:00:00.000Z"

Okta groups with profile or memberships updated after 11/11/2015

    filter=type eq "OKTA_GROUP" and (lastUpdated gt "2015-11-11T00:00:00.000Z" or lastMembershipUpdated gt "2015-11-11T00:00:00.000Z")


##### Response Parameters


Array of [Groups](#group-model)

#### List Groups with Defaults


Enumerates all groups in your organization.

Reminders about the `limit` query parameter and query timeouts:

* If you don't specify a value for limit and don't specify a query, only 200 results are returned for most orgs.
* If you don't specify any value for limit and do specify a query, a maximum of 10 results are returned.
* The maximum value for limit is 200 for most orgs.
* Don't write code that depends on the default or maximum value, as it may change.
* If you receive a HTTP 500 status code, you more than likely have exceeded the request timeout.  Retry your request with a smaller `limit` and [page the results](/docs/api/getting_started/design_principles#pagination).

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups?limit=200"
```

##### Response Example


```http
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://{yourOktaDomain}/api/v1/groups?limit=200>; rel="self"
Link: <https://{yourOktaDomain}/api/v1/groups?after=00garwpuyxHaWOkdV0g4&limit=200>; rel="next"

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
          "href": "https://{yourOktaDomain}/img/logos/groups/okta-medium.png",
          "type": "image/png"
        },
        {
          "name": "large",
          "href": "https://{yourOktaDomain}/img/logos/groups/okta-large.png",
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
          "href": "https://{yourOktaDomain}/img/logos/groups/active_directory-medium.png",
          "type": "image/png"
        },
        {
          "name": "large",
          "href": "https://{yourOktaDomain}/img/logos/groups/active_directory-large.png",
          "type": "image/png"
        }
      ],
      "users": {
        "href": "https://{yourOktaDomain}/api/v1/groups/00garwpuyxHaWOkdV0g4/users"
      },
      "apps": {
        "href": "https://{yourOktaDomain}/api/v1/groups/00garwpuyxHaWOkdV0g4/apps"
      }
    }
  }
]
```

#### Search Groups


Searches for groups by `name` in your organization.

> Paging and searching are currently mutually exclusive.  You cannot page a query.  The default limit for a query is `300` results. Query is intended for an auto-complete picker use case where users will refine their search string to constrain the results.

> Search currently performs a startsWith match but it should be considered an implementation detail and may change without notice in the future. Exact matches will always be returned before partial matches

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups?q=West&limit=10"
```

##### Response Example


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
          "href": "https://{yourOktaDomain}/img/logos/groups/okta-medium.png",
          "type": "image/png"
        },
        {
          "name": "large",
          "href": "https://{yourOktaDomain}/img/logos/groups/okta-large.png",
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

#### List Groups with Type


Enumerates all groups with a [specific type](#group-type).

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups?filter=type+eq+\"OKTA_GROUP\"&limit=200"
```

##### Response Example


```http
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://{yourOktaDomain}/api/v1/groups?limit=2&filter=type+eq+%22OKTA_GROUP%22>; rel="self"
Link: <https://{yourOktaDomain}/api/v1/groups?after=00gak46y5hydV6NdM0g4&limit=2&filter=type+eq+%22OKTA_GROUP%22>; rel="next"

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
          "href": "https://{yourOktaDomain}/img/logos/groups/okta-medium.png",
          "type": "image/png"
        },
        {
          "name": "large",
          "href": "https://{yourOktaDomain}/img/logos/groups/okta-large.png",
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
          "href": "https://{yourOktaDomain}/img/logos/groups/okta-medium.png",
          "type": "image/png"
        },
        {
          "name": "large",
          "href": "https://{yourOktaDomain}/img/logos/groups/okta-large.png",
          "type": "image/png"
        }
      ],
      "users": {
        "href": "https://{yourOktaDomain}/api/v1/groups/00gak46y5hydV6NdM0g4/users"
      },
      "apps": {
        "href": "https://{yourOktaDomain}/api/v1/groups/00gak46y5hydV6NdM0g4/apps"
      }
    }
  }
]
```

#### List Groups with Profile Updated after Timestamp


Enumerates all groups with a profile updated after the specified timestamp.

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups?filter=lastUpdated+gt+\"2015-10-01T00:00:00.000Z\"&limit=200"
```

##### Response Example


```http
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://{yourOktaDomain}/api/v1/groups?limit=200&filter=lastUpdated+gt+%222015-10-01T00%3A00%3A00.000Z%22>; rel="self"
Link: <https://{yourOktaDomain}/api/v1/groups?after=00g1emaKYZTWRYYRRTSK&limit=200&filter=lastUpdated+gt+%222015-10-01T00%3A00%3A00.000Z%22>; rel="next"

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
          "href": "https://{yourOktaDomain}/img/logos/groups/okta-medium.png",
          "type": "image/png"
        },
        {
          "name": "large",
          "href": "https://{yourOktaDomain}/img/logos/groups/okta-large.png",
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

#### List Groups with Membership Updated after Timestamp


Enumerates all groups with user memberships updated after the specified timestamp.

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups?filter=lastMembershipUpdated+gt+\"2015-10-01T00:00:00.000Z\"&limit=200"
```

##### Response Example


```http
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://{yourOktaDomain}/api/v1/groups?limit=200&filter=lastMembershipUpdated+gt+%222015-10-01T00%3A00%3A00.000Z%22>; rel="self"
Link: <https://{yourOktaDomain}/api/v1/groups?after=00g1emaKYZTWRYYRRTSK&limit=200&filter=lastMembershipUpdated+gt+%222015-10-01T00%3A00%3A00.000Z%22>; rel="next"

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
          "href": "https://{yourOktaDomain}/img/logos/groups/okta-medium.png",
          "type": "image/png"
        },
        {
          "name": "large",
          "href": "https://{yourOktaDomain}/img/logos/groups/okta-large.png",
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
          "href": "https://{yourOktaDomain}/img/logos/groups/okta-medium.png",
          "type": "image/png"
        },
        {
          "name": "large",
          "href": "https://{yourOktaDomain}/img/logos/groups/okta-large.png",
          "type": "image/png"
        }
      ],
      "users": {
        "href": "https://{yourOktaDomain}/api/v1/groups/00gak46y5hydV6NdM0g4/users"
      },
      "apps": {
        "href": "https://{yourOktaDomain}/api/v1/groups/00gak46y5hydV6NdM0g4/apps"
      }
    }
  }
]
```

#### List Groups Updated after Timestamp


Enumerates all groups with profile or user memberships updated after the specified timestamp.

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups?filter=lastUpdated+gt+\"2015-10-01T00:00:00.000Z\"+or+lastMembershipUpdated+gt+\"2015-10-01T00:00:00.000Z\"&limit=200"
```

##### Response Example


```http
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://{yourOktaDomain}/api/v1/groups?limit=200&filter=lastUpdated+gt+%222015-10-01T00%3A00%3A00.000Z%22+or+lastMembershipUpdated+gt+%222015-10-01T00%3A00%3A00.000Z%22>; rel="self"
Link: <https://{yourOktaDomain}/api/v1/groups?after=00g1emaKYZTWRYYRRTSK&limit=200&filter=lastUpdated+gt+%222015-10-01T00%3A00%3A00.000Z%22+or+lastMembershipUpdated+gt+%222015-10-01T00%3A00%3A00.000Z%22>; rel="next"

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
          "href": "https://{yourOktaDomain}/img/logos/groups/okta-medium.png",
          "type": "image/png"
        },
        {
          "name": "large",
          "href": "https://{yourOktaDomain}/img/logos/groups/okta-large.png",
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
          "href": "https://{yourOktaDomain}/img/logos/groups/okta-medium.png",
          "type": "image/png"
        },
        {
          "name": "large",
          "href": "https://{yourOktaDomain}/img/logos/groups/okta-large.png",
          "type": "image/png"
        }
      ],
      "users": {
        "href": "https://{yourOktaDomain}/api/v1/groups/00gak46y5hydV6NdM0g4/users"
      },
      "apps": {
        "href": "https://{yourOktaDomain}/api/v1/groups/00gak46y5hydV6NdM0g4/apps"
      }
    }
  }
]
```

### Update Group


<ApiOperation method="put" url="/api/v1/groups/${groupId}" />

Updates the profile for a group with `OKTA_GROUP` type from your organization.

> Only profiles for groups with `OKTA_GROUP` type can be modified.<br>
> Application imports are responsible for updating group profiles with `APP_GROUP` type such as Active Directory groups.

##### Request Parameters


| Parameter | Description                   | ParamType | DataType                          | Required | Default |
| --------- | ----------------------------- | --------- | --------------------------------- | -------- | ------- |
| id        | id of the group to update     | URL       | String                            | TRUE     |         |
| profile   | Updated profile for the group | Body      | [Profile Object](#profile-object) | TRUE     |         |

> All profile properties must be specified when updating a groups's profile, **partial updates are not supported!**

##### Response Parameters


Updated [Group](#group-model)

##### Request Example


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
}' "https://{yourOktaDomain}/api/v1/groups/00ub0oNGTSWTBKOLGLNR"
```

##### Response Example


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
        "href": "https://{yourOktaDomain}/img/logos/groups/okta-medium.png",
        "type": "image/png"
      },
      {
        "name": "large",
        "href": "https://{yourOktaDomain}/img/logos/groups/okta-large.png",
        "type": "image/png"
      }
    ],
    "users": {
      "href": "https://{yourOktaDomain}/api/v1/groups/00ub0oNGTSWTBKOLGLNR/users"
    },
    "apps": {
      "href": "https://{yourOktaDomain}/api/v1/groups/00ub0oNGTSWTBKOLGLNR/apps"
    }
  }
}
```

### Remove Group


<ApiOperation method="delete" url="/api/v1/groups/${groupId}" />

Removes a group with `OKTA_GROUP` type from your organization.

> Only groups with `OKTA_GROUP` type can be removed.<br>
> Application imports are responsible for removing groups with `APP_GROUP` type such as Active Directory groups.

##### Request Parameters


| Parameter | Description                 | ParamType | DataType | Required | Default |
| --------- | --------------------------- | --------- | -------- | -------- | ------- |
| id        | `id` of the group to delete | URL       | String   | TRUE     |         |

##### Response Parameters


N/A

##### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups/00ub0oNGTSWTBKOLGLNR"
```


##### Response Example


```http
HTTP/1.1 204 No Content
```

## Group Member Operations

### List Group Members


<ApiOperation method="get" url="/api/v1/groups/${groupId}/users" />

Enumerates all [users](/docs/api/resources/users#user-model) that are a member of a group.

##### Request Parameters


| Parameter | Description                                                | ParamType | DataType | Required | Default |
| --------- | ---------------------------------------------------------- | --------- | -------- | -------- | ------- |
| id        | `id` of the group                                          | URL       | String   | TRUE     |         |
| limit     | Specifies the number of user results in a page             | Query     | Number   | FALSE    | 10000   |
| after     | Specifies the pagination cursor for the next page of users | Query     | String   | FALSE    |         |

> The `after` cursor should treated as an opaque value and obtained through the next link relation. See [Pagination](/docs/api/getting_started/design_principles#pagination)

The default user limit is set to a very high number due to historical reasons which is no longer valid for most organizations.  This will change in a future version of this API.  The recommended page limit is now `limit=200`.

> If you receive a HTTP 500 status code, you more than likely have exceeded the request timeout.  Retry your request with a smaller `limit` and page the results (See [Pagination](/docs/api/getting_started/design_principles#pagination))

##### Response Parameters


Array of [Users](/docs/api/resources/users#user-model)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups/00g1fanEFIQHMQQJMHZP/users?limit=200"
```

##### Response Example


```http
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://{yourOktaDomain}/api/v1/groups/00g1fanEFIQHMQQJMHZP/users?limit=200>; rel="self"
Link: <https://{yourOktaDomain}/api/v1/groups/00g1fanEFIQHMQQJMHZP/users?after=00u1f9cMYQZFMPVXIDIZ&limit=200>; rel="next"

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
        "href": "https://{yourOktaDomain}/api/v1/users/00u1f96ECLNVOKVMUSEA"
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
        "href": "https://{yourOktaDomain}/api/v1/users/00u1f9cMYQZFMPVXIDIZ"
      }
    }
  }
]
```

### Add User to Group


<ApiOperation method="put" url="/api/v1/groups/${groupId}/users/${userId}" />

Adds a [user](/docs/api/resources/users#user-model) to a group with `OKTA_GROUP` type.

> Only memberships for groups with `OKTA_GROUP` type can be modified.<br>
> Application imports are responsible for managing group memberships for groups with `APP_GROUP` type such as Active Directory groups.

##### Request Parameters


| Parameter | Description     | ParamType | DataType | Required | Default |
| --------- | --------------- | --------- | -------- | -------- | ------- |
| groupId   | id of the group | URL       | String   | TRUE     |         |
| userId    | `id` of a user  | URL       | String   | TRUE     |         |

##### Response Parameters


N/A

##### Request Example


```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups/00g1fanEFIQHMQQJMHZP/users/00u1f96ECLNVOKVMUSEA"
```

##### Response Example


```http
HTTP/1.1 204 No Content
```

### Remove User from Group


<ApiOperation method="delete" url="/api/v1/groups/${groupId}/users/${userId}" />

Removes a [user](/docs/api/resources/users#user-model) from a group with `OKTA_GROUP` type.

> Only memberships for groups with `OKTA_GROUP` type can be modified.<br>
> Application imports are responsible for managing group memberships for groups with `APP_GROUP` type such as Active Directory groups.

##### Request Parameters


| Parameter | Description       | ParamType | DataType | Required | Default |
| --------- | ----------------- | --------- | -------- | -------- | ------- |
| groupId   | `id` of the group | URL       | String   | TRUE     |         |
| userId    | `id` of a user    | URL       | String   | TRUE     |         |

##### Response Parameters


N/A

##### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups/00g1fanEFIQHMQQJMHZP/users/00u1f96ECLNVOKVMUSEA"
```

##### Response Example


```http
HTTP/1.1 204 No Content
```

## Group Rule Operations

### Create Group Rule


<ApiOperation method="post" url="/api/v1/groups/rules" />

Creates a group rule to dynamically add users to the specified group if they match the condition

> Group rules are created with status='INACTIVE'.

##### Request Parameters


| Parameter                           | Description                                                                                             | ParamType | DataType                          | Required | Default |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------- | --------- | --------------------------------- | -------- | ------- |
| condition.expression.value          | Okta expression which would result in a boolean value                                                   | Body      | String                            | TRUE     |         |
| condition.expression.type           | currently it is : urn:okta:expression:1.0                                                               | Body      | String                            | TRUE     |         |
| condition.people.users.exclude      | userIds which would be excluded when rules are processed                                                | Body      | String                            | FALSE    |         |
| condition.people.groups.exclude     | is currently not supported                                                                              | Body      | String                            | FALSE    |         |
| actions.assignUserToGroups.groupIds | List of groupIds to which users would be added. Currently we support only one group as target group     | Body      | String                            | TRUE     |         |

##### Response Parameters


Created [Rule](#rule-model)

##### Request Example


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
}' "https://{yourOktaDomain}/api/v1/groups/rules"
```

##### Response Example


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

### Update Group Rule


<ApiOperation method="put" url="/api/v1/groups/rules/${ruleId}" />

Updates a group rule.

> Only rules with status='INACTIVE' can be updated and <br>
> currently action section is not updatable.

##### Request Parameters


| Parameter                           | Description                                                                                             | ParamType | DataType                          | Required | Default |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------- | --------- | --------------------------------- | -------- | ------- |
| id                                  | id of the rule to be updated                                                                            | Body      | String                            | TRUE     |         |
| status                              | valid statuses are ACTIVE, INACTIVE and INVALID                                                         | Body      | String                            | TRUE     |         |
| condition.expression.value          | okta expression which would result in a boolean value                                                   | Body      | String                            | TRUE     |         |
| condition.expression.type           | currently it is : urn:okta:expression:1.0                                                               | Body      | String                            | TRUE     |         |
| condition.people.users.exclude      | userIds which would be excluded when rules are processed                                                | Body      | String                            | FALSE    |         |
| condition.people.groups.exclude     | is currently not supported                                                                              | Body      | String                            | FALSE    |         |
| actions.assignUserToGroups.groupIds | List of groupIds to which users would be added. Currently we support only one group as target group     | Body      | String                            | TRUE     |         |

##### Response Parameters


Updated [Rule](#rule-model)

##### Request Example


```bash
curl -v -X POST \
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
}' "https://{yourOktaDomain}/api/v1/groups/rules/0pr3f7zMZZHPgUoWO0g4"
```

##### Response Example


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

### List Group Rules


<ApiOperation method="get" url="/api/v1/groups/rules" />

Lists all group rules for your organization.

> If you don't specify any value for limit, a maximum of 50 results are returned.<br>
> The maximum value for limit is 300.

##### Request Parameters


| Parameter      | Description                                                  | ParamType  | DataType                          | Required | Default |
| -------------- | ------------------------------------------------------------ | ---------- | --------------------------------- | -------- | ------- |
| limit          | Specifies the number of rule results in a page               | Query      | Number                            | FALSE    | 50      |
| after          | Specifies the pagination cursor for the next page of rules   | Query      | String                            | FALSE    |         |

##### Response Parameters


Array of [Rules](#rule-model)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups/rules?limit=30"
```

##### Response Example


```json
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://{yourOktaDomain}/api/v1/groups/rules?limit=20>; rel="self"
Link: <https://{yourOktaDomain}/api/v1/groups/rules?after=0pr3f7zMZZHPgUoWO0g4&limit=20>; rel="next"
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

### Get Group Rule


<ApiOperation method="get" url="/api/v1/groups/rules/${ruleId}" />

Fetches a specific group rule by id from your organization

##### Request Parameters


| Parameter      | Description                                                  | ParamType  | DataType                          | Required | Default |
| -------------- | ------------------------------------------------------------ | ---------- | --------------------------------- | -------- | ------- |
| id             | id of a group rule                                           | URL        | String                            | TRUE     |         |

##### Response Parameters


Specified [Rule](#rule-model)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups/rules/0pr3f7zMZZHPgUoWO0g4"
```

##### Response Example


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

### Delete a group Rule


<ApiOperation method="delete" url="/api/v1/groups/rules/${ruleId}" />

Removes a specific group rule by id from your organization

##### Request Parameters


| Parameter      | Description                                                  | ParamType  | DataType                          | Required | Default |
| -------------- | ------------------------------------------------------------ | ---------- | --------------------------------- | -------- | ------- |
| id             | id of a group rule                                           | URL        | String                            | TRUE     |         |

##### Response Parameters


N/A

##### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups/rules/0pr3f7zMZZHPgUoWO0g4"
```

##### Response Example


```http
HTTP/1.1 202 No Content
```

### Activate a group Rule


<ApiOperation method="post" url="/api/v1/groups/rules/${ruleId}/lifecycle/activate" />

Activates a specific group rule by id from your organization

##### Request Parameters


| Parameter      | Description                                                  | ParamType  | DataType                          | Required | Default |
| -------------- | ------------------------------------------------------------ | ---------- | --------------------------------- | -------- | ------- |
| id             | id of a group rule                                           | URL        | String                            | TRUE     |         |

##### Response Parameters


N/A

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups/rules/0pr3f7zMZZHPgUoWO0g4/lifecycle/activate"
```

##### Response Example


```http
HTTP/1.1 200 No Content
```

### Deactivate a group Rule


<ApiOperation method="post" url="/api/v1/groups/rules/${ruleId}/lifecycle/deactivate" />

Deactivates a specific group rule by id from your organization

##### Request Parameters


| Parameter      | Description                                                  | ParamType  | DataType                          | Required | Default |
| -------------- | ------------------------------------------------------------ | ---------- | --------------------------------- | -------- | ------- |
| id             | id of a group rule                                           | URL        | String                            | TRUE     |         |

##### Response Parameters


N/A

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups/rules/0pr3f7zMZZHPgUoWO0g4/lifecycle/deactivate"
```

##### Response Example


```http
HTTP/1.1 200 No Content
```

## Related Resources

### List Assigned Applications


<ApiOperation method="get" url="/api/v1/groups/${groupId}/apps" />

Enumerates all [applications](/docs/api/resources/apps#application-model) that are assigned to a group. See [Application Group Operations](/docs/api/resources/apps#application-group-operations)

##### Request Parameters


| Parameter | Description                                               | ParamType | DataType | Required | Default |
| --------- | --------------------------------------------------------- | --------- | -------- | -------- | ------- |
| id        | id of the group                                           | URL       | String   | TRUE     |         |
| limit     | Specifies the number of app results for a page            | Query     | Number   | FALSE    | 20      |
| after     | Specifies the pagination cursor for the next page of apps | Query     | String   | FALSE    |         |

> The page cursor should treated as an opaque value and obtained through the next link relation. See [Pagination](/docs/api/getting_started/design_principles#pagination)

##### Response Parameters


Array of [Applications](/docs/api/resources/apps#application-model)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/groups/00g1fanEFIQHMQQJMHZP/apps"
```

##### Response Example


```http
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://{yourOktaDomain}/api/v1/groups/00g1fanEFIQHMQQJMHZP/apps>; rel="self"
Link: <https://{yourOktaDomain}/api/v1/groups/00g1fanEFIQHMQQJMHZP/apps?after=0oafxqCAJWWGELFTYASJ>; rel="next"

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
                    "href": "https://{yourOktaDomain}/home/template_basic_auth/0oafwvZDWJKVLDCUWUAC/1438",
                    "name": "login",
                    "type": "text/html"
                }
            ],
            "users": {
                "href": "https://{yourOktaDomain}/api/v1/apps/0oafwvZDWJKVLDCUWUAC/users"
            },
            "deactivate": {
                "href": "https://{yourOktaDomain}/api/v1/apps/0oafwvZDWJKVLDCUWUAC/lifecycle/deactivate"
            },
            "groups": {
                "href": "https://{yourOktaDomain}/api/v1/apps/0oafwvZDWJKVLDCUWUAC/groups"
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
                    "href": "https://{yourOktaDomain}/home/bookmark/0oafxqCAJWWGELFTYASJ/1280",
                    "name": "login",
                    "type": "text/html"
                }
            ],
            "users": {
                "href": "https://{yourOktaDomain}/api/v1/apps/0oafxqCAJWWGELFTYASJ/users"
            },
            "deactivate": {
                "href": "https://{yourOktaDomain}/api/v1/apps/0oafxqCAJWWGELFTYASJ/lifecycle/deactivate"
            },
            "groups": {
                "href": "https://{yourOktaDomain}/api/v1/apps/0oafxqCAJWWGELFTYASJ/groups"
            }
        }
    }
]
```

## Group Model

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
        "href": "https://{yourOktaDomain}/img/logos/groups/okta-medium.png",
        "type": "image/png"
      },
      {
        "name": "large",
        "href": "https://{yourOktaDomain}/img/logos/groups/okta-large.png",
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
```

### Group Attributes

All groups have the following properties:

| Property              | Description                                                  | DataType                                                       | Nullable | Unique | Readonly | MinLength | MaxLength | Validation |
| --------------------- | ------------------------------------------------------------ | -------------------------------------------------------------- | -------- | ------ | -------- | --------- | --------- | ---------- |
| id                    | unique key for group                                         | String                                                         | FALSE    | TRUE   | TRUE     |           |           |            |
| created               | timestamp when group was created                             | Date                                                           | FALSE    | FALSE  | TRUE     |           |           |            |
| lastUpdated           | timestamp when group's `profile` was last updated            | Date                                                           | FALSE    | FALSE  | TRUE     |           |           |            |
| lastMembershipUpdated | timestamp when group's memberships were last updated         | Date                                                           | FALSE    | FALSE  | TRUE     |           |           |            |
| objectClass           | determines the group's `profile`                             | Array of String                                                | TRUE     | FALSE  | TRUE     | 1         |           |            |
| type                  | determines how a group's profile and memberships are managed | [Group Type](#group-type)                                      | FALSE    | FALSE  | TRUE     |           |           |            |
| profile               | the group's profile properties                               | [Profile Object](#profile-object)                              | FALSE    | FALSE  | FALSE    |           |           |            |
| _links                | [discoverable resources](#links-object) related to the group | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |           |           |            |
| _embedded             | embedded resources related to the group                      | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |           |           |            |


> `id`, `created`, `lastUpdated`, `lastMembershipUpdated`, `objectClass`, `type`, and `_links` are only available after a group is created

### Group Type

Okta supports several types of groups that constrain how the group's profile and memberships are managed.

| Type         | Description                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------- |
| `OKTA_GROUP` | Group profile and memberships are directly managed in Okta via static assignments or indirectly via group rules |
| `APP_GROUP`  | Group profile and memberships are imported and must be managed within the application that imported the group   |
| `BUILT_IN`   | Group profile and memberships are managed by Okta and cannot be modified                                        |

> Active Directory and LDAP groups will also have `APP_GROUP` type

### Profile Object

Specifies required and optional properties for a group.  The `objectClass` of group determines what additional properties are available.

#### ObjectClass: okta:user_group

Profile for any group that is **not** imported from Active Directory

| Property    | Description              | DataType | Nullable | Readonly | MinLength | MaxLength | Validation |
| ----------- | ------------------------ | -------- | -------- | -------- | --------- | --------- | ---------- |
| name        | name of the group        | String   | FALSE    | FALSE    | 1         | 255       |            |
| description | description of the group | String   | TRUE     | FALSE    | 0         | 1024      |            |

```json
{
  "name": "West Coast Users",
  "description": "All Users West of The Rockies"
}
```

## Rule Model

The Group Rules API is currently a <ApiLifecycle access="beta" /> release.

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

Profile for a group that is imported from Active Directory

| Property                   | Description                                            | DataType | Nullable  | Readonly | MinLength | MaxLength | Validation |
| -------------------------- | ------------------------------------------------------ | -------- | --------- | -------- | --------- | --------- | ---------- |
| name                       | name of the windows group                              | String   | FALSE     | TRUE     |           |           |            |
| description                | description of the windows group                       | String   | FALSE     | TRUE     |           |           |            |
| samAccountName             | pre-windows 2000 name of the windows group             | String   | FALSE     | TRUE     |           |           |            |
| dn                         | the distinguished name of the windows group            | String   | FALSE     | TRUE     |           |           |            |
| windowsDomainQualifiedName | fully-qualified name of the windows group              | String   | FALSE     | TRUE     |           |           |            |
| externalId                 | base-64 encoded GUID (objectGUID) of the windows group | String   | FALSE     | TRUE     |           |           |            |

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

### Links Object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the group using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification.  This object is used for dynamic discovery of related resources and lifecycle operations.

| Link Relation Type | Description                                                                                                                                                     |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| self               | The primary URL for the group                                                                                                                                   |
| logo               | Provides links to logo images for the group if available                                                                                                        |
| users              | Provides [group member operations](#group-member-operations) for the group                                                                                      |
| apps               | Lists all [applications](/docs/api/resources/apps#application-model) that are assigned to the group. See [Application Group Operations](/docs/api/resources/apps#application-group-operations)          |

> The Links Object is read only.
