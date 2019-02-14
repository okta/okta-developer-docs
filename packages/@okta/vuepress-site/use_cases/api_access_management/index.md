---
title: API Access Management
excerpt: Secure your APIs with Okta's implementation of the OAuth 2.0 standard.
redirect_from:
  - /docs/api/resources/resource-server-beta/
  - >-
    /docs/api/resources/resource-server-beta/required-config-changes-for-auth-server
---

## API Access Management with Okta

Use API Access Management, Okta's implementation of the OAuth 2.0 standard, to secure your APIs.
API Access Management is integrated with Okta's implementation of OpenID Connect for authentication;
OpenID Connect is also available separately. Similarly, Okta provides a client management API
for onboarding, monitoring, and deprovisioning client apps.

## OAuth 2.0 and OpenID Connect

When do you use API Access Management and when do you use OpenID Connect?

## Simple Use Cases

In general, use OpenID Connect to sign users into apps, and use API Access Management to secure your APIs:
create one or more Custom Authorization Servers, define scopes and claims, and create policies and rules to determine who can access your API resources.

For example:

* Use Case 1 (API Access Management): You need to control API access for a variety of consumers: vendors, employees, and customers, for example.
* Use Case 2 (OpenID Connect): You want users to sign into your custom web application to access their account.

## Complex Use Cases

