---
title: Push Providers
category: management
---

# Push Providers API

<ApiLifecycle access="ea" /></br>
<ApiLifecycle access="ie" />

> **Note:** This feature is only available as a part of Okta Identity Engine. Contact your Okta account team or ask us on our [forum](https://devforum.okta.com/) for further information.

The Okta Push Providers API provides a centralized integration platform to fetch and manage push provider configurations. Okta administrators can use these APIs to provide their push provider credentials, for example from APNs and FCM, so that Okta can send push notifications to their own custom app authenticator applications.

The Push Providers API supports the following Authorization Schemes:
* SSWS - [API tokens](/docs/reference/core-okta-api/#authentication)
* Bearer - [OAuth2.0 and OpenID Connect](/docs/concepts/oauth-openid/)

<!-- > **Note:** You can use the Push Providers API as part of the "Create a custom authenticator" flow. See the [Custom authenticator integration guide](/docs/guides/authenticators-custom-authenticator/android/main/).-->

## Get started

Explore the Push Providers API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://god.postman.co/run-collection/7d5fdec8d458540bc745?action=collection%2Fimport)

## Push Providers operations

The Push Providers API has the following CRUD operations:

* [Create Push Provider](#create-push-provider)
* [List Push Providers](#list-push-providers)
* [Get Push Provider by ID](#get-push-provider-by-id)
* [Update Push Provider](#update-push-provider)
* [Delete Push Provider](#delete-push-provider)

### Create Push Provider

<ApiOperation method="post" url="/api/v1/push-providers" />

Creates a Push Provider. Each Push Provider must have a unique `name`.

#### Permitted OAuth 2.0 scopes
`okta.pushProviders.manage`

#### Request path parameters

None

#### Request query parameters

None

#### Request body

A [Push Provider object](#push-provider-object)

#### Response body

Returns the created [Push Provider response object](#push-provider-response-object)

#### Use example

This request creates a Push Provider object:

##### API Token Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "providerType": "APNS",
  "name": "Example Push Provider 1",
  "configuration": {
    "keyId": "KEY_ID",
    "teamId": "TEAM_ID",
    "tokenSigningKey": "-----BEGIN PRIVATE KEY-----\nPRIVATE_KEY\n-----END PRIVATE KEY-----\n",
    "fileName": "fileName.p8"
  }
}' "https://${yourOktaDomain}/api/v1/push-providers"
```

##### Bearer token request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${oauth_token}" \
-d '{
  "providerType": "APNS",
  "name": "Example Push Provider 1",
  "configuration": {
    "keyId": "KEY_ID",
    "teamId": "TEAM_ID",
    "tokenSigningKey": "-----BEGIN PRIVATE KEY-----\nPRIVATE_KEY\n-----END PRIVATE KEY-----\n",
    "fileName": "fileName.p8"
  }
}' "https://${yourOktaDomain}/api/v1/push-providers"
```

##### Response

```json
{
  "id": "ppchvbeucdTgqeiGxR0g4",
  "providerType": "APNS",
  "name": "Example Push Provider 1",
  "lastUpdatedDate": "2022-01-00T00:00:00.000Z",
  "configuration": {
    "keyId": "KEY_ID",
    "teamId": "TEAM_ID",
    "fileName": "fileName.p8"
  },
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}}/api/v1/push-providers/{pushProviderId}",
      "hints": {
        "allow": [ "GET", "PUT", "DELETE"]
      }
    }
  }
}
```

### List Push Providers

<ApiOperation method="get" url="/api/v1/push-providers" />

Lists all available Push Providers

#### Permitted OAuth 2.0 scopes
`okta.pushProviders.read`

#### Request path parameters

None

#### Request query parameters

| Parameter | Type   | Description | Required |
| --------- | ------ | -------- | ---- |
| `type`    |  String | Returns a list of Push Providers that match the specific `providerType` in the [Push Provider object](#push-provider-object). Supported values: `APNS` or `FCM` | FALSE |

#### Request body

None

#### Response body

Array of [Push Provider response objects](#push-provider-response-object)

#### Use example

This request returns all available Push Provider objects:

##### API token request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/push-providers"
```

##### Bearer token request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${oauth_token}" \
"https://${yourOktaDomain}/api/v1/push-providers"
```

##### Response
```json
[
  {
    "id": "ppchvbeucdTgqeiGxR0g4",
    "providerType": "APNS",
    "name": "Example Push Provider 1",
    "lastUpdatedDate": "2022-01-00T00:00:00.000Z",
    "configuration": {
      "keyId": "ABC123DEFG",
      "teamId": "DEF123GHIJ",
      "fileName": "fileName.p8"
    },
    "_links": {
      "self": {
        "href": "https://{yourOktaDomain}}/api/v1/push-providers/{pushProviderId}",
        "hints": {
          "allow": [ "GET", "PUT", "DELETE"]
        }
      }
    }
  },
  {
    "id": "ppctekcmngGaqeiBxB0g4",
    "providerType": "FCM",
    "name": "Example Push Provider 2",
    "lastUpdatedDate": "2022-01-00T00:00:00.000Z",
    "configuration": {
      "projectId": "PROJECT_ID",
      "fileName": "fileName.json",
    },
    "_links": {
      "self": {
        "href": "https://{yourOktaDomain}}/api/v1/push-providers/{pushProviderId}",
        "hints": {
          "allow": [ "GET", "PUT", "DELETE"]
        }
      }
    }
  }
]
```

### Get Push Provider by ID

<ApiOperation method="get" url="/api/v1/push-providers/${pushProviderId}" />

Fetches a Push Provider by its `id`. If you don't know the `id`, you can [List Push Providers](#list-push-providers).

#### Permitted OAuth 2.0 scopes
`okta.pushProviders.read`

#### Request path parameters

| Parameter         | Type   | Description   |
| ----------------- | ------ | ------------- |
| `pushProviderId`  | String | The `id` of a [Push Provider response object](#push-provider-response-object) |

#### Request query parameters

None

#### Request body

None

#### Response body

The requested [Push Provider response object](#push-provider-response-object)

#### Use example

This request returns a Push Provider object with an `id` value `ppchvbeucdTgqeiGxR0g4`:

##### API token request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/push-providers/${pushProviderId}"
```

##### Bearer token request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${oauth_token}" \
"https://${yourOktaDomain}/api/v1/push-providers/${pushProviderId}"
```

##### Response
```json
{
  "id": "ppchvbeucdTgqeiGxR0g4",
  "providerType": "APNS",
  "name": "Example Push Provider 1",
  "lastUpdatedDate": "2022-01-00T00:00:00.000Z",
  "configuration": {
    "keyId": "KEY_ID",
    "teamId": "TEAM_ID",
    "fileName": "fileName.p8"
  },
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}}/api/v1/push-providers/{pushProviderId}",
      "hints": {
        "allow": [ "GET", "PUT", "DELETE"]
      }
    }
  }
}
```

##### Error response

Passing an invalid `id` returns a `404 Not Found` status code with error code `E0000007`.

```http
HTTP/1.1 404 Not Found
Content-Type: application/json
```
```json
{
  "errorCode": "E0000007",
  "errorSummary": "Not found: Resource not found: 123456 (PushProviderConfigEntity)",
  "errorLink": "E0000007",
  "errorId": "oaeksGocbBmG9OGYo4vXF7llA",
  "errorCauses": []
}
```

### Update Push Provider

<ApiOperation method="put" url="/api/v1/push-providers/${pushProviderId}" />

Updates a Push Provider

#### Permitted OAuth 2.0 scopes
`okta.pushProviders.manage`

#### Request path parameters

| Parameter        | Type        | Description   |
| ---------------- | ----------- | ------------- |
| `pushProviderId` | String      | The `id` of a [Push Provider response object](#push-provider-response-object) |

#### Request body

A [Push Provider object](#push-provider-object)

#### Response body

Returns the updated [Push Provider response object](#push-provider-response-object)

#### Use example

This request updates a Push Provider object:

##### API token request

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "providerType": "APNS",
  "name": "Updated Example Push Provider 1",
  "configuration": {
    "keyId": "KEY_ID",
    "teamId": "TEAM_ID",
    "tokenSigningKey": "-----BEGIN PRIVATE KEY-----\nPRIVATE_KEY\n-----END PRIVATE KEY-----\n",
    "fileName": "fileName.p8"
  }
}' "https://${yourOktaDomain}/api/v1/push-providers/${pushProviderId}"
```

##### Bearer token request

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${oauth_token}" \
-d '{
  "providerType": "APNS",
  "name": "Updated Example Push Provider 1",
  "configuration": {
    "keyId": "KEY_ID",
    "teamId": "TEAM_ID",
    "tokenSigningKey": "-----BEGIN PRIVATE KEY-----\nPRIVATE_KEY\n-----END PRIVATE KEY-----\n",
    "fileName": "fileName.p8"
  }
}' "https://${yourOktaDomain}/api/v1/push-providers/${pushProviderId}"
```

##### Response

```json
{
  "id": "ppchvbeucdTgqeiGxR0g4",
  "providerType": "APNS",
  "name": "Updated Example Push Provider 1",
  "lastUpdatedDate": "2022-02-00T00:00:00.000Z",
  "configuration": {
    "keyId": "KEY_ID",
    "teamId": "TEAM_ID",
    "fileName": "fileName.p8"
  },
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}}/api/v1/push-providers/{pushProviderId}",
      "hints": {
        "allow": [ "GET", "PUT", "DELETE"]
      }
    }
  }
}
```

### Delete Push Provider

<ApiOperation method="delete" url="/api/v1/push-providers/${pushProviderId}" />

Deletes a Push Provider

#### Permitted OAuth 2.0 scopes
`okta.pushProviders.manage`

#### Request path parameters

| Parameter        | Type        | Description   |
| ---------------- | ----------- | ------------- |
| `pushProviderId` | String      | The `id` of [Push Provider response object](#push-provider-response-object) |

#### Request body

None

#### Response body

None

#### Use example

This request permanently deletes a Push Provider object:

##### API token request

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/push-providers/${pushProviderId}"
```

##### Bearer token request

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${oauth_token}" \
"https://${yourOktaDomain}/api/v1/push-providers/${pushProviderId}"
```

##### Response

```http
HTTP/1.1 204 No Content
Content-Type: application/json
```

##### Error responses

Passing an invalid `id` returns a `404 Not Found` status code with error code `E0000007`.

```http
HTTP/1.1 404 Not Found
Content-Type: application/json
```
```json
{
  "errorCode": "E0000007",
  "errorSummary": "Not found: Resource not found: 123456 (PushProviderConfigEntity)",
  "errorLink": "E0000007",
  "errorId": "oaeksGocbBmG9OGYo4vXF7llA",
  "errorCauses": []
}
```
Passing an `id` that is configured in a custom app authenticator returns a `409 Conflict` status code with the error code `E0000187`. The error occurs as long as the custom app authenticator is `ACTIVE` or `DEACTIVATED`.

```http
HTTP/1.1 409 Conflict
Content-Type: application/json
```
```json
{
  "errorCode": "E0000187",
  "errorSummary": "Cannot delete push provider because it is being used by a custom app authenticator.",
  "errorLink": "E0000187",
  "errorId": "oaenwA1ra80S9W-pvbh4m6haA",
  "errorCauses": [
    {
      "errorSummary": "Cannot delete push provider notification service configuration with id={{pushProviderId}} because it is associated with the following custom app authenticator ids=[{{authenticatorId}}]. Please unassociate it from the authenticators and try again."
    }
  ]
}
```

## Push Providers API objects

### Push Provider object

#### Push Provider properties

The Push Provider object has the following properties:

| Property          | Type                                   | Description                                        |
| ----------------- | -------------------------------------- | -------------------------------------------------- |
| `configuration`   | [Configuration](#configuration-object) | Object that contains `providerType` specific configurations |
| `name`            | String                                 | Display name of the Push Provider                  |
| `providerType`    | String                                 | Provider type for the Push Provider. Supported values: `APNS` or `FCM` |

#### Configuration object

| Property             | Type            | Description                                        | `providerType` |
| -------------------- | --------------- | -------------------------------------------------- | ---------------------------------------- |
| `fileName`           | String          | (Optional) File name for Admin Console display     | All
| `keyId`              | String          | 10-character Key ID obtained from the Apple developer account                   | `APNS`                                   |
| `serviceAccountJson` | JSON            | JSON that contains the private service account key and service account details. See [Creating and managing service account keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys).           | `FCM`                                    |
| `teamId`             | String          | 10-character Team ID used to develop the iOS app   | `APNS`                                   |
| `tokenSingingKey`    | String          | APNs private authentication token signing key      | `APNS`                                   |

#### Push Provider object example (APNs provider type)

```json
{
  "providerType": "APNS",
  "name": "Example APNS Push Provider",
  "configuration": {
    "keyId": "KEY_ID",
    "teamId": "TEAM_ID",
    "tokenSigningKey": "-----BEGIN PRIVATE KEY-----\nPRIVATE_KEY\n-----END PRIVATE KEY-----\n",
    "fileName": "fileName.p8"
  }
}
```

#### Push Provider object example (FCM provider type)

```json
{
  "providerType": "FCM",
  "name": "Example FCM Push Provider",
  "configuration": {
    "serviceAccountJson": {
        "type": "service_account",
        "project_id": "PROJECT_ID",
        "private_key_id": "KEY_ID",
        "private_key": "-----BEGIN PRIVATE KEY-----\nPRIVATE_KEY\n-----END PRIVATE KEY-----\n",
        "client_email": "SERVICE_ACCOUNT_EMAIL",
        "client_id": "CLIENT_ID",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/SERVICE_ACCOUNT_EMAIL"
    },
    "fileName": "fileName.json"
  }
}
```

### Push Provider response object

#### Push Provider response properties

The Push Provider response object has the following properties:

| Property          | Type                                   | Description                                        |
| ----------------- | -------------------------------------- | -------------------------------------------------- |
| `_links`          | [Link](#link-object)                   | Allowed operations for the Push Provider           |
| `configuration`   | [Configuration response](#configuration-response-object) | Object that contains `providerType` specific configurations |
| `id`              | String                                 | Unique key for the Push Provider                   |
| `lastUpdatedDate` | String (ISO-8601)                      | Timestamp when the Push Provider was last modified |
| `name`            | String                                 | Display name of the Push Provider                  |
| `providerType`    | String                                 | Provider type for the Push Provider. Supported values: `APNS` or `FCM` |

#### Link object

For a Push Provider result, the `_links` is read-only and contains a full set of available operations using the [JSON Hypertext Application Language](https://tools.ietf.org/html/draft-kelly-json-hal-06) specification. The `hints` property provides information on allowed HTTP verbs for the `href` property. See [Web Linking](https://tools.ietf.org/html/rfc8288) for more information on link relations.

#### Configuration response object
| Property             | Type      | Description                                        | `providerType` |
| -------------------- | --------- | -------------------------------------------------- | ---------------------------------------- |
| `fileName`           | String    | (Optional) File name for Admin Console display     | All
| `keyId`              | String    | Key ID of the APNs configuration                   | `APNS`                                   |
| `projectId`          | String    | Project ID of FCM configuration                    | `FCM`                                    |
| `teamId`             | String    | Team ID of the APNs configuration                  | `APNS`                                   |


##### Push Provider response example (APNs provider type)

```json
{
  "id": "ppchvbeucdTgqeiGxR0g4",
  "providerType": "APNS",
  "name": "Example APNS Push Provider",
  "lastUpdatedDate": "2022-02-00T00:00:00.000Z",
  "configuration": {
    "keyId": "KEY_ID",
    "teamId": "TEAM_ID",
    "fileName": "fileName.p8"
  },
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}}/api/v1/push-providers/{pushProviderId}",
      "hints": {
        "allow": [ "GET", "PUT", "DELETE"]
      }
    }
  }
}
```

##### Push Provider response example (FCM provider type)

```json
{
  "id": "ppctekcmngGaqeiBxB0g4",
  "providerType": "FCM",
  "name": "Example FCM Push Provider",
  "lastUpdatedDate": "2022-01-00T00:00:00.000Z",
  "configuration": {
    "projectId": "PROJECT_ID",
    "fileName": "fileName.json",
  },
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}}/api/v1/push-providers/{pushProviderId}",
      "hints": {
        "allow": [ "GET", "PUT", "DELETE"]
      }
    }
  }
}
```
