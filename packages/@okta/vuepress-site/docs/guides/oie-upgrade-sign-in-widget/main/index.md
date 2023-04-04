---
title: Upgrade the Okta Sign-In Widget
---

<ApiLifecycle access="ie" />

This guide covers how to upgrade the Okta Sign-In Widget. The upgrade depends on whether your user authentication deployment model is a redirect authentication or an embedded authentication.

---

**Learning outcomes**

* Update your widget based on your user deployment model.

**What you need**

* An [Identity Engine-upgraded Okta org](/docs/guides/oie-upgrade-overview/)
* An existing app that uses the Sign-In Widget
* [Latest available widget release](https://github.com/okta/okta-signin-widget/releases)

---

## About the Okta Sign-In Widget

The widget is a JavaScript library that provides a full-featured and customizable sign-in experience that you can use to authenticate web and mobile app users.

Use the widget on the Okta default sign-in page to start an Okta SSO session and to set the Okta [session cookie](/docs/guides/session-cookie/) in the web browser. The widget can also perform a complete [OpenID Connect (OIDC)](/docs/concepts/oauth-openid/) flow and/or integrate with [external Identity Providers](/docs/concepts/identity-providers/).

This article teaches you how to upgrade the Sign-In Widget when it’s used in any of the following ways:

* Redirect sign-in page (default): Okta provides a sign-in page that is available at your [org's URL](/docs/concepts/okta-organizations/). By default, a user who signs in on this page is redirected to the Okta user dashboard.
* Redirect sign-in page (customizable): Okta provides a sign-in page that you can customize. You can then make it available under a custom domain that's a subdomain of your company's top-level domain.
* Embedded (self-hosted): You can embed the widget directly into your application.

After you've completed the widget upgrade, review the [Okta Identity Engine overview](/docs/concepts/oie-intro/) to take advantage of the new features in Identity Engine.

## Best practice for widget maintenance

For best practices, keep your [widget](https://github.com/okta/okta-signin-widget/releases) up to date. This maintenance is essential so that you can use the latest Identity Engine features and benefit from ongoing improvements to the codebase.

The specific steps to upgrade your widget depend on your [user authentication deployment model](/docs/concepts/redirect-vs-embedded/), which can be one of the following:

* [Redirect authentication](#upgrade-process-for-a-redirect-sign-in-flow): Okta-hosted with no custom URL domain
* [Redirect authentication](#upgrade-process-for-a-redirect-sign-in-flow): Okta-hosted with custom URL domain
* [Embedded authentication](#upgrade-process-for-an-embedded-widget): Self-hosted. The embedded widget is able to perform the OIDC flow and return OAuth tokens directly within the application.

## Upgrade process for a redirect sign-in flow

The widget upgrade for a redirect sign-in flow depends on whether you configured a custom URL domain:

* [Custom domain](/docs/guides/custom-url-domain/) and customizations outside of simple branding styles aren't configured: The widget is automatically upgraded to the latest version when it's loaded from the content delivery network (CDN).

* [Custom domain](/docs/guides/custom-url-domain/) and other customizations are configured: Admins must update the widget version in the Admin Console.

To update the widget:

> **Note:** If you've enabled [Early Access (EA) multibrand customization](https://help.okta.com/okta_help.htm?type=oie&id=csh-branding), your Admin Console navigation is different. See parenthetical notes.

1. In the Admin Console, go to **Customizations** > **Branding** then click **Edit** in the **Sign-in page** section. (EA users: go to **Customizations** > **Brands**, and then select the brand you want.)

2. Go to the **Settings** tab. (EA users: in the **Pages** tab, click **Configure** for the page that has the version you want to upgrade.)

    - In the **Sign-In Widget Version** section, check that the **Version** is the highest version available. The widget is always the latest version if you're not using a custom URL domain.
    - If you're using the [custom domain feature](/docs/guides/custom-url-domain/) and the version isn't correct, you can pin the widget's version. Click **Edit** in the **Sign-In Widget Version** section and then select the **Version** field.
    - (EA users: You can't customize the Sign-In Widget for the Okta default brand.)

    > **Note:** When the third generation of the Sign-In Widget is enabled, the pinned version is ignored.

3. Click **Save to draft**.

4. Go to the **Page Design** tab to preview the draft of your sign-in page.

5. Verify the CSS and localization changes that you made are reflected in the new version.

  > **Note:** The third generation of the Okta Sign-In Widget doesn’t guarantee the stability of CSS selectors. Instead, customization in the third generation gets better support through branding. See [Customizations](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Customization/).

## Upgrade process for an embedded widget

Upgrade your embedded widget by referencing the Okta CDN in your sign-in page. Replace `${widgetVersion}` with the [latest version](https://github.com/okta/okta-signin-widget/releases/) of the widget:

```html
<script src="https://global.oktacdn.com/okta-signin-widget/${widgetVersion}/js/okta-sign-in.min.js" type="text/javascript"></script>
<link href="https://global.oktacdn.com/okta-signin-widget/${widgetVersion}/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
```

See also [Using the Okta CDN](https://github.com/okta/okta-signin-widget#using-the-okta-cdn). The latest version of the widget is -=OKTA_REPLACE_WITH_WIDGET_VERSION=-.

In addition to version upgrade, you need to adjust your widget configuration for new or deprecated settings. See the next section.

> **Note:** The third generation of the Okta Sign-In Widget doesn’t support embedded authentication. See [Sign-In Widget, third generation](https://help.okta.com/okta_help.htm?type=oie&id=ext-compare-siw).

> **Note:** If you're currently using the Sign-In Widget major version 4 or earlier, consult the [Okta Sign-in Widget migration guide](https://github.com/okta/okta-signin-widget/blob/master/MIGRATING.md).

## Changes to widget configuration for Identity Engine

For Identity Engine, the widget is configured differently. You can remove some specific objects that were previously in the widget configuration from the JavaScript, as described in the following sections.

### Interaction Code flow

Identity Engine uses the [Interaction Code grant type](/docs/concepts/interaction-code) to manage user interactions, such as registration or multifactor authentication. For embedded Sign-In Widget (self-hosted) deployments, the Interaction Code flow is the only supported authentication flow with Identity Engine.

In Okta Sign-In Widget version 7+, Identity Engine is enabled by default. If you’re using an earlier version than 7, you must explicitly enable Identity Engine features by setting `useInteractionCodeFlow: true` in the `config` object:

```JavaScript
var config = {
  issuer: '{{authServerUri}}',
  clientId: '{{oidcAppClientId}}',
  redirectUri: '{{oidcAppRedirectUri}}',
  useInteractionCodeFlow: true
}
```

If you’re using version 7+ and you want to use Okta Classic Engine rather than Identity Engine, specify `useClassicEngine: true` in your `config` object:

```JavaScript
var config = {
  issuer: '{{authServerUri}}',
  clientId: '{{oidcAppClientId}}',
  redirectUri: '{{oidcAppRedirectUri}}',
  useClassicEngine: true
}
```

### Registration

You no longer need the [registration](https://github.com/okta/okta-signin-widget#registration) JavaScript objects in the widget. You can add registration into your application by configuring your Okta admin settings for [profile enrollment](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment). This process allows users to self-register into your application.

Remove the `registration` object and `features.registration` property that are shown in the following snippet:

```JavaScript
var signIn = new OktaSignIn({
  baseUrl: 'https://{yourOktaDomain}',
  registration: {
    preSubmit: (postData, onSuccess, onFailure) => {
        // handle preSubmit callback
        onSuccess(postData);
    },
    postSubmit: (response, onSuccess, onFailure) => {
        // handle postsubmit callback
        onSuccess(response);
    }
  },
  features: {
    // Used to enable registration feature on the widget
    // https://github.com/okta/okta-signin-widget#feature-flags
    registration: true
  }
})
```

> **Note**: The `parseSchema` method isn't included in the above `registration` object because the ability to include more schemas is no longer supported.

### IdP Discovery

IdP Discovery enables you to route users to different third-party IdPs that are connected to your Okta org. Users can federate back into the primary org after authenticating at the IdP. This feature still functions, but you no longer need to enable the link for users to initialize the route. Instead, you can configure a routing rule with the application context.

Remove the `idpDiscovery` property:

```JavaScript
features: {
  idpDiscovery: true
}
```

### OpenID Connect/social authentication

You no longer require the `idps` JavaScript object in the widget and can remove it.

```JavaScript
idps: [
  { type: 'GOOGLE', id: '0oagjkh' },
  { type: 'FACEBOOK', id: '0oagjkh' },
    ...
]
```

This is now optional as the Sign-In Widget automatically includes IdPs based on Identity Engine routing rules.

### Bootstrap from a recovery token

If you're initializing the widget with a recovery token, the `recoveryToken` setting appears, for example:

```JavaScript
recoveryToken: 'x0whAcR02i0leKtWMZVc'
```

The recovery token is dynamic and is automatically passed into the initialization of the widget. A value in the `recoveryToken` setting currently doesn't impact widget function, though the setting takes effect in the future.

### Okta dashboard or custom dashboard sign-in flow

For an Okta dashboard sign-in flow, you no longer need to do the following:

- Configure a redirect to the Okta Identity Cloud
- Create an Okta session
- Open a URL specified in the widget

Remove the redirect configuration (`setCookieAndRedirect()`) line shown in the following snippet:

```JavaScript
function success(res) {
  if (res.status === 'SUCCESS') {
    res.session.setCookieAndRedirect('https://{yourOktaDomain}/app/UserHome');
  }
};
```

### Feature flags

The only feature that is supported when you upgrade the widget is `features.hideSignOutLinkInMFA`, which hides the sign-out link for an MFA challenge.

The following specific features are no longer supported, and you can't configure them in the widget. Remove them from `features` in the JSON code:

* `features.rememberMe`: Displayed the "Remember me" function when a user signs in. See the [Organization Settings](https://help.okta.com/okta_help.htm?id=ext_Security_General) section in the Okta product documentation to enable this feature.

* `features.autoPush`: Displayed a checkbox to enable the "Send push automatically" function in the MFA challenge flow. It may be added to the policy configuration in a future release.

* `features.smsRecovery`: Recovered the password for users with a configured mobile phone number by using an SMS message. See [password recovery policy](https://help.okta.com/okta_help.htm?id=ext-add-self-service-password-reset) to enable and configure a possession (for example, a phone) authenticator.

* `features.callRecovery`: Recovered the password for users with a configured mobile phone number by using a voice call. See [password recovery policy](https://help.okta.com/okta_help.htm?id=ext-add-self-service-password-reset) to enable and configure a possession (for example, a phone) authenticator.

* `features.webauthn`: Prevented the widget from invoking the legacy Windows Hello factor. See [sign-on policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-osop) to enable and configure a possession authenticator.

* `features.selfServiceUnlock`: Displayed the "Unlock Account" link so that users could unlock their accounts. See [self-service account recovery](https://help.okta.com/okta_help.htm?type=oie&id=ext-config-sspr) to enable this feature.

* `features.multiOptionalFactorEnroll`: Allowed users to enroll in multiple optional factors before they finished the authentication flow. The [MFA enrollment and rules](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-mfa-enrol-policies) are evaluated by default when applicable.

* `features.registration`: Displayed the registration section in the primary auth page. The [profile enrollment policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment) are evaluated by default when applicable.

* `features.idpDiscovery`: Enabled IdP Discovery when the user signed in. The [Identity Provider routing rules](https://help.okta.com/okta_help.htm?id=ext_Identity_Provider_Discovery) are evaluated by default when applicable.

* `features.showPasswordToggleOnSignInPage`: Provided end users with the ability to toggle visibility of their password on the Okta sign-in page. This allows users to check their password entry before clicking **Sign In**. This feature also prevented an account lockout due to exceeding their org's permitted number of failed sign-in attempts.

* `features.scrollOnError`: Scrolled errors into view. Errors appear inside the widget.

* `features.skipIdpFactorVerificationBtn`: Provided an automatic redirect to the selected Identity Provider when selected from the list of factors. It's no longer needed since the optional authenticators can skip by default.

### I18n properties

After you upgrade your org to Identity Engine, you can override existing text strings in the interface. Use Identity Engine i18n strings so that you can create localized widgets. See [Updates to the widget i18n properties](/docs/guides/oie-upgrade-sign-in-widget-i18n).

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

In the Admin Console, where you enable a registration inline hook has changed from the Self-Service Registration page (**Self-service Directory** > **Self-Service Registration**) to the Profile Enrollment Rules page (**Security** > **Profile Enrollment**). The creation of the registration inline hook remains the same. You can use either the Admin Console or Inline Hook Management APIs.

See [Registration hooks API reference](/docs/reference/registration-hook/) and [Manage Profile Enrollment Policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment).

### Security image

The ability for end users to specify a security image when they first register for an account isn't supported with Identity Engine. Also, existing users who may have already registered a security image can't see that image when they sign in.

## See also

[Deprecated JavaScript methods in the widget](/docs/guides/oie-upgrade-sign-in-widget-deprecated-methods/main/)
