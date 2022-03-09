---
title: Token Inline Hook
excerpt: Learn how to easily implement a Token Inline hook
layout: Guides
---

This guide provides a working example of an Okta Token Inline Hook. It uses the website [Glitch.com](https://glitch.com) to act as an external service to receive and respond to Token Inline Hook calls.

---

**Learning outcomes**

* Understand the Okta Token Inline Hook calls and responses.
* Implement a simple working example of a Token Inline Hook with a Glitch.com external service.
* Test the Token Inline Hook.

**What you need**

* [Glitch.com](https://glitch.com) project or account
* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* A Node.js Express framework sample application. This guide works with the sample application in the Sample code section below.

**Sample code**

* [Okta Token Inline Hook Example](https://glitch.com/edit/#!/okta-inlinehook-tokenhook)
* [Express Sample Applications for Okta](https://github.com/okta/samples-nodejs-express-4)

---

The Token Inline Hook can be used to customize the Authorization Code flow that occurs between an application and the Okta org used for authentication.

This guide provides example code for an external service to respond to calls from a Token Inline Hook, and provides an end-to-end scenario using a local application, an Okta org, and the external service.

### The Scenario

In the following Token Inline Hook scenario, the external service code parses a request from Okta, evaluates the user name against a simple patient data store, and, if the user is a patient, responds to Okta with a command to add a patient ID claim to the token. If the user is not part of the data store, no action is taken. The token is returned to the local application for authentication.

At a high-level, the following workflow occurs:

* A user logs into an Okta-Hosted Login sample application.
* The Okta org authenticates the user and mints an authentication token.
* The Okta Token Inline Hook triggers and sends a request to an external service.
* The external service evaluates the request, and if the user is a patient, adds a patient ID claim to the token.
* The authentication token is directed back to the Okta-Hosted Login application where the user is signed in.

> **Tip:** For another in-depth look at a Token Inline Hook implementation, see the following Developer Experience blog example by Micah Silverman, [Use Okta Token Hooks to Supercharge OpenID Connect](https://developer.okta.com/blog/2019/12/23/extend-oidc-okta-token-hooks).

## Set up the sample Express application

The sample Node.js Express application is designed to demonstrate the [Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/), and includes an Okta-Hosted Login sample used in this Token Inline Hook guide. Access the code from the following Github repository:

* [Express Sample Applications for Okta](https://github.com/okta/samples-nodejs-express-4)

Follow the [README.md](https://github.com/okta/samples-nodejs-express-4/tree/master/okta-hosted-login) instructions to install and run the Okta-Hosted Login sample application with your Okta org. Make sure to have this application running before proceeding with the Token Inline Hook setup.

## Parse the Token Inline Hook request

The external service in this scenario requires code to handle the Token Inline Hook request from the Okta org. Use the [Okta Token Inline Hook](https://glitch.com/edit/#!/okta-inlinehook-tokenhook) Glitch example to either build or copy the code (re-mix on Glitch) that parses the Token Inline Hook call.

> **Note**: Make sure to have the required default code and packages in your project. See [Common Hook Set-up Steps](/docs/guides/common-hook-set-up-steps/).

From the Token Inline Hook request, the following code retrieves the value of the user name from the `data.identity` object.

<StackSelector snippet="request" noSelector/>

## Check against the data store

In this scenario, a pre-populated static array of patient names and patient IDs (`patients`) is used to simulate a real-world data store. The user name included with the Okta request is checked against this array. If the user name in the request matches a value in the `patients` array, the associated patient ID is stored as a variable, `patientID`.

> **Note:** Modify this data store to make sure it contains one or more user names that are assigned to your application in your Okta org.

<StackSelector snippet="check-patients" noSelector/>

## Send a response to Okta

The variable, `patientID`, can now be returned to Okta as an additional token claim using the `commands` object. For further information on the token `commands` object, see the [Token Inline Hook](/docs/reference/token-hook/#commands) reference documentation.

<StackSelector snippet="send-response" noSelector/>

## Activate and enable the Token Inline Hook

The Token Inline Hook must be activated and enabled within your Okta Admin Console.

* Activating the Token Inline Hook registers the hook with the Okta org and associates it with your external service.
* Enabling the Token Inline Hook associates the hook with your Okta custom authorization server, which authenticates the Okta-Hosted Login sample application.

<ApiAmProdWarning />

### Activate the Token Inline Hook

1. Navigate to the **Workflow** > **Inline Hooks** page.

2. Click **Add Inline Hook** and select **Token** from the drop-down menu.

3. Add a name for the hook (in this example, "Patient Token Hook").

4. Add your external service URL, including the endpoint. For example, use your Glitch project name with the endpoint: `https://your-glitch-projectname.glitch.me/tokenHook`.

5. Include **Authentication field** and **Authentication secret** values. In this example:

    * **Authentication field** = `authorization`
    * **Authentication secret** = `Basic YWRtaW46c3VwZXJzZWNyZXQ=`

6. Click **Save**.

The Token Inline Hook is now set up with a status of active.

### Enable the Token Inline Hook

1. Navigate to **Security** > **API** > **Authorization Servers**.

2. Select a Custom Authorization Server from the list (usually **default**).

3. Select the **Access Policies** tab. Navigate to the Rule table and click the Edit icon next to the policy rule that will use the Inline hook. In most cases, edit the **Default Policy Rule** of the **Default Policy**.

4. From the **Use this inline hook** drop-down menu, select the Token Inline Hook you activated ("Patient Token Hook").

5. Click **Update Rule**.

The Token Inline Hook is now ready for triggering when the default policy rule is invoked from an authentication request.

## Extend the sample Express application

The following code extends the local sample Node.js Express application to display the results of the Token Inline Hook claim addition. This step is optional. The Token Inline Hook is functional and the results of the implementation are shown in the external service logs, as well as in the system logs on your Okta org. But this extension is nice to have!

To extend the local sample Node.js Express application, you need to update the `sample-web-server.js` file.

### Update the web server page

1. Navigate to your project folder `samples-nodejs-express-4` and continue to the `common` folder (`samples-nodejs-express-4/common`).
2. In an editor, open the `sample-web-server.js` page.
3. Locate the routing function `app.get('/profile'` and modify the function as in the code below. The Inline Token Hook code extension appears after the `const` declarations and before the `res.render` function.

This extension renders the [ID token](/docs/reference/api/oidc/#id-token), and if it contains the claim added by the Token Inline Hook, adds this claim to the attributes array. This array displays claims on the user's My Profile page.

<StackSelector snippet="extend-application" noSelector/>

## Test the Token Inline Hook

The Token Inline Hook is now ready for testing. You now have the following applications configured:

* The Okta-Hosted-Login sample application (`samples-nodejs-express-4`) is ready to authenticate users from your Okta org.
*  The external service (Glitch.com project) is ready with code to receive and respond to an Okta Token Inline Hook call.
*  The Okta org is set up to call the external service when a Token Inline Hook is triggered by a user sign-in from the Okta-Hosted-Login sample application, and ready to receive a response.

>**Note:** Make sure you have users assigned to your application and at least one user is part of the [Patients data store](/docs/guides/token-inline-hook/#check-against-the-data-store/) in your Glitch application.

### Test your hook

1. Navigate to your sample application project folder (`samples-nodejs-express-4`).

2. Start your Okta-Hosted-Login server (`npm run okta-hosted-login-server`).

3. Navigate to your sample application (`http://localhost:8080`).

4. Navigate to your Glitch.com project and open the Console Logs window (**Tools** > **Logs**).

5. Return to your sample application and sign in with an Okta user who is NOT in the Patients data store.

    * The user should sign in as normal; only the user name should appear in the Glitch log window.
    * If you extended the sample application, click `My Profile` in the left-hand navigation pane. Only the the user info claims are included in the table.

6. Sign out of the sample application, and now sign in with an Okta user who IS in the Patients data store.

    * The user should sign in as normal; however, this user should have a patient ID displayed in the Glitch console output, as well as a successful implementation record of the Token Inline Hook, available for review in your Okta org System Log (**Reports** > **System Log**).
    * If you extended the sample application, click `My Profile` in the left-hand navigation pane. The patient ID is added as part of the Claims table.

> **Note:** Review the [Token Inline Hooks troubleshooting](/docs/reference/token-hook/#troubleshooting) content or the [Troubleshooting hook implementations](/docs/guides/common-hook-set-up-steps/nodejs/main/#troubleshoot-hook-implementations) section for information on any difficulties.

## Next steps

Review the following guides to implement other Inline or Event Hook examples:

* [Event Hook](/docs/guides/event-hook-implementation/)
* [Registration Inline Hook](/docs/guides/registration-inline-hook/)
* [Password Import Inline Hook](/docs/guides/password-import-inline-hook/)

## See also

For further reference data on the Token Inline Hook, see [Token Inline Hook](/docs/reference/token-hook/).
