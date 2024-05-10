---
title: Build Universal Logout for your app
meta:
  - name: description
    content: Provides an overview of Universal Logout and how to build a Universal Logout endpoint
---

## Universal Logout

When an Identity Provider (IdP) like Okta detects identity threats or responds to employee termination events, it can prevent the user from signing in to apps in the future by suspending, deactivating, or deleting the user at the IdP. However, this doesn't affect a user's existing sessions or tokens within an app.

Universal Logout enables an IdP, or a security incident management tool, to send a request to an app indicating that it should revoke the user's existing sessions and log the user out.

A Universal Logout endpoint must be built for the app to handle logout requests. This endpoint receives a request to log a user out and then attempts to revoke all sessions and tokens for the user. The endpoint then returns a result indicating success or failure.

**[Read the full API Specification](https://datatracker.ietf.org/doc/html/draft-parecki-oauth-global-token-revocation)**

If you're building an app that's used by enterprise customers, and would like to empower your customers to instantly mitigate risks across their ecosystem, read on for how you can support Universal Logout with Okta.

## Revocation details

When the Universal Logout endpoint receives a request, it's a clear communication that the user's existing sessions and tokens should be revoked as fast as possible.

Often, it's not possible to instantaneously revoke all sessions and tokens. When you use JWT access tokens or when you deploy an app across multiple independent data centers, instantaneous revocation doesn't occur. Because of this, a "Success" response to the logout request indicates that the app is attempting to log out all credentials.

In particular, the app should revoke:

* All OAuth 2.0 refresh tokens for the user
* All session cookies for the user

The app isn't expected to revoke access tokens, as it may not be technically possible. If your app can revoke access tokens, then go ahead and do it. However, revoking access tokens isn't required to consider the logout flow successful.

## Universal Logout endpoint

The actual endpoint URL is up to the discretion of the app developer building the endpoint for the app.

### Endpoint authentication

The request to the Universal Logout endpoint requires authentication so that your app knows the request is coming from Okta. Okta sends a signed JWT to authenticate to your API. The JWT follows a similar format to the [`private_key_jwt`](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#jwt-with-private-key) format used as OAuth 2.0 client authentication. The details of the JWT claims are described below. The format `<>` indicates a placeholder value and isn't included as part of a value.

The JWT is sent using the `Bearer` HTTP Authorization scheme:

```
Authorization: Bearer <JWT>
```

The claims of the JWT are the following:

```
// Header
{
  "typ": "global-token-revocation+jwt",
  "alg": "<algorithm used for signing SSO token>"
}
// Payload
{
  "jti": "<unique identifier>",
  "iss": "<orgDomainBaseUrl/customDomainBaseUrl>",
  "sub": "<client_id of OIDC app/appInstanceId of SAML 2.0 app>",
  "aud": "<url of the revocation endpoint>",
  "exp": "<5 min into future>",
  "nbf": "<5 min ago>",
  "iat": "<current timestamp>"
}
```

* `jti` - A unique identifier for this JWT
* `iss` - The same issuer URL that you would receive in an OpenID Connect ID token
* `sub` - Identifies the "subject" of this token, which in this case is your application. For OpenID Connect clients this will be the `client_id`, and for SAML integrations, this will be the `appInstanceId`
* `aud` - Identifies the "audience" of this token, the URL of your Global Token Revocation endpoint. The URL will not include query string parameters or a URL fragment.
* `exp` - The expiration timestamp of the token, which will be 5 minutes in the future.
* `nbf` - A timestamp 5 minutes in the past.
* `iat` - The current timestamp at which the token was created.

Your API endpoint should validate the signature of the JWT as well as these claims to confirm the revocation request is coming from Okta. The token will be signed with the same key used for signing ID tokens or SAML assertions for single sign-on.


### Logout request

When a user should be logged out of the app, Okta makes a POST request to the Universal Logout endpoint. The request includes a JSON object in the request body that describes the user to be logged out.

By default, the user's email address identifies them. If an app supports provisioning with Okta, then the user identifier within the app identifies them. The user identifier is sent in the format defined by [Subject Identifiers for Security Event Tokens](https://datatracker.ietf.org/doc/html/draft-ietf-secevent-subject-identifiers-18) as either an `email` or `iss_sub` identifier.

Email address:

```JSON
{
  "subject": {
    "format": "email",
    "email": "user@example.com"
  }
}
```

Issuer and subject identifier within the app:

```JSON
{
  "subject": {
    "format": "iss_sub",
    "iss": "https://issuer.example.com/",
    "sub": "145234573"
  }
}
```

### Logout response and response codes

The response should indicate whether the logout request was successful, if the app is unable to log the user out, or if there's some other error. Okta ignores the response body and uses only the HTTP status code to indicate success or failure.

> **Note:** See [Revocation details](#revocation-details) for more information on what the app should revoke to consider the logout flow successful.

#### 401 and 403

Your app should first validate the request authentication, and then return an error if the request is missing credentials or if the credentials are invalid. Indicate this error with an HTTP `401` or `403` response code:

* `401 Unauthorized`: The request is missing authentication or the authentication is invalid.
* `403 Forbidden`: The provided authorization is insufficient to perform the requested operation, for example: missing scope.

#### 400

If the request is malformed, or includes a subject identifier of an unrecognized type, your app can return HTTP `400`:

`400 Bad Request`: The request is malformed, contains invalid or unrecognized properties, or an unrecognized subject identifier type.

#### 404

Your app should look up the user identified by the subject identifier and return `404` if the user isn't found:

`404 Not Found`: The user indicated by the subject identifier isn't found.

#### 422

At this point, your app should attempt to log the user out. If it's not possible, your app can return HTTP `422`:

`422 Unprocessable Content`: The app is unable to log the user out.

#### 204

If the logout request succeeds, your app returns HTTP `204`:

`204 No Content`: A `204` response indicates a successful request and that the user is logged out.

<!--
## Share the details of your logout endpoint

To be included in Okta's launch of Universal Logout, we'll need the details of your logout endpoint that are not part of this specification. In particular, we need to know:

* The URL of your Universal Logout endpoint
* What type of API authentication your endpoint uses
-->

## FAQ

### Is this an open standard?

The API described in this document is intended to be an open standard that anyone can implement on either side of the transaction.

Okta is bringing this work to the appropriate standards bodies. As is the nature of the standardization process, it's possible that the specifics of the request may end up different than what's in this document. Okta intentionally designed this API based on existing standards to reduce the likelihood of things changing as the standard progresses.

A large part of the effort to implement this API is implementing the internal revocation logic. Most of the investment in building this feature can be carried over regardless of the specific API format that triggers the logout request.

### How is this different than IdP-initiated Single Logout?

When you use SAML IdP-initiated single logout, it's ultimately the browser that delivers the logout signal to the Service Providers (SPs). This works by either the IdP redirecting the user's browser to SAML SPs or by embedding the SPs in an iFrame.

Okta Universal Logout is a server-to-server protocol that works entirely outside the context of the user's browser. This ensures that Okta is able to deliver a logout signal to either Okta or the application, even if the user doesn't have an active browser window open.
