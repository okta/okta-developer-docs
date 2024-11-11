---
title: Okta Identity Engine overview
meta:
  - name: description
    content: Learn about Okta Identity Engine, including its features, deployment models, and upgrade pathways from Classic Engine.
---

<ApiLifecycle access="ie" />

Okta Identity Engine is an authentication pipeline that allows organizations to customize user journeys for diverse identity use cases.

This guide provides an overview of Identity Engine, detailing its features, deployment models, and upgrade pathways from Classic Engine.

> **Note**: If you’re an admin or seeking product docs for Identity Engine, see [Get started](https://help.okta.com/okta_help.htm?type=oie&id=ext-get-started-oie).

## What is Identity Engine?

Identity Engine consists of components that cover the entire user journey, including registration, authentication, and authorization.

For example, your organization might want to make registration easy. You can create an experience where users only have to enter their name and email to register. After they register, you can automatically add them to email campaigns in Marketo, an email marketing platform.

<div class="three-quarter">

![Registration workflow](/img/concepts/IdentityEngineBrowseApp.png)

</div>

If a user becomes more engaged, or wants to access more sensitive areas of an application, Identity Engine can recognize this context and adjust the experience. For example, you can check if the user's email is valid and authenticate them with an email magic link. You can also ask the user for more information before authorizing them to proceed.

<div class="three-quarter">

![Context-driven workflows](/img/concepts/IdentityEngineTransact.png)

</div>

### Use cases

Some use cases that you can build with Identity Engine include:

- Asking for user consent to store personal data on registration
- Allowing access to an app with no authentication
- Never requiring enrollment of a password as a factor
- Requiring enrollment in SMS as a factor before making a large checking account withdrawal
- Preventing fake account creation
- Detecting username collisions when importing from any source and fixing with custom logic
- Sending a welcome email for new hires, separate from the Okta new account email
- Prompting users to increase their security posture by enrolling in multifactor authentication

### Customizing user journeys

You can customize user journeys to accommodate user attributes, device information, application details, network type, and user intent. Depending on the customizations you make, Okta can perform more actions to move the user through their journey, including:

- Emailing magic link authentication
- Escalating authentication requirements
- Prompting user actions
- Evaluating policies
- Triggering hooks
- Publishing events
- Verifying or validating identity
- Customizing branding
- Routing to an external system

### Adding custom code with hooks

Okta hooks use the security features of Identity Engine. You can use hooks to add custom code that adjusts processes and notifies external services.

You can use the following types of hooks:

| Type | Description | Example |
| :--- | :---------- | :------ |
| [Inline hooks](/docs/concepts/inline-hooks/) | Incorporate custom logic directly into a component. | Modify an Okta process with customer logic. |
| [Event hooks](/docs/concepts/event-hooks/) | Trigger downstream integrations based on events in the [Okta System Log](/docs/api/openapi/okta-management/management/tag/SystemLog/). | Notify an external system of an Okta event. |

## Identity Engine features

Identity Engine includes the following features for developers:

| Feature | Description | How it works | More information |
| :------ | :---------- | :----------- | :--------------- |
| [App context in email templates](https://help.okta.com/oie/en-us/content/topics/identity-engine-upgrade/email-enhancements.htm) | A capability that makes app context available when a user enters an authentication flow.  | You can use context attributes in email templates. Context attributes let you change the styles and content of emails based on the app that sends the notification. | [Use customizable email templates](/docs/guides/custom-email/main/#use-customizable-email-templates) |
| [App intent links](https://help.okta.com/oie/en-us/content/topics/identity-engine-upgrade/app-intent-link.htm) | The protocol-specific endpoints that you can use to initiate a sign-in flow to an app. Identity Engine supports both Identity Provider and Service Provider initiated flows. | Before Identity Engine, unauthenticated requests redirected to a centralized sign-in page (`/login/login.htm`). This page established a session before processing the request. Users were then redirected to the relevant app intent link through an intermediate redirect to the generic app SSO endpoint (`/app/{app}/{instanceId}/{linkName}`). This process validated the user's assignment to the app and enforced its sign-on policy. <br></br>With Identity Engine, requests aren't forwarded to the centralized sign-in page (`/login/login.htm`). Instead, app intent links directly host the sign-in experience. Identity Engine evaluates all relevant policies for the sign-in process, and each app intent link shares a common rate limit bucket, similar to Classic Engine's centralized sign-in page.<br></br> Example app intent link for a SAML application: `http://{yourOktaDomain}/app/mysamlapp_1/{appInstanceID}/sso/saml` | Not applicable |
| [Authentication policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop) | The [security policy frameworks](https://csrc.nist.gov/pubs/sp/800/63/b/upd2/final) that allow organizations to model security outcomes for an app. Organizations can share [policies](/docs/concepts/policies/) across applications. | Identity Engine enables you to create flexible apps that can change authentication methods without requiring code changes. For example, you can automatically escalate to a strong, non-phishable authentication factor when elevated risk is identified. | [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy/) |
| [CAPTCHA](/docs/api/openapi/okta-management/management/tag/CAPTCHA/) | A strategy for mitigating attacks by bots. Identity Engine supports integrations with CAPTCHA services to enhance security during user registration, sign-in, and account recovery. | You can use either [hCAPTCHA](https://docs.hcaptcha.com/invisible/) or [reCAPTCHA v2](https://developers.google.com/recaptcha/docs/invisible) with the redirect or embedded authentication deployment models.<br></br><ul><li>If you use the [Sign-In Widget SDK](https://github.com/okta/okta-signin-widget), CAPTCHA works out of the box.</li><li>If you use any other [Okta SDK](/code/), you need to implement CAPTCHA.</li></ul><br>**Caution**: Using any other CAPTCHA type could lead to lockout. Contact [Okta Support](https://support.okta.com/) if lockout occurs. | [CAPTCHA integration](https://help.okta.com/oie/en-us/content/topics/security/security_general.htm?cshid=csh-captcha#captcha) |
| [Interaction Code grant type for embedded authentication](/docs/concepts/interaction-code/) | An extension to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standard that enables a more customized user authentication experience. | The Interaction Code grant type allows apps using an embedded Okta Sign-In Widget and/or SDK to manage user interactions with the authorization server directly. This eliminates the need for a browser-based redirect to an authentication component, like the Sign-In Widget. | [Implement authorization by grant type](/docs/guides/implement-grant-type/interactioncode/main/) |

## Authentication deployment models

You can use the following deployment models for user authentication with Identity Engine:

| Deployment model | Description | Complexity | More information |
| :--------------- | :---------- | :--------- | :----------------|
| [**Okta-hosted (redirect) Sign-In Widget**](/docs/guides/sign-into-web-app-redirect/spring-boot/main/) | Authenticate users using the Sign-In Widget and then redirect back to your app. | Low | This is the recommended approach as it's the most secure and fastest to implement. |
| [**Embedded Sign-In Widget**](/docs/guides/embedded-siw/main/) | Handle authentication on your servers by embedding the Sign-In Widget in your own codebase. | Medium | This provides a balance between complexity and customization. |
| [**Embedded SDK-driven sign-in flow**](/docs/guides/embedded-sdk-use-cases/)  | Use Okta SDKs to create a custom authentication experience. | High | This option is the most complex and leaves you with the most responsibility, but offers the most control.<br></br> Okta provides [SDKs and sample apps](/code/) to help you integrate Identity Engine features into your apps. Learn how to [download and set up SDKs and sample apps](/docs/guides/oie-embedded-common-download-setup-app/android/main/). |

For an overview of the different deployment models, see [Okta deployment models — redirect vs. embedded](/docs/concepts/redirect-vs-embedded/). For implementation details, see [Sign users in overview](/docs/guides/sign-in-overview/).

## Access and upgrade to Identity Engine

As of March 1, 2022, all new [Okta orgs](/docs/concepts/okta-organizations/) are Identity Engine orgs. As a result, new customers gain immediate access [Identity Engine features](#identity-engine-features).

If you're a Classic Engine customer looking to upgrade your apps to use Identity Engine, see [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/).

Classic Engine customers who aren't ready to upgrade can continue using their Classic Engine org, v1 API, and SDKs.

## Documentation approach

Okta is moving towards supporting Identity Engine by default in our documentation, while still providing information for Classic Engine customers.

* **Identity Engine content:** Content that applies to Identity Engine has a blue Identity Engine label.

* **Identity Engine and Classic Engine content:** Content that applies to both Identity Engine and Classic Engine has no labels. The page text covers any slight differences.

* **Classic Engine content:** Content that applies to Classic Engine has a note at the top of the page that provides context, including where Identity Engine customers can go to find support.

* **Older docs available**: For guides that were extensively updated to support Identity Engine, Okta keeps a [Classic Engine](/docs/guides/archive-overview/) version available if needed.

  > **Note**: To determine your Okta version, see [Get started](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version).
