---
title: Understand the callback route
---
To sign users in, your application redirects the browser to an Okta-hosted sign-in page. Okta then redirects back to your application with information about the user. You can learn more about how this works on [Okta-hosted flows](/docs/concepts/okta-hosted-flows/).

Your web application must host a route that Okta sends information to when a user signs in. This route is called a callback route or redirect URI.

The callback route is not seen by the user, and it's not the user's final destination. It's just one step in the authentication redirect flow.

<StackSelector snippet="define-route"/>

Our examples use `/authorization-code/callback` as a default route path, but you can change this. The route path is used in the next step.

<NextSectionLink/>






