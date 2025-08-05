---
title: Okta Sign-in Widget
meta:
  - name: description
    content: A high-level overview of the Okta Sign-In Widget.
---

# Learn about the Okta Sign-in Widget

The Sign-In Widget is a JavaScript library that you can integrate in several ways to authenticate users into web and mobile apps for your org. It provides a complete, accessible, pre-built sign-in experience that you can use as is or customize based on your requirements. The widget renders a user-friendly interface for all aspects of the identity verification lifecycle, from initial registration to multi-factor authentication. It acts as the front door to your app or website. 


## Benefits 

* Improve productivity and reduce development overhead

   * You don't need to build complex authentication features from scratch. The widget provides features like user registration, password reset, CAPTCHA, and multi-factor authentication (MFA).

   * You can easily integrate the widget with your web or mobile app in any of the following ways.

      * Redirect to a dedicated Okta-hosted page

      * Load it using the Okta CDN

      * Install it as an npm module

    Okta also provides SDKs for popular frameworks like Angular, React, and Vue, which further streamline the integration process.

* Provide a centralized and consistent sign-in experience

   * You can customize the widget's appearance using the code editor to seamlessly integrate with your brand. Customization options include your company logo, color schemes, favicon, the text for various labels and links, and the ability to add or modify supported languages.  

   * You don't need to run a code deployment when you make changes in the Okta Admin Console. The changes are instantly reflected in the widget when you enforce security policies (password complexity, session duration, and MFA requirements) from the Okta Admin Console. 

You can let Okta host the widget or you can embed the widget in your code base.


### Okta-hosted Sign-In Widget (recommended) 

With this approach, the user is redirected to the Okta-hosted sign-in page. After they authenticate, they are redirected back to your app or website. This minimizes the security risks associated with handling user credentials directly. You also get the speed of an out-of-the-box solution while retaining the power of Okta's centralized identity management platform. Okta-hosted Sign-In Widget is the recommended approach. 

Because Okta hosts the widget, Okta is responsible for its security and maintenance. This means you don't have to keep the widget updated with the latest security patches and features. Okta handles this for you automatically.

You can customize the look and feel of the standard sign-in form directly from the Admin Console. This approach is best for if you want a branded experience without needing to host the code yourself. You will typically need to configure a custom domain to unlock the most advanced customization features.

#### Standard

Use the standard sign-in form hosted at your unique Okta URL for a no-code implementation. You can upload your own company logo, a background image, and a favicon. You can also define a primary and secondary color palette. You can also change the labels and text for various elements in the widget, such as headings, labels, and links. This includes customizing the **Username** field to specify what identifiers users can use, or adding a custom Help link.

The standard sign-in form also allows you to customize the sign-in experience for each app or website. For example, if you have multiple brands with distinct websites and domain names under a parent company or you need a different sign-in experience for various apps, you can use distinct branding for each. See [Branding](https://help.okta.com/oie/en-us/content/topics/settings/branding.htm).

#### Advanced
If you've configured a custom domain and need more control over the widget's appearance, use the built-in code editor. You can make more advanced changes to the HTML, CSS, and JavaScript of the sign-in page. For the third-generation widget, you can use design tokens to customize elements like colors, fonts, borders, and spacing, ensuring consistency with your brand's style guide. See [Style the Sign-In Widget (third generation)](https://developer.okta.com/docs/guides/custom-widget-gen3/main/) or [Style for redirect authentication (second generation)](https://developer.okta.com/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget).


### Self-hosted Sign-In Widget

Embed the widget into your own code base to host the authentication client on your servers. Use this approach if you need the highest level of customization and modifications to the open-source code to fit your requirements. Since the authentication client is hosted on your servers, security is a shared responsibility and you must update the widget packages. You can specify the version of the Sign-in Widget to use, either by referencing it from a CDN or installing it locally through npm. This helps to manage updates and ensure stability.

When you initialize the widget in your code, you pass a configuration object. This allows you to specify various options:

* `logoText` and `brandName`: These options display your brand's name and logo.

* `helpSupportNumber`: This option displays a support number for password reset and account unlock flows.

* `i18n` (internationalization): This option overrides default text strings and labels for different languages.

See [Embedded Okta Sign-In Widget fundamentals](https://developer.okta.com/docs/guides/embedded-siw/main/).


## Next steps

[Sign users in to your web app using the redirect model](https://developer.okta.com/docs/guides/sign-into-web-app-redirect/asp-net-core-3/main/)
