---
title: Secure your inline and event hooks
excerpt: A guide that explains the security options for Okta inline and event hooks
layout: Guides
---

This guide explains the authentication options when you implement an Okta event or inline hook.

---

#### Learning outcomes

* Understand how to implement a secure Okta event hook with Basic Authentication.
* Understand how to implement a secure Okta inline hook with Basic Authentication or OAuth 2.0 authentication.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup/)
* An event or inline hook project with external service code. For example, see [Event hooks with ngrok](/docs/guides/event-hook-ngrok/) or [Token inline hook](/docs/guides/token-inline-hook/).

---

## About hook authentication methods

Okta event and inline hooks are calls that Okta makes to an external service. To keep those calls secure, Okta supports Basic Authentication for event hooks, and both Basic Authentication and OAuth 2.0 for inline hooks. OAuth 2.0 can use either the client secret or private key method.

When setting up Okta hooks, choose an authentication method and add code to verify incoming requests from your external service. See the following sections on how to implement each option.

## HTTP header: Basic Authentication

The inline hook guides use [HTTP Basic Authentication](/books/api-security/authn/api-authentication-options/#http-basic-authentication) to authenticate the Okta inline hook API calls received by the sample external service. In your Okta org, you must use Base64-encoding on the header authorization value: `username:password`. Then, add the encoded credentials as the **Authentication secret** when you create the inline hook. Ensure that you add the scheme `Basic ` (including a space) as a prefix to the **Authentication secret** value.

For example, the credential pair used in the inline hook examples is `admin:supersecret`, which when Base64-encoded is `YWRtaW46c3VwZXJzZWNyZXQ=`. Adding the scheme to this value creates the inline hook **Authentication secret** value: `Basic YWRtaW46c3VwZXJzZWNyZXQ=`.

To add HTTP Basic Authentication to your external service:

1. Include the `npm` package dependency `express-basic-auth` in the `package.json` file.
1. Add the following two environment variables to an `.env` file:
    * **Variable Name**: `USER` and **Value**: `admin`
    * **Variable Name**: `PASSWORD` and **Value**: `supersecret`
1. Add the following code snippet in your project.

<StackSelector snippet="auth" noSelector/>

>**Note:** Ensure that you securely store your credentials for your external service.

## OAuth 2.0: Client Secret

The OAuth 2.0 Client Secret method sends a signed JWT to your external service. To use this method, you make the following configurations to your org and add code to decode the JWT from the inline hook call:

* Create an app integration.
* Add a custom scope.
* Add OAuth 2.0 authentication fields to your inline hook.
* Verify the JWT with code in your external service.

### Create an app integration

Before you can implement authorization, you need to register your app in Okta by creating an app integration from the Admin Console.

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **API Services** as the Sign-in method.
1. Click **Next**.
1. Specify the app integration name, then click **Save**.
1. From the **General** tab of your app integration, note your generated **Client ID** and **Client secret**.

These values are used when configuring your inline hook authentication.

### Add a custom scope

<StackSnippet snippet="scope"/>

### Add OAuth 2.0 authentication fields to your inline hook

When creating your inline hook, in the Authentication section, select **OAuth 2.0**.

1. In the **Client Authentication** field, select **Use client secret** from the dropdown menu.
1. Add the **Client ID** and **Client Secret** values from your app integration.
1. Add the authorization server's token URL, such as `https://{yourOktaDomain}/oauth2/default/v1/token`, and the custom scope that you created previously.
1. Click **Save**.

### Add code to verify the JWT

The Okta inline hook sends a signed JWT to your external service as part of the hook call. Your service must decode this JWT to validate the token.

The following Node.js code uses the Okta JWT verifier package to validate the JWT. For further information on using this package, see [Okta JWT Verifier for Node.js](https://www.npmjs.com/package/@okta/jwt-verifier). Add the `@okta/jwt-verifier` package to your external service, and then add the following code to validate the token:

```JavaScript
const OktaJwtVerifier = require("@okta/jwt-verifier");

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://{yourOktaDomain}/oauth2/default' // required
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

## OAuth 2.0: Private Key

The OAuth 2.0 private key method sends a signed JWT to your external service. To use this method, you make the following configurations to your org and add code to decode the JWT from the inline hook call:

* Create a key
* Create an app integration
* Add a custom scope
* Add OAuth 2.0 authentication fields to your inline hook
* Add code to your external service to verify the JWT

### Create a key

1. In the Admin Console, go to **Workflow** > **Key Management**.
1. Click **Create new key**, and add a unique name for the key. You reference this name when adding your inline hook.
1. Click **Create key**. The key is added to the table with a creation date and status.
1. In the table, click your key name.
1. Click **Copy public key**. You need this public key in the next step.

> **Note:** You can also create a key with the [Key Management API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/HookKey/#tag/HookKey).

### Create an app integration

Before you can implement authorization, you need to register your app in Okta by creating an app integration from the Admin Console.

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **API Services** as the Sign-in method.
1. Click **Next**.
1. Specify the app integration name, then click **Save**.
1. From the **General** tab of your app integration, click **Edit**.
1. In the **Client authentication** field, select **Public key / Private key**.
1. In the **Public Keys** section, click **Add key**.
1. Paste the public key that you created in the previous procedure, and click **Done**.
1. Click **Save** and copy the generated Client ID value.

### Add a custom scope

<StackSnippet snippet="scope"/>

### Add OAuth 2.0 authentication fields to your inline hook

1. When creating your inline hook, in the **Authentication** section, select **OAuth 2.0**.
1. In the **Client Authentication** field, select **Use private key** from the dropdown menu.
1. Add the Client ID value from your app integration.
1. Select the **Key** that you created previously from the dropdown menu.
1. Add the authorization server's token URL, such as `https://{yourOktaDomain}/oauth2/default/v1/token`, and the custom scope that you created previously.
1. Click **Save**.

### Add code to verify the request

The Okta inline hook sends a signed JWT to your external service as part of the hook call. Your service must decode this JWT to validate the token.

The following Node.js code uses the Okta JWT verifier package to validate the JWT. For further information on using this package, see [Okta JWT Verifier for Node.js](https://www.npmjs.com/package/@okta/jwt-verifier). Add the `@okta/jwt-verifier` package to your external service, and then add the following code to validate the token:

```JavaScript
const OktaJwtVerifier = require("@okta/jwt-verifier");

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://{yourOktaDomain}/oauth2/default' // required
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

## Next steps

Review the following guides to implement a simple hook example and preview the hook functionality:

* [Event hook](/docs/guides/event-hook-implementation/)
* [Password import inline hook](/docs/guides/password-import-inline-hook/)
* [Registration inline hook](/docs/guides/registration-inline-hook/)
* [Token inline hook](/docs/guides/token-inline-hook/)
* [Telephony inline hook](/docs/guides/telephony-inline-hook/)

## See also

For background conceptual information on hooks, see [event hooks](/docs/concepts/event-hooks/) and [inline hooks](/docs/concepts/inline-hooks/).
