---
title: Identity and Access Management (IAM) overview
---
Learn the key issues and concepts for adding identity and access management to your internal and external services.

# Identity and Access Management (IAM) overview

Ensuring that the right person gets access to the right services requires designing and implementing sign-in flows and access management. This usually involves integrating complex functionality into many areas of your applications. The solution impacts your end users and customers, your employees, and how easy it is to adapt changing security needs. Even small issues with the design or implementation can cause reliability issues, or worse, expose a weakness in your security.

The first challenge is understanding the requirements: who needs to access which services and what do they need to accomplish. It's not always as simple as employees and customers as there may be different types of access, such as a user versus an administrator. Designing and implementing the systems to meet your requirements can also require significant effort, though products such as Okta can reduce the time, effort, and risk.

This series of articles introduces you to the different parts of designing and implementing IAM for your services. This article is an overview of the following parts:

- [**IAM concepts**](#iam-concepts) introduces the Workforce and Customer Identity models for IAM solutions and summarizes the main features of an IAM solution.

- [**IAM design example**](#iam-design-example) illustrates a typical CIAM solution for an application that supports an organization's employees and customer users.

- [**Designing an IAM solution**](#designing-an-iam-solution) summarizes the key areas of IAM. These areas include identity management, key architectural considerations, and a link to a glossary of key terms and concepts.

Some topics require more information. Those are covered in other parts of the series, including one that's a list of common terminology:

 - [**Identity management factors**](/docs/concepts/iam-overview-identity-management-factors/) focuses on identity storage, processing, and related administration design.

 - [**Authentication factors**](/docs/concepts/iam-overview-authentication-factors/) describes design considerations for verifying that users are legitimate.

 - [**Authorization factors**](/docs/concepts/iam-overview-authorization-factors/) describes design considerations for defining what resources a user can access, and then granting or denying individual access requests (*access control*).

 - [**Architectural factors**](/docs/concepts/iam-overview-architectural-factors/) lists some of the more important architectural requirements to consider and identifies a few possible strategies for addressing them.

 - [**IAM terminology**](/docs/concepts/iam-overview-iam-terminology/) contains key definitions.

## IAM concepts

*Identity and Access Management (IAM)* (also called *Identity Security*) secures your services in two ways. First, it verifies the identity of a user both when they sign-in and at other appropriate times. Second, it lets a user access only the parts of your network and services for which they have permission. For example, a customer may require only a username and password and is able to view and buy items. A vendor may also require a one-time password and is able to add and update items, but not buy them.

### Workforce and Customer Identity

High-level designs for IAM may be called *Customer* or *Workforce identity*. The two have a significant overlap in use cases and technical approaches, but the most important thing is to design and build a solution that meets your particular requirements.

- Workforce identity (*Workforce* or *WF*) solutions manage employee and contractor access to your organization's apps and resources. The main goal of WF solutions is to manage risk. User identities are usually assigned by the IT team. Use cases are typically administrative, such as controlling access to apps by integrating them into your single sign-on solution.

- Customer identity (*Customer Identity* and Access Management* or *CIAM*) solutions add managing customer, partner, and other external access to WF. Ease of use for customers is important, as the goal is usually to increase both customer engagement and revenue. Unlike WF users, customers commonly create their own identities, may have multiple identities, and sign in from more locations and platforms. Use cases are typically user focused, such as user experience, and building branded user registration and sign-in flows.

<div class="three-quarter border">

![An illustration that gives examples of the roles of people that access customer versus workforce solutions.](/img/concepts/IAM/01-iam-types.png)

</div>

### Features of an IAM solution

You can divide the features of an IAM system into three areas: user experience, security, and infrastructure. The following diagram illustrates the most important features in each area.

<div class="full border">

![An illustration that shows some of the important components of the user experience, security implementation, and infrastructure of identity and access management solutions.](/img/concepts/IAM/02-iam-parts.png)

</div>

#### Infrastructure

- **Scalability:** Design your solution to allow for user growth, changing use patterns, and evolutionary changes to your applications and infrastructure, without requiring a redesign.

- **Easy integration with app stack:** Decouple your IAM solution from your applications to allow them to evolve independently and enable multiple apps to use your solution. Enable integration with your apps that optimizes performance by designing an event-based interface that is accessed using an API. Provide an SDK to make integration easier.

- **Traffic surge protection:** Provide a way to prevent sudden bursts of requests from disrupting usage or operations.

- **High availability:** Ensure that all elements of your IAM solution are fully operational whenever your apps are expected to be operable.

- **High reliability** (highly redundant): Ensure that all elements of your IAM solution are highly reliable and dependable, and that every element of your solution works correctly, every time.

#### Security

- **User storage and password management:** Store and manage information about your users, including their passwords, for authenticating and authorizing users.

- **MFA (Multifactor Authentication):** Require a user to verify their identity in different ways. Some of these ways include knowledge, such as answers to questions, biometrics, such as a fingerprint, or possession, such as a key-card. MFA is key to controlling access to your applications.

- **DDoS protection:** Prevent Distributed Denial of Service (DDoS) attacks from blocking legitimate use of your applications.

- **Compliance:** Ensure that your solution complies with specific regulatory requirements for privacy, as well as with industry and local cybersecurity standards. For example, applications that handle healthcare patient data must conform to HIPPA, financial solutions may require SOX or PCI, and any that server Europe must follow GDPR.

- **Data access control:** Develop facilities to grant or deny specific user requests to access apps and resources based on policies, user authentication and authorizations, and other data. Application developers embed access control checks throughout their code to enforce your access requirements.

#### User experience

- **Self service:** Allow end users, especially customers, to self-administer their accounts, including creation, password reset, and originating access requests. This can increase customer satisfaction, reduce friction, and reduce your admin workload.

- **Social auth (social authentication):** Allow end users to sign in with their social media credentials, such as a Facebook or LinkedIn ID, rather than special credentials for your IAM solution. This can enhance customer satisfaction, provide reliable user demographic information, and reduce admin workload. (Social authentication is a special case of *external IdP authentication*, below.)

- **External IdP (external Identity Provider):** Allow users to sign in using a sign-in ID from an external Identity Provider, such as Active Directory, rather than special credentials for your apps. This can increase user satisfaction and reduce your admin workload.

- **SSO (Single Sign-On):** Allow users to sign in with a single ID to access multiple related applications. This can increase user satisfaction and reduce admin workload. Closely related is FIM *(federated identity management)*, in which users sign in and access multiple federated external Identity Providers. It has the same benefits as SSO, and allows users to sign in with their existing sign-in IDs.

- **Automated onboarding:** Automate onboarding workflows and lifecycle management, such as manage a new user's AWS SSO entitlements, capture document signatures, and provision and deprovision user app accounts. This minimizes the time and effort to provision new users and perform other lifecycle change procedures, reduces errors and admin workload, and creates a positive experience for new users.

- **Frictionless MFA experience:** Use special strategies, such as SSO or simplified sign-in flows from managed devices to streamline user sign-in flows.

## IAM design example

The figure below shows a typical CIAM solution for an application that supports an organization's employees and customer users (B2B). End users sign in to the web portal or mobile app in a variety of ways. All end users sign in to the same system, but sign-in behavior and available services are user- and organization-specific. The example illustrates some of IAM's complexity and areas where it can affect an application's high-level design.

This is an AWS-hosted healthcare application, though you can readily adapt the abstract design to applications in any domain. The IAM design considerations are generic and could apply to any app. HIPPA is the compliance requirement for healthcare, in the way that PCI is the requirement for credit card processing.

The application is used by the organization's employees and by other large corporations, which results in tens of millions of end users. Most end users are patients, and most primary users are physicians, nurses, and other medical personnel.

<div class="full border">

![An illustration that shows the significant complexity of a full IAM implementation.](/img/concepts/IAM/03-architecture-example.png)

</div>


The figure shows a few aspects of the IAM solution:

- Cloud-based IAM platform

- AWS compatibility

- Single Sign-On (SSO)

- External Identity Providers

- Social authentication

- System for Cross-domain Identity Management (SCIM) provisioning

- OAuth 2.0 and OpenID Connect (OIDC) authorization and authentication

- Security Assertion Markup Language (SAML) authentication

- Multifactor Authentication (MFA) and Universal 2nd Factor (U2F) authentication

- User-specific authentication flows

- HIPAA compliance

- Mobile and desktop device support

- Self-registration

- IAM security logging

- B2B and B2C support

- Customer administration

The design of the solution was also impacted by other concerns:

- Architectural properties, such as reliability, availability, performance, scalability, and ease of integration.

- Features, such as SSO, access control, and administration.

- Customizations, such as branding and tailored flows.

## Designing an IAM solution

The design of any IAM solution must consider the following areas:

- **Identity management:** Store and manage data to uniquely identify every authorized individual, business, device, app, and other resource, along with their attributes and policies. This is your main source of data for user authentication, authorization, and access control.

- **Authentication:** Verify that user sign-in credentials are both legitimate and being used by their owners.

- **Authorization:** Define what resources a given user is allowed to access and what functions they are allowed to perform with them.

- **Access control:** Grant or deny individual requests to view or update a restricted resource based on the resource, the nature of the request, whether the user is authenticated, the user's authorizations, relevant policies, and other data. (Access control is part of authorization.)

All of these functions must be highly reliable, available, secure, and performant.

> **Note:** The figure in [Features of an IAM solution](#features-of-an-iam-solution) compactly summarizes important features to consider, but some of them fall into two or more of the functional areas above. For more clarity, features in this section are grouped by the main area in which they apply. The areas are ordered as above, with access control included with authorization.

Other articles in this series give more detail on the issues, factors, and strategies for specific areas.

See [**IAM Terminology**](/docs/concepts/iam-overview-iam-terminology/) for definitions of some terms and concepts used in this article.

**Next step: [Identity Management Factors](/docs/concepts/iam-overview-identity-management-factors/).**
