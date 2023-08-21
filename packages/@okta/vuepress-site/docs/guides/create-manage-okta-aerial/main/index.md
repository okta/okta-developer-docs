---
title: Create and manage Okta Aerial orgs
excerpt: Learn how to create and manage orgs added to your company's Okta Aerial account.
layout: Guides
sections:
  - main
---

This guide explains how to manage Orgs added to your company’s Aerial account.

<!-- Insert SKU note here -->

---

**Learning outcomes**

- Learn the terms related to Okta Aerial orgs.
- Link an org to your Aerial account.
- Enable products in the Aerial linked org.
- Configure the Aerial admin org.

**What you need**

- An Okta Aerial Account
- A parent org
- Access to the Org creator API
- Access to the Okta Aerial API

**Sample code**

Use the [Okta Aerial API](link to redocly)

---

## About Okta Aerial

<!-- high-level description... perhaps FVM? -->


<dl>
<dt><strong>Aerial account</strong></dt>
<dd>An Aerial account is the layer of organization and management around multiple orgs within Okta. The Aerial account lives outside of your orgs and has visibility and management over any production or preview org that the Aerial admin links to the Aerial account.
</dd>
<dt><strong>Aerial admin org</strong></dt>
<dd>An Aerial admin org serves as the authorization server to the Aerial account. You need to choose one org that serves as the Aerial admin org.</br>
Super admins can create API clients in the Aerial admin org to access the Aerial account. The Aerial admin org also contains all system log events associated with Okta Aerial actions.</dd>
<dt><strong>Products</strong></dt>
<dd>Products are Okta-determined sets of features. With the Okta Aerial API, you can view subscribed products for an Aerial account and enable a subset of products to orgs. Example products include SSO, AMFA, and LCM.</dd>
<dt><strong>Features</strong></dt>
<dd>Features are bundled within products but may also be offered separately, for example, Early Access features. Most features are pushed from parent to child org.</br>
**Note:** Some features, such as Workflows, aren’t synced between parent and child orgs.</dd>
<dt><strong>Okta objects</strong></dt>
<dd>Okta objects can include policies, settings, apps, and groups. Configure Okta objects using either the Admin Console or Okta Management APIs.</br>
**Note:** Configured Okta Objects aren’t synced between parent and child orgs.</dd>

</dl>

### Flow

diagrams here


## Register your Okta Aerial API client



## Authenticate with Okta Aerial


## Create a new Org


## Link the Org to the Aerial account

### Use `orgId`


### Use `domain`


### Response example


## Enable products in the Org


### Request example


### Response example


## Configure the Org

#### Request example


## Manage an Org's status


### Request example


### Response example


### List the configured Products

### Response example


## Enable a Product in an Org

### Request example

### Response example


## Disable a Product from an Org

### Request example

### Response example



## See also/next
