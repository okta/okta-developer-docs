---
title: Customize the Okta URL domain
excerpt: Learn how to add a custom domain name to your Okta organization.
layout: Guides
---

This guide teaches you how to customize the Okta URL domain which allows you to create a seamless branded experience for your users.

---

**Learning outcomes**

Customize the Okta URL domain.

**What you need**

* A domain that you own, for example, `example.com`
* A subdomain that you want to use, for example, `login.example.com`
* A valid TLS certificate (PEM-encoded) for your subdomain
* A 2048-bit private key (PEM-encoded)

**Sample code**



---

## Overview

You can customize your Okta organization by replacing the Okta domain name with your own domain name. This allows you to create a seamless branded experience for your users so that all URLs look like your application.

Okta orgs host pages on subdomains such as `example.okta.com`. Using the custom URL domain feature aliases your Okta organization's domain name to another subdomain that you own, like `login.example.com`.

For example, you use Okta as a user store for your apps, but you don't want your users to know that the app uses Okta behind the scenes. You can create a [CNAME record](https://en.wikipedia.org/wiki/CNAME_record) for the Okta domain, allowing you to alias `login.example.com` to `example.okta.com`.

> **Note:** You must first customize the Okta URL domain if you also want to customize the Okta-hosted [sign-in page](/docs/guides/style-the-widget/style-okta-hosted/) or [error pages](/docs/guides/custom-error-pages/).

Okta serves pages on your custom domain over HTTPS. To set up this feature, you need to provide a TLS certificate that is valid for your domain.

### Caveats

* Most custom domains are configured using one of your [subdomains](https://en.wikipedia.org/wiki/Subdomain). However, there are no restrictions on using any other domain such as your root domain, if that fits your use case for your sign-in page taking over your main website.

* Okta currently only supports 2048-bit keys for the private key that you upload. However, your certificate chain can use keys of any size.

* If your org has configured any SAML or WS-Fed integrated applications, review the SAML or WS-Fed SSO set-up instructions. If you want your customers to see the new custom domain rather than the Okta org domain, update those SAML or WS-Fed Service Provider integrations to use the new custom URL in the metadata.

* If you sign a user in with your new custom URL and they try to SSO into previous OIDC integrations made with the org URL, they will be prompted to sign in again. In order to avoid this, you would need to change the issuer in these integrations to your custom URL. Both in the Okta dashboard and in your codebase.

* When you implement a custom URL domain, users aren't automatically rerouted from the original URL to the new custom URL. You must communicate the new custom URL domain to your users. One way to communicate the change, for example, is to [create a custom notification](https://help.okta.com/okta_help.htm?id=ext_Dashboard_End_User_Notifications) that appears on each user's dashboard.

* When an Admin signs in to the custom URL domain and then accesses the Admin Console from their user dashboard, the org URL changes from the custom URL to the Okta domain.

* If you disable a custom domain, the `issuerMode` for Identity Providers, Authorization Servers, and OpenID Connect apps is set back to `ORG_URL`.

### Quick configuration with Cloudflare

Want to quickly set up a custom domain? You can use the abbreviated steps on the <GuideLink link="../cloudflare">Create a custom domain with Cloudflare</GuideLink> page.

### Common questions

**Q: Can I add more than one domain?**

No. You can only have one custom domain set up per Okta org.

**Q: Will the existing Okta domain work?**

Yes. When you turn the custom domain on, the Okta domain (for example, `example.okta.com`) still works.


## Set up a custom domain with Cloudflare

Use Cloudflare to quickly set up a custom domain.

## Transfer your domain and create a certificate

> **Note:** [Sign up for Cloudflare](https://dash.cloudflare.com/sign-up) if you don't have an account.

Sign in to Cloudflare and select **+Add Site**. It's best if you point an entire domain at Cloudflare. For example, `example.com`. The free plan is good enough for these steps.

After transferring your domain, you need to create an origin CA certificate:

1. Select the **SSL/TLS** app, and then click **Origin Server**.
2. Click **Create Certificate** to open the **Origin Certificate Installation** dialog box.
3. Select **Let Cloudflare generate a private key and a CSR**.
4. Change **Certificate Validity** to **1 year** (Okta rejects certificates with a 15-year expiration), and then click **Next**.
5. Copy the **Origin Certificate** to a `tls.cert` file on your hard drive, and then copy the **Private key** to `private.key`.
6. In Okta, go to **Customization** > **Domain Name** > **Edit** > **Get Started**.
7. Enter a subdomain name (for example: `id.example.com`) and click **Next**. You are prompted to verify domain ownership.
8. In Cloudflare, add the specified `TXT` record using the **DNS** > **+ Add record** option.
9. In Okta, select **Verify** > **Next**.
10. In the **Certificate** box, copy/paste the contents of `tls.cert`.

    > **Note:** On a Mac you can use `cat tls.cert | pbcopy` in a terminal to copy the file to your clipboard.

11. Paste the contents of `private.key` in the **Private key** box. Click **Next**.
12. You are prompted to add a [CNAME record](https://en.wikipedia.org/wiki/CNAME_record). Add this to your Cloudflare DNS, and then click **Finish**.
13. Wait until `https://<id.domain.name>` resolves in your browser before you continue.

> **Note:** When you first try this, it's possible that your network caches DNS entries, and you won't be able to get to `id.example.com`. As a workaround, you can tether with your phone, then graph the IP address and add it as an entry to your `hosts`.

## Configure a custom domain for your Authorization Server

The OpenID Connect specification requires a `./well-known/openid-configuration` endpoint with metadata about your app's endpoints. You should be able to see yours at:

```
https://<id.domain.name>/oauth2/default/.well-known/openid-configuration
```

You might notice that it has your Okta `dev-*` domain, rather than your custom domain name.

You need to update your Authorization Server to use your custom domain to fix this:

1. Sign in to your Okta account and go to **API** > **Authorization Servers**.
2. Select the  **default** Custom Authorization Server, and then click **Edit**.
3. Change the **Issuer** to use **Custom URL**.
4. Try `./well-known/openid-configuration` again. It should now display your custom domain.