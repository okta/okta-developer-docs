---
title: Redirect vs. embedded Authentication
meta:
  - name: description
    content: A high-level overview of the the redirect and embedded authentication models for Okta Identity Engine.
---

# Redirect authentication vs. embedded authentication

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" />

When you develop applications that require customer sign in and authentication, the user authentication deployment model is a critical design consideration that can broadly be divided into two approaches:

- **Redirect authentication**: A user sign-in flow that grants authentication control to Okta by redirecting to an Okta hosted sign-in page using open protocols like OAuth 2.0 and SAML.
- **Embedded authentication**: A user sign-in flow where the application retains authentication control, without redirection to Okta, using a client-hosted Sign-In Widget, Identity Engine SDKs, or directly with Okta’s proprietary Identity Engine authentication APIs.

Identity Engine supports both these deployment and authentication models, and uses authentication protocols to communicate with the Identity Server, the entity that acts as the logical location for all identity-related services and resources.

## Redirect authentication

Redirect authentication is the process of delegating authentication to your Okta org and externalizes this process from the client application. The user or system is redirected to Okta for credential verification by the Identity Engine and is then provided authenticated access to the client application and other Service Providers.

When a user signs-in to the client application, they are redirected to Okta using a protocol like SAML or OpenId Connect (OIDC). After the user signs in (based on policies that are configured in Okta), Okta redirects the user back to your application. The hosted Okta Sign-in Widget can also be customized, including the domain, to match your application's brand.

Single Sign-on (SSO) is supported for this implementation. That is, Okta may create a session (based on the Okta policies, for example), and other integrated applications can use SSO to sign in users.

This authentication model is easy to implement, secure, and requires minimal maintenance from client application developers. It serves most client deployment requirements.

An example of this flow is when an organization uses Okta as its Identity Provider. A user tries to access the organization's on-site or cloud-based application (for example, email) and is redirected to the corporate Identity Provider, Okta, to provide sign in and authentication. After the user is authenticated, Okta provides a token or assertion to the original application to grant the user access. Okta also creates an Okta session for the authenticated user. Using SSO with this existing Okta session, the user is automatically signed in to any other of the organization's Service Provider applications (CRM, IT, HR, and so on).

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

Deploy the redirect authentication model in the following use-cases:

- When you have multiple applications or use third-party applications and need SSO.
- You want Okta to control the authentication flows through policy configuration.
- You want Okta to control upgrades to take advantage of new functionality.
- Your application already uses an OAuth 2.0 or SAML provider to sign in.

## Embedded authentication

Embedded authentication is the process of authenticating user credentials directly at the client application site using proprietary Okta authentication protocols. No redirection to Okta is required. The client application's code determines the methods and processes necessary to authenticate, and uses Okta’s Identity Engine SDK to validate the credentials. Client applications create their own application sessions and require explicit support for SSO to other external Service Providers.

With embedded authentication, the client application obtains and validates the user's credentials by API calls to Okta, generally through the customer-hosted Sign-In Widget. Based on the organization’s requirements, the client application then creates a session for user access. The client application may also exchange tokens with a Security Token Service (STS) to provide SSO access to other Service Providers (CRM, IT, HR, and so on). Using this deployment model, the client’s sign-in page can render native user experiences and use native platform APIs.

This deployment model requires more effort to implement and includes increased risk. However, it does provide a deeper scope of customization and keeps users in the application with reduced redirects to Okta.

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

## Comparison between deployment models

The deployment model or authentication approach is dependent on your implementation requirements and client application. In general, the method of delegating user sign-in interaction (redirect authentication) is generally preferred for many reasons spanning security to user experience.

Use this table and the following Q&A to understand the differences between redirect authentication and embedded authentication, and what flow works best for your application implementation:

| Requirement                                               | Redirect authentication | Embedded authentication |
| --------------------------------------------------------- | ------------------------ | --------------------- |
| Client application requires a redirect to an Identity Provider.   |   &#9989;     | |
| Client application is tightly coupled with authentication methods and processes.  |        | &#9989; |
| SSO is implicit (if an Okta session is created, SSO is implemented for other resources).   |   &#9989;     | |
| Application customization is a key requirement.   |        | &#9989;|

Further questions to determine what authentication flow works best for your implementation:

Q. Does the application want to own the authentication and registration process without leaving the application?

A. Embedded authentication

Q. Does the application want to own user remediation (communication with Identity Server)?

A. Embedded authentication

Q. Does the application need to support external Identity Providers, authenticators, or claims providers?

A. Redirect authentication or embedded authentication

Q. Does the application need SSO for downstream resources?

A. Redirect authentication

Q. Does the application need centralized session management across applications?

A. Redirect authentication
