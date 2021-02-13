---
title: Configure registration in the widget
---
<RequireClassicUI/>

### Configure registration in a custom sign-in page in the Okta-hosted widget

If you left the <GuideLink link="../configure-self-service-registration-policy">**Add to Sign-In widget**</GuideLink> check box clear when configuring the registration policy, then you need to configure a link using JavaScript in the **Customize Sign-In Page** HTML editor.

> **Note:** To enable the Custom Sign-In Page HTML editor, you must have a [custom URL domain](/docs/guides/custom-url-domain/overview/) configured.

1. In the Admin Console, go to **Settings** and then **Customization**.
2. Click the **Custom Sign In** tab.
3. In the HTML editor, add the following configuration parameters directly under the `var config = OktaUtil.getSignInWidgetConfig();` line:

```javascript
config['features.registration'] = true;
config['authScheme'] = 'SESSION';
```

4. Click **Save and Publish**.

### Configure self-service registration in an embedded or self-hosted widget

Before you can configure self-service registration in your embedded or self-hosted widget, make sure [self-service registration](/docs/guides/set-up-self-service-registration/configure-self-service-registration-policy/) is already enabled. Then you can set `feature.registration` in the widget to "true".

```json
      },
      features: {
        // Used to enable registration feature on the widget.
        // https://github.com/okta/okta-signin-widget#feature-flags
         registration: true // REQUIRED
      }
```
See the [Okta Sign-In Widget Guide](/code/javascript/okta_sign-in_widget/) for more information on customizing the widget.

<NextSectionLink>Next Steps</NextSectionLink>
