---
title: Authenticate a client with a SPIFFE JWT-SVID
excerpt: Configure an OAuth 2.0 client so that a workload authenticates to Okta with its SPIFFE JWT-SVID instead of a client secret or private key.
layout: Guides
---

<ApiLifecycle access="ie" />

Configure an OAuth 2.0 client so that a workload, such as a service or an AI agent, authenticates to Okta with the SPIFFE JWT-SVID that it already has. You don't create, store, or rotate a client secret or a private key in Okta.

---

#### Learning outcomes

- Understand how Okta uses a SPIFFE JWT-SVID to authenticate an OAuth 2.0 client.
- Register a SPIFFE trust domain in your org.
- Configure an app integration or a Client ID Metadata Document (CIMD) client to authenticate with `spiffe_jwt`.
- Request a token with a JWT-SVID.

#### What you need

- An Okta Identity Engine org with SPIFFE JWT-SVID client authentication enabled. FEATURE_AVAILABILITY_TBD
- A super admin role. The API Access Management administrator role can also manage trust domains.
- A scoped OAuth 2.0 [access token](/docs/guides/implement-oauth-for-okta/) with the `okta.spiffe.manage` and `okta.apps.manage` scopes.
- A SPIFFE trust domain and the HTTPS URL of its bundle endpoint. Okta must be able to reach the endpoint, and it must serve JWT-SVID signing keys. See [SPIFFE Trust Domain and Bundle](https://github.com/spiffe/spiffe/blob/main/standards/SPIFFE_Trust_Domain_and_Bundle.md).
- A workload that has a SPIFFE ID in that trust domain and can get a JWT-SVID, for example from SPIRE. See [SPIRE documentation](https://spiffe.io/docs/latest/spire-about/).
- An authorization server that issues tokens to the client. See [Create an authorization server](/docs/guides/customize-authz-server/).
- For a CIMD client, an org with CIMD enabled and a CIMD URL that you host. See [Register apps with a Client ID Metadata Document (CIMD)](/docs/guides/app-cimd-registration/).

---

## Overview

This guide is for developers and admins who set up workload authentication. Read the key concepts first, and then complete the tasks in order.

### Key concepts for SPIFFE JWT-SVID authentication

A SPIFFE ID is a URI that identifies a workload, such as `spiffe://example.org/payments-service`. The part after `spiffe://` and before the next `/` is the trust domain, which is the boundary within which one SPIFFE deployment issues identities.

A JWT-SVID is a JSON Web Token that proves a workload's SPIFFE ID in its `sub` claim. The SPIFFE deployment signs it for a specific audience. A trust domain publishes the public keys that verify its JWT-SVIDs at an HTTPS URL called the bundle endpoint. Okta retrieves and caches these keys, so you don't register or upload keys in Okta.

With `spiffe_jwt`, the JWT-SVID replaces a client secret or a `private_key_jwt` assertion. The workload sends it to the token endpoint as the `client_assertion`. This follows [OAuth SPIFFE Client Authentication](https://datatracker.ietf.org/doc/draft-ietf-oauth-spiffe-client-auth/) (IETF Internet-Draft).

### How Okta authenticates a client with a JWT-SVID

1. The workload gets a JWT-SVID from its SPIFFE deployment and sends it to the token endpoint of your authorization server, with the client ID.
1. Okta confirms that the JWT-SVID hasn't expired, that the `aud` claim is the issuer of the authorization server, and that the `sub` claim is the SPIFFE ID that you registered for the client.
1. Okta retrieves the signing keys from the bundle endpoint that you registered for the trust domain, and verifies the signature.
1. Okta authenticates the client and issues a token according to your access policy.

### Supported clients and limits

You can use `spiffe_jwt` with OpenID Connect (OIDC) web, native, and service apps that you create as app integrations, and with CIMD clients. AI_AGENT_POSITIONING_TBD

You can't use it with single-page apps (SPAs) or with apps from the Okta Integration Network (OIN). Each client has one SPIFFE ID, and a SPIFFE ID can belong to only one client in your org. It works with the org authorization server and with custom authorization servers.

### Steps in this guide

1. [Register the trust domain](#register-the-trust-domain) so that Okta can find the signing keys.
1. Configure the client with its SPIFFE ID, either as [an app integration](#configure-an-app-integration) or as [a CIMD client](#configure-a-cimd-client).
1. [Get a JWT-SVID](#get-a-jwt-svid) for the workload to send to Okta.
1. [Request a token](#request-a-token) to authenticate the client.
1. [Manage trust domains](#manage-trust-domains) to update or remove a registration.

## Register the trust domain

Register each trust domain before you configure a client that uses a SPIFFE ID in it. Okta rejects a SPIFFE ID in an unregistered trust domain, and it rejects token requests from a CIMD client for the same reason.

1. Find the trust domain and the bundle endpoint URL of your SPIFFE deployment. For `spiffe://example.org/payments-service`, the trust domain is `example.org`.
1. Send a `POST` request to the [Create a SPIFFE trust domain registration](API_REF_SPIFFE_TRUST_DOMAIN_TBD) endpoint. Set `trustDomain` to the trust domain and `bundleUrl` to the HTTPS URL of the bundle endpoint. The response includes the `id` of the registration, which you need to update or delete it.

   ```bash
   curl -i -X POST \
     'https://{yourOktaDomain}/spiffe/api/v1/trust-domains' \
     -H 'Authorization: Bearer {yourOktaAccessToken}' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json' \
     -d '{
       "trustDomain": "example.org",
       "bundleUrl": "https://bundle.example.com/spiffe/bundle.json"
     }'
   ```

You can also register a trust domain in the Admin Console. See [Add a SPIFFE trust domain](HELP_LINK_TBD).

Registration rules:

- The `bundleUrl` must use HTTPS and can't contain a wildcard or credentials. Okta doesn't contact it when you save the registration, so a wrong URL shows up later as a failed token request.
- Each trust domain can have one registration, and you can't change `trustDomain` after you create it. An org can have up to 100 registrations. A duplicate or a request over the limit returns a `409 Conflict` error.

## Configure the client

Tell Okta which SPIFFE ID identifies the client. Use an app integration if you manage the client in your org. Use a CIMD client if the app owner publishes the client's configuration at a URL.

### Configure an app integration

1. Send a `POST` request to the [Create an application](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/application/other/createapplication) endpoint. To update an existing app integration, send a `PUT` request to the [Replace an application](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/#tag/Application/operation/replaceApplication) endpoint with the full app object. Set `credentials.oauthClient.token_endpoint_auth_method` to `spiffe_jwt` and `settings.oauthClient.spiffe_id` to the SPIFFE ID of the workload. You must set both, and the trust domain of the SPIFFE ID must already be registered.

   ```bash
   curl -i -X POST \
     'https://{yourOktaDomain}/api/v1/apps' \
     -H 'Authorization: Bearer {yourOktaAccessToken}' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json' \
     -d '{
       "name": "oidc_client",
       "label": "Payments service",
       "signOnMode": "OPENID_CONNECT",
       "credentials": {
         "oauthClient": {
           "token_endpoint_auth_method": "spiffe_jwt"
         }
       },
       "settings": {
         "oauthClient": {
           "application_type": "web",
           "grant_types": ["authorization_code"],
           "response_types": ["code"],
           "redirect_uris": ["https://example.com/oauth2/callback"],
           "spiffe_id": "spiffe://example.org/payments-service"
         }
       }
     }'
   ```

1. Save the `client_id` from the response. The workload sends it with every token request.

For a service app, set `application_type` to `service` and `grant_types` to `client_credentials`, and omit the redirect URIs. CLIENT_CREDENTIALS_SAMPLE_VERIFY_TBD

You can also set the authentication method and SPIFFE ID in the Admin Console. See [Configure an app integration for SPIFFE JWT-SVID authentication](HELP_LINK_TBD).

App integration rules:

- The `spiffe_id` must be a valid SPIFFE ID, can't contain a wildcard, and can't belong to another client in your org.
- Single-page apps and the implicit grant type aren't supported with `spiffe_jwt`.
- Okta removes the `spiffe_id` if you change the authentication method or delete the app integration.
- If `spiffe_jwt` isn't enabled for your org, Okta rejects the request. FLAG_OFF_BEHAVIOR_WORDING_TBD

### Configure a CIMD client

For a CIMD client, the app owner publishes the SPIFFE ID in the CIMD document, and you register only the CIMD URL in Okta.

1. Register the CIMD URL as an app integration, or convert an existing app integration. See [Add a CIMD client to an app integration](/docs/guides/app-cimd-registration/#add-a-cimd-client-to-an-app-integration).
1. Ask the app owner to add `token_endpoint_auth_method` and `spiffe_id` to the CIMD document. They can also add `spiffe_bundle_endpoint`.

   ```json
   {
     "client_id": "https://partner.example.com/.well-known/cimd/payments-service.json",
     "client_name": "Payments service",
     "redirect_uris": ["https://partner.example.com/callback"],
     "grant_types": ["authorization_code"],
     "token_endpoint_auth_method": "spiffe_jwt",
     "spiffe_id": "spiffe://example.org/payments-service",
     "spiffe_bundle_endpoint": "https://bundle.example.com/spiffe/bundle.json"
   }
   ```

CIMD client rules:

- Register the trust domain in your org first, even if the document includes `spiffe_bundle_endpoint`.
- If the document includes `spiffe_bundle_endpoint`, it must match the `bundleUrl` that you registered, or Okta rejects the request. If the document omits it, Okta uses the registered `bundleUrl`.
- The document doesn't need `jwks` or `jwks_uri`, because Okta gets the signing keys from the trust domain.

## Get a JWT-SVID

The workload gets a JWT-SVID from its SPIFFE deployment, because Okta doesn't issue it. This section shows the request for SPIRE. If you use a different SPIFFE implementation, use its Workload API.

1. Request a JWT-SVID with the issuer of the authorization server that receives the token request as the only audience. For the org authorization server, the audience is the issuer of your org, which is `https://{yourOktaDomain}` unless the client uses a custom domain issuer.

   ```bash
   spire-agent api fetch jwt \
     -audience https://{yourOktaDomain}/oauth2/{authorizationServerId} \
     -socketPath /tmp/spire-agent/public/api.sock
   ```

1. Confirm the claims. The `sub` claim must be the SPIFFE ID that you registered for the client. The `exp` claim is required and can't be more than one hour in the future. Request a new JWT-SVID before the current one expires.

   ```json
   {
     "alg": "ES256",
     "kid": "4vC8agycHu6rnkEEJYAH6VuCe4JoSkPV",
     "typ": "JWT"
   }
   {
     "sub": "spiffe://example.org/payments-service",
     "aud": "https://{yourOktaDomain}/oauth2/{authorizationServerId}",
     "exp": 1767225900
   }
   ```

After your SPIFFE deployment rotates its signing keys, Okta can reject a JWT-SVID that a new key signs until Okta refreshes its cached copy of the bundle. BUNDLE_CACHE_LIFETIME_SCOPE_TBD

JWT_SVID_HEADER_AND_ALG_LIMITS_SCOPE_TBD

## Request a token

Send the JWT-SVID to the token endpoint as the client assertion. Always include the `client_id`, even though the JWT-SVID identifies the workload. Use the Okta-generated client ID for an app integration, and the CIMD URL for a CIMD client.

### Request a token with the authorization code flow

1. Complete the authorization request and get an authorization code. See [Implement the authorization code flow](/docs/guides/implement-grant-type/authcode/main/). You exchange the code in the next step, so skip the token request in that guide.
1. Send a `POST` request to the [`/token` endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/tokenCustomAS). Set `client_assertion_type` to `urn:ietf:params:oauth:client-assertion-type:jwt-spiffe` and `client_assertion` to the JWT-SVID. If the app requires PKCE, also include the `code_verifier` parameter.

   ```bash
   curl -i -X POST \
     'https://{yourOktaDomain}/oauth2/{authorizationServerId}/v1/token' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/x-www-form-urlencoded' \
     --data-urlencode 'grant_type=authorization_code' \
     --data-urlencode 'code={authorizationCode}' \
     --data-urlencode 'redirect_uri=https://example.com/oauth2/callback' \
     --data-urlencode 'client_id={clientId}' \
     --data-urlencode 'client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-spiffe' \
     --data-urlencode 'client_assertion={jwtSvid}'
   ```

### Request a token with the client credentials flow

Use this flow when the workload acts on its own behalf and not for a user. AI agent CIMD clients can't use it. See [Register AI agents with a CIMD](/docs/guides/ai-agent-cimd-registration/).

1. Configure a service app as described in [Configure an app integration](#configure-an-app-integration). Confirm that a rule in your authorization server's access policy allows the `client_credentials` grant type. See [Configure an access policy](/docs/guides/configure-access-policy/).
1. Send a `POST` request to the [`/token` endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/tokenCustomAS). Okta returns an access token if the request succeeds.

   ```bash
   curl -i -X POST \
     'https://{yourOktaDomain}/oauth2/{authorizationServerId}/v1/token' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/x-www-form-urlencoded' \
     --data-urlencode 'grant_type=client_credentials' \
     --data-urlencode 'scope={scope}' \
     --data-urlencode 'client_id={clientId}' \
     --data-urlencode 'client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-spiffe' \
     --data-urlencode 'client_assertion={jwtSvid}'
   ```

Token request rules:

- Send only the JWT-SVID as the client credential, for a client that is set to `spiffe_jwt`. A request with a second credential, such as a client secret, or a client that uses another method returns an `invalid_request` error.
- Okta matches the scheme and trust domain of the `sub` claim without regard to case, but matches the path exactly. SPIFFE_ID_MATCHING_SCOPE_TBD
- Okta accepts a JWT-SVID that has a `jti` claim only once. Request a new JWT-SVID for each retry. JTI_REPLAY_SCOPE_TBD
- You can also use `spiffe_jwt` to authenticate on the introspection and revocation endpoints. INTROSPECT_REVOKE_SUPPORT_CONFIRM_TBD
- The org authorization server accepts `spiffe_jwt` for service apps. ORG_AS_SERVICE_APP_CONFIRM_TBD

If authentication fails, Okta returns an `invalid_client` error. Check the following causes:

| Cause | What to check |
| --- | --- |
| The `sub` claim doesn't match | The SPIFFE ID registered for the client |
| The trust domain isn't registered | The registration for the trust domain of the SPIFFE ID |
| Okta can't verify the signature | That the `bundleUrl` is reachable and that the bundle has a key for the JWT-SVID `kid` |
| The `aud` claim is wrong | That it's the only audience and is the issuer of the authorization server |
| The JWT-SVID has expired | That `exp` is in the future and no more than one hour away |

## Manage trust domains

Update or remove a registration after you create it. These tasks change the registration, not the clients that use it. Each request needs the registration ID. To find it, send a `GET` request to the [List all SPIFFE trust domain registrations](API_REF_SPIFFE_TRUST_DOMAIN_TBD) endpoint with `search=trustDomain eq "example.org"`.

### Update the bundle endpoint

Send a `PUT` request to the [Replace a SPIFFE trust domain registration](API_REF_SPIFFE_TRUST_DOMAIN_TBD) endpoint with the new `bundleUrl` and the existing `trustDomain`. The request can't change the `trustDomain`.

```bash
curl -i -X PUT \
  'https://{yourOktaDomain}/spiffe/api/v1/trust-domains/{trustDomainRegistrationId}' \
  -H 'Authorization: Bearer {yourOktaAccessToken}' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "trustDomain": "example.org",
    "bundleUrl": "https://bundle.example.com/spiffe/new-bundle.json"
  }'
```

### Delete a trust domain

After you delete a trust domain, workloads in it can no longer authenticate with a JWT-SVID.

1. Remove the trust domain from each app integration that uses it. Change the app integration's authentication method, move it to a SPIFFE ID in another registered trust domain, or delete the app integration.
1. Send a `DELETE` request to the [Delete a SPIFFE trust domain registration](API_REF_SPIFFE_TRUST_DOMAIN_TBD) endpoint. A successful request returns `204 No Content`.

   ```bash
   curl -i -X DELETE \
     'https://{yourOktaDomain}/spiffe/api/v1/trust-domains/{trustDomainRegistrationId}' \
     -H 'Authorization: Bearer {yourOktaAccessToken}'
   ```

Delete rules:

- The request returns a `409 Conflict` error while an app integration still has a SPIFFE ID in that trust domain.
- Okta doesn't count CIMD clients in that check. If you delete a trust domain that only CIMD clients use, the request succeeds and their token requests fail until you register the trust domain again.

## See also

- [Client authentication methods](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/)
- [Register apps with a Client ID Metadata Document (CIMD)](/docs/guides/app-cimd-registration/)
- [Register AI agents with a Client ID Metadata Document (CIMD)](/docs/guides/ai-agent-cimd-registration/)
- [SPIFFE overview](https://spiffe.io/docs/latest/spiffe-about/overview/)
- [JWT-SVID specification](https://github.com/spiffe/spiffe/blob/main/standards/JWT-SVID.md)
- [OAuth SPIFFE Client Authentication](https://datatracker.ietf.org/doc/draft-ietf-oauth-spiffe-client-auth/) (IETF Internet-Draft)
