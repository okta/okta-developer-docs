# Introduction to Okta Identity Engine

<ApiLifecycle access="ie" />

Okta Identity Engine represents a significant evolution in Okta's authentication technology. It's designed to offer a more robust and flexible authentication pipeline, catering to diverse and evolving auth needs. This document aims to provide a comprehensive introduction to its new features, deployment models, and how it differs from the Classic Engine.

**Table of Contents**

1. [New Features](#1-new-features)
     - [App Context in Email Templates](#app-context-in-email-templates)
     - [App Intent Links: Enhanced Authentication Flow](#app-intent-links-enhanced-authentication-flow)
     - [Authentication Policies](#authentication-policies)
     - [CAPTCHA Integration](#captcha-integration)
     - [Interaction Code Grant Type for Embedded Authentication: Enhanced Customization and Control](#interaction-code-grant-type-for-embedded-authentication-enhanced-customization-and-control)
2. [Deployment Models](#2-deployment-models)
3. [SDKs and Sample Applications](#3-sdks-and-sample-applications)
4. [Comparing Identity and Classic Engines](#4-comparing-identity-and-classic-engines)
5. [Upgrading to Identity Engine](#5-upgrading-to-identity-engine)


> **Note**: If you are an admin, or are looking for product docs related to Identity Engine, see the Identity Engine [Get started page](https://help.okta.com/okta_help.htm?type=oie&id=ext-get-started-oie) over in the Okta Help Center.


## 1. New Features

Identity Engine unlocks many new capabilities.

### 1.1 App Context in Email Templates

#### Overview:

The Identity Engine introduces dynamic customization of email templates. When a user enters an authentication flow, context variables become available, allowing customization of email content and style based on the triggering application. This feature enhances user experience by providing relevant and personalized communication.

#### Use Case: Customized Email Notifications for a Multi-App E-Commerce Platform
**Scenario:** A large e-commerce company operates multiple specialized online stores (electronics, books, clothing, etc.), each with its unique branding and customer engagement strategy.

**Goal:** To dynamically customize email notifications for user actions (like sign-in or password reset) based on the specific store the user is interacting with, enhancing the personalized experience.

**Implementation:** 

The company integrates context variables such as ${app.id}, ${app.name}, and ${app.label} into its email templates. These variables correspond to the specific app (store) the user is interacting with​​.
Customizing Email Content:

For a sign-in flow, the email template is customized to include the store's name and branding elements dynamically. For instance, the template includes lines like "Welcome to ${app.name}! Please follow this link to sign in securely."
The email template for password reset includes a magic link with a customizable expiration time, enhancing security and user convenience​​.
Testing and Deployment:

The company tests the email templates to ensure that the right app context is applied and that the email content changes dynamically based on the store the user is interacting with.
After successful testing, these templates are deployed for all online stores.
Example Code Snippet:

html
```
<p>Dear customer,</p>
<p>Welcome to ${app.name}! Click <a href="${magic.link}">here</a> to sign in.</p>
<p>Thank you for choosing us for your shopping needs.</p>
<p>${app.label} Team</p>
```

Users receive customized email notifications that resonate with the specific store's branding and message, enhancing the overall user experience. This dynamic approach to email content helps reinforce brand identity and improves customer engagement across different platforms.


In summary, using context variables in email templates within the Okta Identity Engine allows businesses to create highly personalized and effective communication strategies, leveraging app-specific information to enhance user interaction.

#### Related topics
[Customize email notifications](/docs/guides/custom-email/main/#use-app-context).

### 1.2 App Intent Links: Enhanced Authentication Flow

#### Overview:
App Intent Links in Okta Identity Engine are specialized, protocol-specific endpoints designed to initiate a sign-in flow directly to a specific application. These links are essential in signaling a user's intent to access an application and are integral in both Identity Provider and Service Provider initiated authentication flows.

#### Functionality:

With Okta Identity Engine, App Intent Links have evolved to provide a more streamlined and secure user authentication process. Unlike in the Classic Engine, where these links required an established session and redirected unauthenticated users to a centralized sign-in page, the Identity Engine handles these requests differently:

* **Direct Hosting of Sign-In Experience:** Now, each App Intent Link directly hosts the widget or sign-in experience pertinent to the intended application. This means when a user attempts to access an app through an App Intent Link, they are presented with a sign-in interface specifically for that app.
* **Enhanced Security and Efficiency:** The link evaluates relevant security policies, including the Global Session Policy and specific app authentication policies, without the need for intermediate redirects.
* **Rate Limit Management:** Similar to the Classic Engine, these links share a common rate limit bucket, ensuring efficient management of request traffic.

#### Example Usage:

For a SAML application, an App Intent Link might be structured as follows:

```
http://${yourOktaDomain}/app/mysamlapp_1/${appInstanceID}/sso/saml
```
This link directly initiates a sign-in flow for the specified SAML application.

#### Use Case:

**Scenario:** A financial services company uses multiple applications for different services, such as personal banking, corporate banking, and investment services. Each service requires distinct authentication processes and user interfaces.

**Goal:** To streamline user access to each service while maintaining robust security protocols.

**Implementation:**
1.	Configure App Intent Links: The company sets up App Intent Links for each application (personal banking, corporate banking, investment services) in Okta Identity Engine.
2.	Customize Authentication Flows: Each link is configured to provide a tailored sign-in experience for the respective service, enforcing specific security policies as needed.
3.	Integration and Testing: The links are integrated into the company's web portal and mobile app. Rigorous testing ensures seamless user experience and security compliance.

Customers accessing different banking services are directed to customized sign-in interfaces specific to each service. For instance, a customer clicking on the personal banking service is taken directly to the personal banking sign-in page, bypassing any general or unrelated authentication steps. This tailored approach enhances user experience, reduces confusion, and maintains high security standards.

#### Evolution with Okta Identity Engine:

**Classic Engine (Before Okta Identity Engine):** 
Previously, endpoints required an active session for access. Unauthenticated requests were redirected to a central sign-in page (`/login/login.htm`). This page captured the original application request (via `fromUri`) before assessing rate limits. Post authentication, the user was rerouted to the intended application through an intermediary redirect (`/app/${app}/${instanceId}/${linkName}`). This process included validation of user assignment to the application and enforcement of sign-on policies.

**Okta Identity Engine:**

New Process: The Okta Identity Engine has transformed this approach. Now, it bypasses the centralized sign-in page redirection (`/login/login.htm`).
Direct Hosting: Each App Intent Link independently hosts the widget/sign-in experience pertinent to the targeted application.
Policy Evaluation: This includes assessments under the Global Session Policy, authentication policy, and other relevant sign-in policies.
Rate Limiting: These links now share a common rate limit group, similar to the previous central sign-in page, ensuring consistent and controlled access management.

### 1.3 Authentication Policies

#### Overview:

Authentication policies in Okta Identity Engine are robust [security policy frameworks](https://csrc.nist.gov/publications/detail/sp/800-63b/final) designed to model and enforce security outcomes for applications. These policies, which are highly flexible, can be shared and applied across various applications within an organization. A key feature of these policies is their ability to adapt to different risk levels, such as automatically stepping up authentication to stronger, non-phishable factors when a higher risk is detected. Notably, Identity Engine facilitates the creation of flexible applications capable of altering their authentication methods without any code changes.

* [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy/)

* [Authentication policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop)

* [Policies (high-level concept)](/docs/concepts/policies/)

#### Use Case: E-Commerce Platform Enhanced Security

**Scenario:** An e-commerce platform experiences varying levels of transactional risk based on user behavior and purchase history. To safeguard against potential fraud and unauthorized access, the platform needs a dynamic authentication system.

**Goal:** Implement authentication policies that adapt to the risk level associated with different user actions, enhancing security without compromising user experience.

**Implementation:**
1.	Define Risk Parameters: The platform identifies key risk indicators, such as unusual purchase amounts, new device access, or rapid transaction succession.
2.	Create Authentication Policies: Using Okta Identity Engine, the platform sets up authentication policies that respond to these risk indicators. For instance:
    - For standard transactions, a simple password authentication is sufficient.
    - For high-value transactions or access from a new device, the policy steps up to two-factor authentication or requires biometric verification.
3.	Deploy and Monitor: The policies are deployed across the e-commerce platform. Continuous monitoring and adjustments are made based on emerging risk patterns and user feedback.

The e-commerce platform successfully implements a dynamic authentication system. Regular users performing routine transactions experience seamless access, while actions flagged as higher risk trigger additional authentication measures. This approach effectively balances security with user convenience, reducing the risk of fraud and unauthorized access.


### 1.4 CAPTCHA Integration

#### Overview:

CAPTCHA, a well-established method for deterring bot attacks, is effectively integrated into the Okta Identity Engine. This integration supports key processes like registration, sign-in, and account recovery, utilizing two of the leading CAPTCHA services: [hCAPTCHA](https://www.hcaptcha.com/) and [reCAPTCHA](https://www.google.com/recaptcha/about/). These services are available through both the Okta-hosted and embedded Sign-In Widgets, providing an additional layer of security. However, they are not supported through SDKs.

#### Use Case: Online Voting System Security Enhancement

**Scenario:** An online voting platform experiences challenges with bot attacks, leading to concerns about the integrity of the voting process.

**Goal:** Implement a CAPTCHA system to verify genuine user interactions during registration, sign-in, and account recovery, ensuring that votes are cast only by verified human users.

**Implementation:**
1.	Integration of CAPTCHA Services: The platform integrates hCAPTCHA and reCAPTCHA services with its Okta Identity Engine setup.
2.	Customizing CAPTCHA Implementation: CAPTCHA challenges are set up at critical points - during new user registration, sign-in, and account recovery processes.
3.	User Experience and Security Testing: The platform conducts extensive testing to ensure the CAPTCHA integration does not hinder the user experience, while effectively mitigating bot attacks.

The implementation of CAPTCHA services significantly reduces bot activities, enhancing the security and integrity of the voting process. Genuine users are able to seamlessly complete the CAPTCHA challenges, ensuring their participation in the voting is valid and secure.

CAPTCHA integration in Okta Identity Engine plays a crucial role in reinforcing the security of digital platforms against automated attacks. By incorporating leading CAPTCHA services into key user interaction points, organizations can effectively safeguard their processes while maintaining a positive user experience.


### 1.5 Interaction Code Grant Type for Embedded Authentication: Enhanced Customization and Control

#### Overview:

Okta Identity Engine enhances user authentication experiences with the [Interaction Code grant type](/docs/concepts/interaction-code/), an extension to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standards. This innovative feature allows applications using an embedded Okta Sign-In Widget or SDK to directly manage interactions with the authorization server. This approach moves away from traditional browser-based redirects to authentication components, offering a more seamless and integrated user experience.

#### Use Case: 
Tailored Authentication in a Healthcare App

**Scenario:** A healthcare mobile app requires a secure yet user-friendly authentication process for its patients and healthcare providers. It needs to handle sensitive health data while providing easy access.

**Goal:** Implement an authentication system that provides custom interaction flows based on user roles (patient or provider) and complies with healthcare data protection regulations.

**Implementation:**
1.	Integration of Interaction Code Grant Type: The app integrates the Interaction Code grant type with its Okta Identity Engine setup.
2.	Customized User Flows: Distinct authentication flows are created for patients and healthcare providers. For patients, a simpler authentication process is implemented, while providers go through a more rigorous multi-factor authentication process.
3.	Testing and Compliance Checks: The app undergoes thorough testing to ensure smooth user experiences and compliance with healthcare data protection standards.

The healthcare app successfully implements a tailored authentication experience. Patients enjoy easy access with minimal authentication steps, while providers undergo a more secure process. This dual approach ensures data security without compromising user convenience.

The Interaction Code grant type in Okta Identity Engine provides a flexible and customizable authentication solution, enabling applications to create tailored user experiences. It is especially valuable in scenarios requiring differentiated authentication flows and heightened security, making it an ideal choice for diverse application needs.


## 2. Deployment Models

Okta Identity Engine offers three distinct authentication deployment models, each catering to different security and integration requirements:
1. Okta-Hosted (Redirect) Sign-In Widget:
   - Description: This model uses a redirect mechanism where the Sign-In Widget is hosted by Okta. It's the most secure and easiest to implement, ideal for organizations seeking quick deployment and high security.
   - Use Case: A retail company with a standard e-commerce platform can utilize this model for straightforward user authentication, ensuring security without needing complex customization.
2. Embedded Sign-In Widget:
   - Description: In this approach, the Sign-In Widget is embedded directly into the organization’s own code base. This model offers a balance between complexity and customization, allowing for a more integrated user experience.
   - Use Case: A financial services firm requiring a seamless user interface that aligns with its branding can choose this model. It allows them to embed the Sign-In Widget into their banking portal, providing a cohesive and branded login experience.
3. Embedded SDK-Driven Sign-In Flow:
   - Description: This model is the most flexible, using Okta’s SDKs to create a completely custom authentication experience. It offers the highest level of control, suitable for organizations with specific needs and the resources to handle complex integrations.
   - Use Case: A healthcare application requiring bespoke authentication processes, such as additional security checks or unique user flows, can leverage this model to build a tailored authentication system from the ground up.

Each of these deployment models serves distinct needs, from simple and secure authentication to highly customized user experiences. Organizations can select the model that best fits their security requirements, technical capabilities, and user experience goals

#### Related topics
* [Okta deployment models &mdash; redirect vs. embedded](/docs/concepts/redirect-vs-embedded/): an overview of the different deployment models
* [Sign users in](/docs/guides/sign-in-overview/): practical implementation details

## 3. SDKs and Sample Applications

#### Overview:
Okta Identity Engine provides a comprehensive suite of Software Development Kits (SDKs) designed to seamlessly integrate its features into your applications. These SDKs are compatible with the various authentication deployment models, offering versatility and ease of integration. Additionally, Okta offers a range of sample applications that demonstrate the practical application of these SDKs in real-world scenarios.
#### Actionable Steps:
* Explore SDK Options: Access a wide array of SDKs suitable for different use cases and technical environments. [Browse our SDKs and samples](/code/)
* Interactive Learning: Utilize the sample applications to understand how these SDKs can be implemented effectively within your own applications.
* Setup and Experimentation: Get hands-on experience by setting up and experimenting with the Identity Engine sample applications, providing insight into the functionalities and capabilities of Okta's SDKs. [Set up and explore our Identity Engine sample apps](/docs/guides/oie-embedded-common-download-setup-app/)



## 4. Comparing Identity and Classic Engine

#### Overview:
Our documentation is evolving to primarily support the Okta Identity Engine, while continuing to provide essential information for users of the Classic Engine.

#### Navigation Guide:
1. Identity Engine Specific Content: Look for pages or sections with a blue Identity Engine banner. These are exclusive to the Identity Engine features.
2. Dual Engine Content: Sections without banners are applicable to both Identity Engine and Classic Engine. Any minor differences between the engines are detailed within the text.
3. Classic Engine Specific Content: Content exclusively for Classic Engine, which may not be compatible with Identity Engine, includes explanatory notes at the top. These notes also guide where Identity Engine users can find relevant support.
4. Archived Classic Engine Guides: For extensively updated guides now supporting the Identity Engine, the original versions for Classic Engine are retained in the [Okta Classic Engine](/docs/guides/archive-overview/) for reference.

This structured approach ensures users can easily find and distinguish between information relevant to both Okta Identity Engine and Classic Engine.

> **Note**: See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

## 5. Upgrading to Identity Engine

As of March 1, 2022, Okta has transitioned to the Identity Engine for all new [Okta orgs](/docs/concepts/okta-organizations/). This change allows new customers to immediately benefit from the advanced features of the Identity Engine.

For Existing Classic Engine Users:
1. Upgrade Path: Classic Engine customers interested in upgrading to the Identity Engine should refer to the dedicated [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/). This resource provides detailed guidance on the transition process, ensuring a smooth upgrade experience.
2. Maintaining Current Functionality: Customers who choose not to upgrade yet can continue using their existing Classic Engine functionalities. This includes the continued operation of the Classic Engine org, v1 API, and SDKs, ensuring no disruption to current processes and systems.

By providing clear pathways and support, Okta ensures that both new and existing customers can effectively leverage the capabilities of the Identity Engine while maintaining their current operations if they are not ready to transition

