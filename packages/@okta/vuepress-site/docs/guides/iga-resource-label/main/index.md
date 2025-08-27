---
title: Create a resource label
meta:
  - name: description
    content: How to create and view resource labels with the Okta Identity Governance APIs
layout: Guides
---

This guide shows you how to create and assign a resource label using the Okta Identity Governance (OIG) APIs.

---

#### Learning outcomes

* Learn how to set up Okta to access [Okta Identity Governance APIs](https://developer.okta.com/docs/api/iga/).
* Learn how to manage resource labels using the [Okta Identity Governance](https://developer.okta.com/docs/api/iga/) > [Labels](https://preview.redoc.ly/okta-iga-internal/vn-okta-955721-iga-label-review/openapi/governance.api/tag/Labels/) APIs.

#### What you need

* An Okta org subscribed to Okta Identity Governance (OIG)
* Postman (or a similar tool to follow this guide and test the OIG APIs)

---

## Overview

Resource labels allow you to categorize and organize resources such as apps, groups, entitlements, and collections. Labels support governance automation, streamline configuration, and simplify the management of access reviews and requests.

< more detail required> 

### Default labels

List the set of default labels (out of the box)
* **Crown Jewel**: value: "Crown Jewel"
* **Privileged**: value: "Privileged"

This guide shows you how to create a resource label using the APIs with OAuth 2.0 authentication:

1. [Set up Okta for API access](#set-up-okta-for-api-access).
1. [List available resource labels]
1. [Create a resource label]

## Set up Okta for API access

Set up Okta so that you can authenticate to Okta APIs and have the proper roles or permissions to manage resource labels.

You only have to set up your Okta org for OIG Labels API access once. Okta recommends that you perform these tasks from the Admin Console. However, you can also use [Okta Management APIs](https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/) for the same tasks.

> **Note:** See the [Use Okta Identity Governance API in Okta Workflows](https://support.okta.com/help/s/article/use-okta-identity-governance-api-in-okta-workflows?language=en_US) article for an overview of how to use Okta Workflows with OIG APIs.

### Okta app for OAuth 2.0 authentication

Access OIG APIs by authenticating with an [OAuth 2.0 access token](https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/#oauth-20-access-token). To obtain an OAuth 2.0 access token for API authentication, you need to have an app in Okta for API access. The app provides you with the client ID and secret (or credentials) to request for access tokens.

If you already have an OIDC or service app for API authentication, ensure that your app is granted for the following OAuth 2.0 scope:

* `okta.governance.labels.manage`
* `okta.apps.read`
* `okta.groups.read`
* `okta.governance.entitlements.read`
* `okta.governance.collections.read`

    In addition, grant any other scopes that you may need for other API requests, such as `okta.governance.entitlements.manage` or `okta.apps.manage`.

Also ensure that your API users or service app are assigned to the admin role that has permission to manage labels. Currently, only he super admin (`SUPER_ADMIN`) role can manage labels.

> **Note:** If you're using Okta Workflows, the **Okta Workflows OAuth** app in your org is used for API authentication. Grant the required scopes to the **Okta Workflows OAuth** app. See [Authorization > Create a connection from the current Okta org](https://help.okta.com/okta_help.htm?type=wf&id=ext-okta-misc-authorization).

If you don't have an app for API access, see [Set up Okta for API access](//docs/reference/rest/#set-up-okta-for-api-access) and ensure that your app is granted the scopes and admin roles previously mentioned.

## Manage resource labels

Use the [Labels](https://preview.redoc.ly/okta-iga-internal/vn-okta-955721-iga-label-review/openapi/governance.api/tag/Labels/) API to manage governance resource labels.

> **Note:** You can't manage resource labels from the Admin Console. However, you can use existing resource labels in our governance tasks to create reviews, requests, and automation.

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
  https://subdomain.okta.com/governance/api/v1/labels \
  -H 'Authorization: YOUR_API_KEY_HERE' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Compliance",
    "values": [
      {
        "name": "SOX",
        "metadata": {
          "additionalProperties": {
            "backgroundColor": "blue"
          }
        }
      },
      {
        "name": "PII",
        "metadata": {
          "additionalProperties": {
            "backgroundColor": "yellow"
          }
        }
      }
    ]
  }'

```

#### Response

```json
{
  "labelId": "lbco3v6xlwdtEX2il1d6",
  "name": "Compliance",
  "values": [
    {
      "labelValueId": "lblo3v6xlwdtEX2il1d1",
      "name": "SOX",
      "metadata": {
        "additionalProperties": {}
      }
    },
    {
      "labelValueId": "lblo3v6xlwdtEX2il1d6",
      "name": "PII",
      "metadata": {
        "additionalProperties": {}
      }
    }
  ],
  "_links": {
    "self": {
      "href": "/governance/api/v1/labels/lbco3v6xlwdtEX2il1d6"
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
