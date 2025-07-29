---
title: Authorization servers
meta:
  - name: description
    content: An overview of what an authorization server is and the types of authorization servers available at Okta.
---

# Authorization servers

<ApiAmProdWarning />

The authorization server is at the heart of the OAuth 2.0 framework. It controls access to protected resources within a security domain for a principal user or a client app. An authorization server verifies credentials and issues access tokens that grant permissions to access specific resources on behalf of principals. For example, an employee needs to authenticate with an authorization server for authorization to access specific company resources, or a service app uses a token issued by an authorization server to access API resources to accomplish a background task.

## What is an authorization server

An authorization server's role in the [OAuth 2.0 or OpenID Connect (OIDC)](/docs/concepts/oauth-openid/) framework is to receive client requests for access tokens and issue them based on successful authentication and consent by the resource owner. It acts as an engine for minting tokens and enforcing access policies. Each server features a unique issuer URI and its own distinct signing key, which establishes a clear boundary between security domains.

[OAuth 2.0](/docs/concepts/oauth-openid/#oauth-2-0) authorizes users or client apps to access scoped API resources. If the user or client app is authorized to access the API resources, the authorization server returns an access token. The resource server uses the access token to validate the user or app's level of authorization and access.

[OpenID Connect](/docs/concepts/oauth-openid/#openid-connect) extends OAuth 2.0 and authorizes users to access OpenID-scoped apps. If the user is successfully authenticated, the authorization server returns an additional ID token for the OIDC app. The OIDC app can use the ID token to obtain profile information about the user, such as their username or locale. In the OIDC world, the authorization server that issues ID tokens is also known as the OpenID provider.

Okta provides two types of OAuth 2.0 and OIDC authorization servers:

* Org authorization server
* Custom authorization servers

## Org authorization server

Every Okta org comes equipped with a built-in org authorization server (AS). The org AS issues access tokens for accessing Okta resources in your Okta org domain. Use the org AS to perform SSO with Okta for your OIDC apps or to get an access token for Okta APIs.

> **Note**: In the org authorization server, Okta is the resource server.

### Issuer - org authorization server

The issuer for access tokens from an org authorization server is https://{yourOktaOrg}. This is also the base URL of your Okta org.

You can't customize the org authorization server's audience, claims, policies, or scopes. Access tokens issued by the org authorization server are consumable and verifiable by Okta. They aren't intended for validation or use by your own apps or resource servers.

### Discovery endpoints - org authorization servers

The following discovery endpoints return OpenID Connect or OAuth 2.0 metadata related to your org authorization server. Clients can use this information to programmatically configure their interactions with Okta.

* **OpenID:** `https://{yourOktaOrg}/.well-known/openid-configuration`

  See [Retrieve the OpenID Connect metadata](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/getWellKnownOpenIDConfiguration).

* **OAuth:** `https://{yourOktaOrg}/.well-known/oauth-authorization-server`

## Custom authorization server

Custom authorization servers (AS) allow you to define and apply authorization policies to secure your own APIs and resources.

If you subscribe to Okta's API Access Management product, you can [create multiple custom authorization servers](/docs/guides/customize-authz-server/main/#create-an-authorization-server) within your Okta org. For each custom authorization server, you can define your own OAuth 2.0 [scopes](/docs/guides/customize-authz-server/main/#create-scopes), [claims](/docs/guides/customize-authz-server/main/#create-claims), and [access policies](/docs/guides/customize-authz-server/main/#create-access-policies). The access tokens minted by your custom authorization server are used and validated by your own apps or resource servers. See [Validate access tokens](https://developer.okta.com/docs/guides/validate-access-tokens/) and [Validate ID tokens](https://developer.okta.com/docs/guides/validate-id-tokens/main/).

> **Note:** You can't mix tokens between different authorization servers. By design, authorization servers don't have trust relationships with each other.

Use a custom authorization server to protect your own resources that’s tailored to your authorization needs within a security domain.

### Issuer - custom authorization server

For custom authorization servers that you create yourself, Okta returns a unique authorization server identifier (such as `aus9o8wzkhckw9TLa0h7z`). See [Create an authorization server](/docs/guides/customize-authz-server/main/#create-an-authorization-server). Use this authorization server ID whenever you see the `{authorizationServerId}` variable.

The issuer for access tokens from your custom authorization server is in the following format:

`https://{yourOktaDomain}/oauth2/{authorizationServerId}`

Where `{yourOktaDomain}` is your Okta domain and `{authorizationServerId}` is your assigned custom authorization server ID.

### Discovery endpoints - custom authorization server

The following endpoints return OIDC or OAuth 2.0 metadata related to a custom authorization server. Clients can use this information to programmatically configure their interactions with Okta. Custom scopes and custom claims aren't returned.

* **OpenID:** `https://{yourOktaDomain}/oauth2/{authorizationServerId}/.well-known/openid-configuration`

  See [Retrieve the OpenID Connect metadata](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/getWellKnownOpenIDConfigurationCustomAS).

* **OAuth:** `https://{yourOktaDomain}/oauth2/{authorizationServerId}/.well-known/oauth-authorization-server`

  See [Retrieve the OAuth 2.0 metadata](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/getWellKnownOAuthConfigurationCustomAS).

### Default custom authorization server

If you have an [Okta Integrator Free Plan org](https://developer.okta.com/signup/) or if you're subscribed to the Okta [API Access Management](https://developer.okta.com/docs/concepts/api-access-management/) product, your org is pre-configured with a custom authorization server called `default`.

The default custom authorization server includes a basic access policy and a rule to quickly get you started. For simple use cases, this out-of-the-box custom authorization server is usually all that you need. You can use this custom AS to test the sample apps or test your custom app. You can add scopes, claims, and access policies to this custom AS to support your use case. You can't delete the default custom AS. However, you can disable or rename it.

> **Note**: In the Admin Console, a **Default** label appears just below the `default` custom AS name. If you rename this authorization server, the **Default** label still appears, which helps you identify it as the default authorization server that was pre-configured.

---

To use the `default` custom authorization server, use `default` as the authorization server ID:

`https://{yourOktaDomain}/api/v1/authorizationServers/default`

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
