---
title: Activate and enable
---

The Registration Inline hook must be set up and activated within your Okta Admin Console and enabled in the self-registration page.

To set up and activate the registration inline hook:

1. Navigate to the **Workflow** > **Inline Hooks** page.
2. Click **Add Inline Hook** and select **Registration Hook** from the drop-down menu.
3. Add a name for the hook and your external service URL, including the endpoint (in this example, `registrationHook`).
4. Include authorization data if required.
5. Click **Save**.

![Registration Inline Hook set up window](/img/registration-inline-hook-setup.png "Registration Inline Hook set up window")

> **Note:** You can also setup an inline hook using an API. See [Inline Hook Setup](/docs/concepts/inline-hooks/#inline-hook-setup) for further information.

The registation inline hook is now set up with a status of active.

To enable the registration inline hook on the self-service registration page:

1. Navigate to **Directory** > **Self-Service Registration**.
2. Click **Edit**.
3. Select the hook you set up and activated in the **Extension** field drop-down menu.
4. Click **Save**.

The registation inline hook is now enabled for self-service registration. For a high-level overview of enabling the Registration Inline hook, see [Registration Inline Hook Reference](/docs/reference/registration-hook/).

You are now ready to test the Registration Inline hook.

<NextSectionLink/>

