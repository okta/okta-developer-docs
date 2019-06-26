---
title: Require authentication
---
In many applications, you want to prevent the user from accessing certain routes or sections unless they are signed in. You can require authentication across the entire app or just require it for particular routes or controllers. Any route that doesn't specifically require authentication is accessible without signing in (also called anonymous access).

### Require authentication for a specific route

If you want the user to only have access to a route if they are signed in, require authentication for just those routes.

<StackSelector snippet="reqauthspecific"/>

### Require authentication for everything

For some applications, you may want to require the user to be authenticated for all routes.

<StackSelector snippet="reqautheverything"/>

<NextSectionLink/>