---
title: Trusted Origins
category: management
---

# Trusted Origins API

The Okta Trusted Origins API provides operations to manage Trusted Origins and sources.

When external URLs are requested during sign-in, sign-out, or recovery operations, Okta checks those URLs against the allowed list of Trusted Origins.
Trusted Origins also enable browser-based applications to access Okta APIs from JavaScript (CORS).
If the origins aren't specified, the related operation (redirect or Okta API access) isn't permitted.

## Trusted Origins API operations

### Create Trusted Origin


<ApiOperation method="post" url="/api/v1/trustedOrigins" />

Creates a new Trusted Origin

#### Valid request example

```bash
curl -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "New Trusted Origin",
  "origin": "http://example.com",
  "scopes": [
    {
      "type": "CORS"
    },
    {
      "type": "REDIRECT"
    }
  ]
}' "https://${yourOktaDomain}/api/v1/trustedOrigins"
```

#### Successful response example

```json
{
    "id": "tos10hu7rkbtrFt1M0g4",
    "name": "New Trusted Origin",
    "origin": "http://example.com",
    "status": "ACTIVE",
    "scopes": [
        {
            "type": "CORS"
        },
        {
            "type": "REDIRECT"
        }
    ],
    "created": "2018-01-13T01:11:44.000Z",
    "createdBy": "00ut5t92p6IEOi4bu0g3",
    "lastUpdated": "2018-01-13T01:11:44.000Z",
    "lastUpdatedBy": "00ut5t92p6IEOi4bu0g3",
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/trustedOrigins/tos10hu7rkbtrFt1M0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT",
                    "DELETE"
                ]
            }
        },
        "deactivate": {
            "href": "https://${yourOktaDomain}/api/v1/trustedOrigins/tos10hu7rkbtrFt1M0g4/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

#### Invalid request example

```bash
curl -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "Trusted Origin with Invalid Origin Value",
  "origin": "example.com",
  "scopes": [
    {
      "type": "CORS"
    },
    {
      "type": "REDIRECT"
    }
  ]
}' "https://${yourOktaDomain}/api/v1/trustedOrigins"
```

#### Unsuccessful response example

```json
{
    "errorCode": "E0000001",
    "errorSummary": "Api validation failed: origin",
    "errorLink": "E0000001",
    "errorId": "oaeHRVRe-oQQWChradByNOnHg",
    "errorCauses": [
        {
            "errorSummary": "origin: Origin value is not valid"
        }
    ]
}
```

### Get Trusted Origin
<ApiOperation method="get" url="/api/v1/trustedOrigins/${trustedOriginId}" />

Gets a Trusted Origin by ID

#### Request parameters


| Parameter         | Description              | Param Type | DataType | Required |
| ----------------- | ------------------------ | ---------- | -------- | -------- |
| `trustedOriginId` | `id` of a Trusted Origin | String     | String   | Yes      |

#### Response parameters


[Trusted Origin object](#trusted-origin-object)

#### Request example

```bash
curl -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/trustedOrigins/tosue7JvguwJ7U6kz0g3"
```

#### Response example
```json
    {
        "id": "tosue7JvguwJ7U6kz0g3",
        "name": "Example Trusted Origin",
        "origin": "http://example.com",
        "scopes": [
            {
                "type": "CORS"
            },
            {
                "type": "REDIRECT"
            }
        ],
        "status": "ACTIVE",
        "created": "2017-12-16T05:01:12.000Z",
        "createdBy": "00ut5t92p6IEOi4bu0g3",
        "lastUpdated": "2017-12-16T05:01:12.000Z",
        "lastUpdatedBy": "00ut5t92p6IEOi4bu0g3",
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/trustedOrigins/tosue7JvguwJ7U6kz0g3",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT",
                        "DELETE"
                    ]
                }
            },
            "deactivate": {
                "href": "https://${yourOktaDomain}/api/v1/trustedOrigins/tosue7JvguwJ7U6kz0g3/lifecycle/deactivate",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            }
        }
    }
