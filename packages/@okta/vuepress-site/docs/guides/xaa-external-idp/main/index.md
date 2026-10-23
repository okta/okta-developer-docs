---
title: Configure XAA with an external IdP
meta:
  - name: description
    content: Accept an ID-JAG that's issued by an external identity provider or another Okta org for XAA with a custom authorization server.
layout: Guides
---

<ApiLifecycle access="ie" />

Configure Cross App Access (XAA) to accept an Identity Assertion JWT Authorization Grant (ID-JAG) that's issued directly by an external identity provider (IdP), or by another Okta org, instead of only an ID-JAG that Okta itself issues.

---

#### Learning outcomes

- Understand how an external IdP fills the IdP role in the XAA flow with a custom authorization server.
- Understand the IdP usage that XAA requires.
- Understand how users are linked to the IdP.
- Add an IdP condition to an authorization server's access policy rule.
- Understand the token request and response for this flow.

#### What you need

- A custom authorization server. See [Create an authorization server](/docs/guides/customize-authz-server/).
- The scopes that the client requests and that must be created on the custom authorization server. See [Create Scopes](/docs/guides/customize-authz-server/main/#create-scopes).
- A generic OIDC IdP or an Okta Integration IdP that's already configured in your org. See [Add an external identity provider](/docs/guides/add-an-external-idp/).
- An app integration in your org that represents the AI agent, with the **JWT Bearer** grant type enabled. See [Configure Cross App Access with an external identity provider](https://help.okta.com/okta_help.htm?type=oie&id=apps-apps-config-xaa-external-idp).
- Users who exist in your org and who are linked to the IdP. See [Link users to the IdP](#link-users-to-the-idp).
- If the IdP is a third-party OIDC IdP, your org must be subscribed to Okta for AI Agents. If the IdP is another Okta org, your org only needs the SSO feature.
- For an Okta Integration IdP, OIDC federation between the issuing org and your org. See [Configure federation between orgs using OIDC](https://help.okta.com/okta_help.htm?type=oie&id=ext-org2org-intg).
- A scoped OAuth 2.0 [access token](/docs/guides/implement-oauth-for-okta/) with the `okta.authorizationServers.manage` scope. To link users with the API, the token also needs the `okta.users.manage` scope.

---

## Overview

In the standard [Cross App Access (XAA)](/docs/concepts/xaa/) flow, Okta fills the IdP role. This means that it issues the ID-JAG after the user signs in through Okta. This guide covers a scenario where an external OIDC IdP, or another Okta org acting as an Okta Integration IdP, acts as the IdP instead and issues the ID-JAG directly.

In this scenario, Okta acts only as the resource authorization server. This flow applies only to a custom authorization server. The Okta org authorization server doesn't accept an ID-JAG issued by an external IdP.

In this flow, a client such as an AI agent acts on behalf of a user. The user has an account at the external IdP that's linked to an Okta user. The ID-JAG identifies both the user and the client, and the resulting access token lets the client access a resource as that user. The client doesn't need a separately provisioned Okta credential.

This is a high-level overview of an XAA flow with an external IdP:

1. The client obtains an ID-JAG from the external IdP and presents it to the custom authorization server's `/token` endpoint as a `jwt-bearer` grant.
1. Okta trusts the ID-JAG from the external IdP. The `iss` claim in the ID-JAG must match an IdP in your org that has its IdP usage set to **Cross App Access only** or **SSO and Cross App Access**, and the authorization server's access policy must allow that IdP.
1. Okta retrieves the signing key from the JWKS endpoint that's configured for the IdP and uses it to verify the ID-JAG signature.
1. Okta matches the user, identified by the `sub` claim in the ID-JAG, to an Okta user through a linked IdP identity. The user doesn't sign in to Okta.
1. Okta issues a short-lived, scoped access token. The client uses that token to access the resource on behalf of the Okta user.

See [External IdP in the IdP role](/docs/concepts/xaa/#external-idp-in-the-idp-role) for the conceptual overview.

> **Note:** Another Okta org can fill the IdP role for org-to-org (Org2Org) scenarios. In your org, that Okta org is an Okta Integration IdP. See [Configure the issuing Okta org for Org2Org](#configure-the-issuing-okta-org-for-org2org).

Complete the following steps to configure and use an external IdP for XAA:

1. [Configure the external IdP for XAA](#configure-the-external-idp-for-xaa).
1. [Link users to the IdP](#link-users-to-the-idp).
1. [Configure the access policy IdP condition](#configure-the-access-policy-idp-condition).
1. [Configure the issuing Okta org for Org2Org](#configure-the-issuing-okta-org-for-org2org), if the IdP is another Okta org.
1. [Complete the token exchange at runtime](#complete-the-token-exchange-at-runtime).

## Configure the external IdP for XAA

An IdP can issue an ID-JAG that Okta trusts only if its **IdP Usage** is set to one of the following options in the Admin Console:

* **SSO and Cross App Access**: The IdP does two things. It signs users in to Okta through SSO, and it issues ID-JAGs that Okta accepts for XAA.
* **Cross App Access only**: The IdP only issues ID-JAGs that Okta accepts for XAA. It doesn't sign users in to Okta.

To set the IdP usage, see [Configure Cross App Access with an external identity provider](https://help.okta.com/okta_help.htm?type=oie&id=apps-apps-config-xaa-external-idp).

You can't change the IdP usage of an IdP after you save it with **Cross App Access only** or **SSO and Cross App Access**. To use a different option, delete the IdP and create a new one. See [IdP usage](/docs/concepts/identity-providers/#idp-usage) for what each option means for Okta's trust of the IdP.

## Link users to the IdP

Okta doesn't create a user when it receives an ID-JAG. Each user that the client acts for must exist in your org and be linked to the IdP. How the link is created depends on the IdP usage:

* **SSO and Cross App Access**: Okta links the user when they sign in to Okta through the IdP. Depending on the IdP's account linking and Just-In-Time (JIT) provisioning settings, Okta matches the user to an existing Okta user or creates one. See [Account Linking and Just-In-Time provisioning](/docs/concepts/identity-providers/#account-linking-and-just-in-time-provisioning).
* **Cross App Access only**: Users don't sign in to Okta through the IdP, so Okta can't link them automatically. Set `externalId` to the user's identifier at the IdP, which is the value of the `sub` claim in the ID-JAG.

Use the [Link a user to an IdP](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentityProviderUsers/#tag/IdentityProviderUsers/operation/linkUserToIdentityProvider) API to link users to the IdP.

```bash
curl -i -X POST \
  'https://{yourOktaDomain}/api/v1/idps/{idpId}/users/{userId}' \
  -H 'Authorization: Bearer {yourOktaAccessToken}' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "externalId": "{subClaimValue}"
  }'
```

* `{idpId}`: The ID of the IdP.
* `{userId}`: The ID of the Okta user.
* `externalId`: The user's identifier at the IdP. Use the value of the `sub` claim in the ID-JAGs that the IdP issues for this user.

## Configure the access policy IdP condition

Add an IdP condition to your authorization server's access policy rule to restrict a `jwt-bearer` grant. This ensures that Okta accepts an ID-JAG only from the IdPs that you select.

Okta checks this condition at the custom authorization server's `/token` endpoint, after it matches the ID-JAG's `iss` claim to an IdP in your org. If the IdP isn't one that the condition allows, the rule doesn't apply to the request. See [Configure an access policy](/docs/guides/configure-access-policy/).

To set the `xaaSupportedIdentityProvider` condition on a policy rule, follow these steps:

1. Confirm that the rule's grant types include `jwt-bearer`. The condition is valid only on those rules.
1. Decide which IdPs that the rule accepts an ID-JAG from. Set the following properties in the `xaaSupportedIdentityProvider` object:
   * `provider` (String): Set to `ANY` to accept an ID-JAG from any IdP that's configured for XAA. Set to `SPECIFIC_IDP` to accept an ID-JAG only from the IdPs that are listed in `idpIds`. The default value is `ANY`.
   * `idpIds` (Array of strings): The IDs of the IdPs to accept an ID-JAG from. This property is required when you set `provider` as `SPECIFIC_IDP`. Each IdP must have its IdP usage set to **Cross App Access only** or **SSO and Cross App Access**.

   Use `SPECIFIC_IDP` if your org has more than one IdP that's configured for XAA and you want the rule to apply to only some of them. To get the ID of an IdP, see [List all IdPs](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentityProvider/#tag/IdentityProvider/operation/listIdentityProviders).

1. Update the policy rule with the condition. This request replaces the entire rule, so include the rule's existing properties along with the new condition. The following example shows a rule that allows the `jwt-bearer` grant from a specific IdP:

   ```bash
   curl -i -X PUT \
     'https://{yourOktaDomain}/api/v1/authorizationServers/{authServerId}/policies/{policyId}/rules/{ruleId}' \
     -H 'Authorization: Bearer {yourOktaAccessToken}' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json' \
     -d '{
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
     }'
   ```

See [Replace a policy rule](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AuthorizationServerRules/#tag/AuthorizationServerRules/operation/replaceAuthorizationServerPolicyRule) and [Rule policies](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AuthorizationServerRules/).

## Configure the issuing Okta org for Org2Org

If the IdP is another Okta org, configure that org to issue ID-JAGs for your custom authorization server. In this section, the issuing org is the Okta org where the AI agent is registered. Your org is the org with the custom authorization server.

In the issuing org, enable XAA on the Org2Org app and set its **Issuer URL** to the issuer URL of your custom authorization server. Then add a resource connection for the AI agent to the Org2Org app. The issuing org then issues ID-JAGs for the AI agent with your custom authorization server as the audience. See [Configure Cross App Access with an external identity provider](https://help.okta.com/okta_help.htm?type=oie&id=apps-apps-config-xaa-external-idp).

## Complete the token exchange at runtime

After the IdP and access policy are configured, a client presents the externally issued ID-JAG directly to the custom authorization server's [`/token`](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/tokenCustomAS) endpoint. There's no separate exchange with the Okta org authorization server first.

1. Obtain an ID-JAG from the external IdP for the user. Typically, the client makes an [RFC 8693](https://datatracker.ietf.org/doc/html/rfc8693) token exchange request to the IdP's token endpoint with the following parameters:
   * `subject_token`: The user's ID token.
   * `requested_token_type`: `urn:ietf:params:oauth:token-type:id-jag`
   * `audience`: Your custom authorization server.

   The request details depend on the IdP. If the IdP is another Okta org, the client uses the standard XAA token exchange with the issuing org. See [Implement XAA token exchange for your requesting app](/docs/guides/xaa-request-token-ex/openidconnect/main/).

   The ID-JAG that the IdP returns must meet the following requirements:
   * The `aud` claim is your custom authorization server.
   * The `client_id` claim matches the client that sends the token request.
   * The `sub` claim identifies a user who has a linked identity in Okta.
   * The lifetime is no more than five minutes.

1. Send the ID-JAG to the `/token` endpoint. Authenticate the client with the client authentication method that's registered for your app on the custom authorization server.

   ```bash
   curl -i -X POST \
     'https://{yourOktaDomain}/oauth2/{authServerId}/v1/token' \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/x-www-form-urlencoded' \
     --data-urlencode 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer' \
     --data-urlencode 'assertion=eyJraWQiOiJuc3MwV3UyblE4...[external-idp-id-jag]' \
     --data-urlencode 'scope=chat.read chat.history' \
     --data-urlencode 'client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer' \
     --data-urlencode 'client_assertion=eyJhbGciOiJSUzI1NiIsInR5...[jwt]'
   ```

   * `grant_type`: The value must be `urn:ietf:params:oauth:grant-type:jwt-bearer`.
   * `assertion`: The ID-JAG issued by the external IdP.
   * `scope`: A space-separated list of the scopes that the client requests. Each scope must exist on the custom authorization server, and the access policy rule must allow it.
   * `client_assertion_type`: The value must be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`.
   * `client_assertion`: A signed JWT that's used for client authentication. This example uses the `private_key_jwt` client authentication method. If your client uses a different method, such as `client_secret_basic`, replace these parameters with the credentials for that method. See [Client authentication methods](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#client-authentication-methods).

Okta validates the request in this order:

1. Okta confirms that the request was sent to a custom authorization server and not to the Okta org authorization server.
1. Okta confirms that the `aud` claim in the ID-JAG matches the custom authorization server.
1. Okta matches the `iss` claim to a single trusted IdP that has its IdP usage set to **Cross App Access only** or **SSO and Cross App Access**. If no IdP matches, or if more than one IdP matches, Okta rejects the request.
1. Okta confirms that the `client_id` claim in the ID-JAG matches the client that sends the request.
1. Okta validates the time stamps in the ID-JAG. The ID-JAG can have a maximum lifetime of five minutes.
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
