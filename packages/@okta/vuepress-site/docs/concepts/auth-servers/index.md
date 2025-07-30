---
title: Authorization servers
meta:
  - name: description
    content: An overview of what an authorization server is and the types of authorization servers available at Okta.
---

# Authorization servers

<ApiAmProdWarning />

Authentication and authorization are essential to app development. Projects such as building a portal for your partners or developing an internal IT app for your employees need the right authentication and authorization support. With Okta, you can control access to your apps and resources using the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid/) protocols. At the heart of these protocols is the authorization server. It verifies credentials and issues access tokens that grant permissions to access specific resources on behalf of users or clients.

## What is an authorization server

An authorization server controls access to protected resources within a security domain for a principal user or a client app. Its role in the OAuth 2.0 or OpenID Connect (OIDC) protocol is to receive client requests for access tokens and issue them based on successful authentication and consent by the resource owner. At its core, an authorization server is an engine for minting tokens and enforcing access policies. Each server features a unique issuer URI and its own distinct signing key, which establishes a clear boundary between security domains.

Okta authorization servers support both the OAuth 2.0 and OIDC protocols:

* [OAuth 2.0](/docs/concepts/oauth-openid/#oauth-2-0) is used for securing API resources and web services. The authorization server issues an access token after it successfully authenticates the user or client. The resource server uses the access token to validate the user or client's level of authorization and access.

* [OIDC](/docs/concepts/oauth-openid/#openid-connect) is used to authenticate users with a web app. The authorization server issues an ID token (in addition to an access token) after it successfully authenticates the user. The app uses the ID token returned from the authorization server to know if a user is authenticated. The app also uses the ID token to obtain profile information about the user, such as their username or locale. In the OIDC world, the authorization server that issues ID tokens is also known as the OpenID provider.

Okta provides two types of authorization servers:

* [Org authorization server](#org-authorization-server)
* [Custom authorization server](#custom-authorization-server)

## Org authorization server

Every Okta org comes equipped with a built-in org authorization server. The org authorization server issues access tokens for accessing Okta resources in your Okta org domain. Use the org authorization server to perform Single Sign-On (SSO) with Okta for your OIDC apps or to get an access token to access Okta APIs.

> **Note**: In the org authorization server, Okta is the resource server.

### Issuer - org authorization server

The issuer for access tokens from an org authorization server is `https://{yourOktaDomain}`. This is also the base URL of your Okta org.

You can't customize the org authorization server's audience, claims, policies, or scopes. Access tokens issued by the org authorization server are consumable and verifiable by Okta. They aren't intended for validation or use by your own apps or resource servers.

### Discovery endpoints - org authorization servers

The following discovery endpoints return OAuth 2.0 or OIDC metadata related to your org authorization server:

* **OIDC:** `https://{yourOktaDomain}/.well-known/openid-configuration`
* **OAuth 2.0:** `https://{yourOktaDomain}/.well-known/oauth-authorization-server`

Clients can use this information to programmatically configure their interactions with Okta.

See [Retrieve the OpenID Connect metadata](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/getWellKnownOpenIDConfiguration) for an org authorization server.

## Custom authorization server

Custom authorization servers allow you to define and apply authorization policies to secure your own APIs and resources.

If you subscribe to the Okta [API Access Management](/docs/concepts/api-access-management/) product, you can [create multiple custom authorization servers](/docs/guides/customize-authz-server/main/#create-an-authorization-server) within your Okta org. For each custom authorization server, you can define your own OAuth 2.0 [scopes](/docs/guides/customize-authz-server/main/#create-scopes), [claims](/docs/guides/customize-authz-server/main/#create-claims), and [access policies](/docs/guides/customize-authz-server/main/#create-access-policies). Your own apps or resource servers use and validate the access tokens minted by your custom authorization server. See [Validate access tokens](https://developer.okta.com/docs/guides/validate-access-tokens/) and [Validate ID tokens](https://developer.okta.com/docs/guides/validate-id-tokens/main/).

> **Note:** You can't mix tokens between different authorization servers. By design, authorization servers don't have trust relationships with each other.

See [Create an authorization server](/docs/guides/customize-authz-server/main/#create-an-authorization-server) from the Admin Console, or [Create an authorization server](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AuthorizationServer/#tag/AuthorizationServer/operation/createAuthorizationServer) from the API.

### Issuer - custom authorization server

For custom authorization servers that you create yourself, Okta returns a unique authorization server identifier (such as `aus9o8wzkhckw9TLa0h7z`). Use this identifier when you see the `{authorizationServerId}` variable for your custom authorization server. The issuer for access tokens from your custom authorization server is in the following format:

`https://{yourOktaDomain}/oauth2/{authorizationServerId}`

### Discovery endpoints - custom authorization server

The following endpoints return OAuth 2.0 or OIDC metadata related to a custom authorization server:

* **OAuth 2.0:** `https://{yourOktaDomain}/oauth2/{authorizationServerId}/.well-known/oauth-authorization-server`
* **OIDC:** `https://{yourOktaDomain}/oauth2/{authorizationServerId}/.well-known/openid-configuration`

 Clients can use this information to programmatically configure their interactions with Okta. Custom scopes and custom claims aren't returned.

See [Retrieve the OAuth 2.0 metadata](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/getWellKnownOAuthConfigurationCustomAS) and [Retrieve the OpenID Connect metadata](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/getWellKnownOpenIDConfigurationCustomAS) for a custom authorization server.

### Default custom authorization server

If you have an [Okta Integrator Free Plan org](https://developer.okta.com/signup/) or if you're subscribed to the Okta [API Access Management](https://developer.okta.com/docs/concepts/api-access-management/) product, your org is pre-configured with a custom authorization server named `default`. The default custom authorization server also has `default` as its authorization server ID.

The default custom authorization server includes a basic access policy and a rule to quickly get you started. For simple use cases, this out-of-the-box custom authorization server is usually all that you need. You can use this custom authorization server to test Okta sample apps or your custom apps. You can add scopes, claims, and access policies to the default custom authorization server to support your use case. You can't delete the default custom authorization server. However, you can disable or rename it.

> **Note**: In the Admin Console, a **Default** label appears just below the `default` custom authorization server name. If you rename this authorization server, the **Default** label still appears, which helps you identify it as the default authorization server that was pre-configured.

#### Discovery endpoints - default custom authorization server

The OAuth 2.0 and OIDC discovery endpoints for the default custom authorization server are:

* **OAuth 2.0:** `https://{yourOktaDomain}/oauth2/default/.well-known/oauth-authorization-server`
* **OIDC:** `https://{yourOktaDomain}/oauth2/default/.well-known/openid-configuration`

## Which authorization server should you use

If you're looking to add SSO for your OIDC-based apps, you can use your org authorization server. Also, use the org authorization server if you want to use [OAuth 2.0 bearer tokens to access Okta APIs](/docs/guides/implement-oauth-for-okta/). Only the org authorization server can mint access tokens that contain Okta API scopes.

A custom authorization server is necessary when you're building and protecting your own APIs, need fine-grained control over token contents (scopes and claims), or require specific access policies for different user groups or apps. If your app needs to validate the token itself, a custom authorization server is the appropriate choice.

This table describes the capabilities supported by a custom authorization server (includes the default custom authorization server) and capabilities supported by the org authorization server.

| Capabilities                               | Custom authorization server          | Org authorization server    |
| :----------------------------------------- | :----------------------------------- | :-------------------------- |
| SSO with OpenID Connect                    | Yes                                  | Yes                         |
| Use Okta Developer SDKs & Widgets for SSO  | Yes                                  | Yes                         |
| Retrieve user profile in ID token          | Yes                                  | Yes                         |
| Apply authorization policies to custom APIs| Yes                                  | No                          |
| Add custom scopes or claims to tokens      | Yes                                  | No                          |
| Integrate with an API Gateway              | Yes                                  | No                          |
| Machine-to-machine or microservices        | Yes                                  | No                          |
| Mint access tokens with Okta API scopes    | No                                   | Yes                         |
