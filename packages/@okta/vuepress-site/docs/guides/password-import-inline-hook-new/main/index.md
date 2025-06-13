---
title: Password import inline hook
excerpt: Code the external service for a password import inline hook
layout: Guides
---

This guide provides a working example of an Okta password import hook. It uses the utility [ngrok](https://ngrok.com/) to expose a local app to the internet, and to receive and respond to password import hook calls.

---

#### Learning outcomes

* Understand the Okta password import inline hook calls and responses.
* Implement a simple working example of a password import inline hook.
* Run and test a password import inline hook using ngrok.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup/)
* [ngrok](https://ngrok.com/)

#### Sample code

[???] (add sample code files here(?))

---

## About password import inline hook implementation

Use the password import inline hook to migrate users from another data store where you want the users to retain their current credentials.

This guide provides an end-to-end scenario that implements a password import inline hook. It includes example code for a simple local app, exposed to the internet using ngrok, that functions as an external service. This service responds to calls from a password import inline hook that's triggered when a user first signs into your app.

In the following example, the external service code parses requests from Okta and responds to Okta with commands that indicate whether the end user's credentials are valid. If the credentials are valid, the password is imported into the Okta org.

At a high level, the following workflow occurs:

* User profiles are imported into an Okta org that use the password import inline hook.
* The password import inline hook triggers on the first sign-in request by a user.
* The external service evaluates the user credentials from the password import inline hook request against the data store.
* If the credentials are verified, the external service responds to Okta with a command to import the password and sign in the user.
* If the credentials aren't verified, the user isn't signed-in and the password isn't imported.

> **Tip:** For another in-depth look at a password import inline hook implementation, see [Migrate user Passwords with the Okta Password hook](https://developer.okta.com/blog/2020/09/18/password-hook-migration).

## Install ngrok

Install and run [ngrok](https://ngrok.com/downloads/). See [Install ngrok](/docs/guides/event-hook-ngrok/nodejs/main/#install-ngrok) or their [documentation](https://ngrok.com/docs) for further information.

## Create a local app

To get you up-and-running quickly, follow the steps below to build a very basic Express Node.js application. This application simply responds to password import inline hook calls.

### Create a folder and initialize the project

<StackSelector snippet="sample-app" noSelector/>

### Add your server code

In your `sample-app` folder, create a `server.js` file and add the following framework code:

```javascript
// server.js
// where your node app starts

require('dotenv').config();
const express = require("express");
const app = express();
const users = require('./users');
const { body, validationResult } = require('express-validator');
app.use(express.json());

// listen for requests :)
const listener = app.listen(8082, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
```

Add the following code to use Basic Authentication to validate the incoming call from Okta against the values in the `.env` file. See [HTTP header: Basic Authentication](/docs/guides/common-hook-set-up-steps/nodejs/main/#http-header-basic-authentication).

```javascript
const basicAuth = require('express-basic-auth');

/* HTTP basic auth middleware for Express
//
// Refer to https://www.npmjs.com/package/express-basic-auth#custom-authorization for more information
//
// Ensure you securely store your credentials for your external service */

app.use(basicAuth( { authorizer: myAuthorizer } ))

function myAuthorizer(username, password) {

    const userMatches = basicAuth.safeCompare(username, process.env.BASIC_AUTH_USER)
    const passwordMatches = basicAuth.safeCompare(password, process.env.BASIC_AUTH_PASSWORD)

    return userMatches & passwordMatches
}
```

### Get submitted credentials

In your external service code, you need to get the values of `data.credential.username` and `data.credential.password` from the body of the password import inline hook request received from Okta. These properties contain the credentials submitted by the end user who is trying to sign in.

<StackSelector snippet="request" noSelector/>

### Check credentials against user store

In this example, your sample app code looks up the username in a prepopulated static array of usernames and passwords. It then checks if the supplied password matches the password that exists for that username in the array. This example is a simplification of the process of looking up the credentials in a real-world user store.

<StackSelector snippet="check-against-user-store" noSelector/>

### Send a response

The way to specify to Okta whether to accept the credentials as valid or not is by returning a `commands` object in the body of your HTTPS response, using a specified syntax within the object to indicate to Okta that the credentials should either be denied or accepted.

If you return an empty HTTPS response with an HTTP 204 "No content success" status code, Okta takes the default action, which is to reject the credentials.

Based on the results of the credential check, you return either a command telling Okta to accept the credentials, or an empty response, which results in Okta rejecting the credentials.

The following code previously added in the `server.js` file details the response to Okta. For more information on the `commands` object, see [Create a password import inline hook](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/createPasswordImportInlineHook!c=200&path=commands&t=response).

<StackSelector snippet="send-response" noSelector/>

>**Note:** Using an empty response to reject the credentials is based on the assumption that Okta is set to do that as the default action. In the request from Okta, the property `data.action.credential` specifies the default action. It's currently always set to `UNVERIFIED`, meaning that the default is to reject.

## Run ngrok and your local app

Run the ngrok utility in your `sample-app` folder to expose your local app to the internet and receive Okta hook calls. 

```bash
>ngrok http 8082
```

Make note of the forwarding URL in the ngrok terminal to use when creating your password import inline hook in the following procedure. See [Run ngrok](/docs/guides/event-hook-ngrok/nodejs/main/#run-ngrok).

Start your sample app's server and make sure it's running:

```bash
>node server.js
```

The message `Your app is listening on port 8082" in you terminal console.

## Activate the password import hook on your Okta org

The password import inline hook must be set up and activated within your Admin Console.

To set up and activate the password import inline hook:

1. In the Admin Console, go to **Workflow** > **Inline Hooks**.
2. Click **Add Inline Hook** and select **Password Import** from the dropdown menu.
3. Add a name for the hook (in this example, "Password Import Hook").
4. Add your external service URL, including the endpoint. For example, use the ngrok forwarding url with the endpoint: `https://92c5-165-85-229-169.ngrok-free.app/passwordImport`.
5. <HookBasicAuthStep/> <HookOAuthNote/>
6. Click **Save**.

The password import inline hook is now set up with a status of "Active".

> **Note:** You can also set up an inline hook using an API. See [Inline Hooks Management API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/createInlineHook).

## Import test users

Upload some users into your Okta org using the [Create a user API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#create-user-with-password-import-inline-hook). These users provide data to test your inline hook.

The following example uses sample data from the data store in the `users.js` file of your project.

<StackSelector snippet="password-import-api" noSelector/>

## Test your hook

The external service example is now ready with code to receive and respond to an Okta call. The Okta org is now set up to call the external service when a password import inline hook is triggered. Ensure that both your ngrok session and local sample app are running.

### Test

To run a test of your password import inline hook, go to the Okta sign-in page for your Okta org.

* Start by signing in with one of the users from the data store, for example, "michelletest@example.com", and enter an incorrect password.
* Your result should be an "Unable to Sign On" error on your org. The terminal prints: `Not verified. Password not imported.`
* Sign in again using the correct password.
* Your result is access to the Okta org dashboard and the import of the user's password into Okta. The terminal prints: `Password verified! Password imported.`
* Sign out and sign in again to ensure the hook is no longer called (by reviewing the Admin Console logs).
* Review the ngrok interface (`http://localhost:4040`) to review the Okta hook calls and your responses to Okta. See [Review ngrok inspection interface](/docs/guides/event-hook-ngrok/nodejs/main/#review-ngrok-inspection-interface)

> **Note:** Review the [troubleshooting](/docs/guides/common-hook-set-up-steps/nodejs/main/#troubleshoot-hook-implementations) section for information if you encounter any setup or configuration difficulties.

## Next steps

Review the following guides to implement other inline or event hook examples:

* [Event hook](/docs/guides/event-hook-implementation/)
* [Registration inline hook](/docs/guides/registration-inline-hook/)
* [Token inline hook](/docs/guides/token-inline-hook/)
* [SAML assertion inline hook](/docs/guides/saml-inline-hook)
* [Telephony inline hook](/docs/guides/telephony-inline-hook)

## See also

For further reference data on the password import inline hook, see [Password import inline hook](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/createPasswordImportInlineHook).