You can also specify authorization servers in your OpenID Connect API calls.
Every OpenID resource is also available in a version that lets you specify an authorization server that you created in Okta.
See [OAuth 2.0 and OpenID Connect](#oauth-20-and-openid-connect) for details.

# Benefits of API Access Management

Centralizing the management of your APIs makes it easier for others to consume your API resources.
Using Okta's OAuth-as-a-Service feature, API Access Management, provides many benefits:

* Create one or more [Custom Authorization Servers](/authentication-guide/implementing-authentication/set-up-authz-server), hosted on Okta. Custom Authorization Servers make it easier to manage sets of API access for multiple client apps across many customer types.
* Create custom scopes and claims. Map your claims to the profiles in your user directory.
* Tokens are passed instead of credentials. In addition, the JWT tokens carry payloads for user context.
* Stay protected with security standards compliance.
* Manage API access with rules. Specifying the conditions under which actions are taken gives you precise and confident control over your APIs.
* Control complex business requirements with polices and rules. You control the ordering and relationships.
* Enjoy the highest quality, always-available API Access Management.
* Let Okta do the work of consuming standards changes to provide more or better services.

> Note: In some places we have implemented stricter requirements or behaviors for additional security.

# Putting the Pieces Together

The following is a high-level look at the basic components of API Access Management.
We use the same terms as the OpenID Connect and OAuth 2.0 spec. For complete explanations, read those specs.

## Tokens and Scopes

The two biggest security benefits of OAuth are using tokens instead of passing credentials and restricting the scope of tokens.
Both of these measures go a long way toward mitigating the impact of a security compromise.

* Sending usernames and passwords around is like putting all of your eggs in one basket. By using credentials to obtain a token,
    if someone gains access to the token, they may be able to use it for a short time, but they haven't compromised the user's identity.
* Controlling what a token is entitled to access further limits damage in case of compromise. For example, scoping a token for shoppers
    on a web site, and not allowing them access to change prices, provides significant mitigation.

Okta helps you manage ID Tokens (OpenID Connect) and Access Tokens (OAuth 2.0).

## Custom Claims

The JWT specification we use with the OAuth Framework lets you include custom claims in ID and Access Tokens.
You can design tokens to disclose the information you want to share depending on the client and the scope of the tokens.
For example, a shopping site might have one set of claims for customers while they browse, but another claim for administrator functions
like changing their personal information.

Custom claims also help you by reducing the number of lookup calls required to retrieve user information from the identity provider (IdP).
This benefit depends, of course, on the level of security your apps require.

# Getting Started with API Access Management

* [Learn more](/authentication-guide/auth-overview/) about Okta and OAuth 2.0.
* [Set up a custom authorization server](/authentication-guide/implementing-authentication/set-up-authz-server) and use the power of Okta's API Access Management.
* Visit [the OIDC/OAuth 2.0 endpoint documentation](/docs/api/resources/oidc) and start building your integration today.
* For simpler use cases focused on SSO, visit [the OpenID Connect documentation](/docs/api/resources/oidc).

## Recommended Practices for API Access Management

API Access Management, or OAuth as a Service, extends Okta's security policies, Universal Directory, and user provisioning into APIs, while providing well-defined OAuth interfaces for developers. Further, while many of our customers use dedicated API gateways such as Apigee or Mulesoft, API Access Management can be used equally well with or without a gateway.

This document represents our recommendations for proper usage based on the OAuth 2.0 specifications, our design decisions, security best practices, and successful customer deployments. Your requirements and constraints may be different, so not every recommendation fits every situation. However, most recommendations fit most scenarios.

> All interactions and redirects between the user, the application, and Okta must be secured via HTTPS (SSL/TLS) to ensure credentials and tokens are protected at all times. This is non-negotiable.

### Definitions

An API Product is a group of API endpoints offered together to satisfy a particular set of related use cases. For example, a bank may have a Home Loan API Product and a Personal Line of Credit API Product, both of which use some of the same underlying APIs.

Okta API Products refers to all the resources and tools that Okta makes available.

### Recommendations

* [API Access Management Administrator Role](#api-access-management-administrator-role)
* [OAuth Client](#oauth-client)
* [Authorization Server](#authorization-server)
* [API Gateway (optional)](#api-gateway-optional)
* [Securing Applications](#securing-applications)
* [Resource (API) Servers](#resource-api-servers)

#### API Access Management Administrator Role

Okta provides the API Access Management Administrator role to make managing authorization servers. A user with this role can perform the following tasks:

* Create and edit authorization servers, scopes, custom claims, and access policies
* Create and edit  OAuth 2.0 and OpenID Connect client apps
* Assign users and groups to OAuth 2.0 and OpenID Connect client apps

#### OAuth Client

* A client secret is a password. Protect it as you would any other password.
* Configure clients to support only the grant types that are required by the specific use cases under development. Disable all other grant types.
* Within Okta, only assigned users and groups can authenticate with a client (application). Use the **Everyone** group only when necessary.
* Okta sends tokens and authorization codes to a redirect URI (bound to the application's client ID) only if it is on the whitelist. Therefore, limit this list to URIs in active use.

#### Authorization Server

* Assign one authorization server per API Product. Doing so allows teams to maintain separate authorization policies and token expiration times while eliminating scope name collisions. Authorization servers often reflect use cases at the orchestration layer, not individual endpoints. For example, a banking institution may use one authorization server with a short-lived access token for money transfers but a separate authorization server with a long-lived access token for read-only transaction sync to QuickBooks.

* Make the authorization server audience (the `aud` claim) specific to the API to reduce the risk of inappropriate access token reuse. A single global audience is rarely acceptable. For example: Instead of using `api.company.com` for the audience, a better approach is specifying `api.company.com/product1` and `api.company.com/product2`.

* Define scopes within authorization servers that are granular and specific to the permissions required. A generic administrator scope is rarely appropriate. Java-style namespacing such as `com.okta.product1.admin` or Google's URL-based style such as `https://company.com/scopes/product1.admin` are common and scalable approaches.

* Assign an authorization server policy to specific OAuth 2.0 clients. Use the **All Clients** option only if no other solution is possible.

* Authorization policies and rules are treated as a case or switch statement. Therefore, when a matching rule is found, it is applied and the result is immediately returned. No further rules are executed.

    * If a request generates unexpected scopes, it is because of a overly broad rule within the authorization server.

    * An OAuth 2.0 client can be assigned to any number of authorization servers. Doing so provides for a variety of tokens to be generated, each with separate authorization policies, token expiration times, and scopes. The audience claim (`aud`) and client ID claim (`cid`) identify which token maps to which API Product.

* OAuth clients and authorization servers can be assigned on a many-to-many basis. This allows a developer to use a single OAuth Client to retrieve access tokens from different authorization servers depending on the use case. The only difference is the endpoints accessed and the scopes requested.

* Configure the access token lifetime to reflect the security requirements of the use case. For example, an access token for a banking API may include a `transactions:read` scope with a multi-hour lifetime. By contrast, the lifetime of an access token for transferring funds should be only a matter of minutes.

#### API Gateway (optional)

* Access tokens should be used exclusively via an HTTP Authorization header instead of encoded into a payload or URL which may be logged or cached.
* When a gateway successfully validates an access token, cache the result until the expiration time (`exp` claim). Do this for validation that is either [local](/authentication-guide/tokens/validating-access-tokens) or via the [introspection endpoint](/docs/api/resources/oidc#introspect).
* When a gateway retrieves the JWKS (public keys) to validate a token, it should cache the result until a new or unknown key is referenced in a token.
* If the gateway is performing endpoint or HTTP verb-level authorization using scopes, the scopes must be defined and granted in the Okta authorization server or custom authorization server before being used in the gateway.

    **Note:** If a user requests scopes from the authorization server which haven't been configured, an error is returned.

#### Securing Applications

* Access tokens and refresh tokens are sensitive and should be protected as such. They should never be stored in client-side or frontend code.
* A client (application) should never inspect the contents of an access token. For example, do not customize the client's UI based on scopes in the access token.
* Access tokens should be used exclusively via an HTTP Authorization header instead of encoded into a payload or URL which may be logged or cached.
* A client secret is a password and should be treated and protected as such. Therefore, it should not be embedded in mobile applications, frontend JavaScript applications, or any other scenario where an attacker could access it.
* Avoid using the resource owner password grant type (`password`) except in legacy application or transitional scenarios. The authorization code, implicit, or hybrid grant types are recommended in most scenarios.
* For mobile applications, using the authorization code grant type with PKCE is the best practice. The implicit or hybrid grant type is the next best option.
* For Android or iOS applications, use the [AppAuth for iOS](https://openid.github.io/AppAuth-iOS/) and [AppAuth for Android](https://openid.github.io/AppAuth-Android/) libraries from the OpenID Foundation.
* When an application successfully validates an access token, cache the result until the expiration time (`exp`). Do this for validation that is either [local](/authentication-guide/tokens/validating-access-tokens) or via the [introspection endpoint](/docs/api/resources/oidc#introspect).
* When an application retrieves the JWKS (public keys) to validate a token, it should cache the result until a new or unknown key is referenced in a token.

* Never use an access token granted from the Okta organization authorization server for authorization within your applications. These tokens are intended for use with Okta and cannot be validated within your application. Instead, use tokens granted from a custom authorization server. Read more about the various types of authorization servers in the [OAuth 2.0 and Okta documentation](https://developer.okta.com/authentication-guide/auth-overview/#authorization-servers).

#### Resource (API) Servers

* Accept access tokens only via an HTTP Authorization header. Don't encode tokens into a payload or URL which may be logged or cached.
* A resource server must confirm that the audience claim (`aud`) and client ID claim (`cid`) match the expected audience and client ID.
* When a resource server successfully validates an access token, cache the result until the expiration time (`exp`). Do this for validation that is either [local](/authentication-guide/tokens/validating-access-tokens) or via the [introspection endpoint](/docs/api/resources/oidc#introspect).
