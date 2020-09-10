---
title: Okta-hosted Flows
---

# Okta-hosted flows

Okta hosts authentication and identity flows for your applications. This means that your application can let Okta handle signing users in, registering new users, and performing account recovery. The pages hosted by Okta can be [customized](/docs/guides/custom-hosted-signin/), and you can [bring your own domain](/docs/guides/custom-url-domain/).

You can build and self-host these flows in your application if you'd like, but using Okta-hosted flows has some advantages:

* **Works out of the box:** The sign-in page Okta provides works by default, not requiring any configuration on your part. If you do want to change it, we provide a UI editor with preview, as well as a number of macros to help you customize the page to your liking. For more information, see [Customize the Hosted Sign-in Page](/docs/guides/custom-hosted-signin/).
* **Less complexity:** If you host your authentication and identity flows with Okta, you can keep your application logic (focused on core business) separate from your identity (handled by Okta).
* **Less maintenance:** The Okta-hosted pages always reflect the latest available version of the Sign-in Widget.

## The OpenID Connect redirect flow

In order to use an Okta-hosted flow, your application must redirect to Okta. This is usually done with the OpenID Connect protocol.

At a high level, a sign-in flow has the following steps:

1. The user clicks a button in your app to sign in or attempts to access a protected resource.
2. Your application redirects the browser to the Okta-hosted sign-in page, where the user authenticates.
3. Okta redirects the browser back to a specific route in your application, called a **callback route** or **redirect URI**. Along with this request, Okta sends information about the user.
4. Your application processes the payload from Okta and may make additional requests to Okta behind the scenes to get more info about the user.
5. Your application redirects the browser to the user's final destination. This is up to you: it can be the route the user was originally trying to access, the home page, or somewhere else.

Depending on the type of application, different [OpenID Connect grant types](/docs/concepts/oauth-openid/#recommended-flow-by-application-type) are recommended.
