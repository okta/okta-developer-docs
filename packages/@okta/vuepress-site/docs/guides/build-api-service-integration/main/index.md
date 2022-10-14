---
title: Build an API service integration
excerpt: Learn how to build and register an API service integration to the Okta Integration Network.
layout: Guides
---

<ApiLifecycle access="ea" />

This guide explains how to build and submit an API service integration to the Okta Integration Network for review and publishing.

---

**Learning outcomes**

* Learn how to build an API service integration that can be published in the OIN.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* A service app that needs to access Okta APIs for your customer

> **Note:** Currently, Okta only supports OAuth APIs listed in [Scopes and supported endpoints](/docs/implement-oauth-for-okta/main/#scopes-and-supported-endpoints). We're working towards supporting scopes for all Okta API endpoints.

---

## When to build an API Service Integration

API Service Integrations access the [Core Okta API](/docs/reference/core-okta-api/) using OAuth 2.0 and are sometimes referred to as service-to-service or machine-to-machine integrations. This API access represents the application itself rather than a particular user.

### Multi-tenancy in Okta

Okta tenants are called organizations (orgs). Each Okta org has its own authorization server. When a customer authorizes your API Service Integration to access their org, the server generates a unique set of credentials (client ID and client secret) for that org.

You must collect and store these credentials for each customer to allow your integration to work with any Okta org.

## Register your integration

1. Go to the [OIN Manager](https://oinmanager.okta.com/) and log in with the credentials of the Okta org you will use to build and submit your integration.
1. Click **Add New Submission** or **Edit** an existing submission.
1. On the **OAuth** tab, toggle on **OAUTH Support**.
1. Under **Enable scopes**, click **Add Another**.
1. Enter the name of a scope you would like to request from Okta admins. A scope corresponds to a resource you would like to access in the Okta API (users, logs, etc) and a level of access (read or manage). [A full list of scopes is here](/docs/guides/implement-oauth-for-okta/main/). The sections below have more information about scopes.
1. Repeat steps 4 and 5 above for each scope you would like to access.

### Selecting scopes

There are two types of scope: read and manage. Read scopes can only view resources, while manage scopes can read, create, update, and delete resources. Because manage scopes include read access, if you do not need to request a read scope in addition to a manage scope.

| Action    | Read scopes           | Manage scopes   |
| ----------- | -------------- | ------------- |
| Read | Yes | Yes |
| Create | No | Yes |
| Update | No | Yes |
| Delete | No | Yes |

### Silent downscoping

The Okta Org Authorization Server returns all scopes that you request provided that you registered those scopes along with your integration. Currently, API Service Integrations do not support “optional” scopes. You may request only a subset of scopes when requesting a token from the token endpoint, the Okta customer must authorize all the scopes.

For example, suppose a client's grant collection includes the `okta.authorizationServers.manage` scope. A Read Only admin can request and get an access token that contains the scope, but when they attempt to perform a modification, such as modifying an authorization server using `/api/v1/authorizationServers`, the operation fails because the admin lacks the necessary permissions.

## Test your integration

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

## Get an access token

### Client Credentials grant flow

API Service Integrations use an OAuth 2.0 client credentials grant flow with a client ID and client secret to get access tokens. 

<div class="three-quarter">

![Flowchart that displays the back and forth between the resource owner, authorization server, and resource server for Client Credentials flow](/img/authorization/oauth-client-creds-grant-flow.png)

</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

skinparam monochrome true

participant "Client + Resource Owner" as client
participant "Authorization Server (Okta)" as okta
participant "Resource Server (Your App)" as app

client -> okta: Access token request to /token
okta -> client: Access token response
client -> app: Request with access token
app -> client: Response

-->

### Request an access token

1. Provide an interface to collect and store these API Service Integration credentials:
     * Okta tenant (organization) domain (for example, acme.okta.com)
     * client id
     * client secret

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

## Making requests

When you have an access token, you can use it to make requests to the [Core Okta API]. Set the access token as a bearer token in an authorization header.

Example request:

```bash
curl -X GET "https://${customerOktaDomain}/api/v1/users"
    -H "Accept: application/json"
    -H "Content-Type: application/json"
    -H "Authorization: Bearer ${accessToken}
```

## Submit for review

[ Include code snippets in several languages we support, ultimately SDK examples. ]

## Support

If you need help or have an issue, post a question in the [Okta Developer Forum](https://devforum.okta.com/c/questions/oin-submissions/19).
