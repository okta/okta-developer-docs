---
title: Manage orgs with Okta Aerial
excerpt: Learn how to create and manage orgs added to your company's Okta Aerial account
layout: Guides
sections:
  - main
---

This guide explains how to add orgs to your Okta Aerial account and manage Aerial org settings.

> **Note:** Access to Okta Aerial requires an additional product to be present. Ensure that your Okta account team gives you access to the Okta Aerial API.

---

**Learning outcomes**

- Authenticate an Aerial API client with Okta Aerial.
- Add an org to your Aerial account.
- Enable products in the Aerial linked org.
- Configure the Aerial org.

**What you need**

- An Okta Aerial account
- A parent org
- Access to the Org creator API
- Access to the Okta Aerial API

**Sample code**

Use the [Okta Aerial API](https://developer.okta.com/docs/api/openapi/aerial/guides/overview/)

---

## About Okta Aerial

Okta Aerial is an administration service that enables multi-org management. Use the Aerial API to:

- Add orgs to the Aerial account.
- Activate and deactivate orgs.
- View subscribed products.
- Enable products in specific orgs.

### Key terms

Okta Aerial introduces a few terms to the Okta ecosystem:

<dl>
<dt><strong>Aerial account</strong></dt>
<dd>The management layer around multiple orgs within Okta. The Aerial account lives outside of your orgs and can manage any production or preview org linked to the Aerial account.
</dd>
</br>
<dt><strong>Aerial org</strong></dt>
<dd>Holds the authorization server for all Aerial API actions in any org in the Aerial account. Choose one org to permanently serve as the Aerial Org. <br/>Super admins can create API clients in the Aerial Org to access the Aerial account. The Aerial Org also contains all System Log events associated with Okta Aerial actions.</dd>
</br>
<dt><strong>Products</strong></dt>
<dd>Okta-determined sets of features. With the Okta Aerial API, you can view subscribed products for an Aerial account and enable a subset of products to orgs.</dd>
</br>
<dt><strong>Features</strong></dt>
<dd>Distinct pieces of functionality. Features are bundled within products but may also be offered separately, for example, Early Access features.</dd>
</dl>

### Aerial sandbox and production environments

Okta provides the following environments to use with your Aerial account:

- **Sandbox**: Only connected to OP3 cells. Use for scale testing and repetitive testing.

  `https://aerial-sandbox.okta.com`

- **Production**:  Connected to `okta.com` and `okta.preview.com`. Use to explore the Aerial API or test net-new development. Link a preview org to your production instance.

  `https://aerial-apac.okta.com`

See [Link the new org to the Aerial account](#link-the-org-to-the-aerial-account).

### Summary of steps

Follow these steps to create and configure new orgs in your Aerial account:

1. [Authenticate with Okta Aerial](#authenticate-with-okta-aerial): Configure an API client in the Aerial org to call the Okta Aerial API.
1. [Create and configure a child org](#create-a-child-org): Create a child org based on the parent org using the Org creator API.
1. [Link the org to the Aerial account](#link-the-org-to-the-aerial-account): Link the org to the Aerial account using the Aerial API.
1. [Enable products in the org](#enable-products-in-the-org): Enable products in the Org using the Aerial API.
1. [Configure the org](#configure-the-org): Configure the org using Okta objects in the Aerial API.

You can also manage an org's status, and enable or disable products in an org:

- [Manage an org's status](#manage-an-orgs-status)
- [List the configured products in the org](#list-the-configured-products)
- [Enable a product in an org](#enable-a-product-in-an-org)
- [Remove a product from an org](#remove-a-product-from-an-org)

<div class="full">

![Okta Aerial - summary of steps](/img/aerial-full-flow.png)

</div>

## Register an Okta Aerial API client

Use an Aerial API client to add orgs to the Aerial account and to modify products.

Only a super admin in your Aerial org can grant scopes to the client. Configure scopes once per API client.

In your Aerial org, create an API client:

1. In the **Admin Console**, go to **Applications** > **Applications**, and then click **Create App Integration**.
1. Select **API Services** as the sign-in method, and click **Next**.
1. Enter a name for your client and click **Save**.

Configure the signing keys for the client:

1. In the **Client Credentials** section of the **General** tab, click **Edit** to change the client authentication method.
1. Select **Public key/Private key** as the client authentication method.
1. Choose either **Save keys in Okta** or **Use a URL to fetch keys dynamically**:
   - If you want to save keys in Okta, click **Add key**.
   - If you want to use a URL to fetch keys dynamically, you need to provide a URL that returns the [JWKS documents](https://www.rfc-editor.org/rfc/rfc7517#section-5).

Grant scopes to the client:

1. Select the **Okta API Scopes** tab.
1. To access Okta Aerial, click **Grant** on the following scopes:
  - `okta.accounts.manage`: read/write operations
  - `okta.accounts.read`: read-only operations

## Authenticate with Okta Aerial

To authenticate with Okta Aerial, a client obtains an access token from the Aerial org. See [Implement OAuth for Okta with a service app](/docs/guides/implement-oauth-for-okta-serviceapp/main/#get-an-access-token).

Create a [JWT assertion](/docs/guides/implement-oauth-for-okta-serviceapp/main/#create-and-sign-the-jwt) and use it to make a [token request](/docs/guides/implement-oauth-for-okta-serviceapp/main/#create-and-sign-the-jwt) to the Aerial org. The Aerial org returns the access token:

```bash
curl --location --request POST 'https://${aerialOrgDomain}/oauth2/v1/token' \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'grant_type=client_credentials' \
    --data-urlencode 'scope=okta.accounts.manage' \
    --data-urlencode 'client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer' \
    --data-urlencode 'client_assertion=${jwt_assertion}'
```

Add the access token to the Authorization header of Okta Aerial API requests:

```bash
Authorization: Bearer ${access_token}
```
<!-- our OAuth docs for service apps rely on Postman for this step. need something in the interim until Postman is ready -->

## Create a child org

Create a child org of the parent org using the Org creator API. This creates a child org with features synced from the parent org. In the API response, you receive an API token tied to the super admin. Use the token to provision more resources on the child org like policies, apps, or groups.

This isn't the token that is used for Okta Aerial. See the [Org creator API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgCreation/). The API token that the Org creator API creates has the same automatic expiration and deactivation as API tokens created using the [Admin Console](/docs/guides/create-an-api-token/main/#token-expiration-and-deactivation).

However, the Org creator API token doesn’t appear in the Admin Console. You can’t use the console to revoke the token. If you deactivate the super admin (the first admin created during org creation), the token is deactivated.

If you lose this token or it auto-expires, you must log in to the Admin Console as a Super Admin and [create a token](/docs/guides/create-an-api-token/main/#create-the-token).


## Link the Org to the Aerial account

To enable products in an org, add the org to your Aerial account. You can only add orgs to your Aerial account that are associated with your Okta contracts.

To link the org to Okta Aerial, send a `POST` request to the `/api/va/orgs` endpoint of the Aerial API. The response contains the Org object including the `orgId`. Use the `orgId` to enable products.

### Use `orgId`

<ApiOperation method="post" url="https://aerial-{region}/{accountId}/api/v1/orgs" />

```bash
Authorization: Bearer ${access_token}

{
  "orgId": "00oy0itaI2Yi7XGGE0g3",
  "cell": "OK1"
}
```

### Use `domain`

<ApiOperation method="post" url="https://aerial-{region}/{accountId}/api/v1/orgs" />

```bash
Authorization: Bearer ${access_token}

{
  "domain": "${yourOktaDomain}",
  "cell": "OK1"
}
```

### Response example

<!-- We have this note in the Google doc. What to do?

Note: this API is still in development. We will update the documentation with more accurate examples as we progress in development. -->

The id of this record is the `orgId` to use in the URL for enabling Products:

```json
{
  "accountId": "string",
  "name": "string",
  "region": "string",
  "cell": "string",
  "domain": "string",
  "status": "string",
  "createdDate": "string",
  "createdBy": "string",
  "id": "string"
}
```

## Enable products in the Org

<!-- should add a bit of concept content here -->

<ApiOperation method="put" url="https://aerial-{region}/{accountId}/api/v1/orgs/{orgId}/products" />

### Request and response example

```json
{
  "accountId": "string",
  "name": "string",
  "region": "string",
  "cell": "string",
  "domain": "string",
  "status": "string",
  "createdDate": "string",
  "createdBy": "string",
  "id": "string"
}
```

## Configure the Org

To pre-configure groups, apps, and policies in each org, the Aerial API client needs the following:

- The domain of the org
- The API token returned by the Org creator API

#### Request example

```bash
curl --location --request POST 'https://${newOrgDomain}/api/v1/apps \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "bookmark",
  "label": "Sample Bookmark App",
  "signOnMode": "BOOKMARK",
  "settings": {
    "app": {
      "requestIntegration": false,
      "url": "https://example.com/bookmark.htm"
    }
  }
}'
```

## Manage an Org's status

<ApiOperation method="put" url="https://aerial-{region}/{accountId}/api/v1/orgs/{orgId}/status" />

Deactivate an org by calling the `/status` endpoint. Deactivated orgs don’t count toward billing. Users in the org can’t use Okta’s services or sign-in to Okta.

<div class="three-quarter">

![Deactivate an Org](/img/aerial-change-status.png)

</div>

### Request example

```bash
{
   "status": "INACTIVE"
}
```

### Response example

```bash
{
  "id": "00o133mJ27DoonJz50g4",
  "status": "INACTIVE",
  ...
}
```

## List the configured Products

<ApiOperation method="get" url="https://aerial-{region}/{accountId}/api/v1/orgs/{orgId}/products" />

### Response example

```bash
[
  {
    "id": "P000052",
    "name": "IT Products - SSO"
  },
  {
    "id": "P000131",
    "name": "IT Products - MFA"
  }
]
```

## Enable a Product in an Org

<ApiOperation method="put" url="https://aerial-{region}/{accountId}/api/v1/orgs/{orgId}/products" />

Enables a product with ID P000139 in the org (IT Products - Lifecycle Management with 1 OIN App)

> **Note:** The `name` property is ignored, and can be included to simplify the client implementation.

<div class="three-quarter">

![Enable a Product in an Org](/img/aerial-enable-product.png)

</div>

### Request and response example

```json
[
  {
    "id": "P000052",
    "name": "IT Products - SSO"
  },
  {
    "id": "P000139",
    "name": "IT Products - MFA"
  },
  {
    "id": "P000131",
    "name": "IT Products - Lifecycle Management with 1 OIN App"
  }
]
```

## Remove a Product from an Org

<ApiOperation method="put" url="https://aerial-{region}/{accountId}/api/v1/orgs/{orgId}/products" />

Removes a product with ID P000139 from the org (IT Products - Lifecycle Management with 1 OIN App)

Any products not found in the array of product IDs are disabled from the org.

> **Note:** The `name` property is ignored, and can be included to simplify the client implementation.

<div class="three-quarter">

![Disable a Product in an Org](/img/aerial-remove-product.png)

</div>

### Request and response example

```json
[
  {
    "id": "P000052",
    "name": "IT Products - SSO"
  }
]
```

## See also

- [Okta Aerial API documentation]()
- [Org creation API documentation]()
- [Create an API token](/docs/guides/create-an-api-token/main/)
