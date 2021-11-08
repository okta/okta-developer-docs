---
title: Activate and enable
---

The Registration Inline Hook must be set up and activated and enabled within your Okta Admin Console.

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

> **Note:** You can also set up an inline hook using an API. See [Inline Hooks Management API](/docs/reference/api/inline-hooks/#create-inline-hook) for further information.

### Enable the Registration Inline Hook

The procedure to enable the Registration Inline Hook is dependent on the type of org you are using: Okta Identity Engine or Okta Classic Engine. Follow the procedure for your specific org.

#### Enable a Registration Inline Hook in the Identity Engine

<ApiLifecycle access="ie" />
If you have an Identity Engine org, you must [enable and configure a profile enrollment policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment) to implement a Registration Inline Hook.

> **Note:** Profile Enrollment and Registration Inline Hooks are only supported with the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) version 4.5 or later.

To associate the Registration Inline Hook with your Profile Enrollment policy:

1. In the Admin Console, go to **Security > Profile Enrollment**.

1. Click the Pencil icon to edit the policy and associate it with your Registration Inline Hook.

1. In **Enrollment Settings**, click the More Options icon and then select **Edit**. Select **Allowed** for **Sign-up** in the **For new users** section.

1. Select your hook from the drop-down menu for **Use the following inline hook** under the options for **For new users** that you've set up an activated previously ("Guide Registration Hook Code"). The drop-down menu displays all the Registration Inline Hooks you have created.

1. Click **Save**.

Your Registration Inline Hook is now configured for Profile Enrollment. You are now ready to preview and test the example.

> **Note:** Only one Inline Hook can be associated with your Profile Enrollment policy at a time.

#### Enable the Registration Inline Hook in the Classic Engine

<ApiLifecycle access="ea" />
If you have a Classic Engine org, you must enable [self-service registration (SSR)](/docs/guides/set-up-self-service-registration/) to implement a Registration Inline Hook.

> **Note:** Self-service registration and Registration Inline Hooks are only supported with the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) version 2.9 or later.

To enable the Registration Inline Hook on the self-service registration page:

1. In the Admin Console, go to **Directory** > **Self-Service Registration**.

1. Click **Edit**.

1. From the **Extension** field drop-down menu, select the hook you've set up and activated previously ("Guide Registration Hook Code").

1. Click **Save**.

The Registration Inline Hook is now enabled for self-service registration. You are now ready to preview and test the example.

<NextSectionLink/>
