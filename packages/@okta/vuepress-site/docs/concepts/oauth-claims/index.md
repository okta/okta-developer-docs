---
title: OAuth 2.0 and OpenID Connect claims
meta:
  - name: description
    content: A high-level overview of OAuth 2.0 and OpenID Connectclaims.
---

# Learn about OAuth 2.0 and OpenID Connect claims

OAuth 2.0 and OpenID Connect (OIDC) claims are key-value pairs of data that contain information, typically information about a user. These claims are commonly packaged into access and ID tokens. Access tokens and ID tokens are formatted as JSON Web Tokens (JWTs).

---

## What are claims?

A claim is a piece of information asserted about a user. In the context of OAuth 2.0 and OpenID Connect (OIDC), claims are key-value pairs of data contained within a token. This data is used to convey information about the user or to grant permissions for a specific action.



Tokens issued by Okta contain claims that are statements about a subject (user). For example, the claim can be about a name, identity, key, group, or privilege. The claims in a security token are dependent upon the type of token, the type of credential used to authenticate the user, and the application configuration.

### What's the difference between OAuth 2.0 and OIDC claims

OAuth 2.0 and OIDC claims both have similar functions. They're both used as key-value pairs to assert information about an entity. The main difference between them is the contexts that they're used in.

OAuth 2.0 claims are usually used with JWTs to convey information about the user or client and to provide authorization details to APIs and resource servers. OAuth 2.0 claims that are used in JWTs aren't part of the [standard OAuth 2.0 spec](https://www.rfc-editor.org/rfc/rfc6749).

While OIDC claims are used to provide verified identity information about a user, such as their name, email, and other user profile details.

| Aspect              | OAuth 2.0 claim                                   | OIDC claim                                               |
|---------------------|---------------------------------------------------|----------------------------------------------------------|
| Typical format      | Access token (if JWT-based)                       | ID token (JWT)                                           |
| Purpose             | Authorization (access control)                    | Identity (user profile and authentication)               |
| Types of claims     | No standard set of OAuth 2.0 claims (except for the claims outlined in the (JSON Web Token (JWT) spec)[https://www.rfc-editor.org/rfc/rfc7519#section-4]) | [Standard set of claims] (`name`, `email`, `phone_number`) |
| Example use cases   | API access, scopes, resource access               | User authentication, access to user profile information         |

## Claim types

While all claims are key-value pairs, they're categorized into three types based on how they're defined and used.

**Standard claims**: These are claims with predefined names and meanings as specified by the OIDC standard. They provide fundamental information like the token's issuer (`iss`), the user's unique ID (`sub`), or when the token expires (`exp`).

**Public claims**: You can create your own claims, but they must be named in a way that avoids naming conflicts with others.

**Private claims**: These are custom claims created for a specific app or service. They can be any name you choose and are not meant to be publicly registered.

## Claims in ID tokens versus access tokens

A single user can have multiple tokens, and the claims within each token serve a different purpose.

**ID token claims:** These claims are all about identity. They provide information about the user, such as their name, email, or a profile picture. An application uses these claims to verify who the user is and to personalize the user's experience.

**Access token claims:** These claims are all about authorization. They grant an application permission to access protected resources, like an API. An API will inspect the claims within an access token to determine if the application has the necessary permissions to perform a requested action.

## Claims versus scopes

It's common to confuse claims and scopes, but they have distinct roles.

A scope is a permission requested by an application. For instance, an application might request the email scope to access a user's email address.

A claim is the actual data that is returned as a result of that request. If the user approves the email scope request, a claim containing the user's email address will be included in the ID token. Think of a scope as a question and a claim as the answer.

## Security and validation

Never trust the claims in a token without first validating them. A malicious actor could tamper with a token to gain unauthorized access. You must always validate a token to ensure:

It was issued by a trusted party (using the iss claim).

It has not expired (using the exp claim).

It was intended for your application (using the aud claim).

Validating these claims is a critical step in securing any application that uses OAuth 2.0.
