---
title: Require authentication
---
In many applications, you want to prevent the user from accessing certain routes or sections unless they are signed in. You can require authentication across the entire app or just require it for particular routes or controllers. Any route that doesn't specifically require authentication is accessible without signing in (also called anonymous access).

It's important to note that protecting routes in your SPA does **not** truly prevent the user from accessing those parts of your application. After all, it's JavaScript running in the browser and anyone could open the browser's developer tools and change things! Protecting routes provides a consistent and good experience for your users. The real security enforcement must be done in the API that your single-page app calls (see <GuideLink link="../use-the-access-token">Use the access token</GuideLink>). See also the [Protect your API endpoints guide](/docs/guides/protect-your-api/).

### Require authentication for a specific route

If you want the user to only have access to a route if they are signed in, require authentication for just those routes.

<StackSelector snippet="reqauthspecific"/>

### Require authentication for everything

For some applications, you may want to require the user to be authenticated for all routes.

<StackSelector snippet="reqautheverything"/>

<NextSectionLink/>
