---
title: Require Authentication
---
An important decision regarding your authentication requirements is which parts of your application require the user to be authenticated. You can require authentication across the entire app or just require it for particular routes or controllers. There is also the issue of what sort of app behavior you want for unauthenticated users (users who aren't signed in).

### Require Authentication for Everything

For some applications, you want to require the user to be authenticated (signed in) for all routes.

<StackSelector snippet="reqautheverything"/>

### Require Authentication for a Specific Route

For other applications, you may need to require authentication only for a certain route or group of routes.

<StackSelector snippet="reqauthspecific"/>

<!-- ### Allow Anonymous Access to a Specific Route or Controller 

Define what happens when a user isn't authenticated. 

<StackSelector snippet="allowanon"/> 

Note: This can be covered in the Require Authn for everything section
-->

<NextSectionLink/>