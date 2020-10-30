---
title: Okta Hosted Vs. Customer Hosted
---

## Okta Hosted Vs. Customer Hosted

Okta offers multiple integration options when designing an authentication experience. The two most recommended concepts are using the Okta-hosted widget and the Customer-hosted widget. Both of these Okta-built experiences provide easy implementation and maintenance, industry best practice, user self service, and built-in user registration. The difference between the two concepts is where the widget itself is hosted.

## Okta-hosted widget

The Okta-hosted widget is considered the easiest and most secure means of integration. This is because the widget itself is hosted by Okta, maintained by Okta, and kept secure by Okta. The Okta-hosted widget is recommended for most integrations. The OpenID Connect redirect flow is used to redirect users to Okta, where the user authenticates and is redirected back to a specified, allow listed, redirect URI. This design is considered security best practice. The look and feel, as well as the enabled features, are all configured within the Okta Admin Console. HTML customization of the page is accessible in the Admin Console, which provides a moderate level of customization to the experience itself.

## Customer-hosted widget

The Customer-hosted widget is considered the best balance of flexibility and effort to integrate. The Customer-hosted widget is recommended if an integration requires a deeper level of customization or a Okta-hosted experience isn't possible. The Customer-hosted widget works by providing an open source [JavaScript widget](https://github.com/okta/okta-signin-widget) to embed into the page. The widget is built and updated by Okta, uses industry best practice security design, and is added to a page with a few lines of HTML/JavaScript. The widget itself can be loaded directly from the CDN, NPM, or built from source. The look and feel is customized directly through HTML/CSS/SASS and JavaScript. Features are configured within the Okta Admin Console and enabled in the widget through JavaScript.

## Most should use Okta-hosted

* Easy to maintain with no maintenance and no updates.
* Hosted and secured by Okta.
* No [XSS](https://developer.okta.com/books/api-security/sanitizing/common-attacks/#xss-cross-site-scripting) (cross-site scripting) attacks.
* Easy to integrate.
* Extremely customizable through HTML, CSS, and JavaScript
* Complex logic changes that require source code access are limited.
* The user is redirected out of the application, to Okta, and then back.

## What About Customer Hosted

* Moderate maintenance may be required. If using CDN, maintenance is more limited as it is being kept up to date by Okta. NPM will package a specific version of the widget which means it may need to be updated in the project periodically. Customized or local versions of the widget source code would require regular updating.
* Still considered very secure if implemented using recommended best practice.
* A great level of source code customization control while being drastically easier, and more secure, than building from scratch.
* Slightly increased risk in security due to Okta not being able to guarantee that the widget has been implemented correctly. Specifically, the application code may have the ability to access the credentials that the user has entered into the widget, which need to be kept secure. This is not a risk if implemented correctly.
* Potentially susceptible to XSS (cross-site scripting) attacks.
* Higher level of effort to integrate and maintain compared to the Okta-hosted widget.
* Keeps the user in the application, reducing redirects to and from Okta.

## Learn More

Continue reading about the Okta hosted widget in the [Sign Users In](/docs/guides/sign-into-spa/angular/before-you-begin/) guide.

Continue reading about the customer hosted experience in the [Okta Sign-In Widget](/docs/concepts/okta-embedded-flows/) guide.
