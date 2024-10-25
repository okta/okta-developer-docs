---
title: Okta deployment models - redirect vs. embedded
meta:
  - name: description
    content: A high-level overview of the redirect and embedded deployment models Okta provides.
---

# Okta deployment models - redirect vs. embedded

When you develop apps that require the customer to sign in and authenticate, the deployment model for user authentication is a critical design consideration. This page looks at the Okta authentication options and what the differences are between them.

## Redirect vs. embedded

You can divide the Okta deployment models into two approaches:

**Redirect authentication**: A user sign-in flow that grants authentication control to Okta by redirecting to an Okta hosted sign-in page. This flow uses open protocols like OAuth 2.0 and SAML.

**Embedded authentication**: A user sign-in flow where the app retains authentication control without redirection to Okta. This flow uses a client-hosted embedded Sign-In Widget, SDK, or direct API calls.

What deployment model or authentication approach you choose depends on your implementation requirements and client app. In general, the method of delegating user sign-in interaction (redirect authentication) is preferred for many reasons that span from security to user experience.

Use this table and the subsequent sections to better understand the differences between redirect authentication and embedded authentication. These sections also help you to understand what flow works best for your app implementation:

| Requirement                                               | Redirect authentication | Embedded authentication |
| --------------------------------------------------------- | ------------------------ | --------------------- |
| Client app requires a redirect to an Identity Provider.   |   &#9989;     | |
| Client app owns the authentication and registration process.  |        | &#9989; |
| Client app owns user remediation (communication with identity server).  |        | &#9989; |
| Client app needs to support external Identity Providers, authenticators, or claims providers.  | &#9989; | &#9989; |
| Single Sign-On (SSO) is implicit (if an Okta session is created, SSO is implemented for other resources).   |   &#9989;     | |
| Full control over app customization is a key requirement.   |        | &#9989;|
| Client app requires centralized session management across apps.   |&#9989;|      |

> **Note**: To get started with implementing a user sign-in flow, see [Sign users in](/docs/guides/sign-in-overview/). Read on for more guidance in choosing what model is right for you.

## Redirect authentication

Redirect authentication through the Okta-hosted widget is the easiest and most secure way to integrate. This is because Okta hosts, maintains, and keeps the Sign-In Widget secure. Okta recommends the Okta-hosted widget for most integrations.

<div class="three-quarter">

![Okta-hosted widget](/img/auth/OktaHosted.png)

</div>

The user or system is redirected to Okta for credential verification. The user or system is then provided authenticated access to the client app and other Service Providers. When a user signs in to the client app, they're redirected to Okta using a protocol like SAML or OpenID Connect. After the user signs in (based on policies configured in Okta), Okta redirects the user back to your app.

You can customize your app's [domain](/docs/guides/custom-url-domain/) and the [Okta Sign-In Widget style](/docs/guides/custom-widget/) to match your brand.

> **Note**: [SSO](/docs/guides/build-sso-integration/) is supported for redirect authentication. This means that Okta may create a session (based on the Okta policies, for example). Other integrated apps can then use SSO to sign users in.

Consider, for example, when an organization uses Okta as its Identity Provider:

* The user tries to access the organization's on-site or cloud-based app (for example, email).
* The user is redirected to the corporate Identity Provider (Okta) to sign in and authenticate.
* The user is authenticated and Okta provides a token or assertion to the original app to grant the user access. Okta also creates an Okta session for the user.
* The user accesses the app.

Using SSO with the existing Okta session, the user is automatically signed in to any other of the org's Service Provider apps. Some examples of those apps include CRM, IT, HR, and so on.

The interactions and communication with the Identity Provider are as follows:

<!--
See http://www.plantuml.com/plantuml/uml/

Source code for redirect-auth-seq-flow.png:

@startuml
skinparam monochrome true

participant "User" as us
participant "Application Client" as cl
participant "Identity Server" as is

