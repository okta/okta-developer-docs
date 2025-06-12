---
title: Cuztomize associated domains
excerpt: Learn how to customize associated domains.
layout: Guides
---

This guide explains how to create associations between your custom domains and three well-known endpoints. The endpoints are associated with iOS, Android, and WebAuthn and you can use them to establish a trusted relationship between your app, authorized referring domains, and the web credentials of users for those domains.

---

#### Learning outcomes

* Customize the Okta subdomain (using an Okta-managed certificate or using your own Transport Layer Security (TLS) certificate)
* Configure a custom email address

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* Access to a [custom domain](/docs/guides/custom-url-domain)

---

## About associated domains

Associated domains create a secure, verifiable link between your website and your native application. This cryptographic trust allows your app to handle URLs from your domain and enables the secure sharing of credentials like passkeys, which is essential for seamless, secure sign-in experiences. By configuring your custom domain to host the required apple-app-site-association or assetlinks.json file through our service, you can enable features like Universal Links, App Links, and streamlined passwordless authentication in your application.

## Types of well-known URIs

* `/.well-known/apple-app-site-association`
* `/.well-known/assetlinks.json`
* `/.well-known/webauthn`

## Declare associations with the well-known URIs


