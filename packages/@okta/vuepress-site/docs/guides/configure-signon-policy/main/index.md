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

* [Okta Integrator Free Plan organization](https://developer.okta.com/signup)
* [Groups created](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/) in your org
* An app that you want to assign to an authentication policy
* [Authenticators](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-authenticators) configured in your org
* A configured [dynamic network zone](https://help.okta.com/okta_help.htm?id=ext_Security_Network)

---

## Overview

Policies help you manage access to your apps and APIs. You can restrict access based on several conditions such as user and group membership, device, location, or time. You can also require more authentication steps for access to sensitive apps. More authentication steps might include confirmation of a push notification to a mobile device or re-authentication through an SMS one-time passcode.

> **Note:** See the [Policies concept](/docs/concepts/policies/) for more information on all available policies and how to use them.

### Global session policies

Global session policies help control who can have access and how a user gains access to Okta. This includes whether they're challenged for more factors and how long they're allowed to remain signed in before reauthenticating. A global session policy supplies the context necessary for the user to advance to the next authentication step after Okta identifies them.

#### Multiple options

You can configure a global session policy to require any of the [factors that you set up](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-authenticators). Then use the primary and secondary factor conditions in a rule to define which factors are evaluated. For example, add a rule that prompts for more factors when you want only users who are inside your [corporate network](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule!path=0/conditions/network&t=request) to have access.

> **Note:** If you select **Any factor used to meet the Authentication Policy requirements**, you remove the global password requirement from the global session policy. This transfers responsibility for defining and enforcing authentication to each of your [authentication policies](#authentication-policies) instead. See [Configure passwordless authentication](https://help.okta.com/okta_help.htm?type=oie&id=ext-passwordless-auth).

You can specify any number of global session policies and the order in which they’re executed. If a policy in the list doesn't apply to the user trying to sign in, the system moves to the next policy. There’s one required organization-wide policy named default. By definition, the default policy applies to all users.

### Authentication policies

In addition to the global session policy, you can configure authentication policies for each app for extra levels of authentication. You can also [share authentication policies across multiple apps](https://help.okta.com/okta_help.htm?type=oie&id=ext-share-auth-policy).

When you add an app, it's automatically assigned the shared default policy. This policy has a single catch-all rule that allows a user access with only one factor. You can add as many rules to the default policy as you need. However, remember that the changes are applied to both new and existing apps that are assigned the shared default policy.

You don’t have to use the default authentication policy. You can create a policy specifically for an app, or you can [add an app to another existing shared policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-share-auth-policy). If you change an app’s sign-on requirements, you can modify its policy or switch to a different shared policy using the [Authentication Policies page](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-auth-policy).

> **Note:** There can be only one authentication policy per app.

## Configure sign-on policies for common scenarios

This guide provides step-by-step instructions to configure a global session policy and an authentication policy for three common scenarios:

* [Prompt for an additional factor for a group](#prompt-for-an-additional-authenticator-for-a-group)
* [Prompt for an additional factor when a user is outside the US](#prompt-for-an-mfa-factor-when-a-user-is-outside-the-us)
* [Prompt for passwordless sign-in flow](#prompt-for-a-passwordless-sign-in-flow)

## Prompt for an additional factor for a group

Configure a global session policy to prompt a user for a factor [authenticator](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-authenticators) when the user is a member of a certain group.

### Create the policy container

1. In the Admin Console, go to **Security** > **Global Session Policy**.

2. Click **Add New Global Session Policy**. The **Add Policy** window appears.

3. Enter a **Policy Name**, such as **Require MFA for Contractors**, and then enter a **Policy Description**.

4. Enter the group name that you want to apply the policy to in the **Assign to Groups** box. In this example, specify the **Contractor** group in the org. You must create groups before assigning them to a policy.

5. Click **Create Policy and Add Rule**.

### Create the rule

1. In the **Add Rule** window, add a descriptive name for the rule in the **Rule name** box. For example, name it **Require contractors to use MFA once per session**.

1. If there are any users in the **Contractor** group that you want to exclude from the rule, enter them in the **Exclude Users** box.

1. Configure IF conditions, which define the authentication context for the rule. For this use case example, leave the defaults. For other use cases where you want to assign location parameters, specify location prompts in the **IF User’s IP is** dropdown box. For example, you can prompt a user for a factor when they aren't on the corporate network.

1. Configure THEN conditions, which define the authentication experience for the rule. For this use case example, select that the session is established with the user entering **A password**. Also, ensure that Multifactor authentication (MFA) is **Required**. Users in the **Contractor** group are then prompted for a secondary factor before they’re granted access.

    > **Note:** Click the **authenticators** link for quick access to the [Authenticators](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-authenticators) page to configure the authenticators that you want to use.

1. Select how users are prompted for a secondary factor in a given session. In this example, leave the default of **At every sign in** selected. Users are challenged for MFA every time they sign in.

1. Configure the time settings for the rule. Use these fields to specify the maximum idle time before an authentication prompt is triggered. The maximum allowed time for this option is 90 days. This isn't the total connection time. This is idle time before users see a countdown timer at the 5-minute mark of remaining session time.

1. Click **Set time limit** and leave the default time settings.

    > **Note:** You can also set the [maximum session lifetime value](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule!path=4/actions/signon/session/maxSessionLifetimeMinutes&t=request) using the Okta APIs. If you previously set this value using the API, you can't exceed that maximum in the Admin Console. Setting a value over the API maximum results in an error.

1. Click **Create Rule**.

> **Note:** After you create a policy, you must close all active sessions for the new policy to take effect.

## Prompt for an additional factor when a user is outside the US

You may want a rule that requires all default Okta users to provide a password. But you also want all Okta users outside of the United States to provide both a password and another factor to access your app. You can use the default authentication policy’s catch-all rule that challenges all users to provide a password. Then, create another rule that challenges all users not in the United States to provide both a password and another factor each time that they sign in.

Configure another rule for the default authentication policy to prompt a user for an additional factor when the user is outside of the United States.

> **Note:**  You can add as many rules to the default authentication policy as you want. But remember that changes to the default authentication policy are applied to all new apps because it's a shared app policy.

### Select the default policy and add a rule

This example assumes that you've already [set up a Dynamic Zone](https://help.okta.com/okta_help.htm?type=oie&id=configure-network-zones). In this example, use a dynamic zone defined for IP addresses within the United States.

1. In the Admin Console, select **Security** > **Global Session Policy**.

1. Select **Default Policy** and then click **Add rule**. The Add Rule dialog appears.

1. Enter a **Rule name** such as **Prompt for an MFA factor when a user is outside the US**.

1. Configure IF conditions to define the authentication context for the rule. Select **Not in zone** from the **AND User’s IP is** dropdown list.

    > **Note:** You can click the **Go to Network Zones** link to access the gateway settings that enable your choice of access. A [network zone](https://help.okta.com/okta_help.htm?id=ext_Location_Zones) is a security perimeter used to limit or restrict access to a network. It can restrict access based on a single IP address, one or more IP address ranges, or a list of geolocations. You can also create network zones using the [Network Zones API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/NetworkZone/).

1. In the text box, enter the dynamic zone name and then select it when it appears in the list.

1. Configure THEN conditions to define the authentication experience. For this use case, leave the default of **Allowed** for **THEN Access is**.

1. For **Establish the user session with**, select **Any factor used to meet the Authentication Policy requirements**.

1. Ensure that MFA is **Required**. Users who sign in to your app from a non-US IP address are prompted for an additional factor.

1. Select how users are prompted for a secondary factor in a given session. For example, select **At every sign in** so that users are prompted at every time they sign in.

1. Configure the time settings for the rule.

1. Click **Create rule**.

>**Note**: You can use the [Applications](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/) and [Policies](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy) APIs to assign an app to an authentication policy. You need the app ID and the policy ID for this API request. Make a `PUT /api/v1/apps/{appId}/policies/{policyId}` request. No HTTP body is necessary for the PUT request. Then, to check that the assignment was successful, make a `GET /api/v1/apps/{appId}` request. The successful response contains information on the policy associated with the app.

## Prompt for a passwordless sign-in flow

In this example, create a policy that allows a specific group, **Full time employees**, for example, to sign in without using a password. This policy applies to users in that group only when they're connected to a corporate network. Before you create this global session policy, complete these steps:

* Create a network zone, **Corporate Network**, that defines the IP addresses used in your corporate office. See the [Network Zones API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/NetworkZone/) and [Network zones](https://help.okta.com/okta_help.htm?id=ext-network-zones).

* Ensure that you have [set up your Okta org for a password-optional use case](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-a-password-factor-only-use-case).

### Create a passwordless policy

1. In the Admin Console, select **Security** > **Global Session Policy**.

1. [Create a policy container](#create-the-policy-container) and assign it to the **Full time employees** group.

1. Click **Create policy and add rule**. The Add Rule dialog appears.

1. Enter a **Rule name**.

1. Configure IF conditions, which define the authentication context for the rule. For **IF User's IP is**, select **In zone**.

1. Select the **Corporate Network** zone.

1. Leave the default AND conditions.

1. Configure THEN conditions, which define the authentication experience for the rule. For this use case, leave the default of **Allowed** for **THEN Access is**.

1. For **Establish the user session with**, select **Any factor used to meet the Authentication Policy requirements**.

1. For **Multifactor authentication (MFA) is**, select **Required** so that users in the **Full time employees** group are prompted for a secondary factor before they’re granted access.

1. For **Users will be prompted for MFA**, select how users are prompted for a secondary factor in a given session. For this example, select **At every sign in**.

1. Configure the time settings for the rule.

1. Click **Create rule**.

## See also

* [Policies concept](/docs/concepts/policies/)
* [Policy API reference](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy)
* [Configure an access policy](/docs/guides/configure-access-policy/)
