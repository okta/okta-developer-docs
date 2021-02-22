---
title: Style the Okta-hosted Sign-In Widget
---

You can add any HTML, CSS, or JavaScript to the sign-in page and also customize the sign-in page <GuideLink link="../customization-examples/#per-application-customization">per application</GuideLink> and with multiple brands. This page covers what you can change when you are using the Okta-hosted Sign-In Widget, how to use the macros and request context, and also how to bypass the custom sign-in page.

> **Note:** Before you can get started customizing the Okta-hosted sign-in page, you must have already customized your [Okta URL domain](/docs/guides/custom-url-domain/).

### Edit the sign-in page

The **Custom Sign-In Page** offers both basic and advanced customization options to create a completely transformed sign-in experience. To access this page, from the Admin Console select **Settings**, and then **Customization** from the side navigation.  On the **Customization Page** click the **Custom Sign in** tab.

#### Change the Okta Sign-In Widget version

The Okta-hosted sign-in page uses the [Sign-In Widget](https://github.com/okta/okta-signin-widget) component to interact with the user. If you aren't familiar with the Okta Sign-In Widget, Okta recommends that you select the highest **Major Version** and the latest **Minor Version** (default). For details about the Okta Sign-In Widget capabilities that are supported by major and minor versions, see the [GitHub releases page](https://github.com/okta/okta-signin-widget/releases).

1. To make changes to the major and minor versions, select **Edit** in the **Okta Sign-In Widget Version** section header.
2. Make your changes, and then click **Save** at the bottom of the page.

#### Change headings and labels

To change the heading and labels, and to customize help links on the sign-in page, make changes to the **Sign-In Page** section.

1. Click **Edit** in the **Sign-In Page** section header.
2. Use the form fields on the left side of the page to customize links, labels, and headings.

You can also customize the placeholder text that appears in recovery flows when end users click account recovery links (for example, Forgot password and Unlock account). If you leave a label field blank, Okta uses the default text.

> **Note:** Although Okta displays default labels, links, and headings in the end user's display language or browser language, Okta doesn't display localized versions of customized text and links. Text that you change here is hard-coded. To specify multiple localized versions of headings and labels, use the [Sign-in Widget text configuration options](https://github.com/okta/okta-signin-widget/#language-and-text).

#### Use the embedded HTML editor

If you are familiar with using HTML and want to change the page layout, colors, button shapes, and other elements, use the embedded HTML editor in the middle of the page. You can modify the current HTML/CSS and JavaScript or paste your own code.

1. Make changes directly in the embedded editor.
2. Click **Preview** to preview your changes before you publish.
3. Click **Reset to Default** if you need to remove all of your customizations and restore the default HTML/CSS and JavaScript code.
4. Click **Save and Publish** when you finish.

> **Note:** See the <GuideLink link="../customization-examples">Customization examples</GuideLink> section for examples that you can alter and use on your hosted sign-in page.

### Bypass the Custom Sign-In Page

Use the `/login/default` backdoor sign-in URL to bypass the custom sign-in page. If, for example, something goes wrong with your customizations and your sign-in page won't load, add `/login/default` to the end of your Okta URL to bring up the default sign-in page and enter your credentials:

```
https://${yourOktaDomain}/login/default
```

This URL only bypasses changes that you have made to the HTML in the HTML editor. It doesn't bypass changes that you made using the controls on the left side of the page.

### Use macros and request context

The following macros in the HTML contain the configuration parameters for certain page elements. These macros inject specific content or functionality automatically.

##### <span v-pre>`{{pageTitle}}`</span>

Inserts the page title.

Example:

```html
<title>{{pageTitle}}</title>
```

##### <span v-pre>`{{{SignInWidgetResources}}}`</span>

Inserts the JavaScript and CSS files required to use the Okta Sign-In Widget.

##### <span v-pre>`{{bgImageUrl}}`</span>

Inserts a URL to the background image configured in your Okta organization. This setting can be changed by selecting **Customization**, and then **Appearance**.

Example:

```html
<div class="login-bg-image" style="background-image: {{bgImageUrl}}"></div>
```

##### <span v-pre>`{{{OktaUtil}}}`</span>

Defines a global `OktaUtil` JavaScript object that contains methods used to complete the Okta sign-in flow. When an application uses the Okta-hosted sign-in page to sign a user in, information (called request context) is available about the target application and the request.

### Request context

By calling the `OktaUtil.getRequestContext()` method, JavaScript code on your sign-in page can inspect the current request and make decisions based on the target application or other details.

Here's what is returned from `getRequestContext()`:

```json
{
  "target": {
    "clientId": "0oadday782XUlHyp90h3",
    "name": "sample_client",
    "label": "Demo App"
  },
  "authentication": {
    "request": {
      "scope": "openid",
      "response_type": "code",
      "redirect_uri": "https://example.com/debug",
      "state": "asdf",
      "response_mode": "form_post"
    },
    "client": {
      "name": "Demo App",
      "id": "0oadday782XUlHyp90h3"
    },
    "issuer": {
      "name": "default",
      "id": "ausblkmh242Vtu5430h2",
      "uri": "https://${yourOktaDomain}/oauth2/default"
    }
  }
}
```

For an OpenID Connect application, the application's client ID is stored in the request context's target for that object:

```javascript
OktaUtil.getRequestContext().target.clientId
```

There is also additional information available in the `target`, such as `label`.

> **Note:** The `getRequestContext()` method only returns a value when the Okta-hosted sign-in page is loaded in the context of an application (such as SP-initiated flows in SAML or the `/authorize` route for OpenID Connect). Otherwise, it returns `undefined`.

See <GuideLink link="../customization-examples/#per-application-customization">Per-application customization</GuideLink> for an example of what you can do with request context.

<NextSectionLink/>
