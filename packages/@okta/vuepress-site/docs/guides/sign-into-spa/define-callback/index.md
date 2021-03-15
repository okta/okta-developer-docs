---
title: Define a callback route
---
To sign users in, your application redirects the browser to an Okta-hosted sign-in page. Okta then redirects back to your application with information about the user. You can learn more about how this works on [Okta-hosted flows](/docs/concepts/okta-hosted-flows/).

The first thing that you need to define is how Okta calls your app after a user is authenticated. This is called a callback route or redirect URI.

The callback route is not seen by the user, and it's not the user's final destination. It's just one step in the authentication redirect flow.

<StackSelector snippet="define-route"/>

&nbsp;
> **Note:** It's important that the full URL of your callback route represents a real URL (in other words, it should serve your single-page app even after a "hard" browser reload). Most router components do this by default.

<NextSectionLink/>
