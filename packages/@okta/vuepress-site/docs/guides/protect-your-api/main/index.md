---
title: Protect your API endpoints
excerpt: Configure your Okta org and your server-side application to secure your API endpoints.
layout: Guides
---


Add authorization using Okta to your APIs. When you've finished following the steps, you will have a secure REST API application that validates incoming requests.

---

**Learning outcomes**

* Add Okta [authorization](https://www.okta.com/identity-101/authentication-vs-authorization/) to your API endpoints.
* Add dependencies and configure your API.
* Create an anonymous endpoint and restricted endpoint.
* Require authorization on protected routes.
* Make an HTTP request with and without a valid access token.

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Set up Okta

Set up your [Okta org](/docs/concepts/okta-organizations/). The CLI is by far the quickest way to work with your Okta org, so we’d recommend using it from this point onwards.

1. Install the Okta command-line interface: [Okta CLI](https://cli.okta.com/).
2. If you don't already have a free Okta developer account, create one by entering `okta register` on the command line.
3. Make a note of the Okta Domain as you’ll use that later.
4. **IMPORTANT:** Set the password for your Okta developer org by opening the link that’s shown after your domain is registered. Look for output similar to this:

```
Your Okta Domain: https://dev-xxxxxxx.okta.com
To set your password open this link:
https://dev-xxxxxxx.okta.com/welcome/xrqyNKPCZcvxL1ouKUoh
```

5. Connect to your Okta developer org if you didn’t create one in the last step (successfully creating an Okta org also signs you in) by running the following command (you'll need the URL of your org and the access token):

```
okta login
```

> **Note**: If you don’t want to install the CLI, you can [manually sign up for an org](https://developer.okta.com/signup/) instead. We’ll provide non-CLI instructions along with the CLI steps below as well.

> **Note**: If you don’t receive the confirmation email sent as part of the creation process, check your spam filters for an email from `noreply@okta.com`

## Create a REST API

For this example, create a new application with a simple API endpoint to add authorization to.

### Create a new API project

<StackSnippet snippet="createproject" />

### Include the dependencies

<StackSnippet snippet="independ" />

### Configure your API

You need to configure the application with some information about your Okta organization. You need the following values:

* **Issuer** &mdash; Found in the **Issuer URI** for the entry of your Okta authorization server that's shown by logging into your Admin dashboard and choosing **Security** > **API**. Use the [Authorization Server](/docs/guides/customize-authz-server/) named `default` for this tutorial, but you can use other custom auth servers as well. It could look like `https://{yourOktaOrg}`.
* **Audience** &mdash; A string representing the intended recipient of the token. The default value is `api://default`.

<ApiAmProdWarning />

<StackSnippet snippet="configmid" />

## Create your REST endpoints

Create new REST endpoints in your application that cover two different use cases: 

* `api/whoami` &mdash; An endpoint that uses information within the token (access-restricted API)
* `api/hello` &mdash; An endpoint that anonymous users can access (unsecured API)

<StackSnippet snippet="createroute" />

## Require authorization

In many APIs, all of the endpoints require authorization. In others, there may be a mix of protected and unprotected (anonymous) endpoints. These examples show you how to do both.

### Require authorization for everything

For most applications, you want to require the user to be authorized for all routes.

<StackSnippet snippet="reqautheverything" />

### Allow anonymous access for specific routes

If you have endpoints that need to be accessed without any authorization, **instead of securing the entire API like the snippet above**, you can configure access per route.

<StackSnippet snippet="reqauthspecific" />

### Configure CORS if necessary

Configuring Cross-Origin Resource Sharing (CORS) is **only required if the API is being called from a browser app hosted on a different domain**. For example, if your single-page JavaScript app is on `example.com`, but your API is hosted on `api.example.com`, you need to enable CORS.

<StackSnippet snippet="configcors" />

## Consume your secure API endpoints

Test your APIs with an access token that will be sent to your endpoint for validation.

### Use an access token with your API endpoint

In order for someone to make a request to your API, they will need an access token to do so. How an access token is obtained depends on the client making the request.

If your API will be consumed from another machine or service (instead of users), you can follow the [Client Credentials Guide](/docs/guides/implement-grant-type/clientcreds/main/) to create an access token.

The information contained within an access token will vary depending on the type of flow used to create it. For example, client credentials will not contain any claims with user information such as a user ID or email. See [Sign users into your single-page app using the redirect model](/docs/guides/sign-into-spa-redirect/) or [Sign users into your mobile app using the redirect model](/docs/guides/sign-into-mobile-app-redirect/) for instructions on how to retrieve an access token in those types of app.

If using [Postman](https://www.postman.com/downloads/) and the client credentials flow, your POST response should look like this:

![Postman showing a token request post response including an access token](/img/postman-post-response.png)

Copy the value in the `access_token` object field and use it for testing your API in the next step.

### Run your API

Next, you’ll start your server and try out sending requests to the API you’ve just built with an access token.

<StackSnippet snippet="testapp" />

Leave your API running locally (or deployed if desired) and proceed to the next step.

### Send a request to your API endpoint using Postman

Once your API is running locally, you need to test it. Using a tool like Postman or cURL, call your API endpoints to see the responses with and without your token.

<StackSnippet snippet="request" />

Expected results:

* `api/whoami` &mdash; 401 response without a valid token, 200 response with token claims listed inside the JSON with a valid token.
* `api/hello` &mdash; response with or without a valid token, due to anonymous access.

If using Postman, your GET call and response should look like this:

![Postman showing a get request to the protected endpoint with a token, and a resulting 200 response](/img/postman-get-response.png)

## Next steps

* Define your own custom OAuth 2.0 [scopes](/docs/guides/customize-authz-server/main/#create-scopes), [claims](/docs/guides/customize-authz-server/main/#create-claims), and [access policies](/docs/guides/customize-authz-server/main/#create-access-policies) to support authorization for your APIs.
* [Learn more about validating access tokens](/docs/guides/validate-access-tokens/dotnet/main/)
* Include [custom claims in your token returned from Okta](/docs/guides/customize-tokens-returned-from-okta/-/main/)

<StackSnippet snippet="specificlinks" />