---
title: Protect your API endpoints
excerpt: Configure your Okta org and your server-side application to secure your API endpoints.
layout: Guides
---

Add authorization using Okta to protect your APIs. When you finish, you have a secure REST API application that validates incoming requests.

---

**Learning outcomes**

* Add Okta [authorization](https://www.okta.com/identity-101/authentication-vs-authorization/) to your API endpoints.
* Add dependencies and configure your API.
* Create an anonymous endpoint and restricted endpoint.
* Require authorization on protected routes.
* Make an HTTP request with and without a valid access token.

**What you need**

A [custom authorization server](/docs/concepts/auth-servers/#custom-authorization-server) to create and apply authorization policies to protect your APIs

<ApiAmProdWarning />

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Set up Okta

Set up your developer account and [Okta org](/docs/concepts/okta-organizations/). The Okta command-line interface (CLI) is the quickest way to do this. Alternatively, you can [manually sign up for a developer account](https://developer.okta.com/signup/).

1. Install [Okta CLI](https://cli.okta.com/).
1. If you don't already have a free Okta developer account:
   1. Open your terminal.
   {style="list-style-type:lower-alpha"}
   1. Run `okta register`, and enter your first name, last name, email address, and country.
   1. Click or tap **Activate** in the account activation email that is sent to the email address that you gave.

      > **Tip**: If you don't receive the confirmation email sent as part of the creation process, check your spam filters for an email from `noreply@okta.com`

   1. Find your new domain and a link to set your password in the email:

      ```txt
      Your Okta Domain: https://dev-xxxxxxx.okta.com
      To set your password open this link:
      https://dev-xxxxxxx.okta.com/welcome/xrqyNKPCZcvxL1ouKUoh
      ```

   1. Set the password for your org by opening the link and following the instructions. Your Okta domain is returned, similar to the following:

      ```txt
      New Okta Account created!
      Your Okta Domain: https://dev-xxxxxxx.okta.com
      ```

   1. Make a note of your Okta domain. Use it wherever `${yourOktaDomain}` appears in this guide.

> **Note**: If you're using an existing org, verify that API Access Management is enabled: Open your Admin Console, go to **Security** > **API**, and verify that an **Authorization Servers** tab is present. If not, choose one of the following:
>
> * Create a developer account and org with Okta CLI.
> * Contact your support team to enable the feature in your org.
>
> All accounts created with Okta CLI are developer accounts and have API Access Management enabled by default.

## Create a REST API

Create a new application with a simple API endpoint to add authorization to.

### Create a new API project

<StackSnippet snippet="createproject" />

### Include the dependencies

<StackSnippet snippet="independ" />

### Configure your API

You need to configure the API with some information about the [authorization server](/docs/guides/customize-authz-server/) used by your Okta organization.

> **Note:** This tutorial uses the **default** custom authorization server to secure your protected API. You can create your own custom authorization server for this purpose. In either case, you need an appropriate license to use the custom authorization server in production.

#### Things you need

Our project uses information from the Okta organization we created earlier to configure communication with the API. You can find these values in the API section of the Admin Console: Select **Security** > **API** from the main menu.

There are three pieces of information you may need, depending on the platform you are using:

* **Audience**: `api://default` by default
* **Authorization Server Name**: `default`
* **Okta Domain**: Found in the global header located in the upper-right corner of the dashboard. Click the down arrow next to your email address and in the dropdown box that appears, move your pointer over the domain name. Click the Copy to clipboard icon that appears to copy the domain.

   > **Note:** Your Okta domain is different from your admin domain. Your Okta domain doesn't include `-admin`, for example, `https://dev-133337.okta.com`.

<StackSnippet snippet="configmid" />

## Create your REST endpoints

Create new REST endpoints in your application that cover two different use cases:

* `api/whoami` &mdash; A protected endpoint (access-restricted API)
* `api/hello` &mdash; An endpoint that anonymous users can access (unsecured API)

<StackSnippet snippet="createroute" />

## Configure required authentication

In many APIs, all of the endpoints require authorization. In others, there may be a mix of protected and unprotected (anonymous) endpoints. These examples show you how to do both.

### Require authorization for everything

<StackSnippet snippet="reqautheverything" />

### Allow anonymous access for specific routes

If you have endpoints that need to be accessed without any authorization, instead of securing the entire API like the previous section, you can configure access per route.

<StackSnippet snippet="reqauthspecific" />

### Configure CORS if necessary

Configuring Cross-Origin Resource Sharing (CORS) is only required if the API is being called from a browser app hosted on a different domain. For example, if you are hosting a single-page JavaScript app at `example.com`, which consumes an API endpoint hosted on `api.example.com`, you need to enable CORS.

<StackSnippet snippet="configcors" />

## Consume your secure API endpoints

Test your APIs with an access token that is sent to your endpoint for validation.

### Use an access token with your API endpoint

In order for someone to make a request to your API, they need an access token. How an access token is obtained depends on the client making the request.

If your API is consumed from another machine or service (instead of users), you can follow the [Client Credentials flow](/docs/guides/implement-grant-type/clientcreds/main/) to create an access token. See [Sign users in to your single-page app using the redirect model](/docs/guides/sign-into-spa-redirect/) or [Sign users in to your mobile app using the redirect model](/docs/guides/sign-into-mobile-app-redirect/) for instructions on how to retrieve an access token in those types of app.

> **Note**: The information contained within an access token varies depending on the type of flow used to create it. For example, the Client Credentials flow doesn't contain any claims with user information such as a user ID or email.

If you are using [Postman](/code/rest/) and the Client Credentials flow, you can use an API call of the form `https://${yourOktaDomain}/oauth2/default/v1/token`, with an Authorization header set, and you will get a response containing an access token.

<div class="three-quarter border">

![Postman showing a token request post response including an access token](/img/authorization/postman-post-response.png)

</div>

Copy the value in the `access_token` object field and use it for testing your API in the next step.

### Run your API

Start your server to get your API running.

<StackSnippet snippet="testapp" />

Leave your API running locally (or deployed if desired) and proceed to the next step.

### Send a request to your API endpoint using Postman

After your API is running locally, you need to test it. Using a tool like Postman or cURL, call your API endpoints to see the responses with and without your token.

<StackSnippet snippet="request" />

The expected results are as follows, provided you followed the instructions in the [Allow anonymous access for specific routes](#allow-anonymous-access-for-specific-routes) section:

* `api/whoami` &mdash; 401 response without a valid token, 200 response with a valid token.
* `api/hello` &mdash; response with or without a valid token, due to anonymous access.

If you are using Postman, your GET call and response should look something like this:

<div class="three-quarter border">

![Postman showing a get request to the protected endpoint with a token, and a resulting 200 response](/img/authorization/postman-get-response.png)

</div>

## Next steps

* Define your own custom OAuth 2.0 [scopes](/docs/guides/customize-authz-server/main/#create-scopes), [claims](/docs/guides/customize-authz-server/main/#create-claims), and [access policies](/docs/guides/customize-authz-server/main/#create-access-policies) to support authorization for your APIs.
* [Learn more about validating access tokens](/docs/guides/validate-access-tokens/dotnet/main/)
* [Include custom claims in your token returned from Okta](/docs/guides/customize-tokens-returned-from-okta/-/main/)

<StackSnippet snippet="specificlinks" />
