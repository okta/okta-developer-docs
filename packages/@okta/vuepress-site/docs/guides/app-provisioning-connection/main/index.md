---
title: Set up an app provisioning connection
meta:
  - name: description
    content: Configure and enable an app provisioning connection with the Okta API
layout: Guides
---

This guide shows you how to use the Okta API to configure and enable an Okta provisioning connection with a supported third-party app integration.

---

**Learning outcomes**

* Learn how to enable a token-based or OAuth 2.0-based provisioning connection for a supported app integration using the Okta API
* Learn how to configure provisioning features for a supported app integration using the Okta API

**What you need**

* An Okta org
* An Okta-supported provisioning app integration that you added in your Okta org
* Postman (if you want to follow this guide and test the Okta APIs)

---

## Overview

You can enable and configure app provisioning connections for supported integrations using Okta APIs. This operation was only available in the Admin Console before Okta provided API support for provisioning connections. See [Configure provisioning for an app integration](https://help.okta.com/okta_help.htm?type=oie&id=ext_prov_lcm_prov_app) in the product documentation.

Okta supports token-based or OAuth 2.0-based authentication for the provisioning connections. The following provisioning apps support specific connection authentication types.

| Connection authentication | <div style="width:300px">Apps supported</div> | Description |
| ------------------------- | -------------- | ----------- |
| Token | Okta Org2Org (`okta_org2org`)<br>Zscaler 2.0 (`zscalerbyz`) | The provisioning API connection is based on bearer token authentication. For example, with an API key. |
| OAuth 2.0 | Google Workspace (`google`)<br>Microsoft Office 365 (`office365`)<br>Okta Org2Org (`okta_org2org`)<br>Slack (`slack`)<br>Zoom (`zoomus`) | The provisioning API connection is based on OAuth 2.0 authentication. |

## Token-based provisioning connection

Okta supports token-based provisioning connection for the following apps:

* Okta Org2Org (`org2org`)
* Zscaler 2.0 (`zscalerbyz`)

### Enable a token-based connection for your app

After you create your app integration in Okta, configure the provisioning connection and features with the following steps.

> **Note:** The API operations in these steps correspond to the configuration in the **Provisioning** tab of your app integration in the Admin Console. For example, see [Okta Org2Org configuration](https://help.okta.com/okta_help.htm?type=oie&id=ext-org2org-intg).

1. [Set the default Provisioning Connection](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationConnections/#tag/ApplicationConnections/operation/updateDefaultProvisioningConnectionForApplication) for your app to use the Token authentication scheme. You can activate the connection simultaneously with the activate query parameter.

    In this `zscalerbyz` app example, `{yourZscalerToken}` is the API token you obtained from your Zscaler 2.0 app.

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

    In this `okta_org2org` app example, `{yourTargetOrgToken}` is the API token you obtained from your target Okta org.

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

2. [Configure the provisioning features for your app](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationFeatures/#tag/ApplicationFeatures/operation/updateFeatureForApplication): INBOUND_PROVISIONING or USER_PROVISIONING.

    * INBOUND_PROVISIONING feature: For token-based connections, only the Org2Org (`okta_org2org`) app supports this feature. INBOUND_PROVISIONING is similar to the app **Provisioning** > **To Okta** provisioning setting in the Admin Console, where user profiles are imported from the third-party app into Okta. You can schedule user import and configure rules for [user creation and matching](https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-edit-app-provisioning.htm).

    * USER_PROVISIONING feature: For token-based connections, both the Okta Org2Org (`okta_org2org`) and Zscaler 2.0 (`zscalerbyz`) apps support this feature. USER_PROVISIONING is similar to the app **Provisioning** > **To App** provisioning setting in the Admin Console, where [user profiles are pushed](https://help.okta.com/okta_help.htm?type=oie&id=ext_Using_Selective_Profile_Push) from Okta to the third-party app. You can configure rules for creating users, deactivating users, and syncing passwords.

For request and response examples, see the last step to configure the provisioning feature in [Enable OAuth 2.0-based connection for your app](#enable-oauth-2-0-based-connection-for-your-app).

## OAuth 2.0-based provisioning connection

Okta supports a two-legged OAuth 2.0 flow provisioning connection only for the Okta Org2Org app (`org2org`) in a multi-tenant deployment. See [Secure API connections between orgs with OAuth 2.0](/docs/guides/secure-oauth-between-orgs/main/) for enabling and configuring the Org2Org provisioning connection.

A three-legged OAuth 2.0 flow is used to set up the provisioning connection where you need the resource owner's consent to grant access to the third-party app for provisioning.
The following app integrations support the OAuth 2.0 flow with granted consent:

* Google Workspace (`google`)
* Microsoft Office 365 (`office365`)
* Slack (`slack`)
* Zoom (`zoomus`)

### Enable an OAuth 2.0-based connection for your app

After you create your app integration in Okta, configure the provisioning connection and features with the following steps.

> **Note:** The API operations in these steps correspond to the configuration in the **Provisioning** tab of your app integration in the Admin Console. For example, see [Google Workspace provisioning configuration](https://help.okta.com/okta_help.htm?type=oie&id=ext_google-provisioning).

1. [Set the default Provisioning Connection](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationConnections/#tag/ApplicationConnections/operation/updateDefaultProvisioningConnectionForApplication) for your app to use the OAuth 2.0 authentication scheme.

    `google` app example:

    ```bash
    curl -i -X POST \
      'https://{yourOktaDomain}/api/v1/apps/{appId}/connections/default' \
      -H 'Authorization: Bearer {yourOktaAccessToken}' \
      -H 'Content-Type: application/json' \
      -d '{
        "profile": {
          "authScheme": "OAUTH2"
        }
      }'
    ```

    > **Note:** The bearer token (`{yourOktaAccessToken}`) in the header of this example is your token to access Okta APIs. See [Okta API authentication](/docs/reference/core-okta-api/#authentication).

    `office365` app example:

    ```bash
    curl -i -X POST \
      'https://{yourOktaDomain}/api/v1/apps/{appId}/connections/default' \
      -H 'Authorization: Bearer {yourOktaAccessToken}' \
      -H 'Content-Type: application/json' \
      -d '{
        "profile": {
          "authScheme": "OAUTH2",
          "settings": {
              "adminUsername": "{msUsername}",
              "adminPassword": "{userPwd}"
          }
        }
      }'
    ```

    > **Note:** The `profile` payload in the request depends on the provisioning app. Some apps require extra properties to set the OAuth 2.0 connection.

    The [response](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationConnections/#tag/ApplicationConnections/operation/updateDefaultProvisioningConnectionForApplication!c=201&path=0/_links/authorize&t=response) from this request provides a link to authorize the connection in the `_links.authorize.href` property.

    ```json
    {
      "status": "DISABLED",
      "profile": {
          "authScheme": "OAUTH2"
      },
      "_links": {
          "activate": {
              "href": "https://{yourOktaDomain}/api/v1/apps/{appId}/connections/default/lifecycle/activate",
              "hints": {
                  "allow": [
                      "POST"
                  ]
              }
          },
          "self": {
              "href": "https://{yourOktaDomain}/api/v1/apps/{appId}/connections/default",
              "hints": {
                  "allow": [
                      "POST",
                      "GET"
                  ]
              }
          },
          "authorize": {
              "href": "https://{yourCallbackDomain}/oauth/authorize?scope=admin&response_type=code&state={stateString}&client_id={clientId}&redirect_uri={redirectURI}",
              "hints": {
                  "allow": [
                      "GET"
                  ],
                  "guidance": [
                      "Specifies the URI to invoke in a browser for granting scope consent required to complete the OAuth 2.0 connection."
                  ]
              }
          }
      }
    }
    ```

1. Make a GET request to the endpoint provided in the `authorize` link. This is typically done through a browser to invoke the OAuth 2.0 consent flow, where you must sign in to your third-party app and grant the consent.

    For example:

    ```bash
      curl -i -X GET \ 'https://{yourCallbackDomain}/oauth/authorize?scope=admin&response_type=code&state={stateString}&client_id={clientId}&redirect_uri={redirectURI} '
    ```

    After you finish the consent flow successfully, the third-party app returns a callback to Okta, which validates the response and then issues a URL (`continue_oauth_flow_url`) to complete the OAuth 2.0 flow.

    Here's an example of the third-party app response after consent is provided:

    ```json
    {
      "continue_oauth_flow_url": {
        "href": "https://{yourOktaDomain}/api/v1/apps/{appName}/{appId}/oauth2/callback?code={uniqueCode}&state={stateString}",
        "method": "POST"
      }
    }
    ```

1. Make a POST request to the `continue_oauth_flow_url` URL to complete the OAuth 2.0 flow.

    For example:

    ```bash
    curl -i -X POST \ 'https://{yourOktaDomain}/api/v1/apps/{appName}/{appId}/oauth2/callback?code={uniiqueCode}&state={stateString} '
      -H 'Authorization: Bearer {yourOktaAccessToken}'
    ```

    A `204 No content` response is returned after the OAuth 2.0 provisioning connection is set up. This means Okta obtained the OAuth 2.0 bearer token to access the third-party app for provisioning users.

    > **Note:** The bearer token (`{yourOktaAccessToken}`) in the header of this example is your token to access Okta APIs. See [Okta API authentication](/docs/reference/core-okta-api/#authentication). The example request with the `code` and `state` parameters allows Okta to obtain another bearer token from the third-party app for the provisioning connection.

1. Activate the connection in Okta after the provisioning connection is configured with the saved token:

    ```bash
    curl -i -X POST \
      'https://{yourOktaDomain}/api/v1/apps/{appId}/connections/default/lifecycle/activate' \
      -H 'Authorization: Bearer {yourOktaAccessToken}'
    ```

1. [Configure the provisioning feature for your app](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationFeatures/#tag/ApplicationFeatures/operation/updateFeatureForApplication): INBOUND_PROVISIONING or USER_PROVISIONING.

    * INBOUND_PROVISIONING feature: This feature is similar to the app **Provisioning** > **To Okta** provisioning setting in the Admin Console, where user profiles are imported from the third-party app into Okta. You can schedule user import and configure rules for [user creation and matching](https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-edit-app-provisioning.htm).

      For example:

      ```bash
      curl -i -X PUT \
        'https://{yourOktaDomain}/api/v1/apps/{appId}/features/INBOUND_PROVISIONING' \
        -H 'Authorization: Bearer {yourOktaAccessToken}' \
        -H 'Content-Type: application/json' \
        -d '{
                  "importSettings": {
                      "username": {
                          "userNameFormat": "CUSTOM",
                          "userNameExpression": "source.userName"
                      },
                      "schedule": {
                          "status": "ENABLED",
                          "fullImport": {
                              "expression": "0 */4 * * *",
                              "timeZone": "America/New_York"
                          },
                          "incrementalImport": {
                          }
                      }
                  },
                  "importRules": {
                      "userCreateAndMatch": {
                          "exactMatchCriteria": "USERNAME",
                          "allowPartialMatch": false,
                          "autoConfirmPartialMatch": false,
                          "autoConfirmExactMatch": false,
                          "autoConfirmNewUsers": false,
                          "autoActivateNewUsers": false
                      }
                  }
          }'
      ```

    * USER_PROVISIONING feature: This feature is similar to the app **Provisioning** > **To App** provisioning setting in the Admin Console, where [user profiles are pushed](https://help.okta.com/okta_help.htm?type=oie&id=ext_Using_Selective_Profile_Push) from Okta to the third-party app. You can configure rules for creating users, deactivating users, and syncing passwords.

      For example:

      ```bash
      curl -i -X PUT \
        'https://{yourOktaDomain}/api/v1/apps/{appId}/features/USER_PROVISIONING' \
        -H 'Authorization: Bearer {yourOktaAccessToken}' \
        -H 'Content-Type: application/json' \
        -d '{
            "create": {
              "lifecycleCreate": {
                  "status": "ENABLED"
              }
            },
            "update": {
                "lifecycleDeactivate": {
                    "status": "ENABLED"
                },
                "profile":{
                    "status": "ENABLED"
                },
                "password":{
                    "status": "ENABLED",
                    "seed": "RANDOM",
                    "change": "CYCLE"
                }
            }
        }
      ```