us -> cl: Resource Owner (User)
cl -> is: Redirect to IdP with authentication request
is -> cl: Return HTML forms to challenge user for authentication, enrollment, and so on
cl <-> us: User interacts
cl -> is: Complete authentication request
is -> cl: Return assertion to client
@enduml

 -->

<div class="three-quarter">

![A flow diagram showing the interactions in a sign-in flow between user, client application, and Okta using redirect authentication](/img/auth/redirect-auth-seq-flow.png)

<!-- source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4345%3A10234&mode=design&t=Zl0pQHW1kqZli8ZO-1 redirect-auth-seq-flow -->

</div>

### Redirect summary

* Use it straight out of the box, with no maintenance and no updates as Okta hosts and secures.
* Minimize [XSS](https://developer.okta.com/books/api-security/sanitizing/common-attacks/#xss-cross-site-scripting) (cross-site scripting) attacks on your app so they don't affect the sign-in experience.
* Integrate it easily either manually or with a generic OpenID Connect client.
* Customize it through HTML, CSS, and JavaScript.
* Limit the complex logic changes that require source code access.
* Redirects the user out of the app to Okta, and then back to the app.
* Handles most client deployment requirements.

### When to use the redirect deployment model

* You have multiple apps or use third-party apps and need SSO.
* You want Okta to control the authentication flows through policy configuration.
* You want Okta to control upgrades to take advantage of new functionality.
* You have an app that already uses an OAuth 2.0 or SAML provider to sign in.

## Embedded authentication

Embedded authentication authenticates user credentials directly at the client app site using an embedded Sign-In Widget, authentication SDK, or direct API calls. Redirection to Okta isn't required. The client app's code determines the methods and processes necessary to authenticate, and then uses SDKs to validate the credentials. Client apps create their own app sessions for user access.

Client apps may also exchange tokens with a Security Token Service (STS) to provide SSO access to other Service Providers (like CRM, IT, and HR). Using this deployment model, the client’s sign-in page can render mobile user experiences and use mobile platform APIs.

<EmbeddedBrowserWarning />

### Why use embedded authentication

The customer-hosted embedded widget is the best balance of flexibility and effort to integrate. Use the customer-hosted embedded widget if an integration requires a deeper level of customization than is available through an Okta-hosted widget. The embedded widget works by embedding the open source [Okta Sign-In Widget](https://github.com/okta/okta-signin-widget) into the app's web page.

Okta builds and updates the widget. The widget uses an industry best practice security design, and you can add it to a page with a few lines of HTML/JavaScript. Also, you can load it directly from the CDN, NPM, or build from source.

<div class="three-quarter">

![Customer-hosted widget](/img/auth/CustomerHosted.png)

</div>

The look is customized directly through HTML/CSS/SASS and JavaScript. Features are configured within the Admin Console and enabled through JavaScript.

The SDK and API options allow for even more control over customization of the entire experience, but they do have their drawbacks. They're more complex to implement and maintain, and the security is your responsibility. They're available if you need that level of customization.

### Authorization server and resource owner interactions

The following are the detailed interactions at the client level between a client’s authorization server and resource owner:

<!--
See http://www.plantuml.com/plantuml/uml/

Source code for embedded-auth-seq-flow.png:

@startuml
skinparam monochrome true

participant "Resource Owner (User)" as rs
participant "Identity Engine Application Client" as cl
participant "Identity Server" as as

rs -> cl: Resource Owner
cl -> as: Resource Owner Password Credentials
as -> cl: Interaction required
rs <-> cl: User interacts
cl <-> as: User interacts
as -> cl: Interaction Code
cl -> as: Interaction Code
as -> cl: Tokens
@enduml

 -->

<div class="three-quarter">

![A flow diagram showing the interactions in a sign-in flow between user, client application, and Okta using the embedded model](/img/auth/embedded-auth-seq-flow.png)

<!-- Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4345%3A10249&mode=design&t=Zl0pQHW1kqZli8ZO-1 embedded-auth-seq-flow
-->

</div>

### Embedded summary

* Moderate maintenance may be required. If using a CDN, maintenance is more limited as Okta keeps it up to date. NPM packages a specific version of the widget, which means that it may need to be updated in the project periodically. Customized or local versions of the Sign-In Widget source code require regular updating.
* A great level of customization control for source code is offered while being drastically easier and more secure than building from scratch.
* A slightly increased risk in security exists due to Okta not being able to guarantee that the Sign-In Widget has been implemented correctly. The app code may be able to access the credentials that the user enters into the Sign-In Widget, which needs to be kept secure.
* XSS (cross-site scripting) attacks on your app may result in stolen sign-in credentials.
* A higher level of effort to integrate and maintain is required compared to the Okta-hosted Sign-In Widget.
* The user is kept in the app, which reduces redirects to and from Okta.

## Direct authentication

<ApiLifecycle access="ea" />

You can use the Direct Authentication API with your apps in Identity Engine rather than an embedded SDK. This allows you to directly authenticate users rather than delegating authentication to Okta Identity Providers and authorization servers through an HTTP redirect in a web browser. Direct authentication is beneficial in scenarios where there's a high degree of trust between the user and the app. It's also beneficial where browser-based flows aren't feasible, like with mobile apps.

See the `/challenge` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/challengeOrgAS), the `/oob-authenticate` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/oob-authenticateOrgAS), and the new `grant_types` for the `/token` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/token). Also, for information on how to set up each new grant type, see [Configure Direct Auth grant types](/docs/guides/configure-direct-auth-grants/).

