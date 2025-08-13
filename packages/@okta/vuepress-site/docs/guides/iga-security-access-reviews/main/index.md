---
title: Initiate a security access review
meta:
  - name: description
    content: How to initiate a security access review with the Okta Identity Governance APIs
layout: Guides
---

This guide shows you how to set up Okta with Identity Goverance to intiate a security access review. This task available through the Admin Console.

---

#### Learning outcomes

* Learn how to set up Okta to access Security Access Review APIs.
* Learn how to initiate a security access review using the Okta Identity Goverance > Security Access Review APIs.

#### What you need

* An Okta org subscribed to Okta Identity Governance
* Postman (if you want to follow this guide and test the Okta Identity Goverance APIs)

---

## Overview

- Security access reviews are triggered via ITP Workflows or through the API
- Admins can view completed security access reviews through the **Identity Governance** > **Access Certifications** > **Security access reviews** tab.

- Security access reviews are user-centric, resource-centric... see help doc
- you can act on security access reviews

This document shows you how to intiate a security access review through the Okta Identity Governance APIs.


1. You need to create a custom role that has permission to access the security access review
1. You need to create API service app to access for API access with the custom role or assign the custom role to the API user.
1. Trigger the SAR
1. Next steps: There are several endpoints for you to manage and act upon the security access review (list all the endpoints, and operation examples) - this is nice to have!


### Enable a token-based connection for your app

After you create your app integration in Okta, configure the provisioning connection and features with the following steps.

> **Note:** The API operations in these steps correspond to the configuration in the **Provisioning** tab of your app integration in the Admin Console. For example, see [Okta Org2Org configuration](https://help.okta.com/okta_help.htm?type=oie&id=ext-org2org-intg).

1. Set the default provisioning connection for your app to use the token authentication scheme. See [Update the default provisioning connection](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationConnections/#tag/ApplicationConnections/operation/updateDefaultProvisioningConnectionForApplication) API. You can activate the connection simultaneously with the `activate` query parameter.

    In this Zscaler 2.0 (`zscalerbyz`) app example, `{yourZscalerToken}` is the API token you obtained from your Zscaler 2.0 app.

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

    > **Note:** The bearer token (`{yourOktaAccessToken}`) in the header of this example is your token to access Okta APIs. See [Okta Management authentication](https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/#authentication) and [Open ID Connect & OAuth 2.0](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/).

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

2. Configure INBOUND_PROVISIONING and/or USER_PROVISIONING features for your app. See [Update a feature](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationFeatures/#tag/ApplicationFeatures/operation/updateFeatureForApplication) API.

    * INBOUND_PROVISIONING feature: For token-based connections, only the Okta Org2Org (`okta_org2org`) app supports this feature. INBOUND_PROVISIONING is similar to the app **Provisioning** > **To Okta** setting in the Admin Console, where user profiles are imported from the third-party app into Okta. You can schedule user import and configure rules for [user creation and matching](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-edit-app-provisioning).

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

    * USER_PROVISIONING feature: For token-based connections, both the Okta Org2Org (`okta_org2org`) and Zscaler 2.0 (`zscalerbyz`) apps support this feature. USER_PROVISIONING is similar to the app **Provisioning** > **To App** setting in the Admin Console, where [user profiles are pushed](https://help.okta.com/okta_help.htm?type=oie&id=ext_Using_Selective_Profile_Push) from Okta to the third-party app. You can configure rules for creating users, deactivating users, and syncing passwords.

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

1. Set the default provisioning connection for your app to use the OAuth 2.0 authentication scheme. See [Update the default provisioning connection](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationConnections/#tag/ApplicationConnections/operation/updateDefaultProvisioningConnectionForApplication) API.

    Here’s a `google` app example:

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

    > **Note:** The bearer token (`{yourOktaAccessToken}`) in the header of this example is your token to access Okta APIs. See [OpenID Connect & OAuth 2.0](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/).

    In this `office365` app example, you need to specify Microsoft Office 365 admin user credentials in the `profile` payload.

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

    Here's an example of the response after consent is provided:

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

    > **Note:** The bearer token (`{yourOktaAccessToken}`) in the header of this example is your token to use to access Okta APIs. See [OpenID Connect & OAuth 2.0](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/). The example request with the `code` and `state` parameters allows Okta to obtain another bearer token from the third-party app for the provisioning connection.

1. Activate the connection in Okta after the provisioning connection is configured with the saved token:

    ```bash
    curl -i -X POST \
      'https://{yourOktaDomain}/api/v1/apps/{appId}/connections/default/lifecycle/activate' \
      -H 'Authorization: Bearer {yourOktaAccessToken}'
    ```

1. Configure INBOUND_PROVISIONING and/or USER_PROVISIONING features for your app. See [Update a feature](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationFeatures/#tag/ApplicationFeatures/operation/updateFeatureForApplication) API.

    * INBOUND_PROVISIONING feature: This feature is similar to the app **Provisioning** > **To Okta** setting in the Admin Console, where user profiles are imported from the third-party app into Okta. You can schedule user import and configure rules for [user creation and matching](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-edit-app-provisioning).

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

    * USER_PROVISIONING feature: This feature is similar to the app **Provisioning** > **To App** setting in the Admin Console, where [user profiles are pushed](https://help.okta.com/okta_help.htm?type=oie&id=ext_Using_Selective_Profile_Push) from Okta to the third-party app. You can configure rules for creating users, deactivating users, and syncing passwords.

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
