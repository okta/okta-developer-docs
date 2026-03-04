---
title: Add a sign-up form to your web app
meta:
  - name: description
    content: Allow users to create their own accounts with a self-registration form.
    date-updated: March 4, 2026
    target persona: Developer, Administrator
    level: Beginner
sections:
- main
---

# Add a sign-up form to your web app

Implement a sign-up form for your web app, reducing onboarding friction and accelerating user acquisition.

## Introduction

You have a web-based app that uses Okta as the identity provider and user store. To allow users to create their own accounts in your app, implement a Self-Service Registration (SSR) flow. This guide helps you design and configure a registration experience that securely and efficiently onboards your users.

Before you start, think about whether you need different registration experiences for different types of users, like customers, partners, and drivers. This guide helps you plan your sign-up process for each and then helps you configure the right policies in Okta to make it happen.

## Learn

Learn the basics that you need to lay the foundations for your work:

* The [Okta Sign-In Widget](/docs/concepts/sign-in-widget/) renders a user-friendly sign-up form.
* The [Okta Universal Directory](/docs/concepts/universal-directory/) is the central store for your user accounts in your Okta org.
* The [User profile and authenticator enrollment policies](/docs/concepts/policies/#enrollment-policies) combine to enable self-service registration (SSR) for your app and define the user experience during the SSR process.
* The [Inline Registration hook](/docs/concepts/inline-hooks/) allows you to add custom business logic to the SSR process.

## Plan

Plan for and develop the best end user SSR experience:

<!-- * [Consider refactoring your SSR flows from your many apps and brands into a single, dedicated registration app](). waiting on the video link -->
[Understand the default SSR flow and how you can customize it](/docs/concepts/self-service-registration/index.md).
<!-- * [Design your sign-up flows for different types of users](). waiting on Brent to finish doc -->

## Build

With your registration plan in place, you can now configure the necessary components in Okta. This process involves three main stages:

* Set up the foundational policies that define the SSR experience, such as what information users must provide and which authentication factors they need to enroll.
* Add a way for users to register. The recommended approach is to redirect them to an Okta-hosted enrollment form, which you can customize to match your brand.
* Test the end-to-end flow to ensure that new user accounts are created correctly and assigned to the right groups with the proper attributes.

### Enable and configure the basic self-registration process

Configure any user groups in Universal Directory, then create the policies that you need to configure your app's SSR experience:

* [Create the user groups and attributes that you need to support your customers](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-groups-main)
* [Enable and configure the self-registration flow to your requirements](/docs/guides/enable-configure-signupform/main/)
  * Enable SSR with a user profile policy.
  * Define the information that a user must supply during the process, and whether email verification is required.
  * Set the authentication factors (for example, password, email, phone) that users must use to validate their identity with an authenticator enrollment policy.
  * Set the custom types, groups, and attributes that are assigned to a new user with a profile enrollment form.

### Add a way for users to register an account

The simplest and Okta-recommended way for users to create an account is to redirect them to an Okta-hosted registration page. This page displays the Okta Sign-In Widget, which acts as an enrollment form that you can customize to reflect your brand.

* [Sign users up for your app by redirecting them to an Okta-hosted enrollment form.](/docs/guides/signup-oktahosted/main/)
* [Customize the basic registration flow by creating an inline registration hook.](/docs/guides/registration-inline-hook/nodejs/main/)
* [Customize the Sign-In Widget to match your app's theme or your company's brand.](/docs/journeys/OCI-branding/main/#apply-your-brand-to-the-sign-in-widget)
* [Customize the text of your verification and welcome emails to match your brand.](/docs/guides/custom-email/main/)

### Test the registration flow

Remember to test that your policies and customizations created and onboarded the users correctly.

* Test the registration flow for each account type. Ensure that users are created in Universal Directory with the correct values in their user profiles and assigned to the correct user groups.
* Test that your branding and email text changes work as expected.

## Related topics

Congratulations. Your app now allows users to create their own accounts. These accounts are stored and assigned the correct types, roles, groups, and attributes in Universal Directory. The registration and vetting process is now customized to match your needs with policies, scripts, and inline hooks. The user registration experience is smooth and not onerous.

Go deeper into how Universal Directory handles users:

* [User Profiles](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-about-profiles) contain all the data points of interest that are associated with a user.
* [User Groups](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-about-groups) allow admins to manage users as a group rather than individually.
* [User Realms](https://help.okta.com/okta_help.htm?type=oie&id=ext-realms) enable admins to manage users and user groups within an org.

Go deeper into the policies that control the sign-in process:

* Learn about [user profile policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment).
* Learn about [authenticator enrollment policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-mfa-enrol-policies).
* Learn about [profile enrollment](https://help.okta.com/okta_help.htm?type=oie&id=csh-pe-policies).

Okta recommends using an Okta-hosted Sign-In Widget for SSR. However, [embedding the widget in your own page](/docs/guides/signup-selfhosted/main/) is also possible and allows for greater customization.
