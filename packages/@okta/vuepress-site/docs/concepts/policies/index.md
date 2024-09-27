---
title: Policies
meta:
  - name: description
    content: An overview of what policies are and how you can use them.
---

## What are policies?

Policies are sets of rules that help you manage access to your apps and APIs. You can restrict access based on various conditions, such as user and group membership, device, location, or time. For accessing sensitive apps, you can require more authentication steps, like a push notification to a mobile device or an SMS one-time passcode.

Policies are evaluated when a request is made. Rules in the policies define permissions that determine whether the request is allowed or denied. Policies are stored in Okta as JSON documents.

## Policy use cases

Policies enable you to control who can access your app and how. They also help you control which apps can access information from your APIs.

There are many possibilities for policy use:

* Create authorization rules based on complex logic using conditions.
* Determine the extra levels of authentication that must be performed before a user accesses a specific app.
* Maintain a list of allowed users and deny access based on multiple conditions.
* Change the returned scopes of the access token and add claims to it and to the ID token using [inline hooks](/docs/concepts/inline-hooks/).
* Notify other systems in real time through an API when a user signs in.
* Use token scopes to look up user information in an external database or API, then add that data to the user's profile object.
* Monitor your org for identity threats like changes in entity risk or session context.
* Define authentication requirements when users enroll in authenticators, recover their passwords, and unlock their accounts.

### Control who can access your app

