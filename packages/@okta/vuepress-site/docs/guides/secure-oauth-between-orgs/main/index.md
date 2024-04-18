---
title: Secure API connections between orgs with OAuth 2.0
excerpt: Learn how to synchronize users and groups between orgs with OAuth 2.0 in a multi-tenant solution. Use the Okta Org2Org app in a hub-and-spoke (target-and-source) configuration with OAuth 2.0 as the authentication scheme for the provisioning connection.
layout: Guides
---

This guide explains how to securely configure Okta hub-and-spoke orgs to synchronize users and groups using OAuth 2.0 in a [multi-tenant solution](/docs/concepts/multi-tenancy/). In the hub-and-spoke model, the spoke org is also referred to as the source org and the hub org is the target org. The provisioning connection between Okta orgs is configured as an OAuth 2.0 [Org2Org app integration](https://help.okta.com/okta_help.htm?type=oie&id=ext-org2org-intg). This connection provides API access to scoped data using the OAuth 2.0 Client Credential flow.

> **Note**: Currently, only the Okta API can be used to enable OAuth 2.0-based provisioning.
---

#### Learning outcomes

* Set up a hub-and-spoke Okta org provisioning connection to use the OAuth 2.0 Client Credentials grant flow.
* Configure the hub Okta org with service apps for each spoke Okta org.
* Configure an Org2Org app on each spoke Okta org.
* Configure and activate Org2Org provisioning on spoke Okta orgs.
* Rotate keys for the OAuth 2.0 connection.

#### What you need

Multiple Okta orgs for your multi-tenant solution

> **Note:** The Okta Org2Org app integration isn't available in Okta Developer Edition orgs. If you need to test this feature in your developer org, contact your Okta account team.

---

## OAuth 2.0 for secure API connections in multi-tenant solutions

To secure API connections between orgs in a hub-and-spoke [multi-tenant solution](/docs/concepts/multi-tenancy/) model, use the Okta Org2Org integration as an OAuth 2.0 client. In this model, the spoke org is referred to as the source org and the hub org is the target org.

Previously, the Org2Org integration only supported token-based access to the Okta APIs for provisioning requests. You can now configure the Org2Org integration to access Okta APIs as an OAuth 2.0 client using the OAuth 2.0 Client Credentials flow. The OAuth 2.0 API access enables you to increase security by limiting the scope of resource access and providing a better mechanism to rotate credentials.

<div class="half">

![Displays the service apps required in the hub org and the Org2Org apps required in the spoke org.](/img/multi-tenancy/multi-org-provisioning.png)

</div>

In this configuration:

* The hub org acts as the resource server and the [authorization server](/docs/concepts/auth-servers/)

* Each spoke org represents a [service app in the hub org for the OAuth 2.0 Client Credentials flow](/docs/guides/implement-oauth-for-okta-serviceapp/main/)

* At the spoke org level, an Org2Org app represents the OAuth 2.0 client

* To limit access to the OAuth 2.0 clients, the hub-org service app needs to be granted with allowed [OAuth 2.0 scopes](https://developer.okta.com/docs/api/oauth2/#okta-admin-management).

After you configure the OAuth 2.0 connection, test your connection: push user data from the spoke orgs to the hub org. You can also create a [Rotate key](#key-rotation) schedule to update your credentials regularly.

> **Note**: For provisioning connections that use API tokens instead of OAuth 2.0, see [Integrate Okta Org2Org with Okta](https://help.okta.com/okta_help.htm?type=oie&id=ext-org2org-intg).

## Hub and spoke connection configuration with OAuth 2.0

You can push user and group information from a spoke org to a centralized hub org with OAuth 2.0 by performing the following configuration:

1. In each spoke org, [add an instance of the Org2Org app integration](#add-an-org2org-app-integration-in-a-spoke-org) and save the generated JSON Web Key Set (JWKS) public key.
2. In the hub org, [create an OAuth 2.0 service app](#create-an-oauth-2-0-service-app-in-the-hub-org) for each spoke org with the corresponding Org2Org app JWKS public key. For each hub-org service app (the OAuth 2.0 client), [assign admin roles](#assign-admin-roles-to-the-oauth-2-0-service-app) and [grant allowed scopes](#grant-allowed-scopes-to-the-oauth-2-0-client).
3. In each spoke org, [set and activate provisioning in the Org2Org apps](#enable-provisioning-in-the-org2org-app) from the Okta API.
4. In each spoke org, [assign users and groups in the spoke Org2Org apps](#assign-users-and-groups-in-the-org2org-app) to synchronize with the hub org.

---

### Add an Org2Org app integration in a spoke org

You use the spoke org to push users and groups to the central hub org. In the spoke org, add an instance of the Org2Org app integration by using the [Okta Apps API](/docs/reference/api/apps/#add-okta-org2org-application). This generates an integration instance with the key certificates required to connect to the hub org.

> **Note:** You can't use an Okta Developer Edition org as a spoke org since the Okta Org2Org app integration isn't available. If you need to test this feature in your developer org, contact your Okta account team.

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

Save the generated credentials to configure the corresponding hub-org service app.

### Create an OAuth 2.0 service app in the hub org

 In the hub org, create an OAuth 2.0 service app for each spoke org by using the [Dynamic Client Registration API](/docs/reference/api/oauth-clients/). As an Okta admin, make a `POST /oauth2/v1/clients` request to the hub org with the following required parameters:

| Parameter |  Description/Value   |
| --------- |  ------------- |
| `client_name`  |  Specify a label for this service app to represent the spoke org OAuth 2.0 client |
| `grant_types`  |  `client_credentials` |
| `jwks`  |  Specify the JWKS from the corresponding spoke org’s Org2Org app integration |
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

> **Note:** You can copy the entire [response from the previous `GET /api/v1/apps/${id}/credentials/keys` request](#response-example) in to the `jwks.keys` array. The `created`, `lastUpdated`, and `expiresAt` properties are ignored in the POST request. Alternatively, you can remove them from the `jwks.keys` parameter body.

### Assign admin roles to the OAuth 2.0 service app

Assign admin roles for every OAuth 2.0 service app that you create in the hub org. Service apps with assigned admin roles are constrained to the permissions and resources that are included in the role. This improves security for an org since it ensures that service apps only have access to the resources that are needed to perform their tasks.

You can assign a [standard admin role](https://help.okta.com/okta_help.htm?type=oie&id=ext-administrators-admin-comparison) or a [custom admin role](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-creating-custom-admin-roles) with permissions to specific resource sets.

> **Note:** To temporarily bypass assigning an admin role, enable the **Public client app admins** org setting. This automatically assigns the super admin role to custom API service apps that you create after the scopes are granted. Go to **Settings** > **Account** > **Public client app admins** in the Admin Console to edit this setting. See [Assign admin roles to apps](https://help.okta.com/okta_help.htm?type=oie&id=csh-work-with-admin-assign-admin-role-to-apps). Disable this setting after you incorporate admin role assignments in your workflow.

For the OAuth 2.0 Org2Org provisioning connection, Okta recommends that you assign the following [standard admin roles](/docs/concepts/role-assignment/#standard-role-types):

* `USER_ADMIN` (Group administrator)
* `GROUP_MEMBERSHIP_ADMIN` (Group membership administrator)

You can use the Admin Console to assign an admin role to your service app. See [Assign admin roles to apps](https://help.okta.com/okta_help.htm?type=oie&id=csh-work-with-admin-assign-admin-role-to-apps) and go to the **Admin roles** tab from your app integration details. Alternatively, you can assign the admin role to your service app with the Okta API.

As an Okta super admin, make a `POST /oauth2/v1/clients/${yourServiceAppId}/roles` request to the hub org with the following required parameters to assign an admin role:

| Parameter |  Description/Value   |
| --------- |  ------------- |
| `yourServiceAppId`  |  Specify the `client_id` value from the previous response when the service app was created. In the following role assignment example, the `${yourServiceAppId}` variable name is used instead of `client_id`.|
| `type`  |  Specify the admin role to assign to the service app. Use the recommended standard admin roles (`USER_ADMIN`, `GROUP_MEMBERSHIP_ADMIN`). |

See [Assign a Role to a client app](/docs/reference/api/roles/#assign-a-role-to-a-client-application) in the Role Assignment API reference.

> **Note:** Only Okta [super admins](https://help.okta.com/okta_help.htm?type=oie&id=ext_superadmin) can assign roles.

##### Request example

 ```bash
 curl -X POST \
 -H "Accept: application/json" \
 -H "Content-Type: application/json" \
 -H "Authorization: SSWS ${hubApiToken}" \
 -d '{
    "type": "USER_ADMIN"
  }' "https://${yourHubOrgDomain}/oauth2/v1/clients/${yourServiceAppId}/roles"
 ```

> **Note:** The admin roles determine which resources the admin can perform the actions on (such as a specific group of users or a specific set of apps). Scopes determine the action that the admin can perform (such as manage users, read apps). Therefore, the admin roles need to have enough permissions for the scopes provided.

### Grant allowed scopes to the OAuth 2.0 client

From the response of the previous [POST request](#create-an-oauth-2-0-service-app-in-the-hub-org), use the `client_id` property of the hub service app instance to grant the [allowed scopes](/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints) with the [`POST /api/v1/apps/${client_id}/grants`](/docs/reference/api/apps/#grant-consent-to-scope-for-application) request. In the following example, the `${yourServiceAppId}` variable name is used instead of `client_id`.

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

> **Note**: Currently, you can only enable OAuth 2.0-based provisioning with the Okta API.

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

> **Note**: After you enable provisioning, if you want to enable app features or edit Org2Org attribute mappings, use the [App features operation](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationFeatures/) or the [Profile Mappings API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ProfileMapping/). Alternatively, go to the Org2Org app **Provisioning** > **To App** settings from the Admin Console and edit the **Provisioning To App** or the **Okta Org2Org Attribute Mappings** sections.

### Assign users and groups in the Org2Org app

In each spoke (source) org, assign the users and groups to the Org2Org app integration by using the [Okta Application Users API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationUsers/#tag/ApplicationUsers/operation/assignUserToApplication):

* [`POST /api/v1/apps/${yourOrg2OrgAppId}/users` (Assign user to an app for SSO and provisioning)](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationUsers/#tag/ApplicationUsers/operation/assignUserToApplication)
* [`POST /api/v1/apps/${yourOrg2OrgAppId}/groups/${groupId}` (Assign group to an app)](/docs/reference/api/apps/#assign-group-to-application)

Alternatively, you can assign users and groups for provisioning using the Okta Admin Console. See [Assign an app integration to a user](https://help.okta.com/okta_help.htm?type=oie&id=ext-lcm-assign-app-user) and [Assign an app integration to a group](https://help.okta.com/okta_help.htm?type=oie&id=ext-lcm-assign-app-groups).

After you've assigned your users or groups in the spoke org, validate that the same users or groups appear in your hub org.

## Key rotation

An advantage to using the OAuth 2.0 connection is that you can [rotate keys](/docs/concepts/key-rotation) to adhere to cryptographic best practices. You can rotate keys for a specific OAuth 2.0 connection by following these API steps:

1. [Generate a new key for the Org2Org app](#generate-a-new-key-for-the-org2org-app)
2. [Register the new key with the corresponding service app](#register-the-new-org2org-app-key-with-the-corresponding-service-app)
3. [Update the current credentials for the Org2Org app](#update-the-current-credentials-for-the-org2org-app)

> **Note**: If you want to minimize downtime during key rotation, you can update the service app (step two) with both the old and new keys, since `jwks.keys` is an array that can handle different `kid` identifiers. You can remove the old key after you verify that provisioning works with the new key.

### Generate a new key for the Org2Org app

From your spoke org, make a request to [generate a new app key credential](/docs/reference/api/apps/#generate-new-application-key-credential) as an Okta admin.

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

On your hub org, register the key, [generated from the previous POST request](#generate-a-new-key-for-the-org2org-app), to your corresponding service app by using the [Dynamic Client Registration API](/docs/reference/api/oauth-clients/#update-a-client-application).

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

> **Note**: Specify all the required parameters when you update a client app. Partial updates aren't supported. If any mandatory parameters are missing when you update a client app, the update fails. When you update the keys in the service app `jwks` parameter, all the old keys are overwritten. To add a key and keep the old key, you need to specify both old and new keys in the `jwks.keys` array.

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

> **Note**: Specify `name` and `label` parameters when you update an Org2Org app.
