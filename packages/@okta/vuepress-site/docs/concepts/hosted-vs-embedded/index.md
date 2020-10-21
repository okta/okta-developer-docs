---
title: Hosted Vs. Embedded
---

# Hosted Vs. Embedded

Okta offers multiple integration options when designing an authentication experience. The two most recommended concepts are the Okta hosted experience and the embedded widget experience. Both of these Okta built experiences provide easy implementation and maintenance, industry best practice, user self service, and built in user registration. The difference between the two concepts is where the experience itself is hosted.

## Hosted Experience

The Okta hosted authentication experience is considered the easiest and most secure means of integration. This is because the experience itself is hosted by Okta, maintained by Okta, and kept secure by Okta. The hosted experience is recommended for most integrations. OpenID Connect Redirect Flow is used to redirect users to Okta, where the user authenticates and is redirected back to a specified, whitelisted, redirect URI. This design is considered security best practice. The look and feel, as well as the enabled features, are all configured within the Okta Admin UI. HTML customization of the page is accessible in the Admin UI which provides a moderate level of customization to the experience itself.

### Advantages of Hosted

* Easy to maintain with no maintenance and no updates.
* Hosted and secured by Okta.
* No [XSS](https://developer.okta.com/books/api-security/sanitizing/common-attacks/#xss-cross-site-scripting), cross site scripting, attacks.
* Easy to integrate.
* Extremely customizable via HTML, CSS, and JavaScript

### What to Consider With Hosted

* Complex logic changes that require source code access are limited.
* The user is redirected out of the application, to Okta, and then back.

### Learn More About Hosted

Continue reading about the Okta hosted authentication experience in the [Okta Hosted Flows](/docs/concepts/okta-hosted-flows/) guide.

## Embedded Experience

The Okta embedded authentication experience is considered the best balance of customization options and effort to integrate. The embedded experience is recommended if an integration requires a deeper level of customization or a hosted experience is not possible. The embedded experience works by providing an open source [JavaScript widget](https://github.com/okta/okta-signin-widget) to embed into the page. The widget is built and updated by Okta, uses industry best practice security design, and is added to a page with a few lines of HTML/JavaScript. The widget itself can be loaded directly from the CDN, NPM, or built from source. The look and feel is customized directly via HTML/CSS/SASS and JavaScript. Features are configured within the Okta Admin UI and enabled in the widget via JavaScript.

### Advantages of Embedded

* Little to moderate maintenance. If using CDN, maintenance is more limited as it is being kept up to date by Okta. NPM will package a specific version of the widget which means it may need to be updated in the project periodically. Customized or local versions of the widget source code would require regular updating.
* Still considered very secure if implemented using recommended best practice.
* A great level of source code customization control while being drastically easier, and more secure, than building from scratch.
* Keeps the user in the application, reducing redirects to and from Okta.

### What to Consider With Embedded

* Slightly increased risk in security due to Okta not being able to guarantee that the widget has been implemented correctly. Specifically, the application code may have the ability to access the credentials that the user has entered into the widget, which need to be kept secure. This is not a risk if implemented correctly.
* Potentially susceptible to XSS, cross site scripting, attacks.
* Higher level of effort to integrate and maintain compared to the hosted experience.

### Learn More About Embedded

Continue reading about the embedded widget authentication experience in the [Okta Embedded Flows](/docs/concepts/okta-embedded-flows/) guide.
