---
title: Manage governance labels
meta:
  - name: description
    content: How to create and assign governance labels with the Okta Identity Governance APIs
layout: Guides
---

This guide shows you how to create labels and assign them to resources using the Okta Identity Governance (OIG) APIs.

---

#### Learning outcomes

* Learn how to set up Okta to access [Okta Identity Governance APIs](https://developer.okta.com/docs/api/iga/).
* Learn how to create labels using the [Okta Identity Governance](https://developer.okta.com/docs/api/iga/) > [Labels](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Labels/) APIs.
* Learn how to assign labels to resources.
* Learn how to update and delete labels.

#### What you need

* An Okta org that's subscribed to OIG
* Postman (or a similar tool to follow this guide and test the OIG APIs)

---

## Overview

Labels allow you to categorize and organize resources such as apps, groups, entitlements, and collections. Labels are defined as key-value pair metadata that are assigned to resources to add valuable context.

Labels in OIG provide several key benefits:

* Streamlined Governance: Labels enable automated governance workflows, simplifying creating access reviews and request tasks.

* Simplified Management: They make it easier to configure and manage your resources by providing a clear way to categorize them.

* Efficient Searching: After you create your labels and assign them to resources, they become a filterable option in the Admin Console's resource search functionality. For example, go to the **Applications** > **Applications** or the **Directory** > **Groups** > **Advanced search** pages to view the **Governance Labels** search option.

See to the [Resource labels](https://help.okta.com/okta_help.htm?type=oie&id=resource-labels) product documentation.

Okta provides two predefined labels in your OIG-enabed org:

| Label key | Label value | Background color |
|-----------|-------------|------------------|
| Crown Jewel | Crown Jewel | green |
| Privileged | Privileged | red |

You can add additional values to the predefined **Crown Jewel** and **Privileged** label keys (up to the maximum limit for values). However, you can't delete these predefined labels.

The following governance label limits apply to each Okta org:

* Maximum of ten label keys
* Maximum of ten values for each label key
* Maximum of ten label-values can be assigned to each resource

Label key-value pairs are case-insensitive and are unique across all resource labels in an org.

This guide shows you the following process steps using the APIs with OAuth 2.0 authentication:

1. [Set up Okta for API access](#set-up-okta-for-api-access).
1. [Create a label](#create-a-label)
1. [Assign labels](#assign-labels)
1. [Update labels](#update-labels)
1. [Delete a label](#delete-a-label)

> **Note:** Only a user with the super admin role can manage (create, delete, update, and assign) labels.

## Set up Okta for API access

Set up Okta so that you can authenticate to Okta APIs and have the proper roles and scopes to manage labels.

You only have to set up your Okta org for OIG Labels API access once. Okta recommends that you perform these tasks from the Admin Console. However, you can also use [Okta Management APIs](https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/) for the same tasks.

> **Note:** See the [Use Okta Identity Governance API in Okta Workflows](https://support.okta.com/help/s/article/use-okta-identity-governance-api-in-okta-workflows?language=en_US) article for an overview of how to use Okta Workflows with OIG APIs.

Only super admins (`SUPER_ADMIN`) can create labels. The authenticated user making requests to the [Labels](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Labels/) APIs must have the super admin role.

### Create an app for OAuth 2.0 authentication

Access OIG APIs by authenticating with an [OAuth 2.0 access token](https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/#oauth-20-access-token). To obtain an OAuth 2.0 access token for API authentication, you need to have an app in Okta for API access.

* If you don't have an OIDC app for API authentication, See [User-based API access setup](https://developer.okta.com/docs/reference/rest/#user-based-api-access-setup) to create an OIDC app. Grant the [scopes required for labels](#scopes-required-for-labels) to the OIDC app (in addition to any other scopes you may need).

* If you already have an OIDC app for API authentication, ensure that your app is granted with [scopes required for labels](#scopes-required-for-labels).

### Scopes required for labels

Your OAuth 2.0 access token must have the appropriate scopes for the Labels API request.

Ensure that the following scopes are granted to your OIDC app for API authentication:

* `okta.governance.labels.manage`
* `okta.apps.read`
* `okta.groups.read`
* `okta.governance.entitlements.read`
* `okta.governance.collections.read`

    In addition, grant any other scopes that you may need for other API requests, `okta.governance.entitlements.manage` or `okta.apps.manage`.

> **Note:** If you're using Okta Workflows, the **Okta Workflows OAuth** app in your org is used for API authentication. Grant these required scopes to this app. See [Authorization > Create a connection from the current Okta org](https://help.okta.com/okta_help.htm?type=wf&id=ext-okta-misc-authorization).

### Assign API users to your API access app

Assign the user requesting the Labels APIs to your API access app. This is either the OIDC app in [Create an app for OAuth 2.0 authentication](#create-an-app-for-oauth-2-0-authentication) or **Okta Workflows OAuth** app for Workflows. See [Authorization > Create a connection from the current Okta org](https://help.okta.com/okta_help.htm?type=wf&id=ext-okta-misc-authorization).

Ensure that your API user is assigned the super admin role (`SUPER_ADMIN`). Only super admins can manage labels using the [Labels](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Labels/) APIs.

## Manage resource labels

Use the [Labels](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Labels/) API to manage governance labels.

The examples in this section assumes that you're making the request with an OAuth 2.0 access token. See [Get an access token and make a request](https://developer.okta.com/docs/reference/rest/#get-an-access-token-and-make-a-request) for API requests from a user. Ensure that your  OAuth 2.0 access token is granted the required scopes for the request.

> **Note:** You can't manage labels from the Admin Console. However, you can use existing resource labels, created throught the API, in the Admin Console for your governance tasks.

### Create a label

Create a label with the [Create a label](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Labels/#tag/Labels/operation/createLabel) request (`POST /governance/api/v1/labels`). You can define up to ten label values for the label key to generate label key-value pairs.

> **Note:** You need the `okta.governance.labels.manage` scope to request this resource.

#### Request example

```bash

curl -i -X POST \
  https://subdomain.okta.com/governance/api/v1/labels \
  -H 'Authorization: Bearer <YOUR_ACCESS_TOKEN>' \
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

#### Response example

```json
{
  "labelId": "lbco3v6xlwdtEX2il1d6",
  "name": "Compliance",
  "values": [
    {
      "labelValueId": "lblo3v6xlwdtEX2il1d1",
      "name": "SOX",
      "metadata": {
        "additionalProperties": {
          "backgroundColor": "blue"
        }
      }
    },
    {
      "labelValueId": "lblo3v6xlwdtEX2il1d6",
      "name": "PII",
      "metadata": {
        "additionalProperties": {
          "backgroundColor": "yellow"
        }
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

After you create your labels, they appear as search options in the Admin Console resource page.

### Assign labels

Assign labels to resources with the [Assign the labels to resources](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Labels/#tag/Labels/operation/assignResourceLabels) request (`POST /governance/api/v1/resource-labels/assign`).

#### Request example

```bash
curl -i -X POST \
  https://subdomain.okta.com/governance/api/v1/resource-labels/assign \
  -H 'Authorization: YOUR_AUTH_INFO_HERE' \
  -H 'Content-Type: application/json' \
  -d '{
    "resourceOrns": [
      "orn:okta:idp:00o11edPwGqbUrsDm0g4:apps:oidc:0oafxqCAJWWGELFTYASJ",
      "orn:okta:directory:00o11edPwGqbUrsDm0g4:groups:00g10ctakVI6XlTdk0g4",
      "orn:okta:governance:00o11edPwGqbUrsDm0g4:entitlement-bundles:enbogpaj3XUzcM62u1d6",
      "orn:okta:governance:00o11edPwGqbUrsDm0g4:collections:cologpaj3XUzcM62u1d6",
      "orn:okta:governance:00o11rndFqmZ5rNfs0g4:entitlement-values:ent63C22YQoNMWOJf0g2"
    ],
    "labelValueIds": [
      "lblo3v6xlwdtEX2il1d1",
      "lblo3v6xlwdtEX2il1d2"
    ]
  }'
```

#### Response example





### Update labels

### Delete a label

## Next steps: use labels in governance reviews and requests

You can use labels to scope access certification campaigns and access reviews.

You can use labels to target resources in access requests.

These stesps aren't covered in this guide. Okta recommends that you use labels in the Admin Console for these tasks. See [Resource labels](HOC) in the product documentation.
