---
title: Authenticate a client with a SPIFFE JWT-SVID
excerpt: Configure an OAuth 2.0 client so that a workload authenticates to Okta with its SPIFFE JWT-SVID instead of a client secret or private key.
layout: Guides
---

<ApiLifecycle access="ie" />

Configure an OAuth 2.0 client so that a workload, such as a backend service, a scheduled job, or an AI agent, authenticates to Okta with a JWT-SVID from its SPIFFE deployment. You don't create, store, or rotate a client secret or a private key in Okta.

---

#### Learning outcomes

- Understand how Okta uses a SPIFFE JWT-SVID to authenticate an OAuth 2.0 client.
- Register a SPIFFE trust domain in your org.
- Configure an app integration or a Client ID Metadata Document (CIMD) client to authenticate with `spiffe_jwt`.
- Request a token with a JWT-SVID.

#### What you need

- A SPIFFE implementation, such as SPIRE, that issues JWT-SVIDs to your workloads. See [SPIRE](https://spiffe.io/docs/latest/spire-about/).
- The SPIFFE ID of each workload that authenticates to Okta. See [SPIFFE ID specification](https://github.com/spiffe/spiffe/blob/main/standards/SPIFFE-ID.md).
- The trust domain of those SPIFFE IDs and the HTTPS URL of its bundle endpoint. Okta must be able to reach the endpoint, and it must serve JWT-SVID signing keys. See [SPIFFE Trust Domain and Bundle](https://github.com/spiffe/spiffe/blob/main/standards/SPIFFE_Trust_Domain_and_Bundle.md).
- An org with SPIFFE JWT-SVID client authentication enabled.
- A super admin or API Access Management admin role to manage trust domains. An org admin or read-only admin role can view trust domains but can't manage them.
- A scoped OAuth 2.0 [access token](/docs/guides/implement-oauth-for-okta/) with the `okta.spiffe.manage` and `okta.apps.manage` scopes.
- An authorization server that issues tokens to the client. See [Create an authorization server](/docs/guides/customize-authz-server/).
- For a CIMD client, an org with CIMD enabled and a CIMD URL that you host. See [Register apps with a Client ID Metadata Document (CIMD)](/docs/guides/app-cimd-registration/).

---

## Overview

This guide explains how to use SPIFFE JWT-SVIDs for client authentication with Okta. To follow the steps, you must already run SPIFFE and use Okta to protect APIs or AI agents. The guide doesn't explain how to set up SPIRE or another SPIFFE implementation.

### Key terms

This guide uses the following terms. SPIFFE terms come from the [SPIFFE standards](https://github.com/spiffe/spiffe/tree/main/standards) and Okta doesn't define them.

| Term | Description |
| --- | --- |
| SPIFFE | Secure Production Identity Framework For Everyone. A set of open-source standards for identifying software systems. |
| SPIRE | SPIFFE Runtime Environment. An implementation of the SPIFFE standards that issues identities to workloads. Other SPIFFE implementations exist, such as Istio, Consul, and cert-manager. |
| Workload | A piece of software that runs for a specific purpose, such as a backend service, a scheduled job, or an AI agent. In this guide, a workload is also the OAuth 2.0 client that authenticates to Okta. |
| SPIFFE ID | A URI that identifies a workload, in the format `spiffe://{trustDomain}/{workloadPath}`. For example, `spiffe://example.org/payments-service`. |
| Trust domain | The identity namespace that one SPIFFE implementation controls. It's the part of a SPIFFE ID after `spiffe://` and before the next `/`. In Okta, you register each trust domain with the URL of its bundle endpoint. |
| SVID | SPIFFE Verifiable Identity Document. The document that a workload uses to prove its SPIFFE ID. An SVID is either an X.509 certificate or a JWT. Okta only supports JWT-SVIDs, currently. |
| JWT-SVID | An SVID in JSON Web Token format. The `sub` claim holds the SPIFFE ID of the workload. Okta supports JWT-SVIDs for client authentication. |
| Bundle | The object that contains a trust domain's cryptographic keys, also called a trust bundle. Okta uses the keys marked for JWT-SVIDs to verify signatures. |
| Bundle endpoint | The HTTPS URL where a trust domain publishes its bundle. Okta retrieves the keys from this URL and caches them, so you don't upload keys to Okta. |

### SPIFFE values that Okta needs

Okta doesn't issue, store, or manage workload identities. It verifies the JWT-SVID that your SPIFFE implementation issues, and then applies your authorization server's access policy, as it does for any other client. With `spiffe_jwt`, the JWT-SVID replaces a client secret or a `private_key_jwt` assertion. The `spiffe_jwt` method is based on [OAuth SPIFFE Client Authentication](https://datatracker.ietf.org/doc/draft-ietf-oauth-spiffe-client-auth/) (IETF Internet-Draft).

You bring three values from your SPIFFE implementation to Okta.

| SPIFFE value | Where it comes from | Where you use it in Okta |
| --- | --- | --- |
| Trust domain and bundle endpoint URL | Your SPIFFE implementation. The bundle endpoint publishes the public keys that verify the trust domain's JWT-SVIDs. | The trust domain registration. Okta retrieves the keys itself, so you don't register or upload keys. |
| SPIFFE ID, such as `spiffe://example.org/payments-service` | Your SPIFFE implementation assigns it to the workload. | The `spiffe_id` of the client |
| JWT-SVID | The workload requests it from your SPIFFE implementation. | The `client_assertion` in the token request |

### How Okta authenticates a client with a JWT-SVID

1. The workload requests a JWT-SVID from your SPIFFE implementation, with the issuer of your authorization server as the audience. It sends the JWT-SVID and its client ID to the token endpoint of your authorization server.
1. Okta confirms that the JWT-SVID hasn't expired, that the `aud` claim is the issuer of the authorization server, and that the `sub` claim is the SPIFFE ID that you registered for the client.
1. Okta retrieves the signing keys from the bundle endpoint that you registered for the trust domain, and verifies the signature.
1. Okta authenticates the client and issues a token according to your access policy.

### Supported clients and limits

You can use `spiffe_jwt` with OpenID Connect (OIDC) web, native, and service apps that you create as app integrations, and with CIMD clients. You can also use it with AI agents that you register in Okta.

You can't use `spiffe_jwt` with single-page apps (SPAs) or with apps from the Okta Integration Network (OIN). Each client has one SPIFFE ID. Okta enforces that a SPIFFE ID belongs to only one app integration in your org, but it doesn't check CIMD clients. It works with the org authorization server and with custom authorization servers.

## Configure client authentication with a JWT-SVID

1. [Register the trust domain](#register-the-trust-domain) so that Okta can find the signing keys.
1. Configure the client with its SPIFFE ID, either as [an app integration](#configure-an-app-integration) or as [a CIMD client](#configure-a-cimd-client). For a CIMD client, the app owner adds the SPIFFE ID to the CIMD document.
1. [Get a JWT-SVID](#get-a-jwt-svid) for the workload from your SPIFFE implementation.
1. [Request a token](#request-a-token) with the JWT-SVID.
1. [Manage trust domains](#manage-trust-domains) to update or remove a registration.

### Register the trust domain

Register the trust domain of the SPIFFE IDs that your workloads use. The registration tells Okta where to get the keys that verify JWT-SVIDs from that trust domain. If your workloads use SPIFFE IDs in more than one trust domain, register each of those trust domains.

Complete this task before you configure any client. Okta rejects a client configuration, and token requests from a CIMD client, when the trust domain of the SPIFFE ID isn't registered.

1. Find the trust domain of your workloads' SPIFFE IDs and the HTTPS URL of its bundle endpoint. Both come from your SPIFFE implementation. For `spiffe://example.org/payments-service`, the trust domain is `example.org`.
1. Send a `POST` request to the [Create a SPIFFE trust domain registration](https://developer.okta.com/docs/api/openapi/okta-management/management/management/spiffetrustdomainregistration/createspiffetrustdomainregistration) endpoint to register the trust domain.
   1. Set `trustDomain` to the trust domain and `bundleUrl` to the HTTPS URL of the bundle endpoint.
   1. Save the `id` from the response. You need it to update or delete the registration.
   [[style="list-style-type:lower-alpha"]]

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

You can also register a trust domain in the Admin Console. See [Add a SPIFFE trust domain](https://help.okta.com/okta_help.htm?type=oie&id=).

Note the following rules about how registration of a trust domain works:

- The `bundleUrl` must use HTTPS and can't contain a wildcard or credentials. Okta checks that it's a valid URL, but it doesn't request the URL when you register the trust domain. Confirm that the URL returns your trust domain's bundle before you register it. A wrong URL shows up later as a failed token request.
- Each trust domain can have one registration, and you can't change `trustDomain` after you create it. An org can have up to 100 registrations. A duplicate or a request over the limit returns a `409 Conflict` error.

### Configure the client

Configure the client so that Okta can match a JWT-SVID to it. Okta matches the `sub` claim of the JWT-SVID to the SPIFFE ID of the client.

- Use an app integration if you manage the client's configuration in your org.
- Use a CIMD client if the app owner publishes the client's configuration at a URL.

#### Configure an app integration

In this scenario, you create or update the app integration for the workload.

1. Send a `POST` request to the [Create an application](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/application/other/createapplication) endpoint to create the app integration for the workload. To update an existing app integration instead, send a `PUT` request to the [Replace an application](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/#tag/Application/operation/replaceApplication) endpoint with the full app object.
1. In the request body, set `credentials.oauthClient.token_endpoint_auth_method` to `spiffe_jwt` and `settings.oauthClient.spiffe_id` to the SPIFFE ID of the workload. You must set both, and the trust domain of the SPIFFE ID must already be registered.

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

To create a service app, set `application_type` to `service` and `grant_types` to `client_credentials` in the request body, and omit the redirect URIs.

You can also set the authentication method and SPIFFE ID in the Admin Console. See [Configure an app integration for SPIFFE JWT-SVID authentication](https://help.okta.com/okta_help.htm?type=oie&id=).

Note the following rules about how updating an app integration works:

- The `spiffe_id` must be a valid SPIFFE ID, can't contain a wildcard, and can't belong to another app integration in your org.
- Single-page apps and the implicit and password grant types aren't supported with `spiffe_jwt`.
- Okta removes the `spiffe_id` if you change the authentication method or delete the app integration.
- If `spiffe_jwt` isn't enabled for your org, Okta rejects the request.

#### Configure a CIMD client

For a CIMD client, you register the CIMD URL in your org, and the app owner, who hosts the CIMD document, adds the SPIFFE ID to it.

1. Register the CIMD URL as an app integration, or convert an existing app integration to use the CIMD URL. See [Add a CIMD client to an app integration](/docs/guides/app-cimd-registration/#add-a-cimd-client-to-an-app-integration).
1. Ask the app owner to set `token_endpoint_auth_method` to `spiffe_jwt` in the CIMD document and to add the `spiffe_id` of the workload. The app owner can also add `spiffe_bundle_endpoint`.

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

Note the following rules about how updating a CIMD client works:

- Register the trust domain in your org first, even if the document includes `spiffe_bundle_endpoint`.
- If the document includes `spiffe_bundle_endpoint`, it must match the `bundleUrl` that you registered, or Okta rejects the request. If the document omits it, Okta uses the registered `bundleUrl`.
- The document doesn't need `jwks` or `jwks_uri`. This is because Okta gets the signing keys from the trust domain.
- Okta doesn't check that a SPIFFE ID is unique across CIMD clients.

### Get a JWT-SVID

Get a JWT-SVID for the workload from your SPIFFE implementation. The workload requests it through the [SPIFFE Workload API](https://github.com/spiffe/spiffe/blob/main/standards/SPIFFE_Workload_API.md). This section shows the request with the SPIRE agent command line. If you use a different SPIFFE implementation, use its Workload API.

1. Run the following command on the node where the workload runs to request a JWT-SVID. Set `-audience` to the issuer of the authorization server that receives the token request, and don't add other audiences. For the org authorization server, the audience is the issuer of your org, which is `https://{yourOktaDomain}` unless the client uses a custom domain issuer.

   ```bash
   spire-agent api fetch jwt \
     -audience https://{yourOktaDomain}/oauth2/{authorizationServerId} \
     -socketPath /tmp/spire-agent/public/api.sock
   ```

1. Save the JWT-SVID that the command prints. You send it as the `client_assertion` in the token request.
1. Verify the claims in the JWT-SVID before you send it to Okta. A JWT-SVID has three parts separated by periods, and the claims are in the second part.
   1. Decode the second part of the JWT-SVID. The following command uses `jq`. Replace `{jwtSvid}` with the JWT-SVID.
   [[style="list-style-type:lower-alpha"]]

      ```bash
      echo '{jwtSvid}' | cut -d. -f2 | tr '_-' '/+' | jq -R '@base64d | fromjson'
      ```

      The command prints the claims.

      ```json
      {
        "sub": "spiffe://example.org/payments-service",
        "aud": "https://{yourOktaDomain}/oauth2/{authorizationServerId}",
        "exp": 1767225900,
        "iat": 1767225600,
        "jti": "5f0c2a9e-3b7d-4c1e-9a62-8d4b1e7f0a33"
      }
      ```

      The `exp` claim is required. The `iat` and `jti` claims are optional. If the JWT-SVID includes a `jti`, Okta accepts it only once, so request a new JWT-SVID for each retry.

   1. Confirm that `sub` is the SPIFFE ID that you registered for the client.
   1. Confirm that `aud` is the issuer of the authorization server that receives the token request.
   1. Confirm that `exp` is in the future and no more than one hour from now.

If a claim doesn't match, request a new JWT-SVID with the correct audience, or correct the SPIFFE ID registered for the client. Request a new JWT-SVID before the current one expires.

After your SPIFFE implementation rotates its signing keys, Okta can reject a JWT-SVID that a new key signs until Okta refreshes its cached copy of the bundle.

### Request a token

At this point, you have a JWT-SVID with the correct claims and the `client_id` of the client.

Next, send the JWT-SVID to the token endpoint of the authorization server as the client assertion. The request must also include the `client_id`, even though the JWT-SVID identifies the workload. For an app integration, the `client_id` is the Okta-generated client ID. For a CIMD client, it's the CIMD URL.

#### Request a token with the authorization code flow

Your app completes these steps. The user signs in during the authorization request.

1. Start the authorization request from the app so that the user signs in and Okta returns an authorization code. See [Implement the authorization code flow](/docs/guides/implement-grant-type/authcode/main/). That guide's token request uses a client secret, so skip it and use the request in the next step.
1. Send a `POST` request to the [`/token` endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/tokenCustomAS) to exchange the code for tokens.
1. Set `client_assertion_type` to `urn:ietf:params:oauth:client-assertion-type:jwt-spiffe` and `client_assertion` to the JWT-SVID. If the app requires PKCE, also include the `code_verifier` parameter.

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

#### Request a token with the client credentials flow

Use this flow when the workload acts on its own behalf and not for a user. AI agent CIMD clients can't use it. See [Register AI agents with a CIMD](/docs/guides/ai-agent-cimd-registration/).

1. Configure a service app as described in [Configure an app integration](#configure-an-app-integration), and confirm that a rule in the authorization server's access policy allows the `client_credentials` grant type. See [Configure an access policy](/docs/guides/configure-access-policy/).
1. Send a `POST` request to the [`/token` endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/tokenCustomAS) to get an access token. Okta returns the access token if the request succeeds.

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

Note the following rules about how the token request works:

- Send only the JWT-SVID as the client credential, for a client that is set to `spiffe_jwt`. A request with a second credential, such as a client secret, or a client that uses another method returns an `invalid_request` error.
- Okta matches the scheme and trust domain of the `sub` claim without regard to case, but matches the path exactly.
- Okta accepts a JWT-SVID that has a `jti` claim only once. Request a new JWT-SVID for each retry.
- You can also use `spiffe_jwt` to authenticate on the introspection and revocation endpoints.
- The org authorization server accepts `spiffe_jwt` for service apps.

If authentication fails, Okta returns an `invalid_client` error. Check the following causes:

| Cause | What to check |
| --- | --- |
| The `sub` claim doesn't match | The SPIFFE ID registered for the client |
| The trust domain isn't registered | The registration for the trust domain of the SPIFFE ID |
| Okta can't verify the signature | That the `bundleUrl` is reachable and that the bundle has a key for the JWT-SVID `kid` |
| The `aud` claim is wrong | That it's the only audience and is the issuer of the authorization server |
| The JWT-SVID has expired | That `exp` is in the future and no more than one hour away |

### Manage trust domains

A trust domain registration tells Okta where to get the keys that verify JWT-SVIDs from that trust domain. Keep it in step with your SPIFFE setup. Update the registration if the URL of the bundle endpoint changes. Delete it if you stop using the trust domain, or to make room under the limit of 100 registrations per org.

These tasks change the registration, not the clients that use it. Each request needs the ID of the registration. To find it, send a `GET` request to the [List all SPIFFE trust domain registrations](https://developer.okta.com/docs/api/openapi/okta-management/management/management/spiffetrustdomainregistration/listspiffetrustdomainregistrations) endpoint with the query `search=trustDomain eq "example.org"`.

#### Update the bundle endpoint

Update the registration when your SPIFFE implementation serves the trust domain's bundle from a different URL. Until you update it, Okta keeps requesting the old URL. To change the bundle endpoint of a trust domain, send a `PUT` request to the [Replace a SPIFFE trust domain registration](https://developer.okta.com/docs/api/openapi/okta-management/management/management/spiffetrustdomainregistration/replacespiffetrustdomainregistration) endpoint. Include the new `bundleUrl` and the existing `trustDomain` in the request body. The request can't change the `trustDomain`. If a CIMD document includes `spiffe_bundle_endpoint`, it must match the new `bundleUrl`, so ask the app owner to update it.

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

#### Delete a trust domain

Delete the registration when you no longer use the trust domain, for example after you retire it or move its workloads to another trust domain. After you delete a trust domain, workloads in it can no longer authenticate with a JWT-SVID.

1. Stop using the trust domain in each app integration that has a SPIFFE ID in it. Change the app integration's authentication method, change its `spiffe_id` to a SPIFFE ID in another registered trust domain, or delete the app integration.
1. Send a `DELETE` request to the [Delete a SPIFFE trust domain registration](https://developer.okta.com/docs/api/openapi/okta-management/management/management/spiffetrustdomainregistration/deletespiffetrustdomainregistration) endpoint to delete the registration. A successful request returns `204 No Content`.

   ```bash
   curl -i -X DELETE \
     'https://{yourOktaDomain}/spiffe/api/v1/trust-domains/{trustDomainRegistrationId}' \
     -H 'Authorization: Bearer {yourOktaAccessToken}'
   ```

Note the following rules about deleting trust domains:

- The request returns a `409 Conflict` error while an app integration still has a SPIFFE ID in that trust domain.
- Okta doesn't count CIMD clients in that check. If you delete a trust domain that only CIMD clients use, the request succeeds and their token requests fail until you register the trust domain again.

## See also

- [Client authentication methods](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/)
- [Register apps with a Client ID Metadata Document (CIMD)](/docs/guides/app-cimd-registration/)
- [Register AI agents with a Client ID Metadata Document (CIMD)](/docs/guides/ai-agent-cimd-registration/)
- [SPIFFE overview](https://spiffe.io/docs/latest/spiffe-about/overview/)
- [JWT-SVID specification](https://github.com/spiffe/spiffe/blob/main/standards/JWT-SVID.md)
- [OAuth SPIFFE Client Authentication](https://datatracker.ietf.org/doc/draft-ietf-oauth-spiffe-client-auth/) (IETF Internet-Draft)
