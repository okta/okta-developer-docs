---
title: Password import inline hook
excerpt: Code the external service for a password import inline hook
layout: Guides
---

This guide provides a working example of an Okta Password Import hook. It uses the web site [Glitch.com](https://glitch.com) to act as an external service and receive and respond to Password Import hook calls.

---

#### Learning outcomes

* Understand the Okta password import inline hook calls and responses.
* Implement a simple working example of a password import inline hook with a Glitch.com project.
* Preview and test a password import inline hook.

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* [Glitch.com](https://glitch.com) project or account

#### Sample code

[Okta Password Import Inline Hook Example](https://glitch.com/~okta-passwordimport-inlinehook)

---

## About password import inline hook implementation

In the following example, the external service code parses requests from Okta and responds to Okta with commands that indicate whether the end user's credentials are valid. If the credentials are valid, the password is imported into the Okta org.

At a high level, the following workflow occurs:

* User profiles are imported into an Okta org that use the password import inline hook.
* The password import inline hook triggers on the first sign-in request by a user.
* The external service evaluates the user credentials from the password import inline hook request against the data store.
* If the credentials are verified, the external service responds to Okta with a command to import the password and sign in the user.
* If the credentials aren't verified, the user isn't signed-in and the password isn't imported.

> **Tip:** For another in-depth look at a password import inline hook implementation, see [Migrate user Passwords with the Okta Password hook](https://developer.okta.com/blog/2020/09/18/password-hook-migration).

## Get submitted credentials

In your external service code, you need to get the values of `data.credential.username` and `data.credential.password` from the body of the password import inline hook request received from Okta. These properties contain the credentials submitted by the end user who is trying to sign in.

<HookCommonSetupNote/>

<HookBasicAuthValuesNote/>

<StackSelector snippet="request"/>

## Check credentials against user store

In this example, your external service code looks up the username in a prepopulated static array of usernames and passwords. It then checks if the supplied password matches the password that exists for that username in the array. This example is a simplification of the process of looking up the credentials in a real-world user store.

<StackSelector snippet="check-against-user-store" noSelector/>

## Send a response

The way to specify to Okta whether to accept the credentials as valid or not is by returning a `commands` object in the body of your HTTPS response, using a specified syntax within the object to indicate to Okta that the credentials should either be denied or accepted.

If you return an empty HTTPS response with an HTTP 204 "No content success" status code, Okta takes the default action, which is to reject the credentials.

Based on the results of the credential check, you return either a command telling Okta to accept the credentials, or an empty response, which results in Okta rejecting the credentials.

<StackSelector snippet="send-response" noSelector/>

>**Note:** Using an empty response to reject the credentials is based on the assumption that Okta is set to do that as the default action. In the request from Okta, the property `data.action.credential` specifies the default action. It's currently always set to `UNVERIFIED`, meaning that the default is to reject.

## Activate the password import hook on your Okta org

The password import inline hook must be set up and activated within your Admin Console.

To set up and activate the password import inline hook:

1. In the Admin Console, go to **Workflow** > **Inline Hooks**.
2. Click **Add Inline Hook** and select **Password Import** from the dropdown menu.
3. Add a name for the hook (in this example, "Password Import Hook").
4. Add your external service URL, including the endpoint. For example, use your Glitch project name with the endpoint: `https://your-glitch-projectname.glitch.me/passwordImport`.
5. <HookBasicAuthStep/> <HookOAuthNote/>
6. Click **Save**.

The password import inline hook is now set up with a status of "Active".

> **Note:** You can also set up an inline hook using an API. See [Inline Hooks Management API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/createInlineHook).

## Import test users

Upload some users into your Okta org using the [Password import inline hook API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/createPasswordImportInlineHook). These users provide data to test your inline hook.

The following example uses sample data from the data store in the `users.js` file of your project.

<StackSelector snippet="password-import-api" noSelector/>

## Test your hook

The external service example is now ready with code to receive and respond to an Okta call. The Okta org is now set up to call the external service when a password import inline hook is triggered.

### Test

To run a test of your password import inline hook, go to the Okta sign-in page for your Okta org.

* Start by signing in with one of the users from the data store, for example, "michelletest@example.com", and enter an incorrect password.
* Your result should be an "Unable to Sign On" error.
* Sign in again using the correct password.
* Your result should be access to the Okta org and the import of the user's password into Okta.
* Sign out and sign in again to ensure the hook is no longer called (by reviewing the Admin Console logs).

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

