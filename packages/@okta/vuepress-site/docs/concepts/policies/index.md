---
title: Policies
meta:
  - name: description
    content: An overview of what policies are and how you can use them.
---
## What are policies

Policies help you manage access to your applications and APIs. You can restrict access based on a number of conditions such as user and group membership, device, location, or time. You can also require more authentication steps for access to sensitive applications, such as confirmation of a push notification to a mobile device or re-authentication through an SMS one-time passcode.

Policies are evaluated when a requeset is made. Rules in the policies define permissions that determine whether the request is allowed or denied. Policies are stored in Okta as JSON documents.

There are many possibilities for policy use:

* Create authorization rules based on complex logic using conditions
* Determine extra levels of authentication that must be performed before a specific Okta application can be accessed
* Maintain a white-list of users and deny access based on multiple conditions
* Change the returned scopes of the access token and add claims to it and to the ID token using [inline hooks](/docs/concepts/inline-hooks/)
* Notify other systems through an API when a sign in happens in real-time
* Use the scopes of a token to look up user information in an external database or API, then add that data to the user's profile object.

Okta supports the following policy types:

* [Okta Sign On Policy](/docs/reference/api/policy/#okta-sign-on-policy) &mdash; Controls who can sign in and how a user is allowed to sign in to Okta, including whether they are challenged for MFA and how long they are allowed to remain signed in before re-authenticating.

* [App Sign On Policy](https://help.okta.com/en/prod/okta_help_CSH.htm#App_Based_Signon) &mdash; Determines the extra levels of authentication that you may want performed before an application can be accessed.

* [Okta MFA Policy](/docs/reference/api/policy/#multifactor-mfa-enrollment-policy) &mdash; Controls which MFA methods are available for a user, as well as when a user may enroll in a particular factor.

* [Password Policy](/docs/reference/api/policy/#password-policy) &mdash; Determines the requirements for a user's password length and complexity, as well as the frequency with which a password must be changed. This policy also governs the recovery operations that may be performed by the user, including change password, reset (forgot) password, and self-service password unlock.

* [IdP Discovery Policy](/docs/reference/api/policy/#idp-discovery-policy) &mdash; Determines where to route users when they are attempting to sign in to your org. Users can be routed to a variety of [identity providers](/docs/guides/add-an-external-idp/).

> **Note:** This policy isn't for performing authentication or authorization. It is used only to determine where a user should be routed. You can't control access with an IdP Discovery Policy.

* [OAuth Authorization Policy](/docs/reference/api/authorization-servers/#policy-object) &mdash; Specific to a particular client application and the rules that it contains define particular token lifetimes for a given combination of grant type, user, and scope.

## Policy use cases

**Control who can access your app**

The Okta Sign On Policy controls the manner in which a user is allowed to sign in to Okta. For example, add a rule to the Okta Sign On Policy when you need to make sure that only users who are inside your [corporate network](/docs/reference/api/policy/#network-condition-object) can access your application, or you need to exclude certain roles in your organization from accessing it.

**Control how users access your app**

In addition to the Okta Sign On Policy, there is a sign-on policy for each application that determines the extra levels of authentication that you may want performed before an application can be accessed. [Add a rule](/docs/guides/configure-access-policy), for example, to prompt groups that are assigned to your app to re-authenticate after 60 minutes.

You can also control how users access your app by creating an MFA enrollment policy. You may want to prompt users to enroll in a factor the first time that they sign in or to define conditions that trigger additional authentication challenges, like when users attempt to access your app from a new country.

A password policy also helps you control how users access your app. It determines the requirements for a user's password length and complexity, as well as the frequency with which a password must be changed.

## Control which application can access what information from your APIs

When you want to restrict access to an API based on the calling application, you can create an [access policy](/docs/reference/api/authorization-servers/#policy-object) to do that. Access policies are also good when you need scopes in addition to the [reserved scopes](/docs/reference/api/oidc/#scopes) that are created with any Okta authorization server. For example, when you want to improve compatibility for an application, you can return additional profile information for the user by [creating custom scopes with corresponding claims](/docs/guides/customize-authz-server/create-scopes/) that tie them to a piece of user information.

## How policies work

Policy settings for a particular policy type consist of one or more Policy objects, each of which contains one or more policy rules. Policies and rules contain conditions that determine whether they are applicable to a particular user at a particular time. Okta combines the conditions of a policy and the conditions of a rule to determine whether a policy is applied. Policies generally consist of large elements that can be applied to many users, such as a minimum password length. Rules consist of conditions such as place and circumstance, like geographical location or whether the user is on or off a company network.

Different policy types control settings for different operations. All policy types share a common framework, message structure and API, but have different policy settings and rule data.

When a policy is retrieved, for example when the user attempts to sign in to Okta, then policy evaluation takes place:

* Each policy of the appropriate type is considered in the order that the policies appear in the policy list.
* Each condition associated with the policy is evaluated:
  * If one or more conditions can't be met, then the next policy in the list is considered.
  * If the conditions can be met, then each rule associated with the policy is considered in the order that the rules appear in the rules list.
* Each condition associated with a given rule is evaluated:
  * If all of the conditions associated with a rule are met, then the settings contained in the rule and in the associated policy are applied to the user.
  * If none of the policy rules have conditions that can be met, then the next policy in the list is considered.

> **Note:** Policies that have no rules aren't considered during evaluation and are never applied.

## Default policy

A default policy is automatically created for each type of policy. This ensures that there is always a policy to apply to a user in all situations. Default policies are required and can't be deleted. They are always the last policy in the priority order and any added policies of the same type have higher priority. Default policies also always have one default rule that can't be deleted, and that rule is always the last rule in the priority order. When you add rules to the default policy, they have a higher priority than the default rule. The `system` attribute is set to `TRUE` on system policies, which flags those policies that can't be deleted.
