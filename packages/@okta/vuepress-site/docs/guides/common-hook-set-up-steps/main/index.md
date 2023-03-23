---
title: Common Hook set-up steps
excerpt: A list of set-up steps that are common to all hook implementations.
layout: Guides
---

This guide explains common set-up steps when implementing an Okta Event or Inline hook, including using Glitch.com as an example external service, adding authentication to the hook calls, JSON body parsing in the external service code, and troubleshooting steps.

---

**Learning outcomes**

* Understand common set up steps for implementing an Okta event or inline hook.
* Understand how to use these steps when running the example hook code in the accompanying guides.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* [Glitch.com](https://glitch.com) project or account

---

## About the common hook set-up steps

Okta event and inline hooks use outbound calls, which are received and parsed by an external service to implement additional custom functionality for your Okta implementation.

A secure web server and application is a requirement to implement an Okta event or inline hook, and is referred to as the external service in these guides.

For instructional purposes, the following guides for event hooks and inline hook types use the third-party site [Glitch](https://glitch.com), which functions as an online external service. You can use the example code to quickly implement the hook and preview the functionality.

> **Note:** You can also use your own secure web server to implement the sample code.

See the following section on setting up a Glitch project and adding appropriate code.

## Set up an external service

The event hook and inline hook examples in this section use Glitch projects to create an external service for use with your Okta org.

[Glitch](https://www.glitch.com) is a browser-based development environment that can build a full-stack web application online. You can use their template applications to implement an external service that receives the outbound calls from Okta orgs.

Start with a new Node.js project built on the Express framework or a Node.js SQLite database application and use the code snippets in the following examples to implement the example hooks. Copy (**Remix on Glitch**) the Glitch projects for each hook in the following sections to have a working code sample.

<StackSnippet snippet="setup"/>

## Add body parsing

The Glitch project templates don't have any body-parsing code. To include this content:

* Add the body-parser `npm` package to your Glitch project
* Add the code snippet below

If you remix a Glitch inline hook project, the packages and code are already included.

To add the `npm` packages:

1. Select the `package.json` file in the left-hand project menu.
2. From the `Add Package` dropdown box, search for the `body-parser` packages.
3. Click each package to add to your project.

<StackSnippet snippet="parse"/>

> **Note:** If your express framework package is version `14.1x` or above, you don't need to add the `body-parser` package, which is now included with the `express` package. You only need to add `app.use(express.json())` to your project code.

## Add authentication method

Okta inline hooks can use header authentication as well as OAuth 2.0 authentication to secure the calls from Okta to your external service. The inline hook Glitch projects use Basic Authentication. See the following sections to implement Basic Authentication or to use the OAuth 2.0 client secret or the private key method.

### HTTP header: Basic Authentication

The inline hook guides use [HTTP Basic Authentication](/books/api-security/authn/api-authentication-options/#http-basic-authentication) to authenticate the Okta inline hook API calls received by your Glitch external service. In your Okta org, you must encode the Glitch project username and password credentials in Base64 and add them as the **Authentication secret** when you activate the inline hook. Ensure that you add the scheme `Basic ` (including a space) as a prefix to the **Authentication secret** value.

For example, the credential pair used in the inline hook examples is `admin:supersecret`, which encoded in Base64 is `YWRtaW46c3VwZXJzZWNyZXQ=`. Adding the scheme to this value creates the inline hook **Authentication secret** value: `Basic YWRtaW46c3VwZXJzZWNyZXQ=`.

After including the `npm` packages, add the following code snippet in your project.

<StackSelector snippet="auth" noSelector/>

### OAuth 2.0: Client Secret

The OAuth 2.0 Client Secret method sends a signed JWT to your external service. To use this method, you must make the following configurations to your org and add code to decode the JWT from the Okta inline hook call:

* Create an app integration.
* Add a custom scope.
* Add OAuth 2.0 authentication fields to your inline hook.
* Add code to your external service to verify the JWT.

#### Create an app integration

Before you can implement authorization, you need to register your app in Okta by creating an app integration from the Admin Console.

1. In the Admin Console, navigate to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **API Services** as the Sign-in method.
1. Click **Next**.
1. Specify the app integration name, then click **Save**.
1. From the **General** tab of your app integration, note your generated **Client ID** and **Client secret**.

These values are used when configuring your inline hook authentication.

#### Add a custom scope

<StackSnippet snippet="scope"/>

#### Add OAuth 2.0 authentication fields to your inline hook

When creating your inline hook, in the Authentication section, select **OAuth 2.0**.

1. In the **Client Authentication** field, select **Use client secret** from the dropdown menu.
1. Add the **Client ID** and **Client Secret** values from your app integration.
1. Add the authorization server’s token URL, such as `https://${yourOktaDomain}/oauth2/default/v1/token`, and the custom scope that you created previously.
1. Click **Save**.

#### Add code to verify the JWT

The Okta inline hook sends a signed JWT to your external service as part of the hook call. Your service must decode this JWT to validate the token.

The following Node.js code uses the Okta JWT verifier package to validate the JWT. For further information on using this package, see [Okta JWT Verifier for Node.js](https://www.npmjs.com/package/@okta/jwt-verifier). Add the `@okta/jwt-verifier` package to your external service, and then add the following code to validate the token:

```JavaScript
const OktaJwtVerifier = require("@okta/jwt-verifier");

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://${yourOktaDomain}/oauth2/default' // required
});

const authenticationRequired = async (request, response, next) => {
  const authHeader = request.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);
  if (!match) {
    return response.status(401).send();
  }

  try {
    const accessToken = match[1];
    console.log(accessToken);
    if (!accessToken) {
      console.log("no access token");
      return request.status(401, 'Not authorized').send();
    }
    request.jwt = await oktaJwtVerifier.verifyAccessToken(accessToken,  'api://default');
    console.log('token is valid');
    next();
  } catch (err) {
    console.warn('token failed validation');
    return response.status(401).send(err.message);
  }
};

app.all('*', authenticationRequired); // Require authentication for all routes

```

<RegistrationHookXref/>

### OAuth 2.0: Private Key

The OAuth 2.0 private key method sends a signed JWT to your external service. To use this method, you must make the following configurations to your org and add code to decode the JWT from the Okta inline hook call:

* Create a key
* Create an app integration
* Add a custom scope
* Add OAuth 2.0 authentication fields to your inline hook
* Add code to your external service to verify the JWT

#### Create a key

1. In the Admin Console, go to **Workflow** > **Key Management**.
1. Click **Create new key**, and add a unique name for the key. You reference this name when adding your inline hook.
1. Click **Create key**. The key is added to the table with a creation date and status.
1. In the table, click your key name.
1. Click **Copy public key**. You need this public key in the next step.

> **Note:** You can also create a key with the [Key Management API](/docs/reference/api/hook-keys/).

#### Create an app integration

Before you can implement authorization, you need to register your app in Okta by creating an app integration from the Admin Console.

1. In the Admin Console, navigate to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **API Services** as the Sign-in method.
1. Click **Next**.
1. Specify the app integration name, then click **Save**.
1. From the **General** tab of your app integration, click **Edit**.
1. In the **Client authentication** field, select **Public key / Private key**.
1. In the **Public Keys** section, click **Add key**.
1. Paste the public key that you created in the previous procedure, and click **Done**.
1. Click **Save** and copy the generated Client ID value.

#### Add a custom scope

<StackSnippet snippet="scope"/>

#### Add OAuth 2.0 authentication fields to your inline hook

1. When creating your inline hook, in the **Authentication** section, select **OAuth 2.0**.
1. In the **Client Authentication** field, select **Use private key** from the dropdown menu.
1. Add the Client ID value from your app integration.
1. Select the **Key** that you created previously from the dropdown menu.
1. Add the authorization server’s token URL, such as `https://${yourOktaDomain}/oauth2/default/v1/token`, and the custom scope that you created previously.
1. Click **Save**.

#### Add code to verify the request

The Okta inline hook sends a signed JWT to your external service as part of the hook call. Your service must decode this JWT to validate the token.

The following Node.js code uses the Okta JWT verifier package to validate the JWT. For further information on using this package, see [Okta JWT Verifier for Node.js](https://www.npmjs.com/package/@okta/jwt-verifier). Add the `@okta/jwt-verifier` package to your external service, and then add the following code to validate the token:

```JavaScript
const OktaJwtVerifier = require("@okta/jwt-verifier");

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://${yourOktaDomain}/oauth2/default' // required
});

const authenticationRequired = async (request, response, next) => {
  const authHeader = request.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);
  if (!match) {
    return response.status(401).send();
  }

  try {
    const accessToken = match[1];
    console.log(accessToken);
    if (!accessToken) {
      console.log("no access token");
      return request.status(401, 'Not authorized').send();
    }
    request.jwt = await oktaJwtVerifier.verifyAccessToken(accessToken,  'api://default');
    console.log('token is valid');
    next();
  } catch (err) {
    console.warn('token failed validation');
    return response.status(401).send(err.message);
  }
};

app.all('*', authenticationRequired); // Require authentication for all routes

```

<RegistrationHookXref/>

## Troubleshoot hook implementations

After setting up an external service and an event hook or inline hook, you may need to troubleshoot or review your configurations. Use the following options to confirm a successful implementation.

### Preview tab

An [Inline Hook Preview](https://help.okta.com/okta_help.htm?type=oie&id=ext-preview-inline-hooks) tab, accessible in the Admin Console, is available for the following inline hooks:

* Registration inline hook
* SAML inline hook
* Telephony inline hook
* Token inline hook

Before enabling the hook, the preview tab can run a sample Okta request call and receive the external service response. Review the request and response formats to make sure responses are accurate.

An [Event Hook Preview](https://help.okta.com/okta_help.htm?id=ext-event-hooks-preview) tab is also available for event hooks and displays the JSON payload for the selected Event Type. The preview tab can confirm a successful delivery of the request.

### Admin Console System Log

Use the Admin Console System Log to review logs of the event, inline hook triggers, or errors encountered during testing from the Okta org. See [System Log](https://help.okta.com/okta_help.htm?id=ext_Reports_SysLog).

### Glitch logs

For implementations using the Glitch projects, use Glitch's log feature to review and troubleshoot your external service code:

1. In the Glitch project's left-hand folder navigation pane, click **Tools** at the bottom of the pane.
2. Click **Logs**.

A log pane appears that displays all `console.log()` output. Some console output code is available in the sample code.

## Next steps

Review the following guides to implement a simple hook example and preview the hook functionality:

* [Event hook](/docs/guides/event-hook-implementation/)
* [Password import inline hook](/docs/guides/password-import-inline-hook/)
* [Registration inline hook](/docs/guides/registration-inline-hook/)
* [Token inline hook](/docs/guides/token-inline-hook/)
* [Telephony inline hook](/docs/guides/telephony-inline-hook/)

## See also

For background conceptual information on hooks, see [event hooks](/docs/concepts/event-hooks/) and [inline hooks](/docs/concepts/inline-hooks/).
