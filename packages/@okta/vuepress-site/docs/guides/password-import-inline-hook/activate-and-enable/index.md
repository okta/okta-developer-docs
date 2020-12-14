---
title: Activate
---

The Password Import Inline Hook must be set up and activated within your Okta Developer Console.

To set up and activate the Password Import Inline Hook:

1. Navigate to the **Workflow** > **Inline Hooks** page.
2. Click **Add Inline Hook** and select **Password Import** from the drop-down menu.
3. Add a name for the hook (in this example, "Password Import Hook").
4. Add your external service URL, including the endpoint. For example, use your Glitch project name with the endpoint: `https://your-glitch-projectname.glitch.me/passwordImport`.
5. Include authentication field and secret. In this example:

    - **Authentication field** = `authorization`
    - **Authentication secret** = `Basic YWRtaW46c3VwZXJzZWNyZXQ=`
6. Click **Save**.

The Password Import Inline Hook is now set up with a status of active.

> **Note:** You can also set up an inline hook using an API. See [Inline Hooks Management API](/docs/reference/api/inline-hooks/) for further information.

<NextSectionLink/>
