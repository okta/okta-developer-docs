Enable users to change their primary email address in a password-optional app.

#### Learning outcomes

* Integrate the change primary email flow into your SPA app.

#### What you need

<StackSnippet snippet="whatyouneed" />
</br>

#### Sample code

<StackSnippet snippet="samplecode" />

---

## Overview

Allowing a user to change their primary email is a critical task when they only use their username and email address to sign in to your app. Much like a password, a user must be able to change their email address, especially if it becomes compromised. With the [Okta Auth Javascript SDK](https://github.com/okta/okta-auth-js) you can enable your users to change their primary emails in your app.

The SDK contains a series of [methods](https://github.com/okta/okta-auth-js/blob/master/docs/myaccount/modules.md) that update the user's primary email address and other profile information. These methods are secure and can be safely used in browser-based SPA apps. In this guide, you learn how to use these methods to integrate the change email functionality in your app.

>**Note**: These SDK methods use the [MyAccount API](https://developer.okta.com/docs/api/openapi/okta-myaccount/guides/overview/) to update the user's profile information.

## Update configurations

* <StackSnippet snippet="setupoktaorg" inline/>
* To test the email change flow, set up a user with an enrolled email authenticator.

## Integrate

### Summary of steps

The following summarizes the steps involved when a user changes their primary email address.

<StackSnippet snippet="integrationsummary" />

<StackSnippet snippet="integrationsteps" />

### See Also

* [Okta Auth Javascript SDK](https://github.com/okta/okta-auth-js)
* [MyAccount SDK interface specification](https://github.com/okta/okta-auth-js/blob/master/docs/myaccount/modules.md)
* [MyAccount API reference](https://developer.okta.com/docs/api/openapi/okta-myaccount/guides/overview/)
