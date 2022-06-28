---
title: Configure profile enrollment policies
excerpt: How to configure profile enrollment policies.
layout: Guides
---

<ApiLifecycle access="ie" /><br>

> **Note:** This document is only for Okta Identity Engine. If you’re using Okta Classic Engine, see [Configure Okta sign-on and app sign-on policies](/docs/guides/archive-configure-signon-policy). See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

This guide explains what profile enrollment policies are used for and how to add and configure them in your [Okta organization](/docs/concepts/okta-organizations/). Also, 

---

**Learning outcomes**

* Know the purpose of profile enrollment policies.
* Add and configure profile enrollment policies.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [Groups created](/docs/reference/api/groups/) in your org
* An application that you want to assign to an enrollment policy
* [Authenticators](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-authenticators) configured in your org

---

## About profile enrollment

End-user registration is a vital component of any Okta organization and is a particular concern when you implement customer identity and access management (CIAM) scenarios.

Your customers want a frictionless way to access and sign up for the services or products provided by your company. You also want to obtain more profile information about your end users but without asking them for an overwhelming amount of input when they sign up.

With the Okta Identity Engine, you have access to powerful features that give your end users a smooth entry and allow you to quickly expand their profiles for your internal business requirements.

The profile enrollment policy collects the attributes required to validate end users when they attempt to access your app. You can use your profile enrollment policy to:

- Allow end users to register and activate their profiles through the Sign-In Widget or a custom embedded authentication solution.

- Create a progressive enrollment flow that collects additional profile information about known end users before they can sign in.

- Assign end users to specific groups.

###