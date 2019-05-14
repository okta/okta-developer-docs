---
title: Dynamic Client Registration
category: management
excerpt: >-
  Operations to register and manage client applications for use with Okta's
  OAuth 2.0 and OpenID Connect endpoints
---

# Dynamic Client Registration API

The Dynamic Client Registration API provides operations to register and manage client applications for use with Okta's
OAuth 2.0 and OpenID Connect endpoints. This API largely follows the contract defined in [RFC7591: OAuth 2.0 Dynamic Client Registration Protocol](https://tools.ietf.org/html/rfc7591)
and [OpenID Connect Dynamic Client Registration 1.0](https://openid.net/specs/openid-connect-registration-1_0.html).

Note that clients managed via this API are modeled as applications in Okta and appear in the Applications section of the
administrator UI. Changes made via the API appear in the UI and vice versa. Tokens issued by these clients
follow the rules for Access Tokens and ID Tokens.

## Getting Started

Explore the Client Application API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/291ba43cde74844dd4a7)

## Client Application Operations

### Register New Client


<ApiOperation method="post" url="/oauth2/v1/clients" />

Adds a new client application to your organization

##### Request Parameters


| Parameter   | Description                          | ParamType   | DataType                                        | Required |
| :---------- | :----------------------------------- | :---------- | :---------------------------------------------- | :------- |
| settings    | OAuth client registration settings   | Body        | [Client Settings](#client-application-model)    | TRUE     |

##### Response Parameters


The [OAuth Client](#client-application-model) created by the request

> <ApiLifecycle access="ea" /> Note: Apps created on `/api/v1/apps` default to `consent_method=TRUSTED`, while those created on `/api/v1/clients` default to `consent_method=REQUIRED`.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "client_name": "Example OAuth Client",
  "client_uri": "https://www.example-application.com",
  "logo_uri": "https://www.example-application.com/logo.png",
  "application_type": "web",
  "redirect_uris": [
     "https://www.example-application.com/oauth2/redirectUri"
  ],
  "post_logout_redirect_uris": [
    "https://www.example-application.com/oauth2/postLogoutRedirectUri"
  ],
  "response_types": [
     "code",
     "id_token"
  ],
  "grant_types": [
     "authorization_code",
     "refresh_token"
  ],
  "token_endpoint_auth_method": "client_secret_post",
  "initiate_login_uri": "https://www.example-application.com/oauth2/login"
}' "https://{yourOktaDomain}/oauth2/v1/clients"
```

##### Response Example


```http
HTTP/1.1 201 Created
Content-Type: application/json;charset=UTF-8
```
```json
{
  "client_id": "0jrabyQWm4B9zVJPbotY",
  "client_secret": "5W7XULCEs4BJKnWUXwh8lgmeXRhcGcdViFp84pWe",
  "client_id_issued_at": 1453913425,
  "client_secret_expires_at": 0,
  "client_name": "Example OAuth Client",
  "client_uri": "https://www.example-application.com",
  "logo_uri": "https://www.example-application.com/logo.png",
  "application_type": "web",
  "redirect_uris": [
    "https://www.example-application.com/oauth2/redirectUri"
  ],
  "post_logout_redirect_uris": [
    "https://www.example-application.com/oauth2/postLogoutRedirectUri"
  ],
  "response_types": [
    "id_token",
    "code"
  ],
  "grant_types": [
    "authorization_code"
  ],
  "token_endpoint_auth_method": "client_secret_post",
  "initiate_login_uri": "https://www.example-application.com/oauth2/login"
}
```

##### Response Example: Duplicate Client Name


```http
HTTP/1.1 400 Bad Request
Content-Type: application/json
```
```json
{
    "error": "invalid_client_metadata",
    "error_description": "client_name: An object with this field already exists in the current organization"
}
```

### List Client Applications


<ApiOperation method="get" url="/oauth2/v1/clients" />

Lists all the client applications in your organization (with optional pagination)

##### Request Parameters


| Parameter | Description                                                                                | ParamType | DataType | Required | Default | Maximum |
| --------- | ------------------------------------------------------------------------------------------ | --------- | -------- | -------- | ------- | ------- |
| q         | Searches the `client_name` property of clients for matching value                          | Query     | String   | FALSE    |         |         |
| limit     | Specifies the number of client results in a page                                           | Query     | Number   | FALSE    | 20      | 200     |
| after     | Specifies the pagination cursor for the next page of clients                               | Query     | String   | FALSE    |         |         |

>Note:
*  The `after` cursor should treated as an opaque value and obtained through [the next link relation](/docs/api/getting_started/design_principles#pagination).
* Search currently performs a startsWith match but this is an implementation detail and may change without notice in the future.

##### Response Parameters


Array of [OAuth Clients](#client-application-model)

##### Request Example: List All Clients


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/oauth2/v1/clients"
```

##### Response Example


```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8
```
Header links for pagination:

```http
<https://{yourOktaDomain}/oauth2/v1/clients?limit=20>; rel="self"
<https://{yourOktaDomain}/oauth2/v1/clients?after=xfnIflwIn2TkbpNBs6JQ&limit=20>; rel="next"
```

Response body:

```json
[
    {
        "client_id": "B6YnDUIpt6Oq354YYaNR",
        "client_id_issued_at": 1495059435,
        "client_secret_expires_at": 0,
        "client_name": "Native client",
        "client_uri": null,
        "logo_uri": null,
        "redirect_uris": [
            "https://httpbin.org/get"
        ],
        "response_types": [
            "id_token",
            "code",
            "token"
        ],
        "grant_types": [
            "password",
            "refresh_token",
            "authorization_code",
            "implicit"
        ],
        "token_endpoint_auth_method": "client_secret_basic",
        "application_type": "native"
    },
    {
        "client_id": "etwquEhEjxqyA7HDB8lD",
        "client_id_issued_at": 1495059868,
        "client_secret_expires_at": 0,
        "client_name": "Service client",
        "client_uri": null,
        "logo_uri": null,
        "redirect_uris": [],
        "response_types": [
            "token"
        ],
        "grant_types": [
            "client_credentials"
        ],
        "token_endpoint_auth_method": "client_secret_basic",
        "application_type": "service"
    },
    {
        "client_id": "l3O8MfR0eTVfLJ7jG2UB",
        "client_id_issued_at": 1495059734,
        "client_name": "Browser client",
        "client_uri": null,
        "logo_uri": null,
        "redirect_uris": [
            "https://httpbin.org/get"
        ],
        "response_types": [
            "code",
        ],
        "grant_types": [
            "authorization_code"
        ],
        "token_endpoint_auth_method": "none",
        "application_type": "browser"
    },
    {
        "client_id": "rHQoApjizqc4MGVlW5En",
        "client_id_issued_at": 1495059117,
        "client_secret_expires_at": 0,
        "client_name": "Web client",
        "client_uri": null,
        "logo_uri": null,
        "redirect_uris": [
          "https://www.example-application.com/oauth2/redirectUri"
        ],
        "response_types": [
            "code",
            "id_token",
            "token"
        ],
        "grant_types": [
            "authorization_code",
            "refresh_token",
            "implicit"
        ],
        "token_endpoint_auth_method": "client_secret_basic",
        "application_type": "web"
    }
]
```

### List Client Applications Matching a Search Filter


<ApiOperation method="get" url="/oauth2/v1/clients?q=${term}" />

Lists all clients that match a search filter on `client_name`

##### Request Parameters


| Parameter | Description                                                                                | ParamType | DataType | Required | Default | Maximum |
| -------   | ------------------------------------------------------------------------------------------ | --------- | -------- | -------- | ------- | ------- |
| q         | Searches the `client_name` property of clients for matching value                          | Query     | String   | FALSE    |         |         |
| limit     | Specifies the number of client results in a page                                           | Query     | Number   | FALSE    | 20      | 200     |
| after     | Specifies the pagination cursor for the next page of clients                               | Query     | String   | FALSE    |         |         |

>Note:
*  The `after` cursor should treated as an opaque value and obtained through [the next link relation](/docs/api/getting_started/design_principles#pagination).
* Search currently performs a startsWith match but this is an implementation detail and may change without notice in the future.

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/oauth2/v1/clients?q=web&limit=1"
```

##### Response Example


```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8
```
Header links for pagination:

```http
<https://{yourOktaDomain}/oauth2/v1/clients?limit=20>; rel="self"
<https://{yourOktaDomain}/oauth2/v1/clients?after=xfnIflwIn2TkbpNBs6JQ&limit=1>; rel="next"
```

Response body:

```json
[
    {
        "client_id": "rHQoApjizqc4MGVlW5En",
        "client_id_issued_at": 1495059117,
        "client_secret_expires_at": 0,
        "client_name": "Web client",
        "client_uri": null,
        "logo_uri": null,
        "redirect_uris": [
            "https://httpbin.org/get"
        ],
        "response_types": [
            "code",
            "id_token",
            "token"
        ],
        "grant_types": [
            "authorization_code",
            "refresh_token",
            "implicit"
        ],
        "token_endpoint_auth_method": "client_secret_basic",
        "application_type": "web"
    }
]
```

### Get OAuth Client


<ApiOperation method="get" url="/oauth2/v1/clients/${clientId}" />

Fetches a specific client by `clientId` from your organization

##### Request Parameters


| Parameter   | Description                        | ParamType   | DataType   | Required |
| :---------- | :--------------------------------- | :---------- | :--------- | :------- |
| clientId    | `client_id` of a specific client   | URL         | String     | TRUE     |

##### Response Parameters


The requested [OAuth Client](#client-application-model)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/oauth2/v1/clients/0jrabyQWm4B9zVJPbotY"
```

##### Response Example


```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8
```
```json
{
  "client_id": "0jrabyQWm4B9zVJPbotY",
  "client_id_issued_at": 1453913425,
  "client_name": "Example OAuth Client",
  "client_uri": "https://www.example-application.com",
  "logo_uri": "https://www.example-application.com/logo.png",
  "application_type": "web",
  "redirect_uris": [
    "https://www.example-application.com/oauth2/redirectUri"
  ],
  "post_logout_redirect_uris": [
    "https://www.example-application.com/oauth2/postLogoutRedirectUri"
  ],
  "response_types": [
    "id_token",
    "code"
  ],
  "grant_types": [
    "authorization_code"
  ],
  "token_endpoint_auth_method": "client_secret_post",
  "initiate_login_uri": "https://www.example-application.com/oauth2/login"
}
```

##### Response Example: Incorrect `client_id`


```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json
```

```json
{
    "error": "invalid_client",
    "error_description": "Invalid value for 'client_id' parameter."
}
```

### Update Client Application


<ApiOperation method="put" url="/oauth2/v1/clients/${clientId}" />

Updates the settings for a client application from your organization.

##### Request Parameters


| Parameter | Description                        | ParamType | DataType                                     | Required |
| --------- | ---------------------------------- | --------- | --------------------------------------       | -------- |
| clientId  | `client_id` of a specific client   | URL       | String                                       | TRUE     |
| settings  | OAuth client registration settings | Body      | [Client Settings](#client-application-model) | TRUE     |

> All settings must be specified when updating a client application, **partial updates are not supported.** If any settings are missing when updating a client application the update fails. The exceptions are: `client_secret_expires_at`, or `client_id_issued_at` must not be included in the request, and the `client_secret` can be omitted.

##### Response Parameters


Updated [OAuth Client](#client-application-model).

##### Request Example


```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "client_id": "0jrabyQWm4B9zVJPbotY",
  "client_name": "Updated OAuth Client",
  "client_uri": "https://www.example-application.com",
  "logo_uri": "https://www.example-application.com/logo.png",
  "application_type": "web",
  "redirect_uris": [
    "https://www.example-application.com/oauth2/redirectUri"
  ],
  "post_logout_redirect_uris": [
    "https://www.example-application.com/oauth2/postLogoutRedirectUri"
  ],
  "response_types": [
    "id_token",
    "code"
  ],
  "grant_types": [
    "authorization_code"
  ],
  "token_endpoint_auth_method": "client_secret_post",
  "initiate_login_uri": "https://www.example-application.com/oauth2/login"
}' "https://{yourOktaDomain}/oauth2/v1/clients/0jrabyQWm4B9zVJPbotY"
```

##### Response Example


```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8
```

```json
{
  "client_id": "0jrabyQWm4B9zVJPbotY",
  "client_secret": "5W7XULCEs4BJKnWUXwh8lgmeXRhcGcdViFp84pWe",
  "client_id_issued_at": 1453913425,
  "client_secret_expires_at": 0,
  "client_name": "Updated OAuth Client",
  "client_uri": "https://www.example-application.com",
  "logo_uri": "https://www.example-application.com/logo.png",
  "application_type": "web",
  "redirect_uris": [
    "https://www.example-application.com/oauth2/redirectUri"
  ],
  "post_logout_redirect_uris": [
    "https://www.example-application.com/oauth2/postLogoutRedirectUri"
  ],
  "response_types": [
    "id_token",
    "code"
  ],
  "grant_types": [
    "authorization_code"
  ],
  "token_endpoint_auth_method": "client_secret_post",
  "initiate_login_uri": "https://www.example-application.com/oauth2/login"
}
```
##### Response Example: Missing Required Setting `client_name`


```http
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8
```

```json
{
    "error": "invalid_client_metadata",
    "error_description": "client_name: The field cannot be left blank"
}
```

### Generate New Client Secret


<ApiOperation method="put" url="/oauth2/v1/clients/${clientId}/lifecycle/newSecret" />

Generates a new client secret for the specified client application.

##### Request Parameters


| Parameter | Description                        | ParamType | DataType                               | Required |
| --------- | ---------------------------------- | --------- | -------------------------------------- | -------- |
| clientId  | `client_id` of a specific client   | URL       | String                                 | TRUE     |

> This operation only applies to client applications which use the `client_secret_post` or `client_secret_basic` method for token endpoint authorization.

##### Response Parameters


Updated [OAuth Client](#client-application-model) with client_secret shown.

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/oauth2/v1/clients/0jrabyQWm4B9zVJPbotY/lifecycle/newSecret"
```

##### Response Example


```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8
```
```json
{
  "client_id": "0jrabyQWm4B9zVJPbotY",
  "client_secret": "5W7XULCEs4BJKnWUXwh8lgmeXRhcGcdViFp84pWe",
  "client_id_issued_at": 1453913425,
  "client_secret_expires_at": 0,
  "client_name": "Updated OAuth Client",
  "client_uri": "https://www.example-application.com",
  "logo_uri": "https://www.example-application.com/logo.png",
  "application_type": "web",
  "redirect_uris": [
    "https://www.example-application.com/oauth2/redirectUri"
  ],
  "post_logout_redirect_uris": [
    "https://www.example-application.com/oauth2/postLogoutRedirectUri"
  ],
  "response_types": [
    "id_token",
    "code"
  ],
  "grant_types": [
    "authorization_code"
  ],
  "token_endpoint_auth_method": "client_secret_post",
  "initiate_login_uri": "https://www.example-application.com/oauth2/login"
}
```

##### Response Example: Incorrect `client_id`


```http
HTTP/1.1 404 Not Found
Content-Type: application/json;charset=UTF-8
```

```json
{
    "errorCode": "E0000007",
    "errorSummary": "Not found: Resource not found: 0jrubyXXm4B9zVJPboyT (PublicClientApp)",
    "errorLink": "E0000007",
    "errorId": "oae7LrklqzDQCmZSkcOgdImDg",
    "errorCauses": []
}
```

### Remove Client Application


<ApiOperation method="delete" url="/oauth2/v1/clients/${clientId}" />

Removes a client application from your organization.

##### Request Parameters


| Parameter   | Description                        | ParamType   | DataType   | Required |
| :---------- | :--------------------------------- | :---------- | :--------- | :------- |
| clientId    | `client_id` of a specific client   | URL         | String     | TRUE     |

##### Response Parameters


N/A

##### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/oauth2/v1/clients/0jrabyQWm4B9zVJPbotY"
```


##### Response Example


```http
HTTP/1.1 204 No Content
```

##### Response Example: Incorrect `client_id`


```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json;charset=UTF-8
```

```json
{
    "error": "invalid_client",
    "error_description": "Invalid value for 'client_id' parameter."
}
```

## Client Application Model

### Example

```json
{
  "client_id": "0jrabyQWm4B9zVJPbotY",
  "client_secret": "5W7XULCEs4BJKnWUXwh8lgmeXRhcGcdViFp84pWe",
  "client_id_issued_at": 1453913425,
  "client_secret_expires_at": 0,
  "client_name": "Example OAuth Client",
  "client_uri": "https://www.example-application.com",
  "logo_uri": "https://www.example-application.com/logo.png",
  "application_type": "web",
  "redirect_uris": [
    "https://www.example-application.com/oauth2/redirectUri"
  ],
  "post_logout_redirect_uris": [
    "https://www.example-application.com/oauth2/postLogoutRedirectUri"
  ],
  "response_types": [
    "id_token",
    "code"
  ],
  "grant_types": [
    "authorization_code"
  ],
  "token_endpoint_auth_method": "client_secret_post",
  "initiate_login_uri": "https://www.example-application.com/oauth2/login",
  "tos_uri":"https://example-application.com/client/tos",
  "policy_uri":"https://example-application.com/client/policy"
}
```

### Client Application Properties

Client applications have the following properties:

| Property                                | Description                                                                                                                  | DataType                                                                                       | Nullable   | Unique   | Readonly  |
| :------------------------------------   | :--------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- | :--------- | :------- | :-------- |
| client_id                               | Unique key for the client application                                                                                        | String                                                                                         | FALSE      | TRUE     | TRUE      |
| client_id_issued_at                     | Time at which the client_id was issued (measured in unix seconds)                                                            | Number                                                                                         | TRUE       | FALSE    | TRUE      |
| client_name                             | Human-readable string name of the client application                                                                         | String                                                                                         | FALSE      | TRUE     | FALSE     |
| client_secret                           | OAuth 2.0 client secret string (used for confidential clients)                                                               | String                                                                                         | TRUE       | TRUE     | TRUE      |
| client_secret_expires_at                | Time at which the client_secret will expire or 0 if it will not expire(measured in unix seconds)                             | Number                                                                                         | TRUE       | FALSE    | TRUE      |
| logo_uri                                | (Not currently implemented in Okta) URL string that references a logo for the client consent dialogs (not sign-in dialogs)   | String                                                                                         | TRUE       | FALSE    | FALSE     |
| application_type                        | The type of client application. Default value: `web`                                                                         | `web`, `native`, `browser`, or `service`                                                       | TRUE       | FALSE    | TRUE      |
| redirect_uris                           | Array of redirection URI strings for use in redirect-based flows                                                             | Array                                                                                          | TRUE       | FALSE    | FALSE     |
| post_logout_redirect_uris               | Array of redirection URI strings for use for relying party initiated logouts                                                 | Array                                                                                          | TRUE       | FALSE    | FALSE     |
| response_types                          | Array of OAuth 2.0 response type strings. Default value: `code`                                                              | Array of `code`, `token`, `id_token`                                                           | TRUE       | FALSE    | FALSE     |
| grant_types                             | Array of OAuth 2.0 grant type strings. Default value: `authorization_code`                                                   | Array of `authorization_code`, `implicit`, `password`, `refresh_token`, `client_credentials`   | TRUE       | FALSE    | FALSE     |
| token_endpoint_auth_method              | requested authentication method for the token endpoint. Default value: `client_secret_basic`                                 | `none`, `client_secret_post`, `client_secret_basic`, or `client_secret_jwt`                    | TRUE       | FALSE    | FALSE     |
| initiate_login_uri                      | URL that a third party can use to initiate a login by the client                                                             | String                                                                                         | TRUE       | FALSE    | FALSE     |
| jwks                                    | A [JSON Web Key Set](https://tools.ietf.org/html/rfc7517#section-5) for validating JWTs presented to Okta.                   | [JSON Web Key Set](#json-web-key-set)                                                          | TRUE       | FALSE    | FALSE     |
| tos_uri <ApiLifecycle access="ea" />    | URL string of a web page providing the client's terms of service document                                                    | URL                                                                                            | TRUE       | FALSE    | FALSE     |
| policy_uri <ApiLifecycle access="ea" /> | URL string of a web page providing the client's policy document                                                              | URL                                                                                            | TRUE       | FALSE    | FALSE     |


Property Details

* The `client_id` is immutable. And when creating a client application, you cannot specify the `client_id`, Okta uses application ID for it.

* The `client_secret` is only shown on the response of the creation or update of a client application (and only if the `token_endpoint_auth_method` is one that requires a client secret). You cannot specify the `client_secret` and if the `token_endpoint_auth_method` requires one Okta will generate a random `client_secret` for the client application.

* If you want to specify the `client_id` or `client_secret`, you can use [Apps API](/docs/api/resources/apps/#add-oauth-2-0-client-application) to create or update a client application.

* At least one redirect URI and response type is required for all client types, with exceptions: if the client uses the
  [Resource Owner Password](https://tools.ietf.org/html/rfc6749#section-4.3) flow (if `grant_types` contains the value `password`)
  or [Client Credentials](https://tools.ietf.org/html/rfc6749#section-4.4) flow (if `grant_types` contains the value `client_credentials`)
  then no redirect URI or response type is necessary. In these cases you can pass either null or an empty array for these attributes.

* All redirect URIs must be absolute URIs and must not include a fragment component.

* Different application types have different valid values for the corresponding grant type:

| Application Type  | Valid Grant Type                                                           | Requirements                                   |
| :---------------- | :------------------------------------------------------------------------- | :--------------------------------------------- |
| `web`             | `authorization_code`, `implicit`, `refresh_token`, `client_credentials`(*) | Must have at least `authorization_code`        |
| `native`          | `authorization_code`, `implicit`, `password`, `refresh_token`              | Must have at least `authorization_code`        |
| `browser`         | `authorization_code`, `implicit`                                           |                                                |
| `service`         | `client_credentials`                                                       | Works with OAuth 2.0 flow (not OpenID Connect) |

    (*) `client_credentials` with a `web` application type allows you to use one `client_id` for an application that needs to make user-specific calls and back-end calls for data.

* The `grant_types` and `response_types` values described above are partially orthogonal, as they refer to arguments passed to different
    endpoints in the [OAuth 2.0 protocol](https://tools.ietf.org/html/rfc6749). However, they are related in that the `grant_types`
    available to a client influence the `response_types` that the client is allowed to use, and vice versa. For instance, a `grant_types`
    value that includes `authorization_code` implies a `response_types` value that includes `code`, as both values are defined as part of
    the OAuth 2.0 authorization code grant.

## JSON Web Key Set

The JSON Web Key Set (`jwks`) is a set of public keys registered for the client to use for client authentication.

The `jwks` object has precisely one attribute: `keys`, which is an array of JSON Web Key.

| Property   | DataType                       | Nullable  | Unique  | Readonly   |
| ---------- | :----------------------------- | :-------- | :------ | :--------- |
| keys       | An array of JSON Web Keys      | TRUE      | FALSE   | FALSE      |

## JSON Web Key

A [JSON Web Key (JWK)](https://tools.ietf.org/html/rfc7517) is a JSON representation of a cryptographic key. Okta can use these keys to verify the signature of a JWT when provided for the `private_key_jwt` client authentication method, or for a signed authorize request object.
Okta supports both RSA and Elliptic Curve (EC) keys.

| Property   | Description                                           | DataType       | Nullable                               | Unique                 | Readonly   |
| ---------- | :---------------------------------------------------- | :------------- | :------------------------------------- | :--------------------- | :--------- |
| kty        | The type of public key this is                        | `RSA` or `EC`  | FALSE                                  | FALSE                  | FALSE      |
| kid        | The unique identifier of the key                      | String         | TRUE, if only one key in the JWKS      | TRUE, within the JWKS  | FALSE      |
| e          | The key exponent of a RSA key                         | String         | TRUE, unless the kty is `RSA`          | FALSE                  | FALSE      |
| n          | The modulus of a RSA key                              | String         | TRUE, unless the kty is `RSA`          | FALSE                  | FALSE      |
| x          | The public x coordinate for the elliptic curve point  | String         | TRUE, unless the kty is `EC`           | FALSE                  | FALSE      |
| y          | The public y coordinate for the elliptic curve point  | String         | TRUE, unless the kty is `EC`           | FALSE                  | FALSE      |
