---
title: Define a Callback Route
---

Your web application must host a route that Okta sends information to when a user signs in. This route is called a callback route or redirect URI.

The callback route is not seen by the user, and it's not the user's final destination. It's just one step in the authentication redirect flow.

<StackSelector snippet="define-route"/>

Our examples use `/authorization-code/callback` as a default route path, but you can change this if you want. The route path will be used in the next step.

<NextSectionLink/>






