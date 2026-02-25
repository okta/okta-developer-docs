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
* Learn how to create, update, delete, and assign labels using the [Okta Identity Governance](https://developer.okta.com/docs/api/iga/) > [Labels](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/labels) APIs.

#### What you need

* An Okta org that's subscribed to OIG
* Okta Workflows or Postman to follow this guide and test the OIG APIs

---

## Overview

Labels allow you to categorize and organize resources such as apps, groups, entitlement values, and collections. Labels are defined as key-value pair metadata that are assigned to resources to add valuable context.

Labels in OIG provide several key benefits:

* Simplify management: They make it easier to configure and manage your resources by providing a clear way to categorize them.

* Streamline governance: Labels enable automated governance flows, which simplifies creating access reviews and request tasks.

* Efficient searching and enhanced visibility: After you create governance labels and assign them to resources, they become filterable options in the Admin Console's resource search functionality. For example, go to the **Applications** or the **Groups** > **Advanced search** pages to view the **Governance Labels** search options.

You can only manage labels with the [Labels API](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/labels/). However, you can use the labels in the Admin Console after they're created and assigned to resources through the API. See the [Resource labels](https://help.okta.com/okta_help.htm?type=oie&id=resource-labels) product documentation.

> **Note:** Only users with the super admin role (`SUPER_ADMIN`) or a custom role with the [label permissions](https://help.okta.com/okta_help.htm?type=oie&id=cstm-admin-role-labels-permissions) can manage labels. See [Assign roles to your API users](#assign-roles-to-your-api-users).

### Predefined labels and limits

Okta provides two predefined labels in your OIG-enabed org:

| Label key | Label value | Background color |
|-----------|-------------|------------------|
| Crown Jewel | Crown Jewel | green |
| Privileged | Privileged | red |

You can't modify the predefined **Crown Jewel** and **Privileged** labels.

The following maximum label limits apply to each Okta org:

* 10 label keys
* 10 values for each label key
* 10 label values can be assigned to each resource

Label key-value pairs are case-insensitive and are unique across all resource labels in an org.

> **Note:** The 10 label-keys maximum value doesn't include the predefined **Crown Jewel** and **Privileged** labels. So technically, you can use up to 12 label keys in your org.

## Set up Okta for API access

Set up Okta so that you can authenticate to Okta APIs and have the proper roles and scopes to manage labels:

1. [Set up an app for OAuth 2.0 authentication](#set-up-an-app-for-oauth-2-0-authentication).
1. [Grant scopes required for labels](#scopes-required-for-labels).
1. [Assign roles to your API users](#assign-roles-to-your-api-users).
1. [Assign API users to a role and to your API access app](#assign-api-users-to-a-role-and-to-your-api-access-app).

You only have to set up your Okta org for OIG Labels API access once. Okta recommends that you perform these tasks from the Admin Console. However, you can also use [Okta Management APIs](https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/) for the same tasks.

> **Note:** See the [Use Okta Identity Governance API in Okta Workflows](https://support.okta.com/help/s/article/use-okta-identity-governance-api-in-okta-workflows?language=en_US) article for an overview of how to use Okta Workflows with OIG APIs.

### Set up an app for OAuth 2.0 authentication

Users can access OIG APIs by authenticating with an [OAuth 2.0 access token](https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/#oauth-20-access-token). To obtain an OAuth 2.0 access token for API authentication, you need to have an app in Okta for API access:

* If you don't have an app for API access, see [User-based API access setup](/docs/guides/set-up-oauth-api/main/#user-based-api-access-setup) to create an OIDC app. Grant the [scopes required for labels](#scopes-required-for-labels) to the OIDC app (in addition to any other scopes you may need).

* If you already have an OIDC app for API access, ensure that your app is granted with the [scopes required for labels](#scopes-required-for-labels).

* If you're using Okta Workflows, ensure that the **Okta Workflows OAuth** app is granted with the [scopes required for labels](#scopes-required-for-labels). See [Authorization > Create a connection from the current Okta org](https://help.okta.com/okta_help.htm?type=wf&id=ext-okta-misc-authorization).

### Scopes required for labels

Your OAuth 2.0 access token must have the appropriate scopes for the [Labels API](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/labels/) request.

Ensure that the following scopes are granted to your app for API authentication:

* `okta.governance.labels.manage`
* `okta.apps.read`
* `okta.groups.read`
* `okta.governance.entitlements.read`
* `okta.governance.collections.read`

In addition, grant any other scopes that you may need for other API requests, such as `okta.governance.entitlements.manage` or `okta.apps.manage`.

> **Note:** If you're using Okta Workflows, the **Okta Workflows OAuth** app in your org is used for API authentication. Grant these required scopes to this app. See [Authorization > Create a connection from the current Okta org](https://help.okta.com/okta_help.htm?type=wf&id=ext-okta-misc-authorization).

### Assign roles to your API users

Assign a role to your API user (or non-user principal) with adequate permissions to manage the [Labels API](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/labels/).
This is either a custom role with the label permissions or the super admin role (`SUPER_ADMIN`).

You can create a custom role with the following permissions:

* `okta.governance.labels.read`: to view existing labels
* `okta.governance.labels.manage`: to create, update, assign, and delete labels

See [Use custom admin roles](https://help.okta.com/okta_help.htm?type=oie&id=csh-create-cstm-admin-role) in the product documentation to a create custom role with the [label permissions](https://help.okta.com/okta_help.htm?type=oie&id=cstm-admin-role-labels-permissions).

If you don't have a custom role with these permissions, assign the super admin (`SUPER_ADMIN`) role to your API users.

### Assign API users to your API access app

Assign the user requesting the Labels APIs to your API access app. This is the app for API access in [Set up an app for OAuth 2.0 authentication](#set-up-an-app-for-oauth-2-0-authentication). See [Assign app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps_Page-assign).

## Manage resource labels

Use the [Labels](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/labels/) API to manage governance labels.

Examples in this section assume that you're making the request with an OAuth 2.0 access token. See [Get an access token and make a request](/docs/guides/set-up-oauth-api/main/#get-an-access-token-and-make-a-request) for API requests from a user.

### Create a label

Create a label with the [Create a label](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/labels/createlabel) request (`POST /governance/api/v1/labels`):

* Specify the label key in the `name` parameter.
* Specify the list of values in the `values` array.
* For each `values.name` value, you can specify the background color in the `metadata.additionalProperties.backgroundColor` parameter. The supported background colors are red, orange, yellow, green, blue, purple, teal, beige, and gray.

You can define up to 10 label values for a label key to generate label key-value pairs.

> **Note:** You need the `okta.governance.labels.manage` scope for this request.

#### Request example

```bash

curl -i -X POST \
  https://{yourOktaDomain}/governance/api/v1/labels \
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

After you create your labels, they appear as search options in the Admin Console resource pages. Save the `labelValueId` values in the response to assign resources to these label values.

### Assign labels

Assign labels to resources with the [Assign the labels to resources](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/labels/assignresourcelabels) request (`POST /governance/api/v1/resource-labels/assign`):

* Use the [List all labels](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/labels/listlabels) request to obtain label details. Specifically, retrieve the `labelValueId` of label values that you want to assign to resources.
* Specify the resources in [ORN](https://developer.okta.com/docs/api/openapi/okta-management/guides/roles/#okta-resource-name-orn) format.

> **Note:** You need the `okta.governance.labels.manage` scope for this request in addition to the scopes required to manage the resource (for example, `okta.apps.manage` or `okta.governance.entitlements.manage`).

#### Request example

This example assigns two label values to two resources:

```bash
curl -i -X POST \
  https://{yourOktaDomain}/governance/api/v1/resource-labels/assign \
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

Resources have a maximum of ten label values. You can use the [Remove the labels from resources](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/labels/removeresourcelabels) request to unassign labels from resources. When resources are deleted, their labels are automatically unassigned.

See [List all labeled resources](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/labels/listlabelresources) to search for resources with labels.

### Update labels

Update labels with the [Update the labels to resources](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/labels/updatelabel) request (`PATCH /governance/api/v1/labels/{labelId}`).

> **Note:** You need the `okta.governance.labels.manage` scope for this request.

You can perform the following update operations on an existing label:

* Update a label key name.

  Set `"refType": "LABEL-CATEGORY"`, `"op": "REPLACE"`, `"path": "/name"`, and the updated `value` in the request body to update the key name.

* Add a label value.

  Set `"refType": "LABEL-VALUE"`, `"op": "ADD"`, `"path": "/values/-"`, and new label details in the `value` object of the request body to add a label value.

* Remove a label value.

  Set `"refType": "LABEL-VALUE"`, `"op": "REMOVE"`, and `"path": "/values/{labelValueId}"` in the request body to remove a label value.

* Update a label value.

  Set `"refType": "LABEL-VALUE"`, `"op": "REPLACE"`, `"path": "/values/{labelValueId}/name"`, and the updated `value.name` in the request body to update a label value.

* Change the background color for a label.

  Set `"refType": "LABEL-VALUE"`, `"op": "REPLACE"`, `"path": "/values/{labelValueId}/metadata/additionalProperties/backgroundColor"`, and the updated `value.metadata.additionalProperties.backgroundColor` in the request body to update the label background color.

> **Note:** You can't update or remove the predefined **Crown Jewel** and **Privileged** label keys and their corresponding label values.

#### Request example

This example replaces the background color of `lblo3v6xlwdtEX2il1d1` (SOX) to purple.

```bash
curl -i -X PATCH \
  'https://{yourOktaDomain}/governance/api/v1/labels/lbco3v6xlwdtEX2il1d6' \
  -H 'Authorization: Bearer <YOUR_ACCESS_TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
        {
          "op": "REPLACE",
          "path": "/values/lblo3v6xlwdtEX2il1d1/metadata/additionalProperties/backgroundColor",
          "value": {
            "metadata": {
              "additionalProperties": {
                "backgroundColor": "purple"
              }
            }
          },
          "refType": "LABEL-VALUE"
        }
  ]'
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
          "backgroundColor": "purple"
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

### Delete a label

Delete a label key and its associated values with the [Delete a label](https://developer.okta.com/docs/api/iga/openapi/governance-production-reference/labels/deletelabel) request (`DEL /governance/api/v1/labels/{labelId}`).

You can only delete a label key if there are no associated label values assigned to any resources.

> **Note:** You need the `okta.governance.labels.manage` scope for this request.

#### Request example

```bash
curl -i -X DELETE \
  'https://{yourOktaDomain}/governance/api/v1/labels/{labelId}' \
  -H 'Authorization: Bearer <YOUR_ACCESS_TOKEN>'
```

## Next steps

After labels are created and assigned to resources in your Okta org, you can use them for governance tasks in the Admin Console:

* See [Resource labels](https://help.okta.com/okta_help.htm?type=oie&id=resource-labels) in the product documentation.

* See [Create resource campaigns](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-campaigns) to scope access certification resource campaigns based on labels.
