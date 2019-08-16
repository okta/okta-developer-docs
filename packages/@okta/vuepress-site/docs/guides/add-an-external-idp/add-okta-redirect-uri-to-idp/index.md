---
title: Add Okta redirect URI to the Identity Provider
---
The redirect URI sent in the authorize request from the client needs to match the redirect URI in the Identity Provider (IdP). This is the URL where the IdP returns the authentication response (the access token and the ID token). It needs to be a secure domain that you own.

<StackSelector snippet="redirecttoidp" />

<NextSectionLink/>