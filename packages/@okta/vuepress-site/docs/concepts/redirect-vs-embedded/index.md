---
title: Okta authentication models — redirect vs. embedded
meta:
  - name: description
    content: A high-level overview of the the redirect and embedded authentication models Okta provides.
---

# Okta authentication models — redirect vs. embedded

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

When you develop applications that require the customer to sign-in and authenticate, the user authentication deployment model is a critical design consideration. In this article we look at the authentication options that Okta provides and what the differences are between them.

## Redirect vs. embedded

Okta's deployment models can be broadly divided into two approaches:

- **Redirect authentication**: A user sign-in flow that grants authentication control to Okta by redirecting to an Okta hosted sign-in page using open protocols like OAuth 2.0 and SAML.
- **Embedded authentication**: A user sign-in flow where the application retains authentication control, without redirection to Okta, using a client-hosted embedded Sign-In Widget, the SDKs, or directly with API calls.

What deployment model or authentication approach you choose depends on your implementation requirements and client application. In general, the method of delegating user sign-in interaction (redirect authentication) is generally preferred for many reasons that span from security to user experience.

Use this table and the subsequent sections to better understand the differences between redirect authentication and embedded authentication, and what flow works best for your application implementation:

| Requirement                                               | Redirect authentication | Embedded authentication |
| --------------------------------------------------------- | ------------------------ | --------------------- |
| Client application requires a redirect to an Identity Provider.   |   &#9989;     | |
| Client application owns the authentication and registration process.  |        | &#9989; |
| Client application owns user remediation (communication with Identity Server).  |        | &#9989; |
| Client application needs to support external Identity Providers, authenticators, or claims providers.  | &#9989; | &#9989; |
| SSO is implicit (if an Okta session is created, SSO is implemented for other resources).   |   &#9989;     | |
| Full control over application customization is a key requirement.   |        | &#9989;|
| Client application requires centralized session management across applications.   |&#9989;|      |

