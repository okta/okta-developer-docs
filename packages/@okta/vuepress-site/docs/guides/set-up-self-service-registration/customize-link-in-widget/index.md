---
title: Customize the sign-up link in the Widget
---
<RequireClassicUI/>

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

<NextSectionLink>Next Steps</NextSectionLink>
