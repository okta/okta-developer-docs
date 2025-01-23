---
title: Configure claims sharing
excerpt: Learn how to configure an identity provider to send claims during SSO
layout: Guides
---

<ApiLifecycle access="ea" />

This guide explains how to configure an <StackSnippet snippet="idptype" inline /> identity provider (IdP) to send authentication claims during Single Sign-On (SSO).

---

#### Learning outcomes

* Know the purpose of claims sharing
* Configure your <StackSnippet snippet="idptype" inline /> identity provider (IdP) to send authentication claims during SSO

#### What you need

* [Okta Developer Edition org](https://developer.okta.com/signup)
* An Okta SP org and an Okta IdP org configured for an [Okta-to-Okta](/docs/guides/add-an-external-idp/oktatookta/main/) use case. This guide covers how to configure authentication claims sharing for this scenario.
* The **Okta-to-Okta Claims Sharing** feature enabled for both orgs. To enable, go to **Settings | Features**, locate the feature and enable.

---

## Overview

Claims sharing is the exchange of identity-related information (claims) between different orgs to enable secure access to resources. A claim is a statement made about a user or entity, such as their username, email address, roles, or permissions, that's shared to help determine access rights.

Authentication claims sharing allows an admin to configure their Okta org to trust claims from IdPs during SSO. Sharing claims also allows Okta to interpret the authentication context from an IdP. This helps eliminate duplicate factor challenges during user authentication and helps improve security posture.

Claims sharing provides important context to Okta during policy evaluation. For example, these claims give Okta a better understanding of which factors were used by the IdP to verify the user's identity. Claims do this by conveying all the information from the IdP that's needed to make policy decisions in the SP. The Okta session updates the details of the authentications. This creates a seamless and secure user experience, which reduces friction and boosts productivity to achieve end-to-end security.

### <StackSnippet snippet="idptype" inline /> IdP authentication claims sharing

<StackSnippet snippet="idpauthclaimssharing" />

#### Example <StackSnippet snippet="idpresponsetitle" inline />

<StackSnippet snippet="idpresponse" />

## Configure claims sharing

Okta supports claims sharing only between Okta orgs. This section covers how to configure authentication claims sharing for this use case.

### Okta IdP org app

There are no configuration requirements for claims sharing for the Okta IdP org app. This is the app that you use for authenticating and authorizing your users. Okta supports the use of a SAML 2.0 app, an Org2Org OIN app, and an OpenID Connect app with authentication claims sharing.

### Configure the Okta IdP connector to send authentication claims

To use claims sharing, update your Okta IdP connector in the Okta SP org to send authentication claims. Add the `trust claims: true` key and value pair to your PUT request to update the IdP. Alternatively, you can enable the **Trust claims from this identity provider** checkbox in the Admin Console. See [Add a SAML Identity Provider](https://help.okta.com/okta_help.htm?type=oie&id=csh-idp-add-saml).

> **Note:** The `mapAMRClaims` property (**Trust AMR claims from this identity provider** checkbox in the Admin Console) is associated with the legacy claims mapping feature. When you have the new claims sharing feature enabled for your orgs, and you include this property and the `trust claims: true` property in your request, the `trust claims` property takes precedence.

#### Example Okta <StackSnippet snippet="idptype" inline /> IdP update request

<StackSnippet snippet="idpupdaterequest" />

#### Response example

> **Note:** This example is truncated for brevity.

<StackSnippet snippet="idpupdateresponse" />

## Policies and claims sharing

You can configure many scenarios for authentication using claims sharing and policies.

### Authentication policy example

You have no user identities stored at the Okta SP org, and you still want to authenticate to the Okta SP org with MFA. Your Okta SP org has four authenticators configured, but not Okta Verify. With trust claims enabled, you can make use of other factors that the Okta IdP org is using for authentication. This is possible when your SP org is integrated with the Okta IdP org through the IdP. Claims from that IdP are trusted to satisfy the requirements in the SP org.

In your SP org, you configure a phishing resistant rule for the **Any two factors** authentication policy. You also allow any authentication method that can be used to meet the requirement. In the **Other authenticators that satisfy this requirement** box, the authenticators appear that you can expect from the Identity Provider to satisfy your rule. One of those authenticators is Okta Verify. As long as the clam is coming from the IdP, that claim can satisfy the authentication policy rule.

### Global session policy example

This same concept applies for the global session policy. For example, without trust claims enabled, if only the password authenticator is configured in the SP org global session policy, you can't save a rule that requires MFA. However, with trust claims enabled, you can specify MFA as required. As long as the claim is coming from the IdP, the session is established because that claim can satisfy the global session policy rule.

### Authentication policy and enrollment policy example

Your SP org has an authentication policy with a rule configured that requires a possession factor to satisfy the assurance. But, the IdP org uses a one factor authentication policy requiring just password. The SP org could prompt for the email authenticator provided that the authenticator is enabled for the SP org. There must also be an authenticators enrollment policy that lists email as optional. The SP org can then prompt the user to enroll in email. The user can then enroll and authenticate using the email authenticator.

However, if email is disabled in the authenticators enrollment policy, then no one can enroll in email as an authenticator on the SP org. The authentication policy rule would deny access to the user.

## Test your integration

To test your integration, first [configure a routing rule](https://help.okta.com/okta_help.htm?id=ext-cfg-routing-rules) for the IdP and then use the IdP to sign in.

### Configure a routing rule for the IdP

Configure a simple routing rule for the IdP in the Okta SP org.

* Click **Add Routing Rule**
* Name it and leave the defaults.
* In the **THEN Use this identity provider** section, add your IdP in the **IdP(s)** field.
* Click **Create Rule**.

### Use the IdP to sign in

1. Access your Okta SP org using your browser's privacy or incognito mode to avoid false positive or negative results.
1. On the Okta sign-in page, click **Sign in with {Name of IdP}**.

   If everything is configured properly:

   * The user is redirected to the IdP's sign-in page.
   * The authenticators configured in the authentication policy prompt the user for additional authentication.
   * After successful authentication, the user is redirected to the redirect URI specified in the Okta IdP org app.

   If something is configured incorrectly, the authorization response contains error information to help you resolve the issue. See the [FAQ](#faq) section next.

## FAQ

### What happens if my IdP isn't an Okta IdP?

This claims sharing version supports only Okta IdPs and SPs.

### What type of authenticators from my Okta IdP can the Okta SP accept?

All authenticators that are natively performed on the Okta IdP are accepted. For example, WebAuthN, password, Okta Verify, Okta FastPass, SMS, Email, and so on. If you use any custom authenticators for MFA, leveraging another IdP or smart card, then that authenticator isn't supported by this claims sharing version.

### What happens when I have the deprecated claims mapping feature enabled in my org?

When you enable the new **Org2Org Claims Sharing** feature, that takes precedence over the deprecated **IdP AMR Claims Mapping**.

### What happens with Protected Actions?

?????

### How can I enforce factor verification in the authentication policies

Use the **AND User must authenticate with** field and the **AND Possession factor constraints are** field in the rule.

#### Additional constraints

If you select an option in the **AND Authentication methods** section, Okta has additional constraints:

* **Allow any method that can be used to meet the requirement**: Okta accepts any satisfying authenticator even if it's not configured locally.
* **Disallow specific authentication methods**: If you specify authentication methods to disallow, then Okta disallows those authentication methods.
* **Allow specific authentication methods**: If you specify authentication methods to allow, then Okta only considers those authentication methods.

After you define these conditions, if you still haven't met the policy requirement, then Okta redirects you to verify any locally configured authenticator. If there is no local authenticator available, or the enrollment policy for a particular authenticator is disabled, then Okta displays an error.

### What happens when I have a reauthentication scenario?

This claims sharing version doesn't support reauthentication. The user needs to sign out and then sign in.
