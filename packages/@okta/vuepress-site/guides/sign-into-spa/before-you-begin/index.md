---
title: Before You Begin
---

This guide shows you how to use Okta as the user store for your single-page application and sign users into your app.

<!-- If you are building a web app that is served by a server framework, see [Sign Users into Your Web App]. If you are building a mobile app, see [Sign Users into Your Mobile App]. -->

This guide assumes that you:

* Have an Okta organization. If you don't, you can get one here: <https://developer.okta.com/signup>
* Know the basics of building JavaScript applications.
* Have a project or application that you want to add authentication to.

If you don't have an existing app, or are new to building apps, start with this documentation:

<StackSelector snippet="create-app"/>

## Understand the Redirect Flow

Here's how signing a user in to a single-page app works:

1. The user clicks a button in your app to sign in or attempts to access a protected resource.
1. Your application redirects the user's browser to a sign-in page hosted by Okta.
1. The user signs in using a username and password, or other factors.
1. Okta redirects the browser back to your callback route with tokens for the user. Your code (or our SDK's code) handles the callback and stores these tokens.
1. The browser is redirected to the final destination. This is up to you: it can be the route the user was originally trying to access, the home page, or somewhere else.

<NextSectionLink/>
