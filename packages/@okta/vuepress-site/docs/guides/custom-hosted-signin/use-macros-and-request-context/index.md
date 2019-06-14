---
title: Use macros and request context
---
The following macros in the HTML contain the configuration parameters for certain page elements. These macros inject specific content or functionality automatically.

#### <span v-pre>`{{pageTitle}}`</span>
Inserts the page title.

Example:
   ```html
   <title>{{pageTitle}}</title>
   ```

#### <span v-pre>`{{{SignInWidgetResources}}}`</span>
Inserts the JavaScript and CSS files required to use the Okta Sign-In Widget.

#### <span v-pre>`{{bgImageUrl}}`</span>
Inserts a URL to the background image configured in your Okta organization. This setting can be changed by selecting **Customization**, and then **Appearance**.

Example:
   ```javascript
   <div class="login-bg-image" style="background-image: {{bgImageUrl}}"></div>
   ```

#### <span v-pre>`{{{OktaUtil}}}`</span>
Defines a global `OktaUtil` JavaScript object that contains methods used to complete the Okta sign-in flow. When an application uses the Okta-hosted sign-in page to sign a user in, information (called request context) is available about the target application and the request.

## Request context

By calling the `OktaUtil.getRequestContext()` method, JavaScript code on your sign-in page can inspect the current request and make decisions based on the target application or other details.

Here's what is returned from `getRequestContext()`:

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

For an OpenID Connect application, the application's client ID is stored in the request context's target for that object:

```
OktaUtil.getRequestContext().target.clientId
```

There is also additional information available in the `target`, such as `label`.

> Note: The `getRequestContext()` method only returns a value when the Okta-hosted sign-in page is loaded in the context of an application (such as SP-initiated flows in SAML or the `/authorize` route for OpenID Connect). Otherwise, it returns undefined.

See <GuideLink link="../customization-examples/#per-application-customization">Per-application customization</GuideLink> for an example of what you can do with request context.

<NextSectionLink/>
