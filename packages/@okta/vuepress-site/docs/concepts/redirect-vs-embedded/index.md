---
title: Redirect vs Embedded Authentication
meta:
  - name: description
    content: A high-level overview of the the redirect and embedded authentication models for Okta Identity engine.
---

# Redirect Authentication Vs Embedded Authentication

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" />

When developing applications requiring customer sign in and authentication, the deployment model of user authentication is a critical design consideration, which can broadly be divided into two types:

- **Redirect Authentication**: A user sign-in flow that grants authentication control to Okta by redirecting to an Okta hosted Sign-in page using open protocols like OAuth 2.0 and SAML.
- **Direct Authentication**: A user sign-in flow where the application retains authentication control, without redirection to Okta, using client-hosted Sign-In Widget, IDX SDKs, or directly with Okta’s proprietary IDX authentication APIs.

The Identity engine supports both these deployment and authentication models, and uses authentication protocols to communicate with the Identity Server, the entity that acts as the logical location for all identity-related services and resources.

## Redirect Authentication

Redirect authentication is the process of delegating authentication to your Okta org and externalizes this process from the client application. The user or system is redirected to Okta for credential verification by the Identity engine, and is then provided authenticated access to the client application and other service providers.

During sign-in to the client application, users are redirected to Okta using a protocol like SAML or OIDC. After the user signs in (based on policies that are configured in Okta), Okta redirects the user back to your application. The hosted Okta Sign-in Widget can also be customized, including the domain, to match your application's brand. 

Single Sign-on (SSO) is supported for this implementation. That is, Okta may create a session (based on the Okta policies, for example), and other integrated applications use SSO to sign in users with no configurations.

This authentication model is easy to implement, secure, and requires minimal maintenance on the part of the client application. It serves most client deployment requirements.

An example of this flow is an organization using Okta as its Identity Provider. A user signs into an organization's on-site or cloud-based application (for example, email) and is redirected to the corporate Identity Provider, Okta, to provide sign-in and authentication. An authenticated user is then provided with a token or assertion, which provides the user access to their original application. With this existing Okta session, using SSO, the user is automatically logged into any other of the organization's service provider applications (CRM, IT, HR, and so on).

In a simplified detail, the following diagram illustrates the redirect authentication flow:

![Simplified Redirect Authentication](/img/fed-auth-simplified.png "Simplified Redirect Authentication flow diagram")

The interactions and communication with the Identity Provider are as follows:

<!--
See http://www.plantuml.com/plantuml/uml/

Source code for fed-auth-seq-flow.png:

@startuml
skinparam monochrome true

participant "User" as us
participant "Redirected Client" as cl
participant "Identity Server" as is

us -> cl: Resource Owner (User)
cl -> is: Redirect to IdP with Authentication Request
is -> cl: Return HTML forms to challenge user for authentication, enrollment, and so on
cl <-> us: User interacts
cl -> is: Complete Authentication Request
is -> cl: Return Assertion to Client
@enduml

 -->
![Redirect Authentication](/img/fed-auth-seq-flow.png "Redirect Authentication sequence flow")

Deploy the redirect authentication model in the following use-cases:

- When you have multiple applications, or use third- party applications and need SSO.
- You want Okta to control the authentication flows through policy configuration.
- You want Okta to control upgrades to take advantage of new functionality.
- Your application already uses an OAuth or SAML provider to sign in.

## Embedded Authentication

Embedded authentication is the process of authenticating user credentials directly at the client application site using proprietary Okta authentication protocols. No redirection to Okta is required. The client application's code determines the methods and processes necessary to authenticate, and uses Okta’s IDX SDK to validate the credentials. Client applications create their own application sessions, and require explicit support for SSO to other external service providers.

With embedded authentication, the user’s credentials are directly obtained by the client application and validated by API calls to Okta, generally through the customer-hosted Sign-in Widget. Based on the organization’s requirements, the client application then creates a session for user access. The client application may also exchange tokens with a Security Token Service (STS) to provide SSO access to other service providers (CRM, IT, HR, and so on). Using this deployment model, the client’s sign-in page can render native user experiences and use native platform APIs.

This deployment model does require more effort to implement and includes increased risk. However, it provides a deeper scope of customization and keeps users in the application with reduced redirects to Okta.

In simplified details, the following diagram illustrates the embedded authentication flow:

![Simplified Direct Authentication](/img/direct-auth-simplified.png "Simplified Direct Authentication flow diagram")

The detailed interactions at the client level between a client’s authorization server and resource owner are provided below:

<!--
See http://www.plantuml.com/plantuml/uml/

Source code for direct-auth-seq-flow.png:

@startuml
skinparam monochrome true

participant "Resource Owner (User)" as rs
participant "IDX Application Client" as cl
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
![Embedded Authentication](/img/direct-auth-seq-flow.png "Embedded Authentication sequence flow diagram")

## Comparison between deployment models

The type of deployment model or authentication is dependent on your individual implementation needs and client application. In general, the method of delegating user interaction (Redirect authentication) is generally preferred for many reasons spanning security to user experience.

Use this table and following Q&A to understand the differences between Redirect Authentication and Embedded Authentication, and what flow works best for your application implementation:

| Change                                                    | Redirect Authentication | Embedded Authentication |
| --------------------------------------------------------- | ------------------------ | --------------------- |
| Client application requires a redirect to an Identity Provider.   |   &#9989;     | |
| Client application tightly coupled with authentication methods and processes.  |        | &#9989; |
| SSO is implicit (if session created, SSO implemented for other resources)   |   &#9989;     | |
| Application customization is a key requirement   |        | &#9989;|

Further questions to determine what authentication flow works best for your implementation:

Q. Does the application want to own the authentication and registration process without leaving the application?

A. Embedded Authentication

Q. Does the application want to own user remediation (communication with Identity Server)?

A. Embedded Authentication

Q. Does the application need to support external identity providers, authenticators,  or claims providers?

A. Redirect Authentication or Embedded Authentication

Q. Does the application need to SSO to downstream resources?

A. Redirect Authentication

Q. Does the application need centralized session management across applications?

A. Redirect Authentication
