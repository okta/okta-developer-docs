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

* Streamlined governance: Labels enable automated governance workflows, simplifying creating access reviews and request tasks.

* Simplified management: They make it easier to configure and manage your resources by providing a clear way to categorize them.

* Efficient searching: After you create your labels and assign them to resources, they become a filterable option in the Admin Console's resource search functionality. For example, go to the **Applications** > **Applications** or the **Directory** > **Groups** > **Advanced search** pages to view the **Governance Labels** search option.

See to the [Resource labels](https://help.okta.com/okta_help.htm?type=oie&id=resource-labels) product documentation.

Okta provides two predefined labels in your OIG-enabed org:

| Label key | Label value | Background color |
|-----------|-------------|------------------|
| Crown Jewel | Crown Jewel | green |
| Privileged | Privileged | red |

You can add additional values to the predefined **Crown Jewel** and **Privileged** label keys (up to the maximum limit for values). However, you can't delete these predefined labels.

The following governance label limits apply to each Okta org:

* A maximum of ten label keys
* A maximum of ten values for each label key
* A maximum of ten label-values can be assigned to each resource

Label key-value pairs are case-insensitive and are unique across all resource labels in an org.

This guide shows you the following process steps using the APIs with OAuth 2.0 authentication:

1. [Set up Okta for API access](#set-up-okta-for-api-access).
1. [Create a label](#create-a-label).
1. [Assign labels](#assign-labels).
1. [Update labels](#update-labels).
1. [Delete a label](#delete-a-label).

> **Note:** Only a user with the super admin role can manage (create, delete, update, and assign) labels.

## Set up Okta for API access

Set up Okta so that you can authenticate to Okta APIs and have the proper roles and scopes to manage labels.

You only have to set up your Okta org for OIG Labels API access once. Okta recommends that you perform these tasks from the Admin Console. However, you can also use [Okta Management APIs](https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/) for the same tasks.

> **Note:** See the [Use Okta Identity Governance API in Okta Workflows](https://support.okta.com/help/s/article/use-okta-identity-governance-api-in-okta-workflows?language=en_US) article for an overview of how to use Okta Workflows with OIG APIs.

Only super admins (`SUPER_ADMIN`) can create labels. The authenticated user making requests to the [Labels](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Labels/) APIs must have the super admin role.

### Create an app for OAuth 2.0 authentication

Access OIG APIs by authenticating with an [OAuth 2.0 access token](https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/#oauth-20-access-token). To obtain an OAuth 2.0 access token for API authentication, you need to have an app in Okta for API access.

* If you don't have an OIDC app for API authentication, see [User-based API access setup](https://developer.okta.com/docs/reference/rest/#user-based-api-access-setup) to create an OIDC app. Grant the [scopes required for labels](#scopes-required-for-labels) to the OIDC app (in addition to any other scopes you may need).

* If you already have an OIDC app for API authentication, ensure that your app is granted with the [scopes required for labels](#scopes-required-for-labels).

### Scopes required for labels

Your OAuth 2.0 access token must have the appropriate scopes for the Labels API request.

Ensure that the following scopes are granted to your OIDC app for API authentication:

* `okta.governance.labels.manage`
* `okta.apps.read`
* `okta.groups.read`
* `okta.governance.entitlements.read`
* `okta.governance.collections.read`

    In addition, grant any other scopes that you may need for other API requests, such as `okta.governance.entitlements.manage` or `okta.apps.manage`.

> **Note:** If you're using Okta Workflows, the **Okta Workflows OAuth** app in your org is used for API authentication. Grant these required scopes to this app. See [Authorization > Create a connection from the current Okta org](https://help.okta.com/okta_help.htm?type=wf&id=ext-okta-misc-authorization).

### Assign API users to your API access app

Assign the user requesting the Labels APIs to your API access app. This is either the OIDC app in [Create an app for OAuth 2.0 authentication](#create-an-app-for-oauth-2-0-authentication) or **Okta Workflows OAuth** app for Workflows. See [Authorization > Create a connection from the current Okta org](https://help.okta.com/okta_help.htm?type=wf&id=ext-okta-misc-authorization).

Ensure that your API user is assigned the super admin role (`SUPER_ADMIN`). Only super admins can manage labels using the [Labels](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Labels/) APIs.

## Manage resource labels

Use the [Labels](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Labels/) API to manage governance labels.

The examples in this section assumes that you're making the request with an OAuth 2.0 access token. See [Get an access token and make a request](https://developer.okta.com/docs/reference/rest/#get-an-access-token-and-make-a-request) for API requests from a user. Ensure that your  OAuth 2.0 access token is granted the required scopes for the request.

> **Note:** You can't manage labels from the Admin Console. However, you can use existing resource labels, created through the API, in the Admin Console for your governance tasks.

### Create a label

Create a label with the [Create a label](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Labels/#tag/Labels/operation/createLabel) request (`POST /governance/api/v1/labels`).

You can define up to ten label values for a label key to generate label key-value pairs:

* Specify the label key in the `name` parameter.
* Specify the list of values in the `values` array.
* For each `values.name` value, you can specify the background color in the `metadata.additionalProperties.backgroundColor` parameter. The supported background colors are red, orange, yellow, green, blue, purple, teal, beige, and gray.

> **Note:** You need the `okta.governance.labels.manage` scope for this request.

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

After you create your labels, they appear as search options in the Admin Console resource page. Save the `labelValueId` values to assign resources to these label values.

### Assign labels

Assign labels to resources with the [Assign the labels to resources](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Labels/#tag/Labels/operation/assignResourceLabels) request (`POST /governance/api/v1/resource-labels/assign`).

* Use the [List all labels](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Labels/#tag/Labels/operation/listLabels) request to obtain label details. Specifically, retrieve the `labelValueId` of label values that you want to assign to resources.
* You have to specify the resources in [ORN](https://developer.okta.com/docs/api/openapi/okta-management/guides/roles/#okta-resource-name-orn) format.

> **Note:** You need the `okta.governance.labels.manage` scope for this request in addition to the scopes required to manage the resource (for example, `okta.apps.manage` or `okta.governance.entitlements.manage`).

#### Request example

This example assigns two label values to two resources:

```bash
curl -i -X POST \
  https://subdomain.okta.com/governance/api/v1/resource-labels/assign \
  -H 'Authorization: Bearer <YOUR_ACCESS_TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
    "resourceOrns": [
      "orn:okta:idp:00o11edPwGqbUrsDm0g4:apps:oidc:0oafxqCAJWWGELFTYASJ",
      "orn:okta:governance:00o11edPwGqbUrsDm0g4:entitlement-bundles:enbogpaj3XUzcM62u1d6"
    ],
    "labelValueIds": [
      "lblo3v6xlwdtEX2il1d1",
      "lblo3v6xlwdtEX2il1d2"
    ]
  }'
```

#### Response example

```json
{
  "data": [
    {
      "orn": "orn:okta:idp:00o11edPwGqbUrsDm0g4:apps:oidc:0oafxqCAJWWGELFTYASJ",
      "profile": {
        "id": "0oafxqCAJWWGELFTYASJ",
        "name": "Github application",
        "description": "Github application"
      },
      "labels": [
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
            }
          ],
          "_links": {
            "self": null,
            "href": "/governance/api/v1/labels/lbco3v6xlwdtEX2il1d6"
          }
        },
        {
          "labelId": "lbco3v6xlwdtEX2il1d7",
          "name": "Security",
          "values": [
            {
              "labelValueId": "lblo3v6xlwdtEX2il1d2",
              "name": "GDPR",
              "metadata": {
                "additionalProperties": {
                  "backgroundColor": "yellow"
                }
              }
            }
          ],
          "_links": {
            "self": null,
            "href": "/governance/api/v1/labels/lbco3v6xlwdtEX2il1d7"
          }
        }
      ]
    },
    {
      "orn": "orn:okta:governance:00o11edPwGqbUrsDm0g4:entitlement-bundles:enbogpaj3XUzcM62u1d6",
      "profile": {
        "id": "enbogpaj3XUzcM62u1d6",
        "name": "Github admin bundle",
        "description": "Github bundle for administrative access"
      },
      "labels": [
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
            }
          ],
          "_links": {
            "self": null,
            "href": "/governance/api/v1/labels/lbco3v6xlwdtEX2il1d6"
          }
        },
        {
          "labelId": "lbco3v6xlwdtEX2il1d7",
          "name": "Security",
          "values": [
            {
              "labelValueId": "lblo3v6xlwdtEX2il1d2",
              "name": "GDPR",
              "metadata": {
                "additionalProperties": {
                  "backgroundColor": "yellow"
                }
              }
            }
          ],
          "_links": {
            "self": null,
            "href": "/governance/api/v1/labels/lbco3v6xlwdtEX2il1d7"
          }
        }
      ]
    }
  ]
}
```

Resources can have a maximum of ten label values. You can use the [Remove the labels from resources](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Labels/#tag/Labels/operation/removeResourceLabels) request to unassign labels from resources. When the resources are deleted, the labels are automatically unassigned.

See [List all labeled resources](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Labels/#tag/Labels/operation/listLabelResources) to search for resources with labels.

### Update labels

Update labels with the [Update the labels to resources](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Labels/#tag/Labels/operation/updateLabel) request (`PATCH /governance/api/v1/labels/{labelId}`).

> **Note:** You need the `okta.governance.labels.manage` scope for this request.

You can perform these operations to edit an existing label:

* Add a new label value.
* Remove a label value.
* Update a label value.
* Update a label key name.
  > **Note:** You can't update or remove the predefined **Crown Jewel** and **Privileged** label keys and corresponding values.


#### Request example

#### Response example


### Delete a label

Delete a label key and its associated values with the [Delete a label](https://developer.okta.com/docs/api/iga/openapi/governance.api/tag/Labels/#tag/Labels/operation/deleteLabel) request (`DEL /governance/api/v1/labels/{labelId}`).

You can only delete a label key if there are no associated label values assigned to any resources.

> **Note:** You need the `okta.governance.labels.manage` scope for this request.

#### Request example

```bash
curl -i -X DELETE \
  'https://subdomain.okta.com/governance/api/v1/labels/{labelId}' \
  -H 'Authorization: Bearer <YOUR_ACCESS_TOKEN>'
```

## Next steps

After labels are created and assigned to resources in your Okta org, you can use them for governance tasks in the Admin Console. See [Resource labels](https://help.okta.com/okta_help.htm?type=oie&id=resource-labels) in the product documentation.

* You can use labels to scope access certification resource campaigns. See [Create resource campaigns](https://help.okta.com/oie/en-us/content/topics/identity-governance/access-certification/iga-ac-create-campaign.htm)

* You can use labels to target resources in access requests.
