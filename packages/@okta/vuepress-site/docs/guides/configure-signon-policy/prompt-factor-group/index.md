---
title: Prompt for an MFA factor for a certain group
---

<RequireClassicUI/>

The following are step-by-step instructions to configure an Okta Sign-On Policy to prompt a user for a factor (multifactor authentication (MFA)) when the user is a member of a certain group.

### Create the policy container

1. In the Admin Console, navigate to **Security** and then **Authentication**.

2. Click the **Sign On** tab, and then click **Add New Okta Sign-on Policy**.

3. In the **Add Policy** window, enter a **Policy Name** and a **Policy Description**.

4. In the **Assign to Groups** box, enter the group name that you want to apply the policy to. In this example, we are specifying the **Contractor** group in our org. The group names must already exist before assigning them to a policy.

5. Click **Create Policy and Add Rule**.

### Create the rule

1. In the **Add Rule** window, add a descriptivbe name for the rul in the **Rule name** box.

2.  If there are any users in the **Contractor** group that you want to exclude from the rule, enter them in the **Exclude Users** box.

3. For this use case example, leave the default of **Anywhere** in the **If User's IP is** drop-down box. Use this box to assign location parameters. This specifies what kind of location prompts authentication, for example, prompting a user for a factor when they aren't on the corporate network.

    > **Note:** You can click the **Networks** link to access your gateway settings that enable your choice of access. A [network zone](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Security_Network) is a security perimeter used to limit or restrict access to a network based on a single IP address, one or more IP address ranges, or a list of geolocations. You can also create networks zones using the [Zone API](/docs/reference/api/zones/).

4. Leave the default of **Any** in the **And Authenticates via** drop-down box.

5. Select **Allowed** from the **Then Access is** drop-down box to allow access based on the conditions defined.

6. Leave the **Prompt for Factor** check box selected so that users of the **Contractor** group are prompted for a factor before they are granted access. This check box appears only when at least one factor type is enabled in your org.

    > **Note:** Click the **Multifactor Authentication** link for quick access to the **Authentication** page and the **Multifactor** tab to define the factors that you want to use.

7. Use the option buttons to determine how users are prompted for MFA in a given session. You can configure whether the factor prompt is triggered per a device, at every sign-on, or per a session time that you specify. In this example, leave the default of **Per Session** selected.

    * **Per Device:** Provides the option **Do not challenge me on this device again** on the end user MFA challenge dialog box. This option allows prompts solely for new devices.
    * **Every Time:** End users are prompted every time they sign in to Okta and can't influence when they are prompted to provide a factor.
    * **Per Session:** Provides the option **Do not challenge me on this device for the next (minutes/hours/days)** on the end user MFA challenge dialog box. You specify the **Factor Lifetime** below. When specifying per session, note that sessions have a default lifetime as configured, but sessions always end whenever users sign out of their Okta session.

8. For this use case example, leave the default **Factor Lifetime** of **15 minutes**. Use these fields to specify how much time must elapse before the user is challenged for MFA.

    The maximum lifetime period is six months. Setting a factor lifetime is a way for end users to sign out for the amount of time noted in the **Factor Lifetime** and not have to authenticate again with MFA at the next sign in. End users must select a box when they sign in to confirm that the setting should be applied. An example is **Do not challenge me on this device for the next 15 minutes**. In this case, after signing out, there is no MFA prompt if the user signs in again within 15 minutes of the last sign in with MFA. If users don't select the box, they are always prompted for MFA. The time since the last sign in is noted at the bottom of the End-User Dashboard. However, end users must refresh the page to see the updated value.

9. For this use case example, leave the default **Session Expires After** setting of **2 hours**. Use these fields to specify the maximum idle time before an authentication prompt is triggered. The maximum allowed time for this option is 90 days. This isn't the total connect time. This is idle time before users see a countdown timer at the 5-minute mark of remaining session time.

    > **Note:** You can set the [maximum session lifetime value](/docs/reference/api/policy/#signon-session-object) using the Okta APIs. If you previously set this value using the API, you can't exceed that maximum in the UI. Setting a value over the API maximum results in an error.

10. Click **Create Rule**.

> **Note:** After you create a new policy, you must close all active sessions for the new policy to take effect.

<NextSectionLink/>
