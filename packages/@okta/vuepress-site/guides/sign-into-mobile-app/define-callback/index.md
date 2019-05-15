---
title: Define a Callback Route
---

To sign users in, your application opens a browser and shows an Okta-hosted sign-in page. Okta then redirects back to your app with information about the user. 
<!-- You can learn more about how this works on [Okta-hosted flows]. -->

The first thing that you need to define is how Okta can redirect back to your app. This is called a callback route or redirect URI. In mobile apps, you use a custom scheme like `your-app:/callback` so your app can switch back into the foreground after the user is done signing in with the browser.

<StackSelector snippet="definescheme"/>

Our examples use `com.okta.example:/callback` as the callback route, but you can change this. The route is used in the next step.

Your mobile app is responsible for parsing the information Okta sends to this callback route. Our SDKs can do this for you (covered later in <GuideLink link="../sign-in-page/">Open the Sign-in Page</GuideLink>). For now, just define the route itself.

<NextSectionLink/>
