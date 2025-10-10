---
title: Enterprise identity verification vendor
meta:
  - name: description
    content: Okta supports identity verification with external enterprise identity verification vendors. Get an overview of the process and prerequisites, as well as the setup instructions.
---

<StackSnippet snippet="learningoutcome" inline />

## What is an IDV vendor

IDV vendors work like IdPs, with some key differences. Vendors verify your user’s identities by requiring them to submit a proof of identity. The proof of identity matches a user’s digital identity against a trusted data source. For example, a user’s first name and family name can be matched against a picture of their driver’s license or passport. The vendor verifies the user submission against a data source and that evaluation is sent back to Okta.

IdPs authenticate users by verifying their digital credentials. The IdPs also maintain the digital credentials.

Because of its stricter verification, you might only use an IDV vendor for sensitive operations. For example, use an IDV flow when a user enrolls a new authenticator or resets their password.

## Create an app at the IDV vendor

<StackSnippet snippet="appatidp" />

## Create the IDV vendor in Okta

<StackSnippet snippet="appidpinokta" />

<StackSnippet snippet="afterappidpinokta" />

## Alternate use cases

You can use your IDV vendor to verify your user identities in different scenarios. Use the following Okta Expression Language expressions for different scenarios.

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
