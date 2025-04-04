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

<StackSnippet snippet="wun" />

---

## Overview

Claims sharing is the exchange of identity-related information (claims) between different orgs to enable secure access to resources. A claim is a statement made about a user or entity, such as their username, email address, roles, or permissions. This statement is then shared to help determine access rights.

### Authentication claims sharing

Authentication claims sharing allows an admin to configure their Okta org to trust claims from IdPs during SSO. Sharing claims also allows Okta to interpret the authentication context from an IdP. This helps eliminate duplicate factor challenges during user authentication and helps improve security posture.

Claims sharing provides assurance context to Okta during policy evaluation. For example, these claims give Okta a better understanding of which factors were used by the IdP to verify the user's identity. Claims do this by conveying information from the IdP that's needed to make policy decisions in the SP. This creates a seamless and secure user experience, which reduces friction and boosts productivity to achieve end-to-end security.

<StackSnippet snippet="acceptedauth" />

### AMR claims mapping is enabled on your org

<StackSnippet snippet="amrclaims" />

### <StackSnippet snippet="idptype" inline /> IdP authentication claims sharing

<StackSnippet snippet="idpauthclaimssharing" />

#### Example <StackSnippet snippet="idpresponsetitle" inline />

<StackSnippet snippet="idpresponse" />

## Configure claims sharing

<StackSnippet snippet="configclaims" />

## Policies and claims sharing

<StackSnippet snippet="policies" />

## Test your integration

To test your integration, first [configure a routing rule](https://help.okta.com/okta_help.htm?id=ext-cfg-routing-rules) for the IdP and then use the IdP to sign in.

### Configure a routing rule for the IdP

Configure a simple routing rule for the IdP in the Okta SP org:

* From the Admin Console, go to **Security** > **Identity Providers**.
* Select the IdP you want to configure the routing rule for.
* On the **Routing rules** tab, click **Add Routing Rule**.
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

> **Note:** This is also true if you try to disable the <StackSnippet snippet="deletedeactivate" inline /> feature.

<StackSnippet snippet="reauth" />
