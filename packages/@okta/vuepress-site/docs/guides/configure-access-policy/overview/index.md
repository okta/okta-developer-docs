---
title: Overview
---

Access policies help you secure your APIs by defining different access and refresh token lifetimes for a given combination of grant type, user, and scope. You create policy rules to determine if an application should be permitted to access specific information from your protected APIs and for how long. Access policies are specific to a particular authorization server and the client applications that you designate for the policy.

For example, an access token for a banking API may include a `transactions:read` scope with a multi-hour token lifetime. By contrast, the lifetime of an access token for transferring funds should be only a matter of minutes.

You can also [include custom claims](/docs/guides/customize-authz-server/create-claims/) in ID and access tokens to disclose the information that you want to share, depending on the client and the scope of the tokens. Scopes specify what access privileges are being requested as part of the authorization. Claims are statements about the user (or `subject`), such as name, role, or email address.

For example, a shopping site might have one set of claims for customers while they browse, but another claim for administrator functions like changing a customer's personal information. Custom claims also help you by reducing the number of lookup calls required to retrieve user information from the Identity Provider (IdP). This benefit depends on the level of security that your apps require.

Policies are evaluated in priority order, as are the rules in a policy. The first policy and rule that match the client request are applied and no further rule or policy processing occurs. If a client matches no policies, the authentication attempt fails and an error is returned.

## Configure access policies for common scenarios

This guide provides step-by-step instructions to configure an access policy for two of the most common scenarios:

* <GuideLink link="../limit-scopes-clients-can-access">Limit which scopes some clients can access</GuideLink>
* <GuideLink link="../configure-token-lifetime-per-client">Configure a custom token lifetime per client</GuideLink>

## Support

If you need help or have an issue, post a question on the [Okta Developer Forums](https://devforum.okta.com).

<NextSectionLink/>
