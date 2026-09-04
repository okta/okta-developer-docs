---
title: Register apps with a Client ID Metadata Document (CIMD)
excerpt: Learn how to register a custom OpenID Connect app integration using a Client ID Metadata Document (CIMD) URL instead of an Okta-generated client ID.
layout: Guides
---

Learn how to register a custom OpenID Connect (OIDC) app integration with a Client ID Metadata Document (CIMD) URL. Use a CIMD URL instead of an Okta-generated client ID and client secret.

---

#### Learning outcomes

- Understand what a CIMD is and how it changes app registration.
- Register a new custom OIDC app integration with a CIMD URL, or convert an existing one.
- Configure access for a CIMD app integration.
- Understand what happens at runtime when a CIMD client requests a token.

#### What you need

- An org with CIMD enabled
- A super admin role, or an app and org admin role
- A CIMD URL from the app owner. See [CIMD requirements](#cimd-requirements).
- A custom authorization server. See [Create an authorization server](/docs/guides/customize-authz-server/main/#create-an-authorization-server).

---

## Overview

A CIMD is a JSON document that an app owner hosts at an HTTPS URL. It describes the app's OAuth client: its redirect URIs, grant types, and signing keys. The URL serves as the app's `client_id`.

When you register an app integration with a CIMD URL, you add that URL to an allowlist in your org. You don't enter any other client configuration. The OAuth client doesn't exist in your org yet. Okta creates it the first time that the app sends a request that uses the CIMD URL as its `client_id`.

For example, your company uses Okta to protect the APIs behind its platform, and a partner builds an app that calls those APIs. Before that app can request a token, it needs an OAuth client in your Okta org.

- Without CIMD, you create that client manually. The partner sends you its redirect URIs, grant types, token endpoint authentication method, and signing keys. You then enter them in Okta, and you send the client ID and secret that Okta generates back to the partner.
- With CIMD, you add the partner's CIMD URL and stop there. Okta reads all of those values from the document that the partner hosts. There's no client secret to send, and the partner rotates its own signing keys without any Okta API call.

CIMD doesn't change how users authenticate or what access they get. It changes how the app's OAuth client is registered.

> **Note:** CIMD is available for custom OIDC app integrations only. You can't use a CIMD URL with an app integration from the Okta Integration Network (OIN), or with a SAML, SWA, or SCIM app integration.

## CIMD requirements

The app owner is responsible for hosting and maintaining the CIMD. Okta validates the following properties:

| Property | Requirement |
| --- | --- |
| `client_id` | Must exactly match the URL that Okta requests. This is the same URL that you set as `cimdUrl` when you register the app integration. |
| `jwks_uri` | A URL to the hosted JSON Web Key Set (JWKS), or an inline `jwks` object. Okta uses this to verify the app's signature. |
| `redirect_uris` | Must be a non-empty array, even for an app that doesn't use a redirect-based flow. |

The app owner can include other properties from the [OAuth Dynamic Client Registration Metadata](https://www.iana.org/assignments/oauth-parameters/oauth-parameters.xhtml#client-metadata) registry. Okta reads the client configuration from the document, so anything the document declares becomes part of the client definition.

A CIMD can't establish a shared secret. The document must not contain `client_secret`, `client_secret_expires_at`, private key material, or a `token_endpoint_auth_method` value that relies on a symmetric secret.

An outage at the URL, or an edit that makes the document invalid, breaks token requests for the app.

See the following resources for the full CIMD specification, beyond the properties that Okta requires:

- [OAuth Client ID Metadata Document](https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/) (IETF Internet-Draft)
- [CIMD - OAuth Client ID Metadata Documents](https://client.dev)

## End-to-end flow

You complete the first three steps in your Okta org. The app owner completes the last two in their own code.

1. [Add a CIMD client to an app integration](#add-a-cimd-client-to-an-app-integration), either by [registering a new app integration](#register-a-new-app-integration) or by [converting an existing one](#convert-an-existing-app-integration). This adds the CIMD URL to an allowlist in your org. No OAuth client exists yet.
1. [Assign users to the app integration](#assign-users-to-the-app-integration) so that they can authorize the app.
1. [Scope an authorization server policy to the CIMD client](#scope-an-authorization-server-policy-to-a-cimd-client) so that your authorization server issues tokens to it.
1. The app [requests a token](#request-a-token-with-the-cimd-client-id) and sends the CIMD URL as its `client_id`. Okta matches the URL against the allowlist, retrieves the document, and creates the OAuth client from the values in it.
1. Okta returns an access token. The app sends that access token when it calls your APIs.

## Add a CIMD client to an app integration

To give an app integration a CIMD client, either register a new app integration or convert an existing one. Both paths use the `settings.oauthClient.cimdClient` and `settings.oauthClient.cimdUrl` properties, and Okta applies the same validation to the URL.

Okta validates only the URL, not the document that it points to. The request fails in any of the following cases:

- The request doesn't include a `cimdUrl` value.
- The URL isn't an HTTPS URL with a path component, or it resolves to an internal address.
- The URL is longer than 2048 characters.
- Your org already has another app integration registered with this URL.

CIMD URL matching is exact. Okta doesn't support pattern or wildcard matching, and it compares URLs as literal strings. `https://partner.example.com/app` and `https://partner.example.com:443/app` are different URLs.

### Register a new app integration

1. Send a POST request to the Create an application [endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/application/other/createapplication). Use the following request example.
1. Set `settings.oauthClient.cimdClient` to `true` and `settings.oauthClient.cimdUrl` to the CIMD URL.

Don't send `redirect_uris`, `grant_types`, `response_types`, or a `token_endpoint_auth_method`. Okta reads these values from the document. You still need to send `application_type`.

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS {apiToken}" \
-d '{
  "name": "oidc_client",
  "label": "Partner App",
  "signOnMode": "OPENID_CONNECT",
  "settings": {
    "oauthClient": {
      "application_type": "web",
      "cimdClient": true,
      "cimdUrl": "https://partner.example.com/.well-known/cimd/partner-app.json"
    }
  }
}' "https://{yourOktaDomain}/api/v1/apps"
```

### Convert an existing app integration

> **Note:** Conversion is permanent. You can't convert a CIMD app integration back to an Okta-generated client ID. Universal Logout and Single Logout don't apply to a CIMD app integration.

Send a `PUT` request to `/api/v1/apps/{appId}` with `settings.oauthClient.cimdClient` set to `true` and `settings.oauthClient.cimdUrl` set to the CIMD URL.

Conversion replaces the app integration's Okta-generated client with a CIMD client. Okta makes the following changes:

- Okta deletes the existing client, its client secret, and any JWKS keys stored in Okta.
- Okta revokes refresh tokens issued to the previous client ID.
- Okta removes the app integration's Universal Logout and Single Logout configuration, along with any network zone bound to the previous client ID.
- Okta disables Federation Broker Mode for the app integration.

After conversion, the previous client ID no longer identifies a client in your org. Requests that send it as the `client_id` fail, and Okta revokes any refresh token that it issued to that client ID. If you convert an app to use CIMD, coordinate the change with the app owner so that the app starts sending the CIMD URL as its `client_id` at the same time.

If the app integration is bound to an AI agent, you can't change its `cimdUrl` through the Apps API. Configure the CIMD URL on the AI agent instead. See [Register AI agents with a Client ID Metadata Document (CIMD)](/docs/guides/ai-agent-cimd-registration/).

## Assign users to the app integration

Assign users or groups to the app integration the same way that you assign them for any other app integration. CIMD doesn't change assignment behavior. See [Assign app integrations](https://help.okta.com/okta_help.htm?type=oie&id=ext-assign-apps).

## Scope an authorization server policy to a CIMD client

Scope a custom authorization server access policy to a CIMD client, the same way that you scope it to any other client. If your policy is scoped to specific clients rather than to all clients, add the CIMD client before the app requests a token.

1. Retrieve the app instance ID by using the List all applications [endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/application/other/listapplications).
1. In the `cimd` array in your authorization server's access policy client conditions, set `matchType` to `APP` and the app instance ID as the `value`.

   ```json
   {
     "conditions": {
       "clients": {
         "include": ["0oaAbc123"],
         "cimd": [
           { "matchType": "APP", "value": "0oa1x2abcDEfGhIjK4l5" }
         ]
       }
     }
   }
   ```

## Request a token with the CIMD client ID

Okta accepts the CIMD URL as the `client_id` in an OAuth request, in place of an Okta-generated client ID. The first time that the app makes a request, Okta matches the `client_id` against the CIMD URLs registered in your org, retrieves the document, creates the OAuth client from it, and then processes the request.

Start an authorization code flow by sending the CIMD URL as the `client_id` to the `/authorize` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/authorizeCustomAS) of your custom authorization server:

```bash
https://{yourOktaDomain}/oauth2/{authorizationServerId}/v1/authorize?client_id=https%3A%2F%2Fpartner.example.com%2F.well-known%2Fcimd%2Fpartner-app.json&response_type=code&scope=openid&redirect_uri=https%3A%2F%2Fpartner.example.com%2Fcallback&state={state}
```

The `redirect_uri` must match one of the `redirect_uris` in the document.

Exchange the authorization code for tokens at the `/token` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/tokenCustomAS). A CIMD client has no client secret, so a confidential client authenticates with `private_key_jwt`.

1. Build a JWT and sign it with the private key that matches a public key in the JWKS that the document's `jwks_uri` or `jwks` property provides. Set both `iss` and `sub` to the CIMD URL. See [Build a JWT for client authentication](/docs/guides/build-self-signed-jwt/).
1. Send the signed JWT as the `client_assertion` parameter, and set `client_assertion_type` to `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`.

```bash
curl --request POST https://{yourOktaDomain}/oauth2/{authorizationServerId}/v1/token \
    --header "Content-Type: application/x-www-form-urlencoded" \
    --data-urlencode "grant_type=authorization_code" \
    --data-urlencode "code={authorizationCode}" \
    --data-urlencode "redirect_uri=https://partner.example.com/callback" \
    --data-urlencode "client_id=https://partner.example.com/.well-known/cimd/partner-app.json" \
    --data-urlencode "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer" \
    --data-urlencode "client_assertion={signedJwt}"
```

A public client, such as a single-page app or a native app, uses Proof Key for Code Exchange (PKCE) instead of a client assertion. Send the `code_verifier` parameter in the token request.

To confirm which client Okta resolved, decode the access token and check the `cid` claim. For a CIMD client, `cid` is the CIMD URL.

## See also

- [Register AI agents with a Client ID Metadata Document (CIMD)](/docs/guides/ai-agent-cimd-registration/)
- [Create an app integration](/docs/guides/create-an-app-integration/)
- [Rotate client secrets](/docs/guides/client-secret-rotation-key/)
- [OAuth Client ID Metadata Document](https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/) (IETF Internet-Draft)
- [CIMD - OAuth Client ID Metadata Documents](https://client.dev)
