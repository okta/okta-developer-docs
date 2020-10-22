---
title: References
---

## OIDC and OAuth

* Okta [OAuth 2.0 and OpenID Connect Overview](https://developer.okta.com/docs/concepts/oauth-openid/)
* [OpenID Connect Basic Client Implementer's Guide](https://openid.net/specs/openid-connect-basic-1_0.html)
* Okta [OpenID Connect & OAuth 2.0 API](https://developer.okta.com/docs/reference/api/oidc/)
* Okta [access token scopes and claims](https://developer.okta.com/docs/reference/api/oidc/#access-token-scopes-and-claims)

## Glossary

* Access token (OAuth) &mdash; A token issued by the Authorization Server (Okta) in exchange for the grant
* Authorization Grant (OIDC) &mdash; An initial permission from the resource owner (End User) for the application to obtain user information from the Authorization Server
* Authorization Code (OIDC) &mdash; A short-lived temporary code the Client gives the Authorization Server in exchange for an Access token
* Authorization Server (OAuth) &mdash; The server that issues the access token. In this case, Okta is the Authorization Server
* Claim (OIDC) &mdash; The specific information included in a token provided from Okta; claim names are standardized so systems can share user information in repeatable and predictable patterns
* Client (OAuth) &mdash; The application that requests the access token from Okta and then passes it to the resource server; equivalent to the Relying Party
* Client Secret (OIDC): This is a secret password that only the Client and Authorization Server know. This allows them to securely share information privately behind the scenes.
* End User (OIDC) &mdash; The entity whose information is contained in the ID token; equivalent to the Resource Owner
* Grant (OAuth) &mdash; The authorization given (or "granted") to the client by the End User. OIDC apps in the OIN use an "authorization code" grant
* Identity or ID token (OAuth) &mdash;  a security token that contains Claims about the Authentication of an End User by Okta when using a Client
* OpenID provider (OIDC) &mdash; equivalent term for the Authorization Server
* Redirect URI: The URL where the Authorization Server will redirect the Resource Owner back to after granting permission to the Client. This is sometimes referred to as the “Callback URL.”
* Refresh token (OAuth) &mdash; An optional token that is exchanged for a new access token if the previous access token has expired
* Relying party (OIDC) &mdash; the client application that requires End User authentication and claims from the OpenID provider; equivalent to the Client
* Resource Owner (OAuth) &mdash; Your application's End User, who grants permission to access the resource server with an access token
* Resource Server (OAuth) &mdash; The API or service that the client wants to have access to on behalf of the end-user
* Scope (OIDC) &mdash; a bundle or container for a certain set of user information such as name, email address, profile, address, etc. When asking for a token, your application uses a scope to define what bundles of information are being requested from the Authorization Server
