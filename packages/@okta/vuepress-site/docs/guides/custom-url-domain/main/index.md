---
title: Customize the Okta URL domain
excerpt: Learn how to add a custom domain name to your Okta organization.
layout: Guides
---

This guide teaches you how to customize the Okta URL domain, meaning that Okta-hosted pages are served with your own branded URL&mdash;an important step towards creating a seamless experience for your users.

---

**Learning outcomes**

Customize the Okta URL domain.

**What you need**

* A domain that you own, for example, `example.com`
* A subdomain that you want to use, for example, `login.example.com`
* A valid TLS certificate (PEM-encoded) for your subdomain
* A 2048-bit private key (PEM-encoded)

---

## Overview

You can customize your Okta organization by replacing the Okta domain name with your own domain name. Your customized domain name allows you to create a seamless branded experience for your users so that all URLs look like your app.

For example, you use Okta as a user store for your apps, but you don't want your users to know that the app uses Okta behind the scenes. Okta orgs host pages on subdomains such as `example.okta.com`. You can create a [CNAME record](https://en.wikipedia.org/wiki/CNAME_record) for the Okta domain, allowing you to alias it to another subdomain that you own, like `login.example.com`.

> **Note:** You must first customize the Okta URL domain if you also want to customize the Okta-hosted [sign-in page](/docs/guides/style-the-widget/style-okta-hosted/) or [error pages](/docs/guides/custom-error-pages/).

