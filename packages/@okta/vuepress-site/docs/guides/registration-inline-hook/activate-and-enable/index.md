---
title: Activate and enable
---

The Registration Inline Hook must be set up and activated within your Okta Developer Console and enabled in the self-registration page.

To set up and activate the Registration Inline Hook:

1. Navigate to the **Workflow** > **Inline Hooks** page.
2. Click **Add Inline Hook** and select **Registration Hook** from the drop-down menu.
3. Add a name for the hook (in this example, "Guide Registration Hook Code").
4. Add your external service URL, including the endpoint. For example, use your Glitch project name with the end point:  https://*your-glitch-projectname*.glitch.me/registrationHook).
5. Include authorization field and secret. In this example:

    * Authentication Field = `authorization`
    * Authorization Secret = `Basic YWRtaW46c3VwZXJzZWNyZXQ=`
6. Click **Save**.

The Registation Inline Hook is now set up with a status of active.

> **Note:** You can also setup an inline hook using an API. See [Inline Hook Setup](/docs/concepts/inline-hooks/#inline-hook-setup) for further information.

To enable the Registration Inline Hook on the self-service registration page:

1. Navigate to **Directory** > **Self-Service Registration**.
2. Click **Edit**.
3. From the **Extension** field drop-down menu, select the hook you set up and activated previously ("Guide Registration Hook Code") .
4. Click **Save**.

The registation inline hook is now enabled for self-service registration. For a high-level overview of enabling the Registration Inline hook, see [Registration Inline Hook Reference](/docs/reference/registration-hook/).

You are now ready to preview and test the Registration Inline hook.

<NextSectionLink/>

