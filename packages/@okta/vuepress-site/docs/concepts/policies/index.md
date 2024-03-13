---
title: Policies
meta:
  - name: description
    content: An overview of what policies are and how you can use them.
---

## What are policies?

Policies are a set of rules that help you manage access to your applications and APIs. You can restrict access based on various conditions, such as user and group membership, device, location, or time. You can also require more authentication steps when accessing sensitive applications, such as a push notification to a mobile device or an SMS one-time passcode.

Policies are evaluated when a request is made. Rules in the policies define permissions that determine whether the request is allowed or denied. Policies are stored in Okta as JSON documents.

## Policy use cases

Policies enable you to control who can access your app, how users access your app, and which applications can access what information from your APIs.

There are many possibilities for policy use:

* Create authorization rules based on complex logic using conditions.
* Determine the extra levels of authentication that must be performed before a user accesses a specific application.
* Determine the extra levels of authentication that must be performed before a user accesses a specific application.
* Maintain a list of allowed users and deny access based on multiple conditions.
* Change the returned scopes of the access token and add claims to it and to the ID token using [inline hooks](/docs/concepts/inline-hooks/).
* Notify other systems in real time through an API when a user signs in.
* Use token scopes to look up user information in an external database or API, then add that data to the user's profile object.
* Notify other systems in real time through an API when a user signs in.
* Use token scopes to look up user information in an external database or API, then add that data to the user's profile object.

### Control who can access your app

