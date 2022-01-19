---
title: Okta Hosted Vs. Customer Hosted
---

## Okta hosted vs. customer hosted

Okta offers multiple integration options for designing an authentication experience. The two most recommended options are integrating the Okta-hosted Sign-In Widget and the customer-hosted Sign-In Widget. Both of these Okta-built experiences provide easy implementation and maintenance, industry best practice, user self service, and built-in user registration. You can customize the Okta URL domain and the Okta-hosted or customer-hosted Sign-In Widget style. See [Customize the Okta URL domain](/docs/guides/custom-url-domain/) and [Style the Sign-In Widget](/docs/guides/custom-widget/).

The difference between the two concepts is where the Sign-In Widget itself is hosted. See [Okta-hosted widget](/docs/concepts/hosted-vs-embedded/#okta-hosted-widget) and [Customer-hosted widget](/docs/concepts/hosted-vs-embedded/#customer-hosted-widget) for diagrams on where the Sign-In Widget is hosted.

Another difference between the two options is the method of communication. When you're using the Okta-hosted Sign-In Widget, you're communicating with Okta using OAuth 2.0 and OIDC. When you're using the customer-hosted Sign-In Widget, you're using the Okta JavaScript SDK and communication with Okta is handled for you transparently.

## Configure policies for app sign-in experiences

For both Okta-hosted and customer-hosted sign-in experiences, you can configure policies in the Okta Admin Console to determine the behavior of the app.

1. Go to **Security** > **API**.
1. In the **Authorization Servers** tab, select an authorization server and click the edit icon beside it.
1. On the authorization server page, select the **Access Policies** tab and scroll down to the Rules list.
1. Click the edit icon beside the Rule you want to modify. The Edit Rule window appears where you can update the settings for the access policies.

## Okta-hosted widget

The Okta-hosted Sign-In Widget is considered the easiest and most secure means of integration. This is because the Sign-In Widget itself is hosted by Okta, maintained by Okta, and kept secure by Okta. The Okta-hosted Sign-In Widget is recommended for most integrations. The OpenID Connect authorization code flow is used to redirect users to Okta, where the user authenticates and is redirected back to a pre-configured redirect URI for the application. This design is considered a security best practice.

![Okta-hosted widget](/img/OktaHosted.png "Displays the integration for an Okta-hosted Sign-In Widget")

You can use a [custom domain](/docs/concepts/hosted-vs-embedded/#custom-domains) so that your users don't see `okta.com` in the URL. The look and feel of the sign-in experience, as well as the enabled features, are all configured within the Okta Admin Console. HTML customization of the page is accessible in the Admin Console, which provides a moderate level of customization to the experience itself.

### Example of building an Okta-hosted sign-in experience

munchBOX, a new snack delivery business that provides a direct-to-consumer service, wants to create a customer-facing app with an easy registration and sign-in experience. The developer chooses an Okta-hosted sign-in experience over a Customer-hosted one, where the developer builds an OAuth client instead of using JavaScript. The Okta Sign-In Widget handles all the core flows around signing in so the developer doesn't have to build registration, sign-in, and email validation flows for munchBOX customers. When customers sign in, they are redirected to the Sign-In page. After successfully signing in, they are redirected back to the munchBOX app.

## Customer-hosted widget

The Customer-hosted Sign-In Widget is considered the best balance of flexibility and effort to integrate. The Customer-hosted Sign-In Widget is only recommended if an integration requires a deeper level of customization or an Okta-hosted experience isn't possible. The Customer-hosted Sign-In Widget works by embedding the open source [Okta Sign-In Widget](https://github.com/okta/okta-signin-widget) into the application's web page. The Sign-In Widget is built and updated by Okta, uses industry best practice security design, and is added to a page with a few lines of HTML/JavaScript. It can be loaded directly from the CDN, NPM, or built from source.

![Customer-hosted widget](/img/CustomerHosted.png "Displays the integration for a customer-hosted Sign-In Widget")

The look and feel is customized directly through HTML/CSS/SASS and JavaScript. Features are configured within the Okta Admin Console and enabled through JavaScript.

## Custom domains

You can [customize your Okta organization](/docs/guides/custom-url-domain/) by replacing the Okta domain name with your own domain name. This allows you to create a seamless branded experience for your users so that all URLs look like your application.

Okta organizations host pages on subdomains such as `example.okta.com`. Using this feature aliases your Okta organization's domain name to another subdomain that you own, such as `login.example.com`.

## Most should use Okta-hosted

* Easy to use with no maintenance and no updates.
* Hosted and secured by Okta.
* [XSS](https://developer.okta.com/books/api-security/sanitizing/common-attacks/#xss-cross-site-scripting) (cross-site scripting) attacks on your application will not affect the sign-in experience.
* Easy to integrate manually or with a generic OpenID Connect client.
* Extremely customizable through HTML, CSS, and JavaScript.
* Complex logic changes that require source code access are limited.
* The user is redirected out of the application, to Okta, and then back to the application.

## What about customer-hosted

* Moderate maintenance may be required. If using a CDN, maintenance is more limited as it is being kept up-to-date by Okta. NPM packages a specific version of the widget, which means that it may need to be updated in the project periodically. Customized or local versions of the Sign-In Widget source code would require regular updating.
* A great level of source code customization control while being drastically easier, and more secure, than building from scratch.
* Slightly increased risk in security due to Okta not being able to guarantee that the Sign-In Widget has been implemented correctly. Specifically, the application code may have the ability to access the credentials that the user has entered into the Sign-In Widget, which need to be kept secure.
* XSS (cross-site scripting) attacks on your application may result in stolen sign-in credentials.
* Higher level of effort to integrate and maintain compared to the Okta-hosted Sign-In Widget.
* Keeps the user in the application, reducing redirects to and from Okta.

## Learn More

Continue reading about the Okta-hosted Sign-In Widget in the [Sign Users In](/docs/guides/sign-into-spa/angular/main) guide.

Continue reading about the customer hosted experience in the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) guide.
