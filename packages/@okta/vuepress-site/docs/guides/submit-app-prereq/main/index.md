---
title: Requirements for OIN submission
meta:
  - name: description
    content: Use this guide to prepare all the requirements prior to submitting your integration to Okta for publication in the Okta Integration Network.
layout: Guides
---

This guide provides you with a list of requirements you need prepare prior to submitting your integration for publication in the Okta Integration Network (OIN).

---

## Overview

Use the OIN Manager (ISV portal) to submit your integration.
You need to prepare all the artifacts required before the submission.

If you are an independent software vendor (ISV), Okta customer, or IT system integrator who wants to add their integration to the [Okta Integration Network](https://www.okta.com/integrations/), read this guide for prerequisites and guidelines for the submission process.

Test 

* [Integration logo guidelines](#integration-logo-guidelines)
* [Integration description guidelines](#integration-description-guidelines)
* [Integration category guidelines](#integration-category-guidelines)
* [Integration test credential guidelines](#integration-test-credential-guidelines)
* [Integration customer document guidelines](#integration-test-credential-guidelines)

## Integration logo guidelines

This guide covers submissions that use one or more of these protocols:

### Avoid using a logo with a trademark

### Prioritize SVG format file with a transparent background

* If you are able to find the SVG file for the logo, use it.
* If you are not able to find the SVG file for the logo, do the following:
* Consider if you can convert high res PNGs into SVGs if no SVGs are available.
If the result is still undesirable, please notify the VCD team before moving forward. Thanks!

### Prioritize a 1:1 ratio (square) app icon, not a wordmark lockup

## Integration description guidelines

App Description

Can you send me a new description of the app to describe what the app integration offers (write up a description of what features the app integration supports, including the value of partnering with Okta (ie SSO)? Here are some examples:

Infinipoint enables enterprises of all sizes to automate cyber hygiene across their entire IT estate with unprecedented speed and scale. For the benefit of single-sign-on, Okta's Infinipoint integration gives your team the ability to securely manage and secure the organisation's IT assets.

## Integration category guidelines

Provide a detailed explanation of each Category

## Integration test credential guidelines

Why they are required - how they differ from each SSO functionality.

## Integration customer document guidelines

List all the different requirements for OIDC/SCIM

You need to prepare a customer-facing configuration guide
---

A configuration guide helps your customers understand how to configure your Okta integration to work with your cloud application.

You need to provide a configuration guide as part of the OIN submission process. Your guide is provided to administrators through the Okta Admin Console. Okta checks your document for general adherence to the configuration guide instructions. After your integration is published to the OIN, you can make the link public or customer‐accessible.

>**Note:** A configuration guide is required for SCIM and OIDC integrations. It's optional for SAML integrations, as Okta supplies its own documentation with the apps.

You can create the guide in whatever format works best for you: a Web page, a Google or Word doc, or a PDF are all acceptable.

### Examples

Some examples of detailed configuration guides:

OIDC:

* [Cerby](https://docs.google.com/document/d/e/2PACX-1vRiswyNyRPVYfEMEwPsbMO8Qn11BjAO-FfUsWBBit_IYe88tzQCHTmMPtmF8uPV044HmXQR13adj3LO/pub)
* [Upwave](https://help.upwave.io/en/articles/4129778-okta-configuration-guide)

SAML:

* [GitHub Enterprise](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-for-Github_Enterprise.html)
* [Runscope](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-for-Runscope.html)
* [Salesforce](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-in-Salesforce.html)
* [Zoom.us](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-for-Zoom.us.html)

SCIM:

* [Atlassian Cloud](https://confluence.atlassian.com/cloud/configure-user-provisioning-with-okta-957492956.html)
* [Contentful](https://www.contentful.com/help/okta-user-provisioning-integration-with-scim/)
* [Fuze](http://images.em.fuze.com/Web/ThinkingPhones/%7Be980dc53-8c7e-4758-b5e5-3fa20845c561%7D_Fuze_Admin_Guide_-_Okta_Provisioning_(1).pdf) (PDF link)
* [Zscaler](https://help.zscaler.com/zia/saml-scim-configuration-guide-okta)

### Content

Your configuration guide should include the following sections:

#### Prerequisites

In this section, specify any prerequisites required before your customer configures your integration in Okta. Examples may include enabling specific Okta features or SKUs, enabling API access to your SCIM server, or adding a particular version of an integration in Okta.

For example:

When using SAML as the SSO mode with provisioning, you need to enable a specific account plan on the application side for silent activation.

#### Supported features

In this section of your guide, you want to outline what features your application supports. For example:

* IdP-initiated SSO
* SP-initiated SSO
* SLO (Single Log Out)
* Force Authentication
* Create Users
* Update User Attributes
* Deactivate Users
* Import Users
* Import Groups
* Sync Password
* Profile Sourcing (formerly called Profile Mastering)

Also include any restrictions. For example:

Okta can't update user attributes for Admin users. This is an API limitation.

> **Note:** You can briefly describe what each feature does. See the guides from the earlier SCIM section for examples.

#### Procedure

This section constitutes the majority of your guide and explains all the configuration steps needed to get your customers set up with your integration. Detail all settings and include any screenshots that can assist the user.

Also include any best practices for your procedure, such as guidance on setting mappings for attributes, especially required attributes that don't have a default mapping. For example:

> **Note:** The External ID is a required attribute, but it doesn't have a default mapping. This is because some customers prefer to set it to `EmployeeNumber`, and others like to set it to `emailAddress`. Assign the mapping to the correct value for your organization.

#### Troubleshooting and tips

You need to only include this section if there are known issues that apply to the entire configuration. In general, you should include best practices with the step-by-step procedure instructions.

You may also want to include information on how to contact your organization if the customer has any support queries.