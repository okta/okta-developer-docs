---
title: Overview
---
JSON Web Tokens (JWTs) allow claims, such as user data, to be represented in a secure manner, helping to ensure trust and security in your app. JWTs are an open standard and there are various libraries available that allow you to create, verify, and inspect them.

### JWT Types
There are two types of self-signed JWT assertions that you can build for use when you make requests to endpoints that require client authentication:

* JWT With Shared Key (`client_secret_jwt`)
* JWT With Private Key (`private_key_jwt`)

The difference between building these two types of assertions is the algorithm and method used to sign the JWT.

Which JWT type that you use depends on the client authentication method configured in your OAuth 2.0 client application. See [Client Authentication Methods](/docs/api/resources/oidc/#client-authentication-methods) for more information on the supported methods and when to use them.

> To create a client application and specify either the `client_secret_jwt` or `private_key_jwt` authentication method, see the [Add OAuth 2.0 Client Application](/docs/api/resources/apps/#add-oauth-2-0-client-application) API reference section. To change the client authentication method of an existing app, see the [Update the Client Authentication Method](/docs/api/resources/apps/#update-the-client-authentication-method) API reference section.

> Don't know which method is configured for your client app? You can quickly check the settings by doing a GET to `https://{yourOktaDomain}/api/v1/apps/${appId}`.

<NextSectionLink/>
