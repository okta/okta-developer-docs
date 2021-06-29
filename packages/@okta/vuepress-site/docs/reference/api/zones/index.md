---
title: Zones
category: management
---
# Zones API

> This API is an <ApiLifecycle access="ea" /> feature.

The Okta Zones API provides operations to manage Zones in your organization. There are two usage Zone types: Policy Network Zones and Block List Network Zones. Policy Network Zones are used to guide policy decisions. Block List Network Zones are used to deny access from certain IP addresses, locations, proxy types, or Autonomous System Numbers (ASNs) before policy evaluation.

A default system Policy Network Zone is provided in your Okta org. You can use the Zones API to modify the default Policy Network Zone or to create a custom Policy or Block List Network Zone. When you create your custom Zone, you can specify if the Zone is an IP Zone or a Dynamic Zone. An IP Zone allows you to define network perimeters around a set of IPs, whereas a Dynamic Zone allows you to define network perimeters around location, IP type, and ASNs.

## Zone object

### Base Network Zone properties

The following attributes are shared by all Network Zone objects:

| Field Name     | Description                                                                                 | Data Type                                     | Required        | Max Length    |
| :------------- | :------------------------------------------------------------------------------------------ | :-------------------------------------------- | :-------------- | :------------ |
| type           | Type of Zone: `IP`, `DYNAMIC`                                              | String                                        | Yes             | N/A           |
| id             | Unique identifier for this Zone                                                             | String                                        | No (Assigned)   | N/A           |
| name           | Unique name for this Zone                                                                   | String                                        | Yes             | 128 (chars)   |
| system           | Indicates if this is a system Network Zone. For admin-created Zones, this is always `false`.       | boolean                                        | No  (Assigned)           | N/A   |
| usage           | Usage of Zone: `POLICY`, `BLOCKLIST` 				| String                                        | No  		| N/A   |

> **Note**: The system IP Policy Network Zone (`LegacyIpZone`) is included by default in your Okta org. Notice that `system=true` for the `LegacyIpZone` object. Admin users can modify the name of this default system Zone and can add up to 5000 gateway or proxy IP entries.

### IP Zone properties

One of the following attributes must be defined. These attributes are defined by IP Zone objects:

| Field Name     | Description                                                                                 | Data Type                                     | Required        | Max Length    |
| :------------- | :------------------------------------------------------------------------------------------ | :-------------------------------------------- | :-------------- | :------------ |
| gateways       | IP addresses (range or CIDR form) of this Zone                                              | Array of [Address Objects](#address-object)   | No              | 150 (entries) |
| proxies        | IP addresses (range or CIDR form) that are allowed to forward a request from gateway addresses. These proxies are automatically trusted by Threat Insights. These proxies are used to identify the client IP of a request.   | Array of [Address Objects](#address-object)   | No              | 150 (entries) |

#### Address object

Each Address object specifies a set of IP addresses that are expressed using either range or CIDR form.

| Field Name  | Description                                                | Data Type   | Required |
| :---------- | :--------------------------------------------------------- | :---------- | :------- |
| type        | Format of the value: `CIDR`, `RANGE`                | String      | Yes       |
| value       | Value in CIDR/range form depending on the type specified   | String      | Yes       |

#### Address object example (CIDR)

```json
{
    "type": "CIDR",
    "value": "1.2.3.4/24"
  }
```

#### Address object example (range)

```json
{
    "type": "RANGE",
    "value": "1.2.3.0-1.2.3.255"
  }
```

### IP Zone example

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
  ]
}
```

### Dynamic Zone properties

One of the following attributes must be defined. These attributes are defined by Dynamic Zone objects:

| Field Name     | Description                                                                                 | Data Type                                     | Required        | Max Length    |
| :------------- | :------------------------------------------------------------------------------------------ | :-------------------------------------------- | :-------------- | :------------ |
| proxyType       | One of: `""` or `null` (when not specified), `Any` (meaning any proxy), `Tor`, `NotTorAnonymizer`                                            | String   | No              | N/A |
| locations        | The geolocations of this Zone   | Array of [Location objects](#location-object)   | No              | 75 (entries) |
| asns        | Format of each array value: a string representation of an ASN numeric value   | Array of Strings   | No              | 75 (entries) |

#### Location object

Each Location object specifies an [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code and an optional [ISO-3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) region code.

| Field Name  | Description                                                | Data Type   | Required |
| :---------- | :--------------------------------------------------------- | :---------- | :------- |
| country        | Format of the value: length 2 ISO-3166-1 country code                | String      | Yes       |
| region       | Format of the value: `countryCode`-`regionCode`, or `null` if empty  | String      | No       |

#### Location object example (with region)

```json
{
    "country": "AF",
    "region": "AF-BGL"
  }
```

#### Location object example (without region)

```json
{
    "country": "AF",
    "region": null
  }
