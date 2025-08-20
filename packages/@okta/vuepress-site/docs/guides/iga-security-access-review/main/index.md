---
title: Initiate a security access review
meta:
  - name: description
    content: How to initiate a security access review with the Okta Identity Governance APIs
layout: Guides
---

This guide shows you how to initiate a security access review using the Okta Identity Governance (OIG) APIs. You can only initiate a security access review from your custom app code or from delegated flows in [Okta Workflows](https://help.okta.com/okta_help.htm?type=wf) using the APIs. Reviews and remediations are performed from the Admin Console or the End-User Dashboard.

---

#### Learning outcomes

* Learn how to set up Okta to access [Okta Identity Governance APIs](https://developer.okta.com/docs/api/iga/).
* Learn how to initiate a security access review using the [Okta Identity Governance](https://developer.okta.com/docs/api/iga/) > [Security Access Review](https://preview.redoc.ly/okta-iga-internal/llo-OKTA-982885-org-governance-settings/openapi/governance.api/tag/Security-Access-Reviews/) APIs.

#### What you need

* An Okta org subscribed to Okta Identity Governance (OIG)
* Postman (or a similar tool to follow this guide and test the OIG APIs)

---

## Overview

Security access reviews offer a holistic access review and response tool that's targeted on a specific user. This is particularly useful when responding to a security event or an identity threat on a user. The security access review is a snapshot of a user's resource access at the time of creation. It also provides an AI-generated summary for security admins to quickly assess high-risk accesses and anomalies.

Several reviewers (Okta end users) can be assigned to a security access review for assessment coverage when app security is provided by different owners. Assigned reviewers can immediately act on fine-grain remediation beyond terminating a user's session, such as revoking access to a specific resource or entitlement.

### Security access review flow

Security access reviews are initiated through your custom app code or through a delegated Workflow sequence using the APIs. The reviews are intended to be triggered from a security or policy evaluation event that focuses on a particular user. Only admins or delegated flows assigned to the super admin role (`SUPER_ADMIN`) or a custom admin role, with the **Managed security access reviews** (`okta.governance.securityAccessReview.admin.manage`) permission, can trigger and view all security access reviews.

After the security access review is generated, an email is sent to Okta users, informing them that they need to review a user's access. They conduct the review through the Okta Security Access app in their Okta End-User Dashboard. Reviewers can only view and remediate items in the security access review that they have permission to access.

See the [Security Access Reviews](HOC) product documentation for more information.

See the [Use Okta Identity Governance API in Okta Workflows](https://support.okta.com/help/s/article/use-okta-identity-governance-api-in-okta-workflows?language=en_US) article for an overview of how to use Okta Workflows with OIG APIs.

> **Note:** For compliance audits, a scheduled, broader-scoped access review, such as the Access Certifications campaigns, is more appropriate. See [Campaigns](https://help.okta.com/oie/en-us/content/topics/identity-governance/access-certification/campaigns.htm).

This guide shows you how to initiate a security access review using the APIs with OAuth 2.0 authentication:

1. [Set up Okta for API access](#set-up-okta-for-api-access).
1. [Initiate a security access review](#initiate-a-security-access-review).
1. [Conduct a security access review and remediation](#next-steps-review-and-remediation).

## Set up Okta for API access

Set up Okta so that you can authenticate to Okta APIs and have the proper roles or permissions for security access reviews.

You only have to set up your Okta org for OIG security access reviews API access once. Okta recommends that you perform these tasks from the Admin Console. However, you can also use [Okta Management APIs](https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/) for the same tasks.

### Create a custom admin role for security access reviews

Only super admins (`SUPER_ADMIN`) can initially trigger security access reviews in Okta Identity Governance orgs.

For least-privilege access, Okta recommends that you create a custom role for admins to manage security access reviews. See [Create a role](https://help.okta.com/oie/en-us/content/topics/security/custom-admin-role/create-role.htm) in the production documentation and assign the **Manage security access reviews as admin** permission (`okta.governance.securityAccessReviews.admin.manage`) to your custom admin role.

You need to assign the custom admin role to the principal that manages security access reviews. Principals can be an Okta user or a client app (service app). With the proper roles in place, these principals have the permissions required to trigger and review security access reviews.

### Create an app for OAuth 2.0 authentication

Access OIG APIs by authenticating with an [OAuth 2.0 access token](https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/#oauth-20-access-token). To obtain an OAuth 2.0 access token for API authentication, you need to have an app in Okta for API access.

If you already have an OIDC or service app for API authentication, ensure that your app is granted for the following OAuth 2.0 scope:

* `okta.governance.securityAccessReviews.admin.manage`

    In addition, grant any other scopes that you may need for other API requests, such as `okta.users.manage` or `okta.users.read` to request Okta user resources.

Also ensure that your API user or service app is assigned to the IAM role that has permission to manage security access reviews. Assign either:

* The super admin (`SUPER_ADMIN`) role

  Or

* Your custom admin role with the **Manage security access reviews as admin** (`okta.governance.securityAccessReviews.admin.manage`) permission.

> **Note:** If you're using Okta Workflows, the **Okta Workflows OAuth** app in your org is used for API authentication. Grant the `okta.governance.securityAccessReviews.admin.manage` scope to this app. See [Authorization > Create a connection from the current Okta org](https://help.okta.com/okta_help.htm?type=wf&id=ext-okta-misc-authorization).

If you don't have an app for API access:

* Create an **OIDC-OpenID Connect** sign-in method app for API access if you're making API requests as an Okta user.

  See [User-based API access setup](https://developer.okta.com/docs/reference/rest/#user-based-api-access-setup) to create an OIDC app. Grant the required `okta.governance.securityAccessReviews.admin.manage` scope to the OIDC app (in addition to any other scope you need).

  Assign the API users to the OIDC app. Ensure that the API users are assigned to the super admin role or to a custom role that contains the **Manage security access reviews as admin** (`okta.governance.securityAccessReviews.admin.manage`) permission.

* Create an **API Services** sign-in method app for API access if you're making API requests from a service or daemon without user context.

  See [Service-based API access setup](https://developer.okta.com/docs/reference/rest/#service-based-api-access-setup) to create a service app. Grant the required `okta.governance.securityAccessReviews.admin.manage` scope and assign the required admin role (super admin or your custom role) to the service app.

## Initiate a security access review

Security access reviews are initiated through a custom app or through a delegated flow in Okta Workflows. You can use the following API requests and response examples for either methods.

### Get an OAuth 2.0 access token

You can use Okta authentication SDKs or code your own API sequence to get an access token for API access.

> **Note:** See `getToken` methods from [Okta authentication SDKs](https://developer.okta.com/code/). For example, use [tokenManager.getTokens()](https://www.npmjs.com/package/@okta/okta-auth-js#tokenmanagergettokens) in [Okta Auth JavaScript SDK](https://www.npmjs.com/package/@okta/okta-auth-js#tokenmanagergettokens).

* For API requests from a user, see [Get an access token and make a request](https://developer.okta.com/docs/reference/rest/#get-an-access-token-and-make-a-request).

* For API requests from a service app, see [Get an access token from a signed JWT](https://developer.okta.com/docs/reference/rest/#get-an-access-token-from-a-signed-jwt).

Use the obtained OAuth 2.0 access token as bearer tokens in the authentication header of your API requests.

> **Note:** This task isn't required for delegated flow implementations. The **Okta Workflows OAuth** app handles OAuth 2.0 access to APIs. See [Create a connection from the current Okta org](https://help.okta.com/okta_help.htm?type=wf&id=ext-okta-misc-authorization) and [Custom API Actions](https://help.okta.com/okta_help.htm?type=wf&id=ext-oktaitp-method-customapiactionaojbwnnd4l).

### Get IDs for your users

Use Okta user IDs as parameters to initiate a security access review using the `POST /governance/api/v2/security-access-reviews` method (see [Create a security access review](https://preview.redoc.ly/okta-iga-internal/llo-OKTA-982885-org-governance-settings/openapi/governance.api/tag/Security-Access-Reviews/#tag/Security-Access-Reviews/operation/createSecurityAccessReview)).

Find the Okta user IDs for the following users:

1. The target user for the security access review (for the `principalId` parameter)

    This is the user whose access is under review.

2. The reviewers for the security access review (for the `reviewerSettings.userSettings` parameter)

   These are the security analysts or resource owners that assess the user access items and perform any remediation. Reviewers can be an Okta admin or an end user. After the review is created, reviewers are automatically assigned the Okta Security Access Review app to conduct the review.

Use the [List all user](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#tag/User/operation/listUsers) request with the `find` query parameter and user profile attributes to find the user IDs.

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer {yourOktaAccessToken}" \
"https://${yourOktaDomain}/api/v1/users?search=profile.login%20eq%20%22testUser%40example.com%22"

```

Use the `id` property of the response payload for your user IDs in the [Create a security access review] request.

See [User query options](https://developer.okta.com/docs/reference/user-query/) for more query options.

> **Note:** This request (and Okta API access app) requires the `okta.users.read` scope.

### Create a security access review

Create a security access review with the [Security Access Review] > [Create a security access review] request.

> **Note:** The targeted user of the security access review can't be a reviewer. An API error is returned if you specify the same ID in `principalId` as one of the IDs in the `reviewerSettings.userSettings` list.

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
      "userSettings": {
        "includedUserIds": [
          "00ucpjbi6JMmDvdN40g4",
          "00ucpjbi6JMmDvdN40g5"
        ]
      }
    }
  }'
```

#### Response

```json
{
    "id": "sar1lo5X9wmNTFX7x0g4",
    "createdBy": "00ucfd4IQoH6YBZgA0g4",
    "created": "2025-08-19T22:10:34Z",
    "lastUpdated": "2025-08-19T22:10:34Z",
    "lastUpdatedBy": "00ucfd4IQoH6YBZgA0g4",
    "_links": {
        "securityAccessReviewDetails": {
            "href": "https://myoktadomain.okta.com/governance/api/v2/security-access-reviews/sar1lo5X9wmNTFX7x0g4",
            "hints": {}
        }
    },
    "status": "PENDING",
    "name": "Security access review for Test user",
    "endTime": "2025-08-26T22:10:33.882Z",
    "reviewerSettings": {
        "type": "USER",
        "userSettings": {
            "includedUserIds": [
                "00ucpjbi6JMmDvdN40g4",
                "00ucpjbi6JMmDvdN40g5"
            ]
        }
    }
}
```

The `status` of the security access review is `PENDING` when it's triggered. After the review is generated, the `status` is `ACTIVE` for reviewers to assess and remediate.

The following are specific behavior and limitations for security access reviews:

* You can only have a maximum of five active security access reviews for the same target user.
* There's a maximum of ten reviewers for a security access review.
* There's a limit of 500 active security access reviews per org.
* Security access reviews are automatically closed in seven days.
* Reviewers can only view items in the access review that they have permission to view. For example, they can't view the System Log entries for the targeted user if they don't have permission to view System Logs.

## Next steps: review and remediation

Reviewing and remediating security access reviews through the APIs aren't covered in this guide. Okta recommends that you use the Admin Console or End-User Dashboard for these operations. See [Manage security access reviews](HOC) and [Review access](HOC) in the product documentation.

> **Note:** See [Security Access Reviews] and [My Security Access Review] for a complete list of available security access review APIs.
