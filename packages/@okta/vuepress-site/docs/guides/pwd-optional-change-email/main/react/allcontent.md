Enable users to change their primary email address in an application based on an embedded SDK.

**Learning outcomes**

* Integrate the ability to change a user's primary address in your app using the Embedded SDK

**What you need**

<StackSnippet snippet="whatyouneed" />
</br>

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Overview

Allowing a user to change their primary email is crucial for them that use only their username and email address to sign in to your app. Much like passwords, email addresses can be compromised and must be changed. With the [Embedded SDK](https://github.com/okta/okta-auth-js) you can enable users to change their primary emails in your app.

The Embedded SDK contains a series of [methods](https://github.com/okta/okta-auth-js/blob/master/docs/myaccount/modules.md) that use the [MyAccount API](docs/reference/api/myaccount/) to change the user's email and other profile information.

<div class="half">

![Diagram showing the call flow from your app to the Embedded SDK and MyAccount API](/img/pwd-optional/pwd-optional-change-email-my-account-js-react-overview.png)

</div>

This API is secure, doesn't expose information an end user shouldn't have access to, and can be safely used in browser-based SPA applications. In this guide, you learn how to integrate this change email functionality in your app using the Embedded SDK and this API.

> **Note**: The sample code in this guide originates from a SPA [sample app](https://github.com/okta/okta-auth-js/tree/master/samples/templates/react-embedded-auth-with-sdk/env)

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
* [MyAccount API reference](docs/reference/api/myaccount/)
