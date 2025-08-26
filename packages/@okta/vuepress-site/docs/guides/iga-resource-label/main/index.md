---
title: Create a resource label
meta:
  - name: description
    content: How to create and view resource labels with the Okta Identity Governance APIs
layout: Guides
---

This guide shows you how to create a resource label using the Okta Identity Governance (OIG) APIs.

---

#### Learning outcomes

* Learn how to set up Okta to access [Okta Identity Governance APIs](https://developer.okta.com/docs/api/iga/).
* Learn how to create a resource label using the [Okta Identity Governance](https://developer.okta.com/docs/api/iga/) > [Labels](https://preview.redoc.ly/okta-iga-internal/vn-okta-955721-iga-label-review/openapi/governance.api/tag/Labels/) APIs.

#### What you need

* An Okta org subscribed to Okta Identity Governance (OIG)
* Postman (or a similar tool to follow this guide and test the OIG APIs)

---

## Overview

Resource labels allow you to categorize and organize resources such as apps, groups, entitlements, and collections. Labels support governance automation, streamline configuration, and simplify the management of access reviews and requests.

< more > 

### Default labels

List the set of default labels

### Create a label flow

do we need this section? or maybe a section on how to use it?

This guide shows you how to create a resource label using the APIs with OAuth 2.0 authentication:

1. [Set up Okta for API access](#set-up-okta-for-api-access).
1. [List available resource labels]
1. [Create a resource label]

## Set up Okta for API access

Set up Okta so that you can authenticate to Okta APIs and have the proper roles or permissions to manage resource labels.

You only have to set up your Okta org for OIG Labels API access once. Okta recommends that you perform these tasks from the Admin Console. However, you can also use [Okta Management APIs](https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/) for the same tasks.

> **Note:** See the [Use Okta Identity Governance API in Okta Workflows](https://support.okta.com/help/s/article/use-okta-identity-governance-api-in-okta-workflows?language=en_US) article for an overview of how to use Okta Workflows with OIG APIs.

### Create an app for OAuth 2.0 authentication

Access OIG APIs by authenticating with an [OAuth 2.0 access token](https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/#oauth-20-access-token). To obtain an OAuth 2.0 access token for API authentication, you need to have an app in Okta for API access. The app provides you with the client ID and secret (or credentials) to request for access tokens.

If you already have an OIDC or service app for API authentication, ensure that your app is granted for the following OAuth 2.0 scope:

* `okta.governance.labels.read`

    In addition, grant any other scopes that you may need for other API requests, such as `okta.apps.manage` or `okta.apps.read` to request Okta app resources.

Also ensure that your API users or service app are assigned to the IAM role that has permission to manage labels. Assign either one of these roles to your principal API requester:

* The apps admin (`APP_ADMIN`) role
* The super admin (`SUPER_ADMIN`) role

> **Note:** If you're using Okta Workflows, the **Okta Workflows OAuth** app in your org is used for API authentication. Grant the `okta.governance.securityAccessReviews.admin.manage` scope to this app. See [Authorization > Create a connection from the current Okta org](https://help.okta.com/okta_help.htm?type=wf&id=ext-okta-misc-authorization).

If you don't have an app for API access:

* Create an **OIDC-OpenID Connect** sign-in method app for API access if you're making API requests as an Okta user.

  See [User-based API access setup](https://developer.okta.com/docs/reference/rest/#user-based-api-access-setup) to create an OIDC app. Grant the required `okta.governance.securityAccessReviews.admin.manage` scope to the OIDC app (in addition to any other scope you need).

  Assign the API users to the OIDC app. Ensure that the API users are assigned to the super admin role or to a custom role that contains the **Manage security access reviews as admin** (`okta.governance.securityAccessReviews.admin.manage`) permission.

* Create an **API Services** sign-in method app for API access if you're making API requests from a service or daemon without user context.

  See [Service-based API access setup](https://developer.okta.com/docs/reference/rest/#service-based-api-access-setup) to create a service app. Grant the required `okta.governance.securityAccessReviews.admin.manage` scope and assign the required admin role (super admin or your custom role) to the service app.

## Launch a security access review

The `POST /governance/api/v2/security-access-reviews` API method ([Create a security access review](https://preview.redoc.ly/okta-iga-internal/llo-OKTA-982885-org-governance-settings/openapi/governance.api/tag/Security-Access-Reviews/#tag/Security-Access-Reviews/operation/createSecurityAccessReview)) is used to launch the security access review. A custom app or a delegated flow uses the API to launch the review following a security or policy evaluation event.

> **Note:** Security admins can also launch security access reviews manually from the Admin Console, but this isn't the typical process flow. See [Create a security access review](HOC) in the product documentation.

See the API request examples in the following sections to launch a security access review.

### Get an OAuth 2.0 access token

You can use Okta authentication SDKs or code your own sequence to get an access token for API access.

> **Note:** See `getToken` methods from [Okta authentication SDKs](https://developer.okta.com/code/). For example, use [tokenManager.getTokens()](https://www.npmjs.com/package/@okta/okta-auth-js#tokenmanagergettokens) in [Okta Auth JavaScript SDK](https://www.npmjs.com/package/@okta/okta-auth-js#tokenmanagergettokens).

* For API requests from a user, see [Get an access token and make a request](https://developer.okta.com/docs/reference/rest/#get-an-access-token-and-make-a-request).

* For API requests from a service app, see [Get an access token from a signed JWT](https://developer.okta.com/docs/reference/rest/#get-an-access-token-from-a-signed-jwt).

Use the obtained OAuth 2.0 access token as bearer tokens in the authentication header of your API requests.

> **Note:** This task isn't required for delegated flow implementations. The **Okta Workflows OAuth** app handles OAuth 2.0 access to APIs. See [Create a connection from the current Okta org](https://help.okta.com/okta_help.htm?type=wf&id=ext-okta-misc-authorization) and [Custom API Actions](https://help.okta.com/okta_help.htm?type=wf&id=ext-oktaitp-method-customapiactionaojbwnnd4l).


### Create a resource label

Create a resource label with the [Create a label](https://preview.redoc.ly/okta-iga-internal/vn-okta-955721-iga-label-review/openapi/governance.api/tag/Labels/#tag/Labels/operation/createLabel) request (`POST /governance/api/v1/labels`).


#### Request

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

## Assign labels

## Next steps: use labels in governance reviews and requests

You can use labels to scope access certification campaigns and access reviews.

You can use labels to target resources in access requests.

These stesps aren't covered in this guide. Okta recommends that you use labels in the Admin Console for these tasks. See [Resource labels](HOC) in the product documentation.

> **Note:** See [Labels](https://preview.redoc.ly/okta-iga-internal/vn-okta-955721-iga-label-review/openapi/governance.api/tag/Labels/) for a complete list of available resource label APIs.
