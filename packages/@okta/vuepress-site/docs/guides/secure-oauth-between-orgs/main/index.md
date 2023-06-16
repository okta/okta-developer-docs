---
title: Secure API connections between orgs with OAuth 2.0
excerpt: Learn how to synchronize users and groups between orgs with OAuth 2.0 in a multi-tenancy solution.
layout: Guides
---

This guide explains how to securely set up Okta hub and spoke orgs to synchronize users and groups by using OAuth 2.0 in a [multi-tenant solution](/docs/concepts/multi-tenancy/). The connection between Okta orgs can be set up for API access to specific scoped data using the OAuth 2.0 client credential flow for the [Org2Org integration](https://help.okta.com/okta_help.htm?type=oie&id=ext-org2org-intg) app.

> **Note**: Currently, only the Okta API can be used to enable OAuth 2.0-based provisioning.
---

**Learning outcomes**

* Set up a multi-tenant hub and spoke Okta org provisioning configuration to use the OAuth 2.0 client credential grant flow.
* Configure the hub Okta org with service apps for each spoke Okta org.
* Configure an Org2Org app on each spoke Okta org.
* Configure and activate Org2Org provisioning on spoke Okta orgs.
* Rotate keys for the OAuth 2.0 connection.

**What you need**

* Multiple Okta orgs for your multi-tenant solution

---

## About using OAuth 2.0 for secure API connections in multi-tenant solutions

To secure API connections between orgs for a [multi-tenant solution](/docs/concepts/multi-tenancy/) that uses the hub and spoke model, Okta provides the OAuth 2.0 client credential flow using the Okta Org2Org integration as an OAuth 2.0 client. This enables Okta admins to push and match both users and groups from one Okta org to another. Previously, this integration only supported token-based access to the Okta API. Now the Org2Org integration can be configured to access the Okta API as an OAuth 2.0 client. This increases security by limiting the scope of access and providing a better mechanism to rotate credentials.

<div class="half">

![Displays the service apps required in the hub org and the Org2Org apps required in the spoke org.](/img/multi-tenancy/multi-org-provisioning.png)

</div>

In this OAuth 2.0 flow, the hub org acts as the resource server as well as the [authorization server](/docs/concepts/auth-servers/). Each spoke org is represented by a [service app in the hub org for the OAuth 2.0 client credentials flow](/docs/guides/implement-oauth-for-okta-serviceapp/main/). At the spoke org level, you need to create an Org2Org app to represent the OAuth 2.0 client. The Okta Org2Org app automatically generates a JSON Web Key Set (JWKS) used by the client to authenticate with the authorization server. For each Org2Org app, you need to extract the JWKS public key for each corresponding service app in the hub org. To limit access to the OAuth 2.0 clients, you need to grant the hub org service app with allowed [OAuth 2.0 scopes](/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints).

After the Org2Org OAuth 2.0 connection is configured, you can start to test your connection and push user data from the spoke orgs to the hub org. You can also create a [rotate keys](#key-rotation) schedule to update your credentials on a regular basis.

> **Note**: For provisioning in a hub and spoke org model that uses API tokens instead of OAuth 2.0, see [Integrate Okta Org2Org with Okta ](https://help.okta.com/okta_help.htm?type=oie&id=ext-org2org-intg).

## Hub and spoke connection configuration with OAuth 2.0

You can use OAuth 2.0 to push user and group information from a spoke org to a centralized hub org by performing the following configuration:

1. In each spoke org, [add an instance of the Org2Org app integration](#add-an-org2org-app-integration-in-a-spoke-org) and save the generated JWKS public key.
2. In the hub org, [create an OAuth 2.0 service app](#create-an-oauth-2-0-service-app-in-the-hub-org) for each spoke org with the corresponding Org2Org app JWKS public key. [Grant allowed scopes](#grant-allowed-scopes-to-the-oauth-2-0-client) to the hub org service apps (the OAuth 2.0 clients).
3. [Set and activate provisioning in the Org2Org apps](#enable-provisioning-in-the-org2org-app) from the Okta API.
4. [Assign users and groups in the spoke Org2Org apps](#assign-users-and-groups-in-the-org2org-app) to synchronize with the hub org.

### Add an Org2Org app integration in a spoke org

In the spoke org, where you want to push users and groups to the central hub org, you need to add an instance of the Org2Org app integration by using the [Okta Apps API](/docs/reference/api/apps/#add-okta-org2org-application). This generates an Org2Org app integration instance and the key certificates required to connect to the hub org.

As an Okta admin, make a `POST /api/v1/apps` request to the spoke org with [Okta Org2Org parameters](/docs/reference/api/apps/#add-okta-org2org-application):

| Parameter |  Description/Value   |
| --------- |  ------------- |
| `name`  |  `okta_org2org` |
| `label`  |  Specify a label for this Org2Org app integration |
| `baseUrl`  |  Specify the base URL of your hub org |
| `signOnMode`  |  You can set this parameter to any valid value, but if you specify `SAML_2_0`, the Org2Org app signing certificate appears in the Admin Console. |

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${spokeApiToken}" \
-d '{
  "name": "okta_org2org",
  "label": "'${spokeOrg2OrgClientLabel}'",
  "signOnMode": "SAML_2_0",
  "settings": {
    "app": {
        "baseUrl": "https://'${yourHubOktaDomain}'"
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
-H "Authorization: SSWS ${spokeApiToken}" \
"https://${yourOktaDomain}/api/v1/apps/${yourOrg2OrgAppId}/credentials/keys"
```

##### Response example

```json
[
    {
        "kty": "RSA",
        "created": "2022-01-20T19:50:14.000Z",
        "lastUpdated": "2022-01-20T19:50:14.000Z",
        "expiresAt": "2024-01-20T19:50:13.000Z",
        "kid": "sf-jWwRKMUU55 ... GucHLxIh_-fYLAofB8",
        "use": "sig",
        "x5c": [
            "MIIDqDCCApCgAwIBAgIGAX55CiDiMA0GCSqG ... c5Iuo9j3wpemDSgGapXQ=="
        ],
        "x5t#S256": "v-v2V8soFmXuhC ... nrJ4ho-N3P8aASFc",
        "e": "AQAB",
        "n": "gIxwqCNkdAb1ioyNBY2boqUCrMj_NSFJAl ... 7dZFiAYF7p_k3XMXOh-hsL_D8FDQ"
    }
]
```

> **Note**: The keys are truncated for brevity.

You need to save the generated credentials to configure the corresponding hub org service app.

### Create an OAuth 2.0 service app in the hub org

 In the hub org, create an OAuth 2.0 service app for each spoke org by using the [Dynamic Client Registration API](/docs/reference/api/oauth-clients/). As an Okta admin, make a `POST /oauth2/v1/clients` request to the hub org with the following required parameters:

| Parameter |  Description/Value   |
| --------- |  ------------- |
| `client_name`  |  Specify a label for this service app to represent the spoke org OAuth 2.0 client |
| `grant_types`  |  `client_credentials` |
| `jwks`  |  Specify the JSON Web Key Set from the corresponding spoke org’s Org2Org app integration |
| `response_types`  |  `token` |
| `token_endpoint_auth_method`  |  `private_key_jwt` |
| `application_type`  |  `service` |

##### Request example

```bash
curl -X POST \
  -H 'Accept: application/json' \
  -H "Authorization: SSWS ${hubApiToken}" \
  -H 'Content-Type: application/json' \
  -d '{
    "client_name": "'${hubServiceClientLabel}'",
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
                  "created": "2022-01-20T19:50:14.000Z",
                  "lastUpdated": "2022-01-20T19:50:14.000Z",
                  "expiresAt": "2024-01-20T19:50:13.000Z",
                  "kid": "sf-jWwRKMUU55 ... GucHLxIh_-fYLAofB8",
                  "use": "sig",
                  "x5c": [
                      "MIIDqDCCApCgAwIBAgIGAX55CiDiMA0GCSqG ... c5Iuo9j3wpemDSgGapXQ=="
                    ],
                  "x5t#S256": "v-v2V8soFmXuhC ... nrJ4ho-N3P8aASFc",
                  "e": "AQAB",
                  "n": "gIxwqCNkdAb1ioyNBY2boqUCrMj_NSFJAl ... 7dZFiAYF7p_k3XMXOh-hsL_D8FDQ"
                }
              ]
            }
 }' "https://${yourHubOktaDomain}/oauth2/v1/clients"
```

> **Note**: You can copy the entire [response from the previous `GET /api/v1/apps/${id}/credentials/keys` request](#response-example) in to the `jwks.keys` array. The `created`, `lastUpdated`, and `expiresAt` properties are ignored in the POST request. Alternatively, you can remove them from the `jwks.keys` parameter body.

### Grant allowed scopes to the OAuth 2.0 client

From the response of the previous POST request, use the `client_id` property of the service app instance to grant the [allowed scopes](/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints) for the client with the [`POST /api/v1/apps/${client_id}/grants`](/docs/reference/api/apps/#grant-consent-to-scope-for-application) request.

> **Note**: Currently, both `okta.users.manage` and `okta.groups.manage` scopes are required for the service app configuration.

##### Request examples

```bash
curl -X POST \
  -H 'Accept: application/json' \
  -H "Authorization: SSWS ${hubApiToken}" \
  -H 'Content-Type: application/json' \
  -d ' {
    "scopeId": "okta.users.manage",
    "issuer": "https://'${yourHubOrgDomain}'"
}' "https://${yourHubOrgDomain}/api/v1/apps/${yourServiceAppId}/grants"
```

```bash
curl -X POST \
  -H 'Accept: application/json' \
  -H "Authorization: SSWS ${hubApiToken}" \
  -H 'Content-Type: application/json' \
  -d ' {
    "scopeId": "okta.groups.manage",
    "issuer": "https://'${yourHubOrgDomain}'"
}' "https://${yourHubOrgDomain}/api/v1/apps/${yourServiceAppId}/grants"
```

### Enable provisioning in the Org2Org app

In each spoke org, set and activate provisioning for the Org2Org app integration by using the [Okta Apps API](/docs/reference/api/apps/#set-default-provisioning-connection-for-application).

> **Note**: Currently, only the Okta API can be used to enable OAuth 2.0-based provisioning.

As an Okta admin, make a [`POST /api/v1/apps/${Org2OrgAppId}/connections/default?activate=TRUE`](/docs/reference/api/apps/#set-default-provisioning-connection-for-application) request to set provisioning for the spoke org using the following profile parameters:

| Parameter |  Description/Value   |
| --------- |  ------------- |
| `authScheme`  |  `OAUTH2` |
| `clientId`  |  Specify the corresponding service app client ID in your hub org |

##### Request example

```bash
curl -X POST \
  -H 'Accept: application/json' \
  -H "Authorization: SSWS ${spokeApiToken}" \
  -H 'Content-Type: application/json' \
  -d ' {
    "profile": {
        "authScheme": "OAUTH2",
        "clientId": "'${yourHubOrgServiceAppId}'"
    }
}' "https://${yourSpokeOrgDomain}/api/v1/apps/${yourOrg2OrgAppId}/connections/default?activate=TRUE"
```

> **Note**: After you enable provisioning, if you want to enable app features or edit Org2Org attribute mappings, you can use the [App features operation](/docs/reference/api/apps/#list-features-for-application) and the [Profile Mappings API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ProfileMapping/). Alternatively, you can go to the Org2Org app **Provisioning** > **To App** settings from the Okta Admin Console and edit the **Provisioning To App** or the **Okta Org2Org Attribute Mappings** sections.

### Assign users and groups in the Org2Org app

In each spoke org, assign the users and groups to the Org2Org app integration by using the [Okta Apps API application operations](/docs/reference/api/apps/#application-user-operations):

* [`POST /api/v1/apps/${yourOrg2OrgAppId}/users` (assign user to an application for SSO and provisioning)](/docs/reference/api/apps/#assign-user-to-application-for-sso-and-provisioning)
* [`POST /api/v1/apps/${yourOrg2OrgAppId}/groups/${groupId}` (assign group to an application)](/docs/reference/api/apps/#assign-group-to-application)

Alternatively, you can assign users and groups for provisioning using the Okta Admin Console. See [Assign an app integration to a user](https://help.okta.com/okta_help.htm?type=oie&id=ext-lcm-assign-app-user) and [Assign an app integration to a group](https://help.okta.com/okta_help.htm?type=oie&id=ext-lcm-assign-app-groups).

After you've assigned your users or groups in the spoke org, validate that the same users or groups appear in your hub org.

## Key rotation

An advantage to using the OAuth 2.0 connection is that you can [rotate keys](/docs/concepts/key-rotation) to adhere to cryptographic best practices. You can rotate keys for a specific OAuth 2.0 connection by following these API steps:

1. [Generate a new key for the Org2Org app](#generate-a-new-key-for-the-org2org-app)
2. [Register the new key with the corresponding service app](#register-the-new-org2org-app-key-with-the-corresponding-service-app)
3. [Update the current credentials for the Org2Org app](#update-the-current-credentials-for-the-org2org-app)

> **Note**: If you want to minimize downtime during key rotation, you can update the service app (step two) with both the old and new keys, since `jwks.keys` is an array that can handle different `kid` identifiers. You can remove the old key after you verify that provisioning works with the new key.

### Generate a new key for the Org2Org app

From your spoke org, make a request to [generate a new application key credential](/docs/reference/api/apps/#generate-new-application-key-credential) as an Okta admin user.

##### Request example

```bash
curl -X POST \
  -H 'Accept: application/json' \
  -H "Authorization: SSWS ${spokeApiToken}" \
  -H 'Content-Type: application/json' \
  "https://${yourSpokeOrgDomain}/api/v1/apps/${yourOrg2OrgAppId}/credentials/keys/generate?validityYears=${validYears}"
```

##### Response example

```json
{
    "kty": "RSA",
    "created": "2022-01-20T19:50:14.000Z",
    "lastUpdated": "2022-01-20T19:50:14.000Z",
    "expiresAt": "2024-01-20T19:50:13.000Z",
    "kid": "sf-jWwRKMUU5588aokhj-xu_mGucHLxIh_-fYLAofB8",
    "use": "sig",
    "x5c": [
        "MIIDqDCCApCgAwIBAgIGAX55C ... Iuo9j3wpemDSgGapXQ=="
    ],
    "x5t#S256": "v-v2V8soFmXuhCAhta8wycA9lXKnrJ4ho-N3P8aASFc",
    "e": "AQAB",
    "n": "gIxwqCNkdAb1ioyNBY2boqUCrMj_NS ... FiAYF7p_k3XMXOh-hsL_D8FDQ"
}
```

> **Note**: The keys are truncated for brevity.

Save the generated credentials to update the keys in your Org2Org and service apps.

### Register the new Org2Org app key with the corresponding service app

On your hub org, register the new key, [generated from the previous POST request](#generate-a-new-key-for-the-org2org-app), to your corresponding service app by using the [Dynamic Client Registration API](/docs/reference/api/oauth-clients/#update-a-client-application).

##### Request example

```bash
curl -X PUT \
  -H 'Accept: application/json' \
  -H "Authorization: SSWS ${hubApiToken}" \
  -H 'Content-Type: application/json' \
  -d ' {
    "client_id": "'${yourServiceAppId}'",
    "client_name": "'${hubServiceClientLabel}'",
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
                    "kid": "sf-jWwRKMUU5588aokhj-xu_mGucHLxIh_-fYLAofB8",
                    "use": "sig",
                    "x5c": [
                        "MIIDqDCCApCgAwIBAgIGAX55C ... Iuo9j3wpemDSgGapXQ=="
                    ],
                    "x5t#S256": "v-v2V8soFmXuhCAhta8wycA9lXKnrJ4ho-N3P8aASFc",
                    "e": "AQAB",
                    "n": "gIxwqCNkdAb1ioyNBY2boqUCrMj_NS ... FiAYF7p_k3XMXOh-hsL_D8FDQ"
                  }
                ]
            }
 }' "https://${yourHubOrgDomain}/oauth2/v1/clients/${yourServiceAppId}"
```

> **Note**: You must specify all required parameters when you update a client app. Partial updates aren't supported. If any mandatory parameters are missing when you update a client app, the update fails. When you update the keys in the service app `jwks` parameter, all the old keys are overwritten. To add a new key and keep the old key, you need to specify both old and new keys in the `jwks.keys` array.

### Update the current credentials for the Org2Org app

From the response of the [previous generate key POST request](#generate-a-new-key-for-the-org2org-app), copy the `kid` property and [activate the new key by updating the Org2Org app](/docs/reference/api/apps/#update-key-credential-for-application).

##### Request example

```bash
curl -X PUT \
  -H 'Accept: application/json' \
  -H "Authorization: SSWS ${spokeApiToken}" \
  -H 'Content-Type: application/json' \
  -d ' {
    "name": "okta_org2org",
    "label": "'${spokeOrg2OrgClientLabel}'",
    "credentials": {
        "signing": {
            "kid": "sf-jWwRKMUU5588aokhj-xu_mGucHLxIh_-fYLAofB8"
        }
    }
}' "https://${yourSpokeOrgDomain}/api/v1/apps/${yourOrg2OrgAppId}"
```

> **Note**: You must specify `name` and `label` parameters when you update an Org2Org app.
