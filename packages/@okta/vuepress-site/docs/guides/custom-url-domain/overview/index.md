---
title: Before you begin
---

You can customize your Okta organization by replacing the Okta domain name with your own domain name. This allows you to create a seamless and branded experience for your users so that all URLs look like your application.

Okta organizations host pages on subdomains such as `example.okta.com`. Using this feature aliases your Okta organization's domain name to another subdomain that you own, like `login.example.com`.

For example, you use Okta as a user store for your apps, but you don't want your users to know that the app uses Okta behind the scenes. You can create a [CNAME record](https://en.wikipedia.org/wiki/CNAME_record) for the Okta domain, allowing you to alias `login.example.com` to `example.okta.com`.

> **Note:** You must first customize the Okta URL domain if you also want to customize the Okta-hosted [sign-in page](/docs/guides/style-the-widget/style-okta-hosted/) or [error pages](/docs/guides/custom-error-pages/).

Okta serves pages on your custom domain over HTTPS. To set up this feature, you need to provide a TLS certificate that is valid for your domain.

### Caveats

* Your custom domain must be a [subdomain](https://en.wikipedia.org/wiki/Subdomain).

* Okta currently only supports 2048-bit keys for the private key that you upload. However, your certificate chain can use keys of any size.

* If your organization has configured any SAML or WS-Fed integrated applications, review the SAML or WS-Fed SSO set-up instructions. If you want your customers to see the new custom domain rather than the Okta org domain, update those SAML or WS-Fed Service Provider integrations to use the new custom URL in the metadata.

* When you implement a custom URL domain, users aren't automatically rerouted from the original URL to the new custom URL. You must communicate the new custom URL domain to your users. One way to communicate the change, for example, is to [create a custom notification](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Dashboard_End_User_Notifications) that appears on each user's dashboard.

* When an Admin signs in to the custom URL domain and then accesses the Admin Console from their user dashboard, the org URL changes from the custom URL to the Okta domain.

* If you disable a custom domain, the `issuerMode` for Identity Providers, Authorization Servers, and OpenID Connect apps is set back to `ORG_URL`.

### Quick configuration with Cloudflare

Want to quickly set up a custom domain? You can use the abbreviated steps on the <GuideLink link="../cloudflare">Create a custom domain with Cloudflare</GuideLink> page.

### Common questions

**Q: Can I add more than one domain?**

No. You can only have one custom domain set up per Okta organization.

**Q: Will the existing Okta domain work?**

Yes. When you turn the custom domain on, the Okta domain (for example, `example.okta.com`) still works.

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
