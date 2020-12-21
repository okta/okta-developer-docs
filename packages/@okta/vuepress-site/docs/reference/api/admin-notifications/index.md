---
title: Subscriptions
category: management
meta:
  - name: description
    content: The subscriptions API provides operations to manage email subscription settings for Okta administrator notifications.
---

# Subscriptions API

<ApiLifecycle access="ea" />

The subscriptions API provides operations to manage email subscription settings for Okta administrator notifications.

## List subscriptions of a Role

<ApiOperation method="get" url="/api/v1/roles/${roleType}/subscriptions" />

List all subscriptions of a Role

### Request parameters


| Parameter        | Description            | Param Type  | DataType                  | Required  |
| :--------------- | :--------------------- | :---------- | :------------------------ | :-------- |
| roleType         | `type` of a Role       | URL         | [Role Type](#role-types)  | TRUE      |

### Response parameters


Array of [Subscription](#subscription-object)

### Request example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions"
```

### Response example


```json
[
    {
        "notificationType": "AD_AGENT",
        "channels": [
            "email"
        ],
        "status": "subscribed",
        "_links": {
            "unsubscribe": {
                "href": "https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/AD_AGENT/unsubscribe",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/AD_AGENT"
            }
        }
    },
    {
        "notificationType": "IWA_AGENT",
        "channels": [
            "email"
        ],
        "status": "subscribed",
        "_links": {
            "unsubscribe": {
                "href": "https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/IWA_AGENT/unsubscribe",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/IWA_AGENT"
            }
        }
    },
    {
        "notificationType": "CONNECTOR_AGENT",
        "channels": [
            "email"
        ],
        "status": "subscribed",
        "_links": {
            "unsubscribe": {
                "href": "https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/CONNECTOR_AGENT/unsubscribe",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/CONNECTOR_AGENT"
            }
        }
    },
    {
        "notificationType": "USER_LOCKED_OUT",
        "channels": [
            "email"
        ],
        "status": "unsubscribed",
        "_links": {
            "subscribe": {
                "href": "https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/USER_LOCKED_OUT/subscribe",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/USER_LOCKED_OUT"
            }
        }
    },
    {
        "notificationType": "APP_IMPORT",
        "channels": [
            "email"
        ],
        "status": "unsubscribed",
        "_links": {
            "subscribe": {
                "href": "https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/APP_IMPORT/subscribe",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/APP_IMPORT"
            }
        }
    },
    {
        "notificationType": "LDAP_AGENT",
        "channels": [
            "email"
        ],
        "status": "subscribed",
        "_links": {
            "unsubscribe": {
                "href": "https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/LDAP_AGENT/unsubscribe",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/LDAP_AGENT"
            }
        }
    },
    {
        "notificationType": "OKTA_ANNOUNCEMENT",
        "channels": [
            "email"
        ],
        "status": "subscribed",
        "_links": {
            "unsubscribe": {
                "href": "https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/OKTA_ANNOUNCEMENT/unsubscribe",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/OKTA_ANNOUNCEMENT"
            }
        }
    },
    {
        "notificationType": "OKTA_ISSUE",
        "channels": [
            "email"
        ],
        "status": "subscribed",
        "_links": {
            "unsubscribe": {
                "href": "https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/OKTA_ISSUE/unsubscribe",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/OKTA_ISSUE"
            }
        }
    },
    {
        "notificationType": "OKTA_UPDATE",
        "channels": [
            "email"
        ],
        "status": "unsubscribed",
        "_links": {
            "subscribe": {
                "href": "https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/OKTA_UPDATE/subscribe",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/OKTA_UPDATE"
            }
        }
    },
    {
        "notificationType": "USER_DEPROVISION",
        "channels": [
            "email"
        ],
        "status": "unsubscribed",
        "_links": {
            "subscribe": {
                "href": "https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/USER_DEPROVISION/subscribe",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/USER_DEPROVISION"
            }
        }
    },
    {
        "notificationType": "REPORT_SUSPICIOUS_ACTIVITY",
        "channels": [
            "email"
        ],
        "status": "subscribed",
        "_links": {
            "unsubscribe": {
                "href": "https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/REPORT_SUSPICIOUS_ACTIVITY/unsubscribe",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/REPORT_SUSPICIOUS_ACTIVITY"
            }
        }
    }
]
```

## Get subscription of a Role with a specific type

<ApiOperation method="get" url="/api/v1/roles/${roleType}/subscriptions/${notificationType}" />

Get subscriptions of a Role with a specific type

### Request parameters


| Parameter        | Description                                            | Param Type  | DataType                                    | Required  |
| :--------------- | :----------------------------------------------------- | :---------- | :------------------------------------------ | :-------- |
| roleType         | `type` of a Role                                       | URL         | [Role Type](#role-types)                    | TRUE      |
| notificationType | `type` of a notification                               | URL         | [Notification Type](#notification-type)     | TRUE      |

### Response parameters


[Subscription](#subscription-object)

### Request example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/IWA_AGENT"
```

### Response example


```json
{
    "notificationType": "IWA_AGENT",
    "channels": [
        "email"
    ],
    "status": "subscribed",
    "_links": {
        "unsubscribe": {
            "href": "https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/IWA_AGENT/unsubscribe",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/IWA_AGENT"
        }
    }
}
```

## Subscribe to a specific type

<ApiOperation method="post" url="/api/v1/roles/${roleType}/subscriptions/${notificationType}/subscribe" />

Subscribes a Role to a specific type. When you change the subscription status of a Role, it overrides the subscription of any individual user of that Role.

### Request parameters


| Parameter        | Description                                            | Param Type  | DataType                                 | Required  |
| :--------------- | :----------------------------------------------------- | :---------- | :--------------------------------------- | :-------- |
| roleType         | `type` of a Role                                       | URL         | [Role Type](#role-types)                 | TRUE      |
| notificationType | `type` of a notification                               | URL         | [Notification Type](#notification-type)  | TRUE      |

### Response parameters


``` http
HTTP/1.1 200 OK
```

### Request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/IWA_AGENT/subscribe"
```

### Response example


``` http
HTTP/1.1 200 OK
```

## Unsubscribe to a specific type

<ApiOperation method="post" url="/api/v1/roles/${roleType}/subscriptions/${notificationType}/unsubscribe" />

Unsubscribes a Role to a specific type. When you change the subscription status of a Role, it overrides the subscription of any individual user of that Role.

### Request parameters


| Parameter        | Description                                            | Param Type  | DataType                                 | Required  |
| :--------------- | :----------------------------------------------------- | :---------- | :--------------------------------------- | :-------- |
| roleType         | `type` of a Role                                       | URL         | [Role Type](#role-types)                 | TRUE      |
| notificationType | `type` of a notification                               | URL         | [Notification Type](#notification-type)  | TRUE      |


### Response parameters


``` http
HTTP/1.1 200 OK
```

### Request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/roles/SUPER_ADMIN/subscriptions/IWA_AGENT/unsubscribe"
```

### Response example


``` http
HTTP/1.1 200 OK
```

## List subscriptions of a User

<ApiOperation method="get" url="/api/v1/users/${userId}/subscriptions" />

List subscriptions of a User. Only lists subscriptions for current user. An `AccessDeniedException` message is sent if requests are made from other users.

### Request parameters


| Parameter         | Description     | Param Type  | DataType  | Required  |
| :---------------- | :-------------- | :---------- | :-------- | :-------- |
| userId            | `id` of a User  | URL         | String    | TRUE      |

### Response parameters


Array of [Subscription](#subscription-object)

### Request example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions"
```

### Response example


```json
[
    {
        "notificationType": "CONNECTOR_AGENT",
        "channels": [
            "email"
        ],
        "status": "subscribed",
        "_links": {
            "unsubscribe": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/CONNECTOR_AGENT/unsubscribe",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/CONNECTOR_AGENT"
            }
        }
    },
    {
        "notificationType": "USER_LOCKED_OUT",
        "channels": [
            "email"
        ],
        "status": "unsubscribed",
        "_links": {
            "subscribe": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/USER_LOCKED_OUT/subscribe",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/USER_LOCKED_OUT"
            }
        }
    },
    {
        "notificationType": "APP_IMPORT",
        "channels": [
            "email"
        ],
        "status": "unsubscribed",
        "_links": {
            "subscribe": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/APP_IMPORT/subscribe",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/APP_IMPORT"
            }
        }
    },
    {
        "notificationType": "LDAP_AGENT",
        "channels": [
            "email"
        ],
        "status": "unsubscribed",
        "_links": {
            "subscribe": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/LDAP_AGENT/subscribe",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/LDAP_AGENT"
            }
        }
    },
    {
        "notificationType": "AD_AGENT",
        "channels": [
            "email"
        ],
        "status": "subscribed",
        "_links": {
            "unsubscribe": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/AD_AGENT/unsubscribe",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/AD_AGENT"
            }
        }
    },
    {
        "notificationType": "OKTA_ANNOUNCEMENT",
        "channels": [
            "email"
        ],
        "status": "subscribed",
        "_links": {
            "unsubscribe": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/OKTA_ANNOUNCEMENT/unsubscribe",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/OKTA_ANNOUNCEMENT"
            }
        }
    },
    {
        "notificationType": "OKTA_ISSUE",
        "channels": [
            "email"
        ],
        "status": "subscribed",
        "_links": {
            "unsubscribe": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/OKTA_ISSUE/unsubscribe",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/OKTA_ISSUE"
            }
        }
    },
    {
        "notificationType": "OKTA_UPDATE",
        "channels": [
            "email"
        ],
        "status": "unsubscribed",
        "_links": {
            "subscribe": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/OKTA_UPDATE/subscribe",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/OKTA_UPDATE"
            }
        }
    },
    {
        "notificationType": "IWA_AGENT",
        "channels": [
            "email"
        ],
        "status": "subscribed",
        "_links": {
            "unsubscribe": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/IWA_AGENT/unsubscribe",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/IWA_AGENT"
            }
        }
    },
    {
        "notificationType": "USER_DEPROVISION",
        "channels": [
            "email"
        ],
        "status": "unsubscribed",
        "_links": {
            "subscribe": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/USER_DEPROVISION/subscribe",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/USER_DEPROVISION"
            }
        }
    },
    {
        "notificationType": "REPORT_SUSPICIOUS_ACTIVITY",
        "channels": [
            "email"
        ],
        "status": "subscribed",
        "_links": {
            "unsubscribe": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/REPORT_SUSPICIOUS_ACTIVITY/unsubscribe",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/REPORT_SUSPICIOUS_ACTIVITY"
            }
        }
    }
]
```

## Get the subscription of a User with a specific type

<ApiOperation method="get" url="/api/v1/roles/${userId}/subscriptions/${notificationType}" />

Get the subscriptions of a User with a specific type. Only gets subscriptions for current user. An `AccessDeniedException` message is sent if requests are made from other users.

### Request parameters


| Parameter        | Description            | Param Type  | DataType                                    | Required  |
| :--------------- | :--------------------- | :---------- | :------------------------------------------ | :-------- |
| userId           | `id` of a User         | URL         | String                                      | TRUE      |
| notificationType | `type` of notification | URL         | [Notification Type](#notification-type)     | TRUE      |

### Response parameters


[Subscription](#subscription-object)

### Request example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/IWA_AGENT"
```

