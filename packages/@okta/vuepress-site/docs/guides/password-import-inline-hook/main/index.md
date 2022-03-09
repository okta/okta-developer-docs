---
title: Password Import Inline Hook
excerpt: Code the external service for a Password Import Inline Hook
layout: Guides
---

This guide provides a working example of an Okta Password Import Hook. It uses the web site [Glitch.com](https://glitch.com) to act as an external service and receive and respond to Password Import Hook calls.

---

**Learning outcomes**

* Understand the Okta Password Import Inline Hook calls and responses.
* Implement a simple working example of a Password Import Inline Hook with a Glitch.com project.
* Preview and test a Password Import Inline Hook.

**What you need**

* [Glitch.com](https://glitch.com) project or account
* [Okta Developer Edition organization](https://developer.okta.com/signup/)

**Sample code**

* [Okta Password Import Inline Hook Example](https://glitch.com/~okta-passwordimport-inlinehook)

---

In the following example, the external service code parses requests from Okta and responds to Okta with commands that indicate whether the end user's credentials are valid. If the credentials are valid, the password is imported into the Okta org.

At a high level, the following workflow occurs:

* User profiles are imported into an Okta org that use the Password Import Inline Hook.
* The Password Import Inline Hook triggers on first sign-in request by a user.
* The external service evaluates the user credentials from the Password Import Inline Hook request against the data store.
* If the credentials are verified, the external service responds to Okta with a command to import the password and sign in the user.
* If the credentials are not verified, the user is not signed-in and the password does not import.

> **Tip:** For another in-depth look at a Password Import Inline Hook implementation, see the following Developer Experience blog example by Heather Wallander, [Migrate user Passwords with Okta's Password Hook](https://developer.okta.com/blog/2020/09/18/password-hook-migration).

## Get submitted credentials

In your external service code, you need to get the values of `data.credential.username` and `data.credential.password` from within the body of the Password Import Inline Hook request received from Okta. These properties contain the credentials submitted by the end user who is trying to sign in.

> **Note:** Make sure to have the required default code and packages in your project. See [Overview and considerations](/docs/guides/common-hook-set-up-steps).

<StackSelector snippet="request"/>

## Check credentials against user store

In this example, your external service code looks up the user name in a prepopulated static array of usernames and passwords, and checks if the password supplied matches the password that exists for that user name in the array. This example is a simplification of the process of looking up the credentials in a real-world user store.

<StackSelector snippet="check-against-user-store" noSelector/>

## Send response

The way to specify to Okta whether to accept the credentials as valid or not is by returning a `commands` object in the body of your HTTPS response, using a specified syntax within the object to indicate to Okta that the credentials should either be denied or accepted.

If you return an empty HTTPS response with an HTTP 204 "No content success" status code, Okta takes the default action, which is to reject the credentials.

Based on the results of the credential check, you return either a command telling Okta to accept the credentials, or an empty response, which results in Okta rejecting the credentials.

<StackSelector snippet="send-response" noSelector/>

>**Note:** Using an empty response to reject the credentials is based on the assumption that Okta is set to do that as the default action. In the request from Okta, the property `data.action.credential` specifies the default action. It is currently always set to `UNVERIFIED`, meaning that the default is to reject.

## Activate the Password Import Hook on your Okta org

The Password Import Inline Hook must be set up and activated within your Okta Admin Console.

To set up and activate the Password Import Inline Hook:

1. In the Admin Console, go to **Workflow** > **Inline Hooks**.
2. Click **Add Inline Hook** and select **Password Import** from the drop-down menu.
3. Add a name for the hook (in this example, "Password Import Hook").
4. Add your external service URL, including the endpoint. For example, use your Glitch project name with the endpoint: `https://your-glitch-projectname.glitch.me/passwordImport`.
5. Include authentication field and secret. In this example:

    * **Authentication field** = `authorization`
    * **Authentication secret** = `Basic YWRtaW46c3VwZXJzZWNyZXQ=`
6. Click **Save**.

The Password Import Inline Hook is now set up with a status of "Active".

> **Note:** You can also set up an inline hook using an API. See [Inline Hooks Management API](/docs/reference/api/inline-hooks/#create-inline-hook) for further information.

## Import test users

Upload some users into your Okta org using the [Password Import Inline Hook API](/docs/reference/api/users/#create-user-with-password-import-inline-hook). These users provide data to test your Inline Hook.

The example below uses sample data from the data store in the `users.js` file of your project.

<StackSelector snippet="password-import-api" noSelector/>

## Test your hook

The external service example is now ready with code to receive and respond to an Okta call. The Okta org is now set up to call the external service when a Password Import Inline Hook is triggered.

### Test

To run a test of your Password Import Inline Hook, go to the Okta sign-in page for your Okta org.

* Start by signing in with one of the users from the data store, for example, "michelletest@example.com", and enter an incorrect password.
* Your result should be an "Unable to Sign On" error.
* Sign in again using the correct password.
* Your result should be access to the Okta org and the import of the user's password into Okta.
* Sign out and sign in again to ensure the hook is no longer called (by reviewing the Admin Console logs).

> **Note:** Review the [troubleshooting](/docs/guides/common-hook-set-up-steps/nodejs/main/#troubleshoot-hook-implementations) section for information if you encounter any setup or configuration difficulties.

## Next steps

Review the following guides to implement other Inline or Event Hook examples:

* [Event Hook](/docs/guides/event-hook-implementation/)
* [Registration Inline Hook](/docs/guides/registration-inline-hook/)
* [Token Inline Hook](/docs/guides/token-inline-hook/)

## See also

For further reference data on the Password Import Inline Hook, see: [Password Import Inline Hook](/docs/reference/password-hook/).
