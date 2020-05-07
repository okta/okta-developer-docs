---
title: Overview
---

The Okta Integration Network (OIN) is the identity industry’s broadest and deepest set of pre-built cloud integrations to manage access management, authentication, and provisioning. By adding your integration to the OIN, you can gain exposure to thousands of Okta customers who can discover your integration and deploy your application to millions of users. OIN integrations speed adoption by simplifying configuration steps and reducing friction for your customers.

If you are an independent software vendor (ISV), Okta customer, or IT system integrator who wants to add their integration to the [Okta Integration Network](https://www.okta.com/integrations/), read this guide for instructions on how to submit your integration. Adding your integration to the Okta Integration Network is completely cost free.

## Protocols supported

This guide covers submissions that use one or more of the protocols:

* [OpenID Connect (OIDC)](https://openid.net/connect/)
* [Security Assertion Markup Language (SAML)](https://en.wikipedia.org/wiki/SAML_2.0)
* [System for Cross-domain Identity Management (SCIM)](http://www.simplecloud.info/)

## Prerequisites

As a prerequisite to submission, you must have a functional integration created and tested in accordance with one of our OIN guides:

* [Build a SCIM provisioning integration](/docs/guides/build-provisioning-integration/)
* [Build a Single-Sign On integration](/docs/guides/build-sso-integration/before-you-begin/).

## Submission process

After you have built a functioning integration, a few steps are required to submit it for Okta review and publication in the OIN. In general:

1. Create a customer-facing configuration guide.
1. Submit your integration to Okta through the OIN Manager tool. Your submission must provide Okta with the general and protocol-specific metadata needed to create a customized integration for publication in the OIN.
1. Work with Okta App Analysts who will test your integration with your input and get it published to the OIN Catalog.

The service-level agreement for OIN publication time is:

* Initial review by Okta - 5 business days
* QA testing by Okta - 5 business days
* Final publication in the OIN Catalog - 3 business days

All submissions go through these phases. Okta updates you by email for any remediations arising from the initial review and QA testing phases. At any point, you can check the status of your submission in the [OIN Manager](https://oinmanager.okta.com).

If you need additional help with the publication process, you can post a question on the [Okta Developer Forum](https://devforum.okta.com/) or email us at <developers@okta.com>.

>**Note:** All integrations in the OIN catalog are public. If you want to submit a private integration request for applications that use SCIM 1.1 or Profile Mastering, or for applications that use a custom header expression for the Header Auth, then use the SCIM [App Integration Wizard](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard) to create your integration and send an email to <developers@okta.com>. Okta App Analysts will work with you to create an internal-only integration that is not included in the OIN.

<NextSectionLink/>
