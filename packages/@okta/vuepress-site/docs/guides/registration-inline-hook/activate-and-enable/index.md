---
title: Activate and enable
---

The Registration Inline Hook must be set up and activated within your Okta Admin Console and enabled on the self-registration page.

To set up and activate the Registration Inline Hook:

1. In the Admin Console, go to **Workflow** > **Inline Hooks**.
2. Click **Add Inline Hook** and select **Registration** from the drop-down menu.
3. Add a name for the hook (in this example, "Guide Registration Hook Code").
4. Add your external service URL, including the endpoint. For example, use your Glitch project name with the endpoint:  `https://your-glitch-projectname.glitch.me/registrationHook`.
5. Include authentication field and secret. In this example:

    - **Authentication Field** = `authorization`
    - **Authorization Secret** = `Basic YWRtaW46c3VwZXJzZWNyZXQ=`
6. Click **Save**.

The Registration Inline Hook is now set up with a status of active.

> **Note:** You can also setup an inline hook using an API. See [Inline Hooks Management API](/docs/reference/api/inline-hooks/#create-inline-hook) for further information.

#### Enabling the Registration Inline Hook with Okta Identity Engine

<ApiLifecycle access="ie" /><br>
To associate the Registration Inline Hook with your Profile Enrollment policy:

1. In the Admin Console, go to **Security > Profile Enrollment**.

1. Click the pencil icon to edit the policy and associate it with your Registration Inline Hook.

1. In **Enrollment Settings**, click the More Options icon and then select **Edit**. If not already selected, click **Allowed** in the **For new users** section.

1. Select your hook from the drop-down menu for **Use the following inline hook** under the options for **For new users**. If you have created multiple Registration Inline Hooks, you can see all of them displayed here.

1. Click **Save**.

Your Registration Inline Hook is now configured for Profile Enrollment.

> **Note:** Only one Inline Hook can be associated with your Profile Enrollment policy at a time.

#### Enabling the Registration Inline Hook with Okta Classic

To enable the Registration Inline Hook on the self-service registration page:

1. In the Admin Console, go to **Directory** > **Self-Service Registration**.

1. Click **Edit**.

1. From the **Extension** field drop-down menu, select the hook you set up and activated previously ("Guide Registration Hook Code") .

1. Click **Save**.

The Registration Inline Hook is now enabled for self-service registration. For a high-level overview of enabling the Registration Inline hook, see [Registration Inline Hook Reference](/docs/reference/registration-hook/).

You are now ready to preview and test the Registration Inline Hook.

<NextSectionLink/>
