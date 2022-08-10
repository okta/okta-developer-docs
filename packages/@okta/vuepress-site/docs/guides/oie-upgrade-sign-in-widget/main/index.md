---
title: Upgrade your widget
---

<ApiLifecycle access="ie" />

This guide covers how to upgrade the Okta Sign-In Widget, which depends on whether your user authentication deployment model is a redirect authentication or an embedded authentication.

---

**Learning outcomes**

* Update your widget based on your user deployment model.

**What you need**

* An [Identity Engine-upgraded Okta org](/docs/guides/oie-upgrade-overview/)
* An existing app that uses the Okta Sign-In Widget
* [Latest available widget release](https://github.com/okta/okta-signin-widget/releases)

---

## About the widget

The widget is a JavaScript library that gives you a full-featured and customizable sign-in experience that you can use to authenticate users of web and mobile applications.

The widget is used on Okta's default sign-in page to start an Okta SSO session and to set the Okta [session cookie](/docs/guides/session-cookie/) in the web browser. The widget can also perform a complete [OpenID Connect (OIDC)](/docs/concepts/oauth-openid/) flow and/or integrate with [external Identity Providers](/docs/concepts/identity-providers/).

This article teaches you how to upgrade the widget when it is used in any of the following ways:

* Okta-hosted sign-in page (default): Okta provides a sign-in page that is available at your [org's URL](/docs/concepts/okta-organizations/). By default, a user who signs in on this page is redirected to the Okta user dashboard.
* Okta-hosted sign-in page (customizable): Okta provides a sign-in page that you can customize and make available under a custom domain that is a subdomain of your company's top-level domain.
* Embedded (self-hosted): You can embed the widget directly into your application.

After you've completed the widget upgrade, review [Okta Identity Engine overview](/docs/guides/oie-intro/) to take advantage of new features in Identity Engine.

## Best practice for widget maintenance

For best practices, keep your [widget](https://github.com/okta/okta-signin-widget/releases) up to date. This maintenance is essential so that you can use the latest Identity Engine features and benefit from ongoing improvements to the codebase.

The specific steps to upgrade your widget depend on your [user authentication deployment model](/docs/concepts/redirect-vs-embedded/), which can be one of the following:

* [Redirect authentication](#upgrade-process-for-a-redirect-sign-in-flow): Okta-hosted with no custom URL domain
* [Redirect authentication](#upgrade-process-for-a-redirect-sign-in-flow): Okta-hosted with custom URL domain
* [Embedded authentication](#upgrade-process-for-an-embedded-widget): Self-hosted. The embedded widget is able to perform the OIDC flow and return OAuth tokens directly within the application.

## Upgrade process for a redirect sign-in flow

The widget upgrade for a redirect sign-in flow depends on whether you configured a custom URL domain:

* If you haven't configured a [custom URL Domain](/docs/guides/custom-url-domain/) and don't have customizations outside of simple branding styles, your widget is automatically upgraded to the latest version when it's loaded from the content delivery network (CDN).
* If you've configured a [custom URL domain](/docs/guides/custom-url-domain/) and have other customizations, admins must update the widget version in the Admin Console.

To update the widget:

1. In the Admin Console, go to **Customizations** > **Sign-in page code editor**.

   In the **Okta Sign-In Widget Version** section, check that the **Major Version** is the highest version available and **Minor Version** is **latest**. The widget is always the latest version if you're not using a custom URL domain.

2. If you're using the [custom URL domain feature](/docs/guides/custom-url-domain/) and the version isn't correct, you can change the widget's version. Click **Edit** in the **Okta Sign-In Widget Version** section and then select the **Major Version** and **Minor Version** fields.

3. Click **Save** at the bottom of the page.

4. Test your app's supported authentication sign-up and recovery flows to ensure that they still work.

5. Verify the CSS and localization changes that you made are reflected in the new version.

## Upgrade process for an embedded widget

Upgrade your embedded widget by referencing the Okta CDN in your sign-in page. Replace `${widgetVersion}` with the [latest version](https://github.com/okta/okta-signin-widget/releases/) of the widget:

```html
<script src="https://global.oktacdn.com/okta-signin-widget/${widgetVersion}/js/okta-sign-in.min.js" type="text/javascript"></script>
<link href="https://global.oktacdn.com/okta-signin-widget/${widgetVersion}/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
```

See also [Using the Okta CDN](https://github.com/okta/okta-signin-widget#using-the-okta-cdn). The latest version of the widget is -=OKTA_REPLACE_WITH_WIDGET_VERSION=-.

In addition to version upgrade, you need to adjust your widget configuration for new or deprecated settings. See the next section.

> **Note:** If you're currently using the Sign-In Widget major version 4 or earlier, consult the [Okta Sign-in Widget migration guide](https://github.com/okta/okta-signin-widget/blob/master/MIGRATING.md).

## Changes to widget configuration for Identity Engine

For Identity Engine, the widget is configured differently. You can remove some specific objects that were previously in the widget configuration from the JavaScript, as described in the following sections.

### Interaction Code flow

Identity Engine uses the [Interaction Code grant type](/docs/concepts/interaction-code) to manage user interactions, such as registration or multifactor authentication. For embedded Sign-In Widget (self-hosted) deployments, the Interaction Code flow is the only supported authentication flow with Identity Engine. You must set the new `useInteractionCodeFlow=true` [configuration option](https://github.com/okta/okta-signin-widget#useinteractioncodeflow) in your embedded widget:

```JavaScript
var config = {
  issuer: '{{authServerUri}}',
  clientId: '{{oidcAppClientId}}',
  redirectUri: '{{oidcAppRedirectUri}}',
  useInteractionCodeFlow: true
}
```

### Registration

You no longer need the [registration](https://github.com/okta/okta-signin-widget#registration) JavaScript objects in the widget. You can add registration into your application by configuring your Okta admin settings for [profile enrollment](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment). This process allows users to self register into your application.

You can remove the registration objects as follows.

![Displays the registration objects in JavaScript to remove](/img/SIW_Upgrade_Config_Change1.png)

### IdP Discovery

IdP Discovery enables you to route users to different third-party IdPs that are connected to your Okta org. Users can federate back into the primary org after authenticating at the IdP. This feature still functions, but you no longer need to enable the link for users to initialize the route. Instead, you can configure a routing rule with the application context.

You can remove the `idpDiscovery` JavaScript object in the widget as follows.

![Displays the IDP Discovery object in JavaScript to remove](/img/SIW_Upgrade_Config_Change2.png)

### OpenID Connect/social authentication

When [external Identity Providers (IdPs)](/docs/guides/identity-providers/) are used for Social Login in Classic Engine, the supported IdPs (such as Google, Facebook, Apple, Microsoft, and so on) are declared with a `type` property. These supported IdPs get distinct styling and default i18n text, while other custom entries receive general styling and require you to provide text. Each IdP can have additional CSS classes added through an optional `className` property. This feature still functions in Identity Engine. However, it's no longer the preferred method to enable the link for users to initialize the route. You can replace this method by configuring a routing rule with the application context. See [Okta Sign-In Widget with an external Identity Provider](/docs/guides/add-an-external-idp/openidconnect/main/#okta-sign-in-widget).

You no longer need the `idps` JavaScript object and `className` property in the widget, and you can remove them as follows.

![Displays the IdPs object and className property in JavaScript to remove](/img/SIW_Upgrade_Config_Change3.png)

### Smart card IdP

You no longer need to configure the authentication settings for the [smart card IdP](https://help.okta.com/okta_help.htm?id=ext-idp-smart-card-workflow), as it's no longer supported. You can remove the authentication settings for the smart card IdP (`piv`) as follows.

![Displays the smart card IdP settings in JavaScript to remove](/img/SIW_Upgrade_Config_Change4.png)

### Bootstrapping from a recovery token

If you're initializing the widget with a recovery token, the `recoveryToken` setting appears, for example:

![Displays the recovery token setting](/img/SIW_Upgrade_Config_Change5.png)

The recovery token is dynamic and is automatically passed into the initialization of the widget. A value in the `recoveryToken` setting currently doesn't have any effect on widget function, though, the setting takes effect in the future.

### Okta dashboard or custom dashboard sign-in flow

For an Okta dashboard sign-in, you no longer need to configure a redirect to the Okta Identity Cloud, create an Okta session, and then open a URL specified in the widget. You can remove the redirect configuration as follows.

![Displays the Okta dashboard sign-in](/img/SIW_Upgrade_Config_Change6.png)

### Feature flags

The only feature that is supported when you upgrade the widget is `features.hideSignOutLinkInMFA`, which hides the sign-out link for a MFA challenge.

The following specific features are no longer supported, and you can't configure them in the widget. You must remove them from `features` in the JSON code:

* `features.rememberMe`: Displayed the "Remember me" function when a user signs in. See the [Organization Settings](https://help.okta.com/okta_help.htm?id=ext_Security_General) section in the Okta product documentation to enable this feature.

* `features.autoPush`: Displayed a checkbox to enable the "Send push automatically" function in the MFA challenge flow. It may be added to the policy configuration in a future release.

* `features.smsRecovery`: Recovered the password for users with a configured mobile phone number by using an SMS message. See the [password recovery policy](https://help.okta.com/okta_help.htm?id=ext-add-self-service-password-reset) topic in the Okta product documentation to enable and configure a possession (for example, a phone) authenticator.

* `features.callRecovery`: Recovered the password for users with a configured mobile phone number by using a voice call. See the [password recovery policy](https://help.okta.com/okta_help.htm?id=ext-add-self-service-password-reset) topic in the Okta product documentation to enable and configure a possession (for example, a phone) authenticator.

* `features.webauthn`: Prevented the widget from invoking the legacy Windows Hello factor. See the [sign-on policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-osop) in the Okta product documentation to enable and configure a possession authenticator.

* `features.selfServiceUnlock`: Displayed the "Unlock Account" link so that users could unlock their accounts. See [self-service account recovery](https://help.okta.com/okta_help.htm?type=oie&id=ext-config-sspr) to enable this feature.

* `features.multiOptionalFactorEnroll`: Allowed users to enroll in multiple optional factors before they finished the authentication flow. The [MFA enrollment and rules](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-mfa-enrol-policies) are evaluated by default when applicable.

* `features.registration`: Displayed the registration section in the primary auth page. The [profile enrollment policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment) are evaluated by default when applicable.

* `features.idpDiscovery`: Enabled IdP Discovery when the user signed in. The [Identity Provider routing rules](https://help.okta.com/okta_help.htm?id=ext_Identity_Provider_Discovery) are evaluated by default when applicable.

* `features.showPasswordToggleOnSignInPage`: Provided end users with the ability to toggle visibility of their password on the Okta sign-in page so that they could check their password entry before clicking **Sign In**. This feature also prevented an account lockout due to exceeding their org's permitted number of failed sign-in attempts.

* `features.scrollOnError`: Scrolled errors into view. Errors appear inside the widget.

* `features.skipIdpFactorVerificationBtn`: Provided an automatic redirect to the selected Identity Provider when selected from the list of factors. It's no longer needed since the optional authenticators have the ability to skip by default.

### I18n properties

After you upgrade your org to Identity Engine, you can override existing text strings in the interface with Identity Engine i18n strings so that you can create localized widgets. See [Updates to the widget i18n properties](/docs/guides/oie-upgrade-sign-in-widget-i18n).

## Changes to widget customization for Identity Engine

### Help title link and Need help signing in string

The following customizations aren't supported:

* **Okta-hosted widget:** The **Help title** link in the **Customized Help Links** section of the Customization page has been removed and isn't supported.
* **Self-hosted widget:** The **Need help signing in** string has been removed and isn't supported.

See [Okta Sign-in Widget: Help links](https://github.com/okta/okta-signin-widget/#help-links).

### `processCreds` hook

Developers can't subscribe to the `processCreds` hook in the widget.

### Registration inline hooks

Existing registration inline hooks may experience compatibility issues after migrating to Identity Engine due to changes in the Okta registration inline hook request. Your application may require code updates to consume the new request format properly.

In the Admin Console, the enablement of a registration inline hook has changed from the former Self-Service Registration page (**Self-service Directory** > **Self-Service Registration**) to the Profile Enrollment Rules page (**Security** > **Profile Enrollment**). The creation of the registration inline hook remains the same. You can use either the Admin Console or Inline Hook Management APIs.

See [Registration hooks API reference](/docs/references/registration-hook/) and [Manage Profile Enrollment Policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment).

### Security image

The ability for end users to specify a security image when they first register for an account isn't supported with Identity Engine. Additionally, existing users who may have already registered a security image won't see that image when they sign in.