Okta serves pages on your custom domain over HTTPS. To set up this feature, you need to provide a TLS certificate that is valid for your domain. See [Validate your TLS certificate](#validate-your-tls-certificate).

### Caveats

* Most custom domains are configured using one of your [subdomains](https://en.wikipedia.org/wiki/Subdomain). However, there are no restrictions on using any other domain such as your root domain, if that fits your use case for your sign-in page taking over your main website.

* Okta currently only supports 2048-bit keys for the private key that you upload. However, your certificate chain can use keys of any size.

* If your org has configured any SAML or WS-Fed integrated apps, review the setup instructions for [SAML SSO](/docs/guides/build-sso-integration/saml2/overview/) or [WS-Fed SSO](https://help.okta.com/okta_help.htm?id=ext_Apps_Configuring_WS_Federation). If you want your customers to see the new custom domain rather than the Okta org domain, update those SAML or WS-Fed Service Provider integrations to use the new custom URL in the metadata.

* If you sign a user in with your new custom URL and they try to SSO into previous OIDC integrations made with the org URL, your user is prompted to sign in again. In order to avoid this, you need to change the issuer in these integrations to your custom URL in both the Okta dashboard and your codebase.

* When you implement a custom URL domain, users aren't automatically rerouted from the original URL to the new custom URL. You must communicate the new custom URL domain to your users. One way to communicate the change, for example, is to [create a custom notification](https://help.okta.com/okta_help.htm?id=ext_Dashboard_End_User_Notifications) that appears on each user's dashboard.

* When an Admin signs in to the custom URL domain and then accesses the Admin Console from their user dashboard, the org URL changes from the custom URL to the Okta domain.

* If you disable a custom domain, the `issuerMode` for Identity Providers, Authorization Servers, and OpenID Connect apps is set back to `ORG_URL`.

### Optional configuration with Cloudflare

Want to quickly set up a custom domain? See [Create a custom domain within Cloudflare](#optional-create-a-custom-domain-within-cloudflare).

### Common questions

**Q: Can I add more than one domain?**

No. You can only set up one custom domain per Okta org.

**Q: Does the existing Okta domain work?**

Yes. When you turn the custom domain on, the Okta domain (for example, `example.okta.com`) still works.

## Validate your TLS certificate

Before starting, make sure that you have the TLS certificate (PEM-encoded) for your subdomain and the 2048-bit private key (PEM-encoded).

Okta performs validation checks on the certificate that you upload. If your TLS certificate is a wildcard certificate, it must include the full URL in the Common Name (CN) or Subject Alternative Name (SAN) when it is generated. Otherwise, the following error occurs when you attempt to upload the certificate:

`The specified certificate does not match your Custom URL Domain.`

If you receive the previous error, consult with the person in your organization responsible for generating certificates to determine whether your TLS certificate is a wildcard certificate.

## Enable the custom domain

Use the configuration wizard to walk through the steps to customize your Okta URL domain.

1. In the Admin Console, select **Settings**, and then **Customization**.
2. In the **Custom URL Domain** box, click **Edit**.
3. Click **Get Started** to start the configuration wizard.
    * The **Continue** button appears if the configuration is incomplete.
    * The **Update Certification** button appears if a custom URL domain is already configured for your org. To delete the current configuration, click **Restore to default**.

### Add your subdomain information

On the Domain page of the configuration wizard, enter your subdomain name, for example, `login.example.com`, and then click **Next**. Verifying domain ownership is the next step in the configuration wizard.

### Create a DNS TXT record

You need to add a DNS TXT record to your domain to verify ownership of your domain with Okta before Okta can serve traffic over it. This record includes the Okta-generated values provided in the **Host** and **Data** columns of the table on the **Verify domain ownership page**. Okta verifies that you own your domain when it finds the TXT record that contains the generated value.

1. On the **DNS Records** page of the configuration wizard, copy the values of the **Host** and **Data** columns into a text file.

2. Sign in to your Domain Name registrar and locate the option to modify your DNS records.

3. Add a TXT record and paste the value that you copied from the **Host** column into the appropriate field, for example, the **Name** or **Host** field.

> **Note**: Depending on your domain provider, you may only need to enter `_oktaverification` rather than `_oktaverification.login.example.com`. If your domain provider doesn't support the value that you enter, verification fails and your custom URL domain configuration is incomplete.
>
> You can perform a DNS lookup of your `_oktaverification` DNS record to verify that it's correctly configured. For example, you might use Google's [Dig](https://toolbox.googleapps.com/apps/dig/) tool to check your `_oktaverification.login.example.com` DNS record.

4. Paste the value that you copied from the **Data** column into the appropriate field, for example, the **Record** or **Value** field.

5. Wait for the DNS record to propagate (typically one to five minutes, but it may take longer), and then return to Okta and click **Verify** to prove to Okta that you have rights to use the domain name.

> **Note:** It may take up to 24 hours for your DNS changes to propagate. If your changes don't appear within 24 hours, return to this step and confirm your settings. Use a tool like [Dig](https://toolbox.googleapps.com/apps/dig/) to check your DNS records.

6. If **Verified** appears, click **Next**. If an error occurs, possible issues may be that the TXT record may not have propagated yet or there may be a copy and paste issue with the values.

    Uploading your TLS certificate is the next step in the configuration wizard.

### Add the certificate details

Okta serves traffic over HTTPS (TLS) on your custom domain. Use this section to enter your TLS certificate, private key, and, if applicable, a certificate chain.

1. On the **Certification** page of the configuration wizard, paste your PEM-encoded public certificate for your subdomain in the **Certificate** field. Be sure to include the `----BEGIN CERTIFICATE----` and the `----END CERTIFICATE----` lines.
2. Paste your PEM-encoded private key for your subdomain in the **Private Key** field. Be sure to include the `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----` lines.
3. We recommend that you enter a PEM-encoded certificate chain (if you have one) in the **Certificate Chain** field. Certificate chain files can contain keys that are up to 4096 bits. The order in which the root and intermediary certificates appear in the file matters. The intermediate CA certificate should be at the top and then the root CA certificate at the bottom.

    > **Note:** Android devices require a certificate chain. You must provide a certificate chain if you want your custom domain to work with apps on Android. For a list of trusted root certificates on Android, see the [Official List of Trusted Root Certificates on Android](https://www.digicert.com/blog/official-list-trusted-root-certificates-android/).

4. Click **Next**. Making your custom domain an alias for your Okta domain is the next step in the configuration wizard.

### Create a CNAME record for your subdomain

Before Okta can serve traffic over your domain, you need to add an alias from your custom domain to the Okta subdomain of your Okta organization. You do this by creating or modifying a CNAME record for your custom domain name.

1. Return to your Domain Name registrar and locate the option to modify your DNS records.
2. Create a new CNAME record and paste the value from the **Host** column in the **Create a DNS TXT record** section into the appropriate field at the registrar, for example, the **Name** or **Host** field.

    Often a registrar creates an A record automatically when you create a subdomain. Make sure that the CNAME record and the A record don't have the same name.

    > **Note:** Depending on your registrar, you may only need to enter the subdomain part. For example, if you picked the subdomain `id.example.com`, your registrar may only require you to create a CNAME record for `id` (because `.example.com` is implied). If you're not sure, check your registrar's documentation.

3. Paste the value from the **Data** column that you copied in the **Create a DNS TXT record** section into the appropriate field at the registrar, for example, the **Record** or **Value** field.
4. Save the record.

After the CNAME record is saved and confirmed by your registrar, you are done setting up a custom domain name for your Okta organization. Okta begins to serve traffic over your custom domain. It may take a few minutes to propagate the changes.

### Confirm that your custom URL works

Use the link that appears in the **Confirmation** section of the CNAME step to confirm that Okta is serving traffic over HTTPS (TLS) for your custom domain.

1. Click the link, for example, `https://login.example.com`. The Okta Sign-In page should appear.
2. Back at the CNAME step, click **Finish**.

It may take up to 48 hours for these changes to propagate. Warning notices may appear on your custom URL domain until propagation is finished. If your changes don't appear within 48 hours, return to the configuration wizard and confirm your settings.

You can also use a tool such as `dig` or `nslookup` to test and verify that your DNS is a properly configured domain.

1. In the terminal, use the following command: `dig login.mycompany.com` or `nslookup login.mycompany.com`.

2. Verify that the configured domain, for example, `org.Subdomain.customdomains.oktapreview.com` appears in the answer section of the output.

> **Note:** There are also external tool versions of [dig](https://toolbox.googleapps.com/apps/dig) and [nslookup](https://network-tools.com/nslookup/) that you can use to validate that your custom domain is configured correctly.

### Flush the DNS cache

After you've changed your DNS records, old records may still be cached by DNS providers or your local machine. If you've verified that your records are correct, but your custom domain isn't working, you can flush the DNS cache.

There are websites available for flushing the caches for [Google DNS](https://google-public-dns.appspot.com/cache) and [Open DNS](https://cachecheck.opendns.com/).

## Update other Okta settings

After you add your custom URL, some features or APIs require additional configuration to reflect that change.

### Authorization Server issuer

After you customize your Okta domain URL, existing [Custom Authorization Servers](/docs/concepts/auth-servers/) continue to use the Okta organization URL until you change it. All new Custom Authorization Servers use the custom URL by default.

You need to update existing Custom Authorization Servers to return the custom domain as the `issuer` value:

1. In the Admin Console, go to **Security** > **API**.
1. On the **Authorization Servers** tab, select the Custom Authorization Server that you want to update.
1. Click **Edit** on the Custom Authorization Server that you selected.
1. From the **Issuer** drop-down box, select the custom URL and click **Save**.

Additionally, you may want to change the issuer for your OpenID Connect apps that are using the org authorization server.

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click the OpenID Connect app that you want to update.
1. Select the **Sign On** tab, scroll to the **OpenID Connect ID Token** section, and then click **Edit**.
1. From the **Issuer** drop-down box, select the custom URL and click **Save**.

### Update app endpoints

If you have apps that use Okta endpoints with the uncustomized URL domain, update them to use the custom URL domain.

## Optional: Create a custom domain within Cloudflare

If you need to set up a custom domain, you can use Cloudflare.

### Transfer your domain and create a certificate

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

### Configure a custom domain for your Authorization Server

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

## Next steps

The following customization options require a custom URL domain:

* [Style the Widget](/docs/guides/style-the-widget/style-okta-hosted/)
* [Customize the Okta-hosted error pages](/docs/guides/custom-error-pages/)

The following customization options don't require a custom URL domain:

* [Customize SMS messages](/docs/guides/custom-sms-messaging/)
* [Customize email notifications and email domains](/docs/guides/custom-email/)
* [Customize themes](/docs/guides/customize-themes)