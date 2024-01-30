---
title: OIN submission requirements
meta:
  - name: description
    content: Use this guide to prepare all the requirements prior to submitting your integration to Okta for publication in the Okta Integration Network.
layout: Guides
---

This guide provides you with a list of the requirements needed before submitting your integration for publication in the [Okta Integration Network (OIN)](https://www.okta.com/integrations/).

---

**Learning outcome**

Understand the requirements necessary to submit your integration using the [OIN Wizard](/docs/guides/submit-oin-app/) or the [OIN Manager](https://oinmanager.okta.com).

**What you need**

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

## OIN multi-tenancy

Your app integration must support multi-tenancy to be listed in the public OIN catalog.

What does this mean?

Multi-tenancy in the OIN refers to the concept that as an ISV, you support several instances of your app, each with a unique credential system for your customers. An instance of an app that contains the infrastructure to support a group of users is considered a tenant. See [Tenants in Okta](/docs/guides/oin-sso-overview/#tenants-in-okta).

Provide a method for each of your customer tenants to uniquely connect to their Okta org. This allows your customers to find your app integration from the OIN catalog in their own Okta org. Then, they can instantiate the app integration with their unique tenant credentials, either with your support or on their own.

#### SAML SSO multi-tenant example

The following multi-tenant example demonstrates the scenario where your Okta app integration supports Security Assertion Markup Language (SAML) SSO, and you configure SSO for your customers:

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

##### Single Sign-On (SSO) app description example

Acme is a CMR platform that helps modern businesses thrive. A platform that connects different departments, from accounting to sales to customer service, in a centralized manner. Okta's Acme integration allows customers to sign in to the Acme platform using Okta as a Single Sign-On provider.

##### SSO and SCIM app description example

Acme is a CMR platform that helps modern businesses thrive. A platform that connects different departments, from accounting to sales to customer service, in a centralized manner. Okta’s Acme integration allows users to authenticate securely through Single Sign-On with SAML along with provisioning capabilities.

## Use case guidelines

The OIN catalog organizes integrations into use cases. You can select up to five use cases. Use the following description list to determine the appropriate use case category for your integration:

| Use case | Integration capability |
| -------- | ---------------------- |
| [Single Sign-On](https://www.okta.com/integrations/?category=single-sign-on) (most common) | Enables users to access your application from any device with a single entry of their Okta user credentials. This use case is automatically assigned to Security Assertion Markup Language (SAML) and OpenID Connect (OIDC) integrations. <br><br> **Note:** You don't need to select this use case because `Single Sign-On` isn't an option in the **App use case** dropdown list. |
| [Automation](https://www.okta.com/integrations/?category=automation)  | Automates business processes and Okta administration tasks. Most integrations in this use case are API service integrations that access Okta’s APIs using OAuth 2.0.  |
| [Centralized Logging](https://www.okta.com/integrations/?category=centralized-logging) | Aggregates Okta logs into a central location, like a Security Information and Event Management (SIEM) tool, for optimized searching and alerting capabilities. API service integrations that poll the Okta API for System Logs using OAuth 2.0 support this use case. |
| [Directory and HR Sync](https://www.okta.com/integrations/?category=directory-and-hr-sync) | Provides synchronization capabilities for external-sourced user profiles with the Okta Universal Directory. This use case is most common for human resources (HR) solutions using the System for Cross-domain Identity Management (SCIM) or [Okta Workflows](https://help.okta.com/okta_help.htm?type=wf). |
| [Lifecycle Management](https://www.okta.com/integrations/?category=lifecycle-management) | Enables organizations to securely manage their entire identity lifecycle: from on-boarding to off-boarding, and ensuring that the company meets compliance requirements as user roles evolve and access levels change. This use case is most common with either SCIM or Workflows connector integrations. |
| [Identity Proofing](https://www.okta.com/integrations/?category=identity-proofing) | Enables user self-verification to improve identity assurance and approve access for authorized individuals using document-based and/or knowledge-based proofs |
| [Identity Governance and Administration (IGA)](https://www.okta.com/integrations/?category=identity-governance-and-administration-iga) | Simplifies and manages an organization's identity and access lifecycles across multiple systems |
| [Zero Trust](https://www.okta.com/integrations/?category=zero-trust) | Enables secure access for users regardless of their location, device, or network |
| [Bot or Fraud Detection](https://www.okta.com/integrations/?category=bot-or-fraud-detection) | Provides protection from inauthentic, forged, or otherwise fraudulent attempts to register, sign in, recover, or perform identity-related transactions. Most integrations in this use case are API service integrations that send risk signals to Okta using OAuth 2.0. |
| [Multifactor Authentication (MFA)](https://www.okta.com/integrations/?category=multi-factor-authentication-mfa) | Provides an extra layer of security with multifactor authentication for an organization's cloud, mobile, and web apps |
| [Risk Signal Sharing](https://www.okta.com/integrations/?category=risk-signal-sharing)| Provides enriched context on clients, apps, users, and other first-party subjects to augment and inform Okta adaptive authentication and authorization decisions |

## Customer support contact guidelines

There are two types of support contacts that you must provide for your integration:

* **Support contacts**: These are public support contacts that are visible from your integration detail page in the OIN catalog. These contacts are for customers who need assistance with your integration. You can provide more than one of the following contact options:
    * **URL**: A link to an FAQ or a troubleshooting guide (see an [OIN URL support contact example](https://www.okta.com/integrations/onfido/))
    * **Email**: An email support contact, such as `support@your-app.com` (see an [OIN email support contact example](https://www.okta.com/integrations/careervillage/))
    * **Phone Number**: A public phone number that customers can call for support

* **Escalation support contact**: This is a private support contact used by Okta to contact your organization. It isn't shared with customers. In an emergency, Okta may need to reach your company's escalation support team, so this email or phone number needs to be monitored. Don’t use a general support contact that queues regular customer inquiries.

## Test account guidelines

Create a test account for your app so that the OIN team can use it to test and verify your integration.

The test account allows the OIN team to verify that your integration flow works as expected for your use case. The test account is typically an admin user in your app with extra privileges depending on your use case:

* For a lifecycle management integration, ensure that your admin test account has HR admin privileges to onboard, change roles, or offboard employees on your app.
* For an SSO or SCIM integration, ensure that your admin test account has privileges to configure SSO and SCIM. The OIN team needs to verify whether users and/or groups were created by SCIM provisioning or by SAML/OIDC (JiT) in your application.
* For an API service integration, ensure that your admin test account has privileges to configure an API integration and trigger API requests in your application.

> **Note:** The OIN team recommends `isvtest@okta.com` as the test account username, however, you can provide an alternative username with a different domain.

## Customer configuration document guidelines

A configuration guide helps your customers understand how to configure your Okta integration to work with your cloud application.

Provide a separate configuration guide as part of the OIN submission process for each type of integration:

* Format the guide so that it's accessible through a URL link (such as a webpage, a Google doc, or a PDF).
* During the OIN verification process, ensure that the link to your configuration guide is accessible to the OIN team. The OIN team checks your document for general adherence to the configuration instructions.
* After your integration is in the OIN catalog, ensure that your guide link is public or customer-accessible.

Your guide link is available to customer administrators through the Okta Admin Console when they add your integration to their Okta org. For example, when admins add your SAML integration in the Admin Console, they have access to your guide through the **View SAML setup instructions** link.

> **Note**: Submit a separate guide for each type of integration if your integration supports more than one type. For example, if your integration supports both SSO and SCIM, you need to submit a guide for SSO and a separate guide for SCIM.

### Configuration guide content

The following are section suggestions for your configuration guide:

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

When using SAML as the SSO mode with provisioning, you need to enable a specific account plan on the application side for silent activation.
```

#### Supported features

In this section of your guide, list the features that your application supports and include any restrictions or limitations.

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

> **Note:** If your Service Provider is configured as a "Big Bang", you need to provide a warning note to your customer. See [SAML configuration warning example](#saml-configuration-warning-example).

##### SAML configuration warning example

If you only allow sign-in through Okta (Big Bang configuration), ensure that you provide a warning note before the configuration steps. For example:

```markdown
### Read this before you enable SAML

Enabling SAML affects all users who use this application.
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
4. Your SAML configuration for {appName} is complete. You can start assigning people to the application.
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

> **Note:** Your app integration may require specific SAML settings than the SAML **Metadata URL** (such as **Sign on URL**, **Sign out URL**, **Issuer**, or **Signing Certificate** settings).
> You can find these SAML settings at **Applications** > **Applications** > your SAML app > **Sign-On Options** tab > **Sign on methods** > **SAML 2.0** > **Metadata details** in the Admin Console. See [Configure Single Sign-On options](https://help.okta.com/okta_help.htm?type=oie&id=ext_Apps_Overview_of_Managing_Apps_and_SSO). Adjust your configuration guide as required from the example template.

For a complete customer admin configuration guide example, see [How to Configure SAML 2.0 Template for admins](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-Template-self.html).

##### SAML configuration steps note example

```markdown
## Note

* Ensure that you entered the correct value in the "Subdomain" field under the General tab. The wrong subdomain value prevents you from authenticating through SAML to {appName}.

* Since only SP-initiated flow is supported, Okta recommends hiding the application icon for users.

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

> **Note**: This section applies only to SAML or OIDC integrations that support app-initiated Single Sign-On (SSO), also known as service provider (SP) initiated SSO.

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

* [Contentful](https://www.contentful.com/help/okta-user-provisioning-integration-with-scim/)
* [Reftab](https://www.reftab.com/faq/scim-okta/)
* [TrackTik](https://support.tracktik.com/hc/en-us/articles/12421581629463-Set-up-and-use-provisioning-for-Okta)

## OIN limitations

You can't publish integrations with the following Okta features in the OIN catalog:

* **SWA apps:** Okta no longer publishes new Secure Web Authentication (SWA) integrations to the OIN catalog. The OIN team maintains existing SWA integrations.

* **SAML apps with certain features:** The [OIN Wizard](/docs/guides/submit-oin-app/openidconnect/main/) places certain limits on SAML integration submissions. Examples of these limitations include:
   * Only one to three app instance variables allowed
   * No attribute statement support
   * No RelayState support
   * No force authentication (`ForceAuthn`) support

   The OIN team maintains existing SAML integrations with these advanced features. If you need to update your existing advanced SAML integration, contact the OIN team at <oin@okta.com>.

* **Custom authorization server:** An OIDC or API service integration can't use a [custom authorization server](/docs/concepts/auth-servers/#custom-authorization-server), including the `default` server. You can only use the [org authorization server](/docs/concepts/auth-servers/#org-authorization-server).

* **Okta SDKs and validating access tokens:** You can't use the Okta SDKs to validate access tokens with the [org authorization server](/docs/concepts/auth-servers/#org-authorization-server).

* **Refresh token:**  Refresh tokens aren't supported for SSO OIDC integrations published in the OIN.

* **Unsupported scopes:**

  * The `offline_access` scope isn't available because refresh tokens aren't supported for integrations published in the OIN.
  * Custom scopes, such as the `groups` scope, aren't supported for integrations published in the OIN.
  * ISVs shouldn't rely on the `email_verified` scope-dependent claim returned by an OIDC integration to evaluate whether a user has verified ownership of the email address associated with their profile.

* **SHA-1 SAML encryption:** SAML integrations must use SHA256 encryption for security. If you're using SHA-1 for encryption, see our guide on how to [Upgrade SAML Apps to SHA256](/docs/guides/updating-saml-cert/).

* **Unsupported multi-tenancy**: Your app integration must support multi-tenancy to be listed in the public OIN catalog. See [OIN multi-tenancy](#oin-multi-tenancy).

* **Dynamic consumer key and secret**: OIN SCIM integrations with OAuth 2.0 authentication don't support dynamic consumer key and secret. The consumer key and secret values are common for all customer tenants.

<ApiAmProdWarning />

## Next step

Ready to submit your app? See the following submission guides:

* [Submit an SSO integration](/docs/guides/submit-sso-app/)
* [Submit an LCM integration](/docs/guides/submit-app/)
* [Submit an API service integration](/docs/guides/build-api-integration/main/#register-your-api-service-integration)