```

### List Trusted Origins
<ApiOperation method="get" url="/api/v1/trustedOrigins" />

Lists all Trusted Origins

A subset of Trusted Origins that match a supported filter expression or query criteria is returned.

##### Request parameters


- [List all Trusted Origins](#list-all-trusted-origins) (no parameters)
- [List Trusted Origins with a filter](#list-trusted-origins-with-a-filter) (`filter`)

| Parameter    | Description                                                                                                                                       | Param Type   | DataType   | Required |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------ | :----------- | :--------- | :------- |
| filter       | [Filter](/docs/reference/api-overview/#filtering) Trusted Origins with a supported expression for a subset of properties            | Query        | String     | No       |
| limit        | Specifies the number of results returned                                                                                                          | Query        | Integer    | No       |

##### Response parameters


Array of [Trusted Origins](#trusted-origin-object)

#### List all Trusted Origins


Returns a list of all Trusted Origins

##### Request example

```bash
curl -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/trustedOrigins"
```

##### Response example

```json
[
    {
        "id": "tosue7JvguwJ7U6kz0g3",
        "name": "Example Trusted Origin",
        "origin": "http://example.com",
        "scopes": [
            {
                "type": "CORS"
            }
        ],
        "status": "ACTIVE",
        "created": "2018-01-13T01:22:10.000Z",
        "createdBy": "00ut5t92p6IEOi4bu0g3",
        "lastUpdated": "2018-01-13T01:22:10.000Z",
        "lastUpdatedBy": "00ut5t92p6IEOi4bu0g3",
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/trustedOrigins/tosue7JvguwJ7U6kz0g3",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT",
                        "DELETE"
                    ]
                }
            },
            "deactivate": {
                "href": "https://${yourOktaDomain}/api/v1/trustedOrigins/tosue7JvguwJ7U6kz0g3/lifecycle/deactivate",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            }
        }
    },
    {
        "id": "tos10hzarOl8zfPM80g4",
        "name": "Another Trusted Origin",
        "origin": "https://rf.example.com",
        "scopes": [
            {
                "type": "CORS"
            },
            {
                "type": "REDIRECT"
            }
        ],
        "status": "ACTIVE",
        "created": "2017-12-16T05:01:12.000Z",
        "createdBy": "00ut5t92p6IEOi4bu0g3",
        "lastUpdated": "2017-12-16T05:01:12.000Z",
        "lastUpdatedBy": "00ut5t92p6IEOi4bu0g3",
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/trustedOrigins/tos10hzarOl8zfPM80g4",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT",
                        "DELETE"
                    ]
                }
            },
            "deactivate": {
                "href": "https://${yourOktaDomain}/api/v1/trustedOrigins/tos10hzarOl8zfPM80g4/lifecycle/deactivate",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            }
        }
    },
    {
        "id": "tos10i0nu9m7pAlJQ0g4",
        "name": "Yet Another Trusted Origin",
        "origin": "http://yato.example.com",
        "scopes": [
            {
                "type": "CORS"
            },
            {
                "type": "REDIRECT"
            }
        ],
        "status": "ACTIVE",
        "created": "2018-01-13T01:48:32.000Z",
        "createdBy": "00ut5t92p6IEOi4bu0g3",
        "lastUpdated": "2018-01-13T01:48:32.000Z",
        "lastUpdatedBy": "00ut5t92p6IEOi4bu0g3",
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/trustedOrigins/tos10i0nu9m7pAlJQ0g4",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT",
                        "DELETE"
                    ]
                }
            },
            "deactivate": {
                "href": "https://${yourOktaDomain}/api/v1/trustedOrigins/tos10i0nu9m7pAlJQ0g4/lifecycle/deactivate",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            }
        }
    }
]
```

#### List Trusted Origins with a filter

Lists all Trusted Origins that match the filter criteria

This operation requires [URL encoding](/docs/reference/api-overview/#filtering). For example, `filter=(id eq "tosue7JvguwJ7U6kz0g3" or id eq "tos10hzarOl8zfPM80g4")` is encoded as `filter=%28id+eq+%22tosue7JvguwJ7U6kz0g3%22+or+id+eq+%22tos10hzarOl8zfPM80g4%22%29`.

See [Filtering](/docs/reference/api-overview/#filtering) for more information on the expressions used in filtering.

##### Request example

```bash
curl -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/trustedOrigins?limit=100&filter=%28id+eq+%22tosue7JvguwJ7U6kz0g3%22+or+id+eq+%22tos10hzarOl8zfPM80g4%22%29"
```

##### Response example

```json
[
    {
        "id": "tosue7JvguwJ7U6kz0g3",
        "name": "Example Trusted Origin",
        "origin": "http://example.com",
        "scopes": [
            {
                "type": "CORS"
            }
        ],
        "status": "ACTIVE",
        "created": "2018-01-13T01:22:10.000Z",
        "createdBy": "00ut5t92p6IEOi4bu0g3",
        "lastUpdated": "2018-01-13T01:22:10.000Z",
        "lastUpdatedBy": "00ut5t92p6IEOi4bu0g3",
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/trustedOrigins/tosue7JvguwJ7U6kz0g3",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT",
                        "DELETE"
                    ]
                }
            },
            "deactivate": {
                "href": "https://${yourOktaDomain}/api/v1/trustedOrigins/tosue7JvguwJ7U6kz0g3/lifecycle/deactivate",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            }
        }
    },
    {
        "id": "tos10hzarOl8zfPM80g4",
        "name": "Another Trusted Origin",
        "origin": "https://rf.example.com",
        "scopes": [
            {
                "type": "CORS"
            },
            {
                "type": "REDIRECT"
            }
        ],
        "status": "ACTIVE",
        "created": "2017-12-16T05:01:12.000Z",
        "createdBy": "00ut5t92p6IEOi4bu0g3",
        "lastUpdated": "2017-12-16T05:01:12.000Z",
        "lastUpdatedBy": "00ut5t92p6IEOi4bu0g3",
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/trustedOrigins/tos10hzarOl8zfPM80g4",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT",
                        "DELETE"
                    ]
                }
            },
            "deactivate": {
                "href": "https://${yourOktaDomain}/api/v1/trustedOrigins/tos10hzarOl8zfPM80g4/lifecycle/deactivate",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            }
        }
    }
]
```

### Update Trusted Origin

<ApiOperation method="put" url="/api/v1/trustedOrigins/${trustedOriginId}" />

Updates an existing Trusted Origin

#### Request parameters


| Parameter         | Description              | Param Type | DataType | Required |
| ----------------- | ------------------------ | ---------- | -------- | -------- |
| `trustedOriginId` | `id` of a Trusted Origin | String     | String   | Yes      |

#### Response parameters


[Trusted Origin object](#trusted-origin-object)

#### Request example

```bash
curl -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "id": "tosue7JvguwJ7U6kz0g3",
  "name": "Updated Example Trusted Origin",
  "origin": "http://updated.example.com",
  "scopes": [
    {
      "type": "CORS"
    },
    {
      "type": "REDIRECT"
    }
  ],
  "status": "ACTIVE",
  "created": "2017-12-16T05:01:12.000Z",
  "createdBy": "00ut5t92p6IEOi4bu0g3",
  "lastUpdated": "2017-12-16T05:01:12.000Z",
  "lastUpdatedBy": "00ut5t92p6IEOi4bu0g3",
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/trustedOrigins/tosue7JvguwJ7U6kz0g3",
      "hints": {
        "allow": [
          "GET",
          "PUT",
          "DELETE"
        ]
      }
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/trustedOrigins/tosue7JvguwJ7U6kz0g3/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}' "https://${yourOktaDomain}/api/v1/trustedOrigins/tosue7JvguwJ7U6kz0g3"
```

#### Response example

```json
{
    "id": "tosue7JvguwJ7U6kz0g3",
    "name": "Updated Example Trusted Origin",
    "origin": "http://updated.example.com",
    "scopes": [
        {
            "type": "CORS"
        },
        {
            "type": "REDIRECT"
        }
    ],
    "status": "ACTIVE",
    "created": "2017-12-16T05:01:12.000Z",
    "createdBy": "00ut5t92p6IEOi4bu0g3",
    "lastUpdated": "2018-01-17T21:25:40.000Z",
    "lastUpdatedBy": "00ut5t92p6IEOi4bu0g3",
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/trustedOrigins/tosue7JvguwJ7U6kz0g3",
            "hints": {
                "allow": [
                    "GET",
                    "PUT",
                    "DELETE"
                ]
            }
        },
        "deactivate": {
            "href": "https://${yourOktaDomain}/api/v1/trustedOrigins/tosue7JvguwJ7U6kz0g3/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Activate Trusted Origin


<ApiOperation method="post" url="/api/v1/trustedOrigins/${trustedOriginId}/lifecycle/activate" />

Activates an existing Trusted Origin

#### Request parameters


| Parameter         | Description              | Param Type | DataType | Required |
| ----------------- | ------------------------ | ---------- | -------- | -------- |
| `trustedOriginId` | `id` of a Trusted Origin | String     | String   | Yes      |

#### Response parameters


[Trusted Origin object](#trusted-origin-object)

#### Request example

```bash
curl -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/trustedOrigins/tos10hzarOl8zfPM80g4/lifecycle/activate"
```

#### Response example

```json
{
    "id": "tos10hzarOl8zfPM80g4",
    "name": "Another Trusted Origin",
    "origin": "https://rf.example.com",
    "scopes": [
        {
            "type": "CORS"
        }
    ],
    "status": "ACTIVE",
    "created": "2018-01-13T01:22:10.000Z",
    "createdBy": "00ut5t92p6IEOi4bu0g3",
    "lastUpdated": "2018-01-18T01:07:28.000Z",
    "lastUpdatedBy": "00ut5t92p6IEOi4bu0g3",
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/trustedOrigins/tos10hzarOl8zfPM80g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT",
                    "DELETE"
                ]
            }
        },
        "deactivate": {
            "href": "https://${yourOktaDomain}/api/v1/trustedOrigins/tos10hzarOl8zfPM80g4/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Deactivate Trusted Origin

<ApiOperation method="post" url="/api/v1/trustedOrigins/${trustedOriginId}/lifecycle/deactivate" />

Deactivates an existing Trusted Origin

#### Request parameters


| Parameter         | Description              | Param Type | DataType | Required |
| ----------------- | ------------------------ | ---------- | -------- | -------- |
| `trustedOriginId` | `id` of a Trusted Origin | String     | String   | Yes      |

#### Response parameters


[Trusted Origin object](#trusted-origin-object)

#### Request example

```bash
curl -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/trustedOrigins/tos10hzarOl8zfPM80g4/lifecycle/deactivate"
```

#### Response example

```json
{
    "id": "tos10hzarOl8zfPM80g4",
    "name": "Another Trusted Origin",
    "origin": "https://rf.example.com",
    "scopes": [
        {
            "type": "CORS"
        }
    ],
    "status": "INACTIVE",
    "created": "2018-01-13T01:22:10.000Z",
    "createdBy": "00ut5t92p6IEOi4bu0g3",
    "lastUpdated": "2018-01-18T01:18:26.000Z",
    "lastUpdatedBy": "00ut5t92p6IEOi4bu0g3",
    "_links": {
        "activate": {
            "href": "https://${yourOktaDomain}/api/v1/trustedOrigins/tos10hzarOl8zfPM80g4/lifecycle/activate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/trustedOrigins/tos10hzarOl8zfPM80g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT",
                    "DELETE"
                ]
            }
        }
    }
}
```

### Delete Trusted Origin


<ApiOperation method="delete" url="/api/v1/trustedOrigins/${trustedOriginId}" />

Deletes an existing Trusted Origin

#### Request parameters


| Parameter         | Description              | Param Type | DataType | Required |
| ----------------- | ------------------------ | ---------- | -------- | -------- |
| `trustedOriginId` | `id` of a Trusted Origin | String     | String   | Yes      |

#### Response parameters


[Trusted Origin object](#trusted-origin-object)

#### Request example

```bash
curl -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/trustedOrigins/tos10hzarOl8zfPM80g3"
```

#### Response example

Returns an empty object.

Passing an invalid Trusted Origin ID returns a `404 Not Found` status code with error code `E0000007`.

## Trusted Origin object

### Trusted Origin properties

A Trusted Origin defines several attributes:

| Field Name     | Description                                                  | Data Type                                 | Required        | Max Length      |
| :------------- | :----------------------------------------------------------- | :---------------------------------------- | :-------------- | :-------------- |
| id             | Unique identifier for the Trusted Origin                    | String                                    | No (assigned)   | N/A             |
| name           | Unique name for the Trusted Origin                          | String                                    | Yes             | 255 (chars)     |
| origin         | Unique origin URL for the Trusted Origin                    | String                                    | Yes             | 255 (chars)     |
| scopes         | Array of Scope types that this Trusted Origin is used for  | Array of [Scope objects](#scope-object)   | Yes             | 2 (Scope types) |

#### Scope object

Each Scope object specifies the type of Scope that its Trusted Origin is used for.

| Field Name  | Description                                                    | Data Type                         | Required |
| :---------- | :------------------------------------------------------------- | :-------------------------------- | :------- |
| type        | The Scope type, which can be either "CORS" or "REDIRECT"                  | String                            | Yes      |

#### Scope object example (CORS)
```json
{
    "type": "CORS"
}
```

#### Scope object example (redirect)
```json
{
    "type": "REDIRECT"
}
```

### Trusted Origin example
```json
{
    "id": "tosue7JvguwJ7U6kz0g3",
    "name": "Example Trusted Origin",
    "origin": "http://example.example.com",
    "scopes": [
        {
            "type": "CORS"
        },
        {
            "type": "REDIRECT"
        }
    ],
    "status": "ACTIVE",
    "created": "2017-12-16T05:01:12.000Z",
    "createdBy": "00ut5t92p6IEOi4bu0g3",
    "lastUpdated": "2018-01-17T21:25:40.000Z",
    "lastUpdatedBy": "00ut5t92p6IEOi4bu0g3",
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/trustedOrigins/tosue7JvguwJ7U6kz0g3",
            "hints": {
                "allow": [
                    "GET",
                    "PUT",
                    "DELETE"
                ]
            }
        },
        "deactivate": {
            "href": "https://${yourOktaDomain}/api/v1/trustedOrigins/tosue7JvguwJ7U6kz0g3/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```
