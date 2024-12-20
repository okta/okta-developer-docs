---
title: OIN submission requirements
meta:
  - name: description
    content: Use this guide to prepare all the requirements prior to submitting your integration to Okta for publication in the Okta Integration Network (OIN).
layout: Guides
---

This guide provides you with a list of the requirements needed before submitting your integration for publication in the [Okta Integration Network (OIN)](https://www.okta.com/integrations/). The requirements apply to both the [OIN Wizard](/docs/guides/submit-oin-app/) or the [OIN Manager](/docs/guides/submit-app/wfconnector/main/).

---

#### What you need

A built and tested app integration that's ready for Okta verification

---

## Overview

Before using the [OIN Wizard](/docs/guides/submit-oin-app/) or the [OIN Manager](https://oinmanager.okta.com)&nbsp;to submit your OIN integration, prepare the artifacts requested during the submission process.

Review the following submission artifact guidelines:

* [Logo](#logo-guidelines)
* [App description](#app-description-guidelines)
* [Use case](#use-case-guidelines)
* [Customer support contact](#customer-support-contact-guidelines)
* [Test account](#test-account-guidelines)
* [Customer configuration document](#customer-configuration-document-guidelines)

Before you submit your integration, ensure that your integration uses features that are supported in the OIN. See [OIN multi-tenancy](#oin-multi-tenancy) and [OIN limitations](#oin-limitations).

See [OIN Wizard requirements](#oin-wizard-requirements) for publishing Single Sign-On (SSO) or System for Cross-domain Identity Management (SCIM) integrations.

## OIN multi-tenancy

Your app integration must support multi-tenancy to be listed in the public OIN catalog.

What does this mean?

Multi-tenancy in the OIN refers to the concept that as an ISV, you support several instances of your app. Each app instance has a unique credential system for each of your customers. An instance of an app that contains the infrastructure to support a group of users is considered a tenant. See [Tenants in Okta](/docs/guides/oin-sso-overview/#tenants-in-okta).

Provide a method for each of your customer tenants to uniquely connect to their Okta org. This allows your customers to find your app integration from the OIN catalog in their own Okta org. Then, they can instantiate the app integration with their unique tenant credentials, either with your support or on their own.

#### SAML SSO multi-tenant example

The following multi-tenant example demonstrates the scenario where you configure Security Assertion Markup Language (SAML) SSO for your customers:

* Customer A and customer B have separate instances of your app within their own Okta orgs. Each customer has their own set of users. Both customers use Okta as an IdP.
* Customer A adds your integration to their Okta org and obtains the SAML metadata from the integration. They contact you to enable SSO for their users on your app and forward you the SAML metadata.
* Similarly, customer B adds your integration to their Okta org and informs you that they want to enable SSO on your app. They provide you with their unique SAML metadata for the SSO configuration, which is obtained from their app integration in Okta.
* You're responsible for configuring and enabling SSO for both customers A and B with the SAML 2.0 metadata that they've provided. Your app platform must allow for a separate credential system connection with Okta for each customer.

#### OIDC SSO multi-tenant example

The following multi-tenant example assumes that your Okta app integration supports OpenID Connect (OIDC) SSO and that you offer a self-service portal for your customers:

* Customer A and customer B have separate instances of your app within their own Okta orgs. Both customers have their own set of users, and each uses Okta as an IdP.
* Customer A instantiates an OIDC integration for your app in their Okta org and obtains the integration client ID and secret. They then sign in to your app platform portal and set up SSO configuration with their client ID, client secret, and Okta domain. Customer A enables SSO to your app for their users, and doesn't require any external assistance.
* Similarly, customer B instantiates your OIDC app integration in their Okta org and obtains their unique client ID and secret. They then sign in to their account on your app platform. They use their client ID, client secret, and Okta domain (for the issuer URL) to enable SSO without any assistance from you.
* Each customer enables SSO to your app for their users in a separate credential system with their Okta org. Because you've created a self-service portal that allows your customers to enable SSO by themselves, you save resources and provide autonomy to your customers.

## OIN Wizard requirements

The OIN Wizard is only available in Okta Developer Edition orgs.

### OIN Wizard role requirements

To access the OIN Wizard and the **Your OIN Integrations** dashboard in your org:

* You must have either the super admin or the app and org admin [roles](https://help.okta.com/okta_help.htm?type=oie&id=ext-administrators-admin-comparison) assigned to you.
* Use your company domain email as your username for your Okta admin account (submissions from a personal email account aren't reviewed).

> **Note:** The app admin role enables you to view and edit details in the OIN Wizard. For OIN Wizard testing, you must have both the app admin and the org admin roles assigned to you. The super admin role gives you access to all functionality in the OIN Wizard.

### OIN Wizard test requirements

Part of your OIN Wizard journey includes using the OIN Submission Tester to verify that your integration works before you submit it. The OIN Submission Tester requires the following:

* Google Chrome browser
* [Okta Browser Plugin](https://help.okta.com/okta_help.htm?type=eu&id=csh-user-plugin-overview) installed with **Allow in Incognito** enabled
* A password-only authentication policy for the **Okta OIN Submission Tester** app

#### OIN Wizard Okta Browser Plugin setup

See [Install the Okta Browser Plugin with Chrome](https://help.okta.com/okta_help.htm?type=eu&id=ext_plugin_installation).

> **Note:** The OIN Submission Tester requires Okta Browser Plugin version 6.30.0 or later. If you already have the plugin installed, it's automatically updated after each Okta release.

After you installed the Okta Browser Plugin in your Chrome browser, set **Allow in Incognito** mode:

1. In Chrome settings, click **Extensions**.
1. From the Okta Browser Plugin tile, click **Details**.
1. Enable the **Allow in Incognito** option.
1. Close the **Extensions** and **Settings** tabs.
1. Refresh your OIN Wizard browser tab.

> **Note:** Okta recommends that you pin the Okta Browser Plugin extension on your Chrome browser. You can see warnings and errors relating to the Okta Browser Plugin if the extension is pinned to your browser.

#### OIN Wizard authentication policy for testing

<ApiLifecycle access="ie" />

> **Note:** These instructions only apply to Okta Developer Edition orgs with Identity Engine. If you're not sure which solution you're using, check the footer on any page of the Admin Console. The version number is appended with **E** for Identity Engine orgs and **C** for Classic Engine orgs.

The OIN Wizard testing phase uses a plugin app called the **Okta OIN Submission Tester**, which is preinstalled in your Okta Developer Edition org. This app requires a password-only authentication policy to run properly.

For Identity Engine orgs, the default authentication policy requires MFA. Use the preconfigured **Password only** authentication policy that is included in your Okta Developer Edition org for the Okta OIN Submission Tester app.

1. Go to **Application** > **Applications** in the Admin Console.
1. Click **Okta OIN Submission Tester**.
1. Click the **Sign On** tab, scroll to the **User authentication** section and click **Edit**.
1. Select **Password only** from the **Authentication policy** dropdown menu.
1. Click **Save**.

The OIN Submission Tester only supports a password authentication flow. Use a password-only authentication policy for all your test app instances generated from the OIN Wizard.

#### Troubleshoot the OIN Submission Tester

If you have issues loading or accessing the OIN Submission Tester, review the following tips:

* Ensure that you're using a Google Chrome browser with the [Okta Browser Plugin installed](#oin-wizard-okta-browser-plugin-setup).
* Ensure that **Allow in Incognito** is enabled for the Okta Brower Plugin extension.
* Pin the Okta Browser Plugin extension on your Chrome browser to get error notifications.
* If you're using multiple Okta orgs, the Okta Browser Plugin requires you to trust the current Okta Developer Edition org. Click **Trust** when the **Do you trust this account?** dialog appears for the Okta Browser Plugin extension.
* Ensure that you're using a password-only authentication policy for the OIN Submission Tester. See [OIN Wizard authentication policy for testing](#oin-wizard-authentication-policy-for-testing).

## Logo guidelines

A clear and well-designed logo helps customers find your app integration in the OIN and ensures that your brand is well represented. When you create your app submission, make sure you upload a customer-recognizable graphic.

The submitted app logo must conform to the following:

* Submit a logo file that's less than one MB.
* Submit a logo image with one of the following dimensions:
  * 244 x 244 pixels for circular logos
  * 200 x 200 pixels for square logos
  * 244 x 156 pixels for tall logos
  * 156 x 244 pixels for wide logos
* Don't submit a logo with the trademark (:tm:) symbol.
* Submit an icon rather than a wordmark (a graphic that includes the company or product name).
   > **Note:** The OIN catalog already lists the product name in plain text. Logos with text can appear redundant.
* Submit a logo image that's in PNG format with a transparent background:
    * GIF and JPEG/JPG formats are also acceptable
    * A colored background is acceptable if it's a part of the logo color scheme
* Submit a logo image with sharp corners (no rounded corners).

### Logo tips

* If your logo isn't in one of the acceptable formats, ask your design team to convert your existing logo to the preferred PNG format.

* If your image isn't in one of the allowed dimensions, ask your design team to scale your logo appropriately. You can't submit any other dimensions in the OIN Wizard or the OIN Manager.

* A square logo is preferred. If your logo isn't square, consider using your website favicon. Alternatively, you can use the first letter of your app wordmark and convert it to a square image.

<div class="full">

![OIN acceptable logos](/img/oin/oin-logo-size-guide.png)

</div>

### Examples of acceptable logos

<div class="full">

![OIN acceptable logos](/img/oin/oin-logo-guide.png)

</div>

## App description guidelines

The app descriptions must be less than 1024 characters and should describe the value that you provide to customers by partnering with Okta. The app description appears in the OIN catalog under the **Integration detail** > **Overview** section of your published integration.

##### SSO app description example

Acme is a CMR platform that helps modern businesses thrive. A platform that connects different departments, from accounting to sales to customer service, in a centralized manner. The Okta Acme integration allows customers to sign in to the Acme platform, using Okta as a Single Sign-On provider.

##### SSO and SCIM app description example

Acme is a CMR platform that helps modern businesses thrive. A platform that connects different departments, from accounting to sales to customer service, in a centralized manner. The Okta Acme integration allows users to authenticate securely through Single Sign-On with SAML along with provisioning capabilities.

## Use case guidelines

The [OIN catalog](https://www.okta.com/integrations/) organizes integrations into [use case](#use-cases) categories.

In the [OIN Wizard](/docs/guides/submit-oin-app/openidconnect/main/#oin-catalog-properties), you can select the following optional use cases for your integration: [Zero Trust](https://www.okta.com/integrations/?category=zero-trust), [Identity Verification](https://www.okta.com/integrations/?category=identity-verification), and [Identity Governance and Administration (IGA)](https://www.okta.com/integrations/?category=identity-governance-and-administration-iga). The following use cases are automatically assigned to your integration based on supported features:

* The [Single Sign-On](https://www.okta.com/integrations/?category=single-sign-on) use case is automatically applied to your integration if it supports the OIDC or SAML 2.0 SSO protocols.
* The [Lifecycle Management](https://www.okta.com/integrations/?category=lifecycle-management) use case is automatically applied to your integration if it supports the SCIM 2.0 protocol for user lifecycle management.

In the [OIN Manager](/docs/guides/submit-app/wfconnector/main/#app-information), you can select up to five [use cases](#use-cases) for Workflows Connector or API service integrations.

> **Note:** Okta automatically applies the [Apps for Good](https://www.okta.com/integrations/?category=apps-for-good) collection, the [Okta Security Identity](https://www.okta.com/integrations/?category=okta-secure-identity) collection, or the [Social Login](https://www.okta.com/integrations/?category=social-login) use case labels on your integration if it meets the criteria for these categories.

### Use cases

Use the following description list to determine the appropriate use case category for your integration:

| Use case | Integration capability |
| -------- | ---------------------- |
| [Single Sign-On](https://www.okta.com/integrations/?category=single-sign-on) (most common) | Enables users to access your app from any device with a single entry of their Okta user credentials. This use case is automatically assigned to Security Assertion Markup Language (SAML) and OpenID Connect (OIDC) integrations. |
| [Directory and HR Sync](https://www.okta.com/integrations/?category=directory-and-hr-sync) | Provides synchronization capabilities for external-sourced user profiles with the Okta Universal Directory. This use case is most common for human resources (HR) solutions using the System for Cross-domain Identity Management (SCIM) or [Okta Workflows](https://help.okta.com/okta_help.htm?type=wf). |
| [Lifecycle Management](https://www.okta.com/integrations/?category=lifecycle-management) | Enables organizations to securely manage their entire identity lifecycle: from on-boarding to off-boarding, and ensuring that the company meets compliance requirements as user roles evolve and access levels change. This use case is most common with either SCIM or Workflows connector integrations. |
| [Zero Trust](https://www.okta.com/integrations/?category=zero-trust) | Enables secure access for users regardless of their location, device, or network |
| [Social Login](https://www.okta.com/integrations/?category=social-login) | Enables secure access to your app from an [external IdP](/docs/guides/social-login/) |
| [Centralized Logging](https://www.okta.com/integrations/?category=centralized-logging) | Aggregates Okta logs into a central location, like a Security Information and Event Management (SIEM) tool, for optimized searching and alerting capabilities. API service integrations that poll the Okta API for System Logs using OAuth 2.0 support this use case. |
| [Bot or Fraud Detection](https://www.okta.com/integrations/?category=bot-or-fraud-detection) | Provides protection from inauthentic, forged, or otherwise fraudulent attempts to register, sign in, recover, or perform identity-related transactions. Most integrations in this use case are API service integrations that send risk signals to Okta using OAuth 2.0. |
| [Automation](https://www.okta.com/integrations/?category=automation)  | Automates business processes and Okta administration tasks. Most integrations in this use case are API service integrations that access Okta APIs using OAuth 2.0.  |
| [Identity Verification](https://www.okta.com/integrations/?category=identity-verification) | Enables user self-verification to improve identity assurance and approve access for authorized individuals using document-based and/or knowledge-based proofs |
| [Identity Governance and Administration (IGA)](https://www.okta.com/integrations/?category=identity-governance-and-administration-iga) | Simplifies and manages an organization's identity and access lifecycles across multiple systems |
| [Multifactor Authentication (MFA)](https://www.okta.com/integrations/?category=multi-factor-authentication-mfa) | Provides an extra layer of security with multifactor authentication for an organization's cloud, mobile, and web apps |
| [Risk Signal Sharing](https://www.okta.com/integrations/?category=risk-signal-sharing)| Provides enriched context on clients, apps, users, and other first-party subjects to augment and inform Okta adaptive authentication and authorization decisions  |

## Customer support contact guidelines

There are two types of support contacts that you must provide for your integration:

* **Support contacts**: These are public support contacts that are visible from your integration detail page in the OIN catalog. These contacts are for customers who need assistance with your integration. You can provide more than one of the following contact options:
    * **URL**: A link to an FAQ or a troubleshooting guide (see an [OIN URL support contact example](https://www.okta.com/integrations/onfido/))
    * **Email**: An email support contact, such as `support@your-app.com` (see an [OIN email support contact example](https://www.okta.com/integrations/careervillage/))
    * **Phone Number**: A public phone number that customers can call for support

* **Escalation support contact**: This is a private support contact used by Okta to contact your organization. It isn't shared with customers. In an emergency, Okta may need to reach your company's escalation support team, so this email or phone number needs to be monitored. Don't use a general support contact that queues regular customer inquiries.

## Test account guidelines

Create a test account for your app so that the OIN team can use it to test and verify your integration.

The test account allows the OIN team to verify that your integration flow works as expected for your use case. The test account is typically an admin user in your app with extra privileges depending on your use case:

* For a lifecycle management integration, ensure that your admin test account has HR admin privileges to onboard, change roles, or offboard employees on your app.
* For an SSO or SCIM integration, ensure that your admin test account has privileges to configure SSO and SCIM. The OIN team needs to verify whether users and/or groups were created by SCIM provisioning or by SAML/OIDC (JiT) in your app.
* For SCIM integrations, provide the test SCIM server base URL and credentials. If possible, provide instructions on how to obtain the SCIM server credentials (API token or OAuth 2.0 properties) for the Okta QA process.
* For an API service integration, ensure that your admin test account has privileges to configure an API integration and trigger API requests in your app.

> **Notes:**
> * Ensure that the test account doesn't have access to your production environment.
> * Okta recommends that you use sample (non-production) data for testing.
> * Okta recommends that you use `isvtest@okta.com` as the test account username in your app. You can use an alternative username with a different domain, provided that you own or have a license to use the domain and don't infringe upon any rights of any third parties.

## Customer configuration document guidelines

A configuration guide helps your customers understand how to configure your Okta integration to work with your cloud app.

Provide a separate configuration guide as part of the OIN submission process for each type of integration:

* Format the guide so that it's accessible through a URL link (such as a webpage, a Google doc, or a PDF).
* During the OIN verification process, ensure that the link to your configuration guide is accessible to the OIN team. The OIN team checks your document for general adherence to the configuration instructions.
* After your integration is in the OIN catalog, ensure that your guide link is public or customer-accessible.

Your guide link is available to customer administrators through the Admin Console when they add your integration to their Okta org. For example, when admins add your SAML integration in the Admin Console, they have access to your guide through the **View SAML setup instructions** link.

> **Note**: Submit a separate guide for each type of integration if your integration supports more than one type. For example, if your integration supports both SSO and SCIM, you need to submit a guide for SSO and a separate guide for SCIM.

### Configuration guide content

The following are topic suggestions for your configuration guide:

* [Prerequisites](#prerequisites)
* [Supported features](#supported-features)
* [Configuration steps](#configuration-steps)
* [SP-initiated SSO](#sp-initiated-sso)
* [Troubleshoot](#troubleshoot)

> **Note:** Each section contains examples for OIDC, SAML, or SCIM content. You can use the examples as an initial template. Copy and paste the example markdown text into your customer configuration document and customize the content for your integration.

#### Prerequisites

In this section, specify any prerequisites required before your customer configures your integration in Okta. Examples may include enabling specific Okta features, enabling API access to your SCIM server, or adding a particular version of an integration in Okta.

##### SAML prerequisite example

```markdown
## Prerequisites

When you use SAML as the SSO mode with provisioning, you need to enable a specific account plan on the app side for silent activation.
```

#### Supported features

In this section of your guide, list the features that your app supports and include any restrictions or limitations.

> **Note:** You can also briefly describe what each feature does.

##### OIDC supported feature example

```markdown
## Supported features

* SP-initiated SSO (Single Sign-On)
* IdP-initiated SSO (through [Third-party Initiated Login](https://openid.net/specs/openid-connect-core-1_0.html#ThirdPartyInitiatedLogin))
* Just-In-Time provisioning
* SP-initiated SLO (Single Logout)

For more information on the listed features, visit the [Okta Glossary](https://help.okta.com/okta_help.htm?type=oie&id=ext_glossary).
```

##### SAML supported feature example

```markdown
## Supported features

* IdP-initiated SSO
* SP-initiated SSO
* Just-In-Time provisioning
* SP-initiated SLO
* Force authentication

For more information on the listed features, visit the [Okta Glossary](https://help.okta.com/okta_help.htm?type=oie&id=ext_glossary).
```

##### SCIM supported feature example

```markdown
## Supported features

* Create users
* Update user attributes
* Deactivate users
* Import users
* Import groups
* Sync password
* Profile sourcing
* Group push

Okta can't update user attributes for Admin users. This is an API limitation.

For more information on the listed features, visit the [Okta Glossary](https://help.okta.com/okta_help.htm?type=oie&id=ext_glossary).
```

#### Configuration steps

This section helps you define how your customers get set up with your integration. Detail all settings and include any images that can assist the user. Include any best practices for your procedure, such as SCIM guidance on mappings for attributes, especially required attributes that don't have a default mapping.

For SCIM integrations, provide steps for your customer to obtain their SCIM server credentials. Your customer admin needs this information before they can configure your SCIM integration in Okta. See [SCIM examples](#scim-examples).

> **Note:** If your Service Provider is configured as a "Big Bang", you need to provide a warning note to your customer. See [SAML configuration warning example](#saml-configuration-warning-example).

##### SAML configuration warning example

If you only allow sign-in through Okta (Big Bang configuration), ensure that you provide a warning note before the configuration steps. For example:

```markdown
### Read this before you enable SAML

Enabling SAML affects all users who use this app.
Users won't be able to sign in through their regular sign-in page.
They are able to access the app through the Okta service.

### Backup URL

{appName} doesn't provide a backup sign-in URL where users can sign in using their regular username and password.
If necessary, contact {appName} Support (support@{appName}.com) to turn off SAML.
```

##### SAML configuration steps example

The following is an example of a simple SAML customer procedure:

```markdown
## Configuration steps

1. Copy the Metadata URL from the Okta Admin Console, SAML 2.0 Sign on methods section.
2. Contact the {appName} support team (for example, support@{appName}.com) and request that they enable SAML 2.0 for your account. Include the "Metadata URL" value from the previous step.
   The {appName} support team processes your request and provides you with an SSO ID and an encryption certificate.
3. In your Okta Admin Console, select the Sign on tab for the {appName} SAML app, then click "Edit" and follow the steps below:
   * "Encryption Certificate": Upload the certificate provided by {appName} support in the previous step.
   * Scroll down to Advanced Sign-on Settings and enter your "SSO ID".
   * Application username format: Select "email".
   * Click "Save".
4. Your SAML configuration for {appName} is complete. You can start assigning people to the app.
```

> **Note:** The **Sign On** tab for your app integration may have different fields from the previous example. Adjust your configuration guide as required from the example template.

For a complete customer configuration guide example that requires support to configure SAML, see [How to Configure SAML 2.0 Template with company support](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-Template-with-company-support.html).

##### SAML admin configuration steps example

For some integrations, the customer admin needs to configure SAML settings in your app. The following is an example of an admin procedure to configure SAML settings:

```markdown
## Configuration steps

1. Copy the Metadata URL from the SAML 2.0 Metadata details section in the Admin Console and save this value for the next few steps.
2. Sign in to {appName}.
3. Navigate to Admin >  Settings > SAML SSO.
4. Specify the following:
   * ENABLE SAML SSO: Select "Yes".
   * IDP Provider: Select "Okta".
   * Metadata URL: Copy and paste the metadata URL value from step one.
4. Click "Save Changes".

The SAML setting is complete in {appName}.
```

> **Note:** Your app integration may require specific SAML settings instead of the SAML **Metadata URL**. These SAML settings include **Sign on URL**, **Sign out URL**, **Issuer**, and **Signing Certificate**.<br>
> You can find these SAML settings at **Applications** > **Applications** > your SAML app > **Sign-On Options** tab > **Sign on methods** > **SAML 2.0** > **Metadata details** in the Admin Console. Adjust your configuration guide to include these settings as required.

For a complete customer admin configuration guide example, see [How to Configure SAML 2.0 Template for admins](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-Template-self.html).

##### SAML configuration steps note example

```markdown
## Note

* Ensure that you entered the correct value in the "Subdomain" field under the General tab. The wrong subdomain value prevents you from authenticating through SAML to {appName}.

* Since only SP-initiated flow is supported, Okta recommends hiding the app icon for users.

* The following SAML attributes are supported:

   | Name      | Value          |
   | --------- | -------------- |
   | email     | user.email     |
   | firstName | user.firstName |
   | lastName  | user.lastName  |
```

##### SCIM configuration steps note example

```markdown
## Note

The External ID is a required attribute, but it doesn't have a default mapping.
This is because some customers prefer to set it to `EmployeeNumber`, and others like to set it to `emailAddress`.
Assign the mapping to the correct value for your organization.
```

#### SP-initiated SSO

> **Note**: This section applies only to SAML or OIDC integrations that support app-initiated Single Sign-On (SSO), also known as Service Provider (SP) initiated SSO.

Provide instructions for your users to sign in with Okta from your app. The user sign-in flow starts from your app's sign-in page. The user enters their credentials and your app sends the authorization request to Okta (the Identity Provider) to authenticate the user.

##### SP-initiated SSO instructions example

```markdown
## SP-initiated SSO

The sign-in process is initiated from {yourAppPortal}.

1. From your browser, navigate to the {appName} sign-in page.
2. Enter your Okta credentials (your email and password) and click "Sign in with Okta".
If your credentials are valid, you are redirected to the {appName} dashboard.
```

#### Troubleshoot

Include this section if there are known issues that apply to the entire configuration. You can include best practices with the step-by-step procedure instructions. You can also include information on how to contact your organization if the customer has any support queries.

### Configuration guide examples

##### OIDC examples

* [HacWare](https://docs.google.com/document/d/1k-TNUDCXZslL4D3wZyH3KgZyU45qUgiaIG9U0i6Jupc/edit)
* [Parmonic](https://partners.parmonic.com/okta)
* [Upwave](https://help.upwave.io/en/articles/4129778-okta-configuration-guide)

##### SAML examples

* [How to Configure SAML 2.0 for Template for admins](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-Template-self.html)
* [How to Configure SAML 2.0 Template with company support](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-Template-with-company-support.html)

##### SCIM examples

* [Contentful](https://www.contentful.com/help/admin/access-tools/okta-user-provisioning-integration-with-scim/)
* [Reftab](https://www.reftab.com/faq/scim-okta/)
* [TrackTik](https://support.tracktik.com/hc/en-us/articles/12421581629463-Set-up-and-use-provisioning-for-Okta)

## OIN limitations

You can't publish integrations with the following Okta features in the OIN catalog:

* **SWA apps:** Okta no longer publishes new Secure Web Authentication (SWA) integrations to the OIN catalog. The OIN team maintains existing SWA integrations.

* **SPA apps:** SPA apps aren't accepted in the [OIN Wizard](/docs/guides/submit-oin-app/openidconnect/main/). You can only submit cloud-based SaaS apps (web apps with a back end) in the OIN Wizard.

* **Unsupported multi-tenancy**: Your app integration must support multi-tenancy to be available in the public OIN catalog. See [OIN multi-tenancy](#oin-multi-tenancy).

* **Integration variables**: You can add up to three variables for per-tenant app-instance properties in the [OIN Wizard](/docs/guides/submit-oin-app/openidconnect/main/#integration-variables). If you need to edit more than three variables for a published integration, contact the OIN team at <oin@okta.com>.

### OIDC/OAuth 2.0 integration limitations

In addition to the general OIN limitations, the following are limitations specific to OIDC or OAuth 2.0 integrations:

* You can't use a [custom authorization server](/docs/concepts/auth-servers/#custom-authorization-server) that includes the `default` server for an OIDC or API service integration. You can only use the [org authorization server](/docs/concepts/auth-servers/#org-authorization-server).

* You can't use the Okta SDKs to validate access tokens with the [org authorization server](/docs/concepts/auth-servers/#org-authorization-server).

* Refresh tokens aren't supported for SSO OIDC integrations published in the OIN.

* The `offline_access` scope isn't available because refresh tokens aren't supported for integrations published in the OIN.

* Custom scopes, such as the `groups` scope, aren't supported for integrations published in the OIN.

* Don't rely on the `email_verified` scope-dependent claim that an OIDC integration returns to evaluate whether a user has verified ownership of the email address that's associated with their profile.

### SAML integration limitations

In addition to the general OIN limitations, the following are limitations specific to SAML integrations:

* SAML integrations must use SHA256 encryption for security. If you're using SHA-1 for encryption, see our guide on how to [Upgrade SAML Apps to SHA256](/docs/guides/updating-saml-cert/).

* You can only submit SAML 2.0 integrations in the [OIN Wizard](/docs/guides/submit-oin-app/openidconnect/main/).

* There's a maximum of three app instance variable in the OIN Wizard.

* RelayState can't be preconfigured in the OIN Wizard. You can set the default relay state value at the app instance level in the app **Sign On** tab.

* The force authentication (`ForceAuthn`) functionality is enabled by default for SAML app instances that were created from an OIN Wizard integration. You can disable force authentication for an app instance by selecting **Disable Force Authentication** in the app **Sign On** tab.

* SP-initiated Single Logout (SLO) isn’t supported.

The OIN team maintains existing SAML integrations with advanced features not supported in the OIN Wizard. If you need to update your existing advanced SAML integration, contact the OIN team at <oin@okta.com>.

### SCIM integration limitations

In addition to the general OIN limitations, the following are limitations specific to SCIM integrations:

* You can only submit SCIM 2.0 integrations with the OIN Wizard.

* Integrations with Basic authentication to the SCIM server aren't supported in the OIN Wizard.

   > **Note:** You can't update a published SCIM integration with Basic authentication. This breaks the integration for existing customers. If you need to edit a published integration with Basic authentication, submit a new SCIM integration that implements header or OAuth 2.0 authentication.

* The OIN Wizard only supports integrations with header authentication or OAuth 2.0 authentication to the SCIM server. Header authentication can use token or bearer token format.

* OIN SCIM integrations with OAuth 2.0 authentication don't support dynamic consumer key and secret. The consumer key and secret values are common for all customer tenants.

## Next step

Ready to submit your app? See the following submission guides:

* [Submit an OIDC integration](/docs/guides/submit-oin-app/openidconnect/main/)
* [Submit a SAML 2.0 integration](/docs/guides/submit-oin-app/saml2/main/)
* [Submit a SCIM integration](/docs/guides/submit-oin-app/scim/main/)
* [Submit a Workflows connector integration](/docs/guides/submit-app/wfconnector/main/)
* [Submit an API service integration](/docs/guides/build-api-integration/main/#register-your-api-service-integration)