> **Note**: To get started with implementing a user sign-in flow, see [Sign in users](#) (WILL BE /docs/guides/sign-in-overview/ IN THE FINAL VERSION). Read on for more guidance in choosing what model is right for you.

## Redirect authentication

Redirect authentication through the Okta-hosted Sign-In Widget is considered the easiest and most secure means of integration. This is because the Sign-In Widget itself is hosted by Okta, maintained by Okta, and kept secure by Okta. The Okta-hosted Sign-In Widget is recommended for most integrations.

![Okta-hosted widget](/img/OktaHosted.png "Displays the integration for an Okta-hosted Sign-In Widget")

The user or system is redirected to Okta for credential verification and is then provided authenticated access to the client application and other Service Providers. When a user signs in to the client application, they are redirected to Okta using a protocol like SAML or OpenID Connect (OIDC). After the user signs in (based on policies that are configured in Okta), Okta redirects the user back to your application. You can customize your app's [URL domain](/docs/guides/custom-url-domain/) and the [Sign-In Widget style](/docs/guides/custom-widget/) to match your brand.

> **Note**: [Single Sign-on (SSO)](/docs/guides/build-sso-integration/) is supported for redirect authentication. That is, Okta may create a session (based on the Okta policies, for example), and other integrated applications can use SSO to sign in users.

Consider for example when an organization uses Okta as its Identity Provider. A user tries to access the organization's on-site or cloud-based application (for example, email) and is redirected to the corporate Identity Provider, Okta, to provide sign in and authentication. After the user is authenticated, Okta provides a token or assertion to the original application to grant the user access. Okta also creates an Okta session for the authenticated user. Using SSO with this existing Okta session, the user is automatically signed in to any other of the organization's Service Provider applications (CRM, IT, HR, and so on).

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
![Redirect authentication](/img/redirect-auth-seq-flow.png "Redirect authentication sequence flow")

### Redirect summary

* Works out of the box.
* Easy to use with no maintenance and no updates.
* Hosted and secured by Okta.
* [XSS](https://developer.okta.com/books/api-security/sanitizing/common-attacks/#xss-cross-site-scripting) (cross-site scripting) attacks on your application will not affect the sign-in experience.
* Easy to integrate manually or with a generic OpenID Connect client.
* Extremely customizable through HTML, CSS, and JavaScript.
* Complex logic changes that require source code access are limited.
* The user is redirected out of the application, to Okta, and then back to the application.
* Handles most client deployment requirements.

### Deploy the redirect authentication model when

- you have multiple applications or use third-party applications and need SSO.
- you want Okta to control the authentication flows through policy configuration.
- you want Okta to control upgrades to take advantage of new functionality.
- your application already uses an OAuth 2.0 or SAML provider to sign in.

## Embedded authentication

Embedded authentication is the process of authenticating user credentials directly at the client application site using an embedded Sign-In Widget or authentication SDK, or direct API calls. No redirection to Okta is required. The client application's code determines the methods and processes necessary to authenticate, and uses SDKs to validate the credentials. Client applications create their own application sessions for user access, and may also exchange tokens with a Security Token Service (STS) to provide SSO access to other Service Providers (CRM, IT, HR, and so on). Using this deployment model, the client’s sign-in page can render native user experiences and use native platform APIs.

<EmbeddedBrowserWarning />

The Customer-hosted embedded Sign-In Widget is considered the best balance of flexibility and effort to integrate, and is recommended if an integration requires a deeper level of customization than is available via an Okta-hosted sign-In Widget. The embedded Sign-In Widget works by embedding the open source [Okta Sign-In Widget](https://github.com/okta/okta-signin-widget) into the application's web page. The Sign-In Widget is built and updated by Okta, uses industry best practice security design, and is added to a page with a few lines of HTML/JavaScript. It can be loaded directly from the CDN, NPM, or built from source.

![Customer-hosted widget](/img/CustomerHosted.png "Displays the integration for a customer-hosted Sign-In Widget")

The look and feel is customized directly through HTML/CSS/SASS and JavaScript. Features are configured within the Okta Admin Console and enabled through JavaScript.

The SDK and API options allow for even more control over customization of the entire experience, but they do have their drawbacks — they are more complex to implement and maintain, and the security is your responsibility. They are available if you need that level of customization.

The detailed interactions at the client level between a client’s authorization server and resource owner are provided below:

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
![Embedded authentication](/img/embedded-auth-seq-flow.png "Embedded authentication sequence flow diagram")

### Embedded summary

* Moderate maintenance may be required. If using a CDN, maintenance is more limited as it is being kept up-to-date by Okta. NPM packages a specific version of the widget, which means that it may need to be updated in the project periodically. Customized or local versions of the Sign-In Widget source code would require regular updating.
* A great level of source code customization control while being drastically easier, and more secure, than building from scratch.
* Slightly increased risk in security due to Okta not being able to guarantee that the Sign-In Widget has been implemented correctly. Specifically, the application code may have the ability to access the credentials that the user has entered into the Sign-In Widget, which need to be kept secure.
* XSS (cross-site scripting) attacks on your application may result in stolen sign-in credentials.
* Higher level of effort to integrate and maintain compared to the Okta-hosted Sign-In Widget.
* Keeps the user in the application, reducing redirects to and from Okta.


## Deployment models and the Authentication API

The following table details the configurations that define which Authentication API (either Okta Classic Engine or Identity Engine) your application is using based on your deployment model.

| Deployment Model | Classic Engine Authentication API | Identity Engine Authentication API |
| ---------------- | --------------------------------- | ---------------------------------- |
| **Redirect:<br>Okta Hosted Sign-In Widget**<br>To verify that the redirect deployment is used in your application code,<br>check to see if you are using one of these SDKs:<br>[Android](https://github.com/okta/okta-oidc-android), [Angular](https://github.com/okta/okta-angular), [ASP.NET](https://github.com/okta/okta-aspnet), [iOS](https://github.com/okta/okta-oidc-ios), [React](https://github.com/okta/okta-react), [React Native](https://github.com/okta/okta-react-native), [Vue](https://github.com/okta/okta-vue)| The API type depends on your [org configuration.](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) | The API type depends on your [org configuration.](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) |
| **Embedded:<br>Customer Hosted Sign-In Widget** | Your Sign-In Widget configuration is using:<br>`useInteractionCodeFlow: false`<br>**Or** the `useInteractionCodeFlow` property isn't present | Your Sign-In Widget configuration is using:<br>`useInteractionCodeFlow: true` |
| **Embedded: SDKs** | To verify that the embedded deployment is used in<br>your application code, check to see if you are using one of these Classic Engine SDKs:<br>[Java](https://github.com/okta/okta-auth-java), [JavaScript](https://github.com/okta/okta-auth-js), [.NET](https://github.com/okta/okta-auth-dotnet), [Swift](https://github.com/okta/okta-auth-swift) | To verify that the embedded deployment is used in<br>your application code, check to see if you are using one of these Identity Engine SDKs:<br>[Android](https://github.com/okta/okta-idx-android), [ASP.NET](https://github.com/okta/okta-idx-dotnet), [Go](https://github.com/okta/okta-idx-golang), [iOS](https://github.com/okta/okta-idx-swift), [Java](https://github.com/okta/okta-idx-java), [Node.js](https://github.com/okta/okta-auth-js) |
| **Embedded: APIs** | Your app is using: [Authn API](/docs/reference/api/authn/) | N/A  |

## See also

[OAuth 2.0 and OpenID Connect Overview](/docs/concepts/oauth-openid/)