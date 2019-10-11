---
title: Authorization Servers
meta:
  - name: description
    content: An overview of what an authorization server is and the types of authorization servers available at Okta.
---
## What is an authorization server

At its core, an authorization server is simply an engine for minting OpenID Connect or OAuth 2.0 tokens. An authorization server is also used to apply access policies. Each authorization server has a unique issuer URI and its own signing key for tokens to keep a proper boundary between security domains.

## What you can use an authorization server for

You can use an authorization server to perform Single Sign-On (SSO) with Okta for your OpenID Connect (OIDC) apps, and to secure your own APIs and provide user authorization to access your web services.

OIDC is used to authenticate users with a web app. The app uses the ID token that is returned from the authorization server to know if a user is authenticated and to obtain profile information about the user, such as their username or locale. OAuth 2.0 is used to authorize user access to an API. An app uses an access token to validate a user's identity. When using OIDC or OAuth, the authorization server authenticates a user and issues an ID token and/or an access token.

> **Note:** You can't mix tokens between different authorization servers. By design, authorization servers don't have trust relationships with each other.

## Authorization server types that are available in Okta

Okta has two types of authorization servers: the Org Authorization Server and Custom Authorization Servers.

### Org Authorization Server

Every Okta org comes with a built-in authorization server called the Org Authorization Server (Org AS). The URL for the Org AS is `https://${yourOktaOrg}`.

You use the Org AS to perform SSO with Okta or to get an access token for the Okta APIs. You can't customize this authorization server with regards to audience, claims, policies, or scopes. Additionally, the resulting access token's issuer is `https://${yourOktaOrg}`, which indicates that only Okta can consume or validate it. The access token can't be used or validated by your own applications.

#### Org Authorization Server discovery endpoints

The following discovery endpoints return OIDC or OAuth 2.0 metadata related to your Org AS. Clients can use this information to programmatically configure their interactions with Okta. Custom scopes and custom claims aren't returned.

**OpenID:** `https://${yourOktaOrg}/.well-known/openid-configuration`

**OAuth:** `https://${yourOktaOrg}/.well-known/oauth-authorization-server`

### Custom Authorization Server

You use a Custom Authorization Server to create and apply authorization policies to secure your APIs. An access token that is minted by a Custom Authorization Server is consumed by your APIs.

Okta allows you to create multiple Custom Authorization Servers within a single Okta org that you can use to protect your own resource servers. Within each authorization server, you can define your own custom OAuth 2.0 scopes, claims, and access policies to support authorization for your APIs.

#### Default Custom Authorization Server

Okta provides a pre-configured Custom Authorization Server called `default`. It includes a basic access policy and a rule to quickly get you started. For simple use cases, this default Custom Authorization Server is usually all that you need.

To use the `default` Custom Authorization Server, use `default` as the authorization server ID:

`https://${yourOktaDomian}/api/v1/authorizationServers/default`

For Custom Authorization Servers that you create yourself, the `${authServerId}` is a random ID such as `aus9o8wzkhckw9TLa0h7z`.

`https://${yourOktaDomain}/api/v1/authorizationServers/${authServerId}`

#### Custom Authorization Server discovery endpoints

The following endpoints return OIDC or OAuth 2.0 metadata related to a Custom Authorization Server. Clients can use this information to programmatically configure their interactions with Okta. Custom scopes and custom claims aren't returned.

The OpenID and OAuth discovery endpoints for a Custom Authorization Server are:

**OpenID:** `https://${yourOktaDomain}/oauth2/<server id>/.well-known/openid-configuration`

**OAuth:** `https://${yourOktaDomain}/oauth2/<server id>/.well-known/oauth-authorization-server`

The OpenID and OAuth discovery endpoints for the Default Authorization Server are:

**OpenID:** `https://${yourOktaDomain}/oauth2/default/.well-known/openid-configuration`

**OAuth:** `https://${yourOktaDomain}/oauth2/default/.well-known/oauth-authorization-server`

## Which authorization server should you use

If you are just looking to add SSO for your OIDC-based applications, you can use your Org AS. You should also use the Org AS if you want to use [OAuth2 bearer tokens with your Okta APIs](/docs/oauth-for-okta/). Only the Org Authorization Server can mint access tokens that contain Okta API scopes.

If your application has requirements such as additional scopes, customizing rules for when to grant scopes, or you need additional authorization servers with different scopes and claims, then you need to [create a Custom Authorization Server](/docs/guides/customize-authz-server/overview/).

The following table describes which capabilities are supported by the Default/Custom AS and which are supported by the Okta Org AS.

| Capabilities                               | Default/Custom AS  | Org AS    |
| :----------------------------------------- | :----------------- | :-------- |
| SSO with OIDC                              | Yes                | Yes       |
| Use Okta Developer SDKs & Widgets for SSO  | Yes                | Yes       |
| Retrieve user profile in ID Token          | Yes                | Yes       |
| Apply authorization policies to custom APIs| Yes                | No        |
| Add custom scopes or claims to tokens      | Yes                | No        |
| Integrate with an API Gateway              | Yes                | No        |
| Machine-to-Machine or Microservices        | Yes                | No        |
| Mint Access Tokens with Okta API Scopes    | No                 | Yes       |
