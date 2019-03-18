---
title: Zones
category: management
---

# Zones API

> This API is an <ApiLifecycle access="ea" /> feature.

The Okta Zones API provides operations to manage zones in your organization. Zones may be used to guide policy decisions.

IP zones are the only type currently supported by the Zones API. IP zones are used to group IP address ranges so that policy decisions can be made based on the client's IP location.

## Zone API Operations

### Create an IP Zone


<ApiOperation method="post" url="/api/v1/zones" />

Creates a new IP Zone

#### Valid Request Example

```bash
curl -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "IP",
  "id": null,
  "name": "newNetworkZone",
  "status": "ACTIVE",
  "created": null,
  "lastUpdated": null,
  "system": false,
  "gateways": [
    {
      "type": "CIDR",
      "value": "1.2.3.4/24"
    },
    {
      "type": "CIDR",
      "value": "2.3.4.5/24"
    }
  ],
  "proxies": [
    {
      "type": "CIDR",
      "value": "2.2.3.4/24"
    },
    {
      "type": "CIDR",
      "value": "3.3.4.5/24"
    }
  ]
}' "https://{yourOktaDomain}/api/v1/zones"
```

#### Successful Response Example

```json
{
  "type": "IP",
  "id": "nzouagptWUz5DlLfM0g3",
  "name": "newNetworkZone",
  "status": "ACTIVE",
  "created": "2017-01-24T19:52:34.000Z",
  "lastUpdated": "2017-01-24T19:52:34.000Z",
  "system": false,
  "gateways": [
    {
      "type": "CIDR",
      "value": "1.2.3.4/24"
    },
    {
      "type": "CIDR",
      "value": "2.3.4.5/24"
    }
  ],
  "proxies": [
    {
      "type": "CIDR",
      "value": "2.2.3.4/24"
    },
    {
      "type": "CIDR",
      "value": "3.3.4.5/24"
    }
  ],
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/zones/nzouagptWUz5DlLfM0g3",
      "hints": {
        "allow": [
          "GET",
          "PUT",
          "DELETE"
        ]
      }
    },
    "deactivate": {
      "href": "https://{yourOktaDomain}/api/v1/zones/nzouagptWUz5DlLfM0g3/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Invalid Request Example

```bash
curl -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "IP",
  "id": null,
  "name": "Zone with Invalid IP Range",
  "status": "ACTIVE",
  "created": null,
  "lastUpdated": null,
  "system": false,
  "gateways": [
    {
      "type": "RANGE",
      "value": "1.2.3.4.5-1.2.3.6"
    }
  ],
  "proxies": [
    {
      "type": "CIDR",
      "value": "2.2.3.4/24"
    }
  ]
}' "https://{yourOktaDomain}/api/v1/zones"
```

#### Unsuccessful Response Example

```json
{
    "errorCode": "E0000001",
    "errorSummary": "Api validation failed: gateways",
    "errorLink": "E0000001",
    "errorId": "oae_LwW8xNqTqCzUpBh-plasQ",
    "errorCauses": [
        {
            "errorSummary": "gateways: The IP: 1.2.3.4.5 in the RANGE: 1.2.3.4.5-1.2.3.6 is invalid. Make sure it is a valid IPV4."
        }
    ]
}
```

### Get an IP Zone
<ApiOperation method="get" url="/api/v1/zones/${zoneId}" />

Gets an IP zone by id

#### Request Parameters


The zone ID described in the [Zone Object](#ZoneModel) is required.

#### Request Example

```bash
curl -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/zones/nzoo6s03dLsg2I7HK0g3"
```

#### Response Example
```json
{
    "type": "IP",
    "id": "nzoo6s03dLsg2I7HK0g3",
    "name": "BlockedIpZone",
    "status": "ACTIVE",
    "created": "2017-07-28T23:24:36.000Z",
    "lastUpdated": "2017-08-14T20:41:08.000Z",
    "system": true,
    "gateways": [
        {
            "type": "RANGE",
            "value": "123.123.123.123-123.123.123.123"
        }
    ],
    "proxies": null,
    "_links": {
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/zones/nzoo6s03dLsg2I7HK0g3",
            "hints": {
                "allow": [
                    "GET",
                    "PUT",
                    "DELETE"
                ]
            }
        },
        "deactivate": {
            "href": "https://{yourOktaDomain}/api/v1/zones/nzoo6s03dLsg2I7HK0g3/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### List Zones
<ApiOperation method="get" url="/api/v1/zones" />

Lists all zones

A subset of zones can be returned that match a supported filter expression or query criteria.

##### Request Parameters


- [List All Zones](#list-all-zones) (no parameters)
- [List Zones with a Filter](#list-zones-with-a-filter) (`filter`)

| Parameter  | Description                                                                                                                        | Param Type | DataType | Required |
|:-----------|:-----------------------------------------------------------------------------------------------------------------------------------|:-----------|:---------|:---------|
| filter     | [Filter](/docs/api/getting_started/design_principles#filtering) zones with a supported expression for a subset of properties  | Query      | String   |    No    |
| limit      | Specifies the number of results returned                                                                                           | Query      | Integer  |    No    |

##### Response Parameters


Array of [Zones](#ZoneModel)

#### List All Zones


Returns a list of all zones

##### Request Example

```bash
curl -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/zones"
```

##### Response Example

```json
[
    {
        "id": "nzoo6s03dLsg2I7HK0g3",
        "name": "BlockedIpZone",
        "type": "IP",
        "status": "ACTIVE",
        "created": "2017-07-28T23:24:36.000Z",
        "lastUpdated": "2017-08-14T20:41:08.000Z",
        "system": true,
        "gateways": [
            {
                "type": "RANGE",
                "value": "123.123.123.123-123.123.123.123"
            }
        ],
        "proxies": null,
        "_links": {
            "self": {
                "href": "https://{yourOktaDomain}/api/v1/zones/nzoo6s03dLsg2I7HK0g3",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT",
                        "DELETE"
                    ]
                }
            },
            "deactivate": {
                "href": "https://{yourOktaDomain}/api/v1/zones/nzoo6s03dLsg2I7HK0g3/lifecycle/deactivate",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            }
        }
    },
    {
        "id": "nzoo6rs9ZUobuTcsr0g3",
        "name": "LegacyIpZone",
        "type": "IP",
        "status": "ACTIVE",
        "created": "2017-07-28T23:24:36.000Z",
        "lastUpdated": "2017-08-14T21:34:45.000Z",
        "system": true,
        "gateways": [
            {
                "type": "RANGE",
                "value": "127.0.0.1-127.0.0.1"
            }
        ],
        "proxies": null,
        "_links": {
            "self": {
                "href": "https://{yourOktaDomain}/api/v1/zones/nzoo6rs9ZUobuTcsr0g3",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT",
                        "DELETE"
                    ]
                }
            },
            "deactivate": {
                "href": "https://{yourOktaDomain}/api/v1/zones/nzoo6rs9ZUobuTcsr0g3/lifecycle/deactivate",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            }
        }
    },
    {
        "id": "nzowduJMXKsPkRqL40g3",
        "name": "AiurIpZone",
        "type": "IP",
        "status": "ACTIVE",
        "created": "2017-08-14T20:08:15.000Z",
        "lastUpdated": "2017-08-14T20:08:15.000Z",
        "system": false,
        "gateways": [
            {
                "type": "RANGE",
                "value": "127.0.0.1-127.0.0.1"
            }
        ],
        "proxies": null,
        "_links": {
            "self": {
                "href": "https://{yourOktaDomain}/api/v1/zones/nzowduJMXKsPkRqL40g3",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT",
                        "DELETE"
                    ]
                }
            },
            "deactivate": {
                "href": "https://{yourOktaDomain}/api/v1/zones/nzowduJMXKsPkRqL40g3/lifecycle/deactivate",
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

#### List Zones with a Filter


Lists all zones that match the filter criteria

This operation requires [URL encoding](/docs/api/getting_started/design_principles#filtering). For example, `filter=(id eq "nzoul0wf9jyb8xwZm0g3" or id eq "nzoul1MxmGN18NDQT0g3")` is encoded as `filter=%28id+eq+%22nzoul0wf9jyb8xwZm0g3%22+or+id+eq+%22nzoul1MxmGN18NDQT0g3%22%29`.

See [Filtering](/docs/api/getting_started/design_principles#filtering) for more information about the expressions used in filtering.

##### Request Example

```bash
curl -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/zones?limit=100&filter=%28id+eq+%22nzoul0wf9jyb8xwZm0g3%22+or+id+eq+%22nzoul1MxmGN18NDQT0g3%22%29"
```

##### Response Example

```json
[
  {
    "id": "nzoul0wf9jyb8xwZm0g3",
    "name": "0",
    "type": "IP",
    "status": "ACTIVE",
    "created": "2017-01-24T19:52:48.000Z",
    "lastUpdated": "2017-01-24T19:52:48.000Z",
    "system": false,
    "gateways": [
      {
        "type": "CIDR",
        "value": "1.2.3.4/24"
      },
      {
        "type": "CIDR",
        "value": "2.3.4.5/24"
      },
      {
        "type": "RANGE",
        "value": "3.4.5.6-3.4.5.8"
      },
      {
        "type": "RANGE",
        "value": "4.5.6.7-4.5.6.9"
      }
    ],
    "proxies": [
      {
        "type": "CIDR",
        "value": "2.2.3.4/24"
      },
      {
        "type": "CIDR",
        "value": "3.3.4.5/24"
      },
      {
        "type": "RANGE",
        "value": "4.4.5.6-4.4.5.8"
      },
      {
        "type": "RANGE",
        "value": "5.5.6.7-5.5.6.9"
      }
    ],
    "_links": {
      "self": {
        "href": "https://{yourOktaDomain}/api/v1/zones/nzoul0wf9jyb8xwZm0g3",
        "hints": {
          "allow": [
            "GET",
            "PUT",
            "DELETE"
          ]
        }
      },
      "deactivate": {
        "href": "https://{yourOktaDomain}/api/v1/zones/nzoul0wf9jyb8xwZm0g3/lifecycle/deactivate",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },
  {
    "id": "nzoul1MxmGN18NDQT0g3",
    "name": "1",
    "type": "IP",
    "status": "ACTIVE",
    "created": "2017-01-24T19:52:48.000Z",
    "lastUpdated": "2017-01-24T19:52:48.000Z",
    "system": false,
    "gateways": [
      {
        "type": "CIDR",
        "value": "1.2.3.4/24"
      },
      {
        "type": "CIDR",
        "value": "2.3.4.5/24"
      },
      {
        "type": "RANGE",
        "value": "3.4.5.6-3.4.5.8"
      },
      {
        "type": "RANGE",
        "value": "4.5.6.7-4.5.6.9"
      }
    ],
    "proxies": [
      {
        "type": "CIDR",
        "value": "2.2.3.4/24"
      },
      {
        "type": "CIDR",
        "value": "3.3.4.5/24"
      },
      {
        "type": "RANGE",
        "value": "4.4.5.6-4.4.5.8"
      },
      {
        "type": "RANGE",
        "value": "5.5.6.7-5.5.6.9"
      }
    ],
    "_links": {
      "self": {
        "href": "https://{yourOktaDomain}/api/v1/zones/nzoul1MxmGN18NDQT0g3",
        "hints": {
          "allow": [
            "GET",
            "PUT",
            "DELETE"
          ]
        }
      },
      "deactivate": {
        "href": "https://{yourOktaDomain}/api/v1/zones/nzoul1MxmGN18NDQT0g3/lifecycle/deactivate",
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

### Update an IP Zone


<ApiOperation method="put" url="/api/v1/zones/${zoneId}" />

Updates an existing IP Zone

#### Request Parameters


The zone ID described in the [Zone Object](#ZoneModel) is required.

#### Request Example

```bash
curl -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "IP",
  "id": "nzovw2rFz2YoqmvwZ0g3",
  "name": "UpdatedNetZone",
  "status": "ACTIVE",
  "created": "2017-01-24T19:53:28.000Z",
  "lastUpdated": "2017-01-24T19:53:28.000Z",
  "system": false,
  "gateways": [
    {
      "type": "CIDR",
      "value": "10.2.3.4/24"
    },
    {
      "type": "CIDR",
      "value": "12.3.4.5/24"
    },
    {
      "type": "RANGE",
      "value": "13.4.5.6-13.4.5.8"
    },
    {
      "type": "RANGE",
      "value": "14.5.6.7-14.5.6.9"
    }
  ],
  "proxies": [
    {
      "type": "CIDR",
      "value": "12.2.3.4/24"
    },
    {
      "type": "CIDR",
      "value": "13.3.4.5/24"
    },
    {
      "type": "RANGE",
      "value": "14.4.5.6-14.4.5.8"
    },
    {
      "type": "RANGE",
      "value": "15.5.6.7-15.5.6.9"
    }
  ],
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/zones/nzovw2rFz2YoqmvwZ0g3",
      "hints": {
        "allow": [
          "GET",
          "PUT",
          "DELETE"
        ]
      }
    },
    "deactivate": {
      "href": "https://{yourOktaDomain}/api/v1/zones/nzovw2rFz2YoqmvwZ0g3/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}' "https://{yourOktaDomain}/api/v1/zones/nzovw2rFz2YoqmvwZ0g3"
```

#### Response Example

```json
{
  "type": "IP",
  "id": "nzovw2rFz2YoqmvwZ0g3",
  "name": "UpdatedNetZone",
  "status": "ACTIVE",
  "created": "2017-01-24T19:53:28.000Z",
  "lastUpdated": "2017-01-24T19:53:28.000Z",
  "system": false,
  "gateways": [
    {
      "type": "CIDR",
      "value": "10.2.3.4/24"
    },
    {
      "type": "CIDR",
      "value": "12.3.4.5/24"
    },
    {
      "type": "RANGE",
      "value": "13.4.5.6-13.4.5.8"
    },
    {
      "type": "RANGE",
      "value": "14.5.6.7-14.5.6.9"
    }
  ],
  "proxies": [
    {
      "type": "CIDR",
      "value": "12.2.3.4/24"
    },
    {
      "type": "CIDR",
      "value": "13.3.4.5/24"
    },
    {
      "type": "RANGE",
      "value": "14.4.5.6-14.4.5.8"
    },
    {
      "type": "RANGE",
      "value": "15.5.6.7-15.5.6.9"
    }
  ],
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/zones/nzovw2rFz2YoqmvwZ0g3",
      "hints": {
        "allow": [
          "GET",
          "PUT",
          "DELETE"
        ]
      }
    },
    "deactivate": {
      "href": "https://{yourOktaDomain}/api/v1/zones/nzovw2rFz2YoqmvwZ0g3/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

## Zone Model


### IP Zone Properties

An IP zone defines several attributes:

|Field Name    | Description                                                                               | Data Type                                   | Required      | Max Length    |
|:-------------|:------------------------------------------------------------------------------------------|:--------------------------------------------|:--------------|:--------------|
|type          | Type of zone (currently it can only be IP)                                                | String                                      |   Yes         |     N/A       |
|id            | Unique identifier for this zone                                                           | String                                      | No (Assigned) |     N/A       |
|name          | Unique name for this zone                                                                 | String                                      |   Yes         | 128 (chars)   |
|gateways      | IP addresses (range or CIDR form) of this zone                                            | Array of [Address Objects](#address-object) |   No          | 150 (entries) |
|proxies       | IP addresses (range or CIDR form) allowed to forward request from gateway addresses above | Array of [Address Objects](#address-object) |   No          | 150 (entries) |

#### Address Object

Each address object specifies a set of IP addresses, expressed using either range or CIDR form.

|Field Name | Description                                              | Data Type | Required |
|:----------|:---------------------------------------------------------|:----------|:---------|
|type       | Format of the value - either CIDR or RANGE               |  String   |   No     |
|value      | Value in CIDR/RANGE form depending on the type specified |  String   |   No     |

#### Address Object Example (CIDR)
```json
{
    "type": "CIDR",
    "value": "1.2.3.4/24"
  }
```

#### Address Object Example (range)
```json
{
    "type": "RANGE",
    "value": "1.2.3.0-1.2.3.255"
  }
```

### IP Zone Example
```json
{
  "type": "IP",
  "id": "nzouagptWUz5DlLfM0g3",
  "name": "newNetworkZone",
  "status": "ACTIVE",
  "created": "2017-01-24T19:52:34.000Z",
  "lastUpdated": "2017-01-24T19:52:34.000Z",
  "system": false,
  "gateways": [
    {
      "type": "CIDR",
      "value": "1.2.3.4/24"
    },
    {
      "type": "RANGE",
      "value": "2.3.4.5-2.3.4.15"
    }
  ],
  "proxies": [
    {
      "type": "CIDR",
      "value": "2.2.3.4/24"
    },
    {
      "type": "RANGE",
      "value": "3.3.4.5-3.3.4.15"
    }
  ],
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/zones/nzouagptWUz5DlLfM0g3",
      "hints": {
        "allow": [
          "GET",
          "PUT",
          "DELETE"
        ]
      }
    },
    "deactivate": {
      "href": "https://{yourOktaDomain}/api/v1/zones/nzouagptWUz5DlLfM0g3/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```