### Response example


```json
{
    "notificationType": "IWA_AGENT",
    "channels": [
        "email"
    ],
    "status": "subscribed",
    "_links": {
        "unsubscribe": {
            "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/IWA_AGENT/unsubscribe",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/IWA_AGENT"
        }
    }
}
```

## Subscribe to a specific type

<ApiOperation method="post" url="/api/v1/users/${userId}/subscriptions/${notificationType}/subscribe" />

Subscribes a User to a specific type. Only the current User can subscribe to a specific type. An `AccessDeniedException` message is sent if requests are made from other users.

### Request parameters


| Parameter        | Description             | Param Type  | DataType                                 | Required  |
| :--------------- | :---------------------  | :---------- | :--------------------------------------- | :-------- |
| userId           | `id` of a User          | URL         | String                                   | TRUE      |
| notificationType | `type` of notification  | URL         | [Notification Type](#notification-type)  | TRUE      |

### Response parameters


``` http
HTTP/1.1 200 OK
```

### Request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/IWA_AGENT/subscribe"
```

### Response example


``` http
HTTP/1.1 200 OK
```

## Unsubscribe to a specific type

<ApiOperation method="post" url="/api/v1/users/${userId}/subscriptions/${notificationType}/unsubscribe" />

Unsubscribes a User to a specific type. We only support operations for current user right now. Requesting for other users will get AccessDeniedException.

### Request parameters


| Parameter        | Description             | Param Type  | DataType                                 | Required  |
| :--------------- | :---------------------- | :---------- | :--------------------------------------- | :-------- |
| userId           | `id` of a User          | URL         | String                                   | TRUE      |
| notificationType | `type` of notification  | URL         | [Notification Type](#notification-type)  | TRUE      |


### Response parameters


``` http
HTTP/1.1 200 OK
```

### Request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/IWA_AGENT/unsubscribe"
```

### Response example


``` http
HTTP/1.1 200 OK
```

## Subscription object

### Examples

#### Sample Subscription

```json
{
    "notificationType": "IWA_AGENT",
    "channels": [
        "email"
    ],
    "status": "subscribed",
    "_links": {
        "unsubscribe": {
            "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/IWA_AGENT/unsubscribe",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/users/00uuk0UVgUXjkIbPL0g3/subscriptions/IWA_AGENT"
        }
    }
}
```

### Subscription properties

The Subscription object defines several properties:

| Property         | Description                                                  | DataType                                                        | Nullable   | Unique   | Read Only |
| :--------------- | :----------------------------------------------------------- | :-------------------------------------------------------------- | :--------- | :------- | :-------- |
| notificationType | Type of subscriptions                                        | [Notification Type](#notification-type)                         | FALSE      | TRUE     | TRUE      |
| channels         | Array of sources that the user gets notification from    | array of [Channel](#subscription-channel)                       | FALSE      | FALSE    | TRUE      |
| status           | Status of subscriptions                                      | `subscribed`, `unsubscribed`                                    | FALSE      | FALSE    | FALSE     |
| _links           | Discoverable resources related to the subscription           | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)  | FALSE      | FALSE    | TRUE      |

### Subscription channel
We currently only support `email`

### Notification type
Since we currently only support `email`, the notification types are the same as email types.

| Type                       | Description                                                                                                    |
| :--------------------------| :--------------------------------------------------------------------------------------------------------------|
| CONNECTOR_AGENT            | System notification sent when an on-premises provisioning or Okta on-prem MFA agent disconnects or reconnects. |
| USER_LOCKED_OUT            | System notification sent when a user is locked out from logging in to Okta.                                    |
| APP_IMPORT                 | System notification sent with the status of an app user import.                                                |
| LDAP_AGENT                 | System notification sent when an LDAP agent disconnects or reconnects.                                         |
| AD_AGENT                   | System notification sent when an AD agent disconnects or reconnects.                                           |
| OKTA_ANNOUNCEMENT          | Okta communication sent for announcements and release notes.                                                   |
| OKTA_ISSUE                 | Okta communication sent for trust incident alerts and updates.                                                 |
| OKTA_UPDATE                | Okta communication sent for scheduled system updates.                                                          |
| IWA_AGENT                  | System notification sent when an IGA agent disconnects or reconnects.                                          |
| USER_DEPROVISION           | System notification sent when a user is deprovisioned from apps.                                               |
| REPORT_SUSPICIOUS_ACTIVITY | System notification sent when a user reports suspicious activity.                                              |
| RATELIMIT_NOTIFICATION     | System notification sent when an org reaches rate limit warning or violation thresholds.                       |


## Role types

Some Roles support optional targets that constrain the Role to a specific set of Groups or Apps. If an optional target isn't specified, then the role assignment is unbounded (for example, applies to all Groups or Apps).

Refer to the [product documentation](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Security_Administrators) for a complete definition of permissions granted to each Role.

| Role type                     | Label                               |
| :---------------------------- | :---------------------------------- |
| `API_ADMIN`                   | API Access Management Administrator |
| `APP_ADMIN`                   | Application Administrator           |
| `GROUP_MEMBERSHIP_ADMIN`      | Group Membership Administrator      |
| `HELP_DESK_ADMIN`             | Help Desk Administrator             |
| `MOBILE_ADMIN`                | Mobile Administrator                |
| `ORG_ADMIN`                   | Organizational Administrator        |
| `READ_ONLY_ADMIN`             | Read-Only Administrator             |
| `REPORT_ADMIN`                | Report Administrator                |
| `SUPER_ADMIN`                 | Super Administrator                 |
| `USER_ADMIN`                  | Group Administrator                 |
