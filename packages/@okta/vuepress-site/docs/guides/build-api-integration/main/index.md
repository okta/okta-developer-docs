---
title: Build an API service integration
excerpt: Learn how to build and register an API service integration to the Okta Integration Network.
layout: Guides
---

<ApiLifecycle access="ea" />

This guide explains how to build and submit an API service integration to the Okta Integration Network (OIN) for review and publishing.

---

**Learning outcomes**

* Learn how to build an API service integration that can be published in the OIN.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* The API Service Integration feature enabled in your org. Contact your Okta account team to enable the feature.
* A service app that needs to access Okta APIs for your customer

> **Note:** Currently, Okta only supports OAuth APIs listed in [Scopes and supported endpoints](/docs/implement-oauth-for-okta/main/#scopes-and-supported-endpoints). We're working towards supporting scopes for all Okta API endpoints.
---

## Overview

A service-to-service app where where a backend service or a daemon calls [Okta management APIs](/docs/reference/core-okta-api/) for a tenant (Okta org) can be published in the Okta Integration Network (OIN) as an API service integration.
API service integrations access Okta APIs using the OAuth 2.0 Client Credentials grant flow, where access is not associated with a user and resources can be restricted with scoped access tokens. Each access token enables the bearer to perform specific actions on specific Okta endpoints, with that ability controlled by which scopes the access token contains.

If you have an API service integration for your app in the OIN, your customers can configure the OAuth 2.0 Client Credentials flow for an instance of your app with their Okta tenant org. Each customer Okta org has its own authorization server. When a customer authorizes your API service integration to access their org, Okta generates a unique set of credentials (client ID and client secret) for that org.
You must collect and store these credentials for each customer to allow your integration to work with your customer's Okta org.

### API service integration Client Credentials grant flow

At a high-level, the OAuth 2.0 Client Credentials flow for an API service integration has the following steps:

1. Your customer's instance of your service app makes an authorization request to their Okta Authorization Server using their client credentials.

   Your customer needs to register their instance of your app in their Okta org so that Okta can accept the authorization request. See [HOC&mdash;Set up an API service integration](https://www.figma.com/proto/1hqMxP4MrqXR07atucaGvM/OAuth-API-Integrations---Partner-Mocks?node-id=1550%3A9898&starting-point-node-id=1550%3A9668). After registration, the customer obtains their client credentials to [configure in your integration](#collect-and-save-customer-credentials). The customer's instance of your app can make an authorization request to Okta. See [Request for access token](#request-an-access-token).

2. If the credentials are accurate, Okta responds with an access token.

   The resource and action scopes allowed for the access token is configured by you when you [submit your API service integration to the OIN](#submit-your-api-service-integration) for verification through the OIN Manager. In addition, the access token request must contain allowed scopes for your API service integration. See [Selecting scopes](#selecting-scopes).

3. Your customer's service app instance uses the access token to make authorized requests to their Okta org APIs (the resource server). See [Make Okta API requests](#make-okta-api-requests).

4. The customer's Okta org (resource server) validates the token before responding to the API request.

<div class="full">

![Flowchart that displays the back and forth between the resource owner, authorization server, and resource server for API service integration's Client Credentials flow](/img/oin/api-service-creds-flow.svg)

</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/
skinparam monochrome true
participant "Service app (customer instance)" as client
participant "Authorization Server (customer Okta org)" as okta
participant "Resource Server (customer Okta APIs)" as app
client -> okta: Access token request to /token
okta -> client: Access token response
client -> app: Request with access token
app -> client: Response
-->

## Build your API service integration

### Collect and save customer credentials

Okta generates a unique set of credentials (client ID and client secret) for your customer when they register your integration in their Okta org. See [HOC&mdash;Set up an API service integration](https://www.figma.com/proto/1hqMxP4MrqXR07atucaGvM/OAuth-API-Integrations---Partner-Mocks?node-id=1550%3A9898&starting-point-node-id=1550%3A9668). You must collect and store these credentials for each customer to allow your integration to work with the customer's Okta org.

To implement the Client Credentials grant flow in your integration, provide an interface to collect and store these API service integration credentials:

* Okta tenant (organization) domain (for example, `acme.okta.com`)
* client ID
* client secret

> **Note:** This guide refers to these domain and credentials as `${customerOktaDomain}`, `${client_id}`, and `${client_secret}` variables.

### Selecting scopes

You must specify the resources and actions that your API service app requires to do its job. Use the least-privilege principle and only specify the minimal scopes and actions required. See the list of available Okta [Scopes and supported endpoints](/docs/implement-oauth-for-okta/main/#scopes-and-supported-endpoints).

There are two types of scope: read and manage. Read scopes can only view resources, while manage scopes can read, create, update, and delete resources. You don't need to request a read scope when you request a manage scope because manage scopes already includes read access.

| Action    | Read scopes           | Manage scopes   |
| ----------- | -------------- | ------------- |
| Read | Yes | Yes |
| Create | No | Yes |
| Update | No | Yes |
| Delete | No | Yes |

#### Silent downscoping

The Okta Org Authorization Server returns all scopes that you request, provided that you registered those scopes along with your integration. Currently, API service integrations don't support optional scopes. You can request only a subset of your-integration-supported scopes when requesting an access token from the `/token` endpoint.

It doesn't matter whether you have permissions for all the scopes that you request. If the scopes requested exist in the app's grants collection, those scopes are sent back in the access token. However, when you make a request to perform an action that you don't have permission to perform, the token doesn't work, and you receive an error.

For example, suppose a customer's grant collection includes the `okta.authorizationServers.manage` scope. A Read Only admin can request and get an access token that contains the scope, but when they attempt to perform a modification, such as modifying an authorization server using `/api/v1/authorizationServers`, the operation fails because the admin lacks the necessary permissions.

### Request an access token

Your service app integration needs to request an access token to securely access the Okta APIs. Use the following configuration variables to form the access token request:

* `${customerOktaDomain}`: Your customer's Okta tenant (org) domain
* `${client_id}`: Your customer's client ID
* `${client_secret}`: Your customer's client secret

1. Base64 encode the string and set it in the Authorization header:

     ```json
     Authorization: Basic ${Base64(<client_id>:<client_secret>)}
     ```

1. Make a request to the /token endpoint with these query parameters:
     * grant_type set to client_credentials
     * scope must be at least one of the Okta API scopes

1. If the request is successful, the token is be returned in the body of the response (see example below)

Example /token request:

[ Include code snippets in several languages we support, ultimately SDK examples. ]

```bash
curl --request POST \
  --url https://${customerOktaDomain}/oauth2/v1/token \
  --header 'Accept: application/json' \
  --header 'Authorization: Basic MG9hY...' \
  --header 'Cache-control: no-cache' \
  --header 'Content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=client_credentials&scope=okta.users.read okta.groups.read
```

Successful response example:
```json
{
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQiOiJ.....UfThlJ7w",
    "scope": "okta.users.read okta.groups.read"
}
```

Error response example:
```json
{
    "error": "invalid_client",
    "error_description": "The client secret supplied for a confidential client is invalid."
}
```

See a [list of token endpoint errors](https://developer.okta.com/docs/reference/api/oidc/#possible-errors-4).

### Make Okta API requests

When you have an access token, you can use it to make requests to the [Core Okta API]. Set the access token as a bearer token in an authorization header.
Example request:
```bash
curl -X GET "https://${customerOktaDomain}/api/v1/users"
    -H "Accept: application/json"
    -H "Content-Type: application/json"
    -H "Authorization: Bearer ${accessToken}
```

## Submit your API service integration

1. Go to the [OIN Manager](https://oinmanager.okta.com/) and log in with the credentials of the Okta org you will use to build and submit your integration.
1. Click **Add New Submission** or **Edit** an existing submission.
1. On the **OAuth** tab, toggle on **OAUTH Support**.
1. Under **Enable scopes**, click **Add Another**.
1. Enter the name of a scope you would like to request from Okta admins. A scope corresponds to a resource you would like to access in the Okta API (users, logs, etc) and a level of access (read or manage). [A full list of scopes is here](/docs/guides/implement-oauth-for-okta/main/). The sections below have more information about scopes.
1. Repeat steps 4 and 5 above for each scope you would like to access.

### Test your integration

Before submitting your integration to be reviewed and published, you must test it on your Okta org. Your integration will only be available on your Okta org. Okta admins will see the same authorize experience.

### Authorize a test instance

1. In [OIN Manager](https://oinmanager.okta.com/), edit your submission and click the **OAuth** tab.
1. On the right side of your screen, click **Test in Okta**.
1. Once redirected, click **Install and Authorize**.
1. Copy the client secret which appears in the dialog and paste it into your application or securely store it for later use.
1. Dismiss the dialog. On the integration details page, copy the Okta domain and client id for use in your application.

### Updating a test instance

When you make an update to your submission in the OIN Manager (for example, modifying the scopes or name of the integration), the update will not automatically be reflected in your test instance for security reasons.
To update a test instance, repeat the procedure above for Authorizing a test instance. You can clear previous instances by clicking **Revoke** on the integration details page.

### Submit for review

[ Include code snippets in several languages we support, ultimately SDK examples. ]

## Support
If you need help or have an issue, post a question in the [Okta Developer Forum](https://devforum.okta.com/c/questions/oin-submissions/19).