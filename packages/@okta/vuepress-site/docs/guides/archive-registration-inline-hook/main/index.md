---
title: Registration inline hook
excerpt: Code the external service for a registration inline hook
layout: Guides
---

> **Note:** This document is only for Okta Classic Engine. If you are using Okta Identity Engine, see [Configure a registration inline hook](/docs/guides/registration-inline-hook/nodejs/main/). See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

This guide provides a working example of an Okta registration inline hook. It uses the web site [Glitch.com](https://glitch.com) to act as an external service and receive and respond to registration inline hook calls.

---

**Learning outcomes**

* Understand the Okta registration inline hook calls and responses.
* Implement a simple working example of a registration inline hook with a Glitch.com project.
* Preview and test a registration inline hook.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* [Glitch.com](https://glitch.com) project or account

**Sample code**

[Okta Registration Inline Hook Example](https://glitch.com/~okta-inlinehook-registrationhook)

---

## About registration inline hook implementation

In the following example, the external service code parses requests from Okta and responds with commands that indicate whether the end user's email domain is valid and allowed to register.

At a high-level, the following workflow occurs:

1. A user attempts to self-register with your Okta org.
1. A registration inline hook triggers during this process and sends a call to the external service with the user's data.
1. The external service evaluates the Okta call to ensure the user is from domain `example.com`.
1. The external service responds to Okta with a command to allow or deny the registration based on the email domain.

## Add request code

This step includes the code that parses the body of the request received from Okta, which gets the values of `data.userProfile`. These properties contain the credentials submitted by the end user who is trying to self register.

<StackSnippet snippet="get-submitted-credentials"/>

## Send response

The external service responds to Okta indicating whether to accept the user self-registration by returning a `commands` object in the body of the HTTPS response. This object contains specific syntax that indicates whether the user is allowed or denied self-registration with Okta.

<StackSnippet snippet="send-response" noSelector/>

## Activate and enable

The registration inline hook must be set up, activated, and enabled within your Okta Admin Console.

To set up and activate the registration inline hook:

1. In the Admin Console, go to **Workflow** > **Inline Hooks**.
2. Click **Add Inline Hook** and select **Registration** from the dropdown menu.
3. Add a name for the hook (in this example, use "Guide Registration Hook Code").
4. Add your external service URL, including the endpoint. For example, use your Glitch project name with the endpoint:  `https://your-glitch-projectname.glitch.me/registrationHook`.
5. Include the authentication field and secret. In this example:

    * **Authentication Field** = `authorization`
    * **Authorization Secret** = `Basic YWRtaW46c3VwZXJzZWNyZXQ=`
6. Click **Save**.

The registration inline hook is now set up with an active status.

> **Note:** You can also set up an inline hook using the API. See [Inline Hooks Management API](/docs/reference/api/inline-hooks/#create-inline-hook).

### Enable the registration inline hook in the Classic Engine

If you have a Classic Engine org, you must enable [self-service registration (SSR)](/docs/guides/archive-set-up-self-service-registration/main/) to implement a Registration Inline Hook.

> **Note:** Self-service registration and registration inline hooks are only supported with the [Okta Sign-In Widget](/docs/guides/archive-embedded-siw/) version 2.9 or later.

To enable the registration inline hook on the self-service registration page:

1. In the Admin Console, go to **Directory** > **Self-Service Registration**.

1. Click **Edit**.

1. From the **Extension** dropdown menu, select the hook that you set up and activated previously ("Guide Registration Hook Code").

1. Click **Save**.

The registration inline hook is now enabled for self-service registration. You are now ready to preview and test the example.

## Preview and test

The external service example is now ready with code to receive and respond to an Okta call. The Okta org is now set up to call the external service using a registration inline hook.

In your Okta org, you can preview the request and response JSON right from the Admin Console. You can also test the code directly with self-registering users.

### Preview

To preview the registration inline hook:

1. In the Admin Console, go to **Workflow** > **Inline Hooks**.
2. Select the registration inline hook name (in this example, select "Guide Registration Hook Code").
3. Click the **Preview** tab.
4. In the **Configure Inline Hook request** block, select an end user from your org in the **data.userProfile** field. That is, select a value from your `data.user.profile` object.
5. From the **Preview example Inline Hook request** block, click **Generate Request**.
    The user's request information in JSON format that is sent to the external service appears.
6. From the **View service's response** block, click **View Response**.
    The response from your external service in JSON format appears, which indicates that self-registration was either allowed or denied.

### Test

To run a test of your registration inline hook, go to the Okta sign-in page for your Okta org, click the **Sign Up** link, and attempt to self-register.

* If you use an allowable email domain, such as `john@example.com`, the user registration goes through.
* If you use an incorrect email domain, the user registration is denied. Review the error message that displays the error summary from the external service code and is passed back to Okta.

> **Note:** Review [Troubleshooting hook implementations](/docs/guides/common-hook-set-up-steps/nodejs/main/#troubleshoot-hook-implementations) if you encounter any set up or configuration difficulties.

## Next steps

Review the following guides to implement other inline or event hook examples:

* [Event hook](/docs/guides/event-hook-implementation/)
* [Password import inline hook](/docs/guides/password-import-inline-hook/)
* [Token inline hook](/docs/guides/token-inline-hook/)

## See also

* For a complete description of this inline hook type, see the [Registration inline hook reference](/docs/reference/registration-hook/).
* [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/)