---
title: Build an API service integration
excerpt: Learn how to build and register an API service integration to the Okta Integration Network.
layout: Guides
---

<ApiLifecycle access="ea" /><!--For both Classic and Identity Engine-->

This guide explains how to build and submit an API service integration to the Okta Integration Network (OIN) for review and publishing.

---

**Learning outcomes**

* Learn how to build an API service integration that can be published in the OIN.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
   > **Note:** The API Service Integration is a [Self-service Early Access (EA)](/docs/concepts/feature-lifecycle-management/#self-service-features) feature. Enable this feature in your org to obtain the API service integration capability.
* A service app that needs to access Okta APIs for your customer

**Sample code**

* See [How to use Client Credentials flow with Spring Security](https://developer.okta.com/blog/2021/05/05/client-credentials-spring-security) blog for an example of a Client Credentials flow using the [Okta Spring Boot Starter](https://github.com/okta/okta-spring-boot) library.

---

## Overview

A service-to-service app where where a backend service or a daemon calls [Okta management APIs](/docs/reference/core-okta-api/) for a tenant (Okta org) can be published in the Okta Integration Network (OIN) as an API service integration.
API service integrations access Okta APIs using the OAuth 2.0 [Client Credentials flow](/docs/concepts/oauth-openid/#client-credentials-flow), where access is not associated with a user and resources can be restricted with scoped access tokens. Each access token enables the bearer to perform specific actions on specific Okta endpoints, with that ability controlled by which scopes the access token contains.

> **Note:** Currently, Okta only supports OAuth APIs listed in [Scopes and supported endpoints](/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints). We're working towards supporting scopes for all Okta API endpoints.

If you have an API service integration for your app in the OIN, your customers can configure your integration to use the OAuth 2.0 Client Credentials flow with their Okta tenant org. Each customer Okta org has its own authorization server. When a customer authorizes your API service integration to access their org, Okta generates a unique set of credentials (client ID and client secret) for that org.
You must [collect and store these credentials](#collect-and-save-customer-credentials) for each customer to allow your integration to work with your customer's Okta org.

### API service integration Client Credentials flow

At a high-level, the OAuth 2.0 Client Credentials flow for an API service integration has the following steps:

1. Your customer's instance of your service integration makes an authorization request to their Okta Authorization Server using their client credentials.

   Your customer needs to install and authorize your integration in their Okta org so that Okta can accept the authorization request. See [Set up an API service integration](https://help.okta.com/okta_help.htm?type=oie&id=csh-api-service-integrations) for Admin Console instructions for your customer. After your integration is installed, the customer obtains their client credentials and passes them to your team so that they can configure the customer's integration instance. See [Collect and save customer credentials](#collect-and-save-customer-credentials). The customer's instance of your integration can now make an authorization request to Okta. See [Request for access token](#request-an-access-token).

2. If the credentials in the authorization request for a token are accurate, Okta responds with an access token.

   The resource and action scopes allowed for the access token is configured by you when you [submit your API service integration to the OIN](#submit-your-api-service-integration) for verification through the OIN Manager. In addition, the token request must contain allowed scopes for your API service integration. See [Selecting scopes](#selecting-scopes).

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

This section provides you a guideline of the component and requests you require to build your API service integration using basic `curl` commands . You can use OAuth 2.0 SDKs in your preferred language to implement the OAuth 2.0 Client Credentials flow.

For an example of how to implement the Client Credentials flow using Spring Boot, see the [How to use Client Credentials flow with Spring Security](https://developer.okta.com/blog/2021/05/05/client-credentials-spring-security) blog. This example uses the [Okta Spring Boot Starter](https://github.com/okta/okta-spring-boot) library. You can ignore the custom scopes and authorization server part of the example since it doesn't apply to the API service integration use case.

### Collect and save customer credentials

Okta generates a unique set of credentials (client ID and client secret) for your customer when they install your integration in their Okta org. See [Set up an API service integration](https://help.okta.com/okta_help.htm?type=oie&id=csh-api-service-integrations). You must collect and store these credentials for each customer to allow your integration to work with the customer's Okta org.

To implement the Client Credentials flow in your integration, provide an interface to collect and store these API service integration credentials:

* Okta tenant (organization) domain (for example, `acme.okta.com`)
* client ID
* client secret

> **Note:** This guide refers to these domain and credentials as `${customerOktaDomain}`, `${clientId}`, and `${clientSecret}` variables.

### Selecting scopes

You must specify the resources and actions that your API service app requires to do its job. Use the least-privilege principle and only specify the minimal scopes required. See the list of available Okta [Scopes and supported endpoints](/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints).

There are two types of scope: read and manage. Read scopes can only view resources, while manage scopes can read, create, update, and delete resources. You don't need to request a read scope when you request a manage scope because manage scopes already includes read access.

| Action    | Read scopes           | Manage scopes   |
| ----------- | -------------- | ------------- |
| Read | Yes | Yes |
| Create | No | Yes |
| Update | No | Yes |
| Delete | No | Yes |

The Okta Org Authorization Server returns all scopes that you request if you registered those scopes along with your integration. Currently, API service integrations don't support optional scopes. You can request a subset of your-integration-supported scopes when requesting an access token from the `/token` endpoint. For example, if you registered the `okta.users.manage`, `okta.groups.manage`, and `okta.apps.manage` scopes for your integration, but your service only needs to retrieve and update Okta groups for a specific task, then you can specify only the `okta.groups.manage` scope in your access token request.

### Request an access token

Your service app integration needs to request an access token to securely access the Okta APIs. Use the following configuration variables to form the access token request:

* `${customerOktaDomain}`: Your customer's Okta tenant (org) domain
* `${clientId}`: Your customer's client ID
* `${clientSecret}`: Your customer's client secret
* `${scopes}`: The resource scopes required for the access token

> **Note:** If you're using an OAuth 2.0 library, you typically need to you configure an OAuth client class with a `tokenUri` parameter, as well as the `clientId` and `clientSecret` parameters. Specify the `tokenUri` string as `https://${customerOktaDomain}/oauth2/v1/token`.

The following is the process for using a Basic authorization header for the `/token` request:

1. Base64 encode the string and set it in the authorization header:

   ```sh
   Authorization: Basic ${Base64(${client_id}:${client_secret})}
   ```

1. Make a request to the [/token](/docs/reference/api/oidc/#token) endpoint with these query parameters:
   * `grant_type` set to `client_credentials`
   * `scope` must be at least one of the Okta API scopes

   Request example:

   ```bash
   curl --request POST \
     --url https://${customerOktaDomain}/oauth2/v1/token \
     --header 'Accept: application/json' \
     --header 'Authorization: Basic MG9hY...' \
     --header 'Cache-control: no-cache' \
     --header 'Content-type: application/x-www-form-urlencoded' \
     --data 'grant_type=client_credentials&scope=okta.users.read okta.groups.read
   ```

1. If the request is successful, the token is be returned in the body of the response.

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

   See the [list of token endpoint errors](https://developer.okta.com/docs/reference/api/oidc/#possible-errors-4).

### Make Okta API requests

When you have an access token, you can use it to make requests to the [Core Okta APIs](/docs/reference/core-okta-api/). Set the access token as a bearer token in an authorization header.

Example request:

```bash
curl -X GET "https://${customerOktaDomain}/api/v1/users"
    -H "Accept: application/json"
    -H "Content-Type: application/json"
    -H "Authorization: Bearer ${accessToken}
```

## Submit your API service integration

After you have completed and tested your API service integration, submit it to Okta for verification:

1. Navigate to the [OIN Manager](https://oinmanager.okta.com/) and click **Start Submission Form**.
1. Sign in with the credentials of the Okta org you use to build and submit your integration.
1. Click **Add New Submission** or **Edit** an existing submission.
1. In the **General Settings** tab, specify values in the **App Information**, **Customer Support** and **Test Account** sections. See [Configure general settings](/docs/guides/submit-app/openidconnect/main/#configure-general-settings) for field descriptions.
1. On the **OAUTH** tab, select **On** from the **OAUTH Support** dropdown menu.
   The **OAuth Settings** appears and the **Client Credentials** grant type is automatically selected.
1. Under **Enable scopes**, click **+ Add Another** specify a scope for your app integration.

   * Enter the name of a scope you would like to request from Okta admins. A scope corresponds to a resource you would like to access in the Okta API (users, logs, etc) and a level of access (read or manage). See [Scopes and supported endpoints](/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints). The sections below have more information about scopes.

   ** Click **+Add Another** for additional scopes you want to grant.

1. Specify the URL to the integration configuration instructions for your customer under **Link to configuration guide**.

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
