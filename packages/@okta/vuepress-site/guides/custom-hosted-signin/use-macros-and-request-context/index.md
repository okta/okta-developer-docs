---
title: Use Macros and Request Context
---
The following macros in the HTML contain the configuration parameters for certain page elements. These macros inject specific content or functionality automatically.

* <span v-pre>`{{pageTitle}}`</span> - This macro controls the page title text of the sign-in page. To replace the <span v-pre>`{{pageTitle}}`</span> macro with your own title, be sure to replace both the brackets and the text.

Example:

```html
<title>Your Page Title Here</title>
```

* <span v-pre>`{{{SignInWidgetResources}}}`</span> - An HTML code snippet that contains JavaScript and CSS tags for bootstrapping the Okta Custom Sign-In Widget.

* <span v-pre>`{{bgImageUrl}}`</span> - This macro controls the background image. You can also configure a background image using the **Sign-In Configuration** option accessed by selecting **Customization**, and then **Appearance.** To replace the <span v-pre>`{{bgImageUrl}}`</span> macro with your own image URL, be sure to replace both the brackets and the text.

Example:

```javascript
<div class="login-bg-image" style="background-image: url('https://example.com//YourBackgroundImage.png)"></div>
```

* <span v-pre>`{{{OktaUtil}}}`</span> - This macro defines a global `OktaUtil` object that contains methods used to complete the Okta sign-in flow. When an application uses the Okta-hosted sign-in page to sign a user in, information (called request context) is available about the target application and the request. You can access this information in JavaScript code by calling the `OktaUtil.getRequestContext()` object.

An example of what is included in this object:

```json
{
   "target":{
      "clientId":"0oadday782XUlHyp90h3",
      "name":"sample_client",
      "label":"Demo App",
    },
   "authentication":{
      "request":{
         "scope":"openid",
         "response_type":"code",
         "redirect_uri":"https://example.com/debug",
         "state":"asdf",
         "response_mode":"form_post"
      },
      "client":{
         "name":"Demo App",
         "id":"0oadday782XUlHyp90h3"
      },
      "issuer":{
         "name":"default",
         "id":"ausblkmh242Vtu5430h2",
         "uri":"https://{yourOktadomain}/oauth2/default"
      }
   }
}
```

> See [Per-Application Customization](#per-application-customization) for an example of what you can do with request context output. 

<NextSectionLink/>
