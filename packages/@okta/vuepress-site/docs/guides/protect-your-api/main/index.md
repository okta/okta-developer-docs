---
title: Protect your API endpoints
excerpt: Configure your Okta org and your server-side application to secure your API endpoints.
layout: Guides
---

Add a layer of authorization to your web services with [Okta API Access Management](/docs/concepts/api-access-management/).

---

**Learning outcomes**

* Configure a web API to use Okta
* Define which endpoints require authorization and which don't
* Enable Cross-Origin Resource Sharing (CORS) for the API
* Test the API is secure

**What you need**

* An [Okta Developer Edition org](https://developer.okta.com/signup/)
* <StackSnippet snippet="whatyouneed" />

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Overview

Applications accessing your web APIs require the same level of [authentication and authorization](https://www.okta.com/identity-101/authentication-vs-authorization/) as users accessing your web applications. However, the sign-in flow should be silent and require no human user interaction. Use Okta as the [authorization server](/docs/concepts/auth-servers/) for your web APIs and grant the correct level of access to incoming requests on your behalf.

In this quickstart, you:

1. [Check API Access Management is enabled](#check-api-access-management-is-enabled)
1. [Create and configure a new Web API to use Okta](#create-and-configure-a-new-web-api-to-use-okta)
1. [Configure different levels of access for different endpoints](#configure-different-levels-of-access-for-different-endpoints)
1. [Enable CORS for your API](#enable-cors-for-your-api)
1. [Test your API is secure](#test-your-api-is-secure)

> **Tip**: You need your Okta org domain to follow this tutorial. It looks like `dev-123456.okta.com`. See [Find your Okta domain](/docs/guides/find-your-domain/). Where you see `${yourOktaDomain}` in this guide, replace it with your Okta domain.

## Check API Access Management is enabled

[API Access Management (API AM)](/docs/concepts/api-access-management/) is the feature in your org that allows Okta to secure your APIs. All new developer orgs have API AM enabled by default, but it is an optional extra for production orgs. Check that it is enabled in your org as follows:

1. Open the Admin Console for your org.
   1. Sign in to your Okta organization with your administrator account.
   {style="list-style-type:lower-alpha"}
   1. Click **Admin** in the upper-right corner of the page.
1. Go to **Security** > **API** to view the API access management area.

_If there is no Authorization Servers tab present_, API Access Management is not enabled in your org. You should contact your support team to enable this feature in your org or create a new developer edition org.

### Note your authorization server name and audience

This tutorial uses the **default** custom authorization server to secure your API. Make a note of its **name** and **audience** value to configure your API:

1. From the API access management area in the Admin Console, select the **Authorization Servers** tab.
1. Locate the entry for the **default** server and make a note of two values.
   * **Audience**: Found under audience. It should be `api://default`.
   * **Authorization Server Name**: Found under name. It should be `default`.

Moving on, where you see `${yourAudience}` and `${yourAuthServerName}` in this guide, replace them with your audience and authorization server name.

> **Note**: You can create your own custom authorization server or use the default to protect your APIs. In either case, you need an appropriate license to use the custom authorization server in production.

## Create and configure a new Web API to use Okta

Now that you have an authorization server and noted how to identify it, you:

1. [Create an API project](#create-an-api-project)
1. [Add the required packages to your project](#add-the-required-packages-to-your-project)
1. [Configure your API to use Okta](#configure-your-api-to-use-okta)
1. [Create two endpoints to secure](#create-two-endpoints-to-secure)

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

In many APIs, all endpoints require authorization. There may be a mix of protected and unprotected endpoints in others. These examples show you how to set both protected and unprotected access to an endpoint.

### Require authorization for all endpoints

<StackSnippet snippet="reqautheverything" />

### Allow anonymous access for specific routes

To allow a mix of protected and anonymous endpoints, configure access on a per route basis.

<StackSnippet snippet="reqauthspecific" />

### Enable CORS for your API

Configuring Cross-Origin Resource Sharing (CORS) is required only if the API is being called from an application or API hosted on a different domain. For example, if you're hosting a single-page JavaScript app at `example.com`, which consumes an API endpoint hosted on `api.example.com`, you must enable CORS.

<StackSnippet snippet="configcors" />

## Test your API is secure

When your secured endpoint receives a request, it checks for a valid access token in the request header. The API then checks the token is valid with the authorization server. If it is valid, the API responds with the required data. If it is not, the API refuses the request.

To test that your API is secure, you need an access token. How an access token is obtained depends on the client making the request:

* For single-page web applications, see [Sign users in to your single-page app using the redirect model](/docs/guides/sign-into-spa-redirect/).
* For mobile apps, see [Sign users in to your mobile app using the redirect model](/docs/guides/sign-into-mobile-app-redirect/).
* If another machine or service (rather than users) consumes your API, use the [Client Credentials flow](/docs/guides/implement-grant-type/clientcreds/main/) to create an access token.

> **Note**: The information contained within an access token varies depending on the type of flow used to create it. For example, the Client Credentials flow doesn't contain any claims with user information such as a user ID or email.

### Run Your API

Start your server to get your API running.

<StackSnippet snippet="startyourapi" />

Leave your API running locally (or deployed if desired) and proceed to the next step.

### Test with Postman

Several standalone tools will send requests to APIs and allow you to check the responses. Here, you will use Postman to get an access token and test the security of the API you created.

1. [Install the Postman app](https://www.getpostman.com/apps).
1. Start Postman if it's not open already.
1. Send a POST request to `https://${yourOktaDomain}/oauth2/default/v1/token`, with an **Authorization** header set, to receive an access token.

   <div class="three-quarter border">
      ![Postman showing a response to a token request including an access token](/img/authorization/postman-post-response.png)
   </div>

1. Copy the value in the `access_token` object field and use it for testing your API in the next step.

First, test the `whoami` endpoint, which requires authorization:

1. Make a GET request to <StackSnippet snippet="whoamiurl" inline />.
1. Set the **Authorization** header to `Bearer ${token}`.
1. Check you received a `200 OK` response.
1. Delete the Authorization header and send the request again.
1. Check you received a `401 Unauthorized` response.

Now test the hello endpoint which doesn't require authorization:

1. Make a GET request to <StackSnippet snippet="hellourl" inline />.
1. Set the **Authorization** header to `Bearer ${token}`.
1. Check you received a `200 OK` response.
1. Delete the Authorization header and send the request again
1. Check you still receive a `200 OK` response.

## Next steps

* [Authorization servers](/docs/concepts/auth-servers/)
* [API Access Management](/docs/concepts/api-access-management/)
* [oAuth 2.0 Credit Credentials flow](/docs/guides/implement-grant-type/clientcreds/main/)
* [Validate access tokens](/docs/guides/validate-access-tokens/)
* [Test the Okta REST APIs using Postman](/code/rest/)
* Define your own custom OAuth 2.0 [scopes](/docs/guides/customize-authz-server/main/#create-scopes), [claims](/docs/guides/customize-authz-server/main/#create-claims), and [access policies](/docs/guides/customize-authz-server/main/#create-access-policies) to support authorization for your APIs.
* [Customize tokens returned from Okta from custom claims](/docs/guides/customize-tokens-returned-from-okta/main/)

<StackSnippet snippet="specificlinks" />
