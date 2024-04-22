---
title: Request user consent
excerpt: How to request user consent during authentication
layout: Guides
---

This guide explains how to configure an Okta-hosted user consent dialog for OAuth 2.0 or OpenID Connect authentication flows.

---

#### Learning outcomes

Implement an Okta-hosted user consent dialog.

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [OpenID Connect client application](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-oidc) created in your Okta org with at least [one user assigned to it](https://help.okta.com/okta_help.htm?id=ext-assign-apps)

---

## About the user consent dialog

When configured, the Okta-hosted user consent dialog for OAuth 2.0 or OpenID Connect authentication flows enables users to acknowledge and accept that they’re giving an app access to some of their data. With the correct configuration, Okta displays a consent dialog that shows which app is asking for access to what data. The dialog displays the app logo that you specify and also provides details about what data is shared if the user consents.

## User consent and tokens

User consent represents a user's explicit permission to allow an app to access resources protected by scopes. Consent grants are different from tokens. This is because a consent can outlast a token. There can also be multiple tokens with varying sets of scopes derived from a single consent.

You can configure which scopes aren't required, which are optional, and which are required.

When an app needs to get a new access token from an authorization server, the user isn't prompted for consent if they already consented to the specified scopes. Consent grants remain valid until the user or admin manually revokes them, or until the user, app, authorization server, or scope is deactivated or deleted.

> **Note:** The user only has to grant consent once for a scope per authorization server.

When a consent dialog appears depends on the values of three elements:

* `prompt`: a query [parameter](/docs/reference/api/oidc/#parameter-details) that is used in requests to `/oauth2/${authorizationServerId}/v1/authorize` (custom authorization server)
* `consent_method`: an app property listed in the **Settings** [table](/docs/reference/api/apps/#settings-10) in the Apps API doc. This property allows you to determine whether a client is fully trusted (for example, a first-party app) or requires consent (for example, a third-party app).
* `consent`: a scope property listed in the **Parameter details** [section](/docs/reference/api/oidc/#parameter-details) for the `/authorize` endpoint. This property allows you to enable or disable user consent for an individual scope.

## Enable consent for scopes

Use the following steps to display the user consent dialog as part of an OpenID Connect or OAuth 2.0 request.

> **Note:** Currently OAuth Consent works only with custom authorization servers. See [Authorization servers](/docs/concepts/auth-servers/) for more information on the types of authorization servers available to you and what you can use them for.

<ApiAmProdWarning />

1. In the Admin Console, go to **Applications** > **Applications**.
1. Select the OpenID Connect app that you want to require user consent for.
1. On the **General** tab, scroll down to the **User Consent** section and verify that the **Require consent** checkbox is selected. If it isn't, click **Edit** and select **Require consent**.
1. For this use case, use the **Implicit** flow for testing purposes. In the **Grant type** section, click **Advanced**, select **Implicit**, and then select both **Allow ID Token with implicit grant type** and **Allow Access Token with implicit grant type**.

    **Note:** If you're using Classic Engine, select **Implicit (hybrid)** in the **Grant type** section.

    For the [Authorization Code flow](/docs/concepts/oauth-openid/#authorization-code-flow), the response type is `code`. You can exchange an authorization code for an ID token and/or an access token using the `/token` endpoint.

1. Click **Save**.
1. To enable consent for [scopes](/docs/reference/api/authorization-servers/#create-a-scope), from the left navigation select **Security** and then **API**.
1. On the **Authorization Servers** tab, select **default** (custom authorization server) in the table. In this example, we are enabling consent for a default custom authorization server scope.
1. Select the **Scopes** tab.
1. Click the edit icon for the **phone** scope. The Edit Scope dialog appears.
1. For this use case example, select **Required** in the **User consent** section. **Required** indicates that the user must grant the app access to the information (scope) or they can't sign in to the app. The other options available include:

    > **Note:** If these options don't appear, you don't have the optional consent feature enabled. To enable it in your org, select **Settings** > **Features**, locate **OAuth 2.0 optional consent**, and slide to enable.

    * **Implicit**: The default setting. Indicates that the user doesn't have to grant the app access to the information. User consent is implied.
    * **Optional**: Indicates that the user can skip granting the app access to the information (scope). Scopes that the user skips aren't included in the authorization response. After a user skips a scope, the next time that they sign in, Okta doesn't prompt them for it. If you later make the scope required for the app, the user is then prompted to grant the app access to that scope.

    > **Note:** When you include `prompt=consent` in the authorization request, the user is prompted for all consent-enabled scopes. This includes scopes that are required or optional, even when the user has already given consent for a scope or skipped a scope. The user also has the option to skip scopes that were changed from required to optional.

1. When you select **User consent** as **Required** or **Optional**, the **Block services from requesting this scope** checkbox is automatically selected.

    The **Block services from requesting this scope** checkbox strictly enforces user consent for the scope. When you select this checkbox, if a service using the [Client Credentials](/docs/guides/implement-grant-type/clientcreds/main/) grant flow makes a request that contains this scope, the authorization server returns an error. This occurs because there is no user involved in a Client Credentials grant flow. If you want to allow service-to-service interactions to request this scope, clear the checkbox. See the [Authorization Servers API](/docs/reference/api/authorization-servers/#scope-properties) for more information on consent options.

1. Click **Save**.

## Enable consent using the APIs

The following section provides example requests for enabling the consent dialog using the APIs. You must first verify that the `consent_method` property is set to `REQUIRED` and then enable consent for the scope.

### Update the consent method for an app

1. Verify that the `consent_method` parameter for the app is set to `REQUIRED`:

    * Do a [List applications](/docs/reference/api/apps/#list-applications-with-defaults) to locate the `applicationId` of the app.
    * Do a [Get application](/docs/reference/api/apps/#get-application) using the `applicationId` and verify that the `consent_method` parameter is set to `REQUIRED`.

2. If the `consent_method` is set to `TRUSTED`, you need to update that parameter. The following example shows the JSON body of a PUT request to an existing OpenID Connect app (`https://${yourOktaDomain}/api/v1/apps/${applicationId}`). The request updates the `consent_method` parameter from `TRUSTED` to `REQUIRED`. The value that you specify for `consent_method` depends on the values for `prompt` and `consent`.

    > **Note:** Check the **Settings** [table](/docs/reference/api/apps/#settings-10) in the **Add OAuth 2.0 Client Application** section of the Apps API reference for information on these properties. In most cases, `REQUIRED` is the correct value.

    ```json
    {
        "id": "0oaosna3ilNxgPTmk0h7",
        "name": "oidc_client",
        "label": "ConsentWebApp",
        "status": "ACTIVE",
        "signOnMode": "OPENID_CONNECT",
        "credentials": {
         "userNameTemplate": {
             "template": "${source.login}",
             "type": "BUILT_IN"
         },
            "signing": {
              "kid": "5gbe0HpzAYj2rsWSLxx1fYHdh-SzWqyKqwmfJ6qDk5g"
         },
            "oauthClient": {
             "autoKeyRotation": true,
              "client_id": "0oaosna3ilNxgPTmk0h7",
             "token_endpoint_auth_method": "client_secret_basic"
            }
     },
     "settings": {
         "app": {},
         "notifications": {
             "vpn": {
                 "network": {
                     "connection": "DISABLED"
                  },
                 "message": null,
                 "helpUrl": null
             }
            },
         "oauthClient": {
             "client_uri": null,
             "logo_uri": null,
             "redirect_uris": [
                "https://{yourOktaDomain}/authorization-code/callback"
             ],
             "response_types": [
                 "code",
                 "token",
                 "id_token"
             ],
             "grant_types": [
                 "authorization_code",
                 "implicit"
             ],
                "initiate_login_uri": "https://{yourOktaDomain}/authorization-code/callback",
                "application_type": "web",
                 "consent_method": "REQUIRED",
                 "issuer_mode": "CUSTOM_URL"
            }
        }
    }
    ```

### Update Scope consent

To enable consent for a scope, you need to [update the appropriate scope](/docs/reference/api/authorization-servers/#update-a-scope) by updating the `consent` property for the scope from `IMPLICIT` (the default) to either `REQUIRED` or `FLEXIBLE`. In this example, set `consent` to `REQUIRED`.

To make consent of a scope optional, set the `consent` property to either `REQUIRED` or `FLEXIBLE` and include `"optional": true` in the request.

> **Note:** See the [Authorization Servers API](/docs/reference/api/authorization-servers/#scope-properties) for more information on scope properties and how to use them.

This example shows the JSON body for a PUT request to the default custom authorization server (`https://${yourOktaDomain}/api/v1/authorizationServers/${authorizationServerId}/scopes/${scopeId}`) to update the `phone` scope. You need the following information for the request:

* `authorizationServerId`: Do a [List Authorization Servers](/docs/reference/api/authorization-servers/#list-authorization-servers) to locate the appropriate ID.
* `scopeId`: Do a [List Scopes](/docs/reference/api/authorization-servers/#get-all-scopes) to locate the appropriate ID.

```json
{
    "id": "scpixa2zmc8Eumvjb0h7",
    "name": "phone",
    "displayName": "phone",
    "description": "Allows this application to access your phone number.",
    "system": true,
    "metadataPublish": "ALL_CLIENTS",
    "consent": "REQUIRED",
    "default": false
}
```

To update scope consent to `OPTIONAL`, set `consent` to `REQUIRED` and include the `optional` parameter set to `true`:

```json
{
    "id": "scpixa2zmc8Eumvjb0h7",
    "name": "phone",
    "displayName": "phone",
    "description": "Allows this application to access your phone number.",
    "system": true,
    "metadataPublish": "ALL_CLIENTS",
    "consent": "REQUIRED",
    "optional": true,
    "default": false
}
```

## Build the request

After you define the scopes that you want to require consent for, prepare an authentication or authorization request with the correct values.

1. Obtain the following values from your OpenID Connect app, both of which you can find on the app's **General** tab:

    * Client ID
    * Redirect URI

2. Use the default custom authorization server's authorization endpoint, for example, `https://{yourOktaDomain}/oauth2/default/v1/authorize`.

    > **Note:** See [Authorization servers](/docs/guides/customize-authz-server/) for more information on the types of authorization servers available to you and what you can use them for.

3. Add the following query parameters to the URL:

    * Your OpenID Connect app's `client_id` and `redirect_uri`
    * The `openid` scope and the scopes that you want to require consent for. In this example, we configured the `phone` scope in the previous section.
    * The response type, which for an ID token is `id_token` and an access token is `token`

    > **Note:** The examples in this guide use the [Implicit flow](/docs/concepts/oauth-openid/#implicit-flow), which streamlines authentication by returning tokens without introducing additional steps. This makes it easier to test your configuration. For the [Authorization Code flow](/docs/concepts/oauth-openid/#authorization-code-flow), the response type is `code`. You can then exchange an authorization code for an ID token and/or an access token using the `/token` endpoint.

    * Values for `state` and `nonce`, which can be anything

    * Optional. The `prompt` parameter. The standard behavior (if you don't include `prompt` in the request) is to prompt the user for consent if they haven't already given consent for the scope(s). When you include `prompt=consent` in the request, the user is prompted for consent every time, even if they have already given consent. You must set the `consent_method` and the consent for the scope(s) to `REQUIRED`. See the [Parameter details](/docs/reference/api/oidc/#parameter-details) section for the `/authorize` endpoint.

    > **Note:** All of the property values are fully documented in the `/authorize` [endpoint](/docs/reference/api/oidc/#authorize) section of the OpenID Connect & OAuth 2.0 API reference.

    The resulting URL to request an access token looks something like this:

    ```bash
    curl -X GET
    "https://${yourOktaDomain}/oauth2/${authorizationServerId}/v1/authorize?client_id=examplefa39J4jXdcCwWA
    &response_type=token
    &scope=openid%20phone
    &redirect_uri=https%3A%2F%2FyourRedirectUriHere.com
    &state=myState
    &nonce=${myNonceValue}"
    ```

    Example with the `prompt` parameter included:

     ```bash
    curl -X GET
    "https://${yourOktaDomain}/oauth2/${authorizationServerId}/v1/authorize?client_id=examplefa39J4jXdcCwWA
    &response_type=token
    &scope=openid%20phone
    &prompt=consent
    &redirect_uri=https%3A%2F%2FyourRedirectUriHere.com
    &state=myState
    &nonce=${myNonceValue}"
    ```

    > **Note:** The `response_type` for an ID token looks like this: `&response_type=id_token`.

4. Paste the request URL into a browser. The User Consent dialog appears. Click **Allow** to create the grant.

    > **Note:** The user only has to grant consent once for a scope per authorization server.

## Verification

There are several ways to verify that you've successfully created a user grant:

* Check the ID token payload if you requested an ID token. To check the ID token payload, you can copy the token value and paste it into any [JWT decoder](https://token.dev/). The payload should look similar to this. Note that no scopes are returned in an ID token:

    ```json
    {
        "sub": "00uixa271s6x7qt8I0h7",
        "ver": 1,
        "iss": "https://{yourOktaDomain}/oauth2/default",
        "aud": "0oaosna3ilNxgPTmk0h7",
        "iat": 1575931097,
        "exp": 1575934697,
        "jti": "ID.67UFdLqtzyqtWEcO4GJPVBE6MMe-guCdXwzuv11p-eE",
        "amr": [
            "mfa",
            "pwd",
            "kba"
            ],
        "idp": "00oixa26ycdNcX0VT0h7",
        "nonce": "UBGW",
        "phone_number": "7206685241",
        "auth_time": 1575929999
    }

* Check the access token if you requested one. To check the access token payload, you can copy the token value and paste it into any JWT decoder. The payload should look something like this:

    ```json
    {
        "ver": 1,
        "jti": "AT.xtjhr8FeMkyMfgLiFzVYOYPbgqWdd6ONULT3ffeK7d4",
        "iss": "https://{yourOktaDomain}/oauth2/default",
        "aud": "api://default",
        "iat": 1575929637,
        "exp": 1575933237,
        "cid": "0oaosna3ilNxgPTmk0h7",
        "uid": "00uixa271s6x7qt8I0h7",
        "scp": [
                "openid",
                "phone"
            ],
        "sub": "joe.smith@okta.com"
    }
    ```

* You can verify that a grant was created by listing the grants given to a specific user:

    ```bash
    curl -v -X GET \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -H "Authorization: SSWS ${api_token} \
    "https://${yourOktaDomain}/api/v1/users/${userId}/grants"
    ```

    The response should contain the `scopeId` for the grant that you created when you clicked **Allow** in the previous step.

    ```json
    [
        {
        "id": "oaggjy8vxJwKeiMx20h6",
        "status": "ACTIVE",
        "created": "2019-12-09T17:36:12.000Z",
        "createdBy": {
            "id": "00uixa271s6x7qt8I0h7",
            "type": "User"
        },
        "lastUpdated": "2019-12-09T17:36:12.000Z",
        "issuer": "https://{yourOktaDomain}/oauth2/default",
        "clientId": "0oaosna3ilNxgPTmk0h7",
        "userId": "00uixa271s6x7qt8I0h7",
        "scopeId": "scpixa2zmc8Eumvjb0h7",
        "source": "END_USER",
        "_links": {
            "app": {
                "href": "https://{yourOktaDomain}/api/v1/apps/0oaosna3ilNxgPTmk0h7",
                "title": "ConsentWebApp"
            },
            "authorizationServer": {
                "href": "https://{yourOktaDomain}/api/v1/authorizationServers/default",
                "title": "default"
            },
            "scope": {
                "href": "https://{yourOktaDomain}/api/v1/authorizationServers/default/scopes/scpixa2zmc8Eumvjb0h7",
                "title": "phone"
            },
            "self": {
                "href": "https://{yourOktaDomain}/api/v1/users/00uixa271s6x7qt8I0h7/grants/oaggjy8vxJwKeiMx20h6",
                "hints": {
                    "allow": [
                        "GET",
                        "DELETE"
                    ]
                }
            },
            "client": {
                "href": "https://{yourOktaDomain}/oauth2/v1/clients/0oaosna3ilNxgPTmk0h7",
                "title": "ConsentWebApp"
            },
            "user": {
                "href": "https://{yourOktaDomain}/api/v1/users/00uixa271s6x7qt8I0h7",
                "title": "Joe Smith"
                }
             }
        }
    ]
    ```

## Revoke consent for a user

To revoke consent for a user, you can revoke one consent that is granted or all consents that are granted. Before you begin, you need the following:

* `userId` for the user that you want to revoke a grant for. Do a [List Users](/docs/reference/api/users/#list-users) to locate the user and the `userId` that you need.
* `grantId` for the grant that you want to revoke. Do a [List Grants](/docs/reference/api/users/#list-grants) with the `userId` to locate the `grantID` that you need.

### Revoke one Grant

To [revoke one grant for a user](/docs/reference/api/users/#revoke-a-grant-for-a-user), use the `grantId` that you want to revoke for a user in a DELETE request:

**Example request**

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/${userId}/grants/${grantId}"
```

### Revoke all Grants

To [revoke all grants for a user](/docs/reference/api/users/#revoke-all-grants-for-a-user), just use the `userId` for the user in a DELETE request:

**Example request**

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/${userId}/grants"
```

## Troubleshooting

If you don't see the consent prompt when expected:

* Verify that you haven't already provided consent for that combination of app and scope(s). Use the `/grants`[endpoint](/docs/reference/api/users/#list-grants) to see which grants have been given and to revoke grants.
* Check the settings for `prompt`, `consent`, and `consent_method` in the [Apps API table](/docs/reference/api/apps/#add-oauth-20-client-application).
* Make sure that in your app configuration, the `redirect_uri` is an absolute URI and that it is allowed by specifying it in [Trusted Origins](/docs/reference/api/trusted-origins/).
* If you aren't using the `default` [authorization server](/docs/concepts/auth-servers/), check that you've created at least one policy with one rule that applies to any scope or the scope(s) in your test.
* Check the [System Log](/docs/reference/api/system-log/) to see what went wrong.
