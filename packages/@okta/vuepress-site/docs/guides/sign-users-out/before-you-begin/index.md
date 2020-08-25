---
title: Before you begin
---

An important part of security is to minimize the chances that a malicious actor uses an existing session to perform unauthorized actions. The most common strategies to prevent unauthorized use of a session include [setting short token lifetimes](/docs/guides/configure-access-policy/configure-token-lifetime-per-client/) and giving users the ability to sign out when they are done.

Signing users out of an application secured using Okta requires that you close the user's session in Okta. And in the cases where your application also has a session, you also need to close the application session. This guide explains how to sign users out of Okta and out of your app.

* **Okta Session:** Okta maintains a session for the user and stores their information inside an Okta-specific cookie. The next time that a user is redirected to the Okta sign-in page, the user's information is remembered. Sign users out of Okta by clearing the Okta browser session.

* **Application Session:** Most applications have their own user sessions that you need to close in addition to an Okta user session.

> **Note:** If you are building a web app that is served by a server framework, see [Sign users in to your web application](/docs/guides/sign-into-web-app/). If you are building a mobile app, see [Sign users in to your mobile app](/docs/guides/sign-into-mobile-app/). If you are building a single-page app, see [Sign users in to your single-page app](https://developer.okta.com/docs/guides/sign-into-spa/angular/before-you-begin/).

This guide assumes that you:

* Have an Okta Developer Edition organization. Don't have one? [Create one for free](https://developer.okta.com/signup).
* Already followed one of our sign-in guides:
  * [Sign users in to your web app](/docs/guides/sign-into-web-app/)
  * [Sign users in to your mobile app](/docs/guides/sign-into-mobile-app/)
  * [Sign users in to your single-page app](/docs/guides/sign-into-spa/)

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
