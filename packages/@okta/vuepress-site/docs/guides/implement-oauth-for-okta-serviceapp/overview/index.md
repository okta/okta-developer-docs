---
title: Overview
---

Most Okta API endpoints require that you include an API token with your request. Currently, this API token takes the form of an SSWS token that you generate in the Admin Console. With OAuth for Okta, you are able to interact with Okta APIs using scoped OAuth 2.0 access tokens. Each access token enables the bearer to perform specific actions on specific Okta endpoints, with that ability controlled by which scopes the access token contains.

## Prerequisites

To use this guide, you need the following:

* An Okta developer org. [Create an org for free](https://developer.okta.com/signup).
* [Postman client](https://www.getpostman.com/downloads/) to test requests with the access token. See [Get Started with the Okta APIs](https://developer.okta.com/code/rest/) for information on setting up Postman.

## Use the Client Credentials grant flow

For machine-to-machine use cases where a backend service or a daemon has to call Okta APIs, use the Client Credentials grant flow with an OAuth service app. The Client Credentials grant flow is the only grant flow supported with the OAuth service app when you want to mint access tokens that contain Okta scopes.

The following are the high-level steps required to perform the Client Credentials grant flow with an OAuth service app:

1. Create a public/private JSON Web Key Set (JWKS) key pair and extract the public key to pass it along with the client creation API call.
1. Create the app and register the public key with the app.
1. Grant the required OAuth scopes to the app.
1. Create a JSON Web Token (JWT) token and sign it using the private key for use as the client assertion when making the `/token` endpoint API call.

> **Note:** At this time, OAuth for Okta works only with the APIs listed on the [Scopes and supported endpoints](/docs/guides/implement-oauth-for-okta/scopes/) page. We are actively working towards supporting additional APIs. Our goal is to cover all public Okta API endpoints.

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
