---
title: Configure claims sharing
excerpt: Learn how to configure an identity provider to send claims during SSO
layout: Guides
---

<ApiLifecycle access="ea" />

This guide explains how to configure <StackSnippet snippet="idptypetop" inline /> identity provider (IdP) to send authentication claims during Single Sign-On (SSO).

---

#### Learning outcomes

* Know the purpose of claims sharing
* Configure your <StackSnippet snippet="idptype" inline /> identity provider (IdP) to send authentication claims during SSO

#### What you need

* An Okta SP org and an Okta IdP org configured for an [Okta-to-Okta](/docs/guides/add-an-external-idp/oktatookta/main/) use case. This guide covers how to configure authentication claims sharing for this scenario.
* The **Okta-to-Okta Claims Sharing** feature enabled for both orgs. Go to **Settings | Features**, locate the feature, and then enable it.
* If you don't have Okta orgs, you can create [Okta Developer Edition orgs](https://developer.okta.com/signup).

---

## Overview

Claims sharing is the exchange of identity-related information (claims) between different orgs to enable secure access to resources. A claim is a statement made about a user or entity, such as their username, email address, roles, or permissions. This statement is then shared to help determine access rights.

> **Note:** Okta claims sharing currently supports only Okta IdPs and SPs.

### Authentication claims sharing

Authentication claims sharing allows an admin to configure their Okta org to trust claims from IdPs during SSO. Sharing claims also allows Okta to interpret the authentication context from an IdP. This helps eliminate duplicate factor challenges during user authentication and helps improve security posture.

Claims sharing provides assurance context to Okta during policy evaluation. For example, these claims give Okta a better understanding of which factors were used by the IdP to verify the user's identity. Claims do this by conveying information from the IdP that's needed to make policy decisions in the SP. This creates a seamless and secure user experience, which reduces friction and boosts productivity to achieve end-to-end security.

### Accepted authenticators

All authenticators that are natively performed on the Okta IdP are accepted. This includes authenticators such as WebAuthn, password, Okta Verify, Okta FastPass, SMS, email, and so on. Claim sharing doesn't currently support the use of any Custom Authenticators for MFA, such as using another IdP or smart card.

### AMR claims mapping is enabled on your org

When you enable the **Okta-to-Okta Claims Sharing** feature for your orgs and trust claims from an identity provider, Okta ignores the legacy **AMR Claims Mapping** feature.

### <StackSnippet snippet="idptype" inline /> IdP authentication claims sharing

<StackSnippet snippet="idpauthclaimssharing" />

#### Example <StackSnippet snippet="idpresponsetitle" inline />

<StackSnippet snippet="idpresponse" />

## Configure claims sharing for Okta orgs

The **Okta-to-Okta Claims Sharing** feature enables claims sharing between Okta orgs. This section covers how to configure authentication claims sharing for this use case.

### Okta IdP configuration

Okta supports the use of SAML 2.0 and OpenID Connect app integrations, and the Org2Org app in the OIN catalog. This is the app that you use for authenticating and authorizing your users. Use the app that you have configured in your Okta IdP org for this example use case. There are no configuration requirements for claims sharing for the Okta IdP org.

### Okta SP configuration

To use claims sharing, update the IdP settings in your Okta SP org by adding the `trustClaims: true` key and value pair to your IdP PUT request. Alternatively, you can enable the **Trust claims from this identity provider** checkbox in the Admin Console. See <StackSnippet snippet="addanidp" inline />.

> **Note:** When **Okta-to-Okta Claims Sharing** and the legacy **AMR Claims Mapping** feature are both used in your SP org, claims sharing is the only feature considered. The `mapAMRClaims` property (**Trust AMR claims from this identity provider** checkbox in the Admin Console) is associated with the legacy claims mapping feature. If you include this property and the `trustClaims: true` property in your request, only the `trustClaims` property is considered.

#### Example Okta <StackSnippet snippet="idptype" inline /> IdP update request

<StackSnippet snippet="idpupdaterequest" />

#### Response example

> **Note:** This example is truncated for brevity.

<StackSnippet snippet="idpupdateresponse" />

