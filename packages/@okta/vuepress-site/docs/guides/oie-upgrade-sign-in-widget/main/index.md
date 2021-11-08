---
title: Upgrade your Okta Sign-In Widget
---

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" />

## Overview

The Okta Sign-In Widget is a JavaScript library that gives you a full-featured and customizable sign-in experience that can be used to authenticate users of web and mobile applications.

The Widget is used on Okta's default sign-in page to start an Okta SSO session and to set the Okta [session cookie](/docs/guides/session-cookie/overview/) in the web browser. The Widget can also perform a complete [OpenID Connect (OIDC)](/docs/reference/api/oidc/) flow and/or integrate with [external Identity Providers](/docs/concepts/identity-providers/).

This article teaches you how to upgrade the Widget when it is used in any of the following ways:

* Okta-hosted sign-in page (default) &mdash; Okta provides a sign-in page that is available at your [org's URL](/docs/concepts/okta-organizations/). By default, a user who signs in on this page is redirected to the Okta user dashboard.
* Okta-hosted sign-in page (customizable) &mdash; Okta provides a hosted sign-in page that you can customize and make available under a custom domain that is a subdomain of your company's top-level domain.
* Embedded (self-hosted) &mdash; The Widget can be embedded directly into your application.

After you've completed the Sign-In Widget upgrade and you want to take advantage of the new features in Okta Identity Engine, you can [configure your embedded Sign-In Widget](https://github.com/okta/okta-signin-widget/blob/master/README.md#embedded-self-hosted) to use the new Identity Engine Authentication features.

## Best practice for Sign-In Widget maintenance

For best practices, keep your [Sign-In Widget](https://github.com/okta/okta-signin-widget/blob/master/README.md) up to date. This maintenance is beneficial so that you can use the Okta Identity Engine features.

The specific steps to upgrade your Sign-In Widget depend on your [user authentication deployment model](/docs/concepts/redirect-vs-embedded/), which can be one of the following:

* [Redirect authentication](/docs/guides/oie-upgrade-sign-in-widget/main/#upgrade-process-for-a-redirect-sign-in) &mdash; Okta-hosted with no custom URL domain
* [Redirect authentication](/docs/guides/oie-upgrade-sign-in-widget/main/#upgrade-process-for-a-redirect-sign-in) &mdash; Okta-hosted with custom URL domain
* [Embedded authentication](/docs/guides/oie-upgrade-sign-in-widget/main/#upgrade-process-for-an-embedded-sign-in-widget) &mdash; Self-hosted. The embedded widget is able to perform the OIDC flow and return OAuth tokens directly within the application.

## Best practice for user experience and application policies

In Classic Engine, the Okta Sign-In Widget had the default option to initialize without application context. In Identity Engine, you should use one of these OIDC flows so that you can optimize the user's sign-in experience and apply specific application policies:

* [Server-side Web Application using "authorization_code" flow](https://developer.okta.com/code/javascript/okta_sign-in_widget/#server-side-web-application-using-authorization-code-flow)
* [SPA or Native Application using PKCE](https://developer.okta.com/code/javascript/okta_sign-in_widget/#spa-or-native-application-using-pkce)

## Upgrade process for a redirect sign-in

The Sign-In Widget upgrade for a redirect sign-in depends on whether you've configured a custom URL domain:

* If you haven't configured a [custom URL Domain](/docs/guides/custom-url-domain/overview/) and don't have customizations outside of simple branding styles, your Sign-In Widget is automatically upgraded to the latest version when it's loaded from the content delivery network (CDN).
* If you've configured a [custom URL domain](/docs/guides/custom-url-domain/overview/) and have other customizations, admins must update the Okta Sign-In Widget version in the Admin Console.

To update the Sign-In Widget:

1. In the Admin Console, go to **Customization** > **Custom Sign In** tab.
2. In the **Okta Sign-In Widget Version** section, check that the **Major Version** is **5** and **Minor Version** is **latest**. The Widget is always the latest version if you're not using a custom URL domain.
If you're using the [custom URL domain feature](/docs/guides/custom-url-domain/overview/) and the version isn't correct, you can change the Widget's version by using the drop-down boxes that appear for the **Major Version** and **Minor Version** fields.
3. Test your authentication sign-up and recovery flows that you support in your applications to make sure that they work.
4. Check that any CSS and localization changes that you make are reflected in the new version.

## Upgrade process for an embedded Sign-In Widget

When you upgrade an embedded Sign-In Widget:

* Make sure that the [Widget configuration](/docs/guides/oie-embedded-common-download-setup-app/-/main/) references the latest version of the Widget and that the [reference to the Okta CDN](/docs/guides/oie-embedded-widget-use-case-load/-/main/#_1-source-the-sign-in-widget-in-your-sign-in-page) grabs the latest Widget version. See the [Okta Sign-In Widget Readme](https://github.com/okta/okta-signin-widget/blob/master/README.md) for more information on [using the Okta CDN](https://github.com/okta/okta-signin-widget/blob/master/README.md#using-the-okta-cdn).

* Update the Javascript and CSS files in your HTML as follows. Note that the latest version changes every week. You should always use the latest version available. See [Okta Sign-In Widget releases](https://github.com/okta/okta-signin-widget/releases) for the latest version.

```javascript
<!-- Latest CDN production Javascript and CSS -->
<script src="https://global.oktacdn.com/okta-signin-widget/5.12.0/js/okta-sign-in.min.js" type="text/javascript"></script>

<link href="https://global.oktacdn.com/okta-signin-widget/5.12.0/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>

```

> **Note:** Consult the [Okta Sign-in Widget migration guide](https://github.com/okta/okta-signin-widget/blob/master/MIGRATING.md) if you're using major version 4 or earlier of the Sign-In Widget.

## Updates in Sign-In Widget configuration for Identity Engine

For Identity Engine, some features that were in the Sign-In Widget configuration can be removed or updated in the initialization code.

### Registration

To add registration into your application, you need to configure your Okta admin settings for profile enrollment to allow users to sign up or self register into your app.

The following [registration](https://github.com/okta/okta-signin-widget#registration) process omits these objects in the Sign-In Widget.

```javascript
var signIn = new OktaSignIn({
      baseUrl: 'https://${yourOktaDomain}',
      // If you are using version 2.8 or higher of the widget, clientId is not required while configuring
      // registration. Instead the widget relies on policy setup with Self Service Registration. For help
      // with setting up Self Service Registration contact support@okta.com. Registration should continue
      // to work with a clientId set and version 2.7 or lower of the widget.
      clientId: '${myClientId}', // REQUIRED (with version 2.7.0 or lower)
      registration: {
        parseSchema: function(schema, onSuccess, onFailure) {
           // handle parseSchema callback
           onSuccess(schema);
        },
        preSubmit: function (postData, onSuccess, onFailure) {
           // handle preSubmit callback
           onSuccess(postData);
        },
        postSubmit: function (response, onSuccess, onFailure) {
            // handle postsubmit callback
           onSuccess(response);
        }
      },
      features: {
        // Used to enable registration feature on the widget.
        // https://github.com/okta/okta-signin-widget#feature-flags
         registration: true // REQUIRED
      }
    });
```

### IdP Discovery

IdP Discovery enables you to route users to different third-party IdPs that are connected to your Okta org. Users can federate back into the primary org after authenticating at the IdP. While this feature still functions, it's no longer the preferred method to enable the link for users to initialize the route and can be replaced by configuring a Routing Rule with the application context.

See [IdP](https://github.com/okta/okta-signin-widget#idp-discovery).

### OpenID Connect/social authentication

When External Identity Providers (IdPs) are used in OIDC authentication (known as Social Login), the supported IdPs (Google, Facebook, Apple, Microsoft, and LinkedIn) are declared with a type and get distinct styling and default i18n text, while any other entry receives a general styling and requires text to be provided. Each IdP can have additional CSS classes added through an optional `className` property.

While this feature still functions, it's no longer the preferred method to enable the link for users to initialize the route. This can be replaced by configuring a Routing Rule with the application context.

See [idps](https://github.com/okta/okta-signin-widget#openid-connect) for ...

Some common features that were in the Sign-In Widget configuration that no longer function should now be removed from the code in initialization.

### Smart card IdP

No longer supported… until PIV/CAC support.
https://github.com/okta/okta-signin-widget#smart-card-idp

Bootstrapping from a recovery token
https://github.com/okta/okta-signin-widget#bootstrapping-from-a-recovery-token

### Feature flags

The following features are no longer supported. They are now configured in Okta Sign-On Policies.

features.rememberMe - Display a checkbox to enable "Remember me" functionality at login. Defaults to true.

features.autoPush - Display a checkbox to enable "Send push automatically" functionality in the MFA challenge flow. Defaults to false.

features.smsRecovery - Allow users with a configured mobile phone number to recover their password using an SMS message. Defaults to false.

features.callRecovery - Allow users with a configured mobile phone number to recover their password using a voice call. Defaults to false.

features.webauthn - Display and use factors supported by the FIDO 2.0 (Web Authentication) security standard. Enabling this feature will prevent the widget from invoking the legacy Windows Hello factor. Defaults to false.

features.selfServiceUnlock - Display the "Unlock Account" link to allow users to unlock their accounts. Defaults to false.

features.multiOptionalFactorEnroll - Allow users to enroll in multiple optional factors before finishing the authentication flow. Default behavior is to force enrollment of all required factors and skip optional factors. Defaults to false.

features.hideSignOutLinkInMFA - Hides the sign out link for MFA challenge. Defaults to false.

features.registration - Display the registration section in the primary auth page. Defaults to false.

features.idpDiscovery - Enable IdP Discovery. Defaults to false.

features.showPasswordToggleOnSignInPage - End users can now toggle visibility of their password on the Okta Sign-In page, allowing end users to check their password before they click Sign In. This helps prevent account lock outs caused by end users exceeding your org's permitted number of failed sign-in attempts. Note that passwords are visible for 30 seconds and then hidden automatically. Defaults to false.

features.scrollOnError - By default, errors will be scrolled into view. Set to false to disable this behavior.

features.skipIdpFactorVerificationBtn - Automatically redirects to the selected Identity Provider when selected from the list of factors. Defaults to false.

