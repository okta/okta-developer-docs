---
title: Protect your API endpoints
excerpt: Configure your Okta org and your server-side app to secure your API endpoints.
layout: Guides
---

Add a layer of authorization to your web services with [Okta API Access Management](/docs/concepts/api-access-management/).

---

#### Learning outcomes

* Configure a web API to use Okta
* Define which endpoints require authorization and which don't
* Enable Cross-Origin Resource Sharing (CORS) for the API
* Test the API is secure

#### What you need

* An [Okta Developer Edition org](https://developer.okta.com/signup/)
* [Postman](https://www.getpostman.com/apps) to test the API
* <StackSnippet snippet="whatyouneed" />

#### Sample code

<StackSnippet snippet="samplecode" />

> **Note**: Several standalone tools can send requests to APIs and allow you to inspect the responses. Our documentation uses **Postman** and offers [Postman Collections](/docs/reference/postman-collections/) to test its APIs more efficiently with a GUI. It also includes HTTP requests as text for those who prefer to use a terminal utility such as [cURL](https://curl.se/download.html).

---

## Overview

Background services and third-party APIs that access your APIs require the same levels of [authentication and authorization](https://www.okta.com/identity-101/authentication-vs-authorization/) as users who access your web apps. However, a machine-to-machine sign-in flow is silent and requires no user interaction. Use Okta to grant the correct level of access to your APIs on your behalf.

This quickstart contains the following tasks:

1. [Check that API Access Management is enabled](#check-that-api-access-management-is-enabled)
1. [Create and configure a new web API to use Okta](#create-and-configure-a-new-web-api-to-use-okta)
1. [Configure different levels of access for different endpoints](#configure-different-levels-of-access-for-different-endpoints)
1. [Enable CORS for your API](#enable-cors-for-your-api)
1. [Test your API is secure](#test-that-your-api-is-secure)

> **Tip**: You need your Okta org domain to follow this tutorial. It looks like `dev-123456.okta.com`. See [Find your Okta domain](/docs/guides/find-your-domain/). Where you see `{yourOktaDomain}` in this guide, replace it with your Okta domain.

> **Note**: For a similar use case where Okta secures a machine-to-machine sign-in flow between a background service app and the Okta APIs, rather than a service app and your own API, see [Implement OAuth for Okta with a service app](/docs/guides/implement-oauth-for-okta-serviceapp/)

## Check that API Access Management is enabled

[API Access Management (API AM)](/docs/concepts/api-access-management/) is the feature in your org that allows Okta to secure your APIs. When enabled, API AM allows you to create an authorization server that establishes a security boundary for your APIs. All new developer orgs have API AM enabled by default, but it’s optional for production orgs. Check that it’s enabled in your org as follows:

1. Open the Admin Console for your org.
   1. [Sign in to your Okta organization](https://developer.okta.com/login) with your administrator account.
   1. Click **Admin** in the upper-right corner of the page.
1. Go to **Security** > **API** to view the API AM area.

If no **Authorization Servers** tab exists, API AM isn’t enabled in your org. Contact your support team to enable this feature in your org or [create an Okta Developer Edition org](https://developer.okta.com/signup/).

### Note your authorization server name and audience

This tutorial uses the **default** custom authorization server to secure your API. Make a note of its **name** and **audience** value to configure your API:

1. From the API AM area in the Admin Console, select the **Authorization Servers** tab.
1. Go to the entry for the **default** server and make a note of two values.
   * **Audience**: `api://default`.
   * **Authorization Server Name**: `default`.

Where you see `{yourAudience}` and `{yourAuthServerName}` in this guide, replace with `api://default` and `default`, respectively.

> **Note**: You can either create a custom authorization server or use the default to protect your APIs. In either case, you need an appropriate license to use them in production.
If you're using a custom authorization server other than `default`, you must use the `id` of the authorization server rather than the `name`.

For further information, see [Authorization servers](/docs/concepts/auth-servers/#custom-authorization-server).

## Create and configure a new web API to use Okta

Now that you have an authorization server and noted how to identify it, complete the following steps:

1. [Create an API project](#create-an-api-project).
1. [Add the required packages to your project](#add-the-required-packages-to-your-project).
1. [Configure your API to use Okta](#configure-your-api-to-use-okta).
1. [Create two endpoints to secure](#create-two-endpoints-to-secure).

### Create an API project

<StackSnippet snippet="createproject" />

### Add the required packages to your project

<StackSnippet snippet="addpackages" />

### Configure your API to use Okta

Earlier you [noted your authorization server name and audience](#note-your-authorization-server-name-and-audience). Add these and your Okta domain to your API's configuration.

<StackSnippet snippet="configureapi" />

## Create two endpoints to secure

Create two endpoints in your project that cover two different use cases:

* `api/whoami`&mdash;a protected endpoint (access-restricted API)
* `api/hello`&mdash;an endpoint that anonymous users can access (unsecured API)

<StackSnippet snippet="createendpoints" />

## Configure different levels of access for different endpoints

In many APIs, all endpoints require authorization. There may be a mix of protected and unprotected endpoints in others. These examples show you how to assign protected and unprotected access to an endpoint.

### Require authorization for all endpoints

<StackSnippet snippet="reqautheverything" />

### Allow anonymous access for specific routes

Configure access on a per-route basis to allow a mix of protected and anonymous endpoints.

<StackSnippet snippet="reqauthspecific" />

### Enable CORS for your API

Enable [Cross-Origin Resource Sharing (CORS)](https://fetch.spec.whatwg.org/#http-cors-protocol) only if the API is being called from an app or API hosted on a different domain. For example, if your API is hosted on `api.example.com` while your app is accessing it from `example.com`, you must enable CORS.

<StackSnippet snippet="configcors" />

## Test that your API is secure

You can now test if your endpoint security works as intended. To do this, complete the following steps:

1. [Create an API services integration](#create-an-api-services-integration) to represent another machine or service attempting to make requests to the API.
1. [Create a custom scope for the API](#create-a-custom-scope-for-the-api) for authorization server to assign to the API integration.
1. [Run your API](#run-your-api).
1. Use [Postman](https://www.getpostman.com/apps) to
   1. [Request an access token for the API](#request-an-access-token-for-the-api).
   [[style="list-style-type:lower-alpha"]]
   1. [Query both the `\hello` and `\whoami` endpoints](#query-the-hello-and-whoami-endpoints).

### Create an API Services integration

When another machine or service (rather than users) consumes an API, it uses the [Client Credentials flow](https://developer.okta.com/docs/guides/implement-grant-type/clientcreds/main/) to identify itself and request an access token. Create an API services integration that has this flow enabled.

1. Open the Admin Console for your org.
1. Go to **Applications** > **Applications** to view the current app integrations.
1. Click **Create App Integration**.
1. Select **API Services** as the **Sign-in method**, and click **Next**.
1. Enter an integration name, and click **Save**.

The configuration page for the new API services integration appears. Make a note of two values that you use to request your access token:

* **Client ID**: Found on the **General** tab in the Client Credentials section.
* **Client Secret**: Found on the **General** tab in the Client Credentials section.

Moving on, where you see `{yourClientId}` and `{yourClientSecret}` in this guide, replace them with your client ID and client secret.

### Create a custom scope for the API

Scope is a way to limit an app's access to your API. An access token must include a list of the scopes an app integration can perform. Create a custom scope to query both endpoints for the API.

1. Go to **Security** > **API** to view the API AM area.
1. Select the **Authorization Servers** tab.
1. Go to the entry for the **default** server and click its name.
1. Select the **Scopes** tab and click **Add Scope**.
1. Enter a name for the scope. For example, "AccessAll".
1. Click **Create**.
1. Ensure that the table contains the new scope.

### Run Your API

Now, start your server to get your API running.

<StackSnippet snippet="startyourapi" />

Leave your API running locally (or deployed if desired) and proceed to the next step.

### Test with Postman

Start Postman if it's not open already. First, you request an access token from Okta and then check your APIs are protected correctly.

#### Request an access token for the API

Make an HTTP POST request to [/token](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/tokenCustomAS) using the client ID and secret you noted earlier.

1. Select **+** in the Postman workbench to open a new request tab.
1. Select **GET** and change it to **POST**.
1. Enter `https://{yourOktaDomain}/oauth2/{yourAuthServerName}/v1/token` for the **URL**.
    >**Note:** If you're using a custom authorization server other than `default`, use the authorization server `id` in place of the `{yourAuthServerName}` placeholder.
1. In the **Params** tab, create two key-value pairs:
   1. **Key**: `grant_type`, **Value**: `client_credentials`
   [[style="list-style-type:lower-alpha"]]
   1. **Key**: `scope`, **Value**: `{yourCustomScope}`
1. Select the **Authorization** tab, and then select Basic Auth for **type**.
1. Enter `{yourClientId}` for **Username** and `{yourClientSecret}` for **Password**.
1. Select the **Headers** tab and add two new headers:
   1. **Name**: Cache-Control and **Value**: no-cache
   [[style="list-style-type:lower-alpha"]]
   1. **Name**: Content-Type and **Value**: application/x-www-form-urlencoded
1. Click **Send** to receive an access token.

   <div class="full border">

   ![A image of a Postman call to /token and receiving an access token.](/img/authorization/postman-get-access-token.png)

   </div>

1. Copy the value returned in the `access_token` object field and use it for testing your API in the next section.

#### Query the hello and whoami endpoints

Now you can test your secured API endpoints. First, test the `\whoami` endpoint, which requires authorization:

1. Select **+** in the Postman workbench to open a new request tab.
1. Enter <StackSnippet snippet="whoamiurl" inline /> for **URL**.
1. Select the **Authorization** tab, and then select the Bearer Token for **type**.
1. Enter the token that you received earlier for **Token**.
1. Click **Send**.
1. Ensure that you received a `200 OK` response.
1. Select the **Authorization** tab, and then select No Auth for **type**.
1. Ensure that you received a `401 Unauthorized` response.

Now test the hello endpoint that doesn't require authorization:

1. Select **+** in the Postman workbench to open a new request tab.
1. Enter <StackSnippet snippet="hellourl" inline /> for **URL**.
1. Select the **Authorization** tab, and then select the Bearer Token for **type**.
1. Enter the token that you received earlier for **Token**.
1. Click **Send**.
1. Ensure that you received a `200 OK` response.
1. Select the **Authorization** tab, and then select No Auth for **type**.
1. Ensure that you still receive a `200 OK` response.

## Next steps

Learn more about the concepts introduced in this guide:

* [API Access Management](/docs/concepts/api-access-management/)
* [Authorization servers](/docs/concepts/auth-servers/)
* [OAuth 2.0 Credit Credentials flow](/docs/guides/implement-grant-type/clientcreds/main/)
* [Test the Okta REST APIs using Postman](/docs/reference/rest/)
* Define your own custom OAuth 2.0 [scopes](/docs/guides/customize-authz-server/main/#create-scopes), [claims](/docs/guides/customize-authz-server/main/#create-claims), and [access policies](/docs/guides/customize-authz-server/main/#create-access-policies) to support authorization for your APIs.
* [Customize tokens returned from Okta from custom claims](/docs/guides/customize-tokens-returned-from-okta/main/)

<StackSnippet snippet="specificlinks" />
