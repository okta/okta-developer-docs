---
title: Initiate a security access review
meta:
  - name: description
    content: How to initiate a security access review with the Okta Identity Governance APIs
layout: Guides
---

This guide shows you how to intiate a security access review using the Okta Identity Governance (OIG) APIs. You can only initiate a security access review through the APIs or through [Identity Threat Protection](https://help.okta.com/oie/en-us/content/topics/itp/overview.htm) workflows.

---

#### Learning outcomes

* Learn how to set up Okta to access [Okta Identity Governance APIs](https://developer.okta.com/docs/api/iga/).
* Learn how to initiate a security access review using the [Okta Identity Goverance](https://developer.okta.com/docs/api/iga/) > [Security Access Review APIs](https://preview.redoc.ly/okta-iga-internal/llo-OKTA-982885-org-governance-settings/openapi/governance.api/tag/Security-Access-Reviews/).

#### What you need

* An Okta org subscribed to Okta Identity Governance (OIG)
* Postman (or a similar tool to follow this guide and test the OIG APIs)

---

## Overview

- Security access reviews are triggered via ITP Workflows or through the Okta Identity Governance (OIG) APIs
- Admins can view completed security access reviews through the **Identity Governance** > **Access Certifications** > **Security access reviews** tab.

- Security access reviews are user-centric, resource-centric... see help doc
- you can act on security access reviews

This document shows you how to intiate a security access review through the Okta Identity Governance APIs.


1. You need to create a custom role that has permission to access the security access review
1. You need to create API service app to access for API access with the custom role or assign the custom role to the API user.
1. Trigger the SAR
1. Next steps: There are several endpoints for you to manage and act upon the security access review (list all the endpoints, and operation examples) - this is nice to have!

## Create a custom role for security access reviews

custom role with `okta.governance.securityAccessReviews.admin.manage` permission (**Manage security access reviews as admin** in the permissions UI)

*Note: remember to tell Eng to add this to the endpoints*

## Access Okta APIs with OAuth 2.0 access token

Access OIG APIs by authenticating with an [OAuth 2.0 access token](https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/#oauth-20-access-token).

To obtain an OAuth 2.0 access token for API authentication, you need to have an access app in Okta. If you don't already have an access app for API access, then:

* [Create OIDC app for user-based access](https://developer.okta.com/docs/reference/rest/#create-an-oidc-app-in-okta): Use this app for API requests from a user.
* [Create a service app for machine-based access](https://developer.okta.com/docs/reference/rest/#create-an-oidc-app-in-okta): Use this app for API requests from a service or daemon without user context.

Grant the `okta.governance.securityAccessReviews.admin.manage` scope to your access app.

## Assign security access reviews custom role

Assign to a user

OR

If service app initiated, then assign the role to the app

## Initiate the security access review

Make the SAR request ... give examples

## Next steps

Admins can study the security access review after it's been created through an identiy threat workflow or through the APIs.

See [Security access reviews] in the product documentation on how to navigate through all the contents of the review, how to revoke access to resources and entitlements, and how to 


- write about how to manage the SAR
- write about how to revoke entitlements
- are these immediately required now? due to time limitations, perhaps leave this for now