---
title: Define a Callback Route
---

To sign users in, your application opens a browser and shows an Okta-hosted sign-in page. Okta then redirects back to your app with information about the user. 
You can learn more about how this works by reading about [Okta-hosted flows](/docs/concepts/okta-hosted-flows/).

The first thing that you need to define is how Okta can redirect back to your app. This is called a callback route or redirect URI. In mobile apps, you use a custom scheme like `your-app:/callback` so that your app can switch back into the foreground after the user is done signing in with the browser.

<StackSelector snippet="definescheme"/>

This defines your redirect scheme. Add `:/callback` to the scheme to get the full redirect URI (like `com.okta.example:/callback`), which you need in the following steps.

> `com.okta.example` is just an example scheme. You can replace it with any string that follows the pattern of `domain.company.appname`.

Your mobile app is responsible for parsing the information Okta sends to this callback route. Our SDKs can do this for you (covered later in <GuideLink link="../sign-in-page/">Open the Sign-in Page</GuideLink>). For now, just define the route itself.

<NextSectionLink/>
