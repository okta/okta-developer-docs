---
title: Before you begin
---

Signing users out is an important part of security as it helps prevent unauthorized actions on a current session. You can sign a user out of both the session inside your application and the Okta session.

* **Application Session:** Though your application uses Okta to authenticate users, you still need to track that the user has signed in to your application. In a regular web application, you achieve this by storing information inside a cookie. Sign users out of your applications by ending their local session.

* **Okta Session:** Okta also maintains a session for the user and stores their information inside a cookie. The next time that a user is redirected to the Okta sign-in page, the user's information is remembered. Sign users out of Okta by clearing the Okta browser session.

This guide shows you how to sign users out of your app and out of Okta.

> **Note:** If you are building a web app that is served by a server framework, see [Sign users in to your web application](/docs/guides/sign-into-web-app/). If you are building a mobile app, see [Sign users in to your mobile app](/docs/guides/sign-into-mobile-app/).

This guide assumes that you:

* Have an Okta Developer Edition organization. Don't have one? [Create one for free](https://developer.okta.com/signup).
* Already followed one of our sign-in guides:
  * [Sign users in to your web app](/docs/guides/sign-into-web-app/)
  * [Sign users in to your single-page app](/docs/guides/sign-into-spa/)
  * [Sign users in to your mobile app](/docs/guides/sign-into-mobile-app/)

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
