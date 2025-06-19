---
title: Create an API token
excerpt: How to create a token for the Okta API
layout: Guides
---

This guide explains what an API token is, why you need one, and how to create one.

---

#### Learning outcomes

* Learn how an Okta API token is used.
* Understand why it's good practice to create a service account for use with an API token.
* Know the alternatives to Okta API tokens.
* Find out when a token expires and what happens when it expires.
* Find out how API tokens are deactivated.

#### What you need

An Okta org

---

## Understanding App Integrations

App integrations in Okta connect your Okta organization to external applications and services. These integrations enable you to manage user access, authentication, and provisioning from a single, centralized platform.

With app integrations, you can:
* Provide users with secure, seamless Single Sign-On (SSO) access to their applications.
* Automate user provisioning and deprovisioning using protocols like SCIM.
* Centralize access management and enforce security policies across all connected apps.
* Monitor and report on application usage and user activity.

App integrations can be:
* **Prebuilt**: Available in the Okta Integration Network (OIN), these integrations are tested and validated by Okta. They offer out-of-the-box support for popular protocols and features.
* **Custom**: Created by admins or developers for internal or specialized use cases. Custom integrations can be built using the App Integration Wizard (AIW), templates, or bookmarks.

### Prebuilt vs. Custom App Integrations

Okta offers two main types of app integrations: prebuilt and custom.

**Prebuilt integrations** are published in the Okta Integration Network (OIN) and are available to all Okta customers. These integrations are reviewed and tested by Okta to ensure security, reliability, and compliance with standards. Prebuilt integrations support a wide range of protocols, including OIDC, SAML, SWA, WS-Fed, and SCIM. They are ideal for organizations that want a seamless, validated experience and broad visibility across Okta’s customer base.

**Custom integrations** are created by admins or developers within a single Okta org using the App Integration Wizard (AIW), templates, or bookmarks. Custom integrations are best suited for prototyping, internal testing, or supporting unique or niche use cases. While they support many of the same protocols as prebuilt integrations, custom integrations are not reviewed or validated by Okta and are only visible within the org where they are created.

The table below summarizes the key differences:

| Feature                | Prebuilt integration (OIN Catalog)                                   | Custom integration                                  |
|------------------------|---------------------------------------------------------------------|-----------------------------------------------------|
| **Definition**         | Published in the OIN; enables secure, scalable identity experiences | Created within a single Okta org for internal use   |
| **Benefit**            | Broad visibility, seamless onboarding, validated by Okta            | Ideal for prototyping or niche use cases            |
| **Protocols supported**| OIDC, SAML, SWA, WS-Fed, SCIM                                      | OIDC, SAML, SWA, SCIM                               |
| **Provisioning support**| SCIM provisioning validated by Okta                                | Optional SCIM, not validated by Okta                |
| **Security validation**| Reviewed and tested by Okta                                         | No external validation                              |
| **Discoverability**    | Listed in the public Okta App Catalog                              | Only visible in the org where created               |

---

### Supported protocols

Okta app integrations support industry-standard protocols for both Single Sign-On (SSO) and automated user provisioning.

**SSO protocols:**
- **OpenID Connect (OIDC):** A modern authentication protocol built on OAuth 2.0, enabling secure SSO and support for advanced security features.
- **Security Assertion Markup Language (SAML):** An XML-based protocol for exchanging authentication and authorization data between Okta and external applications, widely used for enterprise SSO.
- **Secure Web Authentication (SWA):** A form-based authentication method that allows Okta to securely store and submit user credentials for apps that do not support federated SSO.
- **Web Services Federation (WS-Fed):** A protocol primarily used by Microsoft applications for federated identity and SSO.

**Provisioning protocol:**
- **System for Cross-domain Identity Management (SCIM):** A standard protocol for automating the exchange of user identity information, enabling automated user provisioning and deprovisioning between Okta and external applications.

These protocols allow you to provide secure, seamless access and automated user management for a wide range of applications and services. Choose the protocol that best fits your application's requirements.


## How to Create an App Integration

You can add either a prebuilt app integration from the Okta Integration Network (OIN) or create a custom app integration tailored to your organization’s needs.

#### Add a Prebuilt App Integration

1. Sign in to the Okta Admin Console.
2. Go to **Applications** > **Applications**.
3. Click **Browse App Catalog**.
4. Search for the app you want to add.
5. Select the app from the catalog and click **Add Integration**.
6. Configure the required settings and assign the app to users or groups.
7. Click **Done** to complete the setup.

#### Create a Custom App Integration

1. Sign in to the Okta Admin Console.
2. Go to **Applications** > **Applications**.
3. Click **Create App Integration**.
4. Choose the integration type (OIDC, SAML, SWA, or SCIM) that matches your app’s requirements.
5. Enter the app details, such as name and logo.
6. Configure protocol-specific settings (for example, redirect URIs for OIDC or SAML settings).
7. Assign the app to users or groups.
8. Review your configuration and click **Save**.
