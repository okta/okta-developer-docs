---
title: Configure XAA with an external IdP
excerpt: Accept an ID-JAG issued by an external identity provider or another Okta org for XAA against a custom authorization server.
layout: Guides
---

<ApiLifecycle access="ie" />

Configure Cross App Access (XAA) to accept an Identity Assertion JWT Authorization Grant (ID-JAG) issued directly by an external identity provider (IdP), or by another Okta org, instead of only an ID-JAG that Okta itself issues.

---

#### Learning outcomes

- Understand how an external IdP fills the IdP role in the XAA flow against a custom authorization server.
- Configure an identity provider profile for XAA.
- Add an Identity Provider condition to an access policy rule.
- Understand the token request and response for this flow.

#### What you need

- A custom authorization server. See [Create an authorization server](/docs/guides/customize-authz-server/).
- A generic OIDC identity provider or an Okta Integration IdP already configured in your org. See [Add an external identity provider](/docs/guides/add-an-external-idp/).
- A scoped OAuth 2.0 [access token](/docs/guides/implement-oauth-for-okta/) with the `okta.identityProviders.manage` and `okta.policies.manage` scopes

---

## Overview

In the standard [Cross App Access (XAA)](/docs/concepts/xaa/) flow, Okta fills the IdP role. It issues the ID-JAG after the user signs in through Okta. This guide covers a scenario where an external OIDC IdP, or another Okta org acting as an Okta Integration IdP, acts as the IdP instead and issues the ID-JAG directly.

In this variant, Okta acts only as the resource authorization server. Okta trusts the ID-JAG from the external IdP, resolves the signing key from that IdP's JWKS endpoint, and resolves the user through an existing linked identity rather than through a sign-in. See [External IdP in the IdP role](/docs/concepts/xaa/#external-idp-in-the-idp-role) for the conceptual overview.

This flow applies only to a custom authorization server. The Okta org authorization server doesn't accept an ID-JAG issued by an external IdP.

> **Note:** An Okta Integration IdP is a supported issuer type for this flow, so another Okta org can fill the IdP role for org-to-org (Org2Org) scenarios. This guide doesn't cover configuring XAA on an Org2Org app instance in the Admin Console.

## End-to-end flow

This scenario lets an agent that already holds an identity token from a customer-configured external IdP, or from another Okta org, exchange that token directly for an Okta-issued access token. The agent doesn't need a separately provisioned Okta credential.

