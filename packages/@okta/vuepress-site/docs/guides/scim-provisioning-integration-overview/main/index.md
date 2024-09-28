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

* Learn how to build a SCIM API service.
* Connect the SCIM API service to Okta by adding a private SCIM integration or by using the [OIN Wizard](/docs/guides/submit-oin-app/scim/main/) to make the integration public.
* Test your integration to make sure everything is functional.

#### What you need

* An Okta Developer Edition organization. Don't have one? [Create one for free](https://developer.okta.com/signup).
* A SCIM version 2.0 API design that supports the [minimum feature set](/docs/guides/scim-provisioning-integration-prepare/main/#features).
* Profile Sourcing activated in your org, if your integration supports feature. See [Profile Sourcing activation](/docs/guides/scim-provisioning-integration-test/main/#profile-sourcing-activation).

---

## Overview

It's important to know how to build and test your cloud-based app and API endpoints to successfully deploy an Okta integration using SCIM provisioning.

If you need more detail on the concepts behind lifecycle management with SCIM and Okta, see [Understanding SCIM](/docs/concepts/scim/).

While many ISVs have custom APIs for managing user accounts, this guide assumes that you use the [System for Cross-domain Identity Management](https://scim.cloud) (SCIM) protocol. The SCIM protocol is an industry standard that supports all the needed features for lifecycle provisioning. For more technical details on how you can take advantage of the SCIM API with Okta, see our [SCIM Protocol reference](https://developer.okta.com/docs/api/openapi/okta-scim/guides/).

Your Okta integration should use Single Sign-On (SSO) to initiate end user authentication. Learn how to set up your integration with SSO in our [Build a Single Sign-On (SSO) integration](/docs/guides/build-sso-integration/) guide.

## Guides

This guide series contains the following parts:

* [Build your SCIM API service](/docs/guides/scim-provisioning-integration-prepare/): Build a SCIM-compliant API server to host your SCIM service, and test it to make sure it’s functional.
* [Configure Okta to your SCIM API service](/docs/guides/scim-provisioning-integration-connect/): Use Okta to make SCIM requests to your SCIM API service by creating and configuring a private SCIM integration from the Admin Console.
  > **Note:** If you want to submit your SCIM integration to the [Okta Intgration Network (OIN)](https://www.okta.com/integrations/), skip this guide and go directly to the [OIN Wizard: Submit an integration](/docs/guides/submit-oin-app/scim/main/) guide. The OIN Wizard includes steps to create, configure, and test your SCIM integration to share with your customers.
* [Test your Okta SCIM integration](/docs/guides/scim-provisioning-integration-test/): Test that your private SCIM app can handle requests to create, read, update, and delete (CRUD) user profile information.
  > **Note:** These testing steps are included in the [OIN Wizard](/docs/guides/submit-oin-app/scim/main/#test-your-integration) when you use it to submit your SCIM integration to the OIN.

## See also

If you want to expose your SCIM integration to your customers who also use Okta, submit it to the Okta Integration Network (OIN). Integrations listed in the [OIN catalog](https://www.okta.com/integrations/) are available to all Okta customers to use.

* See [Publish an OIN integration](/docs/guides/submit-app-overview/) to understand the submission process for publishing an integration.
* Review the [OIN submission requirements](/docs/guides/submit-app-prereq/) before starting the submission process.
* Use the [OIN Wizard: Submit an integration](/docs/guides/submit-oin-app/scim/main/) guide to connect, test, and submit your Okta SCIM integration it to the OIN.

## Next steps

Now that you know what these guides cover, start [building your SCIM API service](/docs/guides/scim-provisioning-integration-prepare/).
