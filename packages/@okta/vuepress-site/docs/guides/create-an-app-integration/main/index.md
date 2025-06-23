---
title: Create an app integration in the Okta Admin Console
excerpt: How to create an app integration in the Okta Admin Console
layout: Guides
---

This guide explains what an app integration is, why you need one, and how to create one.

---

#### Learn outcomes



#### What you need

An Okta org

---

## Understanding App Integrations

App integrations in Okta connect your Okta org to external apps and services. These integrations support several protocols that allows you to manage user access, authentication, and provisioning from a single or centralized platform.

With app integrations, you can:
* Provide users with secure, seamless Single Sign-On (SSO) access to their apps.
* Automate user provisioning and deprovisioning using protocols like System for Cross-domain Identity Management (SCIM).
* Centralize access management and enforce security policies across all connected apps.
* Monitor and report on application usage and user activity.

App integrations can be:
* **Prebuilt**: Available in the Okta Integration Network (OIN), these integrations are tested and validated by Okta.
* **Custom**: Created by admins or developers for internal or specialized use cases. Custom integrations can be built using the App Integration Wizard (AIW), templates, or bookmarks.

### Prebuilt vs. Custom App Integrations

The following table summarizes the key differences:

| Feature                | Prebuilt integration (OIN Catalog)                                   | Custom integration                                  |
|------------------------|---------------------------------------------------------------------|-----------------------------------------------------|
| **Definition**         | Published in the OIN; enables secure, scalable identity experiences | Created within a single Okta org for internal use   |
| **Benefit**            | Broad visibility, seamless onboarding, validated by Okta            | Ideal for prototyping or niche use cases            |
| **Protocols supported**| OIDC, SAML, SWA, WS-Fed, SCIM                                      | OIDC, SAML, SWA, SCIM                               |
| **Provisioning support**| SCIM provisioning validated by Okta                                | Optional SCIM, not validated by Okta                |
| **Security validation**| Reviewed and tested by Okta                                         | No external validation                              |
| **Discoverability**    | Listed in the public Okta App Catalog                              | Only visible in the org where created               |

---

### Key Differences Between Integration Types

| Feature | Prebuilt (OIN) | Custom |
| --- | --- | --- | --- | --- |
| Target use |  |  |  |  |
| Protocols | OIDC, SAML, SWA, WS-Fed, SCIM | OIDC, SAML, SWA, SCIM |
| Provisioning | Usually preconfigured | Manual SCIM setup |
| Maintenance | App vendor | Admin or developer |
| App visibility | Listed in the public OIN app Catalog | Only visible in the org where created | 
--

### Supported protocols

Okta app integrations support standard protocols for both Single Sign-On (SSO) and automated user provisioning:

**SSO protocols:**

- **OpenID Connect (OIDC)**: Authentication protocol based on OAuth 2.0, which enables secure SSO and supports advanced security features.

- **Security Assertion Markup Language (SAML)**: An XML-based protocol for exchanging authentication and authorization data between Okta and external apps.

- **Secure Web Authentication (SWA)**: A form-based authentication method that allows Okta to securely store and submit user credentials for apps that don’t support federated SSO.

- **Web Services Federation (WS-Fed**): A protocol primarily used by Microsoft apps for federated identity and SSO.

Provisioning protocol:

- **System for Cross-domain Identity Management (SCIM)**: A standard protocol for automating the exchange of user identity information, enabling automated user provisioning and deprovisioning between Okta and external apps.

These protocols allow you to provide secure, seamless access and automated user management for a wide range of apps and services. Choose the protocol that best fits your app's requirements.


## How to Create an App Integration

You can add either a prebuilt app integration from the Okta Integration Network (OIN) or create a custom app integration tailored to your org’s needs.

#### Add a Prebuilt App Integration

1. Sign in to the Okta Admin Console.
2. Go to **Applications** > **Applications**.
3. Click **Browse App Catalog**.
4. Search for the app integration you required. To search, perform one of these two options:
    1. Type the name of the specific app integration into the Search bar. You can click the name in the dropdown list or click **See All Results** to have everything displayed as tiles in the main panel. Click the tile to open the details page for the app integration.
    1. Choose a **Use Case** and optionally select one or more functionalities or industries to filter the results. When you see the desired app integration in the main panel, click it to open the details page for more information about the integration.
5. Determine if this is the correct app integration for your needs. The details page provides a detailed description of the app integration, its use case, and supported functionality.
5. Select the app from the catalog and click **Add Integration**.
6. Enter the required information under **General Settings**, and then click **Next**.
7. On the **Sign On Options** page, select one of the sign on methods. The sign-in options available depend on the access protocols supported by the app integration. See [Configure Single Sign-On options](https://help.okta.com/oie/en-us/content/topics/apps/apps_overview_of_managing_apps_and_sso.htm).
 > Note: For SWA app integrations, you can't configure the sign-in options when **Sync Password** is configured as a provisioning option.

8. In the **Application username format** dropdown list, select a format for Okta to use as the default username value when assigning the app integration to users. 
    > Note: If you select **None** and the app integration has password or profile push provisioning features, then Okta prompts you to enter the username manually when you assign the app integration.
9. In the **Update application username** dropdown list, select how you want the app integration to handle any updates to the user's Okta username.
10. Select **Password reveal** if you want your end users to see the password used to connect to the external app. See [Reveal the password of an app integration](https://help.okta.com/oie/en-us/content/topics/apps/apps_revealing_the_password.htm).
10. Click **Done**.

Okta adds an instance of the app integration to your org, and you can now assign it to your end users. See [Assign app integrations](https://help.okta.com/oie/en-us/content/topics/apps/apps-assign-applications.htm).

If you need to update the settings for your app integration, including changing sign-in options, see Configure settings for app integrations.

#### Create a Custom App Integration

You can add an app integration that doesn't exist in the [Okta Integration Network (OIN)](https://www.okta.com/integrations/), using the App Integration Wizard (AIW). The wizard allows you to create an app integration and connect Okta with your SAML, OIDC, SWA, or SCIM app. You can also add SCIM provisioning to a custom app integration.

1. Sign in to the Admin Console.
2. Go to **Applications** > **Applications**.
3. Click **Create App Integration**.
4. Choose the integration type that matches your app’s requirements and create the integration, see:
    - [Create OpenID Connect app integrations](https://help.okta.com/oie/en-us/content/topics/apps/apps_app_integration_wizard_oidc.htm)
    - [Create SAML app integrations](https://help.okta.com/oie/en-us/content/topics/apps/apps_app_integration_wizard_saml.htm)
    - [Create SWA app integrations](https://help.okta.com/oie/en-us/content/topics/apps/apps_app_integration_wizard_swa.htm)
    - [Create SCIM app integrations with Entitlement Management](https://help.okta.com/oie/en-us/content/topics/apps/aiw_scim_entitlements.htm)
    - [Add SCIM provisioning to app integrations](https://help.okta.com/oie/en-us/content/topics/apps/apps_app_integration_wizard_scim.htm)

After you create your integration, you can assign it to your users in your org.

Your created integration is private and visible only within your own Okta org. If you want to make your app integration publicly available in the OIN, see Publish an OIN integration.
