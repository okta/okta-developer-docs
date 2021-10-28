---
title: Upgrade your Okta Sign-In Widget
---

<ApiLifecycle access="ie" />

## Overview

The Okta Sign-In Widget is a JavaScript library that gives you a full-featured and customizable sign-in experience that can be used to authenticate users of web and mobile applications.

The Widget is used on Okta's default sign-in page to start an Okta SSO session and to set the Okta [session cookie](/docs/guides/session-cookie/-/overview/) in the web browser. The Widget can also perform a complete [OpenID Connect (OIDC)](/docs/reference/api/oidc/) flow and/or integrate with [external Identity Providers](/docs/concepts/identity-providers/).

This article teaches you how to upgrade the Widget when it is used in any of the following ways:

* Okta-hosted sign-in page (default) &mdash; Okta provides a sign-in page that is available at your [org’s URL](/docs/concepts/okta-organizations/). By default, a user who signs in on this page is redirected to the Okta user dashboard.
* Okta-hosted sign-in page (customizable) &mdash; Okta provides a hosted sign-in page that you can customize and make available under a custom domain that is a subdomain of your company's top-level domain.
* Embedded (self-hosted) &mdash; The Widget can be embedded directly into your application.

## Best practices for Sign-In Widget maintenance

For best practices, keep your [Sign-In Widget](https://github.com/okta/okta-signin-widget/blob/master/README.md) up to date. This maintenance is beneficial so that you can use the Okta Identity Engine features.

The specific steps to upgrade your Sign-In Widget depend on your [user authentication deployment model](/docs/concepts/redirect-vs-embedded/), which can be one of the following:

* [Redirect authentication](/docs/guides/oie-upgrade-sign-in-widget/main/#upgrade-process-for-a-redirect-sign-in) &mdash; Okta-hosted with no custom URL domain
* [Redirect authentication](/docs/guides/oie-upgrade-sign-in-widget/main/#upgrade-process-for-a-redirect-sign-in) &mdash; Okta-hosted with custom URL domain
* [Embedded authentication](/docs/guides/oie-upgrade-sign-in-widget/main/#upgrade-process-for-an-embedded-sign-in-widget) &mdash; Self-hosted. The embedded widget is able to perform the OIDC flow and return OAuth tokens directly within the application.

## Upgrade process for a redirect sign-in

The Sign-In Widget upgrade for a redirect sign-in depends on whether you’ve configured a custom URL domain:

* If you haven’t configured a [custom URL Domain](/docs/guides/custom-url-domain/overview/) and don’t have customizations outside of simple branding styles, your Sign-In Widget is automatically upgraded to the latest version when it’s loaded from the content delivery network (CDN).
* If you’ve configured a [custom URL domain](/docs/guides/custom-url-domain/overview/) and have other customizations, admins must update the Okta Sign-In Widget version in the Admin Console.

To update the Sign-In Widget:

1. In the Admin Console, go to **Customization** > **Custom Sign In** tab.
2. In the **Okta Sign-In Widget Version** section, check that the **Major Version** is **5** and **Minor Version** is **latest**. The Widget is always the latest version if you’re not using a custom URL domain.
If you’re using a [custom URL domain feature](/docs/guides/custom-url-domain/-/overview/) and the version isn’t correct, you can change the Widget’s version by using the drop-down boxes that appear for the **Major Version** and **Minor Version** fields.
3. Test your authentication sign-up and recovery flows that you support in your applications to make sure that they work.
4. Check that any CSS and localization changes that you make are reflected in the new version.

## Upgrade process for an embedded Sign-In Widget

When you upgrade an embedded Sign-In Widget:

* Make sure that the [Widget configuration](/docs/guides/oie-embedded-common-download-setup-app/java/main/) references the latest version of the Widget and that the [reference to the Okta CDN](/docs/guides/oie-embedded-widget-use-case-load/java/main/#_1-source-the-sign-in-widget-in-your-sign-in-page) grabs the latest Widget version. See the [Okta Sign-In Widget Readme](https://github.com/okta/okta-signin-widget/blob/master/README.md#using-the-okta-cdn) for more information on [using the Okta CDN](https://github.com/okta/okta-signin-widget/blob/master/README.md#using-the-okta-cdn).

* Update the Javascript and CSS files in your HTML as follows:

```javascript
<!-- Latest CDN production Javascript and CSS -->
<script src="https://global.oktacdn.com/okta-signin-widget/5.12.0/js/okta-sign-in.min.js" type="text/javascript"></script>

<link href="https://global.oktacdn.com/okta-signin-widget/5.12.0/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>

```

> **Note:** Consult the [Migrate guide](https://github.com/okta/okta-signin-widget/blob/master/MIGRATING.md) if you’re using major version 4 or earlier of the Sign-In Widget.
