---
title: Sign Users Out of Your App
---
## Sign Users Out of Your App

Sign users out by ending the local session in your application and discarding the tokens Okta created when the user signed in.

<StackSelector snippet="localsignout"/>

This signs the user out of your application, but doesn't sign the user out of Okta. You might want this Okta session to stick around -- if your users are signed in to multiple applications, for example. If you don't revoke the Okta session, they won't be prompted for credentials when they try to sign in again.

<NextSectionLink/>
