---
title: Before you begin
---

An Okta Sign-On Policy helps you control who can sign in and how a user is allowed to sign in to Okta, including whether they are challenged for MFA and how long they are allowed to remain signed in before re-authenticating. Additionally, you can configure App sign-on policies for each application for extra levels of authentication that you may want performed before an application can be accessed.

Add a rule to the Okta Sign-On Policy, for example, when you need to make sure that only users who are inside your [corporate network](/docs/reference/api/policy/#network-condition-object) can access your application, or you need to exclude certain roles in your organization from accessing it. Add a rule for an App Sign-On Policy, for example, to prompt groups that are assigned to your app to re-authenticate after 60 minutes.

You can specify any number of policies and the order in which they are executed. If a policy in the list doesn't apply to the user trying to sign in, the system moves to the next policy. There is one required organization-wide policy named **Default**. By definition, the default policy applies to all users.

In addition to the default policy, which you can't delete, there may be another organization-wide policy named **Legacy** that is present only if you have already configured MFA. This policy reflects the MFA settings that were in place when you enabled your sign-on policy and ensures that no changes in MFA behavior occur unless you modify your policy. If needed, you can delete it.

> **Note:** See [Policies](/docs/concepts/policies) for an overview of the supported Okta policies and how they work.

## Configure sign-on policies for common scenarios

This guide provides step-by-step instructions to configure an Okta Sign-On Policy and an App Sign-On Policy for two of the most common scenarios:

* <GuideLink link="../prompt-factor-group">Prompt for an MFA factor for a certain group</GuideLink>
* <GuideLink link="../prompt-factor-outside-us">Prompt for an MFA factor when a user is outside the US</GuideLink>

This guide assumes that you:

* Have an Okta Developer Edition organization. Don't have one? [Create one for free](https://developer.okta.com/signup).
* Have [created groups](/docs/reference/api/groups/) in your org.
* Have an application that you want to add a sign-on policy to.
* Have configured a [dynamic network zone](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Security_Network).

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
