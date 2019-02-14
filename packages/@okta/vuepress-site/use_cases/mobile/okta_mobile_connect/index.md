---
title: Okta Mobile Connect
excerpt: Learn how to Single Sign-On enable your native mobile app.
redirect_from:
  - /docs/guides/okta_mobile_connect.html
---

# Overview

Okta Mobile Connect enables SSO for native mobile
apps that support SAML. Once users have established a session in
[Okta Mobile](https://itunes.apple.com/us/app/okta-mobile/id580709251){:target="_blank"},
logging in to mobile apps that support SAML and Okta Mobile Connect is
as simple as entering an email address or company domain.

See the video below for a demonstration of how Okta Mobile Connect
works: <!--, and to learn how to enable support for Okta Mobile Connect in
your mobile app: -->

<iframe
  src="https://player.vimeo.com/video/127634838?title=0&byline=0&portrait=0"
  width="300"
  height="400"
  frameborder="0"
  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

<!--
* Will be replaced with the ToC
{:toc .list-unstyled .toc}
-->

## If your app is already SAML-enabled

If your mobile app already supports logging in via SAML, it may already work
with Okta Mobile Connect. Many ISVs with SAML-enabled mobile apps are
able to work with Okta Mobile Connect without special modification.

To work with Okta Mobile Connect, your mobile app needs to meet the
criteria below:

1. It must support SAML authentication via an embedded web view that
   allows any URL to be called from inside the embedded web view.
2. It must have a URI scheme registered for the app that only returns
   the app to foreground when called.

If your app meets these two criteria, you are encouraged to submit it
to Okta for testing by sending an email to <developers@okta.com> with
the following information:

* The name of your mobile app.

* The link to your app on the App Store:

  _(For example: "https://itunes.apple.com/us/app/example/id123456789")_

* The URI Scheme that returns this app to the foreground.

  _(For example: "example://" )_

* Instructions for testing your app.

  *Please provide any instructions and credentials needed to configure
   SAML. Okta will change the SAML settings in your app to
   point to testing servers.*

<!--
If your app meets these two criteria, you are encouraged to submit it
to Okta for testing by filling out the form below:

Your email address:

<input type="text">

The name of your mobile app:

<input type="text">

The link to your app on the App Store:

<input type="text" placeholder="https://itunes.apple.com/us/app/example/id123456789">

URI Scheme that will return this app to the foreground:

<input type="text" placeholder="example://">

Instructions for testing your app

*Please provide any instructions and credentials needed to configure
 SAML as Okta will need to change the SAML settings in your app to
 point at testing servers.*

<textarea></textarea>

<input type="submit" value="Submit">
-->


## If your SAML-enabled app does not work

The only way to be certain that your SAML-enabled mobile app works
with Okta Mobile Connect is to have it tested by Okta.

With that in mind, here are the most common reasons why an existing
SAML-enabled mobile app might not work with Okta Mobile Connect:

* No [URL Scheme](https://developer.apple.com/library/ios/featuredarticles/iPhoneURLScheme_Reference/Introduction/Introduction.html)
  is registered for the app.
* Calling the URL Scheme for the app doesn't simply return the app to
  the foreground. To work with Okta Mobile Connect your app must have
  a URL Scheme that returns your app to the embedded
  web view that handles SAML authentication. Calling the
  URL Scheme should be functionally equivalent to the user returning
  your app to the foreground.
* The embedded web view for SAML authentication only allows specific
  URLs to be called in the embedded web view. The embedded web view
  must allow the **okta://** and **oktasso://** URL Schemes to be called.

## If your app is not SAML-enabled

The first step in enabling support for Okta Mobile Connect in a mobile
app is to add SAML support to that mobile app.

If your mobile app also has a website where users can log in, you
should also consider adding SAML support to that website too.

Okta has documentation to help in both of these scenarios:

* If you need to add SAML support to your software, start with
Okta's [Single Sign-On guidance](/docs/guides/saml_guidance).

* If your website already supports SAML, and you want to add
SAML support to your mobile app, start with the
[technical overview of Okta Mobile Connect](https://github.com/okta/okta-mobile-connect){:target="_blank"},
which includes an example of how to add SAML support to an iOS app.
