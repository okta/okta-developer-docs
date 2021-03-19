---
title: Federated vs Direct Authentication
meta:
  - name: description
    content: A high-level overview of the the federated and direct authentication models for Okta Identity platform.
---

# Federated Authentication Vs Direct Authentication

When developing applications requiring customer sign in and authentication, the deployment method of user authentication is a critical design consideration, which can broadly be divided into two types :

- Federated Authentication: Authenticating users by redirecting to an Okta Sign-in Page using open protocols like OAuth 2.0 and SAML.
- Direct Authentication: Authenticating users directly in your application using an Okta Authentication API, or libraries that leverage the Authentication API.

The Identity engine supports both these deployment and authentication models, and uses authentication protocols to communicate with the Identity Server, the entity that acts as the logical location for all identity-related services and resources for both models.

## Federated Authentication

Federated authentication is the process of delegating authentication to your Okta org and externalizes this process from the client application. The user or system is redirected  to Okta for credential verification and are then provided authenticated access to the client application and other service providers.

During sign-in to the client application, users are redirected to Okta using a protocol like SAML or OIDC. After the user signs in (based on policies that are configured in Okta), Okta redirects the user back to your application. The Okta sign-in page can also be customized, including the domain, to match your application's brand.

Single Sign-on (SSO) is supported for this implementation. That is, Okta MAY create a session (based on the Okta policies, for example), and other integrated applications use SSO to sign in users with no configurations.

A real-world example of this code flow is an organization using Google for corporate email. A user logs in to their corporate Google account (mail.google.com), the service provider, and are redirected to the corporate Identity Provider, Okta, to provide sign-in and authentication. An authenticated user is provided with a token or assertion, which provides the user email access on the Servicer Provider application (Google mail).

In a simplified detail, the following diagram illustrates the federated authentication flow:

![Simplified Federated Authentication](/img/fed-auth-simplified.png "Simplified Federated Authentication flow diagram")

The interactions and communication with the Identity Server are provided below:

<!--
See http://www.plantuml.com/plantuml/uml/

Source code for fed-auth-seq-flow.png:

@startuml
skinparam monochrome true

participant "User" as us
participant "Federated Client" as cl
participant "Identity Server" as is

us -> cl: Resource Owner (User)
cl -> is: Redirect to IdP with Authentication Request
is -> cl: Return HTML forms to challenge user for authentication, enrollment, and so on
cl <-> us: User interacts
cl -> is: Complete Authentication Request
is -> cl: Return Assertion to Client
@enduml

 -->
![Federated Authentication](/img/fed-auth-seq-flow.png "Federated Authentication sequence flow")

Deploy the federated authentication model in the following use-cases:

- When you have multiple applications, or use third- party applications and need SSO.
- You want Okta to control the authentication flows through policy configuration.
- You want Okta to control upgrades to take advantage of new functionality.
- Your application already uses an OAuth or SAML provider to sign in.

## Direct Authentication

Direct authentication is the process of authenticating user credentials directly at the client application site using authentication protocols. No redirection to Okta is required. The client application's code determines the methods and processes necessary to authenticate, and uses APIs that are exposed by Okta to validate the credentials. Client applications create their own application sessions, and require explicit support for SSO to other external service providers.

The client application’s code determines how the user signs in, and determines the authentication methods and processes; there is no-redirection to other sites or applications for authentication. The client application interacts with the Okta API using the Okta proprietary Identity engine API.

In simplified details, the following diagram illustrates the direct authentication flow:

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
![Direct Authentication](/img/direct-auth-seq-flow.png "Direct Authentication sequence flow diagram")

## Comparison between deployment models

The type of deployment model or authentication is dependent on your individual implementation needs and client application. In general, the method of delegating user interaction (Federated authentication) is generally preferred for many reasons spanning security to user experience.

Use this table and following Q&A to understand the differences between Federated Authentication and Direct Authentication, and what flow works best for your application implementation:

Further questions to determine what authentication flow works best for your implementation:

| Change                                                    | Federated Authentication | Direct Authentication |
| --------------------------------------------------------- | ------------------------ | --------------------- |
| Client application requires a redirect to an Identity Provider.   |   &#9989;     | |
| Client application tightly coupled with authentication methods and processes.  |        | &#9989; |
| SSO is implicit (if session created, SSO implemented for other resources)   |   &#9989;     | |

Q. Does the application know how it wants to authenticate or register the user (for example, always start flow with a password rendered directly in application)?

A. Direct Authentication

Q. Does the application want to own user remediation (communication with Identity Server)?

A. Direct Authentication

Q. Does the application need to support external identity providers, authenticators,  or claims providers?

A. Federated Authentication

Q. Does the application need to SSO to downstream resources?

A. Federated Authentication

Q. Does the application need centralized session management across applications?

A. Federated Authentication
