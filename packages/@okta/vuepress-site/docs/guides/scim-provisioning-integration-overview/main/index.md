---
title: Build a SCIM provisioning integration overview
excerpt: Create a provisioning integration with SCIM in Okta.
meta:
  - name: description
    content: Use this guide to learn about the steps required to build an Okta integration that uses SCIM to handle user provisioning.
layout: Guides
---

This guide series teaches you the steps required to build an Okta integration that uses SCIM to handle user provisioning.

---

#### Learning outcomes

* Prepare a SCIM API service.
* Connect the SCIM API service to Okta via an integration.
* Test your integration to make sure everything is working correctly.

#### What you need

* An Okta Developer Edition organization. Don't have one? [Create one for free](https://developer.okta.com/signup).
* A SCIM Version 2.0 API design that supports the [minimum feature set](/docs/guides/scim-provisioning-integration-prepare/main/#features).
* Profile Sourcing activated in your org, if you intend to test this feature in your SCIM app integration (see [Profile Sourcing activation](/docs/guides/scim-provisioning-integration-test/main/#profile-sourcing-activation) to find out how to activate).

---

## Overview

Whether you are an independent software vendor (ISV), an existing Okta customer, an IT systems administrator, or a developer new to Okta, you need to know how to set up and test your cloud-based application and API endpoints to successfully deploy an Okta integration using SCIM provisioning.

If you need more detail on the concepts behind lifecycle management with SCIM and Okta, see [Understanding SCIM](/docs/concepts/scim/).

While many ISVs have custom APIs for managing user accounts, this guide assumes that you use the [System for Cross-domain Identity Management](https://scim.cloud) (SCIM) protocol, an industry standard that supports all of the needed features for lifecycle provisioning. For more technical details on how you can take advantage of the SCIM API with Okta, see our [SCIM Protocol reference](/docs/reference/scim/).

Your Okta integration should use Single Sign-On (SSO) to initiate end-user authentication. Learn how to set up your integration with SSO in our [Build a Single Sign-On (SSO) integration](/docs/guides/build-sso-integration/) guide.

## Guides

This guide series contains the following parts:

* [Prepare your SCIM API service](/docs/guides/scim-provisioning-integration-prepare/): Prepare a SCIM-compliant API server to host your SCIM service, and test it to make sure it is working correctly.
* [Configure Okta to your SCIM API service](/docs/guides/scim-provisioning-integration-connect/): Use Okta to make SCIM requests to your SCIM API service by creating and configuring an Okta SCIM integration from the Admin Console.
* [Test your Okta SCIM integration](/docs/guides/scim-provisioning-integration-test/): Test that your SCIM application can handle actual requests to create, read, update, and delete (CRUD) user profile information, and run through our Okta Integration Network (OIN) quality assurance test cases.

## See also

After working through these guides, and preparing and testing your SCIM integration, you may want to make it public. To do so, follow the steps in our [Submit an app integration](/docs/guides/submit-app) guide to have it published in the [Okta Integration Network (OIN) catalog](https://www.okta.com/integrations/).

## Next steps

Now that you know what these guides cover, you can get started by [Preparing your SCIM API service](/docs/guides/scim-provisioning-integration-prepare/).