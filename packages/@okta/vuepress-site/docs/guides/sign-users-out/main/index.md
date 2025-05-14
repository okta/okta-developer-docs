---
title: Sign users out
excerpt: Learn how to sign users out of your apps that use Okta APIs.
layout: Guides
---

> **Note**: This document is written for Okta Classic Engine. If you’re using Okta Identity Engine, see [User sign out (local app)](/docs/guides/oie-embedded-sdk-use-case-basic-sign-out/-/main/) for relevant guidance. See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

This guide explains an important part of security: minimizing the chances that a malicious actor uses an existing session to perform unauthorized actions. It explains the most common strategies to prevent unauthorized use of a session, which include [setting short token lifetimes](/docs/guides/configure-access-policy/main/#configure-a-custom-access-token-lifetime-per-client) and allowing users to sign out when they’re done. This guide explains how to sign users out of Okta and your app.

---

#### Learning outcomes

* How to define a sign-out callback.
* Sign users out of Okta and your app.

#### What you need

* [Okta Integrator Free Plan organization](https://developer.okta.com/signup)
* An app that can sign in to Okta. To create your own, see the following guides:
  * [Sign users in to your web app using the redirect model](/docs/guides/sign-into-web-app-redirect/)
  * [Sign users into your mobile app using the redirect model](/docs/guides/sign-into-mobile-app-redirect/)
  * [Sign users in to your single-page app using the redirect model](/docs/guides/sign-into-spa-redirect/)

#### Sample code

<StackSnippet snippet="samplecode" />

---

## About signing users out of an app

Signing users out of an app that is secured using Okta requires that you close the user's session in Okta. In cases where your app also has a session, you also need to close the user's app session.

* **Okta Session:** Okta maintains a session for the user and stores their information inside an Okta-specific cookie. The next time that a user is redirected to the Okta sign-in page, the user's information is remembered. Sign users out of Okta by clearing the Okta browser session.

* **Application Session:** Most apps have their own user sessions that you need to close in addition to an Okta user session.

## Define the sign-out callback

Signing out of Okta requires the app to open a browser and go to the [end session endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/logoutCustomASWithPost). Okta ends the user's session and immediately redirects the user back to your app. To do this, define a callback route for the sign-out process that matches the post sign-out URL in your Okta app integration settings. If you don't specify a `post_logout_redirect_uri`, then the browser is redirected to the Okta sign-in page.

1. Open the Admin Console for your org.
1. Go to **Applications** > **Applications** to view the current app integrations.
1. Select your app integration.
1. On the **General** tab, click **Edit** in the **General Settings** section.
1. Set a **Sign-out redirect URIs** section and add a handler for that URI.

   <StackSnippet snippet="addbaseuri" />

1. Click **Save** to confirm your changes.

## Sign users out of Okta

Sign users out of Okta by ending their session on the Okta authorization server.

<StackSnippet snippet="remotesignout" />

## Sign users out of your app

Sign users out of your app by ending their local session. This signs the user out of your app, but doesn't [sign the user out of Okta](#sign-users-out-of-okta).

The steps required to end the app session vary depending on the type of app that you’re using.

<!-- Future content: and discarding the tokens Okta created when the user signed in. -->

<StackSnippet snippet="localsignout" />

## See also

Consider [configuring self-service registration](/docs/guides/oie-embedded-sdk-use-case-self-reg/) for your org.

Read more on customizing your org:

* [Customize domain and email address](/docs/guides/custom-url-domain/)
* [Style the Okta-hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget)
