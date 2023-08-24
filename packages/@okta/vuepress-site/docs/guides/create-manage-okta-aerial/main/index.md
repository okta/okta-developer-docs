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

<!--
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
-->


## Register an Okta Aerial API client

Use an Aerial API client to add orgs to the Aerial account and to modify products.

Only a super admin in your Aerial admin org can grant scopes to the client. You only need to configure scopes once per API client.

To register a new Okta Aerial API client:

1. In your Aerial admin org, create an API client:
  1. In the **Admin Console**, go to **Applications** > **Applications**, and then click **Create App Integration**.
  1. Select **API Services** as the sign-in method, and click **Next**.
  1. Enter a name for your client and click **Save**.
1. Configure the signing keys for the client:
  1. In the **Client Credentials** section of the **General** tab, click **Edit** to change the client authentication method.
  1. Select **Public key/Private key** as the client authentication method.
  1. Choose either **Save keys in Okta** or **Use a URL to fetch keys dynamically**:
    - If you want to save keys in Okta, click **Add key**.
    - If you want to use a URL to fetch keys dynamically, you need to provide a URL that returns the [JWKS documents](https://www.rfc-editor.org/rfc/rfc7517#section-5).
1. Grant scopes to the client:
  1. Select the **Okta API Scopes** tab.
  1. To access Okta Aerial, click **Grant** on the following scopes:
    - `okta.accounts.manage`: read/write operations
    - `okta.accounts.read`: read-only operations

## Authenticate with Okta Aerial

To authenticate with Okta Aerial, a client obtains an access token from the Aerial admin org. See [Implement OAuth for Okta with a service app](/docs/guides/implement-oauth-for-okta-serviceapp/main/#get-an-access-token) for more information.

1. Create a [JWT assertion](/docs/guides/implement-oauth-for-okta-serviceapp/main/#create-and-sign-the-jwt) and use it to make a [token request](/docs/guides/implement-oauth-for-okta-serviceapp/main/#create-and-sign-the-jwt) to the Aerial admin org. The Aerial admin org returns the access token:
```bash
curl --location --request POST 'https://${adminOrgDomain}/oauth2/v1/token' \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'grant_type=client_credentials' \
    --data-urlencode 'scope=okta.accounts.manage' \
    --data-urlencode 'client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer' \
    --data-urlencode 'client_assertion=${jwt_assertion}'
```
1. Add the access token to the Authorization header of Okta Aerial API requests:
```bash
Authorization: Bearer ${access_token}
```




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