The [global session policy](#global-session-policies) controls the manner in which a user is allowed to sign in to Okta by identifying the user and specifies the length of their session.

You can [configure a global session policy](/docs/guides/configure-signon-policy/main/) to require any of the [factors you set up](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-authenticators). Then use the primary and secondary factor conditions in a rule to define which factors are evaluated. For example, add a rule that prompts for additional factors so only users who are inside your [corporate network](/docs/reference/api/policy/#network-condition-object) have access.

### Control how users access your app

The [authentication policy](#authentication-policies) for each application determines what extra levels of authentication must be performed before a user can access an application. [Add a rule](/docs/guides/configure-access-policy), for example, to prompt groups that are assigned to your app to reauthenticate after 60 minutes.

A [password policy](#password-policies) also helps you control how users access your app. It determines the requirements for a user's password length and complexity, and the frequency with which a user must change their password.

You can also create an [authenticator enrollment policy](#authenticator-enrollment-policies). For example, prompt users to enroll in a factor the first time they sign in. You can also define conditions that trigger additional authentication challenges, like when users attempt to access your app from a new country.

You can create custom forms for your sign-in flows with [profile enrollment policies](#profile-enrollment-policies) to progressively build user profiles by collecting profile data incrementally as end users engage with your app.

### Control which application can access what information from your APIs

When you want to restrict access to an API based on the calling application, you can create an [access policy](/docs/reference/api/authorization-servers/#policy-object).

Access policies are also good when you need scopes in addition to the [reserved scopes](/docs/reference/api/oidc/#scopes) that are created with any Okta authorization server. For example, to improve compatibility for an application, you can return additional profile information for the user by [creating custom scopes with corresponding claims](/docs/guides/customize-authz-server/main/#create-scopes) that tie them to a piece of user information.

When you want to restrict access to an API based on the calling application, you can create an [access policy](/docs/reference/api/authorization-servers/#policy-object).

## How policies work

Policy settings for a particular [policy type](#policy-types) consist of one or more Policy objects with one or more policy rules:

* **Policies** contain groups of resources requiring similar treatment, like apps with the same security characteristics or user groups with the same account setup requirements
* **Rules** describe the conditions of policy behavior, such as requests from a geographical location or if the user is on a trusted network.

The conditions of a policy and a rule combined determine whether to apply a policy. As a best practice, restrictive rules should be placed at the top of the priority list. Beyond that, you can create combinations of conditions for multiple scenarios. There’s no limit to the number of rules your policies can have.

Different policy types control settings for different operations. All policy types share a common framework, message structure, and API, but have different policy settings and rule data. When a policy is retrieved, such as when the user attempts to sign in to Okta, then policy evaluation takes place:

* Each policy of the appropriate type is considered in the order that the policies appear in the policy list.
* Each condition associated with the policy is evaluated:
  * If one or more conditions can't be met, then the next policy in the list is considered.
  * If the conditions can be met, then each rule associated with the policy is considered in the order that the rules appear in the rules list.
* Each condition associated with a given rule is evaluated:
  * If all the conditions associated with a rule are met, then the settings contained in the rule and in the associated policy are applied to the user.
  * If all the conditions associated with a rule are met, then the settings contained in the rule and in the associated policy are applied to the user.
  * If none of the policy rules have conditions that can be met, then the next policy in the list is considered.

> **Note:** Policies that have no rules aren't considered during evaluation and are never applied.

### Default policies

A default policy is automatically created for each type of policy. This ensures that there’s always a policy to apply to a user in all situations. Default policies are required, and you can't delete them. They’re always the last policy in the priority order, and any added policies of the same type have higher priority.

Default policies also always have one default rule that you can't delete, and that rule is always the last rule in the priority order. When you add rules to the default policy, they have a higher priority than the default rule.

The [`system` attribute](/docs/reference/api/policy/#policy-object) determines whether a system or a user created the policy. Default policies and default rules are the only policies and rules that have this attribute. The `system` attribute set to `TRUE` on default policies or rules indicates that those policies and rules are system-created policies, and you can't delete them.

## Policy types

You can configure policies for sign-on, passwords, enrollment, and API access. You can also use IdP discovery policies to create routing rules.

### Sign-on policies

[Sign-on policies and rules enforce policies and rules so users sign in with the right level of access that you provide. [Global session policies](#global-session-policies) and [authentication policies](#authentication-policies) together determine the level of confidence that the user signing in is also the person who owns the account.

#### Global session policies

A [global session policy](/docs/reference/api/policy/#global-session-policy) controls who has access and how a user gains access to Okta. See [Global session policies](https://help.okta.com/oie/en-us/content/topics/identity-engine/policies/about-okta-sign-on-policies.htm) and [Configure a global session policy and an authentication policy](/docs/guides/configure-signon-policy/main/).

#### Authentication policies

An [authentication policy](/docs/reference/api/policy/#authentication-policy) determines the extra levels of authentication performed before a user can access an application, such as enforcing factor requirements. See [Authentication policies](https://help.okta.com/oie/en-us/content/topics/identity-engine/policies/about-app-sign-on-policies.htm).

You can create an authentication policy specifically for the app or create a few policies and [share them](https://help.okta.com/okta_help.htm?type=oie&id=ext-share-auth-policy) across multiple apps.

Use the [Authentication Policies page](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-auth-policy) to modify an app's sign-on policy or switch to a different policy. See [Configure a global session policy and an authentication policy](/docs/guides/configure-signon-policy/main/). Also, you can [merge duplicate authentication policies with identical rules](https://help.okta.com/okta_help.htm?type=oie&id=ext-merge-auth-policies) to simplify policy management.

### Password policies

A [password policy](/docs/reference/api/policy/#password-policy) determines the requirements for a user's password length and complexity, and how often a user must change their password. Okta provides a default policy to enforce the use of strong passwords.

See [Configure the password authenticator](https://help.okta.com/oie/en-us/content/topics/identity-engine/authenticators/configure-password.htm) for more information on passwords as an authenticator factor.

### Enrollment policies

Enrollment policies determine how users enroll an authenticator and what attributes to collect when validating users.

#### Authenticator enrollment policies

An [authenticator enrollment policy](/docs/reference/api/policy/#authenticator-enrollment-policy) controls how users enroll an authenticator. The policy controls which of the multifactor authentication (MFA) [methods](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-authenticators) are available for a user and when a user can enroll in a particular factor.

Enable factors in your Okta org by creating a policy with one or more authenticators, and then assigning that policy to your app. See [Authenticators](/docs/guides/authenticators-overview/main/) to learn how to increase the security of your app by requiring a user to verify their identity in more than one way.

> **Note:** In Identity Engine, the Multifactor (MFA) Enrollment Policy name has changed to [authenticator enrollment policy](/docs/reference/api/policy/#authenticator-enrollment-policy).

See [Authenticator enrollment policy](https://help.okta.com/oie/en-us/content/topics/identity-engine/policies/about-mfa-enrollment-policies.htm) for additional information on MFA authentication, enrollment policies, and rules.

#### Profile enrollment policies

The [Profile enrollment policy](/docs/reference/api/policy/#profile-enrollment-policy) collects the attributes required to validate users when they attempt to access your app. Use this policy for [self-service registration](/docs/guides/oie-embedded-sdk-use-case-self-reg/android/main/) or for [progressive enrollment](https://help.okta.com/okta_help.htm?type=oie&id=ext-pe-policies).

With self-service registration flows, users register and activate their profiles by clicking a sign-up link in the Sign-In Widget or through a custom-embedded authentication solution.

With progressive enrollment flows, you can capture the minimum user information required to create a profile and then continually build out those user profiles during subsequent sign-in operations. You control what information is collected, validate those input values, and [trigger inline hooks](/docs/guides/registration-inline-hook/nodejs/main/).

### API access policies

An [OAuth Authorization Policy](/docs/reference/api/authorization-servers/#policy-object) manages authorization between clients and Okta. The access policy is specific to a particular client application. The rules it contains define particular token lifetimes for a given combination of grant type, user, and scope.

### Route to other identity providers

The [IdP Discovery Policy](/docs/reference/api/policy/#idp-discovery-policy) determines where to route users when they attempt to sign in to your org. You can route users to various [identity providers](/docs/guides/add-an-external-idp/).

> **Note:** This policy isn't for performing authentication or authorization. It's used only to determine where a user is routed. You can't control access with an IdP discovery Policy.

For more information about IdP routing rules and use cases, see [Identity Provider routing rules](https://help.okta.com/oie/en-us/content/topics/security/identity_provider_discovery.htm).

## Policy evaluation based on authentication pipelines

Policy evaluation is different when you use the AuthN authentication pipeline versus when you use the Identity Engine authentication pipeline:

|                               | Sign on policy | Multifactor Authentication (MFA) |
| :---------------------------- | :------------------------------ | :--------- |
| AuthN authentication pipeline | Uses the [Okta sign-on policy](/docs/guides/archive-configure-signon-policy/main/) only when making calls using the SDKs or the Classic Authentication API. | Set MFA at the org level using the [Okta sign-on policy](/docs/guides/archive-configure-signon-policy/main/#prompt-for-an-mfa-factor-for-a-certain-group) for apps that use the Classic Authentication API. |
| Identity Engine authentication pipeline | Evaluates both the global session policy and authentication policies when authenticating users. | [Set MFA](/docs/guides/configure-signon-policy/main/) at either the org level or at the application level. |

### Best Practices

If you have both Classic Engine applications and Identity Engine applications, consider the following:

* You should create group-based sign-on policy rules that tightly couple applications to corresponding groups. For example, create a single-page application and then a corresponding group for it that evaluates sign-on policies.
* Standard risk apps should use one-factor authentication and high risk apps should use two-factor authentication that is defined in a sign-on policy. This should help when you need to lower security for Okta FastPass apps and not disturb the high-risk apps that are still on Classic Engine, but need MFA.
