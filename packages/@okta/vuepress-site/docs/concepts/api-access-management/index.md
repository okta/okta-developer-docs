---
title: API Access Management
meta:
  - name: description
    content: With API Access Management, you can secure all of your APIs. Read about its benefits and how to get started.
---

# API Access Management with Okta

> **Note**: [The Okta Developer Edition](/signup/) makes most key developer features available by default for testing. The Okta API Access Management product is an optional add-on in production environments.

API Access Management is the implementation of the OAuth 2.0 standard by Okta. Okta integrates API Access Management with the implementation of OpenID Connect for authentication. OpenID Connect is also available separately. Similarly, Okta provides a client management API for onboarding, monitoring, and deprovisioning client apps. Use API Access Management to secure your APIs.

For the steps on how to add Okta authentication to your API endpoints, see the [Protect your APIs](/docs/guides/protect-your-api/) guide.

## OAuth 2.0 and OpenID Connect

When do you use API Access Management and when do you use OpenID Connect?

### Simple use cases

In general, use OpenID Connect to sign users in to apps, and use API Access Management to secure your APIs:

* Create one or more custom authorization servers
* Define scopes and claims
* Create policies and rules to determine who can access your API resources

For example:

* Use Case 1 (API Access Management): You need to control API access for various consumers: vendors, employees, and customers, for example.
* Use Case 2 (OpenID Connect): You want users to [sign in to your custom web application](/docs/guides/sign-into-web-app-redirect/) to access their account.

### Complex use cases

You can also specify authorization servers in your OpenID Connect API calls. Every OpenID resource is also available in a version that lets you specify an authorization server that you create in Okta. See [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid/) for details.

## Benefits of API Access Management

Centralizing the management of your APIs makes it easier for others to consume your API resources. Using the Okta OAuth-as-a-Service feature (API Access Management) provides many benefits:

* Create one or more [custom authorization servers](/docs/guides/customize-authz-server/), hosted on Okta. Custom authorization servers make it easier to manage sets of API access for multiple client apps across many customer types.
* Create custom scopes and claims. Map your claims to the profiles in your user directory.
* Tokens are passed instead of credentials. In addition, the JWT tokens carry payloads for user context.
* Stay protected with security standards compliance.
* Manage API access with rules. Specifying the conditions under which actions are taken gives precise and confident control over your APIs.
* Control complex business requirements with policies and rules. You control the ordering and relationships.
* Enjoy the highest quality, always-available API Access Management.
* Let Okta do the work of consuming standards changes to provide more or better services.

> **Note:** In some places Okta implements stricter requirements or behaviors for extra security.

## Put the pieces together

