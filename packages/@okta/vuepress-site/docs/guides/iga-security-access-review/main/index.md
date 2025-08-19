---
title: Initiate a security access review
meta:
  - name: description
    content: How to initiate a security access review with the Okta Identity Governance APIs
layout: Guides
---

This guide shows you how to initiate a security access review using the Okta Identity Governance (OIG) APIs. You can only initiate a security access review from your custom app code or from delegated flows in [Okta Workflows](https://help.okta.com/okta_help.htm?type=wf) using the APIs.

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

Security access reviews are initiated through your custom app code or through a delegated Workflow sequence using the APIs, usually triggered from a security or policy evaluation event. Only users or delegated flows assigned to the super admin role (`SUPER_ADMIN`) or a custom role, with the **Managed security access reviews** (`okta.governance.securityAccessReview.admin.manage`) permission, can trigger and view all security access reviews.

End users are notified by email that they're assigned to a security access review. They conduct the review through the Okta Security Access app in their Okta End-User Dashboard. End-users can only view and remediate items in the security access review that they have permission to access.

See the [Security Access Reviews](HOC) product documentation for more information.

> **Note:** For broader-scoped, scheduled, access reviews for compliance audits, use Access Certification campaigns instead. See [Campaigns](https://help.okta.com/oie/en-us/content/topics/identity-governance/access-certification/campaigns.htm).

This guide shows you how to intiate a security access review using the APIs with OAuth 2.0 authentication:

1. [Set up Okta for API access](#set-up-okta-for-api-access).
1. [Trigger a security access review](#trigger-a-security-access-review).
1. [Conduct a security access review and remediation](#next-steps-review-and-remediation).

    

## Set up Okta for API access

You need to set up Okta so that you can authenticate to Okta APIs and have the proper roles or permissions for security access reviews.

You only have to set up your Okta org for OIG API access once for security access reviews. Okta recommends that you perform these tasks from the Admin Console. However, you can also use [Okta Management APIs](https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/) for the same tasks.

### Create custom roles for security access reviews

#### Security access review admins

Security access reviews can only be created by super admins (`SUPER_ADMIN`) initially in Okta Identity Governance orgs.

For least-privilege access, Okta recommends that you create a custom role for admins to manage security access reviews. See [Create a role](https://help.okta.com/oie/en-us/content/topics/security/custom-admin-role/create-role.htm) in the production documentation and assign the **Manage security access reviews as admin** permission (`okta.governance.securityAccessReviews.admin.manage`) to your custom role.

You need to assign the custom role to the principal that manages security access reviews. Principals can be an Okta user or a client app (service app). With the proper roles in place, these principals have the permissions required to trigger and review security access reviews.

#### Security access reviewers

End users that are assigned security access review require the `okta.governance.securityAccessReviews.endUser.manage` and `okta.governance.securityAccessReviews.endUser.read` permission review and remediate the user's access. Create a custom role with these permissions and assign them to Okta users that review security access.

See [Create a role](https://help.okta.com/oie/en-us/content/topics/security/custom-admin-role/create-role.htm) in the production documentation.

> **INTERNAL NOTE:** remember to tell Eng to add this to the endpoints

### Create an app for OAuth 2.0 authentication

Access OIG APIs by authenticating with an [OAuth 2.0 access token](https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/#oauth-20-access-token). To obtain an OAuth 2.0 access token for API authentication, you need to have an app in Okta for API access.

If you already have an OIDC or service app for API authentication, ensure that your app is granted the following OAuth 2.0 scope:

* `okta.governance.securityAccessReviews.admin.manage`

    In addition, grant any other scopes that you may need for other API requests, such as `okta.users.manage` or `okta.users.read` to request Okta user resources.

Also ensure that your API user or service app is assigned the IAM role that has permission to manage security access reviews. Assign either:

* The super admin (`SUPER_ADMIN`) role

  or

* Your custom admin role with the **Manage security access reviews as admin** (`okta.governance.securityAccessReviews.admin.manage`) permission.

> **Note:** If you're using Okta Workflows, the **Okta Workflows OAuth** app in your org is used for API authentication. Grant the security access review scope to this app.

> **INTERNAL NOTE:** Do we have to assign the custom role to the Okta Workflows OAuth app? Or does that app already have super admin role?
> What resources sets to you need to bind to the custom role?

If you don't have an app for API access:

* Create an **OIDC - OpenID Connect** sign-in method app for API access if you're making API requests as an Okta user.

  See [User-based API access setup](https://developer.okta.com/docs/reference/rest/#user-based-api-access-setup) to create an OIDC app. Grant the required `okta.governance.securityAccessReviews.admin.manage` scope to the OIDC app (in addition to any other scope you need).

  Assign the API users to the OIDC app. Ensure that the API users are assigned to the super admin role or to a custom role that contains the **Manage security access reviews as admin** (`okta.governance.securityAccessReviews.admin.manage`) permission.

* Create an **API Services** sign-in method app for API access if you're making API requests from a service or daemon without user context.

  See [Service-based API access setup](https://developer.okta.com/docs/reference/rest/#service-based-api-access-setup) to create a service app. Grant the required `okta.governance.securityAccessReviews.admin.manage` scope and assign the required admin role (super admin or your custom role) to the service app.

## Trigger a security access review

Security access reviews are typically triggered through a custom app or through a delegated flow in Okta Workflows. This guide shows you the API requests and response examples that you can use in either trigger methods, and is language-agnostic.

### Get an OAuth 2.0 access token

You can use Okta authentication SDKs or code your own API sequence to get an access token for API access. If you're using delegated flows in Workflows, see [Build a delegated flow](https://help.okta.com/wf/en-us/content/topics/workflows/build/build-delegated-flow.htm).

> **Note:** See `getToken` methods from [Okta authentication SDKs](https://developer.okta.com/code/). For example, use [tokenManager.getTokens()](https://www.npmjs.com/package/@okta/okta-auth-js#tokenmanagergettokens) in [Okta Auth JavaScript SDK](https://www.npmjs.com/package/@okta/okta-auth-js#tokenmanagergettokens).

* For API requests from a user, see [Get an access token and make a request](https://developer.okta.com/docs/reference/rest/#get-an-access-token-and-make-a-request).

* For API requests from a service app, see [Get an access token from a signed JWT](https://developer.okta.com/docs/reference/rest/#get-an-access-token-from-a-signed-jwt).

### Get IDs for your users

You need to use Okta user IDs as parameters for your security access review requests. Find the Okta user IDs for the following users:

1. The target user for the security access review. This is the user that the security access review is focused on.

2. The reviewers for the security access review. These are the security analysts or resource owners that assess the user access items and perform any remediation. These reviewers need to be assigned to a custom role with the security access review permission.

> **Note:** The targeted user of the security access review can't be a reviewer. An API error is returned if you specify the same ID in `principalId` as the `reviewerSettings.userSettings` list.

Use the [List all user](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#tag/User/operation/listUsers) request with the `find` query parameter and user profile attributes.

> **Note:** This request (and Okta API access app) requires the `okta.users.read` scope.

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer {yourOktaAccessToken}" \
"https://${yourOktaDomain}/api/v1/users?search=profile.login%20eq%20%22testUser%40example.com%22"

```

See [User query options](https://developer.okta.com/docs/reference/user-query/) for more query options.

### Create a security access review request

#### Request

```bash

curl -i -X POST \
  https://{yourOktaDomain}/governance/api/v2/security-access-reviews \
  -H 'Authorization: Bearer {yourOktaAccessToken}' \
  -H 'Content-Type: application/json' \
  -d '{
    "principalId": "00ucpjbi6JMmDvdN40g4",
    "securityAccessReviewName": "Security access review for Test user",
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

#### Response

```json

{
  "id": "sar1lo5X9wmNTFX7x0g4",
  "status": "PENDING",
  "name": "Security access review for Test user",
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

Reviewing and remediating security access reviews through the APIs aren't covered in this guide. Okta recommends that you use the Admin Console or End-User Dashboard for these operations. See [Manage security access reviews](HOC) and [Review access](HOC) in the product documentation.

> **Note:** See [Security Access Reviews] and [My Security Access Review] for a complete list of available security access review APIs.

---

## INTERNAL notes: TO BE REMOVED

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

- 500 SAR limit per org
- 
- only 5 active reviews for a target principal user at a time, there will be an API limit
- 
- SAR is a snapshot, it doesn't get updated
- 
- Make decisions more quickly, organized by application, LLM gives you lay of the land more quickly.
- governance drives security benefits (not just for compliance)
- Reviewers can't be the principal target of SAR
- 10 Reviewers max per SAR

- Closing review is at the review level (for all reviewers)

sub accesses:
- entitlements
    - can be entitlement values or bundles
- groups
- 

### Security admin user

- You can generate an AI summary of each parent access detail (e.g. access detail for an app).
- can revoke/restore access to access item, sub-access items (or all SAR items)

### End user
- will only see items in the access review that they have access to (for example, they won't be able to view the system log entries for the targetted user if the reviewer doesn't have permission to view system logs)
- can revoke/restore access to access item, sub-access items (or all SAR items)



- write about how to manage the SAR
- write about how to revoke entitlements
- are these immediately required now? due to time limitations, perhaps leave this for now
- 
- Supports calling APIs with client credentials
Does not support “app” as a target
Does not support “app” as a reviewer

End users don't need any special permission, they are assigned the permission when they are a user.
