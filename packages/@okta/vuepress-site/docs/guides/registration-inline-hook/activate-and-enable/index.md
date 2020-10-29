---
title: Activate and enable
---

The Registration Inline Hook must be set up and activated within your Okta Admin Console and enabled in the self-registration page.

To set up and activate the Registration Inline Hook:

1. Navigate to the **Workflow** > **Inline Hooks** page.
2. Click **Add Inline Hook** and select **Registration Hook** from the drop-down menu.
3. Add a name for the hook and your external service URL, including the endpoint (in this example, `https://aged-garrulous-mango.glitch.me/registrationHook`).
4. Include authorization field and secret. In this example:

    * Authentication Field = 'authorization'
    * Authorization Secret = 'Basic YWRtaW46c3VwZXJzZWNyZXQ='
5. Click **Save**.

> **Note:** You can also setup an inline hook using an API. See [Inline Hook Setup](/docs/concepts/inline-hooks/#inline-hook-setup) for further information.

The Registation Inline Hook is now set up with a status of active.

To enable the Registration Inline Hook on the self-service registration page:

1. Navigate to **Directory** > **Self-Service Registration**.
2. Click **Edit**.
3. Select the hook you set up and activated in the **Extension** field drop-down menu.
4. Click **Save**.

The registation inline hook is now enabled for self-service registration. For a high-level overview of enabling the Registration Inline hook, see [Registration Inline Hook Reference](/docs/reference/registration-hook/).

You are now ready to preview and test the Registration Inline hook.

<NextSectionLink/>

