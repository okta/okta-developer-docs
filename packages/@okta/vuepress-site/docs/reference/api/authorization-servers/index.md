---
title: Authorization Servers
category: management
---

# Authorization Servers API

Authorization Servers generate OAuth 2.0 and OpenID Connect tokens, including access tokens and ID tokens. The Okta Management API gives you the ability to configure and manage Authorization Servers and the security policies that are attached to them. The following configuration operations can be found on this page:

* [Authorization Server operations](#authorization-server-operations)
* [Policy operations](#policy-operations)
* [Scope operations](#scope-operations)
* [Claim operations](#claim-operations)
* [Key Store operations](#key-store-operations)

## Get Started

Explore the Authorization Servers API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/6e58e52a03637c290665)

This page also has information about the [OAuth 2.0 Objects](#oauth-20-objects) related to these operations.

### Authorization Server operations

Use the following operations to manage Custom Authorization Servers:

* [Create](#create-authorization-server)
* [List](#list-authorization-servers)
* [Get](#get-authorization-server)
* [Update](#update-authorization-server)
* [Delete](#delete-authorization-server)
* [Activate](#activate-authorization-server)
* [Deactivate](#deactivate-authorization-server)

#### Work with the Default Authorization Server

Okta provides a pre-configured Custom Authorization Server with the name `default`.
This Default Authorization Server includes a basic access policy and rule, which you can edit to control access.
It allows you to specify `default` instead of the `authServerId` in requests to it:

* `https://${yourOktaDomain}/api/v1/authorizationServers/default` vs
* `https://${yourOktaDomain}/api/v1/authorizationServers/${authServerId}` for other Custom Authorization Servers

#### Authorization Server object

When you use these API endpoints to create or modify an Authorization Server resource, the response looks like:

```json
{
  "id": "ausain6z9zIedDCxB0h7",
  "name": "Sample Authorization Server",
  "description": "Authorization Server Description",
  "audiences": [
    "https://api.resource.com"
  ],
  "issuer": "https://${yourOktaDomain}/oauth2/ausain6z9zIedDCxB0h7",
  "issuerMode": "ORG_URL",
  "status": "ACTIVE",
  "created": "2017-05-17T22:25:57.000Z",
  "lastUpdated": "2017-05-17T22:25:57.000Z",
  "credentials": {
    "signing": {
      "rotationMode": "AUTO",
      "lastRotated": "2017-05-17T22:25:57.000Z",
      "nextRotation": "2017-08-15T22:25:57.000Z",
      "kid": "WYQxoK4XAwGFn5Zw5AzLxFvqEKLP79BbsKmWeuc5TB4"
    }
  },
  "_links": {
    "scopes": {
      "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/scopes",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "claims": {
      "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/claims",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "policies": {
      "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/policies",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "self": {
      "href": "https:{yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7",
      "hints": {
        "allow": [
          "GET",
          "DELETE",
          "PUT"
        ]
      }
    },
    "metadata": [
      {
        "name": "oauth-authorization-server",
        "href": "https://${yourOktaDomain}/oauth2/ausain6z9zIedDCxB0h7/.well-known/oauth-authorization-server",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      {
        "name": "openid-configuration",
        "href": "https://${yourOktaDomain}/oauth2/ausain6z9zIedDCxB0h7/.well-known/openid-configuration",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      }
    ],
    "rotateKey": {
      "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/credentials/lifecycle/keyRotate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

##### Authorization Server properties

| Property                                | Description                                                                                                                                                         | Type                                                                      | Required for create or update |
| :------------                           | :---------------------------------------------------------------------------------------------------------------------                                              | :------------------------------------------------------------------------ | :---------------------------- |
| _links                                  | List of discoverable resources related to a Custom Authorization Server                                                                                             | Links                                                                     | False                         |
| audiences                               | The recipients that the tokens are intended for. This becomes the `aud` claim in an access token. Currently, Okta supports only one audience.                       | Array                                                                     | True                          |
| credentials                             | Keys and settings used to sign tokens.                                                                                                                              | [Credentials object](#credentials-object)                                 | False                         |
| description                             | The description of a Custom Authorization Server                                                                                                                    | String                                                                    | True                          |
| issuer                                  | The complete URL for a Custom Authorization Server. This becomes the `iss` claim in an access token.                                                                | String                                                                    | False                         |
| issuerMode <ApiLifecycle access="ea" /> | Indicates which value is specified in the issuer of the tokens that a Custom Authorization Server returns: the original Okta org domain URL or a custom domain URL. | String                                                                    | False                         |
| name                                    | The name of a Custom Authorization Server                                                                                                                           | String                                                                    | True                          |
| status                                  | Indicates whether a Custom Authorization Server is `ACTIVE` or `INACTIVE`.                                                                                          | Enum                                                                      | False                         |

##### Property details

`issuerMode` is visible if you have the Custom URL Domain feature enabled. If the feature is enabled, you can set a custom domain URL in a Custom Authorization Server, and this property is returned in the appropriate responses. To enable the Custom URL Domain feature, contact [Support](https://support.okta.com/help/open_case).

* If set to `ORG_URL`, then in responses, `issuer` is the Okta org's original domain URL: `https://${yourOktaDomain}`.

* If set to `CUSTOM_URL_DOMAIN`, then in responses, `issuer` is the custom domain URL configured in the administration user interface.

After you enable the Custom URL Domain feature, all new Custom Authorization Servers use `CUSTOM_URL_DOMAIN` by default. All existing Custom Authorization Servers continue to use `ORG_URL` until changed using the Admin Console or the API, so that existing integrations with client and resource server continue to work after the feature is enabled.

#### Create Authorization Server

<ApiOperation method="post" url="/api/v1/authorizationServers" />

Creates a new [Custom Authorization Server](#authorization-server-object)

##### Request parameters

[Authorization Server properties](#authorization-server-properties)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "Sample Authorization Server",
  "description": "Sample Authorization Server description",
  "audiences": [
    "api://default"
  ]
}' "https://${yourOktaDomain}/api/v1/authorizationServers"
```

##### Response example

The [Custom Authorization Server](#authorization-server-object) that you just created

#### List Authorization Servers

<ApiOperation method="GET" url="/api/v1/authorizationServers" />

Lists all Custom Authorization Servers in this Okta organization

##### Request parameters


Parameter | Description                                                                                 | Param Type | DataType | Required | Default
--------- | ------------------------------------------------------------------------------------------  | ---------- | -------- | -------- | -------
q         | Searches the `name` and `audiences` of Authorization Servers for matching values            | Query      | String   | FALSE    |
limit     | Specifies the number of Authorizaton Server results on a page                               | Query      | Number   | FALSE    | 200
after     | Specifies the pagination cursor for the next page of Authorization Servers                  | Query      | String   | FALSE    |

**Parameter details**

* The `after` cursor should be treated as an opaque value and obtained through the next link relationship. See [Pagination](/docs/reference/api-overview/#pagination).
* `limit` can be no larger than 200.

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authorizationServers"
```

##### Response example

The [Custom Authorization Servers](#authorization-server-object) in this Okta organization

#### Get Authorization Server

<ApiOperation method="get" url="/api/v1/authorizationServers/${authServerId}" />

Returns the [Custom Authorization Server](#authorization-server-object) identified by `authServerId`

##### Request parameters


| Parameter               | Description                                                                     | Type     | Required |
| :---------------------- | :-------------------------------------------------------------------------      | :------- | :------- |
| authServerId            | Custom Authorization Server ID. You can find the ID in the Okta user interface. | String   | True     |

#### Request example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authorizationServers/aus5m9r1o4AsDJLe50g4"
```

##### Response example

The [Custom Authorization Server](#authorization-server-object) that you requested by `{authServerId}`

#### Update Authorization Server

<ApiOperation method="put" url="/api/v1/authorizationServers/${authServerId}" />

Updates the Authorization Server identified by `authServerId`

> **Note:** Switching between rotation modes won't change the active signing Key.

##### Request parameters


| Parameter     | Description                                                                                                                  | Type                                                                                                      | Required |
| :------------ | :----------------------------------------------------------------------------------------------------------------            | :-------------------------------------------------------------------------------------------------------- | :------- |
| audiences     | The list of audiences that this Custom Authorization Server can issue tokens to. Currently, Okta supports only one audience. | Array                                                                                                     | TRUE     |
| credentials   | The credentials signing object with the `rotationMode` of the Authorization Server                                           | [Authorization server credentials object](#credentials-object)                                            | FALSE    |
| description   | The description of the Authorization Server                                                                                  | String                                                                                                    | FALSE    |
| name          | The name of the Authorization Server                                                                                         | String                                                                                                    | TRUE     |

#### Request example


```bash
curl -X PUT \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "New Authorization Server",
  "description": "Authorization Server New Description",
  "audiences": [
    "api://default"
  ]
}' "https://${yourOktaDomain}/api/v1/authorizationServers/aus1rqsshhhRoat780g7"
```

##### Response example

The [Custom Authorization Server](#authorization-server-object) that you updated

#### Delete Authorization Server

<ApiOperation method="delete" url="/api/v1/authorizationServers/${authServerId}" />

Deletes the Custom Authorization Server identified by `authServerId`

##### Request parameters


| Parameter               | Description                                       | Type     | Required |
| :---------------------- | :---------------------------------------------    | :------- | :------- |
| authServerId            | The ID of a Custom Authorization Server to delete | String   | TRUE     |

##### Request example


```bash
curl -X DELETE \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authorizationServers/aus1rqsshhhRoat780g7"
```

##### Response example


```http
HTTP/1.1 204 No Content
```

#### Activate Authorization Server

<ApiOperation method="post" url="/api/v1/authorizationServers/${authServerId}/lifecycle/activate" />

Makes a Custom Authorization Server for use by clients

##### Request parameters


| Parameter               | Description                                         | Type     | Required |
| :---------------------- | :-----------------------------------------------    | :------- | :------- |
| authServerId            | The ID of a Custom Authorization Server to activate | String   | TRUE     |

##### Request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authorizationServers/aus1sb3dl8L5WoTOO0g7/lifecycle/activate"
```

##### Response example


```http
HTTP/1.1 204 No Content
```

#### Deactivate Authorization Server


<ApiOperation method="post" url="/api/v1/authorizationServers/${authServerId}/lifecycle/deactivate" />

Makes a Custom Authorization Server unavailable to clients. An inactive Custom Authorization Server can be returned to `ACTIVE` status by activating it again.

##### Request parameters


| Parameter               | Description                                           | Type     | Required |
| :---------------------- | :-------------------------------------------------    | :------- | :------- |
| authServerId            | The ID of a Custom Authorization Server to deactivate | String   | TRUE     |

##### Request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authorizationServers/aus1sb3dl8L5WoTOO0g7/lifecycle/deactivate"
```

##### Response example


```http
HTTP/1.1 204 No Content
```

### Policy operations

* [Policy object](#policy-object)
* [Get all Policies](#get-all-policies)
* [Get a Policy](#get-a-policy)
* [Create a Policy](#create-a-policy)
* [Update a Policy](#update-a-policy)
* [Delete a Policy](#delete-a-policy)

#### Policy object

When you use these API endpoints to create or modify a Policy resource, the response looks like:

```json
{
    "type": "OAUTH_AUTHORIZATION_POLICY",
    "id": "00palyaappA22DPkj0h7",
    "status": "ACTIVE",
    "name": "Vendor2 Policy",
    "description": "Vendor2 policy description",
    "priority": 1,
    "system": false,
    "conditions": {
      "clients": {
        "include": [
          "ALL_CLIENTS"
        ]
      }
    },
    "created": "2017-05-26T19:43:53.000Z",
    "lastUpdated": "2017-06-07T15:28:17.000Z",
    "_links": {
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/policies/00palyaappA22DPkj0h7",
        "hints": {
          "allow": [
            "GET",
            "PUT",
            "DELETE"
          ]
        }
      },
      "deactivate": {
        "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/policies/00palyaappA22DPkj0h7/lifecycle/deactivate",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "rules": {
        "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/policies/00palyaappA22DPkj0h7/rules",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      }
    }
  }
```

#### Policy properties

| Property      | Description                                                                                                                | Type                                    | Required for create or update |
| :------------ | :------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------- | :---------------------------- |
| _links        | List of discoverable resources related to the Policy                                                                       | Links                                   | System                        |
| conditions    | Specifies the clients that the Policy applies to                                                                  | [Condition object](#condition-object)   | False                         |
| created       | Timestamp when the Policy was created                                                                                      | DateTime                                | System                        |
| description   | Description of the Policy                                                                                                  | String                                  | True                          |
| id            | ID of the Policy                                                                                                           | String                                  | True except for create        |
| lastUpdated   | Timestamp when the Policy was last updated                                                                                 | DateTime                                | System                        |
| name          | Name of the Policy                                                                                                         | String                                  | True                          |
| priority      | Specifies the order in which this Policy is evaluated in relation to the other Policies in a Custom Authorization Server   | Integer                                 | True                          |
| status        | Specifies whether requests have access to this Policy. Valid values: `ACTIVE` or `INACTIVE`                                | Enum                                    | True                          |
| system        | Specifies whether Okta created this Policy (`true`) or not (`false`)                                                      | Boolean                                 | True                          |
| type          | Indicates that the Policy is an authorization server Policy (`OAUTH_AUTHORIZATION_POLICY`)                                 | String                                  | False                         |

#### Get all Policies

<ApiOperation method="get" url="/api/v1/authorizationServers/${authServerId}/policies" />

Returns all the Policies for the specified Custom Authorization Server

##### Request parameters

| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/policies"
```

##### Response example

Returns the [Policies](#policy-object) defined in the specified Custom Authorization Server

#### Get a Policy

<ApiOperation method="get" url="/api/v1/authorizationServers/${authServerId}/policies/${policyId}" />

Returns a Policy by ID defined in the specified Custom Authorization Server

##### Request parameters


| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |
| policyId                | ID of a Policy                      | String   | True     |

##### Request example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/policies/00p5m9xrrBffPd9ah0g4"
```

##### Response example


Returns the [Policy](#policy-object) that you requested

#### Create a Policy

<ApiOperation method="post" url="/api/v1/authorizationServers/${authServerId}/policies" />

Create a Policy for a Custom Authorization Server

##### Request parameters


[Policy object](#policy-object)

##### Request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "OAUTH_AUTHORIZATION_POLICY",
  "status": "ACTIVE",
  "name": "Default Policy",
  "description": "Default policy description",
  "priority": 1,
  "conditions": {
    "clients": {
      "include": [
        "ALL_CLIENTS"
      ]
    }
  }
}' "https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/policies"
```

##### Response example


Returns the [Policy](#policy-object) that you created

#### Update a Policy

<ApiOperation method="put" url="/api/v1/authorizationServers/${authServerId}/policies/${policyId}" />

Change the configuration of a Policy specified by the `policyId`

##### Request parameters


| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |
| policyId                | ID of a Policy                      | String   | True     |


##### Request example


```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "OAUTH_AUTHORIZATION_POLICY",
  "id": "00p5m9xrrBffPd9ah0g4",
  "status": "ACTIVE",
  "name": "default",
  "description": "default policy",
  "priority": 1,
  "system": false,
  "conditions": {
    "clients": {
      "include": [
        "ALL_CLIENTS"
      ]
    }
  }
}' "https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/policies/00p5m9xrrBffPd9ah0g4"
```

##### Response example


Returns the [Policy](#policy-object) that you updated

#### Delete a Policy

<ApiOperation method="DELETE" url="/api/v1/authorizationServers/${authServerId}/policies/${policyId}" />

Delete a Policy specified by the `policyId`


##### Request parameters


| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |
| policyId                | ID of a Policy                      | String   | True     |

##### Request example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/policies/00p5m9xrrBffPd9ah0g4"
```

##### Response example


```http
HTTP/1.1 204 No Content
```

### Policy Rule operations

* [Policy Rule Object](#policy-rule-object)
* [Get all Policy Rules](#get-all-policy-rules)
* [Get a Policy Rule](#get-a-policy-rule)
* [Create a Policy Rule](#create-a-policy-rule)
* [Update a Policy Rule](#update-a-policy-rule)
* [Delete a Policy Rule](#delete-a-policy-rule)

#### Policy Rule Object

When you use these API endpoints to create or modify a Policy Rule resource, the response looks like: [Policy Rule Object](#rule-object)

#### Get all Policy Rules

<ApiOperation method="get" url="/api/v1/authorizationServers/${authServerId}/policies/${policyId}/rules" />

Returns all the Policy Rules for the specified Custom Authorization Server and Policy

##### Request parameters

| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |
| policyId                | ID of a Policy                      | String   | True     |

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/policies/00p5m9xrrBffPd9ah0g4/rules"
```

##### Response example

Returns a list of [Policy Rules](#rule-object) that are defined in the specified Custom Authorization Server and Policy

#### Get a Policy Rule

<ApiOperation method="get" url="/api/v1/authorizationServers/${authServerId}/policies/${policyId}/rules/${ruleId}" />

Returns a Policy Rule by ID that is defined in the specified Custom Authorization Server and Policy

##### Request parameters

| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |
| policyId                | ID of a Policy                      | String   | True     |
| ruleId                  | ID of a Rule                        | String   | True     |

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/policies/00p5m9xrrBffPd9ah0g4/rules/0pruenaDjuiNy7qwo0g3"
```

##### Response example

Returns the [Policy Rule](#rule-object) that you requested

#### Create a Policy Rule

<ApiOperation method="post" url="/api/v1/authorizationServers/${authServerId}/policies/${policyId}/rules" />

Create a Policy Rule for the specified Custom Authorization Server and Policy

##### Request parameters

[Policy Rule Object](#rule-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "type": "RESOURCE_ACCESS",
    "name": "Default Policy Rule",
    "priority": 1,
    "conditions": {
      "people": {
        "groups": {
          "include": [
            "EVERYONE"
          ]
        }
      },
      "grantTypes": {
        "include": [
          "implicit",
          "client_credentials",
          "authorization_code",
          "password"
        ]
      },
      "scopes": {
        "include": [
          "*"
        ]
      }
    },
    "actions": {
      "token": {
        "accessTokenLifetimeMinutes": 60,
        "refreshTokenLifetimeMinutes": 0,
        "refreshTokenWindowMinutes": 10080
      }
    }
}' "https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/policies/00p5m9xrrBffPd9ah0g4/rules"
```

##### Response example

Returns the [Policy Rule](#rule-object) that you created

#### Update a Policy Rule

<ApiOperation method="put" url="/api/v1/authorizationServers/${authServerId}/policies/${policyId}/rules/${ruleId}" />

Change the configuration of the Policy Rule defined in the specified Custom Authorization Server and Policy

##### Request parameters

| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |
| policyId                | ID of a Policy                      | String   | True     |
| ruleId                  | ID of a Rule                        | String   | True     |

##### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "type": "RESOURCE_ACCESS",
    "status": "ACTIVE",
    "name": "Default Policy Rule",
    "priority": 1,
    "conditions": {
      "people": {
        "groups": {
          "include": [
            "EVERYONE"
          ]
        }
      },
      "grantTypes": {
        "include": [
          "implicit",
          "client_credentials",
          "authorization_code",
          "password"
        ]
      },
      "scopes": {
        "include": [
            "openid",
            "email",
            "address"
        ]
      }
    },
    "actions": {
      "token": {
        "accessTokenLifetimeMinutes": 60,
        "refreshTokenLifetimeMinutes": 0,
        "refreshTokenWindowMinutes": 10080
      }
    }
}' "https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/policies/00p5m9xrrBffPd9ah0g4/rules/0pruenaDjuiNy7qwo0g3"
```

##### Response example

Returns the [Policy Rule](#rule-object) that you updated

#### Delete a Policy Rule

<ApiOperation method="DELETE" url="/api/v1/authorizationServers/${authServerId}/policies/${policyId}/rules/${ruleId}" />

Delete a Policy Rule defined in the specified Custom Authorization Server and Policy

##### Request parameters

| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |
| policyId                | ID of a Policy                      | String   | True     |
| ruleId                  | ID of a Rule                        | String   | True     |

##### Request example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/policies/00p5m9xrrBffPd9ah0g4/rules/0pruenaDjuiNy7qwo0g3"
```

##### Response example

```http
HTTP/1.1 204 No Content
```

### Scope operations

* [Get all scopes](#get-all-scopes)
* [Get a Scope](#get-a-scope)
* [Create a Scope](#create-a-scope)
* [Update a Scope](#update-a-scope)
* [Delete a Scope](#delete-a-scope)

#### Scope object

When you use these API endpoints to create or modify a Scope resource, the response looks like:

```json
[
  {
    "id": "scpainazg3Ekay92V0h7",
    "name": "car:drive",
    "description": "Drive car",
    "system": false,
    "default": false,
    "displayName": "Saml Jackson",
    "consent": "REQUIRED",
    "metadataPublish": "NO_CLIENTS"
  }
]
```

#### Scope properties

| Property                                 | Description                                                                                             | Type      | Default        | Required for create or update              |
| :-------------------------------------   | :------------------------------------------------------------------------------------------------------ | :-------- | :------------- | :----------------------------              |
| consent                                  | Indicates whether a consent dialog is needed for the Scope. Valid values: `REQUIRED`, `IMPLICIT`       | Enum      | `IMPLICIT`     | True for update                        |
| default                                  | Whether the Scope is a default Scope                                                               | Boolean   |                | False                                      |
| description                              | Description of the Scope                                                                                | String    |                | False                                      |
| displayName                              | Name of the end user displayed in a consent dialog box                                                      | String    |                | False                                      |
| id                                       | ID of the Scope                                                                                         | String    |                | False                                      |
| metadataPublish                          | Whether the Scope should be included in the metadata. Valid values: `NO_CLIENTS`, `ALL_CLIENTS`  | Enum      | `NO_CLIENTS`   | True except for create                     |
| name                                     | Name of the Scope                                                                                       | String    |                | True                                       |
| system                                   | Whether Okta created the Scope                                                                          | Boolean   |                | False                                      |

* A consent dialog box appears depending on the values of three elements:
    * `prompt` - a query parameter used in requests to [`/authorize`](/docs/reference/api/oidc/#authorize)
    * `consent_method` - a property on [apps](/docs/reference/api/apps/#settings-7)
    * `consent` - a property on Scopes as listed in the table above

| `prompt` Value      | `consent_method`                   | `consent`                     | Result       |
| :------------------ | :--------------------------------- | :---------------------------- | :----------- |
| `CONSENT`           | `TRUSTED` or `REQUIRED`            | `REQUIRED`                    | Prompted     |
| `CONSENT`           | `TRUSTED`                          | `IMPLICIT`                    | Not prompted |
| `NONE`              | `TRUSTED`                          | `REQUIRED` or `IMPLICIT`      | Not prompted |
| `NONE`              | `REQUIRED`                         | `IMPLICIT`                    | Not prompted |
<!-- If you change this section, change it in apps.md (/docs/reference/api/apps/#credentials-settings-details) and oidc.md (/docs/reference/api/oidc/#scopes) as well. Add 'LOGIN' to the first three rows when supported -->

**Notes:**

  * Apps created on `/api/v1/apps` default to `consent_method=TRUSTED`, while those created on `/api/v1/clients` default to `consent_method=REQUIRED`.
  * If you request a Scope that requires consent while using the `client_credentials` flow, an error is returned. Because there is no user, no consent can be given.
  * If the `prompt` value is set to `NONE`, but the `consent_method` and the `consent` values are set to `REQUIRED`, then an error occurs.
  * The Scope name must only contain printable ASCII except for spaces, double quotes, and backslashes. It also must not start with `okta.` or `okta:` and must not be only `okta` or `*`.

#### Get all Scopes

<ApiOperation method="get" url="/api/v1/authorizationServers/${authServerId}/scopes" />

Get the Scopes defined for a specified Custom Authorization Server

##### Request parameters

| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/scopes"
```

##### Response example


Returns the [Scopes](#scope-object) defined in the specified Custom Authorization Server


#### Get a Scope

<ApiOperation method="get" url="/api/v1/authorizationServers/${authServerId}/scopes/${scopeId}" />

Gets a Scope specified by the `scopeId`

##### Request parameters


| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |
| scopeId                 | ID of a Scope                       | String   | True     |

##### Request example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/scopes/scpanemfdtktNn7w10h7"
```

##### Response example


Returns the [Scope](#scope-object) that you requested

#### Create a Scope

<ApiOperation method="post" url="/api/v1/authorizationServers/${authServerId}/scopes" />

Create a Scope for a Custom Authorization Server

##### Request parameters


| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |

##### Request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "description": "Drive car",
  "name": "car:drive",
  "consent": "REQUIRED"
}' "https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/scopes"
```

##### Response example


Returns the [Scope](#scope-object) that you created

#### Update a Scope

<ApiOperation method="put" url="/api/v1/authorizationServers/${authServerId}/scopes/${scopeId}" />

Change the configuration of a Scope specified by the `scopeId`

##### Request parameters


| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |
| scopeId                 | ID of a Scope                       | String   | True     |


##### Request example


```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "description": "Order car",
  "name": "car:order",
  "consent": "REQUIRED",
  "metadataPublish": "ALL_CLIENTS"
}' "https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/scopes/scpanemfdtktNn7w10h7"
```

##### Response example


Returns the [Scope](#scope-object) that you updated

#### Delete a Scope

<ApiOperation method="DELETE" url="/api/v1/authorizationServers/${authServerId}/scopes/${scopeId}" />

Deletes a Scope specified by the `scopeId`


##### Request parameters


| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |
| scopeId                 | ID of a Scope                       | String   | True     |

##### Request example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/scopes/00p5m9xrrBffPd9ah0g4"
```

##### Response example


```http
HTTP/1.1 204 No Content
```

### Claim operations

* [Get all Claims](#get-all-claims)
* [Get a Claim](#get-a-claim)
* [Create a Claim](#create-a-claim)
* [Update a Claim](#update-a-claim)
* [Delete a Claim](#delete-a-claim)

#### Claim object

When you use these API endpoints to create or modify a Claim resource, the response looks like:

```json
{
  "id": "oclain6za1HQ0noop0h7",
  "name": "sub",
  "status": "ACTIVE",
  "claimType": "RESOURCE",
  "valueType": "EXPRESSION",
  "value": "(appuser != null) ? appuser.userName : app.clientId",
  "alwaysIncludeInToken": "TRUE",
  "conditions": {
    "scopes": []
  },
  "system": true
}
```

#### Claim properties

| Property               | Description                                                                                                                                                                                                                                        | Type                                                   | Required for create or update            |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------- | :--------------------------------------- |
| alwaysIncludeInToken   | Specifies whether to include Claims in the token [Details](#details-for-alwaysincludeintoken)                                                                                                                                                         | Boolean                                                | False                                    |
| claimType              | Specifies whether the Claim is for an access token (`RESOURCE`) or ID token (`IDENTITY`)                                                                                                                                                           | Enum                                                   | True                                     |
| conditions             | Specifies the scopes for this Claim                                                                                                                                                                                                                | [Condition object](#condition-object)                  | False                                    |
| group_filter_type        | Specifies the type of group filter if `valueType` is `GROUPS` [Details](#details-for-groupfiltertype)                                                                                                                                             | Enum                                                   | False                                    |
| id                     | ID of the Claim                                                                                                                                                                                                                                    | String                                                 | True except for create or get all Claims |
| name                   | Name of the Claim                                                                                                                                                                                                                                  | String                                                 | True                                     |
| status                 | Specifies whether requests have access to this Claim. Valid values: `ACTIVE` or `INACTIVE`                                                                                                                                                         | Enum                                                   | True                                     |
| system                 | Specifies whether Okta created this Claim                                                                                                                                                                                                          | Boolean                                                | System                                   |
| valueType              | Specifies whether the Claim is an Okta EL expression (`EXPRESSION`), a set of groups (`GROUPS`), or a system claim (`SYSTEM`)                                                                                                                      | Enum                                                   | True                                     |
| value                  | Specifies the value of the Claim. This value must be a string literal if `valueType` is `GROUPS`, and the string literal is matched with the selected `group_filter_type`. The value must be an Okta EL expression if `valueType` is `EXPRESSION`.   | String                                                 | True                                     |

##### Details for `group_filter_type`

If `valueType` is `GROUPS`, then the groups returned are filtered according to the value of `group_filter_type`:

* `STARTS_WITH`: Group names start with `value` (not case-sensitive). For example, if `value` is `group1`, then `group123` and `Group123` are included.
* `EQUALS`: Group name is the same as `value` (not case-sensitive). For example, if `value` is `group1`, then `group1` and `Group1` are included, but `group123` isn't.
* `CONTAINS`: Group names contain `value` (not case-sensitive). For example, if `value` is `group1`, then `MyGroup123` and `group1` are included.
* `REGEX`: Group names match the regular expression in `value` (case-sensitive). For example if `value` is `/^[a-z0-9_-]{3,16}$/`, then any Group name that has at least three letters, no more than 16, and contains lowercase letters, a hyphen, or numbers.

If you have complex filters for Groups, you can [create a Groups allow list](/docs/guides/customize-tokens-groups-claim/overview/) to put them all in a Claim.

##### Details for `alwaysIncludeInToken`

* Always `TRUE` for access token Claims.
* If `FALSE` for an ID token claim, the Claim won't be included in the ID token if ID token is requested with the access token or `authorization_code`, instead the client has to use the access token to get the Claims from the [userinfo endpoint](/docs/reference/api/oidc/#userinfo).

#### Get all Claims

<ApiOperation method="get" url="/api/v1/authorizationServers/${authServerId}/claims" />

Gets the Claims defined for a specified Custom Authorization Server

##### Request parameters


| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |

##### Request example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/claims"
```

##### Response example


Returns the [Claims](#claim-object) defined in the specified Custom Authorization Server


#### Get a Claim

<ApiOperation method="get" url="/api/v1/authorizationServers/${authServerId}/claims/${claimId}" />

Returns the Claim specified by the `claimId`

##### Request parameters


| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |
| claimId                 | ID of a Claim                       | String   | True     |

##### Request example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/claims/scpanemfdtktNn7w10h7"
```

##### Response example


Returns the [Claim](#claim-object) that you requested

#### Create a Claim

<ApiOperation method="post" url="/api/v1/authorizationServers/${authServerId}/claims" />

Creates a Claim for a Custom Authorization Server

##### Request parameters


| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |

##### Request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "carDriving",
  "status": "ACTIVE",
  "claimType": "RESOURCE",
  "valueType": "EXPRESSION",
  "value": "\"driving!\"",
  "conditions": {
    "scopes": [
      "car:drive"
    ]
  }
}' "https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/claims"
```

##### Response example

Returns the [Claim](#claim-object) that you created

#### Update a Claim

<ApiOperation method="put" url="/api/v1/authorizationServers/${authServerId}/claims/${claimId}" />

Changes the configuration of a Claim specified by the `claimId`

##### Request parameters

| Parameter               | Description                     | Type     | Required |
| :---------------------- | :------------------------------ | :------- | :------- |
| authServerId            | ID of an Authorization server   | String   | True     |
| claimId                 | ID of a Claim                   | String   | True     |

##### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "carDriving",
  "status": "ACTIVE",
  "claimType": "RESOURCE",
  "valueType": "EXPRESSION",
  "value": "\"driving!\"",
  "alwaysIncludeInToken": "true",
  "system": "false",
  "conditions": {
    "scopes": [
      "car:drive"
    ]
  }
}' "https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/claims/oclain6za1HQ0noop0h7"
```

##### Response example

Returns the [Claim](#claim-object) that you updated

#### Delete a Claim

<ApiOperation method="DELETE" url="/api/v1/authorizationServers/${authServerId}/claims/${claimId}" />

Deletes a Claim specified by the `claimId`

##### Request parameters

| Parameter               | Description                     | Type     | Required |
| :---------------------- | :------------------------------ | :------- | :------- |
| authServerId            | ID of an Authorization server   | String   | True     |
| claimId                 | ID of a Claim                   | String   | True     |

##### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/claims/oclain6za1HQ0noop0h7"
```

##### Response example


```http
HTTP/1.1 204 No Content
```

### Key Store operations

* [Get Authorization Server Keys](#get-authorization-server-keys)
* [Rotate Authorization Server Keys](#rotate-authorization-server-keys)

#### Credentials object

When you use these API endpoints to create or modify a Credentials resource, the response looks like:

```json
{
    "credentials": {
      "signing": {
        "rotationMode": "AUTO",
        "lastRotated": "2017-05-17T22:25:57.000Z",
        "nextRotation": "2017-08-15T22:25:57.000Z",
        "kid": "WYQxoK4XAwGFn5Zw5AzLxFvqEKLP79BbsKmWeuc5TB4",
        "use": "sig"
      }
    }
}
```

##### Credentials properties

| Property        | Description                                            | DataType     | Required     | Updatable  |
| :-------------- | :----------------------------------------------------- | :----------- | :----------- | :--------- |
| kid             | The ID of the JSON Web Key used for signing tokens issued by the Authorization Server  | String       | FALSE        | FALSE      |
| lastRotated     | The timestamp when the Authorization Server started to use the `kid` for signing tokens| String       | FALSE        | FALSE      |
| nextRotation    | The timestamp when the Authorization Server changes the Key for signing tokens. Only returned when `rotationMode` is `AUTO`.   | String       | FALSE        | FALSE      |
| rotationMode    | The Key rotation mode for the authorization server. Can be `AUTO` or `MANUAL`.| Enum     | FALSE        | TRUE       |
| use             | How the Key is used. Valid value: `sig`            |            |            |         |

#### Certificate JSON Web Key object

Defines a [JSON Web Key Set](https://tools.ietf.org/html/rfc7517) for an application's signature or encryption credential

When you use these API endpoints to create or modify a Certificate JSON Web Key resource, the response looks like:

```json
{
    "keys": [
        {
            "status": "ACTIVE",
            "alg": "RS256",
            "e": "AQAB",
            "n": "mZXlEiDy[...]Isor9Q",
            "kid": "WYQxoK4XAwGFn5Zw5AzLxFvqEKLP79BbsKmWeuc5TB4",
            "kty": "RSA",
            "use": "sig",
            "_links": {
              "self": {
                "href": "https://${yourOktaDomain}/api/v1/authorizationServers/default/credentials/keys/Vy8zLvevjtTVBAXC138BCq4HQ_vj_RzaTXtlr7ekxfY",
                "hints": {
                    "allow": [
                        "GET"
                    ]
                }
              }
            }
        }
    ]
}
```

##### Key properties

| Property    | Description                                                                              | Type   |
| :---------- | :--------------------------------------------------------------------------------------- | :----- |
| alg         | The algorithm used with the Key. Valid value: `RS256`                                    | String |
| e           | RSA Key value (exponent) for Key blinding                                               | String |
| kid         | The certificate's Key ID                                                                | String |
| kty         | Cryptographic algorithm family for the certificate's Key pair. Valid value: `RSA`        | String |
| n           | RSA modulus value                                                                       | String |
| status      | `ACTIVE`, `NEXT`, or `EXPIRED`                                                           | Enum   |
| use         | How the Key is used. Valid value: `sig`                                                  | String |

#### Get Authorization Server Keys

<ApiOperation method="get" url="/api/v1/authorizationServers/${authServerId}/credentials/keys" />

Returns the current, future, and expired [Keys](#certificate-json-web-key-object) used by the Custom Authorization Server

##### Request parameters


| Parameter               | Description   | Type   | Required |
| :---------------------- | :------------ | :----- | :------- |
| authServerId            | description   | type   | True     |

##### Request example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/credentials/keys"
```

##### Response example


```json
[
    {
        "status": "ACTIVE",
        "alg": "RS256",
        "e": "AQAB",
        "n": "g0MirhrysJMPm_wK45jvMbbyanfhl-jmTBv0o69GeifPaISaXGv8LKn3-CyJvUJcjjeHE17KtumJWVxUDRzFqtIMZ1ctCZyIAuWO0nLKilg7_EIDXJrS8k14biqkPO1lXGFwtjo3zLHeFSLw6sWf-CEN9zv6Ff3IAXb-RMYpfh-bVrWHH2PJr5HLJuIJIOLWxIgWsWCxjLW-UKI3la-gsahqTnm_r1LSCSYr6N4C-fh--w2_BW8DzTHalBYe76bNr0d7AqtR4tGazmrvc79Wa2bjyxmhhN1u9jSaZQqq-3VZEod8q35v1LoXniJQ4a2W8nDVqb6h4E8MUKYOpljTfQ",
        "kid": "RQ8DuhdxCczyMvy7GNJb4Ka3lQ99vrSo3oFBUiZjzzc",
        "kty": "RSA",
        "use": "sig",
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/credentials/keys/RQ8DuhdxCczyMvy7GNJb4Ka3lQ99vrSo3oFBUiZjzzc",
                "hints": {
                    "allow": [
                        "GET"
                    ]
                }
            }
        }
    },
    {
        "status": "NEXT",
        "alg": "RS256",
        "e": "AQAB",
        "n": "l1hZ_g2sgBE3oHvu34T-5XP18FYJWgtul_nRNg-5xra5ySkaXEOJUDRERUG0HrR42uqf9jYrUTwg9fp-SqqNIdHRaN8EwRSDRsKAwK
        3 HIJ2NJfgmrrO2ABkeyUq6rzHxAumiKv1iLFpSawSIiTEBJERtUCDcjbbqyHVFuivIFgH8L37 - XDIDb0XG - R8DOoOHLJPTpsgH - rJe
        M5w96VIRZInsGC5OGWkFdtgk6OkbvVd7_TXcxLCpWeg1vlbmX - 0 TmG5yjSj7ek05txcpxIqYu - 7 FIGT0KKvXge_BOSEUlJpBhLKU28
        OtsOnmc3NLIGXB - GeDiUZiBYQdPR - myB4ZoQ ",
        "kid": "Y3vBOdYT-l-I0j-gRQ26XjutSX00TeWiSguuDhW3ngo",
        "kty": "RSA",
        "use": "sig",
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/credentials/keys/Y3vBOdYT-l-I0j-gRQ26XjutSX00TeWiSguuDhW3ngo",
                "hints": {
                    "allow": [
                        "GET"
                    ]
                }
            }
        }
    },
    {
        "status": "EXPIRED",
        "alg": "RS256",
        "e": "AQAB",
        "n": "lC4ehVB6W0OCtNPnz8udYH9Ao83B6EKnHA5eTcMOap_lQZ-nKtS1lZwBj4wXRVc1XmS0d2OQFA1VMQ-dHLDE3CiGfsGqWbaiZFdW7U
        GLO1nAwfDdH6xp3xwpKOMewDXbAHJlXdYYAe2ap - CE9c5WLTUBU6JROuWcorHCNJisj1aExyiY5t3JQQVGpBz2oUIHo7NRzQoKimvp
        dMvMzcYnTlk1dhlG11b1GTkBclprm1BmOP7Ltjd7aEumOJWS67nKcAZzl48Zyg5KtV11V9F9dkGt25qHauqFKL7w3wu - DYhT0hmyFc
        wn - tXS6e6HQbfHhR_MQxysLtDGOk2ViWv8AQ ",
        "kid": "h5Sr3LXcpQiQlAUVPdhrdLFoIvkhRTAVs_h39bQnxlU",
        "kty": "RSA",
        "use": "sig",
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/credentials/keys/h5Sr3LXcpQiQlAUVPdhrdLFoIvkhRTAVs_h39bQnxlU",
                "hints": {
                    "allow": [
                        "GET"
                    ]
                }
            }
        }
    }
]
```

* The listed `ACTIVE` Key is used to sign tokens issued by the Authorization Aerver.
* The listed `NEXT` Key is the next Key that the Authorization Server uses to sign tokens when Keys are rotated. The NEXT Key might not be listed if it hasn't been generated yet.
* The listed `EXPIRED` Key is the previous Key that the Authorization Server used to sign tokens. The EXPIRED Key might not be listed if no Key has expired or the expired Key has been deleted.

#### Rotate Authorization Server Keys

<ApiOperation method="post" url="/api/v1/authorizationServers/${authServerId}/credentials/lifecycle/keyRotate" />

Rotates the current [Keys](#certificate-json-web-key-object) for a Custom Authorization Server. If you rotate Keys, the `ACTIVE` Key becomes the `EXPIRED` Key, the `NEXT` Key becomes the `ACTIVE` Key, and the Custom Authorization Server immediately begins using the new active Key to sign tokens.

> **Note:** Okta rotates your Keys automatically in `AUTO` mode. You can rotate Keys yourself in either mode. If Keys are rotated manually, any intermediate cache should be invalidated and Keys should be fetched again using the [Keys](#get-authorization-server-Keys) endpoint.

##### Request parameters

| Parameter   | Description                                                    | Param Type | DataType | Required |
| :---------  | :--------------------------------------------------------      | :--------- | :------- | :------- |
| use         | Purpose of the certificate. The only supported value is `sig`. | Body       | String   | True     |

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "use": "sig"
}' "https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/credentials/lifecycle/keyRotate"
```

##### Response example

```json
[
    {
        "status": "ACTIVE",
        "alg": "RS256",
        "e": "AQAB",
        "n": "g0MirhrysJMPm_wK45jvMbbyanfhl-jmTBv0o69GeifPaISaXGv8LKn3-CyJvUJcjjeHE17KtumJWVxUDRzFqtIMZ1ctCZyIAuWO0nLKilg7_EIDXJrS8k14biqkPO1lXGFwtjo3zLHeFSLw6sWf-CEN9zv6Ff3IAXb-RMYpfh-bVrWHH2PJr5HLJuIJIOLWxIgWsWCxjLW-UKI3la-gsahqTnm_r1LSCSYr6N4C-fh--w2_BW8DzTHalBYe76bNr0d7AqtR4tGazmrvc79Wa2bjyxmhhN1u9jSaZQqq-3VZEod8q35v1LoXniJQ4a2W8nDVqb6h4E8MUKYOpljTfQ",
        "kid": "Y3vBOdYT-l-I0j-gRQ26XjutSX00TeWiSguuDhW3ngo",
        "kty": "RSA",
        "use": "sig",
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/credentials/keys/Y3vBOdYT-l-I0j-gRQ26XjutSX00TeWiSguuDhW3ngo",
                "hints": {
                    "allow": [
                        "GET"
                    ]
                }
            }
        }
    },
    {
        "status": "NEXT",
        "alg": "RS256",
        "e": "AQAB",
        "n": "l1hZ_g2sgBE3oHvu34T-5XP18FYJWgtul_nRNg-5xra5ySkaXEOJUDRERUG0HrR42uqf9jYrUTwg9fp-SqqNIdHRaN8EwRSDRsKAwK
        3 HIJ2NJfgmrrO2ABkeyUq6rzHxAumiKv1iLFpSawSIiTEBJERtUCDcjbbqyHVFuivIFgH8L37 - XDIDb0XG - R8DOoOHLJPTpsgH - rJe
        M5w96VIRZInsGC5OGWkFdtgk6OkbvVd7_TXcxLCpWeg1vlbmX - 0 TmG5yjSj7ek05txcpxIqYu - 7 FIGT0KKvXge_BOSEUlJpBhLKU28
        OtsOnmc3NLIGXB - GeDiUZiBYQdPR - myB4ZoQ ",
        "kid": "T5dZ1dYT-l-I0j-gRQ82XjutSX00TeWiSguuDhW3zdf",
        "kty": "RSA",
        "use": "sig",
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/credentials/keys/T5dZ1dYT-l-I0j-gRQ82XjutSX00TeWiSguuDhW3zdf",
                "hints": {
                    "allow": [
                        "GET"
                    ]
                }
            }
        }
    },
    {
        "status": "EXPIRED",
        "alg": "RS256",
        "e": "AQAB",
        "n": "lC4ehVB6W0OCtNPnz8udYH9Ao83B6EKnHA5eTcMOap_lQZ-nKtS1lZwBj4wXRVc1XmS0d2OQFA1VMQ-dHLDE3CiGfsGqWbaiZFdW7U
        GLO1nAwfDdH6xp3xwpKOMewDXbAHJlXdYYAe2ap - CE9c5WLTUBU6JROuWcorHCNJisj1aExyiY5t3JQQVGpBz2oUIHo7NRzQoKimvp
        dMvMzcYnTlk1dhlG11b1GTkBclprm1BmOP7Ltjd7aEumOJWS67nKcAZzl48Zyg5KtV11V9F9dkGt25qHauqFKL7w3wu - DYhT0hmyFc
        wn - tXS6e6HQbfHhR_MQxysLtDGOk2ViWv8AQ ",
        "kid": "RQ8DuhdxCczyMvy7GNJb4Ka3lQ99vrSo3oFBUiZjzzc",
        "kty": "RSA",
        "use": "sig",
        "_links": {
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/credentials/keys/RQ8DuhdxCczyMvy7GNJb4Ka3lQ99vrSo3oFBUiZjzzc",
                "hints": {
                    "allow": [
                        "GET"
                    ]
                }
            }
        }
    }
]
```

#### Response example (error)

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8
```

```json
{
  "errorCode": "E0000001",
  "errorSummary": "Api validation failed: rotateKeys",
  "errorLink": "E0000001",
  "errorId": "oaeprak9qKHRlaWiclJ4oPJRQ",
  "errorCauses": [
    {
      "errorSummary": "Invalid value specified for key 'use' parameter."
    }
  ]
}
```

## Shared Objects

* [Rule object](#rule-object)
* [Conditions object](#conditions-object)

### Rule object

```json
{
  "type":"RESOURCE_ACCESS",
  "id":"0prbsjfyl01zfSZ9K0h7",
  "status":"ACTIVE",
  "name":"Default Policy Rule",
  "priority":1,
  "created":"2017-08-25T16:57:02.000Z",
  "lastUpdated":"2017-08-30T14:51:05.000Z",
  "system":false,
  "conditions":{
    "people":{
      "users":{
        "include":[

        ],
        "exclude":[

        ]
      },
      "groups":{
        "include":[
          "EVERYONE"
        ],
        "exclude":[

        ]
      }
    },
    "grantTypes":{
      "include":[
        "implicit",
        "client_credentials",
        "authorization_code",
        "password"
      ]
    },
    "scopes":{
      "include":[
        "*"
      ]
    }
  },
  "actions":{
    "token":{
      "accessTokenLifetimeMinutes":60,
      "refreshTokenLifetimeMinutes":0,
      "refreshTokenWindowMinutes":10080
    }
  },
  "_links":{
    "self":{
      "href":"https://${yourOktaDomain}/api/v1/authorizationServers/default/policies/00pbsjfykycpTsBvv0h7/rules/0prbsjfyl01zfSZ9K0h7",
      "hints":{
        "allow":[
          "GET",
          "PUT",
          "DELETE"
        ]
      }
    },
    "deactivate":{
      "href":"https://${yourOktaDomain}/api/v1/authorizationServers/default/policies/00pbsjfykycpTsBvv0h7/rules/0prbsjfyl01zfSZ9K0h7/lifecycle/deactivate",
      "hints":{
        "allow":[
          "POST"
        ]
      }
    }
  }
}
```

#### Rule properties

| Property      | Description                                                        | Data Type                                      | Required for Create  | Required for update    |
| :------------ | :----------------------------------------------------------------- | :--------------------------------------------- | :------------------- | :--------------------- |
| id            | Identifier of the rule                                             | String                                         | Assigned             | True                   |
| type          | Rule type. Valid values: `RESOURCE_ACCESS`                         | String (Enum)                                  | False                | False                  |
| name          | Name of the rule                                                   | String                                         | True                 | True                   |
| status        | Status of the rule: `ACTIVE` or `INACTIVE`                         | String (Enum)                                  | False                | False                  |
| priority      | Priority of the rule                                               | Integer                                        | False                | False                  |
| system        | This is set to 'true' on system rules, which can't be deleted.     | Boolean                                        | False                | False                  |
| created       | Timestamp when the rule was created                                | Date                                           | False                | Assigned               |
| lastUpdated   | Timestamp when the rule was last modified                          | Date                                           | False                | Assigned               |
| conditions    | Conditions for rule                                                | [Conditions object](#conditions-object)        | True                 | False                  |
| actions       | Actions for rule, dictates lifetime of granted tokens              | [Actions Objects](#actions-object)             | False                | False                  |
| _links        | Hyperlinks                                                         | [Links object](/docs/reference/api/policy/#links-object-2)                | Assigned             | False                  |

##### Actions object

* `accessTokenLifetimeMinutes`: minimum five minutes, maximum one day
* `refreshTokenLifetimeMinutes`: minimum access token lifetime
* `refreshTokenWindowMinutes`: minimum 10 minutes, maximum of five years

Example from a Rule object

```json
{
"actions": {
    "token": {
      "accessTokenLifetimeMinutes": 60,
      "refreshTokenLifetimeMinutes": 0,
      "refreshTokenWindowMinutes": 10080
    }
  }
}
```
See also the [Policy-Rule Actions object](/docs/reference/api/policy/#actions-objects) section

### Conditions object

Example from a Rule object

```json
{
  "conditions": {
    "people": {
      "users": {
        "include": [],
        "exclude": []
      },
      "groups": {
        "include": [
          "EVERYONE"
        ],
        "exclude": []
      }
    },
    "scopes": {
      "include": [
        "*"
      ]
    }
  }
}
```

Example from a Policy object
```json
{
  "conditions": {
    "clients": {
      "include": [
        "ALL_CLIENTS"
      ]
    }
  }
}
```

#### Condition properties

| Property     | Description                                                                                                                                                                                                                              | Type                            | Required for create or update |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------ | :---------------------------- |
| clients      | For Policies, specifies which clients are included or excluded in the Policy                                                                                                                                                             | `include` and `exclude` lists   | True                          |
| grantTypes   | Array of grantTypes that this condition includes. Accepted grantTypes: `authorization_code`, `interaction_code`, `password`, `refresh_token` or `client_credentials`. Determines the mechanism Okta uses to authorize the creation of the tokens. | `include` list         | True                          |
| people       | For rules, specifies which Users and Groups are included or excluded in the rule                                                                                                                                                         | `include` and `exclude` lists   | True                          |
| scopes       | Array of Scopes that this condition includes                                                                                                                                                                                             | `include` list                  | True                          |

See also the [Policy-Rule Conditions object](/docs/reference/api/policy/#conditions-object-2) section

## Client Resource operations

### List Client Resources for an Authorization Server

<ApiOperation method="get" url="/api/v1/authorizationServers/${authorizationServerId}/clients" />

Lists all Client Resources for which the specified Authorization Server has tokens

#### Request parameters

| Parameter                | Description                      | Parameter Type   | DataType   | Required |
| :----------------------- | :------------------------------- | :--------------- | :--------- | :------- |
| authorizationServerId    | ID of the Authorization Server   | URL              | String     | TRUE     |

#### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/clients"
```

#### Response example


```json
[
    {
        "client_id": "0oabskvc6442nkvQO0h7",
        "client_name": "My App",
        "client_uri": null,
        "logo_uri": null,
        "_links": {
            "tokens": {
                "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/clients/0oabskvc6442nkvQO0h7/tokens"
            }
        }
    }
]
```

## OAuth 2.0 token management operations

* [List refresh tokens](#list-refresh-tokens)
* [Get refresh token](#get-refresh-token)
* [Revoke all refresh tokens](#revoke-all-refresh-tokens)
* [Revoke refresh token](#revoke-refresh-token)

These endpoints allow you to manage tokens issued by an Authorization Server for a particular client. For example, you could revoke every active refresh token for a specific client. You can also [revoke specific tokens](/docs/guides/revoke-tokens/) or [manage tokens at the User level](/docs/reference/api/users/#user-oauth-2-0-token-management-operations).

Read [Validate access tokens](/docs/guides/validate-access-tokens/) and [Validate ID tokens](/docs/guides/validate-id-tokens/) to understand more about how OAuth 2.0 tokens work.

### List refresh tokens

<ApiOperation method="get" url="/api/v1/authorizationServers/${authorizationServerId}/clients/${clientId}/tokens" />

Lists all refresh tokens issued by an Authorization Server for a specific client

#### Request parameters


| Parameter               | Description                                                                                    | Param Type   | DataType   | Required   | Default |
| :---------------------- | :--------------------------------------------------------------------------------------------- | :----------- | :--------- | :--------- | :------ |
| after                   | Specifies the pagination cursor for the next page of tokens                                    | Query        | String     | FALSE      |         |
| authorizationServerId   | ID of the Authorization Server                                                                 | URL          | String     | TRUE       |         |
| clientId                | ID of the client                                                                               | URL          | String     | TRUE       |         |
| expand                  | Valid value: `scope`. If specified, scope details are included in the `_embedded` attribute.   | Query        | String     | FALSE      |         |
| limit                   | The maximum number of tokens to return (maximum 200)                                           | Query        | Number     | FALSE      | 20      |

#### Request example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/clients/0oabskvc6442nkvQO0h7/tokens"
```

#### Response example


```json
[
  {
    "id": "oar579Mcp7OUsNTlo0g3",
    "status": "ACTIVE",
    "created": "2018-03-09T03:18:06.000Z",
    "lastUpdated": "2018-03-09T03:18:06.000Z",
    "expiresAt": "2018-03-16T03:18:06.000Z",
    "issuer": "https://${yourOktaDomain}/oauth2/ausnsopoM6vBRB3PD0g3",
    "clientId": "0oabskvc6442nkvQO0h7",
    "userId": "00upcgi9dyWEOeCwM0g3",
    "scopes": [
      "offline_access",
      "car:drive"
    ],
    "_links": {
      "app": {
        "href": "https://${yourOktaDomain}/api/v1/apps/0oabskvc6442nkvQO0h7",
        "title": "Native"
      },
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/clients/0oabskvc6442nkvQO0h7/tokens/oar579Mcp7OUsNTlo0g3"
      },
      "revoke": {
        "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/clients/0oabskvc6442nkvQO0h7/tokens/oar579Mcp7OUsNTlo0g3",
        "hints": {
          "allow": [
            "DELETE"
          ]
        }
      },
      "client": {
        "href": "https://${yourOktaDomain}/oauth2/v1/clients/0oabskvc6442nkvQO0h7",
        "title": "Example Client App"
      },
      "user": {
        "href": "https://${yourOktaDomain}/api/v1/users/00upcgi9dyWEOeCwM0g3",
        "title": "Saml Jackson"
      },
      "authorizationServer": {
        "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3",
        "title": "Example Authorization Server"
      }
    }
  }
]
```


### Get refresh token


<ApiOperation method="get" url="/api/v1/authorizationServers/${authorizationServerId}/clients/${clientId}/tokens/${tokenId}" />

Gets a refresh token issued by an Authorization Server for the specified client

#### Request parameters


| Parameter               | Description                                                                                    | Param Type   | DataType   | Required   | Default |
| :---------------------- | :--------------------------------------------------------------------------------------------- | :----------- | :--------- | :--------- | :------ |
| authorizationServerId   | ID of the Authorization Server                                                                 | URL          | String     | TRUE       |         |
| clientId                | ID of the client                                                                               | URL          | String     | TRUE       |         |
| expand                  | Valid value: `scope`. If specified, scope details are included in the `_embedded` attribute.   | Query        | String     | FALSE      |         |
| tokenId                 | ID of the token                                                                                | URL          | String     | TRUE       |         |

#### Request example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authorizationServers/default/clients/0oabskvc6442nkvQO0h7/tokens/oar579Mcp7OUsNTlo0g3?expand=scope"
```

#### Response example


```json
{
  "id": "oar579Mcp7OUsNTlo0g3",
  "status": "ACTIVE",
  "created": "2018-03-09T03:18:06.000Z",
  "lastUpdated": "2018-03-09T03:18:06.000Z",
  "expiresAt": "2018-03-16T03:18:06.000Z",
  "issuer": "https://${yourOktaDomain}/oauth2/default",
  "clientId": "0oabskvc6442nkvQO0h7",
  "userId": "00upcgi9dyWEOeCwM0g3",
  "scopes": [
    "offline_access",
    "car:drive"
  ],
  "_embedded": {
    "scopes": [
      {
        "id": "scppb56cIl4GvGxy70g3",
        "name": "offline_access",
        "description": "Requests a refresh token by default, used to obtain more access tokens without re-prompting the user for authentication.",
        "_links": {
          "scope": {
            "href": "https://${yourOktaDomain}/api/v1/authorizationServers/default/scopes/scppb56cIl4GvGxy70g3",
            "title": "offline_access"
          }
        }
      },
      {
        "id": "scp142iq2J8IGRUCS0g4",
        "name": "car:drive",
        "displayName": "Drive car",
        "description": "Allows the user to drive a car.",
        "_links": {
          "scope": {
            "href": "https://${yourOktaDomain}/api/v1/authorizationServers/default/scopes/scp142iq2J8IGRUCS0g4",
            "title": "Drive car"
          }
        }
      }
    ]
  },
  "_links": {
    "app": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabskvc6442nkvQO0h7",
      "title": "Native"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/authorizationServers/default/clients/0oabskvc6442nkvQO0h7/tokens/oar579Mcp7OUsNTlo0g3"
    },
    "revoke": {
      "href": "https://${yourOktaDomain}/api/v1/authorizationServers/default/clients/0oabskvc6442nkvQO0h7/tokens/oar579Mcp7OUsNTlo0g3",
      "hints": {
        "allow": [
          "DELETE"
        ]
      }
    },
    "client": {
      "href": "https://${yourOktaDomain}/oauth2/v1/clients/0oabskvc6442nkvQO0h7",
      "title": "Example Client App"
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00upcgi9dyWEOeCwM0g3",
      "title": "Saml Jackson"
    },
    "authorizationServer": {
      "href": "https://${yourOktaDomain}/api/v1/authorizationServers/default",
      "title": "Example Authorization Server"
    }
  }
}
```

### Revoke all refresh tokens


<ApiOperation method="delete" url="/api/v1/authorizationServers/${authorizationServerId}/clients/${clientId}/tokens" />

Revokes all refresh tokens issued by an Authorization Server for the specified client. Any access tokens issued with these refresh tokens are also revoked, but access tokens issued without a refresh token aren't affected.

#### Request parameters


| Parameter               | Description                                | Parameter Type   | DataType   | Required |
| :---------------------- | :----------------------------------------- | :--------------- | :--------- | :------- |
| authorizationServerId   | ID of the Authorization Server             | URL              | String     | TRUE     |
| clientId                | ID of the client                           | URL              | String     | TRUE     |

#### Request example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authorizationServers/default/clients/0oabskvc6442nkvQO0h7/tokens"
```

#### Response example


```http
HTTP/1.1 204 No Content
```

### Revoke refresh token


<ApiOperation method="delete" url="/api/v1/authorizationServers/${authServerId}/clients/${clientId}/tokens/${tokenId}" />

Revokes the specified refresh token. If an access token was issued with this refresh token, it is also revoked.

#### Request parameters


| Parameter               | Description                                | Parameter Type   | DataType   | Required |
| :---------------------- | :----------------------------------------- | :--------------- | :--------- | :------- |
| authorizationServerId   | ID of the Authorization Server             | URL              | String     | TRUE     |
| clientId                | ID of the client                           | URL              | String     | TRUE     |
| tokenId                 | ID of the token                            | URL              | String     | TRUE     |

#### Request example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/authorizationServers/default/clients/0oabskvc6442nkvQO0h7/tokens/oar579Mcp7OUsNTlo0g3"
```

#### Response example


```http
HTTP/1.1 204 No Content
```
