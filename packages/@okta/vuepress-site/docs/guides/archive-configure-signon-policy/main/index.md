---
title: Configure Okta sign-on and app sign-on policies
excerpt: How to configure an Okta Sign-On policy and an app sign-on policy.
layout: Guides
---

> **Note:** This document is only for Okta Classic Engine. If you’re using Identity Engine, see [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy). See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.”

This guide explains what policies are, and how to add and configure Okta sign-on policies and app sign-on policies to your [Okta organization](/docs/concepts/okta-organizations/).

---

**Learning outcomes**

* Know the purpose of Okta Sign-On and app sign-on policies.
* Add and configure Okta Sign-On and app sign-on policies.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [Groups created](https://help.okta.com/okta_help.htm?id=ext_Directory_Groups) in your org
* An app that you want to add a sign-on policy to
* A configured [dynamic network zone](https://help.okta.com/okta_help.htm?id=ext_Security_Network)

---

## About the Okta Sign-On and app sign-on policies

An Okta sign-on policy helps you control who can sign in and how a user is allowed to sign in to Okta. Sign-on policies control whether users are challenged for MFA and how long they’re allowed to remain signed in before reauthenticating. You can also configure app sign-on policies for each app for extra levels of authentication before an app can be accessed.

Add a rule to the Okta sign-on policy. For example, add a rule that ensures that only users who are inside your [corporate network](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule!path=0/conditions/network&t=request) can access your app. Or add a rule that excludes certain roles in your organization from accessing your app. Add a rule for an app sign-on policy, for example, to prompt groups that are assigned to your app to reauthenticate after 60 minutes. There’s only one app sign-on policy, but you can add as many rules to it as you need.

You can specify any number of Okta sign-on policies and the order in which they’re executed. If a policy in the list doesn't apply to the user trying to sign in, the system moves to the next policy. There’s one required organization-wide policy named **Default**. By definition, the default policy applies to all users.

In addition to the default policy, which you can't delete, there may be another organization-wide policy named **Legacy**. That policy is present only if you have already configured MFA. This policy reflects the MFA settings that were in place when you enabled your sign-on policy. And it ensures that no changes in MFA behavior occur unless you modify your policy. If required, you can delete it.

> **Note:** See [Policies](/docs/concepts/policies) for an overview of the supported Okta policies and how they work.

## Configure sign-on policies for common scenarios

This guide provides step-by-step instructions to configure an Okta sign-on policy and an app sign-on policy for two of the most common scenarios:

* [Prompt for an MFA factor for a certain group](#prompt-for-an-mfa-factor-for-a-certain-group)
* [Prompt for an MFA factor when a user is outside the US](#prompt-for-an-mfa-factor-when-a-user-is-outside-the-us)

## Prompt for an MFA factor for a certain group

The following are step-by-step instructions to configure an Okta sign-on policy. Use this policy to prompt a user for a factor (multifactor authentication (MFA)) when the user is a member of a certain group.

### Create the policy container

1. In the Admin Console, go to **Security** > **Authentication**.

2. Click the **Sign On** tab, and then click **Add New Okta Sign-on Policy**.

3. In the **Add Policy** window, enter a **Policy Name**, such as **Require MFA for Contractors**, and then enter a **Policy Description**.

4. In the **Assign to Groups** box, enter the group name that you want to apply the policy to. In this example, specify the **Contractor** group in your org. You must create the group before assigning it to the policy.

5. Click **Create Policy and Add Rule**.

### Create the rule

1. In the **Add Rule** window, add a descriptive name for the rule in the **Rule name** box. For example, name it as **Require contractors to use MFA once per session**.

2.  If there are any users in the **Contractor** group that you want to exclude from the rule, enter them in the **Exclude Users** box.

3. For this use case example, leave the default of **Anywhere** in the **If User's IP is** dropdown box. For other use cases where you want to assign location parameters, you can specify what kind of location prompts authentication. For example, you can prompt a user for a factor when they aren't on the corporate network.

    > **Note:** You can click the **Networks** link to access the gateway settings that enable your choice of access. A [network zone](https://help.okta.com/okta_help.htm?id=ext_Security_Network) is a security perimeter used to limit or restrict access to a network based on a single IP address, one or more IP address ranges, or a list of geolocations. You can also create network zones using the [Zone API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/NetworkZone/).

4. Leave the default of **Any** in the **And Authenticates via** dropdown box.

5. Select **Allowed** from the **Then Access is** dropdown box to allow access based on the conditions defined.

6. Leave the **Prompt for Factor** checkbox selected so that users of the **Contractor** group are prompted for a factor before they’re granted access. This checkbox appears only when at least one factor type is enabled in your org.

    > **Note:** Click the **Multifactor Authentication** link for quick access to the **Authentication** page and the **Multifactor** tab to define the factors that you want to use.

7. Use the option buttons to determine how users are prompted for MFA in a given session. In this example, leave the default of **Per Session** selected.

    You can configure whether the factor prompt is triggered per a device, at every sign-on, or per a session time that you specify:

    * **Per Device:** Provides the option **Do not challenge me on this device again** on the end user MFA challenge dialog box. This option allows prompts solely for new devices.
    * **Every Time:** End users are prompted every time they sign in to Okta and can't influence when they’re prompted to provide a factor.
    * **Per Session:** Provides the option **Do not challenge me on this device for the next (minutes/hours/days)** on the end user MFA challenge dialog box. You can then specify the **Factor Lifetime**. When specifying per session sessions have a default lifetime as configured, but sessions always end whenever users sign out of their Okta session.

8. For this use case example, leave the default **Factor Lifetime** of **15 minutes**. Use these fields to specify how much time must elapse before the user is challenged for MFA.

    The maximum lifetime period is six months. Setting a factor lifetime is a way for end users to sign out for the amount of time noted in the **Factor Lifetime**. They don't have to authenticate again with MFA at the next sign in. End users must select a box when they sign in to confirm that the setting should be applied. An example is **Do not challenge me on this device for the next 15 minutes**. After signing out, there’s no MFA prompt if the user signs in again within 15 minutes of the last sign in with MFA. If users don't select the box, they’re always prompted for MFA. The time since the last sign-in is noted at the bottom of the End-User Dashboard. However, end users must refresh the page to see the updated value.

9. For this use case example, leave the default **Session Expires After** setting of **2 hours**. Use these fields to specify the maximum idle time before an authentication prompt is triggered. The maximum allowed time for this option is 90 days. This isn't the total connect time. This is idle time before users see a countdown timer at the 5-minute mark of remaining session time.

    > **Note:** You can set the [maximum session lifetime value](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule!path=4/actions/signon/session/maxSessionLifetimeMinutes&t=request) using the Okta APIs. If you previously set this value using the API, you can't exceed that maximum in the UI. Setting a value over the API maximum results in an error.

10. Click **Create Rule**.

> **Note:** After you create a policy, you must close all active sessions for the new policy to take effect.

## Prompt for MFA factor when a user is outside the US

In addition to the Okta sign-on policy, there’s an app sign-on policy for each app. The app sign-on policy determines the extra levels of authentication that can be performed before a user accesses an app. The following are instructions to configure an app sign-on policy to prompt a user for an MFA factor when they're outside the United States.

> **Note:** This example assumes that you have already [set up a Dynamic Zone](https://help.okta.com/okta_help.htm?id=ext_Security_Network) for the United States.

### Select the App

1. In the Admin Console, select **Applications** > **Applications**.

2. Select the app that you want to configure a sign-on policy for. In this example, use a Web App.

3. Click **Sign On** and scroll down to the **Sign On Policy** section.

### Create the rule and define conditions

> **Note:** Some options described in this section may not be available in your org. To enable them, contact [Okta Support](https://support.okta.com/help/s/?_ga=2.17747641.1660906902.1597076228-1076744453.1575496867).

1. Click **Add Rule**.

2. Enter a **Rule Name** such as **Prompt for an MFA factor when a user is outside the US**.

3. Select who the rule applies to in the **People** section. In this use case example, select **The following groups and users:**.

4. In the **Groups** box that appears, enter the group that you want this rule to apply to. In this example, use **Everyone**. You can also add specific users that you want to include in the **Users** box.

    If you want to exclude specific groups and users from the policy rule, select **Exclude the following users and groups from this rule:** and then specify the groups and users.

5. Specify the location to which you want the policy to apply in the **LOCATION** section of the dialog box. In this example, select **In Zone**.

6. In the **Network Zones** box that appears, enter the name of the zone that you want to apply. Then add it when it appears in the list. In this example, add a [network zone](https://help.okta.com/okta_help.htm?id=ext_Security_Network) for the United States. Create a network zone for the United States if you haven't already.

7. In the **CLIENT** section, clear the platform conditions that you don't want the rule to apply to. In this example, leave the default of all platforms selected.

8. For this use case, in the **ACTIONS** section, leave the default of **Allowed** for the **When all the conditions above are met, sign on to this application is**  dropdown box.

9. Select the **Prompt for factor** checkbox to require users who are outside of the United States to choose an MFA option for extra authentication.

    > **Note:** The **Multifactor Settings** link takes you to the Multifactor Authentication page, where you can add factors.

10. Then, specify how frequently you want the users to be prompted. Select **Once per session** for this use case.

    > **Note:** While you can configure your app sign-on policies to prompt end users for MFA, legacy protocols such as `POP` or `IMAP` don't support MFA even if MFA is configured.

11. Click **Save**.

## Next steps

You should now understand how to add an Okta sign-on policy and an app sign-on policy.

Next, go to the following pages:

* [Sign Users Out](/docs/guides/sign-users-out/)
* [Set up self-registration](/docs/guides/archive-set-up-self-service-registration/)
* [Configure an access policy](/docs/guides/configure-access-policy/)

## See also

[Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/)
