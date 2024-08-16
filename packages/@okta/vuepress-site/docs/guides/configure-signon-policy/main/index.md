---
title: Configure a global session policy and authentication policies
excerpt: How to configure a global session policy and authentication policies.
layout: Guides
---

<ApiLifecycle access="ie" /><br>

> **Note:** In Classic Engine, the global session policy is called the Okta sign-on policy and an authentication policy is called an app sign-on policy.

> **Note:** This document is only for Identity Engine. If you’re using Classic Engine, see [Configure Okta sign-on and app sign-on policies](/docs/guides/archive-configure-signon-policy). See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

This guide explains what global session policies and authentication policies are used for and how to add and configure them in your [Okta org](/docs/concepts/okta-organizations/).

---

#### Learning outcome

Know the purpose of a global session policy and authentication policies and be able to configure them.

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [Groups created](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/) in your org
* An application that you want to assign to an authentication policy
* [Authenticators](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-authenticators) configured in your org
* A configured [dynamic network zone](https://help.okta.com/okta_help.htm?id=ext_Security_Network)

---

## Overview

Policies help you manage access to your applications and APIs. You can restrict access based on several conditions such as user and group membership, device, location, or time. You can also require more authentication steps for access to sensitive applications. More authentication steps might include confirmation of a push notification to a mobile device or re-authentication through an SMS one-time passcode.

> **Note:** See the [Policies concept](/docs/concepts/policies/) for more information on all available policies and how to use them.

### Global session policies

Global session policies help control who can have access and how a user gains access to Okta. This includes whether they're challenged for more factors and how long they're allowed to remain signed in before reauthenticating. A global session policy supplies the context necessary for the user to advance to the next authentication step after Okta identifies them.

#### Multiple options

You can configure a global session policy to require any of the [factors that you set up](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-authenticators). Then use the primary and secondary factor conditions in a rule to define which factors are evaluated. For example, add a rule that prompts for more factors when you want only users who are inside your [corporate network](/docs/reference/api/policy/#network-condition-object) to have access.

> **Note:** If you select **Password/IDP/any factor allowed by app sign on rules** as a rule's primary factor, you remove the global password requirement from the global session policy. This transfers responsibility for defining and enforcing authentication criteria to each of your [authentication policies](#authentication-policies) instead. See [Configure passwordless authentication](https://help.okta.com/okta_help.htm?type=oie&id=ext-passwordless-auth).

You can specify any number of global session policies and the order in which they’re executed. If a policy in the list doesn't apply to the user trying to sign in, the system moves to the next policy. There’s one required organization-wide policy named default. By definition, the default policy applies to all users.

### Authentication policies

In addition to the global session policy, you can configure authentication policies for each app for extra levels of authentication. You can also [share authentication policies across multiple apps](https://help.okta.com/okta_help.htm?type=oie&id=ext-share-auth-policy).

When you add an app, it's automatically assigned the shared default policy. This policy has a single catch-all rule that allows a user access with only one factor. You can add as many rules to the default policy as you need. However, remember that the changes are applied to both new and existing apps that are assigned the shared default policy.

You don’t have to use the default authentication policy. You can create a new policy specifically for an app, or you can [add an app to another existing shared policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-share-auth-policy). If you decide later to change an app’s sign-on requirements, you can modify its policy or switch to a different shared policy using the [Authentication Policies page](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-auth-policy).

> **Note:** There can be only one authentication policy per app.

## Configure sign-on policies for common scenarios

This guide provides step-by-step instructions to configure a global session policy and an authentication policy for two of the most common scenarios:

* [Prompt for an additional factor for a group](#prompt-for-an-additional-factor-for-a-group)
* [Prompt for an additional factor when a user is outside the US](#prompt-for-an-additional-factor-when-a-user-is-outside-the-us)

## Prompt for an additional factor for a group

The following are step-by-step instructions to configure a global session policy to prompt a user for a factor [authenticator](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-authenticators) when the user is a member of a certain group.

### Create the policy container

1. In the Admin Console, go to **Security** > **Global Session Policy**.

2. Click **Add New Global Session Policy**. The **Add Policy** window appears.

3. Enter a **Policy Name**, such as **Require MFA for Contractors**, and then enter a **Policy Description**.

4. Enter the group name that you want to apply the policy to in the **Assign to Groups** box. In this example, specify the **Contractor** group in the org. The group names must exist before assigning them to a policy.

5. Click **Create Policy and Add Rule**.

### Create the rule

1. In the **Add Rule** window, add a descriptive name for the rule in the **Rule name** box, such as **Require contractors to use MFA once per session**.

2. If there are any users in the **Contractor** group that you want to exclude from the rule, enter them in the **Exclude Users** box.

3. Configure IF conditions, which define the authentication context for the rule. For this use case example, leave the defaults. For other use cases where you want to assign location parameters, you can specify what kind of location prompts authentication in the **IF User’s IP is** dropdown box (for example, prompting a user for a factor when they aren't on the corporate network).

4. Configure THEN conditions, which define the authentication experience for the rule. For this use case example, leave the **Password/IDP** option selected. Also, leave **Require secondary factor** selected so that users of the Contractor group are prompted for a secondary factor before they’re granted access.

    > **Note:** Click the **Multifactor Authentication** link for quick access to the **Authenticators** page to configure the factors that you want to use.

5. Use the option buttons to determine how users are prompted for a secondary factor in a given session. In this example, leave the default of **Per Session** selected.

    You can configure whether the factor prompt is triggered per a device, at every sign-in attempt, or per a session time that you specify:

    * **Per Device:** Provides the option **Do not challenge me on this device again** in the end user MFA challenge dialog. This option allows prompts solely for new devices.
    * **Every Time:** End users are prompted every time they sign in to Okta and can't influence when they’re prompted to provide a factor.
    * **Per Session:** Provides the option **Do not challenge me on this device for the next (minutes/hours/days)** in the end user MFA challenge dialog. When you specify per session, sessions have a default lifetime as configured, but sessions always end whenever users sign out of their Okta session.

6. For this use case example, leave the default **Factor Lifetime** of **15 minutes**. Use these fields to specify how much time must elapse before the user is challenged again for the secondary factor.

    The maximum lifetime period is six months. Setting a factor lifetime is a way for end users to sign out for the amount of time noted in the **Factor Lifetime** and not have to authenticate again with MFA the next time they sign in. End users must select a box when they sign in to confirm that the setting should be applied. An example is **Do not challenge me on this device for the next 15 minutes**. In this case, after signing out, there’s no secondary factor prompt if the user signs in again within 15 minutes of the last sign-in event with MFA. If users don't select the box, they’re always prompted for a secondary factor. The time since the last sign-in event is noted at the bottom of the End-User Dashboard. However, end users must refresh the page to see the updated value.

7. For this use case example, select **8 hours** for **Session Expires After**. Use these fields to specify the maximum idle time before an authentication prompt is triggered. The maximum allowed time for this option is 90 days. This isn't the total connection time. This is idle time before users see a countdown timer at the 5-minute mark of remaining session time.

    > **Note:** You can also set the [maximum session lifetime value](/docs/reference/api/policy/#signon-session-object) using the Okta APIs. If you previously set this value using the API, you can't exceed that maximum in the Admin Console. Setting a value over the API maximum results in an error.

8. Click **Create Rule**.

> **Note:** After you create a policy, you must close all active sessions for the new policy to take effect.

## Prompt for an additional factor when a user is outside the US

You may want all default Okta users to provide a password, but you want all Okta users outside of the United States to provide both a password and another factor to access your app. You can use the default authentication policy’s catch-all rule that challenges all users to provide a password. Then, create another rule that challenges all users not in the United States to provide both a password and another factor each time that they sign in.

The following are step-by-step instructions to configure another rule for the default authentication policy to prompt a user for an additional factor when the user is outside of the United States.

> **Note:**  You can add as many rules to the default authentication policy that you want, but remember that the changes are applied to all new apps as it is a shared app policy.

### Select the policy and add a rule

> **Note:** This example assumes that you've already [set up a Dynamic Zone](https://help.okta.com/okta_help.htm?id=ext_Security_Network). In this example, use a dynamic zone defined for IP addresses within the United States.

1. In the Admin Console, select **Security** > **Authentication Policies**.

2. Select **Default Policy** and then click **Add rule**. The Add Rule dialog appears.

3. Enter a **Rule name** such as **Prompt for an MFA factor when a user is outside the US**.

4. Configure IF conditions to define the authentication context for the rule. Select **Not in any of the following zones** from the **AND User’s IP is** dropdown list.

    > **Note:** You can click the **Go to Network Zones** link to access the gateway settings that enable your choice of access. A [network zone](https://help.okta.com/okta_help.htm?id=ext_Security_Network) is a security perimeter used to limit or restrict access to a network based on a single IP address, one or more IP address ranges, or a list of geolocations. You can also create network zones using the [Zones API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/NetworkZone/).

5. In the text box, start typing the dynamic zone name and then select it when it appears in the list.

6. Configure THEN conditions to define the authentication experience. For this use case, leave the default of **Allowed after successful authentication** for **THEN Access is**.

7. In the **Re-authentication frequency** section, select **Every sign-in attempt** for both **AND Password re-authentication frequency is** and **AND Re-authentication frequency for all other factors is**.

8. Click **Save**.

> **Note:** You can [use the API](/docs/reference/api/policy/#authentication-policy) to assign an app to an authentication policy. You need the application ID and the policy ID for this API request. Make a `PUT /api/v1/apps/{appId}/policies/{policyId}` request. No HTTP body is necessary for the PUT request. Then, to check that the assignment was successful, make a `GET /api/v1/apps/{appId}` request and the response should contain information on the policy associated with the app.

## See also

* [Policies concept](/docs/concepts/policies/)
* [Policy API reference](/docs/reference/api/policy/)
* [Configure an access policy](/docs/guides/configure-access-policy/)
