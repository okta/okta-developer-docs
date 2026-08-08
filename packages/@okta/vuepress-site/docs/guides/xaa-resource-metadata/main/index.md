---
title: Expose XAA metadata for your resource app
excerpt: Expose XAA discovery metadata for your resource app
layout: Guides
---

Expose standard metadata so that requesting apps can discover information required to interact with your protected resource app and its authorization server for Cross App Access (XAA).

---

#### Learning outcomes

Understand the well-known discovery metadata requirements for your resource app and authorization server:

* Authorization server metadata discovery URI: `.well-known/oauth-authorization-server`
* Protected resource metadata discovery URI: `.well-known/oauth-protected-resource`

#### What you need

* A resource app that provides an API server service
* An authorization server that protects your resource app and is configured to issue scoped access tokens for your app

---

## Overview

To establish a Cross App Access (XAA) connection to your resource app and its authorization server, requesting clients need to understand how your app handles token exchanges and authorization.

When you build an XAA resource app, provide discovery metadata through a standard, well-known URI so that requesting apps can determine your OAuth 2.0 protected resources information. See [RFC 9728: OAuth 2.0 Protected Resource Metadata](https://datatracker.ietf.org/doc/html/rfc9728).

The authorization server protecting your resource app also needs to provide discovery metadata, through a well-known URI, about its supported grant types and authorization grant profiles. See [RFC 8414: OAuth 2.0 Authorization Server Metadata](https://datatracker.ietf.org/doc/html/rfc8414) and [Identity Assertion JWT Authorization Grant](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-identity-assertion-authz-grant).

Without these discovery metadata URIs, token exchange requests can fail silently or be rejected.

## Authorization server metadata

The authorization server metadata URI provides metadata about your authorization server's OAuth 2.0 configuration, including supported grant types and authorization grant profiles.

### URI location

Implement your authorization server metadata in the following location:

```shell
GET https://{your-resource-auth-server-domain}/.well-known/oauth-authorization-server
```

If your app already hosts a `.well-known/oauth-authorization-server` URI, update your existing response to include the required XAA properties. You don't need to rebuild your authorization server.

### Required properties

Your authorization server metadata response must return a JSON object containing the following required XAA properties alongside your standard OAuth 2.0 authorization server metadata:

| Property | Type | Description | Required value |
| --- | --- | --- | --- |
| `grant_types_supported` | Array of strings | Lists the OAuth 2.0 grant types supported by the authorization server | Must include `urn:ietf:params:oauth:grant-type:jwt-bearer` |
| `authorization_grant_profiles_supported` | Array of strings | Lists the identity assertion grant profiles supported by the authorization server | Must include `urn:ietf:params:oauth:grant-profile:id-jag` |

#### Example response

The following JSON example shows an authorization server metadata response configured for XAA:

```JSON
{
  "issuer": "https://api.example.com",
  "authorization_endpoint": "https://api.example.com/oauth2/v1/authorize",
  "token_endpoint": "https://api.example.com/oauth2/v1/token",
  "jwks_uri": "https://api.example.com/oauth2/v1/keys",
  "response_types_supported": [
    "code",
    "code token"
  ],
  "grant_types_supported": [
    "authorization_code",
    "urn:ietf:params:oauth:grant-type:jwt-bearer"
  ],
  "authorization_grant_profiles_supported": [
    "urn:ietf:params:oauth:grant-profile:id-jag"
  ],
  "scopes_supported": [
    "example.read",
    "example.manage",
    "offline_access"
  ],
  "token_endpoint_auth_methods_supported": [
    "client_secret_basic",
    "client_secret_post",
    "client_secret_jwt",
    "private_key_jwt",
    "none"
  ]
}
```

## Protected resource metadata

The protected resource metadata conforms to [RFC 9728 (OAuth 2.0 Protected Resource Metadata)](https://datatracker.ietf.org/doc/html/rfc9728). It allows requesting apps to identify the protected resource server (the resource app), the authorization servers trusted to issue access tokens, and the required OAuth 2.0 scopes.

> **Note**: The protected resource metadata URI is required for Model Context Protocol (MCP) servers. For all other resource server types, it's optional but recommended, as it enables requesting apps to automatically discover your token requirements.

### URI location

Implement your protected resource metadata in the following location:

```bash
GET https://{your-resource-server-domain}/.well-known/oauth-protected-resource
```

### Required properties

Your protected resource metadata response must return a JSON object conforming to [RFC 9728](https://datatracker.ietf.org/doc/html/rfc9728) with at least the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `resource` | String | The canonical URI identifying your protected resource server |
| `authorization_servers` | Array of strings | The OAuth 2.0 authorization server issuer identifiers for the protected resource server. This is a list of authorization server URIs that can issue access tokens for the resource server. |
| `scopes_supported` | Array of strings | The OAuth 2.0 scope strings supported by the resource server for API access control |

#### Example response

The following JSON example shows a protected resource metadata response:

```JSON
{
  "resource": "https://api.example.com",
  "authorization_servers": [
    "https://auth.example.com"
  ],
  "scopes_supported": [
    "myAPI.read",
    "myAPI.manage",
    "profile",
    "email",
    "phone"
  ],
  "bearer_methods_supported": [
    "header",
    "body"
  ]
}
```

> **Note:** Your API's audience URL (`resource`) must match the requesting app's configuration exactly, including trailing slashes. A trailing slash mismatch is a primary cause of token validation failures.

## Verify your discovery metadata URIs

After you publish your URIs, verify that they're publicly reachable, correctly formatted, and returning the required metadata payloads.

### Test using cURL

Execute cURL commands in your terminal to verify that your metadata discovery request returns a valid JSON payload and appropriate properties.

#### Verify your authorization server metadata URI

```bash
curl -s -H "Accept: application/json" https://{your-resource-auth-server-domain}/.well-known/oauth-authorization-server | jq .
```

Confirm that `grant_types_supported` includes `urn:ietf:params:oauth:grant-type:jwt-bearer` and `authorization_grant_profiles_supported` includes `urn:ietf:params:oauth:grant-profile:id-jag`.

#### Verify your protected resource metadata URI

```shell
curl -s -H "Accept: application/json" https://{your-resource-server-domain}/.well-known/oauth-protected-resource | jq .
```

Confirm that the `resource` property matches your resource server issuer URL and that `authorization_servers` lists your trusted authorization server.

<!--
## Next steps

Now that your discovery metadata URIs are configured and verified:

* [Validate ID-JAG tokens]: Extend your authorization server to validate the ID-JAG token and resolve the user’s identity before issuing scoped access tokens.
* [Build a resource app]: Follow the resource app journey if your app needs to accept incoming XAA authorization requests.
-->