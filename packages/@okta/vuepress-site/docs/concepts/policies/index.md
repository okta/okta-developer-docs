---
title: Policies
meta:
  - name: description
    content: An overview of what policies are and how you can use them.
---
## What are policies

Policies help you manage access to your applications and APIs. You can restrict access based on a number of conditions such as user and group membership, device, location, or time. You can also require more authentication steps for access to sensitive applications, such as confirmation of a push notification to a mobile device or re-authentication through an SMS one-time passcode.

Policies are evaluated when a request is made. Rules in the policies define permissions that determine whether the request is allowed or denied. Policies are stored in Okta as JSON documents.

There are many possibilities for policy use:

* Create authorization rules based on complex logic using conditions.
* Determine extra levels of authentication that must be performed before a user accesses a specific Okta application.
* Maintain a list of allowed users and deny access based on multiple conditions.
* Change the returned scopes of the access token and add claims to it and to the ID token using [inline hooks](/docs/concepts/inline-hooks/).
* Notify other systems in real-time through an API when a user signs in.
* Use the scopes of a token to look up user information in an external database or API, then add that data to the user's profile object.
* Monitor your org for identity threats like changes in entity risk or session context.

### Default policies

A default policy is automatically created for each type of policy. This ensures that there is always a policy to apply to a user in all situations. Default policies are required, and you can't delete them. They are always the last policy in the priority order and any added policies of the same type have higher priority. Default policies also always have one default rule that you can't delete, and that rule is always the last rule in the priority order. When you add rules to the default policy, they have a higher priority than the default rule. The [`system` attribute](/docs/reference/api/policy/#policy-object) determines whether a policy or a rule is created by a system or by a user. Default policies and default rules are the only policies and rules that have this attribute. The `system` attribute set to `TRUE` on default policies or rules indicates that those policies and rules are system-created policies and you can't delete them.

## Policy types

Okta supports the following policy types:

### Sign-on policies

Authentication policies are built on IF/THEN rules for app access. IF conditions define the authentication context, like the IP address from where a user is signing in. THEN conditions define the authentication experience, like which assurance factors are required to access an app.

Assurance refers to a level of confidence that the user signing in is also the person who owns the account. This level is measured by the use of one or more authenticators and the [types of factors configured](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-authenticators). For example, a user who authenticates with a banking app using both a knowledge factor (a password) and a possession factor (an SMS code) has a higher assurance level than a user who authenticates with a shopping app using only one factor.

Okta Identity Engine requires that an assurance specified in the global session policy and in the authentication policy be satisfied before a user can access an app. This is a change from the traditional model of authentication, which evaluates one policy depending on whether the user signs in to the org or directly through the app. When evaluating whether a user is granted access, Identity Engine inspects the context (user itself, device, network, and risk) that the user brings, first at org level and then at app level. It then determines the authentication methods that are offered based on both Global Session Policies and authentication policies.

A global session policy and an authentication policy control the authentication assurance part of your requirements. Other policies, such as an authenticator enrollment policy, password policy, profile policy, and so on, work together to determine the overall authentication experience.

* [Global session policy](/docs/reference/api/policy/#global-session-policy): Supplies the context necessary for the user to advance to the next authentication step after they are identified by Okta. Global Session Policies control who can have access, and how a user gains access to Okta, including whether they are challenged for additional factors and how long they are allowed to remain signed in before re-authenticating.

  All orgs have a default global session policy that applies to all users. The policy allows access with a password, IdP, or any factor allowed by the authentication policies. You can change this condition or add higher priority rules to the default policy. You can also create new policies and prioritize them over the default. See [Configure a global session policy and an authentication policy](/docs/guides/configure-signon-policy/main/).

* [Authentication policy](/docs/reference/api/policy/#authentication-policy): Determines the extra levels of authentication that you want performed before a user can access an application, such as enforcing factor requirements. Every app in your org has one authentication policy, and multiple apps can share a policy. Okta provides some preset policies with standard sign-on requirements, including a default policy automatically assigned to new apps. The default policy allows access with any two factors.

  You can create an authentication policy specifically for the app or create a few policies and [share them](https://help.okta.com/okta_help.htm?type=oie&id=ext-share-auth-policy) across multiple apps. If you decide later to change an app's sign-on requirements, you can modify its policy or switch to a different policy using the [Authentication Policies page](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-auth-policy). See [Configure a global session policy and an authentication policy](/docs/guides/configure-signon-policy/main/). Additionally, you can [merge duplicate authentication policies with identical rules](https://help.okta.com/okta_help.htm?type=oie&id=ext-merge-auth-policies) to simplify policy management.

### Password policy

* [Password policy](/docs/reference/api/policy/#password-policy): Determines the requirements for a user's password length and complexity, as well as how often a user must change their password. Okta provides a default policy to enforce the use of strong passwords, but you can also create additional policies that are less or more restrictive and apply them to users based on group membership. This policy also governs the recovery operations that the user may perform, including change password, reset (forgot) password, and self-service password unlock.

### Enrollment policies

* [Authenticator enrollment policy](/docs/reference/api/policy/#authenticator-enrollment-policy): Controls how users enroll an authenticator. The policy controls which multifactor authentication (MFA) [methods](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-authenticators) are available for a user, as well as when a user may enroll in a particular factor. Enable factors in your Okta org by creating a policy with one or more authenticators, and then assigning that policy to your app. See [Authenticators](https://developer.okta.com/docs/guides/authenticators-overview/main/) to learn how to increase the security of your app by requiring a user to verify their identity in more than one way.

   > **Note:** In Identity Engine, the Multifactor (MFA) Enrollment Policy name has changed to [authenticator enrollment policy](/docs/reference/api/policy/#authenticator-enrollment-policy).

* [Profile enrollment policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-pe-policies): Collects the attributes required to validate end users when they attempt to access your app. You can use this policy for [self-service registration](/docs/guides/oie-embedded-sdk-use-case-self-reg/android/main/) or for [progressive enrollment](https://help.okta.com/okta_help.htm?type=oie&id=ext-pe-policies). With self-service registration flows, end users can register and activate their profiles by clicking a sign-up link in the Sign-In Widget or through a custom embedded authentication solution. With progressive enrollment flows, you can capture the minimum user information required to create a profile and then continually build out those user profiles during subsequent sign-in operations. You can control what information is collected, validate those input values, and [trigger inline hooks](/docs/guides/registration-inline-hook/nodejs/main/).

### Identity Threat Protection policies

<ApiLifecycle access="ie" /> <ApiLifecycle access="ea" />

Identity Threat Protection with Okta AI is an identity threat solution that combines current security practices with continuous real-time risk assessment. See [Identity Threat Protection with Okta AI](https://help.okta.com/okta_help.htm?type=oie&id=ext-itp-overview). Identity Threat Protection uses the entity risk policy and Continuous Access Evaluation for these threat evaluations.

* [Entity risk policy](/docs/reference/api/policy/#entity-risk-policy): The entity risk policy monitors your org for entity risk changes related to identity-based threats. For Admin Console tasks and further information, see [Entity risk policy](https://help.okta.com/okta_help.htm?type=oie&id=csh-entity-risk-policy).

* [Continuous Access Evaluation](/docs/reference/api/policy/#continuous-access-evaluation-cae-policy): Continuous Access Evaluation policies monitor user sessions on your org to identify changes in session context. For Admin Console tasks and further information, see [Continuous Access Evaluation](https://help.okta.com/okta_help.htm?type=oie&id=csh-continuous-access-evaluation).

### API access policy

* [OAuth Authorization Policy](/docs/reference/api/authorization-servers/#policy-object): Manages authorization between clients and Okta. The access policy is specific to a particular client application, and the rules that it contains define particular token lifetimes for a given combination of grant type, user, and scope.

### Routing rule

* [IdP Discovery Policy](/docs/reference/api/policy/#idp-discovery-policy): Determines where to route users when they attempt to sign in to your org. You can route users to a variety of [identity providers](/docs/guides/add-an-external-idp/).

  > **Note:** This policy isn't for performing authentication or authorization. It's used only to determine where a user is routed. You can't control access with an IdP Discovery Policy.

## Policy use cases

**Control who can access your app**

The global session policy controls the manner in which a user is allowed to sign in to Okta. It identifies the user and specifies the length of their session. You can [configure a global session policy](/docs/guides/configure-signon-policy/main/) to require any of the [factors that you set up](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-authenticators). Then use the primary and secondary factor conditions in a rule to define which factors are evaluated. For example, add a rule that prompts for additional factors when you want only users who are inside your [corporate network](/docs/reference/api/policy/#network-condition-object) to have access.

**Control how users access your app**

In addition to the global session policy, there is an authentication policy for each application that determines the extra levels of authentication that you may want performed before a user can access an application. [Add a rule](/docs/guides/configure-access-policy), for example, to prompt groups that are assigned to your app to re-authenticate after 60 minutes.

A password policy also helps you control how users access your app. It determines the requirements for a user's password length and complexity, as well as the frequency with which a user must change their password.

You can control how users access your app by creating an authenticator enrollment policy. You may want to prompt users to enroll in a factor the first time that they sign in or to define conditions that trigger additional authentication challenges, like when users attempt to access your app from a new country. Additionally, you might want to create custom forms for your sign-in flows and use profile enrollment policies to progressively build user profiles by collecting profile data incrementally as end users engage with your app.

**Control which application can access what information from your APIs**

When you want to restrict access to an API based on the calling application, you can create an [access policy](/docs/reference/api/authorization-servers/#policy-object) to do that. Access policies are also good when you need scopes in addition to the [reserved scopes](/docs/reference/api/oidc/#scopes) that are created with any Okta authorization server. For example, when you want to improve compatibility for an application, you can return additional profile information for the user by [creating custom scopes with corresponding claims](/docs/guides/customize-authz-server/main/#create-scopes) that tie them to a piece of user information.

### How policies work

Policy settings for a particular policy type consist of one or more Policy objects, each of which contains one or more policy rules. Policies contain groups of resources that require similar treatment, such as apps with the same security characteristics or user groups with the same account setup requirements. Rules describe the conditions of policy behavior, such as requests from a geographical location or whether the user is on or off a trusted network. Okta combines the conditions of a policy and the conditions of a rule to determine whether a policy is applied.

As a best practice, restrictive rules should be placed at the top of the priority list. Beyond that, you can create combinations of conditions for multiple scenarios. There is no limit to the number of rules that your policies can have.

Different policy types control settings for different operations. All policy types share a common framework, message structure and API, but have different policy settings and rule data. When a policy is retrieved, for example when the user attempts to sign in to Okta, then policy evaluation takes place:

* Each policy of the appropriate type is considered in the order that the policies appear in the policy list.
* Each condition associated with the policy is evaluated:
  * If one or more conditions can't be met, then the next policy in the list is considered.
  * If the conditions can be met, then each rule associated with the policy is considered in the order that the rules appear in the rules list.
* Each condition associated with a given rule is evaluated:
  * If all of the conditions associated with a rule are met, then the settings contained in the rule and in the associated policy are applied to the user.
  * If none of the policy rules have conditions that can be met, then the next policy in the list is considered.

> **Note:** Policies that have no rules aren't considered during evaluation and are never applied.

## Policy evaluation based on authentication pipelines

Policy evaluation is different when you use the AuthN authentication pipeline versus when you use the Identity Engine authentication pipeline:

|                               | Sign on policy | Multifactor Authentication (MFA) |
| :---------------------------- | :------------------------------ | :--------- |
| AuthN authentication pipeline | Uses the [Okta Sign-On Policy](/docs/guides/archive-configure-signon-policy/main/) only when making calls using the SDKs or the Classic Authentication API. | Set MFA at the org level using the [Okta Sign-On Policy](/docs/guides/archive-configure-signon-policy/main/#prompt-for-an-mfa-factor-for-a-certain-group) for apps that use the Classic Authentication API. |
| Identity Engine authentication pipeline | Evaluates both the global session policy and authentication policies when authenticating users. | [Set MFA](/docs/guides/configure-signon-policy/main/) at either the org level or at the application level. |

### Suggestions when you have both Classic Engine and Identity Engine applications

* Create group-based sign-on policy rules that tightly couple applications to corresponding groups. For example, create a single-page application and then a corresponding group for it that evaluates sign-on policies.

* Standard risk apps should use one-factor authentication and high risk apps should use two-factor authentication that is defined in a sign-on policy. This should help when you need to lower security for FastPass apps and not disturb the high risk apps that are still on Classic Engine, but need MFA.
