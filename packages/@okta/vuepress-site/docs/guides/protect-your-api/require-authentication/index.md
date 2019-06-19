---
title: Require authentication
---
In many APIs, all endpoints require authentication. In others, there may be a mix of protected and unprotected (anonymous) endpoints. These examples show you how to do both.

### Require authentication for a specific route

If you want the user to only have access to a route if they are signed in, require authentication for just those routes.

<StackSelector snippet="reqauthspecific"/>

### Require authentication for everything

For some applications, you may want to require the user to be authenticated for all routes.

<StackSelector snippet="reqautheverything"/>

<NextSectionLink/>