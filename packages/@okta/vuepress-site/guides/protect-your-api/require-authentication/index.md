---
title: Require Authentication
---
## Require Authentication

An important decision regarding your authentication requirements is which parts of your application require the user to be authenticated. You can require authentication across the entire API or just require it for particular routes or controllers.

> Note: Unauthenticated requests return a 401 error code.

### Require Authentication for Everything

For some APIs, you want to require a valid token for all routes.

<StackSelector snippet="reqautheverything"/>

### Require Authentication for a Specific Route

For other APIs, you may need to require authentication only for a certain route or group of routes.

<StackSelector snippet="reqauthspecific"/>

<NextSectionLink/>
