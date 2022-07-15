---
title: Identity and Access Management (IAM) Overview
---
Learn the key issues and concepts for adding identity and access management to your internal and external services.

# Identity and Access Management (IAM) Overview

Designing and implementing sign-in and access management for your services involves integrating highly complex functionality in many areas of your application. Your solution affects your end users and customers, and your ability to address your business's evolving security needs. Even small design or implementation deficiencies make you vulnerable to breaches that have serious consequences. Your immediate challenge is to figure out what requirements you have (if you don't already know), what factors are important, what strategies to consider in your design, and how a third-party product like Okta can reduce the time, effort, and risks for developing it. This article series provides information to help with all of these.

This series has the following sections:

- [**IAM concepts**](#iam-concepts) introduces the Workforce and Customer Identity models for IAM solutions, and summarizes the main features of an IAM solution.

- [**IAM design example**](#iam-design-example) illustrates a typical CIAM solution for an application that supports an organization's employees and customer users.

- [**Designing an IAM solution**](#designing-an-iam-solution) summarizes the key areas of IAM: identity management, with links to design considerations for each area, key architectural considerations, and to a glossary of key terms and concepts.

     - [**Identity Management Factors**](/docs/concepts/iam-overview-identity-management-factors/) focuses on identity storage, processing, and related administration design.

     - [**Authentication Factors**](/docs/concepts/iam-overview-authentication-factors/) describes design considerations for verifying that users are legitimate.

     - [**Authorization Factors**](/docs/concepts/iam-overview-authorization-factors/) describes design considerations for defining what resources a user can access, and then granting or denying individual access requests (*access control*).

     - [**Architectural Factors**](/docs/concepts/iam-overview-architectural-factors/) lists some of the more important architectural requirements to consider, and identifies a few possible strategies for addressing them.

     - [**IAM Terminology**](/docs/concepts/iam-overview-iam-terminology/) contains key definitions.

## IAM concepts

*Identity and Access Management (IAM)* (also called *Identity Security*) ensures that the right people get access to the right resources, first by confirming that users are who they say they are, and then by restricting the resources they can see and use. For example, a customer signs in with a username and password and can view and buy items, while a vendor also requires a one-time code and can request and configure a new item, but not buy items.

### Workforce and Customer Identity

High-level designs for IAM may be called *Customer* or *Workforce identity*. The two have a significant overlap in use-cases and technical approaches, but the most important thing is to design and build a solution that meets your particular requirements.

- Workforce identity (*Workforce* or *WF*) solutions manage employee and contractor access to your organization's apps and resources. The main goal of WF solutions is to manage risk. User identities are usually assigned by the IT team. Use cases are typically administrative, such as controlling access to apps by integrating them into your single sign-on solution.

- Customer identity (*Customer Identity* and Access Management* or *CIAM*) solutions add managing customer, partner, and other external access to Workforce identity. These systems need to be easy for customers to use, as their goal is to increase revenue and customer engagement. Users commonly create their own identities, have multiple identities, and sign in from more locations using more platforms than for Workforce identity. There's also a higher demand for customer data and analytics than for Workforce identity. Use cases are typically user focussed, such as user experience, and building branded user registration and login.

<div class="three-quarter border">

![An illustration that gives examples of the roles of people that access customer versus workforce solutions.](/img/concepts/IAM/01-iam-types.png)

</div>

### Features of an IAM solution

You can divide the features of an IAM system into three areas: user experience, security, and infrastructure. The following diagram illustrates the most important features in each area.

<div class="full border">

![An illustration that shows some of the important components of the user experience, security implementation, and infrastructure of identity and access management solutions.](/img/concepts/IAM/02-iam-parts.png)

</div>

#### Infrastructure

- **Scalability:** Design your solution to accommodate user growth, changing usage patterns, and evolutionary changes to your applications and infrastructure, without redesign.

- **Easy integration with app stack:** Decouple your IAM solution from your applications to allow them to evolve independently, and enable multiple apps to use your solution. Provide an SDK-, API-, and event-based interface that allows your solution to be integrated with your apps for optimal IAM performance.

- **Traffic surge protection:** Provide means to prevent sudden bursts of requests from disrupting usage or operations.

- **High availability:** Ensure that all elements of your IAM solution are fully operational whenever your apps are expected to be operable.

- **High reliability** (highly redundant): Ensure that all elements of your IAM solution are highly reliable and dependable; that every element of your solution works correctly, every time.

#### Security

- **User storage and password management:** Store and manage information about your users, including their passwords, for authenticating and authorizing users.

- **MFA (Multi-Factor Authentication):** Require a user to supply at least two of three types of evidence that they are who they claim to be: they know something only the user knows, have something only the user has, or are the user (such as pass a fingerprint or facial recognition test). MFA is key to controlling access to your applications.

- **DDoS protection:** Prevent Distributed Denial of Service (DDoS) attacks from blocking legitimate use of your applications.

- **Compliance:** Ensure that your solution complies with specific regulatory requirements for privacy, as well as with industry and local cybersecurity standards. Examples are HIPAA, CCPA, GDPR, SOX, and PCI. Compliance is essential for applications and their support facilities, such as your IAM solution, that handle personally identifiable information, healthcare patient records, financial account data, and other regulated private information.

- **Data access control:** Develop facilities to grant or deny specific user requests to access apps and resources based on policies, user authentication and authorizations, and other data. Application developers embed access control checks throughout their code to enforce your access requirements.

#### User experience

- **Self service:** Allow end users, especially customers, to self-administer their accounts, including creation, password reset, and originating access requests. This can increase customer satisfaction, reduce friction, and reduce your admin workload.

- **Social auth (social authentication):** Allow end users to sign in with their social media credentials, such as a Facebook or LinkedIn ID, rather than special credentials for your IAM solution. This can enhance customer satisfaction, provide more and more reliable user demographic information, and reduce admin workload. (Social authentication is a special case of *external IdP authentication*, below.)

- **External IdP (external Identity Provider):** Allow users to sign in using a login ID from an external Identity Provider, such as Active Directory, rather than special credentials for your apps. This can increase user satisfaction, and reduce your admin workload.

- **SSO (Single Sign-On):** Allow users to sign in with a single ID to access multiple related applications. This can increase user satisfaction and reduce admin workload. Closely related is FIM *(Federated Identity Management)*, in which users can log in and access multiple federated external identity providers. It has the same benefits as SSO, and allows users to sign in with their existing login IDs.

- **Automated onboarding:** Automate onboarding workflows and lifecycle management, such as manage a new user's AWS SSO entitlements, capture document signatures, and provision and deprovision user app accounts . This minimizes the time and effort to provision new users and perform other lifecycle change procedures, reduces errors and admin workload, and creates a positive experience for new users.

- **Frictionless MFA experience:** Use special strategies, such as single sign-on or simplified sign-ons from managed devices, to streamline user logins.

## IAM design example

The figure below shows a typical CIAM solution for an application that supports an organization's employees and customer users (B2B). End users sign in to the web portal or mobile app in a variety of ways. All end users sign in to the same system, but sign-in behavior and available services are user- and organization-specific. The example illustrates some of IAM's complexity and areas where it can affect an application's high-level design.

This AWS-hosted application is in the healthcare domain where HIPAA compliance is essential. The application is used by the organization's employees and by other large corporations; between them, it has tens of millions of end users. Most end users are patients, and most primary users are physicians, nurses, and other medical personnel. You can readily adapt the abstract design to applications in any domain; the IAM design considerations are generic and might apply to any app.

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

- Multi-Factor Authentication (MFA) and Universal 2nd Factor (U2F) authentication

- User-specific authentication flows

- HIPAA compliance

- Mobile and desktop device support

- Self-registration

- IAM security logging

- B2B and B2C support

- Customer administration

Architectural properties such as reliability, availability, performance, scalability, and ease of integration; functions such as sign-in, access control, and administration; and customization such as branding and tailored flows, are difficult to illustrate, but were among the organization's many considerations in the design of its IAM solution.

## Designing an IAM solution

The design of any IAM solution must consider the following areas:

- **Identity management:** Store and manage data to uniquely identify every authorized individual, business, device, app, and other resource, along with their attributes and policies. This is your main source of data for user authentication, authorization, and access control.

- **Authentication:** Verify that user login credentials are both legitimate and being used by their owners.

- **Authorization:** Define what resources a given user is allowed to access and what functions they are allowed to perform with them.

- **Access control:** Grant or deny individual requests to view or update a restricted resource based on the resource, the nature of the request, whether the user is authenticated, the user's authorizations, relevant policies, and other data. (Access control is part of authorization.)

All of these functions must be highly reliable, available, secure, and performant.

> **Note:** The figure in [Features of an IAM solution](#features-of-an-iam-solution) compactly summarizes important features to consider, but some of them fall into two or more of the functional areas above. For more clarity, features in this section are grouped by the main area in which they apply. The areas are ordered as above, with access control included with authorization.

Subsequent articles in this series drill down on the main issues, factors, and strategies to consider for each area above, along with how Okta can help reduce your time, effort, costs, and risks for developing, fielding, maintaining, and supporting an IAM solution that fits seamlessly with your applications and is tailored to your needs. The articles also include

See [**IAM Terminology**](/docs/concepts/iam-overview-iam-terminology/) for definitions of some terms and concepts used in this article.

**Next step: [Identity Management Factors](/docs/concepts/iam-overview-identity-management-factors/).**
