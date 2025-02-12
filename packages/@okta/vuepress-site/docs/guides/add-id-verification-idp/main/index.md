---
title: Enterprise identity verification vendor
meta:
  - name: description
    content: Okta supports identity verification with external enterprise identity verification vendors. Get an overview of the process and prerequisites, as well as the set up instructions.
---

## <StackSnippet snippet="idp" inline />

This document explains how to configure <StackSnippet snippet="idp" inline />, an identity verification vendor (IDV), as an identity provider (IdP) for your app. You can configure <StackSnippet snippet="idp" inline /> as an IdP in your org by creating an account with <StackSnippet snippet="idp" inline />, adding it as an IdP in Okta, and then testing the configuration.

> **Note:** <StackSnippet snippet="idp" inline /> works as an IDV, but is listed as an IdP in the Admin Console. This guide refers to <StackSnippet snippet="idp" inline /> as an IDV.

Okta manages the connection to the IDV for your app, sitting between your app and the IDV that verifies your users. When a user signs in, you can verify their identity by having them submit a proof of identity to the IDV.

---

#### Learning outcomes

Configure an IDV so that your user’s identities are verified when they enroll a new authenticator.

> **Note:** This guide describes the process for setting up an identity verification flow in a sandbox environment of a <StackSnippet snippet="idp" inline /> app. In a sandbox environment, there is no actual identity verification that verifies your user’s identities. You can use the same configuration process in a production environment in your <StackSnippet snippet="idp" inline /> app.

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* The [Okta account management policy](/docs/guides/okta-account-management-policy/main/) feature enabled for your org
* An account <StackSnippet snippet="idpaccount" inline /> with access to a sandbox environment
* A test [user account](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-add-users) that you can use to enroll an authenticator
* A test [group](https://help.okta.com/okta_help.htm?type=oie&id=usgp-groups-create) in your org that the test user is added to

---

## What is an identity verification vendor

IDVs work like IdPs, with a few key differences. IDVs verify your user’s identities by requiring them to submit a proof of identity. The proof of identity matches a user’s digital identity against a trusted data source. For example, a user’s first and last names can be matched against a picture of their driver’s license or passport. The IDV verifies the user submission against a data source and that evaluation is sent back to Okta.

IdPs authenticate users by verifying their digital credentials. A user’s identity can be authenticated by social IdPs, like Google or Facebook, or enterprise IdPs, like OIDC or SAML. The user’s digital credentials are maintained by the IdPs.

Because of its stricter verification, you might only use an IDV for sensitive operations. For example, use an IDV check when a user enrolls a new authenticator or resets their password.

## Create an app at the identity verification vendor

<StackSnippet snippet="appatidp" />

## Create the identity verification vendor in Okta

To add <StackSnippet snippet="idp" inline /> as an IDV in Okta:

<StackSnippet snippet="appidpinokta" />

> **Note:** If you want to use a specific **Redirect Domain** instead of the **Dynamic** default, you can use either **Org URL** or **Custom URL**. See `issuerMode` in the [Identity Provider attributes](/docs/reference/api/idps/#identity-provider-attributes) section.

<StackSnippet snippet="afterappidpinokta" />

## Test the integration

You can test your integration by using the rule that you configured in the [previous section](#create-an-okta-account-management-policy-rule).

1. Sign in to your org as the user that you created.
1. Click on your username.
1. Go to **My Settings**.
1. Select **Security Methods**, and then set up a new authenticator.

If the IDV is set up correctly, you’re prompted to verify your identity and redirected through the <StackSnippet snippet="idp" inline /> IDV flow. And the user you created can successfully enroll an authenticator.

## Alternate use cases

You can use <StackSnippet snippet="idp" inline /> to verify your user identities in different scenarios. Use the following Okta Expression Language expressions for different scenarios.

> **Note:** You can use the [Okta account management policy rule](#create-an-okta-account-management-policy-rule) without any expression. If you don’t use an Okta Expression Language expression, your user is prompted to verify their identity every time they sign in to your org.

#### Verify user identity only when they enroll an authenticator

```
accessRequest.operation == 'enroll'
```

#### Verify user identity only when they reset their password

```
accessRequest.authenticator.key == 'okta_password' && accessRequest.operation == 'recover'
```

#### Verify user identity only when they enroll phishing-resistant authenticators

```
{
  'okta_verify',
  'webauthn',
  'smart_card_idp',
  'yubikey_token'
}.contains(accessRequest.authenticator.key) &&
accessRequest.operation == 'enroll'
```

## Troubleshooting

When you test the integration, if you’re not redirected to the IDV flow, review the following areas:
* Review the user and group that you created. Ensure that you’ve set the correct group ID when you [create the Okta account management policy rule](#create-an-okta-account-management-policy-rule).

* Review the Okta account management policy rule. Ensure that you’ve added the correct Okta Expression Language expression and that the `verificationMethod` type is set to `ID_PROOFING`.

## Next steps

You now understand how to add a social Identity Provider and have successfully added and tested the integration.

To add another Identity Provider, start by choosing an [external Identity Provider](/docs/guides/identity-providers/).