The [global session policy](#global-session-policies) controls the manner in which a user is allowed to sign in to Okta by identifying the user and specifies the length of their session.

You can [configure a global session policy](/docs/guides/configure-signon-policy/main/) to require any of the [factors you set up](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-authenticators). Then use the primary and secondary factor conditions in a rule to define which factors are evaluated. For example, add a rule that prompts for additional factors so only users who are inside your [corporate network](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule!path=0/conditions/network&t=request) have access.

### Control how users access your app

The [authentication policy](#authentication-policies) for each app determines what extra levels of authentication must be performed before a user can access an app. [Add a rule](/docs/guides/configure-access-policy), for example, to prompt groups that are assigned to your app to reauthenticate after 60 minutes.

A [password policy](#password-policies) also helps you control how users access your app. It determines the requirements for a user's password length and complexity, and it defines how often a user must change their password.

You can create an [authenticator enrollment policy](#authenticator-enrollment-policies). For example, prompt users to enroll in a factor the first time they sign in. You can also define conditions that trigger additional authentication challenges, like when users attempt to access your app from a country they've never signed in from before.

You can create custom forms for your sign-in flows with [profile enrollment policies](#profile-enrollment-policies). This allows you to progressively build user profiles by collecting profile data incrementally as end users engage with your app.

### Control which app can access what information from your APIs

When you want to restrict access to an API based on the calling app, you can create an [access policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AuthorizationServerPolicies/).

Access policies are also useful when you need scopes in addition to the [reserved scopes](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#scopes) that are created with any Okta authorization server. For example, to improve compatibility for an app, you can return additional profile information for the user by [creating custom scopes with corresponding claims](/docs/guides/customize-authz-server/main/#create-scopes) that tie them to a piece of user information.

When you want to restrict access to an API based on the calling app, you can create an [access policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AuthorizationServerPolicies/).

## How policies work

Policy settings for a particular [policy type](#policy-types) consist of one or more policy objects with one or more policy rules:

* **Policies** contain groups of resources requiring similar treatment, like apps with the same security characteristics or user groups with the same account setup requirements.
* **Rules** describe the conditions of policy behavior, such as requests from a geographical location or if the user is on a trusted network.

The combined policy conditions and rules determine when the policy is applied. As a best practice, place restrictive rules at the top of the priority list. Otherwise, you can create combinations of conditions for different scenarios.

Different policy types control the settings for different operations. All policy types share a common framework, message structure, and API, but have different policy settings and rule data. When a policy is retrieved, such as when the user attempts to sign in to Okta, then policy evaluation takes place:

* Each policy of the appropriate type is considered in the order that the policies appear in the policy list.
* Each condition associated with the policy is evaluated:
  * If one or more conditions can't be met, then the next policy in the list is considered.
  * If the conditions can be met, then each rule associated with the policy is considered in the order that the rules appear in the rules list.
* Each condition associated with a given rule is evaluated:
  * If all the conditions associated with a rule are met, then the settings contained in the rule and in the associated policy are applied to the user.
  * If none of the policy rules have conditions that can be met, then the next policy in the list is considered.

> **Note:** Policies that have no rules aren't considered during evaluation and are never applied.

### Default policies

A default policy is automatically created for each type of policy. This ensures that there's always a policy to apply to a user in all situations. Default policies are required, and you can't delete them. They're always the last policy in the priority order, and any added policies of the same type have higher priority.

Default policies also always have one default rule that you can't delete, and that rule is always the last rule in the priority order. When you add rules to the default policy, they have a higher priority than the default rule.

The [`system` attribute](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=1/system&t=request) determines whether a system or an admin created the policy. Default policies and default rules are the only policies and rules that have this attribute. The `system` attribute set to `TRUE` on default policies or rules indicates that those policies and rules are system-created policies, and you can't delete them.

## Policy types

You can configure policies for sign-on, passwords, enrollment, and API access. You can also use IdP discovery policies to create routing rules.

### Sign-on policies

Sign-on policies and rules enforce policies and rules so users sign in with the right level of access that you provide. [Global session policies](#global-session-policies) and [authentication policies](#authentication-policies) together determine the level of confidence that the user signing in is also the person who owns the account.

#### Global session policies

A [global session policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy) controls who has access and how a user gains access to Okta. See [Global session policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-osop) and [Configure a global session policy and an authentication policy](/docs/guides/configure-signon-policy/main/).

#### Authentication policies

An [authentication policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy) determines the extra levels of authentication performed before a user can access an app, such as enforcing factor requirements. See [Authentication policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop).

You can create an authentication policy specifically for the app or create a few policies and [share them](https://help.okta.com/okta_help.htm?type=oie&id=ext-share-auth-policy) across multiple apps.

Use the [Authentication Policies page](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-auth-policy) to modify an app's sign-on policy or switch to a different policy. See [Configure a global session policy and an authentication policy](/docs/guides/configure-signon-policy/main/). Also, you can [merge duplicate authentication policies with identical rules](https://help.okta.com/okta_help.htm?type=oie&id=ext-merge-auth-policies) to simplify policy management.

##### Okta account management policy

<ApiLifecycle access="ie" />
<ApiLifecycle access="ea" />

The Okta account management policy is a type of authentication policy. It defines requirements when users enroll in authenticators, recover their passwords, and unlock their accounts. Its rule-based framework lets you enforce phishing resistance throughout the user journey, from onboarding to authentication and recovery.

The Okta account management policy appears in GET calls to the `/policies` endpoint. However, it's read-only. You can't create, update, or delete the policy. You have to disable the feature if you want to stop using it. Most importantly, you can't assign it to apps. This policy applies to Okta account management actions only.

You can use the Policy API to [manage the rules of the policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule).

See [Configure an Okta account management policy](/docs/guides/okta-account-management-policy/main/) for more details.

See [Okta account management policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-account-management-policy) for details about configuring the policy in the Admin Console.

### Password policies

A [password policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy) determines the requirements for a user's password length and complexity, and how often a user must change their password. Okta provides a default policy to enforce the use of strong passwords.

See [Configure the password authenticator](https://help.okta.com/okta_help.htm?type=oie&id=ext-configure-password) for more information on passwords as an authenticator factor.

### Enrollment policies

Enrollment policies determine how users enroll an authenticator and what attributes to collect when validating users.

#### Authenticator enrollment policies

An [authenticator enrollment policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy) controls how users enroll an authenticator. The policy controls which of the multifactor authentication (MFA) [methods](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-authenticators) are available for a user and when a user can enroll in a particular factor.

Enable factors in your Okta org by creating a policy with one or more authenticators, and then assigning that policy to your app. See [Authenticators](/docs/guides/authenticators-overview/main/) to learn how to increase the security of your app by requiring a user to verify their identity in more than one way.

> **Note:** In Identity Engine, the Multifactor (MFA) Enrollment Policy name has changed to [authenticator enrollment policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy).

See [Authenticator enrollment policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-mfa-enrol-policies) for additional information on MFA authentication, enrollment policies, and rules.

#### Profile enrollment policies

The [Profile enrollment policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy) collects the attributes required to validate users when they attempt to access your app. Use this policy for [self-service registration](/docs/guides/oie-embedded-sdk-use-case-self-reg/android/main/) or for [progressive enrollment](https://help.okta.com/okta_help.htm?type=oie&id=ext-pe-policies).

With self-service registration flows, users register and activate their profiles by clicking a sign-up link in the Sign-In Widget or through a custom-embedded authentication solution.

With progressive enrollment flows, you can capture the minimum user information required to create a profile and then continually build out those user profiles during subsequent sign-in operations. You control what information is collected, validate those input values, and [trigger inline hooks](/docs/guides/registration-inline-hook/nodejs/main/).

### Identity Threat Protection policies

<ApiLifecycle access="ie" />

Identity Threat Protection with Okta AI is an identity threat solution that combines current security practices with continuous real-time risk assessment. See [Identity Threat Protection with Okta AI](https://help.okta.com/okta_help.htm?type=oie&id=ext-itp-overview). Identity Threat Protection uses the entity risk policy and Post auth session evaluation for these threat evaluations.

* [Entity risk policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy): The entity risk policy monitors your org for entity risk changes related to identity-based threats. For Admin Console tasks and further information, see [Entity risk policy](https://help.okta.com/okta_help.htm?type=oie&id=csh-entity-risk-policy).

* [Post auth session evaluation](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy): Post auth session evaluation monitors user sessions on your org to identify changes in session context. For Admin Console tasks and further information, see [Post auth session evaluation](https://help.okta.com/okta_help.htm?type=oie&id=csh-continuous-access-evaluation).

### API access policies

An [OAuth Authorization Policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AuthorizationServerPolicies/) manages authorization between clients and Okta. The access policy is specific to a particular client app. The rules it contains define particular token lifetimes for a given combination of grant type, user, and scope.

### Route to other identity providers

The [IdP Discovery Policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy) determines where to route users when they attempt to sign in to your org. You can route users to various [identity providers](/docs/guides/add-an-external-idp/).

> **Note:** This policy isn't for performing authentication or authorization. It's used only to determine where a user is routed. You can't control access with an IdP discovery policy.

For more information about IdP routing rules and use cases, see [Identity Provider routing rules](https://help.okta.com/okta_help.htm?type=oie&id=ext_Identity_Provider_Discovery).

## Policy evaluation based on authentication pipelines

Policy evaluation is different when you use the AuthN authentication pipeline versus when you use the Identity Engine authentication pipeline:

|                               | Sign on policy | Multifactor Authentication (MFA) |
| :---------------------------- | :------------------------------ | :--------- |
| AuthN authentication pipeline | Uses the [Okta sign-on policy](/docs/guides/archive-configure-signon-policy/main/) only when making calls using the SDKs or the Classic Authentication API. | Set MFA at the org level using the [Okta sign-on policy](/docs/guides/archive-configure-signon-policy/main/#prompt-for-an-mfa-factor-for-a-certain-group) for apps that use the Classic Authentication API. |
| Identity Engine authentication pipeline | Evaluates both the global session policy and authentication policies when authenticating users. | [Set MFA](/docs/guides/configure-signon-policy/main/) at either the org level or at the app level. |

### Best Practices

If you have both Classic Engine and Identity Engine apps:

* Create group-based sign-on policy rules that tightly couple apps to corresponding groups. For example, create a single-page app and then a corresponding group for it that evaluates sign-on policies.
* Standard risk apps should use one-factor authentication and high risk apps should use two-factor authentication that is defined in a sign-on policy. This should help when you need to lower security for Okta FastPass apps and not disturb the high-risk apps that are still on Classic Engine, but need MFA.
