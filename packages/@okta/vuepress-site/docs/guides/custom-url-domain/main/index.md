---
title: Customize the Okta URL and email notification domains
excerpt: Learn how to add a custom domain name to your Okta organization and configure a custom email notification domain.
layout: Guides
---

This guide explains how to customize your Okta org with your URL domain name and how to configure a custom email domain so that you can present a branded experience to your end users.

---

**Learning outcomes**

* Customize the Okta URL domain.
* Configure a custom email notification domain.

**What you need**

For customizing your Okta URL domain:

* A domain that you own, for example, `example.com`
* A subdomain that you want to use, for example, `login.example.com`
* A valid TLS certificate (PEM-encoded) for your subdomain
* A 2048-bit private key (PEM-encoded)

For configuring a custom email notification domain:

* Access to the DNS records of your public custom domain
* An implementation of the [Sender Policy Framework (SPF)](https://tools.ietf.org/html/rfc7208) to prevent sender address forgery. If you already implemented SPF in your custom domain, ensure that you update the SPF record.

---

## About Okta URL domain customization

You can customize your Okta organization by replacing the Okta domain name with your own domain name. Your customized domain name allows you to create a seamless branded experience for your users so that all URLs look like your app.

For example, you use Okta as a user store for your apps, but you don't want your users to know that the app uses Okta behind the scenes. Okta orgs host pages on subdomains such as `example.okta.com`. You can create a [CNAME record](https://datatracker.ietf.org/doc/html/rfc1035#section-3.2.2) for the Okta domain, allowing you to alias it to another subdomain that you own, like `login.example.com`.

> **Note:** You must first customize the Okta URL domain if you also want to customize the Okta-hosted [sign-in page](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget) or [error pages](/docs/guides/custom-error-pages/).

Okta serves pages on your custom domain over HTTPS. To set up this feature, you need to provide a TLS certificate that is valid for your domain. See [Validate your TLS certificate](#validate-your-tls-certificate).

You can also [configure a custom email notification domain](#about-custom-email-domain-configuration) to present a branded experience to your end users.

### Caveats

* You must provide a subdomain for customizing the Okta URL domain. Okta doesn't support the use of a root domain name.

* Any DNS Text (`TXT`) and `CNAME` record names and values included in your domain configuration must be resolvable and contain the values provided by Okta. You can validate these names and values with a DNS query tool, such as [dig](https://bind.isc.org/doc/arm/9.11/man.dig.html).

* Okta currently only supports 2048-bit keys for the private key that you upload. However, your certificate chain can use keys of any size.

* If your org has configured any SAML or WS-Fed integrated apps, review the setup instructions for [SAML SSO](/docs/guides/build-sso-integration/saml2/main/) or [WS-Fed SSO](https://help.okta.com/okta_help.htm?id=ext_Apps_Configuring_WS_Federation). If you want your customers to see the new custom domain rather than the Okta org domain, update those SAML or WS-Fed Service Provider integrations to use the new custom URL in the metadata.

* If you sign a user in with your new custom URL and they try to SSO into previous OIDC integrations made with the org URL, your user is prompted to sign in again. In order to avoid this, you need to change the issuer in these integrations to your custom URL in both the Okta dashboard and your codebase.

* When you implement a custom URL domain, users aren't automatically rerouted from the original URL to the new custom URL. You must communicate the new custom URL domain to your users. One way to communicate the change is to [create a custom notification](https://help.okta.com/okta_help.htm?id=ext_Dashboard_End_User_Notifications) that appears on each user's dashboard.

* When an Admin signs in to the custom URL domain and then accesses the Admin Console from their user dashboard, the org URL changes from the custom URL to the Okta domain.

* If you disable a custom domain, the `issuerMode` for Identity Providers, Authorization Servers, and OpenID Connect apps is set back to `ORG_URL`.

### Common questions

**Q: Can I add more than one domain?**

No. You can only set up one custom domain per Okta org.

**Q: Does the existing Okta domain work?**

Yes. When you turn the custom domain on, the Okta domain (for example, `example.okta.com`) still works.

## Use an Okta-managed certificate

<ApiLifecycle access="ea" />

This method of configuring a custom domain is recommended because Okta manages your certificate renewals in perpetuity through an integration with Let's Encrypt, which is a free certificate authority. The certificate procurement process is free, and also faster and easier than configuring a custom domain with your own certificate.

1. In the Admin Console, go to **Customizations** > **Domain**.
2. In the **Custom URL Domain** box, click **Edit**.
3. Click **Get started** to start the configuration wizard.
4. On the **Add domain** page of the configuration wizard, in the **Certificate management** section, select **Okta-managed**.

### Add your subdomain information

On the Add Domain page of the configuration wizard, enter your subdomain name, for example, `login.example.com`, and then click **Next**. Verifying domain ownership is the next step in the configuration wizard.

### Update your DNS

You need to add DNS TXT and CNAME records for your domain to prove ownership of your domain with Okta before Okta can serve traffic over it. These records includes the values provided in the Host and Value columns of the table on the Update your DNS page. Okta verifies that you own your domain when it finds the records that contain the required values.

1. On the **Update your DNS** page of the configuration wizard, copy the values of the **Host** and **Value** columns into a text file.

2. Sign in to your Domain Name registrar and locate the option to modify your DNS records.

3. Add a TXT record and paste the value that you copied from the **Host** column into the appropriate field, for example, the **Name** or **Host** field.

> **Note**: Depending on your domain provider, you may only need to enter `_acme-challenge` rather than `_acme-challenge.login.example.com`. If your domain provider doesn't support the value that you enter, verification fails and your custom URL domain configuration is incomplete.
>
> You can perform a DNS lookup of your `_acme-challenge` DNS record to verify that it's correctly configured. For example, you might use Google's [Dig](https://toolbox.googleapps.com/apps/dig/) tool to check your `_acme-challenge.login.example.com` DNS record.

4. Paste the value that you copied from the **Value** column into the appropriate field, for example, the **Record** or **Value** field.

5. Repeat Steps 3 and 4 for the CNAME record.

6. Wait for the DNS record to propagate (typically one to five minutes, but it may take longer), and then return to Okta and click **Next** to prove to Okta that you have rights to use the domain name.

> **Note:** It may take up to 24 hours for your DNS changes to propagate. If your changes don't appear within 24 hours, return to this step and confirm your settings. Use a tool like [Dig](https://toolbox.googleapps.com/apps/dig/) to check your DNS records.

7. If **Certificate issued** appears, click **Finish**.

> **Note:** After you click **Finish**, it may take several minutes before your custom domain is ready.

> **Note:** If an error occurs, the cause may be one of the following:
>   * The TXT or CNAME record may not have propagated yet.
>   * There may be a copy and paste issue with the values.
>   * There may be an operational issue with Let's Encrypt which can be checked with [https://letsencrypt.status.io/](https://letsencrypt.status.io/). If you configure your DNS records and click **Next** to verify the records too quickly, Okta detects the DNS records, but Let's Encrypt hasn't detected them yet, which causes a failed authorization. A warning notification appears: `A new TXT value has been generated. Update your DNS record with the new TXT value, wait for it to propagate, and then return here to verify.` Okta generates a new TXT record for you to paste into your domain provider. Wait a few minutes, and then retry the **Next** button.

## Use your own certificate

### Validate your TLS certificate

Before starting, make sure that you have the TLS certificate (PEM-encoded) for your subdomain and the 2048-bit private key (PEM-encoded).

Okta performs validation checks on the certificate that you upload. If your TLS certificate is a wildcard certificate, it must include the full URL in the Common Name (CN) or Subject Alternative Name (SAN) when it is generated. Otherwise, the following error occurs when you attempt to upload the certificate:

`The specified certificate does not match your Custom URL Domain.`

If you receive the previous error, consult with the person in your organization responsible for generating certificates to determine whether your TLS certificate is a wildcard certificate.

### Use the configuration wizard

1. In the Admin Console, go to **Customizations** > **Domain**.
2. In the **Custom URL Domain** box, click **Edit**.
3. Click **Get started** to start the configuration wizard.
4. On the **Add domain** page of the configuration wizard, in the **Certificate management** section, select **Bring your own certificate**.
    * The **Next** button appears if the configuration is incomplete.
    * The **Update Certification** button appears if a custom URL domain is already configured for your org. To delete the current configuration, click **Restore to default**.

### Add your subdomain information

On the Domain page of the configuration wizard, enter your subdomain name, for example, `login.example.com`, and then click **Next**. Verifying domain ownership is the next step in the configuration wizard.

### Update your DNS

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

### Update Custom Authorization Server

After you customize your Okta domain URL, existing [Custom Authorization Servers](/docs/concepts/auth-servers/) continue to use the Okta organization URL until you change it. All new Custom Authorization Servers use the custom URL by default.

You need to update existing Custom Authorization Servers to return the custom domain as the `issuer` value:

1. In the Admin Console, go to **Security** > **API**.
1. On the **Authorization Servers** tab, select the Custom Authorization Server that you want to update.
1. Click **Edit** on the Custom Authorization Server that you selected.
1. From the **Issuer** drop-down box, select the custom URL and click **Save**.

### Update issuer for OpenID Connect apps

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
12. You are prompted to add a [CNAME record](https://datatracker.ietf.org/doc/html/rfc1035#section-3.2.2). Add this to your Cloudflare DNS, and then click **Finish**.
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

## About custom email notification domains

A custom email domain allows you to present a branded experience to your end users. Emails that Okta sends to your end users appears to come from your custom email domain instead of `noreply@okta.com`. You can switch to a different custom domain or revert to the default Okta domain, but you can use only one email domain at a time.

Okta sends your super admins a confirmation email after your custom domain is configured and operating correctly. To ensure continuous operation, Okta polls your custom email domain once every 24 hours. If a problem occurs, Okta alerts super admins by email, and Okta-generated emails are sent from the default domain `noreply@okta.com` until the problem is resolved.

## Configure a custom email notification domain

1. In the Admin Console, go to **Settings** and then **Emails & SMS**.

2. Click the **Sender:** link (**Okta <noreply@okta.com>**) near the top of the page.

3. On the Configure Email Sender dialog box, select **Custom email domain** as the type of sender that you want to send system notification emails from.

4. In the **Email address to send from**, enter the email address that you want to send the system notification emails from. This is what displays in the emails sent to your users.

5. Enter the **Name of sender**. This name appears as the sender in the emails sent to your users.

6. In the **Mail domain to send from** box, enter a unique mail domain that your organization has dedicated for Okta to send mail from. Later in this procedure, you add the unique mail domain to the SPF record in your DNS zone (the root domain) as an include-statement to show that you allow Okta to send mail from this unique mail domain.

7. Click **Save & View Required DNS Records** to save your changes and view your org's DNS records that you need to update before your settings can take effect.

8. Update your DNS records using the provided values.

9. After you've updated your DNS records through your domain provider, click **I've updated the DNS records**. Okta begins polling your DNS records until it detects your updates (this may take up to 24 hours). Your configuration is pending until the DNS updates are detected.

    Alternatively, you can click **I will update the DNS records later**. Your records aren't polled and your configuration is incomplete until you update the relevant DNS records and click **I've updated the DNS records**. You can view the list of records that require an update at any time.

10. Add the SPF record to your DNS zone (the root domain). An SPF record specifies the mail servers that your organization has authorized to send mail from your domain. If your root domain already has an SPF record, the following update can prevent spoofers from sending mail that mimics your domain.

    For example, if you only send mail from Microsoft Office 365, your SPF record has an include-statement similar to:

    ```plain
    example.com TXT    v=spf1 include:spf.protection.outlook.com -all
    ```

    To finish configuring your custom email domain, you must add another include-statement that specifies the mail domain that you specified in the **Mail domain to send from** field from the Configure Email Sender dialog box in step 6. This is also the host that appears in the first CNAME row in the DNS Records table.

    ![CNAME Example](/img/CNAMEExample.png "CNAME table with an arrow pointing at the first CNAME row in the table")

    Add the host to the existing record to configure a combined SPF record similar to this:

    ```plain
    example.com TXT    v=spf1 include:oktamail.example.com include:spf.protection.outlook.com -all
    ```

### Known Issues

- You can't configure Okta to send emails through a domain that uses SendGrid. Instead, configure a subdomain with your DNS provider for custom Okta emails.

- You can't have more than 10 DNS lookups in your SPF record.

## Next steps

The following customization options require a custom URL domain:

* [Style the Okta-hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget)
* [Customize the Okta-hosted error pages](/docs/guides/custom-error-pages/)

The following customization options don't require a custom URL domain:

* [Customize SMS messages](/docs/guides/custom-sms-messaging/)
* [Customize email notifications](/docs/guides/custom-email/)
* [Customize themes](/docs/guides/customize-themes)
