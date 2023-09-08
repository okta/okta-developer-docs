---
title: Generating Dynamic Email by Using the Okta Identity Engine
meta:
  - name: description
    content: This page explains the main features of Okta Identity Engine, including the authentication deployment models, the Interaction Code grant type, authentication policies, app context, and app intent links. It also provides SDKs and sample apps that can help you explore these features.
---

<ApiLifecycle access="ie" />

# How Okta Identity Engine works
This page explains the main features of [Okta Identity Engine](https://help.okta.com/oie/en-us/content/topics/identity-engine/oie-index.htm), including the authentication deployment models, the Interaction Code grant type, authentication policies, app context, and app intent links. It also explains some of the areas in which Okta Identity Engine differs from [Okta Classic Engine](/docs/guides/archive-overview/main/) and provides links to SDKs and sample apps that can help you explore these features.

> **Notes:**
> * From March 1, 2022, all new [Okta organizations](/docs/concepts/okta-organizations/) use Identity Engine.
>   
>   * To identify your Okta solution, see the version in the footer of your Admin Console. The letter **E** following the version denotes Identity Engine, while the letter **C** denotes Classic Engine.
>     
>   * Current Classic Engine users can continue to use the Classic Engine organization, and the v1 APIs and SDKs. For information about upgrading your Classic Engine instance to Identity Engine, see [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/main/) on the Okta Developer Portal.
>     
> * Documentation that covers features exclusive to Identity Engine begins with a blue <span class="api-label api-label-ie">Identity Engine</span> badge.


<a id="authentication-deployment-models"></a>
## Authentication deployment models
Identity Engine uses three user authentication deployment models:

* **Redirect Okta-hosted Sign-In Widget**: Use the widget to authenticate your users, then redirect them back to your app.

  > **Tip:** We strongly recommend this approach because it is the most secure and the fastest to implement.
  
* **Embedded Sign-In Widget**: To enable the handling of authentication on your own server, embed the Sign-In Widget into your code.
  
* **Embedded SDK-driven sign-in flow**: To create a completely custom authentication experience, use the Okta SDKs.

For more information, see the following resources on the Okta Developer Portal:

* [Okta deployment models: redirect and embedded](/docs/concepts/redirect-vs-embedded/)
  
* [User sign-in overview](/docs/guides/sign-in-overview/main/)


<a id="interaction-code-grant-type-embedded-authentication"></a>
### Interaction Code grant type for embedded authentication
The [Interaction Code grant type](/docs/concepts/interaction-code/) is an extension for the [OAuth 2.0 and OpenID Connect standards](/docs/concepts/oauth-openid/) that enables a custom user authentication experience.

This grant type lets apps manage user interactions with the authorization server directly by using an embedded Okta Sign-In Widget or SDK (rather than by relying on a browser-based redirect to an authentication component).


<a id="authentication-policies"></a>
## Authentication policies
Authentication policies are [security policy frameworks](https://www.okta.com/resources/whitepaper/okta-security-technical-white-paper/) that let organizations model security outcomes for an app. Identity Engine lets you share these policies across apps. For example, if the system detects an elevated risk, you can increase authentication to a factor that resists [phishing](https://en.wikipedia.org/wiki/Phishing).

Identity Engine also lets you create flexible apps that can change their authentication methods without changing any of the underlying code. For more information, see the following resources:

* [What are policies](/docs/concepts/policies/) and [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy/main/) on the Okta Developer Portal

* [Authentication policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop) in the Okta Help Center


<a id="app-context"></a>
## App context
When a user begins to authenticate to a system, Identity Engine provides an _app context_, functionality which uses the variables from email templates to enable the customization of the style and content of email messages based on the app that triggers the email notification. For more information, see the following resources on the Okta Developer Portal:

* [Use customizable email templates](/docs/guides/custom-email/main/#use-customizable-email-templates)
  
* [Customization example](/docs/guides/custom-email/main/#customization-example)

<a id="app-intent-links"></a>

## App intent links
_App intent_ links are protocol-specific endpoints that signal a system's intent to access an app. You can use app intent links to initiate sign-in flow to an app.

> **Tip:**
> 
> * Identity Provider and Service Provider flows support app intent links.
>
> * Similarly to Classic Engine, Identity Engine provides a centralized sign-in page with its own rate limit to help control traffic and prevent abuse.

The following is an example app intent link for a SAML app:

```
http://${yourOktaDomain}/app/mysamlapp_1/${appInstanceID}/sso/saml
```

The location of the app intent link hosts the widget or sign-in experience for the app that the user attempts to access and evaluates the global session policy, authentication policy, and any other policies that might be relevant to the sign-in experience.


<a id="app-intent-links-differences-from-classic-engine"></a>
### Differences from Okta Classic Engine functionality
[Okta Classic Engine](https://help.okta.com/en-us/content/index-admin.htm) allows access to these endpoints only by establishing a session and processing a request:

1. Before the system assesses the request for rate-limiting purposes, it redirects unauthenticated traffic to a centralized sign-in page (for example, `/login/login.html`).

   The `fromUri` query parameter contains the link to the app that the system attempts to access.
   
1. The system performs an intermediate redirect to a generic app SSO endpoint (`/app/${app}/${instanceId}/${linkName}` and then brings the user to the correct app intent link.
   
1. The app intent link endpoint validates that the user is authorized to access the app and then enforces the app sign-on policy.


<a id="captcha"></a>
## CAPTCHA (Bot Detection)
[CAPTCHA](https://en.wikipedia.org/wiki/CAPTCHA) is a strategy that lets you mitigate automated (bot) attacks by verifying that the user is human. Identity Engine integrates with the following CAPTCHA services by using Okta-hosted and embedded Sign-In Widgets:

* [hCAPTCHA](https://www.hcaptcha.com/)
  
* [reCAPTCHA](https://www.google.com/recaptcha/about/)

> **Note:** Currently, it isn't possible to use Okta SDKs for CAPTCHA integration.


<a id="sdks-sample-apps"></a>
## SDKs and sample apps
To get started with integrating Identity Engine with your app and to work with example apps, see the following resources on the Okta Developer Portal:

* [SDKs and tools](/code/)
  
* [Download and set up the SDK, Sign-In Widget, and sample apps](/docs/guides/oie-embedded-common-download-setup-app/android/main/)
