---
title: Securing API connections between orgs with OAuth 2.0
excerpt: Learn how to synchronize users and groups between orgs with OAuth 2.0 in a multi-tenancy solution.
layout: Guides
---

This guide explains how to securely set up Okta hub and spoke orgs to synchronize users and groups by using OAuth 2.0 in a [multi-tenant solution](/docs/concepts/multi-tenancy/). The connection between Okta orgs can be set up for API access to specific scoped data using the OAuth 2.0 client credential flow for the [Org2Org integration](https://help.okta.com/en/prod/Content/Topics/Provisioning/org2org/org2org-integrate.htm) app.

> **Note**: Currently, only the Okta API can be used to enable OAuth 2.0-based provisioning.
---

**Learning outcomes**

* Set up a multi-tenant hub and spoke Okta org configuration for provisioning by using the OAuth 2.0 client credential grant flow
* Configure hub Okta org with service apps for each spoke Okta org.
* Configure Org2Org app on each spoke Okta org.
* Configure and activate Org2Org provisioning on spoke Okta orgs.

**What you need**

* Multiple Okta orgs for your multi-tenant solution

---

## About using OAuth 2.0 for secure API connections in multi-tenant solutions

To secure API connections between orgs for a [multi-tenant solution](/docs/concepts/multi-tenancy/) that uses the hub and spoke model, Okta provides the OAuth 2.0 client credential flow using the Okta Org2Org integration as an OAuth 2.0 client. This enables Okta admins to push and match both users and groups from one Okta org to another. Previously, this integration only supported token-based access to the Okta API. Now the Org2Org integration can be configured to access the Okta API as an OAuth 2.0 client. This increases security by limiting the scope of access and providing a better mechanism to rotate credentials.

![Displays the service apps required in the hub org and the Org2Org apps required in the spoke org.](/img/multi-tenancy/multi-org-provisioning.svg "OAuth 2.0 connection configuration for hub and spoke org model")

In this OAuth 2.0 flow, the hub org acts as the resource server as well as the [authorization server](/docs/concepts/auth-servers/).  Each spoke org is represented by a [service app in the hub org for the OAuth 2.0 client credentials flow](/docs/guides/implement-oauth-for-okta-serviceapp/main/). At the spoke org level, you need to create an Org2Org app to represent the OAuth 2.0 client. The Okta Org2Org app automatically generates a JSON Web Key Set (JWKS)  used by the client to authenticate with the authorization server. For each Org2Org app, you need to extract the JWKS public key for each corresponding service app in the hub org. To limit access to the OAuth 2.0 clients, you can grant the hub org service app with allowed [OAuth 2.0 scopes](/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints).

After the Org2Org OAuth 2.0 connection is configured, you can start to test your connection and push user data from the spoke orgs to the hub org.

> **Note**: For a hub and spoke org model provisioning using API tokens instead of OAuth 2.0, see [Integrate Okta Org2Org with Okta ](https://help.okta.com/okta_help.htm?id=ext-org2org-intg).

## Hub and spoke connection configuration with OAuth 2.0

You can use OAuth 2.0 to push user and group information from a spoke org to a centralized hub org by performing the following configuration:

1. In each spoke org, [add a new instance of the Org2Org app integration](#add-an-org2org-app-integration-to-the-spoke-org).
2. In the hub org, [create an OAuth 2.0 service app](#create-an-oauth-2-0-service-app-in-the-hub-org] with `private_key_jwt` authentication method and JKWS public key of each Org2Org app in the spoke orgs. Grant [allowed scopes](/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints) to the hub org service app (the OAuth 2.0 client).
3. [Set and Activate Provisioning for Org2Org apps](#enable-provisioning-in-the-spoke-orgs-org2org-apps) from the Okta API.
4. [Assign users and groups to be pushed to the hub org](#assign-users-and-groups-in-the-spoke-org-org2org-apps).

### Add an Org2Org app integration to a spoke org

In the spoke org, where you want to push users and groups to the central hub org, you need to add an instance of the Org2Org app integration by using the [Okta Apps API](/docs/reference/api/apps/#add-basic-authentication-application). This generates an Org2Org app integration instance and the key certificates required to connect to the hub org.

As an Okta admin, make a `POST /api/v1/apps` request to the spoke org with [Okta Org2Org parameters](/docs/reference/api/apps/#add-okta-org2org-application):

| Parameter |  Description/Value   |
| --------- |  ------------- |
| `name`  |  `okta_org2org` |
| `label`  |  Specify a label for this Org2Org app integration. |
| `baseUrl`  |  Specify your hub org base URL. |
| `signOnMode`  |  You can set this parameter to any valid value, but if you specify `SAML_2_0`, the Org2Org app signing certificate appears in the Admin Console. |

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "okta_org2org",
  "label": "My spoke Org2Org App",
  "signOnMode": "SAML_2_0",
  "settings": {
    "app": {
        "baseUrl": "https://${yourHubOktaDomain}"
    }
  }
}' "https://${yourSpokeOktaDomain}/api/v1/apps"
```

From the response of your POST request, use the `id` property of the Org2Org app instance to [retrieve the key credentials](/docs/reference/api/apps/#list-key-credentials-for-application) generated for the app with the `GET /api/v1/apps/${id}/credentials/keys` request.

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/${yourOrg2OrgId}/credentials/keys"
```

##### Response example

```json
[
  {
    "created": "2015-12-10T18:56:23.000Z",
    "expiresAt": "2017-12-10T18:56:22.000Z",
    "x5c": [
      "MIIDqDCCApCgAwIBAgIGAVGNQFX5MA0 … eIBvPVjfRcxsJxXJ8jx70ATDskw=="
    ],
    "e": "AQAB",
    "n": "mkC6yAJVvFwUlmM9gKjb2d-YK5qHFt-mXSsb … n9pf8L2fK8d-FIbm4",
    "kty": "RSA",
    "use": "sig",
    "x5t#S256": "5GOpy9CQVtfvBmu2T8BHvpKE4OGtC3BuS046t7p9pps"
  },
  {
    "created": "2015-12-10T18:55:35.000Z",
    "expiresAt": "2045-01-23T02:15:23.000Z",
    "x5c": [
      "MIIDqDCCApCgAwIBAgIGAUsUko … llBooPPS3wYlNA=="
    ],
    "e": "AQAB",
    "n": "htbi5H5MN_oYaKcZ … hVagjTzo",
    "kty": "RSA",
    "use": "sig",
    "x5t#S256": "7CCyXWwKzH4P6PoBP91B1S_iIZVzuGffVnUXu-BTYQQ"
  }
]
```

> **Note**: The keys are truncated for brevity.

Save the returned key credentials for use in the hub org service app configuration.

For each spoke org that you have in your multi-tenant solution, you must create an Org2Org app instance and generate the key credentials that need to be configured in the hub org’s service app.

### Create an OAuth 2.0 service app in the hub org

 In the hub org, create an OAuth 2.0 service app by using the [Dynamic Client Registration API](/docs/reference/api/oauth-clients/). As an Okta admin, make a `POST /oauth2/v1/clients` request to the hub org with the following required parameters:

| Parameter |  Description/Value   |
| --------- |  ------------- |
| `client_name`  |  Specify a label for this service app to represent the OAuth 2.0 client. |
| `grant_types`  |  `client_credentials` |
| `jwks`  |  Specify the JSON Web Key Set from the spoke org’s Org2Org app integration. |
| `response_types`  |  `token` |
| `token_endpoint_auth_method`  |  `private_key_jwt` |
| `application_type`  |  `service` |

##### Request example

```bash
curl -X POST \
  -H 'Accept: application/json' \
  -H "Authorization: SSWS ${api_token}" \
  -H 'Content-Type: application/json' \
  -d ' {
    "client_name": "Spoke-i service app",
    "response_types": [
      "token"
    ],
    "grant_types": [
      "client_credentials"
    ],
    "token_endpoint_auth_method": "private_key_jwt",
    "application_type": "service",
    "jwks": {
              "keys": [
                {
                  "kty": "RSA",
                  "e":"AQAB",
                  "use": "sig",
                  "alg": "RS256",
                  "n": "u1J6f8lKQbHxDbCjwbXJzYHy61kODiM … 3KxyXdqwUxBlumlpQ_7CGGL
                }
              ]
            }
 }' "https://${yourHubOktaDomain}/oauth2/v1/clients"
```

From the response of your POST request, use the `client_id` property of the service app instance to grant the [allowed scopes](/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints) for the client with the `POST /api/v1/apps/${client_id}/grants` request.

> **Note**: Currently, both `okta.users.manage` and `okta.groups.manage` scopes are required for the service app configuration.

