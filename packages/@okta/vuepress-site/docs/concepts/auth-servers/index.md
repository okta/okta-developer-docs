---
title: Authorization servers
meta:
  - name: description
    content: An overview of what an authorization server is and the types of authorization servers available at Okta.
---

# Authorization servers

<ApiAmProdWarning />

Authentication and authorization are essential to app development. Projects such as building a portal for your partners or developing an internal IT app for your employees need the right authentication and authorization support. With Okta, you can control access to your app using both [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid/). Use Okta as your authorization server to retain all of your user information and grant users tokens to control their authorization and authentication.

## What is an authorization server

At its core, an authorization server is simply an engine for minting OpenID Connect (OIDC) or [OAuth 2.0](/docs/concepts/oauth-openid/#oauth-2-0) tokens. An authorization server is also used to apply access policies. Each authorization server has a unique issuer URI and its own signing key for tokens to keep a proper boundary between security domains.

## What you can use an authorization server for

You can use an authorization server to perform Single Sign-On (SSO) with Okta for your OIDC apps. You can also use an authorization server to secure your own APIs and provide user authorization to access your web services.

OIDC is used to authenticate users with a web app. The app uses the ID token returned from the authorization server to know if a user is authenticated. The app also uses the ID token to obtain profile information about the user, such as their username or locale. OAuth 2.0 is used to authorize user access to an API. An access token is used by the resource server to validate a user's level of authorization/access. When using OIDC or OAuth, the authorization server authenticates a user and issues an ID token and/or an access token.

> **Note:** You can't mix tokens between different authorization servers. By design, authorization servers don't have trust relationships with each other.

## Available authorization server types

Okta has two types of authorization servers: the org authorization server and the custom authorization server.

### Org authorization server

Every Okta org comes with a built-in authorization server called the org authorization server. The base URL for the org authorization server is `https://{yourOktaOrg}`.

Use the org authorization server to perform SSO with Okta for your OIDC apps or to get an access token for the Okta APIs. You can't customize audience, claims, policies, or scopes for this authorization server.

The issuer for access tokens from an org authorization server is `https://{yourOktaOrg}`, which indicates that only Okta can consume or validate it. Your apps can't use or validate this access token. The contents of the access token are subject to change at any time without notice. Therefore, any attempts to validate the access token may not work in the future.

#### Discovery endpoints - org authorization servers

The following discovery endpoints return OpenID Connect or OAuth 2.0 metadata related to your org authorization server. Clients can use this information to programmatically configure their interactions with Okta.

**OpenID:** `https://{yourOktaOrg}/.well-known/openid-configuration`

**OAuth:** `https://{yourOktaOrg}/.well-known/oauth-authorization-server`

### Custom authorization server

You can use a custom authorization server to create and apply authorization policies to secure your APIs. The custom authorization server creates the access token and then your APIs consume the token.

Okta allows you to [create multiple custom authorization servers](/docs/guides/customize-authz-server/main/#create-an-authorization-server) within a single Okta org. Use these custom authorization servers to protect your own resource servers. Within each authorization server, you can define your own custom OAuth 2.0 [scopes](/docs/guides/customize-authz-server/main/#create-scopes), [claims](/docs/guides/customize-authz-server/main/#create-claims), and [access policies](/docs/guides/customize-authz-server/main/#create-access-policies) to support authorization for your APIs.

#### Default custom authorization server

Okta provides a pre-configured custom authorization server called `default`. A `Default` label also appears just below the name. If you rename the authorization server, the `Default` label still appears, which helps identify it as the default authorization server that was created out of the box. You can't delete the default custom authorization server. However, you can disable it. This authorization server includes a basic access policy and a rule to quickly get you started. For simple use cases, this out-of-the-box custom authorization server is usually all that you need.

To use the `default` custom authorization server, use `default` as the authorization server ID:

`https://{yourOktaDomain}/api/v1/authorizationServers/default`

For custom authorization servers that you create yourself, the `{authorizationServerId}` is a random ID such as `aus9o8wzkhckw9TLa0h7z`.

`https://{yourOktaDomain}/api/v1/authorizationServers/{authorizationServerId}`

#### Discovery endpoints - custom authorization server

The following endpoints return OIDC or OAuth 2.0 metadata related to a custom authorization server. Clients can use this information to programmatically configure their interactions with Okta. Custom scopes and custom claims aren't returned.

The OpenID and OAuth discovery endpoints for a custom authorization server are:

**OpenID:** `https://{yourOktaDomain}/oauth2/{authorizationServerId}/.well-known/openid-configuration`

**OAuth:** `https://{yourOktaDomain}/oauth2/{authorizationServerId}/.well-known/oauth-authorization-server`

The OpenID and OAuth discovery endpoints for the default custom authorization server are:

**OpenID:** `https://{yourOktaDomain}/oauth2/default/.well-known/openid-configuration`

**OAuth:** `https://{yourOktaDomain}/oauth2/default/.well-known/oauth-authorization-server`

## Which authorization server should you use

If you're looking to add SSO for your OIDC-based apps, you can use your org authorization server. Also, use the org authorization server if you want to use [OAuth 2.0 bearer tokens with your Okta APIs](/docs/guides/implement-oauth-for-okta/). Only the org authorization server can mint access tokens that contain Okta API scopes.

If your app has requirements like more scopes or customizing rules for when to grant scopes, then you need to [create a custom authorization server](/docs/guides/customize-authz-server/). Also, create a custom authorization server if you need more authorization servers with different scopes and claims.

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