## Policies and claims sharing

You can configure many scenarios for authentication using claims sharing and policies in your Okta SP and Okta IdP orgs.

### Authentication policy example

[Create an authentication policy and rule for your app](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-auth-policy) in your SP org. Select any two factors, don't select a possession constraint, and allow any authenticators.

With trust claims enabled and your IdP org able to verify any two factors, you can satisfy the requirements in the SP org.

#### Other authentication policy scenarios

* **Possession factor constraints:** If you enable any possession factor constraints in the authentication policy of your SP org, the IdP org must satisfy the requirement with appropriate factor verification.

* **Authentication methods:**
  * **Allow any method that can be used to meet the requirement**: If you enable this setting in your SP org, you can satisfy the policy requirements by using any authenticator that meets those requirements. This includes authenticators that aren't configured locally in the SP org.
  * **Disallow specific authentication methods**: If you specify authentication methods to disallow, then the SP org disallows those methods.
  * **Allow specific authentication methods**: If you specify authentication methods to allow, then the SP org only considers those methods.

  After you define these conditions, if you still haven't met the policy requirement, then the SP org redirects you to verify any locally configured authenticator. If there's no local authenticator available, or the enrollment policy for a particular authenticator is disabled, then the SP org displays an error.

### Global session policy example

This same concept applies to the global session policy. Without trust claims enabled, if you have only the password authenticator configured in the SP org, you can't save a global session policy rule that requires MFA.

However, with trust claims enabled, you can specify MFA as required. As long as the claim is coming from the IdP, the session is established because that claim can satisfy the global session policy rule.

### Okta Identity Engine and Classic Engine orgs

If you have a combination of Okta Identity Engine and Classic Engine orgs, the rules work in the following ways:

#### Example scenario one

Your SP org is an Identity Engine org. Your IdP is a Classic Engine org. MFA from the Classic Engine org can only satisfy one of the following authentication policy rules on the Identity Engine SP org:

* **Any 1 factor type/IdP**
* **Any 2 factor types**

For the global session policy, MFA from the Classic Engine org can only satisfy the **Any factor used to meet the Authentication Policy requirements** rule.

#### Example scenario two

Your IdP org is an Identity Engine org. Your SP org is a Classic Engine org. The Classic Engine org only evaluates whether MFA was completed, such as if more than one factor verification was performed on the IdP org.

## Test your integration

To test your integration, first [configure a routing rule](https://help.okta.com/okta_help.htm?id=ext-cfg-routing-rules) for the IdP and then use the IdP to sign in.

### Configure a routing rule for the IdP

Configure a simple routing rule for the IdP in the Okta SP org for this example use case.

* Click **Add Routing Rule**.
* Enter a name and leave the default values.
* In the **THEN Use this identity provider** section, add your IdP in the **IdP(s)** field.
* Click **Create Rule**.

### Use the IdP to sign in

1. Access your Okta SP org using your browser's privacy or incognito mode to avoid false positive or negative results.
1. Click **Sign in with {Name of IdP}** on the Okta sign-in page.

   The following are the results if everything is configured properly:

   * The user is redirected to the IdP's sign-in page.
   * The authenticators configured in the authentication policy prompt the user for more authentication.
   * After successful authentication, the user is redirected to the <StackSnippet snippet="redirect" inline /> specified in the Okta IdP org.

   If something is configured incorrectly, the authorization response contains error information to help you resolve the issue.

## Trust claims deletion/deactivation

You can only deactivate or delete an IdP with trust claims enabled if there are other active IdPs that have trust claims enabled. Or, you can deactivate or delete the IdP if all policies are configured in a way that doesn't require trusted claims.

> **Note:** This is also true if you try to disable the **Okta-to-Okta Claims Sharing** feature.

## Reauthentication

Okta claims sharing doesn't currently support reauthentication. The user isn’t prompted for reauthentication as long as the session is active.

Also, when you federate from the IdP org to the SP org’s Okta dashboard and then click **Admin**, you aren't prompted for reauthentication. The factors from the IdP are valid until the end of the session on the SP org.
