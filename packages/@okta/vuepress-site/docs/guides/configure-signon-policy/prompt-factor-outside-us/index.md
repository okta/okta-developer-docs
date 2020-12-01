---
title: Prompt for an MFA factor when a user is outside the US
---

In addition to the Okta Sign-On Policy, there is a Sign-On Policy for each application that determines the extra levels of authentication that you may want performed before a user can access an application. The following are step-by-step instructions to configure an App Sign-On Policy to prompt a user for an MFA factor when the user is outside the United States.

> **Note:** This example assumes that you have already [set up a Dynamic Zone](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Security_Network) for the United States.

### Select the App

1. From the Developer Console, select **Applications**.

2. Select the app that you want to configure a Sign-On Policy for. In this example, we are using a Web App.

3. Click **Sign On** and scroll down to the **Sign On Policy** section.

### Create the rule and define conditions

> **Note:** Some options described in this section may not be available in your org. To enable them, contact [Okta Support](https://support.okta.com/help/s/?_ga=2.17747641.1660906902.1597076228-1076744453.1575496867).

1. Click **Add Rule**.

2. Enter a **Rule Name** such as **Prompt for an MFA factor when a user is outside the US**.

3. Select who the rule applies to in the **People** section. In this use case example, select **The following groups and users:**.

4. In the **Groups** box that appears, enter the group that you want this rule to apply to. In this example, we are using **Everyone**. You can also add specific users that you want to include in the **Users** box.

    If you want to exclude specific groups and users from the policy rule, select **Exclude the following users and groups from this rule:** and then specify the groups and users.

5. Specify the location to which you want the policy to apply in the **LOCATION** section of the dialog box. In this example, select **In Zone**.

6. In the **Network Zones** box that appears, enter the name of the zone that you want to apply, and then add it when it appears in the list. In this example, we are adding the [network zone](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Security_Network) for the United States that we suggested you create <GuideLink link="../before-you-begin">before starting</GuideLink> the steps in this guide.

7. In the **CLIENT** section, clear the platform conditions that you don't want the rule to apply to. In this example, leave the default of all platforms selected.

8. For this use case, in the **ACTIONS** section, leave the default of **Allowed** for the **When all the conditions above are met, sign on to this application is**  drop-down box.

9. Select the **Prompt for factor** check box to require users who are outside of the United States to choose an MFA option for additional authentication.

    > **Note:** The **Multifactor Settings** link takes you to the Multifactor Authentication page, where you can add factors.

10. Then, specify how frequently you want the users to be prompted. Select **Once per session** for this use case.

    > **Note:** While you can configure your App sign-on policies to prompt end users for MFA, be aware that legacy protocols such as `POP` or `IMAP` don't support MFA even if MFA is configured.

11. Click **Save**.

<NextSectionLink>Next steps</NextSectionLink>
