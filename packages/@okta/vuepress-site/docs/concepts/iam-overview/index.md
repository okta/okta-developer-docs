---
title: Identity and Access Management (IAM) overview
excerpt: Learn about Identity Access Management
layout: Concepts
---

# Identity and Access Management (IAM) overview

Learn the key issues and concepts for adding identity and access management to your internal and external services.

Designing and implementing sign-in flows and access management ensures that the right person has access to the right services. Identity and Access Management (IAM) impacts your end users, customers, and employees and makes it easier to adapt to changing security needs. Even small issues with the design or implementation of IAM can cause reliability issues, or worse, expose a weakness in your security.

A key concept for using IAM is understanding who needs to access which services and their objectives. It's not always as simple as employees and customers as there may be different types of access, such as a user or an administrator. Designing and implementing IAM systems to meet your requirements can also require significant effort. Okta can reduce the time, effort, and risk.

## What to know about IAM

- [IAM concepts](#iam-concepts): Introduces the Workforce and Customer Identity models for IAM solutions and summarize the main features of an IAM solution

- [IAM design example](#iam-design-example): Describes a typical Customer Identity and Access Management (CIAM) solution

- [Design an IAM solution](#design-an-iam-solution): Summarizes some key features of IAM solutions

Some topics require more information:

- [Identity management factors](/docs/concepts/iam-overview-identity-management-factors/): Focuses on identity storage, processing, and related administration design

- [Authentication factors](/docs/concepts/iam-overview-authentication-factors/): Describes design considerations for authenticating users

- [Authorization factors](/docs/concepts/iam-overview-authorization-factors/): Describes design considerations for defining what resources that a user can access

- [Architectural factors](/docs/concepts/iam-overview-architectural-factors/): Describes important architectural requirements to consider for your solution and possible strategies for addressing them

- [IAM terminology](/docs/concepts/iam-overview-iam-terminology/): Contains key definitions of common terms

## IAM concepts

IAM secures your services in two ways. First, it verifies the identity of a user when they sign in. Second, it lets a user access only the parts of your network and services that they have permission for.

For example, a customer may require only a username and password and has permission to view and buy items. While a vendor may require a one-time passcode and has permission to add and update items, but not buy them.

### Workforce and Customer Identity

High-level designs for IAM may be called Workforce or Customer identity. The two have significant overlap in use cases and technical approaches. The most important thing is to design and build a solution that meets your particular requirements.

- Workforce identity (Workforce or WF) solutions manage employee and contractor access to your organization's apps and resources. The main goal of WF solutions is to manage risk. IT teams usually assign user identities and use cases are typically administrative. For example, you might want to control access to apps by integrating them into your single sign-on solution.

- Customer identity (Customer Identity and Access Management or CIAM) solutions add the ability to manage customer, partner, and other external access to WF. Ease of use for customers is important. CIAM solutions can increase both customer engagement and revenue. Unlike WF users, CIAM users commonly create their own identities, sign in from various locations and platforms, and may have multiple identities. Use cases are typically user-focused. For example, you might want to improve the user experience (UX) of an app and build branded user registration and sign-in flows.

<div class="three-quarter border">

![A diagram that gives examples of the roles of people who access customer or workforce solutions.](/img/concepts/IAM/01-iam-types.png)

</div>

### Features of an IAM solution

You can divide the features of an IAM system into three areas: user experience, security, and infrastructure. The following diagram illustrates the most important features in each area.

<div class="full border">

![An illustration that shows some of the important components of the user experience, security implementation, and infrastructure of identity and access management solutions.](/img/concepts/IAM/02-iam-parts.png)

</div>

#### Infrastructure

- **Scalability:** Design your solution to allow for user growth and changing use patterns of your apps and infrastructure, without requiring a redesign.

- **Easy integration with app stack:** Maintain your IAM solution separately from your apps. Your apps can evolve independently, and you can enable multiple apps to use your IAM solution. Enable integration with your apps that optimizes performance by designing an event-based interface that's accessed using an API. Provide an SDK to make integration easier.

- **Traffic surge protection:** Prevent sudden bursts of requests from disrupting use or operations.

- **High availability:** Ensure that your IAM solution is fully operational when your apps go live.

- **High reliability:** Ensure that your IAM solution is dependable and that every element of your solution works correctly, every time.

#### Security

- **User storage and password management:** Store and manage information about your users, including their passwords, for authenticating and authorizing users.

- **Multifactor Authentication (MFA):** Require a user to verify their identity in different ways. For example, use answers to questions as a knowledge check, fingerprint scanning as a biometric check, or a key-card as a possession check. MFA is key to controlling access to your apps. See [Multifactor authentication](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-authenticators).

- **Distributed Denial of Service (DDoS) protection:** Prevent DDoS attacks from blocking legitimate use of your apps.

- **Compliance:** Ensure that your solution complies with regulatory requirements for privacy and with industry and local cybersecurity standards. For example, apps that handle healthcare patient data must comply with the Health Insurance Portability and Accountability Act (HIPAA). And servers in Europe must follow the European Union's General Data Privacy Regulations (GDPR).

- **Data access control:** Develop ways to grant or deny user requests to access apps and resources. You can grant or deny access based on policies, user authentication and authorization, or other data. App developers embed access control checks throughout their code to enforce your access requirements.

#### User experience

- **Self service:** Let end users, especially customers, self-administer their accounts. For example, ensure that a user can control account creation, password reset, and originating access requests. This can improve customer satisfaction and reduce your admin workload.

- **Social auth (social authentication):** Let users sign in with their social media credentials. For example, let a user sign in using their Facebook or LinkedIn IDs instead of credentials. This can enhance customer satisfaction, provide reliable user data, and reduce admin workload.

<!--Social authentication is a special case of external IdP authentication.-->

- **External IdP (external Identity Provider):** Let users sign in using a sign-in ID from an external Identity Provider, such as Active Directory. This can improve user satisfaction and reduce your admin workload.

- **SSO (Single Sign-On):** Let users sign in with a single ID to access multiple related apps. Federated identity management (FIM) is related to SSO and lets users sign in and access multiple federated external Identity Providers. It has the same benefits as SSO and allows users to sign in with their existing sign-in IDs.

- **Automated onboarding:** Automate onboarding workflows and lifecycle management. For example, manage a new user's AWS SSO entitlements, capture document signatures, and provision and deprovision user app accounts. Automated onboarding minimizes the time and effort to provision new users and perform other lifecycle change procedures and creates a positive experience for new users.

- **Frictionless MFA experience:** Use special strategies, such as SSO or simplified sign-in flows from managed devices to streamline user sign-in flows.

## IAM design example

The following diagram shows a typical CIAM solution for an app that supports an organization's employees and customer users (B2B). End users sign in to the web portal or mobile app in various ways. All end users sign in to the same system, but sign-in behavior and available services are user- and organization-specific. The diagram shows some of IAM's complexity and areas where it affects an app's high-level design.

This is an AWS-hosted healthcare app but the IAM design features are generic and can apply to apps in any domain.

The app is used by the organization's employees and by other large corporations and has tens of millions of end users. Most end users are patients, and most primary users are physicians, nurses, and other medical personnel.

<div class="full border">

![A diagram that shows the complexity of a full IAM implementation.](/img/concepts/IAM/03-architecture-example.png)

</div>

The diagram shows aspects of the IAM solution:

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

- Health Insurance Portability and Accountability Act (HIPAA) compliance

- Mobile and desktop device support

- Self-registration

- IAM security logging

- B2B and B2C support

- Customer administration

The following factors also affect the app's design:

- Architectural properties, such as reliability, availability, performance, scalability, and ease of integration

- Features, such as SSO, access control, and administration

- Customizations, such as branding and tailored flows

## Design an IAM solution

Consider the following areas when you design an IAM solution:

- **Identity management:** Store and manage data to identify every authorized individual, business, device, app, and other resource, along with their attributes and policies. This is your main source of data for user authentication, authorization, and access control.

- **Authentication:** Verify that user sign-in credentials are both legitimate and being used by their owners.

- **Authorization:** Define what resources that a user is allowed to access and what functions they're allowed to perform with them.

- **Access control:** Grant or deny individual requests to view or update a restricted resource. Grant or deny requests based on the resource, whether the user is authenticated, the user's authorization, relevant policies, and other data. Access control is part of authorization.

All of these functions must be highly reliable, available, and secure.

> **Note:** The diagram in [Features of an IAM solution](#features-of-an-iam-solution) summarizes important features to consider. Some of the features fall into two or more of the [IAM areas](#design-an-iam-solution).

Next step: [Identity Management Factors](/docs/concepts/iam-overview-identity-management-factors/)