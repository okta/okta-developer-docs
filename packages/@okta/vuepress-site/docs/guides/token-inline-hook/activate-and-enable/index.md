---
title: Activate and enable
---

The Token Inline Hook must be activated and enabled within your Okta Admin Console.

- Activating the Token Inline Hook registers the hook with the Okta org and associates it with your external service.
- Enabling the Token Inline Hook associates the hook with your Okta custom authorization server, which authenticates the Okta-Hosted Login sample application.

### Activate the Token Inline Hook

1. Navigate to the **Workflow** > **Inline Hooks** page.

2. Click **Add Inline Hook** and select **Token** from the drop-down menu.

3. Add a name for the hook (in this example, "Patient Token Hook").

4. Add your external service URL, including the endpoint. For example, use your Glitch project name with the endpoint: `https://your-glitch-projectname.glitch.me/tokenHook`.

5. Include authentication field and secret. In this example:

    - **Authentication field** = `authorization`
    - **Authentication secret** = `Basic YWRtaW46c3VwZXJzZWNyZXQ=`

6. Click **Save**.

The Token Inline Hook is now set up with a status of active.

### Enable the Token Inline Hook

1. Navigate to **Security** > **API** > **Authorization Servers**.

2. Select a Custom Authorization Server from the list (usually **default**).

3. Select the **Access Policies** tab and edit the policy rule to use with the hook. In most cases, edit the **Default Policy Rule**.

4. From the **Use this Inline Hook** drop-down menu, select the Token Inline Hook you activated ("Patient Token Hook").

5. Click **Update Rule**.

The Token Inline Hook is now ready for triggering when the default policy rule is invoked from an authentication request.

<NextSectionLink/>