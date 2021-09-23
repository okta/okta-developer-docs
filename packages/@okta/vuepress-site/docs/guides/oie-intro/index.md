---
title: Okta Identity Engine Overview
meta:
  - name: description
    content: Okta Identity Engine offers customizable building blocks that can support dynamic, app-based user journeys. Find out more about the Identity Engine, why you would use it, and how to upgrade your org.
---
<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" />

This guide covers basic information on Okta Identity Engine and the Identity Engine SDKs that you can use for a better development experience.

 Nutrition Facts                                                                          |                                                                                      |
| --------------------------------------------------------------------------------  | -------------------------------------------------------------------------               |
| Learning outcomes                     | <ul><li>Understand the two approaches in the Identity Engine user authentication deployment model.</li><li>Use the sample apps to manage authentication.</li></ul>                                                      |
| What you need | n/a                                                     |
| Sample code                                                        | n/a                                    |

## About Okta Identity Engine

Okta Identity Engine is a platform service that allows enterprises to build access experiences tailored to their organizational needs. With the [Identity Engine](https://help.okta.com/en/oie/okta_help_CSH.htm#ext-get-started-oie), you are no longer bound to any one way of identifying, authorizing, enrolling, and issuing access to users. Instead, you can customize and extend each of these steps.

The Identity Engine user authentication deployment model can be divided into two approaches:

* **Redirect authentication:** A user sign-in flow that grants authentication control to Okta by redirecting to an Okta hosted sign-in page using open protocols like OAuth 2.0 and SAML. This approach is recommended for most developers, as it is easier to build and maintain.

* **Embedded authentication:** A user sign-in flow where the application retains authentication control, without redirection to Okta, using a client-hosted Sign-In Widget, the Identity Engine SDKs, or directly with Okta's proprietary Identity Engine authentication APIs.

See [Redirect authentication vs. embedded authentication](/docs/concepts/redirect-vs-embedded/) for a full list of reasons for using these authentication approaches and a complete overview of the different deployment models.

## Identity Engine SDKs

To take advantage of these new features and for a better development experience, use the [Identity Engine SDKs](https://developer.okta.com/code/oie/) to manage authentication in your apps.

### Redirect authentication sample apps

The redirect authentication sample apps demonstrate how to redirect users to an Okta-hosted sign-in page, and then receive users redirected back from Okta after users sign in. Implement redirect authentication when you:

* Have multiple applications or use third-party applications and need Single Sign-On
* Want Okta to control the authentication flows through policy configuration
* Want Okta to control upgrades to take advantage of new functionality
* Have an application that already uses an OAuth 2.0 or SAML provider to sign users in

Learn how to implement this approach with the [Redirect authentication guide](/docs/guides/sampleapp-oie-redirectauth/).

### Embedded authentication sample apps

The embedded authentication sample apps demonstrate how to embed authentication in an app with Okta package dependencies. Okta provides two embedded identity solutions:

**Embedded SDK only**: A highly customizable solution that provides native language support for a variety of identity use cases. Choose the embedded SDK when you want to build out your identity solution that includes the ability to:

* Provide a fully customized user experience
* Code against a high-level SDK interface
* Provide greater flexibility to solve your specific branding requirements

Learn how to implement this approach with the [Embedded authentication with the SDK guide](/docs/guides/oie-embedded-sdk-overview/).

**Embedded Widget + SDK**: A quick and easy-to-set-up solution that moves most of the the heavy lifting to Okta. Although the amount of code that you need to write is small, many of the most advanced identity use cases (for example, social sign in, multifactor authentication) are supported out of the box. Use the embedded Widget when you need:

* Quick and easy integration
* Features that are ready out of the box
* Simple configuration changes with no additional code for most functionalities, such as multifactor authentication

Learn how to implement this approach with the [Embedded authentication with the Sign-In Widget guide](/docs/guides/oie-embedded-widget-overview/).

## Why use the Identity Engine?

The Identity Engine provides:

* Passwordless authentication

    Admins can enable the email authenticator now with the addition of a magic link in the email notification sent to end users. Authenticators are credentials, owned or controlled by an end user, that can be verified by an application or service. They can be things such as passwords, answers to security questions, or phones (SMS or voice call). When policies are configured to include non-password authenticators, end users may sign in to their account using factors that don't require the use of a password. See [Configure passwordless authentication with email magic link](https://help.okta.com/en/oie/okta_help_CSH.htm#ext-passwordless-auth).

* Progressive profiling

  Update an existing user's profile by prompting them for additional sign-in information when they advance to designated stages in the sign-in process. See [Create a Profile Enrollment policy for progressive profiling](https://help.okta.com/en/oie/okta_help_CSH.htm#ext-create-profile-enrollment).

* App-level policies

  App sign-on policies define the full requirements for an app. Admins can configure Okta Sign-On Policies to use App-level policies instead &mdash; making it easier to manage your apps. See [App sign-on policies](https://help.okta.com/en/oie/okta_help_CSH.htm#ext-about-asop).

* MFA enrollment policies

  With MFA enrollment policies, you can create and enforce policies and rules for specific MFA factors and assign groups accordingly. Sign-on policies determine the types of authentication challenges end users experience when they sign in to their account. MFA enrollment policies are based on a variety of elements, such as location, group definitions, and authentication type. See [Create an MFA enrollment policy](https://help.okta.com/en/oie/okta_help_CSH.htm#ext-create-mfa-policy).

## Enable the Identity Engine for your organization

To upgrade to the Identity Engine, reach out to your account manager. If you don't have an account manager, reach out to oie@okta.com for more information.

* The v1 API continues to work as before until you're ready to use new Identity Engine functionality.
* The existing Okta-hosted Widget continues to work after upgrading your org.
* Upgrade your SDK as you would normally do with other SDK updates.
