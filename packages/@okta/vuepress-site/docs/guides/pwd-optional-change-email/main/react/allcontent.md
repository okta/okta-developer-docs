Enable users to change their primary email address in an application based on the embedded SDK.

**Learning outcomes**

* Add the ability for a user to change their primary email in your SPA app using the Embedded SDK and MyAccount API

**What you need**

<StackSnippet snippet="whatyouneed" />
</br>

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Overview

Allowing a user to change their primary email is a critical task when they only sign in to your app with a username and email address. Much like a password, a user must be able to change their email addresses especially if it becomes compromised. With the [Embedded SDK](https://github.com/okta/okta-auth-js) you can enable users to change their primary emails in your app.

The Embedded SDK contains a series of [methods](https://github.com/okta/okta-auth-js/blob/master/docs/myaccount/modules.md) that use the [MyAccount API](/docs/reference/api/myaccount/) to change the user's email and other profile information.

<div class="half">

![Diagram showing the call flow from your app to the Embedded SDK and MyAccount API](/img/pwd-optional/pwd-optional-change-email-my-account-js-react-overview.png)

</div>

This API is secure, doesn't expose information an end user shouldn't have access to, and can be safely used in browser-based SPA applications. In this guide, you learn how to integrate this change email functionality in your app using the Embedded SDK.

## Update configurations

<StackSnippet snippet="setupoktaorg" inline/>

> **Note:** To test the change email functionality, you must use a user with an enrolled email authenticator.

## Integrate

### Summary of steps

The following summarizes the steps involved when a user changes their primary email address.

<StackSnippet snippet="integrationsummary" />

<StackSnippet snippet="integrationsteps" />

### See Also

* [Javascript Embedded SDK](https://github.com/okta/okta-auth-js)
* [MyAccount SDK interface specification](https://github.com/okta/okta-auth-js/blob/master/docs/myaccount/modules.md)
* [MyAccount API reference](/docs/reference/api/myaccount/)
