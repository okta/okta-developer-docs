---
title: Overview
---

The Okta Integration Network (OIN) is the identity industry’s broadest and deepest set of pre-built cloud integrations to manage access management, authentication, and provisioning. By adding your integration to the OIN, you can gain exposure to thousands of Okta customers who can discover your integration and deploy your application to millions of users. OIN integrations speed adoption by simplifying configuration steps and reducing friction for your customers.

If you are an independent software vendor (ISV), Okta customer, or IT system integrator who wants to add their integration to the [Okta Integration Network](https://www.okta.com/integrations/), read this guide for instructions on how to submit your integration. Adding your integration to the Okta Integration Network is completely cost free.

## Protocols supported

This guide covers submissions that use one or more of these protocols:

* [System for Cross-domain Identity Management (SCIM)](http://www.simplecloud.info/)
* [OpenID Connect (OIDC)](https://openid.net/connect/)

    **Note:** To support the potentially large numbers of Okta orgs accessing it through the OIN, an OIDC integration can't use a custom authorization server, including the `default` server.

* [Security Assertion Markup Language (SAML)](https://en.wikipedia.org/wiki/SAML_2.0)

    **Note:** SAML integrations must use SHA256 encryption for security. If you are using SHA-1 for encryption, see our guide on how to [Upgrade SAML Apps to SHA256](/docs/guides/updating-saml-cert/overview/).

## Prerequisites

As a prerequisite to submission, you must have a functional integration created and tested in accordance with one of our OIN guides:

* [Build a SCIM provisioning integration](/docs/guides/build-provisioning-integration/)
* [Build a Single-Sign On integration](/docs/guides/build-sso-integration/before-you-begin/).

## Submission process

After you have built a functioning integration, a few steps are required to submit it to Okta for review and publication in the OIN:

1. Create a customer-facing configuration guide.
1. Submit your integration to Okta through the OIN Manager tool. Your submission must provide Okta with the general and protocol-specific metadata needed to create a customized integration for publication in the OIN.
    >**Note:** In the OIN manager, the Profile Sourcing option (formerly known as Profile Mastering) is enabled for developer orgs by Okta Developer Support. You can contact <developers@okta.com> to have this capability temporarily activated when submitting a SCIM app integration.

1. Work with the Okta OIN team to test your integration using your input and then get it published to the OIN Catalog.

The service-level agreement for OIN publication time is:

* Initial review by Okta - 5 business days
* QA testing by Okta - 5 business days
* Final publication in the OIN Catalog - 1 business day

All submissions go through these phases. The Okta OIN team sends you an email that identifies any issues found in the initial review and QA testing phases. At any point in the process, you can check the status of your submission in the [OIN Manager](https://oinmanager.okta.com).

## Submission support

Getting your app integration in the OIN catalog involves two phases: creating a functional integration and submitting it through the OIN publication process. For each phase in the process, Okta has an associated support stream to assist you.

When you are constructing your Okta integration, you can post a question on the Okta Developer Forum or email the Okta Developer Support team at <developers@okta.com>.

When you are troubleshooting a submission or need to know the current publication status, sign in to the [OIN Manager](https://oinmanager.okta.com) using your dev credentials. You can make any necessary changes to your submission there. If you have questions or need additional support to publish your app integration, you can reach out to the Okta OIN team directly at <oin@okta.com>.

>**Note:** All integrations in the OIN catalog are public. If you want to submit a request to create a private app integration for an application that uses SCIM 1.1 or Profile Sourcing, or for an application that uses a custom header expression for the Header Auth, then use the [SCIM App Integration Wizard](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard-scim) to create your integration and submit your app via the [OIN Manager](https://oinmanager.okta.com). The Okta OIN team will work with you to create an internal-only integration that isn't included in the OIN.

<NextSectionLink/>
