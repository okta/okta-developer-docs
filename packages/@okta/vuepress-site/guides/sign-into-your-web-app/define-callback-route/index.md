---
title: Define a Callback Route
---

If you are building a server-side (or "web") application that is capable of securely storing secrets, then the authorization code flow is the recommended method for controlling access to it.

At a high-level, this flow has the following steps:

1. Your application directs the browser to the Okta Sign-In page, where the user authenticates.
1. The browser receives an authorization code from your Okta authorization server.
1. The authorization code is passed to your application.
1. Your application sends this code to Okta, and Okta returns access and ID tokens, and optionally a refresh token.
1. Your application can now use these tokens to call the resource server (for example an API) on behalf of the user.

### Login Redirect URI

In your web app, you should define a redirect URI that is the callback location where the user-agent is directed to along with the code. This must match one of the **Login redirect URIs** you specified when you create your Okta application.

Luckily, this is automatically handled by our middleware. For now, you just have to define the route itself. We show you how in the next section.

<NextSectionLink/>






