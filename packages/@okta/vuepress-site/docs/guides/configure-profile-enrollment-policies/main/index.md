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

### About self-service registration (SSR)

The self-service registration (SSR) functionality enables end users to sign up for your services. You can configure the registration using either the Sign-In Widget hosted by Okta or with a custom embedded authentication solution.

For details on implementing the sign-in authentication for your application, see the sign users in guide.

When new end users click Sign up in the Sign-In Widget, they’re shown the enrollment form. This form is where they can fill out the fields you configured in the profile enrollment policy. Okta automatically uses the email address for the end user’s username and primary email address.

After end users complete the enrollment form, Okta sends them a link and a one-time password (OTP) to verify their email address and complete the registration process. The activation email satisfies possession assurance through the email authenticator. Other authentication prompts can appear, depending on the authentication settings in your sign-on policies. See Authentication policies and Global session policies.

After end users satisfy all the authentication requirements, Okta automatically registers them in your org. They’re also provisioned to the appropriate groups defined by the profile enrollment policy. Okta then redirects the end users to your app or your org's Okta End-User Dashboard.

If your org doesn't use password-optional authentication, you can still configure the email verification to be optional. After registration, Okta redirects end users to your custom application or your org's Okta End-User Dashboard. The end user still receives a verification email, but clicking the verification link isn't required for the user to complete the sign-in process.

If you enable SSR and the end user attempts to sign in with a username that doesn't exist in the org, Okta returns a warning message that there’s no account with that username.

However, if SSR is disabled for your app and the end user enters a username that doesn't exist in the org, they are prompted to enter a password but won't be able to sign in. In this scenario, the option to sign up for an account isn't shown on the Sign-In Widget. You must have an alternate method to create the accounts for new users. See Add users manually.

### About progressive enrollment

When companies want more data about their customers, they generally ask for details when customers first sign up for their application. However, asking for detailed information during a first interaction creates high friction and drop-off rates. Customers are wary of sharing personal information and need to build a trust relationship with a new website or application before adding account information to their profile.

With support for progressively building user profiles built into the Okta authentication process, companies can use profile enrollment policies to create custom forms for their sign-in flows. They can collect profile data incrementally as end users engage with the application.

Information is only requested when relevant to the end user’s activities. These new details are validated during the sign-in process to ensure that accurate information is added to the end user's Okta Universal Directory profile.

You can also integrate inline hooks into the sign-in process to trigger custom code interactions between Okta and your application. See Inline Hooks.

In a progressive enrollment scenario, existing registered end users can sign in using established credentials. Okta then evaluates the end user against the Authentication policies in place or, if applicable, the Global Session Policy. See Authentication policies and Global session policies.

Okta evaluates the profile enrollment policy every time the end user attempts to sign in to an app. If you add required attributes to the enrollment form, Oktaprompts the end user for this information during their next sign-in attempt. If an end user is already signed in when you change the policy, they may be prompted for additional data or assigned to a new group at their next sign-in attempt.