At runtime, the agent obtains an ID-JAG from the external IdP and presents it to the custom authorization server as a `jwt-bearer` grant. Okta validates the ID-JAG and resolves it to an existing linked Okta user before issuing a scoped access token. See [Complete the token exchange at runtime](#complete-the-token-exchange-at-runtime) for the request and validation details.

To configure this flow, follow these steps:

1. [Configure the external IdP for XAA](#configure-the-external-idp-for-xaa).
1. [Configure the access policy Identity Provider condition](#configure-the-access-policy-identity-provider-condition).
1. [Complete the token exchange at runtime](#complete-the-token-exchange-at-runtime).

## Configure the external IdP for XAA

An IdP is eligible to issue an ID-JAG that Okta trusts only if it already carries an identity provider profile for XAA. See [IdP usage](/docs/concepts/identity-providers/#idp-usage) for the available usage options.

Assign a profile to an existing IdP with the Identity Providers API:

```bash
POST /api/v1/idps/{idpId}/profiles
```

```json
{
  "type": "SSO_XAA"
}
```

* Set `type` to `SSO_XAA` if the IdP also signs users in to Okta through SSO.
* Set `type` to `XAA` if the IdP is used only to vouch for XAA authorization grants. An IdP with an `XAA`-only profile can't be updated. Delete the profile and create a new one instead.

See [IdP usage](/docs/concepts/identity-providers/#idp-usage) for what each option means for Okta's trust of the IdP.

> **Note:** The payload for creating an IdP with only an `XAA` profile is still being finalized. This section documents assigning a profile to an existing IdP. Check back for the dedicated creation payload.

See [Create an Identity Provider](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentityProvider/#tag/IdentityProvider/operation/createIdentityProvider) and [Identity Provider](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentityProvider/) for the full Identity Providers API reference.

## Configure the access policy identity provider condition

Add an identity provider condition to your authorization server's access policy rule to restrict a `jwt-bearer` grant. This ensures that Okta accepts an ID-JAG only from the identity providers you select. See [Configure an access policy](/docs/guides/configure-access-policy/).

Set the `xaaSupportedIdentityProvider` condition on a policy rule:

```bash
PUT /api/v1/authorizationServers/{authServerId}/policies/{policyId}/rules/{ruleId}
```

```json
{
  "conditions": {
    "xaaSupportedIdentityProvider": {
      "provider": "SPECIFIC_IDP",
      "idpIds": [
        "{idpId}"
      ]
    }
  }
}
```

| Property | Type | Description |
| --- | --- | --- |
| `provider` | String | `ANY` to accept an ID-JAG from any eligible IdP, or `SPECIFIC_IDP` to restrict to the IdPs listed in `idpIds`. |
| `idpIds` | Array of strings | The IdP IDs to accept. Required when `provider` is `SPECIFIC_IDP`. |

This condition is valid only on a rule whose grant types include `jwt-bearer`, and only identity providers with an `XAA` or `SSO_XAA` profile are selectable.

See [Replace a policy rule](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AuthorizationServerRules/#tag/AuthorizationServerRules/operation/replaceAuthorizationServerPolicyRule) and [Rule policies](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AuthorizationServerRules/) for the full policy rule API reference.

## Complete the token exchange at runtime

After the IdP and access policy are configured, a client presents the externally issued ID-JAG directly to the custom authorization server's [`/token`](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/tokenCustomAS) endpoint. There's no separate exchange with the Okta org authorization server first.

```bash
curl --location --request POST \
  --url 'https://{yourOktaDomain}/oauth2/{authServerId}/v1/token' \
  --header "Content-Type: application/x-www-form-urlencoded" \
  --header "Accept: application/json" \
  --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer" \
  --data-urlencode "assertion=eyJraWQiOiJuc3MwV3UyblE4...[external-idp-id-jag]"
```

| Parameter | Description and value |
| --- | --- |
| `grant_type` | The value must be `urn:ietf:params:oauth:grant-type:jwt-bearer`. |
| `assertion` | The ID-JAG issued by the external IdP. |

Authenticate the client with the client authentication method registered for your app on the custom authorization server.

Okta validates the ID-JAG, in order:

1. Confirms the authorization server isn't the Okta org authorization server.
1. Validates the audience.
1. Resolves the `iss` claim to a trusted, unambiguous IdP that carries an `XAA` or `SSO_XAA` profile. An unmatched or ambiguous issuer is rejected.
1. Confirms the `client_id` in the ID-JAG matches the client making the request.
1. Validates the ID-JAG's timestamps, including a 5-minute maximum lifetime.
1. Verifies the signature using a key from the IdP's JWKS endpoint.
1. Confirms the ID-JAG hasn't already been used.
1. Resolves the subject (`sub` claim) to an Okta user through an existing linked identity (`externalId`) between that user and the IdP. If no link exists, the request fails.

```JSON
{
  "token_type": "Bearer",
  "expires_in": 3600,
  "access_token": "eyJraWQiOiJQLVgxeC1ITWtuSThPS0lUeE5TWVlsMHR0blJobUY4Q0xTaUdBenlwemJVIiwiYWxnIjoi...",
  "scope": "chat.read chat.history"
}
```

## See also

- [Cross App Access (XAA)](/docs/concepts/xaa/)
- [External Identity Providers](/docs/concepts/identity-providers/)
- [Add an external identity provider](/docs/guides/add-an-external-idp/)
- [Configure an access policy](/docs/guides/configure-access-policy/)
- [Create an authorization server](/docs/guides/customize-authz-server/)
- [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/)
- [Set up third-party AI agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/)
