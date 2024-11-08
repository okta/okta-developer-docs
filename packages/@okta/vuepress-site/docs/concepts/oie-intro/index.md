---
title: Okta Identity Engine overview
meta:
  - name: description
    content: Learn about Okta Identity Engine features, associated deployment models, and changes to the documentation experience.
---

<ApiLifecycle access="ie" />

Okta Identity Engine is an authentication pipeline that enables organizations to customize their Okta cloud components for diverse identity use cases. Instead of relying on predefined behavior for identification, authorization, and enrollment, organizations can use Identity Engine to support dynamic, app-based user journeys.

This guide introduces Identity Engine features, associated deployment models, and changes to the Classic Engine and Identity Engine documentation experiences.

> **Note**: If you’re an admin, or are looking for product docs related to Identity Engine, see [Get started](https://help.okta.com/okta_help.htm?type=oie&id=ext-get-started-oie).

## Access and upgrade to Identity Engine

As of March 1, 2022, all new [Okta orgs](/docs/concepts/okta-organizations/) are Identity Engine orgs. This means that all new customers can take advantage of the [Identity Engine features](#identity-engine-features).

If you're a Classic Engine customer and want to upgrade your apps to use Identity Engine, see [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/).

For Classic Engine customers who don't yet want to upgrade, your existing functionality continues to work for now, including your Classic Engine org, v1 API, and SDKs.

## Identity Engine features

Identity Engine includes the following features for developers:

| Feature | Description | How it works | More information |
| :------ | :---------- | :----------- | :--------------- |
| <a name="app-context-in-email-templates"></a> [App context in email templates](https://help.okta.com/oie/en-us/content/topics/identity-engine-upgrade/email-enhancements.htm) | A capability that makes app context available when a user enters an authentication flow.  | Customers can use context attributes in email templates to dynamically customize email style and content based on the app that triggers an email notification. | [Use customizable email templates](/docs/guides/custom-email/main/#use-customizable-email-templates) |
| <a name="app-intent-links"></a> [App intent links](https://help.okta.com/oie/en-us/content/topics/identity-engine-upgrade/app-intent-link.htm) | The protocol-specific endpoints that you can use to initiate a sign-in flow to an app. Both Identity Provider and Service Provider initiated flows are supported. | Before Identity Engine, unauthenticated requests were redirected to a centralized sign-in page (`/login/login.htm`), establishing a session before processing the request. Users were then redirected to the relevant app intent link through an intermediate redirect to the generic app SSO endpoint (`/app/{app}/{instanceId}/{linkName}`), which validated the user's assignment to the app and enforced its sign-on policy. <br></br>With Identity Engine, requests are no longer forwarded to the centralized sign-in page (`/login/login.htm`). Instead, app intent links directly host the sign-in experience. The Identity Engine evaluates all relevant policies for the sign-in process, and each app intent link shares a common rate limit bucket, similar to the Classic Engine's centralized sign-in page.<br></br> Example app intent link for a SAML application: `http://{yourOktaDomain}/app/mysamlapp_1/{appInstanceID}/sso/saml` |  |
| <a name="authentication-policies"></a> [Authentication policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop) | The [security policy frameworks](https://csrc.nist.gov/pubs/sp/800/63/b/upd2/final) that allow organizations to model security outcomes for an app. These policies are shareable across applications. | Identity Engine enables you to create flexible apps that can change authentication methods, without having to alter code. <br></br>For example, you can automatically escalate to a strong, non-phishable authentication factor when elevated risk is identified. | [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy/)<br></br>[Policies (high-level concept)](/docs/concepts/policies/) |
| <a name="captcha"></a> [CAPTCHA](/docs/api/openapi/okta-management/management/tag/CAPTCHA/) | A strategy for mitigating attacks by bots. | Identity Engine offers integrations with CAPTCHA services for registration, sign-in, and account recovery:<br></br><ul><li>You can use either [hCAPTCHA](https://docs.hcaptcha.com/invisible/) or [reCAPTCHA v2](https://developers.google.com/recaptcha/docs/invisible) with the redirect or embedded authentication deployment models.</li><li>If you use the [Sign-In Widget SDK](https://github.com/okta/okta-signin-widget), CAPTCHA works out of the box.</li><li>If you use any other [Okta SDK](/code/), you need to implement CAPTCHA.</li></ul><br>**Caution**: Using any other CAPTCHA type could lead to lockout. Contact [Okta Support](https://support.okta.com/) if lockout occurs. | [CAPTCHA integration](https://help.okta.com/oie/en-us/content/topics/security/security_general.htm?cshid=csh-captcha#captcha) |
| <a name="interaction-code-grant-type-for-embedded-authentication"></a> [Interaction Code grant type for embedded authentication](/docs/concepts/interaction-code/) | An extension to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standard that enables a more customized user authentication experience. | The Interaction Code grant type allows apps using an embedded Okta Sign-In Widget and/or SDK to manage user interactions with the authorization server directly. <br></br>This eliminates the need for a browser-based redirect to an authentication component, like the Sign-In Widget. | [Implement authorization by grant type](/docs/guides/implement-grant-type/interactioncode/main/) |

## Authentication deployment models

You can use the following deployment models for user authentication with Identity Engine:

| Feature | Description | Complexity |
| :------ | :---------- | :--------- |
| [**Okta-hosted (redirect) Sign-In Widget**](/docs/guides/sign-into-web-app-redirect/spring-boot/main/) | Authenticate users using the Sign-In Widget and then redirect back to your app. | Low. This is the recommended approach as it's the most secure and fastest to implement. |
| [**Embedded Sign-In Widget**](/docs/guides/embedded-siw/main/) | Handle authentication on your servers by embedding the Sign-In Widget in your own codebase. | Medium. This provides a balance between complexity and customization. |
| [**Embedded SDK-driven sign-in flow**](/docs/guides/embedded-sdk-use-cases/)  | Use Okta SDKs to create a custom authentication experience. | High. This option is the most complex and leaves you with the most responsibility, but offers the most control.<br></br> **Tip**: Okta provides [SDKs and sample apps](/code/) to help you integrate Identity Engine features into your apps. Learn how to [download and set up SDKs and sample apps](/docs/guides/oie-embedded-common-download-setup-app/android/main/). |

See [Okta deployment models — redirect vs. embedded](/docs/concepts/redirect-vs-embedded/) for an overview of the different deployment models, and see [Sign users in overview](/docs/guides/sign-in-overview/) for implementation details.

## Documentation approach

Okta is moving towards supporting Identity Engine by default in our documentation, while still providing information for Classic Engine customers.

* **Identity Engine-only content:** Content that only applies to Identity Engine has a blue Identity Engine label.

* **Identity Engine and Classic Engine content:** Content that applies to both Identity Engine and Classic Engine have no labels. Any slight differences are covered in the page text.

* **Classic Engine-only content:** Content that only applies to Classic Engine has a note at the top of the page that provides context, including where Identity Engine customers can go to find support.

* **Older docs available**: For guides that were extensively updated to support Identity Engine, Okta keeps a [Classic Engine](/docs/guides/archive-overview/) version available if needed.

  > **Note**: To determine your Okta version, see [Get started](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version).
