---
title: Authorization Servers
meta:
  - name: description
    content: An overview of what an authorization server is and the types of authorization servers available at Okta.
---
## What is an authorization server

At its core, an authorization server is simply an engine for minting OpenID Connect or [OAuth 2.0](/docs/concepts/oauth-openid/#oauth-2-0) tokens. An authorization server is also used to apply access policies. Each authorization server has a unique issuer URI and its own signing key for tokens to keep a proper boundary between security domains.

## What you can use an authorization server for

You can use an authorization server to perform Single Sign-On (SSO) with Okta for your OpenID Connect apps, and to secure your own APIs and provide user authorization to access your web services.

OpenID Connect is used to authenticate users with a web app. The app uses the ID token that is returned from the authorization server to know if a user is authenticated and to obtain profile information about the user, such as their username or locale. OAuth 2.0 is used to authorize user access to an API. An access token is used by the resource server to validate a user's level of authorization/access. When using OpenID Connect or OAuth, the authorization server authenticates a user and issues an ID token and/or an access token.

> **Note:** You can't mix tokens between different authorization servers. By design, authorization servers don't have trust relationships with each other.

## Available authorization server types

Okta has two types of authorization servers: the Org Authorization Server and Custom Authorization Servers.

### Org Authorization Server

Every Okta org comes with a built-in authorization server called the Org Authorization Server. The base URL for the Org Authorization Server is `https://${yourOktaOrg}`.

You use the Org Authorization Server to perform SSO with Okta or to get an access token for the Okta APIs. You can't customize this authorization server with regards to audience, claims, policies, or scopes. Additionally, the resulting access token's issuer is `https://${yourOktaOrg}`, which indicates that only Okta can consume or validate it. The access token can't be used or validated by your own applications.

#### Org Authorization Server discovery endpoints

The following discovery endpoints return OpenID Connect or OAuth 2.0 metadata related to your Org Authorization Server. Clients can use this information to programmatically configure their interactions with Okta.

**OpenID:** `https://${yourOktaOrg}/.well-known/openid-configuration`

**OAuth:** `https://${yourOktaOrg}/.well-known/oauth-authorization-server`

### Custom Authorization Server

You use a Custom Authorization Server to create and apply authorization policies to secure your APIs. An access token that is minted by a Custom Authorization Server is consumed by your APIs.

Okta allows you to create multiple Custom Authorization Servers within a single Okta org that you can use to protect your own resource servers. Within each authorization server, you can define your own custom OAuth 2.0 scopes, claims, and access policies to support authorization for your APIs.

#### Default Custom Authorization Server

Okta provides a pre-configured Custom Authorization Server called `default`. It includes a basic access policy and a rule to quickly get you started. For simple use cases, this out-of-the-box Custom Authorization Server is usually all that you need.

To use the `default` Custom Authorization Server, use `default` as the authorization server ID:

`https://${yourOktaDomian}/api/v1/authorizationServers/default`

For Custom Authorization Servers that you create yourself, the `${authServerId}` is a random ID such as `aus9o8wzkhckw9TLa0h7z`.

`https://${yourOktaDomain}/api/v1/authorizationServers/${authServerId}`

#### Custom Authorization Server discovery endpoints

The following endpoints return OpenID Connect or OAuth 2.0 metadata related to a Custom Authorization Server. Clients can use this information to programmatically configure their interactions with Okta. Custom scopes and custom claims aren't returned.

The OpenID and OAuth discovery endpoints for a Custom Authorization Server are:

**OpenID:** `https://${yourOktaDomain}/oauth2/<server id>/.well-known/openid-configuration`

**OAuth:** `https://${yourOktaDomain}/oauth2/<server id>/.well-known/oauth-authorization-server`

The OpenID and OAuth discovery endpoints for the default Custom Authorization Server are:

**OpenID:** `https://${yourOktaDomain}/oauth2/default/.well-known/openid-configuration`

**OAuth:** `https://${yourOktaDomain}/oauth2/default/.well-known/oauth-authorization-server`

## Which authorization server should you use

If you are just looking to add SSO for your OpenID Connect-based applications, you can use your Org Authorization Server. You should also use the Org Authorization Server if you want to use [OAuth 2.0 bearer tokens with your Okta APIs](/docs/guides/implement-oauth-for-okta/). Only the Org Authorization Server can mint access tokens that contain Okta API scopes.

If your application has requirements such as additional scopes, customizing rules for when to grant scopes, or you need additional authorization servers with different scopes and claims, then you need to [create a Custom Authorization Server](/docs/guides/customize-authz-server/overview/).

The following table describes which capabilities are supported by the Custom Authorization Server (includes the Default Custom Authorization Server) and which are supported by the Okta Org Authorization Server.

| Capabilities                               | Custom Authorization Server          | Org Authorization Server    |
| :----------------------------------------- | :----------------------------------- | :-------------------------- |
| SSO with OpenID Connect                    | Yes                                  | Yes                         |
| Use Okta Developer SDKs & Widgets for SSO  | Yes                                  | Yes                         |
| Retrieve user profile in ID Token          | Yes                                  | Yes                         |
| Apply authorization policies to custom APIs| Yes                                  | No                          |
| Add custom scopes or claims to tokens      | Yes                                  | No                          |
| Integrate with an API Gateway              | Yes                                  | No                          |
| Machine-to-Machine or Microservices        | Yes                                  | No                          |
| Mint Access Tokens with Okta API Scopes    | No                                   | Yes                         |

## Key rotation

Key rotation is when a signing key is retired and replaced by generating a new cryptographic key. Rotating keys on a regular basis is an industry standard and follows cryptographic best practices.

> **Note:** The current Okta key rotation schedule is four times a year, but can change without notice.

If you are using a Custom Authorization Server, configure and perform key rollover/rotation at the [Authorization Server level](/docs/reference/api/authorization-servers/#credentials-object).

If you are using the Org Authorization Server, configure and perform key rollover/rotation at the [client level](/docs/reference/api/apps/#generate-new-application-key-credential).

### Key rotation for Custom Authorization Servers

* For security purposes, Okta automatically rotates keys used to sign tokens.

* In case of an emergency, Okta can rotate keys as needed.

* Okta always publishes keys to the `jwks_uri`.

* To save the network round trip, your app should cache the `jwks_uri` response locally. The [standard HTTP caching headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) are used and should be respected.

* You can switch the Authorization Server key rotation mode by updating the Authorization Server's `rotationMode` property. For more information see the API Reference: [Authorization Server Credentials Signing Object](/docs/reference/api/authorization-servers/#credentials-object).

> **Caution:** Keys used to sign tokens automatically rotate and should always be resolved dynamically against the published JWKS. Your app might fail if you hardcode public keys in your applications. Be sure to include key rollover in your implementation.

> **Note:** When using a Custom Authorization Server, you may work with a client that can't call the `/keys` endpoint to dynamically fetch the JWKS. You can pin that specific client to a specific key by [generating a key credential](/docs/reference/api/apps/#generate-new-application-key-credential) and [updating the application](/docs/reference/api/apps/#update-key-credential-for-application) to use it for signing. This overrides the Custom AS rollover/pinning behavior for that client. Should you need to turn off automatic key rotation for the entire Custom Authorization Server, you can do that by switching the **Signing Key Rotation** value to **Manual** in the Admin Console.

### Key rotation for the Org Authorization Server

* For security purposes, Okta automatically rotates keys used to sign the ID token.

* Okta doesn't expose the public keys used to sign the access token minted by the Org Authorization Server. You can use the [`/introspect`](/docs/reference/api/oidc/#introspect) endpoint to validate the access token.

* You can't manually rotate the Org Authorization Server's signing keys.

> **Note:** If your application can't retrieve keys dynamically, you can pin that specific client to a specific key by [generating a key credential](/docs/reference/api/apps/#generate-new-application-key-credential) and [updating the application](/docs/reference/api/apps/#update-key-credential-for-application) to use it for signing.
