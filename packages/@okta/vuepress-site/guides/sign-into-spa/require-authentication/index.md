---
title: Require Authentication
---

In many applications, you want to prevent the user from accessing certain routes or sections unless they are signed in. You can require authentication across the entire app or just require it for particular routes or controllers. Any route that doesn't specifically require authentication will be accessible without signing in (also called anonymous access).

It's important to note that protecting routes in your single-page app does **not** truly prevent the user from accessing those parts of your application. After all, it's JavaScript running in the browser and anyone could open the browser's developer tools and change things! Protecting routes provides a consistent and good experience for your users. The real security enforcement must be done in the API your single-page app calls (see [Use the Access Token](/guides/sign-into-spa/-/use-the-access-token)). <!-- link to Protect your API endpoints guide -->

### Require Authentication for a Specific Route

If you want the user to only have access to a route if they are signed in, require authentication for just those routes.

<StackSelector snippet="reqauthspecific"/>

### Require Authentication for Everything

For some applications, you may want to require the user to be authenticated for all routes.

<StackSelector snippet="reqautheverything"/>

<button>I understand how to protect routes</button>