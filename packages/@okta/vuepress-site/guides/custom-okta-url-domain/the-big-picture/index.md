---
title: The Big Picture
---
You can customize your Okta organization by replacing the Okta domain name with your own domain name. This allows you to create a seamless and white-labeled experience for your users so that all URLs look like your application.

Okta organizations host pages on subdomains such as `example.okta.com`. Using this feature aliases your Okta organization's domain name to another subdomain that you own, like `login.example.com`. 

For example, you use Okta as a user store for your apps, but you don't want your users to know that the app uses Okta behind the scenes. You can alias [CNAME](https://www.web24.com.au/tutorials/cname-records-used) your domain to an Okta domain, allowing you to alias `login.example.com` to the domain of `example.okta.com`.

> Note: You must first customize the Okta URL domain if you also want to [customize the hosted sign-in page](https://help.okta.com/en/prod/Content/Topics/Settings/custom-okta-hosted-sign-in-page.htm) or [error pages](https://help.okta.com/en/prod/Content/Topics/Settings/custom-error-pages.htm).

Okta serves pages on your custom domain over HTTPS. To set up this feature, you need to provide a TLS certificate that is valid for your domain.

### Caveats
* Okta currently only supports TLS certificates with a 2048-bit key length. However, Okta does support any size for certificates used in the certificate chain.
* The Okta browser plugin doesn't work when customizing the Okta URL domain.

### Common Questions
**Can I add more than one domain?**
No. You can only have one custom domain set up per Okta organization.

**Will the existing Okta domain work?**
Yes. When you turn the custom domain on, the Okta domain (for example, example.okta.com) still works.
