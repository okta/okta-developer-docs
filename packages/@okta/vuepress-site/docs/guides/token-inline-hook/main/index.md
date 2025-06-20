---
title: Token inline hook
excerpt: Learn how to easily implement a token inline hook
layout: Guides
---

This guide provides an example of an Okta token inline hook. It uses the utility [ngrok](https://ngrok.com/) to expose a local app to the internet, and to receive and respond to token inline hook calls.

---

#### Learning outcomes

* Understand the token inline hook calls and responses.
* Implement a simple example of a token inline hook.
* Run and test a token inline hook.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup/)
* [ngrok](https://ngrok.com/)
* A Node.js Express framework sample app. This guide works with the app in the following Sample code section.

#### Sample code

* [Express Sample Applications for Okta](https://github.com/okta/samples-nodejs-express-4)

---

## About token inline hook implementation

The token inline hook can be used to customize the Authorization Code flow that occurs between an app and the Okta org used for authentication.

This guide provides example code for an external service to respond to calls from a token inline hook. It provides an end-to-end scenario using a local web app, an Okta org, and an external service. Ngrok exposes the external service app, which is also hosted locally, to the internet and receives the Okta token hook calls.

### The Scenario

In the following token inline hook scenario, the external service code parses a request from Okta, evaluates the username against a data store, and responds to Okta with a command to add a claim to the token. If the user isn't part of the data store, no action is taken. The token is returned to the local app for authentication.

At a high-level, the following workflow occurs:

* A user signs in to an Okta-hosted Login sample app.
* The Okta org authenticates a user and mints an authentication token.
* The Okta token inline hook triggers and sends a request to an external service.
* The external service evaluates the request, and if the user is a patient, adds a patient ID claim to the token.
* The authentication token is directed back to the Okta-hosted Login app where the user is signed in.

> **Tip:** For another in-depth look at a token inline hook implementation, see the following developer experience blog example by Micah Silverman, [Use Okta Token Hooks to Supercharge OpenID Connect](https://developer.okta.com/blog/2019/12/23/extend-oidc-okta-token-hooks).

## Set up the sample Express app

The sample Node.js Express app is designed to demonstrate the [Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/), and includes an Okta-hosted Login sample used in this token inline hook guide. Access the code from the following GitHub repository: [Express Sample Applications for Okta](https://github.com/okta/samples-nodejs-express-4). Use the following instructions to set up your sample Express app or follow the instructions on the repository.

### Install the app locally

1. Clone the repo locally: `git clone https://github.com/okta/samples-nodejs-express-4.git`

1. Change to the app folder: `cd samples-nodejs-express-4/`

1. Install the dependencies: `npm install`

### Create an Okta app integration

An Okta app integration represents your app in your Okta org. The integration configures how your app integrates with the Okta services including which users and groups have access, authentication policies, token refresh requirements, redirect URLs, and more. The integration includes configuration information required by the app to access Okta.

1. [Sign in to your Okta organization](https://developer.okta.com/login) with your administrator account.
1. Click **Admin** in the upper-right corner of the page.
1. Open the Applications configuration pane by selecting **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select a **Sign-in method** of **OIDC - OpenID Connect**.
1. Select an **Application type** of **Web Application**, then click **Next**.
1. Enter an **App integration name**.
1. Ensure that the **Authorization Code** grant type is selected.
1. Enter the **Sign-in redirect URIs** for local development. For this sample, use the default value `http://localhost:8080/authorization-code/callback`.
1. Enter the **Sign-out redirect URIs** for local development. For this sample, use the default value `http://localhost:8080`.
1. In the **Assignments** section, define the type of **Controlled access** for your app. Select **Allow everyone in your organization to access**. See [Assign app integrations](https://help.okta.com/okta_help.htm?type=oie&id=ext-lcm-user-app-assign).
1. Clear the **Enable immediate access with Federation Broker Mode** checkbox.
1. Click **Save** to create the app integration. The **General** tab for your integration opens after it's saved. Keep this pane open as you need to copy the **Client ID**, **Client Secret**, and your org domain name when configuring your app.

### Add the integration credentials to your local app

1. Open the Express sample app in your editor of choice.
1. In the root folder of your local app (`samples-nodejs-express-4`), add an environment variable file called `testenv`. There's no extension to this file.
1. Add the following variables and values to the `testenv` file. The `CLIENT_ID` and `CLIENT_SECRET` values are available on the **General** tab of your app integration.

    * **ISSUER**=`https://{yourOktaDomain.com}/oauth2/default`
    * **CLIENT_ID**=`{yourClientId}`
    * **CLIENT_SECRET**:`{yourClientSecret}`

Your `testenv`file appears as follows:

```txt
ISSUER=https://yourOktaDomain.com/oauth2/default
CLIENT_ID=0oaens...4RMAYl3I5d7
CLIENT_SECRET=BrPT0k1bCPgdQpiFU7LX...O6ANpoxm-MvwsY29_G-uzxLwGRbL3yhHFEaK9kn_IX
```

### Run your local app

1. To start your local application web server: `npm run okta-hosted-login-server`

1. Go to the page `http://localhost:8080` in your browser. If you see a home page that prompts you to sign in, the app is working. Click **Log in** to redirect to the Okta hosted sign-in page and to authenticate a user.

## Create the external service code

You can now create the external service code that resides on your local machine but will be exposed to the internet using ngrok. The third-party site receives and responds to the token inline hook call from Okta. The responses to the token inline hook call can modify or remove an existing custom claim or an OIDC standard profile claim. You can also update how long an access token or an ID token is valid. In this example, a new claim is added to the identity token. For further information on the token inline hook commands object, see the [Token inline hook reference](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/createTokenInlineHook).

### Create a local external service app

To get you up-and-running quickly, follow the steps below to build a very basic Express Node.js app to server as your external service. This app simply responds to token import inline hook calls.

<StackSelector snippet="sample-app" noSelector/>

### Add your server code

In your `sample-app` folder, create a `server.js` file and add the following framework code:

```javascript
// server.js
// where your node app starts

require('dotenv').config();
const express = require("express");
const app = express();
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

### Create a patient store

In this scenario, a pre-populated static array of patient names and patient IDs (`patients`) is used to simulate a real-world data store. The username included with the Okta request is checked against this array. If the username in the request matches a value in the `patients` array, the associated patient ID is stored as a variable, `patientID`.

> **Note:** Modify this data store to make sure it contains one or more usernames that are assigned to your app in your Okta org.

In your `server.js` file, add the following array:

```javascript
/*
*
* Token Inline Hook code
*
*/

// Example Patients Data Store
// Edit this patient store to include a user in your Okta org.

const patients = [
  {
    username: 'jessie.smith@example.com',
    ExternalServicePatientID: '1235',
  },
  {
    username: 'kim.sato@example.com',
     ExternalServicePatientID: '6789',
  },
    {username: 'rajiv.tal@example.com',
     ExternalServicePatientID: '4235',
  },

  ]
```

### Receive and respond to the Okta hook

Add the following code to your `server.js` file to receive and respond to the Okta hook.

The variable, `patientID`, can now be returned to Okta as an additional token claim using the `commands` object. For further information on the token `commands` object, see the [token inline hook](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/createTokenInlineHook!c=200&path=commands&t=response) reference documentation.

<StackSelector snippet="send-response" noSelector/>

## Extend the sample Express app

The following code extends the local sample Node.js Express app to display the results of the token inline hook claim addition. This step is optional. The token inline hook is functional. The implementation results appear in the external service logs and in the System Logs on your Okta org. But this extension is a nice way to display the added claim.

To extend the local sample Node.js Express app, you need to update the `sample-web-server.js` file.

### Update the web server page

1. Go to your project folder `samples-nodejs-express-4` and continue to the `common` folder (`samples-nodejs-express-4/common`).
2. In an editor, open the `sample-web-server.js` page.
3. Locate the routing function `app.get('/profile'` and modify the function as in the code below. The inline token hook code extension appears after the `const` declarations and before the `res.render` function.

This extension renders the [ID token](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#id-token), and if it contains the claim added by the token inline hook, adds this claim to the attributes array. This array displays claims on the user's My Profile page.

<StackSelector snippet="extend-application" noSelector/>

<!-- ### Parse the token inline hook request

 The external service in this scenario requires code to handle the token inline hook request from the Okta org. Use the [Okta Token Inline Hook](https://glitch.com/edit/#!/okta-inlinehook-tokenhook) Glitch example to either build or copy the code (re-mix on Glitch) that parses the token inline hook call.

> **Note**: Make sure to have the required default code and packages in your project. See [Common Hook Set-up Steps](/docs/guides/common-hook-set-up-steps/).

From the token inline hook request, the following code retrieves the value of the username from the `data.identity` object.

<StackSelector snippet="request" noSelector/>

### Check against the data store

In this scenario, a pre-populated static array of patient names and patient IDs (`patients`) is used to simulate a real-world data store. The username included with the Okta request is checked against this array. If the username in the request matches a value in the `patients` array, the associated patient ID is stored as a variable, `patientID`.

> **Note:** Modify this data store to make sure it contains one or more usernames that are assigned to your app in your Okta org. See [Customize the external service for your org](#customize-the-external-service-for-your-org).

<StackSelector snippet="check-patients" noSelector/>

### Send a response to Okta

The variable, `patientID`, can now be returned to Okta as an additional token claim using the `commands` object. For further information on the token `commands` object, see the [token inline hook](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/createTokenInlineHook!c=200&path=commands&t=response) reference documentation.

<StackSelector snippet="send-response" noSelector/>

### Customize the external service for your org

1. In the Glitch.com `server.js` file, modify the project code's data store with a user that belongs to your org.

    ```JavaScript
    {
        username: 'your_test_user@example.com',
        ExternalServicePatientID: '1235',
    }
    ```

1. Click the `.env` file in the left-hand panel, to update the external app's environment variables to the following values:

    * **USER**=`admin`
    * **PASSWORD**=`supersecret`

These are the HTTP Basic Authentication credentials that validate the inline token request from Okta.-->

## Run ngrok and your local app

Run the ngrok utility in your `sample-app` folder to expose your local app to the internet and receive Okta hook calls.

```bash
ngrok http 8082
```

Make note of the forwarding URL in the ngrok terminal to use when creating your password import inline hook in the following procedure. See [Run ngrok](/docs/guides/event-hook-ngrok/nodejs/main/#run-ngrok).

Start your sample app's server and make sure it's running:

```bash
node server.js
```

The message "Your app is listening on port 8082" appears in your terminal console.

## Activate and enable the token inline hook

The token inline hook must be activated and enabled within your Admin Console.

* Activating the token inline hook registers the hook with the Okta org and associates it with your external service.
* Enabling the token inline hook associates the hook with your Okta custom authorization server, which authenticates the Okta-hosted Login sample app.

<ApiAmProdWarning />

### Activate the token inline hook

1. Go to the **Workflow** > **Inline Hooks** page.

2. Click **Add Inline Hook** and select **Token** from the dropdown menu.

3. Add a name for the hook (in this example, "Patient token hook").

4. Add your external service URL, including the endpoint. For example, use your Glitch project name with the endpoint: `https://your-glitch-projectname.glitch.me/tokenHook`.

5. <HookBasicAuthStep/> <HookOAuthNote/>

6. Click **Save**.

The token inline hook is now set up with a status of active.

### Enable the token inline hook

1. Go to **Security** > **API** > **Authorization Servers**.

2. Select a custom authorization server from the list (usually **default**).

    >**Note:** You may need to add a default API policy and rule if one is not available. See [Create access policies](https://help.okta.com/okta_help.htm?type=oie&id=create-access-policies).

3. Select the **Access Policies** tab. Go to the rule table and click the edit icon next to the policy rule that will use the inline hook. Usually, edit the **Default Policy Rule** of the **Default Policy**.

4. Select the token inline hook you activated ("Patient token hook") from the **Use this inline hook** dropdown menu.

5. Click **Update rule**.

The token inline hook is now ready for triggering when the default policy rule is invoked from an authentication request.

## Preview and test the token inline hook

The token inline hook is ready for preview and testing. You now have the following apps configured:

* The Okta-Hosted Login sample app (`samples-nodejs-express-4`) is ready to authenticate users from your Okta org. Start the sample app: `npm run okta-hosted-login-server`.
* The external service is ready with code to receive and respond to an Okta token inline hook call through the ngrok utility.
* The Okta org is set up to call the external service when an app sign in triggers the token inline hook.

>**Note:** Make sure that you have users assigned to your app and at least one user is part of the [Patients data store](/docs/guides/token-inline-hook/#check-against-the-data-store) in your external service app.

### Preview the token inline hook

1. In the Admin Console, go to **Workflow** > **Inline Hooks**.

1. Click the token inline hook name (in this example, "Patient token hook").

1. Click **Preview**.

1. From the **Configure Inline Hook request** block, complete the following fields:

    * **Select a user**: A user in your org associated with your app.
    * **Select an application**: Your OIDC sample app name.
    * **Select an authorization server**: Your authorization server name. In this example, use `default`.
    * **Select a grant type**: Your app's grant type. In this example, use `Authorization Code`.
    * **Select scopes**: The granted scopes. This example didn't require a scope. Add any scope to move to the next step, for example, `okta.myAccount.read`.

    >**Note:** Based on your grant type selection, preview fields may vary.

1. From the **Preview example Inline Hook request** block, click **Generate Request**. You should see the user's request information in JSON format that is sent to the external service.

1. You can also click **Edit** to modify this call for development or testing purposes. For this example, click **Edit** to add an `identity` object required by the external service code. Place the following JSON code before the `access` object:

    ```json
    "identity": {
        "claims": {
            "preferred_username": "test.user@example.com"}
    },
    ```

1. From the **View service's response** block, click **View Response**. A response appears from your external service in JSON format, which either adds a claim to the token or doesn't based on your external service's logic and the email value you sent as part of the `preferred_username` parameter.

### Test your hook

1. Go to your sample app project folder (`samples-nodejs-express-4`).

1. Start your Okta-Hosted-Login server (`npm run okta-hosted-login-server`).

1. Go to your external service app and start the server (`node server.js`)

1. Ensure that ngrok is running on the same port as your external service service, and that your token inline hook was configured with the correcct forwarding URL.

1. Go to your sample app (`http://localhost:8080`).

1. Sign in with an Okta user who isn't in the patients' data store.

    * The user signs in as normal. Only the username displays in the external service console.
    * Click `My Profile` in the left-hand navigation pane. The user info claims are included in the table.

1. Sign out of the sample app, and then sign in with an Okta user who is in the patients' data store.

    * The user signs in as normal, but now has a patient ID displayed in the external service terminal console. A successful implementation record of the token inline hook is also available for review in your Okta org System Log (**Reports** > **System Log**).
    * If you extended the sample app, click `My Profile` in the left-hand navigation pane. The patient ID is added as part of the claims table.

> **Note:** Review the [Token inline hooks troubleshooting](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/createTokenInlineHook) content or the [Troubleshooting hook implementations](/docs/guides/common-hook-set-up-steps/nodejs/main/#troubleshoot-hook-implementations) section for information on any difficulties.

## Next steps

Review the following guides to implement other inline or event hook examples:

* [Event hook](/docs/guides/event-hook-implementation/)
* [Registration inline hook](/docs/guides/registration-inline-hook/)
* [Password import inline hook](/docs/guides/password-import-inline-hook/)
* [SAML assertion inline hook](/docs/guides/saml-inline-hook/)
* [Telephony inline hook](/docs/guides/telephony-inline-hook/)

## See also

For further reference data on the token inline hook, see the [token inline hook](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/createTokenInlineHook) reference.