The following is a high-level look at the basic components of API Access Management. Okta uses the same terms as the [OpenID Connect](https://openid.net/specs/openid-connect-core-1_0.html) and the [OAuth 2.0](https://tools.ietf.org/html/rfc6749) specifications. For complete explanations, read those specs.

### Tokens and scopes

The two biggest security benefits of OAuth are using tokens instead of passing credentials, and restricting the scope of tokens. Both of these measures go a long way toward mitigating the impact of a security compromise:

* Sending usernames and passwords around is like putting all of your eggs in one basket. Use credentials to obtain a token instead. This helps if someone gains access to the token. They may be able to use it for a short time, but they don't compromise the user's identity.

* Controlling what a token can access further limits damage if there's a compromise. For example, scoping a token for shoppers on a web site, and not allowing them to change prices, provides significant mitigation.

Okta helps you manage ID tokens (OpenID Connect) and access tokens (OAuth 2.0).

Use an ID token to pass along user profile information, such as first name, family name, and email. OpenID Connect uses the concepts of thin ID token and fat ID token, where:

* A thin ID token is a returned ID token and access token that carries minimal profile information. If you want to retrieve the rest of the information, you need to call the Okta `/userinfo` endpoint using the access token that you receive.
* A fat ID is a returned ID token that carries all the profile information.

A thin ID token contains base claims (information embedded in a token) and some scope-dependent claims. Okta doesn't return profile attributes and groups. Some examples of when both the ID token and access token are returned:

* Implicit flow, where `response_type=id_token+token`
* Authorization Code flow, where the `openid` scope is passed in the authorize request
* Resource Owner Password flow, where the `openid` scope is passed in the token request

A fat ID token returns all user claims, which are all the profile attributes and groups, if profile scope and groups scope are passed. When an Okta returns an ID token without the access token, for example, in an implicit flow where `response_type=id_token`, it's a fat token. The fat token should contain all the profile attributes and groups, if profile scope and groups scope are passed.

### Custom claims

The JWT specification that Okta uses with the OAuth framework lets you include custom claims in ID and access tokens.
You can design tokens to disclose the information you want to share depending on the client and the scope of the tokens.

For example, a shopping site might have one set of claims for customers while they browse. And then have another claim for administrator functions like changing their personal information.

Custom claims also help you by reducing the number of lookup calls required to retrieve user information from the Identity Provider (IdP). This benefit depends on the level of security that your apps require.

## Get started with API Access Management

* [Learn more](/docs/concepts/oauth-openid/) about Okta and OAuth 2.0.
* [Set up a custom authorization server](/docs/guides/customize-authz-server/) and use the power of Okta API Access Management.
* Visit [the OIDC/OAuth 2.0 endpoint documentation](/docs/reference/api/oidc/) and start building your integration today.
* For simpler use cases focused on SSO, visit [the OpenID Connect documentation](/docs/reference/api/oidc/).

## Recommended practices for API Access Management

API Access Management extends the Okta security policies, Universal Directory, and user provisioning into APIs, while providing well-defined OAuth interfaces for developers. While many customers use dedicated API gateways such as Apigee or Mulesoft, you can use API Access Management successfully with or without a gateway.

This document represents our recommendations for proper usage based on the OAuth 2.0 specifications, our design decisions, security best practices, and successful customer deployments. Your requirements and constraints may be different, so not every recommendation fits every situation. However, most recommendations fit most scenarios.

> **Note:** Secure all interactions and redirects between the user, the application, and Okta through HTTPS (SSL/TLS). This ensures that you always protect credentials and tokens.

### Definitions

An API product is a group of API endpoints offered together to satisfy a particular set of related use cases. For example, a bank has a home loan API product and a personal line of credit API product. Both of these API products use some of the same underlying APIs.

Okta API products refer to all resources and tools that Okta makes available.

#### API Access Management administrator role

Okta provides the API Access Management administrator role to manage authorization servers. A user with this role can perform the following tasks:

* Create and edit authorization servers, scopes, custom claims, and access policies
* Create and edit OAuth 2.0 and OpenID Connect client apps
* Assign users and groups to OAuth 2.0 and OpenID Connect client apps

#### OAuth client

* A client secret is a password. Protect it as you would any other password.
* Configure clients to support only the grant types that the use cases under development require. Disable all other grant types.
* Within Okta, only assigned users and groups can authenticate with a client (application). Use the **Everyone** group only when necessary.
* Okta sends tokens and authorization codes to a redirect URI (bound to the application's client ID) only if it is on the allowlist. Therefore, limit this list to URIs in active use.

#### Authorization server

* The organization (or org) authorization server supports simple SSO using OpenID Connect or to get an access token for the Okta APIs. It doesn't support custom scopes, customizing the access tokens, authorization policies, or token inline hooks.

* The custom authorization server supports OpenID Connect and OAuth 2.0 in general. It does include custom scopes, customizing the access tokens, authorization policies, and token inline hooks.

* The default authorization server is the first custom authorization server. It isn't the same as the organization authorization server.

* Assign one authorization server per API product. Doing so allows teams to maintain separate authorization policies and token expiration times while eliminating scope name collisions. Authorization servers often reflect use cases at the orchestration layer, not individual endpoints. For example, a bank may use one authorization server with a short-lived access token for money transfers. The bank might then use a separate authorization server with a long-lived access token for read-only transaction syncs to QuickBooks.

* Make the authorization server audience (the `aud` claim) specific to the API to reduce the risk of inappropriate access token reuse. A single global audience is rarely acceptable. For example, instead of using `api.company.com` for the audience, a better approach is specifying `api.company.com/product1` and `api.company.com/product2`.

* Define scopes within authorization servers that are granular and specific to the permissions required. A generic administrator scope is rarely appropriate. Java-style namespacing such as `com.okta.product1.admin` or Google's URL-based style such as `https://company.com/scopes/product1.admin` are common and scalable approaches.

* Assign an authorization server policy to specific OAuth 2.0 clients. Use the **All Clients** option only if no other solution is possible.

* Authorization policies and rules are treated as a case or switch statement. Therefore, when there's a matching rule, Okta applies the rule and immediately returns the result. Okta executes no further rules.

  * If a request generates unexpected scopes, it's because of an overly broad rule within the authorization server.

  * You can assign an OAuth 2.0 client to any number of authorization servers. Doing so allows you to generate various tokens, each with separate authorization policies, token expiration times, and scopes. The audience claim (`aud`) and client ID claim (`cid`) identify which token maps to which API product.

* You can assign OAuth 2.0 clients and authorization servers on a many-to-many basis. This allows a developer to use a single OAuth 2.0 client to retrieve access tokens from different authorization servers depending on the use case. The only difference is the endpoints accessed and the scopes requested.

* Configure the access token lifetime to reflect the security requirements of the use case. For example, an access token for a banking API may include a `transactions:read` scope with a multi-hour lifetime. By contrast, the lifetime of an access token for transferring funds should be only a matter of minutes.

#### API Gateway (optional)

* Use access tokens exclusively through an HTTP Authorization header instead of encoded into a payload or URL that could be logged or cached.
* When a gateway successfully validates an access token, cache the result until the expiration time (`exp` claim). Do this for validation that is either [local](/docs/guides/validate-access-tokens/) or through the [introspection endpoint](/docs/reference/api/oidc/#introspect).
* When a gateway retrieves the JWKS (public keys) to validate a token, it should cache the result until a new or unknown key is referenced in a token.
* If the gateway performs endpoint or HTTP verb-level authorization using scopes, define and grant the scopes in the org authorization server or custom authorization server before using them in the gateway.

> **Note:** If a user requests scopes from the authorization server that aren't configured, Okta returns an error.

#### Secure applications

* Protect access tokens and refresh tokens. They contain sensitive information. Don't ever store them in client-side or front-end code.
* A client (application) should never inspect the contents of an access token. For example, don't customize the client's UI based on scopes in the access token. The access token isn't meant for the client to read, it's meant for the client to use. However, there's still a large amount of metadata that Okta can attach to a token. For example, Okta may include metadata such as current validity, approved scopes, and information about the context in which Okta issues the token. Use the [token introspect endpoint](/docs/reference/api/oidc/#introspect) to access this data.
* Use access tokens exclusively through an HTTP Authorization header instead of encoded into a payload or URL that may be logged or cached.
* A client secret is a password and you should protect it. Therefore, don't embed access tokens in mobile applications, front-end JavaScript applications, or any other scenario where an attacker could access it.
* Avoid using the Resource Owner Password grant type (`password`) except in legacy applications or transitional scenarios. Okta recommends the authorization code or hybrid grant types for most scenarios.
* For mobile and single-page web applications, using the Authorization Code with PKCE grant type is the best practice. The implicit or hybrid grant type is the next best option.
* For Android or iOS applications, use [Okta Mobile SDK for Kotlin](https://github.com/okta/okta-mobile-kotlin) or [Okta Mobile SDK for Swift](https://github.com/okta/okta-mobile-swift).
* When an application successfully validates an access token, cache the result until the expiration time (`exp`). Do this for a validation that is either [local](/docs/guides/validate-access-tokens/) or through the [introspection endpoint](/docs/reference/api/oidc/#introspect).
* When an application retrieves the JWKS (public keys) to validate a token, it should cache the result until a new or unknown key is referenced in a token.

* Never use an access token granted from the org authorization server for authorization within your applications. These tokens are intended for use with Okta, and your app can't validate them. Instead, use tokens granted from a custom authorization server.

> **Note:** See [Authorization servers](/docs/concepts/auth-servers).

#### Resource (API) servers

* Accept access tokens only through an HTTP Authorization header. Don't encode tokens into a payload or URL that may be logged or cached.
* A resource server must confirm that the audience claim (`aud`) and client ID claim (`cid`) match the expected audience and client ID.
* When a resource server successfully validates an access token, cache the result until the expiration time (`exp`). Do this for a validation that is either [local](/docs/guides/validate-access-tokens/) or through the [introspection endpoint](/docs/reference/api/oidc/#introspect).