```

### Dynamic Zone example

```json
{
    "type": "DYNAMIC",
    "id": "nzowc1U5Jh5xuAK0o0g3",
    "name": "test",
    "status": "ACTIVE",
    "created": "2019-05-17T18:44:31.000Z",
    "lastUpdated": "2019-05-21T13:50:49.000Z",
    "system": false,
    "locations": [{
        "country": "AX",
        "region": null
    },
    {
        "country": "AF",
        "region": "AF-BGL"
    }],
    "proxyType": "Any",
    "asns": ["23457"]
}
```

## Zone API operations

### Create a Policy Network Zone


<ApiOperation method="post" url="/api/v1/zones" />

Creates a new Policy Network Zone

#### Valid request example

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
}' "https://${yourOktaDomain}/api/v1/zones"
```

#### Successful response example

```json
{
  "type": "IP",
  "id": "nzouagptWUz5DlLfM0g3",
  "name": "newNetworkZone",
  "status": "ACTIVE",
  "usage": "POLICY",
  "created": "2017-01-24T19:52:34.000Z",
  "lastUpdated": "2017-01-24T19:52:34.000Z",
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
      "href": "https://${yourOktaDomain}/api/v1/zones/nzouagptWUz5DlLfM0g3",
      "hints": {
        "allow": [
          "GET",
          "PUT",
          "DELETE"
        ]
      }
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/zones/nzouagptWUz5DlLfM0g3/lifecycle/deactivate",
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
}' "https://${yourOktaDomain}/api/v1/zones"
```

#### Unsuccessful response example

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

### Create a Block List Network Zone


<ApiOperation method="post" url="/api/v1/zones" />

Creates a new Block List Network Zone

#### Request example

```bash
curl -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "IP",
  "id": null,
  "name": "newBlockListNetworkZone",
  "status": "ACTIVE",
  "usage": "BLOCKLIST",
  "created": null,
  "lastUpdated": null,
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
  "proxies": null
}' "https://${yourOktaDomain}/api/v1/zones"
```

#### Response example

