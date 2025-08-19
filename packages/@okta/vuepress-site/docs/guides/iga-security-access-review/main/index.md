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

Security access reviews offer a holistic access review and response tool that's targeted on a specific user. This is particularly useful when responding to a security event or an identity threat on a user. The security access review is a snapshot of a user's access to all resources at the time of creation. It provides an AI-generated summary for security admins to quickly assess high-risk accesses and anomalies.

Several Okta users can be assigned to a security access review for assessment coverage when app access security is provided by different owners. Assigned reviewers can immediately act on fine-grain remediation beyond terminating a user's session, such as revoking access to a specific resource or entitlement.

### Security access review flow

Security access reviews are initiated through your custom app code or through a delegated workflow sequence using the APIs, usually triggered from a security or policy evaluation event. Only users or delegated flows assigned to the super admin role (`SUPER_ADMIN`) or a custom role, with the **Managed security access reviews** (`okta.governance.securityAccessReview.admin.manage`) permission, can trigger and view all security access reviews.

End users are notified by email that are assigned to a security access review. They conduct the review through the Okta Security Access app in their Okta End-User Dashboard. End-users can only view items in the security access review that they have permission to.

See the [Security Access Reviews](HOC) product documentation for more information.

> **Note:** For broader-scoped, scheduled, access reviews for compliance audits, use Access Certification campaigns instead. See [Campaigns](https://help.okta.com/oie/en-us/content/topics/identity-governance/access-certification/campaigns.htm).

This guide shows you how to intiate a security access review using the APIs with OAuth 2.0 authentication:

1. [Set up Okta for API access](#set-up-okta-for-api-access).

    You need to set up Okta so that you can authenticate to Okta APIs and have the proper roles or permissions for security access reviews.

1. [Trigger a security access review](#trigger-a-security-access-review).

    Security access reviews are typically triggered through a custom app or through a delegated flow in Okta Workflows. This guide shows you the API requests and response examples that you can use in either trigger methods, and is language-agnostic.

1. [Conduct a security access review and remediation](#next-steps)

    Reviewing and remediating security access reviews through the APIs aren't covered in this guide. Okta recommends that you use the Admin Console or End-User Dashboard for these operations. See [Manage security access reviews](HOC) and [Review access](HOC) in the product documentation.

    > **Note:** See [Security Access Reviews] and [My Security Access Review] for a complete list of available security access review APIs.

## Set up Okta for API access

### Create a custom role for security access reviews

Security access reviews can only be created by super admins (`SUPER_ADMIN`) initially in Okta Identity Governance orgs.

For least-privilege access, Okta recommends that you create a custom role for admins to manage security access reviews. See [Create a role](https://help.okta.com/oie/en-us/content/topics/security/custom-admin-role/create-role.htm) in the production documentation and assign the **Manage security access reviews as admin** permission (`okta.governance.securityAccessReviews.admin.manage`) to your custom role.

*Note: remember to tell Eng to add this to the endpoints*

### Create an app for OAuth 2.0 authentication

Access OIG APIs by authenticating with an [OAuth 2.0 access token](https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/#oauth-20-access-token). To obtain an OAuth 2.0 access token for API authentication, you need to have an app in Okta for API access.

If you already have an OIDC or service app for API authentication, ensure that your app is granted the following OAuth 2.0 scope:

* `okta.governance.securityAccessReviews.admin.manage`

Also ensure that your OIDC or service app is assigned the IAM role that has permission to manage security access reviews. Assign either:

* Super admin (`SUPER_ADMIN`) role

  or

* Your custom admin role with the **Manage security access reviews as admin** (`okta.governance.securityAccessReviews.admin.manage`) permission.

 If you don't have an app for API access, then:

* If you're calling the API with a user context, create an OIDC app for API access.

  See [Create OIDC app for user-based access](https://developer.okta.com/docs/reference/rest/#create-an-oidc-app-in-okta) and grant the required OAuth 2.0 scope (`okta.governance.securityAccessReviews.admin.manage`), as well as assign the required admin role (super admin or your custom role).

* [Create a service app for machine-based access](https://developer.okta.com/docs/reference/rest/#create-an-oidc-app-in-okta): Use this app for API requests from a service or daemon without user context.

Grant the `okta.governance.securityAccessReviews.admin.manage` scope to your access app.

### Assign security access reviews custom role

Assign to a user

OR

If service app initiated, then assign the role to the app

## Trigger a security access review

1. get user id
1. Make request to create SAR ... give examples

### Request

```json

curl -i -X POST \
  https://{yourOktaDomain}/governance/api/v2/security-access-reviews \
  -H 'Authorization: Bearer {yourAccessToken}' \
  -H 'Content-Type: application/json' \
  -d '{
    "principalId": "00ucpjbi6JMmDvdN40g4",
    "securityAccessReviewName": "Test SAR",
    "reviewerSettings": {
      "type": "USER",
      "userSettings": [
        {
          "includedUserIds": [
            "00ucpjbi6JMmDvdN40g4",
            "00ucpjbi6JMmDvdN40g5"
          ]
        }
      ]
    }
  }'
```

### Response

```json

{
  "id": "sar1lo5X9wmNTFX7x0g4",
  "status": "PENDING",
  "name": "Test SAR",
  "reviewerSettings": {
    "type": "USER",
    "userSettings": [
      {
        "includedUserIds": [
          "00ucpjbi6JMmDvdN40g4",
          "00ucpjbi6JMmDvdN40g5"
        ]
      },
      {
        "includedUserProfiles": [
          {
            "00ucpjbi6JMmDvdN40g4": null,
            "email": "john.doe@okta.com",
            "firstName": "John",
            "lastName": "Doe",
            "login": "john.doe@okta.com",
            "status": "ACTIVE"
          },
          {
            "00ucpjbi6JMmDvdN40g5": null,
            "email": "jane.doe@okta.com",
            "firstName": "Jane",
            "lastName": "Doe",
            "login": "jane.doe@okta.com",
            "status": "ACTIVE"
          }
        ]
      }
    ]
  },
  "createdBy": "00ucfd4IQoH6YBZgA0g4",
  "created": "2025-06-13T00:40:57Z",
  "lastUpdated": "2025-06-13T00:40:57Z",
  "lastUpdatedBy": "00ucfd4IQoH6YBZgA0g4",
  "_links": {
    "securityAccessReviewDetails": {
      "href": "https://myorg.okta.com/governance/api/v2/my/security-access-reviews/sar1lo5X9wmNTFX7x0g4"
    },
    "history": {
      "href": "https://myorg.okta.com/governance/api/v2/my/security-access-reviews/sar1lo5X9wmNTFX7x0g4/history"
    },
    "userDetails": {
      "href": "https://myorg.okta.com/governance/api/v2/my/security-access-reviews/sar1lo5X9wmNTFX7x0g4/user"
    },
    "accesses": {
      "href": "https://myorg.okta.com/governance/api/v2/my/security-access-reviews/sar1lo5X9wmNTFX7x0g4/accesses"
    },
    "actions": {
      "href": "https://myorg.okta.com/governance/api/v2/my/security-access-reviews/sar1lo5X9wmNTFX7x0g4/actions"
    }
  }
}

```


## Next steps: review and remediation

Admins can study the security access review after it's been created through an identiy threat workflow or through the APIs.

- Admins can view completed security access reviews through the **Identity Governance** > **Access Certifications** > **Security access reviews** tab.
- End users can review through the Okta Security Review app

- When the security review is CLOSED, all the actions for the access review becomes READ ONLY.
- Resources (UI) are refered to as "Access items" and "sub-access items"
- Top level "access items" are always apps (for now)
- sub-access items can be entitlements or entitlement bundles or groups
- groups: groups that are assigned to the app (users are assigned to the app through groups)
- revoke to top level access item will revoke to all sub-access items 
- access is revoked immediately
- 
- Resources are ordered by "Review Priorities" or "Anomalies" or "Governance Labels"
- Resource Targets -> also refers to access and sub-access
- 
### Limitations: 

- only 5 active reviews for a target principal user at a time
- SAR is a snapshot, it doesn't get updated
- 
- Make decisions more quickly, organized by application, LLM gives you lay of the land more quickly.
- governance drives security benefits (not just for compliance)


### Security admin user

- You can generate an AI summary of each parent access detail (e.g. access detail for an app).
- can revoke/restore access to access item, sub-access items (or all SAR items)

### End user
- will only see items in the access review that they have access to (for example, they won't be able to view the system log entries for the targetted user if the reviewer doesn't have permission to view system logs)
- can revoke/restore access to access item, sub-access items (or all SAR items)



- write about how to manage the SAR
- write about how to revoke entitlements
- are these immediately required now? due to time limitations, perhaps leave this for now