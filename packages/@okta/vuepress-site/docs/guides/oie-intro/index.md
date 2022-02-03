---
title: Okta Identity Engine overview
meta:
  - name: description
    content: Find out more about Okta's Identity Engine authentication flow, what developer features it unlocks, and how to use it.
---

Okta Identity Engine is Okta's new authentication pipeline, which provides valuable new features and a more flexible approach to your auth needs. This article provides a high-level introduction.

Below we explain what new features Identity Engine brings to the table and the fundamental differences in its approach from our Classic auth pipeline, talk about the deployment models we have to make use of these features, and show how our documentation experience is changing to support it.

> **Note**: If you are an admin, or are looking for product docs related to Identity Engine, see our [Identity Engine Get started page](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/oie-get-started.htm?cshid=ext-get-started-oie) over on the Okta Help Center.

## Identity Engine new features

WHAT OTHER FEATURES DO WE WANT TO CALL OUT?

Identity Engine unlocks many new capabilities.

### Passwordless authentication, e.g. with a "magic link"

Okta enables users to authenticate without a password by emailing them an embedded link — this can be clicked to complete their authentication experience without having to enter their password. Other non-password authenticators include phone (SMS or voice call), biometrics, and answers to security questions.

* [Authenticator SDK integration guides](ADD LINK)
* [Email SDK use cases](ADD LINK)
* [Configure passwordless authentication](https://help.okta.com/okta_help.htm?type=oie&id=ext-passwordless-auth).

### Progressive profiling

Progressive profiling allows you to capture additional user information or update existing information beyond registration as the user progresses through the application, reducing registration friction.

* [ADD IN MORE INFO](ASK BRENT FOR LINKS)
* [Manage Profile Enrollment policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment).

### App-level policies

App-level policies are [security policy frameworks](https://csrc.nist.gov/publications/detail/sp/800-63b/final) that allow organizations to model security outcomes for an app. For example, you can automatically step up authentication to a strong non-phishable factor when elevated risk is detected.

* [ADD DEV.OKTA LINKS](ASK OTHER WRITERS)
* [App sign-on policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop).

### Flexible account recovery

You can now use authenticators such as Okta Verify Push to reset user passwords, including offering self-service recovery options, and setting any authenticator you like as a second factor (previously limited to the security question authenticator).

* [Okta Verify SDK integration guide](ADD LINK)
* [User password recovery](ADD LINK)
* [Custom password recovery](ADD LINK)
* [Self-service account recovery](https://help.okta.com/okta_help.htm?type=oie&id=ext-config-sspr).

## Identity Engine fundamental differences

WHAT OTHER CONCEPTUAL DIFFERENCES DO WE WANT TO CALL OUT?

Identity Engine has a number of fundamental differences from Okta Classic Engine.

### Policy-driven

One key aspect is its policy-driven nature — if you are using Identity Engine you are able to create flexible apps that can change their authentication methods without having to alter a line of code.

* [Sign-on policies](https://help.okta.com/en/prod/Content/Topics/Security/policies/policies-home.htm)
* [Authenticator integrations](ADD LINK)

### Interaction code grant type

To enable a more customized user authentication experience, Okta has introduced an extension to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standard called the [Interaction Code grant type](/docs/concepts/interaction-code/). This grant type allows native, SPA, and web apps to manage user interactions with the authorization server directly, rather than relying on a browser-based redirect to an authentication component (such as the Okta Sign-In Widget).

## Authentication deployment models

The Identity Engine user authentication deployment model can be divided into two approaches — redirect and embedded authentication.

> **Note**: See [Redirect authentication vs. embedded authentication](/docs/concepts/redirect-vs-embedded/) for a full list of reasons for using these authentication approaches and a complete overview of the different deployment models.

### Redirect authentication

Redirect authentication is a user sign-in flow that grants authentication control to Okta by redirecting to an Okta hosted sign-in page using open protocols like OAuth 2.0 and SAML. This approach is recommended for most developers, as it is easier to build and maintain.

Implement redirect authentication when you:

* Have multiple applications or use third-party applications and need Single Sign-On
* Want Okta to control the authentication flows through policy configuration
* Want Okta to control upgrades to take advantage of new functionality
* Have an application that already uses an OAuth 2.0 or SAML provider to sign users in

To get started with redirect authentication:

* Our [quickstarts](ADD LINK) provide a rapid introduction.
* [Set up our Identity Engine sample apps](/guides/oie-embedded-common-download-setup-app/android/main/) and implement our [redirect auth use cases](/docs/guides/sampleapp-oie-redirectauth/)

### Embedded authentication

Embedded authentication is a user sign-in flow where the application retains authentication control, without redirection to Okta, using the [Identity Engine SDKs](https://developer.okta.com/code/oie/) or the SDKs along with a client-hosted Sign-In Widget.

**Embedded SDK only**: A highly customizable solution that provides native language support for a variety of identity use cases. Choose the embedded SDK when you want to build out your identity solution that includes the ability to:

* Provide a fully customized user experience
* Code against a high-level SDK interface
* Provide greater flexibility to solve your specific branding requirements

**Embedded Widget + SDK**: A quick and easy-to-set-up solution that leaves most of the the heavy lifting to Okta. Although the amount of code that you need to write is small, many of the most advanced identity use cases (for examples, social sign-in and multifactor authentication) are supported out of the box. Use the embedded Widget when you need:

* Quick and easy integration
* Features that are ready out of the box
* Simple configuration changes with no additional code for most functionalities, such as multifactor authentication

To get started with embeded authentication:

* [Embedded Sign-In Widget fundamentals](ADD LINK) and [Auth.js fundamentals](ADD LINK)
* [Set up our Identity Engine sample apps](/guides/oie-embedded-common-download-setup-app/) and implement our [Embedded SDK use cases](ADD LINK) and [Embedded Widget use cases](ADD LINK).

## Identity Engine versus Classic documentation approach

In our documentation we have started to move over to supporting Identity Engine as a first-class citizen, while still providing information for Classic engine users.

* Pages and page sections covering features that only work in Identity Engine will have a blue "Identity Engine" banner at the top.
* Content that works in Identity Engine and Classic will have no banner. Any slight differences will be covered in the page text.
* Content written for Classic that won't work in Identity Engine will have a note at the top, explaining what the issue is, and, if appropriate, where Identity Engine users can go to find support.
* For guides that have been extensively updated to support Identity Engine, we'll keep the classic version in our [Classic archive](/guides/classic-archive/), so it is still accessible if needed.

> **Note**: See [Identify your Okta solution](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/oie-verify-version.html) to determine your Okta version.

## Accessing and upgrading to Identity Engine

From March 1 2022, all new [Okta orgs](/docs/concepts/okta-organizations/) will be Identity Engine orgs, so all new customers can take advantage of the new features. You can start building apps that take advantage of new Identity features using our redirect or embedded (SDK and/or Widget) authentication models — see [Authentication deployment models](#authentication-deployment-models). 

If you are a Classic customer who wants to upgrade their apps to use Identity Engine, contact your account manager. If you don't have an account manager, contact [oie@okta.com](mailto:oie@okta.com) for more information.

For classic customers who don't yet want to upgrade:

* The v1 API continues to work as before until you're ready to use new Identity Engine functionality.
* The existing Okta-hosted Widget continues to work after upgrading your org.
* Upgrade your SDK as you would normally do with other SDK updates.