---
title: Enable consent for scopes
---
Use the following steps to display the user consent dialog box as part of an OpenID Connect or OAuth 2.0 request.

> **Note:** Currently OAuth Consent works only with custom authorization servers. See [Authorization Servers](/docs/concepts/auth-servers/) for more information on the types of authorization servers available to you and what you can use them for.

1. In the Developer Console, select **Applications** and then select the OpenID Connect app that you want to require user consent for.

2. Select the **General** tab and click **Edit**.

3. Scroll down to the **User Consent** section and select **Require consent**.

    > **Note:** If the **User Consent** section doesn't appear, you don't have the API Access Management and the User Consent features enabled. To enable these features, contact [Support](https://support.okta.com/help/open_case?_).

4. In this example, we use the **Implicit** flow for testing purposes. In the **Application** section, select **Implicit** flow and then both **Allow ID Token with implicit grant type** and **Allow Access Token with implicit grant type**.

    For the [Authorization Code flow](/docs/concepts/auth-overview/#authorization-code-flow), the response type is `code`. You can exchange an authorization code for an ID token and/or an access token using the `/token` endpoint.

5. Click **Save**.

6. To enable consent for the [scopes](/docs/reference/api/authorization-servers/#create-a-scope) that you want to require consent for, select **API**, **Authorization Servers**, and then select **default** (Custom Authorization Server) in the table. In this example, we are enabling consent for default Custom Authorization Server scopes.

7. Select the **Scopes** tab.

8. Click the edit icon for the **phone** scope. The Edit Scope dialog box appears.

9. Select **Require user consent for this scope** and click **Save**.

## Enable consent using the APIs

The following section provides example requests for enabling the consent dialog box using the APIs. You must first set the `consent_method` property and then enable consent for the scope.

> **Note:** See the [Settings table in the Apps API doc](/docs/reference/api/apps/#settings-8) for more information on this parameter.

**Update the App**

This example shows the JSON body of a PUT request to an existing OpenID Connect app. The request updates the `consent_method` parameter from `TRUSTED` (which is the default) to `REQUIRED`. The value that you specify for `consent_method` depends on the values for `prompt` and `consent`. Check the tables in the [Add OAuth 2.0 Client Application](/docs/reference/api/apps/#add-oauth-2-0-client-application) section for information on these three properties. In most cases, `REQUIRED` is the correct value.

> **Note:** You need the `applicationId` of the app that you want to update. Do a [List Applications](/docs/reference/api/apps/#list-applications-with-defaults) to locate that ID.

```JSON
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
                "http://${yourOktaDomain}/authorization-code/callback"
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
            "initiate_login_uri": "http://${yourOktaDomain}/authorization-code/callback",
            "application_type": "web",
            "consent_method": "REQUIRED",
            "issuer_mode": "CUSTOM_URL"
        }
    }
}
https://${yourOktaDomain}/api/v1/apps/${applicationId}
```

To enable consent for a scope that you want to require consent for, you need to [update the appropriate scope](/docs/reference/api/authorization-servers/#update-a-scope) by setting the `consent` property for the scope from `IMPLICIT` (the default) to `REQUIRED`.

**Update Scope consent**

This example shows the JSON body for a PUT request to the default Custom Authorization Server. You need the following information for the request:

* `authServerId`: Do a [List Authorization Servers](/docs/reference/api/authorization-servers/#list-authorization-servers) to locate the appropriate ID.
* `scopeId`: Do a [List Scopes](/docs/reference/api/authorization-servers/#get-all-scopes) to locate the appropriate ID.

```JSON
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
https://${yourOktaDomain}/api/v1/authorizationServers/${authServerId}/scopes/${scopeId}
```

<NextSectionLink/>
