---
title: Build a SCIM provisioning integration overview
excerpt: Create a provisioning integration with SCIM in Okta.
meta:
  - name: description
    content: Use this guide to learn about the steps required to build an Okta integration that uses SCIM to handle user provisioning.
layout: Guides
---

This guide series teaches you how to build an Okta integration that uses the System for Cross-domain Identity Management (SCIM) protocol to handle user provisioning.

---

#### Learning outcomes

* Prepare a SCIM API service.
* Connect the SCIM API service to Okta through an integration.
* Test your integration to make sure everything is functional.

#### What you need

* An Okta Developer Edition organization. Don't have one? [Create one for free](https://developer.okta.com/signup).
* A SCIM version 2.0 API design that supports the [minimum feature set](/docs/guides/scim-provisioning-integration-prepare/main/#features).
* Profile Sourcing activated in your org, to test this feature in your SCIM app integration (see [Profile Sourcing activation](/docs/guides/scim-provisioning-integration-test/main/#profile-sourcing-activation) to find out how to activate).

---

## Overview

It's important to know how to build and test your cloud-based app and API endpoints to successfully deploy an Okta integration using SCIM provisioning.

If you need more detail on the concepts behind lifecycle management with SCIM and Okta, see [Understanding SCIM](/docs/concepts/scim/).

While many ISVs have custom APIs for managing user accounts, this guide assumes that you use the [System for Cross-domain Identity Management](https://scim.cloud) (SCIM) protocol. The SCIM protocol is an industry standard that supports all the needed features for lifecycle provisioning. For more technical details on how you can take advantage of the SCIM API with Okta, see our [SCIM Protocol reference](https://developer.okta.com/docs/api/openapi/okta-scim/guides/).

Your Okta integration should use Single Sign-On (SSO) to initiate end user authentication. Learn how to set up your integration with SSO in our [Build a Single Sign-On (SSO) integration](/docs/guides/build-sso-integration/) guide.

## Guides

This guide series contains the following parts:

* [Prepare your SCIM API service](/docs/guides/scim-provisioning-integration-prepare/): Prepare a SCIM-compliant API server to host your SCIM service, and test it to make sure it’s functional.
* [Configure Okta to your SCIM API service](/docs/guides/scim-provisioning-integration-connect/): Use Okta to make SCIM requests to your SCIM API service by creating and configuring an Okta SCIM integration from the Admin Console.
* [Test your Okta SCIM integration](/docs/guides/scim-provisioning-integration-test/): Test that your SCIM app can handle requests to create, read, update, and delete (CRUD) user profile information. Also test that your app can run through our Okta Integration Network (OIN) test cases for quality assurance.

## See also

After using these guides, and preparing and testing your SCIM integration, you may want to make it public. To do so, follow the steps in our [Submit an app integration](/docs/guides/submit-app) guide to have it published in the [Okta Integration Network (OIN) catalog](https://www.okta.com/integrations/).

## Next steps

Now that you know what these guides cover, you can get started by [Preparing your SCIM API service](/docs/guides/scim-provisioning-integration-prepare/).