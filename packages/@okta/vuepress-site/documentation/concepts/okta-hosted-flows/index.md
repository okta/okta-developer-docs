---
title: Okta-hosted Flows
---

# Okta-hosted flows

Okta hosts authentication and identity flows for your applications. This means that your application can let Okta handle signing users in, registering new users, and performing account recovery. The pages hosted by Okta can be [customized](customize sign-in page guide), and you can [bring your own domain](custom URL guide).

You can build and self-host these flows in your application if you'd like, but using Okta-hosted flows has some advantages.

## Advantages of Okta-hosted flows

* Works out of the box (works by default, macros, UI editor, preview)
* Less maintenance and upkeep (we can keep it up to date for you)
* Separation of concerns between your application (focused on core business) and identity (handled by Okta) which removes complexity

## The OpenID Connect redirect flow

In order to use an Okta-hosted flow, your application must redirect to Okta. This is usually done with the OpenID Connect protocol.

At a high level, a sign-in flow has the following steps:

1. The user clicks a button in your app to sign in or attempts to access a protected resource.
2. Your application redirects the browser to the Okta-hosted sign-in page, where the user authenticates.
3. Okta redirects the browser back to a specific route in your application, called a _callback route_ or _redirect URI_. Along with this request, Okta sends information about the user.
4. Your application processes the payload from Okta, and may make additional requests to Okta behind the scenes to get more info about the user.
5. Your application redirects the browser to the user's final destination. This is up to you: it can be the route the user was originally trying to access, the home page, or somewhere else.

Depending on the type of application, different [OpenID Connect grant types](authentication guide - choosing a grant type) are recommended.