```json
{
    "type": "IP",
    "id": "nzo1qasnPb1kqEq0e0g4",
    "name": "newBlockListNetworkZone",
    "status": "ACTIVE",
    "usage": "BLOCKLIST",
    "created": "2020-10-12T18:58:02.000Z",
    "lastUpdated": "2020-10-12T18:58:02.000Z",
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
    "proxies": null,
    "_links": {
        "self": {
            "href": "http://rain.okta1.com:1802/api/v1/zones/nzo1qasnPb1kqEq0e0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT",
                    "DELETE"
                ]
            }
        },
        "deactivate": {
            "href": "http://rain.okta1.com:1802/api/v1/zones/nzo1qasnPb1kqEq0e0g4/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Get a Network Zone

<ApiOperation method="get" url="/api/v1/zones/${zoneId}" />

Gets a Network Zone by ID

#### Request parameters

The Zone ID described in the [Zone object](#zone-object) is required.

#### Request example

```bash
curl -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/zones/nzowc1U5Jh5xuAK0o0g3"
```

#### Response example

```json
{
    "type": "DYNAMIC",
    "id": "nzowc1U5Jh5xuAK0o0g3",
    "name": "test",
    "status": "ACTIVE",
    "usage": "POLICY",
    "created": "2019-05-17T18:44:31.000Z",
    "lastUpdated": "2019-05-21T13:50:49.000Z",
    "system": false,
    "locations": [{
        "country": "AX",
        "region": null
    }],
    "proxyType": null,
    "asns": ["23457"],
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/zones/nzowc1U5Jh5xuAK0o0g3",
            "hints": {
                "allow": ["GET", "PUT", "DELETE"]
            }
        },
        "deactivate": {
            "href": "https://${yourOktaDomain}/api/v1/zones/nzowc1U5Jh5xuAK0o0g3/lifecycle/deactivate",
            "hints": {
                "allow": ["POST"]
            }
        }
    }
}
```

### List Zones

<ApiOperation method="get" url="/api/v1/zones" />

Lists all zones

A subset of Zones can be returned that match a supported filter expression or query criteria.

##### Request parameters


- [List all Zones](#list-all-zones) (no parameters)
- [List Zones with a filter](#list-zones-with-a-filter) (`filter`)

| Parameter    | Description                                                                                                                          | Param Type   | DataType   | Required |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------- | :----------- | :--------- | :------- |
| filter       | [Filter](/docs/reference/api-overview/#filtering) Zones with a supported expression for the `id` and `usage` properties         | Query        | String     | No       |
| limit        | Specifies the number of results returned                                                                                             | Query        | Integer    | No       |

##### Response parameters


Array of [Zones](#zone-object)

#### List all Zones


Returns a list of all zones

##### Request example

```bash
curl -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/zones"
```

##### Response example

```json
[
    {
        "id": "nzoo6s03dLsg2I7HK0g3",
        "name": "BlockedIpZone",
        "type": "IP",
        "status": "ACTIVE",
	"usage": "BLOCKLIST",
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
                "href": "https://${yourOktaDomain}/api/v1/zones/nzoo6s03dLsg2I7HK0g3",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT",
                        "DELETE"
                    ]
                }
            },
            "deactivate": {
                "href": "https://${yourOktaDomain}/api/v1/zones/nzoo6s03dLsg2I7HK0g3/lifecycle/deactivate",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            }
        }
    },
   {
        "id": "nzowc1U5Jh5xuAK0o0g3",
        "type": "DYNAMIC",
        "name": "test",
        "status": "ACTIVE",
	"usage": "POLICY",
        "created": "2019-05-17T18:44:31.000Z",
        "lastUpdated": "2019-05-21T13:50:49.000Z",
        "system": false,
        "locations": [{
            "country": "AX",
            "region": null
        }],
        "proxyType": null,
        "asns": ["23457"],
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/zones/nzowc1U5Jh5xuAK0o0g3",
                "hints": {
                    "allow": ["GET", "PUT", "DELETE"]
                }
            },
            "deactivate": {
                "href": "https://${yourOktaDomain}/api/v1/zones/nzowc1U5Jh5xuAK0o0g3/lifecycle/deactivate",
                "hints": {
                    "allow": ["POST"]
                }
            }
        }
    },
    {
        "id": "nzowduJMXKsPkRqL40g3",
        "name": "AiurIpZone",
        "type": "IP",
        "status": "ACTIVE",
	"usage": "POLICY",
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
                "href": "https://${yourOktaDomain}/api/v1/zones/nzowduJMXKsPkRqL40g3",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT",
                        "DELETE"
                    ]
                }
            },
            "deactivate": {
                "href": "https://${yourOktaDomain}/api/v1/zones/nzowduJMXKsPkRqL40g3/lifecycle/deactivate",
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

#### List Zones with a filter


Lists all Zones that match the filter criteria

This operation requires [URL encoding](/docs/reference/api-overview/#filtering). For example, `filter=(id eq "nzoul0wf9jyb8xwZm0g3" or id eq "nzoul1MxmGN18NDQT0g3")` is encoded as `filter=%28id+eq+%22nzoul0wf9jyb8xwZm0g3%22+or+id+eq+%22nzoul1MxmGN18NDQT0g3%22%29`.

We support filtering on the `id` and `usage` properties. See [Filtering](/docs/reference/api-overview/#filtering) for more information about the expressions used in filtering.

##### Request example

```bash
curl -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/zones?limit=100&filter=%28%28id+eq+%22nzoul0wf9jyb8xwZm0g3%22+or+id+eq+%22nzoul1MxmGN18NDQT0g3%22%29+and+usage+eq+%22POLICY%22%29"
```

##### Response example

```json
[
  {
    "id": "nzoul0wf9jyb8xwZm0g3",
    "name": "0",
    "type": "IP",
    "status": "ACTIVE",
    "usage": "POLICY",
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
        "href": "https://${yourOktaDomain}/api/v1/zones/nzoul0wf9jyb8xwZm0g3",
        "hints": {
          "allow": [
            "GET",
            "PUT",
            "DELETE"
          ]
        }
      },
      "deactivate": {
        "href": "https://${yourOktaDomain}/api/v1/zones/nzoul0wf9jyb8xwZm0g3/lifecycle/deactivate",
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
    "usage": "POLICY",
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
        "href": "https://${yourOktaDomain}/api/v1/zones/nzoul1MxmGN18NDQT0g3",
        "hints": {
          "allow": [
            "GET",
            "PUT",
            "DELETE"
          ]
        }
      },
      "deactivate": {
        "href": "https://${yourOktaDomain}/api/v1/zones/nzoul1MxmGN18NDQT0g3/lifecycle/deactivate",
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

### Update a Network Zone

<ApiOperation method="put" url="/api/v1/zones/${zoneId}" />

Updates an existing Network Zone

#### Request parameters

A valid [Zone object](#zone-object) with the ID of the Network Zone to update is required.

The updated Network Zone type must be the same as the existing type.

You may update the usage (`POLICY`, `BLOCKLIST`) of a Network Zone by updating the `usage` attribute.

#### Request example

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
  "usage": "POLICY",
  "created": "2017-01-24T19:53:28.000Z",
  "lastUpdated": "2017-01-24T19:53:28.000Z",
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
  ]
}' "https://${yourOktaDomain}/api/v1/zones/nzovw2rFz2YoqmvwZ0g3"
```

#### Response example

```json
{
  "type": "IP",
  "id": "nzovw2rFz2YoqmvwZ0g3",
  "name": "UpdatedNetZone",
  "status": "ACTIVE",
  "usage": "POLICY",
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
      "href": "https://${yourOktaDomain}/api/v1/zones/nzovw2rFz2YoqmvwZ0g3",
      "hints": {
        "allow": [
          "GET",
          "PUT",
          "DELETE"
        ]
      }
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/zones/nzovw2rFz2YoqmvwZ0g3/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```
