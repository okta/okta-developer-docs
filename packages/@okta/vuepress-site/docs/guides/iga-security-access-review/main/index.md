---
title: Launch a security access review
meta:
  - name: description
    content: How to launch a security access review with the Okta Identity Governance APIs
layout: Guides
---

This guide shows you how to launch a security access review using the Okta Identity Governance (OIG) APIs. You can trigger a security access review from your custom app code or from delegated flows in [Okta Workflows](https://help.okta.com/okta_help.htm?type=wf) using the APIs. Reviews are performed from the **Okta Security Access Review** app.

---

#### Learning outcomes

* Learn how to set up Okta to access [Okta Identity Governance APIs](https://developer.okta.com/docs/api/iga/).
* Learn how to trigger a security access review using the [Okta Identity Governance](https://developer.okta.com/docs/api/iga/) > [Security Access Review](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/security-access-reviews) APIs.

#### What you need

* An Okta org that's subscribed to OIG
* Postman (or a similar tool to follow this guide and test the OIG APIs)

---

## Overview

Security access reviews offer a unified tool for reviewing and responding to access privileges for a specific user. This is particularly useful when responding to a security event or an identity threat on a user. The security access review is a snapshot of a user's resource access at the time of creation. It also provides an AI-generated summary for reviewers to quickly assess high-risk accesses and anomalies.

Several reviewers (Okta end users) can be assigned to a security access review for assessment coverage when app security is provided by different owners. Assigned reviewers can immediately act on fine-grain remediation beyond terminating a user's session, such as revoking access to a specific resource or entitlement.

### Security access review flow

Security access reviews are launched through your custom app code or through a delegated Workflow sequence using the APIs. The reviews are intended to be triggered from a security or policy evaluation event that focuses on a particular user. Only principals that are assigned the super admin role or a custom admin role (with required permissions) can trigger and view all security access reviews.

After the security access review is generated, an email is sent to designated reviewers, notifying them to review a user's access. The designated reviewers are assigned to the **Okta Security Access Review** app, where they conduct the review. Reviewers are only able to view and act on items in the security access review for which they have permissions.

See the [Security Access Reviews](https://help.okta.com/okta_help.htm?type=oie&id=csh-sar) product documentation for more information.

> **Notes:**
> * Security admins can also launch security access reviews manually from the Admin Console, but this isn't the typical process flow. See [Create a security access review](https://help.okta.com/okta_help.htm?type=oie&id=csh-sar-launch) in the product documentation.
> * For scheduled, broader-scoped access reviews, use Access Certifications campaigns. See [Campaigns](https://help.okta.com/okta_help.htm?type=oie&id=csh-campaigns). These access reviews are more appropriate for compliance audits.

This guide shows you how to launch a security access review using the APIs with OAuth 2.0 authentication:

1. [Set up Okta for API access](#set-up-okta-for-api-access).
1. [Launch a security access review](#launch-a-security-access-review).
1. [Conduct a security access review](#next-steps-review-and-remediation).

## Set up Okta for API access

Set up Okta so that you can authenticate to Okta APIs and have the proper roles and permissions for security access reviews.

You only have to set up your Okta org for OIG Security Access Reviews API access once. Okta recommends that you perform these tasks from the Admin Console. However, you can also use [Okta Management APIs](https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/) for the same tasks.

> **Note:** See the [Use Okta Identity Governance API in Okta Workflows](https://support.okta.com/help/s/article/use-okta-identity-governance-api-in-okta-workflows?language=en_US) article for an overview of how to use Okta Workflows with OIG APIs.

### Create a custom admin role for security access reviews

Only super admins (`SUPER_ADMIN`) can initially trigger security access reviews in Okta Identity Governance orgs.

For least-privilege access, Okta recommends that you create a custom role for admins to manage security access reviews. See [Create a role](https://help.okta.com/okta_help.htm?type=oie&id=csh-create-role) and assign following permissions to your custom role:

* **Manage security access reviews as admin** (`okta.governance.securityAccessReviews.admin.manage`)
* **View users** (`okta.users.read`)

You need to assign the custom admin role to the principal that manages security access reviews. Principals can be an Okta user or a client app (service app). With the proper roles in place, these principals have the permissions required to trigger and review security access reviews.

### Create an app for OAuth 2.0 authentication

Access OIG APIs by authenticating with an [OAuth 2.0 access token](https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/#oauth-20-access-token). To obtain an OAuth 2.0 access token for API authentication, you need to have an app in Okta for API access. The app provides you with the client ID and secret (or credentials) to request for access tokens.

If you already have an OIDC or service app for API authentication, ensure that your app is granted with the following OAuth 2.0 scopes:

* `okta.governance.securityAccessReviews.admin.manage`
* `okta.users.read`

    In addition, grant any other scopes that you may need for other API requests, such as `okta.apps.manage`.

Also ensure that your API users or service app are assigned to the IAM admin role that has permission to manage security access reviews. Assign either:

* The super admin (`SUPER_ADMIN`) role

  Or

* Your custom admin role (with the `okta.governance.securityAccessReviews.admin.manage` and `okta.users.read` permissions).

> **Note:** If you're using Okta Workflows, the **Okta Workflows OAuth** app in your org is used for API authentication. Grant the `okta.governance.securityAccessReviews.admin.manage` and the `okta.users.read` scopes to this app. See [Authorization > Create a connection from the current Okta org](https://help.okta.com/okta_help.htm?type=wf&id=ext-okta-misc-authorization).

If you don't have an app for API access:

* Create an **OIDC-OpenID Connect** sign-in method app for API access if you're making API requests as an Okta user.

  See [User-based API access setup](/docs/guides/set-up-oauth-api/main/#user-based-api-access-setup) to create an OIDC app. Grant the required `okta.governance.securityAccessReviews.admin.manage` and `okta.users.read` scopes to the OIDC app (in addition to any other scopes you may need).

  Assign the API users to the OIDC app. Ensure that the API users are assigned to the super admin role or to a custom role that is granted the following permissions:

    * **Manage security access reviews as admin** (`okta.governance.securityAccessReviews.admin.manage`)
    * **View users** (`okta.users.read`)

* Create an **API Services** sign-in method app for API access if you're making API requests from a service or daemon without user context.

  See [Service-based API access setup](/docs/guides/set-up-oauth-api/main/#service-based-api-access-setup) to create a service app. Grant the required `okta.governance.securityAccessReviews.admin.manage` and `okta.users.read` scopes, and assign the required admin role (super admin or your custom role) to the service app.

## Launch a security access review

The `POST /governance/api/v2/security-access-reviews` API method ([Create a security access review](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/security-access-reviews/createsecurityaccessreview)) is used to launch the security access review. A custom app or a delegated flow uses the API to launch the review following a security or policy evaluation event.

> **Note:** Security admins can also launch security access reviews manually from the Admin Console, but this isn't the typical process flow. See [Create a security access review](https://help.okta.com/okta_help.htm?type=oie&id=csh-sar-launch) in the product documentation.

See the API request examples in the following sections to launch a security access review.

### Get an OAuth 2.0 access token

You can use Okta authentication SDKs or code your own sequence to get an access token for API access.

> **Note:** See `getToken` methods from [Okta authentication SDKs](https://developer.okta.com/code/). For example, use [tokenManager.getTokens()](https://www.npmjs.com/package/@okta/okta-auth-js#tokenmanagergettokens) in [Okta Auth JavaScript SDK](https://github.com/okta/okta-auth-js/#okta-auth-javascript-sdk).

* For API requests from a user, see [Get an access token and make a request](/docs/guides/set-up-oauth-api/main/#get-an-access-token-and-make-a-request).

* For API requests from a service app, see [Get an access token from a signed JWT](/docs/guides/set-up-oauth-api/main/#get-an-access-token-from-a-signed-jwt).

Use the obtained OAuth 2.0 access token as bearer tokens in the authentication header of your API requests.

> **Note:** This task isn't required for delegated flow implementations. The **Okta Workflows OAuth** app handles OAuth 2.0 access to APIs. See [Create a connection from the current Okta org](https://help.okta.com/okta_help.htm?type=wf&id=ext-okta-misc-authorization) and [Custom API Actions](https://help.okta.com/okta_help.htm?type=wf&id=ext-oktaitp-method-customapiactionaojbwnnd4l).

### Get IDs for your users

Use Okta user IDs as parameters to initiate a security access review using the `POST /governance/api/v2/security-access-reviews` method (see [Create a security access review](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/security-access-reviews/createSecurityAccessReview)).

Find the Okta user IDs for the following users:

1. The target user for the security access review (for the `principalId` parameter). This is the user whose access is under review.

2. The reviewers for the security access review (for the `reviewerSettings.userSettings` parameter).

   These are the security analysts or resource owners that assess the user access items and perform any remediation. Reviewers can be an Okta admin or an end user. After the review is created, reviewers are automatically assigned the **Okta Security Access Review** app to conduct the review.

Use the [List all users](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#tag/User/operation/listUsers) request with the `search` query parameter and user profile attributes to find the user IDs.

> **Note:** This request requires the `okta.users.read` scope.

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer {yourOktaAccessToken}" \
"https://${yourOktaDomain}/api/v1/users?search=profile.login%20eq%20%22testUser%40example.com%22"

```

Use the `id` property of the response payload for the user ID parameters in the [Create a security access review](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/security-access-reviews/createSecurityAccessReview) request.

### Create a security access review

Create a security access review with the [Create a security access review](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/security-access-reviews/createSecurityAccessReview) request (`POST /governance/api/v2/security-access-reviews`).

> **Note:** The targeted user of the security access review can't be a reviewer. An API error is returned if you specify the same ID in `principalId` as one of the IDs in the `reviewerSettings.userSettings.includeUserIds` list.

#### Request example

```bash

curl -i -X POST \
  https://{yourOktaDomain}/governance/api/v2/security-access-reviews \
  -H 'Authorization: Bearer {yourOktaAccessToken}' \
  -H 'Content-Type: application/json' \
  -d '{
    "principalId": "00ucpjbi6JMmDvdN40g4",
    "name": "Security access review for Test user",
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

#### Response example

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

The `status` of the security access review is `PENDING` when it's triggered. After the review is generated, the `status` is `ACTIVE` for reviewers to assess and act on the target user's granted access.

If the reviewer has never conducted a security access review before, the **Okta Security Access Review** app is automatically assigned to them after the review is generated. Reviewers can only view items in the access review that they have permission to view. For example, they can't view the System Log entries for the targeted user if they don't have permission to view System Logs.

For best practices, considerations, and limitations, see [Security Access Review](https://help.okta.com/okta_help.htm?type=oie&id=csh-sar).

## Next steps: review and remediation

Reviewing and managing security access reviews through the APIs aren't covered in this guide. Okta recommends that reviewers use the **Okta Security Access Review** app for these operations. See [Manage security access reviews](https://help.okta.com/okta_help.htm?type=oie&id=csh-manage-sar) and [Review access](https://help.okta.com/okta_help.htm?type=oie&id=csh-sar-access-review) in the product documentation.

For a complete list of available security access review APIs, see [Security Access Reviews](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/security-access-reviews) and [My Security Access Review](https://developer.okta.com/docs/api/iga/openapi/governance-production-enduser-reference/my-security-access-reviews).

> **Note:** You can customize security access review notification emails. See `securityAccessReviewReviewerNotification`, `securityAccessReviewClosingOneDayNotification`, and `securityAccessReviewEndNotification` templates in [Use customizable email templates](/docs/guides/custom-email/main/#use-customizable-email-templates). Also see `${securityAccessReview.*}` variables in [Use VTL variables](/docs/guides/custom-email/main/#use-vtl-variables).
