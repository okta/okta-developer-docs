---
title: Define a Callback Route
---

The first thing you need to define is how Okta can call your app after a user has been authenticated. This is called a _callback route_.

The callback route is not seen by the user, and it's not the user's final destination. It's just one step in the authentication redirect flow.

<StackSelector snippet="define-route"/>

Your application is responsible for parsing the information Okta sends to the callback route. Our SDKs can do this for you (later, in [Handle the Callback from Okta](/guides/sign-into-spa/-/handle-callback)). For now, just define the route itself.

It's important that the full URL of your callback route represents a real URL (in other words, it should serve your single-page app even after a "hard" browser reload). Most router components do this by default.

<NextSectionLink/>
