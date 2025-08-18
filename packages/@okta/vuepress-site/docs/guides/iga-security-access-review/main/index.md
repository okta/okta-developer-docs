---
title: Initiate a security access review
meta:
  - name: description
    content: How to initiate a security access review with the Okta Identity Governance APIs
layout: Guides
---

This guide shows you how to initiate a security access review using the Okta Identity Governance (OIG) APIs. You can only initiate a security access review from your custom app code or from delegated flows in Okta [Workflows](https://help.okta.com/okta_help.htm?type=wf) using the APIs.

---

#### Learning outcomes

* Learn how to set up Okta to access [Okta Identity Governance APIs](https://developer.okta.com/docs/api/iga/).
* Learn how to initiate a security access review using the [Okta Identity Goverance](https://developer.okta.com/docs/api/iga/) > [Security Access Review](https://preview.redoc.ly/okta-iga-internal/llo-OKTA-982885-org-governance-settings/openapi/governance.api/tag/Security-Access-Reviews/) APIs.

#### What you need

* An Okta org subscribed to Okta Identity Governance (OIG)
* Postman (or a similar tool to follow this guide and test the OIG APIs)

---

## Overview

Security access reviews offer a holistic access review and response tool that's targetted on a specific user. This is particularly useful when responding to a security event or an identity threat on a user. Security access reviewers can immediately act on fine-grain remediation beyond terminating a user's session, such as revoking access to a specific resource or entitlement.

You can trigger security access reviews on-demand through your custom app code or through a Workflow sequence using the APIs. Only users or delegated flows assigned with the super admin role (`SUPER_ADMIN`) or a custom role, with the **Managed security access reviews** (`okta.governance.securityAccessReview.admin.manage`) permission, can trigger and view all security access reviews.

End users that are assigned a security access review are notified by email, and conduct the review through the Okta Security Access app in their Okta End-User Dashboard.

See the [Security Access Reviews](HOC) product documentation for more information.

> **Note:** For broader-scoped, scheduled, access reviews for compliance audits, use Access Certification campaigns instead. See [Campaigns](https://help.okta.com/oie/en-us/content/topics/identity-governance/access-certification/campaigns.htm).

This guide shows you how to intiate a security access review using the APIs with OAuth 2.0 authentication:

1. [Set up Okta for API access](#set-up-okta-for-api-access).

    You need to set up Okta so that you can authenticate to Okta APIs and have the proper roles or permissions for security access reviews.

1. [Trigger a security access review](#trigger-a-security-access-review)
1. [Conduct a security access review and remediation](#next-steps)

    Reviewing and remediating security access reviews through the APIs aren't covered in this guide. These actions are available through the APIs (see [Security Access Reviews] and [My Security Access Review] APIs), however, Okta recommends that you use the Admin Console or End-User Dashboard for these operations. See [Manage security access reviews](HOC) and [Review access](HOC) in the product documentation.

## Set up Okta for API access

### Create a custom role for security access reviews

custom role with `okta.governance.securityAccessReviews.admin.manage` permission (**Manage security access reviews as admin** in the permissions UI)

*Note: remember to tell Eng to add this to the endpoints*

### Create an app for OAuth 2.0 authentication

Access OIG APIs by authenticating with an [OAuth 2.0 access token](https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/#oauth-20-access-token).

To obtain an OAuth 2.0 access token for API authentication, you need to have an app in Okta for API access. If you don't already have an app for API access, then:

* [Create OIDC app for user-based access](https://developer.okta.com/docs/reference/rest/#create-an-oidc-app-in-okta): Use this app for API requests from a user.
* [Create a service app for machine-based access](https://developer.okta.com/docs/reference/rest/#create-an-oidc-app-in-okta): Use this app for API requests from a service or daemon without user context.

Grant the `okta.governance.securityAccessReviews.admin.manage` scope to your access app.

### Assign security access reviews custom role

Assign to a user

OR

If service app initiated, then assign the role to the app

## Trigger a security access review

1. get user id
1. Make request to create SAR ... give examples

## Next steps: review and remediation

Admins can study the security access review after it's been created through an identiy threat workflow or through the APIs.

- Admins can view completed security access reviews through the **Identity Governance** > **Access Certifications** > **Security access reviews** tab.
- End users can review through the Okta Security Review app

- When the security review is CLOSED, all the actions for the access review becomes READ ONLY.
- Resources are refered to as "Access items" and "sub-access items"
- Resources are ordered by "Review Priorities" or "Anomalies" or "Governance Labels"

- You can generate an AI summary of each parent access detail (e.g. access detail for an app).
- 
See [Security access reviews] in the product documentation on how to navigate through all the contents of the review, how to revoke access to resources and entitlements, and how to ...


- write about how to manage the SAR
- write about how to revoke entitlements
- are these immediately required now? due to time limitations, perhaps leave this for now