## Deployment models and the Authentication API

The following table details the configurations that define which Authentication API (Classic Engine or Identity Engine) your app uses based on your deployment model.

| Deployment Model | Classic Engine Authentication API | Identity Engine Authentication API |
| ---------------- | --------------------------------- | ---------------------------------- |
| **Redirect:<br>Okta Hosted Sign-In Widget**<br>To verify that the redirect deployment is used in your app code,<br>check that you're using one of these SDKs:<br>[Android](https://github.com/okta/okta-mobile-kotlin), [Angular](https://github.com/okta/okta-angular), [ASP.NET](https://github.com/okta/okta-aspnet), [iOS](https://github.com/okta/okta-mobile-swift), [React](https://github.com/okta/okta-react), [React Native](https://github.com/okta/okta-react-native), [Vue](https://github.com/okta/okta-vue)| The API type depends on your [org configuration](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version). | The API type depends on your [org configuration](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version). |
| **Embedded:<br>Customer Hosted Sign-In Widget** | <strong>Okta Sign-In Widget version 7+:</strong><br>`useClassicEngine` set to `true`<br><br><strong>Okta Sign-In Widget version < 7:</strong><br>Classic Engine used by default | <strong>Okta Sign-In Widget version 7+:</strong><br>Identity Engine used by default<br><br><strong>Okta Sign-In Widget version < 7:</strong><br>`useInteractionCodeFlow` set to `true` |
| **Embedded: SDKs** | To verify that the embedded deployment is used in<br>your app code, check that you're using one of these Classic Engine SDKs:<br>[Java](https://github.com/okta/okta-auth-java), [JavaScript](https://github.com/okta/okta-auth-js), [.NET](https://github.com/okta/okta-auth-dotnet), [Swift](https://github.com/okta/okta-auth-swift) | To verify that the embedded deployment is used in<br>your app code, check that you're using one of these Identity Engine SDKs:<br>[Android](https://github.com/okta/okta-idx-android), [ASP.NET](https://github.com/okta/okta-idx-dotnet), [iOS](https://github.com/okta/okta-idx-swift), [Java](https://github.com/okta/okta-idx-java), [Node.js](https://github.com/okta/okta-auth-js) |
| **Embedded: APIs** | Your app uses the [Classic Authentication API](/docs/reference/api/authn/). | N/A  |

## See also

[OAuth 2.0 and OpenID Connect Overview](/docs/concepts/oauth-openid/)
