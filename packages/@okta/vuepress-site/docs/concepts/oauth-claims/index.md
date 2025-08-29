---
title: OAuth 2.0 and OpenID Connect claims
meta:
  - name: description
    content: A high-level overview of OAuth 2.0 and OpenID Connectclaims.
---

# Learn about OAuth 2.0 and OpenID Connect claims

[OAuth 2.0 and OpenID Connect (OIDC)](/docs/concepts/oauth-openid) claims are key-value pairs of data that contain information, typically information about a user. Okta uses these claims to provide context about the user and their permissions.

This page provides an overview of OAuth 2.0 and OIDC claims, including their types and usage, and how they're used in Okta.

---

## What are claims

At a basic level, a claim is a piece of information asserted about a subject. In the context of OAuth 2.0 and OpenID Connect (OIDC), claims are key-value pairs of data contained within tokens. Claims are commonly packaged into [access](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#access-token) and [ID tokens](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#id-token). Access tokens and ID tokens are formatted as JSON Web Tokens (JWTs).

> **Note:** Access tokens are sometimes formatted as JWTs, but not always.

### Claims versus scopes

Claims and scopes are related in OAuth 2.0 and OIDC, but have some important differences. [Scopes](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#scopes) are used to request access to specific resources or actions, while [claims](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#claims) are used to provide information about users and their permissions.

During the authorization flow, an app requests specific scopes. The resulting access token or ID token includes claims that correspond to those scopes. The claims are the actual data returned as a result of that request.

You can use claims for fine-grained permissions and information to enhance the security of your apps. Scopes include bundles of claims, whereas claims can be used with more granularity to control access to specific resources or actions.

### Claims in access tokens

Claims in access tokens pass information about the user and their permissions to the resource server. Claims are contained within a scope, or you can [add custom claims](/docs/guides/customize-tokens-returned-from-okta/main/) to an access token. Access tokens can contain scopes and custom claims, while ID tokens can contain claims, but not scopes.

Access and ID tokens contain a [header](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#access-token-header), [payload](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#access-token-payload), and [signature](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#access-token-signature).

Along with other parameters, the payload can contain scopes and custom claims. See the following example of an access token payload.

```json
{
  "ver": 1,
  "jti": "AT.0mP4JKAZX1iACIT4vbEDF7LpvDVjxypPMf0D7uX39RE",
  "iss": "https://{yourOktaDomain}/oauth2/{authorizationServerId}",
  "aud": "https://api.example.com",
  "sub": "00ujmkLgagxeRrAg20g3",
  "iat": 1467145094,
  "exp": 1467148694,
  "cid": "nmdP1fcyvdVO11AL7ECm",
  "uid": "00ujmkLgagxeRrAg20g3",
  "scp": [
    "openid",
    "email",
  ],
  "auth_time": 1467142021,
}
```

The payload contains various [reserved claims](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#reserved-claims-in-the-payload-section), along with an array of scopes, within the `scp` array. The reserved claims convey some information about the access token. For example, the `iss` (issuer) claim contains the URL of the authorization server that issued the token. And the `aud` (audience) claim contains the intended recipient of the token.

The `scp` (scope) parameter passes two scopes to the resource server: `openid` and `email`. The `email` scope contains the `email` and `email_verified` claims and these claims provide access to the user's email address and its verification status. The `openid` scope indicates that the token is part of an OIDC request.

See [Access token scopes and claims](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#access-token-scopes-and-claims) for information about configuring scopes and claims in access tokens.

### Claims in ID tokens

Claims in ID tokens pass identifying information about a user to client apps. The identifying information is structured into standard claims that the [OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) defines. Client apps evaluate the claims and make authorization decisions based on that information.

The claims that you pass in an ID token depend on your use case. In an authentication context, you can pass claims that provide more details about a user, such as their `family_name`, `birthdate`, or `address`. You can use these claims to personalize the user experience in a client app. Or you can use them for enhanced [identity verification](/docs/guides/idv-integration/main/#supported-oidc-claims).

See the following example of an ID token payload.

```json
{
  "sub": "user123",
  "email": "user@example.com",
  "phone_number": "+1234567890",
  "name": "John Doe"
}
```

In this example, the ID token payload passes the user ID (`sub`), user's email (`email`), phone number (`phone_number`), and their name (`name`). These claims identify the user to the client app.

See [ID token](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#id-token) for information about how ID tokens are structured and used in Okta.

## Claim types

Claims can be categorized into two groups based on how they're defined and used.

**Registered claims**: There are seven registered claims that are defined in the [JWT spec](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1). They provide fundamental information like the token's issuer (`iss`), the user's unique ID (`sub`), or when the token expires (`exp`).

**Custom claims**: Custom claims consist of [public claims](#public-claims) that third-parties have registered and [private claims](#private-claims) that are created for use between specific parties.

### Public claims

Public claims are designed to avoid naming collision with other registered claims. Public claims include the [OIDC standard claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). For a full list of public claims, see the [Internet Assigned Numbers Authority (IANA) registry](https://www.iana.org/assignments/jwt/jwt.xhtml).

### Private claims

Private claims are created for use between specific parties and aren't included in the IANA registry. You can create private claims to convey information that might be specific to your app or use case.

## Different ways to implement claims

You can use claims in different ways with your Okta org.

* [Custom claims](/docs/guides/configure-custom-claims/oktaoidc/main/): Learn how to customize the claims that are returned in Okta access and ID tokens. You can add custom claims to access tokens, or add custom claims to ID tokens that are directly relevant to your use case.
* [Custom group claims](/docs/guides/customize-tokens-returned-from-okta/main/): Similar to custom claims, you can add group claims to ID tokens.
* [Federated claims](/docs/guides/configure-federated-claims/oktaoidc/main/): Understand how to set up federated claims to share user information across different identity providers, streamlining the user experience and enhancing security.
* [Claims sharing](/docs/guides/configure-claims-sharing/oktaoidc/main/): You can configure claims sharing if you use an OIDC or SAML 2.0 identity provider (IdP). Claims sharing enables you to share identity-related information (claims) between different orgs to enable secure access to resources.

## Secure your claims

The primary method for using claims securely is to validate them. Validate the claims within access and ID tokens. Malicious actors can attempt to tamper with a token to gain unauthorized access to apps. Always validate a token to ensure the following:

* Verify the `iss` claim to ensure that a trusted party issued the token.
* Verify the `exp` claim to ensure that it hasn't expired.
* Verify the `aud` claim to ensure that it's intended for your app.

For more information about validating claims and tokens, see [Validate access tokens](/docs/guides/validate-access-tokens/dotnet/main/) and [Validate ID tokens](/docs/guides/validate-id-tokens/main/).

Another way to use claims securely is to follow the principle of least privilege. This means granting users and apps the minimum level of access necessary to perform their tasks. Limit the claims in tokens to reduce the risk of exposing sensitive information.

### Next steps

* [Learn about tokens](/docs/concepts/token-lifecycles/#token-types) and then learn [how to implement them](/docs/guides/tokens/)
* Explore [JSON Web Token (JWT) claims](https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-token-claims)
* Review [sample use cases for scopes and claims](https://auth0.com/docs/get-started/apis/scopes/sample-use-cases-scopes-and-claims)
