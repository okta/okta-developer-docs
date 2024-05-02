---
title: Manage orgs with Okta Aerial
layout: Guides
---

This guide explains how to add orgs to your Okta Aerial account and manage Aerial org settings.

> **Note:** Access to Okta Aerial requires an additional product to be present. Ensure that your Okta account team gives you access to the Okta Aerial API.

---

#### Learning outcomes

- Authenticate an Aerial API client with Okta Aerial.
- Add an org to your Aerial account.
- Enable products in the Aerial linked org.
- Configure the Aerial org.

#### What you need

- An Okta Aerial account
- A parent org
- Access to the Org creator API
- Access to the Okta Aerial API

#### Sample code

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

| Term                                                           | Definition                                                                    |
|----------------------------------------------------------------|--------------------------------------------------------------------------------|
| Aerial account              | The management layer around multiple orgs within Okta. The Aerial account lives outside of your orgs and can manage any production or preview org linked to the Aerial account. |
| Aerial org        | Holds the [authorization server](/docs/concepts/auth-servers/) for all Aerial API actions in any org in the Aerial account. Choose one org to permanently serve as the Aerial Org. <br/>[Super admins](https://help.okta.com/okta_help.htm?type=oie&id=ext_superadmin) can create API clients in the Aerial Org to access the Aerial account. The Aerial Org also contains all [System Log](https://help.okta.com/okta_help.htm?type=oie&id=ext_Reports_SysLog) events associated with Okta Aerial actions. |
| Products       | Okta-determined sets of features. With the Okta Aerial API, you can view subscribed products for an Aerial account and enable a subset of products to orgs. |
| Features | Distinct pieces of functionality. Features are bundled within products but may also be offered separately, for example, Early Access features. |

### Aerial sandbox and production environments

Okta provides the following environments to use with your Aerial account:

- **Sandbox**: Only connected to OP3 cells. Use for scale testing and repetitive testing.

  `https://aerial-sandbox.okta.com`

- **Production**: Connected to `okta.com` and `okta.preview.com`. Use to explore the Aerial API or test net-new development. Link a preview org to your production instance.

  `https://aerial-apac.okta.com`

See [Link the org to the Aerial account](#link-the-org-to-the-aerial-account).

### Summary of steps

Follow these steps to create and configure new orgs in your Aerial account:

1. [Authenticate with Okta Aerial](#authenticate-with-okta-aerial): Configure an API client in the Aerial org to call the Okta Aerial API.
2. [Create and configure a child org](#create-a-child-org): Create a child org based on the parent org using the Org creator API.
3. [Add the org to the Aerial account](#add-the-org-to-the-aerial-account): Link the org to the Aerial account using the Aerial API.
4. [Enable products in the org](#enable-products-in-the-org): Enable products in the Org using the Aerial API.
5. [Configure the org](#configure-the-org): Configure the org using Okta objects.

You can also [Deactivate an org](#deactivate-an-org).

<div class="full">

![Okta Aerial - summary of steps](/img/aerial-full-flow.png)

<!--
Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4402-33036&mode=design&t=mlPc1k2amETXHteN-4  aerial-full-flow
-->

</div>

## Register an Okta Aerial API client

Use an Aerial API client to add orgs to the Aerial account and to modify products.

Only a super admin in your Aerial org can grant scopes to the client. Configure scopes once per API client.

In your Aerial org, create an API client:

1. In the **Admin Console**, go to **Applications** > **Applications**, and then click **Create App Integration**.
2. Select **API Services** as the sign-in method, and click **Next**.
3. Enter a name for your client and click **Save**.

Configure the signing keys for the client:

1. In the **Client Credentials** section of the **General** tab, click **Edit** to change the client authentication method.
2. Select **Public key/Private key** as the client authentication method.
3. Choose either **Save keys in Okta** or **Use a URL to fetch keys dynamically**:
   - If you want to save keys in Okta, click **Add key**.
   - If you want to use a URL to fetch keys dynamically, you need to provide a URL that returns the JWKS documents. See [Client secret rotation and key management](/docs/guides/client-secret-rotation-key/main/).

Grant scopes to the client:

1. Select the **Okta API Scopes** tab.
2. To access Okta Aerial, click **Grant** on the following scopes:
  - `okta.accounts.manage`: read/write operations
  - `okta.accounts.read`: read-only operations

## Authenticate with Okta Aerial

To authenticate with Okta Aerial, a client obtains an access token from the Aerial org. See [Implement OAuth for Okta with a service app](/docs/guides/implement-oauth-for-okta-serviceapp/main/#get-an-access-token).

> **Note:** [Demonstrating Proof-of-Possession (DPoP)](https://datatracker.ietf.org/doc/html/rfc9449) is supported but not required. See [Configure OAuth 2.0 Demonstrating Proof-of-Possession](https://developer.okta.com/docs/guides/dpop/main/).

Create a [JWT assertion](/docs/guides/implement-oauth-for-okta-serviceapp/main/#create-and-sign-the-jwt) and use it to make a [token request](/docs/guides/implement-oauth-for-okta-serviceapp/main/#create-and-sign-the-jwt) to the Aerial org.

```bash
curl --location --request POST 'https://${aerialOrgDomain}/oauth2/v1/token' \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'grant_type=client_credentials' \
    --data-urlencode 'scope=okta.accounts.manage' \
    --data-urlencode 'client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer' \
    --data-urlencode 'client_assertion=${jwt_assertion}'
```

The Aerial org returns the access token.

Add the access token to the Authorization header of Okta Aerial API requests:

```bash
Authorization: Bearer ${access_token}
```


<!-- our OAuth docs for service apps rely on Postman for this step. need something in the interim until Postman is ready -->

## Create a child org

Create a child org of the parent org using the Org creator API. This creates a child org with features synced from the parent org. In the API response, you receive an API token tied to the super admin. Use the token to provision more resources on the child org like policies, apps, or groups.

This isn't the token that's used for Okta Aerial. <!-- See the [Org creator API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OrgCreation/). --> The API token that the Org creator API creates has the same automatic expiration and deactivation as API tokens created using the [Admin Console](/docs/guides/create-an-api-token/main/#token-expiration-and-deactivation).

However, the Org creator API token doesn’t appear in the Admin Console. You can’t use the Admin Console to revoke the token. If you deactivate the super admin (the first admin created during org creation), the token is deactivated.

If you lose this token or it expires, you must sign in to the Admin Console as a super admin and [create a token](/docs/guides/create-an-api-token/main/#create-the-token).


## Add the org to the Aerial account

To enable products in an org, add the org to your Aerial account. You can only add orgs to your Aerial account that are associated with your Okta contracts.

Link the org to Okta Aerial by sending a `POST` request to the `/api/va/orgs` endpoint of the Aerial API. The response contains the Org object including the `orgId`. Use the `orgId` to enable products.

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

Note: This API is still in development. We update the documentation with more accurate examples as we progress in development. -->

The ID of this record is the `orgId`. Use it in the URL for enabling products:

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

## Enable products in the org

<ApiOperation method="put" url="https://aerial-{region}/{accountId}/api/v1/orgs/{orgId}/products" />

Include the products that you want to enable in an array in the request body.

Any already-enabled products not found in the array of product IDs are disabled from the org. See [List all enabled Products for an Org](https://developer.okta.com/docs/api/openapi/aerial/aerial/tag/Orgs/#tag/Orgs/operation/getEnabledProducts).

> **Note:** Since Okta ignores the `name` property, you can include it to simplify the client implementation.

<div class="three-quarter">

![Enable a product in an org](/img/aerial-enable-product.png)

<!--
Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4410-2869&mode=design&t=mlPc1k2amETXHteN-11  aerial-enable-product
-->

<!--
Though not used in this doc, we have an image for disabling products in the org
Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4410-2937&mode=design&t=mlPc1k2amETXHteN-11  aerial-remove-product
-->

</div>

### Request and response examples

The request and response are the same:

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

## Configure the org

To pre-configure groups, apps, and policies in each org, the API client needs the following:

- The domain of the org
- The API token returned by the Org creator API

You can also use OAuth 2.0 to interact with Okta APIs. See [Implement OAuth for Okta](https://developer.okta.com/docs/guides/implement-oauth-for-okta/main/).

#### Request example

The following example calls the [Apps API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/#tag/Application/operation/createApplication). See [Okta Admin Management](https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/) for more Okta APIs.

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

## Deactivate an org

<ApiOperation method="put" url="https://aerial-{region}/{accountId}/api/v1/orgs/{orgId}/status" />

Deactivate an org by calling the `/status` endpoint. Deactivated orgs don’t count toward billing. Users in the org can’t use Okta services or sign in to Okta.

<div class="three-quarter">

![Deactivate an org](/img/aerial-change-status.png)

<!--
Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4410-2193&mode=design&t=mlPc1k2amETXHteN-11  aerial-change-status
-->

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

## See also

- [Okta Aerial API documentation](https://developer.okta.com/docs/api/openapi/aerial/guides/overview/)
- [Create an API token](/docs/guides/create-an-api-token/main/)
