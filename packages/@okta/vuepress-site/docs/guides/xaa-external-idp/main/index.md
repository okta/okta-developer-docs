---
title: Configure XAA with an external IdP
meta:
  - name: description
    content: Accept an ID-JAG issued by an external identity provider or another Okta org for XAA with a custom authorization server.
layout: Guides
---

<ApiLifecycle access="ie" />

Configure Cross App Access (XAA) to accept an Identity Assertion JWT Authorization Grant (ID-JAG) issued directly by an external identity provider (IdP), or by another Okta org, instead of only an ID-JAG that Okta itself issues.

---

#### Learning outcomes

- Understand how an external IdP fills the IdP role in the XAA flow with a custom authorization server.
- Configure an IdP profile for XAA.
- Add an IdP condition to an authorization server's access policy rule.
- Understand the token request and response for this flow.

#### What you need

- A custom authorization server. See [Create an authorization server](/docs/guides/customize-authz-server/).
- A generic OIDC IdP or an Okta Integration IdP that's already configured in your org. See [Add an external identity provider](/docs/guides/add-an-external-idp/).
- A scoped OAuth 2.0 [access token](/docs/guides/implement-oauth-for-okta/) with the `okta.idps.manage` and `okta.authorizationServers.manage` scopes.

---

## Overview

In the standard [Cross App Access (XAA)](/docs/concepts/xaa/) flow, Okta fills the IdP role. This means that it issues the ID-JAG after the user signs in through Okta. This guide covers a scenario where an external OIDC IdP, or another Okta org acting as an Okta Integration IdP, acts as the IdP instead and issues the ID-JAG directly.

In this scenario, Okta acts only as the resource authorization server. This flow applies only to a custom authorization server. The Okta org authorization server doesn't accept an ID-JAG issued by an external IdP.

In this flow, a client such as an AI agent acts on behalf of a user. The user has an account at the external IdP that's linked to an Okta user. The ID-JAG identifies both the user and the client, and the resulting access token lets the client access a resource as that user. The client doesn't need a separately provisioned Okta credential.

This is a high-level overview of an XAA flow with an external IdP:

1. The client obtains an ID-JAG from the external IdP and presents it to the custom authorization server's `/token` endpoint as a `jwt-bearer` grant.
1. Okta trusts the ID-JAG from the external IdP. The `iss` claim in the ID-JAG must match an IdP in your org that has an `XAA` or `SSO_XAA` profile, and the authorization server's access policy must allow that IdP.
1. Okta retrieves the signing key from the JWKS endpoint configured for the IdP and uses it to verify the ID-JAG signature.
1. Okta matches the user, identified by the `sub` claim in the ID-JAG, to an existing Okta user through a linked IdP identity. The user doesn't sign in to Okta.
1. Okta issues a short-lived, scoped access token. The client uses that token to access the resource on behalf of the Okta user.

