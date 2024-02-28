---
title: Set up an app provisioning connection
meta:
  - name: description
    content: Configure and enable an app provisioning connection with the Okta API
layout: Guides
---

This guide shows you how to use the Okta API to configure and enable an Okta provisioning connection with a supported third-party app.

---

**Learning outcomes**

* Learn how to enable the provisioning connection for a supported provisioning app using the Okta API
* Learn to configure provisioning features for a supported provisioning app using the Okta API

**What you need**

* An Okta org
* An Okta-supported provisioning app integration that you added in Okta
* Postman (if you want to follow this guide and test the Okta APIs)

---

## Overview

You can enable and configure app provisioning connections for supported integrations using Okta APIs. This operation was only available in the Admin Console before Okta provided API support for provisioning connections. See [Configure provisioning for an app integration](https://help.okta.com/okta_help.htm?type=oie&id=ext_prov_lcm_prov_app) in the Product documentation.

Okta supports token-based or OAuth 2.0-based authentication for the provisioning connections. The following connection authentication types are supported by specific provisioning apps.

| Connection authentication | <div style="width:300px">Apps supported</div> | Description |
| ------------------------- | -------------- | ----------- |
| Token | Okta Org2Org (`okta_org2org`)<br>Zscaler 2.0 (`zscalerbyz`) | The provisioning API connection is based on bearer token authentication. For example, with an API key. |
| OAuth 2.0 | Google Workspace (`google`)<br>Microsoft Office 365 (`office365`)<br>Okta Org2Org (`okta_org2org`)<br>Slack (`slack`)<br>Zoom (`zoomus`) | The provisioning API connection is based on OAuth 2.0 authentication. |

## Token-based provisioning connection

Okta supports token-based provisioning connection for the following apps:

* Okta Org2Org (`org2org`)
* Zscaler 2.0 (`zscalerbyz`)

### Enable Token-based connection for your app

After you create your app integration in Okta, configure the provisioning connection and features with the following steps.

> **Note:** The API operations in these steps correspond to the configuration in the **Provisioning** tab of your app integration in the Admin Console. For example, see [Okta Org2Org configuration](https://help.okta.com/okta_help.htm?type=oie&id=ext-org2org-intg).

1. [Set the default Provisioning Connection](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationConnections/#tag/ApplicationConnections/operation/updateDefaultProvisioningConnectionForApplication) for your app to use the Token authentication scheme. You can activate the connection simultaneously with the activate query parameter.

    `zscalerbyz` app example:

    ```bash
    curl -i -X POST \
      'https://{yourOktaDomain}/api/v1/apps/{appId}/connections/default?activate=TRUE' \
      -H 'Authorization: Bearer {yourOktaAccessToken}' \
      -H 'Content-Type: application/json' \
      -d '{
        "baseUrl": "https://scim.zscalerbeta.net/1111111/222/scim",
        "profile": {
          "authScheme": "TOKEN",
          "token": "{yourZscalerToken}"
        }
      }'
    ```

    > **Note:** The bearer token (`{yourOktaAccessToken}`) in the header of this example is your token to access Okta APIs. See [Okta API authentication](/docs/reference/core-okta-api/#authentication).

    `okta_org2org` app example:

    ```bash
    curl -i -X POST \
    'https://{yourOktaDomain}/api/v1/apps/{appId}/connections/default?activate=TRUE' \
    -H 'Authorization: Bearer {yourOktaAccessToken}' \
    -H 'Content-Type: application/json' \
    -d '{
      "profile": {
        "authScheme": "TOKEN",
        "token": "{yourTargetOrgToken}"
      }
    }'

    ```

2. Configure the provisioning feature for your app: `INBOUND_PROVISIONING` or `USER_PROVISIONING`.

    * `INBOUND_PROVISIONING` feature: For token-based connections, only the Org2Org (okta_org2org) app supports this feature. INBOUND_PROVISIONING is similar to the app Provisioning > To Okta provisioning setting in the Admin Console, where user profiles are imported from the third-party app into Okta. You can schedule user import and configure rules for user creation and matching.
    * `USER_PROVISIONING` feature: For token-based connections, both the Org2Org (okta_org2org) and Zscaler (zscalerbyz) apps support this feature. This feature is similar to the app Provisioning > To App provisioning setting in the Admin Console, where user profiles are pushed from Okta to the third-party app. You can configure rules for creating users, deactivating users, and syncing passwords.
For request and response examples, see the step to configure the provisioning feature in Enable OAuth 2.0-based connection for your app.


## OAuth 2.0-based provisioning connection

Okta supports a two-legged OAuth 2.0 flow provisioning connection only for the Org2Org app (`org2org`) in an Okta multi-tenant deployment. See [Secure API connections between orgs with OAuth 2.0](docs/guides/secure-oauth-between-orgs/main/) for enabling and configuring the Org2Org provisioning connection.

A three-legged OAuth 2.0 flow is used to set up the provisioning connection where you need the resource owner's consent to grant access to the third-party app for provisioning.
The following app integrations support the OAuth 2.0 flow with granted consent:

* Google Workspace (`google`)
* Microsoft Office 365 (`office365`)
* Slack (`slack`)
* Zoom (`zoomus`)
