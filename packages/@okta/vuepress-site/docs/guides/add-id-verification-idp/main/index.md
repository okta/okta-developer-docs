---
title: Enterprise identity verification vendor
meta:
  - name: description
    content: Okta supports identity verification with external enterprise identity verification vendors. Get an overview of the process and prerequisites, as well as the setup instructions.
---

## <StackSnippet snippet="idp" inline />

This document explains how to configure <StackSnippet snippet="idp" inline />, an identity verification (IDV) vendor, as an identity provider (IdP) for your app. You can configure <StackSnippet snippet="idp" inline /> as an IdP in your org by creating an account with <StackSnippet snippet="idp" inline />, adding it as an IdP in Okta, and then testing the configuration.

> **Note:** <StackSnippet snippet="idp" inline /> works as an IDV vendor, but is listed as an IdP in the Admin Console. This guide refers to <StackSnippet snippet="idp" inline /> as an IDV vendor.

Okta manages the connection to the IDV vendor for your app, sitting between your app and the vendor that verifies your users. When a user signs in, you can verify their identity by having them submit a proof of identity to the IDV vendor.

---

#### Learning outcomes

Configure an IDV vendor so that your user’s identities are verified when they enroll a new authenticator.

> **Note:** This guide describes the process for setting up an IDV flow in a sandbox environment of a <StackSnippet snippet="idp" inline /> app. In a sandbox environment, there is no actual identity verification that verifies your user’s identities. You can use the same configuration process in a production environment in your <StackSnippet snippet="idp" inline /> app. <StackSnippet snippet="learningoutcome" inline />

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* The [Okta account management policy](/docs/guides/okta-account-management-policy/main/) feature enabled for your org
* The Identity verification with third-party identity verification vendors feature enabled for your org
* An account with <StackSnippet snippet="idpaccount" inline /> with access to a sandbox environment
* A test [user account](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-add-users) that you can use to enroll an authenticator
* A test [group](https://help.okta.com/okta_help.htm?type=oie&id=usgp-groups-create) in your org that the test user is added to
* A test [image](#test-image) to use as a proof of identity

---

## What is an IDV vendor

IDV vendors work like IdPs, with some key differences. Vendors verify your user’s identities by requiring them to submit a proof of identity. The proof of identity matches a user’s digital identity against a trusted data source. For example, a user’s first name and family name can be matched against a picture of their driver’s license or passport. The vendor verifies the user submission against a data source and that evaluation is sent back to Okta.

IdPs authenticate users by verifying their digital credentials. The IdPs also maintain the digital credentials.

Because of its stricter verification, you might only use an IDV vendor for sensitive operations. For example, use an IDV flow when a user enrolls a new authenticator or resets their password.

## Create an app at the IDV vendor

<StackSnippet snippet="appatidp" />

## Create the IDV vendor in Okta

<StackSnippet snippet="appidpinokta" />

<StackSnippet snippet="afterappidpinokta" />

## Test the integration

You can test your integration by using the rule that you configured in the [previous section](#create-an-okta-account-management-policy-rule).

1. Sign in to your org as the user that you created.
1. Click your username.
1. Go to **My Settings**.
1. Select **Security Methods**, and then set up a new authenticator.

If the IDV vendor is set up correctly, you’re prompted to verify your identity and redirected through the <StackSnippet snippet="idp" inline /> IDV flow. Then, the user you created can successfully enroll an authenticator.

### Test image

Use the following image if your verification template requires you to upload a photo. Save the image and then select it when you're prompted to upload a photo.

<div class="half border">

![Okta logo and brand name](/img/idv-test-image.png)

</div>

## Alternate use cases

You can use <StackSnippet snippet="idp" inline /> to verify your user identities in different scenarios. Use the following Okta Expression Language expressions for different scenarios.

> **Note:** You can use the [Okta account management policy rule](#create-an-okta-account-management-policy-rule) without any expression. If you don't use any expression in the rule then your user is prompted to verify their identity when the following events occur:
>
> * They enroll or unenroll authenticators
>
> * They edit their personal information in their **My Settings**

<StackSnippet snippet="alternateusecase" />

## Troubleshooting

When you test the integration, if you’re not redirected to the IDV flow, review the following areas:

* Review the user and group that you created. Ensure that you’ve set the correct group ID when you create the [Okta account management policy rule](#create-an-okta-account-management-policy-rule).

* Review the Okta account management policy rule. Ensure that you’ve added the correct Okta Expression Language expression and that the `verificationMethod` type is set to `ID_PROOFING`.

* Ensure that your user has the authenticators that they're allowed to enroll.

* Ensure that your API key was created in the sandbox environment.