See [External IdP in the IdP role](/docs/concepts/xaa/#external-idp-in-the-idp-role) for the conceptual overview.

> **Note:** An Okta Integration IdP is a supported issuer type for this flow, so another Okta org can fill the IdP role for org-to-org (Org2Org) scenarios. This guide doesn't cover configuring XAA on an Org2Org app instance in the Admin Console.

Complete the following steps to configure and use an external IdP for XAA:

1. [Configure the external IdP for XAA](#configure-the-external-idp-for-xaa).
1. [Configure the access policy IdP condition](#configure-the-access-policy-idp-condition).
1. [Complete the token exchange at runtime](#complete-the-token-exchange-at-runtime).

## Configure the external IdP for XAA

An IdP is eligible to issue an ID-JAG that Okta trusts only if it already carries an IdP profile for XAA. The profile type corresponds to the IdP usage option in the Admin Console.

To assign a profile to an existing IdP with the Identity Providers API, follow these steps:

1. Choose the profile `type`.
   * `SSO_XAA` (**SSO and Cross App Access** in the Admin Console): The IdP does two things. It signs users in to Okta through SSO, and it issues ID-JAGs that Okta accepts for XAA.
   * `XAA` (**Cross App Access only** in the Admin Console): The IdP only issues ID-JAGs that Okta accepts for XAA. It doesn't sign users in to Okta.

   You can't update an `XAA` or `SSO_XAA` IdP profile after you create it. To change the IdP profile type, for example to switch from `XAA` to `SSO_XAA`, delete the profile and create a new one. See [IdP usage](/docs/concepts/identity-providers/#idp-usage) for what each option means for Okta's trust of the IdP.
1. Assign the profile:

   ```bash
   POST /api/v1/idps/{idpId}/profiles
   ```

   ```json
   {
     "type": "SSO_XAA"
   }
   ```

See [Identity Provider](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentityProvider/) for the Identity Providers API reference.

## Configure the access policy IdP condition

Add an IdP condition to your authorization server's access policy rule to restrict a `jwt-bearer` grant. This ensures that Okta accepts an ID-JAG only from the IdPs that you select. See [Configure an access policy](/docs/guides/configure-access-policy/).

To set the `xaaSupportedIdentityProvider` condition on a policy rule, follow these steps:

1. Confirm that the rule's grant types include `jwt-bearer`. The condition is valid only on those rules.
1. Choose which IdPs to accept:
   * `provider` (String): `ANY` to accept an ID-JAG from any eligible IdP, or `SPECIFIC_IDP` to restrict to the IdPs listed in `idpIds`.
   * `idpIds` (Array of strings): The IdP IDs to accept. Required when `provider` is `SPECIFIC_IDP`.

   Only IdPs with an `XAA` or `SSO_XAA` profile are selectable.

1. Update the policy rule with the condition. This request replaces the entire rule, so include the rule's existing properties along with the new condition. The following example shows a rule that allows the `jwt-bearer` grant from a specific IdP:

   ```bash
   PUT /api/v1/authorizationServers/{authServerId}/policies/{policyId}/rules/{ruleId}
   ```

   ```json
   {
     "type": "RESOURCE_ACCESS",
     "name": "XAA external IdP rule",
     "conditions": {
       "people": {
         "groups": {
           "include": [
             "EVERYONE"
           ]
         }
       },
       "grantTypes": {
         "include": [
           "urn:ietf:params:oauth:grant-type:jwt-bearer"
         ]
       },
       "scopes": {
         "include": [
           "*"
         ]
       },
       "xaaSupportedIdentityProvider": {
         "provider": "SPECIFIC_IDP",
         "idpIds": [
           "{idpId}"
         ]
       }
     }
   }
   ```

See [Replace a policy rule](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AuthorizationServerRules/#tag/AuthorizationServerRules/operation/replaceAuthorizationServerPolicyRule) and [Rule policies](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AuthorizationServerRules/).

## Complete the token exchange at runtime

After the IdP and access policy are configured, a client presents the externally issued ID-JAG directly to the custom authorization server's [`/token`](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/tokenCustomAS) endpoint. There's no separate exchange with the Okta org authorization server first.

1. Obtain an ID-JAG from the external IdP for the user. Typically, the client makes an [RFC 8693](https://datatracker.ietf.org/doc/html/rfc8693) token exchange request to the IdP's token endpoint with the following parameters:
   * `subject_token`: The user's ID token.
   * `requested_token_type`: `urn:ietf:params:oauth:token-type:id-jag`
   * `audience`: Your custom authorization server.

   The request details depend on the IdP. The ID-JAG that the IdP returns must meet the following requirements:
   * The `aud` claim is your custom authorization server.
   * The `client_id` claim matches the client that sends the token request.
   * The `sub` claim identifies a user who has a linked identity in Okta.
   * The lifetime is no more than 5 minutes.

1. Send the ID-JAG to the `/token` endpoint. Authenticate the client with the client authentication method registered for your app on the custom authorization server.

   ```bash
   curl --location --request POST \
     --url 'https://{yourOktaDomain}/oauth2/{authServerId}/v1/token' \
     --header "Content-Type: application/x-www-form-urlencoded" \
     --header "Accept: application/json" \
     --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer" \
     --data-urlencode "assertion=eyJraWQiOiJuc3MwV3UyblE4...[external-idp-id-jag]" \
     --data-urlencode "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer" \
     --data-urlencode "client_assertion=eyJhbGciOiJSUzI1NiIsInR5...[jwt]"
   ```

   * `grant_type`: The value must be `urn:ietf:params:oauth:grant-type:jwt-bearer`.
   * `assertion`: The ID-JAG issued by the external IdP.
   * `client_assertion_type`: The value must be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`.
   * `client_assertion`: A signed JWT that's used for client authentication. This example uses the `private_key_jwt` client authentication method. If your client uses a different method, such as `client_secret_basic`, replace these parameters with the credentials for that method. See [Client authentication methods](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#client-authentication-methods).

Okta validates the parameters of the ID-JAG, in this order:

1. Okta confirms that the request was sent to a custom authorization server and not to the Okta org authorization server.
1. Okta confirms that the `aud` claim in the ID-JAG matches the custom authorization server.
1. Okta matches the `iss` claim to a single trusted IdP that has an `XAA` or `SSO_XAA` profile. If no IdP matches, or if more than one IdP matches, Okta rejects the request.
1. Okta confirms that the `client_id` claim in the ID-JAG matches the client that sends the request.
1. Okta validates the timestamps in the ID-JAG. The ID-JAG can have a maximum lifetime of 5 minutes.
1. Okta verifies the ID-JAG signature with a key from the JWKS endpoint configured for the IdP.
1. Okta confirms that the ID-JAG hasn't already been used.
1. Okta matches the `sub` claim to an Okta user through an existing linked identity (`externalId`) between that user and the IdP. If no link exists, the request fails.

If validation succeeds, Okta returns an access token:

```json
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
