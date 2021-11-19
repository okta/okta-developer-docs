---
title: Sign users out
excerpt: Learn how to sign users out of your applications that use Okta's APIs.
layout: Guides
---
<StackSelector />
An important part of security is to minimize the chances that a malicious actor uses an existing session to perform unauthorized actions. The most common strategies to prevent unauthorized use of a session include [setting short token lifetimes](/docs/guides/configure-access-policy/configure-token-lifetime-per-client/) and giving users the ability to sign out when they are done. This guide explains how to sign users out of Okta and out of your app.

> **Note:** If you are building a web app that is served by a server framework, see [Sign users in to your web application](/docs/guides/sign-into-web-app/). If you are building a mobile app, see [Sign users in to your mobile app](/docs/guides/sign-into-mobile-app/). If you are building a single-page app, see [Sign users in to your single-page app](https://developer.okta.com/docs/guides/sign-into-spa/angular/before-you-begin/).

---

**Learning outcomes**

* Sign users out of Okta.
* Sign users out of your app.

**What you need**

* An Okta Developer Edition organization. Don't have one? [Create one for free](https://developer.okta.com/signup).
* An app that can sign in to Okta. To create your own, see the following guides:
  * [Sign users in to your web app](/docs/guides/sign-into-web-app/)
  * [Sign users in to your mobile app](/docs/guides/sign-into-mobile-app/)
  * [Sign users in to your single-page app](/docs/guides/sign-into-spa/)

**Sample code**

<StackSelector snippet="samplecode" noSelector/>

---

## Overview

Signing users out of an application secured using Okta requires that you close the user's session in Okta. And in the cases where your application also has a session, you also need to close the application session.

* **Okta Session:** Okta maintains a session for the user and stores their information inside an Okta-specific cookie. The next time that a user is redirected to the Okta sign-in page, the user's information is remembered. Sign users out of Okta by clearing the Okta browser session.

* **Application Session:** Most applications have their own user sessions that you need to close in addition to an Okta user session.

## Define the sign-out callback

Signing out of Okta requires the app to open a browser and navigate to the [end session endpoint](/docs/reference/api/oidc/#logout). Okta ends the user's session and immediately redirects the user back to your application. To do this, you must define a callback route for the sign-out process, which means that you need to allow the post sign-out URL in your Okta app integration settings. If you don't specify a `post_logout_redirect_uri`, then the browser is redirected to the Okta sign-in page.

1. Sign in to your Okta organization with your administrator account.

    <a href="https://developer.okta.com/login" target="_blank" class="Button--blue">Go to Admin Console</a>

1. In the Admin Console, go to **Applications** > **Applications**.
1. Select your app integration.
1. On the **General** tab, click **Edit** in the **General Settings** section.
1. In the **Sign-out redirect URIs** section, add the base URI of your application.

    <StackSelector snippet="addbaseuri" noSelector/>
1. Click **Save** to confirm your changes.

## Sign users out of Okta

Sign users out of Okta by ending their session on the Okta Authorization Server.

<StackSelector snippet="remotesignout" noSelector/>

## Sign users out of your app

Sign users out of your application by ending their local session. This signs the user out of your app, but doesn't [sign the user out of Okta](#sign-users-out-of-okta).

The steps required to end the app session vary depending on the type of app that you are using.

<!-- Future content: and discarding the tokens Okta created when the user signed in. -->

<StackSelector snippet="localsignout" noSelector/>

## See also

You might want to configure self-service registration for your org:

* [Configure self-service registration](/docs/guides/set-up-self-service-registration/)

Read more on customizing your org:

* [Customize the Okta URL domain](/docs/guides/custom-url-domain/)
* [Style the Widget](/docs/guides/style-the-widget/style-okta-hosted/)