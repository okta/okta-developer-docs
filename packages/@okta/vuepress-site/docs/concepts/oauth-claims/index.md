---
title: OAuth 2.0 claims
meta:
  - name: description
    content: A high-level overview of OAuth 2.0 claims.
---

# Learn about OAuth 2.0 claims

OAuth 2.0 claims are a key part of the OAuth 2.0 and OpenID Connect protocols and they're used to pass information about users within those protocols.

claims are key-value pairs of data that provide information about an entity, typically a user.

They are contained within a JSON Web Token (JWT), which is often used as an ID Token or Access Token.

claims are "pieces of information asserted about an entity," and they are used to convey identity and authorization data in a structured, verifiable way.


Claims are a statement of a fact only believable if the asserting party is trusted. In OAuth 2.0 and OpenID Connect, the asserting party is the Authorization Server, the subject is the Resource Owner, and the API or the client are the relying party.

The relying party receives both scopes and claims in tokens. You use claims to deliver secure values like user IDs to your applications. Since tokens are integrity-protected, the relying party can trust the scopes and claims it receives and be certain that no malicious party has altered the values.


---

## What are OAuth 2.0 claims?

A claim is a piece of information asserted about a user. In the context of OAuth 2.0 and OpenID Connect (OIDC), claims are key-value pairs of data contained within a token. This data is used to convey information about the user or to grant permissions for a specific action.

For example, a claim could be the user's name, their email address, or the specific application role they hold, such as admin.

## Claim types

While all claims are simple key-value pairs, they are categorized into three types based on how they're defined and used.

**Standard claims**: These are claims with predefined names and meanings as specified by the OpenID Connect standard. They provide fundamental information like the token's issuer (iss), the user's unique ID (sub), or when the token expires (exp).

**Public claims**: You can create your own claims, but they must be named in a way that avoids naming conflicts with others. This is often done using a URI-based naming convention.

**Private claims**: These are custom claims created for a specific application or service. They can be any name you choose and are not meant to be publicly registered.

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
