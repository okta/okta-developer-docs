---
title: Authorization Servers
category: management
---

# Authorization Servers

Authorization Servers generate OAuth 2.0 and OpenID Connect tokens, including access tokens and ID tokens. The Okta Management API gives you the ability to configure and manage Authorization Servers and the security policies that are attached to them. The following configuration operations can be found on this page:

* [Authorization Server Operations](#authorization-server-operations)
* [Policy Operations](#policy-operations)
* [Scope Operations](#scope-operations)
* [Claim Operations](#claim-operations)
* [Key Store Operations](#key-store-operations)

This page also has information about the [OAuth 2.0 Objects](#oauth-20-objects) related to these operations.

### Authorization Server Operations

Use the following operations to manage Custom Authorization Servers:Fil

* [Create](#create-authorization-server)
* [List](#list-authorization-servers)
* [Get](#get-authorization-server)
* [Update](#update-authorization-server)
* [Delete](#delete-authorization-server)
* [Activate](#activate-authorization-server)
* [Deactivate](#deactivate-authorization-server)

#### Working with the Default Authorization Server

Okta provides a pre-configured Custom Authorization Server with the name `default`.
This default Authorization Server includes a basic access policy and rule, which you can edit to control access.
It allows you to specify `default` instead of the `authServerId` in requests to it:

* `https://{yourOktaDomain}/api/v1/authorizationServers/default` vs
* `https://{yourOktaDomain}/api/v1/authorizationServers/${authServerId}` for other Custom Authorization Servers

#### Authorization Server Object
When you use these API endpoints to create or modify an Authorization Server resource, the response looks like:

```json
{
  "id": "ausain6z9zIedDCxB0h7",
  "name": "Sample Authorization Server",
  "description": "Authorization Server Description",
  "audiences": "https://api.resource.com",
  "issuer": "https://{yourOktaDomain}/oauth2/ausain6z9zIedDCxB0h7",
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
        "href": "https://{yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/scopes",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "claims": {
        "href": "https://{yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/claims",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "policies": {
        "href": "https://{yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/policies",
        "hints": {
          "allow": [
            "GET"
          ]
        }
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
        "href": "https://{yourOktaDomain}/oauth2/ausain6z9zIedDCxB0h7/.well-known/oauth-authorization-server",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      {
        "name": "openid-configuration",
        "href": "https://{yourOktaDomain}/oauth2/ausain6z9zIedDCxB0h7/.well-known/openid-configuration",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      }
    ],
    "rotateKey": {
      "href": "https://{yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/credentials/lifecycle/keyRotate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "deactivate": {
          "href": "https://{yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/lifecycle/deactivate",
          "hints": {
            "allow": [
              "POST"
        ]
      }
    }
  }
}
```

##### Authorization Server Properties

| Property                                | Description                                                                                                                                                         | Type                                                                      | Required for create or update |
| :------------                           | :---------------------------------------------------------------------------------------------------------------------                                              | :------------------------------------------------------------------------ | :---------------------------- |
| audiences                               | The recipients that the tokens are intended for. This becomes the `aud` claim in an access token.                                                                   | Array                                                                     | True                          |
| credentials                             | Keys and settings used to sign tokens.                                                                                                                              | [Credentials Object](#credentials-object)                                 | False                         |
| description                             | The description of a Custom Authorization Server                                                                                                                    | String                                                                    | True                          |
| issuer                                  | The complete URL for a Custom Authorization Server. This becomes the `iss` claim in an access token.                                                                | String                                                                    | False                         |
| issuerMode <ApiLifecycle access="ea" /> | Indicates which value is specified in the issuer of the tokens that a Custom Authorization Server returns: the original Okta org domain URL or a custom domain URL. | String                                                                    | False                         |
| name                                    | The name of a Custom Authorization Server                                                                                                                           | String                                                                    | True                          |
| status                                  | Indicates whether a Custom Authorization Server is `ACTIVE` or `INACTIVE`.                                                                                          | Enum                                                                      | False                         |
| _links                                  | List of discoverable resources related to a Custom Authorization Server                                                                                             | Links                                                                     | False                         |

##### Property Details

`issuerMode` is visible if you have the Custom URL Domain feature enabled. If the feature is enabled, you can set a custom domain URL in a Custom Authorization Server, and this property is returned in the appropriate responses. To enable the Custom URL Domain feature, contact [Support](https://support.okta.com/help/open_case).

* If set to `ORG_URL`, then in responses, `issuer` is the Okta org's original domain URL: `https://{yourOktaDomain}`.

* If set to `CUSTOM_URL_DOMAIN`, then in responses, `issuer` is the custom domain URL configured in the administration user interface.

After you enable the Custom URL Domain feature, all new Custom Authorization Servers use `CUSTOM_URL_DOMAIN` by default. All existing Custom Authorization Servers continue to use `ORG_URL` until changed via the administration UI or API, so that existing integrations with client and resource server continue to work after the feature is enabled.

#### Create Authorization Server

<ApiOperation method="post" url="/api/v1/authorizationServers" />

Creates a new [Custom Authorization Server](#authorization-server-object)

##### Request Parameters

[Authorization Server Properties](#authorization-server-properties)

##### Request Example

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
}' "https://{yourOktaDomain}/api/v1/authorizationServers"
```

##### Response Example


The [Custom Authorization Server](#authorization-server-object) you just created.

#### List Authorization Servers


<ApiOperation method="GET" url="/api/v1/authorizationServers" />

Lists all Custom Authorization Servers in this Okta organization

##### Request Parameters


None

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/authorizationServers"
```

##### Response Example


The [Custom Authorization Servers](#authorization-server-object) in this Okta organization.

#### Get Authorization Server


<ApiOperation method="get" url="/api/v1/authorizationServers/${authServerId}" />

Returns the [Custom Authorization Server](#authorization-server-object) identified by `authServerId`.

##### Request Parameters


| Parameter               | Description                                                                     | Type     | Required |
| :---------------------- | :-------------------------------------------------------------------------      | :------- | :------- |
| authServerId            | Custom Authorization Server ID. You can find the ID in the Okta user interface. | String   | True     |

#### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/authorizationServers/aus5m9r1o4AsDJLe50g4"
```

##### Response Example


The [Custom Authorization Server](#authorization-server-object) you requested by '{authServerId}`.

#### Update Authorization Server


<ApiOperation method="put" url="/api/v1/authorizationServers/${authServerId}" />

Updates Authorization Server identified by `authServerId`.

>NOTE: Switching between rotation modes won't change the active signing key.

##### Request Parameters


| Parameter     | Description                                                                                                            | Type                                                                                                      | Required |
| :------------ | :----------------------------------------------------------------------------------------------------------------      | :-------------------------------------------------------------------------------------------------------- | :------- |
| audiences     | The list of audiences this Custom Authorization Server can issue tokens to, currently Okta only supports one audience. | Array                                                                                                     | TRUE     |
| credentials   | The credentials signing object with the `rotationMode` of the Authorization Server                                     | [Authorization server credentials object](#credentials-object)                                            | FALSE    |
| description   | The description of the Authorization Server                                                                            | String                                                                                                    | FALSE    |
| name          | The name of the Authorization Server                                                                                   | String                                                                                                    | TRUE     |

#### Request Example


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
}' "https://{yourOktaDomain}/api/v1/authorizationServers/aus1rqsshhhRoat780g7"
```

##### Response Example


The [Custom Authorization Server](#authorization-server-object) you updated

#### Delete Authorization Server


<ApiOperation method="delete" url="/api/v1/authorizationServers/${authServerId}" />

Deletes the Custom Authorization Server identified by `authServerId`.

##### Request Parameters


| Parameter               | Description                                       | Type     | Required |
| :---------------------- | :---------------------------------------------    | :------- | :------- |
| authServerId            | The ID of a Custom Authorization Server to delete | String   | TRUE     |

##### Request Example


```bash
curl -X DELETE \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/authorizationServers/aus1rqsshhhRoat780g7"
```

##### Response Example


```http
HTTP 204: No Content
```

#### Activate Authorization Server


<ApiOperation method="post" url="/api/v1/authorizationServers/${authServerId}/lifecycle/activate" />

Make a Custom Authorization Server for use by clients

##### Request Parameters


| Parameter               | Description                                         | Type     | Required |
| :---------------------- | :-----------------------------------------------    | :------- | :------- |
| authServerId            | The ID of a Custom Authorization Server to activate | String   | TRUE     |

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/authorizationServers/aus1sb3dl8L5WoTOO0g7/lifecycle/activate"
```

##### Response Example


```http
HTTP 204: No Content
```

#### Deactivate Authorization Server


<ApiOperation method="post" url="/api/v1/authorizationServers/${authServerId}/lifecycle/deactivate" />

Make a Custom Authorization Server unavailable to clients. An inactive Custom Authorization Server can be returned to `ACTIVE` status by activating it again.

##### Request Parameters


| Parameter               | Description                                           | Type     | Required |
| :---------------------- | :-------------------------------------------------    | :------- | :------- |
| authServerId            | The ID of a Custom Authorization Server to deactivate | String   | TRUE     |

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/authorizationServers/aus1sb3dl8L5WoTOO0g7/lifecycle/deactivate"
```

##### Response Example


```http
HTTP 204: No Content
```

### Policy Operations

* [Policy Object](#policy-object)
* [Get All Policies](#get-all-policies)
* [Get a Policy](#get-a-policy)
* [Create a Policy](#create-a-policy)
* [Update a Policy](#update-a-policy)
* [Delete a Policy](#delete-a-policy)

#### Policy Object
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
        "href": "https://{yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/policies/00palyaappA22DPkj0h7",
        "hints": {
          "allow": [
            "GET",
            "PUT",
            "DELETE"
          ]
        }
      },
      "deactivate": {
        "href": "https://{yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/policies/00palyaappA22DPkj0h7/lifecycle/deactivate",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "rules": {
        "href": "https://{yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/policies/00palyaappA22DPkj0h7/rules",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      }
    }
  }
```

#### Policy Properties

| Property      | Description                                                                                                                | Type                                    | Required for create or update |
| :------------ | :------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------- | :---------------------------- |
| created       | Timestamp when the policy was created                                                                                      | DateTime                                | System                        |
| conditions    | Specifies the clients that the policy applies to.                                                                  | [Condition Object](#condition-object)   | False                         |
| description   | Description of the policy                                                                                                  | String                                  | True                          |
| id            | ID of the policy                                                                                                           | String                                  | True except for create        |
| lastUpdated   | Timestamp when the policy was last updated                                                                                 | DateTime                                | System                        |
| name          | Name of the policy                                                                                                         | String                                  | True                          |
| priority      | Specifies the order in which this policy is evaluated in relation to the other policies in a Custom Authorization Server   | Integer                                 | True                          |
| status        | Specifies whether requests have access to this policy. Valid values: `ACTIVE` or `INACTIVE`                                | Enum                                    | True                          |
| system        | Specifies whether Okta created this policy (`true`) or not (`false`).                                                      | Boolean                                 | True                          |
| type          | Indicates that the policy is an authorization server policy (`OAUTH_AUTHORIZATION_POLICY`)                                 | String                                  | False                         |
| _links        | List of discoverable resources related to the policy                                                                       | Links                                   | System                        |

#### Get All Policies

<ApiOperation method="get" url="/api/v1/authorizationServers/${authServerId}/policies" />

Returns all the policies for the specified Custom Authorization Server

##### Request Parameters

| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |

##### Request Example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/policies"
```

##### Response Example

Returns the [policies](#policy-object) defined in the specified Custom Authorization Server

#### Get a Policy

<ApiOperation method="get" url="/api/v1/authorizationServers/${authServerId}/policies/${policyId}" />

Returns a policy by ID defined in the specified Custom Authorization Server

##### Request Parameters


| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |
| policyId                | ID of a policy                      | String   | True     |

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/policies/00p5m9xrrBffPd9ah0g4"
```

##### Response Example


Returns the [policy](#policy-object) you requested

#### Create a Policy

<ApiOperation method="post" url="/api/v1/authorizationServers/${authServerId}/policies" />

Create a policy for a Custom Authorization Server

##### Request Parameters


[Policy Object](#policy-object)

##### Request Example


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
}' "https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/policies"
```

##### Response Example


Returns the [policy](#policy-object) you created

#### Update a Policy

<ApiOperation method="put" url="/api/v1/authorizationServers/${authServerId}/policies/${policyId}" />

Change the configuration of a policy specified by the `policyId`

##### Request Parameters


| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |
| policyId                | ID of a policy                      | String   | True     |


##### Request Example


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
}' "https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/policies/00p5m9xrrBffPd9ah0g4"
```

##### Response Example


Returns the [policy](#policy-object) you updated

#### Delete a Policy

<ApiOperation method="DELETE" url="/api/v1/authorizationServers/${authServerId}/policies/${policyId}" />

Delete a policy specified by the `policyId`


##### Request Parameters


| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |
| policyId                | ID of a policy                      | String   | True     |

##### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/policies/00p5m9xrrBffPd9ah0g4"
```

##### Response Example


```json
Status 204: No content
```

### Scope Operations

* [Get All Scopes](#get-all-scopes)
* [Get a Scope](#get-a-scope)
* [Create a Scope](#create-a-scope)
* [Update a Scope](#update-a-scope)
* [Delete a Scope](#delete-a-scope)

#### Scope Object
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

#### Scope Properties

| Property                                 | Description                                                                                             | Type      | Default        | Required for create or update              |
| :-------------------------------------   | :------------------------------------------------------------------------------------------------------ | :-------- | :------------- | :----------------------------              |
| consent <ApiLifecycle access="ea" />     | Indicates whether a consent dialog is needed for the scope. Valid values: `REQUIRED`, `IMPLICIT`.       | Enum      | `IMPLICIT`     | True unless this EA feature isn't enabled |
| default                                  | Whether test the scope is a default scope                                                               | Boolean   |                | False                                      |
| description                              | Description of the scope                                                                                | String    |                | False                                      |
| displayName <ApiLifecycle access="ea" /> | Name of the end user displayed in a consent dialog window                                                      | String    |                | False                                      |
| id                                       | ID of the scope                                                                                         | String    |                | False                                      |
| metadataPublish                          | Whether or not the scope should be included in the metadata. Valid values: `NO_CLIENTS`, `ALL_CLIENTS`  | Enum      | `NO_CLIENTS`   | True except for create                     |
| name                                     | Name of the scope                                                                                       | String    |                | True                                       |
| system                                   | Whether Okta created the scope                                                                          | Boolean   |                | False                                      |

* <ApiLifecycle access="ea" /> A consent dialog appears depending on the values of three elements:
    * `prompt`, a query parameter used in requests to [`/authorize`](/docs/reference/api/oidc/#authorize)
    * `consent_method`, a property on [apps](/docs/reference/api/apps/#settings-7)
    * `consent`, a property on scopes as listed in the table above

| `prompt` Value      | `consent_method`                   | `consent`                     | Result       |
| :------------------ | :--------------------------------- | :---------------------------- | :----------- |
| `CONSENT`           | `TRUSTED` or `REQUIRED`            | `REQUIRED`                    | Prompted     |
| `CONSENT`           | `TRUSTED`                          | `IMPLICIT`                    | Not prompted |
| `NONE`              | `TRUSTED`                          | `REQUIRED` or `IMPLICIT`      | Not prompted |
| `NONE`              | `REQUIRED`                         | `REQUIRED`                    | Prompted     |
| `NONE`              | `REQUIRED`                         | `IMPLICIT`                    | Not prompted |

**Notes:**
  * Apps created on `/api/v1/apps` default to `consent_method=TRUSTED`, while those created on `/api/v1/clients` default to `consent_method=REQUIRED`.
  * If you request a scope that requires consent while using the `client_credentials` flow, an error is returned. Because there is no user, no consent can be given.

#### Get All Scopes

<ApiOperation method="get" url="/api/v1/authorizationServers/${authServerId}/scopes" />

Get the scopes defined for a specified Custom Authorization Server

##### Request Parameters

| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |

##### Request Example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/scopes"
```

##### Response Example


Returns the [scopes](#scope-object) defined in the specified Custom Authorization Server


#### Get a Scope

<ApiOperation method="get" url="/api/v1/authorizationServers/${authServerId}/scopes/${scopeId}" />

Get a scope specified by the `scopeId`

##### Request Parameters


| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |
| scopeId                 | ID of a scope                       | String   | True     |

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/scopes/scpanemfdtktNn7w10h7"
```

##### Response Example


Returns the [scope](#scope-object) you requested

#### Create a Scope

<ApiOperation method="post" url="/api/v1/authorizationServers/${authServerId}/scopes" />

Create a scope for a Custom Authorization Server

##### Request Parameters


| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "description": "Drive car",
  "name": "car:drive",
  "consent": "REQUIRED"
}' "https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/scopes"
```

##### Response Example


Returns the [scope](#scope-object) you created

#### Update a Scope

<ApiOperation method="put" url="/api/v1/authorizationServers/${authServerId}/scopes/${scopeId}" />

Change the configuration of a scope specified by the `scopeId`

##### Request Parameters


| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |
| scopeId                 | ID of a scope                       | String   | True     |


##### Request Example


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
}' "https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/scopes/scpanemfdtktNn7w10h7"
```

##### Response Example


Returns the [scope](#scope-object) you updated

#### Delete a Scope

<ApiOperation method="DELETE" url="/api/v1/authorizationServers/${authServerId}/scopes/${scopeId}" />

Delete a scope specified by the `scopeId`


##### Request Parameters


| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |
| scopeId                 | ID of a scope                       | String   | True     |

##### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/scopes/00p5m9xrrBffPd9ah0g4"
```

##### Response Example


```http
HTTP 204: No Content
```

### Claim Operations

* [Get All Claims](#get-all-claims)
* [Get a Claim](#get-a-claim)
* [Create a Claim](#create-a-claim)
* [Update a Claim](#update-a-claim)
* [Delete a Claim](#delete-a-claim)

#### Claim Object
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

#### Claim Properties

| Property               | Description                                                                                                                                                                                                                                        | Type                                                   | Required for create or update            |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------- | :--------------------------------------- |
| alwaysIncludeInToken   | Specifies whether to include claims in token. [Details](#details-for-alwaysincludeintoken)                                                                                                                                                         | Boolean                                                | False                                    |
| claimType              | Specifies whether the claim is for an access token (`RESOURCE`) or ID token (`IDENTITY`)                                                                                                                                                           | Enum                                                   | True                                     |
| conditions             | Specifies the scopes for this claim                                                                                                                                                                                                                | [Condition Object](#condition-object)                  | False                                    |
| group_filter_type        | Specifies the type of group filter if `valueType` is `GROUPS`. [Details](#details-for-groupfiltertype)                                                                                                                                             | Enum                                                   | False                                    |
| id                     | ID of the claim                                                                                                                                                                                                                                    | String                                                 | True except for create or get all claims |
| name                   | Name of the claim                                                                                                                                                                                                                                  | String                                                 | True                                     |
| status                 | Specifies whether requests have access to this claim. Valid values: `ACTIVE` or `INACTIVE`                                                                                                                                                         | Enum                                                   | True                                     |
| system                 | Specifies whether Okta created this claim                                                                                                                                                                                                          | Boolean                                                | System                                   |
| valueType              | Specifies whether the claim is an Okta EL expression (`EXPRESSION`), a set of groups (`GROUPS`), or a system claim (`SYSTEM`)                                                                                                                      | Enum                                                   | True                                     |
| value                  | Specifies the value of the claim. This value must be a string literal if `valueType` is `GROUPS`, and the string literal is matched with the selected `group_filter_type`. The value must be an Okta EL expression if `valueType` is `EXPRESSION`.   | String                                                 | True                                     |

##### Details for `group_filter_type`

If `valueType` is `GROUPS`, then the groups returned are filtered according to the value of `group_filter_type`:

* `STARTS_WITH`: Group names start with `value` (not case sensitive). For example, if `value` is `group1`, then `group123` and `Group123` are included.
* `EQUALS`: Group name is the same as `value` (not case sensitive). For example, if `value` is `group1`, then `group1` and `Group1` are included, but `group123` isn't.
* `CONTAINS`: Group names contain `value` (not case sensitive). For example, if `value` is `group1`, then `MyGroup123` and `group1` are included.
* `REGEX`: Group names match the regular expression in `value` (case sensitive). For example if `value` is `/^[a-z0-9_-]{3,16}$/`, then any group name that has at least 3 letters, no more than 16, and contains lower case letters, a hyphen, or numbers.

If you have complex filters for groups, you can [create a groups whitelist](/docs/guides/create-token-with-groups-claim/create-groups-claim/) to put them all in a claim.

##### Details for `alwaysIncludeInToken`

* Always `TRUE` for access token claims.
* If `FALSE` for an ID token claim, the claim won't be included in the ID token if ID token is requested with the access token or `authorization_code`, instead the client has to use the access token to get the claims from the [userinfo endpoint](/docs/reference/api/oidc/#userinfo).

#### Get All Claims

<ApiOperation method="get" url="/api/v1/authorizationServers/${authServerId}/claims" />

Get the claims defined for a specified a Custom Authorization Server

##### Request Parameters


| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/claims"
```

##### Response Example


Returns the [claims](#claim-object) defined in the specified Custom Authorization Server


#### Get a Claim

<ApiOperation method="get" url="/api/v1/authorizationServers/${authServerId}/claims/${claimId}" />

Returns the claim specified by the `claimId`

##### Request Parameters


| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |
| claimId                 | ID of a claim                       | String   | True     |

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/claims/scpanemfdtktNn7w10h7"
```

##### Response Example


Returns the [claim](#claim-object) you requested

#### Create a Claim

<ApiOperation method="post" url="/api/v1/authorizationServers/${authServerId}/claims" />

Creates a claim for a Custom Authorization Server

##### Request Parameters


| Parameter               | Description                         | Type     | Required |
| :---------------------- | :------------------------------     | :------- | :------- |
| authServerId            | ID of a Custom Authorization Server | String   | True     |

##### Request Example


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
}' "https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/claims"
```

##### Response Example

Returns the [claim](#claim-object) you created

#### Update a Claim

<ApiOperation method="put" url="/api/v1/authorizationServers/${authServerId}/claims/${claimId}" />

Change the configuration of a claim specified by the `claimId`

##### Request Parameters

| Parameter               | Description                     | Type     | Required |
| :---------------------- | :------------------------------ | :------- | :------- |
| authServerId            | ID of an Authorization server   | String   | True     |
| claimId                 | ID of a claim                   | String   | True     |

##### Request Example

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
}' "https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/claims/oclain6za1HQ0noop0h7"
```

##### Response Example

Returns the [claim](#claim-object) you updated

#### Delete a Claim

<ApiOperation method="DELETE" url="/api/v1/authorizationServers/${authServerId}/claims/${claimId}" />

Delete a claim specified by the `claimId`

##### Request Parameters

| Parameter               | Description                     | Type     | Required |
| :---------------------- | :------------------------------ | :------- | :------- |
| authServerId            | ID of an Authorization server   | String   | True     |
| claimId                 | ID of a claim                   | String   | True     |

##### Request Example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/claims/oclain6za1HQ0noop0h7"
```

##### Response Example


```http
HTTP 204: No Content
```

### Key Store Operations

* [Get Authorization Server Keys](#get-authorization-server-keys)
* [Rotate Authorization Server Keys](#rotate-authorization-server-keys)

#### Credentials Object
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
##### Credentials Properties

| Property        | Description                                            | DataType     | Required     | Updatable  |
| :-------------- | :----------------------------------------------------- | :----------- | :----------- | :--------- |
| kid             | The ID of the JSON Web Key used for signing tokens issued by the authorization server.  | String       | FALSE        | FALSE      |
| lastRotated     | The timestamp when the authorization server started to use the `kid` for signing tokens.| String       | FALSE        | FALSE      |
| nextRotation    | The timestamp when the authorization server changes the key for signing tokens. Only returned when `rotationMode` is `AUTO`.   | String       | FALSE        | FALSE      |
| rotationMode    | The key rotation mode for the authorization server. Can be `AUTO` or `MANUAL`.| Enum     | FALSE        | TRUE       |
| use             | How the key is used. Valid value: `sig`            |            |            |         |

#### Certificate JSON Web Key Object
This object defines a [JSON Web Key Set](https://tools.ietf.org/html/rfc7517) for an application's signature or encryption credential.

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
                "href": "https://{yourOktaDomain}/api/v1/authorizationServers/default/credentials/keys/Vy8zLvevjtTVBAXC138BCq4HQ_vj_RzaTXtlr7ekxfY",
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

##### Key Properties

| Property    | Description                                                                              | Type   |
| :---------- | :--------------------------------------------------------------------------------------- | :----- |
| alg         | The algorithm used with the key. Valid value: `RS256`                                    | String |
| e           | RSA key value (exponent) for key blinding.                                               | String |
| kid         | The certificate's key ID.                                                                | String |
| kty         | Cryptographic algorithm family for the certificate's key pair. Valid value: `RSA`        | String |
| n           | RSA modulus value.                                                                       | String |
| status      | `ACTIVE`, `NEXT`, or `EXPIRED`                                                           | Enum   |
| use         | How the key is used. Valid value: `sig`                                                  | String |

#### Get Authorization Server Keys

<ApiOperation method="get" url="/api/v1/authorizationServers/${authServerId}/credentials/keys" />

Returns the current, future, and expired [keys](#certificate-json-web-key-object) used by the Custom Authorization Server.

##### Request Parameters


| Parameter               | Description   | Type   | Required |
| :---------------------- | :------------ | :----- | :------- |
| authServerId            | description   | type   | True     |

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/credentials/keys"
```

##### Response Example


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
                "href": "https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/credentials/keys/RQ8DuhdxCczyMvy7GNJb4Ka3lQ99vrSo3oFBUiZjzzc",
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
                "href": "https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/credentials/keys/Y3vBOdYT-l-I0j-gRQ26XjutSX00TeWiSguuDhW3ngo",
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
                "href": "https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/credentials/keys/h5Sr3LXcpQiQlAUVPdhrdLFoIvkhRTAVs_h39bQnxlU",
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

* The listed `ACTIVE` key is used to sign tokens issued by the Authorization Aerver.
* The listed `NEXT` key is the next key that the Authorization Server will use to sign tokens when keys are rotated. The NEXT key might not be listed if it has not been generated yet.
* The listed `EXPIRED` key is the previous key that the Authorization Server used to sign tokens. The EXPIRED key might not be listed if no key has expired or the expired key has been deleted.

#### Rotate Authorization Server Keys

<ApiOperation method="post" url="/api/v1/authorizationServers/${authServerId}/credentials/lifecycle/keyRotate" />

Rotates the current [keys](#certificate-json-web-key-object) for a Custom Authorization Server. If you rotate keys, the `ACTIVE` key becomes the `EXPIRED` key, the `NEXT` key becomes the `ACTIVE` key, and the Custom Authorization Server immediately begins using the new active key to sign tokens.

>NOTE: Okta rotates your keys automatically in `AUTO` mode. You can rotate keys yourself in either mode. If keys are rotated manually, any intermediate cache should be invalidated and keys should be fetched again using the [keys](#get-authorization-server-keys) endpoint.

##### Request Parameters

| Parameter   | Description                                                    | Type     | Required |
| :---------- | :--------------------------------------------------------      | :------- | :------- |
| use         | Purpose of the certificate. The only supported value is `sig`. | String   | True     |

##### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "use": "sig"
}' "https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/credentials/lifecycle/keyRotate"
```

##### Response Example

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
                "href": "https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/credentials/keys/Y3vBOdYT-l-I0j-gRQ26XjutSX00TeWiSguuDhW3ngo",
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
                "href": "https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/credentials/keys/T5dZ1dYT-l-I0j-gRQ82XjutSX00TeWiSguuDhW3zdf",
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
                "href": "https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/credentials/keys/RQ8DuhdxCczyMvy7GNJb4Ka3lQ99vrSo3oFBUiZjzzc",
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

#### Response Example (Error)

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

* [Rule Object](#rule-object)
* [Condition Object](#condition-object)

### Rule Object

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
      "href":"https://{yourOktaDomain}/api/v1/authorizationServers/default/policies/00pbsjfykycpTsBvv0h7/rules/0prbsjfyl01zfSZ9K0h7",
      "hints":{
        "allow":[
          "GET",
          "PUT",
          "DELETE"
        ]
      }
    },
    "deactivate":{
      "href":"https://{yourOktaDomain}/api/v1/authorizationServers/default/policies/00pbsjfykycpTsBvv0h7/rules/0prbsjfyl01zfSZ9K0h7/lifecycle/deactivate",
      "hints":{
        "allow":[
          "POST"
        ]
      }
    }
  }
}
```
#### Rule Properties

| Property     | Description                                                                                  | Type                                    | Required for create   | Required for update |
| :----------- | :------------------------------------------------------------------------------------------- | :-------------------------------------- | :-------------------- | :------------------ |
| conditions   | Specifies the people, groups, grant types and scopes the rule will be applied to             | [Condition Object](#condition-object)   | False                 | False               |
| id           | ID of the rule                                                                               | String                                  | False                 | True                |
| name         | Name of the rule                                                                             | String                                  | True                  | True                |
| status       | Specifies whether requests have access to this claim. Valid values: `ACTIVE` or `INACTIVE`   | Enum                                    | True                  | True                |
| system       | Specifies whether the rule was created by Okta or not                                        | Boolean                                 | True                  | True                |
| actions      | An object that contains the `tokens` array, which shows lifetime durations for the tokens    | Object                                  | System generated      | System generated    |

Token limits:

* accessTokenLifetimeMinutes: minimum 5 minutes, maximum 1 day
* refreshTokenLifetimeMinutes: minimum access token lifetime
* refreshTokenWindowMinutes: minimum 10 minutes, maximum of five years

### Condition Object

Example from a Rule Object
```json
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
    "scopes": {
      "include": [{
        "name": "*",
        "access": "ALLOW"
      }]
  }
```

Example from a Policy Object
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

#### Condition Properties

| Property     | Description                                                                                                                                                                            | Type                            | Required for create or update |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------ | :---------------------------- |
| clients      | For policies, specifies which clients are included or excluded in the policy.                                                                                                          | `include` and `exclude` lists   | True                          |
| grant_type   | Can be one of the following: `authorization_code`, `password`, `refresh_token`, or `client_credentials`. Determines the mechanism Okta uses to authorize the creation of the tokens.   | Enum                            | True                          |
| people       | For rules, specifies which users and groups are included or excluded in the rule.                                                                                                      | `include` and `exclude` lists   | True                          |
| scopes       | Array of scopes this condition includes or excludes.                                                                                                                                   | `include` and `exclude` lists   | True                          |

## Client Resource Operations

<ApiLifecycle access="ea" />

### List Client Resources for an Authorization Server

<ApiLifecycle access="ea" />

<ApiOperation method="get" url="/api/v1/authorizationServers/${authorizationServerId}/clients" />

Lists all client resources for which the specified Authorization Server has tokens

#### Request Parameters

| Parameter                | Description                      | Parameter Type   | DataType   | Required |
| :----------------------- | :------------------------------- | :--------------- | :--------- | :------- |
| authorizationServerId    | ID of the Authorization Server   | URL              | String     | TRUE     |

#### Request Example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/clients"
```

#### Response Example


```json
[
    {
        "client_id": "0oabskvc6442nkvQO0h7",
        "client_name": "My App",
        "client_uri": null,
        "logo_uri": null,
        "_links": {
            "tokens": {
                "href": "https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/clients/0oabskvc6442nkvQO0h7/tokens"
            }
        }
    }
]
```

## OAuth 2.0 Token Management Operations

* [List Refresh Tokens](#list-refresh-tokens)
* [Get Refresh Token](#get-refresh-token)
* [Revoke All Refresh Tokens](#revoke-all-refresh-tokens)
* [Revoke Refresh Token](#revoke-refresh-token)

These endpoints allow you to manage tokens issued by an Authorization Server for a particular Client. For example, you could revoke every active refresh token for a specific Client. You can also [revoke specific tokens](/docs/guides/revoke-tokens/) or [manage tokens at the User level](/docs/reference/api/users/#user-oauth-2-0-token-management-operations).

Read [Validate Access Tokens](/docs/guides/validate-access-tokens/) and [Validate ID Tokens](/docs/guides/validate-id-tokens/) to understand more about how OAuth 2.0 tokens work.

### List Refresh Tokens


<ApiOperation method="get" url="/api/v1/authorizationServers/${authorizationServerId}/clients/${clientId}/tokens" />

Lists all refresh tokens issued by an Authorization Server for a specific Client.

#### Request Parameters


| Parameter               | Description                                                                                    | Param Type   | DataType   | Required   | Default |
| :---------------------- | :--------------------------------------------------------------------------------------------- | :----------- | :--------- | :--------- | :------ |
| authorizationServerId   | ID of the Authorization Server                                                                 | URL          | String     | TRUE       |         |
| clientId                | ID of the client                                                                               | URL          | String     | TRUE       |         |
| expand                  | Valid value: `scope`. If specified, scope details are included in the `_embedded` attribute.   | Query        | String     | FALSE      |         |
| limit                   | The maximum number of tokens to return (maximum 200)                                           | Query        | Number     | FALSE      | 20      |
| after                   | Specifies the pagination cursor for the next page of tokens                                    | Query        | String     | FALSE      |         |

#### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/clients/0oabskvc6442nkvQO0h7/tokens"
```

#### Response Example


```json
[
  {
    "id": "oar579Mcp7OUsNTlo0g3",
    "status": "ACTIVE",
    "created": "2018-03-09T03:18:06.000Z",
    "lastUpdated": "2018-03-09T03:18:06.000Z",
    "expiresAt": "2018-03-16T03:18:06.000Z",
    "issuer": "https://{yourOktaDomain}/oauth2/ausnsopoM6vBRB3PD0g3",
    "clientId": "0oabskvc6442nkvQO0h7",
    "userId": "00upcgi9dyWEOeCwM0g3",
    "scopes": [
      "offline_access",
      "car:drive"
    ],
    "_links": {
      "app": {
        "href": "https://{yourOktaDomain}/api/v1/apps/0oabskvc6442nkvQO0h7",
        "title": "Native"
      },
      "self": {
        "href": "https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/clients/0oabskvc6442nkvQO0h7/tokens/oar579Mcp7OUsNTlo0g3"
      },
      "revoke": {
        "href": "https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3/clients/0oabskvc6442nkvQO0h7/tokens/oar579Mcp7OUsNTlo0g3",
        "hints": {
          "allow": [
            "DELETE"
          ]
        }
      },
      "client": {
        "href": "https://{yourOktaDomain}/oauth2/v1/clients/0oabskvc6442nkvQO0h7",
        "title": "Example Client App"
      },
      "user": {
        "href": "https://{yourOktaDomain}/api/v1/users/00upcgi9dyWEOeCwM0g3",
        "title": "Saml Jackson"
      },
      "authorizationServer": {
        "href": "https://{yourOktaDomain}/api/v1/authorizationServers/ausnsopoM6vBRB3PD0g3",
        "title": "Example Authorization Server"
      }
    }
  }
]
```


### Get Refresh Token


<ApiOperation method="get" url="/api/v1/authorizationServers/${authorizationServerId}/clients/${clientId}/tokens/${tokenId}" />

Gets a refresh token issued by an Authorization Server for the specified Client.

#### Request Parameters


| Parameter               | Description                                                                                    | Param Type   | DataType   | Required   | Default |
| :---------------------- | :--------------------------------------------------------------------------------------------- | :----------- | :--------- | :--------- | :------ |
| authorizationServerId   | ID of the Authorization Server                                                                 | URL          | String     | TRUE       |         |
| clientId                | ID of the client                                                                               | URL          | String     | TRUE       |         |
| tokenId                 | ID of the token                                                                                | URL          | String     | TRUE       |         |
| expand                  | Valid value: `scope`. If specified, scope details are included in the `_embedded` attribute.   | Query        | String     | FALSE      |         |

#### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/authorizationServers/default/clients/0oabskvc6442nkvQO0h7/tokens/oar579Mcp7OUsNTlo0g3?expand=scope"
```

#### Response Example


```json
{
  "id": "oar579Mcp7OUsNTlo0g3",
  "status": "ACTIVE",
  "created": "2018-03-09T03:18:06.000Z",
  "lastUpdated": "2018-03-09T03:18:06.000Z",
  "expiresAt": "2018-03-16T03:18:06.000Z",
  "issuer": "https://{yourOktaDomain}/oauth2/default",
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
            "href": "https://{yourOktaDomain}/api/v1/authorizationServers/default/scopes/scppb56cIl4GvGxy70g3",
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
            "href": "https://{yourOktaDomain}/api/v1/authorizationServers/default/scopes/scp142iq2J8IGRUCS0g4",
            "title": "Drive car"
          }
        }
      }
    ]
  },
  "_links": {
    "app": {
      "href": "https://{yourOktaDomain}/api/v1/apps/0oabskvc6442nkvQO0h7",
      "title": "Native"
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/authorizationServers/default/clients/0oabskvc6442nkvQO0h7/tokens/oar579Mcp7OUsNTlo0g3"
    },
    "revoke": {
      "href": "https://{yourOktaDomain}/api/v1/authorizationServers/default/clients/0oabskvc6442nkvQO0h7/tokens/oar579Mcp7OUsNTlo0g3",
      "hints": {
        "allow": [
          "DELETE"
        ]
      }
    },
    "client": {
      "href": "https://{yourOktaDomain}/oauth2/v1/clients/0oabskvc6442nkvQO0h7",
      "title": "Example Client App"
    },
    "user": {
      "href": "https://{yourOktaDomain}/api/v1/users/00upcgi9dyWEOeCwM0g3",
      "title": "Saml Jackson"
    },
    "authorizationServer": {
      "href": "https://{yourOktaDomain}/api/v1/authorizationServers/default",
      "title": "Example Authorization Server"
    }
  }
}
```

### Revoke All Refresh Tokens


<ApiLifecycle access="ea" />

<ApiOperation method="delete" url="/api/v1/authorizationServers/${authorizationServerId}/clients/${clientId}/tokens" />

Revokes all refresh tokens issued by an Authorization Server for the specified Client. Any access tokens issued with these refresh tokens will also be revoked, but access tokens issued without a refresh token will not be affected.

#### Request Parameters


| Parameter               | Description                                | Parameter Type   | DataType   | Required |
| :---------------------- | :----------------------------------------- | :--------------- | :--------- | :------- |
| authorizationServerId   | ID of the Authorization Server             | URL              | String     | TRUE     |
| clientId                | ID of the client                           | URL              | String     | TRUE     |

#### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/authorizationServers/default/clients/0oabskvc6442nkvQO0h7/tokens"
```

#### Response Example


```bash
HTTP/1.1 204 No Content
```

### Revoke Refresh Token


<ApiLifecycle access="ea" />

<ApiOperation method="delete" url="/api/v1/authorizationServers/${authServerId}/clients/${clientId}/tokens/${tokenId}" />

Revokes the specified refresh token. If an access token was issued with this refresh token, it will also be revoked.

#### Request Parameters


| Parameter               | Description                                | Parameter Type   | DataType   | Required |
| :---------------------- | :----------------------------------------- | :--------------- | :--------- | :------- |
| authorizationServerId   | ID of the Authorization Server             | URL              | String     | TRUE     |
| clientId                | ID of the client                           | URL              | String     | TRUE     |
| tokenId                 | ID of the token                            | URL              | String     | TRUE     |

#### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/authorizationServers/default/clients/0oabskvc6442nkvQO0h7/tokens/oar579Mcp7OUsNTlo0g3"
```

#### Response Example


```bash
HTTP/1.1 204 No Content
```
